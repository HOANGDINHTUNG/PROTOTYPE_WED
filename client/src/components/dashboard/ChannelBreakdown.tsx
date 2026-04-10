import { useTranslation } from "react-i18next";
import { formatCurrency, formatNumber } from "../../utils/format";
import { Card } from "../common/Card";
import type { DashboardSummary } from "../../types";

interface ChannelBreakdownProps {
  summary: DashboardSummary;
}

export const ChannelBreakdown = ({ summary }: ChannelBreakdownProps) => {
  const { t } = useTranslation();
  const peakOrders = Math.max(
    ...summary.channelBreakdown.map((item) => item.totalOrders),
    1,
  );

  return (
    <Card
      title={t("dashboard.channels.title")}
      subtitle={t("dashboard.channels.subtitle")}
    >
      <div className="space-y-6">
        {summary.channelBreakdown.map((item) => (
          <div key={item.channel} className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                  {item.channel}
                </p>
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {t("dashboard.channels.revenue_sim")}:{" "}
                  <span className="text-cyan-600 dark:text-cyan-400 font-black">
                    {formatCurrency(item.revenue)}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  {formatNumber(item.totalOrders)}
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                  {t("common.orders_unit")}
                </p>
              </div>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_8px_rgba(6,182,212,0.3)] transition-all duration-1000"
                style={{ width: `${(item.totalOrders / peakOrders) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
