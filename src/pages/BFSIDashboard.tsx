import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, Globe, Shield, User,
  Settings, Download, RefreshCw, Clock, ShieldAlert, Users,
  MapPin, Newspaper, AlertTriangle, CheckCircle2, Flame,
  CloudRain, Zap, Calendar, Tag, Building2, Landmark
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, LabelList
} from 'recharts'
import CompanySnapshotTab from '../components/CompanySnapshotTab'
import AnimatedCounter from '../components/AnimatedCounter'
import HealthGauge from '../components/HealthGauge'

const COLORS = ['#4338ca', '#B02A30', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722', '#0369a1', '#795548']

type BFSITab = 'overview' | 'players' | 'risk' | 'geography' | 'news' | 'snapshot'

// ===== OVERVIEW DATA =====
const segmentData = [
  { name: 'Commercial Banking', value: 38, color: '#4338ca' },
  { name: 'Insurance', value: 18, color: '#B02A30' },
  { name: 'NBFCs', value: 16, color: '#F99D27' },
  { name: 'Asset Management (MF)', value: 12, color: '#4CAF50' },
  { name: 'Fintech/Payments', value: 10, color: '#9C27B0' },
  { name: 'Capital Markets', value: 6, color: '#0369a1' },
]

const segmentDetails: Record<string, { subtypes: { name: string; share: string }[]; desc: string }> = {
  'Commercial Banking': { subtypes: [{ name: 'PSU Banks (SBI, PNB, BOB)', share: '58%' }, { name: 'Private Banks (HDFC, ICICI, Kotak)', share: '32%' }, { name: 'Foreign Banks (Citi, HSBC, StanChart)', share: '5%' }, { name: 'Small Finance Banks', share: '3%' }, { name: 'Payments Banks', share: '2%' }], desc: 'Total assets $2.3T. 12 PSU + 22 private + 46 foreign banks. HDFC Bank merger (2023) created India\'s largest private bank. NPA at 12-year low of 2.8%.' },
  'Insurance': { subtypes: [{ name: 'Life Insurance (LIC, SBI Life, HDFC Life)', share: '65%' }, { name: 'General Insurance (New India, ICICI Lombard)', share: '25%' }, { name: 'Health Insurance (Star, Niva)', share: '8%' }, { name: 'Reinsurance (GIC Re)', share: '2%' }], desc: 'Insurance penetration 4.2% vs global 6.8%. LIC alone has 60% life market share. General insurance growing 15%+ CAGR. Health insurance fastest segment.' },
  'NBFCs': { subtypes: [{ name: 'Housing Finance (HDFC, LIC HFL, PNB Housing)', share: '35%' }, { name: 'Vehicle Finance (Shriram, M&M Finance)', share: '25%' }, { name: 'Micro Finance (Bandhan, CreditAccess)', share: '20%' }, { name: 'Gold Loans (Muthoot, Manappuram)', share: '12%' }, { name: 'Consumer Lending', share: '8%' }], desc: '~10,000 NBFCs registered. Top 50 account for 75% of assets. RBI tightening regulations post-IL&FS crisis. Important for financial inclusion.' },
  'Asset Management (MF)': { subtypes: [{ name: 'Equity Funds', share: '45%' }, { name: 'Debt/Fixed Income', share: '25%' }, { name: 'Hybrid Funds', share: '15%' }, { name: 'Index/ETF', share: '10%' }, { name: 'Others (ELSS, Liquid)', share: '5%' }], desc: 'AUM crossed Rs 65 Lakh Cr. SIP inflows Rs 20,000+ Cr/month. 44 AMCs. SBI MF, HDFC MF, ICICI Pru MF are top 3. Retail participation at all-time high.' },
  'Fintech/Payments': { subtypes: [{ name: 'UPI (PhonePe, GPay, Paytm)', share: '55%' }, { name: 'Digital Lending (KreditBee, MoneyTap)', share: '20%' }, { name: 'InsurTech (PolicyBazaar, Digit)', share: '10%' }, { name: 'WealthTech (Zerodha, Groww)', share: '10%' }, { name: 'Neo-Banking', share: '5%' }], desc: 'India processes 16B+ UPI transactions/month - world\'s largest real-time payment system. PhonePe (48%) + GPay (35%) dominate. $3T+ annual digital payment value.' },
  'Capital Markets': { subtypes: [{ name: 'Stock Broking (Zerodha, Angel One)', share: '40%' }, { name: 'Investment Banking (Kotak IB, Axis Cap)', share: '25%' }, { name: 'Commodity Trading', share: '15%' }, { name: 'Depository (CDSL, NSDL)', share: '10%' }, { name: 'Credit Rating (CRISIL, ICRA)', share: '10%' }], desc: '14 Cr+ demat accounts. NSE is world\'s largest derivatives exchange by volume. Zerodha disrupted with zero-brokerage model. SEBI regulates.' },
}

const timelineData = [
  { year: '1991', actual: 0.3, capacity: null },
  { year: '1995', actual: 0.5, capacity: null },
  { year: '2000', actual: 0.8, capacity: null },
  { year: '2005', actual: 1.2, capacity: null },
  { year: '2010', actual: 1.5, capacity: null },
  { year: '2015', actual: 1.8, capacity: null },
  { year: '2020', actual: 2.0, capacity: 2.0 },
  { year: '2023', actual: 2.3, capacity: 2.3 },
  { year: '2025', actual: 2.6, capacity: 2.6 },
  { year: '2028', actual: null, capacity: 3.5 },
  { year: '2030', actual: null, capacity: 4.5 },
]

const globalComparison = [
  { country: 'USA', assets: 23.0 },
  { country: 'China', assets: 18.5 },
  { country: 'Japan', assets: 9.2 },
  { country: 'UK', assets: 8.5 },
  { country: 'France', assets: 7.8 },
  { country: 'Germany', assets: 7.2 },
  { country: 'Canada', assets: 5.5 },
  { country: 'India', assets: 2.6 },
  { country: 'Brazil', assets: 2.1 },
  { country: 'Australia', assets: 1.8 },
]

const supplyData = [
  { year: 'FY20', credit: 100, deposits: 130, npa: 8.5, upi: 2.1 },
  { year: 'FY21', credit: 108, deposits: 145, npa: 7.3, upi: 4.2 },
  { year: 'FY22', credit: 120, deposits: 158, npa: 5.8, upi: 7.4 },
  { year: 'FY23', credit: 138, deposits: 172, npa: 3.9, upi: 10.6 },
  { year: 'FY24', credit: 158, deposits: 188, npa: 3.2, upi: 13.5 },
  { year: 'FY25', credit: 175, deposits: 205, npa: 2.8, upi: 16.2 },
]

// ===== PLAYERS DATA =====
const playersData = [
  { rank: 1, name: 'SBI', assets: '₹61 Lakh Cr', type: 'PSU Bank', segment: 'Universal Banking', npa: '2.1%' },
  { rank: 2, name: 'HDFC Bank', assets: '₹35 Lakh Cr', type: 'Private Bank', segment: 'Retail + Corporate', npa: '1.2%' },
  { rank: 3, name: 'ICICI Bank', assets: '₹20 Lakh Cr', type: 'Private Bank', segment: 'Universal Banking', npa: '2.0%' },
  { rank: 4, name: 'LIC', assets: '₹45 Lakh Cr', type: 'Life Insurance', segment: 'Life Insurance', npa: 'N/A' },
  { rank: 5, name: 'Bank of Baroda', assets: '₹14 Lakh Cr', type: 'PSU Bank', segment: 'Corporate + Retail', npa: '2.9%' },
  { rank: 6, name: 'Kotak Mahindra', assets: '₹7 Lakh Cr', type: 'Private Bank', segment: 'Premium Banking', npa: '1.4%' },
  { rank: 7, name: 'Axis Bank', assets: '₹12 Lakh Cr', type: 'Private Bank', segment: 'Corporate + Retail', npa: '1.5%' },
  { rank: 8, name: 'PNB', assets: '₹13 Lakh Cr', type: 'PSU Bank', segment: 'Retail Banking', npa: '4.8%' },
  { rank: 9, name: 'Bajaj Finance', assets: '₹3.5 Lakh Cr', type: 'NBFC', segment: 'Consumer + SME Lending', npa: '0.9%' },
  { rank: 10, name: 'SBI Life', assets: '₹3.8 Lakh Cr', type: 'Life Insurance', segment: 'Life Insurance', npa: 'N/A' },
  { rank: 11, name: 'ICICI Lombard', assets: '₹55,000 Cr', type: 'General Insurance', segment: 'General Insurance', npa: 'N/A' },
  { rank: 12, name: 'HDFC Life', assets: '₹2.8 Lakh Cr', type: 'Life Insurance', segment: 'Life Insurance', npa: 'N/A' },
  { rank: 13, name: 'SBI MF', assets: '₹10 Lakh Cr AUM', type: 'AMC', segment: 'Mutual Fund', npa: 'N/A' },
  { rank: 14, name: 'PhonePe', assets: '$12B Valuation', type: 'Fintech', segment: 'UPI Payments', npa: 'N/A' },
  { rank: 15, name: 'Zerodha', assets: '₹5,000 Cr Revenue', type: 'Fintech', segment: 'Stock Broking', npa: 'N/A' },
]

const playerDetails: Record<string, { hq: string; ceo: string; founded: string; type: string; branches: string; expansion: string; moat: string }> = {
  'SBI': { hq: 'Mumbai', ceo: 'C.S. Setty', founded: '1955 (origin 1806)', type: 'PSU Bank', branches: '22,000+ branches, 65,000+ ATMs', expansion: 'YONO digital platform (6 Cr+ users). Targeting Rs 50 Lakh Cr advances by FY27. International presence in 30 countries.', moat: 'India\'s largest bank by every metric. Government backing. Deepest rural reach. Only Indian bank in Global Systemically Important Banks (G-SIB) list.' },
  'HDFC Bank': { hq: 'Mumbai', ceo: 'Sashidhar Jagdishan', founded: '1994 (merged with HDFC 2023)', type: 'Private Bank', branches: '9,000+ branches', expansion: 'Post-HDFC merger: largest private bank globally by market cap outside China. Targeting 12,000 branches by FY27. Semi-urban/rural expansion.', moat: 'Best-in-class asset quality (1.2% NPA). Highest ROE (17%+). Technology leadership. HDFC merger gave massive home loan book.' },
  'ICICI Bank': { hq: 'Mumbai', ceo: 'Sandeep Bakhshi', founded: '1994', type: 'Private Bank', branches: '6,500+ branches', expansion: 'Digital-first strategy. iMobile app (5 Cr+ users). Growing retail book at 20%+ CAGR. Amazon-ICICI credit card most popular.', moat: 'Complete turnaround from NPA crisis (2018). Now best-in-class underwriting. Strong corporate + retail franchise. Insurance + AMC subsidiaries.' },
  'LIC': { hq: 'Mumbai', ceo: 'Siddhartha Mohanty', founded: '1956', type: 'Life Insurance (PSU)', branches: '4,700+ branches, 13 Lakh+ agents', expansion: 'Digital transformation post-IPO. Targeting 15% market share in new business premium (from 60% erosion). Banca + digital channels.', moat: 'Brand trust built over 68 years. 28 Cr+ policies. Largest institutional investor in India (holds 4% of NSE market cap). Government guarantee on policies.' },
  'Bajaj Finance': { hq: 'Pune', ceo: 'Rajeev Jain', founded: '1987 (transformed 2007)', type: 'NBFC', branches: '3,800+ branches', expansion: 'Targeting Rs 5 Lakh Cr AUM by FY27. New verticals: Broking, AMC, Health insurance. Digital ecosystem with 8 Cr+ customers.', moat: 'Highest ROE in NBFC space (22%+). Cross-sell engine (5+ products/customer). Data-driven underwriting. Only NBFC with bank-like credit cost.' },
}

const marketShareTrend = [
  { company: 'SBI', fy23: 22.5, fy25: 23.0, change: +0.5 },
  { company: 'HDFC Bank', fy23: 11.0, fy25: 15.2, change: +4.2 },
  { company: 'ICICI Bank', fy23: 8.5, fy25: 9.0, change: +0.5 },
  { company: 'Kotak + Axis', fy23: 7.8, fy25: 8.2, change: +0.4 },
  { company: 'PSU Banks (others)', fy23: 32.0, fy25: 28.5, change: -3.5 },
  { company: 'Others', fy23: 18.2, fy25: 16.1, change: -2.1 },
]

// ===== GEOGRAPHY DATA =====
const geographyData = [
  { state: 'Maharashtra', share: 28, branches: 18500, majorPlayers: 'SBI, HDFC Bank, ICICI, Kotak, Axis, LIC, BSE/NSE', reason: 'Mumbai = India\'s financial capital. RBI HQ, SEBI, BSE, NSE all headquartered here. BKC is banking hub. Maximum corporate banking activity. Highest premium collection for insurance. Nariman Point + Lower Parel financial district.' },
  { state: 'Delhi NCR', share: 15, branches: 12000, majorPlayers: 'SBI, PNB, Canara, HDFC, ICICI, Yes Bank', reason: 'Government banking concentrated here (all PSU bank head offices functionally operate from Delhi). Largest retail banking market. Gurgaon is NBFC/Fintech hub (Bajaj Finance, Paytm, PolicyBazaar). High NRI remittance inflow.' },
  { state: 'Karnataka', share: 10, branches: 8500, majorPlayers: 'Canara Bank, Vijaya Bank (merged), HDFC Bank, RBI Bangalore', reason: 'Bangalore is fintech capital (PhonePe, Razorpay, CRED, Jupiter, Zerodha). Canara Bank originated here. Strong IT salary-driven retail banking demand. RBI has regional office. Insurance back-office operations hub.' },
  { state: 'Tamil Nadu', share: 8, branches: 9200, majorPlayers: 'Indian Bank, IOB, SBI, ICICI, Federal Bank', reason: 'Indian Bank and IOB headquartered in Chennai. Strong gold loan market (Muthoot, Manappuram originated in TN/Kerala). High financial literacy. Largest number of bank branches per capita in South.' },
  { state: 'Gujarat', share: 7, branches: 7500, majorPlayers: 'Bank of Baroda, Dena (merged), SBI, HDFC', reason: 'Bank of Baroda headquartered in Vadodara. Strong SME/MSME banking market. Diamond/textile trade finance in Surat. GIFT City (Gujarat International Finance Tec-City) is India\'s first IFSC - international banking hub.' },
  { state: 'West Bengal', share: 6, branches: 7000, majorPlayers: 'SBI, UCO Bank, United Bank (merged), Bandhan Bank', reason: 'UCO Bank and United Bank originated here. Bandhan Bank (micro-finance turned bank) HQ in Kolkata. Strong tea/jute trade finance. Eastern India\'s largest banking market. High chit fund/cooperative banking activity.' },
  { state: 'Kerala', share: 5, branches: 6800, majorPlayers: 'Federal Bank, South Indian Bank, CSB, Muthoot, Manappuram', reason: 'Highest financial literacy in India. Federal Bank, South Indian Bank, CSB Bank all headquartered here. Gold loan capital of India (Muthoot + Manappuram from Thrissur). Highest NRI deposits (Gulf remittance). Banking penetration 95%+.' },
  { state: 'Uttar Pradesh', share: 5, branches: 15000, majorPlayers: 'SBI, PNB, Bank of Baroda, Union Bank', reason: 'Largest number of bank branches (by state population). Maximum financial inclusion beneficiaries (Jan Dhan). Lucknow emerging as back-office hub. Massive retail lending opportunity (230M population). NBFC/MFI deep penetration for rural credit.' },
]

// ===== MAIN COMPONENT =====
export default function BFSIDashboard() {
  const [activeTab, setActiveTab] = useState<BFSITab>('overview')
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const tabs: { id: BFSITab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Industry Overview', icon: Gauge },
    { id: 'players', label: 'Players & Ownership', icon: Users },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'geography', label: 'Geography', icon: MapPin },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'snapshot', label: 'Company Snapshot', icon: Building2 },
  ]

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/hub')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"><ArrowLeft size={14} /> Back to Hub</button>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-8" />
              <div><h1 className="text-sm font-extrabold text-navy">BFSI & Financial Services</h1><p className="text-[10px] text-gray-500 font-medium">ICICI Lombard | Risk & Analytics</p></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && <button className="flex items-center gap-1 px-3 py-1.5 bg-orange/10 text-orange rounded-lg text-xs font-bold"><Settings size={13} /> Admin</button>}
            <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 bg-navy/5 text-navy rounded-lg text-xs font-semibold hover:bg-navy/10 transition"><Download size={13} /> Export</button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              {isAdmin ? <Shield size={13} className="text-maroon" /> : <User size={13} className="text-navy" />}
              <span className="text-xs font-bold">{username}</span>
            </div>
          </div>
        </div>
      </header>
      <nav className="bg-white border-b border-gray-100 sticky top-[48px] z-40 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6"><div className="flex items-center gap-1 py-2 overflow-x-auto">
          {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-maroon text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}><tab.icon size={14} /> {tab.label}</button>))}
        </div></div>
      </nav>
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
      <div className="relative bg-gradient-to-r from-[#4338ca] to-[#6366f1] rounded-2xl p-7 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative">
          <h2 className="text-2xl font-black">India BFSI & Financial Services</h2>
          <p className="text-sm text-white/70 mt-1 mb-4">$2.6 Trillion banking assets | 4.2% insurance penetration | 16B+ UPI txns/month | 14 Cr demat accounts</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">$<AnimatedCounter end={2.6} decimals={1} />T</div><div className="text-[10px] text-white/70 mt-0.5">Banking Assets</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black">#<AnimatedCounter end={5} /></div><div className="text-[10px] text-white/70 mt-0.5">Global Rank</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={16} />B+</div><div className="text-[10px] text-white/70 mt-0.5">UPI Txns/Month</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={2.8} decimals={1} />%</div><div className="text-[10px] text-white/70 mt-0.5">Gross NPA (Lowest in 12 yrs)</div></div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10"><div className="text-2xl font-black"><AnimatedCounter end={52} />Cr</div><div className="text-[10px] text-white/70 mt-0.5">Jan Dhan Accounts</div></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><HealthGauge score={85} label="BFSI Industry Health" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Global Banking Assets ($Trillion, 2024)</h3>
          <p className="text-xs text-gray-500 mb-3">India is 8th largest banking system globally</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={globalComparison} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="$T" /><YAxis dataKey="country" type="category" fontSize={10} width={70} /><Tooltip formatter={(v: number) => `$${v}T`} /><Bar dataKey="assets" radius={[0, 4, 4, 0]}>{globalComparison.map((e, i) => <Cell key={i} fill={e.country === 'India' ? '#f37021' : e.country === 'USA' ? '#B02A30' : '#4338ca'} />)}<LabelList dataKey="assets" position="right" fontSize={9} formatter={(v: number) => `$${v}T`} /></Bar></BarChart>
          </ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: BIS, RBI Annual Report 2024-25</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">India Banking Assets Growth ($T)</h3>
          <p className="text-xs text-gray-500 mb-3">$0.3T (1991) to $2.6T (2025) - target $4.5T by 2030</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} unit="$T" /><Tooltip /><Legend /><Line type="monotone" dataKey="actual" name="Actual" stroke="#4338ca" strokeWidth={2.5} dot={{ r: 5, fill: '#4338ca' }} connectNulls={false} /><Line type="monotone" dataKey="capacity" name="Projected" stroke="#f37021" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 4, fill: '#f37021' }} connectNulls={false} /></LineChart>
          </ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: RBI, India Brand Equity Foundation (IBEF)</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">BFSI Segment Split</h3>
          <p className="text-xs text-gray-500 mb-3">Click any segment for details</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart><Pie data={segmentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name.split(' ')[0]} ${value}%`} labelLine={false} onClick={(_, i) => setSelectedSegment(segmentData[i].name)} cursor="pointer">{segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">Credit Growth + NPA + UPI Trend</h3>
          <p className="text-xs text-gray-500 mb-3">Credit growth accelerating while NPA declining - healthiest in a decade</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={supplyData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="year" fontSize={10} /><YAxis fontSize={10} /><Tooltip /><Legend /><Line type="monotone" dataKey="credit" name="Credit (Lakh Cr)" stroke="#4338ca" strokeWidth={2} dot={{ r: 3 }} /><Line type="monotone" dataKey="deposits" name="Deposits (Lakh Cr)" stroke="#4CAF50" strokeWidth={2} dot={{ r: 3 }} /><Line type="monotone" dataKey="upi" name="UPI (B txns/month)" stroke="#f37021" strokeWidth={2} dot={{ r: 3 }} /></LineChart>
          </ResponsiveContainer>
          <p className="text-[9px] text-gray-400 mt-1">Source: RBI, NPCI Monthly Reports</p>
        </div>
      </div>
      {selectedSegment && segmentDetails[selectedSegment] && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSegment(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedSegment}</h3><button onClick={() => setSelectedSegment(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div>
            <p className="text-xs text-gray-600 mb-3">{segmentDetails[selectedSegment].desc}</p>
            <div className="space-y-2">{segmentDetails[selectedSegment].subtypes.map((s, i) => (<div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs font-semibold text-gray-700">{s.name}</span><span className="text-xs font-bold text-maroon">{s.share}</span></div>))}</div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-[#4338ca] border border-gray-100 p-6">
        <h4 className="text-sm font-bold text-navy mb-3">Key Takeaways - India BFSI</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Asset Quality</div><p className="text-xs text-gray-700">NPA at 2.8% - 12-year low. PSU banks cleaned up Rs 10 Lakh Cr bad loans since 2017 via IBC/NCLT.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Digital Disruption</div><p className="text-xs text-gray-700">UPI processes $3T+/year. India Stack (Aadhaar + UPI + ONDC) is world's most advanced digital infra.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Credit Headroom</div><p className="text-xs text-gray-700">Credit-to-GDP at 55% vs China 180%, USA 200%. Massive lending growth potential especially in retail/MSME.</p></div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Insurance Gap</div><p className="text-xs text-gray-700">Penetration 4.2% vs global 6.8%. Protection gap estimated at $1.4T. Huge opportunity in health + term life.</p></div>
        </div>
        <p className="text-[9px] text-gray-400 mt-3">Sources: RBI Annual Report, IRDAI, SEBI, NPCI, Boston Consulting Group India Report 2025</p>
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
      {selectedPlayer && selected && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">{selectedPlayer}</h3><button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="grid grid-cols-2 gap-3 mb-4"><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">CEO</span><span className="text-xs font-bold text-navy">{selected.ceo}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div><div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Type</span><span className="text-xs font-bold text-navy">{selected.type}</span></div></div><div className="space-y-3"><div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><span className="text-[9px] font-bold text-blue-700 uppercase">Branches/Network</span><p className="text-xs text-blue-800 mt-0.5">{selected.branches}</p></div><div className="p-3 bg-green-50 rounded-xl border border-green-100"><span className="text-[9px] font-bold text-green-700 uppercase">Expansion</span><p className="text-xs text-green-800 mt-0.5">{selected.expansion}</p></div><div className="p-3 bg-orange-50 rounded-xl border border-orange-100"><span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Moat</span><p className="text-xs text-orange-800 mt-0.5">{selected.moat}</p></div></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Top 15 BFSI Players</h3>
        <p className="text-xs text-gray-500 mb-4">Click any row for detailed profile</p>
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b-2 border-navy/20"><th className="text-left py-2 px-2 font-bold text-navy">#</th><th className="text-left py-2 px-2 font-bold text-navy">Company</th><th className="text-right py-2 px-2 font-bold text-navy">Assets/Size</th><th className="text-center py-2 px-2 font-bold text-navy">Type</th><th className="text-left py-2 px-2 font-bold text-navy">Segment</th><th className="text-center py-2 px-2 font-bold text-navy">NPA/Health</th><th className="text-center py-2 px-2 font-bold text-navy">Detail</th></tr></thead><tbody>{playersData.map((p) => (<tr key={p.rank} className="border-b border-gray-50 hover:bg-indigo-50/30 cursor-pointer transition" onClick={() => setSelectedPlayer(p.name)}><td className="py-2.5 px-2 font-bold text-maroon">{p.rank}</td><td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td><td className="py-2.5 px-2 text-right font-bold">{p.assets}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">{p.type}</span></td><td className="py-2.5 px-2 text-gray-600">{p.segment}</td><td className="py-2.5 px-2 text-center font-semibold">{p.npa}</td><td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View</span></td></tr>))}</tbody></table></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-2">Market Share Movement — Banking (FY23 to FY25)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{marketShareTrend.map((c, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"><div className="flex-1"><div className="text-sm font-bold text-navy">{c.company}</div><div className="flex items-center gap-2 mt-1"><div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#4338ca] to-[#f37021]" style={{ width: `${c.fy25 * 3.5}%` }}></div></div><span className="text-xs font-bold text-navy w-12 text-right">{c.fy25}%</span></div></div><div className={`text-xs font-bold px-2 py-1 rounded-lg ${c.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.change > 0 ? '+' : ''}{c.change}%</div></div>))}</div>
        <p className="text-[9px] text-gray-400 mt-3">Source: RBI Statistical Tables, Bank Annual Reports. HDFC Bank jump due to HDFC Ltd merger (Jul 2023).</p>
      </div>
    </div>
  )
}

// ===== RISK TAB =====
function RiskTab() {
  const [riskSubTab, setRiskSubTab] = useState<'insurable' | 'bestpractices'>('insurable')
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const caseStudies = [
    { title: 'PMC Bank Collapse (2019)', plant: 'PMC Bank, Mumbai', loss: 'Rs 11,000 Cr (depositor losses)', cause: 'Concealed Rs 6,500 Cr exposure to HDIL group (73% of loan book to single borrower). Fictitious accounts created to hide NPAs from RBI.', lesson: 'RBI introduced PCA framework revision. Cooperative banks brought under RBI supervision. Deposit insurance raised to Rs 5 Lakh.', claimType: 'D&O + Fidelity', date: 'Sep 2019', segment: 'Cooperative Banking', detail: 'Punjab & Maharashtra Cooperative Bank concealed Rs 6,500 Cr in loans to HDIL (a real estate group) by creating 21,000 fictitious accounts. When HDIL defaulted, 73% of PMC loan book became NPA overnight. RBI imposed moratorium. 16 Lakh depositors could not withdraw money. Several depositors died due to stress. MD Joy Thomas and HDIL directors arrested. RBI subsequently brought all cooperative banks under its direct supervision and raised DICGC insurance from Rs 1 Lakh to Rs 5 Lakh per depositor.', insuranceNote: 'D&O liability for directors/management who concealed NPA. Fidelity guarantee for employee fraud. Cyber insurance irrelevant here. Key gap: no deposit insurance product beyond DICGC Rs 5 Lakh. Bankers Blanket Bond would have covered internal fraud discovery.' },
    { title: 'Cosmos Bank Cyber Heist (2018)', plant: 'Cosmos Cooperative Bank, Pune', loss: 'Rs 94 Cr (ATM + SWIFT fraud)', cause: 'Malware injected in ATM switch server. 12,000+ fraudulent ATM withdrawals across 28 countries in 2 hours. Simultaneous SWIFT transfer to Hong Kong.', lesson: 'Isolated ATM switch from core banking. Real-time velocity checks on international ATM transactions. SWIFT CSP compliance mandatory.', claimType: 'Cyber + Fidelity', date: 'Aug 2018', segment: 'Cyber Security', detail: 'Sophisticated hackers (suspected North Korean Lazarus Group) planted malware in Cosmos Bank ATM switch server over 6 months. On Aug 11-13, 2018, they executed 12,000+ cloned card ATM withdrawals across 28 countries simultaneously (total Rs 78 Cr). Separately, Rs 14 Cr transferred via SWIFT to a Hong Kong account. The bank only detected the fraud when reconciliation showed massive shortfall. FBI and CBI jointly investigated. This was India first major SWIFT-related banking heist. Cosmos had cyber insurance but the sum insured (Rs 25 Cr) was far below actual loss.', insuranceNote: 'Cyber insurance with adequate limit (min 3x of potential exposure). Fidelity guarantee for insider-assisted fraud. Crime insurance covering ATM fraud and unauthorized SWIFT transactions. Key lesson: sum insured must be stress-tested against worst-case scenarios, not just historical claims.' },
    { title: 'YES Bank Crisis (2020)', plant: 'YES Bank Ltd, Mumbai', loss: 'Rs 35,000 Cr (AT1 bond writeoff + depositor panic)', cause: 'Aggressive lending to stressed corporates (DHFL, IL&FS, Anil Ambani group). Hidden NPAs. Founder Rana Kapoor arrested for fraud.', lesson: 'RBI introduced higher scrutiny for private bank promoters. AT1 bond holders lost 100% (legal precedent). SBI-led consortium rescued.', claimType: 'D&O + Bankers Blanket', date: 'Mar 2020', segment: 'Private Banking', detail: 'YES Bank grew aggressively from 2014-2019 under founder Rana Kapoor, lending heavily to stressed groups (DHFL, IL&FS, Cox & Kings, Anil Ambani). NPAs were concealed through evergreening. When RBI forced recognition, NPA jumped from 2% to 17% overnight. Deposits fell 50% in weeks (bank run). RBI imposed moratorium (Mar 2020), wiped out Rs 8,400 Cr AT1 bonds (first in India), and forced SBI to invest Rs 7,250 Cr for 49% stake. Rana Kapoor arrested for money laundering. AT1 bond writeoff set legal precedent that additional tier-1 bonds have equity-like risk.', insuranceNote: 'D&O claims by AT1 bond holders and shareholders for misrepresentation. Bankers Blanket Bond for management fraud. Professional Indemnity for auditor failure (BSR & Co). Key learning: D&O policies for bank directors need specific extensions for regulatory action and AT1 bond claims.' },
    { title: 'ICICI-Videocon Quid Pro Quo (2019)', plant: 'ICICI Bank, Mumbai', loss: 'Rs 3,250 Cr (loan to Videocon) + reputational', cause: 'CEO Chanda Kochhar allegedly favoured Videocon loan (Rs 3,250 Cr) in exchange for investment in husband Deepak Kochhar business. Conflict of interest.', lesson: 'Enhanced related-party disclosure. Board governance strengthened. CEO performance claw-back provisions.', claimType: 'D&O + Crime', date: '2019', segment: 'Corporate Governance', detail: 'ICICI Bank under CEO Chanda Kochhar sanctioned Rs 3,250 Cr loan to Videocon Group (which later went bankrupt). Allegations emerged that Videocon MD Venugopal Dhoot invested Rs 64 Cr in NuPower (owned by Deepak Kochhar, husband of Chanda). CBI/ED investigated. Chanda Kochhar terminated, all post-2009 bonuses clawed back. ICICI Bank filed Rs 12 Cr recovery suit against her. Videocon went through NCLT. Case highlighted governance failure at board level.', insuranceNote: 'D&O policy triggered for defense costs. Crime/Fidelity for management misconduct. Employment Practices Liability for wrongful termination counterclaim. Key: D&O policies need carve-out for proven fraud (most exclude deliberate criminal acts). Entity coverage for bank reputational costs.' },
  ]
  const riskSubTabs = [{ id: 'insurable' as const, label: 'Insurable Risks' }, { id: 'bestpractices' as const, label: 'Case Studies & Best Practices' }]
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center gap-3"><Shield size={20} className="text-maroon" /><div><h3 className="text-sm font-bold text-navy">BFSI Risk Management Framework</h3><p className="text-xs text-gray-500">Banking | Insurance | NBFC | Fintech | Capital Markets</p></div></div></div>
      <div className="flex gap-2 flex-wrap">{riskSubTabs.map((tab) => (<button key={tab.id} onClick={() => setRiskSubTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${riskSubTab === tab.id ? 'bg-maroon text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{tab.label}</button>))}</div>
      {riskSubTab === 'insurable' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Cyber & Data Breach', probability: 'High', impact: 'Catastrophic', emv: 'Rs 100-2000 Cr', mitigation: 'SOC 24/7, Zero Trust architecture, SWIFT CSP, penetration testing quarterly' },
              { name: 'Credit Default / NPA', probability: 'High', impact: 'Very High', emv: 'Rs 5000-50000 Cr', mitigation: 'Early warning signals, diversified portfolio, stress testing (CRAR), provisioning norms' },
              { name: 'Fraud (Internal/External)', probability: 'Medium-High', impact: 'High', emv: 'Rs 50-5000 Cr', mitigation: 'Whistle-blower policy, surprise audits, maker-checker, AI-based anomaly detection' },
              { name: 'Regulatory Penalty', probability: 'Medium', impact: 'Medium-High', emv: 'Rs 10-500 Cr', mitigation: 'Compliance teams, RegTech solutions, RBI/SEBI/IRDAI audit preparedness' },
              { name: 'Market Risk (ALM Mismatch)', probability: 'Medium', impact: 'High', emv: 'Rs 200-5000 Cr', mitigation: 'Duration gap analysis, interest rate hedging, VaR limits, ALCO governance' },
              { name: 'Operational Risk (System Failure)', probability: 'Medium-High', impact: 'High', emv: 'Rs 50-1000 Cr', mitigation: 'DR/BCP, RTO <4hrs, dual data centers, cloud redundancy' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                <h5 className="font-bold text-navy text-sm mb-2">{r.name}</h5>
                <div className="flex gap-2 mb-2"><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${r.probability === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>P: {r.probability}</span><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${r.impact === 'Catastrophic' || r.impact === 'Very High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>I: {r.impact}</span></div>
                <p className="text-xs font-bold text-maroon mb-1">{r.emv}</p>
                <p className="text-[10px] text-gray-500 italic">{r.mitigation}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-1 flex items-center gap-2"><Shield size={16} className="text-maroon" /> Insurance Products & Key Add-ons — BFSI</h4>
            <p className="text-xs text-gray-500 mb-5">Coverages for banking, insurance, and financial services sector</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h5 className="text-xs font-bold text-navy mb-3">Core Covers</h5><ul className="space-y-1.5">{['Bankers Blanket Bond (BBB)', 'Directors & Officers Liability (D&O)', 'Cyber Liability & Data Breach', 'Professional Indemnity', 'Crime/Fidelity Guarantee', 'Commercial Crime Policy', 'Employment Practices Liability (EPL)', 'Fiduciary Liability'].map((item, i) => (<li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>))}</ul></div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h5 className="text-xs font-bold text-navy mb-3">Specialty & Add-ons</h5><ul className="space-y-1.5">{['ATM Cash-in-Transit Insurance', 'Kidnap & Ransom (for HNI clients/bankers)', 'Trade Credit Insurance', 'Errors & Omissions (E&O) for advisors', 'Political Risk Insurance', 'Mortgage Impairment', 'Regulatory Investigation Costs', 'Media Liability (for public disclosures)'].map((item, i) => (<li key={i} className="text-[11px] text-gray-700 flex items-start gap-2"><span className="text-maroon mt-0.5">•</span>{item}</li>))}</ul></div>
            </div>
            <div className="mt-5 bg-orange-50 rounded-xl p-4 border border-orange-200"><h5 className="text-xs font-bold text-orange-800 mb-3">BFSI-Specific Add-ons</h5><ul className="space-y-1.5">{['SWIFT/RTGS/NEFT unauthorized transfer cover', 'UPI fraud and chargebacks liability', 'Card skimming and cloning losses', 'Insider trading investigation defense costs', 'Core banking system failure BI', 'Customer data privacy breach (DPDP Act compliance)', 'Blockchain/crypto custody losses', 'Open banking API security breach', 'Social engineering and CEO fraud', 'AML/KYC penalty defense costs', 'Central bank regulatory action costs', 'Deposit insurance top-up (beyond DICGC Rs 5L)', 'Algorithmic trading error coverage'].map((item, i) => (<li key={i} className="text-[11px] text-orange-900 flex items-start gap-2"><span className="text-orange-600 mt-0.5 font-bold">▸</span>{item}</li>))}</ul></div>
          </div>
        </div>
      )}
      {riskSubTab === 'bestpractices' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-navy mb-2 flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> Case Studies — Major BFSI Losses (India)</h4>
            <p className="text-xs text-gray-500 mb-4">Click any case study for full detailed analysis</p>
            <div className="space-y-3">{caseStudies.map((cs, i) => (
              <div key={i} onClick={() => setSelectedCase(i)} className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-maroon/30 transition cursor-pointer bg-white">
                <div className="flex items-center justify-between mb-2"><h5 className="font-bold text-navy text-sm">{cs.title}</h5><span className="text-[10px] px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold">{cs.claimType}</span></div>
                <div className="flex items-center gap-4 text-[10px] text-gray-500"><span><strong>Entity:</strong> {cs.plant}</span><span><strong>Loss:</strong> <span className="text-red-600 font-bold">{cs.loss}</span></span></div>
                <div className="mt-2 flex items-center gap-2"><span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold">{cs.segment}</span><span className="text-[9px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{cs.date}</span><span className="text-[9px] text-maroon font-bold ml-auto">View Details →</span></div>
              </div>
            ))}</div>
          </div>
          {selectedCase !== null && caseStudies[selectedCase] && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4"><div><h3 className="text-lg font-bold text-navy">{caseStudies[selectedCase].title}</h3><div className="flex items-center gap-2 mt-1"><span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-bold">{caseStudies[selectedCase].claimType}</span><span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold">{caseStudies[selectedCase].segment}</span><span className="text-[10px] text-gray-500">{caseStudies[selectedCase].date}</span></div></div><button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button></div>
                <div className="grid grid-cols-2 gap-3 mb-4"><div className="p-3 bg-gray-50 rounded-xl border border-gray-100"><span className="text-[9px] font-bold text-gray-500 uppercase block mb-1">Entity</span><span className="text-sm font-semibold text-navy">{caseStudies[selectedCase].plant}</span></div><div className="p-3 bg-red-50 rounded-xl border border-red-100"><span className="text-[9px] font-bold text-red-600 uppercase block mb-1">Estimated Loss</span><span className="text-sm font-bold text-red-700">{caseStudies[selectedCase].loss}</span></div></div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4"><span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Root Cause</span><p className="text-sm text-gray-700 leading-relaxed">{caseStudies[selectedCase].cause}</p></div>
                <div className="p-4 bg-navy/5 rounded-xl border border-navy/10 mb-4"><span className="text-[10px] font-bold text-navy uppercase block mb-2">Detailed Analysis</span><p className="text-sm text-gray-700 leading-relaxed">{caseStudies[selectedCase].detail}</p></div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-4"><span className="text-[10px] font-bold text-green-700 uppercase block mb-2">Key Learnings</span><p className="text-sm text-green-800 leading-relaxed">{caseStudies[selectedCase].lesson}</p></div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200"><span className="text-[10px] font-bold text-amber-700 uppercase block mb-2">Insurance Implications</span><p className="text-sm text-amber-800 leading-relaxed">{caseStudies[selectedCase].insuranceNote}</p></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===== GEOGRAPHY TAB =====
function GeographyTab() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const selectedInfo = geographyData.find(s => s.state === selectedState)
  return (
    <div className="space-y-6">
      {selectedState && selectedInfo && (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedState(null)}><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-navy">Why {selectedState} is a BFSI Hub</h3><button onClick={() => setSelectedState(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button></div><div className="p-4 bg-navy/5 rounded-xl mb-4"><div className="grid grid-cols-2 gap-3 text-center"><div><div className="text-lg font-bold text-maroon">{selectedInfo.share}%</div><div className="text-[10px] text-gray-500">Revenue Share</div></div><div><div className="text-lg font-bold text-navy">{selectedInfo.branches.toLocaleString()}</div><div className="text-[10px] text-gray-500">Branches</div></div></div><p className="text-xs text-gray-600 mt-3"><strong>Major Players:</strong> {selectedInfo.majorPlayers}</p></div><div><h4 className="text-sm font-bold text-navy mb-2">Key Reasons</h4><p className="text-sm text-gray-700 leading-relaxed">{selectedInfo.reason}</p></div></div></div>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-navy mb-1">BFSI Concentration by State (% of sector revenue)</h3>
        <p className="text-xs text-gray-500 mb-4">Click any bar for state-level insights</p>
        <ResponsiveContainer width="100%" height={350}><BarChart data={geographyData} layout="vertical" onClick={(data: any) => { if (data?.activePayload) setSelectedState(data.activePayload[0]?.payload?.state) }}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis type="number" fontSize={10} unit="%" /><YAxis dataKey="state" type="category" fontSize={10} width={100} /><Tooltip formatter={(v: number) => `${v}%`} /><Bar dataKey="share" radius={[0, 4, 4, 0]} cursor="pointer">{geographyData.map((_, i) => <Cell key={i} fill={i < 2 ? '#f37021' : i < 4 ? '#4338ca' : '#94a3b8'} />)}<LabelList dataKey="share" position="right" fontSize={9} formatter={(v: number) => `${v}%`} /></Bar></BarChart></ResponsiveContainer>
        <p className="text-[9px] text-gray-400 mt-1">Source: RBI Basic Statistical Returns, IRDAI State Reports</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h3 className="text-sm font-bold text-navy mb-3">India's Financial Hubs</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200"><h4 className="text-xs font-bold text-indigo-800 mb-1">Mumbai (40%+ of financial activity)</h4><p className="text-[10px] text-indigo-700">RBI, SEBI, BSE, NSE HQ. BKC banking hub. Dalal Street capital markets. All major bank/insurer/AMC head offices. GIFT City (IFSC) in Gujarat growing as offshore finance center.</p></div><div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><h4 className="text-xs font-bold text-blue-800 mb-1">Bangalore (Fintech Capital)</h4><p className="text-[10px] text-blue-700">PhonePe, Razorpay, CRED, Jupiter, Zerodha, Groww. 40% of India's fintech funding goes here. Strong tech talent pool. RBI Innovation Hub. E-commerce + fintech integration.</p></div><div className="p-4 bg-green-50 rounded-xl border border-green-200"><h4 className="text-xs font-bold text-green-800 mb-1">Gurgaon (NBFC + InsurTech)</h4><p className="text-[10px] text-green-700">Bajaj Finance, PolicyBazaar, Paytm, BharatPe, Pine Labs. NBFC concentration due to talent + connectivity. Insurance back-offices. Digital lending platforms. Close to Delhi regulatory offices.</p></div></div></div>
    </div>
  )
}

// ===== NEWS TAB =====
function NewsTab() {
  const news = [
    { title: 'RBI Keeps Repo Rate Unchanged at 6.5% — 8th Consecutive Pause', source: 'RBI MPC', date: 'Jun 2025', summary: 'MPC votes 4-2 to hold rates. GDP growth projected 6.5% for FY26. Inflation within 4% target band. Rate cut expected only if global conditions ease.', sentiment: 'Neutral' },
    { title: 'UPI Crosses 16 Billion Transactions in Single Month — New Record', source: 'NPCI', date: 'May 2025', summary: 'PhonePe (48%) and Google Pay (35%) dominate. Rs 22 Lakh Cr value processed. UPI now available in 7 countries including France, Sri Lanka.', sentiment: 'Positive' },
    { title: 'SBI Reports Highest-Ever Quarterly Profit — Rs 21,000 Cr in Q4 FY25', source: 'Economic Times', date: 'May 2025', summary: 'NPA at 2.1% (lowest in 15 years). Credit growth at 15%. YONO app crosses 7 Cr users. ROE improves to 21%.', sentiment: 'Positive' },
    { title: 'SEBI Tightens F&O Rules — New Position Limits from July 2025', source: 'SEBI Circular', date: 'Apr 2025', summary: 'Retail F&O losses estimated at Rs 75,000 Cr/year. New lot sizes, upfront margins increased. Impact on broker revenues (Angel One, Zerodha).', sentiment: 'Negative' },
    { title: 'HDFC Bank Market Cap Crosses $200 Billion — Asia Top 5', source: 'Bloomberg', date: 'Mar 2025', summary: 'Post HDFC merger integration complete. Branch count reaches 9,500. Home loan book crosses Rs 7 Lakh Cr. Global fund inflows.', sentiment: 'Positive' },
    { title: 'Digital Personal Data Protection Act — Compliance Deadline August 2025', source: 'MeitY', date: 'Feb 2025', summary: 'All BFSI entities must comply with DPDP Act. Data localization, consent management, breach notification within 72 hours. Rs 250 Cr penalty for non-compliance.', sentiment: 'Neutral' },
    { title: 'Paytm Payments Bank License Revoked — Operations Wound Down', source: 'RBI', date: 'Jan 2025', summary: 'RBI found persistent KYC violations and data sharing concerns. 30 Cr+ wallets migrated to other banks. Paytm app continues with third-party bank partnerships.', sentiment: 'Negative' },
    { title: 'Insurance Penetration Improves to 4.2% — Still Below Global Average', source: 'IRDAI', date: 'Mar 2025', summary: 'Life: 3.0%, Non-life: 1.2%. IRDAI targeting 5% by 2027 via Bima Sugam (insurance marketplace), composite licenses, and micro-insurance push.', sentiment: 'Positive' },
  ]
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><h3 className="text-sm font-bold text-navy">Latest BFSI News & Regulatory Updates</h3><p className="text-xs text-gray-500">Sources: RBI, SEBI, IRDAI, NPCI, Company Filings</p></div>
      {news.map((n, i) => (<div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition"><div className="flex items-center justify-between mb-2"><h4 className="text-sm font-bold text-navy flex-1">{n.title}</h4><span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ml-2 ${n.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : n.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{n.sentiment}</span></div><p className="text-xs text-gray-600 mb-2">{n.summary}</p><div className="flex items-center gap-3 text-[10px] text-gray-400"><span className="font-semibold">{n.source}</span><span>•</span><span>{n.date}</span></div></div>))}
    </div>
  )
}
