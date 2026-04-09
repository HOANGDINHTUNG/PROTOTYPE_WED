import { formatNumber } from '../../utils/format';
import { Card } from '../common/Card';
import type { DashboardSummary } from '../../types';

interface MetricGridProps {
  summary: DashboardSummary;
}

export const MetricGrid = ({ summary }: MetricGridProps) => {
  const metrics = [
    { label: 'Tổng số đơn hàng', value: summary.totalOrders, helper: 'Tổng đơn hiện có trong mô phỏng' },
    { label: 'Đơn đang xử lý', value: summary.processingOrders, helper: 'Đơn cần theo dõi vận hành' },
    { label: 'Giao thành công', value: summary.deliveredOrders, helper: 'Đơn đã hoàn tất thành công' },
    { label: 'Hoàn / lỗi', value: summary.returnOrFailedOrders, helper: 'Các đơn cần rà soát chất lượng' },
    { label: 'Tồn kho toàn hệ thống', value: summary.totalInventoryUnits, helper: 'Tổng số lượng khả dụng đa điểm' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-white/6">
          <p className="text-sm text-slate-400">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{formatNumber(metric.value)}</p>
          <p className="mt-2 text-sm text-slate-300">{metric.helper}</p>
        </Card>
      ))}
    </div>
  );
};
