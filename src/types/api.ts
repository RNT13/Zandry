import { UserType } from './entities'

export interface RefreshResponse {
  access: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: UserType
  message: string
  access: string
  refresh: string
  success: boolean
}

export interface RegisterRequest {
  id?: number
  email: string
  full_name: string
  username: string
  password: string
  confirm_password: string
}

export interface RegisterResponse {
  message: string
  access: string
  refresh: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiResponse {
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
