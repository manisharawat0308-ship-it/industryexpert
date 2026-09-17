import type { BusinessModelData } from '../../components/BusinessModel'

// Chemicals is NOT a single-process industry — it is a family of very different
// businesses. The most useful lens for an insurer is HAZARD (flash point /
// flammability), so the "process" section is repurposed to bucket chemical
// companies by their flash-point / fire-hazard class.

export const CHEMICAL_BUSINESS: BusinessModelData = {
  industryName: 'Chemicals',
  brandColor: '#7C3AED',
  tagline: 'Not one business but many — bucketed here by what they make and how hazardous it is.',
  // Chemicals isn't a single production line — it's a family of businesses
  // grouped by hazard, so relabel the sections accordingly.
  labels: {
    rawMaterials: 'Feedstocks & Inputs',
    rawMaterialsSub: 'The base materials that chemical companies convert.',
    process: 'Types of Chemical Companies (by Hazard)',
    products: 'What They Produce',
    productsSub: 'The broad product families across the industry.',
    customers: 'Who Buys It — End Markets',
    customersSub: 'The industries that consume chemicals.',
    drivers: 'What Impacts the Business',
    economics: 'How the Money Works',
  },
  intro:
    'The chemicals industry converts basic feedstocks (crude oil, natural gas, minerals, agri inputs) into thousands of products used by almost every other industry. It is not a single business: a petrochemical cracker, a specialty-chemical maker and an agrochemical plant have completely different economics and risk. For an insurer the sharpest way to understand a chemical company is by its FLASH POINT — how easily its materials ignite — because that drives the fire/explosion hazard and the premium.',
  stats: [
    { label: 'India Rank', value: '6th globally' },
    { label: 'Sub-segments', value: 'Bulk → Specialty' },
    { label: 'Key Lens', value: 'Flash point / hazard' },
    { label: 'Nature', value: 'Diverse, hazardous' },
  ],
  rawMaterials: [
    { name: 'Crude Oil / Naphtha', note: 'Cracked into ethylene, propylene and other building blocks — the base of petrochemicals and most organic chemistry.', source: 'Imported' },
    { name: 'Natural Gas', note: 'Feedstock and fuel; source of methanol, ammonia and hydrogen. Cheaper gas = cheaper chemistry.', source: 'Imported' },
    { name: 'Minerals & Salts', note: 'Salt, sulphur, phosphate rock, limestone — the base of inorganic chemicals (soda ash, acids, chlor-alkali).', source: 'Mixed' },
    { name: 'Intermediates', note: 'Bulk chemicals bought by specialty makers to build higher-value molecules (a huge share is imported from China).', source: 'Imported' },
    { name: 'Solvents & Catalysts', note: 'Reaction media and accelerators; many solvents are themselves highly flammable (low flash point).', source: 'Mixed' },
  ],
  processIntro: 'Chemical companies grouped by flash point — the temperature at which their materials give off enough vapour to ignite. The lower the flash point, the higher the fire/explosion hazard (and the more demanding the insurance).',
  process: [
    { step: 'Extremely Flammable (Flash < 0°C)', keyFact: 'Class IA', output: 'Highest fire/explosion risk', detail: 'Materials that ignite well below room temperature — ethylene oxide, LPG, ethyl ether, acetaldehyde. Handled under pressure/refrigeration with the strictest fire protection. Petrochemical crackers and gas processors sit here.' },
    { step: 'Highly Flammable (Flash 0–23°C)', keyFact: 'Class IB', output: 'Very high risk', detail: 'Ignite at or near ambient temperature — acetone, methanol, toluene, hexane, most solvents. Common in solvent-based specialty chemicals, paints, adhesives and pharma intermediates. Vapour management is critical.' },
    { step: 'Flammable (Flash 23–60°C)', keyFact: 'Class IC / II', output: 'High risk', detail: 'Ignite when moderately warmed — xylene, kerosene, many aromatic intermediates. Typical of bulk organic chemistry and refining-linked plants.' },
    { step: 'Combustible (Flash 60–93°C)', keyFact: 'Class IIIA', output: 'Moderate risk', detail: 'Need real heating to ignite — diesel-range oils, some plasticisers and heavier organics. Lower vapour hazard, but large storage volumes still matter.' },
    { step: 'Low-Hazard / Non-Flammable (Flash > 93°C)', keyFact: 'Class IIIB', output: 'Lower fire risk', detail: 'High flash point or non-flammable — inorganic acids/alkalis (chlor-alkali, soda ash), fertiliser chemicals, water-based products. Here the hazard shifts from fire to toxicity, corrosion and reactivity.' },
  ],
  products: [
    { name: 'Petrochemicals & Polymers', note: 'Bulk building blocks (ethylene, propylene) and plastics (PE, PP, PVC). Large-scale, commodity, cyclical — flammability high.' },
    { name: 'Specialty & Fine Chemicals', note: 'Small-volume, high-value molecules — dyes, pigments, additives, custom synthesis for pharma/agro. India\'s fastest-growing chemical segment.' },
    { name: 'Agrochemicals', note: 'Pesticides, herbicides, fungicides — often flammable solvents + toxic actives; seasonal, monsoon-linked demand.' },
    { name: 'Inorganic / Chlor-Alkali', note: 'Caustic soda, chlorine, soda ash, acids. Corrosive and reactive rather than flammable; power-intensive.' },
  ],
  customers: [
    { name: 'Agriculture', note: 'Agrochemicals and crop-protection buyers — farmers via distributors.', share: 20 },
    { name: 'Pharma & Life Sciences', note: 'APIs, intermediates and specialty reagents.', share: 18 },
    { name: 'Textiles, Dyes & Pigments', note: 'Colourants and processing chemicals.', share: 16 },
    { name: 'Plastics & Packaging', note: 'Polymers and additives converters.', share: 15 },
    { name: 'Paints, Auto & Construction', note: 'Coatings, resins, construction chemicals.', share: 16 },
    { name: 'Consumer & Others', note: 'Home care, personal care, water treatment.', share: 15 },
  ],
  drivers: [
    { factor: 'Crude Oil & Feedstock Prices', effect: 'Naphtha/gas prices set the cost base for petrochemicals; oil swings ripple through the whole chain.', type: 'cost' },
    { factor: 'China Supply & Dumping', effect: 'China dominates bulk intermediates; its pricing and dumping decide margins for Indian bulk chemical makers.', type: 'external' },
    { factor: 'Environmental & Safety Norms', effect: 'Effluent, emission and hazardous-handling rules (PESO, pollution boards) gate approvals and raise compliance cost.', type: 'policy' },
    { factor: 'Specialty Shift & China+1', effect: 'Global buyers diversifying away from China lifts demand for Indian specialty and custom-synthesis players.', type: 'demand' },
    { factor: 'Fire / Explosion Hazard', effect: 'Low-flash-point plants carry the highest safety and insurance cost; one incident can wipe out a site.', type: 'cost' },
    { factor: 'End-Market Cycles', effect: 'Demand tracks agriculture (monsoon), autos, construction and exports — diverse but cyclical.', type: 'demand' },
  ],
  economics:
    'Economics vary sharply by bucket. Bulk petrochemicals are a scale/spread commodity game (margin = product price − feedstock), highly cyclical. Specialty and custom-synthesis players earn far higher, stickier margins on know-how, regulatory approvals and long customer relationships. The common thread: safety and environmental compliance are not optional — they are a cost of doing business.',
  insurerNote:
    'Chemicals are among the most hazard-diverse risks an insurer sees, so underwriting starts with flash point and reactivity. Low-flash-point (Class IA/IB) plants carry severe fire/explosion and vapour-cloud exposure; inorganic plants add corrosion and toxic-release risk. Key covers: property + fire/explosion, machinery breakdown, business interruption, plus public/environmental liability. Storage volumes, process safety management and separation distances are decisive rating factors.',
}
