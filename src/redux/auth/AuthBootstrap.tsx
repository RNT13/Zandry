'use client'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import { generatedApi } from '@/redux/slices/api/generatedApi'
import { logout, setHydrated, setToken, setUser } from '@/redux/slices/authSlice'
import { useEffect, useRef } from 'react'

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const attempted = useRef(false)

  useEffect(() => {
    if (attempted.current) return
    attempted.current = true

      ; (async () => {
        const refresh = await dispatch(
          generatedApi.endpoints.authRefreshCreate.initiate()
        ).unwrap().catch(() => null)

        if (!refresh) {
          dispatch(logout())
          dispatch(setHydrated())
          return
        }

        dispatch(setToken(refresh.access))

        const me = await dispatch(
          generatedApi.endpoints.authMeRetrieve.initiate()
        ).unwrap().catch(() => null)

        if (me) {
          dispatch(setUser(me))
        } else {
          dispatch(logout())
        }

        dispatch(setHydrated())
      })().catch(() => {
        dispatch(logout())
        dispatch(setHydrated())
      })
  }, [dispatch])

  return <>{children}</>
}
