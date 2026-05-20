import { generatedApi } from '@/redux/slices/api/generatedApi'

export function usePublicServices(slug?: string) {
  const query = generatedApi.usePublicCompanyServicesListQuery({ slug: slug ?? '' }, { skip: !slug })

  return {
    services: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  }
}
