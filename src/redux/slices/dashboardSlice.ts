import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DashboardState {
  isLoading: boolean
}

const initialState: DashboardState = {
  isLoading: false
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload
    }
  }
})

export const { setIsLoading } = dashboardSlice.actions
export default dashboardSlice.reducer

export const selectIsLoading = (s: { dashboard: DashboardState }) => s.dashboard.isLoading
