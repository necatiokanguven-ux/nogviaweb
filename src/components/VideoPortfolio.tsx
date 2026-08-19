import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '../constants/data';
import { useLanguage } from '../context/LanguageContext';
import {
  DEFAULT_VIDEO_KEY,
  VIDEO_CATALOG,
  VIDEO_CATEGORIES,
  VIDEOS_BY_CATEGORY,
  type VideoCategory,
  type VideoKey,
} from '../constants/videos';
import { YoutubeEmbed } from './YoutubeEmbed';
import { Film, ShoppingBag } from 'lucide-react';

export const VideoPortfolio: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('howToUse');
  const categoryVideos = VIDEOS_BY_CATEGORY[activeCategory];
  const [activeVideoKey, setActiveVideoKey] = useState<VideoKey>(
    categoryVideos[0] ?? DEFAULT_VIDEO_KEY,
  );

  const activeVideo = VIDEO_CATALOG[activeVideoKey];
  const activeCopy = t.videos.items[activeVideoKey];

  const sidebarVideos = useMemo(
    () => categoryVideos.map((key) => ({ key, entry: VIDEO_CATALOG[key] })),
    [categoryVideos],
  );

  const handleCategoryChange = (category: VideoCategory) => {
    setActiveCategory(category);
    const first = VIDEOS_BY_CATEGORY[category][0];
    if (first) setActiveVideoKey(first);
  };

  return (
    <section id="videos" className="py-20 md:py-32 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.videos.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight">
            {t.videos.title}{' '}
            <span className="text-[#D4AF37] font-bold">{t.videos.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60">{t.videos.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {VIDEO_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeCategory === category
                  ? 'bg-[#D4AF37] text-black shadow-lg glow-gold'
                  : 'bg-[#0F0F10] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {t.videos.categories[category]}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto bg-[#0F0F10] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px]">
            <div className="p-6 sm:p-8 space-y-4 text-left border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                <h3 className="text-lg font-serif-luxury text-white">{activeCopy.title}</h3>
                <p className="mt-2 text-sm text-white/60">{activeCopy.description}</p>
              </div>

              <YoutubeEmbed
                key={activeVideoKey}
                youtubeId={activeVideo.youtubeId}
                title={activeCopy.title}
                playLabel={t.videos.playLabel}
              />
            </div>

            <aside className="p-4 sm:p-5 bg-[#141416] space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
                {t.videos.categories[activeCategory]}
              </p>
              {sidebarVideos.map(({ key }) => {
                const copy = t.videos.items[key];
                const isActive = key === activeVideoKey;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveVideoKey(key)}
                    className={`w-full text-left p-3 rounded-sm border transition-colors ${
                      isActive
                        ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10'
                        : 'border-white/5 bg-[#0F0F10] hover:border-white/15'
                    }`}
                  >
                    <span
                      className={`block text-xs font-semibold leading-snug ${
                        isActive ? 'text-[#D4AF37]' : 'text-white'
                      }`}
                    >
                      {copy.title}
                    </span>
                  </button>
                );
              })}
            </aside>
          </div>

          <div className="p-6 bg-[#141416] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">{t.videos.ctaTitle}</div>
              <div className="text-xs text-white/50">{t.videos.ctaSub}</div>
            </div>
            <a
              href={PRODUCTS.hostKit.checkoutUrl}
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
