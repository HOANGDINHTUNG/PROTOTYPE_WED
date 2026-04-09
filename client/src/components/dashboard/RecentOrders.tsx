import { Card } from '../common/Card';
import { StatusBadge } from '../common/StatusBadge';
import type { Order, Product } from '../../types';
import { formatCurrency, formatDateTime } from '../../utils/format';

interface RecentOrdersProps {
  orders: Order[];
  products: Product[];
}

export const RecentOrders = ({ orders, products }: RecentOrdersProps) => {
  const productNameById = new Map(products.map((product) => [product.id, product.name]));

  return (
    <Card title="Đơn hàng mới nhất" subtitle="Danh sách nhanh để demo trạng thái theo thời gian thực">
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm text-cyan-300">{order.code}</p>
                <h4 className="mt-1 text-lg font-semibold text-white">{order.customerName}</h4>
                <p className="mt-2 text-sm text-slate-300">
                  {order.channel} • {order.customerArea} • {order.fulfilledByPointName ?? 'Chưa phân bổ'}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {order.items.map((item) => `${productNameById.get(item.productId) ?? item.productId} x${item.quantity}`).join(', ')}
                </p>
              </div>
              <div className="space-y-3 text-left md:text-right">
                <StatusBadge status={order.status} />
                <p className="text-lg font-semibold text-white">{formatCurrency(order.totalAmount)}</p>
                <p className="text-xs text-slate-400">{formatDateTime(order.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
