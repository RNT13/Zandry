'use client'
import Loading from '@/app/loading'
import { useAuth } from '@/hooks/api/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardRedirect() {
  const router = useRouter()
  const { isHydrated, isAuthenticated, companySlug } = useAuth()

  useEffect(() => {
    if (!isHydrated) return
    if (!isAuthenticated) { router.replace('/login'); return }
    if (companySlug) { router.replace(`/${companySlug}/dashboard`); return }
    // fallback: sem slug, mostra algo genérico ou erro
  }, [isHydrated, isAuthenticated, companySlug, router])

  return <Loading />
}
