import { useMemo } from 'react';

// Types:
import { ShipmentRequest } from '../../../../../types/shipments.interface';
import { Parcel } from '../../../../../types/parcels.interface';

const calcIsOverloadByWeight = (
  shipmentId: string | undefined,
  shipmentRequests: ShipmentRequest[],
  parcelsToUploadData: Parcel[]
) => {
  if (shipmentId === undefined) return;

  const uploadedParcelsWeight: number = parcelsToUploadData.reduce(
    (totalWeight, parcelInfo) =>
      (totalWeight += Number(parcelInfo.parcel_weight)),
    0
  );

  const currentShipmentRequest = shipmentRequests.find(
    (requestData) => requestData.id === shipmentId
  );

  if (currentShipmentRequest === undefined) return;

  const { max_load_value, current_load_value } = currentShipmentRequest;
  const remainingLoadVal: number = max_load_value - current_load_value;

  const isTransportOverloaded: boolean =
    max_load_value < uploadedParcelsWeight ||
    remainingLoadVal < uploadedParcelsWeight;

  return isTransportOverloaded;
};

export default calcIsOverloadByWeight;
