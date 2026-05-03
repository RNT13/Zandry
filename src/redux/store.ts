import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './slices/apiSlice'

import { persistReducer, persistStore } from 'redux-persist'

import authSlice from './slices/authSlice'
import bookingSlice from './slices/bookingSlice'
import registerSlice from './slices/registerSlice'
import storage from './storage'

const rootReducer = combineReducers({
  auth: authSlice,
  booking: bookingSlice,
  register: registerSlice,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const persistConfig = {
  key: 'zandry-root',
  version: 1,
  storage,
  whitelist: ['auth', 'booking']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
