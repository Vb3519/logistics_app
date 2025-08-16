import { createAsyncThunk } from '@reduxjs/toolkit';

// Utils:
import serverResponseImitation from '../../../../shared/utils/serverResponseImitation';

// Types:
import { Parcel } from '../../../../types/parcels.interface';

// Убрать посылки из непроведенной заявки на отгрузку:
// ------------------------------------------------------------------
export const unloadParcelFromShipmentRequest = createAsyncThunk(
  'parcels/unloadParcel',
  async (payload: { url: string; parcelId: string }, thunkApi) => {
    try {
      await serverResponseImitation(2000);

      const { url, parcelId } = payload;

      const parcelUnloadResponse: Response = await fetch(`${url}/${parcelId}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ isUploaded: false }),
      });

      if (parcelUnloadResponse.ok) {
        const unloadedParcel: Parcel = await parcelUnloadResponse.json();
        console.log('Открепленная от заявки посылка:', unloadedParcel);

        return unloadedParcel;
      } else {
        const errorMsg: string = `HTTP Error: ${parcelUnloadResponse.status} ${parcelUnloadResponse.statusText}`;

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

export default unloadParcelFromShipmentRequest;
