import { HashRouter, Routes, Route } from 'react-router-dom';

// Layouts:
import MainLayout from '../shared/layouts/MainLayout';

// Pages:
import GeneralPage from '../pages/GeneralPage';

import AllShipmentsPage from '../pages/shipments/AllShipmentsPage';
import CompletedShipmentsPage from '../pages/shipments/CompletedShipmentsPage';

import CurrentShipmentsPage from '../pages/shipments/current/CurrentShipmentsPage';
import CurrentShipmentDetails from '../pages/shipments/current/CurrentShipmentDetails';

import ParcelsPage from '../pages/ParcelsPage';
import ClientsPage from '../pages/ClientsPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<GeneralPage />} />

          <Route path="shipments" element={<CurrentShipmentsPage />} />
          <Route path="shipments/:id" element={<CurrentShipmentDetails />} />

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
