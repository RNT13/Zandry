'use client'

import { FormikProvider, useFormik } from 'formik'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useSelector } from 'react-redux'
import * as yup from 'yup'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import {
  AuthAdvantagesRegisterRequest,
  AuthBusinessHourRegisterRequest,
  AuthBusinessHourRegisterWeekDayEnum
} from '@/redux/slices/api/generatedApi'
import {
  goToStep,
  nextStep,
  prevStep,
  selectAdvantages,
  selectBusinessHours,
  updateAdvantages,
  updateBusinessHours
} from '@/redux/slices/registerSlice'

import { Column, MinorTextH4, Row, TitleH2 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { MButton } from '../../MaskedButton/MaskedButton'
import { FormikMInput } from '../../MaskedInput/FormikMaskedInput'
import ProgressBar from '../../ProgressBar/ProgressBar'
import {
  RegisterColumn,
  RegisterRow,
  RegisterWindowBody,
  RegisterWindowFooter,
  RegisterWindowHeader,
  RegisterWindowWrapper
} from '../RegisterWindow.styles'

type ScheduleType = 'weekdays' | 'all_days' | 'custom' | ''

const DEFAULT_WEEK_DAYS: AuthBusinessHourRegisterRequest[] = [
  { week_day: AuthBusinessHourRegisterWeekDayEnum.Monday, start: '', end: '', is_open: false },
  { week_day: AuthBusinessHourRegisterWeekDayEnum.Tuesday, start: '', end: '', is_open: false },
  { week_day: AuthBusinessHourRegisterWeekDayEnum.Wednesday, start: '', end: '', is_open: false },
  { week_day: AuthBusinessHourRegisterWeekDayEnum.Thursday, start: '', end: '', is_open: false },
  { week_day: AuthBusinessHourRegisterWeekDayEnum.Friday, start: '', end: '', is_open: false },
  { week_day: AuthBusinessHourRegisterWeekDayEnum.Saturday, start: '', end: '', is_open: false },
  { week_day: AuthBusinessHourRegisterWeekDayEnum.Sunday, start: '', end: '', is_open: false }
]

const WEEKDAY_LABELS: Record<AuthBusinessHourRegisterWeekDayEnum, string> = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
  sunday: 'Domingo'
}

const isValidTime = (value?: string) => {
  if (!value || value.length < 5) return false
  const [hours, minutes] = value.split(':').map(Number)
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59
}

const businessHourSchema = yup.object({
  week_day: yup
    .mixed<AuthBusinessHourRegisterWeekDayEnum>()
    .required('Dia da semana obrigatório'),

  is_open: yup.boolean().required(),

  start: yup.string().when('is_open', {
    is: true,
    then: schema =>
      schema
        .required('Horário de abertura obrigatório')
        .test('horario-valido', 'Horário inválido', value => isValidTime(value))
  }),

  end: yup.string().when('is_open', {
    is: true,
    then: schema =>
      schema
        .required('Horário de fechamento obrigatório')
        .test('horario-valido', 'Horário inválido', value => isValidTime(value))
        .test('maior-que-abertura', 'Fechamento deve ser após abertura', function (value) {
          const { start } = this.parent
          if (!value || !start) return true
          return value > start
        })
  })
})

const validationSchema = yup.object({
  default_start: yup.string().test('horario-valido', 'Horário inválido', value => {
    if (!value) return true
    return isValidTime(value)
  }),

  default_end: yup.string().test('horario-valido', 'Horário inválido', value => {
    if (!value) return true
    return isValidTime(value)
  }),

  schedule_type: yup.string().required('Selecione uma opção de funcionamento'),

  business_hours: yup.array().of(businessHourSchema).required(),

  advantages: yup.object({
    advantage1: yup.string().optional(),
    advantage2: yup.string().optional(),
    advantage3: yup.string().optional()
  })
})

function getScheduleType(hours: AuthBusinessHourRegisterRequest[]): ScheduleType {
  if (!hours.length) return ''

  const allDaysOpen = hours.length === 7 && hours.every(day => day.is_open)
  if (allDaysOpen) return 'all_days'

  const weekdaysOpen = hours.slice(0, 5).every(day => day.is_open)
  const weekendClosed = hours.slice(5).every(day => !day.is_open)

  if (weekdaysOpen && weekendClosed) return 'weekdays'

  return 'custom'
}

export default function Step04AdvantagesInfo() {
  const dispatch = useAppDispatch()

  const advantagesData = useSelector(selectAdvantages)
  const openingHours = useSelector(selectBusinessHours)

  const safeBusinessHours = useMemo(
    () => (openingHours?.length ? openingHours : DEFAULT_WEEK_DAYS),
    [openingHours]
  )

  const savedDefault = useMemo(() => {
    const firstOpen = openingHours?.find(day => day.is_open && day.start && day.end)
    return {
      start: firstOpen?.start ?? '',
      end: firstOpen?.end ?? ''
    }
  }, [openingHours])

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      default_start: savedDefault.start,
      default_end: savedDefault.end,
      schedule_type: getScheduleType(openingHours ?? []),
      business_hours: safeBusinessHours,
      advantages: advantagesData
    },
    validationSchema,
    onSubmit: values => {
      dispatch(updateAdvantages(values.advantages as AuthAdvantagesRegisterRequest))
      dispatch(updateBusinessHours(values.business_hours as AuthBusinessHourRegisterRequest[]))
      dispatch(nextStep())
    }
  })

  const defaultStart = form.values.default_start
  const defaultEnd = form.values.default_end

  const applyToRange = (predicate: (_: AuthBusinessHourRegisterRequest, i: number) => boolean) => {
    if (!defaultStart || !defaultEnd) return

    const updated = form.values.business_hours.map((day, i) => {
      if (!predicate(day, i)) return day
      return { ...day, start: defaultStart, end: defaultEnd, is_open: true }
    })

    form.setFieldValue('business_hours', updated)
  }

  const handleApplyWeekDays = () => {
    form.setFieldValue('schedule_type', 'weekdays')
    applyToRange((_, i) => i <= 4)
  }

  const handleApplyAllDays = () => {
    form.setFieldValue('schedule_type', 'all_days')
    applyToRange(() => true)
  }

  const handleCustom = () => {
    form.setFieldValue('schedule_type', 'custom')
  }

  const handleToggleDay = (index: number) => {
    const updated = form.values.business_hours.map((day, i) => {
      if (i !== index) return day

      const isOpen = !day.is_open
      return {
        ...day,
        is_open: isOpen,
        start: isOpen ? (day.start || defaultStart || '') : '',
        end: isOpen ? (day.end || defaultEnd || '') : ''
      }
    })

    form.setFieldValue('business_hours', updated)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors = await form.validateForm()

    if (errors.schedule_type) {
      toast.error(errors.schedule_type)
      return
    }

    form.handleSubmit()
  }

  return (
    <MAnimation variant="revealSoftRevealDown" trigger="mount">
      <RegisterWindowWrapper>
        <RegisterWindowHeader>
          <ProgressBar
            currentStep={4}
            totalSteps={7}
            onStepClick={step => dispatch(goToStep(step))}
          />
          <MinorTextH4>Navegue pelas etapas anteriores</MinorTextH4>
        </RegisterWindowHeader>

        <FormikProvider value={form}>
          <form onSubmit={handleSubmit}>
            <RegisterWindowBody>
              <TitleH2>Horário de Funcionamento</TitleH2>
              <MinorTextH4>
                Defina o horário principal do seu negócio. Depois você poderá ajustar se necessário.
              </MinorTextH4>

              <RegisterRow>
                <Column>
                  <FormikMInput
                    required
                    variant="masked"
                    mask="00:00"
                    name="default_start"
                    id="default_start"
                    label="Abre às"
                    placeholder="08:00"
                  />
                </Column>
                <Column>
                  <FormikMInput
                    required
                    variant="masked"
                    mask="00:00"
                    name="default_end"
                    id="default_end"
                    label="Fecha às"
                    placeholder="18:00"
                  />
                </Column>
              </RegisterRow>

              <TitleH2>Selecione a opção de funcionamento</TitleH2>

              <Row>
                <MButton
                  type="button"
                  $variant="default"
                  fullWidth
                  $isActive={form.values.schedule_type === 'weekdays'}
                  onClick={handleApplyWeekDays}
                >
                  Meu negócio funciona de Segunda a Sexta
                </MButton>

                <MButton
                  type="button"
                  $variant="default"
                  fullWidth
                  $isActive={form.values.schedule_type === 'all_days'}
                  onClick={handleApplyAllDays}
                >
                  Meu negócio funciona Todos os Dias
                </MButton>
              </Row>

              <MButton
                type="button"
                $variant="default"
                fullWidth
                $isActive={form.values.schedule_type === 'custom'}
                onClick={handleCustom}
              >
                Quero personalizar dia por dia
              </MButton>

              <MAnimation
                variant="controlledDrawer"
                trigger="controlled"
                isOn={form.values.schedule_type === 'custom'}
              >
                {form.values.business_hours.map((day, index) => (
                  <RegisterColumn key={day.week_day}>
                    <RegisterRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <TitleH2>{WEEKDAY_LABELS[day.week_day]}</TitleH2>

                      <MButton
                        type="button"
                        $variant="toggle"
                        $isActive={!!day.is_open}
                        $toggleLabel={day.is_open ? 'Aberto' : 'Fechado'}
                        onClick={() => handleToggleDay(index)}
                      />
                    </RegisterRow>

                    <Row>
                      <FormikMInput
                        disabled={!day.is_open}
                        variant="masked"
                        mask="00:00"
                        name={`business_hours[${index}].start`}
                        id={`start-${index}`}
                        label="Abre"
                        placeholder={day.is_open ? (day.start || '08:00') : 'Fechado'}
                      />
                      <FormikMInput
                        disabled={!day.is_open}
                        variant="masked"
                        mask="00:00"
                        name={`business_hours[${index}].end`}
                        id={`end-${index}`}
                        label="Fecha"
                        placeholder={day.is_open ? (day.end || '18:00') : 'Fechado'}
                      />
                    </Row>
                  </RegisterColumn>
                ))}
              </MAnimation>

              <TitleH2>Diferenciais do seu negócio</TitleH2>

              <FormikMInput
                variant="default"
                name="advantages.advantage1"
                id="advantage1"
                label="Diferencial 1"
                placeholder="Ex: Atendimento rápido"
              />
              <FormikMInput
                variant="default"
                name="advantages.advantage2"
                id="advantage2"
                label="Diferencial 2"
                placeholder="Ex: Profissionais certificados"
              />
              <FormikMInput
                variant="default"
                name="advantages.advantage3"
                id="advantage3"
                label="Diferencial 3"
                placeholder="Ex: Ambiente climatizado"
              />
            </RegisterWindowBody>

            <RegisterWindowFooter>
              <Row>
                <Column>
                  <MButton
                    $variant="outline"
                    fullWidth
                    type="button"
                    onClick={() => dispatch(prevStep())}
                    leftIcon={<IoIosArrowBack />}
                  >
                    Voltar
                  </MButton>
                </Column>
                <Column>
                  <MButton
                    $variant="gradient"
                    fullWidth
                    type="submit"
                    rightIcon={<IoIosArrowForward />}
                  >
                    Próximo
                  </MButton>
                </Column>
              </Row>
            </RegisterWindowFooter>
          </form>
        </FormikProvider>
      </RegisterWindowWrapper>
    </MAnimation>
  )
}
