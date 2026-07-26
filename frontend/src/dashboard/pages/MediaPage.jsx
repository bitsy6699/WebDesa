import { useRef, useState } from 'react';
import { Upload, LoaderCircle, Trash2 } from 'lucide-react';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { EmptyState } from '@/dashboard/components/organisms/EmptyState';
import { TablePagination } from '@/dashboard/components/data/TablePagination';
import { PreviewModal } from '@/dashboard/components/molecules/PreviewModal';
import { useMediaList, useUploadMedia, useDeleteMedia } from '@/hooks/useMedia';

export default function MediaPage() {
  const fileInputRef = useRef(null);
  const [page, setPage] = useState(1);
  const [previewMedia, setPreviewMedia] = useState(null);

  const { data, isLoading } = useMediaList({ page, per_page: 12 });
  const uploadMutation = useUploadMedia();
  const deleteMutation = useDeleteMedia();

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;

    for (const file of Array.from(files)) {
      await uploadMutation.mutateAsync({ file });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus gambar ini?')) {
      deleteMutation.mutate(id);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        onChange={handleUpload}
        className="hidden"
      />

      {uploadMutation.isSuccess && <Alert title="Gambar berhasil diunggah." variant="success" />}
      {(uploadMutation.error || deleteMutation.error) && (
        <Alert
          title={(uploadMutation.error ?? deleteMutation.error)?.message ?? 'Terjadi kesalahan.'}
          variant="danger"
        />
      )}

      <PageHeader
        title="Media Library"
        description="Kelola gambar dan aset media untuk potensi desa."
        badge={`${data?.meta?.total ?? 0} file`}
        actions={
          <DashboardButton
            onClick={() => fileInputRef.current?.click()}
            loading={uploadMutation.isPending}
          >
            + Upload
          </DashboardButton>
        }
      />

      {uploadMutation.isPending && (
        <div className="flex items-center gap-3 rounded-xl border border-[#184D47]/20 bg-[#184D47]/5 px-4 py-3 text-[0.8125rem] text-[#184D47]">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          <span>Mengunggah gambar...</span>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-xl bg-neutral-200" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <EmptyState
          title="Belum ada gambar"
          description="Upload gambar pertama untuk media library Anda."
          action={
            <DashboardButton onClick={() => fileInputRef.current?.click()}>
              + Upload
            </DashboardButton>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data?.data.map((media) => (
            <div
              key={media.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#E8ECEA] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
              onClick={() => setPreviewMedia(media)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={media.filepath}
                  alt={media.alt_text ?? media.filename}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <p className="truncate text-[0.75rem] font-medium text-neutral-800">{media.filename}</p>
                <p className="text-[0.65rem] text-neutral-400">{formatSize(media.filesize)}</p>
              </div>
              <div className="absolute right-2 top-2 opacity-0 transition-all duration-150 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(media.id);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-neutral-500 shadow-sm transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Hapus gambar"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {data?.meta && (
        <TablePagination
          page={data.meta.current_page}
          pageSize={data.meta.per_page}
          totalItems={data.meta.total}
          onPageChange={setPage}
        />
      )}

      <PreviewModal
        media={previewMedia}
        onClose={() => setPreviewMedia(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}
