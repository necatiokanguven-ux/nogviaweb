import {
  corsHeaders,
  isValidEmail,
  isValidTxHash,
  jsonResponse,
  submitCryptoTxHash,
} from '../_shared/manualPayment.ts';

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ success: false, message: 'Method not allowed' }, 405);
  }

  try {
    const body = await request.json();
    const orderCode = String(body.orderCode || '').trim().toUpperCase();
    const email = String(body.email || '').trim().toLowerCase();
    const txHash = String(body.txHash || '').trim();

    if (!orderCode || !email || !txHash) {
      return jsonResponse({ success: false, message: 'Missing required fields' }, 400);
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, message: 'Invalid email address' }, 400);
    }

    if (!isValidTxHash(txHash)) {
      return jsonResponse({ success: false, message: 'Invalid transaction hash' }, 400);
    }

    const result = await submitCryptoTxHash({ orderCode, email, txHash });

    if (!result.ok) {
      return jsonResponse({ success: false, message: result.message }, 400);
    }

    return jsonResponse({ success: true, message: result.message });
  } catch (error) {
    return jsonResponse(
      { success: false, message: error instanceof Error ? error.message : 'Server error' },
      500,
    );
  }
});
