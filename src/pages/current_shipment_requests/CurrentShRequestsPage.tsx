import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';
import CurrentShipmentsCard from '../../app/features/shipments/elements/CurrentShipmentsCard';

// Data:
import { currentShipmentsData } from '../../shared/data/shipmentsData';

// State:
import {
  selectCurrentShipmentRequests,
  loadCurrentShipmentRequestsData,
} from '../../app/redux/slices/shipmentsSlice';

// Types:
import { ShipmentRequest } from '../../types/shipments.interface';
import { AppDispatch } from '../../app/redux/store';

// Api:
import { SHIPMENTS_URL } from '../../shared/api/logistics_appApi';

const CurrentShRequestsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToShipmentDetails = (id: string) => {
    navigate(`/shipments/${id}`);
  };

  // Загрузка с api данных по непроведенным заявкам на отгрузку:
  const handleLoadCurrentShipmentRequestsData = (url: string) => {
    dispatch(loadCurrentShipmentRequestsData(url));
  };

  const currentShipmentRequests: ShipmentRequest[] = useSelector(
    selectCurrentShipmentRequests
  );

  useEffect(() => {
    if (currentShipmentRequests.length === 0) {
      handleLoadCurrentShipmentRequestsData(SHIPMENTS_URL);
    }
  }, []);

  const min_shipmentRequests_toRender = 6;
  const shipmentRequestsPlaceholdersCounter: number =
    min_shipmentRequests_toRender - currentShipmentRequests.length;

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

      <CustomSection className="min-h-screen w-full p-2 grid grid-rows-6 gap-2 bg-section_primary container-shadow xs:rounded-md xs:gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:min-h-0 lg:h-full">
        {currentShipmentRequests.map((shipmentRequest) => {
          return (
            <CurrentShipmentsCard
              onClick={() => {
                handleNavigateToShipmentDetails(shipmentRequest.id);
              }}
              key={shipmentRequest.id}
              created_at={shipmentRequest.created_at}
              shipment_number={shipmentRequest.shipment_number}
              current_load_value={shipmentRequest.current_load_value}
              max_load_value={shipmentRequest.max_load_value}
              transport={shipmentRequest.transport}
              shipment_status={shipmentRequest.shipment_status}
              from_city={shipmentRequest.from_city}
              to_city={shipmentRequest.to_city}
              transport_info={shipmentRequest.transport_info}
            />
          );
        })}
        {Array.from({ length: shipmentRequestsPlaceholdersCounter }).map(
          (_, index) => {
            return <div key={index} className="bg-gray-100 rounded-md"></div>;
          }
        )}
      </CustomSection>
    </main>
  );
};

export default CurrentShRequestsPage;
