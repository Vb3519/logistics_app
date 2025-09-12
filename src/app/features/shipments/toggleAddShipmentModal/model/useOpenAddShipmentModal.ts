import { useSelector, useDispatch } from 'react-redux';

// State:
import {
  selectIsAddShipmentModalOpened,
  openAddShipmentModal,
} from 'app/redux/slices/shipmentModalsSlice';

// Types:
import { AppDispatch } from 'app/redux/store';

const useOpenAddShipmentModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const isAddShipmentModalOpened: boolean = useSelector(
    selectIsAddShipmentModalOpened
  );

  const showAddShipmentModal = () => {
    if (!isAddShipmentModalOpened) {
      dispatch(openAddShipmentModal());
    }
  };

  return { showAddShipmentModal: showAddShipmentModal };

  // return { showAddShipmentModal };
};

export default useOpenAddShipmentModal;
