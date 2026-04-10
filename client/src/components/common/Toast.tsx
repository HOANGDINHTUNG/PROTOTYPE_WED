import { useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  X,
  Info,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NotificationType } from "../../features/notifications/notificationsSlice";
import { removeNotification } from "../../features/notifications/notificationsSlice";
import { useAppDispatch } from "../../hooks/redux";

interface ToastProps {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

const toastStyles: Record<
  NotificationType,
  { icon: LucideIcon; color: string; border: string; bg: string }
> = {
  success: {
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/30",
    bg: "bg-white dark:bg-emerald-500/10",
  },
  error: {
    icon: AlertCircle,
    color: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-500/30",
    bg: "bg-white dark:bg-rose-500/10",
  },
  info: {
    icon: Info,
    color: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-500/30",
    bg: "bg-white dark:bg-cyan-500/10",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/30",
    bg: "bg-white dark:bg-amber-500/10",
  },
};

export const Toast = ({ id, type, message, duration = 5000 }: ToastProps) => {
  const dispatch = useAppDispatch();
  const { icon: Icon, color, border, bg } = toastStyles[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [dispatch, id, duration]);

  return (
    <div
      className={`
      flex items-center gap-4 px-6 py-4 rounded-[24px] border backdrop-blur-2xl shadow-2xl animate-fade-in-up
      ${bg} ${border} ${color}
    `}
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
        {message}
      </p>
      <button
        onClick={() => dispatch(removeNotification(id))}
        className="ml-3 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

import { selectNotifications } from "../../features/notifications/notificationsSlice";
import { useAppSelector } from "../../hooks/redux";

export const ToastContainer = () => {
  const notifications = useAppSelector(selectNotifications);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {notifications.map((n) => (
        <div key={n.id} className="pointer-events-auto">
          <Toast {...n} />
        </div>
      ))}
    </div>
  );
};
