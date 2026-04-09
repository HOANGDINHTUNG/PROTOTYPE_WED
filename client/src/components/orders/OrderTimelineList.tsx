import type { Order } from '../../types';
import { formatDateTime } from '../../utils/format';
import { Card } from '../common/Card';

interface OrderTimelineListProps {
  orders: Order[];
}

export const OrderTimelineList = ({ orders }: OrderTimelineListProps) => (
  <Card title="Timeline trạng thái đơn" subtitle="Hiển thị đúng tinh thần prototype: người xem nhìn là hiểu flow xử lý của hệ thống">
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="rounded-3xl border border-white/10 bg-slate-950/35 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-cyan-300">{order.code}</p>
              <h4 className="text-lg font-semibold text-white">{order.customerName}</h4>
            </div>
            <p className="text-sm text-slate-400">{order.fulfilledByPointName ?? 'Chưa phân bổ'}</p>
          </div>
          <div className="space-y-4">
            {order.timeline.map((entry, index) => (
              <div key={`${order.id}-${entry.status}-${index}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="mt-1 h-3 w-3 rounded-full bg-cyan-300" />
                  {index !== order.timeline.length - 1 ? <span className="mt-1 h-full w-px bg-white/10" /> : null}
                </div>
                <div className="pb-4">
                  <p className="font-medium text-white">{entry.status}</p>
                  <p className="text-sm text-slate-300">{entry.note}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatDateTime(entry.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Card>
);
