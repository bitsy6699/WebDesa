export function TableToolbar({ children, actions, title }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1.5">
        {title ? <p className="text-[0.75rem] font-semibold text-neutral-500">{title}</p> : null}
        {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
