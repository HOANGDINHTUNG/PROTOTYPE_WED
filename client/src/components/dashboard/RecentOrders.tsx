import { useTranslation } from "react-i18next";
import { Card } from "../common/Card";
import { StatusBadge } from "../common/StatusBadge";
import type { Order, Product } from "../../types";
import { formatCurrency, formatDateTime } from "../../utils/format";

interface RecentOrdersProps {
  orders: Order[];
  products: Product[];
}

export const RecentOrders = ({ orders, products }: RecentOrdersProps) => {
  const { t } = useTranslation();
  const productNameById = new Map(
    products.map((product) => [product.id, product.name]),
  );

  return (
    <Card
      title={t("dashboard.recent.title")}
      subtitle={t("dashboard.recent.subtitle")}
    >
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-slate-200/60 bg-white/40 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-cyan-200/50 dark:border-white/5 dark:bg-slate-800/40 dark:hover:bg-slate-800/60"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
                  {order.code}
                </p>
                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {order.customerName}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                  <span className="bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-white/5">
                    {order.channel}
                  </span>
                  <span>•</span>
                  <span>{order.customerArea}</span>
                  <span>•</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {order.fulfilledByPointName ?? t("common.unassigned")}
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium italic mt-2">
                  {order.items
                    .map(
                      (item) =>
                        `${productNameById.get(item.productId) ?? item.productId} x${item.quantity}`,
                    )
                    .join(", ")}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3 pt-1">
                <StatusBadge status={order.status} />
                <div className="text-right">
                  <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    {formatDateTime(order.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
