export function ProgressIndicator({ value, label, max = 100 }) {
  const safeValue = Math.min(Math.max(value, 0), max);
  const percentage = max === 0 ? 0 : (safeValue / max) * 100;

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-[0.8125rem] text-neutral-500">
          <span>{label}</span>
          <span>{safeValue}/{max}</span>
        </div>
      ) : null}
      <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100" aria-hidden="true">
        <div
          className="h-full rounded-full bg-[#184D47] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
