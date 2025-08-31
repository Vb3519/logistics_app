import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';

// Ui:
import CustomButton from '../../../../../../shared/ui/CustomButton';

// State:
import {
  selectIsUnloadingParcel,
  selectIsAttachingParcel,
  updateParcelsByShipmentId,
} from '../../../../../redux/slices/parcelsSlice';
import { toggleShipmentParcelsList } from '../../../../../redux/slices/shipmentParcelsListSlice';

import {
  removeParcelsFromShipment,
  updateShipmentRequestsByStatus,
  selectIsShipmentApproveSending,
} from '../../../../../redux/slices/shipmentsSlice';

import {
  selectShipmentStatus,
  selectShipmentStatusError,
  setShipmentStatus,
} from '../../../../../redux/slices/shipmentStatusSlice';

// Services:
import unloadParcelFromShipmentRequest from '../../../../parcels/services/unloadParcelFromShipmentRequest';
import approveShipmentRequest from '../../../services/approveShipmentRequest';

// Types:
import { Parcel } from '../../../../../../types/parcels.interface';
import { AppDispatch } from '../../../../../redux/store';

// Api:
import { PARCELS_URL } from '../../../../../../shared/api/logistics_appApi';
import { SHIPMENTS_URL } from '../../../../../../shared/api/logistics_appApi';

// Helpers:
import {
  setShipmentStatusErr,
  attachParcelsToShipment,
  updateParcelAttach,
} from '../helpers/addParcelToTransportHelpers';

// Кнопки действий для работы с заявкой на отгрузку:
// ---------------------------------------------------------------------------
interface CurrentRequestActions_Props {
  uploadedParcels: Parcel[] | undefined;
  currentWeightVal: number;
}
const CurrentRequestActions: React.FC<CurrentRequestActions_Props> = memo(
  ({ uploadedParcels, currentWeightVal }) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const isUnloadingParcel = useSelector(selectIsUnloadingParcel);
    const isAttachingParcel = useSelector(selectIsAttachingParcel);
    const isShipmentApproveSending = useSelector(
      selectIsShipmentApproveSending
    );

    const shipmentStatus = useSelector(selectShipmentStatus);

    const shipmentStatusError: string = useSelector(selectShipmentStatusError);

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
        const parcelsToUnload = uploadedParcelsData.map((parcelInfo) => {
          const parcelToUnloadData = {
            url: url,
            parcelId: parcelInfo.id,
          };

          return dispatch(unloadParcelFromShipmentRequest(parcelToUnloadData));
        });

        await Promise.all(parcelsToUnload);

        dispatch(removeParcelsFromShipment(id));
        dispatch(setShipmentStatus(''));
      }
    };

    // Закончить погрузку (провести) заявку на отгрузку:
    // ----------------------------------------------------------
    const handleApproveShipment = async () => {
      if (shipmentStatus === '') {
        // Установить ошибку статуса заявки:
        setShipmentStatusErr(shipmentStatusError, dispatch);

        return;
      } else {
        if (uploadedParcels === undefined || id === undefined) return;

        // "Привязка" посылок к заявке на отгрузку (эндпоинт /shipments):
        const parcelsToAttachToShipment: Parcel[] | undefined =
          attachParcelsToShipment(uploadedParcels);

        if (parcelsToAttachToShipment === undefined) return;

        // Подтверждение проведения заявки на отгрузку (сервер и клиент):
        await dispatch(
          approveShipmentRequest({
            id: id,
            url: SHIPMENTS_URL,
            shipment_parcels: parcelsToAttachToShipment,
            current_load_value: currentWeightVal,
            shipment_status: shipmentStatus,
            is_shipment_status_set: true,
          })
        );

        // Изменение у "привязанных" к отгрузке посылок поля isAttached (эндпоинт /parcels):
        const parcelsToAttach = updateParcelAttach(
          uploadedParcels,
          PARCELS_URL,
          id,
          true,
          dispatch
        );

        await Promise.all(parcelsToAttach);

        // Переход в журнал отгрузок:
        navigate(`/shipments/all`);

        console.log('Отгрузка проведена!');

        // Клиент: (обновление на клиенте данных по отгрузкам и посылкам)
        dispatch(updateShipmentRequestsByStatus(''));
        dispatch(updateParcelsByShipmentId(''));
        dispatch(setShipmentStatus(''));
      }
    };

    return (
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

          <CustomButton
            disabled={
              isShipmentApproveSending || isAttachingParcel || isUnloadingParcel
            }
            className={`p-2 w-40 ${
              shipmentStatus && uploadedParcels?.length !== 0
                ? 'text-[#7B57DF]'
                : 'text-secondary'
            } ${
              (isShipmentApproveSending || isAttachingParcel) && 'animate-pulse'
            } bg-element_primary xl:w-45`}
            onClick={handleApproveShipment}
          >
            <span className="text-nowrap">
              {isShipmentApproveSending || isAttachingParcel
                ? 'Проводим заявку'
                : 'Завершить загрузку'}
            </span>
          </CustomButton>
        </div>

        <CustomButton
          disabled={
            isUnloadingParcel ||
            uploadedParcels?.length === 0 ||
            isShipmentApproveSending ||
            isAttachingParcel
          }
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
    );
  }
);

export default CurrentRequestActions;
