'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const {getUser} = useAuthStore()

  useEffect(() => {
    getUser()
  }, [getUser])

  return <>{children}</>
}