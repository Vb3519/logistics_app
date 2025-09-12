import { useSelector, useDispatch } from 'react-redux';

// State:
import {
  selectIsAddShipmentModalOpened,
  closeAddShipmentModal,
} from 'app/redux/slices/shipmentModalsSlice';

// Types:
import { AppDispatch } from 'app/redux/store';

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
