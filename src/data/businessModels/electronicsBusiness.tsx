import type { BusinessModelData } from '../../components/BusinessModel'

export const ELECTRONICS_BUSINESS: BusinessModelData = {
  industryName: 'Electronics',
  brandColor: '#4338CA',
  industryKey: 'electronics',
  tagline: 'Assembling chips, boards and components into the devices that run modern life.',
  intro:
    'The electronics industry designs and manufactures everything from phones and TVs to industrial and defence electronics. In India the business is dominated by assembly — contract manufacturers (EMS) build products for global and domestic brands — while the highest-value part, semiconductor chip fabrication, is mostly done abroad. So understanding electronics means knowing the split between brand owners, contract manufacturers (EMS), and component/chip makers, and how much value each captures.',
  stats: [
    { label: 'India Strength', value: 'Assembly (EMS)' },
    { label: 'High-Value Gap', value: 'Chips (imported)' },
    { label: 'Key Push', value: 'PLI + localisation' },
    { label: 'Nature', value: 'Scale, thin margin' },
  ],
  rawMaterials: [
    { name: 'Semiconductors (Chips)', note: 'The "brain" of every device; almost entirely imported. Chip supply and price are critical and were a global bottleneck.', source: 'Imported' },
    { name: 'PCBs (Printed Circuit Boards)', note: 'The board that holds and connects components; a growing localisation focus under PLI.', source: 'Mixed' },
    { name: 'Passive & Electro-mechanical Parts', note: 'Resistors, capacitors, connectors, displays and batteries — mostly imported.', source: 'Imported' },
    { name: 'Displays & Camera Modules', note: 'High-value sub-assemblies for phones/TVs, largely sourced from East Asia.', source: 'Imported' },
    { name: 'Plastics & Metals (Enclosures)', note: 'Casings, frames and mechanicals — more readily made domestically.', source: 'Domestic' },
  ],
  processIntro: 'How an electronic product is built — mount components on the board (SMT), assemble and test, then box it. Chip design/fabrication happens upstream, mostly overseas.',
  process: [
    { step: '1. Design & Sourcing', keyFact: 'Brand / ODM', output: 'BOM & design', detail: 'The product is designed (by the brand or an ODM), and the bill of materials — chips, components, PCB — is sourced globally. Design and chip IP capture the most value.' },
    { step: '2. PCB Fabrication', keyFact: 'Bare board', output: 'Printed circuit board', detail: 'The bare printed circuit board — the backbone that carries and connects all components — is manufactured. India is building this capability but still imports much of it.' },
    { step: '3. SMT Assembly', keyFact: 'Pick-and-place', output: 'Populated board', detail: 'Surface-Mount Technology lines precisely place and solder tiny components (including chips) onto the PCB in a reflow oven. This is the heart of electronics manufacturing (EMS).' },
    { step: '4. Final Assembly', keyFact: 'Box build', output: 'Assembled device', detail: 'The populated board is combined with display, battery, enclosure and mechanicals into the finished device ("box build") — often the labour-intensive step done at scale in India.' },
    { step: '5. Testing & QC', keyFact: 'Functional test', output: 'Tested product', detail: 'Each unit is functionally tested, calibrated and inspected. Firmware/software is loaded and quality checks catch defects before shipment.' },
    { step: '6. Packaging & Dispatch', keyFact: 'Brand / retail', output: 'Products to market', detail: 'Devices are packed, often under the brand owner\'s name, and shipped to retail, e-commerce or export markets.' },
  ],
  products: [
    { name: 'Mobile Phones', note: 'The largest segment; India is now a major assembly hub for global and domestic brands under PLI.' },
    { name: 'Consumer Electronics', note: 'TVs, appliances, wearables and audio — high volume, brand-driven.' },
    { name: 'Industrial & Auto Electronics', note: 'Controllers, power electronics and automotive electronics — higher value, growing with EVs and automation.' },
    { name: 'Components & PCBs', note: 'Boards, passives and sub-assemblies supplied B2B — the localisation frontier.' },
  ],
  customers: [
    { name: 'Global Brands (via EMS)', note: 'International brands using Indian contract manufacturers to assemble products.', share: 38 },
    { name: 'Domestic Consumers (Retail)', note: 'Indian buyers of phones, TVs and appliances via retail/e-commerce.', share: 30 },
    { name: 'Exports', note: 'Assembled devices shipped abroad — a fast-growing share under PLI.', share: 20 },
    { name: 'Industrial & Institutional', note: 'Businesses, telecom, auto and government buyers of electronics.', share: 12 },
  ],
  drivers: [
    { factor: 'Semiconductor Supply & Price', effect: 'Chips are imported and were a global bottleneck; availability and price directly gate production and margins.', type: 'external' },
    { factor: 'PLI & Localisation Policy', effect: 'Production-linked incentives and import duties are driving assembly and component localisation in India.', type: 'policy' },
    { factor: 'Consumer Demand & Upgrades', effect: 'Device demand tracks incomes, replacement cycles and new features (5G, AI, EVs).', type: 'demand' },
    { factor: 'Currency & Imports', effect: 'Heavy component imports make a weak rupee costly and expose supply-chain risk.', type: 'cost' },
    { factor: 'Technology Obsolescence', effect: 'Fast product cycles mean inventory and models can become obsolete quickly — a real margin risk.', type: 'demand' },
    { factor: 'Global Supply-Chain Shifts', effect: 'China+1 diversification is moving assembly and some component work to India.', type: 'external' },
  ],
  economics:
    'Electronics is a scale, thin-margin assembly business in India: contract manufacturers (EMS) earn small margins on high volumes, while brand owners and chip designers capture most of the profit. The strategy is to climb the value chain — from box-assembly toward components, PCBs and eventually chips — using PLI support, and to win on scale, quality and speed. Component import dependence is the key vulnerability.',
  insurerNote:
    'Electronics plants hold high-value, compact inventory and sensitive equipment (SMT lines, clean areas), so exposures include fire, high-value stock accumulation, and severe business interruption from equipment or supply-chain disruption. Product warranty/recall risk exists for defects. Property, MB, BI and stock cover, plus marine cover on imported chips and components, are central to underwriting.',
}
