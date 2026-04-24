import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type BookingState = {
  services: Service
  enterprise: Enterprise
  professional: Professional
  user: User
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
    setEnterprise(state, action: PayloadAction<Enterprise>) {
      state.enterprise = action.payload
    },

    setService(state, action: PayloadAction<Service>) {
      state.services = action.payload
    },

    setProfessional(state, action: PayloadAction<Professional>) {
      state.professional = action.payload
    },

    setDateTime(state, action: PayloadAction<DayTime>) {
      state.dayTime = action.payload
    },

    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },

    reset(state) {
      Object.assign(state, initialState)
    }
  }
})

export const { setService, setProfessional, setDateTime, setEnterprise, setUser, reset } = bookingSlice.actions

export default bookingSlice.reducer
