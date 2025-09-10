import { useSelector } from 'react-redux';

// Types:
import { AppDispatch } from '../../../../redux/store';
import { Parcel } from '../../../../../types/parcels.interface';
import { ShipmentStatus } from '../../../../../types/shipments.interface';
import { NavigateFunction } from 'react-router-dom';

// Services:
import approveShipmentRequest from '../../../../services/shipments/approveShipmentRequest';

// Model:
import updateParcelAttach from './updateParcelAttach';
import setShipmentStatusErr from './setShipmentStatusErr';
import stateUpdateAfterApprove from './stateUpdateAfterApprove';

// Api:
import { SHIPMENTS_URL } from '../../../../../shared/api/logistics_appApi';
import { PARCELS_URL } from '../../../../../shared/api/logistics_appApi';

// Lib:
import prepareParcelsToAttach from '../lib/prepareParcelsToAttach';

// State:
import { incrementShipmentsApproved } from '../../../../redux/slices/dailyPlanSlice';

// Constants:
import { DAILY_PLAN_LIMITS } from '../../../../../shared/constants/logisticAppContants';

const approveShipment = async (
  shipmentId: string | undefined,
  uploadedParcels: Parcel[] | undefined,
  currentWeightVal: number,
  shipmentStatus: ShipmentStatus,
  shipmentStatusError: string,
  dailyShipmentsApproved: number,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  if (shipmentStatus === '') {
    // Установить ошибку статуса заявки:
    setShipmentStatusErr(shipmentStatusError, dispatch);

    return;
  } else {
    if (uploadedParcels === undefined || shipmentId === undefined) return;

    // "Привязка" посылок к заявке на отгрузку (эндпоинт /shipments):
    const parcelsToAttachToShipment: Parcel[] | undefined =
      prepareParcelsToAttach(uploadedParcels, true);

    if (parcelsToAttachToShipment === undefined) return;

    // Подтверждение проведения заявки на отгрузку (сервер и клиент):
    await dispatch(
      approveShipmentRequest({
        id: shipmentId,
        url: SHIPMENTS_URL,
        shipment_parcels: parcelsToAttachToShipment,
        current_load_value: currentWeightVal,
        shipment_status: shipmentStatus,
        is_shipment_status_set: true,
      })
    );

    // Изменение у "привязанных" к отгрузке посылок поля isAttached (эндпоинт /parcels):
    await updateParcelAttach(
      uploadedParcels,
      PARCELS_URL,
      shipmentId,
      true,
      dispatch
    );

    // Дневной план (выполнение проведения заявки на отгрузку):
    if (dailyShipmentsApproved < DAILY_PLAN_LIMITS.shipmentsApprovedLimit) {
      dispatch(incrementShipmentsApproved());
    }

    // Переход в журнал отгрузок:
    navigate(`/shipments/all`);

    console.log('Отгрузка проведена!');

    // Клиент: (обновление на клиенте данных по отгрузкам и посылкам)
    stateUpdateAfterApprove(dispatch);
  }
};

export default approveShipment;
