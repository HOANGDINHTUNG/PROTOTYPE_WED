import type { SystemLog } from '../../types';
import { formatDateTime } from '../../utils/format';
import { Card } from '../common/Card';

interface SystemLogListProps {
  logs: SystemLog[];
}

const toneMap: Record<SystemLog['level'], string> = {
  info: 'border-sky-400/20 bg-sky-500/10 text-sky-300',
  success: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-300',
  warning: 'border-amber-400/20 bg-amber-500/10 text-amber-300',
  error: 'border-rose-400/20 bg-rose-500/10 text-rose-300',
};

export const SystemLogList = ({ logs }: SystemLogListProps) => (
  <Card title="Nhật ký hoạt động hệ thống" subtitle="Khối này làm giao diện nhìn giống hệ thống thật và rất hợp để demo thuyết trình">
    <div className="space-y-3">
      {logs.map((log) => (
        <div key={log.id} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneMap[log.level]}`}>{log.level}</div>
              <h4 className="mt-3 text-base font-semibold text-white">{log.message}</h4>
              <p className="mt-2 text-sm text-slate-400">Action: {log.action}</p>
              {log.context ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(log.context).map(([key, value]) => (
                    <span key={`${log.id}-${key}`} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                      {key}: {String(value)}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <p className="text-sm text-slate-500">{formatDateTime(log.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);
