import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storageSession from 'redux-persist/lib/storage/session';

import clientsReducer from './slices/clientsSlice';

import parcelsReducer from './slices/parcelsSlice';
import parcelsToUploadReducer from './slices/parcelsToUploadSlice';

import mobileNavPageReducer from './slices/mobileNavMenuSlice';

import shipmentsReducer from './slices/shipmentsSlice';
import shipmentParcelsListReducer from './slices/shipmentParcelsListSlice';
import shipmentStatusReducer from './slices/shipmentStatusSlice';

import shipmentRequestsModalReducer from './slices/shipmentRequestModalSlice';

import shipmentsLogReducer from './slices/shipmentsLogSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: [
    'clients',
    'parcels',
    'shipments_log',
    'shipmentStatus',
    'shipmentsModal',
  ],
};

const rootReducer = combineReducers({
  clients: clientsReducer,
  parcels: parcelsReducer,
  parcelsToUpload: parcelsToUploadReducer,
  shipments: shipmentsReducer,
  shipments_log: shipmentsLogReducer,
  mobileNavPage: mobileNavPageReducer,
  shipmentParcelsList: shipmentParcelsListReducer,
  shipmentStatus: shipmentStatusReducer,
  shipmentsModal: shipmentRequestsModalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
