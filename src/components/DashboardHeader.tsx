import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Shield, User, ShieldAlert, UserCircle2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { getIndustryOwners } from '../data/industryOwners'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

// Shared, professional dashboard header used across all industry dashboards.
// Keeps branding, title, user badge, and navigation consistent everywhere.
export default function DashboardHeader({ title, subtitle = 'ICICI Lombard | Risk & Analytics' }: DashboardHeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, role } = useAuthStore()
  const isAdmin = role === 'admin'

  // Derive the industry from the route (e.g. /steel, /automobile) to find owners.
  const routeKey = location.pathname.split('/').filter(Boolean)[0] || ''
  const owners = getIndustryOwners(routeKey)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: brand + title */}
        <div className="flex items-center gap-3 min-w-0">
          <img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-9 shrink-0" />
          <div className="h-8 w-px bg-gray-200 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-base font-bold text-navy leading-tight truncate">{title}</h1>
            <p className="text-[11px] text-gray-500 font-medium truncate">{subtitle}</p>
          </div>
          {owners.length > 0 && (
            <div className="hidden md:flex items-center gap-1.5 ml-2 pl-3 border-l border-gray-200 shrink-0">
              <UserCircle2 size={15} className="text-maroon shrink-0" />
              <div className="leading-tight">
                <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">Dedicated Analyst{owners.length > 1 ? 's' : ''}</div>
                <div className="text-xs font-bold text-navy">{owners.join(' & ')}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: user badge + back to hub */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
            {isAdmin ? <Shield size={13} className="text-maroon" /> : <User size={13} className="text-navy" />}
            <span className="text-xs font-semibold text-gray-700">{username}</span>
          </div>
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white bg-maroon hover:bg-maroon/90 transition"
            >
              <ShieldAlert size={15} /> Admin
            </button>
          )}
          <button
            onClick={() => navigate('/hub')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-navy transition"
          >
            <ArrowLeft size={15} /> Back to Hub
          </button>
        </div>
      </div>
    </header>
  )
}
