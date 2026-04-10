interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => (
  <div className="space-y-2">
    <p className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
      {eyebrow}
    </p>
    <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl tracking-tight">
      {title}
    </h2>
    <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400 md:text-base font-medium">
      {description}
    </p>
  </div>
);
