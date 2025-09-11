// Types:
import { ShipmentRequest } from '../../../../../types/shipments.interface';

const findSearchShipmentData = (
  requestsData: ShipmentRequest[],
  searchShipmentNum: string
): ShipmentRequest | undefined => {
  const searchShipmentData = requestsData.find((requestInfo) => {
    return requestInfo.shipment_number === searchShipmentNum;
  });

  return searchShipmentData;
};

export default findSearchShipmentData;
