import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { generatedApi } from './slices/api/generatedApi'
import authReducer from './slices/authSlice'
import bookingReducer from './slices/bookingSlice'
import dashboardReducer from './slices/dashboardSlice'
import registerReducer from './slices/registerSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  register: registerReducer,
  dashboard: dashboardReducer,
  [generatedApi.reducerPath]: generatedApi.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(generatedApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
