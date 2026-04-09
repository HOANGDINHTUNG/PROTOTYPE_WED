import { Info, MapPin, Package, Zap } from "lucide-react";

export const LogicExplainer = () => {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-5 h-5 text-cyan-400" />
        <h3 className="font-semibold text-lg">
          Cách hệ thống chấm điểm (Scoring)
        </h3>
      </div>

      <p className="text-slate-400 text-sm">
        Hệ thống tự động tính điểm cho từng kho/cửa hàng. Điểm <b>càng thấp</b>{" "}
        thì mức độ ưu tiên <b>càng cao</b>.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card p-4 rounded-xl border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Khoảng cách
            </span>
          </div>
          <div className="text-2xl font-bold">1.0x</div>
          <p className="text-[10px] text-slate-500 mt-1 uppercase">
            Tỉ lệ cơ bản
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl border-indigo-500/20">
          <div className="flex items-center gap-2 mb-2 text-indigo-400">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Tải xử lý
            </span>
          </div>
          <div className="text-2xl font-bold">8.0x</div>
          <p className="text-[10px] text-slate-500 mt-1 uppercase">
            Hệ số phạt tải cao
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl border-amber-500/20">
          <div className="flex items-center gap-2 mb-2 text-amber-400">
            <Package className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Ưu tiên BOPIS
            </span>
          </div>
          <div className="text-2xl font-bold">-1.2</div>
          <p className="text-[10px] text-slate-500 mt-1 uppercase">
            Thưởng nhận tại store
          </p>
        </div>
      </div>

      <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
        <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">
          Công thức tổng quát
        </div>
        <code className="text-cyan-300 text-sm font-mono break-all">
          Score = Distance(km) + (ActiveOrders/Capacity * 8) - PickupBoost
        </code>
      </div>

      <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
        <div className="p-1 rounded bg-red-500/20 text-red-400">
          <Package className="w-3 h-3" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-red-400 uppercase">
            Hard Constraint
          </div>
          <p className="text-xs text-slate-400">
            Nếu điểm xử lý không đủ tồn kho, hệ thống sẽ cộng{" "}
            <b>+100 điểm phạt</b> (Loại bỏ).
          </p>
        </div>
      </div>
    </div>
  );
};
