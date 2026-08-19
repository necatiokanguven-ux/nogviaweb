export type VideoCategory = 'howToUse' | 'installation' | 'guides' | 'marketing';

export type VideoKey =
  | 'guestGuideHowTo'
  | 'financeHowTo'
  | 'liteInstall'
  | 'guestGuidePublishQr'
  | 'guestGuideCustomSection'
  | 'marketingHubkits'
  | 'marketingStopManaging';

export type VideoEntry = {
  youtubeId: string;
  category: VideoCategory;
};

export const VIDEO_CATALOG: Record<VideoKey, VideoEntry> = {
  guestGuideHowTo: { youtubeId: '9y0mjI65bCc', category: 'howToUse' },
  financeHowTo: { youtubeId: '6AyPyTTRMvA', category: 'howToUse' },
  liteInstall: { youtubeId: 'ckivyjbK5bo', category: 'installation' },
  guestGuidePublishQr: { youtubeId: 'lBE9IXHS8oc', category: 'guides' },
  guestGuideCustomSection: { youtubeId: 'vqe9ZcCH0m8', category: 'guides' },
  marketingHubkits: { youtubeId: '4coiHPEyldY', category: 'marketing' },
  marketingStopManaging: { youtubeId: 'Fyjo7_KP3V4', category: 'marketing' },
};

export const VIDEO_CATEGORIES: VideoCategory[] = [
  'howToUse',
  'installation',
  'guides',
  'marketing',
];

export const VIDEOS_BY_CATEGORY: Record<VideoCategory, VideoKey[]> = {
  howToUse: ['guestGuideHowTo', 'financeHowTo'],
  installation: ['liteInstall'],
  guides: ['guestGuidePublishQr', 'guestGuideCustomSection'],
  marketing: ['marketingHubkits', 'marketingStopManaging'],
};

export const DEFAULT_VIDEO_KEY: VideoKey = 'guestGuideHowTo';

export function youtubeThumbnail(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}
