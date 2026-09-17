// Steel Industry Risk Analysis — Complete Data Layer
// Sources: Integrated Steel Plants, Mini Mills, Downstream Processing, Raw Material, Manufacturing Process

export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Strategy = 'Avoid' | 'Mitigate' | 'Transfer' | 'Accept' | 'Share'

export interface RiskPeril {
  id: string
  title: string
  severity: Severity
  description: string
  impactAreas: string[]
  typicalClaim: string
}

export interface RiskMatrixEntry {
  risk: string
  prob: number
  impact: number
  score: number
  emv: string
  strategy: Strategy
  strategyUrl: string
  strategyTooltip: string
  owner: string
  trigger: string
}

export interface CaseStudy {
  title: string
  location: string
  date: string
  loss: string
  rootCause: string
  impact: string
  lessons: string[]
  benchmark: string
}

export interface EmergingRisk {
  id: string
  title: string
  category: 'technology' | 'climate' | 'regulatory' | 'market'
  severity: Severity
  timeline: string
  description: string
  implications: string[]
}

export interface NonInsurableRisk {
  id: string
  title: string
  category: string
  description: string
  mitigation: string
  exposure: string
}

export interface BestPractice {
  id: string
  title: string
  standard: string
  description: string
  recommendations: string[]
  benchmark: string
}

export interface RiskSource {
  id: string
  label: string
  icon: string
  color: string
  bannerImage: string
  bannerTitle: string
  bannerSubtitle: string
  aogPerils: RiskPeril[]
  nonAogPerils: RiskPeril[]
  riskMatrix: RiskMatrixEntry[]
  caseStudy: CaseStudy
  emergingRisks: EmergingRisk[]
  nonInsurableRisks: NonInsurableRisk[]
  bestPractices: BestPractice[]
}

export const STEEL_RISK_SOURCES: RiskSource[] = [
  {
    id: 'integrated',
    label: 'Integrated Plants',
    icon: '🏭',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1200&q=80',
    bannerTitle: 'Integrated Steel Plants',
    bannerSubtitle: 'BF-BOF route — From iron ore to finished steel under one roof. Highest asset concentration risk.',
    aogPerils: [
      {
        id: 'int-aog-1',
        title: 'Earthquake — Foundation & Structural Collapse',
        severity: 'critical',
        description: 'Integrated steel plants span 2,000-5,000 acres with blast furnaces standing 40-60m tall. Seismic events cause foundation settlement, refractory lining cracks in BF/BOF, misalignment of continuous casters, and rupture of gas holder systems. The Bhuj 2001 earthquake damaged multiple industrial facilities within 200km radius.',
        impactAreas: ['Blast Furnace Collapse', 'Hot Metal Spillage', 'Gas Holder Rupture', 'Crane Rail Misalignment', 'Underground Pipeline Fracture'],
        typicalClaim: '₹200–800 Cr + 18-24 months BI'
      },
      {
        id: 'int-aog-2',
        title: 'Flood / Inundation — Plant Submersion',
        severity: 'high',
        description: 'Coastal and riverine plants (Vizag, Dolvi, Haldia) face monsoon flooding. Water ingress into electrical substations, motor pits, and cable trenches causes catastrophic short circuits. Waterlogged raw material yards delay restart by weeks. The 2023 Chennai floods submerged multiple industrial zones.',
        impactAreas: ['Substation Damage', 'Motor Burnout', 'Raw Material Degradation', 'Slag Pit Overflow', 'Environmental Contamination'],
        typicalClaim: '₹50–300 Cr + 3-6 months BI'
      },
      {
        id: 'int-aog-3',
        title: 'Cyclone / Storm Surge',
        severity: 'high',
        description: 'East coast plants (Vizag RINL, Kalinganagar, Dhenkanal) lie in cyclone-prone zones. Wind speeds >150 kmph damage roofing sheets across rolling mills, topple overhead cranes, and destroy conveyor galleries. Cyclone Fani (2019) caused ₹1,200 Cr industrial losses in Odisha.',
        impactAreas: ['Roof Sheet Damage', 'Crane Toppling', 'Conveyor Gallery Collapse', 'Stack/Chimney Failure', 'Power Grid Disruption'],
        typicalClaim: '₹30–200 Cr + 2-4 months BI'
      },
      {
        id: 'int-aog-4',
        title: 'Lightning Strike — Electrical Systems',
        severity: 'medium',
        description: 'Steel plants with tall stacks (80-120m), gas holders, and overhead structures attract lightning. Direct strikes damage PLCs, SCADA systems, VFDs, and transformer bushings. Induced surges propagate through instrumentation cables causing widespread control system failure.',
        impactAreas: ['SCADA/PLC Damage', 'Transformer Failure', 'VFD Burnout', 'Instrument Cable Surge', 'Fire Initiation'],
        typicalClaim: '₹5–50 Cr + 1-2 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'int-naog-1',
        title: 'Blast Furnace Breakout — Molten Iron Escape',
        severity: 'critical',
        description: 'The most catastrophic steel plant risk. When refractory lining erodes to <150mm, molten iron at 1,500°C breaches the furnace shell. The breakout stream destroys everything in its path — casthouse floors, taphole equipment, and can reach cooling water causing steam explosions. BF reline costs ₹800-1,200 Cr and takes 90-120 days.',
        impactAreas: ['Casthouse Destruction', 'Steam Explosion', 'Worker Fatalities', 'Cooling System Failure', 'Environmental Disaster'],
        typicalClaim: '₹500–1,500 Cr + 4-6 months BI'
      },
      {
        id: 'int-naog-2',
        title: 'BOF Vessel Failure — Converter Explosion',
        severity: 'critical',
        description: 'Basic Oxygen Furnace vessels operate with 150-300 tonne molten steel charges at 1,650°C. Trunnion ring cracking, vessel shell thinning, or lance cooling failure causes catastrophic steel/slag spillage. The 2018 SAIL Bhilai BOF incident resulted in 3 fatalities and ₹400 Cr damage.',
        impactAreas: ['Molten Steel Spillage', 'Lance Cooling Failure', 'Trunnion Cracking', 'Gas Cleaning System Damage', 'Production Loss'],
        typicalClaim: '₹200–600 Cr + 2-4 months BI'
      },
      {
        id: 'int-naog-3',
        title: 'Coke Oven Battery Fire & Gas Leak',
        severity: 'high',
        description: 'Coke oven batteries operate at 1,100°C with volatile COG (Coke Oven Gas) containing H2, CH4, and CO. Door seal failures, ascension pipe leaks, and collecting main cracks release explosive gas mixtures. Uncontrolled ignition creates fireballs visible for kilometers. Battery rebuild costs ₹3,000-5,000 Cr.',
        impactAreas: ['Gas Explosion', 'Battery Wall Collapse', 'By-product Plant Damage', 'Toxic Gas Release (H2S, NH3)', 'Extended Battery Shutdown'],
        typicalClaim: '₹100–500 Cr + 6-12 months BI'
      },
      {
        id: 'int-naog-4',
        title: 'Rolling Mill Drive Train Failure',
        severity: 'high',
        description: 'Hot Strip Mills use 10,000-15,000 HP main drive motors with spindles, gearboxes, and work rolls rotating at 600+ RPM. Spindle breakage causes immediate mill stoppage. Gearbox tooth failure propagates through the drive train. Lead time for replacement motor/gearbox: 6-9 months ex-works.',
        impactAreas: ['Spindle Fracture', 'Gearbox Seizure', 'Motor Winding Failure', 'Roll Breakage', 'Strip Pileup/Cobble'],
        typicalClaim: '₹50–300 Cr + 3-9 months BI'
      },
      {
        id: 'int-naog-5',
        title: 'Gas Network Explosion (BFG/COG/LDG)',
        severity: 'critical',
        description: 'Integrated plants have 50-100 km of gas pipelines carrying Blast Furnace Gas (CO-rich), Coke Oven Gas (H2-rich), and LD Gas. Pipeline corrosion, water seal failures, or mixing valve malfunction creates explosive atmospheres. The 2005 Bhilai gas pipeline explosion killed 16 workers.',
        impactAreas: ['Pipeline Rupture', 'Gas Holder Explosion', 'Multi-fatality Event', 'Downstream Plant Shutdown', 'Regulatory Closure'],
        typicalClaim: '₹100–800 Cr + 3-6 months BI'
      },
      {
        id: 'int-naog-6',
        title: 'Continuous Caster Breakout',
        severity: 'high',
        description: 'During solidification in the mould, if the steel shell is too thin or sticks to the copper mould, molten steel breaches below the mould — a "breakout". 200-300 tonnes of liquid steel spills onto the caster floor, damaging strand guides, spray nozzles, and withdrawal rolls. Recovery takes 2-4 weeks per strand.',
        impactAreas: ['Strand Guide Damage', 'Mould Copper Plate Erosion', 'Spray Chamber Destruction', 'Ladle Turret Damage', 'Quality Rejection'],
        typicalClaim: '₹20–100 Cr + 2-4 weeks BI per strand'
      }
    ],
    riskMatrix: [
      { risk: 'BF Breakout', prob: 2, impact: 3, score: 6, emv: '₹750 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.worldsteel.org/steel-topics/safety', strategyTooltip: 'Continuous thermal monitoring + AI-based lining wear prediction', owner: 'VP Operations', trigger: 'Lining thickness < 200mm' },
      { risk: 'BOF Vessel Failure', prob: 2, impact: 3, score: 6, emv: '₹400 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com/en/solutions/for-industry-clients/steel.html', strategyTooltip: 'Machine Breakdown + BI policy with adequate sub-limits', owner: 'Plant Head SMS', trigger: 'Campaign life > 15,000 heats' },
      { risk: 'Coke Battery Fire', prob: 3, impact: 2, score: 6, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ifc.org/en/insights-reports/2007/ehs-guidelines-iron-and-steel', strategyTooltip: 'Gas detection + auto-isolation + regular door maintenance', owner: 'GM Coke Ovens', trigger: 'Door leak rate > 5%' },
      { risk: 'Rolling Mill Failure', prob: 3, impact: 2, score: 6, emv: '₹175 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.skf.com/group/industries/metals/steel', strategyTooltip: 'Vibration monitoring + critical spares inventory', owner: 'GM Hot Rolling', trigger: 'Vibration > 8 mm/s RMS' },
      { risk: 'Gas Network Explosion', prob: 1, impact: 3, score: 3, emv: '₹450 Cr', strategy: 'Avoid', strategyUrl: 'https://www.hse.gov.uk/comah/sragtech/techmeaspipework.htm', strategyTooltip: 'Pipeline integrity management + real-time CO monitoring', owner: 'Head Energy', trigger: 'CO level > 50 ppm ambient' },
      { risk: 'Flood Damage', prob: 2, impact: 2, score: 4, emv: '₹150 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com/risk-knowledge/mitigating-climate-risk', strategyTooltip: 'Adequate SFSP cover + flood resilience measures', owner: 'Head Utilities', trigger: 'River level > danger mark' },
      { risk: 'Caster Breakout', prob: 3, impact: 1, score: 3, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.primetals.com/portfolio/casting', strategyTooltip: 'Mould level control + breakout prediction system', owner: 'GM Caster', trigger: 'Thermocouple anomaly pattern' },
      { risk: 'Electrical Fire', prob: 3, impact: 1, score: 3, emv: '₹25 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards', strategyTooltip: 'Thermal imaging + cable replacement program', owner: 'Head Electrical', trigger: 'Hotspot > 80°C on thermography' },
    ],
    caseStudy: {
      title: 'RINL Visakhapatnam — Ladle Explosion (Steel Melting Shop)',
      location: 'RINL Visakhapatnam Steel Plant, Andhra Pradesh',
      date: 'June 2025',
      loss: '₹200+ Cr (production loss) + 9 fatalities',
      rootCause: 'Residual argon gas in the casting system formed a trapped bubble within molten steel in the ladle. When the slide-gate mechanism opened, the superheated gas expanded explosively, ejecting molten steel at 1,600°C across the casthouse floor. Instrumentation for argon flow monitoring had been malfunctioning since June 5 — 3 days before the incident. CITU trade union documented 645 pending safety non-compliances at the plant.',
      impact: 'Nine workers killed instantly from molten metal burns. Steel Melting Shop shut down for 45 days. Criminal cases filed against plant management. Ministry of Steel ordered nationwide safety audit of all integrated plants. RINL share price dropped 12% in one week.',
      lessons: [
        'Mandatory argon purging protocol before every ladle operation with automated verification',
        'Zero tolerance for instrument malfunctions — auto-shutdown on any safety-critical sensor failure',
        'Heat-resistant PPE (aluminized suits) mandatory within 10m radius of molten metal',
        'Independent third-party safety audits quarterly (not self-certification)',
        'Ladle safety covers and splash guards as permanent engineering controls'
      ],
      benchmark: 'POSCO (South Korea) and Nippon Steel (Japan) mandate automated ladle tracking with embedded gas monitoring sensors and AI-based anomaly detection. Their fatality rate is <0.01 per million man-hours vs India\'s industry average of 0.15.'
    },
    emergingRisks: [
      {
        id: 'int-er-1',
        title: 'Hydrogen-Based Steelmaking (DRI-H2) Transition Risk',
        category: 'technology',
        severity: 'high',
        timeline: '2025-2035',
        description: 'Transition from carbon-based BF-BOF to hydrogen Direct Reduction creates new explosion risks. H2 is 14x more flammable than natural gas with invisible flame. Storage at 700 bar pressure introduces high-pressure vessel risks unprecedented in steel plants.',
        implications: ['Hydrogen embrittlement of existing pipelines', 'Invisible flame detection challenges', 'High-pressure storage vessel catastrophic failure', 'Workforce retraining gaps', 'Insurance coverage gaps for H2 facilities']
      },
      {
        id: 'int-er-2',
        title: 'CBAM (Carbon Border Adjustment Mechanism) Compliance',
        category: 'regulatory',
        severity: 'high',
        timeline: '2026-2030',
        description: 'EU CBAM imposes carbon costs of €50-100/tonne on imported steel from 2026. Indian exporters face ₹4,000-8,000/tonne additional cost making 30% of exports unviable. Plants must invest ₹5,000-15,000 Cr in decarbonization or lose EU market access.',
        implications: ['Export revenue loss ₹8,000-12,000 Cr/year industry-wide', 'Stranded asset risk for carbon-intensive BF-BOF route', 'Accelerated capex for EAF conversion', 'Carbon accounting system investments', 'Supply chain Scope 3 disclosure requirements']
      },
      {
        id: 'int-er-3',
        title: 'AI/ML-Driven Process Control — Cyber-Physical Risk',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Steel plants adopting AI for BF optimization, quality prediction, and energy management create new cyber-physical attack surfaces. A compromised AI model could subtly alter furnace parameters leading to physical equipment damage before detection.',
        implications: ['Adversarial ML attacks on process models', 'OT/IT convergence expanding attack surface', 'Data poisoning causing incorrect control actions', 'Ransomware targeting Level 2 automation', 'Liability gaps between AI vendor and operator']
      },
      {
        id: 'int-er-4',
        title: 'Extreme Heat Events — Worker Safety & Equipment',
        category: 'climate',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'Ambient temperatures >45°C combined with radiant heat from furnaces push effective temperature to 55-65°C for workers. Heat stress incidents rising 40% since 2020. Electronics and VFDs in non-AC areas face premature failure.',
        implications: ['Worker heat stroke fatalities increasing', 'Mandated work-rest cycles reducing productivity 15-20%', 'Electronic component life halving above 50°C', 'Cooling water temperature rise reducing process efficiency', 'Regulatory heat stress standards tightening']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'int-ni-1',
        title: 'Chinese Steel Dumping & Trade Policy Shifts',
        category: 'Market / Trade',
        description: 'China\'s excess capacity of 300+ MTPA regularly floods global markets at below-cost pricing. Indian safeguard duties provide partial protection but WTO challenges threaten removal. A sudden policy reversal could collapse domestic prices 20-30% within months.',
        mitigation: 'Product differentiation, value-added mix improvement, long-term customer contracts, hedging through futures market',
        exposure: '₹15,000-25,000 Cr revenue impact industry-wide'
      },
      {
        id: 'int-ni-2',
        title: 'Mining License / Environmental Clearance Cancellation',
        category: 'Regulatory',
        description: 'Supreme Court orders (like the 2014 Goa mining ban) can instantly halt captive iron ore supply. A single adverse NGT order can shut mining operations affecting integrated plant feed. SAIL lost 6 months production when Chiria mines faced clearance issues.',
        mitigation: 'Multiple mining lease applications, diversified ore sources, strategic inventory buildup (90-day buffer), merchant ore purchase agreements',
        exposure: '₹5,000-10,000 Cr per company (12-month scenario)'
      },
      {
        id: 'int-ni-3',
        title: 'Workforce Agitation & Union Disruption',
        category: 'Operational / Social',
        description: 'PSU plants (SAIL, RINL) have 60,000+ unionized workers. Wage revision disputes, VRS disagreements, or safety protests can halt production. The 2024 RINL privatization protests caused 15-day production loss. Contract worker exploitation allegations trigger NGO/media campaigns.',
        mitigation: 'Proactive industrial relations, fair wage policies, safety investment transparency, contract worker welfare programs',
        exposure: '₹500-2,000 Cr per incident (revenue loss + reputation)'
      },
      {
        id: 'int-ni-4',
        title: 'Technology Obsolescence — BF-BOF Stranded Assets',
        category: 'Strategic',
        description: 'Global shift toward EAF/DRI route (currently 30% global, projected 50% by 2040) threatens BF-BOF investments with 30-40 year asset lives. A ₹50,000 Cr BF-BOF complex commissioned today may face stranded asset risk by 2050 if carbon pricing escalates.',
        mitigation: 'Dual-route capability planning, EAF optionality in new projects, accelerated depreciation, carbon credit accumulation',
        exposure: '₹20,000-50,000 Cr per integrated complex (long-term write-down risk)'
      }
    ],
    bestPractices: [
      {
        id: 'int-bp-1',
        title: 'Blast Furnace Health Monitoring System',
        standard: 'ISO 13374 (Condition Monitoring) + World Steel Association Guidelines',
        description: 'Continuous monitoring of BF lining thickness using 2,000+ thermocouples embedded in the shell, combined with thermal imaging and acoustic emission sensors. AI models predict remaining lining life and optimize reline timing.',
        recommendations: [
          'Install minimum 500 thermocouples per BF with real-time dashboard',
          'Deploy fiber-optic distributed temperature sensing (DTS) on hearth',
          'Implement AI-based wear prediction with 30-day advance warning',
          'Conduct annual acoustic emission survey of BF shell integrity',
          'Maintain titanium-bearing material injection readiness for emergency hearth protection'
        ],
        benchmark: 'POSCO Gwangyang achieves 20+ year BF campaign life vs Indian average of 12-15 years through superior monitoring.'
      },
      {
        id: 'int-bp-2',
        title: 'Gas Safety Management System',
        standard: 'IS 4263 (Gas Plants) + IFC EHS Guidelines + NFPA 86',
        description: 'Comprehensive gas safety covering 50-100 km of internal pipelines carrying CO-rich BFG, H2-rich COG, and LDG. Includes fixed gas detection, water seal maintenance, and isolation procedures.',
        recommendations: [
          'Fixed CO detectors every 20m in gas-prone areas with central monitoring',
          'Automated gas isolation valves at all inter-plant supply points',
          'Water seal level monitoring with automatic top-up and low-level alarm',
          'Personal CO monitors mandatory for all workers in gas zones',
          'Annual pipeline thickness survey using ultrasonic testing (UT)',
          'Emergency gas venting procedures tested quarterly'
        ],
        benchmark: 'Nippon Steel zero gas-related fatalities in 10 years through 100% automated isolation systems.'
      },
      {
        id: 'int-bp-3',
        title: 'Molten Metal Handling Safety',
        standard: 'World Steel Safety Guidelines + OSHA 29 CFR 1910.261',
        description: 'Addresses all risks from taphole to caster — ladle integrity, crane operations, tundish preparation, and breakout prevention. The highest-fatality risk area in steel plants globally.',
        recommendations: [
          'Ladle refractory life tracking system — hard cutoff at 80% campaign',
          'Moisture-free raw material certification before charging to furnace',
          'Mandatory pre-heat verification of all ladles, tundishes, and runners',
          'Automated breakout prediction system (BPS) on all caster strands',
          'Exclusion zones around molten metal paths enforced by physical barriers',
          'Emergency dump systems for all vessels carrying molten material'
        ],
        benchmark: 'JFE Steel (Japan) uses 100% automated torpedo car operations — zero human presence near molten iron transport.'
      }
    ]
  },
  {
    id: 'minimills',
    label: 'Mini Mills / EAF',
    icon: '⚡',
    color: '#005B75',
    bannerImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80',
    bannerTitle: 'Electric Arc Furnace & Mini Mills',
    bannerSubtitle: 'Scrap-based steelmaking — Lower capex, faster cycles, but unique electrical and scrap-quality risks.',
    aogPerils: [
      {
        id: 'mm-aog-1',
        title: 'Earthquake — EAF Tilting Mechanism Damage',
        severity: 'high',
        description: 'EAF furnaces rely on precise tilting hydraulics for tapping. Seismic forces misalign tilting trunnions, rupture hydraulic lines, and crack electrode arms. The furnace shell (containing 100-150 tonnes of molten steel) becomes uncontrollable if tilting fails during operation.',
        impactAreas: ['Tilting Mechanism Failure', 'Hydraulic Line Rupture', 'Electrode Arm Cracking', 'Uncontrolled Steel Spillage', 'Transformer Displacement'],
        typicalClaim: '₹50–200 Cr + 3-6 months BI'
      },
      {
        id: 'mm-aog-2',
        title: 'Flood — Substation & Cable Vault Inundation',
        severity: 'high',
        description: 'EAF plants are electricity-intensive (400-500 kWh/tonne). Underground cable vaults and HT substations handling 30-100 MVA transformers are vulnerable to water ingress. A single flooded HT substation can shut the entire plant for 2-3 months.',
        impactAreas: ['HT Transformer Submersion', 'Cable Vault Short Circuit', 'Arc Furnace Transformer Damage', 'Power Quality Equipment Loss', 'Bus Bar Corrosion'],
        typicalClaim: '₹30–150 Cr + 2-4 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'mm-naog-1',
        title: 'EAF Transformer Explosion',
        severity: 'critical',
        description: 'EAF transformers (30-100 MVA) operate under extreme duty cycles with high current surges during scrap melting. Internal winding faults cause oil-filled transformer explosions with burning oil spray. Replacement lead time: 12-18 months for custom-wound units. Single-source risk.',
        impactAreas: ['Oil Fire & Explosion', 'Total EAF Shutdown', 'Adjacent Equipment Damage', 'Oil Spill Contamination', 'Extended Downtime (12-18 months)'],
        typicalClaim: '₹80–300 Cr + 12-18 months BI'
      },
      {
        id: 'mm-naog-2',
        title: 'Electrode Breakage & Furnace Damage',
        severity: 'high',
        description: 'Graphite electrodes (₹3-5 Lakh each, 600mm diameter) operate at 50,000+ amperes. Scrap cave-ins onto electrodes cause mechanical fracture. Broken electrodes drop into the melt causing violent reactions. Electrode arm clamps and mast structures get damaged from lateral forces.',
        impactAreas: ['Electrode Fracture', 'Roof Delta Damage', 'Water-Cooled Panel Puncture', 'Mast/Arm Structural Damage', 'Scrap Charge Explosion'],
        typicalClaim: '₹10–80 Cr + 2-6 weeks BI'
      },
      {
        id: 'mm-naog-3',
        title: 'Scrap Explosion — Moisture/Sealed Containers',
        severity: 'critical',
        description: 'Wet scrap or sealed containers (gas cylinders, aerosol cans) in the scrap charge explode violently when exposed to molten steel at 1,600°C. The steam explosion ejects molten metal and scrap fragments 50+ meters. Multiple fatalities have occurred globally from contaminated scrap charges.',
        impactAreas: ['Molten Metal Ejection', 'Roof Panel Destruction', 'Worker Fatalities', 'Furnace Shell Cracking', 'Building Structure Damage'],
        typicalClaim: '₹50–200 Cr + 1-3 months BI'
      },
      {
        id: 'mm-naog-4',
        title: 'Electrical System Failure — Harmonics & Power Quality',
        severity: 'medium',
        description: 'EAF operations inject severe harmonics (THD 5-15%) into the grid causing capacitor bank explosions, cable heating, and premature transformer aging. Flicker and voltage dips affect the plant\'s own systems and neighboring facilities, triggering penalty charges and regulatory action.',
        impactAreas: ['Capacitor Bank Explosion', 'Cable Overheating/Fire', 'VFD Malfunction', 'Grid Penalty Charges', 'Neighboring Industry Complaints'],
        typicalClaim: '₹5–30 Cr + 2-4 weeks BI'
      }
    ],
    riskMatrix: [
      { risk: 'EAF Transformer Failure', prob: 2, impact: 3, score: 6, emv: '₹190 Cr', strategy: 'Transfer', strategyUrl: 'https://www.munichre.com/en/solutions/for-industry-clients', strategyTooltip: 'MB policy + BI with 12-month indemnity + spare transformer strategy', owner: 'Plant Director', trigger: 'DGA trending or oil temp > 85°C' },
      { risk: 'Scrap Explosion', prob: 3, impact: 2, score: 6, emv: '₹125 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.eurofer.eu/publications', strategyTooltip: 'Scrap inspection + radioactivity detection + moisture drying', owner: 'Scrap Yard Manager', trigger: 'Uncertified scrap lot arrival' },
      { risk: 'Electrode Breakage', prob: 3, impact: 1, score: 3, emv: '₹45 Cr', strategy: 'Accept', strategyUrl: 'https://www.graphiteelectrode.com/technical', strategyTooltip: 'Maintain 4-week electrode buffer stock + supplier agreements', owner: 'GM Melting', trigger: 'Scrap density > 0.7 t/m³' },
      { risk: 'Power Quality Event', prob: 3, impact: 1, score: 3, emv: '₹18 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ieee.org/standards', strategyTooltip: 'SVC/STATCOM installation + harmonic filters', owner: 'Head Electrical', trigger: 'THD > 8% sustained' },
      { risk: 'Flood/Substation Damage', prob: 2, impact: 2, score: 4, emv: '₹90 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com/risk-knowledge', strategyTooltip: 'SFSP + flood mitigation measures + elevated substations', owner: 'Head Maintenance', trigger: 'Monsoon forecast + river level warning' },
    ],
    caseStudy: {
      title: 'Aarti Steel — EAF Transformer Explosion & Extended Shutdown',
      location: 'Aarti Steel, Kutch, Gujarat',
      date: 'March 2024',
      loss: '₹120 Cr (equipment + BI)',
      rootCause: 'Progressive winding insulation degradation over 8 years caused an inter-turn fault in the 60 MVA EAF transformer. The fault evolved into a full short circuit within milliseconds, vaporizing transformer oil and causing a violent explosion that destroyed the transformer and damaged the adjacent SVC unit. DGA (Dissolved Gas Analysis) had shown elevated acetylene for 6 months but threshold triggers were not updated.',
      impact: 'Complete EAF shutdown for 14 months while custom replacement transformer was manufactured. Revenue loss of ₹85 Cr. Capital loss of ₹35 Cr. 200 contract workers laid off during shutdown. Market share lost to competitors during extended outage.',
      lessons: [
        'DGA testing frequency increased to monthly for transformers > 10 years old',
        'Automated online DGA monitoring for all EAF transformers > 30 MVA',
        'Spare transformer procurement strategy — industry consortium for shared spare',
        'Business continuity plan with tolling agreements for extended outage scenario',
        'Insurance policy review — ensure BI indemnity period covers actual replacement lead time'
      ],
      benchmark: 'Nucor (USA) maintains shared spare transformers at regional locations with 30-day swap capability. Their maximum unplanned outage in 5 years: 45 days vs this incident\'s 14 months.'
    },
    emergingRisks: [
      {
        id: 'mm-er-1',
        title: 'Scrap Quality Deterioration — Tramp Elements',
        category: 'market',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'As scrap recycling increases, copper, tin, and nickel contamination accumulates in the steel scrap supply chain. These elements cannot be removed by EAF melting and degrade product quality. Indian scrap imports from ship-breaking contain unknown alloy content.',
        implications: ['Product quality claims increasing', 'Higher rejection rates in auto-grade steel', 'Scrap sorting cost escalation', 'Customer contract penalties', 'Need for primary iron dilution (DRI)']
      },
      {
        id: 'mm-er-2',
        title: 'Electricity Cost Volatility & Green Premium',
        category: 'market',
        severity: 'high',
        timeline: '2024-2028',
        description: 'EAF cost structure is 30-40% electricity. Renewable energy obligations (RPO) at 25%+ and cross-subsidy surcharges create cost unpredictability. Open access regulations vary by state and can change with minimal notice.',
        implications: ['Margin compression from power cost spikes', 'RPO compliance cost ₹2-4/kWh premium', 'State policy risk on open access withdrawal', 'Captive solar/wind investment needed', 'Battery storage for load management']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'mm-ni-1',
        title: 'Scrap Import Policy Changes',
        category: 'Regulatory / Trade',
        description: 'Indian EAF/IF sector depends heavily on imported scrap (8-10 MTPA). Government scrap quality regulations (BIS certification) and port inspection delays can starve mills of raw material. A ban or severe restriction (like 2020 radioactivity scare) halts production.',
        mitigation: 'Domestic scrap collection network development, DRI blending capability, multiple port diversification, 45-day inventory policy',
        exposure: '₹2,000-5,000 Cr revenue loss (industry-wide, 3-month disruption scenario)'
      },
      {
        id: 'mm-ni-2',
        title: 'Grid Connection & Power Allocation Risk',
        category: 'Infrastructure',
        description: 'EAF plants need dedicated 132/220 kV grid connections with firm power allocation. State DISCOMS can curtail industrial supply during peak demand or elections. Load shedding directly halts production with no recourse.',
        mitigation: 'Captive power plants (gas/solar), bilateral PPA with renewable generators, battery energy storage, demand response participation',
        exposure: '₹200-500 Cr per plant (annual production loss from unplanned curtailments)'
      }
    ],
    bestPractices: [
      {
        id: 'mm-bp-1',
        title: 'EAF Transformer Condition Monitoring',
        standard: 'IEC 60599 (DGA Interpretation) + IEEE C57.104',
        description: 'Comprehensive transformer health management for high-duty EAF service including dissolved gas analysis, frequency response analysis, and thermal monitoring.',
        recommendations: [
          'Online DGA monitor with automatic trending and alarm thresholds per IEC 60599',
          'Frequency Response Analysis (FRA) annually to detect winding displacement',
          'Oil quality testing quarterly — moisture, acidity, breakdown voltage',
          'Thermal imaging of bushings, cable boxes, and cooling systems monthly',
          'Spare transformer strategy — shared industry spare or guaranteed 6-month delivery contract'
        ],
        benchmark: 'Tokyo Steel achieves >25 year EAF transformer life through online monitoring vs Indian average of 12-15 years.'
      },
      {
        id: 'mm-bp-2',
        title: 'Scrap Quality Assurance Program',
        standard: 'BIS IS 2549 + ISRI Guidelines + Radioactivity Screening per AERB',
        description: 'Preventing explosive and contaminated material from entering the EAF through systematic incoming inspection, radioactivity scanning, and supplier qualification.',
        recommendations: [
          'Radioactivity portal monitor at all scrap entry points (AERB-approved)',
          'Visual and magnetic inspection for sealed containers, gas cylinders, munitions',
          'Moisture content measurement — mandatory drying for scrap > 3% moisture',
          'Supplier scorecard system — reject rate tracking and debarment threshold',
          'Segregated storage for different scrap grades with clear labeling',
          'Spectrometric analysis of each heat for tramp element tracking'
        ],
        benchmark: 'Nucor maintains <0.1% scrap-related incidents through their proprietary scrap inspection protocol and supplier certification program.'
      }
    ]
  },
  {
    id: 'downstream',
    label: 'Downstream',
    icon: '🔧',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80',
    bannerTitle: 'Downstream Processing',
    bannerSubtitle: 'Cold rolling, galvanizing, coating, and tube-making — precision processes with fire and chemical risks.',
    aogPerils: [
      {
        id: 'ds-aog-1',
        title: 'Earthquake — Crane Derailment & Coil Cascade',
        severity: 'high',
        description: 'Cold rolling mills store 10,000-50,000 tonnes of steel coils on saddles. Seismic forces cause coil cascade (domino-effect toppling) and overhead crane derailment. A single 25-tonne coil rolling uncontrolled can destroy equipment and kill workers.',
        impactAreas: ['Coil Cascade Damage', 'Crane Derailment', 'Roll Grinding Equipment Damage', 'Building Column Buckling', 'Acid Tank Breach'],
        typicalClaim: '₹20–100 Cr + 2-4 months BI'
      },
      {
        id: 'ds-aog-2',
        title: 'Storm / Wind — Coated Sheet Building Damage',
        severity: 'medium',
        description: 'Color coating lines and galvanizing plants often have lightweight portal-frame buildings with large bay openings. Cyclonic winds penetrate open bay doors creating internal pressure that lifts roofing. Paint booths with solvent vapors ignite from electrical arcing during storms.',
        impactAreas: ['Roof Uplift', 'Paint Line Contamination', 'Zinc Pot Solidification', 'Solvent Vapor Ignition', 'Finished Goods Damage'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'ds-naog-1',
        title: 'Acid Regeneration Plant Explosion (HCl)',
        severity: 'critical',
        description: 'Pickling lines use 18-20% hydrochloric acid at 80-85°C. The acid regeneration plant (ARP) recovers spent acid through spray roasting at 450°C. Tube leaks in the roaster or absorber column failure release HCl gas clouds. The 2019 Welspun incident hospitalized 40 workers from acid fume inhalation.',
        impactAreas: ['HCl Gas Release', 'Worker Chemical Burns', 'Environmental Contamination', 'Regulatory Shutdown', 'Community Evacuation'],
        typicalClaim: '₹30–100 Cr + 2-4 months BI'
      },
      {
        id: 'ds-naog-2',
        title: 'Galvanizing / Zinc Pot Explosion',
        severity: 'high',
        description: 'Continuous galvanizing lines maintain 500+ tonnes of molten zinc at 460°C in ceramic-lined pots. Water leaks from sink rolls, snout condensation, or strip edge moisture entering the zinc bath cause violent steam explosions ejecting molten zinc. Pot rebuild takes 3-4 weeks.',
        impactAreas: ['Molten Zinc Ejection', 'Sink Roll Failure', 'Strip Breakage', 'Pot Shell Cracking', 'Worker Burns'],
        typicalClaim: '₹20–80 Cr + 1-2 months BI'
      },
      {
        id: 'ds-naog-3',
        title: 'Cold Rolling Mill Fire — Hydraulic Oil / Rolling Oil',
        severity: 'high',
        description: 'Cold rolling mills use 50,000-200,000 liters of rolling oil (kerosene-based) sprayed as coolant/lubricant at high pressure. Oil mist accumulates in mill basements creating explosive atmospheres. A single hot spark from strip breakage or roll bite seizure ignites the mist with devastating flash-fire effects.',
        impactAreas: ['Oil Mist Explosion', 'Basement Flash Fire', 'Mill Stand Distortion', 'Hydraulic System Destruction', 'Extended Shutdown'],
        typicalClaim: '₹50–200 Cr + 3-6 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'CRM Oil Fire', prob: 2, impact: 3, score: 6, emv: '₹125 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards', strategyTooltip: 'Oil mist extraction + deluge system + fire-resistant hydraulic fluids', owner: 'GM Cold Rolling', trigger: 'Oil mist concentration > LEL 25%' },
      { risk: 'Acid Plant HCl Release', prob: 2, impact: 2, score: 4, emv: '₹65 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.hse.gov.uk/comah/sragtech', strategyTooltip: 'HAZOP + SIL-rated gas detection + emergency scrubber', owner: 'Head Pickling', trigger: 'HCl sensor > 5 ppm ambient' },
      { risk: 'Zinc Pot Explosion', prob: 2, impact: 2, score: 4, emv: '₹50 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.galvinfo.com/wp-content/uploads/sites/5', strategyTooltip: 'Sink roll cooling water monitoring + snout dew point control', owner: 'GM Galvanizing', trigger: 'Cooling water pH drop or flow anomaly' },
      { risk: 'Coil Cascade (Earthquake)', prob: 1, impact: 2, score: 2, emv: '₹40 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Seismic insurance + coil restraint systems', owner: 'Warehouse Head', trigger: 'Seismic alert from INCOIS' },
    ],
    caseStudy: {
      title: 'JSW Tarapur — Cold Rolling Mill Basement Fire',
      location: 'JSW Steel Coated, Tarapur MIDC, Maharashtra',
      date: 'November 2023',
      loss: '₹150 Cr (equipment + BI + cleanup)',
      rootCause: 'Strip breakage during high-speed rolling (1,200 m/min) generated intense friction heat at the roll bite. The hot strip fragments ignited accumulated rolling oil mist in the mill basement which had not been cleaned for 3 weeks. The deluge system activated but was undersized for basement pool fires. Fire spread to the hydraulic power unit destroying all 4 mill stand hydraulics.',
      impact: 'Complete Cold Rolling Mill shutdown for 5 months. 2,000+ tonnes of work-in-progress coils damaged by heat and smoke. Automotive customers (Maruti, Hyundai) shifted orders to competitors. Environmental penalty for contaminated fire-water runoff.',
      lessons: [
        'Daily oil mist concentration monitoring in mill basements with automatic extraction',
        'Deluge system redesign — foam-water combination for oil pool fires in basements',
        'Mill housekeeping program — weekly oil sump cleaning mandatory',
        'Strip breakage detection with automatic mill stop in <2 seconds',
        'Automotive-grade fire protection — segregated clean coil storage with sprinklers'
      ],
      benchmark: 'POSCO CGL/CRM complex uses nitrogen-inerting of mill basements during operation, eliminating oil mist fire risk entirely.'
    },
    emergingRisks: [
      {
        id: 'ds-er-1',
        title: 'Advanced Coating Chemistry Risks (PVD/CVD)',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2030',
        description: 'New vacuum-based coating technologies (Physical/Chemical Vapor Deposition) for automotive steel use toxic precursor gases (silane, trimethylaluminum) and high-vacuum chambers. Equipment failures can release pyrophoric materials.',
        implications: ['Pyrophoric material handling', 'Vacuum vessel implosion risk', 'Toxic gas exposure (TLV compliance)', 'High equipment replacement cost', 'Insurance coverage uncertainty for novel processes']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'ds-ni-1',
        title: 'Automotive OEM Specification Changes',
        category: 'Market / Customer',
        description: 'Auto OEMs can change steel specifications (new grades, tighter tolerances) with 6-12 month notice. Non-compliance means loss of approved supplier status. AHSS (Advanced High Strength Steel) requires ₹500-1,000 Cr capex in new mill capability that may not be recoverable if OEM shifts to aluminum.',
        mitigation: 'Joint development agreements, early-stage involvement in vehicle programs, flexible mill configuration, multi-OEM qualification strategy',
        exposure: '₹1,000-3,000 Cr per plant (stranded investment if customer exits)'
      }
    ],
    bestPractices: [
      {
        id: 'ds-bp-1',
        title: 'Rolling Oil Fire Prevention & Suppression',
        standard: 'FM Global DS 7-76 + NFPA 68 + IFC PS',
        description: 'Comprehensive fire prevention for cold rolling operations covering oil mist management, basement fire protection, and hydraulic system fire risk.',
        recommendations: [
          'Continuous oil mist monitoring at <10% LEL alarm and <25% LEL shutdown',
          'Forced ventilation of mill basements — minimum 12 air changes per hour',
          'Fire-resistant hydraulic fluids (HFD-U type) for all mill hydraulics',
          'Automatic foam deluge system in basements, sized for worst-case pool fire',
          'Weekly oil sump cleaning and housekeeping audit with photographic record',
          'Hot work permit system with gas testing within 5m radius'
        ],
        benchmark: 'ThyssenKrupp achieves zero mill fires through inerting + continuous LEL monitoring + automated foam suppression.'
      }
    ]
  },
  {
    id: 'rawmaterial',
    label: 'Raw Material',
    icon: '⛏️',
    color: '#4CAF50',
    bannerImage: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=1200&q=80',
    bannerTitle: 'Raw Material Supply Chain',
    bannerSubtitle: 'Iron ore, coking coal, limestone — mining, transport, and storage risks across the value chain.',
    aogPerils: [
      {
        id: 'rm-aog-1',
        title: 'Monsoon Flooding — Open-Cast Mine Inundation',
        severity: 'high',
        description: 'Iron ore mines in Jharkhand, Odisha, and Goa operate as open-cast pits 100-200m deep. Monsoon rainfall fills pits at 500-1000 m³/hour requiring continuous pumping. Pump failure or exceptional rainfall submerges loading equipment, haul roads, and crushers. 2-3 months of monsoon results in 30-40% annual production loss for some mines.',
        impactAreas: ['Mine Pit Flooding', 'HEMM Submersion', 'Crusher/Conveyor Damage', 'Haul Road Washout', 'Tailings Dam Overtopping'],
        typicalClaim: '₹20–100 Cr + 2-4 months production loss'
      },
      {
        id: 'rm-aog-2',
        title: 'Landslide / Slope Failure in Mining Areas',
        severity: 'critical',
        description: 'Overburden dumps and pit walls in iron ore mines can fail catastrophically, especially during monsoons. The 2014 Malin landslide (Maharashtra) killed 151 people. Mining-area slope failures bury equipment, block haul roads, and can dam streams creating secondary flood risk.',
        impactAreas: ['Equipment Burial', 'Worker Fatalities', 'Haul Road Blockage', 'Stream Damming', 'Regulatory Mine Closure'],
        typicalClaim: '₹30–150 Cr + 3-6 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'rm-naog-1',
        title: 'Coal Stockpile Spontaneous Combustion',
        severity: 'high',
        description: 'Coking coal stockpiles (50,000-200,000 tonnes at ports/plants) self-heat through oxidation. Once core temperature exceeds 80°C, thermal runaway leads to spontaneous ignition. Subsurface fires are extremely difficult to extinguish and can burn for weeks destroying entire stockpiles worth ₹500-2,000 Cr.',
        impactAreas: ['Stockpile Loss (₹500-2000 Cr)', 'Port Operations Disruption', 'Environmental Pollution', 'Quality Degradation', 'Supply Chain Disruption'],
        typicalClaim: '₹100–500 Cr + supply disruption'
      },
      {
        id: 'rm-naog-2',
        title: 'Conveyor Belt Fire — Overland Conveyors',
        severity: 'high',
        description: 'Overland conveyors (5-20 km length) transport iron ore from mine to plant. Belt friction at drive pulleys, idler seizure, or hot material from spontaneous combustion ignites rubber belts. Fire propagates along the entire conveyor length at 10-15 m/minute. Replacement belt procurement takes 3-6 months.',
        impactAreas: ['Complete Conveyor Destruction', 'Ore Supply Interruption', 'Forest Fire (if through jungle)', 'Community Impact', 'Permit/Clearance Issues'],
        typicalClaim: '₹30–100 Cr + 3-6 months supply disruption'
      }
    ],
    riskMatrix: [
      { risk: 'Coal Stockpile Fire', prob: 2, impact: 3, score: 6, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.hse.gov.uk/pUbns/priced/hsg51.pdf', strategyTooltip: 'Temperature monitoring + FIFO rotation + compaction + height limits', owner: 'Head Raw Materials', trigger: 'Stockpile temp > 60°C at 2m depth' },
      { risk: 'Mine Flooding', prob: 3, impact: 2, score: 6, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.dgms.gov.in', strategyTooltip: 'Redundant pumping + monsoon preparedness + weather monitoring', owner: 'Mine Manager', trigger: 'Rainfall > 100mm/24hr forecast' },
      { risk: 'Conveyor Belt Fire', prob: 2, impact: 2, score: 4, emv: '₹65 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.iso.org/standard/44942.html', strategyTooltip: 'Fire-resistant belts + thermal imaging at pulleys + fire suppression', owner: 'GM Transport', trigger: 'Belt surface temp > 120°C' },
      { risk: 'Slope Failure', prob: 1, impact: 3, score: 3, emv: '₹90 Cr', strategy: 'Avoid', strategyUrl: 'https://www.isrmtt.com', strategyTooltip: 'Geotechnical monitoring + slope stability analysis + controlled dumping', owner: 'Chief Geologist', trigger: 'Inclinometer displacement > 5mm/day' },
    ],
    caseStudy: {
      title: 'Paradip Port — Imported Coking Coal Stockpile Fire',
      location: 'Paradip Port Trust, Odisha',
      date: 'August 2023',
      loss: '₹380 Cr (material + demurrage + BI)',
      rootCause: 'Australian coking coal with high volatile matter (>28%) was stockpiled at 18m height (exceeding 12m safe limit) for 45 days without rotation. Monsoon moisture trapped heat internally. Core temperature reached 300°C before surface signs appeared. The fire engulfed 120,000 tonnes of coal designated for Tata Steel and JSPL.',
      impact: 'Complete loss of 120,000 tonnes (₹300 Cr material value). Port berth closure for 30 days (₹50 Cr demurrage to ships waiting). Both receiving plants ran on minimum coal blend for 6 weeks affecting BF productivity. Environmental penalty from burning coal particulates over Paradip town.',
      lessons: [
        'Maximum stockpile height 12m with FIFO rotation — oldest coal dispatched first',
        'Embedded temperature sensors at 2m, 5m, 8m depth — alarm at 60°C, action at 70°C',
        'Volatile matter-based segregation — high-VM coal dispatched within 21 days',
        'Compacted surface and water spraying to prevent oxygen ingress',
        'Port-plant coordination — real-time inventory visibility and pull-based dispatch'
      ],
      benchmark: 'POSCO Gwangyang Port limits stockpile residence to 14 days maximum with automated stacker-reclaimer rotation and thermal drone surveys every 48 hours.'
    },
    emergingRisks: [
      {
        id: 'rm-er-1',
        title: 'Coking Coal Supply Concentration Risk (Australia)',
        category: 'market',
        severity: 'high',
        timeline: '2024-2030',
        description: 'India imports 85% of coking coal from Australia. Geopolitical tensions (China-Australia trade war precedent), cyclone disruptions to Queensland mines, and ESG-driven mine closures create severe supply concentration risk. A 3-month supply disruption would idle 50% of Indian BF capacity.',
        implications: ['Supply disruption causing BF banking/cooling', 'Price spikes ($200→$500/tonne in 2022)', 'Quality deterioration from alternative sources', 'Mozambique/Russia alternative supply reliability', 'Need for low-coal technologies (hydrogen DRI)']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'rm-ni-1',
        title: 'Mining Lease Expiry & Auction Uncertainty',
        category: 'Regulatory',
        description: 'MMDR Amendment Act 2015 mandates auction of all mining leases on expiry. Incumbent operators may lose captive mines they have operated for decades. SAIL, Tata Steel, and JSPL face lease expiry clusters in 2030-2035. Auction premium (50-100% over royalty) may make operations unviable.',
        mitigation: 'Diversified ore sources, competitive auction preparedness, joint ventures for mine development, recycling/scrap strategy as partial replacement',
        exposure: '₹10,000-30,000 Cr (industry-wide — loss of captive ore advantages)'
      }
    ],
    bestPractices: [
      {
        id: 'rm-bp-1',
        title: 'Coal Stockpile Spontaneous Combustion Prevention',
        standard: 'IS 6400 + DGMS Circular + AS 4264 (Australian Standard)',
        description: 'Comprehensive coal storage management to prevent self-heating and spontaneous combustion in stockpiles.',
        recommendations: [
          'Maximum stockpile height 12m, footprint based on 45-degree angle of repose',
          'FIFO system — no coal to remain in yard > 21 days (high VM) or 30 days (low VM)',
          'Embedded thermocouple arrays at 2m vertical intervals with SCADA integration',
          'Compacted surface layer to limit oxygen penetration to core',
          'Thermal drone survey twice weekly with AI anomaly detection',
          'Water spray system for surface cooling when ambient > 35°C'
        ],
        benchmark: 'Nippon Steel limits coal yard residence to 10 days through just-in-time shipping coordination, achieving zero stockpile fires in 20 years.'
      }
    ]
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    icon: '🔥',
    color: '#9C27B0',
    bannerImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80',
    bannerTitle: 'Manufacturing Process Risks',
    bannerSubtitle: 'Cross-cutting process risks applicable across all steelmaking routes — thermal, mechanical, electrical, and human factors.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'mfg-naog-1',
        title: 'Refractory Failure — Across All Vessels',
        severity: 'critical',
        description: 'Refractories (alumina, magnesia, carbon) line all steel vessels (BF, BOF, EAF, ladles, tundishes). Failure modes include thermal spalling, chemical erosion from slag, and mechanical damage from charging. A BF hearth refractory failure is the single highest-value risk event in steelmaking — ₹800-1,500 Cr for emergency reline.',
        impactAreas: ['BF Hearth Failure (₹800-1500 Cr)', 'BOF Lining Erosion', 'Ladle Breakout', 'EAF Shell Hotspot', 'Tundish Skull Buildup'],
        typicalClaim: '₹50–1,500 Cr depending on vessel'
      },
      {
        id: 'mfg-naog-2',
        title: 'Crane Failure — Overhead & Ladle Cranes',
        severity: 'critical',
        description: 'Steel plants operate 200-500 EOT cranes including ladle cranes carrying 300+ tonnes of molten steel at 20m height. Main hoist wire rope failure, brake failure, or structural fatigue crack in the crane bridge drops the entire load. A ladle drop is unsurvivable for anyone below and destroys the bay floor.',
        impactAreas: ['Ladle Drop (catastrophic)', 'Hoist Rope Failure', 'Brake System Failure', 'Bridge Girder Fracture', 'Collision Between Cranes'],
        typicalClaim: '₹100–500 Cr + multi-fatality liability'
      },
      {
        id: 'mfg-naog-3',
        title: 'Water-Molten Metal Interaction (Steam Explosion)',
        severity: 'critical',
        description: 'The most violent explosion type in steelmaking. When water contacts molten steel/iron (>1,400°C), instant vaporization creates a steam explosion with 1,000x volume expansion in milliseconds. Sources: leaking cooling panels, wet scrap, damp refractories, or broken water lines near metal flow paths.',
        impactAreas: ['Furnace Explosion', 'Building Structural Damage', 'Multiple Fatalities', 'Cooling System Cascade Failure', 'Environmental Hot Metal Spill'],
        typicalClaim: '₹200–1,000 Cr + potential multi-fatality'
      }
    ],
    riskMatrix: [
      { risk: 'BF Hearth Refractory Failure', prob: 1, impact: 3, score: 3, emv: '₹1,150 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.worldsteel.org', strategyTooltip: 'Continuous thermal monitoring + titanium injection + campaign management', owner: 'VP Iron Making', trigger: 'Hearth isotherms approaching shell' },
      { risk: 'Crane Failure (Ladle Drop)', prob: 1, impact: 3, score: 3, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.iso.org/standard/51584.html', strategyTooltip: 'NDT of ropes + load testing + SIL-rated brake systems', owner: 'Head Mechanical', trigger: 'Wire rope diameter reduction >10%' },
      { risk: 'Steam Explosion', prob: 2, impact: 3, score: 6, emv: '₹600 Cr', strategy: 'Avoid', strategyUrl: 'https://www.worldsteel.org/steel-topics/safety', strategyTooltip: 'Zero water in metal zone + cooling circuit integrity monitoring', owner: 'All Plant Heads', trigger: 'Any cooling water leak near molten metal' },
      { risk: 'Refractory Failure (Ladle/BOF)', prob: 3, impact: 2, score: 6, emv: '₹150 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rie.org/publications', strategyTooltip: 'Laser scanning + remaining life tracking + hard-stop campaigns', owner: 'GM Refractories', trigger: 'Lining life at 80% of campaign' },
    ],
    caseStudy: {
      title: 'Tata Steel Jamshedpur — Ladle Crane Wire Rope Failure',
      location: 'Tata Steel, LD Shop, Jamshedpur, Jharkhand',
      date: 'February 2020',
      loss: '₹180 Cr (equipment + BI + compensation)',
      rootCause: 'Main hoist wire rope on 350-tonne ladle crane failed due to fatigue cracking at the drum termination point. The rope had been in service for 4 years (within the 5-year replacement schedule) but the specific failure point was in a zone not covered by routine MPI inspections. The ladle (containing 280 tonnes of molten steel) dropped 15 meters onto the casting bay floor.',
      impact: 'Complete destruction of one continuous caster strand. 4 workers suffered burn injuries (no fatalities due to exclusion zone compliance). Bay floor required complete reconstruction. Casting bay shutdown for 3 months. Insurance claim settled at ₹180 Cr.',
      lessons: [
        'Wire rope inspection zone expanded to include drum termination and equalization sheaves',
        'Replacement cycle reduced from 5 years to 3.5 years for ladle crane ropes',
        'Secondary safety system (mechanical catch) retrofitted on all ladle cranes',
        'Electromagnetic rope testing (MRT) technology adopted for internal wire break detection',
        'Exclusion zone automation — RFID-based personnel tracking in crane operating zones'
      ],
      benchmark: 'ArcelorMittal mandates dual-rope ladle cranes where both ropes independently support full load — single rope failure results in controlled lowering, not drop.'
    },
    emergingRisks: [
      {
        id: 'mfg-er-1',
        title: 'Automation-Induced Complacency Risk',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'As steel plants automate more operations (robotic sampling, automated cranes, unmanned vehicles), operators lose situational awareness and manual intervention capability. When automation fails in a critical moment, delayed human response leads to escalated incidents.',
        implications: ['Slower emergency response when automation fails', 'Loss of tacit process knowledge', 'Over-reliance on sensor data vs physical observation', 'Training gaps for manual backup procedures', 'Liability allocation between human and machine']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'mfg-ni-1',
        title: 'Skills Gap & Retirement Wave',
        category: 'Human Capital',
        description: 'Indian steel plants face retirement of 30-40% of experienced operators (hired 1985-1995) within 2025-2035. Their tacit knowledge of furnace behavior, emergency response, and anomaly recognition cannot be fully captured in SOPs. New recruits require 5-7 years to develop equivalent intuition.',
        mitigation: 'Structured knowledge transfer programs, AI-assisted operator advisory systems, extended retirement rehiring, apprenticeship programs, digital twin simulators for training',
        exposure: 'Increased incident frequency by 20-30% during transition period (₹2,000-5,000 Cr industry-wide risk)'
      }
    ],
    bestPractices: [
      {
        id: 'mfg-bp-1',
        title: 'Molten Metal Safety Engineering',
        standard: 'World Steel Association Safety Principles + OSHA 3891',
        description: 'Universal safety engineering principles for all operations involving liquid steel, iron, or slag handling.',
        recommendations: [
          'All materials contacting molten metal must be verified moisture-free (< 0.1%)',
          'Cooling water circuits near molten metal: closed-loop with leak detection',
          'Minimum 3m exclusion zone around all molten metal flow paths',
          'Emergency dump/divert systems for all vessels containing liquid metal',
          'Ladle/vessel condition monitoring: thermal imaging before every use',
          'Zero tolerance for bypassing safety interlocks on metal handling equipment'
        ],
        benchmark: 'World Steel top-quartile performers achieve < 0.5 molten metal incidents per million tonnes produced.'
      }
    ]
  }
]
