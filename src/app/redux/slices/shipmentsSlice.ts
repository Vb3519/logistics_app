import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Types:
import {
  ShipmentsState,
  ShipmentsStateSlice,
  ShipmentRequest,
  ShipmentStatus,
} from '../../../types/shipments.interface';
import { Parcel } from '../../../types/parcels.interface';

// Services:
import loadShipmentRequestsData from '../../features/shipments/services/loadShipmentRequestsData';
import addShipmentRequest from '../../features/shipments/services/addShipmentRequest';
import approveShipmentRequest from '../../features/shipments/services/approveShipmentRequest';

const initialState: ShipmentsState = {
  shipmentRequestsData: [],
  isShipmentRequestsDataLoading: false,
  shipmentRequestsDataError: '',

  isShipmentRequestsFormDataSending: false,
  shipmentRequestsFormError: '',

  isShipmentApproveSending: false,
  shipmentApproveError: '',
};

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    addParcelsToShipment: (
      state,
      action: {
        payload: {
          currentShipmentId: string;
          parcelsToUploadData: Parcel[];
        };
      }
    ) => {
      const { currentShipmentId, parcelsToUploadData } = action.payload;

      const currentShipmentRequest: ShipmentRequest | undefined =
        state.shipmentRequestsData.find((shipmentRequest) => {
          return shipmentRequest.id === currentShipmentId;
        });

      if (currentShipmentRequest) {
        // Получив данные посылок к погрузке, меняем статус каждой на isUploaded: true
        const uploadedParcels = parcelsToUploadData.map((parcelInfo) => {
          return { ...parcelInfo, isUploaded: true };
        });

        currentShipmentRequest.shipment_parcels.push(...uploadedParcels);

        currentShipmentRequest.current_load_value =
          currentShipmentRequest.shipment_parcels.reduce(
            (totalWeight, parcel) => totalWeight + Number(parcel.parcel_weight),
            0
          );
      }
    },

    removeParcelsFromShipment: (state, action) => {
      const currentShipmentRequest = state.shipmentRequestsData.find(
        (shipmentRequest) => shipmentRequest.id === action.payload
      );

      if (currentShipmentRequest) {
        currentShipmentRequest.shipment_parcels = [];
        currentShipmentRequest.current_load_value = 0;
      }
    },

    updateShipmentRequestsByStatus: (
      state,
      action: { payload: ShipmentStatus; type: string }
    ) => {
      state.shipmentRequestsData = state.shipmentRequestsData.filter(
        (shipmentRequest) => shipmentRequest.shipment_status === action.payload
      );
    },
  },

  extraReducers: (builder) => {
    // Загрузка с api данных по непроведенным заявкам на отгрузку:
    builder.addCase(loadShipmentRequestsData.pending, (state) => {
      return {
        ...state,
        isShipmentRequestsDataLoading: true,
        shipmentRequestsDataError: '',
      };
    });

    builder.addCase(loadShipmentRequestsData.fulfilled, (state, action) => {
      // return {
      //   ...state,
      //   isShipmentRequestsDataLoading: false,
      //   shipmentRequestsData: [...state.shipmentRequestsData, ...action.payload],
      // };

      state.isShipmentRequestsDataLoading = false;
      state.shipmentRequestsData.push(...action.payload);
    });

    builder.addCase(loadShipmentRequestsData.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isShipmentRequestsDataLoading: false,
          shipmentRequestsDataError: action.payload,
        };
      }
    });

    // Добавление нового запроса на создание заявки на отгрузку:
    builder.addCase(addShipmentRequest.pending, (state) => {
      return {
        ...state,
        isShipmentRequestsFormDataSending: true,
        shipmentRequestsFormError: '',
      };
    });

    builder.addCase(addShipmentRequest.fulfilled, (state, action) => {
      return {
        ...state,
        isShipmentRequestsFormDataSending: false,
        shipmentRequestsData: [...state.shipmentRequestsData, action.payload],
      };
    });

    builder.addCase(addShipmentRequest.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isShipmentRequestsFormDataSending: false,
          shipmentRequestsFormError: action.payload,
        };
      }
    });

    // Завершение погрузки (проведение) заявки на отгрузку:
    builder.addCase(approveShipmentRequest.pending, (state) => {
      return { ...state, isShipmentApproveSending: true };
    });

    builder.addCase(approveShipmentRequest.fulfilled, (state, action) => {
      const { id, shipment_parcels, current_load_value, shipment_status } =
        action.payload;

      const shipmentRequestToApprove = state.shipmentRequestsData.find(
        (requestInfo) => requestInfo.id === id
      );

      if (shipmentRequestToApprove) {
        shipmentRequestToApprove.shipment_parcels = shipment_parcels;
        shipmentRequestToApprove.current_load_value = current_load_value;
        shipmentRequestToApprove.shipment_status = shipment_status;
      }

      state.isShipmentApproveSending = false;
    });

    builder.addCase(approveShipmentRequest.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isShipmentApproveSending: false,
          shipmentApproveError: action.payload,
        };
      }
    });
  },
});

// Действия:
export const {
  addParcelsToShipment,
  removeParcelsFromShipment,
  updateShipmentRequestsByStatus,
} = shipmentsSlice.actions;

// Состояние:
export const selectShipmentRequests = (state: ShipmentsStateSlice) =>
  state.shipments.shipmentRequestsData;

export const selectisShipmentRequestsDataLoading = (
  state: ShipmentsStateSlice
) => state.shipments.isShipmentRequestsDataLoading;

export default shipmentsSlice.reducer;
