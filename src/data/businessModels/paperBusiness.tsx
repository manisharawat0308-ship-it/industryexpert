import type { BusinessModelData } from '../../components/BusinessModel'

export const PAPER_BUSINESS: BusinessModelData = {
  industryName: 'Paper',
  brandColor: '#0D9488',
  industryKey: 'paper',
  tagline: 'Turning wood, farm residue and waste paper into packaging, print and tissue.',
  intro:
    'The paper industry converts cellulose fibre — from wood, agricultural residue or recycled paper — into pulp, then presses and dries it into paper and board. It is a capital- and resource-intensive business tied to raw-material access (fibre and water) and energy. Demand has shifted decisively: writing/printing paper is flat-to-declining, while packaging board (driven by e-commerce and the ban on single-use plastics) and tissue are the growth engines.',
  stats: [
    { label: 'Main Fibre', value: 'Wood · Agri · Recycle' },
    { label: 'Growth Segment', value: 'Packaging board' },
    { label: 'Key Cost', value: 'Fibre + energy' },
    { label: 'Nature', value: 'Capital & water heavy' },
  ],
  rawMaterials: [
    { name: 'Wood / Pulpwood', note: 'Eucalyptus, subabul and casuarina — often grown via captive/farm-forestry tie-ups with farmers for a secure fibre supply.', source: 'Domestic' },
    { name: 'Agri-Residue', note: 'Bagasse (from sugar mills), wheat straw and other farm waste — a low-cost, renewable fibre used by many Indian mills.', source: 'Domestic' },
    { name: 'Recycled / Waste Paper', note: 'Recovered fibre — the largest raw material for packaging grades. India imports a big share of waste paper.', source: 'Imported' },
    { name: 'Chemicals', note: 'Caustic soda, chlorine dioxide, sizing and coating chemicals for pulping and bleaching.', source: 'Mixed' },
    { name: 'Water & Energy', note: 'Large volumes of water and steam/power; captive power and effluent treatment are core to the operation.', source: 'Domestic' },
  ],
  processIntro: 'From fibre to finished reel — pulp the fibre, form and press the sheet, then dry and finish it.',
  process: [
    { step: '1. Pulping', keyFact: 'Chemical / mechanical', output: 'Pulp', detail: 'Wood, agri-residue or waste paper is broken down into individual cellulose fibres — chemically (cooking with chemicals in a digester) or mechanically — to make pulp.' },
    { step: '2. Bleaching & Cleaning', keyFact: 'Brightness', output: 'Clean pulp', detail: 'The pulp is washed, screened and bleached to the required brightness, removing lignin and impurities. Modern mills use elemental-chlorine-free bleaching to cut effluent.' },
    { step: '3. Stock Preparation', keyFact: 'Refining + additives', output: 'Furnish', detail: 'Pulp is refined and blended with fillers, sizing and dyes to give the target strength, smoothness and printability — the "furnish" fed to the machine.' },
    { step: '4. Sheet Forming', keyFact: 'Paper machine wire', output: 'Wet web', detail: 'The dilute furnish is sprayed onto a moving wire mesh, where water drains away and the fibres mat together into a continuous wet sheet (the web).' },
    { step: '5. Pressing & Drying', keyFact: 'Press + dryer section', output: 'Dry paper', detail: 'The wet web is pressed to squeeze out water, then passed over steam-heated drying cylinders until it is a dry, continuous sheet of paper.' },
    { step: '6. Finishing & Converting', keyFact: 'Calender · coat · cut', output: 'Reels / sheets', detail: 'The paper is calendered (smoothed), optionally coated, then wound into reels or cut into sheets. Converting turns it into boxes, cartons, notebooks or tissue.' },
  ],
  products: [
    { name: 'Packaging Paper & Board', note: 'Kraft, duplex and carton board for boxes and cartons — the largest, fastest-growing segment (e-commerce, FMCG).' },
    { name: 'Writing & Printing Paper', note: 'Copier, notebook and publishing paper — mature, slow-growing demand.' },
    { name: 'Tissue & Hygiene', note: 'Toilet, facial and towel tissue — premium, fast-growing on rising hygiene use.' },
    { name: 'Specialty Paper', note: 'Décor, cheque, cigarette and coated specialty grades — niche, higher-margin.' },
  ],
  customers: [
    { name: 'Packaging & FMCG', note: 'Box and carton makers serving e-commerce, food and consumer goods.', share: 45 },
    { name: 'Publishing & Education', note: 'Newspapers, books, notebooks and stationery.', share: 22 },
    { name: 'Printing & Commercial', note: 'Offices, advertising and commercial print.', share: 15 },
    { name: 'Hygiene & Away-from-Home', note: 'Tissue buyers — hotels, offices, retail.', share: 10 },
    { name: 'Specialty & Others', note: 'Industrial and niche specialty users.', share: 8 },
  ],
  drivers: [
    { factor: 'Fibre / Waste-Paper Cost', effect: 'Wood, agri-residue and imported waste paper are the biggest input cost; captive plantations give a structural edge.', type: 'cost' },
    { factor: 'Energy & Chemical Prices', effect: 'Paper making is energy-intensive; coal/power and chemical prices swing conversion cost.', type: 'cost' },
    { factor: 'E-commerce & Plastic Ban', effect: 'Growth of online retail and bans on single-use plastic lift demand for packaging board and paper products.', type: 'demand' },
    { factor: 'Digital Substitution', effect: 'Screens replacing print steadily erodes writing/printing paper demand.', type: 'demand' },
    { factor: 'Imports & Trade Policy', effect: 'Cheap imports (esp. from ASEAN) pressure domestic prices; duties and FTAs matter.', type: 'external' },
    { factor: 'Environmental Norms', effect: 'Water use, effluent and emission rules raise compliance cost and gate expansion.', type: 'policy' },
  ],
  economics:
    'Paper is a capital-intensive commodity business where profit ≈ paper price − (fibre + energy + chemicals + conversion). Margins swing with global pulp/paper prices and utilisation. Winners secure low-cost fibre (captive plantations or agri-residue), run large integrated mills with captive power, and tilt their product mix toward growth grades — packaging board and tissue — rather than declining print grades.',
  insurerNote:
    'Paper mills carry high fire load (dry fibre, paper, chemicals), large machinery (digesters, paper machines, boilers) and captive power, so exposures include fire, machinery breakdown and business interruption from a single machine outage. Chemical handling and effluent add liability risk. Property, MB and BI cover, plus marine cover on imported waste paper, are central to underwriting.',
}
