import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { OrderTable } from "../components/orders/OrderTable";
import { OrderTimelineList } from "../components/orders/OrderTimelineList";
import { selectProducts } from "../features/inventory/inventorySlice";
import { selectOrders } from "../features/orders/ordersSlice";
import { useAppSelector } from "../hooks/redux";

export const OrdersPage = () => {
  const { t } = useTranslation();
  const orders = useAppSelector(selectOrders);
  const products = useAppSelector(selectProducts);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={t("orders.eyebrow")}
        title={t("orders.title")}
        description={t("orders.desc")}
      />
      <OrderTable orders={orders} products={products} />
      <OrderTimelineList orders={orders.slice(0, 3)} />
    </div>
  );
};
