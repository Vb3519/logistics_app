import { useDispatch, useSelector } from 'react-redux';

// State:
import {
  closeShipmentAdressModal,
  selectIsShipmentAdressModalOpened,
} from 'app/redux/slices/shipmentModalsSlice';

// Types:
import { AppDispatch } from 'app/redux/store';

const useCloseShipmentAdressModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const isShipmentAdressModalOpened: boolean = useSelector(
    selectIsShipmentAdressModalOpened
  );

  const hideEditShipmentAdressModal = () => {
    if (isShipmentAdressModalOpened) {
      dispatch(closeShipmentAdressModal());
    }
  };

  return { hideEditShipmentAdressModal: hideEditShipmentAdressModal };

  // return { hideEditShipmentAdressModal };
};

export default useCloseShipmentAdressModal;
