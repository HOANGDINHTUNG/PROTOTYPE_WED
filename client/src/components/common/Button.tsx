import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { classNames } from '../../utils/classNames';

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
  secondary: 'bg-white/10 text-white hover:bg-white/15',
  ghost: 'bg-transparent text-slate-200 hover:bg-white/10',
  danger: 'bg-rose-500 text-white hover:bg-rose-400',
};

export const Button = ({ variant = 'primary', className, children, ...props }: ButtonProps) => (
  <button
    className={classNames(
      'inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50',
      variants[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
