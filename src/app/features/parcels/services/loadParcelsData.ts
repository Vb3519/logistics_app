import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utils:
import serverResponseImitation from '../../../../shared/utils/serverResponseImitation';

// Types:
import { Parcel } from '../../../../types/parcels.interface';

// Загрузка с api данных по посылкам:
// ---------------------------------------------------
export const loadParcelsData = createAsyncThunk(
  'parcels/loadData',
  async (payload: { url: string; shipmentId: string | null }, thunkAPI) => {
    try {
      await serverResponseImitation(2000);

      const { url, shipmentId } = payload;

      const parcelsDataResponse: Response = await fetch(
        `${url}?shipment_id=${shipmentId}`,
        {
          method: 'GET',
        }
      );

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
      console.log(errorMsg);

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export default loadParcelsData;

// Загрузка с api данных по посылкам (axios):
// ---------------------------------------------------
const loadParcelsDataAxios = createAsyncThunk(
  'parcels/loadData',
  async (url: string, thunkApi) => {
    try {
      await serverResponseImitation(2000);

      const parcelsDataResponse = await axios.get<Parcel[]>(url);

      const parcelsData: Parcel[] = parcelsDataResponse.data;
      console.log('Загруженные данные по посылкам:', parcelsData);

      return parcelsData;
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);
