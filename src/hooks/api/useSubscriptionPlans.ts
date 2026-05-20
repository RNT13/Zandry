import type { SubscriptionPlanReadRead } from '@/redux/slices/api/generatedApi'
import { generatedApi } from '@/redux/slices/api/generatedApi'

export function useSubscriptionPlans() {
  const query = generatedApi.useSubscriptionsPlansListQuery({
    ordering: 'sort_order' // ← campo correto
  })

  return {
    plans: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError
  }
}

// Helper para buscar por code — evita repetir o .find em todo lugar
export function usePlanByCode(plans: SubscriptionPlanReadRead[], code: string) {
  return plans.find(p => p.code === code)
}
