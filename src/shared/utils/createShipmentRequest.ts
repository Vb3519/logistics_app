import { v4 as uuidv4 } from 'uuid';

// Utils:
import getCurrentDate from './getCurrentDate';

// Types:
export interface ShipmentRequestFormFileds {
  from_city: string;
  to_city: string;
  transport_info:
    | '{"transport":"ГАЗель A21R22 (до 100 кг)","max_load_value":"100"}'
    | '{"transport":"ГАЗель 3302 (до 160 кг)","max_load_value":"160"}'
    | '{"transport":"ГАЗель A21R32 (до 200 кг)","max_load_value":"200"}';
}

interface ShipmentRequest {
  id: string;
  created_at: string;
  shipment_number: string;
  current_load_value: number;
  max_load_value: number;
  transport: string;
  shipment_status?: 'В пути' | 'Завершена' | 'Опаздывает' | '';
  from_city: string;
  to_city: string;
  transport_info:
    | '{"transport":"ГАЗель A21R22 (до 100 кг)","max_load_value":"100"}'
    | '{"transport":"ГАЗель 3302 (до 160 кг)","max_load_value":"160"}'
    | '{"transport":"ГАЗель A21R32 (до 200 кг)","max_load_value":"200"}';
}

interface TransportInfo {
  transport: string;
  max_load_value: string;
}

export const createShipmentRequest = (
  shipmentRequestFormData: ShipmentRequestFormFileds
): ShipmentRequest => {
  const shipmentRequestId: string = uuidv4();
  const shipmentNumber: string = 'B' + shipmentRequestId.slice(0, 7);

  const { transport_info } = shipmentRequestFormData;
  const parcedTransportInfo: TransportInfo = JSON.parse(transport_info);

  const newShipmentRequest: ShipmentRequest = {
    id: shipmentRequestId,
    created_at: getCurrentDate(),
    shipment_number: shipmentNumber,
    current_load_value: 0,
    transport: parcedTransportInfo.transport,
    max_load_value: Number(parcedTransportInfo.max_load_value),
    shipment_status: '',
    ...shipmentRequestFormData,
  };

  return newShipmentRequest;
};
