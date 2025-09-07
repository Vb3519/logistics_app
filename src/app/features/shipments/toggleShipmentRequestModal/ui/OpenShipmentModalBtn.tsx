// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Model:
import useOpenShipmentModal from '../model/useOpenShipmentModal';

const OpenShipmentModalBtn = () => {
  const { openShipmentRequestsModal } = useOpenShipmentModal();

  const handleOpenShipmentsModal = () => {
    openShipmentRequestsModal();
  };

  return (
    <CustomButton
      className="py-2 px-4 bg-[#7B57DF] text-[whitesmoke] text-sm xl:text-base"
      onClick={handleOpenShipmentsModal}
    >
      + Добавить Заявку
    </CustomButton>
  );
};

export default OpenShipmentModalBtn;
