import { formatCurrency, formatNumber } from '../../utils/format';
import { Card } from '../common/Card';
import type { DashboardSummary } from '../../types';

interface ChannelBreakdownProps {
  summary: DashboardSummary;
}

export const ChannelBreakdown = ({ summary }: ChannelBreakdownProps) => {
  const peakOrders = Math.max(...summary.channelBreakdown.map((item) => item.totalOrders), 1);

  return (
    <Card title="Đơn theo từng kênh" subtitle="Mini chart giúp nhìn nhanh kênh nào tạo ra nhiều đơn nhất">
      <div className="space-y-4">
        {summary.channelBreakdown.map((item) => (
          <div key={item.channel} className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm text-slate-200">
              <div>
                <p className="font-medium text-white">{item.channel}</p>
                <p className="text-slate-400">Doanh thu mô phỏng: {formatCurrency(item.revenue)}</p>
              </div>
              <p className="text-right font-semibold">{formatNumber(item.totalOrders)} đơn</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${(item.totalOrders / peakOrders) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
