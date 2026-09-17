// Cement Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const CEMENT_RISK_SOURCES: RiskSource[] = [
  {
    id: 'kiln',
    label: 'Kiln & Pyroprocessing',
    icon: '🔥',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80',
    bannerTitle: 'Rotary Kiln & Pyroprocessing',
    bannerSubtitle: 'Core of cement manufacturing — 1,450°C clinkerization in 60-80m long rotary kilns. Highest asset value and BI exposure.',
    aogPerils: [
      {
        id: 'kiln-aog-1',
        title: 'Earthquake — Kiln Shell Misalignment & Foundation Settlement',
        severity: 'critical',
        description: 'Rotary kilns (60-80m length, 5-6m diameter, 3,000-5,000 tonnes weight) rest on 3-4 support piers. Seismic forces cause differential foundation settlement, tyre/roller misalignment, and shell ovality. Even 5mm misalignment creates hotspots leading to shell cracking. Preheater towers (80-120m tall) are particularly vulnerable to lateral seismic forces.',
        impactAreas: ['Kiln Shell Cracking', 'Tyre/Roller Misalignment', 'Preheater Tower Structural Damage', 'Refractory Collapse', 'Foundation Settlement'],
        typicalClaim: '₹100–500 Cr + 6-12 months BI'
      },
      {
        id: 'kiln-aog-2',
        title: 'Cyclone / Storm — Preheater Tower & Stack Damage',
        severity: 'high',
        description: 'Preheater towers and chimneys (80-120m height) act as wind sails during cyclonic conditions. Wind speeds >130 kmph cause structural damage to cyclone stages, duct connections, and ESP/baghouse structures. Coastal plants in Gujarat, Tamil Nadu, and Andhra Pradesh face annual cyclone risk.',
        impactAreas: ['Preheater Duct Collapse', 'ESP Structure Damage', 'Chimney/Stack Failure', 'Raw Mill Building Damage', 'Power Grid Disruption'],
        typicalClaim: '₹30–150 Cr + 2-4 months BI'
      },
      {
        id: 'kiln-aog-3',
        title: 'Lightning Strike — Control Systems & Motors',
        severity: 'medium',
        description: 'Cement plants in elevated locations (limestone quarry sites) with tall structures attract lightning. Strikes damage kiln drive VFDs, PLC/DCS systems, and transformer bushings. Induced surges destroy instrumentation across the plant. The 2022 Dalmia Cement lightning event damaged 3 transformers simultaneously.',
        impactAreas: ['Kiln Drive VFD Failure', 'DCS/PLC Damage', 'Transformer Bushing Flashover', 'Instrumentation Surge Damage', 'Baghouse Controller Failure'],
        typicalClaim: '₹5–40 Cr + 2-6 weeks BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'kiln-naog-1',
        title: 'Kiln Shell Hot Spot & Refractory Collapse',
        severity: 'critical',
        description: 'When kiln refractory lining (200-250mm thick magnesia-chrome or alumina bricks) fails, the steel shell is exposed to 1,450°C process gas. Shell temperature rises from 250°C to 400°C+ in minutes, causing shell deformation (banana effect), tyre cracking, and potential shell burn-through. Emergency kiln stop is required immediately. Reline of affected zone takes 3-6 weeks; full reline takes 30-45 days.',
        impactAreas: ['Shell Deformation', 'Tyre Cracking', 'Burn-Through Hole', 'Roller/Bearing Damage', 'Complete Kiln Reline Required'],
        typicalClaim: '₹50–200 Cr + 1-3 months BI'
      },
      {
        id: 'kiln-naog-2',
        title: 'Kiln Main Drive / Girth Gear Failure',
        severity: 'critical',
        description: 'The kiln main drive system (girth gear + pinion + main motor 2,000-5,000 HP + gearbox) is a single-point-of-failure. Girth gear tooth breakage or cracking propagates rapidly destroying multiple teeth. Girth gear replacement requires complete kiln cooldown, removal of the old gear (100+ tonnes), and installation — total downtime 4-8 months. No spare girth gear exists (each is custom-made).',
        impactAreas: ['Girth Gear Tooth Failure', 'Pinion Shaft Breakage', 'Main Motor Burnout', 'Gearbox Seizure', 'Auxiliary Drive Overload'],
        typicalClaim: '₹80–400 Cr + 4-8 months BI'
      },
      {
        id: 'kiln-naog-3',
        title: 'Preheater / Calciner Explosion — CO Buildup',
        severity: 'high',
        description: 'Incomplete combustion in the calciner or kiln back-end creates CO-rich zones. During upset conditions (raw meal blockage, fuel interruption), CO accumulates in the preheater tower. When combustion resumes, the CO-air mixture explodes with devastating force, blowing out cyclone stages, ducts, and expansion joints. The Ultratech Awarpur incident (2019) destroyed 2 cyclone stages.',
        impactAreas: ['Cyclone Stage Destruction', 'Duct Rupture', 'Expansion Joint Blowout', 'Preheater Structure Damage', 'ESP/Baghouse Damage'],
        typicalClaim: '₹30–120 Cr + 2-4 months BI'
      },
      {
        id: 'kiln-naog-4',
        title: 'Kiln Tyre & Support Roller Failure',
        severity: 'high',
        description: 'Each kiln rests on 3-4 tyres (riding rings) supported by paired rollers. Tyre cracking from thermal fatigue, roller bearing seizure, or thrust roller failure can destabilize the entire kiln. A cracked tyre requires emergency kiln stop and field welding repair (2-4 weeks) or replacement (3-6 months if new tyre needed).',
        impactAreas: ['Tyre Cracking', 'Roller Bearing Failure', 'Kiln Axial Migration', 'Shell Ovality', 'Seal Damage at Inlet/Outlet'],
        typicalClaim: '₹20–100 Cr + 1-6 months BI'
      },
      {
        id: 'kiln-naog-5',
        title: 'Coal Mill Explosion — Pulverized Fuel System',
        severity: 'high',
        description: 'Vertical roller mills or ball mills grind coal to 70-90 micron for kiln/calciner firing. Fine coal dust at elevated temperature (60-80°C) within explosive concentration range (40-4000 g/m³) creates permanent explosion risk. Hot mill rejects, foreign metal sparks, or static discharge ignite the coal-air mixture. Explosions destroy mill internals, feeding systems, and adjacent ductwork.',
        impactAreas: ['Mill Explosion', 'Duct/Cyclone Destruction', 'Coal Silo Fire', 'Feed System Damage', 'Adjacent Equipment Damage'],
        typicalClaim: '₹20–80 Cr + 1-2 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Kiln Girth Gear Failure', prob: 1, impact: 3, score: 3, emv: '₹240 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com/en/solutions/for-industry-clients', strategyTooltip: 'MB + MLOP with 12-month indemnity period; gear condition monitoring program', owner: 'VP Manufacturing', trigger: 'Gear tooth root crack detection on NDE' },
      { risk: 'Refractory Collapse', prob: 3, impact: 2, score: 6, emv: '₹125 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.refractories-worldforum.com', strategyTooltip: 'Shell scanner + thermal imaging + campaign life management', owner: 'Kiln Manager', trigger: 'Shell temp >380°C sustained' },
      { risk: 'Preheater CO Explosion', prob: 2, impact: 2, score: 4, emv: '₹75 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards', strategyTooltip: 'CO monitoring + auto fuel cutoff + explosion vents on cyclones', owner: 'Head Process', trigger: 'CO >2% in preheater gas' },
      { risk: 'Coal Mill Explosion', prob: 2, impact: 2, score: 4, emv: '₹50 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.atexexplosionprotection.com', strategyTooltip: 'Inerting system + temperature monitoring + explosion vents', owner: 'Coal Mill Operator', trigger: 'Mill outlet temp >80°C or O2 >12%' },
      { risk: 'Kiln Tyre Cracking', prob: 2, impact: 2, score: 4, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.flsmidth.com/en-gb/products/kilns', strategyTooltip: 'Thermal profiling + creep gap monitoring + NDE at shutdowns', owner: 'Mechanical Head', trigger: 'Tyre creep >15mm or surface crack detected' },
      { risk: 'Kiln Motor/Drive Failure', prob: 2, impact: 3, score: 6, emv: '₹150 Cr', strategy: 'Transfer', strategyUrl: 'https://www.agcs.allianz.com/insights/expert-risk-articles', strategyTooltip: 'MB policy + critical spare motor on-site', owner: 'Electrical Head', trigger: 'Motor insulation resistance declining or vibration >6 mm/s' },
    ],
    caseStudy: {
      title: 'UltraTech Awarpur — Preheater Explosion During Kiln Startup',
      location: 'UltraTech Cement, Awarpur, Maharashtra',
      date: 'September 2019',
      loss: '₹95 Cr (equipment + BI)',
      rootCause: 'During kiln restart after a 12-hour unplanned shutdown, CO accumulated in the preheater tower due to incomplete combustion from cold raw meal blocking the calciner fuel injection point. When the fuel system was reactivated, the CO-air mixture in Cyclone Stages 3 and 4 ignited explosively. The blast destroyed both cyclone stages, ruptured 40m of preheater duct, and damaged the ESP inlet duct. Root cause: no CO monitoring in preheater gas path and no purge protocol before fuel re-ignition.',
      impact: 'Kiln shutdown for 75 days. Two cyclone stages required complete reconstruction. ESP inlet duct replacement. 3 workers injured from blast pressure. Production loss: ₹65 Cr (75 days × ₹85 Lakh/day). Equipment repair: ₹30 Cr. UltraTech retrofitted CO analyzers on all 23 kiln lines within 6 months.',
      lessons: [
        'Mandatory CO monitoring at preheater outlet and each cyclone stage with trip at 2%',
        'Purge protocol: 10-minute fresh air purge through preheater before any fuel ignition',
        'Explosion vents on cyclone stages 3, 4, and 5 (upper stages most vulnerable)',
        'Startup procedure requires confirmation of raw meal flow before fuel injection',
        'Emergency fuel cutoff linked to CO analyzer — automatic, not operator-dependent'
      ],
      benchmark: 'HeidelbergCement (now Heidelberg Materials) mandates explosion relief panels on all preheater cyclones and continuous CO monitoring as a SIL-2 rated safety function. Zero preheater explosions in 10 years across 130+ kilns.'
    },
    emergingRisks: [
      {
        id: 'kiln-er-1',
        title: 'Alternative Fuel (RDF/Waste) Co-Processing Risks',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2030',
        description: 'Indian cement plants targeting 25-30% thermal substitution rate (TSR) with waste-derived fuels — municipal waste, industrial sludge, tyre chips, biomass. Unknown/variable calorific value causes kiln instability. Chlorine/alkali in waste creates kiln ring formation. Dioxin/furan emissions from improper combustion of plastics. Storage of RDF creates spontaneous combustion risk.',
        implications: ['Kiln ring formation causing blockages and shutdowns', 'Chlorine bypass system corrosion and failures', 'RDF storage fires from self-heating', 'Regulatory non-compliance on emissions (dioxin, heavy metals)', 'Community opposition delaying permits']
      },
      {
        id: 'kiln-er-2',
        title: 'Carbon Capture (CCUS) Retrofit Risks',
        severity: 'high',
        category: 'technology',
        timeline: '2027-2035',
        description: 'Cement is responsible for 7% of global CO2 (process emissions from CaCO3 decomposition are unavoidable). CCUS retrofits involve amine scrubbing or oxy-fuel systems. Amine plants use toxic MEA/MDEA solvents, add 40% parasitic energy load, and create new corrosion/fire risks from hot amine degradation products.',
        implications: ['Amine degradation creating corrosive/toxic byproducts', 'High-pressure CO2 pipeline and storage risks', '40% energy penalty increasing operating costs', 'Massive capex (₹1,500-3,000 Cr per plant) with uncertain returns', 'Insurance coverage gaps for novel CCUS equipment']
      },
      {
        id: 'kiln-er-3',
        title: 'Extreme Heat Impact on Kiln Operations',
        category: 'climate',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'Ambient temperatures >48°C (increasingly common in cement belt — Rajasthan, MP, AP) reduce kiln cooling efficiency, increase clinker cooler exit temperature, and stress electrical equipment. Cooling water availability drops in summer. Worker heat stress reduces maintenance quality during peak months.',
        implications: ['Reduced kiln throughput 5-10% during peak summer', 'Electrical equipment failures from inadequate cooling', 'Cooling water scarcity affecting operations', 'Worker productivity loss and heat stroke incidents', 'Increased specific energy consumption']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'kiln-ni-1',
        title: 'Mining Lease & Limestone Reserve Exhaustion',
        category: 'Regulatory / Resource',
        description: 'Cement plants are built near limestone deposits with 30-50 year mine plans. MMDR Act amendments, NGT orders, or community opposition can restrict mining. Several plants face reserve exhaustion within 10-15 years with no replacement lease. A plant without limestone is a stranded asset worth zero.',
        mitigation: 'Diversified limestone sourcing (multiple leases), clinker grinding units near markets (separate from mining), blended cement increasing fly ash/slag content to reduce clinker factor, geological exploration for reserve extension',
        exposure: '₹2,000-8,000 Cr per plant (complete stranded asset scenario)'
      },
      {
        id: 'kiln-ni-2',
        title: 'Cement Demand Cyclicality & Price Wars',
        category: 'Market',
        description: 'Indian cement industry has 30-35% overcapacity. Regional price wars (especially South India) collapse margins from ₹1,000/tonne to ₹200/tonne within months. Infrastructure spending cycles create boom-bust patterns. New capacity additions by large groups (Adani 140 MTPA target) could worsen overcapacity.',
        mitigation: 'Geographic diversification, premium product mix (RMC, white cement), cost leadership through operational efficiency, long-term supply contracts with infra projects',
        exposure: '₹500-2,000 Cr/year per company (margin compression scenario)'
      },
      {
        id: 'kiln-ni-3',
        title: 'Air Quality Regulations & Plant Closure Threat',
        category: 'Regulatory / Environmental',
        description: 'CPCB emission norms for PM (<30 mg/Nm³), SO2 (<100 mg/Nm³), and NOx (<600 mg/Nm³) are tightening. Non-compliant plants face closure orders from NGT/SPCB. The 2024 GRAP restrictions in NCR forced temporary shutdowns of 5 cement plants. Future CO2 emission standards will add compliance burden.',
        mitigation: 'Proactive investment in emission control (ESP upgrade, SCR/SNCR for NOx, wet scrubber for SO2), continuous emission monitoring (CEMS) with CPCB linkage, green cement certifications',
        exposure: '₹200-500 Cr per plant (compliance capex) + production loss from closure orders'
      }
    ],
    bestPractices: [
      {
        id: 'kiln-bp-1',
        title: 'Kiln Shell Condition Monitoring',
        standard: 'FLSmidth/ThyssenKrupp Best Practice + ISO 13374',
        description: 'Continuous monitoring of kiln shell temperature and deformation to prevent refractory failure and shell damage — the highest-value preventable loss in cement.',
        recommendations: [
          'Infrared shell scanner covering full kiln length with real-time color-coded display',
          'Shell ovality measurement at each tyre station during every maintenance stop',
          'Tyre creep gap monitoring — alarm at 10mm, action at 15mm, stop at 20mm',
          'Refractory lining thickness measurement (mechanical probe) at every shutdown',
          'Kiln alignment survey annually by OEM-certified specialist',
          'Campaign life tracking per zone with predictive replacement scheduling'
        ],
        benchmark: 'Holcim (now Heidelberg Materials) achieves 95%+ kiln availability through predictive shell monitoring and planned refractory replacement — zero unplanned refractory failures in best-practice plants.'
      },
      {
        id: 'kiln-bp-2',
        title: 'Coal Mill Fire & Explosion Prevention',
        standard: 'NFPA 652 + ATEX Directive 2014/34/EU + VDI 2263',
        description: 'Prevention of coal dust explosions in grinding, storage, and firing systems — a recurring loss cause in cement plants globally.',
        recommendations: [
          'Mill outlet gas temperature control: alarm at 75°C, trip at 80°C',
          'O2 monitoring in mill circuit: maintained <12% through hot gas inerting',
          'CO monitoring for early detection of smouldering: alarm at 100 ppm',
          'Explosion vents on mill body, classifier, cyclone, and bag filter',
          'Automatic inerting (CO2 or N2) injection on high temperature or CO alarm',
          'Coal silo temperature monitoring with automatic water spray',
          'No hot work within 15m of coal system without gas-free certification'
        ],
        benchmark: 'LafargeHolcim global standard: zero coal mill explosions target achieved at 85% of plants through full ATEX compliance and inerting systems.'
      },
      {
        id: 'kiln-bp-3',
        title: 'Girth Gear & Main Drive Condition Monitoring',
        standard: 'AGMA 6014-A06 + ISO 18436 (Vibration Monitoring)',
        description: 'The kiln girth gear is the single highest-value mechanical component (₹15-25 Cr, 8-12 month lead time). Its failure shuts the entire production line for 4-8 months.',
        recommendations: [
          'Quarterly gear tooth inspection using endoscope through inspection ports',
          'Vibration monitoring on pinion bearings: alarm at 4 mm/s, trip at 8 mm/s',
          'Oil analysis monthly: particle count, ferrography, wear metal trending',
          'Gear tooth contact pattern check at every major shutdown',
          'Magnetic particle inspection of gear tooth roots annually',
          'Gear backlash measurement quarterly — trending for wear rate',
          'Contingency plan for auxiliary drive operation (reduced capacity) if main drive fails'
        ],
        benchmark: 'HeidelbergCement targets 25+ year girth gear life through precision alignment, proper lubrication, and quarterly NDE — their replacement rate is <2% per year vs industry average of 5%.'
      }
    ]
  },
  {
    id: 'grinding',
    label: 'Grinding & Milling',
    icon: '⚙️',
    color: '#005B75',
    bannerImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    bannerTitle: 'Grinding & Milling Operations',
    bannerSubtitle: 'Raw mill, cement mill, and coal mill — high-energy grinding with explosion, fire, and machinery breakdown risks.',
    aogPerils: [
      {
        id: 'grind-aog-1',
        title: 'Earthquake — Mill Foundation & Structural Damage',
        severity: 'high',
        description: 'Vertical Roller Mills (VRM) and ball mills weigh 500-2,000 tonnes on precision-aligned foundations. Seismic forces cause foundation cracking, mill body tilting, and separator structure damage. VRM grinding tables (5-6m diameter, 200+ tonnes) are particularly sensitive to foundation settlement.',
        impactAreas: ['Foundation Cracking', 'Mill Body Tilting', 'Separator Structural Damage', 'Gearbox Misalignment', 'Feed System Disruption'],
        typicalClaim: '₹30–120 Cr + 2-4 months BI'
      },
      {
        id: 'grind-aog-2',
        title: 'Flood — Motor Pit & Cable Vault Inundation',
        severity: 'medium',
        description: 'Large mill motors (3,000-7,000 kW) are installed in below-grade pits. Monsoon flooding inundates motor pits and cable vaults, destroying HT motors and drive systems. Motor rewinding/replacement takes 3-6 months for large cement mill drives.',
        impactAreas: ['Main Mill Motor Submersion', 'Cable Vault Short Circuit', 'Gearbox Oil Contamination', 'Control Panel Damage', 'Foundation Washout'],
        typicalClaim: '₹20–80 Cr + 2-4 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'grind-naog-1',
        title: 'VRM Gearbox Failure (Planetary Gearbox)',
        severity: 'critical',
        description: 'Vertical Roller Mill planetary gearboxes (MAAG, Flender, SEW) are among the most expensive single components in cement — ₹10-20 Cr each with 10-14 month lead time. They transmit 3,000-7,000 kW to the grinding table. Planetary gear tooth failure, bearing seizure, or oil supply interruption destroys the entire gearbox internals within seconds.',
        impactAreas: ['Complete Gearbox Destruction', 'Grinding Table Damage', 'Oil Spill & Fire Risk', 'Extended Shutdown (10-14 months)', 'Production Line Loss'],
        typicalClaim: '₹50–200 Cr + 10-14 months BI'
      },
      {
        id: 'grind-naog-2',
        title: 'Ball Mill Diaphragm / Liner Failure',
        severity: 'high',
        description: 'Ball mills use cast alloy liners and inter-compartment diaphragms operating under extreme impact and abrasion. Liner bolt failure allows liner plates to fall into the grinding media, causing catastrophic chain reaction damage. Diaphragm slot blockage leads to mill overloading and trunnion bearing failure.',
        impactAreas: ['Liner Plate Detachment', 'Diaphragm Collapse', 'Grinding Media Contamination', 'Trunnion Bearing Overload', 'Mill Shell Damage'],
        typicalClaim: '₹10–50 Cr + 1-2 months BI'
      },
      {
        id: 'grind-naog-3',
        title: 'Cement Mill Fire — Overheating & Gypsum Dehydration',
        severity: 'medium',
        description: 'Cement grinding generates heat (mill exit temperature 100-120°C). Excessive temperature dehydrates gypsum (CaSO4·2H2O → CaSO4·½H2O) causing false set. More critically, accumulated cement dust in mill auxiliaries (separator, bag filter, conveying systems) can smoulder and ignite, especially during shutdown/startup when airflow patterns change.',
        impactAreas: ['Bag Filter Fire', 'Separator Fire', 'Conveying System Ignition', 'Product Quality Loss (False Set)', 'Environmental Emission Event'],
        typicalClaim: '₹5–30 Cr + 2-4 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'VRM Gearbox Failure', prob: 1, impact: 3, score: 3, emv: '₹125 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP with 18-month indemnity; oil analysis program + vibration monitoring', owner: 'Plant Head', trigger: 'Oil particle count >18/16/13 or vibration >5 mm/s' },
      { risk: 'Ball Mill Liner Failure', prob: 3, impact: 1, score: 3, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.flsmidth.com', strategyTooltip: 'Regular liner bolt torque checks + thickness measurement + scheduled replacement', owner: 'Mechanical Head', trigger: 'Liner thickness <50% or bolt torque loss detected' },
      { risk: 'Coal Mill Explosion', prob: 2, impact: 2, score: 4, emv: '₹50 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Inerting + temperature/O2/CO monitoring + explosion vents', owner: 'Process Head', trigger: 'Mill outlet temp >80°C or O2 >12%' },
      { risk: 'Mill Motor Failure', prob: 2, impact: 2, score: 4, emv: '₹50 Cr', strategy: 'Transfer', strategyUrl: 'https://www.agcs.allianz.com', strategyTooltip: 'MB cover + spare motor strategy (rewound standby)', owner: 'Electrical Head', trigger: 'Insulation resistance <5 MΩ or bearing temp >90°C' },
    ],
    caseStudy: {
      title: 'ACC Wadi — VRM Gearbox Catastrophic Failure',
      location: 'ACC Limited, Wadi Works, Karnataka',
      date: 'January 2023',
      loss: '₹140 Cr (gearbox + BI)',
      rootCause: 'The MAAG planetary gearbox on the raw mill VRM suffered a sun gear bearing failure. The bearing cage disintegrated, releasing fragments into the gear mesh. Within 30 seconds, all three planetary gear stages were destroyed. Oil analysis from 2 months prior had shown elevated iron particles (180 ppm vs 50 ppm limit) but the trend was attributed to normal break-in after a recent oil change. The actual cause was early-stage bearing spalling that was misdiagnosed.',
      impact: 'Complete raw mill shutdown for 11 months while replacement gearbox was manufactured in Germany. Plant operated on purchased clinker for cement grinding (70% capacity, reduced margin). Total BI loss: ₹105 Cr. Gearbox replacement cost: ₹18 Cr. Installation and commissioning: ₹12 Cr. ACC subsequently ordered spare gearboxes for all VRM installations.',
      lessons: [
        'Oil analysis trending requires comparison with multiple baselines — not just single limits',
        'Elevated wear metals after oil change should trigger root-cause investigation, not dismissal',
        'Vibration monitoring on gearbox output shaft can detect bearing defects 3-6 months earlier',
        'Spare gearbox strategy essential for all single-VRM plants (own or consortium)',
        'MLOP indemnity period must cover actual gearbox lead time (12-14 months minimum)'
      ],
      benchmark: 'HeidelbergCement maintains a regional spare gearbox pool (1 spare per 5 mills) with guaranteed 45-day swap time. Maximum unplanned VRM outage: 60 days vs this incident\'s 11 months.'
    },
    emergingRisks: [
      {
        id: 'grind-er-1',
        title: 'High-Pressure Grinding Rolls (HPGR) Adoption Risks',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'HPGR/roller press technology for cement grinding offers 30-40% energy savings but introduces new failure modes: stud wear, bearing seizure, and hydraulic system failures. The equipment operates at 50-100 bar hydraulic pressure with massive stored energy.',
        implications: ['Hydraulic accumulator explosion risk', 'Stud breakage causing surface damage', 'Bearing failure with long lead time (6-8 months)', 'Side wall wear — expensive replacement', 'Limited repair expertise in India']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'grind-ni-1',
        title: 'Energy Cost Volatility (Power & Fuel)',
        category: 'Operational / Cost',
        description: 'Cement grinding consumes 60-70% of total plant electricity. Power costs represent 25-30% of manufacturing cost. Open access/captive power policies change frequently by state. Petcoke (primary kiln fuel) prices swing ₹5,000-15,000/tonne based on global refinery dynamics and import duties.',
        mitigation: 'Captive solar/wind (50-100 MW per large plant), WHRS on kilns (8-12 MW per line), long-term fuel supply contracts, fuel flexibility (coal/petcoke/AFR blending), energy efficiency investments (VRM conversion)',
        exposure: '₹200-500 Cr/year margin impact per company from energy cost swings'
      }
    ],
    bestPractices: [
      {
        id: 'grind-bp-1',
        title: 'VRM Gearbox Health Management',
        standard: 'MAAG/Flender OEM Guidelines + ISO 18436 + AGMA 9005',
        description: 'Protecting the single most expensive and longest-lead-time component in cement grinding operations.',
        recommendations: [
          'Online oil condition monitoring: particle count, moisture, viscosity, wear metals',
          'Vibration monitoring on all accessible bearings — baseline + monthly trending',
          'Quarterly oil sample for laboratory analysis with ferrographic examination',
          'Annual borescope inspection of gear tooth surfaces',
          'Oil temperature monitoring with high alarm at 65°C and trip at 75°C',
          'Spare gearbox strategy: own spare or consortium with <60-day swap agreement',
          'Gearbox oil flush and refill at OEM-specified intervals (max 18 months)'
        ],
        benchmark: 'Ambuja Cements (Holcim India) achieved zero unplanned VRM gearbox failures across 12 mills over 8 years through comprehensive online monitoring and proactive bearing replacement.'
      }
    ]
  },
  {
    id: 'material-handling',
    label: 'Material Handling',
    icon: '🚛',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1589792923962-537704632910?w=1200&q=80',
    bannerTitle: 'Material Handling & Storage',
    bannerSubtitle: 'Limestone crushing, conveying, stacking, and cement storage — dust explosion, silo collapse, and conveyor fire risks.',
    aogPerils: [
      {
        id: 'mh-aog-1',
        title: 'Monsoon Flooding — Crusher & Conveyor Belt Damage',
        severity: 'high',
        description: 'Limestone crushers are typically located at the quarry base where rainwater collects. Flash flooding during monsoon submerges crushers (₹20-50 Cr each), conveyor drives, and electrical installations. Belt conveyors crossing rivers/streams get washed away. The 2021 Shree Cement Beawar flooding destroyed 2 km of overland conveyor.',
        impactAreas: ['Crusher Submersion', 'Conveyor Belt Washout', 'Electrical Drive Damage', 'Quarry Access Road Destruction', 'Ore Stockpile Contamination'],
        typicalClaim: '₹20–100 Cr + 2-4 months BI'
      },
      {
        id: 'mh-aog-2',
        title: 'Landslide — Quarry Face Collapse',
        severity: 'critical',
        description: 'Limestone quarries with vertical faces 50-100m high are vulnerable to bench collapse, particularly during monsoon saturation. Overburden slides bury equipment and personnel. Quarry wall collapse can block access roads for weeks. The 2020 ACC Kymore quarry wall failure buried a shovel loader and blocked production for 25 days.',
        impactAreas: ['Equipment Burial', 'Personnel Fatality Risk', 'Access Road Blockage', 'Quarry Wall Stabilization Cost', 'Regulatory Mine Closure'],
        typicalClaim: '₹15–80 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'mh-naog-1',
        title: 'Cement Silo Structural Failure / Collapse',
        severity: 'critical',
        description: 'Cement storage silos (5,000-20,000 tonnes, 25-40m height) experience internal pressure from material flow, thermal expansion, and moisture-induced bridging. Asymmetric discharge creates unbalanced lateral forces. Foundation settlement causes tilting. Multiple silo collapses globally have resulted from design defects, overloading, or corrosion of embedded steel reinforcement.',
        impactAreas: ['Complete Silo Collapse', 'Adjacent Structure Damage', 'Environmental Contamination', 'Personnel Fatalities', 'Loss of Finished Product Inventory'],
        typicalClaim: '₹30–150 Cr + 3-6 months BI'
      },
      {
        id: 'mh-naog-2',
        title: 'Conveyor Belt Fire — Friction & Hot Material',
        severity: 'high',
        description: 'Long overland conveyors (5-15 km from quarry to plant) use rubber belts susceptible to friction fires at drive/tail pulleys. Seized idler rollers, belt slip on wet conditions, or hot clinker transfer ignite standard belts. Fire propagates at 10-15 m/min. Enclosed conveyor galleries accelerate fire spread.',
        impactAreas: ['Complete Belt Destruction', 'Gallery Structure Damage', 'Production Line Isolation', 'Forest/Vegetation Fire', 'Extended Procurement Lead Time'],
        typicalClaim: '₹20–80 Cr + 2-6 months BI'
      },
      {
        id: 'mh-naog-3',
        title: 'Dust Explosion — Enclosed Transfer Points',
        severity: 'high',
        description: 'Cement dust in enclosed spaces (transfer towers, bucket elevators, silos) at concentration 40-60 g/m³ is explosive. Ignition sources include hot bearings, welding, static discharge, and lightning. Primary explosion in elevator boot dislodges accumulated dust creating devastating secondary explosions propagating through connected equipment.',
        impactAreas: ['Bucket Elevator Explosion', 'Transfer Tower Destruction', 'Silo Top Damage', 'Connected Equipment Blast', 'Multiple Personnel Injuries'],
        typicalClaim: '₹15–60 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Silo Structural Failure', prob: 1, impact: 3, score: 3, emv: '₹90 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.concrete.org/store', strategyTooltip: 'Structural health monitoring + annual inspection + flow pattern optimization', owner: 'Civil Head', trigger: 'Wall crack >2mm or tilt >L/500' },
      { risk: 'Conveyor Belt Fire', prob: 2, impact: 2, score: 4, emv: '₹50 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.iso.org/standard/44942.html', strategyTooltip: 'Fire-resistant belting + thermal monitors at drives + suppression at galleries', owner: 'Mechanical Head', trigger: 'Belt surface temp >100°C at any point' },
      { risk: 'Quarry Landslide', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Avoid', strategyUrl: 'https://www.isrmtt.com', strategyTooltip: 'Geotechnical stability analysis + bench height limits + monsoon protocols', owner: 'Quarry Manager', trigger: 'Crack monitoring displacement >3mm/day' },
      { risk: 'Dust Explosion', prob: 2, impact: 2, score: 4, emv: '₹38 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-652', strategyTooltip: 'Dust hazard analysis + explosion vents + housekeeping + grounding', owner: 'Safety Head', trigger: 'Dust accumulation >1mm on surfaces in enclosed areas' },
    ],
    caseStudy: {
      title: 'Shree Cement Beawar — Overland Conveyor Flood Destruction',
      location: 'Shree Cement, Beawar, Rajasthan',
      date: 'August 2021',
      loss: '₹75 Cr (conveyor + BI)',
      rootCause: 'Unseasonal heavy rainfall (180mm in 6 hours vs annual average 500mm) caused flash flooding in the normally dry nallah (stream) that the 12 km overland limestone conveyor crossed at 3 points. Two stream crossings had inadequate clearance (designed for 1-in-25-year flood). The flood waters washed away 2.2 km of conveyor structure, belt, and associated electrical installations. The quarry was completely cut off from the plant for 18 days until temporary road access was established.',
      impact: 'Kiln shutdown for 45 days (limestone starvation). Physical damage: ₹35 Cr (belt, structure, drives, cables). BI loss: ₹40 Cr (45 days × ₹90 Lakh/day). Temporary limestone transport by road: ₹8 Cr. Shree Cement subsequently elevated all stream crossings to 1-in-100-year flood level and installed flood sensors upstream.',
      lessons: [
        'Conveyor stream crossings must be designed for 1-in-100-year flood (not 1-in-25)',
        'Upstream flood level sensors with automated conveyor shutdown before waters reach',
        'Fire-resistant AND water-resistant belt specification for crossings',
        'Maintain 7-day limestone buffer stock at plant to survive quarry access disruption',
        'Climate change increasing extreme rainfall events — historical data insufficient for design'
      ],
      benchmark: 'LafargeHolcim designs all conveyor crossings to 1-in-200-year flood levels with automated stop systems triggered by upstream sensors — their exposure to flood damage has reduced 90% in 10 years.'
    },
    emergingRisks: [
      {
        id: 'mh-er-1',
        title: 'Autonomous Mining Equipment — New Failure Modes',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2030',
        description: 'Autonomous dump trucks, drillers, and loaders being deployed in cement quarries reduce personnel risk but create new equipment interaction risks. GPS/communication failures can cause collisions, autonomous vehicles may not detect slope instability, and software errors in path planning create novel accident scenarios.',
        implications: ['Vehicle-to-vehicle collision (no human override)', 'Software malfunction causing quarry wall breach', 'Communication loss causing vehicle runaway', 'Liability ambiguity between OEM and operator', 'Insurance product gap for autonomous fleet']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'mh-ni-1',
        title: 'Sand Mining Ban / Aggregate Shortage',
        category: 'Regulatory',
        description: 'NGT orders banning illegal sand mining affect RMC (Ready-Mix Concrete) operations and construction demand for cement. State-level sand availability directly correlates with cement dispatch volumes. Manufactured sand (M-sand) adoption is partial.',
        mitigation: 'Promote M-sand adoption, develop captive manufactured sand facilities, diversify product portfolio (ready-mix, dry mix, precast)',
        exposure: '₹300-800 Cr/year demand impact in affected regions'
      }
    ],
    bestPractices: [
      {
        id: 'mh-bp-1',
        title: 'Silo Structural Health Monitoring',
        standard: 'ACI 313 (Elevated Slabs/Silos) + IS 4995 + Eurocode 1991-4',
        description: 'Preventing catastrophic silo failure through proactive structural monitoring and flow pattern management.',
        recommendations: [
          'Annual visual inspection of internal walls (rope access or drone)',
          'Crack monitoring (surface-mounted gauges) on all visible external cracks',
          'Tilt monitoring using precision survey markers — maximum L/1000',
          'Temperature monitoring of silo walls for thermal gradient assessment',
          'Flow pattern validation — ensure mass flow, prevent rat-holing or arching',
          'Carbonation depth testing of concrete at 5-year intervals',
          'Rebar corrosion potential assessment using half-cell method'
        ],
        benchmark: 'Ambuja/ACC (Holcim India) conducts drone-based internal silo inspection annually with AI crack detection — 100% coverage vs previous 10% sampling by rope access.'
      }
    ]
  },
  {
    id: 'electrical',
    label: 'Electrical & Power',
    icon: '⚡',
    color: '#4CAF50',
    bannerImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
    bannerTitle: 'Electrical Systems & Power Supply',
    bannerSubtitle: 'HT/LT distribution, transformers, WHR systems, and captive power — high energy density with fire and explosion risks.',
    aogPerils: [
      {
        id: 'elec-aog-1',
        title: 'Lightning — Transformer & Switchgear Damage',
        severity: 'high',
        description: 'Cement plants in elevated/exposed locations with extensive overhead lines are highly vulnerable to lightning. Direct strikes on transformers cause bushing flashover, oil fire, and winding damage. Induced surges propagate through MV/LV systems destroying VFDs, soft starters, and control electronics across multiple MCCs simultaneously.',
        impactAreas: ['Transformer Explosion/Fire', 'Multiple VFD Failure', 'Switchgear Damage', 'Protection Relay Malfunction', 'Simultaneous Multi-Motor Trip'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'elec-naog-1',
        title: 'Main Power Transformer Failure',
        severity: 'critical',
        description: 'Cement plants rely on 1-3 main power transformers (20-50 MVA each) for entire plant supply. Internal winding faults cause oil-filled transformer explosion with burning oil spray. Replacement lead time: 8-12 months for custom-wound units. Loss of main transformer shuts entire cement line.',
        impactAreas: ['Complete Plant Shutdown', 'Oil Fire & Explosion', 'Adjacent Switchgear Damage', 'Environmental Oil Spill', 'Extended Downtime (8-12 months)'],
        typicalClaim: '₹40–200 Cr + 8-12 months BI'
      },
      {
        id: 'elec-naog-2',
        title: 'Cable Gallery / Tunnel Fire',
        severity: 'high',
        description: 'Cable galleries carrying HT/LT power and control cables across the plant are vulnerable to fire. A single cable fault (insulation breakdown) ignites adjacent cables with flame propagation along the gallery. Fire stops and compartmentalization are often inadequate. Loss of cable gallery can shut multiple production systems simultaneously.',
        impactAreas: ['Multi-system Power Loss', 'Control System Isolation', 'Fire Propagation to Process Areas', 'Toxic Fume Generation', 'Extended Recabling (3-6 months)'],
        typicalClaim: '₹20–80 Cr + 2-4 months BI'
      },
      {
        id: 'elec-naog-3',
        title: 'WHRS (Waste Heat Recovery) Turbine Failure',
        severity: 'medium',
        description: 'WHRS turbines (5-15 MW) recovering heat from preheater/cooler exhaust operate in dusty, high-temperature environments. Blade erosion from carryover dust, bearing failures, and generator winding faults are common. Turbine failure loses 20-30% of plant power supply, increasing grid electricity costs significantly.',
        impactAreas: ['Turbine Blade Damage', 'Generator Winding Failure', 'Bearing Seizure', 'Power Cost Increase (₹2-4 Cr/month)', 'Steam/ORC System Damage'],
        typicalClaim: '₹10–50 Cr + 3-6 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Main Transformer Failure', prob: 1, impact: 3, score: 3, emv: '₹120 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP; online DGA monitoring; spare transformer or guaranteed delivery contract', owner: 'Electrical Head', trigger: 'DGA acetylene >50 ppm or TDCG rising trend' },
      { risk: 'Cable Gallery Fire', prob: 2, impact: 2, score: 4, emv: '₹50 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Fire-resistant cables + fire stops + VESDA detection + clean agent suppression', owner: 'Electrical Head', trigger: 'VESDA alert in any cable gallery section' },
      { risk: 'Lightning Damage', prob: 3, impact: 1, score: 3, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ieee.org', strategyTooltip: 'Lightning protection system + surge arrestors + SPDs on all sensitive electronics', owner: 'Electrical Head', trigger: 'Thunderstorm warning from IMD' },
      { risk: 'WHRS Turbine Failure', prob: 2, impact: 1, score: 2, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ge.com/steam-power', strategyTooltip: 'Vibration monitoring + blade inspection + bearing oil analysis', owner: 'WHRS Manager', trigger: 'Vibration >4 mm/s or blade clearance reducing' },
    ],
    caseStudy: {
      title: 'Dalmia Cement — Multi-Transformer Lightning Strike',
      location: 'Dalmia Cement (Bharat), Dalmiapuram, Tamil Nadu',
      date: 'October 2022',
      loss: '₹55 Cr (equipment + BI)',
      rootCause: 'A severe thunderstorm with multiple ground strikes hit the plant during monsoon. Three simultaneous lightning strikes damaged: (1) 40 MVA main power transformer — bushing flashover leading to winding fault, (2) 33 kV GIS switchgear — insulation breakdown, (3) Multiple VFDs across cement mill and packing plant circuits from induced surges. The lightning protection system was last tested 4 years prior (should be annual) and 3 down-conductors had corroded connections with >10Ω resistance (limit: 2Ω).',
      impact: 'Complete plant shutdown for 22 days. Transformer required 3 months for repair (winding damage was partial — full replacement would have been 10 months). Switchgear replacement: 6 weeks. VFDs replaced from stock: 5 days. BI loss: ₹35 Cr. Equipment: ₹20 Cr. Post-event: Dalmia invested ₹8 Cr in comprehensive lightning protection upgrade across all plants.',
      lessons: [
        'Lightning protection system testing mandatory annually — earth resistance <2Ω per down-conductor',
        'Surge protection devices (SPDs) required on ALL VFD and control circuit inputs, not just main panels',
        'Online DGA for all main transformers >20 MVA — early fault detection before catastrophic failure',
        'Redundant power supply path (ring main) so single transformer loss doesn\'t stop entire plant',
        'Lightning risk assessment specific to plant location — elevation and exposure factor'
      ],
      benchmark: 'Holcim plants in lightning-prone regions (Africa, India) install advance lightning warning systems (field mill technology) providing 15-minute warning for proactive equipment isolation — reducing lightning damage claims by 80%.'
    },
    emergingRisks: [
      {
        id: 'elec-er-1',
        title: 'Grid Instability from Renewable Integration',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'As grid renewable penetration increases, power quality issues (voltage fluctuation, frequency deviation, harmonics) affect cement plant equipment. Sudden renewable ramp-downs cause voltage dips tripping kiln and mill drives. State DISCOMs impose Reactive Energy Charges for poor power factor during solar intermittency.',
        implications: ['Increased equipment trips from voltage dips', 'Motor insulation stress from harmonics', 'Power factor penalty charges', 'VFD malfunction from distorted waveforms', 'Need for power conditioning equipment investment']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'elec-ni-1',
        title: 'State DISCOM Policy Changes (Open Access/Captive)',
        category: 'Regulatory',
        description: 'Cement plants rely on open access power purchase or captive power to manage 25-30% electricity cost share. State regulatory commissions can change cross-subsidy surcharge, additional surcharge, banking rules, or wheeling charges with retrospective effect. Such changes have made captive solar projects unviable in some states.',
        mitigation: 'Behind-the-meter solar/WHRS (no policy risk), battery storage for peak management, multi-state operations to diversify regulatory exposure, industry body lobbying',
        exposure: '₹100-300 Cr/year additional cost per company from adverse policy changes'
      }
    ],
    bestPractices: [
      {
        id: 'elec-bp-1',
        title: 'Transformer Health Management Program',
        standard: 'IEC 60599 + IEEE C57.104 + IS 10028',
        description: 'Comprehensive program for managing the highest-value electrical assets in cement plants — main power transformers and kiln/mill drive transformers.',
        recommendations: [
          'Online DGA monitoring for all transformers >20 MVA',
          'Quarterly oil sampling for moisture, acidity, BDV, and interfacial tension',
          'Annual Frequency Response Analysis (FRA) to detect winding displacement',
          'Thermal imaging of bushings, cable boxes, and cooling systems monthly',
          'Buchholz relay testing and operation verification quarterly',
          'Lightning protection system testing annually with resistance measurement',
          'Spare transformer strategy: own spare for single-feed plants or guaranteed 6-month delivery'
        ],
        benchmark: 'UltraTech Cement achieves >30 year average transformer life through online monitoring — their unplanned transformer failure rate is 0.5% vs industry average of 3%.'
      }
    ]
  },
  {
    id: 'environmental',
    label: 'Environmental',
    icon: '🌿',
    color: '#9C27B0',
    bannerImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80',
    bannerTitle: 'Environmental & Sustainability Risks',
    bannerSubtitle: 'Emissions, water, waste, biodiversity — regulatory compliance, community relations, and climate transition risks.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'env-naog-1',
        title: 'ESP/Baghouse Failure — Uncontrolled Emission Event',
        severity: 'high',
        description: 'Electrostatic Precipitators (ESPs) and baghouses capture 99%+ of particulate matter. Failure modes include: rapper system malfunction (ESP), bag rupture cascade (baghouse), hopper blockage, or TR set failure. Uncontrolled emissions visible as dust plume trigger immediate regulatory response — SPCB can order plant shutdown within hours of a visible emission event.',
        impactAreas: ['Regulatory Shutdown Order', 'CPCB/SPCB Penalty', 'Community Complaints', 'Environmental Damage', 'Reputation/ESG Impact'],
        typicalClaim: '₹5–30 Cr + 1-4 weeks BI (regulatory shutdown)'
      },
      {
        id: 'env-naog-2',
        title: 'Groundwater Contamination from Waste Storage',
        severity: 'medium',
        description: 'Cement plants using alternative fuels (hazardous waste, used oil, chemical sludge) must store these materials in lined containment. Liner failure or overflow during monsoon causes groundwater contamination. Discovery triggers NGT proceedings, community agitation, and potentially permanent storage permission revocation.',
        impactAreas: ['NGT/Court Proceedings', 'Groundwater Remediation Cost', 'Alternative Fuel Permission Revocation', 'Community Opposition', 'Land Value Depreciation'],
        typicalClaim: '₹10–50 Cr (remediation + legal + production impact)'
      }
    ],
    riskMatrix: [
      { risk: 'ESP/Baghouse Failure', prob: 3, impact: 1, score: 3, emv: '₹18 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.cpcb.nic.in', strategyTooltip: 'Redundant TR sets + bag leak detection + CEMS with auto-alarm', owner: 'Environment Head', trigger: 'Stack emission >30 mg/Nm³ for >30 minutes' },
      { risk: 'Regulatory Shutdown (Emissions)', prob: 2, impact: 2, score: 4, emv: '₹40 Cr', strategy: 'Avoid', strategyUrl: 'https://www.moef.gov.in', strategyTooltip: 'CEMS real-time compliance + proactive SPCB engagement + buffer capacity in ESP', owner: 'Plant Head', trigger: 'Any CEMS exceedance notification to CPCB' },
      { risk: 'Groundwater Contamination', prob: 1, impact: 3, score: 3, emv: '₹30 Cr', strategy: 'Avoid', strategyUrl: 'https://greentribunal.gov.in', strategyTooltip: 'Double-lined containment + groundwater monitoring wells + spill prevention', owner: 'Environment Head', trigger: 'Any parameter exceeding BIS limits in monitoring wells' },
    ],
    caseStudy: {
      title: 'Ambuja Cement Darlaghat — SPCB Shutdown for Emission Exceedance',
      location: 'Ambuja Cements, Darlaghat, Himachal Pradesh',
      date: 'March 2024',
      loss: '₹28 Cr (BI + penalty + remediation)',
      rootCause: 'CEMS (Continuous Emission Monitoring System) data uploaded to CPCB server showed PM emissions exceeding 30 mg/Nm³ limit for 8 consecutive hours during a kiln upset (cyclone blockage causing bypass of ESP). The real-time data triggered automatic SPCB notice. Plant did not voluntarily report or take corrective action fast enough. SPCB ordered 15-day shutdown for "comprehensive emission audit".',
      impact: 'Production loss: ₹22 Cr (15 days). Penalty: ₹2 Cr. ESP repair and upgrade: ₹4 Cr. Reputation damage in ESG-sensitive market. SPCB imposed enhanced monitoring conditions for 12 months. Insurance claim for BI declined as "regulatory action" is typically excluded.',
      lessons: [
        'CEMS exceedance must trigger immediate corrective action AND voluntary reporting to SPCB',
        'ESP redundancy: maintain spare TR sets and rapper mechanisms for immediate swap',
        'Kiln operating procedure must include ESP health check before increasing feed rate',
        'Self-reporting within 1 hour of exceedance shows good faith — reduces regulatory severity',
        'BI policy must be checked for "regulatory action" exclusion — gap in most standard wordings'
      ],
      benchmark: 'UltraTech plants maintain ESP collection efficiency at 99.8%+ through predictive maintenance and redundant TR sets — zero SPCB shutdowns in 5 years across 23 plants.'
    },
    emergingRisks: [
      {
        id: 'env-er-1',
        title: 'Carbon Tax / ETS Introduction in India',
        category: 'regulatory',
        severity: 'high',
        timeline: '2026-2030',
        description: 'India\'s Bureau of Energy Efficiency developing carbon credit trading mechanism. Cement (0.6-0.8 tCO2/tonne cement) will be early target. At ₹1,000-3,000/tonne CO2, this adds ₹600-2,400 per tonne of cement — transformative cost impact on a product selling at ₹350-450/bag.',
        implications: ['Manufacturing cost increase 15-40% depending on carbon price', 'Competitive advantage shift to blended/green cement producers', 'Stranded asset risk for high-clinker-factor plants', 'Massive capex for CCUS, hydrogen calcination, or electrification', 'Need for Scope 1+2+3 measurement and reporting infrastructure']
      },
      {
        id: 'env-er-2',
        title: 'Biodiversity & Mining Impact Regulations Tightening',
        category: 'regulatory',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Forest clearance for limestone mining becoming increasingly difficult with mandatory biodiversity impact assessment, wildlife corridor protection, and compensatory afforestation at 2:1 ratio. ESG investors scrutinizing cement companies\' biodiversity commitments. Loss of mining permission is existential for integrated plants.',
        implications: ['Mining expansion delays of 2-5 years', 'Compensatory afforestation cost doubling', 'Community consent requirement becoming more rigorous', 'ESG rating downgrade affecting cost of capital', 'Potential forced closure of quarries near wildlife corridors']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'env-ni-1',
        title: 'Water Scarcity & Allocation Conflicts',
        category: 'Resource / Community',
        description: 'Cement plants consume 80-120 liters/tonne of cement. Many plants in water-stressed regions (Rajasthan, Karnataka, AP) face community opposition and regulatory restrictions on groundwater extraction. CGWA (Central Ground Water Authority) can revoke NOC for excessive extraction. Summer water conflicts between agriculture and industry are intensifying.',
        mitigation: 'Rainwater harvesting achieving 3-5x consumption, zero liquid discharge, treated sewage water reuse, water-efficient technologies (air cooling vs water cooling), community watershed development programs',
        exposure: '₹100-500 Cr per plant (production curtailment + compliance investment)'
      }
    ],
    bestPractices: [
      {
        id: 'env-bp-1',
        title: 'Continuous Emission Monitoring & Compliance Management',
        standard: 'CPCB CEMS Guidelines 2018 + USEPA 40 CFR 60 + EN 14181',
        description: 'Real-time emission monitoring linked to process control — ensuring compliance while maximizing production.',
        recommendations: [
          'CEMS on all stacks per CPCB mandate — PM, SO2, NOx, CO, flow, opacity',
          'Real-time CEMS dashboard accessible to plant manager and environment team',
          'Automatic alarm at 80% of emission limit — preventive action before exceedance',
          'Process interlock: kiln feed reduction if emissions approach 95% of limit',
          'Monthly CEMS calibration with certified reference method (isokinetic sampling)',
          'Annual CEMS performance audit (RATA) by NABL-accredited laboratory',
          'SPCB communication protocol: voluntary reporting within 1 hour of any exceedance'
        ],
        benchmark: 'Dalmia Cement maintains all stacks at <50% of emission limits through proactive ESP maintenance and process optimization — highest ESG rating in Indian cement sector.'
      }
    ]
  }
]
