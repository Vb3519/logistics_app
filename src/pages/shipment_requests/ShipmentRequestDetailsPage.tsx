import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

// Ui:
import BreadCrumbs from '../../shared/ui/BreadCrumbs';
import CustomButton from '../../shared/ui/CustomButton';
import CustomSection from '../../shared/ui/CustomSection';
import ParcelsTable from '../../app/features/parcels/containers/ParcelsTable';

// Data:
import { shipmentRequestsData } from '../../shared/data/shipmentsData';

// State:
import {
  selectShipmentRequests,
  selectisShipmentRequestsDataLoading,
  loadShipmentRequestsData,
} from '../../app/redux/slices/shipmentsSlice';

// Types:
import { AppDispatch } from '../../app/redux/store';
import { ShipmentRequest } from '../../types/shipments.interface';

// Api:
import { SHIPMENTS_URL } from '../../shared/api/logistics_appApi';

const ShipmentRequestDetailsPage = () => {
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
  const uploadedParcels = currentShipmentRequestData?.shipment_parcels;

  useEffect(() => {
    if (shipmentRequests.length === 0 && !isShipmentRequestsDataLoading) {
      handleLoadShipmentRequestsData(SHIPMENTS_URL);
    }
  }, []);

  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/shipments"
        backToPageTitle="Текущие отгрузки"
        currentPath=""
        currentPageTitle={`${currentShipmentRequestData?.shipment_number}`}
      />

      <div className="w-full flex flex-col gap-4 md:flex-row">
        {currentShipmentRequestData ? (
          <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full lg:gap-8 lg:basis-2/5">
            {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
            {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
            {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
            <div className="w-full flex flex-col gap-2 lg:gap-4">
              <div className="flex items-center gap-2 text-sm lg:text-base">
                <div className="font-bold lg:text-lg">
                  <span>{currentShipmentRequestData.from_city} - </span>
                  <span>{currentShipmentRequestData.to_city}</span>
                </div>
                <div className="mt-0.5 text-secondary">
                  {currentShipmentRequestData.created_at}
                </div>
              </div>

              <div className="p-4 flex items-center gap-2 text-sm border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md lg:text-base">
                <p>Загруженность машины</p>
                <span className="ml-auto text-lg text-amber-400 lg:text-4xl">
                  {Math.floor(
                    (currentShipmentRequestData.current_load_value /
                      currentShipmentRequestData.max_load_value) *
                      100
                  )}
                  %
                </span>
              </div>

              <div className="flex flex-col gap-4 text-sm lg:text-base">
                <div className="flex flex-col gap-1">
                  <span className="text-secondary">Заявка </span>
                  <div className="p-4 border-b-2 border-b-[#cbcbcb] bg-element_primary text-primary rounded-md">
                    {currentShipmentRequestData.shipment_number}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-secondary">Автомобиль </span>
                  <div className="p-4 border-b-2 border-b-[#cbcbcb] bg-element_primary text-primary rounded-md">
                    {currentShipmentRequestData.transport}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-sm lg:text-base">
                <span className="text-[#7B57DF]">Статус отгрузки</span>

                <fieldset className="p-4 border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md">
                  <div className="flex items-center gap-2">
                    <input
                      name="shipment_status"
                      id="shipment_in_proccess"
                      type="radio"
                    ></input>
                    <label
                      htmlFor="shipment_in_proccess"
                      className="cursor-pointer"
                    >
                      В пути
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      name="shipment_status"
                      id="shipment_completed"
                      type="radio"
                    ></input>
                    <label
                      htmlFor="shipment_completed"
                      className="cursor-pointer"
                    >
                      Завершен
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      name="shipment_status"
                      id="shipment_is_delayed"
                      type="radio"
                    ></input>
                    <label
                      htmlFor="shipment_is_delayed"
                      className="cursor-pointer"
                    >
                      Опаздывает
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="p-4 flex items-center justify-between gap-2 text-sm lg:text-base">
                <div className="flex flex-col gap-2">
                  <span className="text-secondary">Доступно, кг</span>
                  <div>
                    <span className="lg:text-2xl xl:text-4xl">
                      {currentShipmentRequestData.current_load_value}
                    </span>
                    <span className="text-secondary lg:text-2xl xl:text-4xl">
                      /{currentShipmentRequestData.max_load_value}
                    </span>
                  </div>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute w-22 h-15 top-5 left-0 border-2 border-gray-400/70 bg-amber-300 xl:w-43 xl:h-30 xl:top-10"></div>
                  <BsTruckFlatbed className="text-9xl text-gray-500/40 xl:text-[250px]" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <CustomButton className="p-2 text-[#7B57DF] bg-element_primary">
                  Завершить загрузку
                </CustomButton>

                <CustomButton className="p-2 text-[#7B57DF] bg-element_primary">
                  Отменить заявку
                </CustomButton>
              </div>
            </div>

            {/* ПОСЫЛКИ, ДОБАВЛЕННЫЕ В ЗАЯВКУ НА ОТГРУЗКУ: */}
            {/* ПОСЫЛКИ, ДОБАВЛЕННЫЕ В ЗАЯВКУ НА ОТГРУЗКУ: */}
            {/* ПОСЫЛКИ, ДОБАВЛЕННЫЕ В ЗАЯВКУ НА ОТГРУЗКУ: */}
            <div>
              <h3>Загруженные посылки:</h3>
              <ul>
                {uploadedParcels?.length
                  ? uploadedParcels?.map((parcelInfo) => {
                      return (
                        <li key={parcelInfo.parcel_number}>
                          {parcelInfo.parcel_number}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </CustomSection>
        ) : (
          <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full lg:flex-row lg:gap-8 lg:basis-2/5">
            Нет данных
          </CustomSection>
        )}

        {/* ПЕРЕЧЕНЬ ДОСТУПНЫХ ПОСЫЛОК: */}
        {/* ПЕРЕЧЕНЬ ДОСТУПНЫХ ПОСЫЛОК: */}
        {/* ПЕРЕЧЕНЬ ДОСТУПНЫХ ПОСЫЛОК: */}
        <ParcelsTable isCheckBoxNeeded={true} />
      </div>
    </main>
  );
};

export default ShipmentRequestDetailsPage;
