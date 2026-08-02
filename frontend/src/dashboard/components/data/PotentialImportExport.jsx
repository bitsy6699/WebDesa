import { useEffect, useRef, useState } from 'react';
import { Upload, Download, FileDown, ChevronDown, LoaderCircle } from 'lucide-react';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
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

export function PotentialImportExport({ onResult }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const run = async (key, fn) => {
    setBusy(key);
    try {
      const result = await fn();
      if (result && typeof result === 'object' && result.blob) {
        saveBlob(result.blob, result.filename);
      }
      if (key === 'import') {
        queryClient.invalidateQueries({ queryKey: queryKeys.adminPotentials.all });
        onResult?.({ variant: 'success', message: 'Data berhasil diimport.' });
      } else {
        onResult?.({ variant: 'success', message: `File ${key === 'template' ? 'template' : 'export'} berhasil diunduh.` });
      }
    } catch (err) {
      onResult?.({ variant: 'danger', message: err.response?.data?.error?.message ?? err.message ?? 'Operasi gagal.' });
    } finally {
      setBusy(null);
    }
  };

  const handleTemplate = () => {
    setOpen(false);
    run('template', async () => {
      const blob = await downloadImportTemplate();
      return { blob, filename: 'template-import-potensi.xlsx' };
    });
  };

  const handleExport = () => {
    setOpen(false);
    run('export', async () => {
      const blob = await exportPotentials();
      return { blob, filename: 'export-potensi.xlsx' };
    });
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOpen(false);
    run('import', () => importPotentials(file));
    e.target.value = '';
  };

  const items = [
    {
      key: 'template',
      icon: FileDown,
      label: 'Unduh Template',
      onClick: handleTemplate,
    },
    {
      key: 'export',
      icon: Download,
      label: 'Ekspor Data',
      onClick: handleExport,
    },
    {
      key: 'import',
      icon: Upload,
      label: 'Impor Data',
      onClick: () => fileInputRef.current?.click(),
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleImportFile}
      />

      <DashboardButton
        variant="secondary"
        size="md"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {busy ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
        {busy ? 'Memproses...' : 'Impor/Ekspor'}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </DashboardButton>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-[#E7E7E7] bg-white shadow-lg"
          >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="menuitem"
                  onClick={item.onClick}
                  disabled={busy !== null}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[0.8125rem] text-neutral-700 transition-colors duration-150 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Icon className="h-3.5 w-3.5 text-neutral-400" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
