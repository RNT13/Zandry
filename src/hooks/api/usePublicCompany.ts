import { generatedApi } from '@/redux/slices/api/generatedApi'

export function usePublicCompany(slug?: string) {
  const query = generatedApi.usePublicCompanyRetrieveQuery({ slug: slug ?? '' }, { skip: !slug })

  return {
    company: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  }
}
