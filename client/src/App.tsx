import { useEffect } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { fetchSimulationSnapshot } from './features/simulation/simulationSlice';
import { useAppDispatch } from './hooks/redux';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchSimulationSnapshot());
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
