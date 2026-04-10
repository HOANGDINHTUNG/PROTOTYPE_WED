import { useMemo, useState } from "react";
import type { OrderStatus } from "../types";
import { addNotification } from "../features/notifications/notificationsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { selectSnapshot } from "../features/simulation/simulationSlice";
import { SectionHeading } from "../components/common/SectionHeading";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { formatCurrency, formatDateTime } from "../utils/format";
import { updateOrderStatus } from "../features/simulation/simulationSlice";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snapshot = useAppSelector(selectSnapshot);

  const order = useMemo(
    () => snapshot?.orders.find((o) => o.id === id) ?? null,
    [snapshot, id],
  );
  const [running, setRunning] = useState(false);
  const productsById = useMemo(
    () => new Map(snapshot?.products.map((p) => [p.id, p]) ?? []),
    [snapshot],
  );

  if (!order) {
    return (
      <div className="p-8">
        <SectionHeading title="Chi tiết đơn hàng" description="" eyebrow="" />
        <Card>
          <div>Đơn hàng không tìm thấy.</div>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const simulateStatusProgression = async (orderId: string) => {
    setRunning(true);
    const steps = [
      "Đang xác nhận",
      "Chuẩn bị hàng",
      "Đóng gói",
      "Chờ lấy hàng",
      "Đang giao",
      "Trên đường",
      "Sắp tới nơi",
      "Giao thử lần 1",
      "Giao thử lần 2",
      "Giao thành công",
    ];

    for (let i = 0; i < steps.length; i++) {
      const msg = `${steps[i]} (${i + 1}/${steps.length})`;
      dispatch(addNotification({ type: "info", message: msg, duration: 2500 }));
      const coarse: OrderStatus =
        i < 4 ? "Đang xử lý" : i < 8 ? "Đang giao" : "Giao thành công";
      await dispatch(updateOrderStatus({ orderId, status: coarse, note: msg }));
      await new Promise((r) => setTimeout(r, 600));
    }
    dispatch(
      addNotification({
        type: "success",
        message: "Cập nhật trạng thái hoàn tất",
        duration: 4000,
      }),
    );
    setRunning(false);
  };

  return (
    <div className="space-y-8 p-8">
      <SectionHeading
        title={`Đơn ${order.code}`}
        eyebrow={`Trạng thái: ${order.status}`}
        description=""
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Thông tin khách hàng">
          <div className="space-y-2">
            <div className="font-bold">{order.customerName}</div>
            <div className="text-sm text-slate-500">
              Khu vực: {order.customerArea}
            </div>
            <div className="text-sm text-slate-500">Kênh: {order.channel}</div>
            <div className="text-sm text-slate-500">
              Thanh toán: {order.paymentMethod}
            </div>
          </div>
        </Card>

        <Card title="Điểm xử lý">
          <div className="space-y-2">
            <div className="font-bold">
              {order.fulfilledByPointName ?? "Chưa phân bổ"}
            </div>
            <div className="text-sm text-slate-500">
              Khoảng cách: {(order.shippingDistanceKm ?? 0).toFixed(1)} km
            </div>
          </div>
        </Card>

        <Card title="Tổng tiền">
          <div className="font-black text-2xl">
            {formatCurrency(order.totalAmount)}
          </div>
          <div className="text-sm text-slate-500 mt-2">
            Ngày tạo: {formatDateTime(order.createdAt)}
          </div>
        </Card>
      </div>

      <Card title="Sản phẩm">
        <div className="space-y-3">
          {order.items.map((it, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div>
                <div className="font-bold">
                  {productsById.get(it.productId)?.name ?? it.productId}
                </div>
                <div className="text-sm text-slate-500">
                  Số lượng: {it.quantity}
                </div>
              </div>
              <div className="font-black">
                {formatCurrency(it.unitPrice * it.quantity)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Lịch sử trạng thái">
        <div className="space-y-4">
          {order.timeline.map((entry, i) => (
            <div key={i} className="flex justify-between">
              <div>
                <div className="font-black">{entry.status}</div>
                <div className="text-sm text-slate-500">{entry.note}</div>
              </div>
              <div className="text-sm text-slate-400">
                {formatDateTime(entry.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          disabled={running}
          onClick={() => void simulateStatusProgression(order.id)}
        >
          Cập nhật trạng thái
        </Button>

        <Button
          variant="ghost"
          disabled={running}
          onClick={() =>
            void dispatch(
              updateOrderStatus({
                orderId: order.id,
                status: "Hoàn hàng" as OrderStatus,
                note: "Hoàn hàng từ chi tiết",
              }),
            )
          }
        >
          Hoàn hàng
        </Button>

        <Button variant="ghost" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
