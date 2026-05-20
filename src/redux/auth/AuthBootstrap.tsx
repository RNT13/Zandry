'use client'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import { generatedApi } from '@/redux/slices/api/generatedApi'
import { setHydrated, setToken } from '@/redux/slices/authSlice'
import { useEffect, useRef } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL!

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const attempted = useRef(false)

  useEffect(() => {
    if (attempted.current) return
    attempted.current = true

      ; (async () => {
        try {
          const r = await fetch(`${API}/api/auth/refresh/`, {
            method: 'POST',
            credentials: 'include'
          })

          if (r.ok) {
            const { access } = await r.json()
            dispatch(setToken(access))

            await dispatch(
              generatedApi.endpoints.authMeRetrieve.initiate()
            ).unwrap().catch(() => { })
          }
        } catch {
        } finally {
          dispatch(setHydrated())
        }
      })()
  }, [dispatch])

  return <>{children}</>
}
