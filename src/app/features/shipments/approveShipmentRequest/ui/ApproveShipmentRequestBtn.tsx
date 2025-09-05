import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';

// Types:
import { AppDispatch } from '../../../../redux/store';
import { Parcel } from '../../../../../types/parcels.interface';
import { ShipmentStatus } from '../../../../../types/shipments.interface';

// Model:
import approveShipment from '../model/approveShipment';

// State:
import {
  selectShipmentStatus,
  selectShipmentStatusError,
} from '../../../../redux/slices/shipmentStatusSlice';

interface ApproveShipmentRequestBtn_Props {
  isUnloadingParcel: boolean;
  isAttachingParcel: boolean;
  isShipmentApproveSending: boolean;
  shipmentId: string | undefined;
  uploadedParcels: Parcel[] | undefined;
  currentWeightVal: number;
}

const ApproveShipmentRequestBtn: React.FC<ApproveShipmentRequestBtn_Props> = (
  props
) => {
  const {
    isUnloadingParcel,
    isAttachingParcel,
    isShipmentApproveSending,
    shipmentId,
    uploadedParcels,
    currentWeightVal,
  } = props;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const shipmentStatus: ShipmentStatus = useSelector(selectShipmentStatus);
  const shipmentStatusError: string = useSelector(selectShipmentStatusError);

  // Подтвердить (завершить) заявку на отгрузку:
  const handleApproveShipment = async () => {
    approveShipment(
      shipmentId,
      uploadedParcels,
      currentWeightVal,
      shipmentStatus,
      shipmentStatusError,
      dispatch,
      navigate
    );
  };

  const isShipmentRequestBtnDisabled: boolean =
    isShipmentApproveSending || isAttachingParcel || isUnloadingParcel;

  return (
    <CustomButton
      disabled={isShipmentRequestBtnDisabled}
      className={`p-2 w-40 ${
        shipmentStatus && uploadedParcels?.length !== 0
          ? 'text-[#7B57DF]'
          : 'text-secondary'
      } ${
        (isShipmentApproveSending || isAttachingParcel) && 'animate-pulse'
      } bg-element_primary xl:w-45`}
      onClick={handleApproveShipment}
    >
      <span className="text-nowrap">
        {isShipmentApproveSending || isAttachingParcel
          ? 'Проводим заявку'
          : 'Завершить загрузку'}
      </span>
    </CustomButton>
  );
};

export default ApproveShipmentRequestBtn;
