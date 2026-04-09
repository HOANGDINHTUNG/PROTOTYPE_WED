import { useMemo, useState } from "react";
import { CandidateTable } from "../components/decision/CandidateTable";
import { DecisionPanel } from "../components/decision/DecisionPanel";
import { LogicExplainer } from "../components/decision/LogicExplainer";
import { SectionHeading } from "../components/common/SectionHeading";
import { OrderCreationForm } from "../components/orders/OrderCreationForm";
import { Button } from "../components/common/Button";
import {
  selectFulfillmentPoints,
  selectProducts,
} from "../features/inventory/inventorySlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { buildAllocationDecision } from "../utils/decisionEngine";
import {
  createOrder,
  selectSimulationActions,
} from "../features/simulation/simulationSlice";
import { addNotification } from "../features/notifications/notificationsSlice";
import type { AllocationDecision, CreateOrderInput } from "../types";
import { ShoppingBag, CheckCircle } from "lucide-react";

export const CreateOrderPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const points = useAppSelector(selectFulfillmentPoints);
  const { creatingOrder } = useAppSelector(selectSimulationActions);
  const [draft, setDraft] = useState<CreateOrderInput | null>(null);

  const decision = useMemo<AllocationDecision | null>(() => {
    if (!draft) return null;
    return buildAllocationDecision(draft, points, products);
  }, [draft, points, products]);

  const handleConfirmOrder = async () => {
    if (!draft) return;
    try {
      await dispatch(createOrder(draft)).unwrap();
      dispatch(
        addNotification({
          type: "success",
          message: "Đơn hàng đã được tạo thành công!",
        }),
      );
      setDraft(null);
    } catch (err) {
      dispatch(
        addNotification({
          type: "error",
          message: "Lỗi khi tạo đơn hàng: " + err,
        }),
      );
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <SectionHeading
        eyebrow="Tạo đơn hàng mô phỏng"
        title="Nhập đơn giả lập và xem hệ thống tự quyết định điểm xử lý"
        description="Trang này bám sát prototype: người dùng chọn kênh bán, sản phẩm, số lượng, khu vực khách và hệ thống sẽ phân bổ theo logic đa điểm."
      />

      <div className="grid gap-8 xl:grid-cols-[1fr_0.7fr]">
        <div className="space-y-8">
          <OrderCreationForm products={products} onPreview={setDraft} />

          {draft && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">
                      Xác nhận phân bổ
                    </h3>
                    <p className="text-xs text-slate-400">
                      Xem trước kết quả từ Decision Engine trước khi đẩy vào hệ
                      thống
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleConfirmOrder}
                  disabled={creatingOrder}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  {creatingOrder ? "Đang xử lý..." : "Xác nhận & Tạo đơn"}
                </Button>
              </div>

              <div className="grid gap-6">
                <DecisionPanel decision={decision} />
                <CandidateTable candidates={decision?.candidates ?? []} />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <LogicExplainer />
          <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-indigo-500/5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={16} className="text-indigo-400" />
              <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">
                Ghi chú vận hành
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Hệ thống sử dụng giải thuật <strong>Dynamic Fulfillment</strong>{" "}
              để tự động chọn kho có chi phí thấp nhất (dựa trên khoảng cách) và
              tải vận hành ổn định nhất.
            </p>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5 italic text-[10px] text-slate-500">
              * Tồn kho sẽ được giữ (Reserve) ngay khi đơn hàng được tạo thành
              công.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
