import { v4 as uuidv4 } from 'uuid';

// Types:
import { ParcelFormFields } from '../../pages/parcels/AddParcelForm';
import { Parcel } from '../../app/redux/slices/parcelsSlice';

export const createParcel = (parcelFormData: ParcelFormFields): Parcel => {
  const parcelId: string = uuidv4();
  const parcelNumber: string = 'CN-' + parcelId.slice(0, 7);

  const newParcel: Parcel = {
    id: parcelId,
    parcel_number: parcelNumber,
    isSelected: false,
    ...parcelFormData,
  };

  return newParcel;
};
