// Services:
import uploadParcelToShipmentRequest from 'app/services/parcels/uploadParcelToShipmentRequest';

// Types:
import { AppDispatch } from 'app/redux/store';
import { Parcel } from 'types/parcels.interface';

// Api:
import { PARCELS_URL } from 'shared/api/logistics_appApi';

// Lib:
import prepareParcelToUpload from '../lib/prepareParcelToUpload';

const uploadParcelsToTransport = (
  parcelsToUploadData: Parcel[],
  dispatch: AppDispatch
) => {
  const uploadAllParcels = parcelsToUploadData.map((parcelInfo) => {
    const parcelToUpload = prepareParcelToUpload(PARCELS_URL, parcelInfo.id);

    return dispatch(uploadParcelToShipmentRequest(parcelToUpload));
  });

  return uploadAllParcels;
};

export default uploadParcelsToTransport;
