export interface CompanyType {
  id: string

  name: string
  slug: string
  cnpj: string

  email: string
  phone: string
  category: string

  description: string

  logo: string | null
  banner: string | null

  address: string
  city: string
  state: string

  schedules: string

  advantage1: string
  advantage2: string
  advantage3: string

  created_at: string
  updated_at: string
}
