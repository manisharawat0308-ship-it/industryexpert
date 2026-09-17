// Aviation Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const AVIATION_RISK_SOURCES: RiskSource[] = [
  {
    id: 'airline-operations',
    label: 'Airline Operations',
    icon: '✈️',
    color: '#0369a1',
    bannerImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&q=80',
    bannerTitle: 'Airline Operations & Fleet',
    bannerSubtitle: 'Aircraft fleet, flight operations, crew management — hull loss, third-party liability, and passenger safety risks.',
    aogPerils: [
      {
        id: 'air-aog-1',
        title: 'Natural Disaster — Airport & Fleet Damage',
        severity: 'critical',
        description: 'Cyclones, flooding, and hailstorms damage parked aircraft (₹500-2,500 Cr each), destroy airport infrastructure, and disrupt operations for weeks. The 2023 Cyclone Biparjoy forced 72-hour closure of Mumbai/Ahmedabad airports. Hailstorm damage to parked fleet can affect 20-50 aircraft simultaneously (₹5-50 Cr per aircraft for repairs). Airport flooding halts ALL operations.',
        impactAreas: ['Parked Aircraft Damage (hail/flood)', 'Airport Infrastructure Destruction', 'Flight Operations Halt', 'Revenue Loss (₹5-20 Cr/day per airline)', 'Passenger Reaccommodation Cost'],
        typicalClaim: '₹50–500 Cr (fleet damage + BI per airline)'
      }
    ],
    nonAogPerils: [
      {
        id: 'air-naog-1',
        title: 'Hull Loss / Major Accident',
        severity: 'critical',
        description: 'Aircraft hull loss (total destruction or beyond economic repair) from: CFIT (Controlled Flight Into Terrain), runway overrun, mid-air collision, or in-flight structural failure. A single B737/A320 hull loss: ₹500-800 Cr. Wide-body (B787/A350): ₹1,500-2,500 Cr. With 500+ aircraft in Indian carrier fleets, the probability of a hull loss event is statistically 1 per 5-10 years for the Indian industry.',
        impactAreas: ['Aircraft Total Loss (₹500-2,500 Cr)', 'Passenger Fatalities (liability)', 'Regulatory Grounding (fleet-wide)', 'Brand/Reputation Destruction', 'Stock Price Collapse'],
        typicalClaim: '₹1,000–10,000 Cr (hull + liability + BI)'
      },
      {
        id: 'air-naog-2',
        title: 'Engine Failure / Uncontained Event',
        severity: 'high',
        description: 'Jet engine failure modes: fan blade out (contained — engine destroyed, ₹100-200 Cr), uncontained failure (debris penetrates fuselage — potential catastrophe), bird strike (single engine: manageable, dual: critical). Engine shop visit cost: ₹30-80 Cr per engine. Spare engine pool management critical for fleet availability. The 2024 IndiGo engine issues grounded 70+ aircraft.',
        impactAreas: ['Engine Destruction (₹100-200 Cr)', 'Uncontained Debris Damage', 'Aircraft Grounding', 'Fleet-Wide Engine Issue (AD/SB)', 'Revenue Loss from Grounded Fleet'],
        typicalClaim: '₹100–500 Cr per event'
      },
      {
        id: 'air-naog-3',
        title: 'Cybersecurity — Airline IT & Operational Systems',
        severity: 'high',
        description: 'Airlines depend on complex IT: reservation systems (PSS), departure control (DCS), flight operations, crew scheduling, and maintenance planning. A ransomware attack or system failure halts: ticket sales, check-in, boarding, and flight dispatch. The 2023 British Airways multi-day IT failure stranded 100,000+ passengers. Indian airlines increasingly targeted by state-sponsored and criminal hackers.',
        impactAreas: ['Reservation System Lockout', 'Flight Operations Halt', 'Passenger Data Breach', 'Revenue Loss (₹20-50 Cr/day)', 'Regulatory Penalty'],
        typicalClaim: '₹50–500 Cr (BI + liability + remediation)'
      },
      {
        id: 'air-naog-4',
        title: 'Regulatory Grounding — Fleet-Wide Safety Issue',
        severity: 'critical',
        description: 'DGCA/FAA can ground entire aircraft types for safety issues: B737 MAX (worldwide, 2 years), P&W engine inspections (IndiGo 70+ aircraft), or country-specific safety concerns. A fleet grounding of 30-50% of aircraft creates ₹100-500 Cr/month revenue loss while lease payments continue. Airlines with single-type fleets (IndiGo: all A320 family) face total operational risk from type grounding.',
        impactAreas: ['Fleet Availability Collapse', 'Revenue Loss While Costs Continue', 'Lease Payment Obligation', 'Passenger Reaccommodation', 'Market Share Loss to Competitors'],
        typicalClaim: '₹500–5,000 Cr (extended grounding scenario)'
      }
    ],
    riskMatrix: [
      { risk: 'Hull Loss / Major Accident', prob: 1, impact: 3, score: 3, emv: '₹5,000 Cr', strategy: 'Transfer', strategyUrl: 'https://www.iata.org/en/programs/safety', strategyTooltip: 'Hull + liability insurance (₹15,000+ Cr per occurrence) + SMS + IOSA certification', owner: 'Head Flight Safety', trigger: 'ANY serious incident or unsafe trend in flight data monitoring' },
      { risk: 'Engine Fleet-Wide Issue', prob: 2, impact: 3, score: 6, emv: '₹300 Cr', strategy: 'Transfer', strategyUrl: 'https://www.agcs.allianz.com', strategyTooltip: 'Engine warranty + spare pool + BI insurance for grounding + diversified engine supplier', owner: 'VP Engineering', trigger: 'Airworthiness Directive affecting 10%+ of fleet' },
      { risk: 'Cyber Attack (IT Systems)', prob: 2, impact: 2, score: 4, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.iata.org/en/programs/safety/cyber-security', strategyTooltip: 'Cyber insurance + SOC 24/7 + DR capability + passenger data protection', owner: 'CISO', trigger: 'ANY suspicious system activity or breach indicator' },
      { risk: 'Natural Disaster (Fleet Damage)', prob: 2, impact: 2, score: 4, emv: '₹275 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'All-risk hull insurance + BI cover + aircraft evacuation protocols for weather', owner: 'VP Ground Operations', trigger: 'Cyclone/storm warning for bases with parked aircraft' },
    ],
    caseStudy: {
      title: 'IndiGo — P&W Engine Issues Grounding 70+ Aircraft',
      location: 'IndiGo (InterGlobe Aviation), Pan-India Operations',
      date: '2023-2024 (ongoing)',
      loss: '₹3,000+ Cr estimated (lost revenue + lease costs + passenger impact)',
      rootCause: 'Pratt & Whitney PW1100G-JM engines (powering IndiGo\'s A320neo fleet) developed premature powder metal disk degradation requiring accelerated inspection/removal. FAA Airworthiness Directive mandated inspection of 3,000+ engines globally. IndiGo\'s near-100% dependence on A320neo/PW1100G combination meant 70+ aircraft (30% of fleet) grounded simultaneously. Insufficient spare engine pool to maintain operations.',
      impact: 'Peak grounding: 72 aircraft (30% of 300+ fleet). Revenue loss: ₹200-300 Cr/month for 12+ months. Lease payments continue on grounded aircraft (₹50 Cr/month). Route cancellations affecting market position. Passenger compensation and reaccommodation: ₹100+ Cr. Stock price declined 15%. Total estimated financial impact: ₹3,000+ Cr over 18 months.',
      lessons: [
        'Single engine-type dependency creates catastrophic fleet grounding risk (diversify suppliers)',
        'Spare engine pool must account for AD/fleet-wide inspection scenarios (minimum 10% spare ratio)',
        'BI insurance for fleet grounding must cover ACTUAL revenue loss not just "physical damage" trigger',
        'Engine Power-by-the-Hour contracts: verify coverage clarity for manufacturer-defect groundings',
        'Long-term fleet strategy: mix engine types (A320neo CEO+NEO, or A320+B737) reduces concentration'
      ],
      benchmark: 'Lufthansa Group operates mixed fleet (A320neo with both PW + CFM engines, plus B737) — P&W groundings affected <10% of capacity vs IndiGo\'s 30%. Fleet diversification is the primary mitigation.'
    },
    emergingRisks: [
      {
        id: 'air-er-1',
        title: 'Sustainable Aviation Fuel (SAF) — Supply & Safety',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2035',
        description: 'Aviation decarbonization requires SAF (Sustainable Aviation Fuel) blending up to 50% initially, 100% by 2050. India has minimal SAF production capacity. Fuel quality variations, supply chain immaturity, and novel blend behavior (at cold temperatures, in older engine seals) create new safety considerations. SAF cost 3-5x conventional jet fuel compresses airline margins.',
        implications: ['SAF supply availability constraints', 'Fuel quality consistency challenges', 'Cold weather behavior in novel blends', 'Cost premium compressing margins (3-5x)', 'Older aircraft/engine compatibility concerns']
      },
      {
        id: 'air-er-2',
        title: 'Urban Air Mobility (eVTOL) — New Accident Category',
        category: 'technology',
        severity: 'medium',
        timeline: '2026-2035',
        description: 'India planning eVTOL (electric vertical takeoff & landing) air taxi services in metros (InterGlobe partnership with Archer Aviation). Battery-powered aircraft operating in urban areas introduce: lithium battery fire risk over populated areas, new airspace deconfliction challenges, unproven reliability in Indian climate conditions, and undefined liability framework for autonomous/remotely-piloted urban aircraft.',
        implications: ['Battery fire over populated areas', 'Airspace deconfliction with helicopters/drones', 'Unproven reliability in extreme heat/dust', 'Undefined regulatory/liability framework', 'Public acceptance challenges post-accident']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'air-ni-1',
        title: 'Fuel Price Volatility & Hedging Risk',
        severity: 'high',
        category: 'Market / Commodity',
        description: 'ATF (Aviation Turbine Fuel) constitutes 35-45% of Indian airline operating costs. ATF prices in India are 30-60% higher than global averages due to taxation (VAT 1-30% by state). Price swings of ₹20,000-40,000/KL in a year create ₹500-2,000 Cr margin impact per large airline. Hedging carries its own risk — Jet Airways lost ₹2,000 Cr on wrong-way hedges in 2008.',
        mitigation: 'Conservative hedging strategy (50-60% of next 6 months), fuel surcharge mechanism in pricing, operational fuel efficiency programs (3-5% annual improvement), state government VAT advocacy, fleet modernization for fuel-efficient aircraft',
        exposure: '₹500-3,000 Cr/year per large airline from ATF volatility'
      },
      {
        id: 'air-ni-2',
        title: 'Slot/Route Scarcity & Airport Congestion',
        category: 'Infrastructure / Regulatory',
        description: 'Indian metro airports (Mumbai, Delhi) at 100%+ capacity. Slot allocation is political and opaque. New entrants struggle to get viable slots. Runway/taxiway incursion risk increases with congestion. Go First bankruptcy freed 200 slots — allocation created controversy. Airport capacity expansion (Navi Mumbai, Noida) delayed 5-10 years creating persistent congestion.',
        mitigation: 'Slot portfolio management, secondary airport strategy, long-haul routes (less slot-constrained), airline-airport partnerships, advocacy for transparent slot allocation, operational efficiency to maximize utilization of existing slots',
        exposure: '₹500-2,000 Cr revenue limitation per airline from slot constraints'
      }
    ],
    bestPractices: [
      {
        id: 'air-bp-1',
        title: 'Aviation Safety Management System (SMS)',
        standard: 'ICAO Annex 19 + IATA IOSA + DGCA CAR + FAA SMS Rule',
        description: 'Industry-standard safety management preventing the catastrophic consequences of aviation accidents — where a single event can destroy an airline.',
        recommendations: [
          'IOSA (IATA Operational Safety Audit) certification maintained continuously',
          'Flight Data Monitoring (FDM): 100% of flights analyzed for exceedance/trend',
          'Safety reporting culture: non-punitive reporting with minimum 10 reports/1,000 flights',
          'Risk assessment for ALL operational changes (routes, aircraft types, procedures)',
          'Fatigue Risk Management System (FRMS) per ICAO guidance',
          'Emergency Response Plan tested annually with full-scale exercise',
          'Maintenance reliability program: engine trend monitoring + predictive analytics',
          'Fleet grounding contingency: documented BCP for 10/20/50% fleet unavailability scenarios'
        ],
        benchmark: 'Singapore Airlines/Qantas: zero hull losses in 50+ years through uncompromising safety culture, data-driven risk management, and investment exceeding regulatory minimums. Industry gold standard.'
      }
    ]
  },
  {
    id: 'mro-maintenance',
    label: 'MRO & Maintenance',
    icon: '🔧',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80',
    bannerTitle: 'MRO (Maintenance, Repair & Overhaul)',
    bannerSubtitle: 'Aircraft heavy maintenance, engine overhaul, and component repair — precision operations with FOD, chemical, and fire risks.',
    aogPerils: [
      {
        id: 'mro-aog-1',
        title: 'Natural Disaster — Hangar & Aircraft-in-Maintenance Damage',
        severity: 'critical',
        description: 'MRO hangars house aircraft undergoing heavy checks worth ₹500-2,500 Cr each. Hurricane/cyclone wind exceeding hangar door design loads collapses doors onto aircraft. Flooding damages aircraft systems opened for maintenance (especially landing gear bays, belly compartments). A single heavy check aircraft damaged during maintenance represents ₹50-200 Cr claim.',
        impactAreas: ['Aircraft-in-Maintenance Damage', 'Hangar Structural Collapse', 'Tool/Equipment Destruction', 'Work-in-Progress Loss', 'Customer Aircraft Liability'],
        typicalClaim: '₹50–500 Cr per event'
      }
    ],
    nonAogPerils: [
      {
        id: 'mro-naog-1',
        title: 'Maintenance Error — Return to Service Incident',
        severity: 'critical',
        description: 'Maintenance error (incorrect installation, missed inspection, wrong part, tool left inside) causing in-flight incident creates catastrophic liability. The 2019 Lion Air B737 MAX maintenance-related AOA sensor mis-calibration contributed to the 189-fatality crash. Indian MROs growing rapidly (Air India Engineering, Tata Boeing) with workforce experience gaps create heightened human error risk.',
        impactAreas: ['In-Flight Incident/Accident', 'Potential Fatalities', 'Criminal Prosecution of Mechanics', 'MRO License Suspension', 'All Customer Aircraft Grounded for Re-inspection'],
        typicalClaim: '₹100–10,000 Cr (if incident causes accident)'
      },
      {
        id: 'mro-naog-2',
        title: 'Hangar Fire — Aircraft & Chemical',
        severity: 'critical',
        description: 'MRO hangars contain: aircraft with residual fuel (5-50 tonnes), solvents for paint stripping, composite repair materials (epoxy), hydraulic fluids, and oxygen systems. A fire in a hangar with a wide-body aircraft can create ₹2,000+ Cr loss (aircraft + hangar + adjacent aircraft). Composite aircraft (B787) generate toxic fumes when burning. Standard hangar foam systems must deliver 10 LPM/m² within 60 seconds.',
        impactAreas: ['Customer Aircraft Destruction', 'Hangar Building Loss', 'Adjacent Aircraft Damage', 'Toxic Composite Fume Release', 'Business Reputation Destruction'],
        typicalClaim: '₹200–3,000 Cr (customer aircraft + hangar + BI)'
      },
      {
        id: 'mro-naog-3',
        title: 'FOD (Foreign Object Debris/Damage)',
        severity: 'high',
        description: 'Tools, fasteners, or debris left inside aircraft during maintenance can cause: engine ingestion (FOD damage ₹30-100 Cr), control system jamming, fuel system contamination, or structural damage. FOD from one MRO event affects multiple aircraft if contaminated tooling/supplies used across fleet. Indian MRO sector growing faster than workforce maturity — FOD risk is elevated.',
        impactAreas: ['Engine FOD Damage', 'Control System Malfunction', 'Repeat Inspection Requirement', 'Customer Relationship Damage', 'Regulatory Finding'],
        typicalClaim: '₹5–100 Cr per FOD event'
      }
    ],
    riskMatrix: [
      { risk: 'Maintenance Error (causing accident)', prob: 1, impact: 3, score: 3, emv: '₹5,000 Cr', strategy: 'Avoid', strategyUrl: 'https://www.easa.europa.eu/en/domains/maintenance-continuing-airworthiness', strategyTooltip: 'Human factors program + independent inspection + digital task cards + MEDA investigation', owner: 'VP Quality', trigger: 'ANY near-miss, duplicate inspection failure, or MRO finding' },
      { risk: 'Hangar Fire', prob: 1, impact: 3, score: 3, emv: '₹1,500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-409', strategyTooltip: 'NFPA 409 foam system + hot work control + fuel drain before maintenance + composite fire protocol', owner: 'Facility Manager', trigger: 'Fire detection activation in hangar' },
      { risk: 'FOD Event', prob: 2, impact: 2, score: 4, emv: '₹53 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.faa.gov/airports/airport_safety/fod', strategyTooltip: 'Tool control program + FOD walks + positive parts return + zone inspection before closure', owner: 'Chief Inspector', trigger: 'ANY tool unaccounted for at shift end' },
      { risk: 'Natural Disaster (Hangar)', prob: 1, impact: 3, score: 3, emv: '₹275 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Property + customer aircraft liability insurance + hangar door wind rating + weather protocol', owner: 'Facility Director', trigger: 'Cyclone/storm warning for MRO location' },
    ],
    caseStudy: {
      title: 'Air India Engineering — Hangar Roof Collapse During Monsoon',
      location: 'Air India Engineering, Mumbai Airport (MRO Hangar)',
      date: 'July 2023',
      loss: '₹120 Cr (aircraft damage + facility + BI)',
      rootCause: 'Intense monsoon rainfall (200mm in 6 hours) overwhelmed the aging hangar roof drainage system. Standing water load on the roof (40+ year old structure) exceeded design capacity. Partial roof collapse dropped debris and rainwater onto a B777 aircraft undergoing C-check. Water ingress into opened avionics bays and landing gear wells caused extensive electronic/hydraulic system damage requiring complete replacement.',
      impact: 'B777 aircraft damage: ₹80 Cr (avionics + hydraulics + wiring replacement). Hangar repair: ₹20 Cr. MRO operations disrupted for 3 months (hangar unusable). Lost MRO revenue: ₹20 Cr. Air India subsequently approved ₹500 Cr for new MRO facility at MIAL (Navi Mumbai Airport). Customer airline filed claim for aircraft damage + delay.',
      lessons: [
        'Hangar roof structural assessment annually — especially for structures >25 years old',
        'Drainage system capacity must account for climate change rainfall intensification',
        'Aircraft with opened panels/bays must be covered with protective barriers when in hangar',
        'Weather protocol: close all aircraft panels before monsoon season intensification',
        'Customer aircraft insurance: MRO must carry adequate bailee liability for all aircraft in care'
      ],
      benchmark: 'Singapore Airlines Engineering: all hangars designed to 1-in-500 year rainfall, annual structural assessment, and mandatory panel closure protocol before any forecast heavy rain — zero weather-related aircraft damage in 40 years of MRO operations.'
    },
    emergingRisks: [
      {
        id: 'mro-er-1',
        title: 'Composite Aircraft Maintenance — New Damage Modes',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'B787 and A350 composite fuselages present new maintenance challenges: barely visible impact damage (BVID) requiring specialized NDT, delamination from moisture ingress, lightning strike zone repair complexity, and toxic fume generation during composite repair (cured at 180°C with epoxy). Indian MROs building composite capability face steep learning curve with expensive errors.',
        implications: ['Missed BVID causing structural concern', 'Repair complexity and cost exceeding expectations', 'Toxic fume exposure during composite repair', 'Specialized tooling and clean room requirements', 'Insurance coverage gaps for composite repair errors']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'mro-ni-1',
        title: 'Skilled Workforce Shortage & Poaching',
        category: 'Human Capital',
        description: 'Indian MRO sector needs 15,000+ additional AMEs (Aircraft Maintenance Engineers) by 2030. Currently producing <3,000/year. Experienced engineers poached by Gulf/Singapore MROs at 3-5x Indian salaries. Every departing AME takes 5+ years of training investment and specialized type-ratings. Workforce gaps force overtime, increase fatigue, and elevate human error risk.',
        mitigation: 'Competitive compensation, retention bonuses tied to type-rating investment, apprenticeship programs, DGCA training school partnerships, automation of routine inspection tasks (drone inspection, AI-assisted NDT)',
        exposure: '₹100-500 Cr per large MRO from workforce constraints (lost revenue + error risk)'
      }
    ],
    bestPractices: [
      {
        id: 'mro-bp-1',
        title: 'MRO Human Factors & Error Prevention',
        standard: 'ICAO Doc 9859 + EASA Part-145 + FAA AC 120-72A + MEDA',
        description: 'Preventing maintenance errors that could cause in-flight incidents — where a single mistake can have catastrophic consequences.',
        recommendations: [
          'Human Factors training: initial + recurrent annually for all maintenance staff',
          'Critical task identification: independent dual inspection for ALL flight-critical work',
          'Digital task cards with mandatory step-by-step sign-off (no batch signing)',
          'Tool control: shadowed tool boards, FOD accounting at shift end, positive parts return',
          'Fatigue Risk Management: maximum 12-hour shifts, adequate rest between critical tasks',
          'MEDA (Maintenance Error Decision Aid) investigation for EVERY maintenance finding',
          'Zone inspection before panel/cowl closure — documented with photos',
          'Just culture: non-punitive reporting of errors to enable learning (not punishment)'
        ],
        benchmark: 'Lufthansa Technik: zero maintenance-caused in-flight shutdowns across 400+ aircraft maintained annually — through digital task cards, dual inspection culture, and MEDA-based continuous improvement.'
      }
    ]
  },
  {
    id: 'airport-infrastructure',
    label: 'Airport Infrastructure',
    icon: '🏢',
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
