import { useSelector } from 'react-redux';

// Ui:
import AddShipmentRequestForm from '../../features/shipments/addShipmentRequest/ui/AddShipmentRequestForm';

// State:
import { selectIsShipmentsModalOpened } from '../../redux/slices/shipmentRequestModalSlice';

const AddShipmentRequestModal = () => {
  const isShipmentsModalOpened: boolean = useSelector(
    selectIsShipmentsModalOpened
  );

  return isShipmentsModalOpened ? (
    <div className="hidden h-screen w-full fixed items-center justify-center z-50 bg-[#000000a8] lg:flex">
      <AddShipmentRequestForm />
    </div>
  ) : null;
};

export default AddShipmentRequestModal;
