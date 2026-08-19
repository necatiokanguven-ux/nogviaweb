import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { youtubeThumbnail } from '../constants/videos';

type YoutubeEmbedProps = {
  youtubeId: string;
  title: string;
  playLabel?: string;
  className?: string;
};

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({
  youtubeId,
  title,
  playLabel = 'Play video',
  className = '',
}) => {
  const [active, setActive] = useState(false);

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        className={`group relative block w-full aspect-video overflow-hidden rounded-sm border border-white/10 bg-[#0A0A0B] text-left ${className}`}
        aria-label={playLabel}
      >
        <img
          src={youtubeThumbnail(youtubeId)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          loading="lazy"
        />
        <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/25" />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-lg transition-transform group-hover:scale-105">
            <Play className="h-6 w-6 fill-current" />
          </span>
          <span className="px-4 text-center text-xs font-bold uppercase tracking-widest text-white">
            {playLabel}
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className={`aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-black ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
};
