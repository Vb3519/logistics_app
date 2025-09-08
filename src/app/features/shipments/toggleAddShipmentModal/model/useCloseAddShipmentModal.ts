import { useSelector, useDispatch } from 'react-redux';

// State:
import {
  selectIsAddShipmentModalOpened,
  closeAddShipmentModal,
} from '../../../../redux/slices/shipmentModalsSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';

const useCloseAddShipmentModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const isAddShipmentModalOpened: boolean = useSelector(
    selectIsAddShipmentModalOpened
  );

  const hideAddShipmentModal = () => {
    if (isAddShipmentModalOpened) {
      dispatch(closeAddShipmentModal());
    }
  };

  return { hideAddShipmentModal: hideAddShipmentModal };

  // return { hideAddShipmentModal };
};

export default useCloseAddShipmentModal;
