import type { BusinessModelData } from '../../components/BusinessModel'

// Pharma is less about a single manufacturing line and more about WHAT KIND of
// pharma company it is. The "process" section is repurposed to explain the main
// company archetypes / business models in the pharma value chain.

export const PHARMA_BUSINESS: BusinessModelData = {
  industryName: 'Pharma',
  brandColor: '#0EA5E9',
  tagline: 'Understanding pharma means knowing which kind of pharma company you are looking at.',
  // Pharma is about company archetypes more than a single production line.
  labels: {
    rawMaterials: 'Key Inputs',
    rawMaterialsSub: 'What a pharma company needs to make medicines.',
    process: 'Types of Pharma Companies',
    products: 'What They Produce',
    productsSub: 'The main product categories in pharma.',
    customers: 'Who Buys It — Markets & Channels',
    customersSub: 'Where pharma demand comes from.',
    drivers: 'What Impacts the Business',
    economics: 'How the Money Works',
  },
  intro:
    'Pharmaceuticals turn chemistry and biology into medicines. But "pharma" spans very different businesses: some invent brand-new drugs and live off patents, others make cheap copies at scale, others just supply the active ingredient or manufacture for someone else. India is the "pharmacy of the world" — the largest supplier of generic medicines by volume and a major exporter of active ingredients. To understand a pharma company, first identify which archetype it belongs to, because that decides its margins, risk and R&D intensity.',
  stats: [
    { label: 'India Rank', value: '3rd by volume' },
    { label: 'Global Role', value: 'Generics leader' },
    { label: 'Key Asset', value: 'Patents & approvals' },
    { label: 'Nature', value: 'R&D + regulation heavy' },
  ],
  rawMaterials: [
    { name: 'APIs (Active Ingredients)', note: 'The molecule that actually treats the disease. India imports a large share of APIs and key starting materials from China — a major dependency.', source: 'Imported' },
    { name: 'Excipients', note: 'Inactive fillers, binders and coatings that carry the API into a tablet/capsule/syrup.', source: 'Mixed' },
    { name: 'Solvents & Reagents', note: 'Chemicals used to synthesise and purify the API — many flammable, tightly controlled.', source: 'Mixed' },
    { name: 'Packaging (blister, vials)', note: 'Pharma-grade packaging that protects stability and enables traceability.', source: 'Domestic' },
    { name: 'Regulatory Approvals', note: 'Not a physical input but the real "raw material": ANDA/DMF filings, USFDA/WHO-GMP certification — without them a plant cannot sell.', source: 'Domestic' },
  ],
  processIntro: 'The main TYPES of pharma companies. A single group may do several of these, but each model has very different economics.',
  process: [
    { step: 'Innovator / Patented (R&D)', keyFact: 'Highest margin, highest risk', output: 'New molecules', detail: 'Discover and patent brand-new drugs, then earn exclusive high-margin sales for the patent life (~20 years). Requires huge, risky R&D spend — mostly global "Big Pharma"; a few Indian firms are entering novel research.' },
    { step: 'Generics', keyFact: 'Volume game', output: 'Off-patent copies', detail: 'Make chemically identical copies of drugs once the patent expires, sold far cheaper. This is India\'s core strength — massive scale, thin margins, and a race to be "first to file" when a patent lapses.' },
    { step: 'API / Bulk Drug', keyFact: 'B2B chemistry', output: 'Active ingredients', detail: 'Manufacture the active pharmaceutical ingredient itself and sell it to formulators. Capital- and chemistry-intensive; India is pushing to cut its import dependence on China via PLI schemes.' },
    { step: 'CDMO / CMO (Contract Mfg)', keyFact: 'Make-for-others', output: 'Outsourced production', detail: 'Contract Development & Manufacturing Organisations make drugs on behalf of other companies. Sticky, capacity-driven business benefiting from global outsourcing and "China+1".' },
    { step: 'Biologics & Biosimilars', keyFact: 'Living-cell drugs', output: 'Complex molecules', detail: 'Drugs grown from living cells (vaccines, insulin, antibodies) rather than chemistry. Very high technology and capex; biosimilars are the "generics" of this space and a fast-growing frontier.' },
    { step: 'Branded Formulations & OTC', keyFact: 'Brand + distribution', output: 'Finished medicines', detail: 'Sell finished, branded medicines to patients via doctors, chemists and hospitals. Success rides on brand, the medical-rep field force and distribution reach rather than pure chemistry.' },
  ],
  products: [
    { name: 'Formulations (tablets, capsules, injectables)', note: 'Finished dosage forms sold to patients — the largest, most consumer-facing segment.' },
    { name: 'Active Pharmaceutical Ingredients (APIs)', note: 'Bulk drugs sold B2B to formulators, domestic and export.' },
    { name: 'Biologics, Vaccines & Biosimilars', note: 'Cell-derived medicines — highest technology and value.' },
    { name: 'Specialty & Complex Generics', note: 'Hard-to-make generics (inhalers, injectables, transdermals) with fewer competitors and better margins.' },
  ],
  customers: [
    { name: 'Domestic Retail (Chemists)', note: 'Branded medicines reaching patients via pharmacies and doctors.', share: 30 },
    { name: 'Regulated Exports (US/EU)', note: 'Generics and APIs to strict, high-value markets — the growth engine.', share: 32 },
    { name: 'Emerging-Market Exports', note: 'Africa, LatAm, Asia — volume-driven generic demand.', share: 18 },
    { name: 'Hospitals & Institutions', note: 'Tenders, government schemes and hospital supply.', share: 12 },
    { name: 'Other Pharma Cos (B2B)', note: 'APIs and contract-manufactured products sold to other firms.', share: 8 },
  ],
  drivers: [
    { factor: 'Regulatory Approvals & Inspections', effect: 'USFDA / WHO-GMP audits can open or shut a plant overnight; a warning letter halts exports and hammers the stock.', type: 'policy' },
    { factor: 'Patent Cliffs & First-to-File', effect: 'When a blockbuster loses its patent, generics rush in; being first to file wins a lucrative exclusivity window.', type: 'demand' },
    { factor: 'API Import Dependence', effect: 'Heavy reliance on Chinese APIs/KSMs exposes cost and supply risk; PLI schemes aim to build local capacity.', type: 'cost' },
    { factor: 'Pricing Controls (NPPA/DPCO)', effect: 'Essential medicines are price-capped by the regulator, limiting domestic margins.', type: 'policy' },
    { factor: 'R&D Productivity', effect: 'For innovators, the pipeline of successful new molecules makes or breaks the business.', type: 'demand' },
    { factor: 'Currency & Exports', effect: 'A big share of revenue is export dollars, so the rupee and trade barriers matter.', type: 'external' },
  ],
  economics:
    'Margins depend entirely on the archetype: innovators earn very high margins on patents but spend heavily on risky R&D; generics live on scale and cost with thin margins; APIs and CDMOs are B2B and capacity-driven; biologics are high-margin but hugely capital-intensive. Across all of them, regulatory compliance and quality are the true licence to operate — a lost approval is worse than a lost customer.',
  insurerNote:
    'Pharma plants combine flammable-solvent chemistry, sterile/clean-room production and high-value inventory, so exposures span fire/explosion, contamination and recall, and business interruption from a regulatory shutdown. Product liability and clinical-trial liability matter for innovators; cargo/marine cover matters for API imports and export shipments. Regulatory-driven downtime is often the single largest BI risk.',
}
