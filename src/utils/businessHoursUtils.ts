// utils/time.ts — arquivo único para tudo relacionado a tempo e dias

import { BusinessHourRead } from '@/redux/slices/api/generatedApi'

// ─── Constantes de dias ──────────────────────────────────────────────────────

export const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

export type Weekday = (typeof DAY_ORDER)[number]

export const WEEKDAY_PT: Record<string, string> = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
  sunday: 'Domingo'
}

export const WEEKDAY_SHORT_PT: Record<string, string> = {
  monday: 'seg',
  tuesday: 'ter',
  wednesday: 'qua',
  thursday: 'qui',
  friday: 'sex',
  saturday: 'sáb',
  sunday: 'dom'
}

const JS_DAY_MAP: Record<number, string> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday'
}

// ─── Helpers de tempo ────────────────────────────────────────────────────────

export function addMinutes(time: string, minutes: number): string {
  if (!time || time === '--:--') return '--:--'
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + Number(minutes)
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

export function getTodayKey(): string {
  return JS_DAY_MAP[new Date().getDay()]
}

// ─── Tradução de dias ────────────────────────────────────────────────────────

// Normaliza o que vem do Django (pode ser "monday" ou "Segunda-feira")
const PT_TO_EN: Record<string, string> = {
  'segunda-feira': 'monday',
  'terça-feira': 'tuesday',
  'quarta-feira': 'wednesday',
  'quinta-feira': 'thursday',
  'sexta-feira': 'friday',
  sábado: 'saturday',
  domingo: 'sunday'
}

export function translateWeekday(raw: string, short = false): string {
  const map = short ? WEEKDAY_SHORT_PT : WEEKDAY_PT
  const key = raw.toLowerCase()
  if (map[key]) return map[key]
  const normalized = PT_TO_EN[key]
  return normalized ? map[normalized] : raw
}

// ─── Tipos de retorno ────────────────────────────────────────────────────────

export interface OpeningHoursSummary {
  label: string
  start: string
  end: string
  isOpenToday: boolean
  todayLabel: string
}

export interface FormattedDay {
  key: string
  label: string
  start: string
  end: string
  is_open: boolean
  isToday: boolean
}

// ─── Funções de horário de funcionamento ────────────────────────────────────

function getOpenDays(hours: BusinessHourRead[]): string[] {
  return DAY_ORDER.filter(d => hours.find(h => h.week_day === d)?.is_open)
}

function buildLabel(openDays: string[]): string {
  if (!openDays.length) return 'Fechado'

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  const opensAllWeek = weekdays.every(d => openDays.includes(d))
  const opensSaturday = openDays.includes('saturday')
  const opensSunday = openDays.includes('sunday')

  if (opensAllWeek && opensSaturday && opensSunday) return 'Todos os dias'
  if (opensAllWeek && opensSaturday && !opensSunday) return 'Segunda a Sábado'
  if (opensAllWeek && !opensSaturday) return 'Segunda a Sexta'

  // Usa WEEKDAY_SHORT_PT diretamente — sem .slice(0, 3) manual
  return openDays.map(d => WEEKDAY_SHORT_PT[d]).join(', ')
}

export function getOpeningHoursSummary(hours: BusinessHourRead[]): OpeningHoursSummary {
  const todayKey = getTodayKey()

  if (!hours?.length) {
    return {
      label: 'Horário não informado',
      start: '--:--',
      end: '--:--',
      isOpenToday: false,
      todayLabel: WEEKDAY_PT[todayKey]
    }
  }

  const todayHour = hours.find(h => h.week_day === todayKey)
  const isOpenToday = todayHour?.is_open ?? false
  const referenceHour = isOpenToday ? todayHour : hours.find(h => h.is_open)
  const openDays = getOpenDays(hours)

  return {
    label: buildLabel(openDays),
    start: referenceHour?.start ?? '--:--',
    end: referenceHour?.end ?? '--:--',
    isOpenToday,
    todayLabel: WEEKDAY_PT[todayKey]
  }
}

export function getFormattedHours(hours: BusinessHourRead[]): FormattedDay[] {
  const todayKey = getTodayKey()

  return DAY_ORDER.map(key => {
    const found = hours.find(h => h.week_day === key)
    return {
      key,
      label: WEEKDAY_PT[key],
      start: found?.start ?? '--:--',
      end: found?.end ?? '--:--',
      is_open: found?.is_open ?? false,
      isToday: key === todayKey
    }
  })
}
