export function LoadingState({ label = 'Loading content…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center rounded-[1.25rem] border border-[#e6eae9] bg-white px-6 py-12 text-sm text-[#64748b]">
      <div className="flex items-center gap-3">
        <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#0f766e]" />
        <span>{label}</span>
      </div>
    </div>
  );
}
