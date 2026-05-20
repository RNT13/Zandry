import {
  AuthAddressRegisterRequest,
  AuthAdvantagesRegisterRequest,
  AuthBusinessHourRegisterRequest,
  AuthCompanyRegisterRequest,
  AuthOwnerRegisterRequestWrite,
  AuthProfessionalRegisterRequest,
  AuthServiceRegisterRequest,
  AuthSubscriptionRegisterRequest,
  CodeEnum
} from '@/redux/slices/api/generatedApi'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type ServiceDraft = AuthServiceRegisterRequest & {
  uid: string
}

type ProfessionalDraft = AuthProfessionalRegisterRequest & {
  uid: string
}

export type RegisterWizardState = {
  currentStep: number
  owner: AuthOwnerRegisterRequestWrite
  company: AuthCompanyRegisterRequest
  address: AuthAddressRegisterRequest
  advantages: AuthAdvantagesRegisterRequest
  businessHours: AuthBusinessHourRegisterRequest[]
  services: ServiceDraft[]
  professionals: ProfessionalDraft[]
  subscription: AuthSubscriptionRegisterRequest
}

const TOTAL_STEPS = 7

const initialState: RegisterWizardState = {
  currentStep: 1,

  owner: {
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  },

  company: {
    company_name: '',
    cnpj: '',
    email: '',
    phone: '',
    category: '',
    description: ''
  },

  address: {
    cep: '',
    address: '',
    number: '',
    city: '',
    state: ''
  },

  advantages: {
    advantage1: '',
    advantage2: '',
    advantage3: ''
  },

  businessHours: [],

  services: [],

  professionals: [],

  subscription: {
    selected_plan: CodeEnum.Trial
  }
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    nextStep(state) {
      if (state.currentStep < TOTAL_STEPS) state.currentStep += 1
    },

    prevStep(state) {
      if (state.currentStep > 1) state.currentStep -= 1
    },

    goToStep(state, action: PayloadAction<number>) {
      const step = action.payload
      if (step >= 1 && step <= TOTAL_STEPS) {
        state.currentStep = step
      }
    },

    updateOwner(state, action: PayloadAction<AuthOwnerRegisterRequestWrite>) {
      state.owner = action.payload
    },

    updateCompany(state, action: PayloadAction<AuthCompanyRegisterRequest>) {
      state.company = action.payload
    },

    updateAddress(state, action: PayloadAction<AuthAddressRegisterRequest>) {
      state.address = action.payload
    },

    updateAdvantages(state, action: PayloadAction<AuthAdvantagesRegisterRequest>) {
      state.advantages = action.payload
    },

    updateBusinessHours(state, action: PayloadAction<AuthBusinessHourRegisterRequest[]>) {
      state.businessHours = action.payload
    },

    updateBusinessHourByIndex(state, action: PayloadAction<{ index: number; data: Partial<AuthBusinessHourRegisterRequest> }>) {
      const { index, data } = action.payload
      if (state.businessHours[index]) {
        state.businessHours[index] = {
          ...state.businessHours[index],
          ...data
        }
      }
    },

    addService(state, action: PayloadAction<ServiceDraft>) {
      state.services.push(action.payload)
    },

    updateService(state, action: PayloadAction<{ uid: string; data: Partial<ServiceDraft> }>) {
      const { uid, data } = action.payload
      const index = state.services.findIndex(service => service.uid === uid)

      if (index !== -1) {
        state.services[index] = {
          ...state.services[index],
          ...data
        }
      }
    },

    removeService(state, action: PayloadAction<string>) {
      state.services = state.services.filter(service => service.uid !== action.payload)
    },

    addProfessional(state, action: PayloadAction<ProfessionalDraft>) {
      state.professionals.push(action.payload)
    },

    updateProfessional(state, action: PayloadAction<{ uid: string; data: Partial<ProfessionalDraft> }>) {
      const { uid, data } = action.payload
      const index = state.professionals.findIndex(professional => professional.uid === uid)

      if (index !== -1) {
        state.professionals[index] = {
          ...state.professionals[index],
          ...data
        }
      }
    },

    removeProfessional(state, action: PayloadAction<string>) {
      state.professionals = state.professionals.filter(professional => professional.uid !== action.payload)
    },

    updateSubscription(state, action: PayloadAction<AuthSubscriptionRegisterRequest>) {
      state.subscription = action.payload
    },

    selectPlan(state, action: PayloadAction<CodeEnum>) {
      state.subscription.selected_plan = action.payload
    },

    resetRegister() {
      return initialState
    }
  }
})

export const {
  nextStep,
  prevStep,
  goToStep,
  updateOwner,
  updateCompany,
  updateAddress,
  updateAdvantages,
  updateBusinessHours,
  updateBusinessHourByIndex,
  addService,
  updateService,
  removeService,
  addProfessional,
  updateProfessional,
  removeProfessional,
  updateSubscription,
  selectPlan,
  resetRegister
} = registerSlice.actions

export default registerSlice.reducer

export const selectCurrentStep = (state: RootState) => state.register.currentStep
export const selectOwner = (state: RootState) => state.register.owner
export const selectCompany = (state: RootState) => state.register.company
export const selectAddress = (state: RootState) => state.register.address
export const selectAdvantages = (state: RootState) => state.register.advantages
export const selectBusinessHours = (state: RootState) => state.register.businessHours
export const selectServices = (state: RootState) => state.register.services
export const selectProfessionals = (state: RootState) => state.register.professionals
export const selectSubscription = (state: RootState) => state.register.subscription

export const selectWizardProgress = (state: RootState) => Math.round((state.register.currentStep / TOTAL_STEPS) * 100)
