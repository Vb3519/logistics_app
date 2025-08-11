import { HashRouter, Routes, Route } from 'react-router-dom';

// Layouts:
import MainLayout from '../shared/layouts/MainLayout';

// Pages:
import GeneralPage from '../pages/GeneralPage';

import AllShipmentsLogPage from '../pages/shipments_log/AllShipmentsLogPage';
import CompletedShipmentsLogPage from '../pages/shipments_log/CompletedShipmentsLogPage';

import CurrentShRequestsPage from '../pages/current_shipment_requests/CurrentShRequestsPage';
import CurrentShRequestDetailsPage from '../pages/current_shipment_requests/CurrentShRequestDetailsPage';

import ParcelsPage from '../pages/ParcelsPage';
import ClientsPage from '../pages/ClientsPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<GeneralPage />} />

          <Route path="shipments" element={<CurrentShRequestsPage />} />
          <Route
            path="shipments/:id"
            element={<CurrentShRequestDetailsPage />}
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
