import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, Shirt
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, LabelList
} from 'recharts'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'

const COLORS = ['#7c3aed', '#B02A30', '#F99D27', '#4CAF50', '#0369a1', '#FF5722', '#1e3a5f']

type TextileTab = 'overview' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot'

// ===== DATA =====
const segmentData = [
  { name: 'Cotton Textiles', value: 30, color: '#7c3aed' },
  { name: 'Man-Made Fibers/Synthetics', value: 25, color: '#B02A30' },
  { name: 'Apparel/Garments', value: 22, color: '#F99D27' },
  { name: 'Technical Textiles', value: 10, color: '#4CAF50' },
  { name: 'Home Textiles', value: 8, color: '#0369a1' },
  { name: 'Others (Jute, Silk, Wool)', value: 5, color: '#FF5722' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Cotton Textiles': { subtypes: [{ name: 'Yarn & Thread', share: '35%' }, { name: 'Woven Fabrics', share: '30%' }, { name: 'Knitted Fabrics', share: '20%' }, { name: 'Denim', share: '10%' }, { name: 'Organic Cotton', share: '5%' }], desc: '$75B segment. India is world\'s largest cotton producer (6.1M tonnes). 23% of global spindle capacity. Gujarat (Surendranagar) & Maharashtra (Vidarbha) cotton belts. Shift from raw cotton exports to value-added processing.' },
  'Man-Made Fibers/Synthetics': { subtypes: [{ name: 'Polyester Filament/Staple', share: '55%' }, { name: 'Viscose/Rayon', share: '25%' }, { name: 'Nylon', share: '10%' }, { name: 'Acrylic', share: '5%' }, { name: 'Spandex/Elastane', share: '5%' }], desc: '$62B and fastest growing at 12% CAGR. PLI scheme targets MMF growth. Reliance, Grasim dominate. India only 25% MMF share vs 75% globally — massive catch-up potential.' },
  'Apparel/Garments': { subtypes: [{ name: 'Womenswear', share: '38%' }, { name: 'Menswear', share: '35%' }, { name: 'Kidswear', share: '15%' }, { name: 'Sportswear/Athleisure', share: '8%' }, { name: 'Innerwear', share: '4%' }], desc: '$55B domestic + $18B exports. Tirupur (#1 knitwear), Bangalore, Noida key hubs. Fast fashion growing 20%+. Branded apparel only 35% penetration.' },
  'Technical Textiles': { subtypes: [{ name: 'Meditech (medical)', share: '20%' }, { name: 'Geotech (infra)', share: '18%' }, { name: 'Mobiltech (auto)', share: '15%' }, { name: 'Agrotech (farming)', share: '15%' }, { name: 'Protech/Buildtech', share: '32%' }], desc: '$25B market growing 15%+ CAGR. Government mandate for geo-textiles in road construction. PLI scheme covers technical textiles. Import substitution driving domestic manufacturing.' },
  'Home Textiles': { subtypes: [{ name: 'Bed Linen/Sheets', share: '40%' }, { name: 'Towels & Bath', share: '25%' }, { name: 'Curtains & Upholstery', share: '15%' }, { name: 'Carpets & Rugs', share: '12%' }, { name: 'Kitchen Textiles', share: '8%' }], desc: '$20B market. India supplies 55% of global cotton bed linen. Welspun, Indo Count, Himatsingka lead exports. Panipat = carpet capital. USA/EU key markets.' },
  'Others (Jute, Silk, Wool)': { subtypes: [{ name: 'Jute Products', share: '45%' }, { name: 'Silk (Mulberry/Tussar)', share: '30%' }, { name: 'Wool/Pashmina', share: '15%' }, { name: 'Coir & Natural Fibers', share: '10%' }], desc: '$12B niche. India = largest jute producer (West Bengal). 2nd largest silk producer (Karnataka). Mandatory jute packaging for food grains. Heritage handloom/craft segment.' },
}

const globalComparison = [
  { country: 'China', revenue: 400 }, { country: 'India', revenue: 250 }, { country: 'Bangladesh', revenue: 55 },
  { country: 'Vietnam', revenue: 50 }, { country: 'Turkey', revenue: 35 }, { country: 'Italy', revenue: 30 },
  { country: 'Germany', revenue: 25 }, { country: 'USA', revenue: 20 },
]

const timelineData = [
  { year: '2010', production: 65, exports: 22 }, { year: '2013', production: 85, exports: 30 },
  { year: '2015', production: 108, exports: 37 }, { year: '2017', production: 130, exports: 36 },
  { year: '2019', production: 150, exports: 38 }, { year: '2020', production: 120, exports: 30 },
  { year: '2022', production: 195, exports: 40 }, { year: '2024', production: 250, exports: 44 },
  { year: '2027P', production: 320, exports: 60 }, { year: '2030P', production: 400, exports: 80 },
]

const playersData = [
  { rank: 1, name: 'Arvind Ltd', revenue: 7800, exports: '35%', segment: 'Denim/Fabrics', brands: 'Arrow, US Polo, Flying Machine' },
  { rank: 2, name: 'Raymond', revenue: 8500, exports: '15%', segment: 'Suiting/Apparel', brands: 'Raymond, Park Avenue, ColorPlus' },
  { rank: 3, name: 'Welspun India', revenue: 9200, exports: '70%', segment: 'Home Textiles', brands: 'Spaces, Welspun' },
  { rank: 4, name: 'Trident Group', revenue: 7200, exports: '55%', segment: 'Terry Towels/Yarn', brands: 'Trident, Bath Essentials' },
  { rank: 5, name: 'Vardhman Textiles', revenue: 8900, exports: '40%', segment: 'Yarn/Fabrics', brands: 'Vardhman (B2B)' },
  { rank: 6, name: 'Page Industries', revenue: 4800, exports: '5%', segment: 'Innerwear', brands: 'Jockey, Speedo' },
  { rank: 7, name: 'Aditya Birla Fashion (ABFRL)', revenue: 13500, exports: '8%', segment: 'Branded Apparel', brands: 'Louis Philippe, Van Heusen, Allen Solly' },
  { rank: 8, name: 'Grasim (Linen Club)', revenue: 26000, exports: '20%', segment: 'Viscose/Linen', brands: 'Linen Club, Birla Cellulose' },
  { rank: 9, name: 'KPR Mill', revenue: 5900, exports: '50%', segment: 'Knitwear/Garments', brands: 'FASO, KPR (B2B)' },
  { rank: 10, name: 'Himatsingka Seide', revenue: 2700, exports: '85%', segment: 'Home Textiles', brands: 'Calvin Klein, Tommy (licensed)' },
  { rank: 11, name: 'Indo Count Industries', revenue: 3200, exports: '80%', segment: 'Bed Linen', brands: 'Boutique Living, Layers' },
  { rank: 12, name: 'GHCL', revenue: 3800, exports: '65%', segment: 'Home Textiles', brands: 'Veria, Rekoop' },
  { rank: 13, name: 'Bombay Dyeing', revenue: 2500, exports: '20%', segment: 'Bed/Bath', brands: 'Bombay Dyeing' },
  { rank: 14, name: 'Lux Industries', revenue: 2800, exports: '10%', segment: 'Innerwear', brands: 'Lux, ONN, Lyra' },
  { rank: 15, name: 'Dollar Industries', revenue: 1600, exports: '8%', segment: 'Innerwear', brands: 'Dollar, BigBoss, Missy' },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'Arvind Ltd': { hq: 'Ahmedabad', ceo: 'Punit Lalbhai', founded: '1931', type: 'Lalbhai Group (Public)', plants: '12 manufacturing units. India largest denim manufacturer (110M meters/year). Fabrics, garments, advanced materials divisions', expansion: 'Advanced materials (aramid, composites) growing 25%+. Garmenting capacity expansion in Ethiopia, India. Sustainability focus: water-recycled denim. E-commerce brand push.', moat: 'India #1 denim maker. Licensed brands (Arrow, US Polo, Tommy Hilfiger manufacturing). Vertically integrated: fiber to garment. 90+ year legacy. Technical textiles diversification.' },
  'Raymond': { hq: 'Mumbai', ceo: 'Gautam Hari Singhania', founded: '1925', type: 'Singhania Family (Public)', plants: 'Largest integrated worsted suiting manufacturer globally. 20,000+ retail touchpoints. Fabrics + branded apparel + realty demerger underway', expansion: 'Ethnic wear (Ethnix by Raymond). Wedding segment expansion. Demerging lifestyle & realty businesses. International suiting exports to 55 countries.', moat: '100-year brand trust. "Complete Man" recall. Largest global worsted suiting capacity (31M meters). 1,500+ exclusive stores. B2B suiting for global luxury brands.' },
  'Welspun India': { hq: 'Mumbai', ceo: 'Dipali Goenka', founded: '1985', type: 'Welspun Group (Public)', plants: 'World\'s 2nd largest terry towel manufacturer. Plants in Gujarat (Anjar), 250M+ towels/year. Home textiles exported to 50+ countries', expansion: 'Flooring business (Rs 2,000 Cr target). Advanced textiles (hygiene, healthcare). Spun pipe division. Domestic brand "Spaces" scaling up.', moat: 'Walmart #1 supplier for towels. Licensed brands (Martha Stewart, Christy). Scale advantage: fully integrated from yarn to finished goods. 70%+ exports to USA/EU.' },
  'Vardhman Textiles': { hq: 'Ludhiana', ceo: 'Neeraj Jain (MD)', founded: '1965', type: 'Oswal Family (Public)', plants: '24 manufacturing plants across 5 states. India largest yarn manufacturer (480K spindles). Cotton + acrylic + blended yarn', expansion: 'Fabric division growing 20%+. Weaving capacity doubling. Sustainable cotton sourcing (BCI). Solar-powered plants (35MW).', moat: '#1 yarn manufacturer in India. Vertically integrated (ginning to finished fabric). Scale cost advantage. Relationships with top global brands. Zero-debt company.' },
  'Page Industries': { hq: 'Bangalore', ceo: 'V.S. Ganesh', founded: '1994', type: 'Genomal Family (Public)', plants: 'Exclusive Jockey licensee for India. 20+ factories in Karnataka, Tamil Nadu. 100K+ retail outlets. Speedo swimwear licensee', expansion: 'Athleisure segment expansion. Women\'s innerwear (fastest growing). Tier 2/3 city distribution push. E-commerce channel growing 30%+.', moat: 'Exclusive Jockey license for India/SE Asia. 80%+ ROCE (highest in textile sector). Premium brand positioning. 55%+ market share in premium innerwear. Direct distribution to 100K+ outlets.' },
}

const geographyData = [
  { state: 'Tamil Nadu (Coimbatore/Tirupur)', share: 22, reason: 'India\'s textile capital. Tirupur = $5B knitwear/garment exports hub (40%+ of India garment exports). Coimbatore = spinning capital (40% of India spindle capacity). 3,000+ textile units. SEZs and SIPCOT parks.' },
  { state: 'Gujarat (Ahmedabad/Surat)', share: 20, reason: 'Surat = synthetic/polyester capital (40M meters/day). Ahmedabad = denim & cotton textile hub (Arvind HQ). World\'s largest man-made fabric cluster. 800+ powerloom units in Surat alone.' },
  { state: 'Maharashtra (Mumbai/Bhiwandi)', share: 12, reason: 'Mumbai = fashion & design capital + brand HQs (Raymond, Welspun, Bombay Dyeing). Bhiwandi = powerloom cluster (1M+ looms). Ichalkaranji = southern Maharashtra weaving hub.' },
  { state: 'Karnataka (Bangalore)', share: 8, reason: 'Bangalore = premium garment manufacturing (Page Industries, Arvind brands). Silk production (Mysore silk). Garment exports hub. IT-enabled fashion design services.' },
  { state: 'Punjab (Ludhiana)', share: 8, reason: 'Ludhiana = hosiery & knitwear capital of North India. Vardhman HQ. Woolen textiles, shawls, ready-made garments. 12,000+ manufacturing units. $3B annual textile output.' },
  { state: 'Rajasthan (Bhilwara)', share: 7, reason: 'Bhilwara = India\'s textile city (synthetic suiting capital). 600+ textile mills. Polyester-viscose blended fabrics exported globally. RSWM, BSL, Sangam India headquartered here.' },
  { state: 'UP (Varanasi/Kanpur)', share: 6, reason: 'Varanasi = Banarasi silk sarees (GI tag). Kanpur = leather & cotton. Handloom heritage cluster. Government handloom promotion schemes driving growth.' },
  { state: 'West Bengal (Jute/Handloom)', share: 5, reason: 'India\'s jute capital (90% of jute production). Mandatory jute packaging for grains. Murshidabad silk. Tant cotton sarees. 40+ jute mills along Hooghly river.' },
  { state: 'Others', share: 12, reason: 'MP (Indore - cotton spinning), Telangana (Warangal handloom), AP (Guntur cotton), J&K (Pashmina), Assam (Muga silk). Emerging clusters with government support.' },
]

const newsData = [
  { title: 'PLI Scheme for textiles: Rs 10,683 Cr approved, 40+ companies invest in MMF & technical textiles', date: '2025-01-18', sentiment: 'positive', source: 'Ministry of Textiles' },
  { title: 'Cotton prices surge 15% on lower crop estimates; spinning mills squeezed on margins', date: '2025-01-12', sentiment: 'negative', source: 'Cotton Association of India' },
  { title: 'Tirupur garment exports cross Rs 35,000 Cr milestone; China+1 orders accelerate', date: '2024-12-28', sentiment: 'positive', source: 'TEA (Tirupur Exporters)' },
  { title: 'India mandates sustainability compliance for textile exports to EU under CBAM alignment', date: '2024-12-20', sentiment: 'neutral', source: 'DGFT Notification' },
  { title: 'Reliance-Shein JV to disrupt India fast fashion market; local sourcing from Surat/Tirupur', date: '2024-12-15', sentiment: 'positive', source: 'Economic Times' },
  { title: 'Bangladesh political crisis diverts $2B garment orders to India; Noida and Bangalore gain', date: '2024-12-10', sentiment: 'positive', source: 'AEPC' },
  { title: 'Water scarcity in Tamil Nadu dyeing clusters forces 200+ units to reduce capacity 30%', date: '2024-12-05', sentiment: 'negative', source: 'Business Standard' },
  { title: 'Technical textiles market crosses $25B; geotextiles mandatory in all NHAI road projects', date: '2024-11-28', sentiment: 'positive', source: 'NHAI/MoT' },
]

const riskData = {
  insurable: [
    { risk: 'Factory Fire (Cotton Godowns)', severity: 'Critical', frequency: 'High', desc: 'Cotton bales highly combustible. Lint accumulation in spinning frames. Godown fires cause Rs 50-500 Cr losses. Bhiwandi/Surat clusters most vulnerable. Electrical short circuits in powerlooms.' },
    { risk: 'Raw Material Volatility', severity: 'High', frequency: 'Very High', desc: 'Cotton prices fluctuate 30-40% annually. Polyester linked to crude oil. Currency impact on imported fibers. Average margin squeeze of 5-8% during price spikes. Contract farming failures.' },
    { risk: 'Labor Strike/Unrest', severity: 'High', frequency: 'Medium', desc: '45M+ workers, largely unorganized. Minimum wage hikes, bonus disputes, seasonal labor shortage. Tirupur/Ludhiana clusters prone. Average production loss 15-30 days per event.' },
    { risk: 'Water Contamination (Dyeing Effluent)', severity: 'Critical', frequency: 'Medium', desc: 'Dyeing/processing units generate toxic effluent. NGT/CPCB closure orders (Tirupur 2011, Panipat 2019). Zero Liquid Discharge (ZLD) mandate costs Rs 2-10 Cr per unit.' },
    { risk: 'Export Order Cancellation', severity: 'High', frequency: 'Medium', desc: 'Global recession, buyer bankruptcy (eg. UK retailers), quality rejections. Average cancellation impact Rs 10-50 Cr per large order. LC payment disputes with overseas buyers.' },
    { risk: 'Machinery Breakdown', severity: 'High', frequency: 'High', desc: 'Spinning frames, power looms, knitting machines run 24/7. Boiler explosions in dyeing. Average downtime loss Rs 5-20 Lakh/day. Imported spare parts delay 30-60 days.' },
  ],
  products: ['Property All Risks', 'Business Interruption', 'Marine Cargo', 'Workers Compensation', 'Product Liability', 'Boiler & Pressure Plant', 'Environmental Liability'],
  addons: ['Cotton bale spontaneous combustion', 'Dyeing effluent treatment plant failure', 'Boiler explosion in processing units', 'Power loom breakdown (serial loss)', 'Spinning frame fire (lint accumulation)', 'Garment rejection/buyer penalty cover', 'Fashion obsolescence stock write-off', 'Water shortage (dyeing operations)', 'Chemical storage fire & spill', 'Export LC cancellation cover', 'Labor welfare fund liability', 'Embroidery/knitting machine serial loss', 'Fabric testing failure recall cover', 'Currency fluctuation hedging loss', 'Seasonal inventory build-up cover'],
}

const caseStudies = [
  { title: 'Mandhana Industries Fire (Bhiwandi 2019)', loss: 'Rs 200 Cr+', type: 'Property/Fire', detail: 'Massive warehouse fire in Bhiwandi textile cluster destroyed cotton bale godown and finished garment inventory worth Rs 200 Cr+. Fire spread across 50,000 sq ft in 2 hours due to cotton combustibility. Inadequate fire suppression systems. 3 workers killed. Insurance claim disputed on stock valuation. Led to mandatory fire NOC compliance drive in Bhiwandi cluster. Property All Risk + Stock Throughput policies activated. Industry-wide fire safety audit ordered by Maharashtra Government.' },
  { title: 'Tirupur Dyeing Units Closure (NGT 2011-2020)', loss: 'Rs 5,000 Cr cumulative', type: 'Environmental/Regulatory', detail: 'National Green Tribunal ordered closure of 700+ dyeing and bleaching units in Tirupur for polluting Noyyal River. Zero Liquid Discharge (ZLD) mandate imposed. 9-year compliance journey cost Rs 3,000 Cr in ZLD infrastructure. Production loss Rs 5,000 Cr cumulative. 100,000+ jobs affected. Units that invested in ZLD early (Rs 2-10 Cr each) survived; 200+ units permanently closed. Landmark environmental liability case. Led to Environmental Liability insurance products for textile sector.' },
  { title: 'Welspun India Thread Count Fraud (2016)', loss: 'Rs 700 Cr impact', type: 'Product Liability/Brand', detail: 'Target and Walmart discovered Welspun India supplied Egyptian cotton bed sheets that were actually non-Egyptian cotton. Contracts worth $90M (Rs 700 Cr) cancelled. Stock crashed 50% in one week. CEO resigned. Company spent Rs 100 Cr+ on quality compliance overhaul, traceability systems (DNA-based fiber testing). Product Liability + D&O claims triggered. Rebuilt trust over 3 years through blockchain-based supply chain transparency. Revenue recovered by 2019.' },
]

// ===== MAIN COMPONENT =====
export default function TextileDashboard() {
  const [activeTab, setActiveTab] = useState<TextileTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'
  const tabs: { id: TextileTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Industry Overview', icon: Gauge },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
  ]
  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50"><div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between"><div className="flex items-center gap-4"><button onClick={() => navigate('/hub')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"><ArrowLeft size={14} /> Back to Hub</button><div className="h-6 w-px bg-gray-200"></div><div className="flex items-center gap-3"><img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-8" /><div><h1 className="text-sm font-extrabold text-navy">Textile & Apparel</h1><p className="text-[10px] text-gray-500 font-medium">ICICI Lombard | Risk & Analytics</p></div></div></div><div className="flex items-center gap-3">{isAdmin && <button className="flex items-center gap-1 px-3 py-1.5 bg-orange/10 text-orange rounded-lg text-xs font-bold"><Settings size={13} /> Admin</button>}<button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 bg-navy/5 text-navy rounded-lg text-xs font-semibold hover:bg-navy/10 transition"><Download size={13} /> Export</button><div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">{isAdmin ? <Shield size={13} className="text-maroon" /> : <User size={13} className="text-navy" />}<span className="text-xs font-bold">{username}</span></div></div></div></header>
      <nav className="bg-white border-b border-gray-100 sticky top-[48px] z-40 shadow-sm"><div className="max-w-[1920px] mx-auto px-6"><div className="flex items-center gap-1 py-2 overflow-x-auto">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}><tab.icon size={14} /> {tab.label}</button>))}</div></div></nav>
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="textile" />}
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
      <div className="relative bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><Shirt size={20} className="text-purple-200" /><span className="text-[10px] font-semibold text-purple-200 uppercase tracking-wide">India's Textile & Apparel Sector</span></div>
          <h2 className="text-2xl font-black">#2 Global Textile Employer & Producer</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">$250B industry | $44B exports | 45M direct jobs | 4% of GDP | 13% of manufacturing</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={250} />B</div><div className="text-[10px] text-white/70 mt-0.5">Industry Size</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">#<AnimatedCounter end={2} /></div><div className="text-[10px] text-white/70 mt-0.5">Global (Employment)</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={44} />B</div><div className="text-[10px] text-white/70 mt-0.5">Exports</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={45} />M</div><div className="text-[10px] text-white/70 mt-0.5">Direct Jobs</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={4} />%</div><div className="text-[10px] text-white/70 mt-0.5">of GDP</div></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={72} label="Textile Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Textile Market Size ($B, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India ranks #2 globally by employment, #2 by production value</p>
          <ResponsiveContainer width="100%" height={300}><BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="B" /><YAxis dataKey="country" type="category" fontSize={10} width={80} /><Tooltip formatter={(v: number) => `$${v}B`} /><Bar dataKey="revenue" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'China' ? '#B02A30' : '#7c3aed'} />)}<LabelList dataKey="revenue" position="right" fontSize={9} formatter={(v: number) => `$${v}B`} /></Bar></BarChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: Ministry of Textiles, IBEF, Wazir Advisors 2024-25</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India Textile Industry Growth ($B)</h3>
          <p className="text-xs text-gray-500 mb-3">Production + Export revenue streams (P = Projected)</p>
          <ResponsiveContainer width="100%" height={300}><LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} /><Tooltip /><Legend /><Line type="monotone" dataKey="production" name="Total Production ($B)" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4 }} /><Line type="monotone" dataKey="exports" name="Exports ($B)" stroke="#0369a1" strokeWidth={2} dot={{ r: 4 }} /></LineChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: CITI, AEPC, Ministry of Textiles Annual Reports</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Textile Segment Split</h3>
        <p className="text-xs text-gray-500 mb-3">Click any segment for details</p>
        <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split(' ')[0]} ${value}%`} labelLine={false} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: Ministry of Textiles, CITI 2024</p>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p><div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#7c3aed] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">PLI Scheme Push</div><p className="text-xs text-gray-700">Rs 10,683 Cr PLI for MMF & Technical Textiles. 40+ companies approved. Target: $10B incremental investment and 7.5 lakh new jobs by 2030.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">China+1 Beneficiary</div><p className="text-xs text-gray-700">Global brands diversifying from China. India gaining $2-4B annually in garment/home textile orders. Bangladesh instability further benefiting India.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Cotton→MMF Shift</div><p className="text-xs text-gray-700">India's cotton dominance (70%) shifting toward MMF (currently 25% vs global 75%). Polyester/viscose investments growing 15%+ to match global fiber mix.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Technical Textiles</div><p className="text-xs text-gray-700">$25B market growing 15%+ CAGR. Government mandates for geotextiles, meditech. Import substitution opportunity of $10B+. Highest value-add segment.</p></div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: Ministry of Textiles, CITI, AEPC, Company Annual Reports</p>
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
      {selectedPlayer && selected && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3><button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div></div><div className="space-y-3"><div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Plants & Network</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div><div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion Plans</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div><div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 15 Textile & Apparel Companies</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for detailed profile</p>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (Cr)</th><th className="text-center py-2 px-2 font-bold text-navy">Exports %</th><th className="text-center py-2 px-2 font-bold text-navy">Segment</th><th className="text-left py-2 px-2 font-bold text-navy">Key Brands</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-purple-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right">₹{p.revenue.toLocaleString()}</td><td className="py-2.5 px-2 text-center font-semibold text-purple-600">{p.exports}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold">{p.segment}</span></td><td className="py-2.5 px-2 text-[10px] max-w-[180px] truncate">{p.brands}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View</span></td></tr>))}</tbody></table></div>
        <p className="text-[9px] text-gray-400 mt-3">Source: Company Annual Reports, BSE/NSE, CITI 2024-25</p>
      </div>
    </div>
  )
}

// ===== RISK TAB =====
function RiskTab() {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'cases'>('insurable')
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">{(['insurable', 'cases'] as const).map(t => (<button key={t} onClick={() => setRiskSubTab(t)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${riskSubTab === t ? 'bg-maroon text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t === 'insurable' ? 'Insurable Risks' : 'Case Studies & Best Practices'}</button>))}</div>
      {riskSubTab === 'insurable' && (<>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Key Insurable Risks — Textile & Apparel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{riskData.insurable.map((r, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-navy">{r.risk}</span><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${r.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{r.severity}</span></div><p className="text-[10px] text-gray-600">{r.desc}</p><div className="mt-2 text-[9px] text-gray-400">Frequency: {r.frequency}</div></div>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Insurance Products for Textiles</h3>
          <div className="flex flex-wrap gap-2">{riskData.products.map((p, i) => (<span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-800 rounded-lg text-xs font-semibold border border-purple-100">{p}</span>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Industry-Specific Add-Ons & Endorsements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">{riskData.addons.map((a, i) => (<div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"><CheckCircle2 size={12} className="text-green-600 shrink-0" /><span className="text-xs text-gray-700">{a}</span></div>))}</div>
          <p className="text-[9px] text-gray-400 mt-3">Source: IRDAI, GIC Re, Textile Industry Risk Reports</p>
        </div>
      </>)}
      {riskSubTab === 'cases' && (<>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Landmark Case Studies</h3>
          <p className="text-xs text-gray-500 mb-4">Click for full details</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{caseStudies.map((c, i) => (<div key={i} onClick={() => setSelectedCase(i)} className="p-4 border border-gray-100 rounded-xl hover:shadow-lg cursor-pointer transition hover:border-maroon/30"><div className="flex items-center gap-2 mb-2"><AlertTriangle size={14} className="text-red-500" /><span className="text-[9px] font-bold text-red-600 uppercase">{c.type}</span></div><h4 className="text-sm font-bold text-navy mb-1">{c.title}</h4><div className="text-lg font-black text-maroon">{c.loss}</div><p className="text-[10px] text-gray-500 mt-1">Click for full analysis →</p></div>))}</div>
        </div>
        {selectedCase !== null && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{caseStudies[selectedCase].title}</h3><button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="flex items-center gap-3 mb-4"><span className="text-[9px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">{caseStudies[selectedCase].type}</span><span className="text-sm font-black text-maroon">{caseStudies[selectedCase].loss}</span></div><p className="text-xs text-gray-700 leading-relaxed">{caseStudies[selectedCase].detail}</p></div></div>)}
        <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-green-600 border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-navy mb-3">Best Practices & Risk Mitigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Fire Prevention</div><p className="text-xs text-gray-700">Automated sprinkler systems in cotton godowns. Lint extraction systems on spinning frames. Electrical audits quarterly. No-smoking zones enforced. Fire drills monthly.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Environmental Compliance</div><p className="text-xs text-gray-700">Zero Liquid Discharge (ZLD) plants mandatory for dyeing. CETP memberships. Real-time effluent monitoring. Green chemistry adoption reducing water use 40%.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Quality Assurance</div><p className="text-xs text-gray-700">DNA-based fiber traceability (post-Welspun). Third-party testing at source. Global certifications (OEKO-TEX, GOTS). Buyer audit compliance programs.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Supply Chain Hedging</div><p className="text-xs text-gray-700">Cotton futures hedging on MCX. Multi-fiber sourcing (cotton + polyester + viscose). Long-term supplier contracts. Buffer stock maintenance of 30-45 days.</p></div>
          </div>
        </div>
      </>)}
    </div>
  )
}

// ===== GEOGRAPHY TAB =====
function GeographyTab() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Textile Production Share</h3>
        <p className="text-xs text-gray-500 mb-4">Click "Why?" for detailed cluster analysis</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{geographyData.map((g, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-navy">{g.state}</span><span className="text-lg font-black text-maroon">{g.share}%</span></div><div className="w-full bg-gray-100 rounded-full h-2 mb-2"><div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700" style={{ width: `${(g.share / 22) * 100}%` }}></div></div><button onClick={() => setSelectedState(g.state)} className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-lg hover:bg-purple-100 transition">Why? →</button></div>))}</div>
        <p className="text-[9px] text-gray-400 mt-3">Source: Ministry of Textiles, CITI, State Industrial Reports 2024</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Textile Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100"><div className="text-sm font-bold text-purple-800 mb-1">Southern Belt</div><div className="text-2xl font-black text-purple-900">35%</div><p className="text-[10px] text-purple-700 mt-1">Tamil Nadu spinning + knitwear hub. Coimbatore-Tirupur-Erode corridor. Garment exports leader. Largest integrated cluster.</p></div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100"><div className="text-sm font-bold text-blue-800 mb-1">Western Belt</div><div className="text-2xl font-black text-blue-900">35%</div><p className="text-[10px] text-blue-700 mt-1">Gujarat weaving + processing. Surat synthetics cluster. Mumbai fashion capital. Bhilwara suiting. Largest fabric production zone.</p></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100"><div className="text-sm font-bold text-green-800 mb-1">Northern Belt</div><div className="text-2xl font-black text-green-900">20%</div><p className="text-[10px] text-green-700 mt-1">Punjab hosiery + woolen. Panipat home textiles. Ludhiana knitwear. Varanasi silk. Traditional handloom heritage zones.</p></div>
        </div>
      </div>
      {selectedState && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Why {selectedState}?</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><div className="text-center"><div className="text-2xl font-black text-maroon">{geographyData.find(g => g.state === selectedState)?.share}%</div><div className="text-[10px] text-gray-500">Textile Production Share</div></div></div><p className="text-sm text-gray-700 leading-relaxed">{geographyData.find(g => g.state === selectedState)?.reason}</p></div></div>)}
    </div>
  )
}

// ===== NEWS TAB =====
function NewsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Latest Textile & Apparel Industry News</h3>
        <div className="space-y-3">{newsData.map((n, i) => (<div key={i} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-sm transition"><div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.sentiment === 'positive' ? 'bg-green-500' : n.sentiment === 'negative' ? 'bg-red-500' : 'bg-amber-500'}`}></div><div className="flex-1"><h4 className="text-sm font-bold text-navy">{n.title}</h4><div className="flex items-center gap-3 mt-1"><span className="text-[10px] text-gray-400">{n.date}</span><span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{n.source}</span><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${n.sentiment === 'positive' ? 'bg-green-50 text-green-700' : n.sentiment === 'negative' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{n.sentiment}</span></div></div></div>))}</div>
      </div>
    </div>
  )
}
