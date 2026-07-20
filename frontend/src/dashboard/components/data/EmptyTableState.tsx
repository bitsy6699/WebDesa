export interface EmptyTableStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyTableState({ title, description, action }: EmptyTableStateProps) {
  return (
    <div className="rounded-[1rem] border border-dashed border-[#d4ddda] bg-[#fcfdfd] p-10 text-center">
      <h3 className="text-[1rem] font-semibold text-[#0f1720]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#64748b]">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
