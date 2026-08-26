import React, { useState, useEffect } from 'react';
import { NogviaLogo } from './NogviaLogo';
import { PRODUCTS, BRAND_INFO, WEB_DEMO_URLS, DEMO_LINK_PROPS } from '../constants/data';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: Array<{ name: string; href: string; external?: boolean }> = [
    { name: t.nav.guestGuide, href: '#guest-guide' },
    { name: t.nav.finance, href: '#finance' },
    { name: t.nav.demoGuestGuide, href: WEB_DEMO_URLS.guestGuide, external: true },
    { name: t.nav.demoFinance, href: WEB_DEMO_URLS.finance, external: true },
    { name: t.nav.videos, href: '#videos' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group focus:outline-none">
            <NogviaLogo size="md" showTagline />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                {...(link.external ? DEMO_LINK_PROPS : {})}
                className={`text-xs tracking-widest uppercase font-medium transition-colors ${
                  link.external
                    ? 'text-sky-300/90 hover:text-sky-200'
                    : 'text-white/60 hover:text-[#D4AF37]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Language Switcher & Etsy Buy Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0F0F10] border border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all"
              title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? 'TR | EN' : 'EN | TR'}</span>
            </button>

            <a
              href={PRODUCTS.hostKit.checkoutUrl}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.nav.buyKit}</span>
            </a>
          </div>

          {/* Mobile Menu & Language Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-[#0F0F10] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/70 hover:text-white focus:outline-none bg-[#0F0F10] border border-white/10 rounded-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                {...(link.external ? DEMO_LINK_PROPS : {})}
                onClick={() => {
                  if (!link.external) setMobileMenuOpen(false)
                }}
                className={`text-sm font-semibold tracking-widest uppercase py-2 border-b border-white/5 ${
                  link.external
                    ? 'text-sky-300 hover:text-sky-200'
                    : 'text-white/80 hover:text-[#D4AF37]'
                }`}
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-white/60 bg-[#0F0F10] p-3 rounded-sm border border-white/10">
                <span className="uppercase tracking-wider text-[10px]">{t.hero.demoTag}</span>
                <span className="font-bold text-[#D4AF37]">{BRAND_INFO.price} ({language === 'tr' ? 'Tek Seferlik' : 'One-Time'})</span>
              </div>
              <a
                href={PRODUCTS.hostKit.checkoutUrl}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 font-bold text-xs uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-lg transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.nav.buyKit} — {BRAND_INFO.price}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

