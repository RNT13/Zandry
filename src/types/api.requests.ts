export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  id?: number
  email: string
  full_name: string
  username: string
  password: string
  confirm_password: string
}
