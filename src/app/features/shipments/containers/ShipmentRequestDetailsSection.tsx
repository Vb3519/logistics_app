import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

// Ui:
import CustomButton from '../../../../shared/ui/CustomButton';
import CustomSection from '../../../../shared/ui/CustomSection';
import PercentageOfCarLoad from '../elements/PercentageOfCarLoad';
import ShipmentRequestInfo from '../elements/ShipmentRequestInfo';
import ShipmentRequestDetailsSectionSkeleton from '../elements/skeletons/ShipmentRequestDetailsSectionSkeleton';

// Utils:
import { calcTransportLoad } from '../../../../shared/utils/calcTransportLoad';

// State:
import {
  selectShipmentRequests,
  removeParcelsFromShipment,
} from '../../../redux/slices/shipmentsSlice';

import {
  selectIsShipmentParselsListOpened,
  toggleShipmentParcelsList,
} from '../../../redux/slices/shipmentParcelsListSlice';

// Services:
import unloadParcelFromShipmentRequest from '../../parcels/services/unloadParcelFromShipmentRequest';

// Types:
import { ShipmentRequest } from '../../../../types/shipments.interface';
import { Parcel } from '../../../../types/parcels.interface';
import { AppDispatch } from '../../../redux/store';

// Api:
import { PARCELS_URL } from '../../../../shared/api/logistics_appApi';

const ShipmentRequestDetailsSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  const shipmentRequests = useSelector(selectShipmentRequests);

  const currentShipmentRequestData: ShipmentRequest | undefined =
    shipmentRequests.find((shipmentRequest) => shipmentRequest.id === id);

  const uploadedParcels: Parcel[] | undefined =
    currentShipmentRequestData?.shipment_parcels;

  const isShipmentParcelsListOpened: boolean = useSelector(
    selectIsShipmentParselsListOpened
  );

  // Отображение списка посылок, добавленных к непроведенной заявке на отгрузку:
  // ----------------------------------------------------------
  const handleToggleShipmentParcelsList = () => {
    dispatch(toggleShipmentParcelsList());
  };

  // Убрать посылки из непроведенной заявки на отгрузку:
  // ----------------------------------------------------------
  const handleRemoveParcelsFromShipment = async (
    url: string,
    uploadedParcelsData: Parcel[] | undefined
  ) => {
    if (uploadedParcelsData) {
      const parcelsToUnload = uploadedParcelsData?.map((parcelInfo) => {
        const parcelToUnloadData = {
          url: url,
          parcelId: parcelInfo.id,
        };

        return dispatch(unloadParcelFromShipmentRequest(parcelToUnloadData));
      });

      await Promise.all(parcelsToUnload);

      dispatch(removeParcelsFromShipment(id));
      // Done: Очистка данных о посылках в shipmentRequestsData на клиенте
    }
  };

  return currentShipmentRequestData ? (
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

        <PercentageOfCarLoad
          current_load_value={currentShipmentRequestData.current_load_value}
          max_load_value={currentShipmentRequestData.max_load_value}
        />

        <ShipmentRequestInfo
          shipment_number={currentShipmentRequestData.shipment_number}
          transport={currentShipmentRequestData.transport}
        />

        {/* ПОСЫЛКИ, ДОБАВЛЕННЫЕ В ЗАЯВКУ НА ОТГРУЗКУ: */}
        {/* ПОСЫЛКИ, ДОБАВЛЕННЫЕ В ЗАЯВКУ НА ОТГРУЗКУ: */}
        {/* ПОСЫЛКИ, ДОБАВЛЕННЫЕ В ЗАЯВКУ НА ОТГРУЗКУ: */}
        {isShipmentParcelsListOpened ? (
          <div className="flex flex-col gap-1">
            <h3>Добавленные посылки:</h3>
            <ul className="h-40 flex flex-col gap-1 overflow-y-auto">
              {uploadedParcels?.length
                ? uploadedParcels?.map((parcelInfo) => {
                    return (
                      <li
                        key={parcelInfo.parcel_number}
                        className="p-2 h-10 border-b-1 border-b-gray-200"
                      >
                        {parcelInfo.parcel_number}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        ) : (
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
              <progress
                className={`absolute w-22 h-15 top-5 left-0 border-2 border-gray-400/70 transport_load ${calcTransportLoad(
                  currentShipmentRequestData.current_load_value,
                  currentShipmentRequestData.max_load_value
                )} xl:w-43 xl:h-30 xl:top-10`}
                value={currentShipmentRequestData.current_load_value}
                max={currentShipmentRequestData.max_load_value}
              ></progress>
              <BsTruckFlatbed className="text-9xl text-gray-500/40 xl:text-[250px]" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <CustomButton
            className="p-2 text-[#7B57DF] bg-element_primary"
            onClick={() => {
              handleToggleShipmentParcelsList();
            }}
          >
            Список посылок
          </CustomButton>

          <CustomButton className="p-2 text-[#7B57DF] bg-element_primary">
            Завершить загрузку
          </CustomButton>

          <CustomButton
            className="p-2 text-[#7B57DF] bg-element_primary"
            onClick={() => {
              handleRemoveParcelsFromShipment(PARCELS_URL, uploadedParcels);
            }}
          >
            Отменить заявку
          </CustomButton>
        </div>
      </div>
    </CustomSection>
  ) : (
    <ShipmentRequestDetailsSectionSkeleton />
  );
};

export default ShipmentRequestDetailsSection;
