import { clsx } from 'clsx';

export interface PublishStatusToggleProps {
  published?: boolean;
  onToggle?: () => void;
}

export function PublishStatusToggle({ published = false, onToggle }: PublishStatusToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200',
        published ? 'border-[#bbf7d0] bg-[#ecfdf3] text-[#166534]' : 'border-[#e6eae9] bg-[#f8faf9] text-[#64748b]',
      )}
    >
      {published ? 'Published' : 'Draft'}
    </button>
  );
}
