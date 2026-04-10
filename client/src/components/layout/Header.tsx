import { Activity, Sparkles, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../common/Button";
import { useUI } from "../../context/useUI";
import AutoDemoSettings from "../common/AutoDemoSettings";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { simulateOrders } from "../../features/simulation/simulationSlice";

export const Header = () => {
  const { theme, toggleTheme, language, setLanguage } = useUI();
  const { t } = useTranslation();
  const [running, setRunning] = useState(false);
  const dispatch = useAppDispatch();

  const toggleAuto = () => {
    if (running) {
      setRunning(false);
    } else {
      setRunning(true);
      void dispatch(simulateOrders({ count: 5, speedMs: 800 }));
    }
  };

  return (
    <header className="glass-panel rounded-[28px] px-7 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/15">
            <Activity size={11} className="animate-pulse" />{" "}
            {t("header.subtitle")}
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {t("header.title")}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/50 dark:border-white/5">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-lg px-4 py-1.5 text-xs font-black transition-all ${language === "vi" ? "bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-sm border border-indigo-100 dark:border-0" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"}`}
              onClick={() => setLanguage("vi")}
            >
              VN
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-lg px-4 py-1.5 text-xs font-black transition-all ${language === "en" ? "bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-sm border border-indigo-100 dark:border-0" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"}`}
              onClick={() => setLanguage("en")}
            >
              EN
            </Button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={t("common.theme")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md transition-all duration-300 dark:border-indigo-500/15 dark:bg-slate-800/80 dark:text-indigo-400 dark:hover:border-indigo-500/30 dark:hover:bg-slate-700"
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Auto-demo controls */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/15 shadow-sm">
              <Sparkles size={15} className="text-emerald-500" />{" "}
              {t("common.demo_mode")}
            </div>
            <AutoDemoSettings
              onRun={(count, speedMs) =>
                void dispatch(simulateOrders({ count, speedMs }))
              }
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAuto}
              className={`px-3 py-1 ${running ? "bg-emerald-600 text-white" : "text-slate-600"}`}
            >
              {running ? "Stop Auto" : "Auto demo"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
