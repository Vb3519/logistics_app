import { useDispatch, useSelector } from 'react-redux';

// State:
import {
  openShipmentAdressModal,
  selectIsShipmentAdressModalOpened,
} from 'app/redux/slices/shipmentModalsSlice';

// Types:
import { AppDispatch } from 'app/redux/store';

const useOpenShipmentAdressModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const isShipmentAdressModalOpened: boolean = useSelector(
    selectIsShipmentAdressModalOpened
  );

  const showEditShipmentAdressModal = () => {
    if (!isShipmentAdressModalOpened) {
      dispatch(openShipmentAdressModal());
    }
  };

  return { showEditShipmentAdressModal: showEditShipmentAdressModal };

  // return { showEditShipmentAdressModal };
};

export default useOpenShipmentAdressModal;
