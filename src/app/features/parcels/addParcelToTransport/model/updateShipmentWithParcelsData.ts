// Types:
import { AppDispatch } from '../../../../redux/store';
import { ShipmentRequest } from '../../../../../types/shipments.interface';
import { Parcel } from '../../../../../types/parcels.interface';

// State:
import { addParcelsToShipment } from '../../../../redux/slices/shipmentsSlice';

const updateShipmentWithParcelsData = (
  shipmentId: string | undefined,
  shipmentRequests: ShipmentRequest[],
  parcelsToUploadData: Parcel[],
  dispatch: AppDispatch
) => {
  const currentShipment: ShipmentRequest | undefined = shipmentRequests.find(
    (requestData) => requestData.id === shipmentId
  );

  const uploadedParcelsWeight: number = parcelsToUploadData.reduce(
    (totalWeight, parcelInfo) =>
      (totalWeight += Number(parcelInfo.parcel_weight)),
    0
  );

  if (currentShipment && shipmentId) {
    const updatedShipmentWithParcelsData = {
      currentShipmentId: shipmentId,
      parcelsToUploadData: parcelsToUploadData,
      parcelsTotalWeight: uploadedParcelsWeight,
    };

    dispatch(addParcelsToShipment(updatedShipmentWithParcelsData));
  }
};

export default updateShipmentWithParcelsData;
