import { v4 as uuidv4 } from 'uuid';

// Types:
import { ParcelFormFields, Parcel } from '../../types/parcels.interface';

export const createParcel = (parcelFormData: ParcelFormFields): Parcel => {
  const parcelId: string = uuidv4();
  const parcelNumber: string = 'CN-' + parcelId.slice(0, 7);

  const newParcel: Parcel = {
    id: parcelId,
    parcel_number: parcelNumber,
    isUploaded: false,
    isAttached: false,
    shipment_id: '',
    ...parcelFormData,
  };

  return newParcel;
};
