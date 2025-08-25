import { TableRowProps } from '@mui/material/TableRow';

// Form:
// ------------------------------------------------------------------
export interface ParcelFormFields {
  parcel_weight: string;
  parcel_status:
    | 'Изменен адрес отправки'
    | 'Проблема с упаковкой'
    | 'Вышел из строя транспорт';
}

// Data:
// ------------------------------------------------------------------
export interface Parcel {
  id: string;
  parcel_number: string;
  parcel_weight: string;
  parcel_status:
    | 'Изменен адрес отправки'
    | 'Проблема с упаковкой'
    | 'Вышел из строя транспорт';
  shipment_id: string;
  isUploaded: boolean;
  isAttached: boolean;
}

export interface ParcelWidthShipmentData {
  parcelData: Parcel;
  shipmentId: string;
}

// State:
// ------------------------------------------------------------------
export interface ParcelsState {
  parcelsData: Parcel[];
  isParcelsDataLoading: boolean;
  parcelsDataError: string;

  isParcelsFormDataSending: boolean;
  parcelsFormError: string;

  isUploadingParcel: boolean;
  parcelUploadError: string;

  isUnloadingParcel: boolean;
  parcelUnloadError: string;

  isAttachingParcel: boolean;
  parcelAttachError: string;
}

export interface ParcelsStateSlice {
  parcels: ParcelsState;
}

export interface ParcelsToUploadState {
  parcelsToUploadData: Parcel[];
  parcelsWeightOverloadError: string;
}

export interface ParcelsToUploadSlice {
  parcelsToUpload: ParcelsToUploadState;
}

// Table:
// ------------------------------------------------------------------
export interface ShipmentParcelsTableRow_Props extends TableRowProps {
  parcelData: Parcel;
  isParcelSelectedToUpload: boolean;
}

// Components:
// ------------------------------------------------------------------
export interface ParcelsPageTableSkeleton_Props {
  isParcelsDataLoading: boolean;
}

export interface ShipmentParcelsTableSkeleton_Props {
  isParcelsDataLoading: boolean;
}
