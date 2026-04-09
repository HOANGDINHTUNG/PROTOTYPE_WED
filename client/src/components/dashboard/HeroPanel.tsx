import { ArrowRight, Boxes, BrainCircuit, Truck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  simulateOrders,
  selectSimulationActions,
} from "../../features/simulation/simulationSlice";
import { addNotification } from "../../features/notifications/notificationsSlice";

export const HeroPanel = () => {
  const dispatch = useAppDispatch();
  const { seeding } = useAppSelector(selectSimulationActions);

  const handleStressTest = async () => {
    dispatch(
      addNotification({
        type: "info",
        message: "Đang khởi tạo 5 đơn hàng mô phỏng...",
      }),
    );
    await dispatch(simulateOrders());
    dispatch(
      addNotification({
        type: "success",
        message: "Stress Test hoàn tất! Kiểm tra Dashboard để xem kết quả.",
      }),
    );
  };

  return (
    <section className="grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
      <div className="overflow-hidden rounded-[32px] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/15 via-slate-900 to-indigo-500/10 p-6 md:p-8">
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
            Một đơn hàng - nhiều kênh - một hệ thống trung tâm điều phối
          </span>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
              Giao diện demo logistics đẹp, rõ flow, dễ thuyết trình với
              Decision Engine trực quan.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
              Toàn bộ trải nghiệm tập trung vào việc cho người xem hiểu đơn hàng
              đến từ đâu, hệ thống kiểm tra gì, vì sao chọn điểm xử lý đó và tồn
              kho thay đổi như thế nào qua từng trạng thái.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/orders/create">
              <Button>
                Tạo đơn mô phỏng <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Button
              variant="secondary"
              onClick={handleStressTest}
              disabled={seeding}
            >
              <Zap size={16} className="mr-2 text-amber-400" /> Stress Test Mode
            </Button>
            <Link to="/decision-engine">
              <Button
                variant="ghost"
                className="border-white/10 hover:bg-white/5"
              >
                Xem logic điều phối
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {[
          {
            icon: Truck,
            title: "Trạng thái đơn",
            value: "7 bước",
            helper: "Từ tiếp nhận đến hoàn hàng",
          },
          {
            icon: Boxes,
            title: "Đồng bộ tồn kho",
            value: "5 điểm",
            helper: "Kho trung tâm + 4 cửa hàng",
          },
          {
            icon: BrainCircuit,
            title: "Decision Engine",
            value: "Tự chấm điểm",
            helper: "Khoảng cách + tải xử lý + tồn đủ",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
          >
            <div className="inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
              <item.icon size={20} />
            </div>
            <p className="mt-4 text-sm text-slate-400">{item.title}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-slate-300">{item.helper}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
