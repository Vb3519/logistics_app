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
}

export interface ParcelAndShipmentInfo {
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
export interface ParcelsTableRow_Props extends TableRowProps {
  isCheckBoxNeeded: boolean;
  parcelData: Parcel;
  isParcelSelectedToUpload: boolean;
}

export interface ParcelsTable_Props {
  isCheckBoxNeeded: boolean;
}

// Components:
// ------------------------------------------------------------------
