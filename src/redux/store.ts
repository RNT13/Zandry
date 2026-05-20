import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { generatedApi } from './slices/api/generatedApi'
import authReducer from './slices/authSlice'
import bookingReducer from './slices/bookingSlice'
import registerReducer from './slices/registerSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  register: registerReducer,
  [generatedApi.reducerPath]: generatedApi.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: gDM => gDM().concat(generatedApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
