import { ChannelBreakdown } from "../components/dashboard/ChannelBreakdown";
import { HeroPanel } from "../components/dashboard/HeroPanel";
import { MetricGrid } from "../components/dashboard/MetricGrid";
import { RecentOrders } from "../components/dashboard/RecentOrders";
import { LiveLogFeed } from "../components/logs/LiveLogFeed";
import { EmptyState } from "../components/common/EmptyState";
import { SectionHeading } from "../components/common/SectionHeading";
import {
  selectDashboardSummary,
  selectRecentOrders,
} from "../features/dashboard/dashboardSlice";
import { selectProducts } from "../features/inventory/inventorySlice";
import { useAppSelector } from "../hooks/redux";

export const DashboardPage = () => {
  const summary = useAppSelector(selectDashboardSummary);
  const recentOrders = useAppSelector(selectRecentOrders);
  const products = useAppSelector(selectProducts);

  if (!summary) {
    return (
      <EmptyState
        title="Chưa có dữ liệu dashboard"
        description="Hãy nạp dữ liệu mẫu hoặc kết nối backend để bắt đầu."
      />
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <HeroPanel />
      <SectionHeading
        eyebrow="Dashboard tổng quan"
        title="Nhìn nhanh tình trạng đơn hàng, tồn kho và hiệu suất đa kênh"
        description="Đây là trang đầu tiên để khách hàng hoặc giảng viên hiểu ngay hệ thống đóng vai trò trung tâm điều phối đơn hàng omnichannel."
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
