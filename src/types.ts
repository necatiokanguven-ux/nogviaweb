export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'installation' | 'pricing' | 'guest-guide' | 'finance';
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  accentColor: string;
}

export interface ComparisonRow {
  feature: string;
  saas: string;
  saasNegative: boolean;
  nogvia: string;
  nogviaPositive: boolean;
}

export interface GuestGuideSection {
  id: 'wifi' | 'rules' | 'checkin' | 'guide' | 'contact';
  title: string;
  icon: string;
}

export interface RevenueChannel {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}
