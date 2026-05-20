import { generatedApi } from '@/redux/slices/api/generatedApi'

export function useDashboardSummary(days = 7) {
  const query = generatedApi.useDashboardSummaryRetrieveQuery({ days })

  return {
    summary: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  }
}
