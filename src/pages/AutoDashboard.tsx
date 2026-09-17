import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, Car
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LabelList
} from 'recharts'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import AnimatedCounter from '../components/AnimatedCounter'
import LiveTicker from '../components/LiveTicker'
import HealthGauge from '../components/HealthGauge'

const COLORS = ['#B02A30', '#005B75', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#00BCD4', '#795548']

type AutoTab = 'overview' | 'production' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot'

// ===== OVERVIEW DATA =====
const segmentData = [
  { name: 'Two-Wheelers', value: 72.5, color: '#B02A30' },
  { name: 'Passenger Vehicles', value: 16.8, color: '#005B75' },
  { name: 'Commercial Vehicles', value: 4.2, color: '#F99D27' },
  { name: 'Three-Wheelers', value: 6.5, color: '#4CAF50' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Two-Wheelers': { subtypes: [{ name: 'Motorcycles', share: '62%' }, { name: 'Scooters', share: '33%' }, { name: 'Mopeds', share: '3%' }, { name: 'Electric 2W', share: '2%' }], desc: '18M+ units/year — India is world\'s largest 2W market. Hero MotoCorp + Honda dominate.' },
  'Passenger Vehicles': { subtypes: [{ name: 'Hatchback', share: '32%' }, { name: 'SUV/UV', share: '48%' }, { name: 'Sedan', share: '12%' }, { name: 'MPV/Van', share: '8%' }], desc: '4.2M+ units in FY25 — SUV share surpassed 48%, biggest shift in Indian auto.' },
  'Commercial Vehicles': { subtypes: [{ name: 'M&HCV (Trucks)', share: '40%' }, { name: 'LCV', share: '45%' }, { name: 'Buses', share: '10%' }, { name: 'SCV', share: '5%' }], desc: '1M+ units — GDP proxy. Tata Motors 44% share. Infra push driving growth.' },
  'Three-Wheelers': { subtypes: [{ name: 'Passenger (Auto)', share: '60%' }, { name: 'Cargo', share: '25%' }, { name: 'E-Rickshaw', share: '15%' }], desc: '0.9M units — EV penetration highest here (50%+). Bajaj RE, Piaggio lead.' },
}

const routeData = [
  { name: 'ICE Petrol', value: 52, color: '#B02A30' },
  { name: 'ICE Diesel', value: 22, color: '#005B75' },
  { name: 'CNG/LPG', value: 14, color: '#F99D27' },
  { name: 'Electric (BEV)', value: 7, color: '#4CAF50' },
  { name: 'Hybrid (HEV/PHEV)', value: 5, color: '#9C27B0' },
]

const routeDetails: Record<string, string> = {
  'ICE Petrol': 'Internal Combustion Engine — petrol/gasoline. Still dominant in 2W and entry hatchbacks. BS-VI emission norms since April 2020.',
  'ICE Diesel': 'Declining share due to BS-VI cost increase (₹1-2L more). Strong in SUVs, CVs. Maruti exited diesel in 2020, re-entered 2023.',
  'CNG/LPG': 'Fastest growing ICE alt-fuel. Maruti (65% CNG share), Tata, Hyundai. ₹2-3/km vs ₹6/km petrol. 6,000+ CNG stations.',
  'Electric (BEV)': 'Battery Electric Vehicles — 2.1M units (mostly 2W). Tata leads PV EVs (63% share). FAME II + state subsidies.',
  'Hybrid (HEV/PHEV)': 'Strong Hybrid (Toyota, Maruti Grand Vitara) + Mild Hybrid. No FAME subsidy but lower GST at 43% vs 48%.',
}

const timelineData = [
  { year: '1983', event: 'Maruti 800 Launch', type: 'history', value: 10 },
  { year: '1991', event: 'Liberalization — FDI in Auto', type: 'history', value: 20 },
  { year: '2005', event: 'India crosses 10M units', type: 'history', value: 40 },
  { year: '2010', event: 'Nano launch — cheapest car', type: 'history', value: 50 },
  { year: '2017', event: 'GST implementation', type: 'history', value: 55 },
  { year: '2020', event: 'BS-VI rollout nationwide', type: 'history', value: 60 },
  { year: '2022', event: 'India 3rd largest auto market', type: 'history', value: 70 },
  { year: '2025', event: '30.6M units — record', type: 'history', value: 80 },
  { year: '2027', event: 'EV penetration 15% (target)', type: 'future', value: 85 },
  { year: '2030', event: '40M units, 30% EV (target)', type: 'future', value: 95 },
]

const perCapitaData = [
  { country: 'USA', vehicles: 838 },
  { country: 'Japan', vehicles: 620 },
  { country: 'Germany', vehicles: 580 },
  { country: 'China', vehicles: 220 },
  { country: 'Brazil', vehicles: 180 },
  { country: 'India', vehicles: 35 },
  { country: 'Global Avg', vehicles: 200 },
]

// ===== PRODUCTION DATA =====
const globalProduction = [
  { country: 'China', production: 30.2 },
  { country: 'USA', production: 10.8 },
  { country: 'India', production: 5.8 },
  { country: 'Japan', production: 9.0 },
  { country: 'Germany', production: 4.1 },
  { country: 'South Korea', production: 3.8 },
  { country: 'Mexico', production: 3.5 },
  { country: 'Brazil', production: 2.4 },
  { country: 'Thailand', production: 1.9 },
  { country: 'Indonesia', production: 1.4 },
]

const supplyDemandData = [
  { year: 'FY20', production: 26.4, demand: 21.5, exports: 4.8, imports: 0.4 },
  { year: 'FY21', production: 22.7, demand: 18.6, exports: 4.1, imports: 0.3 },
  { year: 'FY22', production: 26.1, demand: 21.2, exports: 5.0, imports: 0.4 },
  { year: 'FY23', production: 28.4, demand: 23.5, exports: 5.2, imports: 0.5 },
  { year: 'FY24', production: 29.6, demand: 24.8, exports: 5.1, imports: 0.5 },
  { year: 'FY25', production: 30.6, demand: 25.6, exports: 5.3, imports: 0.6 },
]

const exportDetails = [
  { country: 'Africa', value: '$3.2B', share: '28%', vehicles: 'Motorcycles, 3W, LCVs' },
  { country: 'ASEAN', value: '$2.1B', share: '18%', vehicles: 'PVs, 2W, Components' },
  { country: 'Latin America', value: '$1.8B', share: '15%', vehicles: 'SUVs, Compact cars' },
  { country: 'Middle East', value: '$1.5B', share: '13%', vehicles: 'SUVs, Commercial Vehicles' },
  { country: 'Europe', value: '$1.2B', share: '10%', vehicles: 'EVs, Compact SUVs' },
  { country: 'USA/Canada', value: '$0.8B', share: '7%', vehicles: 'Components, 2W' },
]

const importDetails = [
  { country: 'Japan', value: '$1.2B', share: '30%', vehicles: 'CKD kits, Luxury cars (Toyota, Honda)' },
  { country: 'Germany', value: '$1.0B', share: '25%', vehicles: 'Luxury (BMW, Mercedes, Audi CBU)' },
  { country: 'South Korea', value: '$0.6B', share: '15%', vehicles: 'Kia/Hyundai CKD, EV components' },
  { country: 'China', value: '$0.5B', share: '12%', vehicles: 'EV batteries, electronics, BYD CKD' },
  { country: 'UK/USA', value: '$0.4B', share: '10%', vehicles: 'JLR, Harley-Davidson, Tesla parts' },
]

const capacityPipeline = [
  { company: 'Tata Motors', location: 'Tamil Nadu', capacity: '300K EVs/yr', year: 'FY26', investment: '₹9,000 Cr' },
  { company: 'Maruti Suzuki', location: 'Kharkhoda, Haryana', capacity: '1M units/yr', year: 'FY26-28', investment: '₹18,000 Cr' },
  { company: 'Hyundai Motor', location: 'Talegaon, Pune', capacity: '250K units/yr', year: 'FY27', investment: '₹6,000 Cr' },
  { company: 'JSW MG Motor', location: 'Gujarat', capacity: '200K units/yr', year: 'FY27', investment: '₹5,000 Cr' },
  { company: 'Mahindra', location: 'Pune (Chakan Phase 2)', capacity: '350K SUVs/yr', year: 'FY26', investment: '₹12,000 Cr' },
  { company: 'Toyota-Suzuki', location: 'Gujarat (JV)', capacity: '500K units/yr', year: 'FY27', investment: '₹8,000 Cr' },
  { company: 'VinFast', location: 'Tamil Nadu (Greenfield)', capacity: '150K EVs/yr', year: 'FY28', investment: '₹4,000 Cr' },
  { company: 'BYD India', location: 'Hyderabad', capacity: '100K EVs/yr', year: 'FY27', investment: '₹3,000 Cr' },
]

// ===== PLAYERS DATA =====
const playersData = [
  { rank: 1, name: 'Maruti Suzuki', capacity: 3.2, revenue: 145000, route: 'ICE+CNG', products: 'PV (Hatchback, SUV, Sedan)', share: 42 },
  { rank: 2, name: 'Tata Motors', capacity: 1.5, revenue: 115000, route: 'ICE+EV', products: 'PV + CV + EV', share: 14.5 },
  { rank: 3, name: 'Hyundai Motor', capacity: 0.82, revenue: 72000, route: 'ICE+EV', products: 'PV (SUV, Sedan)', share: 14.2 },
  { rank: 4, name: 'Mahindra & Mahindra', capacity: 0.85, revenue: 98000, route: 'ICE+EV', products: 'SUV + Farm + CV', share: 11.5 },
  { rank: 5, name: 'Toyota Kirloskar', capacity: 0.40, revenue: 52000, route: 'Hybrid+ICE', products: 'PV (SUV, MPV)', share: 5.8 },
  { rank: 6, name: 'Kia India', capacity: 0.35, revenue: 38000, route: 'ICE+EV', products: 'PV (SUV, MPV)', share: 5.2 },
  { rank: 7, name: 'Honda Cars', capacity: 0.24, revenue: 18000, route: 'ICE', products: 'PV (Sedan, SUV)', share: 2.1 },
  { rank: 8, name: 'MG Motor (JSW)', capacity: 0.15, revenue: 12000, route: 'ICE+EV', products: 'PV (SUV, EV)', share: 1.8 },
  { rank: 9, name: 'Skoda-VW', capacity: 0.20, revenue: 15000, route: 'ICE', products: 'PV (SUV, Sedan)', share: 2.5 },
  { rank: 10, name: 'Renault-Nissan', capacity: 0.30, revenue: 8000, route: 'ICE', products: 'PV (SUV, Compact)', share: 1.4 },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'Maruti Suzuki': { hq: 'Gurugram', ceo: 'Hisashi Takeuchi', founded: '1981', type: 'JV (Suzuki 58%)', plants: 'Gurugram, Manesar, Kharkhoda (new)', expansion: 'Kharkhoda mega plant — 1M units by FY28. First BEV (eVX) in FY25. New SUV-heavy portfolio.', moat: '42% PV share, 6,500+ dealer touchpoints, lowest cost structure, CNG leader (70% CNG market)' },
  'Tata Motors': { hq: 'Mumbai', ceo: 'Girish Wagh (CV), Shailesh Chandra (PV)', founded: '1945', type: 'Private (Tata Group)', plants: 'Pune, Sanand, Lucknow, Jamshedpur, Dharwad', expansion: 'Tamil Nadu EV plant (₹9,000 Cr). Target 50K EVs/month by FY27. JLR luxury + Tata mass EV.', moat: 'EV leader (63% share), strongest brand recall after Maruti, CV #1, JLR luxury arm' },
  'Hyundai Motor': { hq: 'Chennai', ceo: 'Unsoo Kim', founded: '1996 (India)', type: 'FDI (Hyundai Korea 100%)', plants: 'Sriperumbudur (Chennai), Talegaon (Pune — new)', expansion: 'Talegaon 250K unit plant by FY27. 6 EVs by 2028. IPO listed Oct 2024 (₹27,000 Cr).', moat: 'Premium positioning, quality perception, export hub (20% of production exported), Creta dominance' },
  'Mahindra & Mahindra': { hq: 'Mumbai', ceo: 'Anish Shah', founded: '1945', type: 'Private', plants: 'Nashik, Chakan (Pune), Zaheerabad, Haridwar', expansion: 'Born Electric platform — 5 SUV EVs by FY27. Chakan Phase 2 for 350K SUVs. ₹12,000 Cr investment.', moat: 'SUV DNA (Thar, Scorpio, XUV), farm equipment #1, rural reach, rugged brand image' },
  'Toyota Kirloskar': { hq: 'Bangalore', ceo: 'Masakazu Yoshimura', founded: '1997', type: 'JV (Toyota 89%)', plants: 'Bidadi (Bangalore)', expansion: 'Strong hybrid leadership. Innova HyCross/Fortuner dominate premium. Suzuki JV cross-badging.', moat: 'Hybrid technology leader (no EV rush), highest resale value, Innova/Fortuner moat, reliability brand' },
  'Kia India': { hq: 'Anantapur (AP)', ceo: 'Gwanggu Lee', founded: '2019 (India)', type: 'FDI (Hyundai Group)', plants: 'Anantapur (AP)', expansion: 'EV9 launch FY26. Capacity expansion to 400K units. Connected car features.', moat: 'Fastest-growing OEM, design-led strategy, Seltos/Sonet success, value-for-money premium' },
}

const radarData = [
  { metric: 'Revenue', Maruti: 95, Tata: 80, Hyundai: 60, Mahindra: 70 },
  { metric: 'Market Share', Maruti: 95, Tata: 45, Hyundai: 45, Mahindra: 38 },
  { metric: 'EV Readiness', Maruti: 30, Tata: 95, Hyundai: 60, Mahindra: 70 },
  { metric: 'Export', Maruti: 70, Tata: 40, Hyundai: 85, Mahindra: 50 },
  { metric: 'Network', Maruti: 95, Tata: 70, Hyundai: 60, Mahindra: 65 },
  { metric: 'Brand', Maruti: 85, Tata: 80, Hyundai: 75, Mahindra: 70 },
]

const marketShareTrend = [
  { company: 'Maruti Suzuki', fy23: 44.2, fy25: 41.5, change: -2.7 },
  { company: 'Tata Motors', fy23: 13.8, fy25: 14.5, change: +0.7 },
  { company: 'Hyundai', fy23: 15.0, fy25: 14.2, change: -0.8 },
  { company: 'Mahindra', fy23: 9.8, fy25: 11.5, change: +1.7 },
  { company: 'Toyota', fy23: 4.5, fy25: 5.8, change: +1.3 },
  { company: 'Others', fy23: 12.7, fy25: 12.5, change: -0.2 },
]

// ===== GEOGRAPHY DATA =====
const geographyData = [
  { state: 'Tamil Nadu', capacity: 4.2, share: 22, majorPlayers: 'Hyundai, Renault-Nissan, BMW, Daimler, Ashok Leyland, TVS', reason: 'Chennai = "Detroit of India". 4 ports for exports. Auto component ecosystem (Ambattur, Oragadam). Skilled labor from engineering colleges. Proximity to rubber/leather suppliers for interiors.' },
  { state: 'Maharashtra', capacity: 3.8, share: 20, majorPlayers: 'Tata Motors, M&M, Bajaj, Fiat, VW-Skoda, Force Motors', reason: 'Pune-Nashik auto corridor. Chakan MIDC is India\'s largest auto zone. Proximity to steel (JSW Dolvi). Mumbai port for exports. Established vendor base since 1960s.' },
  { state: 'Haryana', capacity: 3.2, share: 17, majorPlayers: 'Maruti Suzuki, Hero MotoCorp, Honda 2W', reason: 'NCR proximity — largest consumer market. Maruti Manesar + Kharkhoda mega factory. IMT Manesar is India\'s 2W hub. Highway connectivity to North India demand centers.' },
  { state: 'Karnataka', capacity: 2.5, share: 13, majorPlayers: 'Toyota, Volvo-Eicher, Bosch, Continental', reason: 'Bangalore R&D hub (all global OEMs have tech centers). Bidadi industrial area. Bosch/Continental supplier presence. IT talent for connected/autonomous vehicles.' },
  { state: 'Gujarat', capacity: 2.2, share: 12, majorPlayers: 'Tata Motors (Sanand), Suzuki (Gujarat plant), MG Motor, Honda', reason: 'Mundra/Pipavav ports for export. No octroi (SGST benefit). Suzuki Gujarat = 750K units. Land availability. Proximity to Delhi-Mumbai Industrial Corridor (DMIC).' },
  { state: 'Rajasthan', capacity: 1.5, share: 8, majorPlayers: 'Honda Cars (Tapukara), Hero MotoCorp (Neemrana)', reason: 'Japanese Industrial Zone (Neemrana). Low labor cost. Proximity to NCR market. RIICO industrial estates. Clean manufacturing zones.' },
  { state: 'Andhra Pradesh', capacity: 1.2, share: 6, majorPlayers: 'Kia India (Anantapur), Isuzu', reason: 'Fastest-growing auto state. Kia\'s 300K unit plant. Government incentives (largest in India). Skilled workforce from Hyderabad spillover.' },
  { state: 'Uttarakhand', capacity: 0.5, share: 2, majorPlayers: 'Bajaj, Hero, Ashok Leyland (Pantnagar)', reason: 'Tax incentives (erstwhile excise exemption). Pantnagar SIDCUL zone. Low land cost. Access to North/East India markets via NH.' },
]

// ===== MAIN COMPONENT =====
export default function AutoDashboard() {
  const [activeTab, setActiveTab] = useState<AutoTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tabs: { id: AutoTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'production', label: 'Production', icon: Factory },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
  ]

  const tickerItems = [
    { label: 'Maruti Suzuki', value: '₹12,850', change: '+1.4%', direction: 'up' as const },
    { label: 'Tata Motors', value: '₹785', change: '+2.1%', direction: 'up' as const },
    { label: 'M&M', value: '₹2,950', change: '+0.6%', direction: 'up' as const },
    { label: 'Hyundai India', value: '₹1,820', change: '-0.3%', direction: 'down' as const },
    { label: 'Bajaj Auto', value: '₹9,500', change: '+1.8%', direction: 'up' as const },
    { label: 'Hero MotoCorp', value: '₹5,200', change: '+0.9%', direction: 'up' as const },
    { label: 'Eicher Motors', value: '₹4,600', change: '-0.5%', direction: 'down' as const },
    { label: 'Ashok Leyland', value: '₹228', change: '+1.1%', direction: 'up' as const },
    { label: 'TVS Motor', value: '₹2,480', change: '+2.3%', direction: 'up' as const },
    { label: 'Nifty Auto', value: '26,800', change: '+0.9%', direction: 'up' as const },
    { label: 'Kia India (Unlisted)', value: '₹38K Cr Rev', change: '+22%', direction: 'up' as const },
    { label: 'PV Sales (Jun)', value: '3.8L units', change: '+8%', direction: 'up' as const },
  ]

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/hub')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition">
              <ArrowLeft size={14} /> Back to Hub
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-8" />
              <div>
                <h1 className="text-sm font-extrabold text-navy">Automobile OEMs Dashboard</h1>
                <p className="text-[10px] text-gray-500 font-medium">ICICI Lombard | Risk & Analytics</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && <button className="flex items-center gap-1 px-3 py-1.5 bg-orange/10 text-orange rounded-lg text-xs font-bold"><Settings size={13} /> Admin</button>}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              {isAdmin ? <Shield size={13} className="text-maroon" /> : <User size={13} className="text-navy" />}
              <span className="text-xs font-bold">{username}</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-100 sticky top-[48px] z-40 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}>
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'production' && <ProductionTab />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab isAdmin={isAdmin} />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="automobile" />}
      </main>

      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30"><div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between"><p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p><p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p><p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p></div></footer>
    </div>
  )
}

// ===== OVERVIEW TAB =====
function OverviewTab() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] rounded-2xl p-6 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><Car size={20} className="text-orange-300" /><span className="text-[10px] font-semibold text-orange-200 uppercase tracking-wide">India's Automobile Industry</span></div>
          <h2 className="text-2xl font-black">3rd Largest Auto Market Globally</h2>
          <p className="text-sm text-white/70 mt-1">30.6 Million units produced • $240 Billion industry • 6.8% EV penetration • 7.1% of GDP</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <div className="text-2xl font-black text-maroon"><AnimatedCounter end={30.6} decimals={1} suffix="M" /></div>
          <div className="text-[10px] font-semibold text-gray-500 mt-1">Total Production (FY25)</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <div className="text-2xl font-black text-green-600"><AnimatedCounter end={12} suffix="%" /></div>
          <div className="text-[10px] font-semibold text-gray-500 mt-1">Growth (YoY)</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <div className="text-2xl font-black text-navy">#<AnimatedCounter end={3} /></div>
          <div className="text-[10px] font-semibold text-gray-500 mt-1">Global Rank</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <div className="text-2xl font-black text-orange-600"><AnimatedCounter end={6.8} decimals={1} suffix="%" /></div>
          <div className="text-[10px] font-semibold text-gray-500 mt-1">EV Penetration</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <div className="text-2xl font-black text-blue-600"><AnimatedCounter end={79} suffix="%" /></div>
          <div className="text-[10px] font-semibold text-gray-500 mt-1">Capacity Utilization</div>
        </div>
      </div>

      {/* Health Gauge */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <HealthGauge score={78} label="Auto Industry Health" />
      </div>

      {/* Segment Split + Route Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Segment Pie */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Vehicle Segment Split (FY25)</h3>
          <p className="text-xs text-gray-500 mb-3">👆 Click any segment for subtypes and details</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name} ${value}%`} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">
                {segmentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Route Split Pie */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Powertrain / Fuel Split (FY25)</h3>
          <p className="text-xs text-gray-500 mb-3">👆 Click to understand each powertrain type</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={routeData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name} ${value}%`} onClick={(_, i) => setSelectedRoute(routeData[i].name)} cursor="pointer">
                {routeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segment Popup */}
      {selectedSegment && segmentDetails[selectedSegment] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{selectedSegment}</h3>
              <button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p>
            <div className="space-y-2">
              {segmentDetails[selectedSegment].subtypes.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-xs font-semibold text-gray-700">{s.name}</span>
                  <span className="text-xs font-bold text-maroon">{s.share}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Route Popup */}
      {selectedRoute && routeDetails[selectedRoute] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRoute(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{selectedRoute}</h3>
              <button onClick={() => setSelectedRoute(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <p className="text-sm text-gray-700">{routeDetails[selectedRoute]}</p>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Indian Auto Industry Timeline (1983–2030)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" fontSize={10} />
            <YAxis fontSize={10} hide />
            <Tooltip content={({ active, payload }) => active && payload?.[0] ? (<div className="bg-white p-2 rounded-lg shadow-lg border text-xs"><p className="font-bold text-navy">{payload[0].payload.year}</p><p className="text-gray-600">{payload[0].payload.event}</p></div>) : null} />
            <Line type="monotone" dataKey="value" stroke="#1e3a5f" strokeWidth={2} dot={{ fill: '#f37021', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Per Capita Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Vehicles Per 1,000 People (Motorization Rate)</h3>
        <p className="text-xs text-gray-500 mb-3">India at 35 vs USA 838 — enormous growth potential</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={perCapitaData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={10} />
            <YAxis dataKey="country" type="category" fontSize={10} width={80} />
            <Tooltip formatter={(v: number) => `${v} per 1,000`} />
            <Bar dataKey="vehicles" radius={[0, 4, 4, 0]}>
              {perCapitaData.map((entry, i) => <Cell key={i} fill={entry.country === 'India' ? '#f37021' : entry.country === 'Global Avg' ? '#B02A30' : '#1e3a5f'} />)}
              <LabelList dataKey="vehicles" position="right" fontSize={9} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ===== PRODUCTION TAB =====
function ProductionTab() {
  const [showExports, setShowExports] = useState(false)
  const [showImports, setShowImports] = useState(false)

  return (
    <div className="space-y-6">
      {/* Global Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Global Vehicle Production (Million Units, 2024)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={globalProduction} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={10} unit="M" />
            <YAxis dataKey="country" type="category" fontSize={10} width={90} />
            <Tooltip formatter={(v: number) => `${v}M units`} />
            <Bar dataKey="production" radius={[0, 4, 4, 0]}>
              {globalProduction.map((entry, i) => <Cell key={i} fill={entry.country === 'India' ? '#f37021' : entry.country === 'China' ? '#B02A30' : '#1e3a5f'} />)}
              <LabelList dataKey="production" position="right" fontSize={9} formatter={(v: number) => `${v}M`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Supply-Demand */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">India Auto — Production vs Demand vs Trade</h3>
        <p className="text-xs text-gray-500 mb-3">👆 Click Export/Import lines for country-wise breakup</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={supplyDemandData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" fontSize={10} />
            <YAxis fontSize={10} unit="M" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="production" name="Production" stroke="#1e3a5f" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="demand" name="Domestic Demand" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="exports" name="Exports (click)" stroke="#f37021" strokeWidth={2} dot={{ r: 4 }} activeDot={{ onClick: () => setShowExports(true) }} />
            <Line type="monotone" dataKey="imports" name="Imports (click)" stroke="#B02A30" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ onClick: () => setShowImports(true) }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-2 mt-3">
          <button onClick={() => setShowExports(true)} className="text-[10px] px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg font-semibold border border-orange-200 hover:bg-orange-100">📤 View Export Breakup</button>
          <button onClick={() => setShowImports(true)} className="text-[10px] px-3 py-1.5 bg-red-50 text-red-700 rounded-lg font-semibold border border-red-200 hover:bg-red-100">📥 View Import Breakup</button>
        </div>
      </div>

      {/* Export Popup */}
      {showExports && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExports(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">India Auto Exports — Destination Breakup (FY25)</h3>
              <button onClick={() => setShowExports(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <p className="text-xs text-gray-500 mb-3">Total Auto Exports: $11.5 Billion (5.3M units)</p>
            <table className="w-full text-xs">
              <thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Region</th><th className="text-right py-2 px-2 font-bold text-navy">Value</th><th className="text-right py-2 px-2 font-bold text-navy">Share</th><th className="text-left py-2 px-2 font-bold text-navy">Key Vehicles</th></tr></thead>
              <tbody>{exportDetails.map((e, i) => (<tr key={i} className="border-b border-gray-50"><td className="py-2 px-2 font-semibold">{e.country}</td><td className="py-2 px-2 text-right font-bold text-maroon">{e.value}</td><td className="py-2 px-2 text-right">{e.share}</td><td className="py-2 px-2 text-gray-600">{e.vehicles}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* Import Popup */}
      {showImports && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowImports(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">India Auto Imports — Source Breakup (FY25)</h3>
              <button onClick={() => setShowImports(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <p className="text-xs text-gray-500 mb-3">Total Auto Imports: ~$4 Billion (mostly luxury CBU + CKD kits)</p>
            <table className="w-full text-xs">
              <thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Country</th><th className="text-right py-2 px-2 font-bold text-navy">Value</th><th className="text-right py-2 px-2 font-bold text-navy">Share</th><th className="text-left py-2 px-2 font-bold text-navy">Key Items</th></tr></thead>
              <tbody>{importDetails.map((e, i) => (<tr key={i} className="border-b border-gray-50"><td className="py-2 px-2 font-semibold">{e.country}</td><td className="py-2 px-2 text-right font-bold text-maroon">{e.value}</td><td className="py-2 px-2 text-right">{e.share}</td><td className="py-2 px-2 text-gray-600">{e.vehicles}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* Capacity Pipeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Capacity Pipeline — Upcoming Auto Plants (FY26-28)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-left py-2 px-2 font-bold text-navy">Location</th><th className="text-right py-2 px-2 font-bold text-navy">Capacity</th><th className="text-center py-2 px-2 font-bold text-navy">Timeline</th><th className="text-right py-2 px-2 font-bold text-navy">Investment</th></tr></thead>
            <tbody>{capacityPipeline.map((c, i) => (<tr key={i} className="border-b border-gray-50 hover:bg-orange-50/30"><td className="py-2 px-2 font-semibold text-navy">{c.company}</td><td className="py-2 px-2 text-gray-600">{c.location}</td><td className="py-2 px-2 text-right font-bold text-maroon">{c.capacity}</td><td className="py-2 px-2 text-center"><span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-semibold">{c.year}</span></td><td className="py-2 px-2 text-right font-semibold">{c.investment}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ===== PLAYERS TAB =====
function PlayersTab() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const selected = selectedPlayer ? playerDetails[selectedPlayer] : null

  return (
    <div className="space-y-6">
      {/* Player Popup */}
      {selectedPlayer && selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3>
              <button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div>
              <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div>
              <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div>
              <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Plants</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div>
              <div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div>
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Top OEMs — PV Market Share (%)</h3>
          <p className="text-xs text-gray-500 mb-3">👆 Click any bar for company deep-dive</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={playersData} layout="vertical" onClick={(data: any) => { if (data?.activePayload) setSelectedPlayer(data.activePayload[0]?.payload?.name) }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={10} unit="%" />
              <YAxis dataKey="name" type="category" fontSize={10} width={110} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="share" name="Market Share %" radius={[0, 4, 4, 0]} cursor="pointer">
                {playersData.map((_, i) => <Cell key={i} fill={i < 2 ? '#f37021' : i < 5 ? '#1e3a5f' : '#94a3b8'} />)}
                <LabelList dataKey="share" position="right" fontSize={9} formatter={(v: number) => `${v}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Top 4 — Multi-Dimensional Comparison</h3>
          <p className="text-xs text-gray-500 mb-3">Scores normalized 0-100 across 6 dimensions</p>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" fontSize={10} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={8} />
              <Radar name="Maruti" dataKey="Maruti" stroke="#f37021" fill="#f37021" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Tata" dataKey="Tata" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Hyundai" dataKey="Hyundai" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.08} strokeWidth={2} />
              <Radar name="Mahindra" dataKey="Mahindra" stroke="#9C27B0" fill="#9C27B0" fillOpacity={0.08} strokeWidth={2} />
              <Legend fontSize={10} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Share Movement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">PV Market Share Movement (FY23 → FY25)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {marketShareTrend.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-1">
                <div className="text-sm font-bold text-navy">{c.company}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#f37021]" style={{ width: `${c.fy25 * 2}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-navy w-12 text-right">{c.fy25}%</span>
                </div>
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-lg ${c.change > 0 ? 'bg-green-100 text-green-700' : c.change < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                {c.change > 0 ? '↑' : '↓'}{c.change > 0 ? '+' : ''}{c.change}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-navy mb-2">Detailed OEM Profiles</h3>
        <p className="text-xs text-gray-500 mb-3">👆 Click any row for expansion plans and competitive moat</p>
        <table className="w-full text-xs">
          <thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Capacity (M)</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (₹Cr)</th><th className="text-center py-2 px-2 font-bold text-navy">Powertrain</th><th className="text-center py-2 px-2 font-bold text-navy">Share %</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead>
          <tbody>{playersData.map((p) => (
            <tr key={p.rank} className="border-b border-gray-50 hover:bg-orange-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}>
              <td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td>
              <td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td>
              <td className="py-2.5 px-2 text-right font-bold">{p.capacity}M</td>
              <td className="py-2.5 px-2 text-right">₹{p.revenue.toLocaleString()}</td>
              <td className="py-2.5 px-2 text-center"><span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-semibold">{p.route}</span></td>
              <td className="py-2.5 px-2 text-center font-bold text-orange-600">{p.share}%</td>
              <td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View →</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

// ===== RISK TAB =====
function RiskTab({ isAdmin }: { isAdmin: boolean }) {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'framework' | 'emerging' | 'bestpractices'>('insurable')

  const aogRisks = [
    { name: 'Earthquake', probability: 'Low', impact: 'Very High', emv: '₹100-500 Cr', mitigation: 'Seismic-resistant structures, equipment anchoring, BCP for supply chain disruption' },
    { name: 'Flood', probability: 'Medium', impact: 'High', emv: '₹50-300 Cr', mitigation: 'Elevated storage for finished vehicles, flood-proofed substations, alternate dispatch routes' },
    { name: 'Cyclone', probability: 'Medium', impact: 'High', emv: '₹30-200 Cr', mitigation: 'Wind-rated factory sheds, open yard vehicle protection, pre-cyclone evacuation SOP' },
    { name: 'Lightning', probability: 'Medium-High', impact: 'Medium', emv: '₹5-20 Cr', mitigation: 'ESE lightning protection on paint shops, surge protection on robotic controllers' },
  ]

  const nonAogRisks = [
    { name: 'Paint Shop Fire', probability: 'Medium-High', impact: 'Catastrophic', emv: '₹200-1000 Cr', mitigation: 'VOC detection, automatic suppression (CO2/foam), explosion-proof electrical fittings' },
    { name: 'Robotic Arm Malfunction', probability: 'High', impact: 'Medium', emv: '₹10-80 Cr', mitigation: 'Predictive maintenance, OEM service contracts, redundancy in critical welding stations' },
    { name: 'Press Shop Die Failure', probability: 'High', impact: 'Medium-High', emv: '₹20-100 Cr', mitigation: 'Die life monitoring, preventive re-grinding schedule, spare die inventory' },
    { name: 'Conveyor System Failure', probability: 'Medium', impact: 'High', emv: '₹30-150 Cr', mitigation: 'Drive motor condition monitoring, chain tensioning schedule, bypass capability' },
    { name: 'EV Battery Thermal Runaway', probability: 'Low', impact: 'Catastrophic', emv: '₹50-500 Cr', mitigation: 'BMS monitoring, thermal barriers, fire-rated battery storage, water-mist suppression' },
    { name: 'Supply Chain Disruption', probability: 'Medium-High', impact: 'Very High', emv: '₹100-800 Cr', mitigation: 'Dual sourcing, safety stock for critical chips/semi-conductors, regional supplier development' },
  ]

  const riskSubTabs = [
    { id: 'insurable' as const, label: 'Insurable Risks' },
    { id: 'framework' as const, label: 'Risk Framework' },
    { id: 'emerging' as const, label: 'Emerging Tech' },
    { id: 'bestpractices' as const, label: 'Best Practices' },
  ]

  const emvTableData = [
    { risk: 'Paint Shop Fire', prob: 8, impact: 600, emv: 48.0, owner: 'EHS', strategy: 'Transfer' },
    { risk: 'Supply Chain Disruption', prob: 15, impact: 400, emv: 60.0, owner: 'SCM Head', strategy: 'Mitigate' },
    { risk: 'EV Battery Thermal Runaway', prob: 3, impact: 500, emv: 15.0, owner: 'EV Team', strategy: 'Transfer' },
    { risk: 'Flood (Chennai/Gujarat)', prob: 10, impact: 200, emv: 20.0, owner: 'Plant Head', strategy: 'Transfer' },
    { risk: 'Robotic Arm Failure', prob: 20, impact: 50, emv: 10.0, owner: 'Maintenance', strategy: 'Mitigate' },
    { risk: 'Press Die Failure', prob: 18, impact: 60, emv: 10.8, owner: 'Production', strategy: 'Accept' },
    { risk: 'Conveyor Breakdown', prob: 12, impact: 100, emv: 12.0, owner: 'Maintenance', strategy: 'Mitigate' },
    { risk: 'Earthquake', prob: 2, impact: 500, emv: 10.0, owner: 'Design Engineer', strategy: 'Transfer' },
    { risk: 'Product Recall', prob: 5, impact: 300, emv: 15.0, owner: 'Quality Head', strategy: 'Transfer' },
    { risk: 'Cyber Attack (Connected Cars)', prob: 8, impact: 150, emv: 12.0, owner: 'IT/CISO', strategy: 'Transfer' },
  ]

  const emergingTechRisks = [
    { segment: 'EV Manufacturing', tech: 'Gigafactory / Battery Cell Production', stage: 'Scaling', risks: 'Thermal runaway in dry rooms, NMP solvent fire, lithium dust explosion, high-voltage testing accidents', insurance: 'Bespoke fire + MB policy with lithium battery extension. MLOP critical.', challenge: 'No Indian loss history for cell manufacturing. Global incidents (LG Chem, CATL fires) used for pricing.' },
    { segment: 'Connected Cars', tech: 'V2X / OTA Updates / ADAS', stage: 'Deployed', risks: 'Remote hijacking, OTA bricking millions of vehicles, ADAS sensor failure causing accidents, privacy breach', insurance: 'Cyber + Product Liability combo. Product recall insurance essential.', challenge: 'Attribution of liability — is it OEM, Tier-1, or software vendor fault? Regulatory framework evolving.' },
    { segment: 'Autonomous Driving', tech: 'L3/L4 Self-Driving', stage: 'Pilot', risks: 'Pedestrian detection failure, sensor degradation, regulatory ambiguity, ethical dilemma coding', insurance: 'No standard product. Needs hybrid of product liability + professional indemnity + cyber.', challenge: 'Who is liable in accident — driver, OEM, software company, or map provider? No Indian regulation yet.' },
    { segment: 'Hydrogen Fuel Cell', tech: 'FCEV for CV/Bus segment', stage: 'Demo', risks: 'H2 storage vessel BLEVE (700 bar), fueling station explosion, membrane degradation in fuel cell stack', insurance: 'CAR/EAR for station construction. No standard operational cover.', challenge: 'Zero commercial deployment in India. NTPC/IOCL pilots ongoing. Insurance capacity limited globally.' },
  ]

  const bestPractices = [
    { practice: 'Paint Shop Fire Audit', frequency: 'Quarterly', segment: 'Paint Shop', detail: 'VOC concentration monitoring, electrostatic gun earthing checks, booth airflow verification' },
    { practice: 'Robot Calibration & PM', frequency: 'Monthly', segment: 'Body Shop', detail: 'TCP (Tool Center Point) calibration, servo motor health check, cable harness inspection' },
    { practice: 'Press Die Maintenance', frequency: 'Per 50K strokes', segment: 'Press Shop', detail: 'Die edge inspection, lubrication system check, tonnage monitoring, crack detection (MPI)' },
    { practice: 'Battery Safety Protocol', frequency: 'Daily', segment: 'EV Assembly', detail: 'BMS self-test, thermal paste inspection, torque verification on HV connectors, insulation resistance test' },
    { practice: 'Conveyor & Hanger PM', frequency: 'Weekly', segment: 'Assembly Line', detail: 'Chain elongation measurement, drive motor vibration analysis, encoder calibration' },
    { practice: 'Vehicle Yard Protection', frequency: 'Seasonal (monsoon)', segment: 'Dispatch Yard', detail: 'Drainage checks, elevated parking for premium vehicles, hail netting, CCTV fire watch' },
  ]

  const caseStudies = [
    { title: 'Chennai Floods — Hyundai/Renault (Dec 2015)', plant: 'Sriperumbudur, TN', loss: '₹3,500 Cr (industry-wide)', cause: 'Unprecedented 490mm rain in 24 hours. Entire Oragadam/Sriperumbudur belt submerged 8 feet.', lesson: 'Elevated substations, JIT inventory = vulnerability (no buffer stock). Need flood insurance + BI extension.', claimType: 'AOG Flood + FLOP' },
    { title: 'Maruti Manesar — Fire in Paint Shop (2019)', plant: 'Manesar, Haryana', loss: '₹80 Cr (PD + 12-day shutdown)', cause: 'Electrostatic ignition of overspray particles in paint booth. Fire spread via ducting.', lesson: 'Interlocked ventilation-spray systems, automatic CO2 flooding, fire-rated ducting between booths.', claimType: 'Fire + MLOP' },
    { title: 'Tata Nano Plant — Vendor Fire (Sanand 2022)', plant: 'Sanand, Gujarat', loss: '₹45 Cr (BI from vendor)', cause: 'Critical single-source wiring harness supplier had fire. Tata production stopped 8 days.', lesson: 'Contingent BI insurance for critical Tier-1 vendors. Dual sourcing for sole-source components.', claimType: 'Contingent BI' },
    { title: 'MG Motor — Hailstorm Damage (2023)', plant: 'Halol, Gujarat', loss: '₹25 Cr (800 vehicles damaged)', cause: 'Severe hailstorm — vehicles in open dispatch yard suffered dented panels/broken glass.', lesson: 'Hail netting, covered dispatch bays for premium vehicles, rapid transit SOP post-weather warning.', claimType: 'AOG Storm + Stock' },
  ]

  const probColor = (p: string) => p === 'High' ? 'bg-red-100 text-red-700' : p === 'Medium-High' ? 'bg-orange-100 text-orange-700' : p === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
  const impactColor = (i: string) => i === 'Catastrophic' || i === 'Very High' ? 'bg-red-100 text-red-700' : i === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'

  return (
    <div className="space-y-6">
      {/* ISO Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-maroon" />
          <div>
            <h3 className="text-sm font-bold text-navy">ISO 31000:2018 Risk Management Framework</h3>
            <p className="text-xs text-gray-500">Automobile OEMs — Press Shop | Body Shop | Paint Shop | Assembly | EV Line</p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 flex-wrap">
        {riskSubTabs.map((tab) => (
          <button key={tab.id} onClick={() => setRiskSubTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${riskSubTab === tab.id ? 'bg-maroon text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Insurable Risks */}
      {riskSubTab === 'insurable' && (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2"><CloudRain size={16} className="text-blue-500" /> Acts of God (AOG) Perils</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aogRisks.map((r, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                  <h5 className="font-bold text-navy text-sm mb-2">{r.name}</h5>
                  <div className="flex gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${probColor(r.probability)}`}>P: {r.probability}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${impactColor(r.impact)}`}>I: {r.impact}</span>
                  </div>
                  <p className="text-xs font-bold text-maroon mb-1">{r.emv}</p>
                  <p className="text-[10px] text-gray-500 italic">{r.mitigation}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2"><Flame size={16} className="text-red-500" /> Non-AOG (Operational) Perils</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nonAogRisks.map((r, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                  <h5 className="font-bold text-navy text-sm mb-2">{r.name}</h5>
                  <div className="flex gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${probColor(r.probability)}`}>P: {r.probability}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${impactColor(r.impact)}`}>I: {r.impact}</span>
                  </div>
                  <p className="text-xs font-bold text-maroon mb-1">{r.emv}</p>
                  <p className="text-[10px] text-gray-500 italic">{r.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Products & Key Add-ons — Automobile */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-1 flex items-center gap-2"><Shield size={16} className="text-maroon" /> Insurance Products & Key Add-ons — Automobile OEMs</h4>
            <p className="text-xs text-gray-500 mb-5">Coverages offered for the automobile manufacturing sector</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h5 className="text-xs font-bold text-navy mb-3">Material Damage Add-ons</h5>
                <ul className="space-y-1.5">
                  {['Obsolete Part/Equipment Clause', 'OEM Clause', 'Waiver of Under Insurance', 'Margin Clause', 'Capital Additions', 'Destruction of Sound Property Clause', 'Additional Custom Duty', 'Immediate Repair Clause', 'Minor Works', 'Expediting Expenses (Air & Express Freight)', 'Accidental Damage', 'Serial Loss Clause', 'Stock in Open Clause (Finished Vehicles)', 'Spontaneous Combustion (EV Batteries)'].map((item, i) => (
                    <li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h5 className="text-xs font-bold text-navy mb-3">Business Interruption Add-ons</h5>
                <ul className="space-y-1.5">
                  {['Customer Premises Extension', 'Additional Increased Cost of Working', 'Prevention of Access', 'Contingent BI (Tier-1 Supplier Dependency)', 'Interdependency Clause (Press → Body → Paint → Assembly)', 'Utilities Extension (Power/Water failure)', 'Denial of Access (civil authority)', 'Contract Penalty Clause (OEM delivery delay)', 'Port Blockage Extension'].map((item, i) => (
                    <li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h5 className="text-xs font-bold text-navy mb-3">Key Products</h5>
              <div className="flex flex-wrap gap-2">
                {['Fire & Allied Perils', 'Machinery Breakdown (MB)', 'MLOP', 'FLOP', 'Mega Risk Policy', 'Workers Compensation', 'Product Liability', 'Product Recall', 'Marine Cargo', 'CAR/EAR', 'Cyber Insurance', 'D&O Liability', 'Environmental Liability'].map((item, i) => (
                  <span key={i} className="text-[11px] px-3 py-1.5 bg-white rounded-lg border border-blue-200 text-navy font-semibold shadow-sm">• {item}</span>
                ))}
              </div>
            </div>
            <div className="mt-5 bg-orange-50 rounded-xl p-4 border border-orange-200">
              <h5 className="text-xs font-bold text-orange-800 mb-3 flex items-center gap-1.5">⚙️ Industry-Specific Add-ons — Automobile OEMs</h5>
              <ul className="space-y-1.5">
                {['Press shop die maintenance and replacement', 'Robotic welding arms — servo motors, cables, TCP recalibration', 'Paint shop booth ventilation, electrostatic guns, oven burners', 'Conveyor and hanger system — chains, drives, encoders', 'EV battery module assembly — high-voltage testing equipment', 'CNC machining centers for engine/transmission components', 'Vehicle testing track equipment (dynamometers, crash test rigs)', 'Overhead cranes and hoists in press shop (50T+)', 'Effluent treatment plant (paint sludge, coolant disposal)', 'Compressed air systems (screw compressors, dryers, receivers)', 'Stamping press clutch/brake overhaul and tonnage re-certification', 'Plastic injection moulding machines (bumpers, dashboards)', 'Catalytic converter and exhaust assembly (precious metals handling)', 'Vehicle dispatch yard — hail, flood, transit damage to finished goods', 'Supplier quality containment — warranty recall cost provisioning'].map((item, i) => (
                    <li key={i} className="text-[11px] text-orange-900 flex items-start gap-2"><span className="text-orange-600 mt-0.5 font-bold">▸</span>{item}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Framework */}
      {riskSubTab === 'framework' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
            <h4 className="text-sm font-bold text-navy mb-4">Expected Monetary Value (EMV) Analysis</h4>
            <table className="w-full text-xs">
              <thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Risk</th><th className="text-right py-2 px-2 font-bold text-navy">Prob %</th><th className="text-right py-2 px-2 font-bold text-navy">Impact (₹Cr)</th><th className="text-right py-2 px-2 font-bold text-navy">EMV (₹Cr)</th><th className="text-center py-2 px-2 font-bold text-navy">Owner</th><th className="text-center py-2 px-2 font-bold text-navy">Strategy</th></tr></thead>
              <tbody>{emvTableData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-cream/50">
                  <td className="py-2 px-2 font-semibold text-gray-800">{row.risk}</td>
                  <td className="py-2 px-2 text-right">{row.prob}%</td>
                  <td className="py-2 px-2 text-right font-semibold">₹{row.impact} Cr</td>
                  <td className="py-2 px-2 text-right font-bold text-maroon">₹{row.emv} Cr</td>
                  <td className="py-2 px-2 text-center text-gray-600">{row.owner}</td>
                  <td className="py-2 px-2 text-center"><span className="px-2 py-0.5 rounded-full bg-navy/10 text-navy font-semibold">{row.strategy}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* Emerging Tech */}
      {riskSubTab === 'emerging' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {emergingTechRisks.map((tech, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">{tech.segment}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${tech.stage === 'Pilot' ? 'bg-amber-100 text-amber-700' : tech.stage === 'Demo' ? 'bg-blue-100 text-blue-700' : tech.stage === 'Scaling' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{tech.stage}</span>
                </div>
                <h5 className="font-bold text-navy text-sm mb-2">{tech.tech}</h5>
                <div className="space-y-2">
                  <div><span className="text-[10px] font-bold text-red-600">Risks:</span><p className="text-[10px] text-gray-600">{tech.risks}</p></div>
                  <div><span className="text-[10px] font-bold text-blue-600">Insurance:</span><p className="text-[10px] text-gray-600">{tech.insurance}</p></div>
                  <div className="bg-amber-50 rounded-lg p-2 border border-amber-100"><span className="text-[10px] font-bold text-amber-700">Challenge:</span><p className="text-[10px] text-amber-800">{tech.challenge}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices */}
      {riskSubTab === 'bestpractices' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
            <h4 className="text-sm font-bold text-navy mb-4 flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Risk Mitigation Best Practices</h4>
            <table className="w-full text-xs">
              <thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Practice</th><th className="text-center py-2 px-2 font-bold text-navy">Frequency</th><th className="text-center py-2 px-2 font-bold text-navy">Segment</th><th className="text-left py-2 px-2 font-bold text-navy">Details</th></tr></thead>
              <tbody>{bestPractices.map((bp, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-cream/50">
                  <td className="py-2 px-2 font-semibold text-gray-800">{bp.practice}</td>
                  <td className="py-2 px-2 text-center"><span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">{bp.frequency}</span></td>
                  <td className="py-2 px-2 text-center"><span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{bp.segment}</span></td>
                  <td className="py-2 px-2 text-gray-600">{bp.detail}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-4 flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> Case Studies — Major Auto Losses (India)</h4>
            <div className="space-y-3">
              {caseStudies.map((cs, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-navy text-sm">{cs.title}</h5>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">{cs.claimType}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[10px]">
                    <div><span className="font-bold text-gray-500">Plant:</span> <span className="text-gray-700">{cs.plant}</span></div>
                    <div><span className="font-bold text-gray-500">Loss:</span> <span className="text-maroon font-bold">{cs.loss}</span></div>
                    <div><span className="font-bold text-gray-500">Cause:</span> <span className="text-gray-700">{cs.cause}</span></div>
                  </div>
                  <div className="mt-2 bg-green-50 rounded-lg p-2 border border-green-100">
                    <span className="text-[10px] font-bold text-green-700">Learning:</span>
                    <span className="text-[10px] text-green-800 ml-1">{cs.lesson}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ===== GEOGRAPHY TAB =====
function GeographyTab() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const selectedInfo = geographyData.find(s => s.state === selectedState)

  return (
    <div className="space-y-6">
      {selectedState && selectedInfo && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">Why {selectedState} is an Auto Hub</h3>
              <button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-4 bg-navy/5 rounded-xl mb-4">
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div><div className="text-lg font-bold text-maroon">{selectedInfo.capacity}M</div><div className="text-[10px] text-gray-500">Capacity (Units)</div></div>
                <div><div className="text-lg font-bold text-navy">{selectedInfo.share}%</div><div className="text-[10px] text-gray-500">India Share</div></div>
                <div><div className="text-lg font-bold text-orange-600">#{geographyData.indexOf(selectedInfo) + 1}</div><div className="text-[10px] text-gray-500">Rank</div></div>
              </div>
              <p className="text-xs text-gray-600"><strong>Major Players:</strong> {selectedInfo.majorPlayers}</p>
            </div>
            <div><h4 className="text-sm font-bold text-navy mb-2">Key Reasons</h4><p className="text-sm text-gray-700 leading-relaxed">{selectedInfo.reason}</p></div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">State-wise Auto Manufacturing Capacity (M units/yr)</h3>
        <p className="text-xs text-gray-500 mb-4">👆 Click any bar to see why that state is an automobile hub</p>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={geographyData} layout="vertical" onClick={(data: any) => { if (data?.activePayload) setSelectedState(data.activePayload[0]?.payload?.state) }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={10} unit="M" />
            <YAxis dataKey="state" type="category" fontSize={10} width={100} />
            <Tooltip formatter={(v: number) => `${v}M units`} />
            <Bar dataKey="capacity" radius={[0, 4, 4, 0]} cursor="pointer">
              {geographyData.map((_, i) => <Cell key={i} fill={i < 3 ? '#f37021' : i < 5 ? '#1e3a5f' : '#94a3b8'} />)}
              <LabelList dataKey="capacity" position="right" fontSize={9} formatter={(v: number) => `${v}M`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-navy mb-2">Auto Manufacturing Belt — India</h3>
        <p className="text-xs text-gray-500 mb-4">👆 Click any state for detailed insight</p>
        <table className="w-full text-xs">
          <thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">State</th><th className="text-right py-2 px-2 font-bold text-navy">Capacity (M)</th><th className="text-right py-2 px-2 font-bold text-navy">Share (%)</th><th className="text-left py-2 px-2 font-bold text-navy">Major Players</th><th className="text-center py-2 px-2 font-bold text-navy">Insight</th></tr></thead>
          <tbody>{geographyData.map((s, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-orange-50/30 cursor-pointer transition" onClick={() => setSelectedState(s.state)}>
              <td className="py-2.5 px-2 font-semibold text-maroon underline decoration-dotted">{s.state}</td>
              <td className="py-2.5 px-2 text-right font-bold text-navy">{s.capacity}M</td>
              <td className="py-2.5 px-2 text-right font-bold text-orange-600">{s.share}%</td>
              <td className="py-2.5 px-2 text-gray-600">{s.majorPlayers}</td>
              <td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-white bg-maroon px-2.5 py-1 rounded-lg shadow-sm">Why?</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-bold text-navy mb-3">India's Auto Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200"><h4 className="text-xs font-bold text-orange-800 mb-1">Southern Belt (42% capacity)</h4><p className="text-[10px] text-orange-700">Tamil Nadu (Chennai) + Karnataka (Bangalore). Hyundai, Renault-Nissan, Toyota, TVS, BMW, Daimler. Export-oriented with port access.</p></div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><h4 className="text-xs font-bold text-blue-800 mb-1">Western Belt (32% capacity)</h4><p className="text-[10px] text-blue-700">Maharashtra (Pune-Nashik) + Gujarat (Sanand-Halol). Tata, M&M, Bajaj, VW-Skoda, MG Motor, Suzuki Gujarat plant.</p></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><h4 className="text-xs font-bold text-green-800 mb-1">Northern Belt (25% capacity)</h4><p className="text-[10px] text-green-700">Haryana (Gurugram-Manesar) + Rajasthan (Neemrana). Maruti's entire 2M+ capacity. Hero MotoCorp. NCR consumer proximity.</p></div>
        </div>
      </div>
    </div>
  )
}

// ===== NEWS TAB =====
function NewsTab() {
  const news = [
    { title: 'Maruti Suzuki Kharkhoda Plant Phase 1 Commissioned', source: 'Economic Times', date: 'Jun 2025', summary: 'First 250K unit capacity from mega Kharkhoda factory operational. Total investment ₹18,000 Cr for 1M units by FY28.', sentiment: 'Positive' },
    { title: 'Tata Motors EV Sales Cross 1 Lakh Units in Single Quarter', source: 'Business Standard', date: 'May 2025', summary: 'Nexon EV, Punch EV, Curvv EV drive volumes. Market share maintained at 63% in EV segment.', sentiment: 'Positive' },
    { title: 'Hyundai India IPO — Stock Surges 15% Post Listing', source: 'Moneycontrol', date: 'Oct 2024', summary: 'India\'s largest IPO of 2024 at ₹27,000 Cr. Strong institutional demand signals confidence in India auto growth.', sentiment: 'Positive' },
    { title: 'FAME III Subsidy Reduced by 25% — EV Prices to Rise', source: 'LiveMint', date: 'Apr 2025', summary: 'Government reducing EV subsidies to encourage cost reduction by OEMs. Industry pushes back citing premature withdrawal.', sentiment: 'Negative' },
    { title: 'BYD India Plans ₹3,000 Cr Hyderabad Plant — Geopolitical Concerns', source: 'Reuters India', date: 'Mar 2025', summary: 'Chinese EV giant BYD plans local manufacturing. Security clearance pending from Home Ministry amid India-China tensions.', sentiment: 'Neutral' },
    { title: 'Mahindra Born Electric Platform — 5 EVs by FY27', source: 'Autocar India', date: 'Feb 2025', summary: 'XUV.e8, XUV.e9, BE.05, BE.07, BE.09 confirmed. ₹12,000 Cr investment in Chakan EV line. VW MEB-derived platform.', sentiment: 'Positive' },
    { title: 'India Auto Exports Decline 8% — Africa Slowdown', source: 'SIAM Report', date: 'Jan 2025', summary: 'Africa markets (30% of exports) facing forex issues. Bajaj, TVS, Hero most impacted. ASEAN growing as alternative.', sentiment: 'Negative' },
    { title: 'Toyota Innova HyCross Waiting Period Crosses 12 Months', source: 'Team-BHP', date: 'Jun 2025', summary: 'Strong hybrid demand exceeds supply. Single Bidadi plant constraint. Hybrid = no FAME subsidy but 43% GST vs 48%.', sentiment: 'Neutral' },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-sm font-bold text-navy">Latest Auto Industry News & Developments</h3>
        <p className="text-xs text-gray-500">Curated from SIAM, industry publications, and company filings</p>
      </div>
      {news.map((n, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-navy flex-1">{n.title}</h4>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ml-2 ${n.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : n.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{n.sentiment}</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">{n.summary}</p>
          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span className="font-semibold">{n.source}</span>
            <span>•</span>
            <span>{n.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
