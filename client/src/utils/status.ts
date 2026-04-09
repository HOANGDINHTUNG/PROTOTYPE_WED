import type { OrderStatus } from '../types';

export const getStatusTone = (status: OrderStatus): string => {
  switch (status) {
    case 'Giao thành công':
      return 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30';
    case 'Giao thất bại':
    case 'Hoàn hàng':
      return 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30';
    case 'Đang giao':
      return 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30';
    case 'Đã đóng gói':
    case 'Đang xử lý':
    case 'Đang phân bổ':
      return 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30';
    default:
      return 'bg-slate-500/15 text-slate-200 ring-1 ring-slate-400/30';
  }
};
