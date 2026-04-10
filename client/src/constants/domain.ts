import type {
  CustomerArea,
  FulfillmentMode,
  OrderStatus,
  PaymentMethod,
  SalesChannel,
  SelectorOption,
} from "../types";

export const salesChannels: SelectorOption<SalesChannel>[] = [
  { label: "Website", value: "Website" },
  { label: "Shopee", value: "Shopee" },
  { label: "TikTok Shop", value: "TikTok Shop" },
  { label: "Facebook", value: "Facebook" },
  { label: "Offline", value: "Offline" },
];

export const customerAreas: SelectorOption<CustomerArea>[] = [
  { label: "Quận 1", value: "Quận 1" },
  { label: "Quận 3", value: "Quận 3" },
  { label: "Quận 5", value: "Quận 5" },
  { label: "Quận 7", value: "Quận 7" },
  { label: "Quận 10", value: "Quận 10" },
  { label: "Bình Thạnh", value: "Bình Thạnh" },
  { label: "Phú Nhuận", value: "Phú Nhuận" },
  { label: "Tân Bình", value: "Tân Bình" },
  { label: "Thủ Đức", value: "Thủ Đức" },
];

export const fulfillmentModes: SelectorOption<FulfillmentMode>[] = [
  { label: "Giao tận nơi", value: "Giao tận nơi" },
  { label: "Nhận tại cửa hàng", value: "Nhận tại cửa hàng" },
];

export const paymentMethods: SelectorOption<PaymentMethod>[] = [
  { label: "COD", value: "COD" },
  { label: "ĐÃ THANH TOÁN", value: "Đã thanh toán" },
  { label: "CHUYỂN KHOẢN", value: "Chuyển khoản" },
];

export const orderStatuses: OrderStatus[] = [
  "Đã tiếp nhận",
  "Đang phân bổ",
  "Đang xử lý",
  "Đã đóng gói",
  "Đang giao",
  "Giao thành công",
  "Giao thất bại",
  "Hoàn hàng",
];

export const statusFlow: OrderStatus[] = [
  "Đã tiếp nhận",
  "Đang phân bổ",
  "Đang xử lý",
  "Đã đóng gói",
  "Đang giao",
  "Giao thành công",
];
