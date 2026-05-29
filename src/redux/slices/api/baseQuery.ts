import { logout, setToken } from '@/redux/slices/authSlice'
import type { RootState } from '@/redux/store'
import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import type { RefreshResponse } from './generatedApi'

const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_URL ?? 'http://localhost:8000'
const mutex = new Mutex()

const PUBLIC_PATHS = ['/api/public/', '/api/schema/', '/api/subscriptions/plans/', '/api/auth/login/', '/api/auth/register-company/']

const NO_REFRESH_PATHS = ['/api/auth/login/', '/api/auth/logout/', '/api/auth/refresh/', '/api/auth/register-company/']

function getRequestUrl(args: string | FetchArgs) {
  return typeof args === 'string' ? args : args.url
}

function isPublicPath(url: string) {
  return PUBLIC_PATHS.some(prefix => url.startsWith(prefix))
}

function shouldSkipRefresh(url: string) {
  return NO_REFRESH_PATHS.some(prefix => url.startsWith(prefix))
}

const baseQuery = fetchBaseQuery({
  baseUrl: DJANGO_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  const url = getRequestUrl(args)

  if (isPublicPath(url)) {
    return baseQuery(args, api, extraOptions)
  }

  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401 && !shouldSkipRefresh(url)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery({ url: '/api/auth/refresh/', method: 'POST' }, api, extraOptions)

        if (refreshResult.data) {
          const { access } = refreshResult.data as RefreshResponse
          api.dispatch(setToken(access))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
