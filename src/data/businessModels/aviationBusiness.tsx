import type { BusinessModelData } from '../../components/BusinessModel'

export const AVIATION_BUSINESS: BusinessModelData = {
  industryName: 'Aviation',
  brandColor: '#0284C7',
  tagline: 'Flying metal that must be kept full — a high-fixed-cost business where empty seats are lost forever.',
  // Aviation delivers a service, not a manufactured product — relabel sections.
  labels: {
    rawMaterials: 'Key Inputs & Cost Drivers',
    rawMaterialsSub: 'What it takes to run an airline.',
    process: 'How an Airline Operates',
    products: 'What They Sell',
    productsSub: 'The services and revenue streams of an airline.',
    customers: 'Who Flies — Customers',
    customersSub: 'Where airline demand comes from.',
    drivers: 'What Impacts the Business',
    economics: 'How the Money Works',
  },
  intro:
    'Aviation is the business of flying passengers and cargo. An airline doesn\'t make a product; it sells a perishable service — a seat on a specific flight that is worthless the moment the door closes. It is a high-fixed-cost, thin-margin business dominated by two costs: fuel and aircraft (owned or, more often, leased). Success is about filling seats (load factor), pricing them well (yield), and keeping expensive aircraft flying as many hours a day as possible.',
  stats: [
    { label: 'India Rank', value: '3rd-largest market' },
    { label: 'Top Costs', value: 'Fuel + aircraft lease' },
    { label: 'Key Metric', value: 'Load factor & yield' },
    { label: 'Nature', value: 'Perishable, thin-margin' },
  ],
  rawMaterials: [
    { name: 'Aircraft (owned/leased)', note: 'The core asset — mostly leased in India to avoid huge upfront cost. Fleet type and utilisation drive economics.', source: 'Imported' },
    { name: 'Aviation Turbine Fuel (ATF)', note: 'The single biggest cost (~30-40%); priced off crude and taxed heavily in India, so fuel swings decide profit or loss.', source: 'Mixed' },
    { name: 'Airport & Navigation Services', note: 'Landing, parking and air-navigation charges paid to airports and authorities.', source: 'Domestic' },
    { name: 'Skilled Manpower', note: 'Pilots, cabin crew and engineers — scarce, expensive and safety-critical.', source: 'Domestic' },
    { name: 'MRO (Maintenance)', note: 'Mandatory, costly maintenance/repair/overhaul — much of it done abroad, adding forex cost.', source: 'Mixed' },
  ],
  processIntro: 'How an airline actually delivers its service — from planning routes to turning the aircraft around and doing it again.',
  process: [
    { step: '1. Network & Scheduling', keyFact: 'Routes & slots', output: 'Flight schedule', detail: 'The airline decides which routes to fly, how often, and secures airport slots. Getting the network right — matching capacity to demand — is the foundation of profitability.' },
    { step: '2. Fleet & Capacity', keyFact: 'Own vs lease', output: 'Available seats', detail: 'Aircraft are acquired (mostly leased) and deployed. High aircraft utilisation — keeping planes in the air, not on the ground — is essential to spread their huge fixed cost.' },
    { step: '3. Pricing & Sales (Yield)', keyFact: 'Revenue management', output: 'Sold seats', detail: 'Fares are set dynamically to fill seats at the best possible average price (yield). Ancillary revenue — baggage, seats, food — is increasingly vital to margins.' },
    { step: '4. Ground & Turnaround', keyFact: 'Fast turnaround', output: 'On-time departure', detail: 'Between flights the aircraft is refuelled, cleaned, loaded and boarded. A quick turnaround means more flights per day per aircraft — a key low-cost-carrier advantage.' },
    { step: '5. Flight Operations', keyFact: 'Safety + fuel efficiency', output: 'Completed flight', detail: 'The flight is operated safely and fuel-efficiently. On-time performance and safety build the reputation that keeps customers loyal.' },
    { step: '6. Maintenance (MRO)', keyFact: 'Airworthiness', output: 'Aircraft ready to fly', detail: 'Scheduled and unscheduled maintenance keeps aircraft airworthy and compliant. Downtime for maintenance is lost revenue, so it is tightly managed.' },
  ],
  products: [
    { name: 'Passenger Transport (Domestic)', note: 'The core business — carrying travellers within India; intensely price-competitive.' },
    { name: 'International Passenger', note: 'Higher-yield overseas routes; a growth area for Indian carriers.' },
    { name: 'Air Cargo', note: 'Carrying freight in the belly-hold or dedicated freighters — a useful revenue add-on.' },
    { name: 'Ancillary Services', note: 'Baggage, seat selection, food, priority and loyalty — high-margin extras that increasingly drive profits.' },
  ],
  customers: [
    { name: 'Leisure Travellers', note: 'Price-sensitive holiday and family travellers — the largest volume.', share: 48 },
    { name: 'Business Travellers', note: 'Higher-yield, time-sensitive corporate flyers.', share: 27 },
    { name: 'VFR (Visiting Friends/Relatives)', note: 'A large, steady segment in the Indian market.', share: 15 },
    { name: 'Cargo Shippers', note: 'Businesses moving freight by air.', share: 10 },
  ],
  drivers: [
    { factor: 'Fuel (ATF) Prices', effect: 'The biggest and most volatile cost; a spike can turn a profitable airline into a loss-maker overnight.', type: 'cost' },
    { factor: 'Load Factor & Yield', effect: 'Filling seats at good fares is everything — an empty seat is revenue lost forever the moment the plane leaves.', type: 'demand' },
    { factor: 'Currency (USD)', effect: 'Leases, fuel and maintenance are dollar-linked while revenue is largely in rupees — a weak rupee hurts badly.', type: 'external' },
    { factor: 'Competition & Capacity', effect: 'Aggressive fare wars and capacity additions can crush yields across the whole industry.', type: 'external' },
    { factor: 'Demand & Economic Cycle', effect: 'Air travel is discretionary, so it rises and falls sharply with the economy and consumer confidence.', type: 'demand' },
    { factor: 'Regulation & Airports', effect: 'Airport slots, charges, taxes and safety regulation shape cost and where airlines can grow.', type: 'policy' },
  ],
  economics:
    'Airline economics are brutal: enormous fixed costs (aircraft, crew, airport charges) meet a perishable product, so profit depends on filling seats (high load factor) at the right price (yield) while ruthlessly controlling fuel and turnaround. Low-cost carriers win by maximising aircraft utilisation, flying single-type fleets, and squeezing costs. Fuel and currency swings mean even good airlines see wildly volatile profits.',
  insurerNote:
    'Aviation is a specialised, high-severity risk: hull (aircraft) and aviation liability cover run into very large sums, and a single incident can be catastrophic. Beyond hull and passenger/third-party liability, airlines need cover for ground assets, cyber, and business interruption. Safety record, fleet age and maintenance standards are decisive rating factors, and cover is typically arranged in global aviation markets.',
}
