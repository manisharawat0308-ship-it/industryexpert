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
const SEED_VERSION_KEY = 'employeeUsersSeedVersion'
// Bump this whenever the built-in roster changes. On load, if the browser's
// stored seed version is older, the current roster is re-merged so every
// built-in account (incl. admin) is guaranteed present even on stale caches
// (e.g. a device that opened an older deploy). Admin-created custom users are
// preserved.
const SEED_VERSION = '2'

function mergeSeed(existing: EmployeeUser[]): EmployeeUser[] {
  const seeded = seedUsers()
  // Match built-in accounts by EMAIL (always unique) rather than username,
  // because two people can share a first name (e.g. two "Deepak"s) and thus
  // the same username — matching by username would drop/overwrite one of them.
  const byEmail = new Map(existing.map((u) => [u.email.toLowerCase(), u]))

  const result = [...existing]
  for (const s of seeded) {
    const eKey = s.email.toLowerCase()
    const already = byEmail.get(eKey)
    if (already) {
      // Repair a built-in account that may be stale/broken in the cache:
      // ensure it has the correct password, role, and is not left locked.
      already.password = s.password
      already.username = s.username
      already.fullName = s.fullName
      already.role = s.role
      already.isLocked = false
    } else {
      result.push(s)
      byEmail.set(eKey, s)
    }
  }
  return result
}

function loadUsers(): EmployeeUser[] {
  if (typeof window === 'undefined') return seedUsers()
  const raw = localStorage.getItem(STORAGE_KEY)
  const seeded = seedUsers()

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION)
    return seeded
  }

  let existing: EmployeeUser[]
  try {
    existing = JSON.parse(raw) as EmployeeUser[]
  } catch {
    // Corrupted cache — reset to a clean seed.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION)
    return seeded
  }

  // If the stored copy predates the current roster version, or if it's empty/
  // invalid, re-merge the full built-in roster (repairing built-in accounts and
  // adding any missing) while keeping admin-created custom users.
  const storedVersion = localStorage.getItem(SEED_VERSION_KEY)
  const needsReseed = storedVersion !== SEED_VERSION || !Array.isArray(existing) || existing.length === 0

  if (needsReseed) {
    const merged = mergeSeed(Array.isArray(existing) ? existing : [])
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION)
    return merged
  }

  // Same version: still self-heal any missing built-in users defensively,
  // matching by unique email (not username) so same-first-name users are kept.
  const haveEmails = new Set(existing.map((u) => u.email.toLowerCase()))
  const missing = seeded.filter((s) => !haveEmails.has(s.email.toLowerCase()))
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
