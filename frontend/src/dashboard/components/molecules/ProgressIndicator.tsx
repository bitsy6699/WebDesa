export interface ProgressIndicatorProps {
  value: number;
  label?: string;
  max?: number;
}

export function ProgressIndicator({ value, label, max = 100 }: ProgressIndicatorProps) {
  const safeValue = Math.min(Math.max(value, 0), max);
  const percentage = max === 0 ? 0 : (safeValue / max) * 100;

  return (
    <div className="space-y-2">
      {label ? <div className="flex items-center justify-between text-sm text-[#64748b]"><span>{label}</span><span>{safeValue}/{max}</span></div> : null}
      <div className="h-2 rounded-full bg-[#f3f5f5]" aria-hidden="true">
        <div className="h-2 rounded-full bg-[#0f766e] transition-all duration-200" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
