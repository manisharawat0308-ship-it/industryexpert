import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, ComposedChart, LabelList,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import AnimatedCounter from '../components/AnimatedCounter'
import LiveTicker from '../components/LiveTicker'
import HealthGauge from '../components/HealthGauge'

const COLORS = ['#B02A30', '#005B75', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722']

type CementTab = 'overview' | 'production' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot'

// ===== CEMENT DATA (embedded) =====
const overviewData = {
  totalCapacity: 600,
  totalProduction: 410,
  utilizationRate: 68,
  globalRanking: 2,
  perCapitaConsumption: 250,
  globalPerCapita: 550,
  chinaPerCapita: 1600,
  segmentSplit: [
    { segment: 'OPC', share: 45, production: 184.5 },
    { segment: 'PPC', share: 35, production: 143.5 },
    { segment: 'Ready-Mix', share: 10, production: 41 },
    { segment: 'White Cement', share: 5, production: 20.5 },
    { segment: 'Others', share: 5, production: 20.5 },
  ],
  processSplit: [
    { process: 'Dry Process', share: 93, capacity: 558 },
    { process: 'Semi-Dry', share: 5, capacity: 30 },
    { process: 'Wet Process', share: 2, capacity: 12 },
  ],
  yearlyGrowth: [
    { year: '2018-19', production: 337, capacity: 502 },
    { year: '2019-20', production: 329, capacity: 510 },
    { year: '2020-21', production: 296, capacity: 515 },
    { year: '2021-22', production: 356, capacity: 530 },
    { year: '2022-23', production: 391, capacity: 570 },
    { year: '2023-24', production: 400, capacity: 585 },
    { year: '2024-25', production: 410, capacity: 600 },
  ],
}

const productionData = {
  globalComparison: [
    { country: 'China', production: 2300, color: '#dc2626' },
    { country: 'India', production: 410, color: '#B02A30' },
    { country: 'Vietnam', production: 100, color: '#005B75' },
    { country: 'USA', production: 92, color: '#0369a1' },
    { country: 'Turkey', production: 75, color: '#64748b' },
    { country: 'Indonesia', production: 72, color: '#7c3aed' },
    { country: 'Saudi Arabia', production: 65, color: '#059669' },
    { country: 'Brazil', production: 58, color: '#ca8a04' },
    { country: 'Iran', production: 55, color: '#0891b2' },
    { country: 'Japan', production: 50, color: '#be185d' },
  ],
  supplyDemand: [
    { year: 'FY20', production: 329, consumption: 320, exports: 6.2, imports: 1.8 },
    { year: 'FY21', production: 296, consumption: 288, exports: 5.8, imports: 1.5 },
    { year: 'FY22', production: 356, consumption: 345, exports: 7.5, imports: 2.0 },
    { year: 'FY23', production: 391, consumption: 378, exports: 8.2, imports: 2.1 },
    { year: 'FY24', production: 400, consumption: 388, exports: 8.8, imports: 2.5 },
    { year: 'FY25', production: 410, consumption: 398, exports: 9.0, imports: 2.8 },
  ],
  costCurve: [
    { country: 'India', cost: 45, type: 'Dry Process' },
    { country: 'China', cost: 50, type: 'Mixed' },
    { country: 'Vietnam', cost: 52, type: 'Dry' },
    { country: 'Turkey', cost: 58, type: 'Dry' },
    { country: 'Saudi Arabia', cost: 62, type: 'Dry' },
    { country: 'Brazil', cost: 68, type: 'Mixed' },
    { country: 'Japan', cost: 75, type: 'Dry' },
    { country: 'Europe Avg', cost: 80, type: 'Mixed' },
    { country: 'USA', cost: 90, type: 'Mixed' },
  ],
  capacityPipeline: [
    { company: 'Adani (Ambuja+ACC)', capacity: 25, year: '2027', status: 'Under construction' },
    { company: 'JSW Cement', capacity: 25, year: '2028', status: 'Planned' },
    { company: 'UltraTech Cement', capacity: 20, year: '2026', status: 'Under construction' },
    { company: 'Dalmia Bharat', capacity: 15, year: '2027', status: 'EC received' },
    { company: 'Shree Cement', capacity: 10, year: '2026', status: 'Under construction' },
    { company: 'Nuvoco Vistas', capacity: 8, year: '2027', status: 'Planned' },
  ],
}


const playersData = [
  { rank: 1, name: 'UltraTech Cement', capacity: 130, revenue: 72582, type: 'Private', products: 'OPC, PPC, RMC, White' },
  { rank: 2, name: 'Ambuja Cements (Adani)', capacity: 89, revenue: 35200, type: 'Private', products: 'OPC, PPC, Composite' },
  { rank: 3, name: 'Shree Cement', capacity: 56, revenue: 20150, type: 'Private', products: 'OPC, PPC, RMC' },
  { rank: 4, name: 'Dalmia Bharat', capacity: 46, revenue: 14800, type: 'Private', products: 'OPC, PPC, Slag Cement' },
  { rank: 5, name: 'JSW Cement', capacity: 20, revenue: 8500, type: 'Private', products: 'PSC, OPC, Ground Slag' },
  { rank: 6, name: 'JK Cement', capacity: 24, revenue: 11200, type: 'Private', products: 'OPC, PPC, White Cement' },
  { rank: 7, name: 'Ramco Cements', capacity: 24.5, revenue: 9800, type: 'Private', products: 'OPC, PPC, RMC, Dry-Mix' },
  { rank: 8, name: 'Nuvoco Vistas', capacity: 25, revenue: 10500, type: 'Private', products: 'OPC, PPC, RMC' },
]

const geographyData = [
  { state: 'Rajasthan', capacity: 108, share: 18, majorPlayers: 'Shree Cement, UltraTech, JK Cement, Birla Corp', reason: "India's #1 cement state. 25% of India's limestone reserves concentrated in Chittorgarh-Udaipur-Jodhpur belt. Shree Cement HQ here — lowest cost producer globally. Low power cost (Rs 4-5/kWh with WHRS + renewable). Strategic location for North + West India distribution. Arid climate ideal for mining operations year-round. Largest cluster of grinding units serving Delhi-NCR construction boom." },
  { state: 'Andhra Pradesh', capacity: 90, share: 15, majorPlayers: 'UltraTech, Dalmia Bharat, India Cements, Zuari', reason: "Kurnool-Kadapa limestone belt is one of India's richest (5 billion tonnes estimated). Dalmia Bharat's largest cluster here (Kadapa, Ariyalur). UltraTech Tadipatri and Andhra Cements plants. Port access via Krishnapatnam for exports to Sri Lanka/Bangladesh. Low labor cost and year-round mining. Government incentives for new capacity under AP Industrial Policy 2023." },
  { state: 'Tamil Nadu', capacity: 72, share: 12, majorPlayers: 'India Cements, Ramco, Dalmia Bharat, UltraTech', reason: "India Cements HQ (Coromandel brand — iconic in South). Ariyalur-Perambalur limestone belt feeds 15+ plants. Port access (Chennai, Tuticorin) for clinker/cement exports to Sri Lanka, Maldives. Highest cement demand in South India due to construction boom. Ramco's RMC and dry-mix leadership originated here. Strong brand loyalty — South consumers are brand-conscious." },
  { state: 'Karnataka', capacity: 60, share: 10, majorPlayers: 'UltraTech (Aditya Cement), ACC Wadi, Zuari, JSW', reason: "UltraTech's Aditya Cement Works (Gulbarga) is one of India's largest single-location plants. ACC Wadi plant — one of oldest in India (1936). Proximity to Bangalore — India's fastest growing metro construction market. Gulbarga-Bidar limestone belt. JSW Cement's integrated slag cement from Vijayanagar steel plant. Government infra push (Bangalore metro, highways)." },
  { state: 'Madhya Pradesh', capacity: 54, share: 9, majorPlayers: 'UltraTech, Prism Johnson, JK Lakshmi, Heidelberg', reason: "Central India location gives pan-India distribution advantage — equidistant from all major markets. Rich limestone in Satna-Rewa belt. Multiple UltraTech plants (Maihar, Khor). JK Lakshmi's largest plant at Sagar. Low land and labor cost. Well-connected by rail (critical for cement freight). Heidelberg's only India plant at Damoh." },
  { state: 'Gujarat', capacity: 48, share: 8, majorPlayers: 'Ambuja Cements, UltraTech, Sanghi Industries, Saurashtra Cement', reason: "Ambuja Cements' original home (Ambujanagar, Kodinar). Saurashtra coast limestone + port access for clinker movement. Gujarat's massive infra spend (Ahmedabad metro, GIFT City, expressways). Sanghi Industries — world's largest single-kiln plant at Kutch. Strategic exports via Mundra/Kandla port to Middle East. Pro-industry government with fast clearances." },
  { state: 'Chhattisgarh', capacity: 42, share: 7, majorPlayers: 'UltraTech, Ambuja (Bhatapara), Nuvoco, Lafarge', reason: "Ambuja's flagship Bhatapara plant (largest single-location in India at 5.7 MTPA clinker). Rich limestone in Raipur-Bilaspur belt. Central location serves East + Central India demand. Low-cost thermal coal from local mines. Rail connectivity for pan-India dispatch. Lafarge (now Ambuja) invested heavily here. Growing housing demand from urbanization." },
  { state: 'Maharashtra', capacity: 36, share: 6, majorPlayers: 'UltraTech, ACC, Ambuja, Shree Cement', reason: "India's largest cement consumption market (Mumbai-Pune construction + infra). UltraTech's multiple grinding units near consumption centers. ACC Kymore legacy plant. Proximity to market reduces logistics cost despite limited limestone. Multiple grinding units convert clinker to cement near demand. Maharashtra accounts for 12%+ of India's cement consumption." },
  { state: 'Telangana', capacity: 30, share: 5, majorPlayers: 'UltraTech, Penna Cement, Deccan Cements, Zuari', reason: "Hyderabad's construction boom (pharma city, IT corridor, outer ring road). Nalgonda-Suryapet limestone availability. Penna Cement's core market. Government's massive infra push (Regional Ring Road, metro expansion). Growing demand from real estate and warehousing. Strategic location between AP and Karnataka markets." },
  { state: 'Others', capacity: 60, share: 10, majorPlayers: 'Various regional players', reason: "Includes Odisha (limestone + port access), Meghalaya (NE demand), Himachal Pradesh (small plants for hill states), Bihar/UP (grinding units near mega demand), West Bengal (eastern market). Fragmented but growing 8-10% annually driven by housing and infra." },
]

const newsData = [
  { id: 1, title: 'UltraTech crosses 150 MTPA capacity with Kesoram acquisition', date: '2025-06-15', region: 'National', category: 'Business Wins' },
  { id: 2, title: 'Adani Group completes Ambuja-ACC integration, targets 140 MTPA by 2028', date: '2025-04-29', region: 'West', category: 'Business Wins' },
  { id: 3, title: 'Coal mill explosion at Shree Cement Beawar plant injures 4 workers', date: '2025-03-18', region: 'North', category: 'Accidents' },
  { id: 4, title: 'Govt mandates 10% blended cement in all central government projects', date: '2025-01-05', region: 'National', category: 'Policy' },
  { id: 5, title: 'Dalmia Bharat commissions 3.3 MTPA greenfield clinker unit in Odisha', date: '2025-02-22', region: 'East', category: 'Business Wins' },
  { id: 6, title: 'JSW Cement acquires Bandra Cement for Rs 450 Cr, adds 2 MTPA', date: '2025-05-12', region: 'South', category: 'Business Wins' },
  { id: 7, title: 'BIS tightens quality norms for OPC 53 grade — 3 brands fail tests', date: '2025-04-08', region: 'National', category: 'Policy' },
  { id: 8, title: 'Kiln refractory collapse at ACC Wadi plant, 45-day shutdown expected', date: '2025-03-25', region: 'South', category: 'Accidents' },
]

export default function CementDashboard() {
  const [activeTab, setActiveTab] = useState<CementTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tabs: { id: CementTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'production', label: 'Production', icon: Factory },
    { id: 'players', label: 'Players', icon: TrendingUp },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
  ]

  const tickerItems = [
    { label: 'Cement Price (OPC)', value: '₹380/bag', change: '+2.1%', direction: 'up' as const },
    { label: 'Grey Cement', value: '₹6,200/T', change: '+1.5%', direction: 'up' as const },
    { label: 'UltraTech', value: '₹11,250', change: '+0.8%', direction: 'up' as const },
    { label: 'Ambuja', value: '₹625', change: '-0.3%', direction: 'down' as const },
    { label: 'Shree Cement', value: '₹26,800', change: '+1.2%', direction: 'up' as const },
    { label: 'Pet Coke', value: '$95/T', change: '+3.2%', direction: 'up' as const },
    { label: 'Coal (Thermal)', value: '$120/T', change: '-1.8%', direction: 'down' as const },
    { label: 'Nifty Infra', value: '8,450', change: '+0.5%', direction: 'up' as const },
    { label: 'Dalmia Bharat', value: '₹1,920', change: '+1.4%', direction: 'up' as const },
    { label: 'PPC Price', value: '₹350/bag', change: '+1.0%', direction: 'up' as const },
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
                <h1 className="text-lg font-bold text-navy">Cement Industry Dashboard</h1>
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
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab isAdmin={isAdmin} />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="cement" />}
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30"><div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between"><p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p><p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p><p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p></div></footer>
    </div>
  )
}

function OverviewTab() {
  const d = overviewData
  const [segmentPopup, setSegmentPopup] = useState<string | null>(null)
  const [processPopup, setProcessPopup] = useState<string | null>(null)

  const segmentDetails: Record<string, { description: string; subTypes: { name: string; share: string; use: string }[] }> = {
    'OPC': { description: 'Ordinary Portland Cement — the most widely used cement type. Made by grinding clinker with 3-5% gypsum. Available in 33, 43, and 53 grades based on compressive strength.', subTypes: [
      { name: 'OPC 53 Grade', share: '50%', use: 'High-rise buildings, bridges, pre-stressed concrete, RMC plants' },
      { name: 'OPC 43 Grade', share: '35%', use: 'General construction, plastering, masonry, residential buildings' },
      { name: 'OPC 33 Grade', share: '15%', use: 'Low-strength applications, non-structural work, road sub-base' },
    ]},
    'PPC': { description: 'Portland Pozzolana Cement — OPC blended with 15-35% fly ash. Slower setting but better long-term durability and sulfate resistance. Government promotes PPC for sustainability.', subTypes: [
      { name: 'PPC (Fly Ash based)', share: '80%', use: 'Mass concreting, dams, marine structures, foundations' },
      { name: 'PPC (Calcined Clay)', share: '12%', use: 'Tropical construction, sulfate-rich soil areas' },
      { name: 'PPC (Silica Fume)', share: '8%', use: 'High-performance concrete, nuclear structures' },
    ]},
    'Ready-Mix': { description: 'Factory-batched concrete delivered in transit mixers. Growing at 15%+ CAGR in India. Ensures quality consistency impossible with site-mixing.', subTypes: [
      { name: 'Standard RMC (M20-M40)', share: '60%', use: 'Residential buildings, commercial complexes' },
      { name: 'High-Strength (M50-M80)', share: '25%', use: 'High-rise towers, bridges, metro viaducts' },
      { name: 'Self-Compacting Concrete', share: '10%', use: 'Complex formwork, congested reinforcement areas' },
      { name: 'Specialty (Fiber/Lightweight)', share: '5%', use: 'Industrial floors, precast elements, insulation' },
    ]},
    'White Cement': { description: 'Manufactured using low-iron raw materials (china clay + limestone) and oil/gas as fuel to avoid iron contamination. Used for aesthetic applications.', subTypes: [
      { name: 'White Cement (Birla White, JK White)', share: '55%', use: 'Wall putty, textured finishes, decorative concrete' },
      { name: 'White Portland Cement', share: '30%', use: 'Precast architectural panels, terrazzo flooring' },
      { name: 'Colored Cement', share: '15%', use: 'Designer concrete, paving blocks, landscaping' },
    ]},
    'Others': { description: 'Specialty cement types for specific applications — including slag cement (PSC), rapid hardening, oil well cement, and low-heat cement.', subTypes: [
      { name: 'Portland Slag Cement (PSC)', share: '40%', use: 'Marine construction, sewage works, mass concreting' },
      { name: 'Rapid Hardening Cement', share: '25%', use: 'Road repairs, precast products, cold weather concreting' },
      { name: 'Oil Well Cement (API)', share: '20%', use: 'Oil/gas well casing cementation at high pressure/temperature' },
      { name: 'Low-Heat Cement', share: '15%', use: 'Dams, massive retaining walls, raft foundations' },
    ]},
  }

  const processDetails: Record<string, { description: string; process: string; players: string; pros: string; cons: string }> = {
    'Dry Process': { description: 'Modern energy-efficient process where raw materials are ground and blended in dry state. 93% of India\'s cement capacity uses this route.', process: 'Limestone quarrying → Crushing → Raw mill (dry grinding) → Blending silo → Preheater/Precalciner (850°C) → Rotary Kiln (1450°C) → Clinker cooler → Cement mill (with gypsum) → Packing', players: 'UltraTech, Shree Cement, Ambuja, Dalmia Bharat, JSW Cement — all modern plants', pros: 'Low energy consumption (700-750 kcal/kg clinker), high output (5,000-12,000 TPD kilns), lower CO2 per tonne, automated quality control', cons: 'High initial capex (Rs 5,000+ Cr for 3 MTPA), requires consistent raw material quality, sensitive to moisture in raw mix' },
    'Semi-Dry': { description: 'Intermediate process where dry raw meal is nodulized with 10-12% water before feeding to a Lepol grate preheater and kiln. Legacy technology in few plants.', process: 'Raw meal preparation (dry) → Nodulizer (adds 10-12% water) → Lepol travelling grate (drying + preheating) → Rotary Kiln (1450°C) → Clinker cooler → Cement grinding', players: 'Some older ACC plants, a few small manufacturers in Central India', pros: 'Better dust control than wet process, moderate capex for conversion, handles slightly variable raw mix', cons: 'Higher energy than dry process (850 kcal/kg), limited kiln sizes (max 3,000 TPD), being phased out industry-wide' },
    'Wet Process': { description: 'Oldest cement manufacturing method where raw materials are ground with water to form slurry (35-40% water). Nearly obsolete in India.', process: 'Limestone + clay → Wash mill (with water) → Slurry preparation (35-40% moisture) → Slurry tanks (blending) → Long rotary kiln (150-200m, 1450°C) → Clinker cooler → Cement mill', players: 'Very few remaining — some old ACC and India Cements plants being converted or shut', pros: 'Better homogenization of raw mix, handles high-moisture raw materials, lower dust emissions', cons: 'Very high energy consumption (1200-1500 kcal/kg — 2x dry process), huge kilns needed, high CO2, uneconomical at modern scale' },
  }

  return (
    <div className="space-y-6">
      {/* Segment Popup */}
      {segmentPopup && segmentDetails[segmentPopup] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSegmentPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{segmentPopup}</h3>
              <button onClick={() => setSegmentPopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{segmentDetails[segmentPopup].description}</p>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2">Sub-Types & Contribution</h4>
            <div className="space-y-2">
              {segmentDetails[segmentPopup].subTypes.map((sub, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-sm font-bold text-maroon w-12 text-right">{sub.share}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-navy">{sub.name}</div>
                    <div className="text-[10px] text-gray-500">{sub.use}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Process Popup */}
      {processPopup && processDetails[processPopup] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setProcessPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{processPopup}</h3>
              <button onClick={() => setProcessPopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <p className="text-sm text-gray-700 mb-3">{processDetails[processPopup].description}</p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <h5 className="text-[10px] font-bold text-blue-700 uppercase mb-1">Process Flow</h5>
                <p className="text-xs text-blue-800">{processDetails[processPopup].process}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <h5 className="text-[10px] font-bold text-navy uppercase mb-1">Key Players</h5>
                <p className="text-xs text-gray-700">{processDetails[processPopup].players}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                  <h5 className="text-[10px] font-bold text-green-700 uppercase mb-1">✓ Advantages</h5>
                  <p className="text-[10px] text-green-800">{processDetails[processPopup].pros}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <h5 className="text-[10px] font-bold text-red-700 uppercase mb-1">✗ Limitations</h5>
                  <p className="text-[10px] text-red-800">{processDetails[processPopup].cons}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards with AnimatedCounter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2"><Factory className="text-maroon" size={20} /><span className="text-sm text-gray-500">Installed Capacity</span></div>
          <p className="text-2xl font-bold text-navy"><AnimatedCounter end={600} suffix=" MTPA" /></p>
          <p className="text-xs text-green-600 mt-1">FY 2024-25 (Source: CMA)</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="text-navy" size={20} /><span className="text-sm text-gray-500">Cement Production</span></div>
          <p className="text-2xl font-bold text-navy"><AnimatedCounter end={410} suffix=" MT" /></p>
          <p className="text-xs text-green-600 mt-1">+2.5% YoY</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2"><Gauge className="text-orange" size={20} /><span className="text-sm text-gray-500">Utilization Rate</span></div>
          <p className="text-2xl font-bold text-navy"><AnimatedCounter end={68} suffix="%" /></p>
          <p className="text-xs text-green-600 mt-1">Target: 80%</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2"><Globe className="text-green-600" size={20} /><span className="text-sm text-gray-500">Global Ranking</span></div>
          <p className="text-2xl font-bold text-navy">#<AnimatedCounter end={2} /></p>
          <p className="text-xs text-green-600 mt-1">After China (2,300 MT)</p>
        </div>
      </div>

      {/* Health Gauge + Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <HealthGauge score={68} label="Cement Industry Health Score" size="md" />
          <div className="grid grid-cols-3 gap-2 mt-4 w-full text-center">
            <div className="p-1.5 bg-green-50 rounded-lg"><div className="text-[9px] font-bold text-green-700">Demand</div><div className="text-xs font-black text-green-600">Growing</div></div>
            <div className="p-1.5 bg-amber-50 rounded-lg"><div className="text-[9px] font-bold text-amber-700">Margins</div><div className="text-xs font-black text-amber-600">Moderate</div></div>
            <div className="p-1.5 bg-green-50 rounded-lg"><div className="text-[9px] font-bold text-green-700">Capacity</div><div className="text-xs font-black text-green-600">Expanding</div></div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Production & Capacity Growth (MTPA)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={d.yearlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" fontSize={9} />
              <YAxis fontSize={11} domain={[250, 650]} />
              <Tooltip formatter={(v: number) => `${v} MT`} />
              <Legend />
              <Area type="monotone" dataKey="capacity" stroke="#005B75" fill="#005B75" fillOpacity={0.15} name="Capacity (MTPA)" strokeWidth={2}>
                <LabelList dataKey="capacity" position="top" fontSize={9} fill="#005B75" formatter={(v: number) => `${v}`} />
              </Area>
              <Area type="monotone" dataKey="production" stroke="#B02A30" fill="#B02A30" fillOpacity={0.25} name="Production (MT)" strokeWidth={2}>
                <LabelList dataKey="production" position="bottom" fontSize={9} fill="#B02A30" formatter={(v: number) => `${v}`} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">Source: CMA, DIPP</p>
        </div>
      </div>

      {/* Segment Split (clickable pie) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Cement Segment Split</h3>
        <p className="text-xs text-gray-500 mb-3">👆 Click any segment for detailed sub-types and applications</p>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={d.segmentSplit} cx="50%" cy="50%" outerRadius={90} dataKey="share" nameKey="segment"
              label={({ segment, share }: any) => `${segment}: ${share}%`} labelLine
              onClick={(data: any) => setSegmentPopup(data.segment)}>
              {d.segmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} className="cursor-pointer hover:opacity-80 transition" />)}
            </Pie>
            <Tooltip formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Per Capita Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Per Capita Cement Consumption (2024-25)</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-maroon/5 rounded-xl">
            <div className="text-3xl font-bold text-maroon">{d.perCapitaConsumption} kg</div>
            <div className="text-sm text-gray-600 font-medium mt-1">India</div>
            <div className="text-xs text-gray-400">Source: CMA</div>
          </div>
          <div className="text-center p-4 bg-navy/5 rounded-xl">
            <div className="text-3xl font-bold text-navy">{d.globalPerCapita} kg</div>
            <div className="text-sm text-gray-600 font-medium mt-1">World Average</div>
            <div className="text-xs text-gray-400">Source: GCCA</div>
          </div>
          <div className="text-center p-4 bg-orange/10 rounded-xl">
            <div className="text-3xl font-bold text-orange">{d.chinaPerCapita} kg</div>
            <div className="text-sm text-gray-600 font-medium mt-1">China</div>
            <div className="text-xs text-gray-400">Source: GCCA</div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
          <p className="text-sm text-green-800">
            <strong>Growth Headroom:</strong> India's per capita at 250 kg is just 45% of world average (550 kg) and 16% of China (1600 kg).
            With urbanization at only 35% and housing-for-all push, India's per capita is expected to reach 400 kg by 2030.
          </p>
        </div>
      </div>

      {/* Production Process Split (clickable) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Production Process Split</h3>
        <p className="text-xs text-gray-500 mb-4">👆 Click any process to understand the technology, players, and trade-offs</p>
        <div className="grid grid-cols-3 gap-4">
          {d.processSplit.map((r, i) => (
            <button key={i} onClick={() => setProcessPopup(r.process)} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-maroon/5 hover:border-maroon/20 border border-gray-100 transition-all cursor-pointer active:scale-[0.97]">
              <div className="text-2xl font-bold text-navy">{r.share}%</div>
              <div className="text-sm text-gray-600 font-medium">{r.process}</div>
              <div className="text-xs text-gray-400">{r.capacity} MTPA</div>
              <div className="text-[9px] text-maroon font-bold mt-1">Click for details →</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">Source: CMA, Industry Reports</p>
      </div>

      {/* Combined History + Future Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-navy">India Cement Production — History & Future (MT)</h3>
            <p className="text-xs text-gray-500 mt-0.5">70-year journey: 50 MT (1990) → 410 MT (2025) → 750 MT target (2030)</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#1e3a5f]"><span className="w-3 h-0.5 bg-[#1e3a5f] inline-block rounded"></span> Actual</span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#f37021]"><span className="w-3 h-0.5 bg-[#f37021] inline-block rounded"></span> Projected</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={[
            { year: '1990', production: 50 }, { year: '1995', production: 70 },
            { year: '2000', production: 100 }, { year: '2005', production: 145 },
            { year: '2010', production: 220 }, { year: '2015', production: 280 },
            { year: '2020', production: 329 }, { year: '2025', production: 410, projected: 410 },
            { year: '2026', projected: 460 }, { year: '2027', projected: 520 },
            { year: '2028', projected: 590 }, { year: '2029', projected: 665 },
            { year: '2030', projected: 750 },
          ]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="cementHistGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="cementFutGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f37021" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f37021" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" fontSize={10} tick={{ fill: '#64748b' }} />
            <YAxis fontSize={10} domain={[0, 800]} tick={{ fill: '#64748b' }} unit=" MT" />
            <Tooltip formatter={(v: number) => `${v} MT`} />
            <Area type="monotone" dataKey="production" stroke="#1e3a5f" strokeWidth={2.5} fill="url(#cementHistGrad)" name="Actual (MT)" dot={{ fill: '#1e3a5f', r: 4, strokeWidth: 2, stroke: '#fff' }} connectNulls={false}>
              <LabelList dataKey="production" position="top" fontSize={9} fill="#1e3a5f" formatter={(v: number) => v ? `${v}` : ''} />
            </Area>
            <Area type="monotone" dataKey="projected" stroke="#f37021" strokeWidth={2.5} strokeDasharray="6 3" fill="url(#cementFutGrad)" name="Projected (MT)" dot={{ fill: '#f37021', r: 4, strokeWidth: 2, stroke: '#fff' }} connectNulls={false}>
              <LabelList dataKey="projected" position="top" fontSize={9} fill="#f37021" formatter={(v: number) => v ? `${v}` : ''} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
        {/* Vision 2030 Targets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100">
          <div className="text-center p-3 bg-[#1e3a5f]/5 rounded-xl">
            <div className="text-xl font-bold text-[#1e3a5f]">800+</div>
            <div className="text-[10px] text-gray-500 font-medium">MTPA Capacity (2030)</div>
          </div>
          <div className="text-center p-3 bg-orange/10 rounded-xl">
            <div className="text-xl font-bold text-orange">750</div>
            <div className="text-[10px] text-gray-500 font-medium">MT Production (2030)</div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-xl">
            <div className="text-xl font-bold text-amber-700">400 kg</div>
            <div className="text-[10px] text-gray-500 font-medium">Per Capita Target</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <div className="text-xl font-bold text-green-600">80%+</div>
            <div className="text-[10px] text-gray-500 font-medium">Utilization Target</div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Source: CMA Vision 2030, NITI Aayog, Industry Estimates</p>
      </div>
    </div>
  )
}

function ProductionTab() {
  const [tradePopup, setTradePopup] = useState<'exports' | 'imports' | null>(null)

  const exportDetails = {
    total: '9.0 MT (FY25)',
    value: '$620 Million',
    topDestinations: [
      { country: 'Bangladesh', share: '28%', volume: '2.5 MT', products: 'OPC, PPC, Clinker' },
      { country: 'Nepal', share: '22%', volume: '2.0 MT', products: 'OPC 43, PPC, Clinker' },
      { country: 'Sri Lanka', share: '15%', volume: '1.35 MT', products: 'OPC 53, Clinker' },
      { country: 'UAE', share: '12%', volume: '1.08 MT', products: 'OPC 53, White Cement' },
      { country: 'Maldives', share: '8%', volume: '0.72 MT', products: 'OPC, Bagged Cement' },
      { country: 'East Africa', share: '7%', volume: '0.63 MT', products: 'Clinker, OPC' },
      { country: 'Others', share: '8%', volume: '0.72 MT', products: 'Mixed products' },
    ],
    trend: 'India is a net exporter of cement and clinker. Exports grew from 5.8 MT (FY21) to 9.0 MT (FY25) driven by construction booms in Bangladesh and Nepal. Coastal plants in Gujarat and Tamil Nadu lead exports.',
  }

  const importDetails = {
    total: '2.8 MT (FY25)',
    value: '$180 Million',
    topSources: [
      { country: 'Pakistan', share: '35%', volume: '0.98 MT', products: 'OPC (low-cost border trade via Punjab/Rajasthan)' },
      { country: 'UAE', share: '25%', volume: '0.70 MT', products: 'White Cement, Specialty Cement' },
      { country: 'Bangladesh', share: '15%', volume: '0.42 MT', products: 'Clinker (border trade via NE India)' },
      { country: 'Indonesia', share: '10%', volume: '0.28 MT', products: 'Clinker (via sea to East Coast)' },
      { country: 'Vietnam', share: '8%', volume: '0.22 MT', products: 'Clinker (cheap surplus capacity)' },
      { country: 'Others', share: '7%', volume: '0.20 MT', products: 'Specialty cements' },
    ],
    trend: 'Imports are minimal compared to domestic production (<0.7% of consumption). Primarily low-cost clinker from Pakistan border and specialty white cement from UAE. BIS quality certification requirement limits cheap imports.',
  }

  return (
    <div className="space-y-6">
      {/* Export Popup */}
      {tradePopup === 'exports' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setTradePopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">🚢 India Cement Exports</h3>
              <button onClick={() => setTradePopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-center">
                <div className="text-lg font-bold text-green-700">{exportDetails.total}</div>
                <div className="text-[9px] text-gray-500">Volume</div>
              </div>
              <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-center">
                <div className="text-lg font-bold text-green-700">{exportDetails.value}</div>
                <div className="text-[9px] text-gray-500">Value</div>
              </div>
            </div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2">Top Export Destinations</h4>
            <div className="space-y-2 mb-4">
              {exportDetails.topDestinations.map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-sm font-bold text-green-700 w-10">{d.share}</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-navy">{d.country} <span className="text-gray-400">({d.volume})</span></div>
                    <div className="text-[9px] text-gray-500">{d.products}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
              <p className="text-[10px] text-green-800"><strong>Trend:</strong> {exportDetails.trend}</p>
            </div>
          </div>
        </div>
      )}

      {/* Import Popup */}
      {tradePopup === 'imports' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setTradePopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">📥 India Cement Imports</h3>
              <button onClick={() => setTradePopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-center">
                <div className="text-lg font-bold text-red-700">{importDetails.total}</div>
                <div className="text-[9px] text-gray-500">Volume</div>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-center">
                <div className="text-lg font-bold text-red-700">{importDetails.value}</div>
                <div className="text-[9px] text-gray-500">Value</div>
              </div>
            </div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2">Top Import Sources</h4>
            <div className="space-y-2 mb-4">
              {importDetails.topSources.map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-sm font-bold text-red-700 w-10">{d.share}</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-navy">{d.country} <span className="text-gray-400">({d.volume})</span></div>
                    <div className="text-[9px] text-gray-500">{d.products}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
              <p className="text-[10px] text-red-800"><strong>Trend:</strong> {importDetails.trend}</p>
            </div>
          </div>
        </div>
      )}

      {/* Global Comparison + Supply-Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Top 10 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Global Cement Production Ranking (2024)</h3>
          <p className="text-xs text-gray-500 mb-4">India is #2 globally — 18% of world output</p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={productionData.globalComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={11} unit=" MT" />
              <YAxis dataKey="country" type="category" fontSize={10} width={90} />
              <Tooltip formatter={(v: number) => `${v} MT`} />
              <Bar dataKey="production" name="Production (MT)" radius={[0, 4, 4, 0]}>
                {productionData.globalComparison.map((entry, i) => (
                  <Cell key={i} fill={entry.country === 'India' ? '#B02A30' : entry.country === 'China' ? '#dc2626' : '#005B75'} />
                ))}
                <LabelList dataKey="production" position="right" fontSize={9} formatter={(v: number) => `${v} MT`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">Source: GCCA, USGS 2024</p>
        </div>

        {/* Supply-Demand Balance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">India Cement Supply-Demand Balance (MT)</h3>
          <p className="text-xs text-gray-500 mb-4">Click on Export/Import buttons below for country-wise trade details</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={productionData.supplyDemand} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" fontSize={10} />
              <YAxis fontSize={11} domain={[0, 450]} />
              <Tooltip formatter={(v: number) => `${v} MT`} />
              <Legend />
              <Bar dataKey="production" fill="#1e3a5f" name="Production" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="production" position="top" fontSize={8} fill="#1e3a5f" />
              </Bar>
              <Bar dataKey="consumption" fill="#f59e0b" name="Consumption" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="consumption" position="top" fontSize={8} fill="#b45309" />
              </Bar>
              <Bar dataKey="exports" fill="#10b981" name="Exports" radius={[4, 4, 0, 0]} />
              <Bar dataKey="imports" fill="#8b5cf6" name="Imports" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Trade detail buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={() => setTradePopup('exports')} className="p-3 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-500 hover:bg-green-100 transition-all cursor-pointer active:scale-[0.97]">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-xs font-bold text-green-800">🚢 Exports: 9.0 MT</div>
                  <div className="text-[9px] text-green-600">Top: Bangladesh, Nepal, Sri Lanka</div>
                </div>
                <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded-lg">Details →</span>
              </div>
            </button>
            <button onClick={() => setTradePopup('imports')} className="p-3 bg-red-50 rounded-xl border-2 border-red-200 hover:border-red-500 hover:bg-red-100 transition-all cursor-pointer active:scale-[0.97]">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-xs font-bold text-red-800">📥 Imports: 2.8 MT</div>
                  <div className="text-[9px] text-red-600">Top: Pakistan, UAE, Bangladesh</div>
                </div>
                <span className="text-xs font-bold text-red-700 bg-red-200 px-2 py-1 rounded-lg">Details →</span>
              </div>
            </button>
          </div>

          <div className="mt-3 p-2 bg-navy/5 rounded-lg border border-navy/10">
            <p className="text-[10px] text-navy"><strong>Net Position:</strong> India is a net exporter (+6.2 MT in FY25). Exports are mainly clinker and OPC to neighboring countries. BIS certification requirements act as a natural barrier against cheap imports.</p>
          </div>
        </div>
      </div>

      {/* Cost Curve + Capacity Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Cost Curve */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Global Cement Cost Curve ($/tonne)</h3>
          <p className="text-xs text-gray-500 mb-4">India is among the lowest-cost producers globally</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData.costCurve}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" fontSize={9} />
              <YAxis fontSize={11} domain={[30, 100]} unit="$" />
              <Tooltip formatter={(v: number) => `$${v}/tonne`} />
              <Bar dataKey="cost" name="Production Cost ($/T)" radius={[4, 4, 0, 0]}>
                {productionData.costCurve.map((entry, i) => (
                  <Cell key={i} fill={entry.country === 'India' ? '#B02A30' : '#005B75'} />
                ))}
                <LabelList dataKey="cost" position="top" fontSize={9} formatter={(v: number) => `$${v}`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-2 bg-maroon/5 rounded-lg border border-maroon/10">
            <p className="text-[10px] text-maroon"><strong>India Advantage:</strong> Low labor cost, captive limestone mines, efficient dry-process kilns, and WHRS (Waste Heat Recovery Systems) give Indian producers $45/T cost — cheapest among major producers.</p>
          </div>
        </div>

        {/* Capacity Addition Pipeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Upcoming Capacity Additions</h3>
          <p className="text-xs text-gray-500 mb-4">~103 MTPA new capacity planned by 2028</p>
          <div className="space-y-2.5">
            {productionData.capacityPipeline.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-navy">{item.company}</div>
                  <div className="text-[10px] text-gray-500">Target: {item.year}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-maroon">+{item.capacity} MTPA</div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.status === 'Commissioned' ? 'bg-green-100 text-green-700' : item.status === 'Under construction' ? 'bg-blue-100 text-blue-700' : item.status === 'EC received' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                  }`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-navy/5 rounded-lg border border-navy/10">
            <p className="text-[10px] text-navy"><strong>Target:</strong> India aims for 800+ MTPA capacity by 2030 (currently 600 MTPA). Adani Group and JSW are the most aggressive expanders with 25 MTPA each planned.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlayersTab() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)

  const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
    'UltraTech Cement': { hq: 'Mumbai', ceo: 'K.C. Jhanwar', founded: '1983', type: 'Private (Aditya Birla Group)', plants: 'Tadipatri (AP), Awarpur (MH), Rajashree (KA), Maihar (MP), Kotputli (RJ) — 23 integrated plants, 27 grinding units, 8 bulk terminals', expansion: 'Kesoram acquisition (+10 MTPA), targeting 200 MTPA by FY28. Most aggressive brownfield strategy in India.', moat: 'Pan-India presence (only player in all regions), largest distribution network (1 lakh+ dealers), premium brand command' },
    'Ambuja Cements (Adani)': { hq: 'Ahmedabad', ceo: 'Ajay Kapur', founded: '1983', type: 'Private (Adani Group, acquired 2022)', plants: 'Bhatapara (CG), Ambujanagar (GJ), Darlaghat (HP), Maratha (MH), Ropar (PB) — includes ACC plants at Wadi, Kymore, Chaibasa', expansion: 'Adani targeting 140 MTPA by 2028 (combined Ambuja+ACC). 25 MTPA brownfield additions underway at 8 locations.', moat: 'Lowest cost producer post-Adani synergies, massive clinker capacity at Bhatapara, Adani port/logistics integration' },
    'Shree Cement': { hq: 'Kolkata (Registered: Beawar, Rajasthan)', ceo: 'Neeraj Akhoury', founded: '1979', type: 'Private (Bangur family)', plants: 'Beawar, Ras (Rajasthan), Kodla (Karnataka), Baloda Bazaar (CG), Nawalgarh (RJ), Purulia (WB)', expansion: 'Adding 10 MTPA to reach 66 MTPA by FY27. Focus on East India greenfield at Purulia and Nalanda (Bihar).', moat: 'Lowest cost operator globally ($38/T), WHRS pioneer (50%+ power from waste heat), highest EBITDA margins (25%+)' },
    'Dalmia Bharat': { hq: 'New Delhi', ceo: 'Mahendra Singhi', founded: '1939', type: 'Private', plants: 'Dalmiapuram (TN), Kadapa (AP), Rajgangpur (Odisha), Umrangso (Meghalaya), Lanka (Assam), Belgaum (KA)', expansion: 'Targeting 75 MTPA by FY28. Greenfield 3.3 MTPA in Odisha commissioned. Strongest in East + South.', moat: 'Sustainability leader (lowest carbon footprint in India), diverse geography, strong East + NE India presence' },
    'JSW Cement': { hq: 'Mumbai', ceo: 'Parth Jindal', founded: '2009', type: 'Private (JSW Group)', plants: 'Nandyal (AP), Salboni (WB), Dolvi (MH), Fujairah (UAE) — uses steel slag from JSW Steel', expansion: 'Most aggressive new entrant — targeting 50 MTPA by 2030 from current 20 MTPA. Multiple acquisitions + greenfields.', moat: 'Slag cement (zero limestone cost from JSW Steel), JSW brand, massive capex war chest from group' },
    'JK Cement': { hq: 'Kanpur', ceo: 'Raghavpat Singhania', founded: '1975', type: 'Private (JK Organisation)', plants: 'Nimbahera, Mangrol (Rajasthan), Muddapur (Karnataka), Aligarh (UP)', expansion: 'Targeting 30 MTPA by FY27. Strong in North + grey cement. India\'s #2 white cement brand.', moat: 'Dual play — grey + white cement. JK White Cement is premium brand (#2 after Birla White). Strong in Rajasthan/North.' },
    'Ramco Cements': { hq: 'Chennai', ceo: 'A.V. Dharmakrishnan', founded: '1957', type: 'Private (Ramco Group)', plants: 'Ariyalur (TN), Jayanthipuram (AP), Kurnool (AP), Alathiyur (TN)', expansion: 'Targeting 30 MTPA by FY27. Expanding into East India (Odisha plant). RMC + dry-mix mortar growth.', moat: 'South India brand loyalty (#1 in Tamil Nadu), RMC network (100+ plants), dry-mix mortar pioneer in India' },
    'Nuvoco Vistas': { hq: 'Mumbai', ceo: 'Jayakumar Krishnaswamy', founded: '2014', type: 'Private (Nirma Group)', plants: 'Risda (CG), Mejia (WB), Jojobera (JH), Nimbol (RJ), Arasmeta (CG)', expansion: 'Targeting 32 MTPA by FY27. Strongest in East India. Integrated RMC + cement model.', moat: 'East India dominance (#3 brand), largest RMC player in India (Concreto), innovation focus (Duraguard, InstaMix)' },
  }

  const ownershipSplit = [
    { type: 'Private Sector', capacity: 588, share: 98 },
    { type: 'PSU', capacity: 12, share: 2 },
  ]

  const radarData = [
    { metric: 'Revenue', UltraTech: 95, Shree: 55, Dalmia: 42, Ambuja: 70 },
    { metric: 'Margin', UltraTech: 70, Shree: 95, Dalmia: 65, Ambuja: 60 },
    { metric: 'Capacity', UltraTech: 95, Shree: 45, Dalmia: 38, Ambuja: 72 },
    { metric: 'Distribution', UltraTech: 95, Shree: 60, Dalmia: 55, Ambuja: 75 },
    { metric: 'Brand', UltraTech: 90, Shree: 65, Dalmia: 55, Ambuja: 80 },
    { metric: 'Growth', UltraTech: 75, Shree: 70, Dalmia: 80, Ambuja: 90 },
  ]

  const marketShareData = [
    { company: 'UltraTech', share: 24, change: +1.5 },
    { company: 'Ambuja-ACC (Adani)', share: 16, change: +2.0 },
    { company: 'Shree Cement', share: 10, change: +0.5 },
    { company: 'Dalmia Bharat', share: 8, change: +1.0 },
    { company: 'JSW Cement', share: 4, change: +1.5 },
    { company: 'Others', share: 38, change: -6.5 },
  ]

  const selected = selectedPlayer ? playerDetails[selectedPlayer] : null

  return (
    <div className="space-y-6">
      {/* Player Detail Popup */}
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
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-[9px] font-bold text-blue-700 uppercase">Plants</span>
                <p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <span className="text-[9px] font-bold text-green-700 uppercase">Expansion Plans</span>
                <p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                <span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span>
                <p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ownership Donut + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ownership Donut */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Private vs PSU Split</h3>
          <p className="text-xs text-gray-500 mb-4">Cement is almost entirely private-sector driven in India</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={ownershipSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="capacity" nameKey="type" paddingAngle={3}>
                  {ownershipSplit.map((_, i) => <Cell key={i} fill={i === 0 ? '#f37021' : '#1e3a5f'} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v} MTPA`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {ownershipSplit.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: i === 0 ? '#f37021' : '#1e3a5f' }}></div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-navy">{item.type}</div>
                    <div className="text-[10px] text-gray-500">{item.capacity} MTPA</div>
                  </div>
                  <div className="text-lg font-black" style={{ color: i === 0 ? '#f37021' : '#1e3a5f' }}>{item.share}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-2.5 bg-orange-50 rounded-xl border border-orange-200 text-center">
            <div className="text-xs font-bold text-orange-800">Key Private Groups</div>
            <div className="text-[9px] text-orange-600 mt-1">Aditya Birla (UltraTech), Adani (Ambuja+ACC), Shree, Dalmia, JSW, JK, Ramco, Nuvoco</div>
          </div>
        </div>

        {/* Radar Chart — Top 4 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Top 4 — Multi-Dimensional Comparison</h3>
          <p className="text-xs text-gray-500 mb-3">Scores normalized 0-100 across 6 dimensions</p>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" fontSize={10} tick={{ fill: '#1f2937' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={8} tick={{ fill: '#94a3b8' }} />
              <Radar name="UltraTech" dataKey="UltraTech" stroke="#f37021" fill="#f37021" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Ambuja-ACC" dataKey="Ambuja" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Shree Cement" dataKey="Shree" stroke="#059669" fill="#059669" fillOpacity={0.08} strokeWidth={2} />
              <Radar name="Dalmia Bharat" dataKey="Dalmia" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.08} strokeWidth={2} />
              <Legend fontSize={10} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Share */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Market Share (FY25) — Consolidation Accelerating</h3>
        <p className="text-xs text-gray-500 mb-4">Top 5 groups control 62% of capacity — up from 50% in 2020</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {marketShareData.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-1">
                <div className="text-sm font-bold text-navy">{c.company}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#f37021]" style={{ width: `${c.share * 3.5}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-navy w-12 text-right">{c.share}%</span>
                </div>
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-lg ${c.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {c.change > 0 ? '↑' : '↓'}{c.change > 0 ? '+' : ''}{c.change}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Company Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-navy mb-2">Detailed Company Profiles</h3>
        <p className="text-xs text-gray-500 mb-4">👆 Click any row for expansion plans, plants, and competitive moat</p>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b-2 border-navy/20">
              <th className="text-left py-2 px-2 font-bold text-navy">#</th>
              <th className="text-left py-2 px-2 font-bold text-navy">Company</th>
              <th className="text-right py-2 px-2 font-bold text-navy">Capacity (MTPA)</th>
              <th className="text-right py-2 px-2 font-bold text-navy">Revenue (₹ Cr)</th>
              <th className="text-center py-2 px-2 font-bold text-navy">Type</th>
              <th className="text-center py-2 px-2 font-bold text-navy">Products</th>
              <th className="text-center py-2 px-2 font-bold text-navy">Details</th>
            </tr>
          </thead>
          <tbody>
            {playersData.map((p) => (
              <tr key={p.rank} className="border-b border-gray-50 hover:bg-orange-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}>
                <td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td>
                <td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td>
                <td className="py-2.5 px-2 text-right font-bold">{p.capacity}</td>
                <td className="py-2.5 px-2 text-right">₹{p.revenue.toLocaleString()}</td>
                <td className="py-2.5 px-2 text-center"><span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-semibold">{p.type}</span></td>
                <td className="py-2.5 px-2 text-center text-[10px]">{p.products}</td>
                <td className="py-2.5 px-2 text-center">
                  <span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View →</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RiskTab({ isAdmin }: { isAdmin: boolean }) {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'emerging' | 'casestudies' | 'glossary'>('insurable')

  const probColor = (p: string) => p === 'High' ? 'bg-red-100 text-red-700' : p === 'Medium-High' ? 'bg-orange-100 text-orange-700' : p === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
  const impactColor = (i: string) => i === 'Catastrophic' || i === 'Very High' ? 'bg-red-100 text-red-700' : i === 'High' ? 'bg-orange-100 text-orange-700' : i === 'Medium-High' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'

  const aogRisks = [
    { name: 'Earthquake', probability: 'Low', impact: 'Very High', emv: '₹200-1000 Cr', mitigation: 'Seismic-resistant kiln foundations, base isolation for preheater tower, structural audit of tall silos' },
    { name: 'Flood / Inundation', probability: 'Medium', impact: 'High', emv: '₹30-200 Cr', mitigation: 'Elevated electrical rooms, flood walls around coal/pet coke storage yards, drainage management' },
    { name: 'Cyclone', probability: 'Medium', impact: 'High', emv: '₹20-150 Cr', mitigation: 'Wind-rated cladding on packing plant, crane tie-downs, raw material stockpile protection' },
    { name: 'Lightning', probability: 'Medium-High', impact: 'Medium', emv: '₹5-30 Cr', mitigation: 'ESE lightning arrestors on kiln stack/preheater, surge protection on VFDs and PLC systems' },
    { name: 'Landslide', probability: 'Low', impact: 'Medium', emv: '₹10-80 Cr', mitigation: 'Slope stability monitoring in limestone quarries, bench design per DGMS norms, drainage in overburden dumps' },
  ]

  const nonAogRisks = [
    { name: 'Kiln Refractory Failure', probability: 'Medium', impact: 'Very High', emv: '₹50-400 Cr', mitigation: 'Shell temperature monitoring (IR scanner), refractory thickness logging, coating management in burning zone' },
    { name: 'Crusher Breakdown', probability: 'High', impact: 'High', emv: '₹10-80 Cr', mitigation: 'Vibration monitoring on main bearings, toggle plate inspection schedule, hammer tip wear measurement' },
    { name: 'VRM (Vertical Roller Mill) Failure', probability: 'Medium-High', impact: 'Very High', emv: '₹30-250 Cr', mitigation: 'Oil analysis for gearbox, roller and table wear monitoring, hydraulic system pressure trending' },
    { name: 'Fire in Coal/Pet Coke Storage', probability: 'Medium-High', impact: 'High', emv: '₹20-100 Cr', mitigation: 'Temperature probes in stockpiles, compaction of coal layers, CO monitoring, foam suppression system' },
    { name: 'Silo Collapse', probability: 'Low', impact: 'Catastrophic', emv: '₹50-300 Cr', mitigation: 'Flow pattern analysis, anti-ratholing devices, structural integrity audit, overpressure relief valves' },
    { name: 'Dust Explosion (Bag Filter)', probability: 'Medium', impact: 'High', emv: '₹15-80 Cr', mitigation: 'Spark detection systems before bag filters, explosion venting panels, proper grounding of ducting' },
  ]

  const emergingTechRisks = [
    { tech: 'Waste Heat Recovery (WHRS)', stage: 'Deployed', risks: 'Organic Rankine Cycle fluid leaks, condenser tube fouling, thermal cycling fatigue on heat exchanger tubes', insurance: 'MB policy covers; MLOP for extended outage', challenge: 'WHRS failure can derate kiln output by 15-20% due to loss of preheater optimization' },
    { tech: 'Alternative Fuels (RDF/Biomass)', stage: 'Scaling', risks: 'Inconsistent calorific value causes kiln upsets, chlorine/alkali buildup in preheater, fuel handling fires', insurance: 'Fire policy with AF-specific extension; MB for kiln damage from alkali', challenge: 'No standard loss history for AF — actuarial models based on coal combustion underestimate chlorine-related damage' },
    { tech: 'Carbon Capture & Storage (CCS)', stage: 'Pilot', risks: 'High-pressure CO2 vessels (100+ bar), pipeline integrity for CO2 transport, amine degradation in absorption tower', insurance: 'Bespoke wording needed — no standard product. CAR for construction phase', challenge: 'Zero commercial-scale deployment in Indian cement. CCUS adds $20-30/T to cost — viability uncertain' },
    { tech: 'AI-based Kiln Optimization', stage: 'Deployed', risks: 'Algorithm errors causing clinker quality deviation, cybersecurity risk on DCS/PLC, over-reliance on model predictions', insurance: 'Cyber policy for IT/OT convergence risk; PI for quality claims', challenge: 'Attribution problem — is kiln trip caused by AI error or underlying mechanical issue? Claim adjudication unclear' },
    { tech: 'Vertical Roller Mill (VRM) Upgrades', stage: 'Scaling', risks: 'New generation VRMs (6000+ TPD) have limited operating history, gearbox failures in planetary drives, vibration-induced fatigue', insurance: 'MB with enhanced VRM clause; MLOP critical given single-mill dependency', challenge: 'Single VRM serves entire plant — failure = 100% production loss. Replacement parts have 6-12 month lead time from OEMs' },
  ]

  const caseStudies = [
    { title: 'ACC Wadi — Kiln Refractory Fire (2023)', plant: 'ACC Wadi, Karnataka', loss: '₹180 Cr (PD + BI)', cause: 'Refractory lining failure in burning zone led to shell hot-spot and subsequent fire in cable gallery beneath kiln', lesson: 'Continuous IR monitoring with auto-trip at 350°C shell temp; redundant power cables routed away from kiln', claimType: 'Fire + MLOP' },
    { title: 'UltraTech Aditya — Silo Collapse (2022)', plant: 'UltraTech Aditya Cement, Gulbarga KA', loss: '₹95 Cr (PD + 3 fatalities)', cause: 'Ratholing in raw meal silo caused asymmetric loading; structural failure of silo wall due to repeated thermal cycling', lesson: 'Anti-ratholing aeration systems mandatory; annual structural audit of all silos > 5000T capacity', claimType: 'MB + WC' },
    { title: 'Dalmia Kadapa — Limestone Mine Collapse (2024)', plant: 'Dalmia Bharat, Kadapa AP', loss: '₹65 Cr (Property + BI)', cause: 'Bench failure in open-cast limestone mine after unseasonal heavy rains; overburden dump slid onto haul road and crusher', lesson: 'Rain-triggered slope stability protocols; automatic mine evacuation at 50mm/hour rainfall; redesign bench geometry', claimType: 'AOG (Landslide) + MLOP' },
    { title: 'Ambuja Bhatapara — Cyclone Damage (2023)', plant: 'Ambuja Cements, Bhatapara CG', loss: '₹45 Cr (PD)', cause: 'Unseasonal cyclonic storm (120 kmph) damaged packing plant roof, collapsed raw material conveyor gallery, toppled coal stacker', lesson: 'Wind-rated design for all structures > 20m height; secure all mobile equipment before monsoon; real-time weather monitoring', claimType: 'Storm/Cyclone (AOG)' },
    { title: 'Shree Cement Beawar — WHRS Failure (2024)', plant: 'Shree Cement, Beawar RJ', loss: '₹28 Cr (MB + lost efficiency)', cause: 'Organic fluid leak in WHRS ORC system caused fire in turbine house; simultaneous loss of 15 MW captive power', lesson: 'Dual containment for ORC working fluid; independent fire suppression for WHRS building; backup grid power agreement', claimType: 'MB + Fire' },
  ]

  const glossary = [
    { term: 'OPC', full: 'Ordinary Portland Cement', desc: 'Standard cement made from clinker + gypsum. Available in 33/43/53 grades.' },
    { term: 'PPC', full: 'Portland Pozzolana Cement', desc: 'OPC blended with 15-35% fly ash for improved durability and lower CO2.' },
    { term: 'Clinker', full: 'Cement Clinker', desc: 'Intermediate calcium silicate nodules produced at 1450°C in rotary kiln. Ground to make cement.' },
    { term: 'Kiln', full: 'Rotary Kiln', desc: 'Large rotating cylinder (60-100m long, 4-6m diameter) where clinker is formed at 1450°C.' },
    { term: 'VRM', full: 'Vertical Roller Mill', desc: 'Large grinding mill using rollers on a rotating table. Used for raw meal and cement grinding.' },
    { term: 'WHRS', full: 'Waste Heat Recovery System', desc: 'System to generate power from kiln exhaust heat (typically 5-8 MW per line).' },
    { term: 'Clinker Factor', full: 'Clinker-to-Cement Ratio', desc: 'Percentage of clinker in final cement. Lower = greener. India avg 0.67 vs global 0.72.' },
    { term: 'LSF', full: 'Lime Saturation Factor', desc: 'Ratio of CaO to other oxides in raw mix. Controls clinker quality (target 0.92-0.98).' },
    { term: 'SR', full: 'Silica Ratio (Modulus)', desc: 'SiO2/(Al2O3+Fe2O3). Controls liquid phase in kiln. Typical range 2.0-2.6.' },
    { term: 'AR', full: 'Alumina Ratio (Modulus)', desc: 'Al2O3/Fe2O3. Controls viscosity of liquid phase in kiln burning zone.' },
    { term: 'TPD', full: 'Tonnes Per Day', desc: 'Kiln capacity measure. Modern kilns: 5,000-12,000 TPD clinker.' },
    { term: 'Refractory', full: 'Refractory Lining', desc: 'Heat-resistant bricks lining kiln interior. Magnesia-spinel in burning zone (1800°C rated).' },
    { term: 'Pyroprocessing', full: 'Thermal Processing', desc: 'Entire thermal system: preheater → precalciner → rotary kiln → cooler.' },
    { term: 'Grinding Aid', full: 'Cement Grinding Aid', desc: 'Chemical additive (glycol-based) to improve grinding efficiency and prevent ball coating in cement mill.' },
    { term: 'NDT', full: 'Non-Destructive Testing', desc: 'Inspection methods (UT for kiln shell, MPI for girth gear, vibration for bearings).' },
    { term: 'MLOP', full: 'Machinery Loss of Profit', desc: 'Insurance covering business interruption following an insured machinery breakdown.' },
  ]

  const riskSubTabs: { id: typeof riskSubTab; label: string }[] = [
    { id: 'insurable', label: 'AOG & Non-AOG Risks' },
    { id: 'emerging', label: 'Emerging Tech' },
    { id: 'casestudies', label: 'Case Studies' },
    { id: 'glossary', label: 'Glossary' },
  ]

  return (
    <div className="space-y-6">
      {/* ISO 31000 Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-maroon" />
            <div>
              <h3 className="text-sm font-bold text-navy">ISO 31000:2018 Risk Management Framework</h3>
              <p className="text-xs text-gray-500">Cement Industry — Kiln | Crusher | VRM | Packing</p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"><RefreshCw size={12} /> Refresh</button>
              <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 bg-maroon text-white rounded-lg text-xs font-semibold hover:bg-maroon/90"><Download size={12} /> Export</button>
            </div>
          )}
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {riskSubTabs.map((tab) => (
          <button key={tab.id} onClick={() => setRiskSubTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              riskSubTab === tab.id ? 'bg-maroon text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Insurable Risks (AOG + Non-AOG) */}
      {riskSubTab === 'insurable' && (
        <div className="space-y-6">
          {/* AOG Section */}
          <div>
            <h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
              <CloudRain size={16} className="text-blue-500" /> Acts of God (AOG) Perils
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aogRisks.map((r, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-navy text-sm">{r.name}</h5>
                    <span className="text-xs font-bold text-maroon">{r.emv}</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${probColor(r.probability)}`}>P: {r.probability}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${impactColor(r.impact)}`}>I: {r.impact}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 italic">{r.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Non-AOG Section */}
          <div>
            <h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
              <Flame size={16} className="text-red-500" /> Non-AOG (Operational) Perils
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nonAogRisks.map((r, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-navy text-sm">{r.name}</h5>
                    <span className="text-xs font-bold text-maroon">{r.emv}</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${probColor(r.probability)}`}>P: {r.probability}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${impactColor(r.impact)}`}>I: {r.impact}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 italic">{r.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Business Interruption Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-3">Business Interruption — Daily Loss Estimates</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-maroon/5 rounded-xl">
                <div className="text-xl font-bold text-maroon">₹8-25 Cr/day</div>
                <div className="text-xs text-gray-500">Large Integrated Plant</div>
                <div className="text-[9px] text-gray-400">(5,000+ TPD kiln)</div>
              </div>
              <div className="text-center p-4 bg-navy/5 rounded-xl">
                <div className="text-xl font-bold text-navy">₹3-8 Cr/day</div>
                <div className="text-xs text-gray-500">Medium Plant</div>
                <div className="text-[9px] text-gray-400">(2,000-5,000 TPD)</div>
              </div>
              <div className="text-center p-4 bg-orange/10 rounded-xl">
                <div className="text-xl font-bold text-orange">₹1-3 Cr/day</div>
                <div className="text-xs text-gray-500">Grinding Unit</div>
                <div className="text-[9px] text-gray-400">(1-2 MTPA)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Emerging Tech Risks */}
      {riskSubTab === 'emerging' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {emergingTechRisks.map((tech, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    tech.stage === 'Pilot' ? 'bg-amber-100 text-amber-700' : tech.stage === 'Scaling' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>{tech.stage}</span>
                </div>
                <h5 className="font-bold text-navy text-sm mb-2">{tech.tech}</h5>
                <div className="space-y-2">
                  <div><span className="text-[10px] font-bold text-red-600">Risks:</span><p className="text-[10px] text-gray-600">{tech.risks}</p></div>
                  <div><span className="text-[10px] font-bold text-blue-600">Insurance:</span><p className="text-[10px] text-gray-600">{tech.insurance}</p></div>
                  <div className="bg-amber-50 rounded-lg p-2 border border-amber-100">
                    <span className="text-[10px] font-bold text-amber-700">Challenge:</span>
                    <p className="text-[10px] text-amber-800">{tech.challenge}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Case Studies */}
      {riskSubTab === 'casestudies' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500" /> Case Studies — Major Cement Losses (India)
            </h4>
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

          {/* Claims Patterns */}
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-maroon border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-3">Top 5 Claims Patterns — Cement Industry</h4>
            <div className="space-y-2">
              {[
                'Kiln refractory failure accounts for 35% of all cement claims by value — average 60-90 day outage with ₹50-400 Cr loss per event',
                'VRM gearbox failures are the single largest machinery breakdown claim — planetary gearbox replacement takes 4-6 months from OEM (Loesche/FLSmidth)',
                'Coal/pet coke storage fires occur annually across industry — spontaneous combustion in stockpiles exceeding 7-day inventory threshold',
                'Cyclone damage to packing plants and conveyor galleries is increasing — coastal plants in AP, TN, GJ most exposed',
                'Silo structural failures are low-frequency but catastrophic — design inadequacy for thermal cycling and flow pattern changes causes fatigue cracking',
              ].map((cl, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-maroon text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-xs text-gray-700">{cl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Glossary */}
      {riskSubTab === 'glossary' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-navy mb-4">Technical Glossary — Cement Risk Assessment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {glossary.map((g, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-[10px] font-bold text-maroon bg-maroon/10 px-1.5 py-0.5 rounded shrink-0">{g.term}</span>
                <div>
                  <span className="text-[10px] font-semibold text-navy">{g.full}</span>
                  <p className="text-[9px] text-gray-500">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function GeographyTab() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const selectedInfo = geographyData.find(s => s.state === selectedState)

  return (
    <div className="space-y-6">
      {/* Popup Modal */}
      {selectedState && selectedInfo && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">Why {selectedState} is a Cement Hub</h3>
              <button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-4 bg-navy/5 rounded-xl mb-4">
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div><div className="text-lg font-bold text-maroon">{selectedInfo.capacity} MTPA</div><div className="text-[10px] text-gray-500">Capacity</div></div>
                <div><div className="text-lg font-bold text-navy">{selectedInfo.share}%</div><div className="text-[10px] text-gray-500">India Share</div></div>
                <div><div className="text-lg font-bold text-orange">#{geographyData.indexOf(selectedInfo) + 1}</div><div className="text-[10px] text-gray-500">Rank</div></div>
              </div>
              <p className="text-xs text-gray-600"><strong>Major Players:</strong> {selectedInfo.majorPlayers}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy mb-2">Key Reasons</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedInfo.reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bar Chart (clickable) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Cement Capacity (MTPA)</h3>
        <p className="text-xs text-gray-500 mb-4">👆 Click any bar to see why that state is a cement manufacturing hub</p>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={geographyData} layout="vertical" onClick={(data: any) => { if (data && data.activePayload) setSelectedState(data.activePayload[0]?.payload?.state) }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={10} unit=" MT" />
            <YAxis dataKey="state" type="category" fontSize={10} width={100} />
            <Tooltip formatter={(v: number) => `${v} MTPA`} />
            <Bar dataKey="capacity" name="Capacity (MTPA)" radius={[0, 4, 4, 0]} cursor="pointer">
              {geographyData.map((_, i) => (
                <Cell key={i} fill={i < 3 ? '#f37021' : i < 6 ? '#1e3a5f' : '#94a3b8'} />
              ))}
              <LabelList dataKey="capacity" position="right" fontSize={9} formatter={(v: number) => `${v} MT`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Table (clickable) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Cement Belt Distribution — India</h3>
        <p className="text-xs text-gray-500 mb-4">👆 Click any state to understand why it's a cement hub</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">State</th>
                <th className="text-right py-2 px-2 font-bold text-navy">Capacity (MTPA)</th>
                <th className="text-right py-2 px-2 font-bold text-navy">Share (%)</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Major Players</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Insight</th>
              </tr>
            </thead>
            <tbody>
              {geographyData.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-orange-50/30 cursor-pointer transition" onClick={() => setSelectedState(s.state)}>
                  <td className="py-2.5 px-2 font-semibold text-maroon underline decoration-dotted">{s.state}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-navy">{s.capacity}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-orange">{s.share}%</td>
                  <td className="py-2.5 px-2 text-gray-600">{s.majorPlayers}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="text-[9px] font-bold text-white bg-maroon px-2.5 py-1 rounded-lg shadow-sm">Why?</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cement Corridor Insight */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-bold text-navy mb-3">India's Cement Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <h4 className="text-xs font-bold text-orange-800 mb-1">Western Belt (35% capacity)</h4>
            <p className="text-[10px] text-orange-700">Rajasthan → Gujarat → Maharashtra. Richest limestone reserves. Shree Cement, Ambuja, UltraTech core territory. Serves Delhi-NCR, Mumbai construction boom.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="text-xs font-bold text-blue-800 mb-1">Southern Belt (40% capacity)</h4>
            <p className="text-[10px] text-blue-700">Andhra Pradesh → Tamil Nadu → Karnataka → Telangana. Kurnool-Kadapa + Ariyalur limestone belts. India Cements, Dalmia, UltraTech, Ramco. Export-oriented via ports.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="text-xs font-bold text-green-800 mb-1">Central-East Belt (25% capacity)</h4>
            <p className="text-[10px] text-green-700">Madhya Pradesh → Chhattisgarh → Odisha. Pan-India distribution advantage. Ambuja Bhatapara, UltraTech Maihar, Dalmia Rajgangpur. Growing demand from housing push.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewsTab() {
  const [regionFilter, setRegionFilter] = useState('All')
  const regions = ['All', 'North', 'South', 'East', 'West', 'National']

  const filtered = regionFilter === 'All' ? newsData : newsData.filter(n => n.region === regionFilter)

  const getCatColor = (c: string) => c === 'Business Wins' ? 'bg-green-100 text-green-800' : c === 'Accidents' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-2">
          {regions.map((r) => (
            <button key={r} onClick={() => setRegionFilter(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                regionFilter === r ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-300 hover:border-navy'
              }`}>{r}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCatColor(item.category)}`}>{item.category}</span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
            <h4 className="font-bold text-navy text-sm">{item.title}</h4>
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={10} /> {item.region}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
