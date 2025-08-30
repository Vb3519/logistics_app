import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';
import { BsClockHistory } from 'react-icons/bs';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';
import ActiveRequestCard from '../../../app/features/shipments/requests/loadRequestsData/elements/ActiveRequestCard';
import BreadCrumbs from '../../../shared/ui/BreadCrumbs';

// Data:
import { shipmentRequestsData } from '../../../shared/data/shipmentsData';

// State:
import {
  selectShipmentRequests,
  selectisShipmentRequestsDataLoading,
} from '../../../app/redux/slices/shipmentsSlice';

// Services:
import loadShipmentRequestsData from '../../../app/features/shipments/services/loadShipmentRequestsData';

// Types:
import {
  ShipmentRequest,
  ShipmentStatus,
} from '../../../types/shipments.interface';
import { AppDispatch } from '../../../app/redux/store';

// Api:
import {
  SHIPMENTS_URL,
  ACTIVE_SHIPMENTS_URL,
} from '../../../shared/api/logistics_appApi';

const ShipmentRequestsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToShipmentRequestDetails = (id: string) => {
    navigate(`/shipments/${id}`);
  };

  // Загрузка с api данных по непроведенным заявкам на отгрузку:
  const handleLoadShipmentRequestsData = (url: string) => {
    dispatch(loadShipmentRequestsData(url));
  };

  const shipmentRequests: ShipmentRequest[] = useSelector(
    selectShipmentRequests
  );
  const isShipmentRequestsDataLoading: boolean = useSelector(
    selectisShipmentRequestsDataLoading
  );

  useEffect(() => {
    if (shipmentRequests.length === 0 && !isShipmentRequestsDataLoading) {
      handleLoadShipmentRequestsData(ACTIVE_SHIPMENTS_URL);
    }
  }, []);

  const min_shipmentRequests_toRender = 6;
  const shipmentRequestsPlaceholdersCounter: number =
    min_shipmentRequests_toRender - shipmentRequests.length;

  return (
    <main className="h-full flex flex-col items-center gap-2 xs:mx-4 lg:mx-0 xs:gap-4 lg:px-4">
      <div className="w-full flex flex-col gap-2 justify-between sm:flex-row">
        <BreadCrumbs
          backTopath="/"
          backToPageTitle="Главная"
          currentPath="/shipments"
          currentPageTitle="Отгрузки"
        />

        <div className="p-2 flex items-center gap-2 flex-wrap text-sm xl:text-base">
          <h2 className="font-semibold">Журнал отгрузок</h2>
          <ul className="flex items-center gap-2 flex-wrap leading-4">
            <li>
              <NavLink
                to="all"
                className="block p-2 rounded-sm bg-[#7B57DF] text-white"
              >
                Все
              </NavLink>
            </li>
            <li>
              <NavLink
                to="completed"
                className="block p-2 rounded-sm bg-[#7B57DF] text-white"
              >
                Завершены
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <CustomSection className="min-h-screen w-full p-2 grid grid-rows-6 gap-2 bg-section_primary container-shadow xs:rounded-md xs:gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:min-h-0 lg:h-full">
        {/* Загрузка данных (лоадер): */}
        {isShipmentRequestsDataLoading &&
          Array.from({ length: min_shipmentRequests_toRender }).map(
            (_, index) => {
              return (
                <div
                  key={index}
                  className="h-57 bg-element_primary rounded-md animate-pulse sm:h-75 lg:h-60"
                ></div>
              );
            }
          )}

        {/* Данные загружены: */}
        {shipmentRequests.length > 0 && (
          <>
            {shipmentRequests.map((shipmentRequest) => {
              return (
                <ActiveRequestCard
                  onClick={() => {
                    handleNavigateToShipmentRequestDetails(shipmentRequest.id);
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

            {/* Плейсхолдеры: */}
            {Array.from({ length: shipmentRequestsPlaceholdersCounter }).map(
              (_, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 flex flex-col items-center justify-center gap-4 bg-gray-100 rounded-md text-sm xs:p-4 lg:text-base"
                  >
                    <h3 className="text-secondary/50">
                      Ожидается заявка на отгрузку
                    </h3>
                    <BsClockHistory className="text-8xl text-secondary/20 lg:text-9xl" />
                  </div>
                );
              }
            )}
          </>
        )}

        {/* Данные загружены, но отсутствуют: */}
        {shipmentRequests.length === 0 &&
          !isShipmentRequestsDataLoading &&
          Array.from({ length: shipmentRequestsPlaceholdersCounter }).map(
            (_, index) => {
              return (
                <div
                  key={index}
                  className="p-2 flex flex-col items-center justify-center gap-4 bg-gray-100 rounded-md text-sm xs:p-4 lg:text-base"
                >
                  <h3 className="text-secondary/50">
                    Ожидается заявка на отгрузку
                  </h3>
                  <BsClockHistory className="text-8xl text-secondary/20 lg:text-9xl" />
                </div>
              );
            }
          )}
      </CustomSection>
    </main>
  );
};

export default ShipmentRequestsPage;
