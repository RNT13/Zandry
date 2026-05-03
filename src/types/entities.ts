export interface EnterpriseType {
  id: number
  name: string
  cnpj: string
  email: string
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
  services: ServiceType[]
  professionals: ProfessionalType[]
}

export interface ServiceType {
  id: number
  name: string
  description: string
  price: number
  duration: number
}

export interface ProfessionalType {
  id: number
  full_name: string
  position: string
  rating: number
}

export interface UserType {
  id: number
  full_name: string
  phone: string
}
