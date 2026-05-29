import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'

// rodar o comando npm run generate:api para criar endpoints a partir do schema da API

export const emptyApi = createApi({
  reducerPath: 'generatedApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Dashboard', 'Clients', 'Notifications', 'PublicCompany', 'Plans'],
  endpoints: () => ({})
})
