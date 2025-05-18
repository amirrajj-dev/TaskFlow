'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useTaskStore } from '@/store/task.store'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const {getUser} = useAuthStore()
  const {getUserTasks} = useTaskStore()
  useEffect(() => {
    getUser()
    getUserTasks()
  }, [getUser])

  return <>{children}</>
}