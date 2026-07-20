export function SkeletonTable({ rows = 4 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-[#e6eae9] bg-white shadow-[0_1px_2px_rgba(15,23,32,0.04)]">
      <div className="h-12 border-b border-[#e6eae9] bg-[#fbfcfc]" />
      <div className="divide-y divide-[#e6eae9]">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 px-4 py-4">
            <div className="h-3 w-24 rounded-full bg-[#e6eae9]" />
            <div className="ml-auto h-3 w-24 rounded-full bg-[#f3f5f5]" />
            <div className="h-3 w-16 rounded-full bg-[#f3f5f5]" />
          </div>
        ))}
      </div>
    </div>
  );
}
