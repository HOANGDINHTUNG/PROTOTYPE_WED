import type { OrderStatus } from '../../types';
import { getStatusTone } from '../../utils/status';

interface StatusBadgeProps {
  status: OrderStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(status)}`}>
    {status}
  </span>
);
