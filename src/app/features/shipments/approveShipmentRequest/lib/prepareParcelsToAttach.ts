// Types:
import { Parcel } from 'types/parcels.interface';

// Обновление у погруженных посылок поля isAttached:
const prepareParcelsToAttach = (
  parcelsData: Parcel[],
  isAttached: boolean
): Parcel[] | undefined => {
  if (parcelsData.length === 0) {
    alert('Добавьте посылки в транспорт!');

    return;
  }

  const parcelsToAttach: Parcel[] = parcelsData.map((parcelInfo) => {
    return { ...parcelInfo, isAttached: isAttached };
  });

  return parcelsToAttach;
};

export default prepareParcelsToAttach;
