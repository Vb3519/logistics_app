import { useSelector } from 'react-redux';

// Ui:
import AddShipmentRequestForm from '../../features/shipments/addShipmentRequest/ui/AddShipmentRequestForm';
import ModalWrapper from '../ui/ModalWrapper';

// State:
import { selectIsAddShipmentModalOpened } from '../../redux/slices/shipmentModalsSlice';

const AddShipmentRequestModal = () => {
  const isAddShipmentModalOpened: boolean = useSelector(
    selectIsAddShipmentModalOpened
  );

  return (
    <ModalWrapper
      isOpened={isAddShipmentModalOpened}
      className="hidden lg:flex"
    >
      <AddShipmentRequestForm />
    </ModalWrapper>
  );
};

export default AddShipmentRequestModal;
