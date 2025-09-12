// Types:
import { AppDispatch } from 'app/redux/store';
import { Parcel } from 'types/parcels.interface';

// Api:
import { PARCELS_URL } from 'shared/api/logistics_appApi';

// State:
import { removeParcelsFromShipment } from 'app/redux/slices/shipmentsSlice';
import { setShipmentStatus } from 'app/redux/slices/shipmentStatusSlice';

// Services:
import unloadParcelFromShipmentRequest from 'app/services/parcels/unloadParcelFromShipmentRequest';

// Lib:
import prepareParcelToUnload from '../lib/prepareParcelToUnload';

const unloadParcelsFromShipment = async (
  shipmentId: string,
  uploadedParcelsData: Parcel[],
  dispatch: AppDispatch
) => {
  const unloadAllParcels = uploadedParcelsData.map((parcelInfo) => {
    const parcelToUnloadData = prepareParcelToUnload(
      PARCELS_URL,
      parcelInfo.id
    );

    return dispatch(unloadParcelFromShipmentRequest(parcelToUnloadData));
  });

  await Promise.all(unloadAllParcels);

  dispatch(removeParcelsFromShipment(shipmentId));
  dispatch(setShipmentStatus(''));
};

export default unloadParcelsFromShipment;
