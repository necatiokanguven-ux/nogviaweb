import React from 'react';
import { PRODUCTS, WEB_DEMO_URLS } from '../constants/data';
import { MEDIA } from '../constants/media';
import { VIDEO_CATALOG } from '../constants/videos';
import { useLanguage } from '../context/LanguageContext';
import { YoutubeEmbed } from './YoutubeEmbed';
import {
  TrendingUp,
  CheckCircle,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

export const FinanceShowcase: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="finance" className="py-20 md:py-32 bg-[#0F0F10] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.finance.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight">
            {t.finance.title} <span className="text-[#D4AF37] font-bold">{t.finance.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60">
            {t.finance.subtitle}
          </p>
        </div>

        <div className="bg-[#0A0A0B] border border-white/10 rounded-sm p-4 sm:p-6 shadow-2xl relative glow-gold">
          <img
            src={MEDIA.heroFinance}
            alt="nogvia Finance dashboard preview"
            className="w-full rounded-sm border border-white/10"
          />

          <div className="mt-4 flex items-center gap-4 p-4 bg-[#141416] border border-white/10 rounded-sm max-w-xl">
            <img
              src={MEDIA.excelExport}
              alt="Excel export"
              className="w-[4.5rem] h-[4.5rem] object-contain shrink-0"
            />
            <div className="text-left">
              <h4 className="text-sm font-semibold text-white">{t.finance.excelExportTitle}</h4>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                {t.finance.excelExportDesc}
              </p>
            </div>
          </div>

          {/* Finance Feature Highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-[#141416] p-4 rounded-sm border border-white/10">
              <div className="text-[#D4AF37] font-bold text-sm mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> {t.finance.feat1Title}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t.finance.feat1Desc}
              </p>
            </div>

            <div className="bg-[#141416] p-4 rounded-sm border border-white/10">
              <div className="text-[#D4AF37] font-bold text-sm mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> {t.finance.feat2Title}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t.finance.feat2Desc}
              </p>
            </div>

            <div className="bg-[#141416] p-4 rounded-sm border border-white/10">
              <div className="text-[#D4AF37] font-bold text-sm mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> {t.finance.feat3Title}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t.finance.feat3Desc}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 sm:p-6 bg-[#141416] rounded-sm border border-white/10 text-left">
            <h3 className="text-sm font-serif-luxury text-white">{t.finance.watchHowToTitle}</h3>
            <p className="mt-1 mb-4 text-xs text-white/60">{t.finance.watchHowToDesc}</p>
            <YoutubeEmbed
              youtubeId={VIDEO_CATALOG.financeHowTo.youtubeId}
              title={t.videos.items.financeHowTo.title}
              playLabel={t.videos.playLabel}
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WEB_DEMO_URLS.finance}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.liteDownload.tryFinanceDemo}</span>
            </a>
            <a
              href={PRODUCTS.finance.checkoutUrl}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-lg transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.finance.buyButton}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
