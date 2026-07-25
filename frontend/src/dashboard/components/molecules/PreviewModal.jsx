import { useEffect } from 'react';
import { X, Download, Trash2 } from 'lucide-react';

export function PreviewModal({ media, onClose, onDelete }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!media) return null;

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3.5">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-neutral-800 truncate">{media.filename}</h3>
            <p className="mt-0.5 text-xs text-neutral-500">
              {media.filetype} &middot; {formatSize(media.filesize)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={media.filepath}
              download
              className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
              aria-label="Unduh"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(media.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                aria-label="Hapus"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100"
              aria-label="Tutup"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center bg-neutral-50 p-8">
          <img
            src={media.filepath}
            alt={media.alt_text ?? media.filename}
            className="max-h-[60vh] rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
}
