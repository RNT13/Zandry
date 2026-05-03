import {
  RegisterAddressFormData,
  RegisterAdvantagesFormData,
  RegisterBasicFormData,
  RegisterPlanFormData,
  RegisterProfessionalsFormData,
  RegisterSecurityFormData,
  RegisterServicesFormData
} from './forms'

export interface CreateEnterprisePayload {
  basic_info: RegisterBasicFormData
  address_info: RegisterAddressFormData
  advantages_info: RegisterAdvantagesFormData
  services_info: RegisterServicesFormData[]
  professionals_info: RegisterProfessionalsFormData[]
  security_info: RegisterSecurityFormData
  plan_info: RegisterPlanFormData
}
