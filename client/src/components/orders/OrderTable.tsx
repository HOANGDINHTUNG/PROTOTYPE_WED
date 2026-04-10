import { useTranslation } from "react-i18next";
import type { Order, Product } from "../../types";
import { formatCurrency, formatDateTime } from "../../utils/format";
import { LifecycleStepper } from "./LifecycleStepper";
import { ShoppingBag, MapPin, Calendar, ArrowRight } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
  products: Product[];
}

export const OrderTable = ({ orders, products }: OrderTableProps) => {
  const { t } = useTranslation();
  const productNameById = new Map(
    products.map((product) => [product.id, product.name]),
  );

  return (
    <div className="glass-panel rounded-[32px] overflow-hidden border border-white/40 shadow-xl dark:border-white/5 dark:bg-slate-900/60">
      <div className="px-8 py-6 border-b border-white/40 dark:border-white/5 bg-white/40 dark:bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("orders.table.title")}
          </h3>
          <p className="text-sm font-medium text-slate-500/80 dark:text-slate-400">
            {t("orders.table.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/5 text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            {t("common.live_updates")}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">
              <th className="px-8 py-5">{t("orders.table.col_code")}</th>
              <th className="px-8 py-5">{t("orders.table.col_product")}</th>
              <th className="px-8 py-5">{t("orders.table.col_point")}</th>
              <th className="px-8 py-5">{t("orders.table.col_lifecycle")}</th>
              <th className="px-8 py-5 text-right">
                {t("orders.table.col_total")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-8 py-16 text-center text-slate-400 font-medium italic"
                >
                  {t("common.no_orders")}
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-cyan-50/30 dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-cyan-600 dark:text-cyan-400 tracking-tighter text-base">
                          {order.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-500 border border-slate-200/50 dark:bg-slate-800 dark:text-slate-400 dark:border-white/5 shadow-sm">
                          {order.channel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-bold">
                        {order.customerName}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs font-medium"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-slate-700 dark:text-slate-300">
                            {productNameById.get(item.productId) ??
                              item.productId}
                          </span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-black uppercase text-[10px]">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {order.fulfilledByPointName ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                          {order.fulfilledByPointName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <ArrowRight className="w-3 h-3" />
                          {t("orders.table.distance_msg", {
                            distance: order.shippingDistanceKm.toFixed(1),
                          })}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        {t("common.allocating")}
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <LifecycleStepper currentStatus={order.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
                        {formatCurrency(order.totalAmount)}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                        <Calendar className="w-3 h-3" />
                        {formatDateTime(order.createdAt).split(" ")[0]}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
