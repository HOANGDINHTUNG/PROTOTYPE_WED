import { useTranslation } from "react-i18next";
import type { AllocationCandidate } from "../../types";
import { BadgeCheck, XCircle, MapPin, Package, Zap } from "lucide-react";

interface CandidateTableProps {
  candidates: AllocationCandidate[];
}

export const CandidateTable = ({ candidates }: CandidateTableProps) => {
  const { t } = useTranslation();
  return (
    <div className="glass-panel rounded-3xl overflow-hidden border-0 shadow-lg">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex items-center justify-between">
        <div>
          <h3 className="font-black text-slate-950 dark:text-white tracking-tight text-lg">
            {t("decision.candidate_title")}
          </h3>
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
            {t("decision.candidate_subtitle")}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider border border-emerald-200 dark:border-emerald-500/20">
            <BadgeCheck className="w-3 h-3" /> Eligible
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-300 text-[9px] font-black uppercase tracking-wider border border-rose-200 dark:border-rose-500/20">
            <XCircle className="w-3 h-3" /> Rejected
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-600 dark:text-slate-300 transition-colors">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-900/40 text-slate-500 dark:text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">
              <th className="px-6 py-5">{t("decision.col_point")}</th>
              <th className="px-6 py-5">{t("decision.col_stock")}</th>
              <th className="px-6 py-5 text-center">
                {t("decision.col_score")}
              </th>
              <th className="px-6 py-5">{t("decision.col_reason")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {candidates.map((candidate) => (
              <tr
                key={candidate.pointId}
                className={`transition-all duration-300 ${candidate.isEligible ? "hover:bg-cyan-50 dark:hover:bg-cyan-500/3" : "bg-rose-500/1 dark:bg-red-500/2 hover:bg-rose-500/3 dark:hover:bg-red-500/5"}`}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${candidate.isEligible ? "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white leading-none mb-2 text-base tracking-tight">
                        {candidate.pointName}
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-tight flex items-center gap-2">
                        {candidate.pointType}{" "}
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />{" "}
                        {candidate.area}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-2 min-w-30">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400 dark:text-slate-500">
                        {t("decision.stock_level")}
                      </span>
                      <span
                        className={
                          candidate.availableQuantity > 0
                            ? "text-cyan-600 dark:text-cyan-400"
                            : "text-rose-600 dark:text-rose-400"
                        }
                      >
                        {candidate.availableQuantity}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full transition-all duration-1000 ${candidate.availableQuantity > 0 ? "bg-linear-to-r from-cyan-600 to-indigo-500" : "bg-rose-500"}`}
                        style={{
                          width: `${Math.min(100, (candidate.availableQuantity / 50) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span
                    className={`inline-flex items-center justify-center min-w-14 rounded-xl px-3 py-2 text-sm font-black border shadow-sm ${
                      candidate.isEligible
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30"
                        : "bg-rose-50 text-rose-400 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30 line-through opacity-50"
                    }`}
                  >
                    {candidate.score}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {candidate.reasons.map((reason, idx) => {
                      const isNegative =
                        reason.includes("Thiếu") || reason.includes("Loại");
                      return (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                            isNegative
                              ? "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/5 dark:text-rose-400 dark:border-rose-500/10"
                              : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-white/5"
                          }`}
                        >
                          {reason.includes("m") && (
                            <Zap className="w-3 h-3 text-cyan-500" />
                          )}
                          {reason.includes("Tồn") && (
                            <Package className="w-3 h-3 text-indigo-500" />
                          )}
                          {reason}
                        </span>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
