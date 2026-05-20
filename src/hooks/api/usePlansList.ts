import { generatedApi } from '@/redux/slices/api/generatedApi'

export function useSubscriptionsPlansList() {
  const query = generatedApi.useSubscriptionsPlansListQuery({
    ordering: 'sort_order'
  })

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError
  }
}
