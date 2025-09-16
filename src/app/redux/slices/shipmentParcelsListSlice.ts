import { createSlice } from '@reduxjs/toolkit';

// Types:
import {
  ShipmentParcelsListState,
  ShipmentParcelsListSlice,
} from 'types/state.interface';

const initialState: ShipmentParcelsListState = {
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
