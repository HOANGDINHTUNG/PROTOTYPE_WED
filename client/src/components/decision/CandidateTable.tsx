import type { AllocationCandidate } from "../../types";
import { BadgeCheck, XCircle, MapPin, Package, Zap } from "lucide-react";

interface CandidateTableProps {
  candidates: AllocationCandidate[];
}

export const CandidateTable = ({ candidates }: CandidateTableProps) => (
  <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
    <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-white tracking-tight">
          Bảng chấm điểm ứng viên
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Hệ thống quét mọi điểm có thể xử lý và chấm điểm ưu tiên
        </p>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
          <BadgeCheck className="w-3 h-3" /> Eligible
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-500/10 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/20">
          <XCircle className="w-3 h-3" /> Rejected
        </div>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-slate-300">
        <thead>
          <tr className="bg-slate-900/40 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
            <th className="px-6 py-4">Điểm xử lý</th>
            <th className="px-6 py-4">Tồn khả dụng</th>
            <th className="px-6 py-4 text-center">Score</th>
            <th className="px-6 py-4">Lý giải chi tiết</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {candidates.map((candidate) => (
            <tr
              key={candidate.pointId}
              className={`transition-colors ${candidate.isEligible ? "hover:bg-cyan-500/5" : "bg-red-500/[0.02] hover:bg-red-500/5"}`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${candidate.isEligible ? "bg-cyan-500/15 text-cyan-400" : "bg-slate-800 text-slate-500"}`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white leading-none mb-1.5">
                      {candidate.pointName}
                    </p>
                    <p className="text-[10px] font-medium text-slate-500 uppercase flex items-center gap-1.5">
                      {candidate.pointType} • {candidate.area}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Stock Level</span>
                    <span
                      className={
                        candidate.availableQuantity > 0
                          ? "text-cyan-400"
                          : "text-rose-400"
                      }
                    >
                      {candidate.availableQuantity}
                    </span>
                  </div>
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${candidate.availableQuantity > 0 ? "bg-gradient-to-right from-cyan-600 to-indigo-500" : "bg-rose-500"}`}
                      style={{
                        width: `${Math.min(100, (candidate.availableQuantity / 50) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex items-center justify-center min-w-[3.5rem] rounded-lg px-2 py-1.5 text-sm font-black mono border shadow-sm ${
                    candidate.isEligible
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-300 border-rose-500/30 line-through"
                  }`}
                >
                  {candidate.score}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1.5">
                  {candidate.reasons.map((reason, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                        reason.includes("Thiếu") || reason.includes("Loại")
                          ? "bg-rose-500/5 text-rose-400 border-rose-500/10"
                          : "bg-slate-800/50 text-slate-400 border-white/5"
                      }`}
                    >
                      {reason.includes("m") && (
                        <Zap className="w-2.5 h-2.5 opacity-50" />
                      )}
                      {reason.includes("Tồn") && (
                        <Package className="w-2.5 h-2.5 opacity-50" />
                      )}
                      {reason}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
