import React from 'react';
import { MEDIA } from '../constants/media';

interface NogviaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const NogviaLogo: React.FC<NogviaLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-11',
    xl: 'h-16',
  };

  return (
    <div className={`inline-flex flex-col items-start gap-1 select-none ${className}`}>
      <img
        src={MEDIA.logoWhite}
        alt="nogvia"
        className={`${sizeClasses[size]} w-auto`}
      />
      {showTagline && (
        <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
          Offline Host Kit
        </span>
      )}
    </div>
  );
};
