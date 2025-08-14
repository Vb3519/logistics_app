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

    setParcelsToUploadErrorMsg: (state, action) => {
      return { ...state, errorMsg: action.payload };
    },

    resetParcelsToUpload: (state) => {
      return { ...state, parcelsToUpload: [], errorMsg: '' };
    },
  },
});

// Действия:
export const {
  addParcelToUpload,
  removeParcelFromUpload,
  setParcelsToUploadErrorMsg,
  resetParcelsToUpload,
} = parcelsToUploadSlice.actions;

// Состояние:
export const selectParcelsToUpload = (state: ParcelsToUploadSlice) =>
  state.parcelsToUpload.parcelsToUpload;

export const selectParcelsToUploadErrorMsg = (state: ParcelsToUploadSlice) =>
  state.parcelsToUpload.errorMsg;

export default parcelsToUploadSlice.reducer;
