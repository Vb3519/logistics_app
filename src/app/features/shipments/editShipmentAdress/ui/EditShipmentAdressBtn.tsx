import { useSelector, useDispatch } from 'react-redux';

// React-icons:
import { LuPencilLine } from 'react-icons/lu';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Types:
import { AppDispatch } from '../../../../redux/store';

// State:
import {
  toggleShipmentAdressModal,
  selectIsShipmentAdressModalOpened,
} from '../../../../redux/slices/shipmentAdressModalSlice';

const EditShipmentAdressBtn = () => {
  const dispatch: AppDispatch = useDispatch();

  const isShipmentAdressModalOpened: boolean = useSelector(
    selectIsShipmentAdressModalOpened
  );

  const handleOpenShipmentAdressModal = () => {
    if (!isShipmentAdressModalOpened) {
      dispatch(toggleShipmentAdressModal());
    }
  };

  return (
    <CustomButton
      title="Редактировать адрес"
      onClick={handleOpenShipmentAdressModal}
    >
      <LuPencilLine className="text-xl text-primary cursor-pointer transition delay-200 ease-in hover:text-[#7B57DF] lg:text-2xl" />
    </CustomButton>
  );
};

export default EditShipmentAdressBtn;
