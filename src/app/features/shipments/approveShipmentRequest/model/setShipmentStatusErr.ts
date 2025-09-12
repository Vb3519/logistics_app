// Types:
import { AppDispatch } from 'app/redux/store';

// State:
import { setShipmentStatusErrorMsg } from 'app/redux/slices/shipmentStatusSlice';

// Установить ошибку статуса заявки:
const setShipmentStatusErr = (statusErr: string, dispatch: AppDispatch) => {
  if (!statusErr) {
    dispatch(setShipmentStatusErrorMsg('Необходимо указать статус отгрузки'));
  }
};

export default setShipmentStatusErr;
