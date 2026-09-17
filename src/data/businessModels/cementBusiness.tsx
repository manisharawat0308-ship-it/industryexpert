import type { BusinessModelData } from '../../components/BusinessModel'

export const CEMENT_BUSINESS: BusinessModelData = {
  industryName: 'Cement',
  brandColor: '#6B7280',
  industryKey: 'cement',
  tagline: 'Binding sand, stone and water into the concrete that builds a nation.',
  intro:
    'Cement is the grey powder that, mixed with sand, aggregate and water, becomes concrete — the most-used building material on earth. It is a bulk, energy- and freight-intensive commodity: plants are built next to limestone deposits, and because cement is heavy and low-value, it can only be sold profitably within ~300 km of the plant. That makes it a regional business where logistics, power/fuel cost and capacity utilisation decide margins.',
  stats: [
    { label: 'India Capacity', value: '~600 MTPA' },
    { label: 'World Rank', value: '#2 producer' },
    { label: 'Key Cost', value: 'Power, fuel & freight' },
    { label: 'Nature', value: 'Regional, cyclical' },
  ],
  rawMaterials: [
    { name: 'Limestone', note: 'The main raw material (~1.5 t per t of cement). Plants are located at the mine — captive limestone reserves are the single biggest competitive asset.', source: 'Domestic' },
    { name: 'Coal / Pet Coke', note: 'Fuel to fire the kiln to ~1,450°C. India imports a large share of pet coke and coking-grade coal, so fuel prices swing costs sharply.', source: 'Imported' },
    { name: 'Clay / Bauxite / Iron Ore', note: 'Corrective minerals added in small amounts to balance the clinker chemistry.', source: 'Domestic' },
    { name: 'Gypsum', note: 'Added at the grinding stage to control how fast cement sets. Part natural, part imported / by-product.', source: 'Mixed' },
    { name: 'Fly Ash / Slag', note: 'By-products from power plants and steel mills, blended in to make PPC/PSC — cheaper and lower-carbon than pure clinker.', source: 'Domestic' },
  ],
  processIntro: 'From a limestone quarry to the bag of cement, in six broad stages. Cement making is essentially "cook limestone into clinker, then grind clinker into powder".',
  process: [
    { step: '1. Quarrying & Crushing', keyFact: 'At the mine', output: 'Crushed limestone', detail: 'Limestone is mined from the plant\'s own quarry, then crushed into small pieces. Being at the mine keeps this cheap — transporting limestone long distances would kill the economics.' },
    { step: '2. Raw Meal Grinding', keyFact: 'Raw mill', output: 'Raw meal', detail: 'Crushed limestone is blended with clay and corrective minerals and ground into a fine powder called "raw meal", with the chemistry precisely controlled.' },
    { step: '3. Pre-heating', keyFact: 'Pre-heater tower', output: 'Hot raw meal', detail: 'Raw meal is heated in a tower of cyclones using the kiln\'s hot exhaust gases, driving off moisture and CO₂ before it enters the kiln. This heat recovery is central to fuel efficiency.' },
    { step: '4. Clinkerisation (Kiln)', keyFact: '~1,450°C rotary kiln', output: 'Clinker', detail: 'In the rotary kiln, the raw meal is fused at ~1,450°C into hard, marble-sized nodules called clinker. This is the most energy-intensive step and the main source of cement\'s CO₂ emissions.' },
    { step: '5. Cooling & Grinding', keyFact: 'Cement mill', output: 'Cement powder', detail: 'Clinker is rapidly cooled, then ground with gypsum (and fly ash or slag for blended cement) into the fine grey powder we know as cement.' },
    { step: '6. Packing & Dispatch', keyFact: 'Bags / bulk', output: 'Cement to market', detail: 'Cement is stored in silos, then packed into 50 kg bags or shipped in bulk. Because it\'s heavy and cheap, road/rail freight is a huge cost — sold mostly within a ~300 km radius.' },
  ],
  products: [
    { name: 'Ordinary Portland Cement (OPC)', note: 'Pure clinker-based cement (43/53 grade). High strength, used where speed and strength matter — infrastructure, RMC.' },
    { name: 'Portland Pozzolana Cement (PPC)', note: 'OPC blended with fly ash. Cheaper, more durable, lower-carbon — the largest-selling type in India (housing).' },
    { name: 'Portland Slag Cement (PSC)', note: 'Blended with steel-plant slag. Popular in coastal / aggressive environments.' },
    { name: 'Ready-Mix Concrete (RMC) & specials', note: 'Pre-mixed concrete delivered to site, plus white cement and special grades — higher value-add.' },
  ],
  customers: [
    { name: 'Housing & Real Estate', note: 'Individual home builders and developers — the biggest demand segment.', share: 55 },
    { name: 'Infrastructure', note: 'Roads, bridges, metros, ports, airports — driven by government capex.', share: 24 },
    { name: 'Commercial & Industrial', note: 'Offices, malls, factories, warehouses.', share: 13 },
    { name: 'Ready-Mix & Others', note: 'RMC plants and precast/product makers.', share: 8 },
  ],
  drivers: [
    { factor: 'Power & Fuel Cost', effect: 'Coal/pet-coke and electricity are ~30-40% of cost. Fuel price spikes hit margins directly; captive power and waste-heat recovery help.', type: 'cost' },
    { factor: 'Freight & Logistics', effect: 'Cement is heavy and low-value, so freight is a huge cost. Plant location and rail vs road mix decide who can serve a market profitably.', type: 'cost' },
    { factor: 'Capacity Utilisation', effect: 'A fixed-cost business — profits swing sharply with how full the plant runs. Overcapacity in a region crushes prices.', type: 'demand' },
    { factor: 'Construction & Housing Cycle', effect: 'Demand tracks real estate, rural housing and government infra spending; monsoon slows construction seasonally.', type: 'demand' },
    { factor: 'Limestone Reserves & Leases', effect: 'Access to long-life captive limestone is a structural moat; new mining leases and clearances gate expansion.', type: 'policy' },
    { factor: 'Carbon & Green Rules', effect: 'Cement is a top industrial CO₂ emitter. Carbon norms and the push to blended/green cement raise future capex.', type: 'policy' },
  ],
  economics:
    'Cement is a regional fixed-cost commodity: profit ≈ (price realised per bag) − (limestone + fuel + power + freight). Because plants have high fixed costs, the swing factor is capacity utilisation and pricing discipline in each region. Winners have captive limestone, low-cost power, efficient kilns, and plants located close to demand to minimise freight.',
  insurerNote:
    'Cement plants are large, high-value fixed assets with rotary kilns, crushers, mills and captive power — key exposures are machinery breakdown (kiln/mill failure causing long downtime), fire, and business interruption. Limestone mining adds operational and liability risk. Property, MB and BI cover, plus marine cover on imported fuel, are central to underwriting.',
}
