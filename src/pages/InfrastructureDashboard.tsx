import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, Shield, User, Clock, TrendingUp, Users,
  ShieldAlert, Newspaper, HardHat, Gauge, MapPin, Building2, X, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, LabelList, ComposedChart, Line,
  ScatterChart, Scatter, ZAxis
} from 'recharts'
import AnimatedCounter from '../components/AnimatedCounter'
import NewsFeed from '../components/NewsFeed'
import HealthGauge from '../components/HealthGauge'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { INFRASTRUCTURE_GAME } from '../components/process-game/data/infrastructureGame'
import BusinessModel from '../components/BusinessModel'
import { INFRASTRUCTURE_BUSINESS } from '../data/businessModels/infrastructureBusiness'
import InfrastructureRiskAnalysis from '../components/risk-analysis/InfrastructureRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'

const COLORS = ['#334155', '#1e40af', '#0891b2', '#4CAF50', '#9C27B0', '#FF5722', '#ca8a04']

type InfraTab = 'overview' | 'business' | 'ownership' | 'risk' | 'players' | 'geography' | 'news' | 'snapshot' | 'game' | 'upcoming'

// Ownership / structure of the infrastructure sector by developer type
const ownershipData = [
  { type: 'Central PSUs (NHAI, NTPC, PGCIL)', share: 38 },
  { type: 'Private EPC & Developers', share: 34 },
  { type: 'State PSUs & Agencies', share: 16 },
  { type: 'Foreign / PE / InvIT Investors', share: 12 },
]

// Regional distribution of infrastructure investment
const geographyData = [
  { region: 'West', share: 26, projects: 'Ports (JNPT, Mundra), coastal roads, metros',
    keyProjects: 'JNPT & Mundra ports, Mumbai Coastal Road, Mumbai-Ahmedabad HSR (bullet train), Delhi-Mumbai Expressway (west leg), Mumbai & Pune metros',
    reason: 'The West leads on the back of India\'s busiest ports (JNPT, Mundra) and the Mumbai financial hub, which pull in the largest private capital. Gujarat and Maharashtra offer pro-industry policy, coastal access for EXIM trade, and the flagship Mumbai-Ahmedabad bullet-train and Delhi-Mumbai Expressway corridors.' },
  { region: 'South', share: 24, projects: 'Chennai/Bengaluru metros, ports, highways',
    keyProjects: 'Chennai, Bengaluru, Hyderabad & Kochi metros, Chennai & Krishnapatnam ports, Bengaluru airport, industrial corridors (Chennai-Bengaluru)',
    reason: 'The South is India\'s fastest-urbanising region with the densest metro-rail build-out (4 major city networks) and strong port + airport activity. A large IT/manufacturing economy and proactive states (TN, Karnataka, Telangana) drive sustained urban-transit and industrial-corridor investment.' },
  { region: 'North', share: 22, projects: 'Delhi-Mumbai Expressway, RRTS, metros',
    keyProjects: 'Delhi-Mumbai Expressway (north leg), Delhi-Meerut RRTS, Delhi/NCR & Jaipur/Lucknow metros, Jewar (Noida) airport, Eastern & Western DFC nodes',
    reason: 'The North centres on the Delhi-NCR mega-region — India\'s largest urban-transit market (metro + the country\'s first RRTS rapid-rail) and the Jewar greenfield airport. The Delhi-Mumbai Expressway and dedicated freight corridors anchor huge highway and logistics spending across UP, Haryana, and Rajasthan.' },
  { region: 'East', share: 15, projects: 'DFC, ports (Paradip), freight & transmission',
    keyProjects: 'Eastern Dedicated Freight Corridor, Paradip & Haldia ports, transmission corridors & grid links (Odisha, Jharkhand, WB), Kolkata metro extensions',
    reason: 'The East is driven by minerals and freight logistics — Odisha, Jharkhand, and West Bengal host major ports (Paradip, Haldia), the Eastern DFC, and transmission corridors that evacuate mineral-belt output. Investment is rising as freight corridors and port capacity unlock the region.' },
  { region: 'Central/NE', share: 13, projects: 'Highways, airports, connectivity corridors',
    keyProjects: 'North-East connectivity highways & bridges, regional/greenfield airports, Bharatmala corridors in MP/Chhattisgarh, Brahmaputra bridges',
    reason: 'Central India and the North-East draw strategic connectivity spending — highways, mega-bridges, and regional airports to integrate remote terrain. Government-funded Bharatmala corridors and border-connectivity projects dominate, given the challenging geography and lower private participation.' },
]

const overviewData = {
  investment: 143,
  gdpShare: 5.5,
  growth: 9.5,
  roadNetwork: 6.6,
  employment: 60,
  segmentSplit: [
    { segment: 'Roads & Highways', share: 30, value: 43 },
    { segment: 'Transmission & Grid', share: 18, value: 26 },
    { segment: 'Urban/Metro', share: 16, value: 23 },
    { segment: 'Industrial & Manufacturing', share: 14, value: 20 },
    { segment: 'Railways', share: 13, value: 19 },
    { segment: 'Airports/Aviation', share: 5, value: 7 },
    { segment: 'Ports', share: 4, value: 6 },
  ],
  yearlyGrowth: [
    { year: 'FY20', value: 100 },
    { year: 'FY21', value: 95 },
    { year: 'FY22', value: 110 },
    { year: 'FY23', value: 122 },
    { year: 'FY24', value: 134 },
    { year: 'FY25', value: 143 },
    { year: 'FY26E', value: 160 },
  ],
  capex: [
    { sector: 'NHAI Roads', spend: 168 },
    { sector: 'Railways', spend: 265 },
    { sector: 'Transmission', spend: 90 },
    { sector: 'Metro Rail', spend: 95 },
    { sector: 'Industrial/Mfg Corridors', spend: 120 },
    { sector: 'Ports', spend: 42 },
    { sector: 'Airports', spend: 55 },
  ],
}

const playersData = [
  { rank: 1, name: 'Larsen & Toubro', segment: 'EPC/Diversified', revenue: 221000, note: 'India\'s largest EPC — roads, metro, power, ports', hq: 'Mumbai, Maharashtra', founded: 1938, orderBook: '₹5+ Lakh Cr', highlight: 'Executes India\'s most complex projects — metros, sea links, nuclear, defence. Diversified EPC + IT + defence model.',
    orderBookCr: 510000, obToRevenue: 2.3, ebitdaMargin: 12, concentration: 'Low',
    cagr: 14, drivers: 'Record order book, Middle East EPC, green hydrogen & data centres', outlook: 'A multi-year capex super-cycle plus a record order book give L&T strong revenue visibility. Growth is broadening from core EPC into energy transition (electrolysers, green hydrogen), data centres, and precision/defence manufacturing.',
    projection: [ { year: 'FY25', rev: 221000 }, { year: 'FY26E', rev: 252000 }, { year: 'FY27E', rev: 287000 }, { year: 'FY28E', rev: 327000 }, { year: 'FY29E', rev: 373000 } ] },
  { rank: 2, name: 'NTPC Limited', segment: 'Power Generation', revenue: 178000, note: 'India\'s largest power generator (73 GW)', hq: 'New Delhi', founded: 1975, orderBook: '75+ GW capacity', highlight: 'Largest power utility in India. Expanding aggressively into renewables and nuclear alongside its thermal fleet.',
    orderBookCr: 300000, obToRevenue: 1.7, ebitdaMargin: 28, concentration: 'Medium',
    cagr: 11, drivers: 'Renewable capacity build-out (NTPC Green), new thermal & nuclear, rising power demand', outlook: 'Rising electricity demand and a large renewable pipeline (via NTPC Green Energy) underpin steady growth, while regulated returns on new thermal and nuclear capacity add a stable base.',
    projection: [ { year: 'FY25', rev: 178000 }, { year: 'FY26E', rev: 198000 }, { year: 'FY27E', rev: 220000 }, { year: 'FY28E', rev: 244000 }, { year: 'FY29E', rev: 271000 } ] },
  { rank: 3, name: 'NHAI (Authority)', segment: 'Roads/Highways', revenue: 150000, note: 'National highway development authority', hq: 'New Delhi', founded: 1988, orderBook: '~1.46 Lakh km network', highlight: 'Nodal authority for national highways. Drives the TOT/HAM monetisation pipeline that private developers bid for.',
    orderBookCr: 250000, obToRevenue: 1.7, ebitdaMargin: 30, concentration: 'Low',
    cagr: 9, drivers: 'Bharatmala, expressway corridors, TOT/InvIT asset monetisation', outlook: 'As the nodal highway authority, NHAI\'s activity scales with government road capex and asset-monetisation (TOT/InvIT) that recycles capital into new corridors — sustaining a large, steady award pipeline for developers.',
    projection: [ { year: 'FY25', rev: 150000 }, { year: 'FY26E', rev: 164000 }, { year: 'FY27E', rev: 179000 }, { year: 'FY28E', rev: 195000 }, { year: 'FY29E', rev: 212000 } ] },
  { rank: 4, name: 'Adani Group (Ports/Energy)', segment: 'Ports/Power', revenue: 140000, note: 'Ports, transmission, airports, renewables', hq: 'Ahmedabad, Gujarat', founded: 1988, orderBook: 'Multi-sector assets', highlight: 'India\'s largest private ports (APSEZ) and a major transmission, airports, and renewables operator.',
    orderBookCr: 200000, obToRevenue: 1.4, ebitdaMargin: 32, concentration: 'Medium',
    cagr: 16, drivers: 'Port capacity, airport traffic, transmission wins, green energy & hydrogen', outlook: 'A diversified infrastructure conglomerate compounding across ports, airports, transmission, and one of the world\'s largest renewable pipelines — with green hydrogen as the long-term growth bet.',
    projection: [ { year: 'FY25', rev: 140000 }, { year: 'FY26E', rev: 163000 }, { year: 'FY27E', rev: 189000 }, { year: 'FY28E', rev: 219000 }, { year: 'FY29E', rev: 254000 } ] },
  { rank: 5, name: 'Power Grid Corp', segment: 'Transmission', revenue: 46000, note: 'National transmission backbone operator', hq: 'Gurugram, Haryana', founded: 1989, orderBook: 'National grid backbone', highlight: 'Owns and operates the inter-state transmission backbone. Key enabler of renewable energy evacuation.',
    orderBookCr: 130000, obToRevenue: 2.8, ebitdaMargin: 87, concentration: 'Low',
    cagr: 10, drivers: 'Green-energy corridors, inter-state grid expansion, HVDC links', outlook: 'A surge in transmission tenders to evacuate renewable power (green-energy corridors, HVDC) is reviving capex after a lull, giving POWERGRID a fresh multi-year regulated-return growth runway.',
    projection: [ { year: 'FY25', rev: 46000 }, { year: 'FY26E', rev: 50500 }, { year: 'FY27E', rev: 55500 }, { year: 'FY28E', rev: 61000 }, { year: 'FY29E', rev: 67000 } ] },
  { rank: 6, name: 'KEC International', segment: 'T&D/EPC', revenue: 22500, note: 'Transmission, railways, civil EPC', hq: 'Mumbai, Maharashtra', founded: 1945, orderBook: '₹30,000 Cr+', highlight: 'RPG Group global EPC major — among the world\'s largest transmission-line builders, plus railways and civil.',
    orderBookCr: 38000, obToRevenue: 1.7, ebitdaMargin: 7, concentration: 'Medium',
    cagr: 15, drivers: 'Global T&D orders, civil (data centres, industrial), railways', outlook: 'Strong domestic and international T&D ordering, plus a growing civil business (industrial, data centres) and railways, support double-digit growth as margins recover from commodity headwinds.',
    projection: [ { year: 'FY25', rev: 22500 }, { year: 'FY26E', rev: 25900 }, { year: 'FY27E', rev: 29800 }, { year: 'FY28E', rev: 34200 }, { year: 'FY29E', rev: 39300 } ] },
  { rank: 7, name: 'GMR Airports', segment: 'Airports/Energy', revenue: 10200, note: 'Delhi, Hyderabad airports; energy assets', hq: 'New Delhi', founded: 1978, orderBook: 'Airport concessions', highlight: 'India\'s largest private airport operator. Turning profitable as passenger traffic and non-aero revenue grow.',
    orderBookCr: 60000, obToRevenue: 5.9, ebitdaMargin: 45, concentration: 'High',
    cagr: 18, drivers: 'Passenger traffic recovery, high-margin non-aero (retail, F&B, real estate)', outlook: 'Record air-passenger growth plus a rising share of high-margin non-aeronautical revenue (retail, duty-free, airport-city real estate) drive fast growth and an improving profit trajectory.',
    projection: [ { year: 'FY25', rev: 10200 }, { year: 'FY26E', rev: 12000 }, { year: 'FY27E', rev: 14200 }, { year: 'FY28E', rev: 16700 }, { year: 'FY29E', rev: 19700 } ] },
  { rank: 8, name: 'IRB Infrastructure', segment: 'Roads (BOT/HAM)', revenue: 8100, note: 'Largest private roads BOT operator', hq: 'Mumbai, Maharashtra', founded: 1998, orderBook: 'Toll asset portfolio', highlight: 'India\'s largest private roads developer under BOT/TOT. Runs an InvIT to recycle capital for new bids.',
    orderBookCr: 35000, obToRevenue: 4.3, ebitdaMargin: 50, concentration: 'Medium',
    cagr: 13, drivers: 'WPI-linked toll escalations, new BOT/TOT wins, InvIT capital recycling', outlook: 'A large operational toll portfolio with annual WPI-linked rate hikes provides recurring cash, while InvIT-based capital recycling funds fresh BOT/TOT bids for the next leg of growth.',
    projection: [ { year: 'FY25', rev: 8100 }, { year: 'FY26E', rev: 9200 }, { year: 'FY27E', rev: 10400 }, { year: 'FY28E', rev: 11800 }, { year: 'FY29E', rev: 13300 } ] },
]

const newsData = [
  { title: 'National Infrastructure Pipeline crosses ₹100 Lakh Cr deployed; ₹143B annual capex', date: '2026-08-05', region: 'National', source: 'Ministry of Finance', sentiment: 'positive', summary: 'Cumulative NIP deployment has crossed ₹100 Lakh Cr with annual infrastructure capex at ~$143B. Roads, railways, and power lead spending, with private participation rising via HAM and InvIT structures.' },
  { title: 'Gati Shakti master plan accelerates multi-modal connectivity across 10 corridors', date: '2026-07-20', region: 'National', source: 'PIB', sentiment: 'positive', summary: 'The PM Gati Shakti national master plan is accelerating integrated planning across road, rail, port, and logistics corridors, reducing project delays and improving last-mile connectivity for industrial clusters.' },
  { title: 'Post-collapse tunnel safety audit mandated for all Himalayan projects', date: '2026-07-02', region: 'North', source: 'MoRTH', sentiment: 'negative', summary: 'Following tunnel incidents in the Himalayan region, authorities have mandated comprehensive geotechnical and escape-provision audits for all under-construction tunnels, tightening safety standards for challenging terrain.' },
  { title: 'Record ₹2.6 Lakh Cr railway capex sustained in Union Budget FY27', date: '2026-06-15', region: 'National', source: 'Indian Railways', sentiment: 'positive', summary: 'Railway capex remains at record levels (~₹2.6 Lakh Cr), funding dedicated freight corridors, station redevelopment, Vande Bharat expansion, and electrification — a major demand driver for steel, cement, and EPC.' },
  { title: 'Climate-resilience design norms for highways & bridges revised upward', date: '2026-05-28', region: 'National', source: 'IRC', sentiment: 'neutral', summary: 'The Indian Roads Congress has revised drainage, scour-protection, and slope-stability design standards to reflect climate-change-intensified rainfall, requiring higher design flood levels for new highway and bridge projects.' },
  { title: 'India crosses 500 GW installed power capacity; renewables at 45%', date: '2026-05-10', region: 'National', source: 'CEA', sentiment: 'positive', summary: 'India\'s total installed power capacity has crossed 500 GW with renewables (solar, wind, hydro) contributing ~45%. Grid-scale battery storage tenders are accelerating to manage renewable intermittency.' },
]

export default function InfrastructureDashboard() {
  const navigate = useNavigate()
  const { username, role } = useAuthStore()
  const isAdmin = role === 'admin'
  const [activeTab, setActiveTab] = useState<InfraTab>('overview')

  const tabs: { id: InfraTab; label: string; icon: typeof TrendingUp }[] = [
    { id: 'overview', label: 'Industry Overview', icon: Gauge },
    { id: 'business', label: 'Business 101', icon: Info },
    { id: 'ownership', label: 'Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'players', label: 'Players', icon: TrendingUp },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
    { id: 'game', label: 'Learn: Process Game', icon: Gamepad2 },
  ]

  return (
    <div className="min-h-screen font-mulish pb-12" style={{ backgroundColor: '#f7f9fc' }}>
      <DashboardHeader title="Infrastructure" />

      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id ? 'border-maroon text-maroon' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <tab.icon size={14} />{tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'business' && <BusinessModel data={INFRASTRUCTURE_BUSINESS} />}
        {activeTab === 'ownership' && <OwnershipTab />}
        {activeTab === 'risk' && <RiskTabWithProjection />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="infrastructure" />}
        {activeTab === 'game' && <ProcessGame data={INFRASTRUCTURE_GAME} />}
      </main>

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

const productMixInfo: Record<string, { share: string; whatItIs: string; keyUse: string; players: string }> = {
  'Roads & Highways': {
    share: '30% of investment',
    whatItIs: 'The largest infrastructure segment — national/state highways, expressways, bridges, and tunnels. Built via EPC, BOT (toll), and Hybrid Annuity Model (HAM) contracts, with NHAI as the nodal authority.',
    keyUse: 'Backbone of freight and passenger movement. Driven by Bharatmala, expressway corridors, and NHAI\'s TOT asset-monetisation pipeline. A major demand driver for steel and cement.',
    players: 'L&T, IRB Infrastructure, PNC Infratech, Dilip Buildcon, NHAI',
  },
  'Industrial & Manufacturing': {
    share: '14% of investment',
    whatItIs: 'Industrial and manufacturing infrastructure — the fast-growing upcoming segment. It covers industrial corridors (Delhi-Mumbai, Chennai-Bengaluru, Amritsar-Kolkata), PLI-backed factories and plug-and-play industrial parks, greenfield manufacturing plants (semiconductors, EV/battery, electronics, solar), and warehousing/logistics parks under PM Gati Shakti.',
    keyUse: 'Builds the physical base for the "Make in India" and PLI manufacturing push — factory shells, common effluent/utility infrastructure, internal roads, and multi-modal logistics parks. A rising demand driver for EPC contractors, steel, cement, and pre-engineered buildings as new plants come up.',
    players: 'L&T, Tata Projects, Kalpataru, NCC, DMIC/NICDC (corridor authority), pre-engineered-building (PEB) firms',
  },
  'Transmission & Grid': {
    share: '18% of investment',
    whatItIs: 'Power transmission and grid infrastructure — extra-high-voltage (400/765 kV) lines, towers, substations, and the national grid backbone. This is the transmission/evacuation network, not power generation.',
    keyUse: 'Evacuates power from generation zones to demand centres and is critical to integrating renewables (solar/wind corridors). Grid expansion, green-energy corridors, and HVDC links drive investment.',
    players: 'Power Grid Corp (POWERGRID), KEC International, Sterlite Power, Adani Energy Solutions, L&T',
  },
  'Urban/Metro': {
    share: '16% of investment',
    whatItIs: 'Urban infrastructure — metro rail, water supply, sewerage, smart-city and housing works. Metro networks are expanding rapidly across 20+ Indian cities.',
    keyUse: 'Addresses rapid urbanisation and congestion. Metro and urban-transit projects are capital-intensive, multi-year builds with strong government funding.',
    players: 'L&T, Afcons, NCC, J Kumar Infraprojects',
  },
  'Railways': {
    share: '13% of investment',
    whatItIs: 'Railway infrastructure — dedicated freight corridors (DFC), station redevelopment, electrification, high-speed rail, and Vande Bharat rolling stock. Record ~₹2.6 Lakh Cr annual capex.',
    keyUse: 'Shifts freight from road to rail and modernises passenger travel. A sustained, budget-backed demand driver for EPC, steel, and cement.',
    players: 'L&T, RVNL, IRCON, KEC, Titagarh (rolling stock)',
  },
  'Airports/Aviation': {
    share: '5% of investment',
    whatItIs: 'Airport infrastructure — terminals, runways, ATC, and ground handling — plus greenfield airports. Largely developed under 30-year concession/PPP models with AERA-regulated tariffs.',
    keyUse: 'Gateways for India\'s fast-growing aviation traffic. Operators earn regulated aero charges plus high-margin non-aero (retail, F&B, real estate) revenue. Record passenger growth drives terminal expansion.',
    players: 'GMR Airports, Adani Airports, AAI, GVK (legacy), Tata (via Air India ecosystem)',
  },
  'Ports': {
    share: '4% of investment',
    whatItIs: 'Maritime ports and cargo terminals — container, bulk, and multi-cargo — developed via landlord-port and PPP models. Serve EXIM trade and coastal shipping.',
    keyUse: 'Enable foreign trade and industrial logistics. Capacity expansion, mechanisation, and Sagarmala-led port modernisation drive investment; transhipment hubs reduce dependence on foreign ports.',
    players: 'Adani Ports (APSEZ), JSW Infrastructure, DP World, Major Port Authorities',
  },
}

// ===== UPCOMING / UNDER-CONSTRUCTION MANUFACTURING & INFRA PROJECTS =====
type ProjectStatus = 'Under Construction' | 'Announced' | 'Planned'
interface UpcomingProject {
  name: string
  category: 'Manufacturing' | 'Industrial Corridor' | 'Logistics/Warehousing' | 'Transport' | 'Energy'
  developer: string
  location: string
  value: string
  completion: string
  status: ProjectStatus
  detail: string
}

const upcomingProjects: UpcomingProject[] = [
  { name: 'Dholera Semiconductor Fab (Tata–PSMC)', category: 'Manufacturing', developer: 'Tata Electronics + PSMC', location: 'Dholera, Gujarat', value: '₹91,000 Cr', completion: '2026-27', status: 'Under Construction',
    detail: 'India\'s first large commercial semiconductor fab, being built in the Dholera Special Investment Region. A landmark "Make in India" manufacturing-infrastructure project needing massive cleanroom, ultra-pure water, and power infrastructure.' },
  { name: 'Micron ATMP Assembly & Test Plant', category: 'Manufacturing', developer: 'Micron Technology', location: 'Sanand, Gujarat', value: '₹22,500 Cr', completion: '2025-26', status: 'Under Construction',
    detail: 'A semiconductor assembly, test, marking and packaging (ATMP) facility — the first phase of India\'s chip ecosystem, backed by the India Semiconductor Mission and state incentives.' },
  { name: 'Tata–Agratas EV Battery Gigafactory', category: 'Manufacturing', developer: 'Agratas (Tata Sons)', location: 'Sanand, Gujarat & Somnathpura, Karnataka', value: '₹40,000 Cr+', completion: '2026 onwards', status: 'Under Construction',
    detail: 'Lithium-ion cell gigafactory (20+ GWh) to supply Tata\'s EV and storage demand. Part of the fast-growing EV/battery manufacturing-infrastructure wave under the PLI ACC scheme.' },
  { name: 'Delhi–Mumbai Industrial Corridor (DMIC)', category: 'Industrial Corridor', developer: 'NICDC (Govt of India)', location: '7 states along DFC', value: '₹8+ Lakh Cr (programme)', completion: 'Phased to 2030s', status: 'Under Construction',
    detail: 'India\'s flagship industrial corridor with plug-and-play smart industrial cities (Dholera, Shendra-Bidkin, Integrated Manufacturing Clusters) built along the Western Dedicated Freight Corridor — trunk infrastructure for large-scale manufacturing.' },
  { name: 'Chennai–Bengaluru Industrial Corridor', category: 'Industrial Corridor', developer: 'NICDC + TN/KA/AP', location: 'Tamil Nadu, Karnataka, Andhra Pradesh', value: '₹1+ Lakh Cr', completion: 'Phased', status: 'Announced',
    detail: 'A multi-node industrial corridor creating manufacturing nodes and common utility/effluent infrastructure across three southern states to attract auto, electronics, and engineering plants.' },
  { name: 'PM Gati Shakti Multi-Modal Logistics Parks', category: 'Logistics/Warehousing', developer: 'NHLML / State + Private', location: 'Pan-India (35+ MMLPs)', value: '₹1.3+ Lakh Cr', completion: 'Rolling to 2030', status: 'Under Construction',
    detail: 'A network of Multi-Modal Logistics Parks integrating road, rail, and waterways with modern warehousing — cutting logistics cost and serving manufacturing clusters. A core "upcoming" demand driver for EPC and PEB builders.' },
  { name: 'PLI Electronics & Mobile Manufacturing Clusters', category: 'Manufacturing', developer: 'Foxconn, Dixon, Tata & others', location: 'Tamil Nadu, UP, Karnataka', value: '₹50,000 Cr+ (aggregate)', completion: '2025-27', status: 'Under Construction',
    detail: 'Multiple large electronics/mobile plants and component units coming up under the PLI scheme, each requiring factory shells, power, water, and logistics — the fastest-growing manufacturing-infrastructure segment.' },
  { name: 'Green Hydrogen / Ammonia Plants (coastal)', category: 'Energy', developer: 'Reliance, Adani, ACME, L&T', location: 'Gujarat, Odisha, Andhra coast', value: '₹2+ Lakh Cr (announced)', completion: '2027 onwards', status: 'Announced',
    detail: 'Large green-hydrogen and green-ammonia manufacturing complexes under the National Green Hydrogen Mission, needing electrolyser plants, renewable capacity, and port/export infrastructure.' },
  { name: 'Jewar (Noida International) Airport', category: 'Transport', developer: 'Yamuna Intl Airport (Zurich AP)', location: 'Jewar, Uttar Pradesh', value: '₹30,000 Cr+', completion: '2025 onwards', status: 'Under Construction',
    detail: 'A large greenfield airport anchoring an airport-city and industrial/MRO manufacturing zone — combining transport and industrial infrastructure in the NCR region.' },
  { name: 'Bulk Drug & Medical Device Parks (PLI)', category: 'Manufacturing', developer: 'State IDCs + Private', location: 'Gujarat, Himachal, AP, Telangana', value: '₹15,000 Cr+', completion: '2025-27', status: 'Planned',
    detail: 'Dedicated bulk-drug and medical-device manufacturing parks with common utilities and effluent treatment, built to cut API import dependence — a targeted manufacturing-infrastructure push.' },
]

// Wraps the (unchanged) Risk Analysis with a sub-tab for Future Projection / Upcoming Projects.
function RiskTabWithProjection() {
  const [sub, setSub] = useState<'risk' | 'projection'>('risk')
  const subTabs: { id: 'risk' | 'projection'; label: string; icon: typeof ShieldAlert }[] = [
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'projection', label: 'Future Projection', icon: HardHat },
  ]
  return (
    <div className="space-y-4">
      {/* Sub-tab switcher */}
      <div className="flex gap-2 flex-wrap">
        {subTabs.map((t) => (
          <button key={t.id} onClick={() => setSub(t.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition ${sub === t.id ? 'bg-maroon text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>
      {sub === 'risk' && <InfrastructureRiskAnalysis />}
      {sub === 'projection' && <UpcomingTab />}
    </div>
  )
}

function UpcomingTab() {
  const [filter, setFilter] = useState<'All' | UpcomingProject['category']>('All')
  const [selected, setSelected] = useState<UpcomingProject | null>(null)

  const categories: Array<'All' | UpcomingProject['category']> = ['All', 'Manufacturing', 'Industrial Corridor', 'Logistics/Warehousing', 'Energy', 'Transport']
  const list = filter === 'All' ? upcomingProjects : upcomingProjects.filter((p) => p.category === filter)

  const underConstruction = upcomingProjects.filter((p) => p.status === 'Under Construction').length
  const mfgCount = upcomingProjects.filter((p) => p.category === 'Manufacturing').length

  const statusStyle = (s: ProjectStatus) =>
    s === 'Under Construction' ? 'bg-green-100 text-green-700'
      : s === 'Announced' ? 'bg-amber-100 text-amber-700'
      : 'bg-gray-100 text-gray-600'

  const catColor: Record<UpcomingProject['category'], string> = {
    'Manufacturing': '#B02A30', 'Industrial Corridor': '#0891b2', 'Logistics/Warehousing': '#7c3aed', 'Transport': '#1e40af', 'Energy': '#16a34a',
  }

  return (
    <div className="space-y-6">
      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-maroon">{upcomingProjects.length}</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Upcoming Projects</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-green-600">{underConstruction}</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Under Construction</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-navy">{mfgCount}</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Manufacturing Plants</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-orange-600">₹14L Cr+</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Announced Value</div></div>
      </div>

      {/* Header + filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-lg font-bold text-navy flex items-center gap-2"><HardHat size={18} className="text-maroon" /> Upcoming & Under-Construction Projects</h3>
            <p className="text-xs text-gray-500 mt-1">Major upcoming manufacturing & industrial-infrastructure projects. Click any project for details.</p>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition ${filter === c ? 'bg-maroon text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          {list.map((p, i) => (
            <button key={i} onClick={() => setSelected(p)}
              className="text-left bg-gray-50 rounded-xl border border-gray-100 p-4 transition hover:shadow-md hover:border-gray-300">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-navy text-sm leading-snug">{p.name}</h4>
                <span className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full ${statusStyle(p.status)}`}>{p.status}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: catColor[p.category] }}>{p.category}</span>
                <span className="text-[11px] text-gray-500 flex items-center gap-1"><MapPin size={11} /> {p.location}</span>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="font-black text-maroon">{p.value}</span>
                <span className="text-gray-500 flex items-center gap-1"><Clock size={11} /> {p.completion}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="text-[9px] text-gray-400 mt-4">Indicative pipeline of major announced/under-construction projects. Sources: NICDC, India Semiconductor Mission, PIB, company disclosures.</p>
      </div>

      {/* Detail popup */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <HardHat size={18} className="text-maroon" />
                <h3 className="text-base font-bold text-navy leading-tight">{selected.name}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 shrink-0"><X size={20} /></button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: catColor[selected.category] }}>{selected.category}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyle(selected.status)}`}>{selected.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center"><div className="text-sm font-black text-maroon">{selected.value}</div><div className="text-[10px] text-gray-500">Project Value</div></div>
              <div className="p-3 bg-gray-50 rounded-lg text-center"><div className="text-sm font-black text-navy">{selected.completion}</div><div className="text-[10px] text-gray-500">Target</div></div>
              <div className="p-3 bg-gray-50 rounded-lg text-center"><div className="text-sm font-black text-orange-600 leading-tight">{selected.location.split(',')[0]}</div><div className="text-[10px] text-gray-500">Location</div></div>
            </div>
            <div className="mb-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Developer</span>
              <p className="text-sm text-gray-700 mt-0.5">{selected.developer}</p>
            </div>
            <div className="mb-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">About the project</span>
              <p className="text-sm text-gray-700 leading-relaxed mt-1">{selected.detail}</p>
            </div>
            <div className="mt-2 p-2.5 bg-gray-50 rounded-lg"><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Full location</span><p className="text-sm text-gray-700 mt-0.5">{selected.location}</p></div>
          </div>
        </div>
      )}
    </div>
  )
}

function OverviewTab() {
  const d = overviewData
  const [segmentPopup, setSegmentPopup] = useState<string | null>(null)
  const info = segmentPopup ? productMixInfo[segmentPopup] : null
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-maroon">$<AnimatedCounter end={d.investment} />B</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Annual Capex</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-navy"><AnimatedCounter end={d.gdpShare} decimals={1} />%</div><div className="text-[10px] font-semibold text-gray-500 mt-1">GDP Share</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-green-600"><AnimatedCounter end={d.growth} decimals={1} />%</div><div className="text-[10px] font-semibold text-gray-500 mt-1">CAGR</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-orange-600"><AnimatedCounter end={d.roadNetwork} decimals={1} />M km</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Road Network</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-blue-700"><AnimatedCounter end={d.employment} />M</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Employment</div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Investment Split by Segment (%)</h3>
          <p className="text-xs text-gray-500 mb-3">Click any segment for a detailed explanation</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={d.segmentSplit} dataKey="share" nameKey="segment" cx="50%" cy="50%" outerRadius={100} label={(e: any) => `${e.segment}: ${e.share}%`} labelLine={false} fontSize={10}
                onClick={(data: any) => setSegmentPopup(data.segment)}>
                {d.segmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} className="cursor-pointer hover:opacity-80 transition" />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Annual Infrastructure Capex ($B)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={d.yearlyGrowth}>
              <defs><linearGradient id="infraGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#334155" stopOpacity={0.3} /><stop offset="95%" stopColor="#334155" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={11} /><YAxis fontSize={11} /><Tooltip formatter={(v: number) => `$${v}B`} />
              <Area type="monotone" dataKey="value" stroke="#334155" strokeWidth={2} fill="url(#infraGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-navy mb-4">Sector-wise Capex (₹ '000 Cr, FY25)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={d.capex}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="sector" fontSize={9} angle={-15} textAnchor="end" height={50} /><YAxis fontSize={10} /><Tooltip formatter={(v: number) => `₹${v},000 Cr`} />
              <Bar dataKey="spend" radius={[4,4,0,0]}>{d.capex.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}<LabelList dataKey="spend" position="top" fontSize={9} /></Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-2">Source: Union Budget 2024-25, NIP, Ministry data</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-navy mb-2 self-start">Sector Health</h3>
          <HealthGauge score={78} label="Infrastructure Health" size="lg" />
          <p className="text-[11px] text-gray-500 text-center mt-3 leading-relaxed">Strong government capex, record order books, and rising private participation keep the sector healthy, tempered by execution and leverage risk.</p>
        </div>
      </div>

      {segmentPopup && info && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSegmentPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-lg font-bold text-navy">{segmentPopup}</h3>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-maroon/10 text-maroon">{info.share}</span>
              </div>
              <button onClick={() => setSegmentPopup(null)} className="text-gray-400 hover:text-gray-600 shrink-0"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">What it is</span><p className="text-sm text-gray-700 leading-relaxed mt-1">{info.whatItIs}</p></div>
              <div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Key uses / demand</span><p className="text-sm text-gray-700 leading-relaxed mt-1">{info.keyUse}</p></div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Key players</span><p className="text-sm text-gray-700 mt-1">{info.players}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function OwnershipTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Sector Ownership / Developer Mix (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ownershipData} dataKey="share" nameKey="type" cx="50%" cy="50%" outerRadius={110} label={(e: any) => `${e.share}%`} labelLine={false} fontSize={11}>
                {ownershipData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Who Builds & Owns India's Infrastructure</h3>
          <div className="space-y-3">
            {ownershipData.map((o, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="flex-1 text-sm font-semibold text-navy">{o.type}</span>
                <span className="text-sm font-bold text-maroon">{o.share}%</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">Public bodies (NHAI, NTPC, Power Grid, state agencies) still command the largest share, but private EPC firms, InvITs, and foreign/PE capital are steadily rising through HAM, BOT, and asset-monetisation models.</p>
        </div>
      </div>
    </div>
  )
}

function GeographyTab() {
  const ranked = [...geographyData].sort((a, b) => b.share - a.share)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const info = selectedRegion ? geographyData.find((g) => g.region === selectedRegion) : null
  const rank = info ? ranked.findIndex((g) => g.region === info.region) + 1 : 0

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Regional Infrastructure Investment Share (%)</h3>
        <p className="text-xs text-gray-500 mb-4">Click any bar to see why that region leads.</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={geographyData} onClick={(d: any) => { if (d && d.activePayload) setSelectedRegion(d.activePayload[0]?.payload?.region) }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="region" fontSize={11} />
            <YAxis fontSize={10} unit="%" />
            <Tooltip formatter={(v: number) => `${v}%`} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Bar dataKey="share" radius={[4, 4, 0, 0]} cursor="pointer">
              {geographyData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              <LabelList dataKey="share" position="top" fontSize={10} formatter={(v: number) => `${v}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Region cards (also clickable) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {geographyData.map((g, i) => (
          <button key={i} onClick={() => setSelectedRegion(g.region)}
            className="text-left bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition hover:shadow-md cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-maroon" />
              <h4 className="font-bold text-navy">{g.region}</h4>
              <span className="ml-auto text-sm font-bold text-maroon">{g.share}%</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{g.projects}</p>
          </button>
        ))}
      </div>
      <p className="text-[9px] text-gray-400">Indicative regional split of infrastructure investment. Source: NIP, ministry and industry estimates.</p>

      {/* Detail popup */}
      {info && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRegion(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-maroon" />
                <h3 className="text-lg font-bold text-navy">{info.region} Region</h3>
              </div>
              <button onClick={() => setSelectedRegion(null)} className="text-gray-400 hover:text-gray-600 shrink-0"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center"><div className="text-xl font-black text-navy">{info.share}%</div><div className="text-[10px] text-gray-500">Investment Share</div></div>
              <div className="p-3 bg-gray-50 rounded-lg text-center"><div className="text-xl font-black text-orange-600">#{rank}</div><div className="text-[10px] text-gray-500">National Rank</div></div>
            </div>
            <div className="mb-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Why this region leads</span>
              <p className="text-sm text-gray-700 leading-relaxed mt-1">{info.reason}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Key projects</span>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed">{info.keyProjects}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Group players by broad business type for bubble-map colour coding
const segmentGroup = (seg: string): string => {
  const s = seg.toLowerCase()
  if (s.includes('epc') || s.includes('t&d')) return 'EPC Contractor'
  if (s.includes('power') || s.includes('transmission')) return 'Power / Grid'
  if (s.includes('road') || s.includes('highway')) return 'Roads'
  if (s.includes('port') || s.includes('airport')) return 'Assets (Ports/Airports)'
  return 'Other'
}
const GROUP_COLORS: Record<string, string> = {
  'EPC Contractor': '#B02A30',
  'Power / Grid': '#16a34a',
  'Roads': '#1e40af',
  'Assets (Ports/Airports)': '#F99D27',
  'Other': '#94a3b8',
}

function PlayersTab() {
  const fmtCr = (v: number) => v >= 100000 ? `₹${(v / 100000).toFixed(2)} L Cr` : `₹${(v / 1000).toFixed(0)} k Cr`
  const sorted = [...playersData].sort((a, b) => b.revenue - a.revenue)
  const medal = ['#F5B301', '#B8B8B8', '#CD7F32'] // gold / silver / bronze

  // bubble-map points: x = revenue (₹k Cr), y = EBITDA margin %, z = order book
  const bubbleData = playersData.map((p) => ({
    x: Math.round(p.revenue / 1000),
    y: p.ebitdaMargin,
    z: p.orderBookCr,
    name: p.name,
    segment: p.segment,
    group: segmentGroup(p.segment),
    revenue: p.revenue,
    orderBookCr: p.orderBookCr,
  }))
  const groups = Array.from(new Set(bubbleData.map((d) => d.group)))
  const avgMargin = Math.round(playersData.reduce((s, p) => s + p.ebitdaMargin, 0) / playersData.length)

  return (
    <div className="space-y-6">
      {/* HERO: COMPETITIVE LANDSCAPE BUBBLE MAP */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Competitive Landscape</h3>
        <p className="text-xs text-gray-500 mb-3">
          Scale (revenue) vs profitability (EBITDA margin). Bubble size = order book. Colour = business type.
          Hover a bubble for details.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-2">
          {groups.map((g) => (
            <span key={g} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-600">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: GROUP_COLORS[g] }} /> {g}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 ml-auto">◯ bubble size = order book</span>
        </div>

        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" dataKey="x" name="Revenue" unit="k Cr" fontSize={10}
              label={{ value: 'Revenue (₹ thousand Cr) →', position: 'bottom', offset: 15, fontSize: 11, fill: '#64748b' }} />
            <YAxis type="number" dataKey="y" name="EBITDA Margin" unit="%" fontSize={10}
              label={{ value: 'EBITDA Margin % →', angle: -90, position: 'insideLeft', offset: 20, fontSize: 11, fill: '#64748b' }} />
            <ZAxis type="number" dataKey="z" range={[120, 1400]} name="Order Book" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }: any) => {
              if (!active || !payload || !payload.length) return null
              const d = payload[0].payload
              return (
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-xs">
                  <div className="font-bold text-navy">{d.name}</div>
                  <div className="text-gray-500 mb-1">{d.segment}</div>
                  <div>Revenue: <span className="font-bold text-maroon">{fmtCr(d.revenue)}</span></div>
                  <div>EBITDA margin: <span className="font-bold text-green-600">{d.y}%</span></div>
                  <div>Order book: <span className="font-bold text-blue-700">{fmtCr(d.orderBookCr)}</span></div>
                </div>
              )
            }} />
            {groups.map((g) => (
              <Scatter key={g} name={g} data={bubbleData.filter((d) => d.group === g)} fill={GROUP_COLORS[g]} fillOpacity={0.7}>
                <LabelList dataKey="name" position="top" fontSize={8} formatter={(v: string) => v.split(' ')[0]} />
              </Scatter>
            ))}
          </ScatterChart>
        </ResponsiveContainer>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-gray-500">
          <div className="p-2 bg-gray-50 rounded-lg">↗ <span className="font-semibold text-navy">Top-right</span> = large & high-margin (asset owners like POWERGRID, ports).</div>
          <div className="p-2 bg-gray-50 rounded-lg">↘ <span className="font-semibold text-navy">Bottom-right</span> = large scale but thin margins (EPC contractors like L&T, KEC).</div>
        </div>
        <p className="text-[9px] text-gray-400 mt-2">Industry average EBITDA margin ≈ {avgMargin}%. Figures are indicative estimates.</p>
      </div>

      {/* LEADERBOARD CARDS with mini sparkline */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-navy">Player Leaderboard</h3>
          <span className="text-[11px] text-gray-400">Ranked by revenue · 5-yr trend</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.map((p, i) => (
            <div key={p.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
              <div className="flex items-start gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white font-black text-sm shrink-0" style={{ backgroundColor: i < 3 ? medal[i] : '#005B75' }}>{i + 1}</span>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-navy leading-tight truncate" title={p.name}>{p.name}</h4>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full inline-block mt-0.5" style={{ backgroundColor: `${GROUP_COLORS[segmentGroup(p.segment)]}18`, color: GROUP_COLORS[segmentGroup(p.segment)] }}>{p.segment}</span>
                </div>
              </div>

              {/* revenue */}
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-lg font-black text-maroon">{fmtCr(p.revenue)}</span>
                <span className="text-[10px] text-gray-400">revenue</span>
              </div>

              {/* mini sparkline */}
              <div className="mt-1 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={p.projection} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`spark-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16a34a" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="rev" stroke="#16a34a" strokeWidth={2} fill={`url(#spark-${i})`} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* signature stats */}
              <div className="mt-2 flex items-center justify-between text-[10px]">
                <span className="text-gray-500">Order book <span className="font-bold text-blue-700">{fmtCr(p.orderBookCr)}</span></span>
                <span className="inline-flex items-center gap-0.5 font-bold text-green-600"><TrendingUp size={11} /> {p.cagr}%</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-gray-400 mt-4">Sparkline shows indicative FY25→FY29E revenue trend. Figures approximate. Source: Company filings, ministry reports.</p>
      </div>
    </div>
  )
}

function NewsTab() {
  return <NewsFeed title="Infrastructure Industry News & Developments" items={newsData} />
}
