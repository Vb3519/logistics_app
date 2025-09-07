import { useSelector, useDispatch } from 'react-redux';

// State:
import {
  selectIsShipmentsModalOpened,
  closeShipmentRequestModal,
} from '../../../../redux/slices/shipmentRequestModalSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';

const useCloseShipmentModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const isShipmentsModalOpened: boolean = useSelector(
    selectIsShipmentsModalOpened
  );

  const closeShipmentsModal = () => {
    if (isShipmentsModalOpened) {
      dispatch(closeShipmentRequestModal());
    }
  };

  return { closeShipmentsModal: closeShipmentsModal };

  // return { closeShipmentsModal };
};

export default useCloseShipmentModal;
