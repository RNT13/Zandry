import { generatedApi } from '@/redux/slices/api/generatedApi'
import { logout as clearAuth, selectCompanySlug, selectIsAuthenticated, selectIsHydrated, selectToken, selectUser } from '@/redux/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../useAppDispatch'

export function useAuth() {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)
  const token = useAppSelector(selectToken)
  const companySlugRedux = useAppSelector(selectCompanySlug)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isHydrated = useAppSelector(selectIsHydrated)

  const [login, loginState] = generatedApi.useAuthLoginCreateMutation()
  const [triggerLogout, logoutState] = generatedApi.useAuthLogoutCreateMutation()

  const shouldFetchMe = isHydrated && Boolean(token)

  const { data: meData, isLoading: isLoadingMe } = generatedApi.useAuthMeRetrieveQuery(undefined, {
    skip: !shouldFetchMe
  })

  const logout = async () => {
    try {
      await triggerLogout().unwrap()
    } finally {
      dispatch(clearAuth())
    }
  }

  return {
    user: meData ?? user,
    companySlug: meData?.company_slug ?? companySlugRedux,
    isAuthenticated,
    isHydrated,
    isLoadingMe,
    login,
    logout,
    loginState,
    logoutState
  }
}
