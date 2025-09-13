import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Ui:
import BreadCrumbs from 'shared/ui/BreadCrumbs';

// Widgets:
import EditShipmentAdressModal from 'app/widgets/shipments/EditShipmentAdressModal';

import ParcelsToUploadSection from 'app/widgets/parcels/ParcelsToUploadSection';
import CurrentRequestDetails from 'app/widgets/shipments/CurrentRequestDetails';

// State:
import {
  selectShipmentRequests,
  selectisShipmentRequestsDataLoading,
} from 'app/redux/slices/shipmentsSlice';

// Services:
import loadShipmentRequestsData from 'app/services/shipments/loadShipmentRequestsData';

// Types:
import { AppDispatch } from 'app/redux/store';

// Api:
import { SHIPMENTS_URL } from 'shared/api/logistics_appApi';

const RequestDetailsPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const params = useParams();
  const { id } = params;

  // Загрузка с api данных по непроведенным заявкам на отгрузку:
  const handleLoadShipmentRequestsData = (url: string) => {
    dispatch(loadShipmentRequestsData(url));
  };

  const shipmentRequests = useSelector(selectShipmentRequests);

  const isShipmentRequestsDataLoading: boolean = useSelector(
    selectisShipmentRequestsDataLoading
  );

  // Информация по текущей непроведенной заявке на отгрузку:
  const currentShipmentRequestData = shipmentRequests.find(
    (shipmentRequest) => shipmentRequest.id === id
  );

  useEffect(() => {
    if (shipmentRequests.length === 0 && !isShipmentRequestsDataLoading) {
      // `${SHIPMENTS_URL}?id=${id}`

      handleLoadShipmentRequestsData(
        `${SHIPMENTS_URL}?is_shipment_status_set=false`
      );
    }
  }, []);

  return (
    <>
      <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
        <BreadCrumbs
          backTopath="/shipments"
          backToPageTitle="Текущие отгрузки"
          currentPath=""
          currentPageTitle={`${
            currentShipmentRequestData
              ? currentShipmentRequestData.shipment_number
              : 'Номер отгрузки'
          }`}
        />

        <div className="w-full flex flex-col gap-4 md:flex-row">
          {/* Детализированная карточка текущей непроведенной заявки на отгрузку: */}
          <CurrentRequestDetails />

          {/* Таблица посылок и перечень выбранных к погрузке посылок: */}
          <ParcelsToUploadSection />
        </div>
      </main>

      {/* Модалка (редактирование адреса доставки): */}
      <EditShipmentAdressModal />
    </>
  );
};

export default RequestDetailsPage;
