import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Home,
  AlertCircle,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrderStatus } from "../../types";

interface LifecycleStepperProps {
  currentStatus: OrderStatus;
}

export const LifecycleStepper = ({ currentStatus }: LifecycleStepperProps) => {
  const { t } = useTranslation();

  const statusSteps: Array<{
    status: OrderStatus;
    icon: LucideIcon;
    label: string;
  }> = [
    {
      status: "Đã tiếp nhận",
      icon: Clock,
      label: t("orders.stepper.Received"),
    },
    {
      status: "Đã xác minh",
      icon: CheckCircle2,
      label: t("orders.stepper.Verified"),
    },
    {
      status: "Kiểm tra tồn kho",
      icon: Package,
      label: t("orders.stepper.StockCheck"),
    },
    {
      status: "Đã phân bổ",
      icon: Zap,
      label: t("orders.stepper.Allocated"),
    },
    {
      status: "Đã thanh toán",
      icon: AlertCircle,
      label: t("orders.stepper.Paid"),
    },
    {
      status: "Đã đóng gói",
      icon: Package,
      label: t("orders.stepper.Packed"),
    },
    {
      status: "Sẵn sàng giao",
      icon: Home,
      label: t("orders.stepper.Ready"),
    },
    {
      status: "Đang giao",
      icon: Truck,
      label: t("orders.stepper.Shipping"),
    },
    {
      status: "Giao thành công",
      icon: CheckCircle2,
      label: t("orders.stepper.Delivered"),
    },
    {
      status: "Đã đối soát",
      icon: Clock,
      label: t("orders.stepper.Reconciled"),
    },
  ];

  const currentIndex = statusSteps.findIndex((s) => s.status === currentStatus);
  const isFailed =
    currentStatus === "Giao thất bại" || currentStatus === "Hoàn hàng";

  return (
    <div className="flex items-center w-full max-w-sm gap-0 group/stepper">
      {statusSteps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const Icon = step.icon;

        return (
          <div
            key={step.status}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="relative group">
              <div
                className={`
                flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-500
                ${
                  isCompleted
                    ? "bg-cyan-500 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : isCurrent
                      ? "bg-white border-cyan-500 text-cyan-600 animate-pulse dark:bg-slate-800 dark:border-cyan-400 dark:text-cyan-400 shadow-sm"
                      : "bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-white/5 dark:text-slate-600"
                }
              `}
              >
                {isCompleted ? (
                  <div className="bg-white rounded-full p-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                  </div>
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Enhanced Tooltip */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-[10px] font-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl scale-90 group-hover:scale-100 translate-y-2 group-hover:translate-y-0">
                {step.label}
              </div>
            </div>

            {index < statusSteps.length - 1 && (
              <div
                className={`h-[2px] flex-1 mx-1.5 rounded-full transition-all duration-700 ${isCompleted ? "bg-gradient-to-r from-cyan-500 to-cyan-500/50" : "bg-slate-100 dark:bg-white/5"}`}
              />
            )}
          </div>
        );
      })}

      {isFailed && (
        <div className="ml-3 pl-3 border-l border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-500/20 dark:border-rose-500/40 dark:text-rose-400 shadow-sm">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};
