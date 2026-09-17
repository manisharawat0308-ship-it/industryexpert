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

type SteelTab = 'combined' | 'ownership' | 'risk' | 'players' | 'geography' | 'news' | 'snapshot'

// ===== STEEL DATA (embedded) =====
const overviewData = {
  totalCapacity: 200.3,
  totalProduction: 152.18,
  utilizationRate: 76.0,
  globalRanking: 2,
  exportVolume: 7.5,
  domesticConsumption: 143.6,
  perCapitaConsumption: 108,
  globalPerCapita: 215,
  chinaPerCapita: 604,
  segmentSplit: [
    { segment: 'Flat Products', share: 48.2, production: 69.6 },
    { segment: 'Long Products', share: 40.5, production: 58.4 },
    { segment: 'Stainless Steel', share: 7.8, production: 11.3 },
    { segment: 'Alloy Steel', share: 3.5, production: 5.0 },
  ],
  routeSplit: [
    { route: 'BF-BOF', share: 44, capacity: 88.1 },
    { route: 'EAF', share: 26, capacity: 52.1 },
    { route: 'Induction Furnace', share: 30, capacity: 60.1 },
  ],
  yearlyGrowth: [
    { year: '2018-19', production: 110.9, capacity: 142.2 },
    { year: '2019-20', production: 109.1, capacity: 144.0 },
    { year: '2020-21', production: 103.5, capacity: 144.0 },
    { year: '2021-22', production: 120.0, capacity: 154.0 },
    { year: '2022-23', production: 126.3, capacity: 161.0 },
    { year: '2023-24', production: 144.0, capacity: 180.0 },
    { year: '2024-25', production: 152.18, capacity: 200.3 },
  ],
}

const productionData = {
  capacityVsProduction: [
    { year: '2015-16', capacity: 121.9, production: 89.8, utilization: 73.7 },
    { year: '2016-17', capacity: 128.3, production: 97.9, utilization: 76.3 },
    { year: '2017-18', capacity: 137.9, production: 103.1, utilization: 74.8 },
    { year: '2018-19', capacity: 142.2, production: 110.9, utilization: 78.0 },
    { year: '2019-20', capacity: 144.0, production: 109.1, utilization: 75.8 },
    { year: '2020-21', capacity: 144.0, production: 103.5, utilization: 71.9 },
    { year: '2021-22', capacity: 154.0, production: 120.0, utilization: 77.9 },
    { year: '2022-23', capacity: 161.0, production: 126.3, utilization: 78.4 },
    { year: '2023-24', capacity: 180.0, production: 144.0, utilization: 80.0 },
    { year: '2024-25', capacity: 200.3, production: 152.18, utilization: 76.0 },
  ],
  monthlyProduction: [
    { month: 'Apr', production: 12.4, target: 12.5 }, { month: 'May', production: 12.8, target: 12.7 },
    { month: 'Jun', production: 12.2, target: 12.5 }, { month: 'Jul', production: 12.6, target: 12.8 },
    { month: 'Aug', production: 13.0, target: 12.8 }, { month: 'Sep', production: 12.5, target: 12.8 },
    { month: 'Oct', production: 13.2, target: 13.0 }, { month: 'Nov', production: 13.5, target: 13.0 },
    { month: 'Dec', production: 13.1, target: 13.0 }, { month: 'Jan', production: 13.3, target: 13.0 },
    { month: 'Feb', production: 11.8, target: 12.5 }, { month: 'Mar', production: 12.7, target: 12.8 },
  ],
}

const ownershipData = {
  ownershipSplit: [
    { type: 'Private Sector', capacity: 131.5, share: 73.3 },
    { type: 'Public Sector', capacity: 48.0, share: 26.7 },
  ],
  topCompanies: [
    { name: 'Tata Steel', capacity: 34.6, production: 29.8, type: 'Private' },
    { name: 'JSW Steel', capacity: 30.4, production: 27.2, type: 'Private' },
    { name: 'SAIL', capacity: 21.4, production: 17.5, type: 'PSU' },
    { name: 'AMNS India', capacity: 18.0, production: 15.3, type: 'Private' },
    { name: 'JSPL', capacity: 12.5, production: 10.8, type: 'Private' },
    { name: 'RINL', capacity: 7.3, production: 4.8, type: 'PSU' },
    { name: 'Shyam Metalics', capacity: 5.7, production: 4.5, type: 'Private' },
  ],
  psuVsPrivateTimeline: [
    { year: '2000', psuShare: 48, privateShare: 52 },
    { year: '2005', psuShare: 42, privateShare: 58 },
    { year: '2010', psuShare: 36, privateShare: 64 },
    { year: '2015', psuShare: 32, privateShare: 68 },
    { year: '2020', psuShare: 29, privateShare: 71 },
    { year: '2025', psuShare: 27, privateShare: 73 },
  ],
}

const timelineData = {
  historicalProduction: [
    { year: '1950', production: 1.0 }, { year: '1970', production: 6.2 },
    { year: '1990', production: 14.9 }, { year: '2000', production: 26.9 },
    { year: '2010', production: 68.3 }, { year: '2015', production: 89.6 },
    { year: '2020', production: 103.5 }, { year: '2025', production: 144.3 },
  ],
  futureProjections: [
    { year: '2025', demand: 136.2, capacity: 179.5, production: 144.3 },
    { year: '2026', demand: 148.5, capacity: 195.0, production: 158.0 },
    { year: '2027', demand: 162.0, capacity: 212.0, production: 173.0 },
    { year: '2028', demand: 177.0, capacity: 230.0, production: 189.0 },
    { year: '2029', demand: 193.0, capacity: 250.0, production: 206.0 },
    { year: '2030', demand: 210.0, capacity: 300.0, production: 230.0 },
  ],
}

const riskData = {
  aogPerils: [
    { peril: 'Earthquake', severity: 'Catastrophic', typicalClaim: '—₹200–800 Cr', frequency: 'Low' },
    { peril: 'Flood / Inundation', severity: 'High', typicalClaim: '—₹50–300 Cr', frequency: 'Medium' },
    { peril: 'Storm / Cyclone', severity: 'High', typicalClaim: '—₹30–150 Cr', frequency: 'Medium' },
    { peril: 'Fire following Natural Cause', severity: 'High', typicalClaim: '—₹50–200 Cr', frequency: 'Low-Medium' },
  ],
  nonAogPerils: [
    { peril: 'Machinery Breakdown', severity: 'Very High', typicalClaim: '—₹20–500 Cr', frequency: 'High' },
    { peril: 'Fire & Explosion', severity: 'Catastrophic', typicalClaim: '—₹100–1000 Cr', frequency: 'Medium-High' },
    { peril: 'Electrical Damage', severity: 'Medium-High', typicalClaim: '—₹5–50 Cr', frequency: 'High' },
    { peril: 'Boiler Explosion', severity: 'Catastrophic', typicalClaim: '—₹50–200 Cr', frequency: 'Low' },
  ],
  biScenarios: [
    { scenario: 'Blast Furnace relining', downtime: '90–120 days', loss: '—₹2,000–5,000 Cr' },
    { scenario: 'BOF vessel failure', downtime: '45–60 days', loss: '—₹800–1,500 Cr' },
    { scenario: 'Rolling Mill drive failure', downtime: '30–45 days', loss: '—₹500–900 Cr' },
    { scenario: 'Major fire in gas network', downtime: '15–30 days', loss: '—₹300–700 Cr' },
  ],
  caseStudy: {
    title: "Vizag Steel Plant (RINL) —¬— Ladle Explosion, June 2025",
    plant: "RINL Visakhapatnam Steel Plant, Andhra Pradesh",
    date: "June 2025",
    incident: "A catastrophic explosion in the Steel Melting Shop when residual argon gas in the casting system formed a fire bubble within molten steel. When the slide-gate opened, the bubble expanded rapidly killing 9 workers.",
    rootCause: "Residual argon not purged from system. Malfunctioning instrumentation since June 5. Absence of heat-resistant PPE and ladle safety covers. CITU cited 645 safety lapses at the plant.",
    losses: "9 workers killed. Production loss ~Rs 200 Cr. Criminal cases filed. Plant shutdown for investigation.",
    lessons: ["Mandatory argon purging protocol before ladle operations", "Zero tolerance for instrument malfunctions —¬— auto-shutdown on sensor failure", "Heat-resistant PPE mandatory within 10m of molten metal", "Independent safety audits quarterly"],
    benchmark: "POSCO and Nippon Steel mandate automated ladle tracking with gas monitoring sensors and AI-based anomaly detection."
  },
}

const playersData = [
  { rank: 1, name: 'Tata Steel', capacity: 34.6, revenue: 229518, route: 'BF-BOF', products: 'Flat + Long' },
  { rank: 2, name: 'JSW Steel', capacity: 30.4, revenue: 177889, route: 'BF-BOF + EAF', products: 'Flat + Long' },
  { rank: 3, name: 'SAIL', capacity: 21.4, revenue: 99468, route: 'BF-BOF', products: 'Flat + Long + Rails' },
  { rank: 4, name: 'AMNS India', capacity: 18.0, revenue: 85000, route: 'BF-BOF + EAF', products: 'Flat (HR, CR)' },
  { rank: 5, name: 'JSPL', capacity: 12.5, revenue: 52874, route: 'BF-BOF + DRI-EAF', products: 'Long + Flat' },
  { rank: 6, name: 'RINL', capacity: 7.3, revenue: 18200, route: 'BF-BOF', products: 'Long Products' },
  { rank: 7, name: 'Shyam Metalics', capacity: 5.7, revenue: 14200, route: 'IF + EAF', products: 'Long + Ferro' },
  { rank: 8, name: 'APL Apollo', capacity: 4.0, revenue: 18500, route: 'ERW', products: 'Structural Tubes' },
]

const geographyData = [
  { state: 'Odisha', capacity: 38.5, share: 21.4, majorPlayers: 'Tata Steel, JSPL, AMNS, Jindal Stainless, Rungta', reason: 'India\'s #1 steel state. Richest iron ore reserves (Keonjhar, Joda, Barbil belt — 8 billion tonnes). Proximity to ports (Paradip, Dhamra) for coal import & steel export. State government single-window clearance. Low land cost. Mahanadi river water availability. 5 mega steel plants + 100+ sponge iron units. Tata Steel Kalinganagar, JSPL Angul, AMNS expansion all here.' },
  { state: 'Jharkhand', capacity: 28.2, share: 15.7, majorPlayers: 'Tata Steel (Jamshedpur), SAIL Bokaro, Tata Steel LP', reason: 'Historical steel capital — Jamshedpur (1907, India\'s first steel plant). Rich iron ore + coal reserves (Dhanbad coal belt). Tata Steel\'s Jamshedpur is world\'s lowest-cost integrated steel plant ($350/T). SAIL Bokaro is India\'s largest single-location flat product plant. Singhbhum iron ore belt feeds multiple plants. Skilled steel workforce generations deep.' },
  { state: 'Chhattisgarh', capacity: 24.8, share: 13.8, majorPlayers: 'SAIL Bhilai, JSPL Raigarh, Godawari Power, Jayaswal Neco', reason: 'SAIL Bhilai — India\'s first and most profitable PSU plant (rails + plates). Rich iron ore in Dalli-Rajhara and Bailadila. Cheap coal from Korba coal belt. Central India location gives pan-India distribution advantage. 200+ sponge iron/induction furnace units. Raigarh is India\'s DRI capital. State incentives for secondary steel.' },
  { state: 'Karnataka', capacity: 22.5, share: 12.5, majorPlayers: 'JSW Steel (Vijayanagar), KIOCL, Kalyani Steels', reason: 'JSW Vijayanagar — India\'s single largest steel plant (18 MTPA, expanding to 20). Bellary-Hospet iron ore belt (high-grade 62%+ Fe). JSW converted a bankrupt Vijayanagar Steel into India\'s most efficient plant. Port connectivity via Goa/Mangalore. Karnataka has India\'s highest grade iron ore. Renewable energy availability for green steel push.' },
  { state: 'Gujarat', capacity: 20.0, share: 11.1, majorPlayers: 'AMNS India (Hazira), Essar legacy, Welspun, APL Apollo', reason: 'AMNS Hazira — 9 MTPA shore-based flat product plant (ArcelorMittal + Nippon Steel JV). Direct port access for raw material import and finished goods export. SEZ benefits. Gujarat\'s pro-industry government policies. Gas pipeline connectivity for DRI. Mundra port for coal imports. Expanding rapidly — 24 MTPA target. Also strong in pipes & tubes (Welspun, APL Apollo).' },
  { state: 'Maharashtra', capacity: 14.5, share: 8.1, majorPlayers: 'JSW (Dolvi), Lloyd\'s Metals, Uttam Steel, Welspun', reason: 'JSW Dolvi — 10 MTPA coastal plant near Mumbai (flat products for auto/appliances). Proximity to India\'s largest consumption market (Mumbai-Pune industrial belt). JNPT port for exports. Vidarbha has iron ore deposits. Strong downstream steel service centers and auto component ecosystem. Maharashtra consumes 15%+ of India\'s finished steel.' },
  { state: 'West Bengal', capacity: 10.2, share: 5.7, majorPlayers: 'SAIL Durgapur, Burnpur (IISCO), Shyam Metalics, Tata Metaliks', reason: 'Historical steel belt — IISCO Burnpur (1918, India\'s 2nd steel plant). SAIL Durgapur alloy steel plant. Eastern India\'s largest consumption center (Kolkata industrial belt). Shyam Metalics expanding aggressively. Coal availability from Raniganj. Haldia port access. Long product focus (TMT, wire rods, structurals). Labor availability from industrial tradition.' },
  { state: 'Andhra Pradesh', capacity: 8.5, share: 4.7, majorPlayers: 'RINL Vizag, JSW (proposed), Apollo Pipes', reason: 'RINL Visakhapatnam — India\'s first shore-based integrated plant (7.3 MTPA). Direct port access for raw material. Strategic disinvestment pending. Vizag is India\'s wire rod capital. Proposed new investments by JSW and others attracted by coast + port. Low labor cost. Government offering incentives to attract capacity from other states.' },
  { state: 'Tamil Nadu', capacity: 5.8, share: 3.2, majorPlayers: 'JSW Salem, SAIL Salem, Tata Steel BSL legacy', reason: 'JSW Salem — specialty alloy and stainless steel. SAIL Salem — India\'s only stainless steel PSU plant. Proximity to auto OEMs (Chennai corridor) creates demand for auto-grade steel. Ennore/Chennai port. Southern India\'s primary steel supply hub. Growing construction demand from infra push. Limited ore — depends on Karnataka/Goa ore.' },
]

const newsData = [
  { id: 1, title: 'Tata Steel Kalinganagar Phase 2 commissioned, adds 5 MTPA', date: '2025-03-15', region: 'East', category: 'Business Wins' },
  { id: 2, title: 'AMNS India gets EC for 24 MTPA Hazira expansion', date: '2025-02-28', region: 'West', category: 'Business Wins' },
  { id: 3, title: 'Gas leak at SAIL Bhilai coke oven battery, 3 workers hospitalized', date: '2025-02-10', region: 'Central', category: 'Accidents' },
  { id: 4, title: 'Govt extends anti-dumping duty on Chinese steel for 5 years', date: '2025-01-22', region: 'National', category: 'Policy' },
  { id: 5, title: 'JSW Steel Angul plant starts trial production at 5 MTPA', date: '2025-01-10', region: 'East', category: 'Business Wins' },
  { id: 6, title: "JSPL commissions India's first hydrogen-injection BF trial", date: '2025-03-05', region: 'East', category: 'Business Wins' },
]

const capacityPipeline = [
    { company: 'Tata Steel (Kalinganagar Ph2)', capacity: 5, year: '2025', status: 'Commissioned' },
    { company: 'JSW Steel (Vijayanagar)', capacity: 5, year: '2026', status: 'Under construction' },
    { company: 'AMNS India (Hazira)', capacity: 6, year: '2027', status: 'EC received' },
    { company: 'JSPL (Angul Ph2)', capacity: 6, year: '2026', status: 'Under construction' },
    { company: 'NMDC Steel (Nagarnar Ph2)', capacity: 3, year: '2028', status: 'Planned' },
    { company: 'JSW (Odisha Greenfield)', capacity: 13.2, year: '2029', status: 'Planned' },
  ]

export default function SteelDashboard() {
  const [activeTab, setActiveTab] = useState<SteelTab>('combined')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tabs: { id: SteelTab; label: string; icon: any }[] = [
    { id: 'combined', label: 'Industry Overview', icon: Gauge },
    { id: 'ownership', label: 'Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'players', label: 'Players', icon: TrendingUp },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
  ]

  const steelTickerItems = [
    { label: 'HRC Price', value: '—¹52,500/T', change: '+1.2%', direction: 'up' as const },
    { label: 'Iron Ore (Fe 62%)', value: '$108/T', change: '-0.8%', direction: 'down' as const },
    { label: 'Coking Coal', value: '$235/T', change: '+2.5%', direction: 'up' as const },
    { label: 'Nifty Metal', value: '9,245', change: '+0.6%', direction: 'up' as const },
    { label: 'Tata Steel', value: '—¹152.4', change: '+1.1%', direction: 'up' as const },
    { label: 'JSW Steel', value: '—¹968.5', change: '-0.3%', direction: 'down' as const },
    { label: 'SAIL', value: '—¹125.8', change: '+0.4%', direction: 'up' as const },
    { label: 'Rebar Price', value: '—¹48,200/T', change: '+0.9%', direction: 'up' as const },
    { label: 'Scrap (HMS)', value: '$380/T', change: '-1.2%', direction: 'down' as const },
    { label: 'China HRC', value: '$520/T', change: '-0.5%', direction: 'down' as const },
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
                <h1 className="text-lg font-bold text-navy">Steel Industry Dashboard</h1>
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
        {activeTab === 'combined' && <CombinedOverviewTab />}
        {activeTab === 'ownership' && <OwnershipTab />}
        {activeTab === 'risk' && <RiskTab isAdmin={isAdmin} />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="steel" />}
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30"><div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between"><p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p><p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p><p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p></div></footer>
    </div>
  )
}

// ===== COMBINED OVERVIEW + PRODUCTION TAB =====
function CombinedOverviewTab() {
  const [segmentPopup, setSegmentPopup] = useState<string | null>(null)
  const [routePopup, setRoutePopup] = useState<string | null>(null)
  const [tradePopup, setTradePopup] = useState<'exports' | 'imports' | null>(null)

  const d = overviewData

  const globalComparison = [
    { country: 'China', production: 1005 },
    { country: 'India', production: 152 },
    { country: 'Japan', production: 87 },
    { country: 'USA', production: 81 },
    { country: 'Russia', production: 76 },
    { country: 'South Korea', production: 67 },
    { country: 'Germany', production: 35 },
    { country: 'Turkey', production: 33 },
    { country: 'Brazil', production: 32 },
    { country: 'Iran', production: 31 },
  ]

  const supplyDemand = [
    { year: 'FY20', production: 109.1, consumption: 100.2, exports: 8.2, imports: 6.8 },
    { year: 'FY21', production: 103.5, consumption: 94.9, exports: 10.8, imports: 4.8 },
    { year: 'FY22', production: 120.0, consumption: 105.8, exports: 13.5, imports: 4.7 },
    { year: 'FY23', production: 126.3, consumption: 119.2, exports: 6.7, imports: 6.0 },
    { year: 'FY24', production: 144.0, consumption: 136.2, exports: 7.5, imports: 8.3 },
    { year: 'FY25', production: 152.2, consumption: 143.6, exports: 7.5, imports: 5.8 },
  ]

  const costCurve = [
    { country: 'India (Tata)', cost: 350 },
    { country: 'India (JSW)', cost: 370 },
    { country: 'Russia', cost: 380 },
    { country: 'China Avg', cost: 420 },
    { country: 'S. Korea', cost: 450 },
    { country: 'Japan', cost: 520 },
    { country: 'USA (EAF)', cost: 480 },
    { country: 'Europe', cost: 550 },
  ]

  const timelineData = [
    { year: '1950', actual: 1, capacity: 2, projected: null, projCapacity: null },
    { year: '1970', actual: 6, capacity: 9, projected: null, projCapacity: null },
    { year: '1991', actual: 17, capacity: 23, projected: null, projCapacity: null },
    { year: '2000', actual: 27, capacity: 34, projected: null, projCapacity: null },
    { year: '2010', actual: 69, capacity: 78, projected: null, projCapacity: null },
    { year: '2015', actual: 89, capacity: 122, projected: null, projCapacity: null },
    { year: '2020', actual: 100, capacity: 144, projected: null, projCapacity: null },
    { year: '2023', actual: 126, capacity: 165, projected: null, projCapacity: null },
    { year: '2025', actual: 152, capacity: 200, projected: 152, projCapacity: 200 },
    { year: '2027', actual: null, capacity: null, projected: 185, projCapacity: 245 },
    { year: '2030', actual: null, capacity: null, projected: 230, projCapacity: 300 },
  ]

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <h2 className="text-2xl font-black">India Steel Industry — Unified Overview</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">A consolidated view of India's steel sector covering production, consumption, trade, costs, and growth trajectory</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black"><AnimatedCounter end={152.2} decimals={1} /></div>
              <div className="text-[10px] text-white/70 mt-0.5">Production (MT, FY25)</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black">#<AnimatedCounter end={2} /></div>
              <div className="text-[10px] text-white/70 mt-0.5">Global Rank</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black"><AnimatedCounter end={76} />%</div>
              <div className="text-[10px] text-white/70 mt-0.5">Capacity Utilization</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black"><AnimatedCounter end={108} /> kg</div>
              <div className="text-[10px] text-white/70 mt-0.5">Per Capita Consumption</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black">$<AnimatedCounter end={350} />/T</div>
              <div className="text-[10px] text-white/70 mt-0.5">Lowest Cost (Tata)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Global Standing + Production Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Crude Steel Production (MT, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India is 2nd largest producer — 7.6x smaller than China</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={globalComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={10} unit=" MT" />
              <YAxis dataKey="country" type="category" fontSize={10} width={80} />
              <Tooltip formatter={(v: number) => `${v} MT`} />
              <Bar dataKey="production" radius={[0, 4, 4, 0]}>
                {globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'China' ? '#B02A30' : '#1e3a5f'} />)}
                <LabelList dataKey="production" position="right" fontSize={9} formatter={(v: number) => `${v} MT`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: World Steel Association (worldsteel.org), 2024</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India Steel — History & Future (MT)</h3>
          <p className="text-xs text-gray-500 mb-3">75-year journey: 1 MT (1950) — 152 MT (2025) — 230 MT target (2030)</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" fontSize={10} />
              <YAxis fontSize={10} unit=" MT" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="capacity" name="Installed Capacity" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4, fill: '#4CAF50' }} connectNulls={false} />
              <Line type="monotone" dataKey="actual" name="Actual Production" stroke="#1e3a5f" strokeWidth={2.5} dot={{ r: 5, fill: '#1e3a5f' }} connectNulls={false} />
              <Line type="monotone" dataKey="projCapacity" name="Capacity Target" stroke="#4CAF50" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 4, fill: '#4CAF50' }} connectNulls={false} />
              <Line type="monotone" dataKey="projected" name="Production Target" stroke="#f37021" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 5, fill: '#f37021' }} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-[#4CAF50] inline-block rounded"></span> Capacity (installed)</span>
            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-[#1e3a5f] inline-block rounded"></span> Production (actual)</span>
            <span>Gap = Utilization headroom (~76% in FY25)</span>
          </div>
          <p className="text-[9px] text-gray-400 mt-1">Source: JPC, steel.gov.in, National Steel Policy 2017</p>
        </div>
      </div>

      {/* Section 2: Segment Split + Route Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Product Segment Split (FY25)</h3>
          <p className="text-xs text-gray-500 mb-3">Click any segment to explore sub-products</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={d.segmentSplit} cx="50%" cy="50%" outerRadius={100} dataKey="share" nameKey="segment"
                label={({ segment, share }) => `${segment}: ${share}%`} labelLine
                onClick={(data: any) => setSegmentPopup(data.segment)}>
                {d.segmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i]} className="cursor-pointer hover:opacity-80 transition" />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Production Route Split</h3>
          <p className="text-xs text-gray-500 mb-3">Click any route to understand the steelmaking process</p>
          <div className="space-y-3 mt-4">
            {d.routeSplit.map((r, i) => (
              <button key={i} onClick={() => setRoutePopup(r.route)} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-maroon/5 border border-gray-100 transition cursor-pointer hover:shadow-sm active:scale-[0.99]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center text-lg font-bold text-navy">{i + 1}</div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-navy block">{r.route}</span>
                    <span className="text-[10px] text-gray-500">{r.route === 'BF-BOF' ? 'Iron Ore + Coking Coal — Pig Iron — Steel' : r.route === 'EAF' ? 'Scrap/DRI + Electricity — Molten Steel' : 'Scrap + Electricity — Long Products'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-maroon">{r.share}%</span>
                  <span className="text-[10px] text-gray-400 block">{r.capacity} MTPA</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-[9px] text-gray-400 mt-3">Source: steel.gov.in, JPC Annual Report</p>
        </div>
      </div>

      {/* Segment Popup */}
      {segmentPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSegmentPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{segmentPopup}</h3><button onClick={() => setSegmentPopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div>
            <p className="text-sm text-gray-600">See the Overview tab for detailed sub-product breakdown with share percentages for each segment.</p>
          </div>
        </div>
      )}

      {/* Route Popup */}
      {routePopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setRoutePopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{routePopup}</h3><button onClick={() => setRoutePopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div>
            <p className="text-sm text-gray-700 leading-relaxed">{routePopup === 'BF-BOF' ? 'Blast Furnace-Basic Oxygen Furnace: The integrated route using iron ore + coking coal. Produces 55% of India\'s steel. Used by Tata Steel, SAIL, AMNS India. Capital intensive but best for flat products (HRC/CRC). Carbon intensity: 2.5T CO2/T steel.' : routePopup === 'EAF' ? 'Electric Arc Furnace: Uses scrap metal or DRI + electricity to melt steel at 1600°C. 28% of India\'s production. Used by JSW Steel, JSPL. Lower capex, flexible scale, lower carbon (1.2T CO2/T). Growing with green H2-DRI route.' : 'Induction Furnace: Small-scale secondary producers using scrap. 17% share with 1,000+ units in Chhattisgarh, Gujarat, Jharkhand. Mainly long products (TMT, angles, channels). Lower quality but serves Tier-2/3 construction market.'}</p>
          </div>
        </div>
      )}

      {/* Section 3: Supply-Demand + Per Capita */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India Supply-Demand Balance (MT)</h3>
          <p className="text-xs text-gray-500 mb-3">India is a net exporter (+1.7 MT in FY25)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={supplyDemand}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" fontSize={10} />
              <YAxis fontSize={10} unit=" MT" />
              <Tooltip formatter={(v: number) => `${v} MT`} />
              <Legend />
              <Bar dataKey="production" fill="#1e3a5f" name="Production" radius={[4, 4, 0, 0]} />
              <Bar dataKey="consumption" fill="#f37021" name="Consumption" radius={[4, 4, 0, 0]} />
              <Bar dataKey="exports" fill="#10b981" name="Exports" radius={[4, 4, 0, 0]} />
              <Bar dataKey="imports" fill="#8b5cf6" name="Imports" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setTradePopup('exports')} className="text-[10px] px-3 py-1.5 bg-green-50 text-green-700 rounded-lg font-semibold border border-green-200 hover:bg-green-100"> Export Details (7.5 MT / $6.8B)</button>
            <button onClick={() => setTradePopup('imports')} className="text-[10px] px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg font-semibold border border-purple-200 hover:bg-purple-100"> Import Details (5.8 MT / $5.2B)</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Per Capita Steel Consumption</h3>
          <p className="text-xs text-gray-500 mb-4">India at 108 kg — massive headroom vs peers</p>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center p-4 bg-maroon/5 rounded-xl border border-maroon/10">
              <div className="text-3xl font-black text-maroon">108</div>
              <div className="text-xs text-gray-600 font-medium mt-1">India (kg)</div>
            </div>
            <div className="text-center p-4 bg-navy/5 rounded-xl border border-navy/10">
              <div className="text-3xl font-black text-navy">215</div>
              <div className="text-xs text-gray-600 font-medium mt-1">World Avg (kg)</div>
            </div>
            <div className="text-center p-4 bg-orange/10 rounded-xl border border-orange/10">
              <div className="text-3xl font-black text-orange-600">604</div>
              <div className="text-xs text-gray-600 font-medium mt-1">China (kg)</div>
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <p className="text-xs text-green-800"><strong>Growth Headroom:</strong> India's per capita is just 50% of world average and 18% of China. NSP 2017 targets 160 kg by 2030-31 — implying near-doubling of domestic demand from current levels.</p>
          </div>
          <div className="mt-3"><HealthGauge score={76} label="Industry Health" /></div>
        </div>
      </div>

      {/* Trade Popup */}
      {tradePopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setTradePopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{tradePopup === 'exports' ? ' Steel Exports — 7.5 MT ($6.8B)' : ' Steel Imports — 5.8 MT ($5.2B)'}</h3>
              <button onClick={() => setTradePopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            {tradePopup === 'exports' ? (
              <div className="space-y-2">
                <p className="text-xs text-gray-600 mb-3">Mainly commodity HRC & Long Products to Asia/Europe. Exports declined from 13.5 MT peak (FY22) due to rising domestic demand.</p>
                {[{c:'Vietnam',s:'18%',v:'1.35 MT'},{c:'Italy',s:'9%',v:'0.68 MT'},{c:'Nepal',s:'8%',v:'0.60 MT'},{c:'Belgium',s:'7%',v:'0.53 MT'},{c:'UAE',s:'6%',v:'0.45 MT'},{c:'Others',s:'52%',v:'3.89 MT'}].map((d,i)=>(<div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{d.c}</span><div className="text-right"><span className="text-xs font-bold text-green-700">{d.s}</span><span className="text-[10px] text-gray-500 ml-2">{d.v}</span></div></div>))}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-600 mb-3">Mainly specialty grades India doesn't produce — CRGO (transformers), auto-grade coated steel, stainless special grades.</p>
                {[{c:'South Korea',s:'22%',v:'1.28 MT'},{c:'Japan',s:'18%',v:'1.04 MT'},{c:'China',s:'15%',v:'0.87 MT'},{c:'Indonesia',s:'12%',v:'0.70 MT'},{c:'Russia',s:'8%',v:'0.46 MT'},{c:'Others',s:'25%',v:'1.45 MT'}].map((d,i)=>(<div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{d.c}</span><div className="text-right"><span className="text-xs font-bold text-purple-700">{d.s}</span><span className="text-[10px] text-gray-500 ml-2">{d.v}</span></div></div>))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 4: Cost Curve (full width) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Global Steel Cost Curve ($/tonne)</h3>
        <p className="text-xs text-gray-500 mb-4">India's integrated producers are in the global lowest quartile</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costCurve}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="country" fontSize={10} />
            <YAxis fontSize={10} domain={[300, 600]} unit="$" />
            <Tooltip formatter={(v: number) => `$${v}/tonne`} />
            <Bar dataKey="cost" name="Cash Cost ($/T)" radius={[4, 4, 0, 0]}>
              {costCurve.map((e, i) => <Cell key={i} fill={e.country.includes('India') ? '#B02A30' : '#005B75'} />)}
              <LabelList dataKey="cost" position="top" fontSize={10} formatter={(v: number) => `$${v}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="p-3 bg-maroon/5 rounded-lg border border-maroon/10">
            <p className="text-xs text-maroon"><strong>India Advantage:</strong> Tata Steel ($350/T) and JSW ($370/T) benefit from captive iron ore, low labor costs, and fully integrated operations.</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-800"><strong>India vs China:</strong> India's top players are $50-70/T cheaper than China's average ($420/T) because China imports 80% of iron ore at $100+/T while Tata/JSW mine their own at $12-15/T.</p>
          </div>
        </div>
        <p className="text-[9px] text-gray-400 mt-2">Source: CRU Global Cost Curve 2024, Tata Steel Investor Presentation FY25, World Steel Association</p>
      </div>

      {/* Key Takeaways */}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#1e3a5f] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3"> Key Takeaways — India Steel Sector</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Production</div>
            <p className="text-xs text-gray-700">152.2 MT in FY25 (+5.7% YoY). 6th consecutive year of growth. Target: 300 MT by 2030.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Demand Drivers</div>
            <p className="text-xs text-gray-700">Infrastructure (35%), Construction (25%), Auto (15%), Capital goods (10%). PM Gati Shakti + NIP driving growth.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Cost Leadership</div>
            <p className="text-xs text-gray-700">India's top producers in global lowest quartile. Captive ore + low labor = $350-370/T vs world avg $450/T.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Growth Headroom</div>
            <p className="text-xs text-gray-700">Per capita 108 kg vs global 215 kg. India needs to double consumption to match world average. Urbanization is key driver.</p>
          </div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: JPC (steel.gov.in), World Steel Association, CRU, National Steel Policy 2017, Company Annual Reports</p>
      </div>
    </div>
  )
}


function OwnershipTab() {
  return (
    <div className="space-y-6">
      {/* PSU vs Private —¬— Enhanced with KPI cards + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">PSU vs Private Sector Split</h3>
          <p className="text-xs text-gray-500 mb-4">Private sector dominates with 73% of India's steel capacity</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={ownershipData.ownershipSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="capacity" nameKey="type" paddingAngle={3}>
                  {ownershipData.ownershipSplit.map((_, i) => <Cell key={i} fill={i === 0 ? '#f37021' : '#1e3a5f'} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v} MTPA`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {ownershipData.ownershipSplit.map((item, i) => (
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
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-200 text-center">
              <div className="text-xs font-bold text-orange-800">Key Private Players</div>
              <div className="text-[9px] text-orange-600 mt-1">Tata, JSW, JSPL, AMNS, Shyam Metalics</div>
            </div>
            <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-center">
              <div className="text-xs font-bold text-blue-800">Key PSU Players</div>
              <div className="text-[9px] text-blue-600 mt-1">SAIL (21.4), RINL (7.3), NMDC Steel (3)</div>
            </div>
          </div>
        </div>

        {/* Ownership Shift —¬— Enhanced */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Ownership Shift Over 25 Years</h3>
          <p className="text-xs text-gray-500 mb-4">Private sector grew from 52% (2000) — — 73% (2025) through organic + M&A growth</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ownershipData.psuVsPrivateTimeline}>
              <defs>
                <linearGradient id="privGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f37021" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f37021" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="psuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" fontSize={10} tick={{ fill: '#64748b' }} />
              <YAxis fontSize={10} domain={[0, 100]} tick={{ fill: '#64748b' }} unit="%" />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Legend />
              <Area type="monotone" dataKey="privateShare" stackId="1" stroke="#f37021" fill="url(#privGrad)" name="Private Sector (%)" strokeWidth={2} />
              <Area type="monotone" dataKey="psuShare" stackId="1" stroke="#1e3a5f" fill="url(#psuGrad)" name="PSU (%)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 p-2 bg-orange-50 rounded-lg border border-orange-100">
            <p className="text-[10px] text-orange-800"><strong>Key shift:</strong> Tata Steel's acquisition of Bhushan Steel (2018) and JSW's aggressive brownfield expansions drove private share from 68% to 73% in just 5 years. PSU SAIL has not expanded capacity since 2015.</p>
          </div>
        </div>
      </div>

      {/* Top Companies —¬— Enhanced with dual bars + utilization badges */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top Companies —¬— Capacity vs Production (MTPA)</h3>
        <p className="text-xs text-gray-500 mb-4">Capacity utilization shown as badge. Higher = better operational efficiency.</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={ownershipData.topCompanies} layout="vertical" barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={10} tick={{ fill: '#64748b' }} unit=" MT" />
            <YAxis dataKey="name" type="category" fontSize={10} width={120} tick={{ fill: '#1f2937' }} />
            <Tooltip formatter={(v: number) => `${v} MTPA`} />
            <Legend />
            <Bar dataKey="capacity" fill="#1e3a5f" name="Installed Capacity (MTPA)" radius={[0, 4, 4, 0]} barSize={14}>
              <LabelList dataKey="capacity" position="right" fontSize={9} fill="#1e3a5f" formatter={(v: number) => `${v}`} />
            </Bar>
            <Bar dataKey="production" fill="#f37021" name="Actual Production (MT)" radius={[0, 4, 4, 0]} barSize={14}>
              <LabelList dataKey="production" position="right" fontSize={9} fill="#c2410c" formatter={(v: number) => `${v}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {/* Utilization badges */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <h4 className="text-xs font-bold text-navy mb-2 uppercase tracking-wider">Capacity Utilization by Company</h4>
          <div className="flex flex-wrap gap-2">
            {ownershipData.topCompanies.map((c, i) => {
              const util = Math.round((c.production / c.capacity) * 100)
              return (
                <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${util >= 80 ? 'bg-green-50 text-green-700 border-green-300' : util >= 70 ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-red-50 text-red-700 border-red-300'}`}>
                  {c.name}: {util}%
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">India's Steel Production (1950–2025)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={timelineData.historicalProduction}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Area type="monotone" dataKey="production" stroke="#B02A30" fill="#B02A30" fillOpacity={0.3} name="Production (MT)">
              <LabelList dataKey="production" position="top" fontSize={10} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Future Projections (2025–2030)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData.futureProjections}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={11} />
            <YAxis fontSize={11} domain={[100, 320]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="capacity" stroke="#005B75" strokeWidth={3} strokeDasharray="5 5" name="Capacity Target" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="production" stroke="#B02A30" strokeWidth={3} name="Production" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="demand" stroke="#F99D27" strokeWidth={3} name="Demand" dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">National Steel Policy 2017 —¬— 2030 Targets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-navy/5 rounded-xl">
            <div className="text-2xl font-bold text-navy">300</div>
            <div className="text-xs text-gray-500">MTPA Capacity</div>
          </div>
          <div className="text-center p-4 bg-maroon/5 rounded-xl">
            <div className="text-2xl font-bold text-maroon">255</div>
            <div className="text-xs text-gray-500">MT Production</div>
          </div>
          <div className="text-center p-4 bg-orange/10 rounded-xl">
            <div className="text-2xl font-bold text-orange">160 kg</div>
            <div className="text-xs text-gray-500">Per Capita</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">85%+</div>
            <div className="text-xs text-gray-500">Utilization</div>
          </div>
        </div>
      </div>
    </div>
  )
}


function RiskTab({ isAdmin }: { isAdmin: boolean }) {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'bestpractices'>('insurable')
  const [segmentFilter, setSegmentFilter] = useState<'All' | 'Blast Furnace' | 'EAF' | 'Rolling Mill'>('All')
  const [hoveredStrategy, setHoveredStrategy] = useState<string | null>(null)
  const [selectedCase, setSelectedCase] = useState<number | null>(null)

  const strategyTooltips: Record<string, string> = {
    'Transfer': 'Transfer risk to insurer via appropriate policy (MB, Fire, MLOP)',
    'Mitigate': 'Reduce probability/impact through engineering controls & maintenance',
    'Avoid': 'Eliminate exposure by design changes or process substitution',
    'Accept': 'Retain risk within appetite; budget for expected losses',
    'Share': 'Distribute risk across JV partners, reinsurers, or supply chain',
  }

  const probColor = (p: string) => p === 'High' ? 'bg-red-100 text-red-700' : p === 'Medium-High' ? 'bg-orange-100 text-orange-700' : p === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
  const impactColor = (i: string) => i === 'Catastrophic' || i === 'Very High' ? 'bg-red-100 text-red-700' : i === 'High' ? 'bg-orange-100 text-orange-700' : i === 'Medium-High' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'

  const aogRisks = [
    { name: 'Earthquake', probability: 'Low', impact: 'Very High', emv: '—₹200-800 Cr', segments: ['Blast Furnace', 'EAF', 'Rolling Mill'], mitigation: 'Seismic-resistant foundations, base isolation for critical equipment' },
    { name: 'Flood', probability: 'Medium', impact: 'High', emv: '—₹50-300 Cr', segments: ['Blast Furnace', 'EAF', 'Rolling Mill'], mitigation: 'Elevated substations, flood walls around raw material yards' },
    { name: 'Cyclone', probability: 'Medium', impact: 'High', emv: '—₹30-150 Cr', segments: ['Blast Furnace', 'Rolling Mill'], mitigation: 'Wind-rated cladding design, tie-down protocols for overhead cranes' },
    { name: 'Lightning', probability: 'Medium-High', impact: 'Medium', emv: '—₹5-30 Cr', segments: ['Blast Furnace', 'EAF'], mitigation: 'ESE lightning arrestors, surge protection on PLC/DCS systems' },
    { name: 'Landslide', probability: 'Low', impact: 'Medium', emv: '—₹10-50 Cr', segments: ['Blast Furnace'], mitigation: 'Slope stability monitoring, drainage management for ore stacking yards' },
  ]

  const nonAogRisks = [
    { name: 'Machinery Breakdown', probability: 'High', impact: 'Very High', emv: '—₹20-500 Cr', segments: ['Blast Furnace', 'EAF', 'Rolling Mill'], mitigation: 'Condition-based monitoring, vibration analysis on all rotating equipment' },
    { name: 'Fire & Explosion', probability: 'Medium-High', impact: 'Catastrophic', emv: '—₹100-1000 Cr', segments: ['Blast Furnace', 'EAF', 'Rolling Mill'], mitigation: 'Gas detection networks, automatic deluge systems in cable galleries' },
    { name: 'Electrical Damage', probability: 'High', impact: 'Medium-High', emv: '—₹5-50 Cr', segments: ['EAF', 'Rolling Mill'], mitigation: 'Transformer DGA monitoring, harmonic filtering on EAF power supply' },
    { name: 'Boiler Explosion', probability: 'Low', impact: 'Catastrophic', emv: '—₹50-200 Cr', segments: ['Blast Furnace'], mitigation: 'IBR compliance, NDT of pressure parts, safety valve calibration quarterly' },
    { name: 'Molten Metal Spillage', probability: 'Medium', impact: 'Very High', emv: '—₹30-200 Cr', segments: ['Blast Furnace', 'EAF'], mitigation: 'Ladle tracking systems, refractory thickness monitoring, spill containment pits' },
    { name: 'Gas Leak (CO/BFG/COG)', probability: 'Medium', impact: 'High', emv: '—₹20-100 Cr', segments: ['Blast Furnace'], mitigation: 'Continuous CO monitoring, gas holder integrity checks, emergency purging SOP' },
  ]

  const emvTableData = [
    { risk: 'Machinery Breakdown', prob: 15, impact: 250, emv: 37.5, owner: 'O&M Team', strategy: 'Transfer' },
    { risk: 'Fire & Explosion', prob: 8, impact: 500, emv: 40.0, owner: 'EHS', strategy: 'Mitigate' },
    { risk: 'Earthquake', prob: 2, impact: 800, emv: 16.0, owner: 'Design Engineer', strategy: 'Transfer' },
    { risk: 'Flood / Inundation', prob: 10, impact: 150, emv: 15.0, owner: 'Plant Head', strategy: 'Mitigate' },
    { risk: 'Boiler Explosion', prob: 3, impact: 200, emv: 6.0, owner: 'O&M Team', strategy: 'Transfer' },
    { risk: 'Molten Metal Spillage', prob: 7, impact: 100, emv: 7.0, owner: 'Plant Head', strategy: 'Mitigate' },
    { risk: 'Electrical Damage', prob: 12, impact: 30, emv: 3.6, owner: 'O&M Team', strategy: 'Mitigate' },
    { risk: 'Cyclone', prob: 6, impact: 80, emv: 4.8, owner: 'Insurance', strategy: 'Transfer' },
    { risk: 'Gas Leak', prob: 5, impact: 60, emv: 3.0, owner: 'EHS', strategy: 'Avoid' },
    { risk: 'Lightning', prob: 10, impact: 15, emv: 1.5, owner: 'Design Engineer', strategy: 'Mitigate' },
  ]

  const matrixData: { risk: string; prob: number; impact: number }[] = [
    { risk: 'Machinery BD', prob: 4, impact: 4 }, { risk: 'Fire & Explosion', prob: 3, impact: 5 },
    { risk: 'Earthquake', prob: 1, impact: 5 }, { risk: 'Flood', prob: 3, impact: 3 },
    { risk: 'Boiler Explosion', prob: 1, impact: 5 }, { risk: 'Molten Metal', prob: 3, impact: 4 },
    { risk: 'Electrical', prob: 4, impact: 3 }, { risk: 'Cyclone', prob: 2, impact: 4 },
    { risk: 'Gas Leak', prob: 2, impact: 3 }, { risk: 'Lightning', prob: 3, impact: 2 },
  ]

  const emergingTechRisks = [
    { segment: 'BF-BOF', tech: 'Hydrogen Injection Steelmaking', stage: 'Pilot', risks: 'H2 explosion risk in confined BF tuyere zone, embrittlement of existing pipelines', insurance: 'No standard product —¬— bespoke wording needed', challenge: 'No loss history for H2-BF hybrid; actuarial pricing impossible' },
    { segment: 'EAF', tech: 'Ultra-High Power Transformers (UHP)', stage: 'Scaling', risks: 'Thermal stress cycling, limited maintenance history for 150MVA+ units', insurance: 'MB policy with special transformer clause; MLOP for BI', challenge: 'OEM-only repairs with 12-18 month lead time for replacement' },
    { segment: 'Rolling Mill', tech: 'AI-Based Quality Control (ML Vision)', stage: 'Deployed', risks: 'Cyber intrusion via model poisoning, data integrity failures, false rejection causing yield loss', insurance: 'Cyber policy + MLOP; CAR for commissioning phase', challenge: 'Attribution of loss —¬— is AI error a machinery issue or cyber event?' },
    { segment: 'General', tech: 'Carbon Capture & Utilisation (CCUS)', stage: 'Demo', risks: 'High-pressure CO2 vessels (150+ bar), pipeline rupture, geological storage leakage', insurance: 'CAR/EAR during construction; no operational product yet', challenge: 'Zero loss history globally; regulatory framework under development' },
    { segment: 'Green Steel', tech: 'DRI with Green Hydrogen', stage: 'Pilot', risks: 'Electrolysis cell failure, H2 storage vessel BLEVE, intermittent renewable supply causing thermal shock', insurance: 'MB + BESS policy for electrolyser; ALOP for project delay', challenge: 'Multi-stakeholder risk —¬— electrolyser OEM, H2 storage vendor, steel plant operator' },
  ]

  const insuranceProducts = [
    { product: 'MB (Machinery Breakdown)', covers: 'Sudden mechanical/electrical failure', applicability: 'All segments', gap: 'Excludes gradual deterioration, refractory wear' },
    { product: 'MLOP (Machine Loss of Profit)', covers: 'BI following insured MB event', applicability: 'All segments', gap: '180-day waiting period common; excludes market loss' },
    { product: 'ALOP (Advance Loss of Profit)', covers: 'Delay in project commissioning', applicability: 'New capacity additions', gap: 'Limited to insured delay causes; time excess applies' },
    { product: 'CAR/EAR (Construction/Erection)', covers: 'Physical loss during construction', applicability: 'Greenfield & brownfield', gap: 'Excludes defective design unless DE clause added' },
    { product: 'Cyber Insurance', covers: 'Data breach, ransomware, system failure', applicability: 'EAF (SCADA), Rolling Mill (AI/ML)', gap: 'War/terrorism exclusion; OT-specific coverage limited' },
    { product: 'BESS (Battery Storage)', covers: 'Thermal runaway, cell failure in energy storage', applicability: 'Green Steel (electrolyser backup)', gap: 'New product; limited capacity in Indian market' },
  ]

  const bestPractices = [
    { practice: 'NDT Inspection Protocols', frequency: 'Quarterly', segment: 'All', detail: 'UT thickness gauging on pressure vessels, MPI on crane hooks, RT on critical welds' },
    { practice: 'Thermal Imaging for BF Shell', frequency: 'Daily', segment: 'Blast Furnace', detail: 'IR camera monitoring of BF shell temperature to detect refractory wear before breakout' },
    { practice: 'Gas Holder DGA Monitoring', frequency: 'Monthly', segment: 'Blast Furnace', detail: 'Dissolved gas analysis of gas holder seal oil to detect membrane degradation' },
    { practice: 'Slag Pot Maintenance', frequency: 'Per heat cycle', segment: 'EAF', detail: 'Visual inspection + UT after every 50 heats; mandatory replacement at 40% wall loss' },
    { practice: 'Roll Grinding Schedules', frequency: 'Per campaign', segment: 'Rolling Mill', detail: 'Crown profile measurement after each campaign; CNC grinding to OEM specifications' },
    { practice: 'Fire Suppression in Cable Galleries', frequency: 'Annual test', segment: 'All', detail: 'Clean agent (Novec 1230) suppression with VESDA early detection in all cable tunnels' },
    { practice: 'Ladle Refractory Tracking', frequency: 'Per heat', segment: 'Blast Furnace', detail: 'Laser-based refractory thickness measurement; condemned at 60% lining consumption' },
    { practice: 'EAF Electrode Monitoring', frequency: 'Continuous', segment: 'EAF', detail: 'Real-time electrode consumption tracking; auto tip-distance regulation to prevent breakage' },
  ]

  const caseStudies = [
    { title: 'RINL Vizag - Ladle Explosion (June 2025)', plant: 'RINL Visakhapatnam Steel Plant, AP', loss: 'Rs 200+ Cr + 9 fatalities', cause: 'Residual argon in casting system created fire bubble in molten steel; slide-gate failure', lesson: 'Mandatory gas purging protocol, auto-shutdown on sensor failure, independent safety audits', claimType: 'Fire + WC + BI', date: 'June 2025', segment: 'BF - Casting', detail: 'The incident occurred during ladle transfer when residual argon gas not properly purged created a fire bubble in molten steel. The slide-gate mechanism failed, causing sudden release of molten metal. 9 workers killed instantly. CITU investigation revealed 645 safety lapses reported over prior 2 years. Plant lacked automated ladle tracking and heat-resistant PPE within 10m of molten zones. Plant shut 45 days for investigation.', insuranceNote: 'Highlights need for: WC with high limits for fatality scenarios, MLOP for investigation shutdown, Public Liability for third-party claims, D and O for management accountability.' },
    { title: 'Tata Steel - BF Relining Overrun (2023)', plant: 'Tata Steel Jamshedpur, Jharkhand', loss: 'Rs 1,500 Cr (planned + overrun)', cause: 'BF-H relining extended 30 days beyond schedule due to refractory supply chain delay from China', lesson: 'ALOP policy critical for relining; pre-position refractory inventory 6 months ahead', claimType: 'MLOP + ALOP', date: 'Mar-Sep 2023', segment: 'Blast Furnace', detail: 'BF-H (4,000 m3, largest at Jamshedpur) taken down for planned relining after 18-year campaign. 150-day shutdown extended to 180 days due to refractory brick supply delay from China (shipping disruption + quality rejection). Each day of BF-H downtime = Rs 8 Cr production loss. 30-day overrun alone cost Rs 240 Cr. ALOP coverage had 30-day time excess (deductible), meaning first 30 days of delay were self-insured.', insuranceNote: 'ALOP must have 12+ month indemnity period for BF relining. Time excess of 30 days too tight for international supply chain. Need Contingent BI for critical supplier failure. Pre-position 110% refractory requirement 6 months before shutdown.' },
    { title: 'JSW Vijayanagar - Rolling Mill Fire (2022)', plant: 'JSW Steel Vijayanagar, Karnataka', loss: 'Rs 350 Cr (PD + BI)', cause: 'Hydraulic oil leak on hot strip mill ignited by radiant heat from transfer bar; cable gallery destroyed', lesson: 'Fire-resistant hydraulic fluids mandatory; thermal shielding of oil systems near hot zones', claimType: 'Fire + MLOP', date: 'Aug 2022', segment: 'Rolling Mill', detail: 'Hydraulic oil line (mineral oil, flash point 210 deg C) developed pinhole leak. Oil spray contacted transfer bar at 1100 deg C, igniting instantly. Fire spread via cable gallery running parallel to mill, destroying 800m of power/control cables. HSM (5 MTPA) shut 42 days. Physical damage: Rs 120 Cr (hydraulics + cables + panels). BI loss: Rs 230 Cr (42 days x Rs 5.5 Cr/day). JSW mandated fire-resistant hydraulic fluids (HFD type) across all mills post-incident.', insuranceNote: 'Fire policy must include cable gallery extension. MLOP critical as BI was 2x physical damage. Risk improvement: fire-resistant hydraulic fluids, cable galleries need independent suppression (Novec 1230 or water mist).' },
    { title: 'SAIL Bhilai - CO Gas Leak (Jan 2025)', plant: 'SAIL Bhilai Steel Plant, Chhattisgarh', loss: 'Rs 45 Cr + 3 hospitalized', cause: 'Corroded CO gas pipeline joint failure in coke oven battery area during night shift', lesson: 'UT-based pipeline integrity program, real-time CO monitors with auto-isolation valves', claimType: 'MB + WC', date: 'January 2025', segment: 'Coke Oven - Gas Network', detail: 'Corroded joint on 600mm CO gas pipeline failed at 2:30 AM. CO concentration reached 800 ppm (IDLH limit 1200 ppm) before detection. 3 workers hospitalized with CO poisoning. Pipeline was 35 years old with no recent UT thickness survey. Investigation found 60% wall loss at failed joint from internal corrosion (condensate accumulation). Coke Oven Battery 8 stopped 15 days for pipeline replacement. Gas supply to BF also affected 3 days.', insuranceNote: 'MB covers pipeline failure. WC for occupational exposure. MLOP for production loss. Risk improvement: pipeline integrity management with UT survey every 2 years for gas pipelines over 25 years old. Real-time gas monitoring with auto-isolation valves reduces claim severity.' },
    { title: 'AMNS Hazira - Tapi River Flood (Aug 2024)', plant: 'AMNS India, Hazira, Gujarat', loss: 'Rs 180 Cr (PD) + 45-day shutdown', cause: 'Tapi river flooding inundated raw material yard and substation; 6m water exceeded 4.5m design level', lesson: 'Raise substation plinth above 1-in-100 year flood; relocate critical MCC rooms', claimType: 'AOG Flood + MLOP', date: 'August 2024', segment: 'Entire Plant - Flood', detail: 'Unprecedented 320mm rainfall in 24 hours caused Tapi river breach. Water at plant reached 6m exceeding 4.5m design by 33%. Raw material yard (1.2 MT ore and coal) fully submerged - 40% material contaminated unusable. Two 33kV substations destroyed. DRI kilns suffered thermal shock from cold water. Total shutdown: 45 days. Physical damage: Rs 180 Cr (substations Rs 60 Cr, raw material Rs 50 Cr, DRI refractory Rs 40 Cr, others Rs 30 Cr). BI loss estimated Rs 400+ Cr (under adjudication).', insuranceNote: 'AOG flood coverage with adequate TSI. MLOP with 90+ day indemnity for integrated plant. Stock-in-open for raw materials. Climate change increasing flood frequency. Risk improvement: raise substation plinth to 1-in-500 year flood level, relocate MCCs to first floor.' },
  ]

  const claimsLearnings = [
    'Machinery Breakdown accounts for 45% of all steel claims by frequency —¬— BF blowers, rolling mill gearboxes, and EAF transformers are top items',
    'Business Interruption losses exceed physical damage by 3-5x in integrated plants due to sequential process dependency',
    'Refractory failures (BF hearth, BOF vessel, ladle lining) are the single largest cause of unplanned shutdowns —¬— average 60-90 day outage',
    'Flood claims in coastal/riverine plants (Hazira, Vizag) have increased 3x in past decade due to climate change intensification',
    'Molten metal incidents have highest fatality rate —¬— every major Indian steel plant has had at least one such event in past 5 years',
  ]

  const glossary = [
    { term: 'BF', full: 'Blast Furnace', desc: 'Primary ironmaking unit; reduces iron ore using coke at ~1500×°C' },
    { term: 'BOF', full: 'Basic Oxygen Furnace', desc: 'Converts pig iron to steel by blowing oxygen; also called LD converter' },
    { term: 'EAF', full: 'Electric Arc Furnace', desc: 'Melts scrap/DRI using electric arcs at ~1600×°C' },
    { term: 'DRI', full: 'Direct Reduced Iron', desc: 'Sponge iron produced by reducing ore with gas/coal without melting' },
    { term: 'HRC', full: 'Hot Rolled Coil', desc: 'Flat steel product rolled above recrystallization temperature' },
    { term: 'CRC', full: 'Cold Rolled Coil', desc: 'HRC further processed at room temperature for thinner gauge and better finish' },
    { term: 'CRGO', full: 'Cold Rolled Grain Oriented', desc: 'Electrical steel for transformer cores with directional magnetic properties' },
    { term: 'NDT', full: 'Non-Destructive Testing', desc: 'Inspection methods (UT, MPI, RT, PT) that do not damage the component' },
    { term: 'DGA', full: 'Dissolved Gas Analysis', desc: 'Oil testing technique to detect incipient faults in transformers/gas holders' },
    { term: 'LPS', full: 'Lightning Protection System', desc: 'External (air terminals + down conductors) + internal (SPDs) protection' },
    { term: 'PLF', full: 'Plant Load Factor', desc: 'Ratio of actual output to maximum possible output in a period' },
    { term: 'MLOP', full: 'Machinery Loss of Profit', desc: 'Insurance covering BI following an insured machinery breakdown event' },
    { term: 'CAR/EAR', full: 'Construction/Erection All Risks', desc: 'Insurance for physical loss during construction or erection phase' },
    { term: 'EMV', full: 'Expected Monetary Value', desc: 'Probability ×— Impact; used to prioritize risks quantitatively' },
    { term: 'BI', full: 'Business Interruption', desc: 'Loss of gross profit during indemnity period following insured event' },
    { term: 'Refractory', full: 'Refractory Lining', desc: 'Heat-resistant ceramic lining in furnaces, ladles, and converters (1600-1800×°C rated)' },
  ]

  const filteredAog = segmentFilter === 'All' ? aogRisks : aogRisks.filter(r => r.segments.includes(segmentFilter))
  const filteredNonAog = segmentFilter === 'All' ? nonAogRisks : nonAogRisks.filter(r => r.segments.includes(segmentFilter))

  const matrixCellColor = (p: number, i: number) => {
    const score = p * i
    if (score >= 15) return 'bg-red-500 text-white'
    if (score >= 10) return 'bg-orange-400 text-white'
    if (score >= 5) return 'bg-amber-300 text-gray-900'
    return 'bg-green-300 text-gray-900'
  }

  const riskSubTabs: { id: typeof riskSubTab; label: string }[] = [
    { id: 'insurable', label: 'Insurable Risks' },
    { id: 'bestpractices', label: 'Case Studies & Best Practices' },
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
              <p className="text-xs text-gray-500">Steel Industry —¬— Blast Furnace | EAF | Rolling Mill</p>
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

      {/* TAB 1: Insurable Risks */}
      {riskSubTab === 'insurable' && (
        <div className="space-y-6">
          {/* Segment Filter */}
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Blast Furnace', 'EAF', 'Rolling Mill'] as const).map((seg) => (
              <button key={seg} onClick={() => setSegmentFilter(seg)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  segmentFilter === seg ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-300 hover:border-navy'
                }`}>{seg}</button>
            ))}
          </div>

          {/* AOG Section */}
          <div>
            <h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
              <CloudRain size={16} className="text-blue-500" /> Acts of God (AOG) Perils
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAog.map((r, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-navy text-sm">{r.name}</h5>
                    <span className="text-xs font-bold text-maroon">{r.emv}</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${probColor(r.probability)}`}>P: {r.probability}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${impactColor(r.impact)}`}>I: {r.impact}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {r.segments.map((s, j) => (
                      <span key={j} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{s}</span>
                    ))}
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
              {filteredNonAog.map((r, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-navy text-sm">{r.name}</h5>
                    <span className="text-xs font-bold text-maroon">{r.emv}</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${probColor(r.probability)}`}>P: {r.probability}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${impactColor(r.impact)}`}>I: {r.impact}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {r.segments.map((s, j) => (
                      <span key={j} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{s}</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 italic">{r.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Products & Key Add-ons — Steel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-1 flex items-center gap-2">
              <Shield size={16} className="text-maroon" /> Insurance Products & Key Add-ons — Steel
            </h4>
            <p className="text-xs text-gray-500 mb-5">Coverages offered for the steel industry sector</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Material Damage Add-ons */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h5 className="text-xs font-bold text-navy mb-3">Material Damage Add-ons</h5>
                <ul className="space-y-1.5">
                  {[
                    'Obsolete Part/Equipment Clause',
                    'OEM Clause',
                    'Waiver of Under Insurance',
                    'Margin Clause',
                    'Capital Additions',
                    'Destruction of Sound Property Clause',
                    'Additional Custom Duty',
                    'Immediate Repair Clause',
                    'Minor Works',
                    'Expediting Expenses (Air & Express Freight)',
                    'Accidental Damage',
                    'Serial Loss Clause',
                    'Molten Metal Extension',
                    'Refractory Damage (sublimit basis)',
                  ].map((item, i) => (
                    <li key={i} className="text-[11px] text-gray-700 flex items-start gap-2">
                      <span className="text-maroon mt-0.5">—¢</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business Interruption Add-ons */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h5 className="text-xs font-bold text-navy mb-3">Business Interruption Add-ons</h5>
                <ul className="space-y-1.5">
                  {[
                    'Customer Premises Extension',
                    'Additional Increased Cost of Working',
                    'Prevention of Access',
                    'Contingent BI (Suppliers/Customers)',
                    'Interdependency Clause (BF-BOF-Caster-Mill chain)',
                    'Utilities Extension (Power/Water/Gas failure)',
                    'Denial of Access (civil authority)',
                    'Contract Penalty Clause',
                    'Accumulated Stocks Extension',
                  ].map((item, i) => (
                    <li key={i} className="text-[11px] text-gray-700 flex items-start gap-2">
                      <span className="text-maroon mt-0.5">—¢</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Products */}
            <div className="mt-5 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h5 className="text-xs font-bold text-navy mb-3">Key Products</h5>
              <div className="flex flex-wrap gap-2">
                {[
                  'Fire & Allied Perils',
                  'Machinery Breakdown (MB)',
                  'MLOP (Machine Loss of Profit)',
                  'FLOP (Fire Loss of Profit)',
                  'Mega Risk Policy',
                  'Workers Compensation',
                  'Comprehensive General Liability',
                  'Marine Cargo (Open Cover)',
                  'CAR/EAR (Construction/Erection)',
                  'Cyber Insurance',
                  'D&O Liability',
                ].map((item, i) => (
                  <span key={i} className="text-[11px] px-3 py-1.5 bg-white rounded-lg border border-blue-200 text-navy font-semibold shadow-sm">—¢ {item}</span>
                ))}
              </div>
            </div>

            {/* Industry-Specific Add-ons — Steel */}
            <div className="mt-5 bg-orange-50 rounded-xl p-4 border border-orange-200">
              <h5 className="text-xs font-bold text-orange-800 mb-3 flex items-center gap-1.5">— Industry-Specific Add-ons — Steel</h5>
              <ul className="space-y-1.5">
                {[
                  'Inspection and overhauling of Blast Furnace (BF) & BOF converter relining',
                  'Overhauling of steam, water and gas turbines in captive power plants',
                  'Overhauling of electric motors and generators above 1,000 kW (rolling mill drives, blowers)',
                  'Refractory materials and/or masonry in BOF, ladles, tundish and reheating furnaces',
                  'Catalysts, Lining, Refractory and Consumable components in DRI kilns',
                  'Components along the hot-gas path of gas turbines (captive power)',
                  'Repairs to combustion engines (gas engines in by-product gas recovery)',
                  'Rewinding of electric machines (motors, generators, transformers — EAF & rolling)',
                  'Shut down / start up costs (planned BF relining & annual overhaul)',
                  'Flue gas purification plants (ESP, bag filters, DeSOx/DeNOx systems)',
                  'Land and Water Contaminant Cleanup, Removal and Disposal (slag yards, coke ovens)',
                  'Molten metal handling equipment (ladle cars, torpedo ladles, casting machines)',
                  'Continuous casting machine — mould, segments and strand guide roller replacement',
                  'Coke oven battery repairs and heating wall reconstruction',
                  'Water treatment & cooling systems (for BF cooling, EAF electrode cooling)',
                ].map((item, i) => (
                  <li key={i} className="text-[11px] text-orange-900 flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5 font-bold">—¸</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Best Practices & Case Studies */}
      {riskSubTab === 'bestpractices' && (
        <div className="space-y-6">
          {/* Best Practices Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
            <h4 className="text-sm font-bold text-navy mb-4 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" /> Risk Mitigation Best Practices
            </h4>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-navy/20">
                  <th className="text-left py-2 px-2 font-bold text-navy">Practice</th>
                  <th className="text-center py-2 px-2 font-bold text-navy">Frequency</th>
                  <th className="text-center py-2 px-2 font-bold text-navy">Segment</th>
                  <th className="text-left py-2 px-2 font-bold text-navy">Details</th>
                </tr>
              </thead>
              <tbody>
                {bestPractices.map((bp, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-cream/50">
                    <td className="py-2 px-2 font-semibold text-gray-800">{bp.practice}</td>
                    <td className="py-2 px-2 text-center"><span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">{bp.frequency}</span></td>
                    <td className="py-2 px-2 text-center"><span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{bp.segment}</span></td>
                    <td className="py-2 px-2 text-gray-600">{bp.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Case Studies */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500" /> Case Studies —¬— Major Steel Losses (India)
            </h4>
            <p className="text-xs text-gray-500 mb-4">Click any case study for detailed analysis and insurance implications</p>
            <div className="space-y-3">
              {caseStudies.map((cs, i) => (
                <div key={i} onClick={() => setSelectedCase(i)} className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-maroon/30 transition cursor-pointer bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-navy text-sm">{cs.title}</h5>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold">{cs.claimType}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-gray-500">
                    <span><strong>Plant:</strong> {cs.plant}</span>
                    <span><strong>Loss:</strong> <span className="text-red-600 font-bold">{cs.loss}</span></span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold">{cs.segment}</span>
                    <span className="text-[9px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{cs.date}</span>
                    <span className="text-[9px] text-maroon font-bold ml-auto">View Details →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Case Study Detail Popup */}
            {selectedCase !== null && caseStudies[selectedCase] && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-navy">{caseStudies[selectedCase].title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-bold">{caseStudies[selectedCase].claimType}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold">{caseStudies[selectedCase].segment}</span>
                        <span className="text-[10px] text-gray-500">{caseStudies[selectedCase].date}</span>
                      </div>
                    </div>
                    <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">×</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-[9px] font-bold text-gray-500 uppercase block mb-1">Plant Location</span>
                      <span className="text-sm font-semibold text-navy">{caseStudies[selectedCase].plant}</span>
                    </div>
                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                      <span className="text-[9px] font-bold text-red-600 uppercase block mb-1">Estimated Loss</span>
                      <span className="text-sm font-bold text-red-700">{caseStudies[selectedCase].loss}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Root Cause Analysis</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{caseStudies[selectedCase].cause}</p>
                  </div>
                  <div className="p-4 bg-navy/5 rounded-xl border border-navy/10 mb-4">
                    <span className="text-[10px] font-bold text-navy uppercase block mb-2">Detailed Incident Description</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{caseStudies[selectedCase].detail}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-4">
                    <span className="text-[10px] font-bold text-green-700 uppercase block mb-2">Key Learnings</span>
                    <p className="text-sm text-green-800 leading-relaxed">{caseStudies[selectedCase].lesson}</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block mb-2">Insurance Implications</span>
                    <p className="text-sm text-amber-800 leading-relaxed">{caseStudies[selectedCase].insuranceNote}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Claims Learnings */}
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-maroon border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-3">Top 5 Claims Patterns —¬— Steel Industry</h4>
            <div className="space-y-2">
              {claimsLearnings.map((cl, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-maroon text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-xs text-gray-700">{cl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Glossary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-4">Technical Glossary —¬— Steel Risk Assessment</h4>
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
        </div>
      )}
    </div>
  )
}


function PlayersTab() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)

  const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
    'Tata Steel': { hq: 'Mumbai', ceo: 'T.V. Narendran', founded: '1907', type: 'Private', plants: 'Jamshedpur, Kalinganagar, Meramandali, Netherlands, UK', expansion: 'Kalinganagar Phase 2 (5 MTPA) commissioned 2025. Target 40 MTPA by FY28.', moat: '100% captive iron ore, lowest cost producer, strongest brand (Tata Tiscon)' },
    'JSW Steel': { hq: 'Mumbai', ceo: 'Jayant Acharya', founded: '1982', type: 'Private', plants: 'Vijayanagar, Dolvi, Salem, Angul', expansion: 'Vijayanagar to 20 MTPA, Odisha 13.2 MTPA greenfield. Target 50 MTPA by FY30.', moat: 'Fastest growth, highest margins (19%), strong value-added mix' },
    'SAIL': { hq: 'New Delhi', ceo: 'Amarendu Prakash', founded: '1954', type: 'PSU', plants: 'Bhilai, Rourkela, Durgapur, Bokaro, Burnpur', expansion: 'Modernization ongoing. No major greenfield planned. Target 35 MTPA.', moat: 'Rail supplier monopoly (Indian Railways), defense-grade plates' },
    'AMNS India': { hq: 'Mumbai', ceo: 'Dilip Oommen', founded: '2019', type: 'JV (ArcelorMittal + Nippon Steel)', plants: 'Hazira (Gujarat)', expansion: 'Hazira to 15 MTPA by FY27, then 24 MTPA. IPO under consideration.', moat: 'Global steelmaking expertise, flat product quality leadership' },
    'JSPL': { hq: 'New Delhi', ceo: 'Bimlendra Jha', founded: '1952', type: 'Private', plants: 'Raigarh (CG), Angul (Odisha), Patratu (JH)', expansion: 'Angul to 12 MTPA by FY26. Rail production to 2 MTPA.', moat: 'Rail + structural specialist, DRI-EAF green route, low debt' },
    'RINL': { hq: 'Visakhapatnam', ceo: 'Atul Bhatt', founded: '1982', type: 'PSU', plants: 'Visakhapatnam (AP)', expansion: 'Strategic disinvestment pending. No expansion planned.', moat: 'Shore-based plant with port access, wire rod specialist' },
    'Shyam Metalics': { hq: 'Kolkata', ceo: 'B.B. Agarwal', founded: '2002', type: 'Private', plants: 'Sambalpur (Odisha), Jamuria (WB)', expansion: 'Integrated capacity to 15 MTPA. Ferro alloys expansion.', moat: 'Eastern India dominance, vertical integration (pellet to finished)' },
    'APL Apollo': { hq: 'Delhi', ceo: 'Sanjay Gupta', founded: '1986', type: 'Private', plants: 'Raipur, Hosur, Dubai, Dammam', expansion: '5 MTPA structural tube capacity. International expansion.', moat: 'India\'s #1 structural tube maker, direct-to-consumer DFT technology' },
  }

  const radarData = [
    { metric: 'Revenue', Tata: 90, JSW: 75, SAIL: 50, JSPL: 35 },
    { metric: 'Capacity', Tata: 85, JSW: 80, SAIL: 55, JSPL: 40 },
    { metric: 'Margin', Tata: 65, JSW: 80, SAIL: 45, JSPL: 75 },
    { metric: 'Growth', Tata: 70, JSW: 95, SAIL: 30, JSPL: 85 },
    { metric: 'Integration', Tata: 95, JSW: 60, SAIL: 70, JSPL: 65 },
    { metric: 'Brand', Tata: 95, JSW: 70, SAIL: 60, JSPL: 50 },
  ]

  const marketShareTrend = [
    { company: 'Tata Steel', fy23: 16.2, fy25: 17.3, change: +1.1 },
    { company: 'JSW Steel', fy23: 14.5, fy25: 15.2, change: +0.7 },
    { company: 'SAIL', fy23: 11.8, fy25: 10.7, change: -1.1 },
    { company: 'AMNS India', fy23: 9.5, fy25: 9.0, change: -0.5 },
    { company: 'JSPL', fy23: 6.0, fy25: 6.3, change: +0.3 },
    { company: 'Others', fy23: 42.0, fy25: 41.5, change: -0.5 },
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
              <button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
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

      {/* Top Players — Revenue vs Capacity dual chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Top Companies by Capacity (MTPA)</h3>
          <p className="text-xs text-gray-500 mb-3"> Click any bar for company deep-dive</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={playersData} layout="vertical" onClick={(data: any) => { if (data && data.activePayload) setSelectedPlayer(data.activePayload[0]?.payload?.name) }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={10} unit=" MT" />
              <YAxis dataKey="name" type="category" fontSize={10} width={100} />
              <Tooltip formatter={(v: number) => `${v} MTPA`} />
              <Bar dataKey="capacity" name="Capacity (MTPA)" radius={[0, 4, 4, 0]} cursor="pointer">
                {playersData.map((_, i) => (
                  <Cell key={i} fill={i < 2 ? '#f37021' : i < 5 ? '#1e3a5f' : '#94a3b8'} />
                ))}
                <LabelList dataKey="capacity" position="right" fontSize={9} formatter={(v: number) => `${v}`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Capacity Additions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Upcoming Capacity Additions</h3>
          <p className="text-xs text-gray-500 mb-4">~38 MTPA new capacity planned by 2029</p>
          <div className="space-y-2.5">
            {capacityPipeline.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-navy">{item.company}</div>
                  <div className="text-[10px] text-gray-500">Target: {item.year}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-maroon">+{item.capacity} MTPA</div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.status === 'Commissioned' ? 'bg-green-100 text-green-700' : item.status === 'Under construction' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-navy/5 rounded-lg border border-navy/10">
            <p className="text-[10px] text-navy"><strong>Target:</strong> India aims for 300 MTPA capacity by 2030 (currently 200.3 MTPA). These projects add ~38 MTPA taking total to ~238 MTPA.</p>
          </div>
        </div>
      </div>

      {/* Market Share Movement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Market Share Movement (FY23 — FY25)</h3>
        <p className="text-xs text-gray-500 mb-4">Private players gaining; PSU SAIL losing share</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {marketShareTrend.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-1">
                <div className="text-sm font-bold text-navy">{c.company}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#f37021]" style={{ width: `${c.fy25 * 4.5}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-navy w-12 text-right">{c.fy25}%</span>
                </div>
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-lg ${c.change > 0 ? 'bg-green-100 text-green-700' : c.change < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                {c.change > 0 ? '—' : '—'}{c.change > 0 ? '+' : ''}{c.change}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Company Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-navy mb-2">Detailed Company Profiles</h3>
        <p className="text-xs text-gray-500 mb-4"> Click any row for expansion plans, plants, and competitive moat</p>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b-2 border-navy/20">
              <th className="text-left py-2 px-2 font-bold text-navy">#</th>
              <th className="text-left py-2 px-2 font-bold text-navy">Company</th>
              <th className="text-right py-2 px-2 font-bold text-navy">Capacity (MTPA)</th>
              <th className="text-right py-2 px-2 font-bold text-navy">Revenue (—¹ Cr)</th>
              <th className="text-center py-2 px-2 font-bold text-navy">Route</th>
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
                <td className="py-2.5 px-2 text-right">—¹{p.revenue.toLocaleString()}</td>
                <td className="py-2.5 px-2 text-center"><span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-semibold">{p.route}</span></td>
                <td className="py-2.5 px-2 text-center text-[10px]">{p.products}</td>
                <td className="py-2.5 px-2 text-center">
                  <span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View —</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
              <h3 className="text-lg font-bold text-navy">Why {selectedState} is a Steel Hub</h3>
              <button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-4 bg-navy/5 rounded-xl mb-4">
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div><div className="text-lg font-bold text-maroon">{selectedInfo.capacity} MT</div><div className="text-[10px] text-gray-500">Capacity</div></div>
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
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Steel Capacity (MTPA)</h3>
        <p className="text-xs text-gray-500 mb-4"> Click any bar to see why that state is a steel manufacturing hub</p>
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
        <h3 className="text-lg font-bold text-navy mb-2">Steel Belt Distribution — India</h3>
        <p className="text-xs text-gray-500 mb-4"> Click any state to understand why it's a steel hub</p>
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

      {/* Steel Corridor Insight */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-bold text-navy mb-3">India's Steel Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <h4 className="text-xs font-bold text-orange-800 mb-1">Eastern Belt (60%+ capacity)</h4>
            <p className="text-[10px] text-orange-700">Odisha — Jharkhand — Chhattisgarh — West Bengal. Iron ore + coal proximity. Tata, SAIL, JSPL, Shyam Metalics core territory.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="text-xs font-bold text-blue-800 mb-1">Western Belt (22% capacity)</h4>
            <p className="text-[10px] text-blue-700">Karnataka — Gujarat — Maharashtra. Port-based coastal plants. JSW Vijayanagar, AMNS Hazira, JSW Dolvi. Export-oriented + auto-grade focus.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="text-xs font-bold text-green-800 mb-1">Southern Belt (8% capacity)</h4>
            <p className="text-[10px] text-green-700">Andhra Pradesh — Tamil Nadu. RINL Vizag, JSW Salem. Wire rods + specialty steel. Proximity to auto/engineering demand in Chennai/Bangalore corridor.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewsTab() {
  const [regionFilter, setRegionFilter] = useState('All')
  const regions = ['All', 'East', 'West', 'South', 'Central', 'National']

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
