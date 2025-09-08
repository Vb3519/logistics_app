import { useSelector, useDispatch } from 'react-redux';

// React-icons:
import { RxCross2 } from 'react-icons/rx';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Types:
import { AppDispatch } from '../../../../redux/store';

// State:
import {
  toggleShipmentAdressModal,
  selectIsShipmentAdressModalOpened,
} from '../../../../redux/slices/shipmentAdressModalSlice';

const CloseEditAdressFormBtn = () => {
  const dispatch: AppDispatch = useDispatch();

  const isShipmentAdressModalOpened: boolean = useSelector(
    selectIsShipmentAdressModalOpened
  );

  const handleCloseShipmentAdressModal = () => {
    if (isShipmentAdressModalOpened) {
      dispatch(toggleShipmentAdressModal());
    }
  };

  return (
    <CustomButton
      className="ml-auto"
      onClick={handleCloseShipmentAdressModal}
      title="Закрыть"
    >
      <RxCross2 className="text-2xl text-secondary cursor-pointer transition delay-200 ease-in hover:text-primary" />
    </CustomButton>
  );
};

export default CloseEditAdressFormBtn;
