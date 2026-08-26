import React from 'react';
import { PRODUCTS, WEB_DEMO_URLS, DEMO_LINK_PROPS } from '../constants/data';
import { MEDIA } from '../constants/media';
import { VIDEO_CATALOG } from '../constants/videos';
import { useLanguage } from '../context/LanguageContext';
import { YoutubeEmbed } from './YoutubeEmbed';
import {
  QrCode,
  Wifi,
  Smartphone,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

export const GuestGuideShowcase: React.FC = () => {
  const { t, language } = useLanguage();
  const liveDemoQr = language === 'tr' ? MEDIA.liveDemoQrTr : MEDIA.liveDemoQrEn;

  return (
    <section id="guest-guide" className="py-20 md:py-32 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="bg-[#0F0F10] border border-white/10 rounded-sm p-4 sm:p-6 shadow-2xl relative glow-gold">
          <img
            src={MEDIA.heroGuestGuide}
            alt="nogvia digital guest guide preview"
            className="w-full rounded-sm border border-white/10"
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-[#141416] p-4 rounded-sm border border-white/10">
              <div className="text-[#D4AF37] font-bold text-sm mb-1 flex items-center gap-2">
                <QrCode className="w-4 h-4" /> {t.guestGuide.feat1Title}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t.guestGuide.feat1Desc}
              </p>
            </div>

            <div className="bg-[#141416] p-4 rounded-sm border border-white/10">
              <div className="text-[#D4AF37] font-bold text-sm mb-1 flex items-center gap-2">
                <Wifi className="w-4 h-4" /> {t.guestGuide.feat2Title}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t.guestGuide.feat2Desc}
              </p>
            </div>

            <div className="bg-[#141416] p-4 rounded-sm border border-white/10">
              <div className="text-[#D4AF37] font-bold text-sm mb-1 flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> {t.guestGuide.feat3Title}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t.guestGuide.feat3Desc}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center p-4 sm:p-6 bg-[#141416] rounded-sm border border-[#D4AF37]/25 text-left glow-gold">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-3">
                <QrCode className="w-3.5 h-3.5" />
                <span>{t.guestGuide.liveDemoBadge}</span>
              </div>
              <h3 className="text-lg font-serif-luxury text-white">{t.guestGuide.liveDemoTitle}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{t.guestGuide.liveDemoDesc}</p>
              <a
                href={WEB_DEMO_URLS.guestGuide}
                {...DEMO_LINK_PROPS}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.liteDownload.tryGuestGuideDemo}</span>
              </a>
            </div>
            <img
              key={language}
              src={liveDemoQr}
              alt={t.guestGuide.liveDemoAlt}
              className="w-full max-w-sm mx-auto rounded-sm border border-white/10 shadow-2xl"
            />
          </div>

          <div className="mt-8 p-4 sm:p-6 bg-[#141416] rounded-sm border border-white/10 text-left">
            <h3 className="text-sm font-serif-luxury text-white">{t.guestGuide.watchHowToTitle}</h3>
            <p className="mt-1 mb-4 text-xs text-white/60">{t.guestGuide.watchHowToDesc}</p>
            <YoutubeEmbed
              youtubeId={VIDEO_CATALOG.guestGuideHowTo.youtubeId}
              title={t.videos.items.guestGuideHowTo.title}
              playLabel={t.videos.playLabel}
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href={PRODUCTS.guestGuide.checkoutUrl}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-lg transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.guestGuide.buyButton}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
