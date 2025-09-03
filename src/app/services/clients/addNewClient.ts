import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';
import createCompanyClient from '../../features/clients/addNewClient/lib/createCompanyClient';

// Types:
import { Client, ClientFormFields } from '../../../types/clients.interface';

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

export default addNewClient;

// Добавление нового клиента (Axios):
// ------------------------------------------------
const addNewClientAxios = createAsyncThunk(
  'clients/addNewClientAxios',
  async (
    payload: { url: string; clientFormData: ClientFormFields },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const { url, clientFormData } = payload;

      const clientToAdd: Client = createCompanyClient(clientFormData);

      const addClientResponse: AxiosResponse<Client> = await axios.post(
        url,
        clientToAdd
      );

      const addedClient: Client = addClientResponse.data;

      console.log('Добавлен новый заказчик:', addedClient);

      return addedClient;
    } catch (error: unknown) {
      const errorMsg: string = `Error ${(error as Error).message}`;

      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);
