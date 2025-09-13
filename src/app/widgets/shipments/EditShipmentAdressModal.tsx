import { useSelector } from 'react-redux';

// Ui:
import EditShipmentAdressForm from 'app/features/shipments/editShipmentAdress/ui/EditShipmentAdressForm';
import ModalWrapper from '../ui/ModalWrapper';

import { selectIsShipmentAdressModalOpened } from 'app/redux/slices/shipmentModalsSlice';

const EditShipmentAdressModal = () => {
  const isShipmentAdressModalOpened = useSelector(
    selectIsShipmentAdressModalOpened
  );

  return (
    <ModalWrapper isOpened={isShipmentAdressModalOpened} className="flex">
      <EditShipmentAdressForm />
    </ModalWrapper>
  );
};

export default EditShipmentAdressModal;
