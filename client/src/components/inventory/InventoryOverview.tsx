import { useTranslation } from "react-i18next";
import type { FulfillmentPoint } from "../../types";
import { Card } from "../common/Card";
import { formatNumber } from "../../utils/format";

interface InventoryOverviewProps {
  points: FulfillmentPoint[];
}

export const InventoryOverview = ({ points }: InventoryOverviewProps) => {
  const { t } = useTranslation();
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {points.map((point) => {
        const totalAvailable = point.inventory.reduce(
          (sum, item) => sum + item.availableQuantity,
          0,
        );
        const totalReserved = point.inventory.reduce(
          (sum, item) => sum + item.reservedQuantity,
          0,
        );
        return (
          <Card
            key={point.id}
            title={point.name}
            subtitle={`${point.code} • ${point.area} • ${point.type}`}
            className="group"
          >
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {t("common.avail")}
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {formatNumber(totalAvailable)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {t("common.resv")}
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white transition-colors">
                  {formatNumber(totalReserved)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {t("common.load")}
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white transition-colors">
                  {formatNumber(point.activeOrders)}
                </p>
              </div>
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                style={{
                  width: `${Math.min((point.activeOrders / point.handlingCapacity) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="mt-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">
              {t("common.capacity_msg", {
                active: point.activeOrders,
                capacity: point.handlingCapacity,
              })}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
