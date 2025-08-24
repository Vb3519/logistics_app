import { configureStore } from '@reduxjs/toolkit';

import clientsReducer from './slices/clientsSlice';
import parcelsReducer from './slices/parcelsSlice';
import parcelsToUploadReducer from './slices/parcelsToUploadSlice';
import mobileNavPageReducer from './slices/mobileNavMenuSlice';
import shipmentsReducer from './slices/shipmentsSlice';
import shipmentParcelsListReducer from './slices/shipmentParcelsListSlice';
import shipmentStatusReducer from './slices/shipmentStatusSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    parcels: parcelsReducer,
    parcelsToUpload: parcelsToUploadReducer,
    shipments: shipmentsReducer,
    mobileNavPage: mobileNavPageReducer,
    shipmentParcelsList: shipmentParcelsListReducer,
    shipmentStatus: shipmentStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
