// Paper Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const PAPER_RISK_SOURCES: RiskSource[] = [
  {
    id: 'pulping',
    label: 'Pulping & Recovery',
    icon: '🌲',
    color: '#2E7D32',
    bannerImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
    bannerTitle: 'Pulping & Chemical Recovery',
    bannerSubtitle: 'Wood/bagasse digestion, black liquor recovery boiler, chemical preparation — highest hazard area in paper manufacturing.',
    aogPerils: [
      {
        id: 'pulp-aog-1',
        title: 'Flood / Inundation — Wood Yard & Chemical Storage',
        severity: 'high',
        description: 'Paper mills are typically located near rivers for water supply (150-250 m³/tonne of paper). Monsoon flooding submerges wood yards (₹50-200 Cr inventory), chemical storage tanks (NaOH, Na2S, ClO2), and low-lying pump houses. Chemical mixing with floodwater creates toxic/corrosive runoff and environmental contamination. The 2023 ITC PSPD Bhadrachalam flood destroyed ₹180 Cr of raw material.',
        impactAreas: ['Wood Yard Submersion', 'Chemical Tank Overflow', 'Pump House Inundation', 'Environmental Contamination', 'Raw Material Degradation'],
        typicalClaim: '₹50–250 Cr + 2-4 months BI'
      },
      {
        id: 'pulp-aog-2',
        title: 'Cyclone — Chip Pile & Stack Damage',
        severity: 'medium',
        description: 'Coastal mills (AP, Odisha, Tamil Nadu) face cyclone risk. Wind damages outdoor chip storage conveyors, tears off building cladding exposing paper machines, and topples tall chemical recovery stacks (60-80m). The wood chip pile (covering 2-5 acres) scatters across the plant in high winds creating secondary fire and blockage hazards.',
        impactAreas: ['Chip Pile Scattering', 'Recovery Boiler Stack Damage', 'Building Cladding Loss', 'Crane/Conveyor Toppling', 'Power Line Disruption'],
        typicalClaim: '₹20–100 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'pulp-naog-1',
        title: 'Recovery Boiler Smelt-Water Explosion',
        severity: 'critical',
        description: 'The single most catastrophic event in pulp & paper. Recovery boilers burn concentrated black liquor (65-75% solids) to recover cooking chemicals (Na2S, Na2CO3). Molten smelt at 800°C collects at the furnace floor. If feedwater tubes leak, water contacts smelt causing a steam explosion with force equivalent to 5-50 tonnes of TNT. The 1992 Weyerhaeuser Longview explosion killed 1 and caused $200M damage. Multiple incidents globally with fatalities.',
        impactAreas: ['Boiler Destruction', 'Building Collapse', 'Multiple Fatalities', 'Chemical Spill', 'Environmental Catastrophe'],
        typicalClaim: '₹200–1,000 Cr + 12-24 months BI'
      },
      {
        id: 'pulp-naog-2',
        title: 'Recovery Boiler Tube Leak & Emergency Shutdown',
        severity: 'high',
        description: 'Recovery boiler tubes (carbon steel, stainless steel, or composite) corrode from smelt-side attack (Na2S) and fireside erosion. A tube leak introduces water into the smelt bed — if detected early, emergency water drain and controlled shutdown prevent explosion. However, the 72-hour controlled shutdown/restart cycle costs ₹5-10 Cr each time, and tube repair takes 7-21 days.',
        impactAreas: ['Emergency Boiler Shutdown', 'Smelt Bed Flooding Risk', 'Tube Replacement Downtime', 'Chemical Loop Disruption', 'Cooking Liquor Shortage'],
        typicalClaim: '₹20–80 Cr + 2-6 weeks BI'
      },
      {
        id: 'pulp-naog-3',
        title: 'Digester Vessel Failure — Pressure/Chemical',
        severity: 'high',
        description: 'Continuous digesters (Kamyr type) operate at 170°C, 10-12 bar with highly alkaline cooking liquor (NaOH + Na2S). Stress corrosion cracking (SCC) of the vessel shell, nozzle weld failures, or extraction screen blockage causing overpressure can result in catastrophic vessel rupture releasing superheated alkaline liquor. Digester inspection requires 30-day shutdown.',
        impactAreas: ['Vessel Rupture', 'Hot Alkaline Liquor Release', 'Worker Chemical Burns', 'Building Structural Damage', 'Extended Outage (vessel repair 3-6 months)'],
        typicalClaim: '₹50–200 Cr + 3-6 months BI'
      },
      {
        id: 'pulp-naog-4',
        title: 'Lime Kiln Refractory Failure & Ring Formation',
        severity: 'medium',
        description: 'Lime kilns (recausticizing circuit) convert CaCO3 to CaO at 1,200°C. Refractory failure exposes the shell to flame. Ring formation (calcium silicate buildup) causes blockages requiring manual removal in hazardous confined-space conditions. Shell deformation from overheating necessitates costly repair or replacement.',
        impactAreas: ['Shell Hot Spot', 'Refractory Collapse', 'Ring Blockage', 'Lime Mud Overflow', 'Chemical Circuit Disruption'],
        typicalClaim: '₹10–50 Cr + 2-6 weeks BI'
      },
      {
        id: 'pulp-naog-5',
        title: 'ClO2 Generator Explosion — Bleach Plant',
        severity: 'high',
        description: 'Chlorine dioxide (ClO2) for ECF bleaching is generated on-site by reducing sodium chlorate with methanol/H2SO4. ClO2 gas is explosive above 10% concentration in air. Generator vessel failure, vacuum loss, or excess methanol feed creates explosive atmosphere. ClO2 release is also acutely toxic (TLV 0.1 ppm).',
        impactAreas: ['Generator Explosion', 'Toxic Gas Release', 'Bleach Plant Shutdown', 'Worker Evacuation', 'Regulatory Action'],
        typicalClaim: '₹15–60 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Recovery Boiler Explosion', prob: 1, impact: 3, score: 3, emv: '₹600 Cr', strategy: 'Avoid', strategyUrl: 'https://www.blrbac.org', strategyTooltip: 'BLRBAC compliance + emergency drain system + leak detection + SIL-rated interlocks', owner: 'VP Operations', trigger: 'Any tube leak indication or smelt-water contact' },
      { risk: 'Recovery Boiler Tube Leak', prob: 3, impact: 2, score: 6, emv: '₹50 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.tappi.org', strategyTooltip: 'UT thickness survey + composite tube upgrades + emergency drain protocol', owner: 'Recovery Boiler Head', trigger: 'UT thickness <3mm or acoustic emission alert' },
      { risk: 'Digester Vessel Failure', prob: 1, impact: 3, score: 3, emv: '₹125 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.asme.org', strategyTooltip: 'SCC inspection + PWHT + operational envelope control', owner: 'Pulp Mill Head', trigger: 'SCC indication on NDE or operating beyond design envelope' },
      { risk: 'ClO2 Explosion', prob: 2, impact: 2, score: 4, emv: '₹38 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.osha.gov/chemical-reactivity', strategyTooltip: 'Vacuum maintenance + concentration monitoring + emergency dilution', owner: 'Bleach Plant Head', trigger: 'ClO2 concentration >8% or vacuum loss alarm' },
      { risk: 'Lime Kiln Failure', prob: 2, impact: 1, score: 2, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.refractories-worldforum.com', strategyTooltip: 'Shell scanner + ring removal schedule + refractory life tracking', owner: 'Recaust Head', trigger: 'Shell temp >350°C or ring growth rate increasing' },
    ],
    caseStudy: {
      title: 'Picton (New Zealand) — Recovery Boiler Smelt-Water Explosion',
      location: 'Tasman Pulp & Paper, Kawerau, New Zealand',
      date: 'Historical Reference (1984) — Still Relevant',
      loss: 'NZ$100M+ (equivalent ₹500+ Cr today)',
      rootCause: 'A superheater tube developed a pinhole leak. Water dripped onto the molten smelt bed at the furnace floor. The initial small steam explosions were not detected by operators because of background noise. Over 15 minutes, the leak enlarged until a massive smelt-water interaction occurred. The explosion destroyed the boiler, collapsed the building roof, and ejected debris 200m. Root cause: no smelt-water detection system, no emergency drain, and inadequate tube inspection program.',
      impact: 'Boiler destroyed beyond repair. Building collapsed. One fatality. Mill shut for 18 months while new recovery boiler was built. The incident transformed global recovery boiler safety — leading to BLRBAC (Black Liquor Recovery Boiler Advisory Committee) standards now universally adopted.',
      lessons: [
        'Emergency drain system mandatory — drains smelt bed within 10 minutes of any tube leak detection',
        'Smelt-water detection (acoustic, thermal, or chemical) with automatic feedwater shutoff',
        'Annual UT inspection of all boiler floor tubes and lower furnace tubes',
        'Composite tubes (stainless-carbon steel co-extruded) in smelt-contact zones',
        'BLRBAC compliance audit every 3 years — now standard for insurance worldwide'
      ],
      benchmark: 'BLRBAC member mills have achieved zero smelt-water explosions since 2000 (25+ years) through mandatory emergency drain, leak detection, and inspection standards. Indian mills adopting BLRBAC: <30%.'
    },
    emergingRisks: [
      {
        id: 'pulp-er-1',
        title: 'Dissolving Pulp / Viscose Transition Risk',
        category: 'market',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'Traditional paper demand declining 2-3%/year. Mills converting to dissolving pulp (for viscose/lyocell textiles) face new process risks: carbon disulfide (CS2) handling (toxic, flammable), different cooking chemistry, and new wastewater challenges. CS2 storage/handling adds chemical process risk absent in paper operations.',
        implications: ['CS2 toxic exposure risk (TLV 10 ppm)', 'New explosion hazard from CS2 (flash point -30°C)', 'Process chemistry learning curve', 'Different effluent treatment requirements', 'Insurance product gaps for converted mills']
      },
      {
        id: 'pulp-er-2',
        title: 'Raw Material Shift — Plantation vs Natural Forest',
        category: 'regulatory',
        severity: 'high',
        timeline: '2024-2030',
        description: 'FSC/PEFC certification requirements tightening. Mills dependent on natural forest wood face supply risk from deforestation regulations. Plantation eucalyptus/acacia supply requires 7-year planning cycles. Climate change affecting plantation yields. Agro-residue (bagasse, wheat straw) creates different process risks (silica, black liquor composition).',
        implications: ['Raw material supply disruption from certification requirements', 'Plantation yield reduction from climate change', 'Different process risks from agro-residue feedstock', 'Community opposition to eucalyptus monoculture', 'Supply chain Scope 3 emissions reporting burden']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'pulp-ni-1',
        title: 'Water Allocation & Effluent Discharge Restrictions',
        category: 'Regulatory / Resource',
        description: 'Pulp mills consume 100-250 m³/tonne of paper and discharge high-BOD/COD effluent. CPCB ZLD (Zero Liquid Discharge) mandate and river basin water allocation frameworks increasingly restrict both intake and discharge. A single NGT order can force production curtailment or shutdown. The 2019 Tamil Nadu mill closures affected 5 paper mills simultaneously.',
        mitigation: 'Water recycling achieving <30 m³/tonne, treated effluent reuse for plantations, rainwater harvesting, common effluent treatment partnerships, technology upgrade to low-water processes (shoe press, closed water circuit)',
        exposure: '₹200-1,000 Cr per mill (production curtailment + compliance capex)'
      },
      {
        id: 'pulp-ni-2',
        title: 'Digital Substitution — Structural Demand Decline',
        category: 'Market / Strategic',
        description: 'Writing/printing paper demand declining 5-8%/year in India from digitalization (UPI replacing cheques, e-governance reducing form usage, e-books/news). Mills face stranded capacity for graphic paper grades. Conversion to packaging grades requires ₹500-1,500 Cr capex with uncertain ROI given competition from recycled board.',
        mitigation: 'Conversion to packaging grades (kraft liner, fluting), specialty grades (filter paper, currency paper), dissolving pulp for textiles, tissue paper (growing 12%/year in India)',
        exposure: '₹500-3,000 Cr per company (stranded asset + conversion capex risk)'
      }
    ],
    bestPractices: [
      {
        id: 'pulp-bp-1',
        title: 'Recovery Boiler Safety Management',
        standard: 'BLRBAC Guidelines + TAPPI TIP 0402-18 + IBR (India)',
        description: 'Comprehensive safety program for the most hazardous equipment in pulp & paper — the black liquor recovery boiler. Smelt-water explosion is a "never event" with proper management.',
        recommendations: [
          'BLRBAC-compliant emergency drain system — drains smelt bed in <10 minutes',
          'Smelt-water contact detection: acoustic emission + thermal sensors at furnace floor',
          'Annual UT inspection of ALL floor tubes and lower furnace tubes (100% coverage)',
          'Composite tube installation in smelt-contact zones (304L/carbon steel co-extruded)',
          'Automatic feedwater shutoff on any tube leak detection signal (SIL-2 rated)',
          'Pre-startup checklist with independent verification of all safety systems',
          'BLRBAC compliance audit by certified inspector every 3 years'
        ],
        benchmark: 'BLRBAC member mills globally: zero smelt-water explosions in 25 years across 400+ boilers. Indian compliance rate: only 30% — significant gap.'
      },
      {
        id: 'pulp-bp-2',
        title: 'Digester Integrity Management',
        standard: 'ASME FFS-1/API 579 + TAPPI TIP 0402-19',
        description: 'Preventing stress corrosion cracking (SCC) in continuous digesters — the root cause of catastrophic vessel failure.',
        recommendations: [
          'Wet fluorescent magnetic particle inspection (WFMPI) of all nozzle welds at every shutdown',
          'TOFD (Time of Flight Diffraction) ultrasonic examination of vessel shell welds',
          'Caustic stress corrosion cracking (CSCC) susceptibility assessment per API 571',
          'Post-weld heat treatment (PWHT) verification for all repair welds',
          'Operating envelope monitoring: temperature, pressure, and alkali concentration',
          'Fitness-for-service assessment per API 579 for any detected flaw'
        ],
        benchmark: 'Stora Enso achieves zero unplanned digester shutdowns through 5-yearly comprehensive inspection + continuous AE monitoring — industry-leading digester reliability >99.5%.'
      }
    ]
  },
  {
    id: 'papermaking',
    label: 'Paper Machine',
    icon: '📄',
    color: '#1565C0',
    bannerImage: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=1200&q=80',
    bannerTitle: 'Paper Machine Operations',
    bannerSubtitle: 'Forming, pressing, drying — high-speed continuous operation at 1,000-1,800 m/min with fire, mechanical, and steam risks.',
    aogPerils: [
      {
        id: 'pm-aog-1',
        title: 'Earthquake — Machine Foundation Settlement',
        severity: 'high',
        description: 'Paper machines (100-200m length, precision-aligned to ±0.1mm) on massive concrete foundations are sensitive to differential settlement. Even 2mm settlement misaligns forming section geometry, press nip loads, and dryer section felts. The machine must be completely realigned — a 3-6 month process for large machines.',
        impactAreas: ['Foundation Differential Settlement', 'Machine Frame Misalignment', 'Section Drive Misalignment', 'Bearing Load Redistribution', 'Product Quality Failure'],
        typicalClaim: '₹50–200 Cr + 3-6 months BI'
      },
      {
        id: 'pm-aog-2',
        title: 'Flood — Basement & Drive Systems',
        severity: 'high',
        description: 'Paper machine basements house hydraulic systems, lubrication units, vacuum pumps, and drive motors. These are typically 3-5m below grade level. Flooding destroys drive systems, electrical switchgear, and precision bearings. Machine drive systems (sectional AC drives) have 4-6 month lead time for replacement.',
        impactAreas: ['Drive System Destruction', 'Lubrication System Contamination', 'Vacuum Pump Submersion', 'Electrical Switchgear Damage', 'Bearing Contamination'],
        typicalClaim: '₹40–150 Cr + 3-6 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'pm-naog-1',
        title: 'Dryer Section Fire — Paper/Felt Ignition',
        severity: 'critical',
        description: 'The dryer section (40-80 steam-heated cylinders at 120-180°C) is the primary fire hazard. Paper dust accumulation on doctor blades, broke pits, and dryer hoods ignites from friction, hot surfaces, or sparks. At machine speeds of 1,000-1,800 m/min, fire propagates through the entire dryer section in minutes. The paper web itself becomes fuel. Hood fire suppression must activate within seconds.',
        impactAreas: ['Dryer Hood Fire', 'Felt/Fabric Destruction', 'Dryer Cylinder Damage', 'Frame Distortion from Heat', 'Complete Machine Rebuild'],
        typicalClaim: '₹100–500 Cr + 6-18 months BI'
      },
      {
        id: 'pm-naog-2',
        title: 'Yankee Dryer Failure — Tissue/Board Machines',
        severity: 'critical',
        description: 'Yankee dryers (4-6m diameter, cast iron or steel shell) operate at 5-10 bar steam pressure. The shell is progressively ground thinner by creping doctors over its life. When shell thickness reduces below design minimum, catastrophic failure releases steam explosively. A Yankee failure is an explosion equivalent to a pressure vessel BLEVE — it has killed workers globally.',
        impactAreas: ['Yankee Shell Explosion', 'Building Structural Damage', 'Multiple Fatalities', 'Adjacent Equipment Destruction', 'Complete Line Replacement'],
        typicalClaim: '₹150–600 Cr + 12-24 months BI (new Yankee: 12-18 month lead time)'
      },
      {
        id: 'pm-naog-3',
        title: 'Paper Machine Main Drive / Gearbox Failure',
        severity: 'high',
        description: 'Modern paper machines use sectional AC drives (50-100 individual drive points). Older machines have line shafts with massive gearboxes. Main drive motor failure or gearbox seizure stops the entire machine. Precision rebuild of paper machine gearboxes takes 3-6 months at specialized workshops.',
        impactAreas: ['Complete Machine Stop', 'Gearbox Internal Destruction', 'Drive Motor Burnout', 'Shaft Coupling Failure', 'Production Loss'],
        typicalClaim: '₹30–150 Cr + 2-6 months BI'
      },
      {
        id: 'pm-naog-4',
        title: 'Steam System Failure — Dryer Section',
        severity: 'high',
        description: 'Dryer sections use 8-15 bar steam in 40-80 cylinders with rotary joints, siphons, and condensate systems. Rotary joint failure sprays steam in the working area. Dryer cylinder corrosion (internal) causes shell thinning — failure at operating pressure is explosive. Condensate system blockage causes water hammer with destructive force.',
        impactAreas: ['Rotary Joint Steam Release', 'Dryer Cylinder Failure', 'Water Hammer Damage', 'Steam Line Rupture', 'Personnel Scalding'],
        typicalClaim: '₹10–80 Cr + 2-8 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'Dryer Section Fire', prob: 2, impact: 3, score: 6, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-76', strategyTooltip: 'Dryer hood suppression + spark detection + housekeeping + broke pit inerting', owner: 'Machine Superintendent', trigger: 'Spark detected or dust accumulation >2mm on any surface' },
      { risk: 'Yankee Dryer Failure', prob: 1, impact: 3, score: 3, emv: '₹375 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.tappi.org', strategyTooltip: 'Shell thickness monitoring + metallurgical assessment + pressure testing', owner: 'Chief Engineer', trigger: 'Shell thickness approaching minimum design (typically 25mm for cast iron)' },
      { risk: 'Machine Drive Failure', prob: 2, impact: 2, score: 4, emv: '₹90 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP; vibration monitoring + oil analysis + spare strategy', owner: 'Electrical Head', trigger: 'Vibration >5 mm/s or oil debris count trending up' },
      { risk: 'Steam System Failure', prob: 3, impact: 1, score: 3, emv: '₹45 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.asme.org', strategyTooltip: 'Rotary joint inspection + cylinder UT + condensate system maintenance', owner: 'Mechanical Head', trigger: 'Rotary joint leak or cylinder wall thickness <min' },
      { risk: 'Flood (Machine Basement)', prob: 1, impact: 3, score: 3, emv: '₹95 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP cover + raised basement thresholds + sump pumps with backup', owner: 'Plant Head', trigger: 'River/rainfall warning exceeding design parameters' },
    ],
    caseStudy: {
      title: 'JK Paper Rayagada — Dryer Section Fire',
      location: 'JK Paper, Rayagada, Odisha',
      date: 'February 2022',
      loss: '₹180 Cr (equipment + BI)',
      rootCause: 'Paper dust and fiber accumulation in the dryer hood ventilation duct ignited from a hot bearing on the hood exhaust fan. The fire propagated backward through the duct into the dryer hood above machine PM-2. The hood fire suppression system (water spray) activated but was insufficient for the involved duct fire which had already spread to the dryer felts and paper web. Fire engulfed 30 dryer cylinders, destroying felts, doctor blades, and frame components.',
      impact: 'PM-2 shutdown for 8 months. 30 dryer cylinders required resurfacing/replacement. Complete hood reconstruction. New felts and clothing (₹8 Cr). Frame straightening at 12 locations (heat distortion). BI loss: ₹130 Cr (8 months × ₹50 Lakh/day). Equipment: ₹50 Cr. Post-incident: JK Paper invested ₹15 Cr in comprehensive dryer fire protection upgrade across all machines.',
      lessons: [
        'Dryer hood ventilation ducts must be cleaned on fixed schedule — monthly minimum',
        'Spark detection system in hood exhaust ducts with automatic deluge',
        'Dryer hood fire suppression sized for duct fire, not just hood enclosure',
        'Weekly thermographic survey of all dryer hood fan bearings',
        'Paper dust accumulation audit as part of daily machine inspection (max 2mm anywhere)'
      ],
      benchmark: 'Stora Enso uses AI-based spark detection with 50ms response automatic deluge in all dryer hood ducts — zero dryer fires in 5 years across 30+ machines. System cost: ₹2-3 Cr per machine.'
    },
    emergingRisks: [
      {
        id: 'pm-er-1',
        title: 'Ultra-High Speed Machines — Vibration & Aerodynamic Risks',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'New packaging and tissue machines operating at 2,000+ m/min face aerodynamic flutter, sheet instability, and vibration modes not seen at lower speeds. Drive system harmonics at high speed create resonance in press sections. Roll covers fail faster. The learning curve for operating crews creates human error risk during ramp-up.',
        implications: ['New vibration failure modes at high speed', 'Aerodynamic sheet control challenges', 'Roll cover life reduction at high speeds', 'Human error during speed ramp-up commissioning', 'Insurance capacity concerns for novel equipment']
      },
      {
        id: 'pm-er-2',
        title: 'Tissue Market Overcapacity & Technology Race',
        category: 'market',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Indian tissue market growing at 12-15%/year attracting ₹5,000+ Cr of new investment. 10+ new tissue machines announced. Overcapacity likely by 2027. Technology race between TAD (Through Air Drying), NTT, and conventional crescent former creates winner-take-all dynamics with stranded investment for losers.',
        implications: ['Overcapacity depressing margins', 'Stranded investment in older technology', 'Yankee dryer explosion risk from pushing aging machines harder', 'Energy cost disadvantage for older machines', 'Price wars in branded tissue segment']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'pm-ni-1',
        title: 'Customer Specification Shifts (Plastic-to-Paper Transition)',
        category: 'Market / Strategic',
        description: 'FMCG brands rapidly shifting from plastic to paper packaging. New barrier-coated paper specifications require ₹200-500 Cr investment in coating/converting equipment. However, specifications keep evolving (compostable, recyclable, heat-sealable) — investment in last year\'s technology becomes obsolete. First-mover advantage is offset by technology risk.',
        mitigation: 'Modular coating investment, co-development agreements with FMCG brands, pilot-scale testing before full commitment, partnership with coating technology suppliers for upgrade guarantee',
        exposure: '₹200-800 Cr per company (stranded coating investment if specification changes)'
      },
      {
        id: 'pm-ni-2',
        title: 'Waste Paper Import Restrictions & Contamination',
        category: 'Regulatory / Supply',
        description: 'India imports 7-8 MTPA of waste paper (OCC, mixed waste). Quality deterioration (contamination with non-recyclables), import restrictions (following China\'s 2018 ban), and BIS quality standards increasingly restrict availability. Domestic collection infrastructure is inadequate for paper recycling targets.',
        mitigation: 'Domestic waste paper collection networks, virgin fiber capacity for quality grades, deinking technology investment, partnerships with municipalities for source-segregated collection, alternative fibers (bamboo, wheat straw)',
        exposure: '₹1,000-3,000 Cr industry-wide revenue impact from supply disruption'
      }
    ],
    bestPractices: [
      {
        id: 'pm-bp-1',
        title: 'Paper Machine Fire Prevention & Protection',
        standard: 'FM Global DS 6-8 (Paper Machines) + NFPA 76 + VdS CEA 4001',
        description: 'Comprehensive fire protection for the dryer section — the most fire-prone area in any paper mill.',
        recommendations: [
          'Dryer hood deluge system: minimum 10 mm/min water density over entire hood area',
          'Spark/ember detection in hood exhaust ducts with <100ms response deluge',
          'Broke pit inerting (steam or CO2) — particularly during sheet breaks at high speed',
          'Weekly dust accumulation audit: maximum 2mm accumulation on any horizontal surface',
          'Dryer hood exhaust duct cleaning schedule: monthly for high-speed machines',
          'Infrared scanning of all dryer cylinder journals/bearings weekly',
          'Hot work management: zero hot work within dryer section during machine operation'
        ],
        benchmark: 'FM Global insured paper mills implementing DS 6-8 fully have 75% fewer fire losses than non-compliant mills. Annual investment: ₹3-5 Cr per machine. Prevented losses: ₹50-500 Cr per event.'
      }
    ]
  },
  {
    id: 'utilities',
    label: 'Power & Utilities',
    icon: '⚡',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
    bannerTitle: 'Power Generation & Utilities',
    bannerSubtitle: 'Captive power boilers, turbines, water treatment, and chemical systems — supporting the mill\'s intensive energy and water needs.',
    aogPerils: [
      {
        id: 'util-aog-1',
        title: 'Lightning — Transformer & DCS Damage',
        severity: 'medium',
        description: 'Paper mills in rural/plantation areas with overhead transmission lines are exposed to lightning. Transformer bushings, generator AVR systems, and distributed control systems (DCS) are most vulnerable. Simultaneous loss of multiple transformers from a single storm can shut the entire mill.',
        impactAreas: ['Main Transformer Failure', 'DCS/PLC Surge Damage', 'Generator AVR Failure', 'Protection Relay Malfunction', 'Multiple System Trip'],
        typicalClaim: '₹10–50 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'util-naog-1',
        title: 'Power Boiler Tube Failure — CFB/FBC Type',
        severity: 'high',
        description: 'Paper mills operate captive CFB (Circulating Fluidized Bed) or FBC boilers burning coal, petcoke, or biomass for steam generation. Tube erosion from circulating bed material, corrosion from high-chlorine biomass, or overheating from circulation failure causes tube leaks. Each tube leak requires 3-7 day repair outage. Catastrophic header failure can destroy the entire boiler.',
        impactAreas: ['Boiler Forced Shutdown', 'Steam Supply Loss to Machine', 'Tube Erosion Cascade', 'Superheater Failure', 'Economizer Corrosion'],
        typicalClaim: '₹15–80 Cr + 1-4 weeks BI per event'
      },
      {
        id: 'util-naog-2',
        title: 'Turbine-Generator Failure',
        severity: 'high',
        description: 'Back-pressure or extraction-condensing turbines (20-80 MW) supply both power and process steam. Blade failure, bearing seizure, or governor malfunction causes immediate loss of both electrical power and steam supply. The mill goes dark and cold simultaneously. Turbine repair: 3-6 months. Generator rewind: 2-4 months.',
        impactAreas: ['Total Mill Blackout', 'Steam Supply Loss', 'Paper Machine Emergency Stop', 'Blade Liberation Damage', 'Generator Winding Failure'],
        typicalClaim: '₹40–200 Cr + 3-6 months BI'
      },
      {
        id: 'util-naog-3',
        title: 'Chemical Spill — Caustic/Acid Storage',
        severity: 'medium',
        description: 'Paper mills store large quantities of NaOH (100-500 tonnes), H2SO4, and bleaching chemicals (ClO2, H2O2). Tank failure, hose coupling failure during unloading, or bund overflow during rain mixes chemicals causing exothermic reactions, toxic gas release, or environmental contamination reaching water courses.',
        impactAreas: ['Chemical Tank Failure', 'Toxic Gas Generation', 'Worker Chemical Burns', 'Environmental Water Contamination', 'Regulatory Shutdown'],
        typicalClaim: '₹5–30 Cr + 1-4 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'TG Set Failure', prob: 1, impact: 3, score: 3, emv: '₹120 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com', strategyTooltip: 'MB + MLOP; vibration monitoring + oil analysis + annual overhaul', owner: 'Power Plant Head', trigger: 'Vibration >4 mm/s or bearing metal temp >95°C' },
      { risk: 'Power Boiler Tube Failure', prob: 3, impact: 1, score: 3, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.asme.org', strategyTooltip: 'UT survey at shutdowns + erosion shields + water chemistry control', owner: 'Boiler Head', trigger: 'UT thickness <3.5mm at any tube or drum' },
      { risk: 'Lightning/Transformer Failure', prob: 2, impact: 2, score: 4, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ieee.org', strategyTooltip: 'LPS maintenance + surge protection + online DGA for main transformers', owner: 'Electrical Head', trigger: 'DGA trending or earth resistance >5Ω' },
      { risk: 'Chemical Spill', prob: 2, impact: 1, score: 2, emv: '₹18 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.hse.gov.uk/comah', strategyTooltip: 'Double containment + level monitoring + emergency neutralization + bund capacity', owner: 'Chemical Head', trigger: 'Tank level anomaly or bund integrity breach' },
    ],
    caseStudy: {
      title: 'Century Pulp & Paper — Turbine Blade Failure',
      location: 'Century Pulp & Paper, Lalkua, Uttarakhand',
      date: 'November 2021',
      loss: '₹95 Cr (equipment + BI)',
      rootCause: 'LP turbine last-stage blade (titanium) failed from stress corrosion cracking initiated by chloride contamination in the condensate system. The blade fragment liberated at high speed damaged 4 adjacent blade rows and the diaphragm. Root cause traced to condenser tube leak that had been present for 3 weeks — detected by conductivity monitoring but not actioned urgently enough because production pressure prioritized uptime.',
      impact: 'Complete TG set shutdown for 5 months. Mill ran on grid power (₹3/kWh higher cost) losing ₹2 Cr/month in additional power cost. Production curtailed 20% due to steam constraint. BI loss: ₹70 Cr. Repair cost: ₹25 Cr (new rotor, diaphragms, blade sets). Century subsequently installed real-time blade vibration monitoring on all TG sets.',
      lessons: [
        'Condenser tube leak (conductivity excursion) must be treated as urgent — maximum 24 hours to isolate',
        'Online blade vibration monitoring (BVM) provides weeks of advance warning before liberation',
        'Stress corrosion cracking inspection of LP blades at every overhaul (WFMPI + etch)',
        'Condensate polisher mandatory for titanium-bladed turbines (chloride <5 ppb)',
        'Production pressure must never override known contamination — cost of blade failure >> cost of shutdown for repair'
      ],
      benchmark: 'Finnish paper mills (UPM, Stora Enso) achieve <1 unplanned turbine event per 50 turbine-years through online BVM, strict water chemistry, and 4-yearly overhaul cycle.'
    },
    emergingRisks: [
      {
        id: 'util-er-1',
        title: 'Biomass Fuel Quality & Supply Risks',
        category: 'market',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Paper mills increasingly burning biomass (rice husk, wood waste, bagasse) for renewable energy credit and cost reduction. Biomass quality is highly variable — high moisture, silica, alkali content cause slagging, fouling, and corrosion. Supply is seasonal and competes with other industries (power plants, brick kilns).',
        implications: ['Boiler slagging/fouling from high-alkali biomass', 'Superheater corrosion from chlorine in biomass', 'Supply disruption during non-harvest season', 'Storage fire risk from self-heating biomass piles', 'Ash disposal challenges (high volumes, variable composition)']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'util-ni-1',
        title: 'Grid Power Tariff & Cross-Subsidy Escalation',
        category: 'Regulatory / Cost',
        description: 'Paper mills consume 800-1,200 kWh/tonne. Grid tariffs for HT industrial consumers include escalating cross-subsidy surcharges (₹1-3/kWh above cost of supply) to fund agricultural/domestic subsidies. Annual tariff hikes of 5-8% compress margins. Captive power policy changes can make CPP unviable overnight.',
        mitigation: 'Maximize captive generation (biomass, WHRS, solar), battery storage for peak shaving, demand response participation, group captive arrangements, industry body regulatory engagement',
        exposure: '₹50-200 Cr/year additional cost per large mill from tariff escalation'
      }
    ],
    bestPractices: [
      {
        id: 'util-bp-1',
        title: 'Turbine-Generator Condition Monitoring',
        standard: 'ISO 20816 (Vibration) + ASME PTC 6 + VGB PowerTech Guidelines',
        description: 'Protecting high-value rotating equipment critical to both power and steam supply for the paper machine.',
        recommendations: [
          'Online shaft vibration monitoring with alarm/trip settings per ISO 20816',
          'Blade vibration monitoring (BVM) on all LP stages — trend for crack initiation',
          'Oil debris monitoring (online particle counter) with ferrographic analysis monthly',
          'Bearing metal temperature monitoring with trip at manufacturer limit',
          'Condensate quality monitoring: conductivity <0.5 µS/cm, Na <5 ppb, Cl <5 ppb',
          'Annual valve testing (governor, trip, NRV) and overspeed trip test',
          'Major overhaul at 4-year intervals with full NDE of blades, rotor, and casing'
        ],
        benchmark: 'Metsä Group achieves 99.2% TG availability through comprehensive online monitoring and strict water chemistry — best-in-class for integrated pulp mills.'
      }
    ]
  },
  {
    id: 'finishing',
    label: 'Finishing & Storage',
    icon: '📦',
    color: '#9C27B0',
    bannerImage: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&q=80',
    bannerTitle: 'Finishing, Converting & Warehousing',
    bannerSubtitle: 'Winding, cutting, coating, and paper warehouse — massive combustible inventory with fire as the dominant risk.',
    aogPerils: [
      {
        id: 'fin-aog-1',
        title: 'Flood — Finished Goods Warehouse Submersion',
        severity: 'high',
        description: 'Paper warehouses typically store ₹50-200 Cr of finished goods. Paper is hygroscopic — even 80% humidity causes defects; actual water contact destroys inventory completely. Warehouses at ground level near rivers are acutely vulnerable. Single flooding event can destroy the entire finished goods inventory.',
        impactAreas: ['Complete Inventory Loss', 'Customer Order Default', 'Revenue Loss', 'Warehouse Structural Damage', 'Insurance Subrogation Issues'],
        typicalClaim: '₹50–200 Cr (stock) + customer penalty'
      }
    ],
    nonAogPerils: [
      {
        id: 'fin-naog-1',
        title: 'Paper Warehouse Fire — Massive Combustible Load',
        severity: 'critical',
        description: 'Paper warehouses (10,000-50,000 tonnes stored) represent extreme fire loads (400-600 MJ/m² — among highest of any industrial storage). Paper stored in reels 1-2m diameter, stacked 3-4 high, burns with incredible intensity once ignited. Standard sprinkler systems are overwhelmed within minutes. Total warehouse loss is common once fire establishes beyond first reel.',
        impactAreas: ['Total Stock Destruction (₹50-200 Cr)', 'Adjacent Building Exposure', 'Fire Spread to Machine Hall', 'Customer Supply Disruption', 'Environmental Runoff from Firefighting'],
        typicalClaim: '₹50–300 Cr (stock + building + BI)'
      },
      {
        id: 'fin-naog-2',
        title: 'Winder/Rewinder Mechanical Failure',
        severity: 'medium',
        description: 'Winders convert jumbo reels (30-50 tonnes) into customer-size reels at speeds of 2,000-3,000 m/min. Rider roll failure, drum failure, or web break at high speed causes reel ejection (30-tonne reel flying off) or paper accordion-folding into the machine with massive mechanical damage. Adjacent personnel are at risk from ejected material.',
        impactAreas: ['Rider Roll Failure', 'Drum Surface Damage', 'Reel Ejection (safety)', 'Machine Frame Damage', 'Production Bottleneck'],
        typicalClaim: '₹5–30 Cr + 2-6 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'Warehouse Fire', prob: 2, impact: 3, score: 6, emv: '₹175 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'ESFR sprinklers + fire walls + maximum storage height limits + early detection', owner: 'Warehouse Manager', trigger: 'Any fire detection activation or sprinkler flow alarm' },
      { risk: 'Flood (FG Stock Loss)', prob: 1, impact: 3, score: 3, emv: '₹125 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Stock cover with adequate valuation + raised storage above 1-in-100 flood level', owner: 'Supply Chain Head', trigger: 'Flood warning for mill location' },
      { risk: 'Winder Failure', prob: 3, impact: 1, score: 3, emv: '₹18 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.voith.com/paper', strategyTooltip: 'Vibration monitoring + roll surface inspection + speed-based interlocks', owner: 'Finishing Head', trigger: 'Vibration >6 mm/s or surface defect on drum/rider' },
    ],
    caseStudy: {
      title: 'BILT Ballarpur — Paper Warehouse Fire (Total Loss)',
      location: 'BILT (now Solaris), Ballarpur, Maharashtra',
      date: 'April 2020',
      loss: '₹120 Cr (stock + building)',
      rootCause: 'Electrical short circuit in warehouse lighting system ignited paper dust accumulation on cable tray. Initial fire was small but rapidly spread to adjacent paper reels (stacked 4-high without adequate clearance). The in-rack sprinkler system was designed for general storage, not high-pile paper storage, and could not contain the fire growth rate. Fire engulfed the entire 8,000 m² warehouse within 45 minutes.',
      impact: '15,000 tonnes of finished paper destroyed (₹90 Cr). Building structure collapsed (₹15 Cr). Customer orders defaulted for 3 months (₹15 Cr penalties). Environmental penalty for contaminated runoff. Insurance claim disputed on stock valuation methodology for 18 months.',
      lessons: [
        'Paper warehouse sprinkler design MUST meet FM Global DS 8-9 (high-pile combustible storage) — not general warehouse standards',
        'ESFR (Early Suppression Fast Response) sprinklers at K-25.2 minimum for paper reel storage',
        'Maximum stack height limit: 3 reels (typically 5.5m) with 3m aisle spacing',
        'Fire wall compartmentalization: maximum 2,500 m² per fire compartment',
        'Very early smoke detection (VESDA) for rapid fire service activation before sprinkler demand'
      ],
      benchmark: 'UPM paper warehouses achieve zero total losses through FM Global compliant ESFR sprinkler design, 2,000 m² compartments, and VESDA detection — even minor fires are contained to origin reel.'
    },
    emergingRisks: [
      {
        id: 'fin-er-1',
        title: 'Automated Warehouse Robotics — Fire Response Complexity',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Automated Storage & Retrieval Systems (AS/RS) and robotic warehouses for paper store reels at greater height and density — increasing fire load per m² while making manual firefighting access impossible. Lithium-ion battery AGVs within the warehouse add a new fire source type. Traditional firefighting tactics don\'t work in automated paper warehouses.',
        implications: ['Higher fire load density exceeding sprinkler design capacity', 'No manual firefighting access in automated aisles', 'AGV lithium battery thermal runaway risk', 'Sprinkler obstruction from automated racking', 'Insurance coverage gaps for AS/RS facilities']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'fin-ni-1',
        title: 'Packaging Paper Grade Commoditization',
        category: 'Market',
        description: 'Kraft liner and corrugating medium becoming commodity products with thin margins (₹2,000-4,000/tonne) as Indian capacity additions outpace demand growth. Large players (ITC, JK) with scale advantages pressure smaller mills. Export markets competitive with Indonesian/Vietnamese low-cost producers.',
        mitigation: 'Move up value chain (barrier coatings, specialty kraft), downstream integration (corrugated box making), customer intimacy programs, cost leadership through operational excellence',
        exposure: '₹100-500 Cr/year margin erosion per mid-size mill'
      }
    ],
    bestPractices: [
      {
        id: 'fin-bp-1',
        title: 'Paper Warehouse Fire Protection',
        standard: 'FM Global DS 8-9 + NFPA 13 (High-Pile Storage) + VdS CEA 4001',
        description: 'Specialized fire protection for high-value paper inventory — one of the most challenging storage fire risks due to extreme combustibility and high stack heights.',
        recommendations: [
          'ESFR sprinklers: K-25.2 at ceiling, maximum 12m storage height for paper reels',
          'Fire wall compartmentalization: maximum 2,500 m² per compartment',
          'VESDA (Very Early Smoke Detection) in every compartment for pre-alarm activation',
          'Maximum 3-reel stack height (5.5m) with 3m minimum aisle width',
          'Dedicated fire pump capacity sized for largest compartment demand (min 4,500 LPM)',
          'Weekly sprinkler inspection: ensure zero obstruction and proper orientation',
          'No storage within 1m of any wall or fire barrier to maintain sprinkler effectiveness'
        ],
        benchmark: 'FM Global HPR (Highly Protected Risk) paper warehouses experience <10% of fire losses vs standard warehouses — annual protection investment of ₹5-8 Cr prevents ₹100-300 Cr potential losses.'
      }
    ]
  }
]
