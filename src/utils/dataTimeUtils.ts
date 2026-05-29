import { ApiDay, ApiSlot, DisplayDay, DisplaySlot, SlotStatus } from '@/types/types'
import { translateWeekday } from './businessHoursUtils'

export function getLocalDateString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function normalizeSlot(slot: ApiSlot): DisplaySlot {
  const busy = slot.busy ?? slot.status === 'busy'
  const free = slot.free ?? !busy
  const conflict = slot.conflict ?? (!busy && slot.available === false)
  const effectiveStatus: SlotStatus = busy ? 'busy' : conflict ? 'conflict' : 'free'
  const isSelectable = Boolean(slot.available && !busy && !conflict)

  return {
    ...slot,
    free,
    busy,
    conflict,
    effectiveStatus,
    isSelectable
  }
}

export function buildUIDay(day: ApiDay): DisplayDay {
  const dateObj = new Date(`${day.date}T00:00:00`)

  return {
    date: day.date,
    dayNumber: String(dateObj.getDate()),
    weekdayShort: translateWeekday(day.weekday, true),
    isToday: day.date === getLocalDateString(),
    isOpen: day.is_open,
    slots: day.slots.map(normalizeSlot)
  }
}

/**
 * Retorna true se o slot estiver dentro do intervalo
 * [selectedTime, selectedTime + duration).
 */
export function isSlotInsideInterval(slotTime: string, selectedTime: string, durationMinutes: number): boolean {
  const selectedStart = timeToMinutes(selectedTime)
  const selectedEnd = selectedStart + durationMinutes
  const slotStart = timeToMinutes(slotTime)

  return slotStart >= selectedStart && slotStart < selectedEnd
}

export function getSlotLabel({
  slot,
  isSelectedStart,
  isInSelectedRange
}: {
  slot: DisplaySlot
  isSelectedStart: boolean
  isInSelectedRange: boolean
}): string {
  if (isSelectedStart) return 'início'
  if (isInSelectedRange && slot.busy) return 'conflito'
  if (isInSelectedRange) return 'intervalo'
  if (slot.busy) return 'ocupado'
  if (slot.conflict) return 'não cabe'
  if (slot.available) return 'livre'
  return 'indisponível'
}
