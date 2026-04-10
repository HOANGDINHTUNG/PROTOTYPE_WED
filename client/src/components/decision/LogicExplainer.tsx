import { Info, MapPin, Package, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LogicExplainer = () => {
  const { t } = useTranslation();

  return (
    <div className="glass-panel p-8 rounded-4xl space-y-6 shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
          <Info className="w-5 h-5" />
        </div>
        <h3 className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
          {t("logic.title")}
        </h3>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-3xl">
        {t("logic.info")}
      </p>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="glass-card p-6 rounded-2xl border-cyan-500/10">
          <div className="flex items-center gap-2 mb-3 text-cyan-600 dark:text-cyan-400">
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {t("logic.distance")}
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            1.0x
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tight">
            BASE RATIO
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border-indigo-500/10">
          <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {t("logic.load")}
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            8.0x
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tight">
            LOAD PENALTY
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border-amber-500/10">
          <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400">
            <Package className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {t("logic.bopis")}
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            -1.2
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tight">
            STORE BOOST
          </p>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/50 dark:border-white/5">
        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-black mono uppercase mb-3 tracking-widest">
          {t("logic.generic_formula")}
        </div>
        <code className="text-cyan-700 dark:text-cyan-300 text-sm font-black mono break-all bg-white/50 dark:bg-black/20 px-3 py-2 rounded-lg">
          <span style={{ fontFamily: "Times New Roman" }}>
            (Điểm = Khoảng cách (km) + (Số đơn hàng đang hoạt động/Sức chứa * 8)
            - Tăng cường nhận hàng)
          </span>{" "}
        </code>
        <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
          <p className="text-[11px] text-slate-500 dark:text-slate-500 italic font-medium">
            {t("logic.formula_caption")}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4 p-5 rounded-2xl bg-rose-50 dark:bg-rose-500/5 border border-rose-200/50 dark:border-rose-500/10">
        <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 shadow-sm">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-[0.2em]">
            {t("logic.hard_constraint")}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-bold mt-1 leading-relaxed">
            {t("logic.stock_penalty")}
          </p>
        </div>
      </div>
    </div>
  );
};
