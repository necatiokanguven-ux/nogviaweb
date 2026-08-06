import React from 'react';
import { ETSY_BUY_URL } from '../constants/data';
import { MEDIA } from '../constants/media';
import { useLanguage } from '../context/LanguageContext';
import {
  QrCode,
  Wifi,
  Smartphone,
  ShoppingBag,
} from 'lucide-react';

export const GuestGuideShowcase: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="guest-guide" className="py-20 md:py-32 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.guestGuide.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight">
            {t.guestGuide.title} <span className="text-[#D4AF37] font-bold">{t.guestGuide.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60">
            {t.guestGuide.subtitle}
          </p>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Mobile Guest Guide Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <img
              src={MEDIA.mobileGuestGuide}
              alt="nogvia digital guest guide mobile preview"
              className="w-full max-w-sm drop-shadow-2xl glow-gold"
            />
          </div>

          {/* Right Column: Feature Explanations */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-serif-luxury font-light text-white leading-tight">
                {t.guestGuide.title} {t.guestGuide.titleAccent}
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {t.guestGuide.subtitle}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 bg-[#0F0F10] border border-white/10 p-4 rounded-sm">
                <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-sm shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif-luxury text-white">{t.guestGuide.feat1Title}</h4>
                  <p className="text-xs text-white/50 mt-1">
                    {t.guestGuide.feat1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0F0F10] border border-white/10 p-4 rounded-sm">
                <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-sm shrink-0">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif-luxury text-white">{t.guestGuide.feat2Title}</h4>
                  <p className="text-xs text-white/50 mt-1">
                    {t.guestGuide.feat2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0F0F10] border border-white/10 p-4 rounded-sm">
                <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-sm shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif-luxury text-white">{t.guestGuide.feat3Title}</h4>
                  <p className="text-xs text-white/50 mt-1">
                    {t.guestGuide.feat3Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={ETSY_BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-lg transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.guestGuide.buyButton}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
