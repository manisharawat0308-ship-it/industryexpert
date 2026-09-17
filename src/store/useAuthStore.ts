import { create } from 'zustand'

export type UserRole = 'user' | 'admin'

interface AuthState {
  isAuthenticated: boolean
  role: UserRole | null
  username: string | null
  token: string | null
  expiresAt: string | null
  login: (data: { username: string; role: UserRole; token: string; expiresAt: string }) => void
  logout: () => void
}

// Load from localStorage on init
const stored = typeof window !== 'undefined' ? localStorage.getItem('auth') : null
const initial = stored
  ? JSON.parse(stored)
  : { isAuthenticated: false, role: null, username: null, token: null, expiresAt: null }

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: initial.isAuthenticated,
  role: initial.role,
  username: initial.username,
  token: initial.token ?? null,
  expiresAt: initial.expiresAt ?? null,
  login: ({ username, role, token, expiresAt }) => {
    const state = { isAuthenticated: true, role, username, token, expiresAt }
    localStorage.setItem('auth', JSON.stringify(state))
    set(state)
  },
  logout: () => {
    localStorage.removeItem('auth')
    set({ isAuthenticated: false, role: null, username: null, token: null, expiresAt: null })
  },
}))
