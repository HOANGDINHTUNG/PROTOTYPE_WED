import { CandidateTable } from "../components/decision/CandidateTable";
import { DecisionPanel } from "../components/decision/DecisionPanel";
import { EmptyState } from "../components/common/EmptyState";
import { SectionHeading } from "../components/common/SectionHeading";
import { LogicExplainer } from "../components/decision/LogicExplainer";
import { selectOrders } from "../features/orders/ordersSlice";
import { useAppSelector } from "../hooks/redux";

export const DecisionEnginePage = () => {
  const orders = useAppSelector(selectOrders);
  const latestWithAllocation =
    orders.find((order) => order.allocation !== null) ?? null;

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Decision Engine"
        title="Giải thích minh bạch cách hệ thống chọn kho hoặc cửa hàng xử lý"
        description="Đây là khu tạo khác biệt cho đồ án: không chỉ hiện kết quả mà còn giải thích từng ứng viên, điểm số và lý do lựa chọn."
      />

      <LogicExplainer />
      {latestWithAllocation?.allocation ? (
        <>
          <DecisionPanel decision={latestWithAllocation.allocation} />
          <CandidateTable
            candidates={latestWithAllocation.allocation.candidates}
          />
        </>
      ) : (
        <EmptyState
          title="Chưa có quyết định phân bổ mới"
          description="Hãy vào trang Tạo đơn hàng để mô phỏng một đơn mới và xem bảng chấm điểm."
        />
      )}
    </div>
  );
};
