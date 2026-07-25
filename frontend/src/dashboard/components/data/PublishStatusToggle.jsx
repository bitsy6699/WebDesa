import { clsx } from 'clsx';

export function PublishStatusToggle({ published = false, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold transition-all duration-150',
        published
          ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
          : 'border-[#E8ECEA] bg-neutral-50 text-neutral-500 hover:bg-neutral-100',
      )}
    >
      {published ? 'Diterbitkan' : 'Draf'}
    </button>
  );
}
