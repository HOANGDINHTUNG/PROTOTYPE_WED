import type { PropsWithChildren, ReactNode } from "react";
import { classNames } from "../../utils/classNames";

interface CardProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export const Card = ({
  title,
  subtitle,
  action,
  className,
  children,
}: CardProps) => (
  <section
    className={classNames(
      "rounded-[32px] border border-white/60 bg-white/85 p-7 backdrop-blur-2xl transition-all duration-500 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_32px_-4px_rgba(100,116,139,0.12)] dark:border-indigo-500/10 dark:bg-[#0e172a] dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_20px_48px_-8px_rgba(0,0,0,0.6)]",
      className,
    )}
  >
    {(title || subtitle || action) && (
      <header className="mb-7 flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          {title ? (
            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {title}
            </h3>
          ) : null}
          {subtitle ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              {subtitle}
            </p>
          ) : null}
        </div>
        {action}
      </header>
    )}
    <div className="relative">{children}</div>
  </section>
);
