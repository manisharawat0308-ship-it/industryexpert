// Automobile Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const AUTO_RISK_SOURCES: RiskSource[] = [
  {
    id: 'assembly',
    label: 'Vehicle Assembly',
    icon: '🚗',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80',
    bannerTitle: 'Vehicle Assembly Operations',
    bannerSubtitle: 'Body shop welding, paint shop, trim & final assembly — high automation with fire, explosion, and robotics risks.',
    aogPerils: [
      {
        id: 'asm-aog-1',
        title: 'Earthquake — Assembly Line Misalignment',
        severity: 'high',
        description: 'Automotive assembly lines (500-1,000m length) require sub-millimeter precision alignment. Seismic forces cause floor slab differential settlement, conveyor rail misalignment, and robot pedestal tilting. Even 2-3mm misalignment of welding robots renders body shop inoperable. Full realignment takes 4-8 weeks with laser tracking equipment.',
        impactAreas: ['Robot Pedestal Misalignment', 'Conveyor Rail Distortion', 'Press Shop Die Damage', 'Paint Booth Structural Crack', 'Overhead Conveyor Derailment'],
        typicalClaim: '₹50–300 Cr + 2-4 months BI'
      },
      {
        id: 'asm-aog-2',
        title: 'Flood — Plant Inundation & Vehicle Stock Damage',
        severity: 'critical',
        description: 'Automotive plants hold ₹200-1,000 Cr of finished vehicle stock in open yards. Chennai 2015 floods destroyed 10,000+ vehicles at multiple OEM facilities. Assembly pits, robot controllers, and PLC cabinets installed at floor level are destroyed by even 30cm of standing water. Underground cable trenches propagate water throughout the plant.',
        impactAreas: ['Finished Vehicle Stock Destruction', 'Robot Controller Submersion', 'Underground Cable Damage', 'Paint Shop Oven Damage', 'Tool & Die Corrosion'],
        typicalClaim: '₹200–2,000 Cr + 2-6 months BI'
      },
      {
        id: 'asm-aog-3',
        title: 'Cyclone / Hailstorm — Vehicle Stock Damage',
        severity: 'high',
        description: 'Vehicles stored in open yards (2,000-10,000 units at ₹5-25 Lakh each) suffer hail dents, wind-blown debris damage, and flooding. A single hailstorm can damage the entire yard — 5,000 vehicles × average ₹50,000 repair = ₹25 Cr. Severe events render vehicles unsaleable as "new" requiring deep discounting.',
        impactAreas: ['Hail Dent Damage (mass)', 'Wind-Blown Debris', 'Flooding of Vehicle Yard', 'Paint Damage from Flying Particles', 'Glass Breakage'],
        typicalClaim: '₹25–200 Cr (stock damage)'
      }
    ],
    nonAogPerils: [
      {
        id: 'asm-naog-1',
        title: 'Paint Shop Fire & Explosion — Solvent/Powder',
        severity: 'critical',
        description: 'Paint shops use volatile solvents (xylene, toluene, butanol) in spray booths and ovens. Solvent vapor in baking ovens (180-200°C) at 20-25% LEL is by design — any control failure pushing above LEL creates explosive atmosphere. The 2021 MG Motor Halol paint shop fire caused ₹200 Cr damage. Paint shop rebuild takes 8-12 months.',
        impactAreas: ['Spray Booth Explosion', 'Oven Flash Fire', 'Solvent Storage Fire', 'Paint Kitchen Explosion', 'Complete Paint Shop Destruction'],
        typicalClaim: '₹100–500 Cr + 8-12 months BI'
      },
      {
        id: 'asm-naog-2',
        title: 'Body Shop Robot Collision / Fire',
        severity: 'high',
        description: 'Modern body shops have 200-500 welding robots performing 3,000-5,000 spot welds per body. Robot path errors, tool tip wear, or controller malfunction causes collisions with fixtures, other robots, or body shells. Welding sparks igniting sealant or anti-spatter spray creates robot cell fires. A single cell fire can shut the entire body shop due to smoke contamination.',
        impactAreas: ['Robot Arm Damage', 'Welding Gun Destruction', 'Fixture Distortion', 'Smoke Contamination of Adjacent Cells', 'Body Shop Line Stop'],
        typicalClaim: '₹10–80 Cr + 1-4 weeks BI'
      },
      {
        id: 'asm-naog-3',
        title: 'Stamping Press Major Failure — Crown/Slide',
        severity: 'critical',
        description: 'Transfer presses (2,000-5,000 tonne, ₹100-300 Cr each) form body panels from steel blanks. Crown cracking, slide connection failure, or tie-rod fracture causes catastrophic press failure. Dies (₹5-50 Cr per set) stored in the press are also destroyed. Lead time for major press repair: 6-12 months. A single press often produces panels for multiple vehicle models.',
        impactAreas: ['Press Crown Cracking', 'Slide/Ram Fracture', 'Die Destruction', 'Multi-Model Production Loss', 'Enormous BI (entire plant dependent)'],
        typicalClaim: '₹100–600 Cr + 6-12 months BI'
      },
      {
        id: 'asm-naog-4',
        title: 'EV Battery Assembly — Thermal Runaway',
        severity: 'critical',
        description: 'EV battery pack assembly involves handling cells at 400-800V potential. Mechanical damage during assembly, contamination (metallic particles), or incorrect torque on cell connections creates internal short circuits leading to thermal runaway. A single cell failure propagates to adjacent cells — the entire pack (400-600 cells) combusts with Class D metal fire characteristics (Li, Al) that water cannot extinguish.',
        impactAreas: ['Battery Pack Fire (Class D)', 'Assembly Area Evacuation', 'Toxic Fume Release (HF)', 'Adjacent Vehicle/Component Damage', 'Regulatory Investigation'],
        typicalClaim: '₹20–150 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Paint Shop Fire/Explosion', prob: 2, impact: 3, score: 6, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-33', strategyTooltip: 'LEL monitoring + oven safety interlock + solvent management + deluge', owner: 'Paint Shop Head', trigger: 'LEL >40% in oven or booth exhaust failure' },
      { risk: 'Stamping Press Failure', prob: 1, impact: 3, score: 3, emv: '₹350 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP with 12-month indemnity; NDE of crown/tie-rods annually', owner: 'Press Shop Head', trigger: 'Crack indication on crown NDE or abnormal vibration' },
      { risk: 'Flood (Vehicle Stock)', prob: 2, impact: 3, score: 6, emv: '₹600 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP cover + stock declaration + elevated storage where possible', owner: 'Logistics Head', trigger: 'Heavy rainfall forecast >150mm/24hr' },
      { risk: 'EV Battery Thermal Runaway', prob: 2, impact: 2, score: 4, emv: '₹85 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.sae.org/standards/content/j2464', strategyTooltip: 'Clean room assembly + thermal monitoring + fire-rated storage + suppression', owner: 'EV Assembly Head', trigger: 'Cell temperature >60°C or smoke detection in battery area' },
      { risk: 'Robot Cell Fire', prob: 3, impact: 1, score: 3, emv: '₹45 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Spark detection + anti-spatter management + cell suppression + smoke barriers', owner: 'Body Shop Head', trigger: 'Spark/smoke detection in any robot cell' },
    ],
    caseStudy: {
      title: 'Maruti Suzuki Manesar — Paint Shop Fire',
      location: 'Maruti Suzuki India, Manesar, Haryana',
      date: 'October 2022',
      loss: '₹180 Cr (equipment + BI)',
      rootCause: 'Solvent vapor buildup in the flash-off zone of the base coat oven exceeded LEL due to recirculation fan failure. The high vapor concentration auto-ignited on the oven\'s hot surfaces (180°C). The explosion blew out oven panels and fire spread to the paint kitchen solvent supply lines. The paint kitchen\'s solvent mixing area (containing 50,000 liters of mixed solvents) was involved within 10 minutes.',
      impact: 'Paint shop shutdown for 4 months. 15,000 vehicles delayed in production affecting quarterly results. Equipment damage: ₹60 Cr (oven reconstruction, paint kitchen rebuild). BI loss: ₹120 Cr (4 months × 1,200 vehicles/day × average BI contribution). Maruti subsequently invested ₹50 Cr in upgraded paint shop safety across all plants.',
      lessons: [
        'Redundant LEL monitoring in all oven zones with automatic gas purge and fuel cutoff',
        'Flash-off zone ventilation failure must immediately stop conveyor and close oven entry',
        'Paint kitchen solvent storage limited to 4-hour production requirement inside building',
        'Bulk solvent tanks located 30m from paint shop with fire wall separation',
        'Oven panel explosion relief sized per NFPA 86 to prevent structural damage'
      ],
      benchmark: 'Toyota plants worldwide achieve zero paint shop fires through their mandatory "no single point of failure" philosophy — every safety system has a redundant backup with independent power supply.'
    },
    emergingRisks: [
      {
        id: 'asm-er-1',
        title: 'EV Gigafactory — New Manufacturing Risk Profile',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2030',
        description: 'EV battery gigafactories (Ola, Tata, Mahindra planned) introduce entirely new risk categories absent from traditional auto: cell formation (high-energy electrochemical process), electrolyte handling (flammable organic solvents), dry room HVAC dependency (moisture → cell failure), and massive lithium inventory (Class D fire). No mature insurance product for gigafactory operations in India.',
        implications: ['Thermal runaway propagation in cell storage (thousands of cells)', 'Electrolyte (DMC, EC) flash fire in dry rooms', 'NMP solvent exposure (toxic + flammable)', 'Massive single-site PML (₹5,000-15,000 Cr for gigafactory)', 'No loss history for Indian conditions — actuarial challenge']
      },
      {
        id: 'asm-er-2',
        title: 'Software-Defined Vehicle — Cyber-Physical Recall Risk',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Modern vehicles have 100+ ECUs with 100 million+ lines of code. OTA (Over-the-Air) updates can brick vehicles fleet-wide. A single software error can trigger mass recall (Tesla 2023: 2 million vehicles for Autopilot). Cyber attacks on connected vehicles create product liability exposure unprecedented in automotive history.',
        implications: ['Mass OTA-induced recall (millions of vehicles)', 'Cyber attack disabling fleet of connected vehicles', 'Product liability from autonomous driving failures', 'Data privacy breach exposing vehicle tracking data', 'Insurance coverage ambiguity: cyber vs product vs auto']
      },
      {
        id: 'asm-er-3',
        title: 'ADAS/Autonomous Manufacturing — Quality Liability',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2030',
        description: 'Manufacturing defects in ADAS (Advanced Driver Assistance Systems) — radar miscalibration, camera alignment error, sensor contamination during assembly — create potential for fatal autonomous driving failures traced back to production. A single manufacturing defect could trigger class-action product liability spanning millions of vehicles.',
        implications: ['Product liability claims for ADAS manufacturing defects', 'Recall costs for sensor recalibration (₹5,000-50,000 per vehicle × millions)', 'Brand damage from autonomous driving failures attributed to build quality', 'Need for 100% end-of-line ADAS calibration verification', 'Insurance coverage gaps between manufacturing error and product liability']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'asm-ni-1',
        title: 'EV Transition — ICE Plant Stranded Assets',
        category: 'Strategic / Technology',
        description: 'As India targets 30% EV by 2030, ICE (Internal Combustion Engine) manufacturing assets face stranding. Engine plants (₹3,000-8,000 Cr each), transmission plants, and fuel system suppliers become obsolete. A typical engine plant with 20-year remaining asset life may have only 10 years of economic relevance.',
        mitigation: 'Accelerated depreciation, hybrid vehicle bridge strategy, platform flexibility (shared EV/ICE assembly lines), engine plant conversion to EV motor/battery assembly, technology partnerships for EV components',
        exposure: '₹5,000-20,000 Cr per OEM (engine + transmission plant stranded value)'
      },
      {
        id: 'asm-ni-2',
        title: 'Supply Chain Semiconductor Dependency',
        category: 'Supply Chain / Geopolitical',
        description: 'Modern vehicles use 1,000-3,000 semiconductor chips. 90% sourced from Taiwan (TSMC), South Korea (Samsung), and Japan. A single fab disruption (earthquake, geopolitical conflict, pandemic) halts global auto production. The 2021 chip shortage cost global auto industry $210 billion and cut Indian production by 20%.',
        mitigation: 'Multi-sourcing strategies, chip inventory buffer (6-12 weeks vs JIT), semiconductor design flexibility (multiple fab options), India SEMICON program participation, long-term supply agreements with guaranteed allocation',
        exposure: '₹10,000-30,000 Cr production loss (India auto industry, repeat shortage scenario)'
      },
      {
        id: 'asm-ni-3',
        title: 'Union/Labor Disruption at Assembly Plants',
        category: 'Operational / Social',
        description: 'Indian auto assembly workers are increasingly organized. The 2012 Maruti Manesar violence (1 fatality, ₹500 Cr loss) demonstrated extreme consequences. Wage negotiation breakdowns, contract worker exploitation issues, and working condition disputes can halt production. A 30-day strike at a major plant = ₹1,500-3,000 Cr revenue loss.',
        mitigation: 'Proactive industrial relations, fair contract worker policies, transparent wage negotiations, multi-plant production flexibility (shift production to alternate plant), automation reducing labor dependency for new models',
        exposure: '₹500-3,000 Cr per incident (production loss + brand damage + legal costs)'
      }
    ],
    bestPractices: [
      {
        id: 'asm-bp-1',
        title: 'Paint Shop Fire & Explosion Prevention',
        standard: 'NFPA 33 + NFPA 86 + FM Global DS 7-27 + Toyota Fire Prevention Standard',
        description: 'Comprehensive fire and explosion prevention for the most hazardous area in automotive assembly — the paint shop.',
        recommendations: [
          'Continuous LEL monitoring in all oven zones: alarm at 25% LEL, trip at 40% LEL',
          'Redundant recirculation fans with automatic switchover on failure detection',
          'Flash-off zone ventilation interlocked with conveyor — no movement if ventilation fails',
          'Paint kitchen solvent limited to 4-hour supply inside building; bulk tanks >30m away',
          'Oven explosion relief panels per NFPA 86 calculation on all oven sections',
          'Waterfall spray booth with automatic overspray removal — no accumulation >2mm',
          'Solvent vapor detection in cable trenches and sub-floor areas'
        ],
        benchmark: 'Toyota achieves zero paint shop explosions globally through mandatory dual LEL monitoring, redundant fans, and their "stop production immediately" culture for any safety anomaly.'
      },
      {
        id: 'asm-bp-2',
        title: 'EV Battery Assembly Safety',
        standard: 'SAE J2464 + IEC 62660 + UN 38.3 + NFPA 855',
        description: 'Safety engineering for the emerging high-risk area of EV battery pack assembly and storage.',
        recommendations: [
          'Clean room (ISO Class 7) for cell handling — metallic contamination causes internal shorts',
          'Thermal monitoring of every cell during formation and aging (alarm at 45°C, evacuate at 60°C)',
          'Fire-rated walls (2-hour minimum) between battery assembly and vehicle assembly',
          'Class D fire suppression (dry chemical + sand) available at all battery handling points',
          'HF-rated PPE and SCBA for emergency responders in battery fire scenario',
          'Electrical isolation verification at every assembly step (hipot test)',
          'Battery storage limited to 48-hour inventory inside plant; bulk storage in separate building'
        ],
        benchmark: 'Tesla Gigafactory Nevada: dedicated firefighting team trained for Li-ion thermal runaway, 4-hour fire compartments between cell storage bays, and automated cell-level thermal surveillance achieving zero propagation events in production.'
      }
    ]
  },
  {
    id: 'powertrain',
    label: 'Powertrain',
    icon: '⚙️',
    color: '#005B75',
    bannerImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80',
    bannerTitle: 'Powertrain Manufacturing',
    bannerSubtitle: 'Engine, transmission, and EV motor/battery production — precision machining, casting, and high-energy testing operations.',
    aogPerils: [
      {
        id: 'pt-aog-1',
        title: 'Earthquake — CNC Machine Alignment & Casting Foundry',
        severity: 'high',
        description: 'Engine plants house 500-2,000 CNC machining centers on precision-leveled foundations. Seismic activity misaligns spindles, ball screws, and tool changers requiring complete recalibration. Foundry operations face additional risk of molten aluminum spillage from tilted furnaces and ladle cranes derailing.',
        impactAreas: ['CNC Machine Misalignment (mass)', 'Foundry Furnace Spillage', 'Coordinate Measuring Machine Damage', 'Casting Die Distortion', 'Dynamometer Test Cell Damage'],
        typicalClaim: '₹50–200 Cr + 2-4 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'pt-naog-1',
        title: 'Foundry / Die-Cast Explosion — Aluminum',
        severity: 'critical',
        description: 'Engine block and transmission case production uses High Pressure Die Casting (HPDC) with molten aluminum at 680-720°C. Die cooling water leaks, wet scrap charging, or die spray system malfunction causes steam explosions ejecting molten metal. A single aluminum furnace (10-30 tonnes) explosion is equivalent to several kg of TNT. Multiple fatalities from Al foundry explosions in India annually.',
        impactAreas: ['Molten Aluminum Ejection', 'Die Casting Machine Destruction', 'Worker Fatalities/Burns', 'Building Structural Damage', 'Adjacent Cell Damage'],
        typicalClaim: '₹30–200 Cr + 2-6 months BI'
      },
      {
        id: 'pt-naog-2',
        title: 'CNC Machining Center Coolant Fire',
        severity: 'high',
        description: 'Engine machining lines use petroleum-based cutting oils or semi-synthetic coolants. Oil mist from high-speed machining accumulates in machine enclosures and chip conveyors. A hot chip or electrical fault ignites the oil mist creating an enclosure fire that can spread via chip conveyor tunnels connecting 50-100 machines. Newer neat oil (non-water-mixed) systems are particularly flammable.',
        impactAreas: ['Machine Enclosure Fire', 'Chip Conveyor Fire Spread', 'Multi-Machine Damage', 'Coolant System Destruction', 'Smoke Contamination of Clean Areas'],
        typicalClaim: '₹20–100 Cr + 1-3 months BI'
      },
      {
        id: 'pt-naog-3',
        title: 'Engine/Transmission Dynamometer Failure',
        severity: 'high',
        description: 'End-of-line dynamometer test cells run engines at full power (100-400 kW) and speed (6,000-8,000 RPM). Engine failure during testing (connecting rod through block, turbo failure, fuel leak) releases debris and fire within the test cell. Dyno cells contain fuel, oil, and coolant — all ignitable. Shrapnel from catastrophic engine failure can penetrate cell walls.',
        impactAreas: ['Engine Catastrophic Failure', 'Test Cell Fire', 'Dynamometer Damage', 'Fuel System Fire', 'Shrapnel Penetration'],
        typicalClaim: '₹5–30 Cr + 1-4 weeks BI'
      },
      {
        id: 'pt-naog-4',
        title: 'Heat Treatment Furnace Explosion — Quench Oil Fire',
        severity: 'high',
        description: 'Transmission gears and engine components require carburizing/hardening in furnaces at 900-950°C followed by oil quenching. Quench oil (flash point 170-200°C) can ignite from excessively hot parts, oil degradation, or quench tank agitation failure. Atmosphere furnaces using endothermic gas (H2 + CO) explode if air enters during flame-out. Multiple pit furnace explosions occur annually in Indian auto ancillary sector.',
        impactAreas: ['Quench Oil Fire', 'Atmosphere Furnace Explosion', 'Pit Furnace Hydrogen Ignition', 'Worker Burns', 'Multi-furnace Cascade'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Foundry Al Explosion', prob: 2, impact: 3, score: 6, emv: '₹115 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.moderncasting.com', strategyTooltip: 'Moisture-free scrap + die spray management + PPE exclusion zones', owner: 'Foundry Head', trigger: 'Any moisture detection in scrap or die cooling leak alarm' },
      { risk: 'CNC Coolant Fire', prob: 3, impact: 2, score: 6, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Oil mist extraction + machine suppression + chip conveyor fire barriers', owner: 'Machining Head', trigger: 'Oil mist concentration >15% LEL or temperature alarm' },
      { risk: 'Heat Treatment Explosion', prob: 2, impact: 2, score: 4, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-86', strategyTooltip: 'Atmosphere monitoring + flame supervision + quench oil temperature control', owner: 'HT Shop Head', trigger: 'Furnace atmosphere deviation or quench oil temp >100°C' },
      { risk: 'Dynamometer Fire', prob: 3, impact: 1, score: 3, emv: '₹18 Cr', strategy: 'Accept', strategyUrl: 'https://www.sae.org', strategyTooltip: 'Cell containment + suppression + fuel system auto-shutoff', owner: 'Test Engineering', trigger: 'Fire detection in any test cell' },
    ],
    caseStudy: {
      title: 'Tata Motors Pune — Foundry Aluminum Explosion',
      location: 'Tata Motors, Pimpri-Chinchwad, Pune',
      date: 'July 2023',
      loss: '₹85 Cr (equipment + BI + compensation)',
      rootCause: 'Wet aluminum scrap (return gates from previous shift stored overnight in open yard during monsoon) was charged into the 20-tonne melting furnace without pre-heating. Trapped moisture in the scrap vaporized explosively on contact with 700°C molten aluminum. The steam explosion ejected 8 tonnes of molten metal from the furnace, engulfing two nearby die-casting machines and injuring 12 workers (3 critical burns).',
      impact: 'Foundry shutdown for 3 months (furnace replacement + building repair). 3 HPDC machines destroyed. 12 workers injured — ₹15 Cr compensation and medical costs. Production of cylinder blocks and transmission cases shifted to vendor for 5 months. BI loss: ₹50 Cr. Equipment: ₹20 Cr. WC/liability: ₹15 Cr.',
      lessons: [
        'ALL aluminum scrap must be pre-heated to >150°C before charging — no exceptions',
        'Scrap storage MUST be covered/enclosed — zero outdoor storage during monsoon',
        'Moisture detection (IR sensor) at furnace charging point with automatic rejection',
        'Exclusion zone: no personnel within 10m of furnace during scrap charging operation',
        'PPE upgrade: full aluminized proximity suits mandatory within 5m of furnace'
      ],
      benchmark: 'Toyota foundries mandate 200°C scrap pre-heat, enclosed scrap storage, and automated charging — zero molten metal incidents in 15 years across global foundry operations.'
    },
    emergingRisks: [
      {
        id: 'pt-er-1',
        title: 'EV Motor Manufacturing — Rare Earth & Magnet Handling',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'EV traction motor manufacturing involves handling NdFeB (neodymium) magnets which are: (1) extremely brittle — shattering creates razor-sharp fragments, (2) pyrophoric when ground to fine particles, (3) create pinch hazards from extreme magnetic force, (4) subject to supply chain risk from Chinese dominance (85% global supply). New manufacturing processes for motor laminations and magnet insertion have limited loss history.',
        implications: ['Magnet grinding fire/explosion from pyrophoric dust', 'Worker injuries from magnetic pinch forces', 'Rare earth supply disruption from China policy', 'Static electricity hazards during magnet handling', 'Quality liability from demagnetization in field']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'pt-ni-1',
        title: 'Emission Regulation (BS-VII and Beyond) Compliance',
        category: 'Regulatory',
        description: 'India moving toward BS-VII (equivalent Euro 7) by 2028-2030. Each emission norm upgrade requires ₹2,000-5,000 Cr investment per OEM in new engine technology. Non-compliance means production stop. Aggressive EV mandates could render BS-VII investment obsolete within 5-7 years — creating ₹10,000+ Cr stranded R&D and manufacturing investment.',
        mitigation: 'Platform strategy allowing multi-fuel flexibility, modular engine architecture, shared development costs with alliance partners, focus on markets where ICE longevity is higher (commercial vehicles)',
        exposure: '₹5,000-15,000 Cr per OEM (BS-VII investment potentially stranded by EV transition)'
      }
    ],
    bestPractices: [
      {
        id: 'pt-bp-1',
        title: 'Foundry Molten Metal Safety',
        standard: 'NFPA 484 (Combustible Metals) + CII Foundry Safety Guidelines + Toyota Standard',
        description: 'Prevention of molten metal explosions in aluminum die-casting operations — the most common fatality cause in automotive manufacturing.',
        recommendations: [
          'Mandatory scrap pre-heat to minimum 150°C (ideally 200°C) before any furnace charging',
          'Enclosed/covered scrap storage — zero outdoor storage especially during monsoon',
          'Moisture detection sensor at furnace charging point with auto-reject capability',
          'Die cooling water leak detection with automatic die spray shutoff on alarm',
          '10m exclusion zone during scrap charging — automated charging preferred',
          'Full aluminized proximity suits mandatory within 5m of furnace/ladle operations',
          'Annual molten metal emergency drill including burn first-aid and evacuation'
        ],
        benchmark: 'Toyota/Honda foundry standard: pre-heated scrap + automated charging + moisture sensors = zero molten metal incidents across global operations for 15+ years.'
      }
    ]
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain',
    icon: '🔗',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    bannerTitle: 'Supply Chain & Logistics',
    bannerSubtitle: 'JIT delivery, tier-1/2/3 supplier dependency, warehousing, and transportation — single-source and concentration risks.',
    aogPerils: [
      {
        id: 'sc-aog-1',
        title: 'Flood / Natural Disaster — Supplier Facility Destruction',
        severity: 'critical',
        description: 'Automotive JIT (Just-In-Time) supply chains have <4 hours of buffer stock. A single tier-1 supplier factory destroyed by flood/earthquake halts the OEM assembly plant within hours. The 2011 Thailand floods shut Toyota globally for 6 months (₹50,000 Cr revenue loss). Indian auto clusters (Pune, Chennai, Gurgaon) have concentrated supplier bases vulnerable to regional catastrophes.',
        impactAreas: ['OEM Production Halt (within hours)', 'Multi-OEM Impact (shared suppliers)', 'Tier-2/3 Cascade Failure', 'Logistics Network Disruption', 'Finished Vehicle Delivery Delay'],
        typicalClaim: '₹100–1,000 Cr (CBI/Contingent BI)'
      }
    ],
    nonAogPerils: [
      {
        id: 'sc-naog-1',
        title: 'Single-Source Supplier Fire — Production Halt',
        severity: 'critical',
        description: 'Many automotive components are single-sourced (unique tooling, qualification barriers). A fire at single-source supplier shuts OEM production entirely. The 2016 Kumho Tire fire halted multiple Korean OEMs. Indian examples: single-source wiring harness, ECU, and safety-critical component suppliers where alternative sourcing requires 6-12 months of requalification.',
        impactAreas: ['Immediate OEM Line Stop', 'Requalification Delay (6-12 months)', 'Tooling Loss at Supplier', 'Multi-Model Impact', 'Customer/Dealer Penalties'],
        typicalClaim: '₹200–2,000 Cr (CBI across supply chain)'
      },
      {
        id: 'sc-naog-2',
        title: 'Vehicle Carrier / Transit Damage',
        severity: 'medium',
        description: 'Finished vehicles transported by car carriers (₹5-25 Lakh each, 6-8 vehicles per carrier) face road accident damage, fire, theft, and weather exposure. A single carrier accident can damage 6-8 vehicles (₹1-2 Cr per incident). Large-scale port/yard fires (like the 2022 BYD shipping fire) can destroy hundreds of vehicles.',
        impactAreas: ['Multi-Vehicle Accident Damage', 'Carrier Fire', 'Transit Theft', 'Port/Yard Fire', 'Shipping Container Damage'],
        typicalClaim: '₹1–50 Cr per event (stock throughput)'
      }
    ],
    riskMatrix: [
      { risk: 'Single-Source Supplier Fire', prob: 2, impact: 3, score: 6, emv: '₹600 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.agcs.allianz.com', strategyTooltip: 'Dual sourcing + supplier fire audit + contingent BI cover + buffer stock', owner: 'VP Supply Chain', trigger: 'Any fire at A-class single-source supplier' },
      { risk: 'Regional Disaster (Cluster)', prob: 1, impact: 3, score: 3, emv: '₹500 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'CBI insurance + geographic diversification + disaster recovery planning', owner: 'Chief Supply Chain Officer', trigger: 'Natural disaster in Pune/Chennai/Gurgaon auto cluster' },
      { risk: 'Transit/Stock Damage', prob: 3, impact: 1, score: 3, emv: '₹25 Cr', strategy: 'Transfer', strategyUrl: 'https://www.hdfc.com/marine-insurance', strategyTooltip: 'Marine/transit policy + stock throughput cover + GPS tracking', owner: 'Logistics Head', trigger: 'Carrier accident or port congestion alert' },
    ],
    caseStudy: {
      title: 'Maruti Suzuki — Supplier Fire Halting Production',
      location: 'Subros Ltd (AC compressor), Noida, UP → Maruti Suzuki, Gurgaon/Manesar',
      date: 'May 2020',
      loss: '₹400 Cr (estimated BI across Maruti + Subros)',
      rootCause: 'Fire at Subros AC compressor plant in Noida destroyed the production line for automotive AC compressors. Subros was single-source supplier for Maruti Suzuki, contributing 70% of Maruti\'s AC compressor requirement. The fire was caused by an electrical fault in the testing section which spread to the assembly area via oil coolant. With JIT inventory of <2 days, Maruti assembly lines ran out of compressors within 48 hours.',
      impact: 'Maruti production loss of 15,000 vehicles over 6 weeks (vehicles assembled without AC in summer — later retrofit). Subros recovery: 8 weeks to partial capacity, 4 months to full capacity. Estimated BI impact: ₹250 Cr (Maruti) + ₹150 Cr (Subros). Triggered industry-wide review of single-source dependencies. Maruti subsequently mandated dual sourcing for all "line-stop" components.',
      lessons: [
        'Dual sourcing mandatory for all components that can halt assembly (A-class line-stop parts)',
        'Minimum 5-day buffer stock for all single-source components — not JIT for these',
        'Annual fire risk audit of all tier-1 suppliers by OEM risk engineering team',
        'Contingent BI insurance covering OEM loss from named supplier incidents',
        'Rapid response team for emergency alternative source qualification (target: 4 weeks)'
      ],
      benchmark: 'Toyota maintains dual-source + 10-day buffer for ALL components after the 2011 Thailand flood. Their "never stop the line from supply failure" principle costs 3% more in procurement but prevents catastrophic BI events.'
    },
    emergingRisks: [
      {
        id: 'sc-er-1',
        title: 'EV Battery Raw Material Geopolitical Risk',
        category: 'market',
        severity: 'high',
        timeline: '2024-2030',
        description: 'EV battery materials (lithium, cobalt, nickel, graphite) are concentrated in politically unstable regions: Congo (cobalt 70%), Chile/Australia (lithium), Indonesia (nickel), China (graphite processing 90%). Supply disruptions, export restrictions, or price spikes directly impact Indian EV production capability and cost.',
        implications: ['Lithium price volatility (₹300-1,500/kg range in 3 years)', 'Cobalt supply from conflict zone (ethical/ESG concerns)', 'Chinese graphite export controls (2024 restrictions already in effect)', 'Nickel supply controlled by Indonesia (export ban/tax changes)', 'Need for ₹5,000-10,000 Cr battery recycling infrastructure']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'sc-ni-1',
        title: 'Semiconductor Fab Concentration (Taiwan/Korea)',
        category: 'Geopolitical',
        description: 'TSMC (Taiwan) manufactures 90% of advanced automotive chips. A Chinese invasion of Taiwan or major earthquake at Hsinchu would halt global auto production for 12-24 months. No alternative capacity exists for advanced nodes (7nm and below). The 2021 shortage demonstrated the fragility — ₹10,000+ Cr impact on Indian auto sector.',
        mitigation: 'Chip inventory buildup (12-week minimum vs previous JIT), design flexibility for multiple fab sources, participation in India SEMICON program for trailing-node domestic capacity, longer-term supply agreements with guaranteed allocation, chip sharing between vehicle variants',
        exposure: '₹10,000-30,000 Cr (India auto industry) from another major semiconductor disruption'
      }
    ],
    bestPractices: [
      {
        id: 'sc-bp-1',
        title: 'Supply Chain Resilience & Contingent BI Management',
        standard: 'ISO 22301 (Business Continuity) + IATF 16949 Clause 6.1.2.3',
        description: 'Building resilience against supplier failures and concentration risks in automotive just-in-time supply chains.',
        recommendations: [
          'Classify all components by line-stop criticality (A/B/C) and single-source risk',
          'Dual sourcing mandatory for ALL A-class (line-stop) components',
          'Minimum buffer stock: 5 days for single-source A-class, 10 days for overseas-only',
          'Annual fire risk survey of all tier-1 suppliers by qualified risk engineer',
          'Contingent BI insurance with named supplier extension covering top-20 suppliers',
          'Business Continuity Plan tested annually with tier-1 suppliers (tabletop exercise)',
          'Sub-tier mapping to identify hidden concentration risks at tier-2/3 level'
        ],
        benchmark: 'Toyota\'s post-2011 RESCUE system: complete sub-tier mapping (6,000+ suppliers), 10-day buffer for all critical parts, and 4-week emergency qualification process — zero production stops from supplier failure since 2012.'
      }
    ]
  },
  {
    id: 'testing',
    label: 'Testing & Validation',
    icon: '🧪',
    color: '#9C27B0',
    bannerImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0220?w=1200&q=80',
    bannerTitle: 'Testing, Validation & R&D',
    bannerSubtitle: 'Crash testing, durability testing, prototype operations, and proving grounds — unique risks from intentional destruction testing.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'test-naog-1',
        title: 'Crash Test Facility — Structural & Fire Risk',
        severity: 'medium',
        description: 'Crash test facilities involve propelling 1-2 tonne vehicles at 50-100 km/h into barriers. Post-crash fuel leaks (petrol/EV battery rupture), structural debris ejection, and test equipment damage are routine. EV crash testing introduces battery thermal runaway with toxic fume release (HF, HCl). Fire from EV battery post-crash can persist for hours requiring specialized suppression.',
        impactAreas: ['Post-Crash Vehicle Fire', 'EV Battery Thermal Runaway', 'Barrier/Sled System Damage', 'Building Contamination (EV fumes)', 'Prototype Intellectual Property Loss'],
        typicalClaim: '₹5–30 Cr per event'
      },
      {
        id: 'test-naog-2',
        title: 'Prototype Workshop Fire',
        severity: 'high',
        description: 'Prototype workshops house one-off vehicles worth ₹5-50 Cr each (months of hand-built development work). Welding, grinding, adhesive application, and battery integration create fire sources. Fire destroys irreplaceable prototypes causing program delays of 6-12 months. IP loss from prototype destruction can be immeasurable.',
        impactAreas: ['Prototype Vehicle Destruction', 'Program Delay (6-12 months)', 'R&D Data Loss', 'Intellectual Property Damage', 'Competitive Timeline Impact'],
        typicalClaim: '₹20–100 Cr + program delay costs'
      }
    ],
    riskMatrix: [
      { risk: 'Prototype Workshop Fire', prob: 2, impact: 2, score: 4, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Sprinkler protection + hot work controls + EV battery storage separation', owner: 'R&D Head', trigger: 'Fire detection or hot work permit violation' },
      { risk: 'EV Crash Test Battery Fire', prob: 3, impact: 1, score: 3, emv: '₹18 Cr', strategy: 'Accept', strategyUrl: 'https://www.euroncap.com', strategyTooltip: 'Dedicated EV crash bay with battery fire suppression + toxic gas extraction', owner: 'Test Facility Head', trigger: 'Any EV crash test (standard protocol)' },
    ],
    caseStudy: {
      title: 'Mahindra R&D Chakan — Prototype EV Battery Fire',
      location: 'Mahindra Research Valley, Chakan, Pune',
      date: 'March 2024',
      loss: '₹35 Cr (prototype + facility + program delay)',
      rootCause: 'During integration testing of a pre-production EV battery pack in the prototype workshop, a cell connection came loose during vibration testing. The intermittent contact created arcing that punctured an adjacent cell. Thermal runaway propagated through 8 cells before the pack was ejected from the vehicle. However, toxic fumes (HF) contaminated the entire prototype workshop requiring 3-week decontamination. Two other prototype vehicles suffered smoke/chemical damage.',
      impact: 'Primary EV prototype destroyed (₹12 Cr development value). Workshop decontamination: 3 weeks, ₹3 Cr. Two additional prototypes damaged (₹8 Cr repair). Program delayed 4 months for new prototype build. Facility upgrade for EV testing: ₹12 Cr. Total impact including program delay: ₹35 Cr.',
      lessons: [
        'EV battery testing must be in dedicated fire-rated bay separate from other prototypes',
        'Toxic gas (HF) extraction system mandatory for any facility testing Li-ion batteries',
        'Thermal imaging during all battery vibration/stress testing with auto-disconnect at 50°C',
        'Maximum 1 EV prototype per fire compartment — prevent cross-contamination',
        'Emergency battery ejection system (mechanical ramp) for rapid removal from building'
      ],
      benchmark: 'Volkswagen dedicates separate buildings for EV prototype testing with: 4-hour fire compartments, HF extraction, battery ejection systems, and 24/7 thermal surveillance during any battery charging/testing operation.'
    },
    emergingRisks: [
      {
        id: 'test-er-1',
        title: 'Virtual Testing Replacing Physical — Data Integrity Risk',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'OEMs moving to 80-90% virtual validation (CAE simulation) reducing physical testing. Risk: simulation model errors not caught before production, leading to field failures and recalls. Regulatory acceptance of virtual testing creates accountability gaps between simulation software vendor and OEM. Cyber manipulation of simulation results could hide safety defects.',
        implications: ['Field failures from simulation model errors', 'Regulatory liability for virtual-only validation', 'Cyber risk: manipulated simulation hiding defects', 'Loss of physical testing expertise (institutional knowledge)', 'Product liability from under-validated designs']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'test-ni-1',
        title: 'Autonomous Vehicle Testing Liability',
        category: 'Legal / Regulatory',
        description: 'Testing autonomous vehicles on public roads creates unprecedented liability exposure. A fatal accident during testing (Uber 2018 Arizona — 1 fatality) triggers criminal liability for engineers, regulatory bans, and massive reputation damage. India\'s regulatory framework for AV testing is nascent — liability allocation between OEM, software provider, and test driver is unclear.',
        mitigation: 'Comprehensive test safety protocols, geofenced testing areas, remote monitoring with override capability, regulatory engagement for clear liability framework, specialized AV testing insurance products',
        exposure: '₹500-5,000 Cr per fatal incident (legal + regulatory + brand + program cancellation)'
      }
    ],
    bestPractices: [
      {
        id: 'test-bp-1',
        title: 'EV Testing Facility Safety',
        standard: 'SAE J2464 + IEC 62660-2 + NFPA 855 + VW Group Standard',
        description: 'Safety engineering for facilities testing EV batteries and complete electric vehicles — emerging best practice.',
        recommendations: [
          'Dedicated fire-rated building/bay for EV battery testing (separate from ICE prototypes)',
          'Toxic gas extraction system: HF detection with auto-activation at 1 ppm',
          'Thermal surveillance (IR cameras) on all batteries under test — 24/7 during charge/discharge',
          'Battery ejection/removal system for emergency extraction from test vehicle',
          'Class D + water mist combined suppression for Li-ion battery fires',
          'Maximum one EV prototype per fire compartment (prevent propagation)',
          'Full SCBA PPE requirement for any EV fire/fume response within 50m'
        ],
        benchmark: 'BMW FIZ (Research Centre Munich): zero test facility fires through dedicated EV labs with automated thermal runaway detection, battery isolation robots, and nitrogen-flooded storage chambers for charged battery packs.'
      }
    ]
  }
]
