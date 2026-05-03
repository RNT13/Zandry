import { UserType } from '@/types/entities'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: UserType | null
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken
      }
      if (action.payload.user) {
        state.user = action.payload.user
      }
    },

    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },

    logout: state => {
      state.token = null
      state.refreshToken = null
      state.user = null

      if (typeof window !== 'undefined') {
        localStorage.removeItem('refreshToken')
      }
    }
  }
})

export const { setCredentials, setUser, logout } = authSlice.actions
export default authSlice.reducer

export const selectToken = (state: RootState) => state.auth.token
export const selectUser = (state: RootState) => state.auth.user
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken
