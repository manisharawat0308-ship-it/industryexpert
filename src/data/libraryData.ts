// Library data: per-industry curated resources + a live-news search query.
// Used by the Library page (curated list always available; live feed via RSS).

export interface LibraryResource {
  title: string
  source: string
  type: 'Newsletter' | 'Report' | 'Regulator' | 'Association' | 'Data'
  url: string
  description: string
}

export interface IndustryLibrary {
  id: string
  name: string
  brandColor: string
  // Query used for the live Google News feed for this sector (India-focused)
  newsQuery: string
  resources: LibraryResource[]
}

export const LIBRARY: IndustryLibrary[] = [
  {
    id: 'steel', name: 'Steel', brandColor: '#1e3a5f',
    newsQuery: 'Indian steel industry',
    resources: [
      { title: 'Ministry of Steel', source: 'Government of India', type: 'Regulator', url: 'https://steel.gov.in', description: 'Policy, production data, and national steel policy updates.' },
      { title: 'Joint Plant Committee (JPC)', source: 'Ministry of Steel', type: 'Data', url: 'https://jpcindiansteel.nic.in', description: 'Official steel production, consumption, and trade statistics.' },
      { title: 'Indian Steel Association', source: 'ISA', type: 'Association', url: 'https://www.indiansteelassociation.com', description: 'Industry body — news, advocacy, and member updates.' },
      { title: 'worldsteel Newsletter', source: 'World Steel Association', type: 'Newsletter', url: 'https://worldsteel.org', description: 'Global steel statistics, short-range outlook, and technology.' },
    ],
  },
  {
    id: 'cement', name: 'Cement', brandColor: '#f37021',
    newsQuery: 'Indian cement industry',
    resources: [
      { title: 'Cement Manufacturers Association', source: 'CMA India', type: 'Association', url: 'https://www.cmaindia.org', description: 'Apex cement industry body — data and policy.' },
      { title: 'Department for Promotion of Industry (DPIIT)', source: 'Government of India', type: 'Regulator', url: 'https://dpiit.gov.in', description: 'Industrial policy and cement production indices.' },
      { title: 'Global Cement News', source: 'Global Cement', type: 'Newsletter', url: 'https://www.globalcement.com', description: 'Global cement market news and analysis.' },
    ],
  },
  {
    id: 'paper', name: 'Paper', brandColor: '#78350f',
    newsQuery: 'Indian paper industry pulp packaging',
    resources: [
      { title: 'Indian Paper Manufacturers Association', source: 'IPMA', type: 'Association', url: 'https://ipma.co.in', description: 'Paper industry body — data, sustainability, and policy.' },
      { title: 'Central Pulp & Paper Research Institute', source: 'CPPRI', type: 'Data', url: 'https://cppri.res.in', description: 'R&D, technology, and sector research.' },
    ],
  },
  {
    id: 'automobile-oem', name: 'Automobile OEMs', brandColor: '#1e40af',
    newsQuery: 'Indian automobile industry sales',
    resources: [
      { title: 'SIAM', source: 'Society of Indian Automobile Manufacturers', type: 'Association', url: 'https://www.siam.in', description: 'Monthly sales data, policy, and industry statistics.' },
      { title: 'FADA', source: 'Federation of Automobile Dealers', type: 'Data', url: 'https://www.fada.in', description: 'Retail (registration) sales data and dealer sentiment.' },
      { title: 'Ministry of Heavy Industries', source: 'Government of India', type: 'Regulator', url: 'https://heavyindustries.gov.in', description: 'EV (FAME/PLI) schemes and auto policy.' },
    ],
  },
  {
    id: 'auto-ancillary', name: 'Auto Components', brandColor: '#0369a1',
    newsQuery: 'Indian auto components industry',
    resources: [
      { title: 'ACMA', source: 'Automotive Component Manufacturers Association', type: 'Association', url: 'https://www.acma.in', description: 'Component industry data, exports, and technology trends.' },
      { title: 'ARAI', source: 'Automotive Research Association of India', type: 'Data', url: 'https://www.araiindia.com', description: 'Testing, certification, and R&D.' },
    ],
  },
  {
    id: 'tyre', name: 'Tyre', brandColor: '#1f2937',
    newsQuery: 'Indian tyre industry',
    resources: [
      { title: 'ATMA', source: 'Automotive Tyre Manufacturers Association', type: 'Association', url: 'https://atma.co.in', description: 'Tyre production, raw material, and trade data.' },
      { title: 'Rubber Board', source: 'Government of India', type: 'Regulator', url: 'https://rubberboard.gov.in', description: 'Natural rubber production and pricing.' },
    ],
  },
  {
    id: 'textile', name: 'Textile', brandColor: '#7c3aed',
    newsQuery: 'Indian textile industry',
    resources: [
      { title: 'Ministry of Textiles', source: 'Government of India', type: 'Regulator', url: 'https://texmin.nic.in', description: 'PLI, PM MITRA parks, and textile policy.' },
      { title: 'CITI', source: 'Confederation of Indian Textile Industry', type: 'Association', url: 'https://citiindia.org', description: 'Textile value-chain data and advocacy.' },
      { title: 'Texprocil', source: 'Cotton Textiles Export Promotion Council', type: 'Data', url: 'https://texprocil.org', description: 'Cotton textile export data and market intelligence.' },
    ],
  },
  {
    id: 'sugar', name: 'Sugar', brandColor: '#059669',
    newsQuery: 'Indian sugar industry ethanol',
    resources: [
      { title: 'ISMA', source: 'Indian Sugar Mills Association', type: 'Association', url: 'https://www.indiansugar.com', description: 'Sugar production, ethanol, and balance-sheet data.' },
      { title: 'Dept of Food & Public Distribution', source: 'Government of India', type: 'Regulator', url: 'https://dfpd.gov.in', description: 'MSP, ethanol blending, and sugar policy.' },
    ],
  },
  {
    id: 'electronics', name: 'Electronics', brandColor: '#dc2626',
    newsQuery: 'India electronics manufacturing semiconductor',
    resources: [
      { title: 'MeitY', source: 'Ministry of Electronics & IT', type: 'Regulator', url: 'https://www.meity.gov.in', description: 'ESDM, semiconductor mission, and PLI schemes.' },
      { title: 'ICEA', source: 'India Cellular & Electronics Association', type: 'Association', url: 'https://icea.co.in', description: 'Mobile & electronics manufacturing data and exports.' },
    ],
  },
  {
    id: 'fmcg', name: 'FMCG', brandColor: '#d97706',
    newsQuery: 'India FMCG industry',
    resources: [
      { title: 'Nielsen India Insights', source: 'NielsenIQ', type: 'Report', url: 'https://nielseniq.com/global/en/', description: 'FMCG consumption, rural-urban trends, and market share.' },
      { title: 'FICCI', source: 'FICCI', type: 'Association', url: 'https://ficci.in', description: 'FMCG sector reports and policy engagement.' },
    ],
  },
  {
    id: 'pharma', name: 'Pharma & Healthcare', brandColor: '#0891b2',
    newsQuery: 'Indian pharmaceutical industry',
    resources: [
      { title: 'IPA', source: 'Indian Pharmaceutical Alliance', type: 'Association', url: 'https://www.ipa-india.org', description: 'Research-based pharma industry body.' },
      { title: 'CDSCO', source: 'Central Drugs Standard Control Org', type: 'Regulator', url: 'https://cdsco.gov.in', description: 'Drug approvals, regulation, and compliance.' },
      { title: 'Pharmexcil', source: 'Pharma Export Promotion Council', type: 'Data', url: 'https://pharmexcil.com', description: 'Pharma export statistics and market access.' },
    ],
  },
  {
    id: 'bfsi', name: 'Financial Services', brandColor: '#4338ca',
    newsQuery: 'India banking financial services BFSI',
    resources: [
      { title: 'Reserve Bank of India', source: 'RBI', type: 'Regulator', url: 'https://www.rbi.org.in', description: 'Monetary policy, banking regulation, and financial data.' },
      { title: 'SEBI', source: 'Securities & Exchange Board of India', type: 'Regulator', url: 'https://www.sebi.gov.in', description: 'Capital markets regulation and circulars.' },
      { title: 'IRDAI', source: 'Insurance Regulatory Authority', type: 'Regulator', url: 'https://irdai.gov.in', description: 'Insurance regulation, data, and circulars.' },
    ],
  },
  {
    id: 'aviation', name: 'Aviation & Aerospace', brandColor: '#0c4a6e',
    newsQuery: 'India aviation airlines airports',
    resources: [
      { title: 'DGCA', source: 'Directorate General of Civil Aviation', type: 'Regulator', url: 'https://www.dgca.gov.in', description: 'Air safety regulation and traffic data.' },
      { title: 'AAI', source: 'Airports Authority of India', type: 'Data', url: 'https://www.aai.aero', description: 'Airport traffic statistics and infrastructure.' },
    ],
  },
  {
    id: 'startups', name: 'Startups & Tech', brandColor: '#be185d',
    newsQuery: 'India startups funding tech',
    resources: [
      { title: 'Startup India', source: 'DPIIT / Government of India', type: 'Regulator', url: 'https://www.startupindia.gov.in', description: 'Recognition, schemes, and startup policy.' },
      { title: 'Inc42', source: 'Inc42', type: 'Newsletter', url: 'https://inc42.com', description: 'Indian startup funding, deals, and ecosystem news.' },
      { title: 'YourStory', source: 'YourStory', type: 'Newsletter', url: 'https://yourstory.com', description: 'Startup stories, funding, and tech coverage.' },
    ],
  },
  {
    id: 'hospitality', name: 'Hospitality & Tourism', brandColor: '#a16207',
    newsQuery: 'India hospitality hotels tourism',
    resources: [
      { title: 'Ministry of Tourism', source: 'Government of India', type: 'Regulator', url: 'https://tourism.gov.in', description: 'Tourism statistics and policy.' },
      { title: 'FHRAI', source: 'Federation of Hotel & Restaurant Assns', type: 'Association', url: 'https://www.fhrai.com', description: 'Hospitality industry body — data and advocacy.' },
      { title: 'HVS India', source: 'HVS', type: 'Report', url: 'https://www.hvs.com', description: 'Hotel market performance and investment reports.' },
    ],
  },
  {
    id: 'chemical', name: 'Chemical', brandColor: '#7c2d12',
    newsQuery: 'Indian chemical industry petrochemicals',
    resources: [
      { title: 'Dept of Chemicals & Petrochemicals', source: 'Government of India', type: 'Regulator', url: 'https://chemicals.gov.in', description: 'Chemical sector policy and PCPIR framework.' },
      { title: 'ICC', source: 'Indian Chemical Council', type: 'Association', url: 'https://www.iccinc.in', description: 'Chemical industry body — safety, data, and policy.' },
    ],
  },
  {
    id: 'infrastructure', name: 'Infrastructure', brandColor: '#334155',
    newsQuery: 'India infrastructure roads highways transmission',
    resources: [
      { title: 'NHAI', source: 'National Highways Authority', type: 'Regulator', url: 'https://nhai.gov.in', description: 'Highway projects, awards, and TOT monetisation.' },
      { title: 'MoRTH', source: 'Ministry of Road Transport & Highways', type: 'Regulator', url: 'https://morth.nic.in', description: 'Roads policy, construction pace, and data.' },
      { title: 'PM Gati Shakti', source: 'Government of India', type: 'Data', url: 'https://www.pmgatishakti.gov.in', description: 'National master plan for multi-modal infrastructure.' },
    ],
  },
  {
    id: 'fertilizer', name: 'Fertilizer', brandColor: '#15803d',
    newsQuery: 'India fertilizer industry urea DAP',
    resources: [
      { title: 'Department of Fertilizers', source: 'Government of India', type: 'Regulator', url: 'https://www.fert.nic.in', description: 'Subsidy, urea/NBS policy, and production data.' },
      { title: 'FAI', source: 'The Fertiliser Association of India', type: 'Association', url: 'https://www.faidelhi.org', description: 'Fertilizer statistics, seminars, and publications.' },
    ],
  },
]
