import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  FileText, Car, Circle, Building2, Shirt, CandyOff,
  Cpu, ShoppingCart, LogOut, Shield, User, Hammer,
  Wrench, Pill, Landmark, Plane, Rocket, Hotel,
  ChevronRight, Building, Factory
} from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'

const industries = [
  {
    id: 'steel', name: 'Steel', icon: Hammer, brandColor: '#1e3a5f',
    description: 'Crude steel: BF-BOF, EAF, flat & long products',
    metric: '200.3 MTPA', growth: '+5.7%', rank: '#2 Global', riskScore: 7.2,
    topCompany: 'Tata Steel', featured: true, category: 'Manufacturing',
    sparkline: [65, 72, 68, 80, 85, 90, 95, 100]
  },
  {
    id: 'cement', name: 'Cement', icon: Building, brandColor: '#f37021',
    description: 'Grey, white, ready-mix — kiln, crusher, VRM',
    metric: '600 MTPA', growth: '+8.2%', rank: '#2 Global', riskScore: 5.8,
    topCompany: 'UltraTech', featured: true, category: 'Manufacturing',
    sparkline: [50, 55, 62, 70, 75, 82, 88, 95]
  },
  {
    id: 'paper', name: 'Paper', icon: FileText, brandColor: '#78350f',
    description: 'Pulp, packaging board, writing paper — 850+ mills',
    metric: '27.8 MTPA', growth: '+6.5%', rank: '#5 Global', riskScore: 5.5,
    topCompany: 'ITC Paperboards', featured: true, category: 'Manufacturing',
    sparkline: [60, 63, 65, 68, 72, 75, 78, 82]
  },
  {
    id: 'automobile-oem', name: 'Automobile OEMs', icon: Car, brandColor: '#1e40af',
    description: 'PVs, CVs, 2Ws, 3Ws, EVs — OEMs',
    metric: '25.6M Sales', growth: '+9.2%', rank: '#3 Global', riskScore: 6.5,
    topCompany: 'Maruti Suzuki', featured: true, category: 'Automotive',
    sparkline: [70, 55, 60, 72, 80, 85, 90, 95]
  },
  {
    id: 'auto-ancillary', name: 'Auto Components', icon: Wrench, brandColor: '#0369a1',
    description: 'Engine parts, transmission, steering, electricals',
    metric: '$74B Market', growth: '+12%', rank: '#4 Global', riskScore: 5.8,
    topCompany: 'Motherson Sumi', featured: true, category: 'Automotive',
    sparkline: [55, 60, 65, 70, 78, 82, 88, 92]
  },
  {
    id: 'tyre', name: 'Tyre', icon: Circle, brandColor: '#1f2937',
    description: 'TBR, PCR, 2W, OTR/Farm — 3.2 MT production',
    metric: '3.2 MT', growth: '+7.5%', rank: '#3 Global', riskScore: 7.4,
    topCompany: 'MRF', featured: true, category: 'Manufacturing',
    sparkline: [60, 58, 65, 72, 76, 80, 82, 85]
  },
  {
    id: 'textile', name: 'Textile', icon: Shirt, brandColor: '#7c3aed',
    description: 'Cotton, synthetic, technical textiles — 45M jobs',
    metric: '$250B Market', growth: '+5.8%', rank: '#2 Global', riskScore: 6.0,
    topCompany: 'Aditya Birla Fashion', featured: true, category: 'Manufacturing',
    sparkline: [70, 68, 72, 75, 78, 82, 85, 88]
  },
  {
    id: 'sugar', name: 'Sugar', icon: CandyOff, brandColor: '#059669',
    description: 'Sugar mills, ethanol blending, cogeneration',
    metric: '27.5 MT', growth: '+4.2%', rank: '#2 Global', riskScore: 6.2,
    topCompany: 'Bajaj Hindusthan', featured: true, category: 'Agriculture',
    sparkline: [65, 68, 62, 70, 72, 75, 78, 80]
  },
  {
    id: 'electronics', name: 'Electronics', icon: Cpu, brandColor: '#dc2626',
    description: 'Mobile, consumer electronics, semiconductors',
    metric: '$155B Market', growth: '+15%', rank: '#5 Global', riskScore: 5.5,
    topCompany: 'Dixon Technologies', featured: true, category: 'Technology',
    sparkline: [40, 50, 60, 70, 80, 88, 95, 100]
  },
  {
    id: 'fmcg', name: 'FMCG', icon: ShoppingCart, brandColor: '#d97706',
    description: 'Food, personal care, household — $220B',
    metric: '$220B Market', growth: '+8.5%', rank: '#4 Global', riskScore: 4.8,
    topCompany: 'Hindustan Unilever', featured: true, category: 'Consumer',
    sparkline: [70, 72, 75, 78, 80, 83, 86, 90]
  },
  {
    id: 'pharma', name: 'Pharma & Healthcare', icon: Pill, brandColor: '#0891b2',
    description: 'API, Formulations, Biotech, Medical Devices',
    metric: '$50B Market', growth: '+10.5%', rank: '#3 Global', riskScore: 6.2,
    topCompany: 'Sun Pharma', featured: true, category: 'Healthcare',
    sparkline: [55, 60, 68, 72, 78, 82, 88, 95]
  },
  {
    id: 'bfsi', name: 'Financial Services', icon: Landmark, brandColor: '#4338ca',
    description: 'Banking, NBFCs, Fintech, Insurance',
    metric: '$2.3T Assets', growth: '+12.5%', rank: '#5 Global', riskScore: 5.8,
    topCompany: 'HDFC Bank', featured: true, category: 'Financial',
    sparkline: [60, 65, 70, 75, 80, 85, 90, 95]
  },
  {
    id: 'aviation', name: 'Aviation & Aerospace', icon: Plane, brandColor: '#0c4a6e',
    description: 'Airlines, MRO, Airports, Cargo',
    metric: '220M PAX', growth: '+15%', rank: '#3 Domestic', riskScore: 6.5,
    topCompany: 'IndiGo', featured: true, category: 'Transport',
    sparkline: [80, 30, 50, 70, 82, 88, 92, 95]
  },
  {
    id: 'startups', name: 'Startups & Tech', icon: Rocket, brandColor: '#be185d',
    description: 'Unicorns, SaaS, E-commerce, DeepTech',
    metric: '112 Unicorns', growth: '+18%', rank: '#3 Global', riskScore: 7.5,
    topCompany: 'Flipkart', featured: true, category: 'Technology',
    sparkline: [20, 35, 55, 80, 95, 85, 75, 88]
  },
  {
    id: 'hospitality', name: 'Hospitality & Tourism', icon: Hotel, brandColor: '#a16207',
    description: 'Hotels, Resorts, QSRs, Travel & Leisure',
    metric: '$75B Market', growth: '+12.8%', rank: '#7 Global', riskScore: 6.2,
    topCompany: 'Indian Hotels (Taj)', featured: true, category: 'Services',
    sparkline: [80, 25, 40, 65, 78, 85, 90, 95]
  },
]

const categories = ['All']

export default function IndustryHub() {
  const navigate = useNavigate()
  const { username, role, logout } = useAuthStore()

  const handleLogout = () => { logout(); navigate('/login') }

  const handleNavigate = (id: string) => {
    const routeMap: Record<string, string> = {
      'steel': '/steel', 'cement': '/cement', 'paper': '/paper',
      'automobile-oem': '/automobile', 'auto-ancillary': '/auto-ancillary',
      'tyre': '/tyre', 'textile': '/textile', 'sugar': '/sugar',
      'electronics': '/electronics', 'fmcg': '/fmcg', 'pharma': '/pharma',
      'bfsi': '/bfsi', 'aviation': '/aviation', 'startups': '/startups',
      'hospitality': '/hospitality',
    }
    navigate(routeMap[id] || `/dashboard/${id}`)
  }

  return (
    <div className="min-h-screen font-mulish pb-12" style={{ backgroundColor: '#f7f9fc' }}>
      {/* Header */}
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-9" />
              <div className="hidden sm:block">
                <h1 className="text-base font-extrabold text-gray-900 leading-tight">Industry Intelligence Hub</h1>
                <p className="text-[11px] text-gray-500 font-medium">ICICI Lombard <span className="text-gray-300 mx-1">|</span> Risk &amp; Analytics</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/quiz')} className="group relative flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white rounded-xl text-xs font-extrabold hover:from-amber-500 hover:via-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl active:scale-[0.96] overflow-hidden">
              <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all"></span>
              <span className="relative flex items-center gap-2">
                <span className="text-lg animate-bounce">🏆</span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] tracking-wide">Industry IQ Quiz</span>
                  <span className="text-[8px] font-medium opacity-80">Test Your Knowledge →</span>
                </span>
              </span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              {role === 'admin' ? <Shield size={13} className="text-maroon" /> : <User size={13} className="text-gray-600" />}
              <span className="text-xs font-bold text-gray-700">{username}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-2 py-2 text-xs text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* KPI Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
            <div className="text-xl font-black text-green-600"><AnimatedCounter end={15} /></div>
            <div className="text-[9px] font-semibold text-gray-500 mt-0.5">Live Sectors</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
            <div className="text-xl font-black text-gray-800"><AnimatedCounter end={500} suffix="+" /></div>
            <div className="text-[9px] font-semibold text-gray-500 mt-0.5">Companies</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
            <div className="text-xl font-black text-blue-700">$<AnimatedCounter end={4.8} decimals={1} />T</div>
            <div className="text-[9px] font-semibold text-gray-500 mt-0.5">Market Size</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
            <div className="text-xl font-black text-orange-600"><AnimatedCounter end={8.5} decimals={1} />%</div>
            <div className="text-[9px] font-semibold text-gray-500 mt-0.5">Avg Growth</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
            <div className="text-xl font-black text-red-600"><AnimatedCounter end={6.8} decimals={1} /></div>
            <div className="text-[9px] font-semibold text-gray-500 mt-0.5">Risk Score</div>
          </div>
        </div>

        {/* Quiz Banner — Top CTA */}
        <div onClick={() => navigate('/quiz')} className="mb-6 cursor-pointer group">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white tracking-tight">Industry IQ Challenge</h3>
                  <p className="text-xs text-white/80 mt-0.5">Test your knowledge across 10 industries • 20 questions • Timed • Lifelines</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-indigo-700 font-extrabold text-sm shadow-md group-hover:bg-indigo-50 group-hover:scale-105 transition-all">
                Play Now <span className="text-base ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sector Grid — Visually Rich */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Explore Industries</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((industry) => {
            const emojiMap: Record<string, string> = {
              'steel': '🏗️', 'cement': '🧱', 'paper': '📄', 'automobile-oem': '🚗', 'auto-ancillary': '⚙️',
              'tyre': '🛞', 'textile': '👕', 'sugar': '🍬', 'electronics': '📱', 'fmcg': '🛒',
              'pharma': '💊', 'bfsi': '🏦', 'aviation': '✈️', 'startups': '🚀', 'hospitality': '🏨',
            }
            return (
              <button
                key={industry.id}
                onClick={() => handleNavigate(industry.id)}
                className="group relative bg-white rounded-2xl p-5 text-center overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: `linear-gradient(135deg, ${industry.brandColor}08, ${industry.brandColor}15)` }}></div>
                {/* Top color bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300 opacity-60 group-hover:opacity-100" style={{ backgroundColor: industry.brandColor }}></div>
                
                <div className="relative">
                  {/* Large Emoji */}
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {emojiMap[industry.id] || '📊'}
                  </div>
                  {/* Industry Name */}
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-900 leading-tight">{industry.name}</h3>
                  {/* Subtle arrow on hover */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${industry.brandColor}15`, color: industry.brandColor }}>Explore →</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p>
          <p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p>
          <p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p>
        </div>
      </footer>
    </div>
  )
}
