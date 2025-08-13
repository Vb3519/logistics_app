import { createSlice } from '@reduxjs/toolkit';

// Types:
import { Parcel } from './parcelsSlice';

interface ParcelsToUploadState {
  parcelsToUpload: Parcel[];
  errorMsg: string;
}

interface ParcelsToUploadSlice {
  parcelsToUpload: ParcelsToUploadState;
}

const initialState: ParcelsToUploadState = {
  parcelsToUpload: [],
  errorMsg: '',
};

const parcelsToUploadSlice = createSlice({
  name: 'parcelsToUpload',
  initialState: initialState,
  reducers: {
    addParcelToUpload: (
      state,
      action: {
        type: string;
        payload: { parcelData: Parcel; shipmentId: string };
      }
    ) => {
      const { parcelData, shipmentId } = action.payload;

      const parcelDataWithShipmentId: Parcel = {
        ...parcelData,
        shipment_id: shipmentId,
      };

      //   state.parcelsToUpload.push(parcelDataWithShipmentId);

      return {
        ...state,
        parcelsToUpload: [...state.parcelsToUpload, parcelDataWithShipmentId],
      };
    },

    removeParcelFromUpload: (state, action) => {
      state.parcelsToUpload = state.parcelsToUpload.filter(
        (parcelInfo) => parcelInfo.id !== action.payload
      );
    },

    setErrorMsg: (state, action) => {
      return { ...state, errorMsg: action.payload };
    },
  },
});

// Действия:
export const { addParcelToUpload, removeParcelFromUpload, setErrorMsg } =
  parcelsToUploadSlice.actions;

// Состояние:
export const selectParcelsToUpload = (state: ParcelsToUploadSlice) =>
  state.parcelsToUpload.parcelsToUpload;

export default parcelsToUploadSlice.reducer;
