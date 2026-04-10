import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/common/SectionHeading";
import { InventoryOverview } from "../components/inventory/InventoryOverview";
import { InventoryTable } from "../components/inventory/InventoryTable";
import {
  selectFulfillmentPoints,
  selectInventoryRows,
} from "../features/inventory/inventorySlice";
import { useAppSelector } from "../hooks/redux";

export const InventoryPage = () => {
  const { t } = useTranslation();
  const points = useAppSelector(selectFulfillmentPoints);
  const rows = useAppSelector(selectInventoryRows);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={t("inventory.eyebrow")}
        title={t("inventory.title")}
        description={t("inventory.desc")}
      />
      <InventoryOverview points={points} />
      <InventoryTable rows={rows} />
    </div>
  );
};
