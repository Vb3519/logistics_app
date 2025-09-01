import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';
import { createShipmentRequest } from '../../../shared/utils/createShipmentRequest';

// Types:
import {
  ShipmentRequest,
  ShipmentRequestFormFileds,
} from '../../../types/shipments.interface';

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

export default addShipmentRequest;

// Добавление нового запроса на создание заявки на отгрузку (axios):
// -----------------------------------------------------------------
const addShipmentRequestAxios = createAsyncThunk(
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

      const addShipmentRequestResponse = await axios.post<ShipmentRequest>(
        url,
        newShipmentRequest
      );

      const addedShipmentRequest = addShipmentRequestResponse.data;

      console.log(
        'Новый запрос на создание заявки на отгрузку:',
        addedShipmentRequest
      );

      return addedShipmentRequest;
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);
