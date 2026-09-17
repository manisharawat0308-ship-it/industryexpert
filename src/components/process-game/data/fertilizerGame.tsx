import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const FERT = '#15803d'

// Reward: a fertilizer bag filling with granules (6 parts)
function FertBagBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const level = Math.min(1, Math.min(parts, 5) / 5)
  const top = 158 - level * 92
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Fertilizer bag being filled">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* bag */}
      {show(1) && <path d="M66 62 L154 62 L150 162 L70 162 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" className="animate-[fadeIn_0.5s_ease]" />}
      {/* granule fill */}
      {parts >= 1 && <path d={`M70 ${top} L150 ${top} L150 158 L70 158 Z`} fill={FERT} opacity="0.8" className="animate-[fadeIn_0.4s_ease]" />}
      {/* granule dots texture */}
      {show(3) && Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={80 + (i % 4) * 20} cy={130 + Math.floor(i / 4) * 12} r="2" fill="#ffffff" opacity="0.6" />)}
      {/* top stitch */}
      {show(5) && <rect x="62" y="55" width="96" height="9" rx="2" fill="#cbd5e1" />}
      {/* label */}
      {show(6) && <><rect x="82" y="95" width="60" height="34" rx="3" fill="#fff" stroke={FERT} strokeWidth="1.5" /><text x="112" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill={FERT}>UREA</text><text x="112" y="122" textAnchor="middle" fontSize="6" fill="#64748b">46% N • 45 kg</text><circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" /></>}
      {parts === 0 && <path d="M66 62 L154 62 L150 162 L70 162 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="184" textAnchor="middle" fontSize="10" fontWeight="bold" fill={FERT}>A bag of fertilizer, ready!</text>}
    </svg>
  )
}
function FertPreview() {
  return (
    <svg viewBox="0 0 50 60" className="w-12 h-14">
      <path d="M12 14 L38 14 L36 54 L14 54 Z" fill={FERT} opacity="0.8" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="17" y="28" width="16" height="12" rx="2" fill="#fff" stroke={FERT} strokeWidth="1" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#f0fdf4" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Natural gas */}
      <rect x="16" y="36" width="22" height="18" rx="2" fill="#334155" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Natural Gas</text>
      {/* Reformer (H2) */}
      <rect x="76" y="32" width="24" height="22" rx="3" fill="#ef4444" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Reformer</text>
      {/* Ammonia synthesis */}
      <circle cx="138" cy="44" r="11" fill="#3b82f6" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Ammonia</text>
      {/* Urea reactor */}
      <rect x="178" y="32" width="24" height="22" rx="3" fill="#f59e0b" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Urea Reactor</text>
      {/* Prilling tower */}
      <polygon points="230,52 240,30 250,52" fill="#a855f7" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Prilling</text>
      {/* Granulation */}
      <circle cx="240" cy="105" r="11" fill="#14b8a6" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Granules</text>
      {/* Bagging */}
      <path d="M182 98 L200 98 L198 114 L184 114 Z" fill="#15803d" /><text x="190" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Bagging</text>
      {/* Distribution (subsidy) */}
      <rect x="128" y="98" width="24" height="16" rx="2" fill="#0891b2" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Distribution</text>
      {/* Farmer */}
      <circle cx="55" cy="146" r="8" fill={FERT} /><text x="55" y="168" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Farmer</text>
    </>
  )
}

export const FERTILIZER_GAME: IndustryGameData = {
  industryName: 'Fertilizer',
  brandColor: FERT,
  processName: 'fertilizer manufacturing',
  reward: {
    noun: 'Bag of Fertilizer', verb: 'Produce', parts: 6,
    partLabels: ['Gas reformed to hydrogen', 'Ammonia synthesised', 'Urea reacted', 'Prilled/granulated', 'Cooled & screened', 'Bagged, labelled & dispatched!'],
    renderReward: FertBagBuild, renderPreview: FertPreview,
    completionTitle: 'Your Fertilizer is Ready!',
    completionSubtitle: 'From natural gas to a bag of nutrients — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Main Product', prompt: 'Which is India\'s most produced and consumed fertilizer?', options: ['Urea', 'DAP', 'Potash', 'Gypsum'], explanation: 'Urea (46% nitrogen) is by far India\'s most used fertilizer. It is heavily subsidised and price-controlled, making it central to both farm economics and government policy.' },
    { topic: 'Feedstock', prompt: 'What is the main feedstock for making urea in India?', options: ['Natural gas', 'Coal only', 'Crude oil', 'Limestone'], explanation: 'Most Indian urea plants use natural gas as feedstock and fuel. Gas is reformed to produce hydrogen, which is combined with nitrogen from the air to make ammonia — the precursor to urea.' },
    { topic: 'Ammonia', prompt: 'Ammonia — the key intermediate — is made by combining hydrogen with which element from the air?', options: ['Nitrogen', 'Oxygen', 'Carbon', 'Argon'], explanation: 'In the Haber-Bosch process, hydrogen (from gas) reacts with nitrogen (from air) under high pressure/temperature over a catalyst to form ammonia (NH3), the building block of nitrogen fertilizers.' },
    { topic: 'Urea Reaction', prompt: 'Urea is produced by reacting ammonia with which gas (often captured from the plant itself)?', options: ['Carbon dioxide (CO2)', 'Methane', 'Chlorine', 'Hydrogen'], explanation: 'Ammonia reacts with carbon dioxide (CO2) to form urea. Plants often capture CO2 from their own reforming step, making the process partly integrated and efficient.' },
    { topic: 'Prilling', prompt: 'What does "prilling" or "granulation" do to the urea melt?', options: ['Forms it into solid spherical granules for handling', 'Dyes it green', 'Dissolves it in water', 'Bags it directly'], explanation: 'The molten urea is sprayed down a prilling tower or granulated so it solidifies into uniform, free-flowing granules that are easy to store, transport, and spread on fields.' },
    { topic: 'NPK', prompt: 'What do the letters N-P-K on a fertilizer bag stand for?', options: ['Nitrogen, Phosphorus, Potassium — the three primary nutrients', 'New Product Kit', 'Natural Plant Kernel', 'Nitrate, Protein, Kaolin'], explanation: 'N-P-K are the three primary plant nutrients: Nitrogen (leaf growth), Phosphorus (roots/flowering), Potassium (overall health). Complex fertilizers blend them in specific ratios for different crops.' },
    { topic: 'Complex Fertilizers', prompt: 'DAP and NPK grades are "complex fertilizers" that mainly supply which nutrients (beyond nitrogen)?', options: ['Phosphorus and potassium', 'Only water', 'Only carbon', 'Only sulphur'], explanation: 'Complex fertilizers like DAP (di-ammonium phosphate) and NPK grades supply phosphorus and potassium alongside nitrogen. India imports most of its phosphate rock and potash, unlike gas-based urea.' },
    { topic: 'Subsidy', prompt: 'Why is the fertilizer sector so dependent on government policy?', options: ['Prices are subsidised/controlled to keep fertilizer affordable for farmers', 'It exports everything', 'There is no demand', 'Farmers do not use it'], explanation: 'The government subsidises fertilizer (urea under statutory price control; P&K under the Nutrient-Based Subsidy scheme) so farmers pay far less than production cost. Subsidy timing directly affects company cash flows.' },
    { topic: 'Import Dependence', prompt: 'Which raw materials for complex fertilizers does India largely import?', options: ['Rock phosphate, phosphoric acid and potash', 'Natural gas only', 'Water', 'Steel'], explanation: 'India has little domestic rock phosphate and no commercial potash, so it imports these (and phosphoric acid/finished DAP), leaving complex-fertilizer makers exposed to global prices and forex.' },
    { topic: 'Nano Fertilizer', prompt: 'What innovation aims to cut bulk urea use and subsidy in India?', options: ['Nano Urea (liquid, sprayed on leaves)', 'Bigger bags', 'More imports', 'Banning fertilizer'], explanation: 'Nano Urea delivers nitrogen in a concentrated liquid sprayed on leaves, so a small bottle can replace a bag of granular urea — reducing subsidy, imports, and environmental run-off.' },
    { topic: 'Monsoon', prompt: 'Why does fertilizer demand swing with the monsoon?', options: ['Good rains expand sowing and boost nutrient demand', 'Rain destroys fertilizer', 'Demand is fixed', 'Only winter matters'], explanation: 'Fertilizer use tracks crop sowing, which depends on monsoon rains and reservoir levels. A good monsoon lifts acreage and fertilizer demand; a poor one depresses it — making the sector weather-sensitive.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'gas', label: 'Natural Gas', info: 'The main feedstock and fuel for Indian urea plants — reformed to produce the hydrogen needed for ammonia.', x: 14, y: 32, w: 26, h: 32 },
      { id: 'reformer', label: 'Reformer', info: 'Reforms natural gas with steam to produce hydrogen — the first key step toward ammonia.', x: 74, y: 28, w: 28, h: 36 },
      { id: 'ammonia', label: 'Ammonia Synthesis', info: 'Hydrogen combines with nitrogen from the air (Haber-Bosch) to make ammonia — the core intermediate.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'urea', label: 'Urea Reactor', info: 'Ammonia reacts with CO2 (often captured on-site) to form urea, India\'s most-used fertilizer.', x: 176, y: 28, w: 28, h: 36 },
      { id: 'prilling', label: 'Prilling Tower', info: 'Molten urea is solidified into uniform granules or prills that are easy to store and spread.', x: 226, y: 28, w: 30, h: 32 },
      { id: 'granules', label: 'Granulation', info: 'Granules are cooled and screened to a consistent size before packing.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'bagging', label: 'Bagging', info: 'Finished fertilizer is filled into 45 kg bags, labelled with the nutrient grade (e.g. 46% N).', x: 178, y: 94, w: 26, h: 28 },
      { id: 'distribution', label: 'Distribution', info: 'Bags move through the subsidised distribution network of dealers and cooperatives to reach farmers.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'farmer', label: 'Farmer', info: 'The end user. Demand tracks crop sowing and the monsoon, and prices are kept low by government subsidy.', x: 44, y: 136, w: 24, h: 30 },
    ],
  },
}
