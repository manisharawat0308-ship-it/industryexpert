import { create } from 'zustand'

// Frontend-only employee account store. Seeded with the dedicated team members
// so they appear in the Admin > User Management tab and can log in immediately
// without a backend. Persisted to localStorage.
//
// NOTE: This is a client-side store — passwords are stored in the browser and
// this is not a substitute for real backend auth/security.

export type UserRole = 'user' | 'admin'

export interface EmployeeUser {
  id: string
  fullName: string
  username: string
  email: string
  password: string
  role: UserRole
  isLocked: boolean
  createdAt: string
  lastLoginAt: string | null
}

export interface LoginRecord {
  id: string
  username: string
  loggedInAt: string
  success: boolean
}

// ---- Seed data ----------------------------------------------------------
const TEAM: Array<{ fullName: string; role?: UserRole }> = [
  { fullName: 'Deepak Arora', role: 'admin' }, // primary admin
  { fullName: 'Deepak Beniwal' },
  { fullName: 'Astha Jaiswal' },
  { fullName: 'Divya Karmakar' },
  { fullName: 'Aditya Bhowmick' },
  { fullName: 'Arvin Bakshi' },
  { fullName: 'Vineet Kumar' },
  { fullName: 'Taseem Malik' },
  { fullName: 'Manisha Rawat' },
  { fullName: 'Sajal Bisen' },
  { fullName: 'Vaibhav Tyagi' },
  { fullName: 'Kavya Tandon' },
  { fullName: 'Vikrant Bhatia' },
  { fullName: 'Warisha Khatun' },
  { fullName: 'Rishabh Chawla' },
  { fullName: 'Nitin Singh' },
  { fullName: 'Siddharth Sinha' },
  { fullName: 'Harshita Gupta' },
  { fullName: 'Satyaki Mandal' },
  { fullName: 'Prabhanshu Maheshwari' },
  { fullName: 'Raghvendra Singh' },
  { fullName: 'Rajesh Kumar' },
]

function derive(fullName: string, role: UserRole): EmployeeUser {
  const parts = fullName.trim().split(/\s+/)
  const first = parts[0]
  const last = parts.slice(1).join(' ')
  const emailLocal = last ? `${first}.${last}`.toLowerCase().replace(/\s+/g, '.') : first.toLowerCase()
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${first}-${Math.random().toString(36).slice(2)}`,
    fullName,
    username: first,
    email: `${emailLocal}@icicilombard.com`,
    password: `${first}@123`,
    role,
    isLocked: false,
    createdAt: new Date().toISOString(),
    lastLoginAt: null,
  }
}

function seedUsers(): EmployeeUser[] {
  return TEAM.map((t) => derive(t.fullName, t.role || 'user'))
}

interface UserState {
  users: EmployeeUser[]
  loginLog: LoginRecord[]
  addUser: (input: { fullName: string; username: string; email: string; password: string; role: UserRole }) => { ok: boolean; error?: string }
  updateUser: (id: string, changes: Partial<Pick<EmployeeUser, 'password' | 'role' | 'isLocked'>>) => void
  deleteUser: (id: string) => void
  authenticate: (username: string, password: string) => { ok: boolean; user?: EmployeeUser; error?: string }
}

const STORAGE_KEY = 'employeeUsers'
const LOG_KEY = 'loginLog'

function loadUsers(): EmployeeUser[] {
  if (typeof window === 'undefined') return seedUsers()
  const raw = localStorage.getItem(STORAGE_KEY)
  const seeded = seedUsers()

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }

  let existing: EmployeeUser[]
  try {
    existing = JSON.parse(raw) as EmployeeUser[]
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }

  // Self-heal: merge in any seed users missing from an older/stale browser copy
  // (e.g. a teammate who opened the app before these accounts existed), without
  // removing any accounts an admin created manually.
  const haveUsernames = new Set(existing.map((u) => u.username.toLowerCase()))
  const missing = seeded.filter((s) => !haveUsernames.has(s.username.toLowerCase()))
  if (missing.length > 0) {
    const merged = [...existing, ...missing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    return merged
  }
  return existing
}

function loadLog(): LoginRecord[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(LOG_KEY)
  return raw ? (JSON.parse(raw) as LoginRecord[]) : []
}

function persistUsers(users: EmployeeUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}
function persistLog(log: LoginRecord[]) {
  localStorage.setItem(LOG_KEY, JSON.stringify(log))
}

function newId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : `id-${Math.random().toString(36).slice(2)}`
}

export const useUserStore = create<UserState>((set, get) => ({
  users: loadUsers(),
  loginLog: loadLog(),

  addUser: (input) => {
    const users = get().users
    if (users.some((u) => u.username.toLowerCase() === input.username.toLowerCase())) {
      return { ok: false, error: 'Username already exists' }
    }
    const user: EmployeeUser = {
      id: newId(),
      fullName: input.fullName,
      username: input.username,
      email: input.email,
      password: input.password,
      role: input.role,
      isLocked: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
    }
    const next = [...users, user]
    persistUsers(next)
    set({ users: next })
    return { ok: true }
  },

  updateUser: (id, changes) => {
    const next = get().users.map((u) => (u.id === id ? { ...u, ...changes } : u))
    persistUsers(next)
    set({ users: next })
  },

  deleteUser: (id) => {
    const next = get().users.filter((u) => u.id !== id)
    persistUsers(next)
    set({ users: next })
  },

  authenticate: (username, password) => {
    const users = get().users
    const id = username.trim().toLowerCase()
    // Accept either the username OR the email address as the login identifier.
    const user = users.find(
      (u) => u.username.toLowerCase() === id || u.email.toLowerCase() === id
    )
    const record: LoginRecord = {
      id: newId(),
      username,
      loggedInAt: new Date().toISOString(),
      success: false,
    }

    if (!user || user.password !== password.trim()) {
      const log = [record, ...get().loginLog].slice(0, 500)
      persistLog(log)
      set({ loginLog: log })
      return { ok: false, error: 'Invalid username or password' }
    }
    if (user.isLocked) {
      const log = [record, ...get().loginLog].slice(0, 500)
      persistLog(log)
      set({ loginLog: log })
      return { ok: false, error: 'Account is locked. Please contact an administrator.' }
    }

    // success
    record.success = true
    const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, lastLoginAt: record.loggedInAt } : u))
    const log = [record, ...get().loginLog].slice(0, 500)
    persistUsers(updatedUsers)
    persistLog(log)
    set({ users: updatedUsers, loginLog: log })
    return { ok: true, user }
  },
}))
