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
  setSlot
} from '@/redux/slices/bookingSlice'
import { MinorTextH4, Row, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { ApiDay, DisplayDay, DisplaySlot } from '@/types/types'
import { buildUIDay, getSlotLabel, isSlotInsideInterval, minutesToTime, timeToMinutes } from '@/utils/dataTimeUtils'
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

  const days: DisplayDay[] = useMemo(() => {
    if (!availability?.days?.length) return []

    return (availability.days as ApiDay[])
      .map(buildUIDay)
      .filter(day => day.isOpen)
      .slice(0, 7)
  }, [availability])

  const effectiveDayDate = useMemo(() => {
    if (!days.length) return null

    if (selectedDayDate && days.some(day => day.date === selectedDayDate)) {
      return selectedDayDate
    }

    return days[0].date
  }, [days, selectedDayDate])

  const effectiveDay: DisplayDay | null = useMemo(() => {
    if (!effectiveDayDate) return null
    return days.find(day => day.date === effectiveDayDate) ?? null
  }, [days, effectiveDayDate])

  const allSlots: DisplaySlot[] = useMemo(() => {
    return effectiveDay?.slots ?? []
  }, [effectiveDay])

  const availableStartSlots: DisplaySlot[] = useMemo(() => {
    return allSlots.filter(slot => slot.isSelectable)
  }, [allSlots])

  const selectedStartSlot: DisplaySlot | null = useMemo(() => {
    if (!allSlots.length) return null

    if (!selectedTime) {
      return availableStartSlots[0] ?? null
    }

    return allSlots.find(
      slot => slot.date === effectiveDay?.date && slot.time === selectedTime
    ) ?? (availableStartSlots[0] ?? null)
  }, [allSlots, availableStartSlots, effectiveDay?.date, selectedTime])

  const selectedIntervalEnd: string | null = useMemo(() => {
    if (!selectedStartSlot || serviceDuration <= 0) return null
    return minutesToTime(timeToMinutes(selectedStartSlot.time) + serviceDuration)
  }, [selectedStartSlot, serviceDuration])

  const selectedRangeSlots: DisplaySlot[] = useMemo(() => {
    if (!effectiveDay || !selectedStartSlot || !serviceDuration) return []

    return allSlots.filter(slot =>
      slot.date === effectiveDay.date &&
      isSlotInsideInterval(slot.time, selectedStartSlot.time, serviceDuration)
    )
  }, [allSlots, effectiveDay, selectedStartSlot, serviceDuration])

  const selectedRangeHasConflict = useMemo(() => {
    if (!selectedRangeSlots.length) return false
    return selectedRangeSlots.some(slot => slot.busy || slot.conflict)
  }, [selectedRangeSlots])

  const lastAvailableSlot: DisplaySlot | null = useMemo(() => {
    if (!availableStartSlots.length) return null
    return availableStartSlots[availableStartSlots.length - 1]
  }, [availableStartSlots])

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
        available: true,
        free: true,
        busy: false,
        conflict: false
      })
    )

    push(`/${slug}/servicos/profissional/horario/confirmar`)
  }

  const handleSelectDay = (date: string) => {
    if (!days.some(day => day.date === date)) {
      setSelectedDayDate(null)
      setSelectedTime(null)
    } else {
      setSelectedDayDate(date)
      setSelectedTime(null)
    }
  }

  const handleSelectTime = (slot: DisplaySlot) => {
    if (!slot.isSelectable) return
    setSelectedTime(slot.time)
  }

  const confirmDisabled =
    !effectiveDay ||
    !selectedStartSlot ||
    !selectedStartSlot.isSelectable ||
    selectedRangeHasConflict

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
            <>
              {availableStartSlots.length === 0 && (
                <MinorTextH4>
                  Este dia está aberto, mas não há horário suficiente para iniciar um novo
                  agendamento.
                </MinorTextH4>
              )}

              <TimeContainer>
                {allSlots.map((slot, i) => {
                  const isSelectedStart =
                    selectedStartSlot?.date === slot.date &&
                    selectedStartSlot?.time === slot.time

                  const isInSelectedRange =
                    !!selectedStartSlot &&
                    slot.date === effectiveDay?.date &&
                    isSlotInsideInterval(slot.time, selectedStartSlot.time, serviceDuration)

                  const isConflict = (isInSelectedRange && slot.busy) || slot.conflict
                  const isRangeInterval = isInSelectedRange && !slot.busy && !isSelectedStart

                  const isLast =
                    lastAvailableSlot?.date === slot.date &&
                    lastAvailableSlot?.time === slot.time &&
                    !isSelectedStart

                  const slotLabel = getSlotLabel({
                    slot,
                    isSelectedStart,
                    isInSelectedRange
                  })

                  return (
                    <MAnimation
                      key={`${slot.date}|${slot.time}`}
                      variant="revealFadeInRight"
                      trigger="mount"
                      delay={i * 0.02}
                    >
                      <TimeItem
                        $isActive={isSelectedStart || isRangeInterval}
                        $isOccupied={slot.busy && !isConflict}
                        $isConflict={isConflict}
                        $isLast={isLast}
                        onClick={() => handleSelectTime(slot)}
                      >
                        {slot.busy && (
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
            </>
          )}
        </DataContainer>

        {selectedStartSlot && selectedIntervalEnd && (
          <MinorTextH4>
            Intervalo selecionado: {selectedStartSlot.time} até {selectedIntervalEnd}
          </MinorTextH4>
        )}

        {selectedRangeHasConflict && (
          <MinorTextH4>Esse horário não comporta a duração do serviço.</MinorTextH4>
        )}

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
