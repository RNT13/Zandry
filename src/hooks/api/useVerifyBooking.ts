import { useCallback } from 'react'

import { AppointmentVerificationRequestRequest, usePublicBookingsVerifyCreateMutation } from '@/redux/slices/api/generatedApi'

export function useVerifyBooking() {
  const [verifyBookingMutation, state] = usePublicBookingsVerifyCreateMutation()

  const verifyBooking = useCallback(
    async (token: string) => {
      const payload: AppointmentVerificationRequestRequest = {
        token
      }

      return verifyBookingMutation({
        appointmentVerificationRequestRequest: payload
      }).unwrap()
    },
    [verifyBookingMutation]
  )

  return {
    verifyBooking,
    ...state
  }
}
