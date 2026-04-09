import { SectionHeading } from '../components/common/SectionHeading';
import { InventoryOverview } from '../components/inventory/InventoryOverview';
import { InventoryTable } from '../components/inventory/InventoryTable';
import { selectFulfillmentPoints, selectInventoryRows } from '../features/inventory/inventorySlice';
import { useAppSelector } from '../hooks/redux';

export const InventoryPage = () => {
  const points = useAppSelector(selectFulfillmentPoints);
  const rows = useAppSelector(selectInventoryRows);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Tồn kho toàn hệ thống"
        title="Giám sát tồn kho đa điểm để chứng minh đồng bộ omnichannel"
        description="Người xem có thể thấy kho trung tâm và các cửa hàng đang còn bao nhiêu hàng, đang giữ bao nhiêu và tải vận hành ở mức nào."
      />
      <InventoryOverview points={points} />
      <InventoryTable rows={rows} />
    </div>
  );
};
