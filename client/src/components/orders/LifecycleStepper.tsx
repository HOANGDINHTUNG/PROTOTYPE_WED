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
import type { OrderStatus } from "../../types";

interface LifecycleStepperProps {
  currentStatus: OrderStatus;
}

const statusSteps: Array<{
  status: OrderStatus;
  icon: LucideIcon;
  label: string;
}> = [
  { status: "Đã tiếp nhận", icon: Clock, label: "Received" },
  { status: "Đang xử lý", icon: Zap, label: "Processing" },
  { status: "Đã đóng gói", icon: Package, label: "Packed" },
  { status: "Đang giao", icon: Truck, label: "Shipping" },
  { status: "Giao thành công", icon: Home, label: "Delivered" },
];

export const LifecycleStepper = ({ currentStatus }: LifecycleStepperProps) => {
  const currentIndex = statusSteps.findIndex((s) => s.status === currentStatus);
  const isFailed =
    currentStatus === "Giao thất bại" || currentStatus === "Hoàn hàng";

  return (
    <div className="flex items-center w-full max-w-sm gap-0">
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
                flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300
                ${
                  isCompleted
                    ? "bg-cyan-500 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                    : isCurrent
                      ? "bg-slate-900 border-cyan-400 text-cyan-400 animate-pulse"
                      : "bg-slate-950 border-white/10 text-slate-600"
                }
              `}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Icon className="w-3 h-3" />
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[9px] font-bold text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5">
                {step.label}
              </div>
            </div>

            {index < statusSteps.length - 1 && (
              <div
                className={`h-[1px] flex-1 mx-1 ${isCompleted ? "bg-cyan-500/50" : "bg-white/5"}`}
              />
            )}
          </div>
        );
      })}

      {isFailed && (
        <div className="ml-2 pl-2 border-l border-white/10">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
        </div>
      )}
    </div>
  );
};
