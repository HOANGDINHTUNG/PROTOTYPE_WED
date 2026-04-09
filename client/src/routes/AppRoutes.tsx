import { Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { CreateOrderPage } from '../pages/CreateOrderPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DecisionEnginePage } from '../pages/DecisionEnginePage';
import { InventoryPage } from '../pages/InventoryPage';
import { LogsPage } from '../pages/LogsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { OrdersPage } from '../pages/OrdersPage';

export const AppRoutes = () => (
  <Routes>
    <Route element={<AppShell />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/orders/create" element={<CreateOrderPage />} />
      <Route path="/decision-engine" element={<DecisionEnginePage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
