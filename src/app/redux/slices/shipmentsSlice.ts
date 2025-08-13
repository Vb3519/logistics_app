import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';
import { createShipmentRequest } from '../../../shared/utils/createShipmentRequest';

// Types:
import {
  ShipmentsState,
  ShipmentsStateSlice,
  ShipmentRequest,
  ShipmentRequestFormFileds,
} from '../../../types/shipments.interface';
import { Parcel } from './parcelsSlice';

// Загрузка с api данных по непроведенным заявкам на отгрузку:
// ---------------------------------------------------
export const loadCurrentShipmentRequestsData = createAsyncThunk(
  'shipments/loadShipmentRequestsData',
  async (url: string, thunkApi) => {
    try {
      await serverResponseImitation(2000);

      const shipmentRequestsDataResponse: Response = await fetch(url);

      if (shipmentRequestsDataResponse.ok) {
        const currentShipmentRequestsData: ShipmentRequest[] =
          await shipmentRequestsDataResponse.json();

        console.log(
          'Данные по непроведенным заявкам на отгрузку:',
          currentShipmentRequestsData
        );

        return currentShipmentRequestsData;
      } else {
        const errorMsg: string = `HTTP Error: ${shipmentRequestsDataResponse.status} ${shipmentRequestsDataResponse.statusText}`;
        console.log(errorMsg);

        return thunkApi.rejectWithValue(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;

      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);

// Добавление нового запроса на создание заявки на отгрузку:
// -----------------------------------------------------------------
export const addNewShipmentRequest = createAsyncThunk(
  'shipments/addNewShipmentRequest',
  async (
    payload: {
      url: string;
      shipmentRequestFormData: ShipmentRequestFormFileds;
    },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const { url, shipmentRequestFormData } = payload;

      const newShipmentRequest: ShipmentRequest = createShipmentRequest(
        shipmentRequestFormData
      );

      const addNewShipmentRequestResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newShipmentRequest),
      });

      if (addNewShipmentRequestResponse.ok) {
        const addedShipmentRequest: ShipmentRequest =
          await addNewShipmentRequestResponse.json();

        console.log(
          'Новый запрос на создание заявки на отгрузку:',
          addedShipmentRequest
        );

        return addedShipmentRequest;
      } else {
        const errorMsg: string = `HTTP Error: ${addNewShipmentRequestResponse.status} ${addNewShipmentRequestResponse.statusText}`;

        console.log(errorMsg);

        return thunkApi.rejectWithValue(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);

const initialState: ShipmentsState = {
  currentShipmentRequests: [],
  shipmentRequestsDataError: '',
  shipmentRequestsFormError: '',
  isLoadingViaApi: false,
  isShipmentRequestsFormDataSending: false,
};

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    addParcelsToShipment: (
      state,
      action: {
        payload: {
          activeShipmentId: string;
          parcelsToUpload: Parcel[];
          parcelsTotalWeight: number;
        };
      }
    ) => {
      const { activeShipmentId, parcelsToUpload, parcelsTotalWeight } =
        action.payload;

      const activeShipmentRequest = state.currentShipmentRequests.find(
        (shipmentRequest) => {
          return shipmentRequest.id === activeShipmentId;
        }
      );

      if (activeShipmentRequest) {
        activeShipmentRequest.shipment_parcels.push(...parcelsToUpload);

        activeShipmentRequest.current_load_value =
          activeShipmentRequest.shipment_parcels.reduce(
            (totalWeight, shipment) =>
              totalWeight + Number(shipment.parcel_weight),
            0
          );
      }
    },
  },

  extraReducers: (builder) => {
    // Загрузка с api данных по запросам на создание заявки на отгрузку:
    builder.addCase(loadCurrentShipmentRequestsData.pending, (state) => {
      return { ...state, isLoadingViaApi: true, shipmentRequestsDataError: '' };
    });

    builder.addCase(
      loadCurrentShipmentRequestsData.fulfilled,
      (state, action) => {
        // return {
        //   ...state,
        //   isLoadingViaApi: false,
        //   currentShipmentRequests: [...state.currentShipmentRequests, ...action.payload],
        // };

        state.isLoadingViaApi = false;
        state.currentShipmentRequests.push(...action.payload);
      }
    );

    builder.addCase(
      loadCurrentShipmentRequestsData.rejected,
      (state, action) => {
        if (typeof action.payload === 'string') {
          return {
            ...state,
            isLoadingViaApi: false,
            shipmentRequestsDataError: action.payload,
          };
        }
      }
    );

    // Добавление нового запроса на создание заявки на отгрузку:
    builder.addCase(addNewShipmentRequest.pending, (state) => {
      return {
        ...state,
        isShipmentRequestsFormDataSending: true,
        shipmentRequestsFormError: '',
      };
    });

    builder.addCase(addNewShipmentRequest.fulfilled, (state, action) => {
      return {
        ...state,
        isShipmentRequestsFormDataSending: false,
        currentShipmentRequests: [
          ...state.currentShipmentRequests,
          action.payload,
        ],
      };
    });

    builder.addCase(addNewShipmentRequest.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isShipmentRequestsFormDataSending: false,
          shipmentRequestsFormError: action.payload,
        };
      }
    });
  },
});

// Действия:
export const { addParcelsToShipment } = shipmentsSlice.actions;

// Состояние:
export const selectCurrentShipmentRequests = (state: ShipmentsStateSlice) =>
  state.shipments.currentShipmentRequests;

export const selectIsShipmentsDataLoading = (state: ShipmentsStateSlice) =>
  state.shipments.isLoadingViaApi;

export default shipmentsSlice.reducer;
