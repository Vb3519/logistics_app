import { createSlice } from '@reduxjs/toolkit';

// Types:
import {
  Parcel,
  ParcelsState,
  ParcelsStateSlice,
} from '../../../types/parcels.interface';

// Services:
import loadParcelsData from '../../features/parcels/services/loadParcelsData';
import addNewParcel from '../../features/parcels/services/addNewParcel';
import uploadParcelToShipmentRequest from '../../features/parcels/services/uploadParcelToShipmentRequest';
import unloadParcelFromShipmentRequest from '../../features/parcels/services/unloadParcelFromShipmentRequest';

const initialState: ParcelsState = {
  parcelsData: [],
  isParcelsDataLoading: false,
  parcelsDataError: '',

  isParcelsFormDataSending: false,
  parcelsFormError: '',

  isUploadingParcel: false,
  parcelUploadError: '',

  isUnloadingParcel: false,
  parcelUnloadError: '',
};

const parcelsSlice = createSlice({
  name: 'parcels',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  Загрузка с api данных по посылкам:
    // ----------------------------------------------------------------------------
    builder.addCase(loadParcelsData.pending, (state) => {
      return { ...state, isParcelsDataLoading: true, parcelsDataError: '' };
    });

    builder.addCase(loadParcelsData.fulfilled, (state, action) => {
      //   state.isParcelsDataLoading = false;
      //   state.parcelsData.push(...action.payload);

      return {
        ...state,
        isParcelsDataLoading: false,
        parcelsData: [...state.parcelsData, ...action.payload],
      };
    });

    builder.addCase(loadParcelsData.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isParcelsDataLoading: false,
          parcelsDataError: action.payload,
        };
      }
    });

    // Добавление информации о новой посылке:
    // ----------------------------------------------------------------------------
    builder.addCase(addNewParcel.pending, (state) => {
      return { ...state, isParcelsFormDataSending: true, parcelsFormError: '' };
    });

    builder.addCase(addNewParcel.fulfilled, (state, action) => {
      state.isParcelsFormDataSending = false; // immer
      state.parcelsData.push(action.payload);

      // return {
      //   ...state,
      //   isParcelsFormDataSending: false,
      //   parcelsData: [...state.parcelsData, action.payload],
      // };
    });

    builder.addCase(addNewParcel.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          isParcelsFormDataSending: false,
          parcelsFormError: action.payload,
        };
      }
    });

    // Загрузка и "привязка" посылки к непроведенной заявке на отгрузку:
    // ----------------------------------------------------------------------------
    builder.addCase(uploadParcelToShipmentRequest.pending, (state) => {
      return { ...state, isUploadingParcel: true, parcelUploadError: '' };
    });

    builder.addCase(
      uploadParcelToShipmentRequest.fulfilled,
      (state, action) => {
        const { id } = action.payload;

        const parcelToUpload: Parcel | undefined = state.parcelsData.find(
          (parcelInfo) => parcelInfo.id === id
        );

        if (parcelToUpload) {
          parcelToUpload.isUploaded = true;
        }

        state.isUploadingParcel = false;
      }
    );

    builder.addCase(uploadParcelToShipmentRequest.rejected, (state, action) => {
      state.isUploadingParcel = false;

      if (typeof action.payload === 'string') {
        state.parcelUploadError = action.payload;
      }
    });

    // Убрать посылки из непроведенной заявки на отгрузку:
    // ------------------------------------------------------------------
    builder.addCase(unloadParcelFromShipmentRequest.pending, (state) => {
      return { ...state, isUnloadingParcel: true, parcelUnloadError: '' };
    });

    builder.addCase(
      unloadParcelFromShipmentRequest.fulfilled,
      (state, action) => {
        const { id } = action.payload;

        const parcelToUnload: Parcel | undefined = state.parcelsData.find(
          (parcelInfo) => parcelInfo.id === id
        );

        if (parcelToUnload) {
          parcelToUnload.isUploaded = false;
        }

        state.isUnloadingParcel = false;
      }
    );

    builder.addCase(
      unloadParcelFromShipmentRequest.rejected,
      (state, action) => {
        if (typeof action.payload === 'string') {
          return {
            ...state,
            isUnloadingParcel: false,
            parcelUnloadError: action.payload,
          };
        }
      }
    );
  },
});

// Действия:

// Состояние:
export const selectParcelsData = (state: ParcelsStateSlice) =>
  state.parcels.parcelsData;

export const selectIsParcelsDataLoading = (state: ParcelsStateSlice) =>
  state.parcels.isParcelsDataLoading;

export const selectIsUploadingParcel = (state: ParcelsStateSlice) =>
  state.parcels.isUploadingParcel;

export const selectIsUnloadingParcel = (state: ParcelsStateSlice) =>
  state.parcels.isUnloadingParcel;

export default parcelsSlice.reducer;
