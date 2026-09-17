// Chemical Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const CHEMICAL_RISK_SOURCES: RiskSource[] = [
  {
    id: 'petrochemicals',
    label: 'Petrochemicals',
    icon: '🛢️',
    color: '#7c2d12',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    bannerTitle: 'Petrochemical Complexes',
    bannerSubtitle: 'Crackers, polymers, aromatics — high-pressure, high-temperature hydrocarbon processing with catastrophic fire/explosion potential.',
    aogPerils: [
      {
        id: 'petro-aog-1',
        title: 'Earthquake — Cracker & Storage Tank Damage',
        severity: 'critical',
        description: 'Petrochemical complexes span 500-2,000 acres with steam crackers, distillation columns (60-80m tall), and massive storage tank farms (100-500 tanks). Seismic forces rupture piping racks (kilometers of interconnected pipe), crack column foundations, and cause tank shell buckling. A single cracker complex represents ₹20,000-50,000 Cr investment. Jamnagar (world\'s largest refinery-petrochemical complex) and Dahej are in seismic Zone III.',
        impactAreas: ['Pipe Rack Rupture (cascading)', 'Distillation Column Collapse', 'Tank Farm Failure', 'Cracker Furnace Damage', 'Toxic/Flammable Release'],
        typicalClaim: '₹500–5,000 Cr + 6-18 months BI'
      },
      {
        id: 'petro-aog-2',
        title: 'Cyclone / Flood — Coastal Complex Inundation',
        severity: 'high',
        description: 'Most Indian petrochemical complexes are coastal (Jamnagar, Dahej, Hazira, Vizag, Paradip) for feedstock import/product export. Cyclones and storm surge damage jetties, flood tank farms, and disable cooling water systems. The 2021 Cyclone Tauktae threatened Gujarat coast petrochemical assets. Flooding of process areas containing hydrocarbons creates fire/environmental hazards.',
        impactAreas: ['Jetty/Marine Terminal Damage', 'Tank Farm Flooding', 'Cooling Water System Failure', 'Electrical Substation Damage', 'Environmental Hydrocarbon Release'],
        typicalClaim: '₹100–1,000 Cr + 2-6 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'petro-naog-1',
        title: 'Vapor Cloud Explosion (VCE)',
        severity: 'critical',
        description: 'The most catastrophic petrochemical event. A large hydrocarbon release (pipe rupture, flange failure, relief valve discharge) forms a vapor cloud that, upon ignition, detonates with devastating overpressure. The 2020 Vizag LG Polymers styrene leak (12 killed, 1,000+ hospitalized) and global events (Buncefield UK, Texas City) demonstrate the scale. A VCE can destroy an entire process unit and damage assets within 1 km radius.',
        impactAreas: ['Multi-Unit Destruction', 'Overpressure Damage (1 km radius)', 'Multiple Fatalities', 'Community Impact/Evacuation', 'Extended Complex Shutdown'],
        typicalClaim: '₹1,000–10,000 Cr + mass fatality liability'
      },
      {
        id: 'petro-naog-2',
        title: 'Steam Cracker Furnace Fire/Explosion',
        severity: 'critical',
        description: 'Steam crackers pyrolyze naphtha/ethane at 800-850°C to produce ethylene/propylene. Furnace tube rupture releases hot hydrocarbons that auto-ignite. Coke buildup, burner malfunction, or tube metallurgy failure causes fires. The cracker is the heart of a petrochemical complex — its loss shuts ALL downstream units (polymers, glycols, oxides). Cracker rebuild: 12-24 months.',
        impactAreas: ['Furnace Tube Rupture', 'Hydrocarbon Fire', 'Complete Complex Shutdown', 'Downstream Unit Idling', 'Extended Rebuild (12-24 months)'],
        typicalClaim: '₹500–3,000 Cr + 12-24 months BI'
      },
      {
        id: 'petro-naog-3',
        title: 'Storage Tank Fire — Full Surface / Boilover',
        severity: 'high',
        description: 'Petrochemical tank farms store flammable products (naphtha, benzene, styrene). Tank fires from lightning, static, or overfill can escalate to full-surface fires. Floating roof tanks face rim seal fires. Crude/heavy product tanks risk boilover (violent eruption of burning oil). The 2009 Jaipur IOC depot fire burned for 11 days destroying the entire terminal.',
        impactAreas: ['Tank Full-Surface Fire', 'Boilover Event', 'Adjacent Tank Ignition (domino)', 'Bund Fire', 'Extended Firefighting (days)'],
        typicalClaim: '₹200–2,000 Cr (multi-tank scenario)'
      },
      {
        id: 'petro-naog-4',
        title: 'Toxic Gas Release — Chlorine/Ammonia/H2S',
        severity: 'critical',
        description: 'Petrochemical and allied chemical processes handle acutely toxic gases: chlorine (IDLH 10 ppm), ammonia (IDLH 300 ppm), hydrogen sulfide (IDLH 100 ppm), and phosgene. A release from storage, process leak, or transport creates immediate lethal zone requiring community evacuation. Bhopal (1984, MIC release, 15,000+ deaths) remains the world\'s worst industrial disaster and defines Indian chemical risk consciousness.',
        impactAreas: ['Mass Casualty (toxic exposure)', 'Community Evacuation', 'Environmental Contamination', 'Criminal Liability', 'Permanent Reputation Damage'],
        typicalClaim: '₹500–50,000 Cr (Bhopal precedent — effectively unlimited)'
      }
    ],
    riskMatrix: [
      { risk: 'Vapor Cloud Explosion', prob: 1, impact: 3, score: 3, emv: '₹5,000 Cr', strategy: 'Avoid', strategyUrl: 'https://www.aiche.org/ccps', strategyTooltip: 'Leak detection + gas dispersion modeling + ignition control + emergency isolation', owner: 'VP HSE', trigger: 'ANY large hydrocarbon release or gas detection >LEL' },
      { risk: 'Cracker Furnace Fire', prob: 2, impact: 3, score: 6, emv: '₹1,500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.api.org', strategyTooltip: 'Tube metallurgy monitoring + decoking schedule + burner management + snuffing steam', owner: 'Cracker Manager', trigger: 'Tube skin temp exceeding metallurgical limit' },
      { risk: 'Tank Fire/Boilover', prob: 2, impact: 3, score: 6, emv: '₹600 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-30', strategyTooltip: 'Fixed foam + rim seal fire detection + lightning protection + tank spacing per OISD', owner: 'Tank Farm Head', trigger: 'Rim seal fire detection or lightning strike on tank' },
      { risk: 'Toxic Gas Release', prob: 1, impact: 3, score: 3, emv: '₹2,500 Cr', strategy: 'Avoid', strategyUrl: 'https://www.aiche.org/ccps', strategyTooltip: 'SIL-rated detection + emergency scrubbers + minimize inventory + community alert system', owner: 'Head Process Safety', trigger: 'ANY toxic gas detection above action level' },
      { risk: 'Earthquake (Complex)', prob: 1, impact: 3, score: 3, emv: '₹2,500 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Seismic design + emergency shutdown systems + property/BI insurance', owner: 'Site Director', trigger: 'Seismic event in complex region' },
    ],
    caseStudy: {
      title: 'LG Polymers Vizag — Styrene Vapor Release',
      location: 'LG Polymers India, Visakhapatnam, Andhra Pradesh',
      date: 'May 2020',
      loss: '₹500+ Cr + 12 fatalities + 1,000+ hospitalized',
      rootCause: 'During COVID lockdown restart, styrene monomer stored in a tank (2,000 tonnes) underwent auto-polymerization due to inadequate temperature control and depleted inhibitor (TBC). The exothermic polymerization raised temperature and pressure, releasing styrene vapor through the tank vent. The heavier-than-air vapor cloud spread over surrounding villages in early morning (temperature inversion trapping vapor at ground level). Root cause: refrigeration system not maintained during lockdown, inhibitor levels not monitored, and no vapor detection/scrubbing.',
      impact: '12 killed, 1,000+ hospitalized, 20,000+ evacuated from 5 villages. Plant permanently shut. NGT imposed ₹50 Cr interim penalty. Criminal cases under IPC 304. Management arrested. National review of chemical storage safety. Demonstrated that stored monomers require active management (not passive storage).',
      lessons: [
        'Monomer storage requires continuous temperature control + inhibitor (TBC) level monitoring',
        'Refrigeration/cooling systems for reactive chemicals must NEVER be shut down (even during lockdown)',
        'Vapor detection at tank vents with community alert integration',
        'Restart after extended shutdown requires formal risk assessment (MOC for the shutdown itself)',
        'Reactive chemical inventory (styrene, acrylates) must be minimized — just-in-time not bulk storage',
        'Emergency scrubber/quench system for reactive monomer tanks'
      ],
      benchmark: 'BASF/Dow reactive monomer storage: redundant refrigeration + continuous inhibitor monitoring + polymerization detection (temperature/viscosity) + automatic quench + emergency vent scrubber — zero uncontrolled polymerization events in 20+ years globally.'
    },
    emergingRisks: [
      {
        id: 'petro-er-1',
        title: 'Green Chemistry / Bio-Based Transition',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2035',
        description: 'Pressure to shift from fossil-based to bio-based feedstocks (bio-ethylene, bio-based polymers). New processes (fermentation, enzymatic conversion) introduce unfamiliar risks. Existing petrochemical operators lack biotech process safety experience. Transition creates dual-operation risk (running both old and new processes during changeover).',
        implications: ['Novel bioprocess safety unknowns', 'Fermentation-related risks (contamination, pressure)', 'Workforce reskilling for biotech operations', 'Dual-operation complexity during transition', 'Insurance gap for novel green chemistry']
      },
      {
        id: 'petro-er-2',
        title: 'Carbon Pricing & Stranded Asset Risk',
        category: 'regulatory',
        severity: 'high',
        timeline: '2026-2035',
        description: 'Petrochemicals are carbon-intensive (crackers, energy). Carbon pricing (Indian ETS from 2026, EU CBAM) adds significant cost. Plastic waste regulations and circular economy mandates threaten virgin polymer demand. ₹50,000+ Cr petrochemical investments face stranded asset risk if petrochemical demand peaks and declines faster than asset life.',
        implications: ['Carbon cost eroding cracker economics', 'Virgin polymer demand decline from recycling mandates', 'Stranded asset risk for new capacity', 'Recycling infrastructure investment requirement', 'ESG-driven cost of capital increase']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'petro-ni-1',
        title: 'Feedstock Price Volatility (Crude/Naphtha)',
        category: 'Commodity / Market',
        description: 'Petrochemical margins depend on the spread between feedstock (naphtha, ethane — 60-70% of cost) and product prices. Crude oil volatility (₹5,000-9,000/bbl range) flows directly to feedstock cost. When product prices don\'t rise proportionally (oversupply, weak demand), margins collapse. The 2023 petrochemical downcycle saw margins turn negative for many producers.',
        mitigation: 'Feedstock flexibility (naphtha/ethane/propane switching), integrated refinery-petrochemical (captive feedstock), product diversification, long-term supply contracts, hedging where liquid markets exist',
        exposure: '₹2,000-10,000 Cr/year margin swing per large petrochemical complex'
      }
    ],
    bestPractices: [
      {
        id: 'petro-bp-1',
        title: 'Process Safety Management (PSM) for Petrochemicals',
        standard: 'OSHA PSM + CCPS + API RP 754 + Seveso III Directive',
        description: 'Preventing catastrophic vapor cloud explosions and toxic releases — the defining risks of petrochemical operations.',
        recommendations: [
          'Process Hazard Analysis (PHA/HAZOP) revalidated every 5 years for all units',
          'Mechanical integrity program: RBI (Risk-Based Inspection) for all pressure equipment/piping',
          'Leak Detection And Repair (LDAR) program: quarterly monitoring of all flanges/valves',
          'Fixed gas detection: flammable (LEL) and toxic (H2S, Cl2, NH3) with SIL-rated shutdown',
          'Emergency isolation valves (EIV) remotely operable for all major inventory',
          'Safety Instrumented Systems (SIS) per IEC 61511 for all critical safety functions',
          'Facility siting study (blast/toxic modeling) for all occupied buildings',
          'Process Safety KPIs per API RP 754 tracked and reported to Board'
        ],
        benchmark: 'Reliance Jamnagar: world-class PSM achieving Tier-1 process safety event rate <0.05 per 200,000 hours through comprehensive HAZOP, RBI, SIS, and safety culture — among the safest complexes globally.'
      }
    ]
  },
  {
    id: 'specialty-chemicals',
    label: 'Specialty Chemicals',
    icon: '⚗️',
    color: '#0d9488',
    bannerImage: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=1200&q=80',
    bannerTitle: 'Specialty & Fine Chemicals',
    bannerSubtitle: 'Agrochemicals, dyes, pigments, and performance chemicals — batch processing with reactive chemistry and multi-product risks.',
    aogPerils: [
      {
        id: 'spec-aog-1',
        title: 'Flood — Chemical Store & Effluent Overflow',
        severity: 'high',
        description: 'Specialty chemical clusters (Gujarat GIDC, Maharashtra MIDC, Telangana) concentrate in industrial estates prone to flooding. Flooding lifts drum storage, mixes incompatible chemicals (creating toxic/reactive reactions), and overflows effluent treatment. The 2020 Hyderabad and 2023 Vapi/Ankleshwar floods affected 100+ chemical units. Chemical-contaminated floodwater creates environmental disasters affecting entire regions.',
        impactAreas: ['Chemical Incompatibility Reactions', 'Effluent Environmental Discharge', 'Reactor/Equipment Damage', 'Product Contamination', 'Regional Environmental Contamination'],
        typicalClaim: '₹20–150 Cr + environmental liability'
      }
    ],
    nonAogPerils: [
      {
        id: 'spec-naog-1',
        title: 'Runaway Reaction — Exothermic Process',
        severity: 'critical',
        description: 'Specialty chemistry involves hazardous reactions: nitration, diazotization, oxidation, hydrogenation, and Grignard. Loss of cooling, wrong addition rate, or contamination triggers thermal runaway. Pressure/temperature spike causes reactor rupture, toxic release, or fire. Multiple Indian specialty chemical explosions annually (Dahej, Ankleshwar). The 2021 SVA Organics reactor explosion killed 3.',
        impactAreas: ['Reactor Explosion', 'Toxic/Corrosive Release', 'Worker Fatalities', 'Adjacent Reactor Cascade', 'Facility Shutdown'],
        typicalClaim: '₹20–150 Cr + fatality liability'
      },
      {
        id: 'spec-naog-2',
        title: 'Solvent Fire — Multi-Solvent Handling',
        severity: 'high',
        description: 'Specialty chemical plants handle diverse flammable solvents (toluene, methanol, acetone, DMF, THF) with varying flash points. Solvent recovery, reactor charging, and product isolation create fire risk. Multi-product batch operations mean frequent solvent changeovers increasing exposure. Static discharge during solvent transfer is a common ignition source.',
        impactAreas: ['Flash Fire', 'Solvent Storage Fire', 'Distillation Fire', 'Multi-Floor Propagation', 'Product Loss'],
        typicalClaim: '₹15–100 Cr + 2-4 months BI'
      },
      {
        id: 'spec-naog-3',
        title: 'Dust Explosion — Powder Products',
        severity: 'high',
        description: 'Dyes, pigments, agrochemical actives, and intermediates are often fine powders (explosive dusts). Drying (spray dryers, FBD), milling, sieving, and packaging create explosive dust clouds. Many organic chemical dusts have low minimum ignition energy. Spray dryer fires are particularly common in dye/pigment manufacturing.',
        impactAreas: ['Spray Dryer Explosion', 'Mill/Sieve Explosion', 'Powder Handling Flash', 'Secondary Explosion', 'Building Damage'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Runaway Reaction', prob: 2, impact: 3, score: 6, emv: '₹85 Cr', strategy: 'Avoid', strategyUrl: 'https://www.aiche.org/ccps', strategyTooltip: 'Reaction calorimetry + cooling redundancy + emergency quench + controlled addition', owner: 'Head Process Safety', trigger: 'Batch temperature >5°C above setpoint or cooling failure' },
      { risk: 'Solvent Fire', prob: 3, impact: 2, score: 6, emv: '₹58 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-30', strategyTooltip: 'ATEX zones + gas detection + static control + foam suppression', owner: 'Plant Head', trigger: 'Solvent vapor >20% LEL or transfer without grounding' },
      { risk: 'Dust Explosion', prob: 2, impact: 2, score: 4, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-652', strategyTooltip: 'DHA + explosion vents + inerting + grounding + housekeeping', owner: 'EHS Head', trigger: 'Dust accumulation or dryer temperature anomaly' },
      { risk: 'Flood (Chemical)', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.cpcb.nic.in', strategyTooltip: 'Elevated storage + chemical segregation + bunding + effluent surge capacity', owner: 'Environment Head', trigger: 'Heavy rainfall or industrial estate flood warning' },
    ],
    caseStudy: {
      title: 'SVA Organics Ankleshwar — Reactor Explosion',
      location: 'Chemical unit, Ankleshwar GIDC, Gujarat',
      date: 'June 2021',
      loss: '₹40 Cr + 3 fatalities',
      rootCause: 'A nitration reaction (highly exothermic) experienced cooling water circulation failure. The operator continued adding nitrating agent (mixed acid) without recognizing the temperature rise. The reaction mass underwent thermal runaway — temperature exceeded 150°C causing decomposition of the nitro compound. The resulting pressure surge ruptured the glass-lined reactor, ejecting hot corrosive reaction mass and causing a fire. 3 workers killed, 5 injured.',
      impact: '3 fatalities, 5 injured. Reactor block destroyed. Plant shut 4 months for investigation and rebuild. GPCB imposed penalty and enhanced monitoring. Criminal cases filed. Neighboring units temporarily evacuated during incident. Company invested in reaction calorimetry and automated cooling systems post-incident.',
      lessons: [
        'Reaction calorimetry (DSC/RC1) mandatory before scaling any exothermic reaction',
        'Cooling water circulation must have redundancy + flow monitoring with auto-stop of addition',
        'Controlled/metered reagent addition (not manual) for exothermic reactions',
        'Emergency quench/dump system for all exothermic batch reactors',
        'Operator training on runaway reaction recognition and emergency response',
        'Temperature interlock: automatic stop of reagent addition if temperature exceeds limit'
      ],
      benchmark: 'PI Industries / SRF (Indian specialty chemical leaders): reaction calorimetry for all processes + automated dosing + emergency quench + redundant cooling — significantly lower incident rates through process safety investment.'
    },
    emergingRisks: [
      {
        id: 'spec-er-1',
        title: 'China+1 Rapid Capacity — Safety Culture Lag',
        category: 'market',
        severity: 'high',
        timeline: '2024-2030',
        description: 'Global supply chain diversification from China driving explosive growth in Indian specialty chemicals. New capacity built rapidly by companies with varying safety maturity. MSME chemical units often lack HAZOP, reaction calorimetry, and proper process safety systems. Incident frequency rising as capacity grows faster than safety culture. Insurance market facing elevated risk from new units.',
        implications: ['New units with inadequate process safety', 'Reaction hazard assessment gaps', 'Workforce inexperience on hazardous chemistry', 'Regulatory enforcement lagging capacity growth', 'Rising incident frequency across the sector']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'spec-ni-1',
        title: 'Environmental Compliance & CETP Dependency',
        category: 'Regulatory / Environmental',
        description: 'Specialty chemical clusters depend on Common Effluent Treatment Plants (CETP). CETP failure or NGT action against a cluster can shut ALL units simultaneously. The 2019 NGT closure of Tamil Nadu/Gujarat chemical clusters affected hundreds of units. Individual unit compliance doesn\'t protect against cluster-level regulatory action. ZLD (Zero Liquid Discharge) mandate requires ₹20-100 Cr investment per unit.',
        mitigation: 'Own ETP/ZLD capability (not sole CETP reliance), cleaner production reducing effluent, cluster-level environmental governance participation, proactive compliance beyond minimum, water recycling',
        exposure: '₹100-500 Cr per cluster (closure scenario affecting all units)'
      }
    ],
    bestPractices: [
      {
        id: 'spec-bp-1',
        title: 'Reactive Chemistry Process Safety',
        standard: 'CCPS Reactive Chemicals + IIT/NCL Guidelines + IEC 61511',
        description: 'Preventing runaway reactions — the most frequent catastrophic event in specialty chemical batch processing.',
        recommendations: [
          'Reaction calorimetry (RC1/DSC/ARC) for ALL exothermic reactions before scale-up',
          'Thermal stability data (onset temperature, TMR) for all reaction masses and intermediates',
          'Cooling system redundancy with flow/temperature monitoring and auto-response',
          'Controlled/metered reagent addition with temperature-based dosing control',
          'Emergency measures: quench tank, dump system, or emergency cooling for each reactor',
          'Basis of Safety documented for every process (what prevents runaway)',
          'MOC (Management of Change) for ANY process modification (temperature, concentration, scale)',
          'Operator competency: runaway reaction recognition and response training'
        ],
        benchmark: 'PI Industries: comprehensive reaction hazard assessment + automated process control + emergency systems for all agrochemical processes — enabling safe manufacture of complex hazardous chemistry at scale.'
      }
    ]
  },
  {
    id: 'storage-logistics',
    label: 'Storage & Logistics',
    icon: '🚛',
    color: '#ca8a04',
    bannerImage: 'https://images.unsplash.com/photo-1487875961445-47a00398c267?w=1200&q=80',
    bannerTitle: 'Chemical Storage & Transport',
    bannerSubtitle: 'Tank farms, warehouses, tanker transport, and port terminals — where chemicals in transit and storage create dispersed risk.',
    aogPerils: [
      {
        id: 'stor-aog-1',
        title: 'Lightning — Tank Farm Ignition',
        severity: 'high',
        description: 'Chemical/solvent tank farms are prime lightning targets. Direct strikes or induced currents ignite flammable vapors at tank vents, floating roof seals, or gauge hatches. A single tank fire can cascade to adjacent tanks (domino effect) if spacing/protection is inadequate. Lightning protection per API 2003 is essential but often deficient at older facilities.',
        impactAreas: ['Tank Fire from Strike', 'Rim Seal Fire', 'Domino Tank Involvement', 'Bund Fire', 'Environmental Release'],
        typicalClaim: '₹50–500 Cr (tank farm scenario)'
      }
    ],
    nonAogPerils: [
      {
        id: 'stor-naog-1',
        title: 'Chemical Warehouse Fire — Mixed Storage',
        severity: 'critical',
        description: 'Chemical warehouses storing mixed products (oxidizers, flammables, corrosives, toxics) create catastrophic fire potential. Incompatible storage causes reactive fires. The 2015 Tianjin (China) chemical warehouse explosion (173 killed, $9B damage) from improper storage of oxidizers + flammables is the defining case. Indian chemical warehouses frequently violate segregation norms. Firefighting water runoff creates secondary environmental disaster.',
        impactAreas: ['Warehouse Explosion (Tianjin-scale)', 'Toxic Fume Release', 'Reactive Fire (incompatibles)', 'Mass Casualty Potential', 'Environmental Water Contamination'],
        typicalClaim: '₹100–5,000 Cr (Tianjin precedent)'
      },
      {
        id: 'stor-naog-2',
        title: 'Tanker Accident — Road/Rail Transport',
        severity: 'high',
        description: 'Chemical tankers (road: 20-25 tonnes, rail: 50-60 tonnes) transporting flammable/toxic/corrosive chemicals face accident risk on Indian highways. A tanker accident with release (LPG, chlorine, acid) in a populated area creates mass casualty potential. The 2011 chlorine tanker leak in Mumbai and multiple LPG tanker BLEVEs demonstrate the risk. Transport is the least-controlled part of the chemical value chain.',
        impactAreas: ['Tanker Rollover/Rupture', 'Toxic/Flammable Release', 'Highway/Community Casualties', 'BLEVE (for LPG/pressurized)', 'Traffic/Infrastructure Disruption'],
        typicalClaim: '₹10–200 Cr per incident + liability'
      }
    ],
    riskMatrix: [
      { risk: 'Chemical Warehouse Fire/Explosion', prob: 2, impact: 3, score: 6, emv: '₹600 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-400', strategyTooltip: 'Segregation per compatibility + fire compartments + suppression + inventory limits', owner: 'Warehouse Director', trigger: 'ANY incompatible storage or fire detection' },
      { risk: 'Tank Farm Fire', prob: 2, impact: 3, score: 6, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.oisd.gov.in', strategyTooltip: 'OISD tank spacing + fixed foam + lightning protection + rim seal detection', owner: 'Terminal Head', trigger: 'Lightning strike or rim seal fire detection' },
      { risk: 'Tanker Transport Accident', prob: 3, impact: 2, score: 6, emv: '₹55 Cr', strategy: 'Transfer', strategyUrl: 'https://www.pesomah.gov.in', strategyTooltip: 'GPS tracking + driver training + route planning + emergency response + transit insurance', owner: 'Logistics Head', trigger: 'Tanker deviation, overspeed, or accident alert' },
    ],
    caseStudy: {
      title: 'Tianjin Port (China) — Chemical Warehouse Explosion (Reference)',
      location: 'Ruihai Logistics, Tianjin Port, China',
      date: 'August 2015',
      loss: '$9 Billion + 173 fatalities',
      rootCause: 'A chemical logistics warehouse stored incompatible materials in violation of regulations: 800 tonnes of ammonium nitrate (oxidizer), 500 tonnes of potassium nitrate, and 700 tonnes of sodium cyanide, alongside flammable materials. Nitrocellulose (self-heating) ignited from summer heat, causing an initial fire. Firefighters applied water — reacting violently with the stored calcium carbide/sodium. The fire reached the ammonium nitrate causing two massive detonations (equivalent to 21 tonnes TNT).',
      impact: '173 killed (including 104 firefighters), 798 injured. 304 buildings destroyed. 12,000 cars destroyed. $9 billion in damages. Massive sodium cyanide environmental contamination. Demonstrated the catastrophic consequences of chemical incompatibility in storage and the danger of applying water to reactive chemical fires.',
      lessons: [
        'Chemical segregation by compatibility class is NON-NEGOTIABLE (oxidizers away from flammables)',
        'Maximum inventory limits per warehouse compartment (Tianjin had 70x legal ammonium nitrate)',
        'Firefighter chemical training: NEVER apply water to reactive metal/carbide fires',
        'Material Safety Data Sheets (SDS) accessible to emergency responders in real-time',
        'Warehouse siting: adequate distance from residential/commercial areas',
        'Independent audit of chemical warehouse compliance (Tianjin operated with fraudulent permits)'
      ],
      benchmark: 'BASF/Brenntag chemical logistics: NFPA 400 compliant segregation, inventory limits per compartment, SDS-integrated emergency response, and firefighter chemical training — zero major warehouse explosions across global operations.'
    },
    emergingRisks: [
      {
        id: 'stor-er-1',
        title: 'Battery Chemical Storage — Li-ion Supply Chain',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'India\'s battery/EV growth requires storage/handling of lithium compounds, electrolytes (flammable organic solvents), and cathode materials. These have unique fire characteristics (Class D metal fires, HF release). Chemical logistics companies adding battery material handling lack specialized experience. Standard chemical warehouse protection is inadequate for lithium compound fires.',
        implications: ['Lithium compound fire (Class D — water ineffective)', 'Electrolyte solvent flammability', 'HF gas release from fires', 'Specialized suppression required', 'Insurance product gap for battery chemical storage']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'stor-ni-1',
        title: 'PESO/Regulatory Licensing & Public Opposition',
        category: 'Regulatory / Social',
        description: 'Chemical storage requires PESO, factory license, environmental clearance, and local body NOC. Public opposition to chemical facilities (NIMBY) is intensifying after incidents. A single incident anywhere triggers regulatory tightening everywhere. License renewal can be denied on public safety grounds, stranding storage infrastructure investment.',
        mitigation: 'Community engagement and transparency, safety demonstration, proactive compliance, emergency response coordination with local authorities, adequate buffer zones, industry safety reputation building',
        exposure: '₹50-500 Cr per facility (license denial/relocation scenario)'
      }
    ],
    bestPractices: [
      {
        id: 'stor-bp-1',
        title: 'Chemical Storage & Handling Safety',
        standard: 'NFPA 400 (Hazardous Materials) + OISD-116/117 + Manufacture Storage Import of Hazardous Chemical Rules (MSIHC)',
        description: 'Preventing chemical warehouse and tank farm disasters through proper segregation, inventory control, and emergency preparedness.',
        recommendations: [
          'Chemical segregation per compatibility matrix (NFPA 400) — separate storage for each hazard class',
          'Maximum inventory limits per compartment with automatic monitoring',
          'Tank spacing per OISD-116/117 with fixed foam and cooling water systems',
          'SDS (Safety Data Sheet) database accessible to emergency responders in real-time',
          'Firefighter training on chemical-specific response (never water on reactive materials)',
          'Bunding for 110% of largest tank + spill containment for warehouses',
          'Lightning protection per API 2003 tested annually',
          'Emergency response plan coordinated with local authorities + community alert system'
        ],
        benchmark: 'Brenntag/Univar (global chemical distributors): NFPA 400 compliant segregation, real-time SDS access, and integrated emergency response — zero major warehouse incidents across 600+ facilities worldwide.'
      }
    ]
  }
]
