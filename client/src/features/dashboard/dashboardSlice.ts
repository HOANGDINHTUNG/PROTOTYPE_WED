import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {},
  reducers: {},
});

const selectSnapshot = (state: RootState) => state.simulation.snapshot;

export const selectDashboardSummary = createSelector([selectSnapshot], (snapshot) => snapshot?.dashboard ?? null);
export const selectRecentOrders = createSelector([selectSnapshot], (snapshot) => snapshot?.dashboard.recentOrders ?? []);

export default dashboardSlice.reducer;
