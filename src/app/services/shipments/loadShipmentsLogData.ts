import { createAsyncThunk } from '@reduxjs/toolkit';

// Utils:
import serverResponseImitation from 'shared/utils/serverResponseImitation';

const loadShipmentsLogData = createAsyncThunk(
  'shipments/loadShipmentsLogData',
  async (payload: { url: string; param: string }, thunkApi) => {
    try {
      await serverResponseImitation(2000);

      const { url, param } = payload;

      const loadShipmentsLogDataResponse: Response = await fetch(
        `${url}${param}`
      );

      if (loadShipmentsLogDataResponse.ok) {
        const shipmentsLogData = await loadShipmentsLogDataResponse.json();
        console.log('Данные журнала отгрузок:', shipmentsLogData);

        return shipmentsLogData;
      } else {
        const errorMsg: string = `HTTP Error: ${loadShipmentsLogDataResponse.status} ${loadShipmentsLogDataResponse.statusText}`;
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

export default loadShipmentsLogData;
