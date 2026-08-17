import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const OTP_TTL_MINUTES = 10;
const MAX_VERIFY_ATTEMPTS = 5;

const PRODUCT_PRICES_USD: Record<string, number> = {
  'host-kit': 49,
  'guest-guide': 29,
  finance: 29,
};

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

export function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidProductSlug(slug: string) {
  return slug === 'host-kit' || slug === 'guest-guide' || slug === 'finance';
}

export function isValidPaymentMethod(method: string) {
  return method === 'bank' || method === 'crypto';
}

export function isValidTxHash(hash: string) {
  return /^[a-fA-F0-9]{64}$/.test(hash.trim());
}

export function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function generateOrderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `NOGVIA-${suffix}`;
}

export function getProductPriceUsd(productSlug: string) {
  const price = PRODUCT_PRICES_USD[productSlug];
  if (price == null) {
    throw new Error('Invalid product');
  }
  return price;
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

export async function sendPaymentOtpEmail(email: string, code: string, fullName: string) {
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
      subject: 'Your nogvia order verification code',
      html: `
        <p>Hi ${fullName},</p>
        <p>Your verification code to continue checkout on nogvia.com is:</p>
        <p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${code}</p>
        <p>This code expires in ${OTP_TTL_MINUTES} minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend error: ${detail}`);
  }
}

export async function upsertPaymentOtpRecord(input: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  productSlug: string;
  paymentMethod: string;
  code: string;
}) {
  const supabase = getServiceClient();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString();

  const { error } = await supabase.from('manual_payment_otp_codes').upsert(
    {
      email: input.email,
      code: input.code,
      first_name: input.firstName,
      last_name: input.lastName,
      phone: input.phone,
      product_slug: input.productSlug,
      payment_method: input.paymentMethod,
      attempts: 0,
      expires_at: expiresAt,
    },
    { onConflict: 'email' },
  );

  if (error) {
    throw new Error(error.message);
  }
}

async function createUniqueOrderCode(supabase: ReturnType<typeof getServiceClient>) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const orderCode = generateOrderCode();
    const { data } = await supabase
      .from('manual_payment_orders')
      .select('id')
      .eq('order_code', orderCode)
      .maybeSingle();

    if (!data) {
      return orderCode;
    }
  }

  throw new Error('Could not generate order code');
}

export async function verifyPaymentOtpAndCreateOrder(email: string, code: string) {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from('manual_payment_otp_codes')
    .select(
      'email, code, first_name, last_name, phone, product_slug, payment_method, attempts, expires_at',
    )
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return { ok: false as const, message: 'Code expired or not found' };
  }

  if (new Date(data.expires_at).getTime() < Date.now()) {
    await supabase.from('manual_payment_otp_codes').delete().eq('email', email);
    return { ok: false as const, message: 'Code expired' };
  }

  if (data.attempts >= MAX_VERIFY_ATTEMPTS) {
    await supabase.from('manual_payment_otp_codes').delete().eq('email', email);
    return { ok: false as const, message: 'Too many attempts' };
  }

  if (data.code !== code) {
    await supabase
      .from('manual_payment_otp_codes')
      .update({ attempts: data.attempts + 1 })
      .eq('email', email);
    return { ok: false as const, message: 'Invalid verification code' };
  }

  const orderCode = await createUniqueOrderCode(supabase);
  const amountUsd = getProductPriceUsd(data.product_slug);
  const status = data.payment_method === 'crypto' ? 'awaiting_crypto_tx' : 'pending_payment';
  const now = new Date().toISOString();

  const { data: order, error: orderError } = await supabase
    .from('manual_payment_orders')
    .insert({
      order_code: orderCode,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      product_slug: data.product_slug,
      payment_method: data.payment_method,
      amount_usd: amountUsd,
      status,
      email_verified_at: now,
      updated_at: now,
    })
    .select(
      'id, order_code, first_name, last_name, email, phone, product_slug, payment_method, amount_usd, status',
    )
    .single();

  if (orderError || !order) {
    throw new Error(orderError?.message || 'Could not create order');
  }

  await supabase.from('manual_payment_otp_codes').delete().eq('email', email);

  return {
    ok: true as const,
    order: {
      id: order.id,
      orderCode: order.order_code,
      firstName: order.first_name,
      lastName: order.last_name,
      email: order.email,
      phone: order.phone,
      productSlug: order.product_slug,
      paymentMethod: order.payment_method,
      amountUsd: Number(order.amount_usd),
      status: order.status,
    },
  };
}

export async function submitCryptoTxHash(input: {
  orderCode: string;
  email: string;
  txHash: string;
}) {
  const supabase = getServiceClient();
  const normalizedEmail = input.email.trim().toLowerCase();
  const normalizedHash = input.txHash.trim().toLowerCase();

  const { data: order, error } = await supabase
    .from('manual_payment_orders')
    .select('id, email, payment_method, status, crypto_tx_hash')
    .eq('order_code', input.orderCode.trim().toUpperCase())
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!order) {
    return { ok: false as const, message: 'Order not found' };
  }

  if (order.email !== normalizedEmail) {
    return { ok: false as const, message: 'Order not found' };
  }

  if (order.payment_method !== 'crypto') {
    return { ok: false as const, message: 'This order is not a crypto payment' };
  }

  if (order.status === 'paid' || order.status === 'fulfilled') {
    return { ok: false as const, message: 'This order is already completed' };
  }

  if (order.crypto_tx_hash) {
    return { ok: false as const, message: 'Transaction hash already submitted' };
  }

  const { data: duplicate } = await supabase
    .from('manual_payment_orders')
    .select('id')
    .eq('crypto_tx_hash', normalizedHash)
    .maybeSingle();

  if (duplicate) {
    return { ok: false as const, message: 'This transaction hash was already used' };
  }

  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from('manual_payment_orders')
    .update({
      crypto_tx_hash: normalizedHash,
      status: 'pending_review',
      crypto_submitted_at: now,
      updated_at: now,
    })
    .eq('id', order.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { ok: true as const, message: 'Transaction submitted for review' };
}
