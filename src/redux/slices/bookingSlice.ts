import { DayTime } from '@/types/common'
import { EnterpriseType, ProfessionalType, ServiceType, UserType } from '@/types/entities'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type BookingState = {
  services: ServiceType
  enterprise: EnterpriseType
  professional: ProfessionalType
  user: UserType
  dayTime: DayTime
}

const initialState: BookingState = {
  services: {
    id: 0,
    name: '',
    price: 0,
    description: '',
    duration: 0
  },
  enterprise: {
    id: 0,
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
    services: [],
    professionals: []
  },
  professional: {
    id: 0,
    full_name: '',
    position: '',
    rating: 0
  },
  user: {
    id: 0,
    full_name: '',
    phone: ''
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
    setEnterprise(state, action: PayloadAction<EnterpriseType>) {
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
