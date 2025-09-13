import { createSlice } from '@reduxjs/toolkit';

// Types:
import {
  Parcel,
  ParcelsToUploadState,
  ParcelsToUploadSlice,
} from 'types/parcels.interface';

const initialState: ParcelsToUploadState = {
  parcelsToUploadData: [],
  parcelsWeightOverloadError: '',
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

      //   state.parcelsToUploadData.push(parcelDataWithShipmentId);

      return {
        ...state,
        parcelsToUploadData: [
          ...state.parcelsToUploadData,
          parcelDataWithShipmentId,
        ],
      };
    },

    removeParcelFromUpload: (state, action) => {
      state.parcelsToUploadData = state.parcelsToUploadData.filter(
        (parcelInfo) => parcelInfo.id !== action.payload
      );
    },

    setParcelsWeightOverloadError: (state, action) => {
      return { ...state, parcelsWeightOverloadError: action.payload };
    },

    resetParcelsToUploadState: (state) => {
      return {
        ...state,
        parcelsToUploadData: [],
        parcelsWeightOverloadError: '',
      };
    },
  },
});

// Действия:
export const {
  addParcelToUpload,
  removeParcelFromUpload,
  setParcelsWeightOverloadError,
  resetParcelsToUploadState,
} = parcelsToUploadSlice.actions;

// Состояние:
export const selectParcelsToUploadData = (state: ParcelsToUploadSlice) =>
  state.parcelsToUpload.parcelsToUploadData;

export const selectParcelsWeightOverloadError = (state: ParcelsToUploadSlice) =>
  state.parcelsToUpload.parcelsWeightOverloadError;

export default parcelsToUploadSlice.reducer;
