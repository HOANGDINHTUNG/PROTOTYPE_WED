import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { simulationService } from "../../services/simulationService";
import type { RootState } from "../../app/store";
import i18n from "../../i18n";
import { buildAllocationDecision } from "../../utils/decisionEngine";
import type {
  CreateOrderInput,
  CustomerArea,
  Order,
  OrderStatus,
  SalesChannel,
  SimulationSnapshot,
  SystemLog,
} from "../../types";

interface SimulationState {
  snapshot: SimulationSnapshot | null;
  loading: boolean;
  seeding: boolean;
  resetting: boolean;
  creatingOrder: boolean;
  error: string | null;
}

const initialState: SimulationState = {
  snapshot: null,
  loading: false,
  seeding: false,
  resetting: false,
  creatingOrder: false,
  error: null,
};

export const fetchSimulationSnapshot = createAsyncThunk(
  "simulation/fetchSnapshot",
  async () => simulationService.fetchSnapshot(),
);

export const seedSimulationData = createAsyncThunk(
  "simulation/seed",
  async () => simulationService.seedDemoData(),
);

export const resetSimulationData = createAsyncThunk(
  "simulation/reset",
  async () => simulationService.resetDemoData(),
);

export const createOrder = createAsyncThunk(
  "simulation/createOrder",
  async (payload: CreateOrderInput, { dispatch, getState }) => {
    const state = getState() as RootState;
    const snapshot = state.simulation.snapshot;
    if (!snapshot) throw new Error("Snapshot not found");

    // 1. Calculate Allocation Decision
    const decision = buildAllocationDecision(
      payload,
      snapshot.fulfillmentPoints,
      snapshot.products,
    );

    const now = new Date().toISOString();
    const orderId = `o${Date.now()}`;
    const orderCode = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 10000)}`;

    const newOrder: Order = {
      id: orderId,
      code: orderCode,
      customerName: payload.customerName,
      customerArea: payload.customerArea,
      channel: payload.channel,
      fulfillmentMode: payload.fulfillmentMode,
      paymentMethod: payload.paymentMethod,
      status: "Đã tiếp nhận" as OrderStatus,
      fulfilledByPointId: decision.selectedPointId,
      fulfilledByPointName: decision.selectedPointName,
      shippingDistanceKm:
        decision.candidates.find((c) => c.pointId === decision.selectedPointId)
          ?.distanceKm ?? null,
      totalAmount: payload.items.reduce((sum, item) => {
        const product = snapshot.products.find((p) => p.id === item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
      }, 0),
      items: payload.items.map((item) => {
        const product = snapshot.products.find((p) => p.id === item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product?.price ?? 0,
        };
      }),
      notes: payload.notes,
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          status: "Đã tiếp nhận" as OrderStatus,
          timestamp: now,
          note: `Đơn hàng được tiếp nhận từ kênh ${payload.channel}`,
        },
      ],
      allocation: decision,
    };

    // 2. Clone and Update Snapshot in memory
    const updatedSnapshot: SimulationSnapshot = JSON.parse(
      JSON.stringify(snapshot),
    );

    // Update Fulfillment Points (Inventory & Active Orders)
    if (decision.selectedPointId) {
      const point = updatedSnapshot.fulfillmentPoints.find(
        (p) => p.id === decision.selectedPointId,
      );
      if (point) {
        point.activeOrders += 1;
        payload.items.forEach((orderItem) => {
          const invItem = point.inventory.find(
            (i) => i.productId === orderItem.productId,
          );
          if (invItem) {
            invItem.availableQuantity -= orderItem.quantity;
            invItem.reservedQuantity += orderItem.quantity;
            invItem.updatedAt = now;
          }
        });
      }
    }

    // Add Order to the beginning of the list
    updatedSnapshot.orders.unshift(newOrder);

    // Update Dashboard Counts
    updatedSnapshot.dashboard.totalOrders += 1;
    updatedSnapshot.dashboard.processingOrders += 1;

    // Add System Log
    const newLog: SystemLog = {
      id: `l${Date.now()}`,
      level: decision.selectedPointId ? "success" : "warning",
      action: "order.created",
      message: decision.selectedPointId
        ? `Tạo đơn ${orderCode} và phân bổ cho ${decision.selectedPointName}`
        : `Tạo đơn ${orderCode} nhưng không tìm thấy điểm xử lý đủ tồn`,
      createdAt: now,
      context: {
        orderId,
        orderCode,
        pointId: decision.selectedPointId,
      },
    };
    updatedSnapshot.logs.unshift(newLog);

    // 3. Save the full snapshot and re-fetch to ensure sync with live API
    await simulationService.updateSnapshot(updatedSnapshot);
    const result = await dispatch(fetchSimulationSnapshot());
    return result;
  },
);

export const simulateOrders = createAsyncThunk(
  "simulation/simulateOrders",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const products = state.simulation.snapshot?.products ?? [];
    const channels = ["Website", "Shopee", "TikTok Shop", "Facebook"];
    const areas = [
      "Quận 1",
      "Quận 3",
      "Quận 5",
      "Quận 10",
      "Bình Thạnh",
      "Thủ Đức",
    ];

    if (products.length === 0) return;

    for (let i = 0; i < 5; i++) {
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      const randomChannel =
        channels[Math.floor(Math.random() * channels.length)];
      const randomArea = areas[Math.floor(Math.random() * areas.length)];

      const payload: CreateOrderInput = {
        customerName: `${i18n.t("create_order.form.default_name_priority")} ${i + 1}`,
        customerArea: randomArea as CustomerArea,
        channel: randomChannel as SalesChannel,
        fulfillmentMode: "Giao tận nơi",
        paymentMethod: "COD",
        notes: i18n.t("create_order.form.default_notes"),
        items: [
          {
            productId: randomProduct.id,
            quantity: Math.floor(Math.random() * 3) + 1,
          },
        ],
      };

      await dispatch(createOrder(payload));
      // Add small delay between orders
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  },
);

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimulationSnapshot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimulationSnapshot.fulfilled, (state, action) => {
        state.loading = false;
        state.snapshot = action.payload;
      })
      .addCase(fetchSimulationSnapshot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? i18n.t("common.error");
      })
      .addCase(seedSimulationData.pending, (state) => {
        state.seeding = true;
      })
      .addCase(seedSimulationData.fulfilled, (state, action) => {
        state.seeding = false;
        state.snapshot = action.payload.snapshot;
      })
      .addCase(seedSimulationData.rejected, (state, action) => {
        state.seeding = false;
        state.error = action.error.message ?? i18n.t("common.error");
      })
      .addCase(resetSimulationData.pending, (state) => {
        state.resetting = true;
      })
      .addCase(resetSimulationData.fulfilled, (state, action) => {
        state.resetting = false;
        state.snapshot = action.payload.snapshot;
      })
      .addCase(resetSimulationData.rejected, (state, action) => {
        state.resetting = false;
        state.error = action.error.message ?? i18n.t("common.error");
      })
      .addCase(createOrder.pending, (state) => {
        state.creatingOrder = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.creatingOrder = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.creatingOrder = false;
        state.error = action.error.message ?? i18n.t("create_order.msg_error");
      });
  },
});

export const selectSnapshot = (state: RootState): SimulationSnapshot | null =>
  state.simulation.snapshot;
export const selectSimulationLoading = (state: RootState): boolean =>
  state.simulation.loading;
export const selectSimulationActions = (
  state: RootState,
): Pick<
  SimulationState,
  "seeding" | "resetting" | "creatingOrder" | "error"
> => ({
  seeding: state.simulation.seeding,
  resetting: state.simulation.resetting,
  creatingOrder: state.simulation.creatingOrder,
  error: state.simulation.error,
});

export default simulationSlice.reducer;
