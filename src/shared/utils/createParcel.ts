import { v4 as uuidv4 } from 'uuid';

// Types:
import { ParcelFormFields } from '../../pages/parcels/AddParcelForm';

interface Parcel {
  id: string;
  parcel_number: string;
  parcel_weight: string;
  parcel_status:
    | 'Изменен адрес отправки'
    | 'Проблема с упаковкой'
    | 'Вышел из строя транспорт';
  isSelected?: boolean;
}

export const createParcel = (parcelFormData: ParcelFormFields): Parcel => {
  const parcelId: string = uuidv4();
  const parcelNumber: string = parcelId.slice(0, 7);

  const newParcel: Parcel = {
    id: parcelId,
    parcel_number: parcelNumber,
    isSelected: false,
    ...parcelFormData,
  };

  return newParcel;
};
