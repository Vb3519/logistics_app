import { createSlice } from '@reduxjs/toolkit';

// Types:
import { ShipmentRequest } from 'types/shipments.interface';
import { ShipmentsLogState, ShipmentsLogSlice } from 'types/state.interface';

// Services:
import loadShipmentsLogData from 'app/services/shipments/loadShipmentsLogData';

const initialState: ShipmentsLogState = {
  shipmentsLog: [],
  isShipmentLogDataLoading: false,
  shipmentLogDataError: '',
};

const shipmentsLogSlice = createSlice({
  name: 'shipments_log',
  initialState: initialState,
  reducers: {
    addShipmentToLog: (
      state,
      action: { payload: ShipmentRequest; type: string }
    ) => {
      state.shipmentsLog.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadShipmentsLogData.pending, (state) => {
      return {
        ...state,
        isShipmentLogDataLoading: true,
        shipmentLogDataError: '',
      };
    });

    builder.addCase(loadShipmentsLogData.fulfilled, (state, action) => {
      //   state.isShipmentLogDataLoading = false;
      //   state.shipmentsLog.push(...action.payload);

      return {
        ...state,
        isShipmentLogDataLoading: false,
        shipmentsLog: [...state.shipmentsLog, ...action.payload],
      };
    });

    builder.addCase(loadShipmentsLogData.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isShipmentLogDataLoading: false,
          shipmentLogDataError: action.payload,
        };
      }
    });
  },
});

// Действия:
export const { addShipmentToLog } = shipmentsLogSlice.actions;

// Состояние:
export const selectShipmentsLogData = (state: ShipmentsLogSlice) =>
  state.shipments_log.shipmentsLog;

export const selectIsShipmentsLogDataLoading = (state: ShipmentsLogSlice) =>
  state.shipments_log.isShipmentLogDataLoading;

export default shipmentsLogSlice.reducer;
