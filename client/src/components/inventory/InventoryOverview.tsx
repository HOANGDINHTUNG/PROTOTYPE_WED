import type { FulfillmentPoint } from '../../types';
import { Card } from '../common/Card';
import { formatNumber } from '../../utils/format';

interface InventoryOverviewProps {
  points: FulfillmentPoint[];
}

export const InventoryOverview = ({ points }: InventoryOverviewProps) => (
  <div className="grid gap-4 xl:grid-cols-2">
    {points.map((point) => {
      const totalAvailable = point.inventory.reduce((sum, item) => sum + item.availableQuantity, 0);
      const totalReserved = point.inventory.reduce((sum, item) => sum + item.reservedQuantity, 0);
      return (
        <Card key={point.id} title={point.name} subtitle={`${point.code} • ${point.area} • ${point.type}`}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-400">Khả dụng</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatNumber(totalAvailable)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Đang giữ</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatNumber(totalReserved)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Tải xử lý</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatNumber(point.activeOrders)}</p>
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${Math.min((point.activeOrders / point.handlingCapacity) * 100, 100)}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-400">Công suất đang dùng {point.activeOrders}/{point.handlingCapacity} đơn</p>
        </Card>
      );
    })}
  </div>
);
