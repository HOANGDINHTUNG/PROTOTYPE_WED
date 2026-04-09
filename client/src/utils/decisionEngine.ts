import type {
  AllocationCandidate,
  AllocationDecision,
  CreateOrderInput,
  CustomerArea,
  FulfillmentPoint,
  Product,
} from '../types';

const areaCoordinates: Record<CustomerArea, { x: number; y: number }> = {
  'Quận 1': { x: 7, y: 6 },
  'Quận 3': { x: 6, y: 6 },
  'Quận 5': { x: 4, y: 5 },
  'Quận 7': { x: 7, y: 2 },
  'Quận 10': { x: 5, y: 6 },
  'Bình Thạnh': { x: 8, y: 7 },
  'Phú Nhuận': { x: 7, y: 7 },
  'Tân Bình': { x: 5, y: 8 },
  'Thủ Đức': { x: 10, y: 8 },
};

export const calculateDistanceKm = (from: CustomerArea, to: CustomerArea): number => {
  const source = areaCoordinates[from];
  const target = areaCoordinates[to];
  const distance = Math.sqrt((source.x - target.x) ** 2 + (source.y - target.y) ** 2) * 1.15;
  return Number(distance.toFixed(1));
};

const scoreCandidate = (
  point: FulfillmentPoint,
  customerArea: CustomerArea,
  productId: string,
  quantity: number,
  isStorePickup: boolean,
): AllocationCandidate => {
  const inventory = point.inventory.find((item) => item.productId === productId);
  const availableQuantity = inventory?.availableQuantity ?? 0;
  const distanceKm = calculateDistanceKm(point.area, customerArea);
  const capacityRatio = point.activeOrders / point.handlingCapacity;
  const pickupBoost = isStorePickup && point.type === 'Store' ? -1.2 : 0;
  const stockPenalty = availableQuantity < quantity ? 100 : 0;
  const score = Number((distanceKm + capacityRatio * 8 + pickupBoost + stockPenalty).toFixed(2));

  const reasons: string[] = [];
  if (availableQuantity >= quantity) reasons.push(`Đủ tồn: ${availableQuantity}/${quantity}`);
  else reasons.push(`Thiếu tồn: ${availableQuantity}/${quantity}`);
  reasons.push(`Khoảng cách ${distanceKm} km`);
  reasons.push(`Tải xử lý ${point.activeOrders}/${point.handlingCapacity}`);
  if (pickupBoost < 0) reasons.push('Ưu tiên điểm bán vì khách nhận tại cửa hàng');

  return {
    pointId: point.id,
    pointName: point.name,
    pointType: point.type,
    area: point.area,
    distanceKm,
    activeOrders: point.activeOrders,
    availableQuantity,
    score,
    isEligible: availableQuantity >= quantity,
    reasons,
  };
};

export const buildAllocationDecision = (
  input: CreateOrderInput,
  points: FulfillmentPoint[],
  products: Product[],
): AllocationDecision => {
  const primaryItem = input.items[0];
  const product = products.find((item) => item.id === primaryItem?.productId);

  if (!primaryItem || !product) {
    return {
      selectedPointId: null,
      selectedPointName: null,
      winningScore: null,
      summary: 'Không thể chấm điểm vì đơn hàng chưa có sản phẩm hợp lệ.',
      reasoning: ['Vui lòng chọn sản phẩm và số lượng trước khi tạo đơn.'],
      candidates: [],
    };
  }

  const candidates = points
    .map((point) => scoreCandidate(point, input.customerArea, primaryItem.productId, primaryItem.quantity, input.fulfillmentMode === 'Nhận tại cửa hàng'))
    .sort((left, right) => left.score - right.score);

  const bestCandidate = candidates.find((candidate) => candidate.isEligible) ?? null;

  if (!bestCandidate) {
    return {
      selectedPointId: null,
      selectedPointName: null,
      winningScore: null,
      summary: `Chưa có điểm xử lý nào đủ tồn cho ${product.name}.`,
      reasoning: ['Hệ thống đã quét toàn bộ điểm bán nhưng tất cả đều thiếu tồn khả dụng.'],
      candidates,
    };
  }

  return {
    selectedPointId: bestCandidate.pointId,
    selectedPointName: bestCandidate.pointName,
    winningScore: bestCandidate.score,
    summary: `Hệ thống chọn ${bestCandidate.pointName} vì điểm số thấp nhất, đủ tồn và phù hợp với vùng giao nhận.`,
    reasoning: [
      `Khoảng cách dự kiến chỉ ${bestCandidate.distanceKm} km.`,
      `Tải xử lý hiện tại là ${bestCandidate.activeOrders} đơn, nằm trong ngưỡng an toàn.`,
      `Tồn khả dụng cho sản phẩm đạt ${bestCandidate.availableQuantity} đơn vị.`,
    ],
    candidates,
  };
};
