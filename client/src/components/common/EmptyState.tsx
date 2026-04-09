interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-slate-300">{description}</p>
  </div>
);
