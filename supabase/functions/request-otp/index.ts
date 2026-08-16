import { corsHeaders, generateCode, isValidEmail, jsonResponse, sendOtpEmail, upsertOtpRecord } from '../_shared/liteDownload.ts';

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

    if (!firstName || !lastName || !email) {
      return jsonResponse({ success: false, message: 'Missing required fields' }, 400);
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, message: 'Invalid email address' }, 400);
    }

    const code = generateCode();
    const fullName = `${firstName} ${lastName}`;

    await upsertOtpRecord(email, firstName, lastName, code);
    await sendOtpEmail(email, code, fullName);

    return jsonResponse({ success: true, message: 'Verification code sent' });
  } catch (error) {
    return jsonResponse(
      { success: false, message: error instanceof Error ? error.message : 'Server error' },
      500,
    );
  }
});
