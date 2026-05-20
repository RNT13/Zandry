import { RootState } from '@/redux/store'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { logout, setToken } from '../authSlice'
import { RefreshResponse } from './generatedApi'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL.endsWith('/') ? API_URL : `${API_URL}/`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  }
})

const NO_REFRESH_PATHS = [
  '/api/public/',
  '/api/schema/',
  '/api/auth/login/',
  '/api/auth/register-company/',
  '/api/auth/refresh/',
  '/api/subscriptions/plans/'
]

function getRequestUrl(args: string | { url: string }) {
  return typeof args === 'string' ? args : args.url
}

function shouldSkipRefresh(url: string) {
  return NO_REFRESH_PATHS.some(prefix => url.startsWith(prefix))
}

export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  const url = getRequestUrl(args)

  if (result.error?.status === 401 && !shouldSkipRefresh(url)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          {
            url: 'api/auth/refresh/',
            method: 'POST'
          },
          api,
          extraOptions
        )

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
