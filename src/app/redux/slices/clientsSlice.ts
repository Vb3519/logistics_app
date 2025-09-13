import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Types:
import { ClientsState, ClientsStateSlice } from 'types/clients.interface';

// Services:
import loadClientsData from 'app/services/clients/loadClientsData';
import addNewClient from 'app/services/clients/addNewClient';

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
