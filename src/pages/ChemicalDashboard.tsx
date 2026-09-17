import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Gauge, Shield, User, Settings,
  ShieldAlert, Users, MapPin, Newspaper, Calendar, Building2, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, LabelList
} from 'recharts'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'
import NewsFeed from '../components/NewsFeed'
import ChemicalRiskAnalysis from '../components/risk-analysis/ChemicalRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'
import PlayersBoard, { PlayerRow } from '../components/PlayersBoard'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { CHEMICAL_GAME } from '../components/process-game/data/chemicalGame'
import BusinessModel from '../components/BusinessModel'
import { CHEMICAL_BUSINESS } from '../data/businessModels/chemicalBusiness'

const COLORS = ['#7c2d12', '#0d9488', '#ca8a04', '#4CAF50', '#9C27B0', '#FF5722']

type ChemicalTab = 'combined' | 'business' | 'ownership' | 'risk' | 'players' | 'geography' | 'news' | 'snapshot' | 'game'

// ===== CHEMICAL DATA (embedded) =====
const overviewData = {
  segmentSplit: [
    { segment: 'Petrochemicals', share: 40, value: 88 },
    { segment: 'Specialty Chemicals', share: 27, value: 59 },
    { segment: 'Agrochemicals', share: 14, value: 31 },
    { segment: 'Dyes & Pigments', share: 9, value: 20 },
    { segment: 'Others (Inorganic/Fine)', share: 10, value: 22 },
  ],
  routeSplit: [
    { route: 'Petrochemical (Cracker)', share: 40, capacity: 88 },
    { route: 'Batch Specialty', share: 36, capacity: 79 },
    { route: 'Continuous/Fine', share: 24, capacity: 53 },
  ],
  yearlyGrowth: [
    { year: 'FY19', production: 150, capacity: 185 },
    { year: 'FY20', production: 145, capacity: 190 },
    { year: 'FY21', production: 170, capacity: 205 },
    { year: 'FY22', production: 190, capacity: 225 },
    { year: 'FY23', production: 205, capacity: 245 },
    { year: 'FY24', production: 220, capacity: 265 },
    { year: 'FY25', production: 245, capacity: 290 },
  ],
}

const ownershipData = {
  ownershipSplit: [
    { type: 'Private Sector', value: 92, share: 92 },
    { type: 'Public Sector (PSU)', value: 8, share: 8 },
  ],
  topCompanies: [
    { name: 'Reliance Industries', revenue: 550000, ebitda: 95000 },
    { name: 'UPL Limited', revenue: 43000, ebitda: 8600 },
    { name: 'Tata Chemicals', revenue: 15800, ebitda: 3200 },
    { name: 'SRF Limited', revenue: 14700, ebitda: 3400 },
    { name: 'Pidilite Industries', revenue: 12000, ebitda: 2600 },
    { name: 'Deepak Nitrite', revenue: 8000, ebitda: 1500 },
    { name: 'PI Industries', revenue: 7700, ebitda: 1800 },
  ],
  exportTimeline: [
    { year: '2019', domestic: 72, exports: 28 },
    { year: '2021', domestic: 70, exports: 30 },
    { year: '2023', domestic: 68, exports: 32 },
    { year: '2025', domestic: 66, exports: 34 },
  ],
}

const playersData = [
  { rank: 1, name: 'Reliance Industries', revenue: 550000, segment: 'Petrochemicals', products: 'Polymers, Aromatics, Elastomers' },
  { rank: 2, name: 'UPL Limited', revenue: 43000, segment: 'Agrochemicals', products: 'Crop Protection, Seeds' },
  { rank: 3, name: 'Tata Chemicals', revenue: 15800, segment: 'Inorganic/Specialty', products: 'Soda Ash, Salt, Silica' },
  { rank: 4, name: 'SRF Limited', revenue: 14700, segment: 'Specialty/Fluoro', products: 'Fluorochemicals, Films' },
  { rank: 5, name: 'Pidilite Industries', revenue: 12000, segment: 'Adhesives/Specialty', products: 'Fevicol, Construction Chem' },
  { rank: 6, name: 'Deepak Nitrite', revenue: 8000, segment: 'Specialty/Phenolics', products: 'Phenol, Acetone, Intermediates' },
  { rank: 7, name: 'PI Industries', revenue: 7700, segment: 'Agrochemicals/CSM', products: 'Custom Synthesis, AgChem' },
  { rank: 8, name: 'Aarti Industries', revenue: 6900, segment: 'Specialty/Benzene', products: 'Benzene Derivatives' },
  { rank: 9, name: 'Navin Fluorine', revenue: 2100, segment: 'Fluorochemicals', products: 'Ref Gases, Specialty Fluoro' },
  { rank: 10, name: 'Vinati Organics', revenue: 2000, segment: 'Specialty Monomers', products: 'ATBS, IBB (niche global leader)' },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'Reliance Industries': { hq: 'Mumbai', ceo: 'Mukesh Ambani', founded: '1966', type: 'Private (Promoter 50%)', plants: 'Jamnagar (world\'s largest refinery-petrochemical complex), Dahej, Hazira, Vadodara, Nagothane', expansion: 'O2C (Oil-to-Chemicals) integration, new PTA/MEG capacity, and downstream expansion. Green chemistry & bio-pathways being explored.', moat: 'World-scale integrated complex delivers lowest-cost petrochemicals globally. Full backward integration from crude to polymer. Unmatched scale (Jamnagar).' },
  'UPL Limited': { hq: 'Mumbai', ceo: 'Jai Shroff', founded: '1969', type: 'Private (Promoter 28%)', plants: '40+ manufacturing sites across India, Europe, Americas', expansion: 'Global top-5 crop protection player post-Arysta acquisition. Focus on biologicals, differentiated products, and sustainable ag solutions.', moat: 'Global scale in generic + differentiated agrochemicals. Presence in 130+ countries. Strong registration portfolio and distribution.' },
  'Tata Chemicals': { hq: 'Mumbai', ceo: 'R. Mukundan', founded: '1939', type: 'Private (Tata Group)', plants: 'Mithapur (Gujarat), UK, USA, Kenya', expansion: 'Basic chemistry (soda ash) plus specialty (silica, nutraceuticals). Battery materials (lithium) and green chemistry ventures.', moat: 'World\'s 3rd largest soda ash producer. Tata brand trust. Diversified geography. Entry into new-age materials (battery, nutrition).' },
  'SRF Limited': { hq: 'Gurugram', ceo: 'Ashish Bharat Ram', founded: '1970', type: 'Private (Promoter 50%)', plants: 'Bhiwadi, Dahej, Manali, plus Thailand/South Africa', expansion: 'Fluorochemicals (refrigerant gases + specialty), packaging films, and pharma/agro intermediates. Large fluoro capex ongoing.', moat: 'India\'s fluorochemicals leader. Diversified (chemicals + films + technical textiles). Strong CSM/custom synthesis franchise.' },
  'Pidilite Industries': { hq: 'Mumbai', ceo: 'Bharat Puri', founded: '1959', type: 'Private (Promoter 70%)', plants: '20+ facilities across India', expansion: 'Construction chemicals, consumer adhesives, and industrial specialty. Acquisitions in waterproofing and sealants.', moat: 'Fevicol = one of India\'s most iconic brands. Dominant consumer adhesives share. Deep distribution and brand loyalty (pricing power).' },
  'Deepak Nitrite': { hq: 'Vadodara', ceo: 'Maulik Mehta', founded: '1970', type: 'Private (Promoter 45%)', plants: 'Nandesari, Dahej, Hyderabad, Roha', expansion: 'Phenolics (Deepak Phenolics), advanced intermediates, and forward integration into polycarbonate. Import substitution focus.', moat: 'India\'s only phenol-acetone integrated producer at scale. Import substitution play. Strong intermediate chemistry portfolio.' },
  'PI Industries': { hq: 'Udaipur', ceo: 'Mayank Singhal', founded: '1946', type: 'Private (Promoter 46%)', plants: 'Panoli, Jambusar (Gujarat)', expansion: 'Custom Synthesis & Manufacturing (CSM) for global innovators, and domestic agrochemical brands. Pharma CDMO entry.', moat: 'India\'s premier agrochemical CSM partner for global innovators. Strong process chemistry IP. High-margin, sticky client relationships.' },
  'Aarti Industries': { hq: 'Mumbai', ceo: 'Rajendra Gogri', founded: '1984', type: 'Private (Promoter 44%)', plants: 'Multiple sites in Gujarat & Maharashtra', expansion: 'Benzene-chain derivatives, agrochemical & pharma intermediates. Long-term supply contracts with global majors.', moat: 'Global scale in benzene-based derivatives. Backward-integrated. Long-term contracts provide revenue visibility.' },
  'Navin Fluorine': { hq: 'Mumbai', ceo: 'Nitin Kishore', founded: '1967', type: 'Private (Padmanabh Mafatlal Group)', plants: 'Surat, Dewas, Dahej', expansion: 'High-value specialty fluorochemicals, CDMO, and HFO refrigerants. Large capex in specialty & contract manufacturing.', moat: 'Deep fluorine chemistry expertise (rare). High-value specialty & CDMO franchise. Strong margins in niche fluoro products.' },
  'Vinati Organics': { hq: 'Mumbai', ceo: 'Vinati Saraf Mutreja', founded: '1989', type: 'Private (Promoter 74%)', plants: 'Mahad, Lote (Maharashtra)', expansion: 'ATBS & IBB capacity leadership, plus antioxidants and new specialty molecules. Backward integration ongoing.', moat: 'World\'s largest producer of ATBS and IBB (niche monopolies). Very high margins. Global market leadership in specific molecules.' },
}

const geographyData = [
  { state: 'Gujarat', share: 35, majorPlayers: 'Reliance (Jamnagar/Dahej/Hazira), UPL, Deepak Nitrite, SRF, Aarti, GACL', reason: "India's undisputed chemical capital — ~35% of national chemical output. Dahej, Ankleshwar, Vapi, Jhagadia, and Hazira form the world's densest chemical cluster. Coastal access for feedstock import & export, extensive PCPIR (Petroleum, Chemicals & Petrochemicals Investment Region) at Dahej, strong CETP/effluent infrastructure, and pro-industry state policy. Reliance Jamnagar is the world's largest refinery-petrochemical complex." },
  { state: 'Maharashtra', share: 18, majorPlayers: 'Reliance (Nagothane), Pidilite, Aarti, Vinati Organics, Tata Chemicals', reason: "Second-largest chemical hub. Mumbai is the corporate + trading capital of Indian chemicals. Clusters at Lote-Mahad, Roha, and Tarapur. Proximity to JNPT port for exports, strong specialty & fine chemicals base, and skilled chemist talent pool from Mumbai/Pune institutions." },
  { state: 'Tamil Nadu', share: 10, majorPlayers: 'SPIC, Tuticorin Alkali, Chemplast Sanmar, Coromandel', reason: "Southern chemical hub anchored by Tuticorin and Cuddalore clusters. Strong in caustic-chlorine (chlor-alkali), PVC, and fertilizer-linked chemistry. Port access (Tuticorin, Chennai) for feedstock and export. Growing specialty & fluorine chemistry base." },
  { state: 'Andhra Pradesh', share: 9, majorPlayers: 'Divi\'s (API-chem), Laurus, Aurobindo (intermediates), Coromandel', reason: "Fast-growing hub, especially for pharma-linked fine chemicals and intermediates around Visakhapatnam and the Hyderabad-adjacent belt. Government pharma/chemical parks, port access at Vizag/Kakinada, and a deep chemist workforce feeding the pharma value chain." },
  { state: 'Rajasthan', share: 7, majorPlayers: 'PI Industries (Udaipur), Chambal (fertilizer-chem), Wonder Cement chem', reason: "Emerging chemical & agrochemical base. PI Industries' CSM operations anchor the specialty segment. Mineral resources (rock phosphate, limestone) support inorganic chemistry. Lower land/labour cost attracting new investment." },
  { state: 'Uttar Pradesh', share: 6, majorPlayers: 'IFFCO (chem), Jubilant Ingrevia, various intermediates', reason: "Growing chemical & life-science ingredient base. Jubilant Ingrevia (Gajraula) is a major specialty & nutrition ingredient player. Large domestic market proximity and improving industrial corridor infrastructure." },
  { state: 'Karnataka', share: 5, majorPlayers: 'Various specialty, agro & fine chemical units', reason: "Bangalore-anchored specialty and fine chemicals, with strong linkage to biotech and pharma R&D. Growing green chemistry and contract research presence. Skilled technical talent and research institutions." },
  { state: 'West Bengal / East', share: 4, majorPlayers: 'Various dyes, pigments, and inorganic chemical units', reason: "Legacy dyes, pigments, and inorganic chemistry base around the Kolkata-Haldia belt. Haldia petrochemical complex anchors the region. Port access via Haldia/Kolkata for eastern India distribution and export." },
]

const newsData = [
  { id: 1, title: 'India specialty chemicals cross $65B, on track to double by 2030 on China+1', date: '2026-08-12', region: 'National', category: 'Business Wins', source: 'CRISIL', summary: 'India\'s specialty chemicals segment has crossed $65B in FY26, growing ~12% YoY. Global majors continuing to diversify sourcing away from China are placing record long-term contracts with Indian producers in agrochemical intermediates, fluorochemicals, and pharma intermediates.' },
  { id: 2, title: 'Reliance commissions new petrochemical downstream capacity at Jamnagar', date: '2026-07-28', region: 'West', category: 'Business Wins', source: 'Economic Times', summary: 'Reliance has commissioned additional downstream polymer and specialty capacity at its Jamnagar complex, deepening integration from crude to finished chemicals and strengthening its position as the world\'s lowest-cost petrochemical producer.' },
  { id: 3, title: 'Reactor runaway at Ankleshwar specialty unit; 3 workers injured, GPCB probe', date: '2026-07-15', region: 'West', category: 'Accidents', source: 'Business Standard', summary: 'A thermal runaway during a nitration reaction at an Ankleshwar specialty chemical unit injured 3 workers. GPCB has ordered a safety audit. The incident renews focus on reaction calorimetry and cooling-system redundancy across the cluster.' },
  { id: 4, title: 'CPCB tightens Zero Liquid Discharge (ZLD) enforcement for chemical clusters', date: '2026-06-30', region: 'National', category: 'Policy', source: 'CPCB', summary: 'CPCB has intensified ZLD enforcement, requiring chemical clusters to demonstrate compliant effluent treatment. Non-compliant units face closure notices, driving an estimated ₹10,000+ Cr in effluent-treatment investment industry-wide.' },
  { id: 5, title: 'Gujarat approves 3 new chemical parks with ₹50,000 Cr investment', date: '2026-06-10', region: 'West', category: 'Business Wins', source: 'Govt of Gujarat', summary: 'Gujarat has cleared three new chemical parks (PCPIR expansions) attracting ₹50,000 Cr in committed investment, reinforcing the state\'s position as India\'s chemical manufacturing capital with ~35% of national output.' },
  { id: 6, title: 'PLI scheme for chemicals & petrochemicals moves to final approval stage', date: '2026-05-22', region: 'National', category: 'Policy', source: 'Dept of Chemicals', summary: 'The long-awaited Production-Linked Incentive scheme for chemicals and petrochemicals has moved to the final approval stage, aimed at boosting domestic capacity and reducing import dependence on Chinese intermediates.' },
  { id: 7, title: 'Fluoride gas leak at Southern chemical plant prompts SPCB review', date: '2026-05-08', region: 'South', category: 'Accidents', source: 'The Hindu', summary: 'A fluoride gas release at a phosphatic/specialty plant triggered a State Pollution Control Board review of scrubber systems and emission monitoring. No fatalities were reported, but nearby operations were temporarily suspended.' },
  { id: 8, title: 'PI Industries wins large multi-year CSM contract from global agro major', date: '2026-04-18', region: 'West', category: 'Business Wins', source: 'Mint', summary: 'PI Industries has secured a large multi-year Custom Synthesis & Manufacturing (CSM) contract from a global agrochemical innovator, reinforcing India\'s growing role as a preferred partner for complex process chemistry under China+1.' },
]

const capacityPipeline = [
  { company: 'Reliance (Petchem downstream)', capacity: 'Large', year: '2026', status: 'Under construction' },
  { company: 'SRF (Fluorochemicals, Dahej)', capacity: '₹5,000 Cr', year: '2026', status: 'Under construction' },
  { company: 'Deepak Nitrite (Polycarbonate)', capacity: '₹9,000 Cr', year: '2027', status: 'Planned' },
  { company: 'Navin Fluorine (Specialty/CDMO)', capacity: '₹1,500 Cr', year: '2026', status: 'Under construction' },
  { company: 'Gujarat PCPIR (Dahej cluster)', capacity: 'Multi-unit', year: '2028', status: 'Planned' },
]

export default function ChemicalDashboard() {
  const [activeTab, setActiveTab] = useState<ChemicalTab>('combined')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tabs: { id: ChemicalTab; label: string; icon: any }[] = [
    { id: 'combined', label: 'Industry Overview', icon: Gauge },
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
    <div className="min-h-screen bg-cream font-mulish pb-12">
      {/* Header */}
      {/* Header */}
      <DashboardHeader title="Chemical Industry Dashboard" />

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'combined' && <CombinedOverviewTab />}
        {activeTab === 'business' && <BusinessModel data={CHEMICAL_BUSINESS} />}
        {activeTab === 'ownership' && <OwnershipTab />}
        {activeTab === 'risk' && <ChemicalRiskAnalysis />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="chemical" />}
        {activeTab === 'game' && <ProcessGame data={CHEMICAL_GAME} />}
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30"><div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between"><p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p><p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p><p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p></div></footer>
    </div>
  )
}

// ===== COMBINED OVERVIEW TAB =====
function CombinedOverviewTab() {
  const [segmentPopup, setSegmentPopup] = useState<string | null>(null)
  const [routePopup, setRoutePopup] = useState<string | null>(null)
  const [tradePopup, setTradePopup] = useState<'exports' | 'imports' | null>(null)
  const d = overviewData

  const globalComparison = [
    { country: 'China', value: 1500 },
    { country: 'USA', value: 480 },
    { country: 'Germany', value: 260 },
    { country: 'India', value: 220 },
    { country: 'Japan', value: 210 },
    { country: 'South Korea', value: 165 },
    { country: 'France', value: 95 },
    { country: 'Brazil', value: 85 },
  ]

  const endUse = [
    { sector: 'Agriculture', demand: 22 },
    { sector: 'Textiles', demand: 18 },
    { sector: 'Consumer/FMCG', demand: 16 },
    { sector: 'Pharma', demand: 14 },
    { sector: 'Auto/Industrial', demand: 12 },
    { sector: 'Construction', demand: 10 },
    { sector: 'Others', demand: 8 },
  ]

  const growthTrend = [
    { year: 'FY19', market: 150, capacity: 185, projected: null },
    { year: 'FY21', market: 170, capacity: 205, projected: null },
    { year: 'FY23', market: 205, capacity: 245, projected: null },
    { year: 'FY25', market: 245, capacity: 290, projected: 245 },
    { year: 'FY27', market: null, capacity: null, projected: 310 },
    { year: 'FY30', market: null, capacity: null, projected: 400 },
  ]

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#7c2d12] to-[#ca8a04] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <h2 className="text-2xl font-black">India Chemical Industry — Unified Overview</h2>
          <p className="text-sm text-white/80 mt-1 mb-4">A consolidated view of India's chemical sector across petrochemicals, specialty, agrochemicals, and fine chemicals — market size, growth, trade, and end-use demand</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black">$<AnimatedCounter end={220} /></div>
              <div className="text-[10px] text-white/70 mt-0.5">Market Size ($B)</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black">#<AnimatedCounter end={6} /></div>
              <div className="text-[10px] text-white/70 mt-0.5">Global Rank</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black"><AnimatedCounter end={11.2} decimals={1} />%</div>
              <div className="text-[10px] text-white/70 mt-0.5">CAGR</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black">$<AnimatedCounter end={45} />B</div>
              <div className="text-[10px] text-white/70 mt-0.5">Exports</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black"><AnimatedCounter end={2.5} decimals={1} />M</div>
              <div className="text-[10px] text-white/70 mt-0.5">Employment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Global Standing + Growth Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Chemical Market ($B, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India is the 6th largest chemical producer globally</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={globalComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={10} unit="B" />
              <YAxis dataKey="country" type="category" fontSize={10} width={80} />
              <Tooltip formatter={(v: number) => `$${v}B`} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#ca8a04' : e.country === 'China' ? '#7c2d12' : '#0d9488'} />)}
                <LabelList dataKey="value" position="right" fontSize={9} formatter={(v: number) => `$${v}B`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: FICCI, CHEMEXCIL, industry estimates 2024</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Market & Capacity — Growth & Outlook ($B)</h3>
          <p className="text-xs text-gray-500 mb-3">$220B (FY25) → $400B target by FY30 on China+1 & domestic demand</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" fontSize={10} />
              <YAxis fontSize={10} unit="B" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="capacity" name="Capacity ($B)" stroke="#0d9488" strokeWidth={2} dot={{ r: 4 }} connectNulls={false} />
              <Line type="monotone" dataKey="market" name="Market ($B)" stroke="#7c2d12" strokeWidth={2.5} dot={{ r: 5 }} connectNulls={false} />
              <Line type="monotone" dataKey="projected" name="Projected ($B)" stroke="#ca8a04" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 5 }} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: McKinsey, CRISIL, Dept of Chemicals & Petrochemicals</p>
        </div>
      </div>

      {/* Section 2: Segment Split + Route Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Segment Split (% of Market)</h3>
          <p className="text-xs text-gray-500 mb-3">Click any segment to learn more</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={d.segmentSplit} cx="50%" cy="50%" outerRadius={100} dataKey="share" nameKey="segment"
                label={({ segment, share }: any) => `${segment}: ${share}%`} labelLine
                onClick={(data: any) => setSegmentPopup(data.segment)}>
                {d.segmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i]} className="cursor-pointer hover:opacity-80 transition" />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Production Route Split</h3>
          <p className="text-xs text-gray-500 mb-3">Click any route to understand the process type</p>
          <div className="space-y-3 mt-4">
            {d.routeSplit.map((r, i) => (
              <button key={i} onClick={() => setRoutePopup(r.route)} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-maroon/5 border border-gray-100 transition cursor-pointer hover:shadow-sm active:scale-[0.99]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center text-lg font-bold text-navy">{i + 1}</div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-navy block">{r.route}</span>
                    <span className="text-[10px] text-gray-500">{r.route.includes('Petrochemical') ? 'Crude/Naphtha → Cracker → Polymers' : r.route.includes('Batch') ? 'Multi-step reactions in batch reactors' : 'Continuous flow / fine chemistry'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-maroon">{r.share}%</span>
                  <span className="text-[10px] text-gray-400 block">${r.capacity}B</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-[9px] text-gray-400 mt-3">Source: Dept of Chemicals & Petrochemicals</p>
        </div>
      </div>

      {/* Segment Popup */}
      {segmentPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSegmentPopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{segmentPopup}</h3><button onClick={() => setSegmentPopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div>
            <p className="text-sm text-gray-700 leading-relaxed">{SEGMENT_INFO[segmentPopup] || 'A key segment of the Indian chemical industry.'}</p>
          </div>
        </div>
      )}

      {/* Route Popup */}
      {routePopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setRoutePopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{routePopup}</h3><button onClick={() => setRoutePopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div>
            <p className="text-sm text-gray-700 leading-relaxed">{ROUTE_INFO[routePopup] || 'A production route in the chemical industry.'}</p>
          </div>
        </div>
      )}

      {/* Section 3: End-Use + Trade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">End-Use Demand (%)</h3>
          <p className="text-xs text-gray-500 mb-3">Chemicals underpin nearly every downstream industry</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={endUse}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="sector" fontSize={9} angle={-15} textAnchor="end" height={50} />
              <YAxis fontSize={10} unit="%" />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="demand" radius={[4, 4, 0, 0]}>
                {endUse.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                <LabelList dataKey="demand" position="top" fontSize={9} formatter={(v: number) => `${v}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setTradePopup('exports')} className="text-[10px] px-3 py-1.5 bg-green-50 text-green-700 rounded-lg font-semibold border border-green-200 hover:bg-green-100">Export Details ($45B)</button>
            <button onClick={() => setTradePopup('imports')} className="text-[10px] px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg font-semibold border border-purple-200 hover:bg-purple-100">Import Details ($60B)</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">China+1 Opportunity & Health</h3>
          <p className="text-xs text-gray-500 mb-4">Global supply-chain shift favours Indian chemicals</p>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center p-4 bg-maroon/5 rounded-xl border border-maroon/10">
              <div className="text-3xl font-black text-maroon">12%</div>
              <div className="text-xs text-gray-600 font-medium mt-1">Specialty CAGR</div>
            </div>
            <div className="text-center p-4 bg-navy/5 rounded-xl border border-navy/10">
              <div className="text-3xl font-black text-navy">3-4%</div>
              <div className="text-xs text-gray-600 font-medium mt-1">Global Share</div>
            </div>
            <div className="text-center p-4 bg-orange/10 rounded-xl border border-orange/10">
              <div className="text-3xl font-black text-orange-600">$300B</div>
              <div className="text-xs text-gray-600 font-medium mt-1">2040 Ambition</div>
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <p className="text-xs text-green-800"><strong>China+1 Tailwind:</strong> Global manufacturers diversifying away from China are driving record investment into Indian specialty chemicals, pharma intermediates, and agrochemicals — India targets tripling its global share by 2040.</p>
          </div>
          <div className="mt-3"><HealthGauge score={72} label="Industry Health" /></div>
        </div>
      </div>

      {/* Trade Popup */}
      {tradePopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setTradePopup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{tradePopup === 'exports' ? 'Chemical Exports — $45B' : 'Chemical Imports — $60B'}</h3>
              <button onClick={() => setTradePopup(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            {tradePopup === 'exports' ? (
              <div className="space-y-2">
                <p className="text-xs text-gray-600 mb-3">Led by specialty chemicals, agrochemicals, and dyes. Growing fast on China+1 demand.</p>
                {[{ c: 'USA', s: '18%', v: '$8.1B' }, { c: 'China', s: '10%', v: '$4.5B' }, { c: 'Brazil', s: '8%', v: '$3.6B' }, { c: 'Germany', s: '7%', v: '$3.2B' }, { c: 'UAE', s: '6%', v: '$2.7B' }, { c: 'Others', s: '51%', v: '$22.9B' }].map((d, i) => (<div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{d.c}</span><div className="text-right"><span className="text-xs font-bold text-green-700">{d.s}</span><span className="text-[10px] text-gray-500 ml-2">{d.v}</span></div></div>))}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-600 mb-3">India remains a net importer — heavy reliance on China for intermediates, plus petrochemical feedstock.</p>
                {[{ c: 'China', s: '30%', v: '$18B' }, { c: 'Saudi Arabia', s: '12%', v: '$7.2B' }, { c: 'USA', s: '9%', v: '$5.4B' }, { c: 'South Korea', s: '8%', v: '$4.8B' }, { c: 'Japan', s: '6%', v: '$3.6B' }, { c: 'Others', s: '35%', v: '$21B' }].map((d, i) => (<div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{d.c}</span><div className="text-right"><span className="text-xs font-bold text-purple-700">{d.s}</span><span className="text-[10px] text-gray-500 ml-2">{d.v}</span></div></div>))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Key Takeaways */}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#7c2d12] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways — India Chemical Sector</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Market</div>
            <p className="text-xs text-gray-700">$220B market, 6th largest globally, growing at 11%+. Specialty chemicals the fastest segment (~12%).</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">China+1</div>
            <p className="text-xs text-gray-700">Global de-risking from China is the biggest structural tailwind — record specialty & CSM investment.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Risk Profile</div>
            <p className="text-xs text-gray-700">High-hazard sector — reactor runaway, VCE, toxic release. Process safety is the defining risk.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Regulation</div>
            <p className="text-xs text-gray-700">ZLD mandate, PESO, and NGT/CPCB scrutiny drive ₹10,000+ Cr effluent & safety investment.</p>
          </div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: FICCI, CHEMEXCIL, McKinsey, CRISIL, Dept of Chemicals & Petrochemicals</p>
      </div>
    </div>
  )
}

const SEGMENT_INFO: Record<string, string> = {
  'Petrochemicals': 'The largest segment (~40%). Basic building-block chemicals — polymers (PE, PP, PVC), aromatics (benzene, toluene, xylene), and elastomers — made from crude/naphtha via steam crackers. Dominated by Reliance (Jamnagar), GAIL, and HPCL-Mittal. Capital-intensive, scale-driven, and cyclical with crude prices.',
  'Specialty Chemicals': 'The fastest-growing segment (~12% CAGR). High-value, application-specific chemicals — coatings, surfactants, flavors & fragrances, water treatment, and performance additives. The prime beneficiary of the China+1 shift. Players: SRF, Pidilite, Vinati, Navin Fluorine, Atul.',
  'Agrochemicals': 'Crop protection chemicals — insecticides, herbicides, fungicides — plus custom synthesis (CSM) for global innovators. India is a major generic agrochemical exporter. Players: UPL (global top-5), PI Industries, Rallis, Bayer/Syngenta India.',
  'Dyes & Pigments': 'Colorants for textiles, plastics, coatings, and inks. India is a leading global dyes exporter (Gujarat-centric). Environmentally sensitive (effluent-heavy) — increasingly consolidated under ZLD norms. Players: Kiri, Sudarshan, Meghmani.',
  'Others (Inorganic/Fine)': 'Inorganic chemicals (soda ash, caustic soda, chlor-alkali), industrial gases, and fine chemicals. Foundational to glass, detergents, alumina, and pharma. Players: Tata Chemicals, GACL, DCM Shriram, Grasim.',
}

const ROUTE_INFO: Record<string, string> = {
  'Petrochemical (Cracker)': 'The integrated route: crude oil / naphtha / ethane is "cracked" at high temperature (800-850°C) in steam crackers to produce ethylene, propylene, and aromatics — the building blocks for polymers and downstream chemicals. Extremely capital-intensive and scale-driven. Highest catastrophic risk (vapor cloud explosions, toxic releases). Used by Reliance, GAIL, HMEL.',
  'Batch Specialty': 'Multi-step chemical reactions carried out batch-by-batch in stirred reactors (glass-lined or SS). Used for specialty & fine chemicals, agrochemical actives, dyes, and intermediates. Flexible for multiple products but carries high reaction-hazard risk (runaway reactions, solvent fires). Dominant in Gujarat/Maharashtra clusters.',
  'Continuous/Fine': 'Continuous-flow and precision fine-chemistry processes for high-purity, high-value molecules (pharma intermediates, electronic chemicals, custom synthesis). Smaller inventories reduce consequence per event but introduce higher-pressure/temperature and novel-chemistry risks. Growing with flow-chemistry adoption.',
}

// ===== OWNERSHIP TAB =====
function OwnershipTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Private vs PSU Split</h3>
          <p className="text-xs text-gray-500 mb-4">The chemical sector is overwhelmingly private-sector driven (~92%)</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={ownershipData.ownershipSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" nameKey="type" paddingAngle={3}>
                  {ownershipData.ownershipSplit.map((_, i) => <Cell key={i} fill={i === 0 ? '#ca8a04' : '#7c2d12'} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {ownershipData.ownershipSplit.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: i === 0 ? '#ca8a04' : '#7c2d12' }}></div>
                  <div className="flex-1"><div className="text-sm font-bold text-navy">{item.type}</div></div>
                  <div className="text-lg font-black" style={{ color: i === 0 ? '#ca8a04' : '#7c2d12' }}>{item.share}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-200 text-center"><div className="text-xs font-bold text-orange-800">Key Private Players</div><div className="text-[9px] text-orange-600 mt-1">Reliance, UPL, SRF, Pidilite, Deepak Nitrite</div></div>
            <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-center"><div className="text-xs font-bold text-blue-800">Key PSU Players</div><div className="text-[9px] text-blue-600 mt-1">GAIL, HOCL, GACL, RCF (chem), NFL</div></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Rising Export Orientation</h3>
          <p className="text-xs text-gray-500 mb-4">Exports rising from 28% (2019) → 34% (2025) as China+1 accelerates</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ownershipData.exportTimeline}>
              <defs>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.5} /><stop offset="95%" stopColor="#0d9488" stopOpacity={0.1} /></linearGradient>
                <linearGradient id="domGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c2d12" stopOpacity={0.5} /><stop offset="95%" stopColor="#7c2d12" stopOpacity={0.1} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" fontSize={10} unit="" />
              <YAxis fontSize={10} domain={[0, 100]} unit="%" />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Legend />
              <Area type="monotone" dataKey="domestic" stackId="1" stroke="#7c2d12" fill="url(#domGrad)" name="Domestic (%)" strokeWidth={2} />
              <Area type="monotone" dataKey="exports" stackId="1" stroke="#0d9488" fill="url(#expGrad)" name="Exports (%)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 p-2 bg-teal-50 rounded-lg border border-teal-100">
            <p className="text-[10px] text-teal-800"><strong>Key shift:</strong> Specialty chemicals and agrochemical CSM are driving export growth. India is becoming the preferred alternative to China for global chemical majors seeking supply diversification.</p>
          </div>
        </div>
      </div>

      {/* Top Companies by Revenue & EBITDA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top Companies — Revenue vs EBITDA (₹ Cr)</h3>
        <p className="text-xs text-gray-500 mb-4">EBITDA margin shown as badge. Higher = better profitability / pricing power.</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={ownershipData.topCompanies} layout="vertical" barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={10} tick={{ fill: '#64748b' }} />
            <YAxis dataKey="name" type="category" fontSize={10} width={130} tick={{ fill: '#1f2937' }} />
            <Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')} Cr`} />
            <Legend />
            <Bar dataKey="revenue" fill="#7c2d12" name="Revenue (₹ Cr)" radius={[0, 4, 4, 0]} barSize={14}>
              <LabelList dataKey="revenue" position="right" fontSize={9} fill="#7c2d12" formatter={(v: number) => v.toLocaleString('en-IN')} />
            </Bar>
            <Bar dataKey="ebitda" fill="#ca8a04" name="EBITDA (₹ Cr)" radius={[0, 4, 4, 0]} barSize={14}>
              <LabelList dataKey="ebitda" position="right" fontSize={9} fill="#a16207" formatter={(v: number) => v.toLocaleString('en-IN')} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <h4 className="text-xs font-bold text-navy mb-2 uppercase tracking-wider">EBITDA Margin by Company</h4>
          <div className="flex flex-wrap gap-2">
            {ownershipData.topCompanies.map((c, i) => {
              const margin = Math.round((c.ebitda / c.revenue) * 100)
              return (
                <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${margin >= 20 ? 'bg-green-50 text-green-700 border-green-300' : margin >= 12 ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-red-50 text-red-700 border-red-300'}`}>
                  {c.name}: {margin}%
                </span>
              )
            })}
          </div>
        </div>
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
      type: p.segment || 'Chemicals',
      segment: p.products,
      hq: d?.hq,
      founded: d?.founded,
      target: d?.expansion,
      highlight: d?.moat,
    }
  })
  return (
    <PlayersBoard
      players={rows}
      config={{
        industryLabel: 'Chemicals',
        donutTitle: 'By Segment',
      }}
    />
  )
}

function PlayersTabLegacy() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const selected = selectedPlayer ? playerDetails[selectedPlayer] : null

  const marketShareTrend = [
    { company: 'Reliance', fy23: 24.0, fy25: 25.0, change: +1.0 },
    { company: 'UPL', fy23: 4.2, fy25: 4.0, change: -0.2 },
    { company: 'Tata Chemicals', fy23: 1.8, fy25: 1.7, change: -0.1 },
    { company: 'SRF', fy23: 1.4, fy25: 1.6, change: +0.2 },
    { company: 'Pidilite', fy23: 1.2, fy25: 1.3, change: +0.1 },
    { company: 'Others', fy23: 67.4, fy25: 66.4, change: -1.0 },
  ]

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
              <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO/Chairman</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div>
              <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div>
              <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Plants</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div>
              <div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion Plans</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div>
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Top Companies by Revenue (₹ Cr)</h3>
          <p className="text-xs text-gray-500 mb-3">Click any bar for company deep-dive</p>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={playersData} layout="vertical" onClick={(data: any) => { if (data && data.activePayload) setSelectedPlayer(data.activePayload[0]?.payload?.name) }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={10} />
              <YAxis dataKey="name" type="category" fontSize={9} width={110} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')} Cr`} />
              <Bar dataKey="revenue" name="Revenue (₹ Cr)" radius={[0, 4, 4, 0]} cursor="pointer">
                {playersData.map((_, i) => <Cell key={i} fill={i < 2 ? '#ca8a04' : i < 5 ? '#7c2d12' : '#94a3b8'} />)}
                <LabelList dataKey="revenue" position="right" fontSize={9} formatter={(v: number) => v.toLocaleString('en-IN')} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Upcoming Capacity & Investments</h3>
          <p className="text-xs text-gray-500 mb-4">Major capex driven by China+1 & import substitution</p>
          <div className="space-y-2.5">
            {capacityPipeline.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1"><div className="text-sm font-semibold text-navy">{item.company}</div><div className="text-[10px] text-gray-500">Target: {item.year}</div></div>
                <div className="text-right">
                  <div className="text-base font-bold text-maroon">{item.capacity}</div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.status === 'Commissioned' ? 'bg-green-100 text-green-700' : item.status === 'Under construction' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-navy/5 rounded-lg border border-navy/10">
            <p className="text-[10px] text-navy"><strong>Investment wave:</strong> Specialty chemicals, fluorochemicals, and CSM/CDMO capacity is expanding rapidly as global majors shift sourcing to India under China+1.</p>
          </div>
        </div>
      </div>

      {/* Market Share Movement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Market Share Movement (FY23 → FY25)</h3>
        <p className="text-xs text-gray-500 mb-4">Highly fragmented sector — Reliance dominant in petchem; specialty players gaining</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {marketShareTrend.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-1">
                <div className="text-sm font-bold text-navy">{c.company}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#7c2d12] to-[#ca8a04]" style={{ width: `${Math.min(c.fy25 * 3, 100)}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-navy w-12 text-right">{c.fy25}%</span>
                </div>
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-lg ${c.change > 0 ? 'bg-green-100 text-green-700' : c.change < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                {c.change > 0 ? '+' : ''}{c.change}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Company Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-navy mb-2">Detailed Company Profiles</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for HQ, expansion plans, plants, and competitive moat</p>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b-2 border-navy/20">
              <th className="text-left py-2 px-2 font-bold text-navy">#</th>
              <th className="text-left py-2 px-2 font-bold text-navy">Company</th>
              <th className="text-right py-2 px-2 font-bold text-navy">Revenue (₹ Cr)</th>
              <th className="text-left py-2 px-2 font-bold text-navy">Segment</th>
              <th className="text-left py-2 px-2 font-bold text-navy">Products</th>
              <th className="text-center py-2 px-2 font-bold text-navy">Details</th>
            </tr>
          </thead>
          <tbody>
            {playersData.map((p) => (
              <tr key={p.rank} className="border-b border-gray-50 hover:bg-orange-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}>
                <td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td>
                <td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td>
                <td className="py-2.5 px-2 text-right font-bold">₹{p.revenue.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-2"><span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-semibold">{p.segment}</span></td>
                <td className="py-2.5 px-2 text-[10px] text-gray-600">{p.products}</td>
                <td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View →</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[9px] text-gray-400 mt-3">Revenue approximate (latest FY). Note: Reliance figure is total group revenue; chemicals is a large segment within.</p>
      </div>
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
              <h3 className="text-lg font-bold text-navy">Why {selectedState} is a Chemical Hub</h3>
              <button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-4 bg-navy/5 rounded-xl mb-4">
              <div className="grid grid-cols-2 gap-3 text-center mb-3">
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Chemical Output Share (%)</h3>
        <p className="text-xs text-gray-500 mb-4">Click any bar to see why that state is a chemical manufacturing hub</p>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={geographyData} layout="vertical" onClick={(data: any) => { if (data && data.activePayload) setSelectedState(data.activePayload[0]?.payload?.state) }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={10} unit="%" />
            <YAxis dataKey="state" type="category" fontSize={10} width={120} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Bar dataKey="share" name="Output Share (%)" radius={[0, 4, 4, 0]} cursor="pointer">
              {geographyData.map((_, i) => <Cell key={i} fill={i < 3 ? '#ca8a04' : i < 6 ? '#7c2d12' : '#94a3b8'} />)}
              <LabelList dataKey="share" position="right" fontSize={9} formatter={(v: number) => `${v}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Chemical Cluster Distribution — India</h3>
        <p className="text-xs text-gray-500 mb-4">Click any state to understand why it's a chemical hub</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">State</th>
                <th className="text-right py-2 px-2 font-bold text-navy">Share (%)</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Major Players</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Insight</th>
              </tr>
            </thead>
            <tbody>
              {geographyData.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-orange-50/30 cursor-pointer transition" onClick={() => setSelectedState(s.state)}>
                  <td className="py-2.5 px-2 font-semibold text-maroon underline decoration-dotted">{s.state}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-orange">{s.share}%</td>
                  <td className="py-2.5 px-2 text-gray-600 text-[10px]">{s.majorPlayers}</td>
                  <td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-white bg-maroon px-2.5 py-1 rounded-lg shadow-sm">Why?</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-bold text-navy mb-3">India's Chemical Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200"><h4 className="text-xs font-bold text-orange-800 mb-1">Western Belt (53%+)</h4><p className="text-[10px] text-orange-700">Gujarat + Maharashtra. World's densest chemical cluster (Dahej, Ankleshwar, Vapi, Lote). Petrochemicals + specialty + agro. Coastal feedstock access + PCPIR.</p></div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><h4 className="text-xs font-bold text-blue-800 mb-1">Southern Belt (~19%)</h4><p className="text-[10px] text-blue-700">Tamil Nadu + Andhra Pradesh. Chlor-alkali, PVC, and pharma-linked fine chemicals. Port access at Tuticorin/Vizag. Growing CSM & specialty base.</p></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><h4 className="text-xs font-bold text-green-800 mb-1">North & East (~28%)</h4><p className="text-[10px] text-green-700">Rajasthan, UP, WB. Agrochemical CSM (PI), ingredient chemistry (Jubilant), and legacy dyes/inorganic base around Haldia-Kolkata.</p></div>
        </div>
      </div>
    </div>
  )
}

// ===== NEWS TAB =====
function NewsTab() {
  return <NewsFeed title="Chemical Industry News & Developments" items={newsData} />
}
