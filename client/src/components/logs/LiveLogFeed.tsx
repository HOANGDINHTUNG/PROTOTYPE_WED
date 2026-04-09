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
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[380px]">
      <div className="px-5 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-white tracking-tight uppercase">
            Nhật ký hệ thống
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Live
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[11px] scrollbar-thin scrollbar-thumb-white/10"
      >
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2 opacity-50">
            <Activity className="w-6 h-6" />
            <p>Hệ thống đang chờ lệnh...</p>
          </div>
        ) : (
          [...logs]
            .reverse()
            .slice(0, 50)
            .reverse()
            .map((log) => (
              <div
                key={log.id}
                className="flex gap-3 group animate-in fade-in slide-in-from-left-2 duration-300"
              >
                <span className="text-slate-600 shrink-0 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleTimeString([], {
                    hour12: false,
                  })}
                </span>
                <div className="mt-0.5 shrink-0">{getIcon(log.level)}</div>
                <div className="flex-1">
                  <span className="text-slate-200 leading-relaxed">
                    {log.message}
                  </span>
                  {log.action && (
                    <span className="ml-2 px-1.5 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5">
                      {log.action}
                    </span>
                  )}
                </div>
              </div>
            ))
        )}
      </div>

      <div className="px-4 py-2 border-t border-white/5 bg-slate-900/30 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        <span>Channel: simulation:all</span>
        <span className="text-cyan-500/50">Listening...</span>
      </div>
    </div>
  );
};
