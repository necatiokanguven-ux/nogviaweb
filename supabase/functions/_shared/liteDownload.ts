import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const OTP_TTL_MINUTES = 10;
const MAX_VERIFY_ATTEMPTS = 5;

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function getServiceClient() {
  const url = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase service credentials are not configured');
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function sendOtpEmail(email: string, code: string, fullName: string) {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const from = Deno.env.get('RESEND_FROM') || 'nogvia <onboarding@resend.dev>';
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
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
        <p>This code expires in ${OTP_TTL_MINUTES} minutes.</p>
      `,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend error: ${detail}`);
  }
}

export async function upsertOtpRecord(
  email: string,
  firstName: string,
  lastName: string,
  code: string,
) {
  const supabase = getServiceClient();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString();

  const { error } = await supabase.from('lite_otp_codes').upsert(
    {
      email,
      code,
      first_name: firstName,
      last_name: lastName,
      attempts: 0,
      expires_at: expiresAt,
    },
    { onConflict: 'email' },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function verifyOtpRecord(email: string, code: string) {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from('lite_otp_codes')
    .select('email, code, first_name, last_name, attempts, expires_at')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return { ok: false as const, message: 'Code expired or not found' };
  }

  if (new Date(data.expires_at).getTime() < Date.now()) {
    await supabase.from('lite_otp_codes').delete().eq('email', email);
    return { ok: false as const, message: 'Code expired' };
  }

  if (data.attempts >= MAX_VERIFY_ATTEMPTS) {
    await supabase.from('lite_otp_codes').delete().eq('email', email);
    return { ok: false as const, message: 'Too many attempts' };
  }

  if (data.code !== code) {
    await supabase
      .from('lite_otp_codes')
      .update({ attempts: data.attempts + 1 })
      .eq('email', email);
    return { ok: false as const, message: 'Invalid verification code' };
  }

  const { error: leadError } = await supabase.from('lite_download_leads').upsert(
    {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      verified_at: new Date().toISOString(),
    },
    { onConflict: 'email' },
  );

  if (leadError) {
    throw new Error(leadError.message);
  }

  await supabase.from('lite_otp_codes').delete().eq('email', email);

  return {
    ok: true as const,
    lead: {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
    },
  };
}
