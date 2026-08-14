import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { GuestGuideShowcase } from './components/GuestGuideShowcase';
import { FinanceShowcase } from './components/FinanceShowcase';
import { VideoPortfolio } from './components/VideoPortfolio';
import { HostKitBundle } from './components/HostKitBundle';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { ProductsPricingSection } from './components/ProductsPricingSection';
import { PaymentPage } from './components/PaymentPage';
import { NogviaLogo } from './components/NogviaLogo';
import { PRODUCTS, SUPPORT_EMAIL } from './constants/data';
import { isCheckoutPath } from './constants/payment';
import { useLanguage } from './context/LanguageContext';

function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E0] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <main>
        <Hero />
        <ProblemSolution />
        <GuestGuideShowcase />
        <FinanceShowcase />
        <VideoPortfolio />
        <HostKitBundle />
        <FaqSection />
        <ProductsPricingSection />
        <ContactSection />
      </main>

      <footer className="bg-[#050506] border-t border-white/10 py-12 text-white/50 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <NogviaLogo className="h-6 w-auto" />
            <span className="text-white/30">|</span>
            <span>{t.brand.tagline}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#guest-guide" className="hover:text-white transition-colors">{t.nav.guestGuide}</a>
            <a href="#finance" className="hover:text-white transition-colors">{t.nav.finance}</a>
            <a href="#videos" className="hover:text-white transition-colors">{t.nav.videos}</a>
            <a href="#faq" className="hover:text-white transition-colors">{t.nav.faq}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition-colors">
              {SUPPORT_EMAIL}
            </a>
            <a
              href={PRODUCTS.hostKit.checkoutUrl}
              className="text-[#D4AF37] font-semibold hover:underline"
            >
              {t.nav.buyKit} ({PRODUCTS.hostKit.price})
            </a>
          </div>

          <div className="flex items-center gap-1 text-white/40">
            <span>© 2026 nogvia. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname;
  if (isCheckoutPath(path)) {
    return <PaymentPage />;
  }
  return <LandingPage />;
}

