import type { BusinessModelData } from '../../components/BusinessModel'

export const FMCG_BUSINESS: BusinessModelData = {
  industryName: 'FMCG',
  brandColor: '#EA580C',
  industryKey: 'fmcg',
  tagline: 'Small products, sold billions of times — where brand and distribution beat the factory.',
  intro:
    'FMCG (Fast-Moving Consumer Goods) makes everyday, low-priced, frequently-bought products — soaps, packaged food, beverages, personal care and home care. The manufacturing is often simple; the real business is brand-building and getting products onto millions of shelves. An FMCG company wins by owning strong brands and a distribution network that reaches the smallest village kirana store — so it is fundamentally a marketing and distribution business, not just a factory.',
  stats: [
    { label: 'Reach', value: '10M+ outlets' },
    { label: 'Real Moat', value: 'Brand + distribution' },
    { label: 'Split', value: 'Urban + huge rural' },
    { label: 'Nature', value: 'High volume, resilient' },
  ],
  rawMaterials: [
    { name: 'Agri-Commodities', note: 'Palm oil, wheat, milk, tea, sugar etc. — the biggest input for food/personal-care; prices are volatile and monsoon-linked.', source: 'Mixed' },
    { name: 'Chemicals & Surfactants', note: 'Cleaning agents and actives for soaps, detergents and cosmetics; part crude-oil-linked.', source: 'Mixed' },
    { name: 'Packaging', note: 'Plastic, paper, cartons and pouches — a significant, oil-linked cost and a sustainability focus.', source: 'Domestic' },
    { name: 'Brand & Advertising', note: 'Not a physical input but the real "raw material": the ad and promotion spend that builds brand recall.', source: 'Domestic' },
    { name: 'Distribution Network', note: 'The stockist-distributor-retailer chain that puts products within arm\'s reach of the consumer.', source: 'Domestic' },
  ],
  processIntro: 'The FMCG value chain — where success depends far more on branding and distribution than on the (often simple) manufacturing step.',
  process: [
    { step: '1. Sourcing', keyFact: 'Commodity buying', output: 'Raw materials', detail: 'Agri-commodities, chemicals and packaging are procured — often the biggest cost and a key skill, since input prices swing profitability.' },
    { step: '2. Manufacturing', keyFact: 'Own + contract', output: 'Finished goods', detail: 'Products are made in the company\'s plants or, very commonly, by third-party contract manufacturers. The process is usually simple and not the source of competitive advantage.' },
    { step: '3. Branding & Marketing', keyFact: 'The real moat', output: 'Brand demand', detail: 'Heavy investment in advertising, packaging and brand-building creates the pull that makes consumers pick one soap over another. This is where FMCG companies truly compete.' },
    { step: '4. Distribution', keyFact: 'Stockist network', output: 'Products on shelves', detail: 'A deep network of distributors and stockists moves products from factory to the millions of retail outlets — the harder-to-copy asset that decides reach.' },
    { step: '5. Retail & Channels', keyFact: 'Kirana + modern + e-com', output: 'Point of sale', detail: 'Products reach consumers through tiny kirana stores, modern retail, and fast-growing e-commerce/quick-commerce — each channel needs a different strategy.' },
    { step: '6. Consumer & Repeat', keyFact: 'Loyalty + repeat', output: 'Repeat purchase', detail: 'Because products are cheap and used up quickly, the game is repeat purchase — driven by brand trust, availability and value, generating steady recurring revenue.' },
  ],
  products: [
    { name: 'Food & Beverages', note: 'Packaged food, snacks, tea/coffee, dairy and drinks — the largest, fastest-growing category.' },
    { name: 'Personal Care', note: 'Soaps, shampoo, skincare, oral and cosmetics — high-margin, brand-driven.' },
    { name: 'Home Care', note: 'Detergents, cleaners and household products — high-volume staples.' },
    { name: 'Health & Others', note: 'OTC wellness, hygiene and other daily-use products.' },
  ],
  customers: [
    { name: 'Urban Consumers', note: 'City households buying via kirana, modern retail and e-commerce.', share: 55 },
    { name: 'Rural Consumers', note: 'Vast rural market — a huge growth driver and demand swing factor.', share: 37 },
    { name: 'Institutional / HoReCa', note: 'Hotels, restaurants and bulk institutional buyers.', share: 5 },
    { name: 'Exports', note: 'Overseas markets and the Indian diaspora.', share: 3 },
  ],
  drivers: [
    { factor: 'Raw-Material / Commodity Prices', effect: 'Palm oil, crude, milk and packaging costs swing gross margins; companies react with price hikes or pack-size cuts.', type: 'cost' },
    { factor: 'Rural Demand & Monsoon', effect: 'A large share of demand is rural, so monsoon, farm incomes and rural sentiment strongly move volumes.', type: 'demand' },
    { factor: 'Distribution Reach', effect: 'The width and depth of the distribution network is a core, hard-to-copy competitive edge.', type: 'demand' },
    { factor: 'Premiumisation & Health Trends', effect: 'Consumers trading up and shifting to natural/health products reshapes the mix and margins.', type: 'demand' },
    { factor: 'E-commerce / Quick-commerce', effect: 'New channels change how products are discovered and delivered, favouring agile brands.', type: 'external' },
    { factor: 'Competition & Private Labels', effect: 'Intense rivalry and retailer private labels pressure pricing and market share.', type: 'external' },
  ],
  economics:
    'FMCG is a high-volume, brand-margin business: manufacturing is cheap and often outsourced, so profit comes from the premium a trusted brand commands and the efficiency of distribution. Companies spend heavily on advertising to build brands, then leverage a wide distribution network for steady, resilient, repeat-purchase revenue. Managing commodity-cost swings and defending market share are the constant battles.',
  insurerNote:
    'FMCG operations are asset-light on manufacturing but exposure-rich in warehousing and logistics: large stocks of finished goods and packaging create fire and stock-accumulation risk across many depots. Product-liability and recall risk matters for food and personal care. Property, stock, marine/transit and product-liability cover are central to underwriting, with business interruption tied to key plants and distribution hubs.',
}
