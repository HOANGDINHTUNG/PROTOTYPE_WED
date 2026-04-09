import type { PropsWithChildren, ReactNode } from 'react';
import { classNames } from '../../utils/classNames';

interface CardProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export const Card = ({ title, subtitle, action, className, children }: CardProps) => (
  <section
    className={classNames(
      'rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_-35px_rgba(56,189,248,0.35)] backdrop-blur-xl',
      className,
    )}
  >
    {(title || subtitle || action) && (
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          {title ? <h3 className="text-lg font-semibold text-white">{title}</h3> : null}
          {subtitle ? <p className="mt-1 text-sm text-slate-300">{subtitle}</p> : null}
        </div>
        {action}
      </header>
    )}
    {children}
  </section>
);
