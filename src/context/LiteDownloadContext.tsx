import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { HOST_KIT_LITE_DOWNLOAD_URL } from '../constants/data';
import { LiteLead, setVerifiedLiteSession } from '../lib/liteDownloadApi';

type LiteDownloadContextValue = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  triggerDownload: () => void;
  saveLead: (lead: LiteLead) => Promise<void>;
};

const LiteDownloadContext = createContext<LiteDownloadContextValue | null>(null);

export function LiteDownloadProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = HOST_KIT_LITE_DOWNLOAD_URL;
    link.download = 'nogvia_hub_lite.zip';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

  const saveLead = useCallback(async (lead: LiteLead) => {
    setVerifiedLiteSession(lead);
  }, []);

  const value = useMemo(
    () => ({
      isModalOpen,
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
      triggerDownload,
      saveLead,
    }),
    [isModalOpen, triggerDownload, saveLead],
  );

  return <LiteDownloadContext.Provider value={value}>{children}</LiteDownloadContext.Provider>;
}

export function useLiteDownload() {
  const context = useContext(LiteDownloadContext);
  if (!context) {
    throw new Error('useLiteDownload must be used within LiteDownloadProvider');
  }
  return context;
}
