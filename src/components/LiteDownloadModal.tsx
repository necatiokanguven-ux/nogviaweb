import React from 'react';
import { X } from 'lucide-react';
import { useLiteDownload } from '../context/LiteDownloadContext';
import { LiteDownloadForm } from './LiteDownloadForm';

export const LiteDownloadModal: React.FC = () => {
  const { isModalOpen, closeModal } = useLiteDownload();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close"
        onClick={closeModal}
      />
      <div className="relative w-full max-w-lg">
        <button
          type="button"
          onClick={closeModal}
          className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-[#0F0F10] border border-white/10 text-white/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
        <LiteDownloadForm variant="modal" onClose={closeModal} />
      </div>
    </div>
  );
};
