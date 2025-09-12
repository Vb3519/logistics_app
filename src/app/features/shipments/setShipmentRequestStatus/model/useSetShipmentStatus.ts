import { useDispatch, useSelector } from 'react-redux';

// Types:
import { AppDispatch } from 'app/redux/store';

// State:
import {
  setShipmentStatusErrorMsg,
  setShipmentStatus,
  selectShipmentStatusError,
} from 'app/redux/slices/shipmentStatusSlice';

const useSetShipmentStatus = () => {
  const dispatch: AppDispatch = useDispatch();
  const shipmentStatusError: string = useSelector(selectShipmentStatusError);

  const setShipmentStatusWrapper = (
    shipmentStatusError: string,
    statusVal: string
  ) => {
    if (shipmentStatusError) {
      dispatch(setShipmentStatusErrorMsg(''));
    }

    if (
      statusVal === 'В пути' ||
      statusVal === 'Завершена' ||
      statusVal === 'Опаздывает'
    ) {
      dispatch(setShipmentStatus(statusVal));
    }
  };

  return {
    dispatch: dispatch,
    setShipmentStatusWrapper: setShipmentStatusWrapper,
    shipmentStatusError: shipmentStatusError,
  };

  // return { dispatch, setShipmentStatusWrapper, shipmentStatusError };
};

export default useSetShipmentStatus;
