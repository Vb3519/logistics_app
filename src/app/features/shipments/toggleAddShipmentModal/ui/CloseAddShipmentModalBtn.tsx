// React-icons:
import { RxCross2 } from 'react-icons/rx';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Model:
import useCloseAddShipmentModal from '../model/useCloseAddShipmentModal';

const CloseAddShipmentModalBtn = () => {
  const { hideAddShipmentModal } = useCloseAddShipmentModal();

  const handleCloseShipmentsModal = () => {
    hideAddShipmentModal();
  };

  return (
    <CustomButton
      className="hidden ml-auto lg:block"
      onClick={handleCloseShipmentsModal}
      title="Закрыть"
    >
      <RxCross2 className="text-2xl text-secondary cursor-pointer transition delay-200 ease-in hover:text-primary" />
    </CustomButton>
  );
};

export default CloseAddShipmentModalBtn;
