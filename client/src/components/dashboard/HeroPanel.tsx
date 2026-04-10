import { ArrowRight, Boxes, BrainCircuit, Truck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../common/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  simulateOrders,
  selectSimulationActions,
} from "../../features/simulation/simulationSlice";
import { addNotification } from "../../features/notifications/notificationsSlice";

export const HeroPanel = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { seeding } = useAppSelector(selectSimulationActions);

  const handleStressTest = async () => {
    dispatch(addNotification({ type: "info", message: t("notif.sim_start") }));
    await dispatch(simulateOrders({ count: 8, speedMs: 300 }));
    dispatch(
      addNotification({ type: "success", message: t("notif.sim_success") }),
    );
  };

  const statItems = [
    {
      icon: Truck,
      title: t("dashboard.hero.stat_order"),
      value: t("dashboard.hero.stat_order_val"),
      helper: t("dashboard.hero.stat_order_desc"),
      color: "indigo",
    },
    {
      icon: Boxes,
      title: t("dashboard.hero.stat_inv"),
      value: t("dashboard.hero.stat_inv_val"),
      helper: t("dashboard.hero.stat_inv_desc"),
      color: "cyan",
    },
    {
      icon: BrainCircuit,
      title: t("dashboard.hero.stat_engine"),
      value: t("dashboard.hero.stat_engine_val"),
      helper: t("dashboard.hero.stat_engine_desc"),
      color: "violet",
    },
  ];

  const colorMap: Record<
    string,
    { icon: string; value: string; badge: string; dot: string }
  > = {
    indigo: {
      icon: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
      value: "text-indigo-700 dark:text-indigo-400",
      badge:
        "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/15",
      dot: "bg-indigo-500",
    },
    cyan: {
      icon: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",
      value: "text-cyan-700 dark:text-cyan-400",
      badge:
        "bg-cyan-50 text-cyan-600 border-cyan-100 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/15",
      dot: "bg-cyan-500",
    },
    violet: {
      icon: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
      value: "text-violet-700 dark:text-violet-400",
      badge:
        "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/15",
      dot: "bg-violet-500",
    },
  };

  return (
    <section className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
      {/* ── Main Hero ── */}
      <div
        className="relative overflow-hidden rounded-[40px] p-8 md:p-12
        bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900
        dark:from-[#08091a] dark:via-indigo-950/80 dark:to-[#08091a]
        border border-indigo-500/10 shadow-2xl shadow-indigo-900/20"
      >
        {/* Decorative glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[40px]">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-600/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
              {t("dashboard.hero.badge")}
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl">
              {t("dashboard.hero.title")}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-400 font-medium">
              {t("dashboard.hero.desc")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/orders/create">
              <Button className="rounded-2xl px-7 shadow-xl shadow-indigo-500/25 bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0">
                {t("dashboard.hero.create_btn")}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Button
              variant="secondary"
              onClick={handleStressTest}
              disabled={seeding}
              className="rounded-2xl px-6 bg-white/8 border border-white/15 text-white hover:bg-white/15 hover:border-white/30 backdrop-blur-sm"
            >
              <Zap size={16} className="mr-2 text-amber-400" />
              {t("dashboard.hero.stress_btn")}
            </Button>
            <Link to="/decision-engine">
              <Button
                variant="ghost"
                className="rounded-2xl px-6 text-slate-400 border border-white/10 hover:bg-white/8 hover:text-white"
              >
                {t("dashboard.hero.logic_btn")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {statItems.map((item) => {
          const c = colorMap[item.color];
          return (
            <div
              key={item.title}
              className="glass-card rounded-[28px] p-6 group"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 ${c.icon}`}
                >
                  <item.icon size={22} />
                </div>
                <div
                  className={`rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${c.badge}`}
                >
                  LIVE
                </div>
              </div>
              <div className="mt-5">
                <p
                  className={`text-4xl font-black tracking-tighter ${c.value}`}
                >
                  {item.value}
                </p>
                <p className="mt-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-500">
                  {item.title}
                </p>
                <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-600 font-medium">
                  {item.helper}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
