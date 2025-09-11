import { createSlice } from '@reduxjs/toolkit';

interface SearchShipmentState {
  searchShipmentNumber: string;
  searchShipmentError: string;
}

interface SearchShipmentSlice {
  searchShipment: SearchShipmentState;
}

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
