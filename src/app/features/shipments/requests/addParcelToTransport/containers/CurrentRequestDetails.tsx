import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// React-icons:
import { BsTruckFlatbed, BsBoxSeamFill, BsClockHistory } from 'react-icons/bs';

// Ui:
import CustomButton from '../../../../../../shared/ui/CustomButton';
import CustomSection from '../../../../../../shared/ui/CustomSection';
import PercentageOfCarLoad from '../elements/PercentageOfCarLoad';
import ShipmentRequestInfo from '../elements/ShipmentRequestInfo';
import CurrentRequestSkeleton from '../../loadRequestsData/skeletons/CurrentRequestSkeleton';

// Utils:
import { calcTransportLoad } from '../../../../../../shared/utils/calcTransportLoad';

// State:
import {
  selectShipmentRequests,
  removeParcelsFromShipment,
} from '../../../../../redux/slices/shipmentsSlice';

import {
  selectIsShipmentParselsListOpened,
  toggleShipmentParcelsList,
} from '../../../../../redux/slices/shipmentParcelsListSlice';

import { selectIsUnloadingParcel } from '../../../../../redux/slices/parcelsSlice';

// Services:
import unloadParcelFromShipmentRequest from '../../../../parcels/services/unloadParcelFromShipmentRequest';

// Types:
import { ShipmentRequest } from '../../../../../../types/shipments.interface';
import { Parcel } from '../../../../../../types/parcels.interface';
import { AppDispatch } from '../../../../../redux/store';

// Api:
import { PARCELS_URL } from '../../../../../../shared/api/logistics_appApi';

const CurrentRequestDetails = () => {
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

  const isUnloadingParcel = useSelector(selectIsUnloadingParcel);

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
    }
  };

  return currentShipmentRequestData ? (
    <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full lg:gap-8 lg:basis-2/5">
      {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
      {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
      {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
      <div className="w-full h-full flex flex-col gap-2 lg:gap-4">
        <div className="flex items-center gap-1 text-sm flex-wrap xl:gap-2">
          <div className="font-semibold leading-4 lg:text-base xl:text-lg">
            <span>{currentShipmentRequestData.from_city} - </span>
            <span>{currentShipmentRequestData.to_city}</span>
          </div>
          <div className="text-primary xl:text-base">
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
        {isShipmentParcelsListOpened && uploadedParcels ? (
          <div className="h-full pb-2 flex flex-col gap-1 border-b-2 border-b-gray-200 text-sm xl:text-base">
            <h3 className="text-secondary">Добавленные посылки</h3>
            <ul className="py-2 h-40 flex flex-col gap-2 overflow-y-auto">
              {uploadedParcels.map((parcelInfo) => {
                return (
                  <li
                    key={parcelInfo.parcel_number}
                    className="h-full px-2 py-4 flex gap-2 items-center border-b-2 border-b-gray-300 rounded-sm bg-element_primary"
                  >
                    <BsBoxSeamFill className="text-secondary text-base xl:text-xl" />
                    {parcelInfo.parcel_number}
                  </li>
                );
              })}

              {Array.from({ length: 2 - uploadedParcels.length }).map(
                (_, index) => {
                  return (
                    <li
                      key={index}
                      className="h-full px-2 py-4 flex gap-2 items-center rounded-sm bg-gray-100 text-secondary"
                    >
                      <BsClockHistory className="text-base xl:text-xl" />
                      <span>Добавьте посылку</span>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        ) : (
          <div className="h-full p-4 flex items-center justify-between gap-2 flex-wrap text-sm lg:gap-6 lg:flex-nowrap xl:text-base 2xl:gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-secondary lg:text-nowrap xl:text-base">
                Доступно, кг
              </span>

              <div>
                <span className="text-lg xs:text-xl xl:text-2xl">
                  {currentShipmentRequestData.current_load_value}
                </span>
                <span className="text-lg text-secondary xs:text-xl xl:text-2xl">
                  /{currentShipmentRequestData.max_load_value}
                </span>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <progress
                className={`absolute w-22 h-15 top-5 left-0 border-2 border-gray-400/70 transport_load ${calcTransportLoad(
                  currentShipmentRequestData.current_load_value,
                  currentShipmentRequestData.max_load_value
                )} xl:w-34.5 xl:h-21.5 xl:top-10`}
                value={currentShipmentRequestData.current_load_value}
                max={currentShipmentRequestData.max_load_value}
              ></progress>
              <BsTruckFlatbed className="text-9xl text-gray-500/40 xl:text-[200px]" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 justify-center text-sm flex-wrap xl:text-base">
            <CustomButton
              className="p-2 w-40 flex gap-2 items-center justify-center text-[#7B57DF] bg-element_primary xl:w-45"
              onClick={() => {
                handleToggleShipmentParcelsList();
              }}
            >
              <BsBoxSeamFill />
              <span className="text-nowrap">Список посылок</span>
            </CustomButton>

            <CustomButton className="p-2 w-40 text-[#7B57DF] bg-element_primary xl:w-45">
              <span className="text-nowrap">Завершить загрузку</span>
            </CustomButton>
          </div>

          <CustomButton
            disabled={isUnloadingParcel}
            className={`p-2 mx-auto w-1/2 min-w-50 border-2 border-[#e3d9ff] text-sm text-secondary transition duration-200 ease-in-out ${
              isUnloadingParcel && 'animate-pulse'
            } xl:text-base hover:text-primary hover:border-[#cbb9fd]`}
            onClick={() => {
              handleRemoveParcelsFromShipment(PARCELS_URL, uploadedParcels);
            }}
          >
            {isUnloadingParcel ? 'Выгрузка посылок' : 'Отменить заявку'}
          </CustomButton>
        </div>
      </div>
    </CustomSection>
  ) : (
    <CurrentRequestSkeleton />
  );
};

export default CurrentRequestDetails;
