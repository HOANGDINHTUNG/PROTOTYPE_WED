import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../utils/classNames";

interface ButtonProps
  extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-br from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 shadow-[0_4px_16px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_28px_rgba(99,102,241,0.45)] active:shadow-inner",
  secondary:
    "bg-white text-slate-800 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-700 dark:bg-slate-800/80 dark:text-slate-100 dark:border-indigo-500/10 dark:hover:bg-slate-700/80 dark:hover:border-indigo-500/25",
  ghost:
    "bg-transparent text-slate-500 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-400 dark:hover:bg-indigo-500/8 dark:hover:text-indigo-300",
  danger:
    "bg-gradient-to-br from-rose-600 to-pink-500 text-white hover:from-rose-500 hover:to-pink-400 shadow-[0_4px_16px_rgba(225,29,72,0.3)] hover:shadow-[0_8px_28px_rgba(225,29,72,0.4)]",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={classNames(
      "inline-flex items-center justify-center rounded-2xl font-bold tracking-tight transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
      variants[variant],
      sizes[size],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
