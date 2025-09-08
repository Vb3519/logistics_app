// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Model:
import useOpenAddShipmentModal from '../model/useOpenAddShipmentModal';

const OpenAddShipmentModalBtn = () => {
  const { showAddShipmentModal } = useOpenAddShipmentModal();

  const handleOpenShipmentsModal = () => {
    showAddShipmentModal();
  };

  return (
    <CustomButton
      className="py-2 px-4 bg-[#7B57DF] text-[whitesmoke] text-sm xl:text-base"
      onClick={handleOpenShipmentsModal}
      title="Новая заявка"
    >
      + Добавить Заявку
    </CustomButton>
  );
};

export default OpenAddShipmentModalBtn;
