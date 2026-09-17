import type { BusinessModelData } from '../../components/BusinessModel'

export const AUTO_BUSINESS: BusinessModelData = {
  industryName: 'Automobiles',
  brandColor: '#1E3A5F',
  industryKey: 'auto',
  tagline: 'Assembling thousands of parts into a vehicle — where the OEM sits atop a vast supplier pyramid.',
  intro:
    'The automobile industry designs, assembles and sells vehicles — from two-wheelers to trucks. A vehicle maker (OEM) does not make most of the ~20,000 parts in a car; it designs the vehicle, assembles bought-in components, and owns the brand and dealer network. So an auto company is really an integration, branding and distribution business sitting on top of a huge supplier base. Scale, model success and a strong dealer/finance ecosystem decide who wins.',
  stats: [
    { label: 'India Rank', value: 'Top 4 globally' },
    { label: 'Model', value: 'OEM + supplier pyramid' },
    { label: 'Key Cost', value: 'Bought-in components' },
    { label: 'Nature', value: 'Scale & brand driven' },
  ],
  rawMaterials: [
    { name: 'Components & Systems', note: 'Engines-in-part, seats, electronics, tyres, glass — bought from a tiered supplier base (Tier-1/2/3). The bulk of a vehicle\'s cost.', source: 'Domestic' },
    { name: 'Steel & Aluminium', note: 'Sheet metal for body panels and structure; prices track the metals cycle.', source: 'Domestic' },
    { name: 'Plastics & Composites', note: 'Interiors, bumpers and trim; crude-oil-linked cost.', source: 'Mixed' },
    { name: 'Semiconductors & Electronics', note: 'Chips and control units — increasingly critical; global chip shortages can halt assembly lines.', source: 'Imported' },
    { name: 'Batteries (EV)', note: 'Lithium-ion cells/packs for electric vehicles — a fast-growing, largely imported input.', source: 'Imported' },
  ],
  processIntro: 'How a vehicle is built on the assembly line — press the metal, weld the body, paint it, then fit everything together.',
  process: [
    { step: '1. Stamping / Press Shop', keyFact: 'Sheet-metal forming', output: 'Body panels', detail: 'Large presses stamp flat steel sheets into body panels — doors, roof, floor and side panels — using heavy dies. High volumes make this very capital-intensive.' },
    { step: '2. Body Shop (Welding)', keyFact: 'Robotic welding', output: 'Body-in-white', detail: 'Robots weld the stamped panels together into the vehicle\'s structural shell, called the "body-in-white". This is one of the most automated stages.' },
    { step: '3. Paint Shop', keyFact: 'Coat & bake', output: 'Painted body', detail: 'The body is cleaned, dipped for corrosion protection, then primed, painted and baked in multiple coats in a dust-controlled environment — a costly, quality-critical stage.' },
    { step: '4. Powertrain / Engine', keyFact: 'Engine & transmission', output: 'Powertrain', detail: 'Engines and transmissions (or, for EVs, motors and battery packs) are assembled or sourced and readied to be married to the body.' },
    { step: '5. Final Assembly', keyFact: 'Trim & marriage line', output: 'Complete vehicle', detail: 'On the moving assembly line, thousands of components — interiors, wiring, glass, seats, powertrain, wheels — are fitted to the painted body ("marriage") to build the complete vehicle.' },
    { step: '6. Testing & Dispatch', keyFact: 'QC + dealer network', output: 'Vehicles to dealers', detail: 'Each vehicle is inspected and road/roll tested, then dispatched to the dealer network for sale. Sales, service and financing through dealers close the loop.' },
  ],
  products: [
    { name: 'Passenger Vehicles', note: 'Cars, SUVs and vans — the most visible, brand-driven segment; shifting toward SUVs and EVs.' },
    { name: 'Two-Wheelers', note: 'Motorcycles and scooters — India\'s highest-volume segment, mass-mobility driven.' },
    { name: 'Commercial Vehicles', note: 'Trucks and buses — tied to freight, infrastructure and the economic cycle.' },
    { name: 'Three-Wheelers & EVs', note: 'Autos/last-mile transport plus the fast-growing electric segment across categories.' },
  ],
  customers: [
    { name: 'Retail Consumers', note: 'Individual buyers of cars and two-wheelers via dealers, largely finance-driven.', share: 62 },
    { name: 'Fleet & Commercial', note: 'Logistics firms, cab aggregators and businesses buying commercial vehicles.', share: 22 },
    { name: 'Exports', note: 'Vehicles shipped to global markets — a growing share for Indian OEMs.', share: 12 },
    { name: 'Government & Institutional', note: 'State transport, defence and institutional fleets.', share: 4 },
  ],
  drivers: [
    { factor: 'Consumer Demand & Financing', effect: 'Most vehicles are bought on loans, so income growth, interest rates and sentiment drive volumes.', type: 'demand' },
    { factor: 'Input & Metal Costs', effect: 'Steel, aluminium, plastics and component prices set the cost base and squeeze margins when they rise.', type: 'cost' },
    { factor: 'Semiconductor Supply', effect: 'Chip availability can gate production; shortages have idled plants industry-wide.', type: 'external' },
    { factor: 'Emission & EV Policy', effect: 'Tightening emission norms and EV incentives (FAME/PLI) reshape product plans and capex.', type: 'policy' },
    { factor: 'New Model Success', effect: 'A hit model can transform market share; a flop wastes huge investment — product cycles are decisive.', type: 'demand' },
    { factor: 'Fuel Prices & Total Cost', effect: 'Petrol/diesel prices and running cost influence the mix between segments and toward EVs.', type: 'external' },
  ],
  economics:
    'Auto is a high-volume, thin-per-unit-margin, scale business: fixed costs (plant, tooling, R&D per model) are enormous, so profit depends on selling enough units to spread them and on a rich product mix (SUVs, premium trims). The OEM captures value through brand, model appeal and its dealer/service/finance ecosystem, while pushing cost and inventory risk down onto the supplier pyramid.',
  insurerNote:
    'Auto plants are large, highly automated assets with press shops, robotic body shops, flammable paint shops and just-in-time supply chains, so exposures include fire (paint shop/solvents), machinery breakdown and severe business interruption — a single line stoppage or supplier failure can halt output. Product-recall and liability risk is significant. Property, MB, BI and product-liability cover are central to underwriting.',
}
