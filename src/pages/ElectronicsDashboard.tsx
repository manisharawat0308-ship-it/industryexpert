import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, Cpu, Gamepad2, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, LabelList
} from 'recharts'
import PlayersBoard, { PlayerRow } from '../components/PlayersBoard'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import ProcessGame from '../components/process-game/ProcessGame'
import { ELECTRONICS_GAME } from '../components/process-game/data/electronicsGame'
import BusinessModel from '../components/BusinessModel'
import { ELECTRONICS_BUSINESS } from '../data/businessModels/electronicsBusiness'
import NewsFeed from '../components/NewsFeed'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'
import ElectronicsRiskAnalysis from '../components/risk-analysis/ElectronicsRiskAnalysis'
import DashboardHeader from '../components/DashboardHeader'

const COLORS = ['#dc2626', '#B02A30', '#F99D27', '#4CAF50', '#9C27B0', '#0369a1', '#1e3a5f']

type ElecTab = 'overview' | 'business' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot' | 'game'

// ===== DATA =====
const segmentData = [
  { name: 'Mobile Phones', value: 42, color: '#dc2626' },
  { name: 'Consumer Electronics', value: 18, color: '#B02A30' },
  { name: 'IT Hardware', value: 12, color: '#F99D27' },
  { name: 'LED Lighting', value: 8, color: '#4CAF50' },
  { name: 'Industrial Electronics', value: 7, color: '#9C27B0' },
  { name: 'Semiconductors/Components', value: 8, color: '#0369a1' },
  { name: 'Others', value: 5, color: '#1e3a5f' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Mobile Phones': { subtypes: [{ name: 'Samsung', share: '18%' }, { name: 'Apple', share: '25%' }, { name: 'Xiaomi', share: '14%' }, { name: 'Vivo', share: '12%' }, { name: 'Realme', share: '8%' }, { name: 'Others (OnePlus, Oppo, Motorola)', share: '23%' }], desc: '42% of electronics production ($65B). India is now world\'s 2nd largest mobile manufacturer. 99% of phones sold domestically are made in India. Apple shifted 14% of global iPhone production to India via Foxconn (Chennai), Tata (Hosur), and Pegatron (Chennai). Samsung Noida plant is world\'s largest mobile factory.' },
  'Consumer Electronics': { subtypes: [{ name: 'Television/Display', share: '35%' }, { name: 'Air Conditioners', share: '25%' }, { name: 'Washing Machines', share: '18%' }, { name: 'Refrigerators', share: '15%' }, { name: 'Audio Systems', share: '7%' }], desc: '18% of production ($28B). Growing at 12% CAGR driven by premiumisation and rural electrification. LG, Samsung, Voltas, Blue Star, Havells, Daikin dominate. AC market growing fastest at 18% CAGR due to rising temperatures and income.' },
  'IT Hardware': { subtypes: [{ name: 'Laptops', share: '40%' }, { name: 'Desktops & Monitors', share: '25%' }, { name: 'Servers & Storage', share: '20%' }, { name: 'Printers & Peripherals', share: '10%' }, { name: 'Networking Equipment', share: '5%' }], desc: '12% of production ($19B). PLI 2.0 for IT hardware launched. HP, Dell, Lenovo setting up India manufacturing. Import dependency still 60%+ for laptops. Government mandated import license for laptops/tablets (Aug 2023, later relaxed).' },
  'LED Lighting': { subtypes: [{ name: 'LED Bulbs', share: '45%' }, { name: 'LED Panels/Battens', share: '25%' }, { name: 'Street Lighting', share: '15%' }, { name: 'Decorative/Smart', share: '10%' }, { name: 'Industrial Lighting', share: '5%' }], desc: '8% of production ($12B). India underwent world\'s largest LED transformation under UJALA scheme. From 5% LED penetration (2014) to 85%+ (2024). Surya, Havells, Philips, Wipro Lighting lead. Smart lighting growing 30%+ CAGR.' },
  'Industrial Electronics': { subtypes: [{ name: 'Power Electronics', share: '30%' }, { name: 'Process Control/Automation', share: '25%' }, { name: 'Medical Electronics', share: '20%' }, { name: 'Defense Electronics', share: '15%' }, { name: 'EV Components', share: '10%' }], desc: '7% of production ($11B). Fastest growing segment at 22% CAGR driven by EV transition, defense indigenization, and smart manufacturing. BEL, L&T, Siemens India, ABB India are key players.' },
  'Semiconductors/Components': { subtypes: [{ name: 'Passive Components (PCB, Capacitors)', share: '35%' }, { name: 'IC Assembly & Testing (OSAT)', share: '25%' }, { name: 'Wafer Fabrication (upcoming)', share: '10%' }, { name: 'Display Fab', share: '15%' }, { name: 'Sensors & MEMS', share: '15%' }], desc: '8% of production ($12B). India Semiconductor Mission (Rs 76,000 Cr) approved. Tata-PSMC fab in Gujarat (28nm). Micron OSAT in Sanand ($2.75B). CG Power, Vedanta-Foxconn (stalled). 85% chips still imported.' },
  'Others': { subtypes: [{ name: 'Set-Top Boxes', share: '25%' }, { name: 'Smart Meters', share: '25%' }, { name: 'Wearables & IoT', share: '20%' }, { name: 'EV Chargers', share: '15%' }, { name: 'Drones & Robotics', share: '15%' }], desc: '5% of production ($8B). Emerging segments with high growth potential. Smart meters (250M units order pipeline), wearables (India #2 globally after China), EV chargers growing 60%+ CAGR.' },
}

const globalComparison = [
  { country: 'China', revenue: 850 }, { country: 'USA', revenue: 350 }, { country: 'South Korea', revenue: 200 },
  { country: 'Japan', revenue: 180 }, { country: 'Taiwan', revenue: 160 }, { country: 'India', revenue: 155 },
  { country: 'Vietnam', revenue: 70 }, { country: 'Germany', revenue: 65 },
]

const timelineData = [
  { year: '2014', production: 30 }, { year: '2016', production: 45 }, { year: '2018', production: 70 },
  { year: '2020', production: 85 }, { year: '2021', production: 101 }, { year: '2022', production: 118 },
  { year: '2023', production: 140 }, { year: '2024', production: 155 }, { year: '2026P', production: 250 },
  { year: '2028P', production: 375 }, { year: '2030P', production: 500 },
]

const playersData = [
  { rank: 1, name: 'Dixon Technologies', revenue: 17500, pli: 'Yes', segment: 'Mobile/TV/Lighting', location: 'Noida/Tirupati' },
  { rank: 2, name: 'Foxconn India', revenue: 45000, pli: 'Yes', segment: 'Mobile (Apple/Xiaomi)', location: 'Chennai/Bangalore' },
  { rank: 3, name: 'Samsung India', revenue: 85000, pli: 'Yes', segment: 'Mobile/TV/AC/Semi', location: 'Noida/Chennai' },
  { rank: 4, name: 'Apple (via EMS)', revenue: 65000, pli: 'Yes', segment: 'iPhone/iPad', location: 'Chennai/Hosur' },
  { rank: 5, name: 'Tata Electronics', revenue: 22000, pli: 'Yes', segment: 'iPhone/Semiconductor', location: 'Hosur/Dholera' },
  { rank: 6, name: 'Vedanta-Foxconn JV', revenue: 0, pli: 'Applied', segment: 'Display/Semiconductor', location: 'Gujarat (Stalled)' },
  { rank: 7, name: 'Havells India', revenue: 18700, pli: 'No', segment: 'Lighting/Switches/Appliances', location: 'Haridwar/Noida' },
  { rank: 8, name: 'Voltas', revenue: 11800, pli: 'No', segment: 'AC/Refrigerators', location: 'Pantnagar/Waghodia' },
  { rank: 9, name: 'Blue Star', revenue: 9200, pli: 'No', segment: 'AC/Commercial Ref', location: 'Wada/Ahmedabad' },
  { rank: 10, name: 'Amber Enterprises', revenue: 7800, pli: 'Yes', segment: 'AC Components/EMS', location: 'Rajpura/Ahmedabad' },
  { rank: 11, name: 'Kaynes Technology', revenue: 1800, pli: 'Yes', segment: 'PCB/EMS/Semiconductor', location: 'Mysuru/Pune' },
  { rank: 12, name: 'Bharat Electronics (BEL)', revenue: 20200, pli: 'No', segment: 'Defense Electronics', location: 'Bangalore/Ghaziabad' },
  { rank: 13, name: 'Bosch India', revenue: 16500, pli: 'No', segment: 'Auto Electronics/IoT', location: 'Bangalore/Jaipur' },
  { rank: 14, name: 'Continental India', revenue: 5200, pli: 'No', segment: 'Auto Electronics', location: 'Bangalore/Gurgaon' },
  { rank: 15, name: 'Motherson (Electronics)', revenue: 8900, pli: 'No', segment: 'Wiring/EMS/Modules', location: 'Noida/Pune' },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; plants: string; expansion: string; moat: string }> = {
  'Dixon Technologies': { hq: 'Noida, UP', ceo: 'Atul B. Lall', founded: '1993', type: 'Public (BSE/NSE)', plants: '22 manufacturing units across Noida, Dehradun, Tirupati, Ludhiana. Capacity: 30M mobiles, 4M TVs, 50M LED bulbs/year. Backward integrated (PCBA, display modules).', expansion: 'Semiconductor OSAT facility in Noida (Rs 1,250 Cr). New mobile unit in Narasapura, Karnataka. PLI beneficiary for mobiles, IT hardware, telecom. Targeting $5B revenue by FY27.', moat: 'India\'s largest homegrown EMS company. First-mover in PLI. Partnerships with Samsung, Xiaomi, Motorola, Google, Nokia. 22 plants = scale advantage. Only Indian EMS with backward integration into display modules.' },
  'Samsung India': { hq: 'Noida & Gurugram', ceo: 'JB Park', founded: '1995 (India)', type: 'Samsung Electronics subsidiary', plants: 'World\'s largest mobile factory (Noida, 120M units/year). Chennai semiconductor R&D. Sriperumbudur (TV/AC). 5 factories, 70,000+ employees in India.', expansion: 'Rs 4,825 Cr PLI investment. Semiconductor design center expansion in Bangalore. Foldable phone manufacturing in Noida. Export hub for Africa/Middle East markets.', moat: 'Largest consumer electronics brand in India (28% smartphone share by value). Integrated manufacturing (mobile + TV + AC + refrigerator). Strongest distribution (200K+ retail points). R&D centers in Bangalore, Noida, Delhi.' },
  'Tata Electronics': { hq: 'Hosur, Tamil Nadu', ceo: 'Randhir Thakur', founded: '2020', type: 'Tata Sons subsidiary (Private)', plants: 'iPhone assembly plant in Hosur (20K+ workers). Acquired Wistron India facility. Semiconductor fab in Dholera, Gujarat (partnership with PSMC, Taiwan). OSAT in Assam (Jagiroad).', expansion: 'Dholera fab ($11B) for 28nm chips - India\'s first semiconductor fab. OSAT Assam plant ($3.6B). iPhone production ramp to $10B+ by FY26. Apple\'s fastest-growing India partner.', moat: 'Tata Group credibility and capital. Only Indian company manufacturing iPhones at scale. First-mover in semiconductor fabrication. Vertical integration vision: fab + OSAT + assembly. Government backing for strategic sector.' },
  'Havells India': { hq: 'Noida, UP', ceo: 'Anil Rai Gupta', founded: '1958', type: 'Promoter-held (Public)', plants: '13 manufacturing plants across India (Haridwar, Baddi, Neemrana, Noida, Sahibabad, Alwar). Products: switches, cables, lighting, fans, water heaters, appliances.', expansion: 'Lloyd brand (AC/TV) premiumisation. Smart home ecosystem. New capacities in South India. Kitchen appliances (Rs 2,000 Cr target). Exports to 50+ countries.', moat: 'Brand dominance in switches (35% share) and cables (15% share). Lloyd acquisition gave consumer durables portfolio. 200K+ electrician loyalty network. Premium positioning. Zero-debt company with 15%+ ROCE.' },
  'Bharat Electronics (BEL)': { hq: 'Bangalore, Karnataka', ceo: 'Manoj Jain (CMD)', founded: '1954', type: 'Government of India (Navratna PSU)', plants: '9 manufacturing units + 5 product groups across Bangalore, Ghaziabad, Pune, Hyderabad, Chennai, Machilipatnam. 12,000+ employees.', expansion: 'Order book Rs 76,000 Cr (3x revenue). Electronic warfare systems, radars, communication equipment. Diversifying into non-defense (smart city, healthcare, EV charging, solar). Exports to 30+ countries.', moat: 'India\'s premier defense electronics company. 80%+ share of defense electronics orders from Indian Armed Forces. Rs 76K Cr order backlog = revenue visibility for 4+ years. Make-in-India beneficiary. Monopoly in radar, EW, and military communication systems.' },
}

const geographyData = [
  { state: 'Tamil Nadu (Chennai/Sriperumbudur)', share: 22, reason: 'India\'s electronics capital. Foxconn, Tata Electronics (Hosur), Pegatron, Salcomp, Flextronics, Dell, Nokia. Sriperumbudur = India\'s Shenzhen. Chennai port proximity for exports. SIPCOT electronics parks. 40% of India\'s mobile phone exports originate here. Skilled workforce from engineering colleges.' },
  { state: 'Karnataka (Bangalore)', share: 18, reason: 'Semiconductor design capital (200+ chip design centers). Bosch, Texas Instruments, Intel, Qualcomm R&D. BEL HQ. Mysuru = emerging PCB/EMS hub (Kaynes, SFO Technologies). IT talent pipeline feeds electronics R&D. Global Capability Centers (GCCs) drive innovation.' },
  { state: 'Uttar Pradesh (Noida/Greater Noida)', share: 16, reason: 'Samsung world\'s largest mobile factory (Noida). Dixon Technologies HQ and 10+ plants. Lava, Micromax, Optiemus (Noida). Greater Noida electronics manufacturing cluster. 120M+ mobile units/year capacity. Proximity to Delhi/NCR consumer market.' },
  { state: 'Telangana (Hyderabad)', share: 10, reason: 'Micron memory design center. Foxconn display manufacturing. Emerging ESDM cluster (Fab City stalled but OSAT growing). Cyient, BHEL electronics. Semiconductor talent from IIIT/ISB. Government incentives through TS-iPASS.' },
  { state: 'Gujarat (Sanand/Dholera)', share: 8, reason: 'Tata-PSMC semiconductor fab ($11B) in Dholera. Micron OSAT plant in Sanand ($2.75B). CG Power semiconductor. Sanand = already hosts Tata Nano plant infrastructure. DMIC corridor connectivity. Government land/incentives.' },
  { state: 'Maharashtra (Pune)', share: 7, reason: 'Pune = auto electronics hub (Bosch, Continental, Siemens). Nashik defense electronics cluster. LG, Whirlpool in Pune. Emerging EMS cluster in Aurangabad. SEEPZ (Mumbai) for export-oriented electronics.' },
  { state: 'Andhra Pradesh', share: 5, reason: 'Tirupati = Dixon, Celkon manufacturing. Foxconn explored Amaravati. Sri City industrial park near Chennai border. Kurnool solar electronics. Emerging as cost-effective alternative to Tamil Nadu.' },
  { state: 'Haryana (Gurgaon)', share: 5, reason: 'Panasonic, LG (Noida border), Maruti auto electronics suppliers. Gurgaon = Japanese electronics company hub. Manesar industrial belt. Continental, Denso, Motherson electronics units.' },
  { state: 'Others', share: 9, reason: 'Assam (Tata OSAT - Jagiroad), Uttarakhand (Haridwar - Havells, Panasonic), Himachal Pradesh (Baddi - electronic components tax benefit), Rajasthan (Bhiwadi - Japanese electronics), Kerala (emerging startup electronics).' },
]

const newsData = [
  { title: 'Tata Electronics advances India\'s first semiconductor fab in Dholera, Gujarat ($11B)', date: '2026-08-13', sentiment: 'positive', source: 'MeitY / Economic Times', summary: 'Construction is progressing on the mega fab that will produce mature-node chips for automotive, power, and display applications. The project anchors India\'s ambition to build a domestic semiconductor ecosystem. Talent development and supplier localisation are running in parallel.' },
  { title: 'Apple crosses $25B iPhone production in India; targets deeper local value addition', date: '2026-07-21', sentiment: 'positive', source: 'Bloomberg / Mint', summary: 'Contract manufacturers have scaled iPhone assembly sharply, making India a key global export base. Component localisation is rising though high-value parts remain imported. The expansion is generating large-scale manufacturing employment.' },
  { title: 'PLI Electronics: 130+ companies approved, production milestones surpassed in FY26', date: '2026-06-17', sentiment: 'positive', source: 'MeitY Annual Report', summary: 'The incentive scheme has catalysed large mobile and component manufacturing investments. Value addition and exports are climbing as ecosystems mature. Policymakers are now targeting deeper component and semiconductor localisation.' },
  { title: 'India still imports the bulk of semiconductors; annual chip import bill remains elevated', date: '2026-05-28', sentiment: 'negative', source: 'ICEA / Business Standard', summary: 'Despite fab announcements, near-term chip demand is met largely by imports. The import bill weighs on the trade balance and exposes supply-chain risk. Domestic fabs will take several years to move the needle materially.' },
  { title: 'Nvidia deepens AI compute partnerships in India; works with Tata Electronics and Dixon', date: '2026-04-19', sentiment: 'positive', source: 'Reuters', summary: 'Collaborations aim to localise AI server assembly and data-centre hardware. Rising domestic AI demand is drawing global chip leaders to India. The tie-ups could seed advanced electronics manufacturing capability.' },
  { title: 'Dixon Technologies revenue crosses Rs 30,000 Cr; targets further scale by FY28', date: '2026-03-24', sentiment: 'positive', source: 'BSE Filing', summary: 'The contract manufacturer continues rapid growth across mobiles, appliances, and IT hardware. New client wins and component backward-integration are lifting margins. Dixon is emerging as a bellwether for Indian electronics manufacturing.' },
  { title: 'India electronics exports climb toward $40B; $100B target by 2030 reaffirmed', date: '2026-03-05', sentiment: 'positive', source: 'ICEA / DGFT', summary: 'Smartphone exports remain the largest contributor to electronics shipments. Broadening into IT hardware and wearables is diversifying the base. The roadmap hinges on scaling components and design capability.' },
  { title: 'Micron ramps OSAT facility in Sanand, Gujarat; chip packaging output expands', date: '2026-02-15', sentiment: 'positive', source: 'Micron / PIB', summary: 'The assembly, test, and packaging plant marks a key step in India\'s semiconductor value chain. Local hiring and supplier development are scaling with the ramp. It complements front-end fab plans elsewhere in Gujarat.' },
]

const riskData = {
  insurable: [
    { risk: 'Supply Chain Disruption (Chip Shortage)', severity: 'Critical', frequency: 'Medium', desc: 'Global semiconductor shortage (2021-23) caused $50B+ losses worldwide. India auto/electronics production delayed 6-9 months. Single-source dependencies on TSMC/Samsung for advanced chips. Geopolitical tensions (Taiwan strait) create existential risk.' },
    { risk: 'Factory Fire (PCB/Lithium Battery)', severity: 'Critical', frequency: 'High', desc: 'Lithium-ion battery thermal runaway, PCB soldering flux fires, chemical storage fires. Wistron Kolar incident (2020) caused Rs 440 Cr damage. Samsung Noida had minor fire incidents. Average loss Rs 50-200 Cr per major fire.' },
    { risk: 'ESD/Static Damage (Electrostatic Discharge)', severity: 'High', frequency: 'High', desc: 'Semiconductor chips damaged by static electricity during handling/assembly. Single ESD event can destroy entire wafer lots worth $1-5M. Clean room contamination compounds damage. India\'s humid climate requires strict ESD controls.' },
    { risk: 'IP Theft / Cyber Espionage', severity: 'Critical', frequency: 'Medium', desc: 'Semiconductor design data theft. Corporate espionage for chip designs. State-sponsored attacks targeting defense electronics (BEL, DRDO suppliers). Ransomware on manufacturing IT/OT systems. Average cyber loss in electronics: $5-15M per incident.' },
    { risk: 'Regulatory (BIS/WPC Compliance)', severity: 'High', frequency: 'High', desc: 'BIS (Bureau of Indian Standards) mandatory certification for electronics. WPC (Wireless Planning Commission) approval for RF devices. Non-compliance = customs seizure + penalties. Frequent standard updates create compliance gaps.' },
    { risk: 'Geopolitical (China Component Dependency)', severity: 'Critical', frequency: 'Medium', desc: '65-70% of electronic components imported from China. PCBs, passive components, displays, connectors. Any trade disruption (Galwan-style) could halt Indian electronics production within 2-3 weeks. No alternative sources at scale for many components.' },
  ],
  products: ['Property All Risks', 'Business Interruption', 'Marine Cargo (High-Value)', 'Product Liability', 'Cyber Insurance', 'Transit Insurance', 'D&O Liability', 'Workers Compensation'],
  addons: ['Clean room contamination cover', 'Lithium battery thermal runaway', 'ESD (electrostatic discharge) damage', 'Chip/semiconductor wafer breakage', 'SMT line machinery breakdown', 'ATE (Automated Test Equipment) failure', 'Customs seizure/BIS non-compliance', 'Product recall (consumer electronics)', 'Data center fire & cooling failure', 'PCB assembly defect serial loss', 'Rare earth/critical mineral supply disruption', 'Robotic assembly arm failure', 'Display panel transit damage', 'OEM warranty reserve shortfall'],
}

const caseStudies = [
  { title: 'Global Chip Shortage Impact on India (2021-22)', loss: '$50B+ global / Rs 30,000 Cr India', type: 'Supply Chain / BI', detail: 'The 2021-22 global semiconductor shortage caused unprecedented production delays across India\'s auto and electronics sectors. Auto production fell 20%, consumer electronics delivery times extended 8-12 weeks. Root cause: COVID demand surge + Texas winter storm + Renesas Japan fire + concentrated TSMC/Samsung capacity. Indian companies like Maruti lost Rs 12,000 Cr revenue. Insurance lesson: Supply chain interruption insurance, contingent business interruption, and multi-sourcing requirements critical for electronics manufacturers.' },
  { title: 'Samsung India Factory Strike (Noida 2018)', loss: 'Rs 500 Cr production loss', type: 'Labor / BI', detail: 'Samsung\'s Noida mobile phone factory (world\'s largest) faced a major worker unrest in 2018 over wage and working condition disputes. 2,000+ workers involved. Production halted for 2+ weeks at a facility producing 60M phones/year. Rs 500 Cr estimated production and brand loss. Samsung accelerated automation post-strike. Insurance lesson: Business Interruption from labor action, Workers Compensation adequacy review, and strike/riot/civil commotion cover essential for large electronics factories with 10,000+ workers.' },
  { title: 'Wistron iPhone Factory Violence (Kolar 2020)', loss: 'Rs 440 Cr damage', type: 'Property / Riot', detail: 'In December 2020, workers at Wistron\'s iPhone assembly plant in Kolar, Karnataka rioted over unpaid wages and poor conditions. Rs 440 Cr property damage including machinery, inventory (iPhones), vehicles. Apple placed Wistron on probation, eventually Tata acquired the facility. Root cause: labor contractor exploitation, wage payment delays. Insurance lesson: Property All Risks with SRCC (Strike Riot Civil Commotion) endorsement essential. Highlights supply chain governance risk for OEMs. Tata acquisition shows brand-risk cascading to insurance coverage continuity.' },
]

// ===== MAIN COMPONENT =====
export default function ElectronicsDashboard() {
  const [activeTab, setActiveTab] = useState<ElecTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'
  const tabs: { id: ElecTab; label: string; icon: any }[] = [
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
      <DashboardHeader title="Electronics & Semiconductor" />
      <nav className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm"><div className="max-w-[1920px] mx-auto px-6"><div className="flex items-center gap-1 py-2 overflow-x-auto">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}><tab.icon size={14} /> {tab.label}</button>))}</div></div></nav>
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'business' && <BusinessModel data={ELECTRONICS_BUSINESS} />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry="electronics" />}
        {activeTab === 'game' && <ProcessGame data={ELECTRONICS_GAME} />}
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
      <div className="relative bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><Cpu size={20} className="text-red-200" /><span className="text-[10px] font-semibold text-red-200 uppercase tracking-wide">India's Electronics & Semiconductor Sector</span></div>
          <h2 className="text-2xl font-black">#5 Global Electronics Manufacturer — $155B Production</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">India Semiconductor Mission | PLI Electronics | Make-in-India for the World</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={155} />B</div><div className="text-[10px] text-white/70 mt-0.5">Market Size</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">#<AnimatedCounter end={5} /></div><div className="text-[10px] text-white/70 mt-0.5">Global Rank</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={15} />%</div><div className="text-[10px] text-white/70 mt-0.5">CAGR Growth</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={100} />B</div><div className="text-[10px] text-white/70 mt-0.5">Export Target 2030</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={3} />M+</div><div className="text-[10px] text-white/70 mt-0.5">Direct Jobs</div></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={74} label="Electronics Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Electronics Production ($B, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India ranks #5 globally</p>
          <ResponsiveContainer width="100%" height={300}><BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="$B" /><YAxis dataKey="country" type="category" fontSize={10} width={80} /><Tooltip formatter={(v: number) => `$${v}B`} /><Bar dataKey="revenue" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#dc2626' : e.country === 'China' ? '#B02A30' : '#f87171'} />)}<LabelList dataKey="revenue" position="right" fontSize={9} formatter={(v: number) => `$${v}B`} /></Bar></BarChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: ICEA, Counterpoint Research, MeitY 2024</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India Electronics Production Timeline ($B)</h3>
          <p className="text-xs text-gray-500 mb-3">5x growth in 10 years; $500B target by 2030 (ICEA)</p>
          <ResponsiveContainer width="100%" height={300}><LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} unit="$B" /><Tooltip formatter={(v: number) => `$${v}B`} /><Legend /><Line type="monotone" dataKey="production" name="Production ($B)" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 4 }} /></LineChart></ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: MeitY, ICEA Roadmap, PLI Dashboard</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">Electronics Industry Segment Split</h3>
        <p className="text-xs text-gray-500 mb-3">Click any segment for details</p>
        <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split('/')[0]} ${value}%`} labelLine={false} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: ICEA, MeitY ESDM Report 2024</p>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p><div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#dc2626] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">PLI Success</div><p className="text-xs text-gray-700">Mobile phone production crossed $55B+ under PLI. 130+ companies benefiting. India now exports iPhones worth $10B+ annually. Samsung, Apple, Dixon leading PLI claims.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Semiconductor Mission</div><p className="text-xs text-gray-700">Rs 76,000 Cr ($10B) government investment. Tata-PSMC 28nm fab in Dholera. Micron OSAT in Sanand. CG Power, Kaynes in advanced packaging. First chips by 2027.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Apple Make-in-India</div><p className="text-xs text-gray-700">14% of global iPhone production now in India. Foxconn Chennai, Tata Hosur, Pegatron Chennai. $25B production target CY2025. iPad assembly starting 2025.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Import Substitution</div><p className="text-xs text-gray-700">Electronics imports reduced from 78% (2014) to 35% (2024). Mobile phones near-zero imports. Focus now on components, displays, and semiconductors for full value chain.</p></div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: ICEA, MeitY, PLI Dashboard, Company Annual Reports</p>
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
      type: d?.type || 'ESDM',
      segment: p.segment,
      hq: d?.hq,
      founded: d?.founded,
      target: d?.expansion,
      highlight: d?.moat,
      extra: [
        { label: 'PLI', value: String(p.pli) },
        { label: 'Location', value: p.location },
      ],
    }
  })
  return (
    <PlayersBoard
      players={rows}
      config={{
        industryLabel: 'Electronics',
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
      {selectedPlayer && selected && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3><button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div></div><div className="space-y-3"><div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Plants & Capacity</span><p className="text-xs text-blue-800 mt-0.5">{selected.plants}</p></div><div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion Plans</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div><div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 15 Electronics & Semiconductor Companies in India</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for detailed profile</p>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Revenue (Cr)</th><th className="text-center py-2 px-2 font-bold text-navy">PLI</th><th className="text-center py-2 px-2 font-bold text-navy">Segment</th><th className="text-center py-2 px-2 font-bold text-navy">Location</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-red-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right">₹{p.revenue.toLocaleString()}</td><td className="py-2.5 px-2 text-center"><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${p.pli === 'Yes' ? 'bg-green-50 text-green-700' : p.pli === 'Applied' ? 'bg-amber-50 text-amber-700' : 'bg-gray-50 text-gray-500'}`}>{p.pli}</span></td><td className="py-2.5 px-2 text-center text-[10px]">{p.segment}</td><td className="py-2.5 px-2 text-center text-[10px]">{p.location}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View</span></td></tr>))}</tbody></table></div>
        <p className="text-[9px] text-gray-400 mt-3">Source: MeitY PLI Dashboard, Company Annual Reports, BSE/NSE FY24</p>
      </div>
    </div>
  )
}

// ===== RISK TAB =====
function RiskTab() {
  return <ElectronicsRiskAnalysis />
}

function RiskTabLegacy() {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'cases'>('insurable')
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">{(['insurable', 'cases'] as const).map(t => (<button key={t} onClick={() => setRiskSubTab(t)} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${riskSubTab === t ? 'bg-maroon text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t === 'insurable' ? 'Insurable Risks' : 'Case Studies & Best Practices'}</button>))}</div>
      {riskSubTab === 'insurable' && (<>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Key Insurable Risks — Electronics & Semiconductor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{riskData.insurable.map((r, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-navy">{r.risk}</span><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${r.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{r.severity}</span></div><p className="text-[10px] text-gray-600">{r.desc}</p><div className="mt-2 text-[9px] text-gray-400">Frequency: {r.frequency}</div></div>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Insurance Products for Electronics Manufacturers</h3>
          <div className="flex flex-wrap gap-2">{riskData.products.map((p, i) => (<span key={i} className="px-3 py-1.5 bg-red-50 text-red-800 rounded-lg text-xs font-semibold border border-red-100">{p}</span>))}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-3">Industry-Specific Add-Ons & Endorsements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">{riskData.addons.map((a, i) => (<div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"><CheckCircle2 size={12} className="text-green-600 shrink-0" /><span className="text-xs text-gray-700">{a}</span></div>))}</div>
          <p className="text-[9px] text-gray-400 mt-3">Source: IRDAI, GIC Re, ICEA Risk Framework</p>
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
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">ESD Protection Program</div><p className="text-xs text-gray-700">Anti-static flooring, wrist straps, ionizers at every workstation. ESD audit quarterly. Humidity control 40-60% RH. Grounded workbenches. ESD-safe packaging for all components. ANSI/ESD S20.20 certification.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Supply Chain Diversification</div><p className="text-xs text-gray-700">Dual/triple sourcing for critical components. 6-month safety stock for chips. Alternative supplier qualification programs. Nearshoring from Vietnam/Taiwan as China backup. Real-time supply chain visibility tools.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Fire Prevention (Lithium/PCB)</div><p className="text-xs text-gray-700">Lithium battery storage in fireproof rooms. Thermal monitoring systems. SMT reflow oven auto-shutdown. Nitrogen inerting for wave soldering. VESDA (Very Early Smoke Detection). FM Global certified suppression systems.</p></div>
            <div className="p-3 bg-green-50 rounded-lg"><div className="text-[10px] font-bold text-green-700 uppercase mb-1">Cyber Security (OT/IT)</div><p className="text-xs text-gray-700">Air-gapped design networks for semiconductor IP. Zero-trust OT networks. Regular penetration testing. SOC monitoring 24/7. Employee security training. NIST cybersecurity framework. Incident response plan tested quarterly.</p></div>
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
        <h3 className="text-lg font-bold text-navy mb-2">State-wise Electronics Manufacturing Share</h3>
        <p className="text-xs text-gray-500 mb-4">Click "Why?" for detailed analysis</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{geographyData.map((g, i) => (<div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-navy">{g.state}</span><span className="text-lg font-black text-maroon">{g.share}%</span></div><div className="w-full bg-gray-100 rounded-full h-2 mb-2"><div className="h-2 rounded-full bg-gradient-to-r from-red-500 to-red-700" style={{ width: `${(g.share / 22) * 100}%` }}></div></div><button onClick={() => setSelectedState(g.state)} className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-1 rounded-lg hover:bg-red-100 transition">Why? →</button></div>))}</div>
        <p className="text-[9px] text-gray-400 mt-3">Source: ICEA, MeitY, State Industrial Development Corp Reports 2024</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Electronics Manufacturing Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100"><div className="text-sm font-bold text-red-800 mb-1">Southern Belt (Chennai-Bangalore)</div><div className="text-2xl font-black text-red-900">40%</div><p className="text-[10px] text-red-700 mt-1">Apple/Foxconn/Tata Electronics axis. Sriperumbudur SIPCOT, Hosur, Electronic City Bangalore. Semiconductor design + manufacturing hub.</p></div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100"><div className="text-sm font-bold text-blue-800 mb-1">Northern Belt (Noida-Gurgaon)</div><div className="text-2xl font-black text-blue-900">21%</div><p className="text-[10px] text-blue-700 mt-1">Samsung Noida mega factory. Dixon HQ + 10 plants. Lava, Micromax. Greater Noida electronics cluster. Auto electronics in Gurgaon-Manesar.</p></div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100"><div className="text-sm font-bold text-purple-800 mb-1">Western Belt (Gujarat-Pune)</div><div className="text-2xl font-black text-purple-900">15%</div><p className="text-[10px] text-purple-700 mt-1">Tata semiconductor fab (Dholera). Micron OSAT (Sanand). Pune auto electronics cluster (Bosch, Continental). Emerging semiconductor corridor.</p></div>
        </div>
      </div>
      {selectedState && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Why {selectedState}?</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><div className="text-center"><div className="text-2xl font-black text-maroon">{geographyData.find(g => g.state === selectedState)?.share}%</div><div className="text-[10px] text-gray-500">Electronics Manufacturing Share</div></div></div><p className="text-sm text-gray-700 leading-relaxed">{geographyData.find(g => g.state === selectedState)?.reason}</p></div></div>)}
    </div>
  )
}

// ===== NEWS TAB =====
function NewsTab() {
  return <NewsFeed title="Electronics Industry News & Developments" items={newsData} />
}
