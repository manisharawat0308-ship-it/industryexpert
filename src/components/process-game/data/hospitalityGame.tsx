import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const HOSP = '#a16207'

// Reward: a hotel lighting up windows + earning stars (6 parts)
function HotelBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const litFloors = Math.min(4, Math.max(0, parts - 1)) // stages 2..5 light floors
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Hotel and guest stay">
      <rect x="0" y="0" width="220" height="200" fill="#fffbeb" rx="10" />
      {show(6) && <circle cx="180" cy="34" r="12" fill={ORANGE} opacity="0.5" />}
      <rect x="0" y="168" width="220" height="8" fill="#e2e8f0" />
      {/* building */}
      {show(1) && <rect x="66" y="60" width="88" height="108" fill="#fde9c8" stroke="#a16207" strokeWidth="2" className="animate-[fadeIn_0.5s_ease]" />}
      {/* windows lighting up by floor */}
      {show(1) && [0,1,2,3].map((f) => (
        [0,1,2].map((c) => (
          <rect key={`${f}-${c}`} x={76 + c * 24} y={74 + f * 22} width="14" height="14" rx="1"
            fill={f < litFloors ? '#fde047' : '#cbd5e1'} className="animate-[fadeIn_0.4s_ease]" />
        ))
      ))}
      {/* entrance */}
      {show(1) && <rect x="98" y="150" width="24" height="18" fill="#7c4a02" />}
      {/* 5 stars appear at finish */}
      {show(6) && [0,1,2,3,4].map((i) => (
        <text key={i} x={72 + i * 16} y="54" fontSize="12" fill={ORANGE}>★</text>
      ))}
      {parts === 0 && <text x="110" y="110" textAnchor="middle" fontSize="10" fill="#d6c08a">Answer to welcome guests</text>}
      {highlight && show(6) && <text x="110" y="190" textAnchor="middle" fontSize="10" fontWeight="bold" fill={HOSP}>A 5-star guest experience!</text>}
    </svg>
  )
}
function HotelPreview() {
  return (
    <svg viewBox="0 0 60 60" className="w-14 h-14">
      <rect x="16" y="16" width="28" height="40" fill="#fde9c8" stroke="#a16207" strokeWidth="1.5" />
      {[0,1,2].map(f => [0,1].map(c => <rect key={`${f}-${c}`} x={20+c*13} y={22+f*11} width="8" height="8" fill="#fde047" />))}
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#fffbeb" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Booking */}
      <circle cx="28" cy="44" r="9" fill="#0891b2" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Booking</text>
      {/* Check-in */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#3b82f6" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Check-in</text>
      {/* Room / stay */}
      <rect x="128" y="34" width="22" height="18" rx="2" fill="#a16207" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Room</text>
      {/* F&B */}
      <circle cx="190" cy="44" r="10" fill="#f59e0b" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">F&amp;B</text>
      {/* Events / MICE */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#a855f7" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Events</text>
      {/* Housekeeping */}
      <rect x="228" y="98" width="24" height="16" rx="2" fill="#14b8a6" /><text x="240" y="126" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Housekeeping</text>
      {/* Service quality */}
      <circle cx="190" cy="105" r="10" fill="#ef4444" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Service</text>
      {/* Check-out */}
      <rect x="128" y="98" width="24" height="16" rx="2" fill="#0891b2" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Check-out</text>
      {/* Loyalty / review */}
      <text x="55" y="150" fontSize="14" textAnchor="middle" fill={ORANGE}>★</text><text x="55" y="166" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Review</text>
    </>
  )
}

export const HOSPITALITY_GAME: IndustryGameData = {
  industryName: 'Hospitality',
  brandColor: HOSP,
  processName: 'the hospitality guest journey',
  reward: {
    noun: 'Guest Stay', verb: 'Deliver', parts: 6,
    partLabels: ['Room booked', 'Guest checked in', 'Room & stay enjoyed', 'Dined at F&B outlets', 'Serviced by housekeeping', 'Great review — 5 stars!'],
    renderReward: HotelBuild, renderPreview: HotelPreview,
    completionTitle: 'Your Guest Had a 5-Star Stay!',
    completionSubtitle: 'From booking to a glowing review — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'RevPAR', prompt: 'The single most important revenue metric for a hotel is "RevPAR". What is it?', options: ['Revenue Per Available Room', 'Rooms Per Annual Review', 'Rate of Visitor Payment & Return', 'Restaurant Per-Area Revenue'], explanation: 'RevPAR = Revenue Per Available Room = occupancy × average room rate (ARR). It captures both how full the hotel is and how much it charges — the key gauge of hotel performance.' },
    { topic: 'ARR & Occupancy', prompt: 'RevPAR is driven by two levers. What are they?', options: ['Average Room Rate (ARR) and Occupancy', 'Menu price and staff count', 'Building height and age', 'Location and paint'], explanation: 'A hotel grows RevPAR by raising the Average Room Rate, filling more rooms (occupancy), or both. Managing this trade-off dynamically (like airlines) is central to hotel revenue management.' },
    { topic: 'Revenue Mix', prompt: 'Beyond rooms, where do full-service hotels earn significant revenue?', options: ['Food & beverage, banquets/events (MICE), and spa', 'Selling the building', 'Mining', 'Manufacturing'], explanation: 'Rooms are core, but F&B (restaurants, bars), banquets and MICE (Meetings, Incentives, Conferences, Events), and wellness/spa add major revenue — especially for luxury and business hotels.' },
    { topic: 'Asset-Light', prompt: 'Why are big hotel chains shifting to an "asset-light" model?', options: ['Manage/franchise hotels others own — earn fees with less capital', 'Buy every hotel outright', 'Stop operating hotels', 'Only build new towers'], explanation: 'In asset-light models, chains manage or franchise hotels owned by third parties, earning management/franchise fees. This scales the brand fast with low capital and higher return on capital.' },
    { topic: 'Segments', prompt: 'Hotels are graded into segments. Which sequence goes low to high?', options: ['Budget → Mid-scale → Upscale → Luxury', 'Luxury → Budget → Upscale', 'Mid-scale → Luxury → Budget', 'Upscale → Budget → Luxury'], explanation: 'The ladder runs Budget/Economy → Mid-scale → Upscale → Upper-upscale → Luxury. Chains operate multiple brands across segments to capture different traveller budgets.' },
    { topic: 'Seasonality', prompt: 'Why is hotel demand seasonal and cyclical?', options: ['It tracks tourism seasons, business cycles and events', 'Rooms expire', 'Guests only travel at night', 'Demand is always flat'], explanation: 'Occupancy swings with tourist seasons, holidays, weddings, conferences, and the economy. Because room supply is fixed and perishable (an unsold night is lost forever), demand timing is crucial.' },
    { topic: 'Perishable Inventory', prompt: 'Why is a hotel room called "perishable inventory"?', options: ['An unsold room-night can never be sold again', 'Rooms rot', 'Rooms are food', 'Rooms disappear'], explanation: 'Like an airline seat, a hotel room-night that goes unsold is revenue lost forever. This drives dynamic pricing to fill rooms while protecting rate — the essence of revenue management.' },
    { topic: 'Loyalty', prompt: 'Why do hotel chains invest heavily in loyalty programmes and direct booking?', options: ['To reduce OTA commissions and build repeat guests', 'To raise costs', 'To avoid guests', 'To close hotels'], explanation: 'Online Travel Agents (OTAs) charge hefty commissions. Loyalty programmes and direct-booking channels bring guests back directly, cutting distribution cost and building lifetime value.' },
    { topic: 'Service Quality', prompt: 'In hospitality, what most protects brand value and pricing power?', options: ['Consistent, high-quality guest service and reviews', 'Cheapest possible service', 'Ignoring feedback', 'Fewer staff'], explanation: 'Hospitality sells an experience. Consistent service and strong guest reviews drive repeat stays, premium rates, and brand trust — the industry\'s core competitive asset.' },
    { topic: 'Demand Drivers', prompt: 'What is fuelling India\'s hospitality growth?', options: ['Rising domestic tourism, business travel, weddings and MICE', 'Falling incomes', 'Fewer travellers', 'No airports'], explanation: 'Growing middle-class domestic tourism, business travel, big-fat weddings, spiritual tourism, and MICE — plus improving air/road connectivity — are driving strong demand for Indian hotels.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'booking', label: 'Booking', info: 'The guest reserves a room. Dynamic pricing balances occupancy and Average Room Rate to grow RevPAR.', x: 14, y: 32, w: 28, h: 32 },
      { id: 'checkin', label: 'Check-in', info: 'Arrival and check-in — the first service touchpoint that shapes the guest\'s impression.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'room', label: 'Room / Stay', info: 'Rooms are the core revenue source. An unsold room-night is lost forever — perishable inventory.', x: 126, y: 30, w: 26, h: 34 },
      { id: 'fnb', label: 'Food & Beverage', info: 'Restaurants, bars, and room service add high-margin revenue beyond the room tariff.', x: 176, y: 30, w: 28, h: 32 },
      { id: 'events', label: 'Events / MICE', info: 'Banquets, weddings, and conferences (MICE) are major revenue drivers, especially for full-service hotels.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'housekeeping', label: 'Housekeeping', info: 'Cleaning and maintenance keep rooms guest-ready and uphold the quality standard the brand promises.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'service', label: 'Service Quality', info: 'Consistent, attentive service drives reviews, repeat stays, and pricing power — the industry\'s core asset.', x: 178, y: 94, w: 24, h: 28 },
      { id: 'checkout', label: 'Check-out', info: 'The final settlement and departure — a smooth exit reinforces a positive overall experience.', x: 128, y: 94, w: 26, h: 28 },
      { id: 'review', label: 'Loyalty / Review', info: 'A great review and loyalty membership bring the guest back directly, cutting OTA commissions.', x: 44, y: 136, w: 24, h: 30 },
    ],
  },
}
