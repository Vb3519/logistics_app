import { useSelector } from 'react-redux';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

// Ui:
import RemoveParcelsFromTransportBtn from 'app/features/parcels/removeParcelsFromTransport/ui/RemoveParcelsFromTransportBtn';
import ToggleShipmentParcelsListBtn from 'app/features/parcels/toggleShipmentParcelsList/ToggleShipmentParcelsListBtn';
import ApproveShipmentRequestBtn from 'app/features/shipments/approveShipmentRequest/ui/ApproveShipmentRequestBtn';

// State:
import {
  selectIsUnloadingParcel,
  selectIsAttachingParcel,
} from 'app/redux/slices/parcelsSlice';

import { selectIsShipmentApproveSending } from 'app/redux/slices/shipmentsSlice';

import { selectDailyShipmentsApproved } from 'app/redux/slices/dailyPlanSlice';

// Types:
import { Parcel } from 'types/parcels.interface';

// Кнопки действий для работы с заявкой на отгрузку:
// ---------------------------------------------------------------------------
interface CurrentRequestActions_Props {
  uploadedParcels: Parcel[] | undefined;
  currentWeightVal: number;
}

const CurrentRequestActions: React.FC<CurrentRequestActions_Props> = memo(
  ({ uploadedParcels, currentWeightVal }) => {
    const { id } = useParams();

    const isUnloadingParcel = useSelector(selectIsUnloadingParcel);
    const isAttachingParcel = useSelector(selectIsAttachingParcel);
    const isShipmentApproveSending = useSelector(
      selectIsShipmentApproveSending
    );

    const dailyShipmentsApproved = useSelector(selectDailyShipmentsApproved);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 justify-center text-sm flex-wrap xl:text-base">
          <ToggleShipmentParcelsListBtn />

          <ApproveShipmentRequestBtn
            isUnloadingParcel={isUnloadingParcel}
            isAttachingParcel={isAttachingParcel}
            isShipmentApproveSending={isShipmentApproveSending}
            shipmentId={id}
            uploadedParcels={uploadedParcels}
            currentWeightVal={currentWeightVal}
            dailyShipmentsApproved={dailyShipmentsApproved}
          />
        </div>

        <RemoveParcelsFromTransportBtn
          uploadedParcels={uploadedParcels}
          shipmentId={id}
          isUnloadingParcel={isUnloadingParcel}
          isAttachingParcel={isAttachingParcel}
          isShipmentApproveSending={isShipmentApproveSending}
        />
      </div>
    );
  }
);

export default CurrentRequestActions;
