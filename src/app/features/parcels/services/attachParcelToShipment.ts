import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utils:
import serverResponseImitation from '../../../../shared/utils/serverResponseImitation';

// Types:
import { Parcel } from '../../../../types/parcels.interface';

// Обновление поля shipment_id (у каждой загруженной в транспорт посылки), после проведения заявки на отгрузку:
const attachParcelToShipment = createAsyncThunk(
  'parcels/attachParcel',
  async (
    payload: {
      url: string;
      parcelId: string;
      shipmentId: string;
      isAttached: boolean;
    },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const { url, parcelId, shipmentId, isAttached } = payload;

      const attachParcelResponse: Response = await fetch(`${url}/${parcelId}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          shipment_id: shipmentId,
          isAttached: isAttached,
        }),
      });

      if (attachParcelResponse.ok) {
        const attachedParcel: Parcel = await attachParcelResponse.json();
        console.log(
          'Закрепленная за проведенной отгрузкой посылка:',
          attachedParcel
        );

        return attachedParcel;
      } else {
        const errorMsg: string = `HTTP Error: ${attachParcelResponse.status} ${attachParcelResponse.statusText}`;
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

export default attachParcelToShipment;

// Обновление поля shipment_id (у каждой загруженной в транспорт посылки), после проведения заявки на отгрузку (axios):
const attachParcelToShipmentAxios = createAsyncThunk(
  'parcels/attachParcel',
  async (
    payload: { url: string; parcelId: string; shipmentId: string },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const { url, parcelId, shipmentId } = payload;

      const attachParcelResponse = await axios.patch<Parcel>(
        `${url}/${parcelId}`,
        {
          shipment_id: shipmentId,
        }
      );

      const attachedParcel: Parcel = attachParcelResponse.data;
      console.log(
        'Закрепленная за проведенной отгрузкой посылка:',
        attachedParcel
      );

      return attachedParcel;
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);
