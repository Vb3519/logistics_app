import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Types:
import { ShipmentRequest } from 'types/shipments.interface';

// Utils:
import serverResponseImitation from 'shared/utils/serverResponseImitation';

// Api:
import { SHIPMENTS_URL } from 'shared/api/logistics_appApi';

const editShipmentAdress = createAsyncThunk(
  'shipments/editAdress',
  async (
    payload: {
      from_city: string;
      to_city: string;
      shipmentId: string | undefined;
    },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const { from_city, to_city, shipmentId } = payload;

      const editShipmentAdressResponse: Response = await fetch(
        `${SHIPMENTS_URL}/${shipmentId}`,
        {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ from_city: from_city, to_city: to_city }),
        }
      );

      if (editShipmentAdressResponse.ok) {
        const shipmentWithEditedAdress: ShipmentRequest =
          await editShipmentAdressResponse.json();

        console.log('Заявка с измененным адресом:', shipmentWithEditedAdress);

        return shipmentWithEditedAdress;
      } else {
        const errorMsg: string = `HTTP Error: ${editShipmentAdressResponse.status} ${editShipmentAdressResponse.statusText}`;
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

// Изменение адреса отправки / доставки (axios):
// ------------------------------------------------
const editShipmentAdressAxios = createAsyncThunk(
  'shipments/editAdress',
  async (
    payload: {
      from_city: string;
      to_city: string;
      shipmentId: string | undefined;
    },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const { from_city, to_city, shipmentId } = payload;

      const editShipmentAdressResponse = await axios.patch<ShipmentRequest>(
        `${SHIPMENTS_URL}/${shipmentId}`,
        { from_city: from_city, to_city: to_city }
      );

      const shipmentWithEditedAdress: ShipmentRequest =
        editShipmentAdressResponse.data;

      console.log('Заявка с измененным адресом:', shipmentWithEditedAdress);

      return shipmentWithEditedAdress;
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;

      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);

export default editShipmentAdressAxios;
