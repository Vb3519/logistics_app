import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';
import { createParcel } from '../../../shared/utils/createParcel';

// Types:
import {
  Parcel,
  ParcelsState,
  ParcelsStateSlice,
  ParcelFormFields,
} from '../../../types/parcels.interface';

// Загрузка с api данных по посылкам:
// ---------------------------------------------------
export const loadParcelsData = createAsyncThunk(
  'parcels/loadData',
  async (url: string, thunkAPI) => {
    try {
      await serverResponseImitation(2000);

      const parcelsDataResponse: Response = await fetch(url, { method: 'GET' });

      if (parcelsDataResponse.ok) {
        const parcelsData: Parcel[] = await parcelsDataResponse.json();
        console.log('Загруженные данные по посылкам:', parcelsData);

        return parcelsData;
      } else {
        const errorMsg: string = `HTTP Error: ${parcelsDataResponse.status} ${parcelsDataResponse.statusText}`;
        console.log(errorMsg);

        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// Добавление информации о новой посылке:
// ---------------------------------------------------
export const addNewParcel = createAsyncThunk(
  'parcels/addNewParcel',
  async (
    payload: { url: string; parcelFormData: ParcelFormFields },
    thunkAPI
  ) => {
    const { url, parcelFormData } = payload;

    const newParcel: Parcel = createParcel(parcelFormData);

    try {
      await serverResponseImitation(2000);

      const addNewParcelResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newParcel),
      });

      if (addNewParcelResponse.ok) {
        const addedParcel: Parcel = await addNewParcelResponse.json();

        console.log('Добавлена посылка:', addedParcel);

        return addedParcel;
      } else {
        const errorMsg: string = `HTTP Error: ${addNewParcelResponse.status} ${addNewParcelResponse.statusText}`;

        console.log(errorMsg);

        return thunkAPI.rejectWithValue(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;

      console.log(errorMsg);

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// Загрузка и "привязка" посылки к непроведенной заявке на отгрузку:
// ------------------------------------------------------------------
export const uploadParcelToShipmentRequest = createAsyncThunk(
  'parcels/uploadParcel',
  async (payload: { url: string; parcelId: string }, thunkApi) => {
    try {
      await serverResponseImitation(3000);

      const { url, parcelId } = payload;

      const uploadParcelResponse: Response = await fetch(`${url}/${parcelId}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ isUploaded: true }),
      });

      if (uploadParcelResponse.ok) {
        const uploadedParcel: Parcel = await uploadParcelResponse.json();
        console.log(
          'Прикрепленная к заявке на отгрузку посылка:',
          uploadedParcel
        );

        return uploadedParcel;
      } else {
        const errorMsg: string = `HTTP Error: ${uploadParcelResponse.status} ${uploadParcelResponse.statusText}`;
        console.log(errorMsg);

        return thunkApi.rejectWithValue(errorMsg);
      }
    } catch (error: unknown) {
      // Рантайм ошибки:
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);

const initialState: ParcelsState = {
  parcelsData: [],
  isParcelsDataLoading: false,
  parcelsDataError: '',

  isParcelsFormDataSending: false,
  parcelsFormError: '',

  isUploadingParcel: false,
  parcelUploadError: '',
};

const parcelsSlice = createSlice({
  name: 'parcels',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  Загрузка с api данных по посылкам:
    // ----------------------------------------------------------------------------
    builder.addCase(loadParcelsData.pending, (state) => {
      return { ...state, isParcelsDataLoading: true, parcelsDataError: '' };
    });

    builder.addCase(loadParcelsData.fulfilled, (state, action) => {
      //   state.isParcelsDataLoading = false;
      //   state.parcelsData.push(...action.payload);

      return {
        ...state,
        isParcelsDataLoading: false,
        parcelsData: [...state.parcelsData, ...action.payload],
      };
    });

    builder.addCase(loadParcelsData.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isParcelsDataLoading: false,
          parcelsDataError: action.payload,
        };
      }
    });

    // Добавление информации о новой посылке:
    // ----------------------------------------------------------------------------
    builder.addCase(addNewParcel.pending, (state) => {
      return { ...state, isParcelsFormDataSending: true, parcelsFormError: '' };
    });

    builder.addCase(addNewParcel.fulfilled, (state, action) => {
      state.isParcelsFormDataSending = false; // immer
      state.parcelsData.push(action.payload);

      // return {
      //   ...state,
      //   isParcelsFormDataSending: false,
      //   parcelsData: [...state.parcelsData, action.payload],
      // };
    });

    builder.addCase(addNewParcel.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isParcelsFormDataSending: false,
          parcelsFormError: action.payload,
        };
      }
    });

    // Загрузка и "привязка" посылки к непроведенной заявке на отгрузку:
    // ----------------------------------------------------------------------------
    builder.addCase(uploadParcelToShipmentRequest.pending, (state) => {
      return { ...state, isUploadingParcel: true, parcelUploadError: '' };
    });

    builder.addCase(
      uploadParcelToShipmentRequest.fulfilled,
      (state, action) => {
        const { id } = action.payload;

        const parcelToUpload: Parcel | undefined = state.parcelsData.find(
          (parcelInfo) => parcelInfo.id === id
        );

        if (parcelToUpload) {
          parcelToUpload.isUploaded = true;
        }

        state.isUploadingParcel = false;
      }
    );

    builder.addCase(uploadParcelToShipmentRequest.rejected, (state, action) => {
      state.isUploadingParcel = false;

      if (typeof action.payload === 'string') {
        state.parcelUploadError = action.payload;
      }
    });
  },
});

// Действия:

// Состояние:
export const selectParcelsData = (state: ParcelsStateSlice) =>
  state.parcels.parcelsData;

export const selectIsParcelsDataLoading = (state: ParcelsStateSlice) =>
  state.parcels.isParcelsDataLoading;

export const selectIsUploadingParcel = (state: ParcelsStateSlice) =>
  state.parcels.isUploadingParcel;

export default parcelsSlice.reducer;
