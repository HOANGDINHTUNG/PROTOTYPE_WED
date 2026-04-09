import type { NavItem } from '../types';

export const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    description: 'Theo dõi toàn bộ trạng thái vận hành đa kênh',
  },
  {
    label: 'Tạo đơn hàng',
    to: '/orders/create',
    description: 'Mô phỏng tiếp nhận đơn từ nhiều kênh bán',
  },
  {
    label: 'Decision Engine',
    to: '/decision-engine',
    description: 'Giải thích vì sao hệ thống chọn kho xử lý',
  },
  {
    label: 'Đơn hàng',
    to: '/orders',
    description: 'Theo dõi trạng thái, timeline và cập nhật đơn',
  },
  {
    label: 'Tồn kho',
    to: '/inventory',
    description: 'Giám sát tồn kho đa điểm theo thời gian thực',
  },
  {
    label: 'Nhật ký hệ thống',
    to: '/logs',
    description: 'Lưu vết thao tác để demo như hệ thống thật',
  },
];
