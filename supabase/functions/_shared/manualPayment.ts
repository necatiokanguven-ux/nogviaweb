import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const OTP_TTL_MINUTES = 10;
const MAX_VERIFY_ATTEMPTS = 5;

const PRODUCT_PRICES_USD: Record<string, number> = {
  'host-kit': 49,
  'guest-guide': 29,
  finance: 29,
};

const PRODUCT_LABELS: Record<string, string> = {
  'host-kit': 'nogvia Host Kit',
  'guest-guide': 'Guest Guide Builder',
  finance: 'nogvia Finance',
};

const SUPPORT_EMAIL = 'info@nogvia.com';

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

export function getProductLabel(productSlug: string) {
  return PRODUCT_LABELS[productSlug] ?? productSlug;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getResendFrom() {
  return Deno.env.get('RESEND_FROM') || 'nogvia <onboarding@resend.dev>';
}

function getAdminNotifyEmail() {
  return Deno.env.get('ADMIN_NOTIFY_EMAIL') || SUPPORT_EMAIL;
}

async function sendResendEmail(input: {
  to: string[];
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getResendFrom(),
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend error: ${detail}`);
  }
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

  const from = getResendFrom();
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
        <p>Hi ${escapeHtml(fullName)},</p>
        <p>Your verification code to continue checkout on nogvia.com is:</p>
        <p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${code}</p>
        <p>This code expires in ${OTP_TTL_MINUTES} minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
      text: `Hi ${fullName},\n\nYour verification code: ${code}\n\nExpires in ${OTP_TTL_MINUTES} minutes.`,
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

type BankOrderRow = {
  id: string;
  order_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  product_slug: string;
  payment_method: string;
  status: string;
  amount_usd: number;
};

async function sendBankPaymentAdminEmail(order: BankOrderRow) {
  const productLabel = getProductLabel(order.product_slug);
  const fullName = `${order.first_name} ${order.last_name}`;
  const amount = Number(order.amount_usd);

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
      <h2 style="margin:0 0 16px;">Bank payment reported</h2>
      <p>A customer reported a bank transfer on nogvia.com. Please verify in your bank account.</p>
      <table style="border-collapse:collapse;margin:16px 0;width:100%;max-width:520px;">
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Order code</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(order.order_code)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(order.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(order.phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Product</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(productLabel)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Amount (USD)</strong></td><td style="padding:8px;border:1px solid #ddd;">$${amount}</td></tr>
      </table>
      <p style="color:#666;font-size:13px;">Check Supabase table <code>manual_payment_orders</code> for full details.</p>
    </div>
  `;

  const text = `Bank payment reported\n\nOrder: ${order.order_code}\nName: ${fullName}\nEmail: ${order.email}\nPhone: ${order.phone}\nProduct: ${productLabel}\nAmount: $${amount}`;

  await sendResendEmail({
    to: [getAdminNotifyEmail()],
    subject: `Bank payment claimed — ${order.order_code}`,
    html,
    text,
  });
}

async function sendBankPaymentCustomerEmail(order: BankOrderRow) {
  const productLabel = getProductLabel(order.product_slug);
  const fullName = `${order.first_name} ${order.last_name}`;
  const amount = Number(order.amount_usd);

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:560px;">
      <h2 style="margin:0 0 12px;color:#0A0A0B;">Thank you for your order</h2>
      <p>Hi ${escapeHtml(fullName)},</p>
      <p>We received your bank transfer notification for <strong>${escapeHtml(productLabel)}</strong>.</p>
      <p style="margin:20px 0;padding:16px;background:#f4f4f5;border-radius:4px;">
        <span style="display:block;font-size:12px;color:#666;margin-bottom:6px;">Your order code</span>
        <span style="font-size:20px;font-weight:bold;font-family:monospace;">${escapeHtml(order.order_code)}</span>
      </p>
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>We will verify your payment in our bank account.</li>
        <li>After confirmation, your download link will be sent to this email within 24–48 hours.</li>
        <li>No further action is needed unless we contact you.</li>
      </ul>
      <p style="margin-top:20px;">Order total: <strong>$${amount} USD</strong></p>
      <p style="margin-top:24px;color:#666;font-size:13px;">
        Questions? Email us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>
      </p>
      <p style="color:#666;font-size:13px;">— nogvia</p>
    </div>
  `;

  const text = `Thank you for your order\n\nHi ${fullName},\n\nWe received your bank transfer notification for ${productLabel}.\n\nOrder code: ${order.order_code}\nAmount: $${amount} USD\n\nWe will verify your payment and send your download link to this email within 24–48 hours.\n\nQuestions: ${SUPPORT_EMAIL}\n\n— nogvia`;

  await sendResendEmail({
    to: [order.email],
    subject: `Thank you — nogvia order ${order.order_code}`,
    html,
    text,
  });
}

export async function confirmBankPayment(input: { orderCode: string; email: string }) {
  const supabase = getServiceClient();
  const normalizedEmail = input.email.trim().toLowerCase();
  const normalizedCode = input.orderCode.trim().toUpperCase();

  const { data: order, error } = await supabase
    .from('manual_payment_orders')
    .select(
      'id, order_code, first_name, last_name, email, phone, product_slug, payment_method, status, amount_usd',
    )
    .eq('order_code', normalizedCode)
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

  if (order.payment_method !== 'bank') {
    return { ok: false as const, message: 'This order is not a bank payment' };
  }

  if (order.status === 'paid' || order.status === 'fulfilled') {
    return { ok: false as const, message: 'This order is already completed' };
  }

  if (order.status === 'pending_review') {
    return {
      ok: true as const,
      message: 'Payment already reported',
      alreadySubmitted: true as const,
    };
  }

  if (order.status !== 'pending_payment') {
    return { ok: false as const, message: 'This order cannot be updated' };
  }

  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from('manual_payment_orders')
    .update({
      status: 'pending_review',
      updated_at: now,
    })
    .eq('id', order.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  try {
    await sendBankPaymentAdminEmail(order as BankOrderRow);
    await sendBankPaymentCustomerEmail(order as BankOrderRow);
  } catch (emailError) {
    console.error('Bank payment notification emails failed:', emailError);
  }

  return { ok: true as const, message: 'Payment reported successfully' };
}
