import { v4 as uuidv4 } from 'uuid';

// Utils:
import getCurrentDate from './getCurrentDate';

// Types:
import {
  ShipmentRequestFormFileds,
  ShipmentRequest,
} from '../../types/shipments.interface';

interface TransportInfo {
  transport: string;
  max_load_value: string;
}

export const createShipmentRequest = (
  shipmentRequestFormData: ShipmentRequestFormFileds
): ShipmentRequest => {
  const shipmentRequestId: string = uuidv4();
  const shipmentNumber: string = 'SH-' + shipmentRequestId.slice(0, 7);

  const { transport_info } = shipmentRequestFormData;
  const parcedTransportInfo: TransportInfo = JSON.parse(transport_info);

  const newShipmentRequest: ShipmentRequest = {
    id: shipmentRequestId,
    created_at: getCurrentDate(),
    shipment_number: shipmentNumber,
    shipment_parcels: [],
    current_load_value: 0,
    transport: parcedTransportInfo.transport,
    max_load_value: Number(parcedTransportInfo.max_load_value),
    shipment_status: '',
    ...shipmentRequestFormData,
  };

  return newShipmentRequest;
};
