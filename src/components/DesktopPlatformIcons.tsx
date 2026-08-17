import React from 'react';

type DesktopPlatformIconsProps = {
  size?: 'sm' | 'md';
  className?: string;
};

const sizeMap = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
};

export const WindowsIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#00A4EF" d="M3 4.5h9v9H3V4.5zm10 0h9V13h-9V4.5zM3 14.5h9v9H3v-9zm10 0h9v9h-9v-9z" />
  </svg>
);

export const MacOsIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      className="text-white/90"
      d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
    />
  </svg>
);

export const LinuxIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#FCC624"
      d="M12 2c-1.1 0-2 .9-2 2v1.1c-2.1.5-3.8 2.2-4.3 4.3-.2.9-.1 1.8.2 2.6-.6.3-1.1.8-1.4 1.4-.5.9-.5 2 .1 2.9.4.7 1.1 1.2 1.9 1.4.4 1.5 1.5 2.8 3 3.4.3.1.6.2.9.2.5 0 1-.1 1.4-.3.4.2.9.3 1.4.3.3 0 .6-.1.9-.2 1.5-.6 2.6-1.9 3-3.4.8-.2 1.5-.7 1.9-1.4.6-.9.6-2-.1-2.9-.3-.6-.8-1.1-1.4-1.4.3-.8.4-1.7.2-2.6-.5-2.1-2.2-3.8-4.3-4.3V4c0-1.1-.9-2-2-2zm-1.5 8.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm3 0c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z"
    />
    <ellipse fill="#333" cx="10.5" cy="11" rx="1" ry="1.2" />
    <ellipse fill="#333" cx="13.5" cy="11" rx="1" ry="1.2" />
  </svg>
);

export const AndroidIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#3DDC84"
      d="M17.6 9.48l1.84-3.18c.16-.31-.04-.68-.38-.84-.32-.15-.7-.03-.86.28l-1.87 3.23a11.04 11.04 0 0 0-8.94 0L5.12 5.78a.636.636 0 0 0-.86-.28c-.34.16-.54.53-.38.84L5.6 9.48C2.61 11.36 1 14.47 1 18h22c0-3.53-1.61-6.64-4.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25S6.31 12.75 7 12.75s1.25.56 1.25 1.25S7.69 15.25 7 15.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"
    />
  </svg>
);

export const IosIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      className="text-white/80"
      d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
    />
  </svg>
);

export const DesktopPlatformIcons: React.FC<DesktopPlatformIconsProps> = ({
  size = 'md',
  className = '',
}) => {
  const iconClass = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Desktop platforms">
      <span className="inline-flex items-center justify-center rounded-sm bg-white/5 border border-white/10 p-1.5">
        <WindowsIcon className={iconClass} />
      </span>
      <span className="inline-flex items-center justify-center rounded-sm bg-white/5 border border-white/10 p-1.5">
        <MacOsIcon className={iconClass} />
      </span>
      <span className="inline-flex items-center justify-center rounded-sm bg-white/5 border border-white/10 p-1.5">
        <LinuxIcon className={iconClass} />
      </span>
    </div>
  );
};
