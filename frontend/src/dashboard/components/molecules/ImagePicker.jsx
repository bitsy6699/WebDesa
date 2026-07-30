import { useEffect, useRef, useState } from 'react';
import { Upload, X, LoaderCircle } from 'lucide-react';
import { useUploadMedia } from '@/hooks/useMedia';

export function ImagePicker({
  value,
  onChange,
  multiple = false,
  selectedIds = [],
  onMultipleChange,
  initialPreview,
  initialPreviews = [],
}) {
  const fileInputRef = useRef(null);
  const uploadMutation = useUploadMedia();

  // For single upload
  const [preview, setPreview] = useState(initialPreview || null);

  // For multiple upload, we keep track of the files/media items (id + filepath)
  const [galleryItems, setGalleryItems] = useState(initialPreviews);

  useEffect(() => {
    if (initialPreview) {
      setPreview(initialPreview);
    } else if (value === '') {
      setPreview(null);
    }
  }, [initialPreview, value]);

  useEffect(() => {
    if (initialPreviews && initialPreviews.length > 0) {
      setGalleryItems(initialPreviews);
    } else if (selectedIds.length === 0) {
      setGalleryItems([]);
    }
  }, [initialPreviews, selectedIds.length]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;

    const newItems = [...galleryItems];
    const newIds = [...selectedIds];

    for (const file of Array.from(files)) {
      try {
        const result = await uploadMutation.mutateAsync({ file });
        if (multiple) {
          newItems.push({
            id: result.id,
            filepath: result.filepath,
            filename: result.filename,
          });
          newIds.push(result.id);
        } else {
          onChange(result.id);
          setPreview(result.filepath);
        }
      } catch (err) {
        alert('Gagal mengunggah gambar. Silakan coba lagi.');
      }
    }

    if (multiple && onMultipleChange) {
      setGalleryItems(newItems);
      onMultipleChange(newIds);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveSingle = () => {
    setPreview(null);
    onChange('');
  };

  const handleRemoveMultiple = (idToRemove) => {
    const updatedItems = galleryItems.filter((item) => item.id !== idToRemove);
    const updatedIds = selectedIds.filter((id) => id !== idToRemove);
    setGalleryItems(updatedItems);
    onMultipleChange?.(updatedIds);
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Render Single Preview */}
      {!multiple && preview && (
        <div className="relative inline-block">
          <img src={preview} alt="Pratinjau" className="h-32 w-32 rounded-xl border border-[#E7E7E7] object-cover" />
          <button
            type="button"
            onClick={handleRemoveSingle}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Render Multiple Previews */}
      {multiple && galleryItems.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="relative aspect-square w-full group rounded-xl overflow-hidden border border-[#E7E7E7]">
              <img src={item.filepath} alt={item.filename || 'Item galeri'} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveMultiple(item.id)}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadMutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-[#E7E7E7] bg-[#F8FAF8] px-4 py-3 text-[0.8125rem] text-neutral-500 transition-all duration-150 hover:border-[#184D47] hover:text-[#184D47]"
        >
          {uploadMutation.isPending ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploadMutation.isPending ? 'Mengunggah...' : multiple ? 'Unggah Foto Galeri' : 'Pilih atau unggah gambar'}
        </button>
      </div>
    </div>
  );
}
