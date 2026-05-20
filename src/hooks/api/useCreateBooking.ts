import type { PublicCreateBookingRequest } from '@/redux/slices/api/generatedApi'
import { generatedApi } from '@/redux/slices/api/generatedApi'

export function useCreateBooking() {
  const [mutate, state] = generatedApi.usePublicBookingsCreateMutation()

  const createBooking = (payload: PublicCreateBookingRequest) => mutate({ publicCreateBookingRequest: payload }).unwrap()

  return {
    createBooking,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    data: state.data
  }
}
