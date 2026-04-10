import { useTranslation } from "react-i18next";
import type { Order } from "../../types";
import { formatDateTime } from "../../utils/format";
import { Card } from "../common/Card";

interface OrderTimelineListProps {
  orders: Order[];
}

export const OrderTimelineList = ({ orders }: OrderTimelineListProps) => {
  const { t } = useTranslation();
  return (
    <Card
      title={t("orders.timeline.title")}
      subtitle={t("orders.timeline.subtitle")}
    >
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-[28px] border border-slate-200/60 dark:border-indigo-500/10 bg-white dark:bg-[#101827] p-5 transition-all duration-300 hover:shadow-md dark:hover:bg-[#141d35]"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  {order.code}
                </p>
                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                  {order.customerName}
                </h4>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {order.fulfilledByPointName ?? t("common.unassigned")}
              </div>
            </div>
            <div className="space-y-6 relative ml-2">
              <div className="absolute left-[5.5px] top-2 bottom-4 w-px bg-slate-200 dark:bg-white/10" />
              {order.timeline.map((entry, index) => (
                <div
                  key={`${order.id}-${entry.status}-${index}`}
                  className="flex gap-6 relative z-10"
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1.5 h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
                  </div>
                  <div className="pb-2">
                    <p className="font-black text-slate-900 dark:text-white text-base tracking-tight">
                      {entry.status}
                    </p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                      {entry.note}
                    </p>
                    <p className="mt-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {formatDateTime(entry.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
