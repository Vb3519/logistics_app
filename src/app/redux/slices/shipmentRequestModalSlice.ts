import { createSlice } from '@reduxjs/toolkit';

interface ShipmentRequestModalState {
  isShipmentsModalOpened: boolean;
}

interface ShipmentRequestModalSlice {
  shipmentsModal: ShipmentRequestModalState;
}

const initialState: ShipmentRequestModalState = {
  isShipmentsModalOpened: false,
};

const shipmentRequestModalSlice = createSlice({
  name: 'shipmentsModal',
  initialState: initialState,
  reducers: {
    openShipmentRequestModal: (state) => {
      return { ...state, isShipmentsModalOpened: true };
    },

    closeShipmentRequestModal: (state) => {
      return { ...state, isShipmentsModalOpened: false };
    },
  },
});

// Действия:
export const { openShipmentRequestModal, closeShipmentRequestModal } =
  shipmentRequestModalSlice.actions;

// Состояние:
export const selectIsShipmentsModalOpened = (
  state: ShipmentRequestModalSlice
) => state.shipmentsModal.isShipmentsModalOpened;

export default shipmentRequestModalSlice.reducer;
