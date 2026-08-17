import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLikelyMobileDevice } from '../lib/deviceSupport';
import {
  AndroidIcon,
  DesktopPlatformIcons,
  IosIcon,
} from './DesktopPlatformIcons';

type DesktopOnlyNoticeProps = {
  variant?: 'info' | 'blocked';
  className?: string;
};

export const DesktopOnlyNotice: React.FC<DesktopOnlyNoticeProps> = ({
  variant = 'info',
  className = '',
}) => {
  const { t } = useLanguage();
  const copy = t.desktopOnly;
  const isMobile = useLikelyMobileDevice();
  const showBlocked = variant === 'blocked' || isMobile;

  if (showBlocked) {
    return (
      <div
        className={`rounded-sm border border-amber-500/35 bg-amber-500/10 p-5 sm:p-6 text-left ${className}`}
      >
        <div className="flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="min-w-0 space-y-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-200/90">
                {copy.mobileBlockedTitle}
              </p>
              <p className="mt-2 text-sm text-amber-100/90 leading-relaxed">
                {copy.mobileBlockedMessage}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-sm bg-black/20 border border-white/10 p-2">
                <AndroidIcon className="w-6 h-6" />
              </span>
              <span className="inline-flex items-center justify-center rounded-sm bg-black/20 border border-white/10 p-2">
                <IosIcon className="w-6 h-6" />
              </span>
              <p className="text-xs text-amber-100/80 leading-relaxed">{copy.androidIosNote}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-sm border border-sky-500/30 bg-sky-500/10 p-5 sm:p-6 text-left ${className}`}
    >
      <div className="flex items-start gap-3">
        <Monitor className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
        <div className="min-w-0 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-200/90">
            {copy.badge}
          </p>
          <DesktopPlatformIcons size="md" />
          <p className="text-sm text-sky-100/90 leading-relaxed">{copy.supportedHint}</p>
          <p className="text-xs text-sky-100/70 leading-relaxed">{copy.androidIosNote}</p>
        </div>
      </div>
    </div>
  );
};
