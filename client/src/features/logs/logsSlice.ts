import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const logsSlice = createSlice({
  name: 'logs',
  initialState: {},
  reducers: {},
});

const selectSnapshot = (state: RootState) => state.simulation.snapshot;
export const selectLogs = createSelector([selectSnapshot], (snapshot) => snapshot?.logs ?? []);

export default logsSlice.reducer;
