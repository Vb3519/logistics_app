import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Types:
import { Client } from '../../../types/clients.interface';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';

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

export default loadClientsData;

// Загрузка данных по клиентам компании (axios):
// ------------------------------------------------
const loadClientsDataAxios = createAsyncThunk(
  'clients/loadData',
  async (url: string, thunkApi) => {
    try {
      await serverResponseImitation(2000);

      const clientsDataResponse = await axios.get<Client[]>(url);

      const clientsData = clientsDataResponse.data;

      console.log('Загруженные данные по клиентам:', clientsData);

      return clientsData;
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;

      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);
