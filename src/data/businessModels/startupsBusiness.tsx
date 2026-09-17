import type { BusinessModelData } from '../../components/BusinessModel'

// Startups don't "manufacture" — the useful primer is HOW THE ECOSYSTEM WORKS:
// the funding stages, and the key terms founders/investors use for funding and
// valuation. The "process" section is repurposed as the funding-stage ladder,
// and "products" as the core jargon glossary.

export const STARTUPS_BUSINESS: BusinessModelData = {
  industryName: 'Startups',
  brandColor: '#DB2777',
  tagline: 'How the startup ecosystem really works — the funding ladder and the language of valuations.',
  // Startups are built and funded, not manufactured — so relabel the sections.
  labels: {
    rawMaterials: 'What It Takes to Build One',
    rawMaterialsSub: 'The key ingredients a startup needs to get off the ground.',
    process: 'How a Startup Is Built & Funded',
    products: 'Key Terms to Know',
    productsSub: 'The vocabulary of startup funding and valuation.',
    customers: 'Who Funds It — The Investors',
    customersSub: 'Where startup capital comes from at each stage.',
    drivers: 'What Impacts a Startup',
    economics: 'How the Money Works',
  },
  intro:
    'A startup is a young company built to grow fast by solving a problem in a new, scalable way — usually burning investor money for years before it makes a profit, in exchange for rapid growth. Unlike a traditional business, its "fuel" is external funding raised in stages, and its scoreboard is valuation rather than current profit. To understand the startup world you mainly need to understand two things: the funding ladder it climbs, and the vocabulary of valuation and equity that founders and investors speak.',
  stats: [
    { label: 'India Rank', value: '3rd-largest' },
    { label: 'Unicorns', value: '100+ ($1B+)' },
    { label: 'Fuel', value: 'Staged funding' },
    { label: 'Scoreboard', value: 'Valuation, not profit' },
  ],
  rawMaterials: [
    { name: 'Founding Team', note: 'The founders and early employees. Investors bet on the team as much as the idea — execution is everything.', source: 'Domestic' },
    { name: 'Capital (Investor Money)', note: 'Raised in rounds from angels, VCs and PE funds. This is the "fuel" that funds growth before profits arrive.', source: 'Mixed' },
    { name: 'Technology & Product', note: 'The app, platform or IP that delivers the solution and can scale to millions of users cheaply.', source: 'Domestic' },
    { name: 'Users / Customers', note: 'Early adopters whose growth and retention prove the model and justify the next round.', source: 'Domestic' },
    { name: 'Talent & Advisors', note: 'Engineers, growth teams and mentors — often paid partly in equity (ESOPs) to conserve cash.', source: 'Domestic' },
  ],
  processIntro: 'The funding ladder — the stages a startup climbs, from an idea to a public company. Each round raises money by selling a slice of equity at a higher valuation.',
  process: [
    { step: '1. Bootstrap / Pre-Seed', keyFact: 'Founders\' own money', output: 'Prototype', detail: 'The founders fund it themselves, or raise a tiny amount from friends and family, to build a first prototype and test the idea. No formal valuation yet — just proof that the concept can work.' },
    { step: '2. Seed', keyFact: 'Angels & seed funds', output: 'Product-market fit', detail: 'The first real external round, from angel investors or seed VCs, to build the product and find "product-market fit" (evidence that customers genuinely want it). Valuations here are early and negotiated on potential.' },
    { step: '3. Series A', keyFact: 'First big VC round', output: 'Proven model, scaling', detail: 'A venture-capital round to scale a business model that is already showing traction. The startup must show real revenue growth and a repeatable way to acquire customers.' },
    { step: '4. Series B / C…', keyFact: 'Growth rounds', output: 'Market expansion', detail: 'Successive, larger rounds (B, C, D…) to expand into new markets, add products and grab market share. Valuations step up each round if growth stays strong.' },
    { step: '5. Unicorn / Late Stage', keyFact: '$1B+ valuation', output: 'Market leader', detail: 'A private company valued at over $1 billion is a "unicorn". Late-stage rounds from big PE/growth funds prepare it for an exit while it chases profitability, not just growth.' },
    { step: '6. Exit (IPO / Acquisition)', keyFact: 'The payoff', output: 'Liquidity for investors', detail: 'Investors and founders finally cash out — either by listing on the stock market (IPO) or being acquired by a larger company. This "exit" is how VC returns are actually realised.' },
  ],
  products: [
    { name: 'Valuation', note: 'What the whole company is judged to be worth. Pre-money = value before the new investment; Post-money = pre-money + the new money raised.' },
    { name: 'Equity, Dilution & Cap Table', note: 'Ownership is split into shares (equity). Each new round issues new shares, so existing owners\' % shrinks ("dilution"). The cap table lists who owns what.' },
    { name: 'ESOP', note: 'Employee Stock Option Pool — equity set aside to reward employees, letting cash-strapped startups attract talent with future upside.' },
    { name: 'Burn Rate & Runway', note: 'Burn = cash spent per month; Runway = how many months of cash are left before the startup must raise again or die. The core survival metric.' },
    { name: 'ARR / MRR & Traction', note: 'Annual / Monthly Recurring Revenue and user-growth metrics that prove momentum and justify the next round\'s higher valuation.' },
    { name: 'Term Sheet & Liquidation Preference', note: 'The term sheet is the deal\'s summary. "Liquidation preference" decides who gets paid first at an exit — a key investor-protection term.' },
  ],
  customers: [
    { name: 'Angel Investors', note: 'Wealthy individuals who back very early startups with their own money and mentorship.', share: 12 },
    { name: 'Venture Capital (VC)', note: 'Funds that invest others\' money into high-growth startups for equity, from Seed to late stage.', share: 40 },
    { name: 'Private Equity / Growth Funds', note: 'Large funds that come in at later, bigger rounds as risk falls.', share: 22 },
    { name: 'Strategic / Corporate VC', note: 'Big companies investing to access innovation or acquire later.', share: 14 },
    { name: 'Public Markets (IPO)', note: 'Retail and institutional investors who buy in when the startup lists.', share: 12 },
  ],
  drivers: [
    { factor: 'Funding Climate', effect: 'When capital is cheap and plentiful, valuations soar and rounds close fast; in a "funding winter" both collapse and startups cut burn to survive.', type: 'external' },
    { factor: 'Path to Profitability', effect: 'Markets have shifted from "growth at all costs" to demanding a credible route to profit — burn discipline now drives survival and valuation.', type: 'demand' },
    { factor: 'Unit Economics', effect: 'Whether each customer is profitable (LTV vs CAC) decides if growth actually builds value or just burns cash.', type: 'cost' },
    { factor: 'Exit Environment', effect: 'Healthy IPO and M&A markets let investors cash out, which recycles money back into new startups.', type: 'external' },
    { factor: 'Regulation & Compliance', effect: 'Rules on data, fintech, foreign investment and gig work can make or break entire startup categories.', type: 'policy' },
    { factor: 'Talent & Competition', effect: 'Access to engineering/growth talent and the intensity of rivals shape how fast and how cheaply a startup can scale.', type: 'demand' },
  ],
  economics:
    'A startup deliberately trades early profits for fast growth: it raises equity in rounds, spends (burns) that cash to grow users/revenue, and aims to raise the next round at a higher valuation — until it either reaches profitability or exits via IPO/acquisition. The founders\' equity is diluted each round, but a smaller slice of a much larger company can still be worth far more. Most startups fail; the model relies on a few big winners paying for many losses.',
  insurerNote:
    'Startups are asset-light but liability- and continuity-sensitive. Relevant covers include Directors & Officers (D&O) liability (vital before fundraising and IPO), cyber and data-breach cover for tech/fintech models, professional indemnity, and group health to attract talent. Key-person and business-interruption exposure is high because value is concentrated in a small team and a single platform.',
}
