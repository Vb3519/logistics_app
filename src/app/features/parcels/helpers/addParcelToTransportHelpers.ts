// Types:
import { AppDispatch } from '../../../redux/store';

// State:
import { setShipmentStatusErrorMsg } from '../../../redux/slices/shipmentStatusSlice';

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
