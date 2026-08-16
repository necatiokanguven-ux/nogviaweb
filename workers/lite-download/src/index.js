const OTP_TTL_SECONDS = 600;
const MAX_VERIFY_ATTEMPTS = 5;

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGIN || 'https://nogvia.com').split(',').map((v) => v.trim());
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (origin && (allowed.includes(origin) || allowed.includes('*'))) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function jsonResponse(body, status, origin, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin, env),
    },
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateCode() {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000;
  return String(n).padStart(6, '0');
}

async function sendOtpEmail(env, email, code, fullName) {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const from = env.RESEND_FROM || 'nogvia <onboarding@resend.dev>';
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Your nogvia Host Kit Lite verification code',
      html: `
        <p>Hi ${fullName},</p>
        <p>Your verification code for Host Kit Lite is:</p>
        <p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${code}</p>
        <p>This code expires in 10 minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend error: ${detail}`);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ success: false, message: 'Method not allowed' }, 405, origin, env);
    }

    const path = url.pathname.replace(/\/+$/, '');

    try {
      if (path.endsWith('/request-otp')) {
        const body = await request.json();
        const firstName = String(body.firstName || '').trim();
        const lastName = String(body.lastName || '').trim();
        const email = String(body.email || '').trim().toLowerCase();

        if (!firstName || !lastName || !email) {
          return jsonResponse({ success: false, message: 'Missing required fields' }, 400, origin, env);
        }

        if (!isValidEmail(email)) {
          return jsonResponse({ success: false, message: 'Invalid email address' }, 400, origin, env);
        }

        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        const ipKey = `rate:ip:${ip}`;
        const emailKey = `rate:email:${email}`;
        const ipCount = Number((await env.OTP_KV.get(ipKey)) || '0');
        const emailCount = Number((await env.OTP_KV.get(emailKey)) || '0');

        if (ipCount >= 10 || emailCount >= 3) {
          return jsonResponse({ success: false, message: 'Too many requests. Try again later.' }, 429, origin, env);
        }

        const code = generateCode();
        const fullName = `${firstName} ${lastName}`;
        const otpKey = `otp:${email}`;

        await env.OTP_KV.put(
          otpKey,
          JSON.stringify({
            code,
            firstName,
            lastName,
            fullName,
            attempts: 0,
            expiresAt: Date.now() + OTP_TTL_SECONDS * 1000,
          }),
          { expirationTtl: OTP_TTL_SECONDS },
        );

        await sendOtpEmail(env, email, code, fullName);

        await env.OTP_KV.put(ipKey, String(ipCount + 1), { expirationTtl: 3600 });
        await env.OTP_KV.put(emailKey, String(emailCount + 1), { expirationTtl: 3600 });

        return jsonResponse({ success: true, message: 'Verification code sent' }, 200, origin, env);
      }

      if (path.endsWith('/verify-otp')) {
        const body = await request.json();
        const email = String(body.email || '').trim().toLowerCase();
        const code = String(body.code || '').trim();

        if (!email || !code) {
          return jsonResponse({ success: false, message: 'Missing email or code' }, 400, origin, env);
        }

        const otpKey = `otp:${email}`;
        const storedRaw = await env.OTP_KV.get(otpKey);

        if (!storedRaw) {
          return jsonResponse({ success: false, message: 'Code expired or not found' }, 400, origin, env);
        }

        const stored = JSON.parse(storedRaw);

        if (Date.now() > stored.expiresAt) {
          await env.OTP_KV.delete(otpKey);
          return jsonResponse({ success: false, message: 'Code expired' }, 400, origin, env);
        }

        if (stored.attempts >= MAX_VERIFY_ATTEMPTS) {
          await env.OTP_KV.delete(otpKey);
          return jsonResponse({ success: false, message: 'Too many attempts' }, 429, origin, env);
        }

        if (stored.code !== code) {
          stored.attempts += 1;
          await env.OTP_KV.put(otpKey, JSON.stringify(stored), { expirationTtl: OTP_TTL_SECONDS });
          return jsonResponse({ success: false, message: 'Invalid verification code' }, 400, origin, env);
        }

        await env.OTP_KV.delete(otpKey);
        await env.OTP_KV.put(
          `verified:${email}`,
          JSON.stringify({
            firstName: stored.firstName,
            lastName: stored.lastName,
            fullName: stored.fullName,
            verifiedAt: Date.now(),
          }),
          { expirationTtl: 86400 },
        );

        return jsonResponse(
          {
            success: true,
            message: 'Verified',
            lead: {
              firstName: stored.firstName,
              lastName: stored.lastName,
              email,
            },
          },
          200,
          origin,
          env,
        );
      }

      return jsonResponse({ success: false, message: 'Not found' }, 404, origin, env);
    } catch (error) {
      return jsonResponse(
        { success: false, message: error instanceof Error ? error.message : 'Server error' },
        500,
        origin,
        env,
      );
    }
  },
};
