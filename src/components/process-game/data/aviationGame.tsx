import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const AVI = '#0c4a6e'

// Reward: a plane climbing along a flight arc (6 parts)
function FlightBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  // plane position advances along an arc as parts grow
  const t = Math.min(1, parts / 6)
  const px = 30 + t * 160
  const py = 160 - Math.sin(t * Math.PI) * 110
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Flight in progress">
      <rect x="0" y="0" width="220" height="200" fill="#eff6ff" rx="10" />
      {show(6) && <circle cx="180" cy="35" r="14" fill={ORANGE} opacity="0.5" />}
      {/* ground */}
      <rect x="0" y="168" width="220" height="8" fill="#cbd5e1" />
      <rect x="18" y="164" width="30" height="4" fill="#94a3b8" /><rect x="172" y="164" width="30" height="4" fill="#94a3b8" />
      {/* flight arc trail */}
      {parts >= 1 && <path d="M30 160 Q110 40 190 160" fill="none" stroke={AVI} strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />}
      {/* plane */}
      {parts >= 1 && (
        <g transform={`translate(${px}, ${py})`} className="animate-[fadeIn_0.4s_ease]">
          <path d="M-14 0 L10 0 L16 -4 L10 -2 L2 -8 L4 -2 L-14 0 Z" fill={AVI} transform={`rotate(${t < 0.5 ? -20 : 20})`} />
          <circle cx="0" cy="0" r="2" fill="#fff" />
        </g>
      )}
      {parts === 0 && <text x="110" y="110" textAnchor="middle" fontSize="10" fill="#cbd5e1">Answer to take off</text>}
      {highlight && show(6) && <text x="110" y="190" textAnchor="middle" fontSize="10" fontWeight="bold" fill={AVI}>Safe landing — flight complete!</text>}
    </svg>
  )
}
function PlanePreview() {
  return (
    <svg viewBox="0 0 60 40" className="w-16 h-11">
      <path d="M6 26 L40 20 L54 12 L44 22 L30 30 Z" fill={AVI} />
      <path d="M24 22 L30 8 L34 20 Z" fill={AVI} />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#eff6ff" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Booking */}
      <circle cx="28" cy="44" r="9" fill="#0891b2" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Booking</text>
      {/* Check-in */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#3b82f6" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Check-in</text>
      {/* Security */}
      <rect x="128" y="34" width="22" height="18" rx="2" fill="#a855f7" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Security</text>
      {/* Boarding */}
      <rect x="178" y="34" width="24" height="18" rx="2" fill="#f59e0b" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Boarding</text>
      {/* Departure */}
      <path d="M228 52 L252 46 L248 52 Z" fill="#0c4a6e" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Take-off</text>
      {/* Cruise */}
      <path d="M228 100 L252 96 L248 104 Z" fill="#0c4a6e" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Cruise</text>
      {/* ATC */}
      <rect x="182" y="96" width="16" height="18" rx="2" fill="#ef4444" /><text x="190" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">ATC</text>
      {/* Landing */}
      <path d="M130 112 L152 108 L150 116 Z" fill="#0c4a6e" /><text x="140" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Landing</text>
      {/* Turnaround */}
      <rect x="46" y="140" width="20" height="16" rx="2" fill={AVI} /><text x="56" y="168" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Turnaround</text>
    </>
  )
}

export const AVIATION_GAME: IndustryGameData = {
  industryName: 'Aviation',
  brandColor: AVI,
  processName: 'airline operations',
  reward: {
    noun: 'Flight', verb: 'Complete', parts: 6,
    partLabels: ['Passengers checked in', 'Security cleared', 'Boarding complete', 'Take-off!', 'Cruising at altitude', 'Landed safely — flight complete!'],
    renderReward: FlightBuild, renderPreview: PlanePreview,
    completionTitle: 'Your Flight is Complete!',
    completionSubtitle: 'From booking to a safe landing — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Cost Structure', prompt: 'What is typically the single largest operating cost for an airline?', options: ['Aviation turbine fuel (ATF)', 'In-flight meals', 'Uniforms', 'Website hosting'], explanation: 'Jet fuel (ATF) is usually the biggest cost — often 30-40% of expenses. Because it is priced in dollars and tracks crude, airline profits swing sharply with fuel prices and the rupee.' },
    { topic: 'LCC Model', prompt: 'India\'s market is dominated by the "LCC" model. What is an LCC?', options: ['Low-Cost Carrier — no-frills, high-utilisation flying', 'Long-Circuit Cruise', 'Luxury Cabin Class', 'Local Cargo Carrier'], explanation: 'Low-Cost Carriers (like IndiGo) keep fares low via a single aircraft type, dense seating, quick turnarounds, high aircraft utilisation, and charging extra for add-ons — dominating Indian aviation.' },
    { topic: 'Load Factor', prompt: 'What does "passenger load factor" (PLF) measure?', options: ['The percentage of seats filled with paying passengers', 'The plane\'s weight', 'The fuel used', 'The number of pilots'], explanation: 'Load factor = seats sold ÷ seats available. Since costs are largely fixed per flight, a high load factor is critical — empty seats earn nothing but the flight still costs the same to operate.' },
    { topic: 'Yield', prompt: 'Airlines balance load factor with "yield". What is yield?', options: ['The average fare earned per passenger per km', 'The fuel efficiency', 'The runway length', 'The baggage weight'], explanation: 'Yield is revenue per passenger-kilometre. Airlines optimise the trade-off between filling seats (load factor) and charging enough (yield) to maximise revenue on each flight.' },
    { topic: 'Fleet Strategy', prompt: 'Why do LCCs often fly a single aircraft family (e.g. all A320s)?', options: ['To cut training, maintenance and spares costs', 'Because only one type exists', 'For different paint options', 'To fly slower'], explanation: 'A common fleet standardises pilot training, maintenance, and spare parts, sharply lowering complexity and cost — a core lever of the low-cost model.' },
    { topic: 'Turnaround', prompt: 'Why is fast aircraft "turnaround" at the gate so important?', options: ['Planes only earn money in the air, so quick turns boost utilisation', 'To let crews rest longer', 'To sell more meals', 'It is legally required to be slow'], explanation: 'An aircraft parked at the gate earns nothing. Fast turnarounds (cleaning, boarding, fuelling in ~30-40 min) let LCCs fly more sectors per day, spreading fixed costs over more revenue.' },
    { topic: 'Ancillary Revenue', prompt: 'Besides tickets, airlines increasingly earn from "ancillaries". Examples?', options: ['Baggage fees, seat selection, meals, priority boarding', 'Selling aircraft', 'Building airports', 'Mining fuel'], explanation: 'Ancillary revenue (extra baggage, seat selection, food, priority boarding, cargo) is high-margin and helps airlines keep base fares low while boosting total revenue per passenger.' },
    { topic: 'Airports', prompt: 'How do airport operators (like GMR/Adani) mainly earn money?', options: ['Aeronautical charges + non-aero retail, F&B, parking, real estate', 'Selling planes', 'Flying passengers', 'Making fuel'], explanation: 'Airports earn regulated aeronautical charges (landing, passenger fees) plus higher-margin non-aeronautical income from retail, F&B, duty-free, parking, and real estate — the growth driver.' },
    { topic: 'Regulation', prompt: 'Which body is the primary safety regulator for Indian civil aviation?', options: ['DGCA (Directorate General of Civil Aviation)', 'RBI', 'SEBI', 'TRAI'], explanation: 'The DGCA oversees safety, licensing, and airworthiness. Aviation is heavily regulated for safety, and slot allocation, fuel taxes, and route rules all shape airline economics.' },
    { topic: 'Currency Risk', prompt: 'Why are airlines especially exposed to a weakening rupee?', options: ['Fuel, aircraft leases and spares are dollar-denominated', 'They earn only in dollars', 'They have no costs', 'Fuel is free'], explanation: 'Major costs — fuel, aircraft leases/purchases, and many spares — are in US dollars, while most revenue is in rupees. A weaker rupee inflates costs and squeezes already-thin margins.' },
    { topic: 'Demand Growth', prompt: 'Why is Indian air travel seen as a long-term growth story?', options: ['Rising incomes and low air-travel penetration versus population', 'Falling population', 'No airports', 'Declining tourism'], explanation: 'India\'s air-travel penetration is still low relative to its huge, rising-income population. Growing middle-class travel, tourism, and new airports underpin strong long-term passenger growth.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'booking', label: 'Booking', info: 'The passenger books a ticket. Dynamic pricing balances load factor (seats filled) and yield (fare per seat).', x: 14, y: 32, w: 28, h: 32 },
      { id: 'checkin', label: 'Check-in', info: 'Passengers and baggage are processed; weight and balance are calculated for a safe, efficient flight.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'security', label: 'Security', info: 'Regulated security screening of passengers and bags — a mandatory step managed with the airport.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'boarding', label: 'Boarding', info: 'Passengers board quickly — fast boarding supports the rapid gate turnaround that LCCs depend on.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'takeoff', label: 'Take-off', info: 'The aircraft departs. Fuel (ATF) — the biggest cost — is loaded for the sector plus reserves.', x: 226, y: 34, w: 30, h: 26 },
      { id: 'cruise', label: 'Cruise', info: 'At altitude the aircraft is most fuel-efficient; ancillary sales (food, extras) add revenue in flight.', x: 226, y: 92, w: 30, h: 28 },
      { id: 'atc', label: 'Air Traffic Control', info: 'ATC guides the flight safely through controlled airspace under DGCA safety oversight.', x: 178, y: 92, w: 24, h: 28 },
      { id: 'landing', label: 'Landing', info: 'The aircraft lands and taxis in — completing the revenue sector for the passengers on board.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'turnaround', label: 'Turnaround', info: 'Cleaning, fuelling, and re-boarding happen fast so the aircraft can fly its next sector and keep earning.', x: 42, y: 136, w: 26, h: 28 },
    ],
  },
}
