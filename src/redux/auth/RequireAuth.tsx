'use client'
import { useAppSelector } from '@/hooks/useAppDispatch'
import { selectIsAuthenticated, selectIsHydrated } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isHydrated = useAppSelector(selectIsHydrated)
  const isAuth = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    if (isHydrated && !isAuth) router.replace('/login')
  }, [isHydrated, isAuth, router])

  if (!isHydrated) return null  // aguarda bootstrap — evita flash
  if (!isAuth) return null  // redirect em andamento
  return <>{children}</>
}
