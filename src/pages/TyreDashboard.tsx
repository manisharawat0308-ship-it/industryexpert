import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Calendar, Building2
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, ComposedChart, LabelList, ScatterChart, Scatter, ZAxis,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import AnimatedCounter from '../components/AnimatedCounter'
import LiveTicker from '../components/LiveTicker'
import HealthGauge from '../components/HealthGauge'

const COLORS = ['#B02A30', '#005B75', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722']

type TyreTab = 'overview' | 'production' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot'

// ===== SOURCE METADATA =====
const DATA_META = {
  lastUpdated: 'June 2025',
  source: 'ATMA, DPIIT, Company Annual Reports'
}

// ===== OVERVIEW DATA =====
const overviewData = {
  totalCapacity: 4.1,
  totalProduction: 3.2,
  utilizationRate: 78,
  globalRanking: 3,
  turnover: 95000,
  exports: 42000,
  numberOfPlants: 62,
  replacementMarket: 65,
  oemMarket: 35,
  perCapitaConsumption: 1.2,
  globalPerCapita: 3.5,
  segmentSplit: [
    { segment: 'Truck & Bus Radial (TBR)', share: 38 },
    { segment: 'Passenger Car Radial (PCR)', share: 32 },
    { segment: 'Two-Wheeler', share: 20 },
    { segment: 'OTR/Farm/Industrial', share: 10 },
  ],
  yearlyProduction: [
    { year: 'FY20', production: 2.5 },
    { year: 'FY21', production: 2.3 },
    { year: 'FY22', production: 2.8 },
    { year: 'FY23', production: 3.0 },
    { year: 'FY24', production: 3.1 },
    { year: 'FY25', production: 3.2 },
  ],
}

// ===== PRODUCTION DATA =====
const productionTrend = [
  { year: 'FY17', production: 1.8, capacity: 2.8, utilization: 64 },
  { year: 'FY18', production: 2.0, capacity: 3.0, utilization: 67 },
  { year: 'FY19', production: 2.2, capacity: 3.2, utilization: 69 },
  { year: 'FY20', production: 2.5, capacity: 3.5, utilization: 71 },
  { year: 'FY21', production: 2.3, capacity: 3.6, utilization: 64 },
  { year: 'FY22', production: 2.8, capacity: 3.8, utilization: 74 },
  { year: 'FY23', production: 3.0, capacity: 3.9, utilization: 77 },
  { year: 'FY24', production: 3.1, capacity: 4.0, utilization: 78 },
  { year: 'FY25', production: 3.2, capacity: 4.1, utilization: 78 },
]

const radializationProgress = [
  { year: '2010', radial: 52 },
  { year: '2013', radial: 60 },
  { year: '2016', radial: 68 },
  { year: '2019', radial: 78 },
  { year: '2022', radial: 85 },
  { year: '2025', radial: 92 },
]

// ===== OWNERSHIP DATA =====
const ownershipSplit = [
  { type: 'Private Indian', share: 72 },
  { type: 'Foreign/MNC', share: 28 },
  { type: 'PSU', share: 0 },
]

const topCompanies = [
  { name: 'MRF Ltd', revenue: 24000, marketShare: 24, plantsIndia: 9, plantsIntl: 0, segment: 'All segments', state: 'TN/KL/GJ/AP', countries: 'India only', intlDetails: 'Exports to 65+ countries but no overseas manufacturing. Plans to set up plant in ASEAN region.' },
  { name: 'Apollo Tyres', revenue: 18500, marketShare: 18, plantsIndia: 5, plantsIntl: 2, segment: 'TBR+PCR', state: 'KL/GJ/AP/TN/HR', countries: 'India, Netherlands, Hungary', intlDetails: 'Netherlands (Enschede — 15M tyres/yr PCR), Hungary (Gyöngyöshalász — 5.5M tyres/yr PCR). Major European presence under Vredestein brand.' },
  { name: 'JK Tyre & Industries', revenue: 14000, marketShare: 14, plantsIndia: 6, plantsIntl: 3, segment: 'TBR+PCR+OTR', state: 'RJ/MP/TN/KN', countries: 'India, Mexico, USA (sales)', intlDetails: 'Mexico (3 plants via Tornel acquisition — 12M tyres/yr). Strong in Latin America market. US warehouse operations for distribution.' },
  { name: 'CEAT (RPG Group)', revenue: 12000, marketShare: 12, plantsIndia: 5, plantsIntl: 1, segment: 'All segments', state: 'MH/GJ/TN/HR', countries: 'India, Sri Lanka', intlDetails: 'Sri Lanka (Kelaniya plant — 2M 2W tyres/yr). Exports to 110+ countries. Evaluating Africa plant.' },
  { name: 'Balkrishna Industries', revenue: 9500, marketShare: 8, plantsIndia: 2, plantsIntl: 0, segment: 'OTR/Farm/Industrial', state: 'GJ (Bhuj, Waluj)', countries: 'India only (exports 55%)', intlDetails: 'No overseas plants but exports 55% of production to 160+ countries. #5 globally in OTR segment. Distribution centers in US, Europe.' },
  { name: 'TVS Srichakra', revenue: 3500, marketShare: 4, plantsIndia: 2, plantsIntl: 0, segment: 'Two-Wheeler+3W', state: 'TN (Madurai, Rudrapur)', countries: 'India only', intlDetails: 'Exports to 70+ countries. Strong 2W tyre brand in Africa and ASEAN. Part of TVS Group.' },
  { name: 'Bridgestone India', revenue: 4500, marketShare: 5, plantsIndia: 1, plantsIntl: 0, segment: 'PCR+TBR', state: 'MH (Pune)', countries: 'India (subsidiary of Bridgestone Japan)', intlDetails: 'Single plant in Pune. Parent company is world\'s #1 tyre maker. Imports premium products from Japan, Thailand plants for Indian market.' },
  { name: 'Continental India', revenue: 2500, marketShare: 3, plantsIndia: 1, plantsIntl: 0, segment: 'PCR', state: 'GJ (Modipuram)', countries: 'India (subsidiary of Continental AG)', intlDetails: 'Single plant in Gujarat. Parent is German MNC — world #4. Focus on premium PCR and OE supply to VW, BMW, Mercedes in India.' },
  { name: 'Goodyear India', revenue: 2200, marketShare: 2.5, plantsIndia: 1, plantsIntl: 0, segment: 'PCR+Farm', state: 'HR (Aurangabad)', countries: 'India (subsidiary of Goodyear USA)', intlDetails: 'Single plant at Ballabgarh, Haryana. Parent is US #1 tyre maker. Farm tyres dominate. Imports PCR from parent\'s ASEAN factories.' },
  { name: 'Birla Tyres (Kesoram)', revenue: 1800, marketShare: 2, plantsIndia: 2, plantsIntl: 0, segment: 'TBR', state: 'WB/AP', countries: 'India only', intlDetails: 'Under financial stress. Plants at Haringhata (WB) and Balasore (Odisha). Focused only on TBR replacement market.' },
]

// ===== COMBINED TIMELINE (History + Future on one line) =====
const combinedTimeline = [
  { year: '1990', production: 0.3, type: 'history' },
  { year: '1995', production: 0.5, type: 'history' },
  { year: '2000', production: 0.7, type: 'history' },
  { year: '2005', production: 1.1, type: 'history' },
  { year: '2010', production: 1.5, type: 'history' },
  { year: '2015', production: 2.0, type: 'history' },
  { year: '2020', production: 2.5, type: 'history' },
  { year: '2025', production: 3.2, projected: 3.2, type: 'current' },
  { year: '2026', projected: 3.5, type: 'future' },
  { year: '2027', projected: 3.8, type: 'future' },
  { year: '2028', projected: 4.1, type: 'future' },
  { year: '2029', projected: 4.4, type: 'future' },
  { year: '2030', projected: 4.7, type: 'future' },
]

// ===== TIMELINE DATA =====
const historicalProduction = [
  { year: '1990', production: 0.3 },
  { year: '1995', production: 0.5 },
  { year: '2000', production: 0.7 },
  { year: '2005', production: 1.1 },
  { year: '2010', production: 1.5 },
  { year: '2015', production: 2.0 },
  { year: '2020', production: 2.5 },
  { year: '2025', production: 3.2 },
]

const futureProjections = [
  { year: '2025', demand: 3.0, capacity: 4.1, production: 3.2 },
  { year: '2026', demand: 3.3, capacity: 4.4, production: 3.5 },
  { year: '2027', demand: 3.6, capacity: 4.7, production: 3.8 },
  { year: '2028', demand: 3.9, capacity: 5.0, production: 4.1 },
  { year: '2029', demand: 4.2, capacity: 5.3, production: 4.4 },
  { year: '2030', demand: 4.5, capacity: 5.6, production: 4.7 },
]

// ===== GEOGRAPHY DATA =====
const stateWise = [
  { state: 'Tamil Nadu', plants: 15, capacity: 1.2, share: 29, majorCompanies: 'MRF, TVS Srichakra, JK Tyre', reason: 'Historical hub since 1946 (Dunlop). Proximity to Chennai auto OEM corridor. Abundant skilled rubber technicians. Port access for NR imports (Tuticorin). State industrial incentives. TVS Group and MRF HQ advantage.' },
  { state: 'Gujarat', plants: 7, capacity: 0.6, share: 15, majorCompanies: 'BKT, CEAT, Continental', reason: 'SEZ/incentive-driven new investments. Proximity to Mundra/Kandla port (rubber imports). Low land cost. Strong industrial ecosystem and power availability. BKT\'s mega OTR plant at Bhuj is India\'s largest single-location tyre plant.' },
  { state: 'Maharashtra', plants: 8, capacity: 0.7, share: 17, majorCompanies: 'CEAT, Bridgestone, MRF', reason: 'Proximity to Mumbai (financial hub & auto OEMs). Established rubber goods corridor (Nashik-Pune belt). CEAT HQ in Mumbai. Bridgestone chose Pune for proximity to auto sector. Good road/port connectivity.' },
  { state: 'Kerala', plants: 6, capacity: 0.5, share: 12, majorCompanies: 'Apollo Tyres, MRF', reason: 'India\'s #1 natural rubber producing state (80%+ of domestic NR). Apollo Tyres founded here (Perambra). Raw material proximity reduces logistics cost. Skilled workforce from rubber plantation industry. Trade union challenges offset by NR advantage.' },
  { state: 'Rajasthan', plants: 5, capacity: 0.3, share: 7, majorCompanies: 'JK Tyre', reason: 'JK Group\'s historical base (Kankroli). State government incentives for industry. Low labor cost. Central India location provides logistics advantage for North/West distribution.' },
  { state: 'Uttarakhand', plants: 4, capacity: 0.2, share: 5, majorCompanies: 'Apollo, CEAT', reason: 'Industrial tax incentives (erstwhile hill state benefits). Proximity to North India auto market. Low pollution norms in industrial belt. Apollo and CEAT expanded here for tax advantage + proximity to NCR market.' },
  { state: 'Haryana', plants: 3, capacity: 0.2, share: 5, majorCompanies: 'Goodyear, JK Tyre', reason: 'NCR proximity for OEM supply (Maruti, Hero). Goodyear India\'s only plant (Ballabgarh) since 1961. Industrial corridor along NH-2. Skilled automotive workforce from Gurgaon ecosystem.' },
  { state: 'Madhya Pradesh', plants: 3, capacity: 0.2, share: 5, majorCompanies: 'JK Tyre', reason: 'Central India location for pan-India distribution. Low land and labor cost. State incentives for manufacturing. JK Tyre\'s Banmore plant serves central India replacement market.' },
  { state: 'Andhra Pradesh', plants: 3, capacity: 0.1, share: 3, majorCompanies: 'Apollo, Birla', reason: 'Government incentives for new investment. Proximity to South India auto OEMs (Kia at Anantapur). Apollo expanded here for southern distribution advantage.' },
  { state: 'Others', plants: 8, capacity: 0.1, share: 2, majorCompanies: 'Various', reason: 'Includes West Bengal (Birla Tyres), Odisha (new investments), and Karnataka (small players). Fragmented small-scale operations.' },
]

// ===== NEWS DATA =====
const newsData = [
  { id: 1, title: "MRF announces Rs 7,000 Cr greenfield EV tyre plant in Gujarat", date: "2025-05-20", region: "West", category: "Business Wins", url: "https://www.business-standard.com" },
  { id: 2, title: "Anti-dumping duty on Chinese truck tyres extended for 5 more years", date: "2025-04-10", region: "National", category: "Policy", url: "https://economictimes.indiatimes.com" },
  { id: 3, title: "Fire at Tamil Nadu tyre plant Banbury mixer area — Rs 45 Cr damage", date: "2025-02-15", region: "South", category: "Accidents", url: "https://www.thehindu.com" },
  { id: 4, title: "Apollo Tyres Perambra plant hit by Kerala floods — 10-day shutdown", date: "2024-08-15", region: "South", category: "Accidents", url: "https://economictimes.indiatimes.com" },
  { id: 5, title: "India tyre industry crosses Rs 95,000 Cr revenue in FY25: ATMA", date: "2025-05-01", region: "National", category: "Business Wins", url: "https://www.atmaindia.org" },
  { id: 6, title: "Natural rubber hits Rs 220/kg — 5-year high squeezing tyre margins", date: "2024-11-20", region: "National", category: "Business Wins", url: "https://www.moneycontrol.com" },
]

// ===== PER CAPITA COMPARISON =====
const perCapitaComparison = [
  { country: 'USA', perCapita: 4.5 },
  { country: 'Europe', perCapita: 3.8 },
  { country: 'Global Avg', perCapita: 3.5 },
  { country: 'China', perCapita: 3.2 },
  { country: 'Brazil', perCapita: 2.0 },
  { country: 'India', perCapita: 1.2 },
  { country: 'Africa Avg', perCapita: 0.5 },
]

// ===== MARKET PULSE DATA =====
const marketPulse = {
  naturalRubber: { price: 220, unit: '₹/kg', change: +12.5, trend: 'up' },
  crudeOil: { price: 78, unit: '$/bbl', change: -3.2, trend: 'down' },
  carbonBlack: { price: 95, unit: '₹/kg', change: +5.8, trend: 'up' },
  demandSentiment: 'Strong',
  riskScore: 7.4,
}

// ===== RADAR CHART DATA (Top 4 players comparison) =====
const radarData = [
  { metric: 'Revenue', MRF: 95, Apollo: 75, JK: 58, CEAT: 50 },
  { metric: 'Margin', MRF: 80, Apollo: 70, JK: 55, CEAT: 60 },
  { metric: 'Growth', MRF: 60, Apollo: 80, JK: 65, CEAT: 75 },
  { metric: 'R&D', MRF: 90, Apollo: 75, JK: 50, CEAT: 55 },
  { metric: 'Exports', MRF: 70, Apollo: 85, JK: 75, CEAT: 65 },
  { metric: 'Brand', MRF: 95, Apollo: 70, JK: 60, CEAT: 65 },
]

// ===== MARKET SHARE CHANGE YoY =====
const marketShareChange = [
  { company: 'MRF', fy24: 23.5, fy25: 24, change: +0.5 },
  { company: 'Apollo', fy24: 17.5, fy25: 18, change: +0.5 },
  { company: 'JK Tyre', fy24: 14.5, fy25: 14, change: -0.5 },
  { company: 'CEAT', fy24: 11.5, fy25: 12, change: +0.5 },
  { company: 'BKT', fy24: 7.5, fy25: 8, change: +0.5 },
  { company: 'Others', fy24: 25.5, fy25: 24, change: -1.5 },
]

export default function TyreDashboard() {
  const [activeTab, setActiveTab] = useState<TyreTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tickerItems = [
    { label: 'Natural Rubber', value: '₹220/kg', change: '+3.5%', direction: 'up' as const },
    { label: 'MRF', value: '₹1,35,000', change: '+0.8%', direction: 'up' as const },
    { label: 'Apollo Tyres', value: '₹520', change: '+1.2%', direction: 'up' as const },
    { label: 'CEAT', value: '₹2,850', change: '-0.5%', direction: 'down' as const },
    { label: 'Carbon Black', value: '₹95/kg', change: '+2.1%', direction: 'up' as const },
    { label: 'Crude Oil', value: '$78/bbl', change: '-1.2%', direction: 'down' as const },
    { label: 'TBR Demand', value: 'Strong', change: '+8%', direction: 'up' as const },
    { label: 'Nifty Auto', value: '24,500', change: '+0.6%', direction: 'up' as const },
  ]

  const tabs: { id: TyreTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'production', label: 'Production', icon: Factory },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
  ]

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      {/* Header */}
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/hub')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition">
              <ArrowLeft size={16} /> Back to Hub
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-8" />
              <div>
                <h1 className="text-lg font-bold text-navy">Tyre Industry Dashboard</h1>
                <p className="text-[10px] text-gray-500 font-medium">ICICI Lombard | Risk & Analytics</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button className="flex items-center gap-1 px-3 py-1.5 bg-orange/10 text-orange rounded-lg text-xs font-semibold">
                <Settings size={14} /> Admin
              </button>
            )}
            <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 bg-navy/5 text-navy rounded-lg text-xs font-semibold hover:bg-navy/10 transition">
              <Download size={13} /> Export
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              {isAdmin ? <Shield size={14} className="text-maroon" /> : <User size={14} className="text-navy" />}
              <span className="text-xs font-semibold">{username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-[48px] z-40 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-maroon text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'production' && <ProductionTab />}
        {activeTab === 'players' && <PlayersOwnershipTab />}
        {activeTab === 'risk' && <RiskTab isAdmin={isAdmin} />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="tyre" />}
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30"><div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between"><p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p><p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p><p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p></div></footer>
    </div>
  )
}

// ===== REUSABLE SOURCE FOOTER =====
function SourceFooter({ source, lastUpdated }: { source?: string; lastUpdated?: string }) {
  return (
    <p className="text-xs text-gray-400 italic mt-3">
      Data as of: {lastUpdated || DATA_META.lastUpdated} | Source: {source || DATA_META.source}
    </p>
  )
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-2">{icon}<span className="text-sm text-gray-500">{label}</span></div>
      <p className="text-2xl font-bold text-navy">{value}</p>
      <p className="text-xs text-green-600 mt-1">{sub}</p>
    </div>
  )
}

function OverviewTab() {
  const d = overviewData
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Factory className="text-maroon" size={20} />} label="Total Capacity" value={`${d.totalCapacity} MT`} sub="FY 2024-25 (Installed)" />
        <StatCard icon={<TrendingUp className="text-navy" size={20} />} label="Total Production" value={`${d.totalProduction} MT`} sub="+3.2% YoY" />
        <StatCard icon={<Gauge className="text-orange" size={20} />} label="Utilization Rate" value={`${d.utilizationRate}%`} sub="62 plants operational" />
        <StatCard icon={<Globe className="text-green-600" size={20} />} label="Global Ranking" value={`#${d.globalRanking}`} sub="After China, USA" />
      </div>

      {/* Industry at a Glance Hero */}
      <div className="relative overflow-hidden rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #831c1d 50%, #f37021 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div className="text-center">
            <div className="text-4xl font-black">3rd</div>
            <div className="text-sm opacity-80 mt-1">Largest Tyre Market Globally</div>
            <div className="text-xs opacity-60 mt-0.5">After China & USA</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black">₹95K Cr</div>
            <div className="text-sm opacity-80 mt-1">Industry Revenue FY25</div>
            <div className="text-xs opacity-60 mt-0.5">+8.5% YoY Growth</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black">62</div>
            <div className="text-sm opacity-80 mt-1">Manufacturing Plants</div>
            <div className="text-xs opacity-60 mt-0.5">Across 10 States</div>
          </div>
        </div>
      </div>

      {/* Market Pulse — Live Indicators */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-navy flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Market Pulse
          </h3>
          <span className="text-[10px] text-gray-400 font-medium">Updated: June 2025</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-3 rounded-xl bg-red-50 border border-red-100">
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Natural Rubber</div>
            <div className="text-lg font-bold text-red-700 mt-1">₹{marketPulse.naturalRubber.price}/kg</div>
            <div className="text-[10px] text-red-600 font-semibold mt-0.5">↑ +{marketPulse.naturalRubber.change}% QoQ</div>
          </div>
          <div className="p-3 rounded-xl bg-green-50 border border-green-100">
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Crude Oil</div>
            <div className="text-lg font-bold text-green-700 mt-1">${marketPulse.crudeOil.price}/bbl</div>
            <div className="text-[10px] text-green-600 font-semibold mt-0.5">↓ {marketPulse.crudeOil.change}% QoQ</div>
          </div>
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Carbon Black</div>
            <div className="text-lg font-bold text-orange-700 mt-1">₹{marketPulse.carbonBlack.price}/kg</div>
            <div className="text-[10px] text-orange-600 font-semibold mt-0.5">↑ +{marketPulse.carbonBlack.change}% QoQ</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Demand Sentiment</div>
            <div className="text-lg font-bold text-blue-700 mt-1">{marketPulse.demandSentiment}</div>
            <div className="text-[10px] text-blue-600 font-semibold mt-0.5">OEM + Replacement</div>
          </div>
          <div className="p-3 rounded-xl bg-maroon/5 border border-maroon/10">
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Industry Risk Score</div>
            <div className="text-lg font-bold text-maroon mt-1">{marketPulse.riskScore}/10</div>
            <div className="text-[10px] text-maroon font-semibold mt-0.5">Moderate-High</div>
          </div>
        </div>
      </div>

      {/* ===== COMBINED HISTORY + FUTURE TIMELINE (merged from Timeline tab) ===== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-navy">India Tyre Industry — Production History & Future Projections (MT)</h3>
            <p className="text-xs text-gray-500 mt-0.5">35-year journey from 0.3 MT (1990) → 3.2 MT (2025) → 4.7 MT target (2030)</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-navy"><span className="w-3 h-0.5 bg-navy inline-block rounded"></span> Actual</span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-orange"><span className="w-3 h-0.5 bg-orange inline-block rounded" style={{ borderBottom: '2px dashed #f37021' }}></span> Projected</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={combinedTimeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="historyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#005B75" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#005B75" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="futureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f37021" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f37021" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" fontSize={10} tick={{ fill: '#64748b' }} />
            <YAxis fontSize={10} domain={[0, 5.5]} tick={{ fill: '#64748b' }} unit=" MT" />
            <Tooltip formatter={(v: number) => `${v} MT`} labelFormatter={(l) => `Year: ${l}`} />
            <Area type="monotone" dataKey="production" stroke="#005B75" strokeWidth={2.5} fill="url(#historyGradient)" name="Actual Production (MT)" dot={{ fill: '#005B75', r: 4, strokeWidth: 2, stroke: '#fff' }} connectNulls={false}>
              <LabelList dataKey="production" position="top" fontSize={9} fill="#005B75" formatter={(v: number) => v ? `${v}` : ''} />
            </Area>
            <Area type="monotone" dataKey="projected" stroke="#f37021" strokeWidth={2.5} strokeDasharray="6 3" fill="url(#futureGradient)" name="Projected (MT)" dot={{ fill: '#f37021', r: 4, strokeWidth: 2, stroke: '#fff' }} connectNulls={false}>
              <LabelList dataKey="projected" position="top" fontSize={9} fill="#f37021" formatter={(v: number) => v ? `${v}` : ''} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
        {/* 2030 Vision Targets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100">
          <div className="text-center p-3 bg-navy/5 rounded-xl">
            <div className="text-xl font-bold text-navy">5.6</div>
            <div className="text-[10px] text-gray-500 font-medium">MT Capacity (2030)</div>
          </div>
          <div className="text-center p-3 bg-maroon/5 rounded-xl">
            <div className="text-xl font-bold text-maroon">4.7</div>
            <div className="text-[10px] text-gray-500 font-medium">MT Production (2030)</div>
          </div>
          <div className="text-center p-3 bg-orange/10 rounded-xl">
            <div className="text-xl font-bold text-orange">98%</div>
            <div className="text-[10px] text-gray-500 font-medium">Radialization Target</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <div className="text-xl font-bold text-green-600">84%</div>
            <div className="text-[10px] text-gray-500 font-medium">Utilization Target</div>
          </div>
        </div>
        <SourceFooter source="ATMA, DPIIT, Vision 2030" />
      </div>

      {/* Segment Split + Yearly Production */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Yearly Production Trend (MT)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={d.yearlyProduction}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" fontSize={10} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="production" stroke="#B02A30" fill="#B02A30" fillOpacity={0.3} name="Production (MT)">
                <LabelList dataKey="production" position="top" fontSize={10} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
          <SourceFooter source="ATMA, DPIIT" />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Segment Split</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={d.segmentSplit} cx="50%" cy="50%" outerRadius={95} dataKey="share" nameKey="segment"
                label={({ segment, share }: any) => `${segment}: ${share}%`} labelLine>
                {d.segmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <SourceFooter source="ATMA" />
        </div>
      </div>

      {/* Per Capita + Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Per Capita Tyre Consumption — Global Comparison (kg/person)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={perCapitaComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={11} unit=" kg" />
              <YAxis dataKey="country" type="category" fontSize={11} width={100} />
              <Tooltip formatter={(v: number) => `${v} kg`} />
              <Bar dataKey="perCapita" name="Per Capita (kg)" radius={[0, 4, 4, 0]}>
                {perCapitaComparison.map((entry, i) => (
                  <Cell key={i} fill={entry.country === 'India' ? '#B02A30' : entry.country === 'Global Avg' ? '#F99D27' : '#005B75'} />
                ))}
                <LabelList dataKey="perCapita" position="right" fontSize={10} formatter={(v: number) => `${v} kg`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <SourceFooter source="ATMA, DPIIT" />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Key Industry Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-maroon/5 rounded-xl">
              <div className="text-2xl font-bold text-maroon">Rs {(d.turnover / 1000).toFixed(0)}K Cr</div>
              <div className="text-sm text-gray-600 font-medium">Industry Turnover</div>
            </div>
            <div className="text-center p-4 bg-navy/5 rounded-xl">
              <div className="text-2xl font-bold text-navy">Rs {(d.exports / 1000).toFixed(0)}K Cr</div>
              <div className="text-sm text-gray-600 font-medium">Exports</div>
            </div>
            <div className="text-center p-4 bg-orange/10 rounded-xl">
              <div className="text-2xl font-bold text-orange">92%</div>
              <div className="text-sm text-gray-600 font-medium">Radialization Level</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{d.replacementMarket}%</div>
              <div className="text-sm text-gray-600 font-medium">Replacement Market</div>
            </div>
          </div>
          <SourceFooter source="ATMA, Company Reports" />
        </div>
      </div>
    </div>
  )
}

function ProductionTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Capacity vs Production vs Utilization (FY17-FY25)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={productionTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={10} />
            <YAxis yAxisId="left" fontSize={11} />
            <YAxis yAxisId="right" orientation="right" fontSize={11} domain={[50, 90]} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="capacity" fill="#005B75" opacity={0.7} name="Capacity (MT)">
              <LabelList dataKey="capacity" position="top" fontSize={9} />
            </Bar>
            <Bar yAxisId="left" dataKey="production" fill="#B02A30" name="Production (MT)">
              <LabelList dataKey="production" position="top" fontSize={9} />
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="utilization" stroke="#F99D27" strokeWidth={3} name="Utilization (%)" dot={{ fill: '#F99D27' }} />
          </ComposedChart>
        </ResponsiveContainer>
        <SourceFooter source="ATMA, DPIIT" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Radialization Progress (%)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={radializationProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={11} />
            <YAxis fontSize={11} domain={[40, 100]} unit="%" />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Line type="monotone" dataKey="radial" stroke="#B02A30" strokeWidth={3} name="Radial Share (%)" dot={{ fill: '#B02A30', r: 5 }}>
              <LabelList dataKey="radial" position="top" fontSize={10} formatter={(v: number) => `${v}%`} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">India radialization grew from 52% (2010) to 92% (2025) — approaching developed market levels of 98%+</p>
        <SourceFooter source="ATMA" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Key Production Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={16} className="text-green-600" /><span className="font-semibold text-sm">Growth Driver</span></div>
            <p className="text-xs text-gray-600">TBR demand growing at 8-10% CAGR driven by infrastructure and logistics boom</p>
          </div>
          <div className="p-4 bg-orange/5 rounded-xl">
            <div className="flex items-center gap-2 mb-2"><AlertTriangle size={16} className="text-orange" /><span className="font-semibold text-sm">Challenge</span></div>
            <p className="text-xs text-gray-600">Natural rubber import dependency at 60% — vulnerable to price shocks</p>
          </div>
          <div className="p-4 bg-navy/5 rounded-xl">
            <div className="flex items-center gap-2 mb-2"><TrendingUp size={16} className="text-navy" /><span className="font-semibold text-sm">EV Opportunity</span></div>
            <p className="text-xs text-gray-600">EV tyre segment emerging — low rolling resistance and noise reduction technologies key focus</p>
          </div>
        </div>
        <SourceFooter source="ATMA, Company Reports" />
      </div>
    </div>
  )
}

function PlayersOwnershipTab() {
  const filteredOwnership = ownershipSplit.filter(o => o.share > 0)
  return (
    <div className="space-y-6">
      {/* Ownership Overview + Top Players Chart side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Ownership Split</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={filteredOwnership} cx="50%" cy="50%" outerRadius={90} dataKey="share" nameKey="type"
                label={({ type, share }: any) => `${type}: ${share}%`}>
                {filteredOwnership.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2">Indian tyre industry is entirely private sector — no PSU presence. 72% Indian-owned, 28% MNC/foreign.</p>
          <SourceFooter source="ATMA" />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Top Players by Revenue (Rs Cr)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topCompanies} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={11} />
              <YAxis dataKey="name" type="category" fontSize={10} width={140} />
              <Tooltip formatter={(v: number) => `Rs ${v.toLocaleString()} Cr`} />
              <Bar dataKey="revenue" fill="#005B75" name="Revenue (Rs Cr)" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="revenue" position="right" fontSize={9} formatter={(v: number) => `${(v/1000).toFixed(1)}K`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <SourceFooter source="Company Annual Reports FY25" />
        </div>
      </div>

      {/* Radar Chart — Top 4 Players Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 4 Players — Multi-dimensional Comparison</h3>
        <p className="text-xs text-gray-500 mb-4">Normalized scores (0-100) across 6 key business dimensions</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" fontSize={11} tick={{ fill: '#1f2937' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={9} tick={{ fill: '#94a3b8' }} />
              <Radar name="MRF" dataKey="MRF" stroke="#B02A30" fill="#B02A30" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Apollo" dataKey="Apollo" stroke="#005B75" fill="#005B75" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="JK Tyre" dataKey="JK" stroke="#F99D27" fill="#F99D27" fillOpacity={0.08} strokeWidth={2} />
              <Radar name="CEAT" dataKey="CEAT" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.08} strokeWidth={2} />
              <Legend fontSize={11} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div>
            <h4 className="font-bold text-sm text-navy mb-3">Market Share Movement (FY24 → FY25)</h4>
            <div className="space-y-2.5">
              {marketShareChange.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                  <div className="w-24 text-sm font-semibold text-navy">{c.company}</div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded-full overflow-hidden relative">
                      <div className="h-full rounded-full bg-gradient-to-r from-navy to-maroon transition-all" style={{ width: `${c.fy25 * 3.5}%` }}></div>
                    </div>
                  </div>
                  <div className="w-14 text-right text-sm font-bold text-navy">{c.fy25}%</div>
                  <div className={`w-12 text-right text-xs font-bold ${c.change > 0 ? 'text-green-600' : c.change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {c.change > 0 ? '↑' : c.change < 0 ? '↓' : '→'}{c.change > 0 ? '+' : ''}{c.change}%
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-3 italic">Source: ATMA, Company Annual Reports FY25</p>
          </div>
        </div>
      </div>

      {/* Detailed Company Table with International Presence */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Detailed Player Information — India & International</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">Company</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Revenue<br/>(Rs Cr)</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Market<br/>Share</th>
                <th className="text-center py-2 px-2 font-bold text-navy">India<br/>Plants</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Intl<br/>Plants</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Segment</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Indian States</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Countries</th>
              </tr>
            </thead>
            <tbody>
              {topCompanies.map((c, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 group">
                  <td className="py-2 px-2 font-semibold text-navy">{c.name}</td>
                  <td className="py-2 px-2 text-center">{c.revenue.toLocaleString()}</td>
                  <td className="py-2 px-2 text-center font-bold text-maroon">{c.marketShare}%</td>
                  <td className="py-2 px-2 text-center font-semibold">{c.plantsIndia}</td>
                  <td className="py-2 px-2 text-center font-semibold text-blue-700">{c.plantsIntl}</td>
                  <td className="py-2 px-2 text-xs">{c.segment}</td>
                  <td className="py-2 px-2 text-xs">{c.state}</td>
                  <td className="py-2 px-2 text-xs text-blue-700">{c.countries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Note: Indian tyre industry is concentrated — top 4 players (MRF, Apollo, JK, CEAT) hold ~68% market share.</p>
        <SourceFooter source="ATMA, Company Annual Reports" />
      </div>

      {/* International Operations Detail */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">International Operations & Global Footprint</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topCompanies.filter(c => c.plantsIntl > 0 || c.countries.includes(',')).map((c, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-navy">{c.name}</h4>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{c.plantsIntl} Intl Plants</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{c.intlDetails}</p>
              <p className="text-[10px] text-gray-400 mt-2">Presence: {c.countries}</p>
            </div>
          ))}
        </div>
        <SourceFooter source="Company Annual Reports, ATMA" />
      </div>
    </div>
  )
}

function TimelineTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">India Tyre Production History (1990-2025)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={historicalProduction}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Area type="monotone" dataKey="production" stroke="#B02A30" fill="#B02A30" fillOpacity={0.3} name="Production (MT)">
              <LabelList dataKey="production" position="top" fontSize={10} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
        <SourceFooter source="ATMA, DPIIT" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Future Projections (2025-2030)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={futureProjections}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={11} />
            <YAxis fontSize={11} domain={[2, 6]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="capacity" stroke="#005B75" strokeWidth={3} strokeDasharray="5 5" name="Capacity Target" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="production" stroke="#B02A30" strokeWidth={3} name="Production" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="demand" stroke="#F99D27" strokeWidth={3} name="Demand" dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
        <SourceFooter source="ATMA Vision 2030" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Industry Vision 2030 Targets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-navy/5 rounded-xl">
            <div className="text-2xl font-bold text-navy">5.6</div>
            <div className="text-xs text-gray-500">MT Capacity</div>
          </div>
          <div className="text-center p-4 bg-maroon/5 rounded-xl">
            <div className="text-2xl font-bold text-maroon">4.7</div>
            <div className="text-xs text-gray-500">MT Production</div>
          </div>
          <div className="text-center p-4 bg-orange/10 rounded-xl">
            <div className="text-2xl font-bold text-orange">98%</div>
            <div className="text-xs text-gray-500">Radialization Target</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">84%</div>
            <div className="text-xs text-gray-500">Utilization Target</div>
          </div>
        </div>
        <SourceFooter source="ATMA Vision 2030" />
      </div>
    </div>
  )
}

function RiskTab({ isAdmin }: { isAdmin: boolean }) {
  type RiskSubTab = 'overview' | 'heatmap' | 'comparison' | 'events' | 'casestudies' | 'mitigation' | 'news'
  const [riskSubTab, setRiskSubTab] = useState<RiskSubTab>('overview')

  const industryRisks = [
    { id: 1, category: 'Raw Material Risk', risk: 'Natural rubber price volatility (60% imported, dependent on Thailand/Indonesia)', severity: 'High', impact: 5, probability: 4, trend: '↑', score: 8.5 },
    { id: 2, category: 'Energy & Fuel Cost', risk: 'Carbon black and crude oil derivative cost escalation', severity: 'High', impact: 4, probability: 5, trend: '↑', score: 8.0 },
    { id: 3, category: 'Import Dumping Risk', risk: 'Chinese tyre dumping at below-cost prices despite anti-dumping duty', severity: 'High', impact: 4, probability: 4, trend: '→', score: 7.5 },
    { id: 4, category: 'Fire & Explosion Risk', risk: 'Banbury mixer explosion and rubber compound fire in mixing department', severity: 'Critical', impact: 5, probability: 3, trend: '→', score: 8.8 },
    { id: 5, category: 'Technology Risk', risk: 'EV tyre technology gap — need for low rolling resistance and noise reduction', severity: 'Medium', impact: 3, probability: 4, trend: '↑', score: 6.5 },
    { id: 6, category: 'Environmental Risk', risk: 'End-of-life tyre disposal and EPR compliance costs', severity: 'Medium', impact: 3, probability: 4, trend: '↑', score: 6.2 },
    { id: 7, category: 'Supply Chain Risk', risk: 'Nylon/polyester cord fabric supply concentration and import dependency', severity: 'Medium', impact: 3, probability: 3, trend: '→', score: 5.8 },
    { id: 8, category: 'Machinery Breakdown', risk: 'Curing press hydraulic failure causing production loss and quality rejection', severity: 'High', impact: 4, probability: 4, trend: '→', score: 7.2 },
    { id: 9, category: 'Market Risk', risk: 'Replacement market slowdown due to radial tyre longevity improvement', severity: 'Medium', impact: 3, probability: 4, trend: '↑', score: 6.0 },
    { id: 10, category: 'Climate Risk', risk: 'Flood damage to low-lying plants (especially Kerala coast)', severity: 'High', impact: 5, probability: 3, trend: '→', score: 7.0 },
  ]

  const riskComparison = [
    { risk: 'Natural Rubber Price', current: 8.5, lastMonth: 8.3, lastQuarter: 8.0, lastYear: 7.5 },
    { risk: 'Energy/Carbon Black', current: 8.0, lastMonth: 7.8, lastQuarter: 7.5, lastYear: 7.0 },
    { risk: 'Fire & Explosion', current: 8.8, lastMonth: 8.8, lastQuarter: 8.8, lastYear: 8.5 },
    { risk: 'Import Dumping', current: 7.5, lastMonth: 7.5, lastQuarter: 7.8, lastYear: 8.0 },
    { risk: 'Machinery BD', current: 7.2, lastMonth: 7.2, lastQuarter: 7.0, lastYear: 7.0 },
    { risk: 'Climate/Flood', current: 7.0, lastMonth: 7.0, lastQuarter: 6.8, lastYear: 6.5 },
  ]

  const majorEvents = [
    { date: '2025-04-10', event: 'Anti-dumping duty on Chinese TBR tyres extended for 5 years by DGTR', impact: 'High', affected: 'All TBR manufacturers', summary: 'Duty of $245-452/tonne maintained. Provides protection to domestic TBR manufacturers against Chinese imports.' },
    { date: '2025-02-15', event: 'Fire at rubber compound mixing unit in Tamil Nadu tyre plant', impact: 'Critical', affected: 'Major TBR manufacturer', summary: 'Banbury mixer area fire due to overheating. Rs 45 Cr damage. 2-week production loss in TBR segment.' },
    { date: '2024-11-20', event: 'Natural rubber prices hit 5-year high at Rs 220/kg', impact: 'High', affected: 'All tyre manufacturers', summary: 'Thailand production cuts and China demand surge pushed NR prices up 35% in 6 months. Margin compression across industry.' },
    { date: '2024-08-15', event: 'Kerala floods damage Apollo Tyres Perambra plant operations', impact: 'High', affected: 'Apollo Tyres Ltd', summary: 'Flood water ingress damaged electrical systems and raw material storage. 10-day shutdown. Rs 25 Cr loss.' },
    { date: '2024-06-01', event: 'BIS mandatory certification for imported tyres tightened', impact: 'Medium', affected: 'Importers, Chinese brands', summary: 'Stricter quality testing requirements reduce dumped imports by estimated 15-20%.' },
    { date: '2025-05-20', event: 'MRF announces Rs 7,000 Cr greenfield plant in Gujarat for EV tyres', impact: 'High', affected: 'MRF Ltd, Gujarat state', summary: 'Dedicated EV tyre facility for PCR and 2W segments. To be operational by 2027. 50 lakh tyres/year capacity.' },
  ]

  const caseStudies = [
    {
      title: "Banbury Mixer Fire at TBR Plant, Tamil Nadu (2025)",
      background: "A major TBR manufacturing plant experienced a fire originating in the rubber compound mixing department. The Banbury mixer — which operates at 150-180°C mixing rubber with carbon black, sulphur, and accelerators — overheated beyond safe limits.",
      riskIdentified: "Temperature control failure in Banbury mixer. Accumulated rubber dust in exhaust ducting ignited. Inadequate CO2 suppression system coverage in mixer area.",
      businessImpact: "Rs 45 Cr material damage (mixer destroyed + adjacent calendar damaged). 14-day production loss in TBR segment. BI loss Rs 18 Cr. Total: Rs 63 Cr. Insurance claim under processing.",
      mitigation: "Post-incident: Redundant temperature sensors installed, exhaust ducting clean-out protocol (weekly), CO2 flooding system extended to cover entire mixing hall, mixer operation SOPs revised with auto-shutdown at 185°C.",
      learnings: ["Banbury mixers are the highest fire risk equipment in any tyre plant — treat as critical", "Rubber dust in exhaust systems is a hidden explosion risk — mandatory weekly cleaning", "Temperature interlocks must auto-shutdown mixer at design limits, not rely on operator judgment", "Adjacent equipment (calender, extruder) must be protected with fire walls"]
    },
    {
      title: "Kerala Flood Damage to Tyre Manufacturing Facility (2024)",
      background: "A coastal tyre plant in Kerala experienced severe flooding during the monsoon season. The plant, situated at low elevation near a river, had water ingress reaching 1.5m inside the factory floor.",
      riskIdentified: "Low-lying plant location in flood-prone zone. Electrical panels at ground level. Raw material (carbon black, chemicals) stored at floor level without elevation. Inadequate flood barriers.",
      businessImpact: "Electrical systems destroyed (MCC panels, VFDs, transformers). Carbon black stock ruined (2,000 MT at Rs 80/kg = Rs 16 Cr). Curing presses submerged requiring complete overhaul. Total: Rs 25 Cr. 10-day shutdown.",
      mitigation: "Electrical panels elevated to 2m height. Flood barriers installed at all entry points. Critical raw materials shifted to elevated storage. Flood insurance coverage enhanced.",
      learnings: ["Kerala coastal plants must assume annual flood risk — design accordingly", "Electrical panels MUST be elevated above historical flood level + 1m margin", "Carbon black is hydrophobic but contamination from flood water renders it unusable", "Curing press hydraulics are extremely sensitive to water contamination — overhaul cost Rs 5-8 Cr per press"]
    },
    {
      title: "Curing Press Hydraulic Failure Causing Mass Rejection, Western India (2023)",
      background: "A leading PCR manufacturer experienced simultaneous hydraulic failures in a battery of 8 curing presses. The presses, operating at 170°C and 200 bar pressure, developed seal failures leading to pressure drops during cure cycle.",
      riskIdentified: "Ageing hydraulic seals (beyond OEM-recommended replacement interval). Hydraulic oil contamination from particulate matter. Inadequate predictive maintenance — no oil particle count monitoring.",
      businessImpact: "8 presses offline for 5 days each. 12,000 tyres rejected as under-cured (safety risk — cannot be sold). Rejection value: Rs 8 Cr. Production loss: Rs 4 Cr. Total: Rs 12 Cr. Recall of 2,000 tyres already dispatched from same batch.",
      mitigation: "Oil particle monitoring system installed (ISO 4406 cleanliness target). Seal replacement now at 80% of OEM life, not 100%. Predictive maintenance with vibration analysis on hydraulic pumps.",
      learnings: ["Curing presses are safety-critical — under-cured tyres are a life safety risk on road", "Hydraulic oil contamination is a leading cause of seal failure — monitor ISO particle counts", "Replace seals at 80% of rated life as preventive measure, not at failure", "Any batch from a compromised press must be quarantined and tested before dispatch"]
    },
  ]

  const mitigationRecommendations = [
    { risk: 'Banbury Mixer Fire', priority: 'Critical', recommendation: 'Install redundant temperature sensors with auto-shutdown at 185°C. Weekly exhaust duct cleaning. CO2 flooding system for entire mixing hall. Fire walls between mixing and calendering.', owner: 'Plant Safety Head', timeline: '3 months' },
    { risk: 'Flood Damage', priority: 'Critical', recommendation: 'Elevate all electrical panels to 2m+. Install flood barriers at factory entries. Shift chemicals to elevated storage. Enhanced flood insurance. Annual flood drill.', owner: 'Plant Engineer', timeline: '6 months' },
    { risk: 'Curing Press Failure', priority: 'High', recommendation: 'ISO 4406 oil particle monitoring. Replace seals at 80% life. Vibration analysis on hydraulic pumps. Quarantine protocol for any press with anomalous cure cycle.', owner: 'Maintenance Head', timeline: 'Immediate' },
    { risk: 'Natural Rubber Price', priority: 'High', recommendation: 'Long-term NR purchase contracts (6-12 month forward). Increase synthetic rubber substitution where possible. Develop domestic NR plantation partnerships in NE India.', owner: 'Procurement Head', timeline: 'Ongoing' },
    { risk: 'Import Dumping', priority: 'Medium', recommendation: 'Continue anti-dumping duty advocacy through ATMA. Invest in quality differentiation. Build brand premium over Chinese imports. Focus on replacement market loyalty.', owner: 'Strategy/Policy Head', timeline: 'Ongoing' },
    { risk: 'EV Tyre Technology', priority: 'Medium', recommendation: 'R&D investment in low rolling resistance compounds. Noise reduction technology. Partnerships with EV OEMs for co-development. Dedicated EV tyre production line.', owner: 'R&D Head', timeline: '18 months' },
  ]

  const riskNews = [
    { headline: 'Anti-dumping duty on Chinese truck tyres extended 5 years — DGTR', source: 'Economic Times', date: '2025-04-10', summary: 'Duty of $245-452/tonne continues. Protects Rs 15,000 Cr domestic TBR market from unfair Chinese pricing.', url: 'https://economictimes.indiatimes.com' },
    { headline: 'Natural rubber prices surge to Rs 220/kg on global supply concerns', source: 'ATMA Bulletin', date: '2025-03-15', summary: 'Thailand and Indonesia production cuts combined with China restocking drive 35% price increase in 6 months.', url: 'https://www.atmaindia.org' },
    { headline: 'MRF plans Rs 7,000 Cr EV tyre plant in Gujarat — largest single tyre investment', source: 'Business Standard', date: '2025-05-20', summary: '50 lakh tyre/year capacity dedicated to EV segment. Low rolling resistance PCR and 2W tyres. Operational by 2027.', url: 'https://www.business-standard.com' },
    { headline: 'Fire at tyre plant mixing department in Tamil Nadu causes Rs 45 Cr damage', source: 'The Hindu', date: '2025-02-15', summary: 'Banbury mixer overheating led to rubber compound fire. 14-day production disruption in TBR segment.', url: 'https://www.thehindu.com' },
    { headline: 'BIS tightens quality norms for imported tyres — Chinese brands affected', source: 'PIB', date: '2024-06-01', summary: 'Stricter testing and certification requirements expected to reduce dumped imports by 15-20% annually.', url: 'https://www.pib.gov.in' },
  ]

  const riskKPIs = { totalActive: 10, critical: 2, high: 4, emerging: 2, mitigated: 4, overallScore: 7.4 }

  const getSeverityBadge = (severity: string) => {
    if (severity === 'Critical') return 'text-red-700 bg-red-100'
    if (severity === 'High') return 'text-orange-700 bg-orange-100'
    if (severity === 'Medium') return 'text-yellow-700 bg-yellow-100'
    return 'text-green-700 bg-green-100'
  }

  const getTrendColor = (trend: string) => {
    if (trend === '↑') return 'text-red-600'
    if (trend === '↓') return 'text-green-600'
    return 'text-gray-500'
  }

  const subTabs = [
    { key: 'overview' as const, label: 'Industry Risk Overview' },
    { key: 'heatmap' as const, label: 'Risk Heatmap' },
    { key: 'comparison' as const, label: 'Risk Comparison' },
    { key: 'events' as const, label: 'Major Events' },
    { key: 'casestudies' as const, label: 'Case Studies' },
    { key: 'mitigation' as const, label: 'Mitigation' },
    { key: 'news' as const, label: 'Risk News' },
  ]

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
        {subTabs.map((tab) => (
          <button key={tab.key} onClick={() => setRiskSubTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              riskSubTab === tab.key ? 'bg-maroon text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Industry Risk Overview */}
      {riskSubTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
              <div className="text-2xl font-bold text-navy">{riskKPIs.totalActive}</div>
              <div className="text-xs text-gray-500 mt-1">Active Risks</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-red-200 shadow-sm text-center">
              <div className="text-2xl font-bold text-red-700">{riskKPIs.critical}</div>
              <div className="text-xs text-gray-500 mt-1">Critical</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-orange-200 shadow-sm text-center">
              <div className="text-2xl font-bold text-orange-700">{riskKPIs.high}</div>
              <div className="text-xs text-gray-500 mt-1">High</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-yellow-200 shadow-sm text-center">
              <div className="text-2xl font-bold text-yellow-700">{riskKPIs.emerging}</div>
              <div className="text-xs text-gray-500 mt-1">Emerging</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm text-center">
              <div className="text-2xl font-bold text-green-700">{riskKPIs.mitigated}</div>
              <div className="text-xs text-gray-500 mt-1">Mitigated</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
              <div className="text-2xl font-bold text-maroon">{riskKPIs.overallScore}/10</div>
              <div className="text-xs text-gray-500 mt-1">Overall Score</div>
            </div>
          </div>

          {/* Top 10 Risks Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-red-500" /> Top 10 Industry Risks</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-navy/20">
                    <th className="text-left py-2 px-2 font-bold text-navy">#</th>
                    <th className="text-left py-2 px-2 font-bold text-navy">Category</th>
                    <th className="text-left py-2 px-2 font-bold text-navy">Risk Description</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Severity</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Score</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {industryRisks.map((r) => (
                    <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-2 px-2 font-semibold text-gray-500">{r.id}</td>
                      <td className="py-2 px-2 font-semibold text-navy">{r.category}</td>
                      <td className="py-2 px-2 text-gray-700">{r.risk}</td>
                      <td className="py-2 px-2 text-center"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSeverityBadge(r.severity)}`}>{r.severity}</span></td>
                      <td className="py-2 px-2 text-center font-bold text-maroon">{r.score}</td>
                      <td className={`py-2 px-2 text-center text-lg ${getTrendColor(r.trend)}`}>{r.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SourceFooter source="ATMA, Industry Risk Assessment 2025" />
          </div>
        </div>
      )}

      {/* Tab 2: Risk Heatmap */}
      {riskSubTab === 'heatmap' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Risk Heatmap — Impact vs Probability</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="probability" name="Probability" domain={[0, 6]} fontSize={11} label={{ value: 'Probability (1-5)', position: 'insideBottom', offset: -5 }} />
                <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 6]} fontSize={11} label={{ value: 'Impact (1-5)', angle: -90, position: 'insideLeft' }} />
                <ZAxis type="number" dataKey="score" range={[200, 600]} name="Risk Score" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: number, name: string) => [value, name]} />
                <Scatter data={industryRisks.filter(r => r.severity === 'Critical')} fill="#DC2626" name="Critical Severity">
                  <LabelList dataKey="category" position="top" fontSize={9} />
                </Scatter>
                <Scatter data={industryRisks.filter(r => r.severity === 'High')} fill="#EA580C" name="High Severity">
                  <LabelList dataKey="category" position="top" fontSize={9} />
                </Scatter>
                <Scatter data={industryRisks.filter(r => r.severity === 'Medium')} fill="#F59E0B" name="Medium Severity">
                  <LabelList dataKey="category" position="top" fontSize={9} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* 3x3 Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-navy mb-4">Simplified 3x3 Risk Matrix</h4>
            <div className="grid grid-cols-4 gap-1 text-xs">
              <div className="p-2 font-bold text-center">Impact ↓ / Prob →</div>
              <div className="p-2 font-bold text-center bg-gray-100 rounded">Low (1-2)</div>
              <div className="p-2 font-bold text-center bg-gray-100 rounded">Medium (3)</div>
              <div className="p-2 font-bold text-center bg-gray-100 rounded">High (4-5)</div>

              <div className="p-2 font-bold text-center bg-gray-100 rounded">High (4-5)</div>
              <div className="p-2 bg-yellow-100 rounded text-center">Supply Chain</div>
              <div className="p-2 bg-orange-100 rounded text-center">Fire & Explosion, Climate</div>
              <div className="p-2 bg-red-100 rounded text-center font-semibold">Raw Material, Energy, Machinery</div>

              <div className="p-2 font-bold text-center bg-gray-100 rounded">Medium (3)</div>
              <div className="p-2 bg-green-100 rounded text-center">—</div>
              <div className="p-2 bg-yellow-100 rounded text-center">Environmental, Supply Chain</div>
              <div className="p-2 bg-orange-100 rounded text-center">Import Dumping, EV Tech, Market</div>

              <div className="p-2 font-bold text-center bg-gray-100 rounded">Low (1-2)</div>
              <div className="p-2 bg-green-100 rounded text-center">—</div>
              <div className="p-2 bg-green-100 rounded text-center">—</div>
              <div className="p-2 bg-yellow-100 rounded text-center">—</div>
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 border border-red-300 rounded"></span> Critical Zone</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-100 border border-orange-300 rounded"></span> High Zone</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></span> Medium Zone</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 border border-green-300 rounded"></span> Low Zone</span>
            </div>
            <SourceFooter source="ATMA, Industry Risk Assessment 2025" />
          </div>
        </div>
      )}

      {/* Tab 3: Risk Comparison */}
      {riskSubTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-maroon" /> Risk Score Trend — Current vs Last Year</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={riskComparison} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="risk" fontSize={11} />
                <YAxis domain={[0, 10]} fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#B02A30" name="Current Score" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="current" position="top" fontSize={10} />
                </Bar>
                <Bar dataKey="lastYear" fill="#005B75" name="Last Year" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="lastYear" position="top" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-navy mb-3">Detailed Risk Score Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-navy/20">
                    <th className="text-left py-2 px-2 font-bold text-navy">Risk</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Current</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Last Month</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Last Quarter</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Last Year</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">YoY Change</th>
                  </tr>
                </thead>
                <tbody>
                  {riskComparison.map((r, i) => {
                    const change = r.current - r.lastYear
                    return (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="py-2 px-2 font-semibold">{r.risk}</td>
                        <td className="py-2 px-2 text-center font-bold text-maroon">{r.current}</td>
                        <td className="py-2 px-2 text-center">{r.lastMonth}</td>
                        <td className="py-2 px-2 text-center">{r.lastQuarter}</td>
                        <td className="py-2 px-2 text-center">{r.lastYear}</td>
                        <td className={`py-2 px-2 text-center font-bold ${change > 0 ? 'text-red-600' : change < 0 ? 'text-green-600' : 'text-gray-500'}`}>
                          {change > 0 ? '↑' : change < 0 ? '↓' : '→'} {change > 0 ? '+' : ''}{change.toFixed(1)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <SourceFooter source="ATMA, Risk Intelligence Quarterly Report" />
          </div>
        </div>
      )}

      {/* Tab 4: Major Industry Events */}
      {riskSubTab === 'events' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2"><Flame size={18} className="text-red-500" /> Major Industry Risk Events</h3>
          {majorEvents.map((evt, i) => (
            <div key={i} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${evt.impact === 'Critical' ? 'border-l-red-700' : evt.impact === 'High' ? 'border-l-orange-500' : 'border-l-yellow-500'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSeverityBadge(evt.impact)}`}>{evt.impact}</span>
                  <span className="text-xs text-gray-500">{evt.date}</span>
                </div>
              </div>
              <h4 className="font-bold text-navy mb-1">{evt.event}</h4>
              <p className="text-sm text-gray-600 mb-2">{evt.summary}</p>
              <p className="text-xs text-gray-500"><span className="font-semibold">Affected:</span> {evt.affected}</p>
            </div>
          ))}
          <SourceFooter source="ATMA, DGTR, Industry Reports, Media Sources" />
        </div>
      )}

      {/* Tab 5: Case Studies */}
      {riskSubTab === 'casestudies' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2"><CloudRain size={18} className="text-blue-500" /> Detailed Risk Case Studies</h3>
          {caseStudies.map((cs, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-maroon mb-4">{cs.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold text-navy text-sm mb-1">Background</h5>
                  <p className="text-sm text-gray-600">{cs.background}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-navy text-sm mb-1">Risk Identified</h5>
                  <p className="text-sm text-gray-600">{cs.riskIdentified}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold text-navy text-sm mb-1">Business Impact</h5>
                  <p className="text-sm text-red-700 font-medium">{cs.businessImpact}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-navy text-sm mb-1">Mitigation Taken</h5>
                  <p className="text-sm text-gray-600">{cs.mitigation}</p>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-navy text-sm mb-2">Key Learnings</h5>
                <ul className="space-y-1">
                  {cs.learnings.map((l, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <SourceFooter source="ATMA, Insurance Claims Data, Plant Investigation Reports" />
        </div>
      )}

      {/* Tab 6: Mitigation Recommendations */}
      {riskSubTab === 'mitigation' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2"><Shield size={18} className="text-green-600" /> Mitigation Recommendations</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-navy/20">
                    <th className="text-left py-2 px-2 font-bold text-navy">Risk</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Priority</th>
                    <th className="text-left py-2 px-2 font-bold text-navy">Recommendation</th>
                    <th className="text-left py-2 px-2 font-bold text-navy">Owner</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {mitigationRecommendations.map((m, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-2 px-2 font-semibold text-navy">{m.risk}</td>
                      <td className="py-2 px-2 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSeverityBadge(m.priority)}`}>{m.priority}</span>
                      </td>
                      <td className="py-2 px-2 text-gray-700 text-xs max-w-md">{m.recommendation}</td>
                      <td className="py-2 px-2 text-xs font-medium">{m.owner}</td>
                      <td className="py-2 px-2 text-center text-xs font-semibold text-navy">{m.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SourceFooter source="ATMA, Industry Best Practices, Insurance Risk Engineering" />
          </div>
        </div>
      )}

      {/* Tab 7: Risk News */}
      {riskSubTab === 'news' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2"><Newspaper size={18} className="text-navy" /> Risk-Related News</h3>
          {riskNews.map((n, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-500 font-medium">{n.source} | {n.date}</span>
              </div>
              <h4 className="font-bold text-navy mb-2">{n.headline}</h4>
              <p className="text-sm text-gray-600 mb-3">{n.summary}</p>
              <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-sm text-maroon font-semibold hover:underline">
                Read More →
              </a>
            </div>
          ))}
          <SourceFooter source="Economic Times, ATMA, Business Standard, PIB" />
        </div>
      )}
    </div>
  )
}

function GeographyTab() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const selectedInfo = stateWise.find(s => s.state === selectedState)

  return (
    <div className="space-y-6">
      {/* Popup Modal */}
      {selectedState && selectedInfo && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">Why {selectedState} is a tyre manufacturing hub</h3>
              <button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-4 bg-navy/5 rounded-xl mb-4">
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div><div className="text-lg font-bold text-maroon">{selectedInfo.plants}</div><div className="text-[10px] text-gray-500">Plants</div></div>
                <div><div className="text-lg font-bold text-navy">{selectedInfo.capacity} MT</div><div className="text-[10px] text-gray-500">Capacity</div></div>
                <div><div className="text-lg font-bold text-orange">{selectedInfo.share}%</div><div className="text-[10px] text-gray-500">Market Share</div></div>
              </div>
              <p className="text-xs text-gray-600"><strong>Major Players:</strong> {selectedInfo.majorCompanies}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy mb-2">Key Reasons</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedInfo.reason}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Capacity Distribution (MT)</h3>
        <p className="text-xs text-gray-500 mb-4">Click on any bar to see why that state is a tyre hub</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={stateWise} layout="vertical" onClick={(data: any) => { if (data && data.activePayload) setSelectedState(data.activePayload[0]?.payload?.state) }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontSize={11} />
            <YAxis dataKey="state" type="category" fontSize={10} width={120} />
            <Tooltip formatter={(v: number) => `${v} MT`} />
            <Bar dataKey="capacity" fill="#005B75" name="Capacity (MT)" radius={[0, 4, 4, 0]} cursor="pointer">
              <LabelList dataKey="capacity" position="right" fontSize={9} formatter={(v: number) => `${v} MT`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <SourceFooter source="ATMA, DPIIT" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Detailed State-wise Distribution</h3>
        <p className="text-xs text-gray-500 mb-3">👆 Click on any state name or the "Why?" button to see why that state is a tyre manufacturing hub</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">State</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Plants</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Capacity (MT)</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Share (%)</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Major Companies</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Insight</th>
              </tr>
            </thead>
            <tbody>
              {stateWise.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-maroon/5 cursor-pointer transition" onClick={() => setSelectedState(s.state)}>
                  <td className="py-2 px-2 font-semibold text-maroon underline decoration-dotted">{s.state}</td>
                  <td className="py-2 px-2 text-center">{s.plants}</td>
                  <td className="py-2 px-2 text-center">{s.capacity}</td>
                  <td className="py-2 px-2 text-center font-bold text-maroon">{s.share}%</td>
                  <td className="py-2 px-2 text-xs text-gray-600">{s.majorCompanies}</td>
                  <td className="py-2 px-2 text-center">
                    <span className="text-xs font-bold text-white bg-maroon px-3 py-1.5 rounded-lg shadow-sm hover:bg-maroon-600 transition inline-block">
                      Why?
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceFooter source="ATMA, DPIIT" />
      </div>
    </div>
  )
}

function NewsTab() {
  const [regionFilter, setRegionFilter] = useState<string>('All')
  const regions = ['All', 'National', 'South', 'West', 'North', 'East']
  const filteredNews = regionFilter === 'All' ? newsData : newsData.filter(n => n.region === regionFilter)

  const getCategoryBadge = (category: string) => {
    if (category === 'Accidents') return 'text-red-700 bg-red-100'
    if (category === 'Policy') return 'text-blue-700 bg-blue-100'
    if (category === 'Business Wins') return 'text-green-700 bg-green-100'
    return 'text-gray-700 bg-gray-100'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-navy">Filter by Region:</span>
        {regions.map((r) => (
          <button key={r} onClick={() => setRegionFilter(r)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              regionFilter === r ? 'bg-maroon text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {r}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredNews.map((n) => (
          <div key={n.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getCategoryBadge(n.category)}`}>{n.category}</span>
              <span className="text-xs text-gray-500">{n.date} | {n.region}</span>
            </div>
            <h4 className="font-bold text-navy mb-2">{n.title}</h4>
            <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-sm text-maroon font-semibold hover:underline">
              Read More →
            </a>
          </div>
        ))}
      </div>
      <SourceFooter source="Economic Times, Business Standard, ATMA, The Hindu" />
    </div>
  )
}
