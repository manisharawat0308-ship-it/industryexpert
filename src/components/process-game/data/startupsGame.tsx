import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const STARTUP = '#7c3aed'

// Reward: a rocket climbing higher with each funding stage (6 parts)
function RocketBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const t = Math.min(1, parts / 6)
  const ry = 165 - t * 120
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Startup rocket launching">
      <rect x="0" y="0" width="220" height="200" fill="#f5f3ff" rx="10" />
      {show(6) && <><circle cx="180" cy="34" r="12" fill={ORANGE} opacity="0.5" /><text x="150" y="30" fontSize="10" fontWeight="bold" fill={STARTUP}>🦄 Unicorn</text></>}
      {/* launchpad */}
      <rect x="70" y="168" width="80" height="6" fill="#94a3b8" />
      {/* milestone markers */}
      {[1,2,3,4,5].map((m) => (
        <line key={m} x1="150" y1={165 - (m / 6) * 120} x2="162" y2={165 - (m / 6) * 120} stroke={show(m) ? STARTUP : '#cbd5e1'} strokeWidth="2" />
      ))}
      {/* rocket */}
      {parts >= 1 && (
        <g transform={`translate(110, ${ry})`} className="animate-[fadeIn_0.4s_ease]">
          <path d="M0 -22 C10 -10 10 8 0 16 C-10 8 -10 -10 0 -22 Z" fill={STARTUP} />
          <circle cx="0" cy="-6" r="4" fill="#bae6fd" />
          <path d="M-8 10 L-14 20 L-6 14 Z" fill="#f59e0b" />
          <path d="M8 10 L14 20 L6 14 Z" fill="#f59e0b" />
          {parts >= 1 && parts < 6 && <path d="M-4 16 L0 30 L4 16 Z" fill={ORANGE} />}
        </g>
      )}
      {parts === 0 && <text x="110" y="110" textAnchor="middle" fontSize="10" fill="#cbd5e1">Answer to launch</text>}
      {highlight && show(6) && <text x="110" y="190" textAnchor="middle" fontSize="10" fontWeight="bold" fill={STARTUP}>From idea to unicorn!</text>}
    </svg>
  )
}
function RocketPreview() {
  return (
    <svg viewBox="0 0 40 60" className="w-10 h-14">
      <path d="M20 6 C30 22 30 40 20 50 C10 40 10 22 20 6 Z" fill={STARTUP} />
      <circle cx="20" cy="24" r="5" fill="#bae6fd" />
      <path d="M10 42 L4 54 L14 48 Z" fill="#f59e0b" /><path d="M30 42 L36 54 L26 48 Z" fill="#f59e0b" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#f5f3ff" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Idea */}
      <circle cx="28" cy="44" r="9" fill="#f59e0b" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Idea</text>
      {/* MVP */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#3b82f6" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">MVP</text>
      {/* PMF */}
      <circle cx="138" cy="44" r="10" fill="#14b8a6" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">PMF</text>
      {/* Seed */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#22c55e" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Seed</text>
      {/* Series A/B */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#a855f7" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Series A/B</text>
      {/* Scale */}
      <rect x="228" y="98" width="24" height="16" rx="2" fill="#7c3aed" /><text x="240" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Scale</text>
      {/* Growth capital */}
      <circle cx="190" cy="105" r="10" fill="#f59e0b" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Growth</text>
      {/* Profitability */}
      <rect x="128" y="98" width="24" height="16" rx="2" fill="#0891b2" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Profit</text>
      {/* Exit / IPO */}
      <text x="55" y="150" fontSize="12" textAnchor="middle" fill={STARTUP}>IPO</text><text x="55" y="166" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Exit</text>
    </>
  )
}

export const STARTUPS_GAME: IndustryGameData = {
  industryName: 'Startups',
  brandColor: STARTUP,
  processName: 'the startup growth journey',
  reward: {
    noun: 'Startup', verb: 'Scale', parts: 6,
    partLabels: ['Idea validated', 'MVP built', 'Product-market fit found', 'Seed funding raised', 'Scaled with growth capital', 'Profitable exit / IPO — unicorn!'],
    renderReward: RocketBuild, renderPreview: RocketPreview,
    completionTitle: 'Your Startup is a Unicorn!',
    completionSubtitle: 'From an idea to a billion-dollar exit — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Unicorn', prompt: 'In the startup world, what is a "unicorn"?', options: ['A private startup valued at over $1 billion', 'A profitable public company', 'A government bond', 'A type of loan'], explanation: 'A unicorn is a privately held startup valued at $1 billion or more. India has the world\'s third-largest unicorn ecosystem, spanning fintech, e-commerce, SaaS, and consumer tech.' },
    { topic: 'MVP', prompt: 'What is an "MVP" that founders build first?', options: ['Minimum Viable Product — the simplest version to test the idea', 'Most Valuable Player', 'Maximum Value Proposition', 'Managed Venture Portfolio'], explanation: 'An MVP (Minimum Viable Product) is the simplest working version that lets a startup test its core idea with real users, learn fast, and iterate — before investing in a full build.' },
    { topic: 'PMF', prompt: 'The crucial milestone "product-market fit" (PMF) means:', options: ['The product satisfies a strong market demand and users keep coming back', 'The office is fully furnished', 'The logo is designed', 'The company is listed'], explanation: 'Product-market fit is when a product clearly meets a real market need — shown by strong retention, organic growth, and demand. It is the signal that a startup is ready to scale.' },
    { topic: 'Funding Stages', prompt: 'What is the typical order of startup funding rounds?', options: ['Pre-seed → Seed → Series A → Series B → Series C…', 'IPO → Seed → Pre-seed', 'Series A → Seed → Pre-seed', 'Series C → Seed → Series A'], explanation: 'Startups raise progressively larger rounds — pre-seed/seed (early validation), then Series A, B, C… as they scale — each at a higher valuation if the business grows.' },
    { topic: 'Venture Capital', prompt: 'How do venture capital (VC) investors make returns?', options: ['Buying equity early and profiting when the startup exits at a higher value', 'Charging interest like a bank', 'Taking a salary', 'Selling products'], explanation: 'VCs invest equity in high-risk, high-growth startups. Most fail, but the few big winners (via IPO or acquisition) generate outsized returns that make up the whole fund\'s profit.' },
    { topic: 'Burn & Runway', prompt: 'What do "burn rate" and "runway" mean for a startup?', options: ['How fast it spends cash, and how long that cash will last', 'How fast it grows revenue only', 'The office rent', 'The number of staff'], explanation: 'Burn rate is monthly net cash spent; runway is months of cash left before the startup runs out. Managing these is existential — startups must raise more or reach profitability before runway ends.' },
    { topic: 'Cap Table', prompt: 'What does a startup\'s "cap table" record?', options: ['Who owns what equity/shares in the company', 'The office capacity', 'The product catalogue', 'The tax return'], explanation: 'The capitalisation (cap) table lists all shareholders — founders, employees (ESOPs), and investors — and their ownership percentages, which shift with each funding round (dilution).' },
    { topic: 'Path to Profit', prompt: 'Why has the market recently pushed startups toward profitability?', options: ['Cheap capital dried up, so sustainable unit economics matter more than growth-at-all-costs', 'Profit was always ignored', 'Growth stopped mattering', 'Regulators banned revenue'], explanation: 'After years of "growth at any cost" funded by cheap money, tighter capital and public-market scrutiny now reward startups with sound unit economics and a credible path to profitability.' },
    { topic: 'Exit', prompt: 'How do startup founders and investors typically "exit"?', options: ['Via an IPO or acquisition (M&A)', 'By closing the company', 'By hiring more staff', 'By moving office'], explanation: 'An exit turns paper value into cash: either an IPO (listing shares publicly) or acquisition by a larger company. Exits are how VCs and founders realise their returns.' },
    { topic: 'ESOPs', prompt: 'Why do startups grant employees "ESOPs"?', options: ['To share ownership and attract/retain talent with limited cash', 'To pay taxes', 'To reduce equity', 'To avoid hiring'], explanation: 'Employee Stock Ownership Plans give staff a slice of equity, aligning them with the company\'s success and helping cash-strapped startups compete for talent against bigger salaries.' },
    { topic: 'Indian Ecosystem', prompt: 'Which sectors dominate India\'s startup ecosystem?', options: ['Fintech, e-commerce, SaaS, edtech and consumer tech', 'Only mining', 'Only cement', 'Only farming'], explanation: 'India\'s startups cluster in fintech (payments/lending), e-commerce and quick commerce, enterprise SaaS (a global export strength), edtech, and consumer tech — powered by a huge digital user base.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'idea', label: 'Idea', info: 'It starts with an idea solving a real problem — validated with early users before building anything big.', x: 14, y: 32, w: 28, h: 32 },
      { id: 'mvp', label: 'MVP', info: 'A Minimum Viable Product — the simplest working version to test the idea and learn fast from real users.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'pmf', label: 'Product-Market Fit', info: 'The pivotal moment when the product clearly meets strong demand, shown by retention and organic growth.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'seed', label: 'Seed Funding', info: 'Early equity capital (angels/seed VCs) to build the team and product once the idea shows promise.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'seriesab', label: 'Series A / B', info: 'Larger rounds at higher valuations to scale the proven model — hire, expand markets, and grow revenue.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'scale', label: 'Scale', info: 'Rapid expansion — but with attention to burn rate and runway so the company doesn\'t run out of cash.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'growth', label: 'Growth Capital', info: 'Late-stage funding to push toward market leadership, increasingly conditional on sound unit economics.', x: 178, y: 94, w: 24, h: 28 },
      { id: 'profit', label: 'Profitability', info: 'Reaching sustainable profit (or a clear path to it) is now the key to durable value and a strong exit.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'exit', label: 'Exit / IPO', info: 'Founders and investors realise returns via an IPO or acquisition — the goal of the whole journey.', x: 44, y: 136, w: 24, h: 30 },
    ],
  },
}
