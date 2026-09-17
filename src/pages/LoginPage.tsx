import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useUserStore } from '../store/useUserStore'
import { Shield, User, Lock, Eye, EyeOff, BarChart3, TrendingUp, Activity, Zap } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const authenticate = useUserStore((s) => s.authenticate)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim()) { setError('Please enter a username'); return }
    if (!password.trim()) { setError('Please enter a password'); return }

    const res = authenticate(username.trim(), password.trim())
    if (res.ok && res.user) {
      login({
        username: res.user.username,
        role: res.user.role,
        token: 'local-session',
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      })
      navigate('/hub')
    } else {
      setError(res.error || 'Invalid username or password. Contact admin for access.')
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative animated-gradient items-center justify-center p-12">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 bg-white/[0.03] rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange/[0.06] rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/[0.02] rounded-full blur-2xl"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="relative text-center max-w-md z-10">
          {/* Animated icon cluster */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <BarChart3 size={28} className="text-white/90" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <TrendingUp size={28} className="text-orange/90" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Activity size={28} className="text-white/90" />
            </div>
          </div>

          <h1 className="text-4xl font-black text-white leading-tight tracking-tight">
            Industry<br />Intelligence Hub
          </h1>
          <p className="text-white/50 text-base mt-4 leading-relaxed">
            Enterprise-grade sector analytics, risk profiling, and strategic market intelligence across India's key industries.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[11px] font-semibold text-white/80 border border-white/10">
              <Zap size={12} className="text-orange" /> 15 Industry Sectors
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[11px] font-semibold text-white/80 border border-white/10">
              <Shield size={12} className="text-green-400" /> Risk Analytics
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[11px] font-semibold text-white/80 border border-white/10">
              <Activity size={12} className="text-blue-300" /> Real-time KPIs
            </span>
          </div>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-white">15+</div>
              <div className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-1">Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-orange">500+</div>
              <div className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-1">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">24/7</div>
              <div className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-1">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #831c1d 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="relative w-full max-w-sm">
          {/* Mobile logo (shows on small screens) */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #831c1d, #f37021)' }}>
                <BarChart3 size={20} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-navy">Industry Intelligence Hub</p>
                <p className="text-[10px] text-gray-400 font-medium">ICICI Lombard | Risk & Analytics</p>
              </div>
            </div>
          </div>

          {/* Logo + Welcome */}
          <div className="mb-6 text-center">
            <div className="inline-block bg-gradient-to-r from-[#f37021] to-[#e85d04] rounded-xl p-4 mb-4 shadow-lg">
              <img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-10 brightness-0 invert" />
            </div>
            <h2 className="text-xl font-black text-navy">Industry Intelligence Hub</h2>
            <p className="text-xs text-gray-500 mt-1">ICICI Lombard | Risk & Analytics Platform</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-7 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Username or Email</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Deepak or deepak.beniwal@icicilombard.com"
                    className="input-field pl-10"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="input-field pl-10 pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-xs font-semibold bg-red-50 px-3 py-2 rounded-xl border border-red-100">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl active:scale-[0.98] mt-2 bg-gradient-to-r from-navy to-[#2d5a8e] hover:from-[#162d4a] hover:to-navy"
              >
                Sign In
              </button>
            </form>

          </div>

          {/* Footer disclaimer */}
          <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-[9px] text-gray-400 leading-relaxed">
              <strong className="text-gray-500">Disclaimer:</strong> This portal and its contents are intended solely for internal use by authorized personnel. The information provided herein is compiled from third-party and public external sources for informational and analytical purposes only. While reasonable efforts are made to ensure accuracy, ICICI Lombard makes no representations or warranties regarding the completeness, reliability, or accuracy of the data. By logging in, you acknowledge that this information should not be solely relied upon for legal, commercial, or financial decisions, and you agree not to distribute or circulate any content externally without prior written authorization.
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-gray-400 mt-5 font-medium">
            &copy; 2025 ICICI Lombard General Insurance Company Ltd.
          </p>
        </div>
      </div>
    </div>
  )
}
