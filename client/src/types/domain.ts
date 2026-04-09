export type SalesChannel = 'Website' | 'Shopee' | 'TikTok Shop' | 'Facebook' | 'Offline';

export type CustomerArea =
  | 'Quận 1'
  | 'Quận 3'
  | 'Quận 5'
  | 'Quận 7'
  | 'Quận 10'
  | 'Bình Thạnh'
  | 'Phú Nhuận'
  | 'Tân Bình'
  | 'Thủ Đức';

export type FulfillmentMode = 'Giao tận nơi' | 'Nhận tại cửa hàng';
export type PaymentMethod = 'COD' | 'Đã thanh toán';
export type FulfillmentPointType = 'Warehouse' | 'Store';

export type OrderStatus =
  | 'Đã tiếp nhận'
  | 'Đang phân bổ'
  | 'Đang xử lý'
  | 'Đã đóng gói'
  | 'Đang giao'
  | 'Giao thành công'
  | 'Giao thất bại'
  | 'Hoàn hàng';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  thumbnail: string;
  unit: string;
  tags: string[];
}

export interface InventoryItem {
  productId: string;
  availableQuantity: number;
  reservedQuantity: number;
  safetyStock: number;
  updatedAt: string;
}

export interface FulfillmentPoint {
  id: string;
  code: string;
  name: string;
  type: FulfillmentPointType;
  area: CustomerArea;
  address: string;
  handlingCapacity: number;
  activeOrders: number;
  inventory: InventoryItem[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderTimelineEntry {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface AllocationCandidate {
  pointId: string;
  pointName: string;
  pointType: FulfillmentPointType;
  area: CustomerArea;
  distanceKm: number;
  activeOrders: number;
  availableQuantity: number;
  score: number;
  isEligible: boolean;
  reasons: string[];
}

export interface AllocationDecision {
  selectedPointId: string | null;
  selectedPointName: string | null;
  winningScore: number | null;
  summary: string;
  reasoning: string[];
  candidates: AllocationCandidate[];
}

export interface Order {
  id: string;
  code: string;
  customerName: string;
  customerArea: CustomerArea;
  channel: SalesChannel;
  fulfillmentMode: FulfillmentMode;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  fulfilledByPointId: string | null;
  fulfilledByPointName: string | null;
  shippingDistanceKm: number | null;
  totalAmount: number;
  items: OrderItem[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEntry[];
  allocation: AllocationDecision | null;
}

export interface SystemLog {
  id: string;
  level: 'info' | 'success' | 'warning' | 'error';
  action: string;
  message: string;
  createdAt: string;
  context?: Record<string, string | number | boolean | null>;
}

export interface DashboardSummary {
  totalOrders: number;
  processingOrders: number;
  deliveredOrders: number;
  returnOrFailedOrders: number;
  totalInventoryUnits: number;
  channelBreakdown: Array<{
    channel: SalesChannel;
    totalOrders: number;
    revenue: number;
  }>;
  recentOrders: Order[];
}

export interface SimulationSnapshot {
  dashboard: DashboardSummary;
  products: Product[];
  fulfillmentPoints: FulfillmentPoint[];
  orders: Order[];
  logs: SystemLog[];
}

export interface CreateOrderInput {
  customerName: string;
  customerArea: CustomerArea;
  channel: SalesChannel;
  fulfillmentMode: FulfillmentMode;
  paymentMethod: PaymentMethod;
  notes: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export interface UpdateOrderStatusInput {
  orderId: string;
  status: OrderStatus;
  note: string;
}

export interface SeedDemoResponse {
  message: string;
  snapshot: SimulationSnapshot;
}
