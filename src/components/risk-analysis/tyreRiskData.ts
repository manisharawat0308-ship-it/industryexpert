// Tyre Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const TYRE_RISK_SOURCES: RiskSource[] = [
  {
    id: 'mixing-prep',
    label: 'Mixing & Preparation',
    icon: '🧪',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
    bannerTitle: 'Rubber Mixing & Component Preparation',
    bannerSubtitle: 'Banbury mixing, calendering, extrusion, and bead winding — high temperatures, combustible dust, and chemical hazards.',
    aogPerils: [
      {
        id: 'mix-aog-1',
        title: 'Earthquake — Banbury Mixer & Calender Misalignment',
        severity: 'high',
        description: 'Banbury mixers (4-14 tonne batch size) and calenders (4-roll, 2,000mm width) require precision alignment. Seismic forces misalign calender rolls, tilt mixer frames, and crack elevated compound cooling conveyors. Calender roll re-grinding and alignment takes 4-6 weeks. Chemical tank farms risk spillage during seismic events.',
        impactAreas: ['Calender Roll Misalignment', 'Mixer Frame Distortion', 'Chemical Tank Spillage', 'Cooling Conveyor Collapse', 'Carbon Black Silo Cracking'],
        typicalClaim: '₹30–150 Cr + 2-4 months BI'
      },
      {
        id: 'mix-aog-2',
        title: 'Flood — Raw Material & Chemical Storage',
        severity: 'high',
        description: 'Tyre plants store 5,000-20,000 tonnes of natural rubber, synthetic rubber, carbon black, and process chemicals. Flooding destroys hygroscopic natural rubber bales (₹150-200/kg), contaminates carbon black (rendering it unusable), and mixes incompatible chemicals creating toxic/reactive hazards. Process oil tanks overflowing into floodwater cause major environmental contamination.',
        impactAreas: ['Natural Rubber Bale Destruction', 'Carbon Black Contamination', 'Chemical Incompatibility Reaction', 'Oil Tank Overflow/Spill', 'Environmental Contamination'],
        typicalClaim: '₹30–150 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'mix-naog-1',
        title: 'Banbury Mixer Fire / Explosion',
        severity: 'critical',
        description: 'Banbury internal mixers operate at 120-180°C with rubber + carbon black + sulphur + accelerators + process oils. Batch over-temperature (>190°C) causes auto-ignition of high-oil compounds. Carbon black dust clouds at discharge are explosive (Kst = 75-150 bar·m/s). The 2019 Apollo Tyres Vadodara mixer fire caused ₹120 Cr damage. Mixer replacement lead time: 6-9 months.',
        impactAreas: ['Mixer Internal Fire', 'Carbon Black Dust Explosion', 'Compound Discharge Fire', 'Adjacent Mill/Calender Damage', 'Compound Storage Cascade Fire'],
        typicalClaim: '₹40–200 Cr + 3-9 months BI'
      },
      {
        id: 'mix-naog-2',
        title: 'Calender Line Fire — Rubber Sheet/Cord Fabric',
        severity: 'high',
        description: 'Calenders produce rubber-coated cord fabric at 80-120°C. Accumulated rubber particles on heated rolls, friction from misaligned fabric, or bearing failure ignites the rubber sheet. Fire propagates along the continuous rubber web at 5-10 m/min. Calender fires destroy the machine (₹30-60 Cr), fabric inventory, and contaminate the building. Calender replacement: 8-12 months.',
        impactAreas: ['Calender Roll Fire', 'Cord Fabric Destruction', 'Building Contamination', 'Adjacent Line Damage', 'Extended Equipment Lead Time'],
        typicalClaim: '₹30–120 Cr + 6-12 months BI'
      },
      {
        id: 'mix-naog-3',
        title: 'Solvent/Chemical Storage Fire',
        severity: 'high',
        description: 'Tyre plants use naphtha, toluene, hexane as tyre cements/solvents (flash point 0-40°C). Solvent storage areas (5,000-50,000 liters) and cement-mixing rooms are permanently within explosive atmosphere range. Static discharge, electrical fault, or hot work nearby ignites vapors. Solvent fires spread rapidly to adjacent rubber storage areas creating massive conflagrations.',
        impactAreas: ['Solvent Store Explosion', 'Cement Room Flash Fire', 'Adjacent Rubber Storage Ignition', 'Environmental Contamination', 'Multi-Building Spread'],
        typicalClaim: '₹20–100 Cr + 1-4 months BI'
      },
      {
        id: 'mix-naog-4',
        title: 'Extruder Screw/Barrel Failure',
        severity: 'medium',
        description: 'Tread extruders (250-600mm screw diameter) operate at high pressure (100-200 bar) with abrasive rubber compounds. Screw wear, barrel liner failure, or head die blockage causes overpressure and potential rupture. A burst extruder head ejects hot rubber (100-120°C) at high velocity. Extruder screw replacement: 3-6 months from specialized manufacturers (Germany/Japan).',
        impactAreas: ['Extruder Head Rupture', 'Hot Rubber Ejection', 'Screw/Barrel Destruction', 'Die Plate Damage', 'Line Production Loss'],
        typicalClaim: '₹10–50 Cr + 2-6 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Banbury Mixer Fire', prob: 2, impact: 3, score: 6, emv: '₹120 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Batch temperature interlock + CO2 suppression in mixer + carbon black dust extraction', owner: 'Mixing Dept Head', trigger: 'Batch temperature >180°C or CO detector alarm' },
      { risk: 'Calender Fire', prob: 2, impact: 2, score: 4, emv: '₹75 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Roll temperature monitoring + fabric alignment sensors + local suppression', owner: 'Calendering Head', trigger: 'Roll temperature >130°C or fabric misalignment alarm' },
      { risk: 'Solvent Store Explosion', prob: 2, impact: 2, score: 4, emv: '₹60 Cr', strategy: 'Avoid', strategyUrl: 'https://www.hse.gov.uk/comah', strategyTooltip: 'Minimize on-site solvent + ATEX-rated equipment + gas detection + distance separation', owner: 'Safety Head', trigger: 'Solvent vapor detected outside designated area' },
      { risk: 'Extruder Failure', prob: 2, impact: 2, score: 4, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.kraussmaffei.com', strategyTooltip: 'Pressure monitoring + screw wear measurement + barrel inspection at shutdowns', owner: 'Extrusion Head', trigger: 'Screw clearance >design limit or pressure spike' },
      { risk: 'Flood (Raw Material)', prob: 2, impact: 2, score: 4, emv: '₹90 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP + elevated rubber storage + chemical bunding + flood early warning', owner: 'Stores Manager', trigger: 'Heavy rainfall >150mm/24hr or river level warning' },
    ],
    caseStudy: {
      title: 'Apollo Tyres Vadodara — Banbury Mixer Compound Fire',
      location: 'Apollo Tyres, Limda Works, Vadodara, Gujarat',
      date: 'March 2019',
      loss: '₹120 Cr (equipment + BI)',
      rootCause: 'A tread compound batch with high aromatic oil content (45 phr) exceeded 195°C during mixing due to stuck thermocouple providing false low reading. The compound auto-ignited inside the Banbury mixer. When the ram was raised for discharge, the burning compound was exposed to air, intensifying the fire dramatically. Carbon black dust around the mixer discharge ignited creating a secondary flash fire that engulfed the adjacent compound cooling conveyor system and batch-off mill.',
      impact: 'Banbury mixer #3 destroyed (₹25 Cr replacement, 8-month lead time from Kobe Steel). Adjacent batch-off mill and cooling conveyor damaged (₹15 Cr). Building roof damage from heat/smoke (₹10 Cr). 3 workers injured (burns). Production loss of 15% of plant mixing capacity for 9 months. BI loss: ₹70 Cr.',
      lessons: [
        'Triple-redundant temperature measurement in mixer (no reliance on single thermocouple)',
        'Automatic mixer stop and ram drop at compound-specific temperature limit (no override possible)',
        'CO2/nitrogen injection system integrated into mixer chamber for immediate fire suppression',
        'Carbon black dust extraction at mixer discharge maintained at <50 g/m³ at all times',
        'High-oil compounds (>40 phr aromatic oil) to be mixed with reduced fill factor and lower rotor speed'
      ],
      benchmark: 'Bridgestone mandates triple thermocouple redundancy + automatic N2 injection at 175°C + lower rotor speed for high-oil compounds — zero mixer fires in 10 years across 50+ plants globally.'
    },
    emergingRisks: [
      {
        id: 'mix-er-1',
        title: 'Sustainable Materials — Recycled Rubber & Bio-Based Feedstock',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'OEMs and regulators pushing sustainable tyre materials: recycled rubber (devulcanized), bio-based natural rubber alternatives (guayule, dandelion), rice husk silica, and recycled carbon black. Each alternative has different processing characteristics, fire properties, and quality variability — existing mixing parameters and safety systems may not be adequate.',
        implications: ['Different fire/explosion properties of recycled materials', 'Quality variability causing batch rejections', 'New chemical hazards from devulcanization agents', 'Process parameter revalidation required for each new material', 'Product liability if sustainable materials affect tyre performance']
      },
      {
        id: 'mix-er-2',
        title: 'EV-Specific Tyre Compounds — Higher Performance, Higher Risk',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'EV tyres require: higher load capacity (battery weight 300-600 kg), lower rolling resistance (range optimization), higher wear resistance (instant torque), and noise-dampening properties. New silica-rich compounds (80-120 phr silica vs 50-70 for ICE) require different mixing conditions (higher temperature, silane coupling agents) introducing new exothermic reaction risks during mixing.',
        implications: ['Higher mixing temperatures increasing fire risk', 'Silane coupling agent exothermic reactions', 'Bis-coupling agents release alcohol vapors (flammable)', 'New compound testing/qualification investment', 'Performance warranty exposure for EV-specific claims (faster wear from instant torque)']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'mix-ni-1',
        title: 'Natural Rubber Price & Supply Volatility',
        category: 'Commodity / Supply Chain',
        description: 'Natural rubber (30-40% of compound weight) prices swing ₹100-250/kg based on Thai/Indonesian supply, monsoon, and speculative trading. India imports 60%+ of NR. A 50% price spike on a large plant consuming 2,000 tonnes/month = ₹15-25 Cr/month additional cost. No effective hedging instrument available in Indian market for physical delivery.',
        mitigation: 'Long-term estate rubber contracts, synthetic rubber substitution (SBR/BR), inventory hedging during price troughs, OEM price escalation clauses (quarterly), alternative NR sources (Africa, Myanmar)',
        exposure: '₹100-500 Cr/year margin impact per large tyre company from NR price volatility'
      },
      {
        id: 'mix-ni-2',
        title: 'Chinese Tyre Import Dumping & Market Share Loss',
        category: 'Market / Trade',
        description: 'Chinese tyre manufacturers (with state subsidies and excess capacity) export to India at below-cost pricing. Anti-dumping duties provide partial protection but WTO challenges and trade route circumvention (through third countries) limit effectiveness. Chinese truck/bus tyres are 30-40% cheaper, eroding Indian manufacturers\' TBR segment margins.',
        mitigation: 'Brand building and distribution strength (replacement market loyalty), move up-market to UHP/EV-specific segments, backward integration to control costs, industry body advocacy for sustained anti-dumping measures, quality differentiation through technology (run-flat, self-seal)',
        exposure: '₹2,000-5,000 Cr industry-wide revenue at risk (TBR segment displacement)'
      }
    ],
    bestPractices: [
      {
        id: 'mix-bp-1',
        title: 'Banbury Mixer Fire Prevention',
        standard: 'FM Global DS 7-11 + NFPA 654 + Bridgestone Global Standard',
        description: 'Prevention of the most common and costly fire in tyre manufacturing — Banbury mixer auto-ignition.',
        recommendations: [
          'Triple-redundant temperature measurement (thermocouple + IR + thermal fuse)',
          'Compound-specific temperature limit programmed per recipe (no generic limit)',
          'Automatic mixer stop + ram drop at limit temperature (not operator-dependent)',
          'Nitrogen/CO2 injection into mixer chamber on high-temperature alarm',
          'Carbon black dust extraction at discharge: maintained <50 g/m³ concentration',
          'High-oil compounds (>40 phr): reduced fill factor (65% vs 70%) and lower rotor speed',
          'Weekly thermocouple verification against portable probe measurement'
        ],
        benchmark: 'Bridgestone global standard: zero mixer fires in 10 years through triple thermocouples, auto-N2 injection, and recipe-specific limits. Total investment per mixer: ₹50-80 Lakh. Prevented loss: ₹40-200 Cr.'
      }
    ]
  },
  {
    id: 'building-curing',
    label: 'Building & Curing',
    icon: '🏗️',
    color: '#005B75',
    bannerImage: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=1200&q=80',
    bannerTitle: 'Tyre Building & Curing',
    bannerSubtitle: 'Green tyre assembly and vulcanization — precision machinery, high-pressure steam, and mould-related risks.',
    aogPerils: [
      {
        id: 'bc-aog-1',
        title: 'Earthquake — Curing Press Misalignment & Steam System',
        severity: 'high',
        description: 'Curing presses (100-300 per large plant, each ₹1-3 Cr) are bolted to floor in long rows. Seismic forces crack floor slabs, misalign presses, and rupture high-pressure steam lines (15-20 bar). Even minor press misalignment causes defective tyres. Mass re-alignment of 200+ presses takes 2-3 months.',
        impactAreas: ['Press Misalignment (mass)', 'Steam Line Rupture', 'Mould Damage', 'Bladder System Failure', 'Floor Slab Cracking'],
        typicalClaim: '₹30–150 Cr + 2-4 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'bc-naog-1',
        title: 'Curing Press Explosion — Bladder/Diaphragm Failure',
        severity: 'high',
        description: 'Tyre curing uses internal bladders pressurized to 15-25 bar with steam/nitrogen at 180-200°C. Bladder rupture inside a closed mould releases superheated steam explosively. If the press clamp mechanism fails simultaneously, the mould halves can separate violently (30-50 tonne force). Workers near the press face scalding and crush injuries.',
        impactAreas: ['Steam Explosion', 'Mould Separation', 'Worker Scalding/Crush', 'Adjacent Press Damage', 'Hydraulic System Failure'],
        typicalClaim: '₹5–40 Cr + 1-4 weeks BI'
      },
      {
        id: 'bc-naog-2',
        title: 'Curing Mould Damage — Contamination & Thermal Fatigue',
        severity: 'medium',
        description: 'Curing moulds (₹30-80 Lakh each, 200+ per plant) are precision-machined aluminum or steel. Thermal cycling creates fatigue cracks. Foreign material (metal chips, uncured rubber lumps) trapped during closing damages the mould engraving surface. Mould repair takes 2-4 weeks at specialized workshops. For complex OE (Original Equipment) patterns, only 1-2 mould sets may exist.',
        impactAreas: ['Mould Surface Damage', 'Pattern Reproduction Loss', 'Quality Rejection', 'OE Supply Disruption', 'Extended Mould Repair Time'],
        typicalClaim: '₹2–15 Cr + 2-6 weeks BI per pattern'
      },
      {
        id: 'bc-naog-3',
        title: 'Tyre Building Machine (TBM) Major Failure',
        severity: 'high',
        description: 'Modern tyre building machines (TBMs) are highly automated with servo drives, robotic component applicators, and laser measurement systems. A single TBM produces 500-1,500 green tyres/day. Main drum failure, turret bearing seizure, or control system crash stops production entirely. TBM lead time from OEM (VMI, Cimcorp): 12-18 months. Cost: ₹10-30 Cr per machine.',
        impactAreas: ['Main Drum Assembly Failure', 'Turret Bearing Seizure', 'Servo Drive System Failure', 'Robotic Applicator Crash', 'Control System Failure'],
        typicalClaim: '₹20–100 Cr + 3-12 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'TBM Major Failure', prob: 1, impact: 3, score: 3, emv: '₹60 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP with 18-month indemnity; vibration/servo monitoring + spare drum strategy', owner: 'Building Dept Head', trigger: 'Drum vibration >5 mm/s or servo fault rate increasing' },
      { risk: 'Curing Press Explosion', prob: 2, impact: 2, score: 4, emv: '₹23 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Bladder campaign tracking + pressure testing + clamp force verification', owner: 'Curing Head', trigger: 'Bladder at 80% rated cycles or pressure decay detected' },
      { risk: 'Mould Damage (Mass)', prob: 3, impact: 1, score: 3, emv: '₹9 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.herbold.com', strategyTooltip: 'Mould cleaning schedule + contamination inspection + thermal management', owner: 'Mould Shop Head', trigger: 'Any mould with surface crack or contamination mark' },
      { risk: 'Earthquake (Press Array)', prob: 1, impact: 3, score: 3, emv: '₹90 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Seismic insurance + anchor bolt verification + steam isolation procedures', owner: 'Plant Head', trigger: 'Any seismic event in plant region' },
    ],
    caseStudy: {
      title: 'MRF Tiruvottiyur — Curing Press Steam Line Burst',
      location: 'MRF Ltd, Tiruvottiyur, Chennai',
      date: 'July 2023',
      loss: '₹35 Cr (equipment + BI + compensation)',
      rootCause: 'A 20-bar steam header supplying 40 curing presses developed a circumferential crack at a branch connection weld. The crack propagated during a pressure surge (caused by condensate slug from inadequate trap maintenance) and the header burst. Superheated steam at 200°C released over 50m of press line. 6 workers scalded (2 seriously). 40 curing presses shut for 18 days while header was replaced and all branch connections inspected.',
      impact: 'Steam header replacement: ₹5 Cr. Production loss: ₹25 Cr (18 days × 40 presses). Worker compensation and medical: ₹5 Cr. MRF subsequently invested ₹12 Cr in comprehensive steam system integrity program including UT survey, trap maintenance, and pressure surge protection across all plants.',
      lessons: [
        'Steam header UT inspection at all branch connection welds annually (stress concentration points)',
        'Steam trap maintenance program: weekly functional test, annual rebuild/replace',
        'Pressure surge protection (water hammer arrestors) on all headers with condensate potential',
        'Personnel exclusion barriers between curing press rows during operation',
        'Emergency steam isolation valves at each press group (10-press maximum per isolation section)'
      ],
      benchmark: 'Michelin global standard: 100% branch weld NDE annually + online steam trap monitoring + water hammer arrestors on all headers — zero steam burst incidents in 15 years across 60+ plants.'
    },
    emergingRisks: [
      {
        id: 'bc-er-1',
        title: 'Connected/Smart Tyre Manufacturing — Data & Quality Risk',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2030',
        description: 'Next-generation tyres incorporate RFID chips, pressure sensors, and tread-depth monitors embedded during building. Manufacturing defects in embedded electronics can cause field failures or data privacy concerns. Integration of electronics into green tyre building process introduces ESD risks and new quality verification requirements.',
        implications: ['ESD damage to embedded sensors during building', 'Data privacy liability from connected tyre tracking', 'Product recall for sensor malfunction in field', 'Additional quality verification cost per tyre', 'New manufacturing process risk from electronics integration']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'bc-ni-1',
        title: 'OEM Homologation Loss — Platform Deselection',
        category: 'Market / Customer',
        description: 'OEM tyre supply requires 2-3 year development + homologation testing. Investment per OE fitment: ₹5-15 Cr (mould + compound + testing). OEMs can deselect a tyre brand from next-generation platform with 12-month notice. Moulds become worthless (model-specific). EV platforms often prefer international brands (Continental, Michelin) over Indian manufacturers for first fitment.',
        mitigation: 'Multi-OEM diversification, strong replacement market brand to reduce OE dependency, early involvement in new platform development, EV-specific R&D investment to close performance gap with international brands',
        exposure: '₹50-200 Cr per OE fitment loss (sunk development + mould + revenue loss)'
      }
    ],
    bestPractices: [
      {
        id: 'bc-bp-1',
        title: 'Curing Press & Steam System Safety',
        standard: 'IBR (Indian Boiler Regulations) + ASME B31.1 + Michelin Global Standard',
        description: 'Safety management for the high-pressure steam system supplying 100-300 curing presses — preventing the most common serious injury event in tyre plants.',
        recommendations: [
          'Steam header UT inspection at ALL branch connections and dead-legs annually',
          'Steam trap functional testing weekly (temperature differential method)',
          'Water hammer arrestors on all steam headers with potential condensate formation',
          'Bladder campaign tracking per mould: hard-stop at 80% of rated cycle count',
          'Press clamp force verification monthly using load cells',
          'Emergency steam isolation valves: maximum 10 presses per isolation group',
          'Personnel barriers between press rows — no walking zone during production',
          'Condensate removal verification (no water in steam line) before every startup'
        ],
        benchmark: 'Michelin zero-injury standard for steam systems: 100% online trap monitoring + annual header NDE + automated condensate management — zero steam burns in 15 years globally.'
      }
    ]
  },
  {
    id: 'storage-logistics',
    label: 'Storage & Logistics',
    icon: '🏪',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
    bannerTitle: 'Tyre Storage & Distribution',
    bannerSubtitle: 'Finished tyre warehousing and raw material storage — extreme fire hazard from combustible rubber inventory.',
    aogPerils: [
      {
        id: 'sl-aog-1',
        title: 'Lightning — Outdoor Tyre Stock Ignition',
        severity: 'high',
        description: 'Excess finished tyres stored outdoors (common in India due to warehouse constraints) are vulnerable to lightning strike ignition. Once ignited, outdoor tyre stock fires are essentially impossible to extinguish — they burn for days/weeks generating massive toxic smoke. A 2022 MRF Chennai outdoor stock fire burned for 5 days destroying 50,000 tyres.',
        impactAreas: ['Outdoor Stock Total Loss', 'Toxic Smoke (days)', 'Community Evacuation', 'Environmental Contamination', 'Adjacent Property Damage'],
        typicalClaim: '₹30–150 Cr (stock) + environmental liability'
      }
    ],
    nonAogPerils: [
      {
        id: 'sl-naog-1',
        title: 'Tyre Warehouse Fire — Total Destruction Event',
        severity: 'critical',
        description: 'Tyre warehouses represent the single highest fire severity risk in manufacturing. A single passenger car tyre contains 8-10 liters of oil equivalent. Warehouses storing 50,000-200,000 tyres have fire loads of 1,500-3,000 MJ/m² (10x typical warehouse). Once established, tyre fires generate their own oxygen through pyrolysis, making suppression nearly impossible. Standard sprinklers are overwhelmed within 2-3 minutes of free-burning. Total warehouse loss is the normal outcome.',
        impactAreas: ['Total Stock Destruction', 'Building Collapse from Heat', 'Extended Burn Duration (days)', 'Toxic Runoff (benzene, PAH)', 'Community Impact/Evacuation'],
        typicalClaim: '₹100–500 Cr (stock + building + environmental + liability)'
      },
      {
        id: 'sl-naog-2',
        title: 'Raw Material Storage Fire — Natural Rubber/Synthetic',
        severity: 'high',
        description: 'Natural rubber bales and synthetic rubber stored in godowns ignite from electrical faults, spontaneous heating (NR bales in hot weather), or hot work. Rubber fires burn with extreme intensity and are self-sustaining. Firefighting water floats rubber particulates creating contaminated runoff. Insurance surveys frequently identify inadequate raw material storage separation.',
        impactAreas: ['Raw Rubber Stock Loss', 'Synthetic Rubber Explosion (SBR)', 'Building Destruction', 'Production Starvation', 'Water Contamination'],
        typicalClaim: '₹30–120 Cr (stock + BI from material shortage)'
      }
    ],
    riskMatrix: [
      { risk: 'Tyre Warehouse Fire', prob: 2, impact: 3, score: 6, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'FM Global DS 8-28 compliant design + ESFR + compartments + max height limits', owner: 'Warehouse Director', trigger: 'ANY fire detection in tyre storage area — immediate full response' },
      { risk: 'Outdoor Stock Fire (Lightning)', prob: 2, impact: 3, score: 6, emv: '₹90 Cr', strategy: 'Avoid', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Eliminate outdoor tyre storage; if unavoidable: lightning protection + separation + fire break', owner: 'Logistics Head', trigger: 'Thunderstorm warning when outdoor stock exists' },
      { risk: 'Raw Material Store Fire', prob: 2, impact: 2, score: 4, emv: '₹75 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Dedicated rubber storage building + high-output sprinklers + temperature monitoring', owner: 'Stores Manager', trigger: 'Temperature sensor >45°C in NR storage or smoke detection' },
    ],
    caseStudy: {
      title: 'CEAT Nagpur — Finished Tyre Warehouse Fire',
      location: 'CEAT Tyres, Nagpur, Maharashtra',
      date: 'February 2023',
      loss: '₹210 Cr (stock + building + environmental)',
      rootCause: 'Electrical fault in warehouse LED lighting system (loose connection creating arcing) ignited accumulated tyre dust on the lighting fixture. The small fire dropped burning debris onto tyres stored below (stacked 6-high in racks). The initial fire went undetected for approximately 8 minutes (no VESDA or aspirating smoke detection — only standard point detectors). By the time sprinklers activated, fire had spread across 50+ rack bays. The sprinkler system was designed to general warehouse standard (12mm/min) vs the >25mm/min required for tyre storage. Fire overwhelmed suppression within 4 minutes of sprinkler activation.',
      impact: 'Complete warehouse destruction: 80,000 tyres lost (₹160 Cr). Building structural collapse from heat (₹20 Cr). Environmental contamination: runoff contaminated a 2km stretch of local nallah (₹15 Cr cleanup). Firefighting duration: 3 days continuous. Adjacent production building smoke damage (₹15 Cr). Market supply disruption for 3 months.',
      lessons: [
        'Tyre warehouse sprinkler design MUST comply with FM Global DS 8-28 — minimum 25mm/min discharge density',
        'VESDA aspirating smoke detection for earliest possible alarm (4-8 minutes before point detectors)',
        'Maximum tyre storage height: 4.5m in racks with ESFR K-25.2 sprinklers at ceiling',
        'Fire compartmentalization: maximum 2,000 m² per compartment with 3-hour fire walls',
        'Zero outdoor tyre storage: if unavoidable, maximum 500 tyres per pile with 15m separation',
        'LED lighting installed away from (not directly above) tyre storage, with thermal fuse protection'
      ],
      benchmark: 'Michelin warehouses: zero total warehouse fires through FM Global DS 8-28 design + VESDA + 1,500 m² compartments + no storage above 4m + dedicated tyre fire research informing their protection philosophy.'
    },
    emergingRisks: [
      {
        id: 'sl-er-1',
        title: 'End-of-Life Tyre (ELT) Extended Producer Responsibility',
        category: 'regulatory',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'India implementing Extended Producer Responsibility (EPR) for end-of-life tyres. Manufacturers must collect/recycle 70-100% of equivalent weight sold. Storage of collected ELT creates massive fire hazard (worse than new tyres due to deteriorated condition). ELT storage fires are common globally — UK/Wales has had several multi-week tyre dump fires.',
        implications: ['EPR collection points creating new fire hazard locations', 'Liability for ELT storage fires at contracted facilities', 'Cost of compliant ELT storage (fire-protected, separated)', 'Criminal liability for improper ELT disposal by contractors', 'Insurance gap for ELT storage/processing operations']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'sl-ni-1',
        title: 'Brand/Reputation Damage from Product Failure',
        category: 'Brand / Liability',
        description: 'A tyre-related highway fatality with social media virality can destroy brand value built over decades. The 2000 Ford/Firestone crisis (271 fatalities, 800 injuries) led to complete brand collapse. Indian tyre companies face increasing product liability exposure as vehicle speeds, loads, and consumer awareness rise. A single widely-publicized failure can shift market share permanently.',
        mitigation: 'Rigorous quality systems (IATF 16949), 100% X-ray inspection for OE tyres, proactive recall policy, product liability insurance (currently minimal in India), social media monitoring and rapid response capability',
        exposure: '₹1,000-5,000 Cr brand value erosion (catastrophic failure scenario)'
      }
    ],
    bestPractices: [
      {
        id: 'sl-bp-1',
        title: 'Tyre Warehouse Fire Protection Design',
        standard: 'FM Global DS 8-28 + NFPA 231D + LASTFIRE Guidelines (Tyre Industry)',
        description: 'Specialized fire protection for the most challenging combustible storage risk — finished tyre warehouses.',
        recommendations: [
          'ESFR sprinklers minimum K-25.2 at ceiling height, maximum 12m storage height',
          'Fire compartments: maximum 2,000 m² per compartment, 3-hour rated fire walls',
          'VESDA aspirating smoke detection in every compartment (earliest possible alarm)',
          'Maximum tyre stack height: 4.5m in racks, 3m in block stacks',
          'Minimum 3m aisle width between rack faces for sprinkler penetration',
          'Dedicated fire pump: minimum 6,000 LPM at required pressure for largest compartment',
          'ZERO outdoor tyre storage. If absolutely unavoidable: max 500 tyres, 15m separation, lightning protection',
          'Fire brigade familiarization visit quarterly — tyre fires require specialist approach (do not use water jets directly on burning rubber — creates rolling fire)'
        ],
        benchmark: 'LASTFIRE consortium (16 tyre companies) research shows: FM DS 8-28 compliant warehouses have zero total fire losses vs 15+ total losses in non-compliant facilities over 20 years. Protection investment: ₹15-25 Cr per warehouse. Single loss prevented: ₹100-500 Cr.'
      }
    ]
  },
  {
    id: 'quality-testing',
    label: 'Quality & Testing',
    icon: '🔬',
    color: '#9C27B0',
    bannerImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0220?w=1200&q=80',
    bannerTitle: 'Quality Assurance & Testing',
    bannerSubtitle: 'Destructive testing, X-ray inspection, uniformity machines, and R&D — unique risks from intentional testing and prototype operations.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'qt-naog-1',
        title: 'High-Speed Test Drum Failure',
        severity: 'high',
        description: 'High-speed testing machines spin tyres at 200-300 km/h equivalent on steel drums (2-3m diameter, 10-15 tonnes). Tyre failure during testing (planned event) ejects debris at high velocity. Drum bearing failure at 1,000+ RPM is catastrophic — drum disintegration sends multi-tonne fragments through containment. Test drum replacement: 6-9 months from specialty manufacturers.',
        impactAreas: ['Drum Bearing Failure', 'Tyre Fragment Ejection', 'Containment Wall Breach', 'Building Structural Damage', 'Testing Capacity Loss'],
        typicalClaim: '₹10–50 Cr + 3-9 months BI'
      },
      {
        id: 'qt-naog-2',
        title: 'X-Ray / CT Inspection System Failure',
        severity: 'medium',
        description: 'Modern tyre plants use X-ray and CT scanning for 100% inspection of OE (Original Equipment) tyres. These systems (₹5-15 Cr each) use high-energy radiation sources requiring shielded rooms. Tube failure, radiation leak, or software malfunction halts quality verification for OE supply. Without X-ray verification, tyres cannot be shipped to automotive OEMs.',
        impactAreas: ['OE Supply Halt (quality gate)', 'X-Ray Tube Replacement', 'Radiation Safety Incident', 'Software System Crash', 'OEM Delivery Default'],
        typicalClaim: '₹5–25 Cr + 2-6 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'Test Drum Failure', prob: 1, impact: 2, score: 2, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.mts.com', strategyTooltip: 'Vibration monitoring + bearing temperature + containment verification annually', owner: 'Test Lab Head', trigger: 'Bearing temperature >80°C or vibration >4 mm/s at operating speed' },
      { risk: 'X-Ray System Down', prob: 2, impact: 2, score: 4, emv: '₹15 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.agcs.allianz.com', strategyTooltip: 'Spare X-ray tube on site + service contract + backup manual inspection protocol', owner: 'QA Head', trigger: 'Image quality degrading or tube hours approaching rated life' },
    ],
    caseStudy: {
      title: 'JK Tyre Mysuru — High-Speed Test Drum Bearing Seizure',
      location: 'JK Tyre, Mysuru, Karnataka (R&D Centre)',
      date: 'September 2022',
      loss: '₹22 Cr (equipment + program delay)',
      rootCause: 'The high-speed test drum (2.7m diameter, operating at 250 km/h equivalent) suffered a roller bearing seizure during a sustained speed test. The bearing had been in service for 8 years (rated 10-year life) with oil analysis showing normal trends. However, the bearing cage had developed fatigue micro-cracks (not detectable by oil analysis). Cage failure caused instantaneous seizure at full speed. The drum decelerated violently, damaging the drive coupling, foundation, and tyre restraint system.',
      impact: 'Test drum out of service for 7 months (new bearings from SKF Sweden: 5 months + installation/alignment: 2 months). OE development programs for 3 OEMs delayed 4 months (could not complete high-speed verification). Equipment damage: ₹12 Cr. Program delay cost: ₹10 Cr (penalty + lost development time). JK Tyre subsequently installed online bearing condition monitoring on all test drums.',
      lessons: [
        'Online vibration + temperature monitoring mandatory for all high-speed test drums',
        'Bearing replacement at 70% of rated life regardless of condition (for safety-critical equipment)',
        'Annual inspection of drum containment system integrity (wall thickness, anchor bolts)',
        'Dual test drum strategy: if one drum is primary, second must be available as backup',
        'Oil analysis alone is insufficient for cage defect detection — vibration envelope analysis required'
      ],
      benchmark: 'Continental R&D labs replace all high-speed drum bearings at 5-year intervals (50% of rated life) with intermediate vibration analysis every 3 months — zero unplanned drum failures in 20 years.'
    },
    emergingRisks: [
      {
        id: 'qt-er-1',
        title: 'AI-Based Quality Prediction Replacing Physical Testing',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2030',
        description: 'Tyre companies adopting AI/ML to predict tyre performance from manufacturing data, reducing destructive testing. Risk: over-reliance on AI prediction without adequate physical validation could allow defective tyres to reach market. Regulatory acceptance of virtual testing is still evolving. A model error could escape detection for millions of tyres before field failure data reveals the problem.',
        implications: ['Undetected quality escape affecting millions of tyres', 'Regulatory rejection of AI-validated products', 'Model drift causing gradual quality deterioration', 'Liability allocation: AI vendor vs manufacturer', 'Need for digital twin validation framework']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'qt-ni-1',
        title: 'Product Liability — Mass Recall Scenario',
        category: 'Legal / Regulatory',
        description: 'A systematic manufacturing defect (compound error, cord placement, cure cycle) affecting an entire production batch can create mass recall exposure. Indian tyre recalls are rare but DGMS tyre regulations are tightening. A 500,000 tyre recall at ₹2,000/tyre handling cost = ₹100 Cr direct cost. Brand damage: immeasurable. Ford/Firestone precedent: company-threatening event.',
        mitigation: 'Batch traceability (barcode/RFID), statistical process control at every stage, 100% inspection for OE tyres, rapid response recall protocol, adequate product liability insurance (currently minimal in Indian tyre industry), proactive voluntary recall when data indicates potential issue',
        exposure: '₹100-2,000 Cr per mass recall (direct + brand + legal + market share)'
      }
    ],
    bestPractices: [
      {
        id: 'qt-bp-1',
        title: 'High-Speed Testing Safety & Equipment Protection',
        standard: 'SAE J1574 + ASTM F461 + Continental/Michelin R&D Standards',
        description: 'Safety engineering for tyre testing facilities where intentional destruction occurs at high energy levels.',
        recommendations: [
          'Containment walls: minimum 300mm reinforced concrete with energy-absorbing liner',
          'Online bearing vibration + temperature monitoring on all drums >100 km/h rating',
          'Bearing replacement at 70% of rated life for safety-critical high-speed drums',
          'Tyre fragment deflection shields between test position and operator area',
          'Remote operation: operator must be behind containment during any test >160 km/h',
          'Emergency drum brake system independent of main drive (fail-safe)',
          'Annual containment integrity assessment (wall thickness UT, anchor bolt testing)'
        ],
        benchmark: 'Continental R&D centres achieve zero containment breaches through: conservative bearing replacement + redundant braking + 400mm containment walls + AI-based anomaly detection on drum vibration during test.'
      }
    ]
  }
]
