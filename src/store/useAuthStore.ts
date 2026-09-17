import { create } from 'zustand'

export type UserRole = 'user' | 'admin'

interface AuthState {
  isAuthenticated: boolean
  role: UserRole | null
  username: string | null
  login: (username: string, role: UserRole) => void
  logout: () => void
}

// Load from localStorage on init
const stored = typeof window !== 'undefined' ? localStorage.getItem('auth') : null
const initial = stored ? JSON.parse(stored) : { isAuthenticated: false, role: null, username: null }

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: initial.isAuthenticated,
  role: initial.role,
  username: initial.username,
  login: (username, role) => {
    const state = { isAuthenticated: true, role, username }
    localStorage.setItem('auth', JSON.stringify(state))
    set(state)
  },
  logout: () => {
    localStorage.removeItem('auth')
    set({ isAuthenticated: false, role: null, username: null })
  },
}))
