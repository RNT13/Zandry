// Tipos de api e erros

export interface ApiErrorResponse {
  success?: boolean
  message?: string | Record<string, string[] | string>
  errors?: Record<string, string[] | string>
  detail?: string // Comum em erros 500 ou 401/403
}

export interface RTKQueryError {
  status: number
  data: ApiErrorResponse
}

// Tipos de dataTime

export type SlotStatus = 'free' | 'busy' | 'conflict'

export type ApiSlot = {
  date: string
  time: string
  ends_at?: string
  available: boolean
  free?: boolean
  busy?: boolean
  conflict?: boolean
  status?: 'free' | 'busy'
}

export type ApiDay = {
  date: string
  label: string
  weekday: string
  is_open: boolean
  slots: ApiSlot[]
}

export type DisplaySlot = ApiSlot & {
  effectiveStatus: SlotStatus
  isSelectable: boolean
}

export type DisplayDay = {
  date: string
  dayNumber: string
  weekdayShort: string
  isToday: boolean
  isOpen: boolean
  slots: DisplaySlot[]
}
