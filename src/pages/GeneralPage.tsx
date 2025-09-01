// Features:
import GeneralInfo from '../app/widgets/generalInfo/GeneralInfo';
import TransportOnTheWay from '../app/widgets/shipments/TransportOnTheWay';
import DailyPlan from '../app/widgets/dailyPlan/DailyPlan';
import RecentlyCollectedParcels from '../app/widgets/parcels/RecentlyCollectedParcels';
import ActiveRequestsList from '../app/entites/shipmentRequests/ActiveRequestsList';

import AddShipmentRequestForm from '../app/features/shipments/addShipmentRequest/AddShipmentRequestForm';

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
