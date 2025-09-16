import { AppDispatch } from 'app/redux/store';

import { ShipmentRequest } from 'types/shipments.interface';
import { Parcel } from 'types/parcels.interface';

export type UploadParcelsToShipmentParams = {
  id: string | undefined;
  parcelsWeightOverloadError: string;
  shipmentRequests: ShipmentRequest[];
  parcelsToUploadData: Parcel[];
  dispatch: AppDispatch;
};
