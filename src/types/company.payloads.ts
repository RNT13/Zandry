import {
  RegisterAddressFormData,
  RegisterAdvantagesFormData,
  RegisterBasicFormData,
  RegisterPlanFormData,
  RegisterProfessionalsFormData,
  RegisterSecurityFormData,
  RegisterServicesFormData
} from './forms.formdata'

export interface CreateEnterprisePayload {
  basic_info: RegisterBasicFormData
  address_info: RegisterAddressFormData
  advantages_info: RegisterAdvantagesFormData
  services_info: RegisterServicesFormData[]
  professionals_info: RegisterProfessionalsFormData[]
  security_info: RegisterSecurityFormData
  plan_info: RegisterPlanFormData
}

export interface UpdateCompanyPayload {
  name?: string
  phone?: string
  category?: string
  description?: string

  logo?: string | null
  banner?: string | null

  address?: string
  city?: string
  state?: string

  schedules?: string

  advantage1?: string
  advantage2?: string
  advantage3?: string
}
