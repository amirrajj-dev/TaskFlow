import { create } from 'zustand'
import { getCurrentUser } from '@/actions/auth.action'
import { persist } from 'zustand/middleware'
import { Task, User } from '@/generated/prisma'

type AuthState = {
  user: User & {tasks : Task[]} | null
  isLoggedIn: boolean
  setUser: (user: User & {tasks : Task[]}) => void
  clearUser: () => void
  getUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) =>
        set({
          user,
          isLoggedIn: true
        }),
      clearUser: () =>
        set({
          user: null,
          isLoggedIn: false
        }),
      getUser: async () => {
        const res = await getCurrentUser()
        if (res.success && res.user) {
          set({ user: res.user as any , isLoggedIn: true })
        } else {
          set({ user: null, isLoggedIn: false })
        }
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn })
    }
  )
)