import { useTranslation } from "react-i18next";
import { formatNumber } from "../../utils/format";
import { Card } from "../common/Card";
import type { DashboardSummary } from "../../types";

interface MetricGridProps {
  summary: DashboardSummary;
}

export const MetricGrid = ({ summary }: MetricGridProps) => {
  const { t } = useTranslation();
  const metrics = [
    {
      label: t("dashboard.metrics.total_orders"),
      value: summary.totalOrders,
      helper: t("dashboard.metrics.total_orders_desc"),
      accent: "text-indigo-600 dark:text-indigo-400",
      dot: "bg-indigo-500",
      ring: "hover:ring-indigo-500/25",
    },
    {
      label: t("dashboard.metrics.processing"),
      value: summary.processingOrders,
      helper: t("dashboard.metrics.processing_desc"),
      accent: "text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500",
      ring: "hover:ring-amber-500/25",
    },
    {
      label: t("dashboard.metrics.delivered"),
      value: summary.deliveredOrders,
      helper: t("dashboard.metrics.delivered_desc"),
      accent: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500",
      ring: "hover:ring-emerald-500/25",
    },
    {
      label: t("dashboard.metrics.failed"),
      value: summary.returnOrFailedOrders,
      helper: t("dashboard.metrics.failed_desc"),
      accent: "text-rose-600 dark:text-rose-400",
      dot: "bg-rose-500",
      ring: "hover:ring-rose-500/25",
    },
    {
      label: t("dashboard.metrics.inventory"),
      value: summary.totalInventoryUnits,
      helper: t("dashboard.metrics.inventory_desc"),
      accent: "text-cyan-600 dark:text-cyan-400",
      dot: "bg-cyan-500",
      ring: "hover:ring-cyan-500/25",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className={`transition-all duration-300 hover:ring-1 ${metric.ring}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <span className={`h-2 w-2 rounded-full ${metric.dot}`} />
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
              {metric.label}
            </p>
          </div>
          <p
            className={`text-4xl font-black tracking-tighter ${metric.accent}`}
          >
            {formatNumber(metric.value)}
          </p>
          <p className="mt-3 text-[11px] font-medium text-slate-400 dark:text-slate-600">
            {metric.helper}
          </p>
        </Card>
      ))}
    </div>
  );
};
