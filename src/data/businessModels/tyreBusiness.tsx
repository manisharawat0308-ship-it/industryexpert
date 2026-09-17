import type { BusinessModelData } from '../../components/BusinessModel'

export const TYRE_BUSINESS: BusinessModelData = {
  industryName: 'Tyre',
  brandColor: '#1F2937',
  industryKey: 'tyre',
  tagline: 'Building rubber, fabric and steel into the only part of a vehicle that touches the road.',
  intro:
    'The tyre industry turns rubber, carbon black, fabric and steel wire into tyres for every kind of vehicle. It is a raw-material-heavy business — rubber and crude-oil-linked chemicals are the bulk of cost — split between two markets: fitting new vehicles (OEM) and, much more profitably, replacing worn tyres (the replacement market). Understanding a tyre company means watching rubber prices on one side and vehicle usage on the other.',
  stats: [
    { label: 'Two Markets', value: 'OEM + Replacement' },
    { label: 'Key Cost', value: 'Rubber + crude-linked' },
    { label: 'Best Margin', value: 'Replacement tyres' },
    { label: 'Nature', value: 'Raw-material heavy' },
  ],
  rawMaterials: [
    { name: 'Natural Rubber', note: 'The core elastic material; ~40%+ of cost. India imports a large share, so global rubber prices swing margins.', source: 'Imported' },
    { name: 'Synthetic Rubber', note: 'Crude-oil-derived rubber blended in for performance; price tracks crude and is largely imported.', source: 'Imported' },
    { name: 'Carbon Black', note: 'Reinforcing filler that gives tyres strength and their black colour; made from petroleum feedstock.', source: 'Domestic' },
    { name: 'Fabric & Steel Cord', note: 'Nylon/polyester fabric and steel wire form the tyre\'s reinforcing skeleton (plies and belts).', source: 'Mixed' },
    { name: 'Chemicals', note: 'Sulphur, accelerators and anti-oxidants that vulcanise and protect the rubber.', source: 'Mixed' },
  ],
  processIntro: 'From raw rubber to a finished tyre — mix the compound, build the green tyre, then cure it under heat and pressure.',
  process: [
    { step: '1. Compound Mixing', keyFact: 'Banbury mixer', output: 'Rubber compound', detail: 'Natural and synthetic rubber are blended with carbon black, oils and chemicals in a mixer to make different rubber compounds — each tuned for the tread, sidewall or inner liner.' },
    { step: '2. Component Preparation', keyFact: 'Extrude & calender', output: 'Tyre parts', detail: 'The compounds are formed into components: tread and sidewall are extruded; fabric and steel cord are coated with rubber (calendered) into plies and belts; bead wire is prepared.' },
    { step: '3. Tyre Building', keyFact: 'Building drum', output: 'Green tyre', detail: 'All the components — inner liner, plies, beads, belts, sidewalls and tread — are assembled on a building drum into an uncured "green tyre" shaped like the final product.' },
    { step: '4. Curing (Vulcanisation)', keyFact: 'Heat + pressure mould', output: 'Cured tyre', detail: 'The green tyre is pressed into a mould and cured under high heat and pressure. Vulcanisation cross-links the rubber, giving it strength and elasticity, and moulds in the tread pattern and markings.' },
    { step: '5. Inspection & Testing', keyFact: 'QC + uniformity', output: 'Approved tyres', detail: 'Every tyre is inspected visually and by machine (uniformity, balance, X-ray) to catch defects, because tyre failure is a safety-critical event.' },
    { step: '6. Dispatch', keyFact: 'OEM / replacement', output: 'Tyres to market', detail: 'Approved tyres are shipped either to vehicle makers (OEM) for new vehicles or, more profitably, to the replacement market via dealers and distributors.' },
  ],
  products: [
    { name: 'Truck & Bus Tyres (T&B)', note: 'The largest revenue segment by value; heavy usage means a big, steady replacement market.' },
    { name: 'Passenger Car & SUV Tyres', note: 'High-volume; growing with car ownership and premium/larger-rim demand.' },
    { name: 'Two-Wheeler Tyres', note: 'Very high volume in India; strong replacement demand.' },
    { name: 'Off-Highway / Farm (OTR)', note: 'Tractor, mining and construction tyres — niche, higher-margin specialty products.' },
  ],
  customers: [
    { name: 'Replacement Market', note: 'Vehicle owners replacing worn tyres via dealers — the largest and most profitable channel.', share: 60 },
    { name: 'OEM (Vehicle Makers)', note: 'Fitting new vehicles; high volume but low margin and price pressure.', share: 25 },
    { name: 'Exports', note: 'Tyres shipped to global markets, especially truck and off-highway.', share: 12 },
    { name: 'Government & Institutional', note: 'Fleet, defence and state transport tenders.', share: 3 },
  ],
  drivers: [
    { factor: 'Natural Rubber Price', effect: 'The single biggest input; rubber price spikes squeeze margins directly, and India depends on imports.', type: 'cost' },
    { factor: 'Crude Oil Price', effect: 'Synthetic rubber, carbon black and chemicals are crude-linked, so oil prices move a big part of the cost base.', type: 'cost' },
    { factor: 'Vehicle Usage & Fleet Activity', effect: 'Replacement demand tracks how much vehicles are driven (freight movement, mobility), not just new-vehicle sales.', type: 'demand' },
    { factor: 'Auto Sales Cycle', effect: 'OEM demand rises and falls with new vehicle production.', type: 'demand' },
    { factor: 'Cheap Imports & Dumping', effect: 'Low-cost imported tyres (esp. from China) pressure prices; anti-dumping duties offer protection.', type: 'policy' },
    { factor: 'Currency', effect: 'Heavy import of rubber and crude-linked inputs makes a weak rupee costly.', type: 'external' },
  ],
  economics:
    'Tyre economics are a spread between tyre prices and raw-material cost (rubber + crude-linked inputs), which together are ~60-65% of cost. The profit engine is the replacement market, where brand and dealer reach command better pricing than the low-margin OEM channel. Winners manage raw-material volatility, keep plants highly utilised, and build brand strength and distribution in replacement.',
  insurerNote:
    'Tyre plants combine large volumes of flammable rubber and oils with high-temperature curing presses and heavy machinery, giving high fire load and machinery-breakdown exposure; a fire in rubber storage or mixing is a classic large loss. Product liability matters because tyre failure is safety-critical. Property, fire, MB and BI cover, plus marine cover on imported rubber, are central to underwriting.',
}
