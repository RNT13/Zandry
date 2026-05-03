export interface DayTime {
  day: number
  month: number
  label: string
  year: number
  data: string
  time: string
}

export interface OpeningHour {
  week_day: string
  start: string
  end: string
  is_open: boolean
}

export interface PlanFeatureLimit {
  professionals: number | 'unlimited'
  schedules: number | 'unlimited'
  units: number | 'unlimited'
}

export interface RegisterPlanCard {
  id: 'trial' | 'start' | 'pro' | 'business'
  title: string
  subtitle: string
  price: string
  monthly_value: number
  badge?: string
  description: string
  trial_days?: number
  recommended?: boolean
  limits: PlanFeatureLimit
  features: string[]
}
