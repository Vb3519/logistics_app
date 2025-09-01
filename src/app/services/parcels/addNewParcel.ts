import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';
import { createParcel } from '../../../shared/utils/createParcel';

// Types:
import { ParcelFormFields, Parcel } from '../../../types/parcels.interface';

// Добавление информации о новой посылке:
// ---------------------------------------------------
export const addNewParcel = createAsyncThunk(
  'parcels/addNewParcel',
  async (
    payload: { url: string; parcelFormData: ParcelFormFields },
    thunkAPI
  ) => {
    const { url, parcelFormData } = payload;

    const newParcel: Parcel = createParcel(parcelFormData);

    try {
      await serverResponseImitation(2000);

      const addNewParcelResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newParcel),
      });

      if (addNewParcelResponse.ok) {
        const addedParcel: Parcel = await addNewParcelResponse.json();

        console.log('Добавлена посылка:', addedParcel);

        return addedParcel;
      } else {
        const errorMsg: string = `HTTP Error: ${addNewParcelResponse.status} ${addNewParcelResponse.statusText}`;

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

export default addNewParcel;

// Добавление информации о новой посылке (axios):
// ---------------------------------------------------
const addNewParcelAxios = createAsyncThunk(
  'parcels/addNewParcel',
  async (
    payload: { url: string; parcelFormData: ParcelFormFields },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const { url, parcelFormData } = payload;

      const parcelToAdd: Parcel = createParcel(parcelFormData);

      const addParcelResponse = await axios.post<Parcel>(url, parcelToAdd);

      const addedParcel = addParcelResponse.data;
      console.log('Добавлена посылка:', addedParcel);

      return addedParcel;
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);
