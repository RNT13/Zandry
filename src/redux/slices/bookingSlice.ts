import type { PublicBookingResponse, PublicProfessionalBriefRead, PublicServiceRead, PublicSlotResponse } from '@/redux/slices/api/generatedApi'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type BookingCompanyRef = {
  id: string
  slug: string
  company_name: string
}

type BookingUser = {
  user_name: string
  user_phone: string
  user_email?: string
}

type BookingState = {
  company: BookingCompanyRef | null
  service: PublicServiceRead | null
  professional: PublicProfessionalBriefRead | null
  slot: PublicSlotResponse | null
  user: BookingUser | null
  confirmation: PublicBookingResponse | null
}

const initialState: BookingState = {
  company: null,
  service: null,
  professional: null,
  slot: null,
  user: null,
  confirmation: null
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCompanyRef(state, action: PayloadAction<BookingCompanyRef>) {
      state.company = action.payload
      state.service = null
      state.professional = null
      state.slot = null
      state.user = null
      state.confirmation = null
    },
    setService(state, action: PayloadAction<PublicServiceRead>) {
      state.service = action.payload
      state.professional = null
      state.slot = null
    },
    setProfessional(state, action: PayloadAction<PublicProfessionalBriefRead>) {
      state.professional = action.payload
      state.slot = null
    },
    setSlot(state, action: PayloadAction<PublicSlotResponse>) {
      state.slot = action.payload
    },
    setUser(state, action: PayloadAction<BookingUser>) {
      state.user = action.payload
    },
    setConfirmation(state, action: PayloadAction<PublicBookingResponse>) {
      state.confirmation = action.payload
    },
    resetBooking() {
      return initialState
    }
  }
})

export const { setCompanyRef, setService, setProfessional, setSlot, setUser, setConfirmation, resetBooking } = bookingSlice.actions

export default bookingSlice.reducer

export const selectBookingCompany = (s: RootState) => s.booking.company
export const selectBookingService = (s: RootState) => s.booking.service
export const selectBookingProfessional = (s: RootState) => s.booking.professional
export const selectBookingUser = (s: RootState) => s.booking.user
export const selectBookingSlot = (s: RootState) => s.booking.slot
export const selectBookingConfirmation = (s: RootState) => s.booking.confirmation

export const selectBookingPayload = (s: RootState) => {
  const { company, service, professional, slot, user } = s.booking
  if (!company || !service || !professional || !slot || !user) return null

  return {
    company_slug: company.slug,
    service_uid: service.uid,
    professional_uid: professional.uid,
    date: slot.date,
    time: slot.time,
    user_name: user.user_name,
    user_phone: user.user_phone,
    ...(user.user_email ? { user_email: user.user_email } : {})
  }
}
