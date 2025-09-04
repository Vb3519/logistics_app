// Types:
import { AppDispatch } from '../../../../redux/store';
import { ShipmentRequest } from '../../../../../types/shipments.interface';
import { Parcel } from '../../../../../types/parcels.interface';

// State:
import {
  setParcelsWeightOverloadError,
  resetParcelsToUploadState,
} from '../../../../redux/slices/parcelsToUploadSlice';

// Lib:
import calcIsOverloadByWeight from '../lib/calcIsOverloadByWeight';

// Model:
import updateShipmentWithParcelsData from './updateShipmentWithParcelsData';
import uploadParcelsToTransport from './uploadParcelsToTransport';

// Constants:
import { PARCELS_WEIGHT_OVERLOAD_ERR } from '../../../../../shared/constants/logisticAppContants';

type UploadParcelsToShipmentParams = {
  id: string | undefined;
  parcelsWeightOverloadError: string;
  shipmentRequests: ShipmentRequest[];
  parcelsToUploadData: Parcel[];
  dispatch: AppDispatch;
};

const uploadParcelsToShipment = async ({
  id,
  parcelsWeightOverloadError,
  shipmentRequests,
  parcelsToUploadData,
  dispatch,
}: UploadParcelsToShipmentParams) => {
  const isOverloadByWeight: boolean | undefined = calcIsOverloadByWeight(
    id,
    shipmentRequests,
    parcelsToUploadData
  );

  // Есть ли "перегруз" транспорта:
  if (isOverloadByWeight) {
    if (parcelsWeightOverloadError === '') {
      dispatch(setParcelsWeightOverloadError(PARCELS_WEIGHT_OVERLOAD_ERR));
    }
  } else {
    // Обход всех посылок и замена у нужных поля isUploaded на true (эндпоинт /parcels)
    const uploadAllParcels = uploadParcelsToTransport(
      parcelsToUploadData,
      dispatch
    );

    await Promise.all(uploadAllParcels);

    // Добавление всех выбранных посылок в массив посылок активной заявки на отгрузку (клиент)
    updateShipmentWithParcelsData(
      id,
      shipmentRequests,
      parcelsToUploadData,
      dispatch
    );

    // Ресет выбранных посылок в компоненте расчета их общего веса (клиент)
    dispatch(resetParcelsToUploadState());
  }
};

export default uploadParcelsToShipment;
