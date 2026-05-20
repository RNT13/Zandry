import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch'
import { generatedApi } from '@/redux/slices/api/generatedApi'
import { logout as clearAuth, selectCompanySlug, selectIsAuthenticated, selectIsHydrated, selectUser } from '@/redux/slices/authSlice'

export function useAuth() {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isHydrated = useAppSelector(selectIsHydrated)
  const companySlug = useAppSelector(selectCompanySlug)

  const [login, loginState] = generatedApi.useAuthLoginCreateMutation()
  const [triggerLogout, logoutState] = generatedApi.useAuthLogoutCreateMutation()

  const logout = async () => {
    try {
      await triggerLogout().unwrap()
    } finally {
      dispatch(clearAuth())
    }
  }

  return {
    user,
    isAuthenticated,
    isHydrated,
    companySlug,
    login,
    logout,
    loginState,
    logoutState
  }
}
