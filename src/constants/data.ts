import { FaqItem, ComparisonRow, RevenueChannel } from '../types';

export const ETSY_BUY_URL = 'https://www.etsy.com/listing/4550175542/offline-host-kit-guest-guide-finance?ref=listings_manager_grid';

export const BRAND_INFO = {
  name: 'nogvia',
  tagline: 'Offline host tools for vacation rentals',
  alternateTagline: 'Run your rental offline — one kit, zero subscriptions',
  price: '$15.99',
  originalPrice: '$79',
  discountText: 'Save 80% — Pay Once, Lifetime Ownership',
  etsyUrl: ETSY_BUY_URL,
};

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Pricing Model',
    saas: '$20 - $50 / month ($360+/year)',
    saasNegative: true,
    nogvia: 'Pay Once $15.99 (Lifetime Ownership)',
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
    answer: 'Yes! Absolutely zero monthly subscriptions or hidden charges. You purchase the nogvia Host Kit once on Etsy and own the software forever on your machine.',
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
    question: 'Can I track multiple rental properties in nogvia Finance?',
    answer: 'Yes! You can log income and expenses for multiple properties (e.g. Sunset Bay Villa, Beach House, Downtown Apartment), filter revenue by platform (Airbnb, Vrbo, Booking.com, Direct), and export tax-ready reports to Microsoft Excel with one click.',
  },
  {
    category: 'general',
    question: 'Does my data stay private?',
    answer: '100%. All your guest details, property notes, revenue records, and expense logs are stored locally on your device. Nothing is sent to remote cloud servers or sold to third parties.',
  },
];

export const REVENUE_CHANNELS: RevenueChannel[] = [
  { name: 'Airbnb', amount: 5798, percentage: 55, color: '#f97316' },
  { name: 'Vrbo', amount: 2480, percentage: 24, color: '#38bdf8' },
  { name: 'Booking.com', amount: 1420, percentage: 14, color: '#a855f7' },
  { name: 'Direct Bookings', amount: 850, percentage: 7, color: '#34d399' },
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
