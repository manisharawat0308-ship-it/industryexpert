import type { BusinessModelData } from '../../components/BusinessModel'

export const INFRASTRUCTURE_BUSINESS: BusinessModelData = {
  industryName: 'Infrastructure',
  brandColor: '#F59E0B',
  tagline: 'Building roads, ports and power — where the real question is who funds it and who takes the risk.',
  // Infrastructure is project-based construction, not a production line.
  labels: {
    rawMaterials: 'Key Inputs & Resources',
    rawMaterialsSub: 'What it takes to execute an infrastructure project.',
    process: 'How Projects Get Built (Contract Models)',
    products: 'What They Build',
    productsSub: 'The main types of infrastructure projects.',
    customers: 'Who Awards the Work — Clients',
    customersSub: 'Where infrastructure demand comes from.',
    drivers: 'What Impacts the Business',
    economics: 'How the Money Works',
  },
  intro:
    'Infrastructure companies build the physical backbone of the economy — roads, bridges, metros, ports, airports and power. Unlike a factory, each project is a large, one-off, multi-year undertaking. The most important thing to understand is the contract model: whether the company just builds and hands over (EPC), or also finances and operates the asset for years to earn back its money (BOT/HAM). That choice decides how much capital, risk and long-term return the company takes on.',
  stats: [
    { label: 'Key Models', value: 'EPC · BOT · HAM' },
    { label: 'Funded By', value: 'Govt capex + PPP' },
    { label: 'Watch', value: 'Order book & debt' },
    { label: 'Nature', value: 'Project-based, capital-heavy' },
  ],
  rawMaterials: [
    { name: 'Cement & Steel', note: 'The core construction materials; price swings directly hit project margins, especially on fixed-price contracts.', source: 'Domestic' },
    { name: 'Aggregates & Bitumen', note: 'Sand, stone and asphalt for roads and concrete works; bitumen is crude-oil-linked.', source: 'Domestic' },
    { name: 'Equipment & Machinery', note: 'Excavators, cranes, batching plants — owned or hired; utilisation drives cost efficiency.', source: 'Mixed' },
    { name: 'Labour & Subcontractors', note: 'Large, often migrant workforce plus specialist subcontractors executing the work.', source: 'Domestic' },
    { name: 'Finance / Capital', note: 'The real fuel for BOT/HAM projects — debt and equity to fund construction before toll/annuity income begins.', source: 'Mixed' },
  ],
  processIntro: 'How infrastructure gets built — and the three contract models that decide who funds and owns the risk. The model matters more than the machinery.',
  process: [
    { step: 'EPC Model', keyFact: 'Build & hand over', output: 'Fixed fee, low capital', detail: 'Engineering, Procurement & Construction: the company just designs and builds the asset for a fixed fee, then hands it to the government/owner. Low capital and risk, but no long-term income — a pure contracting business.' },
    { step: 'HAM Model', keyFact: 'Shared funding', output: 'Annuity + construction', detail: 'Hybrid Annuity Model: the government funds ~40% during construction and pays the rest as fixed annuities over years. The developer takes moderate capital risk but no traffic risk — a popular middle path for roads.' },
    { step: 'BOT Model', keyFact: 'Build-Operate-Transfer', output: 'Toll / user revenue', detail: 'The company finances, builds and operates the asset (e.g. a toll road) for a concession period, earning user charges, then transfers it back. Highest capital and demand (traffic) risk — but the biggest long-term reward.' },
    { step: 'Bidding & Award', keyFact: 'Win the project', output: 'Signed contract', detail: 'Projects are won through competitive tenders. A strong, well-priced order book is the lifeblood — it is the future revenue pipeline investors watch most closely.' },
    { step: 'Construction & Execution', keyFact: 'On time, on budget', output: 'Built asset', detail: 'The multi-year build phase, managing materials, labour, equipment and subcontractors. Delays and cost overruns (land, clearances, disputes) are the biggest destroyers of project value.' },
    { step: 'Operation / Handover', keyFact: 'Toll or transfer', output: 'Revenue or completion', detail: 'For EPC, the asset is handed over and the job ends. For BOT/HAM, the operating phase begins — collecting tolls or annuities to repay the debt and earn a return over the concession.' },
  ],
  products: [
    { name: 'Roads & Highways', note: 'The largest segment — expressways, national highways and bridges, driven by government road programmes.' },
    { name: 'Urban Infra & Metros', note: 'Metro rail, water, sewage and smart-city works in fast-growing cities.' },
    { name: 'Ports, Airports & Railways', note: 'Transport hubs and rail projects, increasingly via public-private partnership.' },
    { name: 'Power & Industrial', note: 'Power transmission, renewables and heavy industrial/EPC construction.' },
  ],
  customers: [
    { name: 'Central Government / Agencies', note: 'NHAI and central ministries awarding highway and national projects — the biggest client.', share: 45 },
    { name: 'State Governments', note: 'State roads, urban, water and irrigation projects.', share: 25 },
    { name: 'PSUs & Public Enterprises', note: 'Railways, ports, power utilities and defence infrastructure.', share: 18 },
    { name: 'Private / Industrial Clients', note: 'Private developers, industrial and real-estate infrastructure.', share: 12 },
  ],
  drivers: [
    { factor: 'Government Capex & Budget', effect: 'Most demand comes from public spending, so the government\'s infrastructure budget and award pace drive the order pipeline.', type: 'demand' },
    { factor: 'Order Book Quality', effect: 'A large, well-priced, executable order book is the key value indicator; padded or loss-making orders destroy value.', type: 'demand' },
    { factor: 'Material & Input Costs', effect: 'Cement, steel and bitumen price swings squeeze margins, especially on fixed-price contracts.', type: 'cost' },
    { factor: 'Interest Rates & Debt', effect: 'BOT/HAM projects are debt-funded, so interest rates and the company\'s leverage are critical to returns and survival.', type: 'cost' },
    { factor: 'Land, Clearances & Delays', effect: 'Land acquisition, environmental clearances and disputes routinely delay projects and cause cost overruns.', type: 'policy' },
    { factor: 'Working Capital & Payments', effect: 'Long project cycles and delayed government payments strain cash flow — a chronic industry challenge.', type: 'external' },
  ],
  economics:
    'Infrastructure economics hinge on the contract model. EPC is capital-light: earn a margin on execution, but no lasting income. BOT/HAM are capital-heavy: the company invests upfront and recovers it slowly through tolls or annuities, so returns depend on financing cost, execution and (for BOT) traffic. Across all models, order-book strength, timely execution and disciplined balance-sheet/working-capital management separate winners from the many players felled by debt and delays.',
  insurerNote:
    'Infrastructure projects are large, multi-year and exposed throughout construction, so core covers are Contractors\' All Risk (CAR)/Erection All Risk, contract works, plant & machinery, and third-party liability at sites. Delay-in-start-up and business-interruption cover matter for revenue-earning (BOT) assets, and surety/performance bonds are increasingly relevant. Site safety record, project complexity and geography are decisive rating factors.',
}
