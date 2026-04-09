import { SectionHeading } from '../components/common/SectionHeading';
import { SystemLogList } from '../components/logs/SystemLogList';
import { selectLogs } from '../features/logs/logsSlice';
import { useAppSelector } from '../hooks/redux';

export const LogsPage = () => {
  const logs = useAppSelector(selectLogs);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Nhật ký hệ thống"
        title="Hiển thị hành vi hệ thống theo thời gian để tăng độ thuyết phục"
        description="Khu này làm giao diện giống một OMS/WMS thật hơn, rất phù hợp khi bạn trình bày flow 3-5 phút cho khách hàng hoặc giảng viên."
      />
      <SystemLogList logs={logs} />
    </div>
  );
};
