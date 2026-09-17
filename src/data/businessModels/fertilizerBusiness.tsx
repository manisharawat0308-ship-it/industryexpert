import type { BusinessModelData } from '../../components/BusinessModel'

export const FERTILIZER_BUSINESS: BusinessModelData = {
  industryName: 'Fertilizer',
  brandColor: '#16A34A',
  industryKey: 'fertilizer',
  tagline: 'Turning air, gas and rock into the nutrients that feed the country\'s crops.',
  intro:
    'Fertilizers supply the three key plant nutrients — Nitrogen (N), Phosphorus (P) and Potassium (K) — that farmers add to soil to raise crop yields. In India it is a strategic, heavily subsidised industry: the government controls prices to keep fertilizer affordable and pays producers the difference as subsidy. So the business is shaped as much by policy and gas/raw-material import costs as by demand.',
  stats: [
    { label: 'Key Nutrients', value: 'N · P · K' },
    { label: 'Main Product', value: 'Urea (nitrogen)' },
    { label: 'Key Driver', value: 'Subsidy + gas price' },
    { label: 'Nature', value: 'Regulated, seasonal' },
  ],
  rawMaterials: [
    { name: 'Natural Gas', note: 'The main feedstock and fuel for urea (via ammonia). India imports a large share as LNG, so gas prices drive urea production cost.', source: 'Imported' },
    { name: 'Rock Phosphate', note: 'The source of phosphorus for DAP and NPK. India imports almost all of it — a major dependency.', source: 'Imported' },
    { name: 'Potash (MOP)', note: 'The potassium source. India imports 100% of its potash — there are no domestic reserves.', source: 'Imported' },
    { name: 'Sulphur / Phosphoric Acid', note: 'Used to process rock phosphate into phosphatic fertilizers; part imported.', source: 'Imported' },
    { name: 'Ammonia', note: 'Made from natural gas + nitrogen from air; the building block for urea and other N-fertilizers.', source: 'Mixed' },
  ],
  processIntro: 'How the main fertilizers are made — urea (nitrogen) is synthesised from gas and air, while phosphatic and potassic fertilizers are processed from imported minerals.',
  process: [
    { step: '1. Ammonia Synthesis', keyFact: 'Haber-Bosch', output: 'Ammonia (NH₃)', detail: 'Natural gas is reformed to produce hydrogen, which is combined with nitrogen from the air under high pressure and temperature (the Haber-Bosch process) to make ammonia — the foundation of nitrogen fertilizers.' },
    { step: '2. Urea Production', keyFact: 'Ammonia + CO₂', output: 'Urea', detail: 'Ammonia is reacted with carbon dioxide to form urea, the most widely used nitrogen fertilizer (46% N). It is then prilled or granulated into the familiar white beads.' },
    { step: '3. Phosphatic Processing', keyFact: 'Rock + acid', output: 'DAP / phosphoric acid', detail: 'Imported rock phosphate is treated with sulphuric/phosphoric acid and combined with ammonia to make DAP (Di-Ammonium Phosphate) and other phosphatic fertilizers.' },
    { step: '4. NPK Blending', keyFact: 'Nutrient mix', output: 'Complex fertilizers', detail: 'Nitrogen, phosphorus and potassium sources are combined in fixed ratios (e.g. 10:26:26) to make "complex" fertilizers tailored to crop and soil needs.' },
    { step: '5. Granulation & Coating', keyFact: 'Uniform granules', output: 'Finished granules', detail: 'The product is granulated into uniform, free-flowing beads and sometimes coated (e.g. neem-coated urea) to slow nutrient release and curb diversion to non-farm use.' },
    { step: '6. Bagging & Distribution', keyFact: '50 kg bags', output: 'Fertilizer to farmers', detail: 'Finished fertilizer is bagged and moved through a wide dealer network to farmers, tracked under the subsidy system (DBT) to ensure it reaches genuine buyers.' },
  ],
  products: [
    { name: 'Urea', note: 'The dominant nitrogen fertilizer (46% N). Price-controlled and the most heavily subsidised — the backbone of Indian fertilizer use.' },
    { name: 'DAP (Di-Ammonium Phosphate)', note: 'The main phosphatic fertilizer, supplying N and P; largely import-dependent.' },
    { name: 'NPK Complexes', note: 'Balanced multi-nutrient fertilizers in various ratios for specific crops.' },
    { name: 'MOP & Speciality/Water-soluble', note: 'Potash (imported) plus micronutrients and water-soluble grades for high-value farming.' },
  ],
  customers: [
    { name: 'Foodgrain Farmers', note: 'Rice, wheat and cereals — the largest fertilizer consumers.', share: 55 },
    { name: 'Cash-Crop Farmers', note: 'Sugarcane, cotton, oilseeds — heavy nutrient users.', share: 22 },
    { name: 'Horticulture & Plantations', note: 'Fruits, vegetables, tea/coffee — growing use of complex and speciality grades.', share: 13 },
    { name: 'Institutional & Exports', note: 'Government schemes, cooperatives and limited exports.', share: 10 },
  ],
  drivers: [
    { factor: 'Government Subsidy Policy', effect: 'Prices (especially urea) are controlled; producers depend on timely subsidy payments. Policy shifts swing profitability and cash flow.', type: 'policy' },
    { factor: 'Natural Gas Price', effect: 'Gas is the main urea feedstock; imported LNG prices directly set production cost.', type: 'cost' },
    { factor: 'Global Raw Material Prices', effect: 'Rock phosphate, potash and ammonia are largely imported — global price and currency swings hit phosphatic/potassic economics.', type: 'external' },
    { factor: 'Monsoon & Crop Cycle', effect: 'Demand is seasonal and rain-dependent — a good monsoon and sowing season lift sales sharply.', type: 'demand' },
    { factor: 'Import Dependence', effect: 'Heavy reliance on imported P and K exposes India to supply shocks and geopolitics.', type: 'external' },
    { factor: 'Nutrient-Based Subsidy (NBS)', effect: 'The subsidy formula for non-urea fertilizers shapes which nutrients farmers can afford and how producers price.', type: 'policy' },
  ],
  economics:
    'Fertilizer economics are dominated by policy: for urea, the government fixes the farm-gate price and reimburses producers the gap between cost and price as subsidy — so cost efficiency (energy per tonne) and timely subsidy release drive profits. For non-urea fertilizers under Nutrient-Based Subsidy, margins depend on global raw-material prices versus a fixed subsidy. Scale, energy efficiency and access to cheap gas are the key competitive edges.',
  insurerNote:
    'Fertilizer plants are large process facilities handling ammonia (toxic and flammable), high-pressure reactors and stored raw materials, so exposures include fire/explosion, toxic release, machinery breakdown and business interruption. Ammonia storage and handling is a major hazard. Property, MB and BI cover, plus marine cover on imported gas, rock phosphate and potash, are central to underwriting.',
}
