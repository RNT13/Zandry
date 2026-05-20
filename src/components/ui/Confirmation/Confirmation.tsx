'use client'

import { useCreateBooking } from '@/hooks/api/useCreateBooking'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import {
  selectBookingCompany,
  selectBookingProfessional,
  selectBookingService,
  selectBookingSlot,
  setConfirmation,
  setUser
} from '@/redux/slices/bookingSlice'
import { MinorTextH4, Row, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { addMinutes } from '@/utils/business-hours'
import { FormikProvider, useFormik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { MButton } from '../MaskedButton/MaskedButton'
import { FormikMInput } from '../MaskedInput/FormikMaskedInput'
import {
  ConfirmationContainer,
  ConfirmationContent,
  ConfirmationDiv,
  ConfirmationInfo,
  ConfirmationRow,
  TotalDiv
} from './Confirmation.styles'

const validationSchema = yup.object({
  user_name: yup
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .required('Nome é obrigatório'),

  user_phone: yup
    .string()
    .min(14, 'Telefone inválido')
    .required('Telefone é obrigatório'),

  user_email: yup.string().email('E-mail inválido').optional(),
})

export default function Confirmation() {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

  const company = useSelector(selectBookingCompany)
  const service = useSelector(selectBookingService)
  const professional = useSelector(selectBookingProfessional)
  const slot = useSelector(selectBookingSlot)

  const { createBooking, isLoading } = useCreateBooking()

  const companySlug = company?.slug ?? slug

  const timeStart = slot?.time ?? '--:--'
  const timeEnd = service?.duration
    ? addMinutes(timeStart, Number(service.duration))
    : null

  const formattedDate = slot?.date
    ? new Date(slot.date + 'T00:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    : '--'

  const hasBookingData = Boolean(companySlug && service && professional && slot)

  const form = useFormik({
    initialValues: {
      user_name: '',
      user_phone: '',
      user_email: '',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (!companySlug || !service || !professional || !slot) return

      try {
        const payload = await createBooking({
          company_slug: companySlug,
          service_uid: service.uid,
          professional_uid: professional.uid,
          date: slot.date,
          time: slot.time,
          user_name: values.user_name,
          user_phone: values.user_phone,
          ...(values.user_email ? { user_email: values.user_email } : {})
        })

        dispatch(setConfirmation(payload))
        dispatch(
          setUser({
            user_name: values.user_name,
            user_phone: values.user_phone,
            user_email: values.user_email
          })
        )

        push(`/${slug}/servicos/profissional/horario/confirmar/confirmado`)
      } catch {
        toast.error('Erro ao confirmar. O horário pode ter sido reservado. Tente outro.')
      }
    },
  })

  const handleBack = () => push(`/${slug}/servicos/profissional/horario`)

  const canSubmit = hasBookingData && form.isValid && form.dirty && !isLoading

  return (
    <ConfirmationContainer>
      <ConfirmationContent>
        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.1}>
          <Row>
            <MButton
              $variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            />
            <TitleH2>Confirme seus dados</TitleH2>
          </Row>
        </MAnimation>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>
            <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.2}>
              <ConfirmationDiv>
                <FormikMInput
                  required
                  name="user_name"
                  id="user_name"
                  label="Nome completo"
                  variant="default"
                  placeholder="Seu nome completo"
                />
              </ConfirmationDiv>
            </MAnimation>

            <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.3}>
              <ConfirmationDiv>
                <FormikMInput
                  required
                  name="user_phone"
                  id="user_phone"
                  label="Telefone"
                  variant="masked"
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                />
              </ConfirmationDiv>
            </MAnimation>

            <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.4}>
              <ConfirmationDiv>
                <FormikMInput
                  name="user_email"
                  id="user_email"
                  label="E-mail"
                  variant="default"
                  placeholder="seu@email.com"
                />
              </ConfirmationDiv>
            </MAnimation>

            <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.5}>
              <ConfirmationInfo>
                <TitleH2>Detalhes do agendamento</TitleH2>

                <ConfirmationRow>
                  <TitleH3>Serviço</TitleH3>
                  <MinorTextH4>{service?.name ?? '--'}</MinorTextH4>
                </ConfirmationRow>

                <ConfirmationRow>
                  <TitleH3>Profissional</TitleH3>
                  <MinorTextH4>{professional?.full_name ?? 'Profissional disponível'}</MinorTextH4>
                </ConfirmationRow>

                <ConfirmationRow>
                  <TitleH3>Data</TitleH3>
                  <MinorTextH4>{formattedDate}</MinorTextH4>
                </ConfirmationRow>

                <ConfirmationRow>
                  <TitleH3>Horário</TitleH3>
                  <MinorTextH4>
                    {timeStart}
                    {timeEnd ? ` até ${timeEnd}` : ''}
                    {service?.duration ? ` · ${service.duration} min` : ''}
                  </MinorTextH4>
                </ConfirmationRow>

                <TotalDiv>
                  <TitleH2>Total</TitleH2>
                  <TitleH2>
                    {service?.price != null
                      ? `R$ ${Number(service.price).toFixed(2).replace('.', ',')}`
                      : '--'}
                  </TitleH2>
                </TotalDiv>
              </ConfirmationInfo>
            </MAnimation>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.6}>
              <MButton
                type="submit"
                $variant="default"
                fullWidth
                state={canSubmit ? 'default' : 'disabled'}
              >
                {isLoading ? 'Confirmando...' : 'Confirmar atendimento'}
              </MButton>
            </MAnimation>
          </form>
        </FormikProvider>
      </ConfirmationContent>
    </ConfirmationContainer>
  )
}
