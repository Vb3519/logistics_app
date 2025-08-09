import { createSlice } from '@reduxjs/toolkit';

interface MobileNavPageState {
  isMobileNavPageOpened: boolean;
}

interface MobileNavPageSlice {
  mobileNavPage: MobileNavPageState;
}

const initialState = {
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
