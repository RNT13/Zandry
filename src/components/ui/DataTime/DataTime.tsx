'use client'

import { useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FaLock } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'

import { usePublicAvailability } from '@/hooks/api/usePublicAvailability'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch'
import {
  selectBookingProfessional,
  selectBookingService,
  setSlot,
} from '@/redux/slices/bookingSlice'
import { CenterDiv, MinorTextH4, Row, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { ApiDay, DisplayDay, DisplaySlot } from '@/types/types'
import { buildUIDay, countAvailableSlots, getSlotLabel } from '@/utils/dataTimeUtils'
import { MButton } from '../MaskedButton/MaskedButton'
import {
  AvailabilitySummary,
  DataContainer,
  DataTimeContainer,
  DataTimeContent,
  DayItem,
  DaysContainer,
  DurationTag,
  LockIcon,
  ServiceBadge,
  SlotEndTime,
  SlotLabel,
  SlotStartTime,
  TimeContainer,
  TimeItem,
  TodayDot,
} from './DataTime.styles'

export default function DataTime() {
  const { push } = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()

  const slugParam = params.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam

  const selectedService = useAppSelector(selectBookingService)
  const selectedProfessional = useAppSelector(selectBookingProfessional)

  const canFetch = Boolean(slug && selectedService?.uid && selectedProfessional?.uid)

  const { availability, isLoading, isError, refetch } = usePublicAvailability({
    slug,
    serviceUid: selectedService?.uid,
    professionalUid: selectedProfessional?.uid,
  })

  // Dia e horário selecionados pelo usuário
  const [selectedDayDate, setSelectedDayDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // ---------------------------------------------------------------------------
  // Dias disponíveis
  // ---------------------------------------------------------------------------

  /**
   * Converte os dias da API em DisplayDay e filtra apenas os dias abertos,
   * limitando a 7 dias na grade de seleção.
   */
  const days: DisplayDay[] = useMemo(() => {
    if (!availability?.days?.length) return []
    return (availability.days as ApiDay[])
      .map(buildUIDay)
      .filter((day) => day.isOpen)
      .slice(0, 7)
  }, [availability])

  /**
   * Data efetiva: respeita a seleção do usuário, mas cai de volta
   * para o primeiro dia disponível se a seleção não existir na lista.
   */
  const effectiveDayDate = useMemo(() => {
    if (!days.length) return null
    if (selectedDayDate && days.some((day) => day.date === selectedDayDate)) {
      return selectedDayDate
    }
    return days[0].date
  }, [days, selectedDayDate])

  const effectiveDay: DisplayDay | null = useMemo(() => {
    if (!effectiveDayDate) return null
    return days.find((day) => day.date === effectiveDayDate) ?? null
  }, [days, effectiveDayDate])

  // ---------------------------------------------------------------------------
  // Slots do dia selecionado
  // ---------------------------------------------------------------------------

  /**
   * Todos os slots do dia ativo (livres e ocupados).
   * Cada slot já é um bloco completo: .time → .ends_at.
   */
  const allSlots: DisplaySlot[] = useMemo(() => effectiveDay?.slots ?? [], [effectiveDay])

  /** Apenas os slots que o usuário pode clicar e confirmar. */
  const availableSlots: DisplaySlot[] = useMemo(
    () => allSlots.filter((slot) => slot.isSelectable),
    [allSlots],
  )

  /**
   * Slot selecionado pelo usuário.
   * Se nenhum foi escolhido ainda, pré-seleciona o primeiro disponível.
   * Se o usuário trocou de dia, reseta para o primeiro do novo dia.
   */
  const selectedSlot: DisplaySlot | null = useMemo(() => {
    if (!allSlots.length) return null

    // Usuário clicou em um horário explicitamente
    if (selectedTime) {
      const found = allSlots.find(
        (slot) => slot.date === effectiveDay?.date && slot.time === selectedTime,
      )
      // Se o horário selecionado está disponível, usa ele; senão, cai para o primeiro
      if (found?.isSelectable) return found
    }

    // Pré-seleciona o primeiro slot disponível do dia
    return availableSlots[0] ?? null
  }, [allSlots, availableSlots, effectiveDay?.date, selectedTime])

  /**
   * Último slot disponível do dia — recebe destaque visual
   * para indicar ao usuário que a agenda está quase lotada.
   */
  const lastAvailableSlot: DisplaySlot | null = useMemo(() => {
    if (availableSlots.length <= 1) return null
    return availableSlots[availableSlots.length - 1]
  }, [availableSlots])

  // ---------------------------------------------------------------------------
  // Estado do botão Confirmar
  // ---------------------------------------------------------------------------

  /**
   * O botão fica desabilitado se não há slot selecionado ou o slot
   * escolhido não é selecionável (ex: usuário forçou via estado externo).
   */
  const confirmDisabled = !effectiveDay || !selectedSlot || !selectedSlot.isSelectable

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleBack = () => push(`/${slug}/servicos/profissional`)

  const handleNext = () => {
    if (confirmDisabled || !effectiveDay || !selectedSlot) return

    dispatch(
      setSlot({
        date: effectiveDay.date,
        time: selectedSlot.time,
        available: true,
        free: true,
        busy: false,
        conflict: false,
      }),
    )

    push(`/${slug}/servicos/profissional/horario/confirmar`)
  }

  const handleSelectDay = (date: string) => {
    // Ao trocar de dia, reseta o horário selecionado
    setSelectedDayDate(date)
    setSelectedTime(null)
  }

  const handleSelectTime = (slot: DisplaySlot) => {
    if (!slot.isSelectable) return
    setSelectedTime(slot.time)
  }

  // ---------------------------------------------------------------------------
  // Guard renders
  // ---------------------------------------------------------------------------

  if (!canFetch) {
    return (
      <CenterDiv>
        <TitleH3>Selecione serviço e profissional antes de escolher data e horário.</TitleH3>
        <MButton $variant="default" onClick={() => push(`/${slug}/servicos/profissional`)}>
          Ir para profissionais
        </MButton>
      </CenterDiv>
    )
  }

  if (isLoading) {
    return (
      <CenterDiv>
        <TitleH3>Carregando horários...</TitleH3>
      </CenterDiv>
    )
  }

  if (isError) {
    return (
      <CenterDiv>
        <TitleH3>Não foi possível carregar os horários.</TitleH3>
        <MButton $variant="default" onClick={() => refetch()}>
          Tentar novamente
        </MButton>
      </CenterDiv>
    )
  }

  // ---------------------------------------------------------------------------
  // Render principal
  // ---------------------------------------------------------------------------

  const availableCount = countAvailableSlots(allSlots)

  return (
    <DataTimeContainer>
      <DataTimeContent>
        {/* Cabeçalho */}
        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.1}>
          <Row>
            <MButton
              $variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            />
            <TitleH2>Data e horário</TitleH2>
          </Row>
        </MAnimation>

        {/* Badges de serviço e profissional */}
        {selectedService && selectedProfessional && (
          <>
            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.15}>
              <ServiceBadge>
                <span>{selectedService.name}</span>
                {selectedService.duration && (
                  <DurationTag>{selectedService.duration} min</DurationTag>
                )}
              </ServiceBadge>
            </MAnimation>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.3}>
              <ServiceBadge>
                <span>{selectedProfessional.full_name}</span>
                {selectedProfessional.position && (
                  <DurationTag>{selectedProfessional.position}</DurationTag>
                )}
              </ServiceBadge>
            </MAnimation>
          </>
        )}

        <DataContainer>
          {/* ── Seleção de dia ── */}
          <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.2}>
            <TitleH3>Escolha o dia</TitleH3>
          </MAnimation>

          <DaysContainer>
            {days.length === 0 ? (
              <TitleH3>Nenhum horário disponível nos próximos dias.</TitleH3>
            ) : (
              days.map((day, i) => (
                <MAnimation
                  key={day.date}
                  variant="revealFadeInRight"
                  trigger="mount"
                  delay={i * 0.1}
                  center
                >
                  <DayItem
                    $isActive={day.date === effectiveDay?.date}
                    onClick={() => handleSelectDay(day.date)}
                  >
                    {day.isToday && (
                      <TodayDot $isActive={day.date === effectiveDay?.date} />
                    )}
                    <TitleH2>{day.dayNumber}</TitleH2>
                    <TitleH3>{day.weekdayShort}</TitleH3>
                  </DayItem>
                </MAnimation>
              ))
            )}
          </DaysContainer>

          {/* ── Seleção de horário ── */}
          <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.2}>
            <TitleH3>Escolha o horário</TitleH3>
          </MAnimation>

          {/* Resumo de disponibilidade do dia */}
          {allSlots.length > 0 && (
            <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.25}>
              <AvailabilitySummary>
                {availableCount > 0
                  ? `${availableCount} horário${availableCount !== 1 ? 's' : ''} disponível${availableCount !== 1 ? 'is' : ''} neste dia`
                  : 'Nenhum horário disponível neste dia'}
              </AvailabilitySummary>
            </MAnimation>
          )}

          {allSlots.length === 0 ? (
            <MinorTextH4>Nenhum horário disponível para este dia.</MinorTextH4>
          ) : (
            <TimeContainer>
              {allSlots.map((slot, i) => {

                const isSelected =
                  selectedSlot?.date === slot.date && selectedSlot?.time === slot.time

                const isLast =
                  !isSelected &&
                  lastAvailableSlot?.date === slot.date &&
                  lastAvailableSlot?.time === slot.time

                const label = getSlotLabel({ slot, isSelected, isLast })

                return (
                  <MAnimation
                    key={`${slot.date}|${slot.time}`}
                    variant="revealFadeInRight"
                    trigger="mount"
                    delay={i * 0.02}
                  >
                    <TimeItem
                      $isActive={isSelected}
                      $isOccupied={slot.busy}
                      $isLast={isLast}
                      onClick={() => handleSelectTime(slot)}
                      role="button"
                      aria-label={`Horário ${slot.time} até ${slot.ends_at} — ${label}`}
                      aria-pressed={isSelected}
                      aria-disabled={slot.busy}
                    >
                      {/* Ícone de cadeado para slots ocupados */}
                      {slot.busy && (
                        <LockIcon aria-hidden="true">
                          <FaLock />
                        </LockIcon>
                      )}

                      {/* Horário de início (destaque principal) */}
                      <SlotStartTime>{slot.time}</SlotStartTime>

                      {/* Horário de término */}
                      {slot.ends_at && (
                        <SlotEndTime>até {slot.ends_at}</SlotEndTime>
                      )}

                      {/* Label de status */}
                      <SlotLabel>{label}</SlotLabel>
                    </TimeItem>
                  </MAnimation>
                )
              })}
            </TimeContainer>
          )}
        </DataContainer>

        {/* Resumo do intervalo selecionado */}
        {selectedSlot && (
          <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.1}>
            <MinorTextH4>
              Horário selecionado:{' '}
              <strong>
                {selectedSlot.time} até {selectedSlot.ends_at}
              </strong>{' '}
              ({selectedService?.duration} min)
            </MinorTextH4>
          </MAnimation>
        )}

        {/* Botão de confirmação */}
        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.2}>
          <MButton
            $variant="default"
            fullWidth
            state={confirmDisabled ? 'disabled' : 'default'}
            onClick={handleNext}
          >
            Confirmar
          </MButton>
        </MAnimation>
      </DataTimeContent>
    </DataTimeContainer>
  )
}
