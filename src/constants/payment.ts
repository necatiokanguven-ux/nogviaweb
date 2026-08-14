export type ProductSlug = 'host-kit' | 'guest-guide' | 'finance';
export type PaymentMethod = 'bank' | 'crypto' | 'link';

export const PRODUCT_SLUGS: ProductSlug[] = ['host-kit', 'guest-guide', 'finance'];

export const BANK_DETAILS = {
  accountHolder: 'Necati Okan Güven',
  ibanTry: 'TR90 0006 4000 0016 8100 7190 83',
  ibanUsd: 'TR18 0006 4000 0026 8109 0677 09',
} as const;

export const CRYPTO_DETAILS = {
  currency: 'USDT',
  network: 'TRC-20',
  address: 'TGxarcGunyMMNBDWYFWMLZCybhViDTuAEh',
} as const;

const lemonUrl = (envKey: keyof ImportMetaEnv, fallback: string) => {
  const override = import.meta.env[envKey];
  return typeof override === 'string' && override.length > 0 ? override : fallback;
};

const DEFAULT_LEMON_CHECKOUT = 'https://nogvia.lemonsqueezy.com/checkout';

/** Lemon Squeezy checkout links — all products use Host Kit checkout until store variants are live. */
export const LEMON_SQUEEZY_URLS: Record<ProductSlug, string> = {
  'host-kit': lemonUrl('VITE_CHECKOUT_HOST_KIT', DEFAULT_LEMON_CHECKOUT),
  'guest-guide': lemonUrl('VITE_CHECKOUT_GUEST_GUIDE', DEFAULT_LEMON_CHECKOUT),
  finance: lemonUrl('VITE_CHECKOUT_FINANCE', DEFAULT_LEMON_CHECKOUT),
};

export const ETSY_PRODUCT_URLS: Record<ProductSlug, string> = {
  'host-kit':
    'https://www.etsy.com/listing/4550175542/offline-host-kit-guest-guide-finance?ref=listings_manager_grid',
  'guest-guide':
    'https://www.etsy.com/listing/4551595941/digital-guest-guide-builder-for-airbnb?ref=listings_manager_grid',
  finance:
    'https://www.etsy.com/listing/4551625325/nogvia-finance-vacation-rental-income?ref=listings_manager_grid',
};

export function parseProductSlugFromPath(pathname: string): ProductSlug | null {
  const match = pathname.match(/^\/checkout\/(host-kit|guest-guide|finance)\/?$/);
  return match ? (match[1] as ProductSlug) : null;
}

export function parseProductSlugFromSearch(search: string): ProductSlug | null {
  const params = new URLSearchParams(search);
  const value = params.get('product');
  if (value === 'host-kit' || value === 'guest-guide' || value === 'finance') {
    return value;
  }
  return null;
}

export function isCheckoutPath(pathname: string): boolean {
  return pathname === '/checkout' || pathname.startsWith('/checkout/');
}
