import { createSlice } from '@reduxjs/toolkit';

interface ShipmentParcelsListState {
  isShipmentParselsListOpened: boolean;
}

interface ShipmentParcelsListSlice {
  shipmentParcelsList: ShipmentParcelsListState;
}

const initialState = {
  isShipmentParselsListOpened: false,
};

const shipmentParcelsListSlice = createSlice({
  name: 'shipmentParcelsList',
  initialState: initialState,
  reducers: {
    toggleShipmentParcelsList: (state) => {
      return {
        ...state,
        isShipmentParselsListOpened: !state.isShipmentParselsListOpened,
      };
    },
  },
});

// Действия:
export const { toggleShipmentParcelsList } = shipmentParcelsListSlice.actions;

// Состояние:
export const selectIsShipmentParselsListOpened = (
  state: ShipmentParcelsListSlice
) => state.shipmentParcelsList.isShipmentParselsListOpened;

export default shipmentParcelsListSlice.reducer;
