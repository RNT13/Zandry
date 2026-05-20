'use client'

import { useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FaLock } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'

import { usePublicAvailability } from '@/hooks/api/usePublicAvailability'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch'
import { selectBookingProfessional, selectBookingService, setSlot } from '@/redux/slices/bookingSlice'
import { MinorTextH4, Row, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { translateWeekday } from '@/utils/business-hours'
import { MButton } from '../MaskedButton/MaskedButton'
import {
  DataContainer,
  DataTimeContainer,
  DataTimeContent,
  DayItem,
  DaysContainer,
  DurationTag,
  LockIcon,
  ServiceBadge,
  TimeContainer,
  TimeItem,
  TodayDot
} from './DataTime.styles'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SlotStatus = 'free' | 'busy'

type PublicSlot = {
  date: string
  time: string
  ends_at: string
  available: boolean
  status: SlotStatus
}

type PublicDay = {
  date: string
  label: string
  weekday: string
  is_open: boolean
  slots: PublicSlot[]
}

type UIDay = {
  date: string
  dayNumber: string
  weekdayShort: string
  isToday: boolean
}

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function getLocalDateString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function buildUIDay(day: PublicDay): UIDay {
  const dateObj = new Date(day.date + 'T00:00:00')
  return {
    date: day.date,
    dayNumber: String(dateObj.getDate()),
    weekdayShort: translateWeekday(day.weekday, true),
    isToday: day.date === getLocalDateString()
  }
}

/**
 * Retorna true se o slot está dentro do intervalo [selectedTime, selectedTime + duration).
 * Usa os minutos para comparação exata, sem depender de strings.
 */
function isSlotInsideInterval(
  slotTime: string,
  selectedTime: string,
  durationMinutes: number
): boolean {
  const selectedStart = timeToMinutes(selectedTime)
  const selectedEnd = selectedStart + durationMinutes
  const slotStart = timeToMinutes(slotTime)
  return slotStart >= selectedStart && slotStart < selectedEnd
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
    professionalUid: selectedProfessional?.uid
  })

  const [selectedDayDate, setSelectedDayDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const serviceDuration = Number(selectedService?.duration ?? 0)

  // Dias com pelo menos um slot disponível (available=true), limitado a 7
  const days: UIDay[] = useMemo(() => {
    if (!availability?.days?.length) return []

    return (availability.days as PublicDay[])
      .filter(d => d.is_open && d.slots.some(s => s.available))
      .map(buildUIDay)
      .slice(0, 7)
  }, [availability])

  // Dia efetivo: o selecionado ou o primeiro disponível
  const effectiveDay: UIDay | null = useMemo(() => {
    if (!days.length) return null
    return selectedDayDate
      ? (days.find(d => d.date === selectedDayDate) ?? days[0])
      : days[0]
  }, [days, selectedDayDate])

  // Todos os slots do dia efetivo (inclui busy e free)
  const allSlots: PublicSlot[] = useMemo(() => {
    if (!effectiveDay || !availability?.days) return []
    const day = (availability.days as PublicDay[]).find(d => d.date === effectiveDay.date)
    return day?.slots ?? []
  }, [effectiveDay, availability])

  // Slots cujo início é válido para agendamento (available=true, calculado no back)
  const availableSlots: PublicSlot[] = useMemo(
    () => allSlots.filter(s => s.available),
    [allSlots]
  )

  // Slot de início selecionado. Se nenhum foi clicado, usa o primeiro disponível.
  const selectedStartSlot: PublicSlot | null = useMemo(() => {
    if (!allSlots.length) return availableSlots[0] ?? null
    if (!selectedTime) return availableSlots[0] ?? null
    return allSlots.find(s => s.time === selectedTime && s.date === effectiveDay?.date) ?? null
  }, [allSlots, availableSlots, selectedTime, effectiveDay])

  // Horário de fim do serviço a partir do slot selecionado
  const selectedIntervalEnd: string | null = useMemo(() => {
    if (!selectedStartSlot || serviceDuration <= 0) return null
    return minutesToTime(timeToMinutes(selectedStartSlot.time) + serviceDuration)
  }, [selectedStartSlot, serviceDuration])

  /**
   * Slots que caem dentro do intervalo do serviço selecionado.
   * Usamos `ends_at` do back apenas para exibir; a lógica de intervalo é calculada
   * aqui com `isSlotInsideInterval` para consistência com o passo de 15 min.
   */
  const selectedRangeSlots: PublicSlot[] = useMemo(() => {
    if (!effectiveDay || !selectedStartSlot || !serviceDuration) return []
    return allSlots.filter(slot =>
      slot.date === effectiveDay.date &&
      isSlotInsideInterval(slot.time, selectedStartSlot.time, serviceDuration)
    )
  }, [allSlots, effectiveDay, selectedStartSlot, serviceDuration])

  /**
   * Conflito: algum slot dentro do intervalo selecionado está com status='busy'.
   * O back já garante que `available=false` nesses casos, mas calculamos aqui
   * para feedback visual imediato.
   */
  const selectedRangeHasConflict: boolean = useMemo(() => {
    if (!selectedRangeSlots.length) return false
    return selectedRangeSlots.some(slot => slot.status === 'busy')
  }, [selectedRangeSlots])

  const lastAvailableSlot: PublicSlot | null = useMemo(() => {
    if (!availableSlots.length) return null
    return availableSlots[availableSlots.length - 1]
  }, [availableSlots])

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleBack = () => push(`/${slug}/servicos/profissional`)

  const handleNext = () => {
    if (!effectiveDay || !selectedStartSlot || selectedRangeHasConflict) return

    dispatch(
      setSlot({
        date: effectiveDay.date,
        time: selectedStartSlot.time,
        available: true
      })
    )

    push(`/${slug}/servicos/profissional/horario/confirmar`)
  }

  const handleSelectDay = (date: string) => {
    setSelectedDayDate(date)
    setSelectedTime(null) // limpa horário ao trocar de dia
  }

  const handleSelectTime = (slot: PublicSlot) => {
    if (slot.status === 'busy') return
    setSelectedTime(slot.time)
  }

  // ---------------------------------------------------------------------------
  // Guard renders
  // ---------------------------------------------------------------------------

  if (!canFetch) {
    return (
      <DataTimeContainer>
        <DataTimeContent>
          <TitleH3>Selecione serviço e profissional antes de escolher data e horário.</TitleH3>
          <MButton $variant="default" onClick={() => push(`/${slug}/servicos/profissional`)}>
            Ir para profissionais
          </MButton>
        </DataTimeContent>
      </DataTimeContainer>
    )
  }

  if (isLoading) {
    return (
      <DataTimeContainer>
        <DataTimeContent>
          <TitleH3>Carregando horários...</TitleH3>
        </DataTimeContent>
      </DataTimeContainer>
    )
  }

  if (isError) {
    return (
      <DataTimeContainer>
        <DataTimeContent>
          <TitleH3>Não foi possível carregar os horários.</TitleH3>
          <MButton $variant="default" onClick={() => refetch()}>
            Tentar novamente
          </MButton>
        </DataTimeContent>
      </DataTimeContainer>
    )
  }

  // ---------------------------------------------------------------------------
  // Main render
  // ---------------------------------------------------------------------------

  return (
    <DataTimeContainer>
      <DataTimeContent>
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
          <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.2}>
            <TitleH3>Escolha o dia</TitleH3>
          </MAnimation>

          <DaysContainer>
            {days.length === 0 ? (
              <TitleH3>Nenhum horário disponível nos próximos 7 dias.</TitleH3>
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
                    {day.isToday && <TodayDot $isActive={day.date === effectiveDay?.date} />}
                    <TitleH2>{day.dayNumber}</TitleH2>
                    <TitleH3>{day.weekdayShort}</TitleH3>
                  </DayItem>
                </MAnimation>
              ))
            )}
          </DaysContainer>

          <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.2}>
            <TitleH3>Escolha o horário</TitleH3>
          </MAnimation>

          {allSlots.length === 0 ? (
            <TitleH3>Nenhum horário disponível para este dia.</TitleH3>
          ) : (
            <TimeContainer>
              {allSlots.map((slot, i) => {
                const isBusy = slot.status === 'busy'

                const isSelectedStart =
                  selectedStartSlot?.date === slot.date &&
                  selectedStartSlot?.time === slot.time

                const isInRange =
                  !!selectedStartSlot &&
                  slot.date === effectiveDay?.date &&
                  isSlotInsideInterval(slot.time, selectedStartSlot.time, serviceDuration)

                // Slot dentro do intervalo que está ocupado → conflito visual
                const isConflict = isInRange && isBusy

                // Slot dentro do intervalo que está livre (mas não é o início)
                const isRangeInterval = isInRange && !isBusy && !isSelectedStart

                const isLast =
                  lastAvailableSlot?.date === slot.date &&
                  lastAvailableSlot?.time === slot.time &&
                  !isSelectedStart

                const slotLabel = (() => {
                  if (isConflict) return 'não cabe'
                  if (isBusy) return 'ocupado'
                  if (isSelectedStart) return 'início'
                  if (isRangeInterval) return 'intervalo'
                  if (isLast) return 'último'
                  return 'livre'
                })()

                return (
                  <MAnimation
                    key={`${slot.date}|${slot.time}`}
                    variant="revealFadeInRight"
                    trigger="mount"
                    delay={i * 0.02}
                  >
                    <TimeItem
                      $isActive={isSelectedStart || isRangeInterval}
                      $isOccupied={isBusy && !isConflict}
                      $isConflict={isConflict}
                      $isLast={isLast}
                      onClick={() => handleSelectTime(slot)}
                    >
                      {isBusy && (
                        <LockIcon aria-hidden="true">
                          <FaLock />
                        </LockIcon>
                      )}

                      <TitleH3>{slot.time}</TitleH3>
                      <MinorTextH4>{slotLabel}</MinorTextH4>
                    </TimeItem>
                  </MAnimation>
                )
              })}
            </TimeContainer>
          )}
        </DataContainer>

        {selectedStartSlot && selectedIntervalEnd && (
          <MinorTextH4>
            Intervalo selecionado: {selectedStartSlot.time} até {selectedIntervalEnd}
          </MinorTextH4>
        )}

        {selectedRangeHasConflict && (
          <MinorTextH4>
            Esse horário não comporta a duração do serviço.
          </MinorTextH4>
        )}

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.2}>
          <MButton
            $variant="default"
            fullWidth
            state={
              !effectiveDay || !selectedStartSlot || selectedRangeHasConflict
                ? 'disabled'
                : 'default'
            }
            onClick={handleNext}
          >
            Confirmar
          </MButton>
        </MAnimation>
      </DataTimeContent>
    </DataTimeContainer>
  )
}
