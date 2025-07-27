import { LuClipboardList } from 'react-icons/lu';
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';

// Ui:
import SideBarNav from '../widgets/SideBarNav';
import Header from '../widgets/Header';
import Footer from '../widgets/Footer';

// Features:
import GeneralInfo from './features/general_info/GeneralInfo';
import TransportOnTheWay from './features/shipments/TransportOnTheWay';
import DailyPlan from './features/work_plans/DailyPlan';
import FreeTranport from './features/shipments/FreeTranport';
import RecentRequests from './features/requests/RecentRequests';

const App = () => {
  return (
    <div className="font-[inter] bg-gray-100 lg:grid lg:grid-cols-[1fr_4fr]">
      {/* ---------- Боковое меню: ---------- */}
      <SideBarNav />

      <div className="flex flex-col gap-4 justify-between bg-gray-100 xl:mr-6 2xl:mr-12">
        {/* ---------- Хеадер: ---------- */}
        <Header />

        {/* ---------- Меин: ---------- */}
        <main className="h-full flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:px-4">
          {/* ---------- Секция (Общие Данные): ---------- */}
          <GeneralInfo />

          {/* Секция (Транспорт в Пути): ---------- */}
          <TransportOnTheWay />

          {/* ---------- Секция (Дневной План Работы): ---------- */}
          <DailyPlan />

          {/* ---------- Секция (Свободный Транспорт): ---------- */}
          <FreeTranport />

          {/* ---------- Секция (Недавние Запросы): ---------- */}
          <RecentRequests />
        </main>
      </div>

      {/* ---------- Футер: ---------- */}
      <Footer />
    </div>
  );
};

export default App;
