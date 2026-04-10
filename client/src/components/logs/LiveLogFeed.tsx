import { selectLogs } from "../../features/logs/logsSlice";
import { useAppSelector } from "../../hooks/redux";
import {
  Terminal,
  Activity,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { useEffect, useRef } from "react";

export const LiveLogFeed = () => {
  const logs = useAppSelector(selectLogs);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle2 className="w-3 h-3 text-emerald-400" />;
      case "warning":
        return <AlertCircle className="w-3 h-3 text-amber-400" />;
      case "error":
        return <AlertCircle className="w-3 h-3 text-rose-400" />;
      default:
        return <Info className="w-3 h-3 text-cyan-400" />;
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col h-[420px] shadow-lg border-0">
      <div className="px-6 py-5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-black text-xs text-slate-900 dark:text-white tracking-[0.2em] uppercase">
            Hệ thống nhật ký
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Live Feed
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-[11px] custom-scrollbar bg-white/40 dark:bg-transparent"
      >
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 gap-3 opacity-60">
            <Activity className="w-8 h-8 animate-pulse" />
            <p className="font-bold uppercase tracking-widest">
              Đang khởi tạo luồng dữ liệu...
            </p>
          </div>
        ) : (
          [...logs]
            .reverse()
            .slice(0, 50)
            .reverse()
            .map((log) => (
              <div
                key={log.id}
                className="flex gap-4 group animate-in fade-in slide-in-from-left-4 duration-500 hover:bg-slate-50 dark:hover:bg-white/5 p-2 rounded-xl transition-all"
              >
                <span className="text-slate-400 dark:text-slate-600 shrink-0 whitespace-nowrap font-bold">
                  {new Date(log.createdAt).toLocaleTimeString([], {
                    hour12: false,
                  })}
                </span>
                <div className="mt-1 shrink-0">{getIcon(log.level)}</div>
                <div className="flex-1">
                  <span className="text-slate-700 dark:text-slate-200 leading-relaxed font-bold tracking-tight">
                    {log.message}
                  </span>
                  {log.action && (
                    <span className="ml-3 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-white/10 text-[9px] font-black uppercase">
                      {log.action}
                    </span>
                  )}
                </div>
              </div>
            ))
        )}
      </div>

      <div className="px-6 py-3 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/30 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em]">
        <span>Simulation: Active</span>
        <span className="text-cyan-600 dark:text-cyan-500 opacity-80 animate-pulse">
          ● Listening...
        </span>
      </div>
    </div>
  );
};
