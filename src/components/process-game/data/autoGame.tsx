import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const AUTO = '#B02A30'

// Reward: a car assembled part by part (6 parts)
function CarBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const bodyFill = show(5) ? AUTO : '#cbd5e1'
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Car being assembled">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      <rect x="0" y="150" width="220" height="14" fill="#e2e8f0" />
      {/* chassis */}
      {show(1) && <rect x="40" y="118" width="140" height="12" rx="3" fill="#64748b" className="animate-[fadeIn_0.5s_ease]" />}
      {/* powertrain block */}
      {show(2) && <rect x="52" y="104" width="30" height="16" rx="2" fill="#f59e0b" className="animate-[fadeIn_0.5s_ease]" />}
      {/* body lower */}
      {show(3) && <path d="M44 118 L60 96 L160 96 L176 118 Z" fill={bodyFill} stroke="#94a3b8" strokeWidth="1.5" className="animate-[fadeIn_0.5s_ease]" />}
      {/* cabin / roof */}
      {show(4) && <path d="M74 96 L86 76 L138 76 L150 96 Z" fill={bodyFill} stroke="#94a3b8" strokeWidth="1.5" className="animate-[fadeIn_0.5s_ease]" />}
      {show(4) && <><rect x="90" y="80" width="24" height="14" fill="#bae6fd" /><rect x="118" y="80" width="18" height="14" fill="#bae6fd" /></>}
      {/* wheels */}
      {show(5) && <><circle cx="72" cy="130" r="14" fill="#1f2937" /><circle cx="72" cy="130" r="6" fill="#94a3b8" /><circle cx="150" cy="130" r="14" fill="#1f2937" /><circle cx="150" cy="130" r="6" fill="#94a3b8" /></>}
      {/* lights + finish */}
      {show(6) && <><rect x="170" y="104" width="6" height="6" rx="1" fill="#fde047" /><rect x="44" y="104" width="6" height="6" rx="1" fill="#ef4444" /><circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" /></>}
      {parts === 0 && <path d="M44 118 L60 96 L160 96 L176 118 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />}
      {highlight && show(6) && <text x="110" y="185" textAnchor="middle" fontSize="10" fontWeight="bold" fill={AUTO}>A road-ready car!</text>}
    </svg>
  )
}
function CarPreview() {
  return (
    <svg viewBox="0 0 80 44" className="w-20 h-11">
      <path d="M8 34 L18 20 L58 20 L68 34 Z" fill={AUTO} stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M26 20 L32 10 L52 10 L56 20 Z" fill={AUTO} /><rect x="34" y="12" width="16" height="8" fill="#bae6fd" />
      <circle cx="24" cy="34" r="7" fill="#1f2937" /><circle cx="56" cy="34" r="7" fill="#1f2937" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#fef2f2" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Steel/parts */}
      <rect x="18" y="36" width="20" height="16" rx="2" fill="#64748b" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Steel/Parts</text>
      {/* Press shop (stamping) */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#3b82f6" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Press Shop</text>
      {/* Body / weld shop */}
      <rect x="128" y="34" width="22" height="18" rx="2" fill="#f59e0b" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Weld Shop</text>
      {/* Paint shop */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#a855f7" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Paint Shop</text>
      {/* Powertrain */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#14b8a6" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Powertrain</text>
      {/* Assembly line */}
      <rect x="226" y="98" width="28" height="16" rx="2" fill="#0891b2" /><text x="240" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Assembly</text>
      {/* Testing */}
      <circle cx="190" cy="105" r="11" fill="#ef4444" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Testing</text>
      {/* Finished car */}
      <path d="M128 112 L134 100 L150 100 L154 112 Z" fill={AUTO} /><circle cx="136" cy="112" r="2.5" fill="#111" /><circle cx="148" cy="112" r="2.5" fill="#111" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Vehicle</text>
      {/* Dealer/dispatch */}
      <rect x="46" y="140" width="20" height="18" rx="2" fill={AUTO} /><text x="56" y="170" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Dealer</text>
    </>
  )
}

export const AUTO_GAME: IndustryGameData = {
  industryName: 'Automobile',
  brandColor: AUTO,
  processName: 'automobile manufacturing',
  reward: {
    noun: 'Car', verb: 'Build', parts: 6,
    partLabels: ['Chassis / platform ready', 'Powertrain fitted', 'Body panels welded', 'Cabin & glass fitted', 'Wheels & paint done', 'Lights, QC & rolled out!'],
    renderReward: CarBuild, renderPreview: CarPreview,
    completionTitle: 'Your Car is Built!',
    completionSubtitle: 'From steel to a road-ready car — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Four Shops', prompt: 'A car plant is built around "four shops". Which sequence is correct?', options: ['Press → Weld (Body) → Paint → Assembly', 'Paint → Press → Assembly → Weld', 'Assembly → Paint → Press → Weld', 'Weld → Assembly → Press → Paint'], explanation: 'A vehicle plant flows through four shops: the Press shop stamps sheet metal, the Weld/Body shop joins panels into a body-in-white, the Paint shop coats it, and the Assembly (trim) line fits everything together.' },
    { topic: 'Press Shop', prompt: 'What does the press (stamping) shop do?', options: ['Stamps flat steel sheet into body panels', 'Paints the car', 'Fits the seats', 'Tests the brakes'], explanation: 'The press shop uses huge stamping dies to form flat steel/aluminium coil into shaped panels — doors, roof, bonnet, side frames — that become the car\'s body.' },
    { topic: 'Body-in-White', prompt: 'The welded but unpainted car body is known as the:', options: ['Body-in-white (BIW)', 'Chassis dyno', 'Powertrain', 'Trim line'], explanation: 'In the weld/body shop, robots spot-weld the stamped panels into the "body-in-white" (BIW) — the bare metal shell — before it moves to painting.' },
    { topic: 'Powertrain', prompt: 'What does the "powertrain" of a vehicle include?', options: ['Engine/motor, transmission and driveline', 'Only the tyres', 'The infotainment screen', 'The paint'], explanation: 'The powertrain is what makes the vehicle move: the engine (or electric motor), transmission/gearbox, and driveline. It is built on its own line and married to the body on the assembly line.' },
    { topic: 'Assembly Line', prompt: 'What happens on the final assembly (trim) line?', options: ['Interiors, electricals, powertrain and wheels are fitted to the painted body', 'The steel is mined', 'The body is stamped', 'The car is crushed'], explanation: 'On the moving assembly line, the painted body gets its wiring, dashboard, seats, glass, powertrain, suspension, wheels, and fluids — turning a shell into a complete vehicle.' },
    { topic: 'OEM', prompt: 'Car makers like Maruti and Tata Motors are called "OEMs". What does that mean?', options: ['Original Equipment Manufacturers — they build the final vehicle', 'Overseas Export Merchants', 'Oil & Energy Majors', 'Online E-commerce Marketplaces'], explanation: 'OEM = Original Equipment Manufacturer — the company that designs and assembles the finished vehicle and sells it under its brand, sourcing most parts from component suppliers.' },
    { topic: 'Localisation', prompt: 'Why do Indian OEMs push high "localisation" of parts?', options: ['To cut cost, forex risk and import dependence', 'To increase imports', 'To slow down production', 'To raise prices'], explanation: 'Localisation — sourcing components from domestic suppliers — lowers cost, reduces currency risk, shortens supply chains, and qualifies for government incentives. It is a key competitiveness lever.' },
    { topic: 'EV Shift', prompt: 'How does an electric vehicle (EV) differ most from a petrol car in manufacturing?', options: ['It replaces the engine/gearbox with a battery pack and electric motor', 'It needs no wheels', 'It skips the paint shop', 'It uses no steel'], explanation: 'EVs swap the internal-combustion powertrain for a large battery pack and electric motor(s). This changes sourcing (cells, power electronics) and reduces the number of moving parts dramatically.' },
    { topic: 'Testing', prompt: 'Before dispatch, each vehicle goes through:', options: ['Quality checks and functional/road testing', 'Re-stamping', 'Re-welding', 'Re-mining'], explanation: 'Finished vehicles undergo end-of-line testing — wheel alignment, brakes, electricals, water-leak, and a short test drive — before quality sign-off and shipment to dealers.' },
    { topic: 'Segments', prompt: 'The largest vehicle segment by volume in India is:', options: ['Two-wheelers', 'Luxury cars', 'Heavy trucks', 'Buses'], explanation: 'Two-wheelers dominate Indian auto volumes due to affordability and urban/rural mobility needs, followed by passenger cars and commercial vehicles. India is the world\'s largest two-wheeler market.' },
    { topic: 'Just-in-Time', prompt: 'Why do auto plants rely on "just-in-time" (JIT) supply of parts?', options: ['To minimise inventory and cost by delivering parts as needed', 'To store parts for years', 'To slow the line', 'To avoid suppliers'], explanation: 'JIT delivers components to the line exactly when needed, cutting inventory and warehousing cost. It requires reliable nearby suppliers — which is why component clusters form around OEM plants.' },
    { topic: 'Cyclicality', prompt: 'Auto demand is "cyclical". What does this mean for the industry?', options: ['Sales rise and fall with the economy, interest rates and sentiment', 'Sales are always flat', 'Only exports matter', 'Demand never changes'], explanation: 'Vehicles are big-ticket, often financed purchases, so demand swings with GDP growth, interest rates, fuel prices, and consumer confidence — making the sector cyclical and capital-intensive.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'parts', label: 'Steel & Parts', info: 'Sheet steel/aluminium coil plus thousands of bought-out components arrive from suppliers.', x: 14, y: 32, w: 26, h: 32 },
      { id: 'press', label: 'Press Shop', info: 'Huge stamping dies form flat metal sheet into shaped body panels — doors, roof, bonnet.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'weld', label: 'Weld / Body Shop', info: 'Robots spot-weld the panels into the "body-in-white" — the bare metal shell of the car.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'paint', label: 'Paint Shop', info: 'The body is cleaned, primed, and painted in multiple coats for colour and corrosion protection.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'powertrain', label: 'Powertrain', info: 'Engine/motor and transmission are built on their own line, ready to be married to the body.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'assembly', label: 'Assembly Line', info: 'Interiors, electricals, powertrain, glass, and wheels are fitted to the painted body on a moving line.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'testing', label: 'Testing', info: 'End-of-line quality checks and a test drive verify every vehicle before it is signed off.', x: 178, y: 94, w: 26, h: 28 },
      { id: 'vehicle', label: 'Finished Vehicle', info: 'The complete, tested car — the OEM\'s finished product ready for dispatch.', x: 128, y: 96, w: 26, h: 28 },
      { id: 'dealer', label: 'Dealer / Dispatch', info: 'Vehicles are shipped to the dealer network (and exports) where they reach customers.', x: 42, y: 136, w: 28, h: 30 },
    ],
  },
}
