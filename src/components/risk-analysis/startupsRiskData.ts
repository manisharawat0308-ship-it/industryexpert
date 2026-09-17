// Startups & New-Age Business Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const STARTUPS_RISK_SOURCES: RiskSource[] = [
  {
    id: 'technology-platform',
    label: 'Tech Platforms',
    icon: '💻',
    color: '#7c3aed',
    bannerImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
    bannerTitle: 'Technology & Platform Startups',
    bannerSubtitle: 'SaaS, marketplaces, fintech, and edtech — cyber, scaling failures, and regulatory disruption risks.',
    aogPerils: [
      {
        id: 'tp-aog-1',
        title: 'Natural Disaster — Data Center & Cloud Disruption',
        severity: 'high',
        description: 'Tech startups hosted on shared cloud infrastructure (AWS Mumbai, Azure Pune) face regional outage from natural disasters. The 2023 Mumbai floods caused 4-hour AWS AZ outage affecting 100+ startups. Startups without multi-region architecture lose ALL service availability from single-AZ failure. Customer SLA breaches trigger penalty clauses and churn.',
        impactAreas: ['Complete Service Outage', 'Customer SLA Breach Penalties', 'Data Loss (if single-AZ)', 'Revenue Loss (usage-based models)', 'Customer Churn Acceleration'],
        typicalClaim: '₹1–50 Cr (BI + SLA penalties + churn)'
      }
    ],
    nonAogPerils: [
      {
        id: 'tp-naog-1',
        title: 'Cybersecurity Breach — Customer Data Exposure',
        severity: 'critical',
        description: 'Startups handling customer PII (fintech: financial data, healthtech: medical records, edtech: minor data) face massive liability from breaches. The 2022 Mobikwik alleged data leak (100M users), 2023 BoAt data breach (7.5M records) demonstrate Indian startup vulnerability. DPDP Act (2023) introduces ₹250 Cr penalty per breach. Startups often lack dedicated security teams — median time-to-detect breach: 200+ days.',
        impactAreas: ['Customer Data Exposure (millions)', 'DPDP Act Penalty (₹250 Cr)', 'Customer Trust Destruction', 'Investor Confidence Loss', 'Potential Shutdown'],
        typicalClaim: '₹10–500 Cr (penalty + litigation + remediation + brand damage)'
      },
      {
        id: 'tp-naog-2',
        title: 'Platform Outage — Revenue & Reputation Loss',
        severity: 'high',
        description: 'Platform downtime for marketplaces (food delivery, ride-hailing, e-commerce) directly destroys revenue (₹1-10 Cr/hour for large platforms). The 2022 Zomato 6-hour outage cost ₹15+ Cr in lost orders. Technical debt from rapid scaling creates fragile architectures. Database corruption, deployment failures, and third-party API outages cascade unpredictably.',
        impactAreas: ['Hourly Revenue Loss (₹1-10 Cr)', 'Driver/Seller Earnings Impact', 'Customer Migration to Competitor', 'App Store Rating Drop', 'Investor Concern on Unit Economics'],
        typicalClaim: '₹5–50 Cr per major outage event'
      },
      {
        id: 'tp-naog-3',
        title: 'Regulatory Action — License/Compliance Shutdown',
        severity: 'critical',
        description: 'Indian startups face evolving regulation: RBI digital lending guidelines (2022), DPDP Act (2023), SEBI on crypto/algo trading, FSSAI on cloud kitchens, IRDAI on insurtech. Non-compliance can result in: license cancellation (fintech), app store removal (government order), or bank account freeze (ED action). Paytm Payments Bank RBI action (2024) demonstrated existential regulatory risk.',
        impactAreas: ['License Suspension/Cancellation', 'App Store Removal', 'Payment Gateway Freeze', 'Investor Funding Withdrawal', 'Complete Business Halt'],
        typicalClaim: '₹100–5,000 Cr (valuation destruction from regulatory action)'
      },
      {
        id: 'tp-naog-4',
        title: 'Key Person / Founder Risk',
        severity: 'high',
        description: 'Startups are disproportionately dependent on founders/key engineers. Departure, health issue, or controversy involving founders can: trigger investor clawback, cause mass employee departure, and destroy customer confidence. The 2022 BharatPe co-founder controversy caused ₹5,000 Cr valuation uncertainty. CTO departure at a deep-tech startup can halt product development for 6-12 months.',
        impactAreas: ['Investor Confidence Collapse', 'Key Employee Follow-Departure', 'Product Development Halt', 'Customer/Partner Withdrawal', 'Valuation Markdown'],
        typicalClaim: '₹50–5,000 Cr (valuation erosion — not traditional insurance)'
      }
    ],
    riskMatrix: [
      { risk: 'Data Breach (DPDP Act)', prob: 2, impact: 3, score: 6, emv: '₹125 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.meity.gov.in/data-protection', strategyTooltip: 'DPDP compliance + penetration testing + SOC2 + data minimization + cyber insurance', owner: 'CTO/CISO', trigger: 'ANY unauthorized access indicator or vulnerability discovery' },
      { risk: 'Regulatory Action', prob: 2, impact: 3, score: 6, emv: '₹500 Cr', strategy: 'Avoid', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Proactive compliance + regulatory sandbox + legal counsel + self-certification program', owner: 'Head Compliance', trigger: 'Regulatory inquiry received or compliance gap identified' },
      { risk: 'Platform Outage', prob: 3, impact: 2, score: 6, emv: '₹28 Cr', strategy: 'Mitigate', strategyUrl: 'https://aws.amazon.com/well-architected', strategyTooltip: 'Multi-AZ architecture + chaos engineering + incident response + SRE team', owner: 'VP Engineering', trigger: 'Error rate >1% or latency >2x normal' },
      { risk: 'Founder/Key Person Event', prob: 2, impact: 2, score: 4, emv: '₹500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nasscom.in', strategyTooltip: 'Key person insurance + succession plan + equity vesting + knowledge documentation', owner: 'Board/CEO', trigger: 'Founder health concern or resignation signal' },
    ],
    caseStudy: {
      title: 'Paytm Payments Bank — RBI Regulatory Action',
      location: 'Paytm (One97 Communications), Noida, UP',
      date: 'January 2024',
      loss: '₹30,000+ Cr market cap erosion + operational impact',
      rootCause: 'RBI directed Paytm Payments Bank to stop onboarding new customers (Jan 2024) and subsequently halt most banking operations (Feb 2024) citing: persistent non-compliance with KYC norms, deficiencies in IT systems, and data privacy concerns. RBI had flagged issues repeatedly since 2022. Root cause: rapid scaling prioritized over compliance infrastructure — technology systems could not verify customer identity to RBI satisfaction at scale.',
      impact: 'Stock price fell 60% (₹30,000 Cr market cap lost). Paytm Payments Bank operations effectively ceased. 330 million wallet users forced to migrate. Merchant payment business restructured. Employee morale crisis. Investor confidence in Indian fintech sector broadly impacted. Demonstrated that RBI will act decisively regardless of scale/brand.',
      lessons: [
        'Regulatory compliance is existential for fintech — it CANNOT be traded off against growth',
        'RBI flags must be addressed with urgency — repeated non-compliance invites escalation',
        'KYC/AML systems must be built BEFORE scaling, not retrofitted under regulatory pressure',
        'Board-level compliance oversight mandatory — cannot be CEO/founder prerogative alone',
        'Diversification: payment bank license dependency created single-point-of-failure',
        'Regulatory relationship management: proactive engagement prevents surprise actions'
      ],
      benchmark: 'PhonePe/Google Pay operate under bank partnerships (not own license) avoiding direct regulatory risk on their platform. Regulatory risk resides with partner bank. Model demonstrates: when regulation is uncertain, partnership > own license.'
    },
    emergingRisks: [
      {
        id: 'tp-er-1',
        title: 'AI Liability — Output Responsibility & Hallucination',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2028',
        description: 'AI startups (genAI, autonomous agents) face unprecedented liability questions: who is responsible when AI gives wrong medical advice, generates defamatory content, or makes incorrect financial recommendations? AI hallucination in customer-facing products creates liability. EU AI Act creating compliance framework India will likely follow. Product liability for AI outputs is undefined.',
        implications: ['Liability for AI-generated incorrect advice (medical, financial, legal)', 'Defamation/IP infringement from AI-generated content', 'EU AI Act compliance for global SaaS products', 'Bias in AI systems creating discrimination liability', 'Insurance product gap for AI-specific liability']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'tp-ni-1',
        title: 'Funding Winter & Valuation Markdown',
        category: 'Market / Financial',
        description: 'Startup valuations are based on growth expectations. Funding environment shifts (2022-23 "funding winter") caused 50-80% valuation markdowns. Companies burning ₹50-200 Cr/month with 12-18 month runway face existential risk if next funding round is delayed. No insurance product covers valuation erosion or funding gap.',
        mitigation: 'Path to profitability focus, 18+ months runway maintenance, secondary sale options, revenue diversification, cost discipline during bull markets, bridge financing arrangements',
        exposure: '₹500-50,000 Cr valuation destruction per startup ecosystem correction'
      },
      {
        id: 'tp-ni-2',
        title: 'Platform Dependency (Google/Apple/AWS)',
        category: 'Strategic / Technology',
        description: 'Startups depend on: Google Play/Apple App Store (distribution), AWS/Azure/GCP (infrastructure), Google/Meta (advertising), and payment gateways (revenue collection). Any of these can: remove the app, change APIs, raise prices, or become competitor. Apple\'s 30% commission reduces profitability. AWS price increase flows directly to COGS. No recourse if platform decides to compete.',
        mitigation: 'Multi-cloud architecture, web-first strategy (reduce app store dependency), diversified customer acquisition, own distribution/brand, multiple payment gateway integration, open-source alternatives where possible',
        exposure: '₹100-5,000 Cr revenue impact from adverse platform action'
      }
    ],
    bestPractices: [
      {
        id: 'tp-bp-1',
        title: 'Startup Cyber & Data Protection',
        standard: 'DPDP Act 2023 + ISO 27001 + SOC2 Type II + OWASP Top 10',
        description: 'Building security-by-design for startups where data is the primary asset and breach can be existential.',
        recommendations: [
          'DPDP Act compliance: data purpose limitation, consent management, breach notification (72 hours)',
          'SOC2 Type II certification by Series B (customer requirement for enterprise sales)',
          'Penetration testing: quarterly for customer-facing applications, annually for infrastructure',
          'Data minimization: collect only what is needed, delete what is no longer required',
          'Multi-factor authentication: mandatory for all internal systems and customer accounts',
          'Incident response plan: tested quarterly with clear escalation to Board/investors',
          'Cyber insurance: minimum ₹50 Cr coverage including regulatory defense costs',
          'Third-party security assessment for all vendors accessing customer data'
        ],
        benchmark: 'Razorpay (Indian fintech): PCI-DSS Level 1 + SOC2 + ISO 27001 + bug bounty program — zero customer data breaches in 8 years handling ₹5 Lakh Cr annual payment volume. Proof that security-first is achievable at scale.'
      }
    ]
  },
  {
    id: 'logistics-delivery',
    label: 'Logistics & Delivery',
    icon: '🚚',
    color: '#059669',
    bannerImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=80',
    bannerTitle: 'Logistics, Delivery & Dark Stores',
    bannerSubtitle: 'Quick commerce, warehousing, fleet management — gig worker safety, warehouse fire, and cold chain risks at unprecedented scale and speed.',
    aogPerils: [
      {
        id: 'ld-aog-1',
        title: 'Flood — Dark Store & Warehouse Network Disruption',
        severity: 'high',
        description: 'Quick commerce companies (Blinkit, Zepto, Instamart) operate 1,000+ dark stores in flood-prone urban areas (basements, ground floors). Flooding destroys ₹20-50 Lakh inventory per store × hundreds of stores = ₹50-200 Cr aggregate exposure. Unlike traditional retail (gradual buildup), quick commerce concentrates perishable inventory requiring cold chain that fails during power outages from flooding.',
        impactAreas: ['Multi-Store Inventory Destruction', 'Cold Chain Failure (perishables)', 'Delivery Fleet Damage', 'Service Disruption (days)', 'Customer Acquisition Cost Wasted'],
        typicalClaim: '₹20–100 Cr (aggregate dark store network loss)'
      }
    ],
    nonAogPerils: [
      {
        id: 'ld-naog-1',
        title: 'Dark Store / Micro-Warehouse Fire',
        severity: 'high',
        description: 'Dark stores (500-3,000 sq ft) store mixed products: food, chemicals (cleaning), aerosols, lithium batteries (electronics). Located in residential/commercial buildings without industrial fire protection. Mixed product storage creates complex fire behavior (aerosol BLEVE + food grease + battery thermal runaway simultaneously). No sprinkler systems in 95%+ of dark stores. Fire spreads to residential areas above/adjacent.',
        impactAreas: ['Mixed Hazard Fire', 'Residential Building Exposure', 'Worker Safety (delivery personnel)', 'Brand Reputation Damage', 'Regulatory Action on Cluster'],
        typicalClaim: '₹5–30 Cr per incident + liability'
      },
      {
        id: 'ld-naog-2',
        title: 'Gig Worker Accident — Delivery Fleet Liability',
        severity: 'high',
        description: 'Quick commerce delivery (10-15 minute promise) creates extreme pressure on gig workers riding two-wheelers in traffic. Accident rates for delivery riders are 5-10x normal commuter. Legal status (employee vs contractor) determines liability. The 2023 Supreme Court observations on gig worker rights may shift accident liability to platforms. 50,000+ delivery riders per large platform = significant aggregate accident exposure.',
        impactAreas: ['Rider Fatality/Injury', 'Third-Party Injury Liability', 'Employer Liability (if reclassified)', 'Customer Lawsuit (delayed delivery cause)', 'Regulatory Action on Working Conditions'],
        typicalClaim: '₹50–500 Cr/year aggregate (across 50,000+ riders)'
      },
      {
        id: 'ld-naog-3',
        title: 'Large Warehouse / Fulfillment Center Fire',
        severity: 'critical',
        description: 'E-commerce fulfillment centers (50,000-500,000 sq ft) store ₹200-2,000 Cr of mixed products at peak (festive season). Lithium batteries in electronics, aerosols, flammable liquids (perfumes), and dense cardboard packaging create extreme fire load. The 2022 Amazon Hyderabad warehouse fire destroyed ₹50 Cr of inventory. Automated warehouses (robotics) make firefighting access impossible.',
        impactAreas: ['Total Inventory Destruction', 'Building Structural Collapse', 'Seller Product Loss (marketplace model)', 'Customer Order Default (peak season)', 'Adjacent Business Disruption'],
        typicalClaim: '₹50–1,000 Cr (stock + building + BI + seller liability)'
      }
    ],
    riskMatrix: [
      { risk: 'Fulfillment Center Fire', prob: 2, impact: 3, score: 6, emv: '₹500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'ESFR sprinklers + product segregation (Li-ion separate) + compartments + VESDA', owner: 'VP Operations', trigger: 'ANY fire/smoke detection in fulfillment center' },
      { risk: 'Gig Worker Aggregate Liability', prob: 3, impact: 2, score: 6, emv: '₹250 Cr', strategy: 'Transfer', strategyUrl: 'https://www.irdai.gov.in', strategyTooltip: 'Group PA insurance + rider safety program + speed governance + legal structure review', owner: 'Head Operations', trigger: 'Fatality rate >0.5/1000 riders/year or SC ruling on gig status' },
      { risk: 'Dark Store Fire (Network)', prob: 3, impact: 1, score: 3, emv: '₹15 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Fire extinguishers + smoke detection + product segregation + fire safety training', owner: 'Dark Store Operations', trigger: 'Any fire incident or fire department notice' },
      { risk: 'Flood (Dark Store Network)', prob: 2, impact: 2, score: 4, emv: '₹60 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Stock cover per location + elevated storage + flood-prone location avoidance', owner: 'Real Estate Head', trigger: 'Monsoon forecast + dark store flood history' },
    ],
    caseStudy: {
      title: 'Amazon India Hyderabad — Fulfillment Center Fire',
      location: 'Amazon India, Fulfillment Center, Shamshabad, Hyderabad',
      date: 'September 2022',
      loss: '₹50 Cr (inventory + facility + seller compensation)',
      rootCause: 'Electrical short circuit in the packaging/dispatch area during night operations. Fire spread rapidly through cardboard packaging material and polybag storage. The facility\'s sprinkler system activated but was designed for ordinary hazard — insufficient for the rapid fire growth rate in dense cardboard storage. Mixed inventory included electronics with lithium batteries which contributed to fire intensity once involved.',
      impact: 'Inventory destroyed: ₹35 Cr (Amazon-owned + marketplace seller goods). Facility damage: ₹10 Cr. Seller compensation: ₹5 Cr. 2,000+ seller orders affected during peak season. Facility offline for 6 weeks. Amazon subsequently upgraded fire protection at all Indian fulfillment centers to FM Global specifications.',
      lessons: [
        'Fulfillment center sprinkler design must account for peak inventory density (not average)',
        'Lithium battery products segregated in fire-rated compartment (NOT mixed with general storage)',
        'Cardboard packaging area: maximum height limits + ESFR sprinklers + daily housekeeping',
        'Night operations: minimum staffing for fire response + thermal camera patrol',
        'Seller goods insurance: clear policy on who bears inventory loss risk (platform vs seller)'
      ],
      benchmark: 'Amazon USA fulfillment centers: FM Global Highly Protected Risk (HPR) compliant, ESFR sprinklers throughout, Li-ion battery segregation, and 24/7 fire watch — zero total fulfillment center losses across 1,000+ facilities globally.'
    },
    emergingRisks: [
      {
        id: 'ld-er-1',
        title: 'Drone Delivery & Autonomous Last-Mile — New Liability',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2030',
        description: 'Drone delivery (Dunzo partnership with ANRA, Flipkart drone trials) and autonomous ground delivery introduce: property damage from drone crash, privacy concerns from aerial cameras, airspace violation liability, battery fire from crash, and liability ambiguity for autonomous vehicle accidents. Current Indian drone regulations (DGCA) evolving rapidly — compliance requirements changing frequently.',
        implications: ['Drone crash property/person damage liability', 'Battery fire from drone crash in populated area', 'Privacy violations from drone cameras', 'Regulatory compliance uncertainty', 'Insurance product gap for autonomous delivery']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'ld-ni-1',
        title: 'Gig Worker Reclassification — Employment Liability',
        category: 'Legal / Regulatory',
        description: 'Global trend toward reclassifying gig workers as employees (California AB5, UK Uber ruling, EU Platform Workers Directive). Indian Social Security Code 2020 covers gig workers but implementation pending. If delivery riders reclassified as employees: PF/ESI contribution (12%+ of earnings), minimum wage compliance, working hour limits (goodbye 10-minute delivery), and accident liability shift from worker to platform. Potential financial impact: ₹2,000-5,000 Cr/year per large platform.',
        mitigation: 'Proactive social security contribution (build goodwill before mandate), hybrid worker model with benefits, automation reducing rider dependency, regulatory engagement on balanced framework, insurance products for gig workers (voluntary)',
        exposure: '₹2,000-10,000 Cr/year per large logistics platform from employee reclassification'
      }
    ],
    bestPractices: [
      {
        id: 'ld-bp-1',
        title: 'E-Commerce Fulfillment Center Fire Safety',
        standard: 'FM Global DS 8-9/8-28 + NFPA 13 + Amazon Global Standard',
        description: 'Fire protection for modern e-commerce fulfillment with mixed products, high-bay storage, and automation.',
        recommendations: [
          'ESFR sprinklers minimum K-16.8 for general, K-25.2 for aerosol/battery compartments',
          'Li-ion battery products: dedicated fire-rated compartment with water mist suppression',
          'Maximum storage height per sprinkler design — NO over-stacking during peak season',
          'Cardboard/packaging staging area: limited to 4-hour supply, separated from storage',
          'VESDA detection for earliest possible alarm (faster than point detectors)',
          'Automated warehouse: ensure sprinkler pattern not obstructed by robotic racking',
          'Peak season fire audit: verify protection adequate for maximum (not average) inventory',
          'Night operations: minimum fire response team on-site + thermal camera monitoring'
        ],
        benchmark: 'Amazon global standard (post-multiple incidents): FM Global HPR certification for all large fulfillment centers, Li-ion segregation, and dedicated fire engineering team — targeting zero total losses across 1,000+ facilities.'
      }
    ]
  },
  {
    id: 'fintech-payments',
    label: 'Fintech & Payments',
    icon: '💳',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
    bannerTitle: 'Fintech, Payments & Lending',
    bannerSubtitle: 'Digital payments, BNPL, neo-banking, and digital lending — regulatory, credit, and technology concentration risks unique to financial startups.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'fp-naog-1',
        title: 'RBI Regulatory Action — Business Model Disruption',
        severity: 'critical',
        description: 'RBI digital lending guidelines (2022), FLDG cap (5%), and payment aggregator regulations fundamentally restructure fintech business models. Non-compliance: license cancellation, bank partnership termination, or directed closure. Paytm Payments Bank (2024), Sachet NBFC shutdowns demonstrate RBI willingness to act decisively. Every fintech regulation change creates winners and losers.',
        impactAreas: ['License Cancellation', 'Bank Partnership Termination', 'Business Model Invalidation', 'Funding Withdrawal', 'Complete Shutdown'],
        typicalClaim: '₹500–30,000 Cr (valuation destruction — Paytm precedent)'
      },
      {
        id: 'fp-naog-2',
        title: 'Credit Default Spike — BNPL/Digital Lending',
        severity: 'high',
        description: 'BNPL and digital lending startups acquired customers rapidly with minimal credit assessment. When growth slows and collections tighten, default rates spike from projected 2-3% to 8-15%. The 2023 BNPL correction saw multiple players (ZestMoney shutdown, Slice pivot) face unsustainable defaults. Young urban consumers with 5+ digital loans simultaneously creating "digital debt trap".',
        impactAreas: ['NPA Spike Beyond Provisioning', 'FLDG Guarantee Trigger', 'Bank Partner Withdrawal', 'Collection Cost Escalation', 'Investor Write-Down'],
        typicalClaim: '₹100–1,000 Cr (credit losses exceeding provisioning)'
      },
      {
        id: 'fp-naog-3',
        title: 'Payment System Failure — UPI/Wallet Outage',
        severity: 'high',
        description: 'Payment platforms processing ₹1-10 Lakh Cr/month face: NPCI system outages, bank settlement failures, reconciliation errors (money "stuck"), and DDoS attacks. A 1-hour outage during peak (12-2 PM lunch orders, month-end salary day) affects millions of transactions. Customer funds in transit create liability. Merchant trust erodes with each failure.',
        impactAreas: ['Transaction Failure (millions)', 'Merchant Revenue Loss', 'Customer Fund Stuck', 'RBI Penalty for SLA Breach', 'Competitive Disadvantage'],
        typicalClaim: '₹5–50 Cr per outage event (direct + indirect)'
      }
    ],
    riskMatrix: [
      { risk: 'Regulatory Action (License)', prob: 2, impact: 3, score: 6, emv: '₹5,000 Cr', strategy: 'Avoid', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Proactive compliance + regulatory sandbox + board-level oversight + legal counsel', owner: 'CEO/Head Compliance', trigger: 'RBI communication or compliance gap identification' },
      { risk: 'Credit Default Spike', prob: 2, impact: 2, score: 4, emv: '₹500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Conservative underwriting + dynamic credit limits + early warning + adequate provisioning', owner: 'Chief Credit Officer', trigger: 'Default rate trending >2x baseline for 2 consecutive months' },
      { risk: 'Payment System Outage', prob: 3, impact: 2, score: 6, emv: '₹28 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.npci.org.in', strategyTooltip: 'Multi-bank routing + redundant infrastructure + real-time monitoring + fallback mechanisms', owner: 'VP Engineering', trigger: 'Success rate <98% or latency >3 seconds' },
    ],
    caseStudy: {
      title: 'ZestMoney — BNPL Shutdown from Credit Quality Deterioration',
      location: 'ZestMoney (DMI Finance), Bangalore',
      date: 'December 2023',
      loss: '₹1,000+ Cr (valuation destruction + credit losses)',
      rootCause: 'ZestMoney grew BNPL portfolio rapidly (₹4,000 Cr disbursals at peak) targeting young, new-to-credit customers with minimal credit assessment. When RBI tightened digital lending guidelines and FLDG caps reduced fintech risk-sharing, bank partners pulled back. Default rates reached 8-12% (vs projected 3-4%). Collection infrastructure inadequate for the portfolio scale. Company could not raise fresh capital as unit economics turned negative.',
      impact: 'Company shut down operations (Dec 2023). 500+ employees lost jobs. Investors (Goldman Sachs, Quona Capital) wrote off investment. Customer credit records impacted. Bank partners absorbed remaining portfolio losses. Industry confidence in pure-play BNPL model collapsed.',
      lessons: [
        'Credit assessment cannot be replaced by "alternative data" alone for unsecured lending',
        'FLDG caps mean fintech must have own balance sheet capacity — partnership alone insufficient',
        'Collection infrastructure must be built BEFORE portfolio scales (not retrofitted)',
        'Customer concentration in single demographic (young, gig economy) creates correlated default risk',
        'Regulatory change can invalidate business model overnight — compliance optionality essential',
        'Unit economics must be proven before scaling — growth without profitability path is risk accumulation'
      ],
      benchmark: 'Slice (now merged with North East SFB): pivoted from pure fintech to banking license model, providing regulatory certainty and balance sheet capacity — demonstrating that sustainable digital lending requires regulated entity structure.'
    },
    emergingRisks: [
      {
        id: 'fp-er-1',
        title: 'UPI Market Share Regulation — Platform Concentration',
        category: 'regulatory',
        severity: 'high',
        timeline: '2024-2026',
        description: 'NPCI proposed 30% market share cap for UPI apps (targeting PhonePe 47%, Google Pay 36% dominance). Implementation would force: customer migration, transaction rerouting, and business model disruption for dominant players. Simultaneously, UPI interoperability mandates (credit line on UPI) create new competitive dynamics and credit risk distribution.',
        implications: ['Forced market share reduction for dominant players', 'Customer migration creating temporary disruption', 'Business model uncertainty for UPI-dependent revenue', 'Credit line on UPI creating new default risks', 'Regulatory-driven competition distorting market dynamics']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'fp-ni-1',
        title: 'Platform Dependency — Bank Partner Withdrawal',
        category: 'Strategic / Partnership',
        description: 'Most fintechs operate through bank partnerships (lending license, payment settlement, account issuance). Bank can terminate partnership with 90-day notice for: regulatory pressure, risk concerns, or strategic change. Paytm Payments Bank action caused partner banks to review ALL fintech relationships. A single bank partner withdrawal can halt fintech operations overnight.',
        mitigation: 'Multi-bank partnership strategy (minimum 3 active partners), own NBFC/small finance bank license, technology stack portable between partners, regulatory relationship independent of partner bank, contractual notice period + transition support',
        exposure: '₹100-5,000 Cr revenue/valuation impact from primary bank partner exit'
      }
    ],
    bestPractices: [
      {
        id: 'fp-bp-1',
        title: 'Fintech Regulatory Compliance Program',
        standard: 'RBI Digital Lending Guidelines 2022 + DPDP Act + SEBI/IRDAI sector-specific',
        description: 'Building sustainable regulatory compliance for financial startups where non-compliance is existential.',
        recommendations: [
          'Board-level compliance committee with independent compliance officer (not reporting to business)',
          'Regulatory change monitoring: weekly scan of RBI/SEBI/IRDAI circulars with impact assessment',
          'KYC/AML infrastructure built BEFORE scaling — verified through mock regulatory inspections',
          'FLDG and co-lending arrangements with proper documentation and RBI-compliant structure',
          'Customer grievance resolution: 30-day resolution as per RBI ombudsman requirements',
          'Data localization: ALL financial data stored in India per RBI mandate',
          'Annual compliance audit by external firm with board presentation of findings',
          'Regulatory sandbox participation for innovative products (before market launch)'
        ],
        benchmark: 'Razorpay/CRED: proactive RBI engagement + full compliance infrastructure + annual third-party audit — zero regulatory actions while scaling to ₹5+ Lakh Cr volumes. Proof that compliance and growth coexist.'
      }
    ]
  }
]
