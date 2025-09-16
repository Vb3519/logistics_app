import { createSlice } from '@reduxjs/toolkit';

// Types:
import { MobileNavPageState, MobileNavPageSlice } from 'types/state.interface';

const initialState: MobileNavPageState = {
  isMobileNavPageOpened: false,
};

const mobileNavPageSlice = createSlice({
  name: 'mobileNavPage',
  initialState: initialState,
  reducers: {
    toggleMobileNavPage: (state) => {
      return { ...state, isMobileNavPageOpened: !state.isMobileNavPageOpened };
    },
  },
});

// Действия:
export const { toggleMobileNavPage } = mobileNavPageSlice.actions;

// Состояние:
export const selectIsMobileNavPageOpened = (state: MobileNavPageSlice) =>
  state.mobileNavPage.isMobileNavPageOpened;

export default mobileNavPageSlice.reducer;
