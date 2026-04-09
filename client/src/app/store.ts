import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import logsReducer from "../features/logs/logsSlice";
import ordersReducer from "../features/orders/ordersSlice";
import simulationReducer from "../features/simulation/simulationSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    inventory: inventoryReducer,
    logs: logsReducer,
    orders: ordersReducer,
    simulation: simulationReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
