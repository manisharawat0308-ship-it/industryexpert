import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, Wrench, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LabelList
} from 'recharts'
import PlayersBoard, { PlayerRow } from '../components/PlayersBoard'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { AUTO_ANCILLARY_GAME } from '../components/process-game/data/autoAncillaryGame'
import BusinessModel from '../components/BusinessModel'
import { AUTO_ANCILLARY_BUSINESS } from '../data/businessModels/autoAncillaryBusiness'
import NewsFeed from '../components/NewsFeed'
import AnimatedCounter from '../components/AnimatedCounter'
import LiveTicker from '../components/LiveTicker'
import HealthGauge from '../components/HealthGauge'
import AutoAncillaryRiskAnalysis from '../components/risk-analysis/AutoAncillaryRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'

const COLORS = ['#0369a1', '#B02A30', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#00BCD4', '#795548']

type AncTab = 'overview' | 'business' | 'production' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot' | 'game'

// ===== OVERVIEW DATA =====
const segmentData = [
  { name: 'Engine Parts', value: 25, color: '#0369a1' },
  { name: 'Drive Transmission & Steering', value: 19, color: '#B02A30' },
  { name: 'Electrical & Electronics', value: 18, color: '#F99D27' },
  { name: 'Suspension & Braking', value: 13, color: '#4CAF50' },
  { name: 'Body & Chassis', value: 11, color: '#9C27B0' },
  { name: 'Interiors & Seating', value: 8, color: '#FF5722' },
  { name: 'Others (Rubber, Casting)', value: 6, color: '#795548' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Engine Parts': { subtypes: [{ name: 'Pistons & Rings', share: '22%' }, { name: 'Crankshafts & Camshafts', share: '18%' }, { name: 'Fuel Injection Systems', share: '25%' }, { name: 'Turbochargers', share: '15%' }, { name: 'Gaskets & Seals', share: '12%' }, { name: 'Valves & Guides', share: '8%' }], desc: 'Largest segment. Shifting from pure ICE to hybrid/EV thermal management. Bosch, Ucal, Shriram Pistons lead.' },
  'Drive Transmission & Steering': { subtypes: [{ name: 'Gearbox Components', share: '30%' }, { name: 'Axles & Differentials', share: '25%' }, { name: 'Steering Systems (EPS)', share: '22%' }, { name: 'Propeller Shafts', share: '13%' }, { name: 'CV Joints', share: '10%' }], desc: 'EPS (Electric Power Steering) growing 25% CAGR replacing hydraulic. Sona BLW, Rane, Minda lead.' },
  'Electrical & Electronics': { subtypes: [{ name: 'Wiring Harness', share: '28%' }, { name: 'Sensors & Actuators', share: '20%' }, { name: 'Lighting (LED/Adaptive)', share: '18%' }, { name: 'ECU/BCM', share: '15%' }, { name: 'Connectors & Switches', share: '12%' }, { name: 'Infotainment', share: '7%' }], desc: 'Fastest growing — vehicle electronics content rising from $200 to $800/car. Motherson, Minda lead.' },
  'Suspension & Braking': { subtypes: [{ name: 'Disc Brakes & Pads', share: '30%' }, { name: 'ABS Systems', share: '25%' }, { name: 'Shock Absorbers', share: '22%' }, { name: 'Springs (Leaf/Coil)', share: '15%' }, { name: 'Wheel Bearings', share: '8%' }], desc: 'ABS mandatory since 2019 drove 40% growth. Brakes India, Endurance, Gabriel lead.' },
  'Body & Chassis': { subtypes: [{ name: 'Stampings & Pressings', share: '35%' }, { name: 'Bumpers & Fascia', share: '20%' }, { name: 'Doors & Closures', share: '18%' }, { name: 'Fuel Tanks', share: '12%' }, { name: 'Exhaust Systems', share: '15%' }], desc: 'Lightweighting trend — aluminum & composites replacing steel. JBM Auto, Tata AutoComp lead.' },
  'Interiors & Seating': { subtypes: [{ name: 'Seating Systems', share: '35%' }, { name: 'Dashboard/IP', share: '25%' }, { name: 'Door Trims', share: '18%' }, { name: 'Headliner', share: '12%' }, { name: 'Airbag Systems', share: '10%' }], desc: 'Premiumisation driving content per vehicle. 6 airbags mandatory from Oct 2023. Krishna Maruti, Lear, Faurecia.' },
  'Others (Rubber, Casting)': { subtypes: [{ name: 'Rubber Hoses & Belts', share: '40%' }, { name: 'Aluminum Die Casting', share: '35%' }, { name: 'Forging (hot/cold)', share: '25%' }], desc: 'EV shift increasing aluminum casting demand (battery housings). Endurance, Craftsman Auto, Sundaram Clayton.' },
}

const customerSplit = [
  { name: 'OEM Domestic', value: 52, color: '#0369a1' },
  { name: 'Aftermarket/Replacement', value: 24, color: '#F99D27' },
  { name: 'Exports', value: 24, color: '#4CAF50' },
]

const customerDetails: Record<string, string> = {
  'OEM Domestic': 'Supply to Indian OEMs (Maruti, Tata, Hyundai, M&M). JIT delivery, quality audit (IATF 16949). Price pressure from OEMs is intense — 3-5% annual cost reduction expected.',
  'Aftermarket/Replacement': 'Spare parts market — higher margin (15-20%) vs OEM (8-10%). Brand building critical. Counterfeit risk. Bosch, Minda, Valeo aftermarket divisions.',
  'Exports': '$21.2B in FY25. USA (27%), Europe (30%), Asia (25%). Tier-1 global suppliers (Bosch, Continental, ZF) source from Indian units. PLI scheme boosting export-oriented investment.',
}

const timelineData = [
  { year: '1960', event: 'Component industry born (Maruti JV era)', type: 'history', value: 10 },
  { year: '1991', event: 'Liberalization — global Tier-1s enter India', type: 'history', value: 20 },
  { year: '2000', event: 'India becomes export hub ($1B exports)', type: 'history', value: 35 },
  { year: '2010', event: 'Industry crosses $30B turnover', type: 'history', value: 50 },
  { year: '2015', event: 'BS-IV + safety norms drive upgrades', type: 'history', value: 58 },
  { year: '2020', event: 'COVID + EV shift — industry pivots', type: 'history', value: 55 },
  { year: '2023', event: '$70B+ turnover, PLI approvals', type: 'history', value: 72 },
  { year: '2025', event: '$74B revenue, $21B exports (record)', type: 'history', value: 80 },
  { year: '2027', event: '$100B target (ACMA Vision)', type: 'future', value: 88 },
  { year: '2030', event: '$130B+ industry, 40% EV content', type: 'future', value: 95 },
]

const perCapitaData = [
  { country: 'Japan', value: 680 },
  { country: 'Germany', value: 620 },
  { country: 'USA', value: 550 },
  { country: 'South Korea', value: 480 },
  { country: 'China', value: 380 },
  { country: 'India', value: 120 },
  { country: 'Global Avg', value: 300 },
]

// ===== PRODUCTION DATA =====
const globalComparison = [
  { country: 'China', value: 420 },
  { country: 'Japan', value: 180 },
  { country: 'Germany', value: 150 },
  { country: 'USA', value: 130 },
  { country: 'South Korea', value: 90 },
  { country: 'India', value: 74 },
  { country: 'Mexico', value: 60 },
  { country: 'Thailand', value: 35 },
  { country: 'Brazil', value: 28 },
  { country: 'Indonesia', value: 18 },
]

const supplyDemandData = [
  { year: 'FY20', production: 55.0, domestic: 39.0, exports: 14.5, imports: 4.5 },
  { year: 'FY21', production: 45.0, domestic: 31.0, exports: 11.8, imports: 3.8 },
  { year: 'FY22', production: 57.0, domestic: 40.0, exports: 15.2, imports: 4.8 },
  { year: 'FY23', production: 65.0, domestic: 44.5, exports: 18.0, imports: 5.2 },
  { year: 'FY24', production: 70.0, domestic: 48.0, exports: 19.8, imports: 5.5 },
  { year: 'FY25', production: 74.0, domestic: 50.5, exports: 21.2, imports: 5.8 },
]

const exportDetails = [
  { country: 'Europe', value: '$6.4B', share: '30%', products: 'Forging, Casting, Engine parts, EV components' },
  { country: 'USA/Canada', value: '$5.7B', share: '27%', products: 'Brake systems, Axles, Wiring harness, Stampings' },
  { country: 'Asia (ex-India)', value: '$5.3B', share: '25%', products: 'Gears, Bearings, Rubber parts, Electronics' },
  { country: 'Africa', value: '$1.5B', share: '7%', products: 'Replacement parts, Filters, Brake linings' },
  { country: 'Middle East', value: '$1.3B', share: '6%', products: 'Suspension, Cooling systems, Filters' },
  { country: 'Latin America', value: '$1.0B', share: '5%', products: 'Transmission parts, Clutch, Springs' },
]

const importDetails = [
  { country: 'China', value: '$1.8B', share: '31%', products: 'Electronics, Sensors, EV battery parts, Magnets' },
  { country: 'Japan', value: '$1.2B', share: '21%', products: 'Precision bearings, CVT components, ECU chips' },
  { country: 'Germany', value: '$0.9B', share: '16%', products: 'ABS systems, Fuel injection, Turbochargers' },
  { country: 'South Korea', value: '$0.7B', share: '12%', products: 'Display panels, Battery cells, Semiconductors' },
  { country: 'USA', value: '$0.5B', share: '8%', products: 'Airbag inflators, Special alloys, Testing equipment' },
  { country: 'Others', value: '$0.7B', share: '12%', products: 'Raw materials, Specialty chemicals, Tooling' },
]

const capacityPipeline = [
  { company: 'Motherson Group', location: 'Multiple (India + Global)', capacity: '₹25,000 Cr capex', year: 'FY25-27', focus: 'Wiring, Modules, EV components' },
  { company: 'Sona BLW', location: 'Manesar + Europe', capacity: '₹2,000 Cr', year: 'FY26', focus: 'EV traction motors, Differential gears' },
  { company: 'Uno Minda', location: 'Rajasthan, Gujarat', capacity: '₹3,500 Cr', year: 'FY25-27', focus: 'LED lighting, Sensors, EV chargers, Alloy wheels' },
  { company: 'Bosch India', location: 'Bangalore, Nashik', capacity: '₹2,500 Cr', year: 'FY26', focus: 'EV powertrains, Hydrogen tech, ADAS sensors' },
  { company: 'Endurance Tech', location: 'Aurangabad, Pune', capacity: '₹1,800 Cr', year: 'FY26', focus: 'Aluminum die casting for EV, Disc brakes, ABS' },
  { company: 'Samvardhana Motherson (SAMIL)', location: 'Pune, Chennai', capacity: '₹4,000 Cr', year: 'FY26-28', focus: 'Cockpit modules, Bumper assemblies, EV thermal' },
  { company: 'Sundaram-Clayton', location: 'Chennai', capacity: '₹1,200 Cr', year: 'FY27', focus: 'Aluminum castings for EV motor housings' },
  { company: 'ZF India', location: 'Pune, Chennai', capacity: '₹1,500 Cr', year: 'FY26', focus: 'EV drives, Active safety, Chassis systems' },
]

// ===== PLAYERS DATA =====
const playersData = [
  { rank: 1, name: 'Motherson Group', revenue: 92000, exports: 45, segment: 'Wiring, Modules, Mirrors', employees: 180000 },
  { rank: 2, name: 'Bosch India', revenue: 18000, exports: 15, segment: 'Fuel Systems, Brakes, Electronics', employees: 30000 },
  { rank: 3, name: 'Uno Minda', revenue: 14500, exports: 12, segment: 'Lighting, Switches, Horns, Sensors', employees: 35000 },
  { rank: 4, name: 'Bharat Forge', revenue: 14000, exports: 55, segment: 'Forging, Crankshaft, Defense', employees: 12000 },
  { rank: 5, name: 'Sona BLW', revenue: 3200, exports: 70, segment: 'EV Motors, Differential Gears', employees: 6000 },
  { rank: 6, name: 'Endurance Tech', revenue: 10500, exports: 18, segment: 'Casting, Brakes, Suspension', employees: 22000 },
  { rank: 7, name: 'Sundram Fasteners', revenue: 6500, exports: 25, segment: 'Fasteners, Radiator caps, Powder metal', employees: 5000 },
  { rank: 8, name: 'Rane Group', revenue: 5500, exports: 20, segment: 'Steering, Valves, Friction', employees: 10000 },
  { rank: 9, name: 'JBM Auto', revenue: 4800, exports: 10, segment: 'Pressings, EV buses, Tooling', employees: 25000 },
  { rank: 10, name: 'Craftsman Automation', revenue: 3500, exports: 15, segment: 'Cylinder blocks, Machining, Gears', employees: 5500 },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'Motherson Group': { hq: 'Noida', ceo: 'Vivek Chaand Sehgal', founded: '1975', type: 'Private (Promoter 60%)', plants: '450+ facilities in 41 countries', expansion: 'Vision 2025: Revenue $36B → $45B. Acquiring Tier-1s globally. EV thermal mgmt + cockpit modules focus.', moat: 'World\'s largest wiring harness maker. Truly global — 180K employees. Deep OEM relationships across ALL global OEMs.' },
  'Bosch India': { hq: 'Bangalore', ceo: 'Guruprasad Mudlapur', founded: '1951', type: 'FDI (Robert Bosch 70.5%)', plants: 'Bangalore, Nashik, Jaipur, Chennai', expansion: 'Pivot to EV — powertrains, H2 tech, ADAS. ₹2,500 Cr investment in connected mobility + AI.', moat: 'Technology leader — FI systems, ABS, ESC, Diesel. R&D depth. Brand = premium quality.' },
  'Uno Minda': { hq: 'Gurugram', ceo: 'Nirmal K Minda', founded: '1958', type: 'Private (Promoter 70%)', plants: '72 plants across India + Europe + Indonesia', expansion: '₹3,500 Cr capex — LED lighting, Sensors, ADAS cameras, EV chargers, Alloy wheels. Target ₹20K Cr by FY27.', moat: 'Full electrical ecosystem — switches to sensors to lighting. Only Indian Tier-1 doing ADAS cameras in-house.' },
  'Bharat Forge': { hq: 'Pune', ceo: 'Baba Kalyani', founded: '1961', type: 'Private (Kalyani Group)', plants: 'Pune, Baramati, Germany, USA', expansion: 'Defense + EV components. Kalyani Strategic Defense. Aluminum forging for lightweight EVs.', moat: 'World\'s 2nd largest forging company. Automotive + Defense + Industrial diversification. Technology champion.' },
  'Sona BLW': { hq: 'Gurugram', ceo: 'Vivek Vikram Singh', founded: '1995 (restructured)', type: 'Private (PE-backed)', plants: 'Manesar, Chennai, China, USA, Mexico, Hungary', expansion: '90%+ revenue from EV-ready products by FY26. Motor supply to global EV OEMs (BYD, NIO, BMW).', moat: 'Pure-play EV beneficiary — traction motors + differential gears. 77% revenue from overseas. Highest margin in sector (27% EBITDA).' },
  'Endurance Tech': { hq: 'Aurangabad', ceo: 'Anurang Jain', founded: '1985', type: 'Private', plants: 'Aurangabad, Pune, Waluj, Manesar, Italy, Germany', expansion: 'ABS systems (Tier-1 in India), EV casting for motor housings. Europe acquisition for disc brakes.', moat: 'Only Indian company doing Tier-1 ABS in-house. Aluminum die-casting leader. Bajaj/RE key client.' },
}

const radarData = [
  { metric: 'Revenue', Motherson: 95, Bosch: 45, Minda: 35, BharatForge: 35 },
  { metric: 'Export %', Motherson: 80, Bosch: 30, Minda: 25, BharatForge: 90 },
  { metric: 'EV Readiness', Motherson: 70, Bosch: 85, Minda: 75, BharatForge: 50 },
  { metric: 'R&D Spend', Motherson: 60, Bosch: 95, Minda: 50, BharatForge: 55 },
  { metric: 'Global Presence', Motherson: 95, Bosch: 90, Minda: 40, BharatForge: 70 },
  { metric: 'Margin', Motherson: 40, Bosch: 60, Minda: 55, BharatForge: 65 },
]

const marketShareTrend = [
  { company: 'Motherson Group', fy23: 22.0, fy25: 24.5, change: +2.5 },
  { company: 'Bosch India', fy23: 5.8, fy25: 5.2, change: -0.6 },
  { company: 'Uno Minda', fy23: 3.5, fy25: 4.2, change: +0.7 },
  { company: 'Bharat Forge', fy23: 3.8, fy25: 3.9, change: +0.1 },
  { company: 'Sona BLW', fy23: 0.8, fy25: 1.2, change: +0.4 },
  { company: 'Others (700+)', fy23: 64.1, fy25: 61.0, change: -3.1 },
]

// ===== GEOGRAPHY DATA =====
const geographyData = [
  { state: 'Maharashtra', capacity: 18, share: 24, majorPlayers: 'Bharat Forge, Endurance, ZF, Bosch, Faurecia, Valeo', reason: 'Pune = India\'s auto component capital. Chakan/Ranjangaon MIDC cluster. Proximity to Tata, M&M OEMs. Forging/casting expertise since 1960s. IIT/NIT talent pipeline.' },
  { state: 'Tamil Nadu', capacity: 15, share: 20, majorPlayers: 'Sundram Fasteners, TVS Group, Rane, Brakes India, Delphi, Denso', reason: 'Chennai-Sriperumbudur-Oragadam auto corridor. Proximity to Hyundai, Renault-Nissan, BMW, Daimler. Tirupur-Coimbatore pump/motor cluster. Export via Chennai port.' },
  { state: 'Haryana', capacity: 12, share: 16, majorPlayers: 'Motherson, Sona BLW, Minda, Rico Auto, Shriram Pistons', reason: 'Gurugram-Manesar-Bawal IMT belt. Proximity to Maruti (India\'s largest OEM). NCR skilled workforce. Japanese supplier ecosystem (Denso, Aisin).' },
  { state: 'Karnataka', capacity: 8, share: 11, majorPlayers: 'Bosch, Continental, Toyota Boshoku, Toyoda Gosei', reason: 'Bangalore R&D hub — all global Tier-1s have tech centers. Peenya/Hoskote industrial belt. IT + embedded software talent for ADAS/connected car development.' },
  { state: 'Gujarat', capacity: 7, share: 9, majorPlayers: 'Tata AutoComp, Endurance, Varroc, Hi-Tech Gears', reason: 'Sanand-Halol auto corridor. Proximity to Tata/Suzuki Gujarat plants. Mundra port for exports. Lower land/labor cost. DMIC investment.' },
  { state: 'Rajasthan', capacity: 5, share: 7, majorPlayers: 'Uno Minda, Subros, Honda parts vendors', reason: 'Neemrana Japanese Industrial Zone. Proximity to Maruti Kharkhoda/Manesar. Lower wage costs. RIICO incentives. Clean manufacturing zones.' },
  { state: 'Uttarakhand', capacity: 4, share: 5, majorPlayers: 'Motherson, Rico Auto, Endurance, Gabriel', reason: 'Pantnagar SIDCUL — erstwhile excise exemption attracted investment. Access to North India OEMs. Lower regulatory burden.' },
  { state: 'Andhra Pradesh / Telangana', capacity: 4, share: 5, majorPlayers: 'Bharat Forge (Zaheerabad), Kia vendors, Isuzu suppliers', reason: 'Emerging hub — Kia Anantapur ecosystem. Hyderabad R&D talent. T-Hub innovation cluster for EV startups. Government incentives.' },
]

// ===== MAIN COMPONENT =====
export default function AutoAncillaryDashboard() {
  const [activeTab, setActiveTab] = useState<AncTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tabs: { id: AncTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'business', label: 'Business 101', icon: Info },
    { id: 'production', label: 'Production', icon: Factory },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
    { id: 'game', label: 'Learn: Process Game', icon: Gamepad2 },
  ]

  const tickerItems = [
    { label: 'Motherson Sumi', value: '₹168', change: '+2.4%', direction: 'up' as const },
    { label: 'Bosch India', value: '₹32,500', change: '+0.8%', direction: 'up' as const },
    { label: 'Uno Minda', value: '₹1,050', change: '+1.6%', direction: 'up' as const },
    { label: 'Bharat Forge', value: '₹1,380', change: '-0.4%', direction: 'down' as const },
    { label: 'Sona BLW', value: '₹680', change: '+3.1%', direction: 'up' as const },
    { label: 'Endurance Tech', value: '₹2,250', change: '+1.2%', direction: 'up' as const },
    { label: 'Sundram Fasteners', value: '₹1,180', change: '+0.5%', direction: 'up' as const },
    { label: 'ACMA Exports', value: '$21.2B', change: '+12%', direction: 'up' as const },
    { label: 'Craftsman Auto', value: '₹5,400', change: '+2.8%', direction: 'up' as const },
    { label: 'JBM Auto', value: '₹1,850', change: '+1.9%', direction: 'up' as const },
    { label: 'Nifty Auto', value: '26,800', change: '+0.9%', direction: 'up' as const },
    { label: 'PLI Approved', value: '₹26,058 Cr', change: '68 firms', direction: 'up' as const },
  ]

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      <DashboardHeader title="Auto Ancillaries & Components" />
      <nav className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6"><div className="flex items-center gap-1 py-2 overflow-x-auto">
          {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}><tab.icon size={14} /> {tab.label}</button>))}
        </div></div>
      </nav>
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'business' && <BusinessModel data={AUTO_ANCILLARY_BUSINESS} />}
        {activeTab === 'production' && <ProductionTab />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab isAdmin={isAdmin} />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="automobile" />}
        {activeTab === 'game' && <ProcessGame data={AUTO_ANCILLARY_GAME} />}
      </main>
      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30"><div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between"><p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p><p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p><p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p></div></footer>
    </div>
  )
}

// Detail shown when a "content per vehicle" bar is clicked
const contentInfo: Record<string, { value: string; desc: string; note: string }> = {
  'Japan': {
    value: '$680 / vehicle',
    desc: 'Japan has the world\'s highest auto-component content per vehicle, reflecting deep electronics integration, advanced safety systems, and hybrid/EV powertrains built by Toyota, Honda, and Nissan.',
    note: 'Mature market with premium, tech-heavy vehicles and a dense Tier-1/Tier-2 supplier ecosystem (Denso, Aisin).',
  },
  'Germany': {
    value: '$620 / vehicle',
    desc: 'Germany\'s premium/luxury mix (Mercedes, BMW, Audi, VW) drives very high content per vehicle — advanced electronics, ADAS, high-end interiors, and performance drivetrains.',
    note: 'Home to global Tier-1 giants (Bosch, Continental, ZF) supplying sophisticated, high-value components.',
  },
  'USA': {
    value: '$550 / vehicle',
    desc: 'The US skews toward large SUVs and pickup trucks with rich feature content — infotainment, comfort, and safety systems all lift per-vehicle component value.',
    note: 'Large-vehicle preference and premiumisation keep content per vehicle well above the global average.',
  },
  'South Korea': {
    value: '$480 / vehicle',
    desc: 'Korea (Hyundai, Kia) has rapidly moved up the value chain — strong electronics, EV platforms, and in-house component supply through group affiliates.',
    note: 'Vertically integrated model (Hyundai Mobis) and fast EV adoption boost content per vehicle.',
  },
  'China': {
    value: '$380 / vehicle',
    desc: 'China\'s content per vehicle is rising fast on the back of the world\'s largest EV market — batteries, power electronics, and connected-car features add value.',
    note: 'EV leadership and scale are pushing Chinese content per vehicle above the global average.',
  },
  'India': {
    value: '$120 / vehicle',
    desc: 'India\'s content per vehicle is the lowest here — reflecting a value/entry-level vehicle mix, cost-sensitive buyers, and lower penetration of advanced electronics and safety systems.',
    note: 'This is the opportunity: premiumisation, mandatory safety norms (6 airbags, ABS), and EV adoption give the sector large growth headroom to close the gap.',
  },
  'Global Avg': {
    value: '$300 / vehicle',
    desc: 'The global average blends mature high-content markets (Japan, Germany, US) with fast-growing lower-content markets (India). India at $120 sits well below this benchmark.',
    note: 'India catching up toward the global average is the core structural growth thesis for the auto-components sector.',
  },
}

// ===== OVERVIEW TAB =====
function OverviewTab() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [selectedContent, setSelectedContent] = useState<string | null>(null)
  const contentSel = selectedContent ? contentInfo[selectedContent] : null
  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-r from-[#0369a1] to-[#075985] rounded-2xl p-6 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><Wrench size={20} className="text-amber-300" /><span className="text-[10px] font-semibold text-amber-200 uppercase tracking-wide">India's Auto Components Industry</span></div>
          <h2 className="text-2xl font-black">$74 Billion Industry — World's 4th Largest</h2>
          <p className="text-sm text-white/70 mt-1">800+ organized players • $21.2B exports • 5M+ employment • 25% of manufacturing GDP</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center"><div className="text-2xl font-black text-[#0369a1]">$<AnimatedCounter end={74} />B</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Industry Turnover (FY25)</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center"><div className="text-2xl font-black text-green-600">$<AnimatedCounter end={21.2} decimals={1} />B</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Exports (Record)</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center"><div className="text-2xl font-black text-navy">#<AnimatedCounter end={4} /></div><div className="text-[10px] font-semibold text-gray-500 mt-1">Global Rank</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center"><div className="text-2xl font-black text-orange-600"><AnimatedCounter end={14} />%</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Growth (YoY)</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center"><div className="text-2xl font-black text-purple-600"><AnimatedCounter end={800} />+</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Organized Players</div></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={82} label="Auto Components Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Product Segment Split (FY25)</h3>
          <p className="text-xs text-gray-500 mb-3">👆 Click any segment for subtypes and details</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split(' ')[0]} ${value}%`} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Customer / Channel Split</h3>
          <p className="text-xs text-gray-500 mb-3">👆 Click to understand each channel</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart><Pie data={customerSplit} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name} ${value}%`} onClick={(_, i) => setSelectedCustomer(customerSplit[i].name)} cursor="pointer">{customerSplit.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div>
            <p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p>
            <div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div>
          </div>
        </div>
      )}
      {selectedCustomer && customerDetails[selectedCustomer] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCustomer(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedCustomer}</h3><button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div>
            <p className="text-sm text-gray-700">{customerDetails[selectedCustomer]}</p>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Industry Timeline (1960–2030)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} hide /><Tooltip content={({ active, payload }) => active && payload?.[0] ? (<div className="bg-white p-2 rounded-lg shadow-lg border text-xs"><p className="font-bold text-navy">{payload[0].payload.year}</p><p className="text-gray-600">{payload[0].payload.event}</p></div>) : null} /><Line type="monotone" dataKey="value" stroke="#0369a1" strokeWidth={2} dot={{ fill: '#f37021', r: 4 }} /></LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Auto Component Industry Size — $ per Vehicle (Content per Vehicle)</h3>
        <p className="text-xs text-gray-500 mb-3">India's component content/vehicle is low — huge growth headroom with premiumisation + EV. Click any bar for details.</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={perCapitaData} layout="vertical" onClick={(d: any) => { if (d && d.activePayload) setSelectedContent(d.activePayload[0]?.payload?.country) }}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="$" /><YAxis dataKey="country" type="category" fontSize={10} width={90} /><Tooltip formatter={(v: number) => `$${v}/vehicle`} cursor={{ fill: 'rgba(0,0,0,0.03)' }} /><Bar dataKey="value" radius={[0, 4, 4, 0]} cursor="pointer">{perCapitaData.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'Global Avg' ? '#B02A30' : '#0369a1'} />)}<LabelList dataKey="value" position="right" fontSize={9} formatter={(v: number) => `$${v}`} /></Bar></BarChart>
        </ResponsiveContainer>
      </div>

      {/* Content-per-vehicle detail popup */}
      {contentSel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedContent(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-lg font-bold text-navy">{selectedContent}</h3>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-maroon/10 text-maroon">{contentSel.value}</span>
              </div>
              <button onClick={() => setSelectedContent(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold shrink-0">×</button>
            </div>
            <div className="space-y-4">
              <div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Content per vehicle</span><p className="text-sm text-gray-700 leading-relaxed mt-1">{contentSel.desc}</p></div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Why it matters</span><p className="text-sm text-gray-700 mt-1 leading-relaxed">{contentSel.note}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ===== PRODUCTION TAB =====
function ProductionTab() {
  const [showExports, setShowExports] = useState(false)
  const [showImports, setShowImports] = useState(false)
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Global Auto Component Industry ($B, 2024)</h3>
        <ResponsiveContainer width="100%" height={350}><BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="$B" /><YAxis dataKey="country" type="category" fontSize={10} width={90} /><Tooltip formatter={(v: number) => `$${v}B`} /><Bar dataKey="value" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'China' ? '#B02A30' : '#0369a1'} />)}<LabelList dataKey="value" position="right" fontSize={9} formatter={(v: number) => `$${v}B`} /></Bar></BarChart></ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">India Auto Components — Production vs Trade ($B)</h3>
        <p className="text-xs text-gray-500 mb-3">👆 Click Export/Import for country-wise breakup</p>
        <ResponsiveContainer width="100%" height={300}><LineChart data={supplyDemandData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} unit="$B" /><Tooltip /><Legend /><Line type="monotone" dataKey="production" name="Total Production" stroke="#0369a1" strokeWidth={2} dot={{ r: 4 }} /><Line type="monotone" dataKey="domestic" name="Domestic Supply" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4 }} /><Line type="monotone" dataKey="exports" name="Exports (click)" stroke="#f37021" strokeWidth={2} dot={{ r: 4 }} activeDot={{ onClick: () => setShowExports(true) }} /><Line type="monotone" dataKey="imports" name="Imports (click)" stroke="#B02A30" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ onClick: () => setShowImports(true) }} /></LineChart></ResponsiveContainer>
        <div className="flex gap-2 mt-3">
          <button onClick={() => setShowExports(true)} className="text-[10px] px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg font-semibold border border-orange-200 hover:bg-orange-100">📤 Export Breakup ($21.2B)</button>
          <button onClick={() => setShowImports(true)} className="text-[10px] px-3 py-1.5 bg-red-50 text-red-700 rounded-lg font-semibold border border-red-200 hover:bg-red-100">📥 Import Breakup ($5.8B)</button>
        </div>
      </div>
      {showExports && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExports(false)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Component Exports — Destination (FY25: $21.2B)</h3><button onClick={() => setShowExports(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Region</th><th className="text-right py-2 px-2 font-bold text-navy">Value</th><th className="text-right py-2 px-2 font-bold text-navy">Share</th><th className="text-left py-2 px-2 font-bold text-navy">Key Products</th></tr></thead><tbody>{exportDetails.map((e, i) => (<tr key={i} className="border-b border-gray-50"><td className="py-2 px-2 font-semibold">{e.country}</td><td className="py-2 px-2 text-right font-bold text-maroon">{e.value}</td><td className="py-2 px-2 text-right">{e.share}</td><td className="py-2 px-2 text-gray-600">{e.products}</td></tr>))}</tbody></table></div></div>)}
      {showImports && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowImports(false)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Component Imports — Source (FY25: $5.8B)</h3><button onClick={() => setShowImports(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Country</th><th className="text-right py-2 px-2 font-bold text-navy">Value</th><th className="text-right py-2 px-2 font-bold text-navy">Share</th><th className="text-left py-2 px-2 font-bold text-navy">Key Items</th></tr></thead><tbody>{importDetails.map((e, i) => (<tr key={i} className="border-b border-gray-50"><td className="py-2 px-2 font-semibold">{e.country}</td><td className="py-2 px-2 text-right font-bold text-maroon">{e.value}</td><td className="py-2 px-2 text-right">{e.share}</td><td className="py-2 px-2 text-gray-600">{e.products}</td></tr>))}</tbody></table></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Capacity Pipeline — Major Investments (FY25-28)</h3>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-left py-2 px-2 font-bold text-navy">Location</th><th className="text-right py-2 px-2 font-bold text-navy">Investment</th><th className="text-center py-2 px-2 font-bold text-navy">Timeline</th><th className="text-left py-2 px-2 font-bold text-navy">Focus Area</th></tr></thead><tbody>{capacityPipeline.map((c, i) => (<tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30"><td className="py-2 px-2 font-semibold text-navy">{c.company}</td><td className="py-2 px-2 text-gray-600">{c.location}</td><td className="py-2 px-2 text-right font-bold text-maroon">{c.capacity}</td><td className="py-2 px-2 text-center"><span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-semibold">{c.year}</span></td><td className="py-2 px-2 text-gray-600">{c.focus}</td></tr>))}</tbody></table></div>
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
      type: d?.type || 'Auto Component',
      segment: p.segment,
      hq: d?.hq,
      founded: d?.founded,
      target: d?.expansion,
      highlight: d?.moat,
      extra: [
        { label: 'Exports %', value: `${p.exports}%` },
        { label: 'Employees', value: p.employees.toLocaleString('en-IN') },
      ],
    }
  })
  return (
    <PlayersBoard
      players={rows}
      config={{
        industryLabel: 'Auto Components',
        donutTitle: 'Ownership Type Split',
      }}
    />
  )
}

function PlayersTabLegacy() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const selected = selectedPlayer ? playerDetails[selectedPlayer] : null
  return (
    <div className="space-y-6">
      {selectedPlayer && selected && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3><button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div></div><div className="space-y-3"><div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Plants</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div><div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div><div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div></div></div></div>)}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Top Companies — Revenue (₹ Cr)</h3>
          <p className="text-xs text-gray-500 mb-3">👆 Click for company deep-dive</p>
          <ResponsiveContainer width="100%" height={320}><BarChart data={playersData} layout="vertical" onClick={(data: any) => { if (data?.activePayload) setSelectedPlayer(data.activePayload[0]?.payload?.name) }}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} /><YAxis dataKey="name" type="category" fontSize={10} width={120} /><Tooltip formatter={(v: number) => `₹${v.toLocaleString()} Cr`} /><Bar dataKey="revenue" name="Revenue (₹Cr)" radius={[0, 4, 4, 0]} cursor="pointer">{playersData.map((_, i) => <Cell key={i} fill={i < 2 ? '#f37021' : i < 5 ? '#0369a1' : '#94a3b8'} />)}<LabelList dataKey="revenue" position="right" fontSize={9} formatter={(v: number) => `₹${(v/1000).toFixed(1)}K`} /></Bar></BarChart></ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Top 4 — Multi-Dimensional Comparison</h3>
          <ResponsiveContainer width="100%" height={320}><RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}><PolarGrid stroke="#e2e8f0" /><PolarAngleAxis dataKey="metric" fontSize={10} /><PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={8} /><Radar name="Motherson" dataKey="Motherson" stroke="#f37021" fill="#f37021" fillOpacity={0.15} strokeWidth={2} /><Radar name="Bosch" dataKey="Bosch" stroke="#0369a1" fill="#0369a1" fillOpacity={0.1} strokeWidth={2} /><Radar name="Minda" dataKey="Minda" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.08} strokeWidth={2} /><Radar name="Bharat Forge" dataKey="BharatForge" stroke="#9C27B0" fill="#9C27B0" fillOpacity={0.08} strokeWidth={2} /><Legend fontSize={10} /><Tooltip /></RadarChart></ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Market Share Movement (FY23 → FY25)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{marketShareTrend.map((c, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"><div className="flex-1"><div className="text-sm font-bold text-navy">{c.company}</div><div className="flex items-center gap-2 mt-1"><div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#0369a1] to-[#f37021]" style={{ width: `${c.fy25 * 3}%` }}></div></div><span className="text-xs font-bold text-navy w-12 text-right">{c.fy25}%</span></div></div><div className={`text-xs font-bold px-2 py-1 rounded-lg ${c.change > 0 ? 'bg-green-100 text-green-700' : c.change < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{c.change > 0 ? '↑+' : '↓'}{c.change}%</div></div>))}</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-navy mb-2">Detailed Company Profiles</h3>
        <p className="text-xs text-gray-500 mb-3">👆 Click any row for expansion plans and competitive moat</p>
        <table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (₹Cr)</th><th className="text-right py-2 px-2 font-bold text-navy">Export %</th><th className="text-left py-2 px-2 font-bold text-navy">Key Segment</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-blue-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right font-bold">₹{p.revenue.toLocaleString()}</td><td className="py-2.5 px-2 text-right font-bold text-orange-600">{p.exports}%</td><td className="py-2.5 px-2 text-gray-600 text-[10px]">{p.segment}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View →</span></td></tr>))}</tbody></table>
      </div>
    </div>
  )
}

// ===== RISK TAB =====
function RiskTab({ isAdmin }: { isAdmin: boolean }) {
  return <AutoAncillaryRiskAnalysis />
}

function RiskTabLegacy({ isAdmin }: { isAdmin: boolean }) {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'framework' | 'emerging' | 'bestpractices'>('insurable')
  const aogRisks = [
    { name: 'Earthquake', probability: 'Low', impact: 'Very High', emv: '₹50-300 Cr', mitigation: 'Seismic anchoring of CNC machines, die racks. BCP for alternate site production.' },
    { name: 'Flood', probability: 'Medium', impact: 'High', emv: '₹30-200 Cr', mitigation: 'Elevated raw material storage. Pune/Chennai clusters highly exposed. Alternate supplier activation.' },
    { name: 'Cyclone', probability: 'Medium', impact: 'Medium-High', emv: '₹20-100 Cr', mitigation: 'Wind-rated factory sheds. Secure outdoor storage. Pre-monsoon audit of roofing/cladding.' },
  ]
  const nonAogRisks = [
    { name: 'CNC Machine Breakdown', probability: 'High', impact: 'Medium-High', emv: '₹10-80 Cr', mitigation: 'Condition monitoring (vibration/thermal). OEM service contracts. Redundancy in critical lines.' },
    { name: 'Forging Press Failure', probability: 'Medium', impact: 'Very High', emv: '₹30-200 Cr', mitigation: 'Die life tracking, tonnage monitoring. 8-12 month lead time for large press replacement.' },
    { name: 'Die Casting Machine Explosion', probability: 'Low', impact: 'Catastrophic', emv: '₹50-300 Cr', mitigation: 'Moisture detection in molten aluminum. Shot sleeve inspection. Hydraulic system PM.' },
    { name: 'Heat Treatment Furnace Fire', probability: 'Medium', impact: 'High', emv: '₹20-100 Cr', mitigation: 'Gas detection, flame monitoring. Automatic fuel shutoff. Quench oil fire suppression.' },
    { name: 'OEM Production Halt (BI)', probability: 'Medium-High', impact: 'Very High', emv: '₹50-500 Cr', mitigation: 'JIT vulnerability — single OEM can pull 50%+ revenue. Diversify customer base. Buffer stock at OEM end.' },
    { name: 'Quality Recall / Warranty', probability: 'Medium', impact: 'High', emv: '₹20-150 Cr', mitigation: 'PPAP/APQP compliance. Batch traceability. Product liability insurance. SPC on critical parameters.' },
  ]
  const emvTableData = [
    { risk: 'OEM Production Halt (Contingent BI)', prob: 15, impact: 300, emv: 45.0, owner: 'Sales Head', strategy: 'Transfer' },
    { risk: 'Forging Press Failure', prob: 8, impact: 200, emv: 16.0, owner: 'Maintenance', strategy: 'Transfer' },
    { risk: 'Die Casting Explosion', prob: 3, impact: 300, emv: 9.0, owner: 'EHS', strategy: 'Transfer' },
    { risk: 'Quality Recall', prob: 10, impact: 100, emv: 10.0, owner: 'Quality Head', strategy: 'Transfer' },
    { risk: 'Flood (Pune/Chennai)', prob: 10, impact: 150, emv: 15.0, owner: 'Plant Head', strategy: 'Mitigate' },
    { risk: 'CNC Breakdown', prob: 20, impact: 40, emv: 8.0, owner: 'Maintenance', strategy: 'Mitigate' },
    { risk: 'Heat Treatment Fire', prob: 8, impact: 80, emv: 6.4, owner: 'EHS', strategy: 'Mitigate' },
    { risk: 'Supply Chain (China dependency)', prob: 12, impact: 100, emv: 12.0, owner: 'SCM', strategy: 'Avoid' },
  ]
  const caseStudies = [
    { title: 'Pune Floods — Component Hub Shutdown (Jul 2024)', plant: 'Chakan/Ranjangaon MIDC', loss: '₹800 Cr (industry-wide)', cause: 'Heavy rainfall flooded MIDC roads. 200+ component units shut 5-7 days. OEM production at Tata/M&M halted.', lesson: 'Flood resilience audit for MIDC units. Elevated electrical panels. Contingent BI for OEM supply interruption.', claimType: 'AOG Flood + Contingent BI' },
    { title: 'Bharat Forge — Forging Press Crash (2022)', plant: 'Mundhwa, Pune', loss: '₹120 Cr (PD + BI)', cause: 'Main 10,000T forging press crankshaft failure. 14-month replacement lead time from Schuler (Germany).', lesson: 'Critical spare inventory for large presses. MLOP policy with adequate indemnity period (18+ months).', claimType: 'MB + MLOP' },
    { title: 'Motherson Sumi — Wiring Harness Fire (2021)', plant: 'Noida Unit-1', loss: '₹60 Cr + supply disruption to Maruti', cause: 'Electrical short in PVC insulation area. Rapid spread due to combustible wire material.', lesson: 'Fire-rated storage for raw PVC/polymer. CO2 suppression in polymer processing areas. Supplier diversification by OEM.', claimType: 'Fire + FLOP + Contingent BI (Maruti)' },
  ]
  const probColor = (p: string) => p === 'High' ? 'bg-red-100 text-red-700' : p === 'Medium-High' ? 'bg-orange-100 text-orange-700' : p === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
  const impactColor = (i: string) => i === 'Catastrophic' || i === 'Very High' ? 'bg-red-100 text-red-700' : i === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'
  const riskSubTabs = [{ id: 'insurable' as const, label: 'Insurable Risks' }, { id: 'framework' as const, label: 'Risk Framework' }, { id: 'emerging' as const, label: 'Emerging Tech' }, { id: 'bestpractices' as const, label: 'Best Practices' }]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center gap-3"><Shield size={20} className="text-maroon" /><div><h3 className="text-sm font-bold text-navy">ISO 31000:2018 Risk Management — Auto Components</h3><p className="text-xs text-gray-500">Forging | Casting | Machining | Assembly | Heat Treatment</p></div></div></div>
      <div className="flex gap-2 flex-wrap">{riskSubTabs.map((tab) => (<button key={tab.id} onClick={() => setRiskSubTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${riskSubTab === tab.id ? 'bg-maroon text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{tab.label}</button>))}</div>
      {riskSubTab === 'insurable' && (<div className="space-y-6">
        <div><h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2"><CloudRain size={16} className="text-blue-500" /> AOG Perils</h4><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{aogRisks.map((r, i) => (<div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition"><h5 className="font-bold text-navy text-sm mb-2">{r.name}</h5><div className="flex gap-2 mb-2"><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${probColor(r.probability)}`}>P: {r.probability}</span><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${impactColor(r.impact)}`}>I: {r.impact}</span></div><p className="text-xs font-bold text-maroon mb-1">{r.emv}</p><p className="text-[10px] text-gray-500 italic">{r.mitigation}</p></div>))}</div></div>
        <div><h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2"><Flame size={16} className="text-red-500" /> Non-AOG Perils</h4><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{nonAogRisks.map((r, i) => (<div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition"><h5 className="font-bold text-navy text-sm mb-2">{r.name}</h5><div className="flex gap-2 mb-2"><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${probColor(r.probability)}`}>P: {r.probability}</span><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${impactColor(r.impact)}`}>I: {r.impact}</span></div><p className="text-xs font-bold text-maroon mb-1">{r.emv}</p><p className="text-[10px] text-gray-500 italic">{r.mitigation}</p></div>))}</div></div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-navy mb-1 flex items-center gap-2"><Shield size={16} className="text-maroon" /> Insurance Products & Key Add-ons — Auto Components</h4>
          <p className="text-xs text-gray-500 mb-5">Coverages for auto ancillary & component manufacturers</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h5 className="text-xs font-bold text-navy mb-3">Material Damage Add-ons</h5><ul className="space-y-1.5">{['Obsolete Part/Equipment Clause', 'OEM Clause', 'Waiver of Under Insurance', 'Margin Clause', 'Capital Additions', 'Immediate Repair Clause', 'Expediting Expenses (Air Freight for dies/spares)', 'Accidental Damage', 'Serial Loss Clause', 'Molten Metal Extension (Casting units)', 'Patterns, Dies, Moulds cover (special valuation)', 'Stock in Process (WIP) fluctuation clause'].map((item, i) => (<li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>))}</ul></div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h5 className="text-xs font-bold text-navy mb-3">Business Interruption Add-ons</h5><ul className="space-y-1.5">{['Customer Premises Extension (OEM shutdown impact)', 'Additional Increased Cost of Working', 'Prevention of Access (MIDC road flooding)', 'Contingent BI (Single-OEM dependency)', 'Interdependency (Forging → Machining → Assembly)', 'Utilities Extension (Power cut in MIDC)', 'Contract Penalty Clause (OEM delivery SLA)', 'Suppliers Extension (raw material disruption)'].map((item, i) => (<li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>))}</ul></div>
          </div>
          <div className="mt-5 bg-blue-50 rounded-xl p-4 border border-blue-100"><h5 className="text-xs font-bold text-navy mb-3">Key Products</h5><div className="flex flex-wrap gap-2">{['Fire & Allied Perils', 'Machinery Breakdown', 'MLOP', 'FLOP', 'Marine Cargo (JIT shipments)', 'Workers Compensation', 'Product Liability', 'Product Recall', 'CGL', 'Cyber Insurance', 'D&O'].map((item, i) => (<span key={i} className="text-[11px] px-3 py-1.5 bg-white rounded-lg border border-blue-200 text-navy font-semibold shadow-sm">• {item}</span>))}</div></div>
          <div className="mt-5 bg-orange-50 rounded-xl p-4 border border-orange-200"><h5 className="text-xs font-bold text-orange-800 mb-3 flex items-center gap-1.5">⚙️ Industry-Specific Add-ons — Auto Components</h5><ul className="space-y-1.5">{['Forging press overhaul — hydraulic system, main ram, crankshaft', 'Die casting machine — plunger tip, sleeve, intensifier', 'CNC machining centers — spindle, ballscrew, ATC (tool changer)', 'Heat treatment furnaces — atmosphere control, quench oil systems', 'Induction hardening machines — coil replacement, power supply', 'Robotic welding cells — torch, positioner, controller', 'Surface treatment (plating/painting) — rectifier, bath chemistry', 'Coordinate Measuring Machines (CMM) — probe, air bearing', 'Toolroom equipment — EDM, wire-cut, grinding machines', 'Compressed air + hydraulic power packs (plant-wide)', 'EV component testing rigs (HV safety, BMS cycling)', 'Pattern/die/mould refurbishment and modification costs', 'Clean room equipment (for sensor/electronics assembly)'].map((item, i) => (<li key={i} className="text-[11px] text-orange-900 flex items-start gap-2"><span className="text-orange-600 mt-0.5 font-bold">▸</span>{item}</li>))}</ul></div>
        </div>
      </div>)}
      {riskSubTab === 'framework' && (<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto"><h4 className="text-sm font-bold text-navy mb-4">Expected Monetary Value (EMV) Analysis</h4><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">Risk</th><th className="text-right py-2 px-2 font-bold text-navy">Prob %</th><th className="text-right py-2 px-2 font-bold text-navy">Impact (₹Cr)</th><th className="text-right py-2 px-2 font-bold text-navy">EMV (₹Cr)</th><th className="text-center py-2 px-2 font-bold text-navy">Owner</th><th className="text-center py-2 px-2 font-bold text-navy">Strategy</th></tr></thead><tbody>{emvTableData.map((row, i) => (<tr key={i} className="border-b border-gray-50"><td className="py-2 px-2 font-semibold text-gray-800">{row.risk}</td><td className="py-2 px-2 text-right">{row.prob}%</td><td className="py-2 px-2 text-right font-semibold">₹{row.impact} Cr</td><td className="py-2 px-2 text-right font-bold text-maroon">₹{row.emv} Cr</td><td className="py-2 px-2 text-center text-gray-600">{row.owner}</td><td className="py-2 px-2 text-center"><span className="px-2 py-0.5 rounded-full bg-navy/10 text-navy font-semibold">{row.strategy}</span></td></tr>))}</tbody></table></div>)}
      {riskSubTab === 'emerging' && (<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h4 className="text-sm font-bold text-navy mb-4">EV Transition — New Risk Profile for Component Makers</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="p-4 bg-purple-50 rounded-xl border border-purple-100"><h5 className="text-xs font-bold text-purple-800 mb-1">EV Traction Motor Manufacturing</h5><p className="text-[10px] text-purple-700">High-speed rotor balancing, rare earth magnet handling (neodymium dust = fire risk), HV testing at 400V+. No Indian loss history — bespoke MB policy needed.</p></div><div className="p-4 bg-blue-50 rounded-xl border border-blue-100"><h5 className="text-xs font-bold text-blue-800 mb-1">Battery Pack Assembly (HV)</h5><p className="text-[10px] text-blue-700">Thermal runaway in cell-to-pack process. NMP solvent handling. Insulation resistance testing. Fire suppression for lithium fires (water-mist, not dry chemical).</p></div><div className="p-4 bg-amber-50 rounded-xl border border-amber-100"><h5 className="text-xs font-bold text-amber-800 mb-1">ADAS Sensor Manufacturing</h5><p className="text-[10px] text-amber-700">Clean room contamination = batch rejection. Lidar/radar calibration failure. Product liability if sensor fails in deployed vehicle. Attribution chain unclear.</p></div><div className="p-4 bg-green-50 rounded-xl border border-green-100"><h5 className="text-xs font-bold text-green-800 mb-1">Lightweight Materials (Composites/Aluminum)</h5><p className="text-[10px] text-green-700">Carbon fiber autoclave explosion risk. Aluminum dust explosion in machining. New joining techniques (FSW, adhesive bonding) with unknown failure modes.</p></div></div></div>)}
      {riskSubTab === 'bestpractices' && (<div className="space-y-6"><div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h4 className="text-sm font-bold text-navy mb-4 flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> Case Studies — Auto Component Losses</h4><div className="space-y-3">{caseStudies.map((cs, i) => (<div key={i} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition"><div className="flex items-center justify-between mb-2"><h5 className="font-bold text-navy text-sm">{cs.title}</h5><span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">{cs.claimType}</span></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[10px]"><div><span className="font-bold text-gray-500">Plant:</span> {cs.plant}</div><div><span className="font-bold text-gray-500">Loss:</span> <span className="text-maroon font-bold">{cs.loss}</span></div><div><span className="font-bold text-gray-500">Cause:</span> {cs.cause}</div></div><div className="mt-2 bg-green-50 rounded-lg p-2 border border-green-100"><span className="text-[10px] font-bold text-green-700">Learning:</span><span className="text-[10px] text-green-800 ml-1">{cs.lesson}</span></div></div>))}</div></div></div>)}
    </div>
  )
}

// ===== GEOGRAPHY TAB =====
function GeographyTab() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const selectedInfo = geographyData.find(s => s.state === selectedState)
  return (
    <div className="space-y-6">
      {selectedState && selectedInfo && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Why {selectedState} is an Auto Component Hub</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><div className="grid grid-cols-3 gap-3 text-center mb-3"><div><div className="text-lg font-bold text-maroon">{selectedInfo.capacity}%</div><div className="text-[10px] text-gray-500">Industry Share</div></div><div><div className="text-lg font-bold text-navy">#{geographyData.indexOf(selectedInfo) + 1}</div><div className="text-[10px] text-gray-500">Rank</div></div><div><div className="text-lg font-bold text-orange-600">{selectedInfo.share}%</div><div className="text-[10px] text-gray-500">Revenue Share</div></div></div><p className="text-xs text-gray-600"><strong>Major Players:</strong> {selectedInfo.majorPlayers}</p></div><div><h4 className="text-sm font-bold text-navy mb-2">Key Reasons</h4><p className="text-sm text-gray-700 leading-relaxed">{selectedInfo.reason}</p></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">State-wise Auto Component Concentration (% of revenue)</h3>
        <p className="text-xs text-gray-500 mb-4">👆 Click any bar to see why that state is a component hub</p>
        <ResponsiveContainer width="100%" height={380}><BarChart data={geographyData} layout="vertical" onClick={(data: any) => { if (data?.activePayload) setSelectedState(data.activePayload[0]?.payload?.state) }}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="%" /><YAxis dataKey="state" type="category" fontSize={10} width={130} /><Tooltip formatter={(v: number) => `${v}%`} /><Bar dataKey="share" radius={[0, 4, 4, 0]} cursor="pointer">{geographyData.map((_, i) => <Cell key={i} fill={i < 3 ? '#f37021' : i < 5 ? '#0369a1' : '#94a3b8'} />)}<LabelList dataKey="share" position="right" fontSize={9} formatter={(v: number) => `${v}%`} /></Bar></BarChart></ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">State</th><th className="text-right py-2 px-2 font-bold text-navy">Share (%)</th><th className="text-left py-2 px-2 font-bold text-navy">Major Players</th><th className="text-center py-2 px-2 font-bold text-navy">Insight</th></tr></thead><tbody>{geographyData.map((s, i) => (<tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30 cursor-pointer transition" onClick={() => setSelectedState(s.state)}><td className="py-2.5 px-2 font-semibold text-maroon underline decoration-dotted">{s.state}</td><td className="py-2.5 px-2 text-right font-bold text-navy">{s.share}%</td><td className="py-2.5 px-2 text-gray-600 text-[10px]">{s.majorPlayers}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-white bg-maroon px-2.5 py-1 rounded-lg shadow-sm">Why?</span></td></tr>))}</tbody></table>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h3 className="text-sm font-bold text-navy mb-3">India's Auto Component Corridors</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="p-4 bg-orange-50 rounded-xl border border-orange-200"><h4 className="text-xs font-bold text-orange-800 mb-1">Western Belt (44%)</h4><p className="text-[10px] text-orange-700">Pune-Nashik-Aurangabad (Maharashtra) + Gujarat. Forging, Casting, Machining hub. Bharat Forge, Endurance, ZF, Bosch. Proximity to Tata, M&M, Force.</p></div><div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><h4 className="text-xs font-bold text-blue-800 mb-1">Southern Belt (31%)</h4><p className="text-[10px] text-blue-700">Chennai-Hosur-Bangalore corridor. Wiring harness, Electronics, Fasteners. Sundram, TVS Group, Rane. Proximity to Hyundai, Renault-Nissan, Toyota.</p></div><div className="p-4 bg-green-50 rounded-xl border border-green-200"><h4 className="text-xs font-bold text-green-800 mb-1">Northern Belt (23%)</h4><p className="text-[10px] text-green-700">Gurugram-Manesar-Neemrana (Haryana-Rajasthan). Electrical, Switches, Sensors. Motherson, Minda, Sona BLW. Proximity to Maruti, Hero, Honda.</p></div></div></div>
    </div>
  )
}

// ===== NEWS DATA =====
const newsData = [
  { title: 'ACMA Reports Record $21.2B Component Exports in FY26', source: 'ACMA Press Release', date: '2026-08-11', summary: 'Europe and the USA remain the top export destinations for Indian auto components. EV-related components are the fastest-growing category, aided by global sourcing shifts. The record exports underline India\'s rising role in the global supply chain.', sentiment: 'Positive' },
  { title: 'PLI for Auto Components — 68 Companies Get Rs 26,058 Cr Approval', source: 'Ministry of Heavy Industries', date: '2026-07-22', summary: 'The advanced automotive technology PLI covers EV components, hydrogen fuel cells, and ADAS sensors. Five-year incentives aim to deepen localisation of high-value parts. The scheme is drawing fresh investment into cutting-edge manufacturing.', sentiment: 'Positive' },
  { title: 'Motherson Group Acquires Cockpit-Module Maker in Europe', source: 'Economic Times', date: '2026-06-16', summary: 'The acquisition strengthens Motherson\'s leadership in automotive interiors and modules. It expands the group\'s global customer base and technology portfolio. The deal supports its long-term revenue growth ambitions.', sentiment: 'Positive' },
  { title: 'Sona BLW Wins $500M EV Motor Order from European OEM', source: 'Business Standard', date: '2026-05-28', summary: 'The traction-motor supply contract is for a premium European EV platform. It validates India as a credible global sourcing hub for EV drivetrains. The win boosts Sona\'s order book and EV revenue mix.', sentiment: 'Positive' },
  { title: 'China Tariff Fears Push US OEMs to Accelerate India Sourcing', source: 'Reuters', date: '2026-04-18', summary: 'Trade tensions are reinforcing the China+1 sourcing strategy among global automakers. Indian forging, casting, and machining units are receiving new requests for quotes. The shift offers a structural growth opportunity for Tier-1 suppliers.', sentiment: 'Positive' },
  { title: 'Pune MIDC Flooding Disrupts 200+ Component Units', source: 'Times of India', date: '2026-03-24', summary: 'Heavy rainfall caused multi-day shutdowns across the Chakan and Ranjangaon belt. OEMs including Tata, M&M, and VW faced supply disruption. The event highlights climate-related risk in key manufacturing clusters.', sentiment: 'Negative' },
  { title: 'Semiconductor Supply Stabilises but EV Chip Demand Rising', source: 'ACMA Journal', date: '2026-03-05', summary: 'The traditional microcontroller shortage has largely eased for the industry. New demand for SiC and GaN power electronics and ADAS chips is emerging as the next bottleneck. Suppliers are securing long-term chip agreements to de-risk.', sentiment: 'Neutral' },
  { title: 'Bharat Forge Deepens Defence Push with Large Army Order', source: 'Mint', date: '2026-02-14', summary: 'The order spans artillery systems and armoured-vehicle components. The auto-to-defence diversification reduces dependence on cyclical OEM demand. It strengthens Bharat Forge\'s presence in the strategic manufacturing space.', sentiment: 'Positive' },
]

// ===== NEWS TAB =====
function NewsTab() {
  return <NewsFeed title="Auto Components Industry News & Developments" items={newsData} />
}
