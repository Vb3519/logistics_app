// Features:
import GeneralInfo from '../app/features/general_info/GeneralInfo';
import TransportOnTheWay from '../app/features/shipments/log/TransportOnTheWay';
import DailyPlan from '../app/features/work_plans/DailyPlan';
import RecentlyCollectedParcels from '../app/features/parcels/AddParcelToTransport/elements/RecentlyCollectedParcels';
import ActiveRequestsList from '../app/features/shipments/requests/loadRequestsData/containers/ActiveRequestsList';

import AddShipmentRequestForm from '../app/features/shipments/requests/addRequest/containers/AddShipmentRequestForm';

const GeneralPage = () => {
  return (
    <main className="h-full flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:px-4">
      {/* Секция (Общие Данные) */}
      <GeneralInfo />

      {/* Секция (Транспорт в Пути) */}
      <TransportOnTheWay />

      {/* Секция (Создание новой заявки на отгрузку) */}
      <AddShipmentRequestForm />

      {/* Секция (Текущие заявки на отгрузку) */}
      <ActiveRequestsList />

      {/* Секция (Недавно собранные посылки) */}
      <RecentlyCollectedParcels />
    </main>
  );
};

export default GeneralPage;
