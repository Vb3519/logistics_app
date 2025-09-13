// Types:
import { Parcel, ParcelWidthShipmentData } from 'types/parcels.interface';

export const addShipmentDataToParcel = (
  parcelData: Parcel,
  shipmentId: string
): ParcelWidthShipmentData => {
  const parcelWithShipmentData: ParcelWidthShipmentData = {
    parcelData: parcelData,
    shipmentId: shipmentId,
  };

  return parcelWithShipmentData;
};
