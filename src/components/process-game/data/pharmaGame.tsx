import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const PHARMA = '#0891b2'

// Reward: a blister strip of tablets filling up (6 parts)
function PillStripBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  // 10 pill pockets; fill proportionally to parts (stages 1..5 fill, 6 = seal/label)
  const filled = Math.min(10, Math.round((Math.min(parts, 5) / 5) * 10))
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Medicine strip being made">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* strip base */}
      {show(1) && <rect x="45" y="60" width="130" height="90" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" className="animate-[fadeIn_0.5s_ease]" />}
      {/* pill pockets */}
      {show(1) && Array.from({ length: 10 }).map((_, i) => {
        const r = Math.floor(i / 2), c = i % 2
        const cx = 80 + c * 60, cy = 78 + r * 18
        return <circle key={i} cx={cx} cy={cy} r="8" fill={i < filled ? PHARMA : '#cbd5e1'} opacity={i < filled ? 0.9 : 0.5} className="animate-[fadeIn_0.4s_ease]" />
      })}
      {/* label */}
      {show(6) && <><rect x="45" y="155" width="130" height="18" rx="3" fill="#ffffff" stroke={PHARMA} strokeWidth="1.5" /><text x="110" y="168" textAnchor="middle" fontSize="8" fontWeight="bold" fill={PHARMA}>Rx • 10 Tablets</text><circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" /></>}
      {parts === 0 && <rect x="45" y="60" width="130" height="90" rx="8" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="190" textAnchor="middle" fontSize="10" fontWeight="bold" fill={PHARMA}>A safe, approved medicine!</text>}
    </svg>
  )
}
function PillPreview() {
  return (
    <svg viewBox="0 0 70 50" className="w-16 h-12">
      <rect x="10" y="10" width="50" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      {[0,1,2].map(i => <circle key={i} cx={22 + i*13} cy={20} r="5" fill={PHARMA} />)}
      {[0,1,2].map(i => <circle key={i} cx={22 + i*13} cy={32} r="5" fill={PHARMA} />)}
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#ecfeff" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Discovery */}
      <circle cx="28" cy="44" r="9" fill="#a855f7" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Discovery</text>
      {/* API synthesis */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#3b82f6" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">API</text>
      {/* Formulation */}
      <circle cx="138" cy="44" r="10" fill="#14b8a6" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Formulation</text>
      {/* Trials */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#f59e0b" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Trials</text>
      {/* Approval */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#16a34a" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Approval</text>
      {/* Manufacturing (GMP) */}
      <rect x="228" y="98" width="24" height="14" rx="2" fill="#0891b2" /><text x="240" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Mfg (GMP)</text>
      {/* QC lab */}
      <circle cx="190" cy="105" r="10" fill="#ef4444" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">QC</text>
      {/* Packaging */}
      <rect x="128" y="98" width="24" height="16" rx="2" fill="#a855f7" /><text x="140" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Packaging</text>
      {/* Distribution */}
      <rect x="46" y="140" width="20" height="18" rx="2" fill={PHARMA} /><text x="56" y="170" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Distribution</text>
    </>
  )
}

export const PHARMA_GAME: IndustryGameData = {
  industryName: 'Pharma',
  brandColor: PHARMA,
  processName: 'pharmaceutical development & manufacturing',
  reward: {
    noun: 'Medicine', verb: 'Develop', parts: 6,
    partLabels: ['Molecule discovered', 'API synthesised', 'Formulated into tablets', 'Clinically tested', 'Regulator-approved', 'Packed, labelled & shipped!'],
    renderReward: PillStripBuild, renderPreview: PillPreview,
    completionTitle: 'Your Medicine is Ready!',
    completionSubtitle: 'From molecule to an approved medicine — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Generics', prompt: 'India is called the "pharmacy of the world" mainly because it leads in what?', options: ['Generic medicines (off-patent copies)', 'Patented blockbuster drugs', 'Medical devices only', 'Vaccines only'], explanation: 'India is the largest supplier of generic medicines by volume — affordable, off-patent copies of branded drugs — exporting to 200+ countries including a big share of US generics.' },
    { topic: 'API', prompt: 'What is an "API" in pharma?', options: ['Active Pharmaceutical Ingredient — the molecule that treats the disease', 'A software interface', 'A packaging material', 'A marketing plan'], explanation: 'The API (Active Pharmaceutical Ingredient) is the biologically active chemical that produces the therapeutic effect. Formulation combines it with inactive excipients to make the final dosage form.' },
    { topic: 'API Dependence', prompt: 'A key vulnerability of Indian pharma is heavy import of APIs and intermediates from where?', options: ['China', 'The USA', 'Brazil', 'Australia'], explanation: 'India imports a large share of bulk drugs/APIs and key intermediates from China. This dependence is why the government launched PLI schemes to boost domestic API manufacturing.' },
    { topic: 'Formulation', prompt: 'What does "formulation" mean in drug making?', options: ['Turning the API into a usable dosage form (tablet, capsule, syrup)', 'Discovering the molecule', 'Selling the drug', 'Patenting the brand'], explanation: 'Formulation blends the API with excipients (binders, fillers, coatings) and processes it into the final dosage form — tablets, capsules, injectables, or syrups — that patients actually take.' },
    { topic: 'Clinical Trials', prompt: 'Before approval, a new drug must pass clinical trials. What do these test?', options: ['Safety and efficacy in phases (I, II, III)', 'Only the packaging', 'The advertising', 'The share price'], explanation: 'Clinical trials run in phases — Phase I (safety in small groups), Phase II (efficacy/dosing), Phase III (large-scale confirmation) — before a regulator will approve the drug for sale.' },
    { topic: 'Regulators', prompt: 'To export formulations to the USA, an Indian plant must be approved by which regulator?', options: ['The US FDA', 'The RBI', 'SEBI', 'The WTO'], explanation: 'The US FDA inspects and approves manufacturing sites and drug filings (ANDAs). FDA "warning letters" or import alerts can halt exports, making regulatory compliance mission-critical for Indian pharma.' },
    { topic: 'GMP', prompt: 'Pharma factories must follow "GMP". What is it?', options: ['Good Manufacturing Practices — strict quality/hygiene standards', 'Gross Margin Percentage', 'Global Market Pricing', 'General Managers\' Policy'], explanation: 'Good Manufacturing Practices (GMP) are enforceable standards for cleanliness, documentation, and process control that ensure every batch of medicine is safe, pure, and consistent.' },
    { topic: 'Patents', prompt: 'When a blockbuster drug loses patent protection, what opportunity does it create for Indian firms?', options: ['Launch a cheaper generic version', 'They must stop making it', 'Prices rise sharply', 'Nothing changes'], explanation: 'A "patent cliff" lets generic makers launch low-cost copies once exclusivity ends, capturing large volumes. Being first-to-file a generic (with 180-day US exclusivity) is especially lucrative.' },
    { topic: 'Biosimilars', prompt: 'What are "biosimilars"?', options: ['Near-copies of complex biologic drugs made from living cells', 'Identical chemical generics', 'Herbal supplements', 'Medical devices'], explanation: 'Biosimilars are highly similar versions of biologic drugs (made in living cells, e.g. antibodies). They are harder and costlier to make than chemical generics but a big future growth area.' },
    { topic: 'CDMO', prompt: 'What does a CDMO do for pharma companies?', options: ['Contract development & manufacturing of drugs for others', 'Sells insurance', 'Runs hospitals', 'Regulates drugs'], explanation: 'A CDMO (Contract Development & Manufacturing Organisation) develops and/or manufactures drugs on behalf of other pharma firms — a fast-growing, higher-margin outsourcing segment for India.' },
    { topic: 'Quality Control', prompt: 'Why is the QC (Quality Control) lab critical before a batch is released?', options: ['It tests each batch for purity, potency and safety', 'It designs packaging', 'It markets the drug', 'It sets the price'], explanation: 'The QC lab tests raw materials, in-process samples, and finished batches for identity, purity, potency, and contamination. No batch is released for sale until it passes these checks.' },
    { topic: 'Domestic Market', prompt: 'The Indian domestic pharma market is dominated by which type of product?', options: ['Branded generics prescribed by doctors', 'Only imported patented drugs', 'Only OTC vitamins', 'Only injectables'], explanation: 'Unlike the West, India\'s home market runs on "branded generics" — generic molecules sold under company brands, where doctor relationships and brand recall drive prescriptions and pricing.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'discovery', label: 'Discovery', info: 'Research identifies a molecule that could treat a disease — the starting point of a new drug.', x: 14, y: 30, w: 30, h: 34 },
      { id: 'api', label: 'API Synthesis', info: 'The Active Pharmaceutical Ingredient — the molecule that treats the disease — is chemically synthesised.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'formulation', label: 'Formulation', info: 'The API is combined with excipients and processed into a dosage form: tablet, capsule, injectable, or syrup.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'trials', label: 'Clinical Trials', info: 'Phase I-III trials test the drug\'s safety and efficacy in humans before it can be approved.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'approval', label: 'Regulatory Approval', info: 'Regulators (US FDA, CDSCO) review the data and inspect plants before allowing the drug to be sold.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'mfg', label: 'Manufacturing (GMP)', info: 'Commercial-scale production under strict Good Manufacturing Practices ensures every batch is consistent.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'qc', label: 'Quality Control', info: 'The QC lab tests each batch for purity, potency, and safety — nothing ships until it passes.', x: 178, y: 94, w: 26, h: 28 },
      { id: 'packaging', label: 'Packaging', info: 'Approved medicine is blister-packed, labelled with dosage/expiry, and prepared for distribution.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'distribution', label: 'Distribution', info: 'Finished medicines move through distributors and pharmacies to patients — domestically and via export.', x: 42, y: 136, w: 28, h: 30 },
    ],
  },
}
