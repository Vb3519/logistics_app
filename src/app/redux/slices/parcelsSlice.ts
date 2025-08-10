import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';
import { createParcel } from '../../../shared/utils/createParcel';

// Types:
import { ParcelFormFields } from '../../features/parcels/containers/AddParcelForm';

export interface Parcel {
  id: string;
  parcel_number: string;
  parcel_weight: string;
  parcel_status:
    | 'Изменен адрес отправки'
    | 'Проблема с упаковкой'
    | 'Вышел из строя транспорт';
  isSelected?: boolean;
}

interface ParcelsState {
  parcels: Parcel[];
  parcelsDataError: string;
  parcelsFormError: string;
  isLoadingViaApi: boolean;
  isParcelsFormDataSending: boolean;
}

interface ParcelsStateSlice {
  parcels: ParcelsState;
}

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
  'parcels/addParcel',
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

const initialState: ParcelsState = {
  parcels: [],
  parcelsDataError: '',
  parcelsFormError: '',
  isLoadingViaApi: false,
  isParcelsFormDataSending: false,
};

const parcelsSlice = createSlice({
  name: 'parcels',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  Загрузка с api данных по посылкам:

    builder.addCase(loadParcelsData.pending, (state) => {
      return { ...state, isLoadingViaApi: true, parcelsDataError: '' };
    });

    builder.addCase(loadParcelsData.fulfilled, (state, action) => {
      //   state.isLoadingViaApi = false;
      //   state.parcels.push(...action.payload);

      return {
        ...state,
        isLoadingViaApi: false,
        parcels: [...state.parcels, ...action.payload],
      };
    });

    builder.addCase(loadParcelsData.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isLoadingViaApi: false,
          parcelsDataError: action.payload,
        };
      }
    });

    // Добавление информации о новой посылке:

    builder.addCase(addNewParcel.pending, (state) => {
      return { ...state, isParcelsFormDataSending: true, parcelsFormError: '' };
    });

    builder.addCase(addNewParcel.fulfilled, (state, action) => {
      state.isParcelsFormDataSending = false; // immer
      state.parcels.push(action.payload);

      // return {
      //   ...state,
      //   isParcelsFormDataSending: false,
      //   parcels: [...state.parcels, action.payload],
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
  },
});

// Действия:

// Состояние:
export const selectParcels = (state: ParcelsStateSlice) =>
  state.parcels.parcels;
export const selectIsParcelsDataLoading = (state: ParcelsStateSlice) =>
  state.parcels.isLoadingViaApi;

export default parcelsSlice.reducer;
