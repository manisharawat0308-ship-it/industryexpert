import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const BFSI = '#4338ca'

// Reward: a growing stack of coins / savings (6 parts)
function SavingsBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const stacks = Math.min(6, parts)
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Savings growing">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      <rect x="0" y="162" width="220" height="10" fill="#e2e8f0" />
      {/* coin stacks of increasing height */}
      {Array.from({ length: stacks }).map((_, i) => {
        const x = 40 + i * 25
        const coins = i + 1
        return (
          <g key={i} className="animate-[fadeIn_0.4s_ease]">
            {Array.from({ length: coins }).map((_, j) => (
              <ellipse key={j} cx={x + 8} cy={158 - j * 9} rx="12" ry="4.5" fill={j % 2 ? ORANGE : '#fbbf24'} stroke="#b45309" strokeWidth="0.6" />
            ))}
          </g>
        )
      })}
      {/* upward arrow + finish */}
      {show(6) && <><path d="M60 70 L150 40" stroke={GREEN} strokeWidth="3" fill="none" /><polygon points="150,40 140,40 148,50" fill={GREEN} /><text x="110" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill={BFSI}>₹ Growing</text></>}
      {parts === 0 && <text x="110" y="110" textAnchor="middle" fontSize="10" fill="#cbd5e1">Answer to grow savings</text>}
      {highlight && show(6) && <text x="110" y="185" textAnchor="middle" fontSize="10" fontWeight="bold" fill={BFSI}>Healthy, growing finances!</text>}
    </svg>
  )
}
function SavingsPreview() {
  return (
    <svg viewBox="0 0 70 50" className="w-16 h-12">
      {[0,1,2].map(i => (
        <g key={i}>{Array.from({length:i+1}).map((_,j)=>(<ellipse key={j} cx={16+i*20} cy={42-j*8} rx="9" ry="3.5" fill={ORANGE} stroke="#b45309" strokeWidth="0.5" />))}</g>
      ))}
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#eef2ff" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Depositors */}
      <circle cx="28" cy="44" r="9" fill="#22c55e" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Deposits</text>
      {/* Bank */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#4338ca" /><polygon points="76,34 88,26 100,34" fill="#4338ca" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Bank</text>
      {/* Underwriting */}
      <circle cx="138" cy="44" r="10" fill="#f59e0b" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Underwrite</text>
      {/* Lending */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#3b82f6" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Lending</text>
      {/* Borrowers */}
      <circle cx="240" cy="44" r="9" fill="#0891b2" /><text x="240" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Borrowers</text>
      {/* Interest / NIM */}
      <rect x="228" y="98" width="24" height="16" rx="2" fill="#14b8a6" /><text x="240" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">NIM</text>
      {/* Risk / NPA mgmt */}
      <circle cx="190" cy="105" r="10" fill="#ef4444" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Risk</text>
      {/* Regulator (RBI) */}
      <rect x="128" y="98" width="24" height="16" rx="2" fill="#a855f7" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">RBI</text>
      {/* Profit */}
      <circle cx="55" cy="146" r="9" fill={BFSI} /><text x="55" y="168" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Profit</text>
    </>
  )
}

export const BFSI_GAME: IndustryGameData = {
  industryName: 'Financial Services',
  brandColor: BFSI,
  processName: 'banking & financial services',
  reward: {
    noun: 'Loan Book', verb: 'Grow', parts: 6,
    partLabels: ['Deposits mobilised', 'Application received', 'Creditworthiness assessed', 'Loan underwritten & disbursed', 'Interest earned (NIM)', 'Repaid — healthy book!'],
    renderReward: SavingsBuild, renderPreview: SavingsPreview,
    completionTitle: 'Your Loan Book is Healthy!',
    completionSubtitle: 'From deposits to profitable lending — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Core Business', prompt: 'What is the fundamental way a bank makes money from lending?', options: ['Borrowing cheap (deposits) and lending dearer — the interest spread', 'Selling products at a factory', 'Mining gold', 'Growing crops'], explanation: 'Banks take deposits at a low interest rate and lend at a higher rate. The gap — the net interest margin (NIM) — is their core earnings engine, alongside fee income.' },
    { topic: 'NIM', prompt: 'What does "Net Interest Margin" (NIM) measure?', options: ['The spread between interest earned on loans and paid on deposits', 'The number of branches', 'The advertising budget', 'The share price'], explanation: 'NIM = (interest earned − interest paid) ÷ average earning assets. A higher NIM means the bank lends profitably. Low-cost deposits (CASA) are key to a strong NIM.' },
    { topic: 'CASA', prompt: 'Why do banks prize a high "CASA ratio"?', options: ['Current & savings accounts are low-cost deposits that boost margins', 'It measures loan defaults', 'It is a type of loan', 'It is a tax'], explanation: 'CASA (Current Account, Savings Account) deposits pay little or no interest, so a high CASA ratio lowers the bank\'s cost of funds and widens its net interest margin.' },
    { topic: 'Underwriting', prompt: 'Before granting a loan, what does the bank assess in "underwriting"?', options: ['The borrower\'s creditworthiness and ability to repay', 'The weather', 'The share price', 'The branch decor'], explanation: 'Underwriting evaluates the borrower\'s income, credit history (score), collateral, and repayment capacity to decide whether — and on what terms — to lend, managing default risk upfront.' },
    { topic: 'NPA', prompt: 'What is an "NPA" (Non-Performing Asset)?', options: ['A loan where the borrower has stopped paying (typically 90+ days overdue)', 'A profitable loan', 'A savings account', 'A new branch'], explanation: 'An NPA is a loan on which interest/principal is overdue (usually 90+ days). Rising NPAs force banks to set aside provisions, hurting profits — so asset quality is a critical health metric.' },
    { topic: 'Capital Adequacy', prompt: 'Why must banks hold a minimum "capital adequacy ratio" (CAR)?', options: ['To absorb losses and stay solvent under stress', 'To pay dividends', 'To buy branches', 'To advertise'], explanation: 'Regulators require banks to hold capital (CAR/CRAR) as a cushion against loan losses. It ensures a bank can absorb shocks and protects depositors — a core pillar of banking stability.' },
    { topic: 'Regulator', prompt: 'Which body regulates banks in India?', options: ['The Reserve Bank of India (RBI)', 'SEBI', 'IRDAI', 'The stock exchange'], explanation: 'The RBI is the banking regulator and monetary authority — it sets interest-rate policy, reserve requirements (CRR/SLR), and prudential norms. SEBI regulates markets; IRDAI regulates insurance.' },
    { topic: 'Fee Income', prompt: 'Besides interest, banks earn "non-interest" income from:', options: ['Fees, cards, wealth management, forex and transaction charges', 'Selling steel', 'Farming', 'Mining'], explanation: 'Fee/non-interest income (cards, processing fees, third-party product distribution, wealth management, forex) diversifies earnings and is prized because it needs little capital.' },
    { topic: 'Digital Banking', prompt: 'How has UPI/digital banking reshaped Indian BFSI?', options: ['Massively cut transaction costs and expanded financial inclusion', 'Ended all banking', 'Made cash mandatory', 'Reduced customers'], explanation: 'UPI and digital rails have made payments near-free and instant, driving huge volumes, financial inclusion, and new fintech models — while pushing banks to invest heavily in technology.' },
    { topic: 'Insurance/NBFC', prompt: 'The "BFSI" umbrella also includes NBFCs and insurers. What do insurers do?', options: ['Pool premiums to pay out claims, covering customers against risk', 'Only lend money', 'Manufacture goods', 'Run airports'], explanation: 'Insurers (life and general) collect premiums from many customers and pay claims to the few who suffer losses — pooling and pricing risk. NBFCs lend but cannot take deposits like banks.' },
    { topic: 'Credit Cycle', prompt: 'Why is banking sensitive to the "credit cycle"?', options: ['Loan growth and defaults rise and fall with the economy', 'Banks ignore the economy', 'Only weather matters', 'Defaults never change'], explanation: 'In booms, credit grows and defaults are low; in downturns, defaults rise and lending slows. This cyclicality means bank earnings and asset quality swing with the broader economy.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'deposits', label: 'Deposits', info: 'Savers place money with the bank. Low-cost current/savings deposits (CASA) are the cheapest funding.', x: 14, y: 32, w: 28, h: 32 },
      { id: 'bank', label: 'The Bank', info: 'Pools deposits and its own capital, then channels funds into loans — the core intermediation role.', x: 74, y: 26, w: 28, h: 38 },
      { id: 'underwrite', label: 'Underwriting', info: 'Assesses each borrower\'s creditworthiness and collateral to price the loan and control default risk.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'lending', label: 'Lending', info: 'Approved loans are disbursed to retail and corporate borrowers at an interest rate above deposit cost.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'borrowers', label: 'Borrowers', info: 'Individuals and businesses use the credit; their repayments (with interest) generate the bank\'s income.', x: 226, y: 32, w: 30, h: 30 },
      { id: 'nim', label: 'Net Interest Margin', info: 'The spread between interest earned on loans and paid on deposits — the bank\'s core profit engine.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'risk', label: 'Risk Management', info: 'Monitors asset quality (NPAs) and sets aside provisions; capital adequacy cushions against losses.', x: 178, y: 94, w: 26, h: 28 },
      { id: 'rbi', label: 'Regulator (RBI)', info: 'The RBI sets monetary policy, reserve requirements, and prudential norms that govern all banks.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'profit', label: 'Profit', info: 'Net interest income plus fees, minus operating costs and provisions, becomes the bank\'s profit.', x: 44, y: 136, w: 24, h: 30 },
    ],
  },
}
