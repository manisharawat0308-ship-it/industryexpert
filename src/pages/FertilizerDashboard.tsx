import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, Shield, User, Clock, TrendingUp, Users,
  ShieldAlert, Newspaper, Sprout, Gauge, MapPin, Building2, X, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, LabelList
} from 'recharts'
import AnimatedCounter from '../components/AnimatedCounter'
import NewsFeed from '../components/NewsFeed'
import HealthGauge from '../components/HealthGauge'
import PlayersBoard, { PlayerRow } from '../components/PlayersBoard'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { FERTILIZER_GAME } from '../components/process-game/data/fertilizerGame'
import BusinessModel from '../components/BusinessModel'
import { FERTILIZER_BUSINESS } from '../data/businessModels/fertilizerBusiness'
import FertilizerRiskAnalysis from '../components/risk-analysis/FertilizerRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'

const COLORS = ['#15803d', '#b45309', '#ca8a04', '#4CAF50', '#9C27B0', '#FF5722', '#0369a1']

type FertTab = 'overview' | 'business' | 'ownership' | 'risk' | 'players' | 'geography' | 'news' | 'snapshot' | 'game'

// Ownership / structure of the fertilizer sector by producer type
const ownershipData = [
  { type: 'Cooperatives (IFFCO, KRIBHCO)', share: 35 },
  { type: 'Private Producers', share: 33 },
  { type: 'Central & State PSUs', share: 24 },
  { type: 'Imports / Traded', share: 8 },
]

// Regional distribution of fertilizer PRODUCTION / MANUFACTURING capacity
// (manufacturer's view — where fertilizer is made, not consumed)
const geographyData = [
  { region: 'West (Gujarat, Maharashtra, Rajasthan)', share: 30, projects: 'Largest manufacturing base — urea, NPK, phosphatics',
    crops: 'Gas-based urea, DAP/NPK complexes, industrial chemicals', keyStates: 'Gujarat, Maharashtra, Rajasthan',
    reason: 'The West is India\'s largest fertilizer manufacturing hub. Gujarat hosts IFFCO (Kalol/Kandla), GSFC (Vadodara), GNFC, and Deepak Fertilisers, while Rajasthan has Chambal\'s large Gadepan urea complex and Maharashtra has RCF (Thal/Trombay). Access to gas grids, ports for imported feedstock (phosphoric acid, ammonia), and pro-industry states concentrate capacity here.' },
  { region: 'North (UP, Punjab, Haryana)', share: 22, projects: 'Gas-based urea plants near the demand belt',
    crops: 'Gas-based urea (Matix, IFFCO Aonla/Phulpur, KRIBHCO)', keyStates: 'Uttar Pradesh, Punjab, Haryana',
    reason: 'The North combines large gas-based urea capacity (IFFCO Aonla & Phulpur, revived Gorakhpur/Barauni-linked units, Matix) with proximity to the wheat-rice demand belt. Connectivity to the national gas grid (HVJ pipeline) and the huge captive market make it a strategic production zone for urea.' },
  { region: 'South (AP, Telangana, TN, Karnataka)', share: 20, projects: 'Coastal phosphatic & NPK complexes',
    crops: 'DAP, NPK complexes, coastal import-based plants', keyStates: 'Andhra Pradesh, Telangana, Tamil Nadu, Karnataka',
    reason: 'The South is the phosphatic/NPK manufacturing centre, led by Coromandel International (Kakinada, Vizag, Ennore) and Zuari/MCFL. Coastal locations enable easy import of rock phosphate, phosphoric acid, and ammonia, feeding large complex-fertilizer plants close to southern demand.' },
  { region: 'East (Odisha, WB, Jharkhand)', share: 16, projects: 'Port-based DAP/NPK & revived urea units',
    crops: 'DAP/NPK (Paradeep), revived gas-based urea', keyStates: 'Odisha, West Bengal, Jharkhand',
    reason: 'The East is a growing production region anchored by Paradeep Phosphates (port-based DAP/NPK on the Odisha coast) and revived gas-based urea units (e.g. Sindri/Gorakhpur-cluster revivals linked to the eastern gas grid). Port access for imported feedstock and freight advantages to eastern markets support expansion.' },
  { region: 'Central (MP, Chhattisgarh)', share: 12, projects: 'Blending & smaller complex/SSP units',
    crops: 'NPK blending, SSP, distribution hubs', keyStates: 'Madhya Pradesh, Chhattisgarh',
    reason: 'Central India has a smaller but strategically located manufacturing/blending presence (SSP units, NPK blending, and distribution hubs) that serves the soybean-pulses belt. Its central position gives freight advantages for onward dispatch, though large gas-based capacity is limited.' },
]

const overviewData = {
  production: 43,
  consumption: 65,
  subsidy: 175000,
  ureaCapacity: 26,
  importDependency: 30,
  segmentSplit: [
    { segment: 'Urea', share: 55, value: 24 },
    { segment: 'DAP', share: 18, value: 8 },
    { segment: 'NPK Complex', share: 15, value: 6 },
    { segment: 'MOP (Potash)', share: 7, value: 3 },
    { segment: 'SSP/Others', share: 5, value: 2 },
  ],
  yearlyGrowth: [
    { year: 'FY20', value: 40 },
    { year: 'FY21', value: 41 },
    { year: 'FY22', value: 42 },
    { year: 'FY23', value: 42.5 },
    { year: 'FY24', value: 43 },
    { year: 'FY25', value: 44 },
  ],
  // State-wise share of installed fertilizer MANUFACTURING capacity (%)
  production_state: [
    { state: 'Gujarat', use: 19 },
    { state: 'UP', use: 14 },
    { state: 'Rajasthan', use: 11 },
    { state: 'Maharashtra', use: 10 },
    { state: 'Odisha', use: 9 },
    { state: 'AP/Telangana', use: 12 },
    { state: 'Others', use: 25 },
  ],
}

const playersData = [
  { rank: 1, name: 'IFFCO', segment: 'Urea/NPK (Coop)', revenue: 42000, note: 'World\'s largest fertilizer cooperative', hq: 'New Delhi', founded: 1967, capacity: '~12 MTPA', highlight: 'World\'s largest fertilizer cooperative. Pioneer of nano urea & nano DAP, scaling capacity to cut subsidy burden and imports.' },
  { rank: 2, name: 'Coromandel International', segment: 'Phosphatic/NPK', revenue: 24500, note: 'Murugappa group; DAP, NPK, agrochemicals', hq: 'Secunderabad, Telangana', founded: 1961, capacity: '~5 MTPA', highlight: 'India\'s largest private phosphatic producer. Integrated model with crop protection and 750+ rural retail stores.' },
  { rank: 3, name: 'Chambal Fertilisers', segment: 'Urea', revenue: 18200, note: 'Large private urea producer (Gadepan)', hq: 'Kota, Rajasthan', founded: 1985, capacity: '~3.4 MTPA urea', highlight: 'Among India\'s largest private urea producers (Gadepan I/II/III). Diversifying into technical ammonium nitrate.' },
  { rank: 4, name: 'RCF (Rashtriya Chemicals)', segment: 'Urea/Complex', revenue: 14800, note: 'PSU; urea, complex fertilizers, chemicals', hq: 'Mumbai, Maharashtra', founded: 1978, capacity: 'Urea + NPK + chemicals', highlight: 'Central PSU with strong brands Ujjwala (urea) and Suphala (NPK). Evaluating new capacity and green ammonia.' },
  { rank: 5, name: 'Paradeep Phosphates', segment: 'Phosphatic', revenue: 13500, note: 'DAP, NPK — Paradip, Odisha', hq: 'Bhubaneswar, Odisha', founded: 1981, capacity: '~3 MTPA', highlight: 'Major DAP/NPK producer on the east coast, benefiting from port-based phosphoric acid & ammonia imports.' },
  { rank: 6, name: 'KRIBHCO', segment: 'Urea (Coop)', revenue: 12000, note: 'Krishak Bharati Cooperative — Hazira', hq: 'Noida, Uttar Pradesh', founded: 1980, capacity: '~2 MTPA urea', highlight: 'Large cooperative urea producer at Hazira. Focused on efficient gas-based urea and farmer outreach.' },
  { rank: 7, name: 'GSFC', segment: 'Urea/Complex', revenue: 10200, note: 'Gujarat state fertilizer + chemicals', hq: 'Vadodara, Gujarat', founded: 1962, capacity: 'Fertilizer + caprolactam', highlight: 'Gujarat state PSU with a dual fertilizer + industrial chemicals (caprolactam/nylon) model for diversification.' },
  { rank: 8, name: 'Deepak Fertilisers', segment: 'NPK/Chemicals/TAN', revenue: 9600, note: 'NPK, industrial chemicals, ammonium nitrate', hq: 'Pune, Maharashtra', founded: 1979, capacity: 'TAN + NPK + chemicals', highlight: 'Shifting mix toward high-value chemicals and technical ammonium nitrate for mining/infrastructure demand.' },
]

const newsData = [
  { title: 'Fertilizer subsidy budget maintained at ₹1.7+ Lakh Cr for FY27', date: '2026-08-08', region: 'National', source: 'Dept of Fertilizers', sentiment: 'neutral', summary: 'The government has maintained the fertilizer subsidy at over ₹1.7 Lakh Cr, keeping urea prices controlled for farmers. Delayed subsidy disbursement continues to strain working capital for producers.' },
  { title: 'Nano urea & nano DAP adoption scales up; IFFCO expands capacity', date: '2026-07-22', region: 'North', source: 'IFFCO', sentiment: 'positive', summary: 'Nano urea and nano DAP adoption is expanding as the government promotes alternatives to conventional bulk fertilizers, aiming to cut subsidy burden and import dependence. IFFCO is scaling production across multiple plants.' },
  { title: 'Green ammonia export & green-fertilizer projects gather pace', date: '2026-07-05', region: 'West', source: 'MNRE', sentiment: 'positive', summary: 'Multiple green ammonia projects (electrolytic hydrogen route) have been announced for both export and domestic green-fertilizer feedstock, backed by the National Green Hydrogen Mission. New port-based ammonia terminals are under development.' },
  { title: 'Rock phosphate & phosphoric acid import prices stay volatile', date: '2026-06-18', region: 'National', source: 'FAI', sentiment: 'negative', summary: 'India\'s 90%+ import dependence on rock phosphate and phosphoric acid keeps phosphatic fertilizer economics exposed to global price swings and geopolitical supply concerns from Morocco, Jordan, and Russia.' },
  { title: 'Ammonium Nitrate storage safety norms tightened after global incidents', date: '2026-05-30', region: 'National', source: 'PESO', sentiment: 'neutral', summary: 'Following global AN incidents (Beirut, West Texas), PESO has tightened Ammonium Nitrate storage, segregation, and fire-prevention norms for nitrate-based fertilizer facilities and distribution warehouses.' },
  { title: 'Ammonia leak drill & detection upgrades mandated at urea complexes', date: '2026-05-12', region: 'East', source: 'Ministry of Chemicals', sentiment: 'neutral', summary: 'Urea/ammonia complexes are upgrading continuous ammonia detection, water-mitigation curtains, and community-alert systems following a directive to strengthen toxic-release preparedness at large ammonia-storage sites.' },
]

export default function FertilizerDashboard() {
  const navigate = useNavigate()
  const { username, role } = useAuthStore()
  const isAdmin = role === 'admin'
  const [activeTab, setActiveTab] = useState<FertTab>('overview')

  const tabs: { id: FertTab; label: string; icon: typeof TrendingUp }[] = [
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
      <DashboardHeader title="Fertilizer Industry" />

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
        {activeTab === 'business' && <BusinessModel data={FERTILIZER_BUSINESS} />}
        {activeTab === 'ownership' && <OwnershipTab />}
        {activeTab === 'risk' && <FertilizerRiskAnalysis />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="fertilizer" />}
        {activeTab === 'game' && <ProcessGame data={FERTILIZER_GAME} />}
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
  'Urea': {
    share: '55% of consumption',
    whatItIs: 'The most widely used nitrogen (N) fertilizer (46% N), made from ammonia + CO₂. Produced domestically from natural gas; prices are tightly controlled and heavily subsidised by the government.',
    keyUse: 'Primary nitrogen source for almost every crop — especially wheat, rice, and sugarcane. Its low, fixed price drives over-use and skews India\'s nutrient (NPK) balance.',
    players: 'IFFCO, KRIBHCO, Chambal Fertilisers, RCF, NFL',
  },
  'DAP': {
    share: '18% of consumption',
    whatItIs: 'Di-Ammonium Phosphate — the leading phosphatic (P) fertilizer (18% N, 46% P₂O₅). Depends heavily on imported rock phosphate, phosphoric acid, and ammonia.',
    keyUse: 'Applied at sowing to promote root development. Critical for pulses, oilseeds, and cereals. Economics are exposed to global raw-material and freight prices.',
    players: 'Coromandel, Paradeep Phosphates, IFFCO, Chambal (traded)',
  },
  'NPK Complex': {
    share: '15% of consumption',
    whatItIs: 'Complex fertilizers supplying nitrogen, phosphorus, and potassium in a single granule (e.g. 10-26-26, 12-32-16), giving crops a balanced nutrient dose.',
    keyUse: 'Preferred for balanced fertilisation and horticulture; adoption is rising as the government pushes farmers away from urea over-use toward balanced NPK.',
    players: 'Coromandel, IFFCO, GSFC, RCF (Suphala)',
  },
  'MOP (Potash)': {
    share: '7% of consumption',
    whatItIs: 'Muriate of Potash — the main potassium (K) fertilizer. India has no domestic potash reserves, so it is 100% imported (Canada, Russia, Belarus, Israel).',
    keyUse: 'Improves crop quality, disease resistance, and water regulation. Fully import-dependent, making it the most price- and geopolitics-sensitive nutrient.',
    players: 'IPL (Indian Potash Ltd — main importer), Coromandel',
  },
  'SSP/Others': {
    share: '5% of consumption',
    whatItIs: 'Single Super Phosphate and other/specialty products (micronutrients, water-solubles, nano fertilizers). SSP is a low-analysis phosphatic fertilizer with sulphur.',
    keyUse: 'SSP suits oilseeds and pulses (sulphur need). Specialty/nano products (e.g. Nano Urea, Nano DAP) are an emerging, subsidy-light growth area.',
    players: 'IFFCO (Nano), Rama Phosphates, Coromandel, GSFC',
  },
}

function OverviewTab() {
  const d = overviewData
  const [segmentPopup, setSegmentPopup] = useState<string | null>(null)
  const info = segmentPopup ? productMixInfo[segmentPopup] : null
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-maroon"><AnimatedCounter end={d.production} /> MT</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Production</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-navy"><AnimatedCounter end={d.consumption} /> MT</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Consumption</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-orange-600">₹<AnimatedCounter end={175} />k Cr</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Subsidy</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-green-600"><AnimatedCounter end={d.ureaCapacity} /> MTPA</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Urea Capacity</div></div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className="text-2xl font-black text-red-600"><AnimatedCounter end={d.importDependency} />%</div><div className="text-[10px] font-semibold text-gray-500 mt-1">Import Dependency</div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Product Mix (% of Consumption)</h3>
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
          <h3 className="text-lg font-bold text-navy mb-4">Total Production (MT)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={d.yearlyGrowth}>
              <defs><linearGradient id="fertGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#15803d" stopOpacity={0.3} /><stop offset="95%" stopColor="#15803d" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={11} /><YAxis fontSize={11} /><Tooltip formatter={(v: number) => `${v} MT`} />
              <Area type="monotone" dataKey="value" stroke="#15803d" strokeWidth={2} fill="url(#fertGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-navy mb-4">State-wise Manufacturing Capacity Share (%)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={d.production_state}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="state" fontSize={10} /><YAxis fontSize={10} unit="%" /><Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="use" radius={[4,4,0,0]}>{d.production_state.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}<LabelList dataKey="use" position="top" fontSize={9} formatter={(v: number) => `${v}%`} /></Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-2">Share of installed fertilizer manufacturing capacity by state. Source: Department of Fertilizers, FAI 2024-25</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-navy mb-2 self-start">Sector Health</h3>
          <HealthGauge score={72} label="Fertilizer Health" size="lg" />
          <p className="text-[11px] text-gray-500 text-center mt-3 leading-relaxed">Stable demand and subsidy support keep the sector healthy, tempered by import dependence (phosphates/potash) and gas-price and policy risk.</p>
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
          <h3 className="text-lg font-bold text-navy mb-4">Sector Ownership / Producer Mix (%)</h3>
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
          <h3 className="text-lg font-bold text-navy mb-4">Who Produces India's Fertilizers</h3>
          <div className="space-y-3">
            {ownershipData.map((o, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="flex-1 text-sm font-semibold text-navy">{o.type}</span>
                <span className="text-sm font-bold text-maroon">{o.share}%</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">The sector is uniquely split between large cooperatives (IFFCO, KRIBHCO), private producers, and central/state PSUs. Imports fill the gap in urea, DAP, and potash where domestic capacity is short.</p>
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
        <h3 className="text-lg font-bold text-navy mb-1">Regional Fertilizer Manufacturing Share (%)</h3>
        <p className="text-xs text-gray-500 mb-4">Share of installed production capacity by region. Click any bar to see why that region manufactures more.</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={geographyData} margin={{ bottom: 10 }} onClick={(d: any) => { if (d && d.activePayload) setSelectedRegion(d.activePayload[0]?.payload?.region) }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="region" fontSize={8} angle={-12} textAnchor="end" height={70} interval={0} />
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
              <h4 className="font-bold text-navy text-sm">{g.region}</h4>
              <span className="ml-auto text-sm font-bold text-maroon">{g.share}%</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{g.projects}</p>
          </button>
        ))}
      </div>
      <p className="text-[9px] text-gray-400">Indicative regional split of fertilizer manufacturing capacity. Source: Department of Fertilizers, FAI.</p>

      {/* Detail popup */}
      {info && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRegion(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-maroon" />
                <h3 className="text-base font-bold text-navy leading-tight">{info.region}</h3>
              </div>
              <button onClick={() => setSelectedRegion(null)} className="text-gray-400 hover:text-gray-600 shrink-0"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center"><div className="text-xl font-black text-navy">{info.share}%</div><div className="text-[10px] text-gray-500">Manufacturing Share</div></div>
              <div className="p-3 bg-gray-50 rounded-lg text-center"><div className="text-xl font-black text-orange-600">#{rank}</div><div className="text-[10px] text-gray-500">National Rank</div></div>
            </div>
            <div className="mb-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Why this region manufactures more</span>
              <p className="text-sm text-gray-700 leading-relaxed mt-1">{info.reason}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 bg-gray-50 rounded-lg"><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">What they make</span><p className="text-sm text-gray-700 mt-0.5">{info.crops}</p></div>
              <div className="p-3 bg-gray-50 rounded-lg"><span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Key states</span><p className="text-sm text-gray-700 mt-0.5">{info.keyStates}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PlayersTab() {
  const rows: PlayerRow[] = playersData.map((p) => ({
    rank: p.rank,
    name: p.name,
    revenue: p.revenue,
    type: p.segment,
    segment: p.note,
    hq: p.hq,
    founded: p.founded,
    highlight: p.highlight,
    extra: [{ label: 'Capacity', value: String(p.capacity) }],
  }))
  return (
    <PlayersBoard
      players={rows}
      config={{
        industryLabel: 'Fertilizer',
        donutTitle: 'By Segment',
      }}
    />
  )
}

function PlayersTabLegacy() {
  const [selected, setSelected] = useState<typeof playersData[0] | null>(null)
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Leading Fertilizer Companies (by Revenue)</h3>
        <p className="text-xs text-gray-500 mb-4">Click any company to view a quick profile.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-bold text-gray-500 uppercase text-[10px]">Rank</th>
              <th className="text-left py-3 px-2 font-bold text-gray-500 uppercase text-[10px]">Company</th>
              <th className="text-left py-3 px-2 font-bold text-gray-500 uppercase text-[10px]">Segment</th>
              <th className="text-right py-3 px-2 font-bold text-gray-500 uppercase text-[10px]">Revenue (₹ Cr)</th>
              <th className="text-left py-3 px-2 font-bold text-gray-500 uppercase text-[10px]">Notes</th>
            </tr></thead>
            <tbody>
              {playersData.map((p) => (
                <tr key={p.rank} onClick={() => setSelected(p)} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <td className="py-3 px-2"><span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-maroon/10 text-maroon font-bold text-[10px]">{p.rank}</span></td>
                  <td className="py-3 px-2 font-bold text-navy">{p.name}</td>
                  <td className="py-3 px-2"><span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-semibold">{p.segment}</span></td>
                  <td className="py-3 px-2 text-right font-semibold text-maroon">{p.revenue.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-2 text-gray-500 text-[11px]">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Revenue figures approximate (latest FY). Source: Company filings, FAI.</p>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-navy">{selected.name}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-semibold">{selected.segment}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 shrink-0"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] text-gray-500">Revenue (₹ Cr)</div><div className="font-bold text-sm text-maroon">{selected.revenue.toLocaleString('en-IN')}</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] text-gray-500">Capacity / Scale</div><div className="font-bold text-sm text-navy">{selected.capacity}</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] text-gray-500">Headquarters</div><div className="font-semibold text-sm text-navy">{selected.hq}</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] text-gray-500">Founded</div><div className="font-semibold text-sm text-navy">{selected.founded}</div></div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{selected.highlight}</p>
            <p className="text-[10px] text-gray-400 mt-4">Tip: open the Company Snapshot tab and search "{selected.name}" for full financials and analysis.</p>
          </div>
        </div>
      )}
    </div>
  )
}

function NewsTab() {
  return <NewsFeed title="Fertilizer Industry News & Developments" items={newsData} />
}
