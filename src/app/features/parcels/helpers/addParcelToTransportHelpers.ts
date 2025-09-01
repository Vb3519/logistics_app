// Types:
import { AppDispatch } from '../../../redux/store';
import { Parcel } from '../../../../types/parcels.interface';

// State:
import { setShipmentStatusErrorMsg } from '../../../redux/slices/shipmentStatusSlice';

// Services:
import attachParcelToShipment from '../../../services/parcels/attachParcelToShipment';

// Установить ошибку статуса заявки:
// -----------------------------------
export const setShipmentStatusErr = (
  statusErr: string,
  dispatch: AppDispatch
) => {
  if (!statusErr) {
    dispatch(setShipmentStatusErrorMsg('Необходимо указать статус отгрузки'));
  }
};

// "Привязка" посылок к заявке на отгрузку (эндпоинт /shipments):
// ------------------------------------------------------------------
export const attachParcelsToShipment = (
  parcelsData: Parcel[]
): Parcel[] | undefined => {
  if (parcelsData.length === 0) {
    alert('Добавьте посылки в транспорт!');

    return;
  }

  const parcelsToAttach: Parcel[] = parcelsData.map((parcelInfo) => {
    return { ...parcelInfo, isAttached: true };
  });

  return parcelsToAttach;
};

// Изменение у "привязанных" к отгрузке посылок поля isAttached (эндпоинт /parcels):
export const updateParcelAttach = (
  parcelsData: Parcel[],
  url: string,
  shipmentId: string,
  isAttached: boolean,
  dispatch: AppDispatch
) => {
  const parcelsToAttach = parcelsData.map((parcelInfo) => {
    const parcelToAttachData = {
      url: url,
      parcelId: parcelInfo.id,
      shipmentId: shipmentId,
      isAttached: isAttached,
    };

    return dispatch(attachParcelToShipment(parcelToAttachData));
  });

  return parcelsToAttach;
};
