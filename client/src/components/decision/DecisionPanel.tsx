import { Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AllocationDecision } from "../../types";
import { Card } from "../common/Card";

interface DecisionPanelProps {
  decision: AllocationDecision | null;
}

export const DecisionPanel = ({ decision }: DecisionPanelProps) => {
  const { t } = useTranslation();
  if (!decision) {
    return (
      <Card
        title={t("decision.engine_title")}
        subtitle={t("decision.engine_subtitle")}
      >
        <p className="text-sm text-slate-300">{t("decision.no_data")}</p>
      </Card>
    );
  }

  return (
    <Card
      title={t("decision.selected_title")}
      subtitle={t("decision.selected_subtitle")}
    >
      <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-5">
          <div className="rounded-2xl bg-white dark:bg-emerald-400/15 p-4 text-emerald-600 dark:text-emerald-300 shadow-sm border border-emerald-100 dark:border-transparent">
            <Trophy size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
              {t("decision.winning_point")}
            </p>
            <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              {decision.selectedPointName ?? t("decision.not_selected")}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
              {decision.summary}
            </p>
            <ul className="mt-5 space-y-2.5">
              {decision.reasoning.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm font-bold text-slate-500 dark:text-slate-400"
                >
                  <span className="text-cyan-500 font-black">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
