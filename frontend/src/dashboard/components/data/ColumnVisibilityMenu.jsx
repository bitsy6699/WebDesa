export function ColumnVisibilityMenu({ children }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#E8ECEA] bg-white px-3 py-2 text-[0.8125rem] text-neutral-500">
      <span className="font-medium text-neutral-800">Kolom</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
