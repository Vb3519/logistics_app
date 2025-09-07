// React-icons:
import { RxCross2 } from 'react-icons/rx';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Model:
import useCloseShipmentModal from '../model/useCloseShipmentModal';

const CloseShipmentModalBtn = () => {
  const { closeShipmentsModal } = useCloseShipmentModal();

  const handleCloseShipmentsModal = () => {
    closeShipmentsModal();
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

export default CloseShipmentModalBtn;
