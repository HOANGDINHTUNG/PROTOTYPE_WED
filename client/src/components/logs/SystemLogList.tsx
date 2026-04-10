import { useTranslation } from "react-i18next";
import type { SystemLog } from "../../types";
import { formatDateTime } from "../../utils/format";
import { Card } from "../common/Card";

interface SystemLogListProps {
  logs: SystemLog[];
}

const toneMap: Record<SystemLog["level"], string> = {
  info: "border-sky-500/20 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300",
  success:
    "border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warning:
    "border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300",
  error:
    "border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

export const SystemLogList = ({ logs }: SystemLogListProps) => {
  const { t } = useTranslation();
  return (
    <Card title={t("logs.list_title")} subtitle={t("logs.list_subtitle")}>
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-[24px] border border-slate-200 bg-white/40 p-5 dark:border-white/5 dark:bg-slate-900/40 transition-all hover:bg-white/60 dark:hover:bg-slate-900/60 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div
                  className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${toneMap[log.level]}`}
                >
                  {log.level}
                </div>
                <h4 className="mt-4 text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {log.message}
                </h4>
                <p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                  Action:{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {log.action}
                  </span>
                </p>
                {log.context ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Object.entries(log.context).map(([key, value]) => (
                      <span
                        key={`${log.id}-${key}`}
                        className="rounded-lg bg-slate-100 dark:bg-white/5 px-3 py-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-white/5"
                      >
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                {formatDateTime(log.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
