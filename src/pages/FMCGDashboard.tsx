import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, ShoppingCart
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, LabelList
} from 'recharts'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'

const COLORS = ['#d97706', '#B02A30', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#0369a1']

type FMCGTab = 'overview' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot'

// ===== DATA =====
const segmentData = [
  { name: 'Food & Beverages', value: 45, color: '#d97706' },
  { name: 'Personal Care', value: 25, color: '#B02A30' },
  { name: 'Household Care', value: 15, color: '#F99D27' },
  { name: 'Healthcare/OTC', value: 10, color: '#4CAF50' },
  { name: 'Others', value: 5, color: '#9C27B0' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Food & Beverages': { subtypes: [{ name: 'Packaged Snacks', share: '30%' }, { name: 'Dairy Products', share: '25%' }, { name: 'Staples (Atta/Rice/Oil)', share: '20%' }, { name: 'Beverages (Tea/Coffee/Juices)', share: '15%' }, { name: 'Confectionery', share: '10%' }], desc: 'Largest FMCG segment at $99B. Driven by rising packaged food adoption (only 10% penetration vs 60% in USA). Dairy is fastest growing sub-segment at 14% CAGR. Health & wellness foods growing 20%+.' },
  'Personal Care': { subtypes: [{ name: 'Hair Care (Shampoo/Oil)', share: '30%' }, { name: 'Skin Care & Cosmetics', share: '25%' }, { name: 'Oral Care', share: '20%' }, { name: 'Fragrances & Deodorants', share: '15%' }, { name: 'Men Grooming', share: '10%' }], desc: '$55B market growing 12% CAGR. Premiumisation driving ASP increase. Ayurvedic/Natural segment (Patanjali, Mamaearth) growing 25%+. D2C brands capturing 8% share.' },
  'Household Care': { subtypes: [{ name: 'Fabric Care (Detergents)', share: '40%' }, { name: 'Dish Wash', share: '20%' }, { name: 'Surface Cleaners', share: '15%' }, { name: 'Air Fresheners', share: '10%' }, { name: 'Insecticides', share: '15%' }], desc: '$33B market. Post-COVID hygiene awareness boosted growth to 15%+. Liquid detergents replacing powder (20% CAGR). Godrej & HUL dominate with 60%+ combined share.' },
  'Healthcare/OTC': { subtypes: [{ name: 'OTC Medicines', share: '35%' }, { name: 'Health Supplements', share: '25%' }, { name: 'Ayurvedic Products', share: '20%' }, { name: 'Sanitizers & Hygiene', share: '10%' }, { name: 'Baby Care', share: '10%' }], desc: '$22B segment growing fastest at 16% CAGR. Immunity products boomed post-COVID. Chyawanprash, protein supplements mainstream. Dabur and Emami lead traditional healthcare.' },
  'Others': { subtypes: [{ name: 'Stationery', share: '30%' }, { name: 'Batteries', share: '25%' }, { name: 'Matchboxes/Lighters', share: '20%' }, { name: 'Pet Care', share: '15%' }, { name: 'Miscellaneous', share: '10%' }], desc: '$11B niche segment. Pet care is fastest emerging sub-category (30% CAGR). Batteries driven by rural demand (torches, remotes). Stationery faces digital disruption.' },
}

const globalComparison = [
  { country: 'USA', revenue: 900 }, { country: 'China', revenue: 650 }, { country: 'Japan', revenue: 300 },
  { country: 'Germany', revenue: 200 }, { country: 'India', revenue: 220 }, { country: 'UK', revenue: 180 },
  { country: 'France', revenue: 150 }, { country: 'Brazil', revenue: 120 },
]

const timelineData = [
  { year: '2010', market: 35 }, { year: '2013', market: 50 }, { year: '2015', market: 70 },
  { year: '2017', market: 95 }, { year: '2019', market: 120 }, { year: '2020', market: 110 },
  { year: '2022', market: 160 }, { year: '2024', market: 220 }, { year: '2027P', market: 350 },
  { year: '2030P', market: 500 },
]

const playersData = [
  { rank: 1, name: 'HUL', revenue: 60580, marketCap: 570000, brands: 'Surf, Dove, Lux, Rin, Knorr', reach: '9M outlets' },
  { rank: 2, name: 'ITC', revenue: 70920, marketCap: 540000, brands: 'Aashirvaad, Sunfeast, Bingo, Classmate', reach: '6M outlets' },
  { rank: 3, name: 'Nestle India', revenue: 19126, marketCap: 230000, brands: 'Maggi, Nescafe, KitKat, Cerelac', reach: '5.2M outlets' },
  { rank: 4, name: 'Britannia', revenue: 16580, marketCap: 120000, brands: 'Good Day, Marie Gold, NutriChoice', reach: '7.4M outlets' },
  { rank: 5, name: 'Dabur', revenue: 11530, marketCap: 95000, brands: 'Real, Vatika, Hajmola, Dabur Honey', reach: '7.5M outlets' },
  { rank: 6, name: 'Godrej Consumer', revenue: 14230, marketCap: 118000, brands: 'Cinthol, Good Knight, HIT, Godrej No.1', reach: '5M outlets' },
  { rank: 7, name: 'Marico', revenue: 9764, marketCap: 78000, brands: 'Parachute, Saffola, Livon, Set Wet', reach: '5.5M outlets' },
  { rank: 8, name: 'Colgate-Palmolive', revenue: 5680, marketCap: 72000, brands: 'Colgate, Palmolive, MaxFresh', reach: '6.5M outlets' },
  { rank: 9, name: 'P&G India', revenue: 16120, marketCap: 55000, brands: 'Tide, Gillette, Head&Shoulders, Whisper', reach: '4M outlets' },
  { rank: 10, name: 'Tata Consumer', revenue: 15380, marketCap: 105000, brands: 'Tata Tea, Tata Salt, Sampann, Soulfull', reach: '4.2M outlets' },
  { rank: 11, name: 'Adani Wilmar', revenue: 51550, marketCap: 42000, brands: 'Fortune (oil, rice, atta)', reach: '3.5M outlets' },
  { rank: 12, name: 'Emami', revenue: 3640, marketCap: 24000, brands: 'Navratna, BoroPlus, Zandu, Fair & Handsome', reach: '4.8M outlets' },
  { rank: 13, name: 'Parle Products', revenue: 45000, marketCap: 0, brands: 'Parle-G, Hide&Seek, Frooti, Appy', reach: '7M outlets' },
  { rank: 14, name: 'Amul (GCMMF)', revenue: 72000, marketCap: 0, brands: 'Amul Milk, Butter, Cheese, Ice Cream', reach: '10M+ outlets' },
  { rank: 15, name: 'Patanjali', revenue: 30000, marketCap: 0, brands: 'Dant Kanti, Kesh Kanti, Atta, Ghee', reach: '5M outlets' },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'HUL': { hq: 'Mumbai', ceo: 'Rohit Jawa', founded: '1933', type: 'Unilever subsidiary (Public)', plants: '30+ factories across India. 9M direct retail reach. 45+ brands across personal care, home care, foods', expansion: 'Premiumisation push (Dove, TRESemme, Dermalogica). Digital-first brands. Direct distribution expansion to 4M+ stores. Sustainability targets: plastic-neutral by 2025.', moat: 'India largest FMCG. Unilever R&D and global playbook. 9M outlet reach = deepest in India. Portfolio across every price point (Rs 1 sachet to Rs 1,000 premium). Brand recall unmatched.' },
  'ITC': { hq: 'Kolkata', ceo: 'Sanjiv Puri', founded: '1910', type: 'Multi-business conglomerate (Public)', plants: '80+ factories. 6M outlets. Hotels, Paper, Agri-business, IT cross-subsidize FMCG growth', expansion: 'FMCG to become largest revenue segment (overtaking cigarettes). D2C push with ITC Store. Health & wellness range. Rs 1L Cr FMCG revenue target by 2030.', moat: 'Cash cow cigarettes fund FMCG growth. Strongest agri-sourcing (e-Choupal). Own manufacturing at scale. ITC brand trust across categories. 25%+ EBITDA margins in FMCG improving rapidly.' },
  'Nestle India': { hq: 'Gurugram', ceo: 'Suresh Narayanan', founded: '1961', type: 'Nestle SA subsidiary (Public)', plants: '9 factories in India. 5.2M direct outlet reach. Focus on nutrition, health, wellness', expansion: 'New categories (pet food, plant-based). Out-of-home channel expansion. Rural penetration (only 25% currently). New factory in Sanand, Gujarat.', moat: 'Maggi = 60%+ instant noodle share (survived 2015 ban). Nescafe = 50%+ coffee share. R&D spend highest in Indian FMCG. Premium pricing power. Trust on nutrition/baby food.' },
  'Britannia': { hq: 'Bangalore', ceo: 'Varun Berry', founded: '1892', type: 'Wadia Group (Public)', plants: '14 factories + 80 contract manufacturers. 7.4M outlets. India largest biscuit company', expansion: 'Adjacent categories: dairy, bread, croissants, cakes. International expansion (Middle East, Africa). Smart food launches. New Rs 1,000 Cr dairy plant.', moat: '33%+ biscuit market share. Good Day, Marie Gold household names. 7.4M outlet reach (second only to HUL). Highest EBITDA margins in food FMCG (18%+). Innovation speed (50+ launches/year).' },
  'Tata Consumer': { hq: 'Mumbai', ceo: 'Sunil D\'Souza', founded: '1962', type: 'Tata Group (Public)', plants: '35+ plants. Tata Tea #1 brand, Tata Salt #1 branded salt. Starbucks JV. Acquired Soulfull, Capital Foods', expansion: 'Portfolio consolidation post-merger (Tata Coffee + Tata Consumer). New categories (NourishCo beverages, ready-to-cook). Sampann pulses/spices rural push.', moat: 'Tata brand trust premium. #1 tea company (25% share). Salt monopoly (Tata Salt). Starbucks India JV (400+ stores). Distribution synergy with Tata Group ecosystem.' },
}

const geographyData = [
  { state: 'Maharashtra', share: 18, reason: 'India largest consumer market. Mumbai = HQ of HUL, Godrej, Marico, Tata Consumer. High urban density, highest per-capita FMCG spend. 140M population with 50% urbanization.' },
  { state: 'Uttar Pradesh', share: 12, reason: 'India most populous state (240M). Massive rural FMCG demand. Key for sachet/LUP strategy. Growing modern trade in Lucknow, Noida, Varanasi. Largest absolute rural consumer base.' },
  { state: 'Gujarat', share: 10, reason: 'High per-capita income. Amul HQ state. Strong cooperative movement (dairy, oil). Morbi-Rajkot industrial belt. Premium product adoption high. Modern trade penetration 15%+.' },
  { state: 'Tamil Nadu', share: 9, reason: 'Highest literacy = brand-conscious consumers. Chennai = HUL/Colgate southern hub. Strong MT presence (Spencer, Reliance). Rural electrification drives appliance-linked FMCG.' },
  { state: 'Karnataka', share: 8, reason: 'Bangalore = premium FMCG testbed city. IT workforce drives premiumisation. Britannia HQ. D2C brands target Karnataka first. Highest e-grocery penetration.' },
  { state: 'West Bengal', share: 7, reason: 'Kolkata = ITC/Emami HQ. 100M population. Strong hair oil and personal care market. Regional brands (Jyothy Labs). Tea consumption highest per capita.' },
  { state: 'Rajasthan', share: 7, reason: 'Large rural population. Mustard oil capital (Fortune brand). Growing sachet economy. Desert climate drives skin care demand. 80M consumers.' },
  { state: 'AP/Telangana', share: 7, reason: 'Combined 85M population. Hyderabad = growing metro. Heritage Foods (dairy). Hair oil and coconut oil belt. Modern trade expanding in Tier 2 cities.' },
  { state: 'Delhi NCR', share: 6, reason: 'Highest per-capita spend on FMCG. Premium/imported brands hub. E-commerce highest penetration (25%+). Quick commerce capital (Blinkit, Zepto). Modern trade 30%+.' },
]

const newsData = [
  { title: 'HUL announces 5-8% price hikes across soaps, detergents on palm oil surge', date: '2025-01-18', sentiment: 'negative', source: 'Economic Times' },
  { title: 'ITC completes hotel business demerger; FMCG now 45% of revenue', date: '2025-01-12', sentiment: 'positive', source: 'Mint' },
  { title: 'D2C brands Mamaearth, Wow cross Rs 1,000 Cr revenue milestone', date: '2024-12-28', sentiment: 'positive', source: 'Inc42' },
  { title: 'Rural FMCG demand recovers: volume growth turns positive after 6 quarters', date: '2024-12-20', sentiment: 'positive', source: 'Nielsen IQ' },
  { title: 'Quick commerce (Blinkit, Zepto) disrupts general trade; FMCG companies restructure', date: '2024-12-15', sentiment: 'neutral', source: 'Business Standard' },
  { title: 'FSSAI tightens labeling norms: all packaged food to show sugar/salt front-of-pack', date: '2024-12-10', sentiment: 'negative', source: 'FSSAI Gazette' },
  { title: 'Reliance Consumer Products crosses Rs 10,000 Cr in 2 years; disrupts pricing', date: '2024-12-05', sentiment: 'neutral', source: 'Moneycontrol' },
  { title: 'India FMCG e-commerce crosses 10% share for first time; Amazon, Flipkart lead', date: '2024-11-28', sentiment: 'positive', source: 'Kantar Worldpanel' },
]

const riskData = {
  insurable: [
    { risk: 'Supply Chain Disruption', severity: 'Critical', frequency: 'High', desc: 'Commodity price volatility (palm oil, wheat, milk). Import dependency for packaging. Port congestion affecting raw materials. Average impact Rs 50-500 Cr per quarter.' },
    { risk: 'Product Contamination/Recall', severity: 'Critical', frequency: 'Medium', desc: 'Adulteration, foreign objects in packaged food, pesticide residues. FSSAI-mandated recalls. Brand damage + legal costs. Maggi-type event can cost Rs 500 Cr+.' },
    { risk: 'Warehouse Fire', severity: 'High', frequency: 'Medium', desc: 'Large distribution centers store Rs 100-500 Cr inventory. Flammable packaging materials. Electrical short circuits. Summer peak risk. Fire brigade response time in industrial areas.' },
    { risk: 'Counterfeit Products', severity: 'High', frequency: 'Very High', desc: '25% of FMCG in rural India is counterfeit/lookalike. Revenue loss Rs 15,000-20,000 Cr/year industry-wide. Consumer safety risk from spurious products.' },
    { risk: 'FSSAI Regulatory Action', severity: 'High', frequency: 'Medium', desc: 'License cancellation, product bans, mandatory recalls. Labeling non-compliance. Penalty up to Rs 10 Lakh per offense + criminal prosecution for adulteration.' },
    { risk: 'Climate/Agricultural Risk', severity: 'High', frequency: 'High', desc: 'Crop failures affect input costs (wheat, sugar, milk). Flood damage to warehouses. Heat waves affect product shelf life. Drought impacts rural demand.' },
  ],
  products: ['Property All Risks', 'Business Interruption', 'Product Liability', 'Product Recall', 'Marine Cargo', 'D&O Liability', 'Cyber Insurance', 'Workers Compensation'],
  addons: ['Cold chain failure cover', 'Stock deterioration (perishables)', 'Brand protection/counterfeit defense', 'FSSAI penalty defense costs', 'Advertising injury liability', 'Consumer complaints liability', 'Seasonal stock fluctuation cover', 'Distribution center fire (enhanced)', 'Packaging defect recall costs', 'Contract farming crop failure', 'E-commerce delivery damage', 'Influencer/celebrity liability', 'Contamination & adulteration buyback', 'Transit temperature excursion', 'Product expiry/shelf-life loss'],
}

const caseStudies = [
  { title: 'Maggi Noodles Ban (2015)', loss: 'Rs 450 Cr+', type: 'Product Recall', detail: 'FSSAI found lead and MSG beyond permissible limits in Maggi samples. Nationwide ban for 5 months. Nestle destroyed 37,000 tonnes of stock worth Rs 320 Cr. Lost Rs 130 Cr in revenue during ban period. Market share dropped from 77% to 0% overnight, recovered to 60% in 18 months. Product liability + recall insurance activated. Brand trust rebuilt through "Maggi is safe" campaign. Landmark case for Product Recall insurance in India.' },
  { title: 'Johnson & Johnson Talc Controversy (2018-19)', loss: 'Rs 200 Cr+', type: 'Product Liability', detail: 'Asbestos contamination allegations in baby powder globally reached India. CDSCO (Indian drug regulator) ordered tests. Maharashtra FDA found samples "not of standard quality." J&J pulled talc-based baby powder from India market. Revenue loss Rs 200 Cr+. Replaced with cornstarch formula. D&O claims from shareholders. Consumer class action threats. Demonstrates global product liability cascade affecting India operations.' },
  { title: 'Bisleri-Tata Consumer Deal Collapse (2023)', loss: 'Rs 7,000 Cr deal failed', type: 'M&A / D&O Risk', detail: 'Tata Consumer agreed to acquire Bisleri for Rs 7,000 Cr. Deal collapsed after due diligence over valuation disputes and tax liabilities. Both parties incurred Rs 50-100 Cr in advisory/legal fees. Demonstrates D&O exposure in failed M&A. Representation & warranty insurance would have protected buyer. Transaction liability insurance increasingly relevant for FMCG acquisitions.' },
]

// ===== MAIN COMPONENT =====
export default function FMCGDashboard() {
  const [activeTab, setActiveTab] = useState<FMCGTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'
  const tabs: { id: FMCGTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Industry Overview', icon: Gauge },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
  ]
  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50"><div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between"><div className="flex items-center gap-4"><button onClick={() => navigate('/hub')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"><ArrowLeft size={14} /> Back to Hub</button><div className="h-6 w-px bg-gray-200"></div><div className="flex items-center gap-3"><img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-8" /><div><h1 className="text-sm font-extrabold text-navy">FMCG Industry</h1><p className="text-[10px] text-gray-500 font-medium">ICICI Lombard | Risk & Analytics</p></div></div></div><div className="flex items-center gap-3">{isAdmin && <button className="flex items-center gap-1 px-3 py-1.5 bg-orange/10 text-orange rounded-lg text-xs font-bold"><Settings size={13} /> Admin</button>}<button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 bg-navy/5 text-navy rounded-lg text-xs font-semibold hover:bg-navy/10 transition"><Download size={13} /> Export</button><div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">{isAdmin ? <Shield size={13} className="text-maroon" /> : <User size={13} className="text-navy" />}<span className="text-xs font-bold">{username}</span></div></div></div></header>
      <nav className="bg-white border-b border-gray-100 sticky top-[48px] z-40 shadow-sm"><div className="max-w-[1920px] mx-auto px-6"><div className="flex items-center gap-1 py-2 overflow-x-auto">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}><tab.icon size={14} /> {tab.label}</button>))}</div></div></nav>
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="fmcg" />}
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
      <div className="relative bg-gradient-to-r from-[#d97706] to-[#f59e0b] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><ShoppingCart size={20} className="text-amber-200" /><span className="text-[10px] font-semibold text-amber-200 uppercase tracking-wide">India's FMCG Sector</span></div>
          <h2 className="text-2xl font-black">4th Largest FMCG Market Globally</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">$220B market | 8-10% CAGR | 9M retail outlets | 36% rural share | 800+ brands</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={220} />B</div><div className="text-[10px] text-white/70 mt-0.5">Market Size</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">#<AnimatedCounter end={4} /></div><div className="text-[10px] text-white/70 mt-0.5">Global Rank</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={10} />%</div><div className="text-[10px] text-white/70 mt-0.5">CAGR</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={36} />%</div><div className="text-[10px] text-white/70 mt-0.5">Rural Share</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={9} />M</div><div className="text-[10px] text-white/70 mt-0.5">Retail Outlets</div></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={80} label="FMCG Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global FMCG Market Size ($B, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India ranks 4th globally, targeting $500B by 2030</p>
          <ResponsiveContainer width="100%" height={300}><BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="B" /><YAxis dataKey="country" type="category" fontSize={10} width={70} /><Tooltip formatter={(v: number) => `$${v}B`} /><Bar dataKey="revenue" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'USA' ? '#B02A30' : '#d97706'} />)}<LabelList dataKey="revenue" position="right" fontSize={9} formatter={(v: number) => `$${v}B`} /></Bar></BarChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: Nielsen, IBEF, Euromonitor 2024-25</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India FMCG Market Growth ($B)</h3>
          <p className="text-xs text-gray-500 mb-3">From $35B (2010) to $500B target (2030)</p>
          <ResponsiveContainer width="100%" height={300}><LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} /><Tooltip formatter={(v: number) => `$${v}B`} /><Legend /><Line type="monotone" dataKey="market" name="Market Size ($B)" stroke="#d97706" strokeWidth={2.5} dot={{ r: 4 }} /></LineChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: Kantar, Nielsen IQ, IBEF Reports</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">FMCG Segment Split</h3>
        <p className="text-xs text-gray-500 mb-3">Click any segment for details</p>
        <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split(' ')[0]} ${value}%`} labelLine={false} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: Kantar Worldpanel, Nielsen IQ 2024</p>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p><div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#d97706] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Rural Opportunity</div><p className="text-xs text-gray-700">36% of FMCG revenue from rural India and growing. Sachet economy, direct distribution, and rural e-commerce driving penetration.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Premiumisation</div><p className="text-xs text-gray-700">Premium products growing 2x base. Consumers upgrading from mass to mid/premium. Natural, organic, Ayurvedic commanding 15-30% premium.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">D2C Disruption</div><p className="text-xs text-gray-700">8%+ market share for D2C brands (Mamaearth, Wow, mCaffeine). Lower CAC via social media. Challenging legacy brands in personal care.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">E-Commerce</div><p className="text-xs text-gray-700">10% share and fastest growing channel. Quick commerce (10-min delivery) reshaping urban FMCG. Blinkit, Zepto, Instamart 3x growth.</p></div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: Nielsen IQ, Kantar, IBEF, Company Annual Reports</p>
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
      {selectedPlayer && selected && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3><button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div></div><div className="space-y-3"><div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Key Brands & Network</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div><div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion Plans</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div><div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 15 FMCG Companies in India</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for detailed profile</p>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (Cr)</th><th className="text-right py-2 px-2 font-bold text-navy">Mkt Cap (Cr)</th><th className="text-left py-2 px-2 font-bold text-navy">Key Brands</th><th className="text-center py-2 px-2 font-bold text-navy">Reach</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-amber-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right">₹{p.revenue.toLocaleString()}</td><td className="py-2.5 px-2 text-right">{p.marketCap ? `₹${(p.marketCap/1000).toFixed(0)}K` : 'Private'}</td><td className="py-2.5 px-2 text-[10px] max-w-[180px] truncate">{p.brands}</td><td className="py-2.5 px-2 text-center text-[10px] font-semibold text-orange-600">{p.reach}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View</span></td></tr>))}</tbody></table></div>
        <p className="text-[9px] text-gray-400 mt-3">Source: Company Annual Reports, BSE/NSE, Nielsen 2024-25</p>
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
          <h3 className="text-lg font-bold text-navy mb-4">Key Insurable Risks — FMCG</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{riskData.insurable.map((r, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-navy">{r.risk}</span><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${r.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{r.severity}</span></div><p className="text-[10px] text-gray-600">{r.desc}</p><div className="mt-2 text-[9px] text-gray-400">Frequency: {r.frequency}</div></div>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Insurance Products for FMCG</h3>
          <div className="flex flex-wrap gap-2">{riskData.products.map((p, i) => (<span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-semibold border border-amber-100">{p}</span>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Industry-Specific Add-Ons & Endorsements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">{riskData.addons.map((a, i) => (<div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"><CheckCircle2 size={12} className="text-green-600 shrink-0" /><span className="text-xs text-gray-700">{a}</span></div>))}</div>
          <p className="text-[9px] text-gray-400 mt-3">Source: IRDAI, GIC Re, Industry Risk Reports</p>
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
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Quality Control</div><p className="text-xs text-gray-700">In-house labs at every plant, FSSAI compliance audits quarterly, supplier quality programs, traceability from farm to fork, automated testing lines.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Supply Chain Resilience</div><p className="text-xs text-gray-700">Multi-sourcing for key commodities, strategic commodity hedging, 30-45 day safety stock, alternate vendor development, regional warehousing.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Anti-Counterfeit</div><p className="text-xs text-gray-700">QR code authentication on packs, holographic seals, batch tracking, market surveillance teams, legal enforcement cells, consumer awareness campaigns.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Warehouse Safety</div><p className="text-xs text-gray-700">Automated fire suppression, temperature monitoring (cold chain), pest control protocols, CCTV surveillance, regular electrical audits, sprinkler systems.</p></div>
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
        <h3 className="text-lg font-bold text-navy mb-2">State-wise FMCG Market Share</h3>
        <p className="text-xs text-gray-500 mb-4">Click "Why?" for detailed analysis</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{geographyData.map((g, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-navy">{g.state}</span><span className="text-lg font-black text-maroon">{g.share}%</span></div><div className="w-full bg-gray-100 rounded-full h-2 mb-2"><div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-700" style={{ width: `${(g.share / 18) * 100}%` }}></div></div><button onClick={() => setSelectedState(g.state)} className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg hover:bg-amber-100 transition">Why? →</button></div>))}</div>
        <p className="text-[9px] text-gray-400 mt-3">Source: Nielsen IQ, Kantar Household Panel 2024</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Distribution Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100"><div className="text-sm font-bold text-amber-800 mb-1">Metro Belt</div><div className="text-2xl font-black text-amber-900">40%</div><p className="text-[10px] text-amber-700 mt-1">Mumbai-Delhi-Bangalore triangle. Modern trade + quick commerce dominant. Premium products over-index.</p></div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100"><div className="text-sm font-bold text-blue-800 mb-1">Semi-Urban Growth</div><div className="text-2xl font-black text-blue-900">35%</div><p className="text-[10px] text-blue-700 mt-1">Tier 2-3 cities. Fastest growth corridor. General trade modernizing. Aspirational consumer base expanding.</p></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100"><div className="text-sm font-bold text-green-800 mb-1">Rural Frontier</div><div className="text-2xl font-black text-green-900">25%</div><p className="text-[10px] text-green-700 mt-1">Growing fastest at 12%+ CAGR. Sachet/LUP economy. Direct distribution + van operations. E-commerce penetrating.</p></div>
        </div>
      </div>
      {selectedState && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Why {selectedState}?</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><div className="text-center"><div className="text-2xl font-black text-maroon">{geographyData.find(g => g.state === selectedState)?.share}%</div><div className="text-[10px] text-gray-500">FMCG Market Share</div></div></div><p className="text-sm text-gray-700 leading-relaxed">{geographyData.find(g => g.state === selectedState)?.reason}</p></div></div>)}
    </div>
  )
}

// ===== NEWS TAB =====
function NewsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Latest FMCG Industry News</h3>
        <div className="space-y-3">{newsData.map((n, i) => (<div key={i} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-sm transition"><div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.sentiment === 'positive' ? 'bg-green-500' : n.sentiment === 'negative' ? 'bg-red-500' : 'bg-amber-500'}`}></div><div className="flex-1"><h4 className="text-sm font-bold text-navy">{n.title}</h4><div className="flex items-center gap-3 mt-1"><span className="text-[10px] text-gray-400">{n.date}</span><span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{n.source}</span><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${n.sentiment === 'positive' ? 'bg-green-50 text-green-700' : n.sentiment === 'negative' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{n.sentiment}</span></div></div></div>))}</div>
      </div>
    </div>
  )
}
