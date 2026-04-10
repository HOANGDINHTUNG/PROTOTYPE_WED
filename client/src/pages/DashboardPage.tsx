import { ChannelBreakdown } from "../components/dashboard/ChannelBreakdown";
import { HeroPanel } from "../components/dashboard/HeroPanel";
import { MetricGrid } from "../components/dashboard/MetricGrid";
import { RecentOrders } from "../components/dashboard/RecentOrders";
import { LiveLogFeed } from "../components/logs/LiveLogFeed";
import { EmptyState } from "../components/common/EmptyState";
import { SectionHeading } from "../components/common/SectionHeading";
import { useTranslation } from "react-i18next";
import {
  selectDashboardSummary,
  selectRecentOrders,
} from "../features/dashboard/dashboardSlice";
import { selectProducts } from "../features/inventory/inventorySlice";
import { useAppSelector } from "../hooks/redux";

export const DashboardPage = () => {
  const { t } = useTranslation();
  const summary = useAppSelector(selectDashboardSummary);
  const recentOrders = useAppSelector(selectRecentOrders);
  const products = useAppSelector(selectProducts);

  if (!summary) {
    return (
      <EmptyState
        title={t("dashboard.empty_title")}
        description={t("dashboard.empty_desc")}
      />
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <HeroPanel />
      <SectionHeading
        eyebrow={t("dashboard.eyebrow")}
        title={t("dashboard.title")}
        description={t("dashboard.desc")}
      />
      <MetricGrid summary={summary} />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
        <div className="space-y-6">
          <ChannelBreakdown summary={summary} />
          <RecentOrders orders={recentOrders} products={products} />
        </div>
        <div className="space-y-6">
          <LiveLogFeed />
        </div>
      </div>
    </div>
  );
};
