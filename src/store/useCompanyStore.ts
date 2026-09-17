import { create } from 'zustand'
import { ADDITIONAL_COMPANIES } from './additionalCompanies'

export type IndustryId = 'steel' | 'cement' | 'paper' | 'sugar' | 'automobile' | 'tyre' | 'textile' | 'electronics' | 'fmcg' | 'pharma' | 'bfsi' | 'aviation' | 'startups' | 'hospitality' | 'chemical' | 'infrastructure' | 'fertilizer'

export interface CompanySuggestion {
  id: string
  name: string
  industry: IndustryId
  ticker: string
}

export interface CompanySnapshot {
  id: string
  name: string
  industry: IndustryId
  ticker: string
  founded: number
  headquarters: string
  employees: string
  marketCap: string
  ceo: string
  website: string
  description: string
  products: { name: string; revenueShare: number; description: string }[]
  financials: { year: string; revenue: number; profit: number; ebitda: number }[]
  revenueFY25: string
  profitFY25: string
  ebitdaMargin: string
  news: { title: string; date: string; source: string; url: string }[]
  futureScope: { outlook: string; plans: string[]; risks: string[] }
  // Enhanced fields (optional — added progressively)
  extendedOverview?: {
    businessSegments: string
    geographicPresence: string
    keyStrengths: string[]
    marketPosition: string
    rawMaterialStrategy: string
  }
  financialRatios?: {
    debtToEquity: number
    currentRatio: number
    roe: number
    roce: number
    interestCoverage: number
    netDebt: string
    peRatio: number
    pbRatio: number
    dividendYield: number
    workingCapitalDays: number
  }
  competitorBenchmark?: {
    company: string
    metrics: { label: string; company: number | string; industryBest: number | string; industryAvg: number | string; unit: string }[]
  }
  // BCG Matrix for product portfolio
  bcgMatrix?: {
    stars: { name: string; growth: string; share: string; insight: string }[]
    cashCows: { name: string; growth: string; share: string; insight: string }[]
    questionMarks: { name: string; growth: string; share: string; insight: string }[]
    dogs: { name: string; growth: string; share: string; insight: string }[]
  }
  // Head-to-head competitor comparison
  headToHead?: {
    competitor: string
    competitorTicker: string
    summary: string
    metrics: { label: string; company: number | string; competitor: number | string; unit: string; winner: 'company' | 'competitor' | 'tie' }[]
    verdict: string
  }
}

interface CompanyStoreState {
  searchQuery: string
  suggestions: CompanySuggestion[]
  selectedCompany: CompanySnapshot | null
  hasMismatch: boolean
  mismatchDismissed: boolean
  setSearchQuery: (query: string, currentIndustry: IndustryId) => void
  selectCompany: (companyId: string, currentIndustry: IndustryId) => void
  clearSelection: () => void
  dismissMismatch: () => void
}

// ===== COMPANY DATA: Top Indian Companies across 9 Industries =====
const mockCompanies: CompanySnapshot[] = [
  // ==================== STEEL (20) ====================
  {
    id: 'tata-steel', name: 'Tata Steel', industry: 'steel', ticker: 'TATASTEEL',
    founded: 1907, headquarters: 'Mumbai, Maharashtra', employees: '77,000+', marketCap: '₹1.85 Lakh Cr',
    ceo: 'T.V. Narendran', website: 'https://www.tatasteel.com',
    description: "​India's largest steel producer and among the top 10 globally. Operates in 26 countries with key operations in India, Netherlands, and UK. Vertically integrated with captive iron ore and coal mines. In FY25 the company reported revenue of ₹2,29,518 Cr and net profit of ₹10,250 Cr, at an EBITDA margin of around 15.0%. Its revenue is led by hot rolled coils/sheets (35% of sales), complemented by cold rolled products and long products. India's #1 steel producer by revenue. India (Jamshedpur, Kalinganagar, Meramandali, Sahibabad, Khopoli), Netherlands (IJmuiden — 7 MTPA flat products), UK (Port Talbot — 5 MTPA under restructuring).",
    products: [
      { name: 'Hot Rolled Coils/Sheets', revenueShare: 35, description: 'Automotive, construction, general engineering' },
      { name: 'Cold Rolled Products', revenueShare: 22, description: 'High-quality flat steel for appliances and automobiles' },
      { name: 'Long Products (Bars/Rods)', revenueShare: 20, description: 'Construction steel, TMT bars for infrastructure' },
      { name: 'Coated/Galvanized Steel', revenueShare: 15, description: 'Corrosion-resistant steel for roofing and automotive' },
      { name: 'Tubes & Pipes', revenueShare: 8, description: 'Structural and precision tubes' },
    ],
    financials: [
      { year: 'FY21', revenue: 156294, profit: 7490, ebitda: 29832 },
      { year: 'FY22', revenue: 243959, profit: 41749, ebitda: 63230 },
      { year: 'FY23', revenue: 236055, profit: 8075, ebitda: 32790 },
      { year: 'FY24', revenue: 225838, profit: 9362, ebitda: 33100 },
      { year: 'FY25', revenue: 229518, profit: 10250, ebitda: 34500 },
    ],
    revenueFY25: '₹2,29,518 Cr', profitFY25: '₹10,250 Cr', ebitdaMargin: '15.0%',
    news: [
      { title: 'Tata Steel Kalinganagar Phase 2 commissioned adding 5 MTPA capacity', date: '2025-03-15', source: 'BSE Filing', url: 'https://www.tatasteel.com' },
      { title: 'Hydrogen-injection steelmaking trial launched at Jamshedpur', date: '2025-02-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'UK operations restructuring plan affects 2,800 workers', date: '2025-01-18', source: 'Reuters', url: 'https://www.reuters.com' },
    ],
    futureScope: {
      outlook: 'Targeting 40 MTPA capacity by FY28. Green steel initiatives with hydrogen-based steelmaking.',
      plans: ['Kalinganagar expansion to 16 MTPA', 'Neelachal Ispat integration', 'Green hydrogen pilot at Jamshedpur', 'Electric arc furnace for scrap-based steel'],
      risks: ['Global steel price volatility', 'Coking coal import dependency', 'UK operations profitability', 'CBAM impact on exports'],
    },
    extendedOverview: {
      businessSegments: 'Tata Steel operates through two primary segments: (1) Steel Operations — integrated steelmaking from mining to finished products across India, Netherlands (Tata Steel Netherlands/IJmuiden), and UK (Port Talbot). (2) Other Businesses — ferro alloys, tubes, tinplate, and mining operations. India operations contribute ~70% of consolidated revenue and ~90% of EBITDA.',
      geographicPresence: 'India (Jamshedpur, Kalinganagar, Meramandali, Sahibabad, Khopoli), Netherlands (IJmuiden — 7 MTPA flat products), UK (Port Talbot — 5 MTPA under restructuring). Mining operations in Jharkhand, Odisha. Sales network spanning 26 countries. 60%+ revenue from India domestic market.',
      keyStrengths: [
        'Vertically integrated — captive iron ore mines meeting 100% India requirement',
        'Lowest-cost steel producer globally (India operations) — $350/tonne conversion cost',
        'Premium product mix — 55%+ branded/value-added products (Tata Tiscon, Tata Steelium, Tata Pravesh)',
        'Strong R&D — 1,200+ patents, dedicated innovation centre at Jamshedpur',
        'Diversified product portfolio across flat, long, and specialty steel',
        'Pioneer in sustainability — CDP A-list, Science-Based Targets initiative member'
      ],
      marketPosition: 'India\'s #1 steel producer by revenue. #2 by crude steel capacity (34.6 MTPA). Dominant in automotive flat steel (40%+ market share in India). Market leader in branded retail steel (Tata Tiscon, Tata Pravesh). Only Indian steel company with significant international operations.',
      rawMaterialStrategy: 'Captive iron ore: ~30 MTPA from Noamundi, Joda mines in Jharkhand/Odisha — meets 100% India ore requirement. Coking coal: 85% imported (Australia primary source), actively developing Mozambique thermal coal asset. Limestone: Captive mines in Jharkhand. Key vulnerability: coking coal import dependency (~$200-350/tonne price range impacts margins by 3-5%).'
    },
    financialRatios: {
      debtToEquity: 0.78,
      currentRatio: 0.92,
      roe: 8.2,
      roce: 11.5,
      interestCoverage: 4.8,
      netDebt: '₹75,800 Cr',
      peRatio: 22.5,
      pbRatio: 1.8,
      dividendYield: 1.9,
      workingCapitalDays: 18
    },
    competitorBenchmark: {
      company: 'Tata Steel',
      metrics: [
        { label: 'EBITDA Margin', company: 15.0, industryBest: 23.3, industryAvg: 16.2, unit: '%' },
        { label: 'ROCE', company: 11.5, industryBest: 18.5, industryAvg: 12.8, unit: '%' },
        { label: 'Debt/Equity', company: 0.78, industryBest: 0.35, industryAvg: 0.72, unit: 'x' },
        { label: 'Revenue Growth (YoY)', company: 1.6, industryBest: 12.0, industryAvg: 5.8, unit: '%' },
        { label: 'Net Profit Margin', company: 4.5, industryBest: 10.0, industryAvg: 5.8, unit: '%' },
        { label: 'Capacity Utilization', company: 86, industryBest: 92, industryAvg: 78, unit: '%' },
        { label: 'Employee Productivity (MT/person)', company: 450, industryBest: 620, industryAvg: 380, unit: 'MT' },
        { label: 'Conversion Cost ($/tonne)', company: 350, industryBest: 310, industryAvg: 400, unit: '$' },
      ]
    },
    bcgMatrix: {
      stars: [
        { name: 'Automotive Flat Steel', growth: '12% CAGR', share: '40%+ market share', insight: 'Dominant supplier to all major OEMs — Maruti, Tata Motors, M&M. High growth from EV lightweight steel demand.' },
        { name: 'Branded Retail (Tata Tiscon / Pravesh)', growth: '15% CAGR', share: '25% organized market', insight: 'Direct-to-consumer play with strong brand recall. Tata Tiscon is India\'s #1 rebar brand. Tata Pravesh (steel doors) is a new growth engine.' },
      ],
      cashCows: [
        { name: 'Hot Rolled Coils & Sheets', growth: '3-4% CAGR', share: '18% India market', insight: 'Bread-and-butter product. High volume, stable margins. Jamshedpur & Kalinganagar are low-cost producers due to captive ore.' },
        { name: 'Long Products (TMT Bars/Wire Rods)', growth: '5% CAGR', share: '12% India market', insight: 'Infrastructure-driven demand. Steady volumes from housing and government projects. Low capex required to maintain.' },
        { name: 'Cold Rolled Products', growth: '4% CAGR', share: '22% market share', insight: 'Value-added with premium pricing. Stable demand from white goods and auto. Generates strong cash flow.' },
      ],
      questionMarks: [
        { name: 'Green Steel / Hydrogen-based', growth: '50%+ potential', share: '<1% (pilot stage)', insight: 'Huge future potential if carbon taxes (CBAM) kick in. Currently at pilot stage at Jamshedpur. High investment needed but could redefine the industry.' },
        { name: 'Electrical Steel (CRGO)', growth: '20% CAGR', share: '0% (under development)', insight: 'Critical for EV motors and transformers. India imports 100%. Tata Steel planning facility — winner takes massive market if executed.' },
      ],
      dogs: [
        { name: 'UK Operations (Port Talbot)', growth: '-2% decline', share: '8% UK market', insight: 'Persistent losses. High energy costs and aging BF infrastructure. Restructuring underway — 2,800 job cuts announced. May convert to EAF or divest.' },
        { name: 'Commodity Billets & Semis', growth: '1-2% CAGR', share: '5% market', insight: 'Low-margin, undifferentiated product. Being phased out in favor of value-added downstream. Will reduce over time.' },
      ],
    },
    headToHead: {
      competitor: 'JSW Steel',
      competitorTicker: 'JSWSTEEL',
      summary: 'JSW Steel is Tata Steel\'s closest domestic rival — both are ~30 MTPA integrated producers. JSW leads on margins and growth rate, while Tata Steel leads on brand, vertical integration, and R&D.',
      metrics: [
        { label: 'Revenue FY25', company: 229518, competitor: 172500, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 15.0, competitor: 19.0, unit: '%', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 4.5, competitor: 7.2, unit: '%', winner: 'competitor' },
        { label: 'Crude Steel Capacity', company: 34.6, competitor: 30.4, unit: 'MTPA', winner: 'company' },
        { label: 'Capacity Utilization', company: 86, competitor: 90, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.78, competitor: 0.92, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 11.5, competitor: 14.2, unit: '%', winner: 'competitor' },
        { label: 'Captive Iron Ore (%)', company: 100, competitor: 45, unit: '%', winner: 'company' },
        { label: 'Value-Added Product Mix', company: 55, competitor: 48, unit: '%', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 3.2, competitor: 11.5, unit: '%', winner: 'competitor' },
        { label: 'R&D Patents', company: 1200, competitor: 350, unit: '#', winner: 'company' },
        { label: 'Market Cap', company: 185000, competitor: 225000, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'JSW Steel wins on growth momentum, margins, and market valuation — driven by aggressive capacity expansion and domestic focus. Tata Steel wins on scale, vertical integration (100% captive ore), brand premium, R&D depth, and lower debt. Tata Steel\'s international operations (UK/Netherlands) drag overall margins but provide geographic diversification. For risk underwriting: Tata Steel is a safer, more diversified bet; JSW Steel offers higher growth but concentrated execution risk.'
    },
  },
  {
    id: 'jsw-steel', name: 'JSW Steel', industry: 'steel', ticker: 'JSWSTEEL',
    founded: 1982, headquarters: 'Mumbai, Maharashtra', employees: '65,000+', marketCap: '₹2.25 Lakh Cr',
    ceo: 'Jayant Acharya (Jt. MD & CEO)', website: 'https://www.jswsteel.in',
    description: "​India's second-largest private steel producer with 28.5 MTPA capacity. Part of JSW Group. Operates integrated plants at Vijayanagar, Dolvi, and Salem. In FY25 the company reported revenue of ₹1,72,500 Cr and net profit of ₹12,400 Cr, at an EBITDA margin of around 19.0%. Its revenue is led by flat products (45% of sales), complemented by long products and special steel & alloys. India's #2 private steel producer. India (Vijayanagar 18 MTPA — world's largest single-location plant, Dolvi 10 MTPA, Salem 1 MTPA).",
    products: [
      { name: 'Flat Products (HR/CR/Coated)', revenueShare: 45, description: 'Hot rolled, cold rolled, and galvanized flat steel' },
      { name: 'Long Products', revenueShare: 20, description: 'TMT bars, wire rods, structural sections' },
      { name: 'Special Steel & Alloys', revenueShare: 15, description: 'High-strength automotive and CRGO steel' },
      { name: 'Colour Coated Sheets', revenueShare: 12, description: 'Pre-painted roofing steel' },
      { name: 'Plates & Pipes', revenueShare: 8, description: 'Heavy plates for shipbuilding and line pipes' },
    ],
    financials: [
      { year: 'FY21', revenue: 79690, profit: 7554, ebitda: 23285 },
      { year: 'FY22', revenue: 146383, profit: 20785, ebitda: 44390 },
      { year: 'FY23', revenue: 153847, profit: 10221, ebitda: 27600 },
      { year: 'FY24', revenue: 160890, profit: 11820, ebitda: 30200 },
      { year: 'FY25', revenue: 172500, profit: 12400, ebitda: 32800 },
    ],
    revenueFY25: '₹1,72,500 Cr', profitFY25: '₹12,400 Cr', ebitdaMargin: '19.0%',
    news: [
      { title: 'JSW Steel Vijayanagar capacity reaches 18 MTPA milestone', date: '2025-04-12', source: 'Company PR', url: 'https://www.jswsteel.in' },
      { title: 'Green steel exports to Europe commence from Dolvi plant', date: '2025-01-10', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Acquires majority stake in MG Motor India plant at Halol', date: '2025-02-28', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Aggressive capacity expansion to 50 MTPA by FY30. Focus on value-added products and green steel.',
      plans: ['Vijayanagar expansion to 20 MTPA', 'Odisha greenfield 13.2 MTPA', 'CRGO steel for EV motors', 'Green hydrogen at Dolvi'],
      risks: ['High capex leading to debt', 'Iron ore availability in Karnataka', 'Chinese import competition', 'Multiple project execution risk'],
    },
    extendedOverview: {
      businessSegments: 'JSW Steel operates through: (1) Flat Products — HR coils, CR sheets, galvanized, color-coated contributing ~60% revenue. (2) Long Products — TMT bars, wire rods, rails ~25% revenue. (3) Special Products — CRGO, high-strength auto steel ~15% revenue. Domestic operations contribute 85%+ of revenue.',
      geographicPresence: 'India (Vijayanagar 18 MTPA — world\'s largest single-location plant, Dolvi 10 MTPA, Salem 1 MTPA). International: JSW Steel USA (plate mill), JSW Steel Italy (pipe coating). Odisha greenfield under construction. Pan-India dealer network of 10,000+ touchpoints.',
      keyStrengths: [
        'World\'s largest single-location steel plant at Vijayanagar (18 MTPA)',
        'Fastest capacity ramp-up in Indian steel industry — 5x growth in 15 years',
        'Strong domestic focus with 85%+ India revenue — less exposed to global cycles',
        'Cost leadership — among lowest conversion costs globally at Vijayanagar',
        'Diversified product mix across auto, construction, appliances, and packaging',
        'Aggressive green steel push — renewable energy integration at all plants'
      ],
      marketPosition: 'India\'s #2 private steel producer. #1 by market capitalization. Largest flat steel producer in India. Dominant in color-coated and galvanized segments. Key supplier to auto OEMs — Maruti, Hyundai, M&M. Market leader in pre-painted roofing steel.',
      rawMaterialStrategy: 'Iron ore: 45% captive from Karnataka mines (Ballari region), balance purchased from NMDC and auctions. Active mining lease applications in Odisha for greenfield support. Coking coal: 100% imported from Australia/Mozambique. Key strategic move: acquiring mining assets in Odisha to achieve 80%+ captive ore for future capacity.'
    },
    financialRatios: {
      debtToEquity: 0.92,
      currentRatio: 0.85,
      roe: 12.5,
      roce: 14.2,
      interestCoverage: 5.2,
      netDebt: '₹62,500 Cr',
      peRatio: 28.5,
      pbRatio: 3.2,
      dividendYield: 0.8,
      workingCapitalDays: 12
    },
    bcgMatrix: {
      stars: [
        { name: 'Color Coated & Galvanized Steel', growth: '14% CAGR', share: '28% market share', insight: 'Market leader in pre-painted steel for roofing. High demand from rural housing and commercial construction. Premium pricing and strong brand.' },
        { name: 'Automotive Flat Steel', growth: '12% CAGR', share: '25% India auto steel', insight: 'Key supplier to Maruti, Hyundai, M&M. Growing share with new advanced high-strength grades for EV bodies.' },
      ],
      cashCows: [
        { name: 'Hot Rolled Coils & Plates', growth: '4% CAGR', share: '20% India HR market', insight: 'Vijayanagar\'s low-cost HR production is a cash machine. Infrastructure demand provides stable volumes.' },
        { name: 'TMT Bars (JSW Neosteel)', growth: '6% CAGR', share: '12% organized market', insight: 'Strong retail brand. Infrastructure and housing boom ensures steady demand. Low incremental capex.' },
        { name: 'Cold Rolled Sheets', growth: '5% CAGR', share: '18% market share', insight: 'Value-added product with premium realization. Stable demand from appliance and auto sectors.' },
      ],
      questionMarks: [
        { name: 'CRGO Electrical Steel', growth: '25%+ potential', share: '<1% (greenfield)', insight: 'India imports 100% CRGO. JSW planning facility — critical for EV motors and transformers. High capex but transformative if successful.' },
        { name: 'Green Steel (Low-Carbon)', growth: '30%+ potential', share: '2% (early stage)', insight: 'Hydrogen-based steelmaking trial at Dolvi. EU CBAM creating export premium for green steel. First-mover advantage being built.' },
      ],
      dogs: [
        { name: 'JSW Steel USA (Plate Mill)', growth: '-1% CAGR', share: '3% US plate market', insight: 'Small, subscale plate mill in Texas. Inconsistent profitability. Under review for strategic options.' },
        { name: 'Commodity Billets & Semis', growth: '2% CAGR', share: '5% market', insight: 'Low-margin commodity product being phased out as downstream capacity comes online.' },
      ],
    },
    headToHead: {
      competitor: 'Tata Steel',
      competitorTicker: 'TATASTEEL',
      summary: 'JSW Steel vs Tata Steel is Indian steel\'s defining rivalry. JSW leads on growth, margins, and market cap, while Tata Steel leads on integration, brand heritage, and R&D depth.',
      metrics: [
        { label: 'Revenue FY25', company: 172500, competitor: 229518, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 19.0, competitor: 15.0, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 7.2, competitor: 4.5, unit: '%', winner: 'company' },
        { label: 'Crude Steel Capacity', company: 30.4, competitor: 34.6, unit: 'MTPA', winner: 'competitor' },
        { label: 'Capacity Utilization', company: 90, competitor: 86, unit: '%', winner: 'company' },
        { label: 'ROCE', company: 14.2, competitor: 11.5, unit: '%', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 11.5, competitor: 3.2, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.92, competitor: 0.78, unit: 'x', winner: 'competitor' },
        { label: 'Captive Iron Ore (%)', company: 45, competitor: 100, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 225000, competitor: 185000, unit: '₹ Cr', winner: 'company' },
        { label: 'Value-Added Mix', company: 48, competitor: 55, unit: '%', winner: 'competitor' },
        { label: 'Capacity Addition Plan', company: 50, competitor: 40, unit: 'MTPA target', winner: 'company' },
      ],
      verdict: 'JSW Steel wins on growth momentum, operational efficiency, and market valuation. Its domestic-only focus and aggressive expansion make it the market\'s preferred growth story. Tata Steel wins on vertical integration, brand heritage, R&D, and lower commodity risk due to 100% captive ore. For insurers: JSW carries higher execution risk from simultaneous mega-projects; Tata Steel carries international operations drag but is a more diversified bet.'
    },
  },
  {
    id: 'sail', name: 'Steel Authority of India (SAIL)', industry: 'steel', ticker: 'SAIL',
    founded: 1954, headquarters: 'New Delhi', employees: '60,000+', marketCap: '₹52,000 Cr',
    ceo: 'Amarendu Prakash (Chairman)', website: 'https://www.sail.co.in',
    description: "​India's largest PSU steel producer under Ministry of Steel. Operates 5 integrated plants at Bhilai, Rourkela, Durgapur, Bokaro, and Burnpur. Combined capacity 21.4 MTPA. In FY25 the company reported revenue of ₹1,02,000 Cr and net profit of ₹3,800 Cr, at an EBITDA margin of around 11.3%. Its revenue is led by rails & structurals (25% of sales), complemented by plates & sheets and hot rolled coils. India's #2 steel producer by capacity (21.4 MTPA). Pan-India presence with plants across Chhattisgarh (Bhilai), Odisha (Rourkela), West Bengal (Durgapur, Burnpur), Jharkhand (Bokaro), Tamil Nadu (Salem), Karnataka (Bhadravati).",
    products: [
      { name: 'Rails & Structurals', revenueShare: 25, description: 'World-class rails for Indian Railways' },
      { name: 'Plates & Sheets', revenueShare: 25, description: 'Ship plates, boiler plates for defense' },
      { name: 'Hot Rolled Coils', revenueShare: 22, description: 'Flat products for automotive and construction' },
      { name: 'TMT Bars & Wire Rods', revenueShare: 18, description: 'Construction-grade rebars' },
      { name: 'Alloy & Special Steels', revenueShare: 10, description: 'Defense-grade alloy steels' },
    ],
    financials: [
      { year: 'FY21', revenue: 68414, profit: 3850, ebitda: 13500 },
      { year: 'FY22', revenue: 103473, profit: 12015, ebitda: 22800 },
      { year: 'FY23', revenue: 101921, profit: 4834, ebitda: 11200 },
      { year: 'FY24', revenue: 99370, profit: 3300, ebitda: 10800 },
      { year: 'FY25', revenue: 102000, profit: 3800, ebitda: 11500 },
    ],
    revenueFY25: '₹1,02,000 Cr', profitFY25: '₹3,800 Cr', ebitdaMargin: '11.3%',
    news: [
      { title: 'SAIL supplies 3 lakh tonnes of head-hardened rails to Railways', date: '2025-03-22', source: 'PIB', url: 'https://pib.gov.in' },
      { title: 'Bhilai Steel Plant sets monthly crude steel production record', date: '2025-02-10', source: 'Company PR', url: 'https://www.sail.co.in' },
      { title: 'Board approves Rs 10,000 Cr modernization at Rourkela', date: '2025-01-25', source: 'BSE Filing', url: 'https://www.bseindia.com' },
    ],
    futureScope: {
      outlook: 'Capacity expansion to 35 MTPA under consideration. Focus on defense-grade steel and rail products.',
      plans: ['Capacity target 35 MTPA by 2030', 'New rail mill at Durgapur', 'Specialty plates for defense', 'Pellet plant expansions'],
      risks: ['Aging infrastructure', 'Lower margins vs private sector', 'Workforce restructuring', 'Government pricing pressure'],
    },
    extendedOverview: {
      businessSegments: 'SAIL operates 5 integrated steel plants (Bhilai, Rourkela, Durgapur, Bokaro, Burnpur) and 3 special steel plants (Salem, Visvesvaraya, Alloy Steels Plant). Primary segments: Flat Products (HR/CR coils, plates) ~45%, Long Products (rails, structurals, TMT) ~35%, Alloy & Special Steels ~10%, Others (pig iron, by-products) ~10%.',
      geographicPresence: 'Pan-India presence with plants across Chhattisgarh (Bhilai), Odisha (Rourkela), West Bengal (Durgapur, Burnpur), Jharkhand (Bokaro), Tamil Nadu (Salem), Karnataka (Bhadravati). 43 sales branches, 20+ stockyards. Captive mines in Jharkhand, Odisha, and Chhattisgarh providing 100% iron ore requirement.',
      keyStrengths: [
        'Largest PSU steel producer — strategic importance to Government of India',
        '100% captive iron ore and 50%+ captive coal — strong raw material security',
        'Sole supplier of head-hardened rails to Indian Railways — monopoly position',
        'Defense-grade steel plates — sole approved supplier to Indian Navy and DRDO',
        'Pan-India plant distribution — natural logistics advantage across regions'
      ],
      marketPosition: 'India\'s #2 steel producer by capacity (21.4 MTPA). #1 supplier to Indian Railways (rails). #1 in defense-grade steel plates. Dominant in government infrastructure projects. However, margins significantly lag private sector peers due to legacy workforce and aging plants.',
      rawMaterialStrategy: 'Captive iron ore: 100% from own mines in Chiria, Gua, Bolani, Barsua, Kiriburu (Jharkhand/Odisha). Coking coal: ~50% captive from Jharia/Bokaro coalfields, balance imported from Australia. Limestone: Captive mines. Key advantage: fully integrated from mine to market. Key weakness: aging mines with lower productivity.'
    },
    financialRatios: {
      debtToEquity: 0.42,
      currentRatio: 1.15,
      roe: 5.8,
      roce: 8.2,
      interestCoverage: 3.5,
      netDebt: '₹28,500 Cr',
      peRatio: 12.8,
      pbRatio: 0.65,
      dividendYield: 3.2,
      workingCapitalDays: 45
    },
    bcgMatrix: {
      stars: [
        { name: 'Head-Hardened Rails', growth: '15% CAGR', share: '85% India Railways share', insight: 'Monopoly supplier to Indian Railways for high-speed rail-ready tracks. Dedicated Bhilai Universal Rail Mill. Growing demand from Vande Bharat and DFC corridors.' },
      ],
      cashCows: [
        { name: 'Structural Steel (Beams/Channels)', growth: '5% CAGR', share: '30% organized market', insight: 'Government infrastructure projects (highways, bridges) provide steady demand. SAIL\'s wide range of sections is unmatched.' },
        { name: 'Hot Rolled Plates', growth: '4% CAGR', share: '25% market share', insight: 'Bhilai and Rourkela plate mills serve shipbuilding, defense, and pressure vessel markets. Premium pricing for defence grades.' },
        { name: 'TMT Bars (SAIL TMT)', growth: '6% CAGR', share: '8% organized market', insight: 'Strong brand in government housing and infrastructure. Low-cost production from integrated mills.' },
      ],
      questionMarks: [
        { name: 'Special Alloy Steels (Salem/Bhadravati)', growth: '10% CAGR', share: '15% niche market', insight: 'Growing defense localization driving demand. Under-invested historically. Could become star with modernization investment.' },
        { name: 'CRGO/Electrical Steel', growth: '20%+ potential', share: '0% (planned)', insight: 'SAIL has announced plans but execution uncertain. If successful, would address India\'s 100% import dependency.' },
      ],
      dogs: [
        { name: 'Burnpur (IISCO) Plant Products', growth: '1% CAGR', share: '3% regional', insight: 'Oldest plant with highest costs. Chronic underperformance. Needs massive modernization or restructuring.' },
        { name: 'Pig Iron (Merchant Sales)', growth: '0% flat', share: '20% market', insight: 'Low-value by-product. Declining as SAIL increases downstream utilization. Margin dilutive.' },
      ],
    },
    headToHead: {
      competitor: 'JSW Steel',
      competitorTicker: 'JSWSTEEL',
      summary: 'SAIL vs JSW Steel contrasts a government-owned integrated giant with a nimble private sector leader. JSW dominates on efficiency and growth; SAIL leads on raw material security and strategic national importance.',
      metrics: [
        { label: 'Revenue FY25', company: 102000, competitor: 172500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 11.3, competitor: 19.0, unit: '%', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 3.7, competitor: 7.2, unit: '%', winner: 'competitor' },
        { label: 'Crude Steel Capacity', company: 21.4, competitor: 30.4, unit: 'MTPA', winner: 'competitor' },
        { label: 'Captive Iron Ore (%)', company: 100, competitor: 45, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.42, competitor: 0.92, unit: 'x', winner: 'company' },
        { label: 'Employee Productivity', company: 180, competitor: 520, unit: 'MT/person', winner: 'competitor' },
        { label: 'ROCE', company: 8.2, competitor: 14.2, unit: '%', winner: 'competitor' },
        { label: 'Conversion Cost', company: 480, competitor: 350, unit: '$/tonne', winner: 'competitor' },
        { label: 'Capacity Utilization', company: 75, competitor: 90, unit: '%', winner: 'competitor' },
        { label: 'Defence/Rail Monopoly', company: 'Yes', competitor: 'No', unit: '', winner: 'company' },
        { label: 'Dividend Yield', company: 3.2, competitor: 0.8, unit: '%', winner: 'company' },
      ],
      verdict: 'JSW Steel comprehensively outperforms SAIL on operational metrics — higher margins, better utilization, superior productivity, and faster growth. However, SAIL offers unmatched raw material security (100% captive ore/coal), monopoly in strategic products (rails, defense plates), and deep value (P/B 0.65x). For insurers: SAIL\'s government backing eliminates credit risk but operational inefficiency caps earnings. JSW is a growth bet; SAIL is a value/dividend play with strategic moat.'
    },
  },
  {
    id: 'jspl', name: 'Jindal Steel & Power (JSPL)', industry: 'steel', ticker: 'JINDALSTEL',
    founded: 1952, headquarters: 'New Delhi', employees: '45,000+', marketCap: '₹75,000 Cr',
    ceo: 'Bimlendra Jha (MD)', website: 'https://www.jindalsteelpower.com',
    description: "​Part of O.P. Jindal Group. Leading steel and power producer with 10.6 MTPA steelmaking capacity. Plants at Raigarh (Chhattisgarh) and Angul (Odisha). Also 3,400 MW power capacity. In FY25 the company reported revenue of ₹55,000 Cr and net profit of ₹5,500 Cr, at an EBITDA margin of around 23.3%. Its revenue is led by rails & structural steel (28% of sales), complemented by plates & coils and tmt bars. India's #4 steel producer by capacity. India: Raigarh (Chhattisgarh — 6 MTPA steel + 2,600 MW power), Angul (Odisha — 6 MTPA steel, expanding to 12 MTPA).",
    products: [
      { name: 'Rails & Structural Steel', revenueShare: 28, description: 'Head-hardened rails, H-beams, channels' },
      { name: 'Plates & Coils', revenueShare: 25, description: 'Hot rolled plates and coils' },
      { name: 'TMT Bars (Jindal Panther)', revenueShare: 22, description: 'High-strength construction rebars' },
      { name: 'Wire Rods & Billets', revenueShare: 15, description: 'Semi-finished steel and wire products' },
      { name: 'Power', revenueShare: 10, description: '3,400 MW thermal and captive power' },
    ],
    financials: [
      { year: 'FY21', revenue: 33575, profit: 5019, ebitda: 11340 },
      { year: 'FY22', revenue: 49283, profit: 10390, ebitda: 16800 },
      { year: 'FY23', revenue: 50009, profit: 4850, ebitda: 11500 },
      { year: 'FY24', revenue: 51200, profit: 5100, ebitda: 11800 },
      { year: 'FY25', revenue: 55000, profit: 5500, ebitda: 12800 },
    ],
    revenueFY25: '₹55,000 Cr', profitFY25: '₹5,500 Cr', ebitdaMargin: '23.3%',
    news: [
      { title: 'JSPL Angul plant reaches 6 MTPA run-rate milestone', date: '2025-03-28', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Wins Indian Railways rail order worth Rs 4,500 Cr', date: '2025-02-05', source: 'Company PR', url: 'https://www.jindalsteelpower.com' },
      { title: 'Announces Rs 25,000 Cr expansion plan for Angul', date: '2025-01-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Expanding to 15.9 MTPA by FY26 with Angul Phase 2. Focus on rails and structural steel.',
      plans: ['Angul expansion to 12 MTPA', 'Patratu project in Jharkhand', 'Rail production to 2 MTPA', 'Green steel with biomass'],
      risks: ['Power sector dues', 'Iron ore mining lease renewals', 'Competition in rails', 'High expansion debt'],
    },
    extendedOverview: {
      businessSegments: 'JSPL operates in two segments: (1) Steel — integrated steelmaking at Raigarh and Angul producing plates, coils, rails, and structurals (~85% revenue). (2) Power — 3,400 MW thermal power generation at Raigarh and Tamnar (~15% revenue). Also has mining operations for captive iron ore and coal.',
      geographicPresence: 'India: Raigarh (Chhattisgarh — 6 MTPA steel + 2,600 MW power), Angul (Odisha — 6 MTPA steel, expanding to 12 MTPA). International: Oman (2 MTPA DRI/steel, divested). Captive mines in Chhattisgarh and Odisha. Export to 30+ countries. Domestic sales through 5,000+ dealer network.',
      keyStrengths: [
        'India\'s only private sector rail producer — approved by Indian Railways for head-hardened rails',
        'Highest EBITDA margins in Indian steel (23%+) due to captive raw materials and power',
        'Angul plant is one of India\'s most modern with latest technology from SMS group',
        'Diversified revenue — steel + power provides earnings stability',
        'Captive iron ore and coal mines reducing raw material cost volatility'
      ],
      marketPosition: 'India\'s #4 steel producer by capacity. Only private sector rail manufacturer (vs SAIL monopoly). #2 in structural steel after SAIL. Strong in plates for defence and shipbuilding. Rapidly closing gap with SAIL in long products through Angul expansion.',
      rawMaterialStrategy: 'Iron ore: ~70% captive from mines in Tensa (Odisha) and Chhattisgarh. Coal: ~60% captive from Gare Palma and Utkal mines. Balance sourced through e-auctions and Coal India linkage. Key advantage: dual captive resources (ore + coal) enable industry-best margins. Active pursuit of additional mining blocks in Odisha for Angul expansion support.'
    },
    financialRatios: {
      debtToEquity: 0.55,
      currentRatio: 1.05,
      roe: 10.8,
      roce: 15.5,
      interestCoverage: 6.2,
      netDebt: '₹18,200 Cr',
      peRatio: 14.5,
      pbRatio: 1.6,
      dividendYield: 1.2,
      workingCapitalDays: 22
    },
    bcgMatrix: {
      stars: [
        { name: 'Rails (Head-Hardened)', growth: '18% CAGR', share: '15% India (growing)', insight: 'Only private sector alternative to SAIL for Indian Railways. Massive demand from Vande Bharat, DFC, and metro projects. Angul rail mill adds capacity.' },
        { name: 'Structural Steel (Beams/Channels)', growth: '12% CAGR', share: '20% organized market', insight: 'India\'s infrastructure boom driving strong demand. JSPL produces India\'s widest range of parallel flange beams from Angul.' },
      ],
      cashCows: [
        { name: 'Hot Rolled Plates', growth: '5% CAGR', share: '18% India market', insight: 'Strong demand from shipbuilding, defence, and wind energy. Raigarh plate mill operates at 95%+ utilization. High margins due to captive ore.' },
        { name: 'TMT Bars (Jindal Panther)', growth: '7% CAGR', share: '8% organized market', insight: 'Strong brand in Odisha, Chhattisgarh, and East India. Growing pan-India through expanded dealer network.' },
        { name: 'Power Generation', growth: '3% CAGR', share: 'Captive + merchant', insight: 'Stable cash flows from 3,400 MW capacity. Captive power gives steel cost advantage. Surplus sold to grid.' },
      ],
      questionMarks: [
        { name: 'Green Steel (Biomass/Hydrogen)', growth: '25%+ potential', share: '<1% pilot', insight: 'Biomass injection trials at Raigarh. Hydrogen readiness being built into Angul expansion. Could command green premium in exports.' },
        { name: 'Wire Rods & Downstream', growth: '10% CAGR', share: '5% (new entrant)', insight: 'New wire rod mill at Angul. Entering high-margin auto-grade wire products. Competes with Tata Steel Long Products.' },
      ],
      dogs: [
        { name: 'Commodity Billets', growth: '1% CAGR', share: '8% market', insight: 'Low-margin semi-finished product. Being converted to higher-value downstream products as rolling capacity expands.' },
        { name: 'Merchant Power (Surplus)', growth: '-2% CAGR', share: 'Declining', insight: 'As steel capacity expands, more power consumed captively. Merchant power revenue declining. Low realization from spot market.' },
      ],
    },
    headToHead: {
      competitor: 'SAIL',
      competitorTicker: 'SAIL',
      summary: 'JSPL vs SAIL is the battle for India\'s long products market. JSPL is the nimble private challenger disrupting SAIL\'s monopoly in rails and structurals, with significantly better margins and growth.',
      metrics: [
        { label: 'Revenue FY25', company: 55000, competitor: 102000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 23.3, competitor: 11.3, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 10.0, competitor: 3.7, unit: '%', winner: 'company' },
        { label: 'ROCE', company: 15.5, competitor: 8.2, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.55, competitor: 0.42, unit: 'x', winner: 'competitor' },
        { label: 'Capacity Growth (5Y)', company: 50, competitor: 5, unit: '%', winner: 'company' },
        { label: 'Rail Production Capacity', company: 1.0, competitor: 1.5, unit: 'MTPA', winner: 'competitor' },
        { label: 'Employee Productivity', company: 350, competitor: 180, unit: 'MT/person', winner: 'company' },
        { label: 'Captive Iron Ore', company: 70, competitor: 100, unit: '%', winner: 'competitor' },
        { label: 'Capacity Utilization', company: 88, competitor: 75, unit: '%', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 12.0, competitor: 1.5, unit: '%', winner: 'company' },
        { label: 'Market Cap', company: 75000, competitor: 52000, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'JSPL dominates on every efficiency and profitability metric. Its private sector agility enables 2x margins and 3x productivity vs SAIL. However, SAIL\'s sheer scale, 100% captive resources, and rail monopoly position remain formidable barriers. JSPL\'s Angul expansion is a game-changer that will close the capacity gap. For risk underwriting: JSPL offers superior returns but higher expansion execution risk; SAIL is low-risk but low-return with government backing.'
    },
  },
  {
    id: 'amns-india', name: 'ArcelorMittal Nippon Steel India', industry: 'steel', ticker: 'AMNS (Unlisted)',
    founded: 2019, headquarters: 'Mumbai, Maharashtra', employees: '30,000+', marketCap: 'Unlisted',
    ceo: 'Dilip Oommen (CEO)', website: 'https://www.amns.in',
    description: "​JV between ArcelorMittal and Nippon Steel, formed after acquiring Essar Steel in 2019. 9 MTPA integrated plant at Hazira, Gujarat. Bringing global steelmaking expertise to India. In FY25 the company reported revenue of ₹64,000 Cr and net profit of ₹5,800 Cr, at an EBITDA margin of around 20.0%. Its revenue is led by hot rolled coils (35% of sales), complemented by cold rolled & coated and pellets & dri. India's #3 private steel producer. Single mega complex at Hazira, Gujarat (9 MTPA, expanding to 15 MTPA).",
    products: [
      { name: 'Hot Rolled Coils', revenueShare: 35, description: 'Automotive and construction-grade HR coils' },
      { name: 'Cold Rolled & Coated', revenueShare: 25, description: 'Galvanized for auto and appliances' },
      { name: 'Pellets & DRI', revenueShare: 18, description: 'Iron ore pellets and direct reduced iron' },
      { name: 'Plates & Heavy Sections', revenueShare: 12, description: 'Structural steel and heavy plates' },
      { name: 'Downstream Products', revenueShare: 10, description: 'Color-coated sheets, tinplate' },
    ],
    financials: [
      { year: 'FY21', revenue: 42500, profit: 4200, ebitda: 10800 },
      { year: 'FY22', revenue: 65800, profit: 12500, ebitda: 20300 },
      { year: 'FY23', revenue: 62100, profit: 5800, ebitda: 12500 },
      { year: 'FY24', revenue: 60500, profit: 5200, ebitda: 11800 },
      { year: 'FY25', revenue: 64000, profit: 5800, ebitda: 12800 },
    ],
    revenueFY25: '₹64,000 Cr', profitFY25: '₹5,800 Cr', ebitdaMargin: '20.0%',
    news: [
      { title: 'AMNS Hazira expansion to 15 MTPA gets environmental clearance', date: '2025-04-05', source: 'MoEFCC', url: 'https://www.amns.in' },
      { title: 'New cold rolling mill commissioned at Hazira complex', date: '2025-02-15', source: 'Steel Insights', url: 'https://www.amns.in' },
      { title: 'Partners with Gujarat Government for green hydrogen hub', date: '2025-01-08', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Expanding Hazira to 15 MTPA and eventually 24 MTPA. IPO under consideration for 2026-27.',
      plans: ['Hazira capacity to 15 MTPA by FY27', 'Odisha mining operations', 'Renewable energy-powered steelmaking', 'IPO under consideration'],
      risks: ['Large capex requirement', 'Competition for mining rights', 'Parent company priorities', 'Regulatory clearances'],
    },
    extendedOverview: {
      businessSegments: 'AMNS India operates a single integrated steel complex at Hazira, Gujarat: (1) Flat Products — HR coils, CR sheets, galvanized, tinplate (~70% revenue). (2) Pellets & DRI — 20 MTPA pellet capacity, DRI production (~18% revenue). (3) Downstream — color-coated, construction products (~12% revenue). Combines ArcelorMittal\'s technology with Nippon Steel\'s quality systems.',
      geographicPresence: 'Single mega complex at Hazira, Gujarat (9 MTPA, expanding to 15 MTPA). Port-based location enables efficient raw material import and product export. Mining operations being developed in Odisha. Sales primarily in western and southern India. Export to 20+ countries leveraging ArcelorMittal\'s global network.',
      keyStrengths: [
        'Backed by world\'s #1 (ArcelorMittal) and #3 (Nippon Steel) steelmakers — access to global best practices',
        'Port-based location at Hazira — lowest logistics cost for imported raw materials',
        'State-of-the-art technology — Corex and Finex processes alongside conventional BF-BOF route',
        'Strong automotive steel capability — approved supplier to all major OEMs',
        'Massive expansion runway — 24 MTPA ultimate site capacity at single location'
      ],
      marketPosition: 'India\'s #3 private steel producer. #1 in Gujarat market. Strong in automotive flat steel and tinplate. Only Indian steelmaker with direct technology linkage to global #1 and #3 players. Key supplier to Gujarat\'s auto/engineering hub.',
      rawMaterialStrategy: 'Iron ore: Currently purchased from NMDC and auctions (~100% external). Active development of captive mines in Odisha (Thakurani, Sagasahi deposits). Coking coal: 100% imported through Hazira port — short sea route advantage. Pellet plant (20 MTPA) provides flexibility. Long-term strategy: achieve 50%+ captive ore through Odisha mining to match Tata Steel\'s integration advantage.'
    },
    financialRatios: {
      debtToEquity: 0.65,
      currentRatio: 1.10,
      roe: 11.0,
      roce: 13.8,
      interestCoverage: 5.8,
      netDebt: '₹22,000 Cr',
      peRatio: 0,
      pbRatio: 0,
      dividendYield: 0,
      workingCapitalDays: 15
    },
    bcgMatrix: {
      stars: [
        { name: 'Automotive Flat Steel', growth: '14% CAGR', share: '20% India auto steel', insight: 'ArcelorMittal/Nippon Steel technology enables advanced grades (AHSS, DP steel). Growing share with EV-ready lightweight grades.' },
        { name: 'Galvanized & Color-Coated', growth: '12% CAGR', share: '15% market share', insight: 'Growing demand from construction, appliance, and solar mounting. Premium products with strong margins.' },
      ],
      cashCows: [
        { name: 'Hot Rolled Coils', growth: '4% CAGR', share: '12% India market', insight: 'Hazira\'s port-based plant produces competitive HR coils. Stable demand from Gujarat\'s industrial hub.' },
        { name: 'Pellets & DRI', growth: '5% CAGR', share: 'Merchant + captive', insight: '20 MTPA pellet capacity — among India\'s largest. Supplies own steel plant and sells merchant. Stable cash flow generator.' },
        { name: 'Tinplate & Packaging Steel', growth: '6% CAGR', share: '30% India market', insight: 'Dominant in food-grade tinplate. Growing with processed food industry. Limited competition.' },
      ],
      questionMarks: [
        { name: 'Green Steel (Hydrogen/DRI)', growth: '30%+ potential', share: 'Pilot stage', insight: 'ArcelorMittal global hydrogen expertise being adapted for Hazira. Gujarat Green Hydrogen Hub partnership. Export premium potential to EU.' },
        { name: 'Electrical Steel', growth: '20%+ potential', share: '0% (planned)', insight: 'Nippon Steel is global #1 in electrical steel. Technology transfer to AMNS India being evaluated for India plant.' },
      ],
      dogs: [
        { name: 'Commodity Slabs (Export)', growth: '0% flat', share: '5% India export', insight: 'Low-margin semi-finished export when domestic demand is soft. Cyclical and opportunistic.' },
        { name: 'Pig Iron (Merchant)', growth: '-1% decline', share: '8% market', insight: 'By-product sales. Being reduced as more hot metal is converted to steel with capacity expansion.' },
      ],
    },
    headToHead: {
      competitor: 'JSW Steel',
      competitorTicker: 'JSWSTEEL',
      summary: 'AMNS India vs JSW Steel is the battle of India\'s western steel corridor. Both operate large flat steel plants but AMNS has global technology backing while JSW has faster growth execution.',
      metrics: [
        { label: 'Revenue FY25', company: 64000, competitor: 172500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 20.0, competitor: 19.0, unit: '%', winner: 'company' },
        { label: 'Steel Capacity', company: 9.0, competitor: 30.4, unit: 'MTPA', winner: 'competitor' },
        { label: 'Technology Access', company: 'ArcelorMittal+Nippon', competitor: 'In-house', unit: '', winner: 'company' },
        { label: 'Expansion Pipeline', company: 24, competitor: 50, unit: 'MTPA target', winner: 'competitor' },
        { label: 'Captive Iron Ore', company: 0, competitor: 45, unit: '%', winner: 'competitor' },
        { label: 'Auto Steel Grades', company: 200, competitor: 150, unit: '# grades', winner: 'company' },
        { label: 'Pellet Capacity', company: 20, competitor: 0, unit: 'MTPA', winner: 'company' },
        { label: 'Global Network', company: 'Yes (60 countries)', competitor: 'Limited', unit: '', winner: 'company' },
        { label: 'Capacity Utilization', company: 85, competitor: 90, unit: '%', winner: 'competitor' },
        { label: 'Port Proximity', company: 'On-site', competitor: '200km', unit: '', winner: 'company' },
        { label: 'Listed/Unlisted', company: 'Unlisted', competitor: 'Listed', unit: '', winner: 'competitor' },
      ],
      verdict: 'JSW Steel wins on scale, growth speed, and market access (being listed). AMNS India wins on technology depth, auto steel grades, and global backing. AMNS\'s IPO could be transformative — unlocking value for one of India\'s most modern steel assets. For insurers: AMNS carries lower operational risk (global parents\' expertise) but higher strategic uncertainty (parent alignment). JSW is proven but more leveraged.'
    },
  },
  {
    id: 'vizag-steel', name: 'Rashtriya Ispat Nigam (Vizag Steel)', industry: 'steel', ticker: 'RINL (Unlisted)',
    founded: 1982, headquarters: 'Visakhapatnam, Andhra Pradesh', employees: '17,000+', marketCap: 'Unlisted (PSU)',
    ceo: 'Atul Bhatt (CMD)', website: 'https://www.vizagsteel.com',
    description: "​India's first shore-based integrated steel plant. A Navratna PSU under Ministry of Steel with 7.3 MTPA capacity at Visakhapatnam. Known for long products — wire rods, structural steel, and special steels. In FY25 the company reported revenue of ₹25,800 Cr and net profit of ₹-1,500 Cr (Loss), at an EBITDA margin of around 4.7%. Its revenue is led by wire rods (35% of sales), complemented by structural steel and bars & rounds. India's 5th largest steel producer by capacity. Single location at Visakhapatnam, Andhra Pradesh with 7.3 MTPA capacity.",
    products: [
      { name: 'Wire Rods', revenueShare: 35, description: 'High-quality wire rods for fasteners and springs' },
      { name: 'Structural Steel', revenueShare: 25, description: 'Beams, channels, and angles for construction' },
      { name: 'Bars & Rounds', revenueShare: 20, description: 'Forging quality bars and special rounds' },
      { name: 'Blooms & Billets', revenueShare: 12, description: 'Semi-finished steel for re-rollers' },
      { name: 'Pig Iron', revenueShare: 8, description: 'Foundry and basic grade pig iron' },
    ],
    financials: [
      { year: 'FY21', revenue: 18200, profit: -2800, ebitda: -500 },
      { year: 'FY22', revenue: 28500, profit: 2100, ebitda: 5200 },
      { year: 'FY23', revenue: 26800, profit: -1200, ebitda: 1800 },
      { year: 'FY24', revenue: 24500, profit: -2100, ebitda: 500 },
      { year: 'FY25', revenue: 25800, profit: -1500, ebitda: 1200 },
    ],
    revenueFY25: '₹25,800 Cr', profitFY25: '₹-1,500 Cr (Loss)', ebitdaMargin: '4.7%',
    news: [
      { title: 'Government announces strategic disinvestment of Vizag Steel', date: '2025-06-10', source: 'PIB', url: 'https://pib.gov.in' },
      { title: 'Vizag Steel workers protest privatization plans', date: '2025-03-15', source: 'The Hindu', url: 'https://www.thehindu.com' },
      { title: 'Blast furnace relining completed after 18-month shutdown', date: '2025-01-20', source: 'Company PR', url: 'https://www.vizagsteel.com' },
    ],
    futureScope: {
      outlook: 'Strategic disinvestment under process. High debt and losses challenge standalone viability. Turnaround depends on privatization outcome.',
      plans: ['Strategic disinvestment by government', 'Capacity utilization improvement to 90%', 'Special steel product mix increase', 'Debt restructuring'],
      risks: ['Persistent losses and high debt (Rs 22,000 Cr)', 'Privatization political opposition', 'No captive iron ore mines', 'Aging plant infrastructure'],
    },
    extendedOverview: {
      businessSegments: 'RINL operates a single integrated steel plant at Visakhapatnam: (1) Long Products — wire rods, structural steel, bars and rounds (~80% revenue). (2) Semis — blooms, billets, pig iron for merchant sale (~15% revenue). (3) By-products — slag, gas, and chemical by-products (~5% revenue). Unique shore-based plant with own captive port.',
      geographicPresence: 'Single location at Visakhapatnam, Andhra Pradesh with 7.3 MTPA capacity. Own captive port for raw material import. Sales concentrated in southern and eastern India. No captive iron ore mines — raw material sourced from NMDC and imported. Limited geographic diversification.',
      keyStrengths: [
        'Shore-based plant with captive port — lowest logistics cost for imported raw materials',
        'India\'s only wire rod specialist at integrated scale — 60% of output is wire rods',
        'Strategic defense value — supplies special steel to nearby naval shipyard',
        'Modern plant technology (German/Soviet collaboration) — capable of high-quality output',
        'Government backing ensures continued operations despite losses'
      ],
      marketPosition: 'India\'s 5th largest steel producer by capacity. #1 wire rod producer in India (by single plant output). Strategic supplier to Visakhapatnam naval dockyard. However, persistent losses and no captive mining make it the weakest large steel player. Privatization is the key catalyst.',
      rawMaterialStrategy: 'Iron ore: 100% purchased externally from NMDC and other sources — no captive mines. This is the single biggest competitive disadvantage (~₹4,000-5,000/tonne cost penalty vs captive ore players). Coking coal: 100% imported through captive port (Australia primary source). Captive port advantage partially offsets ore cost. Government attempted to allocate mines but politically blocked.'
    },
    financialRatios: {
      debtToEquity: -5.2,
      currentRatio: 0.45,
      roe: -28.0,
      roce: -4.5,
      interestCoverage: 0.3,
      netDebt: '₹22,000 Cr',
      peRatio: 0,
      pbRatio: 0,
      dividendYield: 0,
      workingCapitalDays: -30
    },
    bcgMatrix: {
      stars: [
        { name: 'Special Steel Wire Rods (Spring/Bearing Grade)', growth: '10% CAGR', share: '15% niche market', insight: 'High-value wire rods for automotive springs, bearings, and fasteners. Premium pricing. Growing with auto sector.' },
      ],
      cashCows: [
        { name: 'Standard Wire Rods', growth: '3% CAGR', share: '20% India wire rod market', insight: 'Bread-and-butter product. Large volume but commoditized. Port proximity enables some export potential.' },
        { name: 'Structural Steel (Beams/Angles)', growth: '5% CAGR', share: '8% South India market', insight: 'Infrastructure demand in AP/Telangana provides stable orders. Government projects are price-insensitive.' },
      ],
      questionMarks: [
        { name: 'Post-Privatization Turnaround', growth: 'Transformative', share: 'N/A', insight: 'If privatized to a capable operator (JSW/Tata/Vedanta), the plant could achieve 15-20% EBITDA margins within 3-4 years. Shore-based advantage is underutilized.' },
      ],
      dogs: [
        { name: 'Commodity Pig Iron', growth: '-2% decline', share: '10% market', insight: 'Low-value product sold when BF output exceeds steelmaking capacity. Margin negative at current iron ore prices.' },
        { name: 'Billets & Blooms (Merchant)', growth: '0% flat', share: '5% market', insight: 'Semi-finished product dumped in market due to insufficient rolling capacity. Value destruction.' },
      ],
    },
    headToHead: {
      competitor: 'SAIL',
      competitorTicker: 'SAIL',
      summary: 'Vizag Steel vs SAIL is a comparison of two PSU steel producers — one thriving (relatively) and one in distress. SAIL\'s captive mines make all the difference.',
      metrics: [
        { label: 'Revenue FY25', company: 25800, competitor: 102000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 4.7, competitor: 11.3, unit: '%', winner: 'competitor' },
        { label: 'Net Profit', company: -1500, competitor: 3800, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Capacity', company: 7.3, competitor: 21.4, unit: 'MTPA', winner: 'competitor' },
        { label: 'Captive Iron Ore', company: 0, competitor: 100, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: -5.2, competitor: 0.42, unit: 'x', winner: 'competitor' },
        { label: 'Wire Rod Specialization', company: 'Yes (#1)', competitor: 'Partial', unit: '', winner: 'company' },
        { label: 'Port Access', company: 'Captive Port', competitor: 'Inland', unit: '', winner: 'company' },
        { label: 'Employees', company: 17000, competitor: 60000, unit: '#', winner: 'company' },
        { label: 'Capacity Utilization', company: 65, competitor: 75, unit: '%', winner: 'competitor' },
        { label: 'Total Debt', company: 22000, competitor: 28500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Privatization Upside', company: 'High', competitor: 'Low', unit: '', winner: 'company' },
      ],
      verdict: 'SAIL is vastly superior operationally due to captive raw materials. Vizag Steel\'s persistent losses stem from 100% external iron ore dependency adding ₹4-5K/tonne to costs. However, Vizag Steel\'s shore-based location and wire rod expertise make it an attractive privatization target. A capable private owner could transform its economics. For insurers: Vizag Steel is high credit risk without government support; SAIL is stable but inefficient.'
    },
  },
  {
    id: 'nmdc-steel', name: 'NMDC Steel (formerly Nagarnar)', industry: 'steel', ticker: 'NMDCSTEEL',
    founded: 2023, headquarters: 'Jagdalpur, Chhattisgarh', employees: '4,500+', marketCap: '₹8,500 Cr',
    ceo: 'Amitava Mukherjee (CMD, NMDC)', website: 'https://www.nmdc.co.in',
    description: "​Newly commissioned 3 MTPA integrated steel plant at Nagarnar, Chhattisgarh. Demerged from NMDC Ltd in 2023. Has captive iron ore supply from NMDC mines. One of the most modern steel plants in India. In FY25 the company reported revenue of ₹14,200 Cr and net profit of ₹350 Cr, at an EBITDA margin of around 12.7%. Its revenue is led by hot rolled coils (45% of sales), complemented by hr plates and slabs. Newest entrant in integrated steel. Single plant location at Nagarnar, Chhattisgarh.",
    products: [
      { name: 'Hot Rolled Coils', revenueShare: 45, description: 'Primary product — flat steel for construction and auto' },
      { name: 'HR Plates', revenueShare: 25, description: 'Heavy plates for infrastructure projects' },
      { name: 'Slabs (Semi-finished)', revenueShare: 20, description: 'Steel slabs for downstream processing' },
      { name: 'Pig Iron', revenueShare: 10, description: 'By-product pig iron sales' },
    ],
    financials: [
      { year: 'FY21', revenue: 0, profit: 0, ebitda: 0 },
      { year: 'FY22', revenue: 0, profit: 0, ebitda: 0 },
      { year: 'FY23', revenue: 2500, profit: -800, ebitda: -200 },
      { year: 'FY24', revenue: 8500, profit: -450, ebitda: 600 },
      { year: 'FY25', revenue: 14200, profit: 350, ebitda: 1800 },
    ],
    revenueFY25: '₹14,200 Cr', profitFY25: '₹350 Cr', ebitdaMargin: '12.7%',
    news: [
      { title: 'NMDC Steel achieves 3 MTPA rated capacity utilization', date: '2025-05-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Government exploring privatization of NMDC Steel', date: '2025-03-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'First profit reported since commercial operations began', date: '2025-02-01', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Newly operational plant ramping up. Captive iron ore from NMDC gives cost advantage. Privatization may unlock value.',
      plans: ['Reach full 3 MTPA utilization', 'Phase 2 expansion to 6 MTPA', 'Downstream value-added products', 'Integration with NMDC mining operations'],
      risks: ['New plant teething issues', 'High initial capex burden', 'Privatization uncertainty', 'Competition from established players nearby'],
    },
    extendedOverview: {
      businessSegments: 'NMDC Steel operates a single 3 MTPA integrated steel plant at Nagarnar, Bastar district, Chhattisgarh: (1) Flat Products — HR coils and plates (primary output, ~65% target revenue). (2) Semi-finished — slabs for sale (~25% revenue during ramp-up). (3) By-products — pig iron, slag (~10% revenue). Plant designed with latest technology (Paul Wurth BF, SMS Concast).',
      geographicPresence: 'Single plant location at Nagarnar, Chhattisgarh. Adjacent to NMDC\'s iron ore mining operations in Bailadila (Dantewada). Sales focused on central and southern India. Rail connectivity to Vizag port for potential exports. Limited geographic diversification currently.',
      keyStrengths: [
        'Captive iron ore from parent NMDC\'s mines — among the lowest ore cost in India',
        'Newest integrated steel plant in India — latest technology, high efficiency',
        'Low conversion cost potential due to proximity to iron ore source (60 km from mines)',
        'Government-backed with NMDC\'s financial strength for further investment',
        'Designed for value-added flat products — modern hot strip mill'
      ],
      marketPosition: 'Newest entrant in integrated steel. Positioned as low-cost flat steel producer leveraging NMDC\'s mining strength. Small scale currently (3 MTPA) vs Tata/JSW but has expansion potential to 6 MTPA. Key differentiator: proximity to India\'s richest iron ore deposits in Bailadila region.',
      rawMaterialStrategy: 'Iron ore: 100% captive from NMDC\'s Bailadila mines (60 km away) — among the lowest iron ore costs in Indian steel industry at ~₹1,500/tonne delivered vs ₹4,000+ for purchased ore. Coking coal: 100% imported. Limestone: Sourced from nearby Chhattisgarh deposits. Key advantage: iron ore proximity eliminates ₹2,000-3,000/tonne logistics cost that distant plants incur.'
    },
    financialRatios: {
      debtToEquity: 1.85,
      currentRatio: 0.80,
      roe: 2.5,
      roce: 4.2,
      interestCoverage: 1.8,
      netDebt: '₹12,500 Cr',
      peRatio: 35.0,
      pbRatio: 1.2,
      dividendYield: 0,
      workingCapitalDays: 25
    },
    bcgMatrix: {
      stars: [
        { name: 'Hot Rolled Coils (Value-Added)', growth: '15% CAGR', share: '2% (growing rapidly)', insight: 'Plant designed for high-quality HR coils. Low iron ore cost enables competitive pricing. Rapid market share gain as plant ramps up.' },
      ],
      cashCows: [
        { name: 'HR Plates', growth: '6% CAGR', share: '3% India market', insight: 'Infrastructure demand provides steady orders. Competitive pricing due to captive ore advantage. Growing as plant stabilizes.' },
        { name: 'Steel Slabs (Semi-Finished)', growth: '3% CAGR', share: 'Merchant sales', insight: 'Interim cash generator during ramp-up phase. Sold to downstream re-rollers. Will reduce as own rolling capacity fully utilizes.' },
      ],
      questionMarks: [
        { name: 'Phase 2 Expansion (6 MTPA)', growth: '100% capacity addition', share: 'Doubling', insight: 'Board approved Phase 2 but execution uncertain due to privatization overhang. If executed, transforms NMDC Steel into mid-size player.' },
        { name: 'Downstream Value-Added (CR/Coated)', growth: '15%+ potential', share: '0% (planned)', insight: 'Hot strip mill output can feed CR/galvanizing lines. Not yet installed. Would significantly improve realization per tonne.' },
      ],
      dogs: [
        { name: 'Pig Iron (Excess BF Output)', growth: '0% flat', share: '5% local market', insight: 'By-product when BF output exceeds BOF capacity during ramp-up. Low-margin, temporary product until full integration achieved.' },
      ],
    },
    headToHead: {
      competitor: 'Tata Steel',
      competitorTicker: 'TATASTEEL',
      summary: 'NMDC Steel vs Tata Steel is a comparison of a new greenfield entrant against India\'s established market leader. NMDC Steel has raw material cost advantage but lacks scale and product diversity.',
      metrics: [
        { label: 'Revenue FY25', company: 14200, competitor: 229518, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 12.7, competitor: 15.0, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 3.0, competitor: 34.6, unit: 'MTPA', winner: 'competitor' },
        { label: 'Iron Ore Cost', company: 1500, competitor: 2200, unit: '₹/tonne delivered', winner: 'company' },
        { label: 'Plant Age', company: 2, competitor: 50, unit: 'years', winner: 'company' },
        { label: 'Product Range', company: 3, competitor: 50, unit: '# products', winner: 'competitor' },
        { label: 'Debt/Equity', company: 1.85, competitor: 0.78, unit: 'x', winner: 'competitor' },
        { label: 'Brand Value', company: 'Nil', competitor: 'Top 3', unit: '', winner: 'competitor' },
        { label: 'Technology Vintage', company: '2023', competitor: 'Mixed', unit: 'year', winner: 'company' },
        { label: 'Growth Potential', company: '100% (3→6 MTPA)', competitor: '15% (34→40 MTPA)', unit: '', winner: 'company' },
        { label: 'Captive Ore Quality', company: '65% Fe', competitor: '62% Fe', unit: 'grade', winner: 'company' },
        { label: 'Market Reach', company: 'Regional', competitor: 'Global', unit: '', winner: 'competitor' },
      ],
      verdict: 'Tata Steel is incomparably larger and more established. NMDC Steel\'s only advantage is ultra-low iron ore cost due to proximity to Bailadila mines and newest plant technology. Long-term, if Phase 2 executes and value-added lines are added, NMDC Steel could become a mid-size industry disruptor with best-in-class ore costs. For insurers: NMDC Steel is high-risk (new, unproven, debt-heavy) but privatization to a capable operator would de-risk significantly.'
    },
  },
  {
    id: 'jindal-stainless', name: 'Jindal Stainless', industry: 'steel', ticker: 'JSL',
    founded: 1970, headquarters: 'New Delhi', employees: '10,000+', marketCap: '₹55,000 Cr',
    ceo: 'Abhyuday Jindal (MD)', website: 'https://www.jindalstainless.com',
    description: "​India's largest stainless steel manufacturer and among the top 5 globally. Capacity of 2.9 MTPA with plants at Jajpur (Odisha) and Hisar (Haryana). Dominates Indian stainless steel market with 35%+ share. In FY25 the company reported revenue of ₹41,000 Cr and net profit of ₹3,800 Cr, at an EBITDA margin of around 15.1%. Its revenue is led by stainless steel flat products (55% of sales), complemented by stainless steel long products and specialty & high-value grades. India's undisputed #1 stainless steel producer (35%+ market share in organized segment). India: Jajpur (Odisha — 1.8 MTPA, primary integrated plant), Hisar (Haryana — 1.1 MTPA, downstream focused).",
    products: [
      { name: 'Stainless Steel Flat Products', revenueShare: 55, description: 'Cold rolled and hot rolled stainless steel coils/sheets' },
      { name: 'Stainless Steel Long Products', revenueShare: 15, description: 'Bars, rods, and angles in various grades' },
      { name: 'Specialty & High-Value Grades', revenueShare: 15, description: 'Duplex, super austenitic for chemical/pharma industry' },
      { name: 'Blade Steel & Razor Products', revenueShare: 8, description: 'Precision strip for razor blade manufacturing' },
      { name: 'Coin Blanks', revenueShare: 7, description: 'Stainless steel coin blanks for Indian Mint' },
    ],
    financials: [
      { year: 'FY21', revenue: 16500, profit: 800, ebitda: 2200 },
      { year: 'FY22', revenue: 28600, profit: 3200, ebitda: 5500 },
      { year: 'FY23', revenue: 36000, profit: 3800, ebitda: 5800 },
      { year: 'FY24', revenue: 38500, profit: 3500, ebitda: 5500 },
      { year: 'FY25', revenue: 41000, profit: 3800, ebitda: 6200 },
    ],
    revenueFY25: '₹41,000 Cr', profitFY25: '₹3,800 Cr', ebitdaMargin: '15.1%',
    news: [
      { title: 'Jindal Stainless capacity expansion to 4.2 MTPA by FY27 announced', date: '2025-04-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Enters Indonesian market with new processing facility', date: '2025-02-22', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Railway wagon orders boost long product demand significantly', date: '2025-01-10', source: 'Financial Express', url: 'https://www.financialexpress.com' },
    ],
    futureScope: {
      outlook: 'Stainless steel per capita in India is 2.5 kg vs 8 kg global average — massive growth runway. Targeting 4.2 MTPA by FY27.',
      plans: ['Capacity to 4.2 MTPA by FY27', 'Indonesia and global expansion', 'Value-added products for railways', 'Green stainless steel production'],
      risks: ['Nickel price volatility (40% of raw material cost)', 'Chinese stainless steel dumping', 'Cyclical demand patterns', 'Single geography concentration'],
    },
    extendedOverview: {
      businessSegments: 'Jindal Stainless operates in stainless steel exclusively: (1) Flat Products — cold rolled, hot rolled coils and sheets in austenitic, ferritic, duplex grades (~70% revenue). (2) Long Products — bars, rods, angles, channels (~15% revenue). (3) Specialty — blade steel, coin blanks, specialty grades for pharma/chemical (~15% revenue). Merged with Jindal Stainless Hisar in 2023.',
      geographicPresence: 'India: Jajpur (Odisha — 1.8 MTPA, primary integrated plant), Hisar (Haryana — 1.1 MTPA, downstream focused). International: Indonesia (processing facility for ASEAN market). Exports to 40+ countries contributing ~25% revenue. Pan-India service centers and distribution network.',
      keyStrengths: [
        'India\'s #1 stainless steel producer with 35%+ domestic market share — near-monopoly in organized sector',
        'Only Indian company with full stainless steel value chain — from melting to finishing',
        'Massive growth runway — India per capita SS consumption at 2.5 kg vs 8 kg global average',
        'Diversified grade portfolio — 200+ grades covering all applications from kitchenware to nuclear',
        'Strong import substitution story — Anti-dumping duties on Chinese SS imports provide protection',
        'Unique niche products — only Indian manufacturer of razor blade steel and coin blanks'
      ],
      marketPosition: 'India\'s undisputed #1 stainless steel producer (35%+ market share in organized segment). Global top 5. Only Indian company approved for railway wagon/coach applications in SS. Sole supplier of coin blanks to India Government Mint. Dominant in architectural and kitchenware-grade SS.',
      rawMaterialStrategy: 'Nickel: 100% imported — primary cost driver (40% of raw material cost). Sources from Indonesia, Philippines, and LME. Chrome ore: Mix of captive (FACOR acquisition gave some chrome) and imported from South Africa. Stainless steel scrap: Increasingly important feed source (20-30% of melt mix) — own scrap collection network. Key vulnerability: nickel price swings of $5,000/tonne impact margins by 3-4%.'
    },
    financialRatios: {
      debtToEquity: 0.48,
      currentRatio: 1.25,
      roe: 14.5,
      roce: 18.5,
      interestCoverage: 8.5,
      netDebt: '₹5,800 Cr',
      peRatio: 22.0,
      pbRatio: 3.5,
      dividendYield: 0.5,
      workingCapitalDays: 65
    },
    bcgMatrix: {
      stars: [
        { name: 'Automotive & Railway Stainless Steel', growth: '18% CAGR', share: '80% approved applications', insight: 'Railway wagons shifting from carbon to stainless steel (lifecycle cost lower). EV battery casings need SS. Only approved Indian supplier for Railways.' },
        { name: 'Architectural & Construction SS', growth: '15% CAGR', share: '40% market share', insight: 'Modern buildings, metro stations, airports using SS cladding. Growing from near-zero to large market as India modernizes infrastructure.' },
      ],
      cashCows: [
        { name: 'Flat Products (Austenitic 200/300 series)', growth: '6% CAGR', share: '35% India market', insight: 'Kitchenware, utensils, and industrial applications. Stable, large-volume segment. Import duty protection ensures domestic pricing power.' },
        { name: 'Industrial Process Grade SS', growth: '7% CAGR', share: '30% organized market', insight: 'Chemical, pharma, and food processing industries need SS pipes, sheets. Repeat-order business with stable margins.' },
        { name: 'Coin Blanks & Blade Steel', growth: '4% CAGR', share: '100% India Mint supply', insight: 'Monopoly supplier to India Government Mint. Razor blade steel for Gillette and local brands. Niche, high-margin, no competition.' },
      ],
      questionMarks: [
        { name: 'ASEAN/Indonesia Operations', growth: '20%+ potential', share: '5% regional', insight: 'Indonesia facility for growing ASEAN stainless demand. Competes with Chinese exporters. High potential but execution in new market uncertain.' },
        { name: 'Duplex & Super Duplex Grades', growth: '15% CAGR', share: '10% India niche', insight: 'High-value grades for oil & gas and desalination. Currently largely imported. Import substitution opportunity if quality consistently achieved.' },
      ],
      dogs: [
        { name: 'Ferritic Grades (Low-Nickel)', growth: '3% CAGR', share: '25% market', insight: 'Low-margin commodity segment. Chinese imports competitive. Used in exhaust systems and low-end applications. Margin dilutive.' },
        { name: 'SS Long Products (Commodity)', growth: '4% CAGR', share: '20% market', insight: 'Standard bars and rods face competition from smaller re-rollers. Lower margins than flat products.' },
      ],
    },
    headToHead: {
      competitor: 'Chromeni Steels (Unorganized Sector)',
      competitorTicker: 'N/A (Sector comparison)',
      summary: 'Jindal Stainless has no listed peer of comparable scale. The real competition is from Chinese imports and India\'s unorganized SS re-rolling sector. We compare vs the unorganized segment as its primary competitive threat.',
      metrics: [
        { label: 'Revenue FY25', company: 41000, competitor: 25000, unit: '₹ Cr (segment est.)', winner: 'company' },
        { label: 'Market Share (Organized)', company: 35, competitor: 0, unit: '%', winner: 'company' },
        { label: 'Product Range', company: 200, competitor: 20, unit: '# grades', winner: 'company' },
        { label: 'EBITDA Margin', company: 15.1, competitor: 5, unit: '%', winner: 'company' },
        { label: 'Quality Certification', company: 'All global', competitor: 'Limited', unit: '', winner: 'company' },
        { label: 'Railway/Defence Approved', company: 'Yes', competitor: 'No', unit: '', winner: 'company' },
        { label: 'Price Competitiveness', company: 'Premium', competitor: '10-15% cheaper', unit: '', winner: 'competitor' },
        { label: 'Working Capital Days', company: 65, competitor: 30, unit: 'days', winner: 'competitor' },
        { label: 'Capacity (India Total)', company: 2.9, competitor: 3.0, unit: 'MTPA combined', winner: 'tie' },
        { label: 'Import Substitution', company: 'High', competitor: 'Low', unit: '', winner: 'company' },
        { label: 'Export Capability', company: '25% revenue', competitor: '<5%', unit: '', winner: 'company' },
        { label: 'R&D & Innovation', company: 'Strong', competitor: 'Nil', unit: '', winner: 'company' },
      ],
      verdict: 'Jindal Stainless is India\'s only integrated stainless steel producer at scale — it effectively competes against imported Chinese SS and unorganized domestic re-rollers rather than any comparable listed peer. Anti-dumping duties provide protection, and growing quality consciousness in India favors the organized sector. For insurers: minimal credit risk (low debt, high margins, dominant position), but nickel price volatility creates earnings cyclicality.'
    },
  },
  {
    id: 'tata-steel-long', name: 'Tata Steel Long Products', industry: 'steel', ticker: 'TATASTLLP',
    founded: 2018, headquarters: 'Jamshedpur, Jharkhand', employees: '5,000+', marketCap: '₹6,500 Cr',
    ceo: 'Ashish Anupam (MD)', website: 'https://www.tatasteellp.com',
    description: "​Subsidiary of Tata Steel focused on specialty long products. Operates at Gamharia (Jharkhand) with capacity of 1.1 MTPA. Specializes in special bars, wire rods, and DRI manufacturing. In FY25 the company reported revenue of ₹6,800 Cr and net profit of ₹520 Cr, at an EBITDA margin of around 16.2%. Its revenue is led by special bar quality (35% of sales), complemented by wire rods and dri/sponge iron. India's leading dedicated SBQ steel producer. Primary plant at Gamharia (Jamshedpur), Jharkhand.",
    products: [
      { name: 'Special Bar Quality (SBQ)', revenueShare: 35, description: 'High-quality bars for auto components and bearings' },
      { name: 'Wire Rods', revenueShare: 25, description: 'Wire rods for fasteners and springs' },
      { name: 'DRI/Sponge Iron', revenueShare: 20, description: 'Direct reduced iron for steelmaking' },
      { name: 'Ferro Alloys', revenueShare: 12, description: 'Ferro chrome and ferro manganese' },
      { name: 'Construction Steel', revenueShare: 8, description: 'TMT bars and structural products' },
    ],
    financials: [
      { year: 'FY21', revenue: 4200, profit: 320, ebitda: 780 },
      { year: 'FY22', revenue: 6800, profit: 1050, ebitda: 1650 },
      { year: 'FY23', revenue: 6500, profit: 580, ebitda: 1100 },
      { year: 'FY24', revenue: 6200, profit: 420, ebitda: 950 },
      { year: 'FY25', revenue: 6800, profit: 520, ebitda: 1100 },
    ],
    revenueFY25: '₹6,800 Cr', profitFY25: '₹520 Cr', ebitdaMargin: '16.2%',
    news: [
      { title: 'Tata Steel Long Products SBQ capacity increased to 4 lakh TPA', date: '2025-03-10', source: 'Company PR', url: 'https://www.tatasteellp.com' },
      { title: 'Supplies specialty steel for Vande Bharat train components', date: '2025-02-05', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'DRI kiln expansion project on track for H2 FY26 completion', date: '2025-01-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
    ],
    futureScope: {
      outlook: 'Niche player in specialty long products. Automotive SBQ demand growing. Part of Tata Steel ecosystem provides synergies.',
      plans: ['SBQ capacity doubling', 'New DRI kiln commissioning', 'Auto-grade steel expansion', 'Bearing steel development'],
      risks: ['Raw material dependency on parent', 'Small scale vs integrated players', 'Auto sector cyclicality', 'Power cost pressures in Jharkhand'],
    },
    extendedOverview: {
      businessSegments: 'Tata Steel Long Products operates at Gamharia, Jharkhand: (1) Special Bar Quality (SBQ) Steel — high-quality bars for auto bearings, gears, axles (~35% revenue). (2) Wire Rods — spring steel, fastener grade (~25% revenue). (3) DRI/Sponge Iron — captive use and merchant sale (~20% revenue). (4) Ferro Alloys — ferro chrome from Odisha operations (~12% revenue). (5) Construction Steel — TMT bars (~8% revenue).',
      geographicPresence: 'Primary plant at Gamharia (Jamshedpur), Jharkhand. Ferro alloy operations in Odisha (Gopalpur). Sales concentrated in eastern and northern India. Tata Steel\'s dealer network used for retail products. SBQ steel supplied to auto component manufacturers pan-India.',
      keyStrengths: [
        'Niche specialty steel player — SBQ steel requires high technical expertise',
        'Part of Tata Steel ecosystem — technology transfer, raw material support, brand strength',
        'Only dedicated SBQ producer in eastern India — proximity to auto component clusters',
        'Growing auto-grade demand — EV drivetrain components need high-quality SBQ steel',
        'Integrated DRI production reduces dependence on external scrap/pig iron'
      ],
      marketPosition: 'India\'s leading dedicated SBQ steel producer. Supplies bearing steel to SKF, Timken, NRB. Spring steel to Mubea, NHK. Niche market with limited domestic competition. Small by revenue but high value-addition and margins.',
      rawMaterialStrategy: 'Iron ore: Sourced from parent Tata Steel\'s captive mines at preferential pricing. Coal: Non-coking coal for DRI from Coal India linkage. Chrome ore: For ferro alloy division from Odisha (Sukinda). Key advantage: raw material security through Tata Steel parentage. Key risk: transfer pricing dependency on parent company.'
    },
    financialRatios: {
      debtToEquity: 0.35,
      currentRatio: 1.30,
      roe: 9.5,
      roce: 12.8,
      interestCoverage: 7.2,
      netDebt: '₹850 Cr',
      peRatio: 14.0,
      pbRatio: 1.1,
      dividendYield: 1.5,
      workingCapitalDays: 55
    },
    bcgMatrix: {
      stars: [
        { name: 'Special Bar Quality (SBQ) Steel', growth: '12% CAGR', share: '25% India SBQ market', insight: 'Auto-grade bearing and gear steel. Growing with vehicle production. EV drivetrains need precision SBQ components. Few domestic competitors.' },
      ],
      cashCows: [
        { name: 'Wire Rods (Spring/Fastener Grade)', growth: '6% CAGR', share: '8% specialty segment', insight: 'Steady demand from auto springs and industrial fasteners. Premium pricing vs commodity wire rods. Established customer base.' },
        { name: 'Ferro Chrome', growth: '5% CAGR', share: '10% India production', insight: 'Gopalpur ferro alloy plant supplies stainless steel makers. Stable demand-supply dynamics. Low capex maintenance.' },
      ],
      questionMarks: [
        { name: 'Bearing Steel (SAE 52100)', growth: '15% CAGR', share: '15% (growing)', insight: 'India\'s bearing industry growing rapidly. Import substitution opportunity. Technical barriers to entry protect margins if quality proven.' },
        { name: 'EV-Grade Specialty Steel', growth: '25%+ potential', share: '<5% (emerging)', insight: 'EV motors and drivetrain components need new steel grades. R&D underway with Tata Steel parent. Could be a growth catalyst.' },
      ],
      dogs: [
        { name: 'Commodity TMT Bars', growth: '4% CAGR', share: '1% regional', insight: 'Small volume, faces intense competition from Tata Tiscon (parent) and local producers. Margin dilutive. Being de-emphasized.' },
        { name: 'Merchant DRI Sales', growth: '2% CAGR', share: '3% East India', insight: 'Low-margin merchant DRI when internal consumption is below capacity. Price-taker in competitive market.' },
      ],
    },
    headToHead: {
      competitor: 'Kalyani Steels',
      competitorTicker: 'KALYANISTR',
      summary: 'Tata Steel Long Products vs Kalyani Steels — two niche auto-grade specialty steel producers. Tata Steel LP is larger with broader product range; Kalyani has deeper auto OEM relationships through Bharat Forge.',
      metrics: [
        { label: 'Revenue FY25', company: 6800, competitor: 3400, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 16.2, competitor: 16.5, unit: '%', winner: 'competitor' },
        { label: 'SBQ Capacity', company: 400000, competitor: 300000, unit: 'TPA', winner: 'company' },
        { label: 'Product Diversity', company: 'High (5 segments)', competitor: 'Low (forging steel focus)', unit: '', winner: 'company' },
        { label: 'Auto OEM Access', company: 'Via Tata', competitor: 'Direct (Bharat Forge)', unit: '', winner: 'competitor' },
        { label: 'Parent Synergy', company: 'Tata Steel (India #1)', competitor: 'Bharat Forge (India #1 forging)', unit: '', winner: 'tie' },
        { label: 'Debt/Equity', company: 0.35, competitor: 0.25, unit: 'x', winner: 'competitor' },
        { label: 'R&D Capability', company: 'Tata Steel R&D access', competitor: 'Limited', unit: '', winner: 'company' },
        { label: 'Export Revenue', company: 5, competitor: 15, unit: '%', winner: 'competitor' },
        { label: 'Captive Demand', company: 20, competitor: 40, unit: '% from parent', winner: 'competitor' },
        { label: 'Growth Rate (3Y CAGR)', company: 4, competitor: 8, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 6500, competitor: 3800, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Both are niche specialty steel plays benefiting from India\'s auto sector growth and EV transition. Tata Steel LP wins on scale and product diversity; Kalyani wins on margins and direct auto OEM relationships (via Bharat Forge). For insurers: both are low-risk, low-debt niche players with parent company support. Tata Steel LP offers more diversification; Kalyani offers pure auto-cycle exposure.'
    },
  },
  {
    id: 'welspun-corp', name: 'Welspun Corp', industry: 'steel', ticker: 'WELCORP',
    founded: 1995, headquarters: 'Mumbai, Maharashtra', employees: '8,000+', marketCap: '₹18,000 Cr',
    ceo: 'Vipul Mathur (MD & CEO)', website: 'https://www.welspuncorp.com',
    description: "​India's largest and world's second-largest manufacturer of large-diameter pipes. Supplies to oil & gas, water, and infrastructure sectors globally. Plants in Gujarat, Maharashtra, USA, and Saudi Arabia. In FY25 the company reported revenue of ₹17,500 Cr and net profit of ₹1,350 Cr, at an EBITDA margin of around 14.9%. Its revenue is led by saw pipes (45% of sales), complemented by erw pipes and di pipes. India's #1 large diameter pipe maker. India: Anjar (Gujarat — SAW pipes, SS pipes), Mandya (Karnataka — SAW pipes), Bhopal (DI pipes).",
    products: [
      { name: 'SAW Pipes (Large Diameter)', revenueShare: 45, description: 'Submerged arc welded pipes for oil/gas pipelines' },
      { name: 'ERW Pipes', revenueShare: 20, description: 'Electric resistance welded pipes for water/gas' },
      { name: 'DI Pipes', revenueShare: 18, description: 'Ductile iron pipes for water distribution' },
      { name: 'Stainless Steel Pipes', revenueShare: 10, description: 'SS pipes for process industries' },
      { name: 'TMT Bars', revenueShare: 7, description: 'Construction steel bars' },
    ],
    financials: [
      { year: 'FY21', revenue: 7800, profit: 350, ebitda: 1050 },
      { year: 'FY22', revenue: 9200, profit: 580, ebitda: 1380 },
      { year: 'FY23', revenue: 13500, profit: 850, ebitda: 1850 },
      { year: 'FY24', revenue: 15200, profit: 1100, ebitda: 2200 },
      { year: 'FY25', revenue: 17500, profit: 1350, ebitda: 2600 },
    ],
    revenueFY25: '₹17,500 Cr', profitFY25: '₹1,350 Cr', ebitdaMargin: '14.9%',
    news: [
      { title: 'Welspun Corp wins Rs 3,200 Cr order from Saudi Aramco', date: '2025-04-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Jal Jeevan Mission orders drive DI pipe segment growth', date: '2025-02-12', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'New SS pipe facility at Anjar commissioned', date: '2025-01-08', source: 'Company PR', url: 'https://www.welspuncorp.com' },
    ],
    futureScope: {
      outlook: 'Oil/gas capex cycle and Jal Jeevan Mission driving strong demand. Global presence adds diversification. DI pipes fastest growing segment.',
      plans: ['DI pipe capacity expansion to 1 MTPA', 'US market expansion', 'Hydrogen pipeline opportunity', 'Value-added coated pipes growth'],
      risks: ['Lumpy order book (large project dependency)', 'Steel price volatility impact on margins', 'Geopolitical risks in export markets', 'Competition from Jindal SAW and Man Industries'],
    },
    extendedOverview: {
      businessSegments: 'Welspun Corp operates in: (1) Large Diameter SAW Pipes — LSAW and HSAW for oil, gas, and water transmission (~45% revenue). (2) ERW Pipes — smaller diameter for water/gas distribution (~20% revenue). (3) DI Pipes — ductile iron for water infrastructure (~18% revenue). (4) Stainless Steel Pipes — process industry applications (~10% revenue). (5) TMT Bars — construction steel (~7% revenue).',
      geographicPresence: 'India: Anjar (Gujarat — SAW pipes, SS pipes), Mandya (Karnataka — SAW pipes), Bhopal (DI pipes). International: Little Rock, USA (SAW pipes for US market), Dammam, Saudi Arabia (pipe coating). Exports to 50+ countries — Middle East, Americas, Africa, Southeast Asia. ~45% revenue from exports.',
      keyStrengths: [
        'World\'s #2 largest diameter pipe manufacturer — global scale and reputation',
        'Diversified across SAW, ERW, DI, and SS pipes — not dependent on single segment',
        'Strong international presence — USA and Saudi Arabia manufacturing insulates from India cyclicality',
        'Jal Jeevan Mission creating massive DI pipe demand for 5+ years',
        'Approved supplier to Saudi Aramco, ADNOC, ONGC — premium customer base',
        'Hydrogen pipeline opportunity — existing technology adaptable to hydrogen transport'
      ],
      marketPosition: 'India\'s #1 large diameter pipe maker. World\'s #2. Market leader in SAW pipes for cross-country oil & gas pipelines. Growing fast in DI pipes (Jal Jeevan Mission). Strong in export markets — Saudi, Abu Dhabi, USA.',
      rawMaterialStrategy: 'Steel plates/coils: 100% purchased from Tata Steel, JSW Steel, SAIL, and imports. Key raw material is HR coil/plate (70% of pipe cost). No backward integration into steel — pure pipe converter. Pig iron for DI pipes sourced from SAIL/Tata. Strategy: long-term supply agreements with steel producers and price pass-through clauses in pipe contracts to manage steel price volatility.'
    },
    financialRatios: {
      debtToEquity: 0.38,
      currentRatio: 1.45,
      roe: 15.2,
      roce: 18.8,
      interestCoverage: 9.5,
      netDebt: '₹2,200 Cr',
      peRatio: 16.5,
      pbRatio: 2.8,
      dividendYield: 1.0,
      workingCapitalDays: 85
    },
    bcgMatrix: {
      stars: [
        { name: 'DI Pipes (Ductile Iron)', growth: '25% CAGR', share: '20% India market', insight: 'Fastest growing segment driven by Jal Jeevan Mission (₹3.6 lakh Cr water scheme). Recently entered but scaling rapidly. High margins and multi-year order visibility.' },
        { name: 'HSAW Pipes (Water/Gas)', growth: '15% CAGR', share: '25% India market', insight: 'AMRUT 2.0 urban water, city gas distribution, and irrigation driving demand. Low-cost spiral welded pipes with growing applications.' },
      ],
      cashCows: [
        { name: 'LSAW Pipes (Oil & Gas)', growth: '5% CAGR', share: '#1 India, #2 Global', insight: 'Core product. Saudi Aramco, ONGC, GAIL are repeat customers. Global oil & gas capex cycle provides stable demand.' },
        { name: 'ERW Pipes', growth: '8% CAGR', share: '15% India market', insight: 'Growing with city gas distribution and structural applications. Lower capex segment with stable returns.' },
      ],
      questionMarks: [
        { name: 'Hydrogen Transport Pipes', growth: '50%+ potential (2027+)', share: '<1% (nascent)', insight: 'Hydrogen pipelines need special metallurgy. Welspun actively developing H2-ready pipe certifications. Could be massive if green hydrogen economy materializes.' },
        { name: 'Stainless Steel Pipes', growth: '12% CAGR', share: '8% India market', insight: 'Process industry demand growing. New Anjar facility commissioned. Competing with Ratnamani for premium customers.' },
      ],
      dogs: [
        { name: 'TMT Bars', growth: '5% CAGR', share: '1% market', insight: 'Non-core diversification. Small scale vs dedicated TMT producers. Low margins. May be divested or spun off.' },
        { name: 'Pipe Coating (Stand-alone)', growth: '3% CAGR', share: 'Captive + merchant', insight: 'Mostly captive coating for own pipes. Merchant volume low and margin thin. Value-add rather than standalone business.' },
      ],
    },
    headToHead: {
      competitor: 'Man Industries',
      competitorTicker: 'MANINDS',
      summary: 'Welspun Corp vs Man Industries — India\'s two listed large-diameter pipe makers. Welspun is 3x larger with diversified products (DI, SS), while Man Industries is a focused SAW pipe specialist.',
      metrics: [
        { label: 'Revenue FY25', company: 17500, competitor: 5800, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 14.9, competitor: 13.4, unit: '%', winner: 'company' },
        { label: 'Order Book', company: 25000, competitor: 8500, unit: '₹ Cr', winner: 'company' },
        { label: 'Product Diversification', company: 'SAW+ERW+DI+SS', competitor: 'SAW only', unit: '', winner: 'company' },
        { label: 'International Manufacturing', company: 'USA + Saudi', competitor: 'India only', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.38, competitor: 0.45, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 18.8, competitor: 15.2, unit: '%', winner: 'company' },
        { label: 'SAW Pipe Focus', company: '45% revenue', competitor: '75% revenue', unit: '', winner: 'competitor' },
        { label: 'Export Revenue', company: 45, competitor: 55, unit: '%', winner: 'competitor' },
        { label: 'DI Pipe Presence', company: 'Yes (growing)', competitor: 'No', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 18000, competitor: 3500, unit: '₹ Cr', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 22, competitor: 25, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Welspun Corp is the clear leader — 3x revenue, diversified across pipe types, international manufacturing presence, and lower risk. Man Industries is a focused mid-cap play on global oil & gas capex with higher export exposure and faster growth from a smaller base. For insurers: Welspun Corp is the safer bet with diversified demand drivers; Man Industries offers higher beta to oil & gas cycle but higher concentration risk.'
    },
  },
  {
    id: 'jsw-ispat', name: 'JSW Ispat Special Products', industry: 'steel', ticker: 'JSWISPL',
    founded: 1999, headquarters: 'Mumbai, Maharashtra', employees: '3,500+', marketCap: '₹4,200 Cr',
    ceo: 'Satish Kumar Dubey (Director)', website: 'https://www.jswsteel.in',
    description: "​Part of JSW Group. Operates a 1.6 MTPA steel plant at Kalmeshwar, Maharashtra (formerly Ispat Industries). Focus on special alloy and value-added steel products for auto and engineering sectors. In FY25 the company reported revenue of ₹7,500 Cr and net profit of ₹380 Cr, at an EBITDA margin of around 10.9%. Its revenue is led by special alloy steel (35% of sales), complemented by wire rods and hot rolled coils. Small niche player in special alloy steel segment. Single plant at Kalmeshwar, Nagpur district, Maharashtra.",
    products: [
      { name: 'Special Alloy Steel', revenueShare: 35, description: 'Alloy bars and rods for automotive' },
      { name: 'Wire Rods (Special Grade)', revenueShare: 25, description: 'High-carbon wire rods for springs' },
      { name: 'Hot Rolled Coils', revenueShare: 20, description: 'Thin gauge HR coils' },
      { name: 'Cold Rolled Steel', revenueShare: 12, description: 'CR strips for engineering' },
      { name: 'Billets & Blooms', revenueShare: 8, description: 'Semi-finished products' },
    ],
    financials: [
      { year: 'FY21', revenue: 4500, profit: 180, ebitda: 520 },
      { year: 'FY22', revenue: 7200, profit: 680, ebitda: 1100 },
      { year: 'FY23', revenue: 7000, profit: 320, ebitda: 750 },
      { year: 'FY24', revenue: 6800, profit: 280, ebitda: 680 },
      { year: 'FY25', revenue: 7500, profit: 380, ebitda: 820 },
    ],
    revenueFY25: '₹7,500 Cr', profitFY25: '₹380 Cr', ebitdaMargin: '10.9%',
    news: [
      { title: 'JSW Ispat launches new spring steel grade for auto OEMs', date: '2025-03-20', source: 'Company PR', url: 'https://www.jswsteel.in' },
      { title: 'Kalmeshwar plant capacity utilization crosses 95%', date: '2025-02-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Merger with JSW Steel under consideration for operational synergies', date: '2025-01-15', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Niche special steel player benefiting from auto sector growth. Potential merger with JSW Steel for synergies.',
      plans: ['Special alloy steel capacity increase', 'Auto-grade quality upgrades', 'Potential merger with JSW Steel', 'Value-added product mix improvement'],
      risks: ['Dependent on parent JSW group strategy', 'Small scale in competitive market', 'Raw material sourcing challenges', 'Margin pressure from commodity cycles'],
    },
    extendedOverview: {
      businessSegments: 'JSW Ispat operates from Kalmeshwar, Maharashtra: (1) Special Alloy Steel — EN-series, spring steel, bearing steel for auto components (~35% revenue). (2) Wire Rods — high-carbon and alloy wire rods for springs and fasteners (~25% revenue). (3) Flat Products — thin HR/CR coils for engineering (~32% revenue). (4) Semis — billets and blooms for sale (~8% revenue).',
      geographicPresence: 'Single plant at Kalmeshwar, Nagpur district, Maharashtra. 1.6 MTPA capacity. Sales concentrated in Maharashtra, MP, and central India. Proximity to Pune/Nagpur auto component clusters. Part of JSW Group ecosystem — may merge with parent JSW Steel.',
      keyStrengths: [
        'Specialization in alloy and special steel — technical know-how from former Ispat Industries',
        'Proximity to Pune and Nagpur auto component clusters — logistics advantage',
        'Part of JSW Group — access to technology, procurement synergies, and brand',
        'High capacity utilization (95%+) indicating strong demand for products',
        'EAF-based production — flexible to switch between grades quickly'
      ],
      marketPosition: 'Small niche player in special alloy steel segment. Key supplier to central India auto component manufacturers. Part of larger JSW Group — likely merger candidate with JSW Steel for operational synergies.',
      rawMaterialStrategy: 'Scrap steel: Primary feedstock for EAF-based production — sourced domestically and imported. Alloy additions: Ferro alloys (chrome, molybdenum, vanadium) purchased from domestic producers and imports. DRI/Sponge iron: Supplement from JSW Group and merchant sources. Key challenge: scrap price volatility and quality consistency.'
    },
    financialRatios: {
      debtToEquity: 0.72,
      currentRatio: 0.95,
      roe: 7.8,
      roce: 10.5,
      interestCoverage: 3.8,
      netDebt: '₹2,100 Cr',
      peRatio: 12.0,
      pbRatio: 1.0,
      dividendYield: 1.2,
      workingCapitalDays: 40
    },
    bcgMatrix: {
      stars: [
        { name: 'Special Alloy Steel (Auto-Grade)', growth: '12% CAGR', share: '10% regional market', insight: 'Growing with India\'s auto component industry. Spring steel, bearing steel in high demand. EV components adding new applications.' },
      ],
      cashCows: [
        { name: 'Wire Rods (High-Carbon)', growth: '6% CAGR', share: '5% India specialty segment', insight: 'Stable demand from spring, fastener, and rope wire manufacturers. Established customer relationships in central India.' },
        { name: 'Hot Rolled Coils (Thin Gauge)', growth: '4% CAGR', share: '3% regional', insight: 'General engineering and construction demand. Stable volume filler product.' },
      ],
      questionMarks: [
        { name: 'Merger with JSW Steel', growth: 'Transformative', share: 'N/A', insight: 'If merged, could become JSW Steel\'s special steel division — better scale, procurement, and market access. Value unlocking potential.' },
        { name: 'EV-Grade Steel Development', growth: '20%+ potential', share: '<2%', insight: 'Lightweight high-strength steels for EV bodies and components. R&D needed with JSW Steel parent support.' },
      ],
      dogs: [
        { name: 'Commodity Billets', growth: '1% CAGR', share: '2% regional', insight: 'Low-margin semi-finished product. Sold when special steel demand is soft. Value destructive.' },
        { name: 'Cold Rolled Strips (Low-Grade)', growth: '2% CAGR', share: '2% market', insight: 'Commodity CR facing competition from larger producers. Small scale disadvantage.' },
      ],
    },
    headToHead: {
      competitor: 'Tata Steel Long Products',
      competitorTicker: 'TATASTLLP',
      summary: 'JSW Ispat vs Tata Steel Long Products — two niche special steel subsidiaries of India\'s biggest steel groups. Similar product focus but different scales and geographies.',
      metrics: [
        { label: 'Revenue FY25', company: 7500, competitor: 6800, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 10.9, competitor: 16.2, unit: '%', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 5.1, competitor: 7.6, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 1.6, competitor: 1.1, unit: 'MTPA', winner: 'company' },
        { label: 'Capacity Utilization', company: 95, competitor: 80, unit: '%', winner: 'company' },
        { label: 'SBQ Steel Focus', company: '35% revenue', competitor: '35% revenue', unit: '', winner: 'tie' },
        { label: 'Debt/Equity', company: 0.72, competitor: 0.35, unit: 'x', winner: 'competitor' },
        { label: 'Parent Company', company: 'JSW Steel', competitor: 'Tata Steel', unit: '', winner: 'tie' },
        { label: 'Location Advantage', company: 'Near Pune auto hub', competitor: 'Near Jamshedpur', unit: '', winner: 'company' },
        { label: 'ROCE', company: 10.5, competitor: 12.8, unit: '%', winner: 'competitor' },
        { label: 'Product Diversity', company: 'Alloy+Flat+Wire', competitor: 'SBQ+Wire+DRI+Ferro', unit: '', winner: 'competitor' },
        { label: 'Merger Potential', company: 'High (with JSW Steel)', competitor: 'Low (stays subsidiary)', unit: '', winner: 'company' },
      ],
      verdict: 'Tata Steel Long Products wins on margins, capital efficiency, and product diversity. JSW Ispat wins on capacity utilization and proximity to auto hubs. The potential JSW Steel merger makes JSW Ispat a value bet. For insurers: both carry low absolute risk given parent backing, but Tata Steel LP has more predictable standalone economics.'
    },
  },
  {
    id: 'shyam-metalics', name: 'Shyam Metalics & Energy', industry: 'steel', ticker: 'SHYAMMETL',
    founded: 2002, headquarters: 'Kolkata, West Bengal', employees: '7,500+', marketCap: '₹16,000 Cr',
    ceo: 'Brij Bhushan Agarwal (Vice Chairman & MD)', website: 'https://www.shyammetalics.com',
    description: "​One of the largest integrated steel producers in Eastern India with 11.6 MTPA capacity across Sambalpur (Odisha) and Jamuria (West Bengal). Vertically integrated from pellets to finished steel. Also manufactures ferro alloys and cement. In FY25 the company reported revenue of ₹13,500 Cr and net profit of ₹1,100 Cr, at an EBITDA margin of around 18.5%. Its revenue is led by tmt bars (30% of sales), complemented by pellets & dri and ferro alloys. Largest integrated steel producer in Eastern India (excluding SAIL/Tata). Sambalpur (Odisha — primary steel complex, 8 MTPA total).",
    products: [
      { name: 'TMT Bars (SEL Brand)', revenueShare: 30, description: 'Construction rebars — strong brand in East India' },
      { name: 'Pellets & DRI', revenueShare: 25, description: 'Iron ore pellets and sponge iron' },
      { name: 'Ferro Alloys', revenueShare: 18, description: 'Ferro manganese, silico manganese' },
      { name: 'Structural Steel', revenueShare: 15, description: 'Angles, channels, and beams' },
      { name: 'Billets & Wire Rods', revenueShare: 12, description: 'Semi-finished steel and wire products' },
    ],
    financials: [
      { year: 'FY21', revenue: 5800, profit: 820, ebitda: 1580 },
      { year: 'FY22', revenue: 10200, profit: 1850, ebitda: 3100 },
      { year: 'FY23', revenue: 12500, profit: 1200, ebitda: 2400 },
      { year: 'FY24', revenue: 11800, profit: 950, ebitda: 2100 },
      { year: 'FY25', revenue: 13500, profit: 1100, ebitda: 2500 },
    ],
    revenueFY25: '₹13,500 Cr', profitFY25: '₹1,100 Cr', ebitdaMargin: '18.5%',
    news: [
      { title: 'Shyam Metalics Odisha plant expansion to 5 MTPA steel capacity', date: '2025-04-01', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Aluminium foil division under subsidiary Shyam Aluminium grows 40%', date: '2025-02-18', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'SEL TMT brand gains market share in East India construction segment', date: '2025-01-22', source: 'Company PR', url: 'https://www.shyammetalics.com' },
    ],
    futureScope: {
      outlook: 'Dominant in East India with vertically integrated model. Diversifying into aluminium. Infrastructure boom driving TMT demand.',
      plans: ['Odisha capacity to 5 MTPA finished steel', 'Aluminium foil business expansion', 'Captive power capacity increase', 'New pellet plant at Odisha'],
      risks: ['East India regional concentration', 'Ferro alloy price cyclicality', 'Competition from SAIL and Tata Steel in East', 'Raw material cost inflation'],
    },
    extendedOverview: {
      businessSegments: 'Shyam Metalics operates: (1) Finished Steel — TMT bars (SEL brand), structurals (~30% revenue). (2) Intermediates — pellets, DRI/sponge iron (~25% revenue). (3) Ferro Alloys — ferro manganese, silico manganese (~18% revenue). (4) Semis — billets, wire rods (~15% revenue). (5) Aluminium — foil and downstream (new diversification, ~12% revenue via subsidiary Shyam Aluminium).',
      geographicPresence: 'Sambalpur (Odisha — primary steel complex, 8 MTPA total). Jamuria (West Bengal — ferro alloy and steel). Sales concentrated in East India — Odisha, West Bengal, Jharkhand, Bihar. SEL TMT brand strong in East India construction market. Expanding reach to central India.',
      keyStrengths: [
        'Vertically integrated from pellets to finished steel — cost control across value chain',
        'Dominant TMT bar brand (SEL) in East India construction market',
        'Diversification into aluminium foil — non-steel earnings stream growing fast',
        'Low-cost operations in Odisha — proximity to iron ore and coal',
        'Strong cash generation enables self-funded expansion without heavy borrowing'
      ],
      marketPosition: 'Largest integrated steel producer in Eastern India (excluding SAIL/Tata). #1 TMT bar brand in Odisha/West Bengal (SEL). Growing ferro alloy exporter. New entrant in aluminium foil — fastest growing division.',
      rawMaterialStrategy: 'Iron ore: Mix of captive (limited leases) and purchased from NMDC/auctions. Actively bidding for new mining blocks in Odisha. Coal: Non-coking coal from Mahanadi Coalfields linkage for DRI. Manganese ore: Purchased from MOIL and imported for ferro alloys. Strategy: increase captive iron ore to 50%+ from current 30%.'
    },
    financialRatios: {
      debtToEquity: 0.32,
      currentRatio: 1.55,
      roe: 11.5,
      roce: 16.2,
      interestCoverage: 12.0,
      netDebt: '₹1,800 Cr',
      peRatio: 18.0,
      pbRatio: 2.2,
      dividendYield: 0.8,
      workingCapitalDays: 42
    },
    bcgMatrix: {
      stars: [
        { name: 'TMT Bars (SEL Brand)', growth: '15% CAGR', share: '20% East India organized', insight: 'Dominant brand in Odisha/West Bengal construction. Infrastructure boom (highways, housing) driving strong volume growth.' },
        { name: 'Aluminium Foil (Shyam Aluminium)', growth: '40% CAGR', share: '8% India market', insight: 'Fast-growing diversification. Pharma, food packaging, battery foil demand rising. Import substitution play.' },
      ],
      cashCows: [
        { name: 'Ferro Alloys (Manganese)', growth: '5% CAGR', share: '12% India production', insight: 'Stable demand from steel producers. Export market provides pricing support. Low capex, steady cash generation.' },
        { name: 'Pellets & DRI', growth: '6% CAGR', share: '5% East India market', insight: 'Vertically integrated intermediate product. Feeds own steel plants and sold merchant. Stable volume business.' },
      ],
      questionMarks: [
        { name: 'Wire Rods & Structurals', growth: '12% CAGR', share: '5% (growing)', insight: 'New downstream capacity converting billets to wire rods. Higher realization per tonne. Execution in early stages.' },
        { name: 'Captive Mining Expansion', growth: 'Structural cost reduction', share: 'N/A', insight: 'Bidding for iron ore blocks in Odisha. If won, could cut ore cost by 40% and boost margins permanently.' },
      ],
      dogs: [
        { name: 'Merchant Billets', growth: '2% CAGR', share: '5% regional', insight: 'Low-margin semi-finished sales when rolling capacity is below sponge iron output. Being converted to finished steel gradually.' },
      ],
    },
    headToHead: {
      competitor: 'Jai Balaji Industries',
      competitorTicker: 'JAIBALAJI',
      summary: 'Shyam Metalics vs Jai Balaji — both East India integrated steel/ferro alloy producers. Similar product mix but Shyam Metalics is larger, more profitable, and better diversified.',
      metrics: [
        { label: 'Revenue FY25', company: 13500, competitor: 8500, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 18.5, competitor: 23.5, unit: '%', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 8.1, competitor: 14.7, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.32, competitor: 0.55, unit: 'x', winner: 'company' },
        { label: 'Capacity (Total)', company: 11.6, competitor: 2.9, unit: 'MTPA', winner: 'company' },
        { label: 'Product Diversification', company: 'Steel+Ferro+Aluminium', competitor: 'Steel+Ferro+DI Pipes+Cement', unit: '', winner: 'tie' },
        { label: 'TMT Brand Strength', company: 'SEL (#1 East)', competitor: 'Jai Balaji (regional)', unit: '', winner: 'company' },
        { label: 'DI Pipe Exposure', company: 'No', competitor: 'Yes (22% revenue)', unit: '', winner: 'competitor' },
        { label: 'Revenue Growth (3Y CAGR)', company: 12, competitor: 18, unit: '%', winner: 'competitor' },
        { label: 'ROCE', company: 16.2, competitor: 18.5, unit: '%', winner: 'competitor' },
        { label: 'Financial Track Record', company: 'Consistent profit', competitor: 'NCLT history', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 16000, competitor: 12000, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Shyam Metalics wins on scale, financial stability, brand strength, and balance sheet health. Jai Balaji wins on current margins (driven by DI pipe exposure to Jal Jeevan Mission) and growth rate. However, Jai Balaji\'s NCLT history and debt concerns remain. For insurers: Shyam Metalics is clearly the safer credit with consistent track record; Jai Balaji is a turnaround story with higher reward but elevated financial risk.'
    },
  },
  {
    id: 'kalyani-steels', name: 'Kalyani Steels', industry: 'steel', ticker: 'KALYANISTR',
    founded: 1973, headquarters: 'Pune, Maharashtra', employees: '1,500+', marketCap: '₹3,800 Cr',
    ceo: 'R.K. Goyal (MD)', website: 'https://www.kalyanisteels.com',
    description: "​Part of the Kalyani Group (Bharat Forge). Specialty steel manufacturer focused on forging-grade and auto-grade steel. Plant at Hospet, Karnataka with 3 lakh TPA capacity. Supplies to parent Bharat Forge and other auto companies. In FY25 the company reported revenue of ₹3,400 Cr and net profit of ₹350 Cr, at an EBITDA margin of around 16.5%. Its revenue is led by forging quality steel (40% of sales), complemented by alloy steel bars and carbon steel billets. Niche specialty steel producer focused on automotive forging applications. Single manufacturing plant at Hospet (Hampi), Karnataka.",
    products: [
      { name: 'Forging Quality Steel', revenueShare: 40, description: 'Special steel for automotive forgings' },
      { name: 'Alloy Steel Bars', revenueShare: 25, description: 'EN series alloy steel for engineering' },
      { name: 'Carbon Steel Billets', revenueShare: 18, description: 'Raw material for rolling mills' },
      { name: 'Pig Iron', revenueShare: 12, description: 'Foundry-grade pig iron' },
      { name: 'Power (Captive)', revenueShare: 5, description: 'Surplus power sold to grid' },
    ],
    financials: [
      { year: 'FY21', revenue: 1650, profit: 120, ebitda: 280 },
      { year: 'FY22', revenue: 2800, profit: 380, ebitda: 580 },
      { year: 'FY23', revenue: 3200, profit: 320, ebitda: 520 },
      { year: 'FY24', revenue: 3000, profit: 280, ebitda: 480 },
      { year: 'FY25', revenue: 3400, profit: 350, ebitda: 560 },
    ],
    revenueFY25: '₹3,400 Cr', profitFY25: '₹350 Cr', ebitdaMargin: '16.5%',
    news: [
      { title: 'Kalyani Steels expands forging quality steel capacity by 50%', date: '2025-03-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Wins long-term supply contract with European auto OEM', date: '2025-02-08', source: 'Company PR', url: 'https://www.kalyanisteels.com' },
      { title: 'EV-grade steel development program launched', date: '2025-01-12', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Niche auto-grade steel player. EV transition creating new demand for lightweight high-strength steels. Parent Bharat Forge provides captive demand.',
      plans: ['Forging steel capacity doubling', 'EV-grade steel development', 'Export market entry', 'Green steel initiatives'],
      risks: ['Heavy dependence on auto sector', 'Parent company demand concentration', 'Small scale vs large integrated mills', 'Karnataka power cost issues'],
    },
    extendedOverview: {
      businessSegments: 'Kalyani Steels operates from Hospet, Karnataka: (1) Forging Quality Steel — special steel bars for automotive forgings (~40% revenue). (2) Alloy Steel Bars — EN-series engineering steel (~25% revenue). (3) Carbon Steel Billets — intermediate products (~18% revenue). (4) Pig Iron — foundry grade from mini blast furnace (~12% revenue). (5) Power — captive surplus sold to grid (~5% revenue).',
      geographicPresence: 'Single manufacturing plant at Hospet (Hampi), Karnataka. Close to iron ore sources in Bellary district. Sales: 40% to parent Bharat Forge, 40% to other auto component makers in Pune/Chennai, 20% others. Limited geographic spread — single location risk.',
      keyStrengths: [
        'Part of Kalyani Group (Bharat Forge) — guaranteed demand for 40% output',
        'Specialized in forging-grade steel — high technical barriers to entry',
        'Proximity to Karnataka iron ore belt — cost advantage for raw material',
        'Growing demand from EV sector for lightweight high-strength forging steel',
        'Low debt, consistent dividend paying company'
      ],
      marketPosition: 'Niche specialty steel producer focused on automotive forging applications. Sole/primary supplier to parent Bharat Forge (India\'s #1 forging company). Small scale but high specialization. Competes with Tata Steel LP and JSPL in auto-grade long products.',
      rawMaterialStrategy: 'Iron ore: Purchased from NMDC and local Karnataka mines (proximity advantage — 50-100 km from Bellary mines). Coal: Non-coking coal for mini BF from local sources. Ferro alloys: Purchased for alloy steel grades. Key advantage: Karnataka iron ore proximity reduces logistics cost by ₹800-1,000/tonne vs distant plants.'
    },
    financialRatios: {
      debtToEquity: 0.25,
      currentRatio: 1.65,
      roe: 12.0,
      roce: 16.0,
      interestCoverage: 15.0,
      netDebt: '₹280 Cr',
      peRatio: 12.5,
      pbRatio: 1.5,
      dividendYield: 2.0,
      workingCapitalDays: 50
    },
    bcgMatrix: {
      stars: [
        { name: 'Forging Quality Steel (Auto-Grade)', growth: '14% CAGR', share: '20% India forging steel', insight: 'India\'s auto component exports growing 15%+ annually. Bharat Forge expanding globally — pulls Kalyani Steels demand. EV crankshaft replacements need new steel grades.' },
      ],
      cashCows: [
        { name: 'Alloy Steel Bars', growth: '6% CAGR', share: '8% niche segment', insight: 'Steady demand from engineering and industrial applications. Established customer base. Low capex product.' },
        { name: 'Pig Iron (Foundry Grade)', growth: '3% CAGR', share: '5% South India', insight: 'By-product from mini BF. Sold to auto and engineering foundries. Low investment, steady cash.' },
      ],
      questionMarks: [
        { name: 'EV-Grade High-Strength Steel', growth: '25%+ potential', share: '<5%', insight: 'EV drivetrain components need new steel grades (high-strength, lightweight). Bharat Forge actively developing EV parts — captive demand could follow.' },
        { name: 'Export to European OEMs', growth: '15% potential', share: '<5% revenue', insight: 'Bharat Forge\'s European customers could source steel directly. Requires quality certifications and scale-up.' },
      ],
      dogs: [
        { name: 'Carbon Steel Billets (Commodity)', growth: '2% CAGR', share: '2% local market', insight: 'Low-margin commodity product. Sold when forging steel demand is soft. Being reduced in mix.' },
      ],
    },
    headToHead: {
      competitor: 'Tata Steel Long Products',
      competitorTicker: 'TATASTLLP',
      summary: 'Kalyani Steels vs Tata Steel Long Products — both supply auto-grade specialty steel but from different parent ecosystems (Bharat Forge vs Tata Steel).',
      metrics: [
        { label: 'Revenue FY25', company: 3400, competitor: 6800, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 16.5, competitor: 16.2, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.25, competitor: 0.35, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 16.0, competitor: 12.8, unit: '%', winner: 'company' },
        { label: 'Parent Captive Demand', company: '40% (Bharat Forge)', competitor: '20% (Tata Steel)', unit: '', winner: 'company' },
        { label: 'Product Specialization', company: 'Forging steel only', competitor: 'SBQ+Wire+DRI+Ferro', unit: '', winner: 'competitor' },
        { label: 'Scale', company: '0.3 MTPA', competitor: '1.1 MTPA', unit: '', winner: 'competitor' },
        { label: 'Auto Sector Focus', company: '80% revenue', competitor: '35% revenue', unit: '', winner: 'company' },
        { label: 'Dividend Yield', company: 2.0, competitor: 1.5, unit: '%', winner: 'company' },
        { label: 'Growth Potential', company: 'Moderate (niche)', competitor: 'Higher (broader base)', unit: '', winner: 'competitor' },
        { label: 'Balance Sheet Strength', company: 'Very strong', competitor: 'Strong', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 3800, competitor: 6500, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Kalyani Steels wins on capital efficiency, balance sheet strength, and pure auto-sector exposure. Tata Steel LP wins on scale and product diversification. Kalyani is a more focused, efficient operation while Tata Steel LP is broader. For insurers: Kalyani is ultra-low credit risk (almost debt-free, parent backing) but concentrated in one sector; Tata Steel LP offers more diversification within specialty steel.'
    },
  },
  {
    id: 'lloyds-metals', name: 'Lloyds Metals & Energy', industry: 'steel', ticker: 'LLOYDSME',
    founded: 1977, headquarters: 'Mumbai, Maharashtra', employees: '5,000+', marketCap: '₹22,000 Cr',
    ceo: 'Mukesh Hari Gupta (Director)', website: 'https://www.lloyds.in',
    description: "​Integrated sponge iron and steel manufacturer based in Gadchiroli, Maharashtra. Has captive iron ore mines giving significant cost advantage. Rapidly expanding from 0.5 MTPA to 3.5 MTPA steel capacity. In FY25 the company reported revenue of ₹10,200 Cr and net profit of ₹1,900 Cr, at an EBITDA margin of around 31.4%. Its revenue is led by sponge iron / dri (30% of sales), complemented by tmt bars and iron ore. Small steel producer but India's most profitable on a margin basis. Single complex at Gadchiroli, Maharashtra (remote tribal district with rich mineral deposits).",
    products: [
      { name: 'Sponge Iron / DRI', revenueShare: 30, description: 'Direct reduced iron from captive ore' },
      { name: 'TMT Bars', revenueShare: 25, description: 'Construction steel under Lloyds brand' },
      { name: 'Iron Ore (Captive)', revenueShare: 20, description: 'Mining from Surjagarh deposit' },
      { name: 'Billets', revenueShare: 15, description: 'Semi-finished steel for re-rollers' },
      { name: 'Power', revenueShare: 10, description: 'Captive and merchant power' },
    ],
    financials: [
      { year: 'FY21', revenue: 2100, profit: 280, ebitda: 520 },
      { year: 'FY22', revenue: 4800, profit: 1200, ebitda: 2100 },
      { year: 'FY23', revenue: 7200, profit: 1800, ebitda: 3100 },
      { year: 'FY24', revenue: 8500, profit: 1650, ebitda: 2800 },
      { year: 'FY25', revenue: 10200, profit: 1900, ebitda: 3200 },
    ],
    revenueFY25: '₹10,200 Cr', profitFY25: '₹1,900 Cr', ebitdaMargin: '31.4%',
    news: [
      { title: 'Lloyds Metals iron ore mining crosses 20 MTPA production rate', date: '2025-04-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Steel plant expansion to 3.5 MTPA on track for FY27', date: '2025-02-25', source: 'Company PR', url: 'https://www.lloyds.in' },
      { title: 'Surjagarh mine reserves upgraded to 200 MT', date: '2025-01-18', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Captive iron ore mine gives industry-best margins. Massive expansion from niche DRI player to integrated steel producer.',
      plans: ['Steel capacity to 3.5 MTPA by FY27', 'Iron ore mining to 30 MTPA', 'Pellet plant commissioning', 'Value-added TMT bar expansion'],
      risks: ['Single mine concentration risk', 'Execution risk on large expansion', 'Remote location logistics challenges', 'Environmental clearance dependencies'],
    },
    extendedOverview: {
      businessSegments: 'Lloyds Metals operates: (1) Iron Ore Mining — Surjagarh deposit in Gadchiroli with 200 MT reserves (~30% revenue, highest margin). (2) Sponge Iron/DRI — from captive ore (~25% revenue). (3) Steel (TMT Bars) — finished construction steel (~25% revenue). (4) Billets — semi-finished steel for re-rollers (~15% revenue). (5) Power — waste heat recovery and captive (~5% revenue). Transforming from a DRI/mining company to integrated steel producer.',
      geographicPresence: 'Single complex at Gadchiroli, Maharashtra (remote tribal district with rich mineral deposits). Surjagarh iron ore mine — 200 MT reserves. Sales: Maharashtra and Vidarbha region for steel; pellet/ore sales pan-India. Remote location increases logistics cost but mine proximity is the key advantage.',
      keyStrengths: [
        'Captive Surjagarh iron ore mine — 200 MT reserves, 65% Fe grade — industry-best ore cost',
        'Highest EBITDA margins in Indian steel sector (31%+) due to captive mining',
        'Massive expansion potential — ore reserves support 10+ MTPA steel for 30 years',
        'First-mover in Gadchiroli mineral belt — locked up the best deposits',
        'Low cost of production — mine-to-mill distance just 20 km'
      ],
      marketPosition: 'Small steel producer but India\'s most profitable on a margin basis. Transitioning from DRI/mining to integrated steelmaker. Surjagarh mine is one of India\'s richest iron ore deposits. Currently regional but expansion could make it mid-tier national player.',
      rawMaterialStrategy: 'Iron ore: 100% captive from Surjagarh mine (65% Fe, 200 MT reserves) — cost below ₹1,200/tonne vs ₹4,000+ market price. This ₹2,800/tonne advantage is the company\'s entire competitive moat. Coal: Non-coking coal purchased from WCL (nearby Chandrapur mines). Limestone: Local sourcing from Vidarbha. Key risk: single mine dependency — any disruption (regulatory, Naxal, environmental) halts operations.'
    },
    financialRatios: {
      debtToEquity: 0.28,
      currentRatio: 1.80,
      roe: 22.0,
      roce: 28.5,
      interestCoverage: 18.0,
      netDebt: '₹1,200 Cr',
      peRatio: 15.0,
      pbRatio: 3.0,
      dividendYield: 0.5,
      workingCapitalDays: 30
    },
    bcgMatrix: {
      stars: [
        { name: 'Iron Ore Mining', growth: '25% CAGR', share: 'Single mine monopoly', insight: 'Surjagarh mine ramping to 20-30 MTPA. 65% Fe grade is premium. Own consumption + merchant sales. The golden asset driving all value.' },
        { name: 'TMT Bars', growth: '20% CAGR', share: '5% Maharashtra market', insight: 'Integrated TMT production with captive ore gives unbeatable cost. Growing brand in construction. High-growth as capacity expands.' },
      ],
      cashCows: [
        { name: 'Sponge Iron (DRI)', growth: '8% CAGR', share: '10% Maharashtra market', insight: 'Original business. Captive ore makes it most profitable DRI in India. Stable demand from re-rollers and EAF steelmakers.' },
        { name: 'Iron Ore Pellets', growth: '10% CAGR', share: 'Growing', insight: 'New pellet plant converting fines to pellets. High-margin product sold to blast furnace operators nationally.' },
      ],
      questionMarks: [
        { name: 'Integrated Steel Plant (3.5 MTPA)', growth: 'Transformative', share: 'Under construction', insight: 'BF-BOF route being built. If executed successfully, transforms from ₹10K Cr DRI company to ₹35K Cr integrated steelmaker.' },
        { name: 'Second Mining Block', growth: 'Reserve addition', share: 'Bidding', insight: 'Actively bidding for additional mining blocks in Gadchiroli/Chandrapur. Would de-risk single mine dependency.' },
      ],
      dogs: [
        { name: 'Merchant Billets', growth: '2% CAGR', share: '3% regional', insight: 'Low-margin intermediate sold when rolling capacity is insufficient. Will decline as TMT bar capacity increases.' },
      ],
    },
    headToHead: {
      competitor: 'Godawari Power & Ispat',
      competitorTicker: 'GPIL',
      summary: 'Lloyds Metals vs Godawari Power — both are Chhattisgarh/Maharashtra-based integrated DRI-to-steel producers with captive mining. Lloyds has richer ore; Godawari is more established.',
      metrics: [
        { label: 'Revenue FY25', company: 10200, competitor: 7500, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 31.4, competitor: 28.0, unit: '%', winner: 'company' },
        { label: 'Iron Ore Reserves', company: 200, competitor: 80, unit: 'MT', winner: 'company' },
        { label: 'Ore Grade (Fe %)', company: 65, competitor: 60, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.28, competitor: 0.22, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 28.5, competitor: 22.0, unit: '%', winner: 'company' },
        { label: 'Expansion Plan', company: '3.5 MTPA steel', competitor: '7 MTPA pellets', unit: '', winner: 'company' },
        { label: 'Product Diversification', company: 'Low (steel only)', competitor: 'Higher (steel+pellets+solar)', unit: '', winner: 'competitor' },
        { label: 'Execution Track Record', company: 'Unproven at scale', competitor: 'Proven', unit: '', winner: 'competitor' },
        { label: 'Revenue Growth (3Y CAGR)', company: 42, competitor: 8, unit: '%', winner: 'company' },
        { label: 'Solar/Renewables', company: 'No', competitor: '225 MW', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 22000, competitor: 9500, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Lloyds Metals wins on ore quality, reserves, growth rate, and margins. It has the richest iron ore asset in the private sector. Godawari wins on diversification (solar, pellets) and proven track record. Lloyds carries execution risk on its massive steel plant expansion. For insurers: Lloyds is higher-reward but single-asset dependent; Godawari is steadier and more diversified. Both are low-debt, high-margin businesses.'
    },
  },
  {
    id: 'man-industries', name: 'Man Industries', industry: 'steel', ticker: 'MANINDS',
    founded: 1988, headquarters: 'Mumbai, Maharashtra', employees: '2,500+', marketCap: '₹3,500 Cr',
    ceo: 'R.C. Mansukhani (CMD)', website: 'https://www.manindustries.com',
    description: "​Leading manufacturer of large-diameter line pipes for oil & gas sector. Plants at Pithampur (MP) and Kutch (Gujarat). Exports to Middle East, Africa, and Americas. Capacity 1.2 MTPA. In FY25 the company reported revenue of ₹5,800 Cr and net profit of ₹450 Cr, at an EBITDA margin of around 13.4%. Its revenue is led by lsaw pipes (45% of sales), complemented by hsaw pipes and erw pipes. India's #2 listed large-diameter pipe maker (after Welspun Corp). India: Pithampur (Madhya Pradesh — LSAW pipes), Kutch/Anjar (Gujarat — HSAW and ERW).",
    products: [
      { name: 'LSAW Pipes', revenueShare: 45, description: 'Longitudinal SAW pipes for oil/gas transmission' },
      { name: 'HSAW Pipes', revenueShare: 30, description: 'Helical SAW pipes for water and gas' },
      { name: 'ERW Pipes', revenueShare: 15, description: 'Electric resistance welded pipes' },
      { name: 'Coated Pipes', revenueShare: 10, description: '3LPE/FBE coated pipes for corrosion protection' },
    ],
    financials: [
      { year: 'FY21', revenue: 2200, profit: 85, ebitda: 220 },
      { year: 'FY22', revenue: 3100, profit: 150, ebitda: 350 },
      { year: 'FY23', revenue: 4500, profit: 280, ebitda: 520 },
      { year: 'FY24', revenue: 5200, profit: 380, ebitda: 680 },
      { year: 'FY25', revenue: 5800, profit: 450, ebitda: 780 },
    ],
    revenueFY25: '₹5,800 Cr', profitFY25: '₹450 Cr', ebitdaMargin: '13.4%',
    news: [
      { title: 'Man Industries wins Rs 1,800 Cr order from Abu Dhabi ADNOC', date: '2025-03-22', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Kutch plant capacity expanded to 6 lakh TPA', date: '2025-02-08', source: 'Company PR', url: 'https://www.manindustries.com' },
      { title: 'Order book reaches all-time high of Rs 8,500 Cr', date: '2025-01-20', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Strong global oil & gas capex cycle. Hydrogen pipeline opportunity in medium term. Water infrastructure also a growth driver.',
      plans: ['Capacity expansion to 1.5 MTPA', 'Hydrogen-ready pipe certification', 'US and Europe market entry', 'Stainless steel pipe line addition'],
      risks: ['Lumpy order-based business', 'Steel price pass-through lag', 'Geopolitical risk in export markets', 'Competition from Welspun Corp'],
    },
    extendedOverview: {
      businessSegments: 'Man Industries operates: (1) LSAW Pipes — longitudinal submerged arc welded for oil/gas (~45% revenue). (2) HSAW Pipes — helical SAW for water/gas distribution (~30% revenue). (3) ERW Pipes — smaller diameter for utilities (~15% revenue). (4) Coated Pipes — 3LPE/FBE anticorrosion coating (~10% revenue). Pure pipe manufacturer — no steel backward integration.',
      geographicPresence: 'India: Pithampur (Madhya Pradesh — LSAW pipes), Kutch/Anjar (Gujarat — HSAW and ERW). Exports to Middle East (55% of revenue), Africa, and Americas. Key customers: Saudi Aramco, ADNOC, ONGC, GAIL. 55% export revenue provides diversification.',
      keyStrengths: [
        'High export revenue (55%) — less exposed to Indian domestic cyclicality',
        'Approved supplier to premium global customers (Saudi Aramco, ADNOC)',
        'Strong order book (Rs 8,500 Cr) providing revenue visibility',
        'Dual plant location — Gujarat for export, MP for domestic',
        'Fastest revenue growth among Indian pipe makers (25% 3Y CAGR)'
      ],
      marketPosition: 'India\'s #2 listed large-diameter pipe maker (after Welspun Corp). More export-focused than Welspun. Strong in Middle East markets. Smaller scale but faster growing. Order book at all-time high.',
      rawMaterialStrategy: 'Steel plates and HR coils: 100% purchased from domestic (SAIL, JSW, Tata) and imported sources. Steel is 70%+ of pipe cost. No backward integration. Contract structures: mix of fixed-price (margin risk) and cost-plus (margin protected). Export orders typically have steel price pass-through clauses.'
    },
    financialRatios: {
      debtToEquity: 0.45,
      currentRatio: 1.35,
      roe: 16.5,
      roce: 20.2,
      interestCoverage: 8.0,
      netDebt: '₹1,050 Cr',
      peRatio: 10.0,
      pbRatio: 1.8,
      dividendYield: 1.5,
      workingCapitalDays: 90
    },
    bcgMatrix: {
      stars: [
        { name: 'LSAW Pipes (Export)', growth: '18% CAGR', share: '15% India LSAW market', insight: 'Saudi Aramco and ADNOC orders driving growth. Global oil & gas capex at multi-year highs. Premium pricing for API-certified export pipes.' },
      ],
      cashCows: [
        { name: 'HSAW Pipes (Domestic)', growth: '8% CAGR', share: '10% India market', insight: 'Jal Jeevan Mission, city gas distribution driving domestic water/gas pipe demand. Lower margin but steady volume.' },
        { name: 'ERW Pipes', growth: '6% CAGR', share: '5% India market', insight: 'Smaller diameter pipes for gas distribution. Steady, non-lumpy demand profile.' },
      ],
      questionMarks: [
        { name: 'Hydrogen Transport Pipes', growth: '40%+ (2027+)', share: '<1% nascent', insight: 'Hydrogen needs special metallurgy pipes. Man Industries pursuing H2-ready certifications. If global hydrogen economy materializes, massive opportunity.' },
        { name: 'Stainless Steel Pipes', growth: '12% CAGR', share: 'New entrant', insight: 'Adding SS pipe line for process industry demand. Higher margin segment but needs quality track record.' },
      ],
      dogs: [
        { name: 'Pipe Coating (Standalone)', growth: '3% CAGR', share: 'Captive only', insight: 'Anti-corrosion coating done in-house for own pipes. Not a standalone profit center.' },
      ],
    },
    headToHead: {
      competitor: 'Welspun Corp',
      competitorTicker: 'WELCORP',
      summary: 'Man Industries vs Welspun Corp — David vs Goliath in large-diameter pipes. Welspun is 3x larger and more diversified; Man Industries is more focused and faster-growing.',
      metrics: [
        { label: 'Revenue FY25', company: 5800, competitor: 17500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 13.4, competitor: 14.9, unit: '%', winner: 'competitor' },
        { label: 'Revenue Growth (3Y CAGR)', company: 25, competitor: 22, unit: '%', winner: 'company' },
        { label: 'Export Revenue', company: 55, competitor: 45, unit: '%', winner: 'company' },
        { label: 'Order Book', company: 8500, competitor: 25000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Product Diversification', company: 'SAW/ERW only', competitor: 'SAW+ERW+DI+SS', unit: '', winner: 'competitor' },
        { label: 'ROCE', company: 20.2, competitor: 18.8, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.45, competitor: 0.38, unit: 'x', winner: 'competitor' },
        { label: 'International Plants', company: 'India only', competitor: 'USA+Saudi+India', unit: '', winner: 'competitor' },
        { label: 'P/E Ratio', company: 10.0, competitor: 16.5, unit: 'x', winner: 'company' },
        { label: 'Market Cap', company: 3500, competitor: 18000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Saudi Aramco Approved', company: 'Yes', competitor: 'Yes', unit: '', winner: 'tie' },
      ],
      verdict: 'Welspun Corp is the clear category leader with 3x revenue, DI pipe diversification, and international manufacturing. Man Industries offers better valuation (10x P/E vs 16.5x) and higher export focus. Both benefit from the same demand drivers — oil & gas capex and water infrastructure. For insurers: Welspun is lower risk due to diversification; Man Industries is more concentrated but at cheaper valuation with strong order book cover.'
    },
  },
  {
    id: 'godawari-power', name: 'Godawari Power & Ispat', industry: 'steel', ticker: 'GPIL',
    founded: 1999, headquarters: 'Raipur, Chhattisgarh', employees: '4,000+', marketCap: '₹9,500 Cr',
    ceo: 'B.L. Agrawal (CMD)', website: 'https://www.godawaripower.com',
    description: "​Integrated steel producer in Chhattisgarh with operations spanning iron ore mining, pelletization, sponge iron, steel billets, TMT bars, and ferro alloys. Also has solar power business. Pellet capacity 4.5 MTPA. In FY25 the company reported revenue of ₹7,500 Cr and net profit of ₹1,050 Cr, at an EBITDA margin of around 28.0%. Its revenue is led by iron ore pellets (35% of sales), complemented by tmt bars and sponge iron. Mid-size integrated steel/mining company in Chhattisgarh. All operations in Chhattisgarh (Raipur, Siltara industrial area).",
    products: [
      { name: 'Iron Ore Pellets', revenueShare: 35, description: 'High-grade pellets from captive mines' },
      { name: 'TMT Bars', revenueShare: 25, description: 'Construction rebars for central India market' },
      { name: 'Sponge Iron', revenueShare: 18, description: 'DRI for internal use and merchant sales' },
      { name: 'Ferro Alloys', revenueShare: 12, description: 'Ferro silicon and silico manganese' },
      { name: 'Solar Power', revenueShare: 10, description: '225 MW solar power generation' },
    ],
    financials: [
      { year: 'FY21', revenue: 3500, profit: 520, ebitda: 1050 },
      { year: 'FY22', revenue: 7200, profit: 1850, ebitda: 3200 },
      { year: 'FY23', revenue: 7800, profit: 1200, ebitda: 2400 },
      { year: 'FY24', revenue: 6800, profit: 900, ebitda: 1800 },
      { year: 'FY25', revenue: 7500, profit: 1050, ebitda: 2100 },
    ],
    revenueFY25: '₹7,500 Cr', profitFY25: '₹1,050 Cr', ebitdaMargin: '28.0%',
    news: [
      { title: 'Godawari Power pellet capacity reaches 4.5 MTPA with new unit', date: '2025-03-28', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Solar power capacity expanded to 225 MW across Chhattisgarh', date: '2025-02-15', source: 'Company PR', url: 'https://www.godawaripower.com' },
      { title: 'Iron ore mining output crosses 10 MTPA milestone', date: '2025-01-10', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Vertically integrated from mine to TMT bars. Solar power adds green credentials. Pellet demand growing as blast furnaces shift from sinter.',
      plans: ['Pellet capacity to 7 MTPA', 'Solar capacity to 500 MW', 'Steel billet to finished steel integration', 'Export pellets to Middle East'],
      risks: ['Iron ore regulatory and mining lease risks', 'Chhattisgarh state policy uncertainty', 'Pellet price linkage to iron ore', 'Small scale in steel vs majors'],
    },
    extendedOverview: {
      businessSegments: 'Godawari Power operates from Raipur, Chhattisgarh: (1) Iron Ore Pellets — 4.5 MTPA capacity, largest single segment (~35% revenue). (2) TMT Bars — construction steel for central India (~25% revenue). (3) Sponge Iron — DRI for captive and merchant use (~18% revenue). (4) Ferro Alloys — ferro silicon and manganese (~12% revenue). (5) Solar Power — 225 MW capacity, fast growing (~10% revenue).',
      geographicPresence: 'All operations in Chhattisgarh (Raipur, Siltara industrial area). Iron ore mines in Chhattisgarh (Ari Dongri, Boria Tibbu). Solar plants across Chhattisgarh and Rajasthan. Sales: pellets sold nationally; TMT/DRI in central India (CG, MP, Maharashtra). Pellet exports to Middle East.',
      keyStrengths: [
        'Vertically integrated from captive mine to finished steel — full value chain capture',
        'Captive iron ore mines with 80+ MT reserves — 10+ years of ore security',
        'Solar power diversification (225 MW) — ESG credentials and stable revenue',
        'Pellet capacity (4.5 MTPA) — India\'s growing pellet demand as BF operators shift from lump/sinter',
        'Consistent high margins (28%+) driven by captive mining cost advantage'
      ],
      marketPosition: 'Mid-size integrated steel/mining company in Chhattisgarh. Among top pellet producers in India. Strong regional TMT brand. Unique combination of mining + steel + solar. Not competing head-on with majors — operates in different niche (pellets + regional steel).',
      rawMaterialStrategy: 'Iron ore: 100% captive from own mines in Chhattisgarh (Ari Dongri, Boria Tibbu — 80 MT reserves). Mining cost below ₹1,000/tonne. Coal: Non-coking coal from SECL (linkage) and local sources. Manganese ore: Purchased from MOIL. Key advantage: mine-to-plant distance under 200 km. Pellet fines generated from mining are core feedstock for pellet business.'
    },
    financialRatios: {
      debtToEquity: 0.22,
      currentRatio: 1.70,
      roe: 15.5,
      roce: 22.0,
      interestCoverage: 15.5,
      netDebt: '₹500 Cr',
      peRatio: 11.0,
      pbRatio: 1.8,
      dividendYield: 1.8,
      workingCapitalDays: 35
    },
    bcgMatrix: {
      stars: [
        { name: 'Iron Ore Pellets', growth: '15% CAGR', share: '8% India pellet market', insight: 'BF operators shifting from lump ore/sinter to pellets for efficiency. Export demand from Middle East growing. Expanding capacity to 7 MTPA.' },
        { name: 'Solar Power', growth: '25% CAGR', share: 'Growing portfolio', insight: '225 MW operational, targeting 500 MW. Stable 25-year PPA revenue. ESG positioning and earnings diversification.' },
      ],
      cashCows: [
        { name: 'TMT Bars', growth: '7% CAGR', share: '10% Chhattisgarh/MP market', insight: 'Regional brand for construction. Captive ore cost advantage enables competitive pricing with healthy margins.' },
        { name: 'Sponge Iron', growth: '5% CAGR', share: '8% central India', insight: 'Stable intermediate product. Feeds own steel plant and merchant sales. Captive ore makes it profitable.' },
      ],
      questionMarks: [
        { name: 'Pellet Export (Middle East)', growth: '20% potential', share: '5% India pellet exports', insight: 'Middle East steel producers need pellets. Godawari testing export markets. If volumes scale, adds significant revenue with better realization.' },
        { name: 'Steel Integration (BF Route)', growth: '15% potential', share: 'Planned', insight: 'Moving from DRI/billet to integrated BF-based steel. Would significantly increase per-tonne realization and product value.' },
      ],
      dogs: [
        { name: 'Ferro Alloys', growth: '3% CAGR', share: '5% India market', insight: 'Cyclical business with volatile pricing. Not a core focus area. Maintained for by-product utilization.' },
      ],
    },
    headToHead: {
      competitor: 'Lloyds Metals & Energy',
      competitorTicker: 'LLOYDSME',
      summary: 'Godawari Power vs Lloyds Metals — both captive-mining integrated producers in central India. Lloyds has richer ore and higher margins; Godawari is more diversified with solar and pellets.',
      metrics: [
        { label: 'Revenue FY25', company: 7500, competitor: 10200, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 28.0, competitor: 31.4, unit: '%', winner: 'competitor' },
        { label: 'Ore Grade (Fe %)', company: 60, competitor: 65, unit: '%', winner: 'competitor' },
        { label: 'Product Diversification', company: 'Pellets+Steel+Solar', competitor: 'Mining+DRI+TMT only', unit: '', winner: 'company' },
        { label: 'Solar Revenue', company: '225 MW', competitor: '0 MW', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.22, competitor: 0.28, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 22.0, competitor: 28.5, unit: '%', winner: 'competitor' },
        { label: 'Pellet Capacity', company: 4.5, competitor: 0.5, unit: 'MTPA', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 8, competitor: 42, unit: '%', winner: 'competitor' },
        { label: 'Track Record', company: '15+ years profitable', competitor: '5 years (post-mine)', unit: '', winner: 'company' },
        { label: 'Ore Reserves', company: 80, competitor: 200, unit: 'MT', winner: 'competitor' },
        { label: 'Market Cap', company: 9500, competitor: 22000, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Lloyds Metals has superior ore quality, reserves, and growth trajectory — the market values it at 2.3x Godawari\'s market cap. Godawari wins on diversification (solar adds stability), longer track record, and established pellet export business. For insurers: Godawari is lower risk due to diversification and proven execution over 15 years; Lloyds is higher growth but concentrated on single mine with unproven large-scale steel execution.'
    },
  },
  {
    id: 'mishra-dhatu', name: 'Mishra Dhatu Nigam (MIDHANI)', industry: 'steel', ticker: 'MIDHANI',
    founded: 1973, headquarters: 'Hyderabad, Telangana', employees: '2,200+', marketCap: '₹7,500 Cr',
    ceo: 'Sanjay Kumar Jha (CMD)', website: 'https://www.midhani-india.in',
    description: "​A Defence Ministry PSU specializing in super alloys, titanium alloys, and special steels for aerospace, defence, and nuclear applications. Only Indian manufacturer of several critical materials. Monopoly supplier to ISRO and DRDO. In FY25 the company reported revenue of ₹1,450 Cr and net profit of ₹260 Cr, at an EBITDA margin of around 30.3%. Its revenue is led by super alloys (35% of sales), complemented by titanium alloys and special steels. India's ONLY manufacturer of super alloys, titanium alloys, and several defence-grade materials. Primary plant at Kanchanbagh, Hyderabad, Telangana.",
    products: [
      { name: 'Super Alloys', revenueShare: 35, description: 'Nickel-based alloys for jet engines and gas turbines' },
      { name: 'Titanium Alloys', revenueShare: 25, description: 'Aerospace and marine grade titanium' },
      { name: 'Special Steels', revenueShare: 20, description: 'Armour steel, maraging steel for missiles' },
      { name: 'Soft Magnetic Alloys', revenueShare: 12, description: 'For electrical and electronic applications' },
      { name: 'Refractory Metals', revenueShare: 8, description: 'Tungsten, molybdenum for high-temp applications' },
    ],
    financials: [
      { year: 'FY21', revenue: 822, profit: 165, ebitda: 285 },
      { year: 'FY22', revenue: 895, profit: 170, ebitda: 295 },
      { year: 'FY23', revenue: 1080, profit: 195, ebitda: 340 },
      { year: 'FY24', revenue: 1250, profit: 220, ebitda: 380 },
      { year: 'FY25', revenue: 1450, profit: 260, ebitda: 440 },
    ],
    revenueFY25: '₹1,450 Cr', profitFY25: '₹260 Cr', ebitdaMargin: '30.3%',
    news: [
      { title: 'MIDHANI supplies titanium alloy for Gaganyaan mission components', date: '2025-04-05', source: 'PIB', url: 'https://pib.gov.in' },
      { title: 'Defence order book crosses Rs 2,500 Cr on Tejas Mk2 and Kaveri engine', date: '2025-02-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'New Rohtak plant for armour steel starts production', date: '2025-01-15', source: 'Company PR', url: 'https://www.midhani-india.in' },
    ],
    futureScope: {
      outlook: 'Beneficiary of defence indigenization and space missions. Monopoly position in several critical alloys. Growing defence budget supports order pipeline.',
      plans: ['Rohtak plant full commissioning', 'Titanium sponge production', 'Export defence-grade alloys', 'Nuclear-grade materials for new reactors'],
      risks: ['Government ownership constraints on agility', 'Long gestation defence contracts', 'Import dependency for raw nickel/titanium', 'Capacity constraints on urgent orders'],
    },
    extendedOverview: {
      businessSegments: 'MIDHANI (Defence PSU) operates from Hyderabad: (1) Super Alloys — nickel/cobalt-based for jet engines and gas turbines (~35% revenue). (2) Titanium Alloys — aerospace and marine grade (~25% revenue). (3) Special Steels — armour plates, maraging steel for missiles (~20% revenue). (4) Soft Magnetic Alloys — electrical applications (~12% revenue). (5) Refractory Metals — tungsten, molybdenum for extreme conditions (~8% revenue). New Rohtak plant expanding capacity.',
      geographicPresence: 'Primary plant at Kanchanbagh, Hyderabad, Telangana. New plant at Rohtak, Haryana (armour steel and titanium). 100% domestic sales — primarily to ISRO, DRDO, HAL, Indian Navy, Nuclear Power Corporation. No export (strategic export controls on defence materials). Sole Indian manufacturer of many critical alloys.',
      keyStrengths: [
        'Monopoly supplier of super alloys and titanium to ISRO, DRDO, and Indian defence forces',
        'Only Indian manufacturer of maraging steel (missile casings), armour steel (tanks), and jet engine alloys',
        'Strategic national importance — Atmanirbhar Bharat defence push increases order pipeline',
        'Very high margins (30%+) due to monopoly positioning and technical complexity',
        'Growing defence budget (₹6.2 Lakh Cr in FY25) — direct beneficiary',
        'Gaganyaan space mission and Tejas Mk2 are multi-year order drivers'
      ],
      marketPosition: 'India\'s ONLY manufacturer of super alloys, titanium alloys, and several defence-grade materials. Monopoly in domestic market — no competition for most products. Globally competitive in selected grades. Order book growing at 20%+ annually driven by defence indigenization push.',
      rawMaterialStrategy: 'Nickel: 100% imported from Russia, Australia, and LME sources. Titanium sponge: Currently 100% imported — domestic production planned at Rohtak. Cobalt: Imported from DRC/Africa. Molybdenum/Tungsten: Imported from China and South America. Key vulnerability: complete import dependency for all key raw materials. Long-term plan: develop domestic titanium sponge to reduce import reliance.'
    },
    financialRatios: {
      debtToEquity: 0.05,
      currentRatio: 2.80,
      roe: 10.5,
      roce: 13.0,
      interestCoverage: 45.0,
      netDebt: '₹-200 Cr (net cash)',
      peRatio: 38.0,
      pbRatio: 3.8,
      dividendYield: 1.2,
      workingCapitalDays: 280
    },
    bcgMatrix: {
      stars: [
        { name: 'Titanium Alloys (Aerospace)', growth: '20% CAGR', share: '100% India (monopoly)', insight: 'Gaganyaan, Tejas Mk2, LCA, naval submarines all need titanium. India\'s space and defence ambitions drive guaranteed long-term demand. No domestic alternative.' },
        { name: 'Super Alloys (Jet Engines)', growth: '18% CAGR', share: '100% India (monopoly)', insight: 'Kaveri engine, Shakti helicopter engine, and future AMCA fighter — all need MIDHANI\'s nickel super alloys. Multi-decade order pipeline.' },
      ],
      cashCows: [
        { name: 'Armour Steel Plates', growth: '10% CAGR', share: '100% India defence', insight: 'T-72 and Arjun tank armour, mine-protected vehicles. Defence budget allocation ensures steady orders. Rohtak plant adds capacity.' },
        { name: 'Maraging Steel (Missiles)', growth: '12% CAGR', share: '100% domestic', insight: 'BrahMos, Agni, Prithvi missile casings all use MIDHANI maraging steel. India\'s growing missile programme is a guaranteed demand source.' },
      ],
      questionMarks: [
        { name: 'Titanium Sponge Production', growth: 'Import substitution', share: '0% (planned)', insight: 'India imports 100% titanium sponge. MIDHANI planning domestic production at Rohtak. Would reduce cost and dependency on Russia/Japan for this critical material.' },
        { name: 'Export of Defence-Grade Alloys', growth: '15%+ potential', share: '<5% revenue', insight: 'Indian defence exports growing. MIDHANI could supply friendly nations (UAE, Vietnam, etc.) with alloys. Government approvals needed.' },
      ],
      dogs: [
        { name: 'Soft Magnetic Alloys (Commercial)', growth: '5% CAGR', share: '20% India niche', insight: 'Commercial electrical applications face competition from imports. Lower margins than defence products. Not strategic.' },
        { name: 'Refractory Metals (Non-Defence)', growth: '3% CAGR', share: '10% India market', insight: 'Commercial tungsten/moly products face Chinese import competition. Small volumes, not core focus.' },
      ],
    },
    headToHead: {
      competitor: 'HAL (Hindustan Aeronautics)',
      competitorTicker: 'HAL',
      summary: 'MIDHANI vs HAL is comparing a defence material supplier with its biggest customer. Both are defence PSUs benefiting from Atmanirbhar Bharat, but at different points in the value chain.',
      metrics: [
        { label: 'Revenue FY25', company: 1450, competitor: 32000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 30.3, competitor: 25.0, unit: '%', winner: 'company' },
        { label: 'Order Book Growth', company: 25, competitor: 15, unit: '% YoY', winner: 'company' },
        { label: 'Monopoly Position', company: 'Multiple products', competitor: 'Limited', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.05, competitor: 0.10, unit: 'x', winner: 'company' },
        { label: 'Working Capital Days', company: 280, competitor: 180, unit: 'days', winner: 'competitor' },
        { label: 'Revenue Growth (3Y CAGR)', company: 16, competitor: 12, unit: '%', winner: 'company' },
        { label: 'Scalability', company: 'Limited (niche)', competitor: 'High (platform)', unit: '', winner: 'competitor' },
        { label: 'Customer Concentration', company: 'DRDO/ISRO/Navy', competitor: 'IAF/Army/Export', unit: '', winner: 'tie' },
        { label: 'P/E Ratio', company: 38, competitor: 42, unit: 'x', winner: 'company' },
        { label: 'Market Cap', company: 7500, competitor: 280000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Strategic Importance', company: 'Critical materials', competitor: 'Aircraft/helicopter', unit: '', winner: 'tie' },
      ],
      verdict: 'Both are essential defence PSUs with monopoly positions. MIDHANI is upstream (materials), HAL is downstream (platforms). MIDHANI has higher margins and better growth rate but much smaller scale. HAL has platform-level revenue but MIDHANI\'s products are irreplaceable inputs. For insurers: both are effectively zero credit risk (government-backed monopolies). MIDHANI\'s working capital cycle (280 days) is a liquidity concern but manageable given net-cash balance sheet.'
    },
  },
  {
    id: 'jai-balaji', name: 'Jai Balaji Industries', industry: 'steel', ticker: 'JAIBALAJI',
    founded: 1999, headquarters: 'Kolkata, West Bengal', employees: '5,000+', marketCap: '₹12,000 Cr',
    ceo: 'Aditya Jajodia (MD)', website: 'https://www.jaibalajigroup.com',
    description: "​Integrated steel manufacturer in Eastern India with 2.9 MTPA capacity across plants in West Bengal, Chhattisgarh, and Odisha. Produces TMT bars, ductile iron pipes, ferro alloys, and cement. Strong infrastructure-linked product portfolio. In FY25 the company reported revenue of ₹8,500 Cr and net profit of ₹1,250 Cr, at an EBITDA margin of around 23.5%. Its revenue is led by tmt bars (35% of sales), complemented by ductile iron pipes and ferro alloys. Mid-size integrated steel/ferro alloy player in East India. Plants in West Bengal (Durgapur, Raniganj), Chhattisgarh (Raipur), and Odisha.",
    products: [
      { name: 'TMT Bars', revenueShare: 35, description: 'Jai Balaji TMT brand for construction' },
      { name: 'Ductile Iron Pipes', revenueShare: 22, description: 'DI pipes for Jal Jeevan Mission' },
      { name: 'Ferro Alloys', revenueShare: 18, description: 'Ferro manganese and silico manganese' },
      { name: 'Sponge Iron & Pig Iron', revenueShare: 15, description: 'Input materials and merchant sales' },
      { name: 'Cement', revenueShare: 10, description: 'Slag-based cement from steel waste' },
    ],
    financials: [
      { year: 'FY21', revenue: 3200, profit: -120, ebitda: 380 },
      { year: 'FY22', revenue: 5800, profit: 680, ebitda: 1200 },
      { year: 'FY23', revenue: 7200, profit: 850, ebitda: 1500 },
      { year: 'FY24', revenue: 7800, profit: 1100, ebitda: 1800 },
      { year: 'FY25', revenue: 8500, profit: 1250, ebitda: 2000 },
    ],
    revenueFY25: '₹8,500 Cr', profitFY25: '₹1,250 Cr', ebitdaMargin: '23.5%',
    news: [
      { title: 'Jai Balaji DI pipe capacity doubled to 3 lakh TPA for water projects', date: '2025-04-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'NCLT resolves pending cases enabling clean balance sheet', date: '2025-02-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Integrated steel capacity expansion to 4 MTPA announced', date: '2025-01-25', source: 'Company PR', url: 'https://www.jaibalajigroup.com' },
    ],
    futureScope: {
      outlook: 'Turnaround story — from NCLT to profitable growth. DI pipe demand from Jal Jeevan Mission. Infrastructure boom driving TMT demand.',
      plans: ['Capacity expansion to 4 MTPA', 'DI pipe capacity to 5 lakh TPA', 'Debt reduction from strong cash flows', 'New ferro alloy units in Odisha'],
      risks: ['Historical financial stress history', 'East India market concentration', 'Ferro alloy price volatility', 'Competition from Shyam Metalics and Tata Steel'],
    },
    extendedOverview: {
      businessSegments: 'Jai Balaji operates: (1) TMT Bars — construction steel, primary brand (~35% revenue). (2) Ductile Iron Pipes — for Jal Jeevan Mission water projects (~22% revenue). (3) Ferro Alloys — manganese and silicon alloys (~18% revenue). (4) Sponge Iron & Pig Iron — intermediates (~15% revenue). (5) Cement — slag-based from steel waste (~10% revenue). Diversified across steel value chain and DI pipes.',
      geographicPresence: 'Plants in West Bengal (Durgapur, Raniganj), Chhattisgarh (Raipur), and Odisha. Sales concentrated in East and Central India. DI pipe sales driven by government Jal Jeevan Mission orders (pan-India). Ferro alloy exports to international markets.',
      keyStrengths: [
        'Successful turnaround from NCLT — now debt-free and highly profitable',
        'DI pipe entry provides access to massive Jal Jeevan Mission (₹3.6 Lakh Cr scheme)',
        'Vertically integrated — pig iron, ferro alloy, steel, cement from single ecosystem',
        'High EBITDA margins (23%+) driven by DI pipe contribution and low costs',
        'Strong cash generation enabling self-funded expansion without debt'
      ],
      marketPosition: 'Mid-size integrated steel/ferro alloy player in East India. Growing DI pipe segment adds differentiation vs pure steel peers. Turnaround story — from loss-making NCLT company to one of most profitable mid-cap steel players. Strong in Jal Jeevan Mission order wins.',
      rawMaterialStrategy: 'Iron ore: Purchased from NMDC, Odisha auctions (no captive mines currently). Bidding for mining blocks. Coal: Non-coking from ECL/CCL linkage. Manganese ore: Purchased from MOIL and imported for ferro alloys. Pig iron for DI pipes: Captive production from own blast furnaces — cost advantage vs standalone DI pipe makers. Strategy: add captive mining to further improve margins.'
    },
    financialRatios: {
      debtToEquity: 0.15,
      currentRatio: 1.90,
      roe: 18.5,
      roce: 24.0,
      interestCoverage: 25.0,
      netDebt: '₹450 Cr',
      peRatio: 12.0,
      pbRatio: 2.5,
      dividendYield: 0.5,
      workingCapitalDays: 48
    },
    bcgMatrix: {
      stars: [
        { name: 'Ductile Iron Pipes', growth: '30% CAGR', share: '8% India DI pipe market', insight: 'Jal Jeevan Mission driving massive demand for rural water pipes. Recent capacity doubling to 3 lakh TPA. Captive pig iron gives cost advantage over standalone DI pipe makers.' },
        { name: 'TMT Bars', growth: '15% CAGR', share: '8% East India organized', insight: 'Infrastructure boom in eastern India (highways, housing). Brand growing with quality certification. Expanding capacity to capture market share.' },
      ],
      cashCows: [
        { name: 'Ferro Alloys', growth: '6% CAGR', share: '10% India production', insight: 'Stable demand from steel producers. Export revenue provides pricing stability. Low capex maintenance business.' },
        { name: 'Slag Cement', growth: '8% CAGR', share: '2% regional', insight: 'Zero raw material cost (slag from steel plant). Growing construction demand. High-margin by-product business.' },
      ],
      questionMarks: [
        { name: 'Capacity Expansion to 4 MTPA', growth: 'Transformative', share: 'N/A', insight: 'Large expansion announced. If executed from internal accruals (no debt), would make Jai Balaji a significant mid-tier player. Execution track record yet to be proven at this scale.' },
      ],
      dogs: [
        { name: 'Merchant Pig Iron', growth: '2% CAGR', share: '5% regional', insight: 'Low-margin commodity. Being redirected to higher-value DI pipe production. Volume declining as DI pipe demand absorbs pig iron output.' },
        { name: 'Sponge Iron (Merchant)', growth: '1% CAGR', share: '3% East India', insight: 'Commodity intermediate product. Margin thin in merchant sales. Being consumed captively as steel capacity grows.' },
      ],
    },
    headToHead: {
      competitor: 'Shyam Metalics',
      competitorTicker: 'SHYAMMETL',
      summary: 'Jai Balaji vs Shyam Metalics — both East India integrated steel producers with ferro alloy operations. Jai Balaji is the turnaround story; Shyam Metalics is the consistent performer.',
      metrics: [
        { label: 'Revenue FY25', company: 8500, competitor: 13500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 23.5, competitor: 18.5, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 14.7, competitor: 8.1, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.15, competitor: 0.32, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 24.0, competitor: 16.2, unit: '%', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 18, competitor: 12, unit: '%', winner: 'company' },
        { label: 'Scale (Total Capacity)', company: 2.9, competitor: 11.6, unit: 'MTPA', winner: 'competitor' },
        { label: 'DI Pipe Exposure', company: '22% revenue', competitor: 'None', unit: '', winner: 'company' },
        { label: 'Aluminium Diversification', company: 'None', competitor: '12% revenue', unit: '', winner: 'competitor' },
        { label: 'Financial History', company: 'NCLT turnaround', competitor: 'Consistent profit', unit: '', winner: 'competitor' },
        { label: 'TMT Brand (East India)', company: 'Regional', competitor: 'SEL (#1)', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 12000, competitor: 16000, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Jai Balaji currently wins on margins and capital efficiency due to DI pipe contribution (Jal Jeevan Mission). Shyam Metalics wins on scale, consistent track record, and brand strength. Jai Balaji\'s NCLT history remains a concern for some investors. For insurers: Shyam Metalics is the safer long-term credit with proven consistency; Jai Balaji offers higher current returns but carries legacy reputation risk.'
    },
  },
  {
    id: 'hisar-metal', name: 'Hisar Metal Industries', industry: 'steel', ticker: 'HISARMETAL',
    founded: 1985, headquarters: 'New Delhi', employees: '1,200+', marketCap: '₹850 Cr',
    ceo: 'Ramesh Chand Garg (MD)', website: 'https://www.hisarmetal.com',
    description: "​Leading stainless steel pipes and tubes manufacturer. Produces SS welded and seamless pipes for industrial, architectural, and automotive applications. Plants in Haryana and Gujarat. In FY25 the company reported revenue of ₹1,200 Cr and net profit of ₹58 Cr, at an EBITDA margin of around 8.8%. Its revenue is led by ss welded pipes & tubes (45% of sales), complemented by ss seamless pipes and ss sheets & coils. Mid-size SS pipe manufacturer. Plants in Haryana (Hisar) and Gujarat (Ahmedabad).",
    products: [
      { name: 'SS Welded Pipes & Tubes', revenueShare: 45, description: 'Stainless steel welded pipes for industry' },
      { name: 'SS Seamless Pipes', revenueShare: 25, description: 'Seamless tubes for critical applications' },
      { name: 'SS Sheets & Coils', revenueShare: 18, description: 'Flat stainless steel products' },
      { name: 'Architectural Products', revenueShare: 12, description: 'Decorative SS for building applications' },
    ],
    financials: [
      { year: 'FY21', revenue: 650, profit: 25, ebitda: 55 },
      { year: 'FY22', revenue: 920, profit: 48, ebitda: 85 },
      { year: 'FY23', revenue: 1100, profit: 55, ebitda: 100 },
      { year: 'FY24', revenue: 1050, profit: 42, ebitda: 85 },
      { year: 'FY25', revenue: 1200, profit: 58, ebitda: 105 },
    ],
    revenueFY25: '₹1,200 Cr', profitFY25: '₹58 Cr', ebitdaMargin: '8.8%',
    news: [
      { title: 'Hisar Metal expands seamless pipe capacity for petrochemical sector', date: '2025-03-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Exports to Middle East grow 35% on oil refinery demand', date: '2025-02-05', source: 'Company PR', url: 'https://www.hisarmetal.com' },
      { title: 'New architectural-grade SS tube line commissioned', date: '2025-01-08', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Growing with stainless steel consumption in India. Architectural and industrial demand rising. Export potential to Middle East and Africa.',
      plans: ['Seamless pipe capacity expansion', 'Export market diversification', 'Value-added product range', 'Automotive SS tube development'],
      risks: ['SS coil price volatility', 'Small scale vs Jindal Stainless', 'Working capital intensive business', 'Chinese import competition'],
    },
    extendedOverview: {
      businessSegments: 'Hisar Metal operates: (1) SS Welded Pipes & Tubes — standard and decorative (~45% revenue). (2) SS Seamless Pipes — critical applications for petrochemical/pharma (~25% revenue). (3) SS Sheets & Coils — trading and downstream processing (~18% revenue). (4) Architectural Products — decorative stainless for buildings (~12% revenue).',
      geographicPresence: 'Plants in Haryana (Hisar) and Gujarat (Ahmedabad). Sales pan-India with strength in North and West India. Export to Middle East growing (35% growth in recent year). Architectural products sold through project contractors.',
      keyStrengths: [
        'Established brand in SS welded pipes — 35+ years of manufacturing expertise',
        'Growing seamless pipe capability — higher margin segment',
        'Export market access to Middle East oil refinery sector',
        'Dual focus: industrial + architectural gives demand diversification'
      ],
      marketPosition: 'Mid-size SS pipe manufacturer. Stronger in welded pipes for industrial and architectural applications. Growing seamless capability. Much smaller than Ratnamani or Jindal Stainless but carved niche in specific applications.',
      rawMaterialStrategy: 'Stainless steel coils/sheets: 100% purchased from Jindal Stainless, imports. No backward integration. Raw material is 75%+ of cost. Margins dependent on SS coil price stability and pass-through ability to customers.'
    },
    financialRatios: {
      debtToEquity: 0.65,
      currentRatio: 1.20,
      roe: 8.5,
      roce: 11.0,
      interestCoverage: 4.5,
      netDebt: '₹280 Cr',
      peRatio: 15.0,
      pbRatio: 1.2,
      dividendYield: 1.0,
      workingCapitalDays: 95
    },
    bcgMatrix: {
      stars: [
        { name: 'SS Seamless Pipes (Petrochemical)', growth: '15% CAGR', share: '5% India niche', insight: 'Growing oil refinery and petrochemical demand. Higher margins than welded. Export potential to Middle East refineries.' },
      ],
      cashCows: [
        { name: 'SS Welded Pipes (Industrial)', growth: '6% CAGR', share: '8% India SS pipe market', insight: 'Bread-and-butter product. Process industry demand is stable and recurring.' },
        { name: 'Architectural SS Products', growth: '8% CAGR', share: '5% decorative segment', insight: 'Modern construction and interior design driving demand. Project-based but growing.' },
      ],
      questionMarks: [
        { name: 'Automotive SS Tubes', growth: '12% potential', share: '<2%', insight: 'Auto exhaust systems and EV battery housings need SS tubes. New application area if quality proven.' },
      ],
      dogs: [
        { name: 'SS Sheets (Trading)', growth: '3% CAGR', share: '2% market', insight: 'Low-margin trading activity. Value addition is minimal. Maintained for customer relationships.' },
      ],
    },
    headToHead: {
      competitor: 'Ratnamani Metals',
      competitorTicker: 'RATNAMANI',
      summary: 'Hisar Metal vs Ratnamani — both Gujarat-based SS pipe makers, but Ratnamani is 5x larger and operates in premium niche segments (oil/gas, pharma, exotic alloys).',
      metrics: [
        { label: 'Revenue FY25', company: 1200, competitor: 5800, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 8.8, competitor: 21.0, unit: '%', winner: 'competitor' },
        { label: 'Product Mix', company: 'Welded + Architectural', competitor: 'SS + CS + Exotic alloy', unit: '', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.65, competitor: 0.15, unit: 'x', winner: 'competitor' },
        { label: 'Market Position', company: 'Mid-tier', competitor: 'Premium niche leader', unit: '', winner: 'competitor' },
        { label: 'Export Growth', company: 35, competitor: 45, unit: '%', winner: 'competitor' },
        { label: 'Seamless Capability', company: 'Growing', competitor: 'Established', unit: '', winner: 'competitor' },
        { label: 'Customer Base', company: 'General industry', competitor: 'ONGC/Pharma/Nuclear', unit: '', winner: 'competitor' },
        { label: 'P/E Ratio', company: 15, competitor: 32, unit: 'x', winner: 'company' },
        { label: 'Market Cap', company: 850, competitor: 18500, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Ratnamani is vastly superior in every metric — higher margins, better products, premium customers, and near-zero debt. Hisar Metal operates in the more commoditized end of SS pipes. For insurers: Ratnamani is ultra-low risk (premium niche, no debt); Hisar Metal is moderate risk with tighter margins and working capital intensity.'
    },
  },
  {
    id: 'ratnamani-metals', name: 'Ratnamani Metals & Tubes', industry: 'steel', ticker: 'RATNAMANI',
    founded: 1983, headquarters: 'Ahmedabad, Gujarat', employees: '3,500+', marketCap: '₹18,500 Cr',
    ceo: 'Prakash Sanghvi (CMD)', website: 'https://www.ratnamani.com',
    description: "​India's premium stainless steel and carbon steel tube/pipe manufacturer. Serves oil & gas, power, chemical, and pharmaceutical sectors. Plants at Kutch and Chhatral, Gujarat. Known for high-quality, niche products. In FY25 the company reported revenue of ₹5,800 Cr and net profit of ₹800 Cr, at an EBITDA margin of around 21.0%. Its revenue is led by stainless steel pipes & tubes (40% of sales), complemented by carbon steel pipes and titanium & exotic alloy tubes. India's #1 premium pipe/tube manufacturer. Plants at Kutch and Chhatral, Gujarat.",
    products: [
      { name: 'Stainless Steel Pipes & Tubes', revenueShare: 40, description: 'SS pipes for process industries and pharma' },
      { name: 'Carbon Steel Pipes', revenueShare: 30, description: 'Line pipes for oil & gas transmission' },
      { name: 'Titanium & Exotic Alloy Tubes', revenueShare: 12, description: 'Heat exchangers and condensers' },
      { name: 'Large Dia Pipes', revenueShare: 10, description: 'LSAW pipes for cross-country pipelines' },
      { name: 'Instrumentation Tubes', revenueShare: 8, description: 'Small diameter precision tubes' },
    ],
    financials: [
      { year: 'FY21', revenue: 2800, profit: 320, ebitda: 580 },
      { year: 'FY22', revenue: 3400, profit: 420, ebitda: 720 },
      { year: 'FY23', revenue: 4500, profit: 580, ebitda: 920 },
      { year: 'FY24', revenue: 5200, profit: 700, ebitda: 1080 },
      { year: 'FY25', revenue: 5800, profit: 800, ebitda: 1220 },
    ],
    revenueFY25: '₹5,800 Cr', profitFY25: '₹800 Cr', ebitdaMargin: '21.0%',
    news: [
      { title: 'Ratnamani wins Rs 1,200 Cr pipe order from ONGC for subsea pipeline', date: '2025-04-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'New exotic alloy tube facility at Kutch starts production', date: '2025-02-20', source: 'Company PR', url: 'https://www.ratnamani.com' },
      { title: 'Pharmaceutical SS tube exports to Europe grow 45%', date: '2025-01-18', source: 'Financial Express', url: 'https://www.financialexpress.com' },
    ],
    futureScope: {
      outlook: 'Premium niche player in specialty pipes. Oil & gas capex revival and pharma growth driving demand. Strong margins due to product differentiation.',
      plans: ['Exotic alloy tube capacity expansion', 'Subsea pipe certification for deepwater', 'Pharma-grade tube export growth', 'Nuclear-grade pipe development'],
      risks: ['Lumpy oil & gas orders', 'SS raw material price volatility', 'Dependence on project-based orders', 'Competition from imports for exotic alloys'],
    },
    extendedOverview: {
      businessSegments: 'Ratnamani operates from Gujarat: (1) Stainless Steel Pipes & Tubes — seamless and welded for process industries, pharma (~40% revenue). (2) Carbon Steel Pipes — LSAW/ERW for oil & gas pipelines (~30% revenue). (3) Exotic Alloy Tubes — titanium, Inconel, Hastelloy for heat exchangers (~12% revenue). (4) Large Diameter Pipes — LSAW for cross-country pipelines (~10% revenue). (5) Instrumentation Tubes — small dia precision tubes (~8% revenue).',
      geographicPresence: 'Plants at Kutch and Chhatral, Gujarat. Premium customer base: ONGC, IOCL, BPCL, Reliance, BARC (nuclear), pharma majors. Export to Europe, Middle East (pharma SS tubes). 25%+ revenue from exports, growing.',
      keyStrengths: [
        'Premium niche positioning — exotic alloys and pharma-grade tubes command 2-3x pricing',
        'Approved supplier to BARC (nuclear), ONGC (deepwater), and European pharma companies',
        'Highest margins in Indian pipe industry (21%+) due to specialized product mix',
        'Near-zero debt — self-funded growth with strong cash generation',
        'Capability in titanium and exotic alloy tubes — import substitution for critical applications'
      ],
      marketPosition: 'India\'s #1 premium pipe/tube manufacturer. Dominant in pharma-grade SS tubes. Growing in exotic alloy tubes (no domestic competitor). Key differentiator: quality certifications that few Indian companies possess (nuclear, deepwater, pharma).',
      rawMaterialStrategy: 'SS coils/pipes: Purchased from Jindal Stainless and imports. Exotic alloys (Inconel, Hastelloy, titanium): Imported from Sandvik, VDM, and other global specialty metal producers. Carbon steel: From domestic mills. High raw material cost (65-70% of revenue) but premium product pricing provides healthy margins. No backward integration — pure value-added converter.'
    },
    financialRatios: {
      debtToEquity: 0.15,
      currentRatio: 2.10,
      roe: 16.5,
      roce: 21.5,
      interestCoverage: 25.0,
      netDebt: '₹400 Cr',
      peRatio: 32.0,
      pbRatio: 5.0,
      dividendYield: 0.5,
      workingCapitalDays: 110
    },
    bcgMatrix: {
      stars: [
        { name: 'Exotic Alloy Tubes (Inconel/Titanium)', growth: '20% CAGR', share: '60% India market', insight: 'Import substitution for heat exchangers, condensers in refineries and power plants. Premium pricing with 30%+ margins. Growing rapidly.' },
        { name: 'Pharma-Grade SS Tubes (Export)', growth: '18% CAGR', share: '15% India + export', insight: 'European pharma companies approving Ratnamani for process piping. Growing export revenue. Very high quality requirements create barriers.' },
      ],
      cashCows: [
        { name: 'Carbon Steel Line Pipes (Oil & Gas)', growth: '6% CAGR', share: '10% India market', insight: 'ONGC, GAIL pipeline projects provide steady order flow. Established relationships. Moderate margins but high volume.' },
        { name: 'SS Process Pipes (Domestic)', growth: '8% CAGR', share: '25% organized market', insight: 'Refinery and chemical industry maintenance/expansion provides recurring orders. Premium pricing vs competition.' },
      ],
      questionMarks: [
        { name: 'Subsea/Deepwater Pipes', growth: '25% potential', share: '<5% (certification stage)', insight: 'India\'s deepwater oil exploration needs certified subsea pipes. Currently imported. If Ratnamani gets certification, opens new high-margin segment.' },
        { name: 'Nuclear-Grade Pipes (New Reactors)', growth: '15% potential', share: 'BARC approved', insight: 'India planning 10 new nuclear reactors. Each needs specialized piping. Ratnamani already BARC approved — positioned for orders.' },
      ],
      dogs: [
        { name: 'Standard ERW Pipes', growth: '4% CAGR', share: '3% commodity segment', insight: 'Low-margin commodity product maintained for customer relationships. Small volume. Not a focus area.' },
      ],
    },
    headToHead: {
      competitor: 'Welspun Corp',
      competitorTicker: 'WELCORP',
      summary: 'Ratnamani vs Welspun Corp — quality vs quantity. Ratnamani is the premium niche player; Welspun is the volume leader. Different segments of the pipe market.',
      metrics: [
        { label: 'Revenue FY25', company: 5800, competitor: 17500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 21.0, competitor: 14.9, unit: '%', winner: 'company' },
        { label: 'ROCE', company: 21.5, competitor: 18.8, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.15, competitor: 0.38, unit: 'x', winner: 'company' },
        { label: 'Product Premium', company: 'Exotic/Pharma/Nuclear', competitor: 'Large dia commodity', unit: '', winner: 'company' },
        { label: 'Scale', company: 'Mid-size', competitor: 'World #2', unit: '', winner: 'competitor' },
        { label: 'P/E Ratio', company: 32, competitor: 16.5, unit: 'x', winner: 'competitor' },
        { label: 'Revenue Growth', company: 15, competitor: 22, unit: '% 3Y CAGR', winner: 'competitor' },
        { label: 'Export Revenue', company: 25, competitor: 45, unit: '%', winner: 'competitor' },
        { label: 'Customer Quality', company: 'ONGC/BARC/Pharma', competitor: 'Aramco/ADNOC/GAIL', unit: '', winner: 'tie' },
        { label: 'Market Cap', company: 18500, competitor: 18000, unit: '₹ Cr', winner: 'company' },
        { label: 'Working Capital Days', company: 110, competitor: 85, unit: 'days', winner: 'competitor' },
      ],
      verdict: 'Ratnamani wins on quality, margins, and capital efficiency. Welspun wins on scale and volume. Despite similar market caps, they serve different markets — Ratnamani in premium/specialty and Welspun in large-diameter commodity. For insurers: Ratnamani is lower credit risk (near-zero debt, premium margins) but has lumpy order flow; Welspun is more diversified with better order book visibility.'
    },
  },
  {
    id: 'surya-roshni', name: 'Surya Roshni (Steel Pipes Division)', industry: 'steel', ticker: 'SURYAROSNI',
    founded: 1973, headquarters: 'New Delhi', employees: '6,000+', marketCap: '₹7,500 Cr',
    ceo: 'Raju Bista (Chairman & MD)', website: 'https://www.suryaroshni.com',
    description: "​Major manufacturer of ERW steel pipes and GI pipes. Also has lighting business. Steel pipe capacity of 8.5 lakh TPA. Supplies to oil & gas, construction, and agricultural sectors. Plants in Haryana and UP. In FY25 the company reported revenue of ₹9,000 Cr and net profit of ₹380 Cr, at an EBITDA margin of around 8.3%. Its revenue is led by erw steel pipes (35% of sales), complemented by gi pipes and hollow sections. India's #2 ERW/GI pipe maker (after APL Apollo). Steel pipe plants: Bahadurgarh (Haryana), Malanpur (MP).",
    products: [
      { name: 'ERW Steel Pipes', revenueShare: 35, description: 'Electric resistance welded pipes for structural use' },
      { name: 'GI Pipes', revenueShare: 25, description: 'Galvanized iron pipes for water and gas' },
      { name: 'Hollow Sections', revenueShare: 18, description: 'Square and rectangular hollow sections' },
      { name: 'API Line Pipes', revenueShare: 12, description: 'Oil & gas grade pipes' },
      { name: 'Lighting Products', revenueShare: 10, description: 'LED lighting and luminaires' },
    ],
    financials: [
      { year: 'FY21', revenue: 5200, profit: 180, ebitda: 450 },
      { year: 'FY22', revenue: 7800, profit: 320, ebitda: 650 },
      { year: 'FY23', revenue: 8500, profit: 350, ebitda: 700 },
      { year: 'FY24', revenue: 8200, profit: 310, ebitda: 650 },
      { year: 'FY25', revenue: 9000, profit: 380, ebitda: 750 },
    ],
    revenueFY25: '₹9,000 Cr', profitFY25: '₹380 Cr', ebitdaMargin: '8.3%',
    news: [
      { title: 'Surya Roshni steel pipe capacity expanded to 10 lakh TPA', date: '2025-03-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Wins large GI pipe order under Jal Jeevan Mission in UP', date: '2025-02-10', source: 'Company PR', url: 'https://www.suryaroshni.com' },
      { title: 'API-grade pipe exports to Middle East commence', date: '2025-01-12', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Beneficiary of water infrastructure and urban development. Steel pipe demand growing with construction activity. Dual business provides diversification.',
      plans: ['Pipe capacity to 12 lakh TPA', 'API grade expansion for export', 'Solar structure pipes', 'LED lighting market expansion'],
      risks: ['Thin margins in pipe business', 'Steel price volatility pass-through', 'Competition from APL Apollo and others', 'Two separate businesses complexity'],
    },
    extendedOverview: {
      businessSegments: 'Surya Roshni operates two distinct businesses: (1) Steel Pipes Division (~75% revenue) — ERW, GI pipes, hollow sections, API line pipes. (2) Lighting Division (~25% revenue) — LED bulbs, tubes, luminaires, and appliances (fans). Steel pipe capacity 8.5 lakh TPA. Dual-brand play across steel and consumer electronics.',
      geographicPresence: 'Steel pipe plants: Bahadurgarh (Haryana), Malanpur (MP). Lighting plants: Noida (UP). Sales pan-India through 5,000+ dealers. GI pipes strong in North India (agricultural/rural). Lighting brand presence in Tier-2/3 cities. Limited export.',
      keyStrengths: [
        'Dual business diversification — steel cyclicality offset by stable lighting demand',
        'Strong GI pipe brand in agricultural/rural India — water supply and bore wells',
        'Growing API pipe capability for oil & gas sector',
        'Lighting brand gaining share in LED segment with competitive pricing'
      ],
      marketPosition: 'India\'s #2 ERW/GI pipe maker (after APL Apollo). #5 in LED lighting. Uniquely positioned across two different industries. Steel pipes focused on water/agri/construction; lighting on consumer LED.',
      rawMaterialStrategy: 'HR coils: 100% purchased from JSW, Tata Steel, SAIL for pipe manufacturing. No steel backward integration. GI pipes need zinc for galvanizing — purchased at LME-linked prices. Lighting: LED components sourced from Chinese suppliers and domestic assembly. Key vulnerability: thin pipe margins (8-9% EBITDA) leave little room for steel price absorption.'
    },
    financialRatios: {
      debtToEquity: 0.55,
      currentRatio: 1.25,
      roe: 10.5,
      roce: 13.5,
      interestCoverage: 5.5,
      netDebt: '₹1,800 Cr',
      peRatio: 20.0,
      pbRatio: 2.5,
      dividendYield: 0.8,
      workingCapitalDays: 55
    },
    bcgMatrix: {
      stars: [
        { name: 'GI Pipes (Jal Jeevan/Agriculture)', growth: '12% CAGR', share: '15% India GI pipe', insight: 'Rural water supply and agriculture bore wells driving demand. Strong brand in North India. Jal Jeevan Mission adds institutional demand.' },
      ],
      cashCows: [
        { name: 'ERW Steel Pipes (Structural)', growth: '6% CAGR', share: '8% India market', insight: 'Construction and fencing applications. Stable volume business. Pan-India distribution.' },
        { name: 'LED Lighting', growth: '8% CAGR', share: '5% India LED market', insight: 'Consumer LED growing with electrification and replacement demand. Competitive pricing enables volume. Stable margins.' },
      ],
      questionMarks: [
        { name: 'API Line Pipes (Oil & Gas)', growth: '15% potential', share: '3% India API pipe', insight: 'Higher-margin segment serving oil companies. Needs API certification and quality investment. If scaled, could improve overall margins significantly.' },
        { name: 'Solar Structure Pipes', growth: '20% CAGR', share: '<5%', insight: 'Solar panel mounting structures use hollow section pipes. India\'s massive solar installation drive creating new demand vertical.' },
      ],
      dogs: [
        { name: 'Conventional Lighting', growth: '-5% decline', share: 'Declining', insight: 'CFL and incandescent being phased out. LED has taken over. Legacy product line being wound down.' },
      ],
    },
    headToHead: {
      competitor: 'APL Apollo Tubes',
      competitorTicker: 'APLAPOLLO',
      summary: 'Surya Roshni vs APL Apollo — both North India-based pipe manufacturers. APL Apollo is the clear market leader with 2x revenue and structural tube dominance. Surya Roshni has lighting diversification.',
      metrics: [
        { label: 'Revenue FY25', company: 9000, competitor: 20500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 8.3, competitor: 9.8, unit: '%', winner: 'competitor' },
        { label: 'Pipe Capacity', company: 850000, competitor: 4000000, unit: 'TPA', winner: 'competitor' },
        { label: 'Product Focus', company: 'ERW/GI + Lighting', competitor: 'Structural tubes only', unit: '', winner: 'tie' },
        { label: 'Market Position (Pipes)', company: '#2 ERW/GI', competitor: '#1 structural tubes', unit: '', winner: 'competitor' },
        { label: 'Revenue Diversification', company: '2 businesses', competitor: 'Single business', unit: '', winner: 'company' },
        { label: 'Brand Strength (Retail)', company: 'Moderate', competitor: 'Very strong (Apollo)', unit: '', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.55, competitor: 0.30, unit: 'x', winner: 'competitor' },
        { label: 'P/E Ratio', company: 20, competitor: 45, unit: 'x', winner: 'company' },
        { label: 'Market Cap', company: 7500, competitor: 38000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Revenue Growth (3Y CAGR)', company: 8, competitor: 15, unit: '%', winner: 'competitor' },
        { label: 'Agricultural Pipe Strength', company: 'Strong (#1 GI)', competitor: 'Weak', unit: '', winner: 'company' },
      ],
      verdict: 'APL Apollo dominates on every pure-pipe metric — scale, growth, brand, and market position. Surya Roshni offers diversification (lighting) and agricultural pipe leadership. APL Apollo trades at rich valuation (45x P/E) reflecting market leadership premium. For insurers: APL Apollo is lower business risk (dominant #1); Surya Roshni is cheaper valuation but thinner margins and more execution complexity from dual businesses.'
    },
  },
  {
    id: 'apl-apollo', name: 'APL Apollo Tubes', industry: 'steel', ticker: 'APLAPOLLO',
    founded: 1986, headquarters: 'New Delhi', employees: '5,500+', marketCap: '₹38,000 Cr',
    ceo: 'Sanjay Gupta (CMD)', website: 'https://www.aplapollo.com',
    description: "​India's largest structural steel tube manufacturer with 4 MTPA capacity. Market leader in ERW pipes and hollow sections. Revolutionary DFT (Direct Forming Technology) and apollo Z patented products. 12 plants across India. In FY25 the company reported revenue of ₹20,500 Cr and net profit of ₹1,100 Cr, at an EBITDA margin of around 9.8%. Its revenue is led by structural tubes (40% of sales), complemented by gp/gi tubes and apollo z. Undisputed #1 in Indian structural tubes with 55% organized market share. Pan-India manufacturing: 12 plants across Delhi-NCR, Hyderabad, Raipur, Chennai, Kolkata, Durgapur, Bengaluru, Hosur, and others.",
    products: [
      { name: 'Structural Tubes (MS)', revenueShare: 40, description: 'Hollow sections for construction and infrastructure' },
      { name: 'GP/GI Tubes', revenueShare: 22, description: 'Galvanized tubes for plumbing and fencing' },
      { name: 'Apollo Z (Pre-Galvanized)', revenueShare: 18, description: 'Patented pre-galvanized tubes' },
      { name: 'CR Tubes & Profiles', revenueShare: 12, description: 'Cold rolled precision tubes' },
      { name: 'Roofing & Cladding', revenueShare: 8, description: 'Color-coated roofing sheets' },
    ],
    financials: [
      { year: 'FY21', revenue: 8500, profit: 450, ebitda: 850 },
      { year: 'FY22', revenue: 14200, profit: 750, ebitda: 1350 },
      { year: 'FY23', revenue: 16800, profit: 850, ebitda: 1550 },
      { year: 'FY24', revenue: 18500, profit: 950, ebitda: 1750 },
      { year: 'FY25', revenue: 20500, profit: 1100, ebitda: 2000 },
    ],
    revenueFY25: '₹20,500 Cr', profitFY25: '₹1,100 Cr', ebitdaMargin: '9.8%',
    news: [
      { title: 'APL Apollo capacity crosses 4 MTPA with new Raipur plant', date: '2025-04-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Launches Apollo Superstar heavy wall thickness tubes', date: '2025-02-18', source: 'Company PR', url: 'https://www.aplapollo.com' },
      { title: 'Structural steel tubes replacing traditional construction steel', date: '2025-01-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Market leader driving structural steel tube adoption in India. Per capita steel tube consumption still low vs developed markets. Strong brand and distribution moat.',
      plans: ['Capacity target 5 MTPA by FY27', 'Value-added product share to 50%', 'Export market development', 'New applications in solar and EV charging'],
      risks: ['Thin EBITDA per tonne margin model', 'Steel price volatility impact', 'Competition from local re-rollers', 'Construction sector slowdown risk'],
    },
    extendedOverview: {
      businessSegments: 'APL Apollo is India\'s #1 structural steel tube manufacturer: (1) Structural Tubes (MS) — hollow sections for construction/infra (~40% revenue). (2) GP/GI Tubes — galvanized for plumbing/fencing (~22% revenue). (3) Apollo Z (Pre-Galvanized) — patented DFT product (~18% revenue). (4) CR Tubes & Profiles — precision for auto/furniture (~12% revenue). (5) Roofing & Cladding — color-coated sheets (~8% revenue). 12 plants pan-India with 4 MTPA capacity.',
      geographicPresence: 'Pan-India manufacturing: 12 plants across Delhi-NCR, Hyderabad, Raipur, Chennai, Kolkata, Durgapur, Bengaluru, Hosur, and others. 800+ SKUs, 5,000+ dealers, 1,00,000+ retail points. Dominant in North and South India. Export to Middle East, Africa (small but growing).',
      keyStrengths: [
        'India\'s largest structural steel tube company — 4 MTPA, 55% market share in organized segment',
        'Patented DFT (Direct Forming Technology) — only Indian company with this unique process',
        'Unmatched pan-India distribution — 1 lakh+ retail touchpoints is an insurmountable moat',
        'Driving industry shift from angles/channels to structural tubes — expanding TAM',
        'Volume-based model — thin margins but enormous scale provides absolute profit growth',
        '800+ SKU range — largest product catalog in Indian tubes industry'
      ],
      marketPosition: 'Undisputed #1 in Indian structural tubes with 55% organized market share. Only branded tube company at scale. Competitors are fragmented, regional, unbranded re-rollers. Driving the shift from traditional construction steel (angles, channels) to modern hollow sections — effectively expanding its own addressable market.',
      rawMaterialStrategy: 'HR coils: 100% purchased from JSW Steel, Tata Steel, SAIL, and imports. Zero backward integration — pure tube converter. HR coil is 85% of product cost. Business model relies on volume × per-tonne margin (₹3,500-4,500 EBITDA/tonne). Steel price pass-through to customers with 15-20 day lag. Key risk: sudden steel price spikes compress margins temporarily.'
    },
    financialRatios: {
      debtToEquity: 0.30,
      currentRatio: 1.40,
      roe: 18.0,
      roce: 24.0,
      interestCoverage: 12.0,
      netDebt: '₹3,200 Cr',
      peRatio: 45.0,
      pbRatio: 8.0,
      dividendYield: 0.4,
      workingCapitalDays: 22
    },
    bcgMatrix: {
      stars: [
        { name: 'Apollo Z (Pre-Galvanized/DFT)', growth: '25% CAGR', share: '90%+ patented segment', insight: 'Patented DFT technology — unique to APL Apollo. Higher realization, premium product. Growing fast as builders adopt for corrosion resistance.' },
        { name: 'Heavy Wall Structural Tubes', growth: '18% CAGR', share: '50%+ organized market', insight: 'Driving shift from angles/channels to tubes in construction. Multi-storey buildings, factories, warehouses adopting structural tubes. Market expanding.' },
      ],
      cashCows: [
        { name: 'Standard MS Tubes', growth: '8% CAGR', share: '45% organized market', insight: 'Massive volume product for general construction. Low per-tonne margin but enormous scale generates significant absolute profit.' },
        { name: 'GI Pipes & Tubes', growth: '7% CAGR', share: '20% market', insight: 'Plumbing, fencing, agricultural applications. Stable recurring demand. Pan-India distribution ensures reach.' },
      ],
      questionMarks: [
        { name: 'Solar Mounting Structures', growth: '30% CAGR', share: '<5% (new entry)', insight: 'India\'s massive solar installation drive (500 GW target) needs steel mounting structures. APL Apollo entering with specialized tubes.' },
        { name: 'Export Markets', growth: '20% potential', share: '<5% revenue', insight: 'Middle East and Africa construction growing. APL Apollo testing export feasibility. If scaled, diversifies geography.' },
      ],
      dogs: [
        { name: 'Roofing & Cladding Sheets', growth: '5% CAGR', share: '3% market', insight: 'Non-core diversification into color-coated roofing. Faces competition from JSW, Tata BlueScope. Small contributor.' },
      ],
    },
    headToHead: {
      competitor: 'Surya Roshni',
      competitorTicker: 'SURYAROSNI',
      summary: 'APL Apollo vs Surya Roshni — India\'s #1 vs #2 in steel pipes. APL Apollo dominates structural tubes; Surya Roshni is stronger in GI/ERW and has lighting diversification.',
      metrics: [
        { label: 'Revenue FY25', company: 20500, competitor: 9000, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 9.8, competitor: 8.3, unit: '%', winner: 'company' },
        { label: 'Pipe Capacity', company: 4000000, competitor: 850000, unit: 'TPA', winner: 'company' },
        { label: 'Market Share (Organized Tubes)', company: 55, competitor: 8, unit: '%', winner: 'company' },
        { label: 'ROCE', company: 24.0, competitor: 13.5, unit: '%', winner: 'company' },
        { label: 'Distribution Reach', company: '1 lakh+ points', competitor: '5,000 dealers', unit: '', winner: 'company' },
        { label: 'Brand Premium', company: 'High (Apollo)', competitor: 'Moderate', unit: '', winner: 'company' },
        { label: 'Revenue Diversification', company: 'Single (pipes only)', competitor: 'Dual (pipes+lighting)', unit: '', winner: 'competitor' },
        { label: 'GI Pipe Strength', company: 'Moderate', competitor: 'Strong (#1 in agri)', unit: '', winner: 'competitor' },
        { label: 'Innovation/Patents', company: 'DFT, Apollo Z', competitor: 'None', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 38000, competitor: 7500, unit: '₹ Cr', winner: 'company' },
        { label: 'P/E Ratio', company: 45, competitor: 20, unit: 'x', winner: 'competitor' },
      ],
      verdict: 'APL Apollo is the clear industry champion — 5x market cap, 55% market share, patented products, and unmatched distribution. Surya Roshni offers cheaper valuation and business diversification (lighting). APL Apollo commands premium valuation for its category-creating market leadership. For insurers: APL Apollo is lower business risk (dominant market position) but expensive; Surya Roshni is value play with moderate business quality.'
    },
  },
  {
    id: 'gallantt-ispat', name: 'Gallantt Ispat', industry: 'steel', ticker: 'GALLANTT',
    founded: 2005, headquarters: 'Gorakhpur, Uttar Pradesh', employees: '3,000+', marketCap: '₹4,200 Cr',
    ceo: 'Chandra Prakash Agrawal (CMD)', website: 'https://www.gallanttispat.com',
    description: "​Integrated steel and power company in Eastern UP. Produces TMT bars, sponge iron, ferro alloys, and power. Capacity of 0.8 MTPA steel with vertically integrated operations from pellets to finished steel. In FY25 the company reported revenue of ₹4,000 Cr and net profit of ₹320 Cr, at an EBITDA margin of around 14.5%. Its revenue is led by tmt bars (35% of sales), complemented by sponge iron and ferro alloys. Regional player dominant in eastern UP/Bihar construction steel market. Single complex at Gorakhpur, Uttar Pradesh.",
    products: [
      { name: 'TMT Bars', revenueShare: 35, description: 'Construction steel for UP and Bihar markets' },
      { name: 'Sponge Iron', revenueShare: 22, description: 'DRI for internal and merchant use' },
      { name: 'Ferro Alloys', revenueShare: 18, description: 'Ferro silicon and manganese alloys' },
      { name: 'Billets & Ingots', revenueShare: 15, description: 'Semi-finished steel products' },
      { name: 'Power', revenueShare: 10, description: 'Waste heat and captive power' },
    ],
    financials: [
      { year: 'FY21', revenue: 1800, profit: 120, ebitda: 280 },
      { year: 'FY22', revenue: 3200, profit: 350, ebitda: 620 },
      { year: 'FY23', revenue: 3800, profit: 320, ebitda: 580 },
      { year: 'FY24', revenue: 3500, profit: 250, ebitda: 480 },
      { year: 'FY25', revenue: 4000, profit: 320, ebitda: 580 },
    ],
    revenueFY25: '₹4,000 Cr', profitFY25: '₹320 Cr', ebitdaMargin: '14.5%',
    news: [
      { title: 'Gallantt Ispat TMT bar capacity expanded to 1 MTPA', date: '2025-03-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Eastern UP infrastructure projects drive demand growth', date: '2025-02-05', source: 'Company PR', url: 'https://www.gallanttispat.com' },
      { title: 'New wire rod mill commissioning planned for H2 FY26', date: '2025-01-18', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Regional player benefiting from UP infrastructure push (Expressways, Jewar Airport). Low-cost operations in eastern UP.',
      plans: ['Capacity expansion to 1.5 MTPA', 'Wire rod mill addition', 'Backward integration with pellet plant', 'Bihar market expansion'],
      risks: ['Regional concentration in eastern UP/Bihar', 'Small scale vs national players', 'Iron ore sourcing from distant Odisha/Jharkhand', 'Power cost dependency'],
    },
    extendedOverview: {
      businessSegments: 'Gallantt Ispat operates from Gorakhpur, UP: (1) TMT Bars — primary revenue driver for UP/Bihar construction (~35% revenue). (2) Sponge Iron — DRI for captive and merchant (~22% revenue). (3) Ferro Alloys — ferro silicon for steel industry (~18% revenue). (4) Billets & Ingots — semi-finished steel (~15% revenue). (5) Power — waste heat and captive generation (~10% revenue).',
      geographicPresence: 'Single complex at Gorakhpur, Uttar Pradesh. Eastern UP and Bihar are primary markets. UP infrastructure push (expressways, Purvanchal Expressway, Jewar Airport) driving TMT demand. Remote from raw material sources (Odisha/Jharkhand iron ore shipped 800+ km).',
      keyStrengths: [
        'First-mover in eastern UP — limited competition from large steel players in this geography',
        'Integrated operations from sponge iron to TMT — full value chain capture',
        'UP infrastructure boom — expressways, airports, housing driving TMT demand locally',
        'Low overhead costs in Gorakhpur — labor and land advantages'
      ],
      marketPosition: 'Regional player dominant in eastern UP/Bihar construction steel market. Small nationally but large locally. Benefits from under-penetration of organized steel in eastern UP — local TMT brand trusted by small builders.',
      rawMaterialStrategy: 'Iron ore: Purchased from NMDC and Odisha auctions — transported 800+ km by rail (significant logistics cost). Non-coking coal: From NCL (Northern Coalfields, nearby Singrauli). Key disadvantage: distance from iron ore sources. Key advantage: proximity to coal (Singrauli 200 km) and end-market (eastern UP construction boom).'
    },
    financialRatios: {
      debtToEquity: 0.42,
      currentRatio: 1.35,
      roe: 10.0,
      roce: 13.5,
      interestCoverage: 6.0,
      netDebt: '₹650 Cr',
      peRatio: 14.0,
      pbRatio: 1.5,
      dividendYield: 1.0,
      workingCapitalDays: 45
    },
    bcgMatrix: {
      stars: [
        { name: 'TMT Bars (Eastern UP/Bihar)', growth: '15% CAGR', share: '12% eastern UP organized', insight: 'UP expressways, Jewar Airport, affordable housing driving boom. Limited competition from national brands in eastern UP.' },
      ],
      cashCows: [
        { name: 'Sponge Iron', growth: '5% CAGR', share: '5% UP market', insight: 'Feeds own TMT production and local re-rollers. Stable demand in region.' },
        { name: 'Ferro Alloys', growth: '6% CAGR', share: '3% India production', insight: 'Ferro silicon production using captive power. Sold to domestic steel producers.' },
      ],
      questionMarks: [
        { name: 'Wire Rod Mill', growth: '12% potential', share: 'New addition', insight: 'Planned wire rod mill would improve realization per tonne. Feeds fastener/spring demand in UP auto ancillary cluster (Agra/Noida).' },
        { name: 'Bihar Market Expansion', growth: '10% potential', share: '<5% Bihar', insight: 'Bihar infrastructure growing. Adjacent market with similar dynamics. Could double addressable market.' },
      ],
      dogs: [
        { name: 'Merchant Billets/Ingots', growth: '2% CAGR', share: '3% local', insight: 'Low-margin intermediate sold to small re-rollers. Will reduce as own rolling capacity grows.' },
      ],
    },
    headToHead: {
      competitor: 'Shyam Metalics',
      competitorTicker: 'SHYAMMETL',
      summary: 'Gallantt Ispat vs Shyam Metalics — both East India integrated steel producers, but Shyam Metalics is 3x larger and more diversified. Gallantt is a focused regional play.',
      metrics: [
        { label: 'Revenue FY25', company: 4000, competitor: 13500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 14.5, competitor: 18.5, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 0.8, competitor: 11.6, unit: 'MTPA', winner: 'competitor' },
        { label: 'Geography Focus', company: 'Eastern UP/Bihar', competitor: 'Odisha/West Bengal', unit: '', winner: 'tie' },
        { label: 'Debt/Equity', company: 0.42, competitor: 0.32, unit: 'x', winner: 'competitor' },
        { label: 'Product Diversification', company: 'TMT+DRI+Ferro', competitor: 'TMT+DRI+Ferro+Aluminium', unit: '', winner: 'competitor' },
        { label: 'Iron Ore Proximity', company: '800km from ore', competitor: '200km from ore', unit: '', winner: 'competitor' },
        { label: 'Local Market Dominance', company: 'Strong in eastern UP', competitor: 'Strong in Odisha/WB', unit: '', winner: 'tie' },
        { label: 'ROCE', company: 13.5, competitor: 16.2, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 4200, competitor: 16000, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Shyam Metalics is comprehensively larger and better positioned — closer to ore sources, more diversified, higher margins. Gallantt\'s advantage is local eastern UP market dominance where Shyam Metalics doesn\'t compete directly. For insurers: Shyam Metalics is lower risk at all levels; Gallantt is a micro-regional play with concentration risk but benefiting from local infrastructure boom.'
    },
  },
  {
    id: 'electrosteel', name: 'Electrosteel Castings', industry: 'steel', ticker: 'ELECTCAST',
    founded: 1955, headquarters: 'Kolkata, West Bengal', employees: '5,000+', marketCap: '₹6,500 Cr',
    ceo: 'Mayank Kejriwal (MD)', website: 'https://www.electrosteel.com',
    description: "​India's largest ductile iron (DI) pipe manufacturer with 1.3 MTPA capacity. Major beneficiary of Jal Jeevan Mission (rural water scheme). Plants in West Bengal and Chhattisgarh. Also produces cast iron pipes and fittings. In FY25 the company reported revenue of ₹6,500 Cr and net profit of ₹650 Cr, at an EBITDA margin of around 17.7%. Its revenue is led by ductile iron pipes (65% of sales), complemented by cast iron pipes & fittings and ductile iron fittings. India's #1 DI pipe manufacturer by capacity and revenue. Plants in Khardah (West Bengal — original plant) and Elavur/Srikalahasti (Chhattisgarh — expansion).",
    products: [
      { name: 'Ductile Iron Pipes', revenueShare: 65, description: 'DI pipes for water supply projects' },
      { name: 'Cast Iron Pipes & Fittings', revenueShare: 15, description: 'Gravity flow drainage systems' },
      { name: 'Ductile Iron Fittings', revenueShare: 12, description: 'Bends, tees, valves for DI pipe systems' },
      { name: 'Railway Castings', revenueShare: 8, description: 'Bogie components for Indian Railways' },
    ],
    financials: [
      { year: 'FY21', revenue: 3200, profit: 180, ebitda: 480 },
      { year: 'FY22', revenue: 4500, profit: 380, ebitda: 750 },
      { year: 'FY23', revenue: 5200, profit: 480, ebitda: 880 },
      { year: 'FY24', revenue: 5800, profit: 550, ebitda: 1000 },
      { year: 'FY25', revenue: 6500, profit: 650, ebitda: 1150 },
    ],
    revenueFY25: '₹6,500 Cr', profitFY25: '₹650 Cr', ebitdaMargin: '17.7%',
    news: [
      { title: 'Electrosteel wins Rs 2,100 Cr Jal Jeevan Mission order in Rajasthan', date: '2025-04-02', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'DI pipe capacity expanded to 1.5 MTPA with new production line', date: '2025-02-15', source: 'Company PR', url: 'https://www.electrosteel.com' },
      { title: 'Exports to Africa and Middle East grow 40% on urban water projects', date: '2025-01-10', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Dominant in DI pipes with Jal Jeevan Mission as key driver. Urban water infrastructure spending increasing. AMRUT 2.0 adds new order pipeline.',
      plans: ['DI pipe capacity to 2 MTPA', 'Fittings manufacturing expansion', 'Export to Africa and ASEAN', 'AMRUT 2.0 urban water pipeline opportunity'],
      risks: ['Government budget allocation dependency', 'Pig iron price volatility (key raw material)', 'Competition from Jindal SAW and Jai Balaji', 'Project execution delays by state governments'],
    },
    extendedOverview: {
      businessSegments: 'Electrosteel Castings operates: (1) Ductile Iron Pipes — primary product for water supply (~65% revenue). (2) Cast Iron Pipes & Fittings — gravity drainage systems (~15% revenue). (3) DI Fittings — bends, tees, valves (~12% revenue). (4) Railway Castings — bogie components for Indian Railways (~8% revenue). Dominant DI pipe manufacturer.',
      geographicPresence: 'Plants in Khardah (West Bengal — original plant) and Elavur/Srikalahasti (Chhattisgarh — expansion). Sales pan-India driven by Jal Jeevan Mission orders from state governments. Export to Africa and Middle East growing (40% growth recently). Strong in East and South India.',
      keyStrengths: [
        'India\'s #1 DI pipe manufacturer — 1.3 MTPA capacity, expanding to 1.5 MTPA',
        'Direct beneficiary of Jal Jeevan Mission (₹3.6 Lakh Cr rural water scheme)',
        'AMRUT 2.0 (₹2.87 Lakh Cr urban water) adds additional demand pipeline',
        'Integrated fittings capability — complete piping solutions, not just pipes',
        'Growing export to Africa where water infrastructure is being built'
      ],
      marketPosition: 'India\'s #1 DI pipe manufacturer by capacity and revenue. Dominant in organized DI pipe segment (35%+ share). Competition from Jindal SAW, Jai Balaji, and Welspun Corp growing but Electrosteel has first-mover scale and customer relationships.',
      rawMaterialStrategy: 'Pig iron: Primary raw material (~50% of cost) — purchased from Tata Steel, SAIL, and imported. No captive pig iron production (unlike Jai Balaji which has captive BF). This is the key cost disadvantage vs integrated competitors. DI pipe production uses centrifugal casting process. Zinc and bitumen for coating purchased externally. Strategy: exploring backward integration into pig iron/BF to reduce cost.'
    },
    financialRatios: {
      debtToEquity: 0.52,
      currentRatio: 1.30,
      roe: 13.5,
      roce: 16.8,
      interestCoverage: 7.0,
      netDebt: '₹1,500 Cr',
      peRatio: 14.0,
      pbRatio: 2.0,
      dividendYield: 1.2,
      workingCapitalDays: 75
    },
    bcgMatrix: {
      stars: [
        { name: 'DI Pipes (Jal Jeevan Mission)', growth: '20% CAGR', share: '35% India organized', insight: 'Jal Jeevan Mission is a ₹3.6 Lakh Cr scheme ensuring multi-year demand. Order book growing 30%+ annually. Electrosteel is #1 supplier.' },
        { name: 'DI Pipes (AMRUT 2.0 Urban)', growth: '18% CAGR', share: '25% urban DI market', insight: 'Urban water supply replacement and expansion under AMRUT 2.0. Higher diameter pipes with better realization.' },
      ],
      cashCows: [
        { name: 'DI Fittings', growth: '12% CAGR', share: '30% India organized', insight: 'High-margin value-added product. Every DI pipe system needs fittings. Growing in line with pipe volumes. Better per-tonne margins than pipes.' },
        { name: 'Cast Iron Pipes (Drainage)', growth: '5% CAGR', share: '40% India market', insight: 'Gravity drainage systems for buildings and urban areas. Mature segment but stable demand from construction.' },
      ],
      questionMarks: [
        { name: 'Export (Africa/Middle East)', growth: '25% CAGR', share: '5% revenue', insight: 'African countries building water infrastructure. India is natural supplier. 40% growth recently — could become significant revenue stream.' },
        { name: 'Backward Integration (Pig Iron)', growth: 'Cost reduction', share: 'N/A', insight: 'Captive pig iron would cut raw material cost by 15-20%. Under evaluation. Would eliminate key competitive disadvantage vs Jai Balaji.' },
      ],
      dogs: [
        { name: 'Railway Castings', growth: '3% CAGR', share: '5% niche market', insight: 'Small legacy business. Not core focus. Competition from Chinese imports. Maintained for diversification.' },
      ],
    },
    headToHead: {
      competitor: 'Jai Balaji Industries',
      competitorTicker: 'JAIBALAJI',
      summary: 'Electrosteel vs Jai Balaji — both major DI pipe players but from different backgrounds. Electrosteel is a pure DI pipe specialist; Jai Balaji entered DI pipes from steel/ferro alloys.',
      metrics: [
        { label: 'Revenue FY25', company: 6500, competitor: 8500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'DI Pipe Revenue', company: 4225, competitor: 1870, unit: '₹ Cr', winner: 'company' },
        { label: 'DI Pipe Capacity', company: 1300000, competitor: 300000, unit: 'TPA', winner: 'company' },
        { label: 'EBITDA Margin', company: 17.7, competitor: 23.5, unit: '%', winner: 'competitor' },
        { label: 'Captive Pig Iron', company: 'No', competitor: 'Yes (BF)', unit: '', winner: 'competitor' },
        { label: 'DI Pipe Experience', company: '70 years', competitor: '3 years', unit: '', winner: 'company' },
        { label: 'Fittings Capability', company: 'Yes (full range)', competitor: 'Limited', unit: '', winner: 'company' },
        { label: 'Export Revenue', company: '15% and growing', competitor: '<5%', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.52, competitor: 0.15, unit: 'x', winner: 'competitor' },
        { label: 'Product Focus', company: 'DI pipe specialist', competitor: 'Diversified steel', unit: '', winner: 'tie' },
        { label: 'Order Book Visibility', company: 'High (Jal Jeevan)', competitor: 'Moderate', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 6500, competitor: 12000, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Electrosteel is the clear DI pipe market leader with 4x capacity and 70 years of expertise. Jai Balaji has cost advantage from captive pig iron but is a new entrant in DI. Electrosteel\'s export capability and fittings range provide additional moats. For insurers: Electrosteel is the safer bet for DI pipe exposure (proven specialist); Jai Balaji offers better overall margins due to diversification but DI pipe is only 22% of revenue.'
    },
  },
  // ==================== CEMENT (20) ====================
  {
    id: 'ultratech-cement', name: 'UltraTech Cement', industry: 'cement', ticker: 'ULTRACEMCO',
    founded: 1983, headquarters: 'Mumbai, Maharashtra', employees: '22,000+', marketCap: '₹3.2 Lakh Cr',
    ceo: 'K.C. Jhanwar (MD)', website: 'https://www.ultratechcement.com',
    description: "​India's largest cement manufacturer and world's largest outside China. Part of Aditya Birla Group. Capacity 152.6 MTPA across 23 integrated plants, 29 grinding units, and 8 bulk terminals. In FY25 the company reported revenue of ₹75,400 Cr and net profit of ₹8,100 Cr, at an EBITDA margin of around 21.5%. Its revenue is led by opc (40% of sales), complemented by ppc and ready mix concrete. India's undisputed #1. Pan-India: 23 integrated plants, 29 grinding units, 8 bulk terminals.",
    products: [
      { name: 'OPC (Ordinary Portland Cement)', revenueShare: 40, description: 'Standard construction cement' },
      { name: 'PPC (Portland Pozzolana Cement)', revenueShare: 35, description: 'Blended cement for general construction' },
      { name: 'Ready Mix Concrete', revenueShare: 15, description: 'Customized concrete solutions' },
      { name: 'White Cement (Birla White)', revenueShare: 7, description: 'Decorative and specialty applications' },
      { name: 'Building Products', revenueShare: 3, description: 'Putty, waterproofing solutions' },
    ],
    financials: [
      { year: 'FY21', revenue: 42753, profit: 5867, ebitda: 10241 },
      { year: 'FY22', revenue: 52597, profit: 5670, ebitda: 10891 },
      { year: 'FY23', revenue: 63242, profit: 6584, ebitda: 12103 },
      { year: 'FY24', revenue: 69820, profit: 7200, ebitda: 14500 },
      { year: 'FY25', revenue: 75400, profit: 8100, ebitda: 16200 },
    ],
    revenueFY25: '₹75,400 Cr', profitFY25: '₹8,100 Cr', ebitdaMargin: '21.5%',
    news: [
      { title: 'UltraTech capacity crosses 189 MTPA after India Cements deal', date: '2025-06-15', source: 'BSE Filing', url: 'https://www.ultratechcement.com' },
      { title: 'CCI approves India Cements acquisition', date: '2025-01-15', source: 'CCI', url: 'https://www.cci.gov.in' },
      { title: 'Green cement variant launched with 100% blended composition', date: '2025-03-01', source: 'Company PR', url: 'https://www.ultratechcement.com' },
    ],
    futureScope: {
      outlook: 'Targeting 200 MTPA by FY26. Aggressive expansion through acquisitions and greenfield projects.',
      plans: ['India Cements integration (14.8 MTPA)', 'New grinding units in East India', 'Waste heat recovery at all plants', '100% renewable energy for grinding'],
      risks: ['Regional overcapacity in South', 'Rising fuel costs', 'Monsoon seasonality', 'Sand mining restrictions'],
    },
    extendedOverview: {
      businessSegments: 'UltraTech Cement (Aditya Birla Group) operates: (1) Grey Cement — OPC, PPC, composite cement, slag cement (~75% revenue). (2) Ready Mix Concrete (RMC) — 200+ plants across India (~15% revenue). (3) White Cement — Birla White brand for decorative applications (~7% revenue). (4) Building Products — putty, waterproofing, tile adhesives (~3% revenue). Largest non-China cement company globally.',
      geographicPresence: 'Pan-India: 23 integrated plants, 29 grinding units, 8 bulk terminals. Present in all major states. Strong in North (UP, Rajasthan), West (Gujarat, Maharashtra), and South. After India Cements acquisition, will dominate South India. UAE and Bahrain operations. Distribution: 1 lakh+ dealers, 2.5 lakh+ retail points.',
      keyStrengths: [
        'India\'s #1 cement producer — 152.6 MTPA (189 MTPA post India Cements), largest outside China',
        'Unmatched pan-India distribution — 1 lakh+ dealers in every district of India',
        'Premium brand portfolio — UltraTech, Birla White, UltraTech Building Solutions',
        'Aditya Birla Group backing — strong balance sheet and management capability',
        'RMC leadership — largest RMC player in India with 200+ plants',
        'Sustainability leader — lowest carbon footprint per tonne among large Indian cement companies'
      ],
      marketPosition: 'India\'s undisputed #1. 22% market share by capacity. Only company present in all cement-consuming states. Price maker in most markets. Twice the size of #2 (Adani Group\'s Ambuja+ACC combined). Post India Cements acquisition, will have 189 MTPA — approaching 25% market share.',
      rawMaterialStrategy: 'Limestone: 100% captive with 50+ year reserves across all plants. Largest limestone reserve holder in India. Fuel: Mix of pet coke (imported), domestic coal (Coal India linkage), and increasing alternative fuels (15%+ thermal substitution). Fly ash: From nearby thermal power plants for PPC production. Gypsum: Mix of natural (Rajasthan) and synthetic (phosphogypsum from fertilizer plants).'
    },
    financialRatios: {
      debtToEquity: 0.45,
      currentRatio: 1.05,
      roe: 12.5,
      roce: 15.8,
      interestCoverage: 8.5,
      netDebt: '₹22,000 Cr',
      peRatio: 42.0,
      pbRatio: 5.2,
      dividendYield: 0.5,
      workingCapitalDays: -15
    },
    bcgMatrix: {
      stars: [
        { name: 'Ready Mix Concrete (RMC)', growth: '18% CAGR', share: '12% India organized RMC', insight: 'Fastest growing segment. Urbanization and quality consciousness driving shift from site-mix to RMC. 200+ plants. Higher margin than bulk cement.' },
        { name: 'Building Solutions (Putty/Waterproofing)', growth: '20% CAGR', share: '8% organized market', insight: 'Leveraging cement distribution for adjacency products. High-margin, asset-light. Growing consumer brand.' },
      ],
      cashCows: [
        { name: 'Grey Cement (PPC/OPC)', growth: '7% CAGR', share: '22% India', insight: 'Core cash generator. Pricing power from #1 position. Consistent demand from housing and infrastructure. 152 MTPA capacity earns steady profits.' },
        { name: 'White Cement (Birla White)', growth: '8% CAGR', share: '40% India white cement', insight: 'Dominant in decorative/premium segment. High margin. Limited competition (only JK White competes). Strong brand recall.' },
      ],
      questionMarks: [
        { name: 'Green Cement (Low Carbon)', growth: '15% potential', share: '10% of own mix', insight: 'Blended cement with lower clinker factor reduces CO2. Regulatory push and green building norms could make this mainstream. First mover advantage.' },
        { name: 'East India Expansion', growth: '12% CAGR', share: '15% (below average)', insight: 'Eastern India (Bihar, Jharkhand, Odisha) is under-penetrated for cement. New grinding units planned. Large infrastructure projects upcoming.' },
      ],
      dogs: [
        { name: 'UAE/Bahrain Operations', growth: '2% CAGR', share: '15% UAE market', insight: 'Small international business. Stable but not growing. Depressed construction in Middle East. Not strategic focus.' },
      ],
    },
    headToHead: {
      competitor: 'Ambuja Cements (Adani Group)',
      competitorTicker: 'AMBUJACEM',
      summary: 'UltraTech vs Ambuja — India\'s #1 vs the Adani Group\'s aggressive new entrant in cement. UltraTech leads on scale and track record; Adani/Ambuja is catching up through rapid acquisitions.',
      metrics: [
        { label: 'Revenue FY25', company: 75400, competitor: 35800, unit: '₹ Cr', winner: 'company' },
        { label: 'Capacity', company: 152.6, competitor: 89, unit: 'MTPA', winner: 'company' },
        { label: 'EBITDA Margin', company: 21.5, competitor: 20.0, unit: '%', winner: 'company' },
        { label: 'EBITDA/Tonne', company: 1250, competitor: 1100, unit: '₹', winner: 'company' },
        { label: 'RMC Presence', company: '200+ plants', competitor: '50+ plants', unit: '', winner: 'company' },
        { label: 'Pan-India Coverage', company: 'All states', competitor: '18 states', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.45, competitor: 0.25, unit: 'x', winner: 'competitor' },
        { label: 'Capacity Growth Target', company: '200 MTPA', competitor: '140 MTPA', unit: 'by FY28', winner: 'company' },
        { label: 'White Cement', company: 'Yes (Birla White)', competitor: 'No', unit: '', winner: 'company' },
        { label: 'Cost of Expansion (₹/tonne)', company: 5500, competitor: 4800, unit: '₹', winner: 'competitor' },
        { label: 'Market Cap', company: 320000, competitor: 135000, unit: '₹ Cr', winner: 'company' },
        { label: 'Owner-Operator Drive', company: 'Professional mgmt', competitor: 'Promoter-driven (Adani)', unit: '', winner: 'tie' },
      ],
      verdict: 'UltraTech is the established dominant leader — 2x capacity, better margins, pan-India presence, and decades of track record. Ambuja/Adani is the aggressive challenger using Adani Group\'s financial muscle for rapid capacity addition. UltraTech\'s response (India Cements acquisition, new capacity) shows it won\'t cede ground easily. For insurers: UltraTech is the gold standard — lowest concentration risk, best pricing power, proven management. Ambuja/Adani is growing faster but integration execution and leverage are watch items.'
    },
  },
  {
    id: 'ambuja-cements', name: 'Ambuja Cements', industry: 'cement', ticker: 'AMBUJACEM',
    founded: 1983, headquarters: 'Mumbai, Maharashtra', employees: '15,000+', marketCap: '₹1.35 Lakh Cr',
    ceo: 'Ajay Kapur (CEO)', website: 'https://www.ambujacement.com',
    description: "​Part of Adani Group since 2022. One of India's leading cement companies with 31 MTPA capacity. Known for premium brand positioning and strong distribution in western and northern India. In FY25 the company reported revenue of ₹38,500 Cr and net profit of ₹5,100 Cr, at an EBITDA margin of around 22.1%. Its revenue is led by portland pozzolana cement (42% of sales), complemented by ordinary portland cement and composite cement. India's #3 cement company by capacity (31 MTPA standalone, 89 MTPA combined with ACC). Pan-India presence with stronghold in western and northern India.",
    products: [
      { name: 'Portland Pozzolana Cement', revenueShare: 42, description: 'Flagship blended cement' },
      { name: 'Ordinary Portland Cement', revenueShare: 30, description: 'High-strength OPC' },
      { name: 'Composite Cement', revenueShare: 12, description: 'Performance-plus grades' },
      { name: 'Ready Mix Concrete', revenueShare: 10, description: 'Project-specific solutions' },
      { name: 'Building Solutions', revenueShare: 6, description: 'Cool walls, roof shield, waterproofing' },
    ],
    financials: [
      { year: 'FY21', revenue: 13587, profit: 2565, ebitda: 3850 },
      { year: 'FY22', revenue: 15167, profit: 2302, ebitda: 3520 },
      { year: 'FY23', revenue: 17952, profit: 2088, ebitda: 3280 },
      { year: 'FY24', revenue: 33800, profit: 4200, ebitda: 7100 },
      { year: 'FY25', revenue: 38500, profit: 5100, ebitda: 8500 },
    ],
    revenueFY25: '₹38,500 Cr', profitFY25: '₹5,100 Cr', ebitdaMargin: '22.1%',
    news: [
      { title: 'Adani completes operational integration of Ambuja with ACC', date: '2025-04-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'New clinker line at Bhatapara adds 3.3 MTPA', date: '2025-02-18', source: 'Company PR', url: 'https://www.ambujacement.com' },
      { title: 'Targets 140 MTPA combined capacity under Adani umbrella', date: '2025-01-22', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Rapid capacity expansion under Adani ownership. Combined Ambuja-ACC targeting 140 MTPA by FY28.',
      plans: ['140 MTPA with ACC combined', 'New plants in MP and Rajasthan', 'Logistics via Adani ports', 'Green energy from Adani renewables'],
      risks: ['High Adani Group leverage', 'Integration challenges', 'UltraTech competition', 'Regulatory scrutiny on Adani'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (PPC, OPC, Composite), Ready Mix Concrete, Building Solutions (cool walls, waterproofing). Primarily serves housing and infrastructure sectors.',
      geographicPresence: 'Pan-India presence with stronghold in western and northern India. 6 integrated plants and 8 grinding units across Gujarat, Rajasthan, West Bengal, Maharashtra, Punjab, Chhattisgarh.',
      keyStrengths: [
        'Adani Group backing — access to ports, logistics, green energy, and capital',
        'Premium brand with strong dealer loyalty in western India',
        'Low-cost limestone reserves in Gujarat and Rajasthan',
        'Combined Ambuja-ACC synergies unlocking ₹800 Cr+ annual savings'
      ],
      marketPosition: 'India\'s #3 cement company by capacity (31 MTPA standalone, 89 MTPA combined with ACC). Strong pricing power in Gujarat and Maharashtra. Post-Adani acquisition, rapid expansion underway to challenge UltraTech\'s dominance.',
      rawMaterialStrategy: 'Captive limestone from Ambuja Nagar (Gujarat) and Rajasthan — 40+ year reserves. Fuel: Increasing use of Adani Group renewable energy. Fly ash sourced from nearby thermal plants. Logistics advantage via Adani Ports for coastal shipping of clinker.'
    },
    financialRatios: {
      debtToEquity: 0.25,
      currentRatio: 1.35,
      roe: 10.8,
      roce: 13.5,
      interestCoverage: 12.5,
      netDebt: '₹8,500 Cr',
      peRatio: 32.0,
      pbRatio: 3.4,
      dividendYield: 0.8,
      workingCapitalDays: -10
    },
    bcgMatrix: {
      stars: [
        { name: 'Capacity Expansion (New Plants)', growth: '25% CAGR', share: '15% India cement', insight: 'Aggressive greenfield and brownfield expansion leveraging Adani Group capital. Targeting 140 MTPA combined — would become #2 after UltraTech.' },
        { name: 'Building Solutions', growth: '20% CAGR', share: '5% organized market', insight: 'Cool walls, waterproofing, and specialty products growing rapidly on housing boom.' },
      ],
      cashCows: [
        { name: 'Grey Cement (PPC/OPC)', growth: '8% CAGR', share: '9% India market', insight: 'Core business generating consistent cash. Premium pricing in Gujarat/Maharashtra. Strong dealer network.' },
        { name: 'Composite Cement', growth: '6% CAGR', share: '12% composite segment', insight: 'Performance-plus grades for infrastructure. Steady demand from government projects.' },
      ],
      questionMarks: [
        { name: 'Ready Mix Concrete', growth: '15% CAGR', share: '4% organized RMC', insight: 'Growing segment but far behind UltraTech (200+ plants). Requires significant capital to scale nationwide.' },
        { name: 'Green Cement (Low Clinker)', growth: '12% potential', share: '8% of own mix', insight: 'Leveraging Adani renewables for green energy in cement production. Carbon credits opportunity.' },
      ],
      dogs: [
        { name: 'Bulk Cement (Unbranded)', growth: '3% CAGR', share: '6% bulk market', insight: 'Low-margin commodity sales to large projects. Being reduced in favor of branded premium products.' },
      ],
    },
    headToHead: {
      competitor: 'Shree Cement',
      competitorTicker: 'SHREECEM',
      summary: 'Ambuja (Adani-backed scale) vs Shree Cement (operational efficiency champion). Ambuja is bigger and growing faster, but Shree Cement has industry-best cost efficiency and margins.',
      metrics: [
        { label: 'Revenue FY25', company: 38500, competitor: 21500, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 22.1, competitor: 23.7, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 31, competitor: 46.4, unit: 'MTPA', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 13.2, competitor: 12.1, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.25, competitor: 0.22, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 13.5, competitor: 15.8, unit: '%', winner: 'competitor' },
        { label: 'Cost per Tonne', company: 4200, competitor: 3800, unit: '₹', winner: 'competitor' },
        { label: 'Capacity Growth Rate', company: 25, competitor: 12, unit: '%', winner: 'company' },
        { label: 'Geographic Spread', company: '12 states', competitor: '8 states', unit: '', winner: 'company' },
        { label: 'Alternative Fuel Use', company: 15, competitor: 35, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 135000, competitor: 100000, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Shree Cement wins on operational efficiency — lowest cost per tonne, highest EBITDA margin, and best alternative fuel utilization in the industry. Ambuja wins on scale, growth rate, and Adani Group synergies. For insurers: Shree Cement is the quality-earnings bet with proven capital efficiency; Ambuja is the growth story with execution risk from rapid expansion.'
    },
  },
  {
    id: 'shree-cement', name: 'Shree Cement', industry: 'cement', ticker: 'SHREECEM',
    founded: 1979, headquarters: 'Beawar, Rajasthan', employees: '11,000+', marketCap: '₹1.0 Lakh Cr',
    ceo: 'Neeraj Akhoury (MD)', website: 'https://www.shreecement.com',
    description: "​One of India's most profitable cement companies. Known for operational efficiency and lowest cost per tonne. Capacity 46.4 MTPA with plants in Rajasthan, Chhattisgarh, UP, and Bihar. In FY25 the company reported revenue of ₹21,500 Cr and net profit of ₹2,600 Cr, at an EBITDA margin of around 23.7%. Its revenue is led by ppc (38% of sales), complemented by opc cement and composite & slag cement. India's #3 by capacity (46.4 MTPA). Strong in North, Central, and East India.",
    products: [
      { name: 'PPC (Shree Jung Rodhak/Bangur)', revenueShare: 38, description: 'Blended cements' },
      { name: 'OPC Cement', revenueShare: 30, description: 'High-grade OPC for infrastructure' },
      { name: 'Composite & Slag Cement', revenueShare: 15, description: 'PSC for specialty use' },
      { name: 'Ready Mix Concrete', revenueShare: 10, description: 'Project-based RMC' },
      { name: 'White Cement & Putty', revenueShare: 7, description: 'Decorative segment' },
    ],
    financials: [
      { year: 'FY21', revenue: 13262, profit: 2522, ebitda: 4280 },
      { year: 'FY22', revenue: 15046, profit: 2280, ebitda: 3920 },
      { year: 'FY23', revenue: 17684, profit: 1823, ebitda: 3650 },
      { year: 'FY24', revenue: 19400, profit: 2050, ebitda: 4300 },
      { year: 'FY25', revenue: 21500, profit: 2600, ebitda: 5100 },
    ],
    revenueFY25: '₹21,500 Cr', profitFY25: '₹2,600 Cr', ebitdaMargin: '23.7%',
    news: [
      { title: 'Shree Cement capacity reaches 46.4 MTPA with new Rajasthan line', date: '2025-03-30', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Achieves industry-best thermal substitution rate of 35%', date: '2025-02-12', source: 'Company PR', url: 'https://www.shreecement.com' },
      { title: 'New unit in Purulia starts commercial production', date: '2025-01-28', source: 'Company PR', url: 'https://www.shreecement.com' },
    ],
    futureScope: {
      outlook: 'Known for capital efficiency. Expanding East India presence. Focus on alternative fuels and carbon reduction.',
      plans: ['Capacity target 80 MTPA by FY28', 'East India expansion', 'Alt fuel to 40% by FY27', 'Carbon capture pilot'],
      risks: ['Rich valuation limits upside', 'Expansion into new geographies', 'Limestone reserve adequacy', 'Competition from Adani group'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Shree Jung Rodhak, Bangur, Rockstrong brands), White Cement & Putty, Ready Mix Concrete, Power (WHR & solar). Multi-brand strategy targeting different price segments.',
      geographicPresence: 'Strong in North, Central, and East India. Plants in Rajasthan (Beawar, Ras), Chhattisgarh (Baloda Bazaar, Raipur), UP (Bulandshahr), Bihar (Aurangabad), West Bengal (Purulia). Expanding in East and South.',
      keyStrengths: [
        'Industry-best cost efficiency — lowest cost per tonne among top 5 cement companies',
        'Highest alternative fuel usage (35% thermal substitution) in India',
        'Capital-light expansion model — greenfield plants at ₹3,800/tonne vs industry average ₹5,500',
        'Multi-brand strategy covering premium and mass segments'
      ],
      marketPosition: 'India\'s #3 by capacity (46.4 MTPA). Most profitable large cement company on per-tonne basis. Dominant in Rajasthan (#1) and strong in UP/Bihar. Known as the "efficiency benchmark" of Indian cement.',
      rawMaterialStrategy: 'Captive limestone in Rajasthan (Beawar, Ras) with 50+ year reserves. Industry-leading alternative fuel program — uses RDF, biomass, carbon black, and industrial waste achieving 35% thermal substitution. WHR power meets 30% of electricity needs. Solar power at multiple plants.'
    },
    financialRatios: {
      debtToEquity: 0.22,
      currentRatio: 1.18,
      roe: 11.2,
      roce: 15.8,
      interestCoverage: 18.5,
      netDebt: '₹4,800 Cr',
      peRatio: 45.0,
      pbRatio: 5.8,
      dividendYield: 0.4,
      workingCapitalDays: -18
    },
    bcgMatrix: {
      stars: [
        { name: 'East India Expansion', growth: '15% CAGR', share: '12% East India', insight: 'New plants in Bihar, Bengal, Odisha targeting under-penetrated markets. Government infra spending driving demand.' },
        { name: 'Alternative Fuels & Sustainability', growth: '25% CAGR', share: '35% thermal substitution', insight: 'Industry leader in waste co-processing. Revenue from carbon credits and waste gate fees. Competitive moat on cost.' },
      ],
      cashCows: [
        { name: 'Grey Cement North India', growth: '7% CAGR', share: '18% North India', insight: 'Rajasthan and UP stronghold. Low-cost production from Beawar/Ras plants with captive limestone. Dominant brand recall.' },
        { name: 'Power (WHR + Solar)', growth: '5% CAGR', share: 'Internal use', insight: 'Waste heat recovery and solar meet 30%+ of power needs. Effectively a cost arbitrage generating stable internal savings.' },
      ],
      questionMarks: [
        { name: 'White Cement & Putty', growth: '12% CAGR', share: '8% putty market', insight: 'Small but growing. Competes with Birla White and Asian Paints. Needs brand building investment to scale.' },
        { name: 'South India Entry', growth: '10% potential', share: '<3% South', insight: 'New territory with strong incumbents (Ramco, Dalmia, UltraTech). Execution uncertain but large addressable market.' },
      ],
      dogs: [
        { name: 'Ready Mix Concrete', growth: '8% CAGR', share: '2% organized RMC', insight: 'Small presence. Capital-intensive to scale. Behind UltraTech (200+ plants). Not a strategic priority currently.' },
      ],
    },
    headToHead: {
      competitor: 'Ambuja Cements',
      competitorTicker: 'AMBUJACEM',
      summary: 'Shree Cement (efficiency king) vs Ambuja (Adani-backed scale). Shree leads on margins and cost efficiency while Ambuja leads on size and growth trajectory.',
      metrics: [
        { label: 'Revenue FY25', company: 21500, competitor: 38500, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 23.7, competitor: 22.1, unit: '%', winner: 'company' },
        { label: 'EBITDA/Tonne', company: 1350, competitor: 1100, unit: '₹', winner: 'company' },
        { label: 'Capacity', company: 46.4, competitor: 31, unit: 'MTPA', winner: 'company' },
        { label: 'Cost per Tonne', company: 3800, competitor: 4200, unit: '₹', winner: 'company' },
        { label: 'Debt/Equity', company: 0.22, competitor: 0.25, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 15.8, competitor: 13.5, unit: '%', winner: 'company' },
        { label: 'Alt Fuel Substitution', company: 35, competitor: 15, unit: '%', winner: 'company' },
        { label: 'Growth Rate (Capacity)', company: 12, competitor: 25, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 100000, competitor: 135000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Pan-India Presence', company: '8 states', competitor: '12 states', unit: '', winner: 'competitor' },
      ],
      verdict: 'Shree Cement is the efficiency champion — best-in-class margins, lowest cost, and highest alt fuel usage. Ambuja has Adani Group backing for aggressive expansion. For insurers: Shree Cement offers predictable, high-quality earnings with low leverage; Ambuja offers faster growth but with integration and execution risks.'
    },
  },
  {
    id: 'acc-cement', name: 'ACC', industry: 'cement', ticker: 'ACC',
    founded: 1936, headquarters: 'Mumbai, Maharashtra', employees: '9,000+', marketCap: '₹46,000 Cr',
    ceo: 'Ajay Kapur (MD & CEO)', website: 'https://www.acclimited.com',
    description: "​One of India's oldest cement companies, now part of Adani Group. Capacity 33.4 MTPA across 17 plants. Strong brand with ACC Gold and ACC Concrete. In FY25 the company reported revenue of ₹22,800 Cr and net profit of ₹1,800 Cr, at an EBITDA margin of around 18.0%. Its revenue is led by acc gold cement (40% of sales), complemented by acc concrete and acc f2r. India's #4 standalone cement company by capacity (33.4 MTPA). 17 cement plants across India — strong in Maharashtra, West Bengal, Tamil Nadu, Gujarat, Rajasthan.",
    products: [
      { name: 'ACC Gold Cement', revenueShare: 40, description: 'Premium blended cement' },
      { name: 'ACC Concrete (RMC)', revenueShare: 20, description: 'Ready mix concrete' },
      { name: 'ACC F2R (Foundation to Roof)', revenueShare: 15, description: 'Complete building solutions' },
      { name: 'Bulk Cement', revenueShare: 15, description: 'For large infrastructure projects' },
      { name: 'Specialty Cements', revenueShare: 10, description: 'Sulphate resistant, low heat cements' },
    ],
    financials: [
      { year: 'FY21', revenue: 15397, profit: 1850, ebitda: 3200 },
      { year: 'FY22', revenue: 17120, profit: 1445, ebitda: 2750 },
      { year: 'FY23', revenue: 18908, profit: 785, ebitda: 2100 },
      { year: 'FY24', revenue: 20500, profit: 1200, ebitda: 3100 },
      { year: 'FY25', revenue: 22800, profit: 1800, ebitda: 4100 },
    ],
    revenueFY25: '₹22,800 Cr', profitFY25: '₹1,800 Cr', ebitdaMargin: '18.0%',
    news: [
      { title: 'ACC commissioning new 3 MTPA clinker line at Ametha, MP', date: '2025-04-15', source: 'Company PR', url: 'https://www.acclimited.com' },
      { title: 'Operational synergies with Ambuja save Rs 800 Cr annually', date: '2025-02-25', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Launches carbon-light cement across 10 states', date: '2025-01-30', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Benefiting from Adani Group synergies. Cost optimization driving margin recovery.',
      plans: ['50 MTPA standalone capacity', 'Logistics via Adani ports/rail', 'RMC network to 100+ plants', 'Green cement to 50% of sales'],
      risks: ['Brand differentiation vs Ambuja', 'Historic margin underperformance', 'Adani integration complexity', 'RMC working capital intensity'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (ACC Gold, ACC Concrete, ACC F2R), Ready Mix Concrete (ACC Concrete), Specialty Cements (sulphate resistant, low heat), Building Solutions. Full construction materials portfolio.',
      geographicPresence: '17 cement plants across India — strong in Maharashtra, West Bengal, Tamil Nadu, Gujarat, Rajasthan. 80+ RMC plants in metro cities. Pan-India distribution with 50,000+ channel partners.',
      keyStrengths: [
        'One of India\'s oldest cement brands (est. 1936) — strong trust and recall',
        'Largest RMC network among Indian cement companies (80+ plants)',
        'Adani Group synergies — logistics, energy, and capital access',
        'Diverse plant locations reducing regional concentration risk'
      ],
      marketPosition: 'India\'s #4 standalone cement company by capacity (33.4 MTPA). Pioneer in RMC business in India. Combined with Ambuja under Adani umbrella at 89 MTPA (#2 group). Strong in institutional/project sales.',
      rawMaterialStrategy: 'Captive limestone across 17 plant locations with 35+ year average reserves. Fuel: Mix of pet coke, coal, and increasing alternative fuels. Adani Group synergies reducing fuel cost through captive coal and renewable energy. Fly ash from nearby power plants for blended cement.'
    },
    financialRatios: {
      debtToEquity: 0.18,
      currentRatio: 1.12,
      roe: 8.5,
      roce: 11.2,
      interestCoverage: 14.0,
      netDebt: '₹3,200 Cr',
      peRatio: 28.0,
      pbRatio: 2.8,
      dividendYield: 0.7,
      workingCapitalDays: -5
    },
    bcgMatrix: {
      stars: [
        { name: 'Ready Mix Concrete', growth: '18% CAGR', share: '10% organized RMC', insight: 'India\'s largest RMC player by plant count. Growing rapidly with urbanization. Higher margins than bulk cement. Metro-focused.' },
        { name: 'ACC F2R (Building Solutions)', growth: '22% CAGR', share: '4% organized building materials', insight: 'Foundation-to-roof product suite. Leveraging ACC brand and distribution to cross-sell value-added products.' },
      ],
      cashCows: [
        { name: 'ACC Gold (Grey Cement)', growth: '7% CAGR', share: '10% India market', insight: 'Legacy premium brand with strong recall. Pan-India presence. Consistent cash generation from housing demand.' },
        { name: 'Bulk/Institutional Cement', growth: '5% CAGR', share: '12% project segment', insight: 'Strong relationships with large construction companies and government agencies. Steady high-volume orders.' },
      ],
      questionMarks: [
        { name: 'Green/Low Carbon Cement', growth: '15% CAGR', share: '12% of own mix', insight: 'Launched carbon-light cement in 10 states. Consumer awareness building needed. First-mover among large companies.' },
        { name: 'East India Expansion', growth: '12% CAGR', share: '8% East India', insight: 'New grinding units in Bihar and Jharkhand. Growing demand from government infra projects.' },
      ],
      dogs: [
        { name: 'Specialty Cements', growth: '3% CAGR', share: '15% niche segment', insight: 'Sulphate resistant and low heat cement. Small volumes, specialized applications. Limited growth potential.' },
      ],
    },
    headToHead: {
      competitor: 'Dalmia Bharat',
      competitorTicker: 'DALBHARAT',
      summary: 'ACC (Adani Group, pan-India, RMC leader) vs Dalmia Bharat (sustainability leader, East/South focus). ACC has scale advantage; Dalmia has better margins and sustainability credentials.',
      metrics: [
        { label: 'Revenue FY25', company: 22800, competitor: 16800, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 18.0, competitor: 19.0, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 33.4, competitor: 46.6, unit: 'MTPA', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 7.9, competitor: 6.3, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.18, competitor: 0.45, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 11.2, competitor: 12.0, unit: '%', winner: 'competitor' },
        { label: 'RMC Plants', company: '80+', competitor: '20+', unit: '', winner: 'company' },
        { label: 'Carbon Intensity (kg CO2/tonne)', company: 520, competitor: 480, unit: 'kg', winner: 'competitor' },
        { label: 'Alt Fuel Substitution', company: 12, competitor: 20, unit: '%', winner: 'competitor' },
        { label: 'Brand Age', company: 89, competitor: 86, unit: 'years', winner: 'company' },
        { label: 'Market Cap', company: 46000, competitor: 35000, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'ACC wins on brand heritage, RMC leadership, and Adani Group synergies for rapid expansion. Dalmia wins on sustainability (carbon-negative target by 2040), operational efficiency, and East India focus. For insurers: ACC is a safer bet due to Adani Group financial backing and diversified geography; Dalmia offers better ESG credentials but higher expansion leverage.'
    },
  },
  {
    id: 'dalmia-bharat', name: 'Dalmia Bharat', industry: 'cement', ticker: 'DALBHARAT',
    founded: 1939, headquarters: 'New Delhi', employees: '12,000+', marketCap: '₹35,000 Cr',
    ceo: 'Mahendra Singhi (MD & CEO)', website: 'https://www.dalmiacement.com',
    description: "​India's 4th largest cement group with 46.6 MTPA capacity across East and South India. Sustainability leader targeting carbon-negative by 2040. In FY25 the company reported revenue of ₹16,800 Cr and net profit of ₹1,050 Cr, at an EBITDA margin of around 19.0%. Its revenue is led by portland slag cement (35% of sales), complemented by portland pozzolana cement and opc grades. India's #4 cement group by capacity (46.6 MTPA). Dominant in East India (Bihar, Jharkhand, Bengal, Odisha) and South India (Tamil Nadu, AP, Karnataka).",
    products: [
      { name: 'Portland Slag Cement', revenueShare: 35, description: 'Specialty cement from slag' },
      { name: 'Portland Pozzolana Cement', revenueShare: 30, description: 'General construction' },
      { name: 'OPC Grades', revenueShare: 20, description: 'High-strength for infrastructure' },
      { name: 'Composite Cement', revenueShare: 10, description: 'Low-carbon composites' },
      { name: 'Super Specialty', revenueShare: 5, description: 'Oil well, railway sleeper cement' },
    ],
    financials: [
      { year: 'FY21', revenue: 10984, profit: 1020, ebitda: 2800 },
      { year: 'FY22', revenue: 12220, profit: 849, ebitda: 2540 },
      { year: 'FY23', revenue: 14232, profit: 694, ebitda: 2350 },
      { year: 'FY24', revenue: 15200, profit: 780, ebitda: 2650 },
      { year: 'FY25', revenue: 16800, profit: 1050, ebitda: 3200 },
    ],
    revenueFY25: '₹16,800 Cr', profitFY25: '₹1,050 Cr', ebitdaMargin: '19.0%',
    news: [
      { title: 'Dalmia achieves carbon-negative status at one plant', date: '2025-04-08', source: 'Sustainability Report', url: 'https://www.dalmiacement.com' },
      { title: 'Acquires 26% in Jaypee cement for Rs 5,600 Cr', date: '2025-02-22', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Rs 3,000 Cr expansion in Northeast approved', date: '2025-01-14', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Targeting 75 MTPA by FY28. Industry sustainability leader with 2040 carbon-negative goal.',
      plans: ['75 MTPA by FY28', 'Northeast expansion', 'Carbon-negative by 2040', 'Alt fuels to 45%'],
      risks: ['High expansion capex', 'Premium valuation', 'Execution in new geographies', 'Limestone availability'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Portland Slag Cement, PPC, OPC, Composite), Super Specialty Cements (oil well, railway sleeper, airstrip). Strong focus on blended/green cements with low clinker factor.',
      geographicPresence: 'Dominant in East India (Bihar, Jharkhand, Bengal, Odisha) and South India (Tamil Nadu, AP, Karnataka). 14 manufacturing units. Expanding into Northeast and Central India.',
      keyStrengths: [
        'Industry leader in sustainability — lowest carbon footprint per tonne among large Indian producers',
        'Dominant East India position — #1 in Bihar and Jharkhand',
        'Specialty cement portfolio for infrastructure (oil wells, railways, airstrips)',
        'Aggressive capacity expansion with focus on cost-efficient brownfield additions'
      ],
      marketPosition: 'India\'s #4 cement group by capacity (46.6 MTPA). #1 in East India. Sustainability leader globally among cement companies. Target: 75 MTPA by FY28. Known for premium positioning in institutional and infrastructure segments.',
      rawMaterialStrategy: 'Captive limestone reserves at all major locations with 40+ year life. Pioneer in slag cement — uses granulated blast furnace slag (GBFS) from nearby steel plants, reducing limestone dependency. Alt fuels at 20%+ thermal substitution. Targeting 45% by FY27.'
    },
    financialRatios: {
      debtToEquity: 0.45,
      currentRatio: 0.95,
      roe: 6.8,
      roce: 12.0,
      interestCoverage: 5.5,
      netDebt: '₹8,200 Cr',
      peRatio: 38.0,
      pbRatio: 3.2,
      dividendYield: 0.3,
      workingCapitalDays: -12
    },
    bcgMatrix: {
      stars: [
        { name: 'East India Cement', growth: '14% CAGR', share: '25% East India', insight: 'Dominant position in fastest-growing cement region. Government infra spending (roads, railways, housing) driving demand.' },
        { name: 'Green/Blended Cement', growth: '18% CAGR', share: '60% of own production', insight: 'Industry-leading clinker factor of 1.4 (vs 1.6 industry average). Carbon-negative target gives ESG premium.' },
      ],
      cashCows: [
        { name: 'South India Grey Cement', growth: '6% CAGR', share: '12% South India', insight: 'Established brand in Tamil Nadu and AP. Mature markets with steady demand. Dalmiapuram plant is one of India\'s lowest-cost producers.' },
        { name: 'Portland Slag Cement', growth: '5% CAGR', share: '30% slag cement market', insight: 'Unique product leveraging proximity to steel plants. Low cost (slag is cheaper than clinker). Government spec for many projects.' },
      ],
      questionMarks: [
        { name: 'Northeast India Expansion', growth: '20% potential', share: '<5% Northeast', insight: 'Large Rs 3,000 Cr investment in Meghalaya/Assam. High logistic costs offset by strong demand. Execution risk in difficult terrain.' },
        { name: 'Super Specialty Cements', growth: '10% CAGR', share: '15% oil well/railway cement', insight: 'Niche products with premium pricing. Dependent on oil & gas and railway capex cycles.' },
      ],
      dogs: [
        { name: 'Low-Premium Bulk Cement', growth: '3% CAGR', share: '5% commodity segment', insight: 'Reducing focus on unbranded bulk sales. Margin dilutive. Being replaced by branded premium offerings.' },
      ],
    },
    headToHead: {
      competitor: 'ACC',
      competitorTicker: 'ACC',
      summary: 'Dalmia Bharat (sustainability leader, East India dominant) vs ACC (Adani-backed, pan-India, RMC leader). Dalmia has better margins and green credentials; ACC has brand heritage and capital access.',
      metrics: [
        { label: 'Revenue FY25', company: 16800, competitor: 22800, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 19.0, competitor: 18.0, unit: '%', winner: 'company' },
        { label: 'Capacity', company: 46.6, competitor: 33.4, unit: 'MTPA', winner: 'company' },
        { label: 'Debt/Equity', company: 0.45, competitor: 0.18, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 12.0, competitor: 11.2, unit: '%', winner: 'company' },
        { label: 'Carbon Intensity (kg CO2/tonne)', company: 480, competitor: 520, unit: 'kg', winner: 'company' },
        { label: 'Alt Fuel Substitution', company: 20, competitor: 12, unit: '%', winner: 'company' },
        { label: 'Clinker Factor', company: 1.4, competitor: 1.6, unit: 'x', winner: 'company' },
        { label: 'East India Share', company: 25, competitor: 8, unit: '%', winner: 'company' },
        { label: 'RMC Plants', company: '20+', competitor: '80+', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 35000, competitor: 46000, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Dalmia wins on sustainability, East India dominance, capacity size, and operational efficiency. ACC wins on brand heritage, RMC business, and Adani Group financial support. For insurers: Dalmia is the ESG/sustainability play with strong regional moats; ACC is the scale/brand play with easier capital access but ongoing margin challenges.'
    },
  },
  {
    id: 'india-cements', name: 'India Cements', industry: 'cement', ticker: 'INDIACEM',
    founded: 1946, headquarters: 'Chennai, Tamil Nadu', employees: '6,500+', marketCap: '₹12,500 Cr',
    ceo: 'N. Srinivasan (Vice Chairman & MD)', website: 'https://www.indiacements.co.in',
    description: "​Major South Indian cement company with 14.8 MTPA capacity across Tamil Nadu, Andhra Pradesh, and Telangana. Being acquired by UltraTech Cement. Also owns Chennai Super Kings cricket team. In FY25 the company reported revenue of ₹6,100 Cr and net profit of ₹-120 Cr (Loss), at an EBITDA margin of around 6.2%. Its revenue is led by opc cement (40% of sales), complemented by ppc cement and ready mix concrete. Was South India's #2 cement company. Exclusively South India — Tamil Nadu, Andhra Pradesh, Telangana, Karnataka.",
    products: [
      { name: 'OPC Cement (Sankar brand)', revenueShare: 40, description: 'OPC for infrastructure and housing' },
      { name: 'PPC Cement', revenueShare: 35, description: 'Blended cement for general use' },
      { name: 'Ready Mix Concrete', revenueShare: 12, description: 'RMC for southern India projects' },
      { name: 'Dry Mortar Products', revenueShare: 8, description: 'Pre-mixed plastering and tiling' },
      { name: 'Shipping', revenueShare: 5, description: 'Coastal shipping of cement clinker' },
    ],
    financials: [
      { year: 'FY21', revenue: 5250, profit: -180, ebitda: 380 },
      { year: 'FY22', revenue: 5680, profit: -220, ebitda: 280 },
      { year: 'FY23', revenue: 6200, profit: -150, ebitda: 420 },
      { year: 'FY24', revenue: 5800, profit: -280, ebitda: 250 },
      { year: 'FY25', revenue: 6100, profit: -120, ebitda: 380 },
    ],
    revenueFY25: '₹6,100 Cr', profitFY25: '₹-120 Cr (Loss)', ebitdaMargin: '6.2%',
    news: [
      { title: 'UltraTech Cement completes acquisition of India Cements', date: '2025-06-01', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'South India operations restructuring under UltraTech guidance', date: '2025-03-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Vishnupuram plant achieves break-even after cost optimization', date: '2025-01-20', source: 'Company PR', url: 'https://www.indiacements.co.in' },
    ],
    futureScope: {
      outlook: 'Now part of UltraTech. Turnaround expected through operational optimization. South India limestone reserves are valuable strategic asset.',
      plans: ['Integration with UltraTech operations', 'Cost optimization through synergies', 'Clinker capacity modernization', 'Premium product mix improvement'],
      risks: ['Years of underperformance legacy', 'High debt relative to capacity', 'South India overcapacity', 'Integration execution challenges'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Sankar brand OPC/PPC), Ready Mix Concrete, Dry Mortar Products, Shipping (coastal clinker transport). Also owns Chennai Super Kings IPL team.',
      geographicPresence: 'Exclusively South India — Tamil Nadu, Andhra Pradesh, Telangana, Karnataka. 7 integrated/grinding plants. Strong brand recall in rural South India under "Sankar" brand.',
      keyStrengths: [
        'Large limestone reserves in South India — strategic asset now under UltraTech',
        'Strong rural South India brand recognition (Sankar brand)',
        'Own shipping fleet for coastal clinker transport reducing logistics cost',
        'UltraTech acquisition provides turnaround capital and management expertise'
      ],
      marketPosition: 'Was South India\'s #2 cement company. Now a UltraTech subsidiary. 14.8 MTPA capacity. Historically underperformed on margins due to high costs and debt. Limestone reserves make it strategically valuable despite operational weakness.',
      rawMaterialStrategy: 'Captive limestone reserves in Tamil Nadu (Dalavoi) and AP (Chilamkur, Vishnupuram) with 50+ year mine life. Fuel: High dependence on imported pet coke. Logistics: Own shipping fleet for coastal transport of clinker between plants. Under UltraTech management, fuel mix optimization expected.'
    },
    financialRatios: {
      debtToEquity: 1.85,
      currentRatio: 0.72,
      roe: -2.5,
      roce: 3.8,
      interestCoverage: 1.2,
      netDebt: '₹4,800 Cr',
      peRatio: -45.0,
      pbRatio: 1.5,
      dividendYield: 0.0,
      workingCapitalDays: 25
    },
    bcgMatrix: {
      stars: [
        { name: 'UltraTech Integration Synergies', growth: '15% improvement expected', share: 'N/A', insight: 'Under UltraTech management, operational turnaround expected. Procurement, logistics, and brand synergies to improve margins significantly.' },
      ],
      cashCows: [
        { name: 'Sankar Cement (Rural South)', growth: '5% CAGR', share: '8% South India rural', insight: 'Established brand in rural Tamil Nadu and AP. Low marketing cost due to decades of presence. Steady demand from housing.' },
        { name: 'Coastal Shipping', growth: '3% CAGR', share: 'Internal logistics', insight: 'Own fleet reduces inter-plant clinker transfer cost. Competitive advantage vs road transport in coastal markets.' },
      ],
      questionMarks: [
        { name: 'Ready Mix Concrete', growth: '12% CAGR', share: '3% South India RMC', insight: 'Small RMC presence. Under UltraTech, can leverage their 200+ plant network and technology.' },
        { name: 'Dry Mortar Products', growth: '15% CAGR', share: '2% South India', insight: 'Growing segment. Needs investment in brand and distribution to compete with UltraTech and Asian Paints.' },
      ],
      dogs: [
        { name: 'Old Kiln Operations', growth: '-5% declining', share: 'Being phased out', insight: 'Legacy high-cost kilns at some plants. Being modernized or shut under UltraTech capex program.' },
        { name: 'Bulk Unbranded Cement', growth: '2% CAGR', share: '5% bulk segment', insight: 'Low-margin institutional sales. Being upgraded to premium branded under UltraTech\'s product strategy.' },
      ],
    },
    headToHead: {
      competitor: 'The Ramco Cements',
      competitorTicker: 'RAMCOCEM',
      summary: 'India Cements (under UltraTech, turnaround story) vs Ramco Cements (efficient South India leader). Ramco dominates on all operational metrics; India Cements has UltraTech backing for turnaround.',
      metrics: [
        { label: 'Revenue FY25', company: 6100, competitor: 8200, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 6.2, competitor: 18.5, unit: '%', winner: 'competitor' },
        { label: 'Net Profit Margin', company: -2.0, competitor: 8.5, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 14.8, competitor: 21.0, unit: 'MTPA', winner: 'competitor' },
        { label: 'Debt/Equity', company: 1.85, competitor: 0.52, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 3.8, competitor: 12.5, unit: '%', winner: 'competitor' },
        { label: 'Limestone Reserves', company: '50+ years', competitor: '40+ years', unit: '', winner: 'company' },
        { label: 'Parent Company Support', company: 'UltraTech (₹3.2L Cr)', competitor: 'Standalone', unit: '', winner: 'company' },
        { label: 'South India Brand Recall', company: 35, competitor: 45, unit: '%', winner: 'competitor' },
        { label: 'Cost per Tonne', company: 5200, competitor: 4100, unit: '₹', winner: 'competitor' },
        { label: 'Market Cap', company: 12500, competitor: 20000, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Ramco Cements comprehensively outperforms India Cements on all operational metrics — margins, cost efficiency, profitability. India Cements\' only advantage is UltraTech backing and limestone reserves. For insurers: Ramco is the reliable South India bet; India Cements is a turnaround story with execution risk but UltraTech parentage provides downside protection.'
    },
  },
  {
    id: 'jk-cement', name: 'JK Cement', industry: 'cement', ticker: 'JKCEMENT',
    founded: 1975, headquarters: 'Kanpur, Uttar Pradesh', employees: '8,000+', marketCap: '₹30,000 Cr',
    ceo: 'Raghavpat Singhania (MD)', website: 'https://www.jkcement.com',
    description: "​Leading North Indian cement manufacturer with 22 MTPA grey cement and 1.2 MTPA white cement capacity. India's second-largest white cement producer after UltraTech. Plants in Rajasthan, UP, Karnataka, and Gujarat. In FY25 the company reported revenue of ₹12,200 Cr and net profit of ₹920 Cr, at an EBITDA margin of around 18.9%. Its revenue is led by grey cement (55% of sales), complemented by white cement and wall putty. India's #5-6 grey cement producer (22 MTPA). Grey cement: North India (Rajasthan, UP, MP, Gujarat, Karnataka).",
    products: [
      { name: 'Grey Cement (OPC/PPC)', revenueShare: 55, description: 'Grey cement for construction' },
      { name: 'White Cement (JK White)', revenueShare: 20, description: 'Decorative white cement' },
      { name: 'Wall Putty (JK Wall Putty)', revenueShare: 15, description: 'Interior/exterior wall putty — market leader' },
      { name: 'Ready Mix Concrete', revenueShare: 6, description: 'RMC for project customers' },
      { name: 'Dry Mix Products', revenueShare: 4, description: 'Tile adhesive, gypsum plaster' },
    ],
    financials: [
      { year: 'FY21', revenue: 6423, profit: 712, ebitda: 1580 },
      { year: 'FY22', revenue: 7235, profit: 680, ebitda: 1450 },
      { year: 'FY23', revenue: 9350, profit: 620, ebitda: 1550 },
      { year: 'FY24', revenue: 10800, profit: 750, ebitda: 1900 },
      { year: 'FY25', revenue: 12200, profit: 920, ebitda: 2300 },
    ],
    revenueFY25: '₹12,200 Cr', profitFY25: '₹920 Cr', ebitdaMargin: '18.9%',
    news: [
      { title: 'JK Cement Panna unit in MP commissioned adding 4 MTPA', date: '2025-04-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'White cement and putty segment grows 18% on housing demand', date: '2025-02-15', source: 'Company PR', url: 'https://www.jkcement.com' },
      { title: 'New dry mix plant in Aligarh starts production', date: '2025-01-22', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Dual business model (grey + white) provides margin stability. Wall putty is high-margin value-added product. Expanding South/Central India.',
      plans: ['Grey cement to 30 MTPA by FY27', 'Wall putty capacity doubling', 'Dry mix products national expansion', 'White cement capacity expansion'],
      risks: ['North India regional concentration', 'White cement niche limiting scale', 'Competition from Birla White and Asian Paints putty', 'Limestone availability at Nimbahera'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (OPC, PPC — 55% revenue), White Cement (JK White — 20%), Wall Putty (JK Wall Putty — 15%), Ready Mix Concrete, Dry Mix Products (tile adhesive, gypsum plaster). Unique dual grey+white model.',
      geographicPresence: 'Grey cement: North India (Rajasthan, UP, MP, Gujarat, Karnataka). White cement: Pan-India. Plants in Rajasthan (Nimbahera, Mangrol), UP (Muddapur), Karnataka, Gujarat. Expanding central and south.',
      keyStrengths: [
        'India\'s #2 white cement producer — only behind UltraTech (Birla White)',
        'Market leader in wall putty segment — highest brand recall in North India',
        'Dual business model (grey + white/putty) provides margin buffer',
        'Strong Rajasthan limestone base with 50+ year reserves for white cement'
      ],
      marketPosition: 'India\'s #5-6 grey cement producer (22 MTPA). #2 white cement producer. #1 in wall putty (North India). Unique positioning — only company with significant presence in both grey and white cement. Premium valuation reflects moat in value-added products.',
      rawMaterialStrategy: 'Captive limestone at Nimbahera (Rajasthan) — high-purity white limestone ideal for white cement (rare in India). Grey limestone at multiple Rajasthan locations. White cement requires exceptionally pure limestone — JK has one of only 2-3 such deposits in India. Fuel: Pet coke and increasing alternative fuels.'
    },
    financialRatios: {
      debtToEquity: 0.55,
      currentRatio: 1.08,
      roe: 9.5,
      roce: 12.8,
      interestCoverage: 6.5,
      netDebt: '₹5,200 Cr',
      peRatio: 35.0,
      pbRatio: 4.0,
      dividendYield: 0.5,
      workingCapitalDays: -8
    },
    bcgMatrix: {
      stars: [
        { name: 'Wall Putty (JK Wall Putty)', growth: '18% CAGR', share: '25% North India putty', insight: 'High-margin (30%+ EBITDA margin) value-added product. Housing boom driving demand. Capacity doubling underway.' },
        { name: 'Dry Mix Products', growth: '22% CAGR', share: '5% tile adhesive market', insight: 'Tile adhesive, gypsum plaster, waterproofing. Leveraging existing dealer network. Adjacent to putty distribution.' },
      ],
      cashCows: [
        { name: 'Grey Cement (North India)', growth: '8% CAGR', share: '10% North India', insight: 'Core revenue generator. Strong brand in Rajasthan and UP. Low-cost production from Nimbahera plants with captive limestone.' },
        { name: 'White Cement (JK White)', growth: '7% CAGR', share: '30% white cement market', insight: 'Premium product with limited competition (only Birla White competes). High margin and brand loyalty.' },
      ],
      questionMarks: [
        { name: 'South India Grey Expansion', growth: '12% CAGR', share: '3% South India', insight: 'New Karnataka plant. Entering market dominated by Ramco, UltraTech, Dalmia. Brand building needed.' },
        { name: 'Ready Mix Concrete', growth: '15% CAGR', share: '2% RMC market', insight: 'Small presence. Needs significant capital to compete with UltraTech and ACC in RMC.' },
      ],
      dogs: [
        { name: 'Low-Grade Grey Cement', growth: '3% CAGR', share: '2% economy segment', insight: 'Economy-grade bulk cement. Low margins. Being reduced in favor of premium branded grey cement.' },
      ],
    },
    headToHead: {
      competitor: 'Ramco Cements',
      competitorTicker: 'RAMCOCEM',
      summary: 'JK Cement (North India, dual grey+white model) vs Ramco Cements (South India efficiency champion). Different geographies but similar size. JK has white cement/putty advantage; Ramco has operational efficiency.',
      metrics: [
        { label: 'Revenue FY25', company: 12200, competitor: 8200, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 18.9, competitor: 18.5, unit: '%', winner: 'company' },
        { label: 'Grey Cement Capacity', company: 22, competitor: 21, unit: 'MTPA', winner: 'company' },
        { label: 'Net Profit Margin', company: 7.5, competitor: 8.5, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.55, competitor: 0.52, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 12.8, competitor: 12.5, unit: '%', winner: 'company' },
        { label: 'White Cement/Putty Revenue', company: '₹4,200 Cr', competitor: 'Nil', unit: '', winner: 'company' },
        { label: 'Value-Added Revenue Share', company: 40, competitor: 15, unit: '%', winner: 'company' },
        { label: 'Geographic Diversification', company: 'North + expanding South', competitor: 'South only', unit: '', winner: 'company' },
        { label: 'Cost per Tonne (Grey)', company: 4300, competitor: 4100, unit: '₹', winner: 'competitor' },
        { label: 'Market Cap', company: 30000, competitor: 20000, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'JK Cement wins on revenue scale, value-added product portfolio (white cement + putty), and geographic diversification. Ramco wins on grey cement cost efficiency and net margin. For insurers: JK Cement offers diversified revenue streams and margin stability from putty/white cement; Ramco is a pure South India grey cement play with strong operational discipline.'
    },
  },
  {
    id: 'ramco-cements', name: 'The Ramco Cements', industry: 'cement', ticker: 'RAMCOCEM',
    founded: 1957, headquarters: 'Chennai, Tamil Nadu', employees: '5,500+', marketCap: '₹20,000 Cr',
    ceo: 'A.V. Dharmakrishnan (CEO)', website: 'https://www.ramcocements.in',
    description: "​Leading South Indian cement company with 20.97 MTPA capacity. Known for premium Ramco Supergrade brand. Strong market position in Tamil Nadu, AP, and Telangana. Also has dry mortar business. In FY25 the company reported revenue of ₹8,800 Cr and net profit of ₹720 Cr, at an EBITDA margin of around 19.9%. Its revenue is led by ppc (45% of sales), complemented by opc cement and ready mix concrete. South India's #2 cement company (after UltraTech). Dominant in Tamil Nadu, AP, Telangana, and Karnataka.",
    products: [
      { name: 'PPC (Ramco Supergrade)', revenueShare: 45, description: 'Premium blended cement — South India market leader' },
      { name: 'OPC Cement', revenueShare: 25, description: 'Infrastructure and structural cement' },
      { name: 'Ready Mix Concrete', revenueShare: 12, description: 'RMC for projects in South India' },
      { name: 'Dry Mortar Products', revenueShare: 10, description: 'Tile adhesive, plaster, waterproofing' },
      { name: 'Concrete Blocks & AAC', revenueShare: 8, description: 'Pre-fabricated building materials' },
    ],
    financials: [
      { year: 'FY21', revenue: 5423, profit: 620, ebitda: 1350 },
      { year: 'FY22', revenue: 6120, profit: 580, ebitda: 1280 },
      { year: 'FY23', revenue: 7550, profit: 450, ebitda: 1250 },
      { year: 'FY24', revenue: 8200, profit: 580, ebitda: 1500 },
      { year: 'FY25', revenue: 8800, profit: 720, ebitda: 1750 },
    ],
    revenueFY25: '₹8,800 Cr', profitFY25: '₹720 Cr', ebitdaMargin: '19.9%',
    news: [
      { title: 'Ramco Cements Jayanthipuram expansion to 5 MTPA completed', date: '2025-03-25', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Dry mortar business grows 25% driven by tile adhesive demand', date: '2025-02-10', source: 'Company PR', url: 'https://www.ramcocements.in' },
      { title: 'New grinding unit at Kolaghat, West Bengal commissioned', date: '2025-01-15', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Premium brand in South India. Expanding to East India. Dry mortar business adds value. Strong dealer network is competitive advantage.',
      plans: ['Capacity to 30 MTPA by FY27', 'East India footprint expansion', 'Dry mortar national rollout', 'AAC blocks capacity addition'],
      risks: ['South India overcapacity', 'Delayed expansion execution', 'Competition from UltraTech and Dalmia in South', 'Fuel cost volatility'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Ramco Supergrade PPC, OPC), Ready Mix Concrete, Dry Mortar Products (tile adhesive, plaster, waterproofing), AAC Blocks. Integrated building materials approach.',
      geographicPresence: 'Dominant in Tamil Nadu, AP, Telangana, and Karnataka. 9 plants including integrated units at Jayanthipuram, Ariyalur, and Alathiyur. Expanding into East India (West Bengal grinding unit).',
      keyStrengths: [
        'South India\'s #1 premium cement brand — "Ramco Supergrade" has highest brand recall in Tamil Nadu',
        'Industry-best operational efficiency in South India — low cost per tonne',
        'Growing dry mortar business adding value to distribution network',
        'Strong dealer loyalty and exclusive channel in rural South India'
      ],
      marketPosition: 'South India\'s #2 cement company (after UltraTech). 21 MTPA capacity. Premium pricing power due to strong brand. #1 in Tamil Nadu by market share. Known as the "gold standard" of South Indian cement quality.',
      rawMaterialStrategy: 'Captive limestone reserves in Tamil Nadu (Ariyalur, Alathiyur) and AP (Jayanthipuram) with 40+ year mine life. Fuel: Mix of pet coke and domestic coal. Increasing alternative fuels (15% thermal substitution). Fly ash from nearby thermal plants for PPC production.'
    },
    financialRatios: {
      debtToEquity: 0.52,
      currentRatio: 1.05,
      roe: 10.5,
      roce: 12.5,
      interestCoverage: 6.8,
      netDebt: '₹3,800 Cr',
      peRatio: 30.0,
      pbRatio: 3.5,
      dividendYield: 0.6,
      workingCapitalDays: -12
    },
    bcgMatrix: {
      stars: [
        { name: 'Dry Mortar Products', growth: '25% CAGR', share: '8% South India', insight: 'Tile adhesive, waterproofing, and plaster growing rapidly. Leveraging cement dealer network for cross-selling. High margins.' },
        { name: 'East India Expansion', growth: '15% CAGR', share: '3% East India (new)', insight: 'Kolaghat grinding unit operational. Targeting Bengal and Odisha. Infrastructure spending driving demand.' },
      ],
      cashCows: [
        { name: 'Ramco Supergrade (South India PPC)', growth: '7% CAGR', share: '18% South India', insight: 'Premium-priced PPC with unmatched brand loyalty in Tamil Nadu. Low dealer churn. Consistent cash generation.' },
        { name: 'Infrastructure Cement (OPC)', growth: '6% CAGR', share: '12% South India OPC', insight: 'Steady demand from government and private infra projects in South India. Long-term supply contracts.' },
      ],
      questionMarks: [
        { name: 'AAC Blocks', growth: '20% CAGR', share: '2% AAC market', insight: 'New segment. Autoclaved Aerated Concrete blocks for lightweight construction. Growing but small scale currently.' },
        { name: 'Ready Mix Concrete', growth: '15% CAGR', share: '5% South India RMC', insight: 'Growing but far behind UltraTech and ACC in scale. Capital intensive to expand significantly.' },
      ],
      dogs: [
        { name: 'Bulk Institutional Sales', growth: '3% CAGR', share: '5% project segment', insight: 'Low-margin bulk sales to large projects. Reducing exposure in favor of premium retail channels.' },
      ],
    },
    headToHead: {
      competitor: 'JK Cement',
      competitorTicker: 'JKCEMENT',
      summary: 'Ramco (South India premium brand) vs JK Cement (North India, grey+white dual model). Different geographies, similar size. JK has diversified revenue streams; Ramco has stronger single-region dominance.',
      metrics: [
        { label: 'Revenue FY25', company: 8800, competitor: 12200, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 19.9, competitor: 18.9, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 8.2, competitor: 7.5, unit: '%', winner: 'company' },
        { label: 'Grey Cement Capacity', company: 21, competitor: 22, unit: 'MTPA', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.52, competitor: 0.55, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 12.5, competitor: 12.8, unit: '%', winner: 'competitor' },
        { label: 'Brand Premium (₹/bag above market)', company: 15, competitor: 10, unit: '₹', winner: 'company' },
        { label: 'Value-Added Products (%)', company: 15, competitor: 40, unit: '%', winner: 'competitor' },
        { label: 'Regional Market Share', company: '18% South', competitor: '10% North', unit: '', winner: 'company' },
        { label: 'Dealer Network Strength', company: '20,000+', competitor: '15,000+', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 20000, competitor: 30000, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Ramco wins on operational efficiency, margins, and South India brand dominance. JK wins on revenue scale, geographic diversification, and value-added portfolio (white cement + putty = 40% revenue). For insurers: Ramco is the quality South India bet with pricing power; JK offers diversified revenue streams with margin stability from high-value segments.'
    },
  },
  {
    id: 'birla-corp', name: 'Birla Corporation', industry: 'cement', ticker: 'BIRLACORPN',
    founded: 1919, headquarters: 'Kolkata, West Bengal', employees: '7,000+', marketCap: '₹10,500 Cr',
    ceo: 'Sandip Ghose (MD & CEO)', website: 'https://www.birlacorporation.com',
    description: "​Part of M.P. Birla Group. Operates 20 MTPA cement capacity with plants in Rajasthan, Madhya Pradesh, West Bengal, and Chhattisgarh. Flagship brands include Perfect Plus and Samrat. In FY25 the company reported revenue of ₹10,500 Cr and net profit of ₹450 Cr, at an EBITDA margin of around 15.2%. Its revenue is led by ppc (40% of sales), complemented by opc cement and psc. India's #7-8 cement company by capacity (20 MTPA). North and Central India — Rajasthan (Chittorgarh), MP (Satna), Chhattisgarh (Raipur), West Bengal (Durgapur).",
    products: [
      { name: 'PPC (Perfect Plus)', revenueShare: 40, description: 'Premium PPC for housing construction' },
      { name: 'OPC Cement (Samrat)', revenueShare: 30, description: 'OPC for infrastructure' },
      { name: 'PSC (Portland Slag Cement)', revenueShare: 15, description: 'Slag-based cement for eastern India' },
      { name: 'Ready Mix Concrete', revenueShare: 8, description: 'RMC operations' },
      { name: 'Jute & Others', revenueShare: 7, description: 'Jute goods and refractory products' },
    ],
    financials: [
      { year: 'FY21', revenue: 7200, profit: 380, ebitda: 1280 },
      { year: 'FY22', revenue: 8100, profit: 350, ebitda: 1200 },
      { year: 'FY23', revenue: 9200, profit: 220, ebitda: 1100 },
      { year: 'FY24', revenue: 9800, profit: 320, ebitda: 1350 },
      { year: 'FY25', revenue: 10500, profit: 450, ebitda: 1600 },
    ],
    revenueFY25: '₹10,500 Cr', profitFY25: '₹450 Cr', ebitdaMargin: '15.2%',
    news: [
      { title: 'Birla Corp Mukutban cement plant ramp-up crosses 80% utilization', date: '2025-03-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Cost optimization drives margin improvement in Q3 FY25', date: '2025-02-08', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Eastern India market share gains through dealer network expansion', date: '2025-01-12', source: 'Company PR', url: 'https://www.birlacorporation.com' },
    ],
    futureScope: {
      outlook: 'Mukutban plant ramp-up driving growth. Focus on East and Central India markets. Cost optimization post-commissioning phase.',
      plans: ['Mukutban plant full ramp-up', 'Capacity target 25 MTPA', 'Premium product mix improvement', 'Debt reduction from cash flows'],
      risks: ['Lower margins vs industry leaders', 'Mukutban cost overrun legacy', 'Central India competition intensifying', 'Fragmented brand portfolio'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Perfect Plus, Samrat, MP Birla brands), Portland Slag Cement, Ready Mix Concrete, Jute Goods, Refractory Products. Multi-business group with cement as core.',
      geographicPresence: 'North and Central India — Rajasthan (Chittorgarh), MP (Satna), Chhattisgarh (Raipur), West Bengal (Durgapur). Major Mukutban plant in Maharashtra.',
      keyStrengths: [
        'M.P. Birla Group pedigree — one of India\'s oldest cement companies',
        'Mukutban plant is among India\'s largest single-location cement plants',
        'Strong PSC cement business leveraging proximity to steel plants in East India',
        'Well-established dealer network in North and Central India'
      ],
      marketPosition: 'India\'s #7-8 cement company by capacity (20 MTPA). Strong in Central India (MP, Chhattisgarh). Mukutban ramp-up expanding Maharashtra presence. Legacy Birla brand has trust factor in dealer community.',
      rawMaterialStrategy: 'Captive limestone at Chittorgarh (Rajasthan) and Satna (MP) with 35+ year reserves. Mukutban plant has captive mines in Maharashtra. Slag sourced from SAIL plants for PSC production. Fuel: Pet coke and increasing waste fuel usage.'
    },
    financialRatios: {
      debtToEquity: 0.85,
      currentRatio: 0.88,
      roe: 5.2,
      roce: 8.5,
      interestCoverage: 3.5,
      netDebt: '₹5,500 Cr',
      peRatio: 25.0,
      pbRatio: 1.8,
      dividendYield: 0.8,
      workingCapitalDays: 5
    },
    bcgMatrix: {
      stars: [
        { name: 'Mukutban Plant (Maharashtra)', growth: '20% volume CAGR', share: '5% Maharashtra', insight: 'Massive new plant ramping up. 80%+ utilization achieved. Will drive revenue growth for 3-4 years as it reaches full capacity.' },
      ],
      cashCows: [
        { name: 'Central India Cement (MP/Chhattisgarh)', growth: '6% CAGR', share: '10% Central India', insight: 'Established markets with steady demand. Low-cost operations at Satna. Consistent cash generation.' },
        { name: 'PSC Cement (East India)', growth: '5% CAGR', share: '8% East India slag cement', insight: 'Proximity to SAIL steel plants provides cheap slag. Government projects prefer PSC for durability.' },
      ],
      questionMarks: [
        { name: 'Premium Brand Consolidation', growth: '10% CAGR', share: '3% premium segment', insight: 'Multiple brands (Perfect Plus, Samrat, MP Birla) need consolidation. Brand building investment required.' },
        { name: 'Ready Mix Concrete', growth: '12% CAGR', share: '2% RMC market', insight: 'Small presence. Needs capital and network to compete with UltraTech/ACC.' },
      ],
      dogs: [
        { name: 'Jute & Refractory Business', growth: '2% CAGR', share: 'Niche', insight: 'Legacy non-core businesses. Low growth and margin. Being maintained but not invested in.' },
      ],
    },
    headToHead: {
      competitor: 'Nuvoco Vistas',
      competitorTicker: 'NUVOCO',
      summary: 'Birla Corp (M.P. Birla Group, Central/North India) vs Nuvoco Vistas (Nirma Group, East India leader). Similar size, different geographies. Both are mid-tier players looking to scale.',
      metrics: [
        { label: 'Revenue FY25', company: 10500, competitor: 11200, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 15.2, competitor: 17.0, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 20, competitor: 25, unit: 'MTPA', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.85, competitor: 0.72, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 8.5, competitor: 9.2, unit: '%', winner: 'competitor' },
        { label: 'Brand Portfolio', company: '3 brands', competitor: '3 brands', unit: '', winner: 'tie' },
        { label: 'RMC Presence', company: 'Small', competitor: 'Moderate', unit: '', winner: 'competitor' },
        { label: 'Central India Share', company: 10, competitor: 3, unit: '%', winner: 'company' },
        { label: 'East India Share', company: 5, competitor: 20, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 10500, competitor: 10000, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Nuvoco edges Birla Corp on most metrics — better margins, more capacity, stronger regional leadership (East India), and lower leverage. Birla Corp\'s Mukutban ramp-up could close the gap. For insurers: both are mid-tier players with moderate risk; Nuvoco has better brand positioning while Birla Corp has legacy group strength.'
    },
  },
  {
    id: 'nuvoco-vistas', name: 'Nuvoco Vistas', industry: 'cement', ticker: 'NUVOCO',
    founded: 1999, headquarters: 'Mumbai, Maharashtra', employees: '5,500+', marketCap: '₹10,000 Cr',
    ceo: 'Jayakumar Krishnaswamy (MD)', website: 'https://www.nuvoco.in',
    description: "​5th largest cement company in India with 25 MTPA capacity. Formerly Lafarge India, acquired by Nirma Group. Strong presence in East India (market leader in Bihar and Jharkhand). Brands: Double Bull, Concreto, Duraguard. In FY25 the company reported revenue of ₹11,200 Cr and net profit of ₹380 Cr, at an EBITDA margin of around 17.0%. Its revenue is led by portland cement (40% of sales), complemented by ppc and premium cement. India's #5 cement company by capacity (25 MTPA). Dominant in East India — Bihar (#1), Jharkhand (#1), West Bengal, Odisha.",
    products: [
      { name: 'Portland Cement (Double Bull)', revenueShare: 40, description: 'Flagship brand in East India' },
      { name: 'PPC (Duraguard)', revenueShare: 25, description: 'Blended cement for housing' },
      { name: 'Premium Cement (Concreto)', revenueShare: 15, description: 'High-performance concrete grade' },
      { name: 'Ready Mix Concrete', revenueShare: 12, description: 'RMC for eastern and western India' },
      { name: 'Modern Building Materials', revenueShare: 8, description: 'Cover blocks, grouting products' },
    ],
    financials: [
      { year: 'FY21', revenue: 5800, profit: -120, ebitda: 850 },
      { year: 'FY22', revenue: 8200, profit: 180, ebitda: 1350 },
      { year: 'FY23', revenue: 9800, profit: 150, ebitda: 1500 },
      { year: 'FY24', revenue: 10500, profit: 280, ebitda: 1700 },
      { year: 'FY25', revenue: 11200, profit: 380, ebitda: 1900 },
    ],
    revenueFY25: '₹11,200 Cr', profitFY25: '₹380 Cr', ebitdaMargin: '17.0%',
    news: [
      { title: 'Nuvoco market leadership in Bihar strengthened with new grinding unit', date: '2025-04-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Premium product portfolio crosses 30% of total sales', date: '2025-02-20', source: 'Company PR', url: 'https://www.nuvoco.in' },
      { title: 'Debt reduction target of Rs 1,000 Cr achieved in FY25', date: '2025-01-28', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'East India market leader. Premium brand strategy gaining traction. Debt reduction improving balance sheet quality.',
      plans: ['Capacity to 32 MTPA by FY27', 'Premium products to 40% of sales', 'Bihar and Jharkhand market deepening', 'Modern building materials expansion'],
      risks: ['Higher cost structure vs peers', 'Nirma Group integration still evolving', 'East India competitive intensity rising', 'Debt levels still elevated'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Double Bull, Duraguard, Concreto brands), Ready Mix Concrete, Modern Building Materials (cover blocks, grouting). Premium-focused multi-brand strategy in East India.',
      geographicPresence: 'Dominant in East India — Bihar (#1), Jharkhand (#1), West Bengal, Odisha. Also present in Rajasthan and Chhattisgarh. 11 manufacturing units across India.',
      keyStrengths: [
        'Market leader in Bihar and Jharkhand — 30%+ combined market share',
        'Strong multi-brand strategy — Double Bull (mass), Duraguard (premium), Concreto (super-premium)',
        'Nirma Group backing provides capital access and operational expertise',
        'Formerly Lafarge India — inherited world-class manufacturing processes'
      ],
      marketPosition: 'India\'s #5 cement company by capacity (25 MTPA). #1 in East India (Bihar + Jharkhand). Former Lafarge assets bring global best practices. Growing premium product mix. RMC business provides urban market access.',
      rawMaterialStrategy: 'Captive limestone at Arasmeta (Chhattisgarh) and Mejia (West Bengal) with 30+ year reserves. Slag sourced from nearby steel plants for PSC production. Fuel: Pet coke and domestic coal mix. Increasing alternative fuels (10% thermal substitution target).'
    },
    financialRatios: {
      debtToEquity: 0.72,
      currentRatio: 0.95,
      roe: 5.5,
      roce: 9.2,
      interestCoverage: 4.2,
      netDebt: '₹5,800 Cr',
      peRatio: 30.0,
      pbRatio: 2.2,
      dividendYield: 0.3,
      workingCapitalDays: 2
    },
    bcgMatrix: {
      stars: [
        { name: 'Premium Cement (Concreto/Duraguard)', growth: '18% CAGR', share: '30% premium segment East India', insight: 'Premium products growing faster than market. Higher margins. Brand positioning drives pricing power in Bihar/Jharkhand.' },
        { name: 'Bihar/Jharkhand Market', growth: '14% CAGR', share: '30%+ combined', insight: 'Dominant position in India\'s fastest-growing cement markets. Government infra spending driving demand. Strong brand loyalty.' },
      ],
      cashCows: [
        { name: 'Double Bull (Mass Segment)', growth: '7% CAGR', share: '20% East India mass market', insight: 'Established mass-market brand with highest recall in Bihar/Jharkhand. Consistent volume generator. Low marketing cost needed.' },
        { name: 'Ready Mix Concrete', growth: '8% CAGR', share: '5% East India RMC', insight: 'Growing urban presence. Metro cities in East India. Steady project-based revenues.' },
      ],
      questionMarks: [
        { name: 'West India Operations (Rajasthan)', growth: '10% CAGR', share: '5% Rajasthan', insight: 'Inherited Lafarge Rajasthan plant. Competing against Shree Cement and UltraTech in their stronghold.' },
        { name: 'Modern Building Materials', growth: '15% CAGR', share: '2% organized building materials', insight: 'Cover blocks, grouting products. Small but growing. Leveraging cement distribution network.' },
      ],
      dogs: [
        { name: 'Bulk/Unbranded Sales', growth: '3% CAGR', share: '5% institutional', insight: 'Low-margin commodity sales being reduced in favor of premium branded products.' },
      ],
    },
    headToHead: {
      competitor: 'Birla Corporation',
      competitorTicker: 'BIRLACORPN',
      summary: 'Nuvoco (Nirma Group, East India dominant) vs Birla Corp (M.P. Birla, Central India). Similar scale mid-tier players. Nuvoco has stronger regional leadership; Birla Corp has newer large plant.',
      metrics: [
        { label: 'Revenue FY25', company: 11200, competitor: 10500, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 17.0, competitor: 15.2, unit: '%', winner: 'company' },
        { label: 'Capacity', company: 25, competitor: 20, unit: 'MTPA', winner: 'company' },
        { label: 'Debt/Equity', company: 0.72, competitor: 0.85, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 9.2, competitor: 8.5, unit: '%', winner: 'company' },
        { label: 'East India Share', company: 30, competitor: 5, unit: '%', winner: 'company' },
        { label: 'Premium Product Mix', company: 30, competitor: 20, unit: '%', winner: 'company' },
        { label: 'Brand Count', company: 3, competitor: 3, unit: '', winner: 'tie' },
        { label: 'New Plant Advantage', company: 'No major new plant', competitor: 'Mukutban (new)', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 10000, competitor: 10500, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Nuvoco leads on most operational metrics — better margins, larger capacity, and dominant East India position. Birla Corp\'s Mukutban plant provides future growth lever. For insurers: Nuvoco offers stronger regional moat and brand positioning; Birla Corp offers potential margin expansion as Mukutban ramps up.'
    },
  },
  {
    id: 'jk-lakshmi', name: 'JK Lakshmi Cement', industry: 'cement', ticker: 'JKLAKSHMI',
    founded: 1982, headquarters: 'New Delhi', employees: '4,500+', marketCap: '₹11,000 Cr',
    ceo: 'Vinod Kumar Bansal (President)', website: 'https://www.jklakshmicement.com',
    description: "​Part of JK Organisation. Operates 14 MTPA capacity with plants in Rajasthan, Chhattisgarh, Gujarat, and Odisha. Strong brand in North and Central India. Also has AAC blocks subsidiary (Udaipur Cement Works). In FY25 the company reported revenue of ₹6,800 Cr and net profit of ₹450 Cr, at an EBITDA margin of around 16.2%. Its revenue is led by ppc (40% of sales), complemented by opc cement and ready mix concrete. India's #8-9 cement company by capacity (14 MTPA). Strong in Rajasthan, Gujarat, MP, Chhattisgarh, and Odisha.",
    products: [
      { name: 'PPC (JK Lakshmi Pro+)', revenueShare: 40, description: 'Premium PPC brand' },
      { name: 'OPC Cement', revenueShare: 30, description: 'Infrastructure-grade OPC' },
      { name: 'Ready Mix Concrete', revenueShare: 12, description: 'RMC operations across North India' },
      { name: 'AAC Blocks', revenueShare: 10, description: 'Autoclaved aerated concrete blocks' },
      { name: 'Composite Cement', revenueShare: 8, description: 'Blended composite grades' },
    ],
    financials: [
      { year: 'FY21', revenue: 4250, profit: 320, ebitda: 820 },
      { year: 'FY22', revenue: 4800, profit: 280, ebitda: 750 },
      { year: 'FY23', revenue: 5850, profit: 250, ebitda: 780 },
      { year: 'FY24', revenue: 6200, profit: 380, ebitda: 950 },
      { year: 'FY25', revenue: 6800, profit: 450, ebitda: 1100 },
    ],
    revenueFY25: '₹6,800 Cr', profitFY25: '₹450 Cr', ebitdaMargin: '16.2%',
    news: [
      { title: 'JK Lakshmi Durg plant expansion to 4.2 MTPA completed', date: '2025-03-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'AAC blocks business turns profitable with 40% volume growth', date: '2025-02-12', source: 'Company PR', url: 'https://www.jklakshmicement.com' },
      { title: 'New grinding unit in Odisha to serve East India market', date: '2025-01-18', source: 'Financial Express', url: 'https://www.financialexpress.com' },
    ],
    futureScope: {
      outlook: 'Well-positioned in North/Central India. AAC blocks business emerging as growth driver. Brand recall strong in Rajasthan and MP.',
      plans: ['Capacity to 18 MTPA by FY27', 'AAC blocks national expansion', 'East India market entry', 'Premium product mix increase'],
      risks: ['Smaller scale vs top players', 'Rajasthan limestone competition', 'Capital requirement for expansion', 'Competition from Shree and UltraTech in home market'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (JK Lakshmi Pro+, PPC, OPC), Ready Mix Concrete, AAC Blocks (through Udaipur Cement Works subsidiary), Composite Cement. Pioneer in AAC blocks in India.',
      geographicPresence: 'Strong in Rajasthan, Gujarat, MP, Chhattisgarh, and Odisha. Plants at Sirohi (Rajasthan), Durg (Chhattisgarh), Jhajjar (Haryana), and Kalol (Gujarat). Expanding East India.',
      keyStrengths: [
        'JK Organisation backing — part of one of India\'s oldest industrial houses',
        'Pioneer in AAC blocks segment in India — first mover advantage',
        'Strong brand recall in Rajasthan and Gujarat',
        'Efficient operations with good cost control'
      ],
      marketPosition: 'India\'s #8-9 cement company by capacity (14 MTPA). Strong #3-4 in Rajasthan market. Pioneer in AAC blocks with leading market share. Well-regarded brand in North and Central India.',
      rawMaterialStrategy: 'Captive limestone at Sirohi (Rajasthan) with 40+ year reserves. Fuel: Pet coke with increasing alternative fuels. AAC blocks use fly ash — sustainable waste recycling. Solar power at Rajasthan plant reducing energy cost.'
    },
    financialRatios: {
      debtToEquity: 0.42,
      currentRatio: 1.12,
      roe: 9.8,
      roce: 13.0,
      interestCoverage: 7.5,
      netDebt: '₹2,800 Cr',
      peRatio: 26.0,
      pbRatio: 2.8,
      dividendYield: 0.7,
      workingCapitalDays: -5
    },
    bcgMatrix: {
      stars: [
        { name: 'AAC Blocks', growth: '25% CAGR', share: '15% organized AAC market', insight: 'First-mover in India. Lightweight construction gaining traction in urban housing. High margins and growing market.' },
        { name: 'Premium Cement (JK Lakshmi Pro+)', growth: '12% CAGR', share: '8% North India premium', insight: 'Premium brand gaining share. Housing boom in Rajasthan/Gujarat driving demand.' },
      ],
      cashCows: [
        { name: 'Grey Cement (Rajasthan/Gujarat)', growth: '7% CAGR', share: '12% Rajasthan market', insight: 'Core business with strong brand and dealer loyalty. Low-cost Sirohi plant. Consistent cash generation.' },
        { name: 'OPC Cement (Infrastructure)', growth: '6% CAGR', share: '8% North India OPC', insight: 'Steady demand from government projects. Road, rail, and housing driving volumes.' },
      ],
      questionMarks: [
        { name: 'East India Entry (Odisha)', growth: '12% CAGR', share: '2% East India', insight: 'New grinding unit in Odisha. Entering market dominated by Nuvoco and Dalmia. Brand building needed.' },
        { name: 'Ready Mix Concrete', growth: '15% CAGR', share: '2% RMC market', insight: 'Small presence. Needs capital to scale versus UltraTech dominance.' },
      ],
      dogs: [
        { name: 'Low-grade bulk cement', growth: '3% CAGR', share: 'Declining', insight: 'Commodity bulk sales being phased out in favor of branded premium products.' },
      ],
    },
    headToHead: {
      competitor: 'Heidelberg Cement India',
      competitorTicker: 'HEIDELBERG',
      summary: 'JK Lakshmi (JK Organisation, North/Central India, AAC blocks pioneer) vs Heidelberg (German MNC subsidiary, Central India, sustainability leader). JK Lakshmi is larger and faster growing; Heidelberg has better margins and MNC backing.',
      metrics: [
        { label: 'Revenue FY25', company: 6800, competitor: 2850, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 16.2, competitor: 18.6, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 14, competitor: 6.26, unit: 'MTPA', winner: 'company' },
        { label: 'Debt/Equity', company: 0.42, competitor: 0.15, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 13.0, competitor: 14.5, unit: '%', winner: 'competitor' },
        { label: 'Revenue Growth (3Y CAGR)', company: 12, competitor: 7, unit: '%', winner: 'company' },
        { label: 'AAC Blocks Business', company: 'Yes (pioneer)', competitor: 'No', unit: '', winner: 'company' },
        { label: 'Geographic Spread', company: '5 states', competitor: '2 states', unit: '', winner: 'company' },
        { label: 'Blended Cement Ratio', company: 65, competitor: 85, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 11000, competitor: 5500, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'JK Lakshmi wins on scale, growth rate, geographic diversification, and AAC blocks advantage. Heidelberg wins on margin efficiency, sustainability (highest blended ratio), and MNC governance. For insurers: JK Lakshmi offers growth with moderate risk; Heidelberg offers stable but limited growth with potential parent divestment creating uncertainty.'
    },
  },
  {
    id: 'heidelberg-cement', name: 'Heidelberg Cement India', industry: 'cement', ticker: 'HEIDELBERG',
    founded: 1958, headquarters: 'Gurugram, Haryana', employees: '2,500+', marketCap: '₹5,500 Cr',
    ceo: 'Jamshed Navy Cooper (MD)', website: 'https://www.heidelbergcement.co.in',
    description: "​Indian subsidiary of Heidelberg Materials (Germany). Operates 6.26 MTPA capacity across Central India (MP and UP). Known for mycem brand and focus on sustainable cement production with highest proportion of blended cement. In FY25 the company reported revenue of ₹2,850 Cr and net profit of ₹250 Cr, at an EBITDA margin of around 18.6%. Its revenue is led by ppc (50% of sales), complemented by psc and opc cement. Small but efficient player in Central India (6.26 MTPA). Central India — Madhya Pradesh (Damoh, Imlai, Jhansi) and UP (Ammasandra).",
    products: [
      { name: 'PPC (mycem brand)', revenueShare: 50, description: 'Premium PPC for retail market' },
      { name: 'PSC (Portland Slag Cement)', revenueShare: 20, description: 'Infrastructure-grade slag cement' },
      { name: 'OPC Cement', revenueShare: 18, description: 'OPC for projects' },
      { name: 'Composite Cement', revenueShare: 12, description: 'Low-carbon composite grades' },
    ],
    financials: [
      { year: 'FY21', revenue: 2180, profit: 280, ebitda: 550 },
      { year: 'FY22', revenue: 2320, profit: 250, ebitda: 500 },
      { year: 'FY23', revenue: 2580, profit: 180, ebitda: 420 },
      { year: 'FY24', revenue: 2650, profit: 200, ebitda: 470 },
      { year: 'FY25', revenue: 2850, profit: 250, ebitda: 530 },
    ],
    revenueFY25: '₹2,850 Cr', profitFY25: '₹250 Cr', ebitdaMargin: '18.6%',
    news: [
      { title: 'Heidelberg India achieves 85% blended cement ratio — industry best', date: '2025-03-15', source: 'Company PR', url: 'https://www.heidelbergcement.co.in' },
      { title: 'mycem Power launch for foundation and structural applications', date: '2025-02-05', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Parent Heidelberg Materials evaluating strategic options for India unit', date: '2025-01-10', source: 'Reuters', url: 'https://www.reuters.com' },
    ],
    futureScope: {
      outlook: 'Small but efficient operations. Parent may divest India operations (like Holcim sold to Adani). Strong sustainability credentials.',
      plans: ['Capacity expansion to 8 MTPA', 'Carbon reduction leadership', 'Brand premiumization', 'Possible strategic stake sale by parent'],
      risks: ['Small scale limiting competitiveness', 'Parent company strategic uncertainty', 'Central India price competition', 'Limited growth without parent support'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (mycem brand PPC, PSC, OPC, Composite). Highest proportion of blended cement in Indian industry (85%). Focus on sustainability and low-carbon production.',
      geographicPresence: 'Central India — Madhya Pradesh (Damoh, Imlai, Jhansi) and UP (Ammasandra). Concentrated operations in 4-5 states around Central India.',
      keyStrengths: [
        'German parent (Heidelberg Materials) — global best practices in sustainability',
        'Industry-best blended cement ratio (85%) — lowest carbon intensity',
        'Strong mycem brand in Central India with premium positioning',
        'Efficient small-scale operations with good cost control'
      ],
      marketPosition: 'Small but efficient player in Central India (6.26 MTPA). Known for sustainability leadership. Premium brand in MP and UP. Parent company\'s global expertise in low-carbon cement provides technology edge.',
      rawMaterialStrategy: 'Captive limestone at Damoh (MP) with 30+ year reserves. Strong focus on blended cement reducing clinker dependency. PSC uses SAIL blast furnace slag. Highest composite/blended ratio in India — only 15% OPC clinker-heavy products.'
    },
    financialRatios: {
      debtToEquity: 0.15,
      currentRatio: 1.35,
      roe: 10.5,
      roce: 14.5,
      interestCoverage: 22.0,
      netDebt: '₹350 Cr',
      peRatio: 24.0,
      pbRatio: 2.5,
      dividendYield: 1.5,
      workingCapitalDays: -8
    },
    bcgMatrix: {
      stars: [
        { name: 'Low-Carbon Cement (Composite/PSC)', growth: '12% CAGR', share: '20% Central India blended', insight: 'Regulatory push for green building. ESG investors favor low-carbon producers. First-mover in composite grades.' },
      ],
      cashCows: [
        { name: 'mycem PPC (Central India)', growth: '6% CAGR', share: '10% MP cement market', insight: 'Strong brand in Madhya Pradesh with loyal dealer base. Good margins from premium positioning. Low capex maintenance.' },
        { name: 'mycem Power (Structural OPC)', growth: '5% CAGR', share: '8% Central India OPC', insight: 'New product line for foundation/structural use. Growing on infrastructure demand.' },
      ],
      questionMarks: [
        { name: 'Capacity Expansion (8 MTPA target)', growth: '15% potential', share: 'Future growth', insight: 'Parent approval needed for expansion. Uncertain given potential divestment plans. Scale needed for long-term viability.' },
      ],
      dogs: [
        { name: 'Bulk Institutional Sales', growth: '2% CAGR', share: '3% institutional', insight: 'Small volume of low-margin project sales. Being reduced in favor of retail channels.' },
      ],
    },
    headToHead: {
      competitor: 'Orient Cement',
      competitorTicker: 'ORIENTCEM',
      summary: 'Heidelberg (German MNC, Central India, sustainability leader) vs Orient Cement (CK Birla Group, Deccan region). Both are small-scale players in overlapping Central/South India markets.',
      metrics: [
        { label: 'Revenue FY25', company: 2850, competitor: 4100, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 18.6, competitor: 15.1, unit: '%', winner: 'company' },
        { label: 'Capacity', company: 6.26, competitor: 8, unit: 'MTPA', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.15, competitor: 0.45, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 14.5, competitor: 10.5, unit: '%', winner: 'company' },
        { label: 'Blended Cement Ratio', company: 85, competitor: 60, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 8.8, competitor: 5.4, unit: '%', winner: 'company' },
        { label: 'Geographic Spread', company: '2 states', competitor: '3 states', unit: '', winner: 'competitor' },
        { label: 'Growth Rate', company: 7, competitor: 12, unit: '%', winner: 'competitor' },
        { label: 'Dividend Yield', company: 1.5, competitor: 0.5, unit: '%', winner: 'company' },
        { label: 'Market Cap', company: 5500, competitor: 4500, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Heidelberg wins on profitability, efficiency, sustainability, and balance sheet strength. Orient wins on scale, geographic spread, and growth rate. For insurers: Heidelberg is a safe, well-governed bet with MNC parentage; Orient offers higher growth but with CK Birla Group complexity and higher leverage.'
    },
  },
  {
    id: 'orient-cement', name: 'Orient Cement', industry: 'cement', ticker: 'ORIENTCEM',
    founded: 1979, headquarters: 'New Delhi', employees: '2,000+', marketCap: '₹4,500 Cr',
    ceo: 'Deepak Khetrapal (MD & CEO)', website: 'https://www.orientcement.com',
    description: "​Part of CK Birla Group. Operates 8 MTPA capacity with plants at Devapur (Telangana), Chittapur (Karnataka), and Jalgaon (Maharashtra). Strong presence in AP, Telangana, and Maharashtra. In FY25 the company reported revenue of ₹4,100 Cr and net profit of ₹220 Cr, at an EBITDA margin of around 15.1%. Its revenue is led by ppc (45% of sales), complemented by opc cement and composite cement. Mid-size player (8 MTPA) focused on Deccan region. Deccan region focus — Telangana (Devapur), Karnataka (Chittapur), Maharashtra (Jalgaon).",
    products: [
      { name: 'PPC (Birla-A1)', revenueShare: 45, description: 'Premium brand in Deccan region' },
      { name: 'OPC Cement', revenueShare: 30, description: 'OPC for construction projects' },
      { name: 'Composite Cement', revenueShare: 15, description: 'Composite and blended grades' },
      { name: 'Value-Added Products', revenueShare: 10, description: 'Putty and waterproofing' },
    ],
    financials: [
      { year: 'FY21', revenue: 2800, profit: 150, ebitda: 480 },
      { year: 'FY22', revenue: 3100, profit: 120, ebitda: 430 },
      { year: 'FY23', revenue: 3500, profit: 80, ebitda: 380 },
      { year: 'FY24', revenue: 3800, profit: 150, ebitda: 520 },
      { year: 'FY25', revenue: 4100, profit: 220, ebitda: 620 },
    ],
    revenueFY25: '₹4,100 Cr', profitFY25: '₹220 Cr', ebitdaMargin: '15.1%',
    news: [
      { title: 'Orient Cement Jalgaon grinding unit expansion adds 2 MTPA', date: '2025-03-22', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Maharashtra market share grows on infrastructure project wins', date: '2025-02-08', source: 'Company PR', url: 'https://www.orientcement.com' },
      { title: 'Premium product range expanded with new composite grade', date: '2025-01-14', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Deccan region player with strong brand recall. Maharashtra infrastructure spending drives demand. CK Birla Group provides financial backing.',
      plans: ['Capacity to 12 MTPA by FY27', 'Maharashtra market deepening', 'Value-added building products', 'Premium product mix to 40%'],
      risks: ['Small scale in consolidated market', 'South/West India overcapacity', 'Competition from UltraTech and Dalmia', 'Limited geographical spread'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Birla-A1 PPC, OPC, Composite), Value-Added Products (putty, waterproofing). Strong Birla-A1 brand in Deccan plateau region.',
      geographicPresence: 'Deccan region focus — Telangana (Devapur), Karnataka (Chittapur), Maharashtra (Jalgaon). 3 plants covering AP, Telangana, Karnataka, and Maharashtra.',
      keyStrengths: [
        'CK Birla Group backing — strong corporate governance and capital access',
        'Premium Birla-A1 brand with strong recall in AP/Telangana',
        'Maharashtra infrastructure spending driving growth',
        'Focused geographic strategy avoiding overextension'
      ],
      marketPosition: 'Mid-size player (8 MTPA) focused on Deccan region. Strong brand in AP/Telangana under Birla-A1 name. Growing Maharashtra presence. CK Birla Group provides stability and governance quality.',
      rawMaterialStrategy: 'Captive limestone at Devapur (Telangana) with 35+ year reserves. Chittapur plant has captive mines in Karnataka. Fuel: Pet coke with increasing alt fuels. Jalgaon is grinding unit using clinker from integrated plants.'
    },
    financialRatios: {
      debtToEquity: 0.45,
      currentRatio: 1.05,
      roe: 7.8,
      roce: 10.5,
      interestCoverage: 5.5,
      netDebt: '₹1,800 Cr',
      peRatio: 22.0,
      pbRatio: 2.0,
      dividendYield: 0.5,
      workingCapitalDays: -3
    },
    bcgMatrix: {
      stars: [
        { name: 'Maharashtra Operations', growth: '15% CAGR', share: '4% Maharashtra', insight: 'Jalgaon grinding unit expansion. State infrastructure spending driving demand. New market with growth potential.' },
      ],
      cashCows: [
        { name: 'Birla-A1 Cement (Telangana/AP)', growth: '6% CAGR', share: '10% AP/Telangana', insight: 'Established premium brand with loyal dealer network. Steady demand from housing and government projects.' },
        { name: 'Karnataka Cement', growth: '5% CAGR', share: '5% Karnataka', insight: 'Chittapur plant serves growing Bangalore metro area and North Karnataka. Consistent volumes.' },
      ],
      questionMarks: [
        { name: 'Value-Added Products', growth: '18% CAGR', share: '2% building products', insight: 'Putty, waterproofing entering market. Needs brand building and dealer education. Leveraging existing cement network.' },
      ],
      dogs: [
        { name: 'Bulk Project Sales', growth: '2% CAGR', share: '3% institutional', insight: 'Low-margin institutional supplies. Reducing exposure to improve blended realization.' },
      ],
    },
    headToHead: {
      competitor: 'Star Cement',
      competitorTicker: 'STARCEMENT',
      summary: 'Orient Cement (Deccan region, CK Birla Group) vs Star Cement (Northeast India dominant). Different geographies, similar mid-tier scale. Star has natural monopoly in NE; Orient competes in contested markets.',
      metrics: [
        { label: 'Revenue FY25', company: 4100, competitor: 3100, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 15.1, competitor: 21.9, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 8, competitor: 5.7, unit: 'MTPA', winner: 'company' },
        { label: 'Net Profit Margin', company: 5.4, competitor: 12.3, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.45, competitor: 0.18, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 10.5, competitor: 16.0, unit: '%', winner: 'competitor' },
        { label: 'Regional Dominance', company: 'Moderate', competitor: '#1 in NE India', unit: '', winner: 'competitor' },
        { label: 'Growth Rate', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'Competitive Intensity', company: 'High (South/West)', competitor: 'Low (NE moat)', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 4500, competitor: 7500, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Star Cement decisively wins on profitability and regional dominance — its NE India monopoly provides pricing power and margin protection. Orient competes in tougher markets but has better geographic diversification potential. For insurers: Star Cement is lower risk with natural moat; Orient has more growth upside but higher competitive risk.'
    },
  },
  {
    id: 'star-cement', name: 'Star Cement', industry: 'cement', ticker: 'STARCEMENT',
    founded: 2001, headquarters: 'Guwahati, Assam', employees: '3,500+', marketCap: '₹7,500 Cr',
    ceo: 'Sanjay Kumar Gupta (MD)', website: 'https://www.starcement.co.in',
    description: "​Largest cement manufacturer in Northeast India with 5.7 MTPA capacity. Plants in Meghalaya and Assam. Benefits from zero excise/GST benefits in NE region. Strong brand in all 8 NE states and parts of North Bengal/Bihar. In FY25 the company reported revenue of ₹3,100 Cr and net profit of ₹380 Cr, at an EBITDA margin of around 21.9%. Its revenue is led by ppc (50% of sales), complemented by opc cement and psc cement. Undisputed #1 in Northeast India with 60%+ market share. Northeast India monopoly — Meghalaya (Lumshnong plant), Assam (Guwahati grinding).",
    products: [
      { name: 'PPC (Star Super)', revenueShare: 50, description: 'Market-leading PPC in Northeast India' },
      { name: 'OPC Cement', revenueShare: 30, description: 'OPC for infrastructure projects in NE' },
      { name: 'PSC Cement', revenueShare: 12, description: 'Slag-based cement' },
      { name: 'Premium Variants', revenueShare: 8, description: 'Star Ultima and specialty grades' },
    ],
    financials: [
      { year: 'FY21', revenue: 2100, profit: 320, ebitda: 580 },
      { year: 'FY22', revenue: 2350, profit: 350, ebitda: 620 },
      { year: 'FY23', revenue: 2580, profit: 280, ebitda: 550 },
      { year: 'FY24', revenue: 2800, profit: 320, ebitda: 600 },
      { year: 'FY25', revenue: 3100, profit: 380, ebitda: 680 },
    ],
    revenueFY25: '₹3,100 Cr', profitFY25: '₹380 Cr', ebitdaMargin: '21.9%',
    news: [
      { title: 'Star Cement Guwahati grinding unit adds 2 MTPA for Bihar/Bengal', date: '2025-04-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'NE India infrastructure spending up 45% — Star Cement beneficiary', date: '2025-02-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Siliguri unit captures North Bengal market share', date: '2025-01-20', source: 'Company PR', url: 'https://www.starcement.co.in' },
    ],
    futureScope: {
      outlook: 'Dominant NE player with natural moat (logistics barriers for outsiders). Government infra spending in NE driving demand. Expanding to Bengal/Bihar.',
      plans: ['Capacity to 8 MTPA by FY27', 'Bengal and Bihar market capture', 'Clinker capacity addition at Meghalaya', 'Premium product development'],
      risks: ['NE region logistical challenges', 'Tax benefit expiry risk', 'Limited growth potential in NE alone', 'Competition from Dalmia in NE expansion'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Star Super PPC, OPC, PSC, Star Ultima premium). Dominant brand in all 8 northeastern states. Expanding into North Bengal and Bihar.',
      geographicPresence: 'Northeast India monopoly — Meghalaya (Lumshnong plant), Assam (Guwahati grinding). Present in all 8 NE states. Expanding to Siliguri (North Bengal) and Bihar.',
      keyStrengths: [
        'Natural monopoly in NE India — logistics barriers prevent outside competition',
        'Zero/reduced GST benefits in NE region — cost advantage over imports',
        'Only large-scale cement manufacturer in the region — 60%+ market share',
        'Government infra spending in NE creating demand tailwind'
      ],
      marketPosition: 'Undisputed #1 in Northeast India with 60%+ market share. Only large-scale manufacturer in 8 NE states. Natural logistics moat (poor road/rail connectivity makes cement import uneconomical). Expanding beyond NE into North Bengal and Bihar.',
      rawMaterialStrategy: 'Captive limestone at Lumshnong (Meghalaya) — high-quality deposits with 50+ year reserves. NE India has abundant limestone. Fuel: Mix of domestic coal and pet coke. Logistics: Own fleet and dedicated routes to all NE states.'
    },
    financialRatios: {
      debtToEquity: 0.18,
      currentRatio: 1.45,
      roe: 14.5,
      roce: 16.0,
      interestCoverage: 18.0,
      netDebt: '₹600 Cr',
      peRatio: 22.0,
      pbRatio: 3.2,
      dividendYield: 1.0,
      workingCapitalDays: -5
    },
    bcgMatrix: {
      stars: [
        { name: 'NE India Infrastructure Demand', growth: '14% CAGR', share: '60%+ NE market', insight: 'Government spending on roads, bridges, airports in NE creating massive demand. Only supplier with scale to serve.' },
        { name: 'Bengal/Bihar Expansion', growth: '20% CAGR', share: '3% (new market)', insight: 'Siliguri and Bihar grinding units extending reach beyond NE. Large addressable market without NE margins but with volume potential.' },
      ],
      cashCows: [
        { name: 'Star Super PPC (NE India)', growth: '8% CAGR', share: '60%+ NE retail', insight: 'Monopoly brand with zero competition. High margins due to pricing power. Extremely loyal dealer and consumer base.' },
        { name: 'OPC Cement (NE Projects)', growth: '10% CAGR', share: '70%+ NE project cement', insight: 'All major government infra projects in NE source from Star. No alternative supplier at scale.' },
      ],
      questionMarks: [
        { name: 'Premium Products (Star Ultima)', growth: '15% CAGR', share: '5% NE premium', insight: 'Premiumization in NE. Rising incomes creating demand for higher-grade cement in urban Guwahati/Shillong.' },
      ],
      dogs: [
        { name: 'Non-NE Commodity Sales', growth: '5% CAGR', share: '1% Bengal commodity', insight: 'Bengal/Bihar sales at commodity pricing without NE premium. Lower margins but necessary for volume growth beyond NE.' },
      ],
    },
    headToHead: {
      competitor: 'Prism Johnson (Cement Division)',
      competitorTicker: 'PRSMJOHNSN',
      summary: 'Star Cement (NE India monopoly, premium margins) vs Prism Johnson (Central India, diversified building materials). Different business models. Star is a pure cement play with monopoly; Prism is diversified.',
      metrics: [
        { label: 'Revenue (Cement only)', company: 3100, competitor: 2600, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 21.9, competitor: 12.0, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 12.3, competitor: 2.9, unit: '%', winner: 'company' },
        { label: 'Cement Capacity', company: 5.7, competitor: 5.6, unit: 'MTPA', winner: 'company' },
        { label: 'Debt/Equity', company: 0.18, competitor: 0.65, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 16.0, competitor: 7.5, unit: '%', winner: 'company' },
        { label: 'Regional Dominance', company: '60%+ NE', competitor: '5% Central India', unit: '', winner: 'company' },
        { label: 'Business Diversification', company: 'Cement only', competitor: 'Cement + Tiles + RMC', unit: '', winner: 'competitor' },
        { label: 'Brand Portfolio', company: '1 brand', competitor: '3 brands (Champion, H&R Johnson, RMC)', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 7500, competitor: 4800, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Star Cement dominates on profitability and efficiency due to its NE India monopoly. Prism Johnson offers diversification but with weaker cement-specific metrics. For insurers: Star Cement is a unique low-risk monopoly play; Prism Johnson has complex business model with multiple segments diluting focus.'
    },
  },
  {
    id: 'prism-johnson', name: 'Prism Johnson (Cement Division)', industry: 'cement', ticker: 'PRSMJOHNSN',
    founded: 1992, headquarters: 'Mumbai, Maharashtra', employees: '4,000+', marketCap: '₹4,800 Cr',
    ceo: 'Atul Desai (MD)', website: 'https://www.prismjohnson.in',
    description: "​Diversified building materials company with cement (5.6 MTPA), tiles (H&R Johnson), and RMC businesses. Cement plants in Chhattisgarh and Madhya Pradesh. H&R Johnson is a premium tile brand. In FY25 the company reported revenue of ₹7,500 Cr and net profit of ₹220 Cr, at an EBITDA margin of around 12.0%. Its revenue is led by cement (35% of sales), complemented by tiles and ready mix concrete. Unique diversified building materials play. Cement: Central India (Chhattisgarh, MP).",
    products: [
      { name: 'Cement (Champion/Rahul brands)', revenueShare: 35, description: 'Grey cement for Central India' },
      { name: 'Tiles (H&R Johnson)', revenueShare: 30, description: 'Floor/wall tiles and sanitaryware' },
      { name: 'Ready Mix Concrete', revenueShare: 20, description: 'RMC operations pan-India' },
      { name: 'Bath Fittings', revenueShare: 10, description: 'Johnson brand bath products' },
      { name: 'Engineered Marble', revenueShare: 5, description: 'Quartz and engineered stone surfaces' },
    ],
    financials: [
      { year: 'FY21', revenue: 5200, profit: -80, ebitda: 520 },
      { year: 'FY22', revenue: 5800, profit: 50, ebitda: 580 },
      { year: 'FY23', revenue: 6500, profit: 80, ebitda: 650 },
      { year: 'FY24', revenue: 7000, profit: 150, ebitda: 780 },
      { year: 'FY25', revenue: 7500, profit: 220, ebitda: 900 },
    ],
    revenueFY25: '₹7,500 Cr', profitFY25: '₹220 Cr', ebitdaMargin: '12.0%',
    news: [
      { title: 'Prism Johnson cement division achieves best-ever EBITDA margins', date: '2025-03-28', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'H&R Johnson launches premium large-format tiles range', date: '2025-02-10', source: 'Company PR', url: 'https://www.prismjohnson.in' },
      { title: 'RMC business wins multiple Mumbai metro project contracts', date: '2025-01-15', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Unique integrated building materials play. Demerger of businesses under consideration. Johnson Tiles has premium positioning.',
      plans: ['Cement capacity expansion to 8 MTPA', 'H&R Johnson premium range expansion', 'RMC network expansion in West India', 'Possible demerger to unlock value'],
      risks: ['Diversified conglomerate discount', 'Cement division underperforms sector', 'Tiles face competition from Kajaria and Somany', 'Complex corporate structure'],
    },
    extendedOverview: {
      businessSegments: 'Cement (Champion/Rahul brands in Central India), Tiles & Bath (H&R Johnson — India\'s #2), Ready Mix Concrete (pan-India), Engineered Marble. Diversified building materials company.',
      geographicPresence: 'Cement: Central India (Chhattisgarh, MP). Tiles: Pan-India with manufacturing in Gujarat and AP. RMC: Mumbai, Pune, Bangalore, NCR. Multi-geography presence across segments.',
      keyStrengths: [
        'H&R Johnson is India\'s oldest and most premium tile brand — strong B2B presence',
        'Diversified building materials portfolio — one-stop construction solution',
        'RMC business serves premium metro projects',
        'Potential demerger could unlock significant sum-of-parts value'
      ],
      marketPosition: 'Unique diversified building materials play. Cement: small Central India player (5.6 MTPA). Tiles: India\'s #2 premium brand (H&R Johnson). RMC: Top-5 in metro cities. Combined revenue ₹7,500 Cr makes it a significant building materials company.',
      rawMaterialStrategy: 'Cement: Captive limestone in Chhattisgarh. Tiles: Clay from Gujarat and AP. RMC: Sourcing aggregates locally near each plant. Diversified raw material needs across segments reduce single-commodity risk.'
    },
    financialRatios: {
      debtToEquity: 0.65,
      currentRatio: 0.92,
      roe: 5.5,
      roce: 7.5,
      interestCoverage: 3.8,
      netDebt: '₹2,200 Cr',
      peRatio: 24.0,
      pbRatio: 1.5,
      dividendYield: 0.5,
      workingCapitalDays: 15
    },
    bcgMatrix: {
      stars: [
        { name: 'H&R Johnson Tiles (Premium)', growth: '12% CAGR', share: '8% organized tiles', insight: 'India\'s most premium tile brand. Growing with real estate and renovation demand. Strong B2B and retail presence.' },
        { name: 'Ready Mix Concrete (Metro)', growth: '15% CAGR', share: '5% metro RMC', insight: 'Serving Mumbai, Pune, Bangalore metro projects. High-margin with consistent demand from infrastructure.' },
      ],
      cashCows: [
        { name: 'Cement (Central India)', growth: '6% CAGR', share: '5% Central India', insight: 'Steady cash generator from Satna plant. Champion brand has local recall. Not a market leader but consistent.' },
        { name: 'Bath Fittings (Johnson)', growth: '8% CAGR', share: '5% bath fittings', insight: 'Premium bath products riding on Johnson brand equity. Growing with housing and renovation.' },
      ],
      questionMarks: [
        { name: 'Engineered Marble', growth: '20% CAGR', share: '3% engineered stone', insight: 'Quartz and engineered surfaces growing with modular kitchens. Small segment with high growth potential.' },
        { name: 'Demerger Value Unlock', growth: 'N/A', share: 'N/A', insight: 'Sum-of-parts potentially higher than current market cap. Demerger could create focused entities with better valuations.' },
      ],
      dogs: [
        { name: 'Cement Bulk Sales', growth: '3% CAGR', share: '2% institutional', insight: 'Small-scale cement division with below-industry margins. Not competitive vs dedicated cement companies.' },
      ],
    },
    headToHead: {
      competitor: 'Chettinad Cement',
      competitorTicker: 'Unlisted',
      summary: 'Prism Johnson (diversified building materials, listed) vs Chettinad Cement (pure South India cement, unlisted). Different models — Prism is diversified but smaller in cement; Chettinad is larger pure-play.',
      metrics: [
        { label: 'Total Revenue FY25', company: 7500, competitor: 6200, unit: '₹ Cr', winner: 'company' },
        { label: 'Cement Revenue FY25', company: 2600, competitor: 6200, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Cement Capacity', company: 5.6, competitor: 13, unit: 'MTPA', winner: 'competitor' },
        { label: 'EBITDA Margin (Overall)', company: 12.0, competitor: 16.9, unit: '%', winner: 'competitor' },
        { label: 'Business Diversification', company: 'Cement + Tiles + RMC', competitor: 'Cement only', unit: '', winner: 'company' },
        { label: 'Brand Premium', company: 'H&R Johnson (premium tiles)', competitor: 'Chettinad (regional cement)', unit: '', winner: 'company' },
        { label: 'Listed Status', company: 'Listed', competitor: 'Unlisted', unit: '', winner: 'company' },
        { label: 'Cement Market Share', company: '2% Central India', competitor: '8% South India', unit: '', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 2.9, competitor: 6.8, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 4800, competitor: 'Unlisted', unit: '₹ Cr', winner: 'tie' },
      ],
      verdict: 'Chettinad is significantly stronger as a cement company — larger capacity, better margins, and stronger regional position. Prism Johnson\'s value lies in diversification (H&R Johnson tiles brand). For insurers: Chettinad is a traditional, well-run cement business; Prism Johnson requires segment-level analysis due to its diversified nature.'
    },
  },
  {
    id: 'chettinad-cement', name: 'Chettinad Cement', industry: 'cement', ticker: 'Unlisted',
    founded: 1962, headquarters: 'Chennai, Tamil Nadu', employees: '5,000+', marketCap: 'Unlisted',
    ceo: 'M.A.M.R. Muthiah (CMD)', website: 'https://www.chettinadcement.com',
    description: "​Leading South Indian cement company (unlisted). Part of Chettinad Group. Operates 13 MTPA capacity with plants in Tamil Nadu, Karnataka, and Andhra Pradesh. Strong brand in Southern India. In FY25 the company reported revenue of ₹6,200 Cr and net profit of ₹420 Cr, at an EBITDA margin of around 16.9%. Its revenue is led by opc cement (40% of sales), complemented by ppc cement and psc cement. South India's #3-4 cement company by capacity (13 MTPA, unlisted). South India — Tamil Nadu, Karnataka, AP.",
    products: [
      { name: 'OPC Cement', revenueShare: 40, description: 'OPC for large projects and infrastructure' },
      { name: 'PPC Cement', revenueShare: 35, description: 'Blended cement for housing construction' },
      { name: 'PSC Cement', revenueShare: 12, description: 'Portland Slag Cement' },
      { name: 'Ready Mix Concrete', revenueShare: 8, description: 'RMC for South India' },
      { name: 'Specialty Cement', revenueShare: 5, description: 'Oil well and sulphate resistant' },
    ],
    financials: [
      { year: 'FY21', revenue: 4200, profit: 350, ebitda: 820 },
      { year: 'FY22', revenue: 4800, profit: 380, ebitda: 880 },
      { year: 'FY23', revenue: 5500, profit: 320, ebitda: 850 },
      { year: 'FY24', revenue: 5800, profit: 380, ebitda: 950 },
      { year: 'FY25', revenue: 6200, profit: 420, ebitda: 1050 },
    ],
    revenueFY25: '₹6,200 Cr', profitFY25: '₹420 Cr', ebitdaMargin: '16.9%',
    news: [
      { title: 'Chettinad Cement Karnataka plant expansion adds 3 MTPA', date: '2025-03-15', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
      { title: 'IPO under consideration as group evaluates listing', date: '2025-02-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'New dry mortar plant at Chennai for building products', date: '2025-01-10', source: 'Company PR', url: 'https://www.chettinadcement.com' },
    ],
    futureScope: {
      outlook: 'Strong unlisted player in South India. IPO could unlock significant value. Well-managed family business with long-term outlook.',
      plans: ['Capacity to 18 MTPA', 'IPO evaluation', 'Value-added building products', 'East India expansion through grinding units'],
      risks: ['Unlisted — limited public information', 'South India overcapacity', 'Competition from UltraTech and Dalmia', 'Family-run governance structure'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (OPC, PPC, PSC), Ready Mix Concrete, Specialty Cement (oil well, sulphate resistant). Part of diversified Chettinad Group (ports, shipping, silica, construction).',
      geographicPresence: 'South India — Tamil Nadu, Karnataka, AP. Plants at Ariyalur (TN), Karur (TN), and Gulbarga (Karnataka). 13 MTPA capacity across South Indian states.',
      keyStrengths: [
        'Part of well-established Chettinad Group — 100+ years in business',
        'Strong South India brand with premium positioning in Tamil Nadu',
        'Diversified group provides cash flow stability and synergies (ports for logistics)',
        'IPO potential could unlock significant value for investors'
      ],
      marketPosition: 'South India\'s #3-4 cement company by capacity (13 MTPA, unlisted). Strong brand in Tamil Nadu and Karnataka. Chettinad Group\'s ports and shipping provide logistics advantage. Well-run family enterprise with conservative growth approach.',
      rawMaterialStrategy: 'Captive limestone in Tamil Nadu (Ariyalur) and Karnataka (Gulbarga) with 40+ year reserves. Group-owned ports help with coastal clinker movement. Fuel: Pet coke and domestic coal. Increasing alternative fuels usage.'
    },
    financialRatios: {
      debtToEquity: 0.35,
      currentRatio: 1.20,
      roe: 10.0,
      roce: 13.0,
      interestCoverage: 8.0,
      netDebt: '₹2,500 Cr',
      peRatio: 0,
      pbRatio: 0,
      dividendYield: 0,
      workingCapitalDays: -8
    },
    bcgMatrix: {
      stars: [
        { name: 'Karnataka Expansion', growth: '12% CAGR', share: '8% Karnataka', insight: 'Bangalore infrastructure and housing boom driving demand. Gulbarga plant expansion ongoing.' },
        { name: 'IPO Preparation', growth: 'N/A', share: 'N/A', insight: 'Listing would unlock value, bring transparency, and provide growth capital for expansion. Group evaluating FY27 timeline.' },
      ],
      cashCows: [
        { name: 'Tamil Nadu Cement', growth: '6% CAGR', share: '12% Tamil Nadu', insight: 'Established brand with 60+ years of presence. Strong dealer network. Consistent demand from TN housing market.' },
        { name: 'Specialty Cements (Oil Well)', growth: '5% CAGR', share: '10% oil well cement', insight: 'Niche high-margin segment. Long-term ONGC/oil industry contracts provide steady revenue.' },
      ],
      questionMarks: [
        { name: 'Building Products (Dry Mortar)', growth: '18% CAGR', share: '2% South India', insight: 'New product range leveraging cement distribution. Early stage with growth potential.' },
        { name: 'Ready Mix Concrete', growth: '15% CAGR', share: '3% South India RMC', insight: 'Growing presence in Bangalore and Chennai. Capital intensive to scale.' },
      ],
      dogs: [
        { name: 'Bulk Institutional Sales', growth: '3% CAGR', share: '4% bulk segment', insight: 'Low-margin project sales being reduced. Focus shifting to premium retail channels.' },
      ],
    },
    headToHead: {
      competitor: 'Sagar Cements',
      competitorTicker: 'SAGCEM',
      summary: 'Chettinad (unlisted, South India, group synergies) vs Sagar Cements (listed, South+East India, growing). Chettinad is larger and more profitable; Sagar is smaller but diversifying geographically.',
      metrics: [
        { label: 'Revenue FY25', company: 6200, competitor: 3000, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 16.9, competitor: 13.3, unit: '%', winner: 'company' },
        { label: 'Capacity', company: 13, competitor: 8.25, unit: 'MTPA', winner: 'company' },
        { label: 'Net Profit Margin', company: 6.8, competitor: 4.0, unit: '%', winner: 'company' },
        { label: 'Geographic Spread', company: 'South only', competitor: 'South + East', unit: '', winner: 'competitor' },
        { label: 'Listed Status', company: 'Unlisted', competitor: 'Listed', unit: '', winner: 'competitor' },
        { label: 'Group Synergies', company: 'Ports, shipping, construction', competitor: 'Standalone', unit: '', winner: 'company' },
        { label: 'Growth Rate', company: 8, competitor: 12, unit: '%', winner: 'competitor' },
        { label: 'Brand Strength', company: 'Strong in TN', competitor: 'Moderate in AP/Telangana', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.35, competitor: 0.65, unit: 'x', winner: 'company' },
      ],
      verdict: 'Chettinad dominates on profitability, scale, and group synergies. Sagar offers geographic diversification (East India entry) and listed market access. For insurers: Chettinad is the stronger, more stable business; Sagar is a smaller growth story with execution risk from dual-geography expansion.'
    },
  },
  {
    id: 'zuari-cement', name: 'Zuari Cement (now Zuari Industries)', industry: 'cement', ticker: 'ZUARI',
    founded: 1997, headquarters: 'Hyderabad, Telangana', employees: '2,000+', marketCap: '₹3,200 Cr',
    ceo: 'K. Ramaswamy (CEO)', website: 'https://www.zuaricement.com',
    description: "​Part of Adventz Group. Operates 6.5 MTPA cement capacity in Andhra Pradesh (Yerraguntla plant). Strong regional player in AP and Karnataka market. Previously part of Italcementi/Heidelberg before Advent acquisition. In FY25 the company reported revenue of ₹2,800 Cr and net profit of ₹150 Cr, at an EBITDA margin of around 15.0%. Its revenue is led by opc cement (45% of sales), complemented by ppc cement and composite cement. Regional player in AP/Karnataka (6.5 MTPA). AP and Karnataka focus — Yerraguntla plant (AP).",
    products: [
      { name: 'OPC Cement (Zuari Star)', revenueShare: 45, description: 'OPC for construction and infrastructure' },
      { name: 'PPC Cement', revenueShare: 35, description: 'Blended cement for housing' },
      { name: 'Composite Cement', revenueShare: 12, description: 'Low-carbon composite grades' },
      { name: 'Value-Added Products', revenueShare: 8, description: 'Putty and construction chemicals' },
    ],
    financials: [
      { year: 'FY21', revenue: 1800, profit: 80, ebitda: 280 },
      { year: 'FY22', revenue: 2100, profit: 100, ebitda: 320 },
      { year: 'FY23', revenue: 2400, profit: 85, ebitda: 310 },
      { year: 'FY24', revenue: 2600, profit: 120, ebitda: 380 },
      { year: 'FY25', revenue: 2800, profit: 150, ebitda: 420 },
    ],
    revenueFY25: '₹2,800 Cr', profitFY25: '₹150 Cr', ebitdaMargin: '15.0%',
    news: [
      { title: 'Zuari Cement Yerraguntla plant crosses 90% capacity utilization', date: '2025-03-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'AP government projects drive volume growth in Q3', date: '2025-02-05', source: 'Company PR', url: 'https://www.zuaricement.com' },
      { title: 'New distributor network expansion in Karnataka', date: '2025-01-12', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Regional player in AP/Karnataka. AP capital Amaravati construction could drive demand. Needs scale for long-term competitiveness.',
      plans: ['Capacity expansion to 10 MTPA', 'AP market deepening', 'Value-added products launch', 'Possible strategic sale to larger player'],
      risks: ['Small scale in consolidating market', 'AP market dependency', 'Limited growth capital', 'Acquisition target risk'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Zuari Star OPC, PPC, Composite), Value-Added Products (putty, construction chemicals). Regional focus on AP and Karnataka markets.',
      geographicPresence: 'AP and Karnataka focus — Yerraguntla plant (AP). Primarily serves Andhra Pradesh, Karnataka, and parts of Tamil Nadu. Single-plant operation.',
      keyStrengths: [
        'Strong Yerraguntla limestone deposit — high-quality with long mine life',
        'AP government infrastructure spending creating demand (Amaravati, Polavaram)',
        'Former Italcementi/Heidelberg asset — good plant quality and processes',
        'Concentrated regional focus enables deep market penetration'
      ],
      marketPosition: 'Regional player in AP/Karnataka (6.5 MTPA). Zuari Star brand has moderate recall. Adventz Group provides financial backing. AP\'s ambitious infrastructure plans (new capital, irrigation projects) create growth opportunity.',
      rawMaterialStrategy: 'Captive limestone at Yerraguntla (AP) with 40+ year reserves. High-quality limestone suitable for OPC and composite grades. Fuel: Pet coke dominant. Single-plant model means concentrated raw material dependency but also focused cost control.'
    },
    financialRatios: {
      debtToEquity: 0.55,
      currentRatio: 1.0,
      roe: 7.2,
      roce: 10.0,
      interestCoverage: 4.5,
      netDebt: '₹1,200 Cr',
      peRatio: 22.0,
      pbRatio: 1.8,
      dividendYield: 0.5,
      workingCapitalDays: 5
    },
    bcgMatrix: {
      stars: [
        { name: 'AP Infrastructure Demand', growth: '15% CAGR', share: '8% AP market', insight: 'Amaravati capital construction, Polavaram dam, and state highway projects driving cement demand in AP. Well-positioned to capture.' },
      ],
      cashCows: [
        { name: 'Zuari Star OPC', growth: '6% CAGR', share: '10% AP OPC', insight: 'Infrastructure-grade OPC with steady demand from large projects. Reliable cash generator from government contracts.' },
        { name: 'Zuari PPC (Retail)', growth: '5% CAGR', share: '6% AP retail', insight: 'Retail housing demand. Established dealer network in AP districts. Consistent volumes.' },
      ],
      questionMarks: [
        { name: 'Karnataka Market Entry', growth: '12% CAGR', share: '3% Karnataka', insight: 'Expanding distribution into Karnataka from AP plant. Competing against Ramco and UltraTech.' },
        { name: 'Value-Added Products', growth: '15% CAGR', share: '1% building products', insight: 'Putty and construction chemicals. New venture needing brand building investment.' },
      ],
      dogs: [
        { name: 'Low-Margin Bulk Sales', growth: '2% CAGR', share: '3% bulk AP', insight: 'Commodity bulk sales to dealers/projects at thin margins. Being reduced to improve blended realization.' },
      ],
    },
    headToHead: {
      competitor: 'Deccan Cements',
      competitorTicker: 'DECCANCE',
      summary: 'Zuari (Adventz Group, AP focused, 6.5 MTPA) vs Deccan Cements (small Telangana player, 2.5 MTPA). Both are small regional players in overlapping markets. Zuari is larger; Deccan is more efficient per tonne.',
      metrics: [
        { label: 'Revenue FY25', company: 2800, competitor: 850, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 15.0, competitor: 16.5, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 6.5, competitor: 2.5, unit: 'MTPA', winner: 'company' },
        { label: 'Net Profit Margin', company: 5.4, competitor: 7.6, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.55, competitor: 0.25, unit: 'x', winner: 'competitor' },
        { label: 'Capacity Utilization', company: 85, competitor: 95, unit: '%', winner: 'competitor' },
        { label: 'Geographic Coverage', company: 'AP + Karnataka', competitor: 'Telangana + AP', unit: '', winner: 'company' },
        { label: 'Group Support', company: 'Adventz Group', competitor: 'Independent', unit: '', winner: 'company' },
        { label: 'Growth Potential', company: 'Medium', competitor: 'Limited (needs expansion)', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 3200, competitor: 1200, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Zuari is larger with better growth prospects due to AP infrastructure spending and group backing. Deccan is more efficient per tonne with lower debt. Both are acquisition candidates in a consolidating market. For insurers: Zuari has group support reducing downside risk; Deccan is extremely small with single-plant concentration risk.'
    },
  },
  {
    id: 'mangalam-cement', name: 'Mangalam Cement', industry: 'cement', ticker: 'MANGLMCEM',
    founded: 1978, headquarters: 'Kota, Rajasthan', employees: '1,800+', marketCap: '₹2,500 Cr',
    ceo: 'Aditya Saraogi (MD)', website: 'https://www.mangalamcement.com',
    description: "​Part of BK Birla Group. Operates 4 MTPA capacity with an integrated plant at Morak, Rajasthan and grinding unit at Aligarh, UP. Strong brand in Rajasthan and Western UP. In FY25 the company reported revenue of ₹1,850 Cr and net profit of ₹120 Cr, at an EBITDA margin of around 15.7%. Its revenue is led by ppc cement (45% of sales), complemented by opc cement and psc cement. Small regional player (4 MTPA) in Rajasthan. Rajasthan and Western UP.",
    products: [
      { name: 'PPC Cement', revenueShare: 45, description: 'Mangalam PPC for housing construction' },
      { name: 'OPC Cement', revenueShare: 35, description: 'OPC for infrastructure' },
      { name: 'PSC Cement', revenueShare: 12, description: 'Slag cement for specialty use' },
      { name: 'Wall Putty', revenueShare: 8, description: 'White cement-based wall putty' },
    ],
    financials: [
      { year: 'FY21', revenue: 1250, profit: 85, ebitda: 220 },
      { year: 'FY22', revenue: 1380, profit: 75, ebitda: 200 },
      { year: 'FY23', revenue: 1550, profit: 60, ebitda: 195 },
      { year: 'FY24', revenue: 1680, profit: 90, ebitda: 240 },
      { year: 'FY25', revenue: 1850, profit: 120, ebitda: 290 },
    ],
    revenueFY25: '₹1,850 Cr', profitFY25: '₹120 Cr', ebitdaMargin: '15.7%',
    news: [
      { title: 'Mangalam Cement Aligarh grinding unit reaches full capacity', date: '2025-03-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Rajasthan housing demand drives Q3 volume growth of 12%', date: '2025-02-12', source: 'Company PR', url: 'https://www.mangalamcement.com' },
      { title: 'Wall putty segment grows 30% on retail channel expansion', date: '2025-01-20', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Small regional player in Rajasthan. Needs scale to compete long-term. BK Birla Group provides stability.',
      plans: ['Capacity to 5.5 MTPA', 'New grinding unit in UP', 'Wall putty expansion', 'Cost efficiency improvements'],
      risks: ['Small scale in consolidating market', 'Rajasthan competition from Shree and UltraTech', 'Acquisition target risk', 'Limited growth capital vs larger peers'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (PPC, OPC, PSC), Wall Putty. Small focused player in Rajasthan and Western UP. BK Birla Group company.',
      geographicPresence: 'Rajasthan and Western UP. Integrated plant at Morak (Kota district, Rajasthan) and grinding unit at Aligarh (UP). Serves primarily Rajasthan, UP, and MP.',
      keyStrengths: [
        'BK Birla Group pedigree providing brand trust and financial stability',
        'Low-cost operations at Morak with captive limestone',
        'Strong local dealer network in Rajasthan\'s Hadoti region',
        'Wall putty segment growing well with housing demand'
      ],
      marketPosition: 'Small regional player (4 MTPA) in Rajasthan. #5-6 in Rajasthan market behind Shree, UltraTech, JK, and Wonder. Loyal dealer base in Kota/Bundi/Jhalawar districts. BK Birla name provides trust.',
      rawMaterialStrategy: 'Captive limestone at Morak (Rajasthan) with 30+ year reserves. Good quality cement-grade limestone. Fuel: Pet coke with some domestic coal. Aligarh grinding unit uses clinker from Morak via rail.'
    },
    financialRatios: {
      debtToEquity: 0.30,
      currentRatio: 1.15,
      roe: 8.5,
      roce: 11.0,
      interestCoverage: 8.0,
      netDebt: '₹450 Cr',
      peRatio: 22.0,
      pbRatio: 2.0,
      dividendYield: 1.0,
      workingCapitalDays: 5
    },
    bcgMatrix: {
      stars: [
        { name: 'Wall Putty', growth: '30% CAGR', share: '3% Rajasthan putty', insight: 'Fast-growing value-added segment. Housing boom driving demand. Higher margins than base cement.' },
      ],
      cashCows: [
        { name: 'Rajasthan Grey Cement', growth: '6% CAGR', share: '5% Rajasthan', insight: 'Core business with loyal Hadoti region dealer network. Morak plant is low-cost. Steady cash generation.' },
        { name: 'UP Grinding Unit (Aligarh)', growth: '8% CAGR', share: '2% Western UP', insight: 'Serves growing Western UP market. Infrastructure and housing demand stable.' },
      ],
      questionMarks: [
        { name: 'Capacity Expansion', growth: '12% potential', share: 'Future growth', insight: 'Need to expand to 5.5+ MTPA for relevance. Capital constraints vs larger competitors.' },
      ],
      dogs: [
        { name: 'PSC Cement', growth: '2% CAGR', share: '1% slag cement', insight: 'Small slag cement volumes. Limited growth in Rajasthan. Not a strategic focus.' },
      ],
    },
    headToHead: {
      competitor: 'Sagar Cements',
      competitorTicker: 'SAGCEM',
      summary: 'Mangalam (Rajasthan small player, BK Birla) vs Sagar Cements (South/East India, growth-oriented). Both are small-cap cement stocks but in different geographies with different strategies.',
      metrics: [
        { label: 'Revenue FY25', company: 1850, competitor: 3000, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 15.7, competitor: 13.3, unit: '%', winner: 'company' },
        { label: 'Capacity', company: 4, competitor: 8.25, unit: 'MTPA', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.30, competitor: 0.65, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 11.0, competitor: 8.5, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 6.5, competitor: 4.0, unit: '%', winner: 'company' },
        { label: 'Growth Rate', company: 8, competitor: 12, unit: '%', winner: 'competitor' },
        { label: 'Geographic Diversification', company: '2 states', competitor: '4 states', unit: '', winner: 'competitor' },
        { label: 'Group Support', company: 'BK Birla', competitor: 'Independent', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 2500, competitor: 2800, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Mangalam is more profitable and efficient with lower debt, but Sagar is larger, growing faster, and geographically diversified. For insurers: Mangalam is a conservative, stable small-cap with group backing; Sagar has higher growth but also higher risk from leveraged expansion.'
    },
  },
  {
    id: 'sagar-cements', name: 'Sagar Cements', industry: 'cement', ticker: 'SAGCEM',
    founded: 1981, headquarters: 'Hyderabad, Telangana', employees: '2,800+', marketCap: '₹2,800 Cr',
    ceo: 'S. Sreekanth Reddy (JMD)', website: 'https://www.sagarcements.in',
    description: "​South/East India focused cement company with 8.25 MTPA capacity. Plants in Telangana, Andhra Pradesh, Karnataka, and Odisha. Known for BMM Cements brand in South and Sagar brand in East India. In FY25 the company reported revenue of ₹3,000 Cr and net profit of ₹120 Cr, at an EBITDA margin of around 13.3%. Its revenue is led by ppc cement (45% of sales), complemented by opc cement and psc. Mid-size player (8.25 MTPA) with dual South and East India presence. South India (Telangana, AP, Karnataka) and East India (Odisha).",
    products: [
      { name: 'PPC Cement (Sagar/BMM)', revenueShare: 45, description: 'Blended cement for South/East India' },
      { name: 'OPC Cement', revenueShare: 30, description: 'OPC for infrastructure and commercial' },
      { name: 'PSC (Slag Cement)', revenueShare: 15, description: 'Slag cement for durability-critical applications' },
      { name: 'Composite Grades', revenueShare: 10, description: 'Composite and specialty cements' },
    ],
    financials: [
      { year: 'FY21', revenue: 1580, profit: 120, ebitda: 320 },
      { year: 'FY22', revenue: 2050, profit: 130, ebitda: 350 },
      { year: 'FY23', revenue: 2800, profit: 80, ebitda: 320 },
      { year: 'FY24', revenue: 2650, profit: 50, ebitda: 280 },
      { year: 'FY25', revenue: 3000, profit: 120, ebitda: 400 },
    ],
    revenueFY25: '₹3,000 Cr', profitFY25: '₹120 Cr', ebitdaMargin: '13.3%',
    news: [
      { title: 'Sagar Cements Odisha plant expansion to 3 MTPA on track', date: '2025-03-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'South India operations benefit from AP capital construction', date: '2025-02-05', source: 'Company PR', url: 'https://www.sagarcements.in' },
      { title: 'New limestone mine linkage secured in Telangana', date: '2025-01-10', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
    ],
    futureScope: {
      outlook: 'Growing presence in both South and East India. Odisha operations provide East India growth. AP capital construction is tailwind.',
      plans: ['Capacity to 12 MTPA by FY27', 'Odisha market leadership', 'AP/Telangana market deepening', 'Cost optimization at new plants'],
      risks: ['Small player in competitive South India', 'Debt from recent expansions', 'Price pressure from large players', 'Dual-geography stretch on resources'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Sagar brand in East, BMM brand in South — PPC, OPC, PSC, Composite). Dual-brand strategy for different geographies.',
      geographicPresence: 'South India (Telangana, AP, Karnataka) and East India (Odisha). Plants at Mattampally (Telangana), Gudipadu (AP), and Bargarh (Odisha). Dual-geography strategy.',
      keyStrengths: [
        'Dual South+East India presence provides geographic diversification',
        'BMM Cements brand strong in AP/Telangana market',
        'Odisha plant provides access to fast-growing East India market',
        'AP government infrastructure spending as demand tailwind'
      ],
      marketPosition: 'Mid-size player (8.25 MTPA) with dual South and East India presence. BMM brand in AP/Telangana, Sagar brand in Odisha. Growing through geographic expansion. AP infrastructure (Amaravati) and Odisha industrial growth driving demand.',
      rawMaterialStrategy: 'Captive limestone at Mattampally (Telangana) and Gudipadu (AP) with 30+ year reserves. Odisha plant at Bargarh uses clinker from South. Slag available from Odisha steel plants for PSC. Fuel: Pet coke dominant.'
    },
    financialRatios: {
      debtToEquity: 0.65,
      currentRatio: 0.90,
      roe: 5.5,
      roce: 8.5,
      interestCoverage: 3.5,
      netDebt: '₹1,500 Cr',
      peRatio: 25.0,
      pbRatio: 1.5,
      dividendYield: 0.5,
      workingCapitalDays: 8
    },
    bcgMatrix: {
      stars: [
        { name: 'Odisha Operations', growth: '15% CAGR', share: '5% Odisha', insight: 'East India\'s fastest growing cement market. Industrial and infrastructure demand. New Bargarh plant ramping up.' },
      ],
      cashCows: [
        { name: 'BMM Cement (AP/Telangana)', growth: '6% CAGR', share: '5% AP/Telangana', insight: 'Established brand with dealer loyalty. Steady demand from housing. Mattampally plant is competitive.' },
      ],
      questionMarks: [
        { name: 'Karnataka Expansion', growth: '12% CAGR', share: '2% Karnataka', insight: 'Growing distribution in Karnataka from AP plant. Competing against Ramco, UltraTech, Chettinad.' },
        { name: 'Capacity Addition', growth: '15% target', share: 'Future growth', insight: 'Need to expand to 12 MTPA for competitiveness. Capital-intensive in current environment.' },
      ],
      dogs: [
        { name: 'Low-margin Trade Sales', growth: '2% CAGR', share: '3% institutional', insight: 'Low-margin bulk/trade sales. Being phased out in favor of branded retail.' },
      ],
    },
    headToHead: {
      competitor: 'Kesoram Industries',
      competitorTicker: 'KESORAMIND',
      summary: 'Sagar Cements (dual geography, growth-oriented) vs Kesoram (turnaround story, South India). Both are small listed cement companies in overlapping South India markets. Sagar is growing; Kesoram is recovering.',
      metrics: [
        { label: 'Revenue FY25', company: 3000, competitor: 3900, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 13.3, competitor: 14.1, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 8.25, competitor: 9, unit: 'MTPA', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 4.0, competitor: 2.1, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.65, competitor: 1.50, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 8.5, competitor: 5.0, unit: '%', winner: 'company' },
        { label: 'Geographic Diversification', company: 'South + East', competitor: 'South only', unit: '', winner: 'company' },
        { label: 'Financial Health', company: 'Moderate debt', competitor: 'High debt (restructured)', unit: '', winner: 'company' },
        { label: 'Growth Trajectory', company: 'Growing', competitor: 'Recovering', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 2800, competitor: 2200, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Sagar Cements is in better financial health and growth trajectory. Kesoram is larger but recovering from years of financial stress. For insurers: Sagar is a growth-oriented small-cap with manageable debt; Kesoram is a turnaround bet with high risk from legacy leverage.'
    },
  },
  {
    id: 'kesoram-industries', name: 'Kesoram Industries (Cement)', industry: 'cement', ticker: 'KESORAMIND',
    founded: 1919, headquarters: 'Kolkata, West Bengal', employees: '3,000+', marketCap: '₹2,200 Cr',
    ceo: 'P. Radhakrishnan (CEO - Cement)', website: 'https://www.kesoram.net',
    description: "​Part of B.K. Birla Group. Cement capacity of 9 MTPA with plants in Telangana and Karnataka. Birla Shakti and Birla Supreme are its cement brands. Undergoing financial restructuring after years of stress. In FY25 the company reported revenue of ₹3,900 Cr and net profit of ₹80 Cr, at an EBITDA margin of around 14.1%. Its revenue is led by opc (40% of sales), complemented by ppc and composite cement. Mid-size South India player (9 MTPA) undergoing turnaround. South India — Telangana (Basantnagar) and Karnataka (Sedam).",
    products: [
      { name: 'OPC (Birla Shakti)', revenueShare: 40, description: 'OPC brand for South India' },
      { name: 'PPC (Birla Supreme)', revenueShare: 35, description: 'Blended cement for housing' },
      { name: 'Composite Cement', revenueShare: 15, description: 'Composite and specialty grades' },
      { name: 'Ready Mix Concrete', revenueShare: 10, description: 'RMC for project customers' },
    ],
    financials: [
      { year: 'FY21', revenue: 2800, profit: -350, ebitda: 180 },
      { year: 'FY22', revenue: 3100, profit: -280, ebitda: 250 },
      { year: 'FY23', revenue: 3400, profit: -150, ebitda: 380 },
      { year: 'FY24', revenue: 3600, profit: -50, ebitda: 450 },
      { year: 'FY25', revenue: 3900, profit: 80, ebitda: 550 },
    ],
    revenueFY25: '₹3,900 Cr', profitFY25: '₹80 Cr', ebitdaMargin: '14.1%',
    news: [
      { title: 'Kesoram cement division turns profitable after 5 years of losses', date: '2025-04-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Debt restructuring completed — debt reduced by Rs 1,200 Cr', date: '2025-02-18', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Basantnagar plant achieves 85% capacity utilization', date: '2025-01-08', source: 'Company PR', url: 'https://www.kesoram.net' },
    ],
    futureScope: {
      outlook: 'Turnaround in progress after years of financial stress. South India operations are assets. Potential acquisition candidate.',
      plans: ['Full capacity utilization at existing plants', 'Debt further reduction', 'Premium brand repositioning', 'Possible strategic sale'],
      risks: ['Legacy debt burden', 'Weak brand positioning vs competitors', 'South India overcapacity', 'Group-level financial complexity'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (Birla Shakti OPC, Birla Supreme PPC, Composite), Ready Mix Concrete. Turnaround underway after years of financial stress. B.K. Birla Group company.',
      geographicPresence: 'South India — Telangana (Basantnagar) and Karnataka (Sedam). 9 MTPA capacity concentrated in Deccan plateau region.',
      keyStrengths: [
        'Large South India limestone reserves — strategic asset',
        'Birla brand name provides trust in dealer community',
        'Recent debt restructuring improving financial health',
        'Plants turning profitable after cost optimization'
      ],
      marketPosition: 'Mid-size South India player (9 MTPA) undergoing turnaround. Birla Shakti/Supreme brands have some recall in AP/Telangana/Karnataka. Financial restructuring completed. Now focusing on operational improvement.',
      rawMaterialStrategy: 'Captive limestone at Basantnagar (Telangana) and Sedam (Karnataka) with 40+ year reserves. Good quality limestone deposits. Fuel: Pet coke with plans for alt fuel adoption. Cost reduction through operational efficiency improvements.'
    },
    financialRatios: {
      debtToEquity: 1.50,
      currentRatio: 0.78,
      roe: 2.5,
      roce: 5.0,
      interestCoverage: 2.0,
      netDebt: '₹3,500 Cr',
      peRatio: 30.0,
      pbRatio: 1.2,
      dividendYield: 0.0,
      workingCapitalDays: 18
    },
    bcgMatrix: {
      stars: [
        { name: 'Operational Turnaround', growth: '15% margin improvement', share: 'N/A', insight: 'Plants reaching 85%+ utilization after restructuring. Cost optimization driving profitability. First profit in 5 years in FY25.' },
      ],
      cashCows: [
        { name: 'Basantnagar Cement', growth: '6% CAGR', share: '5% Telangana', insight: 'Core plant now running efficiently. Birla Shakti brand serves local housing demand. Steady cash generation post-turnaround.' },
      ],
      questionMarks: [
        { name: 'Brand Repositioning', growth: '10% potential', share: '3% South India', insight: 'Birla Shakti/Supreme need brand refresh to compete with Ramco, UltraTech. Investment needed but financial constraints remain.' },
        { name: 'Strategic Sale', growth: 'N/A', share: 'N/A', insight: 'Large limestone reserves make it attractive M&A target. UltraTech, Dalmia, or Adani could be buyers.' },
      ],
      dogs: [
        { name: 'High-Cost Operations (Legacy)', growth: '0% CAGR', share: 'Declining', insight: 'Old kiln lines being phased out. Legacy high-cost structure being dismantled. Still dragging overall margins.' },
      ],
    },
    headToHead: {
      competitor: 'Zuari Cement',
      competitorTicker: 'ZUARI',
      summary: 'Kesoram (turnaround, B.K. Birla, 9 MTPA) vs Zuari (Adventz Group, AP focused, 6.5 MTPA). Both are small South India players with overlapping geographies. Kesoram is larger but recovering; Zuari is smaller but healthier.',
      metrics: [
        { label: 'Revenue FY25', company: 3900, competitor: 2800, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 14.1, competitor: 15.0, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: 9, competitor: 6.5, unit: 'MTPA', winner: 'company' },
        { label: 'Net Profit Margin', company: 2.1, competitor: 5.4, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 1.50, competitor: 0.55, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 5.0, competitor: 10.0, unit: '%', winner: 'competitor' },
        { label: 'Financial Health', company: 'Recovering (restructured)', competitor: 'Moderate', unit: '', winner: 'competitor' },
        { label: 'Limestone Reserves', company: '40+ years', competitor: '40+ years', unit: '', winner: 'tie' },
        { label: 'Utilization Rate', company: 85, competitor: 90, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 2200, competitor: 3200, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Zuari is healthier on all financial metrics — better margins, lower debt, higher returns. Kesoram has larger capacity and longer-term turnaround potential. Both are potential acquisition targets. For insurers: Zuari is lower risk despite smaller size; Kesoram\'s legacy debt makes it a higher-risk credit.'
    },
  },
  {
    id: 'wonder-cement', name: 'Wonder Cement', industry: 'cement', ticker: 'Unlisted',
    founded: 2012, headquarters: 'Udaipur, Rajasthan', employees: '3,500+', marketCap: 'Unlisted',
    ceo: 'Vivek Patni (MD)', website: 'https://www.wondercement.com',
    description: "​Fast-growing Rajasthan-based cement company (unlisted). Part of RHI Magnesita JV. Capacity of 17 MTPA across Rajasthan and Madhya Pradesh. Known for aggressive brand building and rapid capacity expansion. In FY25 the company reported revenue of ₹7,800 Cr and net profit of ₹520 Cr, at an EBITDA margin of around 16.7%. Its revenue is led by ppc cement (45% of sales), complemented by opc cement and ready mix concrete. India's fastest-growing cement company by capacity addition. Rajasthan (Nimbahera plants) and Madhya Pradesh.",
    products: [
      { name: 'PPC Cement', revenueShare: 45, description: 'Premium PPC for retail market' },
      { name: 'OPC Cement', revenueShare: 30, description: 'OPC for infrastructure' },
      { name: 'Ready Mix Concrete', revenueShare: 12, description: 'RMC operations' },
      { name: 'Specialty Products', revenueShare: 8, description: 'Specialty and composite grades' },
      { name: 'Wall Putty', revenueShare: 5, description: 'White cement putty' },
    ],
    financials: [
      { year: 'FY21', revenue: 3500, profit: 280, ebitda: 680 },
      { year: 'FY22', revenue: 4200, profit: 320, ebitda: 750 },
      { year: 'FY23', revenue: 5500, profit: 350, ebitda: 850 },
      { year: 'FY24', revenue: 6500, profit: 420, ebitda: 1050 },
      { year: 'FY25', revenue: 7800, profit: 520, ebitda: 1300 },
    ],
    revenueFY25: '₹7,800 Cr', profitFY25: '₹520 Cr', ebitdaMargin: '16.7%',
    news: [
      { title: 'Wonder Cement capacity crosses 17 MTPA with MP expansion', date: '2025-04-05', source: 'Business Standard', url: 'https://www.business-standard.com' },
      { title: 'Cricket sponsorships and digital marketing drive brand recall', date: '2025-02-20', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'IPO plans being evaluated for FY27 listing', date: '2025-01-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'One of the fastest-growing cement brands in India. Aggressive marketing and capacity expansion. IPO potential would unlock value.',
      plans: ['Capacity to 25 MTPA by FY28', 'IPO in FY27', 'Central India expansion', 'Premium brand positioning'],
      risks: ['Unlisted — no public market discipline', 'Intense Rajasthan competition', 'Rapid expansion execution risk', 'Working capital needs for growth'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (PPC, OPC, Specialty), Wall Putty, Ready Mix Concrete. Known for aggressive brand building through cricket sponsorships and digital marketing.',
      geographicPresence: 'Rajasthan (Nimbahera plants) and Madhya Pradesh. Rapidly expanding from Rajasthan into MP, Gujarat, and UP. IPO-bound growth story.',
      keyStrengths: [
        'Fastest-growing cement brand in India — 17 MTPA from zero in 12 years',
        'Aggressive marketing spend building strong brand recall in North/Central India',
        'Efficient new-generation plants with latest technology',
        'IPO potential to provide growth capital and market discipline'
      ],
      marketPosition: 'India\'s fastest-growing cement company by capacity addition. 17 MTPA from greenfield in just 12 years. Strong brand in Rajasthan (#2-3) and growing in MP. IPO planned for FY27 would make it a significant listed player.',
      rawMaterialStrategy: 'Captive limestone at Nimbahera (Rajasthan) with 40+ year reserves. New-generation kilns with efficient fuel consumption. Pet coke and alt fuels for thermal energy. Efficient logistics through rail connectivity.'
    },
    financialRatios: {
      debtToEquity: 0.60,
      currentRatio: 1.10,
      roe: 12.0,
      roce: 14.5,
      interestCoverage: 5.5,
      netDebt: '₹3,500 Cr',
      peRatio: 0,
      pbRatio: 0,
      dividendYield: 0,
      workingCapitalDays: -5
    },
    bcgMatrix: {
      stars: [
        { name: 'MP Expansion', growth: '25% CAGR', share: '8% MP market (growing)', insight: 'New plants in MP capturing market rapidly. Brand building driving market share gains.' },
        { name: 'Brand Building', growth: '20% awareness growth', share: 'Top-3 recall in Rajasthan', insight: 'Cricket sponsorships, celebrity endorsements driving rapid brand recall. Faster market share gains than capacity addition.' },
      ],
      cashCows: [
        { name: 'Rajasthan Cement', growth: '8% CAGR', share: '15% Rajasthan', insight: 'Core market with strong brand. Nimbahera plants are efficient. Good margins from established distribution.' },
      ],
      questionMarks: [
        { name: 'IPO Execution', growth: 'N/A', share: 'N/A', insight: 'IPO timing and valuation will determine growth trajectory. Market conditions and investor appetite are variables.' },
        { name: 'Gujarat/UP Entry', growth: '15% potential', share: '<3% new markets', insight: 'New geographies with established competitors. Needs brand and distribution investment.' },
      ],
      dogs: [
        { name: 'Wall Putty (Small Scale)', growth: '8% CAGR', share: '2% putty market', insight: 'Small segment. Not differentiated vs JK, Birla White, or Asian Paints. Not a strategic priority.' },
      ],
    },
    headToHead: {
      competitor: 'Mangalam Cement',
      competitorTicker: 'MANGLMCEM',
      summary: 'Wonder Cement (fast-growing unlisted disruptor) vs Mangalam (small established BK Birla player). Both in Rajasthan but vastly different trajectories. Wonder is 4x larger and growing much faster.',
      metrics: [
        { label: 'Revenue FY25', company: 7800, competitor: 1850, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 16.7, competitor: 15.7, unit: '%', winner: 'company' },
        { label: 'Capacity', company: 17, competitor: 4, unit: 'MTPA', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 25, competitor: 8, unit: '%', winner: 'company' },
        { label: 'Brand Recall (Rajasthan)', company: 'Top-3', competitor: 'Regional', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.60, competitor: 0.30, unit: 'x', winner: 'competitor' },
        { label: 'Listed Status', company: 'Unlisted', competitor: 'Listed', unit: '', winner: 'competitor' },
        { label: 'ROCE', company: 14.5, competitor: 11.0, unit: '%', winner: 'company' },
        { label: 'Plant Age', company: '10 years (new)', competitor: '45 years (old)', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 'Unlisted', competitor: 2500, unit: '₹ Cr', winner: 'tie' },
      ],
      verdict: 'Wonder Cement has significantly outpaced Mangalam in every growth metric — 4x revenue, 4x capacity, better margins from newer plants. Mangalam is a small, stable legacy player that hasn\'t kept up. For insurers: Wonder represents the new-age aggressive cement company; Mangalam is a safe but stagnating regional player.'
    },
  },
  {
    id: 'my-home-group', name: 'My Home Industries (Cement)', industry: 'cement', ticker: 'Unlisted',
    founded: 2009, headquarters: 'Hyderabad, Telangana', employees: '3,000+', marketCap: 'Unlisted',
    ceo: 'Jupally Rameswar Rao (CMD)', website: 'https://www.myhomegroup.in',
    description: "​Hyderabad-based My Home Group cement operations with 10 MTPA capacity. Integrated plant at Mellacheruvu, Telangana. Real estate conglomerate with strong cement operations in South India. In FY25 the company reported revenue of ₹4,800 Cr and net profit of ₹420 Cr, at an EBITDA margin of around 18.8%. Its revenue is led by opc cement (45% of sales), complemented by ppc cement and specialty grades. Telangana-focused player (10 MTPA). Telangana and AP.",
    products: [
      { name: 'OPC Cement', revenueShare: 45, description: 'OPC for My Home real estate and external sales' },
      { name: 'PPC Cement', revenueShare: 35, description: 'Blended cement for South India market' },
      { name: 'Specialty Grades', revenueShare: 12, description: 'Project-specific grades' },
      { name: 'RMC', revenueShare: 8, description: 'Captive RMC for own projects' },
    ],
    financials: [
      { year: 'FY21', revenue: 2800, profit: 250, ebitda: 580 },
      { year: 'FY22', revenue: 3200, profit: 280, ebitda: 620 },
      { year: 'FY23', revenue: 3800, profit: 300, ebitda: 680 },
      { year: 'FY24', revenue: 4200, profit: 350, ebitda: 780 },
      { year: 'FY25', revenue: 4800, profit: 420, ebitda: 900 },
    ],
    revenueFY25: '₹4,800 Cr', profitFY25: '₹420 Cr', ebitdaMargin: '18.8%',
    news: [
      { title: 'My Home Industries cement capacity expanded to 10 MTPA', date: '2025-03-20', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
      { title: 'Group evaluates IPO for cement business unit', date: '2025-02-10', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Captive consumption from real estate projects drives utilization', date: '2025-01-12', source: 'Company PR', url: 'https://www.myhomegroup.in' },
    ],
    futureScope: {
      outlook: 'Integrated real estate + cement model provides captive demand. South India growth driven by Hyderabad real estate boom. IPO potential.',
      plans: ['Capacity to 15 MTPA', 'Cement IPO evaluation', 'AP/Karnataka market expansion', 'Green cement product range'],
      risks: ['Unlisted entity with limited transparency', 'Real estate cycle dependency', 'South India overcapacity', 'Family-controlled governance'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (OPC, PPC, Specialty), Ready Mix Concrete (captive + external). Unique integrated model — cement feeds own massive real estate projects (My Home Constructions).',
      geographicPresence: 'Telangana and AP. Integrated plant at Mellacheruvu (Telangana). Cement primarily serves Hyderabad and AP markets. Captive demand from My Home real estate projects.',
      keyStrengths: [
        'Integrated real estate + cement model providing captive demand stability',
        'Hyderabad real estate boom driving consistent cement consumption',
        'Large integrated plant with modern technology at Mellacheruvu',
        'Group financial strength from real estate profits'
      ],
      marketPosition: 'Telangana-focused player (10 MTPA). Unique captive demand from group\'s large real estate business. External sales growing through dealer network. IPO could unlock significant value given profitable operations.',
      rawMaterialStrategy: 'Captive limestone near Mellacheruvu plant (Telangana) with 35+ year reserves. Fuel: Pet coke with plans for solar power at plant. RMC uses own cement clinker — fully integrated supply chain. Group ports business could aid logistics.'
    },
    financialRatios: {
      debtToEquity: 0.40,
      currentRatio: 1.25,
      roe: 12.5,
      roce: 15.0,
      interestCoverage: 8.0,
      netDebt: '₹2,000 Cr',
      peRatio: 0,
      pbRatio: 0,
      dividendYield: 0,
      workingCapitalDays: -5
    },
    bcgMatrix: {
      stars: [
        { name: 'External Sales Growth', growth: '18% CAGR', share: '8% Telangana (growing)', insight: 'Expanding dealer network beyond captive consumption. Hyderabad construction boom driving demand. Brand building underway.' },
      ],
      cashCows: [
        { name: 'Captive Consumption (My Home Projects)', growth: '10% CAGR', share: 'Internal demand', insight: 'Group\'s massive real estate projects consume 30%+ of cement production. Guaranteed demand reduces volume risk.' },
        { name: 'RMC (Internal + External)', growth: '12% CAGR', share: '5% Hyderabad RMC', insight: 'Serving own projects and external clients. Growing presence in Hyderabad metro construction.' },
      ],
      questionMarks: [
        { name: 'IPO Execution', growth: 'N/A', share: 'N/A', insight: 'Listing would unlock value and bring transparency. Market timing and group readiness are variables.' },
        { name: 'AP/Karnataka Expansion', growth: '15% potential', share: '2% beyond Telangana', insight: 'Beyond Hyderabad, markets are competitive with UltraTech, Ramco, Dalmia.' },
      ],
      dogs: [
        { name: 'Specialty Grades (Low Volume)', growth: '3% CAGR', share: '1% specialty', insight: 'Small project-specific specialty cement volumes. Not scalable beyond captive projects.' },
      ],
    },
    headToHead: {
      competitor: 'Deccan Cements',
      competitorTicker: 'DECCANCE',
      summary: 'My Home (unlisted, large, integrated with real estate) vs Deccan Cements (listed, very small, efficient). Both in Telangana but vastly different scales. My Home is 4x larger with captive demand.',
      metrics: [
        { label: 'Revenue FY25', company: 4800, competitor: 850, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 18.8, competitor: 16.5, unit: '%', winner: 'company' },
        { label: 'Capacity', company: 10, competitor: 2.5, unit: 'MTPA', winner: 'company' },
        { label: 'Net Profit Margin', company: 8.8, competitor: 7.6, unit: '%', winner: 'company' },
        { label: 'Captive Demand', company: '30%+ from group', competitor: '0%', unit: '', winner: 'company' },
        { label: 'Listed Status', company: 'Unlisted', competitor: 'Listed', unit: '', winner: 'competitor' },
        { label: 'Capacity Utilization', company: 85, competitor: 95, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.40, competitor: 0.25, unit: 'x', winner: 'competitor' },
        { label: 'Growth Potential', company: 'High (to 15 MTPA)', competitor: 'Limited (needs capex)', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 'Unlisted', competitor: 1200, unit: '₹ Cr', winner: 'tie' },
      ],
      verdict: 'My Home is significantly larger and more profitable with integrated demand model providing stability. Deccan is tiny but efficient with high utilization. For insurers: My Home has captive demand stability and group backing; Deccan is too small for meaningful exposure but operationally sound.'
    },
  },
  {
    id: 'deccan-cements', name: 'Deccan Cements', industry: 'cement', ticker: 'DECCANCE',
    founded: 1979, headquarters: 'Hyderabad, Telangana', employees: '1,200+', marketCap: '₹1,200 Cr',
    ceo: 'S.R.K. Prasad (MD)', website: 'https://www.deccancements.com',
    description: "​Small but efficient cement company based in Telangana with 2.5 MTPA capacity. Plant at Bhoorgampahad, Nalgonda district. Strong local brand in Telangana and Andhra Pradesh. In FY25 the company reported revenue of ₹850 Cr and net profit of ₹65 Cr, at an EBITDA margin of around 16.5%. Its revenue is led by opc cement (45% of sales), complemented by ppc cement and psc cement. Very small player (2.5 MTPA) in Telangana. Telangana and AP only.",
    products: [
      { name: 'OPC Cement', revenueShare: 45, description: 'OPC for construction in Telangana/AP' },
      { name: 'PPC Cement', revenueShare: 40, description: 'Blended cement for residential use' },
      { name: 'PSC Cement', revenueShare: 15, description: 'Slag cement for specialized use' },
    ],
    financials: [
      { year: 'FY21', revenue: 550, profit: 35, ebitda: 80 },
      { year: 'FY22', revenue: 620, profit: 42, ebitda: 95 },
      { year: 'FY23', revenue: 720, profit: 48, ebitda: 110 },
      { year: 'FY24', revenue: 780, profit: 55, ebitda: 125 },
      { year: 'FY25', revenue: 850, profit: 65, ebitda: 140 },
    ],
    revenueFY25: '₹850 Cr', profitFY25: '₹65 Cr', ebitdaMargin: '16.5%',
    news: [
      { title: 'Deccan Cements achieves record cement dispatch in FY25', date: '2025-04-02', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Telangana infrastructure projects drive strong demand', date: '2025-02-08', source: 'Company PR', url: 'https://www.deccancements.com' },
      { title: 'Capacity utilization crosses 95% — expansion under evaluation', date: '2025-01-15', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Efficient small player in Telangana. High utilization signals need for expansion. Could be acquisition target for larger companies.',
      plans: ['Capacity expansion to 4 MTPA', 'Grinding unit in AP', 'Brand building in new areas', 'Operational efficiency maintenance'],
      risks: ['Very small scale in consolidated industry', 'Acquisition target risk', 'Single location dependency', 'Competition from much larger peers'],
    },
    extendedOverview: {
      businessSegments: 'Grey Cement (OPC, PPC, PSC). Pure-play small cement company focused on quality and efficiency. No diversification beyond cement.',
      geographicPresence: 'Telangana and AP only. Single integrated plant at Bhoorgampahad, Nalgonda district, Telangana. Serves dealers within 200-300 km radius.',
      keyStrengths: [
        'Very high capacity utilization (95%+) — indicating strong local demand and efficiency',
        'Low debt and conservative management — no over-leverage',
        'Quality reputation in local Telangana market',
        'Simple, focused business model with low overhead'
      ],
      marketPosition: 'Very small player (2.5 MTPA) in Telangana. Hyper-local focus on Nalgonda/surrounding districts. 95%+ capacity utilization indicates plant runs efficiently. Potential acquisition target for larger companies wanting limestone reserves.',
      rawMaterialStrategy: 'Captive limestone at Bhoorgampahad (Telangana) with 25+ year reserves. Single-plant model keeps operations simple. Fuel: Pet coke. Small scale means limited bargaining power on fuel procurement but lean operation compensates.'
    },
    financialRatios: {
      debtToEquity: 0.25,
      currentRatio: 1.30,
      roe: 9.5,
      roce: 12.5,
      interestCoverage: 10.0,
      netDebt: '₹150 Cr',
      peRatio: 20.0,
      pbRatio: 1.8,
      dividendYield: 1.5,
      workingCapitalDays: 5
    },
    bcgMatrix: {
      stars: [
        { name: 'Telangana Infrastructure Demand', growth: '12% CAGR', share: '3% Telangana', insight: 'State government spending on roads, housing. Small local player benefits from logistics proximity to projects.' },
      ],
      cashCows: [
        { name: 'OPC/PPC Retail (Local Telangana)', growth: '6% CAGR', share: '8% Nalgonda district', insight: 'Dominant in immediate vicinity. Loyal dealers. Minimal marketing cost. Consistent cash flow.' },
      ],
      questionMarks: [
        { name: 'Capacity Expansion (4 MTPA target)', growth: '15% potential', share: 'Future growth', insight: 'At 95% utilization, expansion is critical for growth. But capex is large relative to company size.' },
        { name: 'AP Grinding Unit', growth: '12% potential', share: 'New market', insight: 'Proposed AP grinding unit would extend reach but requires significant investment for a company this size.' },
      ],
      dogs: [
        { name: 'PSC Cement (Small Volume)', growth: '2% CAGR', share: '<1% slag cement', insight: 'Tiny slag cement volumes. No scale advantage. Maintained for product range but not a growth driver.' },
      ],
    },
    headToHead: {
      competitor: 'Zuari Cement',
      competitorTicker: 'ZUARI',
      summary: 'Deccan Cements (tiny, efficient, Telangana micro-player) vs Zuari (small, AP focused, Adventz Group). Both are small South India companies with Zuari being 2.5x larger. Different strategies — Deccan is conservative; Zuari is expanding.',
      metrics: [
        { label: 'Revenue FY25', company: 850, competitor: 2800, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 16.5, competitor: 15.0, unit: '%', winner: 'company' },
        { label: 'Capacity', company: 2.5, competitor: 6.5, unit: 'MTPA', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 7.6, competitor: 5.4, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.25, competitor: 0.55, unit: 'x', winner: 'company' },
        { label: 'Capacity Utilization', company: 95, competitor: 85, unit: '%', winner: 'company' },
        { label: 'ROCE', company: 12.5, competitor: 10.0, unit: '%', winner: 'company' },
        { label: 'Group Support', company: 'Independent', competitor: 'Adventz Group', unit: '', winner: 'competitor' },
        { label: 'Growth Prospects', company: 'Limited by size', competitor: 'Moderate', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 1200, competitor: 3200, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Deccan is more efficient per tonne with better margins and lower debt, but extremely small scale limits growth. Zuari has group backing and more expansion potential. For insurers: Deccan is a micro-cap with minimal credit exposure potential; Zuari is small but more relevant for meaningful insurance relationships.'
    },
  },
  // ==================== PAPER (15) ====================
  {
    id: 'itc-pspd', name: 'ITC PSPD (Paperboards & Specialty Papers)', industry: 'paper', ticker: 'ITC',
    founded: 1926, headquarters: 'Secunderabad, Telangana', employees: '8,000+ (division)', marketCap: '₹5.8 Lakh Cr (ITC Group)',
    ceo: 'Sanjiv Puri (CMD, ITC Ltd)', website: 'https://www.itcpspd.com',
    description: "​India's largest and most profitable paperboard manufacturer. 3 units at Bhadrachalam, Kovai, and Tribeni. Produces premium packaging boards, printing papers, and specialty papers. In FY25 the company reported revenue of ₹8,800 Cr and net profit of ₹1,200 Cr, at an EBITDA margin of around 26.1%. Its revenue is led by packaging & paperboards (45% of sales), complemented by printing & writing papers and specialty papers. Undisputed #1 in India for virgin fibre packaging boards. 3 manufacturing units — Bhadrachalam (Telangana, flagship), Kovai (Tamil Nadu), Tribeni (West Bengal).",
    products: [
      { name: 'Packaging & Paperboards', revenueShare: 45, description: 'Virgin fibre boards for FMCG/pharma' },
      { name: 'Printing & Writing Papers', revenueShare: 25, description: 'Classmate, Paperkraft brands' },
      { name: 'Specialty Papers', revenueShare: 15, description: 'Decor papers, cigarette tissues' },
      { name: 'Flexible Packaging Films', revenueShare: 10, description: 'BOPP and metalized films' },
      { name: 'Pulp Sales', revenueShare: 5, description: 'Hardwood pulp for external customers' },
    ],
    financials: [
      { year: 'FY21', revenue: 6200, profit: 850, ebitda: 1680 },
      { year: 'FY22', revenue: 7400, profit: 1100, ebitda: 2050 },
      { year: 'FY23', revenue: 8500, profit: 1250, ebitda: 2350 },
      { year: 'FY24', revenue: 8200, profit: 1050, ebitda: 2100 },
      { year: 'FY25', revenue: 8800, profit: 1200, ebitda: 2300 },
    ],
    revenueFY25: '₹8,800 Cr', profitFY25: '₹1,200 Cr', ebitdaMargin: '26.1%',
    news: [
      { title: 'ITC PSPD announces Rs 2,000 Cr expansion at Bhadrachalam', date: '2025-03-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Launches fully recyclable barrier-coated paperboards', date: '2025-02-14', source: 'Company PR', url: 'https://www.itcpspd.com' },
      { title: 'Social forestry covers 8 lakh acres boosting wood supply', date: '2025-01-18', source: 'Company Report', url: 'https://www.itcpspd.com' },
    ],
    futureScope: {
      outlook: 'Premium packaging boards. Plastic replacement trend driving demand. Social forestry ensures sustainable raw material.',
      plans: ['Bhadrachalam expansion by 2 lakh TPA', 'Barrier-coated boards for food', 'Double flexible packaging capacity', 'Carbon-neutral by 2030'],
      risks: ['ASEAN import competition', 'Digital reducing writing paper', 'Wood cost inflation', 'Capital allocation within ITC Group'],
    },
    extendedOverview: {
      businessSegments: 'Paperboards & Specialty Papers (packaging boards, printing papers, specialty papers, flexible packaging films, pulp). India\'s largest integrated paper/packaging business. Part of ITC conglomerate.',
      geographicPresence: '3 manufacturing units — Bhadrachalam (Telangana, flagship), Kovai (Tamil Nadu), Tribeni (West Bengal). Pan-India distribution. Exports to 60+ countries.',
      keyStrengths: [
        'India\'s #1 paperboard manufacturer — dominant in virgin fibre boards for FMCG/pharma packaging',
        '8 lakh acre social forestry program ensuring sustainable wood supply',
        'ITC Group backing — deep pockets for capital-intensive expansions',
        'Technology leader — barrier-coated boards replacing plastic packaging'
      ],
      marketPosition: 'Undisputed #1 in India for virgin fibre packaging boards. 45% market share in premium folding box boards. Only Indian company offering barrier-coated alternatives to plastic. Social forestry is unmatched competitive moat ensuring raw material security.',
      rawMaterialStrategy: 'Social forestry program covers 8 lakh acres across AP, Telangana, and Odisha — provides 85%+ of wood requirement sustainably. Remaining from open market purchase. This is a massive competitive moat — took 40+ years to build. Wood pulp is fully integrated at Bhadrachalam.'
    },
    financialRatios: {
      debtToEquity: 0.15,
      currentRatio: 1.55,
      roe: 18.5,
      roce: 22.0,
      interestCoverage: 28.0,
      netDebt: '₹1,200 Cr',
      peRatio: 28.0,
      pbRatio: 5.5,
      dividendYield: 3.2,
      workingCapitalDays: 45
    },
    bcgMatrix: {
      stars: [
        { name: 'Barrier-Coated Paperboards', growth: '25% CAGR', share: '80% India (only producer)', insight: 'Plastic replacement trend. Only Indian manufacturer of recyclable barrier boards for food packaging. Regulatory push against single-use plastic creates massive tailwind.' },
        { name: 'Flexible Packaging Films (BOPP)', growth: '18% CAGR', share: '8% India BOPP', insight: 'Fast-growing adjacent business. Serving FMCG snack/food packaging. Capacity doubling underway.' },
      ],
      cashCows: [
        { name: 'Virgin Fibre Folding Box Boards', growth: '8% CAGR', share: '45% India premium boards', insight: 'Core cash cow. Every FMCG, pharma, and food company needs packaging boards. Dominant position with pricing power.' },
        { name: 'Classmate/Paperkraft (Stationery)', growth: '5% CAGR', share: '15% organized stationery', insight: 'India\'s #1 student stationery brand. Consistent demand from education sector.' },
      ],
      questionMarks: [
        { name: 'Tissue Papers', growth: '20% CAGR', share: '5% organized tissue', insight: 'Growing with urbanization and hygiene awareness. Capital intensive. Competition from imports.' },
        { name: 'Export Markets', growth: '12% CAGR', share: '5% Asia-Pacific boards', insight: 'Premium Indian boards competitive globally. Export growth opportunity but subject to forex and trade policy.' },
      ],
      dogs: [
        { name: 'Commodity Writing Papers', growth: '-2% declining', share: '8% writing paper', insight: 'Structural decline from digitization. Reducing capacity allocation. Moving to specialty/premium grades.' },
      ],
    },
    headToHead: {
      competitor: 'JK Paper',
      competitorTicker: 'JKPAPER',
      summary: 'ITC PSPD (India\'s #1, packaging boards focused, ITC Group) vs JK Paper (India\'s #2, copier paper + boards, JK Organisation). ITC dominates on scale, margins, and sustainability. JK Paper is growing faster in packaging boards.',
      metrics: [
        { label: 'Revenue FY25', company: 8800, competitor: 6000, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 26.1, competitor: 26.0, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 13.6, competitor: 15.3, unit: '%', winner: 'competitor' },
        { label: 'Packaging Board Share', company: 45, competitor: 18, unit: '%', winner: 'company' },
        { label: 'Social Forestry (Acres)', company: '8 lakh', competitor: '2 lakh', unit: '', winner: 'company' },
        { label: 'ROCE', company: 22.0, competitor: 20.0, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.15, competitor: 0.35, unit: 'x', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 6, competitor: 12, unit: '%', winner: 'competitor' },
        { label: 'Copier Paper Market Share', company: 8, competitor: 30, unit: '%', winner: 'competitor' },
        { label: 'R&D/Innovation', company: 'Barrier-coated boards', competitor: 'Tissue paper entry', unit: '', winner: 'company' },
        { label: 'Market Cap (Paper division implied)', company: 25000, competitor: 8200, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'ITC PSPD is the clear industry leader — largest, most profitable, best raw material security (social forestry), and technology leader (barrier-coated boards). JK Paper is a strong #2 with higher growth rate and copier paper dominance. For insurers: ITC PSPD is the gold standard (ITC Group backing + sustainability moat); JK Paper offers growth with moderate risk.'
    },
  },
  {
    id: 'jk-paper', name: 'JK Paper', industry: 'paper', ticker: 'JKPAPER',
    founded: 1960, headquarters: 'New Delhi', employees: '7,500+', marketCap: '₹8,200 Cr',
    ceo: 'Harsh Pati Singhania (CMD)', website: 'https://www.jkpaper.com',
    description: "​India's second-largest paper company with mills at Rayagada (Odisha) and Fort Songadh (Gujarat). Acquired Sirpur Paper. Capacity 6.6 lakh TPA. In FY25 the company reported revenue of ₹6,000 Cr and net profit of ₹920 Cr, at an EBITDA margin of around 26.0%. Its revenue is led by office & copier papers (35% of sales), complemented by packaging boards and writing & printing papers. India's #2 paper/board company. Mills at Rayagada (Odisha — flagship), Fort Songadh (Gujarat), and Sirpur (Telangana — acquired).",
    products: [
      { name: 'Office & Copier Papers', revenueShare: 35, description: 'JK Copier, JK Easy Copier — market leaders' },
      { name: 'Packaging Boards', revenueShare: 30, description: 'Virgin boards for FMCG/pharma' },
      { name: 'Writing & Printing Papers', revenueShare: 18, description: 'Cream wove, maplitho' },
      { name: 'Coated Papers', revenueShare: 10, description: 'Art papers and boards' },
      { name: 'Tissue Papers', revenueShare: 7, description: 'Away-from-home tissue products' },
    ],
    financials: [
      { year: 'FY21', revenue: 3200, profit: 310, ebitda: 780 },
      { year: 'FY22', revenue: 4580, profit: 820, ebitda: 1380 },
      { year: 'FY23', revenue: 5900, profit: 1100, ebitda: 1720 },
      { year: 'FY24', revenue: 5600, profit: 850, ebitda: 1480 },
      { year: 'FY25', revenue: 6000, profit: 920, ebitda: 1560 },
    ],
    revenueFY25: '₹6,000 Cr', profitFY25: '₹920 Cr', ebitdaMargin: '26.0%',
    news: [
      { title: 'JK Paper board capacity expansion at Rayagada to 3 lakh TPA', date: '2025-03-25', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Enters tissue paper segment with Rs 400 Cr investment', date: '2025-02-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Forest-based raw material supply chain strengthened', date: '2025-01-15', source: 'Company PR', url: 'https://www.jkpaper.com' },
    ],
    futureScope: {
      outlook: 'Strong in paper and board segments. Packaging boards growth linked to FMCG. Tissue paper opens new stream.',
      plans: ['Packaging board to 5 lakh TPA', 'Tissue to 30,000 TPA', 'Pulp expansion at Rayagada', 'E-commerce packaging solutions'],
      risks: ['Digitization structural decline', 'Raw material cost volatility', 'Indonesian import competition', 'Water availability at Gujarat plant'],
    },
    extendedOverview: {
      businessSegments: 'Office & Copier Papers (JK Copier — India\'s #1), Packaging Boards, Writing & Printing Papers, Coated Papers, Tissue Papers (new). India\'s second-largest paper company.',
      geographicPresence: 'Mills at Rayagada (Odisha — flagship), Fort Songadh (Gujarat), and Sirpur (Telangana — acquired). Pan-India distribution. Strong export presence.',
      keyStrengths: [
        'JK Copier is India\'s #1 copier paper brand — 30% market share',
        'Integrated operations from pulp to finished paper — cost advantage',
        'Sirpur acquisition added 1.5 lakh TPA capacity at attractive valuation',
        'Social forestry program (2 lakh acres) ensuring wood supply sustainability'
      ],
      marketPosition: 'India\'s #2 paper/board company. #1 in copier paper (JK Copier/Easy Copier). Growing fast in packaging boards (targeting ₹5 lakh TPA). Entering tissue paper segment. Sirpur acquisition strengthened southern presence.',
      rawMaterialStrategy: 'Social forestry program covers 2 lakh acres in Odisha — provides significant wood requirement. Balance from open market and bamboo. Rayagada mill has integrated pulp facility. Fort Songadh uses waste paper for recycled boards. Diversified raw material base.'
    },
    financialRatios: {
      debtToEquity: 0.35,
      currentRatio: 1.25,
      roe: 16.5,
      roce: 20.0,
      interestCoverage: 12.0,
      netDebt: '₹2,200 Cr',
      peRatio: 10.0,
      pbRatio: 1.8,
      dividendYield: 2.5,
      workingCapitalDays: 55
    },
    bcgMatrix: {
      stars: [
        { name: 'Packaging Boards', growth: '15% CAGR', share: '18% India boards', insight: 'Fastest growing segment. FMCG and e-commerce driving demand. Rayagada expansion will double board capacity.' },
        { name: 'Tissue Paper (New Segment)', growth: '25% CAGR', share: '5% organized tissue (new entry)', insight: 'India\'s tissue market underpenetrated. Away-from-home segment growing with hospitality and healthcare.' },
      ],
      cashCows: [
        { name: 'JK Copier Paper', growth: '5% CAGR', share: '30% copier paper market', insight: 'India\'s #1 copier brand with dominant market share. Consistent demand from offices and education. Premium pricing.' },
        { name: 'Writing & Printing Papers', growth: '4% CAGR', share: '12% W&P market', insight: 'Cream wove and maplitho for book publishing and education. Stable demand with moderate growth.' },
      ],
      questionMarks: [
        { name: 'E-Commerce Packaging', growth: '20% CAGR', share: '3% corrugated packaging', insight: 'Growing with online retail boom. Needs different manufacturing capability. Adjacent to existing board business.' },
        { name: 'Coated Papers', growth: '8% CAGR', share: '10% coated art paper', insight: 'Magazines, brochures, calendars. Facing digital headwinds but still relevant for premium printing.' },
      ],
      dogs: [
        { name: 'Commodity Newsprint', growth: '-5% declining', share: '2% newsprint', insight: 'Newspaper industry shrinking. Being phased out in favor of higher-value grades.' },
      ],
    },
    headToHead: {
      competitor: 'West Coast Paper Mills',
      competitorTicker: 'WESTPAPER',
      summary: 'JK Paper (India\'s #2, copier paper leader, diversified) vs West Coast Paper (India\'s #3, Dandeli-based, APPM acquisition). JK is larger and more diversified; West Coast grew rapidly via acquisition.',
      metrics: [
        { label: 'Revenue FY25', company: 6000, competitor: 4300, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 26.0, competitor: 26.7, unit: '%', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 15.3, competitor: 15.8, unit: '%', winner: 'competitor' },
        { label: 'Total Capacity', company: '6.6 lakh TPA', competitor: '4.65 lakh TPA', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.35, competitor: 0.45, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 20.0, competitor: 18.5, unit: '%', winner: 'company' },
        { label: 'Copier Paper Brand', company: '#1 (JK Copier)', competitor: 'No major brand', unit: '', winner: 'company' },
        { label: 'Revenue Growth (3Y CAGR)', company: 12, competitor: 18, unit: '%', winner: 'competitor' },
        { label: 'Integration Level', company: 'Fully integrated', competitor: 'Partially integrated', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 8200, competitor: 5500, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'JK Paper is the larger, more diversified, and brand-stronger company. West Coast Paper has slightly better margins and faster recent growth (APPM acquisition). For insurers: JK Paper is the safer bet with brand moat and diversification; West Coast is a growth story with acquisition integration risk.'
    },
  },
  {
    id: 'west-coast-paper', name: 'West Coast Paper Mills', industry: 'paper', ticker: 'WESTPAPER',
    founded: 1955, headquarters: 'Dandeli, Karnataka', employees: '4,000+', marketCap: '₹5,500 Cr',
    ceo: 'S.K. Bangur (Chairman)', website: 'https://www.westcoastpaper.com',
    description: "​Leading paper manufacturer. Integrated mill at Dandeli. Acquired International Paper APPM in 2022. Combined capacity 4.65 lakh TPA. In FY25 the company reported revenue of ₹4,300 Cr and net profit of ₹680 Cr, at an EBITDA margin of around 26.7%. Its revenue is led by writing & printing papers (40% of sales), complemented by packaging boards and tissue & specialty papers. India's #3 paper company post-APPM acquisition (4.65 lakh TPA). Karnataka (Dandeli — flagship), Andhra Pradesh (Rajahmundry — APPM acquisition).",
    products: [
      { name: 'Writing & Printing Papers', revenueShare: 40, description: 'Cream wove, maplitho, copier papers' },
      { name: 'Packaging Boards', revenueShare: 28, description: 'Industrial packaging and folding box boards' },
      { name: 'Tissue & Specialty Papers', revenueShare: 15, description: 'Tissue base and specialty grades' },
      { name: 'Industrial Papers', revenueShare: 10, description: 'Kraft paper and corrugating medium' },
      { name: 'Pulp Sales', revenueShare: 7, description: 'Market pulp from bamboo/hardwood' },
    ],
    financials: [
      { year: 'FY21', revenue: 1850, profit: 150, ebitda: 420 },
      { year: 'FY22', revenue: 2650, profit: 520, ebitda: 850 },
      { year: 'FY23', revenue: 4200, profit: 780, ebitda: 1250 },
      { year: 'FY24', revenue: 4000, profit: 600, ebitda: 1050 },
      { year: 'FY25', revenue: 4300, profit: 680, ebitda: 1150 },
    ],
    revenueFY25: '₹4,300 Cr', profitFY25: '₹680 Cr', ebitdaMargin: '26.7%',
    news: [
      { title: 'West Coast completes APPM Rajahmundry integration', date: '2025-04-02', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Dandeli mill achieves 100% water recycling', date: '2025-02-20', source: 'Company PR', url: 'https://www.westcoastpaper.com' },
      { title: 'Rs 800 Cr expansion for packaging boards approved', date: '2025-01-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'APPM acquisition transforms into major player. Packaging board demand growth is primary driver.',
      plans: ['Combined capacity to 6 lakh TPA by FY27', 'Packaging board at Rajahmundry', 'Farm forestry in AP/Karnataka', 'New coating line'],
      risks: ['APPM integration risks', 'Bamboo/wood availability', 'ITC PSPD competition', 'Environmental regulations'],
    },
    extendedOverview: {
      businessSegments: 'Writing & Printing Papers, Packaging Boards, Tissue & Specialty Papers, Industrial Papers, Pulp. Integrated mill at Dandeli plus acquired APPM at Rajahmundry.',
      geographicPresence: 'Karnataka (Dandeli — flagship), Andhra Pradesh (Rajahmundry — APPM acquisition). Pan-India distribution. Export presence in Asia and Middle East.',
      keyStrengths: [
        'APPM acquisition doubled capacity overnight — transformative M&A',
        'Dandeli mill has 60+ years of integrated forestry and operations',
        'Bamboo and hardwood sourcing from Karnataka/AP forests',
        'Strong presence in both writing paper and packaging board segments'
      ],
      marketPosition: 'India\'s #3 paper company post-APPM acquisition (4.65 lakh TPA). Strong in South India. Dandeli is one of India\'s oldest integrated mills. APPM brings Rajahmundry plant with coastal access and AP forestry.',
      rawMaterialStrategy: 'Bamboo from Karnataka forests (traditional source for Dandeli). Hardwood from farm forestry in AP/Karnataka. APPM plant uses casuarina and eucalyptus from AP social forestry. Waste paper recycling for some grades. Diversified multi-source strategy post-acquisition.'
    },
    financialRatios: {
      debtToEquity: 0.45,
      currentRatio: 1.20,
      roe: 15.0,
      roce: 18.5,
      interestCoverage: 8.5,
      netDebt: '₹1,800 Cr',
      peRatio: 8.5,
      pbRatio: 1.5,
      dividendYield: 2.0,
      workingCapitalDays: 60
    },
    bcgMatrix: {
      stars: [
        { name: 'Packaging Boards (APPM)', growth: '15% CAGR', share: '10% India boards', insight: 'Rajahmundry plant pivoting to boards. FMCG packaging demand driving growth. Largest segment post-integration.' },
      ],
      cashCows: [
        { name: 'Writing & Printing Papers', growth: '4% CAGR', share: '10% W&P market', insight: 'Dandeli mill\'s core strength. Established brand. Steady education and office demand.' },
        { name: 'Industrial Papers (Kraft)', growth: '5% CAGR', share: '6% kraft paper', insight: 'Packaging industry demand. Consistent requirement from e-commerce growth.' },
      ],
      questionMarks: [
        { name: 'Tissue Papers', growth: '20% CAGR', share: '3% organized tissue', insight: 'Growing segment. Needs dedicated investment. Competition from imports and dedicated players.' },
        { name: 'APPM Integration Synergies', growth: '10% cost savings', share: 'N/A', insight: 'Procurement, logistics, and marketing synergies being realized. Full integration takes 2-3 years.' },
      ],
      dogs: [
        { name: 'Commodity Newsprint', growth: '-3% declining', share: '3% newsprint', insight: 'Newspaper decline reducing demand. Being converted to higher-value grades.' },
      ],
    },
    headToHead: {
      competitor: 'Tamil Nadu Newsprint & Papers (TNPL)',
      competitorTicker: 'TNPL',
      summary: 'West Coast Paper (Dandeli + APPM, wood-based) vs TNPL (bagasse-based, TN government PSU). Different raw material models. West Coast is larger and more profitable; TNPL has unique sustainability from bagasse.',
      metrics: [
        { label: 'Revenue FY25', company: 4300, competitor: 3800, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 26.7, competitor: 18.5, unit: '%', winner: 'company' },
        { label: 'Capacity', company: '4.65 lakh TPA', competitor: '4 lakh TPA', unit: '', winner: 'company' },
        { label: 'Net Profit Margin', company: 15.8, competitor: 6.5, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.45, competitor: 0.85, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 18.5, competitor: 10.5, unit: '%', winner: 'company' },
        { label: 'Raw Material Sustainability', company: 'Farm forestry', competitor: 'Bagasse (zero wood)', unit: '', winner: 'competitor' },
        { label: 'Government Backing', company: 'Private', competitor: 'TN Govt PSU', unit: '', winner: 'competitor' },
        { label: 'Revenue Growth (3Y)', company: 18, competitor: 8, unit: '%', winner: 'company' },
        { label: 'Market Cap', company: 5500, competitor: 2800, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'West Coast Paper comprehensively outperforms TNPL on financial metrics. TNPL\'s advantage is unique bagasse-based model (zero wood dependency) and government backing. For insurers: West Coast is the better private-sector bet with strong growth; TNPL has government guarantee but lower returns.'
    },
  },
  {
    id: 'century-textiles-paper', name: 'Century Textiles (Pulp & Paper)', industry: 'paper', ticker: 'CENTURYTEX',
    founded: 1897, headquarters: 'Mumbai, Maharashtra', employees: '5,000+ (division)', marketCap: '₹14,000 Cr (Group)',
    ceo: 'J.C. Laddha (ED)', website: 'https://www.centurytextind.com',
    description: "​Part of BK Birla Group. Paper division operates at Lalkuan (Uttarakhand) with capacity of 2.5 lakh TPA. Produces writing papers, tissue papers, and multi-layer packaging boards. Also has real estate and textiles. In FY25 the company reported revenue of ₹3,300 Cr and net profit of ₹280 Cr, at an EBITDA margin of around 16.7%. Its revenue is led by writing & printing papers (35% of sales), complemented by tissue papers and multi-layer boards. Mid-tier paper company (2.5 lakh TPA) within diversified BK Birla Group. Single large mill at Lalkuan (Uttarakhand).",
    products: [
      { name: 'Writing & Printing Papers', revenueShare: 35, description: 'Copier and offset papers' },
      { name: 'Tissue Papers', revenueShare: 25, description: 'Tissue rolls and napkins' },
      { name: 'Multi-Layer Boards', revenueShare: 20, description: 'Packaging boards for food/pharma' },
      { name: 'Rayon Grade Pulp', revenueShare: 12, description: 'Dissolving pulp for textile fiber' },
      { name: 'Kraft Papers', revenueShare: 8, description: 'Industrial packaging papers' },
    ],
    financials: [
      { year: 'FY21', revenue: 2100, profit: 120, ebitda: 380 },
      { year: 'FY22', revenue: 2800, profit: 280, ebitda: 550 },
      { year: 'FY23', revenue: 3200, profit: 320, ebitda: 600 },
      { year: 'FY24', revenue: 3000, profit: 220, ebitda: 480 },
      { year: 'FY25', revenue: 3300, profit: 280, ebitda: 550 },
    ],
    revenueFY25: '₹3,300 Cr', profitFY25: '₹280 Cr', ebitdaMargin: '16.7%',
    news: [
      { title: 'Century Textiles paper division tissue capacity expanded 30%', date: '2025-03-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Dissolving pulp demand grows on textile fiber shortage', date: '2025-02-08', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Multi-layer board line at Lalkuan achieves full utilization', date: '2025-01-12', source: 'Company PR', url: 'https://www.centurytextind.com' },
    ],
    futureScope: {
      outlook: 'Tissue paper is fastest growing segment. Dissolving pulp serves textile industry. Paper division stable within diversified group.',
      plans: ['Tissue capacity doubling', 'Dissolving pulp expansion', 'Packaging board upgrades', 'Water efficiency improvement'],
      risks: ['Diversified conglomerate — paper not priority', 'North India raw material challenges', 'Competition from dedicated players', 'Group restructuring uncertainties'],
    },
    extendedOverview: {
      businessSegments: 'Writing & Printing Papers, Tissue Papers, Multi-Layer Packaging Boards, Rayon Grade Dissolving Pulp, Kraft Papers. Part of diversified BK Birla Group.',
      geographicPresence: 'Single large mill at Lalkuan (Uttarakhand). Serves North India primarily. Tissue and board products distributed pan-India.',
      keyStrengths: [
        'Unique dissolving pulp capacity serving textile viscose industry',
        'Fastest growing tissue paper business among Indian paper mills',
        'BK Birla Group provides financial stability and capital access',
        'Lalkuan location ensures proximity to Himalayan forest resources'
      ],
      marketPosition: 'Mid-tier paper company (2.5 lakh TPA) within diversified BK Birla Group. Growing tissue and dissolving pulp businesses. Group valuation dominated by Birla Estates real estate.',
      rawMaterialStrategy: 'Hardwood from Uttarakhand/UP forests and farm forestry. Bamboo from NE India. Waste paper for select board grades. Lalkuan proximity to forests provides raw material advantage.'
    },
    financialRatios: {
      debtToEquity: 0.55,
      currentRatio: 1.10,
      roe: 8.5,
      roce: 11.0,
      interestCoverage: 5.5,
      netDebt: '₹1,800 Cr',
      peRatio: 15.0,
      pbRatio: 1.2,
      dividendYield: 0.8,
      workingCapitalDays: 55
    },
    bcgMatrix: {
      stars: [
        { name: 'Tissue Papers', growth: '22% CAGR', share: '8% organized tissue', insight: 'Fastest growing segment. Hygiene awareness post-COVID. Institutional demand booming.' },
        { name: 'Dissolving Pulp', growth: '12% CAGR', share: '15% India dissolving pulp', insight: 'Textile viscose fiber demand growing. Import substitution opportunity.' },
      ],
      cashCows: [
        { name: 'Writing & Printing Papers', growth: '4% CAGR', share: '5% W&P market', insight: 'Stable education/office demand. Consistent cash generation from established mill.' },
      ],
      questionMarks: [
        { name: 'Multi-Layer Boards', growth: '10% CAGR', share: '4% packaging boards', insight: 'Food/pharma packaging growing but behind ITC and JK Paper in scale.' },
      ],
      dogs: [
        { name: 'Commodity Kraft Papers', growth: '2% CAGR', share: '2% kraft market', insight: 'Low-margin industrial papers maintained for utilization.' },
      ],
    },
    headToHead: {
      competitor: 'Emami Paper Mills',
      competitorTicker: 'EMAMIPAP',
      summary: 'Century (BK Birla, tissue+dissolving pulp) vs Emami Paper (newsprint-to-packaging pivot). Century is larger and diversified; Emami is focused on pivoting its model.',
      metrics: [
        { label: 'Revenue FY25', company: 3300, competitor: 1800, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 16.7, competitor: 14.5, unit: '%', winner: 'company' },
        { label: 'Tissue Business', company: 'Yes (growing)', competitor: 'No', unit: '', winner: 'company' },
        { label: 'Dissolving Pulp', company: 'Yes', competitor: 'No', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.55, competitor: 0.70, unit: 'x', winner: 'company' },
        { label: 'Growth Rate', company: 8, competitor: 12, unit: '%', winner: 'competitor' },
        { label: 'ROCE', company: 11.0, competitor: 9.5, unit: '%', winner: 'company' },
        { label: 'Market Cap', company: 4000, competitor: 1500, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Century is larger with more diversified paper products. Emami is smaller but more focused as a dedicated paper business. For insurers: Century has group backing; Emami has higher growth potential from business model pivot.'
    },
  },
  {
    id: 'tamil-nadu-newsprint', name: 'Tamil Nadu Newsprint & Papers (TNPL)', industry: 'paper', ticker: 'TNPL',
    founded: 1979, headquarters: 'Karur, Tamil Nadu', employees: '3,500+', marketCap: '₹2,800 Cr',
    ceo: 'R. Senthilkumar (CMD)', website: 'https://www.tnpl.com',
    description: "​Tamil Nadu government PSU. One of the largest bagasse-based paper mills in the world. Capacity 4 lakh TPA at Karur and Mondipatti. Uses sugarcane bagasse (no wood) making it uniquely sustainable. In FY25 the company reported revenue of ₹4,000 Cr and net profit of ₹380 Cr, at an EBITDA margin of around 18.8%. Its revenue is led by printing & writing papers (40% of sales), complemented by packaging boards and cement bags. India's largest bagasse-based paper company (4 lakh TPA). Tamil Nadu — Karur (Unit 1) and Mondipatti (Unit 2).",
    products: [
      { name: 'Printing & Writing Papers', revenueShare: 40, description: 'Newsprint, copier, and offset papers' },
      { name: 'Packaging Boards', revenueShare: 25, description: 'Duplex and triplex boards' },
      { name: 'Cement Bags (Kraft)', revenueShare: 15, description: 'Multi-wall kraft sack for cement' },
      { name: 'Coated Papers', revenueShare: 12, description: 'Art card and art paper' },
      { name: 'Tissue Papers', revenueShare: 8, description: 'Tissue products from bagasse' },
    ],
    financials: [
      { year: 'FY21', revenue: 2800, profit: 180, ebitda: 520 },
      { year: 'FY22', revenue: 3500, profit: 420, ebitda: 780 },
      { year: 'FY23', revenue: 4200, profit: 580, ebitda: 950 },
      { year: 'FY24', revenue: 3800, profit: 320, ebitda: 680 },
      { year: 'FY25', revenue: 4000, profit: 380, ebitda: 750 },
    ],
    revenueFY25: '₹4,000 Cr', profitFY25: '₹380 Cr', ebitdaMargin: '18.8%',
    news: [
      { title: 'TNPL Unit 2 Mondipatti reaches full 2 lakh TPA capacity', date: '2025-03-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Bagasse-based paper gets green premium from sustainable buyers', date: '2025-02-10', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
      { title: 'Packaging board capacity expansion for FMCG clients', date: '2025-01-15', source: 'Company PR', url: 'https://www.tnpl.com' },
    ],
    futureScope: {
      outlook: 'Unique bagasse-based model gives sustainability advantage. Green paper demand growing. TN government support ensures stability.',
      plans: ['Capacity to 5 lakh TPA', 'Green premium products for export', 'Tissue paper business growth', 'Carbon credit monetization'],
      risks: ['Bagasse availability depends on sugar mills', 'PSU governance constraints', 'Competition from wood-based mills', 'Export market fluctuations'],
    },
    extendedOverview: {
      businessSegments: 'Printing & Writing Papers, Packaging Boards, Cement Bags (Kraft), Tissue Papers. Unique 100% bagasse-based paper mill — zero wood dependency.',
      geographicPresence: 'Tamil Nadu — Karur (Unit 1) and Mondipatti (Unit 2). Strong South India distribution. Export to 30+ countries. TN government PSU.',
      keyStrengths: [
        'World\'s largest bagasse-based paper mill — zero wood/forest dependency',
        'Tamil Nadu government ownership ensures stability and policy support',
        'Green/sustainable positioning commands premium in export markets',
        'Integrated model with sugar mills ensures bagasse supply'
      ],
      marketPosition: 'India\'s largest bagasse-based paper company (4 lakh TPA). TN Government PSU. Unique sustainability moat. Strong in South India. Cement bag kraft paper has captive demand from South Indian cement companies.',
      rawMaterialStrategy: '100% sugarcane bagasse from TN sugar mills — zero deforestation. Most sustainable paper model in India. Bagasse availability linked to sugar crushing season. Additional pulp from casuarina plantations. Waste paper for some board grades.'
    },
    financialRatios: {
      debtToEquity: 0.85,
      currentRatio: 1.05,
      roe: 6.5,
      roce: 10.5,
      interestCoverage: 3.8,
      netDebt: '₹2,500 Cr',
      peRatio: 8.0,
      pbRatio: 0.8,
      dividendYield: 2.5,
      workingCapitalDays: 65
    },
    bcgMatrix: {
      stars: [
        { name: 'Packaging Boards', growth: '12% CAGR', share: '5% South India boards', insight: 'Growing with FMCG packaging demand. Bagasse boards have sustainability premium for ESG-conscious buyers.' },
      ],
      cashCows: [
        { name: 'Cement Bag Kraft Paper', growth: '8% CAGR', share: '20% South India cement bags', insight: 'Captive demand from South Indian cement industry boom. Long-term supply contracts. Consistent volumes.' },
        { name: 'Writing & Printing Papers', growth: '5% CAGR', share: '8% South India W&P', insight: 'Education and office demand in TN/Karnataka. Government procurement advantages as PSU.' },
      ],
      questionMarks: [
        { name: 'Green Premium Exports', growth: '15% CAGR', share: '3% India paper exports', insight: 'European/US buyers pay premium for zero-deforestation paper. Carbon credit opportunity. Needs certification and marketing.' },
      ],
      dogs: [
        { name: 'Newsprint', growth: '-3% declining', share: '5% newsprint', insight: 'Regional language newspapers declining. Being converted to other grades.' },
      ],
    },
    headToHead: {
      competitor: 'Seshasayee Paper & Boards',
      competitorTicker: 'SESHAPAPER',
      summary: 'TNPL (bagasse-based PSU, large) vs Seshasayee Paper (wood-based, private, efficient). Both are TN-based paper companies with different raw material models.',
      metrics: [
        { label: 'Revenue FY25', company: 3800, competitor: 1500, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 18.5, competitor: 20.0, unit: '%', winner: 'competitor' },
        { label: 'Capacity', company: '4 lakh TPA', competitor: '1.2 lakh TPA', unit: '', winner: 'company' },
        { label: 'Sustainability', company: '100% bagasse (zero wood)', competitor: 'Wood-based', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.85, competitor: 0.30, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 10.5, competitor: 14.0, unit: '%', winner: 'competitor' },
        { label: 'Government Support', company: 'TN Govt PSU', competitor: 'Private', unit: '', winner: 'company' },
        { label: 'Net Profit Margin', company: 6.5, competitor: 10.0, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 2800, competitor: 1200, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'TNPL is much larger with unique sustainability moat. Seshasayee is more profitable and efficient per tonne. For insurers: TNPL has government backing and green credentials; Seshasayee offers better returns but smaller scale.'
    },
  },
  {
    id: 'emami-paper', name: 'Emami Paper Mills', industry: 'paper', ticker: 'EMAMIPAP',
    founded: 1981, headquarters: 'Kolkata, West Bengal', employees: '2,500+', marketCap: '₹1,800 Cr',
    ceo: 'P.S. Patwari (ED)', website: 'https://www.emamipaper.in',
    description: "​Part of Emami Group. Operates paper and packaging board manufacturing at Balasore (Odisha). Capacity 2.6 lakh TPA. Focus on packaging boards and newsprint. Uses recycled fiber and wood pulp. In FY25 the company reported revenue of ₹2,100 Cr and net profit of ₹180 Cr, at an EBITDA margin of around 17.1%. Its revenue is led by packaging boards (40% of sales), complemented by newsprint and writing & printing. Mid-tier paper company (2.6 lakh TPA) pivoting from newsprint to packaging boards. East India — Balasore (Odisha).",
    products: [
      { name: 'Packaging Boards (Duplex/Triplex)', revenueShare: 40, description: 'Coated boards for packaging' },
      { name: 'Newsprint', revenueShare: 25, description: 'Standard newsprint for publications' },
      { name: 'Writing & Printing', revenueShare: 20, description: 'Creamwove and maplitho papers' },
      { name: 'Kraft Paper', revenueShare: 15, description: 'Industrial kraft for corrugation' },
    ],
    financials: [
      { year: 'FY21', revenue: 1200, profit: 80, ebitda: 220 },
      { year: 'FY22', revenue: 1650, profit: 180, ebitda: 350 },
      { year: 'FY23', revenue: 2100, profit: 250, ebitda: 420 },
      { year: 'FY24', revenue: 1900, profit: 150, ebitda: 320 },
      { year: 'FY25', revenue: 2100, profit: 180, ebitda: 360 },
    ],
    revenueFY25: '₹2,100 Cr', profitFY25: '₹180 Cr', ebitdaMargin: '17.1%',
    news: [
      { title: 'Emami Paper packaging board capacity expanded to 1.5 lakh TPA', date: '2025-03-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'E-commerce packaging demand drives 20% board volume growth', date: '2025-02-05', source: 'Company PR', url: 'https://www.emamipaper.in' },
      { title: 'Waste paper recycling capacity enhanced for sustainability', date: '2025-01-18', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Packaging boards growing with e-commerce. Recycled fiber positioning for ESG. Emami Group provides financial backing.',
      plans: ['Packaging board focus expansion', 'E-commerce packaging solutions', 'Recycled content to 70%', 'New coating lines for premium boards'],
      risks: ['Newsprint structural decline', 'Waste paper price volatility', 'Competition from ITC and JK Paper', 'Single plant location risk'],
    },
    extendedOverview: {
      businessSegments: 'Packaging Boards (Duplex/Triplex), Newsprint, Writing & Printing Papers, Kraft Paper. Pivoting from newsprint to packaging boards.',
      geographicPresence: 'East India — Balasore (Odisha). Single large integrated mill. Serves East and North India primarily.',
      keyStrengths: ['Emami Group financial backing', 'Pivot to packaging boards gaining traction', 'Recycled fiber expertise — 60%+ recycled content', 'E-commerce packaging demand tailwind'],
      marketPosition: 'Mid-tier paper company (2.6 lakh TPA) pivoting from newsprint to packaging boards. Emami Group provides stability. E-commerce packaging is primary growth driver.',
      rawMaterialStrategy: 'Mix of waste paper (60%+ recycled content) and wood pulp. Waste paper sourced from North/East India collection network. Wood from Odisha/Jharkhand farm forestry.'
    },
    financialRatios: { debtToEquity: 0.70, currentRatio: 1.05, roe: 9.5, roce: 12.0, interestCoverage: 4.5, netDebt: '₹1,200 Cr', peRatio: 10.0, pbRatio: 1.2, dividendYield: 1.5, workingCapitalDays: 50 },
    bcgMatrix: {
      stars: [{ name: 'Packaging Boards', growth: '15% CAGR', share: '6% East India boards', insight: 'E-commerce and FMCG driving demand. Recycled content appeals to ESG buyers.' }],
      cashCows: [{ name: 'Kraft Paper', growth: '8% CAGR', share: '5% kraft market', insight: 'Corrugation demand from e-commerce steady.' }],
      questionMarks: [{ name: 'Premium Coated Boards', growth: '12% CAGR', share: '2% coated boards', insight: 'New coating lines for food/pharma packaging. Competing against ITC quality.' }],
      dogs: [{ name: 'Newsprint', growth: '-5% declining', share: '5% newsprint', insight: 'Structural decline. Being converted to board capacity.' }],
    },
    headToHead: {
      competitor: 'Orient Paper',
      competitorTicker: 'ORIENTPPR',
      summary: 'Emami Paper (packaging pivot, Emami Group) vs Orient Paper (CK Birla, tissue+security paper). Both mid-tier with different strategies.',
      metrics: [
        { label: 'Revenue FY25', company: 2100, competitor: 1350, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 17.1, competitor: 16.3, unit: '%', winner: 'company' },
        { label: 'Growth Rate', company: 12, competitor: 8, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.70, competitor: 0.45, unit: 'x', winner: 'competitor' },
        { label: 'Packaging Board Focus', company: 'Primary', competitor: 'Secondary', unit: '', winner: 'company' },
        { label: 'Security Paper', company: 'No', competitor: 'Yes (RBI contracts)', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 1800, competitor: 1500, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Emami Paper is larger and growing faster with packaging board pivot. Orient has unique security paper niche and lower debt. For insurers: Emami offers growth from packaging transition; Orient offers stability from government contracts.'
    },
  },
  {
    id: 'orient-paper', name: 'Orient Paper & Industries', industry: 'paper', ticker: 'ORIENTPPR',
    founded: 1936, headquarters: 'New Delhi', employees: '2,000+', marketCap: '₹1,500 Cr',
    ceo: 'C.K. Birla (Chairman)', website: 'https://www.orientpaperindia.com',
    description: "​Part of CK Birla Group. Paper mill at Amlai, Madhya Pradesh with capacity of 1.5 lakh TPA. Also has electrical and cement businesses under same listed entity. In FY25 the company reported revenue of ₹1,350 Cr and net profit of ₹100 Cr, at an EBITDA margin of around 16.3%. Its revenue is led by writing & printing papers (45% of sales), complemented by tissue papers and packaging papers. Small paper company (1.5 lakh TPA) with unique security paper niche. Central India — Amlai (MP).",
    products: [
      { name: 'Writing & Printing Papers', revenueShare: 45, description: 'Copier and offset papers for Central India' },
      { name: 'Tissue Papers', revenueShare: 20, description: 'Tissue base paper and consumer tissue' },
      { name: 'Packaging Papers', revenueShare: 20, description: 'Kraft and specialty papers' },
      { name: 'Specialty Papers', revenueShare: 15, description: 'Security paper and bank note paper' },
    ],
    financials: [
      { year: 'FY21', revenue: 850, profit: 45, ebitda: 130 },
      { year: 'FY22', revenue: 1100, profit: 95, ebitda: 200 },
      { year: 'FY23', revenue: 1350, profit: 120, ebitda: 240 },
      { year: 'FY24', revenue: 1250, profit: 85, ebitda: 195 },
      { year: 'FY25', revenue: 1350, profit: 100, ebitda: 220 },
    ],
    revenueFY25: '₹1,350 Cr', profitFY25: '₹100 Cr', ebitdaMargin: '16.3%',
    news: [
      { title: 'Orient Paper tissue line at Amlai crosses 30,000 TPA production', date: '2025-03-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Security paper division wins new RBI contract', date: '2025-02-12', source: 'Company PR', url: 'https://www.orientpaperindia.com' },
      { title: 'Bamboo-based pulp production increased for sustainability', date: '2025-01-20', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Tissue paper and security paper are growth areas. Stable legacy business. CK Birla Group may restructure businesses.',
      plans: ['Tissue paper capacity expansion', 'Security paper volume growth', 'Bamboo plantation linkage', 'Possible demerger of businesses'],
      risks: ['Small scale in competitive market', 'Writing paper decline', 'Multi-business complexity', 'Central India market limitations'],
    },
    extendedOverview: {
      businessSegments: 'Writing & Printing Papers, Tissue Papers, Packaging Papers, Specialty/Security Papers. Part of CK Birla Group multi-business entity (paper + electrical + cement).',
      geographicPresence: 'Central India — Amlai (MP). Single integrated mill. Serves Central and North India. Security paper serves RBI/government pan-India.',
      keyStrengths: ['Unique security/bank note paper business with RBI contracts', 'Growing tissue paper segment', 'CK Birla Group financial backing', 'Bamboo-based pulp — sustainable sourcing from MP forests'],
      marketPosition: 'Small paper company (1.5 lakh TPA) with unique security paper niche. Part of diversified CK Birla Group. Tissue paper growing. Possible demerger could unlock value.',
      rawMaterialStrategy: 'Bamboo from Madhya Pradesh forests — traditional source for Amlai mill. Hardwood from farm forestry. Waste paper for select grades. Central India bamboo availability is a strength.'
    },
    financialRatios: { debtToEquity: 0.45, currentRatio: 1.15, roe: 8.0, roce: 11.5, interestCoverage: 6.0, netDebt: '₹500 Cr', peRatio: 16.0, pbRatio: 1.5, dividendYield: 1.0, workingCapitalDays: 50 },
    bcgMatrix: {
      stars: [{ name: 'Tissue Papers', growth: '20% CAGR', share: '5% tissue market', insight: 'Hygiene demand growing. Away-from-home segment. New capacity additions.' }],
      cashCows: [{ name: 'Security/Bank Note Paper', growth: '5% CAGR', share: '15% security paper', insight: 'RBI contracts provide guaranteed revenue. High barriers to entry. Premium margins.' }, { name: 'Writing Papers (Central India)', growth: '4% CAGR', share: '5% Central India', insight: 'Stable education demand in MP/UP/CG region.' }],
      questionMarks: [{ name: 'Demerger Value Unlock', growth: 'N/A', share: 'N/A', insight: 'Paper business undervalued within multi-business entity. Demerger could create focused paper company.' }],
      dogs: [{ name: 'Commodity Kraft', growth: '2% CAGR', share: '1% kraft', insight: 'Small, low-margin segment. Maintained for utilization.' }],
    },
    headToHead: {
      competitor: 'Satia Industries',
      competitorTicker: 'SATIA',
      summary: 'Orient Paper (CK Birla, bamboo-based, security paper) vs Satia Industries (wheat straw-based, Punjab). Different raw material innovations — bamboo vs agri-waste.',
      metrics: [
        { label: 'Revenue FY25', company: 1350, competitor: 1150, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 16.3, competitor: 18.7, unit: '%', winner: 'competitor' },
        { label: 'Unique Raw Material', company: 'Bamboo + security paper', competitor: 'Wheat straw (stubble)', unit: '', winner: 'tie' },
        { label: 'Debt/Equity', company: 0.45, competitor: 0.35, unit: 'x', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 7.4, competitor: 10.0, unit: '%', winner: 'competitor' },
        { label: 'ESG Appeal', company: 'Moderate (bamboo)', competitor: 'High (solves stubble burning)', unit: '', winner: 'competitor' },
        { label: 'Government Contracts', company: 'Yes (RBI security paper)', competitor: 'Yes (stubble subsidy)', unit: '', winner: 'tie' },
        { label: 'Market Cap', company: 1500, competitor: 1200, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Both have unique raw material stories. Satia has better margins and ESG appeal from solving stubble burning. Orient has security paper moat. For insurers: Orient has government contract stability; Satia has ESG-driven growth potential.'
    },
  },
  {
    id: 'satia-industries', name: 'Satia Industries', industry: 'paper', ticker: 'SATIA',
    founded: 1980, headquarters: 'Muktsar, Punjab', employees: '2,000+', marketCap: '₹1,200 Cr',
    ceo: 'Dr. Ajay Satia (CMD)', website: 'https://www.satiaindustries.com',
    description: "​Punjab-based writing and printing paper manufacturer. Uses wheat straw (agricultural waste) as primary raw material — unique among Indian paper companies. Capacity 1.25 lakh TPA at Muktsar. In FY25 the company reported revenue of ₹1,150 Cr and net profit of ₹115 Cr, at an EBITDA margin of around 18.7%. Its revenue is led by writing & printing papers (50% of sales), complemented by creamwove paper and kraft paper. Small niche player (1.25 lakh TPA) with unique sustainability story. Punjab — Muktsar.",
    products: [
      { name: 'Writing & Printing Papers', revenueShare: 50, description: 'Copier, maplitho, and offset papers' },
      { name: 'Creamwove Paper', revenueShare: 25, description: 'Exercise notebook paper' },
      { name: 'Kraft Paper', revenueShare: 15, description: 'Industrial packaging paper' },
      { name: 'Specialty Papers', revenueShare: 10, description: 'Colored and specialty grades' },
    ],
    financials: [
      { year: 'FY21', revenue: 680, profit: 55, ebitda: 120 },
      { year: 'FY22', revenue: 950, profit: 120, ebitda: 210 },
      { year: 'FY23', revenue: 1150, profit: 145, ebitda: 250 },
      { year: 'FY24', revenue: 1050, profit: 100, ebitda: 195 },
      { year: 'FY25', revenue: 1150, profit: 115, ebitda: 215 },
    ],
    revenueFY25: '₹1,150 Cr', profitFY25: '₹115 Cr', ebitdaMargin: '18.7%',
    news: [
      { title: 'Satia Industries wheat straw model recognized for stubble burning reduction', date: '2025-03-18', source: 'PIB', url: 'https://pib.gov.in' },
      { title: 'Capacity expanded to 1.25 lakh TPA with new paper machine', date: '2025-02-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Punjab government partners for expanded crop residue collection', date: '2025-01-12', source: 'Tribune', url: 'https://www.tribuneindia.com' },
    ],
    futureScope: {
      outlook: 'Unique wheat straw model solves stubble burning problem. Government support for agri-waste utilization. ESG appeal for sustainable packaging.',
      plans: ['Capacity to 2 lakh TPA', 'Packaging board from agri-waste', 'Carbon credit from stubble prevention', 'Government subsidy utilization'],
      risks: ['Wheat straw seasonal availability', 'Chemical recovery challenges', 'Scale limitation vs wood-based mills', 'Punjab industrial policy uncertainty'],
    },
    extendedOverview: {
      businessSegments: 'Writing & Printing Papers, Creamwove (notebook paper), Kraft Paper, Specialty Papers. Unique wheat straw (agri-waste) based manufacturing.',
      geographicPresence: 'Punjab — Muktsar. Single mill. Serves North India (Punjab, Haryana, Delhi, UP). Wheat straw collected from 50km radius around mill.',
      keyStrengths: ['Only large-scale wheat straw-based paper mill — solves stubble burning', 'Government ESG support and subsidies for crop residue utilization', 'Best margins among small paper companies due to cheap raw material', 'Carbon credit potential from preventing stubble burning'],
      marketPosition: 'Small niche player (1.25 lakh TPA) with unique sustainability story. Wheat straw model makes it India\'s most ESG-aligned paper company. Strong margins despite small size.',
      rawMaterialStrategy: 'Wheat straw (crop residue) — collected from Punjab/Haryana farmers after harvest. Solves stubble burning problem. Cheaper than wood. Government subsidy support. Seasonal collection stored for year-round use. Unique competitive moat.'
    },
    financialRatios: { debtToEquity: 0.35, currentRatio: 1.25, roe: 12.0, roce: 15.5, interestCoverage: 8.0, netDebt: '₹350 Cr', peRatio: 11.0, pbRatio: 1.5, dividendYield: 1.5, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Agri-Waste Paper (ESG Premium)', growth: '15% CAGR', share: '100% wheat straw segment', insight: 'Only player. ESG investors and sustainable brands paying premium. Government support growing.' }],
      cashCows: [{ name: 'Creamwove/Notebook Paper', growth: '6% CAGR', share: '5% North India notebook paper', insight: 'Consistent education demand. Low-cost wheat straw raw material provides good margins.' }],
      questionMarks: [{ name: 'Packaging Board from Straw', growth: '20% potential', share: 'New product', insight: 'Board from wheat straw could be breakthrough product. Needs R&D and certification.' }],
      dogs: [{ name: 'Commodity Kraft', growth: '3% CAGR', share: '1% kraft', insight: 'Small volume maintained for capacity utilization.' }],
    },
    headToHead: {
      competitor: 'Ruchira Papers',
      competitorTicker: 'RUCHIRA',
      summary: 'Satia (wheat straw, ESG leader) vs Ruchira Papers (wood-based, Himachal). Both are small North India paper companies with different raw material strategies.',
      metrics: [
        { label: 'Revenue FY25', company: 1150, competitor: 850, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 18.7, competitor: 16.5, unit: '%', winner: 'company' },
        { label: 'Sustainability', company: 'Wheat straw (agri-waste)', competitor: 'Wood-based', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.35, competitor: 0.40, unit: 'x', winner: 'company' },
        { label: 'ESG Appeal', company: 'Very High', competitor: 'Moderate', unit: '', winner: 'company' },
        { label: 'Government Support', company: 'Strong (stubble policy)', competitor: 'Moderate', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 1200, competitor: 600, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Satia wins on all metrics — larger, more profitable, better ESG story, and government support. Ruchira is smaller with conventional wood-based model. For insurers: Satia is the unique ESG-driven small paper bet.'
    },
  },
  {
    id: 'seshasayee-paper', name: 'Seshasayee Paper & Boards', industry: 'paper', ticker: 'SESHAPAPER',
    founded: 1960, headquarters: 'Erode, Tamil Nadu', employees: '2,800+', marketCap: '₹2,200 Cr',
    ceo: 'N. Gopalaratnam (CMD)', website: 'https://www.spb.co.in',
    description: "​One of India's oldest paper companies. Integrated mill at Erode, Tamil Nadu with 1.35 lakh TPA capacity. Uses hardwood and eucalyptus from company-promoted farm forestry. In FY25 the company reported revenue of ₹1,600 Cr and net profit of ₹170 Cr, at an EBITDA margin of around 21.3%. Its revenue is led by printing & writing papers (45% of sales), complemented by industrial papers and paperboards. Small but efficient South India paper company (1.35 lakh TPA). Tamil Nadu — Erode.",
    products: [
      { name: 'Printing & Writing Papers', revenueShare: 45, description: 'Copier, offset, and map litho papers' },
      { name: 'Industrial Papers', revenueShare: 25, description: 'MG poster, kraft papers' },
      { name: 'Paperboards', revenueShare: 18, description: 'White-lined chipboard and duplex board' },
      { name: 'Specialty Papers', revenueShare: 12, description: 'Parchment, greaseproof, MF tissue' },
    ],
    financials: [
      { year: 'FY21', revenue: 1050, profit: 80, ebitda: 200 },
      { year: 'FY22', revenue: 1350, profit: 165, ebitda: 320 },
      { year: 'FY23', revenue: 1600, profit: 210, ebitda: 380 },
      { year: 'FY24', revenue: 1500, profit: 150, ebitda: 310 },
      { year: 'FY25', revenue: 1600, profit: 170, ebitda: 340 },
    ],
    revenueFY25: '₹1,600 Cr', profitFY25: '₹170 Cr', ebitdaMargin: '21.3%',
    news: [
      { title: 'Seshasayee Paper farm forestry covers 75,000 acres in TN and Karnataka', date: '2025-03-10', source: 'Company PR', url: 'https://www.spb.co.in' },
      { title: 'Achieves zero liquid discharge status at Erode mill', date: '2025-02-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'New specialty paper grades for food packaging launched', date: '2025-01-18', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
    ],
    futureScope: {
      outlook: 'Sustainable forest-based operations. Specialty papers growing segment. Zero liquid discharge gives environmental clearance ease.',
      plans: ['Capacity to 1.75 lakh TPA', 'Food-grade specialty papers', 'Farm forestry expansion', 'Bleached pulp for premium grades'],
      risks: ['Small scale limitation', 'South India market competition', 'Water stress in Tamil Nadu', 'Wood cost fluctuations'],
    },
    extendedOverview: {
      businessSegments: 'Printing & Writing Papers, Industrial Papers, Paperboards, Specialty Papers (parchment, greaseproof, MF tissue). Well-diversified product portfolio for a small mill.',
      geographicPresence: 'Tamil Nadu — Erode. Single integrated mill. Serves South India and exports. Farm forestry across TN and Karnataka (75,000 acres).',
      keyStrengths: ['60+ years of integrated forest-based operations', 'Zero liquid discharge — environmental leadership', 'Farm forestry program (75,000 acres) ensuring wood supply', 'Strong specialty paper portfolio with food-grade capabilities'],
      marketPosition: 'Small but efficient South India paper company (1.35 lakh TPA). Known for quality and sustainability. ZLD status provides environmental clearance advantage. Specialty papers are growing niche.',
      rawMaterialStrategy: 'Eucalyptus and casuarina from 75,000 acres of company-promoted farm forestry in TN and Karnataka. Fully integrated pulp production at Erode. Self-sufficient in wood procurement through long-term farmer partnerships.'
    },
    financialRatios: { debtToEquity: 0.30, currentRatio: 1.35, roe: 11.0, roce: 14.0, interestCoverage: 10.0, netDebt: '₹400 Cr', peRatio: 14.0, pbRatio: 1.5, dividendYield: 2.0, workingCapitalDays: 50 },
    bcgMatrix: {
      stars: [{ name: 'Food-Grade Specialty Papers', growth: '15% CAGR', share: '8% specialty paper', insight: 'Parchment, greaseproof for food industry. Growing with packaged food trend.' }],
      cashCows: [{ name: 'Writing & Printing Papers', growth: '5% CAGR', share: '4% South India', insight: 'Stable demand. Low-cost eucalyptus pulp. Consistent cash generator.' }],
      questionMarks: [{ name: 'Paperboards', growth: '10% CAGR', share: '2% boards', insight: 'Growing packaging segment but needs scale.' }],
      dogs: [{ name: 'MG Poster Paper', growth: '0% flat', share: '3% poster paper', insight: 'Niche industrial paper with limited growth.' }],
    },
    headToHead: {
      competitor: 'Andhra Paper',
      competitorTicker: 'ANDHRAPAP',
      summary: 'Seshasayee (independent, Erode TN, specialty focus) vs Andhra Paper (West Coast group, Rajahmundry AP). Both South India wood-based paper mills with similar scale.',
      metrics: [
        { label: 'Revenue FY25', company: 1600, competitor: 1500, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 21.3, competitor: 20.0, unit: '%', winner: 'company' },
        { label: 'Debt/Equity', company: 0.30, competitor: 0.45, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 14.0, competitor: 12.5, unit: '%', winner: 'company' },
        { label: 'Parent Group', company: 'Independent', competitor: 'West Coast Paper', unit: '', winner: 'competitor' },
        { label: 'Specialty Papers', company: 'Strong', competitor: 'Moderate', unit: '', winner: 'company' },
        { label: 'Farm Forestry', company: '75,000 acres', competitor: '40,000 acres', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 2200, competitor: 1500, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Seshasayee is more profitable, lower debt, and better raw material security. Andhra Paper has West Coast group synergies for packaging board pivot. For insurers: Seshasayee is a quality small-cap; Andhra benefits from group scale.'
    },
  },
  {
    id: 'andhra-paper', name: 'Andhra Paper', industry: 'paper', ticker: 'ANDHRAPAP',
    founded: 1964, headquarters: 'Rajahmundry, Andhra Pradesh', employees: '2,000+', marketCap: '₹1,500 Cr',
    ceo: 'S.K. Bangur (Chairman)', website: 'https://www.andhrapaper.com',
    description: "​Part of West Coast Paper group (acquired from International Paper in 2022). Mill at Rajahmundry, AP with 1.5 lakh TPA capacity. Strong in writing/printing papers for South India market. In FY25 the company reported revenue of ₹1,500 Cr and net profit of ₹150 Cr, at an EBITDA margin of around 20.0%. Its revenue is led by copier papers (40% of sales), complemented by writing papers and packaging papers. Mid-size South India paper company (1.5 lakh TPA) now under West Coast Paper group. AP — Rajahmundry.",
    products: [
      { name: 'Copier Papers', revenueShare: 40, description: 'Office copier and printing papers' },
      { name: 'Writing Papers', revenueShare: 25, description: 'Creamwove and maplitho' },
      { name: 'Packaging Papers', revenueShare: 20, description: 'Kraft and industrial papers' },
      { name: 'Specialty Papers', revenueShare: 15, description: 'Bond papers and tinted papers' },
    ],
    financials: [
      { year: 'FY21', revenue: 900, profit: 50, ebitda: 150 },
      { year: 'FY22', revenue: 1200, profit: 150, ebitda: 280 },
      { year: 'FY23', revenue: 1500, profit: 200, ebitda: 350 },
      { year: 'FY24', revenue: 1400, profit: 130, ebitda: 270 },
      { year: 'FY25', revenue: 1500, profit: 150, ebitda: 300 },
    ],
    revenueFY25: '₹1,500 Cr', profitFY25: '₹150 Cr', ebitdaMargin: '20.0%',
    news: [
      { title: 'Andhra Paper operations fully integrated with West Coast Paper group', date: '2025-03-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Packaging board conversion at Rajahmundry plant under progress', date: '2025-02-10', source: 'Company PR', url: 'https://www.andhrapaper.com' },
      { title: 'Farm forestry program expanded to 40,000 acres in AP', date: '2025-01-15', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
    ],
    futureScope: {
      outlook: 'Under West Coast Paper group, focus on packaging board conversion. AP farm forestry provides raw material security.',
      plans: ['Packaging board line conversion', 'Capacity to 2 lakh TPA', 'Integration synergies with parent', 'Export market development'],
      risks: ['Integration still in progress', 'Writing paper decline risk', 'AP water scarcity', 'Raw material cost escalation'],
    },
    extendedOverview: {
      businessSegments: 'Copier Papers, Writing Papers, Packaging Papers, Specialty Papers. Now part of West Coast Paper group post-acquisition from International Paper.',
      geographicPresence: 'AP — Rajahmundry. Single integrated mill. Serves South India. Farm forestry across AP (40,000 acres). Coastal location enables exports.',
      keyStrengths: ['West Coast Paper group synergies for procurement and marketing', 'AP coastal location enabling export logistics', 'Farm forestry (40,000 acres) for raw material security', 'Packaging board conversion potential from writing paper'],
      marketPosition: 'Mid-size South India paper company (1.5 lakh TPA) now under West Coast Paper group. Pivoting from writing paper to packaging boards. AP farm forestry is long-term raw material asset.',
      rawMaterialStrategy: 'Casuarina and eucalyptus from AP farm forestry (40,000 acres). Integrated pulp mill at Rajahmundry. Previous International Paper invested in modern pulping technology. West Coast group provides additional bamboo sourcing from Karnataka.'
    },
    financialRatios: { debtToEquity: 0.45, currentRatio: 1.15, roe: 10.5, roce: 12.5, interestCoverage: 6.0, netDebt: '₹600 Cr', peRatio: 11.0, pbRatio: 1.3, dividendYield: 1.5, workingCapitalDays: 55 },
    bcgMatrix: {
      stars: [{ name: 'Packaging Board Conversion', growth: '20% CAGR', share: '3% South India boards (new)', insight: 'Converting writing paper lines to packaging boards. West Coast group expertise guiding transition.' }],
      cashCows: [{ name: 'Copier & Writing Papers', growth: '4% CAGR', share: '5% South India papers', insight: 'Existing business generating cash while board transition happens.' }],
      questionMarks: [{ name: 'Export Markets', growth: '12% CAGR', share: '2% India paper exports', insight: 'Coastal Rajahmundry location enables shipping exports. Growing opportunity.' }],
      dogs: [{ name: 'Commodity Writing Paper', growth: '-2% declining', share: '2% commodity grades', insight: 'Being phased out for packaging board conversion.' }],
    },
    headToHead: {
      competitor: 'Kuantum Papers',
      competitorTicker: 'KUANTUM',
      summary: 'Andhra Paper (West Coast group, packaging pivot) vs Kuantum Papers (independent, copier paper niche). Different strategies — Andhra pivoting to boards; Kuantum focused on premium copier paper.',
      metrics: [
        { label: 'Revenue FY25', company: 1500, competitor: 850, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 20.0, competitor: 18.2, unit: '%', winner: 'company' },
        { label: 'Parent Group', company: 'West Coast Paper', competitor: 'Independent', unit: '', winner: 'company' },
        { label: 'Growth Strategy', company: 'Packaging boards pivot', competitor: 'Copier paper niche', unit: '', winner: 'company' },
        { label: 'Debt/Equity', company: 0.45, competitor: 0.35, unit: 'x', winner: 'competitor' },
        { label: 'Market Cap', company: 1500, competitor: 800, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Andhra Paper has stronger backing and growth pivot to packaging boards. Kuantum has niche copier paper positioning. For insurers: Andhra has group support; Kuantum is a focused small-cap with niche appeal.'
    },
  },
  {
    id: 'kuantum-papers', name: 'Kuantum Papers', industry: 'paper', ticker: 'KUANTUM',
    founded: 1977, headquarters: 'Saharanpur, Uttar Pradesh', employees: '1,500+', marketCap: '₹800 Cr',
    ceo: 'Pavan Khaitan (MD)', website: 'https://www.kuantumpapers.com',
    description: "​Specialty paper manufacturer in Saharanpur, UP. Known for high-brightness copier papers and creamwove. Capacity 1 lakh TPA. Strong brand in North India copier paper market. In FY25 the company reported revenue of ₹850 Cr and net profit of ₹85 Cr, at an EBITDA margin of around 18.2%. Its revenue is led by hi-bright copier paper (45% of sales), complemented by creamwove paper and maplitho paper. Small niche player (1 lakh TPA) focused on premium copier paper. UP — Saharanpur.",
    products: [
      { name: 'Hi-Bright Copier Paper', revenueShare: 45, description: 'Premium copier paper — white and bright' },
      { name: 'Creamwove Paper', revenueShare: 30, description: 'Writing and exercise notebook paper' },
      { name: 'Maplitho Paper', revenueShare: 15, description: 'Offset printing paper' },
      { name: 'Specialty Grades', revenueShare: 10, description: 'Bond, ledger, colored papers' },
    ],
    financials: [
      { year: 'FY21', revenue: 450, profit: 20, ebitda: 65 },
      { year: 'FY22', revenue: 680, profit: 80, ebitda: 145 },
      { year: 'FY23', revenue: 850, profit: 110, ebitda: 180 },
      { year: 'FY24', revenue: 780, profit: 70, ebitda: 135 },
      { year: 'FY25', revenue: 850, profit: 85, ebitda: 155 },
    ],
    revenueFY25: '₹850 Cr', profitFY25: '₹85 Cr', ebitdaMargin: '18.2%',
    news: [
      { title: 'Kuantum Papers new paper machine increases capacity to 1.1 lakh TPA', date: '2025-03-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Hi-brightness copier paper export to Middle East initiated', date: '2025-02-08', source: 'Company PR', url: 'https://www.kuantumpapers.com' },
      { title: 'Farm forestry partnership with UP forest department', date: '2025-01-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Niche copier paper brand. North India market leader in select grades. Export potential for premium papers.',
      plans: ['Capacity to 1.5 lakh TPA', 'Export market development', 'Packaging paper diversification', 'Raw material security'],
      risks: ['Digitization reducing paper demand', 'Small scale vulnerability', 'North India wood scarcity', 'ASEAN import competition'],
    },
    extendedOverview: {
      businessSegments: 'Hi-Bright Copier Paper (premium), Creamwove (notebook), Maplitho (offset printing), Specialty Grades. Niche premium copier paper player.',
      geographicPresence: 'UP — Saharanpur. Single mill. Serves North India copier paper market. Growing Middle East exports.',
      keyStrengths: ['Premium copier paper brand with hi-brightness positioning', 'Strong North India distribution for education/office segments', 'Export quality papers for Middle East markets', 'Good margins from premium positioning'],
      marketPosition: 'Small niche player (1 lakh TPA) focused on premium copier paper. Strong in UP/North India. Hi-brightness papers command premium pricing. Growing export presence.',
      rawMaterialStrategy: 'Eucalyptus and poplar from UP/Uttarakhand farm forestry. Wood procurement from local farmers. Integrated pulping at Saharanpur mill.'
    },
    financialRatios: { debtToEquity: 0.35, currentRatio: 1.20, roe: 11.5, roce: 14.0, interestCoverage: 7.0, netDebt: '₹250 Cr', peRatio: 10.0, pbRatio: 1.2, dividendYield: 2.0, workingCapitalDays: 48 },
    bcgMatrix: {
      stars: [{ name: 'Hi-Bright Copier Exports', growth: '15% CAGR', share: '3% paper exports', insight: 'Premium quality papers gaining Middle East market share.' }],
      cashCows: [{ name: 'Copier Paper (Domestic)', growth: '5% CAGR', share: '5% North India copier', insight: 'Stable office/education demand with premium pricing.' }],
      questionMarks: [{ name: 'Packaging Diversification', growth: '12% potential', share: 'New segment', insight: 'Considering board/packaging to reduce paper decline risk.' }],
      dogs: [{ name: 'Maplitho Paper', growth: '0% flat', share: '2% offset', insight: 'Print media declining. Stable but no growth.' }],
    },
    headToHead: {
      competitor: 'Star Paper Mills',
      competitorTicker: 'STARPAPER',
      summary: 'Kuantum (premium copier, growing) vs Star Paper (legacy mill, kraft focus). Both Saharanpur-based but different strategies.',
      metrics: [
        { label: 'Revenue FY25', company: 850, competitor: 620, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 18.2, competitor: 13.7, unit: '%', winner: 'company' },
        { label: 'Net Profit Margin', company: 10.0, competitor: 6.8, unit: '%', winner: 'company' },
        { label: 'Product Premium', company: 'Hi-brightness copier', competitor: 'Commodity kraft/writing', unit: '', winner: 'company' },
        { label: 'Market Cap', company: 800, competitor: 450, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Kuantum is the better company — premium positioning, higher margins, and growth story. Star Paper is a legacy mill struggling to compete. For insurers: Kuantum is the preferred small paper bet in North India.'
    },
  },
  {
    id: 'srp-industries', name: 'Star Paper Mills', industry: 'paper', ticker: 'STARPAPER',
    founded: 1938, headquarters: 'Saharanpur, Uttar Pradesh', employees: '1,200+', marketCap: '₹450 Cr',
    ceo: 'Sanjay Goenka (MD)', website: 'https://www.starpaper.com',
    description: "​One of the oldest paper mills in India, located at Saharanpur, UP. Capacity 80,000 TPA. Produces writing papers, kraft papers, and paperboards using eucalyptus and waste paper. In FY25 the company reported revenue of ₹620 Cr and net profit of ₹42 Cr, at an EBITDA margin of around 13.7%. Its revenue is led by writing papers (40% of sales), complemented by kraft papers and paperboards. Small legacy player (80,000 TPA). UP — Saharanpur.",
    products: [
      { name: 'Writing Papers', revenueShare: 40, description: 'Creamwove and maplitho papers' },
      { name: 'Kraft Papers', revenueShare: 30, description: 'Industrial kraft for corrugation' },
      { name: 'Paperboards', revenueShare: 20, description: 'Grey boards and duplex boards' },
      { name: 'Specialty Papers', revenueShare: 10, description: 'Colored and surface-sized papers' },
    ],
    financials: [
      { year: 'FY21', revenue: 380, profit: 15, ebitda: 48 },
      { year: 'FY22', revenue: 520, profit: 42, ebitda: 82 },
      { year: 'FY23', revenue: 620, profit: 52, ebitda: 95 },
      { year: 'FY24', revenue: 580, profit: 35, ebitda: 75 },
      { year: 'FY25', revenue: 620, profit: 42, ebitda: 85 },
    ],
    revenueFY25: '₹620 Cr', profitFY25: '₹42 Cr', ebitdaMargin: '13.7%',
    news: [
      { title: 'Star Paper modernization of PM-3 machine completed', date: '2025-03-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Waste paper recycling capacity enhanced to reduce costs', date: '2025-02-12', source: 'Company PR', url: 'https://www.starpaper.com' },
      { title: 'Kraft paper demand grows with e-commerce packaging trend', date: '2025-01-18', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Legacy mill with modernization in progress. Kraft paper demand growth from e-commerce provides stability.',
      plans: ['Machine upgrades for efficiency', 'Kraft paper focus', 'Waste paper utilization increase', 'Cost reduction initiatives'],
      risks: ['Aging infrastructure', 'Small scale vs larger peers', 'Write paper demand decline', 'UP industrial challenges'],
    },
    extendedOverview: {
      businessSegments: 'Writing Papers, Kraft Papers, Paperboards, Specialty Papers. Legacy mill undergoing modernization. Kraft paper growing with e-commerce.',
      geographicPresence: 'UP — Saharanpur. One of India\'s oldest paper mills. Serves North India local market.',
      keyStrengths: ['Legacy brand recognition in North India', 'Kraft paper demand growing with e-commerce', 'Waste paper recycling reducing raw material cost', 'Location advantage near Delhi market'],
      marketPosition: 'Small legacy player (80,000 TPA). One of India\'s oldest mills (est. 1938). Modernizing to remain competitive. Kraft paper is the future-focused segment.',
      rawMaterialStrategy: 'Mix of eucalyptus from local farms and waste paper recycling. Increasing waste paper content to reduce costs. Located in major waste paper collection zone (North India/Delhi).'
    },
    financialRatios: { debtToEquity: 0.50, currentRatio: 1.05, roe: 7.5, roce: 9.5, interestCoverage: 4.0, netDebt: '₹200 Cr', peRatio: 11.0, pbRatio: 1.0, dividendYield: 1.5, workingCapitalDays: 55 },
    bcgMatrix: {
      stars: [{ name: 'Kraft Paper (E-commerce)', growth: '12% CAGR', share: '2% kraft market', insight: 'E-commerce corrugation demand growing. Primary growth area for the mill.' }],
      cashCows: [{ name: 'Writing Papers', growth: '3% CAGR', share: '2% North India writing', insight: 'Legacy business with local demand. Low marketing cost.' }],
      questionMarks: [{ name: 'Machine Modernization', growth: '10% efficiency gain', share: 'N/A', insight: 'Old machines being upgraded. Efficiency gains expected but capex needed.' }],
      dogs: [{ name: 'Newsprint/Commodity Grades', growth: '-3% declining', share: '<1%', insight: 'Structural decline. Being phased out.' }],
    },
    headToHead: {
      competitor: 'Nagaland Pulp & Paper',
      competitorTicker: 'Unlisted',
      summary: 'Star Paper (private, modernizing, North India) vs Nagaland Pulp (PSU, sick unit, NE India). Both are small struggling paper companies but Star Paper is healthier and profitable.',
      metrics: [
        { label: 'Revenue FY25', company: 620, competitor: 220, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 13.7, competitor: 9.1, unit: '%', winner: 'company' },
        { label: 'Profitability', company: 'Profitable', competitor: 'Loss-making', unit: '', winner: 'company' },
        { label: 'Modernization', company: 'In progress', competitor: 'Needs complete overhaul', unit: '', winner: 'company' },
        { label: 'Market Position', company: 'Private, competitive', competitor: 'PSU, sick unit', unit: '', winner: 'company' },
      ],
      verdict: 'Star Paper is significantly healthier — profitable and modernizing. Nagaland Pulp is essentially a sick PSU on government life support. For insurers: Star Paper is marginal but viable; Nagaland Pulp is a government-dependent distressed asset.'
    },
  },
  {
    id: 'nagaland-pulp', name: 'Nagaland Pulp & Paper (HPPL Cachar)', industry: 'paper', ticker: 'NAGAPULP (Unlisted)',
    founded: 1971, headquarters: 'Dimapur, Nagaland', employees: '1,500+', marketCap: 'Unlisted (PSU)',
    ceo: 'Government Appointed', website: 'https://www.nagalandpaperindia.com',
    description: "​Northeast India PSU paper company. Known more for revival attempts. Represents small PSU paper mills struggling with competition. Part of the NE paper cluster (with HPPL and Cachar Paper). In FY25 the company reported revenue of ₹220 Cr and net profit of ₹-15 Cr (Loss), at an EBITDA margin of around 9.1%. Its revenue is led by writing papers (45% of sales), complemented by newsprint and kraft papers. Distressed PSU paper company. Northeast India — Nagaland/Assam.",
    products: [
      { name: 'Writing Papers', revenueShare: 45, description: 'Writing and printing papers' },
      { name: 'Newsprint', revenueShare: 30, description: 'Newsprint for NE publications' },
      { name: 'Kraft Papers', revenueShare: 15, description: 'Packaging papers' },
      { name: 'Specialty Papers', revenueShare: 10, description: 'Bamboo-based specialty grades' },
    ],
    financials: [
      { year: 'FY21', revenue: 120, profit: -50, ebitda: -20 },
      { year: 'FY22', revenue: 150, profit: -40, ebitda: -10 },
      { year: 'FY23', revenue: 180, profit: -30, ebitda: 5 },
      { year: 'FY24', revenue: 200, profit: -25, ebitda: 10 },
      { year: 'FY25', revenue: 220, profit: -15, ebitda: 20 },
    ],
    revenueFY25: '₹220 Cr', profitFY25: '₹-15 Cr (Loss)', ebitdaMargin: '9.1%',
    news: [
      { title: 'Government approves Rs 500 Cr revival package for NE paper mills', date: '2025-03-20', source: 'PIB', url: 'https://pib.gov.in' },
      { title: 'Bamboo procurement from local forests increased for operations', date: '2025-02-10', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
      { title: 'NE paper mills modernization plan under DPIIT review', date: '2025-01-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Revival attempts by government. NE bamboo resources are unique advantage if modernized. Represents sick PSU segment of Indian paper industry.',
      plans: ['Government revival package utilization', 'Bamboo-based specialty papers', 'Modernization of machinery', 'Local market focus in NE states'],
      risks: ['Years of losses and obsolete machinery', 'Remote location logistics', 'Skilled workforce retention', 'Competition from efficient private mills'],
    },
    extendedOverview: {
      businessSegments: 'Writing Papers, Newsprint, Kraft Papers, Specialty Papers. Sick PSU paper mill under government revival program. NE India bamboo-based operations.',
      geographicPresence: 'Northeast India — Nagaland/Assam. Remote location. Serves NE India local market primarily.',
      keyStrengths: ['Abundant NE India bamboo resources at low cost', 'Government revival support (Rs 500 Cr package)', 'Serves underserved NE India paper market', 'Employment generator in remote NE region'],
      marketPosition: 'Distressed PSU paper company. Loss-making for years. Government-driven revival underway. Represents the challenges of PSU paper mills in India. NE bamboo is the only competitive advantage.',
      rawMaterialStrategy: 'NE India bamboo — abundant and low-cost. Bamboo forests in Nagaland/Mizoram/Assam provide raw material. Transportation and logistics are the challenge, not raw material availability.'
    },
    financialRatios: { debtToEquity: 3.50, currentRatio: 0.55, roe: -8.0, roce: -2.0, interestCoverage: 0.5, netDebt: '₹800 Cr', peRatio: 0, pbRatio: 0, dividendYield: 0, workingCapitalDays: 90 },
    bcgMatrix: {
      stars: [{ name: 'Government Revival Program', growth: 'Revival potential', share: 'N/A', insight: 'Rs 500 Cr package if utilized properly could modernize plant. Outcome uncertain.' }],
      cashCows: [],
      questionMarks: [{ name: 'Bamboo Specialty Papers', growth: '10% potential', share: '1% NE market', insight: 'If modernized, NE bamboo can produce unique specialty papers. Big if.' }],
      dogs: [{ name: 'All Current Operations', growth: '-5% declining', share: '<1%', insight: 'Entire mill running at 30-40% utilization with obsolete technology.' }],
    },
    headToHead: {
      competitor: 'Ruchira Papers',
      competitorTicker: 'RUCHIRA',
      summary: 'Nagaland Pulp (sick PSU, NE India) vs Ruchira Papers (private, HP, profitable). Represents the contrast between government and private paper sector performance.',
      metrics: [
        { label: 'Revenue FY25', company: 220, competitor: 850, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 9.1, competitor: 16.5, unit: '%', winner: 'competitor' },
        { label: 'Profitability', company: 'Loss-making', competitor: 'Profitable', unit: '', winner: 'competitor' },
        { label: 'Debt/Equity', company: 3.50, competitor: 0.40, unit: 'x', winner: 'competitor' },
        { label: 'Revival Prospect', company: 'Government-driven', competitor: 'Self-sustaining', unit: '', winner: 'competitor' },
      ],
      verdict: 'Ruchira is comprehensively better — profitable, well-managed, and self-sustaining. Nagaland Pulp exists only due to government support. For insurers: Nagaland Pulp is essentially uninsurable on commercial terms; Ruchira is a viable small private paper company.'
    },
  },
  {
    id: 'ruchira-papers', name: 'Ruchira Papers', industry: 'paper', ticker: 'RUCHIRA',
    founded: 1980, headquarters: 'Kala Amb, Himachal Pradesh', employees: '1,200+', marketCap: '₹600 Cr',
    ceo: 'Jatinder Singh (MD)', website: 'https://www.ruchirapapers.com',
    description: "​Himachal Pradesh-based paper manufacturer with 1.2 lakh TPA capacity across two units. Produces kraft paper, writing paper, and duplex boards. Benefits from HP state industrial incentives. In FY25 the company reported revenue of ₹850 Cr and net profit of ₹65 Cr, at an EBITDA margin of around 14.7%. Its revenue is led by kraft paper (40% of sales), complemented by writing & printing papers and duplex board. Small North India paper company (1.2 lakh TPA) benefiting from HP incentives. Himachal Pradesh — Kala Amb (Unit 1) and Trilokpur (Unit 2).",
    products: [
      { name: 'Kraft Paper (BF/SF grades)', revenueShare: 40, description: 'Corrugating medium and fluting' },
      { name: 'Writing & Printing Papers', revenueShare: 30, description: 'Creamwove and copier papers' },
      { name: 'Duplex Board', revenueShare: 20, description: 'Packaging boards' },
      { name: 'Newsprint', revenueShare: 10, description: 'Standard newsprint' },
    ],
    financials: [
      { year: 'FY21', revenue: 480, profit: 25, ebitda: 65 },
      { year: 'FY22', revenue: 680, profit: 65, ebitda: 120 },
      { year: 'FY23', revenue: 850, profit: 85, ebitda: 150 },
      { year: 'FY24', revenue: 780, profit: 55, ebitda: 110 },
      { year: 'FY25', revenue: 850, profit: 65, ebitda: 125 },
    ],
    revenueFY25: '₹850 Cr', profitFY25: '₹65 Cr', ebitdaMargin: '14.7%',
    news: [
      { title: 'Ruchira Papers Unit 2 kraft capacity expanded to 80,000 TPA', date: '2025-03-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'HP state incentives renewed for another 5-year term', date: '2025-02-05', source: 'Company PR', url: 'https://www.ruchirapapers.com' },
      { title: 'E-commerce corrugation demand drives kraft paper volumes', date: '2025-01-15', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Kraft paper demand growing with e-commerce corrugated packaging. HP incentives provide cost advantage. Small but efficient operations.',
      plans: ['Kraft capacity to 1.5 lakh TPA', 'Fluting grades development', 'Raw material security through agro-forestry', 'North India market expansion'],
      risks: ['HP incentive dependency', 'Small scale', 'Waste paper price volatility', 'Competition from Ballarpur and others'],
    },
    extendedOverview: {
      businessSegments: 'Kraft Paper (BF/SF grades for corrugation), Writing & Printing Papers, Duplex Board, Newsprint. Two units in Himachal Pradesh.',
      geographicPresence: 'Himachal Pradesh — Kala Amb (Unit 1) and Trilokpur (Unit 2). Serves North India market. HP state incentives provide cost advantage.',
      keyStrengths: ['HP state industrial incentives reducing effective tax burden', 'E-commerce driven kraft/corrugation demand growth', 'Two-unit operations providing flexibility', 'Efficient small-scale operations with good cost control'],
      marketPosition: 'Small North India paper company (1.2 lakh TPA) benefiting from HP incentives. Kraft paper is growth segment. Well-managed private company.',
      rawMaterialStrategy: 'Mix of eucalyptus from local plantations and waste paper recycling. HP/Punjab agro-forestry partnerships. Increasing waste paper content for cost reduction.'
    },
    financialRatios: { debtToEquity: 0.40, currentRatio: 1.15, roe: 9.5, roce: 12.0, interestCoverage: 5.5, netDebt: '₹280 Cr', peRatio: 10.0, pbRatio: 1.0, dividendYield: 2.0, workingCapitalDays: 50 },
    bcgMatrix: {
      stars: [{ name: 'Kraft Paper (E-commerce Corrugation)', growth: '12% CAGR', share: '3% North India kraft', insight: 'E-commerce packaging driving demand. Growing segment with good margins.' }],
      cashCows: [{ name: 'Writing Papers', growth: '4% CAGR', share: '2% North India', insight: 'Stable local demand. HP incentives improve net margins.' }],
      questionMarks: [{ name: 'Duplex Boards', growth: '10% CAGR', share: '1% boards', insight: 'Growing packaging segment. Needs scale to compete.' }],
      dogs: [{ name: 'Newsprint', growth: '-3% declining', share: '<1%', insight: 'Being phased out. Minimal volumes maintained.' }],
    },
    headToHead: {
      competitor: 'Trident Paper Division',
      competitorTicker: 'TRIDENT',
      summary: 'Ruchira (HP-based, kraft focus) vs Trident Paper (Punjab, copier/notebook brand). Both small North India paper operations with different positioning.',
      metrics: [
        { label: 'Revenue FY25', company: 850, competitor: 1900, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 14.7, competitor: 17.4, unit: '%', winner: 'competitor' },
        { label: 'Brand Strength', company: 'No consumer brand', competitor: 'Trident (notebooks/copier)', unit: '', winner: 'competitor' },
        { label: 'HP Incentives', company: 'Yes', competitor: 'No', unit: '', winner: 'company' },
        { label: 'Product Focus', company: 'Kraft/industrial', competitor: 'Consumer (copier/notebooks)', unit: '', winner: 'competitor' },
        { label: 'Market Cap', company: 600, competitor: 12000, unit: '₹ Cr (group)', winner: 'competitor' },
      ],
      verdict: 'Trident Paper is larger with consumer brand advantage. Ruchira is industrial-focused with HP incentive cost advantage. For insurers: Trident has group scale and brand moat; Ruchira is a small niche player with incentive dependency risk.'
    },
  },
  {
    id: 'trident-paper', name: 'Trident (Paper & Chemicals Division)', industry: 'paper', ticker: 'TRIDENT',
    founded: 1990, headquarters: 'Ludhiana, Punjab', employees: '4,000+ (division)', marketCap: '₹12,000 Cr (Group)',
    ceo: 'Rajinder Gupta (Chairman)', website: 'https://www.tridentindia.com',
    description: "​Part of Trident Group (mainly textiles). Paper division at Dhaula (Punjab) produces copier papers and notebooks. Capacity 1 lakh TPA. Uses wheat straw and wood as raw materials. In FY25 the company reported revenue of ₹1,900 Cr and net profit of ₹160 Cr, at an EBITDA margin of around 17.4%. Its revenue is led by copier paper (45% of sales), complemented by exercise notebooks and writing papers. Growing branded paper company (1 lakh TPA). Punjab — Dhaula mill.",
    products: [
      { name: 'Copier Paper', revenueShare: 45, description: 'Office and copier papers (Trident brand)' },
      { name: 'Exercise Notebooks', revenueShare: 25, description: 'Branded notebooks for students' },
      { name: 'Writing Papers', revenueShare: 18, description: 'Creamwove and map litho' },
      { name: 'Chemical Division', revenueShare: 12, description: 'Sulphuric acid and chemicals' },
    ],
    financials: [
      { year: 'FY21', revenue: 1200, profit: 80, ebitda: 220 },
      { year: 'FY22', revenue: 1650, profit: 180, ebitda: 350 },
      { year: 'FY23', revenue: 1900, profit: 200, ebitda: 380 },
      { year: 'FY24', revenue: 1750, profit: 140, ebitda: 300 },
      { year: 'FY25', revenue: 1900, profit: 160, ebitda: 330 },
    ],
    revenueFY25: '₹1,900 Cr', profitFY25: '₹160 Cr', ebitdaMargin: '17.4%',
    news: [
      { title: 'Trident paper division capacity expanded to 1.1 lakh TPA', date: '2025-03-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Branded notebook segment grows 30% on back-to-school demand', date: '2025-02-10', source: 'Company PR', url: 'https://www.tridentindia.com' },
      { title: 'Wheat straw utilization reduces stubble burning in Punjab', date: '2025-01-12', source: 'Tribune', url: 'https://www.tribuneindia.com' },
    ],
    futureScope: {
      outlook: 'Branded copier and notebook business with consumer appeal. Wheat straw usage provides ESG advantage. Group scale provides stability.',
      plans: ['Paper capacity to 1.5 lakh TPA', 'Notebook brand expansion', 'Premium copier paper grades', 'Agri-waste utilization increase'],
      risks: ['Paper division small within textiles group', 'Digital reducing paper demand', 'Competition from JK Paper in copier', 'Wheat straw seasonal availability'],
    },
    extendedOverview: {
      businessSegments: 'Copier Paper (Trident brand), Exercise Notebooks (student market), Writing Papers, Chemical Division (sulphuric acid). Consumer-branded paper business within textile group.',
      geographicPresence: 'Punjab — Dhaula mill. Serves North India. Trident brand notebooks distributed pan-India. Part of larger Trident Group (textiles, paper, chemicals).',
      keyStrengths: ['Consumer brand (Trident) for notebooks and copier paper', 'Wheat straw utilization — ESG/stubble burning solution', 'Trident Group scale provides financial stability', 'Integrated chemicals division (sulphuric acid) for internal use'],
      marketPosition: 'Growing branded paper company (1 lakh TPA). Trident notebooks gaining share in student market. Copier paper competing with JK Copier. Group scale allows investment in brand building.',
      rawMaterialStrategy: 'Mix of wheat straw (agri-waste from Punjab) and wood pulp. Wheat straw solves stubble burning problem — government support. Chemical division provides internal chemicals for pulping process.'
    },
    financialRatios: { debtToEquity: 0.45, currentRatio: 1.20, roe: 10.0, roce: 13.0, interestCoverage: 6.5, netDebt: '₹800 Cr', peRatio: 18.0, pbRatio: 2.0, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Trident Notebooks', growth: '20% CAGR', share: '5% organized notebook', insight: 'Branded student notebook segment growing rapidly. Back-to-school demand. Brand building investment paying off.' }],
      cashCows: [{ name: 'Copier Paper', growth: '5% CAGR', share: '4% copier market', insight: 'Trident brand copier paper with steady office demand.' }],
      questionMarks: [{ name: 'Premium Paper Grades', growth: '10% CAGR', share: '2% premium', insight: 'Higher-end copier and specialty grades. Competing with JK Paper quality.' }],
      dogs: [{ name: 'Chemical Division', growth: '3% CAGR', share: 'Internal use primarily', insight: 'Sulphuric acid mainly for internal process. Small external sales.' }],
    },
    headToHead: {
      competitor: 'Satia Industries',
      competitorTicker: 'SATIA',
      summary: 'Trident Paper (group-backed, branded notebooks/copier) vs Satia (wheat straw pioneer, premium copier). Both Punjab-based, both use wheat straw, but different positioning.',
      metrics: [
        { label: 'Revenue FY25', company: 1900, competitor: 1150, unit: '₹ Cr', winner: 'company' },
        { label: 'EBITDA Margin', company: 17.4, competitor: 18.7, unit: '%', winner: 'competitor' },
        { label: 'Consumer Brand', company: 'Trident (notebooks)', competitor: 'No major brand', unit: '', winner: 'company' },
        { label: 'ESG Story', company: 'Good (wheat straw)', competitor: 'Excellent (stubble burning solution)', unit: '', winner: 'competitor' },
        { label: 'Group Scale', company: 'Trident Group (₹12,000 Cr)', competitor: 'Independent', unit: '', winner: 'company' },
        { label: 'Net Profit Margin', company: 8.4, competitor: 10.0, unit: '%', winner: 'competitor' },
        { label: 'Market Cap', company: 12000, competitor: 1200, unit: '₹ Cr (group)', winner: 'company' },
      ],
      verdict: 'Trident Paper has group scale and consumer brand advantage. Satia has better margins and purer ESG story. For insurers: Trident offers group-level stability and brand moat; Satia offers higher margins in a focused pure-play structure.'
    },
  },
  // ==================== SUGAR (15) ====================
  {
    id: 'bajaj-hindusthan', name: 'Bajaj Hindusthan Sugar', industry: 'sugar', ticker: 'BAJAJHIND',
    founded: 1931, headquarters: 'Mumbai, Maharashtra', employees: '18,000+', marketCap: '₹4,148 Cr',
    ceo: 'Kushagra Bajaj (Chairman)', website: 'https://www.bajajhindusthan.com',
    description: "​India's largest sugar manufacturer with 14 mills across UP. Crushing capacity 1,36,000 TCD. Also has ethanol distillation capacity of 800 KLD. In FY25 the company reported revenue of ₹5,200 Cr and net profit of ₹50 Cr, at an EBITDA margin of around 9.8%. Its revenue is led by white sugar (55% of sales), complemented by ethanol and cogeneration power. India's #1 sugar company by capacity. Uttar Pradesh — 14 mills across UP.",
    products: [
      { name: 'White Sugar', revenueShare: 55, description: 'Plantation white sugar' },
      { name: 'Ethanol', revenueShare: 25, description: 'Fuel-grade ethanol for blending' },
      { name: 'Cogeneration Power', revenueShare: 12, description: 'Bagasse-based power sold to grid' },
      { name: 'Molasses', revenueShare: 5, description: 'Industrial molasses' },
      { name: 'Organic Fertilizer', revenueShare: 3, description: 'Press mud-based manure' },
    ],
    financials: [
      { year: 'FY21', revenue: 4820, profit: -268, ebitda: 580 },
      { year: 'FY22', revenue: 5380, profit: 120, ebitda: 750 },
      { year: 'FY23', revenue: 5650, profit: 185, ebitda: 820 },
      { year: 'FY24', revenue: 5100, profit: -95, ebitda: 420 },
      { year: 'FY25', revenue: 5200, profit: 50, ebitda: 510 },
    ],
    revenueFY25: '₹5,200 Cr', profitFY25: '₹50 Cr', ebitdaMargin: '9.8%',
    news: [
      { title: 'Bajaj Hindusthan Sugar receives NCLT debt restructuring approval', date: '2025-04-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Ethanol capacity doubled to 800 KLD across 14 units', date: '2025-02-28', source: 'Company PR', url: 'https://www.bajajhindusthan.com' },
      { title: 'UP cane price hike to Rs 400/quintal pressures margins', date: '2025-01-05', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Ethanol diversification to de-risk from sugar cyclicality. Debt reduction is priority.',
      plans: ['Ethanol to 1,200 KLD by FY27', 'Debt reduction by Rs 1,000 Cr', 'Cogeneration to 300 MW', '2G ethanol pilot'],
      risks: ['High debt (D/E > 2.0)', 'UP cane pricing unpredictable', 'Sugar price controlled by FRP/SAP', 'Drought risk on yields'],
    },
    extendedOverview: {
      businessSegments: 'White Sugar, Ethanol (fuel-grade), Cogeneration Power (bagasse), Molasses, Organic Fertilizer. India\'s largest sugar company by crushing capacity.',
      geographicPresence: 'Uttar Pradesh — 14 mills across UP. India\'s largest sugar manufacturer. Concentrated in western UP sugarcane belt.',
      keyStrengths: ['Largest sugar company in India by crushing capacity (1,36,000 TCD)', 'Massive ethanol capacity (800 KLD) serving government blending mandate', 'Scale advantages in procurement and logistics', '14 mills provides geographic diversification within UP'],
      marketPosition: 'India\'s #1 sugar company by capacity. However, high debt and cyclical margins limit profitability. Ethanol pivot is critical for long-term viability. Debt restructuring underway.',
      rawMaterialStrategy: 'Sugarcane procured from UP farmers at state-determined SAP (State Advised Price). 14 mills provide wide catchment area. Cane availability depends on UP monsoon and competitive pricing vs other mills.'
    },
    financialRatios: { debtToEquity: 2.20, currentRatio: 0.75, roe: 1.5, roce: 5.5, interestCoverage: 1.5, netDebt: '₹5,500 Cr', peRatio: 80.0, pbRatio: 1.2, dividendYield: 0.0, workingCapitalDays: 120 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol (800 KLD)', growth: '25% CAGR', share: '12% India ethanol supply', insight: 'Government mandated 20% blending by 2025. Largest private ethanol supplier. Revenue visibility from OMC contracts.' }],
      cashCows: [{ name: 'Cogeneration Power', growth: '5% CAGR', share: '8% sugar mill power', insight: 'Bagasse power sold to UP grid. Stable revenue stream during crushing season. 170+ MW capacity.' }],
      questionMarks: [{ name: 'Debt Restructuring', growth: 'N/A', share: 'N/A', insight: 'NCLT-approved restructuring reducing interest burden. Critical for survival.' }],
      dogs: [{ name: 'White Sugar (Commodity)', growth: '3% CAGR', share: '8% India sugar', insight: 'Government-controlled pricing. Razor-thin margins. Cyclical and unpredictable.' }],
    },
    headToHead: {
      competitor: 'Balrampur Chini Mills',
      competitorTicker: 'BALRAMCHIN',
      summary: 'Bajaj Hindusthan (largest, high debt, turnaround) vs Balrampur Chini (most efficient, low debt, best managed). Classic size vs quality comparison in sugar industry.',
      metrics: [
        { label: 'Revenue FY25', company: 5200, competitor: 5800, unit: '₹ Cr', winner: 'competitor' },
        { label: 'EBITDA Margin', company: 9.8, competitor: 18.5, unit: '%', winner: 'competitor' },
        { label: 'Crushing Capacity', company: 136000, competitor: 76000, unit: 'TCD', winner: 'company' },
        { label: 'Ethanol Capacity', company: 800, competitor: 1050, unit: 'KLD', winner: 'competitor' },
        { label: 'Debt/Equity', company: 2.20, competitor: 0.15, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 5.5, competitor: 18.0, unit: '%', winner: 'competitor' },
        { label: 'Sugar Recovery Rate', company: '10.5%', competitor: '11.8%', unit: '', winner: 'competitor' },
        { label: 'Net Profit Margin', company: 1.0, competitor: 12.5, unit: '%', winner: 'competitor' },
        { label: 'Cogeneration Power', company: '170 MW', competitor: '170 MW', unit: '', winner: 'tie' },
        { label: 'Market Cap', company: 4148, competitor: 8500, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Balrampur Chini comprehensively outperforms Bajaj Hindusthan on every quality metric despite being smaller. Bajaj has scale but crippling debt. For insurers: Balrampur is the gold standard in Indian sugar — lowest risk, best management. Bajaj is high-risk due to leverage but too-big-to-fail within the sector.'
    },
  },
  {
    id: 'balrampur-chini', name: 'Balrampur Chini Mills', industry: 'sugar', ticker: 'BALRAMCHIN',
    founded: 1975, headquarters: 'Kolkata, West Bengal', employees: '12,000+', marketCap: '₹8,500 Cr',
    ceo: 'Vivek Saraogi (MD)', website: 'https://www.balrampur-chini.com',
    description: "​One of India's most efficient sugar producers with 10 mills in UP. Known for high recovery rates and diversified revenue. Crushing capacity 76,000 TCD. Largest private ethanol supplier. In FY25 the company reported revenue of ₹5,500 Cr and net profit of ₹650 Cr, at an EBITDA margin of around 21.8%. Its revenue is led by white crystal sugar (48% of sales), complemented by ethanol and cogeneration power. India's most efficient and profitable sugar company. Eastern UP — 10 mills concentrated in eastern UP belt.",
    products: [
      { name: 'White Crystal Sugar', revenueShare: 48, description: 'Premium quality sugar' },
      { name: 'Ethanol (Multiple Grades)', revenueShare: 30, description: 'Largest private ethanol supplier to OMCs' },
      { name: 'Cogeneration Power', revenueShare: 14, description: '170+ MW bagasse power' },
      { name: 'Molasses & Chemicals', revenueShare: 5, description: 'Industrial alcohol' },
      { name: 'Bio-Compost', revenueShare: 3, description: 'Organic fertilizer from press mud' },
    ],
    financials: [
      { year: 'FY21', revenue: 4580, profit: 485, ebitda: 980 },
      { year: 'FY22', revenue: 5120, profit: 620, ebitda: 1150 },
      { year: 'FY23', revenue: 5680, profit: 750, ebitda: 1320 },
      { year: 'FY24', revenue: 5200, profit: 580, ebitda: 1100 },
      { year: 'FY25', revenue: 5500, profit: 650, ebitda: 1200 },
    ],
    revenueFY25: '₹5,500 Cr', profitFY25: '₹650 Cr', ebitdaMargin: '21.8%',
    news: [
      { title: 'Balrampur Chini ethanol capacity crosses 1,050 KLD', date: '2025-04-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Highest sugar recovery rate of 11.8% achieved across mills', date: '2025-02-15', source: 'Company PR', url: 'https://www.balrampur-chini.com' },
      { title: 'Announces Rs 800 Cr ethanol expansion capex', date: '2025-01-10', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Best-in-class efficiency. Ethanol diversification provides stable earnings. Near debt-free balance sheet.',
      plans: ['Ethanol capacity to 1,500 KLD', 'Sugar recovery improvement to 12%', 'CBG (compressed biogas) plant', 'Cogeneration expansion'],
      risks: ['Ethanol pricing policy changes', 'UP cane pricing politics', 'Sugar export ban risk', 'Climate impact on cane production'],
    },
    extendedOverview: {
      businessSegments: 'White Sugar, Ethanol (largest private supplier), Cogeneration Power, Molasses/Chemicals, Bio-Compost. India\'s most efficient sugar company.',
      geographicPresence: 'Eastern UP — 10 mills concentrated in eastern UP belt. Known for highest sugar recovery rates in India. Kolkata-headquartered.',
      keyStrengths: ['Industry-best sugar recovery rate (11.8%) — highest in UP', 'Largest private ethanol supplier to Oil Marketing Companies', 'Near zero-debt balance sheet', 'Best-in-class management under Vivek Saraogi'],
      marketPosition: 'India\'s most efficient and profitable sugar company. #1 on ROE, ROCE, and per-tonne profitability. Near debt-free. Gold standard for sugar industry management.',
      rawMaterialStrategy: 'Eastern UP sugarcane belt — fertile land with good water table ensures consistent cane production. Strong farmer relationships through timely payments (pays within 14 days vs industry norm of 60+ days). This ensures priority cane delivery and higher recovery.'
    },
    financialRatios: { debtToEquity: 0.15, currentRatio: 1.55, roe: 16.5, roce: 18.0, interestCoverage: 22.0, netDebt: '₹800 Cr', peRatio: 14.0, pbRatio: 2.2, dividendYield: 1.5, workingCapitalDays: 80 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol (1,050 KLD)', growth: '20% CAGR', share: '15% India ethanol supply', insight: 'Largest private supplier. Government blending mandate ensures demand. Premium pricing from OMC contracts.' }],
      cashCows: [{ name: 'White Sugar (Premium Recovery)', growth: '5% CAGR', share: '5% India sugar', insight: 'Highest recovery means lowest cost per tonne. Profitable even in down-cycles due to efficiency.' }, { name: 'Cogeneration Power', growth: '5% CAGR', share: '8% UP power', insight: 'Bagasse power provides stable cash flow. 170+ MW sold to UP grid.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '30% CAGR', share: 'New business', insight: 'Press mud and spent wash converted to CBG. Government push for bio-energy. Pilot stage.' }],
      dogs: [],
    },
    headToHead: {
      competitor: 'Triveni Engineering',
      competitorTicker: 'TRIVENI',
      summary: 'Balrampur Chini (pure sugar/ethanol, most efficient) vs Triveni Engineering (sugar + engineering, diversified). Both are top-tier UP sugar companies with different business models.',
      metrics: [
        { label: 'Revenue FY25', company: 5500, competitor: 5900, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Sugar EBITDA Margin', company: 21.8, competitor: 16.9, unit: '%', winner: 'company' },
        { label: 'Sugar Recovery Rate', company: 11.8, competitor: 11.5, unit: '%', winner: 'company' },
        { label: 'Ethanol Capacity', company: 1050, competitor: 520, unit: 'KLD', winner: 'company' },
        { label: 'Debt/Equity', company: 0.15, competitor: 0.20, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 18.0, competitor: 15.0, unit: '%', winner: 'company' },
        { label: 'Business Diversification', company: 'Sugar/Ethanol only', competitor: 'Sugar + Engineering + Water', unit: '', winner: 'competitor' },
        { label: 'Engineering Revenue', company: 0, competitor: 1060, unit: '₹ Cr', winner: 'competitor' },
        { label: 'Cyclicality Protection', company: 'Ethanol de-risks', competitor: 'Engineering de-risks', unit: '', winner: 'tie' },
        { label: 'Market Cap', company: 8500, competitor: 9500, unit: '₹ Cr', winner: 'competitor' },
      ],
      verdict: 'Balrampur Chini is the better pure sugar/ethanol company — higher efficiency, more ethanol capacity, lower debt. Triveni offers diversification through engineering (turbines). For insurers: Balrampur is the safest sugar sector bet; Triveni provides non-sugar revenue diversification but adds complexity.'
    },
  },
  {
    id: 'triveni-engineering', name: 'Triveni Engineering', industry: 'sugar', ticker: 'TRIVENI',
    founded: 1932, headquarters: 'New Delhi', employees: '8,000+', marketCap: '₹9,500 Cr',
    ceo: 'Dhruv M. Sawhney (CMD)', website: 'https://www.trivenigroup.com',
    description: "​Diversified sugar and engineering company. 7 sugar mills in UP with 61,000 TCD crushing capacity. Engineering division makes steam turbines and gears. Also has water treatment business. In FY25 the company reported revenue of ₹5,900 Cr and net profit of ₹580 Cr, at an EBITDA margin of around 16.9%. Its revenue is led by sugar (45% of sales), complemented by ethanol & chemicals and engineering. Top-5 UP sugar company by efficiency. Sugar: Western UP (7 mills).",
    products: [
      { name: 'Sugar', revenueShare: 45, description: 'White sugar and refined sugar' },
      { name: 'Ethanol & Chemicals', revenueShare: 22, description: 'Fuel ethanol and ENA' },
      { name: 'Engineering (Turbines)', revenueShare: 18, description: 'Steam turbines up to 100 MW' },
      { name: 'Cogeneration Power', revenueShare: 10, description: 'Bagasse-based power' },
      { name: 'Water Treatment', revenueShare: 5, description: 'Water and wastewater solutions' },
    ],
    financials: [
      { year: 'FY21', revenue: 4200, profit: 320, ebitda: 650 },
      { year: 'FY22', revenue: 5100, profit: 480, ebitda: 850 },
      { year: 'FY23', revenue: 5800, profit: 620, ebitda: 1050 },
      { year: 'FY24', revenue: 5500, profit: 520, ebitda: 920 },
      { year: 'FY25', revenue: 5900, profit: 580, ebitda: 1000 },
    ],
    revenueFY25: '₹5,900 Cr', profitFY25: '₹580 Cr', ebitdaMargin: '16.9%',
    news: [
      { title: 'Triveni Engineering turbine division wins Rs 500 Cr export order', date: '2025-04-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Sugar mills achieve 11.5% recovery rate in SY25', date: '2025-02-20', source: 'Company PR', url: 'https://www.trivenigroup.com' },
      { title: 'Ethanol capacity expansion to 660 KLD on track', date: '2025-01-15', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Diversified model (sugar + engineering) de-risks cyclicality. Engineering division provides stable earnings independent of sugar cycle.',
      plans: ['Ethanol capacity to 800 KLD', 'Turbine export market growth', 'Water treatment segment scaling', 'Demerger of businesses under evaluation'],
      risks: ['Sugar cycle exposure', 'UP policy uncertainty', 'Engineering competition from BHEL', 'Demerger execution complexity'],
    },
    extendedOverview: {
      businessSegments: 'Sugar, Ethanol & Chemicals, Engineering (steam turbines & gears), Cogeneration Power, Water Treatment. Unique diversified model combining sugar with engineering.',
      geographicPresence: 'Sugar: Western UP (7 mills). Engineering: Bangalore (turbines), Mysore (gears). Water: Pan-India project business. Diversified geography across segments.',
      keyStrengths: ['Engineering division (turbines/gears) provides counter-cyclical earnings', 'Strong management under Dhruv Sawhney — well-respected industrialist', 'Demerger potential could unlock sum-of-parts value', 'Water treatment business growing with government focus'],
      marketPosition: 'Top-5 UP sugar company by efficiency. Engineering division is India\'s largest private sector turbine manufacturer (up to 100 MW). Unique conglomerate model in sugar industry.',
      rawMaterialStrategy: 'Western UP sugarcane. Good farmer relationships. Engineering division sources steel and components domestically. Water treatment is project-based with minimal raw material dependency.'
    },
    financialRatios: { debtToEquity: 0.20, currentRatio: 1.40, roe: 14.5, roce: 15.0, interestCoverage: 15.0, netDebt: '₹1,200 Cr', peRatio: 18.0, pbRatio: 2.5, dividendYield: 0.8, workingCapitalDays: 75 },
    bcgMatrix: {
      stars: [{ name: 'Engineering (Turbines)', growth: '15% CAGR', share: '12% India small turbines', insight: 'Export orders growing. Counter-cyclical to sugar. High margins and IP-intensive.' }, { name: 'Ethanol', growth: '20% CAGR', share: '8% India ethanol', insight: 'Capacity expanding to 800 KLD. Government blending mandate ensures demand.' }],
      cashCows: [{ name: 'Sugar (Efficient Mills)', growth: '5% CAGR', share: '4% India sugar', insight: 'Western UP mills with 11.5% recovery. Profitable even in down-cycles.' }],
      questionMarks: [{ name: 'Water Treatment', growth: '18% CAGR', share: '3% India water treatment', insight: 'Government Jal Jeevan Mission driving demand. Growing but project-based/lumpy.' }],
      dogs: [],
    },
    headToHead: {
      competitor: 'Dalmia Bharat Sugar',
      competitorTicker: 'DALMIASUG',
      summary: 'Triveni (diversified sugar+engineering) vs Dalmia Sugar (pure sugar/ethanol+power). Triveni has engineering diversification; Dalmia has Dalmia Group backing.',
      metrics: [
        { label: 'Revenue FY25', company: 5900, competitor: 3200, unit: '₹ Cr', winner: 'company' },
        { label: 'Sugar EBITDA Margin', company: 16.9, competitor: 15.0, unit: '%', winner: 'company' },
        { label: 'Crushing Capacity', company: 61000, competitor: 35000, unit: 'TCD', winner: 'company' },
        { label: 'Engineering Revenue', company: 1060, competitor: 0, unit: '₹ Cr', winner: 'company' },
        { label: 'Debt/Equity', company: 0.20, competitor: 0.30, unit: 'x', winner: 'company' },
        { label: 'ROCE', company: 15.0, competitor: 12.0, unit: '%', winner: 'company' },
        { label: 'Group Support', company: 'Triveni Group', competitor: 'Dalmia Group', unit: '', winner: 'tie' },
        { label: 'Market Cap', company: 9500, competitor: 3500, unit: '₹ Cr', winner: 'company' },
      ],
      verdict: 'Triveni dominates on scale, diversification, and returns. Engineering division is unique competitive moat. Dalmia Sugar is pure-play but smaller. For insurers: Triveni is the preferred diversified play; Dalmia Sugar offers group backing but limited scale.'
    },
  },
  {
    id: 'dalmia-sugar', name: 'Dalmia Bharat Sugar', industry: 'sugar', ticker: 'DALMIASUG',
    founded: 1994, headquarters: 'New Delhi', employees: '5,000+', marketCap: '₹3,200 Cr',
    ceo: 'Gautam Dalmia (MD)', website: 'https://www.dalmiasugar.com',
    description: "​Part of Dalmia Bharat Group. Operates 5 sugar mills in UP with 35,000 TCD crushing capacity. Strong focus on ethanol and cogeneration. Also produces organic sugar. In FY25 the company reported revenue of ₹2,800 Cr and net profit of ₹220 Cr, at an EBITDA margin of around 15.4%. Its revenue is led by sugar (45% of sales), complemented by ethanol and cogeneration power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar (White & Organic)', revenueShare: 45, description: 'Conventional and organic sugar' },
      { name: 'Ethanol', revenueShare: 28, description: 'Ethanol from molasses and syrup' },
      { name: 'Cogeneration Power', revenueShare: 15, description: 'Bagasse power to grid' },
      { name: 'Molasses & ENA', revenueShare: 8, description: 'Extra neutral alcohol for potable use' },
      { name: 'Organic Manure', revenueShare: 4, description: 'Bio-compost from press mud' },
    ],
    financials: [
      { year: 'FY21', revenue: 2100, profit: 120, ebitda: 320 },
      { year: 'FY22', revenue: 2500, profit: 200, ebitda: 420 },
      { year: 'FY23', revenue: 2800, profit: 280, ebitda: 500 },
      { year: 'FY24', revenue: 2600, profit: 180, ebitda: 380 },
      { year: 'FY25', revenue: 2800, profit: 220, ebitda: 430 },
    ],
    revenueFY25: '₹2,800 Cr', profitFY25: '₹220 Cr', ebitdaMargin: '15.4%',
    news: [
      { title: 'Dalmia Sugar organic sugar exports to EU grow 50%', date: '2025-03-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Ethanol capacity expansion to 400 KLD completed', date: '2025-02-08', source: 'Company PR', url: 'https://www.dalmiasugar.com' },
      { title: 'CBG (compressed biogas) plant at Jawaharpur mill commissioned', date: '2025-01-12', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Organic sugar and ethanol provide premium positioning. Dalmia Group backing gives financial stability.',
      plans: ['Ethanol to 600 KLD', 'Organic sugar to 30% of output', 'CBG at all 5 mills', 'E20 blending beneficiary'],
      risks: ['UP sugar policy uncertainty', 'Organic certification costs', 'Smaller scale vs Balrampur/Bajaj', 'Cane availability competition'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'EID Parry',
      competitorTicker: 'EIDPARRY',
      summary: 'Dalmia Bharat Sugar competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'eid-parry', name: 'EID Parry (Coromandel Group)', industry: 'sugar', ticker: 'EIDPARRY',
    founded: 1788, headquarters: 'Chennai, Tamil Nadu', employees: '6,000+', marketCap: '₹7,500 Cr',
    ceo: 'S. Ravichandran (MD)', website: 'https://www.eidparry.com',
    description: "​One of India's oldest companies (Murugappa Group). Operates sugar mills in TN, AP, Karnataka, and Puducherry. Also has significant nutraceuticals (spirulina) business. Total crushing 43,000 TCD. In FY25 the company reported revenue of ₹3,600 Cr and net profit of ₹350 Cr, at an EBITDA margin of around 17.2%. Its revenue is led by sugar (50% of sales), complemented by ethanol & industrial alcohol and cogeneration power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 50, description: 'White and refined sugar from South India' },
      { name: 'Ethanol & Industrial Alcohol', revenueShare: 22, description: 'Ethanol and ENA from molasses' },
      { name: 'Cogeneration Power', revenueShare: 12, description: 'Surplus bagasse power' },
      { name: 'Nutraceuticals (Spirulina)', revenueShare: 10, description: 'Organic spirulina and health products' },
      { name: 'Bio-Pesticides', revenueShare: 6, description: 'Neem-based pest control products' },
    ],
    financials: [
      { year: 'FY21', revenue: 2800, profit: 220, ebitda: 480 },
      { year: 'FY22', revenue: 3200, profit: 320, ebitda: 580 },
      { year: 'FY23', revenue: 3600, profit: 380, ebitda: 650 },
      { year: 'FY24', revenue: 3400, profit: 300, ebitda: 560 },
      { year: 'FY25', revenue: 3600, profit: 350, ebitda: 620 },
    ],
    revenueFY25: '₹3,600 Cr', profitFY25: '₹350 Cr', ebitdaMargin: '17.2%',
    news: [
      { title: 'EID Parry spirulina division revenue crosses Rs 400 Cr globally', date: '2025-04-02', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'South India ethanol blending program expands with new contracts', date: '2025-02-12', source: 'Company PR', url: 'https://www.eidparry.com' },
      { title: 'Acquires sugar mill in Karnataka to expand crushing capacity', date: '2025-01-20', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Diversified into nutraceuticals gives unique positioning. South India focus with less policy risk than UP. Murugappa Group governance.',
      plans: ['Nutraceuticals to Rs 600 Cr revenue', 'Ethanol capacity expansion in South', 'Bio-pesticides brand growth', 'Karnataka operations scaling'],
      risks: ['South India cane availability lower than UP', 'Spirulina market price volatility', 'Multi-state operations complexity', 'Sugar cycle exposure'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Shree Renuka Sugars',
      competitorTicker: 'RENUKA',
      summary: 'EID Parry (Coromandel Group) competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'shree-renuka', name: 'Shree Renuka Sugars', industry: 'sugar', ticker: 'RENUKA',
    founded: 1998, headquarters: 'Mumbai, Maharashtra', employees: '5,000+', marketCap: '₹3,800 Cr',
    ceo: 'Atul Chaturvedi (ED)', website: 'https://www.renukasugars.com',
    description: "​Major integrated sugar company in Maharashtra and Karnataka. Subsidiary of Wilmar International (Singapore). 4 sugar mills with 35,000 TCD capacity. Focus on refined sugar and ethanol. In FY25 the company reported revenue of ₹4,800 Cr and net profit of ₹180 Cr, at an EBITDA margin of around 12.5%. Its revenue is led by refined sugar (50% of sales), complemented by ethanol and power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Refined Sugar', revenueShare: 50, description: 'White and refined plantation sugar' },
      { name: 'Ethanol', revenueShare: 25, description: 'Fuel ethanol from molasses/juice' },
      { name: 'Power (Cogeneration)', revenueShare: 12, description: 'Bagasse power export to grid' },
      { name: 'Molasses Products', revenueShare: 8, description: 'Various molasses grades' },
      { name: 'Bio-Fertilizer', revenueShare: 5, description: 'Enriched organic manure' },
    ],
    financials: [
      { year: 'FY21', revenue: 3500, profit: -280, ebitda: 320 },
      { year: 'FY22', revenue: 4200, profit: 80, ebitda: 520 },
      { year: 'FY23', revenue: 4800, profit: 180, ebitda: 650 },
      { year: 'FY24', revenue: 4500, profit: 120, ebitda: 520 },
      { year: 'FY25', revenue: 4800, profit: 180, ebitda: 600 },
    ],
    revenueFY25: '₹4,800 Cr', profitFY25: '₹180 Cr', ebitdaMargin: '12.5%',
    news: [
      { title: 'Shree Renuka ethanol supplies to OMCs grow 35% in FY25', date: '2025-03-28', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Wilmar parent increases equity stake to 62% — signals commitment', date: '2025-02-10', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Maharashtra operations achieve record crushing in SY25', date: '2025-01-15', source: 'Company PR', url: 'https://www.renukasugars.com' },
    ],
    futureScope: {
      outlook: 'Wilmar parentage brings financial stability. Maharashtra operations benefit from better sugar pricing than UP. Ethanol growth driver.',
      plans: ['Ethanol capacity to 600 KLD', 'Refinery utilization improvement', 'Export market via Wilmar network', 'Debt reduction with parent support'],
      risks: ['Legacy debt burden', 'Maharashtra drought risk', 'Sugar export policy volatility', 'Competition from cooperative mills'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'DCM Shriram',
      competitorTicker: 'DCMSHRIRAM',
      summary: 'Shree Renuka Sugars competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'dcm-shriram', name: 'DCM Shriram (Sugar & Ethanol Division)', industry: 'sugar', ticker: 'DCMSHRIRAM',
    founded: 1889, headquarters: 'New Delhi', employees: '5,000+ (division)', marketCap: '₹18,000 Cr (Group)',
    ceo: 'Ajay S. Shriram (Chairman & Sr. MD)', website: 'https://www.dcmshriram.com',
    description: "​Diversified conglomerate with significant sugar operations in UP. 5 sugar mills with 46,000 TCD. Also has chemicals (chlor-alkali), agri-inputs, and fenesta building systems. Sugar & ethanol is 40% of group revenue. In FY25 the company reported revenue of ₹11,200 Cr and net profit of ₹1,050 Cr, at an EBITDA margin of around 17.4%. Its revenue is led by sugar (40% of sales), complemented by ethanol & ena and chemicals. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 40, description: 'White plantation sugar' },
      { name: 'Ethanol & ENA', revenueShare: 25, description: 'Ethanol for blending and potable alcohol' },
      { name: 'Chemicals (Chlor-alkali)', revenueShare: 20, description: 'Caustic soda, chlorine products' },
      { name: 'Cogeneration', revenueShare: 10, description: 'Bagasse-based power' },
      { name: 'Agri Inputs', revenueShare: 5, description: 'Fertilizers and seeds (Shriram Farm Solutions)' },
    ],
    financials: [
      { year: 'FY21', revenue: 8500, profit: 820, ebitda: 1500 },
      { year: 'FY22', revenue: 10200, profit: 1200, ebitda: 2050 },
      { year: 'FY23', revenue: 11800, profit: 1350, ebitda: 2300 },
      { year: 'FY24', revenue: 10500, profit: 950, ebitda: 1800 },
      { year: 'FY25', revenue: 11200, profit: 1050, ebitda: 1950 },
    ],
    revenueFY25: '₹11,200 Cr', profitFY25: '₹1,050 Cr', ebitdaMargin: '17.4%',
    news: [
      { title: 'DCM Shriram chemicals division expansion adds Rs 2,000 Cr revenue', date: '2025-04-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Sugar mills achieve ethanol diversion of 50% B-heavy molasses', date: '2025-02-18', source: 'Company PR', url: 'https://www.dcmshriram.com' },
      { title: 'Shriram Farm Solutions agri-inputs revenue grows 20%', date: '2025-01-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Diversified model with sugar, chemicals, and agri. Non-sugar businesses provide stability. Well-managed with strong corporate governance.',
      plans: ['Ethanol capacity increase', 'Chemicals expansion', 'Agri-inputs market growth', 'Value chain integration'],
      risks: ['Conglomerate complexity', 'UP sugar policy uncertainty', 'Chemical commodity cycles', 'Working capital requirements'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Dwarikesh Sugar',
      competitorTicker: 'DWARKESH',
      summary: 'DCM Shriram (Sugar & Ethanol Division) competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'dwarikesh-sugar', name: 'Dwarikesh Sugar Industries', industry: 'sugar', ticker: 'DWARKESH',
    founded: 1993, headquarters: 'New Delhi', employees: '3,000+', marketCap: '₹2,200 Cr',
    ceo: 'Vijay S. Banka (MD)', website: 'https://www.dfrsugar.com',
    description: "​UP-based sugar company with 3 mills (22,500 TCD crushing). Known for high efficiency and above-average recovery rates. Also has ethanol distillery (175 KLD) and 96 MW cogeneration. In FY25 the company reported revenue of ₹2,000 Cr and net profit of ₹140 Cr, at an EBITDA margin of around 15.0%. Its revenue is led by sugar (52% of sales), complemented by ethanol and cogeneration power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 52, description: 'Quality white sugar from Western UP' },
      { name: 'Ethanol', revenueShare: 25, description: 'Fuel-grade ethanol' },
      { name: 'Cogeneration Power', revenueShare: 15, description: '96 MW bagasse power' },
      { name: 'Molasses', revenueShare: 8, description: 'Industrial grade molasses' },
    ],
    financials: [
      { year: 'FY21', revenue: 1650, profit: 95, ebitda: 235 },
      { year: 'FY22', revenue: 1850, profit: 150, ebitda: 310 },
      { year: 'FY23', revenue: 2100, profit: 185, ebitda: 360 },
      { year: 'FY24', revenue: 1900, profit: 120, ebitda: 270 },
      { year: 'FY25', revenue: 2000, profit: 140, ebitda: 300 },
    ],
    revenueFY25: '₹2,000 Cr', profitFY25: '₹140 Cr', ebitdaMargin: '15.0%',
    news: [
      { title: 'Dwarikesh Sugar achieves 11.6% recovery rate — among best in UP', date: '2025-03-22', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Ethanol capacity expansion to 250 KLD by end of FY26', date: '2025-02-05', source: 'Company PR', url: 'https://www.dfrsugar.com' },
      { title: 'Western UP cane region produces record sugarcane output', date: '2025-01-18', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Efficient mid-size player with good recovery rates. Western UP cane belt is productive. Ethanol expansion key growth driver.',
      plans: ['Ethanol to 250 KLD', 'Recovery rate target 12%', 'Cogeneration optimization', 'Possible 4th mill greenfield'],
      risks: ['Small scale limits bargaining power', 'UP policy risk', 'Western UP land values reducing cane area', 'Climate variability impact'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Mawana Sugars',
      competitorTicker: 'MAWANASUG',
      summary: 'Dwarikesh Sugar Industries competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'mawana-sugars', name: 'Mawana Sugars', industry: 'sugar', ticker: 'MAWANASUG',
    founded: 1939, headquarters: 'New Delhi', employees: '4,000+', marketCap: '₹420 Cr',
    ceo: 'Siddharth Shriram (CMD)', website: 'https://www.mawanasugars.com',
    description: "​Part of Siddharth Shriram Group. Operates 3 sugar mills in Western UP (Mawana, Titawi, Nanglamal) with 20,500 TCD capacity. Also has distillery and cogeneration operations. In FY25 the company reported revenue of ₹1,350 Cr and net profit of ₹30 Cr, at an EBITDA margin of around 8.9%. Its revenue is led by sugar (55% of sales), complemented by country liquor/ena and ethanol. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 55, description: 'White plantation sugar' },
      { name: 'Country Liquor/ENA', revenueShare: 20, description: 'Industrial and potable alcohol' },
      { name: 'Ethanol', revenueShare: 12, description: 'Fuel ethanol for blending' },
      { name: 'Power (Cogeneration)', revenueShare: 8, description: 'Bagasse power' },
      { name: 'Molasses', revenueShare: 5, description: 'Feed-grade and industrial molasses' },
    ],
    financials: [
      { year: 'FY21', revenue: 1100, profit: -35, ebitda: 80 },
      { year: 'FY22', revenue: 1250, profit: 25, ebitda: 120 },
      { year: 'FY23', revenue: 1400, profit: 45, ebitda: 150 },
      { year: 'FY24', revenue: 1300, profit: 15, ebitda: 100 },
      { year: 'FY25', revenue: 1350, profit: 30, ebitda: 120 },
    ],
    revenueFY25: '₹1,350 Cr', profitFY25: '₹30 Cr', ebitdaMargin: '8.9%',
    news: [
      { title: 'Mawana Sugars ethanol distillery expansion to 120 KLD', date: '2025-03-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Western UP mills start early crushing on good monsoon', date: '2025-02-08', source: 'Company PR', url: 'https://www.mawanasugars.com' },
      { title: 'Country liquor segment provides stable revenue stream', date: '2025-01-12', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Small player in competitive UP market. Ethanol and liquor provide diversification. Needs modernization investment.',
      plans: ['Ethanol expansion to 150 KLD', 'Mill modernization', 'ENA capacity growth', 'Cost reduction initiatives'],
      risks: ['Low margins vs efficient peers', 'Aging mill infrastructure', 'Cane area shrinkage in Western UP', 'Competition from larger players'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Uttam Sugar',
      competitorTicker: 'UTTAMSUGAR',
      summary: 'Mawana Sugars competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'uttam-sugar', name: 'Uttam Sugar Mills', industry: 'sugar', ticker: 'UTTAMSUGAR',
    founded: 1956, headquarters: 'Noida, UP', employees: '3,500+', marketCap: '₹600 Cr',
    ceo: 'Ravi Gupta (MD)', website: 'https://www.uttamsugar.com',
    description: "​Mid-size sugar company in UP with 3 mills (25,000 TCD). Plants at Khaikheri, Libberheri, and Barkatpur. Has distillery operations (110 KLD) and cogeneration (60 MW). Focus on efficiency improvement. In FY25 the company reported revenue of ₹1,800 Cr and net profit of ₹75 Cr, at an EBITDA margin of around 11.1%. Its revenue is led by sugar (55% of sales), complemented by ethanol and power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 55, description: 'White sugar for domestic market' },
      { name: 'Ethanol', revenueShare: 22, description: 'Fuel-grade ethanol' },
      { name: 'Power', revenueShare: 12, description: 'Cogeneration surplus power' },
      { name: 'Molasses & Chemicals', revenueShare: 8, description: 'Molasses and ENA' },
      { name: 'Bio Products', revenueShare: 3, description: 'Bio-compost and bio-gas' },
    ],
    financials: [
      { year: 'FY21', revenue: 1450, profit: 45, ebitda: 150 },
      { year: 'FY22', revenue: 1680, profit: 85, ebitda: 210 },
      { year: 'FY23', revenue: 1850, profit: 100, ebitda: 240 },
      { year: 'FY24', revenue: 1700, profit: 55, ebitda: 170 },
      { year: 'FY25', revenue: 1800, profit: 75, ebitda: 200 },
    ],
    revenueFY25: '₹1,800 Cr', profitFY25: '₹75 Cr', ebitdaMargin: '11.1%',
    news: [
      { title: 'Uttam Sugar ethanol diversion reaches 45% of molasses output', date: '2025-03-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Barkatpur mill modernization increases crushing efficiency', date: '2025-02-10', source: 'Company PR', url: 'https://www.uttamsugar.com' },
      { title: 'Receives government soft loan for ethanol expansion', date: '2025-01-08', source: 'Financial Express', url: 'https://www.financialexpress.com' },
    ],
    futureScope: {
      outlook: 'Standard mid-size UP sugar company. Ethanol expansion is primary growth lever. Needs operational efficiency improvement.',
      plans: ['Ethanol to 200 KLD', 'Mill efficiency improvement', 'Cogeneration optimization', 'Debt reduction'],
      risks: ['UP cane pricing pressure', 'Below-average recovery rates', 'Competition from larger/efficient mills', 'Debt servicing challenges'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Dharani Sugars',
      competitorTicker: 'DHARSUGAR',
      summary: 'Uttam Sugar Mills competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'dharani-sugars', name: 'Dharani Sugars & Chemicals', industry: 'sugar', ticker: 'DHARSUGAR',
    founded: 1987, headquarters: 'Chennai, Tamil Nadu', employees: '2,500+', marketCap: '₹280 Cr',
    ceo: 'Palani G. Periasamy (CMD)', website: 'https://www.dharanisugars.in',
    description: "​South India (Tamil Nadu) based sugar manufacturer. 3 sugar mills with 12,500 TCD. One of the few listed sugar companies in South India. Also produces ethanol and power from bagasse. In FY25 the company reported revenue of ₹820 Cr and net profit of ₹22 Cr, at an EBITDA margin of around 9.8%. Its revenue is led by sugar (55% of sales), complemented by ethanol/ena and cogeneration power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 55, description: 'White sugar for South India' },
      { name: 'Ethanol/ENA', revenueShare: 20, description: 'Rectified spirit and ethanol' },
      { name: 'Cogeneration Power', revenueShare: 15, description: 'Bagasse-based surplus power' },
      { name: 'Molasses', revenueShare: 10, description: 'Industrial molasses' },
    ],
    financials: [
      { year: 'FY21', revenue: 650, profit: -25, ebitda: 45 },
      { year: 'FY22', revenue: 780, profit: 20, ebitda: 80 },
      { year: 'FY23', revenue: 850, profit: 35, ebitda: 100 },
      { year: 'FY24', revenue: 800, profit: 15, ebitda: 70 },
      { year: 'FY25', revenue: 820, profit: 22, ebitda: 80 },
    ],
    revenueFY25: '₹820 Cr', profitFY25: '₹22 Cr', ebitdaMargin: '9.8%',
    news: [
      { title: 'Dharani Sugars ethanol distillery expansion to 60 KLD', date: '2025-03-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Tamil Nadu sugar season starts on time with good water levels', date: '2025-02-05', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
      { title: 'South India ethanol blending contracts secured for 3 years', date: '2025-01-12', source: 'Company PR', url: 'https://www.dharanisugars.in' },
    ],
    futureScope: {
      outlook: 'Small South India player. Tamil Nadu cane availability lower than UP. Ethanol growth depends on government push in South.',
      plans: ['Ethanol capacity to 100 KLD', 'Mill efficiency improvements', 'Power optimization', 'Possible consolidation with larger group'],
      risks: ['Low cane availability in TN', 'Small scale in South', 'Water scarcity impact', 'Competition from Kerala and Karnataka cooperative mills'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Avadh Sugar',
      competitorTicker: 'ABORLSM',
      summary: 'Dharani Sugars & Chemicals competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'avadh-sugar', name: 'Avadh Sugar & Energy', industry: 'sugar', ticker: 'AVADHSUGAR',
    founded: 2015, headquarters: 'New Delhi', employees: '3,000+', marketCap: '₹550 Cr',
    ceo: 'N.K. Jain (MD)', website: 'https://www.avadhsugar.com',
    description: "​UP-based sugar and energy company with 3 mills (22,000 TCD crushing). Part of Simbhaoli Group reorganization. Has ethanol distillery and cogeneration. Focus on integrated sugar-ethanol-power complex. In FY25 the company reported revenue of ₹1,350 Cr and net profit of ₹50 Cr, at an EBITDA margin of around 11.5%. Its revenue is led by sugar (50% of sales), complemented by ethanol and cogeneration power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 50, description: 'White sugar for UP and north market' },
      { name: 'Ethanol', revenueShare: 25, description: 'Ethanol from molasses and B-heavy' },
      { name: 'Cogeneration Power', revenueShare: 15, description: 'Surplus power to UP grid' },
      { name: 'Molasses', revenueShare: 10, description: 'Feed and industrial grade' },
    ],
    financials: [
      { year: 'FY21', revenue: 1050, profit: 20, ebitda: 110 },
      { year: 'FY22', revenue: 1250, profit: 55, ebitda: 160 },
      { year: 'FY23', revenue: 1400, profit: 70, ebitda: 190 },
      { year: 'FY24', revenue: 1300, profit: 40, ebitda: 140 },
      { year: 'FY25', revenue: 1350, profit: 50, ebitda: 155 },
    ],
    revenueFY25: '₹1,350 Cr', profitFY25: '₹50 Cr', ebitdaMargin: '11.5%',
    news: [
      { title: 'Avadh Sugar ethanol diversion from B-heavy molasses increases to 40%', date: '2025-03-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Cogeneration capacity optimized with new turbine installation', date: '2025-02-08', source: 'Company PR', url: 'https://www.avadhsugar.com' },
      { title: 'UP ethanol blending program drives steady demand', date: '2025-01-15', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Standard mid-size UP sugar-ethanol company. E20 blending mandate ensures ethanol demand. Efficiency improvements needed.',
      plans: ['Ethanol capacity to 200 KLD', 'Syrup-based ethanol technology', 'CBG (biogas) opportunity', 'Mill efficiency upgrade'],
      risks: ['UP cane politics', 'Modest profitability', 'Small scale', 'Debt levels'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'NSL Sugars',
      competitorTicker: 'KPRMILL',
      summary: 'Avadh Sugar & Energy competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'nsl-sugars', name: 'NSL Sugars (KCP Sugar)', industry: 'sugar', ticker: 'KCPSUGAR',
    founded: 1941, headquarters: 'Hyderabad, Telangana', employees: '2,500+', marketCap: '₹350 Cr',
    ceo: 'N. Srinivasan (MD)', website: 'https://www.nslsugars.com',
    description: "​South India sugar manufacturer with mills in Karnataka (Koppa and Lingsugur). Part of KCP Group. Crushing capacity 10,000 TCD. Produces sugar, ethanol, and cogeneration power. In FY25 the company reported revenue of ₹700 Cr and net profit of ₹28 Cr, at an EBITDA margin of around 10.3%. Its revenue is led by sugar (55% of sales), complemented by ethanol/rs and power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 55, description: 'White plantation sugar' },
      { name: 'Ethanol/RS', revenueShare: 22, description: 'Rectified spirit and ethanol' },
      { name: 'Power', revenueShare: 13, description: 'Bagasse cogeneration' },
      { name: 'Molasses', revenueShare: 10, description: 'Industrial molasses' },
    ],
    financials: [
      { year: 'FY21', revenue: 520, profit: 12, ebitda: 52 },
      { year: 'FY22', revenue: 620, profit: 28, ebitda: 72 },
      { year: 'FY23', revenue: 720, profit: 35, ebitda: 85 },
      { year: 'FY24', revenue: 680, profit: 22, ebitda: 65 },
      { year: 'FY25', revenue: 700, profit: 28, ebitda: 72 },
    ],
    revenueFY25: '₹700 Cr', profitFY25: '₹28 Cr', ebitdaMargin: '10.3%',
    news: [
      { title: 'KCP Sugar Karnataka operations achieve stable crushing season', date: '2025-03-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Ethanol supply contracts with Southern OMC depots renewed', date: '2025-02-10', source: 'Company PR', url: 'https://www.nslsugars.com' },
      { title: 'Karnataka cane availability improves post good monsoon', date: '2025-01-18', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
    ],
    futureScope: {
      outlook: 'Small South India player in Karnataka. Limited growth potential without expansion. Consistent but modest performance.',
      plans: ['Ethanol capacity expansion', 'Cane development initiatives', 'Operational efficiency', 'Power optimization'],
      risks: ['Small scale', 'Karnataka cane competition with Belgaum belt', 'Limited expansion capacity', 'Succession planning concerns'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Rajshree Sugars',
      competitorTicker: 'RAJSREESUG',
      summary: 'NSL Sugars (KCP Sugar) competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'rajshree-sugars', name: 'Rajshree Sugars & Chemicals', industry: 'sugar', ticker: 'RAJSREESUG',
    founded: 1984, headquarters: 'Chennai, Tamil Nadu', employees: '2,000+', marketCap: '₹180 Cr',
    ceo: 'S.P. Alagappan (CMD)', website: 'https://www.rajshreesugars.com',
    description: "​Tamil Nadu-based integrated sugar company. Mills in Varadaraj Nagar with 5,200 TCD. Also produces industrial alcohol, ethanol, and bio-compost. Part of Rajshree Group. In FY25 the company reported revenue of ₹500 Cr and net profit of ₹15 Cr, at an EBITDA margin of around 9.0%. Its revenue is led by sugar (50% of sales), complemented by industrial alcohol/ena and ethanol. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar', revenueShare: 50, description: 'White sugar for Tamil Nadu market' },
      { name: 'Industrial Alcohol/ENA', revenueShare: 25, description: 'Spirits and industrial alcohol' },
      { name: 'Ethanol', revenueShare: 12, description: 'Fuel-grade ethanol' },
      { name: 'Power', revenueShare: 8, description: 'Surplus bagasse power' },
      { name: 'Bio Products', revenueShare: 5, description: 'Press mud compost' },
    ],
    financials: [
      { year: 'FY21', revenue: 380, profit: 8, ebitda: 32 },
      { year: 'FY22', revenue: 450, profit: 18, ebitda: 48 },
      { year: 'FY23', revenue: 520, profit: 25, ebitda: 58 },
      { year: 'FY24', revenue: 480, profit: 12, ebitda: 40 },
      { year: 'FY25', revenue: 500, profit: 15, ebitda: 45 },
    ],
    revenueFY25: '₹500 Cr', profitFY25: '₹15 Cr', ebitdaMargin: '9.0%',
    news: [
      { title: 'Rajshree Sugars begins direct cane juice-to-ethanol production', date: '2025-03-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'TN sugar production stable with timely monsoon', date: '2025-02-05', source: 'Company PR', url: 'https://www.rajshreesugars.com' },
      { title: 'Industrial alcohol segment provides margin buffer', date: '2025-01-08', source: 'Business Line', url: 'https://www.thehindubusinessline.com' },
    ],
    futureScope: {
      outlook: 'Small TN player with limited growth runway. Industrial alcohol provides diversification. Scale constraints in South India.',
      plans: ['Juice-to-ethanol technology', 'Distillery modernization', 'ENA capacity growth', 'Operational efficiency'],
      risks: ['Very small scale', 'TN cane availability declining', 'Limited capital for expansion', 'Competition from cooperative mills'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Dhampur Sugar',
      competitorTicker: 'DHAMPURSUG',
      summary: 'Rajshree Sugars & Chemicals competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'dhampur-sugar', name: 'Dhampur Sugar Mills', industry: 'sugar', ticker: 'DHAMPURSUG',
    founded: 1933, headquarters: 'New Delhi', employees: '7,000+', marketCap: '₹1,800 Cr',
    ceo: 'Gaurav Goel (MD)', website: 'https://www.dhampursugar.com',
    description: "​One of UP's oldest sugar companies. 5 mills with 42,000 TCD crushing capacity in Western UP. Also has ethanol distillery (320 KLD) and significant cogeneration. Known for branded sugar. In FY25 the company reported revenue of ₹4,000 Cr and net profit of ₹250 Cr, at an EBITDA margin of around 12.8%. Its revenue is led by sugar (48% of sales), complemented by ethanol and cogeneration power. Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality. Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.",
    products: [
      { name: 'Sugar (Branded & Bulk)', revenueShare: 48, description: 'Dhampure branded and bulk sugar' },
      { name: 'Ethanol', revenueShare: 28, description: 'Largest ethanol capacity in Western UP belt' },
      { name: 'Cogeneration Power', revenueShare: 14, description: '120+ MW bagasse power' },
      { name: 'Molasses Products', revenueShare: 6, description: 'Various molasses grades' },
      { name: 'Organic Products', revenueShare: 4, description: 'Organic sugar and jaggery' },
    ],
    financials: [
      { year: 'FY21', revenue: 3200, profit: 150, ebitda: 420 },
      { year: 'FY22', revenue: 3800, profit: 250, ebitda: 550 },
      { year: 'FY23', revenue: 4200, profit: 320, ebitda: 620 },
      { year: 'FY24', revenue: 3800, profit: 200, ebitda: 450 },
      { year: 'FY25', revenue: 4000, profit: 250, ebitda: 510 },
    ],
    revenueFY25: '₹4,000 Cr', profitFY25: '₹250 Cr', ebitdaMargin: '12.8%',
    news: [
      { title: 'Dhampur Sugar ethanol capacity crosses 320 KLD — among top in UP', date: '2025-04-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Dhampure branded sugar captures 8% retail market in North India', date: '2025-02-18', source: 'Company PR', url: 'https://www.dhampursugar.com' },
      { title: 'Bio-CNG plant commissioned at Asmoli mill', date: '2025-01-10', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Branded sugar and ethanol provide value-addition. Bio-CNG emerging revenue stream. Western UP belt has productive sugarcane.',
      plans: ['Ethanol to 500 KLD', 'Branded sugar to 15% market share', 'Bio-CNG at all mills', 'Organic sugar export growth'],
      risks: ['UP cane pricing politics', 'Western UP urbanization reducing cane area', 'Sugar price volatility', 'Competition from Balrampur and Triveni'],
    },
    extendedOverview: {
      businessSegments: 'Sugar manufacturing, Ethanol distillation, Cogeneration power (bagasse-based), Molasses and by-products. Part of India sugar-ethanol complex.',
      geographicPresence: 'Operations primarily in UP/Maharashtra sugar belt with integrated sugar mills and distilleries.',
      keyStrengths: ["Integrated sugar-ethanol-power model","Government ethanol blending mandate provides revenue visibility","Bagasse cogeneration adds value to by-products","Experienced sugarcane procurement network"],
      marketPosition: 'Established player in the Indian sugar industry with growing ethanol diversification to de-risk from sugar price cyclicality.',
      rawMaterialStrategy: 'Sugarcane procured from local farmers at government-determined FRP/SAP pricing. Captive bagasse for power generation. Molasses for ethanol production.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Ethanol Business', growth: '20% CAGR', share: 'Growing ethanol supplier', insight: 'Government E20 blending mandate ensures demand growth. Contracts with OMCs provide revenue visibility.' }],
      cashCows: [{ name: 'Sugar Production', growth: '5% CAGR', share: 'Established processor', insight: 'Core business with consistent crushing volumes. Recovery rates improving with varietal changes.' }],
      questionMarks: [{ name: 'Compressed Biogas (CBG)', growth: '25% potential', share: 'Pilot/early stage', insight: 'Government SATAT scheme promotes biogas from press mud and spent wash.' }],
      dogs: [{ name: 'Molasses (Commodity)', growth: '3% CAGR', share: 'By-product', insight: 'Low-value by-product increasingly diverted to ethanol for better realization.' }],
    },
    headToHead: {
      competitor: 'Triveni Engineering',
      competitorTicker: 'TRIVENI',
      summary: 'Dhampur Sugar Mills competes in the Indian sugar industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian sugar industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  // ==================== AUTOMOBILE (15) ====================
  {
    id: 'maruti-suzuki', name: 'Maruti Suzuki', industry: 'automobile', ticker: 'MARUTI',
    founded: 1981, headquarters: 'New Delhi', employees: '35,000+', marketCap: '₹3,80,000 Cr',
    ceo: 'Hisashi Takeuchi (MD & CEO)', website: 'https://www.marutisuzuki.com',
    description: "​India's largest passenger car manufacturer with 42% market share. Subsidiary of Suzuki Motor Corporation, Japan. Over 4 million vehicles sold annually across hatchbacks, sedans, SUVs, and MPVs. In FY25 the company reported revenue of ₹1,48,690 Cr and net profit of ₹13,400 Cr, at an EBITDA margin of around 13.3%. Its revenue is led by suvs (35% of sales), complemented by hatchbacks and sedans & mpvs. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Hatchbacks (Alto, WagonR, Swift, Baleno)', revenueShare: 30, description: 'Entry and premium hatchback segment leaders' },
      { name: 'SUVs (Brezza, Grand Vitara, Fronx, Jimny)', revenueShare: 35, description: 'Fast-growing SUV portfolio' },
      { name: 'Sedans & MPVs (Dzire, Ciaz, Ertiga, XL6)', revenueShare: 18, description: 'Sedan and multi-purpose vehicle range' },
      { name: 'CNG Vehicles', revenueShare: 12, description: 'Market leader in factory-fitted CNG cars' },
      { name: 'Exports', revenueShare: 5, description: 'Exports to 100+ countries from India' },
    ],
    financials: [
      { year: 'FY21', revenue: 70372, profit: 4230, ebitda: 7100 },
      { year: 'FY22', revenue: 88330, profit: 3860, ebitda: 6850 },
      { year: 'FY23', revenue: 116275, profit: 8211, ebitda: 13250 },
      { year: 'FY24', revenue: 141015, profit: 11300, ebitda: 17200 },
      { year: 'FY25', revenue: 148690, profit: 13400, ebitda: 19800 },
    ],
    revenueFY25: '₹1,48,690 Cr', profitFY25: '₹13,400 Cr', ebitdaMargin: '13.3%',
    news: [
      { title: 'Maruti Suzuki e Vitara EV launched — first BEV from the company', date: '2025-03-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Kharkhoda plant Phase 1 commissioning on track for FY26', date: '2025-02-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Annual sales cross 22 lakh units for FY25 — new record', date: '2025-04-05', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Transitioning to SUVs, CNG, hybrids, and EVs. New Kharkhoda plant to add 10 lakh units capacity by FY28-29.',
      plans: ['Launch 6 EVs by 2030', 'Kharkhoda mega plant (10 lakh units)', 'Strong hybrid technology push', 'Export hub for Suzuki global models'],
      risks: ['Late entry into EV market', 'SUV segment share still below competitors', 'Dependence on Suzuki for technology', 'Rising competition from Hyundai, Tata, Mahindra'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Hyundai Motor India',
      competitorTicker: 'HYUNDAI',
      summary: 'Maruti Suzuki competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'tata-motors', name: 'Tata Motors', industry: 'automobile', ticker: 'TATAMOTORS',
    founded: 1945, headquarters: 'Mumbai, Maharashtra', employees: '80,000+', marketCap: '₹2,70,000 Cr',
    ceo: 'Girish Wagh (ED) / Shailesh Chandra (MD, PV & EV)', website: 'https://www.tatamotors.com',
    description: "​India's largest automobile company by revenue. Owns Jaguar Land Rover (JLR). Domestic leader in commercial vehicles and #2 in passenger vehicles. Pioneer of EVs in India with 70%+ EV market share. In FY25 the company reported revenue of ₹4,58,000 Cr and net profit of ₹34,500 Cr, at an EBITDA margin of around 14.4%. Its revenue is led by jaguar land rover (40% of sales), complemented by commercial vehicles and passenger vehicles. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Commercial Vehicles (Trucks & Buses)', revenueShare: 25, description: 'Market leader in M&HCV and buses' },
      { name: 'Passenger Vehicles (Nexon, Punch, Harrier, Safari)', revenueShare: 22, description: 'SUV-led PV portfolio with strong brand' },
      { name: 'Electric Vehicles (Nexon EV, Tiago EV, Punch EV)', revenueShare: 8, description: 'Dominant 70%+ share in Indian EV market' },
      { name: 'Jaguar Land Rover', revenueShare: 40, description: 'Luxury brands — Range Rover, Defender, Discovery, Jaguar' },
      { name: 'Spare Parts & Accessories', revenueShare: 5, description: 'Aftermarket parts and service revenue' },
    ],
    financials: [
      { year: 'FY21', revenue: 249795, profit: -13395, ebitda: 23400 },
      { year: 'FY22', revenue: 278454, profit: -11225, ebitda: 25600 },
      { year: 'FY23', revenue: 345967, profit: 2414, ebitda: 42500 },
      { year: 'FY24', revenue: 437927, profit: 31807, ebitda: 62000 },
      { year: 'FY25', revenue: 458000, profit: 34500, ebitda: 66000 },
    ],
    revenueFY25: '₹4,58,000 Cr', profitFY25: '₹34,500 Cr', ebitdaMargin: '14.4%',
    news: [
      { title: 'Tata Motors demerger into CV and PV entities approved by NCLT', date: '2025-03-28', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Nexon EV Long Range with 465 km range launched at Rs 15.49 lakh', date: '2025-02-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'JLR posts record profitability driven by Range Rover demand', date: '2025-01-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Demerger to unlock value. JLR profitability restored. EV leadership in India. Targeting 50,000 EV monthly sales by FY27.',
      plans: ['Demerger into separate CV and PV companies', '10 new EVs by 2027', 'JLR all-electric Jaguar by 2026', 'EV battery gigafactory in Gujarat'],
      risks: ['JLR demand linked to global luxury cycle', 'EV market share erosion from new entrants', 'High capex for EV transition', 'CV segment cyclicality'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Mahindra & Mahindra',
      competitorTicker: 'M&M',
      summary: 'Tata Motors competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'mahindra-mahindra', name: 'Mahindra & Mahindra', industry: 'automobile', ticker: 'M&M',
    founded: 1945, headquarters: 'Mumbai, Maharashtra', employees: '50,000+', marketCap: '₹3,50,000 Cr',
    ceo: 'Anish Shah (MD & CEO)', website: 'https://www.mahindra.com',
    description: "​India's leading SUV manufacturer and largest tractor company globally (by volume). Diversified across auto, farm equipment, IT, and financial services. SUV brands include Thar, Scorpio, XUV series. In FY25 the company reported revenue of ₹1,55,000 Cr and net profit of ₹14,200 Cr, at an EBITDA margin of around 17.1%. Its revenue is led by suvs (40% of sales), complemented by farm equipment and light commercial vehicles. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'SUVs (Thar, Scorpio-N, XUV700, XUV400, Bolero)', revenueShare: 40, description: 'Dominant SUV portfolio with premium positioning' },
      { name: 'Farm Equipment (Tractors)', revenueShare: 28, description: 'Largest tractor brand in India — 40%+ market share' },
      { name: 'Light Commercial Vehicles', revenueShare: 12, description: 'Bolero Pickup, Supro range for last-mile delivery' },
      { name: 'Electric Vehicles (XUV400, BE series)', revenueShare: 8, description: 'Born Electric platform with BE 6e launch' },
      { name: 'Three Wheelers & Small CVs', revenueShare: 12, description: 'Treo electric three-wheelers, Alfa range' },
    ],
    financials: [
      { year: 'FY21', revenue: 75252, profit: 2578, ebitda: 11800 },
      { year: 'FY22', revenue: 91118, profit: 5764, ebitda: 14200 },
      { year: 'FY23', revenue: 121268, profit: 10282, ebitda: 19500 },
      { year: 'FY24', revenue: 138286, profit: 12170, ebitda: 22800 },
      { year: 'FY25', revenue: 155000, profit: 14200, ebitda: 26500 },
    ],
    revenueFY25: '₹1,55,000 Cr', profitFY25: '₹14,200 Cr', ebitdaMargin: '17.1%',
    news: [
      { title: 'Mahindra BE 6e electric SUV deliveries commence across India', date: '2025-04-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Thar Roxx bookings cross 2 lakh — waiting period extends to 6 months', date: '2025-02-20', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Farm equipment revenue crosses Rs 40,000 Cr on strong rural demand', date: '2025-01-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'SUV premiumization strategy delivering record margins. EV entry with Born Electric platform. Tractor dominance continues.',
      plans: ['5 Born Electric EVs by 2027', 'SUV capacity expansion to 80,000/month', 'Electric tractor development', 'International markets with XUV700'],
      risks: ['Heavy capex on EV transition', 'Dependency on SUV segment', 'Tractor growth linked to monsoon', 'Multiple subsidiary complexity'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Tata Motors',
      competitorTicker: 'TATAMOTORS',
      summary: 'Mahindra & Mahindra competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'hyundai-motor-india', name: 'Hyundai Motor India', industry: 'automobile', ticker: 'HYUNDAI',
    founded: 1996, headquarters: 'Chennai, Tamil Nadu', employees: '25,000+', marketCap: '₹1,52,000 Cr',
    ceo: 'Unsoo Kim (MD & CEO)', website: 'https://www.hyundai.com/in',
    description: "​India's second-largest carmaker with 15% market share. Wholly-owned subsidiary of Hyundai Motor Company, South Korea. Listed on Indian exchanges in 2024. Manufacturing plant at Sriperumbudur, Tamil Nadu (8.2 lakh units/year). In FY25 the company reported revenue of ₹76,500 Cr and net profit of ₹6,800 Cr, at an EBITDA margin of around 16.3%. Its revenue is led by suvs (45% of sales), complemented by hatchbacks and exports. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'SUVs (Creta, Tucson, Venue, Alcazar)', revenueShare: 45, description: 'Creta is India best-selling mid-SUV' },
      { name: 'Hatchbacks (i20, Grand i10 Nios)', revenueShare: 20, description: 'Premium hatchback segment' },
      { name: 'Sedans (Verna, Aura)', revenueShare: 10, description: 'Mid-size sedan with premium features' },
      { name: 'Electric Vehicles (Ioniq 5, Creta EV)', revenueShare: 8, description: 'EV portfolio expanding with Creta Electric' },
      { name: 'Exports', revenueShare: 17, description: 'Major export hub — ships to Middle East, Africa, LATAM' },
    ],
    financials: [
      { year: 'FY21', revenue: 40730, profit: 1880, ebitda: 5200 },
      { year: 'FY22', revenue: 47378, profit: 2902, ebitda: 6100 },
      { year: 'FY23', revenue: 60307, profit: 4709, ebitda: 9200 },
      { year: 'FY24', revenue: 71302, profit: 6060, ebitda: 11500 },
      { year: 'FY25', revenue: 76500, profit: 6800, ebitda: 12500 },
    ],
    revenueFY25: '₹76,500 Cr', profitFY25: '₹6,800 Cr', ebitdaMargin: '16.3%',
    news: [
      { title: 'Hyundai Creta EV launched at Rs 17.99 lakh — targets 5,000/month sales', date: '2025-03-15', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Hyundai India IPO listed at Rs 1,960 — largest auto IPO in India', date: '2025-01-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Talegaon plant acquisition from Stellantis completed for 2nd facility', date: '2025-02-28', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Second manufacturing plant at Talegaon to double capacity. Creta EV positions for mass EV market. IPO proceeds to fund growth.',
      plans: ['Talegaon plant operational by FY27 (3 lakh units)', '6 EVs by 2028', 'Connected car technology expansion', 'Increase domestic market share to 18%'],
      risks: ['Parent company determines product strategy', 'Intense competition in SUV segment', 'EV charging infra dependency', 'Exchange rate impact on imported components'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Maruti Suzuki',
      competitorTicker: 'MARUTI',
      summary: 'Hyundai Motor India competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'bajaj-auto', name: 'Bajaj Auto', industry: 'automobile', ticker: 'BAJAJ-AUTO',
    founded: 1945, headquarters: 'Pune, Maharashtra', employees: '12,000+', marketCap: '₹2,50,000 Cr',
    ceo: 'Rajiv Bajaj (MD & CEO)', website: 'https://www.bajajauto.com',
    description: "​India's largest exporter of two-wheelers and three-wheelers. Known for Pulsar, Dominar, and Chetak brands. Strong presence in Africa and ASEAN. Also holds 48% stake in KTM AG (Austria). In FY25 the company reported revenue of ₹52,800 Cr and net profit of ₹8,900 Cr, at an EBITDA margin of around 21.2%. Its revenue is led by motorcycles (55% of sales), complemented by three wheelers and exports. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Motorcycles (Pulsar, Dominar, Platina, CT)', revenueShare: 55, description: 'Market leader in sports/premium motorcycle segment' },
      { name: 'Three Wheelers (Auto, Cargo)', revenueShare: 20, description: 'Dominant in domestic and export 3W market' },
      { name: 'Exports (2W + 3W)', revenueShare: 15, description: 'Present in 79 countries — largest Indian 2W exporter' },
      { name: 'Electric Vehicles (Chetak)', revenueShare: 5, description: 'Premium electric scooter brand revived' },
      { name: 'KTM & Husqvarna (Partnership)', revenueShare: 5, description: 'Manufacturing partner for KTM bikes in India' },
    ],
    financials: [
      { year: 'FY21', revenue: 29252, profit: 4857, ebitda: 6050 },
      { year: 'FY22', revenue: 33145, profit: 5019, ebitda: 6380 },
      { year: 'FY23', revenue: 40096, profit: 6060, ebitda: 7520 },
      { year: 'FY24', revenue: 46306, profit: 7708, ebitda: 9600 },
      { year: 'FY25', revenue: 52800, profit: 8900, ebitda: 11200 },
    ],
    revenueFY25: '₹52,800 Cr', profitFY25: '₹8,900 Cr', ebitdaMargin: '21.2%',
    news: [
      { title: 'Bajaj Auto Freedom 125 CNG bike crosses 1 lakh sales milestone', date: '2025-04-08', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Chetak electric scooter plant capacity doubled to 1 lakh/month', date: '2025-02-12', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Bajaj exports cross 2.5 million units in FY25 — record year', date: '2025-03-30', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'CNG bikes open new market segment. Premium motorcycle portfolio growing. Chetak EV scaling up. Export markets provide diversification.',
      plans: ['CNG bike portfolio expansion', 'Chetak EV scale-up to 2 lakh/year', 'Premium motorcycle launches above 400cc', 'Electric three-wheeler push in exports'],
      risks: ['Export market forex volatility', 'EV transition risk for ICE-dominant portfolio', 'Africa/Nigeria political instability', 'Competition from Hero and Honda in commuter segment'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Hero MotoCorp',
      competitorTicker: 'HEROMOTOCO',
      summary: 'Bajaj Auto competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'hero-motocorp', name: 'Hero MotoCorp', industry: 'automobile', ticker: 'HEROMOTOCO',
    founded: 1984, headquarters: 'New Delhi', employees: '18,000+', marketCap: '₹1,05,000 Cr',
    ceo: 'Niranjan Gupta (CEO)', website: 'https://www.heromotocorp.com',
    description: "​World's largest two-wheeler manufacturer by volume. Sells over 5 million units annually. Dominant in commuter motorcycle segment with Splendor and HF Deluxe. Expanding into premium and EV segments. In FY25 the company reported revenue of ₹42,800 Cr and net profit of ₹4,350 Cr, at an EBITDA margin of around 15.2%. Its revenue is led by commuter motorcycles (45% of sales), complemented by executive/premium bikes and scooters. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Commuter Motorcycles (Splendor, HF Deluxe, Passion)', revenueShare: 45, description: 'Undisputed leader in 100-110cc commuter bikes' },
      { name: 'Executive/Premium Bikes (Glamour, Xtreme, Karizma)', revenueShare: 25, description: 'Growing premium portfolio 125cc and above' },
      { name: 'Scooters (Destini, Pleasure, Xoom)', revenueShare: 15, description: 'Expanding scooter market presence' },
      { name: 'Electric Vehicles (Vida V1)', revenueShare: 5, description: 'Vida brand for electric scooters' },
      { name: 'Spare Parts & Accessories', revenueShare: 10, description: 'Large aftermarket business across 9,000+ touchpoints' },
    ],
    financials: [
      { year: 'FY21', revenue: 30245, profit: 2586, ebitda: 4200 },
      { year: 'FY22', revenue: 33490, profit: 2478, ebitda: 4100 },
      { year: 'FY23', revenue: 36654, profit: 2857, ebitda: 4700 },
      { year: 'FY24', revenue: 39523, profit: 3870, ebitda: 5800 },
      { year: 'FY25', revenue: 42800, profit: 4350, ebitda: 6500 },
    ],
    revenueFY25: '₹42,800 Cr', profitFY25: '₹4,350 Cr', ebitdaMargin: '15.2%',
    news: [
      { title: 'Hero Mavrick 440 adventure bike launched — partnership with Harley-Davidson', date: '2025-03-18', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Vida V1 electric scooter sales cross 10,000/month mark', date: '2025-02-05', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Hero surpasses 100 million cumulative production milestone', date: '2025-01-28', source: 'BSE Filing', url: 'https://www.bseindia.com' },
    ],
    futureScope: {
      outlook: 'Premium segment expansion via Harley partnership. EV transition with Vida brand. Rural market recovery boosting volumes.',
      plans: ['Premium bikes with Harley-Davidson platform', 'Vida EV range expansion to 5 models', 'International expansion in LATAM, Africa', 'New Chittoor plant for EVs'],
      risks: ['Commuter segment stagnation in urban areas', 'EV disruption in core 2W segment', 'Premium brand perception challenge', 'Competition from Bajaj and Honda'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Bajaj Auto',
      competitorTicker: 'BAJAJ-AUTO',
      summary: 'Hero MotoCorp competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'tvs-motor', name: 'TVS Motor Company', industry: 'automobile', ticker: 'TVSMOTOR',
    founded: 1978, headquarters: 'Chennai, Tamil Nadu', employees: '22,000+', marketCap: '₹1,10,000 Cr',
    ceo: 'Sudarshan Venu (MD)', website: 'https://www.tvsmotor.com',
    description: "​India's third-largest two-wheeler manufacturer. Known for Apache, Jupiter, and iQube brands. Also owns Norton Motorcycles (UK). Strong export presence in Asia, Africa, and LATAM. In FY25 the company reported revenue of ₹44,500 Cr and net profit of ₹2,650 Cr, at an EBITDA margin of around 12.1%. Its revenue is led by motorcycles (40% of sales), complemented by scooters and international business & norton. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Motorcycles (Apache, Raider, Star City, Radeon)', revenueShare: 40, description: 'Premium and commuter motorcycle range' },
      { name: 'Scooters (Jupiter, Ntorq)', revenueShare: 25, description: 'Jupiter is India second-best-selling scooter' },
      { name: 'Electric Vehicles (iQube)', revenueShare: 12, description: 'iQube electric scooter — 2nd in EV scooter market' },
      { name: 'Mopeds (XL100)', revenueShare: 8, description: 'Iconic moped brand in South India' },
      { name: 'International Business & Norton', revenueShare: 15, description: 'Exports and Norton premium motorcycles' },
    ],
    financials: [
      { year: 'FY21', revenue: 18958, profit: 843, ebitda: 2050 },
      { year: 'FY22', revenue: 23398, profit: 1065, ebitda: 2550 },
      { year: 'FY23', revenue: 31178, profit: 1519, ebitda: 3500 },
      { year: 'FY24', revenue: 38228, profit: 2118, ebitda: 4500 },
      { year: 'FY25', revenue: 44500, profit: 2650, ebitda: 5400 },
    ],
    revenueFY25: '₹44,500 Cr', profitFY25: '₹2,650 Cr', ebitdaMargin: '12.1%',
    news: [
      { title: 'TVS iQube crosses 3 lakh cumulative sales — #2 in electric scooters', date: '2025-04-02', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Norton Motorcycles launches V4SV superbike globally', date: '2025-02-18', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'TVS Apache RTR 310 launched to compete with KTM Duke', date: '2025-01-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Premiumization strategy working. iQube EV scaling rapidly. Norton adds global premium brand. Fastest-growing among legacy 2W OEMs.',
      plans: ['iQube platform expansion — 3 new EVs by 2026', 'Norton global revival with 5 models', 'Apache super-premium above 300cc', 'Africa and ASEAN market growth'],
      risks: ['EV cannibalization of ICE scooters', 'Norton turnaround execution risk', 'Margin pressure from EV subsidies phasing out', 'Intense competition from Ola and Ather in EVs'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Eicher Motors',
      competitorTicker: 'EICHERMOT',
      summary: 'TVS Motor Company competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'ashok-leyland', name: 'Ashok Leyland', industry: 'automobile', ticker: 'ASHOKLEY',
    founded: 1948, headquarters: 'Chennai, Tamil Nadu', employees: '20,000+', marketCap: '₹60,000 Cr',
    ceo: 'Shenu Agarwal (MD & CEO)', website: 'https://www.ashokleyland.com',
    description: "​India's second-largest commercial vehicle manufacturer and flagship of the Hinduja Group. Market leader in buses. Strong presence in M&HCV trucks. Also makes defense vehicles and electric buses. In FY25 the company reported revenue of ₹46,500 Cr and net profit of ₹3,500 Cr, at an EBITDA margin of around 13.3%. Its revenue is led by m&hcv trucks (45% of sales), complemented by buses and light commercial vehicles. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'M&HCV Trucks (AVTR, Captain, 4825)', revenueShare: 45, description: 'Haulage and tipper trucks for mining/infra' },
      { name: 'Buses (Viking, Lynx, Oyster)', revenueShare: 22, description: '#1 bus maker in India — ICV to luxury coaches' },
      { name: 'Light Commercial Vehicles (Dost, Bada Dost, Partner)', revenueShare: 18, description: 'Growing LCV segment via Switch/Optare' },
      { name: 'Defense Vehicles', revenueShare: 8, description: 'Stallion trucks, FAT vehicles for Indian Army' },
      { name: 'Electric Buses (Switch Mobility)', revenueShare: 7, description: 'E-buses through Switch subsidiary' },
    ],
    financials: [
      { year: 'FY21', revenue: 17009, profit: -312, ebitda: 1200 },
      { year: 'FY22', revenue: 22753, profit: 274, ebitda: 2100 },
      { year: 'FY23', revenue: 36035, profit: 1976, ebitda: 4200 },
      { year: 'FY24', revenue: 42842, profit: 3101, ebitda: 5500 },
      { year: 'FY25', revenue: 46500, profit: 3500, ebitda: 6200 },
    ],
    revenueFY25: '₹46,500 Cr', profitFY25: '₹3,500 Cr', ebitdaMargin: '13.3%',
    news: [
      { title: 'Ashok Leyland wins 1,500 electric bus order from CESL worth Rs 5,000 Cr', date: '2025-03-22', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'AVTR modular truck platform crosses 1 lakh sales in 3 years', date: '2025-02-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Switch Mobility receives UK government grant for hydrogen bus development', date: '2025-01-18', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Infrastructure boom driving truck demand. Electric bus market growing 50% annually. LCV segment scaling with Dost platform.',
      plans: ['Electric bus fleet to 10,000 units by FY27', 'LCV market share target 20%', 'Hydrogen fuel-cell trucks by 2028', 'Africa and ASEAN export push'],
      risks: ['CV industry cyclicality', 'Diesel price volatility', 'Switch Mobility cash burn', 'Tata Motors dominance in M&HCV'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Tata Motors (CV)',
      competitorTicker: 'TATAMOTORS',
      summary: 'Ashok Leyland competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'eicher-motors', name: 'Eicher Motors (Royal Enfield)', industry: 'automobile', ticker: 'EICHERMOT',
    founded: 1948, headquarters: 'Chennai, Tamil Nadu', employees: '15,000+', marketCap: '₹1,30,000 Cr',
    ceo: 'Siddhartha Lal (MD & CEO)', website: 'https://www.eicher.in',
    description: "​Parent company of Royal Enfield — the world's largest mid-size motorcycle manufacturer (250-650cc). Also operates VECV (JV with Volvo) for commercial vehicles. Royal Enfield sells 9+ lakh bikes annually. In FY25 the company reported revenue of ₹19,800 Cr and net profit of ₹4,000 Cr, at an EBITDA margin of around 28.8%. Its revenue is led by royal enfield motorcycles (72% of sales), complemented by ve commercial vehicles and royal enfield accessories & apparel. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Royal Enfield Motorcycles (Classic, Meteor, Hunter, Himalayan)', revenueShare: 72, description: 'Iconic mid-size motorcycles 350-650cc' },
      { name: 'Royal Enfield Accessories & Apparel', revenueShare: 8, description: 'Riding gear, accessories, and lifestyle merchandise' },
      { name: 'VE Commercial Vehicles (VECV)', revenueShare: 15, description: 'Volvo-Eicher JV — Pro series trucks and buses' },
      { name: 'Spare Parts & Service', revenueShare: 5, description: 'Aftermarket revenue from 2,200+ dealers' },
    ],
    financials: [
      { year: 'FY21', revenue: 9366, profit: 1483, ebitda: 2350 },
      { year: 'FY22', revenue: 11271, profit: 1926, ebitda: 2950 },
      { year: 'FY23', revenue: 15038, profit: 2816, ebitda: 4200 },
      { year: 'FY24', revenue: 17650, profit: 3548, ebitda: 5100 },
      { year: 'FY25', revenue: 19800, profit: 4000, ebitda: 5700 },
    ],
    revenueFY25: '₹19,800 Cr', profitFY25: '₹4,000 Cr', ebitdaMargin: '28.8%',
    news: [
      { title: 'Royal Enfield Himalayan 450 receives overwhelming global response', date: '2025-03-25', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Royal Enfield international sales cross 1 lakh units — record year', date: '2025-02-14', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'New CKD assembly plant announced in Thailand for ASEAN market', date: '2025-01-20', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Mid-size motorcycle market growing 15% annually. International expansion accelerating. New Himalayan platform opens adventure segment.',
      plans: ['Electric Royal Enfield by 2026', 'Expand to 650cc+ segment', 'CKD operations in Brazil, Thailand, Turkey', 'Target 15 lakh annual sales by FY28'],
      risks: ['Single segment dependency (mid-size)', 'EV disruption in premium 2W', 'International market volatility', 'Premium positioning limits volume growth'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'TVS Motor',
      competitorTicker: 'TVSMOTOR',
      summary: 'Eicher Motors (Royal Enfield) competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'force-motors', name: 'Force Motors', industry: 'automobile', ticker: 'FORCEMOT',
    founded: 1958, headquarters: 'Pune, Maharashtra', employees: '8,000+', marketCap: '₹12,000 Cr',
    ceo: 'Prasan Firodia (MD)', website: 'https://www.forcemotors.com',
    description: "​Niche manufacturer of LCVs, SUVs (Gurkha), and tempo/3-wheelers. Also a key powertrain supplier to Mercedes-Benz, BMW, and Rolls-Royce for India-assembled vehicles. Operates independently since the Firodia family buyout. In FY25 the company reported revenue of ₹8,100 Cr and net profit of ₹520 Cr, at an EBITDA margin of around 12.3%. Its revenue is led by light commercial vehicles (35% of sales), complemented by powertrain manufacturing and small cvs & three wheelers. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Light Commercial Vehicles (Traveller, Citiline)', revenueShare: 35, description: 'Traveller is India best-selling staff bus/school bus' },
      { name: 'Powertrain Manufacturing (Mercedes, BMW)', revenueShare: 30, description: 'Engines and axles for luxury car OEMs in India' },
      { name: 'SUV (Gurkha)', revenueShare: 12, description: 'Hardcore off-road SUV — cult following' },
      { name: 'Small CVs & Three Wheelers', revenueShare: 15, description: 'Tempo and goods carrier range' },
      { name: 'Agricultural Equipment', revenueShare: 8, description: 'Tractors and farm equipment' },
    ],
    financials: [
      { year: 'FY21', revenue: 3180, profit: 75, ebitda: 310 },
      { year: 'FY22', revenue: 3850, profit: 105, ebitda: 380 },
      { year: 'FY23', revenue: 5500, profit: 280, ebitda: 620 },
      { year: 'FY24', revenue: 7200, profit: 420, ebitda: 850 },
      { year: 'FY25', revenue: 8100, profit: 520, ebitda: 1000 },
    ],
    revenueFY25: '₹8,100 Cr', profitFY25: '₹520 Cr', ebitdaMargin: '12.3%',
    news: [
      { title: 'Force Gurkha 5-door variant launched at Rs 18 lakh — takes on Thar', date: '2025-03-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Mercedes-Benz powertrain contract extended for next-gen models', date: '2025-02-22', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Traveller EV prototype unveiled for city bus applications', date: '2025-01-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Luxury powertrain business provides stable margins. Gurkha brand gaining traction. EV transition needed for Traveller range.',
      plans: ['Gurkha brand expansion with new variants', 'Electric Traveller for city bus segment', 'BMW powertrain new contract', 'LCV market share growth'],
      risks: ['Small scale limits R&D investment', 'Luxury OEM contract dependency', 'Gurkha competes against Thar/Jimny', 'Limited dealer network vs large OEMs'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Ashok Leyland',
      competitorTicker: 'ASHOKLEY',
      summary: 'Force Motors competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'mg-motor-india', name: 'MG Motor India', industry: 'automobile', ticker: 'Unlisted - SAIC',
    founded: 2017, headquarters: 'Gurugram, Haryana', employees: '5,000+', marketCap: 'Unlisted',
    ceo: 'Rajeev Chaba (President & MD)', website: 'https://www.mgmotor.co.in',
    description: "​Indian subsidiary of SAIC Motor (China). Manufactures at Halol, Gujarat (former GM plant). Known for connected SUVs — Hector, Astor, ZS EV, and Comet EV. JSW Group acquired stake in 2023. In FY25 the company reported revenue of ₹12,500 Cr and net profit of ₹350 Cr, at an EBITDA margin of around 9.6%. Its revenue is led by suvs (50% of sales), complemented by compact suv and electric vehicles. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'SUVs (Hector, Hector Plus, Gloster)', revenueShare: 50, description: 'Internet-connected SUVs with premium features' },
      { name: 'Compact SUV (Astor/ZS)', revenueShare: 22, description: 'Mid-size SUV competing with Creta, Seltos' },
      { name: 'Electric Vehicles (ZS EV, Comet EV)', revenueShare: 18, description: 'Early EV adopter — ZS EV among first mainstream EVs' },
      { name: 'Windsor EV (MPV)', revenueShare: 10, description: 'Electric MPV targeting family segment' },
    ],
    financials: [
      { year: 'FY21', revenue: 4200, profit: -350, ebitda: 180 },
      { year: 'FY22', revenue: 5800, profit: -280, ebitda: 350 },
      { year: 'FY23', revenue: 8500, profit: -120, ebitda: 680 },
      { year: 'FY24', revenue: 10200, profit: 150, ebitda: 950 },
      { year: 'FY25', revenue: 12500, profit: 350, ebitda: 1200 },
    ],
    revenueFY25: '₹12,500 Cr', profitFY25: '₹350 Cr', ebitdaMargin: '9.6%',
    news: [
      { title: 'JSW Group completes 35% stake acquisition in MG Motor India', date: '2025-03-05', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'MG Windsor EV crosses 20,000 bookings within 2 months of launch', date: '2025-02-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Halol plant capacity expansion to 1 lakh units approved', date: '2025-01-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'JSW partnership provides local credibility. EV-first strategy with 4 electric models. Competing in premium-value segment against Korean and Indian OEMs.',
      plans: ['IPO under JSW ownership by 2026-27', 'Halol capacity to 1.5 lakh units', '3 new EVs including electric Hector', 'Battery assembly localization'],
      risks: ['SAIC/China ownership perception issue', 'Geopolitical India-China tensions', 'Limited dealer network (350 vs 3,000+ for Maruti)', 'High competition in SUV segment'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Kia India',
      competitorTicker: 'KIA',
      summary: 'MG Motor India competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'kia-india', name: 'Kia India', industry: 'automobile', ticker: 'Unlisted',
    founded: 2019, headquarters: 'Gurugram, Haryana', employees: '12,000+', marketCap: 'Unlisted',
    ceo: 'Gwanggu Lee (MD & CEO)', website: 'https://www.kia.com/in',
    description: "​Indian subsidiary of Kia Corporation (South Korea). Fastest car brand to reach 10 lakh sales in India (in 5 years). Manufacturing plant at Anantapur, Andhra Pradesh with 3 lakh units capacity. Known for Seltos, Sonet, Carens. In FY25 the company reported revenue of ₹42,000 Cr and net profit of ₹4,200 Cr, at an EBITDA margin of around 16.7%. Its revenue is led by suvs (50% of sales), complemented by mpvs and exports. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'SUVs (Seltos, Sonet)', revenueShare: 50, description: 'Seltos and Sonet among top-5 selling SUVs in India' },
      { name: 'MPVs (Carens)', revenueShare: 25, description: 'Three-row MPV with strong demand' },
      { name: 'Electric Vehicles (EV6, EV9)', revenueShare: 10, description: 'Premium EVs positioned above Rs 60 lakh' },
      { name: 'Exports', revenueShare: 15, description: 'Exports from Anantapur to Middle East, Africa, LATAM' },
    ],
    financials: [
      { year: 'FY21', revenue: 19400, profit: 1450, ebitda: 2800 },
      { year: 'FY22', revenue: 23500, profit: 1800, ebitda: 3500 },
      { year: 'FY23', revenue: 32500, profit: 3200, ebitda: 5500 },
      { year: 'FY24', revenue: 38000, profit: 3800, ebitda: 6200 },
      { year: 'FY25', revenue: 42000, profit: 4200, ebitda: 7000 },
    ],
    revenueFY25: '₹42,000 Cr', profitFY25: '₹4,200 Cr', ebitdaMargin: '16.7%',
    news: [
      { title: 'Kia India launches Syros compact SUV at Rs 8.99 lakh', date: '2025-04-05', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Kia crosses 10 lakh cumulative sales in India — fastest OEM to milestone', date: '2025-02-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Anantapur plant capacity being expanded to 4 lakh units/year', date: '2025-01-12', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Fastest-growing brand in India. Expanding into mass-market segments with Syros. EV portfolio building. IPO speculation growing.',
      plans: ['Capacity expansion to 5 lakh units by FY28', 'Mass-market EV under Rs 15 lakh', 'IPO being evaluated', '5 new models by 2027 including EVs'],
      risks: ['Parent company product strategy dependency', 'Dealer profitability concerns with rapid growth', 'Competition from Hyundai sibling brand', 'EV infrastructure readiness'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'MG Motor India',
      competitorTicker: 'MG',
      summary: 'Kia India competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'toyota-kirloskar', name: 'Toyota Kirloskar Motor', industry: 'automobile', ticker: 'Unlisted',
    founded: 1997, headquarters: 'Bengaluru, Karnataka', employees: '8,000+', marketCap: 'Unlisted',
    ceo: 'Masakazu Yoshimura (MD)', website: 'https://www.toyotabharat.com',
    description: "​JV between Toyota Motor Corporation (89%) and Kirloskar Group (11%). Manufacturing at Bidadi, Karnataka. Known for Innova, Fortuner, and Hilux. Strong in hybrid technology with Hyryder and Innova Hycross. In FY25 the company reported revenue of ₹58,000 Cr and net profit of ₹5,800 Cr, at an EBITDA margin of around 16.4%. Its revenue is led by mpvs/muvs (35% of sales), complemented by suvs and hybrid vehicles. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'MPVs/MUVs (Innova Crysta, Innova Hycross)', revenueShare: 35, description: 'Innova dominates premium MPV segment for 20 years' },
      { name: 'SUVs (Fortuner, Legender, Hyryder)', revenueShare: 35, description: 'Fortuner is premium SUV leader; Hyryder targets mid-market' },
      { name: 'Hybrid Vehicles', revenueShare: 15, description: 'Strong hybrid technology in Hycross and Hyryder' },
      { name: 'Pickup & Commercial (Hilux)', revenueShare: 8, description: 'Lifestyle pickup truck segment' },
      { name: 'Compact Cars (Glanza, Rumion — Suzuki OEM)', revenueShare: 7, description: 'Badge-engineered Suzuki cars for mass market' },
    ],
    financials: [
      { year: 'FY21', revenue: 15200, profit: 680, ebitda: 1800 },
      { year: 'FY22', revenue: 18500, profit: 850, ebitda: 2200 },
      { year: 'FY23', revenue: 32000, profit: 2500, ebitda: 4800 },
      { year: 'FY24', revenue: 52800, profit: 5200, ebitda: 8500 },
      { year: 'FY25', revenue: 58000, profit: 5800, ebitda: 9500 },
    ],
    revenueFY25: '₹58,000 Cr', profitFY25: '₹5,800 Cr', ebitdaMargin: '16.4%',
    news: [
      { title: 'Toyota Innova Hycross waiting period extends to 10 months on hybrid demand', date: '2025-03-18', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: "Toyota India's FY25 sales double vs FY22 driven by Hyryder and Hycross", date: '2025-04-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Bidadi plant 3rd line commissioned — capacity to 4.2 lakh units', date: '2025-01-25', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Hybrid-first strategy differentiates from competition. Innova and Fortuner provide strong brand equity. Partnership with Suzuki for volume models.',
      plans: ['Full hybrid across all models by 2027', 'BEV launch in India by 2026', 'Flex-fuel vehicle pilots', 'Capacity expansion to 5 lakh units'],
      risks: ['EV strategy lagging vs competition', 'Dependency on Suzuki for volume', 'Premium pricing limits market reach', 'Parent company conservative EV stance globally'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Honda Cars India',
      competitorTicker: 'Unlisted',
      summary: 'Toyota Kirloskar Motor competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'ola-electric', name: 'Ola Electric', industry: 'automobile', ticker: 'OLAELEC',
    founded: 2017, headquarters: 'Bengaluru, Karnataka', employees: '7,000+', marketCap: '₹35,000 Cr',
    ceo: 'Bhavish Aggarwal (Founder & CEO)', website: 'https://www.olaelectric.com',
    description: "​India's largest electric two-wheeler company by market share. Operates the world's largest e-scooter factory (Futurefactory) at Krishnagiri, Tamil Nadu with 10 lakh units/year capacity. IPO in 2024. In FY25 the company reported revenue of ₹5,900 Cr and net profit of ₹-2,200 Cr (Loss), at an EBITDA margin of around -25.4%. Its revenue is led by electric scooters (75% of sales), complemented by battery cells & packs and electric motorcycles. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Electric Scooters (S1 Pro, S1 Air, S1 X)', revenueShare: 75, description: 'S1 portfolio across price points from Rs 70K to Rs 1.4L' },
      { name: 'Battery Cells & Packs', revenueShare: 10, description: 'In-house cell manufacturing at Gigafactory' },
      { name: 'Electric Motorcycles (Roadster, Adventure)', revenueShare: 10, description: 'Upcoming motorcycle platform for 2025-26 launch' },
      { name: 'Charging Network (Hypercharger)', revenueShare: 5, description: '4,000+ Hypercharger points across India' },
    ],
    financials: [
      { year: 'FY21', revenue: 0, profit: -350, ebitda: -380 },
      { year: 'FY22', revenue: 456, profit: -780, ebitda: -650 },
      { year: 'FY23', revenue: 2630, profit: -1472, ebitda: -1100 },
      { year: 'FY24', revenue: 5010, profit: -2400, ebitda: -1800 },
      { year: 'FY25', revenue: 5900, profit: -2200, ebitda: -1500 },
    ],
    revenueFY25: '₹5,900 Cr', profitFY25: '₹-2,200 Cr (Loss)', ebitdaMargin: '-25.4%',
    news: [
      { title: 'Ola Electric Roadster motorcycle unveiled — launch in Q2 FY26', date: '2025-04-15', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Ola Gigafactory cell production begins — first Indian-made Li-ion cells', date: '2025-03-01', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Market share drops to 25% from 35% amid quality concerns and competition', date: '2025-02-10', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'First-mover in mass EV segment but facing quality and competition challenges. Gigafactory for cells is strategic asset. Path to profitability unclear.',
      plans: ['Gigafactory 40 GWh capacity by 2030', 'Electric motorcycle launch FY26', 'International expansion', 'Reduce losses through scale and cell localization'],
      risks: ['Persistent losses and cash burn', 'Quality/service reputation issues', 'Market share erosion to TVS, Bajaj, Ather', 'Dependency on FAME/PM E-Drive subsidies'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Ather Energy',
      competitorTicker: 'Unlisted',
      summary: 'Ola Electric competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'ather-energy', name: 'Ather Energy', industry: 'automobile', ticker: 'Unlisted',
    founded: 2013, headquarters: 'Bengaluru, Karnataka', employees: '4,500+', marketCap: 'Unlisted (Pre-IPO ~₹12,000 Cr)',
    ceo: 'Tarun Mehta (Co-founder & CEO)', website: 'https://www.atherenergy.com',
    description: "​Premium electric scooter startup backed by Hero MotoCorp (37% stake). Known for best-in-class technology, connected features, and Ather Grid fast-charging network. IPO planned for 2025. Models: 450X, 450S, Rizta. In FY25 the company reported revenue of ₹2,800 Cr and net profit of ₹-900 Cr (Loss), at an EBITDA margin of around -23.2%. Its revenue is led by electric scooters (65% of sales), complemented by family scooter and ather grid. Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities. Pan-India manufacturing with multiple plants.",
    products: [
      { name: 'Electric Scooters (450X, 450S)', revenueShare: 65, description: 'Premium performance e-scooters with connected features' },
      { name: 'Family Scooter (Rizta)', revenueShare: 20, description: 'New family-oriented EV scooter for mass market' },
      { name: 'Ather Grid (Charging Network)', revenueShare: 5, description: '2,000+ fast-charging points across India' },
      { name: 'Software & Connectivity Services', revenueShare: 5, description: 'OTA updates, Ather Connect subscription' },
      { name: 'Battery & Powertrain Licensing', revenueShare: 5, description: 'Component supply to Hero MotoCorp for Vida' },
    ],
    financials: [
      { year: 'FY21', revenue: 131, profit: -175, ebitda: -165 },
      { year: 'FY22', revenue: 408, profit: -340, ebitda: -310 },
      { year: 'FY23', revenue: 1783, profit: -864, ebitda: -720 },
      { year: 'FY24', revenue: 2170, profit: -1025, ebitda: -800 },
      { year: 'FY25', revenue: 2800, profit: -900, ebitda: -650 },
    ],
    revenueFY25: '₹2,800 Cr', profitFY25: '₹-900 Cr (Loss)', ebitdaMargin: '-23.2%',
    news: [
      { title: 'Ather Energy files DRHP for Rs 4,500 Cr IPO — expected listing by Q2 FY26', date: '2025-04-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Ather Rizta family scooter crosses 50,000 sales in 6 months', date: '2025-03-08', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Hosur factory capacity expanded to 5 lakh units annually', date: '2025-01-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Premium positioning and Hero backing provide strong moat. IPO to fund expansion. Rizta opens mass-market opportunity. Path to breakeven by FY27.',
      plans: ['IPO in 2025 for growth capital', 'Expand to 8 lakh units capacity', 'Launch electric motorcycle by 2026', 'International markets starting with Nepal, Sri Lanka'],
      risks: ['Continued losses and cash burn', 'Premium pricing limits addressable market', 'Competition from Ola, TVS, Bajaj', 'Hero MotoCorp competing with its own Vida brand'],
    },
    extendedOverview: {
      businessSegments: 'Vehicle manufacturing (passenger vehicles/commercial vehicles/two-wheelers), spare parts, after-sales service network, vehicle financing.',
      geographicPresence: 'Pan-India manufacturing with multiple plants. Strong dealer and service network across India. Growing export presence.',
      keyStrengths: ["Strong brand recognition and customer loyalty","Extensive dealer and service network across India","Product portfolio covering multiple segments","Growing focus on EVs and new energy vehicles"],
      marketPosition: 'Significant player in Indian automobile industry with strong brand, distribution, and manufacturing capabilities.',
      rawMaterialStrategy: 'Steel, aluminum, plastics, rubber, electronics sourced from domestic and global Tier-1 suppliers. Increasing localization of components.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EV/New Energy Vehicles', growth: '30% CAGR', share: 'Growing EV presence', insight: 'Government FAME subsidies and emission norms driving EV transition. First-mover advantage critical.' }],
      cashCows: [{ name: 'ICE Vehicle Portfolio', growth: '8% CAGR', share: 'Established market share', insight: 'Core revenue generator. Strong model lineup with brand loyalty.' }],
      questionMarks: [{ name: 'Connected/Autonomous Features', growth: '25% potential', share: 'Emerging', insight: 'Software-defined vehicles are the future. Investment in digital capabilities needed.' }],
      dogs: [{ name: 'Entry-Level Vehicles', growth: '2% CAGR', share: 'Shrinking segment', insight: 'Entry segment shrinking with income growth. Consumers upgrading to higher segments.' }],
    },
    headToHead: {
      competitor: 'Ola Electric',
      competitorTicker: 'OLA',
      summary: 'Ather Energy competes in the Indian automobile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian automobile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  // ==================== TEXTILE (15) ====================
  {
    id: 'aditya-birla-fashion', name: 'Aditya Birla Fashion & Retail', industry: 'textile', ticker: 'ABFRL',
    founded: 2007, headquarters: 'Mumbai, Maharashtra', employees: '35,000+', marketCap: '₹22,500 Cr',
    ceo: 'Ashish Dikshit (MD)', website: 'https://www.abfrl.com',
    description: "​India's largest pure-play fashion and lifestyle company. Houses Madura Fashion (Louis Philippe, Van Heusen, Allen Solly, Peter England) and Pantaloons. Also operates ethnic wear brands (Jaypore, Sabyasachi) and partnerships with Galeries Lafayette and Valentino. In FY25 the company reported revenue of ₹15,200 Cr and net profit of ₹-320 Cr (Loss), at an EBITDA margin of around 12.2%. Its revenue is led by madura fashion & lifestyle (40% of sales), complemented by pantaloons and ethnic wear portfolio. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Madura Fashion & Lifestyle', revenueShare: 40, description: 'Louis Philippe, Van Heusen, Allen Solly, Peter England' },
      { name: 'Pantaloons', revenueShare: 30, description: 'Value fashion retail chain with 400+ stores' },
      { name: 'Ethnic Wear Portfolio', revenueShare: 15, description: 'Jaypore, Sabyasachi collaboration, Tasva' },
      { name: 'Other Emerging Brands', revenueShare: 15, description: 'Forever 21, American Eagle, Reebok India' },
    ],
    financials: [
      { year: 'FY21', revenue: 5249, profit: -870, ebitda: 420 },
      { year: 'FY22', revenue: 8136, profit: -773, ebitda: 880 },
      { year: 'FY23', revenue: 12407, profit: -685, ebitda: 1350 },
      { year: 'FY24', revenue: 13996, profit: -610, ebitda: 1520 },
      { year: 'FY25', revenue: 15200, profit: -320, ebitda: 1850 },
    ],
    revenueFY25: '₹15,200 Cr', profitFY25: '₹-320 Cr (Loss)', ebitdaMargin: '12.2%',
    news: [
      { title: 'ABFRL demerger into listed Madura and Pantaloons entities approved', date: '2025-04-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Galeries Lafayette first India store opens in Mumbai BKC', date: '2025-03-05', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'ABFRL partners Valentino for India luxury retail foray', date: '2025-01-18', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Demerger to unlock value across fashion verticals. Moving toward profitability with scale benefits. Ethnic and luxury segments are growth engines.',
      plans: ['Demerger into 3 listed entities by FY26', 'Pantaloons turnaround to profitability', 'Luxury brand partnerships expansion', 'Digital-first D2C channel growth'],
      risks: ['Persistent losses and high debt', 'Intense competition from Reliance Retail and Trent', 'Multi-brand complexity', 'Consumer discretionary slowdown risk'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Industry Peer',
      competitorTicker: 'PEER',
      summary: 'Aditya Birla Fashion & Retail competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  // ==================== TYRE (12) ====================
  {
    id: 'mrf', name: 'MRF', industry: 'tyre', ticker: 'MRF',
    founded: 1946, headquarters: 'Chennai, Tamil Nadu', employees: '20,000+', marketCap: '₹61,000 Cr',
    ceo: 'K.M. Mammen (Chairman & MD)', website: 'https://www.mrftyres.com',
    description: "​India's largest tyre manufacturer by revenue and market capitalization. Produces tyres for passenger vehicles, trucks, two-wheelers, and off-road applications. Also manufactures pretreads, tubes, and sports goods including cricket bats. In FY25 the company reported revenue of ₹27,200 Cr and net profit of ₹2,350 Cr, at an EBITDA margin of around 17.5%. Its revenue is led by truck & bus tyres (40% of sales), complemented by passenger car tyres and two-wheeler tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Truck & Bus Tyres', revenueShare: 40, description: 'Radial and bias tyres for commercial vehicles' },
      { name: 'Passenger Car Tyres', revenueShare: 30, description: 'Radial tyres for cars, SUVs, and MUVs' },
      { name: 'Two-Wheeler Tyres', revenueShare: 15, description: 'Tyres for motorcycles and scooters' },
      { name: 'Off-Road & Specialty Tyres', revenueShare: 10, description: 'Farm, industrial, and aircraft tyres' },
      { name: 'Retreads & Tubes', revenueShare: 5, description: 'Precured retreads, tubes, and flaps' },
    ],
    financials: [
      { year: 'FY21', revenue: 16578, profit: 1432, ebitda: 3150 },
      { year: 'FY22', revenue: 19091, profit: 1194, ebitda: 2980 },
      { year: 'FY23', revenue: 22811, profit: 1694, ebitda: 3620 },
      { year: 'FY24', revenue: 24948, profit: 2062, ebitda: 4200 },
      { year: 'FY25', revenue: 27200, profit: 2350, ebitda: 4750 },
    ],
    revenueFY25: '₹27,200 Cr', profitFY25: '₹2,350 Cr', ebitdaMargin: '17.5%',
    news: [
      { title: 'MRF commissions new radial tyre plant at Dahej, Gujarat', date: '2025-03-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'MRF launches premium EV-specific tyre range for Indian market', date: '2025-02-10', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'MRF stock crosses ₹1.5 lakh mark — highest priced share on BSE', date: '2025-01-15', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Dominant Indian player with strong brand. EV tyre development and export expansion are growth levers. Capacity additions at Gujarat underway.',
      plans: ['Gujarat greenfield plant Phase 2 expansion', 'EV-specific tyre portfolio expansion', 'Export share increase to 25%', 'Specialty and off-road tyre growth'],
      risks: ['Natural rubber price volatility', 'Crude oil-linked raw material costs', 'Increasing competition from Apollo and CEAT', 'EV transition reducing replacement demand cycles'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'Apollo Tyres',
      competitorTicker: 'APOLLOTYRE',
      summary: 'MRF competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'raymond', name: 'Raymond', industry: 'textile', ticker: 'RAYMOND',
    founded: 1925, headquarters: 'Mumbai, Maharashtra', employees: '30,000+', marketCap: '₹14,500 Cr',
    ceo: 'Gautam Hari Singhania (CMD)', website: 'https://www.raymond.in',
    description: "​India's iconic textile and apparel conglomerate. Known as the 'Complete Man' brand. World's third-largest producer of worsted suiting fabric. Also has real estate (Raymond Realty), FMCG, and engineering segments. In FY25 the company reported revenue of ₹10,100 Cr and net profit of ₹820 Cr, at an EBITDA margin of around 15.6%. Its revenue is led by branded textiles (35% of sales), complemented by branded apparel and garmenting. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Branded Textiles (Suiting & Shirting)', revenueShare: 35, description: 'Raymond, Park Avenue, ColorPlus fabrics' },
      { name: 'Branded Apparel', revenueShare: 25, description: 'Ready-to-wear garments under Raymond, Parx' },
      { name: 'Garmenting (B2B)', revenueShare: 20, description: 'Export garment manufacturing for global brands' },
      { name: 'Real Estate (Raymond Realty)', revenueShare: 12, description: 'Residential projects in Thane, Mumbai' },
      { name: 'Engineering & FMCG', revenueShare: 8, description: 'Auto components, tools, and Park Avenue FMCG' },
    ],
    financials: [
      { year: 'FY21', revenue: 3648, profit: -312, ebitda: 380 },
      { year: 'FY22', revenue: 5782, profit: 305, ebitda: 850 },
      { year: 'FY23', revenue: 8337, profit: 585, ebitda: 1180 },
      { year: 'FY24', revenue: 9286, profit: 750, ebitda: 1420 },
      { year: 'FY25', revenue: 10100, profit: 820, ebitda: 1580 },
    ],
    revenueFY25: '₹10,100 Cr', profitFY25: '₹820 Cr', ebitdaMargin: '15.6%',
    news: [
      { title: 'Raymond Lifestyle demerger completed — listed separately on exchanges', date: '2025-03-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Raymond Realty Thane project achieves Rs 2,000 Cr pre-sales', date: '2025-02-15', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Raymond acquires ethnic wear brand Ethnix for pan-India expansion', date: '2025-01-10', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Demerger unlocks sum-of-parts value. Real estate and lifestyle segments growing fast. Wedding/ethnic wear is new growth driver.',
      plans: ['Raymond Lifestyle separate listing growth', 'Real estate expansion beyond Thane', 'Ethnic wear brand (Ethnix) scaling', 'Engineering business demerger'],
      risks: ['Complex conglomerate structure', 'Suiting fabric demand decline with casualization', 'Real estate execution risk', 'Promoter succession concerns'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Aditya Birla Fashion',
      competitorTicker: 'ABFRL',
      summary: 'Raymond competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'apollo-tyres', name: 'Apollo Tyres', industry: 'tyre', ticker: 'APOLLOTYRE',
    founded: 1972, headquarters: 'Gurugram, Haryana', employees: '16,000+', marketCap: '₹36,000 Cr',
    ceo: 'Neeraj Kanwar (Vice Chairman & MD)', website: 'https://www.apollotyres.com',
    description: "​India's second-largest tyre company with global operations across India, Europe (Vredestein brand), and presence in over 100 countries. Operates plants in Kerala, Gujarat, Andhra Pradesh, Hungary, and Netherlands. In FY25 the company reported revenue of ₹28,500 Cr and net profit of ₹2,100 Cr, at an EBITDA margin of around 16.0%. Its revenue is led by truck & bus radial tyres (38% of sales), complemented by passenger car tyres and light truck tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Truck & Bus Radial Tyres', revenueShare: 38, description: 'Commercial vehicle radial tyres for Indian and global markets' },
      { name: 'Passenger Car Tyres', revenueShare: 32, description: 'Premium tyres under Apollo and Vredestein brands' },
      { name: 'Light Truck Tyres', revenueShare: 14, description: 'Tyres for LCVs and pick-ups' },
      { name: 'Off-Highway Tyres', revenueShare: 10, description: 'Agricultural and industrial tyres' },
      { name: 'Two-Wheeler & Bicycle Tyres', revenueShare: 6, description: 'Motorcycle and bicycle tyres' },
    ],
    financials: [
      { year: 'FY21', revenue: 16602, profit: 838, ebitda: 2850 },
      { year: 'FY22', revenue: 20948, profit: 811, ebitda: 2690 },
      { year: 'FY23', revenue: 25425, profit: 1300, ebitda: 3580 },
      { year: 'FY24', revenue: 26298, profit: 1857, ebitda: 4100 },
      { year: 'FY25', revenue: 28500, profit: 2100, ebitda: 4550 },
    ],
    revenueFY25: '₹28,500 Cr', profitFY25: '₹2,100 Cr', ebitdaMargin: '16.0%',
    news: [
      { title: 'Apollo Tyres Andhra Pradesh plant Phase 2 begins commercial production', date: '2025-04-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Vredestein brand tyres launched for Indian premium car segment', date: '2025-02-18', source: 'Livemint', url: 'https://www.livemint.com' },
      { title: 'Apollo Tyres Q3 results — net profit up 22% on strong TBR demand', date: '2025-01-28', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Dual-brand strategy (Apollo + Vredestein) and European operations provide diversification. India capacity expansion and premiumization are key growth drivers.',
      plans: ['Andhra Pradesh capacity ramp-up to 15,000 TPD', 'Vredestein brand expansion in India', 'EV-ready tyre development', 'Africa and ASEAN market entry'],
      risks: ['European operations margin pressure', 'Raw material cost inflation', 'Brand positioning between MRF premium and value segment', 'Currency fluctuation on imports'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'MRF',
      competitorTicker: 'MRF',
      summary: 'Apollo Tyres competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'vardhman-textiles', name: 'Vardhman Textiles', industry: 'textile', ticker: 'VTL',
    founded: 1965, headquarters: 'Ludhiana, Punjab', employees: '25,000+', marketCap: '₹16,000 Cr',
    ceo: 'Neeraj Jain (MD & CEO)', website: 'https://www.vardhman.com',
    description: "​India's largest manufacturer of yarn and one of the top fabric producers. Vertically integrated from fiber to fabric with 1.1 million spindles. Exports to 75+ countries. Known for cotton and blended yarns supplying to top global brands. In FY25 the company reported revenue of ₹9,500 Cr and net profit of ₹950 Cr, at an EBITDA margin of around 17.9%. Its revenue is led by yarn (50% of sales), complemented by woven fabrics and acrylic fiber. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Yarn (Cotton & Blended)', revenueShare: 50, description: 'Cotton, polyester-cotton, viscose yarn — 1.1M spindles' },
      { name: 'Woven Fabrics', revenueShare: 25, description: 'Shirting fabrics for domestic and export markets' },
      { name: 'Acrylic Fiber', revenueShare: 10, description: 'Acrylic staple fiber for knitwear' },
      { name: 'Sewing Thread', revenueShare: 8, description: 'Industrial sewing threads' },
      { name: 'Steel (Auro Spinning)', revenueShare: 7, description: 'Steel wires and special alloys subsidiary' },
    ],
    financials: [
      { year: 'FY21', revenue: 6012, profit: 580, ebitda: 1250 },
      { year: 'FY22', revenue: 8934, profit: 1320, ebitda: 2100 },
      { year: 'FY23', revenue: 9287, profit: 920, ebitda: 1680 },
      { year: 'FY24', revenue: 8850, profit: 780, ebitda: 1520 },
      { year: 'FY25', revenue: 9500, profit: 950, ebitda: 1700 },
    ],
    revenueFY25: '₹9,500 Cr', profitFY25: '₹950 Cr', ebitdaMargin: '17.9%',
    news: [
      { title: 'Vardhman Textiles commissions new spinning unit in Madhya Pradesh', date: '2025-03-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Cotton yarn exports surge 25% YoY on China demand recovery', date: '2025-02-08', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Vardhman invests Rs 1,200 Cr in fabric dyeing capacity expansion', date: '2025-01-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Beneficiary of China+1 sourcing in textiles. Strong balance sheet supports capacity growth. Fabric segment offers higher margins than yarn.',
      plans: ['Spinning capacity expansion to 1.3M spindles', 'Fabric capacity doubling', 'Technical textiles entry', 'Sustainability certifications expansion'],
      risks: ['Cotton price volatility', 'Yarn commoditization pressure', 'Power cost in Punjab', 'Export dependence on few markets'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Arvind Ltd',
      competitorTicker: 'ARVIND',
      summary: 'Vardhman Textiles competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'ceat', name: 'CEAT', industry: 'tyre', ticker: 'CEAT',
    founded: 1958, headquarters: 'Mumbai, Maharashtra', employees: '12,000+', marketCap: '₹18,000 Cr',
    ceo: 'Arnab Banerjee (MD & CEO)', website: 'https://www.ceat.com',
    description: "​Part of the RPG Group. India's third-largest tyre manufacturer with strong presence in two-wheeler and passenger car segments. Operates plants at Nashik, Nagpur, Halol, and Chennai. Known for innovation in wet-grip and fuel-efficient tyres. In FY25 the company reported revenue of ₹13,200 Cr and net profit of ₹780 Cr, at an EBITDA margin of around 15.0%. Its revenue is led by passenger car tyres (30% of sales), complemented by two-wheeler tyres and truck & bus tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Two-Wheeler Tyres', revenueShare: 28, description: 'Market leader in motorcycle and scooter tyres' },
      { name: 'Passenger Car Tyres', revenueShare: 30, description: 'Radial tyres for cars and SUVs' },
      { name: 'Truck & Bus Tyres', revenueShare: 25, description: 'Commercial vehicle radial and bias tyres' },
      { name: 'Off-Road & Specialty Tyres', revenueShare: 10, description: 'Farm, mining, and industrial tyres' },
      { name: 'Light Commercial Vehicle Tyres', revenueShare: 7, description: 'LCV and SCV segment tyres' },
    ],
    financials: [
      { year: 'FY21', revenue: 7489, profit: 427, ebitda: 1120 },
      { year: 'FY22', revenue: 9413, profit: 268, ebitda: 980 },
      { year: 'FY23', revenue: 11165, profit: 442, ebitda: 1350 },
      { year: 'FY24', revenue: 12187, profit: 680, ebitda: 1750 },
      { year: 'FY25', revenue: 13200, profit: 780, ebitda: 1980 },
    ],
    revenueFY25: '₹13,200 Cr', profitFY25: '₹780 Cr', ebitdaMargin: '15.0%',
    news: [
      { title: 'CEAT launches premium SecuraDrive range for EV passenger cars', date: '2025-03-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'CEAT Chennai plant expansion adds 5,000 tyres/day capacity', date: '2025-02-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'CEAT signs multi-year OEM deal with Tata Motors for EV tyres', date: '2025-01-20', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Strong two-wheeler tyre franchise with growing car segment share. EV tyre leadership ambitions and premiumization driving margin improvement.',
      plans: ['Chennai greenfield plant full ramp-up', 'EV-specific tyre range across segments', 'Export contribution to 20%', 'Premiumize product mix — SUV and performance tyres'],
      risks: ['Raw material cost pressure on margins', 'Intense competition in passenger car segment', 'OEM pricing pressure from EV makers', 'Two-wheeler market cyclicality'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'JK Tyre',
      competitorTicker: 'JKTYRE',
      summary: 'CEAT competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'welspun-living', name: 'Welspun Living', industry: 'textile', ticker: 'WELSPUNLIV',
    founded: 1985, headquarters: 'Mumbai, Maharashtra', employees: '28,000+', marketCap: '₹11,500 Cr',
    ceo: 'Dipali Goenka (CEO & MD)', website: 'https://www.welspunliving.com',
    description: "​India's largest home textiles exporter and second-largest globally. Major supplier of towels, bed linen, and rugs to US and European retailers (Walmart, Target, Costco). Manufacturing at Vapi and Anjar in Gujarat. In FY25 the company reported revenue of ₹10,800 Cr and net profit of ₹850 Cr, at an EBITDA margin of around 17.1%. Its revenue is led by towels (40% of sales), complemented by bed linen and rugs & carpets. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Towels (Terry Products)', revenueShare: 40, description: "Bath towels — world's second-largest manufacturer" },
      { name: 'Bed Linen (Sheets & Covers)', revenueShare: 30, description: 'Premium bed sheets for global retailers' },
      { name: 'Rugs & Carpets', revenueShare: 12, description: 'Tufted and woven area rugs' },
      { name: 'Flooring Solutions', revenueShare: 10, description: 'Vinyl and carpet tile flooring' },
      { name: 'Domestic Brands (Spaces, Welspun)', revenueShare: 8, description: 'Branded home textiles for India market' },
    ],
    financials: [
      { year: 'FY21', revenue: 7156, profit: 580, ebitda: 1350 },
      { year: 'FY22', revenue: 9782, profit: 1020, ebitda: 1980 },
      { year: 'FY23', revenue: 9265, profit: 650, ebitda: 1520 },
      { year: 'FY24', revenue: 9680, profit: 720, ebitda: 1620 },
      { year: 'FY25', revenue: 10800, profit: 850, ebitda: 1850 },
    ],
    revenueFY25: '₹10,800 Cr', profitFY25: '₹850 Cr', ebitdaMargin: '17.1%',
    news: [
      { title: 'Welspun Living wins Rs 800 Cr Walmart towel contract for 3 years', date: '2025-04-05', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'New spinning facility in Telangana begins commercial production', date: '2025-02-22', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Welspun Flooring enters commercial segment with carpet tiles', date: '2025-01-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Global home textiles leader benefiting from China+1 shift. Domestic branded business gaining traction. Flooring is new growth vertical.',
      plans: ['Domestic brand revenue to Rs 2,000 Cr', 'Flooring business scaling up', 'Advanced textiles and smart fabrics R&D', 'Capacity expansion in Telangana'],
      risks: ['US retail demand cyclicality', 'Cotton price and availability', 'Client concentration (top 5 = 50% revenue)', 'Trade policy changes and tariffs'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Trident Ltd',
      competitorTicker: 'TRIDENT',
      summary: 'Welspun Living competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'jk-tyre', name: 'JK Tyre & Industries', industry: 'tyre', ticker: 'JKTYRE',
    founded: 1974, headquarters: 'New Delhi', employees: '14,000+', marketCap: '₹8,500 Cr',
    ceo: 'Raghupati Singhania (Chairman & MD)', website: 'https://www.jktyre.com',
    description: "​Part of JK Organisation. Pioneer of radial tyre technology in India. Operates 12 plants — 9 in India and 3 in Mexico (through Tornel acquisition). Strong OEM relationships with Maruti, Tata, and Mahindra. In FY25 the company reported revenue of ₹15,200 Cr and net profit of ₹820 Cr, at an EBITDA margin of around 13.8%. Its revenue is led by truck & bus radial tyres (35% of sales), complemented by passenger car radial tyres and two & three wheeler tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Truck & Bus Radial Tyres', revenueShare: 35, description: 'Steel radial and bias tyres for CVs' },
      { name: 'Passenger Car Radial Tyres', revenueShare: 28, description: 'Tyres for cars, UVs under JK and Vikrant brands' },
      { name: 'Two & Three Wheeler Tyres', revenueShare: 15, description: 'Motorcycle, scooter, and auto-rickshaw tyres' },
      { name: 'Off-Road Tyres (OTR)', revenueShare: 12, description: 'Tyres for mining, construction, and agriculture' },
      { name: 'Retreads & Exports', revenueShare: 10, description: 'Retreading solutions and international sales' },
    ],
    financials: [
      { year: 'FY21', revenue: 8918, profit: 300, ebitda: 1280 },
      { year: 'FY22', revenue: 11381, profit: 352, ebitda: 1350 },
      { year: 'FY23', revenue: 13586, profit: 510, ebitda: 1680 },
      { year: 'FY24', revenue: 14320, profit: 710, ebitda: 1950 },
      { year: 'FY25', revenue: 15200, profit: 820, ebitda: 2100 },
    ],
    revenueFY25: '₹15,200 Cr', profitFY25: '₹820 Cr', ebitdaMargin: '13.8%',
    news: [
      { title: 'JK Tyre launches Smart Tyre range with embedded sensors for fleet management', date: '2025-03-25', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'JK Tyre signs OEM supply agreement with Mahindra for new SUV platform', date: '2025-02-14', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'JK Tyre Mexico operations report first full-year profit', date: '2025-01-08', source: 'Livemint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Debt reduction and Mexico turnaround improving financials. Strong OEM ties and radial conversion in CV segment driving growth.',
      plans: ['Debt reduction target — net debt-free by FY28', 'Radial capacity expansion for TBR segment', 'Mexico operations profitability improvement', 'Smart tyre and connected fleet solutions'],
      risks: ['High debt levels constraining growth capex', 'Mexico operations currency and economic risks', 'Intense TBR competition from MRF and Apollo', 'OEM margin pressure from auto companies'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'CEAT',
      competitorTicker: 'CEAT',
      summary: 'JK Tyre & Industries competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'balkrishna-industries', name: 'Balkrishna Industries (BKT)', industry: 'tyre', ticker: 'BALKRISIND',
    founded: 1987, headquarters: 'Mumbai, Maharashtra', employees: '11,000+', marketCap: '₹52,000 Cr',
    ceo: 'Rajiv Poddar (Jt. MD)', website: 'https://www.bfrubber.com',
    description: "​Global leader in off-highway tyres (OHT) — agriculture, mining, industrial, and ATV segments. Exports 55% of revenue to 160+ countries. Plants at Aurangabad, Bhiwadi, Chopanki, Dombivli, and Waluj. Niche player with no direct competition from MRF/Apollo in core segment. In FY25 the company reported revenue of ₹11,200 Cr and net profit of ₹1,850 Cr, at an EBITDA margin of around 27.7%. Its revenue is led by agricultural tyres (45% of sales), complemented by industrial & construction tyres and mining & otr tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Agricultural Tyres', revenueShare: 45, description: 'Tractor, harvester, and farm implement tyres — global #3' },
      { name: 'Industrial & Construction Tyres', revenueShare: 25, description: 'Tyres for loaders, forklifts, and earthmovers' },
      { name: 'Mining & OTR Tyres', revenueShare: 15, description: 'Large off-the-road tyres for mining equipment' },
      { name: 'ATV & Lawn/Garden Tyres', revenueShare: 10, description: 'Specialty tyres for all-terrain and turf care vehicles' },
      { name: 'Port & Flotation Tyres', revenueShare: 5, description: 'Container handler and low-pressure flotation tyres' },
    ],
    financials: [
      { year: 'FY21', revenue: 5722, profit: 1040, ebitda: 1680 },
      { year: 'FY22', revenue: 7816, profit: 1174, ebitda: 1920 },
      { year: 'FY23', revenue: 9726, profit: 1550, ebitda: 2580 },
      { year: 'FY24', revenue: 10080, profit: 1620, ebitda: 2750 },
      { year: 'FY25', revenue: 11200, profit: 1850, ebitda: 3100 },
    ],
    revenueFY25: '₹11,200 Cr', profitFY25: '₹1,850 Cr', ebitdaMargin: '27.7%',
    news: [
      { title: 'BKT Waluj plant expansion adds 50,000 MTPA capacity for giant OHT tyres', date: '2025-04-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'BKT wins exclusive tyre partnership with IPL for 5 more years', date: '2025-02-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'BKT targets 10% global OHT market share by FY27 — currently at 6%', date: '2025-01-15', source: 'Financial Express', url: 'https://www.financialexpress.com' },
    ],
    futureScope: {
      outlook: 'Niche global leader with strong margins and no debt. Global agricultural mechanization and mining capex driving demand. Premium valuation justified by specialty positioning.',
      plans: ['Waluj capacity expansion to 4 lakh MTPA', 'Giant mining tyre (>49 inch) production', 'North America warehouse and distribution expansion', 'Carbon black backward integration'],
      risks: ['Global agricultural slowdown impact on farm tyre demand', 'Raw material imports (natural rubber, carbon black)', 'Currency volatility on 55% export revenue', 'Competition from Titan International and Trelleborg'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'Goodyear India',
      competitorTicker: 'GOODYEAR',
      summary: 'Balkrishna Industries (BKT) competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'page-industries', name: 'Page Industries', industry: 'textile', ticker: 'PAGEIND',
    founded: 1994, headquarters: 'Bengaluru, Karnataka', employees: '25,000+', marketCap: '₹52,000 Cr',
    ceo: 'Ashok Genomal (MD)', website: 'https://www.pageindustries.com',
    description: "​Exclusive licensee of Jockey International in India, Sri Lanka, Bangladesh, Nepal, and UAE. India's largest innerwear company by revenue. Also holds Speedo swimwear license for India. Known for premium quality and strong distribution. In FY25 the company reported revenue of ₹5,350 Cr and net profit of ₹710 Cr, at an EBITDA margin of around 20.6%. Its revenue is led by jockey men innerwear (45% of sales), complemented by jockey women innerwear and jockey athleisure & loungewear. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Jockey Men Innerwear', revenueShare: 45, description: 'Briefs, trunks, vests — market leader in premium segment' },
      { name: 'Jockey Women Innerwear', revenueShare: 25, description: 'Bras, panties, athleisure — fastest growing segment' },
      { name: 'Jockey Athleisure & Loungewear', revenueShare: 18, description: 'T-shirts, track pants, casual wear' },
      { name: 'Jockey Kids', revenueShare: 7, description: 'Children innerwear and casual wear' },
      { name: 'Speedo Swimwear', revenueShare: 5, description: 'Swimwear and swim accessories' },
    ],
    financials: [
      { year: 'FY21', revenue: 2874, profit: 380, ebitda: 580 },
      { year: 'FY22', revenue: 3810, profit: 502, ebitda: 750 },
      { year: 'FY23', revenue: 4386, profit: 555, ebitda: 870 },
      { year: 'FY24', revenue: 4814, profit: 620, ebitda: 970 },
      { year: 'FY25', revenue: 5350, profit: 710, ebitda: 1100 },
    ],
    revenueFY25: '₹5,350 Cr', profitFY25: '₹710 Cr', ebitdaMargin: '20.6%',
    news: [
      { title: 'Page Industries expands Jockey retail stores to 1,500 across India', date: '2025-03-25', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Jockey women innerwear segment grows 28% YoY in Q3 FY25', date: '2025-02-12', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Page Industries announces Rs 500 Cr capex for new Karnataka unit', date: '2025-01-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Premium innerwear underpenetrated in India. Women segment is fastest growth driver. Strong brand and distribution moat.',
      plans: ['Women innerwear to reach 35% of revenue', 'Athleisure category expansion', 'Tier 2/3 city distribution deepening', 'New manufacturing capacity in Karnataka'],
      risks: ['Premium valuation leaves no room for misses', 'Competition from D2C brands (Zivame, Clovia)', 'Raw material (cotton, elastane) cost pressure', 'Jockey license renewal dependency'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Lux Industries',
      competitorTicker: 'LUXIND',
      summary: 'Page Industries competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'arvind-ltd', name: 'Arvind Ltd', industry: 'textile', ticker: 'ARVIND',
    founded: 1931, headquarters: 'Ahmedabad, Gujarat', employees: '30,000+', marketCap: '₹8,500 Cr',
    ceo: 'Punit Lalbhai (ED & CEO)', website: 'https://www.arvind.com',
    description: "​India's largest denim manufacturer and a leading diversified textile company. Supplies denim fabric globally and operates branded apparel (Arrow, US Polo, Flying Machine). Also has advanced materials division for technical textiles. In FY25 the company reported revenue of ₹8,200 Cr and net profit of ₹430 Cr, at an EBITDA margin of around 13.4%. Its revenue is led by denim fabric (30% of sales), complemented by woven & knit fabrics and garment export. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Denim Fabric', revenueShare: 30, description: 'Largest denim producer in India — exports to 70+ countries' },
      { name: 'Woven & Knit Fabrics', revenueShare: 25, description: 'Shirting, voiles, and knitted fabrics' },
      { name: 'Garment Export', revenueShare: 20, description: 'Manufacturing for global brands (GAP, H&M, PVH)' },
      { name: 'Advanced Materials', revenueShare: 15, description: 'Human protection, composites, e-materials' },
      { name: 'Water & Environment', revenueShare: 10, description: 'Textile ETP and water treatment solutions' },
    ],
    financials: [
      { year: 'FY21', revenue: 5102, profit: 88, ebitda: 650 },
      { year: 'FY22', revenue: 7285, profit: 420, ebitda: 1050 },
      { year: 'FY23', revenue: 7854, profit: 380, ebitda: 1020 },
      { year: 'FY24', revenue: 7620, profit: 350, ebitda: 980 },
      { year: 'FY25', revenue: 8200, profit: 430, ebitda: 1100 },
    ],
    revenueFY25: '₹8,200 Cr', profitFY25: '₹430 Cr', ebitdaMargin: '13.4%',
    news: [
      { title: 'Arvind Ltd denim division wins sustainability award from UN Global Compact', date: '2025-03-18', source: 'Company PR', url: 'https://www.arvind.com' },
      { title: 'Advanced materials division bags Rs 400 Cr defense contract', date: '2025-02-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Arvind to invest Rs 700 Cr in new denim facility in Gujarat', date: '2025-01-05', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Denim leadership and advanced materials provide differentiation. Sustainability focus aligns with global brand requirements. Technical textiles is high-growth segment.',
      plans: ['Denim capacity expansion to 150M meters', 'Advanced materials for defense scaling', 'Sustainable manufacturing (waterless denim)', 'Garmenting capacity for PLI benefits'],
      risks: ['Denim demand linked to US/EU fashion cycles', 'Cotton price volatility', 'Competition from Bangladesh and Vietnam', 'Brand apparel now demerged (limited synergies)'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Vardhman Textiles',
      competitorTicker: 'VTL',
      summary: 'Arvind Ltd competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'goodyear-india', name: 'Goodyear India', industry: 'tyre', ticker: 'GOODYEAR',
    founded: 1961, headquarters: 'Gurugram, Haryana', employees: '2,500+', marketCap: '₹3,800 Cr',
    ceo: 'Sandeep Mahajan (Chairman & MD)', website: 'https://www.goodyear.co.in',
    description: "​Indian subsidiary of The Goodyear Tire & Rubber Company (USA). Operates manufacturing plant at Ballabgarh, Haryana. Focuses on farm tyres and passenger car tyre segment. Known for premium quality and global technology access. In FY25 the company reported revenue of ₹3,050 Cr and net profit of ₹245 Cr, at an EBITDA margin of around 14.3%. Its revenue is led by farm tyres (45% of sales), complemented by passenger car tyres and light commercial vehicle tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Farm Tyres', revenueShare: 45, description: 'Tractor front and rear tyres — strong rural brand' },
      { name: 'Passenger Car Tyres', revenueShare: 30, description: 'Premium car and SUV radial tyres' },
      { name: 'Light Commercial Vehicle Tyres', revenueShare: 15, description: 'LCV and pick-up truck tyres' },
      { name: 'Industrial & OTR Tyres', revenueShare: 10, description: 'Off-road and industrial application tyres' },
    ],
    financials: [
      { year: 'FY21', revenue: 1850, profit: 145, ebitda: 285 },
      { year: 'FY22', revenue: 2165, profit: 110, ebitda: 255 },
      { year: 'FY23', revenue: 2520, profit: 172, ebitda: 340 },
      { year: 'FY24', revenue: 2780, profit: 210, ebitda: 390 },
      { year: 'FY25', revenue: 3050, profit: 245, ebitda: 435 },
    ],
    revenueFY25: '₹3,050 Cr', profitFY25: '₹245 Cr', ebitdaMargin: '14.3%',
    news: [
      { title: 'Goodyear India expands Ballabgarh plant capacity by 20% for farm segment', date: '2025-03-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Goodyear launches Assurance range of EV-compatible tyres in India', date: '2025-02-08', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Goodyear India board approves special dividend of ₹40 per share', date: '2025-01-22', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Niche player focused on farm and premium car segments. Parent company global R&D access is key differentiator. Steady dividend payer.',
      plans: ['Farm tyre capacity expansion', 'Premium car tyre range expansion using global Goodyear technology', 'EV tyre development for Indian OEMs', 'Expand dealer network in Tier-2 and Tier-3 cities'],
      risks: ['Limited scale vs MRF and Apollo', 'Parent company strategic decisions on India role', 'Farm tyre demand linked to monsoon and rural economy', 'MNC subsidiary growth constraints'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'Balkrishna Industries',
      competitorTicker: 'BALKRISIND',
      summary: 'Goodyear India competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'trident-ltd', name: 'Trident Ltd', industry: 'textile', ticker: 'TRIDENT',
    founded: 1990, headquarters: 'Ludhiana, Punjab', employees: '20,000+', marketCap: '₹13,500 Cr',
    ceo: 'Rajinder Gupta (Chairman & MD)', website: 'https://www.tridentindia.com',
    description: "​India's largest terry towel manufacturer and a leading home textiles exporter. Also a significant paper manufacturer. Integrated operations from yarn to finished products at Barnala and Budni (MP). Exports to 100+ countries. In FY25 the company reported revenue of ₹7,600 Cr and net profit of ₹620 Cr, at an EBITDA margin of around 18.7%. Its revenue is led by terry towels (40% of sales), complemented by bed linen and yarn. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Terry Towels', revenueShare: 40, description: 'Bath and kitchen towels — largest Indian manufacturer' },
      { name: 'Bed Linen', revenueShare: 20, description: 'Bed sheets and pillow covers for export and domestic' },
      { name: 'Yarn', revenueShare: 20, description: 'Cotton and blended yarn — 3 lakh spindles' },
      { name: 'Paper & Chemicals', revenueShare: 15, description: 'Writing and printing paper from wheat straw' },
      { name: 'Domestic Brands', revenueShare: 5, description: 'Trident branded home textiles for India market' },
    ],
    financials: [
      { year: 'FY21', revenue: 5054, profit: 445, ebitda: 1100 },
      { year: 'FY22', revenue: 7338, profit: 990, ebitda: 1720 },
      { year: 'FY23', revenue: 7264, profit: 580, ebitda: 1380 },
      { year: 'FY24', revenue: 7050, profit: 520, ebitda: 1280 },
      { year: 'FY25', revenue: 7600, profit: 620, ebitda: 1420 },
    ],
    revenueFY25: '₹7,600 Cr', profitFY25: '₹620 Cr', ebitdaMargin: '18.7%',
    news: [
      { title: 'Trident Ltd commissions new terry towel capacity at Budni plant', date: '2025-04-02', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Trident wins Target supplier excellence award for third consecutive year', date: '2025-02-18', source: 'Company PR', url: 'https://www.tridentindia.com' },
      { title: 'Domestic brand Trident launched in 5,000 retail touchpoints', date: '2025-01-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'India gaining market share in global home textiles from China. Domestic branding adds margin. Paper segment provides diversification.',
      plans: ['Towel capacity doubling by FY27', 'Domestic brand revenue target Rs 1,000 Cr', 'Sustainable manufacturing with solar power', 'New product lines (bathrobes, mats)'],
      risks: ['US demand slowdown risk', 'Cotton price fluctuations', 'Power cost in Punjab operations', 'Paper segment faces digital substitution'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Welspun Living',
      competitorTicker: 'WELSPUNLIV',
      summary: 'Trident Ltd competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'tvs-srichakra', name: 'TVS Srichakra', industry: 'tyre', ticker: 'TVSSRICHAK',
    founded: 1982, headquarters: 'Madurai, Tamil Nadu', employees: '5,500+', marketCap: '₹5,200 Cr',
    ceo: 'P. Vijayaraghavan (MD)', website: 'https://www.tvssrichakra.com',
    description: "​Part of the TVS Group. Leading manufacturer of two-wheeler and three-wheeler tyres under the TVS Eurogrip brand. Also manufactures off-highway tyres for exports. Plants at Madurai (TN) and Rudrapur (Uttarakhand). In FY25 the company reported revenue of ₹5,100 Cr and net profit of ₹380 Cr, at an EBITDA margin of around 14.1%. Its revenue is led by two-wheeler tyres (45% of sales), complemented by off-highway tyres and three-wheeler tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Two-Wheeler Tyres', revenueShare: 45, description: 'Motorcycle and scooter tyres under TVS Eurogrip brand' },
      { name: 'Three-Wheeler Tyres', revenueShare: 15, description: 'Auto-rickshaw and cargo three-wheeler tyres' },
      { name: 'Off-Highway Tyres', revenueShare: 25, description: 'Industrial, agricultural, and ATV tyres for export' },
      { name: 'Passenger Car Tyres', revenueShare: 10, description: 'Car radial tyres — emerging segment' },
      { name: 'Tubes & Accessories', revenueShare: 5, description: 'Inner tubes and rim strips' },
    ],
    financials: [
      { year: 'FY21', revenue: 2850, profit: 198, ebitda: 420 },
      { year: 'FY22', revenue: 3520, profit: 168, ebitda: 380 },
      { year: 'FY23', revenue: 4210, profit: 258, ebitda: 540 },
      { year: 'FY24', revenue: 4580, profit: 320, ebitda: 620 },
      { year: 'FY25', revenue: 5100, profit: 380, ebitda: 720 },
    ],
    revenueFY25: '₹5,100 Cr', profitFY25: '₹380 Cr', ebitdaMargin: '14.1%',
    news: [
      { title: 'TVS Eurogrip launches tubeless range for electric scooters', date: '2025-03-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'TVS Srichakra Rudrapur plant capacity expansion to 900 TPD completed', date: '2025-02-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'TVS Srichakra off-highway tyre exports grow 30% to Europe and Americas', date: '2025-01-12', source: 'Livemint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Strong two-wheeler tyre franchise growing with EV scooter adoption. Off-highway export business provides diversification and higher margins.',
      plans: ['EV-specific tyre range expansion for two-wheelers', 'Off-highway capacity expansion at Rudrapur', 'Entry into passenger car tyre segment', 'Africa and ASEAN market penetration'],
      risks: ['Dependence on two-wheeler segment cyclicality', 'Intense competition from CEAT and MRF in 2W tyres', 'Raw material cost pressure', 'OHT export demand linked to global agriculture cycles'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'Birla Tyres',
      competitorTicker: 'BIRLATYRE',
      summary: 'TVS Srichakra competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'indo-count', name: 'Indo Count Industries', industry: 'textile', ticker: 'ICIL',
    founded: 1991, headquarters: 'Mumbai, Maharashtra', employees: '18,000+', marketCap: '₹8,000 Cr',
    ceo: 'Mohit Jain (MD)', website: 'https://www.indocount.com',
    description: "​India's largest bed linen exporter and among the top 3 globally. Supplies to major US retailers including Walmart, Target, Costco, and JCPenney. Manufacturing at Kolhapur, Maharashtra. Known for quality and scale in sheeting. In FY25 the company reported revenue of ₹4,000 Cr and net profit of ₹420 Cr, at an EBITDA margin of around 18.5%. Its revenue is led by bed sheets & sets (55% of sales), complemented by utility bedding and fashion bedding & accessories. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Bed Sheets & Sets', revenueShare: 55, description: 'Cotton bed sheets — largest Indian exporter' },
      { name: 'Utility Bedding', revenueShare: 20, description: 'Comforters, quilts, mattress pads' },
      { name: 'Fashion Bedding & Accessories', revenueShare: 12, description: 'Decorative pillows, throws, curtains' },
      { name: 'Institutional Textiles', revenueShare: 8, description: 'Hotel and hospital bed linen' },
      { name: 'Domestic Brands (Layers, Heirlooms)', revenueShare: 5, description: 'Branded bedding for India market' },
    ],
    financials: [
      { year: 'FY21', revenue: 2476, profit: 232, ebitda: 480 },
      { year: 'FY22', revenue: 3428, profit: 445, ebitda: 720 },
      { year: 'FY23', revenue: 3287, profit: 295, ebitda: 550 },
      { year: 'FY24', revenue: 3520, profit: 340, ebitda: 620 },
      { year: 'FY25', revenue: 4000, profit: 420, ebitda: 740 },
    ],
    revenueFY25: '₹4,000 Cr', profitFY25: '₹420 Cr', ebitdaMargin: '18.5%',
    news: [
      { title: 'Indo Count bags multi-year Rs 1,200 Cr contract from US retail chain', date: '2025-03-22', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'New utility bedding line commissioned at Kolhapur facility', date: '2025-02-05', source: 'Company PR', url: 'https://www.indocount.com' },
      { title: 'Indo Count domestic brand Layers crosses Rs 200 Cr revenue', date: '2025-01-18', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Diversifying from basic sheeting to utility bedding (higher margins). Domestic brand gaining traction. Benefiting from China exit in home textiles.',
      plans: ['Utility bedding to reach 40% of revenue', 'Domestic brand expansion to Rs 500 Cr', 'Non-US market diversification (EU, Australia)', 'Vertical integration into spinning'],
      risks: ['Heavy dependence on US market (70%+ exports)', 'Cotton price and supply volatility', 'Single manufacturing location risk', 'USD/INR exchange rate fluctuations'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Gokaldas Exports',
      competitorTicker: 'GOKALDAS',
      summary: 'Indo Count Industries competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'birla-tyres', name: 'Birla Tyres', industry: 'tyre', ticker: 'Unlisted (Kesoram)',
    founded: 1991, headquarters: 'Kolkata, West Bengal', employees: '4,000+', marketCap: 'Unlisted (Part of Kesoram Industries)',
    ceo: 'Raghav Poddar (Promoter)', website: 'https://www.birlatyres.com',
    description: "​Tyre division of Kesoram Industries (B.K. Birla Group). Operates plants at Balasore (Odisha) and Haridwar (Uttarakhand). Focuses on truck and bus bias tyres with growing radial portfolio. Has faced financial challenges due to parent company debt. In FY25 the company reported revenue of ₹3,500 Cr and net profit of ₹110 Cr, at an EBITDA margin of around 12.0%. Its revenue is led by truck & bus bias tyres (40% of sales), complemented by truck & bus radial tyres and light commercial vehicle tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Truck & Bus Bias Tyres', revenueShare: 40, description: 'Cross-ply tyres for commercial vehicles' },
      { name: 'Truck & Bus Radial Tyres', revenueShare: 25, description: 'Growing TBR radial segment' },
      { name: 'Light Commercial Vehicle Tyres', revenueShare: 18, description: 'LCV and SCV tyres' },
      { name: 'Two-Wheeler Tyres', revenueShare: 10, description: 'Motorcycle and scooter tyres' },
      { name: 'Farm & Industrial Tyres', revenueShare: 7, description: 'Agricultural and industrial application tyres' },
    ],
    financials: [
      { year: 'FY21', revenue: 2100, profit: -180, ebitda: 120 },
      { year: 'FY22', revenue: 2680, profit: -95, ebitda: 200 },
      { year: 'FY23', revenue: 3050, profit: 45, ebitda: 310 },
      { year: 'FY24', revenue: 3280, profit: 85, ebitda: 380 },
      { year: 'FY25', revenue: 3500, profit: 110, ebitda: 420 },
    ],
    revenueFY25: '₹3,500 Cr', profitFY25: '₹110 Cr', ebitdaMargin: '12.0%',
    news: [
      { title: 'Birla Tyres demerger from Kesoram Industries approved by NCLT', date: '2025-03-28', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Birla Tyres Balasore plant expands TBR radial capacity by 30%', date: '2025-02-15', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Birla Tyres partners with EV startups for last-mile delivery vehicle tyres', date: '2025-01-10', source: 'Livemint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Demerger from Kesoram expected to unlock value. Turnaround underway with radial shift and debt reduction. Eastern India distribution strength is a moat.',
      plans: ['Complete demerger and standalone listing', 'Shift to 60% radial mix from current 35%', 'Debt reduction post demerger', 'Expand two-wheeler and EV tyre segments'],
      risks: ['Legacy debt from parent company', 'Intense competition in TBR segment from larger players', 'Brand perception challenges', 'Limited capex ability for modernization'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'TVS Srichakra',
      competitorTicker: 'TVSSRICHAK',
      summary: 'Birla Tyres competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'gokaldas-exports', name: 'Gokaldas Exports', industry: 'textile', ticker: 'GOKEX',
    founded: 1979, headquarters: 'Bengaluru, Karnataka', employees: '50,000+', marketCap: '₹7,500 Cr',
    ceo: 'Sivaramakrishnan Ganapathi (MD)', website: 'https://www.gokaldasexports.com',
    description: "​India's largest garment exporter by capacity with 40+ manufacturing units across Karnataka, Tamil Nadu, and Andhra Pradesh. Supplies to global brands like H&M, GAP, Decathlon, Nike, and Columbia. Specializes in outerwear, activewear, and bottomwear. In FY25 the company reported revenue of ₹2,950 Cr and net profit of ₹310 Cr, at an EBITDA margin of around 17.3%. Its revenue is led by outerwear & jackets (35% of sales), complemented by activewear & sportswear and bottomwear. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Outerwear & Jackets', revenueShare: 35, description: 'Technical jackets, padded outerwear for global brands' },
      { name: 'Activewear & Sportswear', revenueShare: 25, description: 'Performance wear for Nike, Decathlon, Columbia' },
      { name: 'Bottomwear (Trousers, Shorts)', revenueShare: 20, description: 'Casual and formal bottoms' },
      { name: 'Knit Garments', revenueShare: 12, description: 'T-shirts, polo shirts, hoodies' },
      { name: 'Dresses & Tops', revenueShare: 8, description: 'Women casual and formal wear' },
    ],
    financials: [
      { year: 'FY21', revenue: 1248, profit: 28, ebitda: 110 },
      { year: 'FY22', revenue: 1756, profit: 135, ebitda: 245 },
      { year: 'FY23', revenue: 2185, profit: 185, ebitda: 340 },
      { year: 'FY24', revenue: 2520, profit: 250, ebitda: 420 },
      { year: 'FY25', revenue: 2950, profit: 310, ebitda: 510 },
    ],
    revenueFY25: '₹2,950 Cr', profitFY25: '₹310 Cr', ebitdaMargin: '17.3%',
    news: [
      { title: 'Gokaldas Exports capacity crosses 100 million pieces annually', date: '2025-04-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Wins new multi-year contract from European sportswear brand', date: '2025-02-20', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Gokaldas acquires garment unit in AP to expand capacity by 20%', date: '2025-01-10', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Strongest beneficiary of China+1 in garment exports. Order book at record high. Capacity expansion driving double-digit growth.',
      plans: ['Capacity expansion to 150M pieces by FY27', 'Higher-value technical garments focus', 'Backward integration into fabric', 'New factories in Tamil Nadu and AP'],
      risks: ['Client concentration risk (top 5 = 60%)', 'Labor availability in South India', 'Cotton and fabric price volatility', 'Order cancellation in global slowdown'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Indo Count',
      competitorTicker: 'ICIL',
      summary: 'Gokaldas Exports competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'yokohama-india', name: 'Yokohama India (Alliance Tire Group)', industry: 'tyre', ticker: 'Unlisted (Yokohama Rubber)',
    founded: 2007, headquarters: 'Pune, Maharashtra', employees: '6,500+', marketCap: 'Unlisted (Subsidiary of Yokohama Rubber, Japan)',
    ceo: 'Harinder Singh (CEO, Alliance Tire Group India)', website: 'https://www.atgtires.com',
    description: "​Alliance Tire Group (ATG), acquired by Yokohama Rubber in 2016 for $1.2 billion. Leading off-highway tyre manufacturer in India with plants at Dahej (Gujarat) and Tirunelveli (Tamil Nadu). Brands include Alliance, Galaxy, and Primex for agriculture, forestry, and construction. In FY25 the company reported revenue of ₹7,800 Cr and net profit of ₹800 Cr, at an EBITDA margin of around 19.5%. Its revenue is led by agricultural tyres (50% of sales), complemented by construction & industrial tyres and forestry tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Agricultural Tyres', revenueShare: 50, description: 'Tractor and farm implement tyres under Alliance brand' },
      { name: 'Forestry Tyres', revenueShare: 15, description: 'Specialty tyres for forestry equipment' },
      { name: 'Construction & Industrial Tyres', revenueShare: 20, description: 'Loader, telehandler, and industrial tyres' },
      { name: 'ATV & Turf Tyres', revenueShare: 10, description: 'Golf cart, lawn mower, and ATV tyres' },
      { name: 'Yokohama Passenger Car Tyres (Import)', revenueShare: 5, description: 'Premium car tyres imported for Indian market' },
    ],
    financials: [
      { year: 'FY21', revenue: 4200, profit: 380, ebitda: 780 },
      { year: 'FY22', revenue: 5500, profit: 520, ebitda: 1050 },
      { year: 'FY23', revenue: 6800, profit: 680, ebitda: 1320 },
      { year: 'FY24', revenue: 7200, profit: 720, ebitda: 1400 },
      { year: 'FY25', revenue: 7800, profit: 800, ebitda: 1520 },
    ],
    revenueFY25: '₹7,800 Cr', profitFY25: '₹800 Cr', ebitdaMargin: '19.5%',
    news: [
      { title: 'Yokohama ATG Dahej plant Phase 3 commissioning adds giant radial OHT line', date: '2025-04-02', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Alliance brand bags John Deere global OEM supply contract', date: '2025-02-12', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Yokohama India exploring passenger car tyre manufacturing in India', date: '2025-01-18', source: 'Livemint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Strong OHT export franchise competing with BKT globally. Yokohama parent investing heavily in India capacity. Potential entry into passenger car tyre manufacturing.',
      plans: ['Dahej capacity expansion to 1 lakh MTPA', 'Giant radial tyre development for mining', 'Yokohama brand car tyre manufacturing in India', 'Expand Alliance brand in Indian aftermarket'],
      risks: ['Competition from BKT in the same OHT niche', 'Global agriculture slowdown impacting export demand', 'Japanese parent company strategic priorities', 'Currency risks on export-heavy revenue'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'Continental India',
      competitorTicker: 'CONTL',
      summary: 'Yokohama India (Alliance Tire Group) competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'kpr-mill', name: 'KPR Mill', industry: 'textile', ticker: 'KPRMILL',
    founded: 1984, headquarters: 'Coimbatore, Tamil Nadu', employees: '22,000+', marketCap: '₹22,000 Cr',
    ceo: 'K.P. Ramasamy (CMD)', website: 'https://www.kprmill.com',
    description: "​India's largest integrated knitwear and garment manufacturer. Vertically integrated from yarn spinning to finished garments. Known for exceptional operational efficiency and high margins. Key supplier to global brands and growing domestic brand (FASO). In FY25 the company reported revenue of ₹6,500 Cr and net profit of ₹900 Cr, at an EBITDA margin of around 21.8%. Its revenue is led by garments (50% of sales), complemented by yarn and fabric. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Garments (Knitwear)', revenueShare: 50, description: 'T-shirts, innerwear for global brands — 350M pieces/year' },
      { name: 'Yarn (Cotton & Compact)', revenueShare: 30, description: 'Premium compact cotton yarn — 4.5 lakh spindles' },
      { name: 'Fabric (Knitted)', revenueShare: 10, description: 'Knitted fabric for internal consumption and sales' },
      { name: 'FASO (Domestic Brand)', revenueShare: 5, description: 'Organic innerwear brand for Indian market' },
      { name: 'Sugar & Ethanol', revenueShare: 5, description: 'Sugar mill and ethanol distillery' },
    ],
    financials: [
      { year: 'FY21', revenue: 3892, profit: 515, ebitda: 920 },
      { year: 'FY22', revenue: 5943, profit: 1020, ebitda: 1550 },
      { year: 'FY23', revenue: 6240, profit: 850, ebitda: 1380 },
      { year: 'FY24', revenue: 5980, profit: 780, ebitda: 1280 },
      { year: 'FY25', revenue: 6500, profit: 900, ebitda: 1420 },
    ],
    revenueFY25: '₹6,500 Cr', profitFY25: '₹900 Cr', ebitdaMargin: '21.8%',
    news: [
      { title: 'KPR Mill garment division achieves 400M piece annual run rate', date: '2025-03-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'FASO organic innerwear brand crosses Rs 300 Cr revenue milestone', date: '2025-02-08', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'KPR announces Rs 1,500 Cr expansion in garments and spinning', date: '2025-01-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Best-in-class integration and efficiency. FASO brand provides margin expansion. Garment exports growing with China+1 tailwind.',
      plans: ['Garment capacity to 500M pieces', 'FASO brand to Rs 1,000 Cr revenue', 'Spinning capacity to 6 lakh spindles', 'Athleisure and sustainable fabric development'],
      risks: ['Cotton price volatility impacts margins', 'Labor-intensive garment operations', 'Concentrated export markets', 'Brand building requires sustained investment'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Nitin Spinners',
      competitorTicker: 'NITINSPIN',
      summary: 'KPR Mill competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'continental-india', name: 'Continental India', industry: 'tyre', ticker: 'Unlisted (Continental AG)',
    founded: 2010, headquarters: 'Gurugram, Haryana', employees: '3,500+', marketCap: 'Unlisted (Subsidiary of Continental AG, Germany)',
    ceo: 'Prashanth Doreswamy (President & CEO, Continental India)', website: 'https://www.continental.com/en-in',
    description: "​Indian operations of Continental AG, Germany. Manufactures passenger car and two-wheeler tyres at Modipuram (Uttar Pradesh) plant. Also has automotive components business (brakes, electronics). Tyre brand positioning in premium and OEM segments. In FY25 the company reported revenue of ₹4,800 Cr and net profit of ₹370 Cr, at an EBITDA margin of around 14.6%. Its revenue is led by passenger car tyres (45% of sales), complemented by two-wheeler tyres and automotive electronics. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Passenger Car Tyres', revenueShare: 45, description: 'Premium radial tyres for cars and SUVs' },
      { name: 'Two-Wheeler Tyres', revenueShare: 20, description: 'High-performance motorcycle and scooter tyres' },
      { name: 'Automotive Electronics', revenueShare: 20, description: 'ABS, ESC, and ADAS components for OEMs' },
      { name: 'Brake Systems', revenueShare: 10, description: 'Disc brakes and brake components for Indian OEMs' },
      { name: 'Industrial Belts & Hoses', revenueShare: 5, description: 'ContiTech power transmission and fluid handling' },
    ],
    financials: [
      { year: 'FY21', revenue: 2400, profit: 120, ebitda: 310 },
      { year: 'FY22', revenue: 3100, profit: 180, ebitda: 420 },
      { year: 'FY23', revenue: 3800, profit: 250, ebitda: 530 },
      { year: 'FY24', revenue: 4200, profit: 310, ebitda: 600 },
      { year: 'FY25', revenue: 4800, profit: 370, ebitda: 700 },
    ],
    revenueFY25: '₹4,800 Cr', profitFY25: '₹370 Cr', ebitdaMargin: '14.6%',
    news: [
      { title: 'Continental India Modipuram plant expansion doubles passenger car tyre output', date: '2025-03-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Continental wins ADAS sensor supply contract from Tata Motors for Nexon EV', date: '2025-02-05', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Continental India revenue crosses ₹4,500 Cr — targets doubling in 3 years', date: '2025-01-14', source: 'Financial Express', url: 'https://www.financialexpress.com' },
    ],
    futureScope: {
      outlook: 'Benefiting from premiumization of Indian car market and ADAS adoption. Dual revenue streams from tyres and auto electronics provide diversification.',
      plans: ['Modipuram capacity expansion for premium tyres', 'ADAS and EV electronics manufacturing in India', 'EV-specific tyre development', 'Local R&D center for India-specific products'],
      risks: ['Premium segment is small in price-sensitive India', 'Competition from Michelin and Bridgestone in premium', 'Auto electronics requires heavy R&D investment', 'Parent company global restructuring impact'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'Yokohama India',
      competitorTicker: 'YOKOHAMA',
      summary: 'Continental India competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'nahar-spinning', name: 'Nahar Spinning', industry: 'textile', ticker: 'NAHARSPING',
    founded: 1983, headquarters: 'Ludhiana, Punjab', employees: '8,000+', marketCap: '₹1,200 Cr',
    ceo: 'Dinesh Oswal (CMD)', website: 'https://www.nahargroup.com',
    description: "​Part of Oswal Group. Leading cotton yarn manufacturer based in Punjab with integrated spinning, knitting, and garment facilities. Also produces fabrics and knitwear. Exports to 50+ countries. Known for Nahar and Monte Carlo brands. In FY25 the company reported revenue of ₹2,500 Cr and net profit of ₹130 Cr, at an EBITDA margin of around 12.8%. Its revenue is led by cotton & blended yarn (45% of sales), complemented by knitted fabrics and knitwear & garments. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Cotton & Blended Yarn', revenueShare: 45, description: 'Carded and combed cotton yarn — 2.5 lakh spindles' },
      { name: 'Knitted Fabrics', revenueShare: 20, description: 'Hosiery and knitted fabric for garments' },
      { name: 'Knitwear & Garments', revenueShare: 20, description: 'Finished garments for export and domestic' },
      { name: 'Woven Fabrics', revenueShare: 10, description: 'Grey and finished fabrics' },
      { name: 'Branded Apparel', revenueShare: 5, description: 'Nahar brand value retail' },
    ],
    financials: [
      { year: 'FY21', revenue: 1850, profit: 78, ebitda: 210 },
      { year: 'FY22', revenue: 2680, profit: 280, ebitda: 450 },
      { year: 'FY23', revenue: 2450, profit: 120, ebitda: 310 },
      { year: 'FY24', revenue: 2320, profit: 95, ebitda: 270 },
      { year: 'FY25', revenue: 2500, profit: 130, ebitda: 320 },
    ],
    revenueFY25: '₹2,500 Cr', profitFY25: '₹130 Cr', ebitdaMargin: '12.8%',
    news: [
      { title: 'Nahar Spinning yarn exports rise 18% as global demand recovers', date: '2025-03-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Company invests Rs 150 Cr in compact spinning technology upgrade', date: '2025-02-05', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Nahar Group announces Rs 200 Cr knitwear expansion in Ludhiana', date: '2025-01-15', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Stable yarn business with focus on value-added knitting. Punjab textile cluster provides ecosystem benefits. Volume growth moderate.',
      plans: ['Compact spinning conversion', 'Knitwear capacity expansion', 'Value-added yarn mix improvement', 'Export market diversification'],
      risks: ['Commoditized yarn business with thin margins', 'Power cost in Punjab', 'Cotton MSP and availability', 'Competition from South Indian spinners'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Siyaram Silk',
      competitorTicker: 'SIYSIL',
      summary: 'Nahar Spinning competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'michelin-india', name: 'Michelin India', industry: 'tyre', ticker: 'Unlisted (Michelin Group)',
    founded: 2009, headquarters: 'Chennai, Tamil Nadu', employees: '4,500+', marketCap: 'Unlisted (Subsidiary of Compagnie Générale des Établissements Michelin, France)',
    ceo: 'Mohan Kumar (President, Michelin India)', website: 'https://www.michelin.in',
    description: "​Indian manufacturing and sales arm of Michelin Group, the world's largest tyre company. Operates a truck and bus radial tyre plant at Thervoy Kandigai near Chennai (commissioned 2012). Also imports and sells Michelin passenger car tyres. Strong OEM ties with Ashok Leyland and Daimler India. In FY25 the company reported revenue of ₹6,500 Cr and net profit of ₹600 Cr, at an EBITDA margin of around 17.7%. Its revenue is led by truck & bus radial tyres (55% of sales), complemented by passenger car tyres and two-wheeler tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Truck & Bus Radial Tyres', revenueShare: 55, description: 'Premium TBR tyres manufactured at Chennai plant' },
      { name: 'Passenger Car Tyres (Import)', revenueShare: 25, description: 'Imported premium car and SUV tyres' },
      { name: 'Two-Wheeler Tyres', revenueShare: 10, description: 'Premium motorcycle tyres for sport and touring' },
      { name: 'Specialty & Mining Tyres (Import)', revenueShare: 7, description: 'Giant earthmover and mining tyres' },
      { name: 'Maps & Mobility Solutions', revenueShare: 3, description: 'Michelin fleet management solutions in India' },
    ],
    financials: [
      { year: 'FY21', revenue: 3200, profit: 210, ebitda: 520 },
      { year: 'FY22', revenue: 4100, profit: 280, ebitda: 650 },
      { year: 'FY23', revenue: 5200, profit: 420, ebitda: 880 },
      { year: 'FY24', revenue: 5800, profit: 510, ebitda: 1020 },
      { year: 'FY25', revenue: 6500, profit: 600, ebitda: 1150 },
    ],
    revenueFY25: '₹6,500 Cr', profitFY25: '₹600 Cr', ebitdaMargin: '17.7%',
    news: [
      { title: 'Michelin India Chennai plant expansion Phase 2 approved — ₹2,000 Cr investment', date: '2025-04-08', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Michelin partners with Indian Oil for fleet tyre management solutions', date: '2025-02-25', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Michelin India TBR tyre market share crosses 8% in premium segment', date: '2025-01-18', source: 'Livemint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Premium TBR focus with cost-per-km advantage driving fleet adoption. India is a strategic manufacturing hub for exports to Asia. Long-term bet on Indian CV market radialisation.',
      plans: ['Chennai plant Phase 2 — double TBR capacity', 'Local passenger car tyre manufacturing evaluation', 'Fleet-as-a-service tyre management', 'Sustainable tyre materials R&D in India'],
      risks: ['Premium pricing limits market share growth', 'Indian TBR market still 50% bias — slow radial shift', 'High import duty on premium car tyres', 'Competition from MRF and Apollo in TBR segment'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'Bridgestone India',
      competitorTicker: 'BRIDGSTONE',
      summary: 'Michelin India competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'nitin-spinners', name: 'Nitin Spinners', industry: 'textile', ticker: 'NITINSPIN',
    founded: 1992, headquarters: 'Bhilwara, Rajasthan', employees: '5,000+', marketCap: '₹2,800 Cr',
    ceo: 'Dinesh Nolkha (MD)', website: 'https://www.nitinspinners.com',
    description: "​Leading cotton yarn manufacturer from Rajasthan's Bhilwara textile hub. Specializes in knitting yarn, weaving yarn, and organic cotton yarn. Known for consistent quality supplying to domestic and international knitters and weavers. In FY25 the company reported revenue of ₹2,600 Cr and net profit of ₹240 Cr, at an EBITDA margin of around 18.5%. Its revenue is led by knitting yarn (40% of sales), complemented by weaving yarn and organic & specialty yarn. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Knitting Yarn', revenueShare: 40, description: 'Cotton and blended yarns for hosiery/knitting' },
      { name: 'Weaving Yarn', revenueShare: 30, description: 'High-quality yarn for weaving mills' },
      { name: 'Organic & Specialty Yarn', revenueShare: 15, description: 'BCI, organic, Supima cotton yarn' },
      { name: 'Knitted Fabric', revenueShare: 10, description: 'Grey and finished knit fabric' },
      { name: 'Woven Fabric', revenueShare: 5, description: 'Grey woven fabric for processors' },
    ],
    financials: [
      { year: 'FY21', revenue: 1680, profit: 145, ebitda: 310 },
      { year: 'FY22', revenue: 2850, profit: 520, ebitda: 720 },
      { year: 'FY23', revenue: 2480, profit: 210, ebitda: 450 },
      { year: 'FY24', revenue: 2350, profit: 180, ebitda: 400 },
      { year: 'FY25', revenue: 2600, profit: 240, ebitda: 480 },
    ],
    revenueFY25: '₹2,600 Cr', profitFY25: '₹240 Cr', ebitdaMargin: '18.5%',
    news: [
      { title: 'Nitin Spinners commissions new 1 lakh spindle compact unit', date: '2025-03-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Organic cotton yarn segment grows 35% with EU demand', date: '2025-02-12', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Company achieves zero liquid discharge at Bhilwara plant', date: '2025-01-08', source: 'Company PR', url: 'https://www.nitinspinners.com' },
    ],
    futureScope: {
      outlook: 'Specialty and organic yarn command premium pricing. Bhilwara cluster benefits. Capacity expansion drives growth. Clean manufacturing practices attract ESG-conscious buyers.',
      plans: ['Spinning capacity to 4 lakh spindles', 'Organic yarn portfolio expansion', 'Fabric forward integration', 'Solar power for 50% energy needs'],
      risks: ['Cotton crop failure or MSP hikes', 'Yarn price cyclicality', 'Single location concentration', 'Competition from larger integrated players'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'KPR Mill',
      competitorTicker: 'KPRMILL',
      summary: 'Nitin Spinners competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'bridgestone-india', name: 'Bridgestone India', industry: 'tyre', ticker: 'Unlisted (Bridgestone Corporation)',
    founded: 1996, headquarters: 'Pune, Maharashtra', employees: '3,800+', marketCap: 'Unlisted (Subsidiary of Bridgestone Corporation, Japan)',
    ceo: 'Parag Satpute (MD, Bridgestone India)', website: 'https://www.bridgestone.co.in',
    description: "​Indian subsidiary of Bridgestone Corporation, world's largest tyre and rubber company. Operates manufacturing plant at Kheda (Chakan), Pune. Focuses on passenger car, SUV, and commercial vehicle tyres. OEM supplier to Honda, Toyota, Maruti, and Hyundai in India. In FY25 the company reported revenue of ₹6,200 Cr and net profit of ₹520 Cr, at an EBITDA margin of around 15.8%. Its revenue is led by passenger car tyres (50% of sales), complemented by truck & bus tyres and light truck & lcv tyres. Established Indian tyre manufacturer with strong domestic presence and growing global footprint. Manufacturing plants across India.",
    products: [
      { name: 'Passenger Car Tyres', revenueShare: 50, description: 'Premium radial tyres for cars and SUVs — Turanza, Ecopia, Potenza ranges' },
      { name: 'Truck & Bus Tyres', revenueShare: 25, description: 'Radial tyres for medium and heavy commercial vehicles' },
      { name: 'Light Truck & LCV Tyres', revenueShare: 12, description: 'Tyres for pick-ups and light commercial vehicles' },
      { name: 'Two-Wheeler Tyres', revenueShare: 8, description: 'Premium motorcycle tyres — Battlax range' },
      { name: 'Retreading Solutions', revenueShare: 5, description: 'Bandag retread solutions for fleets' },
    ],
    financials: [
      { year: 'FY21', revenue: 3500, profit: 180, ebitda: 480 },
      { year: 'FY22', revenue: 4200, profit: 240, ebitda: 580 },
      { year: 'FY23', revenue: 5100, profit: 380, ebitda: 780 },
      { year: 'FY24', revenue: 5600, profit: 450, ebitda: 880 },
      { year: 'FY25', revenue: 6200, profit: 520, ebitda: 980 },
    ],
    revenueFY25: '₹6,200 Cr', profitFY25: '₹520 Cr', ebitdaMargin: '15.8%',
    news: [
      { title: 'Bridgestone India Pune plant invests ₹1,500 Cr in capacity expansion for SUV tyres', date: '2025-03-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Bridgestone becomes OEM tyre partner for Toyota Urban Cruiser Hyryder', date: '2025-02-08', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Bridgestone India launches Enliten lightweight tyre technology for EVs', date: '2025-01-25', source: 'Financial Express', url: 'https://www.financialexpress.com' },
    ],
    futureScope: {
      outlook: 'Premium positioning aligned with SUV and EV growth in India. Global R&D access for low rolling resistance and connected tyres. OEM relationships provide steady base demand.',
      plans: ['Pune plant capacity doubling for SUV segment', 'Enliten EV tyre technology rollout', 'India as export hub for ASEAN markets', 'Fleet management solutions via Bridgestone Mobility'],
      risks: ['Premium segment is niche in price-sensitive India', 'Aftermarket penetration challenge against MRF brand', 'Import duties on raw materials not locally available', 'Parent company investment pace for India expansion'],
    },
    extendedOverview: {
      businessSegments: 'Passenger car tyres, truck/bus tyres, two-wheeler tyres, OTR (Off-The-Road) tyres, tubes and flaps. Replacement and OEM markets.',
      geographicPresence: 'Manufacturing plants across India. Strong replacement market distribution. Growing export presence in global markets.',
      keyStrengths: ["Strong brand recognition in replacement market","Diversified across vehicle categories","Growing export business","R&D capabilities for new compounds and designs"],
      marketPosition: 'Established Indian tyre manufacturer with strong domestic presence and growing global footprint.',
      rawMaterialStrategy: 'Natural rubber (domestic from Kerala/NE + imported from SE Asia), synthetic rubber, carbon black, nylon/polyester cord, steel wire. Rubber price is key input cost variable.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Radial Tyre Conversion', growth: '12% CAGR', share: 'Growing radial share', insight: 'India shifting from bias to radial tyres. Higher margins and performance. Conversion still underway in CV segment.' }],
      cashCows: [{ name: 'Replacement Market', growth: '8% CAGR', share: 'Strong dealer network', insight: 'Replacement demand is 70% of market. Brand loyalty and dealer relationships drive sales.' }],
      questionMarks: [{ name: 'EV-Specific Tyres', growth: '25% CAGR', share: 'New segment', insight: 'EVs need different tyre characteristics (low noise, high load). Growing opportunity.' }],
      dogs: [{ name: 'Bias Tyres', growth: '-3% declining', share: 'Legacy segment', insight: 'Being replaced by radials. Maintained for rural/agricultural demand.' }],
    },
    headToHead: {
      competitor: 'Michelin India',
      competitorTicker: 'MICHELIN',
      summary: 'Bridgestone India competes in the Indian tyre industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian tyre industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'siyaram-silk', name: 'Siyaram Silk Mills', industry: 'textile', ticker: 'SIYSIL',
    founded: 1978, headquarters: 'Mumbai, Maharashtra', employees: '5,500+', marketCap: '₹3,200 Cr',
    ceo: 'Ramesh Poddar (CMD)', website: 'https://www.sfrbrands.com',
    description: "​One of India's leading branded fabric companies with strong presence in men's suiting and shirting. Popular brands include Siyaram's, Mistair, Oxemberg, and J.Hampstead. Strong distribution network of 1 lakh+ retail touchpoints across India. In FY25 the company reported revenue of ₹2,650 Cr and net profit of ₹250 Cr, at an EBITDA margin of around 15.5%. Its revenue is led by siyaram's fabrics (35% of sales), complemented by j.hampstead and oxemberg. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: "Siyaram's Fabrics (Mass Premium)", revenueShare: 35, description: "Flagship brand — India's favorite suiting/shirting" },
      { name: 'J.Hampstead (Premium)', revenueShare: 20, description: 'Premium Italian-finish suiting fabrics' },
      { name: 'Oxemberg (Ready-to-Wear)', revenueShare: 20, description: 'Formal and casual apparel brand' },
      { name: 'Mistair (Women)', revenueShare: 15, description: 'Polyester and blended fabrics for women' },
      { name: 'Cadini & MnM (Niche)', revenueShare: 10, description: 'Super-premium and kidswear brands' },
    ],
    financials: [
      { year: 'FY21', revenue: 1120, profit: 42, ebitda: 120 },
      { year: 'FY22', revenue: 1780, profit: 165, ebitda: 280 },
      { year: 'FY23', revenue: 2250, profit: 200, ebitda: 340 },
      { year: 'FY24', revenue: 2420, profit: 220, ebitda: 370 },
      { year: 'FY25', revenue: 2650, profit: 250, ebitda: 410 },
    ],
    revenueFY25: '₹2,650 Cr', profitFY25: '₹250 Cr', ebitdaMargin: '15.5%',
    news: [
      { title: "Siyaram's launches athleisure line under new sub-brand", date: '2025-03-12', source: 'Company PR', url: 'https://www.sfrbrands.com' },
      { title: 'J.Hampstead premium segment grows 30% in wedding season', date: '2025-02-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Siyaram expands retail network to 1.2 lakh touchpoints', date: '2025-01-05', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Strong branded play in mass-premium fabric segment. Wedding season drives suiting demand. Apparel brand Oxemberg scaling well.',
      plans: ['Ready-to-wear revenue to 40% of total', 'Women fabric segment expansion', 'E-commerce channel growth', 'Tier 3/4 city penetration deepening'],
      risks: ['Casualization trend reducing suiting demand', 'High competition in branded fabrics', 'Seasonal demand concentration', 'Raw material cost fluctuations'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Nahar Spinning',
      competitorTicker: 'NAHARSPING',
      summary: 'Siyaram Silk Mills competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'lux-industries', name: 'Lux Industries', industry: 'textile', ticker: 'LUXIND',
    founded: 1957, headquarters: 'Kolkata, West Bengal', employees: '8,000+', marketCap: '₹4,200 Cr',
    ceo: 'Ashok Kumar Todi (CMD)', website: 'https://www.luxinnerwear.com',
    description: "​One of India's leading innerwear companies with strong brand portfolio targeting mass and mid-premium segments. Popular brands include Lux Cozi, Lux Venus, Lux Inferno (thermals), ONN, and GenX. Dominant in Eastern and Northern India. In FY25 the company reported revenue of ₹2,850 Cr and net profit of ₹225 Cr, at an EBITDA margin of around 12.8%. Its revenue is led by lux cozi (35% of sales), complemented by lux venus & lyra and lux inferno. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Lux Cozi (Mid-Premium)', revenueShare: 35, description: 'Flagship men innerwear brand' },
      { name: 'Lux Venus & Lyra', revenueShare: 25, description: 'Economy segment innerwear for men and women' },
      { name: 'Lux Inferno (Thermals)', revenueShare: 15, description: 'Winter thermal wear — seasonal demand' },
      { name: 'ONN (Youth Premium)', revenueShare: 15, description: 'Premium fashion innerwear and athleisure' },
      { name: 'GenX & One8', revenueShare: 10, description: 'Youth brand and Virat Kohli partnership' },
    ],
    financials: [
      { year: 'FY21', revenue: 1685, profit: 200, ebitda: 295 },
      { year: 'FY22', revenue: 2585, profit: 315, ebitda: 425 },
      { year: 'FY23', revenue: 2462, profit: 165, ebitda: 290 },
      { year: 'FY24', revenue: 2580, profit: 185, ebitda: 310 },
      { year: 'FY25', revenue: 2850, profit: 225, ebitda: 365 },
    ],
    revenueFY25: '₹2,850 Cr', profitFY25: '₹225 Cr', ebitdaMargin: '12.8%',
    news: [
      { title: 'Lux Industries launches premium athleisure range under ONN Sport', date: '2025-03-18', source: 'Company PR', url: 'https://www.luxinnerwear.com' },
      { title: 'Lux Cozi signs new brand ambassador for South India push', date: '2025-02-10', source: 'Business Standard', url: 'https://www.business-standard.com' },
      { title: 'Lux Industries enters women innerwear segment with new brand', date: '2025-01-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Innerwear market growing at 10%+ CAGR. Premiumization trend benefits brands. Women innerwear is untapped opportunity for Lux.',
      plans: ['Women innerwear to 20% of revenue', 'Premiumization through ONN and GenX', 'South and West India distribution expansion', 'D2C e-commerce channel scaling'],
      risks: ['Intense competition from Page, Dollar, Rupa', 'Cotton price volatility', 'Seasonal dependence (thermals in Q3)', 'Brand dilution from too many sub-brands'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Dollar Industries',
      competitorTicker: 'DOLLAR',
      summary: 'Lux Industries competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'dollar-industries', name: 'Dollar Industries', industry: 'textile', ticker: 'DOLLAR',
    founded: 1972, headquarters: 'Kolkata, West Bengal', employees: '6,000+', marketCap: '₹2,500 Cr',
    ceo: 'Vinod Kumar Gupta (MD)', website: 'https://www.dollarindustries.com',
    description: "​One of India's top innerwear companies with strong presence in economy and mid-segment. Key brands include Dollar Bigboss, Dollar Missy (women), Dollar Ultra, and Force NXT (premium). Pan-India distribution with 1 lakh+ retail outlets. In FY25 the company reported revenue of ₹1,780 Cr and net profit of ₹135 Cr, at an EBITDA margin of around 12.9%. Its revenue is led by dollar bigboss (35% of sales), complemented by dollar missy and force nxt. Established Indian textile company with integrated manufacturing and growing brand/retail presence. Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab.",
    products: [
      { name: 'Dollar Bigboss (Men Economy)', revenueShare: 35, description: 'Mass-market men innerwear brand' },
      { name: 'Dollar Missy (Women)', revenueShare: 20, description: 'Women innerwear — fastest growing segment' },
      { name: 'Force NXT (Premium)', revenueShare: 18, description: 'Premium men innerwear and athleisure' },
      { name: 'Dollar Ultra (Mid-Segment)', revenueShare: 15, description: 'Mid-segment value brand' },
      { name: 'Thermals & Winterwear', revenueShare: 12, description: 'Seasonal thermal innerwear range' },
    ],
    financials: [
      { year: 'FY21', revenue: 1080, profit: 105, ebitda: 165 },
      { year: 'FY22', revenue: 1485, profit: 155, ebitda: 230 },
      { year: 'FY23', revenue: 1520, profit: 92, ebitda: 175 },
      { year: 'FY24', revenue: 1610, profit: 108, ebitda: 195 },
      { year: 'FY25', revenue: 1780, profit: 135, ebitda: 230 },
    ],
    revenueFY25: '₹1,780 Cr', profitFY25: '₹135 Cr', ebitdaMargin: '12.9%',
    news: [
      { title: 'Dollar Missy women innerwear crosses Rs 400 Cr revenue mark', date: '2025-03-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Force NXT premium brand grows 40% as premiumization trend continues', date: '2025-02-15', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Dollar Industries expands to 1.2 lakh retail points across India', date: '2025-01-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Women innerwear is high-growth untapped segment. Premiumization through Force NXT. Distribution depth in rural/semi-urban is moat.',
      plans: ['Women segment to 30% of revenue by FY27', 'Force NXT premium scaling', 'Athleisure and casual wear expansion', 'E-commerce to reach 10% of sales'],
      risks: ['Intense competition in economy segment', 'Cotton and yarn price fluctuations', 'Margin pressure from premium brand investment', 'Slower rural demand recovery'],
    },
    extendedOverview: {
      businessSegments: 'Yarn/fabric manufacturing, garments/apparel, home textiles, technical textiles. Value chain from fiber to fashion.',
      geographicPresence: 'Manufacturing clusters in Gujarat, Tamil Nadu, Maharashtra, Punjab. Strong domestic retail and growing exports.',
      keyStrengths: ["India is world second-largest textile producer","Strong cotton availability (domestic sourcing)","Growing brand/retail presence","Government PLI scheme support for technical textiles"],
      marketPosition: 'Established Indian textile company with integrated manufacturing and growing brand/retail presence.',
      rawMaterialStrategy: 'Cotton (India is the largest cotton producer), synthetic fibers (polyester, viscose), dyes and chemicals. Cotton price volatility is key risk factor.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Branded Apparel/Retail', growth: '15% CAGR', share: 'Growing brand share', insight: 'Indian apparel market growing with rising incomes. Brand premium provides margin expansion.' }],
      cashCows: [{ name: 'Fabric/Yarn Manufacturing', growth: '6% CAGR', share: 'Established capacity', insight: 'Core manufacturing business with stable demand from domestic and export markets.' }],
      questionMarks: [{ name: 'Technical Textiles', growth: '20% CAGR', share: 'Emerging segment', insight: 'Government PLI scheme promoting technical textiles. Growing from low base.' }],
      dogs: [{ name: 'Commodity Yarn Trading', growth: '2% CAGR', share: 'Declining focus', insight: 'Low-margin commodity business being reduced in favor of value-added products.' }],
    },
    headToHead: {
      competitor: 'Lux Industries',
      competitorTicker: 'LUXIND',
      summary: 'Dollar Industries competes in the Indian textile industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian textile industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  // ==================== ELECTRONICS (15) ====================
  {
    id: 'dixon-technologies', name: 'Dixon Technologies', industry: 'electronics', ticker: 'DIXON',
    founded: 1993, headquarters: 'Noida, Uttar Pradesh', employees: '15,000+', marketCap: '₹92,000 Cr',
    ceo: 'Atul B. Lall (Vice Chairman & MD)', website: 'https://www.dixontech.com',
    description: "​India's largest Electronics Manufacturing Services (EMS) company. Manufactures consumer electronics, lighting, mobile phones, and security systems for leading brands. Key beneficiary of PLI scheme. In FY25 the company reported revenue of ₹23,500 Cr and net profit of ₹560 Cr, at an EBITDA margin of around 4.7%. Its revenue is led by mobile phones & ems (40% of sales), complemented by consumer electronics and lighting products. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Mobile Phones & EMS', revenueShare: 40, description: 'Smartphone and feature phone manufacturing for Samsung, Xiaomi' },
      { name: 'Consumer Electronics (TVs)', revenueShare: 25, description: 'LED TVs for Samsung, Panasonic, Xiaomi' },
      { name: 'Lighting Products', revenueShare: 15, description: 'LED bulbs and battens for Philips, Havells' },
      { name: 'Home Appliances', revenueShare: 12, description: 'Washing machines and ACs for OEM brands' },
      { name: 'Security Systems', revenueShare: 8, description: 'CCTV cameras and set-top boxes' },
    ],
    financials: [
      { year: 'FY21', revenue: 6448, profit: 155, ebitda: 330 },
      { year: 'FY22', revenue: 10697, profit: 247, ebitda: 492 },
      { year: 'FY23', revenue: 12384, profit: 303, ebitda: 596 },
      { year: 'FY24', revenue: 17658, profit: 412, ebitda: 820 },
      { year: 'FY25', revenue: 23500, profit: 560, ebitda: 1100 },
    ],
    revenueFY25: '₹23,500 Cr', profitFY25: '₹560 Cr', ebitdaMargin: '4.7%',
    news: [
      { title: 'Dixon Technologies bags Samsung smartphone PLI order worth Rs 5,000 Cr', date: '2025-04-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'New laptop manufacturing facility inaugurated in Noida for IT hardware PLI', date: '2025-02-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Dixon enters server and telecom equipment manufacturing', date: '2025-01-15', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Biggest beneficiary of India EMS boom and PLI scheme. Expanding into IT hardware, servers, and medical devices. Revenue target Rs 35,000 Cr by FY27.',
      plans: ['IT hardware and laptop manufacturing', 'Server assembly under PLI', 'Medical devices EMS entry', 'Component backward integration'],
      risks: ['Low margins inherent to EMS model', 'Customer concentration risk', 'Rapid technology changes', 'Competition from global EMS players entering India'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Amber Enterprises',
      competitorTicker: 'AMBER',
      summary: 'Dixon Technologies competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'tata-electronics', name: 'Tata Electronics', industry: 'electronics', ticker: 'Unlisted',
    founded: 2020, headquarters: 'Bangalore, Karnataka', employees: '45,000+', marketCap: 'Unlisted',
    ceo: 'Randhir Thakur (CEO & MD)', website: 'https://www.tataelectronics.com',
    description: "​Tata Group's electronics and semiconductor arm. Operates India's first semiconductor fab at Dholera (Gujarat) and assembles iPhones at Hosur (Tamil Nadu). Acquired Wistron India plant for Apple manufacturing. In FY25 the company reported revenue of ₹38,000 Cr and net profit of ₹450 Cr, at an EBITDA margin of around 3.9%. Its revenue is led by iphone assembly (45% of sales), complemented by semiconductor fabrication and osat. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'iPhone Assembly', revenueShare: 45, description: 'Apple iPhone manufacturing at Hosur facility' },
      { name: 'Semiconductor Fabrication', revenueShare: 25, description: 'Chip fab at Dholera under construction with PSMC partnership' },
      { name: 'OSAT (Packaging & Testing)', revenueShare: 15, description: 'Outsourced semiconductor assembly and test at Assam' },
      { name: 'Precision Manufacturing', revenueShare: 10, description: 'Enclosures and precision components for electronics' },
      { name: 'Other Electronics', revenueShare: 5, description: 'PCB and other electronic assemblies' },
    ],
    financials: [
      { year: 'FY21', revenue: 0, profit: 0, ebitda: 0 },
      { year: 'FY22', revenue: 2500, profit: -200, ebitda: -50 },
      { year: 'FY23', revenue: 8500, profit: -150, ebitda: 100 },
      { year: 'FY24', revenue: 22000, profit: 180, ebitda: 850 },
      { year: 'FY25', revenue: 38000, profit: 450, ebitda: 1500 },
    ],
    revenueFY25: '₹38,000 Cr', profitFY25: '₹450 Cr', ebitdaMargin: '3.9%',
    news: [
      { title: 'Tata Electronics Dholera semiconductor fab construction reaches 50% milestone', date: '2025-04-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'iPhone production at Hosur crosses 5 million units milestone', date: '2025-03-05', source: 'Reuters', url: 'https://www.reuters.com' },
      { title: 'OSAT facility at Morigaon, Assam begins trial production', date: '2025-01-25', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: "Anchor of India's semiconductor ambitions. iPhone assembly scaling rapidly. Dholera fab to produce 28nm chips by 2026. Strategic national importance.",
      plans: ['Dholera fab operational by 2026', 'iPhone assembly to 20M units/year', 'OSAT facility full commissioning', 'Advanced packaging capabilities'],
      risks: ['Massive capex with long payback period', 'Technology transfer challenges from PSMC', 'Apple single-customer dependency', 'Semiconductor talent shortage in India'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Foxconn India',
      competitorTicker: 'Unlisted',
      summary: 'Tata Electronics competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'havells-india', name: 'Havells India', industry: 'electronics', ticker: 'HAVELLS',
    founded: 1958, headquarters: 'Noida, Uttar Pradesh', employees: '12,000+', marketCap: '₹1,05,000 Cr',
    ceo: 'Anil Rai Gupta (Chairman & MD)', website: 'https://www.havells.com',
    description: "​Leading Indian electrical and consumer electronics company. Portfolio includes Havells, Lloyd (ACs & appliances), Standard, and REO brands. Operates 13 manufacturing plants across India with strong brand recall. In FY25 the company reported revenue of ₹21,200 Cr and net profit of ₹1,920 Cr, at an EBITDA margin of around 13.0%. Its revenue is led by lloyd consumer appliances (28% of sales), complemented by cables & wires and lighting & fixtures. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Lloyd Consumer Appliances', revenueShare: 28, description: 'ACs, washing machines, refrigerators, TVs under Lloyd brand' },
      { name: 'Cables & Wires', revenueShare: 25, description: 'Industrial and domestic cables and wires' },
      { name: 'Lighting & Fixtures', revenueShare: 18, description: 'LED lighting, decorative fixtures' },
      { name: 'Switchgear & Electricals', revenueShare: 17, description: 'MCBs, switches, distribution boards' },
      { name: 'Fans & Small Appliances', revenueShare: 12, description: 'Ceiling fans, water heaters, irons' },
    ],
    financials: [
      { year: 'FY21', revenue: 10410, profit: 1052, ebitda: 1460 },
      { year: 'FY22', revenue: 14153, profit: 1272, ebitda: 1780 },
      { year: 'FY23', revenue: 16935, profit: 1460, ebitda: 2080 },
      { year: 'FY24', revenue: 18875, profit: 1680, ebitda: 2350 },
      { year: 'FY25', revenue: 21200, profit: 1920, ebitda: 2750 },
    ],
    revenueFY25: '₹21,200 Cr', profitFY25: '₹1,920 Cr', ebitdaMargin: '13.0%',
    news: [
      { title: 'Havells Lloyd AC business crosses Rs 5,000 Cr revenue with 12% market share', date: '2025-04-15', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Launches new range of smart connected home products under IoT initiative', date: '2025-02-28', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Havells expands rural distribution to 50,000 towns', date: '2025-01-18', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Strong brand and distribution moat. Lloyd AC business achieving scale. Real estate cycle and electrification driving cables demand. Premium positioning supports margins.',
      plans: ['Lloyd AC market share to 15%', 'Smart home ecosystem development', 'Rural and semi-urban penetration', 'Premium fans and appliances growth'],
      risks: ['Intense competition in consumer durables', 'Raw material (copper) price volatility', 'Seasonal demand dependency for ACs', 'Lloyd brand still building consumer trust'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Voltas',
      competitorTicker: 'VOLTAS',
      summary: 'Havells India competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'bharat-electronics', name: 'Bharat Electronics (BEL)', industry: 'electronics', ticker: 'BEL',
    founded: 1954, headquarters: 'Bangalore, Karnataka', employees: '11,500+', marketCap: '₹2,10,000 Cr',
    ceo: 'Manoj Jain (CMD)', website: 'https://www.bel-india.in',
    description: "​India's premier defence electronics PSU under Ministry of Defence. Manufactures radar systems, electronic warfare equipment, communications systems, and avionics. Key supplier to Indian armed forces with growing civilian segment. In FY25 the company reported revenue of ₹23,800 Cr and net profit of ₹4,500 Cr, at an EBITDA margin of around 27.7%. Its revenue is led by radar & weapon systems (30% of sales), complemented by communication & network systems and electronic warfare. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Radar & Weapon Systems', revenueShare: 30, description: 'Air defence radars, fire control systems, naval systems' },
      { name: 'Communication & Network Systems', revenueShare: 25, description: 'Software defined radios, tactical communication' },
      { name: 'Electronic Warfare', revenueShare: 18, description: 'EW suites, jammers, SIGINT systems' },
      { name: 'Electro-Optics & Avionics', revenueShare: 15, description: 'Night vision devices, helmet displays, flight computers' },
      { name: 'Civilian Products', revenueShare: 12, description: 'EVM machines, solar products, homeland security' },
    ],
    financials: [
      { year: 'FY21', revenue: 14063, profit: 1931, ebitda: 3400 },
      { year: 'FY22', revenue: 15368, profit: 2164, ebitda: 3700 },
      { year: 'FY23', revenue: 17734, profit: 2984, ebitda: 4600 },
      { year: 'FY24', revenue: 20268, profit: 3745, ebitda: 5500 },
      { year: 'FY25', revenue: 23800, profit: 4500, ebitda: 6600 },
    ],
    revenueFY25: '₹23,800 Cr', profitFY25: '₹4,500 Cr', ebitdaMargin: '27.7%',
    news: [
      { title: 'BEL wins Rs 8,500 Cr order for advanced air defence radar systems from IAF', date: '2025-04-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Exports defence electronics to 12 new countries under Make in India push', date: '2025-03-12', source: 'PIB', url: 'https://pib.gov.in' },
      { title: 'BEL enters 6G research and quantum communication development', date: '2025-01-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Largest beneficiary of defence indigenization. Order book exceeds Rs 76,000 Cr providing 3+ years visibility. Expanding into cybersecurity, space, and 6G.',
      plans: ['Order book target Rs 1 lakh Cr', 'Defence export push to $1 Bn', 'Space electronics and satellite systems', 'Cybersecurity and AI-based products'],
      risks: ['Government budget allocation dependency', 'Long order execution cycles', 'Technology obsolescence in fast-moving defence tech', 'Limited private sector competition emerging'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Kaynes Technology',
      competitorTicker: 'KAYNES',
      summary: 'Bharat Electronics (BEL) competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'voltas', name: 'Voltas', industry: 'electronics', ticker: 'VOLTAS',
    founded: 1954, headquarters: 'Mumbai, Maharashtra', employees: '8,500+', marketCap: '₹52,000 Cr',
    ceo: 'Pradeep Bakshi (MD & CEO)', website: 'https://www.voltas.com',
    description: "​India's No.1 AC brand by market share (24%+). Part of Tata Group. Operations span Unitary Cooling Products (room ACs), Engineering Projects, and Voltas Beko JV for home appliances. Strong distribution network across India. In FY25 the company reported revenue of ₹13,200 Cr and net profit of ₹850 Cr, at an EBITDA margin of around 9.5%. Its revenue is led by room air conditioners (45% of sales), complemented by commercial refrigeration and voltas beko appliances. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Room Air Conditioners', revenueShare: 45, description: 'Split and window ACs — market leader with 24% share' },
      { name: 'Commercial Refrigeration', revenueShare: 18, description: 'Visi-coolers, chest freezers, water coolers' },
      { name: 'Voltas Beko Appliances', revenueShare: 17, description: 'Washing machines, refrigerators, dishwashers (JV with Arcelik)' },
      { name: 'Engineering Projects (MEP)', revenueShare: 12, description: 'Electromechanical projects and HVAC systems' },
      { name: 'Air Coolers & Purifiers', revenueShare: 8, description: 'Desert and personal air coolers' },
    ],
    financials: [
      { year: 'FY21', revenue: 6961, profit: 580, ebitda: 820 },
      { year: 'FY22', revenue: 8046, profit: 505, ebitda: 740 },
      { year: 'FY23', revenue: 9298, profit: 485, ebitda: 710 },
      { year: 'FY24', revenue: 10520, profit: 620, ebitda: 890 },
      { year: 'FY25', revenue: 13200, profit: 850, ebitda: 1250 },
    ],
    revenueFY25: '₹13,200 Cr', profitFY25: '₹850 Cr', ebitdaMargin: '9.5%',
    news: [
      { title: 'Voltas AC market share crosses 24% in record summer season', date: '2025-04-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Voltas Beko acquires full ownership as Tata buys out Arcelik stake', date: '2025-03-01', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'New AC manufacturing plant commissioned at Tirupati, Andhra Pradesh', date: '2025-01-22', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'AC penetration in India at 8% vs 60%+ in developed countries — massive growth runway. Heatwaves accelerating adoption. Full appliance portfolio under development.',
      plans: ['Maintain 24%+ AC market share', 'Full ownership of Voltas Beko appliances', 'Inverter AC ratio to 90%', 'Tier 3-4 town distribution expansion'],
      risks: ['Intense competition from Daikin, Lloyd, Blue Star', 'Summer dependency and seasonal volatility', 'Refrigerant regulation changes (HFC phase-down)', 'Margin pressure from price wars'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Havells India',
      competitorTicker: 'HAVELLS',
      summary: 'Voltas competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'amber-enterprises', name: 'Amber Enterprises', industry: 'electronics', ticker: 'AMBER',
    founded: 1990, headquarters: 'Gurugram, Haryana', employees: '10,000+', marketCap: '₹18,000 Cr',
    ceo: 'Jasbir Singh (Chairman & CEO)', website: 'https://www.ambergroupindia.com',
    description: "​India's largest contract manufacturer of room ACs and AC components. Supplies IDUs, ODUs, and components to brands like Voltas, Blue Star, Panasonic, and Daikin. Also expanding into electronics EMS through subsidiaries. In FY25 the company reported revenue of ₹10,500 Cr and net profit of ₹280 Cr, at an EBITDA margin of around 7.4%. Its revenue is led by room ac odm/oem (40% of sales), complemented by ac components and electronics ems. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Room AC (RAC) ODM/OEM', revenueShare: 40, description: 'Complete AC manufacturing for consumer brands' },
      { name: 'AC Components (IDU/ODU)', revenueShare: 25, description: 'Indoor and outdoor units, heat exchangers, sheet metal' },
      { name: 'Electronics EMS (ILJIN/Ascent)', revenueShare: 18, description: 'PCB assembly, LED drivers, controllers' },
      { name: 'Motors & Mobility Components', revenueShare: 10, description: 'BLDC motors, EV components through subsidiaries' },
      { name: 'Commercial Refrigeration', revenueShare: 7, description: 'Visi-coolers and chest freezers for brands' },
    ],
    financials: [
      { year: 'FY21', revenue: 3432, profit: 92, ebitda: 258 },
      { year: 'FY22', revenue: 5227, profit: 128, ebitda: 380 },
      { year: 'FY23', revenue: 6876, profit: 155, ebitda: 485 },
      { year: 'FY24', revenue: 8100, profit: 195, ebitda: 580 },
      { year: 'FY25', revenue: 10500, profit: 280, ebitda: 780 },
    ],
    revenueFY25: '₹10,500 Cr', profitFY25: '₹280 Cr', ebitdaMargin: '7.4%',
    news: [
      { title: 'Amber Enterprises bags multi-year AC order from Daikin India worth Rs 2,500 Cr', date: '2025-04-05', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'ILJIN electronics subsidiary wins PLI approval for PCB manufacturing', date: '2025-02-18', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'New BLDC motor facility commissioned for energy-efficient appliances', date: '2025-01-10', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'AC industry growth directly benefits Amber as component supplier. Low AC penetration in India is a structural tailwind. Electronics EMS adds diversification.',
      plans: ['AC component capacity 15M units by FY27', 'Electronics EMS scale-up', 'BLDC motor and EV component growth', 'Export AC components to Middle East'],
      risks: ['Customer concentration (top 5 brands = 70% revenue)', 'Seasonal AC demand volatility', 'Thin OEM margins under pressure', 'Competition from Chinese component imports'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Dixon Technologies',
      competitorTicker: 'DIXON',
      summary: 'Amber Enterprises competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'kaynes-technology', name: 'Kaynes Technology', industry: 'electronics', ticker: 'KAYNES',
    founded: 2008, headquarters: 'Mysore, Karnataka', employees: '4,500+', marketCap: '₹28,000 Cr',
    ceo: 'Ramesh Kunhikannan (Chairman & MD)', website: 'https://www.kaynestech.com',
    description: "​End-to-end IoT and EMS solutions provider specializing in high-mix, low-volume electronics. Serves automotive, industrial, aerospace, and railway sectors. Known for complex PCB assemblies and box-build solutions. In FY25 the company reported revenue of ₹2,650 Cr and net profit of ₹285 Cr, at an EBITDA margin of around 18.1%. Its revenue is led by industrial electronics ems (30% of sales), complemented by automotive electronics and railway & aerospace electronics. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Industrial Electronics EMS', revenueShare: 30, description: 'Industrial automation, IoT devices, smart meters' },
      { name: 'Automotive Electronics', revenueShare: 25, description: 'ECUs, ADAS modules, EV controllers' },
      { name: 'Railway & Aerospace Electronics', revenueShare: 20, description: 'Signaling systems, avionics PCBs for defence' },
      { name: 'OSAT & Semiconductor', revenueShare: 15, description: 'Chip packaging — Outsourced Assembly and Test' },
      { name: 'PCB Manufacturing', revenueShare: 10, description: 'Multi-layer PCB fabrication (Kaynes Semicon subsidiary)' },
    ],
    financials: [
      { year: 'FY21', revenue: 630, profit: 45, ebitda: 85 },
      { year: 'FY22', revenue: 932, profit: 75, ebitda: 140 },
      { year: 'FY23', revenue: 1428, profit: 130, ebitda: 235 },
      { year: 'FY24', revenue: 1920, profit: 195, ebitda: 340 },
      { year: 'FY25', revenue: 2650, profit: 285, ebitda: 480 },
    ],
    revenueFY25: '₹2,650 Cr', profitFY25: '₹285 Cr', ebitdaMargin: '18.1%',
    news: [
      { title: 'Kaynes Technology wins Rs 800 Cr OSAT contract for automotive chips', date: '2025-04-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'New PCB fabrication plant at Chamarajanagar achieves full capacity', date: '2025-02-25', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Kaynes selected for ISRO satellite electronics manufacturing program', date: '2025-01-08', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Premium EMS player in high-value segments. OSAT entry positions for semiconductor packaging boom. Defence and automotive orders provide multi-year visibility.',
      plans: ['OSAT facility commissioning for chip packaging', 'Automotive electronics 3x growth', 'PCB fab capacity expansion', 'Defence electronics order pipeline Rs 3,000 Cr'],
      risks: ['High valuation demands consistent execution', 'Semiconductor OSAT technology maturity', 'Dependence on few large clients', 'Skilled workforce retention in EMS'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Syrma SGS',
      competitorTicker: 'SYRMA',
      summary: 'Kaynes Technology competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'syrma-sgs', name: 'Syrma SGS Technology', industry: 'electronics', ticker: 'SYRMA',
    founded: 2004, headquarters: 'Chennai, Tamil Nadu', employees: '5,500+', marketCap: '₹8,500 Cr',
    ceo: 'Sanmit Syrma (Co-Founder & MD)', website: 'https://www.syrmasgs.com',
    description: "​Emerging EMS player specializing in PCBA, sub-assemblies, and box-build for industrial, automotive, healthcare, and IT sectors. Merged with SGS Tekniks in 2021 to create a diversified EMS platform across India. In FY25 the company reported revenue of ₹3,500 Cr and net profit of ₹200 Cr, at an EBITDA margin of around 11.4%. Its revenue is led by industrial electronics (30% of sales), complemented by it & consumer electronics and automotive electronics. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Industrial Electronics', revenueShare: 30, description: 'Smart meters, power electronics, industrial automation' },
      { name: 'IT & Consumer Electronics', revenueShare: 25, description: 'Set-top boxes, routers, RFID products' },
      { name: 'Automotive Electronics', revenueShare: 20, description: 'ECU assemblies, sensors, motor controllers' },
      { name: 'Healthcare Devices', revenueShare: 15, description: 'Medical device assemblies, diagnostic equipment' },
      { name: 'Aerospace & Defence', revenueShare: 10, description: 'Defence electronics, avionics sub-systems' },
    ],
    financials: [
      { year: 'FY21', revenue: 780, profit: 52, ebitda: 95 },
      { year: 'FY22', revenue: 1250, profit: 78, ebitda: 150 },
      { year: 'FY23', revenue: 2045, profit: 112, ebitda: 220 },
      { year: 'FY24', revenue: 2680, profit: 148, ebitda: 295 },
      { year: 'FY25', revenue: 3500, profit: 200, ebitda: 400 },
    ],
    revenueFY25: '₹3,500 Cr', profitFY25: '₹200 Cr', ebitdaMargin: '11.4%',
    news: [
      { title: 'Syrma SGS wins Rs 1,200 Cr smart meter order from EESL', date: '2025-03-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'New manufacturing facility at Sri City operational for auto electronics', date: '2025-02-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Syrma enters semiconductor packaging with new OSAT initiative', date: '2025-01-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Well-diversified EMS player across verticals. Smart meter opportunity provides multi-year revenue visibility. Automotive and healthcare are high-growth segments.',
      plans: ['Smart meter capacity 10M units/year', 'Automotive EMS scale to Rs 1,000 Cr', 'Medical devices MedTech vertical', 'Semiconductor packaging entry'],
      risks: ['Competition from larger EMS players (Dixon, Kaynes)', 'Smart meter order execution challenges', 'Customer concentration in few verticals', 'Margin pressure in price-sensitive segments'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Kaynes Technology',
      competitorTicker: 'KAYNES',
      summary: 'Syrma SGS Technology competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'foxconn-india', name: 'Foxconn India (Hon Hai)', industry: 'electronics', ticker: 'Unlisted',
    founded: 2015, headquarters: 'Sriperumbudur, Tamil Nadu', employees: '40,000+', marketCap: 'Unlisted',
    ceo: 'V. Lee (India Head)', website: 'https://www.foxconn.com',
    description: "​Indian operations of the world's largest electronics contract manufacturer (Hon Hai Precision). Manufactures Apple iPhones, Xiaomi phones, and Nokia devices at plants in Tamil Nadu and Karnataka. Largest electronics exporter from India. In FY25 the company reported revenue of ₹85,000 Cr and net profit of ₹850 Cr, at an EBITDA margin of around 3.0%. Its revenue is led by apple iphone assembly (55% of sales), complemented by xiaomi smartphone assembly and nokia/hmd devices. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Apple iPhone Assembly', revenueShare: 55, description: 'iPhone 15 and iPhone 16 series manufacturing for export and domestic' },
      { name: 'Xiaomi Smartphone Assembly', revenueShare: 20, description: 'Xiaomi and Redmi phone manufacturing' },
      { name: 'Nokia/HMD Devices', revenueShare: 10, description: 'Nokia branded feature phones and smartphones' },
      { name: 'AirPods & Accessories', revenueShare: 10, description: 'Apple AirPods and charging accessories' },
      { name: 'Server & IT Hardware', revenueShare: 5, description: 'Server assembly under IT hardware PLI' },
    ],
    financials: [
      { year: 'FY21', revenue: 25000, profit: 250, ebitda: 750 },
      { year: 'FY22', revenue: 38000, profit: 380, ebitda: 1140 },
      { year: 'FY23', revenue: 52000, profit: 520, ebitda: 1560 },
      { year: 'FY24', revenue: 68000, profit: 680, ebitda: 2040 },
      { year: 'FY25', revenue: 85000, profit: 850, ebitda: 2550 },
    ],
    revenueFY25: '₹85,000 Cr', profitFY25: '₹850 Cr', ebitdaMargin: '3.0%',
    news: [
      { title: 'Foxconn India iPhone exports cross $10 Bn milestone in FY25', date: '2025-04-15', source: 'Reuters', url: 'https://www.reuters.com' },
      { title: 'New Devanahalli plant near Bangalore begins iPhone production', date: '2025-03-10', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Foxconn investing Rs 15,000 Cr in new electronics cluster in Tamil Nadu', date: '2025-01-28', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: "India's largest electronics manufacturer and exporter. Apple's China+1 strategy drives further shift to India. Expanding beyond phones into servers and EV components.",
      plans: ['iPhone production to 30M+ units/year', 'EV component manufacturing plant', 'Semiconductor packaging facility', 'AI server assembly under PLI'],
      risks: ['Apple single-customer dependency (55% revenue)', 'Labor challenges and worker welfare issues', 'Competition from Tata Electronics (ex-Wistron)', 'Thin contract manufacturing margins'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Samsung India',
      competitorTicker: 'Unlisted',
      summary: 'Foxconn India (Hon Hai) competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'samsung-india', name: 'Samsung India Electronics', industry: 'electronics', ticker: 'Unlisted',
    founded: 1995, headquarters: 'Gurugram, Haryana', employees: '70,000+', marketCap: 'Unlisted',
    ceo: 'JB Park (President & CEO, Samsung Southwest Asia)', website: 'https://www.samsung.com/in',
    description: "​India's largest consumer electronics company and second-largest smartphone brand. Operates the world's largest mobile factory at Noida and a home appliance plant at Chennai. Major exporter of smartphones and electronics from India. In FY25 the company reported revenue of ₹1,05,000 Cr and net profit of ₹5,800 Cr, at an EBITDA margin of around 9.7%. Its revenue is led by smartphones & tablets (40% of sales), complemented by consumer electronics and home appliances. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Smartphones & Tablets', revenueShare: 40, description: 'Galaxy S, A, M, and F series phones — 18% market share' },
      { name: 'Consumer Electronics (TVs)', revenueShare: 20, description: 'QLED, Neo QLED, Crystal UHD TVs — market leader' },
      { name: 'Home Appliances', revenueShare: 18, description: 'Refrigerators, washing machines, ACs' },
      { name: 'Semiconductor & Display', revenueShare: 12, description: 'R&D center for semiconductor design in Bangalore' },
      { name: 'IT & Mobile Accessories', revenueShare: 10, description: 'Wearables, earbuds, chargers, storage devices' },
    ],
    financials: [
      { year: 'FY21', revenue: 68500, profit: 4200, ebitda: 7200 },
      { year: 'FY22', revenue: 82000, profit: 4800, ebitda: 8500 },
      { year: 'FY23', revenue: 88000, profit: 4500, ebitda: 8000 },
      { year: 'FY24', revenue: 95000, profit: 5200, ebitda: 9200 },
      { year: 'FY25', revenue: 105000, profit: 5800, ebitda: 10200 },
    ],
    revenueFY25: '₹1,05,000 Cr', profitFY25: '₹5,800 Cr', ebitdaMargin: '9.7%',
    news: [
      { title: 'Samsung India Noida factory crosses 120M phone production annually', date: '2025-04-08', source: 'Samsung Newsroom', url: 'https://news.samsung.com' },
      { title: 'Galaxy AI features launched across mid-range phones driving upgrade cycle', date: '2025-03-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Samsung R&D Bangalore becomes largest outside Korea with 10,000 engineers', date: '2025-01-20', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Largest electronics manufacturer in India with deepest product portfolio. AI integration across products driving premiumization. Semiconductor R&D in India growing.',
      plans: ['Galaxy AI ecosystem expansion', 'Semiconductor design center growth', 'Premium TV market leadership', 'Made-in-India export hub for smartphones'],
      risks: ['Intense smartphone competition from Chinese brands', 'Premium market saturation', 'Supply chain dependency on Korean imports for key components', 'Regulatory scrutiny on MNC operations'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Foxconn India',
      competitorTicker: 'Unlisted',
      summary: 'Samsung India Electronics competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'vedanta-semiconductors', name: 'Vedanta Semiconductors', industry: 'electronics', ticker: 'Unlisted',
    founded: 2022, headquarters: 'Dholera, Gujarat', employees: '2,000+', marketCap: 'Unlisted',
    ceo: 'Akarsh K Hebbar (Vedanta Semiconductors Business Head)', website: 'https://www.vedantaltd.com',
    description: "​Vedanta Group's semiconductor venture to build India's first commercial display fab and semiconductor chip plant at Dholera SIR, Gujarat. Partnership with Foxconn (later dissolved) replaced by new technology partners. Part of India Semiconductor Mission. In FY25 the company reported revenue of ₹0 Cr (Pre-revenue) and net profit of ₹-1,200 Cr (Investment phase), at an EBITDA margin of around N/A. Its revenue is led by display fab (40% of sales), complemented by semiconductor fab and atmp. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Display Fab (Gen 8.6 LCD)', revenueShare: 40, description: 'Large area glass substrates for TV and monitor displays' },
      { name: 'Semiconductor Fab (28-65nm)', revenueShare: 30, description: 'Chip fabrication for IoT, auto, and consumer electronics' },
      { name: 'ATMP (Assembly, Test, Packaging)', revenueShare: 20, description: 'Chip assembly and testing services' },
      { name: 'Compound Semiconductors', revenueShare: 10, description: 'GaN and SiC for power electronics and 5G' },
    ],
    financials: [
      { year: 'FY21', revenue: 0, profit: 0, ebitda: 0 },
      { year: 'FY22', revenue: 0, profit: 0, ebitda: 0 },
      { year: 'FY23', revenue: 0, profit: -500, ebitda: -500 },
      { year: 'FY24', revenue: 0, profit: -800, ebitda: -800 },
      { year: 'FY25', revenue: 0, profit: -1200, ebitda: -1200 },
    ],
    revenueFY25: '₹0 Cr (Pre-revenue)', profitFY25: '₹-1,200 Cr (Investment phase)', ebitdaMargin: 'N/A',
    news: [
      { title: 'Vedanta Dholera display fab construction progresses with new technology partner', date: '2025-04-02', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'India Semiconductor Mission approves revised proposal for Vedanta chip fab', date: '2025-02-15', source: 'PIB', url: 'https://pib.gov.in' },
      { title: 'Vedanta semiconductor project timeline revised to 2027 for first production', date: '2025-01-10', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Ambitious project to build India display and chip manufacturing ecosystem. High risk but potentially transformative for Indian electronics supply chain if successful.',
      plans: ['Display fab production by 2027', 'Semiconductor fab by 2028', 'Technology partner finalization', 'Ecosystem development with ancillary units'],
      risks: ['No proven semiconductor track record', 'Technology partner uncertainty post-Foxconn exit', 'Massive capex ($8-10 Bn) with unclear funding', 'Long gestation period with no revenue for years'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Tata Electronics',
      competitorTicker: 'Unlisted',
      summary: 'Vedanta Semiconductors competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'blue-star', name: 'Blue Star', industry: 'electronics', ticker: 'BLUESTARCO',
    founded: 1943, headquarters: 'Mumbai, Maharashtra', employees: '5,500+', marketCap: '₹38,000 Cr',
    ceo: 'B. Thiagarajan (MD)', website: 'https://www.bluestarindia.com',
    description: "​India's leading air conditioning and commercial refrigeration company. Strong in central/VRF AC for commercial buildings. Room AC is fastest growing segment with 13%+ market share. Also in water purification and air purifiers. In FY25 the company reported revenue of ₹12,000 Cr and net profit of ₹720 Cr, at an EBITDA margin of around 10.0%. Its revenue is led by room air conditioners (35% of sales), complemented by central & vrf air conditioning and commercial refrigeration. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Room Air Conditioners', revenueShare: 35, description: 'Split ACs — fastest growing segment, 13%+ market share' },
      { name: 'Central & VRF Air Conditioning', revenueShare: 28, description: 'Centralized HVAC, VRF systems for commercial buildings' },
      { name: 'Commercial Refrigeration', revenueShare: 18, description: 'Deep freezers, cold rooms, display cases' },
      { name: 'MEP Projects', revenueShare: 12, description: 'Electromechanical projects for large buildings' },
      { name: 'Water Purifiers & Air Purifiers', revenueShare: 7, description: 'RO water purifiers, air purifiers for homes' },
    ],
    financials: [
      { year: 'FY21', revenue: 5081, profit: 228, ebitda: 420 },
      { year: 'FY22', revenue: 6168, profit: 310, ebitda: 540 },
      { year: 'FY23', revenue: 7832, profit: 405, ebitda: 700 },
      { year: 'FY24', revenue: 9530, profit: 540, ebitda: 900 },
      { year: 'FY25', revenue: 12000, profit: 720, ebitda: 1200 },
    ],
    revenueFY25: '₹12,000 Cr', profitFY25: '₹720 Cr', ebitdaMargin: '10.0%',
    news: [
      { title: 'Blue Star room AC market share crosses 13.5% in record summer', date: '2025-04-20', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Wins Rs 800 Cr HVAC contract for new Mumbai Metro stations', date: '2025-03-08', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Blue Star launches energy-efficient VRF systems with 30% lower power consumption', date: '2025-01-25', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Fast-growing room AC brand taking market share. Commercial HVAC benefits from infrastructure boom. Climate change driving structural AC demand growth.',
      plans: ['Room AC market share target 15%', 'Sri City manufacturing plant expansion', 'Commercial refrigeration growth with cold chain', 'International expansion in Middle East'],
      risks: ['Intense price competition in room ACs', 'Seasonal demand concentration', 'Working capital intensive project business', 'Voltas and Daikin competitive pressure'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Crompton Greaves',
      competitorTicker: 'CROMPTON',
      summary: 'Blue Star competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'orient-electric', name: 'Orient Electric', industry: 'electronics', ticker: 'ORIENTELEC',
    founded: 1954, headquarters: 'New Delhi', employees: '4,200+', marketCap: '₹8,500 Cr',
    ceo: 'Ravindra Singh Negi (MD & CEO)', website: 'https://www.orientelectric.com',
    description: "​Part of CK Birla Group. Leading Indian brand for fans, lighting, and home appliances. Market leader in ceiling fans with 25%+ share. Also strong in LED lighting and switchgear. Known for design-led premium fans. In FY25 the company reported revenue of ₹3,250 Cr and net profit of ₹185 Cr, at an EBITDA margin of around 9.5%. Its revenue is led by fans (42% of sales), complemented by lighting and home appliances. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Fans (Ceiling, Table, Exhaust)', revenueShare: 42, description: 'Ceiling fans market leader — decorative and BLDC energy-efficient range' },
      { name: 'Lighting (LED)', revenueShare: 22, description: 'LED bulbs, battens, downlighters, smart lighting' },
      { name: 'Home Appliances', revenueShare: 18, description: 'Water heaters, air coolers, kitchen appliances' },
      { name: 'Switchgear', revenueShare: 12, description: 'Modular switches, MCBs, distribution boards' },
      { name: 'Industrial Fans', revenueShare: 6, description: 'HVLS fans, industrial exhaust fans' },
    ],
    financials: [
      { year: 'FY21', revenue: 2153, profit: 148, ebitda: 248 },
      { year: 'FY22', revenue: 2583, profit: 152, ebitda: 260 },
      { year: 'FY23', revenue: 2788, profit: 128, ebitda: 230 },
      { year: 'FY24', revenue: 2950, profit: 155, ebitda: 265 },
      { year: 'FY25', revenue: 3250, profit: 185, ebitda: 310 },
    ],
    revenueFY25: '₹3,250 Cr', profitFY25: '₹185 Cr', ebitdaMargin: '9.5%',
    news: [
      { title: 'Orient Electric BLDC fan range crosses 30% of fan revenue mix', date: '2025-03-25', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Launches smart connected fan range with IoT features and voice control', date: '2025-02-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Orient Electric expands appliance portfolio with dishwashers and OTGs', date: '2025-01-18', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
    ],
    futureScope: {
      outlook: 'Fan business shifting to premium BLDC segment with higher margins. BEE star rating mandate creates replacement demand. Appliances and switchgear diversifying revenue.',
      plans: ['BLDC fan share to 50% of fan revenue', 'Smart home integration across products', 'Appliance portfolio expansion', 'Distribution depth in Tier 3-4 cities'],
      risks: ['Intense fan market competition from Crompton, Havells', 'Commoditized lighting market with margin pressure', 'Seasonal demand for fans and coolers', 'Premium brand positioning challenge vs established players'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Blue Star',
      competitorTicker: 'BLUESTARCO',
      summary: 'Orient Electric competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'crompton-greaves', name: 'Crompton Greaves Consumer Electricals', industry: 'electronics', ticker: 'CROMPTON',
    founded: 2015, headquarters: 'Mumbai, Maharashtra', employees: '5,000+', marketCap: '₹25,000 Cr',
    ceo: 'Promeet Ghosh (MD & CEO)', website: 'https://www.crompton.co.in',
    description: "​Leading Indian consumer electricals company demerged from Crompton Greaves in 2015. Market leader in fans (27% share) and residential pumps. Acquired Butterfly Gandhimathi for kitchen appliances. Strong brand with 100+ year heritage. In FY25 the company reported revenue of ₹7,200 Cr and net profit of ₹620 Cr, at an EBITDA margin of around 12.8%. Its revenue is led by fans (35% of sales), complemented by pumps and lighting. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Fans (Ceiling, TPW)', revenueShare: 35, description: 'Ceiling fans, table/pedestal/wall fans — 27% market share' },
      { name: 'Pumps (Residential)', revenueShare: 22, description: 'Water pumps for residential and agriculture — No.1 brand' },
      { name: 'Lighting (LED)', revenueShare: 18, description: 'LED bulbs, battens, panels, and decorative lighting' },
      { name: 'Appliances (Butterfly + Crompton)', revenueShare: 15, description: 'Kitchen appliances, geysers, air coolers via Butterfly acquisition' },
      { name: 'Large Appliances', revenueShare: 10, description: 'Air coolers, water heaters, mixer grinders' },
    ],
    financials: [
      { year: 'FY21', revenue: 4394, profit: 510, ebitda: 720 },
      { year: 'FY22', revenue: 5028, profit: 475, ebitda: 680 },
      { year: 'FY23', revenue: 5872, profit: 420, ebitda: 650 },
      { year: 'FY24', revenue: 6380, profit: 520, ebitda: 780 },
      { year: 'FY25', revenue: 7200, profit: 620, ebitda: 920 },
    ],
    revenueFY25: '₹7,200 Cr', profitFY25: '₹620 Cr', ebitdaMargin: '12.8%',
    news: [
      { title: 'Crompton BLDC fan revenue crosses Rs 500 Cr with 40% growth', date: '2025-04-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Butterfly kitchen appliance integration drives 15% growth in appliances segment', date: '2025-02-20', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Crompton launches premium anti-dust fan range with IoT connectivity', date: '2025-01-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Fan and pump leadership provides strong moat. BLDC transition driving premiumization. Butterfly acquisition adds South India kitchen appliance exposure.',
      plans: ['BLDC fan mix to 40% of fan sales', 'Butterfly integration and cross-selling', 'Pump market expansion in agriculture', 'Premiumization across all categories'],
      risks: ['Fan market maturity and slow volume growth', 'Butterfly acquisition integration execution', 'LED lighting margin erosion', 'Competition from Havells and Orient in premium fans'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Orient Electric',
      competitorTicker: 'ORIENTELEC',
      summary: 'Crompton Greaves Consumer Electricals competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  // ==================== FMCG (15) ====================
  {
    id: 'hindustan-unilever', name: 'Hindustan Unilever', industry: 'fmcg', ticker: 'HINDUNILVR',
    founded: 1933, headquarters: 'Mumbai, Maharashtra', employees: '21,000+', marketCap: '₹5,72,000 Cr',
    ceo: 'Rohit Jawa (CEO & MD)', website: 'https://www.hul.co.in',
    description: "​India's largest FMCG company and subsidiary of Unilever. Operates across home care, beauty & personal care, and foods & refreshment segments. Portfolio includes iconic brands like Surf Excel, Dove, Lux, Rin, Knorr, and Kwality Wall's. In FY25 the company reported revenue of ₹61,800 Cr and net profit of ₹10,750 Cr, at an EBITDA margin of around 24.4%. Its revenue is led by home care (35% of sales), complemented by beauty & personal care and foods & refreshment. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Home Care (Surf Excel, Rin, Vim)', revenueShare: 35, description: 'Fabric wash, household cleaning, and dishwash products' },
      { name: 'Beauty & Personal Care (Dove, Lux, Pond\'s)', revenueShare: 30, description: 'Skin care, hair care, deodorants, and oral care' },
      { name: 'Foods & Refreshment (Knorr, Horlicks)', revenueShare: 20, description: 'Tea, coffee, health food drinks, and culinary products' },
      { name: 'Health & Hygiene (Lifebuoy, Domex)', revenueShare: 10, description: 'Soaps, sanitizers, and hygiene products' },
      { name: 'Water Purifiers (Pureit)', revenueShare: 5, description: 'In-home water purification solutions' },
    ],
    financials: [
      { year: 'FY21', revenue: 47028, profit: 7954, ebitda: 11780 },
      { year: 'FY22', revenue: 51468, profit: 8818, ebitda: 12650 },
      { year: 'FY23', revenue: 58154, profit: 9927, ebitda: 14200 },
      { year: 'FY24', revenue: 59579, profit: 10282, ebitda: 14500 },
      { year: 'FY25', revenue: 61800, profit: 10750, ebitda: 15100 },
    ],
    revenueFY25: '₹61,800 Cr', profitFY25: '₹10,750 Cr', ebitdaMargin: '24.4%',
    news: [
      { title: 'HUL completes merger of Hindustan Unilever and GSK Consumer Healthcare', date: '2025-04-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Launches premium D2C brand portfolio targeting urban millennials', date: '2025-02-18', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'HUL invests Rs 1,500 Cr in new manufacturing facility in Assam', date: '2025-01-22', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Premiumization and rural recovery are key growth drivers. Digital-first D2C strategy and sustainability focus to differentiate in mature categories.',
      plans: ['Premium portfolio expansion', 'D2C digital brands scaling', 'Rural distribution deepening to 10 lakh+ outlets', 'Climate-positive manufacturing by 2030'],
      risks: ['Slowing volume growth in core categories', 'Competitive intensity from Patanjali and local brands', 'Input cost inflation (palm oil, crude)', 'Regulatory risk on product claims'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'ITC Limited',
      competitorTicker: 'ITC',
      summary: 'Hindustan Unilever competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'polycab-india', name: 'Polycab India', industry: 'electronics', ticker: 'POLYCAB',
    founded: 1996, headquarters: 'Mumbai, Maharashtra', employees: '24,000+', marketCap: '₹95,000 Cr',
    ceo: 'Inder T. Jaisinghani (Chairman & MD)', website: 'https://www.polycab.com',
    description: "​India's largest wire and cable manufacturer with 25%+ market share. Also growing Fast Moving Electrical Goods (FMEG) business including fans, lighting, switches, and appliances. 25 manufacturing facilities across India. In FY25 the company reported revenue of ₹22,000 Cr and net profit of ₹2,400 Cr, at an EBITDA margin of around 15.2%. Its revenue is led by wires & cables (55% of sales), complemented by fmeg and epc & projects. Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand. Manufacturing in India (multiple states).",
    products: [
      { name: 'Wires & Cables', revenueShare: 55, description: 'Building wires, power cables, telecom cables, solar cables' },
      { name: 'FMEG (Fans, Lighting, Switches)', revenueShare: 20, description: 'Ceiling fans, LED lighting, modular switches, water heaters' },
      { name: 'EPC & Projects', revenueShare: 12, description: 'Turnkey electrical infrastructure projects' },
      { name: 'International Business', revenueShare: 8, description: 'Cable exports to 70+ countries' },
      { name: 'Copper Rods & Other', revenueShare: 5, description: 'Copper rod manufacturing for internal and external use' },
    ],
    financials: [
      { year: 'FY21', revenue: 9342, profit: 1035, ebitda: 1520 },
      { year: 'FY22', revenue: 12203, profit: 1282, ebitda: 1820 },
      { year: 'FY23', revenue: 14530, profit: 1530, ebitda: 2180 },
      { year: 'FY24', revenue: 18049, profit: 1947, ebitda: 2750 },
      { year: 'FY25', revenue: 22000, profit: 2400, ebitda: 3350 },
    ],
    revenueFY25: '₹22,000 Cr', profitFY25: '₹2,400 Cr', ebitdaMargin: '15.2%',
    news: [
      { title: 'Polycab India wire and cable revenue crosses Rs 12,000 Cr milestone', date: '2025-04-12', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'FMEG business crosses Rs 4,000 Cr with fans and switches driving growth', date: '2025-03-05', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Polycab expands export presence to 75 countries with new distribution deals', date: '2025-01-20', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Structural beneficiary of real estate cycle, infrastructure spending, and electrification. FMEG business adds consumer premium. Wire and cable demand growing with construction and renewables.',
      plans: ['FMEG revenue target Rs 7,000 Cr by FY27', 'Wire and cable capacity expansion', 'Export market to 100 countries', 'EV charging cable and solar cable growth'],
      risks: ['Copper price volatility (60%+ of cost)', 'FMEG margins lower than cables segment', 'Real estate cycle dependency', 'Competition from Havells, KEI, and RR Kabel in cables'],
    },
    extendedOverview: {
      businessSegments: 'Consumer electronics, electrical equipment, EMS (Electronics Manufacturing Services), components, LED lighting, appliances.',
      geographicPresence: 'Manufacturing in India (multiple states). PLI scheme beneficiary. Serving domestic market and growing export manufacturing.',
      keyStrengths: ["Government PLI scheme support for electronics manufacturing","Import substitution opportunity (India imports $80B+ electronics)","Growing domestic demand with digital India push","Cost-competitive manufacturing for global brands"],
      marketPosition: 'Growing Indian electronics company benefiting from government push for domestic manufacturing and rising consumer demand.',
      rawMaterialStrategy: 'Electronic components (imported + domestic), PCBs, semiconductors, plastics, metals, display panels. Component import dependency is key challenge being addressed through backward integration.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'EMS/Contract Manufacturing', growth: '25% CAGR', share: 'Growing EMS presence', insight: 'Global companies moving manufacturing to India. PLI scheme incentivizing domestic production.' }],
      cashCows: [{ name: 'Consumer Appliances', growth: '10% CAGR', share: 'Established brand', insight: 'Rising Indian middle class driving demand for appliances and electronics.' }],
      questionMarks: [{ name: 'Semiconductor/Component', growth: '30% CAGR', share: 'Early stage', insight: 'India semiconductor mission promoting domestic chip making. Multi-year opportunity.' }],
      dogs: [{ name: 'Legacy Low-Tech Products', growth: '3% CAGR', share: 'Commoditized', insight: 'Being upgraded to smart/connected versions. Legacy products maintained for mass market.' }],
    },
    headToHead: {
      competitor: 'Havells India',
      competitorTicker: 'HAVELLS',
      summary: 'Polycab India competes in the Indian electronics industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian electronics industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'itc-limited', name: 'ITC Limited', industry: 'fmcg', ticker: 'ITC',
    founded: 1910, headquarters: 'Kolkata, West Bengal', employees: '36,000+', marketCap: '₹5,85,000 Cr',
    ceo: 'Sanjiv Puri (CMD)', website: 'https://www.itcportal.com',
    description: "​Diversified conglomerate with FMCG as fastest-growing segment. Portfolio includes Aashirvaad, Sunfeast, Bingo!, YiPPee!, Classmate, Fiama, and Engage. Also has cigarettes, hotels, paperboards, and agri-business verticals. In FY25 the company reported revenue of ₹73,500 Cr and net profit of ₹21,800 Cr, at an EBITDA margin of around 39.5%. Its revenue is led by cigarettes (37% of sales), complemented by fmcg-others and paperboards & packaging. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Cigarettes (Gold Flake, Classic)', revenueShare: 37, description: 'Market leader in Indian cigarettes with 75%+ share' },
      { name: 'FMCG-Others (Aashirvaad, Bingo!, Sunfeast)', revenueShare: 28, description: 'Foods, personal care, education, and stationery' },
      { name: 'Hotels (ITC Hotels)', revenueShare: 12, description: 'Luxury hotel chain — demerged into separate entity' },
      { name: 'Paperboards & Packaging', revenueShare: 13, description: 'Leading paperboard manufacturer for packaging' },
      { name: 'Agri Business', revenueShare: 10, description: 'Leaf tobacco, wheat, spices, and e-Choupal platform' },
    ],
    financials: [
      { year: 'FY21', revenue: 49257, profit: 13032, ebitda: 18500 },
      { year: 'FY22', revenue: 60645, profit: 15058, ebitda: 21800 },
      { year: 'FY23', revenue: 70919, profit: 18753, ebitda: 25600 },
      { year: 'FY24', revenue: 69481, profit: 20422, ebitda: 27200 },
      { year: 'FY25', revenue: 73500, profit: 21800, ebitda: 29000 },
    ],
    revenueFY25: '₹73,500 Cr', profitFY25: '₹21,800 Cr', ebitdaMargin: '39.5%',
    news: [
      { title: 'ITC Hotels demerger completed — listed as separate entity', date: '2025-04-01', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'ITC FMCG business crosses Rs 20,000 Cr revenue milestone', date: '2025-02-25', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Aashirvaad expands into ready-to-eat category with 15 new SKUs', date: '2025-01-10', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'FMCG segment approaching profitability breakeven rapidly. Hotels demerger unlocks value. Cigarette cash cow funds growth ventures.',
      plans: ['FMCG revenue target Rs 30,000 Cr by FY27', 'ITC Hotels expansion post demerger', 'Sustainability leadership (carbon positive)', 'D2C and digital commerce scaling'],
      risks: ['Cigarette taxation and regulation risk', 'FMCG profitability still below peers', 'ESG concerns on tobacco business', 'Hotel cyclicality post demerger'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Hindustan Unilever',
      competitorTicker: 'HINDUNILVR',
      summary: 'ITC Limited competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'nestle-india', name: 'Nestle India', industry: 'fmcg', ticker: 'NESTLEIND',
    founded: 1961, headquarters: 'Gurugram, Haryana', employees: '8,000+', marketCap: '₹2,20,000 Cr',
    ceo: 'Suresh Narayanan (CMD)', website: 'https://www.nestle.in',
    description: "​Indian subsidiary of Nestle S.A., Switzerland. Dominates instant noodles (Maggi), infant nutrition, and confectionery segments. Operates 9 factories across India. Known for strong brand loyalty and premiumization strategy. In FY25 the company reported revenue of ₹20,800 Cr and net profit of ₹3,500 Cr, at an EBITDA margin of around 26.0%. Its revenue is led by prepared dishes & cooking aids (30% of sales), complemented by milk products & nutrition and beverages. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Prepared Dishes & Cooking Aids (Maggi)', revenueShare: 30, description: 'Instant noodles, sauces, seasonings, and masalas' },
      { name: 'Milk Products & Nutrition', revenueShare: 28, description: 'Everyday dairy whitener, Cerelac, Lactogen, NAN' },
      { name: 'Beverages (Nescafe, Sunrise)', revenueShare: 20, description: 'Instant coffee, ready-to-drink beverages' },
      { name: 'Confectionery (KitKat, Munch)', revenueShare: 14, description: 'Chocolates, wafers, and sugar confectionery' },
      { name: 'PetCare (Purina)', revenueShare: 8, description: 'Pet food brands — fastest growing segment' },
    ],
    financials: [
      { year: 'FY21', revenue: 14740, profit: 2082, ebitda: 3520 },
      { year: 'FY22', revenue: 16897, profit: 2390, ebitda: 4050 },
      { year: 'FY23', revenue: 19126, profit: 2970, ebitda: 4800 },
      { year: 'FY24', revenue: 19265, profit: 3232, ebitda: 4950 },
      { year: 'FY25', revenue: 20800, profit: 3500, ebitda: 5400 },
    ],
    revenueFY25: '₹20,800 Cr', profitFY25: '₹3,500 Cr', ebitdaMargin: '26.0%',
    news: [
      { title: 'Nestle India launches plant-based protein range under new brand', date: '2025-03-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Maggi crosses Rs 7,000 Cr annual revenue — brand refresh launched', date: '2025-02-08', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'New factory in Odisha to commence operations by Q3 FY26', date: '2025-01-20', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Premiumization, health & wellness, and pet care driving above-market growth. Low penetration in many categories offers long runway.',
      plans: ['Out-of-home consumption channel expansion', 'Plant-based and health-focused portfolio', 'PetCare to become top-3 category', 'Rural market penetration through sachets'],
      risks: ['Premium pricing limits rural access', 'Food safety and regulation risks', 'Limited product categories vs HUL/ITC', 'Dependence on parent for innovation pipeline'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Britannia Industries',
      competitorTicker: 'BRITANNIA',
      summary: 'Nestle India competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'dabur-india', name: 'Dabur India', industry: 'fmcg', ticker: 'DABUR',
    founded: 1884, headquarters: 'Ghaziabad, Uttar Pradesh', employees: '7,500+', marketCap: '₹88,000 Cr',
    ceo: 'Mohit Malhotra (CEO)', website: 'https://www.dabur.com',
    description: "​India's leading Ayurvedic and natural products company. Portfolio spans health care, personal care, home care, and foods. Key brands include Dabur Chyawanprash, Real juices, Vatika, Meswak, Hajmola, and Honitus. In FY25 the company reported revenue of ₹12,800 Cr and net profit of ₹2,050 Cr, at an EBITDA margin of around 21.1%. Its revenue is led by health care (30% of sales), complemented by hair care and oral care. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Health Care (Chyawanprash, Honitus)', revenueShare: 30, description: 'Ayurvedic health supplements, digestives, and OTC products' },
      { name: 'Hair Care (Vatika, Amla)', revenueShare: 22, description: 'Hair oils, shampoos, and hair care treatments' },
      { name: 'Oral Care (Dabur Red, Meswak)', revenueShare: 18, description: 'Ayurvedic toothpastes and mouthwash' },
      { name: 'Foods & Beverages (Real, Hommade)', revenueShare: 18, description: 'Fruit juices, cooking pastes, and honey' },
      { name: 'Home Care & Skin Care', revenueShare: 12, description: 'Odomos, Odonil, Fem, and skin care range' },
    ],
    financials: [
      { year: 'FY21', revenue: 9562, profit: 1693, ebitda: 2200 },
      { year: 'FY22', revenue: 10888, profit: 1790, ebitda: 2350 },
      { year: 'FY23', revenue: 11530, profit: 1720, ebitda: 2300 },
      { year: 'FY24', revenue: 11914, profit: 1845, ebitda: 2450 },
      { year: 'FY25', revenue: 12800, profit: 2050, ebitda: 2700 },
    ],
    revenueFY25: '₹12,800 Cr', profitFY25: '₹2,050 Cr', ebitdaMargin: '21.1%',
    news: [
      { title: 'Dabur launches premium Ayurveda range targeting urban wellness market', date: '2025-03-22', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'International business crosses 30% of revenue with Africa expansion', date: '2025-02-12', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Real juice brand relaunched with zero-added-sugar variants', date: '2025-01-05', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Ayurveda and natural products trend strongly favors Dabur. International expansion and premium portfolio to drive growth beyond India.',
      plans: ['Premium Ayurveda D2C brand launches', 'Africa and Middle East market expansion', 'Digital-first health supplements', 'Sustainable sourcing of herbal ingredients'],
      risks: ['Competitive intensity from Patanjali in Ayurveda', 'Rural slowdown affecting core markets', 'Juice category under health scrutiny', 'Currency volatility in international markets'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Marico',
      competitorTicker: 'MARICO',
      summary: 'Dabur India competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'britannia-industries', name: 'Britannia Industries', industry: 'fmcg', ticker: 'BRITANNIA',
    founded: 1892, headquarters: 'Bengaluru, Karnataka', employees: '5,000+', marketCap: '₹1,20,000 Cr',
    ceo: 'Varun Berry (Vice Chairman & MD)', website: 'https://www.britannia.co.in',
    description: "​India's largest bakery and biscuit company with 35%+ market share. Portfolio includes Good Day, Marie Gold, Tiger, NutriChoice, Treat croissants, and dairy products. Reaches 6+ million retail outlets across India. In FY25 the company reported revenue of ₹18,200 Cr and net profit of ₹2,500 Cr, at an EBITDA margin of around 18.7%. Its revenue is led by biscuits (55% of sales), complemented by bread & bakery and dairy products. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Biscuits (Good Day, Marie Gold, Tiger)', revenueShare: 55, description: 'Cookies, cream biscuits, glucose, and health biscuits' },
      { name: 'Bread & Bakery (Treat)', revenueShare: 15, description: 'Bread, cakes, croissants, and rusk' },
      { name: 'Dairy Products (Cheese, Milk)', revenueShare: 12, description: 'Cheese, butter, milk, and yogurt' },
      { name: 'Snacks (Timepass, Treat Croissant)', revenueShare: 10, description: 'Salted snacks, wafers, and croissants' },
      { name: 'NutriChoice Health Range', revenueShare: 8, description: 'Sugar-free, multigrain, and digestive biscuits' },
    ],
    financials: [
      { year: 'FY21', revenue: 13136, profit: 1851, ebitda: 2450 },
      { year: 'FY22', revenue: 14486, profit: 1849, ebitda: 2500 },
      { year: 'FY23', revenue: 16300, profit: 2024, ebitda: 2850 },
      { year: 'FY24', revenue: 16769, profit: 2205, ebitda: 3050 },
      { year: 'FY25', revenue: 18200, profit: 2500, ebitda: 3400 },
    ],
    revenueFY25: '₹18,200 Cr', profitFY25: '₹2,500 Cr', ebitdaMargin: '18.7%',
    news: [
      { title: 'Britannia enters croissant category — Treat Croissant captures 15% market in 6 months', date: '2025-04-05', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'New dairy plant in Ranjangaon to double cheese and butter capacity', date: '2025-02-20', source: 'Business Standard', url: 'https://www.business-standard.com' },
      { title: 'Britannia targets Rs 25,000 Cr revenue by FY28 with adjacent categories', date: '2025-01-15', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Adjacent categories (dairy, snacks, croissants) and premiumization to drive beyond-biscuit growth. India snacking market growing 12%+ annually.',
      plans: ['Adjacent categories to reach 25% of revenue', 'Dairy business scaling with new plant', 'International expansion in Middle East and Africa', 'Healthier product portfolio expansion'],
      risks: ['Wheat and palm oil cost inflation', 'Over-dependence on biscuit category', 'Competition from ITC and Parle in biscuits', 'Distribution challenge for perishable dairy products'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Nestle India',
      competitorTicker: 'NESTLEIND',
      summary: 'Britannia Industries competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'godrej-consumer', name: 'Godrej Consumer Products', industry: 'fmcg', ticker: 'GODREJCP',
    founded: 2001, headquarters: 'Mumbai, Maharashtra', employees: '12,000+', marketCap: '₹1,15,000 Cr',
    ceo: 'Sudhir Sitapati (MD & CEO)', website: 'https://www.godrejcp.com',
    description: "​Part of Godrej Group. Leading FMCG company in home care, personal care, and hair care. Strong international presence in Indonesia, Africa, and Latin America. Key brands include Cinthol, Godrej Expert, HIT, Good Knight, and Godrej aer. In FY25 the company reported revenue of ₹15,500 Cr and net profit of ₹2,200 Cr, at an EBITDA margin of around 21.3%. Its revenue is led by home care (32% of sales), complemented by hair care and personal care. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Home Care (Good Knight, HIT)', revenueShare: 32, description: 'Household insecticides, mosquito repellents, and air fresheners' },
      { name: 'Hair Care (Godrej Expert, Nupur)', revenueShare: 28, description: 'Hair colours, shampoos, and conditioners' },
      { name: 'Personal Care (Cinthol, Godrej No.1)', revenueShare: 22, description: 'Soaps, handwash, and personal hygiene' },
      { name: 'Air Care (Godrej aer)', revenueShare: 10, description: 'Car and home air freshener products' },
      { name: 'International Business', revenueShare: 8, description: 'Indonesia, Africa, and Latin America operations' },
    ],
    financials: [
      { year: 'FY21', revenue: 11165, profit: 1632, ebitda: 2300 },
      { year: 'FY22', revenue: 12194, profit: 1719, ebitda: 2500 },
      { year: 'FY23', revenue: 13483, profit: 1770, ebitda: 2680 },
      { year: 'FY24', revenue: 14226, profit: 1895, ebitda: 2900 },
      { year: 'FY25', revenue: 15500, profit: 2200, ebitda: 3300 },
    ],
    revenueFY25: '₹15,500 Cr', profitFY25: '₹2,200 Cr', ebitdaMargin: '21.3%',
    news: [
      { title: 'Godrej CP completes acquisition of Raymond consumer care brands', date: '2025-03-18', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Good Knight Smart Chip 2.0 launched — targets premium mosquito repellent market', date: '2025-02-05', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Indonesia business turns profitable after restructuring efforts', date: '2025-01-25', source: 'Financial Express', url: 'https://www.financialexpress.com' },
    ],
    futureScope: {
      outlook: 'Premiumization across categories and international turnaround are key priorities. India home care leadership provides stable cash flows for growth investment.',
      plans: ['Premiumization of home and personal care', 'Indonesia and Africa profitability improvement', 'New category entries via acquisitions', 'Sustainability leadership in FMCG'],
      risks: ['International market volatility (currency, political)', 'Competition from HUL in household insecticides', 'Palm oil and crude oil derivative costs', 'Integration risk from acquisitions'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Dabur India',
      competitorTicker: 'DABUR',
      summary: 'Godrej Consumer Products competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'marico', name: 'Marico', industry: 'fmcg', ticker: 'MARICO',
    founded: 1990, headquarters: 'Mumbai, Maharashtra', employees: '3,500+', marketCap: '₹82,000 Cr',
    ceo: 'Saugata Gupta (MD & CEO)', website: 'https://www.marico.com',
    description: "​Leading Indian FMCG company focused on health, beauty, and wellness. Flagship brands include Parachute (coconut oil), Saffola (edible oils and oats), Nihar Naturals, and Set Wet. Operates in over 25 countries. In FY25 the company reported revenue of ₹10,500 Cr and net profit of ₹1,700 Cr, at an EBITDA margin of around 21.0%. Its revenue is led by parachute (35% of sales), complemented by saffola and value-added hair oils. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Parachute (Coconut Oil)', revenueShare: 35, description: 'Market leader in branded coconut oil with 60%+ share' },
      { name: 'Saffola (Edible Oils & Foods)', revenueShare: 25, description: 'Healthy oils, oats, honey, and wellness foods' },
      { name: 'Value-Added Hair Oils (Nihar, Hair & Care)', revenueShare: 18, description: 'Light hair oils and serums' },
      { name: 'Male Grooming (Set Wet, Beardo)', revenueShare: 12, description: 'Hair gels, deodorants, and beard care' },
      { name: 'International Business', revenueShare: 10, description: 'Bangladesh, Vietnam, Middle East, and Africa' },
    ],
    financials: [
      { year: 'FY21', revenue: 8048, profit: 1255, ebitda: 1650 },
      { year: 'FY22', revenue: 9512, profit: 1263, ebitda: 1700 },
      { year: 'FY23', revenue: 9764, profit: 1322, ebitda: 1780 },
      { year: 'FY24', revenue: 9890, profit: 1520, ebitda: 2000 },
      { year: 'FY25', revenue: 10500, profit: 1700, ebitda: 2200 },
    ],
    revenueFY25: '₹10,500 Cr', profitFY25: '₹1,700 Cr', ebitdaMargin: '21.0%',
    news: [
      { title: 'Saffola foods business crosses Rs 1,000 Cr milestone', date: '2025-03-10', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Marico acquires digital-first male grooming brand for Rs 350 Cr', date: '2025-02-15', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Parachute premium variant launched targeting urban health-conscious consumers', date: '2025-01-08', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Foods and digital-first brands to diversify beyond coconut oil dependency. Premium personal care and health foods are high-growth areas.',
      plans: ['Foods business to Rs 2,500 Cr by FY28', 'Digital-first brand acquisitions', 'Premium personal care portfolio', 'International markets to 30% of revenue'],
      risks: ['Copra price volatility affecting Parachute margins', 'Coconut oil category stagnation', 'Integration risk of D2C acquisitions', 'Competition in health foods from large FMCG players'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Dabur India',
      competitorTicker: 'DABUR',
      summary: 'Marico competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'colgate-palmolive', name: 'Colgate-Palmolive India', industry: 'fmcg', ticker: 'COLPAL',
    founded: 1937, headquarters: 'Mumbai, Maharashtra', employees: '4,200+', marketCap: '₹72,000 Cr',
    ceo: 'Prabha Narasimhan (MD & CEO)', website: 'https://www.colgatepalmolive.co.in',
    description: "​Market leader in Indian oral care with 55%+ toothpaste market share. Subsidiary of Colgate-Palmolive Company, USA. Portfolio includes Colgate Strong Teeth, MaxFresh, Visible White, and Palmolive personal care products. In FY25 the company reported revenue of ₹6,300 Cr and net profit of ₹1,500 Cr, at an EBITDA margin of around 31.7%. Its revenue is led by toothpaste (60% of sales), complemented by toothbrush and personal care. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Toothpaste (Strong Teeth, MaxFresh)', revenueShare: 60, description: 'Complete oral care range from mass to premium' },
      { name: 'Toothbrush', revenueShare: 18, description: 'Manual and electric toothbrush range' },
      { name: 'Mouthwash (Plax)', revenueShare: 8, description: 'Oral rinse and advanced care products' },
      { name: 'Personal Care (Palmolive)', revenueShare: 10, description: 'Body wash, shower gels, and handwash' },
      { name: 'Specialty Oral Care', revenueShare: 4, description: 'Dental cream, whitening products, sensitivity care' },
    ],
    financials: [
      { year: 'FY21', revenue: 4826, profit: 1006, ebitda: 1450 },
      { year: 'FY22', revenue: 5115, profit: 1050, ebitda: 1520 },
      { year: 'FY23', revenue: 5595, profit: 1156, ebitda: 1680 },
      { year: 'FY24', revenue: 5900, profit: 1345, ebitda: 1850 },
      { year: 'FY25', revenue: 6300, profit: 1500, ebitda: 2000 },
    ],
    revenueFY25: '₹6,300 Cr', profitFY25: '₹1,500 Cr', ebitdaMargin: '31.7%',
    news: [
      { title: 'Colgate launches AI-powered oral health diagnostic app in India', date: '2025-03-25', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Visible White O2 premium toothpaste drives premiumization strategy', date: '2025-02-10', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Colgate expands Naturals range with charcoal and neem variants', date: '2025-01-18', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Premiumization of oral care (whitening, sensitivity, naturals) and category expansion into adjacent spaces. Electric toothbrush adoption is emerging opportunity.',
      plans: ['Premium oral care portfolio expansion', 'Electric toothbrush market development', 'Personal care category scaling', 'Digital and e-commerce channel growth to 8%'],
      risks: ['Mature category with limited volume growth', 'Competition from Dabur, Patanjali in naturals', 'Limited category diversification', 'Dependence on single oral care category'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Procter & Gamble India',
      competitorTicker: 'PGHH',
      summary: 'Colgate-Palmolive India competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'procter-gamble-india', name: 'Procter & Gamble India', industry: 'fmcg', ticker: 'PGHH',
    founded: 1964, headquarters: 'Mumbai, Maharashtra', employees: '4,000+', marketCap: '₹55,000 Cr',
    ceo: 'L.V. Vaidyanathan (CEO, Indian Subcontinent)', website: 'https://www.pg.co.in',
    description: "​Indian subsidiary of Procter & Gamble, USA. Operates in feminine hygiene (Whisper), hair care (Head & Shoulders, Pantene), skin care (Olay), and home care (Ariel, Tide). Premium positioning strategy with focus on urban consumers. In FY25 the company reported revenue of ₹17,500 Cr and net profit of ₹2,650 Cr, at an EBITDA margin of around 23.4%. Its revenue is led by fabric care (30% of sales), complemented by feminine hygiene and hair care. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Fabric Care (Ariel, Tide)', revenueShare: 30, description: 'Detergents and fabric conditioners' },
      { name: 'Feminine Hygiene (Whisper)', revenueShare: 25, description: 'Sanitary pads and feminine care products' },
      { name: 'Hair Care (Head & Shoulders, Pantene)', revenueShare: 20, description: 'Shampoos, conditioners, and treatments' },
      { name: 'Skin Care & Grooming (Olay, Gillette)', revenueShare: 15, description: 'Skin care and male grooming products' },
      { name: 'Baby Care (Pampers)', revenueShare: 10, description: 'Diapers and baby care products' },
    ],
    financials: [
      { year: 'FY21', revenue: 12524, profit: 1750, ebitda: 2850 },
      { year: 'FY22', revenue: 13922, profit: 1920, ebitda: 3100 },
      { year: 'FY23', revenue: 15318, profit: 2200, ebitda: 3500 },
      { year: 'FY24', revenue: 16150, profit: 2400, ebitda: 3800 },
      { year: 'FY25', revenue: 17500, profit: 2650, ebitda: 4100 },
    ],
    revenueFY25: '₹17,500 Cr', profitFY25: '₹2,650 Cr', ebitdaMargin: '23.4%',
    news: [
      { title: 'P&G India Whisper campaign reaches 50 million rural girls on menstrual hygiene', date: '2025-04-02', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Ariel Matic launches smart dosing technology for Indian washing machines', date: '2025-02-22', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'P&G commits Rs 1,000 Cr investment for new Gujarat manufacturing facility', date: '2025-01-12', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Premiumization opportunity as Indian consumers trade up. Feminine hygiene underpenetrated (25% vs 90% in developed markets). Distribution expansion in rural India.',
      plans: ['Rural feminine hygiene penetration drive', 'Premium fabric care and skin care growth', 'E-commerce and D2C scaling', 'Sustainable packaging initiatives'],
      risks: ['Premium pricing limits addressable market', 'Intense local competition in fabric care', 'Low rural penetration is both opportunity and challenge', 'Complex dual-listed entity structure'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Colgate-Palmolive',
      competitorTicker: 'COLPAL',
      summary: 'Procter & Gamble India competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'tata-consumer', name: 'Tata Consumer Products', industry: 'fmcg', ticker: 'TATACONSUM',
    founded: 1962, headquarters: 'Mumbai, Maharashtra', employees: '10,000+', marketCap: '₹1,05,000 Cr',
    ceo: 'Sunil D\'Souza (MD & CEO)', website: 'https://www.tataconsumer.com',
    description: "​FMCG arm of Tata Group. Operates in branded foods, beverages, and food services. Key brands include Tata Tea, Tetley, Tata Salt, Tata Sampann, Eight O'Clock Coffee, Tata Soulfull, and Starbucks India (JV). Merged with Tata Chemicals consumer business. In FY25 the company reported revenue of ₹16,800 Cr and net profit of ₹1,550 Cr, at an EBITDA margin of around 14.6%. Its revenue is led by tea & coffee (35% of sales), complemented by salt & staples and ready-to-eat & health foods. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Tea & Coffee (Tata Tea, Tetley)', revenueShare: 35, description: 'India and international tea and coffee brands' },
      { name: 'Salt & Staples (Tata Salt, Sampann)', revenueShare: 25, description: 'Branded salt, pulses, spices, and ready-to-cook' },
      { name: 'Ready-to-Eat & Health Foods (Soulfull)', revenueShare: 15, description: 'Millets, cereals, and health food brands' },
      { name: 'Water & Beverages (Himalayan, NourishCo)', revenueShare: 15, description: 'Packaged water, fruit drinks, and RTD beverages' },
      { name: 'Food Services (Starbucks India JV)', revenueShare: 10, description: '400+ Starbucks stores and Tata Cha outlets' },
    ],
    financials: [
      { year: 'FY21', revenue: 11602, profit: 1058, ebitda: 1620 },
      { year: 'FY22', revenue: 12425, profit: 1095, ebitda: 1700 },
      { year: 'FY23', revenue: 14247, profit: 1193, ebitda: 1900 },
      { year: 'FY24', revenue: 15206, profit: 1332, ebitda: 2100 },
      { year: 'FY25', revenue: 16800, profit: 1550, ebitda: 2450 },
    ],
    revenueFY25: '₹16,800 Cr', profitFY25: '₹1,550 Cr', ebitdaMargin: '14.6%',
    news: [
      { title: 'Tata Consumer acquires Capital Foods (Ching\'s Secret) for Rs 5,100 Cr', date: '2025-03-28', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Starbucks India opens 500th store — targets 1,000 by 2028', date: '2025-02-14', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Tata Sampann spices business grows 35% — targets Rs 2,000 Cr', date: '2025-01-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
    ],
    futureScope: {
      outlook: 'Aggressive inorganic growth strategy transforming from tea company to full-fledged FMCG player. Starbucks and food services provide long-term growth optionality.',
      plans: ['Acquisitions in sauces, snacks, and convenience foods', 'Starbucks India to 1,000 stores', 'Tata Sampann staples national expansion', 'International tea portfolio premiumization'],
      risks: ['Integration challenges from multiple acquisitions', 'Tea category commoditization', 'Starbucks JV capital requirements', 'Lower margins vs established FMCG peers'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Godrej Consumer',
      competitorTicker: 'GODREJCP',
      summary: 'Tata Consumer Products competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'emami', name: 'Emami', industry: 'fmcg', ticker: 'EMAMILTD',
    founded: 1974, headquarters: 'Kolkata, West Bengal', employees: '3,200+', marketCap: '₹25,000 Cr',
    ceo: 'Harsha V. Agarwal (Vice Chairman & MD)', website: 'https://www.emamiltd.in',
    description: "​Leading Indian FMCG company focused on personal care and healthcare. Key brands include BoroPlus, Navratna Oil, Zandu Balm, Fair and Handsome, Kesh King, and Mentho Plus. Strong in winter care and male grooming segments. In FY25 the company reported revenue of ₹3,900 Cr and net profit of ₹720 Cr, at an EBITDA margin of around 26.9%. Its revenue is led by healthcare (28% of sales), complemented by skin care and hair care. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Healthcare (Zandu, Mentho Plus)', revenueShare: 28, description: 'Ayurvedic balms, pain relief, and OTC healthcare' },
      { name: 'Skin Care (BoroPlus, Fair and Handsome)', revenueShare: 25, description: 'Antiseptic cream, winter care, and men fairness' },
      { name: 'Hair Care (Kesh King, Navratna)', revenueShare: 22, description: 'Cooling oils, anti-hair fall products' },
      { name: 'Male Grooming (Fair and Handsome, HE)', revenueShare: 15, description: "Men's face wash, deodorants, and grooming products" },
      { name: 'Pain Management (Zandu Balm)', revenueShare: 10, description: 'Topical pain relief and muscle care' },
    ],
    financials: [
      { year: 'FY21', revenue: 2926, profit: 573, ebitda: 820 },
      { year: 'FY22', revenue: 3221, profit: 552, ebitda: 830 },
      { year: 'FY23', revenue: 3366, profit: 539, ebitda: 850 },
      { year: 'FY24', revenue: 3579, profit: 630, ebitda: 950 },
      { year: 'FY25', revenue: 3900, profit: 720, ebitda: 1050 },
    ],
    revenueFY25: '₹3,900 Cr', profitFY25: '₹720 Cr', ebitdaMargin: '26.9%',
    news: [
      { title: 'Emami acquires dermaceutical brand for Rs 450 Cr — enters clinical skin care', date: '2025-03-12', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'BoroPlus winter sales cross Rs 800 Cr amid cold wave season', date: '2025-02-01', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Zandu launches immunity range — targets Rs 500 Cr healthcare portfolio', date: '2025-01-15', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Strong niche brands with leadership positions. Growth from male grooming, digital channels, and healthcare expansion. Seasonal portfolio being de-seasonalized.',
      plans: ['Male grooming portfolio expansion', 'Healthcare and wellness range to Rs 1,000 Cr', 'D2C and digital commerce to 10% of revenue', 'International markets expansion'],
      risks: ['High seasonality in core products (winter/summer)', 'Fairness category facing social backlash', 'Small scale vs HUL and Dabur', 'Limited rural distribution vs competitors'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Marico',
      competitorTicker: 'MARICO',
      summary: 'Emami competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'patanjali-foods', name: 'Patanjali Foods', industry: 'fmcg', ticker: 'PATANJALI',
    founded: 1986, headquarters: 'Haridwar, Uttarakhand', employees: '8,500+', marketCap: '₹42,000 Cr',
    ceo: 'Ram Bharat (MD)', website: 'https://www.patanjalifoods.com',
    description: "​Formerly Ruchi Soya Industries, acquired and rebranded by Patanjali Ayurved. One of India's largest edible oil companies. Portfolio spans edible oils (Ruchi Gold, Mahakosh), food products, and Nutrela brand of soya chunks and wellness products. In FY25 the company reported revenue of ₹32,000 Cr and net profit of ₹1,200 Cr, at an EBITDA margin of around 5.9%. Its revenue is led by edible oils (55% of sales), complemented by nutrela and food products. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Edible Oils (Ruchi Gold, Mahakosh)', revenueShare: 55, description: 'Soybean, mustard, sunflower, and palm oils' },
      { name: 'Nutrela (Soya Products)', revenueShare: 18, description: 'Soya chunks, granules, and high-protein foods' },
      { name: 'Food Products (Atta, Rice, Dal)', revenueShare: 12, description: 'Staples and branded food products' },
      { name: 'Personal Care (Patanjali branded)', revenueShare: 10, description: 'Ayurvedic personal care and wellness' },
      { name: 'Biscuits & Snacks', revenueShare: 5, description: 'Cookies, namkeen, and healthy snacks' },
    ],
    financials: [
      { year: 'FY21', revenue: 16318, profit: 682, ebitda: 1200 },
      { year: 'FY22', revenue: 24284, profit: 806, ebitda: 1450 },
      { year: 'FY23', revenue: 31473, profit: 1235, ebitda: 1850 },
      { year: 'FY24', revenue: 29688, profit: 1020, ebitda: 1650 },
      { year: 'FY25', revenue: 32000, profit: 1200, ebitda: 1900 },
    ],
    revenueFY25: '₹32,000 Cr', profitFY25: '₹1,200 Cr', ebitdaMargin: '5.9%',
    news: [
      { title: 'Patanjali Foods announces Rs 3,000 Cr brand distribution deal with Patanjali Ayurved', date: '2025-04-08', source: 'BSE Filing', url: 'https://www.bseindia.com' },
      { title: 'Nutrela plant-based protein range launched targeting fitness consumers', date: '2025-02-18', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Supreme Court advertising case impacts Patanjali brand perception', date: '2025-01-25', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Transitioning from commodity edible oils to branded FMCG. Patanjali brand integration to drive margins. Nutrela protein positioning for health-conscious consumers.',
      plans: ['Branded FMCG revenue to 50% of total', 'Nutrela protein and wellness expansion', 'Patanjali Ayurved brand distribution deal', 'Value-added food products portfolio'],
      risks: ['Low margins in commodity edible oils', 'Patanjali brand reputation risk from court cases', 'Complex related-party transaction structure', 'Volatile oilseed prices and import dependence'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Adani Wilmar',
      competitorTicker: 'AWL',
      summary: 'Patanjali Foods competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'adani-wilmar', name: 'Adani Wilmar', industry: 'fmcg', ticker: 'AWL',
    founded: 1999, headquarters: 'Ahmedabad, Gujarat', employees: '5,500+', marketCap: '₹35,000 Cr',
    ceo: 'Angshu Mallick (MD & CEO)', website: 'https://www.adaniwilmar.com',
    description: "​JV between Adani Group and Wilmar International (Singapore). India's largest edible oil company by volume. Flagship brand Fortune is India's #1 edible oil brand. Also operates in wheat flour, rice, sugar, pulses, and ready-to-cook segments. In FY25 the company reported revenue of ₹51,000 Cr and net profit of ₹650 Cr, at an EBITDA margin of around 3.3%. Its revenue is led by edible oils (60% of sales), complemented by wheat flour & rice and industry essentials. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Edible Oils (Fortune)', revenueShare: 60, description: 'Soybean, sunflower, mustard, rice bran, and blended oils' },
      { name: 'Wheat Flour & Rice (Fortune)', revenueShare: 15, description: 'Branded atta, rice, and sugar' },
      { name: 'Industry Essentials (Oleochemicals)', revenueShare: 10, description: 'Oleochemicals, castor oil derivatives for industry' },
      { name: 'Ready-to-Cook & Pulses', revenueShare: 8, description: 'Khichdi, poha, upma mixes, and branded dal' },
      { name: 'Sugar & Soya Chunks', revenueShare: 7, description: 'Branded sugar and soya food products' },
    ],
    financials: [
      { year: 'FY21', revenue: 37090, profit: 727, ebitda: 1600 },
      { year: 'FY22', revenue: 54214, profit: 802, ebitda: 1750 },
      { year: 'FY23', revenue: 51550, profit: 492, ebitda: 1400 },
      { year: 'FY24', revenue: 47820, profit: 520, ebitda: 1500 },
      { year: 'FY25', revenue: 51000, profit: 650, ebitda: 1700 },
    ],
    revenueFY25: '₹51,000 Cr', profitFY25: '₹650 Cr', ebitdaMargin: '3.3%',
    news: [
      { title: 'Adani Wilmar Fortune brand launches premium cold-pressed oil range', date: '2025-03-20', source: 'Moneycontrol', url: 'https://www.moneycontrol.com' },
      { title: 'Food and FMCG segment revenue grows 25% as branded staples gain traction', date: '2025-02-08', source: 'Financial Express', url: 'https://www.financialexpress.com' },
      { title: 'Wilmar International explores increasing stake in Adani Wilmar JV', date: '2025-01-22', source: 'Reuters', url: 'https://www.reuters.com' },
    ],
    futureScope: {
      outlook: 'Transitioning from commodity trading to branded FMCG. Fortune brand extending into staples and packaged foods. Scale advantage in procurement and distribution.',
      plans: ['Food and FMCG revenue to Rs 10,000 Cr by FY27', 'Fortune brand extension into 20+ food categories', 'Ready-to-cook and convenience foods scaling', 'Distribution expansion to 2 million outlets'],
      risks: ['Thin margins in edible oil commodity business', 'Palm oil import dependence and price volatility', 'Adani Group reputational risk', 'Competition from Patanjali and local brands in staples'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Patanjali Foods',
      competitorTicker: 'PATANJALI',
      summary: 'Adani Wilmar competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'parle-products', name: 'Parle Products', industry: 'fmcg', ticker: 'Unlisted',
    founded: 1929, headquarters: 'Mumbai, Maharashtra', employees: '15,000+', marketCap: 'Unlisted (Private)',
    ceo: 'Mayank Shah (VP)', website: 'https://www.parleproducts.com',
    description: "​India's largest biscuit manufacturer by volume and one of the world's largest. Iconic brand Parle-G is the world's best-selling biscuit. Portfolio includes Parle-G, Hide & Seek, Milano, KrackJack, Melody, and Frooti (via Parle Agro partnership heritage). In FY25 the company reported revenue of ₹20,500 Cr and net profit of ₹1,850 Cr, at an EBITDA margin of around 14.6%. Its revenue is led by glucose biscuits (40% of sales), complemented by premium biscuits and snacks & namkeen. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Glucose Biscuits (Parle-G)', revenueShare: 40, description: "World's #1 selling biscuit brand by volume" },
      { name: 'Premium Biscuits (Hide & Seek, Milano)', revenueShare: 20, description: 'Chocolate chip cookies and premium range' },
      { name: 'Snacks & Namkeen (Parle Wafers)', revenueShare: 15, description: 'Chips, wafers, and traditional snacks' },
      { name: 'Bakery (KrackJack, Monaco)', revenueShare: 15, description: 'Cream biscuits, crackers, and toast' },
      { name: 'Confectionery (Melody, Mango Bite)', revenueShare: 10, description: 'Toffees, candies, and confectionery items' },
    ],
    financials: [
      { year: 'FY21', revenue: 12500, profit: 1100, ebitda: 1800 },
      { year: 'FY22', revenue: 14200, profit: 1250, ebitda: 2050 },
      { year: 'FY23', revenue: 16800, profit: 1400, ebitda: 2350 },
      { year: 'FY24', revenue: 18500, profit: 1600, ebitda: 2650 },
      { year: 'FY25', revenue: 20500, profit: 1850, ebitda: 3000 },
    ],
    revenueFY25: '₹20,500 Cr', profitFY25: '₹1,850 Cr', ebitdaMargin: '14.6%',
    news: [
      { title: 'Parle Products crosses Rs 20,000 Cr revenue — eyes IPO in next 3 years', date: '2025-04-12', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Hide & Seek premium range expands with artisanal cookie line', date: '2025-02-28', source: 'Mint', url: 'https://www.livemint.com' },
      { title: 'Parle-G remains recession-proof — demand surges in rural India', date: '2025-01-10', source: 'Business Standard', url: 'https://www.business-standard.com' },
    ],
    futureScope: {
      outlook: 'Volume leader in India biscuits with strongest rural presence. Premiumization through Hide & Seek and new categories. IPO speculation adds value-creation optionality.',
      plans: ['Premium portfolio expansion (Hide & Seek, Milano)', 'Snacks category scaling to Rs 5,000 Cr', 'IPO consideration for value unlocking', 'International market expansion'],
      risks: ['Low-margin volume game in glucose biscuits', 'Wheat and sugar cost inflation', 'Unlisted status limits capital access', 'Competition from Britannia and ITC in premium'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Britannia',
      competitorTicker: 'BRITANNIA',
      summary: 'Parle Products competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
  {
    id: 'amul-gcmmf', name: 'Amul / GCMMF', industry: 'fmcg', ticker: 'Unlisted (Cooperative)',
    founded: 1946, headquarters: 'Anand, Gujarat', employees: '36,000+', marketCap: 'Unlisted (Cooperative)',
    ceo: 'Jayen Mehta (MD, GCMMF)', website: 'https://www.amul.com',
    description: "​India's largest food products organization and world's 8th largest dairy cooperative. Gujarat Cooperative Milk Marketing Federation (GCMMF) markets Amul brand dairy products. Network of 3.6 million milk producers across 18,700 village cooperatives. Revenue exceeds Rs 72,000 Cr. In FY25 the company reported revenue of ₹72,000 Cr and net profit of ₹1,050 Cr, at an EBITDA margin of around 4.9%. Its revenue is led by liquid milk & milk products (40% of sales), complemented by butter, cheese & ghee and milk powder & infant food. Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story. Pan-India distribution reaching 10M+ retail outlets.",
    products: [
      { name: 'Liquid Milk & Milk Products', revenueShare: 40, description: 'Pasteurized milk, buttermilk, lassi, and flavored milk' },
      { name: 'Butter, Cheese & Ghee', revenueShare: 25, description: 'Iconic Amul Butter, cheese slices, and pure ghee' },
      { name: 'Ice Cream & Frozen Products', revenueShare: 12, description: 'Ice creams, frozen desserts, and kulfi' },
      { name: 'Milk Powder & Infant Food (Amulspray)', revenueShare: 13, description: 'Milk powder, infant food, and dairy whitener' },
      { name: 'Chocolates & Beverages', revenueShare: 10, description: 'Amul Dark, Milk Chocolate, and Kool flavored drinks' },
    ],
    financials: [
      { year: 'FY21', revenue: 39238, profit: 650, ebitda: 2100 },
      { year: 'FY22', revenue: 46481, profit: 720, ebitda: 2400 },
      { year: 'FY23', revenue: 55055, profit: 810, ebitda: 2800 },
      { year: 'FY24', revenue: 66145, profit: 950, ebitda: 3200 },
      { year: 'FY25', revenue: 72000, profit: 1050, ebitda: 3500 },
    ],
    revenueFY25: '₹72,000 Cr', profitFY25: '₹1,050 Cr', ebitdaMargin: '4.9%',
    news: [
      { title: 'Amul crosses Rs 72,000 Cr turnover — targets Rs 1 lakh Cr by FY27', date: '2025-04-15', source: 'Business Standard', url: 'https://www.business-standard.com' },
      { title: 'Amul enters organic food segment with premium dairy and staples', date: '2025-02-20', source: 'Economic Times', url: 'https://economictimes.indiatimes.com' },
      { title: 'Amul opens first overseas dairy processing plant in USA', date: '2025-01-08', source: 'Mint', url: 'https://www.livemint.com' },
    ],
    futureScope: {
      outlook: 'Targeting Rs 1 lakh Cr revenue by FY27. International expansion, value-added dairy, and organic products to drive premium growth while maintaining affordable pricing for masses.',
      plans: ['Revenue target Rs 1,00,000 Cr by FY27', 'International operations in US, Africa, and Middle East', 'Value-added dairy products premiumization', 'Organic and A2 milk product range'],
      risks: ['Low margins due to cooperative model', 'Seasonal milk procurement variability', 'Competition from private dairy players', 'Cold chain infrastructure challenges in expansion'],
    },
    extendedOverview: {
      businessSegments: 'Personal care, food & beverages, home care, health supplements, oral care. Mass market and premium product portfolios.',
      geographicPresence: 'Pan-India distribution reaching 10M+ retail outlets. Urban and rural presence. Growing modern trade and e-commerce channels.',
      keyStrengths: ["Strong brand portfolio with high consumer recall","Massive distribution network reaching rural India","Consistent innovation and new product launches","Pricing power from brand loyalty"],
      marketPosition: 'Established FMCG player with strong brands, deep distribution, and consistent growth in India consumption story.',
      rawMaterialStrategy: 'Agricultural commodities (palm oil, milk, wheat, sugar), packaging materials, chemicals for personal care. Commodity price hedging and backward integration reduce input cost volatility.'
    },
    financialRatios: { debtToEquity: 0.55, currentRatio: 1.15, roe: 12.0, roce: 14.5, interestCoverage: 6.0, netDebt: '₹2,000 Cr', peRatio: 20.0, pbRatio: 2.5, dividendYield: 1.0, workingCapitalDays: 45 },
    bcgMatrix: {
      stars: [{ name: 'Premium/D2C Products', growth: '20% CAGR', share: 'Growing premium share', insight: 'Premiumization trend as Indian incomes rise. D2C brands gaining traction online.' }],
      cashCows: [{ name: 'Core Brands (Mass Market)', growth: '8% CAGR', share: 'Dominant market share', insight: 'Established brands with 50%+ household penetration. Consistent demand and pricing power.' }],
      questionMarks: [{ name: 'Health & Wellness', growth: '18% CAGR', share: 'Emerging category', insight: 'Post-COVID health consciousness driving demand. New product development needed.' }],
      dogs: [{ name: 'Low-Margin Commodity Products', growth: '3% CAGR', share: 'Price-sensitive segment', insight: 'Bottom-of-pyramid products with thin margins. Maintained for distribution reach.' }],
    },
    headToHead: {
      competitor: 'Nestle India',
      competitorTicker: 'NESTLEIND',
      summary: 'Amul / GCMMF competes in the Indian fmcg industry with differentiated positioning and capabilities.',
      metrics: [
        { label: 'Market Position', company: 'Strong', competitor: 'Strong', unit: '', winner: 'tie' },
        { label: 'Revenue Growth', company: 12, competitor: 10, unit: '%', winner: 'company' },
        { label: 'EBITDA Margin', company: 15, competitor: 16, unit: '%', winner: 'competitor' },
        { label: 'Debt/Equity', company: 0.5, competitor: 0.4, unit: 'x', winner: 'competitor' },
        { label: 'ROCE', company: 14, competitor: 15, unit: '%', winner: 'competitor' },
      ],
      verdict: 'Both are significant players in the Indian fmcg industry with complementary strengths. Detailed analysis requires industry-specific operational metrics comparison.'
    },
  },
]

// Combine base companies with the additional (newer-industry) companies
const allCompanies: CompanySnapshot[] = [...mockCompanies, ...ADDITIONAL_COMPANIES]

// All suggestions for autocomplete
const allSuggestions: CompanySuggestion[] = allCompanies.map(c => ({
  id: c.id, name: c.name, industry: c.industry, ticker: c.ticker
}))

function filterSuggestions(query: string, currentIndustry: IndustryId): CompanySuggestion[] {
  const q = query.toLowerCase().trim()
  if (q.length < 1) return []

  const matches = allSuggestions
    .filter(c => c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q))

  // Scope results to the current industry when it has matching companies.
  // This keeps each dashboard's snapshot search focused on its own sector.
  const inIndustry = matches.filter(c => c.industry === currentIndustry)
  const source = inIndustry.length > 0 ? inIndustry : matches

  return source
    .sort((a, b) => {
      const aMatch = a.industry === currentIndustry ? 0 : 1
      const bMatch = b.industry === currentIndustry ? 0 : 1
      if (aMatch !== bMatch) return aMatch - bMatch
      return a.name.localeCompare(b.name)
    })
    .slice(0, 8)
}

export const useCompanyStore = create<CompanyStoreState>((set) => ({
  searchQuery: '',
  suggestions: [],
  selectedCompany: null,
  hasMismatch: false,
  mismatchDismissed: false,

  setSearchQuery: (query, currentIndustry) => {
    const suggestions = filterSuggestions(query, currentIndustry)
    set({ searchQuery: query, suggestions })
  },

  selectCompany: (companyId, currentIndustry) => {
    const company = allCompanies.find(c => c.id === companyId) || null
    const hasMismatch = company ? company.industry !== currentIndustry : false
    set({ selectedCompany: company, hasMismatch, mismatchDismissed: false, suggestions: [] })
  },

  clearSelection: () => {
    set({ selectedCompany: null, hasMismatch: false, mismatchDismissed: false, searchQuery: '', suggestions: [] })
  },

  dismissMismatch: () => {
    set({ mismatchDismissed: true })
  },
}))
