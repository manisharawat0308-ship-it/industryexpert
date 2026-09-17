import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Building2, Rocket
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, LabelList
} from 'recharts'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'

const COLORS = ['#B02A30', '#005B75', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#607D8B']

type StartupTab = 'overview' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot'

// ===== SOURCE METADATA =====
const DATA_META = {
  lastUpdated: 'June 2025',
  source: 'DPIIT, NASSCOM, Tracxn, Venture Intelligence, Company Reports'
}

// ===== OVERVIEW DATA =====
const globalComparison = [
  { country: 'USA', unicorns: 700 },
  { country: 'China', unicorns: 300 },
  { country: 'India', unicorns: 112 },
  { country: 'UK', unicorns: 50 },
  { country: 'Germany', unicorns: 30 },
  { country: 'Israel', unicorns: 48 },
  { country: 'France', unicorns: 28 },
]

const unicornTimeline = [
  { year: '2010', unicorns: 0 },
  { year: '2012', unicorns: 1 },
  { year: '2014', unicorns: 3 },
  { year: '2016', unicorns: 8 },
  { year: '2018', unicorns: 18 },
  { year: '2020', unicorns: 36 },
  { year: '2021', unicorns: 84 },
  { year: '2022', unicorns: 100 },
  { year: '2023', unicorns: 107 },
  { year: '2024', unicorns: 112 },
  { year: '2025E', unicorns: 125 },
  { year: '2027E', unicorns: 160 },
  { year: '2030E', unicorns: 200 },
]

const segmentData = [
  { segment: 'FinTech', share: 25, topStartups: 'PhonePe, Razorpay, Zerodha, CRED, Groww, Pine Labs' },
  { segment: 'E-commerce', share: 20, topStartups: 'Flipkart, Meesho, Nykaa, Lenskart, FirstCry, Udaan' },
  { segment: 'SaaS', share: 18, topStartups: 'Freshworks, Zoho, Chargebee, Postman, BrowserStack, Druva' },
  { segment: 'EdTech', share: 10, topStartups: "BYJU'S, upGrad, Unacademy, PhysicsWallah, Vedantu, Eruditus" },
  { segment: 'HealthTech', share: 10, topStartups: 'PharmEasy, Practo, 1mg, HealthifyMe, MFine, Innovaccer' },
  { segment: 'DeepTech', share: 8, topStartups: 'Krutrim AI, Sarvam AI, Ola Electric, Skyroot Aerospace, Pixxel' },
  { segment: 'Others', share: 9, topStartups: 'Ola, Swiggy, Zomato, Dream11, Delhivery, Cars24' },
]

// ===== PLAYERS DATA =====
const topStartups = [
  { name: 'Flipkart', hq: 'Bangalore', ceo: 'Kalyan Krishnamurthy', founded: 2007, valuation: '$40B', investors: 'Walmart, SoftBank, Tiger Global', moat: 'India\'s largest e-commerce â€” 500M+ users, marketplace + supply chain dominance' },
  { name: 'PhonePe', hq: 'Bangalore', ceo: 'Sameer Nigam', founded: 2015, valuation: '$12B', investors: 'Walmart, General Atlantic, Tiger Global', moat: '48% UPI market share, 550M users, insurance & wealth super-app' },
  { name: "BYJU'S", hq: 'Bangalore', ceo: 'Byju Raveendran', founded: 2011, valuation: '<$1B (was $22B)', investors: 'Prosus, Tiger Global, Sequoia', moat: 'Cautionary tale â€” governance collapse, NCLT insolvency proceedings' },
  { name: 'Swiggy', hq: 'Bangalore', ceo: 'Sriharsha Majety', founded: 2014, valuation: '$11.3B', investors: 'SoftBank, Prosus, Accel', moat: 'Food + quick commerce (Instamart), 250K+ restaurant partners' },
  { name: 'Ola', hq: 'Bangalore', ceo: 'Bhavish Aggarwal', founded: 2010, valuation: '$5B', investors: 'SoftBank, Temasek, Tiger Global', moat: 'EV transition â€” #1 electric scooter maker, gigafactory in TN' },
  { name: 'Razorpay', hq: 'Bangalore', ceo: 'Harshil Mathur', founded: 2014, valuation: '$7.5B', investors: 'Sequoia, GIC, Tiger Global, Y Combinator', moat: 'India\'s #1 payment gateway, 10M+ businesses, profitable since FY24' },
  { name: 'CRED', hq: 'Bangalore', ceo: 'Kunal Shah', founded: 2018, valuation: '$6.4B', investors: 'DST Global, Tiger Global, Sequoia', moat: 'Premium credit card users community, fintech services, brand trust' },
  { name: 'Zerodha', hq: 'Bangalore', ceo: 'Nithin Kamath', founded: 2010, valuation: '$3.6B', investors: 'Bootstrapped (zero external funding)', moat: 'India\'s largest broker by active users (12M+), profitable since day 1' },
  { name: 'Meesho', hq: 'Bangalore', ceo: 'Vidit Aatrey', founded: 2015, valuation: '$5B', investors: 'SoftBank, Fidelity, Prosus', moat: 'Social commerce for Tier 2-4 India, 150M+ MAU, zero-commission model' },
  { name: 'Dream11', hq: 'Mumbai', ceo: 'Harsh Jain', founded: 2008, valuation: '$8B', investors: 'Tiger Global, TPG, CVC Capital', moat: '65% fantasy sports market share, 200M+ users, IPL title sponsor' },
  { name: 'Delhivery', hq: 'Gurgaon', ceo: 'Sahil Barua', founded: 2011, valuation: '$5B (listed)', investors: 'Listed (NSE/BSE), SoftBank, Carlyle', moat: 'India\'s largest independent logistics, 18,000+ pin codes, tech-first' },
  { name: 'Zomato', hq: 'Gurgaon', ceo: 'Deepinder Goyal', founded: 2008, valuation: '$18B (listed)', investors: 'Listed (NSE/BSE), Ant Group, Tiger Global', moat: 'Food + Blinkit quick commerce, profitable, 20M+ monthly transacting users' },
  { name: 'Nykaa', hq: 'Mumbai', ceo: 'Falguni Nayar', founded: 2012, valuation: '$7B (listed)', investors: 'Listed (NSE/BSE), TPG, Fidelity', moat: 'India\'s #1 beauty platform, 5,000+ brands, owned + marketplace model' },
  { name: 'PolicyBazaar', hq: 'Gurgaon', ceo: 'Yashish Dahiya', founded: 2008, valuation: '$6B (listed)', investors: 'Listed (NSE/BSE), SoftBank, Tiger Global', moat: 'India\'s #1 insurance aggregator, 90%+ online insurance market share' },
  { name: 'upGrad', hq: 'Mumbai', ceo: 'Ronnie Screwvala', founded: 2015, valuation: '$2.5B', investors: 'Temasek, ETS, IFC', moat: 'India\'s largest online higher education platform, tie-ups with 100+ universities' },
]

// ===== RISK DATA =====
const insurableRisks = [
  { risk: 'Funding Dry-up', description: 'VC funding drought causing runway crisis and forced shutdowns', severity: 'Critical', probability: 'High', insuranceProduct: 'Business Interruption / Revenue Protection' },
  { risk: 'Regulatory Crackdown', description: 'Sudden policy changes (Angel Tax, DPDP Act, crypto ban) disrupting business models', severity: 'High', probability: 'Medium', insuranceProduct: 'Regulatory & Compliance Liability' },
  { risk: 'Data Breach / Cyber', description: 'Customer data theft, ransomware attacks on cloud infrastructure', severity: 'Critical', probability: 'High', insuranceProduct: 'Cyber Insurance / Data Breach Cover' },
  { risk: 'Founder Exit', description: 'Key founder leaves or is forced out, destabilizing operations and investor confidence', severity: 'High', probability: 'Medium', insuranceProduct: 'Key Person Insurance' },
  { risk: 'IP Litigation', description: 'Patent infringement, trade secret theft, code copyright disputes', severity: 'Medium', probability: 'Medium', insuranceProduct: 'E&O / Professional Indemnity' },
  { risk: 'Burn Rate Crisis', description: 'Unsustainable unit economics forcing emergency pivots, layoffs, shutdowns', severity: 'High', probability: 'High', insuranceProduct: 'D&O Liability + Employment Practices' },
]

const insuranceProducts = [
  { product: 'Directors & Officers (D&O)', coverage: 'Protects founders/board from personal liability for management decisions', avgPremium: 'â‚¹5-25L/year', relevance: 'Critical for all funded startups' },
  { product: 'Cyber Insurance', coverage: 'Data breach costs, ransomware, regulatory fines, business interruption', avgPremium: 'â‚¹3-50L/year', relevance: 'Essential for tech/data companies' },
  { product: 'Key Person Insurance', coverage: 'Compensates company if key founder/CTO becomes unavailable', avgPremium: 'â‚¹2-10L/year', relevance: 'Critical for founder-led startups' },
  { product: 'Errors & Omissions (E&O)', coverage: 'Protection against claims of inadequate work or negligent actions', avgPremium: 'â‚¹2-15L/year', relevance: 'SaaS, fintech, healthtech companies' },
  { product: 'Product Liability', coverage: 'Claims arising from product defects, data errors, algorithm bias', avgPremium: 'â‚¹3-20L/year', relevance: 'Consumer-facing tech products' },
  { product: 'Employment Practices Liability', coverage: 'Wrongful termination, discrimination, harassment claims during layoffs', avgPremium: 'â‚¹2-8L/year', relevance: 'High during mass layoff cycles' },
]

const caseStudies = [
  { title: "BYJU'S Governance Crisis (2023)", year: 2023, summary: "India's most valued startup ($22B) collapsed due to founder-dominated board, accounting irregularities, aggressive debt-funded acquisitions ($2.5B), and delayed audits. Entered NCLT insolvency. 15,000+ layoffs.", impact: 'Valuation crashed from $22B to near-zero. Investors (Prosus, Tiger Global) wrote off entire investments. EdTech sector credibility destroyed.', lesson: 'Board independence, financial transparency, and capital discipline are non-negotiable for scaled startups.', insuranceAngle: 'D&O insurance claims triggered. Key Person insurance relevant. Cyber insurance for data of 150M students.' },
  { title: "Zilingo Fraud (2022)", year: 2022, summary: "Singapore-based fashion-tech ($970M valuation) collapsed after CEO Ankiti Bose was found inflating revenue through circular transactions and taking unauthorized $40M debt facility without board approval.", impact: '$970M wiped out. 600+ jobs lost. Sequoia, Temasek lost $300M+. Criminal investigations in Singapore.', lesson: 'Revenue quality verification, independent financial audits, and active board fiduciary duty are essential.', insuranceAngle: 'D&O claims filed against board. E&O insurance for auditor failures. Fraud insurance relevant.' },
  { title: "BharatPe Founder Exit (2022)", year: 2022, summary: "Co-founder Ashneer Grover forced out after allegations of financial irregularities, fake vendor invoices, and misuse of company funds. Board-founder conflict played out publicly.", impact: 'Company valuation stagnated at $2.8B. Brand damage. Leadership vacuum for 6 months. Investor confidence shaken.', lesson: 'Founder vesting schedules, independent governance, and whistleblower mechanisms protect company value.', insuranceAngle: 'Key Person insurance triggered. D&O claims by investors. Employment Practices insurance for wrongful termination counter-claims.' },
]

// ===== GEOGRAPHY DATA =====
const geographyData = [
  { city: 'Bangalore', share: 35, startups: 38000, reason: 'India\'s Silicon Valley â€” 50+ unicorns, densest VC concentration, deep tech talent from IISc/IIMs, HSR Layout & Koramangala startup neighborhoods. Global tech companies provide talent pipeline.' },
  { city: 'Delhi NCR', share: 25, startups: 20000, reason: 'Proximity to government (policy access), 30M+ consumer market, Gurgaon Cyber City for consumer internet, strong angel investor network, Noida gaming & e-commerce clusters.' },
  { city: 'Mumbai', share: 20, startups: 22000, reason: 'Financial capital â€” access to capital markets, investment banks, HNI angels. BKC is the VC hub. Strong D2C ecosystem. Pune IT corridor for SaaS. Stock market proximity helps fintech.' },
  { city: 'Hyderabad', share: 8, startups: 12000, reason: 'T-Hub (India\'s largest incubator), pro-startup state government with TS-iPASS, HITEC City infrastructure, lower costs vs Bangalore, growing SaaS & healthtech ecosystem.' },
  { city: 'Pune', share: 5, startups: 8000, reason: 'IT corridor (Hinjewadi) for SaaS startups, strong engineering talent pool, lower operational costs, proximity to Mumbai VC ecosystem, growing B2B tech cluster.' },
  { city: 'Chennai', share: 4, startups: 9500, reason: 'India\'s SaaS capital â€” Freshworks ($3.5B), Zoho ($1B+ revenue), Chargebee, Kissflow all HQ\'d here. IIT Madras incubator is top-rated. OMR is the SaaS corridor.' },
  { city: 'Others', share: 3, startups: 10500, reason: 'Emerging hubs: Kerala (fintech), Jaipur (CarDekho), Ahmedabad (GIFT City fintech), Kolkata, Indore â€” driven by Startup India and state policies.' },
]

// ===== NEWS DATA =====
const newsData = [
  { id: 1, title: "Flipkart files DRHP for mega IPO â€” targets $40B+ valuation, India's largest startup listing", date: '2025-05-01', sentiment: 'positive', source: 'Moneycontrol' },
  { id: 2, title: "PhonePe crosses $15B monthly GMV â€” files for IPO at $12B+ valuation on Indian exchanges", date: '2025-04-22', sentiment: 'positive', source: 'LiveMint' },
  { id: 3, title: "AI/DeepTech startups raise $2B in H1 2025 â€” India emerges as global AI talent hub", date: '2025-06-01', sentiment: 'positive', source: 'NASSCOM' },
  { id: 4, title: "Startup India 2.0 announced â€” â‚¹10,000 Cr fund-of-funds, angel tax abolished, ESOP reforms", date: '2025-03-01', sentiment: 'positive', source: 'Startup India' },
  { id: 5, title: "BYJU'S NCLT insolvency proceedings â€” creditors seek liquidation of once $22B edtech giant", date: '2025-02-15', sentiment: 'negative', source: 'Economic Times' },
  { id: 6, title: "Mass layoffs continue â€” 15,000+ startup employees let go in Q1 2025 across 80+ companies", date: '2025-04-01', sentiment: 'negative', source: 'Inc42' },
  { id: 7, title: "Quick commerce war intensifies â€” Blinkit, Zepto, Instamart collectively burning $50M/month", date: '2025-01-25', sentiment: 'neutral', source: 'Mint' },
  { id: 8, title: "SEBI proposes stricter pre-IPO norms â€” 3 years audited financials mandatory for startup listings", date: '2025-05-15', sentiment: 'neutral', source: 'SEBI' },
]

// ===== MAIN COMPONENT =====
export default function StartupsDashboard() {
  const [activeTab, setActiveTab] = useState<StartupTab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tabs: { id: StartupTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Industry Overview', icon: Gauge },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
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
                <h1 className="text-lg font-bold text-navy">Startups & Tech Industry Dashboard</h1>
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
            <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 bg-navy/5 text-navy rounded-lg text-xs font-semibold hover:bg-navy/10 transition">
              <Download size={13} /> Export
            </button>
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
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'players' && <PlayersTab />}
        {activeTab === 'risk' && <RiskTab />}
        {activeTab === 'geography' && <GeographyTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'snapshot' && <CompanySnapshotTab currentIndustry={"fmcg" as any} />}
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

// ===== TAB 1: OVERVIEW =====
function OverviewTab() {
  const [selectedSegment, setSelectedSegment] = useState<typeof segmentData[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* Segment Popup */}
      {selectedSegment && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{selectedSegment.segment} â€” Top Startups</h3>
              <button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">Ã—</button>
            </div>
            <div className="p-4 bg-maroon/5 rounded-xl mb-3">
              <p className="text-2xl font-bold text-maroon">{selectedSegment.share}%</p>
              <p className="text-xs text-gray-500">of Indian startup ecosystem</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy mb-2">Leading Companies</h4>
              <p className="text-sm text-gray-700">{selectedSegment.topStartups}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #be185d 0%, #e11d48 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="relative grid grid-cols-2 md:grid-cols-5 gap-6 text-white">
          <div className="text-center">
            <div className="text-3xl font-black"><AnimatedCounter end={112} suffix="+" /></div>
            <div className="text-sm opacity-80 mt-1">Unicorns</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black">#3 Global</div>
            <div className="text-sm opacity-80 mt-1">Startup Ecosystem</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black"><AnimatedCounter end={10} prefix="$" suffix="B" /></div>
            <div className="text-sm opacity-80 mt-1">Funding (2024)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black">1,40,000+</div>
            <div className="text-sm opacity-80 mt-1">DPIIT Registered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black"><AnimatedCounter end={38000} suffix="+" /></div>
            <div className="text-sm opacity-80 mt-1">In Bangalore</div>
          </div>
        </div>
      </div>

      {/* Health Gauge */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
        <h3 className="text-lg font-bold text-navy mb-4">Ecosystem Health Score</h3>
        <HealthGauge score={72} label="Startup Ecosystem Health" size="lg" />
        <p className="text-xs text-gray-500 mt-3 text-center max-w-md">
          Score reflects funding recovery, IPO pipeline strength, governance improvements, offset by burn rate concerns and regulatory uncertainty.
        </p>
        <SourceFooter source="NASSCOM, Tracxn, DPIIT Composite Index" />
      </div>

      {/* Global Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Unicorn Count â€” Global Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={globalComparison} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontSize={11} />
            <YAxis dataKey="country" type="category" fontSize={11} width={80} />
            <Tooltip formatter={(v: number) => `${v} unicorns`} />
            <Bar dataKey="unicorns" name="Unicorns" radius={[0, 4, 4, 0]}>
              {globalComparison.map((entry, i) => (
                <Cell key={i} fill={entry.country === 'India' ? '#B02A30' : entry.country === 'USA' ? '#F99D27' : '#005B75'} />
              ))}
              <LabelList dataKey="unicorns" position="right" fontSize={10} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <SourceFooter source="CB Insights, Hurun Global Unicorn Index 2025" />
      </div>

      {/* Unicorn Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">India Unicorn Growth Timeline (2010 â†’ 2030)</h3>
        <p className="text-xs text-gray-500 mb-4">From 0 unicorns in 2010 to 200+ target by 2030</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={unicornTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={10} />
            <YAxis fontSize={11} domain={[0, 220]} />
            <Tooltip formatter={(v: number) => `${v} unicorns`} />
            <Line type="monotone" dataKey="unicorns" stroke="#B02A30" strokeWidth={3} name="Unicorns" dot={{ fill: '#B02A30', r: 5 }}>
              <LabelList dataKey="unicorns" position="top" fontSize={9} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
        <SourceFooter source="DPIIT, NASSCOM, Startup India" />
      </div>

      {/* Segment Pie Chart â€” Clickable */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Startup Segment Split</h3>
        <p className="text-xs text-gray-500 mb-4">Click any segment to see top startups in that category</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={segmentData} cx="50%" cy="50%" outerRadius={110} dataKey="share" nameKey="segment"
                label={({ segment, share }: any) => `${segment}: ${share}%`} labelLine
                onClick={(_: any, index: number) => setSelectedSegment(segmentData[index])}>
                {segmentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} className="cursor-pointer hover:opacity-80 transition" />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {segmentData.map((seg, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-maroon/5 transition"
                onClick={() => setSelectedSegment(seg)}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="text-sm font-semibold text-navy flex-1">{seg.segment}</span>
                <span className="text-sm font-bold text-maroon">{seg.share}%</span>
              </div>
            ))}
          </div>
        </div>
        <SourceFooter source="NASSCOM, Tracxn Sector Reports" />
      </div>

      {/* Key Takeaways */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Key Takeaways</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={16} className="text-green-600" /><span className="font-semibold text-sm text-navy">Ecosystem Growth</span></div>
            <p className="text-xs text-gray-600">From 500 startups (2016) to 1.4L+ (2025). India adds 8,000+ new startups monthly. 3rd largest ecosystem globally with fastest growth rate.</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-2"><TrendingUp size={16} className="text-orange-600" /><span className="font-semibold text-sm text-navy">Funding Winter Recovery</span></div>
            <p className="text-xs text-gray-600">After 75% decline from CY21 peak ($42B â†’ $9.6B in CY23), funding recovering to $10B+ in 2024. Profitability focus now mandatory for growth-stage.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-2"><Rocket size={16} className="text-blue-600" /><span className="font-semibold text-sm text-navy">IPO Pipeline</span></div>
            <p className="text-xs text-gray-600">15+ startups in IPO pipeline: Flipkart ($40B), PhonePe ($12B), Dream11 ($8B). Public markets now a viable exit route after Swiggy, Ola Electric listings.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <div className="flex items-center gap-2 mb-2"><Globe size={16} className="text-purple-600" /><span className="font-semibold text-sm text-navy">Global SaaS Hub</span></div>
            <p className="text-xs text-gray-600">India is #2 SaaS nation globally. Freshworks, Zoho, Chargebee, Postman serve global customers. Chennai is the SaaS capital with $12B+ in SaaS revenue.</p>
          </div>
        </div>
        <SourceFooter source="NASSCOM, DPIIT, Startup India, Tracxn" />
      </div>
    </div>
  )
}

// ===== TAB 2: PLAYERS & OWNERSHIP =====
function PlayersTab() {
  const [selectedPlayer, setSelectedPlayer] = useState<typeof topStartups[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* Player Popup */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">{selectedPlayer.name}</h3>
              <button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">Ã—</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-[10px] text-gray-500 uppercase font-semibold">HQ</p>
                <p className="text-sm font-bold text-navy">{selectedPlayer.hq}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-[10px] text-gray-500 uppercase font-semibold">CEO</p>
                <p className="text-sm font-bold text-navy">{selectedPlayer.ceo}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-[10px] text-gray-500 uppercase font-semibold">Founded</p>
                <p className="text-sm font-bold text-navy">{selectedPlayer.founded}</p>
              </div>
              <div className="p-3 bg-maroon/5 rounded-lg">
                <p className="text-[10px] text-gray-500 uppercase font-semibold">Valuation</p>
                <p className="text-sm font-bold text-maroon">{selectedPlayer.valuation}</p>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg mb-3">
              <p className="text-[10px] text-gray-500 uppercase font-semibold">Key Investors</p>
              <p className="text-sm text-blue-700 font-medium">{selectedPlayer.investors}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-[10px] text-gray-500 uppercase font-semibold">Competitive Moat</p>
              <p className="text-sm text-gray-700">{selectedPlayer.moat}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top 15 Startups Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 15 Indian Startups</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row to see detailed company information</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">#</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Company</th>
                <th className="text-left py-2 px-2 font-bold text-navy">HQ</th>
                <th className="text-left py-2 px-2 font-bold text-navy">CEO</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Founded</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Valuation</th>
                <th className="text-left py-2 px-2 font-bold text-navy">Key Investors</th>
              </tr>
            </thead>
            <tbody>
              {topStartups.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-maroon/5 cursor-pointer transition" onClick={() => setSelectedPlayer(s)}>
                  <td className="py-2.5 px-2 text-gray-500 font-semibold">{i + 1}</td>
                  <td className="py-2.5 px-2 font-bold text-navy">{s.name}</td>
                  <td className="py-2.5 px-2 text-gray-600">{s.hq}</td>
                  <td className="py-2.5 px-2 text-gray-600">{s.ceo}</td>
                  <td className="py-2.5 px-2 text-center">{s.founded}</td>
                  <td className="py-2.5 px-2 text-center font-bold text-maroon">{s.valuation}</td>
                  <td className="py-2.5 px-2 text-xs text-blue-700">{s.investors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceFooter source="Tracxn, Hurun India, Venture Intelligence, Company Reports" />
      </div>
    </div>
  )
}

// ===== TAB 3: RISK ANALYSIS =====
function RiskTab() {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'casestudies'>('insurable')
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* Case Study Popup */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-maroon">{selectedCase.title}</h3>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">Ã—</button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-bold text-navy mb-1">Summary</h4>
                <p className="text-sm text-gray-700">{selectedCase.summary}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <h4 className="text-sm font-bold text-red-700 mb-1">Business Impact</h4>
                <p className="text-sm text-gray-700">{selectedCase.impact}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="text-sm font-bold text-blue-700 mb-1">Key Lesson</h4>
                <p className="text-sm text-gray-700">{selectedCase.lesson}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="text-sm font-bold text-green-700 mb-1">Insurance Angle</h4>
                <p className="text-sm text-gray-700">{selectedCase.insuranceAngle}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2">
        <button onClick={() => setRiskSubTab('insurable')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${riskSubTab === 'insurable' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Insurable Risks
        </button>
        <button onClick={() => setRiskSubTab('casestudies')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${riskSubTab === 'casestudies' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Case Studies
        </button>
      </div>

      {riskSubTab === 'insurable' && (
        <div className="space-y-6">
          {/* Insurable Risks Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-red-500" /> Key Insurable Risks for Startups</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-navy/20">
                    <th className="text-left py-2 px-2 font-bold text-navy">Risk</th>
                    <th className="text-left py-2 px-2 font-bold text-navy">Description</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Severity</th>
                    <th className="text-center py-2 px-2 font-bold text-navy">Probability</th>
                    <th className="text-left py-2 px-2 font-bold text-navy">Insurance Product</th>
                  </tr>
                </thead>
                <tbody>
                  {insurableRisks.map((r, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-2.5 px-2 font-semibold text-navy">{r.risk}</td>
                      <td className="py-2.5 px-2 text-gray-600 text-xs">{r.description}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.severity === 'Critical' ? 'text-red-700 bg-red-100' : r.severity === 'High' ? 'text-orange-700 bg-orange-100' : 'text-yellow-700 bg-yellow-100'}`}>{r.severity}</span>
                      </td>
                      <td className="py-2.5 px-2 text-center text-xs font-semibold">{r.probability}</td>
                      <td className="py-2.5 px-2 text-xs text-blue-700 font-medium">{r.insuranceProduct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SourceFooter source="IRDAI, ICICI Lombard Risk Assessment, Industry Reports" />
          </div>

          {/* Insurance Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Shield size={18} className="text-green-600" /> Recommended Insurance Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insuranceProducts.map((p, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-maroon/20 transition">
                  <h4 className="font-bold text-sm text-navy mb-2">{p.product}</h4>
                  <p className="text-xs text-gray-600 mb-2">{p.coverage}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <span className="text-[10px] text-gray-500 font-semibold">Avg Premium: <span className="text-navy">{p.avgPremium}</span></span>
                    <span className="text-[10px] text-maroon font-bold">{p.relevance}</span>
                  </div>
                </div>
              ))}
            </div>
            <SourceFooter source="IRDAI, ICICI Lombard Product Portfolio" />
          </div>
        </div>
      )}

      {riskSubTab === 'casestudies' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2"><CloudRain size={18} className="text-blue-500" /> Risk Case Studies</h3>
            <p className="text-xs text-gray-500 mb-4">Click any case study to see detailed analysis</p>
            <div className="space-y-4">
              {caseStudies.map((cs, i) => (
                <div key={i} className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-maroon/30 cursor-pointer transition hover:shadow-md"
                  onClick={() => setSelectedCase(cs)}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-navy">{cs.title}</h4>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">{cs.year}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{cs.summary}</p>
                  <p className="text-xs text-maroon font-semibold">Click to view full analysis â†’</p>
                </div>
              ))}
            </div>
            <SourceFooter source="NCLT, SEBI, Media Investigations, Investor Reports" />
          </div>
        </div>
      )}
    </div>
  )
}

// ===== TAB 4: GEOGRAPHY =====
function GeographyTab() {
  const [selectedCity, setSelectedCity] = useState<typeof geographyData[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* City "Why?" Popup */}
      {selectedCity && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCity(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">Why {selectedCity.city}?</h3>
              <button onClick={() => setSelectedCity(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">Ã—</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-maroon/5 rounded-lg text-center">
                <p className="text-2xl font-bold text-maroon">{selectedCity.share}%</p>
                <p className="text-[10px] text-gray-500">Ecosystem Share</p>
              </div>
              <div className="p-3 bg-navy/5 rounded-lg text-center">
                <p className="text-2xl font-bold text-navy">{selectedCity.startups.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">Startups</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <h4 className="text-sm font-bold text-navy mb-2">Why this city is a startup hub:</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedCity.reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Geography Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Startup Hub Distribution â€” City-wise</h3>
        <p className="text-xs text-gray-500 mb-4">Click any bar to see why that city is a startup hub</p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={geographyData} layout="vertical"
            onClick={(data: any) => { if (data && data.activePayload) setSelectedCity(data.activePayload[0]?.payload) }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontSize={11} unit="%" />
            <YAxis dataKey="city" type="category" fontSize={11} width={100} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Bar dataKey="share" name="Ecosystem Share %" radius={[0, 4, 4, 0]} cursor="pointer">
              {geographyData.map((entry, i) => (
                <Cell key={i} fill={entry.city === 'Bangalore' ? '#B02A30' : entry.city === 'Delhi NCR' ? '#005B75' : entry.city === 'Mumbai' ? '#F99D27' : '#4CAF50'} />
              ))}
              <LabelList dataKey="share" position="right" fontSize={10} formatter={(v: number) => `${v}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <SourceFooter source="DPIIT, Startup India, Tracxn" />
      </div>

      {/* City Table with Why? buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Detailed City-wise Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="text-left py-2 px-2 font-bold text-navy">City</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Share (%)</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Startups</th>
                <th className="text-center py-2 px-2 font-bold text-navy">Insight</th>
              </tr>
            </thead>
            <tbody>
              {geographyData.map((g, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-maroon/5 transition">
                  <td className="py-2.5 px-2 font-semibold text-navy">{g.city}</td>
                  <td className="py-2.5 px-2 text-center font-bold text-maroon">{g.share}%</td>
                  <td className="py-2.5 px-2 text-center">{g.startups.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-center">
                    <button onClick={() => setSelectedCity(g)}
                      className="text-xs font-bold text-white bg-maroon px-3 py-1.5 rounded-lg shadow-sm hover:bg-maroon/80 transition">
                      Why?
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceFooter source="DPIIT, State Innovation Councils, Tracxn" />
      </div>
    </div>
  )
}

// ===== TAB 5: NEWS =====
function NewsTab() {
  const getSentimentBadge = (sentiment: string) => {
    if (sentiment === 'positive') return 'text-green-700 bg-green-100'
    if (sentiment === 'negative') return 'text-red-700 bg-red-100'
    return 'text-gray-700 bg-gray-100'
  }

  const getSentimentLabel = (sentiment: string) => {
    if (sentiment === 'positive') return 'â–² Positive'
    if (sentiment === 'negative') return 'â–¼ Negative'
    return 'â— Neutral'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-navy flex items-center gap-2"><Newspaper size={18} className="text-navy" /> Latest Startup News & Sentiment</h3>
        <span className="text-[10px] text-gray-400 font-medium">Updated: {DATA_META.lastUpdated}</span>
      </div>
      <div className="space-y-4">
        {newsData.map((n) => (
          <div key={n.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-maroon/20 transition">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSentimentBadge(n.sentiment)}`}>{getSentimentLabel(n.sentiment)}</span>
              <span className="text-xs text-gray-500">{n.date} | {n.source}</span>
            </div>
            <h4 className="font-bold text-navy mb-2">{n.title}</h4>
          </div>
        ))}
      </div>
      <SourceFooter source="Inc42, YourStory, Economic Times, Mint, NASSCOM, SEBI" />
    </div>
  )
}
