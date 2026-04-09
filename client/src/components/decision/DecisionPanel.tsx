import { Trophy } from 'lucide-react';
import type { AllocationDecision } from '../../types';
import { Card } from '../common/Card';

interface DecisionPanelProps {
  decision: AllocationDecision | null;
}

export const DecisionPanel = ({ decision }: DecisionPanelProps) => {
  if (!decision) {
    return (
      <Card title="Decision Engine" subtitle="Kết quả chấm điểm sẽ hiển thị sau khi bạn nhập đơn hàng mô phỏng">
        <p className="text-sm text-slate-300">Chưa có dữ liệu để tính toán phân bổ.</p>
      </Card>
    );
  }

  return (
    <Card title="Điểm xử lý được chọn" subtitle="Phần tạo khác biệt cho prototype: giải thích rõ vì sao hệ thống chọn điểm xử lý đó">
      <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Winning point</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{decision.selectedPointName ?? 'Chưa chọn được điểm xử lý'}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-200">{decision.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {decision.reasoning.map((item) => (
                <li key={item} className="flex gap-2"><span className="text-cyan-300">•</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
