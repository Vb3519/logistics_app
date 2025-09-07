import { useDispatch, useSelector } from 'react-redux';

// State:
import {
  selectIsShipmentsModalOpened,
  openShipmentRequestModal,
} from '../../../../redux/slices/shipmentRequestModalSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';

const useOpenShipmentModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const isShipmentsModalOpened: boolean = useSelector(
    selectIsShipmentsModalOpened
  );

  const openShipmentRequestsModal = () => {
    if (!isShipmentsModalOpened) {
      dispatch(openShipmentRequestModal());
    }
  };

  return { openShipmentRequestsModal: openShipmentRequestsModal };
  // return { openShipmentRequestsModal };
};

export default useOpenShipmentModal;
