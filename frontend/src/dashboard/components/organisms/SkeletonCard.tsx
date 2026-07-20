export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[1.25rem] border border-[#e6eae9] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,32,0.04)]">
      <div className="h-4 w-24 rounded-full bg-[#e6eae9]" />
      <div className="mt-4 h-3 w-full rounded-full bg-[#f3f5f5]" />
      <div className="mt-2 h-3 w-3/4 rounded-full bg-[#f3f5f5]" />
      <div className="mt-5 h-10 w-full rounded-[0.9rem] bg-[#f3f5f5]" />
    </div>
  );
}
