import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  FileText, Car, Circle, Building2, Shirt, CandyOff,
  Cpu, ShoppingCart, LogOut, Shield, User, Hammer,
  Wrench, Pill, Landmark, Plane, Rocket, Hotel,
  ChevronRight, Building, Factory, FlaskConical, HardHat, Sprout, Trophy, BookOpen
} from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'
import { getIndustryOwners } from '../data/industryOwners'

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
    id: 'sugar', name: 'Sugar', icon: Factory, brandColor: '#059669',
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
  {
    id: 'chemical', name: 'Chemical', icon: FlaskConical, brandColor: '#7c2d12',
    description: 'Petrochemicals, specialty, agrochemicals, dyes',
    metric: '$220B Market', growth: '+11.2%', rank: '#6 Global', riskScore: 7.8,
    topCompany: 'Reliance Industries', featured: true, category: 'Manufacturing',
    sparkline: [55, 60, 68, 75, 80, 85, 90, 95]
  },
  {
    id: 'infrastructure', name: 'Infrastructure', icon: HardHat, brandColor: '#334155',
    description: 'Roads, metro, power, ports, urban development',
    metric: '$143B Capex', growth: '+9.5%', rank: '#3 Global', riskScore: 7.0,
    topCompany: 'Larsen & Toubro', featured: true, category: 'Infrastructure',
    sparkline: [60, 62, 68, 74, 80, 86, 92, 98]
  },
  {
    id: 'fertilizer', name: 'Fertilizer', icon: Sprout, brandColor: '#15803d',
    description: 'Ammonia/urea, phosphatic, complex & specialty',
    metric: '65 MT Consumption', growth: '+3.5%', rank: '#2 Global', riskScore: 7.5,
    topCompany: 'IFFCO', featured: true, category: 'Agriculture',
    sparkline: [70, 72, 73, 74, 75, 76, 78, 80]
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
      'hospitality': '/hospitality', 'chemical': '/chemical',
      'infrastructure': '/infrastructure', 'fertilizer': '/fertilizer',
    }
    navigate(routeMap[id] || `/dashboard/${id}`)
  }

  // Industry-specific full-bleed photographic backgrounds for each card.
  const cardImages: Record<string, string> = {
    'steel': 'photo-1513828583688-c52646db42da',
    'cement': 'photo-1503387762-592deb58ef4e',
    'paper': 'photo-1607166452427-7e4477079cb9',
    'automobile-oem': 'photo-1492144534655-ae79c964c9d7',
    'auto-ancillary': 'photo-1487754180451-c456f719a1fc',
    'tyre': 'photo-1449965408869-eaa3f722e40d',
    'textile': 'photo-1528459801416-a9e53bbf4e17',
    'sugar': 'photo-1500382017468-9049fed747ef',
    'electronics': 'photo-1518770660439-4636190af475',
    'fmcg': 'photo-1578916171728-46686eac8d58',
    'pharma': 'photo-1582719478250-c89cae4dc85b',
    'bfsi': 'photo-1486406146926-c627a92ad1ab',
    'aviation': 'photo-1436491865332-7a61a109cc05',
    'startups': 'photo-1522071820081-009f0129c71c',
    'hospitality': 'photo-1566073771259-6a8506099945',
    'chemical': 'photo-1532187863486-abf9dbad1b69',
    'infrastructure': 'photo-1545459720-aac8509eb02c',
    'fertilizer': 'photo-1500382017468-9049fed747ef',
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
            <button onClick={() => navigate('/library')} className="flex items-center gap-2 px-4 py-2 bg-white text-navy border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">
              <BookOpen size={14} strokeWidth={1.75} />
              <span>Library</span>
            </button>
            <button onClick={() => navigate('/quiz')} className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg text-xs font-semibold hover:bg-navy/90 transition-colors">
              <Trophy size={14} strokeWidth={1.75} />
              <span>Industry IQ Quiz</span>
            </button>
            {role === 'admin' && (
              <button onClick={() => navigate('/admin')} className="flex items-center gap-2 px-4 py-2 bg-maroon text-white rounded-lg text-xs font-bold hover:bg-maroon/90 transition-colors">
                <Shield size={14} strokeWidth={1.75} />
                <span>Admin</span>
              </button>
            )}
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
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-navy"><AnimatedCounter end={18} /></div>
            <div className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-wide">Live Sectors</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-navy"><AnimatedCounter end={500} suffix="+" /></div>
            <div className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-wide">Companies</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-navy">$<AnimatedCounter end={4.8} decimals={1} />T</div>
            <div className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-wide">Market Size</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-navy"><AnimatedCounter end={8.5} decimals={1} />%</div>
            <div className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-wide">Avg Growth</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-navy"><AnimatedCounter end={6.8} decimals={1} /></div>
            <div className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-wide">Risk Score</div>
          </div>
        </div>

        {/* Sector Grid */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">Explore Industries</h2>
          <p className="text-xs text-gray-500 mt-1">Click any industry to view its full profile — overview, key players, risk analysis, news, and company details.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <button
                key={industry.id}
                onClick={() => handleNavigate(industry.id)}
                className="group relative rounded-xl overflow-hidden text-left h-44 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none"
                style={{ backgroundColor: industry.brandColor }}
              >
                {/* Full-bleed industry photo */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(https://images.unsplash.com/${cardImages[industry.id] || 'photo-1513828583688-c52646db42da'}?w=600&q=70&auto=format&fit=crop)` }}
                />
                {/* Strong dark gradient overlay for clear legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 group-hover:from-black/90 transition-colors" />
                {/* Top brand accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: industry.brandColor }} />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-4">
                  <div
                    className="w-10 h-10 mb-2 rounded-lg flex items-center justify-center shadow-md"
                    style={{ backgroundColor: industry.brandColor }}
                  >
                    <Icon size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white leading-tight drop-shadow-md">{industry.name}</h3>
                  <p className="text-[10px] text-white/85 mt-1 leading-snug line-clamp-2 drop-shadow">{industry.description}</p>
                  {getIndustryOwners(industry.id).length > 0 && (
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-white/95 drop-shadow">
                      <User size={11} className="shrink-0 opacity-90" />
                      <span className="truncate">{getIndustryOwners(industry.id).join(' & ')}</span>
                    </div>
                  )}
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-white group-hover:gap-1.5 transition-all">
                    View profile <span className="group-hover:translate-x-0.5 transition-transform">→</span>
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
