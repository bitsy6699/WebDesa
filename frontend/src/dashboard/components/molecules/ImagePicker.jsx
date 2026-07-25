import { useEffect, useRef, useState } from 'react';
import { Upload, X, LoaderCircle } from 'lucide-react';
import { useUploadMedia } from '@/hooks/useMedia';

export function ImagePicker({ value, onChange, multiple = false, selectedIds = [], onMultipleChange }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const uploadMutation = useUploadMedia();

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;

    for (const file of Array.from(files)) {
      const result = await uploadMutation.mutateAsync({ file });
      if (multiple && onMultipleChange) {
        onMultipleChange([...selectedIds, result.id]);
      } else {
        onChange(result.id);
        setPreview(result.filepath);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (value && !preview) {
      // If we have a value but no preview URL, we'd need to fetch it
      // For now, assume value is a URL or we construct it
    }
  }, [value, preview]);

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {preview && (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="h-32 w-32 rounded-xl border border-[#E8ECEA] object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onChange('');
            }}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploadMutation.isPending}
        className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[#E8ECEA] bg-[#F8FAF8] px-4 py-3 text-[0.8125rem] text-neutral-500 transition-all duration-150 hover:border-[#184D47] hover:text-[#184D47]"
      >
        {uploadMutation.isPending ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        {uploadMutation.isPending ? 'Mengunggah...' : 'Pilih atau upload gambar'}
      </button>
    </div>
  );
}
