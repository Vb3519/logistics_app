// Features:
import GeneralInfo from '../app/features/general_info/GeneralInfo';
import TransportOnTheWay from '../app/features/shipments/TransportOnTheWay';
import DailyPlan from '../app/features/work_plans/DailyPlan';
import RecentRequests from '../app/features/requests/RecentRequests';
import CurrentShipmentRequestsList from '../app/features/shipments/containers/CurrentShipmentRequestsList';

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
      <CurrentShipmentRequestsList title="Свободный транспорт" />

      {/* Секция (Недавние Запросы) */}
      <RecentRequests />
    </main>
  );
};

export default GeneralPage;
