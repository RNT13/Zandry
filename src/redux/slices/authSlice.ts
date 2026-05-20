import type { AuthUserResponse } from '@/redux/slices/api/generatedApi'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  token: string | null
  user: AuthUserResponse | null
  isHydrated: boolean
}

const initialState: AuthState = {
  token: null,
  user: null,
  isHydrated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string | null>) {
      state.token = payload
    },
    setUser(state, { payload }: PayloadAction<AuthUserResponse | null>) {
      state.user = payload
    },
    setCredentials(state, { payload }: PayloadAction<{ token: string; user: AuthUserResponse }>) {
      state.token = payload.token
      state.user = payload.user
    },
    setHydrated(state) {
      state.isHydrated = true
    },
    logout(state) {
      state.token = null
      state.user = null
      state.isHydrated = true
    }
  }
})

export const { setToken, setUser, setCredentials, setHydrated, logout } = authSlice.actions
export default authSlice.reducer

export const selectToken = (s: { auth: AuthState }) => s.auth.token
export const selectUser = (s: { auth: AuthState }) => s.auth.user
export const selectIsHydrated = (s: { auth: AuthState }) => s.auth.isHydrated
export const selectIsAuthenticated = (s: { auth: AuthState }) => !!s.auth.token && !!s.auth.user
export const selectCompanySlug = (s: { auth: AuthState }) => s.auth.user?.company_slug ?? null
