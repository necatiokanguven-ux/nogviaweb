import {
  corsHeaders,
  generateCode,
  isValidEmail,
  isValidPaymentMethod,
  isValidPhone,
  isValidProductSlug,
  jsonResponse,
  sendPaymentOtpEmail,
  upsertPaymentOtpRecord,
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
    const firstName = String(body.firstName || '').trim();
    const lastName = String(body.lastName || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const phone = String(body.phone || '').trim();
    const productSlug = String(body.productSlug || '').trim();
    const paymentMethod = String(body.paymentMethod || '').trim();

    if (!firstName || !lastName || !email || !phone || !productSlug || !paymentMethod) {
      return jsonResponse({ success: false, message: 'Missing required fields' }, 400);
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, message: 'Invalid email address' }, 400);
    }

    if (!isValidPhone(phone)) {
      return jsonResponse({ success: false, message: 'Invalid phone number' }, 400);
    }

    if (!isValidProductSlug(productSlug)) {
      return jsonResponse({ success: false, message: 'Invalid product' }, 400);
    }

    if (!isValidPaymentMethod(paymentMethod)) {
      return jsonResponse({ success: false, message: 'Invalid payment method' }, 400);
    }

    const code = generateCode();
    const fullName = `${firstName} ${lastName}`;

    await upsertPaymentOtpRecord({
      email,
      firstName,
      lastName,
      phone,
      productSlug,
      paymentMethod,
      code,
    });
    await sendPaymentOtpEmail(email, code, fullName);

    return jsonResponse({ success: true, message: 'Verification code sent' });
  } catch (error) {
    return jsonResponse(
      { success: false, message: error instanceof Error ? error.message : 'Server error' },
      500,
    );
  }
});
