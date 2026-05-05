import { DayTime } from '@/types/common'
import { CompanyType } from '@/types/company.types'
import { ProfessionalType } from '@/types/professional.types'
import { ServiceType } from '@/types/service.types'
import { UserType } from '@/types/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type BookingState = {
  services: ServiceType
  enterprise: CompanyType
  professional: ProfessionalType
  user: UserType
  dayTime: DayTime
}

const initialState: BookingState = {
  services: {
    id: '0',
    name: '',
    price: 0,
    description: '',
    duration: 0,
    company_id: '',
    created_at: '',
    updated_at: ''
  },
  enterprise: {
    id: '0',
    name: '',
    cnpj: '',
    email: '',
    category: '',
    state: '',
    city: '',
    description: '',
    phone: '',
    logo: '',
    banner: '',
    slug: '',
    address: '',
    schedules: '',
    advantage1: '',
    advantage2: '',
    advantage3: '',
    created_at: '',
    updated_at: ''
  },
  professional: {
    id: '0',
    full_name: '',
    position: '',
    rating: 0,
    company_id: '',
    avatar: null,
    phone: '',
    created_at: '',
    updated_at: ''
  },
  user: {
    id: '0',
    full_name: '',
    phone: '',
    email: '',
    created_at: ''
  },
  dayTime: {
    day: 0,
    month: 0,
    label: '',
    year: 0,
    data: '',
    time: ''
  }
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setEnterprise(state, action: PayloadAction<CompanyType>) {
      state.enterprise = action.payload
    },

    setService(state, action: PayloadAction<ServiceType>) {
      state.services = action.payload
    },

    setProfessional(state, action: PayloadAction<ProfessionalType>) {
      state.professional = action.payload
    },

    setDateTime(state, action: PayloadAction<DayTime>) {
      state.dayTime = action.payload
    },

    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload
    },

    reset(state) {
      Object.assign(state, initialState)
    }
  }
})

export const { setService, setProfessional, setDateTime, setEnterprise, setUser, reset } = bookingSlice.actions

export default bookingSlice.reducer

export const selectService = (state: RootState) => state.booking.services
export const selectProfessional = (state: RootState) => state.booking.professional
export const selectEnterprise = (state: RootState) => state.booking.enterprise
export const selectDateTime = (state: RootState) => state.booking.dayTime
export const selectUser = (state: RootState) => state.booking.user
