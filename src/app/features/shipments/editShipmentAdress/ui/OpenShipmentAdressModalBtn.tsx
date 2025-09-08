// React-icons:
import { LuPencilLine } from 'react-icons/lu';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Model:
import useOpenShipmentAdressModal from '../model/useOpenShipmentAdressModal';

const OpenShipmentAdressModalBtn = () => {
  const { showEditShipmentAdressModal } = useOpenShipmentAdressModal();

  const handleOpenShipmentAdressModal = () => {
    showEditShipmentAdressModal();
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

export default OpenShipmentAdressModalBtn;
