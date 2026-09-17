// Central API client for the Industry Intelligence Hub backend.
// Base URL comes from VITE_API_URL (set in .env), defaulting to localhost:4000.

const API_BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000'

export interface ApiError {
  status: number
  message: string
}

function authHeaders(): Record<string, string> {
  const stored = localStorage.getItem('auth')
  const token = stored ? (JSON.parse(stored).token as string | undefined) : undefined
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {}),
    },
  })

  let body: any = null
  try {
    body = await res.json()
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const message =
      (body && (body.error?.message || body.error || body.message)) ||
      `Request failed (${res.status})`
    throw { status: res.status, message } as ApiError
  }
  return body as T
}

// ---- Auth ----
export interface LoginResponse {
  token: string
  expiresAt: string
  user: { id: string; username: string; email: string | null; fullName: string | null; role: string }
}

export const api = {
  login: (username: string, password: string) =>
    request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  logout: () => request<{ message: string }>('/auth/logout', { method: 'POST' }),

  // ---- Admin: users ----
  listUsers: () => request<{ users: AdminUser[] }>('/api/admin/users'),

  createUser: (input: {
    username: string
    password: string
    fullName?: string
    email?: string
    role?: 'user' | 'admin'
  }) =>
    request<{ user: unknown }>('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  updateUser: (
    id: string,
    body: { action: 'lock' | 'unlock' | 'resetPassword' | 'setRole'; password?: string; role?: 'user' | 'admin' }
  ) =>
    request<{ message: string }>(`/api/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  // ---- Admin: login events ----
  listLoginEvents: (limit = 200) =>
    request<{ events: LoginEvent[] }>(`/api/admin/login-events?limit=${limit}`),
}

export interface AdminUser {
  id: string
  username: string
  fullName: string | null
  email: string | null
  role: string
  isLocked: boolean
  failedLoginAttempts: number
  lastLoginAt: string | null
  createdAt: string
}

export interface LoginEvent {
  id: string
  userId: string | null
  username: string
  loggedInAt: string
  success: boolean
  ip: string | null
  userAgent: string | null
}

export { API_BASE }
