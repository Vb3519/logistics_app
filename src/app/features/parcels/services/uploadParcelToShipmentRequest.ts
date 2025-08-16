import { createAsyncThunk } from '@reduxjs/toolkit';

// Utils:
import serverResponseImitation from '../../../../shared/utils/serverResponseImitation';

// Types:
import { Parcel } from '../../../../types/parcels.interface';

// Загрузка и "привязка" посылки к непроведенной заявке на отгрузку:
// ------------------------------------------------------------------
export const uploadParcelToShipmentRequest = createAsyncThunk(
  'parcels/uploadParcel',
  async (payload: { url: string; parcelId: string }, thunkApi) => {
    try {
      await serverResponseImitation(2000);

      const { url, parcelId } = payload;

      const uploadParcelResponse: Response = await fetch(`${url}/${parcelId}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ isUploaded: true }),
      });

      if (uploadParcelResponse.ok) {
        const uploadedParcel: Parcel = await uploadParcelResponse.json();
        console.log(
          'Прикрепленная к заявке на отгрузку посылка:',
          uploadedParcel
        );

        return uploadedParcel;
      } else {
        const errorMsg: string = `HTTP Error: ${uploadParcelResponse.status} ${uploadParcelResponse.statusText}`;
        console.log(errorMsg);

        return thunkApi.rejectWithValue(errorMsg);
      }
    } catch (error: unknown) {
      // Рантайм ошибки:
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);

export default uploadParcelToShipmentRequest;
