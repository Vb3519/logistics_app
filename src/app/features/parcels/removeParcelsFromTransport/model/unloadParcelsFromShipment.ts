// Types:
import { Parcel } from '../../../../../types/parcels.interface';
import { AppDispatch } from '../../../../redux/store';

// Api:
import { PARCELS_URL } from '../../../../../shared/api/logistics_appApi';

// State:
import { removeParcelsFromShipment } from '../../../../redux/slices/shipmentsSlice';
import { setShipmentStatus } from '../../../../redux/slices/shipmentStatusSlice';

// Services:
import unloadParcelFromShipmentRequest from '../../../../services/parcels/unloadParcelFromShipmentRequest';

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
