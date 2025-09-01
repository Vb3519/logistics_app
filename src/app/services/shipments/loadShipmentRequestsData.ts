import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';

// Types:
import {
  ShipmentRequest,
  ShipmentStatus,
} from '../../../types/shipments.interface';

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

export default loadShipmentRequestsData;

// Загрузка с api данных по непроведенным заявкам на отгрузку:
// ---------------------------------------------------
const loadShipmentRequestsDataAxios = createAsyncThunk(
  'shipments/loadShipmentRequestsData',
  async (
    payload: { url: string; shipmentStatus: ShipmentStatus },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const { url, shipmentStatus } = payload;

      const shipmentRequestsDataResponse = await axios.get<ShipmentRequest[]>(
        `${url}?shipment_status=${shipmentStatus}`
      );

      const shipmentRequestsData = shipmentRequestsDataResponse.data;

      console.log(
        'Данные по непроведенным заявкам на отгрузку:',
        shipmentRequestsData
      );

      return shipmentRequestsData;
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);
