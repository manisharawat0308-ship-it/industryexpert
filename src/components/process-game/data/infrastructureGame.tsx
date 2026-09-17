import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const INFRA = '#334155'

// Reward: an elevated expressway/flyover built pier by pier (6 parts)
function ExpresswayBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Expressway being built">
      <rect x="0" y="0" width="220" height="200" fill="#f1f5f9" rx="10" />
      {show(6) && <circle cx="185" cy="32" r="12" fill={ORANGE} opacity="0.5" />}
      {/* ground */}
      <rect x="0" y="168" width="220" height="8" fill="#cbd5e1" />
      {/* piers */}
      {show(1) && [30, 90, 150].map((x) => <rect key={x} x={x} y="110" width="14" height="58" fill="#64748b" className="animate-[fadeIn_0.5s_ease]" />)}
      {/* pier caps */}
      {show(2) && [24, 84, 144].map((x) => <rect key={x} x={x} y="104" width="26" height="8" rx="1" fill="#475569" />)}
      {/* deck segments */}
      {show(3) && <rect x="24" y="96" width="80" height="10" fill={INFRA} className="animate-[fadeIn_0.5s_ease]" />}
      {show(4) && <rect x="104" y="96" width="80" height="10" fill={INFRA} className="animate-[fadeIn_0.5s_ease]" />}
      {/* road surface + markings */}
      {show(5) && <><rect x="24" y="90" width="160" height="6" fill="#1f2937" />{[36,68,100,132,164].map(x => <rect key={x} x={x} y="92" width="10" height="2" fill="#fde047" />)}</>}
      {/* lights + green verge + a car */}
      {show(6) && <>
        <line x1="30" y1="90" x2="30" y2="78" stroke="#94a3b8" strokeWidth="2" /><circle cx="30" cy="76" r="2.5" fill="#fde047" />
        <line x1="178" y1="90" x2="178" y2="78" stroke="#94a3b8" strokeWidth="2" /><circle cx="178" cy="76" r="2.5" fill="#fde047" />
        <rect x="70" y="82" width="16" height="7" rx="2" fill="#dc2626" /><circle cx="74" cy="90" r="2" fill="#111" /><circle cx="82" cy="90" r="2" fill="#111" />
        <rect x="0" y="160" width="220" height="6" fill={GREEN} opacity="0.3" />
      </>}
      {parts === 0 && <rect x="24" y="96" width="160" height="10" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="190" textAnchor="middle" fontSize="10" fontWeight="bold" fill={INFRA}>Expressway open to traffic!</text>}
    </svg>
  )
}
function RoadPreview() {
  return (
    <svg viewBox="0 0 80 44" className="w-20 h-11">
      <rect x="8" y="20" width="64" height="6" fill={INFRA} />
      <rect x="10" y="26" width="6" height="14" fill="#64748b" /><rect x="38" y="26" width="6" height="14" fill="#64748b" /><rect x="64" y="26" width="6" height="14" fill="#64748b" />
      {[16,32,48,60].map(x => <rect key={x} x={x} y="21" width="8" height="2" fill="#fde047" />)}
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#f1f5f9" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Bidding / DPR */}
      <rect x="16" y="36" width="24" height="18" rx="2" fill="#a855f7" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Bid/DPR</text>
      {/* Financing */}
      <circle cx="88" cy="44" r="10" fill="#22c55e" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Finance</text>
      {/* Land / clearances */}
      <rect x="128" y="34" width="22" height="18" rx="2" fill="#f59e0b" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Land/Clear</text>
      {/* Design/EPC */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#3b82f6" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">EPC</text>
      {/* Construction */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#334155" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Construct</text>
      {/* Commissioning */}
      <rect x="228" y="98" width="24" height="16" rx="2" fill="#14b8a6" /><text x="240" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Commission</text>
      {/* O&M / tolling */}
      <circle cx="190" cy="105" r="10" fill="#ef4444" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Toll/O&amp;M</text>
      {/* Asset */}
      <rect x="128" y="100" width="24" height="6" fill="#334155" /><rect x="132" y="106" width="4" height="8" fill="#64748b" /><rect x="144" y="106" width="4" height="8" fill="#64748b" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Asset</text>
      {/* Recycle (InvIT) */}
      <rect x="46" y="140" width="20" height="16" rx="2" fill={INFRA} /><text x="56" y="168" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">InvIT</text>
    </>
  )
}

export const INFRASTRUCTURE_GAME: IndustryGameData = {
  industryName: 'Infrastructure',
  brandColor: INFRA,
  processName: 'infrastructure project delivery',
  reward: {
    noun: 'Expressway', verb: 'Build', parts: 6,
    partLabels: ['Piers founded', 'Pier caps set', 'First deck span cast', 'Second deck span cast', 'Road surfaced & marked', 'Lit, landscaped & opened!'],
    renderReward: ExpresswayBuild, renderPreview: RoadPreview,
    completionTitle: 'Your Expressway is Open!',
    completionSubtitle: 'From bid to ribbon-cutting — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'EPC', prompt: 'What does "EPC" mean in the infrastructure business?', options: ['Engineering, Procurement & Construction — a fixed-scope build contract', 'Extra Project Cost', 'EquityPs Capital', 'Energy Power Cell'], explanation: 'EPC = Engineering, Procurement & Construction. The contractor designs, buys materials, and builds the asset for a fixed price/timeline, handing it over on completion — the classic construction model.' },
    { topic: 'HAM', prompt: 'In a Hybrid Annuity Model (HAM) road project, how is the developer paid?', options: ['Government funds part of cost; developer gets annuity payments over time', 'Only through tolls forever', 'A one-time cash lump sum only', 'Not paid at all'], explanation: 'Under HAM, the government funds ~40% during construction and pays the balance as fixed annuities over the concession, sharing risk. The developer builds and maintains but does not take toll/traffic risk.' },
    { topic: 'BOT', prompt: 'In a BOT (Build-Operate-Transfer) toll road, how does the developer earn?', options: ['Collects tolls from users for a fixed concession period, then transfers the asset', 'Sells the road', 'Gets paid upfront only', 'Earns nothing'], explanation: 'In BOT (toll), the private developer finances and builds the road, then recovers its investment plus return by collecting tolls for a set concession (e.g. 20-30 years) before transferring it to the government.' },
    { topic: 'Order Book', prompt: 'Why is the "order book" the key metric for an infra/EPC company?', options: ['It shows contracted future revenue and multi-year visibility', 'It counts employees', 'It is the paint budget', 'It measures share price'], explanation: 'The order book is the value of contracted but unexecuted projects. A large book (often 2-3x annual revenue) gives multi-year revenue visibility — the health check for an EPC company.' },
    { topic: 'Working Capital', prompt: 'Why are EPC companies typically "working-capital intensive"?', options: ['They fund materials/labour upfront while payments and retention money lag', 'They hold no inventory', 'Customers pay in advance', 'They have no costs'], explanation: 'Contractors spend on materials and labour long before client payments arrive, and clients retain a portion until completion. This locks up cash, so managing working capital and receivables is critical.' },
    { topic: 'Key Inputs', prompt: 'Which raw materials most affect an infrastructure project\'s cost?', options: ['Steel, cement, bitumen and aggregates', 'Cotton and sugar', 'Silicon chips', 'Rubber'], explanation: 'Roads and structures consume large volumes of steel, cement, bitumen, and aggregates. Price-escalation clauses in contracts help pass on commodity inflation, but timing and availability still matter.' },
    { topic: 'Land & Clearances', prompt: 'What is the most common cause of infrastructure project delays in India?', options: ['Land acquisition and environmental/regulatory clearances', 'Too much steel', 'Excess funding', 'Too many workers'], explanation: 'Delays in acquiring land and obtaining forest/environment/utility clearances are the classic bottlenecks. Projects with land and clearances in hand carry far lower execution risk.' },
    { topic: 'InvIT', prompt: 'How do developers "recycle capital" from completed operating assets?', options: ['Transfer them into an InvIT and raise fresh money to build more', 'Demolish them', 'Give them away', 'Stop operating them'], explanation: 'An Infrastructure Investment Trust (InvIT) lets a developer pool mature, cash-generating assets (like toll roads) and sell units to investors — freeing capital to bid for and build new projects.' },
    { topic: 'Government Capex', prompt: 'Why is the sector so tied to the government?', options: ['Most demand comes from public capex — roads, metros, ports, water', 'It sells to consumers only', 'It exports everything', 'It ignores policy'], explanation: 'Public infrastructure spending (national highways, metros, railways, ports, water) drives most demand. Budget allocations and schemes like the National Infrastructure Pipeline shape the order flow.' },
    { topic: 'Segments', prompt: 'Which of these is a core infrastructure segment?', options: ['Roads & highways, urban metro, ports, and transmission lines', 'Textiles and garments', 'FMCG sachets', 'Pharma tablets'], explanation: 'Infrastructure spans roads/highways, urban transit (metros), ports, airports, water/irrigation, and power transmission — each with its own contract models, clients, and risk profiles.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'bid', label: 'Bidding / DPR', info: 'A Detailed Project Report is prepared and the contract is won through competitive bidding.', x: 14, y: 32, w: 28, h: 30 },
      { id: 'finance', label: 'Financing', info: 'The project is funded through a mix of equity, debt, and (in HAM) government grants.', x: 76, y: 32, w: 28, h: 30 },
      { id: 'land', label: 'Land & Clearances', info: 'Land acquisition and environmental/regulatory clearances — the most common cause of delays.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'epc', label: 'Design / EPC', info: 'Engineering and procurement under an EPC or HAM/BOT contract define scope, cost, and timeline.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'construct', label: 'Construction', info: 'The physical build — consuming steel, cement, bitumen, and aggregates, and lots of working capital.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'commission', label: 'Commissioning', info: 'The completed asset is tested and commissioned, then opened for use.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'toll', label: 'Toll / O&M', info: 'In BOT, tolls repay the investment; developers also earn from operation & maintenance and annuities (HAM).', x: 178, y: 94, w: 24, h: 28 },
      { id: 'asset', label: 'The Asset', info: 'The finished road/metro/port — a long-life asset generating cash over its concession period.', x: 128, y: 96, w: 26, h: 28 },
      { id: 'invit', label: 'InvIT / Recycle', info: 'Mature assets are transferred into an InvIT to recycle capital and fund new projects.', x: 42, y: 136, w: 26, h: 28 },
    ],
  },
}
