import { HashRouter, Routes, Route } from 'react-router-dom';

// Layouts:
import MainLayout from '../shared/layouts/MainLayout';

// Pages:
import GeneralPage from '../pages/GeneralPage';
import ShipmentsPage from '../pages/ShipmentsPage';
import ParcelsPage from '../pages/ParcelsPage';
import ClientsPage from '../pages/ClientsPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<GeneralPage />} />
          <Route path="shipments" element={<ShipmentsPage />} />
          <Route path="parcels" element={<ParcelsPage />} />
          <Route path="clients" element={<ClientsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
