/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Loading from '@/app/loading'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import type {
  AuthAddressRegisterRequest,
  AuthAdvantagesRegisterRequest,
  AuthBusinessHourRegisterRequest,
  AuthCompanyRegisterRequest,
  AuthOwnerRegisterRequestWrite,
  AuthProfessionalRegisterRequest,
  AuthServiceRegisterRequest,
  AuthSubscriptionRegisterRequest,
  CodeEnum,
  RegisterCompanyRequestWrite,
} from '@/redux/slices/api/generatedApi'
import { useAuthRegisterCompanyCreateMutation, useSubscriptionsPlansListQuery } from '@/redux/slices/api/generatedApi'
import { setCredentials } from '@/redux/slices/authSlice'
import {
  goToStep,
  prevStep,
  resetRegister,
  selectAddress,
  selectAdvantages,
  selectBusinessHours,
  selectCompany,
  selectOwner,
  selectProfessionals,
  selectServices,
  selectSubscription,
} from '@/redux/slices/registerSlice'
import { Column, MinorTextH4, TitleH2 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { handleApiError } from '@/utils/handleApiError'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { MButton } from '../../MaskedButton/MaskedButton'
import PlanCards from '../../PlanCards/PlanCards'
import ProgressBar from '../../ProgressBar/ProgressBar'
import {
  RegisterWindowBody,
  RegisterWindowFooter,
  RegisterWindowHeader,
  RegisterWindowWrapper,
} from '../RegisterWindow.styles'

export default function Step07PlanInfo() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { data: plans = [], isLoading: isLoadingPlans } = useSubscriptionsPlansListQuery({})
  const [registerCompany, { isLoading }] = useAuthRegisterCompanyCreateMutation()

  const ownerData = useSelector(selectOwner)
  const companyData = useSelector(selectCompany)
  const addressData = useSelector(selectAddress)
  const advantagesData = useSelector(selectAdvantages)
  const businessHours = useSelector(selectBusinessHours)
  const services = useSelector(selectServices)
  const professionals = useSelector(selectProfessionals)
  const planData = useSelector(selectSubscription)

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      selected_plan: planData.selected_plan as CodeEnum,
    },
    onSubmit: async values => {
      const selectedPlan = values.selected_plan

      const payload: RegisterCompanyRequestWrite = {
        owner: {
          full_name: ownerData.full_name,
          email: ownerData.email,
          phone: ownerData.phone,
          password: ownerData.password,
          confirm_password: ownerData.confirm_password,
        } satisfies AuthOwnerRegisterRequestWrite,

        company: {
          company_name: companyData.company_name,
          cnpj: companyData.cnpj,
          email: companyData.email,
          phone: companyData.phone,
          category: companyData.category,
          description: companyData.description,
        } satisfies AuthCompanyRegisterRequest,

        address: {
          cep: addressData.cep,
          address: addressData.address,
          city: addressData.city,
          state: addressData.state,
          number: addressData.number,
        } satisfies AuthAddressRegisterRequest,

        advantages: {
          advantage1: advantagesData.advantage1,
          advantage2: advantagesData.advantage2,
          advantage3: advantagesData.advantage3,
        } satisfies AuthAdvantagesRegisterRequest,

        business_hours: businessHours.map(day => ({
          week_day: day.week_day,
          start: day.start,
          end: day.end,
          is_open: day.is_open,
        })) satisfies AuthBusinessHourRegisterRequest[],

        services: services.map(service => ({
          uid: service.uid,
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
        })) satisfies AuthServiceRegisterRequest[],

        professionals: professionals.map(professional => ({
          full_name: professional.full_name,
          position: professional.position,
          phone: professional.phone,
          services_ids: professional.services_ids,
        })) satisfies AuthProfessionalRegisterRequest[],

        subscription: {
          selected_plan: selectedPlan,
        } satisfies AuthSubscriptionRegisterRequest,
      }

      try {
        const result = await registerCompany({ registerCompanyRequest: payload }).unwrap()

        dispatch(
          setCredentials({
            token: result.access,
            user: result.user,
          })
        )

        dispatch(resetRegister())

        toast.success('Bem-vindo ao Zandry!')
        router.replace(`/${result.company_slug}/dashboard`)
      } catch (error: any) {
        const message = handleApiError(error)
        toast.error(message)
        console.error('Erro detalhado:', error)
      }
    },
  })

  const currentPlan = plans.find(plan => plan.code === form.values.selected_plan)

  if (isLoading || isLoadingPlans) {
    return (
      <MAnimation variant="revealSoftRevealDown" trigger="mount">
        <TitleH2>{isLoading ? 'Criando sua conta...' : 'Carregando planos...'}</TitleH2>
        <Loading />
      </MAnimation>
    )
  }

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper>
        <RegisterWindowHeader>
          <ProgressBar currentStep={7} totalSteps={7} onStepClick={step => dispatch(goToStep(step))} />
          <MinorTextH4>Navegue pelas etapas anteriores</MinorTextH4>
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>
            <RegisterWindowBody>
              <PlanCards
                selectedPlan={form.values.selected_plan}
                onSelectPlan={planId => form.setFieldValue('selected_plan', planId)}
              />
            </RegisterWindowBody>

            <RegisterWindowFooter>
              <Column>
                <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.1}>
                  <MButton
                    type="button"
                    $variant="outline"
                    fullWidth
                    onClick={() => dispatch(prevStep())}
                    leftIcon={<IoIosArrowBack />}
                  >
                    Voltar
                  </MButton>
                </MAnimation>

                <MAnimation variant="revealSoftRevealDown" trigger="mount" delay={0.2}>
                  <MButton
                    type="submit"
                    $variant="gradient"
                    fullWidth
                    state={!currentPlan ? 'disabled' : 'default'}
                  >
                    Continuar com {currentPlan?.title ?? 'plano selecionado'}
                  </MButton>
                </MAnimation>
              </Column>
            </RegisterWindowFooter>
          </form>
        </FormikProvider>
      </RegisterWindowWrapper>
    </MAnimation>
  )
}
