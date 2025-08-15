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
import { Parcel } from '../../../types/parcels.interface';

// Загрузка с api данных по непроведенным заявкам на отгрузку:
// ---------------------------------------------------
export const loadShipmentRequestsData = createAsyncThunk(
  'shipments/loadShipmentRequestsData',
  async (url: string, thunkApi) => {
    try {
      await serverResponseImitation(2000);

      const shipmentRequestsDataResponse: Response = await fetch(url);

      if (shipmentRequestsDataResponse.ok) {
        const shipmentRequestsData: ShipmentRequest[] =
          await shipmentRequestsDataResponse.json();

        console.log(
          'Данные по непроведенным заявкам на отгрузку:',
          shipmentRequestsData
        );

        return shipmentRequestsData;
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
export const addShipmentRequest = createAsyncThunk(
  'shipments/addShipmentRequest',
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

      const addShipmentRequestResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newShipmentRequest),
      });

      if (addShipmentRequestResponse.ok) {
        const addedShipmentRequest: ShipmentRequest =
          await addShipmentRequestResponse.json();

        console.log(
          'Новый запрос на создание заявки на отгрузку:',
          addedShipmentRequest
        );

        return addedShipmentRequest;
      } else {
        const errorMsg: string = `HTTP Error: ${addShipmentRequestResponse.status} ${addShipmentRequestResponse.statusText}`;

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
  shipmentRequestsData: [],
  isShipmentRequestsDataLoading: false,
  shipmentRequestsDataError: '',

  isShipmentRequestsFormDataSending: false,
  shipmentRequestsFormError: '',
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
        currentShipmentRequest.shipment_parcels.push(...parcelsToUploadData);

        currentShipmentRequest.current_load_value =
          currentShipmentRequest.shipment_parcels.reduce(
            (totalWeight, parcel) => totalWeight + Number(parcel.parcel_weight),
            0
          );
      }
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
  },
});

// Действия:
export const { addParcelsToShipment } = shipmentsSlice.actions;

// Состояние:
export const selectShipmentRequests = (state: ShipmentsStateSlice) =>
  state.shipments.shipmentRequestsData;

export const selectisShipmentRequestsDataLoading = (
  state: ShipmentsStateSlice
) => state.shipments.isShipmentRequestsDataLoading;

export default shipmentsSlice.reducer;
