import { useDispatch, useSelector } from 'react-redux';

// State:
import {
  closeShipmentAdressModal,
  selectIsShipmentAdressModalOpened,
} from '../../../../redux/slices/shipmentModalsSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';

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
