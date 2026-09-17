// Electronics Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const ELECTRONICS_RISK_SOURCES: RiskSource[] = [
  {
    id: 'semiconductor',
    label: 'Semiconductor & Fab',
    icon: '🔬',
    color: '#1565C0',
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    bannerTitle: 'Semiconductor & Fab Operations',
    bannerSubtitle: 'Wafer fabrication, ATMP (Assembly/Test/Mark/Pack), and clean room operations — ultra-sensitive to contamination, vibration, and chemical hazards.',
    aogPerils: [
      {
        id: 'semi-aog-1',
        title: 'Earthquake — Clean Room & Tool Misalignment',
        severity: 'critical',
        description: 'Semiconductor fabs operate with sub-micron precision. Even micro-vibrations from a distant earthquake cause tool misalignment, wafer breakage, and clean room integrity loss. A magnitude 4.0 event 50 km away can halt production for days. The 2024 Taiwan TSMC earthquake caused $200M+ losses from wafer breakage and tool recalibration. India\'s planned fabs (Tata-PSMC Gujarat, Micron Sanand) are in seismic Zone III.',
        impactAreas: ['Lithography Tool Misalignment', 'Wafer Breakage (WIP worth ₹100-500 Cr)', 'Clean Room Integrity Loss', 'Chemical Delivery System Leak', 'Vibration-Sensitive Equipment Damage'],
        typicalClaim: '₹200–2,000 Cr + 1-6 months BI'
      },
      {
        id: 'semi-aog-2',
        title: 'Flood — Sub-Fab & Chemical Delivery Damage',
        severity: 'critical',
        description: 'Semiconductor fabs have extensive sub-fab infrastructure (chemical delivery, waste treatment, gas cabinets) below the clean room floor. Flooding destroys this infrastructure completely. Deionized water systems, chemical mechanical planarization (CMP) tools, and gas purification systems cannot be dried — they must be replaced. Clean room requalification after flood: 3-6 months minimum.',
        impactAreas: ['Sub-Fab Infrastructure Destruction', 'Chemical Contamination', 'Clean Room Requalification (months)', 'Gas System Replacement', 'DI Water System Loss'],
        typicalClaim: '₹500–5,000 Cr + 3-12 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'semi-naog-1',
        title: 'Clean Room Contamination Event',
        severity: 'critical',
        description: 'A single contamination event (particle count excursion, molecular contamination, chemical spill) in a semiconductor clean room can destroy all Work-in-Process wafers (₹100-500 Cr WIP value in a single fab). Sources: HVAC filter failure, human error (improper gowning), chemical cross-contamination, or construction activity vibration. A 2019 Samsung Austin fab contamination destroyed 3 months of wafer production.',
        impactAreas: ['WIP Total Loss (₹100-500 Cr)', 'Extended Clean Room Recovery', 'Customer Allocation Loss', 'Yield Recovery Period (weeks)', 'Market Share Impact'],
        typicalClaim: '₹100–1,000 Cr + 1-3 months BI'
      },
      {
        id: 'semi-naog-2',
        title: 'Hazardous Gas Leak — Silane/Arsine/Phosphine',
        severity: 'critical',
        description: 'Semiconductor fabs use highly toxic and pyrophoric gases: silane (SiH4 — spontaneously ignites in air), arsine (AsH3 — lethal at 10 ppm), phosphine (PH3 — lethal at 50 ppm), and fluorine compounds (ClF3 — reacts explosively with most materials). A gas cabinet leak or delivery system failure creates immediate life-safety and environmental emergency. Silane release creates fireball + silica dust contamination.',
        impactAreas: ['Worker Fatality (toxic gas)', 'Silane Fireball', 'Clean Room Contamination', 'Regulatory Shutdown', 'Community Evacuation'],
        typicalClaim: '₹50–500 Cr + regulatory + liability'
      },
      {
        id: 'semi-naog-3',
        title: 'EUV/DUV Lithography Tool Damage',
        severity: 'critical',
        description: 'EUV lithography tools (ASML, ₹800-1,500 Cr each) are the most expensive single machines in manufacturing. Any contamination of EUV optics, laser source failure, or mechanical damage requires ASML field service (months of wait time). A single EUV tool serves as bottleneck for entire product line. DUV tools (₹100-300 Cr) are also single-source and long-lead-time.',
        impactAreas: ['Optics Contamination (months to repair)', 'Laser Source Failure', 'Stage Mechanism Damage', 'Entire Product Line Halt', 'Market Share Loss to Competitors'],
        typicalClaim: '₹200–1,500 Cr + 3-12 months BI'
      },
      {
        id: 'semi-naog-4',
        title: 'Power Quality Event — Voltage Sag/Interruption',
        severity: 'high',
        description: 'Semiconductor fabs require 99.9999% (six nines) power reliability. Even a 100-millisecond voltage sag crashes process tools, destroys in-process wafers, and requires 4-8 hours of tool requalification per event. A full power outage (even 1 second) can destroy ₹10-50 Cr of WIP and take 24-48 hours to restart all tools. UPS/battery systems provide bridge power but have finite hold-up time.',
        impactAreas: ['WIP Wafer Loss (per event)', 'Tool Requalification Downtime', 'Process Recipe Loss', 'Yield Depression (days)', 'Utility System Cascade Trip'],
        typicalClaim: '₹10–100 Cr per event'
      }
    ],
    riskMatrix: [
      { risk: 'Clean Room Contamination', prob: 2, impact: 3, score: 6, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.semi.org', strategyTooltip: 'Multi-level filtration + AMC monitoring + strict gowning protocol + vibration isolation', owner: 'Fab Director', trigger: 'Particle count excursion or AMC level above spec' },
      { risk: 'Hazardous Gas Leak', prob: 1, impact: 3, score: 3, emv: '₹275 Cr', strategy: 'Avoid', strategyUrl: 'https://www.semi.org/en/standards/semi-s2', strategyTooltip: 'SEMI S2 compliance + gas cabinet redundancy + toxic gas monitoring + SIL-rated shutoff', owner: 'EHS Director', trigger: 'ANY toxic gas alarm above action level' },
      { risk: 'EUV/DUV Tool Damage', prob: 1, impact: 3, score: 3, emv: '₹850 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.asml.com', strategyTooltip: 'ASML service contract + tool environmental monitoring + spare parts strategy + vibration control', owner: 'Lithography Head', trigger: 'Tool performance deviation or environmental spec excursion' },
      { risk: 'Power Quality Event', prob: 3, impact: 2, score: 6, emv: '₹55 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.semi.org/en/standards/semi-f47', strategyTooltip: 'SEMI F47 compliance + UPS + dual feed + ride-through capability + PQ monitoring', owner: 'Facilities Head', trigger: 'Any voltage event below SEMI F47 curve' },
      { risk: 'Flood (Sub-Fab)', prob: 1, impact: 3, score: 3, emv: '₹2,500 Cr', strategy: 'Avoid', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Site selection above flood plain + flood barriers + elevated sub-fab design + no below-grade', owner: 'Plant Director', trigger: 'ANY water intrusion into sub-fab level' },
    ],
    caseStudy: {
      title: 'Samsung Austin (USA) — Clean Room Contamination from Winter Storm',
      location: 'Samsung Austin Semiconductor, Austin, Texas, USA',
      date: 'February 2021',
      loss: '$300M+ (WIP + recovery + lost revenue)',
      rootCause: 'Winter Storm Uri caused extended power outage (5 days) at the Samsung fab. When power was restored, the clean room HVAC system had accumulated moisture and particulate contamination during the outage. Tools that had been in standby without proper nitrogen purge developed internal contamination. The restart process took 2 months to achieve pre-storm yield levels. All in-process wafers (3+ months of production pipeline) were scrapped — representing hundreds of millions of dollars in WIP value.',
      impact: 'All WIP wafers scrapped (estimated $200M+). 2-month ramp to pre-storm yields. Global NAND flash and logic chip supply tightened for 6 months. Samsung lost $300M+ in combined property damage, WIP loss, and lost revenue. Customer allocation shifted to competitors during recovery. The event demonstrated how a single power/environmental failure cascades through semiconductor operations.',
      lessons: [
        'Fab environmental systems must maintain minimum clean room conditions even during power outage',
        'Tool nitrogen purge must be maintained by backup systems during any facility outage',
        'WIP evacuation/protection protocol for extended facility shutdown scenarios',
        'Dual-feed utility redundancy — fab-critical systems on separate infrastructure',
        'Business Interruption from WIP loss >> property damage in semiconductor (10-50x ratio)'
      ],
      benchmark: 'TSMC (Taiwan) maintains all clean rooms at ISO 5 or better during Typhoon power outages through: dedicated backup generators per fab + 72-hour fuel reserve + automatic load shedding that protects clean room priority.'
    },
    emergingRisks: [
      {
        id: 'semi-er-1',
        title: 'India Fab Ecosystem — First-Generation Manufacturing Risk',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2030',
        description: 'India\'s semiconductor mission (Tata-PSMC, Micron ATMP, CG Power OSAT) introduces fab manufacturing for the first time. First-generation operations face: workforce learning curve, supply chain immaturity (chemicals, gases, spare parts), inadequate clean room construction quality, and unknown local environmental factors (dust, humidity, vibration from road traffic).',
        implications: ['Lower initial yields than mature fabs (30-50% vs 90%+)', 'Chemical/gas supply chain unreliability', 'Workforce inexperience causing contamination events', 'Unknown local vibration/environmental challenges', 'Insurance capacity constraints for novel Indian fab risk']
      },
      {
        id: 'semi-er-2',
        title: 'Advanced Packaging (Chiplet) — New Failure Modes',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Advanced packaging (chiplets, 2.5D/3D integration, CoWoS) creates new failure modes: thermal stress from heterogeneous materials, micro-bump fatigue, warpage from mismatch of expansion coefficients, and underfill delamination. These high-value assembled packages (₹50,000-5,00,000 each) have failure modes not seen in traditional wire-bond packaging.',
        implications: ['New thermal/mechanical failure modes', 'Higher per-unit value at risk during assembly', 'Yield learning curve for novel processes', 'Quality liability for field failures in advanced packages', 'Limited repair/rework capability for chiplet assemblies']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'semi-ni-1',
        title: 'Geopolitical Technology Access Restriction',
        category: 'Geopolitical / Regulatory',
        description: 'US CHIPS Act export controls restrict advanced semiconductor equipment/technology to certain countries. India\'s fab plans could face equipment access limitations if geopolitical alignment shifts. ASML EUV tools require US/Netherlands government export license. A denied license makes the entire fab investment (₹50,000-1,00,000 Cr) worthless.',
        mitigation: 'Government-to-government technology agreements, mature node focus (28nm+) less restricted, multiple equipment supplier qualification, domestic equipment development (long-term), strategic alignment with equipment-origin countries',
        exposure: '₹50,000-1,00,000 Cr (stranded fab investment if technology access denied)'
      },
      {
        id: 'semi-ni-2',
        title: 'Water Scarcity for Fab Operations',
        category: 'Resource / Environmental',
        description: 'Semiconductor fabs consume 10,000-50,000 m³/day of ultra-pure water (UPW). India\'s planned fabs are in water-stressed Gujarat. Competition with agriculture for groundwater, monsoon variability, and CGWA restrictions could limit water availability. A fab cannot operate without UPW — any water curtailment is a production stop.',
        mitigation: 'Dedicated water infrastructure (reservoir, pipeline from distant source), maximum water recycling (90%+), rainwater harvesting, treated sewage reuse for non-UPW applications, government water allocation agreement',
        exposure: '₹1,000-5,000 Cr/year production loss from water curtailment scenario'
      }
    ],
    bestPractices: [
      {
        id: 'semi-bp-1',
        title: 'Semiconductor Fab Fire & Life Safety',
        standard: 'SEMI S2 + FM Global DS 7-7 (Semiconductor) + NFPA 318 (Clean Room) + SEMI S14',
        description: 'Fire and contamination prevention for the highest-value-per-m² manufacturing facilities in the world.',
        recommendations: [
          'SEMI S2 compliance for ALL process tools — fire suppression + gas shutoff integrated',
          'Sub-fab suppression: clean agent (Novec 1230) for electrical/chemical areas',
          'Toxic gas monitoring: continuous, with emergency shutdown at 50% of TLV-TWA',
          'Clean room smoke detection: high-sensitivity aspirating (VESDA) with 0.005% obscuration alarm',
          'Power quality per SEMI F47: UPS + diesel generator with <10ms transfer time',
          'Vibration isolation: VC-E or better for lithography tools, monitoring 24/7',
          'Chemical delivery: double-contained with leak detection + auto-isolation',
          'Seismic design: SDS ≥ 0.5g for tool anchoring, gas cabinet seismic switches'
        ],
        benchmark: 'TSMC achieves 99.5%+ fab uptime through: SEMI S2/S14 full compliance + dual-redundant utilities + 72-hour backup systems + real-time environmental monitoring at 10,000+ points per fab.'
      }
    ]
  },
  {
    id: 'ems-pcb',
    label: 'EMS & PCB Assembly',
    icon: '🔧',
    color: '#059669',
    bannerImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&q=80',
    bannerTitle: 'Electronics Manufacturing Services & PCB Assembly',
    bannerSubtitle: 'SMT assembly, through-hole, testing, and box-build — the backbone of India\'s electronics manufacturing ecosystem.',
    aogPerils: [
      {
        id: 'ems-aog-1',
        title: 'Flood — SMT Line & Component Inventory Damage',
        severity: 'critical',
        description: 'EMS facilities store ₹50-200 Cr of electronic components (ICs, passives, connectors) sensitive to moisture. SMT machines installed at floor level are destroyed by even 10cm of water. Component moisture sensitivity levels (MSL 1-6) mean that flood-exposed components cannot be used — entire inventory becomes scrap. The 2015 Chennai floods destroyed 15+ electronics factories in Oragadam/Sriperumbudur.',
        impactAreas: ['SMT Machine Submersion (₹5-20 Cr each)', 'Component Inventory Total Loss', 'AOI/ICT Equipment Damage', 'Clean Room Contamination', 'Multi-OEM Supply Disruption'],
        typicalClaim: '₹30–200 Cr + 3-6 months BI'
      },
      {
        id: 'ems-aog-2',
        title: 'Lightning — Multi-System Surge Damage',
        severity: 'medium',
        description: 'Electronics factories with sensitive equipment are highly vulnerable to lightning-induced surges. A single event can damage multiple SMT lines, test equipment, and programming stations simultaneously through power and data cables. Southern and eastern India (major electronics hubs) have high lightning density (>50 strikes/km²/year).',
        impactAreas: ['Multiple SMT Line Damage', 'Test Equipment Failure', 'Server/Data System Loss', 'Production Management System Crash', 'Component Latch-up Damage'],
        typicalClaim: '₹5–40 Cr + 2-6 weeks BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'ems-naog-1',
        title: 'SMT Reflow Oven Fire — Flux Accumulation',
        severity: 'high',
        description: 'Reflow ovens operate at 250-270°C peak to melt solder paste. Flux residue accumulates in the cooling zone, exhaust filters, and condensation traps. Neglected cleaning allows buildup to ignite from oven heat. Fire in the oven creates soot contamination of the entire clean production area (weeks of cleaning). Board jams in oven create localized high temperature causing PCB ignition.',
        impactAreas: ['Oven Internal Fire', 'Soot Contamination (clean area)', 'Adjacent Line Damage', 'Production Area Shutdown', 'Board/Component WIP Loss'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      },
      {
        id: 'ems-naog-2',
        title: 'ESD Mass Failure Event — Latent Damage',
        severity: 'high',
        description: 'Electrostatic discharge (ESD) damages semiconductor devices. A systematic ESD control failure (humidity drop <30%, grounding failure, non-compliant packaging material) causes latent damage to thousands of assembled PCBs. Latent damage manifests as field failures 6-18 months later — triggering product recalls. A single ESD event affecting a month of production creates ₹50-200 Cr recall liability.',
        impactAreas: ['Latent Component Damage (undetectable)', 'Field Failure Epidemic (6-18 months later)', 'Product Recall', 'Customer Debit/Penalty', 'Loss of Qualified Supplier Status'],
        typicalClaim: '₹50–300 Cr (recall + warranty + penalties)'
      },
      {
        id: 'ems-naog-3',
        title: 'Component Counterfeit / Quality Escape',
        severity: 'high',
        description: 'Indian electronics supply chain has significant counterfeit component infiltration (estimated 5-10% of open-market components). Counterfeit ICs/passives pass incoming inspection but fail in field. A single counterfeit component batch entering production can affect 10,000-100,000 assembled products requiring field replacement. Medical and automotive electronics face highest liability from counterfeits.',
        impactAreas: ['Field Failure from Counterfeit Parts', 'Mass Product Recall', 'Customer/End-User Injury (medical/auto)', 'Supply Chain Reputation Damage', 'Criminal/Regulatory Investigation'],
        typicalClaim: '₹20–200 Cr (recall + liability + brand damage)'
      }
    ],
    riskMatrix: [
      { risk: 'Flood (Facility + Components)', prob: 2, impact: 3, score: 6, emv: '₹115 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP + elevated SMT installation + climate-controlled component storage above flood level', owner: 'Plant Head', trigger: 'Heavy rainfall >100mm/24hr or flood warning' },
      { risk: 'ESD Mass Failure', prob: 1, impact: 3, score: 3, emv: '₹125 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.esda.org', strategyTooltip: 'ESD audit program + humidity control + continuous monitoring + training', owner: 'Quality Head', trigger: 'Humidity <35% or ionizer/grounding failure' },
      { risk: 'SMT Oven Fire', prob: 2, impact: 2, score: 4, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ipc.org', strategyTooltip: 'Weekly oven cleaning + exhaust maintenance + board jam detection + suppression', owner: 'SMT Line Head', trigger: 'Oven cleaning overdue or exhaust temperature anomaly' },
      { risk: 'Counterfeit Components', prob: 2, impact: 2, score: 4, emv: '₹110 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.gidep.org', strategyTooltip: 'Authorized distributor only + incoming X-ray/decap + lot traceability + SAE AS6171', owner: 'Procurement Head', trigger: 'Any open-market purchase or non-authorized source' },
    ],
    caseStudy: {
      title: 'Dixon Technologies — ESD Control Failure Causing Field Returns',
      location: 'Dixon Technologies, Noida, UP',
      date: 'March 2023',
      loss: '₹45 Cr (warranty + recall + customer penalty)',
      rootCause: 'Air conditioning system failure during a hot weekend (Saturday-Sunday) caused production floor humidity to drop to 22% (requirement: >40%). Monday morning production resumed without humidity verification. 3 SMT lines operated for 8 hours at non-compliant humidity. ESD damage to MOSFET gate oxides was not detectable by standard electrical test. 15,000 PCBs shipped to consumer electronics OEM. Field failures emerged 4-6 months later — 12% failure rate vs normal 0.1%.',
      impact: 'Product recall: 15,000 units (₹20 Cr logistics + replacement). Customer penalty: ₹15 Cr (late delivery + warranty). Internal scrap and rework: ₹5 Cr. Reputation damage: lost 2 new product qualifications. Dixon subsequently invested ₹3 Cr in continuous ESD monitoring system with automatic line lockout on excursion.',
      lessons: [
        'Humidity monitoring with AUTOMATIC line lockout below 35% — no manual override',
        'Monday morning pre-production checklist must include ESD parameter verification',
        'Weekend HVAC must maintain minimum humidity even if production is off',
        'ESD-sensitive product cannot be processed within 4 hours of humidity excursion without assessment',
        'ESD audit frequency: weekly measurement + continuous monitoring + quarterly third-party audit'
      ],
      benchmark: 'Foxconn mandates continuous ESD parameter monitoring at every workstation with real-time dashboard — any excursion automatically pauses the affected line and alerts management within 30 seconds. Zero ESD-related field returns in compliant facilities.'
    },
    emergingRisks: [
      {
        id: 'ems-er-1',
        title: 'AI/ML Manufacturing — Quality Prediction Over-Reliance',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'EMS companies adopting AI for quality prediction (reducing physical inspection). Risk: model drift causing undetected quality escape. AI trained on historical data may not detect novel failure modes. Over-reliance on AI inspection reduces human expert capability. A systematic AI false-pass could ship millions of defective products before detection.',
        implications: ['AI false-pass causing mass quality escape', 'Model drift going undetected for months', 'Reduced human inspection expertise (deskilling)', 'Liability allocation: AI vendor vs EMS vs OEM', 'Regulatory acceptance uncertainty for AI-only inspection']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'ems-ni-1',
        title: 'OEM In-Sourcing / Reshoring Threat',
        category: 'Market / Strategic',
        description: 'Major electronics OEMs (Apple, Samsung, Xiaomi) increasingly in-sourcing previously outsourced manufacturing. Apple building own display factories, Samsung reducing EMS dependency. Government PLI schemes incentivize OEM direct investment over EMS partnerships. Indian EMS companies face existential risk if top-3 customers in-source.',
        mitigation: 'ODM (Original Design Manufacturing) capability building, diversified customer base (no >30% single customer), vertical integration (component manufacturing), service differentiation (engineering, after-sales), multi-industry presence (auto electronics, defence)',
        exposure: '₹500-3,000 Cr revenue loss per large EMS if major customer in-sources'
      },
      {
        id: 'ems-ni-2',
        title: 'Component Obsolescence & Allocation',
        category: 'Supply Chain',
        description: 'Electronic components have 3-7 year life cycles. End-of-life (EOL) notifications can strand production of long-lifecycle products (industrial, auto, defence). During shortages (2021 chip crisis), allocation cuts hit EMS companies hardest (OEMs get priority). No insurance product covers component unavailability or obsolescence.',
        mitigation: 'Lifetime buy strategy for EOL components, design-for-availability (multi-source components), strong distributor relationships for allocation priority, component banking/bonded inventory programs',
        exposure: '₹50-300 Cr per company from allocation cuts or forced redesigns'
      }
    ],
    bestPractices: [
      {
        id: 'ems-bp-1',
        title: 'ESD Control Program',
        standard: 'IEC 61340-5-1 + ANSI/ESD S20.20 + IPC-A-610',
        description: 'Preventing the most expensive latent quality failure mode in electronics manufacturing — electrostatic discharge damage.',
        recommendations: [
          'Continuous humidity monitoring with AUTOMATIC line lockout below 35% RH',
          'Floor/bench resistance measurement weekly: 1×10⁶ to 1×10⁹ Ω per IEC 61340',
          'Ionizer performance verification: offset voltage <±35V, decay time <2 seconds',
          'Personnel grounding: continuous wrist strap monitors at every workstation',
          'Packaging material audit: all ESD-sensitive items in shielding bags (not just anti-static)',
          'ESD audit: weekly self-audit + quarterly third-party per ANSI/ESD S20.20',
          'New material/process ESD risk assessment before introduction to production',
          'Weekend/holiday HVAC must maintain minimum humidity (no cost-saving HVAC shutdown)'
        ],
        benchmark: 'Foxconn/Wistron achieve <0.01% ESD-related field failure rate through: continuous monitoring + automatic lockout + quarterly certification audit — representing best-in-class for high-volume electronics manufacturing.'
      }
    ]
  },
  {
    id: 'consumer-electronics',
    label: 'Consumer Electronics',
    icon: '📱',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80',
    bannerTitle: 'Consumer Electronics Manufacturing',
    bannerSubtitle: 'Smartphones, TVs, appliances, and wearables — high-volume assembly with lithium battery, product liability, and warehouse fire risks.',
    aogPerils: [
      {
        id: 'ce-aog-1',
        title: 'Flood — Finished Goods & Component Warehouse',
        severity: 'critical',
        description: 'Consumer electronics warehouses store ₹100-1,000 Cr of inventory (seasonal buildup for Diwali/festive sales). Electronics are destroyed by any water contact — even humidity damage is irrecoverable. The 2015 Chennai floods destroyed ₹2,000+ Cr of electronics inventory across OEM/distributor warehouses. Festive season stock loss means irrecoverable revenue for that year.',
        impactAreas: ['Finished Goods Total Loss', 'Component Inventory Destruction', 'Seasonal Revenue Loss (irrecoverable)', 'Customer Order Default', 'Market Share to Competitors'],
        typicalClaim: '₹100–1,000 Cr (stock) + lost seasonal revenue'
      }
    ],
    nonAogPerils: [
      {
        id: 'ce-naog-1',
        title: 'Lithium Battery Thermal Runaway — Assembly & Storage',
        severity: 'critical',
        description: 'Smartphones, laptops, and wearables contain lithium-ion batteries that can undergo thermal runaway from manufacturing defects, mechanical damage, or charging failures. During assembly (battery insertion, charging test) and storage (thousands of devices with charged batteries), a single cell failure can propagate through adjacent inventory. Li-ion fires release toxic HF gas and are extremely difficult to suppress.',
        impactAreas: ['Battery Fire During Assembly', 'Warehouse Fire from Stored Devices', 'Toxic HF Gas Release', 'Mass Product Recall', 'Production Line Contamination'],
        typicalClaim: '₹30–300 Cr + recall liability'
      },
      {
        id: 'ce-naog-2',
        title: 'Warehouse / Distribution Center Fire',
        severity: 'critical',
        description: 'Electronics warehouses combine high combustible load (cardboard packaging, expanded polystyrene, plastic housings) with lithium battery ignition sources. Fire spreads rapidly through cardboard-packed electronics stacked 6-10m high. A single warehouse can hold ₹500-2,000 Cr of seasonal inventory. Standard sprinklers are overwhelmed by the rapid heat release rate. Total warehouse loss is common.',
        impactAreas: ['Total Inventory Destruction', 'Building Collapse', 'Li-Ion Battery Cascade', 'Toxic Fume Release', 'Supply Chain Disruption (months)'],
        typicalClaim: '₹200–2,000 Cr (stock + building + BI)'
      },
      {
        id: 'ce-naog-3',
        title: 'Product Recall — Battery/Safety Defect',
        severity: 'high',
        description: 'Consumer electronics product recalls for safety defects (battery overheating, electrical shock, fire risk) affect millions of units. Samsung Galaxy Note 7 recall (2016) cost $5.3 billion. Indian brands face growing recall exposure as volumes scale. A recall of 1 million smartphones at ₹2,000/unit handling = ₹200 Cr direct cost, plus brand damage.',
        impactAreas: ['Mass Product Recall Cost', 'Brand Value Destruction', 'Regulatory Action (BIS)', 'Retailer Relationship Damage', 'Stock Price Impact'],
        typicalClaim: '₹100–5,000 Cr (Samsung Note 7 precedent)'
      }
    ],
    riskMatrix: [
      { risk: 'Warehouse Fire (Electronics)', prob: 2, impact: 3, score: 6, emv: '₹600 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'ESFR sprinklers + compartments + Li-ion storage protocol + VESDA', owner: 'Supply Chain Head', trigger: 'Any fire/smoke detection in electronics warehouse' },
      { risk: 'Li-Ion Thermal Runaway', prob: 2, impact: 3, score: 6, emv: '₹165 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ul.com/resources/ul-2054', strategyTooltip: 'Battery testing per IEC 62133 + thermal monitoring during charge + fire-rated storage', owner: 'Battery Safety Lead', trigger: 'Any battery temperature >60°C or swelling detected' },
      { risk: 'Flood (Seasonal Stock)', prob: 2, impact: 3, score: 6, emv: '₹550 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Stock-in-trade cover + elevated warehouse + distribution across multiple locations', owner: 'Logistics Director', trigger: 'Monsoon forecast + stock concentration at single location' },
      { risk: 'Product Recall (Battery)', prob: 1, impact: 3, score: 3, emv: '₹1,500 Cr', strategy: 'Transfer', strategyUrl: 'https://www.agcs.allianz.com', strategyTooltip: 'Product recall insurance + IEC 62133 compliance + 100% battery incoming test', owner: 'Quality Director', trigger: 'Any field failure pattern indicating systematic battery defect' },
    ],
    caseStudy: {
      title: 'Samsung Galaxy Note 7 — Battery Thermal Runaway Recall',
      location: 'Global (Samsung SDI + ATL batteries, assembled Vietnam/Korea)',
      date: 'September 2016',
      loss: '$5.3 Billion (recall + lost revenue + brand)',
      rootCause: 'Battery design defect: Samsung SDI batteries had insufficient clearance between positive electrode and separator edge, causing internal short circuit under charging stress. ATL replacement batteries had different defect: welding burrs on positive tab penetrating separator. Both defects caused thermal runaway during normal charging. 2.5 million units recalled in two phases. FAA banned the device from all flights.',
      impact: 'Total recall: 2.5 million units. Direct cost: $2.3B (recall logistics + replacement). Lost revenue: $2B (production halt + market share loss). Brand damage: immeasurable. Samsung SDI stock dropped 8%. Galaxy Note brand discontinued for 2 years. Most expensive consumer electronics recall in history.',
      lessons: [
        'Battery quality verification must go beyond standard IEC 62133 — additional stress testing required',
        'Dual-source battery strategy must include independent failure mode analysis for each source',
        'Recall response speed is critical — delayed action amplified Samsung\'s loss 5x',
        'Product liability insurance essential for any company shipping lithium batteries to consumers',
        'Manufacturing traceability (cell → pack → device → customer) enables targeted recall reducing cost'
      ],
      benchmark: 'Apple conducts 8-week battery qualification (beyond IEC 62133) with proprietary stress protocols, X-ray inspection of every cell, and maintains 100% cell-to-device traceability enabling surgical recalls (specific lots only) vs Samsung\'s full-population recall.'
    },
    emergingRisks: [
      {
        id: 'ce-er-1',
        title: 'Right to Repair & Extended Producer Responsibility',
        category: 'regulatory',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'India implementing e-waste EPR mandates. Right-to-repair regulations (EU leading, India following) require manufacturers to provide spare parts and repair documentation for 7-10 years. This creates: extended product liability period, obligation to maintain spare parts inventory, and liability for third-party repairs gone wrong. Cost of EPR compliance: ₹50-200 Cr/year for large electronics brands.',
        implications: ['Extended product liability period (7-10 years)', 'Spare parts inventory carrying cost', 'Third-party repair liability exposure', 'E-waste collection and recycling infrastructure cost', 'Design-for-repair increasing manufacturing complexity']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'ce-ni-1',
        title: 'Technology Obsolescence & Inventory Write-Down',
        category: 'Market / Technology',
        description: 'Consumer electronics depreciate 2-5% per month after launch. Unsold inventory (common in India\'s fragmented distribution) becomes worthless within 6-12 months. A model that doesn\'t sell (wrong specs, competitor launches, pricing error) results in ₹100-500 Cr inventory write-down. The shift from 4G to 5G stranded ₹3,000+ Cr of Indian smartphone inventory in 2022.',
        mitigation: 'Just-in-time manufacturing, shorter product cycles, component commonality across models, aggressive markdown/exit strategy for slow movers, demand forecasting using AI/ML',
        exposure: '₹100-1,000 Cr per brand per technology transition'
      }
    ],
    bestPractices: [
      {
        id: 'ce-bp-1',
        title: 'Lithium Battery Safety in Manufacturing & Storage',
        standard: 'IEC 62133 + UL 2054 + UN 38.3 + NFPA 855',
        description: 'Safety engineering for the most critical emerging risk in consumer electronics — lithium-ion battery fires during manufacturing and storage.',
        recommendations: [
          'Incoming battery inspection: 100% OCV test + visual + X-ray sampling per IEC 62133',
          'Battery charging area: fire-rated separation from production + thermal monitoring per cell',
          'Storage: maximum 48-hour charged inventory in production area; bulk in dedicated building',
          'Thermal runaway containment: steel trays with sand/vermiculite under battery storage racks',
          'Fire suppression: water mist + Class D agent combination for Li-ion fires',
          'Shipping compliance: UN 38.3 + IATA DGR + ADR for lithium battery transport',
          'Traceability: cell supplier → pack assembly → device → customer (enables surgical recall)'
        ],
        benchmark: 'Apple battery safety protocol: 8-week qualification beyond IEC 62133, 100% X-ray at cell level, cell-level traceability, and dedicated fire-rated battery storage — zero production-related battery incidents across 200M+ devices/year.'
      }
    ]
  },
  {
    id: 'display-panel',
    label: 'Display & Panel',
    icon: '🖥️',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
    bannerTitle: 'Display & Panel Manufacturing',
    bannerSubtitle: 'LCD, OLED, and LED module assembly — clean room operations with chemical hazards, precision equipment, and high WIP value.',
    aogPerils: [
      {
        id: 'disp-aog-1',
        title: 'Earthquake — Clean Room & Precision Equipment',
        severity: 'high',
        description: 'Display panel manufacturing uses large-area glass substrates (Gen 8.5: 2.2m × 2.5m) processed in clean rooms with precision robots. Seismic vibration cracks glass substrates in process (WIP value ₹50-200 Cr), misaligns deposition equipment, and damages vacuum chambers. Display fabs in India (Vedanta-Foxconn planned) face seismic risk.',
        impactAreas: ['Glass Substrate Breakage', 'Deposition Tool Misalignment', 'Vacuum Chamber Damage', 'Clean Room Integrity Loss', 'WIP Total Loss'],
        typicalClaim: '₹100–500 Cr + 2-6 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'disp-naog-1',
        title: 'Chemical Spill — Etchant/Developer/Stripper',
        severity: 'high',
        description: 'Display manufacturing uses aggressive chemicals: HF (glass etching), TMAH (developer), NMP (stripper), and various acids/solvents. Chemical delivery system failures, over-filling, or seismic damage releases toxic/corrosive chemicals. HF is particularly dangerous — absorbed through skin causing systemic fluoride poisoning. A chemical spill contaminates clean room requiring complete decontamination.',
        impactAreas: ['Worker Chemical Exposure (HF lethal)', 'Clean Room Contamination', 'Equipment Corrosion', 'Environmental Discharge', 'Regulatory Shutdown'],
        typicalClaim: '₹20–100 Cr + 1-3 months BI'
      },
      {
        id: 'disp-naog-2',
        title: 'Vacuum Deposition System Failure',
        severity: 'high',
        description: 'OLED/TFT deposition tools (sputter, CVD, evaporation) operate at high vacuum with expensive target materials. Chamber leaks, target poisoning, or substrate breakage inside chamber contaminates the entire deposition system requiring weeks of recovery. Organic evaporation sources for OLED (proprietary materials worth ₹5-20 Cr per load) are destroyed if vacuum is lost.',
        impactAreas: ['Chamber Contamination', 'Target Material Loss', 'Organic Material Destruction', 'Extended Pump-Down Time', 'Yield Depression (weeks)'],
        typicalClaim: '₹10–80 Cr + 2-8 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'Chemical Spill (HF)', prob: 1, impact: 3, score: 3, emv: '₹60 Cr', strategy: 'Avoid', strategyUrl: 'https://www.semi.org/en/standards/semi-s2', strategyTooltip: 'Double-contained delivery + leak detection + HF-specific PPE + calcium gluconate at all HF points', owner: 'EHS Director', trigger: 'Any HF leak detection alarm or exposure incident' },
      { risk: 'Vacuum System Failure', prob: 2, impact: 2, score: 4, emv: '₹45 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.semi.org', strategyTooltip: 'Chamber leak rate monitoring + target life tracking + substrate handling optimization', owner: 'Process Head', trigger: 'Leak rate >1×10⁻⁸ mbar·L/s or target nearing end-of-life' },
      { risk: 'Earthquake (Glass Breakage)', prob: 1, impact: 3, score: 3, emv: '₹300 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Seismic isolation for clean room + substrate handling risk mitigation + WIP insurance', owner: 'Fab Director', trigger: 'Any seismic event in facility region' },
    ],
    caseStudy: {
      title: 'LG Display Paju — Chemical Leak Causing Worker Hospitalization',
      location: 'LG Display, Paju, South Korea',
      date: 'October 2022',
      loss: '₹30 Cr (production loss + response + compensation)',
      rootCause: 'A chemical delivery pipe for TMAH (Tetramethylammonium hydroxide, alkaline developer) developed a crack at a welded joint from thermal fatigue cycling. The leak released alkaline mist into the clean room. 8 workers exposed before detection — 3 hospitalized with chemical burns. Clean room shut for 5 days for decontamination and pipe system inspection across the entire fab.',
      impact: 'Production loss: ₹20 Cr (5 days). Medical/compensation: ₹5 Cr. Pipe system inspection and replacement: ₹5 Cr. Regulatory investigation delayed restart by additional 2 days. LG Display subsequently installed real-time chemical concentration monitoring at all pipe routes (not just end-use points).',
      lessons: [
        'Chemical delivery piping inspection must include thermal fatigue assessment at weld joints',
        'Chemical concentration monitoring along pipe routes — not only at points of use',
        'Double-containment mandatory for ALL corrosive/toxic chemical delivery piping in clean room',
        'Emergency shower/eye wash within 3 seconds walking distance of any chemical exposure point',
        'Chemical-specific PPE: face shield + chemical-resistant suit for HF/TMAH areas (not just gloves)'
      ],
      benchmark: 'Samsung Display uses fully welded orbital-welded chemical delivery (zero threaded joints), with real-time leak detection at every 5m of piping and automated valve isolation on alarm — zero chemical exposure incidents in 5 years.'
    },
    emergingRisks: [
      {
        id: 'disp-er-1',
        title: 'MicroLED/MiniLED Mass Transfer — New Yield Risks',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2030',
        description: 'MicroLED displays require transferring millions of 10-100µm LEDs onto substrates. Mass transfer technology (pick-and-place, laser-assisted, fluidic assembly) is immature. Yield loss during transfer (even 0.01% = thousands of defects per display) makes production uneconomic. Equipment for mass transfer is novel with no failure history for insurance assessment.',
        implications: ['Novel equipment with no loss history', 'Extremely high WIP value per substrate', 'Yield uncertainty making production cost unpredictable', 'Equipment single-source from startups', 'Insurance capacity constraints for novel process']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'disp-ni-1',
        title: 'Technology Generation Transition Risk (LCD → OLED → MicroLED)',
        category: 'Technology / Market',
        description: 'Display technology transitions every 5-7 years. Each transition strands previous-generation manufacturing assets (₹5,000-20,000 Cr per fab). Indian display investment plans must navigate: LCD already mature (Chinese overcapacity), OLED being displaced by MicroLED, and uncertainty about which technology wins for each application (mobile, TV, automotive, AR/VR).',
        mitigation: 'Technology-flexible platform investment, partnership with technology leaders (Samsung, LG, BOE), phased investment aligned to market demand, focus on application-specific niches (automotive display, medical), multi-technology capability',
        exposure: '₹5,000-20,000 Cr per display fab (stranded asset if wrong technology bet)'
      }
    ],
    bestPractices: [
      {
        id: 'disp-bp-1',
        title: 'Display Fab Chemical Safety',
        standard: 'SEMI S2/S8 + IFC EHS Guidelines + Korean KOSHA Standards',
        description: 'Chemical safety for display manufacturing using HF, strong alkalis, and organic solvents in clean room environment.',
        recommendations: [
          'Double-contained piping for ALL corrosive/toxic chemicals (no single-wall in clean room)',
          'Real-time leak detection: chemical concentration sensors at 5m intervals along pipe routes',
          'HF-specific safety: calcium gluconate gel at every HF use point, HF detector, dedicated PPE',
          'Chemical storage: maximum 24-hour supply inside fab; bulk in separate chemical building',
          'Automated chemical delivery: no manual handling of concentrated chemicals inside clean room',
          'Emergency response: chemical-specific response procedures + drilled quarterly',
          'Waste treatment: segregated by chemical type with incompatibility controls'
        ],
        benchmark: 'Samsung Display chemical safety record: zero exposure incidents across 4 display fabs through fully automated delivery + double-containment + real-time monitoring — the global standard for display chemical management.'
      }
    ]
  }
]
