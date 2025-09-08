import { createSlice } from '@reduxjs/toolkit';

interface ShipmentAdressModalState {
  isShipmentAdressModalOpened: boolean;
}

interface ShipmentAdressModalSlice {
  shipmentAdressModal: ShipmentAdressModalState;
}

const initialState: ShipmentAdressModalState = {
  isShipmentAdressModalOpened: false,
};

const shipmentAdressModalSlice = createSlice({
  name: 'shipmentAdressModal',
  initialState: initialState,
  reducers: {
    toggleShipmentAdressModal: (state) => {
      return {
        ...state,
        isShipmentAdressModalOpened: !state.isShipmentAdressModalOpened,
      };
    },
  },
});

// Действия:
export const { toggleShipmentAdressModal } = shipmentAdressModalSlice.actions;

// Сосотояние:
export const selectIsShipmentAdressModalOpened = (
  state: ShipmentAdressModalSlice
) => state.shipmentAdressModal.isShipmentAdressModalOpened;

export default shipmentAdressModalSlice.reducer;
