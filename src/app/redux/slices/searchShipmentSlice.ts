import { createSlice } from '@reduxjs/toolkit';

// Types:
import {
  SearchShipmentState,
  SearchShipmentSlice,
} from 'types/state.interface';

const initialState: SearchShipmentState = {
  searchShipmentNumber: '',
  searchShipmentError: '',
};

const searchShipmentSlice = createSlice({
  name: 'searchShipment',
  initialState: initialState,
  reducers: {
    setSearchShipmentNumber: (state, action) => {
      return { ...state, searchShipmentNumber: action.payload };
    },

    resetSearchShipmentNumber: (state) => {
      return { ...state, searchShipmentNumber: '' };
    },

    setSearchShipmentError: (state, action) => {
      return { ...state, searchShipmentError: action.payload };
    },
  },
});

// Действия:
export const { setSearchShipmentNumber } = searchShipmentSlice.actions;

// Состояние:
export const selectSearchShipmentNumber = (state: SearchShipmentSlice) =>
  state.searchShipment.searchShipmentNumber;

export default searchShipmentSlice.reducer;
