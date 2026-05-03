import {
  RegisterAddressFormData,
  RegisterAdvantagesFormData,
  RegisterBasicFormData,
  RegisterPlanFormData,
  RegisterProfessionalsFormData,
  RegisterSecurityFormData,
  RegisterServicesFormData
} from '@/types/forms'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface RegisterState {
  currentStep: number

  basicData: RegisterBasicFormData
  addressData: RegisterAddressFormData
  advantagesData: RegisterAdvantagesFormData
  servicesData: RegisterServicesFormData[]
  professionalsData: RegisterProfessionalsFormData[]
  securityData: RegisterSecurityFormData
  planData: RegisterPlanFormData
}

const initialState: RegisterState = {
  currentStep: 1,

  basicData: {
    enterprise_name: '',
    cnpj: '',
    email: '',
    phone: '',
    category: '',
    description: ''
  },

  addressData: {
    cep: '',
    address: '',
    city: '',
    state: '',
    number: ''
  },

  advantagesData: {
    opening_hours: [
      {
        week_day: 'Segunda',
        start: '',
        end: '',
        is_open: false
      },
      {
        week_day: 'Terça',
        start: '',
        end: '',
        is_open: false
      },
      {
        week_day: 'Quarta',
        start: '',
        end: '',
        is_open: false
      },
      {
        week_day: 'Quinta',
        start: '',
        end: '',
        is_open: false
      },
      {
        week_day: 'Sexta',
        start: '',
        end: '',
        is_open: false
      },
      {
        week_day: 'Sábado',
        start: '',
        end: '',
        is_open: false
      },
      {
        week_day: 'Domingo',
        start: '',
        end: '',
        is_open: false
      }
    ],

    advantage1: '',
    advantage2: '',
    advantage3: ''
  },

  servicesData: [],

  professionalsData: [],

  securityData: {
    password: '',
    confirm_password: ''
  },

  planData: {
    selected_plan: 'trial',
    trial_days: 0
  }
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    //update enterprise basic data
    updateBasicData(state, action: PayloadAction<RegisterBasicFormData>) {
      state.basicData = action.payload
    },

    //update enterprise address
    updateAddressData(state, action: PayloadAction<RegisterAddressFormData>) {
      state.addressData = action.payload
    },

    //update enterprise advantages end hours
    updateAdvantagesData(state, action: PayloadAction<RegisterAdvantagesFormData>) {
      state.advantagesData = action.payload
    },

    //update services
    updateServicesData(state, action: PayloadAction<RegisterServicesFormData[]>) {
      state.servicesData = action.payload
    },

    // add services
    addServicesData(state, action: PayloadAction<RegisterServicesFormData>) {
      state.servicesData.push(action.payload)
    },

    // remove services
    removeServicesData(state, action: PayloadAction<number>) {
      state.servicesData = state.servicesData.filter(service => service.id !== action.payload)
    },

    //update professionals
    updateProfessionalsData(state, action: PayloadAction<RegisterProfessionalsFormData[]>) {
      state.professionalsData = action.payload
    },

    // add professionals
    addProfessionalsData(state, action: PayloadAction<RegisterProfessionalsFormData>) {
      state.professionalsData.push(action.payload)
    },

    // remove professionals
    removeProfessionalsData(state, action: PayloadAction<number>) {
      state.professionalsData = state.professionalsData.filter(professional => professional.id !== action.payload)
    },

    //update opening hours
    applyWeekDaysHours(state, action: PayloadAction<{ start: string; end: string }>) {
      state.advantagesData.opening_hours = state.advantagesData.opening_hours.map((day, index) => {
        if (index <= 4) {
          return {
            ...day,
            start: action.payload.start,
            end: action.payload.end,
            is_open: true
          }
        }
        return day
      })
    },

    //update opening hours
    applyAllDaysHours(state, action: PayloadAction<{ start: string; end: string }>) {
      state.advantagesData.opening_hours = state.advantagesData.opening_hours.map(day => ({
        ...day,
        start: action.payload.start,
        end: action.payload.end,
        is_open: true
      }))
    },

    updateSecurityData(state, action: PayloadAction<RegisterSecurityFormData>) {
      state.securityData = action.payload
    },

    //update plan
    updatePlanData(state, action: PayloadAction<RegisterPlanFormData>) {
      state.planData = { ...state.planData, ...action.payload }
    },

    //update current step
    nextStep(state) {
      if (state.currentStep < 7) state.currentStep += 1
    },

    prevStep(state) {
      if (state.currentStep > 1) state.currentStep -= 1
    },

    goToStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload
    },

    resetRegister() {
      return initialState
    }
  }
})

export const {
  updateBasicData,
  updateAddressData,
  updateAdvantagesData,
  updateServicesData,
  addServicesData,
  removeServicesData,
  updateProfessionalsData,
  addProfessionalsData,
  removeProfessionalsData,
  applyWeekDaysHours,
  applyAllDaysHours,
  updateSecurityData,
  updatePlanData,
  nextStep,
  prevStep,
  goToStep,
  resetRegister
} = registerSlice.actions

export default registerSlice.reducer

export const selectCurrentStep = (state: RootState) => state.register.currentStep
export const selectBasicData = (state: RootState) => state.register.basicData
export const selectAddressData = (state: RootState) => state.register.addressData
export const selectAdvantagesData = (state: RootState) => state.register.advantagesData
export const selectServicesData = (state: RootState) => state.register.servicesData
export const selectProfessionalsData = (state: RootState) => state.register.professionalsData
export const selectSecurityData = (state: RootState) => state.register.securityData
export const selectPlanData = (state: RootState) => state.register.planData

export const selectRegisterData = (state: RootState) => state.register
