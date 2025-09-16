import { Parcel } from 'types/parcels.interface';

export interface ApproveShipmentRequestBtn_Props {
  isUnloadingParcel: boolean;
  isAttachingParcel: boolean;
  isShipmentApproveSending: boolean;
  shipmentId: string | undefined;
  uploadedParcels: Parcel[] | undefined;
  currentWeightVal: number;
  dailyShipmentsApproved: number;
}
