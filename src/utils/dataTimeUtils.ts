import { ApiDay, ApiSlot, DisplayDay, DisplaySlot, SlotStatus } from '@/types/types'
import { translateWeekday } from './businessHoursUtils'

// ---------------------------------------------------------------------------
// Utilitários de tempo
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Normalização de slot da API → DisplaySlot
//
// No novo modelo o backend já entrega cada slot como um bloco completo:
//   - time    → horário de início  ("09:00")
//   - ends_at → horário de término ("09:30" para 30 min)
//   - busy    → o bloco inteiro está ocupado por algum agendamento
//   - conflict é sempre false (mantido por compatibilidade de tipo)
//
// isSelectable = o usuário pode clicar e confirmar este horário.
// ---------------------------------------------------------------------------

export function normalizeSlot(slot: ApiSlot): DisplaySlot {
  const busy = slot.busy ?? slot.status === 'busy'
  const free = slot.free ?? !busy
  const effectiveStatus: SlotStatus = busy ? 'busy' : 'free'
  const isSelectable = Boolean(slot.available && !busy)

  return {
    ...slot,
    free,
    busy,
    effectiveStatus,
    isSelectable
  }
}

// ---------------------------------------------------------------------------
// Construção do DisplayDay a partir do ApiDay
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// getSlotLabel
//
// Labels exibidos no rodapé de cada card de slot.
// Com o novo modelo os casos são mais simples:
//   - selecionado → slot ativo escolhido pelo usuário
//   - ocupado     → existe um agendamento neste bloco
//   - livre       → bloco disponível para agendamento
// ---------------------------------------------------------------------------

export function getSlotLabel({ slot, isSelected, isLast }: { slot: DisplaySlot; isSelected: boolean; isLast: boolean }): string {
  if (isSelected) return 'selecionado'
  if (slot.busy) return 'ocupado'
  if (isLast) return 'último horário'
  if (slot.available) return 'livre'
  return 'indisponível'
}

// ---------------------------------------------------------------------------
// isSlotInsideInterval
//
// Mantido por compatibilidade — pode ser útil em outros contextos.
// No novo fluxo de DataTime não é mais usado para calcular ranges, pois
// cada slot já representa o bloco completo do serviço.
// ---------------------------------------------------------------------------

export function isSlotInsideInterval(slotTime: string, selectedTime: string, durationMinutes: number): boolean {
  const selectedStart = timeToMinutes(selectedTime)
  const selectedEnd = selectedStart + durationMinutes
  const slotStart = timeToMinutes(slotTime)
  return slotStart >= selectedStart && slotStart < selectedEnd
}

// ---------------------------------------------------------------------------
// countAvailableSlots — helper de UI para exibir contagem
// ---------------------------------------------------------------------------

export function countAvailableSlots(slots: DisplaySlot[]): number {
  return slots.filter(s => s.isSelectable).length
}
