import { generatedApi } from '@/redux/slices/api/generatedApi'

export function usePublicProfessionals(slug?: string, serviceUid?: string) {
  const enabled = Boolean(slug && serviceUid)

  const query = generatedApi.usePublicCompanyServicesProfessionalsListQuery(
    {
      slug: slug ?? '',
      serviceUid: serviceUid ?? ''
    },
    { skip: !enabled }
  )

  return {
    professionals: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  }
}
