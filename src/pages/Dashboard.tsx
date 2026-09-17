import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  ArrowLeft, TrendingUp, Factory, Gauge, AlertTriangle,
  Settings, Download, RefreshCw, Shield, User,
  FileText, Car, Circle, Building2, Shirt, CandyOff, Cpu, ShoppingCart
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area
} from 'recharts'

const COLORS = ['#B02A30', '#005B75', '#F99D27', '#4CAF50', '#9C27B0', '#FF5722']

interface IndustryData {
  name: string
  icon: any
  color: string
  kpis: { label: string; value: string; change: string; positive: boolean }[]
  production: { month: string; actual: number; target: number }[]
  segments: { name: string; value: number }[]
  trends: { year: string; revenue: number; growth: number }[]
  risks: { risk: string; severity: string; impact: string }[]
  adminControls: { label: string; status: string }[]
}

const industryDataMap: Record<string, IndustryData> = {
  paper: {
    name: 'Paper', icon: FileText, color: '#8B5E3C',
    kpis: [
      { label: 'Total Capacity', value: '24.5 MTPA', change: '+3.2%', positive: true },
      { label: 'Production', value: '18.8 MT', change: '+4.1%', positive: true },
      { label: 'Utilization', value: '76.7%', change: '+1.2%', positive: true },
      { label: 'Exports', value: '$2.1B', change: '-2.3%', positive: false },
    ],
    production: [
      { month: 'Apr', actual: 1.5, target: 1.6 }, { month: 'May', actual: 1.6, target: 1.6 },
      { month: 'Jun', actual: 1.4, target: 1.5 }, { month: 'Jul', actual: 1.7, target: 1.6 },
      { month: 'Aug', actual: 1.6, target: 1.6 }, { month: 'Sep', actual: 1.5, target: 1.6 },
    ],
    segments: [
      { name: 'Writing & Printing', value: 28 }, { name: 'Packaging Board', value: 42 },
      { name: 'Newsprint', value: 12 }, { name: 'Specialty', value: 18 },
    ],
    trends: [
      { year: '2020', revenue: 68000, growth: -5.2 }, { year: '2021', revenue: 74000, growth: 8.8 },
      { year: '2022', revenue: 85000, growth: 14.9 }, { year: '2023', revenue: 92000, growth: 8.2 },
      { year: '2024', revenue: 98000, growth: 6.5 }, { year: '2025', revenue: 105000, growth: 7.1 },
    ],
    risks: [
      { risk: 'Boiler Explosion', severity: 'Critical', impact: '₹50-200 Cr' },
      { risk: 'Chemical Spill', severity: 'High', impact: '₹20-80 Cr' },
      { risk: 'Fire in Stock Yard', severity: 'High', impact: '₹30-100 Cr' },
      { risk: 'Water Treatment Failure', severity: 'Medium', impact: '₹10-40 Cr' },
    ],
    adminControls: [
      { label: 'Data Refresh Schedule', status: 'Daily 6 AM' },
      { label: 'Alert Threshold', status: '85% utilization' },
      { label: 'Report Auto-generation', status: 'Enabled' },
      { label: 'API Integration', status: 'Active' },
    ],
  },
  automobile: {
    name: 'Automobile', icon: Car, color: '#1E40AF',
    kpis: [
      { label: 'Total Production', value: '27.8M Units', change: '+8.5%', positive: true },
      { label: 'Domestic Sales', value: '23.5M Units', change: '+6.2%', positive: true },
      { label: 'EV Penetration', value: '6.8%', change: '+2.1%', positive: true },
      { label: 'Exports', value: '4.3M Units', change: '+12.4%', positive: true },
    ],
    production: [
      { month: 'Apr', actual: 2.2, target: 2.3 }, { month: 'May', actual: 2.4, target: 2.3 },
      { month: 'Jun', actual: 2.1, target: 2.3 }, { month: 'Jul', actual: 2.5, target: 2.4 },
      { month: 'Aug', actual: 2.6, target: 2.4 }, { month: 'Sep', actual: 2.3, target: 2.4 },
    ],
    segments: [
      { name: 'Passenger Vehicles', value: 35 }, { name: 'Two-Wheelers', value: 40 },
      { name: 'Commercial Vehicles', value: 15 }, { name: 'Three-Wheelers + EV', value: 10 },
    ],
    trends: [
      { year: '2020', revenue: 450000, growth: -18.2 }, { year: '2021', revenue: 520000, growth: 15.6 },
      { year: '2022', revenue: 620000, growth: 19.2 }, { year: '2023', revenue: 710000, growth: 14.5 },
      { year: '2024', revenue: 780000, growth: 9.9 }, { year: '2025', revenue: 850000, growth: 9.0 },
    ],
    risks: [
      { risk: 'Paint Shop Fire', severity: 'Critical', impact: '₹200-800 Cr' },
      { risk: 'Press Shop Failure', severity: 'High', impact: '₹50-150 Cr' },
      { risk: 'Vehicle Recall', severity: 'High', impact: '₹100-500 Cr' },
      { risk: 'Supply Chain Disruption', severity: 'Medium', impact: '₹80-300 Cr' },
    ],
    adminControls: [
      { label: 'OEM Data Sync', status: 'Real-time' },
      { label: 'Recall Alert System', status: 'Active' },
      { label: 'Market Report Frequency', status: 'Weekly' },
      { label: 'Competitor Tracking', status: 'Enabled' },
    ],
  },
  tyre: {
    name: 'Tyre', icon: Circle, color: '#1F2937',
    kpis: [
      { label: 'Production', value: '3.2M Tonnes', change: '+5.8%', positive: true },
      { label: 'Capacity', value: '4.1M Tonnes', change: '+3.5%', positive: true },
      { label: 'Utilization', value: '78%', change: '+2.0%', positive: true },
      { label: 'Replacement Market', value: '65%', change: '+1.5%', positive: true },
    ],
    production: [
      { month: 'Apr', actual: 0.26, target: 0.27 }, { month: 'May', actual: 0.28, target: 0.27 },
      { month: 'Jun', actual: 0.25, target: 0.27 }, { month: 'Jul', actual: 0.27, target: 0.28 },
      { month: 'Aug', actual: 0.29, target: 0.28 }, { month: 'Sep', actual: 0.27, target: 0.28 },
    ],
    segments: [
      { name: 'Truck & Bus Radial', value: 35 }, { name: 'PCR', value: 38 },
      { name: 'Two-Wheeler', value: 18 }, { name: 'OTR/Farm', value: 9 },
    ],
    trends: [
      { year: '2020', revenue: 52000, growth: -8.5 }, { year: '2021', revenue: 62000, growth: 19.2 },
      { year: '2022', revenue: 75000, growth: 21.0 }, { year: '2023', revenue: 82000, growth: 9.3 },
      { year: '2024', revenue: 89000, growth: 8.5 }, { year: '2025', revenue: 96000, growth: 7.9 },
    ],
    risks: [
      { risk: 'Banbury Mixer Explosion', severity: 'Critical', impact: '₹80-250 Cr' },
      { risk: 'Curing Press Failure', severity: 'High', impact: '₹30-100 Cr' },
      { risk: 'Fire in Rubber Storage', severity: 'High', impact: '₹50-150 Cr' },
      { risk: 'Calender Roll Failure', severity: 'Medium', impact: '₹15-50 Cr' },
    ],
    adminControls: [
      { label: 'Raw Material Price Alert', status: 'Active' },
      { label: 'Quality Compliance Check', status: 'Weekly' },
      { label: 'Export Data Feed', status: 'Enabled' },
      { label: 'Seasonal Demand Model', status: 'Active' },
    ],
  },
  cement: {
    name: 'Cement', icon: Building2, color: '#6B7280',
    kpis: [
      { label: 'Installed Capacity', value: '600 MTPA', change: '+5.2%', positive: true },
      { label: 'Production', value: '425 MT', change: '+7.8%', positive: true },
      { label: 'Utilization', value: '70.8%', change: '+1.8%', positive: true },
      { label: 'Per Capita', value: '280 kg', change: '+4.5%', positive: true },
    ],
    production: [
      { month: 'Apr', actual: 35, target: 36 }, { month: 'May', actual: 33, target: 35 },
      { month: 'Jun', actual: 30, target: 34 }, { month: 'Jul', actual: 32, target: 35 },
      { month: 'Aug', actual: 34, target: 35 }, { month: 'Sep', actual: 36, target: 36 },
    ],
    segments: [
      { name: 'OPC', value: 45 }, { name: 'PPC', value: 35 },
      { name: 'PSC', value: 12 }, { name: 'White/Specialty', value: 8 },
    ],
    trends: [
      { year: '2020', revenue: 120000, growth: -4.5 }, { year: '2021', revenue: 142000, growth: 18.3 },
      { year: '2022', revenue: 165000, growth: 16.2 }, { year: '2023', revenue: 185000, growth: 12.1 },
      { year: '2024', revenue: 205000, growth: 10.8 }, { year: '2025', revenue: 225000, growth: 9.8 },
    ],
    risks: [
      { risk: 'Kiln Refractory Failure', severity: 'Critical', impact: '₹100-400 Cr' },
      { risk: 'Crusher Breakdown', severity: 'High', impact: '₹20-80 Cr' },
      { risk: 'Conveyor System Fire', severity: 'High', impact: '₹30-120 Cr' },
      { risk: 'VRM Roller Failure', severity: 'Medium', impact: '₹25-60 Cr' },
    ],
    adminControls: [
      { label: 'Kiln Uptime Monitor', status: 'Real-time' },
      { label: 'Dispatch Tracking', status: 'Active' },
      { label: 'Pricing Intelligence', status: 'Daily' },
      { label: 'Environmental Compliance', status: 'Enabled' },
    ],
  },
  textile: {
    name: 'Textile', icon: Shirt, color: '#7C3AED',
    kpis: [
      { label: 'Market Size', value: '$223B', change: '+9.2%', positive: true },
      { label: 'Exports', value: '$44.4B', change: '+5.8%', positive: true },
      { label: 'Employment', value: '45M Jobs', change: '+2.1%', positive: true },
      { label: 'FDI Inflow', value: '$4.2B', change: '+18.5%', positive: true },
    ],
    production: [
      { month: 'Apr', actual: 18, target: 19 }, { month: 'May', actual: 19, target: 19 },
      { month: 'Jun', actual: 17, target: 18 }, { month: 'Jul', actual: 20, target: 19 },
      { month: 'Aug', actual: 21, target: 20 }, { month: 'Sep', actual: 19, target: 20 },
    ],
    segments: [
      { name: 'Cotton Textiles', value: 32 }, { name: 'Synthetic/Man-made', value: 38 },
      { name: 'Technical Textiles', value: 18 }, { name: 'Handloom/Handicraft', value: 12 },
    ],
    trends: [
      { year: '2020', revenue: 152000, growth: -12.5 }, { year: '2021', revenue: 178000, growth: 17.1 },
      { year: '2022', revenue: 198000, growth: 11.2 }, { year: '2023', revenue: 210000, growth: 6.1 },
      { year: '2024', revenue: 223000, growth: 6.2 }, { year: '2025', revenue: 245000, growth: 9.9 },
    ],
    risks: [
      { risk: 'Spinning Mill Fire', severity: 'Critical', impact: '₹50-200 Cr' },
      { risk: 'Dyeing Unit Chemical Spill', severity: 'High', impact: '₹20-80 Cr' },
      { risk: 'Power Loom Breakdown', severity: 'Medium', impact: '₹5-25 Cr' },
      { risk: 'Cotton Stock Fire', severity: 'High', impact: '₹30-120 Cr' },
    ],
    adminControls: [
      { label: 'Cotton Price Feed', status: 'Real-time' },
      { label: 'Export Order Tracking', status: 'Active' },
      { label: 'Sustainability Metrics', status: 'Monthly' },
      { label: 'PLI Scheme Monitor', status: 'Enabled' },
    ],
  },
  sugar: {
    name: 'Sugar', icon: CandyOff, color: '#059669',
    kpis: [
      { label: 'Production', value: '36 MT', change: '+4.5%', positive: true },
      { label: 'Installed Capacity', value: '42 MT', change: '+2.8%', positive: true },
      { label: 'Ethanol Diversion', value: '18%', change: '+5.2%', positive: true },
      { label: 'Mills Operating', value: '540', change: '+15', positive: true },
    ],
    production: [
      { month: 'Oct', actual: 4.5, target: 4.8 }, { month: 'Nov', actual: 6.2, target: 6.0 },
      { month: 'Dec', actual: 7.8, target: 7.5 }, { month: 'Jan', actual: 8.1, target: 8.0 },
      { month: 'Feb', actual: 6.5, target: 6.8 }, { month: 'Mar', actual: 2.9, target: 3.0 },
    ],
    segments: [
      { name: 'White Sugar', value: 55 }, { name: 'Raw Sugar', value: 20 },
      { name: 'Ethanol', value: 18 }, { name: 'Cogeneration', value: 7 },
    ],
    trends: [
      { year: '2020', revenue: 82000, growth: 5.2 }, { year: '2021', revenue: 88000, growth: 7.3 },
      { year: '2022', revenue: 95000, growth: 8.0 }, { year: '2023', revenue: 102000, growth: 7.4 },
      { year: '2024', revenue: 108000, growth: 5.9 }, { year: '2025', revenue: 115000, growth: 6.5 },
    ],
    risks: [
      { risk: 'Boiler Explosion', severity: 'Critical', impact: '₹40-150 Cr' },
      { risk: 'Bagasse Storage Fire', severity: 'High', impact: '₹20-80 Cr' },
      { risk: 'Turbine Failure', severity: 'High', impact: '₹30-100 Cr' },
      { risk: 'Effluent Treatment Failure', severity: 'Medium', impact: '₹10-40 Cr' },
    ],
    adminControls: [
      { label: 'Cane Pricing Monitor', status: 'Seasonal' },
      { label: 'Ethanol Blending Track', status: 'Active' },
      { label: 'FRP Compliance', status: 'Enabled' },
      { label: 'Weather Impact Model', status: 'Active' },
    ],
  },
  electronics: {
    name: 'Electronics', icon: Cpu, color: '#DC2626',
    kpis: [
      { label: 'Market Size', value: '$155B', change: '+14.8%', positive: true },
      { label: 'Production', value: '$105B', change: '+18.2%', positive: true },
      { label: 'Exports', value: '$29B', change: '+22.5%', positive: true },
      { label: 'PLI Investment', value: '₹76,000 Cr', change: '+35%', positive: true },
    ],
    production: [
      { month: 'Apr', actual: 8.5, target: 8.2 }, { month: 'May', actual: 8.8, target: 8.5 },
      { month: 'Jun', actual: 9.1, target: 8.8 }, { month: 'Jul', actual: 9.4, target: 9.0 },
      { month: 'Aug', actual: 9.8, target: 9.2 }, { month: 'Sep', actual: 10.2, target: 9.5 },
    ],
    segments: [
      { name: 'Mobile Phones', value: 43 }, { name: 'Consumer Electronics', value: 22 },
      { name: 'IT Hardware', value: 20 }, { name: 'Components/Semicon', value: 15 },
    ],
    trends: [
      { year: '2020', revenue: 72000, growth: 8.5 }, { year: '2021', revenue: 85000, growth: 18.1 },
      { year: '2022', revenue: 102000, growth: 20.0 }, { year: '2023', revenue: 125000, growth: 22.5 },
      { year: '2024', revenue: 145000, growth: 16.0 }, { year: '2025', revenue: 155000, growth: 6.9 },
    ],
    risks: [
      { risk: 'Clean Room Contamination', severity: 'Critical', impact: '₹100-500 Cr' },
      { risk: 'SMT Line Fire', severity: 'High', impact: '₹50-200 Cr' },
      { risk: 'ESD Damage', severity: 'Medium', impact: '₹10-50 Cr' },
      { risk: 'Supply Chain (Chip Shortage)', severity: 'High', impact: '₹200-800 Cr' },
    ],
    adminControls: [
      { label: 'PLI Compliance Monitor', status: 'Active' },
      { label: 'Import Duty Tracker', status: 'Real-time' },
      { label: 'Chip Supply Alert', status: 'Enabled' },
      { label: 'Foxconn/Samsung Feed', status: 'Active' },
    ],
  },
  fmcg: {
    name: 'FMCG', icon: ShoppingCart, color: '#F59E0B',
    kpis: [
      { label: 'Market Size', value: '$110B', change: '+11.2%', positive: true },
      { label: 'Rural Growth', value: '8.5%', change: '+2.3%', positive: true },
      { label: 'Urban Growth', value: '6.8%', change: '+1.1%', positive: true },
      { label: 'D2C Share', value: '12%', change: '+4.5%', positive: true },
    ],
    production: [
      { month: 'Apr', actual: 9.0, target: 8.8 }, { month: 'May', actual: 9.2, target: 9.0 },
      { month: 'Jun', actual: 8.8, target: 9.0 }, { month: 'Jul', actual: 9.5, target: 9.2 },
      { month: 'Aug', actual: 9.8, target: 9.5 }, { month: 'Sep', actual: 10.1, target: 9.8 },
    ],
    segments: [
      { name: 'Food & Beverage', value: 38 }, { name: 'Personal Care', value: 28 },
      { name: 'Household', value: 22 }, { name: 'Healthcare/OTC', value: 12 },
    ],
    trends: [
      { year: '2020', revenue: 72000, growth: -2.8 }, { year: '2021', revenue: 78000, growth: 8.3 },
      { year: '2022', revenue: 88000, growth: 12.8 }, { year: '2023', revenue: 96000, growth: 9.1 },
      { year: '2024', revenue: 105000, growth: 9.4 }, { year: '2025', revenue: 110000, growth: 4.8 },
    ],
    risks: [
      { risk: 'Warehouse Fire', severity: 'High', impact: '₹30-150 Cr' },
      { risk: 'Product Contamination', severity: 'Critical', impact: '₹100-500 Cr' },
      { risk: 'Cold Chain Failure', severity: 'High', impact: '₹20-80 Cr' },
      { risk: 'Packaging Line Breakdown', severity: 'Medium', impact: '₹10-40 Cr' },
    ],
    adminControls: [
      { label: 'Nielsen Data Feed', status: 'Weekly' },
      { label: 'Distribution Tracker', status: 'Active' },
      { label: 'Recall Alert System', status: 'Enabled' },
      { label: 'Demand Forecasting', status: 'AI-driven' },
    ],
  },
}

export default function Dashboard() {
  const { industryId } = useParams<{ industryId: string }>()
  const navigate = useNavigate()
  const { role, username } = useAuthStore()
  const isAdmin = role === 'admin'

  const data = industryDataMap[industryId || '']
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <p className="text-xl text-gray-500">Industry not found</p>
          <button onClick={() => navigate('/hub')} className="btn-primary mt-4">Back to Hub</button>
        </div>
      </div>
    )
  }

  const Icon = data.icon

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      {/* Header */}
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/hub')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={16} /> Back to Hub
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${data.color}15` }}>
                <Icon size={20} style={{ color: data.color }} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-navy">{data.name} Industry Dashboard</h1>
                <p className="text-xs text-gray-500">
                  {isAdmin ? 'Admin View — Full Controls' : 'User View — Read Only'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button className="flex items-center gap-1 px-3 py-1.5 bg-orange/10 text-orange rounded-lg text-xs font-semibold hover:bg-orange/20 transition">
                <Settings size={14} /> Configure
              </button>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              {isAdmin ? <Shield size={14} className="text-maroon" /> : <User size={14} className="text-navy" />}
              <span className="text-xs font-semibold">{username}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-6 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.kpis.map((kpi, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="text-2xl font-bold text-navy mt-1">{kpi.value}</p>
              <p className={`text-sm font-semibold mt-1 ${kpi.positive ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.change} YoY
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Production Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Monthly Production (Actual vs Target)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.production}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="actual" fill={data.color} name="Actual" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#E5E7EB" name="Target" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Segment Pie */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Segment Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={data.segments}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={true}
                >
                  {data.segments.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Revenue & Growth Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" fontSize={11} />
              <YAxis yAxisId="left" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" fontSize={11} />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke={data.color} fill={data.color} fillOpacity={0.15} name="Revenue (₹ Cr)" />
              <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#F99D27" strokeWidth={2} name="Growth (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk + Admin Controls Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-maroon" /> Key Insurable Risks
            </h3>
            <div className="space-y-3">
              {data.risks.map((risk, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      risk.severity === 'Critical' ? 'bg-red-500' :
                      risk.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{risk.risk}</p>
                      <p className={`text-xs font-medium ${
                        risk.severity === 'Critical' ? 'text-red-600' :
                        risk.severity === 'High' ? 'text-orange-600' : 'text-yellow-600'
                      }`}>{risk.severity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-maroon">{risk.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Controls / Operational Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              {isAdmin ? <><Settings size={18} className="text-orange" /> Admin Controls</> :
                <><Gauge size={18} className="text-navy" /> Operational Status</>}
            </h3>
            <div className="space-y-3">
              {data.adminControls.map((ctrl, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{ctrl.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-navy bg-navy/10 px-2 py-1 rounded-full">
                      {ctrl.status}
                    </span>
                    {isAdmin && (
                      <button className="text-xs text-maroon hover:underline font-semibold">Edit</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {isAdmin && (
              <div className="mt-4 flex gap-2">
                <button className="flex items-center gap-1 px-4 py-2 bg-navy text-white rounded-lg text-xs font-semibold hover:bg-navy-600 transition">
                  <RefreshCw size={12} /> Refresh Data
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-1 px-4 py-2 bg-maroon text-white rounded-lg text-xs font-semibold hover:bg-maroon-600 transition">
                  <Download size={12} /> Export Report
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
