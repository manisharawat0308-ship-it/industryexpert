import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const ELEC = '#dc2626'

// Reward: a smartphone assembled part by part (6 parts)
function PhoneBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Smartphone being assembled">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* chassis */}
      {show(1) && <rect x="82" y="30" width="56" height="140" rx="12" fill="#e5e7eb" stroke="#94a3b8" strokeWidth="2" className="animate-[fadeIn_0.5s_ease]" />}
      {/* PCB / board */}
      {show(2) && <rect x="90" y="42" width="40" height="40" rx="3" fill="#16a34a" opacity="0.85" className="animate-[fadeIn_0.5s_ease]" />}
      {show(2) && <><rect x="96" y="50" width="10" height="10" fill="#0f172a" /><rect x="112" y="52" width="8" height="8" fill="#0f172a" /></>}
      {/* battery */}
      {show(3) && <rect x="90" y="88" width="40" height="34" rx="3" fill="#f59e0b" className="animate-[fadeIn_0.5s_ease]" />}
      {/* screen */}
      {show(4) && <rect x="88" y="40" width="44" height="110" rx="6" fill={show(6) ? '#0ea5e9' : '#111827'} opacity="0.9" className="animate-[fadeIn_0.5s_ease]" />}
      {/* camera + button */}
      {show(5) && <><circle cx="110" cy="36" r="3" fill="#111" /><rect x="100" y="158" width="20" height="4" rx="2" fill="#94a3b8" /></>}
      {/* powered on */}
      {show(6) && <><text x="110" y="98" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">Hello!</text><circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" /></>}
      {parts === 0 && <rect x="82" y="30" width="56" height="140" rx="12" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="188" textAnchor="middle" fontSize="10" fontWeight="bold" fill={ELEC}>A working smartphone!</text>}
    </svg>
  )
}
function PhonePreview() {
  return (
    <svg viewBox="0 0 40 60" className="w-10 h-14">
      <rect x="8" y="6" width="24" height="48" rx="6" fill="#111827" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="11" y="12" width="18" height="34" rx="2" fill="#0ea5e9" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#fef2f2" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Design */}
      <circle cx="28" cy="44" r="9" fill="#a855f7" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Design</text>
      {/* Components / chips */}
      <rect x="78" y="36" width="20" height="16" rx="2" fill="#0f172a" /><text x="88" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Components</text>
      {/* PCB fabrication */}
      <rect x="128" y="34" width="20" height="18" rx="2" fill="#16a34a" /><text x="138" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">PCB</text>
      {/* SMT assembly */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#3b82f6" /><text x="190" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">SMT</text>
      {/* Box build */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#f59e0b" /><text x="240" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Assembly</text>
      {/* Testing */}
      <circle cx="240" cy="105" r="11" fill="#ef4444" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Testing</text>
      {/* Firmware */}
      <rect x="178" y="98" width="24" height="14" rx="2" fill="#14b8a6" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Firmware</text>
      {/* Packaging */}
      <rect x="128" y="98" width="24" height="16" rx="2" fill="#a855f7" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Packaging</text>
      {/* Dispatch */}
      <rect x="46" y="140" width="18" height="20" rx="2" fill={ELEC} /><text x="55" y="172" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Dispatch</text>
    </>
  )
}

export const ELECTRONICS_GAME: IndustryGameData = {
  industryName: 'Electronics',
  brandColor: ELEC,
  processName: 'electronics manufacturing',
  reward: {
    noun: 'Smartphone', verb: 'Assemble', parts: 6,
    partLabels: ['Chassis prepared', 'PCB populated (SMT)', 'Battery fitted', 'Display bonded', 'Camera & buttons added', 'Firmware loaded & powered on!'],
    renderReward: PhoneBuild, renderPreview: PhonePreview,
    completionTitle: 'Your Smartphone is Built!',
    completionSubtitle: 'From design to a working device — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'ESDM', prompt: 'The Indian electronics sector is often called "ESDM". What does it cover?', options: ['Electronics System Design & Manufacturing', 'Electrical Steel Distribution & Marketing', 'Energy Storage Data Management', 'Export Sales & Domestic Marketing'], explanation: 'ESDM = Electronics System Design & Manufacturing — spanning chip/product design, component making, and assembly. India is scaling this via PLI schemes, especially in mobile phones.' },
    { topic: 'PCB', prompt: 'What is a PCB, the backbone of every electronic device?', options: ['Printed Circuit Board — connects and mounts components', 'Power Control Battery', 'Plastic Casing Body', 'Product Cost Base'], explanation: 'The Printed Circuit Board (PCB) is the flat board with etched copper tracks that mechanically holds and electrically connects the chips, resistors, and other components of a device.' },
    { topic: 'SMT', prompt: 'How are tiny components mounted onto a modern PCB at high speed?', options: ['Surface-Mount Technology (SMT) pick-and-place + reflow soldering', 'By hand only', 'With glue guns', 'By 3D printing'], explanation: 'SMT lines use pick-and-place robots to place thousands of tiny components onto solder paste, then a reflow oven melts the paste to bond them — the core of high-volume electronics assembly.' },
    { topic: 'Semiconductors', prompt: 'Where are the "brains" (chips/ICs) of electronics made?', options: ['In semiconductor fabs (fabrication plants)', 'In steel mills', 'In cement kilns', 'In textile looms'], explanation: 'Integrated circuits are made in semiconductor fabs, where silicon wafers are patterned layer by layer. India is investing to build its first large fabs and ATMP (assembly/test) plants.' },
    { topic: 'Fab vs Assembly', prompt: 'India\'s electronics manufacturing today is strongest in which stage?', options: ['Final assembly (e.g. mobile phones)', 'Wafer fabrication', 'Raw silicon mining', 'Chip design tools'], explanation: 'India has rapidly scaled final assembly (especially smartphones under PLI), becoming the world\'s #2 mobile maker. Deeper value-add — components and chip fabs — is the next frontier.' },
    { topic: 'Box Build', prompt: 'After the populated PCB is ready, what happens in "box build" / final assembly?', options: ['Boards, battery, display and casing are assembled into the product', 'The chip is designed', 'The wafer is cut', 'The PCB is etched'], explanation: 'Box build integrates the assembled PCB with the battery, display, camera, casing, and connectors into the finished product, followed by firmware loading and functional testing.' },
    { topic: 'Testing', prompt: 'Why is automated testing critical before a device ships?', options: ['To catch defects and ensure every unit works reliably', 'To increase weight', 'To add features', 'To raise the price'], explanation: 'Functional, boundary-scan, and burn-in tests catch soldering faults and component failures. High yield (few rejects) is a key competitiveness metric in electronics manufacturing.' },
    { topic: 'Components', prompt: 'A key gap in India\'s electronics chain that PLI aims to fix is the local making of:', options: ['Components (displays, batteries, PCBs, chips)', 'Cardboard boxes', 'Instruction manuals', 'Shipping labels'], explanation: 'Much of the high value sits in components (displays, camera modules, chips, PCBs) still largely imported. Building local component and semiconductor ecosystems is the strategic priority.' },
    { topic: 'EMS', prompt: 'What is an "EMS" company (like the ones assembling phones for global brands)?', options: ['Electronics Manufacturing Services — builds products for other brands', 'Emergency Medical Service', 'Energy Management System', 'Export Marketing Society'], explanation: 'EMS/contract manufacturers (e.g. Foxconn, Dixon) build electronics for brands who own the design and sell under their own name — the backbone of India\'s assembly boom.' },
    { topic: 'PLI Scheme', prompt: 'What is the goal of the government\'s PLI scheme for electronics?', options: ['Incentivise domestic manufacturing and cut imports', 'Increase electronics imports', 'Ban local production', 'Subsidise foreign fabs only'], explanation: 'The Production-Linked Incentive (PLI) scheme pays cash incentives on incremental local production/sales, attracting global brands and suppliers to manufacture in India and reduce import dependence.' },
    { topic: 'E-waste', prompt: 'A growing sustainability concern for the electronics sector is:', options: ['E-waste recycling and responsible disposal', 'Too little demand', 'Excess sunlight', 'Over-recycling'], explanation: 'Rapid device turnover creates large volumes of electronic waste containing valuable and hazardous materials. Formal e-waste recycling and Extended Producer Responsibility are rising priorities.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'design', label: 'Design', info: 'Product and circuit design — schematics, PCB layout, and chip/system design define what gets built.', x: 14, y: 30, w: 30, h: 34 },
      { id: 'components', label: 'Components', info: 'Chips (ICs), resistors, displays, batteries, and connectors — much of the value; many still imported.', x: 74, y: 32, w: 28, h: 32 },
      { id: 'pcb', label: 'PCB Fabrication', info: 'The Printed Circuit Board with etched copper tracks that mechanically holds and connects components.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'smt', label: 'SMT Assembly', info: 'Pick-and-place robots mount components onto solder paste; a reflow oven bonds them to the board.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'assembly', label: 'Box Build', info: 'The populated board is integrated with battery, display, camera, and casing into the finished product.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'testing', label: 'Testing', info: 'Automated functional and burn-in tests catch defects so every shipped unit works reliably (high yield).', x: 226, y: 92, w: 30, h: 30 },
      { id: 'firmware', label: 'Firmware', info: 'Software/firmware is loaded and the device is calibrated and configured before final packing.', x: 176, y: 94, w: 28, h: 28 },
      { id: 'packaging', label: 'Packaging', info: 'The tested device is packed with accessories and documentation, ready for dispatch.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'dispatch', label: 'Dispatch', info: 'Finished electronics ship to brands, retailers, and export markets — India is now the #2 phone maker.', x: 42, y: 136, w: 28, h: 30 },
    ],
  },
}
