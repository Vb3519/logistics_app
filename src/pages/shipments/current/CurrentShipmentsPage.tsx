import { NavLink, useNavigate } from 'react-router-dom';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';
import CurrentShipmentsCard from './CurrentShipmentsCard';

// Data:
import { currentShipmentsData } from '../../../shared/data/shipmentsData';

const CurrentShipmentsPage = () => {
  const navigate = useNavigate();

  const handleNavigateToShipmentDetails = (id: string) => {
    navigate(`/shipments/${id}`);
  };

  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <div className="p-2 mr-auto flex items-center gap-2 flex-wrap text-sm">
        <h1 className="font-semibold text-base lg:text-lg">Текущие отгрузки</h1>
        <ul className="flex items-center gap-2 flex-wrap leading-4">
          <li className="p-2 rounded-sm bg-[#7B57DF] text-white">
            <NavLink to="all">Все</NavLink>
          </li>
          <li className="p-2 rounded-sm bg-[#7B57DF] text-white">
            <NavLink to="completed">Завершены</NavLink>
          </li>
        </ul>
      </div>

      <CustomSection className="min-h-screen w-full p-2 grid grid-rows-6 gap-2 bg-white container-shadow xs:rounded-md xs:gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:min-h-0 lg:h-full">
        {currentShipmentsData.map((el) => {
          return (
            <CurrentShipmentsCard
              onClick={() => {
                handleNavigateToShipmentDetails(el.id);
              }}
              key={el.id}
              adress={el.adress}
              date={el.date}
              progress={el.progress}
              current_weight={el.current_weight}
              max_weight={el.max_weight}
              shipment_number={el.shipment_number}
              truck_number={el.truck_number}
            />
          );
        })}
      </CustomSection>
    </main>
  );
};

export default CurrentShipmentsPage;
