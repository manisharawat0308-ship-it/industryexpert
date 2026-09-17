import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { ArrowLeft, Shield, User, LogOut, BarChart3, Clock, TrendingUp, Activity } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface ComingSoonProps {
  title: string
  icon: LucideIcon
  color: string
  description: string
  kpis: { label: string; value: string; sub: string }[]
  segments: string[]
}

export default function ComingSoonDashboard({ title, icon: Icon, color, description, kpis, segments }: ComingSoonProps) {
  const navigate = useNavigate()
  const { username, role, logout } = useAuthStore()
  const isAdmin = role === 'admin'

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      {/* Header */}
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/hub')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition">
              <ArrowLeft size={14} /> Back to Hub
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-8" />
              <div>
                <h1 className="text-sm font-extrabold text-navy">{title}</h1>
                <p className="text-[10px] text-slate font-medium">ICICI Lombard | Risk & Analytics</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              {isAdmin ? <Shield size={13} className="text-maroon" /> : <User size={13} className="text-navy" />}
              <span className="text-xs font-bold text-gray-700">{username}</span>
            </div>
            <button onClick={() => { logout(); navigate('/login') }} className="flex items-center gap-1 text-xs text-gray-500 hover:text-maroon transition">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-lg" style={{ backgroundColor: `${color}15`, border: `2px solid ${color}30` }}>
            <Icon size={40} style={{ color }} />
          </div>
          <h2 className="text-3xl font-black text-navy">{title}</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-lg mx-auto">{description}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange/10 rounded-full">
            <Clock size={14} className="text-orange" />
            <span className="text-xs font-bold text-orange">Dashboard Under Development — Coming Soon</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {kpis.map((kpi, i) => (
            <div key={i} className="kpi-card bg-white rounded-2xl p-5 border border-gray-100 shadow-card text-center">
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-black mt-2" style={{ color }}>{kpi.value}</p>
              <p className="text-[10px] text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Segments */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card mb-10">
          <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-maroon" /> Key Segments
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {segments.map((seg, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                <span className="text-xs font-semibold text-gray-700">{seg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Planned Features */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card">
          <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <Activity size={18} className="text-green-600" /> Planned Analytics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Industry Overview & KPIs', 'Production & Capacity Analysis', 'Ownership & Market Structure', 'Historical Timeline & Projections',
              'Risk Analysis & Case Studies', 'Key Players & Financials', 'Geography & Plant Mapping', 'News & Market Intelligence'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                <TrendingUp size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-[11px] text-gray-400">&copy; 2025 ICICI Lombard General Insurance Company Ltd.</p>
        </div>
      </footer>
    </div>
  )
}
