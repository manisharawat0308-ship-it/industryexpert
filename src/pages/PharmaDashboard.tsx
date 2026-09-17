import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, Pill, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, LabelList
} from 'recharts'
import PlayersBoard, { PlayerRow } from '../components/PlayersBoard'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { PHARMA_GAME } from '../components/process-game/data/pharmaGame'
import BusinessModel from '../components/BusinessModel'
import { PHARMA_BUSINESS } from '../data/businessModels/pharmaBusiness'
import NewsFeed from '../components/NewsFeed'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'
import PharmaRiskAnalysis from '../components/risk-analysis/PharmaRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'

const COLORS = ['#0891b2', '#B02A30', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#1e3a5f', '#795548']

type PharmaTab = 'overview' | 'business' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot' | 'game'

// ===== DATA =====
const segmentData = [
  { name: 'Formulations (Finished Dosage)', value: 55, color: '#0891b2' },
  { name: 'API / Bulk Drugs', value: 20, color: '#B02A30' },
  { name: 'Biologics & Biosimilars', value: 10, color: '#4CAF50' },
  { name: 'OTC & Consumer Health', value: 8, color: '#F99D27' },
  { name: 'Medical Devices', value: 5, color: '#9C27B0' },
  { name: 'CRAMS / CDMO', value: 2, color: '#1e3a5f' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Formulations (Finished Dosage)': { subtypes: [{ name: 'Oral Solids (Tablets/Capsules)', share: '60%' }, { name: 'Injectables', share: '18%' }, { name: 'Topicals (Creams/Ointments)', share: '8%' }, { name: 'Liquids/Syrups', share: '7%' }, { name: 'Inhalers/Nasal', share: '4%' }, { name: 'Ophthalmic', share: '3%' }], desc: 'India supplies 20% of global generic formulations. 60B+ units exported annually. ANDA filings with US FDA lead globally. Sun Pharma, Cipla, Dr Reddys, Lupin are top exporters.' },
  'API / Bulk Drugs': { subtypes: [{ name: 'Antibiotics (Amoxicillin, Azithromycin)', share: '25%' }, { name: 'CVS Drugs (Atorvastatin, Amlodipine)', share: '20%' }, { name: 'Anti-Diabetics (Metformin, Glimepiride)', share: '18%' }, { name: 'Oncology APIs', share: '12%' }, { name: 'Hormones & Steroids', share: '10%' }, { name: 'Others', share: '15%' }], desc: 'India was 70% dependent on China for API KSMs. PLI scheme (Rs 15,000 Cr) aims to build domestic API capacity. Hyderabad is India\'s bulk drug capital.' },
  'Biologics & Biosimilars': { subtypes: [{ name: 'Insulin Biosimilars', share: '30%' }, { name: 'Monoclonal Antibodies (mAbs)', share: '35%' }, { name: 'Vaccines', share: '25%' }, { name: 'Cell & Gene Therapy', share: '10%' }], desc: 'India is world\'s largest vaccine producer (60% of global supply). Serum Institute produces 1.5B doses/year. Biocon is world\'s largest insulin biosimilar producer.' },
  'OTC & Consumer Health': { subtypes: [{ name: 'Pain/Cold/Cough', share: '35%' }, { name: 'Digestive Health', share: '20%' }, { name: 'Vitamins & Supplements', share: '25%' }, { name: 'Skin/Hair Care', share: '20%' }], desc: 'Growing 15%+ CAGR driven by self-medication trend. Cipla Health, Abbott Consumer, Mankind Pharma leading. E-pharmacy (1mg, PharmEasy) accelerating OTC sales.' },
  'Medical Devices': { subtypes: [{ name: 'Consumables (Syringes, Gloves)', share: '30%' }, { name: 'Diagnostics (IVD)', share: '25%' }, { name: 'Implants (Stents, Ortho)', share: '20%' }, { name: 'Equipment (Imaging, Surgical)', share: '25%' }], desc: '$15B market growing at 20% CAGR. 80% imported currently. PLI scheme targeting domestic manufacturing. Trivitron, Poly Medicure are Indian leaders.' },
  'CRAMS / CDMO': { subtypes: [{ name: 'Custom Synthesis', share: '40%' }, { name: 'Contract Manufacturing', share: '35%' }, { name: 'Contract Research', share: '25%' }], desc: 'Fastest growing segment (30%+ CAGR). Global pharma outsourcing to India for cost advantage. Syngene, Divi\'s Labs, Laurus Labs are top CDMOs. India\'s CDMO market projected $25B by 2030.' },
}

const globalComparison = [
  { country: 'USA', value: 580 },
  { country: 'China', value: 170 },
  { country: 'Japan', value: 85 },
  { country: 'Germany', value: 65 },
  { country: 'India', value: 50 },
  { country: 'France', value: 45 },
  { country: 'UK', value: 38 },
  { country: 'South Korea', value: 28 },
  { country: 'Brazil', value: 25 },
  { country: 'Italy', value: 22 },
]

const timelineData = [
  { year: '2000', production: 5, exports: 2, projected: null },
  { year: '2005', production: 10, exports: 4, projected: null },
  { year: '2010', production: 20, exports: 8, projected: null },
  { year: '2015', production: 30, exports: 14, projected: null },
  { year: '2020', production: 42, exports: 20, projected: null },
  { year: '2023', production: 48, exports: 25, projected: null },
  { year: '2025', production: 55, exports: 28, projected: 55 },
  { year: '2027', production: null, exports: null, projected: 80 },
  { year: '2030', production: null, exports: null, projected: 130 },
]

const supplyData = [
  { year: 'FY20', domestic: 28, exports: 20.6, imports: 4.5 },
  { year: 'FY21', domestic: 30, exports: 24.4, imports: 4.2 },
  { year: 'FY22', domestic: 33, exports: 24.6, imports: 5.0 },
  { year: 'FY23', domestic: 36, exports: 25.3, imports: 5.5 },
  { year: 'FY24', domestic: 40, exports: 27.1, imports: 5.8 },
  { year: 'FY25', domestic: 44, exports: 27.9, imports: 6.2 },
]

const exportDetails = [
  { country: 'USA', value: '$8.2B', share: '29%', products: 'Generic formulations, specialty drugs, injectables' },
  { country: 'Europe', value: '$5.6B', share: '20%', products: 'APIs, biosimilars, OTC products' },
  { country: 'Africa', value: '$4.5B', share: '16%', products: 'Anti-malarials, ARVs, essential medicines' },
  { country: 'Asia (ex-India)', value: '$3.8B', share: '14%', products: 'Formulations, vaccines, APIs' },
  { country: 'Latin America', value: '$2.5B', share: '9%', products: 'Generics, oncology drugs' },
  { country: 'CIS Countries', value: '$1.8B', share: '6%', products: 'APIs, cardiovascular drugs' },
  { country: 'Middle East', value: '$1.5B', share: '6%', products: 'Formulations, OTC, medical devices' },
]

const playersData = [
  { rank: 1, name: 'Sun Pharma', revenue: 52000, exports: 40, segment: 'Specialty + Generics', usFDA: 40 },
  { rank: 2, name: 'Cipla', revenue: 27000, exports: 45, segment: 'Respiratory + HIV/AIDS', usFDA: 35 },
  { rank: 3, name: "Dr Reddy's", revenue: 26500, exports: 55, segment: 'Generics + Biosimilars', usFDA: 30 },
  { rank: 4, name: 'Mankind Pharma', revenue: 12000, exports: 5, segment: 'Domestic Branded', usFDA: 5 },
  { rank: 5, name: 'Lupin', revenue: 20000, exports: 50, segment: 'Generics + Complex', usFDA: 25 },
  { rank: 6, name: 'Zydus Lifesciences', revenue: 19500, exports: 45, segment: 'Generics + Vaccines', usFDA: 28 },
  { rank: 7, name: "Divi's Labs", revenue: 8500, exports: 80, segment: 'API/CDMO', usFDA: 12 },
  { rank: 8, name: 'Aurobindo Pharma', revenue: 25000, exports: 60, segment: 'Generics (Volume)', usFDA: 45 },
  { rank: 9, name: 'Biocon', revenue: 14000, exports: 70, segment: 'Biosimilars + Biologics', usFDA: 8 },
  { rank: 10, name: 'Torrent Pharma', revenue: 11000, exports: 25, segment: 'Branded Generics', usFDA: 15 },
  { rank: 11, name: 'Serum Institute', revenue: 15000, exports: 65, segment: 'Vaccines', usFDA: 3 },
  { rank: 12, name: 'Glenmark', revenue: 14500, exports: 45, segment: 'Derma + Respiratory', usFDA: 20 },
  { rank: 13, name: 'Alkem Labs', revenue: 13000, exports: 20, segment: 'Acute Therapy', usFDA: 12 },
  { rank: 14, name: 'Laurus Labs', revenue: 6500, exports: 75, segment: 'API + CDMO', usFDA: 8 },
  { rank: 15, name: 'Syngene Intl', revenue: 3500, exports: 85, segment: 'Contract Research', usFDA: 5 },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'Sun Pharma': { hq: 'Mumbai', ceo: 'Dilip Shanghvi', founded: '1983', type: 'Private (Promoter 54%)', plants: '40+ plants in India, USA, Canada, Israel, Australia', expansion: 'Specialty pipeline: $2B+ revenue target by FY27. Tildrakizumab (derma), Ilumya (psoriasis). Acquired Taro (Israel), Ranbaxy (2015).', moat: 'India #1, World #5 generics. Highest market cap in Indian pharma (Rs 4L Cr). Specialty pivot de-risks from generic price erosion. Dilip Shanghvi = richest pharma entrepreneur.' },
  'Cipla': { hq: 'Mumbai', ceo: 'Umang Vohra', founded: '1935', type: 'Private (Promoter 34%)', plants: '35+ manufacturing facilities globally', expansion: 'US inhaler launches (Advair generic — $600M opportunity). Respiratory + peptides focus. Digital health investments.', moat: 'Respiratory therapy leader (India + Africa). Made ARV affordable for Africa ($350/year vs $12,000). Brand trust across 80+ countries. R&D spend 6%+ of revenue.' },
  'Serum Institute': { hq: 'Pune', ceo: 'Adar Poonawalla', founded: '1966', type: 'Private (Unlisted)', plants: 'Pune (3 campuses), Netherlands', expansion: 'mRNA platform (with Novavax). Dengue vaccine. New biologics campus. $1B+ revenue target. IPO speculation.', moat: 'World largest vaccine producer by doses (1.5B/year). Covishield maker. Lowest cost vaccines globally. WHO prequalified. Supplies 170+ countries.' },
  'Biocon': { hq: 'Bangalore', ceo: 'Kiran Mazumdar-Shaw (Chairperson), Siddharth Mittal (CEO)', founded: '1978', type: 'Private', plants: 'Bangalore, Hyderabad, Malaysia', expansion: 'Biosimilar insulin (Semglee in US). Humira biosimilar launch. Viatris JV for global markets. Biologics park in Bangalore.', moat: 'India #1 biosimilar company. Only Indian firm with insulin biosimilar in US market. Kiran Mazumdar = most respected woman entrepreneur in Indian pharma.' },
  "Dr Reddy's": { hq: 'Hyderabad', ceo: 'Erez Israeli', founded: '1984', type: 'Private (Promoter 27%)', plants: '20+ facilities across India, USA, UK, Mexico', expansion: 'Biosimilars (rituximab, trastuzumab), complex generics, and nutraceuticals. Nicotine replacement therapy in US. Digital therapeutics ventures.', moat: 'Among India\'s top-3 generic exporters. Strong US ANDA pipeline (30+ FDA plants). Vertical integration from API to formulation. Early biosimilar mover.' },
  'Mankind Pharma': { hq: 'New Delhi', ceo: 'Rajeev Juneja', founded: '1991', type: 'Private (Listed 2023)', plants: '25+ manufacturing facilities in India', expansion: 'Consumer healthcare (Prega News, Manforce), chronic therapy expansion, and acquisitions (Panacea Biotec formulations). ₹4,200 Cr IPO in 2023.', moat: 'India\'s domestic-market powerhouse (95%+ India revenue). #1 in condoms & pregnancy tests. Deep rural distribution. Low regulatory (US-FDA) exposure = lower compliance risk.' },
  'Lupin': { hq: 'Mumbai', ceo: 'Vinita Gupta (CEO), Nilesh Gupta (MD)', founded: '1968', type: 'Private (Promoter 47%)', plants: '15+ facilities in India, USA, Brazil, Mexico', expansion: 'Complex generics, inhalation (respiratory), biosimilars, and specialty (CNS, women\'s health). Digital health (Lupin Digital Health).', moat: 'Global respiratory & complex-generic leader. Strong US presence. Diabetes and cardiovascular franchise in India. TB drug legacy.' },
  'Zydus Lifesciences': { hq: 'Ahmedabad', ceo: 'Sharvil Patel', founded: '1952', type: 'Private (Promoter 75%)', plants: '25+ facilities in India, USA', expansion: 'NCE research (Saroglitazar - world\'s first for NASH), vaccines (ZyCoV-D DNA vaccine), biosimilars, and consumer wellness.', moat: 'Only Indian firm with an approved DNA vaccine. Strong NCE/innovation pipeline (rare among generics). Vertically integrated. Consumer brands (Nycil, Everyuth).' },
  "Divi's Labs": { hq: 'Hyderabad', ceo: 'Kiran S. Divi', founded: '1990', type: 'Private (Promoter 52%)', plants: 'Hyderabad, Visakhapatnam (2 large API campuses)', expansion: 'Custom synthesis (CDMO) for global innovators, contrast media, and nutraceuticals. Capacity expansion for high-value generic APIs.', moat: 'World\'s largest API/intermediate manufacturer for many molecules. Preferred CDMO partner for Big Pharma. Highest margins in Indian pharma (~30% EBITDA). 80%+ exports.' },
  'Aurobindo Pharma': { hq: 'Hyderabad', ceo: 'K. Nithyananda Reddy (Vice Chairman)', founded: '1986', type: 'Private (Promoter 52%)', plants: '30+ facilities, largest FDA-approved plant count in India (45)', expansion: 'Biosimilars, injectables, specialty, and vaccines (via Auro Vaccines). US injectables and Europe expansion.', moat: 'India\'s largest generic exporter by volume. Most US-FDA approved plants (45). Vertically integrated (own API). Broad therapeutic coverage.' },
  'Torrent Pharma': { hq: 'Ahmedabad', ceo: 'Aman Mehta', founded: '1959', type: 'Private (Promoter 71%)', plants: '8+ facilities in India, plus US/Europe', expansion: 'Branded generics (India + Brazil), acquisitions (Curatio dermatology, Unichem brands), and chronic therapy focus.', moat: 'Strong branded-generic model with high margins. #1/#2 in cardiovascular & CNS in India. Consistent acquisition-led growth. Lower US price-erosion exposure.' },
  'Glenmark': { hq: 'Mumbai', ceo: 'Glenn Saldanha', founded: '1977', type: 'Private (Promoter 47%)', plants: '11+ facilities in India, USA, Argentina, Czech Republic', expansion: 'Dermatology & respiratory globally, innovative R&D (Glenmark Pharmaceuticals + Ichnos Sciences for novel biologics), and Glenmark Life Sciences (API arm).', moat: 'Strong derma & respiratory franchise. Novel drug R&D ambition (rare for Indian generics). Emerging-market presence. API arm de-merged for value.' },
  'Alkem Labs': { hq: 'Mumbai', ceo: 'Sandeep Singh (MD)', founded: '1973', type: 'Private (Promoter 55%)', plants: '20+ facilities in India, USA', expansion: 'Acute-therapy dominance (anti-infectives, gastro), chronic therapy expansion, and US generics scale-up. Consumer & nutraceutical brands.', moat: 'India\'s #1 in anti-infectives & acute therapy. Top-5 domestic pharma. Strong brand portfolio (Clavam, Pan). Deep distribution reach.' },
  'Laurus Labs': { hq: 'Hyderabad', ceo: 'Satyanarayana Chava', founded: '2005', type: 'Private (Promoter 27%)', plants: 'Visakhapatnam, Hyderabad (API + FDF + CDMO)', expansion: 'ARV (anti-retroviral) API leadership, growing CDMO/synthesis business, biologics (Laurus Bio), and formulations scale-up.', moat: 'World\'s largest ARV API producer. Fast-growing CDMO franchise with Big Pharma contracts. Backward-integrated. High-growth biologics entry.' },
  'Syngene Intl': { hq: 'Bangalore', ceo: 'Peter Bains', founded: '1993', type: 'Private (Biocon subsidiary)', plants: 'Bangalore, Hyderabad, Mangalore (research + manufacturing)', expansion: 'Integrated discovery-to-manufacturing CRO/CDMO, dedicated R&D centres for global clients (BMS, Amgen), and biologics manufacturing.', moat: 'India\'s premier contract research organization (CRO). Long-term dedicated centres with Big Pharma. End-to-end discovery + development + manufacturing. 85%+ exports.' },
}

const geographyData = [
  { state: 'Hyderabad (Telangana)', share: 28, plants: 800, majorPlayers: "Dr Reddy's, Aurobindo, Hetero, Laurus Labs, Divis, Natco", reason: "India's Bulk Drug Capital. Genome Valley has 200+ pharma/biotech units. Largest API manufacturing cluster globally. Proximity to airport for cold-chain exports. CSIR-IICT for R&D support. Government pharma SEZ (Jawaharlal Nehru Pharma City). Low cost + skilled chemists." },
  { state: 'Maharashtra (Mumbai/Pune)', share: 22, plants: 650, majorPlayers: 'Sun Pharma, Cipla, Lupin, Glenmark, Wockhardt, Abbott India', reason: "Mumbai = pharma corporate capital (most HQs here). Pune has formulation clusters. Proximity to JNPT port for exports. FDA-approved facilities cluster. CDSCO (drug regulator) regional office. Strong hospital-pharma linkage for clinical trials." },
  { state: 'Gujarat (Ahmedabad/Vadodara)', share: 18, plants: 550, majorPlayers: 'Zydus, Torrent, Intas, Cadila, Sun Pharma (Halol)', reason: "India's formulation manufacturing hub. Ahmedabad-Vadodara corridor has 500+ units. Zydus + Torrent + Intas are all Gujarat-origin. Strong chemical (intermediate) supply base. Mundra/Pipavav ports for API import." },
  { state: 'Karnataka (Bangalore)', share: 10, plants: 250, majorPlayers: 'Biocon, Syngene, Strides, Jubilant, AstraZeneca', reason: "India's biotech capital. Biocon's biologics campus is Asia's largest. Syngene = India's top CRO. IT talent enables bioinformatics + digital health. Climate suited for biotech labs. Proximity to IISc for academic collaboration." },
  { state: 'Himachal Pradesh', share: 8, plants: 600, majorPlayers: 'Sun Pharma (multiple), Cipla, Dr Reddys, Mankind, Macleods', reason: "Tax haven — erstwhile excise exemption attracted massive pharma investment (Baddi-Nalagarh belt). 600+ units in small state. Lower labor costs. Clean environment for pharma manufacturing. Close to Delhi market." },
  { state: 'Goa', share: 5, plants: 80, majorPlayers: 'Sanofi, Aventis, Cipla, Unichem, Glenmark', reason: "Legacy MNC presence (Sanofi, Aventis from 1960s). Small but high-quality manufacturing. Port access for exports. Tourism + pharma dual economy. Clean rooms meet global standards." },
  { state: 'Tamil Nadu (Chennai)', share: 5, plants: 200, majorPlayers: 'Orchid Pharma, Shasun, Apex Labs, Raman & Weil', reason: "Strong API/intermediate chemistry base. Chennai port for exports. Proximity to hospitals for clinical research (Apollo, Fortis). Growing CRO/CDMO cluster. IIT Madras collaboration for drug discovery." },
  { state: 'Uttarakhand', share: 4, plants: 180, majorPlayers: 'Mankind, Alkem, Sun Pharma, Torrent, Ipca', reason: "Tax incentive zone (like Himachal). Haridwar/Roorkee pharma belt. Newer facilities (post-2005). OTC and domestic branded generics focused. Lower compliance burden." },
]

// ===== MAIN COMPONENT =====
export default function PharmaDashboard() {
  const [activeTab, setActiveTab] = useState<PharmaTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'
  const tabs: { id: PharmaTab; label: string; icon: any }[] = [
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
      <DashboardHeader title="Pharma & Healthcare" />
      <nav className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm"><div className="max-w-[1920px] mx-auto px-6"><div className="flex items-center gap-1 py-2 overflow-x-auto">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}><tab.icon size={14} /> {tab.label}</button>))}</div></div></nav>
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'business' && <BusinessModel data={PHARMA_BUSINESS} />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="pharma" />}
        {activeTab === 'game' && <ProcessGame data={PHARMA_GAME} />}
      </main>
      <footer className="bg-navy text-white py-3 fixed bottom-0 left-0 right-0 z-30"><div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between"><p className="text-xs opacity-80">ICICI Lombard General Insurance Company Ltd.</p><p className="text-xs text-amber-300 font-semibold">For Internal Use Only</p><p className="text-xs opacity-80">Designed by <span className="font-bold">Deepak Arora</span></p></div></footer>
    </div>
  )
}

// ===== OVERVIEW TAB =====
function OverviewTab() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [showExports, setShowExports] = useState(false)
  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-r from-[#0891b2] to-[#06b6d4] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><Pill size={20} className="text-cyan-200" /><span className="text-[10px] font-semibold text-cyan-200 uppercase tracking-wide">Pharmacy of the World</span></div>
          <h2 className="text-2xl font-black">India Pharma & Healthcare Industry</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">$55B market | 20% of global generics | 60% of world's vaccines | 700+ US FDA plants | $28B exports</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={55} />B</div><div className="text-[10px] text-white/70 mt-0.5">Market Size (FY25)</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">#<AnimatedCounter end={3} /></div><div className="text-[10px] text-white/70 mt-0.5">Global Rank (Volume)</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={27.9} decimals={1} />B</div><div className="text-[10px] text-white/70 mt-0.5">Exports (Record)</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={700} />+</div><div className="text-[10px] text-white/70 mt-0.5">US FDA Plants</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={60} />%</div><div className="text-[10px] text-white/70 mt-0.5">World's Vaccines</div></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={82} label="Pharma Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Pharma Market ($Billion, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India is 3rd largest by volume, 14th by value</p>
          <ResponsiveContainer width="100%" height={300}><BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="$B" /><YAxis dataKey="country" type="category" fontSize={10} width={70} /><Tooltip formatter={(v: number) => `$${v}B`} /><Bar dataKey="value" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'USA' ? '#B02A30' : '#0891b2'} />)}<LabelList dataKey="value" position="right" fontSize={9} formatter={(v: number) => `$${v}B`} /></Bar></BarChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: IQVIA, Pharmexcil, IBEF 2025</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India Pharma Growth ($B) - History & Target</h3>
          <p className="text-xs text-gray-500 mb-3">$5B (2000) to $55B (2025) - target $130B by 2030</p>
          <ResponsiveContainer width="100%" height={300}><LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} unit="$B" /><Tooltip /><Legend /><Line type="monotone" dataKey="production" name="Domestic Market" stroke="#0891b2" strokeWidth={2.5} dot={{ r: 5, fill: '#0891b2' }} connectNulls={false} /><Line type="monotone" dataKey="exports" name="Exports" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4, fill: '#4CAF50' }} connectNulls={false} /><Line type="monotone" dataKey="projected" name="Target (2030)" stroke="#f37021" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 4, fill: '#f37021' }} connectNulls={false} /></LineChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: Pharmexcil, IBEF, Indian Pharma Alliance</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Product Segment Split</h3>
          <p className="text-xs text-gray-500 mb-3">Click any segment for details</p>
          <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split(' ')[0]} ${value}%`} labelLine={false} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart></ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Domestic + Export Trend ($B)</h3>
          <p className="text-xs text-gray-500 mb-3">Click button for export destination breakup</p>
          <ResponsiveContainer width="100%" height={250}><BarChart data={supplyData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} unit="$B" /><Tooltip /><Legend /><Bar dataKey="domestic" fill="#0891b2" name="Domestic ($B)" radius={[4, 4, 0, 0]} /><Bar dataKey="exports" fill="#4CAF50" name="Exports ($B)" radius={[4, 4, 0, 0]} /><Bar dataKey="imports" fill="#B02A30" name="Imports ($B)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
          <button onClick={() => setShowExports(true)} className="mt-3 text-[10px] px-3 py-1.5 bg-green-50 text-green-700 rounded-lg font-semibold border border-green-200 hover:bg-green-100">📤 View Export Destinations ($27.9B)</button>
        </div>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p><div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div></div></div>)}
      {showExports && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExports(false)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">India Pharma Exports - $27.9B (FY25)</h3><button onClick={() => setShowExports(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><p className="text-xs text-gray-500 mb-3">India exports to 200+ countries. "Pharmacy of the World" - supplies 20% of global generic volume.</p><div className="space-y-2">{exportDetails.map((e, i) => (<div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{e.country}</span><div className="text-right"><span className="text-xs font-bold text-green-700">{e.value}</span><span className="text-[10px] text-gray-500 ml-2">{e.share}</span></div></div>))}</div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#0891b2] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways - India Pharma</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Generic Dominance</div><p className="text-xs text-gray-700">India supplies 20% of global generics, 60% of world vaccines. Lowest cost manufacturer. 700+ US FDA approved plants.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">China+1 Beneficiary</div><p className="text-xs text-gray-700">Global pharma diversifying API sourcing from China to India. PLI scheme (Rs 15,000 Cr) accelerating domestic API capacity.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Biosimilar Opportunity</div><p className="text-xs text-gray-700">$100B+ worth biologics going off-patent by 2030. India's biosimilar capability (Biocon, Dr Reddys) positions it as global leader.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">CDMO Boom</div><p className="text-xs text-gray-700">Contract manufacturing growing 30%+ CAGR. Global pharma outsourcing $100B+ to India by 2030. Syngene, Divi's, Laurus leading.</p></div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: Pharmexcil, IBEF, IQVIA, WHO, CDSCO, Indian Pharma Alliance</p>
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
      type: d?.type || 'Pharma',
      segment: p.segment,
      hq: d?.hq,
      founded: d?.founded,
      target: d?.expansion,
      highlight: d?.moat,
      extra: [
        { label: 'Exports %', value: `${p.exports}%` },
        { label: 'USFDA Sites', value: String(p.usFDA) },
      ],
    }
  })
  return (
    <PlayersBoard
      players={rows}
      config={{
        industryLabel: 'Pharma',
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 15 Pharma Companies</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for detailed profile</p>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (Cr)</th><th className="text-right py-2 px-2 font-bold text-navy">Export %</th><th className="text-left py-2 px-2 font-bold text-navy">Segment</th><th className="text-center py-2 px-2 font-bold text-navy">FDA Plants</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-cyan-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right font-bold">Rs {p.revenue.toLocaleString()}</td><td className="py-2.5 px-2 text-right font-bold text-green-600">{p.exports}%</td><td className="py-2.5 px-2 text-gray-600 text-[10px]">{p.segment}</td><td className="py-2.5 px-2 text-center">{p.usFDA}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View</span></td></tr>))}</tbody></table></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-3">Key Industry Facts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200"><h4 className="text-xs font-bold text-cyan-800 mb-1">100% Private Sector</h4><p className="text-[10px] text-cyan-700">Unlike steel/banking, pharma is entirely private sector driven. No PSU pharma companies in top 50. Government role limited to regulation (CDSCO) and procurement (CGHS/PMBJP).</p></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><h4 className="text-xs font-bold text-green-800 mb-1">R&D Spend Rising</h4><p className="text-[10px] text-green-700">Industry R&D spend at 8-9% of revenue (vs global 15-20%). Sun Pharma ($400M), Cipla ($200M), Dr Reddys ($180M) are top spenders. NIPER network for academic research.</p></div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200"><h4 className="text-xs font-bold text-amber-800 mb-1">Consolidation Wave</h4><p className="text-[10px] text-amber-700">Acquisitions accelerating: Sun (Ranbaxy $4B), Torrent (Curatio), Mankind IPO (Rs 4,200 Cr). PE/VC investing heavily in CDMO, digital health, med-tech.</p></div>
        </div>
      </div>
    </div>
  )
}

// ===== RISK TAB =====
function RiskTab() {
  return <PharmaRiskAnalysis />
}

function RiskTabLegacy() {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'bestpractices'>('insurable')
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const caseStudies = [
    { title: 'Ranbaxy FDA Ban - Data Integrity Fraud (2013)', plant: 'Ranbaxy Labs (now Sun Pharma), Toansa/Dewas', loss: '$500M+ (penalties + lost sales)', cause: 'Systematic data fabrication in bioequivalence studies. Fake dissolution test results submitted to US FDA. Whistleblower Dinesh Thakur exposed the fraud.', lesson: 'Data integrity is existential risk. ALCOA+ principles mandatory. Whistleblower protection. Due diligence critical in M&A (Sun acquired Ranbaxy for $4B, inherited all liabilities).', claimType: 'D&O + Product Liability + Recall', date: '2013-2014', segment: 'Data Integrity / Regulatory', detail: 'Ranbaxy systematically fabricated bioequivalence data for 30+ drugs over 10 years. Lab analysts were instructed to report favorable results regardless of actual outcomes. When whistleblower Dinesh Thakur reported to FDA, they found fraudulent records across multiple facilities. Result: Consent decree with DOJ ($500M fine), import alerts on 2 plants, lost $1B+ in US revenue, criminal charges against former CEO. Sun Pharma acquired Ranbaxy in 2014 for $4B but inherited all quality issues, spending 3 years remediating plants. This was Indian pharma largest regulatory crisis and led to industry-wide reforms.', insuranceNote: 'D&O claims from shareholders for stock price crash (Rs 30,000 Cr market cap loss). Product Liability for any patient harm from substandard drugs. Product Recall costs. Professional Indemnity for auditors who missed fraud. Key lesson: pharma D&O policies need regulatory investigation coverage.' },
    { title: 'Wockhardt UK Plant Shutdown (2013)', plant: 'Wockhardt Ltd, Waluj (Aurangabad)', loss: 'Rs 3,000 Cr (revenue loss over 3 years)', cause: 'MHRA (UK regulator) found GMP violations - cross contamination risk, data integrity issues, inadequate cleaning validation between products.', lesson: 'Multi-regulator risk - one agency ban triggers others. Clean room standards must exceed minimum. Quality culture must be CEO-driven.', claimType: 'MLOP + Product Recall', date: '2013', segment: 'Manufacturing GMP', detail: 'UK MHRA inspection at Wockhardt Waluj found: (1) Insulin vials contaminated with cytotoxic drug residue, (2) Inadequate cleaning validation between products, (3) Data integrity failures in batch records. MHRA banned imports from Waluj to UK. US FDA followed with Warning Letter. EU restricted 16 products. Revenue from regulated markets dropped 60% over 2 years. Wockhardt share price fell 70%. Company took 3 years and Rs 800 Cr investment to remediate and regain approvals.', insuranceNote: 'MLOP for production loss during remediation period. Product Recall insurance for withdrawing potentially contaminated products from market. D&O for shareholder claims. Key: pharma BI policies need specific extension for regulatory-triggered shutdowns (not just fire/MB).' },
    { title: 'Vizag Pharma Gas Leak - LG Polymers (2020)', plant: 'LG Polymers (Styrene plant near pharma cluster), Vizag', loss: '12 deaths + 500+ hospitalized + Rs 500 Cr', cause: 'Styrene monomer storage tank temperature rose during COVID lockdown (no maintenance staff). Styrene polymerized, releasing toxic gas. Affected residents in 3km radius including pharma workers.', lesson: 'Chemical storage risk during shutdown. Temperature monitoring mandatory 24/7. Emergency response for toxic gas release. Proximity risk to residential areas.', claimType: 'Public Liability + WC + Environmental', date: 'May 2020', segment: 'Chemical Storage / Environmental', detail: 'During COVID-19 lockdown, LG Polymers Vizag plant was unmanned. Styrene monomer in 2 storage tanks (combined 2,400 MT) was left without temperature monitoring. Styrene self-polymerizes above 30 deg C, releasing toxic gas. On May 7, massive gas leak affected villages in 3km radius. 12 people died (including 2 children), 500+ hospitalized, 3,000 evacuated. While not a pharma plant, the location was near multiple pharma API units in Vizag SEZ, and many pharma workers were affected. LG paid Rs 500 Cr compensation. Plant was permanently shut and demolished.', insuranceNote: 'Public Liability (mandatory under PLI Act 1991) and Environmental Liability. WC for affected workers. Third-party property damage. Key for pharma: proximity risk assessment critical. Many pharma clusters are near chemical/petrochemical units. Need Environmental Impairment Liability for gradual pollution.' },
    { title: 'Sun Pharma - Halol FDA Warning Letter (2015)', plant: 'Sun Pharma, Halol (Gujarat)', loss: 'Rs 5,000 Cr revenue impact + remediation costs', cause: 'FDA 483 observations: inadequate investigation of OOS results, equipment cleaning failures, procedural lapses in quality lab, CGMP non-compliance across multiple departments.', lesson: 'Post-acquisition integration risk (Halol was former Caraco plant). Quality remediation takes 2-3 years minimum. US FDA has zero tolerance for repeat observations.', claimType: 'MLOP + D&O', date: '2015-2018', segment: 'GMP / Quality Systems', detail: 'Sun Pharma Halol facility received FDA Warning Letter in Dec 2015 with 12 observations including: failure to investigate OOS test results, lack of cleaning validation, incomplete batch records, equipment not properly maintained. FDA restricted new product approvals from Halol. The plant was generating Rs 5,000 Cr/year in US revenue - all new launches were blocked for 3 years until resolution in 2018. Sun invested Rs 500 Cr in remediation, hired 200+ quality staff, installed electronic batch records, and underwent 3 FDA re-inspections before clearance.', insuranceNote: 'MLOP for 3 years of lost revenue from blocked approvals. D&O claims from investors for not disclosing quality risks. Product Recall for any substandard batches already in market. Key: pharma needs specific "regulatory action" extension in BI policy - standard fire/MB trigger does not cover FDA bans.' },
  ]
  const riskSubTabs = [{ id: 'insurable' as const, label: 'Insurable Risks' }, { id: 'bestpractices' as const, label: 'Case Studies & Best Practices' }]
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center gap-3"><Shield size={20} className="text-maroon" /><div><h3 className="text-sm font-bold text-navy">Pharma Risk Management Framework</h3><p className="text-xs text-gray-500">API Manufacturing | Formulations | Biotech | QC Labs | Warehousing</p></div></div></div>
      <div className="flex gap-2 flex-wrap">{riskSubTabs.map((tab) => (<button key={tab.id} onClick={() => setRiskSubTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${riskSubTab === tab.id ? 'bg-maroon text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{tab.label}</button>))}</div>
      {riskSubTab === 'insurable' && (<div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'FDA/Regulatory Ban', probability: 'Medium', impact: 'Catastrophic', emv: 'Rs 500-5000 Cr', mitigation: 'ALCOA+ data integrity, GMP culture, pre-inspection audits, CAPA tracking' },
            { name: 'Product Recall', probability: 'Medium-High', impact: 'High', emv: 'Rs 50-500 Cr', mitigation: 'Batch traceability, stability testing, cold chain monitoring, pharmacovigilance' },
            { name: 'Clean Room Contamination', probability: 'Medium', impact: 'High', emv: 'Rs 20-200 Cr', mitigation: 'HVAC validation, differential pressure monitoring, personnel gowning SOP, HEPA filter DOP testing' },
            { name: 'API Chemical Reaction Runaway', probability: 'Low', impact: 'Catastrophic', emv: 'Rs 50-500 Cr', mitigation: 'Reaction calorimetry, automated temperature control, emergency quench systems, thermal stability studies' },
            { name: 'Cold Chain Failure', probability: 'Medium-High', impact: 'Medium-High', emv: 'Rs 10-100 Cr', mitigation: 'Temperature mapping, backup generators, real-time IoT monitoring, GDP compliance' },
            { name: 'IP/Patent Litigation', probability: 'High', impact: 'High', emv: 'Rs 100-2000 Cr', mitigation: 'FTF ANDA strategy, patent landscape analysis, Para-IV filings, settlement reserves' },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <h5 className="font-bold text-navy text-sm mb-2">{r.name}</h5>
              <div className="flex gap-2 mb-2"><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${r.probability === 'High' || r.probability === 'Medium-High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>P: {r.probability}</span><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${r.impact === 'Catastrophic' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>I: {r.impact}</span></div>
              <p className="text-xs font-bold text-maroon mb-1">{r.emv}</p>
              <p className="text-[10px] text-gray-500 italic">{r.mitigation}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-navy mb-1 flex items-center gap-2"><Shield size={16} className="text-maroon" /> Insurance Products & Key Add-ons - Pharma</h4>
          <p className="text-xs text-gray-500 mb-5">Coverages for pharmaceutical manufacturing and distribution</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h5 className="text-xs font-bold text-navy mb-3">Material Damage & Liability</h5><ul className="space-y-1.5">{['Product Liability (defective drug claims)', 'Product Recall Insurance', 'Clinical Trial Liability', 'Environmental Impairment Liability', 'D&O with regulatory investigation extension', 'Professional Indemnity (QP/QA roles)', 'Intellectual Property Defense', 'Workers Compensation (chemical exposure)'].map((item, i) => (<li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>))}</ul></div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h5 className="text-xs font-bold text-navy mb-3">Business Interruption</h5><ul className="space-y-1.5">{['MLOP for machinery breakdown', 'Regulatory Action BI extension', 'Cold Chain Failure stock loss', 'Supply Chain Disruption (API shortage)', 'Contingent BI (single-source API supplier)', 'Cyber BI (ransomware locking batch records)', 'Pandemic clause (demand surge/supply disruption)', 'Patent cliff revenue impact'].map((item, i) => (<li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>))}</ul></div>
          </div>
          <div className="mt-5 bg-orange-50 rounded-xl p-4 border border-orange-200"><h5 className="text-xs font-bold text-orange-800 mb-3">Pharma-Specific Add-ons</h5><ul className="space-y-1.5">{['Clean room HVAC system failure and decontamination costs', 'GMP remediation costs following FDA Warning Letter', 'Product stability failure (temperature excursion) stock loss', 'Pharmacovigilance costs (adverse event reporting)', 'API intermediate chemical spill cleanup', 'Biological waste treatment plant failure', 'WFI (Water for Injection) system contamination', 'Lyophilizer (freeze dryer) breakdown and batch loss', 'HPLC/GC analytical instrument failure (QC lab downtime)', 'Solvent recovery system fire/explosion', 'Sterile fill-finish line contamination (aseptic failure)', 'Controlled substance diversion and DEA investigation', 'Patent challenge legal defense costs (Para-IV ANDA)'].map((item, i) => (<li key={i} className="text-[11px] text-orange-900 flex items-start gap-2"><span className="text-orange-600 mt-0.5 font-bold">▸</span>{item}</li>))}</ul></div>
        </div>
      </div>)}
      {riskSubTab === 'bestpractices' && (<div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-navy mb-2 flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> Case Studies - Major Pharma Losses (India)</h4>
          <p className="text-xs text-gray-500 mb-4">Click any case study for full analysis</p>
          <div className="space-y-3">{caseStudies.map((cs, i) => (
            <div key={i} onClick={() => setSelectedCase(i)} className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-maroon/30 transition cursor-pointer bg-white">
              <div className="flex items-center justify-between mb-2"><h5 className="font-bold text-navy text-sm">{cs.title}</h5><span className="text-[10px] px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold">{cs.claimType}</span></div>
              <div className="flex items-center gap-4 text-[10px] text-gray-500"><span><strong>Entity:</strong> {cs.plant}</span><span><strong>Loss:</strong> <span className="text-red-600 font-bold">{cs.loss}</span></span></div>
              <div className="mt-2 flex items-center gap-2"><span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold">{cs.segment}</span><span className="text-[9px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{cs.date}</span><span className="text-[9px] text-maroon font-bold ml-auto">View Details →</span></div>
            </div>
          ))}</div>
        </div>
        {selectedCase !== null && caseStudies[selectedCase] && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><div><h3 className="text-lg font-bold text-navy">{caseStudies[selectedCase].title}</h3><div className="flex items-center gap-2 mt-1"><span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-bold">{caseStudies[selectedCase].claimType}</span><span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold">{caseStudies[selectedCase].segment}</span><span className="text-[10px] text-gray-500">{caseStudies[selectedCase].date}</span></div></div><button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-3 bg-gray-50 rounded-xl border border-gray-100"><span className="text-[9px] font-bold text-gray-500 uppercase block mb-1">Entity</span><span className="text-sm font-semibold text-navy">{caseStudies[selectedCase].plant}</span></div><div className="p-3 bg-red-50 rounded-xl border border-red-100"><span className="text-[9px] font-bold text-red-600 uppercase block mb-1">Estimated Loss</span><span className="text-sm font-bold text-red-700">{caseStudies[selectedCase].loss}</span></div></div><div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4"><span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Root Cause</span><p className="text-sm text-gray-700 leading-relaxed">{caseStudies[selectedCase].cause}</p></div><div className="p-4 bg-navy/5 rounded-xl border border-navy/10 mb-4"><span className="text-[10px] font-bold text-navy uppercase block mb-2">Detailed Analysis</span><p className="text-sm text-gray-700 leading-relaxed">{caseStudies[selectedCase].detail}</p></div><div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-4"><span className="text-[10px] font-bold text-green-700 uppercase block mb-2">Key Learnings</span><p className="text-sm text-green-800 leading-relaxed">{caseStudies[selectedCase].lesson}</p></div><div className="p-4 bg-amber-50 rounded-xl border border-amber-200"><span className="text-[10px] font-bold text-amber-700 uppercase block mb-2">Insurance Implications</span><p className="text-sm text-amber-800 leading-relaxed">{caseStudies[selectedCase].insuranceNote}</p></div></div></div>)}
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
      {selectedState && selectedInfo && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Why {selectedState} is a Pharma Hub</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><div className="grid grid-cols-2 gap-3 text-center"><div><div className="text-lg font-bold text-maroon">{selectedInfo.share}%</div><div className="text-[10px] text-gray-500">Industry Share</div></div><div><div className="text-lg font-bold text-navy">{selectedInfo.plants}+</div><div className="text-[10px] text-gray-500">Manufacturing Units</div></div></div><p className="text-xs text-gray-600 mt-3"><strong>Major Players:</strong> {selectedInfo.majorPlayers}</p></div><div><h4 className="text-sm font-bold text-navy mb-2">Key Reasons</h4><p className="text-sm text-gray-700 leading-relaxed">{selectedInfo.reason}</p></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Pharma Manufacturing Concentration by State</h3>
        <p className="text-xs text-gray-500 mb-4">Click any bar for state-level insights</p>
        <ResponsiveContainer width="100%" height={350}><BarChart data={geographyData} layout="vertical" onClick={(data: any) => { if (data?.activePayload) setSelectedState(data.activePayload[0]?.payload?.state) }}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="%" /><YAxis dataKey="state" type="category" fontSize={9} width={130} /><Tooltip formatter={(v: number) => `${v}%`} /><Bar dataKey="share" radius={[0, 4, 4, 0]} cursor="pointer">{geographyData.map((_, i) => <Cell key={i} fill={i < 2 ? '#f37021' : i < 4 ? '#0891b2' : '#94a3b8'} />)}<LabelList dataKey="share" position="right" fontSize={9} formatter={(v: number) => `${v}%`} /></Bar></BarChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: CDSCO, Pharmexcil, State Industrial Development Corporations</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h3 className="text-sm font-bold text-navy mb-3">India's Pharma Corridors</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200"><h4 className="text-xs font-bold text-cyan-800 mb-1">Hyderabad (API Capital)</h4><p className="text-[10px] text-cyan-700">Genome Valley + Pharma City. 800+ units. World's largest bulk drug cluster. Dr Reddys, Aurobindo, Hetero, Laurus, Divis all headquartered here. 28% of industry.</p></div><div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><h4 className="text-xs font-bold text-blue-800 mb-1">Gujarat-Maharashtra (Formulations)</h4><p className="text-[10px] text-blue-700">Ahmedabad + Mumbai/Pune. Zydus, Torrent, Sun, Cipla, Lupin. 40% of industry. Corporate HQs + manufacturing. FDA-approved formulation plants.</p></div><div className="p-4 bg-green-50 rounded-xl border border-green-200"><h4 className="text-xs font-bold text-green-800 mb-1">Himachal-Uttarakhand (Tax Belt)</h4><p className="text-[10px] text-green-700">Baddi-Nalagarh + Haridwar. 780+ units attracted by tax incentives. Domestic branded generics. Mankind, Macleods, Alkem presence. 12% of industry.</p></div></div></div>
    </div>
  )
}

// ===== NEWS DATA =====
const newsData = [
  { title: 'India Pharma Exports Hit Record $27.9B in FY26', source: 'Pharmexcil', date: '2026-08-12', summary: 'The USA, Europe, and Africa remain the top destinations for Indian drug exports. Generics and vaccines continue to drive growth as India targets $50B by 2030. Rising formulation and biosimilar shipments are broadening the export base.', sentiment: 'Positive' },
  { title: 'PLI Scheme for Bulk Drugs — 35 Projects Commissioned', source: 'Ministry of Chemicals', date: '2026-07-21', summary: 'The Rs 15,000 Cr PLI for API manufacturing is reducing dependency on imports for critical molecules. Hyderabad and Gujarat clusters are the primary beneficiaries. The scheme strengthens supply-chain resilience for essential drugs.', sentiment: 'Positive' },
  { title: 'US FDA Inspections Resume Full Pace — 150+ Indian Plants Inspected in FY26', source: 'CDSCO', date: '2026-06-17', summary: 'The post-pandemic inspection backlog has been cleared with a fresh wave of audits. Data integrity remains the leading compliance concern for regulators. Companies are adopting digital and AI-based tools to strengthen quality systems.', sentiment: 'Neutral' },
  { title: 'Biocon Insulin Biosimilar Gets Expanded EU Approval — $2B Market Access', source: 'Economic Times', date: '2026-05-28', summary: 'The insulin glargine biosimilar has secured approval across EU markets. Biocon strengthens its position as a leading Indian biosimilars player globally. The approval unlocks a large addressable market in diabetes care.', sentiment: 'Positive' },
  { title: 'Drug Price Control Order Expanded — 128 New Drugs Under NLEM', source: 'NPPA', date: '2026-04-18', summary: 'Cancer, diabetes, and cardiac drugs have been added to the essential medicines list. Price caps are expected to compress margins on affected products. Industry bodies have raised concerns over the impact on innovation.', sentiment: 'Negative' },
  { title: 'India CDMO Market to Reach $25B by 2030 — McKinsey', source: 'McKinsey Report', date: '2026-03-24', summary: 'Global pharma outsourcing is accelerating on cost and capacity considerations. India offers a significant cost advantage over Western manufacturing. Syngene, Divi\'s, Laurus, and Piramal Pharma are among the key beneficiaries.', sentiment: 'Positive' },
  { title: 'Mankind Pharma Acquires BSV Group for Rs 13,600 Cr', source: 'Business Standard', date: '2026-03-05', summary: 'The deal ranks among the largest domestic pharma acquisitions. BSV brings leadership in gynaecology and fertility therapies. Mankind is expanding its specialty portfolio beyond OTC and mass generics.', sentiment: 'Positive' },
  { title: 'Generic Drug Shortage in USA — Indian Companies Rush to Fill Gap', source: 'Reuters', date: '2026-02-14', summary: 'Hundreds of drugs remain in shortage across the US market. Cipla, Dr Reddy\'s, and Aurobindo are securing expedited approvals to supply. The situation presents a multi-billion-dollar opportunity for Indian generics makers.', sentiment: 'Positive' },
]

// ===== NEWS TAB =====
function NewsTab() {
  return <NewsFeed title="Pharma & Healthcare Industry News & Developments" items={newsData} />
}
