import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {},
  reducers: {},
});

const selectSnapshot = (state: RootState) => state.simulation.snapshot;

export const selectFulfillmentPoints = createSelector([selectSnapshot], (snapshot) => snapshot?.fulfillmentPoints ?? []);
export const selectProducts = createSelector([selectSnapshot], (snapshot) => snapshot?.products ?? []);

export const selectInventoryRows = createSelector([selectFulfillmentPoints, selectProducts], (points, products) =>
  products.map((product) => ({
    product,
    stocks: points.map((point) => {
      const inventory = point.inventory.find((item) => item.productId === product.id);
      return {
        pointId: point.id,
        pointName: point.name,
        availableQuantity: inventory?.availableQuantity ?? 0,
        reservedQuantity: inventory?.reservedQuantity ?? 0,
        safetyStock: inventory?.safetyStock ?? 0,
      };
    }),
  })),
);

export default inventorySlice.reducer;
