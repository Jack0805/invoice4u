import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import invoiceReducer from './invoiceSlice';

const persistConfig = {
  key: 'invoice-generator',
  storage,
  whitelist: ['formData', 'createdInvoiceId'], // Only persist these fields
};

const persistedReducer = persistReducer(persistConfig, invoiceReducer);

export const store = configureStore({
  reducer: {
    invoice: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
