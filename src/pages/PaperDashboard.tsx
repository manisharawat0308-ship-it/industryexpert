import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Calendar, Building2, Target, Star, XCircle, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, ComposedChart, LabelList, ScatterChart, Scatter, ZAxis,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'
import PlayersBoard, { PlayerRow } from '../components/PlayersBoard'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { PAPER_GAME } from '../components/process-game/data/paperGame'
import BusinessModel from '../components/BusinessModel'
import { PAPER_BUSINESS } from '../data/businessModels/paperBusiness'
import NewsFeed from '../components/NewsFeed'
import AnimatedCounter from '../components/AnimatedCounter'
import LiveTicker from '../components/LiveTicker'
import HealthGauge from '../components/HealthGauge'
import PaperRiskAnalysis from '../components/risk-analysis/PaperRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'

const COLORS = ['#B02A30', '#005B75', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722']

type PaperTab = 'overview' | 'business' | 'production' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot' | 'game'

// ===== SOURCE METADATA =====
const DATA_META = {
  lastUpdated: 'June 2025',
  source: 'IPMA, CPPRI, DPIIT, Company Annual Reports'
}

// ===== PAPER INDUSTRY DATA =====
const overviewData = {
  totalCapacity: 27.8,
  totalProduction: 24.5,
  utilizationRate: 88,
  globalRanking: 5,
  perCapitaConsumption: 16,
  globalPerCapita: 57,
  chinaPerCapita: 80,
  numberOfMills: 850,
  operationalMills: 526,
  segmentSplit: [
    { segment: 'Packaging Board', share: 35 },
    { segment: 'Writing & Printing', share: 30 },
    { segment: 'Specialty', share: 15 },
    { segment: 'Newsprint', share: 10 },
    { segment: 'Tissue', share: 10 },
  ],
  rawMaterialSplit: [
    { material: 'Waste Paper', share: 70 },
    { material: 'Wood Pulp', share: 15 },
    { material: 'Agro/Bagasse', share: 15 },
  ],
  yearlyGrowth: [
    { year: '2019-20', production: 18.2, capacity: 22.5 },
    { year: '2020-21', production: 16.8, capacity: 22.8 },
    { year: '2021-22', production: 20.5, capacity: 24.0 },
    { year: '2022-23', production: 22.8, capacity: 25.5 },
    { year: '2023-24', production: 24.0, capacity: 26.8 },
    { year: '2024-25', production: 24.5, capacity: 27.8 },
  ],
}

// ===== TIMELINE DATA =====
const timelineData = [
  { year: '1990', production: 3.0 },
  { year: '1995', production: 4.5 },
  { year: '2000', production: 6.0 },
  { year: '2005', production: 8.5 },
  { year: '2010', production: 10.5 },
  { year: '2015', production: 14.0 },
  { year: '2020', production: 18.2 },
  { year: '2025', production: 24.5 },
  { year: '2030P', production: 40.0 },
]

// ===== PER CAPITA COMPARISON =====
const perCapitaComparison = [
  { country: 'China', perCapita: 80 },
  { country: 'USA', perCapita: 67 },
  { country: 'Japan', perCapita: 62 },
  { country: 'Global Avg', perCapita: 57 },
  { country: 'Germany', perCapita: 55 },
  { country: 'Brazil', perCapita: 42 },
  { country: 'India', perCapita: 16 },
  { country: 'Africa Avg', perCapita: 8 },
]

// ===== PRODUCTION DATA =====
const productionData = {
  globalComparison: [
    { country: 'China', production: 120, color: '#dc2626' },
    { country: 'USA', production: 68, color: '#0369a1' },
    { country: 'Japan', production: 25, color: '#7c3aed' },
    { country: 'India', production: 24.5, color: '#B02A30' },
    { country: 'Germany', production: 22, color: '#64748b' },
    { country: 'Indonesia', production: 17, color: '#059669' },
    { country: 'South Korea', production: 12, color: '#ca8a04' },
    { country: 'Brazil', production: 11, color: '#0891b2' },
    { country: 'Finland', production: 10, color: '#be185d' },
    { country: 'Sweden', production: 9, color: '#9C27B0' },
  ],
  supplyDemand: [
    { year: 'FY20', production: 18.2, consumption: 19.0, exports: 0.8, imports: 2.1 },
    { year: 'FY21', production: 16.8, consumption: 17.5, exports: 0.7, imports: 1.9 },
    { year: 'FY22', production: 20.5, consumption: 21.5, exports: 1.0, imports: 2.4 },
    { year: 'FY23', production: 22.8, consumption: 24.0, exports: 1.2, imports: 2.8 },
    { year: 'FY24', production: 24.0, consumption: 25.2, exports: 1.4, imports: 3.0 },
    { year: 'FY25', production: 24.5, consumption: 25.8, exports: 1.5, imports: 3.2 },
  ],
  costComparison: [
    { country: 'India (Recycled)', cost: 420, type: 'Waste paper based' },
    { country: 'India (Wood)', cost: 520, type: 'Wood pulp based' },
    { country: 'China', cost: 480, type: 'Mixed' },
    { country: 'Indonesia', cost: 450, type: 'Wood pulp' },
    { country: 'Brazil', cost: 500, type: 'Eucalyptus pulp' },
    { country: 'Finland', cost: 600, type: 'Softwood pulp' },
    { country: 'USA', cost: 650, type: 'Mixed' },
    { country: 'Japan', cost: 700, type: 'Imported pulp' },
  ],
  capacityPipeline: [
    { company: 'ITC PSPD', capacity: 2.0, year: '2027', status: 'Under construction' },
    { company: 'JK Paper', capacity: 1.7, year: '2026', status: 'Under construction' },
    { company: 'West Coast Paper', capacity: 1.0, year: '2027', status: 'Planned' },
    { company: 'Emami Paper', capacity: 0.5, year: '2026', status: 'EC received' },
    { company: 'Century Textiles', capacity: 0.8, year: '2028', status: 'Planned' },
    { company: 'Kuantum Papers', capacity: 0.3, year: '2026', status: 'Under construction' },
  ],
}

// ===== PLAYERS DATA =====
const playersData = [
  { rank: 1, name: 'ITC Paperboards', capacity: 8.0, revenue: 8500, type: 'Private', products: 'Packaging Board, W&P, Specialty' },
  { rank: 2, name: 'JK Paper', capacity: 0.76, revenue: 6200, type: 'Private', products: 'W&P, Packaging Board, Copier' },
  { rank: 3, name: 'West Coast Paper', capacity: 0.65, revenue: 4800, type: 'Private', products: 'W&P, Packaging, Tissue' },
  { rank: 4, name: 'Emami Paper', capacity: 0.58, revenue: 2100, type: 'Private', products: 'Newsprint, W&P' },
  { rank: 5, name: 'Tamil Nadu Newsprint', capacity: 0.40, revenue: 1800, type: 'PSU', products: 'Newsprint, Printing' },
  { rank: 6, name: 'Century Textiles (Paper)', capacity: 0.35, revenue: 1500, type: 'Private', products: 'Tissue, W&P, Board' },
  { rank: 7, name: 'Kuantum Papers', capacity: 0.22, revenue: 1200, type: 'Private', products: 'Copier, Creamwove' },
  { rank: 8, name: 'Orient Paper', capacity: 0.20, revenue: 900, type: 'Private', products: 'W&P, Board' },
]

const ownershipSplit = [
  { type: 'Private', share: 95 },
  { type: 'PSU', share: 5 },
]

const radarData = [
  { metric: 'Capacity', ITC: 95, JKPaper: 45, WestCoast: 40, Emami: 35 },
  { metric: 'Revenue', ITC: 92, JKPaper: 68, WestCoast: 55, Emami: 28 },
  { metric: 'EBITDA Margin', ITC: 80, JKPaper: 65, WestCoast: 58, Emami: 45 },
  { metric: 'Sustainability', ITC: 90, JKPaper: 60, WestCoast: 50, Emami: 40 },
  { metric: 'Product Range', ITC: 85, JKPaper: 75, WestCoast: 60, Emami: 50 },
  { metric: 'Growth Rate', ITC: 70, JKPaper: 80, WestCoast: 65, Emami: 55 },
]

const marketShareMovement = [
  { year: 'FY21', ITC: 28, JKPaper: 12, WestCoast: 9, Emami: 6, Others: 45 },
  { year: 'FY22', ITC: 29, JKPaper: 12, WestCoast: 9, Emami: 6, Others: 44 },
  { year: 'FY23', ITC: 30, JKPaper: 13, WestCoast: 10, Emami: 6, Others: 41 },
  { year: 'FY24', ITC: 31, JKPaper: 13, WestCoast: 10, Emami: 5, Others: 41 },
  { year: 'FY25', ITC: 32, JKPaper: 14, WestCoast: 10, Emami: 5, Others: 39 },
]

// ===== GEOGRAPHY DATA =====
const geographyData = [
  { state: 'Tamil Nadu', capacity: 5.0, share: 18, plants: 'TNPL, ITC, Seshasayee, SPB', reason: "TNPL � India's largest PSU paper mill with bagasse-based production. Proximity to sugar mills provides abundant bagasse. Port access (Chennai, Tuticorin) for waste paper imports. Established writing paper cluster. ITC Kovai unit for specialty papers. Strong demand from educational institutions � TN has highest literacy-driven paper consumption in South." },
  { state: 'Andhra Pradesh / Telangana', capacity: 4.2, share: 15, plants: 'ITC Bhadrachalam, Andhra Paper, Raasi', reason: "ITC Bhadrachalam � India's single largest integrated paper mill (5+ lakh TPA). Extensive eucalyptus plantations in Godavari basin (ITC's social forestry covers 150K+ acres). Rich water availability from Krishna & Godavari rivers. Low labor cost. State government incentives for pulp & paper. Telangana's industrial policy promotes packaging mills near Hyderabad." },
  { state: 'Maharashtra', capacity: 3.3, share: 12, plants: 'Ballarpur (BILT), Recycled paper cluster Vapi-Silvassa', reason: "Proximity to India's largest paper consumption market (Mumbai). 200+ small recycled paper mills in Vapi-Silvassa-Daman corridor. Ballarpur Industries (now merged with ITC) � legacy W&P leader. Port access for waste paper imports (JNPT). Strong demand from FMCG packaging industry headquartered in Mumbai. Maharashtra consumes 15%+ of India's paper output." },
  { state: 'Gujarat', capacity: 2.8, share: 10, plants: 'Kraft paper cluster Ahmedabad, Shreyans, recycled mills', reason: "India's largest Kraft/corrugated paper cluster near Ahmedabad-Morbi. 150+ small recycled mills producing fluting and testliner. Port access (Mundra, Kandla) for OCC imports. Booming e-commerce packaging demand from Gujarat's export-oriented industries. Low power cost from industrial tariff. Pro-industry state with fast clearances." },
  { state: 'Madhya Pradesh', capacity: 2.5, share: 9, plants: 'Orient Paper (Amlai), Nepa Mills (Nepanagar)', reason: "Orient Paper's integrated mill at Amlai � one of India's oldest (1936). Nepa Mills (PSU) � specialized newsprint. Bamboo forests in Satpura range historically fed mills. Central location gives pan-India rail distribution advantage. Low land and labor cost. Rich water from Narmada basin." },
  { state: 'Karnataka', capacity: 2.2, share: 8, plants: 'West Coast Paper (Dandeli), MPPM, ITC unit', reason: "West Coast Paper's Dandeli mill � integrated wood-based, surrounded by 30,000 hectares of managed forests. Strong hardwood (eucalyptus, casuarina) availability in Western Ghats. Proximity to Bangalore � India's fastest growing metro. Good water availability from Kali river. Growing packaging demand from Bangalore's tech/startup ecosystem." },
  { state: 'Odisha', capacity: 1.9, share: 7, plants: 'JK Paper (CPM Rayagada), Emami Balasore', reason: "JK Paper's Central Pulp Mill at Rayagada � integrated wood-based with captive bamboo/eucalyptus plantations. Emami Paper's Balasore unit for newsprint. Abundant raw material (bamboo, hardwood) from Eastern Ghats. Low labor cost. Upcoming port connectivity improvements. State incentives under industrial policy 2022." },
  { state: 'Uttar Pradesh', capacity: 1.7, share: 6, plants: 'Star Paper (Saharanpur), Kuantum Papers, Century Pulp', reason: "Star Paper's Saharanpur mill � integrated unit with eucalyptus base. Kuantum Papers � copier paper specialist. Century Pulp & Paper at Lalkuan (now ITC). Proximity to North India's massive paper consumption market. Sugar belt provides bagasse for agro-based mills. Rail connectivity for pan-India dispatch." },
  { state: 'West Bengal', capacity: 1.4, share: 5, plants: 'Emami Paper, Bengal Paper Mill, ITC Tribeni', reason: "ITC's Tribeni unit for packaging board � close to Kolkata demand center. Emami Paper Mill (Dalhousie) for newsprint. Historical paper industry hub (Bengal Paper established 1887). Port access via Haldia for raw material imports. Strong demand from tea packaging (Assam/Darjeeling). Eastern India distribution advantage." },
  { state: 'Others', capacity: 2.8, share: 10, plants: 'Various regional mills across Rajasthan, Punjab, Kerala', reason: "Includes Punjab (Trident � tissue paper leader, Satia Industries), Rajasthan (small recycled mills), Kerala (small mills for packaging), Assam (Nagaon & Cachar Paper Mills � PSU, bamboo-based), Himachal Pradesh (agro-based). Fragmented but growing 6-8% driven by packaging demand from regional e-commerce and FMCG." },
]

// ===== NEWS DATA =====
const newsData = [
  { id: 1, title: 'ITC PSPD expands packaging board capacity by 2 lakh TPA at Bhadrachalam', date: '2026-08-10', region: 'South', category: 'Business Wins', url: '#', source: 'Business Standard', summary: 'The expansion strengthens ITC\'s leadership in virgin fibre packaging board amid rising demand from FMCG and pharma. The Bhadrachalam complex remains one of Asia\'s largest integrated paper facilities. The move supports import substitution in premium paperboard grades.' },
  { id: 2, title: 'Boiler explosion at paper mill in Ghaziabad kills 3 workers', date: '2026-07-18', region: 'North', category: 'Accidents', url: '#', source: 'PTI', summary: 'A boiler explosion during operations killed three workers and damaged part of the plant. Authorities ordered a safety audit and suspended operations pending inspection. The incident underscores pressure-vessel and maintenance risks at older mills.' },
  { id: 3, title: 'JK Paper completes 1.7 lakh TPA packaging board expansion at CPM', date: '2026-06-15', region: 'East', category: 'Business Wins', url: '#', source: 'Mint', summary: 'The Central Pulp Mills expansion boosts JK Paper\'s packaging board capacity to serve growing e-commerce and food-grade demand. It diversifies the company beyond writing and printing paper. Commissioning is expected to lift utilisation and margins.' },
  { id: 4, title: 'Govt announces new EPR guidelines for paper packaging waste', date: '2026-05-22', region: 'National', category: 'Policy', url: '#', source: 'Ministry of Environment', summary: 'Extended Producer Responsibility rules set collection and recycling targets for paper-based packaging. Brand owners must register and meet recycled-content obligations. The framework is expected to boost demand for recycled fibre and formal collection networks.' },
  { id: 5, title: 'West Coast Paper acquires recycled fibre mill in Gujarat for Rs 450 Cr', date: '2026-04-12', region: 'West', category: 'Business Wins', url: '#', source: 'Economic Times', summary: 'The acquisition secures recycled fibre supply and adds capacity in the western market. It hedges against volatile imported waste-paper prices. The deal aligns with the industry\'s shift toward circular raw-material sourcing.' },
  { id: 6, title: 'Fire destroys raw material yard at paper mill near Nashik, Rs 130 Cr loss', date: '2026-03-18', region: 'West', category: 'Accidents', url: '#', source: 'Business Standard', summary: 'A fire swept through the stored waste-paper and pulp yard, causing significant material loss. No fatalities were reported but production was disrupted for weeks. Insurers are assessing claims tied to combustible raw-material storage.' },
  { id: 7, title: 'CPCB issues closure notice to 12 UP paper mills for effluent violations', date: '2026-02-20', region: 'North', category: 'Policy', url: '#', source: 'Central Pollution Control Board', summary: 'The mills were flagged for exceeding effluent discharge norms into local water bodies. Operations must halt until Zero Liquid Discharge and treatment upgrades are verified. The action signals tighter environmental enforcement across the sector.' },
  { id: 8, title: 'Century Pulp & Paper acquisition by ITC completed for Rs 3,500 Cr', date: '2026-02-08', region: 'National', category: 'Business Wins', url: '#', source: 'Mint', summary: 'ITC\'s acquisition of Century Pulp & Paper adds substantial capacity and a northern manufacturing base. It consolidates ITC\'s position as the largest paperboard maker in India. Integration is expected to yield fibre-sourcing and logistics synergies.' },
]

// ===== MAIN COMPONENT =====
export default function PaperDashboard() {
  const [activeTab, setActiveTab] = useState<PaperTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tickerItems = [
    { label: 'Writing Paper', value: '?72,000/T', change: '+1.2%', direction: 'up' as const },
    { label: 'Kraft Paper', value: '?35,000/T', change: '+2.5%', direction: 'up' as const },
    { label: 'ITC Paper', value: '?468', change: '+0.8%', direction: 'up' as const },
    { label: 'JK Paper', value: '?425', change: '+1.5%', direction: 'up' as const },
    { label: 'Waste Paper Import', value: '$220/T', change: '-1.8%', direction: 'down' as const },
    { label: 'Wood Pulp (BHKP)', value: '$580/T', change: '+0.5%', direction: 'up' as const },
    { label: 'West Coast Paper', value: '?620', change: '+1.1%', direction: 'up' as const },
    { label: 'Corrugated Demand', value: 'Strong', change: '+12%', direction: 'up' as const },
  ]

  const tabs: { id: PaperTab; label: string; icon: any }[] = [
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

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      {/* Header */}
      <DashboardHeader title="Paper Industry Dashboard" />

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
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
        {activeTab === 'business' && <BusinessModel data={PAPER_BUSINESS} />}
        {activeTab === 'production' && <ProductionTab />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab isAdmin={isAdmin} />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="paper" />}
        {activeTab === 'game' && <ProcessGame data={PAPER_GAME} />}
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

// ===== OVERVIEW TAB =====
function OverviewTab() {
  const d = overviewData
  const [segmentPopup, setSegmentPopup] = useState<string | null>(null)
  const [rawMaterialPopup, setRawMaterialPopup] = useState<string | null>(null)

  const segmentDetails: Record<string, { description: string; subTypes: { name: string; share: string; use: string }[] }> = {
    'Writing & Printing': { description: 'Traditional paper for educational, office, and publishing use. Declining segment due to digitization but still significant in India due to large student population.', subTypes: [
      { name: 'Copier Paper (A4/A3)', share: '40%', use: 'Office printing, photocopying, laser/inkjet printers' },
      { name: 'Maplitho / Offset', share: '35%', use: 'Book printing, textbooks, diaries, calendars' },
      { name: 'Creamwove', share: '25%', use: 'Notebooks, registers, exam answer sheets, government stationery' },
    ]},
    'Packaging Board': { description: 'Fastest growing segment (8-10% CAGR) driven by e-commerce, FMCG, and food packaging. India is shifting from plastic to paper-based packaging under EPR norms.', subTypes: [
      { name: 'Duplex Board (Coated)', share: '40%', use: 'FMCG cartons, pharma boxes, consumer goods packaging' },
      { name: 'Kraft Paper / Liner', share: '35%', use: 'Corrugated boxes, e-commerce shipping, industrial packaging' },
      { name: 'Corrugated Medium (Fluting)', share: '25%', use: 'Inner layer of corrugated boxes, cushioning, void fill' },
    ]},
    'Newsprint': { description: 'Declining segment (-5% annually) due to digital media adoption. Many newsprint mills are pivoting to packaging board production. India imports significant newsprint from Russia, Canada.', subTypes: [
      { name: 'Standard Newsprint (45-48 GSM)', share: '70%', use: 'Daily newspapers, regional language press' },
      { name: 'Improved Newsprint (49-52 GSM)', share: '20%', use: 'Supplements, magazine inserts, advertising flyers' },
      { name: 'Super-Calendered Newsprint', share: '10%', use: 'Color supplements, glossy newspaper sections' },
    ]},
    'Specialty': { description: 'Niche high-value papers with technical specifications. Growing segment as India moves up the value chain. Largely import-dependent currently.', subTypes: [
      { name: 'Thermal Paper', share: '30%', use: 'ATM receipts, POS billing, airline boarding passes' },
      { name: 'Security Paper', share: '25%', use: 'Currency notes, passports, stamp papers, certificates' },
      { name: 'Filter Paper / Industrial', share: '25%', use: 'Tea bags, coffee filters, automotive filters, lab use' },
      { name: 'D�cor / Overlay Paper', share: '20%', use: 'Laminate surfaces, furniture, flooring overlays' },
    ]},
    'Tissue': { description: 'Fastest per capita growth potential � India at <0.5 kg vs Global 5 kg. Post-COVID awareness driving adoption. Century Textiles and Trident are leaders.', subTypes: [
      { name: 'Toilet Tissue', share: '40%', use: 'Household and commercial washrooms' },
      { name: 'Facial Tissue', share: '30%', use: 'Personal care, hospitality, retail' },
      { name: 'Kitchen Towels / Napkins', share: '30%', use: 'Food service, household cleaning, restaurants' },
    ]},
  }

  const rawMaterialDetails: Record<string, { description: string; facts: string[] }> = {
    'Waste Paper': { description: 'India is the world\'s largest importer of waste paper (recycled fibre). 70% of Indian paper production uses waste paper as primary raw material. Key grades: OCC (Old Corrugated Containers), ONP (Old Newspaper), Mixed Waste.', facts: [
      'India imports 7-8 MT of waste paper annually � mainly from USA, EU, Middle East',
      'Domestic waste paper collection rate is only 30% vs 60-70% in developed countries',
      'OCC prices highly volatile � ranged Rs 14-24/kg in last 3 years',
      'Chinese import policy changes directly impact global waste paper prices',
      'Quality of domestic waste paper is poor � high contamination rates (15-20%)',
    ]},
    'Wood Pulp': { description: 'Used by integrated mills (ITC, JK Paper, West Coast, Seshasayee). India uses hardwood (eucalyptus, casuarina, subabul) and some bamboo. FSC-certified plantations growing.', facts: [
      'ITC has 150,000+ acres of FSC-certified plantations � largest in Asia',
      'Eucalyptus clonal technology gives harvest in 4-5 years vs 20+ years for natural forest',
      'Wood pulp mills are energy self-sufficient � burn black liquor in recovery boilers',
      'Capital intensive: Rs 5,000+ Cr for a new 300 TPD integrated pulp line',
      'Limited expansion due to environmental clearance challenges for new plantations',
    ]},
    'Agro/Bagasse': { description: 'Sugarcane bagasse and wheat straw used by small/medium mills, especially in UP, Maharashtra, Tamil Nadu. Seasonal availability (Nov-Apr) and high silica content are challenges.', facts: [
      'TNPL (Tamil Nadu Newsprint) is world\'s largest bagasse-based paper mill',
      'Bagasse availability is seasonal � mills need 6-month inventory or alternate fibre',
      'High silica in agro-residue causes scaling in recovery systems � limits chemical recovery',
      'Straw-based mills face air pollution issues from open burning of rejects',
      'Government promotes agro-residue use to prevent crop stubble burning in North India',
    ]},
  }

  return (
    <div className="space-y-6">
      {/* Segment Popup */}
      {segmentPopup && segmentDetails[segmentPopup] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSegmentPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{segmentPopup}</h3>
              <button onClick={() => setSegmentPopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">�</button>
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

      {/* Raw Material Popup */}
      {rawMaterialPopup && rawMaterialDetails[rawMaterialPopup] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setRawMaterialPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{rawMaterialPopup}</h3>
              <button onClick={() => setRawMaterialPopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">�</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{rawMaterialDetails[rawMaterialPopup].description}</p>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2">Key Facts</h4>
            <ul className="space-y-2">
              {rawMaterialDetails[rawMaterialPopup].facts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-green-600 mt-0.5">�</span>
                  <span className="text-xs text-gray-700">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* KPI Cards with AnimatedCounter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2"><Factory className="text-maroon" size={20} /><span className="text-sm text-gray-500">Installed Capacity</span></div>
          <p className="text-2xl font-bold text-navy"><AnimatedCounter end={27.8} decimals={1} suffix=" MTPA" /></p>
          <p className="text-xs text-green-600 mt-1">FY 2024-25 (Source: IPMA)</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="text-navy" size={20} /><span className="text-sm text-gray-500">Paper Production</span></div>
          <p className="text-2xl font-bold text-navy"><AnimatedCounter end={24.5} decimals={1} suffix=" MT" /></p>
          <p className="text-xs text-green-600 mt-1">+4.2% YoY</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2"><Gauge className="text-orange" size={20} /><span className="text-sm text-gray-500">Utilization Rate</span></div>
          <p className="text-2xl font-bold text-navy"><AnimatedCounter end={88} suffix="%" /></p>
          <p className="text-xs text-green-600 mt-1">526 of 850 mills operational</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2"><Globe className="text-green-600" size={20} /><span className="text-sm text-gray-500">Global Ranking</span></div>
          <p className="text-2xl font-bold text-navy">#<AnimatedCounter end={5} /></p>
          <p className="text-xs text-green-600 mt-1">After China, USA, Japan, Germany</p>
        </div>
      </div>

      {/* Health Gauge + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <HealthGauge score={65} label="Paper Industry Health Score" size="md" />
          <div className="grid grid-cols-3 gap-2 mt-4 w-full text-center">
            <div className="p-1.5 bg-green-50 rounded-lg"><div className="text-[9px] font-bold text-green-700">Packaging</div><div className="text-xs font-black text-green-600">Booming</div></div>
            <div className="p-1.5 bg-amber-50 rounded-lg"><div className="text-[9px] font-bold text-amber-700">W&P Paper</div><div className="text-xs font-black text-amber-600">Declining</div></div>
            <div className="p-1.5 bg-green-50 rounded-lg"><div className="text-[9px] font-bold text-green-700">Capacity</div><div className="text-xs font-black text-green-600">Expanding</div></div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">India Paper Production Journey (1990?2030 Projected)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" fontSize={10} />
              <YAxis fontSize={11} domain={[0, 45]} />
              <Tooltip formatter={(v: number) => `${v} MT`} />
              <Area type="monotone" dataKey="production" stroke="#B02A30" fill="#B02A30" fillOpacity={0.25} name="Production (MT)" strokeWidth={2}>
                <LabelList dataKey="production" position="top" fontSize={9} fill="#B02A30" />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">3 MT (1990) ? 24.5 MT (2025) ? 40 MT projected (2030) | Source: IPMA Vision 2030</p>
        </div>
      </div>

      {/* Segment Split (clickable pie) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Paper Segment Split</h3>
        <p className="text-xs text-gray-500 mb-3">?? Click any segment for detailed sub-types and applications</p>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={d.segmentSplit} cx="50%" cy="50%" outerRadius={100} dataKey="share" nameKey="segment"
              label={({ segment, share }: any) => `${segment}: ${share}%`} labelLine
              onClick={(data: any) => setSegmentPopup(data.segment)}>
              {d.segmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} className="cursor-pointer hover:opacity-80 transition" />)}
            </Pie>
            <Tooltip formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
        <SourceFooter source="IPMA, CPPRI" />
      </div>

      {/* Per Capita Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Per Capita Paper Consumption � Global Comparison (kg/person)</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-maroon/5 rounded-xl">
            <div className="text-3xl font-bold text-maroon">{d.perCapitaConsumption} kg</div>
            <div className="text-sm text-gray-600 font-medium mt-1">India</div>
          </div>
          <div className="text-center p-4 bg-navy/5 rounded-xl">
            <div className="text-3xl font-bold text-navy">{d.globalPerCapita} kg</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Global Average</div>
          </div>
          <div className="text-center p-4 bg-orange/10 rounded-xl">
            <div className="text-3xl font-bold text-orange">{d.chinaPerCapita} kg</div>
            <div className="text-sm text-gray-600 font-medium mt-1">China</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
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
        <div className="bg-green-50 rounded-lg p-3 border border-green-100 mt-3">
          <p className="text-sm text-green-800">
            <strong>Growth Headroom:</strong> India's per capita at 16 kg is just 28% of global average (57 kg) and 20% of China (80 kg).
            With rising literacy, e-commerce packaging boom, and tissue adoption, per capita expected to reach 25 kg by 2030.
          </p>
        </div>
        <SourceFooter source="IPMA, CPPRI" />
      </div>

      {/* Raw Material Split (clickable) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Raw Material Split</h3>
        <p className="text-xs text-gray-500 mb-4">?? Click any segment to understand the raw material source, challenges, and facts</p>
        <div className="grid grid-cols-3 gap-4">
          {d.rawMaterialSplit.map((r, i) => (
            <button key={i} onClick={() => setRawMaterialPopup(r.material)} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-maroon/5 hover:border-maroon/30 border border-gray-200 transition cursor-pointer">
              <div className="text-2xl font-bold text-navy">{r.share}%</div>
              <div className="text-sm text-gray-600 font-medium mt-1">{r.material}</div>
              <div className="text-[9px] text-maroon font-semibold mt-1">Click for details ?</div>
            </button>
          ))}
        </div>
        <SourceFooter source="IPMA" />
      </div>

      {/* Production & Capacity Growth */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Production & Capacity Growth (MTPA)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={d.yearlyGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={9} />
            <YAxis fontSize={11} domain={[14, 30]} />
            <Tooltip formatter={(v: number) => `${v} MT`} />
            <Legend />
            <Area type="monotone" dataKey="capacity" stroke="#005B75" fill="#005B75" fillOpacity={0.15} name="Capacity (MTPA)" strokeWidth={2}>
              <LabelList dataKey="capacity" position="top" fontSize={9} fill="#005B75" />
            </Area>
            <Area type="monotone" dataKey="production" stroke="#B02A30" fill="#B02A30" fillOpacity={0.25} name="Production (MT)" strokeWidth={2}>
              <LabelList dataKey="production" position="bottom" fontSize={9} fill="#B02A30" />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
        <SourceFooter source="IPMA, CPPRI" />
      </div>
    </div>
  )
}

// ===== PRODUCTION TAB =====
function ProductionTab() {
  const [exportPopup, setExportPopup] = useState(false)
  const [importPopup, setImportPopup] = useState(false)

  return (
    <div className="space-y-6">
      {/* Export Popup */}
      {exportPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setExportPopup(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">Paper Exports from India</h3>
              <button onClick={() => setExportPopup(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">�</button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Total Exports (FY25):</strong> ~1.5 MT valued at Rs 12,000 Cr</p>
              <p><strong>Key Destinations:</strong> Middle East (30%), Africa (25%), SAARC (20%), SE Asia (15%)</p>
              <p><strong>Major Export Grades:</strong> Uncoated W&P paper, exercise book paper, duplex board</p>
              <p><strong>Growth Rate:</strong> 8-10% CAGR � driven by Africa/Middle East demand</p>
              <p><strong>Key Exporters:</strong> ITC, JK Paper, Tamil Nadu Newsprint, Seshasayee Paper</p>
            </div>
          </div>
        </div>
      )}

      {/* Import Popup */}
      {importPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setImportPopup(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">Paper Imports to India</h3>
              <button onClick={() => setImportPopup(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">�</button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Total Imports (FY25):</strong> ~3.2 MT valued at Rs 18,000 Cr</p>
              <p><strong>Key Sources:</strong> China (25%), Indonesia (20%), ASEAN (15%), Europe (15%)</p>
              <p><strong>Major Import Grades:</strong> Coated paper, newsprint, specialty papers, tissue parent reels</p>
              <p><strong>Concern:</strong> Cheap Chinese coated paper dumping at 15-20% below Indian cost</p>
              <p><strong>Anti-Dumping:</strong> Duty imposed on coated paper from China (ongoing investigation)</p>
              <p><strong>Waste Paper Imports:</strong> Additional 7-8 MT of waste paper imported as raw material</p>
            </div>
          </div>
        </div>
      )}

      {/* Global Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Global Paper Production Comparison (MT)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={productionData.globalComparison} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontSize={11} />
            <YAxis dataKey="country" type="category" fontSize={11} width={100} />
            <Tooltip formatter={(v: number) => `${v} MT`} />
            <Bar dataKey="production" name="Production (MT)" radius={[0, 4, 4, 0]}>
              {productionData.globalComparison.map((entry, i) => (
                <Cell key={i} fill={entry.country === 'India' ? '#B02A30' : '#005B75'} />
              ))}
              <LabelList dataKey="production" position="right" fontSize={10} formatter={(v: number) => `${v} MT`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">India is 4th largest paper producer globally. China dominates with 120 MT (nearly 30% of world production).</p>
        <SourceFooter source="RISI, FAO, IPMA" />
      </div>

      {/* Supply-Demand with clickable export/import */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Supply-Demand Balance (MT)</h3>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setExportPopup(true)} className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-xs font-semibold text-green-700 hover:bg-green-100 transition">?? Export Details</button>
          <button onClick={() => setImportPopup(true)} className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700 hover:bg-red-100 transition">?? Import Details</button>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={productionData.supplyDemand}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={10} />
            <YAxis fontSize={11} domain={[14, 28]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="production" fill="#005B75" name="Production (MT)" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="production" position="top" fontSize={9} />
            </Bar>
            <Bar dataKey="consumption" fill="#B02A30" name="Consumption (MT)" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="imports" stroke="#dc2626" strokeWidth={2} name="Imports (MT)" dot={{ fill: '#dc2626', r: 4 }} />
            <Line type="monotone" dataKey="exports" stroke="#059669" strokeWidth={2} name="Exports (MT)" dot={{ fill: '#059669', r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">India is a net importer � deficit met primarily by coated paper and newsprint imports from China/ASEAN.</p>
        <SourceFooter source="DGCIS, IPMA" />
      </div>

      {/* Cost Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Production Cost Comparison ($/tonne)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productionData.costComparison} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontSize={11} unit=" $" />
            <YAxis dataKey="country" type="category" fontSize={10} width={130} />
            <Tooltip formatter={(v: number) => `$${v}/tonne`} />
            <Bar dataKey="cost" name="Cost ($/tonne)" radius={[0, 4, 4, 0]}>
              {productionData.costComparison.map((entry, i) => (
                <Cell key={i} fill={entry.country.includes('India') ? '#B02A30' : '#005B75'} />
              ))}
              <LabelList dataKey="cost" position="right" fontSize={10} formatter={(v: number) => `$${v}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">India (recycled fibre) is cost-competitive globally. Integrated wood-based mills have higher cost but better quality output.</p>
        <SourceFooter source="RISI, IPMA" />
      </div>

      {/* Capacity Pipeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Capacity Expansion Pipeline</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">Company</th>
                <th className="text-right py-2 px-2 font-bold text-navy">New Capacity (MTPA)</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Target Year</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Status</th>
              </tr>
            </thead>
            <tbody>
              {productionData.capacityPipeline.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-cream/50">
                  <td className="py-2 px-2 font-semibold">{p.company}</td>
                  <td className="py-2 px-2 text-right font-bold text-navy">{p.capacity}</td>
                  <td className="py-2 px-2 text-center">{p.year}</td>
                  <td className="py-2 px-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      p.status === 'Under construction' ? 'bg-green-100 text-green-700' :
                      p.status === 'EC received' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Total pipeline: ~6.3 MTPA addition by 2028. Industry targeting 35 MTPA capacity by FY28.</p>
        <SourceFooter source="IPMA, Company Announcements" />
      </div>
    </div>
  )
}

// ===== PLAYERS TAB (merged with ownership) =====
function PlayersTab() {
  const rows: PlayerRow[] = playersData.map((p) => ({
    rank: p.rank,
    name: p.name,
    revenue: p.revenue,
    type: p.type,
    segment: p.products,
    primary: p.capacity,
  }))
  return (
    <PlayersBoard
      players={rows}
      config={{
        industryLabel: 'Paper',
        primaryLabel: 'Capacity (MTPA)',
        primaryUnit: ' MTPA',
        donutTitle: 'Private vs PSU Split',
      }}
    />
  )
}

function PlayersTabLegacy() {
  const [playerPopup, setPlayerPopup] = useState<string | null>(null)

  const playerDetails: Record<string, { hq: string; founded: string; plants: string; speciality: string; moat: string; outlook: string }> = {
    'ITC Paperboards': { hq: 'Secunderabad, Telangana', founded: '1925 (PSPD division)', plants: 'Bhadrachalam (AP), Tribeni (WB), Kovai (TN), Bollaram (TS)', speciality: 'India\'s largest. Packaging board market leader. 150K+ acres FSC plantations. Integrated wood-based. Serves ITC\'s own FMCG packaging needs.', moat: 'Backward integration into plantations, captive demand from ITC FMCG, recovery boiler energy self-sufficiency (70%+), largest R&D centre', outlook: 'Investing Rs 5,000 Cr in capacity expansion. Targeting 12.8 lakh TPA. Pivoting from W&P to premium packaging board.' },
    'JK Paper': { hq: 'New Delhi (JK Organisation)', founded: '1960', plants: 'CPM Rayagada (Odisha), JKPM Fort Songadh (Gujarat)', speciality: 'India\'s #2. Balanced W&P + packaging portfolio. Strong copier brand (JK Copier, JK Easy Copier). Growing packaging board aggressively.', moat: 'Dual-raw-material strategy (wood at CPM, recycled at JKPM), strong brand in copier segment, cost leadership in Gujarat recycled unit', outlook: 'Completed 1.7 lakh TPA packaging board expansion. Revenue target Rs 10,000 Cr by FY27. Evaluating greenfield in South India.' },
    'West Coast Paper': { hq: 'Dandeli, Karnataka', founded: '1955 (SKB Group)', plants: 'Dandeli (Karnataka), Recycled unit (AP)', speciality: 'Integrated wood-based mill in Western Ghats. 30,000 hectares managed forests. Premium W&P paper (Freedom, Doset brands). Expanding into tissue.', moat: 'Captive forest resources (unique in India), premium paper positioning, low-cost wood pulp from own plantations, remote location = low labor cost', outlook: 'Acquired recycled mill in AP. Entering tissue paper segment. Targeting Rs 6,000 Cr revenue by FY27.' },
    'Emami Paper': { hq: 'Kolkata (Emami Group)', founded: '1981', plants: 'Balasore (Odisha), Dalhousie (WB)', speciality: 'Newsprint focus � facing structural decline. Pivoting to packaging and W&P. One of few mills with both wood and recycled fibre capability.', moat: 'Low-cost newsprint production, proximity to Eastern India market, Emami Group financial backing for capex', outlook: 'Struggling with newsprint decline. Investing Rs 800 Cr to convert newsprint lines to packaging board. Critical transition period.' },
    'Tamil Nadu Newsprint': { hq: 'Karur, Tamil Nadu', founded: '1979 (Govt of TN)', plants: 'Kagithapuram (TN)', speciality: 'India\'s only PSU paper mill still profitable. Bagasse-based � world\'s largest single-location bagasse paper mill. Diversified into printing paper.', moat: 'Captive bagasse from TN sugar mills, PSU advantages (land/water), strong brand in South India (TNPL Copier)', outlook: 'Expanding printing paper capacity. Investing in cogeneration. Exploring tissue paper entry. Government evaluating partial disinvestment.' },
    'Century Textiles (Paper)': { hq: 'Mumbai (BK Birla Group)', founded: '1984 (paper division)', plants: 'Lalkuan (Uttarakhand)', speciality: 'India\'s tissue paper pioneer (Century brand). Also produces W&P and packaging board. Acquired by ITC in 2024 for Rs 3,500 Cr.', moat: 'First-mover in tissue paper, brand recognition (Century), integrated wood-based mill in Uttarakhand with eucalyptus base', outlook: 'Now part of ITC PSPD. Integration underway. Combined entity will be a tissue paper powerhouse. ITC total capacity crosses 12 lakh TPA.' },
    'Kuantum Papers': { hq: 'Saharanpur, UP', founded: '1994', plants: 'Saharanpur (UP)', speciality: 'Mid-size integrated mill. Strong in copier and creamwove paper. Eucalyptus-based with farm forestry model. Serves North India market.', moat: 'Farm forestry partnerships (8000+ farmers), strong local brand, low-cost wood procurement, location advantage for North India', outlook: 'Expansion from 0.22 to 0.35 MTPA underway. Entering packaging board segment. Revenue target Rs 2,000 Cr by FY27.' },
    'Orient Paper': { hq: 'Amlai, MP (CK Birla Group)', founded: '1936', plants: 'Amlai (MP)', speciality: 'One of India\'s oldest paper mills. Integrated with bamboo and hardwood base. Part of CK Birla Group. Produces W&P paper and cement from same location.', moat: 'Dual cement+paper operations sharing infrastructure, bamboo availability from Satpura forests, central India distribution advantage', outlook: 'Stable operations. Limited expansion planned. Focus on operational efficiency and debt reduction.' },
  }

  return (
    <div className="space-y-6">
      {/* Player Popup */}
      {playerPopup && playerDetails[playerPopup] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setPlayerPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{playerPopup}</h3>
              <button onClick={() => setPlayerPopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">�</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-gray-50 rounded-lg"><span className="text-[10px] font-bold text-gray-500 block">HQ</span><span className="text-xs text-navy font-semibold">{playerDetails[playerPopup].hq}</span></div>
                <div className="p-2 bg-gray-50 rounded-lg"><span className="text-[10px] font-bold text-gray-500 block">Founded</span><span className="text-xs text-navy font-semibold">{playerDetails[playerPopup].founded}</span></div>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <h5 className="text-[10px] font-bold text-blue-700 uppercase mb-1">Plants / Locations</h5>
                <p className="text-xs text-blue-800">{playerDetails[playerPopup].plants}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <h5 className="text-[10px] font-bold text-green-700 uppercase mb-1">Speciality & Position</h5>
                <p className="text-xs text-green-800">{playerDetails[playerPopup].speciality}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <h5 className="text-[10px] font-bold text-amber-700 uppercase mb-1">Competitive Moat</h5>
                <p className="text-xs text-amber-800">{playerDetails[playerPopup].moat}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                <h5 className="text-[10px] font-bold text-purple-700 uppercase mb-1">Outlook</h5>
                <p className="text-xs text-purple-800">{playerDetails[playerPopup].outlook}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ownership Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Ownership Split � Private vs PSU</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ownershipSplit} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="share" nameKey="type"
                label={({ type, share }: any) => `${type}: ${share}%`}>
                {ownershipSplit.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2">Paper industry is 95% private sector. Only TNPL remains as significant PSU. Nepa Mills (MP) is sick PSU under BIFR.</p>
          <SourceFooter source="IPMA" />
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Top 4 � Multi-Dimensional Comparison</h3>
          <p className="text-xs text-gray-500 mb-3">Scores normalized 0-100 across 6 dimensions</p>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" fontSize={10} tick={{ fill: '#1f2937' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={8} tick={{ fill: '#94a3b8' }} />
              <Radar name="ITC" dataKey="ITC" stroke="#B02A30" fill="#B02A30" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="JK Paper" dataKey="JKPaper" stroke="#005B75" fill="#005B75" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="West Coast" dataKey="WestCoast" stroke="#F99D27" fill="#F99D27" fillOpacity={0.08} strokeWidth={2} />
              <Radar name="Emami" dataKey="Emami" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.08} strokeWidth={2} />
              <Legend fontSize={10} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Share Movement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Market Share Movement (% of organized sector revenue)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={marketShareMovement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={10} />
            <YAxis fontSize={11} domain={[0, 50]} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="ITC" stackId="1" stroke="#B02A30" fill="#B02A30" fillOpacity={0.6} name="ITC" />
            <Area type="monotone" dataKey="JKPaper" stackId="1" stroke="#005B75" fill="#005B75" fillOpacity={0.5} name="JK Paper" />
            <Area type="monotone" dataKey="WestCoast" stackId="1" stroke="#F99D27" fill="#F99D27" fillOpacity={0.5} name="West Coast" />
            <Area type="monotone" dataKey="Emami" stackId="1" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.4} name="Emami" />
            <Area type="monotone" dataKey="Others" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} name="Others" />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">ITC consolidating � acquired Century Pulp in FY24. Top 4 now control ~60% of organized sector. 500+ small mills make up the 'Others' segment.</p>
        <SourceFooter source="IPMA, Company Annual Reports" />
      </div>

      {/* Clickable Players Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top Paper Companies</h3>
        <p className="text-xs text-gray-500 mb-4">?? Click any company name for detailed profile</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">#</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Company</th>
                <th className="text-right py-2 px-2 font-bold text-navy">Capacity (MTPA)</th>
                <th className="text-right py-2 px-2 font-bold text-navy">Revenue (? Cr)</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Type</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Key Products</th>
              </tr>
            </thead>
            <tbody>
              {playersData.map((p) => (
                <tr key={p.rank} className="border-b border-gray-50 hover:bg-cream/50 cursor-pointer" onClick={() => setPlayerPopup(p.name)}>
                  <td className="py-2 px-2 font-bold text-maroon">{p.rank}</td>
                  <td className="py-2 px-2 font-semibold text-blue-700 hover:underline">{p.name}</td>
                  <td className="py-2 px-2 text-right font-bold text-navy">{p.capacity}</td>
                  <td className="py-2 px-2 text-right">{p.revenue.toLocaleString()}</td>
                  <td className="py-2 px-2"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.type === 'PSU' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{p.type}</span></td>
                  <td className="py-2 px-2 text-xs text-gray-600">{p.products}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceFooter source="IPMA, Company Annual Reports, BSE/NSE" />
      </div>

      {/* Capacity Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Top Companies by Capacity (MTPA)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={playersData} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontSize={11} />
            <YAxis dataKey="name" type="category" fontSize={10} width={150} />
            <Tooltip formatter={(v: number) => `${v} MTPA`} />
            <Bar dataKey="capacity" name="Capacity (MTPA)" radius={[0, 4, 4, 0]} cursor="pointer">
              {playersData.map((_, i) => (
                <Cell key={i} fill={i === 0 ? '#B02A30' : i < 3 ? '#005B75' : '#94a3b8'} />
              ))}
              <LabelList dataKey="capacity" position="right" fontSize={9} formatter={(v: number) => `${v} MTPA`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">Note: ITC capacity is 10x larger than #2 player. Industry is highly concentrated at the top but fragmented in the long tail (500+ small mills).</p>
        <SourceFooter source="IPMA, Company Reports" />
      </div>
    </div>
  )
}

// ===== RISK TAB (PRESERVED) =====
function RiskTab({ isAdmin }: { isAdmin: boolean }) {
  return <PaperRiskAnalysis />
}

function RiskTabLegacy({ isAdmin }: { isAdmin: boolean }) {
  const [riskSubTab, setRiskSubTab] = useState<'overview' | 'heatmap' | 'comparison' | 'events' | 'casestudies' | 'mitigation' | 'news'>('overview')

  const industryRisks = [
    { id: 1, category: 'Raw Material Risk', risk: 'Waste paper price volatility & import dependency', severity: 'High', impact: 5, probability: 4, trend: '?', score: 8.5 },
    { id: 2, category: 'Energy & Fuel Cost Risk', risk: 'Coal & power cost escalation (30-40% of production cost)', severity: 'High', impact: 4, probability: 5, trend: '?', score: 8.2 },
    { id: 3, category: 'Environmental & ESG Risk', risk: 'NGT effluent discharge norms tightening & CPCB closure orders', severity: 'High', impact: 5, probability: 3, trend: '?', score: 7.8 },
    { id: 4, category: 'Regulatory & Policy Risk', risk: 'EPR (Extended Producer Responsibility) compliance costs', severity: 'Medium', impact: 3, probability: 4, trend: '?', score: 6.5 },
    { id: 5, category: 'Supply Chain Risk', risk: 'Railway wagon shortage for finished goods dispatch', severity: 'Medium', impact: 3, probability: 4, trend: '?', score: 6.2 },
    { id: 6, category: 'Import/Export Risk', risk: 'Cheap coated paper imports from China/Indonesia undercutting prices', severity: 'High', impact: 4, probability: 3, trend: '?', score: 6.8 },
    { id: 7, category: 'Demand & Market Risk', risk: 'Digital substitution eroding W&P paper demand at 3-4% annually', severity: 'Medium', impact: 4, probability: 5, trend: '?', score: 7.0 },
    { id: 8, category: 'Technology Risk', risk: 'Ageing paper machines (30+ years) with increasing breakdown frequency', severity: 'High', impact: 4, probability: 4, trend: '?', score: 7.5 },
    { id: 9, category: 'Financial Risk', risk: 'Working capital pressure from high raw material inventory (45-60 days)', severity: 'Medium', impact: 3, probability: 3, trend: '?', score: 5.8 },
    { id: 10, category: 'Climate & Natural Disaster', risk: 'Flood damage to riverside mills and raw material yards (spontaneous combustion)', severity: 'High', impact: 5, probability: 3, trend: '?', score: 7.2 },
  ]

  const riskComparison = [
    { risk: 'Raw Material Price', current: 8.5, lastMonth: 8.2, lastQuarter: 7.8, lastYear: 7.0 },
    { risk: 'Energy Cost', current: 8.2, lastMonth: 8.0, lastQuarter: 7.5, lastYear: 6.8 },
    { risk: 'Environmental Compliance', current: 7.8, lastMonth: 7.5, lastQuarter: 7.2, lastYear: 6.5 },
    { risk: 'Technology Obsolescence', current: 7.5, lastMonth: 7.5, lastQuarter: 7.5, lastYear: 7.0 },
    { risk: 'Import Competition', current: 6.8, lastMonth: 7.0, lastQuarter: 7.2, lastYear: 7.5 },
    { risk: 'Digital Substitution', current: 7.0, lastMonth: 7.0, lastQuarter: 6.8, lastYear: 6.5 },
  ]

  const majorEvents = [
    { date: '2025-03-28', event: 'Boiler explosion at paper manufacturing unit kills 3 workers in Ghaziabad', impact: 'Critical', affected: 'Rubber rolls/paper allied unit', summary: 'IBR compliance failure. Criminal cases filed. Industry safety protocols questioned.' },
    { date: '2025-01-20', event: 'New EPR guidelines for paper packaging notified by MOEF&CC', impact: 'High', affected: 'All packaging board manufacturers', summary: 'Mandatory take-back and recycling targets increasing compliance costs by Rs 500-800/tonne' },
    { date: '2024-11-18', event: 'Major fire at integrated paper mill raw material yard, Nashik', impact: 'Critical', affected: 'Specific mill (name withheld)', summary: 'Spontaneous combustion in waste paper bales destroyed 15,000 MT stock. Rs 130 Cr total loss.' },
    { date: '2024-09-15', event: 'CPCB issues closure notice to 12 small paper mills in UP for effluent violations', impact: 'High', affected: 'Small agro-based mills in Muzaffarnagar cluster', summary: 'Mills ordered to install ZLD systems within 6 months or face permanent closure.' },
    { date: '2024-07-01', event: 'Waste paper import duty increased from 0% to 2.5%', impact: 'Medium', affected: 'Recycled fibre-based mills (71% of industry)', summary: 'Increases raw material cost for mills dependent on imported OCC/ONP by Rs 300-500/tonne.' },
    { date: '2024-05-15', event: 'ITC acquires Century Pulp & Paper for Rs 3,500 Cr', impact: 'High', affected: 'ITC PSPD division, Century Paper stakeholders', summary: 'ITC PSPD capacity rises 60% to 12.8 lakh TPA. Consolidation trend continues.' },
  ]

  const caseStudies = [
    {
      title: "Major Fire at Paper Mill Raw Material Yard, Maharashtra (2023)",
      background: "A large integrated paper mill in Nashik district stored 15,000 MT of waste paper and bagasse in open stockyards without adequate fire breaks.",
      riskIdentified: "Spontaneous combustion in compacted waste paper bales during hot weather. Inadequate fire hydrant pressure at yard extremities.",
      businessImpact: "Rs 85 Cr material damage (raw materials + conveyors). Rs 45 Cr business interruption (18-day partial shutdown). Total: Rs 130 Cr. Insurance claim settled at Rs 108 Cr after depreciation and under-insurance deductions.",
      mitigation: "Post-incident: IR temperature sensors installed, 6m fire breaks created, drone thermal imaging deployed for daily monitoring, water storage capacity doubled.",
      learnings: ["Stack height limits critical � spontaneous combustion risk increases exponentially above 6m","Water hydrant pressure must be tested quarterly at ALL yard extremities, not just near pumphouse","Drone-based thermal imaging is cost-effective (Rs 5L/year) vs potential Rs 100+ Cr loss","Insurance sum insured must cover peak season stock levels, not average"]
    },
    {
      title: "Boiler Explosion at Paper Mill, Ghaziabad UP (March 2025)",
      background: "A rubber rolls/paper-allied manufacturing unit in Modinagar area operated a high-pressure boiler with expired IBR certification. The unit had not undergone statutory inspection in 2 years.",
      riskIdentified: "Expired IBR certification. Safety valve malfunction. Workers positioned within explosion danger zone during pressure testing.",
      businessImpact: "3 fatalities (Yogendra, Anuj, Awdhesh). Plant destroyed. Criminal FIR filed. Material loss Rs 12 Cr. Operations permanently ceased. Insurance claim disputed due to non-compliance with IBR.",
      mitigation: "Industry response: IPMA issued advisory on mandatory IBR compliance. State boiler inspectorate increased surveillance frequency. Insurance companies now requiring valid IBR certificate as policy condition.",
      learnings: ["IBR certification is a legal requirement � not optional. Insurance voided without it","No personnel within 50m during hydrostatic testing � ISMA mandates this","Automated pressure relief valves with redundancy are non-negotiable","Small mills particularly vulnerable � need industry collective safety programs"]
    },
    {
      title: "Chemical Recovery Boiler Failure at Integrated Pulp Mill, South India (2021)",
      background: "An integrated wood-based pulp mill experienced a catastrophic smelt-water explosion in its chemical recovery boiler. The boiler processes black liquor (a byproduct of kraft pulping) at 800�C+.",
      riskIdentified: "Tube leak allowed water contact with molten smelt (Na2S/Na2CO3) at 800�C causing steam explosion. Delayed response to tube leak alarm. Emergency drain system partially blocked.",
      businessImpact: "2 workers injured. Recovery boiler destroyed (Rs 180 Cr replacement cost). 4-month shutdown of entire pulp line. BI loss Rs 120 Cr. Total: Rs 300 Cr. Major insurance claim � took 18 months to settle.",
      mitigation: "New recovery boiler installed with triple-redundant leak detection. Emergency drain system redesigned. 24x7 monitoring room with dedicated operator. Annual thermal scanning of all boiler tubes mandatory.",
      learnings: ["Chemical recovery boilers are single-largest risk in integrated pulp mills � treat as nuclear-grade risk","Smelt-water explosions are instantaneous and catastrophic � prevention is the ONLY strategy","Tube integrity monitoring (acoustic emission + thermal scanning) must be continuous, not periodic","BI coverage for recovery boiler should assume 4-6 month downtime, not the typical 2-3 months"]
    },
  ]

  const mitigationRecommendations = [
    { risk: 'Raw Material Fire', priority: 'Critical', recommendation: 'Install IR thermal sensors across all stockyards. Maintain 6m fire breaks. Limit stack heights to 4m. Deploy drone thermal imaging weekly.', owner: 'Plant Safety Head', timeline: '3 months' },
    { risk: 'Boiler Explosion', priority: 'Critical', recommendation: 'Mandatory IBR certification check before each operating period. Automate pressure relief with 2N redundancy. NDT of tubes annually. No personnel within safety zone during testing.', owner: 'Chief Engineer', timeline: 'Immediate' },
    { risk: 'Chemical Recovery Failure', priority: 'High', recommendation: 'Continuous acoustic emission monitoring of recovery boiler tubes. Quarterly thermal scanning. Emergency drain test monthly. 4-month BI coverage minimum.', owner: 'Pulp Mill Manager', timeline: '6 months' },
    { risk: 'Environmental Non-Compliance', priority: 'High', recommendation: 'Invest in ZLD systems. Real-time effluent monitoring with CPCB auto-upload. Third-party environmental audit quarterly. Budget Rs 50-100 Cr for compliance.', owner: 'Environmental Head', timeline: '12 months' },
    { risk: 'Energy Cost Escalation', priority: 'Medium', recommendation: 'Install cogeneration from black liquor/biomass. Target 60%+ energy self-sufficiency. Negotiate long-term coal linkage contracts. Invest in solar rooftop.', owner: 'Energy Manager', timeline: '18 months' },
    { risk: 'Digital Substitution', priority: 'Medium', recommendation: 'Diversify into packaging board (8-10% CAGR). Exit commodity W&P grades. Invest in specialty/coated papers. Build e-commerce packaging capability.', owner: 'Strategy Head', timeline: '24 months' },
  ]

  const riskNews = [
    { headline: 'MOEF notifies stricter effluent norms for pulp & paper sector � ZLD mandate by 2027', source: 'CPCB Gazette', date: '2025-06-15', summary: 'All pulp mills must achieve Zero Liquid Discharge by Dec 2027. Estimated industry investment: Rs 8,000 Cr.', url: 'https://cpcb.nic.in' },
    { headline: 'Waste paper prices surge 25% on Chinese buying spree', source: 'IPMA Bulletin', date: '2025-05-20', summary: 'OCC prices jumped from Rs 18/kg to Rs 22.5/kg in 3 months as Chinese buyers re-enter global market post-COVID recovery.', url: 'https://www.ipmaindia.org' },
    { headline: 'Fire at Gujarat recycled paper mill causes Rs 35 Cr loss', source: 'Times of India', date: '2025-04-12', summary: 'Short circuit in conveyor gallery ignited accumulated paper dust. Mill shutdown for 3 weeks during peak season.', url: 'https://timesofindia.indiatimes.com' },
    { headline: 'CRISIL downgrades credit outlook for small paper mills on margin pressure', source: 'CRISIL', date: '2025-03-28', summary: 'Rising input costs and inability to pass through price increases affecting mills with <50,000 TPA capacity most severely.', url: 'https://www.crisil.com' },
    { headline: 'Indian paper industry needs Rs 25,000 Cr investment for green transition: IPMA', source: 'Business Standard', date: '2025-02-15', summary: 'Industry requires massive capex for ZLD, renewable energy, sustainable fibre sourcing to meet ESG targets by 2030.', url: 'https://www.business-standard.com' },
  ]

  const riskKPIs = { totalActive: 10, critical: 3, high: 4, emerging: 2, mitigated: 5, overallScore: 7.2 }

  const getSeverityBadge = (severity: string) => {
    if (severity === 'Critical') return 'text-red-700 bg-red-100'
    if (severity === 'High') return 'text-orange-700 bg-orange-100'
    if (severity === 'Medium') return 'text-yellow-700 bg-yellow-100'
    return 'text-green-700 bg-green-100'
  }

  const getTrendColor = (trend: string) => {
    if (trend === '?') return 'text-red-600'
    if (trend === '?') return 'text-green-600'
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
            <SourceFooter source="IPMA, CPPRI, Industry Risk Assessment 2025" />
          </div>
        </div>
      )}

      {/* Tab 2: Risk Heatmap */}
      {riskSubTab === 'heatmap' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Risk Heatmap � Impact vs Probability</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="probability" name="Probability" domain={[0, 6]} fontSize={11} label={{ value: 'Probability (1-5)', position: 'insideBottom', offset: -5 }} />
                <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 6]} fontSize={11} label={{ value: 'Impact (1-5)', angle: -90, position: 'insideLeft' }} />
                <ZAxis type="number" dataKey="score" range={[200, 600]} name="Risk Score" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: number, name: string) => [value, name]} />
                <Scatter data={industryRisks.filter(r => r.severity === 'High')} fill="#DC2626" name="High Severity">
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
              <div className="p-2 font-bold text-center">Impact ? / Prob ?</div>
              <div className="p-2 font-bold text-center bg-gray-100 rounded">Low (1-2)</div>
              <div className="p-2 font-bold text-center bg-gray-100 rounded">Medium (3)</div>
              <div className="p-2 font-bold text-center bg-gray-100 rounded">High (4-5)</div>

              <div className="p-2 font-bold text-center bg-gray-100 rounded">High (4-5)</div>
              <div className="p-2 bg-yellow-100 rounded text-center">Import Competition</div>
              <div className="p-2 bg-orange-100 rounded text-center">Environmental, Climate</div>
              <div className="p-2 bg-red-100 rounded text-center font-semibold">Raw Material, Energy, Technology</div>

              <div className="p-2 font-bold text-center bg-gray-100 rounded">Medium (3)</div>
              <div className="p-2 bg-green-100 rounded text-center">Financial</div>
              <div className="p-2 bg-yellow-100 rounded text-center">Supply Chain, Regulatory</div>
              <div className="p-2 bg-orange-100 rounded text-center">Digital Substitution</div>

              <div className="p-2 font-bold text-center bg-gray-100 rounded">Low (1-2)</div>
              <div className="p-2 bg-green-100 rounded text-center">�</div>
              <div className="p-2 bg-green-100 rounded text-center">�</div>
              <div className="p-2 bg-yellow-100 rounded text-center">�</div>
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 border border-red-300 rounded"></span> Critical Zone</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-100 border border-orange-300 rounded"></span> High Zone</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></span> Medium Zone</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 border border-green-300 rounded"></span> Low Zone</span>
            </div>
            <SourceFooter source="IPMA, Industry Risk Assessment 2025" />
          </div>
        </div>
      )}

      {/* Tab 3: Risk Comparison */}
      {riskSubTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-maroon" /> Risk Score Trend � Current vs Last Year</h3>
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
                          {change > 0 ? '?' : change < 0 ? '?' : '?'} {change > 0 ? '+' : ''}{change.toFixed(1)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <SourceFooter source="IPMA, Risk Intelligence Quarterly Report" />
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
          <SourceFooter source="IPMA, CPCB, Industry Reports, Media Sources" />
        </div>
      )}

      {/* Tab 5: Case Studies */}
      {riskSubTab === 'casestudies' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2"><AlertTriangle size={18} className="text-red-500" /> Detailed Risk Case Studies</h3>
          {caseStudies.map((cs, i) => (
            <div key={i} className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${i === 0 ? 'border-l-red-700' : i === 1 ? 'border-l-red-700' : 'border-l-orange-500'}`}>
              <h4 className="font-bold text-maroon mb-3 text-lg">{cs.title}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm mb-2"><span className="font-semibold text-navy">Background:</span> {cs.background}</p>
                  <p className="text-sm mb-2"><span className="font-semibold text-navy">Risk Identified:</span> {cs.riskIdentified}</p>
                </div>
                <div>
                  <p className="text-sm mb-2"><span className="font-semibold text-navy">Business Impact:</span> {cs.businessImpact}</p>
                  <p className="text-sm mb-2"><span className="font-semibold text-navy">Mitigation Applied:</span> {cs.mitigation}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-sm text-navy mb-2 flex items-center gap-1"><CheckCircle2 size={14} className="text-green-600" /> Key Learnings:</p>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                  {cs.learnings.map((l, j) => <li key={j}>{l}</li>)}
                </ul>
              </div>
            </div>
          ))}
          <SourceFooter source="IPMA, Insurance Claims Data, Industry Incident Reports" />
        </div>
      )}

      {/* Tab 6: Risk Mitigation Recommendations */}
      {riskSubTab === 'mitigation' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2"><CheckCircle2 size={18} className="text-green-600" /> Risk Mitigation Recommendations</h3>
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
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-3 px-2 font-semibold">{m.risk}</td>
                      <td className="py-3 px-2 text-center"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSeverityBadge(m.priority)}`}>{m.priority}</span></td>
                      <td className="py-3 px-2 text-gray-700 max-w-xs">{m.recommendation}</td>
                      <td className="py-3 px-2 text-gray-600">{m.owner}</td>
                      <td className="py-3 px-2 text-center font-semibold text-maroon">{m.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SourceFooter source="IPMA, Industry Best Practices, Insurance Advisory" />
          </div>
        </div>
      )}

      {/* Tab 7: Risk News */}
      {riskSubTab === 'news' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2"><CloudRain size={18} className="text-blue-500" /> Latest Risk News & Alerts</h3>
          {riskNews.map((news, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-navy text-sm flex-1">{news.headline}</h4>
                <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">{news.date}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Source: {news.source}</span>
                <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800 font-semibold">Read More ?</a>
              </div>
            </div>
          ))}
          <SourceFooter source="Industry News Aggregation, IPMA, CPCB" />
        </div>
      )}

      {/* Admin Controls */}
      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-bold text-navy mb-3 flex items-center gap-2"><Settings size={16} className="text-orange-500" /> Admin: Risk Configuration</h4>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"><RefreshCw size={12} /> Refresh Risk Data</button>
            <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 bg-maroon text-white rounded-lg text-xs font-semibold hover:bg-maroon/90"><Download size={12} /> Export Risk Report</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ===== GEOGRAPHY TAB (NEW) =====
function GeographyTab() {
  const [whyPopup, setWhyPopup] = useState<string | null>(null)

  const selectedState = geographyData.find(s => s.state === whyPopup)

  return (
    <div className="space-y-6">
      {/* Why Popup */}
      {whyPopup && selectedState && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setWhyPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">Why {whyPopup}?</h3>
              <button onClick={() => setWhyPopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">�</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-gray-50 rounded-lg"><span className="text-[10px] font-bold text-gray-500 block">Capacity</span><span className="text-sm text-navy font-bold">{selectedState.capacity} MTPA</span></div>
                <div className="p-2 bg-gray-50 rounded-lg"><span className="text-[10px] font-bold text-gray-500 block">Share</span><span className="text-sm text-navy font-bold">{selectedState.share}%</span></div>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <h5 className="text-[10px] font-bold text-blue-700 uppercase mb-1">Major Plants</h5>
                <p className="text-xs text-blue-800">{selectedState.plants}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <h5 className="text-[10px] font-bold text-green-700 uppercase mb-1">Why This State?</h5>
                <p className="text-xs text-green-800 leading-relaxed">{selectedState.reason}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Paper Capacity (MTPA)</h3>
        <p className="text-xs text-gray-500 mb-4">?? Click any bar to understand why that state is a paper hub</p>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={geographyData} margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" fontSize={9} angle={-15} textAnchor="end" height={70} />
            <YAxis fontSize={11} />
            <Tooltip formatter={(v: number) => `${v} MTPA`} />
            <Bar dataKey="capacity" fill="#005B75" name="Capacity (MTPA)" radius={[4, 4, 0, 0]} cursor="pointer"
              onClick={(data: any) => setWhyPopup(data.state)}>
              {geographyData.map((entry, i) => (
                <Cell key={i} fill={i < 3 ? '#B02A30' : i < 6 ? '#005B75' : '#94a3b8'} className="cursor-pointer hover:opacity-80 transition" />
              ))}
              <LabelList dataKey="capacity" position="top" fontSize={9} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <SourceFooter source="IPMA, CPPRI" />
      </div>

      {/* State Table with Why button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Paper Belt Distribution & Major Plants</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">State</th>
                <th className="text-right py-2 px-2 font-bold text-navy">Capacity (MTPA)</th>
                <th className="text-right py-2 px-2 font-bold text-navy">Share (%)</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Major Plants</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Why?</th>
              </tr>
            </thead>
            <tbody>
              {geographyData.map((s, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-cream/50">
                  <td className="py-2 px-2 font-semibold">{s.state}</td>
                  <td className="py-2 px-2 text-right font-bold text-navy">{s.capacity}</td>
                  <td className="py-2 px-2 text-right">{s.share}%</td>
                  <td className="py-2 px-2 text-xs text-gray-600">{s.plants}</td>
                  <td className="py-2 px-2 text-center">
                    <button onClick={() => setWhyPopup(s.state)} className="px-2 py-1 bg-maroon/10 text-maroon rounded-lg text-[10px] font-bold hover:bg-maroon/20 transition">Why?</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceFooter source="IPMA, Company Reports" />
      </div>

      {/* Visual capacity bars */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Capacity Distribution � Visual</h3>
        <div className="space-y-2">
          {geographyData.map((s, i) => (
            <div key={i} className="flex items-center gap-3 cursor-pointer" onClick={() => setWhyPopup(s.state)}>
              <div className="w-40 text-xs font-semibold text-gray-700 text-right">{s.state}</div>
              <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all hover:opacity-80"
                  style={{ width: `${(s.capacity / 5.0) * 100}%`, backgroundColor: `rgba(176,42,48,${0.3 + (s.capacity / 5.0) * 0.7})` }}>
                  <span className="text-xs font-bold text-white">{s.share}%</span>
                </div>
              </div>
              <div className="w-20 text-xs text-right font-semibold text-navy">{s.capacity} MTPA</div>
            </div>
          ))}
        </div>
        <SourceFooter source="IPMA, CPPRI" />
      </div>
    </div>
  )
}

// ===== NEWS TAB (NEW) =====
function NewsTab() {
  return <NewsFeed title="Paper Industry News & Developments" items={newsData} />
}


// ===== PAPER MILL ADVENTURE � INTERACTIVE GAME =====
const allQuestions = [
  { question: "What is India's rank in global paper production?", options: ["3rd", "5th", "7th", "10th"], correct: 1, fact: "India produces 27.8 MTPA � 5th largest globally." },
  { question: "How many paper mills operate in India?", options: ["200+", "500+", "850+", "1200+"], correct: 2, fact: "850+ mills from large integrated to small agro-based." },
  { question: "Most used raw material in Indian paper mills?", options: ["Wood Pulp", "Waste Paper", "Bagasse", "Bamboo"], correct: 1, fact: "70% uses recycled waste paper � largest importer globally!" },
  { question: "Which state leads paper manufacturing?", options: ["Tamil Nadu", "AP", "Maharashtra", "Gujarat"], correct: 0, fact: "Tamil Nadu: 18% capacity � TNPL, ITC, writing paper mills." },
  { question: "India's per capita paper consumption?", options: ["5 kg", "14 kg", "25 kg", "50 kg"], correct: 1, fact: "14 kg vs Global 55 kg vs USA 200 kg � huge headroom!" },
  { question: "Fastest growing paper segment?", options: ["Writing", "Packaging", "Newsprint", "Tissue"], correct: 1, fact: "Corrugated grows 12-15% CAGR from e-commerce boom." },
  { question: "Largest paper company by revenue?", options: ["JK Paper", "ITC", "West Coast", "Emami"], correct: 1, fact: "ITC Paperboards: Rs 8,000+ Cr. Bhadrachalam is massive." },
  { question: "What is 'Black Liquor'?", options: ["Ink type", "Fuel from pulping", "Paper dye", "Waste water"], correct: 1, fact: "Burned in recovery boilers � 60-70% energy self-sufficient!" },
  { question: "What killed newsprint industry?", options: ["China dumping", "Digital media", "No raw material", "Govt ban"], correct: 1, fact: "Demand falls 5%/yr since 2015. Mills pivot to packaging." },
  { question: "Sustainable forestry certification?", options: ["ISO 14001", "FSC", "BIS Green", "EPA"], correct: 1, fact: "ITC has 150K+ acres FSC-certified � largest in Asia." },
  { question: "Average water usage per tonne of paper?", options: ["5,000 L", "20,000 L", "50,000 L", "100,000 L"], correct: 2, fact: "Paper mills use ~50,000 liters per tonne. ZLD is key focus." },
  { question: "Which chemical process dominates Indian pulping?", options: ["Kraft Process", "Sulphite", "Mechanical", "Soda Process"], correct: 0, fact: "Kraft (sulphate) process used in 80% of chemical pulping." },
  { question: "India's paper industry employment?", options: ["500K", "1.5M", "3M", "5M"], correct: 1, fact: "1.5M+ direct employment across mills, collection, logistics." },
  { question: "Top paper export destination from India?", options: ["USA", "Middle East", "Europe", "Africa"], correct: 1, fact: "Middle East and Africa account for 60% of Indian paper exports." },
  { question: "What % of India's paper is recycled-fiber based?", options: ["30%", "50%", "70%", "90%"], correct: 2, fact: "70% � India leads in waste paper recycling for papermaking." },
]

const millStations = [
  { emoji: '??', label: 'Harvest', color: '#166534' },
  { emoji: '??', label: 'Debark', color: '#78350f' },
  { emoji: '??', label: 'Pulp', color: '#7c3aed' },
  { emoji: '??', label: 'Screen', color: '#0369a1' },
  { emoji: '??', label: 'Bleach', color: '#be185d' },
  { emoji: '??', label: 'Stock', color: '#0891b2' },
  { emoji: '??', label: 'Form', color: '#64748b' },
  { emoji: '??', label: 'Dry', color: '#dc2626' },
  { emoji: '??', label: 'Coat', color: '#ca8a04' },
  { emoji: '??', label: 'Pack', color: '#059669' },
]

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function QuizTab() {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro')
  const [playerName, setPlayerName] = useState('')
  const [character, setCharacter] = useState<'male' | 'female'>('male')
  const [questions, setQuestions] = useState(shuffleArray(allQuestions).slice(0, 10))
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [canMove, setCanMove] = useState(false)
  const [position, setPosition] = useState(0) // 0-10 stations
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [showFact, setShowFact] = useState(false)
  const [walkAnim, setWalkAnim] = useState(false)

  // Arrow key listener
  const handleKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    if (e.key === 'ArrowRight' && canMove) {
      moveForward()
    }
  }

  const moveForward = () => {
    setCanMove(false)
    setWalkAnim(true)
    setTimeout(() => {
      setPosition(p => p + 1)
      setWalkAnim(false)
      if (currentQ < 9) {
        setCurrentQ(q => q + 1)
        setSelectedAnswer(null)
        setAnswered(false)
        setIsCorrect(false)
        setShowFact(false)
      } else {
        setPhase('result')
      }
    }, 600)
  }

  const handleAnswer = (idx: number) => {
    if (answered) return
    setSelectedAnswer(idx)
    setAnswered(true)
    const correct = idx === questions[currentQ].correct
    setIsCorrect(correct)
    if (correct) {
      setScore(s => s + 10)
      setCompletedSteps(prev => [...prev, currentQ])
      setStreak(s => { const n = s + 1; if (n > maxStreak) setMaxStreak(n); return n })
      setShowFact(true)
      setCanMove(true) // allow arrow key to move
    } else {
      setStreak(0)
      // Auto-allow move after wrong (but no points)
      setTimeout(() => setCanMove(true), 1000)
    }
  }

  const handleStart = () => {
    if (playerName.trim().length >= 2) {
      setQuestions(shuffleArray(allQuestions).slice(0, 10)) // randomize for this play
      setPhase('playing')
    }
  }

  const handleReset = () => {
    setPhase('intro'); setCurrentQ(0); setScore(0); setPosition(0)
    setCompletedSteps([]); setStreak(0); setMaxStreak(0)
    setSelectedAnswer(null); setAnswered(false); setIsCorrect(false)
    setCanMove(false); setShowFact(false)
  }

  const charEmoji = character === 'male' ? '?????' : '?????'

  // === INTRO ===
  if (phase === 'intro') {
    return (
      <div className="relative min-h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #f5e6d3 50%, #e8d5b7 100%)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #92400e 0px, #92400e 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, #92400e 0px, #92400e 1px, transparent 1px, transparent 60px)', backgroundSize: '60px 60px' }}></div>
        <div className="relative z-10 text-center max-w-md px-6 py-10">
          <div className="text-5xl mb-3">??</div>
          <h2 className="text-2xl font-black text-amber-900 mb-1">Paper Mill Adventure</h2>
          <p className="text-amber-700/60 text-xs mb-6">Guide your character through 10 paper-making stations. Answer correctly ? press <kbd className="px-1.5 py-0.5 bg-white rounded border border-amber-300 text-[10px] font-mono">?</kbd> to move forward!</p>

          {/* Character Selection */}
          <div className="bg-white/80 rounded-2xl p-5 border border-amber-200 shadow-lg mb-4">
            <label className="block text-[10px] font-bold text-amber-700 mb-2 uppercase tracking-wider">Choose Your Character</label>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button onClick={() => setCharacter('male')} className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all ${character === 'male' ? 'bg-blue-100 border-2 border-blue-500 scale-110 shadow-lg' : 'bg-gray-100 border-2 border-gray-200 hover:border-blue-300'}`}>?????</button>
              <button onClick={() => setCharacter('female')} className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all ${character === 'female' ? 'bg-pink-100 border-2 border-pink-500 scale-110 shadow-lg' : 'bg-gray-100 border-2 border-gray-200 hover:border-pink-300'}`}>?????</button>
            </div>

            <label className="block text-[10px] font-bold text-amber-700 mb-1.5 uppercase tracking-wider">Your Name</label>
            <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleStart()} placeholder="Enter name..." className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-300 rounded-xl text-center text-amber-900 font-semibold placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 mb-3 text-sm" />

            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-200"><div className="text-base font-bold text-amber-800">10</div><div className="text-[8px] text-amber-600">Stations</div></div>
              <div className="p-2 bg-green-50 rounded-lg border border-green-200"><div className="text-base font-bold text-green-700">?</div><div className="text-[8px] text-green-600">Arrow Move</div></div>
              <div className="p-2 bg-blue-50 rounded-lg border border-blue-200"><div className="text-base font-bold text-blue-700">??</div><div className="text-[8px] text-blue-600">Random Qs</div></div>
            </div>

            <button onClick={handleStart} disabled={playerName.trim().length < 2} className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 transition-all shadow-lg active:scale-[0.98] disabled:opacity-40">?? Enter the Mill</button>
          </div>
        </div>
      </div>
    )
  }

  // === RESULT ===
  if (phase === 'result') {
    const grade = score >= 90 ? 'Master Papermaker ??' : score >= 70 ? 'Senior Engineer ?' : score >= 50 ? 'Mill Supervisor ??' : 'Trainee ??'
    return (
      <div className="relative min-h-[60vh] flex items-center justify-center rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <div className="relative z-10 text-center max-w-md px-6 py-10">
          <div className="text-5xl mb-2">{charEmoji}</div>
          <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-amber-400 shadow-xl">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Production Complete</h3>
            <h2 className="text-lg font-black text-amber-900 mb-3">{playerName}'s Mill Report</h2>
            <div className="text-4xl font-black text-amber-800 mb-1">{score}<span className="text-sm text-amber-500">/100</span></div>
            <div className="text-sm font-bold text-amber-700 mb-4">{grade}</div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-2 bg-green-50 rounded-lg border border-green-200"><div className="text-base font-bold text-green-600">{completedSteps.length}/10</div><div className="text-[7px] text-gray-500">Passed</div></div>
              <div className="p-2 bg-orange-50 rounded-lg border border-orange-200"><div className="text-base font-bold text-orange-600">{maxStreak}??</div><div className="text-[7px] text-gray-500">Streak</div></div>
              <div className="p-2 bg-blue-50 rounded-lg border border-blue-200"><div className="text-base font-bold text-blue-600">{Math.round(score)}%</div><div className="text-[7px] text-gray-500">Yield</div></div>
            </div>
            {/* Mini production line */}
            <div className="flex items-center justify-center gap-0.5 mb-3">
              {millStations.map((s, i) => (
                <div key={i} className={`w-6 h-6 rounded text-[10px] flex items-center justify-center ${completedSteps.includes(i) ? 'bg-green-100 border border-green-400' : 'bg-red-50 border border-red-200'}`}>{s.emoji}</div>
              ))}
            </div>
            <p className="text-[9px] text-gray-400 italic mb-3">Questions were randomized for this session</p>
          </div>
          <button onClick={handleReset} className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-amber-800 hover:bg-amber-900 transition">?? New Batch (New Questions)</button>
        </div>
      </div>
    )
  }

  // === PLAYING ===
  const q = questions[currentQ]

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #fefbf3 0%, #f5ebe0 100%)' }} tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="relative z-10 p-4">
        {/* Top HUD */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{charEmoji}</span>
            <span className="text-xs font-bold text-amber-800">{playerName}</span>
            {streak > 1 && <span className="text-xs font-bold text-orange-600">??{streak}</span>}
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-1 rounded-lg border border-amber-300">?{score} pts</span>
        </div>

        {/* FACTORY FLOOR � Horizontal scrolling mill */}
        <div className="bg-gradient-to-b from-amber-100 to-amber-50 rounded-xl p-3 mb-4 border border-amber-200 overflow-x-auto">
          {/* Conveyor belt line */}
          <div className="relative min-w-[600px]">
            <div className="absolute top-[22px] left-0 right-0 h-2 bg-amber-300/50 rounded"></div>
            <div className="absolute top-[22px] left-0 h-2 bg-green-500 rounded transition-all duration-600" style={{ width: `${(position / 10) * 100}%` }}></div>
            
            {/* Stations + Character */}
            <div className="relative flex items-start justify-between">
              {millStations.map((station, i) => (
                <div key={i} className="flex flex-col items-center relative" style={{ minWidth: '56px' }}>
                  {/* Character on current position */}
                  {position === i && (
                    <div className={`absolute -top-7 text-2xl transition-all duration-300 ${walkAnim ? 'animate-bounce translate-x-2' : ''}`}>
                      {charEmoji}
                    </div>
                  )}
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-base transition-all duration-300 border-2 ${
                    completedSteps.includes(i) ? 'bg-green-100 border-green-500 shadow-green-200 shadow-md' 
                    : i === currentQ && !answered ? 'bg-amber-100 border-amber-500 shadow-amber-200 shadow-lg scale-110' 
                    : i < position ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-200 opacity-40'
                  }`}>
                    {station.emoji}
                  </div>
                  <span className={`text-[7px] font-bold mt-1 ${i === currentQ ? 'text-amber-800' : 'text-gray-400'}`}>{station.label}</span>
                </div>
              ))}
              {/* Final treasure */}
              <div className="flex flex-col items-center" style={{ minWidth: '56px' }}>
                {position === 10 && <div className="absolute -top-7 text-2xl">{charEmoji}</div>}
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-base border-2 ${position === 10 ? 'bg-yellow-100 border-yellow-500 animate-pulse' : 'bg-gray-50 border-gray-200 opacity-30'}`}>??</div>
                <span className="text-[7px] font-bold mt-1 text-gray-400">Done!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Move instruction */}
        {canMove && (
          <div className="text-center mb-3 animate-pulse">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 border border-green-400 rounded-full text-xs font-bold text-green-700">
              Press <kbd className="px-1.5 py-0.5 bg-white rounded border border-green-300 font-mono text-[10px]">?</kbd> or click to move forward
            </span>
            <button onClick={moveForward} className="ml-2 px-3 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold hover:bg-green-700 transition">? Move</button>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-2xl border-2 border-amber-200 p-5 mb-4 shadow-md">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-amber-100">
            <span className="text-amber-600">??</span>
            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Station {currentQ + 1}: {millStations[currentQ].label}</span>
          </div>
          <h3 className="text-sm font-bold text-gray-800 mb-4 leading-relaxed">{q.question}</h3>
          <div className="grid grid-cols-1 gap-2">
            {q.options.map((opt, i) => {
              let cls = 'bg-amber-50/50 border-amber-200 text-gray-700 hover:bg-amber-100 hover:border-amber-400'
              if (answered && i === q.correct) cls = 'bg-green-100 border-green-500 text-green-800'
              else if (answered && i === selectedAnswer && !isCorrect) cls = 'bg-red-100 border-red-400 text-red-700'
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                  className={`p-3 rounded-xl border-2 text-left font-semibold text-xs transition-all ${cls} ${!answered ? 'active:scale-[0.97] cursor-pointer' : 'cursor-default'}`}>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white border border-amber-300 flex items-center justify-center text-[9px] font-bold text-amber-700">{String.fromCharCode(65+i)}</span>
                    {opt}
                    {answered && i === q.correct && <CheckCircle2 size={14} className="text-green-600 ml-auto" />}
                    {answered && i === selectedAnswer && !isCorrect && <XCircle size={14} className="text-red-500 ml-auto" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Fact display */}
        {showFact && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3">
            <p className="text-[11px] text-green-700">?? <strong>Mill Fact:</strong> {q.fact}</p>
          </div>
        )}
        {answered && !isCorrect && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
            <p className="text-[11px] text-red-700">?? Wrong answer! The correct answer was: <strong>{q.options[q.correct]}</strong></p>
          </div>
        )}
      </div>
    </div>
  )
}
