import { AxiosError } from "axios";
import { httpClient } from "../api/httpClient";
import { demoSnapshot } from "../mocks/demoData";
import type {
  CreateOrderInput,
  Order,
  SeedDemoResponse,
  SimulationSnapshot,
  UpdateOrderStatusInput,
} from "../types";

const isDemoFallback = (error: unknown): boolean => {
  if (import.meta.env.VITE_ENABLE_DEMO_FALLBACK === "true") {
    return true;
  }

  return error instanceof AxiosError && !error.response;
};

export const simulationService = {
  async fetchSnapshot(): Promise<SimulationSnapshot> {
    try {
      const response = await httpClient.get<SimulationSnapshot>(
        "/simulation/snapshot",
      );
      return response.data;
    } catch (error: unknown) {
      if (isDemoFallback(error)) {
        return demoSnapshot;
      }
      throw error;
    }
  },

  async seedDemoData(): Promise<SeedDemoResponse> {
    try {
      const response =
        await httpClient.post<SeedDemoResponse>("/simulation/seed");
      return response.data;
    } catch (error: unknown) {
      if (isDemoFallback(error)) {
        return {
          message: "Đã nạp dữ liệu demo ở chế độ fallback.",
          snapshot: demoSnapshot,
        };
      }
      throw error;
    }
  },

  async resetDemoData(): Promise<SeedDemoResponse> {
    try {
      const response =
        await httpClient.post<SeedDemoResponse>("/simulation/reset");
      return response.data;
    } catch (error: unknown) {
      if (isDemoFallback(error)) {
        return {
          message: "Đã reset dữ liệu demo ở chế độ fallback.",
          snapshot: demoSnapshot,
        };
      }
      throw error;
    }
  },

  async createOrder(payload: CreateOrderInput): Promise<Order> {
    const response = await httpClient.post<Order>("/orders", payload);
    return response.data;
  },

  async createFullOrder(order: Order): Promise<Order> {
    try {
      const response = await httpClient.post<Order>("/orders", order);
      return response.data;
    } catch (error: unknown) {
      if (isDemoFallback(error)) {
        return order;
      }
      throw error;
    }
  },

  async updateOrderStatus(payload: UpdateOrderStatusInput): Promise<Order> {
    const response = await httpClient.patch<Order>(
      `/orders/${payload.orderId}/status`,
      payload,
    );
    return response.data;
  },

  async updateSnapshot(
    snapshot: SimulationSnapshot,
  ): Promise<SimulationSnapshot> {
    try {
      const response = await httpClient.put<SimulationSnapshot>(
        "/simulation",
        snapshot,
      );
      return response.data;
    } catch (error: unknown) {
      if (isDemoFallback(error)) {
        return snapshot;
      }
      throw error;
    }
  },
};
