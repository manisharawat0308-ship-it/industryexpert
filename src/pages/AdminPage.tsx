import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useUserStore, type EmployeeUser } from '../store/useUserStore'
import {
  Users, UserPlus, ShieldAlert, Clock, ArrowLeft, Lock, Unlock, KeyRound,
  CheckCircle2, XCircle, X, Shield, User as UserIcon, Trash2,
} from 'lucide-react'

type AdminTab = 'users' | 'activity'

export default function AdminPage() {
  const navigate = useNavigate()
  const { username } = useAuthStore()
  const [tab, setTab] = useState<AdminTab>('users')

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/hub')} className="text-gray-500 hover:text-navy flex items-center gap-1 text-sm font-semibold">
              <ArrowLeft size={16} /> Back to Hub
            </button>
            <span className="text-gray-300">|</span>
            <h1 className="text-lg font-black text-navy flex items-center gap-2"><ShieldAlert size={18} className="text-maroon" /> Admin Portal</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
            <Shield size={13} className="text-maroon" />
            <span className="text-xs font-semibold text-gray-700">{username}</span>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-1 pb-2">
            <button onClick={() => setTab('users')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'users' ? 'bg-maroon text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Users size={16} /> User Management
            </button>
            <button onClick={() => setTab('activity')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'activity' ? 'bg-maroon text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Clock size={16} /> Login Activity
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        {tab === 'users' ? <UserManagement /> : <LoginActivity />}
      </main>
    </div>
  )
}

// ============================ USER MANAGEMENT ============================
function UserManagement() {
  const users = useUserStore((s) => s.users)
  const updateUser = useUserStore((s) => s.updateUser)
  const deleteUser = useUserStore((s) => s.deleteUser)
  const [showCreate, setShowCreate] = useState(false)
  const [reveal, setReveal] = useState<Record<string, boolean>>({})

  const resetPw = (u: EmployeeUser) => {
    const pw = prompt(`Set a new password for ${u.username} (min 6 chars):`, u.password)
    if (pw == null) return
    if (pw.length < 6) { alert('Password must be at least 6 characters'); return }
    updateUser(u.id, { password: pw })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-navy">Employee Accounts</h2>
          <p className="text-xs text-gray-500">{users.length} accounts. These credentials are shared with the whole team and work on every device.</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-1.5 px-3 py-2 bg-maroon text-white rounded-lg text-xs font-bold hover:bg-maroon/90"><UserPlus size={14} /> Create User</button>
      </div>

      <div className="flex items-start gap-2 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        <ShieldAlert size={14} className="shrink-0 mt-0.5 text-amber-600" />
        <span>
          The team roster below is built into the app, so everyone can log in from any device. Users you add here with <b>Create User</b> are saved only on <b>this browser</b> and won&apos;t work for others on the live site. To add a permanent teammate for everyone, ask the developer to add them to the roster and redeploy.
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Password</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-bold text-navy">{u.fullName}</div>
                    <div className="text-[11px] text-gray-500">@{u.username}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setReveal((r) => ({ ...r, [u.id]: !r[u.id] }))} className="text-xs font-mono text-gray-600 hover:text-navy">
                      {reveal[u.id] ? u.password : '••••••••'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-maroon/10 text-maroon' : 'bg-navy/10 text-navy'}`}>
                      {u.role === 'admin' ? <Shield size={11} /> : <UserIcon size={11} />} {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.isLocked
                      ? <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700"><Lock size={11} /> Locked</span>
                      : <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700"><CheckCircle2 size={11} /> Active</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : <span className="text-gray-400">Never</span>}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      {u.isLocked
                        ? <button onClick={() => updateUser(u.id, { isLocked: false })} title="Unlock" className="p-1.5 rounded-lg text-green-600 hover:bg-green-50"><Unlock size={15} /></button>
                        : <button onClick={() => updateUser(u.id, { isLocked: true })} title="Lock (block login)" className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"><Lock size={15} /></button>}
                      <button onClick={() => resetPw(u)} title="Reset password" className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"><KeyRound size={15} /></button>
                      <button onClick={() => updateUser(u.id, { role: u.role === 'admin' ? 'user' : 'admin' })} title={u.role === 'admin' ? 'Demote to user' : 'Promote to admin'} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"><Shield size={15} /></button>
                      <button onClick={() => { if (confirm(`Delete ${u.username}?`)) deleteUser(u.id) }} title="Delete user" className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && <CreateUserModal onClose={() => setShowCreate(false)} />}
    </div>
  )
}

function CreateUserModal({ onClose }: { onClose: () => void }) {
  const addUser = useUserStore((s) => s.addUser)
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [error, setError] = useState('')

  // Auto-fill username/email/password from full name as the admin types.
  const onFullName = (v: string) => {
    setFullName(v)
    const parts = v.trim().split(/\s+/)
    const first = parts[0] || ''
    const last = parts.slice(1).join(' ')
    if (first) {
      setUsername(first)
      const local = last ? `${first}.${last}`.toLowerCase().replace(/\s+/g, '.') : first.toLowerCase()
      setEmail(`${local}@icicilombard.com`)
      setPassword(`${first}@123`)
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!fullName.trim()) { setError('Full name is required'); return }
    if (!username.trim()) { setError('Username is required'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    const res = addUser({ fullName: fullName.trim(), username: username.trim(), email: email.trim(), password, role })
    if (res.ok) onClose()
    else setError(res.error || 'Failed to create user')
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-navy flex items-center gap-2"><UserPlus size={17} className="text-maroon" /> Create New User</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-3.5">
          <Field label="Full Name *"><input className="input-field" value={fullName} onChange={(e) => onFullName(e.target.value)} placeholder="e.g. Manisha Rawat" autoFocus /></Field>
          <Field label="Username *"><input className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. Manisha" /></Field>
          <Field label="Email"><input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@icicilombard.com" /></Field>
          <Field label="Password *"><input className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="min 6 characters" /></Field>
          <Field label="Role">
            <select className="input-field" value={role} onChange={(e) => setRole(e.target.value as 'user' | 'admin')}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </Field>
          {error && <p className="text-red-600 text-xs font-semibold bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-maroon hover:bg-maroon/90">Create User</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

// ============================ LOGIN ACTIVITY ============================
function LoginActivity() {
  const loginLog = useUserStore((s) => s.loginLog)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-navy">Login Activity</h2>
        <p className="text-xs text-gray-500">Every login attempt — who logged in, when, and whether it succeeded.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loginLog.length === 0 ? (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400 text-sm">No login activity yet.</td></tr>
              ) : loginLog.map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-navy">{ev.username}</td>
                  <td className="px-4 py-3">
                    {ev.success
                      ? <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700"><CheckCircle2 size={11} /> Success</span>
                      : <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700"><XCircle size={11} /> Failed</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{new Date(ev.loggedInAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
