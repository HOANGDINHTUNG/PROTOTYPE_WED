import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { fetchSimulationSnapshot } from "./features/simulation/simulationSlice";
import { useAppDispatch } from "./hooks/redux";

import { UIProvider } from "./context/UIContext";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchSimulationSnapshot());
  }, [dispatch]);

  return (
    <UIProvider>
      <AppRoutes />
    </UIProvider>
  );
};

export default App;
