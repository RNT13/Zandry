'use client'

import Loading from '@/app/loading'
import { MButton } from '@/components/ui/MaskedButton/MaskedButton'
import { useAuth } from '@/hooks/api/useAuth'
import { useDashboardSummary } from '@/hooks/api/useDashboardSummary'
import { usePublicCompany } from '@/hooks/api/usePublicCompany'
import { useRouter } from 'next/navigation'
import { DashboardContainer, DashboardContent } from './Dashboard.styles'

export default function Dashboard() {
  const { push } = useRouter()

  const { user, companySlug, logout } = useAuth()
  const { company, isLoading: isCompanyLoading } = usePublicCompany(companySlug ? companySlug : '')
  const { summary, isLoading: isSummaryLoading } = useDashboardSummary(7)

  if (isCompanyLoading || isSummaryLoading) {
    return <Loading />
  }

  return (
    <DashboardContainer>
      <DashboardContent>
        <h1>Dashboard</h1>

        <h2>{user?.full_name}</h2>
        <h2>{user?.email}</h2>
        <h2>{user?.role}</h2>

        <h3>Empresa</h3>
        <p>{company?.name ?? 'Carregando...'}</p>
        <p>https://zandry.vercel.app/{company?.slug ?? companySlug ?? '--'}</p>

        <h3>Métricas</h3>
        <pre>{JSON.stringify(summary, null, 2)}</pre>

        <div>
          <MButton $variant="default" onClick={() => logout()}>
            Logout
          </MButton>

          <MButton $variant="default" onClick={() => push(`/${companySlug}`)}>
            ver empresa
          </MButton>
        </div>
      </DashboardContent>
    </DashboardContainer>
  )
}
