import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, Hotel
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, LabelList
} from 'recharts'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'

const COLORS = ['#a16207', '#B02A30', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#0369a1']

type HospTab = 'overview' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot'

// ===== DATA =====
const segmentData = [
  { name: 'Hotels & Resorts', value: 35, color: '#a16207' },
  { name: 'Restaurants & QSR', value: 25, color: '#B02A30' },
  { name: 'Travel & Tours', value: 15, color: '#F99D27' },
  { name: 'Airlines & Transport', value: 12, color: '#4CAF50' },
  { name: 'OTAs & Tech', value: 8, color: '#9C27B0' },
  { name: 'Events & MICE', value: 5, color: '#0369a1' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Hotels & Resorts': { subtypes: [{ name: 'Luxury (5-star)', share: '12%' }, { name: 'Upper Upscale', share: '10%' }, { name: 'Midscale & Economy', share: '30%' }, { name: 'Budget/Unbranded', share: '40%' }, { name: 'Homestays & Boutique', share: '8%' }], desc: 'India has ~180K+ hotel rooms across branded chains but 92% remain unbranded. Luxury segment growing 12% CAGR driven by inbound tourism and domestic weddings. Average room rate (ARR) crossed Rs 7,500 for branded properties.' },
  'Restaurants & QSR': { subtypes: [{ name: 'Quick Service (Dominos, McD)', share: '35%' }, { name: 'Casual Dining', share: '25%' }, { name: 'Cloud Kitchens', share: '20%' }, { name: 'Fine Dining', share: '10%' }, { name: 'Cafes & Bakeries', share: '10%' }], desc: '$65B food services market. QSR growing 25% CAGR. Cloud kitchens boomed post-COVID with 5,000+ brands. Zomato/Swiggy duopoly in delivery with 60M+ monthly orders.' },
  'Travel & Tours': { subtypes: [{ name: 'Domestic packages', share: '45%' }, { name: 'Outbound tours', share: '25%' }, { name: 'Inbound (foreign tourists)', share: '20%' }, { name: 'Adventure & Eco', share: '10%' }], desc: '18M foreign tourist arrivals. Domestic tourism exploding with 2.5B+ trips/year. Spiritual tourism (Ayodhya, Varanasi, Char Dham) driving new demand.' },
  'Airlines & Transport': { subtypes: [{ name: 'Domestic airlines', share: '55%' }, { name: 'Railways (IRCTC)', share: '25%' }, { name: 'Luxury cruises', share: '5%' }, { name: 'Coaches & rentals', share: '15%' }], desc: '220M air passengers. 8B+ railway passengers. IRCTC tourism packages growing 30%+. Cruise tourism nascent but Mumbai-Goa-Lakshadweep routes expanding.' },
  'OTAs & Tech': { subtypes: [{ name: 'MakeMyTrip-Goibibo', share: '45%' }, { name: 'Booking.com/Agoda', share: '20%' }, { name: 'OYO platform', share: '15%' }, { name: 'Yatra/Cleartrip', share: '10%' }, { name: 'Others', share: '10%' }], desc: '45%+ hotel bookings now via OTAs. MakeMyTrip dominates with $600M+ revenue. AI-powered personalization and dynamic pricing are key differentiators.' },
  'Events & MICE': { subtypes: [{ name: 'Corporate conferences', share: '40%' }, { name: 'Weddings & celebrations', share: '30%' }, { name: 'Exhibitions & trade fairs', share: '20%' }, { name: 'Sports & entertainment', share: '10%' }], desc: '$5B MICE market growing 15%+. India wedding industry worth $130B. Convention centers expanding (Jio, BIEC, Pragati Maidan). G20 hosting boosted MICE infrastructure.' },
}

const globalComparison = [
  { country: 'USA', revenue: 1200 }, { country: 'China', revenue: 680 }, { country: 'France', revenue: 250 },
  { country: 'Spain', revenue: 220 }, { country: 'Italy', revenue: 180 }, { country: 'UK', revenue: 160 },
  { country: 'India', revenue: 75 }, { country: 'UAE', revenue: 60 }, { country: 'Thailand', revenue: 55 },
  { country: 'Japan', revenue: 50 },
]

const timelineData = [
  { year: '2010', domestic: 15, international: 8 }, { year: '2013', domestic: 22, international: 11 },
  { year: '2015', domestic: 30, international: 14 }, { year: '2017', domestic: 40, international: 18 },
  { year: '2019', domestic: 55, international: 22 }, { year: '2020', domestic: 18, international: 5 },
  { year: '2022', domestic: 50, international: 15 }, { year: '2024', domestic: 65, international: 22 },
  { year: '2027P', domestic: 90, international: 35 }, { year: '2030P', domestic: 130, international: 50 },
]

const playersData = [
  { rank: 1, name: 'Indian Hotels (Taj)', properties: 280, revenue: 19500, type: 'Luxury/Premium', occupancy: '72%' },
  { rank: 2, name: 'EIH (Oberoi)', properties: 35, revenue: 2200, type: 'Ultra-Luxury', occupancy: '68%' },
  { rank: 3, name: 'ITC Hotels', properties: 120, revenue: 3500, type: 'Luxury/Premium', occupancy: '70%' },
  { rank: 4, name: 'Lemon Tree Hotels', properties: 190, revenue: 1100, type: 'Midscale/Economy', occupancy: '74%' },
  { rank: 5, name: 'Marriott India', properties: 140, revenue: 4500, type: 'Global Chain', occupancy: '71%' },
  { rank: 6, name: 'Hyatt India', properties: 50, revenue: 2800, type: 'Global Chain', occupancy: '69%' },
  { rank: 7, name: 'OYO', properties: 18000, revenue: 5500, type: 'Budget/Tech Platform', occupancy: '55%' },
  { rank: 8, name: 'MakeMyTrip', properties: 0, revenue: 4800, type: 'OTA Platform', occupancy: 'N/A' },
  { rank: 9, name: 'Yatra Online', properties: 0, revenue: 450, type: 'OTA Platform', occupancy: 'N/A' },
  { rank: 10, name: 'IRCTC', properties: 0, revenue: 4200, type: 'Govt/Tourism', occupancy: 'N/A' },
  { rank: 11, name: 'Thomas Cook India', properties: 0, revenue: 6000, type: 'Travel & Forex', occupancy: 'N/A' },
  { rank: 12, name: 'Devyani Intl', properties: 1200, revenue: 3400, type: 'QSR (KFC/PH)', occupancy: 'N/A' },
  { rank: 13, name: 'Jubilant FoodWorks', properties: 1900, revenue: 5600, type: 'QSR (Dominos)', occupancy: 'N/A' },
  { rank: 14, name: 'Chalet Hotels', properties: 10, revenue: 1300, type: 'Luxury (Marriott)', occupancy: '73%' },
  { rank: 15, name: 'Samhi Hotels', properties: 31, revenue: 850, type: 'Midscale/Premium', occupancy: '70%' },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'Indian Hotels (Taj)': { hq: 'Mumbai', ceo: 'Puneet Chhatwal', founded: '1903', type: 'Tata Group (Public)', plants: 'Taj, Vivanta, SeleQtions, Ginger brands across 280+ hotels in 4 continents', expansion: 'Target 700 hotels by 2030. Aggressive Ginger (economy) expansion. International growth in UK, US, Middle East. Ama Stays (homestays) platform.', moat: 'India most iconic hotel brand (121 years). Tata backing. 72% occupancy (highest in India). RevPAR premium 30%+ vs peers. Loyalty program (Epicure) with 3M+ members.' },
  'EIH (Oberoi)': { hq: 'Delhi', ceo: 'Vikram Oberoi', founded: '1934', type: 'Oberoi Family (Public)', plants: 'Oberoi, Trident brands across 35 properties in 6 countries', expansion: 'New openings in Mumbai BKC, Bangalore, London. Focus on ultra-luxury with limited expansion. Nile cruise boats and wilderness lodges.', moat: 'Ranked among world top hotel brands. Ultra-luxury positioning (ARR Rs 25,000+). 90%+ guest satisfaction. Exclusive destinations (Udaivilas, Amarvilas). Service DNA unmatched.' },
  'ITC Hotels': { hq: 'Kolkata', ceo: 'Anil Chadha', founded: '1975', type: 'ITC Ltd (demerging 2024)', plants: 'ITC Hotels, Welcomhotel, Mementos, Storii across 120+ properties', expansion: 'Demerger creating pure-play hotel company. 200 hotels target by 2030. Asset-light Welcomhotel and Storii brands growing rapidly.', moat: 'LEED Platinum certified (greenest hotel chain globally). Strong F&B (Bukhara, Dum Pukht). Corporate tie-ups. ITC brand trust. Highest banquet revenue in India.' },
  'Lemon Tree Hotels': { hq: 'Gurugram', ceo: 'Patanjali Keswani', founded: '2004', type: 'Private (Public listed)', plants: 'Lemon Tree Premier, Aurika, Red Fox, Keys across 190+ hotels', expansion: 'Target 250+ hotels. Tier 2/3 city expansion. Management contract model (asset-light). International entry (Dubai, Bhutan).', moat: 'India largest midscale chain. 74% occupancy. Inclusive employer (20% staff are differently-abled). Strong unit economics (low build cost of Rs 50L/room). RevPAR leader in midscale.' },
  'OYO': { hq: 'Gurugram', ceo: 'Ritesh Agarwal', founded: '2013', type: 'Private (pre-IPO)', plants: '18,000+ properties across India, SE Asia, Europe (budget segment)', expansion: 'IPO planned. Focus on profitability after COVID restructuring. Premium segment (Palette, Collection O). International markets stabilizing.', moat: 'Technology platform (AI pricing, instant booking). India largest room aggregator. Brand recognition in budget. 100M+ app downloads. Distribution moat.' },
  'MakeMyTrip': { hq: 'Gurugram', ceo: 'Rajesh Magow', founded: '2000', type: 'Public (NASDAQ listed)', plants: 'MakeMyTrip, Goibibo, redBus platforms. 100K+ hotel partners', expansion: 'International expansion (UAE, SE Asia). AI-powered trip planning. Corporate travel (myBiz). Supply partnerships deepening.', moat: '45%+ OTA market share in India. Goibibo acquisition sealed duopoly. Highest hotel attach rate. 60M+ annual transacting users. Network effects.' },
}

const geographyData = [
  { state: 'Rajasthan', share: 18, reason: 'Heritage tourism capital. Udaipur, Jaipur, Jodhpur palace hotels. Desert safaris, fort stays. Highest luxury hotel density outside metros. 55M+ tourist visits/year.' },
  { state: 'Kerala', share: 12, reason: 'God\'s Own Country branding. Backwater houseboats, Ayurveda resorts, wildlife. Medical tourism hub. Highest foreign tourist RevPAR. Monsoon tourism pioneer.' },
  { state: 'Goa', share: 10, reason: 'Beach tourism capital. 8M+ tourists on 105km coastline. Charter flights from Europe/Russia. Luxury resorts (Leela, Taj, W). Casino tourism. Nightlife economy.' },
  { state: 'Maharashtra', share: 10, reason: 'Mumbai = business hotel capital (70%+ occupancy year-round). Pune conventions. Ajanta-Ellora heritage. Lonavala-Mahabaleshwar weekend tourism. Highest MICE revenue.' },
  { state: 'Tamil Nadu', share: 9, reason: 'Temple tourism (Tirupati spillover, Madurai, Rameswaram). Chennai medical tourism. Ooty-Kodaikanal hill stations. Heritage (Mahabalipuram). 300M+ domestic visitors.' },
  { state: 'Uttar Pradesh', share: 8, reason: 'Spiritual tourism explosion. Ayodhya Ram Mandir (50M visitors projected). Varanasi ghats. Agra (Taj Mahal 7M visitors). Prayagraj Kumbh. Buddhist circuit.' },
  { state: 'Karnataka', share: 7, reason: 'Bangalore business travel (tech hub). Mysore-Hampi-Coorg heritage & nature. Mangalore beaches. Convention tourism. Highest corporate hotel demand.' },
  { state: 'Himachal Pradesh', share: 6, reason: 'Hill station tourism. Shimla, Manali, Dharamshala. Adventure tourism (paragliding, trekking). Boutique stays booming. Winter sports (Solang, Auli nearby).' },
]

const newsData = [
  { title: 'Indian Hotels crosses 300 properties milestone, targets 700 by 2030', date: '2025-01-15', sentiment: 'positive', source: 'Economic Times' },
  { title: 'India targets 30M foreign tourists by 2030 under new tourism policy', date: '2025-01-10', sentiment: 'positive', source: 'Ministry of Tourism' },
  { title: 'Cruise tourism gets Rs 2,500 Cr boost with 5 new terminals announced', date: '2024-12-28', sentiment: 'positive', source: 'PIB' },
  { title: 'OYO files fresh IPO papers, targets $5B valuation after profitability', date: '2024-12-20', sentiment: 'neutral', source: 'Mint' },
  { title: 'MICE tourism grows 25% as India hosts G20, World Cup events', date: '2024-12-15', sentiment: 'positive', source: 'FHRAI' },
  { title: 'Hotel room shortage in Ayodhya: only 2,000 branded rooms for 50M visitors', date: '2024-12-10', sentiment: 'negative', source: 'Business Standard' },
  { title: 'MakeMyTrip reports record quarter: 45M+ hotel nights booked', date: '2024-12-05', sentiment: 'positive', source: 'Company Filing' },
  { title: 'Climate risk: Uttarakhand hotels face landslide and flood insurance surge', date: '2024-11-28', sentiment: 'negative', source: 'IRDAI Report' },
]

const riskData = {
  insurable: [
    { risk: 'Fire in Hotel/Restaurant', severity: 'Critical', frequency: 'Medium', desc: 'Kitchen fires, electrical short circuits, boiler explosions. Heritage wooden structures especially vulnerable. Average claim Rs 5-50 Cr.' },
    { risk: 'Natural Disaster (Cyclone/Flood)', severity: 'Critical', frequency: 'Medium', desc: 'Coastal resorts (Goa, Kerala, Odisha) vulnerable to cyclones. Hill stations face landslides. Flood damage to ground-floor infrastructure.' },
    { risk: 'Food Safety & Contamination', severity: 'High', frequency: 'High', desc: 'Mass food poisoning at banquets/buffets. Contaminated water supply. FSSAI compliance failures. Average claim Rs 50L-5Cr including legal.' },
    { risk: 'Guest Injury/Death', severity: 'High', frequency: 'Medium', desc: 'Swimming pool drowning, lift accidents, balcony falls, adventure activity injuries. Slip-and-fall claims. Average settlement Rs 25L-2Cr.' },
    { risk: 'Cyber & Data Breach', severity: 'High', frequency: 'High', desc: 'Guest PII and credit card data theft. PMS system hacking. Ransomware on booking systems. DPDP Act 2023 penalties up to Rs 250 Cr.' },
    { risk: 'Pandemic Business Interruption', severity: 'Critical', frequency: 'Low', desc: 'COVID-19 caused 80% revenue loss for 18 months. Force majeure debates. Staff retention costs during zero occupancy periods.' },
  ],
  products: ['Property All Risks', 'Business Interruption', 'Public Liability', 'Product Liability (F&B)', 'Cyber Insurance', 'D&O Liability', 'Workers Compensation', 'Event Cancellation', 'Terrorism Cover', 'Marine Cargo (supplies)'],
  addons: ['Kitchen hood fire suppression cover', 'Swimming pool liability extension', 'Spa & wellness professional liability', 'Guest valuables safe deposit cover', 'Liquor liability endorsement', 'Event cancellation (weddings/MICE)', 'Terrorism & sabotage cover', 'Lift & escalator liability', 'Heritage building restoration costs', 'Boiler & pressure plant cover', 'Signage & facade damage', 'Pandemic extended BI (waiting period waiver)', 'Adventure activity liability (rafting, zip-line)', 'Guest vehicle parking liability', 'Reputation/crisis management costs'],
}

const caseStudies = [
  { title: 'Taj Mumbai Terror Attack (26/11 - 2008)', loss: 'Rs 500 Cr+', type: 'Terrorism & Property', detail: 'Three-day siege destroyed heritage wing of Taj Mahal Palace. 31 killed at hotel. Rs 500 Cr+ in property damage, business interruption, and reputation loss. Terrorism pool cover activated. IHCL rebuilt in 21 months. Led to industry-wide security upgrades and terrorism insurance becoming standard. Landmark case for terrorism risk pool claims in India.' },
  { title: 'Kerala Floods - Hotel Devastation (2018)', loss: 'Rs 2,000 Cr', type: 'Natural Catastrophe', detail: 'Once-in-century floods destroyed 300+ hotels and homestays across Kerala. Munnar, Wayanad, Kochi worst hit. Rs 2,000 Cr tourism revenue loss in peak season. 80% properties lacked flood cover (excluded zone). Led to parametric insurance products and government-backed pool discussions for tourism sector.' },
  { title: 'COVID-19 Hospitality Shutdown (2020-21)', loss: 'Rs 1.5 Lakh Cr', type: 'Pandemic/Business Interruption', detail: '18-month near-total shutdown. 80% revenue loss industry-wide. 30% workforce permanently displaced. Occupancy fell to 5-10%. BI claims rejected (pandemic exclusion). Rs 1.5 Lakh Cr cumulative loss. Led to policy wording debates, IRDAI guidelines on pandemic cover, and new products (parametric pandemic BI).' },
]

// ===== MAIN COMPONENT =====
export default function HospitalityDashboard() {
  const [activeTab, setActiveTab] = useState<HospTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'
  const tabs: { id: HospTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Industry Overview', icon: Gauge },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
  ]
  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50"><div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between"><div className="flex items-center gap-4"><button onClick={() => navigate('/hub')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"><ArrowLeft size={14} /> Back to Hub</button><div className="h-6 w-px bg-gray-200"></div><div className="flex items-center gap-3"><img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-8" /><div><h1 className="text-sm font-extrabold text-navy">Hospitality & Tourism</h1><p className="text-[10px] text-gray-500 font-medium">ICICI Lombard | Risk & Analytics</p></div></div></div><div className="flex items-center gap-3">{isAdmin && <button className="flex items-center gap-1 px-3 py-1.5 bg-orange/10 text-orange rounded-lg text-xs font-bold"><Settings size={13} /> Admin</button>}<button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 bg-navy/5 text-navy rounded-lg text-xs font-semibold hover:bg-navy/10 transition"><Download size={13} /> Export</button><div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">{isAdmin ? <Shield size={13} className="text-maroon" /> : <User size={13} className="text-navy" />}<span className="text-xs font-bold">{username}</span></div></div></div></header>
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
      <div className="relative bg-gradient-to-r from-[#a16207] to-[#ca8a04] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><Hotel size={20} className="text-yellow-200" /><span className="text-[10px] font-semibold text-yellow-200 uppercase tracking-wide">India's Hospitality & Tourism Sector</span></div>
          <h2 className="text-2xl font-black">7th Largest Tourism Economy Globally</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">$75B market | 18M foreign tourists | 80M direct & indirect jobs | 65% avg occupancy</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={75} />B</div><div className="text-[10px] text-white/70 mt-0.5">Market Size</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">#<AnimatedCounter end={7} /></div><div className="text-[10px] text-white/70 mt-0.5">Global Rank</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={18} />M</div><div className="text-[10px] text-white/70 mt-0.5">Foreign Tourists</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={65} />%</div><div className="text-[10px] text-white/70 mt-0.5">Hotel Occupancy</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={80} />M</div><div className="text-[10px] text-white/70 mt-0.5">Jobs Created</div></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={76} label="Hospitality Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Tourism Revenue ($B, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India ranks 7th globally, targeting top 5 by 2030</p>
          <ResponsiveContainer width="100%" height={300}><BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="B" /><YAxis dataKey="country" type="category" fontSize={10} width={60} /><Tooltip formatter={(v: number) => `$${v}B`} /><Bar dataKey="revenue" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'USA' ? '#B02A30' : '#a16207'} />)}<LabelList dataKey="revenue" position="right" fontSize={9} formatter={(v: number) => `$${v}B`} /></Bar></BarChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: WTTC, Ministry of Tourism 2024-25</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India Tourism Revenue Growth ($B)</h3>
          <p className="text-xs text-gray-500 mb-3">Domestic + International revenue streams (P = Projected)</p>
          <ResponsiveContainer width="100%" height={300}><LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} /><Tooltip /><Legend /><Line type="monotone" dataKey="domestic" name="Domestic Revenue ($B)" stroke="#a16207" strokeWidth={2.5} dot={{ r: 4 }} /><Line type="monotone" dataKey="international" name="Intl Revenue ($B)" stroke="#0369a1" strokeWidth={2} dot={{ r: 4 }} /></LineChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: Ministry of Tourism, HVS Anarock</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Hospitality Segment Split</h3>
        <p className="text-xs text-gray-500 mb-3">Click any segment for details</p>
        <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split(' ')[0]} ${value}%`} labelLine={false} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: FHRAI, HVS India 2024</p>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p><div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Supply Pipeline: Branded Hotel Rooms</h3>
        <p className="text-xs text-gray-500 mb-3">Only 8% of India's hotel rooms are branded — massive upside</p>
        <ResponsiveContainer width="100%" height={250}><BarChart data={[{ year: '2015', branded: 110, total: 1400, occ: 60 },{ year: '2018', branded: 130, total: 1600, occ: 63 },{ year: '2020', branded: 140, total: 1700, occ: 33 },{ year: '2022', branded: 155, total: 1800, occ: 58 },{ year: '2024', branded: 180, total: 1900, occ: 65 },{ year: '2027P', branded: 250, total: 2200, occ: 68 }]}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} /><Tooltip /><Legend /><Bar dataKey="branded" name="Branded Rooms (K)" fill="#a16207" radius={[4,4,0,0]} /><Bar dataKey="total" name="Total Rooms (K)" fill="#e5e7eb" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: HVS, STR Global, Hotelivate 2024</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#a16207] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Under-Penetration</div><p className="text-xs text-gray-700">Only 8% branded rooms (vs 40%+ in USA/China). Massive conversion and greenfield opportunity. 70K+ rooms in pipeline.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Revenge Travel</div><p className="text-xs text-gray-700">Post-COVID domestic tourism surged 35%+. Weekend getaways, experiential stays, and luxury spend at all-time high.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Digital Disruption</div><p className="text-xs text-gray-700">OTA penetration 45%+ (MakeMyTrip, OYO). AI pricing, instant booking, reviews driving decisions. Direct booking declining.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">MICE Boom</div><p className="text-xs text-gray-700">$5B MICE market. G20 effect. Wedding tourism $130B. New convention centers (Jio, BIEC). Corporate offsite culture.</p></div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: Ministry of Tourism, FHRAI, HVS, STR, WTTC Annual Reports</p>
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
      {selectedPlayer && selected && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3><button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div></div><div className="space-y-3"><div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Properties/Network</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div><div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion Plans</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div><div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 15 Hospitality Companies</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for detailed profile</p>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Properties</th><th className="text-center py-2 px-2 font-bold text-navy">Occupancy</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (Cr)</th><th className="text-center py-2 px-2 font-bold text-navy">Segment</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-amber-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right font-bold">{p.properties.toLocaleString()}</td><td className="py-2.5 px-2 text-center font-semibold text-orange-600">{p.occupancy}</td><td className="py-2.5 px-2 text-right">₹{p.revenue.toLocaleString()}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold">{p.type}</span></td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View</span></td></tr>))}</tbody></table></div>
        <p className="text-[9px] text-gray-400 mt-3">Source: Company Annual Reports, HVS, STR 2024-25</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Branded Hotel Market Share Movement</h3>
        <p className="text-xs text-gray-500 mb-3">Top chains by room count (000s)</p>
        <ResponsiveContainer width="100%" height={250}><BarChart data={[{ name: 'Indian Hotels', rooms: 28 },{ name: 'Marriott India', rooms: 22 },{ name: 'ITC Hotels', rooms: 12 },{ name: 'Hyatt India', rooms: 8 },{ name: 'Lemon Tree', rooms: 11 },{ name: 'Radisson', rooms: 9 },{ name: 'Accor India', rooms: 6 },{ name: 'Wyndham', rooms: 5 }]}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="name" fontSize={9} angle={-15} textAnchor="end" height={50} /><YAxis fontSize={10} /><Tooltip formatter={(v: number) => `${v}K rooms`} /><Bar dataKey="rooms" fill="#a16207" radius={[4,4,0,0]}><LabelList dataKey="rooms" position="top" fontSize={9} formatter={(v: number) => `${v}K`} /></Bar></BarChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: Hotelivate, STR Global 2024</p>
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
          <h3 className="text-lg font-bold text-navy mb-4">Key Insurable Risks — Hospitality</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{riskData.insurable.map((r, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-navy">{r.risk}</span><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${r.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{r.severity}</span></div><p className="text-[10px] text-gray-600">{r.desc}</p><div className="mt-2 text-[9px] text-gray-400">Frequency: {r.frequency}</div></div>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Insurance Products for Hospitality</h3>
          <div className="flex flex-wrap gap-2">{riskData.products.map((p, i) => (<span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-semibold border border-amber-100">{p}</span>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Industry-Specific Add-Ons & Endorsements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">{riskData.addons.map((a, i) => (<div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"><CheckCircle2 size={12} className="text-green-600 shrink-0" /><span className="text-xs text-gray-700">{a}</span></div>))}</div>
          <p className="text-[9px] text-gray-400 mt-3">Source: IRDAI, GIC Re, FHRAI Risk Reports</p>
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
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Fire Safety</div><p className="text-xs text-gray-700">Automated sprinklers, smoke detectors on every floor, annual fire audits, kitchen hood suppression systems, emergency evacuation drills quarterly.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Disaster Preparedness</div><p className="text-xs text-gray-700">Structural reinforcement for seismic zones, flood barriers for coastal properties, backup generators, business continuity plans, parametric insurance.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Cyber Security</div><p className="text-xs text-gray-700">PCI-DSS compliance, encrypted guest data, SOC monitoring, incident response team, regular penetration testing, staff phishing awareness training.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Food Safety</div><p className="text-xs text-gray-700">FSSAI compliance, HACCP certification, cold chain monitoring, supplier audits, daily kitchen inspections, allergen documentation protocols.</p></div>
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
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Tourism Share</h3>
        <p className="text-xs text-gray-500 mb-4">Click "Why?" for detailed analysis of each state's tourism strength</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">{geographyData.map((g, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-navy">{g.state}</span><span className="text-lg font-black text-maroon">{g.share}%</span></div><div className="w-full bg-gray-100 rounded-full h-2 mb-2"><div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-700" style={{ width: `${(g.share / 18) * 100}%` }}></div></div><button onClick={() => setSelectedState(g.state)} className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg hover:bg-amber-100 transition">Why? →</button></div>))}</div>
        <p className="text-[9px] text-gray-400 mt-3">Source: Ministry of Tourism, State Tourism Boards 2024</p>
      </div>
      {selectedState && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedState}</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-3 bg-amber-50 rounded-xl border border-amber-100 mb-3"><span className="text-xs font-bold text-amber-700">Tourism Share: {geographyData.find(g => g.state === selectedState)?.share}%</span></div><p className="text-xs text-gray-700 leading-relaxed">{geographyData.find(g => g.state === selectedState)?.reason}</p></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Tourism Share by State</h3>
        <ResponsiveContainer width="100%" height={280}><BarChart data={geographyData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="state" fontSize={9} angle={-15} textAnchor="end" height={50} /><YAxis fontSize={10} unit="%" /><Tooltip formatter={(v: number) => `${v}%`} /><Bar dataKey="share" fill="#a16207" radius={[4,4,0,0]}>{geographyData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}<LabelList dataKey="share" position="top" fontSize={9} formatter={(v: number) => `${v}%`} /></Bar></BarChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: Ministry of Tourism Annual Report 2024-25</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#a16207] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Tourism Corridors</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100"><div className="text-[10px] font-bold text-amber-700 uppercase mb-1">Heritage Belt</div><p className="text-xs text-gray-700">Rajasthan → UP → MP. Palace hotels, UNESCO sites (Taj, Khajuraho, Jaipur). Rs 25,000+ ARR. Foreign tourist magnet.</p></div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100"><div className="text-[10px] font-bold text-blue-700 uppercase mb-1">Beach Belt</div><p className="text-xs text-gray-700">Goa → Kerala → Tamil Nadu. Resorts, wellness, backwaters, diving. Charter tourism. Monsoon off-season challenge.</p></div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-100"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Business Belt</div><p className="text-xs text-gray-700">Mumbai → Delhi → Bangalore. 70%+ occupancy year-round. MICE, corporate. Highest RevPAR. Airport hotel boom.</p></div>
        </div>
      </div>
    </div>
  )
}

// ===== NEWS TAB =====
function NewsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Industry News & Developments</h3>
        <div className="space-y-3">{newsData.map((n, i) => (<div key={i} className="flex items-start gap-3 p-3 border border-gray-50 rounded-xl hover:bg-gray-50 transition"><div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.sentiment === 'positive' ? 'bg-green-500' : n.sentiment === 'negative' ? 'bg-red-500' : 'bg-amber-500'}`}></div><div className="flex-1"><p className="text-xs font-semibold text-navy">{n.title}</p><div className="flex items-center gap-2 mt-1"><span className="text-[9px] text-gray-400">{n.date}</span><span className="text-[9px] text-gray-400">|</span><span className="text-[9px] text-gray-500 font-medium">{n.source}</span><span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${n.sentiment === 'positive' ? 'bg-green-50 text-green-700' : n.sentiment === 'negative' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{n.sentiment}</span></div></div></div>))}</div>
      </div>
    </div>
  )
}
