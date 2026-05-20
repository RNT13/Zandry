import { generatedApi } from '@/redux/slices/api/generatedApi'

type Params = {
  slug?: string
  serviceUid?: string
  professionalUid?: string
  date?: string
}

export function usePublicAvailability({ slug, serviceUid, professionalUid, date }: Params) {
  const enabled = Boolean(slug && serviceUid && professionalUid)

  const query = generatedApi.usePublicCompanyAvailabilityRetrieveQuery(
    {
      slug: slug ?? '',
      serviceUid: serviceUid ?? '',
      professionalUid: professionalUid ?? '',
      ...(date ? { date } : {})
    },
    {
      skip: !enabled,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      pollingInterval: 10000 // 10 seconds
    }
  )

  return {
    availability: query.data,
    days: query.data?.days ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  }
}
