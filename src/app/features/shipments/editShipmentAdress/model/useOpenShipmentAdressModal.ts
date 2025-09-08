import { useDispatch, useSelector } from 'react-redux';

// State:
import {
  openShipmentAdressModal,
  selectIsShipmentAdressModalOpened,
} from '../../../../redux/slices/shipmentModalsSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';

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
