import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const ANC = '#0369a1'

// Reward: a brake-disc / wheel-hub assembly built up (6 parts)
function BrakeAssemblyBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Auto component being assembled">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* disc rotor */}
      {show(1) && <circle cx="110" cy="105" r="62" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" className="animate-[fadeIn_0.5s_ease]" />}
      {/* vented slots */}
      {show(2) && Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <line key={i} x1={110 + Math.cos(a) * 30} y1={105 + Math.sin(a) * 30} x2={110 + Math.cos(a) * 58} y2={105 + Math.sin(a) * 58} stroke="#94a3b8" strokeWidth="3" />
      })}
      {/* hub */}
      {show(3) && <circle cx="110" cy="105" r="24" fill="#64748b" className="animate-[fadeIn_0.5s_ease]" />}
      {/* bolt holes */}
      {show(4) && Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        return <circle key={i} cx={110 + Math.cos(a) * 15} cy={105 + Math.sin(a) * 15} r="3.5" fill="#1f2937" />
      })}
      {/* caliper */}
      {show(5) && <rect x="150" y="80" width="26" height="42" rx="6" fill={ANC} className="animate-[fadeIn_0.5s_ease]" />}
      {/* finish */}
      {show(6) && <><circle cx="110" cy="105" r="8" fill="#334155" /><circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" /><circle cx="110" cy="105" r="66" fill="none" stroke={GREEN} strokeWidth="2" /></>}
      {parts === 0 && <circle cx="110" cy="105" r="62" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="188" textAnchor="middle" fontSize="10" fontWeight="bold" fill={ANC}>A precision component, ready!</text>}
    </svg>
  )
}
function BrakePreview() {
  return (
    <svg viewBox="0 0 60 60" className="w-14 h-14">
      <circle cx="30" cy="30" r="24" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="10" fill="#64748b" />
      <rect x="46" y="20" width="9" height="20" rx="3" fill={ANC} />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#eff6ff" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Raw material */}
      <rect x="18" y="36" width="20" height="16" rx="2" fill="#64748b" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Metal/Resin</text>
      {/* Forming (casting/forging/moulding) */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#f59e0b" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Forming</text>
      {/* Machining */}
      <circle cx="138" cy="44" r="10" fill="#3b82f6" /><circle cx="138" cy="44" r="4" fill="#eff6ff" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Machining</text>
      {/* Heat treat / coating */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#ef4444" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Heat Treat</text>
      {/* Sub-assembly */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#14b8a6" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Assembly</text>
      {/* QC / metrology */}
      <circle cx="240" cy="105" r="11" fill="#a855f7" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Quality</text>
      {/* Component */}
      <circle cx="190" cy="105" r="11" fill="#cbd5e1" stroke="#94a3b8" /><circle cx="190" cy="105" r="4" fill="#64748b" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Component</text>
      {/* Supply to OEM (Tier-1) */}
      <rect x="128" y="98" width="24" height="16" rx="2" fill="#0891b2" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">To OEM</text>
      {/* Aftermarket */}
      <rect x="46" y="140" width="20" height="18" rx="2" fill={ANC} /><text x="56" y="170" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Aftermarket</text>
    </>
  )
}

export const AUTO_ANCILLARY_GAME: IndustryGameData = {
  industryName: 'Auto Components',
  brandColor: ANC,
  processName: 'auto-component manufacturing',
  reward: {
    noun: 'Component', verb: 'Manufacture', parts: 6,
    partLabels: ['Rotor cast/forged', 'Cooling vanes machined', 'Hub fitted', 'Mounting holes drilled', 'Caliper assembled', 'Coated, QC-checked & shipped!'],
    renderReward: BrakeAssemblyBuild, renderPreview: BrakePreview,
    completionTitle: 'Your Component is Ready!',
    completionSubtitle: 'From raw metal to a precision auto part — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'What They Make', prompt: 'What does the "auto ancillary" (auto components) industry supply?', options: ['Parts and systems that go into vehicles', 'Finished cars only', 'Crude oil', 'Cement'], explanation: 'Auto-component makers supply the thousands of parts and systems — engines parts, transmissions, brakes, electricals, interiors, tyres — that vehicle makers (OEMs) assemble into cars, trucks, and two-wheelers.' },
    { topic: 'Tier System', prompt: 'A "Tier-1" supplier is one that:', options: ['Supplies finished systems directly to the OEM', 'Mines the ore', 'Sells cars to customers', 'Only makes raw steel'], explanation: 'The supply chain is tiered: Tier-1 suppliers sell complete systems/modules directly to OEMs; Tier-2 and Tier-3 make sub-components and materials that feed Tier-1s.' },
    { topic: 'OEM vs Aftermarket', prompt: 'Component makers sell to two main channels. What are they?', options: ['OEM (to vehicle makers) and aftermarket (replacement)', 'Retail and mining', 'Export only and scrap', 'Farming and defence'], explanation: 'Suppliers sell to OEMs for new-vehicle assembly, and to the aftermarket (replacement parts for vehicles already on the road) — the aftermarket is often steadier and higher-margin.' },
    { topic: 'Forming', prompt: 'Metal components often start by being shaped through:', options: ['Casting, forging or stamping', 'Baking', 'Distillation', 'Fermentation'], explanation: 'Metal parts are formed by casting (pouring molten metal into moulds), forging (pressing/hammering to shape), or stamping (pressing sheet). Plastic parts are injection-moulded.' },
    { topic: 'Machining', prompt: 'After forming, precision surfaces are created by:', options: ['Machining (turning, milling, drilling, grinding)', 'Painting', 'Welding only', 'Boiling'], explanation: 'CNC machining — turning, milling, drilling, grinding — removes material to hit tight tolerances on mating surfaces (e.g. brake discs, gears), which is critical for fit and durability.' },
    { topic: 'Content per Vehicle', prompt: 'A key growth metric for the sector is "content per vehicle". What does it measure?', options: ['The value of components in each vehicle', 'The number of dealers', 'The paint colour', 'The fuel tank size'], explanation: 'Content per vehicle is the rupee value of parts a supplier provides per car. It rises as vehicles add features (safety, electronics, EV systems), driving supplier growth even if unit volumes are flat.' },
    { topic: 'EV Transition', prompt: 'How does the shift to EVs affect component makers?', options: ['It removes engine/gearbox parts but adds battery, motor and power-electronics content', 'It ends the industry', 'It has no effect', 'It only reduces tyres'], explanation: 'EVs eliminate many engine and transmission parts but create new demand for battery systems, motors, power electronics, and thermal management — forcing suppliers to re-skill and re-invest.' },
    { topic: 'Quality', prompt: 'Why is quality (e.g. PPM defect rates) so critical for Tier-1 suppliers?', options: ['A defective part can fail a vehicle and trigger costly recalls', 'It does not matter', 'OEMs never inspect parts', 'Only price matters'], explanation: 'Auto parts are safety-critical and made in millions, so defects are tracked in parts-per-million (PPM). Poor quality risks line stoppages, recalls, and losing OEM business — quality is non-negotiable.' },
    { topic: 'Exports', prompt: 'Indian component makers increasingly earn from:', options: ['Exports to global OEMs and aftermarkets', 'Selling cement', 'Mining lithium', 'Running airlines'], explanation: 'India\'s cost-competitive, quality-certified suppliers export a growing share to global OEMs and aftermarkets in the US and Europe, making exports a key growth and de-risking lever.' },
    { topic: 'Localisation Push', prompt: 'Government schemes for the sector aim to:', options: ['Deepen local manufacturing of high-tech auto components', 'Increase imports of parts', 'Close down suppliers', 'Ban exports'], explanation: 'PLI and localisation schemes encourage domestic making of advanced components (EV parts, electronics, sensors) to cut imports, build capability, and capture more value in India.' },
    { topic: 'Heat Treatment', prompt: 'Why are many metal auto parts "heat treated"?', options: ['To harden them and improve strength and wear resistance', 'To colour them', 'To make them lighter only', 'To dissolve them'], explanation: 'Heat treatment (hardening, tempering, case-hardening) alters a metal part\'s microstructure to boost hardness, strength, and wear resistance — essential for gears, shafts, and brake components.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'material', label: 'Raw Material', info: 'Metal (steel, aluminium), rubber, or engineering plastic/resin sourced as the starting input.', x: 14, y: 32, w: 26, h: 32 },
      { id: 'forming', label: 'Forming', info: 'The part is shaped by casting, forging, or stamping (metal) or injection moulding (plastics).', x: 74, y: 30, w: 28, h: 34 },
      { id: 'machining', label: 'Machining', info: 'CNC turning, milling, drilling, and grinding create precision surfaces to tight tolerances.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'heattreat', label: 'Heat Treat / Coating', info: 'Hardening and coating boost strength, wear resistance, and corrosion protection.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'assembly', label: 'Sub-Assembly', info: 'Machined parts are assembled into a finished module or system (e.g. a brake or pump assembly).', x: 226, y: 30, w: 30, h: 30 },
      { id: 'quality', label: 'Quality / Metrology', info: 'Dimensional and functional testing (tracked in PPM) ensures safety-critical parts meet OEM specs.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'component', label: 'Component', info: 'The finished, inspected component — the supplier\'s product, ready to ship.', x: 178, y: 94, w: 26, h: 28 },
      { id: 'oem', label: 'Supply to OEM', info: 'Tier-1 suppliers deliver finished systems just-in-time to vehicle makers\' assembly lines.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'aftermarket', label: 'Aftermarket', info: 'Replacement parts are also sold to the aftermarket for vehicles already on the road — a steady, high-margin channel.', x: 42, y: 136, w: 28, h: 30 },
    ],
  },
}
