import { FaqItem, ComparisonRow } from '../types';

export const SUPPORT_EMAIL = 'info@nogvia.com';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const SUPPORT_REPLY_HOURS = 48;

export const CHECKOUT_PAGE_PATHS = {
  hostKit: '/checkout/host-kit',
  guestGuide: '/checkout/guest-guide',
  finance: '/checkout/finance',
} as const;

/** Etsy listings — default purchase channel until Lemon Squeezy / other methods are added. */
export const ETSY_URLS = {
  hostKit:
    'https://www.etsy.com/listing/4550175542/offline-host-kit-guest-guide-finance?ref=listings_manager_grid',
  guestGuide:
    'https://www.etsy.com/listing/4551595941/digital-guest-guide-builder-for-airbnb?ref=listings_manager_grid',
  finance:
    'https://www.etsy.com/listing/4551625325/nogvia-finance-vacation-rental-income?ref=listings_manager_grid',
} as const;

const purchaseUrl = (envKey: keyof ImportMetaEnv, etsyUrl: string) => {
  const override = import.meta.env[envKey];
  return typeof override === 'string' && override.length > 0 ? override : etsyUrl;
};

export const CHECKOUT_URLS = {
  hostKit: purchaseUrl('VITE_CHECKOUT_HOST_KIT', ETSY_URLS.hostKit),
  guestGuide: purchaseUrl('VITE_CHECKOUT_GUEST_GUIDE', ETSY_URLS.guestGuide),
  finance: purchaseUrl('VITE_CHECKOUT_FINANCE', ETSY_URLS.finance),
} as const;

/** Use on external marketplace checkout links (Etsy, Lemon Squeezy direct). */
export const PURCHASE_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

/** Free Host Kit Lite — Cloudflare-proxied Bunny CDN (override via VITE_HOST_KIT_LITE_DOWNLOAD_URL). */
export const HOST_KIT_LITE_DOWNLOAD_URL =
  typeof import.meta.env.VITE_HOST_KIT_LITE_DOWNLOAD_URL === 'string' &&
  import.meta.env.VITE_HOST_KIT_LITE_DOWNLOAD_URL.length > 0
    ? import.meta.env.VITE_HOST_KIT_LITE_DOWNLOAD_URL
    : 'https://download.nogvia.com/nogvia_hub_lite.zip';

export const PRODUCTS = {
  hostKit: {
    id: 'host-kit',
    name: 'nogvia Host Kit',
    price: '$49',
    compareAt: '$58',
    checkoutUrl: CHECKOUT_PAGE_PATHS.hostKit,
  },
  guestGuide: {
    id: 'guest-guide',
    name: 'Guest Guide Builder',
    price: '$29',
    compareAt: null,
    checkoutUrl: CHECKOUT_PAGE_PATHS.guestGuide,
  },
  finance: {
    id: 'finance',
    name: 'nogvia Finance',
    price: '$29',
    compareAt: null,
    checkoutUrl: CHECKOUT_PAGE_PATHS.finance,
  },
} as const;

export const BRAND_INFO = {
  name: 'nogvia',
  tagline: 'Offline host tools for vacation rentals',
  alternateTagline: 'Run your rental offline — one kit, zero subscriptions',
  price: PRODUCTS.hostKit.price,
  originalPrice: PRODUCTS.hostKit.compareAt ?? '$79',
  discountText: 'Save vs buying separately — pay once, own forever',
  checkoutUrl: PRODUCTS.hostKit.checkoutUrl,
};

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Pricing Model',
    saas: '$20 - $50 / month ($360+/year)',
    saasNegative: true,
    nogvia: 'Pay once from $29 (lifetime ownership)',
    nogviaPositive: true,
  },
  {
    feature: 'Internet Dependency',
    saas: 'Fails when offline or API goes down',
    saasNegative: true,
    nogvia: '100% Offline Desktop Software',
    nogviaPositive: true,
  },
  {
    feature: 'Data Privacy',
    saas: 'Hosted on 3rd party servers & tracked',
    saasNegative: true,
    nogvia: '100% Local Storage on Your Laptop',
    nogviaPositive: true,
  },
  {
    feature: 'Guest Guide Engine',
    saas: 'Requires Canva / PDF links or paid subscriptions',
    saasNegative: true,
    nogvia: 'Standalone App + Instant QR Generator',
    nogviaPositive: true,
  },
  {
    feature: 'Financial Tracker',
    saas: 'Generic spreadsheets or expensive accounting SaaS',
    saasNegative: true,
    nogvia: 'Dedicated Host Finance Tracker + Excel Export',
    nogviaPositive: true,
  },
  {
    feature: 'Setup Effort',
    saas: 'Complex signups & recurring payment cards',
    saasNegative: true,
    nogvia: '1-Click Local Installation (Mac & Windows)',
    nogviaPositive: true,
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'pricing',
    question: 'Is this really a one-time payment with no monthly fees?',
    answer: 'Yes! Absolutely zero monthly subscriptions or hidden charges. You purchase nogvia software once and own it on your computer for life.',
  },
  {
    category: 'general',
    question: 'Is nogvia a Canva template or a real software application?',
    answer: 'nogvia is real standalone desktop software. Unlike Canva templates that require manual design work, nogvia automatically builds and formats your digital guest guide and finance reports locally in seconds.',
  },
  {
    category: 'installation',
    question: 'How difficult is the installation?',
    answer: 'It is built for non-technical hosts! The download folder includes a simple 1-click launcher (`start-hub`). Just click to launch the nogvia local workspace on your Mac or Windows computer.',
  },
  {
    category: 'guest-guide',
    question: 'How do guests view the digital guest guide on their phone?',
    answer: 'When you print or display the generated QR code inside your rental property (or send the local link), guests simply point their phone camera at the QR code. The guide opens instantly in a clean mobile web layout without requiring them to download any app.',
  },
  {
    category: 'finance',
    question: 'Can I track multiple properties and export to Excel?',
    answer: 'Yes! You can log income and expenses for multiple properties (e.g. Sunset Bay Villa, Beach House, Downtown Apartment), filter revenue by platform (Airbnb, Vrbo, Booking.com, Direct), and export tax-ready reports to Microsoft Excel with one click.',
  },
];

export const SAMPLE_GUEST_GUIDE = {
  propertyName: 'Sunset Bay Estate',
  subtitle: 'Coastal luxury with private pool and ocean views',
  address: '1428 Coastal Highway, Malibu, CA',
  wifiNetwork: 'SunsetBay_Guest_5G',
  wifiPassword: 'SunnyBay2026!',
  checkInTime: '3:00 PM',
  checkOutTime: '11:00 AM',
  quietHours: '10:00 PM - 8:00 AM',
  hostName: 'Sarah & Mark',
  hostPhone: '+1 (555) 234-5678',
  whatsApp: '+1 (555) 234-5678',
  houseRules: [
    'No smoking or vaping inside the property.',
    'Quiet hours observed between 10:00 PM and 8:00 AM out of respect for neighbors.',
    'Please remove shoes in the entrance hall.',
    'No unregistered guests or parties allowed.',
  ],
  localRecommendations: [
    { title: 'The Anchor Bistro', type: 'Dining', note: 'Best seafood pasta with ocean sunset view (2 mins walk)' },
    { title: 'Sunrise Cove Beach', type: 'Attraction', note: 'Calm water beach perfect for morning swims (0.5 miles)' },
    { title: 'Organic Market & Cafe', type: 'Groceries', note: 'Fresh local bakery and coffee roasted daily' },
  ],
};
