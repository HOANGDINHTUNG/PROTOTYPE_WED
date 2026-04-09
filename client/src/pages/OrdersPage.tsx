import { SectionHeading } from '../components/common/SectionHeading';
import { OrderTable } from '../components/orders/OrderTable';
import { OrderTimelineList } from '../components/orders/OrderTimelineList';
import { selectProducts } from '../features/inventory/inventorySlice';
import { selectOrders } from '../features/orders/ordersSlice';
import { useAppSelector } from '../hooks/redux';

export const OrdersPage = () => {
  const orders = useAppSelector(selectOrders);
  const products = useAppSelector(selectProducts);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Quản lý đơn hàng"
        title="Theo dõi trạng thái đơn và timeline xử lý từ đầu đến cuối"
        description="Bảng này phục vụ demo rất tốt vì người xem có thể thấy từng đơn đang ở đâu trong chu trình fulfillment."
      />
      <OrderTable orders={orders} products={products} />
      <OrderTimelineList orders={orders.slice(0, 3)} />
    </div>
  );
};
