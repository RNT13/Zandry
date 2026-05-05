import { OpeningHour } from './common'

export interface RegisterBasicFormData {
  enterprise_name: string
  cnpj: string
  email: string
  phone: string
  category: string
  description: string
}

export interface RegisterAddressFormData {
  cep: string
  address: string
  city: string
  state: string
  number: string
}

export interface RegisterAdvantagesFormData {
  opening_hours: OpeningHour[]
  advantage1: string
  advantage2: string
  advantage3: string
}

export interface RegisterServicesFormData {
  id: string
  name: string
  description: string
  price: number
  duration: number
}

export interface RegisterProfessionalsFormData {
  id: string
  full_name: string
  position: string
  service_ids: number[]
}

export interface RegisterSecurityFormData {
  password: string
  confirm_password: string
}

export interface RegisterPlanFormData {
  selected_plan: 'trial' | 'start' | 'pro' | 'business'
  trial_days: number
}
