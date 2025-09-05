import { useDispatch } from 'react-redux';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Model:
import unloadParcelsFromShipment from '../model/unloadParcelsFromShipment';

// Types:
import { Parcel } from '../../../../../types/parcels.interface';
import { AppDispatch } from '../../../../redux/store';

interface RemoveParcelsFromTransportBtn_Props {
  uploadedParcels: Parcel[] | undefined;
  shipmentId: string | undefined;
  isUnloadingParcel: boolean;
  isAttachingParcel: boolean;
  isShipmentApproveSending: boolean;
}

const RemoveParcelsFromTransportBtn: React.FC<
  RemoveParcelsFromTransportBtn_Props
> = ({
  uploadedParcels,
  shipmentId,
  isUnloadingParcel,
  isAttachingParcel,
  isShipmentApproveSending,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const isBtnDisabled: boolean =
    isUnloadingParcel ||
    uploadedParcels?.length === 0 ||
    isShipmentApproveSending ||
    isAttachingParcel;

  // Убрать посылки из непроведенной заявки на отгрузку:
  const handleRemoveParcelsFromShipment = () => {
    if (uploadedParcels === undefined || shipmentId === undefined) return;

    unloadParcelsFromShipment(shipmentId, uploadedParcels, dispatch);
  };

  return (
    <CustomButton
      disabled={isBtnDisabled}
      className={`p-2 mx-auto w-1/2 min-w-50 border-2 border-[#e3d9ff] text-sm text-secondary transition duration-200 ease-in-out ${
        isUnloadingParcel && 'animate-pulse'
      } xl:text-base hover:text-primary hover:border-[#cbb9fd]`}
      onClick={handleRemoveParcelsFromShipment}
    >
      {isUnloadingParcel ? 'Выгрузка посылок' : 'Отменить заявку'}
    </CustomButton>
  );
};

export default RemoveParcelsFromTransportBtn;
