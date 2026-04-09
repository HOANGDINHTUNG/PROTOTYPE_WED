import { Activity, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetSimulationData, seedSimulationData, selectSimulationActions } from '../../features/simulation/simulationSlice';
import { Button } from '../common/Button';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { error, resetting, seeding } = useAppSelector(selectSimulationActions);

  return (
    <header className="rounded-[32px] border border-white/10 bg-slate-900/60 px-5 py-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20">
            <Activity size={14} /> Live Simulation for Logistics Training
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">HANOLA Omnichannel Fulfillment Dashboard</h1>
            <p className="mt-1 text-sm text-slate-300">
              Mô phỏng điều phối đơn hàng đa kênh tập trung, dễ demo với khách hàng, giảng viên và đội vận hành.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" onClick={() => void dispatch(seedSimulationData())} disabled={seeding}>
            {seeding ? 'Đang nạp mẫu...' : 'Nạp dữ liệu mẫu'}
          </Button>
          <Button variant="ghost" onClick={() => void dispatch(resetSimulationData())} disabled={resetting}>
            {resetting ? 'Đang reset...' : 'Reset demo'}
          </Button>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/25">
            <Sparkles size={16} /> Demo Mode
          </div>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
    </header>
  );
};
