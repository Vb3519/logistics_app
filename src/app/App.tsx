import { HashRouter, Routes, Route } from 'react-router-dom';

// Layouts:
import MainLayout from '../shared/layouts/MainLayout';

// Pages:
import GeneralPage from '../pages/GeneralPage';

import AllShipmentsPage from '../pages/shipments/log/AllShipmentsPage';
import CompletedShipmentsPage from '../pages/shipments/log/CompletedShipmentsPage';

import ShipmentRequestsPage from '../pages/shipments/requests/ShipmentRequestsPage';
import RequestDetailsPage from '../pages/shipments/requests/RequestDetailsPage';

import ParcelsPage from '../pages/ParcelsPage';
import ClientsPage from '../pages/ClientsPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<GeneralPage />} />

          <Route path="shipments" element={<ShipmentRequestsPage />} />
          <Route path="shipments/:id" element={<RequestDetailsPage />} />

          <Route path="shipments/all" element={<AllShipmentsPage />} />
          <Route
            path="shipments/completed"
            element={<CompletedShipmentsPage />}
          />

          <Route path="parcels" element={<ParcelsPage />} />
          <Route path="clients" element={<ClientsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
