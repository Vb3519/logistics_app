import { createSlice } from '@reduxjs/toolkit';

interface ShipmentModalsState {
  isAddShipmentModalOpened: boolean;
  isShipmentAdressModalOpened: boolean;
}

interface ShipmentModalsSlice {
  shipmentModals: ShipmentModalsState;
}

const initialState: ShipmentModalsState = {
  isAddShipmentModalOpened: false,
  isShipmentAdressModalOpened: false,
};

const shipmentModalsSlice = createSlice({
  name: 'shipmentModals',
  initialState: initialState,
  reducers: {
    // Модалка для добавления новой заявки на отгрузку:
    // --------------------------------------------------------
    toggleAddShipmentModal: (state) => {
      return {
        ...state,
        isAddShipmentModalOpened: !state.isAddShipmentModalOpened,
      };
    },

    openAddShipmentModal: (state) => {
      return { ...state, isAddShipmentModalOpened: true };
    },

    closeAddShipmentModal: (state) => {
      return { ...state, isAddShipmentModalOpened: false };
    },

    // Модалка для изменения адреса в заявке на отгрузку:
    // --------------------------------------------------------
    toggleShipmentAdressModal: (state) => {
      return {
        ...state,
        isShipmentAdressModalOpened: !state.isShipmentAdressModalOpened,
      };
    },

    openShipmentAdressModal: (state) => {
      return { ...state, isShipmentAdressModalOpened: true };
    },

    closeShipmentAdressModal: (state) => {
      return { ...state, isShipmentAdressModalOpened: false };
    },
  },
});

// Действия:
export const {
  toggleAddShipmentModal,
  openAddShipmentModal,
  closeAddShipmentModal,

  toggleShipmentAdressModal,
  openShipmentAdressModal,
  closeShipmentAdressModal,
} = shipmentModalsSlice.actions;

// Состояние:
export const selectIsAddShipmentModalOpened = (state: ShipmentModalsSlice) =>
  state.shipmentModals.isAddShipmentModalOpened;

export const selectIsShipmentAdressModalOpened = (state: ShipmentModalsSlice) =>
  state.shipmentModals.isShipmentAdressModalOpened;

export default shipmentModalsSlice.reducer;
