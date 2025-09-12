// Types:
import { AppDispatch } from 'app/redux/store';
import { Parcel } from 'types/parcels.interface';

// Services:
import attachParcelToShipment from 'app/services/parcels/attachParcelToShipment';

// Изменение у "привязанных" к отгрузке посылок поля isAttached (эндпоинт /parcels):
const updateParcelAttach = async (
  parcelsData: Parcel[],
  url: string,
  shipmentId: string,
  isAttached: boolean,
  dispatch: AppDispatch
) => {
  const parcelsToAttach = parcelsData.map((parcelInfo) => {
    const parcelToAttachData = {
      url: url,
      parcelId: parcelInfo.id,
      shipmentId: shipmentId,
      isAttached: isAttached,
    };

    return dispatch(attachParcelToShipment(parcelToAttachData));
  });

  await Promise.all(parcelsToAttach);
};

export default updateParcelAttach;
