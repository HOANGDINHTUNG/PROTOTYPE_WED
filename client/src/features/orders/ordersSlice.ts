import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {},
  reducers: {},
});

const selectSnapshot = (state: RootState) => state.simulation.snapshot;
export const selectOrders = createSelector([selectSnapshot], (snapshot) => snapshot?.orders ?? []);
export const selectLatestAllocation = createSelector([selectOrders], (orders) => orders.find((order) => order.allocation !== null)?.allocation ?? null);

export default ordersSlice.reducer;
