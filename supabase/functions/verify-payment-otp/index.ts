import { corsHeaders, jsonResponse, verifyPaymentOtpAndCreateOrder } from '../_shared/manualPayment.ts';

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ success: false, message: 'Method not allowed' }, 405);
  }

  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const code = String(body.code || '').trim();

    if (!email || !code) {
      return jsonResponse({ success: false, message: 'Missing email or code' }, 400);
    }

    const result = await verifyPaymentOtpAndCreateOrder(email, code);

    if (!result.ok) {
      return jsonResponse({ success: false, message: result.message }, 400);
    }

    return jsonResponse({
      success: true,
      message: 'Order created',
      order: result.order,
    });
  } catch (error) {
    return jsonResponse(
      { success: false, message: error instanceof Error ? error.message : 'Server error' },
      500,
    );
  }
});
