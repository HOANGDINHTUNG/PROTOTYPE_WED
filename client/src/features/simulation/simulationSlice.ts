import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { simulationService } from "../../services/simulationService";
import type { RootState } from "../../app/store";
import type {
  CreateOrderInput,
  CustomerArea,
  SalesChannel,
  SimulationSnapshot,
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
  async (payload: CreateOrderInput, { dispatch }) => {
    const result = await simulationService.createOrder(payload);
    await dispatch(fetchSimulationSnapshot());
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
        customerName: `Khách Random ${i + 1}`,
        customerArea: randomArea as CustomerArea,
        channel: randomChannel as SalesChannel,
        fulfillmentMode: "Giao tận nơi",
        paymentMethod: "COD",
        notes: "Đơn hàng được tạo tự động bởi Stress Test Mode",
        items: [
          {
            productId: randomProduct.id,
            quantity: Math.floor(Math.random() * 3) + 1,
          },
        ],
      };

      await simulationService.createOrder(payload);
      // Add small delay between orders
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    await dispatch(fetchSimulationSnapshot());
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
        state.error = action.error.message ?? "Không thể tải dữ liệu hệ thống.";
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
        state.error = action.error.message ?? "Không thể nạp dữ liệu mẫu.";
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
        state.error = action.error.message ?? "Không thể reset mô phỏng.";
      })
      .addCase(createOrder.pending, (state) => {
        state.creatingOrder = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.creatingOrder = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.creatingOrder = false;
        state.error = action.error.message ?? "Lỗi khi tạo đơn hàng.";
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
