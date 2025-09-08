// React-icons:
import { RxCross2 } from 'react-icons/rx';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Model:
import useCloseShipmentAdressModal from '../model/useCloseShipmentAdressModal';

const CloseShipmentAdressModalBtn = () => {
  const { hideEditShipmentAdressModal } = useCloseShipmentAdressModal();

  const handleCloseShipmentAdressModal = () => {
    hideEditShipmentAdressModal();
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

export default CloseShipmentAdressModalBtn;
