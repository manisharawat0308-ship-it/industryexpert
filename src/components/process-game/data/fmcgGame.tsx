import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const FMCG = '#d97706'

// Reward: a retail shelf filling with products (6 parts)
function ShelfBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const rows = [
    { y: 150, n: 4, color: FMCG },
    { y: 118, n: 4, color: '#3b82f6' },
    { y: 86, n: 4, color: '#22c55e' },
  ]
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Retail shelf being stocked">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* shelf frame */}
      {show(1) && <>
        <rect x="30" y="60" width="160" height="112" fill="none" stroke="#94a3b8" strokeWidth="3" />
        <line x1="30" y1="98" x2="190" y2="98" stroke="#94a3b8" strokeWidth="2" />
        <line x1="30" y1="130" x2="190" y2="130" stroke="#94a3b8" strokeWidth="2" />
      </>}
      {/* products fill in with stages 2..6 */}
      {rows.map((row, ri) => (
        Array.from({ length: row.n }).map((_, ci) => {
          const needed = 2 + Math.floor((ri * row.n + ci) / 3) // gradually reveal
          if (!show(Math.min(6, needed))) return null
          return <rect key={`${ri}-${ci}`} x={40 + ci * 38} y={row.y - 22} width="26" height="22" rx="2" fill={row.color} opacity="0.85" className="animate-[fadeIn_0.4s_ease]" />
        })
      ))}
      {show(6) && <circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" />}
      {show(6) && <rect x="30" y="52" width="160" height="8" rx="2" fill={FMCG} />}
      {parts === 0 && <rect x="30" y="60" width="160" height="112" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="190" textAnchor="middle" fontSize="10" fontWeight="bold" fill={FMCG}>Shelf fully stocked!</text>}
    </svg>
  )
}
function ShelfPreview() {
  return (
    <svg viewBox="0 0 70 60" className="w-16 h-14">
      <rect x="10" y="12" width="50" height="40" fill="none" stroke="#94a3b8" strokeWidth="2" />
      <rect x="15" y="34" width="12" height="16" fill={FMCG} /><rect x="30" y="34" width="12" height="16" fill="#3b82f6" /><rect x="45" y="34" width="10" height="16" fill="#22c55e" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#fffbeb" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* R&D */}
      <circle cx="28" cy="44" r="9" fill="#a855f7" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">R&D</text>
      {/* Sourcing */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#16a34a" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Sourcing</text>
      {/* Manufacturing */}
      <rect x="126" y="32" width="24" height="22" rx="2" fill="#3b82f6" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Mfg</text>
      {/* Packaging */}
      <rect x="178" y="34" width="24" height="20" rx="2" fill="#f59e0b" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Packaging</text>
      {/* Warehouse */}
      <rect x="228" y="32" width="24" height="22" rx="2" fill="#14b8a6" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Warehouse</text>
      {/* Distribution */}
      <rect x="228" y="98" width="24" height="14" rx="2" fill="#dc2626" /><circle cx="234" cy="114" r="2" fill="#111" /><circle cx="246" cy="114" r="2" fill="#111" /><text x="240" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Distribution</text>
      {/* Retail / kirana */}
      <rect x="178" y="98" width="24" height="16" rx="2" fill="#0891b2" /><text x="190" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Retail</text>
      {/* Consumer */}
      <circle cx="140" cy="105" r="9" fill="#ec4899" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Consumer</text>
      {/* Brand/marketing */}
      <rect x="46" y="140" width="20" height="18" rx="2" fill={FMCG} /><text x="55" y="170" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Brand</text>
    </>
  )
}

export const FMCG_GAME: IndustryGameData = {
  industryName: 'FMCG',
  brandColor: FMCG,
  processName: 'the FMCG value chain',
  reward: {
    noun: 'Stocked Shelf', verb: 'Stock', parts: 6,
    partLabels: ['Product researched & developed', 'Raw materials sourced', 'Manufactured at scale', 'Branded & packaged', 'Distributed to stores', 'On the shelf & selling!'],
    renderReward: ShelfBuild, renderPreview: ShelfPreview,
    completionTitle: 'Your Shelf is Stocked!',
    completionSubtitle: 'From R&D to the retail shelf — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'What is FMCG', prompt: 'What does "FMCG" stand for, and what defines these products?', options: ['Fast-Moving Consumer Goods — low-cost items bought frequently', 'Finance Management Company Group', 'Factory Made Costly Goods', 'Farm Machinery & Cargo Goods'], explanation: 'FMCG = Fast-Moving Consumer Goods: everyday low-cost products (soap, food, beverages, toiletries) that sell quickly in high volumes with thin per-unit margins but huge scale.' },
    { topic: 'Value Chain', prompt: 'Which sequence best describes the FMCG value chain?', options: ['R&D → Sourcing → Manufacturing → Packaging → Distribution → Retail', 'Retail → R&D → Mining → Export', 'Mining → Smelting → Casting → Sale', 'Farming → Milling → Baking only'], explanation: 'FMCG flows from product R&D, to sourcing raw materials, to large-scale manufacturing, branding/packaging, then a vast distribution network reaching millions of retail outlets.' },
    { topic: 'Distribution', prompt: 'What is the biggest competitive moat for a large Indian FMCG company?', options: ['A deep distribution network reaching millions of outlets', 'Owning oil wells', 'A single factory', 'High product prices'], explanation: 'Reaching India\'s ~12 million+ retail outlets (mostly small kirana stores) is the hardest thing to replicate. Distribution reach and depth are the biggest moats for leaders like HUL and ITC.' },
    { topic: 'Rural Demand', prompt: 'Why is rural India so important for FMCG growth?', options: ['It is a huge, under-penetrated market (~35-40% of sales)', 'It has no consumers', 'It only buys luxury goods', 'It is irrelevant to FMCG'], explanation: 'Rural India contributes a large share of FMCG sales and offers big headroom as incomes rise. Monsoon, crop prices, and rural schemes strongly influence FMCG volumes.' },
    { topic: 'Packaging', prompt: 'Why are small "sachet" and low-unit packs so common in Indian FMCG?', options: ['They make products affordable at low price points (sachet economy)', 'They are cheaper to make than any other pack', 'They last longer', 'They are legally required'], explanation: 'Small sachets/low-unit packs lower the entry price so lower-income and rural consumers can buy premium brands in tiny quantities — a hallmark of Indian FMCG penetration.' },
    { topic: 'Raw Materials', prompt: 'FMCG margins are sensitive to "input cost inflation". What does this mean?', options: ['Rising prices of raw materials like palm oil, crude derivatives, packaging', 'Higher advertising creativity', 'More retail outlets', 'Faster distribution'], explanation: 'Key inputs (palm oil, crude-linked chemicals, milk, wheat, packaging) swing with commodity cycles. When they rise, companies must cut pack sizes, hedge, or raise prices to protect margins.' },
    { topic: 'Manufacturing', prompt: 'Many FMCG firms use third-party/contract manufacturers. Why?', options: ['To scale flexibly and stay asset-light', 'Because they cannot make anything', 'To raise costs', 'It is legally mandatory'], explanation: 'Contract manufacturing lets FMCG brands scale capacity flexibly, reach regional markets, and stay relatively asset-light — focusing their capital on brands, R&D, and distribution.' },
    { topic: 'Branding', prompt: 'What role does advertising and branding play in FMCG?', options: ['It builds brand loyalty and pricing power in a crowded market', 'It is unnecessary', 'It only informs of price', 'It replaces distribution'], explanation: 'Because products are cheap and similar, brands compete on trust and recall. Heavy A&P (advertising & promotion) spend builds loyalty and lets leaders command a price premium.' },
    { topic: 'GST/Modern Trade', prompt: 'What structural shift is reshaping FMCG distribution in India?', options: ['Rise of modern trade, e-commerce and quick commerce', 'Return to barter', 'End of packaging', 'Ban on branding'], explanation: 'Beyond traditional kirana, growth is coming from modern trade (supermarkets), e-commerce, and quick commerce (10-minute delivery), changing how brands reach and price to consumers.' },
    { topic: 'Premiumisation', prompt: 'What does "premiumisation" mean for FMCG companies?', options: ['Selling higher-value, higher-margin variants as incomes rise', 'Cutting all prices', 'Removing brands', 'Only selling sachets'], explanation: 'Premiumisation is upgrading consumers to costlier, higher-margin products (natural, health, premium personal care). It is a key profit-growth lever as Indian incomes rise.' },
    { topic: 'Working Capital', prompt: 'Why do strong FMCG companies often have very low or negative working capital?', options: ['They sell fast for cash but pay suppliers later', 'They hold huge inventory for years', 'They give very long credit', 'They never collect payment'], explanation: 'Fast inventory turns plus cash/quick retail collections and delayed supplier payments mean the best FMCG firms fund growth from operations — a sign of a high-quality business.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'rnd', label: 'R&D', info: 'Research and product development — new formulations, flavours, and variants tuned to consumer trends.', x: 14, y: 30, w: 30, h: 34 },
      { id: 'sourcing', label: 'Sourcing', info: 'Procuring raw materials (palm oil, crude derivatives, agri-inputs, packaging) whose prices drive margins.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'mfg', label: 'Manufacturing', info: 'Large-scale production — often via own plants plus flexible third-party/contract manufacturers.', x: 124, y: 28, w: 28, h: 36 },
      { id: 'packaging', label: 'Packaging', info: 'Branding and packing — including low-unit sachets that make products affordable across income levels.', x: 176, y: 30, w: 28, h: 34 },
      { id: 'warehouse', label: 'Warehouse', info: 'Regional depots and warehouses stock finished goods close to markets for fast replenishment.', x: 226, y: 28, w: 30, h: 34 },
      { id: 'distribution', label: 'Distribution', info: 'The deep multi-tier network (distributors → wholesalers → retailers) that reaches millions of outlets.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'retail', label: 'Retail', info: 'Kirana stores, modern trade, e-commerce, and quick commerce — where the product finally sells.', x: 176, y: 94, w: 28, h: 28 },
      { id: 'consumer', label: 'Consumer', info: 'The end buyer. Brand loyalty, affordability, and shelf presence decide which product is picked.', x: 128, y: 92, w: 24, h: 30 },
      { id: 'brand', label: 'Brand & Marketing', info: 'Advertising and promotion build recall, trust, and pricing power in a crowded, low-cost market.', x: 42, y: 136, w: 28, h: 28 },
    ],
  },
}
