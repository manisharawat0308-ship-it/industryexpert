import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, Plane, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, LabelList
} from 'recharts'
import PlayersBoard, { PlayerRow } from '../components/PlayersBoard'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { AVIATION_GAME } from '../components/process-game/data/aviationGame'
import BusinessModel from '../components/BusinessModel'
import { AVIATION_BUSINESS } from '../data/businessModels/aviationBusiness'
import NewsFeed from '../components/NewsFeed'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'
import AviationRiskAnalysis from '../components/risk-analysis/AviationRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'

const COLORS = ['#0c4a6e', '#B02A30', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#1e3a5f']

type AvTab = 'overview' | 'business' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot' | 'game'

// ===== DATA =====
const segmentData = [
  { name: 'Domestic Airlines', value: 55, color: '#0c4a6e' },
  { name: 'International Airlines', value: 20, color: '#B02A30' },
  { name: 'Airports & Ground Handling', value: 12, color: '#F99D27' },
  { name: 'MRO (Maintenance)', value: 5, color: '#4CAF50' },
  { name: 'Cargo & Logistics', value: 5, color: '#9C27B0' },
  { name: 'General Aviation & Defense', value: 3, color: '#1e3a5f' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Domestic Airlines': { subtypes: [{ name: 'IndiGo', share: '62%' }, { name: 'Air India (Tata)', share: '15%' }, { name: 'Akasa Air', share: '5%' }, { name: 'SpiceJet', share: '4%' }, { name: 'Vistara (merged into AI)', share: '9%' }, { name: 'Others', share: '5%' }], desc: '150M+ domestic passengers/year. IndiGo dominates with 62% share and 350+ aircraft. Low-cost model prevails. ATF cost = 40% of operating expenses.' },
  'International Airlines': { subtypes: [{ name: 'Air India', share: '30%' }, { name: 'IndiGo (expanding)', share: '15%' }, { name: 'Emirates/Qatar/Singapore', share: '35%' }, { name: 'Others (Etihad, Thai, BA)', share: '20%' }], desc: '70M international passengers. India has bilateral agreements with 116 countries. Air India rebuilding international network post-Tata acquisition. Gulf carriers dominate India-to-West routes.' },
  'Airports & Ground Handling': { subtypes: [{ name: 'AAI Airports (125+)', share: '45%' }, { name: 'Adani Airports (7)', share: '22%' }, { name: 'GMR (Delhi, Hyderabad)', share: '20%' }, { name: 'MIAL Mumbai', share: '10%' }, { name: 'Others', share: '3%' }], desc: '157 operational airports. Navi Mumbai, Jewar (Noida), Bhogapuram under construction. PPP model for major airports. Target 220 airports by 2030 under UDAN.' },
  'MRO (Maintenance)': { subtypes: [{ name: 'Air India Engineering (AIESL)', share: '30%' }, { name: 'GMR Aero Technic', share: '20%' }, { name: 'IndiGo in-house', share: '15%' }, { name: 'Tata Boeing (Hyderabad)', share: '15%' }, { name: 'Others (HAL, max)', share: '20%' }], desc: '$2.5B market but 80% sent abroad (Singapore, UAE, Sri Lanka). Government reducing GST to 5% on MRO to make India competitive. Target: MRO hub by 2030.' },
  'Cargo & Logistics': { subtypes: [{ name: 'Belly cargo (passenger flights)', share: '50%' }, { name: 'Dedicated freighters (Blue Dart, Quikjet)', share: '30%' }, { name: 'Express cargo (FedEx, DHL)', share: '20%' }], desc: '3.5 MT air cargo/year. E-commerce driving 20%+ growth. Dedicated cargo terminals at Delhi, Mumbai, Hyderabad. Cold chain for pharma exports growing rapidly.' },
  'General Aviation & Defense': { subtypes: [{ name: 'Business jets (350+ registered)', share: '40%' }, { name: 'Helicopters (ONGC, Pawan Hans)', share: '30%' }, { name: 'Flying training (DGCA schools)', share: '15%' }, { name: 'Drones/UAV', share: '15%' }], desc: 'India has 350+ business jets. Helicopter operations for offshore oil/gas, VIP, and medical evacuation. Drone sector growing 30%+ with PLI support.' },
}

const globalComparison = [
  { country: 'USA', passengers: 900 },
  { country: 'China', passengers: 620 },
  { country: 'India', passengers: 220 },
  { country: 'UK', passengers: 180 },
  { country: 'Germany', passengers: 145 },
  { country: 'Japan', passengers: 130 },
  { country: 'Brazil', passengers: 95 },
  { country: 'Turkey', passengers: 90 },
  { country: 'Indonesia', passengers: 85 },
  { country: 'UAE', passengers: 80 },
]

const timelineData = [
  { year: '2010', pax: 65, fleet: 400 },
  { year: '2013', pax: 80, fleet: 450 },
  { year: '2015', pax: 100, fleet: 500 },
  { year: '2017', pax: 130, fleet: 550 },
  { year: '2019', pax: 165, fleet: 680 },
  { year: '2020', pax: 55, fleet: 700 },
  { year: '2022', pax: 140, fleet: 720 },
  { year: '2024', pax: 200, fleet: 800 },
  { year: '2025', pax: 220, fleet: 850 },
  { year: '2030', pax: 400, fleet: 1500 },
]

const playersData = [
  { rank: 1, name: 'IndiGo', fleet: 360, share: '62%', revenue: 70000, routes: 115, type: 'LCC' },
  { rank: 2, name: 'Air India (Tata)', fleet: 170, share: '15%', revenue: 45000, routes: 95, type: 'FSC' },
  { rank: 3, name: 'Akasa Air', fleet: 26, share: '5%', revenue: 4000, routes: 22, type: 'LCC' },
  { rank: 4, name: 'SpiceJet', fleet: 30, share: '4%', revenue: 8000, routes: 45, type: 'LCC' },
  { rank: 5, name: 'Adani Airports', fleet: 0, share: 'N/A', revenue: 8500, routes: 7, type: 'Infrastructure' },
  { rank: 6, name: 'GMR Airports', fleet: 0, share: 'N/A', revenue: 10000, routes: 2, type: 'Infrastructure' },
  { rank: 7, name: 'Star Air', fleet: 8, share: '1%', revenue: 800, routes: 18, type: 'Regional' },
  { rank: 8, name: 'Alliance Air', fleet: 18, share: '2%', revenue: 1500, routes: 55, type: 'Regional' },
  { rank: 9, name: 'Blue Dart Aviation', fleet: 7, share: 'Cargo', revenue: 5500, routes: 12, type: 'Cargo' },
  { rank: 10, name: 'HAL', fleet: 0, share: 'Defense', revenue: 28000, routes: 0, type: 'Aerospace/MFG' },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'IndiGo': { hq: 'Gurugram', ceo: 'Pieter Elbers', founded: '2006', type: 'Private (InterGlobe)', plants: 'Hubs: Delhi, Mumbai, Bangalore, Hyderabad, Kolkata', expansion: 'Order book: 500+ A320neo/A321XLR. International expansion to Europe, Central Asia. Wide-body fleet (A350) from 2027. Target 2,000 daily flights.', moat: '62% domestic share. Lowest CASK (cost/seat) globally among LCCs. Single aircraft type (A320 family) = lowest maintenance cost. 12% operating margin vs industry average 2-3%.' },
  'Air India (Tata)': { hq: 'Delhi', ceo: 'Campbell Wilson', founded: '1932 (Tata acquired 2022)', type: 'Private (Tata Group)', plants: 'Hubs: Delhi, Mumbai. International: 40+ destinations', expansion: '470 aircraft ordered (Airbus + Boeing). Vistara merged (Nov 2024). Targeting top-20 global airline by 2030. Full fleet replacement by 2028.', moat: 'Only Indian full-service international carrier. Bilateral rights to all major routes (grandfather rights). Maharaja brand legacy. Tata Group backing ($15B+ fleet investment).' },
  'Adani Airports': { hq: 'Ahmedabad', ceo: 'Jeet Adani', founded: '2019 (entered sector)', type: 'Private (Adani Group)', plants: '7 airports: Ahmedabad, Lucknow, Mangalore, Jaipur, Guwahati, Thiruvananthapuram, Mumbai (MIAL 74%)', expansion: 'Navi Mumbai greenfield (opening 2025). Total 7 airports handling 80M+ passengers. Target 20% of India air traffic.', moat: 'Largest private airport operator by count. Revenue from both aero + non-aero. Real estate development around airports. 50-year concession periods.' },
  'GMR Airports': { hq: 'Delhi', ceo: 'Grandhi Kiran Kumar', founded: '2006', type: 'Private (GMR Group)', plants: 'Delhi (DIAL), Hyderabad (GHIAL), + Philippines, Greece, Indonesia', expansion: 'Delhi T4 expansion. Hyderabad Phase 2. International operations (Cebu, Crete). AeroCity commercial development.', moat: 'Operates India busiest airport (Delhi: 75M PAX). Non-aero revenue 45%+ (duty-free, F&B, parking, AeroCity). International expertise.' },
}

const geographyData = [
  { state: 'Maharashtra', share: 22, airports: 5, majorPlayers: 'MIAL (Adani), Air India hub, IndiGo hub', reason: 'Mumbai CSIA = India busiest international airport (50M PAX). Pune, Nagpur, Shirdi, Nashik airports. Maximum airline HQs. Navi Mumbai greenfield under construction. MRO clusters in Nagpur SEZ.' },
  { state: 'Delhi NCR', share: 20, airports: 2, majorPlayers: 'GMR (DIAL), IndiGo base, Air India HQ', reason: 'IGI Airport = busiest overall (75M PAX). National carrier hub. Maximum connectivity (all airlines operate here). Jewar/Noida greenfield (opens 2025). UDAN scheme HQ.' },
  { state: 'Karnataka', share: 12, airports: 4, majorPlayers: 'Kempegowda (BIAL), IndiGo/AI hub, HAL', reason: 'Bangalore KIA = 3rd busiest (40M PAX). HAL (Hindustan Aeronautics) HQ and manufacturing. IT city drives business travel. Aerospace cluster (Boeing, Airbus, Safran supplier parks).' },
  { state: 'Tamil Nadu', share: 8, airports: 4, majorPlayers: 'AAI Chennai, IndiGo, Air India Express', reason: 'Chennai = gateway to South India and SE Asia. Domestic + international. MRO facilities at Chennai airport. Air India Express base for Gulf routes.' },
  { state: 'Telangana', share: 8, airports: 1, majorPlayers: 'GMR Hyderabad, Tata Boeing, IndiGo', reason: 'Hyderabad RGIA = India fastest growing (35M PAX). Tata Boeing JV for Apache/Chinook fuselages. Aerospace SEZ. Pharma cold-chain air cargo hub.' },
  { state: 'Gujarat', share: 7, airports: 5, majorPlayers: 'Adani (Ahmedabad), Star Air, IndiGo', reason: 'Ahmedabad = largest in West India after Mumbai. Adani Group HQ state. Vadodara, Rajkot, Surat expanding. High business travel (diamonds, textiles, chemicals).' },
  { state: 'Kerala', share: 5, airports: 4, majorPlayers: 'CIAL Cochin, Adani (Trivandrum), Air India Express', reason: 'Cochin International = world first airport fully powered by solar. Highest Gulf traffic (NRI remittance corridor). Kannur newest airport. Tourism-driven international traffic.' },
  { state: 'West Bengal', share: 5, airports: 2, majorPlayers: 'AAI Kolkata, IndiGo hub, Air India', reason: 'Kolkata NSCBI = gateway to NE India and SE Asia. High Dhaka/Bangkok/Singapore traffic. Regional connectivity hub for 8 NE states.' },
]

// ===== MAIN COMPONENT =====
export default function AviationDashboard() {
  const [activeTab, setActiveTab] = useState<AvTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'
  const tabs: { id: AvTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Industry Overview', icon: Gauge },
    { id: 'business', label: 'Business 101', icon: Info },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
    { id: 'game', label: 'Learn: Process Game', icon: Gamepad2 },
  ]
  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      <DashboardHeader title="Aviation & Aerospace" />
      <nav className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm"><div className="max-w-[1920px] mx-auto px-6"><div className="flex items-center gap-1 py-2 overflow-x-auto">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}><tab.icon size={14} /> {tab.label}</button>))}</div></div></nav>
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'business' && <BusinessModel data={AVIATION_BUSINESS} />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="aviation" />}
        {activeTab === 'game' && <ProcessGame data={AVIATION_GAME} />}
      </main>
      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30"><div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between"><p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p><p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p><p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p></div></footer>
    </div>
  )
}

// ===== OVERVIEW TAB =====
function OverviewTab() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-r from-[#0c4a6e] to-[#0369a1] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><Plane size={20} className="text-sky-200" /><span className="text-[10px] font-semibold text-sky-200 uppercase tracking-wide">India's Aviation Sector</span></div>
          <h2 className="text-2xl font-black">3rd Largest Domestic Aviation Market</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">220M passengers | 157 airports | 850+ aircraft | 1,200+ orders | 62% IndiGo dominance</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={220} />M</div><div className="text-[10px] text-white/70 mt-0.5">Passengers/Year</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">#<AnimatedCounter end={3} /></div><div className="text-[10px] text-white/70 mt-0.5">Global Rank (Domestic)</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={157} /></div><div className="text-[10px] text-white/70 mt-0.5">Airports</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={850} />+</div><div className="text-[10px] text-white/70 mt-0.5">Fleet Size</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={1200} />+</div><div className="text-[10px] text-white/70 mt-0.5">Aircraft on Order</div></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={78} label="Aviation Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Passenger Traffic (Million, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India is 3rd largest domestic market after USA and China</p>
          <ResponsiveContainer width="100%" height={300}><BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="M" /><YAxis dataKey="country" type="category" fontSize={10} width={70} /><Tooltip formatter={(v: number) => `${v}M PAX`} /><Bar dataKey="passengers" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'USA' ? '#B02A30' : '#0c4a6e'} />)}<LabelList dataKey="passengers" position="right" fontSize={9} formatter={(v: number) => `${v}M`} /></Bar></BarChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: IATA, DGCA Annual Report 2024-25</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India Aviation Growth (Passengers M + Fleet)</h3>
          <p className="text-xs text-gray-500 mb-3">COVID dip in 2020, now surpassed pre-COVID levels</p>
          <ResponsiveContainer width="100%" height={300}><LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} /><Tooltip /><Legend /><Line type="monotone" dataKey="pax" name="Passengers (M)" stroke="#0c4a6e" strokeWidth={2.5} dot={{ r: 4 }} /><Line type="monotone" dataKey="fleet" name="Fleet Size" stroke="#f37021" strokeWidth={2} dot={{ r: 4 }} /></LineChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: DGCA, MoCA, CAPA India</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Aviation Segment Split</h3>
        <p className="text-xs text-gray-500 mb-3">Click any segment for details</p>
        <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split(' ')[0]} ${value}%`} labelLine={false} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart></ResponsiveContainer>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p><div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#0c4a6e] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Growth Rate</div><p className="text-xs text-gray-700">15%+ CAGR. India to become 3rd largest aviation market globally by 2030 (from 7th in 2019). 400M+ PAX target.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Order Book</div><p className="text-xs text-gray-700">1,200+ aircraft on order (IndiGo 500+, Air India 470). $100B+ in orders. Fleet to nearly double by 2030.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">ATF Cost</div><p className="text-xs text-gray-700">40% of airline costs. India ATF is 60% costlier than global avg due to taxes. GST inclusion demand pending.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">UDAN Scheme</div><p className="text-xs text-gray-700">Regional connectivity. 519 routes, 76 airports connected. Rs 4,500 cap for 1-hour flights. Target 220 airports by 2030.</p></div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: DGCA, MoCA, IATA, CAPA India, Company Annual Reports</p>
      </div>
    </div>
  )
}

// ===== PLAYERS TAB =====
function PlayersTab() {
  const rows: PlayerRow[] = playersData.map((p) => {
    const d = playerDetails[p.name]
    return {
      rank: p.rank,
      name: p.name,
      revenue: p.revenue,
      type: p.type,
      primary: p.fleet,
      segment: p.type === 'LCC' ? 'Low-Cost Carrier' : p.type === 'FSC' ? 'Full-Service Carrier' : p.type,
      hq: d?.hq,
      founded: d?.founded,
      target: d?.expansion,
      highlight: d?.moat,
      extra: [
        { label: 'Domestic Share', value: String(p.share) },
        { label: 'Routes', value: String(p.routes) },
      ],
    }
  })
  return (
    <PlayersBoard
      players={rows}
      config={{
        industryLabel: 'Aviation',
        primaryLabel: 'Fleet Size',
        primaryUnit: ' aircraft',
        donutTitle: 'LCC vs FSC Split',
      }}
    />
  )
}

function PlayersTabLegacy() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const selected = selectedPlayer ? playerDetails[selectedPlayer] : null
  return (
    <div className="space-y-6">
      {selectedPlayer && selected && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3><button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div></div><div className="space-y-3"><div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Network</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div><div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div><div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top Aviation Companies</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for detailed profile</p>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Fleet</th><th className="text-center py-2 px-2 font-bold text-navy">Market Share</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (Cr)</th><th className="text-center py-2 px-2 font-bold text-navy">Type</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-sky-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right font-bold">{p.fleet || '-'}</td><td className="py-2.5 px-2 text-center font-semibold text-orange-600">{p.share}</td><td className="py-2.5 px-2 text-right">Rs {p.revenue.toLocaleString()}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-semibold">{p.type}</span></td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View</span></td></tr>))}</tbody></table></div>
      </div>
    </div>
  )
}

// ===== RISK TAB =====
function RiskTab() {
  return <AviationRiskAnalysis />
}

function RiskTabLegacy() {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'bestpractices'>('insurable')
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const caseStudies = [
    { title: 'Air India Express Flight IX-1344 Crash (Aug 2020)', plant: 'Kozhikode Airport, Kerala', loss: '18 fatalities + Rs 500 Cr (aircraft + liability)', cause: 'Tabletop runway. Aircraft overshot in heavy rain, fell into gorge. Pilot error + runway conditions.', lesson: 'Tabletop runways need EMAS (Engineered Material Arresting System). Enhanced pilot training for challenging airports.', claimType: 'Hull Loss + Passenger Liability', date: 'Aug 2020', segment: 'Flight Operations', detail: 'Air India Express Boeing 737-800 (VT-AXH) on Dubai-Kozhikode route attempted landing in heavy rain with tailwind. Aircraft touched down late, overran the tabletop runway, fell 35 feet into a gorge, and broke in two. 18 of 190 passengers killed including both pilots. AAIB investigation found: (1) Unstabilized approach, (2) Captain did not go around despite warnings, (3) Tailwind exceeded limits. Aircraft was total hull loss (insured value ~$50M). Passenger liability claims from 18 families + 150 injured. Kozhikode is a tabletop runway with no EMAS installed.', insuranceNote: 'Hull All Risks policy covered $50M aircraft loss. Aviation Liability (passenger) under Warsaw/Montreal Convention. Third-party liability for airport damage. Key: airlines need specific coverage for challenging airports. EMAS installation is risk improvement recommendation for all tabletop runways.' },
    { title: 'SpiceJet Financial Crisis & Fleet Grounding (2022)', plant: 'SpiceJet Ltd, Pan-India', loss: 'Rs 3,000 Cr cumulative losses + 50% fleet grounded', cause: 'Chronic losses since 2019, unpaid lessors, DGCA safety concerns after 8 incidents in 18 days, engine lease non-payment.', lesson: 'Airline financial health directly correlates with safety. DGCA now mandates financial audit before route allocation.', claimType: 'Credit/Lease Default + D&O', date: '2022-2023', segment: 'Financial Distress', detail: 'SpiceJet accumulated Rs 3,000 Cr+ losses over 3 years. Unable to pay engine lessors (Pratt & Whitney demanded Rs 250 Cr overdue). Aircraft groundings reached 50% of fleet (30 of 60 aircraft). In July 2022, DGCA flagged 8 safety incidents in 18 days (including smoke in cabin, cracked windshield, tire burst). DGCA ordered 50% capacity reduction. Lessor NAC moved to deregister 3 aircraft. Company survived through promoter infusion + Ajay Singh personal guarantee + partial repayments.', insuranceNote: 'Aircraft hull/liability policies may have been at risk of cancellation due to non-payment. D&O claims from shareholders. Credit insurance for lessors. Key lesson: airline insolvency creates cascading insurance failures - hull policy voidance, pilot license validity concerns, airport slot loss.' },
    { title: 'IndiGo Engine Crisis - P&W GTF Issues (2023-24)', plant: 'IndiGo (InterGlobe Aviation), Pan-India', loss: 'Rs 2,000+ Cr (grounded fleet BI + engine lease costs)', cause: 'Pratt & Whitney GTF engines (powering A320neo) had premature wear in turbine blades (powder metallurgy defect). Global recall of 1,200 engines.', lesson: 'Single engine-type dependency is existential risk. MLOP/BI coverage for manufacturer-driven groundings is critical.', claimType: 'MLOP + Product Liability (OEM)', date: '2023-2024', segment: 'Fleet Technical', detail: 'Pratt & Whitney GTF engines on IndiGo A320neo fleet developed premature turbine blade wear (powder metallurgy contamination issue). At peak, 70+ IndiGo aircraft (of 350) were grounded awaiting engine shop visits. P&W mandated accelerated inspections globally affecting 1,200 engines. IndiGo lost Rs 400 Cr/quarter in revenue from grounded capacity. Forced to wet-lease aircraft from Turkey and Greece to maintain schedule. CEO publicly blamed P&W. DGCA imposed enhanced monitoring. Issue extended into 2024 with no full resolution. IndiGo diversified engine choice for future orders (CFM LEAP on A321XLR).', insuranceNote: 'MLOP policy should cover manufacturer-mandated groundings (not just breakdown). Product Liability claim against P&W for defective engines. Aircraft grounding costs (parking, lease payments for non-flying aircraft). Key: airlines need specific "manufacturer defect grounding" extension in hull/BI policies.' },
  ]
  const riskSubTabs = [{ id: 'insurable' as const, label: 'Insurable Risks' }, { id: 'bestpractices' as const, label: 'Case Studies & Best Practices' }]
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center gap-3"><Shield size={20} className="text-maroon" /><div><h3 className="text-sm font-bold text-navy">Aviation Risk Management</h3><p className="text-xs text-gray-500">Airlines | Airports | MRO | Cargo | General Aviation</p></div></div></div>
      <div className="flex gap-2">{riskSubTabs.map((tab) => (<button key={tab.id} onClick={() => setRiskSubTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${riskSubTab === tab.id ? 'bg-maroon text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{tab.label}</button>))}</div>
      {riskSubTab === 'insurable' && (<div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[{ name: 'Hull Loss / Damage', probability: 'Low', impact: 'Catastrophic', emv: 'Rs 500-3000 Cr', mitigation: 'EGPWS, TCAS, enhanced pilot training, runway safety improvements (EMAS)' },{ name: 'Passenger Liability', probability: 'Low', impact: 'Very High', emv: 'Rs 100-2000 Cr', mitigation: 'Safety management systems (SMS), crew training, cabin safety equipment, emergency response plans' },{ name: 'Third Party Liability', probability: 'Low', impact: 'Catastrophic', emv: 'Rs 200-5000 Cr', mitigation: 'Noise abatement, bird strike management, approach path safety zones, fuel jettison procedures' },{ name: 'War & Terrorism', probability: 'Low', impact: 'Catastrophic', emv: 'Rs 500-10000 Cr', mitigation: 'Security screening, sky marshals, anti-missile systems (for conflict zones), route avoidance' },{ name: 'Airport Property Damage', probability: 'Medium', impact: 'High', emv: 'Rs 50-1000 Cr', mitigation: 'Fire fighting category maintenance, terminal structural inspections, runway FOD prevention' },{ name: 'Cyber Attack (Navigation/ATC)', probability: 'Medium', impact: 'Very High', emv: 'Rs 100-2000 Cr', mitigation: 'Isolated ATC systems, encrypted datalinks, backup communication, GPS spoofing detection' }].map((r, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition"><h5 className="font-bold text-navy text-sm mb-2">{r.name}</h5><div className="flex gap-2 mb-2"><span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-red-100 text-red-700">P: {r.probability}</span><span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-red-100 text-red-700">I: {r.impact}</span></div><p className="text-xs font-bold text-maroon mb-1">{r.emv}</p><p className="text-[10px] text-gray-500 italic">{r.mitigation}</p></div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-navy mb-1 flex items-center gap-2"><Shield size={16} className="text-maroon" /> Aviation Insurance Products</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h5 className="text-xs font-bold text-navy mb-3">Core Aviation Covers</h5><ul className="space-y-1.5">{['Hull All Risks (aircraft physical damage)', 'Hull War & Allied Perils', 'Airline Passenger Liability (Warsaw/Montreal)', 'Third Party Liability (ground damage)', 'Aviation Product Liability (OEM)', 'Loss of License (pilot disability)', 'Airport Operators Liability', 'Hangar Keepers Liability'].map((item, i) => (<li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>))}</ul></div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h5 className="text-xs font-bold text-navy mb-3">Specialty & Add-ons</h5><ul className="space-y-1.5">{['Grounding cover (manufacturer-mandated)', 'Loss of Use / Aircraft on Ground (AOG)', 'Spare engines & rotables cover', 'Ferry flight risk', 'Wet lease / ACMI liability', 'Passenger baggage & cargo liability', 'MRO facility liability', 'Drone / UAV operator liability'].map((item, i) => (<li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>))}</ul></div>
          </div>
        </div>
      </div>)}
      {riskSubTab === 'bestpractices' && (<div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-navy mb-2 flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> Case Studies — Aviation Losses (India)</h4>
          <p className="text-xs text-gray-500 mb-4">Click any case study for full analysis</p>
          <div className="space-y-3">{caseStudies.map((cs, i) => (<div key={i} onClick={() => setSelectedCase(i)} className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-maroon/30 transition cursor-pointer bg-white"><div className="flex items-center justify-between mb-2"><h5 className="font-bold text-navy text-sm">{cs.title}</h5><span className="text-[10px] px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold">{cs.claimType}</span></div><div className="flex items-center gap-4 text-[10px] text-gray-500"><span><strong>Location:</strong> {cs.plant}</span><span><strong>Loss:</strong> <span className="text-red-600 font-bold">{cs.loss}</span></span></div><div className="mt-2 flex items-center gap-2"><span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold">{cs.segment}</span><span className="text-[9px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{cs.date}</span><span className="text-[9px] text-maroon font-bold ml-auto">View Details →</span></div></div>))}</div>
        </div>
        {selectedCase !== null && caseStudies[selectedCase] && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><div><h3 className="text-lg font-bold text-navy">{caseStudies[selectedCase].title}</h3><div className="flex items-center gap-2 mt-1"><span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-bold">{caseStudies[selectedCase].claimType}</span><span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold">{caseStudies[selectedCase].segment}</span></div></div><button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-3 bg-gray-50 rounded-xl"><span className="text-[9px] font-bold text-gray-500 uppercase block mb-1">Location</span><span className="text-sm font-semibold text-navy">{caseStudies[selectedCase].plant}</span></div><div className="p-3 bg-red-50 rounded-xl"><span className="text-[9px] font-bold text-red-600 uppercase block mb-1">Loss</span><span className="text-sm font-bold text-red-700">{caseStudies[selectedCase].loss}</span></div></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><span className="text-[10px] font-bold text-navy uppercase block mb-2">Detailed Analysis</span><p className="text-sm text-gray-700 leading-relaxed">{caseStudies[selectedCase].detail}</p></div><div className="p-4 bg-green-50 rounded-xl mb-4"><span className="text-[10px] font-bold text-green-700 uppercase block mb-2">Key Learnings</span><p className="text-sm text-green-800">{caseStudies[selectedCase].lesson}</p></div><div className="p-4 bg-amber-50 rounded-xl"><span className="text-[10px] font-bold text-amber-700 uppercase block mb-2">Insurance Implications</span><p className="text-sm text-amber-800">{caseStudies[selectedCase].insuranceNote}</p></div></div></div>)}
      </div>)}
    </div>
  )
}

// ===== GEOGRAPHY TAB =====
function GeographyTab() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const selectedInfo = geographyData.find(s => s.state === selectedState)
  return (
    <div className="space-y-6">
      {selectedState && selectedInfo && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Why {selectedState} is an Aviation Hub</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><div className="grid grid-cols-2 gap-3 text-center"><div><div className="text-lg font-bold text-maroon">{selectedInfo.share}%</div><div className="text-[10px] text-gray-500">Traffic Share</div></div><div><div className="text-lg font-bold text-navy">{selectedInfo.airports}</div><div className="text-[10px] text-gray-500">Airports</div></div></div><p className="text-xs text-gray-600 mt-3"><strong>Players:</strong> {selectedInfo.majorPlayers}</p></div><p className="text-sm text-gray-700 leading-relaxed">{selectedInfo.reason}</p></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Aviation Traffic by State (%)</h3>
        <p className="text-xs text-gray-500 mb-4">Click any bar for state-level insights</p>
        <ResponsiveContainer width="100%" height={350}><BarChart data={geographyData} layout="vertical" onClick={(data: any) => { if (data?.activePayload) setSelectedState(data.activePayload[0]?.payload?.state) }}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="%" /><YAxis dataKey="state" type="category" fontSize={10} width={100} /><Tooltip formatter={(v: number) => `${v}%`} /><Bar dataKey="share" radius={[0, 4, 4, 0]} cursor="pointer">{geographyData.map((_, i) => <Cell key={i} fill={i < 2 ? '#f37021' : i < 4 ? '#0c4a6e' : '#94a3b8'} />)}<LabelList dataKey="share" position="right" fontSize={9} formatter={(v: number) => `${v}%`} /></Bar></BarChart></ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h3 className="text-sm font-bold text-navy mb-3">India's Aviation Corridors</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="p-4 bg-sky-50 rounded-xl border border-sky-200"><h4 className="text-xs font-bold text-sky-800 mb-1">Metro Triangle (65% traffic)</h4><p className="text-[10px] text-sky-700">Delhi-Mumbai-Bangalore accounts for 65% of air traffic. Each handles 40M+ PAX. Connected by 100+ daily flights. Corporate travel dominated.</p></div><div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><h4 className="text-xs font-bold text-blue-800 mb-1">Tier-2 Growth (25% traffic)</h4><p className="text-[10px] text-blue-700">Hyderabad, Chennai, Kolkata, Pune, Ahmedabad. Fastest growing 20%+ CAGR. New airports under construction. IndiGo expanding heavily.</p></div><div className="p-4 bg-green-50 rounded-xl border border-green-200"><h4 className="text-xs font-bold text-green-800 mb-1">UDAN Regional (10% traffic)</h4><p className="text-[10px] text-green-700">519 routes, 76 airports connected. Hubli, Shimla, Jharsuguda, Kishangarh. Small aircraft (ATR, Dash-8). Government subsidy driven.</p></div></div></div>
    </div>
  )
}

// ===== NEWS DATA =====
const newsData = [
  { title: 'IndiGo Orders Additional A350 Wide-body Aircraft for International Expansion', source: 'Airbus Press Release', date: '2026-08-12', summary: 'The wide-body order marks IndiGo\'s push into long-haul international markets. Routes to Europe, North America, and Australia are planned. The deal signals a strategic shift beyond the carrier\'s narrow-body core.', sentiment: 'Positive' },
  { title: 'Navi Mumbai Airport Ramps Up Operations as Mumbai\'s Second Hub', source: 'Ministry of Civil Aviation', date: '2026-07-21', summary: 'Phase 1 adds substantial passenger capacity to relieve congestion at the existing airport. The Adani-operated hub features a full cargo terminal. Metro connectivity is being developed to improve access.', sentiment: 'Positive' },
  { title: 'Air India Completes Vistara Merger — Single Full-Service Carrier', source: 'Economic Times', date: '2026-06-16', summary: 'Vistara has been folded into Air India to create a larger full-service airline. The combined fleet exceeds 200 aircraft. Singapore Airlines retains a strategic stake in the enlarged entity.', sentiment: 'Positive' },
  { title: 'DGCA Grounds SpiceJet Aircraft Over Safety Concerns', source: 'DGCA Order', date: '2026-05-28', summary: 'The regulator cited maintenance non-compliance and overdue airworthiness directives. The grounding has reduced the carrier\'s operational fleet. SpiceJet faces added pressure on capacity and finances.', sentiment: 'Negative' },
  { title: 'ATF Prices Climb — Airlines Warn of Fare Hikes', source: 'Reuters', date: '2026-04-18', summary: 'Jet fuel prices rose to multi-month highs, squeezing airline margins. Carriers renewed demands to bring ATF under GST. Fare increases are likely if the trend persists.', sentiment: 'Negative' },
  { title: 'India MRO Market on Track to Reach $5B by 2030', source: 'MoCA Report', date: '2026-03-24', summary: 'A reduced GST rate on MRO services is boosting domestic maintenance activity. Air India is developing a major MRO hub in Delhi. The push aims to repair a far larger share of the fleet within India.', sentiment: 'Positive' },
  { title: 'Akasa Air Scales Fleet Rapidly — Among Fastest-Growing Indian Airlines', source: 'Akasa Press Release', date: '2026-03-05', summary: 'The airline continues to expand its fleet and route network at pace. It is steadily gaining domestic market share. A large Boeing 737 MAX order underpins future growth.', sentiment: 'Positive' },
  { title: 'Drone Policy 2.0 — BVLOS Operations Approved for Multiple Sectors', source: 'MoCA / DGCA', date: '2026-02-14', summary: 'Beyond Visual Line of Sight flights are now permitted for agriculture, mining, delivery, and surveys. A PLI scheme is supporting domestic drone manufacturing. Thousands of drone pilots have been certified.', sentiment: 'Positive' },
]

// ===== NEWS TAB =====
function NewsTab() {
  return <NewsFeed title="Aviation Industry News & Developments" items={newsData} />
}
