import { Parcel } from './parcels.interface';

// Form:
// ------------------------
export interface ShipmentRequestFormFileds {
  from_city: string;
  to_city: string;
  transport_info:
    | '{"transport":"ГАЗель A21R22 (до 100 кг)","max_load_value":"100"}'
    | '{"transport":"ГАЗель 3302 (до 160 кг)","max_load_value":"160"}'
    | '{"transport":"ГАЗель A21R32 (до 200 кг)","max_load_value":"200"}';
}

// Data:
// ------------------------
export interface ShipmentRequest {
  id: string;
  created_at: string;
  shipment_number: string;
  shipment_parcels: Parcel[];
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

// State:
// ------------------------
export interface ShipmentsState {
  shipmentRequestsData: ShipmentRequest[];
  isShipmentRequestsDataLoading: boolean;
  shipmentRequestsDataError: string;

  isShipmentRequestsFormDataSending: boolean;
  shipmentRequestsFormError: string;
}

export interface ShipmentsStateSlice {
  shipments: ShipmentsState;
}

// Table:
// ------------------------
export interface ShipmentsTableElem_Props
  extends React.HTMLAttributes<HTMLTableRowElement> {
  destination: string;
  shipment_number: string;
  truck_number: string;
  total_weight: string;
  status: 'В пути' | 'Завершена' | 'Опаздывает';
}

// Components:
// ------------------------
export interface ShipmentRequestCard_Props
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  id?: string;
  created_at: string;
  shipment_number: string;
  current_load_value: number;
  max_load_value: number;
  transport: string;
  shipment_status?: 'В пути' | 'Завершена' | 'Опаздывает' | '' | undefined;
  from_city: string;
  to_city: string;
  transport_info: string;
  children?: React.ReactNode;
}

export interface ShipmentRequestListItem_Props
  extends React.LiHTMLAttributes<HTMLLIElement> {
  id?: string;
  shipment_number: string;
  from_city: string;
  to_city: string;
  current_load_value: number;
  max_load_value: number;
}
