import 'styled-components'
import { store } from './src/redux/store'

// Tipagem do Redux
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Tipagem global pro React-Redux + RTK
declare module 'react-redux' {
  type DefaultRootState = RootState
}

declare global {
  interface Enterprise {
    id: number
    name: string
    phone: string
    category: string
    description: string
    logo: string
    banner: string
    slug: string
    address: string
    city: string
    state: string
    schedules: string
    advantage1: string
    advantage2: string
    advantage3: string
    services: Service[]
    professionals: Professional[]
  }

  interface Service {
    id: number
    name: string
    description: string
    price: number
    duration: number
  }

  interface Professional {
    id: number
    full_name: string
    position: string
    rating: number
  }

  interface User {
    id: number
    full_name: string
    phone: string
  }

  interface DayTime {
    day: number
    month: number
    label: string
    year: number
    data: string
    period: string
    time: string
  }

  // -------------------------------------
  // Payloads e Respostas de API
  // -------------------------------------

  interface RefreshResponse {
    access: string
  }

  interface LoginRequest {
    email: string
    password: string
  }

  interface LoginResponse {
    user: User
    message: string
    access: string
    refresh: string
    success: boolean
  }

  interface RegisterRequest {
    id?: number
    email: string
    full_name: string
    username: string
    password: string
    confirm_password: string
  }

  interface RegisterResponse {
    message: string
    access: string
    refresh: string
  }

  interface PaginatedResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
  }

  interface ApiResponse {
    status: number
    data: {
      detail: string
      [key: string]: string
    }
    statusText: string
    message: string
    success: boolean
    error: string
  }
}
