import { useRef, useState } from 'react';
import { Upload, Download, FileDown } from 'lucide-react';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { Alert } from '@/dashboard/components/organisms/Alert';
import {
  downloadImportTemplate,
  importPotentials,
  exportPotentials,
} from '@/services/potential.service';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function PotentialImportExport() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const run = async (key, fn) => {
    setBusy(key);
    setError('');
    setSuccess('');
    try {
      const result = await fn();
      if (result && typeof result === 'object' && result.blob) {
        saveBlob(result.blob, result.filename);
      }
      if (key === 'import') {
        setSuccess('Data berhasil diimport.');
        queryClient.invalidateQueries({ queryKey: queryKeys.adminPotentials.all });
      }
    } catch (err) {
      setError(err.response?.data?.error?.message ?? err.message ?? 'Operasi gagal.');
    } finally {
      setBusy(null);
    }
  };

  const handleTemplate = () =>
    run('template', async () => {
      const blob = await downloadImportTemplate();
      return { blob, filename: 'template-import-potensi.xlsx' };
    });

  const handleExport = () =>
    run('export', async () => {
      const blob = await exportPotentials();
      return { blob, filename: 'export-potensi.xlsx' };
    });

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    run('import', () => importPotentials(file));
    e.target.value = '';
  };

  return (
    <div className="relative">
      {(error || success) && (
        <div className="absolute right-0 top-full z-10 mt-2 w-80">
          {error ? <Alert title={error} variant="danger" /> : null}
          {success ? <Alert title={success} variant="success" /> : null}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleImportFile}
      />

      <div className="flex items-center gap-2">
        <DashboardButton
          variant="secondary"
          size="sm"
          loading={busy === 'template'}
          onClick={handleTemplate}
          disabled={busy !== null}
        >
          {busy === 'template' ? null : <FileDown className="h-3.5 w-3.5" />}
          Template
        </DashboardButton>

        <DashboardButton
          variant="secondary"
          size="sm"
          loading={busy === 'export'}
          onClick={handleExport}
          disabled={busy !== null}
        >
          {busy === 'export' ? null : <Download className="h-3.5 w-3.5" />}
          Ekspor
        </DashboardButton>

        <DashboardButton
          variant="secondary"
          size="sm"
          loading={busy === 'import'}
          onClick={() => fileInputRef.current?.click()}
          disabled={busy !== null}
        >
          {busy === 'import' ? null : <Upload className="h-3.5 w-3.5" />}
          Impor
        </DashboardButton>
      </div>
    </div>
  );
}
