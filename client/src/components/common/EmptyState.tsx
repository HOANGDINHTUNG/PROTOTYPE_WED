interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-[28px] border border-dashed border-slate-200 dark:border-indigo-500/15 bg-white dark:bg-[#101827] px-8 py-16 text-center">
    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
      {title}
    </h3>
    <p className="mt-2 text-sm font-medium text-slate-400 dark:text-slate-500">
      {description}
    </p>
  </div>
);
