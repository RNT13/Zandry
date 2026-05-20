/* eslint-disable @typescript-eslint/no-explicit-any */
import { emptyApi as api } from './emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    authLoginCreate: build.mutation<AuthLoginCreateApiResponse, AuthLoginCreateApiArg>({
      query: queryArg => ({
        url: `/api/auth/login/`,
        method: 'POST',
        body: queryArg.loginRequestRequest
      })
    }),
    authLogoutCreate: build.mutation<AuthLogoutCreateApiResponse, AuthLogoutCreateApiArg>({
      query: () => ({ url: `/api/auth/logout/`, method: 'POST' })
    }),
    authMeRetrieve: build.query<AuthMeRetrieveApiResponse, AuthMeRetrieveApiArg>({
      query: () => ({ url: `/api/auth/me/` })
    }),
    authRefreshCreate: build.mutation<AuthRefreshCreateApiResponse, AuthRefreshCreateApiArg>({
      query: () => ({ url: `/api/auth/refresh/`, method: 'POST' })
    }),
    authRegisterCompanyCreate: build.mutation<AuthRegisterCompanyCreateApiResponse, AuthRegisterCompanyCreateApiArg>({
      query: queryArg => ({
        url: `/api/auth/register-company/`,
        method: 'POST',
        body: queryArg.registerCompanyRequest
      })
    }),
    clientsList: build.query<ClientsListApiResponse, ClientsListApiArg>({
      query: queryArg => ({
        url: `/api/clients/`,
        params: {
          ordering: queryArg.ordering,
          search: queryArg.search
        }
      })
    }),
    dashboardSummaryRetrieve: build.query<DashboardSummaryRetrieveApiResponse, DashboardSummaryRetrieveApiArg>({
      query: queryArg => ({
        url: `/api/dashboard/summary/`,
        params: {
          days: queryArg.days
        }
      })
    }),
    notificationsInboxList: build.query<NotificationsInboxListApiResponse, NotificationsInboxListApiArg>({
      query: queryArg => ({
        url: `/api/notifications/inbox/`,
        params: {
          ordering: queryArg.ordering,
          search: queryArg.search
        }
      })
    }),
    notificationsPreferencesRetrieve: build.query<NotificationsPreferencesRetrieveApiResponse, NotificationsPreferencesRetrieveApiArg>({
      query: () => ({ url: `/api/notifications/preferences/` })
    }),
    notificationsPreferencesPartialUpdate: build.mutation<
      NotificationsPreferencesPartialUpdateApiResponse,
      NotificationsPreferencesPartialUpdateApiArg
    >({
      query: queryArg => ({
        url: `/api/notifications/preferences/`,
        method: 'PATCH',
        body: queryArg.patchedNotificationPreferenceRequest
      })
    }),
    notificationsReadCreate: build.mutation<NotificationsReadCreateApiResponse, NotificationsReadCreateApiArg>({
      query: queryArg => ({
        url: `/api/notifications/read/`,
        method: 'POST',
        body: queryArg.notificationMarkAsReadRequest
      })
    }),
    publicBookingsCreate: build.mutation<PublicBookingsCreateApiResponse, PublicBookingsCreateApiArg>({
      query: queryArg => ({
        url: `/api/public/bookings/`,
        method: 'POST',
        body: queryArg.publicCreateBookingRequest
      })
    }),
    publicCompanyRetrieve: build.query<PublicCompanyRetrieveApiResponse, PublicCompanyRetrieveApiArg>({
      query: queryArg => ({ url: `/api/public/company/${queryArg.slug}/` })
    }),
    publicCompanyAvailabilityRetrieve: build.query<PublicCompanyAvailabilityRetrieveApiResponse, PublicCompanyAvailabilityRetrieveApiArg>({
      query: queryArg => ({
        url: `/api/public/company/${queryArg.slug}/availability/`,
        params: {
          date: queryArg.date,
          professional_uid: queryArg.professionalUid,
          service_uid: queryArg.serviceUid
        }
      })
    }),
    publicCompanyServicesList: build.query<PublicCompanyServicesListApiResponse, PublicCompanyServicesListApiArg>({
      query: queryArg => ({
        url: `/api/public/company/${queryArg.slug}/services/`
      })
    }),
    publicCompanyServicesProfessionalsList: build.query<
      PublicCompanyServicesProfessionalsListApiResponse,
      PublicCompanyServicesProfessionalsListApiArg
    >({
      query: queryArg => ({
        url: `/api/public/company/${queryArg.slug}/services/${queryArg.serviceUid}/professionals/`
      })
    }),
    schemaRetrieve: build.query<SchemaRetrieveApiResponse, SchemaRetrieveApiArg>({
      query: queryArg => ({
        url: `/api/schema/`,
        params: {
          format: queryArg.format,
          lang: queryArg.lang
        }
      })
    }),
    subscriptionsPlansList: build.query<SubscriptionsPlansListApiResponse, SubscriptionsPlansListApiArg>({
      query: queryArg => ({
        url: `/api/subscriptions/plans/`,
        params: {
          ordering: queryArg.ordering,
          search: queryArg.search
        }
      })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as generatedApi }
export type AuthLoginCreateApiResponse = /** status 200  */ LoginResponse
export type AuthLoginCreateApiArg = {
  loginRequestRequest: LoginRequestRequestWrite
}
export type AuthLogoutCreateApiResponse = unknown
export type AuthLogoutCreateApiArg = void
export type AuthMeRetrieveApiResponse = /** status 200  */ MeResponse
export type AuthMeRetrieveApiArg = void
export type AuthRefreshCreateApiResponse = /** status 200  */ RefreshResponse
export type AuthRefreshCreateApiArg = void
export type AuthRegisterCompanyCreateApiResponse = /** status 201  */ RegisterCompanyResponse
export type AuthRegisterCompanyCreateApiArg = {
  registerCompanyRequest: RegisterCompanyRequestWrite
}
export type ClientsListApiResponse = /** status 200  */ PublicClientResponseRead[]
export type ClientsListApiArg = {
  /** Qual campo usar ao ordenar os resultados. */
  ordering?: string
  /** Um termo de busca. */
  search?: string
}
export type DashboardSummaryRetrieveApiResponse = /** status 200  */ DashboardSummary
export type DashboardSummaryRetrieveApiArg = {
  /** Período em dias para a série diária (1 a 90). Padrão: 7. */
  days?: number
}
export type NotificationsInboxListApiResponse = /** status 200  */ NotificationDeliveryReadRead[]
export type NotificationsInboxListApiArg = {
  /** Qual campo usar ao ordenar os resultados. */
  ordering?: string
  /** Um termo de busca. */
  search?: string
}
export type NotificationsPreferencesRetrieveApiResponse = /** status 200  */ NotificationPreferenceRead
export type NotificationsPreferencesRetrieveApiArg = void
export type NotificationsPreferencesPartialUpdateApiResponse = /** status 200  */ NotificationPreferenceRead
export type NotificationsPreferencesPartialUpdateApiArg = {
  patchedNotificationPreferenceRequest: PatchedNotificationPreferenceRequest
}
export type NotificationsReadCreateApiResponse = unknown
export type NotificationsReadCreateApiArg = {
  notificationMarkAsReadRequest: NotificationMarkAsReadRequest
}
export type PublicBookingsCreateApiResponse = /** status 201  */ PublicBookingResponse
export type PublicBookingsCreateApiArg = {
  publicCreateBookingRequest: PublicCreateBookingRequest
}
export type PublicCompanyRetrieveApiResponse = /** status 200  */ CompanyReadRead
export type PublicCompanyRetrieveApiArg = {
  slug: string
}
export type PublicCompanyAvailabilityRetrieveApiResponse = /** status 200  */ PublicAvailabilityResponse
export type PublicCompanyAvailabilityRetrieveApiArg = {
  date?: string
  professionalUid: string
  serviceUid: string
  slug: string
}
export type PublicCompanyServicesListApiResponse = /** status 200  */ PublicServiceRead[]
export type PublicCompanyServicesListApiArg = {
  slug: string
}
export type PublicCompanyServicesProfessionalsListApiResponse = /** status 200  */ PublicProfessionalBriefRead[]
export type PublicCompanyServicesProfessionalsListApiArg = {
  serviceUid: string
  slug: string
}
export type SchemaRetrieveApiResponse = /** status 200  */ {
  [key: string]: any
}
export type SchemaRetrieveApiArg = {
  format?: 'json' | 'yaml'
  lang?:
    | 'af'
    | 'ar'
    | 'ar-dz'
    | 'ast'
    | 'az'
    | 'be'
    | 'bg'
    | 'bn'
    | 'br'
    | 'bs'
    | 'ca'
    | 'ckb'
    | 'cs'
    | 'cy'
    | 'da'
    | 'de'
    | 'dsb'
    | 'el'
    | 'en'
    | 'en-au'
    | 'en-gb'
    | 'eo'
    | 'es'
    | 'es-ar'
    | 'es-co'
    | 'es-mx'
    | 'es-ni'
    | 'es-ve'
    | 'et'
    | 'eu'
    | 'fa'
    | 'fi'
    | 'fr'
    | 'fy'
    | 'ga'
    | 'gd'
    | 'gl'
    | 'he'
    | 'hi'
    | 'hr'
    | 'hsb'
    | 'hu'
    | 'hy'
    | 'ia'
    | 'id'
    | 'ig'
    | 'io'
    | 'is'
    | 'it'
    | 'ja'
    | 'ka'
    | 'kab'
    | 'kk'
    | 'km'
    | 'kn'
    | 'ko'
    | 'ky'
    | 'lb'
    | 'lt'
    | 'lv'
    | 'mk'
    | 'ml'
    | 'mn'
    | 'mr'
    | 'ms'
    | 'my'
    | 'nb'
    | 'ne'
    | 'nl'
    | 'nn'
    | 'os'
    | 'pa'
    | 'pl'
    | 'pt'
    | 'pt-br'
    | 'ro'
    | 'ru'
    | 'sk'
    | 'sl'
    | 'sq'
    | 'sr'
    | 'sr-latn'
    | 'sv'
    | 'sw'
    | 'ta'
    | 'te'
    | 'tg'
    | 'th'
    | 'tk'
    | 'tr'
    | 'tt'
    | 'udm'
    | 'ug'
    | 'uk'
    | 'ur'
    | 'uz'
    | 'vi'
    | 'zh-hans'
    | 'zh-hant'
}
export type SubscriptionsPlansListApiResponse = /** status 200  */ SubscriptionPlanReadRead[]
export type SubscriptionsPlansListApiArg = {
  /** Qual campo usar ao ordenar os resultados. */
  ordering?: string
  /** Um termo de busca. */
  search?: string
}
export type AuthUserResponse = {
  id: string
  email: string
  full_name: string
  role: string
  company_slug?: string | null
}
export type LoginResponse = {
  success: boolean
  message: string
  access: string
  user: AuthUserResponse
}
export type LoginRequestRequest = {
  email: string
  remember_me?: boolean
}
export type LoginRequestRequestWrite = {
  email: string
  password: string
  remember_me?: boolean
}
export type MeResponse = {
  id: string
  email: string
  full_name: string
  role: string
  company_slug?: string | null
}
export type RefreshResponse = {
  access: string
}
export type RegisterCompanyResponse = {
  success: boolean
  message: string
  user: AuthUserResponse
  company_id: string
  company_slug: string
  access: string
  refresh: string
}
export type AuthOwnerRegisterRequest = {
  full_name: string
  email: string
  phone?: string
}
export type AuthOwnerRegisterRequestWrite = {
  full_name: string
  email: string
  phone?: string
  password: string
  confirm_password: string
}
export type AuthCompanyRegisterRequest = {
  company_name: string
  cnpj: string
  email: string
  phone: string
  category: string
  description: string
}
export type AuthAddressRegisterRequest = {
  cep: string
  address: string
  number: string
  city: string
  state: string
}
export type AuthBusinessHourRegisterRequest = {
  week_day: AuthBusinessHourRegisterWeekDayEnum
  start?: string
  end?: string
  is_open?: boolean
}
export type AuthAdvantagesRegisterRequest = {
  advantage1?: string
  advantage2?: string
  advantage3?: string
}
export type AuthServiceRegisterRequest = {
  uid?: string
  name: string
  description?: string
  price: string
  duration: number
}
export type AuthProfessionalRegisterRequest = {
  full_name: string
  position: string
  phone?: string
  services_ids?: string[]
}
export type AuthSubscriptionRegisterRequest = {
  selected_plan: string
}
export type RegisterCompanyRequest = {
  owner: AuthOwnerRegisterRequest
  company: AuthCompanyRegisterRequest
  address: AuthAddressRegisterRequest
  business_hours?: AuthBusinessHourRegisterRequest[]
  advantages: AuthAdvantagesRegisterRequest
  services?: AuthServiceRegisterRequest[]
  professionals?: AuthProfessionalRegisterRequest[]
  subscription: AuthSubscriptionRegisterRequest
}
export type RegisterCompanyRequestWrite = {
  owner: AuthOwnerRegisterRequestWrite
  company: AuthCompanyRegisterRequest
  address: AuthAddressRegisterRequest
  business_hours?: AuthBusinessHourRegisterRequest[]
  advantages: AuthAdvantagesRegisterRequest
  services?: AuthServiceRegisterRequest[]
  professionals?: AuthProfessionalRegisterRequest[]
  subscription: AuthSubscriptionRegisterRequest
}
export type PublicClientResponse = {
  full_name: string
  phone: string
  email?: string | null
  whatsapp_verified?: boolean
  whatsapp_verified_at?: string | null
  notes?: string
}
export type PublicClientResponseRead = {
  uid: string
  full_name: string
  phone: string
  email?: string | null
  whatsapp_verified?: boolean
  whatsapp_verified_at?: string | null
  notes?: string
}
export type DashboardTotals = {
  clients: number
  professionals: number
  services: number
  appointments: number
}
export type DashboardAppointments = {
  today: number
  tomorrow: number
  pending: number
  confirmed: number
  completed: number
  cancelled: number
}
export type DashboardRevenue = {
  completed_count: number
  completed_amount: string
}
export type DashboardDailyPoint = {
  date: string
  total: number
}
export type DashboardSummary = {
  period_days: number
  totals: DashboardTotals
  appointments: DashboardAppointments
  revenue: DashboardRevenue
  recent_daily: DashboardDailyPoint[]
}
export type NotificationDeliveryRead = {
  recipient_type: RecipientTypeEnum
  status?: NotificationDeliveryReadStatusEnum
  read_at?: string | null
  delivered_at?: string | null
  provider_message_id?: string
  error_message?: string
}
export type NotificationSummary = {
  event_key: EventKeyEnum
  channel: ChannelEnum
  title?: string
  body: string
  payload?: any
  status?: NotificationSummaryStatusEnum
  sent_at?: string | null
}
export type NotificationSummaryRead = {
  uid: string
  event_key: EventKeyEnum
  channel: ChannelEnum
  title?: string
  body: string
  payload?: any
  status?: NotificationSummaryStatusEnum
  created_at: string
  sent_at?: string | null
}
export type NotificationDeliveryReadRead = {
  uid: string
  recipient_type: RecipientTypeEnum
  status?: NotificationDeliveryReadStatusEnum
  read_at?: string | null
  delivered_at?: string | null
  provider_message_id?: string
  error_message?: string
  notification: NotificationSummaryRead
  created_at: string
}
export type NotificationPreference = {
  recipient_type: RecipientTypeEnum
  allow_in_app?: boolean
  allow_whatsapp?: boolean
  booking_created?: boolean
  booking_confirmed?: boolean
  booking_cancelled?: boolean
  booking_reminder?: boolean
  subscription_expiring?: boolean
  system_message?: boolean
}
export type NotificationPreferenceRead = {
  uid: string
  recipient_type: RecipientTypeEnum
  allow_in_app?: boolean
  allow_whatsapp?: boolean
  booking_created?: boolean
  booking_confirmed?: boolean
  booking_cancelled?: boolean
  booking_reminder?: boolean
  subscription_expiring?: boolean
  system_message?: boolean
}
export type PatchedNotificationPreferenceRequest = {
  recipient_type?: RecipientTypeEnum
  allow_in_app?: boolean
  allow_whatsapp?: boolean
  booking_created?: boolean
  booking_confirmed?: boolean
  booking_cancelled?: boolean
  booking_reminder?: boolean
  subscription_expiring?: boolean
  system_message?: boolean
}
export type NotificationMarkAsReadRequest = {
  delivery_id: string
}
export type PublicBookingClient = {
  uid: string
  full_name: string
  phone: string
  email?: string | null
}
export type PublicBookingResponse = {
  id: string
  date: string
  time: string
  status: string
  company: string
  company_zip_code: string
  company_address: string
  company_number: string
  service: string
  service_duration: number
  service_price: string
  professional: string
  client: PublicBookingClient
  user_name: string
  user_phone: string
  user_email?: string
}
export type PublicCreateBookingRequest = {
  company_slug: string
  service_uid: string
  professional_uid: string
  date: string
  time: string
  user_name: string
  user_phone: string
  user_email?: string
}
export type CompanyRead = {
  name: string
  slug: string
  rating?: string
  cnpj: string
  email: string
  phone: string
  category: string
  description: string
  cep: string
  address: string
  number: string
  city: string
  state: string
  advantage1?: string
  advantage2?: string
  advantage3?: string
}
export type BusinessHourRead = {
  week_day: BusinessHourReadWeekDayEnum
  start?: string
  end?: string
  is_open?: boolean
}
export type CompanyReadRead = {
  id: string
  name: string
  slug: string
  rating?: string
  cnpj: string
  email: string
  phone: string
  category: string
  description: string
  logo: string | null
  banner: string | null
  cep: string
  address: string
  number: string
  city: string
  state: string
  advantage1?: string
  advantage2?: string
  advantage3?: string
  business_hours: BusinessHourRead[]
}
export type PublicSlotResponse = {
  date: string
  time: string
  available: boolean
}
export type PublicDayAvailabilityResponse = {
  date: string
  label: string
  weekday: string
  is_open: boolean
  slots: PublicSlotResponse[]
}
export type PublicAvailabilityResponse = {
  days: PublicDayAvailabilityResponse[]
}
export type PublicService = {
  name: string
  description?: string
  price: string
  /** Duração em minutos */
  duration: number
}
export type PublicProfessionalBrief = {
  full_name: string
  position: string
  rating?: string
}
export type PublicProfessionalBriefRead = {
  uid: string
  full_name: string
  position: string
  avatar: string | null
  rating?: string
}
export type PublicServiceRead = {
  uid: string
  name: string
  description?: string
  price: string
  /** Duração em minutos */
  duration: number
  professionals: PublicProfessionalBriefRead[]
}
export type SubscriptionPlanRead = {
  code: CodeEnum
  name: string
  title?: string | null
  subtitle?: string | null
  description?: string | null
  recommended?: boolean
  coming_soon?: boolean
  monthly_price?: string
  trial_days?: number
  features?: any
  sort_order?: number
}
export type SubscriptionPlanLimits = {
  max_professionals: number
  max_services: number
  max_appointments: number
  allow_chat: boolean
  allow_reports: boolean
  allow_automation: boolean
  allow_full_dashboard: boolean
}
export type SubscriptionPlanReadRead = {
  uid: string
  code: CodeEnum
  name: string
  title?: string | null
  subtitle?: string | null
  description?: string | null
  recommended?: boolean
  coming_soon?: boolean
  monthly_price?: string
  price: string
  trial_days?: number
  features?: any
  limits: SubscriptionPlanLimits
  sort_order?: number
}
export enum AuthBusinessHourRegisterWeekDayEnum {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday'
}
export enum RecipientTypeEnum {
  Owner = 'owner',
  Professional = 'professional',
  Client = 'client',
  Staff = 'staff'
}
export enum NotificationDeliveryReadStatusEnum {
  Pending = 'pending',
  Sent = 'sent',
  Delivered = 'delivered',
  Read = 'read',
  Failed = 'failed'
}
export enum EventKeyEnum {
  BookingCreated = 'booking_created',
  BookingConfirmed = 'booking_confirmed',
  BookingCancelled = 'booking_cancelled',
  BookingReminder = 'booking_reminder',
  SubscriptionExpiring = 'subscription_expiring',
  SystemMessage = 'system_message'
}
export enum ChannelEnum {
  InApp = 'in_app',
  Whatsapp = 'whatsapp'
}
export enum NotificationSummaryStatusEnum {
  Pending = 'pending',
  Queued = 'queued',
  Sent = 'sent',
  Delivered = 'delivered',
  Failed = 'failed'
}
export enum BusinessHourReadWeekDayEnum {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday'
}
export enum CodeEnum {
  Trial = 'trial',
  Start = 'start',
  Pro = 'pro',
  Business = 'business'
}
export const {
  useAuthLoginCreateMutation,
  useAuthLogoutCreateMutation,
  useAuthMeRetrieveQuery,
  useAuthRefreshCreateMutation,
  useAuthRegisterCompanyCreateMutation,
  useClientsListQuery,
  useDashboardSummaryRetrieveQuery,
  useNotificationsInboxListQuery,
  useNotificationsPreferencesRetrieveQuery,
  useNotificationsPreferencesPartialUpdateMutation,
  useNotificationsReadCreateMutation,
  usePublicBookingsCreateMutation,
  usePublicCompanyRetrieveQuery,
  usePublicCompanyAvailabilityRetrieveQuery,
  usePublicCompanyServicesListQuery,
  usePublicCompanyServicesProfessionalsListQuery,
  useSchemaRetrieveQuery,
  useSubscriptionsPlansListQuery
} = injectedRtkApi
