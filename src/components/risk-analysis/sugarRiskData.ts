// Sugar Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const SUGAR_RISK_SOURCES: RiskSource[] = [
  {
    id: 'milling',
    label: 'Cane Milling',
    icon: '🏭',
    color: '#059669',
    bannerImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
    bannerTitle: 'Cane Crushing & Milling',
    bannerSubtitle: 'Sugarcane crushing, juice extraction, and bagasse handling — seasonal operations with machinery breakdown and fire risks.',
    aogPerils: [
      {
        id: 'mill-aog-1',
        title: 'Flood — Mill & Cane Yard Inundation',
        severity: 'high',
        description: 'Sugar mills are located in agricultural belts near rivers for water supply and cane transport. Monsoon flooding submerges cane yards (₹5-20 Cr of cut cane rots within 48 hours), electrical substations, and mill tandem drives. The 2019 Maharashtra floods damaged 15+ sugar mills. Cut sugarcane deteriorates to zero value within 72 hours of flooding — irrecoverable stock loss.',
        impactAreas: ['Cane Yard Rotting (48-hr deadline)', 'Mill Drive Motor Submersion', 'Substation Damage', 'Juice/Syrup Tank Overflow', 'Bagasse Pile Waterlogging'],
        typicalClaim: '₹15–80 Cr + lost crushing days (₹50-80 Lakh/day)'
      },
      {
        id: 'mill-aog-2',
        title: 'Cyclone / Storm — Cane Field & Mill Structural Damage',
        severity: 'high',
        description: 'Cyclones flatten standing sugarcane crop (lodging) reducing recovery by 0.5-1.0%. Mill structures with tall chimneys, bagasse storage sheds, and overhead conveyors sustain wind damage. Coastal mills in Maharashtra, Karnataka, and Gujarat face annual cyclone risk during October-December (start of crushing season).',
        impactAreas: ['Cane Lodging (field loss)', 'Chimney/Stack Failure', 'Bagasse Shed Collapse', 'Conveyor Damage', 'Power Grid Disruption'],
        typicalClaim: '₹10–50 Cr + delayed season start'
      }
    ],
    nonAogPerils: [
      {
        id: 'mill-naog-1',
        title: 'Mill Tandem Major Failure — Roller/Shaft Fracture',
        severity: 'critical',
        description: 'Sugar mill tandems (4-6 mills in series, each with 3 heavy rollers 900-1,200mm diameter) crush 5,000-10,000 TCD (tonnes cane/day). Roller shaft fracture, top roller bearing failure, or crown pinion breakage halts the entire tandem. Roller replacement requires 3-6 weeks (casting + machining). During the 120-150 day crushing season, every day lost = ₹50-80 Lakh revenue lost permanently (cane cannot wait).',
        impactAreas: ['Roller Shaft Fracture', 'Crown Pinion Failure', 'Top Roller Bearing Seizure', 'Hydraulic System Failure', 'Lost Crushing Days (irrecoverable)'],
        typicalClaim: '₹20–100 Cr + permanent season revenue loss'
      },
      {
        id: 'mill-naog-2',
        title: 'Bagasse Fire — Storage & Conveying',
        severity: 'high',
        description: 'Bagasse (crushed cane fiber, 48-50% moisture at mill exit) is stored in large piles (5,000-50,000 tonnes) as boiler fuel. Stored bagasse dries to 30-35% moisture and self-heats through microbial action. Core temperature exceeding 80°C leads to spontaneous combustion. Bagasse fires burn for days destroying entire storage worth ₹10-50 Cr. Conveyor fires propagate from storage to boiler feeding system.',
        impactAreas: ['Bagasse Pile Total Loss', 'Conveyor Fire Propagation', 'Boiler Fuel Starvation', 'Adjacent Cane Yard Exposure', 'Environmental Smoke Impact'],
        typicalClaim: '₹10–60 Cr + boiler fuel crisis'
      },
      {
        id: 'mill-naog-3',
        title: 'Cane Shredder / Fiberizer Failure',
        severity: 'high',
        description: 'Cane shredders (2,000-4,000 HP) and fiberizers operate at 500-700 RPM with 40-60 hammers/knives processing 400-700 tonnes/hour. Foreign metal objects (hand tools, tramp iron) in cane feed cause catastrophic hammer fracture and rotor imbalance. Rotor shaft failure from fatigue cracking shuts the entire mill line. Shredder rebuilds take 2-4 weeks during the irreplaceable crushing season.',
        impactAreas: ['Hammer Fracture & Ejection', 'Rotor Shaft Failure', 'Housing Crack', 'Motor/Gearbox Damage', 'Feed Table Destruction'],
        typicalClaim: '₹5–40 Cr + 2-4 weeks lost crushing'
      }
    ],
    riskMatrix: [
      { risk: 'Mill Roller/Shaft Failure', prob: 2, impact: 3, score: 6, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.issct.org', strategyTooltip: 'Spare roller set + NDE annually + hydraulic pressure monitoring', owner: 'Chief Engineer', trigger: 'Shaft NDE crack indication or hydraulic pressure dropping' },
      { risk: 'Bagasse Storage Fire', prob: 3, impact: 2, score: 6, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Temperature monitoring + FIFO rotation + height limits + sprinkler on conveyors', owner: 'Boiler House Head', trigger: 'Core temperature >60°C or smoke from pile' },
      { risk: 'Shredder Catastrophic Failure', prob: 2, impact: 2, score: 4, emv: '₹23 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.sugarindia.com', strategyTooltip: 'Metal detector + vibration monitoring + hammer inspection each stop + spare rotor', owner: 'Milling Head', trigger: 'Metal detector activation or vibration >8 mm/s' },
      { risk: 'Flood (Cane + Mill)', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP + elevated electricals + cane supply chain BCP', owner: 'Factory Manager', trigger: 'River level warning or heavy rainfall forecast' },
    ],
    caseStudy: {
      title: 'Bajaj Hindusthan — Mill Tandem Roller Failure During Peak Season',
      location: 'Bajaj Hindusthan Sugar, Golagokarannath, UP',
      date: 'December 2022',
      loss: '₹45 Cr (equipment + lost production)',
      rootCause: 'The #3 mill top roller (1,100mm diameter, 20-tonne weight) shaft fractured at the journal bearing interface during peak crushing at 8,500 TCD. Metallurgical analysis revealed fatigue crack propagation from a 15-year-old stress raiser (corrosion pit) at the shaft fillet. The crack had been growing for 2-3 seasons undetected — no NDE was performed during off-season maintenance despite the shaft being 15 years old (design life: 20 years).',
      impact: 'Complete mill tandem stop for 22 days during peak crushing season. Lost production: 187,000 tonnes of cane not crushed (diverted to neighboring mills at ₹80/tonne transport premium). Revenue loss: ₹28 Cr. Equipment: ₹12 Cr (new roller + shaft + bearings). Farmer relationship damage: 5,000 farmers delayed payment.',
      lessons: [
        'Annual MPI/UT inspection of all mill roller shafts at journal and fillet areas during off-season',
        'Spare roller assembly maintained ready for all critical positions (minimum top rollers)',
        'Shaft replacement at 75% of design fatigue life for shafts with visible corrosion/pitting',
        'Season preparation to include complete hydraulic system overhaul and pressure test',
        'Contingent crushing arrangements with 2-3 neighboring mills for emergency cane diversion'
      ],
      benchmark: 'EID Parry (Murugappa Group) maintains spare top rollers for ALL mills and conducts full MPI of all shafts annually — zero unplanned roller failures in 10 years across 9 mills despite older equipment.'
    },
    emergingRisks: [
      {
        id: 'mill-er-1',
        title: 'Ethanol Blending Mandate — Distillery Integration Risk',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2030',
        description: 'India\'s E20 (20% ethanol blending) mandate drives ₹10,000+ Cr of new distillery investment integrated with sugar mills. Distilleries add fire/explosion risk (ethanol: flash point 13°C, explosive range 3.3-19%), chemical handling (H2SO4, yeast, antibiotics), and effluent management challenges (high BOD spent wash). Many existing sugar mills lack the engineering capability to safely operate integrated distilleries.',
        implications: ['Ethanol storage/handling fire & explosion risk', 'Distillery effluent management (spent wash disposal)', 'Chemical process safety gaps in traditional sugar mill teams', 'Multiple high-hazard operations in close proximity', 'Insurance coverage complexity for integrated facilities']
      },
      {
        id: 'mill-er-2',
        title: 'Climate Change — Erratic Monsoon Affecting Cane Yield',
        category: 'climate',
        severity: 'high',
        timeline: '2024-2035',
        description: 'Sugarcane needs 1,500-2,500mm rainfall distributed over 10-12 months. Climate change creating erratic monsoons — drought years followed by excess rainfall. Drought reduces cane availability (mills run below capacity), while excess rain reduces sucrose content (lower recovery). Both scenarios compress margins and create financial stress on cooperative/private mills.',
        implications: ['Cane availability fluctuation ±30% between years', 'Recovery rate decline from waterlogged fields', 'Season duration compression (fewer crushing days)', 'Farmer migration to less water-intensive crops', 'Financial viability of mills in water-stressed regions']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'mill-ni-1',
        title: 'Government Sugar/Ethanol Policy Volatility',
        category: 'Regulatory / Policy',
        description: 'Sugar is among the most politically controlled commodities in India. Government controls: MSP (Minimum Selling Price), export quotas/subsidies, ethanol pricing, cane price (FRP/SAP), and buffer stock obligations. Policy changes with 2-week notice can transform economics — the 2023 ethanol price freeze cost the industry ₹3,000 Cr in expected revenue. State elections drive irrational cane price announcements.',
        mitigation: 'Product diversification (ethanol, power, chemicals), geographic diversification across states, industry body advocacy, financial reserves for policy shocks, forward contracts for sugar/ethanol where available',
        exposure: '₹500-3,000 Cr industry-wide per adverse policy change'
      },
      {
        id: 'mill-ni-2',
        title: 'Farmer Cane Price Disputes & Arrears',
        category: 'Operational / Social',
        description: 'Sugar mills must pay FRP (₹315/quintal for 2024-25) to farmers within 14 days of delivery. State-announced SAP (UP: ₹400/quintal) often exceeds what mills can afford. Arrears accumulation leads to farmer agitation, mill gate blockades, and government pressure. Farmer arrears exceeding ₹50 Cr per mill trigger regulatory action including license suspension.',
        mitigation: 'Financial planning for worst-case cane pricing, ethanol revenue earmarking for cane payment, transparent farmer communication, government engagement on realistic SAP levels, cooperative model for shared risk',
        exposure: '₹100-500 Cr per mill (arrears accumulation + regulatory action in distressed years)'
      }
    ],
    bestPractices: [
      {
        id: 'mill-bp-1',
        title: 'Mill Tandem Reliability Program',
        standard: 'ISSCT (International Society of Sugar Cane Technologists) + STAI Guidelines',
        description: 'Ensuring maximum crushing availability during the irreplaceable 120-150 day season — every lost day is permanent revenue loss.',
        recommendations: [
          'Annual MPI/UT of ALL roller shafts at journals, fillets, and keyways during off-season',
          'Spare top roller assembly (minimum) maintained ready for each mill position',
          'Vibration monitoring on all mill drives during season — trend for bearing deterioration',
          'Hydraulic system: complete overhaul + pressure test before season start',
          'Crown pinion and gear inspection — MPI of tooth roots annually',
          'Metal detector on cane carrier before shredder — mandatory with auto-stop',
          'Pre-season trial run (72 hours continuous) at 80% capacity to prove reliability'
        ],
        benchmark: 'EID Parry mills achieve 96%+ season availability through spare roller strategy + complete off-season inspection protocol — India\'s highest reliability sugar mills.'
      }
    ]
  },
  {
    id: 'boiler-cogen',
    label: 'Boiler & Cogeneration',
    icon: '🔥',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
    bannerTitle: 'Boiler & Cogeneration Power',
    bannerSubtitle: 'High-pressure bagasse boilers, turbines, and power export — the profit center transforming waste fiber into revenue.',
    aogPerils: [
      {
        id: 'boil-aog-1',
        title: 'Lightning — Transformer & Control System Damage',
        severity: 'medium',
        description: 'Sugar mills in rural open areas with tall stacks and overhead lines attract lightning. Transformer bushings, turbine governor systems, and DCS controls are vulnerable. Loss of main transformer stops cogeneration power export (₹5-10 Lakh/day revenue).',
        impactAreas: ['Main Transformer Failure', 'Turbine Governor Damage', 'DCS System Surge', 'Grid Synchronization Loss', 'Power Export Revenue Loss'],
        typicalClaim: '₹5–30 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'boil-naog-1',
        title: 'Bagasse Boiler Tube Failure — Erosion/Corrosion',
        severity: 'high',
        description: 'High-pressure bagasse boilers (67-87 bar, 490-510°C) face unique tube failure from: bagasse ash erosion (high silica content), fireside corrosion from alkali deposits (KCl from cane), and soot blower erosion at tube surfaces. Each tube leak requires 3-7 day emergency repair. Multiple leaks in a season can cost 20-30 crushing days. Superheater failures from alkali-induced corrosion are particularly expensive.',
        impactAreas: ['Furnace Tube Leak', 'Superheater Failure', 'Economizer Corrosion', 'Soot Blower Erosion', 'Lost Crushing Days'],
        typicalClaim: '₹10–50 Cr + lost crushing days'
      },
      {
        id: 'boil-naog-2',
        title: 'Turbine Generator Failure',
        severity: 'critical',
        description: 'Cogeneration turbines (15-50 MW) in sugar mills operate at high back-pressure (2.5-4 bar) supplying process steam to the mill while generating power. Blade failure from wet steam erosion, bearing damage, or governor malfunction causes extended outage. Turbine repair: 3-6 months. Without the turbine, the mill cannot operate (no process steam) — entire season can be lost.',
        impactAreas: ['Turbine Blade Failure', 'Generator Winding Fault', 'Bearing Seizure', 'Governor Malfunction', 'Season Loss (no process steam)'],
        typicalClaim: '₹30–150 Cr + potential full season loss'
      },
      {
        id: 'boil-naog-3',
        title: 'Bagasse Conveyor Fire — Boiler Feed System',
        severity: 'medium',
        description: 'Bagasse conveyors (belt and chain type) transport dry bagasse from storage to boiler. Hot embers from storage pile fire, friction from seized idlers, or belt slip ignite the dry bagasse on conveyor. Fire propagates in both directions — toward storage and toward boiler. Conveyor galleries act as chimneys accelerating fire spread.',
        impactAreas: ['Conveyor Belt Destruction', 'Boiler Feed Interruption', 'Gallery Structure Damage', 'Storage Pile Ignition', 'Boiler Trip from Fuel Loss'],
        typicalClaim: '₹5–25 Cr + 1-3 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'TG Set Failure', prob: 1, impact: 3, score: 3, emv: '₹90 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP; vibration monitoring + water chemistry + annual overhaul in off-season', owner: 'Power Plant Head', trigger: 'Vibration >4 mm/s or bearing temp >90°C' },
      { risk: 'Boiler Tube Failure (Multiple)', prob: 3, impact: 2, score: 6, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.asme.org', strategyTooltip: 'UT survey in off-season + water chemistry + soot blower alignment + alkali management', owner: 'Boiler Head', trigger: 'UT thickness <3.5mm or water chemistry excursion' },
      { risk: 'Bagasse Conveyor Fire', prob: 3, impact: 1, score: 3, emv: '₹15 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Thermal imaging at drives + fire-resistant belt + spark detection + suppression', owner: 'Fuel Handling Head', trigger: 'Belt temperature >80°C or spark/ember detection' },
    ],
    caseStudy: {
      title: 'Triveni Engineering — Cogeneration Turbine Blade Failure',
      location: 'Triveni Engineering, Deoband, UP',
      date: 'November 2021',
      loss: '₹75 Cr (equipment + BI)',
      rootCause: 'LP turbine (30 MW extraction-cum-condensing) suffered last-stage blade failure from wet steam erosion combined with stress corrosion cracking. The turbine had operated for 12 seasons (72,000 hours) without LP blade replacement (recommended at 50,000 hours). Blade fragment liberation damaged 3 rows of LP blading and the diaphragm. Root cause: deferred maintenance — blade replacement postponed twice due to season pressure.',
      impact: 'Complete TG set shutdown for 5 months (off-season repair). Entire crushing season operated on old back-pressure turbine at 50% power generation capacity. Lost power export revenue: ₹35 Cr. Repair cost: ₹25 Cr (new LP rotor, blades, diaphragms). Insurance claim: ₹60 Cr (MB + MLOP). Post-incident: Triveni implemented mandatory blade replacement at 50,000 hours.',
      lessons: [
        'Blade inspection/replacement at OEM-recommended intervals — no deferral for season convenience',
        'Moisture removal (drainage) in LP section to prevent wet steam erosion',
        'Annual borescope inspection of LP stages during off-season (4-hour inspection prevents 5-month outage)',
        'Vibration signature analysis for blade crack detection — weekly trending during season',
        'Backup power/steam arrangement for single-TG mills (temporary boiler hire or grid import)'
      ],
      benchmark: 'Balrampur Chini (India\'s largest) replaces LP blades at 45,000 hours (before limit) and conducts annual borescope of all stages — zero blade failures in 8 years across 10 TG sets.'
    },
    emergingRisks: [
      {
        id: 'boil-er-1',
        title: 'Multi-Fuel Boiler Risks (Bagasse + Coal + Biomass)',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Sugar mills increasingly burning rice husk, wood chips, and coal alongside bagasse for year-round cogeneration. Mixed fuel creates variable combustion characteristics, different ash fusion temperatures (slagging risk), and chlorine-induced corrosion from rice husk. Boiler designs optimized for bagasse may not handle multi-fuel operation safely.',
        implications: ['Slagging/fouling from mixed fuel ash chemistry', 'Superheater corrosion from chlorine in rice husk', 'Variable steam parameters from fuel quality changes', 'Increased tube failure rate from unexpected ash behavior', 'Environmental compliance for multi-fuel emissions']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'boil-ni-1',
        title: 'Power Purchase Agreement & Grid Connectivity Risk',
        category: 'Regulatory / Revenue',
        description: 'Cogeneration revenue depends on PPAs with state DISCOMs. PPA tariffs (₹4-6/kWh) are being renegotiated downward. New PPAs after expiry may not be offered (DISCOM preferring solar at ₹2.5/kWh). Grid connectivity issues (insufficient evacuation capacity, grid instability) waste generated power. A mill losing its PPA sees cogeneration become cost-center instead of profit-center.',
        mitigation: 'Long-term PPA renewal negotiations started 3 years before expiry, captive use maximization (ethanol plant, cold storage), group captive arrangements with nearby industries, RECs/green certificates for biomass power, grid infrastructure investment in partnership with DISCOM',
        exposure: '₹20-50 Cr/year revenue loss per mill if PPA not renewed at economic tariff'
      }
    ],
    bestPractices: [
      {
        id: 'boil-bp-1',
        title: 'Cogeneration Turbine Reliability',
        standard: 'ASME PTC 6 + ISO 20816 + IBR (Indian Boiler Regulations)',
        description: 'Maximizing turbine availability for the dual-purpose sugar mill application — both process steam and power export depend on a single TG set in most mills.',
        recommendations: [
          'LP blade replacement at OEM-recommended interval (typically 50,000 hours) — no deferral',
          'Annual off-season borescope inspection of all turbine stages',
          'Online vibration monitoring with alarm/trip per ISO 20816',
          'Steam chemistry control: silica <20 ppb in HP steam, conductivity <0.3 µS/cm',
          'Governor/trip testing before every season start (simulated overspeed test)',
          'Bearing metal temperature monitoring with trip at 110°C',
          'Complete oil flush and refill every 2 seasons (or 10,000 hours)'
        ],
        benchmark: 'Balrampur Chini achieves 98%+ TG availability during season through off-season comprehensive overhaul + strict water chemistry + proactive blade management.'
      }
    ]
  },
  {
    id: 'distillery',
    label: 'Distillery & Ethanol',
    icon: '🍶',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?w=1200&q=80',
    bannerTitle: 'Distillery & Ethanol Production',
    bannerSubtitle: 'Molasses/juice fermentation, distillation, and ethanol storage — fire & explosion from highly flammable ethanol operations.',
    aogPerils: [
      {
        id: 'dist-aog-1',
        title: 'Lightning — Ethanol Tank Farm Ignition',
        severity: 'critical',
        description: 'Ethanol tank farms (10-50 ML storage) with floating roof or fixed roof tanks are vulnerable to lightning strike. Ethanol (flash point 13°C) ignites readily from lightning-induced sparks on tank shells, vent pipes, or gauge openings. A single tank fire creates boilover risk spreading fire to adjacent tanks. Tank farm total loss: ₹100-500 Cr.',
        impactAreas: ['Tank Farm Fire', 'Boilover to Adjacent Tanks', 'Total Ethanol Stock Loss', 'Environmental Contamination', 'Evacuation of Surrounding Area'],
        typicalClaim: '₹50–300 Cr (stock + infrastructure)'
      }
    ],
    nonAogPerils: [
      {
        id: 'dist-naog-1',
        title: 'Ethanol Storage/Handling Fire & Explosion',
        severity: 'critical',
        description: 'Ethanol is classified as Class IB flammable liquid (flash point 13°C, explosive range 3.3-19% in air). Storage, transfer, tanker loading, and process piping present continuous fire/explosion risk. Vapor cloud explosion from tank overflow or pipe rupture can devastate the entire distillery. The 2020 Chhatrapati Sugar distillery fire killed 8 workers. Multiple Indian distillery fires occur annually.',
        impactAreas: ['Tank Explosion', 'Vapor Cloud Explosion', 'Tanker Loading Fire', 'Pipeline Rupture Fire', 'Worker Fatalities'],
        typicalClaim: '₹30–200 Cr + fatality liability'
      },
      {
        id: 'dist-naog-2',
        title: 'Distillation Column Failure — Overpressure',
        severity: 'high',
        description: 'Multi-pressure distillation columns (operating at 0.5-3 bar) process ethanol-water mixtures at 78-100°C. Column overpressure from condenser failure, reboiler tube leak, or instrument malfunction causes relief valve discharge of ethanol vapor (immediate fire if ignition source present) or column mechanical failure. Ethanol vapor released inside building creates flash fire hazard.',
        impactAreas: ['Column Overpressure', 'Ethanol Vapor Release', 'Flash Fire in Building', 'Adjacent Column Damage', 'Extended Rebuild'],
        typicalClaim: '₹15–80 Cr + 2-4 months BI'
      },
      {
        id: 'dist-naog-3',
        title: 'Fermentation Vessel Explosion — CO2 Overpressure',
        severity: 'medium',
        description: 'Fermentation produces large volumes of CO2 gas. Blocked vent lines, frozen/stuck pressure relief, or overfilling causes vessel overpressure. CO2 at high concentration (>5%) displaces oxygen creating asphyxiation risk for workers entering vessel areas. Vessel failure releases hot fermented wash flooding the area.',
        impactAreas: ['Vessel Overpressure Failure', 'CO2 Asphyxiation', 'Hot Wash Flooding', 'Structural Damage', 'Environmental Discharge'],
        typicalClaim: '₹5–25 Cr + 2-4 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'Ethanol Tank Fire/Explosion', prob: 2, impact: 3, score: 6, emv: '₹150 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-30', strategyTooltip: 'Tank farm per OISD/PESO + foam system + bunding + gas detection + lightning protection', owner: 'Distillery Head', trigger: 'Gas detection alarm or lightning warning' },
      { risk: 'Distillation Column Failure', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.asme.org', strategyTooltip: 'HAZOP compliance + SIL-rated pressure protection + condenser monitoring', owner: 'Process Head', trigger: 'Pressure >design or condenser performance degrading' },
      { risk: 'Lightning Tank Ignition', prob: 2, impact: 3, score: 6, emv: '₹175 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.api.org', strategyTooltip: 'Lightning protection per API 2003 + tank earthing + flame arrestors on vents', owner: 'Safety Manager', trigger: 'Thunderstorm warning for plant location' },
      { risk: 'Fermentation Vessel Failure', prob: 2, impact: 1, score: 2, emv: '₹15 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.hse.gov.uk', strategyTooltip: 'Vent line maintenance + relief valve testing + CO2 monitors + confined space protocol', owner: 'Fermentation Head', trigger: 'CO2 level >1.5% in work area or vessel pressure rising' },
    ],
    caseStudy: {
      title: 'Chhatrapati Sugar — Distillery Fire & Fatalities',
      location: 'Chhatrapati Co-operative Sugar, Kavathe Mahankal, Maharashtra',
      date: 'January 2020',
      loss: '₹40 Cr + 8 fatalities',
      rootCause: 'Ethanol vapor leaked from a corroded pipe flange in the rectified spirit storage area. The vapor cloud (heavier than air, flash point 13°C) accumulated in the low-lying pump area. An electric motor (non-Ex rated, not suitable for Zone 1 hazardous area) provided the ignition source. The resulting flash fire engulfed 8 workers in the pump area. Fire then spread to two 50 KL storage tanks.',
      impact: '8 workers killed (burns + inhalation). Two 50 KL RS tanks destroyed. Pump house completely gutted. Criminal cases filed against management under IPC 304-A. PESO license suspended for 6 months. Distillery rebuilt only after comprehensive safety upgrade costing ₹12 Cr.',
      lessons: [
        'ALL electrical equipment in ethanol handling areas must be ATEX/Ex-rated (Zone 1 minimum)',
        'Pipeline corrosion management: thickness survey annually, replacement at 70% life',
        'Continuous flammable gas detection in all low-lying areas of distillery with auto-shutdown',
        'Ethanol vapor density is >1 (heavier than air) — ventilation must extract from ground level',
        'No non-essential personnel in ethanol storage/handling areas — automated operations preferred'
      ],
      benchmark: 'Praj Industries (Indian distillery EPC leader) designs to OISD-116/117 + API 2510 with 100% Ex-rated equipment in Zone 1/2, continuous gas detection, and automated tank farm operations — zero fires in client plants following their full safety specification.'
    },
    emergingRisks: [
      {
        id: 'dist-er-1',
        title: 'Grain-Based Distillery — Dust Explosion Risk',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2028',
        description: 'E20 mandate driving grain-based (rice, maize) distilleries where molasses supply is insufficient. Grain handling introduces combustible dust explosion risk (grain dust Kst = 100-200 bar·m/s) absent from molasses-based operations. Grain storage silos, conveying systems, and milling operations require ATEX-compliant design. Indian grain distilleries are being built without adequate dust explosion protection.',
        implications: ['Grain dust explosion risk in storage and conveying', 'Silo explosion from dust accumulation', 'Need for ATEX design philosophy new to sugar industry', 'Higher insurance exposure than traditional molasses distillery', 'Combined fire (ethanol) + explosion (dust) risk profile']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'dist-ni-1',
        title: 'Ethanol Pricing Policy & Government Control',
        category: 'Regulatory / Policy',
        description: 'Ethanol procurement is 100% government-controlled through OMC (Oil Marketing Company) tenders. Price is fixed by government (₹56-66/liter depending on feedstock). Price has not kept pace with input cost inflation. Government can freeze prices, change blending targets, or restrict molasses diversion — fundamentally altering distillery economics with no notice.',
        mitigation: 'Multiple feedstock flexibility (molasses, B-heavy, syrup, grain), ENA/IMFL production capability for non-fuel market, pharma-grade ethanol for higher realization, industry body price advocacy, multi-year contracts where possible',
        exposure: '₹50-200 Cr/year per distillery from adverse pricing or policy change'
      }
    ],
    bestPractices: [
      {
        id: 'dist-bp-1',
        title: 'Ethanol Facility Fire & Explosion Prevention',
        standard: 'OISD-116/117 + API 2510 + NFPA 30 + PESO (Petroleum Rules)',
        description: 'Safety engineering for the highest-hazard operation in sugar industry — ethanol production, storage, and dispatch.',
        recommendations: [
          'ALL electrical in ethanol zones: Ex-rated per IS/IEC 60079 (Zone 1 minimum for indoor)',
          'Continuous flammable gas detection: alarm at 20% LEL, trip at 40% LEL, extraction from floor',
          'Tank farm: full bunding (110% capacity), foam suppression system, PESO-compliant design',
          'Lightning protection system tested annually: earth resistance <1Ω per down-conductor',
          'Flame arrestors on ALL tank vents and breathing valves',
          'Pipeline inspection: annual UT + quarterly visual for corrosion at flanges/supports',
          'Automated tanker loading with vapor recovery and emergency shutdown',
          'Zero non-essential personnel in ethanol zone — automated operations + remote monitoring'
        ],
        benchmark: 'Praj Industries design standard for Indian ethanol facilities: zero fires in 50+ client plants following full specification compliance. Key differentiator: 100% Ex-rated + continuous gas detection + automated operations.'
      }
    ]
  },
  {
    id: 'processing-sugar',
    label: 'Sugar Processing',
    icon: '🧂',
    color: '#9C27B0',
    bannerImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
    bannerTitle: 'Sugar Processing & Storage',
    bannerSubtitle: 'Juice clarification, evaporation, crystallization, and sugar storage — dust explosion, steam hazards, and seasonal pressure.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'proc-naog-1',
        title: 'Sugar Dust Explosion — Packaging & Storage',
        severity: 'high',
        description: 'Fine sugar dust (generated during drying, screening, and packaging) is explosive (Kst = 100-200 bar·m/s, MIE = 30 mJ). Dust accumulates in bucket elevators, screen housings, packaging machine enclosures, and storage silos. The 2008 Imperial Sugar (USA) explosion killed 14 workers — the largest sugar dust explosion in history. Indian sugar mills have minimal awareness of dust explosion risk.',
        impactAreas: ['Silo Explosion', 'Packaging Area Explosion', 'Bucket Elevator Explosion', 'Secondary Explosion Propagation', 'Worker Fatalities'],
        typicalClaim: '₹20–100 Cr + potential fatalities'
      },
      {
        id: 'proc-naog-2',
        title: 'Multiple Effect Evaporator (MEE) Failure',
        severity: 'medium',
        description: 'Multiple Effect Evaporators concentrate juice from 15° to 60° Brix using steam at progressively lower pressures. Tube leaks cause juice contamination and efficiency loss. Calandria tube plate failure causes sudden vacuum loss. Robert-type evaporator bodies develop stress corrosion cracking from caustic cleaning chemicals. MEE failure reduces boiling house capacity 25-50%.',
        impactAreas: ['Tube Leak/Contamination', 'Vacuum Loss', 'Calandria Failure', 'Reduced Boiling Capacity', 'Sugar Quality Impact'],
        typicalClaim: '₹5–30 Cr + reduced daily crush capacity'
      },
      {
        id: 'proc-naog-3',
        title: 'Sugar Warehouse Fire / Collapse',
        severity: 'high',
        description: 'Sugar is stored in 50 kg bags stacked 20-25 high (5-6m) in warehouses holding 20,000-100,000 tonnes (₹60-300 Cr stock). Bag sugar is not highly flammable but jute bags are. Warehouse fires typically start from electrical faults and burn slowly through bag surfaces. More critically, overloading and bag deterioration cause stack collapse — worker burial risk. Government-mandated buffer stock creates prolonged storage.',
        impactAreas: ['Stock Fire (slow-burning)', 'Stack Collapse (worker burial)', 'Stock Degradation (moisture/inversion)', 'Government Stock Seizure', 'Market Price Loss'],
        typicalClaim: '₹20–100 Cr (stock damage/deterioration)'
      }
    ],
    riskMatrix: [
      { risk: 'Sugar Dust Explosion', prob: 2, impact: 3, score: 6, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-652', strategyTooltip: 'DHA + explosion vents + housekeeping + grounding + LEV in enclosed areas', owner: 'Safety Manager', trigger: 'Visible dust accumulation >1mm or housekeeping audit failure' },
      { risk: 'Sugar Warehouse Fire', prob: 2, impact: 2, score: 4, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Sprinkler protection + electrical maintenance + separation from sources of ignition', owner: 'Warehouse Head', trigger: 'Any fire detection alarm or electrical anomaly' },
      { risk: 'MEE Failure', prob: 3, impact: 1, score: 3, emv: '₹18 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.issct.org', strategyTooltip: 'Off-season UT inspection + caustic cleaning protocol + pressure testing', owner: 'Process Head', trigger: 'Tube leak detection or vacuum performance decline' },
    ],
    caseStudy: {
      title: 'Imperial Sugar (USA) — Sugar Dust Explosion (Reference Case)',
      location: 'Imperial Sugar, Port Wentworth, Georgia, USA',
      date: 'February 2008',
      loss: '$275 million + 14 fatalities',
      rootCause: 'Decades of sugar dust accumulation on surfaces, in enclosed conveying equipment, and inside building cavities created an explosive atmosphere throughout the sugar packing building. The initial explosion likely occurred in a bucket elevator or enclosed belt conveyor. The primary explosion dislodged accumulated dust from all surfaces creating massive secondary explosions that propagated through the entire facility. The plant had no explosion protection, inadequate housekeeping, and no dust hazard analysis.',
      impact: '14 workers killed, 38 injured (many with severe burns). Sugar refinery building completely destroyed. $275 million in total losses. The incident led to OSHA\'s Combustible Dust National Emphasis Program and eventually NFPA 652 (Combustible Dust standard). Company filed for bankruptcy. Criminal charges considered.',
      lessons: [
        'Sugar dust is EXPLOSIVE — awareness critically low in Indian sugar industry',
        'Combustible Dust Hazard Analysis (DHA) required per NFPA 652 for all sugar handling',
        'Housekeeping: zero dust accumulation >1mm (1/32 inch) on ANY surface',
        'Explosion vents on all enclosed equipment (elevators, conveyors, screens, silos)',
        'Electrical classification of sugar dust areas (Zone 21/22 per IEC 60079-10-2)',
        'No compressed air blow-down for cleaning (creates explosive dust cloud) — use vacuum only'
      ],
      benchmark: 'Post-2008, all major US/EU sugar refineries implement NFPA 652 DHA + explosion protection + rigorous housekeeping. Zero major sugar dust explosions in compliant facilities since. Indian sugar industry: virtually zero awareness/compliance.'
    },
    emergingRisks: [
      {
        id: 'proc-er-1',
        title: 'Sugar Dust Explosion Awareness Gap (Indian Context)',
        category: 'regulatory',
        severity: 'high',
        timeline: '2024-2028',
        description: 'Indian sugar industry has virtually zero awareness of combustible dust explosion risk. No Indian standard equivalent to NFPA 652 exists. Sugar mills pack, store, and handle fine sugar dust without explosion vents, proper housekeeping, or electrical area classification. An Imperial Sugar-type event in India is a matter of "when" not "if" — the conditions exist in hundreds of mills.',
        implications: ['No regulatory framework for combustible dust in India', 'Zero explosion protection in 95%+ of Indian sugar mills', 'High fatality potential (10-50+ workers) in enclosed packing areas', 'Insurers unaware of dust explosion exposure in sugar sector', 'Insurance claims will be unprecedented when event occurs']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'proc-ni-1',
        title: 'Sugar Price Control & Export Policy Uncertainty',
        category: 'Market / Policy',
        description: 'Government Minimum Selling Price (MSP: ₹31/kg since 2019, not revised despite cost increases) limits upside revenue. Export policy oscillates between open-general-license and restricted/prohibited within the same year based on domestic availability and elections. Mills cannot plan production/storage strategy when export policy changes quarterly.',
        mitigation: 'Value-added products (refined sugar, pharmaceutical sugar, specialty grades), ethanol diversion to reduce sugar production, brand building for premium realization, export market diversification, industry body price revision advocacy',
        exposure: '₹200-1,000 Cr/year industry-wide from below-cost MSP + export restrictions'
      }
    ],
    bestPractices: [
      {
        id: 'proc-bp-1',
        title: 'Sugar Dust Explosion Prevention',
        standard: 'NFPA 652 (Combustible Dust) + IEC 60079-10-2 + EN 14491 (Venting)',
        description: 'Preventing the most underestimated risk in Indian sugar manufacturing — combustible sugar dust explosions.',
        recommendations: [
          'Combustible Dust Hazard Analysis (DHA) for all sugar handling, packing, and storage areas',
          'Housekeeping: vacuum cleaning only (no compressed air), zero accumulation >1mm anywhere',
          'Explosion vents on ALL enclosed equipment: bucket elevators, conveyors, screens, silos',
          'Electrical area classification: Zone 21/22 per IEC 60079-10-2 in sugar dust areas',
          'Grounding and bonding of all conductive equipment in dust areas (static elimination)',
          'Dust collection system per NFPA 652 with explosion protection on collector itself',
          'Hot work prohibition in sugar dust areas without gas-free certificate + dust clearance'
        ],
        benchmark: 'Post-Imperial Sugar (2008), all major global refineries fully NFPA 652 compliant — zero major dust explosions in 15 years. Indian industry compliance: effectively 0%. This is the single largest unaddressed risk in Indian sugar sector.'
      }
    ]
  }
]
