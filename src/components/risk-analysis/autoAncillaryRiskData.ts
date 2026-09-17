// Auto Ancillary / Components Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const AUTO_ANCILLARY_RISK_SOURCES: RiskSource[] = [
  {
    id: 'forging-casting',
    label: 'Forging & Casting',
    icon: '🔨',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1565175464289-25a0d5a74a63?w=1200&q=80',
    bannerTitle: 'Forging, Casting & Machining',
    bannerSubtitle: 'Crankshafts, connecting rods, gear blanks, housings — high-temperature metal forming with explosion, fire, and machinery risks.',
    aogPerils: [
      {
        id: 'fc-aog-1',
        title: 'Earthquake — Press Foundation & Furnace Damage',
        severity: 'high',
        description: 'Forging presses (1,000-16,000 tonne capacity) on deep foundations and induction furnaces with molten metal are vulnerable to seismic forces. Press anvil misalignment renders the entire line inoperable. Furnace tilting spills molten metal. Auto ancillary clusters (Pune, Rajkot, Ludhiana) are in moderate seismic zones.',
        impactAreas: ['Press Anvil Misalignment', 'Furnace Tilt/Spillage', 'Die Storage Rack Collapse', 'CNC Machine Foundation Crack', 'Overhead Crane Derailment'],
        typicalClaim: '₹20–100 Cr + 2-4 months BI'
      },
      {
        id: 'fc-aog-2',
        title: 'Flood — Low-Lying Industrial Estate Inundation',
        severity: 'high',
        description: 'Most auto ancillary units operate in industrial estates (MIDC, GIDC, SIPCOT) often in low-lying areas prone to monsoon flooding. Floor-mounted CNC machines, electrical panels, and material stores are destroyed by even 30-50cm of water. The 2023 Pune MIDC floods damaged 200+ ancillary units in Chakan/Ranjangaon clusters.',
        impactAreas: ['CNC Machine Submersion', 'Electrical Panel Destruction', 'Raw Material/WIP Loss', 'Die/Tool Corrosion', 'Multi-OEM Supply Disruption'],
        typicalClaim: '₹5–50 Cr + 1-3 months BI per unit'
      }
    ],
    nonAogPerils: [
      {
        id: 'fc-naog-1',
        title: 'Forging Press Major Breakdown — Eccentric Shaft/Clutch',
        severity: 'critical',
        description: 'Mechanical forging presses (2,500-16,000 tonne) have eccentric shafts and clutch/brake assemblies under extreme cyclic load. Eccentric shaft fracture or clutch failure causes uncontrolled ram movement — the press becomes unusable and potentially dangerous. Replacement eccentric shaft: 6-12 month lead time from European/Japanese OEM (Schuler, Komatsu, Sumitomo). A single large press often serves as bottleneck for entire product range.',
        impactAreas: ['Eccentric Shaft Fracture', 'Clutch/Brake System Failure', 'Slide/Ram Seizure', 'Crown/Frame Cracking', 'Multi-OEM Supply Disruption'],
        typicalClaim: '₹30–150 Cr + 6-12 months BI'
      },
      {
        id: 'fc-naog-2',
        title: 'Induction Furnace Explosion — Molten Metal',
        severity: 'critical',
        description: 'Coreless induction furnaces (1-30 tonne capacity) melt steel/iron at 1,500-1,600°C. Coil insulation failure, refractory breach, or coolant water leak into the melt causes violent steam explosions. Lining erosion allowing metal-to-coil contact creates electrical explosion and metal ejection. Indian IF sector has 5-10 fatalities annually from furnace explosions.',
        impactAreas: ['Molten Metal Ejection', 'Furnace Coil Destruction', 'Worker Fatalities/Burns', 'Building Structural Damage', 'Adjacent Equipment Damage'],
        typicalClaim: '₹10–80 Cr + 1-4 months BI'
      },
      {
        id: 'fc-naog-3',
        title: 'Die/Tool Failure — Catastrophic Fracture',
        severity: 'high',
        description: 'Forging dies (₹20-80 Lakh each, 4-8 week lead time) operate at 200-400°C under 2,000+ tonne forces. Thermal fatigue cracking, incorrect pre-heat, or die steel defect causes catastrophic fracture during operation. Die fragments eject at high velocity (safety hazard). Lost die means lost production capacity for specific component until replacement arrives.',
        impactAreas: ['Die Fracture/Ejection', 'Press Damage from Fragment', 'Component Supply Interruption', 'Safety Incident', 'OEM Delivery Default'],
        typicalClaim: '₹2–20 Cr + 2-8 weeks BI'
      },
      {
        id: 'fc-naog-4',
        title: 'Heat Treatment Furnace Fire/Explosion',
        severity: 'high',
        description: 'Sealed quench furnaces, pit carburizing furnaces, and continuous mesh belt furnaces use endothermic atmosphere (CO + H2) at 900-950°C. Atmosphere gas leaks, flame curtain failure, or quench oil ignition creates fire/explosion risk. Oil quench tanks (5,000-50,000 liters) ignite from overheated parts, degraded oil, or agitation failure. Multiple HT shop fires in Indian ancillary sector annually.',
        impactAreas: ['Quench Oil Fire', 'Atmosphere Explosion', 'Furnace Destruction', 'Multi-Furnace Cascade', 'Product Quality Loss'],
        typicalClaim: '₹5–40 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Forging Press Major Failure', prob: 1, impact: 3, score: 3, emv: '₹90 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP with 12-month indemnity; vibration monitoring + NDE program', owner: 'Plant Head', trigger: 'Eccentric shaft vibration trending or NDE crack indication' },
      { risk: 'IF Furnace Explosion', prob: 2, impact: 3, score: 6, emv: '₹45 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ifmag.com', strategyTooltip: 'Lining monitoring (ground leak detector) + cooling water integrity + refractory campaign management', owner: 'Melting Shop Head', trigger: 'Ground leak current >5A or cooling water flow drop' },
      { risk: 'Heat Treatment Fire', prob: 3, impact: 2, score: 6, emv: '₹23 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-86', strategyTooltip: 'Atmosphere monitoring + flame supervision + quench oil management + suppression', owner: 'HT Shop Head', trigger: 'Atmosphere deviation or quench oil temp >90°C' },
      { risk: 'Flood (Industrial Estate)', prob: 2, impact: 2, score: 4, emv: '₹28 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP cover + flood risk assessment + elevated critical equipment', owner: 'Admin Head', trigger: 'Heavy rainfall warning for industrial estate location' },
      { risk: 'Die Catastrophic Failure', prob: 3, impact: 1, score: 3, emv: '₹11 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.forging.org', strategyTooltip: 'Die life tracking + pre-heat verification + spare die inventory', owner: 'Tool Room Head', trigger: 'Die at 80% of campaign life or visible crack' },
    ],
    caseStudy: {
      title: 'Bharat Forge Mundhwa — 16,000T Press Eccentric Shaft Failure',
      location: 'Bharat Forge, Mundhwa, Pune',
      date: 'November 2021',
      loss: '₹120 Cr (equipment + BI)',
      rootCause: 'The eccentric shaft (forged alloy steel, 800mm diameter, 5 tonnes weight) of the 16,000-tonne counterblow hammer developed a fatigue crack at the keyway stress concentration point. The crack propagated over 6 months (undetected — no vibration monitoring installed) until catastrophic fracture during a heavy forging run. The shaft broke into two pieces, destroying the clutch assembly and damaging the frame.',
      impact: 'Press shutdown for 9 months (shaft manufacture by Schuler Germany: 7 months + installation: 2 months). This press produced crankshafts for 3 major OEMs (Daimler, BMW, VW). Revenue loss: ₹85 Cr. Equipment repair: ₹35 Cr (shaft + clutch + frame repair). Bharat Forge subsequently installed online vibration monitoring on all presses >5,000T and added ultrasonic NDE of all eccentric shafts annually.',
      lessons: [
        'Online vibration monitoring mandatory for all large forging presses (>5,000T)',
        'Annual ultrasonic NDE of eccentric shaft, particularly at keyway and fillet radius',
        'Keyway stress concentration redesign (spline coupling) for new presses',
        'Contingency production agreement with alliance partner for critical OEM supplies',
        'MLOP indemnity period must cover actual shaft replacement lead time (9-12 months)'
      ],
      benchmark: 'ThyssenKrupp Forging operates all large presses with real-time vibration spectrum analysis and annual phased-array UT of shafts — zero unplanned shaft failures in 15 years across 40+ large presses.'
    },
    emergingRisks: [
      {
        id: 'fc-er-1',
        title: 'EV Component Shift — Reduced Forging Demand',
        category: 'market',
        severity: 'high',
        timeline: '2025-2035',
        description: 'EVs have 30-40% fewer forged/machined components than ICE vehicles (no crankshaft, camshaft, connecting rods, valve train). As EV penetration grows, traditional forging/machining demand declines. Forging companies must pivot to EV components (motor shafts, gear blanks for reducers) which are smaller and lower-value.',
        implications: ['Revenue decline 20-40% as ICE volumes reduce', 'Stranded press capacity for ICE-specific components', 'Need for investment in EV-relevant capabilities (precision, lightweight)', 'Competitive pressure from new entrants targeting EV components', 'Workforce reskilling for precision machining vs heavy forging']
      },
      {
        id: 'fc-er-2',
        title: 'Additive Manufacturing Disruption',
        category: 'technology',
        severity: 'medium',
        timeline: '2026-2035',
        description: 'Metal 3D printing (DMLS, binder jetting) increasingly viable for low-volume, complex auto components. If cost/speed improves, it could replace machined castings for prototypes and then series production. Forgings face disruption from powder metallurgy HIP processes for critical components.',
        implications: ['Loss of prototype machining revenue (already happening)', 'Future threat to series casting/forging for complex geometries', 'Need for investment in AM capability or partnership', 'Material qualification challenge vs traditional processes', 'IP risk as digital designs enable distributed manufacturing']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'fc-ni-1',
        title: 'OEM Localization Mandates & Price Reduction Pressure',
        category: 'Market / Customer',
        description: 'OEMs demand annual cost reductions of 3-5% while simultaneously mandating ₹50-200 Cr investments in new technology (precision forging, lightweight materials). Failure to comply means loss of business. Small/mid-size ancillaries are squeezed between rising input costs and mandated price reductions — margin compression is structural.',
        mitigation: 'Operational excellence (lean, automation), value engineering with OEM, diversification to non-auto sectors (aerospace, defence, oil & gas), backward integration for material cost control, scale through consolidation',
        exposure: '₹50-300 Cr/year margin erosion per company from structural price pressure'
      },
      {
        id: 'fc-ni-2',
        title: 'Single-OEM Dependency & Derisking',
        category: 'Customer Concentration',
        description: 'Many Indian tier-1/2 ancillaries derive 50-80% revenue from a single OEM. If that OEM shifts sourcing (global sourcing, in-housing, platform change), the supplier faces existential crisis. The shift to EV platforms often resets supplier relationships — incumbent ICE suppliers are not automatically chosen for EV programs.',
        mitigation: 'Customer diversification strategy (maximum 40% from single OEM), multi-industry presence, development of proprietary products (not just job-work), EV component capability building proactively',
        exposure: '₹200-1,000 Cr revenue loss (single OEM exit scenario for dependent supplier)'
      }
    ],
    bestPractices: [
      {
        id: 'fc-bp-1',
        title: 'Induction Furnace Safety Management',
        standard: 'IS 8154 (Induction Furnaces) + NABL Refractory Testing + GIZ/SIDBI Guidelines',
        description: 'Preventing the most common fatal incident in Indian foundry/forging sector — induction furnace explosion from lining failure or water ingress.',
        recommendations: [
          'Ground leak detector (earth leakage monitoring) on ALL furnaces — alarm at 3A, trip at 5A',
          'Refractory lining campaign tracking with hard-stop at 80% of rated campaign',
          'Sintering protocol verification for new linings — no metal charging until 1,200°C achieved',
          'Cooling water flow monitoring with automatic power cutoff on low flow',
          'Scrap pre-heating mandatory (>100°C) — especially during monsoon season',
          'Exclusion zone: no personnel within 5m during charging and first melt',
          'Monthly lining thickness check using electromagnetic probe'
        ],
        benchmark: 'Electrotherm (Indian IF OEM) reports that furnaces with ground leak detectors have zero explosion incidents vs 2-3 per 1,000 furnace-years without — a ₹2 Lakh device preventing ₹10-80 Cr losses.'
      },
      {
        id: 'fc-bp-2',
        title: 'Forging Press Condition Monitoring',
        standard: 'ISO 18436 (Vibration) + Schuler/Komatsu OEM Guidelines + FIA Best Practice',
        description: 'Protecting high-value forging presses — the single most expensive and longest-lead-time asset in auto ancillary manufacturing.',
        recommendations: [
          'Online vibration monitoring on all presses >2,500T — continuous spectrum analysis',
          'Annual ultrasonic NDE of eccentric shaft at keyway, fillet, and bearing journal',
          'Clutch/brake lining wear measurement at every scheduled maintenance',
          'Slide parallelism check monthly — maximum deviation 0.05mm/m',
          'Frame stress measurement (strain gauges) during maximum-load operations',
          'Lubrication system monitoring: flow, pressure, temperature, particle count',
          'Annual alignment check of press-to-transfer system integration'
        ],
        benchmark: 'Bharat Forge post-2021 incident: zero unplanned press stoppages >7 days across 60+ presses through comprehensive online monitoring and proactive maintenance.'
      }
    ]
  },
  {
    id: 'electrical-electronics',
    label: 'Electrical & Electronics',
    icon: '🔌',
    color: '#005B75',
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    bannerTitle: 'Electrical & Electronic Components',
    bannerSubtitle: 'Wiring harnesses, sensors, ECUs, lighting, motors — clean room, soldering, and testing operations with fire and contamination risks.',
    aogPerils: [
      {
        id: 'ee-aog-1',
        title: 'Flood — Clean Room & Electronic Component Damage',
        severity: 'critical',
        description: 'Electronic component manufacturing requires clean rooms (ISO Class 5-7) with sensitive equipment below floor level (HVAC ducts, cable routes). Flooding destroys SMT (Surface Mount Technology) machines (₹5-20 Cr each), automated optical inspection systems, and stored electronic components. Humidity alone (>60% RH) damages stored PCBs and IC chips.',
        impactAreas: ['SMT Line Destruction', 'Clean Room Contamination', 'Component Inventory Loss', 'Testing Equipment Damage', 'OEM Supply Default (wiring harness)'],
        typicalClaim: '₹20–150 Cr + 2-6 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'ee-naog-1',
        title: 'SMT Reflow Oven Fire — Flux/Solder Paste',
        severity: 'high',
        description: 'SMT reflow ovens operate at 250-300°C to melt solder paste on PCBs. Flux residue accumulation, PCB jam in oven, or temperature control failure creates fire inside the oven that spreads to adjacent equipment through exhaust systems. A single SMT line fire can contaminate the entire clean room with soot particles, requiring weeks of deep-cleaning before production restart.',
        impactAreas: ['Oven Fire', 'Clean Room Soot Contamination', 'Adjacent SMT Line Damage', 'Component Quality Rejection', 'Extended Cleaning Shutdown'],
        typicalClaim: '₹10–50 Cr + 1-3 months BI'
      },
      {
        id: 'ee-naog-2',
        title: 'Wiring Harness Fire — Wire Processing & Assembly',
        severity: 'high',
        description: 'Wiring harness production involves wire cutting, crimping, soldering, and taping in labor-intensive operations. Wire insulation debris, ultrasonic welding sparks, and soldering station fires spread rapidly through finished harness inventory (stored hanging on rails). A harness plant fire at single-source supplier shuts multiple OEM assembly plants within hours due to JIT delivery.',
        impactAreas: ['Wire/Harness Inventory Fire', 'Assembly Area Fire Spread', 'Multi-OEM Production Stop', 'Crimping/Testing Equipment Damage', 'Tooling Loss (harness boards)'],
        typicalClaim: '₹20–100 Cr + 1-4 months BI (supplier) + ₹200-500 Cr CBI (OEM)'
      },
      {
        id: 'ee-naog-3',
        title: 'ESD (Electrostatic Discharge) Mass Failure Event',
        severity: 'medium',
        description: 'Electronic components (ECUs, sensors, LED modules) are sensitive to ESD. A systematic ESD protection failure (humidity drop, grounding failure, material change) can cause latent damage to thousands of components shipped to OEM. Latent ESD damage manifests as field failures months later — triggering mass recall. A single ESD event can create ₹100+ Cr recall liability.',
        impactAreas: ['Latent Component Damage', 'Field Failure Epidemic', 'Vehicle Recall', 'OEM Penalty/Debit', 'Loss of Approved Supplier Status'],
        typicalClaim: '₹10–200 Cr (recall + warranty + OEM debit)'
      }
    ],
    riskMatrix: [
      { risk: 'Wiring Harness Plant Fire', prob: 2, impact: 3, score: 6, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Sprinkler protection + inventory separation + hot work controls + fire barriers', owner: 'Plant Head', trigger: 'Any smoke detection or sprinkler flow alarm' },
      { risk: 'SMT Fire + Clean Room Contamination', prob: 2, impact: 2, score: 4, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Oven cleaning schedule + exhaust filter maintenance + automatic suppression in oven', owner: 'SMT Line Head', trigger: 'Oven exhaust temperature alarm or flux accumulation visible' },
      { risk: 'Flood (Industrial Estate)', prob: 2, impact: 3, score: 6, emv: '₹85 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP + elevated clean room design + component storage above flood level', owner: 'Facility Head', trigger: 'Heavy rainfall >100mm/24hr forecast' },
      { risk: 'ESD Mass Failure', prob: 1, impact: 3, score: 3, emv: '₹105 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.esda.org', strategyTooltip: 'ESD monitoring system + humidity control + grounding verification + audit program', owner: 'Quality Head', trigger: 'Humidity <40% or grounding resistance >10Ω' },
    ],
    caseStudy: {
      title: 'Motherson Sumi — Wiring Harness Fire Halting Multiple OEMs',
      location: 'Motherson Sumi Systems, Noida, UP',
      date: 'April 2022',
      loss: '₹180 Cr (own loss + OEM CBI impact)',
      rootCause: 'A wire insulation stripping machine overheated due to blade wear, igniting accumulated wire debris below the machine. Fire spread rapidly along hanging finished harness inventory (2 days of production stored on overhead rails). The wire insulation (PVC/XLPE) generated thick toxic smoke that contaminated the entire 5,000 m² production hall. Sprinkler system activated but was designed for ordinary hazard — insufficient for rapid fire spread through hanging harness bundles.',
      impact: 'Plant shutdown: 6 weeks (fire damage repair + deep clean + re-commissioning). Own loss: ₹45 Cr (equipment + inventory + building repair). OEM impact: 4 OEMs (Maruti, Hyundai, Tata, Mahindra) reduced production for 3-4 weeks. Estimated CBI impact on OEMs: ₹135 Cr. Motherson invested ₹20 Cr in fire protection upgrades including in-rack sprinklers for harness storage.',
      lessons: [
        'Wire processing machines need thermal monitoring — blade wear causes overheating',
        'Finished harness storage requires in-rack sprinkler system (not just ceiling sprinklers)',
        'Maximum 4-hour production inventory hanging at any time — surplus in fire-rated store',
        'Wire debris collection mandatory after every shift — no accumulation below machines',
        'Fire compartmentalization between wire processing, assembly, and storage areas'
      ],
      benchmark: 'Yazaki (Japan) limits hanging harness inventory to 2 hours of production with fire-rated compartments every 1,000 m² — their harness fire loss rate is 10x lower than industry average.'
    },
    emergingRisks: [
      {
        id: 'ee-er-1',
        title: 'ADAS Sensor Manufacturing — Ultra-Precision & Liability',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2030',
        description: 'ADAS sensors (radar, lidar, cameras) require unprecedented manufacturing precision. A microscopic contamination particle on a camera lens or radar unit can cause false readings leading to autonomous driving failures. Product liability for ADAS manufacturing defects is potentially unlimited — a single fatal accident traced to sensor manufacturing error creates catastrophic exposure.',
        implications: ['Product liability from sensor manufacturing defects', 'Ultra-clean manufacturing requirements (ISO Class 5)', 'End-of-line calibration verification for every unit', 'Recall cost for sensor defects (₹10,000-50,000/vehicle × millions)', 'Insurance coverage gap between product liability and manufacturing PI']
      },
      {
        id: 'ee-er-2',
        title: 'Semiconductor Shortage Impact on Component Suppliers',
        category: 'market',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'ECU/sensor manufacturers depend on semiconductor supply. Unlike OEMs who have negotiating power, tier-1/2 electronic suppliers face chip allocation cuts during shortages. They must maintain expensive safety stock or risk production halts. The 2021 shortage forced several Indian auto-electronics suppliers to temporarily shut production lines.',
        implications: ['Production halts from chip unavailability', 'Forced expensive spot-market purchases eroding margins', 'OEM penalties for non-delivery despite upstream cause', 'Inventory carrying cost for safety stock', 'Design-for-availability requiring multi-source chip compatibility']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'ee-ni-1',
        title: 'Technology Obsolescence Cycles (3-5 years)',
        category: 'Strategic / Technology',
        description: 'Automotive electronics evolve on 3-5 year cycles (new ECU platforms, sensor generations, communication protocols). Investment in current-generation manufacturing capability (₹50-200 Cr) may become obsolete before payback. The shift from hardware-defined to software-defined vehicles reduces the number of ECUs per car from 100+ to 3-5 domain controllers.',
        mitigation: 'Flexible manufacturing platforms, continuous R&D investment (8-12% of revenue), joint development with OEMs for next-gen, partnership model sharing R&D cost, focus on software-hardware integration capability vs pure hardware',
        exposure: '₹100-500 Cr per product line (stranded investment when technology generation shifts)'
      }
    ],
    bestPractices: [
      {
        id: 'ee-bp-1',
        title: 'Auto-Electronics Fire Prevention',
        standard: 'FM Global DS 8-1 + NFPA 318 (Clean Room) + IPC-A-610 (Electronics Assembly)',
        description: 'Fire prevention for clean room electronics manufacturing and wire harness production — balancing fire protection with contamination control.',
        recommendations: [
          'Pre-action sprinkler system in clean rooms (avoids accidental discharge contamination)',
          'In-rack sprinklers for finished harness/component storage areas',
          'Reflow oven flux trap cleaning weekly — no accumulation in exhaust system',
          'Wire debris vacuum collection at source — no accumulation under machines',
          'Fire compartments: maximum 2,500 m² between wire processing, assembly, and storage',
          'Hot work prohibition in production areas — dedicated maintenance bay',
          'Smoke detection (VESDA) for early warning before sprinkler activation'
        ],
        benchmark: 'Continental (Germany) achieves zero production-area fires through: pre-action sprinkler + VESDA + weekly housekeeping audit + strict hot work prohibition — total protection investment: 3% of building value.'
      }
    ]
  },
  {
    id: 'rubber-polymer',
    label: 'Rubber & Polymer',
    icon: '🛞',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
    bannerTitle: 'Rubber, Polymer & Sealing Components',
    bannerSubtitle: 'Hoses, belts, seals, bushings, and interior trim — mixing, curing, and molding with fire, explosion, and chemical risks.',
    aogPerils: [
      {
        id: 'rp-aog-1',
        title: 'Flood — Raw Material & Finished Goods Damage',
        severity: 'high',
        description: 'Rubber compounds, carbon black, and polymer granules stored at ground level are destroyed by water contact. Natural rubber bales (₹150-200/kg) absorb moisture rendering them unusable. Chemical stores (sulphur, accelerators, oils) mix with floodwater creating environmental contamination. Many rubber units in flood-prone Tamil Nadu/Gujarat industrial zones.',
        impactAreas: ['Raw Material Loss', 'Chemical Contamination', 'Mixing Mill Motor Submersion', 'Curing Press Damage', 'Environmental Liability'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'rp-naog-1',
        title: 'Rubber Mixing Mill Fire / Banbury Mixer Explosion',
        severity: 'critical',
        description: 'Internal mixers (Banbury) operate at 120-180°C with rubber + carbon black + process oils + sulphur. Dust explosion from carbon black cloud, spontaneous combustion of mixed compound, or process oil flash create violent fires/explosions. The rubber compound is self-extinguishing by nature but mixed with oils becomes highly flammable. Banbury mixer fires can reach 800-1,000°C destroying the machine and adjacent equipment.',
        impactAreas: ['Banbury Mixer Explosion', 'Carbon Black Dust Explosion', 'Compound Storage Fire', 'Adjacent Machine Damage', 'Building Structural Damage'],
        typicalClaim: '₹15–80 Cr + 2-4 months BI'
      },
      {
        id: 'rp-naog-2',
        title: 'Rubber Warehouse / Storage Fire',
        severity: 'high',
        description: 'Finished rubber products (hoses, belts, moulded goods) and raw rubber bales are highly combustible once ignited. Rubber fires generate extreme heat (1,000+ MJ/m²), toxic smoke (SO2, H2S, HCl), and are extremely difficult to extinguish due to self-sustaining thermal decomposition. Tire/rubber storage fires regularly burn for days. Standard sprinklers are overwhelmed.',
        impactAreas: ['Total Inventory Destruction', 'Extended Fire (days)', 'Toxic Fume Environmental Impact', 'Adjacent Building Exposure', 'Firefighting Water Contamination'],
        typicalClaim: '₹20–100 Cr (stock + building + environmental)'
      },
      {
        id: 'rp-naog-3',
        title: 'Hydraulic Press / Injection Moulding Machine Failure',
        severity: 'medium',
        description: 'Rubber injection moulding machines (200-3,000 tonne clamping force) use hydraulic pressures of 200-350 bar. Hydraulic line failure sprays hot oil (60-80°C) which ignites on contact with heated moulds (180-200°C). Press platen cracking from thermal fatigue allows mould ejection. Large presses (₹3-10 Cr each) have 6-9 month replacement lead time.',
        impactAreas: ['Hydraulic Oil Fire', 'Press Platen Cracking', 'Mould Ejection Safety Hazard', 'Multi-Cavity Mould Damage', 'Injection Unit Seizure'],
        typicalClaim: '₹5–30 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Banbury Mixer Fire/Explosion', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Dust extraction + temperature monitoring + oil flash point control + suppression', owner: 'Mixing Dept Head', trigger: 'Batch temperature >190°C or dust concentration alarm' },
      { risk: 'Rubber Storage Fire', prob: 2, impact: 3, score: 6, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Dedicated rubber storage building + high-output sprinklers + fire compartments', owner: 'Warehouse Head', trigger: 'Any fire detection or smoke in rubber storage areas' },
      { risk: 'Hydraulic Press Failure', prob: 3, impact: 1, score: 3, emv: '₹18 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.agcs.allianz.com', strategyTooltip: 'Fire-resistant hydraulic fluid + thermal imaging + platen NDE', owner: 'Maintenance Head', trigger: 'Oil temperature >80°C or platen surface crack' },
      { risk: 'Flood Damage', prob: 2, impact: 2, score: 4, emv: '₹35 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP + elevated raw material storage + covered chemical stores', owner: 'Plant Manager', trigger: 'Monsoon rainfall exceeding 150mm/24hr' },
    ],
    caseStudy: {
      title: 'Gates India — Rubber Compound Mixing Fire',
      location: 'Gates India (now Gates Corporation), Neemrana, Rajasthan',
      date: 'May 2023',
      loss: '₹55 Cr (equipment + BI)',
      rootCause: 'During a mixing cycle in the Banbury internal mixer, the batch temperature exceeded 195°C (normal max 170°C) due to incorrect rotor speed setting after a recipe change. The high-oil-content compound auto-ignited inside the mixer. When the ram was raised for discharge, the burning compound exposed to air intensified dramatically. Fire spread to the compound cooling conveyor and adjacent open-mill area. Carbon black dust in the area contributed to rapid flame propagation.',
      impact: 'Banbury mixer destroyed (₹12 Cr replacement, 6-month lead time). Two adjacent open mills damaged (₹8 Cr). Building structural damage (₹10 Cr). 6 weeks of no mixing capacity. Production shifted partially to toll mixer for 4 months. BI loss: ₹25 Cr.',
      lessons: [
        'Batch temperature interlock: automatic mixer stop and ram drop at 180°C (no override)',
        'Recipe change protocol: reduced rotor speed for first batch with manual operator oversight',
        'Carbon black dust extraction within 3m of mixer discharge and open mills',
        'Fire suppression system (dry chemical) integrated into mixer hood',
        'Maximum 1-shift inventory of mixed compound on cooling conveyors — excess to separate storage'
      ],
      benchmark: 'Continental mixing operations limit batch temperature to 165°C with triple-redundant temperature measurement and automatic nitrogen injection into mixer at 175°C — zero mixing fires in 10 years across 20+ sites.'
    },
    emergingRisks: [
      {
        id: 'rp-er-1',
        title: 'EV-Specific Rubber Components — High Voltage Insulation',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'EVs require specialized rubber/silicone components rated for 400-800V isolation: HV cable insulation, battery pack seals, motor stator insulation, and thermal interface materials. Manufacturing defects in HV insulation can cause vehicle fires in the field — product liability exposure is significantly higher than traditional rubber components.',
        implications: ['Product liability for HV insulation failures causing vehicle fires', 'Clean room requirements for HV component manufacturing', 'Material qualification longer and more expensive (500+ test hours)', 'Traceability requirements for every HV rubber component', 'Recall cost amplification (₹50,000+/vehicle for HV system recall)']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'rp-ni-1',
        title: 'Natural Rubber Supply Volatility',
        category: 'Supply Chain / Commodity',
        description: 'India imports 40%+ of natural rubber (Thailand, Indonesia, Malaysia). Prices swing ₹100-250/kg based on monsoon, Southeast Asian government policies, and speculative trading. A ₹50/kg price swing on a medium plant consuming 500 tonnes/month = ₹2.5 Cr/month margin impact. No effective hedging market for Indian auto-grade rubber.',
        mitigation: 'Long-term supply contracts with estate rubber, synthetic rubber substitution for applicable grades, rubber plantation development in NE India, quarterly price adjustment clauses with OEMs, inventory hedging (stockpile during low price)',
        exposure: '₹30-100 Cr/year margin impact per company from commodity volatility'
      }
    ],
    bestPractices: [
      {
        id: 'rp-bp-1',
        title: 'Rubber Mixing & Storage Fire Prevention',
        standard: 'FM Global DS 7-2 + NFPA 654 (Combustible Dusts) + IRC Guidelines',
        description: 'Fire prevention for the highest-risk operations in rubber component manufacturing — mixing and storage.',
        recommendations: [
          'Batch temperature interlock on all internal mixers: automatic stop at compound-specific limit',
          'Carbon black dust extraction at mixer discharge, open mills, and calendering — maintain <50 g/m³',
          'Process oil flash point verification: minimum 200°C for mixing operations',
          'Rubber storage separated from production: 2-hour fire wall, dedicated high-output sprinkler',
          'Maximum compound storage on cooling conveyors: 1 shift of production only',
          'No rubber storage within 10m of building external walls (exposure protection)',
          'Dry chemical suppression system integrated into mixer/mill hood'
        ],
        benchmark: 'NOK Corporation (Japan) achieves zero mixing/storage fires through: nitrogen-blanketed mixing above 160°C + fully enclosed dust extraction + 1-hour maximum compound exposure time.'
      }
    ]
  },
  {
    id: 'glass-body',
    label: 'Glass & Body Parts',
    icon: '🪟',
    color: '#4CAF50',
    bannerImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=80',
    bannerTitle: 'Glass, Stampings & Body Parts',
    bannerSubtitle: 'Automotive glass, sheet metal stampings, plastics, and body-in-white components — furnace, press, and coating risks.',
    aogPerils: [
      {
        id: 'gb-aog-1',
        title: 'Earthquake — Glass Float Line & Furnace Damage',
        severity: 'critical',
        description: 'Automotive glass float lines operate continuously at 1,100°C. The glass tank (holding 2,000+ tonnes of molten glass) is extremely sensitive to seismic movement — even minor cracks in the tank wall allow molten glass escape destroying the entire line. Float line rebuild: 12-18 months, ₹500-1,000 Cr. India has only 4 float glass manufacturers — loss of one creates industry-wide shortage.',
        impactAreas: ['Glass Tank Breach', 'Molten Glass Escape', 'Tin Bath Solidification', 'Complete Line Destruction', 'Industry Supply Shortage'],
        typicalClaim: '₹200–800 Cr + 12-18 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'gb-naog-1',
        title: 'Glass Furnace Crown / Sidewall Failure',
        severity: 'critical',
        description: 'Automotive glass melting furnaces operate continuously for 12-15 years (campaign life). Crown (roof) refractory degradation allows heat escape upward — eventual collapse drops refractory into the melt contaminating all production. Sidewall erosion below the glass line allows molten glass breach. Unplanned furnace shutdown (cold repair) takes 6-12 months and costs ₹200-500 Cr.',
        impactAreas: ['Crown Collapse', 'Sidewall Breach', 'Glass Quality Contamination', 'Unplanned Cold Repair', 'Auto OEM Supply Disruption'],
        typicalClaim: '₹100–500 Cr + 6-12 months BI'
      },
      {
        id: 'gb-naog-2',
        title: 'Sheet Metal Press/Die Failure',
        severity: 'high',
        description: 'Transfer presses (800-2,500 tonne) for body panels and structural stampings operate at 8-15 strokes/minute under severe mechanical stress. Die cracking from thermal fatigue, press slide failure, or transfer system collision destroys both press and die. Single dies cost ₹50 Lakh-5 Cr with 6-12 week replacement. Multi-OEM supply impact if press is shared across platforms.',
        impactAreas: ['Die Fracture', 'Press Mechanical Failure', 'Transfer System Crash', 'Multi-OEM Production Impact', 'Quality Rejection Cascade'],
        typicalClaim: '₹10–60 Cr + 1-4 months BI'
      },
      {
        id: 'gb-naog-3',
        title: 'Paint/Coating Line Fire — E-coat & Powder',
        severity: 'high',
        description: 'Component coating operations (e-coat, powder coat, wet paint) for stamped parts involve oven baking at 180-200°C. Powder over-spray accumulation, solvent-based primer mist, and oven conveyor jams create fire sources. Component painting booths with recirculation often operate near LEL limits. Fire in a coating line contaminates the entire clean painting environment.',
        impactAreas: ['Oven Fire', 'Powder Booth Explosion', 'Clean Environment Contamination', 'Conveyor System Damage', 'Production Line Shutdown'],
        typicalClaim: '₹10–50 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Glass Furnace Failure', prob: 1, impact: 3, score: 3, emv: '₹350 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP with 18-month indemnity; thermal monitoring + campaign management', owner: 'Glass Plant Director', trigger: 'Crown temperature >1,580°C or sidewall thermocouple anomaly' },
      { risk: 'Press/Die Failure', prob: 2, impact: 2, score: 4, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.schulergroup.com', strategyTooltip: 'Die life tracking + press vibration monitoring + transfer system alignment checks', owner: 'Stamping Head', trigger: 'Die at 80% campaign or press vibration >6 mm/s' },
      { risk: 'Coating Line Fire', prob: 2, impact: 2, score: 4, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'LEL monitoring + oven cleaning schedule + powder booth housekeeping + suppression', owner: 'Coating Line Head', trigger: 'LEL >30% or powder accumulation >2mm' },
    ],
    caseStudy: {
      title: 'Saint-Gobain Sriperumbudur — Glass Float Line Campaign End Failure',
      location: 'Saint-Gobain Glass India, Sriperumbudur, Tamil Nadu',
      date: 'August 2022',
      loss: '₹280 Cr (cold repair + BI)',
      rootCause: 'The glass melting furnace (at year 14 of planned 15-year campaign) developed accelerating sidewall erosion below the glass line in Zone 2. Despite monitoring showing erosion approaching minimum thickness, the decision to extend campaign life by 6 months (to align with monsoon-free construction window) led to a breakthrough event. Molten glass at 1,400°C escaped through the sidewall, flowing across the plant floor and solidifying over 500 m². The furnace had to be drained and shut for cold repair.',
      impact: 'Complete furnace shutdown: 10 months (drain + demolition + rebuild + heat-up + stabilization). Revenue loss: ₹200 Cr. Repair cost: ₹80 Cr. Auto OEMs (Hyundai, Maruti, Tata) faced windshield/window shortage for 3 months before imports stabilized supply. Saint-Gobain subsequently committed to hard-stop at year 14 regardless of apparent remaining life.',
      lessons: [
        'Hard campaign stop: no extensions beyond 95% of design life regardless of condition assessment',
        'Sidewall thickness monitoring frequency doubles in final 2 years of campaign',
        'Drain contingency plan pre-positioned from year 12 (materials, contractors on standby)',
        'Alternative glass supply agreements activated 6 months before planned campaign end',
        'Insurance notification required when furnace enters final 20% of campaign life'
      ],
      benchmark: 'AGC (Japan) operates all float lines with hard campaign stop at year 13 (of 15-year design), accepting 2 years of remaining life as safety margin — zero unplanned shutdowns in 20 years across 30+ lines.'
    },
    emergingRisks: [
      {
        id: 'gb-er-1',
        title: 'Smart Glass / HUD Windshields — New Failure Modes',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'Next-generation automotive glass incorporates electronics: heated windshields, HUD (Head-Up Display) reflective layers, integrated antennas (5G/V2X), and electrochromic dimming. Manufacturing defects in these complex laminates create new failure modes: delamination, electrical short, antenna interference. Product liability extends from passive glass to active electronic component.',
        implications: ['Delamination failures in smart glass layers', 'Electrical short-circuit in heated glass causing fire', 'HUD distortion from manufacturing defects', 'Antenna performance variability from production tolerance', 'Product liability shift from passive to active component']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'gb-ni-1',
        title: 'Float Glass Industry Concentration Risk',
        category: 'Industry Structure',
        description: 'India has only 4 float glass manufacturers (Saint-Gobain, Asahi/AGC, Gold Plus, Borosil). Loss of any one creates severe supply shortage affecting entire auto industry. No quick alternative — new float line takes 3 years from decision to production. Import dependency for auto-grade glass is limited by quality specifications and logistics constraints.',
        mitigation: 'Long-term supply agreements, multi-source qualification (minimum 2 approved suppliers), strategic glass inventory at OEM level, import channels established for emergency supply, industry advocacy for new float line capacity',
        exposure: '₹2,000-5,000 Cr industry-wide (loss of single float line scenario for 12 months)'
      }
    ],
    bestPractices: [
      {
        id: 'gb-bp-1',
        title: 'Glass Furnace Campaign Management',
        standard: 'Glass Manufacturing Industry Council (GMIC) + AISE/AIST Guidelines',
        description: 'Managing the most expensive and longest-lead-time asset in auto glass supply chain — the float glass melting furnace.',
        recommendations: [
          'Hard campaign stop at 95% of design life — no extensions under any circumstances',
          'Sidewall thickness monitoring: quarterly in years 1-10, monthly in years 11-14',
          'Crown temperature mapping (IR scanner) daily — trending for hot spots',
          'Thermal model of remaining life updated annually from year 10 onward',
          'Cold repair planning starts at year 12: materials procurement, contractor selection',
          'Alternative supply chain activated 6 months before planned end-of-campaign',
          'Insurance notification at year 12 with updated PML assessment for aging furnace'
        ],
        benchmark: 'AGC Glass (Japan) 20-year record of zero unplanned furnace shutdowns through hard campaign stops and proactive monitoring — their cold repair planning starts 3 years before execution.'
      }
    ]
  }
]
