import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

// Ui:
import AddShipmentRequestForm from '../../features/shipments/addShipmentRequest/ui/AddShipmentRequestForm';

// State:
import { selectIsShipmentsModalOpened } from '../../redux/slices/shipmentRequestModalSlice';

const modalRoot: HTMLElement | null = document.getElementById('modal-root');

const AddShipmentRequestModal = () => {
  const isShipmentsModalOpened: boolean = useSelector(
    selectIsShipmentsModalOpened
  );

  return (
    modalRoot &&
    createPortal(
      isShipmentsModalOpened ? (
        <div className="hidden h-screen w-full fixed items-center justify-center z-60 bg-[#000000a8] lg:flex">
          <AddShipmentRequestForm />
        </div>
      ) : null,
      modalRoot
    )
  );
};

export default AddShipmentRequestModal;
