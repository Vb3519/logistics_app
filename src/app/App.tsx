import { HashRouter, Routes, Route } from 'react-router-dom';

// Layouts:
import MainLayout from '../shared/layouts/MainLayout';

// Pages:
import GeneralPage from '../pages/GeneralPage';

import ShipmentsPage from '../pages/shipments/ShipmentsPage';
import CompletedShipmentsPage from '../pages/shipments/CompletedShipmentsPage';
import AvailableShipmentsPage from '../pages/shipments/AvailableShipmentsPage';

import ParcelsPage from '../pages/ParcelsPage';
import ClientsPage from '../pages/ClientsPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<GeneralPage />} />

          <Route path="shipments" element={<ShipmentsPage />} />
          <Route
            path="shipments/completed"
            element={<CompletedShipmentsPage />}
          />
          <Route
            path="shipments/available"
            element={<AvailableShipmentsPage />}
          />

          <Route path="parcels" element={<ParcelsPage />} />
          <Route path="clients" element={<ClientsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
