import { CompanyType } from './company.types'
import { ProfessionalType } from './professional.types'
import { ServiceType } from './service.types'

export interface CompanyDetailsResponse {
  company: CompanyType
  services: ServiceType[]
  professionals: ProfessionalType[]
}

export interface DashboardCompanyResponse {
  company: CompanyType

  stats: {
    total_services: number
    total_professionals: number
    total_appointments: number
    monthly_revenue: number
  }

  subscription: {
    plan: string
    status: string
    expires_at: string
  }
}
