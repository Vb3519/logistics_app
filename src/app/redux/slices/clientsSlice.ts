import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';
import createCompanyClient from '../../../shared/utils/createCompanyClient';

// Types:
import {
  Client,
  ClientFormFields,
  ClientsState,
  ClientsStateSlice,
} from '../../../types/clients.interface';

// Загрузка данных по клиентам компании:
// ------------------------------------------------
export const loadClientsData = createAsyncThunk(
  'clients/loadData',
  async (url: string, thunkAPI) => {
    try {
      await serverResponseImitation(2000);

      const clientsDataResponse: Response = await fetch(url, { method: 'GET' });

      if (clientsDataResponse.ok) {
        const clientsData: Client[] = await clientsDataResponse.json();
        console.log('Загруженные данные по клиентам:', clientsData);

        return clientsData;
      } else {
        const errorMsg: string = `HTTP Error: ${clientsDataResponse.status} ${clientsDataResponse.statusText}`;
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

// Добавление нового клиента:
// ------------------------------------------------
export const addNewClient = createAsyncThunk(
  'clients/addClient',
  async (
    payload: { clientFormData: ClientFormFields; url: string },
    thunkApi
  ) => {
    await serverResponseImitation(2000);

    const { clientFormData, url } = payload;

    // создание нового клиента из данных формы и генерация id:
    const newClient: Client = createCompanyClient(clientFormData);

    try {
      const addClientResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newClient),
      });

      if (addClientResponse.ok) {
        const addedClient: Client = await addClientResponse.json();

        console.log('Добавлен новый заказчик:', addedClient);

        return addedClient;
      } else {
        const errorMsg: string = `HTTP Error: ${addClientResponse.status} ${addClientResponse.statusText}`;
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

// Слайс состояния клиентов компании:
// ------------------------------------------------
const initialState: ClientsState = {
  clientsData: [],
  isClientsDataLoading: false,
  clientsDataError: '',

  isClientsFormDataSending: false,
  clientsFormError: '',
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Загрузка данных по заказчикам:
    builder.addCase(loadClientsData.pending, (state) => {
      return { ...state, isClientsDataLoading: true, clientsDataError: '' };
    });

    builder.addCase(loadClientsData.fulfilled, (state, action) => {
      state.isClientsDataLoading = false;

      state.clientsData.push(...action.payload);
    });

    builder.addCase(loadClientsData.rejected, (state, action) => {
      state.isClientsDataLoading = false;

      if (typeof action.payload === 'string') {
        state.clientsDataError = action.payload;
      }
    });

    // Добавление нового заказчика:
    builder.addCase(addNewClient.pending, (state) => {
      return { ...state, isClientsFormDataSending: true, clientsFormError: '' };
    });

    builder.addCase(addNewClient.fulfilled, (state, action) => {
      state.isClientsFormDataSending = false;
      state.clientsData.push(action.payload);
    });

    builder.addCase(addNewClient.rejected, (state, action) => {
      state.isClientsFormDataSending = false;

      if (typeof action.payload === 'string') {
        state.clientsFormError = action.payload;
      }
    });
  },
});

// Состояние:
export const selectClientsData = (state: ClientsStateSlice) =>
  state.clients.clientsData;
export const selectIsClientsDataLoading = (state: ClientsStateSlice) =>
  state.clients.isClientsDataLoading;

export default clientsSlice.reducer;
