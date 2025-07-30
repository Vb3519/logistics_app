import { useNavigate } from 'react-router-dom';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';
import BreadCrumbs from '../../../shared/ui/BreadCrumbs';
import AvailableShipmentsCard from './AvailableShipmentsCard';

// Data:
import { availableShipmentsData } from '../../../shared/data/shipmentsData';

const AvailableShipmentsPage = () => {
  const navigate = useNavigate();

  const handleNavigateToShipmentDetails = (id: string) => {
    navigate(`/shipments/available/${id}`);
  };

  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/shipments"
        backToPageTitle="Все отгрузки"
        currentPath="/shipments/available"
        currentPageTitle="Текущие заявки"
      />

      <CustomSection className="min-h-screen w-full p-2 grid grid-rows-6 gap-2 bg-white container-shadow xs:rounded-md xs:gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:min-h-0 lg:h-full">
        {availableShipmentsData.map((el) => {
          return (
            <AvailableShipmentsCard
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

export default AvailableShipmentsPage;
