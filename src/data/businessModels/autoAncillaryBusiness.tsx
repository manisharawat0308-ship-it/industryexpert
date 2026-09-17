import type { BusinessModelData } from '../../components/BusinessModel'

export const AUTO_ANCILLARY_BUSINESS: BusinessModelData = {
  industryName: 'Auto Ancillary',
  brandColor: '#005B75',
  industryKey: 'auto-ancillary',
  tagline: 'The supplier pyramid behind every vehicle — organised in tiers.',
  intro:
    'Auto ancillaries are the companies that make the ~20,000 components in a vehicle — engines parts, brakes, electronics, seats, lighting, tyres and more — that vehicle makers (OEMs) buy and assemble. The industry is organised as a pyramid: Tier-1 suppliers sell finished systems directly to OEMs, Tier-2 make parts for Tier-1, and Tier-3 supply raw/basic inputs. Understanding an ancillary company means knowing which tier it sits in, and whether it sells to OEMs, the replacement (aftermarket), or exports.',
  stats: [
    { label: 'Structure', value: 'Tier 1 / 2 / 3' },
    { label: 'Two Markets', value: 'OEM + Aftermarket' },
    { label: 'Best Margin', value: 'Aftermarket & exports' },
    { label: 'Nature', value: 'Supplier-driven' },
  ],
  rawMaterials: [
    { name: 'Steel & Aluminium', note: 'Forged/cast/machined into engine, transmission and structural parts; metal prices drive cost.', source: 'Domestic' },
    { name: 'Plastics & Rubber', note: 'Moulded into interiors, trims, seals and hoses; crude-oil-linked.', source: 'Mixed' },
    { name: 'Electronic Components', note: 'Chips, sensors and PCBs for the fast-growing electronics/ADAS/EV content — largely imported.', source: 'Imported' },
    { name: 'Sub-Components (Tier-2/3)', note: 'Bearings, fasteners, castings bought from lower tiers to build finished systems.', source: 'Domestic' },
    { name: 'Technology / Licences', note: 'Design know-how and technical tie-ups with global majors — the real differentiator for Tier-1s.', source: 'Mixed' },
  ],
  processIntro: 'The supplier pyramid, tier by tier — plus the two channels (OEM vs aftermarket) an ancillary can sell into.',
  process: [
    { step: 'Tier-1 Suppliers', keyFact: 'Sell to OEMs', output: 'Finished systems', detail: 'Make complete systems or modules (e.g. braking system, instrument cluster, seats) and supply them directly to vehicle makers, often co-developing with the OEM. The largest, most technology-intensive tier.' },
    { step: 'Tier-2 Suppliers', keyFact: 'Sell to Tier-1', output: 'Components', detail: 'Make individual components and sub-assemblies (e.g. a specific valve or moulded part) that Tier-1s assemble into systems. Compete more on cost and quality.' },
    { step: 'Tier-3 Suppliers', keyFact: 'Sell to Tier-2', output: 'Basic parts / material', detail: 'Provide raw or basic inputs — castings, forgings, fasteners, processed metal — that feed the upper tiers. The most commoditised, price-driven base of the pyramid.' },
    { step: 'OEM Channel', keyFact: 'Volume, thin margin', output: 'Fitment on new vehicles', detail: 'Selling parts to be fitted on new vehicles. High, predictable volume but tough price pressure and long payment cycles from OEMs.' },
    { step: 'Aftermarket Channel', keyFact: 'Replacement parts', output: 'Spares to owners', detail: 'Selling replacement parts to vehicle owners via distributors and garages once original parts wear out. Fragmented, but far higher margin than OEM supply.' },
    { step: 'Exports', keyFact: 'Global supply', output: 'Parts to world OEMs', detail: 'Supplying components to global OEMs and aftermarkets — a big opportunity as world buyers diversify sourcing to India ("China+1").' },
  ],
  products: [
    { name: 'Engine & Transmission Parts', note: 'Pistons, valves, gears, castings — precision, metal-heavy components.' },
    { name: 'Electricals & Electronics', note: 'Wiring, lighting, sensors, control units — the fastest-growing content, especially for EVs.' },
    { name: 'Body, Chassis & Suspension', note: 'Sheet-metal parts, frames, springs, brakes and steering systems.' },
    { name: 'Interiors & Consumables', note: 'Seats, dashboards, trims, plus batteries, filters and belts sold heavily in the aftermarket.' },
  ],
  customers: [
    { name: 'Domestic OEMs', note: 'Indian car, two-wheeler and commercial-vehicle makers fitting new vehicles.', share: 48 },
    { name: 'Aftermarket / Replacement', note: 'Vehicle owners buying spares via distributors and garages — high margin.', share: 22 },
    { name: 'Exports (Global OEMs)', note: 'Overseas vehicle makers and Tier-1s sourcing from India.', share: 20 },
    { name: 'Other Ancillaries (Tier-1/2)', note: 'B2B supply within the pyramid to higher tiers.', share: 10 },
  ],
  drivers: [
    { factor: 'OEM Production Volumes', effect: 'OEM demand directly sets order volumes; when vehicle sales slow, ancillaries feel it fast.', type: 'demand' },
    { factor: 'Raw-Material & Metal Prices', effect: 'Steel, aluminium and plastics are the big cost inputs; ancillaries often absorb price swings before passing them on.', type: 'cost' },
    { factor: 'EV & Electronics Shift', effect: 'EVs and electronics raise value-per-vehicle for some ancillaries while making engine-part makers vulnerable.', type: 'demand' },
    { factor: 'Aftermarket Strength', effect: 'A large vehicle parc means steady, high-margin replacement demand that cushions OEM cyclicality.', type: 'demand' },
    { factor: 'China+1 Export Opportunity', effect: 'Global sourcing diversification opens export growth for cost-competitive Indian suppliers.', type: 'external' },
    { factor: 'Technology & Localisation', effect: 'Ability to co-develop, localise and meet quality/tech standards decides who moves up the value chain.', type: 'policy' },
  ],
  economics:
    'Ancillary economics depend on tier and channel: Tier-1 system suppliers earn better, stickier margins on technology and OEM relationships; lower tiers compete on cost. OEM supply is high-volume but low-margin with pricing pressure, while aftermarket and exports are more profitable. Winners diversify across customers/channels, localise technology, and grow content-per-vehicle as electronics and EVs rise.',
  insurerNote:
    'Ancillary units range from foundries and forging (high heat/fire and machinery hazard) to electronics assembly (fire, sensitive equipment), so exposures span fire, machinery breakdown and business interruption — and a single supplier\'s outage can ripple up the chain. Product liability and recall risk are real when a defective part reaches vehicles. Property, MB, BI and product-liability cover, plus marine for exports/imports, are central to underwriting.',
}
