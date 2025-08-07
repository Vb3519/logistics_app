import { configureStore } from '@reduxjs/toolkit';

import clientsReducer from './slices/clientsSlice';
import parcelsReducer from './slices/parcelsSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    parcels: parcelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
