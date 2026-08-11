import React, { useState } from 'react';
import { PRODUCTS, PURCHASE_LINK_PROPS } from '../constants/data';
import { MEDIA } from '../constants/media';
import { useLanguage } from '../context/LanguageContext';
import {
  Play,
  Film,
  QrCode,
  Laptop,
  ShoppingBag,
  Zap,
} from 'lucide-react';

export const VideoPortfolio: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<1 | 2>(2);
  const { t } = useLanguage();

  return (
    <section id="videos" className="py-20 md:py-32 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.videos.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight">
            {t.videos.title} <span className="text-[#D4AF37] font-bold">{t.videos.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60">
            {t.videos.subtitle}
          </p>
        </div>

        {/* Video Selector Tabs */}
        <div className="flex flex-col sm:flex-row justify-center mb-8 gap-3">
          <button
            onClick={() => setActiveVideo(2)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
              activeVideo === 2
                ? 'bg-[#D4AF37] text-black shadow-lg glow-gold'
                : 'bg-[#0F0F10] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t.videos.video1Tab}</span>
          </button>

          <button
            onClick={() => setActiveVideo(1)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
              activeVideo === 1
                ? 'bg-[#D4AF37] text-black shadow-lg glow-gold'
                : 'bg-[#0F0F10] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t.videos.video2Tab}</span>
          </button>
        </div>

        {/* Main Video Showcase Frame */}
        <div className="max-w-4xl mx-auto bg-[#0F0F10] rounded-sm border border-white/10 overflow-hidden shadow-2xl relative">
          {activeVideo === 2 ? (
            <div className="p-6 sm:p-10 space-y-6 text-left">
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {t.videos.v1Tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-serif-luxury text-white text-right">
                    {t.videos.v1Title}
                  </h3>
                </div>

                <div className="aspect-video w-full bg-[#0A0A0B] rounded-sm overflow-hidden border border-white/10">
                  <video
                    key={MEDIA.productWalkthroughVideo}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster={MEDIA.heroHostKit}
                  >
                    <source src={MEDIA.productWalkthroughVideo} type="video/mp4" />
                  </video>
                </div>

                <p className="text-xs sm:text-sm text-white/60 max-w-2xl">
                  {t.videos.v1Sub}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-white/50">
                  <div className="bg-[#141416] p-2 rounded-sm border border-white/5">
                    <span className="text-[#D4AF37] font-bold block">0:01</span> {t.videos.v1Timeline.t1}
                  </div>
                  <div className="bg-[#141416] p-2 rounded-sm border border-white/5">
                    <span className="text-sky-400 font-bold block">0:03</span> {t.videos.v1Timeline.t2}
                  </div>
                  <div className="bg-[#141416] p-2 rounded-sm border border-white/5">
                    <span className="text-[#D4AF37] font-bold block">0:06</span> {t.videos.v1Timeline.t3}
                  </div>
                  <div className="bg-[#141416] p-2 rounded-sm border border-white/5">
                    <span className="text-emerald-400 font-bold block">0:12</span> {t.videos.v1Timeline.t4}
                  </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#141416] rounded-sm border border-white/10">
                  <h4 className="text-sm font-serif-luxury text-white flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#D4AF37]" /> {t.videos.v1Feat1Title}
                  </h4>
                  <p className="text-xs text-white/60 mt-1">
                    {t.videos.v1Feat1Desc}
                  </p>
                </div>

                <div className="p-4 bg-[#141416] rounded-sm border border-white/10">
                  <h4 className="text-sm font-serif-luxury text-white flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-emerald-400" /> {t.videos.v1Feat2Title}
                  </h4>
                  <p className="text-xs text-white/60 mt-1">
                    {t.videos.v1Feat2Desc}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-10 space-y-6 text-left">
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {t.videos.v2Tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-serif-luxury text-white text-right">
                    {t.videos.v2Title}
                  </h3>
                </div>

                <div className="aspect-video w-full bg-[#0A0A0B] rounded-sm overflow-hidden border border-white/10">
                  <video
                    key={MEDIA.hostStoryVideo}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster={MEDIA.heroHostKit}
                  >
                    <source src={MEDIA.hostStoryVideo} type="video/mp4" />
                  </video>
                </div>

                <p className="text-xs sm:text-sm text-white/60 max-w-2xl">
                  {t.videos.v2Sub}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-white/50">
                  <div className="bg-[#141416] p-2 rounded-sm border border-white/5">
                    <span className="text-red-400 font-bold block">Phase 1</span> {t.videos.v2Timeline.t1}
                  </div>
                  <div className="bg-[#141416] p-2 rounded-sm border border-white/5">
                    <span className="text-yellow-400 font-bold block">Phase 2</span> {t.videos.v2Timeline.t2}
                  </div>
                  <div className="bg-[#141416] p-2 rounded-sm border border-white/5">
                    <span className="text-emerald-400 font-bold block">Phase 3</span> {t.videos.v2Timeline.t3}
                  </div>
              </div>

              <div className="p-4 bg-[#141416] rounded-sm border border-white/10">
                <h4 className="text-sm font-serif-luxury text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#D4AF37]" /> {t.videos.v2FeatTitle}
                </h4>
                <p className="text-xs text-white/60 mt-1">
                  {t.videos.v2FeatDesc}
                </p>
              </div>
            </div>
          )}

          <div className="p-6 bg-[#141416] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">{t.videos.ctaTitle}</div>
              <div className="text-xs text-white/50">{t.videos.ctaSub}</div>
            </div>
            <a
              href={PRODUCTS.hostKit.checkoutUrl}
              {...PURCHASE_LINK_PROPS}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.videos.buyButton}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};


