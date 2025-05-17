import { create } from 'zustand'
import { getCurrentUser } from '@/actions/auth.action'
import { persist } from 'zustand/middleware'
import { User } from '@/generated/prisma'

type AuthState = {
  user: Partial<User> | null
  isLoggedIn: boolean
  setUser: (user: User) => void
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
          set({ user: res.user, isLoggedIn: true })
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