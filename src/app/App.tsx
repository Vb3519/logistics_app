import { HashRouter, Routes, Route } from 'react-router-dom';

// Layouts:
import MainLayout from '../shared/layouts/MainLayout';

// Pages:
import GeneralPage from '../pages/GeneralPage';

import AllShipmentsLogPage from '../pages/shipments_log/AllShipmentsLogPage';
import CompletedShipmentsLogPage from '../pages/shipments_log/CompletedShipmentsLogPage';

import CurrentShipmentsPage from '../pages/current_shipments/CurrentShipmentsPage';
import CurrentShipmentDetailsPage from '../pages/current_shipments/CurrentShipmentDetailsPage';

import ParcelsPage from '../pages/ParcelsPage';
import ClientsPage from '../pages/ClientsPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<GeneralPage />} />

          <Route path="shipments" element={<CurrentShipmentsPage />} />
          <Route
            path="shipments/:id"
            element={<CurrentShipmentDetailsPage />}
          />

          <Route path="shipments/all" element={<AllShipmentsLogPage />} />
          <Route
            path="shipments/completed"
            element={<CompletedShipmentsLogPage />}
          />

          <Route path="parcels" element={<ParcelsPage />} />
          <Route path="clients" element={<ClientsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
