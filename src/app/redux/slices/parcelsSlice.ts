import { createSlice } from '@reduxjs/toolkit';

// Types:
import {
  Parcel,
  ParcelsState,
  ParcelsStateSlice,
} from '../../../types/parcels.interface';

// Services:
import loadParcelsData from '../../services/parcels/loadParcelsData';
import addNewParcel from '../../services/parcels/addNewParcel';
import uploadParcelToShipmentRequest from '../../services/parcels/uploadParcelToShipmentRequest';
import unloadParcelFromShipmentRequest from '../../services/parcels/unloadParcelFromShipmentRequest';
import attachParcelToShipment from '../../services/parcels/attachParcelToShipment';

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

  isAttachingParcel: false,
  parcelAttachError: '',
};

const parcelsSlice = createSlice({
  name: 'parcels',
  initialState: initialState,
  reducers: {
    updateParcelsByShipmentId: (state, action) => {
      state.parcelsData = state.parcelsData.filter(
        (parcelInfo) => parcelInfo.shipment_id === action.payload
      );
    },
  },

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

    // "Привязка" посылки к заявке
    // Обновление поля shipment_id и isAttached (у каждой загруженной в транспорт посылки), после проведения заявки на отгрузку:
    builder.addCase(attachParcelToShipment.pending, (state) => {
      return { ...state, isAttachingParcel: true, parcelAttachError: '' };
    });

    builder.addCase(attachParcelToShipment.fulfilled, (state, action) => {
      const attachedParcel: Parcel = action.payload;
      const { shipment_id, isAttached } = attachedParcel;

      if (shipment_id !== '') {
        const parcelToUpdate = state.parcelsData.find(
          (parcelInfo) => parcelInfo.id === attachedParcel.id
        );

        if (parcelToUpdate) {
          parcelToUpdate.shipment_id = attachedParcel.id;
          parcelToUpdate.isAttached = isAttached;
        }
      }

      state.isAttachingParcel = false;
    });

    builder.addCase(attachParcelToShipment.rejected, (state, action) => {
      state.isAttachingParcel = false;

      if (typeof action.payload === 'string') {
        state.parcelAttachError = action.payload;
      }
    });
  },
});

// Действия:
export const { updateParcelsByShipmentId } = parcelsSlice.actions;

// Состояние:
export const selectParcelsData = (state: ParcelsStateSlice) =>
  state.parcels.parcelsData;

export const selectIsParcelsDataLoading = (state: ParcelsStateSlice) =>
  state.parcels.isParcelsDataLoading;

export const selectIsUploadingParcel = (state: ParcelsStateSlice) =>
  state.parcels.isUploadingParcel;

export const selectIsUnloadingParcel = (state: ParcelsStateSlice) =>
  state.parcels.isUnloadingParcel;

export const selectIsAttachingParcel = (state: ParcelsStateSlice) =>
  state.parcels.isAttachingParcel;

export default parcelsSlice.reducer;
