import type { BusinessModelData } from '../../components/BusinessModel'

export const TEXTILE_BUSINESS: BusinessModelData = {
  industryName: 'Textile',
  brandColor: '#DB2777',
  industryKey: 'textile',
  tagline: 'A long value chain from raw fibre to the garment you wear.',
  intro:
    'The textile industry turns fibre into yarn, yarn into fabric, and fabric into finished garments and home textiles. It is one of India\'s largest employers and a major exporter, spanning everything from cotton farms to fashion brands. The key thing to understand is that it is a value chain: different companies specialise at different stages (spinning, weaving, processing, garmenting), and profitability rises as you move downstream toward branded garments.',
  stats: [
    { label: 'Employment', value: '2nd-largest' },
    { label: 'Key Fibre', value: 'Cotton + man-made' },
    { label: 'Value Add', value: 'Rises downstream' },
    { label: 'Nature', value: 'Labour-intensive, export' },
  ],
  rawMaterials: [
    { name: 'Cotton', note: 'The dominant natural fibre in India; prices are seasonal and set by crop, MSP and global cotton markets.', source: 'Domestic' },
    { name: 'Man-Made Fibres (Polyester/Viscose)', note: 'Petrochemical-based fibres; India\'s fibre mix is shifting toward these. Feedstock linked to crude oil.', source: 'Mixed' },
    { name: 'Dyes & Chemicals', note: 'Used in processing/finishing to colour and treat fabric; a key effluent and compliance area.', source: 'Mixed' },
    { name: 'Yarn / Fabric (bought-in)', note: 'Downstream players (garmenters) buy yarn or fabric rather than making it — the chain is highly specialised.', source: 'Domestic' },
    { name: 'Power & Water', note: 'Spinning and processing are energy- and water-intensive; captive power helps competitiveness.', source: 'Domestic' },
  ],
  processIntro: 'The textile value chain, stage by stage. Each stage is often a separate business, and margins generally improve as you move from fibre toward the finished branded garment.',
  process: [
    { step: '1. Ginning', keyFact: 'Cotton cleaning', output: 'Cleaned fibre', detail: 'Raw cotton is cleaned and separated from seeds (ginning) to produce cotton lint ready for spinning. (Man-made fibres skip this and arrive as staple/filament.)' },
    { step: '2. Spinning', keyFact: 'Fibre → yarn', output: 'Yarn', detail: 'Cleaned fibres are drawn out and twisted together into a continuous thread (yarn) on spinning machines. India has huge spinning capacity and exports a lot of yarn.' },
    { step: '3. Weaving / Knitting', keyFact: 'Yarn → fabric', output: 'Greige fabric', detail: 'Yarn is interlaced on looms (weaving) or looped on knitting machines to form unfinished "greige" fabric. This stage is fragmented across mills and power-loom clusters.' },
    { step: '4. Processing (Dyeing & Finishing)', keyFact: 'Colour + treat', output: 'Finished fabric', detail: 'Fabric is bleached, dyed or printed and given finishes (softness, wrinkle-resistance, water-repellence). This is chemical- and water-intensive and the biggest environmental focus.' },
    { step: '5. Garmenting / Made-ups', keyFact: 'Cut & sew', output: 'Garments / home textiles', detail: 'Finished fabric is cut and stitched into garments, or made into home textiles (bed linen, towels). This labour-intensive stage adds the most value and drives exports.' },
    { step: '6. Branding & Retail', keyFact: 'Brand + distribution', output: 'Products to consumers', detail: 'Garments are branded, packaged and sold through retail, e-commerce or export buyers. Brand, design and distribution capture the highest margin in the whole chain.' },
  ],
  products: [
    { name: 'Yarn', note: 'Cotton and blended yarn — a large export item; the most commoditised, lowest-margin stage.' },
    { name: 'Fabric (woven & knitted)', note: 'Greige and processed fabric sold to garmenters and home-textile makers.' },
    { name: 'Garments / Apparel', note: 'Finished clothing — the highest value-add and the main export driver.' },
    { name: 'Home & Technical Textiles', note: 'Bed/bath linen, plus fast-growing technical textiles (medical, auto, geo-textiles) with premium margins.' },
  ],
  customers: [
    { name: 'Export Buyers (Apparel)', note: 'Global brands and retailers sourcing garments and home textiles — a major revenue share.', share: 35 },
    { name: 'Domestic Apparel & Retail', note: 'Indian brands, retailers and the vast unorganised clothing market.', share: 30 },
    { name: 'Downstream Textile Mills', note: 'B2B sale of yarn/fabric to weavers, processors and garmenters.', share: 22 },
    { name: 'Home Textile Buyers', note: 'Bed, bath and furnishing customers, domestic and export.', share: 8 },
    { name: 'Technical/Industrial', note: 'Buyers of specialised technical textiles.', share: 5 },
  ],
  drivers: [
    { factor: 'Cotton & Fibre Prices', effect: 'Cotton is seasonal and volatile; fibre cost is the biggest input and directly moves spinner margins.', type: 'cost' },
    { factor: 'Export Demand & Currency', effect: 'A big share of revenue is exports, so global consumer demand, order flow and the rupee matter greatly.', type: 'external' },
    { factor: 'China+1 / Sourcing Shift', effect: 'Global buyers diversifying sourcing away from China (and to Bangladesh/Vietnam/India) reshape order flows.', type: 'demand' },
    { factor: 'Government Schemes (PLI/PM MITRA)', effect: 'Incentives for man-made fibre, technical textiles and integrated parks support capacity and competitiveness.', type: 'policy' },
    { factor: 'Labour & Power Cost', effect: 'Garmenting is labour-intensive; wage and power costs decide export competitiveness versus rival countries.', type: 'cost' },
    { factor: 'Environmental Compliance', effect: 'Dyeing/processing effluent norms raise cost and can shut non-compliant units.', type: 'policy' },
  ],
  economics:
    'Textiles is a value-chain business: margins are thin and cyclical upstream (spinning yarn is a commodity tied to cotton prices) and richer downstream (branded garments and technical textiles). Integrated players who span multiple stages smooth out volatility, while specialists compete on cost (spinning) or design/brand (apparel). Export competitiveness hinges on labour cost, scale and free-trade access.',
  insurerNote:
    'Textile mills carry heavy fire load (cotton, fibre dust, fabric, chemicals) and large machinery, so fire and machinery-breakdown exposure is high — cotton godowns and processing units are classic fire risks. Chemical processing adds effluent/liability risk, and export businesses need marine cargo cover. Property, fire, MB and BI cover are central to underwriting.',
}
