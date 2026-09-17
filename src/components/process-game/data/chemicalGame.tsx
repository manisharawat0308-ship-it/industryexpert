import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const CHEM = '#0d9488'

// Reward: a chemical drum filling + labelling (6 parts)
function DrumBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const level = Math.min(1, Math.min(parts, 5) / 5)
  const liqTop = 155 - level * 90
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Chemical drum being filled">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* drum body */}
      {show(1) && <rect x="70" y="55" width="80" height="105" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" className="animate-[fadeIn_0.5s_ease]" />}
      {/* liquid fill */}
      {parts >= 1 && <rect x="72" y={liqTop} width="76" height={158 - liqTop} rx="4" fill={CHEM} opacity="0.8" className="animate-[fadeIn_0.4s_ease]" />}
      {/* drum ribs */}
      {show(2) && <><line x1="70" y1="90" x2="150" y2="90" stroke="#94a3b8" strokeWidth="2" /><line x1="70" y1="125" x2="150" y2="125" stroke="#94a3b8" strokeWidth="2" /></>}
      {/* cap */}
      {show(5) && <rect x="98" y="48" width="24" height="10" rx="2" fill="#64748b" />}
      {/* hazard label */}
      {show(6) && <><rect x="88" y="100" width="44" height="34" rx="3" fill="#fff" stroke={CHEM} strokeWidth="1.5" /><polygon points="110,106 118,124 102,124" fill="none" stroke={ORANGE} strokeWidth="2" /><text x="110" y="122" textAnchor="middle" fontSize="8" fill={ORANGE} fontWeight="bold">!</text><circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" /></>}
      {parts === 0 && <rect x="70" y="55" width="80" height="105" rx="8" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="182" textAnchor="middle" fontSize="10" fontWeight="bold" fill={CHEM}>A drum of finished chemical!</text>}
    </svg>
  )
}
function DrumPreview() {
  return (
    <svg viewBox="0 0 50 60" className="w-12 h-14">
      <rect x="12" y="12" width="26" height="42" rx="4" fill={CHEM} opacity="0.8" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="12" y1="26" x2="38" y2="26" stroke="#94a3b8" strokeWidth="1.5" /><line x1="12" y1="40" x2="38" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#f0fdfa" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Feedstock (crude/naphtha/gas) */}
      <rect x="16" y="36" width="22" height="18" rx="2" fill="#334155" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Feedstock</text>
      {/* Cracker */}
      <rect x="76" y="32" width="24" height="22" rx="3" fill="#ef4444" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Cracker</text>
      {/* Building blocks (ethylene) */}
      <circle cx="138" cy="44" r="10" fill="#f59e0b" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Olefins</text>
      {/* Polymerisation */}
      <rect x="178" y="32" width="24" height="22" rx="3" fill="#3b82f6" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Reaction</text>
      {/* Intermediates */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#a855f7" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Intermediates</text>
      {/* Specialty / formulation */}
      <rect x="228" y="98" width="24" height="14" rx="2" fill="#0d9488" /><text x="240" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Specialty</text>
      {/* QC */}
      <circle cx="190" cy="105" r="10" fill="#14b8a6" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">QC</text>
      {/* Product (pellets/drum) */}
      <rect x="130" y="98" width="20" height="16" rx="2" fill="#64748b" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Product</text>
      {/* Dispatch */}
      <rect x="46" y="140" width="18" height="18" rx="2" fill={CHEM} /><text x="55" y="170" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Dispatch</text>
    </>
  )
}

export const CHEMICAL_GAME: IndustryGameData = {
  industryName: 'Chemical',
  brandColor: CHEM,
  processName: 'chemical & petrochemical manufacturing',
  reward: {
    noun: 'Chemical Drum', verb: 'Produce', parts: 6,
    partLabels: ['Feedstock cracked', 'Building blocks made', 'Reaction / polymerisation done', 'Intermediates formed', 'Specialty product formulated', 'QC-passed, drummed & labelled!'],
    renderReward: DrumBuild, renderPreview: DrumPreview,
    completionTitle: 'Your Chemical is Produced!',
    completionSubtitle: 'From feedstock to a finished chemical — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Feedstock', prompt: 'What are the primary feedstocks for the petrochemical industry?', options: ['Crude-oil derivatives like naphtha, and natural gas', 'Iron ore and coke', 'Limestone and gypsum', 'Cotton and wool'], explanation: 'Petrochemicals start from crude-oil cuts (naphtha) or natural gas (ethane). These hydrocarbon feedstocks are "cracked" to make the basic building-block molecules of the chemical industry.' },
    { topic: 'Cracking', prompt: 'What does a "cracker" do in a petrochemical complex?', options: ['Breaks large hydrocarbons into small building-block molecules like ethylene', 'Bakes cement', 'Spins yarn', 'Refines sugar'], explanation: 'A steam or catalytic cracker breaks big hydrocarbon molecules (naphtha/ethane) into small, reactive "olefins" — ethylene and propylene — the foundation molecules for most plastics and chemicals.' },
    { topic: 'Building Blocks', prompt: 'Ethylene and propylene, the industry\'s core building blocks, are examples of:', options: ['Olefins (basic petrochemicals)', 'Fertilizers', 'Metals', 'Ceramics'], explanation: 'Ethylene and propylene are olefins — the basic petrochemicals from which polymers (polyethylene, polypropylene) and countless intermediate chemicals are built.' },
    { topic: 'Polymerisation', prompt: 'How are plastics like polyethylene made from ethylene?', options: ['Polymerisation — linking many small molecules into long chains', 'Distillation', 'Fermentation', 'Calcination'], explanation: 'Polymerisation joins thousands of small monomer molecules (e.g. ethylene) into long polymer chains, producing plastics/resins that are then pelletised for moulding into products.' },
    { topic: 'Commodity vs Specialty', prompt: 'What is the key difference between "commodity" and "specialty" chemicals?', options: ['Commodities are bulk/low-margin; specialties are tailored/high-margin', 'They are identical', 'Specialties are always cheaper', 'Commodities are never sold'], explanation: 'Commodity chemicals (basic polymers, acids) are made in huge volumes at low margins; specialty chemicals are tailored, performance-driven products (agrochem, pigments, additives) with higher margins and stickier customers.' },
    { topic: 'Integration', prompt: 'Why do large players build "integrated" complexes (refinery-to-petrochemicals)?', options: ['To capture more value and control feedstock cost', 'To reduce output', 'To avoid customers', 'To raise import bills'], explanation: 'Integration links a refinery\'s output directly into petrochemical units, securing feedstock, cutting logistics, and capturing margin across the chain — a big advantage for players like Reliance.' },
    { topic: 'Specialty Growth', prompt: 'Why is India seen as a rising hub for specialty chemicals?', options: ['Cost-competitive skilled chemistry plus the "China+1" shift', 'It has no chemical industry', 'It only imports chemicals', 'It banned manufacturing'], explanation: 'Global buyers diversifying away from China ("China+1"), plus India\'s skilled chemists and lower costs, are driving investment into Indian specialty chemicals (agrochem, pharma intermediates, fluorochemicals).' },
    { topic: 'Safety', prompt: 'Why is process safety especially critical in chemical plants?', options: ['They handle flammable, toxic and reactive materials at high pressure/temperature', 'Chemicals are always harmless', 'There is no risk', 'Only paperwork matters'], explanation: 'Chemical processes involve flammable, toxic, and reactive substances under heat and pressure, so rigorous process-safety management (containment, relief systems, controls) is essential to prevent fires, releases, and explosions.' },
    { topic: 'End Uses', prompt: 'Which everyday sectors depend heavily on chemical-industry outputs?', options: ['Agriculture, packaging, autos, textiles, pharma and construction', 'Only mining', 'Only banking', 'None'], explanation: 'Chemicals are foundational: fertilizers/agrochem feed farming, polymers make packaging and auto parts, dyes colour textiles, and intermediates enable pharma and paints — touching nearly every industry.' },
    { topic: 'Fluorochemicals', prompt: 'Which high-value niche is a fast-growing strength for Indian specialty players?', options: ['Fluorochemicals and agrochemical intermediates', 'Newsprint', 'Sugar refining', 'Cement grinding'], explanation: 'Indian firms have built strong positions in fluorochemicals, agrochemical technicals, and custom synthesis (CRAMS) — high-margin niches benefiting from global supply-chain diversification.' },
    { topic: 'Sustainability', prompt: 'A major sustainability push in chemicals is toward:', options: ['Green chemistry, recycling and lower-emission processes', 'More waste', 'Higher emissions', 'Less efficiency'], explanation: 'The industry is investing in green chemistry, plastics recycling, bio-based feedstocks, and lower-emission processes to cut its environmental footprint and meet tightening regulations.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'feedstock', label: 'Feedstock', info: 'Crude-oil derivatives (naphtha) or natural gas (ethane) — the hydrocarbon raw materials for petrochemicals.', x: 14, y: 32, w: 26, h: 32 },
      { id: 'cracker', label: 'Cracker', info: 'Breaks large hydrocarbons into small, reactive building-block molecules like ethylene and propylene.', x: 74, y: 28, w: 28, h: 36 },
      { id: 'olefins', label: 'Olefins', info: 'The basic petrochemicals (ethylene, propylene) that everything else is built from.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'reaction', label: 'Reaction / Polymerisation', info: 'Building blocks are polymerised or reacted into plastics, resins, and intermediate chemicals.', x: 176, y: 28, w: 28, h: 36 },
      { id: 'intermediates', label: 'Intermediates', info: 'Mid-chain chemicals that feed further processing into specialty products and formulations.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'specialty', label: 'Specialty / Formulation', info: 'Tailored, high-margin products — agrochemicals, pigments, additives — formulated for specific uses.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'qc', label: 'Quality Control', info: 'Batches are tested for purity and specification before they can be packed and shipped.', x: 178, y: 94, w: 26, h: 28 },
      { id: 'product', label: 'Product', info: 'The finished chemical or plastic pellets — the plant\'s output, ready for packing.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'dispatch', label: 'Dispatch', info: 'Products are drummed, bagged, or bulk-loaded and shipped to industries from agriculture to autos.', x: 42, y: 136, w: 26, h: 30 },
    ],
  },
}
