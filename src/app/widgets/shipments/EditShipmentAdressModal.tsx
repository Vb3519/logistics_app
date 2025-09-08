import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

// Ui:
import EditShipmentAdressForm from '../../features/shipments/editShipmentAdress/ui/EditShipmentAdressForm';

import { selectIsShipmentAdressModalOpened } from '../../redux/slices/shipmentAdressModalSlice';

const modalRoot: HTMLElement | null = document.getElementById('modal-root');

const EditShipmentAdressModal = () => {
  const isShipmentAdressModalOpened = useSelector(
    selectIsShipmentAdressModalOpened
  );

  return (
    modalRoot &&
    createPortal(
      isShipmentAdressModalOpened ? (
        <div className="h-screen w-full fixed flex items-center justify-center z-60 bg-[#000000a8]">
          <EditShipmentAdressForm />
        </div>
      ) : null,
      modalRoot
    )
  );
};

export default EditShipmentAdressModal;
