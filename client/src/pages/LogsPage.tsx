import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { SystemLogList } from "../components/logs/SystemLogList";
import { selectLogs } from "../features/logs/logsSlice";
import { useAppSelector } from "../hooks/redux";

export const LogsPage = () => {
  const { t } = useTranslation();
  const logs = useAppSelector(selectLogs);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={t("logs.eyebrow")}
        title={t("logs.title")}
        description={t("logs.desc")}
      />
      <SystemLogList logs={logs} />
    </div>
  );
};
