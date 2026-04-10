import type { OrderStatus } from "../types";

export const getStatusTone = (status: OrderStatus): string => {
  switch (status) {
    case "Giao thành công":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30";
    case "Giao thất bại":
    case "Hoàn hàng":
      return "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/30";
    case "Đang giao":
      return "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/30";
    case "Đã đóng gói":
    case "Đang xử lý":
    case "Đang phân bổ":
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30";
    default:
      return "bg-slate-50 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-white/5";
  }
};
