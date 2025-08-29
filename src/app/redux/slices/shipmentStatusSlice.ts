import { createSlice } from '@reduxjs/toolkit';

interface ShipmentStatusState {
  shipmentStatus: 'В пути' | 'Завершена' | 'Опаздывает' | '';
  shipmentStatusErrorMsg: string;
}

interface ShipmentStatusSlice {
  shipmentStatus: ShipmentStatusState;
}

const initialState: ShipmentStatusState = {
  shipmentStatus: '',
  shipmentStatusErrorMsg: '',
};

const shipmentStatusSlice = createSlice({
  name: 'shipmentStatus',
  initialState: initialState,
  reducers: {
    setShipmentStatus: (
      state,
      action: {
        payload: 'В пути' | 'Завершена' | 'Опаздывает' | '';
        type: string;
      }
    ) => {
      return { ...state, shipmentStatus: action.payload };
    },

    setShipmentStatusErrorMsg: (state, action) => {
      return { ...state, shipmentStatusErrorMsg: action.payload };
    },
  },
});

// Действия:
export const { setShipmentStatus, setShipmentStatusErrorMsg } =
  shipmentStatusSlice.actions;

// Состояние:
export const selectShipmentStatus = (state: ShipmentStatusSlice) =>
  state.shipmentStatus.shipmentStatus;

export const selectShipmentStatusError = (state: ShipmentStatusSlice) =>
  state.shipmentStatus.shipmentStatusErrorMsg;

export default shipmentStatusSlice.reducer;
