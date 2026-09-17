import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const TYRE = '#1f2937'

// Reward: a tyre built up ring by ring (6 parts)
function TyreBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Tyre being built">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* carcass ply (inner ring) */}
      {show(1) && <circle cx="110" cy="105" r="70" fill="none" stroke="#9ca3af" strokeWidth="10" className="animate-[fadeIn_0.5s_ease]" />}
      {/* beads */}
      {show(2) && <><circle cx="110" cy="105" r="42" fill="none" stroke="#6b7280" strokeWidth="4" /></>}
      {/* belts */}
      {show(3) && <circle cx="110" cy="105" r="76" fill="none" stroke="#4b5563" strokeWidth="6" className="animate-[fadeIn_0.5s_ease]" />}
      {/* tread band */}
      {show(4) && <circle cx="110" cy="105" r="82" fill="none" stroke={TYRE} strokeWidth="12" className="animate-[fadeIn_0.5s_ease]" />}
      {/* tread pattern */}
      {show(5) && Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2
        return <line key={i} x1={110 + Math.cos(a) * 76} y1={105 + Math.sin(a) * 76} x2={110 + Math.cos(a) * 88} y2={105 + Math.sin(a) * 88} stroke="#f8fafc" strokeWidth="3" />
      })}
      {/* rim + finish */}
      {show(6) && <><circle cx="110" cy="105" r="34" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" /><circle cx="110" cy="105" r="8" fill="#94a3b8" /><circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" /><circle cx="110" cy="105" r="88" fill="none" stroke={GREEN} strokeWidth="2" /></>}
      {parts === 0 && <circle cx="110" cy="105" r="80" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="192" textAnchor="middle" fontSize="10" fontWeight="bold" fill={TYRE}>A road-ready tyre!</text>}
    </svg>
  )
}
function TyrePreview() {
  return (
    <svg viewBox="0 0 60 60" className="w-14 h-14">
      <circle cx="30" cy="30" r="24" fill="none" stroke={TYRE} strokeWidth="8" />
      <circle cx="30" cy="30" r="10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#f1f5f9" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Rubber (NR/SR) + carbon black */}
      <circle cx="28" cy="44" r="8" fill="#334155" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Rubber+Black</text>
      {/* Mixing (Banbury) */}
      <rect x="76" y="34" width="24" height="20" rx="3" fill="#3b82f6" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Mixing</text>
      {/* Milling / calendering */}
      <circle cx="138" cy="44" r="10" fill="#f59e0b" /><circle cx="138" cy="44" r="4" fill="#f1f5f9" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Calendering</text>
      {/* Extrusion (tread) */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#14b8a6" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Extrusion</text>
      {/* Components (bead/ply/belt) */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#a855f7" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Components</text>
      {/* Building (green tyre) */}
      <circle cx="240" cy="105" r="12" fill="none" stroke="#6b7280" strokeWidth="4" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Building</text>
      {/* Curing (press) */}
      <rect x="176" y="96" width="28" height="18" rx="3" fill="#ef4444" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Curing</text>
      {/* Inspection */}
      <circle cx="140" cy="105" r="11" fill="none" stroke={TYRE} strokeWidth="6" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Inspection</text>
      {/* Dispatch */}
      <rect x="46" y="140" width="18" height="20" rx="2" fill={TYRE} /><text x="55" y="172" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Dispatch</text>
    </>
  )
}

export const TYRE_GAME: IndustryGameData = {
  industryName: 'Tyre',
  brandColor: TYRE,
  processName: 'tyre manufacturing',
  reward: {
    noun: 'Tyre', verb: 'Build', parts: 6,
    partLabels: ['Carcass ply laid', 'Beads set', 'Steel belts added', 'Tread band applied', 'Tread pattern cured', 'Rim-mounted & inspected!'],
    renderReward: TyreBuild, renderPreview: TyrePreview,
    completionTitle: 'Your Tyre is Built!',
    completionSubtitle: 'From raw rubber to a road-ready tyre — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Raw Materials', prompt: 'What is the single largest raw-material cost in tyre making?', options: ['Rubber (natural + synthetic)', 'Steel wire', 'Carbon black', 'Textile fabric'], explanation: 'Rubber — a blend of natural rubber (from latex) and synthetic rubber (from crude derivatives) — is the biggest input cost. This is why tyre-maker margins swing with rubber and crude prices.' },
    { topic: 'Carbon Black', prompt: 'Why is carbon black added to the rubber compound?', options: ['To reinforce the rubber and improve wear/strength', 'To colour it black only', 'To make it lighter', 'To speed up curing alone'], explanation: 'Carbon black is a reinforcing filler that dramatically improves the strength, abrasion-resistance, and durability of the rubber. It also gives tyres their black colour.' },
    { topic: 'Mixing', prompt: 'The first process step blends rubber with carbon black, oils and chemicals. What is it called?', options: ['Mixing / compounding (in a Banbury mixer)', 'Curing', 'Extrusion', 'Building'], explanation: 'In compounding, rubber is mixed with carbon black, silica, oils, sulphur, and accelerators in an internal (Banbury) mixer to make a specific compound for each tyre component.' },
    { topic: 'Components', prompt: 'A radial tyre is built from several components. Which set gives it strength and shape?', options: ['Body ply, steel belts and bead wires', 'Only the tread', 'Just the sidewall paint', 'The valve alone'], explanation: 'A tyre is an assembly: body plies (fabric), steel belts (under the tread), bead wires (that grip the rim), inner liner (air seal), sidewall, and tread. Each is made separately then assembled.' },
    { topic: 'Extrusion', prompt: 'How is the tread and sidewall rubber shaped into a continuous profile?', options: ['Extrusion through a die', 'Casting in a mould', 'Weaving', 'Grinding'], explanation: 'The tread and sidewall compounds are forced through an extruder die to form a continuous shaped strip, which is then cut to length for tyre building.' },
    { topic: 'Calendering', prompt: 'What does calendering do in tyre making?', options: ['Coats fabric/steel cords with rubber into sheets', 'Cures the tyre', 'Inflates the tyre', 'Paints the sidewall'], explanation: 'Calendering passes textile fabric or steel cords between rollers coated with rubber, producing rubberised ply sheets used as the tyre\'s reinforcing layers.' },
    { topic: 'Green Tyre', prompt: 'When all components are assembled on a drum but not yet cured, the result is called a:', options: ['Green tyre', 'Retread', 'Radial', 'Bias tyre'], explanation: 'The tyre-building machine assembles all components into an uncured "green tyre". It has the right shape but the rubber is still soft and unbonded — curing comes next.' },
    { topic: 'Curing', prompt: 'The green tyre is placed in a hot mould under pressure. What does this "curing" (vulcanisation) achieve?', options: ['Cross-links the rubber and moulds in the tread pattern', 'Cools the tyre', 'Adds air', 'Removes carbon black'], explanation: 'In curing, heat and pressure vulcanise the rubber (sulphur cross-links the polymer chains), permanently bonding all components and moulding in the tread pattern and sidewall markings.' },
    { topic: 'Radial vs Bias', prompt: 'Modern passenger and truck tyres are mostly which construction?', options: ['Radial', 'Bias (cross-ply)', 'Solid', 'Tubed only'], explanation: 'Radial tyres (body plies run radially, plus steel belts) give lower rolling resistance, better mileage, and a cooler run than older bias-ply tyres, so radialisation dominates — especially in trucks.' },
    { topic: 'Inspection', prompt: 'After curing, what final step ensures each tyre is safe to sell?', options: ['Inspection & uniformity/X-ray testing', 'Re-mixing', 'Re-extrusion', 'Repainting'], explanation: 'Every cured tyre is inspected visually and tested for uniformity, balance, and hidden defects (X-ray/shearography) before it is approved, marked, and dispatched.' },
    { topic: 'Demand', prompt: 'The larger, more profitable share of tyre demand comes from which market?', options: ['Replacement market (tyres wear out)', 'One-time exports only', 'Scrap dealers', 'Retreaders only'], explanation: 'Roughly two-thirds of tyre demand is replacement (tyres wear out and are re-bought), which is more stable and higher-margin than sales to vehicle makers (OEM).' },
    { topic: 'EV Impact', prompt: 'Why do electric vehicles need specially engineered tyres?', options: ['Higher weight & instant torque wear tyres faster; low noise is needed', 'They do not use tyres', 'They only use bias tyres', 'Tyres are irrelevant for EVs'], explanation: 'EVs are heavier (battery) with instant torque, wearing tyres faster, and their quiet cabins demand low-noise, low-rolling-resistance tyres — a growing premium segment for tyre makers.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'raw', label: 'Rubber & Carbon Black', info: 'Natural + synthetic rubber (largest cost) plus reinforcing carbon black, silica, oils, and curing chemicals.', x: 14, y: 30, w: 30, h: 34 },
      { id: 'mixing', label: 'Mixing / Compounding', info: 'A Banbury mixer blends rubber with fillers and chemicals into a tailored compound for each component.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'calendering', label: 'Calendering', info: 'Coats textile fabric and steel cords with rubber to make the reinforcing ply and belt sheets.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'extrusion', label: 'Extrusion', info: 'Forces tread and sidewall compound through a die to form continuous shaped rubber strips.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'components', label: 'Components', info: 'Beads, plies, belts, inner liner, and tread are prepared separately, ready to be assembled.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'building', label: 'Tyre Building', info: 'A building drum assembles all components into an uncured "green tyre" with the right shape.', x: 226, y: 92, w: 30, h: 30 },
      { id: 'curing', label: 'Curing (Vulcanisation)', info: 'Heat and pressure in a mould cross-link the rubber and stamp in the tread pattern and markings.', x: 174, y: 94, w: 32, h: 30 },
      { id: 'inspection', label: 'Inspection', info: 'Every tyre is visually checked and tested (uniformity, X-ray) for hidden defects before approval.', x: 128, y: 92, w: 26, h: 32 },
      { id: 'dispatch', label: 'Dispatch', info: 'Approved tyres are marked and shipped to vehicle makers (OEM) and the larger replacement market.', x: 42, y: 136, w: 28, h: 30 },
    ],
  },
}
