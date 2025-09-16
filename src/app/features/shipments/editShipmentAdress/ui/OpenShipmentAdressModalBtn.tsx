// React-icons:
import { LuPencilLine } from 'react-icons/lu';

// Ui:
import CustomButton from 'shared/ui/CustomButton';

// Model:
import useOpenShipmentAdressModal from '../model/useOpenShipmentAdressModal';

// Types:
import { OpenShipmentAdressModalBtn_Props } from './types';

const OpenShipmentAdressModalBtn: React.FC<
  OpenShipmentAdressModalBtn_Props
> = ({ from_city, to_city }) => {
  const { showEditShipmentAdressModal } = useOpenShipmentAdressModal();

  const handleOpenShipmentAdressModal = () => {
    showEditShipmentAdressModal();
  };

  return (
    <CustomButton
      title="Редактировать адрес"
      onClick={handleOpenShipmentAdressModal}
    >
      <div className="group flex items-center gap-2">
        <LuPencilLine className="text-xl text-primary cursor-pointer transition delay-200 ease-in group-hover:text-[#7B57DF] lg:text-2xl" />

        <div className="font-semibold lg:text-base xl:text-lg">
          <span className="leading-5">{from_city} - </span>
          <span>{to_city}</span>
        </div>
      </div>
    </CustomButton>
  );
};

export default OpenShipmentAdressModalBtn;
