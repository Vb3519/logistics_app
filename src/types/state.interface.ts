import { ShipmentRequest } from './shipments.interface';

// Daily Plan:
// ----------------------------------
export interface DailyPlanState {
  dailyParcelsCollected: number;
  dailyShipmentsCreated: number;
  dailyShipmentsApproved: number;
  allActionsCounter: number;
}

export interface DailyPlanSlice {
  dailyPlan: DailyPlanState;
}

// Mobile Nav Page:
// ----------------------------------
export interface MobileNavPageState {
  isMobileNavPageOpened: boolean;
}

export interface MobileNavPageSlice {
  mobileNavPage: MobileNavPageState;
}

// Search Shipment:
// ----------------------------------
export interface SearchShipmentState {
  searchShipmentNumber: string;
  searchShipmentError: string;
}

export interface SearchShipmentSlice {
  searchShipment: SearchShipmentState;
}

// Shipment Modals:
// ----------------------------------
export interface ShipmentModalsState {
  isAddShipmentModalOpened: boolean;
  isShipmentAdressModalOpened: boolean;
}

export interface ShipmentModalsSlice {
  shipmentModals: ShipmentModalsState;
}

// Shipment Parcels List:
// ----------------------------------
export interface ShipmentParcelsListState {
  isShipmentParselsListOpened: boolean;
}

export interface ShipmentParcelsListSlice {
  shipmentParcelsList: ShipmentParcelsListState;
}

// Shipments Log:
// ----------------------------------
export interface ShipmentsLogState {
  shipmentsLog: ShipmentRequest[];
  isShipmentLogDataLoading: boolean;
  shipmentLogDataError: string;
}

export interface ShipmentsLogSlice {
  shipments_log: ShipmentsLogState;
}

// Shipment Status:
// ----------------------------------
export interface ShipmentStatusState {
  shipmentStatus: 'В пути' | 'Завершена' | 'Опаздывает' | '';
  shipmentStatusErrorMsg: string;
}

export interface ShipmentStatusSlice {
  shipmentStatus: ShipmentStatusState;
}
