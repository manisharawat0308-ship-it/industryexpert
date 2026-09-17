import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, CandyOff, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, LabelList
} from 'recharts'
import PlayersBoard, { PlayerRow } from '../components/PlayersBoard'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { SUGAR_GAME } from '../components/process-game/data/sugarGame'
import BusinessModel from '../components/BusinessModel'
import { SUGAR_BUSINESS } from '../data/businessModels/sugarBusiness'
import NewsFeed from '../components/NewsFeed'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'
import SugarRiskAnalysis from '../components/risk-analysis/SugarRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'

const COLORS = ['#059669', '#B02A30', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#0369a1']

type SugarTab = 'overview' | 'business' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot' | 'game'

// ===== DATA =====
const segmentData = [
  { name: 'White/Refined Sugar', value: 55, color: '#059669' },
  { name: 'Raw Sugar', value: 15, color: '#B02A30' },
  { name: 'Ethanol/Biofuel', value: 20, color: '#F99D27' },
  { name: 'Molasses/Chemicals', value: 5, color: '#4CAF50' },
  { name: 'Cogeneration (Power)', value: 5, color: '#9C27B0' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'White/Refined Sugar': { subtypes: [{ name: 'Plantation White (S-30)', share: '45%' }, { name: 'Refined (S-31)', share: '30%' }, { name: 'Sulphurless White', share: '15%' }, { name: 'Pharma Grade', share: '5%' }, { name: 'Cube/Icing Sugar', share: '5%' }], desc: '55% of industry revenue. India produces 27.5 MT annually. Domestic consumption 27 MT. Government controls release mechanism and MSP (Minimum Selling Price Rs 31/kg). UP and Maharashtra produce 65%+ of white sugar.' },
  'Raw Sugar': { subtypes: [{ name: 'Export Grade Raw', share: '50%' }, { name: 'Plantation Raw', share: '25%' }, { name: 'VHP (Very High Pol)', share: '15%' }, { name: 'Demerara', share: '10%' }], desc: '15% of output. Raw sugar primarily for exports and re-refining. India exports 5-8 MT in surplus years. Government regulates export quotas. Brazil raw sugar benchmark influences Indian pricing.' },
  'Ethanol/Biofuel': { subtypes: [{ name: 'B-Heavy Molasses Route', share: '30%' }, { name: 'C-Heavy Molasses Route', share: '25%' }, { name: 'Sugarcane Juice/Syrup', share: '25%' }, { name: 'Grain-based (rice/maize)', share: '15%' }, { name: 'Second-Gen (cellulosic)', share: '5%' }], desc: '20% and fastest growing segment. E20 blending target by 2025. Ethanol capacity grown from 400 Cr liters to 1,500 Cr liters. Government guaranteed procurement at Rs 65-72/liter. Sugar mills diversifying heavily into ethanol.' },
  'Molasses/Chemicals': { subtypes: [{ name: 'Potable Alcohol/Liquor', share: '35%' }, { name: 'Industrial Alcohol', share: '25%' }, { name: 'Cattle Feed', share: '20%' }, { name: 'Organic Chemicals', share: '10%' }, { name: 'Yeast/Vinegar', share: '10%' }], desc: '5% of revenue but critical byproduct. Molasses = feedstock for ethanol and alcohol. State excise policies control molasses allocation. Each MT of sugar generates 4.5% molasses. Growing demand from pharma and chemical industries.' },
  'Cogeneration (Power)': { subtypes: [{ name: 'Bagasse-based Power', share: '70%' }, { name: 'Grid Export (surplus)', share: '20%' }, { name: 'Captive Consumption', share: '10%' }], desc: '5% revenue from power generation using bagasse (sugarcane fiber waste). Mills generate 3,500 MW+ surplus power sold to state grids. Green energy credentials. Triveni, Balrampur lead in cogeneration. Reduces fossil fuel dependence.' },
}

const revenueData = [
  { name: 'Sugar Sales', value: 60, color: '#059669' },
  { name: 'Ethanol', value: 25, color: '#F99D27' },
  { name: 'Power (Cogen)', value: 10, color: '#9C27B0' },
  { name: 'Others', value: 5, color: '#0369a1' },
]

const globalComparison = [
  { country: 'Brazil', production: 42 }, { country: 'India', production: 27.5 }, { country: 'EU', production: 15 },
  { country: 'China', production: 10 }, { country: 'Thailand', production: 10 }, { country: 'USA', production: 8 },
  { country: 'Pakistan', production: 7 }, { country: 'Mexico', production: 6 },
]

const timelineData = [
  { year: '2015', sugar: 25.1, ethanol: 1.5 }, { year: '2017', sugar: 20.3, ethanol: 2.1 },
  { year: '2018', sugar: 32.4, ethanol: 2.8 }, { year: '2019', sugar: 27.8, ethanol: 3.5 },
  { year: '2020', sugar: 31.2, ethanol: 4.5 }, { year: '2021', sugar: 30.9, ethanol: 6.0 },
  { year: '2022', sugar: 35.9, ethanol: 8.5 }, { year: '2023', sugar: 32.8, ethanol: 11.0 },
  { year: '2024', sugar: 27.5, ethanol: 13.5 }, { year: '2025P', sugar: 28.0, ethanol: 15.0 },
  { year: '2027P', sugar: 30.0, ethanol: 18.0 }, { year: '2030P', sugar: 32.0, ethanol: 22.0 },
]

const playersData = [
  { rank: 1, name: 'Bajaj Hindusthan', revenue: 5200, tcd: '136,000', ethanol: '520 KLPD', state: 'UP' },
  { rank: 2, name: 'Balrampur Chini', revenue: 5600, tcd: '76,000', ethanol: '1,060 KLPD', state: 'UP' },
  { rank: 3, name: 'Triveni Engineering', revenue: 5100, tcd: '61,000', ethanol: '660 KLPD', state: 'UP' },
  { rank: 4, name: 'Dhampur Sugar', revenue: 3200, tcd: '56,000', ethanol: '330 KLPD', state: 'UP' },
  { rank: 5, name: 'EID Parry', revenue: 3800, tcd: '43,000', ethanol: '270 KLPD', state: 'TN/KA' },
  { rank: 6, name: 'Shree Renuka', revenue: 7200, tcd: '45,000', ethanol: '1,750 KLPD', state: 'MH/KA' },
  { rank: 7, name: 'Dwarikesh Sugar', revenue: 2100, tcd: '22,500', ethanol: '200 KLPD', state: 'UP' },
  { rank: 8, name: 'Uttam Sugar', revenue: 2800, tcd: '35,000', ethanol: '250 KLPD', state: 'UP' },
  { rank: 9, name: 'Mawana Sugars', revenue: 1500, tcd: '22,000', ethanol: '100 KLPD', state: 'UP' },
  { rank: 10, name: 'Bannari Amman', revenue: 2400, tcd: '28,000', ethanol: '180 KLPD', state: 'TN' },
  { rank: 11, name: 'Ponni Sugars', revenue: 800, tcd: '10,000', ethanol: '60 KLPD', state: 'TN' },
  { rank: 12, name: 'Ugar Sugar', revenue: 1200, tcd: '15,000', ethanol: '150 KLPD', state: 'KA' },
  { rank: 13, name: 'Rana Sugars', revenue: 900, tcd: '12,500', ethanol: '80 KLPD', state: 'Punjab' },
  { rank: 14, name: 'DCM Shriram', revenue: 3500, tcd: '30,000', ethanol: '400 KLPD', state: 'UP/RJ' },
  { rank: 15, name: 'Indian Potash (Coop)', revenue: 1800, tcd: '18,000', ethanol: '0', state: 'MH' },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'Bajaj Hindusthan': { hq: 'Mumbai/Golagokarannath (UP)', ceo: 'Kushagra Bajaj', founded: '1931', type: 'Bajaj Group (Public)', plants: '14 sugar mills in UP, 136,000 TCD combined crushing capacity. Largest sugar company by capacity in India. Ethanol distillery 520 KLPD.', expansion: 'Debt restructuring and mill modernization ongoing. Ethanol capacity expansion to 800 KLPD by 2026. Focus on operational efficiency and cane recovery improvement. Exploring cogeneration at all units.', moat: 'Largest crushing capacity in India. Scale advantage in cane procurement. 14-mill cluster in UP ensures cane availability. Bajaj Group financial backing for turnaround.' },
  'Balrampur Chini': { hq: 'Kolkata/Balrampur (UP)', ceo: 'Vivek Saraogi', founded: '1975', type: 'Saraogi Family (Public)', plants: '10 mills in UP, 76,000 TCD. Highest sugar recovery rates (11%+). Ethanol capacity 1,060 KLPD (one of India largest). 160 MW cogeneration.', expansion: 'Ethanol capacity doubled in 2 years. New grain-based distillery (400 KLPD). Target 30%+ revenue from ethanol by 2026. Cogeneration expansion to 200 MW.', moat: 'Best-in-class sugar recovery (11.2% vs industry 10.5%). Lowest cost producer. Zero debt. Highest EBITDA margins in sector. Diversified revenue: sugar + ethanol + power. Management quality rated highest.' },
  'Triveni Engineering': { hq: 'Noida/UP', ceo: 'Tarun Sawhney', founded: '1932', type: 'Sawhney Family (Public)', plants: '7 sugar mills in UP, 61,000 TCD. Engineering division (turbines, gears). Ethanol 660 KLPD. 100+ MW cogeneration capacity.', expansion: 'Engineering division demerger planned. Ethanol capacity to 1,000 KLPD by 2025. High-pressure cogeneration upgrades. Grain-based ethanol plant commissioned.', moat: 'Dual business: sugar + engineering (turbines). Engineering division provides counter-cyclical earnings. Premium cogeneration technology. Strong ethanol execution. Low leverage.' },
  'EID Parry': { hq: 'Chennai', ceo: 'S. Suresh', founded: '1788', type: 'Murugappa Group (Public)', plants: '6 mills in Tamil Nadu and Karnataka, 43,000 TCD. Subsidiary of Murugappa Group. Nutraceuticals division (Parry\'s sugar brand). Ethanol 270 KLPD.', expansion: 'Value-added sugar products (branded retail). Nutraceuticals and organic sugar push. Spirulina health products. Ethanol expansion in South India.', moat: 'Oldest sugar company in India (est. 1788). Murugappa Group pedigree. South India leadership. Branded consumer sugar (Parry\'s). Diversified into nutraceuticals. Premium positioning.' },
  'Shree Renuka': { hq: 'Mumbai/Belgaum (KA)', ceo: 'Atul Chaturvedi', founded: '1998', type: 'Wilmar International (Public)', plants: '4 mills in Maharashtra/Karnataka, 45,000 TCD. Wilmar (Singapore) acquired majority stake. Largest single-location refinery (Haldia). Ethanol 1,750 KLPD (India largest).', expansion: 'Wilmar backing for massive ethanol expansion. Target 2,500 KLPD ethanol by 2026. Integrated refinery + distillery model. Port-based raw sugar refining for cost advantage.', moat: 'Wilmar International (world\'s largest agri company) ownership. Largest ethanol capacity in India. Port-based refinery (import raw, refine, sell). Integrated sugar-ethanol-power model. Access to global trading network.' },
}

const geographyData = [
  { state: 'Uttar Pradesh', share: 38, reason: 'India\'s largest sugar-producing state. 120+ mills (mostly private). Fertile Indo-Gangetic plains with canal irrigation. Sub-tropical cane variety (higher sucrose). Government incentives for ethanol. Key districts: Lakhimpur Kheri, Muzaffarnagar, Bijnor, Meerut.' },
  { state: 'Maharashtra', share: 28, reason: 'Cooperative model dominant (NCP/Congress political base). 200+ cooperative mills + 80 private. Tropical cane variety. Higher sugar recovery (12%+). Water-intensive but canal-fed (Krishna, Godavari basins). Key: Kolhapur, Pune, Solapur, Ahmednagar.' },
  { state: 'Karnataka', share: 12, reason: 'Most efficient mills in India. Belgaum-Mandya belt. Mix of cooperative and private. Highest recovery rates. Water availability from Cauvery/Krishna. Shree Renuka, Ugar Sugar, NSL Sugars headquartered here.' },
  { state: 'Tamil Nadu', share: 5, reason: 'Southern belt with EID Parry, Rajshree, Ponni Sugars. Cauvery delta cane farming. Smaller mills but high efficiency. Facing water stress from Karnataka dispute. Branded sugar market leader (Parry\'s).' },
  { state: 'Gujarat', share: 4, reason: 'Emerging sugar state. Bardoli-Surat cane belt. Cooperative mills (Madhi, Gandevi). Private players entering. Limited but growing. Ethanol capacity building up for E20 target.' },
  { state: 'Bihar', share: 3, reason: 'Historical sugar bowl (pre-independence). Declining due to land fragmentation. Some private mills reviving (Magadh Sugar, Riga Sugar). Rich alluvial soil suitable for cane. Mill efficiency improvement needed.' },
  { state: 'Punjab/Haryana', share: 3, reason: 'Limited cane area competing with wheat/rice MSP. Rana Sugars, HPSL few active mills. Sub-tropical variety. Short crushing season (120 days vs 180 in South). State government cane pricing higher than FRP.' },
  { state: 'AP/Telangana', share: 2, reason: 'NCS Sugars, KCP Sugar active in coastal AP. Small but efficient mills. Godavari delta cane cultivation. Facing competition from paddy for land allocation.' },
  { state: 'Others', share: 5, reason: 'Uttarakhand (5-6 mills), MP (Sagar belt), Odisha (emerging). Smaller producing states with limited capacity but government push for ethanol creating new investment interest.' },
]

const newsData = [
  { title: 'Government raises ethanol procurement price 4-5% for 2025-26 season; B-heavy route at Rs 65.61/liter', date: '2026-08-11', sentiment: 'positive', source: 'Ministry of Food (DFPD)', summary: 'The revised procurement prices improve mill economics for diverting cane juice and B-heavy molasses to ethanol. Higher realisations support cash flows and help clear cane payment arrears. The move reinforces the government\'s biofuel blending push.' },
  { title: 'India extends curbs on sugar exports for 2025-26 season amid lower production estimates of 27.5 MT', date: '2026-07-24', sentiment: 'negative', source: 'DGFT Notification', summary: 'Export restrictions aim to keep domestic sugar prices stable and ensure adequate supply. Lower cane yields in key states drove the cautious estimate. Millers with export exposure face pressure on inventory monetisation.' },
  { title: 'UP farmers demand FRP increase to Rs 400/quintal; current FRP Rs 340 for 2025-26', date: '2026-06-16', sentiment: 'neutral', source: 'Hindustan Times', summary: 'Farmer bodies are pressing for a higher Fair and Remunerative Price citing rising input costs. Any hike would squeeze mill margins already strained by capped sugar MSP. The demand adds political sensitivity ahead of the crushing season.' },
  { title: 'Balrampur Chini commissions 400 KLPD grain-based ethanol plant; total capacity 1,460 KLPD', date: '2026-05-28', sentiment: 'positive', source: 'BSE Filing', summary: 'The grain-based capacity diversifies feedstock away from cane, improving year-round plant utilisation. It positions Balrampur Chini as a leading ethanol supplier under the blending programme. The investment supports the company\'s shift toward distillery-led earnings.' },
  { title: 'E20 blending achieved at 18.5% nationally; 20% target on track for 2026', date: '2026-04-20', sentiment: 'neutral', source: 'Ministry of Petroleum', summary: 'Ethanol blending has climbed steadily on expanded distillery capacity and OMC procurement. Reaching 20% would cut crude imports and support sugarcane farmers. Feedstock availability remains the key variable in surplus and deficit years.' },
  { title: 'Maharashtra cooperative mills face Rs 4,000 Cr cane arrears; political pressure mounts', date: '2026-03-22', sentiment: 'negative', source: 'Economic Times', summary: 'Delayed sugar sales and depressed realisations have widened arrears owed to farmers. Cooperative mills are seeking soft loans and interest subvention to bridge payments. The issue carries significant political weight in the cane belt.' },
  { title: 'Shree Renuka to expand ethanol capacity to 2,500 KLPD with Wilmar funding', date: '2026-03-05', sentiment: 'positive', source: 'Moneycontrol', summary: 'Backed by parent Wilmar, the expansion targets a larger share of the ethanol supply chain. The scale-up leverages both cane and grain routes for feedstock flexibility. It underscores growing investor appetite for biofuel-linked assets.' },
  { title: 'Sugar MSP unchanged at Rs 31/kg for 5th year; industry demands Rs 38/kg minimum', date: '2026-02-16', sentiment: 'negative', source: 'ISMA Press Release', summary: 'The static minimum sale price has failed to keep pace with rising production and cane costs. Producers argue a revision is essential to protect financial viability. The industry body has escalated the demand to the government.' },
]

const riskData = {
  insurable: [
    { risk: 'Cane Availability (Drought/Flood)', severity: 'Critical', frequency: 'High', desc: 'Sugarcane is rain-dependent in many regions. Drought reduces cane output 30-40%. Floods damage standing crop. Maharashtra drought 2015-16 cut production 50%. Bihar floods destroy 20% crop regularly.' },
    { risk: 'Sugar Price Crash (Oversupply)', severity: 'Critical', frequency: 'Medium', desc: 'Cyclical industry with 3-4 year surplus/deficit cycles. Prices crash from Rs 36 to Rs 26/kg in surplus years. Mills unable to pay farmers. Government buffer stock and export subsidies only partial relief.' },
    { risk: 'Mill Fire (Bagasse/Molasses)', severity: 'High', frequency: 'High', desc: 'Bagasse (sugarcane fiber) stored in open yards is highly combustible. Spontaneous combustion in summer. Molasses storage tank fires. Average loss Rs 20-100 Cr per incident. 15-20 major fires annually across India.' },
    { risk: 'Boiler Explosion', severity: 'Critical', frequency: 'Low', desc: 'High-pressure boilers (65-110 kg/cm²) for cogeneration. Tube failures, scale buildup, poor maintenance. Fatal accidents involving workers. Regulatory compliance mandatory under Indian Boilers Act.' },
    { risk: 'Regulatory Risk (FRP/MSP Changes)', severity: 'High', frequency: 'High', desc: 'Government sets FRP (Fair & Remunerative Price) for cane purchase. States add SAP (State Advised Price) on top. FRP increases without proportionate MSP hike squeeze mill margins. Political announcements during elections.' },
    { risk: 'Ethanol Policy Reversal', severity: 'High', frequency: 'Low', desc: 'Rs 50,000 Cr invested by mills in ethanol assuming E20 policy continuity. Any policy reversal (oil price crash, food inflation concerns limiting sugarcane diversion) would strand assets. Government restricted juice/syrup route in 2023.' },
  ],
  products: ['Property All Risks', 'Business Interruption', 'Boiler & Pressure Plant', 'Workers Compensation', 'Marine Cargo', 'Crop Insurance (Cooperatives)', 'Environmental Liability'],
  addons: ['Bagasse/molasses spontaneous combustion', 'Boiler tube failure & explosion', 'Crushing season machinery breakdown', 'Cane arrears payment risk (credit)', 'Ethanol storage tank explosion', 'Effluent treatment plant failure', 'Seasonal stock (sugar inventory) fluctuation', 'Cogeneration turbine breakdown', 'Cane transport vehicle fleet', 'Molasses tank leakage/fire', 'FRP/SAP regulatory penalty cover', 'Drought/flood crop failure (contract farming)', 'Fermentation vessel contamination'],
}

const caseStudies = [
  { title: 'Bajaj Hindusthan Debt Crisis (2015-2020)', loss: 'Rs 8,000 Cr debt', type: 'Financial / BI Risk', detail: 'India\'s largest sugar company accumulated Rs 8,000 Cr debt due to aggressive expansion (14 mills), combined with sugar price crash (Rs 22-24/kg in 2015-16). Multiple mills shut down. Farmers unpaid Rs 1,500 Cr. CDR (Corporate Debt Restructuring) activated. Lenders converted debt to equity. Recovery only after ethanol policy (2020+). Insurance lesson: Business Interruption and credit risk coverage for cyclical industries critical. Demonstrates systemic risk in sugar sector.' },
  { title: 'Maharashtra Sugar Mill Fire (2019)', loss: 'Rs 50 Cr+', type: 'Property/Fire', detail: 'Bagasse godown at a major Kolhapur cooperative mill caught fire during peak summer (May). Spontaneous combustion of stored bagasse (moisture content dropped below safe levels). Fire spread to adjacent molasses tanks. 3 days to control. Rs 30 Cr bagasse loss + Rs 15 Cr structural damage + Rs 5 Cr business interruption during maintenance season. Property All Risks policy covered Rs 35 Cr. Key lesson: Bagasse storage must maintain moisture above 40%. Spontaneous combustion endorsement essential.' },
  { title: 'UP Sugar Mills Cane Arrears Crisis (2022)', loss: 'Rs 12,000 Cr unpaid', type: 'Regulatory/Political', detail: 'UP sugar mills owed Rs 12,000 Cr to farmers in cane purchase arrears. State election year created political crisis. Government threatened license cancellation for non-paying mills. Some mills forced to sell sugar below cost. Banks froze working capital limits. Cascading effect: farmers blocked mill gates, crushing season delayed. Insurance lesson: Credit insurance for cane procurement, working capital BI cover, and political risk insurance relevant. Demonstrates regulatory unpredictability in sugar sector.' },
]

// ===== MAIN COMPONENT =====
export default function SugarDashboard() {
  const [activeTab, setActiveTab] = useState<SugarTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'
  const tabs: { id: SugarTab; label: string; icon: any }[] = [
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
      <DashboardHeader title="Sugar Industry Dashboard" />
      <nav className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm"><div className="max-w-[1920px] mx-auto px-6"><div className="flex items-center gap-1 py-2 overflow-x-auto">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}><tab.icon size={14} /> {tab.label}</button>))}</div></div></nav>
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'business' && <BusinessModel data={SUGAR_BUSINESS} />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="sugar" />}
        {activeTab === 'game' && <ProcessGame data={SUGAR_GAME} />}
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
      <div className="relative bg-gradient-to-r from-[#059669] to-[#10b981] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><CandyOff size={20} className="text-emerald-200" /><span className="text-[10px] font-semibold text-emerald-200 uppercase tracking-wide">India's Sugar Sector</span></div>
          <h2 className="text-2xl font-black">#2 Global Sugar Producer & Consumer</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">27.5 MT production | 530+ mills | 5 Cr farmers | 20% ethanol blend target (E20)</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">27.5 MT</div><div className="text-[10px] text-white/70 mt-0.5">Production</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">#<AnimatedCounter end={2} /></div><div className="text-[10px] text-white/70 mt-0.5">Global Rank</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={530} />+</div><div className="text-[10px] text-white/70 mt-0.5">Sugar Mills</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={5} /> Cr</div><div className="text-[10px] text-white/70 mt-0.5">Farmers</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={20} />%</div><div className="text-[10px] text-white/70 mt-0.5">E20 Blend Target</div></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={68} label="Sugar Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Sugar Production (MT, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India ranks #2 after Brazil</p>
          <ResponsiveContainer width="100%" height={300}><BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit=" MT" /><YAxis dataKey="country" type="category" fontSize={10} width={60} /><Tooltip formatter={(v: number) => `${v} MT`} /><Bar dataKey="production" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#059669' : e.country === 'Brazil' ? '#B02A30' : '#10b981'} />)}<LabelList dataKey="production" position="right" fontSize={9} formatter={(v: number) => `${v} MT`} /></Bar></BarChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: ISMA, ISO (International Sugar Organization) 2024</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Sugar & Ethanol Production Timeline (MT / Bn Liters)</h3>
          <p className="text-xs text-gray-500 mb-3">Ethanol growth driving industry transformation</p>
          <ResponsiveContainer width="100%" height={300}><LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} /><Tooltip /><Legend /><Line type="monotone" dataKey="sugar" name="Sugar (MT)" stroke="#059669" strokeWidth={2.5} dot={{ r: 4 }} /><Line type="monotone" dataKey="ethanol" name="Ethanol (Bn L)" stroke="#F99D27" strokeWidth={2.5} dot={{ r: 4 }} /></LineChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: ISMA, Ministry of Food (DFPD), OMC Reports</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Sugar Industry Segment Split</h3>
        <p className="text-xs text-gray-500 mb-3">Click any segment for details</p>
        <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split('/')[0]} ${value}%`} labelLine={false} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: ISMA, DFPD, Industry Estimates 2024</p>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p><div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-3">Revenue Split</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{revenueData.map((r, i) => (<div key={i} className="p-4 rounded-xl border border-gray-100 text-center"><div className="text-2xl font-black" style={{ color: r.color }}>{r.value}%</div><div className="text-xs font-semibold text-gray-600 mt-1">{r.name}</div></div>))}</div>
        <p className="text-[9px] text-gray-400 mt-3">Source: ISMA, Company Annual Reports FY24</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#059669] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Ethanol Revolution</div><p className="text-xs text-gray-700">E20 blending target by 2025-26. Ethanol revenue share grown from 5% to 25% in 4 years. Mills investing Rs 50,000 Cr+ in distillery capacity.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Government Support</div><p className="text-xs text-gray-700">FRP ensures minimum cane price for farmers. MSP floor for sugar sales. Ethanol guaranteed procurement by OMCs. Export quotas manage surplus.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Cyclical Industry</div><p className="text-xs text-gray-700">3-4 year surplus/deficit cycles. Overproduction crashes prices. Drought years create deficit. Ethanol diversion reducing cyclicality.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Cogeneration Value</div><p className="text-xs text-gray-700">3,500 MW+ bagasse-based power sold to grid. Green energy revenue stream. Reduces fossil fuel dependency. Carbon credit potential.</p></div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: ISMA, Ministry of Food, NITI Aayog Ethanol Roadmap</p>
      </div>
    </div>
  )
}

// ===== PLAYERS TAB =====
function PlayersTab() {
  const rows: PlayerRow[] = playersData.map((p) => ({
    rank: p.rank,
    name: p.name,
    revenue: p.revenue,
    type: 'Sugar Mill',
    segment: p.state,
    extra: [
      { label: 'Crushing (TCD)', value: String(p.tcd) },
      { label: 'Ethanol', value: String(p.ethanol) },
    ],
  }))
  return (
    <PlayersBoard
      players={rows}
      config={{
        industryLabel: 'Sugar',
        donutTitle: 'Category Split',
      }}
    />
  )
}

function PlayersTabLegacy() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const selected = selectedPlayer ? playerDetails[selectedPlayer] : null
  return (
    <div className="space-y-6">
      {selectedPlayer && selected && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3><button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div></div><div className="space-y-3"><div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Mills & Capacity</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div><div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion Plans</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div><div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 15 Sugar Companies in India</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for detailed profile</p>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (Cr)</th><th className="text-right py-2 px-2 font-bold text-navy">TCD</th><th className="text-center py-2 px-2 font-bold text-navy">Ethanol (KLPD)</th><th className="text-center py-2 px-2 font-bold text-navy">State</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-emerald-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right">₹{p.revenue.toLocaleString()}</td><td className="py-2.5 px-2 text-right text-[10px]">{p.tcd}</td><td className="py-2.5 px-2 text-center text-[10px] font-semibold text-orange-600">{p.ethanol}</td><td className="py-2.5 px-2 text-center text-[10px]">{p.state}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View</span></td></tr>))}</tbody></table></div>
        <p className="text-[9px] text-gray-400 mt-3">Source: ISMA, Company Annual Reports, BSE/NSE FY24</p>
      </div>
    </div>
  )
}

// ===== RISK TAB =====
function RiskTab() {
  return <SugarRiskAnalysis />
}

function RiskTabLegacy() {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'cases'>('insurable')
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">{(['insurable', 'cases'] as const).map(t => (<button key={t} onClick={() => setRiskSubTab(t)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${riskSubTab === t ? 'bg-maroon text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t === 'insurable' ? 'Insurable Risks' : 'Case Studies & Best Practices'}</button>))}</div>
      {riskSubTab === 'insurable' && (<>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Key Insurable Risks — Sugar Industry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{riskData.insurable.map((r, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-navy">{r.risk}</span><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${r.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{r.severity}</span></div><p className="text-[10px] text-gray-600">{r.desc}</p><div className="mt-2 text-[9px] text-gray-400">Frequency: {r.frequency}</div></div>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Insurance Products for Sugar Mills</h3>
          <div className="flex flex-wrap gap-2">{riskData.products.map((p, i) => (<span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-100">{p}</span>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Industry-Specific Add-Ons & Endorsements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">{riskData.addons.map((a, i) => (<div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"><CheckCircle2 size={12} className="text-green-600 shrink-0" /><span className="text-xs text-gray-700">{a}</span></div>))}</div>
          <p className="text-[9px] text-gray-400 mt-3">Source: IRDAI, GIC Re, ISMA Risk Reports</p>
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
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Bagasse Storage Safety</div><p className="text-xs text-gray-700">Maintain moisture above 40%, sprinkler systems, temperature monitoring sensors, fire breaks between stacks, covered storage where possible, regular turning of piles.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Boiler Maintenance</div><p className="text-xs text-gray-700">Annual IBR inspections, water treatment plants, regular tube thickness monitoring, safety valve testing quarterly, trained boiler attendants (Class I/II license mandatory).</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Cane Procurement</div><p className="text-xs text-gray-700">Diversified cane zones (15-20 km radius), drip irrigation promotion, early/late variety contracts, farmer loyalty programs (free seeds, fertilizer advances), digital weighbridge systems.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Financial Hedging</div><p className="text-xs text-gray-700">NCDEX sugar futures for price risk, ethanol revenue diversification, cogeneration income stabilizer, working capital insurance, export credit guarantee (ECGC).</p></div>
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
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Sugar Production Share</h3>
        <p className="text-xs text-gray-500 mb-4">Click "Why?" for detailed analysis</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{geographyData.map((g, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-navy">{g.state}</span><span className="text-lg font-black text-maroon">{g.share}%</span></div><div className="w-full bg-gray-100 rounded-full h-2 mb-2"><div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700" style={{ width: `${(g.share / 38) * 100}%` }}></div></div><button onClick={() => setSelectedState(g.state)} className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg hover:bg-emerald-100 transition">Why? →</button></div>))}</div>
        <p className="text-[9px] text-gray-400 mt-3">Source: ISMA, DFPD, State Cane Departments 2024</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Sugar Production Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100"><div className="text-sm font-bold text-emerald-800 mb-1">Northern Belt (UP)</div><div className="text-2xl font-black text-emerald-900">38%</div><p className="text-[10px] text-emerald-700 mt-1">Private mills dominant. Sub-tropical cane. 120+ mills. Largest absolute production. Ethanol hub of India.</p></div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100"><div className="text-sm font-bold text-blue-800 mb-1">Western Belt (MH)</div><div className="text-2xl font-black text-blue-900">28%</div><p className="text-[10px] text-blue-700 mt-1">Cooperative model. Tropical cane with higher recovery. Political economy of sugar. 200+ cooperative mills.</p></div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100"><div className="text-sm font-bold text-purple-800 mb-1">Southern Belt (KA/TN)</div><div className="text-2xl font-black text-purple-900">17%</div><p className="text-[10px] text-purple-700 mt-1">Most efficient mills. Highest sugar recovery rates (12%+). EID Parry, Shree Renuka lead. Water availability critical.</p></div>
        </div>
      </div>
      {selectedState && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Why {selectedState}?</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><div className="text-center"><div className="text-2xl font-black text-maroon">{geographyData.find(g => g.state === selectedState)?.share}%</div><div className="text-[10px] text-gray-500">Sugar Production Share</div></div></div><p className="text-sm text-gray-700 leading-relaxed">{geographyData.find(g => g.state === selectedState)?.reason}</p></div></div>)}
    </div>
  )
}

// ===== NEWS TAB =====
function NewsTab() {
  return <NewsFeed title="Sugar Industry News & Developments" items={newsData} />
}
