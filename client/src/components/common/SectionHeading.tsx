interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="space-y-2">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
    <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
    <p className="max-w-3xl text-sm text-slate-300 md:text-base">{description}</p>
  </div>
);
