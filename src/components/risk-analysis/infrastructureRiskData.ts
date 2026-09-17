// Infrastructure Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const INFRASTRUCTURE_RISK_SOURCES: RiskSource[] = [
  {
    id: 'roads-highways',
    label: 'Roads & Highways',
    icon: '🛣️',
    color: '#334155',
    bannerImage: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1200&q=80',
    bannerTitle: 'Roads, Highways & Bridges',
    bannerSubtitle: 'Expressways, national highways, bridges, and tunnels — construction, geotechnical, and operational risks over 30-year concessions.',
    aogPerils: [
      {
        id: 'rh-aog-1',
        title: 'Flood / Landslide — Road & Bridge Washout',
        severity: 'critical',
        description: 'Highway infrastructure faces flood damage to embankments, bridge scour (foundation erosion), and landslides in hilly terrain. The 2023 Himachal/Uttarakhand floods destroyed 2,000+ km of roads and 100+ bridges. Bridge scour is the #1 cause of bridge collapse globally. Under BOT/HAM concessions, the concessionaire bears reconstruction cost + lost toll revenue during closure.',
        impactAreas: ['Bridge Scour/Collapse', 'Embankment Washout', 'Landslide Blockage', 'Toll Revenue Loss', 'Reconstruction Cost'],
        typicalClaim: '₹50–500 Cr + toll revenue loss'
      },
      {
        id: 'rh-aog-2',
        title: 'Earthquake — Bridge & Structure Damage',
        severity: 'high',
        description: 'Bridges, flyovers, and elevated corridors in seismic zones face collapse risk. Older bridges without seismic detailing (bearings, expansion joints, pier reinforcement) are vulnerable. The 2001 Bhuj earthquake damaged 100+ bridges. Long-span and cable-stayed bridges require special seismic design. A single major bridge collapse creates casualties + connectivity loss + reconstruction.',
        impactAreas: ['Bridge Deck Collapse', 'Pier/Foundation Damage', 'Bearing/Joint Failure', 'Casualties (if occupied)', 'Connectivity Disruption'],
        typicalClaim: '₹100–1,000 Cr per major bridge'
      }
    ],
    nonAogPerils: [
      {
        id: 'rh-naog-1',
        title: 'Bridge Collapse — Structural/Construction Failure',
        severity: 'critical',
        description: 'Bridge collapse from: design error, construction defect, material failure, overloading, or age-related deterioration. The 2022 Morbi suspension bridge collapse (135 killed) from corroded cables + overcrowding + negligent maintenance is the recent Indian tragedy. Under-construction bridge collapses (girder launching failures) are also common. Bridge collapse creates mass casualties + criminal liability + connectivity loss.',
        impactAreas: ['Mass Casualties', 'Structure Total Loss', 'Criminal Prosecution', 'Connectivity Loss', 'Reconstruction (12-24 months)'],
        typicalClaim: '₹100–1,000 Cr + mass fatality liability'
      },
      {
        id: 'rh-naog-2',
        title: 'Construction Phase Accident — Girder/Formwork Collapse',
        severity: 'high',
        description: 'Highway/metro construction involves heavy girder launching, formwork, and cantilever operations. Girder launcher failure, formwork collapse, or crane failure during construction causes worker fatalities and asset loss. The 2019 Varanasi flyover collapse (15 killed) and multiple metro construction accidents demonstrate the risk. CAR (Contractor All Risk) insurance covers physical loss but not consequential delay.',
        impactAreas: ['Girder/Formwork Collapse', 'Worker Fatalities', 'Public Casualties (if urban)', 'Project Delay', 'Equipment Loss'],
        typicalClaim: '₹20–200 Cr + fatality liability'
      },
      {
        id: 'rh-naog-3',
        title: 'Tunnel Collapse / Water Ingress',
        severity: 'critical',
        description: 'Highway/rail tunnels face collapse during construction (Himalayan geology is treacherous) and operation. The 2023 Silkyara tunnel collapse (Uttarakhand) trapped 41 workers for 17 days. Water ingress, poor rock quality, and inadequate support cause collapses. Tunnel fires (vehicle accidents) create mass casualty risk with limited escape routes.',
        impactAreas: ['Tunnel Collapse (worker entrapment)', 'Water Ingress Flooding', 'Tunnel Fire (mass casualty)', 'Project Delay (months)', 'Equipment Burial'],
        typicalClaim: '₹50–500 Cr + fatality liability'
      }
    ],
    riskMatrix: [
      { risk: 'Bridge Collapse', prob: 1, impact: 3, score: 3, emv: '₹500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.irc.nic.in', strategyTooltip: 'Design per IRC codes + independent proof checking + load rating + inspection regime', owner: 'Chief Engineer', trigger: 'Structural distress, scour, or overloading detected' },
      { risk: 'Flood/Scour Damage', prob: 2, impact: 3, score: 6, emv: '₹200 Cr', strategy: 'Mitigate', strategyUrl: 'https://morth.nic.in', strategyTooltip: 'Scour protection + drainage design + slope stabilization + flood-resilient design', owner: 'Project Director', trigger: 'Flood warning or scour monitoring alarm' },
      { risk: 'Construction Accident', prob: 2, impact: 2, score: 4, emv: '₹75 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.bis.gov.in', strategyTooltip: 'CAR insurance + method statements + temporary works design + safety supervision', owner: 'Construction Manager', trigger: 'Girder launch/formwork operation or crane lift' },
      { risk: 'Tunnel Collapse', prob: 2, impact: 3, score: 6, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ita-aites.org', strategyTooltip: 'Geotechnical investigation + NATM + monitoring + escape provisions', owner: 'Tunnel Engineer', trigger: 'Convergence monitoring exceeding limits or water ingress' },
    ],
    caseStudy: {
      title: 'Morbi Bridge Collapse — Maintenance Negligence',
      location: 'Morbi Suspension Bridge, Machchhu River, Gujarat',
      date: 'October 2022',
      loss: '₹100+ Cr + 135 fatalities',
      rootCause: 'The 143-year-old suspension bridge was reopened after "renovation" by a company (Oreva) with no bridge engineering expertise. The renovation replaced the walking deck (adding weight) but did NOT replace the corroded main cables (the load-bearing element). No load capacity assessment, no third-party structural certification, no crowd control. On reopening day, 300+ people (4x safe capacity) crowded the bridge. The corroded cables snapped under the excess load. 135 people (many children) drowned.',
      impact: '135 fatalities. Company executives arrested (culpable homicide). Municipal officials suspended. National review of heritage bridge safety. Demonstrated the fatal consequences of: unqualified maintenance, missing structural certification, and absent crowd control. Insurance complications from unauthorized operation.',
      lessons: [
        'Structural work on bridges MUST be by qualified bridge engineers with certification',
        'Load capacity assessment before reopening ANY renovated structure',
        'Independent third-party structural proof-checking mandatory',
        'Crowd/load control for pedestrian bridges (occupancy limits enforced)',
        'Cable/critical element inspection: corrosion assessment is life-safety critical',
        'Fitness-for-service certification before public access to old structures'
      ],
      benchmark: 'Golden Gate Bridge (USA): continuous structural health monitoring, cable inspection program, load management, and qualified engineering oversight — 85+ years of safe operation. Structural integrity of critical elements is never compromised for cost.'
    },
    emergingRisks: [
      {
        id: 'rh-er-1',
        title: 'Climate Resilience — Design Standard Inadequacy',
        category: 'climate',
        severity: 'high',
        timeline: '2024-2035',
        description: 'Road/bridge infrastructure designed to historical rainfall/flood data faces climate change intensification. 1-in-100-year events now occurring every 10-20 years. Existing drainage, scour protection, and slope stability designs are inadequate. The 2023 Himalayan floods destroyed recently-built infrastructure. Retrofitting climate resilience to existing assets costs ₹10,000+ Cr nationally.',
        implications: ['Historical design parameters inadequate', 'Increased flood/landslide frequency', 'Scour protection under-designed', 'Retrofit cost for existing assets', 'Higher insurance premiums for climate-exposed routes']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'rh-ni-1',
        title: 'Traffic Forecast Risk & Toll Revenue Shortfall',
        category: 'Market / Financial',
        description: 'BOT (Build-Operate-Transfer) highway projects depend on 30-year traffic forecasts for revenue. Actual traffic often falls 20-40% below forecast (optimism bias, alternative routes, economic changes). Many BOT projects became NPAs from traffic shortfall. HAM (Hybrid Annuity Model) shifted some risk to government but concessionaires still bear O&M and forecast risk.',
        mitigation: 'Conservative traffic forecasting, HAM over BOT structure, diversified project portfolio, traffic guarantee negotiations, alternative revenue (wayside amenities), refinancing at lower rates post-construction',
        exposure: '₹500-5,000 Cr per project (traffic shortfall over concession period)'
      }
    ],
    bestPractices: [
      {
        id: 'rh-bp-1',
        title: 'Bridge & Structure Safety Management',
        standard: 'IRC Codes + IRC:SP:35 (Bridge Inspection) + Eurocode + AASHTO',
        description: 'Preventing bridge collapse through design integrity, construction quality, and lifecycle inspection.',
        recommendations: [
          'Independent proof-checking of all bridge designs by qualified structural engineers',
          'Load rating assessment before opening and after any modification',
          'Bridge inspection regime: routine (annual), principal (5-year), special (post-event)',
          'Scour monitoring for all river bridges (the #1 collapse cause globally)',
          'Cable/tendon inspection for suspension/cable-stayed bridges (corrosion critical)',
          'Load management/enforcement (weigh stations) preventing overloading',
          'Bridge health monitoring (sensors) for critical/long-span structures',
          'Fitness-for-service certification for structures >50 years or post-distress'
        ],
        benchmark: 'International bridge management (USA/EU): mandatory biennial inspection, load rating database, scour monitoring, and health sensors on critical bridges — collapse rate <0.001% annually vs India\'s higher rate from inspection gaps.'
      }
    ]
  },
  {
    id: 'urban-metro',
    label: 'Urban & Metro',
    icon: '🚇',
    color: '#1e40af',
    bannerImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80',
    bannerTitle: 'Metro, Urban Transit & Buildings',
    bannerSubtitle: 'Metro rail, high-rise buildings, and urban development — construction, fire safety, and operational risks in dense environments.',
    aogPerils: [
      {
        id: 'um-aog-1',
        title: 'Earthquake — High-Rise & Metro Structure',
        severity: 'critical',
        description: 'Urban infrastructure (high-rises 40-100 floors, elevated metro corridors, underground stations) in seismic zones faces collapse/damage. Delhi, NCR (Zone IV), and NE Indian cities are highly seismic. A major earthquake in a dense city with poor-quality construction (as in Turkey 2023, 50,000+ deaths) would be catastrophic. Metro underground stations face liquefaction and tunnel deformation risks.',
        impactAreas: ['High-Rise Collapse (mass casualty)', 'Metro Tunnel Deformation', 'Elevated Corridor Damage', 'Underground Station Flooding', 'Urban Connectivity Collapse'],
        typicalClaim: '₹500–10,000 Cr (major urban event)'
      },
      {
        id: 'um-aog-2',
        title: 'Urban Flooding — Metro & Basement Inundation',
        severity: 'high',
        description: 'Underground metro stations and building basements flood during intense urban rainfall. Chennai Metro, Mumbai infrastructure regularly flood. Underground metro flooding (as in Zhengzhou China 2021, 14 killed in flooded metro) creates drowning risk for trapped passengers. Building basement parking (housing electrical/pumps) destroyed by flooding halts building operations.',
        impactAreas: ['Metro Tunnel/Station Flooding', 'Passenger Safety (drowning risk)', 'Basement M&E Destruction', 'Building Operations Halt', 'Extended Restoration'],
        typicalClaim: '₹50–500 Cr + passenger liability'
      }
    ],
    nonAogPerils: [
      {
        id: 'um-naog-1',
        title: 'High-Rise Building Fire',
        severity: 'critical',
        description: 'High-rise fires create mass casualty risk from evacuation challenges. Combustible facade cladding (like Grenfell Tower London 2017, 72 killed) accelerates vertical fire spread. Indian high-rises frequently have: non-compliant cladding, blocked fire exits, non-functional fire systems, and inadequate refuge areas. The 2018 Mumbai Kamala Mills fire (14 killed) and multiple high-rise fires demonstrate systemic gaps.',
        impactAreas: ['Facade Fire Spread (Grenfell-type)', 'Mass Casualties', 'Building Total Loss', 'Occupant Displacement', 'Criminal Prosecution'],
        typicalClaim: '₹100–1,000 Cr + mass fatality liability'
      },
      {
        id: 'um-naog-2',
        title: 'Metro Construction Accident',
        severity: 'high',
        description: 'Metro construction in dense urban areas faces: tunnel boring machine (TBM) incidents, deep excavation collapse, girder launching failure over live traffic, and utility strikes (gas/water/power). The 2016 Kolkata Metro tunnel collapse (buildings collapsed, evacuations) and multiple girder collapses over roads demonstrate urban construction risk. Public casualties (not just workers) elevate liability.',
        impactAreas: ['TBM Incident/Sinkhole', 'Deep Excavation Collapse', 'Girder Collapse (over traffic)', 'Adjacent Building Damage', 'Public + Worker Casualties'],
        typicalClaim: '₹50–300 Cr + public liability'
      },
      {
        id: 'um-naog-3',
        title: 'Metro Operational — Signal/Fire/Collision',
        severity: 'high',
        description: 'Operating metros face: signaling failure (collision risk), fire in tunnels/trains (evacuation challenge), power failure (passenger stranding), and platform-track incidents. Metro systems carry 2-5 million passengers/day. A tunnel fire or collision could cause mass casualties. Cybersecurity of signaling systems is an emerging concern (train control manipulation).',
        impactAreas: ['Train Collision', 'Tunnel/Train Fire', 'Mass Passenger Evacuation', 'System-Wide Shutdown', 'Public Safety Liability'],
        typicalClaim: '₹50–500 Cr per major incident'
      }
    ],
    riskMatrix: [
      { risk: 'High-Rise Fire', prob: 2, impact: 3, score: 6, emv: '₹500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-101', strategyTooltip: 'Non-combustible cladding + sprinklers + pressurized stairwells + refuge floors', owner: 'Building Manager', trigger: 'Fire system impairment or combustible cladding identified' },
      { risk: 'Metro Construction Accident', prob: 2, impact: 2, score: 4, emv: '₹110 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ita-aites.org', strategyTooltip: 'Geotechnical monitoring + TBM management + protection of public + method statements', owner: 'Construction Director', trigger: 'Ground settlement or excavation instability detected' },
      { risk: 'Metro Operational Incident', prob: 1, impact: 3, score: 3, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.metrorailtoday.com', strategyTooltip: 'CBTC signaling + fire safety + emergency evacuation + cyber security', owner: 'Operations Director', trigger: 'Signal fault, fire alarm, or security breach' },
      { risk: 'Earthquake (Urban)', prob: 1, impact: 3, score: 3, emv: '₹2,500 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Seismic design + property/BI insurance + structural retrofit of older buildings', owner: 'Chief Engineer', trigger: 'Seismic event in urban region' },
    ],
    caseStudy: {
      title: 'Grenfell Tower (UK) — High-Rise Facade Fire (Reference)',
      location: 'Grenfell Tower, London, UK',
      date: 'June 2017',
      loss: '£1 Billion+ + 72 fatalities',
      rootCause: 'A refrigerator fire on the 4th floor of the 24-story residential tower spread to the exterior via combustible ACM (Aluminium Composite Material) cladding with polyethylene core — installed during a recent refurbishment. The cladding acted as a fire accelerant, spreading flames up the entire building exterior within 30 minutes. The "stay put" fire strategy (designed for compartmentalized buildings) failed catastrophically. Single staircase, no sprinklers, and failed fire doors trapped residents. 72 died.',
      impact: '72 fatalities. £1 billion+ in costs. UK-wide ban on combustible cladding. Building Safety Act 2022. Identification of 1,000s of buildings with dangerous cladding requiring £15 billion remediation. Fundamental reform of building safety regulation. Global awareness of facade fire risk — India has similar cladding on many high-rises.',
      lessons: [
        'Combustible facade cladding (ACM-PE) creates catastrophic vertical fire spread — ban it',
        'High-rise sprinkler systems mandatory (Grenfell had none)',
        '"Stay put" strategy only valid with intact compartmentalization — needs backup evacuation',
        'Single staircase inadequate for high-rise — minimum 2 protected escape routes',
        'Fire doors: self-closing, fire-rated, regularly inspected (Grenfell\'s failed)',
        'Refurbishment must not compromise fire safety (Grenfell cladding was cost-driven)'
      ],
      benchmark: 'Singapore/UAE high-rise standards: non-combustible cladding mandatory, 100% sprinkler coverage, pressurized stairwells, refuge floors every 20-25 floors, and fire lifts — zero major high-rise fire fatalities despite thousands of towers.'
    },
    emergingRisks: [
      {
        id: 'um-er-1',
        title: 'Combustible Cladding Retrofit Liability',
        category: 'regulatory',
        severity: 'high',
        timeline: '2024-2030',
        description: 'Post-Grenfell global scrutiny reveals thousands of Indian high-rises with combustible ACM cladding. As awareness grows, liability for developers/builders who installed dangerous cladding emerges. Retrofit cost (₹2-10 Cr per building) and interim fire safety measures create financial exposure. Insurance for buildings with combustible cladding becoming difficult/expensive.',
        implications: ['Retrofit liability for developers/builders', 'Insurance difficulty for combustible-clad buildings', 'Regulatory mandate for cladding replacement', 'Interim fire safety measure costs', 'Property value impact for affected buildings']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'um-ni-1',
        title: 'Land Acquisition & Project Delay',
        category: 'Regulatory / Execution',
        description: 'Urban infrastructure (metro, roads, buildings) faces chronic land acquisition delays, litigation, environmental clearance holdups, and utility relocation issues. Delays of 2-5 years are common, escalating costs 30-100%. Interest during construction (IDC) on delayed projects erodes returns. No insurance covers regulatory/land delay-driven cost overruns.',
        mitigation: 'Pre-construction land clearance, phased execution, government coordination, contingency budgeting, dispute resolution mechanisms, land pooling models',
        exposure: '₹500-5,000 Cr per major project (cost escalation from multi-year delays)'
      }
    ],
    bestPractices: [
      {
        id: 'um-bp-1',
        title: 'High-Rise Fire & Life Safety',
        standard: 'NBC India 2016 + NFPA 101 + NFPA 5000 + Post-Grenfell Building Safety Act',
        description: 'Preventing high-rise fire catastrophe through non-combustible construction and reliable life safety systems.',
        recommendations: [
          'Non-combustible facade cladding ONLY (no ACM-PE or combustible insulation)',
          '100% sprinkler coverage including all floors, basements, and refuge areas',
          'Minimum 2 protected (pressurized) staircases for buildings >7 floors',
          'Refuge floors/areas at intervals per NBC for very tall buildings',
          'Fire lifts (firefighter access) for buildings >15m height',
          'Fire doors: self-closing, fire-rated, quarterly inspection',
          'Fire command center with building-wide PA and monitoring',
          'Annual fire drill + third-party fire safety audit (not self-certification)'
        ],
        benchmark: 'Singapore high-rise code: non-combustible cladding + full sprinklers + pressurized escapes + refuge floors — zero high-rise fire fatalities across 1,000s of towers. The achievable standard for Indian high-rises.'
      }
    ]
  },
  {
    id: 'transmission-lines',
    label: 'Transmission Lines',
    icon: '🗼',
    color: '#0891b2',
    bannerImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
    bannerTitle: 'Power Transmission & Grid Infrastructure',
    bannerSubtitle: 'Extra-high-voltage transmission lines, towers, substations, and the national grid — natural hazard, equipment, and cascading-failure risks.',
    aogPerils: [
      {
        id: 'tl-aog-1',
        title: 'Cyclone / Storm — Tower Collapse & Conductor Damage',
        severity: 'high',
        description: 'Transmission towers and conductors face collapse and snapping in high winds. Cyclone Amphan (2020) and Tauktae (2021) toppled hundreds of towers, cutting power to millions for days. A single collapsed EHV (400/765 kV) line can island a region and disrupt the grid. Long transmission corridors cross diverse terrain, making them highly exposed to storms, floods, and landslides.',
        impactAreas: ['Tower Collapse', 'Conductor Snapping', 'Regional Power Isolation', 'Extended Restoration (days)', 'Grid Instability'],
        typicalClaim: '₹20–300 Cr per corridor event'
      },
      {
        id: 'tl-aog-2',
        title: 'Flood / Landslide — Substation & Line Foundation Damage',
        severity: 'high',
        description: 'Substations (housing transformers and switchgear) flood during extreme rainfall, and transmission-tower foundations are undermined by floods and landslides in hilly terrain. A flooded substation can be out of service for weeks, and foundation failure topples towers. The 2023 Himalayan floods damaged transmission infrastructure across Himachal and Uttarakhand.',
        impactAreas: ['Substation Flooding', 'Tower Foundation Failure', 'Transformer Water Damage', 'Line Outage', 'Restoration Cost'],
        typicalClaim: '₹30–400 Cr per major event'
      }
    ],
    nonAogPerils: [
      {
        id: 'tl-naog-1',
        title: 'Transmission/Grid Failure — Cascading Blackout',
        severity: 'critical',
        description: 'Grid instability causes cascading failures. The 2012 India blackout (world\'s largest, 620 million affected) demonstrated grid vulnerability. Transformer failures, protection malfunction, or overload trigger cascading trips. Rising solar/wind intermittency increases grid stress. A regional grid collapse halts industry, transport, and essential services affecting millions.',
        impactAreas: ['Cascading Grid Collapse', 'Regional Blackout (millions affected)', 'Transformer/Equipment Damage', 'Economic Disruption', 'Restoration Complexity (days)'],
        typicalClaim: '₹100–2,000 Cr + economic consequences'
      },
      {
        id: 'tl-naog-2',
        title: 'Transformer / Substation Fire & Failure',
        severity: 'high',
        description: 'Large power transformers (₹20-100 Cr each, 12-18 month replacement lead time) at substations face internal faults, insulation failure, and oil-fed fires. A transformer explosion/fire can destroy adjacent equipment and take a substation offline. Long lead times for replacement transformers make a single failure a multi-month outage with heavy grid impact.',
        impactAreas: ['Transformer Explosion/Fire', 'Substation Outage', 'Adjacent Equipment Damage', 'Long Replacement Lead Time (12-18 months)', 'Grid Load Redistribution'],
        typicalClaim: '₹50–500 Cr + extended BI'
      },
      {
        id: 'tl-naog-3',
        title: 'Construction / Stringing Accident & Right-of-Way Issues',
        severity: 'medium',
        description: 'Transmission-line construction (tower erection, conductor stringing across live corridors, river crossings) involves work-at-height and electrical hazards. Stringing failures, crane incidents, and contact with live lines cause fatalities. Right-of-way (RoW) disputes and forest clearances routinely delay projects, escalating cost.',
        impactAreas: ['Work-at-Height Fatalities', 'Stringing/Crane Failure', 'Contact with Live Lines', 'RoW / Clearance Delay', 'Cost Escalation'],
        typicalClaim: '₹10–100 Cr + fatality liability'
      }
    ],
    riskMatrix: [
      { risk: 'Grid Cascade Failure', prob: 1, impact: 3, score: 3, emv: '₹500 Cr', strategy: 'Mitigate', strategyUrl: 'https://posoco.in', strategyTooltip: 'Protection coordination + islanding schemes + reactive power management + SCADA', owner: 'Grid Operations Head', trigger: 'Frequency deviation or protection maloperation' },
      { risk: 'Cyclone Tower Collapse', prob: 2, impact: 2, score: 4, emv: '₹150 Cr', strategy: 'Mitigate', strategyUrl: 'https://cea.nic.in', strategyTooltip: 'Higher wind-zone tower design + guyed towers + rapid-restoration stockpiles', owner: 'Transmission Head', trigger: 'Cyclone warning for line corridor' },
      { risk: 'Transformer Fire/Failure', prob: 2, impact: 3, score: 6, emv: '₹250 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'DGA/oil monitoring + Buchholz protection + spare transformer strategy + MB insurance', owner: 'Substation Manager', trigger: 'Dissolved-gas anomaly or Buchholz alarm' },
      { risk: 'Flood/Landslide (Substation)', prob: 2, impact: 2, score: 4, emv: '₹120 Cr', strategy: 'Mitigate', strategyUrl: 'https://cwc.gov.in', strategyTooltip: 'Elevated substation design + flood barriers + slope stabilization for towers', owner: 'Project Director', trigger: 'Flood warning or slope-monitoring alarm' },
    ],
    caseStudy: {
      title: '2012 India Blackout — Northern & Eastern Grid Collapse',
      location: 'Northern, Eastern & North-Eastern Grids, India',
      date: 'July 2012',
      loss: '620 million people affected + massive economic disruption',
      rootCause: 'Overdrawal by northern states beyond scheduled limits, combined with weak inter-regional transmission links and a protection relay maloperation on a key 400 kV line, triggered a cascading trip. As overloaded lines tripped one after another, the Northern Grid collapsed on 30 July; the following day the Northern, Eastern, and North-Eastern grids collapsed together — the largest blackout in history. Root causes: indiscipline in grid drawal, inadequate reactive-power management, and insufficient protection coordination/islanding schemes.',
      impact: 'Over 620 million people (half of India) lost power. Trains halted, mines trapped miners, hospitals ran on backup, and industry stopped. Exposed structural weaknesses in the national grid. Led to major reforms: stronger inter-regional links, tighter grid discipline (POSOCO enforcement), wide-area measurement (PMUs/synchrophasors), and defence-mechanism/islanding schemes.',
      lessons: [
        'Protection coordination and defence plans (islanding) prevent local faults cascading nationally',
        'Grid discipline — enforce scheduled drawal limits with real-time penalties',
        'Reactive power / voltage management is critical to grid stability',
        'Wide-area monitoring (PMUs/synchrophasors) for early instability detection',
        'Strong inter-regional transmission links add resilience and redundancy',
        'Black-start capability and restoration drills for rapid recovery'
      ],
      benchmark: 'Post-2012 India grid: national synchronous grid ("One Nation, One Grid"), POSOCO real-time monitoring, synchrophasor deployment, and defence mechanisms — no comparable nationwide collapse since, despite record demand growth.'
    },
    emergingRisks: [
      {
        id: 'tl-er-1',
        title: 'Renewable Evacuation Stress & Grid-Scale Storage',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2032',
        description: 'India\'s renewable push (500 GW by 2030) concentrates generation in specific zones (Rajasthan/Gujarat solar, Tamil Nadu wind), stressing transmission corridors that must evacuate variable power over long distances. Intermittency raises the risk of congestion, voltage instability, and forced curtailment. Grid-scale battery storage (BESS) added at substations introduces new lithium fire-safety exposure.',
        implications: ['Transmission congestion in renewable-rich zones', 'Voltage/stability management with high renewables', 'Curtailment without compensation', 'New BESS fire risk at substations', 'Large HVDC/green-corridor capex']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'tl-ni-1',
        title: 'Right-of-Way, Forest Clearance & Regulatory Delay',
        category: 'Regulatory / Execution',
        description: 'Transmission projects cross farmland, forests, and multiple states, facing chronic right-of-way (RoW) disputes, forest/wildlife clearances, and land-compensation litigation. Delays of 2-4 years are common, escalating cost and delaying renewable evacuation. Tariff determination by regulators can also cap returns. No insurance covers RoW/clearance-driven delay and cost overrun.',
        mitigation: 'Early RoW acquisition + higher compensation, route optimisation around forests, government coordination (Gati Shakti), phased energisation, and contingency budgeting',
        exposure: '₹200-2,000 Cr per major corridor (cost escalation from multi-year delays)'
      }
    ],
    bestPractices: [
      {
        id: 'tl-bp-1',
        title: 'Grid Reliability & Transmission Asset Management',
        standard: 'CEA Grid Standards + IEGC + CIGRE + IEEE + ISO 55000 (Asset Management)',
        description: 'Ensuring reliability of transmission lines, substations, and the grid through design resilience, monitoring, and defence mechanisms.',
        recommendations: [
          'Protection coordination + islanding/defence schemes to prevent cascading collapse',
          'Wide-area monitoring (PMUs/synchrophasors) for real-time stability visibility',
          'Transformer health monitoring: dissolved-gas analysis (DGA) + Buchholz + oil testing',
          'Spare-transformer strategy given 12-18 month replacement lead times',
          'Higher wind-zone tower design + rapid-restoration tower/conductor stockpiles',
          'Elevated/flood-protected substation design in flood-prone regions',
          'Vegetation and right-of-way management to prevent flashover trips',
          'Black-start capability and periodic grid-restoration drills'
        ],
        benchmark: 'Power Grid Corporation of India (POWERGRID): >99.9% transmission availability across the national backbone, extensive synchrophasor deployment, and post-2012 defence mechanisms — best-practice reliability for a continent-scale grid.'
      }
    ]
  },
  {
    id: 'airport-infrastructure',
    label: 'Aviation & Airports',
    icon: '🛫',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=1200&q=80',
    bannerTitle: 'Airport Infrastructure & Ground Handling',
    bannerSubtitle: 'Terminals, runways, ground support equipment, and ATC — construction, fire, and operational risks.',
    aogPerils: [
      {
        id: 'apt-aog-1',
        title: 'Earthquake — Terminal & Runway Structural Damage',
        severity: 'critical',
        description: 'Airport terminals (₹5,000-30,000 Cr investment) with long-span roofs, elevated walkways, and glass facades are vulnerable to seismic damage. Runway surface cracking/heaving halts all operations. The 2024 Japan earthquake at Noto closed the airport for 3 months. Indian airports in Zone IV-V (Delhi, Kolkata, NE India) face significant seismic risk. A major metro airport closure disrupts national connectivity.',
        impactAreas: ['Terminal Structural Damage', 'Runway/Taxiway Cracking', 'ATC Tower Damage', 'National Connectivity Disruption', 'Massive Economic Impact'],
        typicalClaim: '₹500–10,000 Cr (infrastructure + BI)'
      },
      {
        id: 'apt-aog-2',
        title: 'Flood — Runway & Terminal Inundation',
        severity: 'high',
        description: 'Airport flooding from intense rainfall overwhelms drainage. Mumbai Airport (CSMIA) floods regularly during monsoon — 2017 event closed airport for 36 hours affecting 300+ flights. Chennai Airport closed 2 weeks during 2015 floods. Submerged taxiways, flooded terminals, and damaged ground equipment create multi-billion rupee impacts. Climate change intensifying urban flooding at many Indian airports.',
        impactAreas: ['Runway Closure (days-weeks)', 'Terminal Flooding', 'Ground Equipment Damage', 'Airline Revenue Loss (multi-carrier)', 'Passenger Stranding'],
        typicalClaim: '₹100–2,000 Cr (infrastructure + multi-airline BI)'
      }
    ],
    nonAogPerils: [
      {
        id: 'apt-naog-1',
        title: 'Airport Terminal Fire',
        severity: 'critical',
        description: 'Airport terminals combine: large public occupancy (50,000-200,000 people/day), extensive retail/F&B with fire load, complex M&E systems, and limited evacuation routes (security constraints). Terminal fire creates mass evacuation challenge, flight disruption, and potential loss of life. The 2014 Nairobi JKIA terminal fire destroyed the international arrivals building (3 months to rebuild). Delhi T1 roof collapse (2024) demonstrated structural vulnerability.',
        impactAreas: ['Mass Evacuation', 'Terminal Operational Shutdown', 'Flight Disruption (all airlines)', 'Retail/Commercial Loss', 'National Connectivity Impact'],
        typicalClaim: '₹200–5,000 Cr (terminal + BI + liability)'
      },
      {
        id: 'apt-naog-2',
        title: 'Runway Incursion / Ground Collision',
        severity: 'critical',
        description: 'Runway incursion (unauthorized presence on active runway) risk increases with traffic congestion. Indian airports handle 1,000+ movements/day at peak. A ground collision between aircraft (KLM/PanAm Tenerife 1977: 583 fatalities) remains aviation\'s worst disaster. Near-misses at Indian airports have increased 3x as traffic grows faster than infrastructure. ATC workload a contributing factor.',
        impactAreas: ['Aircraft-to-Aircraft Collision', 'Mass Fatalities', 'Airport Closure', 'Worldwide Regulatory Response', 'Industry Credibility Crisis'],
        typicalClaim: '₹5,000–20,000 Cr (dual aircraft + fatalities + consequences)'
      }
    ],
    riskMatrix: [
      { risk: 'Terminal Fire', prob: 1, impact: 3, score: 3, emv: '₹2,500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-415', strategyTooltip: 'NFPA 415 compliant design + fire compartments + evacuation system + sprinkler', owner: 'Airport Director', trigger: 'ANY fire alarm activation in terminal' },
      { risk: 'Runway Incursion/Collision', prob: 2, impact: 3, score: 6, emv: '₹10,000 Cr', strategy: 'Avoid', strategyUrl: 'https://www.icao.int/safety/RunwaySafety', strategyTooltip: 'A-SMGCS (surface movement radar) + runway status lights + ICAO runway safety team', owner: 'ATC Chief', trigger: 'ANY runway incursion report or near-miss' },
      { risk: 'Flood (Airport Operations)', prob: 2, impact: 2, score: 4, emv: '₹1,000 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.aai.aero', strategyTooltip: 'Enhanced drainage + flood barriers + pumping capacity + weather contingency plans', owner: 'Airport CEO', trigger: 'Rainfall >50mm/hour or flood warning' },
    ],
    caseStudy: {
      title: 'Delhi Airport T1 — Roof Canopy Collapse',
      location: 'Indira Gandhi International Airport, Terminal 1, New Delhi',
      date: 'June 2024',
      loss: '₹50 Cr (structural + operational + compensation) + 1 fatality',
      rootCause: 'Intense monsoon rainfall (100mm in 3 hours) combined with structural fatigue in the Terminal 1 departure forecourt canopy (constructed 2009, 15 years old). Water ponding on the canopy exceeded design load. Progressive collapse of steel canopy structure dropped debris onto vehicles and passengers below. 1 fatality, 8 injuries. Terminal 1 closure for 3 months for structural assessment.',
      impact: 'T1 closed 3 months (1 fatality + structural safety concern). 300+ flights/day diverted to T2/T3 creating massive congestion. SpiceJet, IndiGo operations severely impacted. AAI facing criminal liability for structural maintenance failure. Structural audit ordered for ALL Indian airport terminal structures. Insurance claim for property + liability + BI.',
      lessons: [
        'Annual structural health monitoring for all terminal canopy/roof structures — not just visual',
        'Water ponding loads must be calculated and drainage designed for 1-in-100-year rainfall',
        'Steel structure corrosion assessment critical in humid/monsoon climates (annual thickness check)',
        'Passenger forecourt design must account for progressive collapse scenario',
        'Climate change increasing rainfall intensity — original design parameters may be inadequate'
      ],
      benchmark: 'Changi Airport (Singapore): annual structural assessment of all terminal structures using strain gauges + FEA modeling + proactive replacement of corroded members — zero structural incidents in 40 years despite tropical monsoon climate.'
    },
    emergingRisks: [
      {
        id: 'apt-er-1',
        title: 'Drone Intrusion — Airport Airspace Disruption',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Unauthorized drones near airports cause immediate runway closure (pilot safety concern). A single drone sighting can halt operations for 30-60 minutes — affecting 20-50 flights. The 2018 Gatwick drone incident closed the airport for 36 hours (1,000 flights, 140,000 passengers affected). Indian airports increasingly reporting drone sightings — no comprehensive counter-drone system deployed yet.',
        implications: ['Runway closure from drone sighting (30-60 min each)', 'Potential drone-aircraft collision (catastrophic)', 'Difficulty identifying and neutralizing drones', 'Counter-drone technology immature and expensive', 'Legal framework for drone prosecution unclear']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'apt-ni-1',
        title: 'Concession Agreement & Regulatory Risk',
        category: 'Regulatory / Contract',
        description: 'Private airport operators (Adani, GMR) operate under 30-year concession agreements with AERA-regulated tariffs. Regulatory tariff orders can cap revenue below investment recovery requirements. Government can amend concession terms unilaterally under "public interest". Airport sector specific risk: traffic forecast errors over 30-year concession create revenue uncertainty for which no insurance exists.',
        mitigation: 'Conservative traffic forecasting, revenue diversification (non-aero: retail, cargo, real estate), regulatory relationship management, contractual dispute resolution mechanisms, multi-airport portfolio reducing concentration',
        exposure: '₹5,000-20,000 Cr per major airport (concession value erosion from adverse tariff/traffic)'
      }
    ],
    bestPractices: [
      {
        id: 'apt-bp-1',
        title: 'Airport Fire & Rescue Services (AFRS)',
        standard: 'ICAO Annex 14 Chapter 9 + NFPA 403/415 + DGCA CAR + ARFF Category Rating',
        description: 'Ensuring adequate fire response capability for the unique combination of aircraft accidents and terminal/infrastructure fires at airports.',
        recommendations: [
          'ARFF category maintained 24/7 matching largest aircraft operated (ICAO Category 6-10)',
          'Response time: first vehicle on scene within 3 minutes of alert (ICAO requirement)',
          'Agent quantities: meeting or exceeding ICAO Annex 14 Table 9-2 for declared category',
          'Terminal fire protection: sprinkler + smoke management + evacuation system per NFPA 415',
          'Annual full-scale emergency exercise involving airlines, ATC, hospital, and police',
          'Structural fire assessment: annual for ALL terminal and airside structures',
          'Counter-drone capability: detection system for 5 km perimeter around runway approaches',
          'Flood management: pumping capacity for 1-in-100 year rainfall intensity'
        ],
        benchmark: 'Dubai Airport: Category 10 ARFF with 3-minute response, annual structural assessment, AI-based surface movement monitoring, and ₹500 Cr drainage upgrade (post-2024 flooding) — targeting zero weather closures despite desert flash flood risk.'
      }
    ]
  }
]
