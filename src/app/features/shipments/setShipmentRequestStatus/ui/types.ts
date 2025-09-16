import { ShipmentStatus } from 'types/shipments.interface';

export interface CurrentRequestInfo_Props {
  shipment_number: string;
  transport: string;
}

const ShipmentStatusId = {
  inProcess: 'shipment_in_proccess',
  completed: 'shipment_completed',
  delayed: 'shipment_is_delayed',
} as const;

type ShipmentStatusIdType =
  (typeof ShipmentStatusId)[keyof typeof ShipmentStatusId];

export interface CurrentRequestStatusInput_Props {
  shipmentStatusId: ShipmentStatusIdType;
  shipmentStatusValue: ShipmentStatus;
  shipmentStatusLabel: ShipmentStatus;
  changeShipmentStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
