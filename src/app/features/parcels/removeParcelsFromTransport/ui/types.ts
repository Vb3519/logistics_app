import { Parcel } from 'types/parcels.interface';

export interface RemoveParcelsFromTransportBtn_Props {
  uploadedParcels: Parcel[] | undefined;
  shipmentId: string | undefined;
  isUnloadingParcel: boolean;
  isAttachingParcel: boolean;
  isShipmentApproveSending: boolean;
}
