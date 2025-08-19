// Features:
import GeneralInfo from '../app/features/general_info/GeneralInfo';
import TransportOnTheWay from '../app/features/shipments/TransportOnTheWay';
import DailyPlan from '../app/features/work_plans/DailyPlan';
import CollectedParcelsList from '../app/features/parcels/containers/CollectedParcelsList';
import ShipmentRequestsList from '../app/features/shipments/containers/ShipmentRequestsList';

import AddShipmentRequestForm from '../app/features/shipments/containers/AddShipmentRequestForm';

const GeneralPage = () => {
  return (
    <main className="h-full flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:px-4">
      {/* Секция (Общие Данные) */}
      <GeneralInfo />

      {/* Секция (Транспорт в Пути) */}
      <TransportOnTheWay />

      {/* Секция (Дневной План Работы) */}
      <DailyPlan />

      {/* Секция (Свободный Транспорт) */}
      <ShipmentRequestsList />

      {/* Секция (Недавние Запросы) */}
      <CollectedParcelsList />
    </main>
  );
};

export default GeneralPage;
