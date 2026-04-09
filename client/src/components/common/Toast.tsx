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
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  error: {
    icon: AlertCircle,
    color: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
  },
  info: {
    icon: Info,
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
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
      flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl animate-fade-in-up
      ${bg} ${border} ${color}
    `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-bold tracking-tight text-white">{message}</p>
      <button
        onClick={() => dispatch(removeNotification(id))}
        className="ml-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4 opacity-50 hover:opacity-100" />
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
