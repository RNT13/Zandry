import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './slices/apiSlice'
import authReducer from './slices/authSlice'
import bookingReducer from './slices/bookingSlice'

import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['booking'],
  blacklist: [apiSlice.reducerPath]
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
