import { RefreshResponse } from '@/types/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from '../slices/authSlice'
import type { RootState } from '../store'

/* ======================================================
   BASE QUERY
====================================================== */
const baseQuery = fetchBaseQuery({
  //exemplo de baseUrl de endpoint
  baseUrl: 'https://url-base.com/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})

/* ======================================================
   BASE QUERY COM REFRESH
====================================================== */
const baseQueryWithReauth: typeof baseQuery = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra)

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        //exemplo de endpoint de refresh
        url: 'api/token/refresh/',
        method: 'POST'
      },
      api,
      extra
    )

    if (refreshResult.data) {
      const { access } = refreshResult.data as RefreshResponse

      api.dispatch(setCredentials({ token: access }))
      result = await baseQuery(args, api, extra)
    } else {
      api.dispatch(logout())

      //força o app a "resetar"
      window.location.href = '/'
    }
  }

  return result
}

/* ======================================================
   API SLICE
====================================================== */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,

  tagTypes: ['adicione aqui seus tagTypes'],

  endpoints: builder => ({
    //exemplo de endpoint
    auth: builder.query({
      query: () => ({
        url: 'api/token/',
        method: 'POST'
      })
    })
  })
})

/* ======================================================
    EXPORT HOOKS
====================================================== */
export const {
  //exemplo de endpoint
  useAuthQuery
} = apiSlice
