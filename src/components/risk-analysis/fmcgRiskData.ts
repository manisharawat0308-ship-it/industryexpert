// FMCG Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const FMCG_RISK_SOURCES: RiskSource[] = [
  {
    id: 'food-beverage',
    label: 'Food & Beverage',
    icon: '🍔',
    color: '#d97706',
    bannerImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    bannerTitle: 'Food & Beverage Manufacturing',
    bannerSubtitle: 'Processing, cooking, packaging, and cold chain — contamination, fire from cooking oils, dust explosion, and refrigerant hazards.',
    aogPerils: [
      {
        id: 'fb-aog-1',
        title: 'Flood — Factory & Cold Storage Inundation',
        severity: 'critical',
        description: 'Food plants store perishable raw materials and finished goods requiring strict hygiene. Any flood contact renders ALL food products unsaleable (FSSAI regulation). Cold storage facilities (₹50-200 Cr inventory) lose entire stock if power fails from flooding (defrost → spoilage in 24-48 hours). The 2023 Himachal floods destroyed 50+ food processing units in Baddi-Barotiwala industrial belt.',
        impactAreas: ['Complete Product Inventory Loss', 'Cold Chain Collapse', 'Raw Material Contamination', 'Hygiene Certification Loss', 'FSSAI License Suspension'],
        typicalClaim: '₹20–200 Cr + 2-4 months BI'
      },
      {
        id: 'fb-aog-2',
        title: 'Cyclone / Storm — Warehouse & Distribution Damage',
        severity: 'high',
        description: 'FMCG distribution warehouses (₹50-500 Cr inventory) with lightweight roofing suffer wind damage exposing packaged goods to rain. Once primary packaging is breached, food products are condemned. Coastal manufacturing hubs (Gujarat, Maharashtra, Tamil Nadu) face annual cyclone risk during peak festive production season.',
        impactAreas: ['Warehouse Roof Damage', 'Product Rain Exposure', 'Packaging Integrity Loss', 'Distribution Network Disruption', 'Seasonal Revenue Loss'],
        typicalClaim: '₹10–100 Cr (stock + BI)'
      }
    ],
    nonAogPerils: [
      {
        id: 'fb-naog-1',
        title: 'Cooking Oil / Fat Processing Fire',
        severity: 'critical',
        description: 'Food plants using hot cooking oils (fryers at 180-200°C), palm oil refining (240-260°C), or ghee/vanaspati processing create severe fire risk. Oil mist from spray systems, splashing from fryers, and fat accumulation in exhaust hoods ignite readily. A cooking oil fire cannot be extinguished with water (creates violent splashing). The 2021 Haldiram fire (Noida) from oil fryer caused ₹50 Cr damage.',
        impactAreas: ['Deep Fryer Flash Fire', 'Oil Tank Boilover', 'Exhaust Hood/Duct Fire', 'Oil Storage Fire', 'Building Structural Damage'],
        typicalClaim: '₹20–150 Cr + 2-6 months BI'
      },
      {
        id: 'fb-naog-2',
        title: 'Grain/Spice/Sugar Dust Explosion',
        severity: 'high',
        description: 'Food processing creates fine combustible dusts: wheat flour (Kst=112), maize starch (Kst=200), sugar (Kst=138), milk powder (Kst=125), and spice powders. Enclosed equipment (mills, mixers, silos, conveyors, bag filters) accumulates explosive concentrations. The 2017 Didsbury flour mill explosion (UK) demonstrates the severity. Indian food plants have minimal dust explosion awareness.',
        impactAreas: ['Silo Explosion', 'Mill/Grinder Explosion', 'Bag Filter Explosion', 'Secondary Explosion Propagation', 'Worker Fatalities'],
        typicalClaim: '₹15–100 Cr + potential fatalities'
      },
      {
        id: 'fb-naog-3',
        title: 'Ammonia Refrigeration Leak — Cold Storage',
        severity: 'high',
        description: 'Large food cold stores and dairy plants use ammonia (NH3) refrigeration (500-5,000 kg charge). Ammonia is toxic (IDLH 300 ppm), corrosive, and flammable at 15-28% concentration. Compressor seal failure, pipe corrosion, or valve malfunction releases NH3 causing worker evacuation, product contamination, and community impact. Multiple ammonia leak fatalities in Indian cold stores annually.',
        impactAreas: ['Worker NH3 Poisoning', 'Product Contamination (entire cold store)', 'Community Evacuation', 'Regulatory Shutdown', 'Environmental Liability'],
        typicalClaim: '₹10–60 Cr + fatality/liability'
      },
      {
        id: 'fb-naog-4',
        title: 'Product Contamination — Physical/Chemical/Biological',
        severity: 'high',
        description: 'Foreign body contamination (glass, metal, plastic, pests), chemical contamination (cleaning agents, pesticide residues, allergen cross-contact), or microbiological contamination (salmonella, listeria, E.coli) in food products triggers mass recalls. A single contamination event can recall millions of units. The 2015 Maggi noodles ban (lead content) cost Nestlé India ₹450 Cr and 5 months of lost production.',
        impactAreas: ['Mass Product Recall', 'Brand Reputation Destruction', 'Regulatory Ban/Suspension', 'Consumer Litigation', 'Retailer Delisting'],
        typicalClaim: '₹50–500 Cr (recall + BI + brand damage)'
      }
    ],
    riskMatrix: [
      { risk: 'Cooking Oil Fire', prob: 2, impact: 3, score: 6, emv: '₹85 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-96', strategyTooltip: 'Hood suppression + oil temp interlock + duct cleaning + K-class extinguishers', owner: 'Production Head', trigger: 'Oil temperature >200°C or hood duct cleaning overdue' },
      { risk: 'Dust Explosion (Flour/Spice)', prob: 2, impact: 2, score: 4, emv: '₹58 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-652', strategyTooltip: 'DHA + explosion vents + housekeeping + grounding + LEV maintenance', owner: 'Safety Manager', trigger: 'Dust accumulation >1mm anywhere or equipment cleaning overdue' },
      { risk: 'Ammonia Leak', prob: 2, impact: 2, score: 4, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.iiar.org', strategyTooltip: 'NH3 detection + auto-ventilation + PSM program + annual leak survey', owner: 'Refrigeration Head', trigger: 'NH3 detected >25 ppm in any occupied area' },
      { risk: 'Product Contamination/Recall', prob: 2, impact: 3, score: 6, emv: '₹275 Cr', strategy: 'Transfer', strategyUrl: 'https://www.agcs.allianz.com', strategyTooltip: 'Product recall insurance + HACCP + metal detection + allergen management', owner: 'Quality Director', trigger: 'Any consumer complaint of foreign body or illness' },
      { risk: 'Flood (Factory + Stock)', prob: 2, impact: 3, score: 6, emv: '₹110 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP + elevated cold rooms + flood sensors + stock-in-trade cover', owner: 'Plant Director', trigger: 'Heavy rainfall >100mm/24hr or river level warning' },
    ],
    caseStudy: {
      title: 'Nestlé India (Maggi) — Product Contamination & Nationwide Ban',
      location: 'Nestlé India, Multiple Plants (Nanjangud, Moga, Bicholim, Tahliwal, Pantnagar)',
      date: 'June 2015',
      loss: '₹450+ Cr (destruction + BI + brand recovery)',
      rootCause: 'FSSAI testing detected lead content (17.2 ppm vs 2.5 ppm limit) and excess MSG in Maggi noodle samples. While Nestlé contested the testing methodology, multiple state food authorities independently confirmed exceedances. FSSAI ordered nationwide ban and recall of ALL Maggi variants. 37,000 tonnes of Maggi destroyed (₹320 Cr stock value). Root cause attributed to: lead in spice mix from supply chain contamination and inadequate incoming raw material testing for heavy metals.',
      impact: '5 months of zero production (June-November 2015). 37,000 tonnes destroyed. Revenue loss: ₹450+ Cr. Brand recovery investment: ₹200+ Cr. Market share dropped from 80% to 0% (recovered to 60% over 2 years). Multiple state-level criminal cases. ₹600+ Cr total financial impact. Nestlé subsequently invested ₹300 Cr in testing infrastructure across all Indian factories.',
      lessons: [
        'Heavy metal testing of ALL incoming spice/ingredient lots — not just periodic sampling',
        'FSSAI compliance lab integrated within factory (not reliance on third-party alone)',
        'Traceability system: ingredient lot → production batch → finished goods → customer',
        'Product recall insurance essential for FMCG companies (Nestlé was largely self-insured)',
        'Rapid recall execution: 48-hour response prevents escalation from regional to national crisis',
        'Proactive regulatory engagement when initial test results are adverse'
      ],
      benchmark: 'Unilever India maintains 3-tier quality verification (supplier + incoming + in-process) with heavy metal testing on 100% of spice/flavoring lots and 24-hour traceability from ingredient to retail shelf — zero recall events in 10 years.'
    },
    emergingRisks: [
      {
        id: 'fb-er-1',
        title: 'FSSAI Regulatory Tightening — Compliance Cost Escalation',
        category: 'regulatory',
        severity: 'high',
        timeline: '2024-2028',
        description: 'FSSAI progressively tightening standards: front-of-pack labeling (FOPL), fortification mandates, maximum limits for trans-fat/sugar/salt, and NABL-accredited testing requirements. Each regulatory change requires reformulation (₹5-50 Cr R&D), packaging redesign, and process modification. Non-compliance = product withdrawal from market.',
        implications: ['Reformulation cost for new FOPL/health standards', 'Testing infrastructure investment (NABL accreditation)', 'Product withdrawal for non-compliant existing SKUs', 'Supply chain disruption from ingredient specification changes', 'Increased product liability from stricter consumer protection']
      },
      {
        id: 'fb-er-2',
        title: 'Climate Impact on Agricultural Raw Material',
        category: 'climate',
        severity: 'high',
        timeline: '2024-2035',
        description: 'Climate change affecting key FMCG inputs: palm oil (drought in Indonesia/Malaysia), cocoa (West Africa heat stress), wheat/rice (Indian monsoon variability), dairy (heat stress reducing milk yield). Price spikes of 50-200% in single seasons (palm oil 2022: ₹80→₹180/kg). Supply disruption forces reformulation or production halt.',
        implications: ['Raw material price volatility (±50-200%)', 'Quality variation from climate-stressed crops', 'Supply disruption from regional crop failure', 'Reformulation necessity when key ingredient unavailable', 'Consumer price sensitivity limiting cost pass-through']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'fb-ni-1',
        title: 'Social Media Viral Contamination Allegation',
        category: 'Brand / Reputation',
        description: 'A single viral social media video (cockroach in biscuit, plastic in bread, chemical in soft drink) — whether genuine or fabricated — can destroy brand value worth ₹1,000+ Cr within days. The speed of viral spread (millions of views in hours) outpaces any investigation or response. Even proven-false allegations leave permanent brand damage. Indian courts provide limited relief for defamation against anonymous social media accounts.',
        mitigation: 'Real-time social media monitoring (24/7 war room), rapid response team with pre-approved messaging, video authentication technology to detect fabrication, strong consumer complaint resolution reducing motive for viral posts, crisis communication agency on retainer',
        exposure: '₹500-5,000 Cr brand value erosion per viral contamination allegation'
      },
      {
        id: 'fb-ni-2',
        title: 'Input Cost Inflation with Price Ceiling',
        category: 'Market / Regulatory',
        description: 'FMCG faces unique cost-price squeeze: input costs (palm oil, wheat, packaging, energy) rise 15-30% but consumer price increase beyond 5-8% causes volume decline. Essential commodities pricing is politically sensitive — government can impose informal price guidance or threaten anti-profiteering action. Margin compression of 300-500 bps in inflationary periods is structural.',
        mitigation: 'Grammage reduction (shrinkflation), premiumization strategy, operational efficiency improvement, long-term commodity hedging, direct farmer procurement reducing intermediary costs',
        exposure: '₹200-1,000 Cr/year margin erosion per large FMCG company during inflationary cycle'
      }
    ],
    bestPractices: [
      {
        id: 'fb-bp-1',
        title: 'Food Plant Fire Prevention — Cooking Oil & Dust',
        standard: 'NFPA 96 (Cooking Ventilation) + NFPA 652 (Dust) + FM Global DS 7-11',
        description: 'Addressing the two primary fire/explosion causes in food manufacturing: hot cooking oil systems and combustible food dusts.',
        recommendations: [
          'Deep fryer temperature interlock: auto fuel-cutoff at oil temperature >200°C (no override)',
          'Hood and duct cleaning: professional cleaning quarterly with documentation (NFPA 96)',
          'K-class fire extinguishers at ALL cooking oil stations (not ABC powder — causes oil splash)',
          'Wet chemical hood suppression system (auto + manual activation)',
          'Dust Hazard Analysis (DHA) per NFPA 652 for all powder handling operations',
          'Explosion vents on mills, mixers, bag filters, bucket elevators, and silos',
          'Housekeeping: zero dust >1mm on surfaces — vacuum only (no compressed air)',
          'Oil storage: isolated fire-rated room with foam suppression'
        ],
        benchmark: 'Nestlé global standard: zero cooking fire target through automatic suppression + temperature interlocks + weekly duct inspection. Achieved at 95% of plants worldwide. FM Global DS 7-11 compliant plants have 80% fewer fire losses.'
      }
    ]
  },
  {
    id: 'personal-care',
    label: 'Personal & Home Care',
    icon: '🧴',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80',
    bannerTitle: 'Personal Care & Home Care',
    bannerSubtitle: 'Soaps, detergents, cosmetics, and aerosols — flammable solvents, reactive chemicals, aerosol propellant explosion, and dust hazards.',
    aogPerils: [
      {
        id: 'pc-aog-1',
        title: 'Flood — Chemical Store & Finished Goods Damage',
        severity: 'high',
        description: 'Personal care plants store flammable solvents (ethanol for perfumes, isopropanol), reactive chemicals (sodium hypochlorite for bleach), and finished goods with water-sensitive packaging. Flooding mixes incompatible chemicals (bleach + acid = chlorine gas), destroys cosmetics inventory (₹50-200 Cr), and contaminates bulk chemical tanks.',
        impactAreas: ['Chemical Incompatibility Reaction', 'Finished Goods Destruction', 'Solvent Tank Overflow (fire risk)', 'Cosmetics Quality Contamination', 'Environmental Chemical Spill'],
        typicalClaim: '₹20–120 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'pc-naog-1',
        title: 'Aerosol Storage/Production Explosion',
        severity: 'critical',
        description: 'Aerosol products (deodorants, air fresheners, insecticides) contain LPG/DME propellant under pressure. During filling, storage, and transport, valve leaks or can failures release flammable propellant creating explosive atmospheres. Aerosol warehouse fires escalate rapidly as heated cans explode projectile-style (BLEVE effect) sending burning debris 50+ meters. The 2020 Beirut aerosol warehouse fire spread from initial 2 cans to total warehouse involvement in 8 minutes.',
        impactAreas: ['Aerosol Can BLEVE (projectile)', 'Warehouse Total Loss', 'Adjacent Building Damage', 'Propellant Vapor Cloud Explosion', 'Multi-Fatality Potential'],
        typicalClaim: '₹50–300 Cr + fatality liability'
      },
      {
        id: 'pc-naog-2',
        title: 'Detergent/Soap Plant Dust Explosion',
        severity: 'high',
        description: 'Spray-dried detergent powder, soap noodle grinding, and starch-based laundry aids create fine combustible dust. Spray dryer exhaust systems, bag filters, and packaging equipment accumulate explosive dust concentrations. Spray dryer fires are particularly common — hot spots in the chamber ignite product buildup creating intense fires that melt stainless steel internals.',
        impactAreas: ['Spray Dryer Fire/Explosion', 'Bag Filter Explosion', 'Packaging Area Dust Flash', 'Cyclone Explosion', 'Multi-Area Propagation'],
        typicalClaim: '₹15–80 Cr + 2-4 months BI'
      },
      {
        id: 'pc-naog-3',
        title: 'Perfume/Cosmetics Solvent Fire',
        severity: 'high',
        description: 'Perfume compounding and alcohol-based cosmetics production uses bulk ethanol and isopropanol (flash point 12-13°C). Mixing, filling, and storage operations maintain permanent explosive atmospheres. A single ignition source (static, electrical, hot surface) creates flash fire in compounding rooms. Alcohol-based hand sanitizer production (post-COVID scaling) added significant fire risk at many plants not originally designed for flammable liquid handling.',
        impactAreas: ['Compounding Room Flash Fire', 'Alcohol Storage Fire', 'Filling Line Fire', 'Packaging Material Ignition', 'Adjacent Production Damage'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Aerosol Warehouse Explosion', prob: 2, impact: 3, score: 6, emv: '₹175 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-30b', strategyTooltip: 'NFPA 30B compliant storage + sprinkler + explosion relief + max stack height', owner: 'Warehouse Director', trigger: 'Any fire detection in aerosol storage or temperature >40°C' },
      { risk: 'Spray Dryer Fire', prob: 3, impact: 2, score: 6, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Hot spot detection (IR) + CIP cleaning + explosion vent on exhaust + spark detection', owner: 'Production Head', trigger: 'Exhaust temperature anomaly or product buildup detected' },
      { risk: 'Perfume/Solvent Fire', prob: 2, impact: 2, score: 4, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-30', strategyTooltip: 'ATEX equipment + gas detection + limited in-building quantity + foam suppression', owner: 'Compounding Head', trigger: 'Vapor detection >20% LEL or any non-Ex equipment in zone' },
      { risk: 'Detergent Dust Explosion', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.atexexplosionprotection.com', strategyTooltip: 'DHA per NFPA 652 + explosion vents + proper housekeeping + grounding', owner: 'Safety Manager', trigger: 'Dust accumulation >1mm or bag filter differential pressure high' },
    ],
    caseStudy: {
      title: 'Godrej Consumer — Aerosol Warehouse Fire',
      location: 'Godrej Consumer Products, Malanpur, Madhya Pradesh',
      date: 'April 2022',
      loss: '₹85 Cr (stock + building)',
      rootCause: 'Electrical short circuit in warehouse LED lighting above aerosol product storage area ignited a small fire. Heat caused 2-3 aerosol cans immediately below to explode (BLEVE), projecting burning debris across 20m radius. Within 3 minutes, a chain reaction of aerosol BLEVEs propagated through the storage area. The warehouse sprinkler system activated but could not suppress the fire fast enough against the accelerating BLEVE chain reaction. Total warehouse involved within 8 minutes of initial fire.',
      impact: '45,000 cartons of aerosol products destroyed (₹60 Cr). Warehouse building structural collapse from heat (₹15 Cr). Adjacent warehouse wall damaged (₹10 Cr). Fire duration: 6 hours. No fatalities (night incident — warehouse unmanned). Godrej subsequently redesigned all aerosol storage per NFPA 30B with: sprinkler density increase, reduced stack heights, and fire wall compartmentalization.',
      lessons: [
        'Aerosol warehouse sprinkler design must be NFPA 30B specific (much higher density than general)',
        'Maximum aerosol stack height: 3.6m in racks with overhead ESFR sprinklers',
        'Fire compartmentalization: maximum 500 m² per aerosol compartment with 2-hour walls',
        'LED lighting: thermal fuse protected, not installed directly above aerosol storage',
        'Aerosol storage temperature: maximum 40°C maintained by ventilation (propellant pressure rises with temperature)',
        'Can integrity testing: sampling inspection for valve leaks before warehouse entry'
      ],
      benchmark: 'Unilever aerosol warehouses worldwide: NFPA 30B compliant design + 2.4m max solid pile storage + 500 m² compartments + temperature-controlled (<35°C) — zero total aerosol warehouse losses globally in 15 years.'
    },
    emergingRisks: [
      {
        id: 'pc-er-1',
        title: 'D2C & Quick Commerce — Distributed Inventory Fire Risk',
        category: 'market',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'FMCG shift to Direct-to-Consumer and quick commerce (Blinkit, Zepto, Instamart) distributes inventory across 1,000+ dark stores and micro-warehouses. These small facilities (500-2,000 sq ft) lack proper fire protection, store mixed products (food + aerosol + chemicals), and operate in residential/commercial buildings. A dark store fire with aerosols + food + chemicals creates complex multi-hazard scenario.',
        implications: ['Dark store fires with mixed product hazards', 'Absence of fire protection in micro-warehouses', 'Product liability complexity across multiple intermediaries', 'Brand exposure from third-party storage failures', 'Regulatory ambiguity for dark store fire safety']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'pc-ni-1',
        title: 'Ingredient/Chemical Ban — Regulatory & ESG',
        category: 'Regulatory / ESG',
        description: 'FMCG personal care faces ingredient bans driven by: consumer safety (parabens, SLS, microbeads), environment (phosphates, PFAS), and animal welfare (animal testing ban). Each ban requires reformulation (₹20-100 Cr R&D per product line), existing inventory writeoff, and new supplier qualification. EU REACH compliance increasingly adopted as Indian standard.',
        mitigation: 'Forward-looking ingredient strategy (avoid "at risk" chemicals proactively), natural/green product lines as hedge, R&D investment in clean-label alternatives, regulatory intelligence monitoring, multi-source ingredient qualification',
        exposure: '₹100-500 Cr per major ingredient ban (reformulation + writeoff + lost sales during transition)'
      }
    ],
    bestPractices: [
      {
        id: 'pc-bp-1',
        title: 'Aerosol Product Fire Safety',
        standard: 'NFPA 30B (Aerosol Products) + FM Global DS 7-29 + BAMA (British Aerosol Manufacturers)',
        description: 'Specialized fire protection for the highest-severity fire risk in FMCG — pressurized aerosol storage and manufacturing.',
        recommendations: [
          'Storage per NFPA 30B: maximum pile height 3.6m with ESFR K-25.2 sprinklers',
          'Fire compartments: maximum 500 m² per aerosol storage compartment, 2-hour walls',
          'Temperature control: maximum 40°C maintained by ventilation in aerosol storage',
          'Propellant filling room: ATEX Zone 1 electrical, continuous gas detection, explosion relief',
          'Aerosol can leak testing: 100% hot water bath test before packaging',
          'LED lighting with thermal fuse: not installed directly above aerosol storage',
          'Aerosol transport: separate from incompatible goods (oxidizers, corrosives)',
          'Firefighting: personnel must NOT approach aerosol fire within 50m (BLEVE projectile zone)'
        ],
        benchmark: 'Unilever global aerosol safety standard: zero total warehouse losses across 200+ facilities through NFPA 30B compliance + temperature control + compartmentalization + rigorous can integrity testing.'
      }
    ]
  },
  {
    id: 'warehouse-distribution',
    label: 'Warehouse & Distribution',
    icon: '📦',
    color: '#4CAF50',
    bannerImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    bannerTitle: 'Warehousing & Distribution',
    bannerSubtitle: 'Central warehouses, C&F depots, and last-mile distribution — high stock concentration, mixed product storage, and seasonal inventory buildup.',
    aogPerils: [
      {
        id: 'wd-aog-1',
        title: 'Flood — Distribution Warehouse Total Stock Loss',
        severity: 'critical',
        description: 'FMCG distribution warehouses concentrate ₹100-1,000 Cr of seasonal inventory in single locations. Pre-festive (Diwali) stock buildup creates maximum exposure. Flooding destroys ALL food/personal care products on contact. Ground-floor warehouses in flood-prone areas (UP, Bihar, Assam) face annual risk. A single warehouse loss during festive season creates irrecoverable market share damage.',
        impactAreas: ['Total Finished Goods Destruction', 'Seasonal Revenue Loss', 'Market Share to Competitors', 'Retailer Relationship Damage', 'Insurance Adequacy Challenge'],
        typicalClaim: '₹50–500 Cr (stock + lost sales + penalties)'
      }
    ],
    nonAogPerils: [
      {
        id: 'wd-naog-1',
        title: 'Warehouse Fire — Mixed Product Storage',
        severity: 'critical',
        description: 'FMCG warehouses store mixed products: food (moderate fire load), personal care (aerosols, flammables), home care (oxidizers, corrosives), and packaging materials (high fire load cardboard/plastic). This mix creates complex fire behavior — aerosol BLEVEs accelerate fire, oxidizers intensify combustion, and plastics generate toxic smoke. Standard fire protection rarely accounts for this mixed-hazard scenario.',
        impactAreas: ['Rapid Fire Growth (mixed fuels)', 'Aerosol BLEVE Cascade', 'Toxic Fume Generation', 'Total Stock Destruction', 'Building Structural Collapse'],
        typicalClaim: '₹100–500 Cr (stock + building + BI)'
      },
      {
        id: 'wd-naog-2',
        title: 'Cold Chain Failure — Refrigeration Breakdown',
        severity: 'high',
        description: 'Dairy, frozen food, and beverage cold chains require uninterrupted -18°C to +4°C. Compressor failure, refrigerant leak, or power outage causes temperature excursion. FSSAI mandates product destruction if cold chain is broken for >4 hours (frozen) or >2 hours (chilled). A single cold store failure destroys ₹20-100 Cr of perishable inventory with zero salvage value.',
        impactAreas: ['Complete Perishable Stock Loss', 'FSSAI Compliance Violation', 'Ammonia Leak (if NH3 system)', 'Customer Supply Disruption', 'Product Quality Claims'],
        typicalClaim: '₹20–100 Cr (stock destruction + BI)'
      }
    ],
    riskMatrix: [
      { risk: 'Warehouse Fire (Mixed FMCG)', prob: 2, impact: 3, score: 6, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Product segregation + ESFR sprinklers + compartments + aerosol-specific design', owner: 'Supply Chain Head', trigger: 'ANY fire detection in warehouse' },
      { risk: 'Flood (Seasonal Stock)', prob: 2, impact: 3, score: 6, emv: '₹275 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Stock-in-trade cover + multi-location distribution + elevated storage + flood barriers', owner: 'Logistics Director', trigger: 'Monsoon forecast + pre-festive stock concentration' },
      { risk: 'Cold Chain Failure', prob: 2, impact: 2, score: 4, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.iiar.org', strategyTooltip: 'Redundant refrigeration + diesel backup + temperature monitoring with auto-alert', owner: 'Cold Chain Head', trigger: 'Temperature deviation >2°C from setpoint for >30 min' },
    ],
    caseStudy: {
      title: 'ITC FMCG — Distribution Warehouse Fire (Festive Season Stock)',
      location: 'ITC FMCG Distribution Centre, Haridwar, Uttarakhand',
      date: 'October 2021',
      loss: '₹140 Cr (stock + building + BI)',
      rootCause: 'Electrical fault in forklift charging area (battery hydrogen ignition) at 11 PM. Fire spread to adjacent FMCG product storage — mixed pallets of biscuits (cardboard), personal care (aerosol deo + perfumes), and agarbatti (incense — highly flammable). The aerosol products began exploding within 5 minutes, projecting burning debris across the 10,000 m² warehouse. Pre-Diwali inventory buildup meant warehouse was at 120% normal capacity (over-stacking in aisles blocking sprinkler discharge pattern).',
      impact: 'Complete warehouse loss (₹90 Cr stock at peak seasonal inventory). Building structural collapse (₹20 Cr). 6-week disruption to ITC FMCG distribution in North India (₹30 Cr lost sales). Diwali season stock unrecoverable (production capacity fully committed to other regions). Post-fire: ITC invested ₹50 Cr in fire protection upgrades and multi-location seasonal stock distribution.',
      lessons: [
        'Forklift battery charging area: separate fire-rated room with hydrogen ventilation',
        'Aerosol products segregated in dedicated compartment (NOT mixed with general FMCG storage)',
        'Maximum warehouse utilization 80% during peak season — aisle clearance mandatory for sprinkler',
        'No over-stacking: sprinkler design assumes specific maximum storage height — exceeding invalidates protection',
        'Pre-festive stock distribution: no single warehouse to hold >30% of regional seasonal inventory',
        'Night security with thermal camera patrol when warehouse is unmanned'
      ],
      benchmark: 'HUL (Hindustan Unilever) distributes festive stock across 5+ locations per region with no single warehouse holding >20% of seasonal inventory. Combined with ESFR sprinkler + product segregation: zero total warehouse losses in 15 years.'
    },
    emergingRisks: [
      {
        id: 'wd-er-1',
        title: 'Automated Warehouse (AS/RS) — New Fire Response Challenge',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'FMCG companies investing in automated warehouses (AS/RS, robotic picking) for efficiency. These facilities store product at greater height and density — increasing fire load per m² while making manual firefighting impossible. AGV/AMR lithium batteries add new ignition source. Fire suppression system design for automated FMCG warehouses is an evolving challenge with limited loss data.',
        implications: ['Higher fire load density exceeding traditional sprinkler design', 'No manual access for firefighting in automated aisles', 'AGV battery thermal runaway adding new fire source', 'Mixed product storage at height creates complex fire behavior', 'Insurance underwriting gap for automated FMCG warehouses']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'wd-ni-1',
        title: 'Distribution Disruption — Strike / Logistics Breakdown',
        category: 'Operational / Infrastructure',
        description: 'FMCG depends on daily delivery to 10+ million retail outlets. Truck driver strikes (2020: 5-day nationwide halt), fuel price spikes, highway toll disputes, or state border restrictions halt distribution creating stock-outs at retail. Perishable products (dairy, bread) expire during transit disruptions. No insurance covers logistics disruption-induced lost sales.',
        mitigation: 'Multi-modal transport (rail + road), regional inventory buffer (7-day minimum), direct store delivery for critical products, electric fleet reducing fuel cost dependency, warehouse network optimization for resilience',
        exposure: '₹100-500 Cr/week lost sales across FMCG industry during major logistics disruption'
      }
    ],
    bestPractices: [
      {
        id: 'wd-bp-1',
        title: 'FMCG Warehouse Fire Protection (Mixed Products)',
        standard: 'FM Global DS 8-9/8-28/8-30 + NFPA 13 + NFPA 30B (Aerosol Segregation)',
        description: 'Fire protection design addressing the unique challenge of mixed FMCG product storage — combining food, aerosols, flammables, and oxidizers.',
        recommendations: [
          'Product segregation: aerosols in dedicated compartment per NFPA 30B (not mixed with general storage)',
          'ESFR sprinkler design: K-25.2 for aerosol compartment, K-16.8 minimum for general FMCG',
          'Fire compartmentalization: maximum 4,000 m² general, 500 m² for aerosol, 2-hour walls',
          'Maximum storage height: dictated by most hazardous product in each compartment',
          'Forklift charging: separate fire-rated room with hydrogen ventilation and suppression',
          'Warehouse utilization limit: 80% maximum — ensure sprinkler pattern not obstructed',
          'Night security with thermal imaging patrol every 30 minutes when unmanned',
          'Pre-festive season fire audit: verification of protection adequacy for peak inventory'
        ],
        benchmark: 'HUL + ITC post-fire standard: product segregation + ESFR + 80% utilization cap + distributed seasonal stock = zero total warehouse losses despite handling the most complex product mix in Indian FMCG.'
      }
    ]
  },
  {
    id: 'packaging',
    label: 'Packaging & Materials',
    icon: '📋',
    color: '#9C27B0',
    bannerImage: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1200&q=80',
    bannerTitle: 'Packaging Manufacturing',
    bannerSubtitle: 'Flexibles, cartons, bottles, and closures — solvent-based printing, extrusion, blow moulding, and lamination risks.',
    aogPerils: [
      {
        id: 'pkg-aog-1',
        title: 'Flood — Resin/Paper Stock & Printing Inks',
        severity: 'medium',
        description: 'Packaging converters store polymer resins (₹1-3 Lakh/tonne), printing inks (solvent-based, ₹500-1,500/kg), paper board, and aluminum foil. Water contact destroys paper/board stock completely. Solvent inks mixing with floodwater create fire and environmental hazards. Flexible packaging plants in Noida/Greater Noida industrial areas face regular monsoon flooding.',
        impactAreas: ['Paper/Board Stock Total Loss', 'Ink/Solvent Environmental Contamination', 'Polymer Resin Degradation', 'Printing Machine Damage', 'Customer Order Default'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'pkg-naog-1',
        title: 'Flexographic/Rotogravure Printing Fire — Solvent Inks',
        severity: 'critical',
        description: 'Flexible packaging printing uses solvent-based inks (ethyl acetate, toluene, MEK — flash points 0-40°C). Rotogravure printing machines operate with open ink troughs in solvent-vapor-rich environments. Static discharge from fast-moving film (200-400 m/min), hot air dryer temperature excursion, or ink trough flash ignites vapor. Solvent recovery/exhaust systems propagate fire between printing stations. Multiple Indian flexible packaging plant fires annually.',
        impactAreas: ['Printing Machine Fire', 'Solvent Recovery System Explosion', 'Multi-Machine Propagation', 'Substrate Roll Storage Fire', 'Building Total Loss'],
        typicalClaim: '₹30–150 Cr + 3-9 months BI'
      },
      {
        id: 'pkg-naog-2',
        title: 'Lamination / Coating Solvent Explosion',
        severity: 'high',
        description: 'Solvent-based lamination applies adhesive dissolved in ethyl acetate at 40-60°C. Lamination tunnel dryers operate at 60-80°C with high solvent concentrations. Oven LEL monitoring failure, exhaust fan trip, or static discharge inside tunnel causes explosion. The 2020 Huhtamaki India lamination fire caused ₹70 Cr damage from solvent tunnel explosion.',
        impactAreas: ['Tunnel Dryer Explosion', 'Adhesive Storage Fire', 'Machine Destruction', 'Substrate/Film Loss', 'Clean Room Contamination'],
        typicalClaim: '₹20–80 Cr + 2-4 months BI'
      },
      {
        id: 'pkg-naog-3',
        title: 'Extrusion Line Fire — Polymer Degradation',
        severity: 'medium',
        description: 'Polymer extrusion (PE, PP, PET) at 200-280°C creates molten polymer that auto-ignites if overheated or if residence time exceeds limits. Die buildup, screen pack blockage, or heater malfunction causes polymer degradation producing smoke and eventual ignition. Extruded film at 200+ meters/minute acts as a rapidly-burning fuse spreading fire along the line.',
        impactAreas: ['Extruder Die Fire', 'Film Line Fire Propagation', 'Winder Area Fire', 'Smoke Contamination', 'Building Damage'],
        typicalClaim: '₹5–40 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Roto/Flexo Printing Fire', prob: 3, impact: 2, score: 6, emv: '₹90 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'LEL monitoring + static elimination + dryer temperature control + machine suppression', owner: 'Printing Head', trigger: 'LEL >25% or static discharge detected or dryer temp alarm' },
      { risk: 'Lamination Tunnel Explosion', prob: 2, impact: 2, score: 4, emv: '₹50 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'LEL monitoring with auto fuel cutoff + explosion vents + exhaust fan redundancy', owner: 'Lamination Head', trigger: 'LEL >40% or exhaust fan failure alarm' },
      { risk: 'Extrusion Line Fire', prob: 2, impact: 1, score: 2, emv: '₹23 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.plasticsindustry.org', strategyTooltip: 'Temperature monitoring + die pressure alarm + screen changer maintenance + suppression', owner: 'Extrusion Head', trigger: 'Melt pressure >design limit or smoke detected at die' },
    ],
    caseStudy: {
      title: 'Huhtamaki India — Solvent Lamination Tunnel Fire',
      location: 'Huhtamaki PPL, Silvassa, Dadra & Nagar Haveli',
      date: 'January 2020',
      loss: '₹70 Cr (equipment + stock + BI)',
      rootCause: 'Lamination tunnel dryer exhaust fan failed (motor bearing seizure) during production run. Solvent concentration inside tunnel rose from normal 35% LEL to >100% LEL within 90 seconds. LEL monitor alarmed but operator response time (manual line stop) was 45 seconds. By then, static discharge from moving film ignited the solvent-air mixture. Explosion damaged the tunnel structure and fire spread to adjacent adhesive storage and substrate rolls.',
      impact: 'Lamination machine destroyed (₹15 Cr replacement, 8-month lead). Adjacent machines damaged by blast/fire (₹20 Cr). Substrate roll storage (₹10 Cr). Building damage (₹10 Cr). BI: ₹15 Cr. Post-incident: Huhtamaki invested ₹10 Cr in: automatic line shutdown on exhaust fan failure, redundant exhaust fans, and explosion vents on all tunnels.',
      lessons: [
        'Exhaust fan failure MUST automatically stop web travel + close tunnel entry — not operator dependent',
        'Redundant exhaust fan (N+1) for ALL solvent dryer/tunnel applications',
        'LEL monitoring with automatic fuel/solvent cutoff at 40% LEL and line stop at 50%',
        'Explosion vents on lamination tunnels per NFPA 68 (solvent vapor explosion scenario)',
        'Static elimination: ionizing bars at all film contact points, verified monthly',
        'Solvent adhesive bulk storage: minimum 10m separation from lamination machine in fire-rated room'
      ],
      benchmark: 'Amcor (global flexible packaging leader): automatic shutdown on fan failure + dual exhaust + explosion vents + <25% LEL limit (vs 40% standard) — zero tunnel fires across 50+ lamination lines globally in 10 years.'
    },
    emergingRisks: [
      {
        id: 'pkg-er-1',
        title: 'Water-Based / Solvent-Free Transition — Different Risks',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'FMCG brands mandating water-based inks and solvent-free lamination for sustainability. While eliminating solvent fire/explosion risk, these introduce: longer drying times (productivity loss), water-based ink foaming in recirculation, adhesive curing quality challenges, and substrate compatibility issues causing delamination in field. Different risk profile requiring different engineering controls.',
        implications: ['Productivity loss from slower water-based drying', 'New quality failure modes (delamination, blocking)', 'Investment in new machines (not retrofit of existing)', 'Product liability from packaging failure (contamination/leakage)', 'Transition period operating both solvent and water-based creates dual risk']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'pkg-ni-1',
        title: 'Plastic Packaging Regulatory Ban',
        category: 'Regulatory / ESG',
        description: 'India progressively banning single-use plastics. Multi-layer flexible packaging (MLP) faces uncertain future as recyclability mandates tighten. Packaging converters with ₹100-500 Cr invested in multilayer extrusion/lamination face stranded asset risk if MLP is prohibited. Alternative materials (paper, compostable films) require entirely different equipment.',
        mitigation: 'Investment in recyclable mono-material solutions, paper-based flexible packaging capability, compostable film technology, multi-material convertible manufacturing platforms, EPR compliance infrastructure',
        exposure: '₹200-1,000 Cr per large converter (stranded MLP equipment if regulation changes)'
      }
    ],
    bestPractices: [
      {
        id: 'pkg-bp-1',
        title: 'Printing & Lamination Solvent Fire Prevention',
        standard: 'NFPA 34 (Dipping/Coating) + FM Global DS 7-6 + ATEX Directive + EN 1539',
        description: 'Prevention of the most common fire in flexible packaging — solvent vapor ignition in printing and lamination operations.',
        recommendations: [
          'Continuous LEL monitoring in ALL dryer zones: alarm 25%, line stop 40%, emergency shutoff 50%',
          'Exhaust fan failure = automatic web stop + tunnel closure (not operator dependent)',
          'Redundant exhaust fans (N+1) for all solvent processing equipment',
          'Static elimination: ionizing bars at every film contact/separation point, monthly verification',
          'Explosion vents on dryer sections per NFPA 68 calculation',
          'Solvent storage: dedicated fire-rated room, maximum 4-hour supply at press/laminator',
          'Ink trough covers when press is stopped (prevent vapor accumulation)',
          'Annual electrical area classification review per IEC 60079-10-1 for solvent zones'
        ],
        benchmark: 'Amcor/Constantia global standard: <25% LEL hard limit + auto-shutdown on any exhaust failure + explosion vents = zero solvent fires across 100+ printing/lamination sites. Total investment: ₹30-50 Lakh per machine. Prevented single loss: ₹30-150 Cr.'
      }
    ]
  }
]
