// Textile Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const TEXTILE_RISK_SOURCES: RiskSource[] = [
  {
    id: 'spinning',
    label: 'Spinning & Yarn',
    icon: '🧵',
    color: '#7c3aed',
    bannerImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80',
    bannerTitle: 'Spinning & Yarn Manufacturing',
    bannerSubtitle: 'Cotton/synthetic fiber processing, ring spinning, open-end spinning — extreme fire hazard from cotton dust and fiber accumulation.',
    aogPerils: [
      {
        id: 'spin-aog-1',
        title: 'Flood — Ground Floor Machinery & Cotton Stock',
        severity: 'high',
        description: 'Spinning mills typically have blow room, carding, and ring frames on the ground floor. Monsoon flooding destroys drive motors, bearings, and electronic controls on 500-2,000 spindle machines. Cotton bale storage (₹40,000-60,000/bale × 5,000-20,000 bales) is completely destroyed by water contact. The 2023 Coimbatore flooding damaged 50+ spinning mills.',
        impactAreas: ['Ring Frame Motor Submersion', 'Cotton Bale Destruction', 'Carding Machine Damage', 'Electronic Drive Failure', 'Foundation Settlement'],
        typicalClaim: '₹20–150 Cr + 2-4 months BI'
      },
      {
        id: 'spin-aog-2',
        title: 'Cyclone — Roof Damage & Machinery Exposure',
        severity: 'medium',
        description: 'Spinning mills have large, lightweight roof structures covering 10,000-50,000 m² of floor area. Cyclonic winds lift roof sheets, exposing precision machinery to rain. Tamil Nadu and Andhra Pradesh (major spinning hubs) face annual cyclone risk. A single roof failure event can affect 50,000+ spindles through rain/moisture damage.',
        impactAreas: ['Roof Sheet Uplift', 'Rain Ingress to Machinery', 'Humidification System Damage', 'Power Grid Disruption', 'Raw Cotton Moisture Damage'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'spin-naog-1',
        title: 'Spinning Mill Fire — Cotton Dust Ignition',
        severity: 'critical',
        description: 'Spinning mills have the highest fire frequency in Indian manufacturing. Cotton fiber/dust is highly flammable (ignition temperature 250°C). Friction from bearings, electrical sparks, static discharge, or overheated motors ignites fiber accumulation. Fire propagates along fiber deposits on machines at 5-10 m/min. An entire spinning floor (50,000 spindles, ₹200-500 Cr) can be destroyed in 30-60 minutes. Indian textile industry averages 300+ mill fires annually.',
        impactAreas: ['Complete Floor/Building Loss', 'Multi-Floor Propagation', 'Cotton Stock Destruction', 'Machinery Total Loss', 'Worker Fatalities (trapped)'],
        typicalClaim: '₹50–500 Cr + 6-18 months BI'
      },
      {
        id: 'spin-naog-2',
        title: 'Blow Room / Mixing Line Explosion',
        severity: 'high',
        description: 'Blow room opening and mixing lines create fine cotton dust clouds during fiber opening and cleaning. Dust concentration in enclosed ducting and trash rooms reaches explosive levels (LEL for cotton dust: 40-65 g/m³). Foreign metal objects in cotton bales create sparks when hitting opening rollers at high speed. Blow room explosions damage ducting, fans, and adjacent carding machines.',
        impactAreas: ['Ducting Explosion', 'Fan/Motor Destruction', 'Trash Room Fire', 'Adjacent Carding Damage', 'Filter System Failure'],
        typicalClaim: '₹10–50 Cr + 1-3 months BI'
      },
      {
        id: 'spin-naog-3',
        title: 'Ring Frame / Open-End Machine Fire',
        severity: 'high',
        description: 'Ring spinning frames (500-1,800 spindles per machine, operating at 15,000-25,000 RPM) generate heat from high-speed rotation. Bearing failure, ring traveler malfunction, or lapping (fiber wrap on rollers) creates ignition sources. The thin cotton roving/yarn acts as a fast-burning fuse propagating fire along the entire machine length (30-60m) within minutes.',
        impactAreas: ['Single Machine Total Loss', 'Fire Propagation to Adjacent Machines', 'Bobbin/Cone Storage Fire', 'Drive System Damage', 'Building Structural Damage'],
        typicalClaim: '₹5–50 Cr + 1-4 months BI'
      },
      {
        id: 'spin-naog-4',
        title: 'Cotton Bale Storage Fire — Spontaneous Combustion',
        severity: 'high',
        description: 'Cotton bales stored at >8% moisture content (common during monsoon procurement) self-heat through microbial/oxidative processes. Core temperature rises undetected until auto-ignition. Dense bale packing and standard sprinklers cannot penetrate to the fire core. Cotton bale fires burn for days/weeks. A 10,000-bale godown (₹50 Cr stock) can be a total loss.',
        impactAreas: ['Stock Total Loss', 'Extended Fire Duration (days)', 'Building Collapse', 'Adjacent Property Exposure', 'Environmental Impact'],
        typicalClaim: '₹20–200 Cr (stock + building)'
      }
    ],
    riskMatrix: [
      { risk: 'Spinning Mill Fire', prob: 3, impact: 3, score: 9, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Sprinkler protection + spark detection + housekeeping program + electrical maintenance', owner: 'Mill Manager', trigger: 'Any spark detection alarm or housekeeping audit failure' },
      { risk: 'Cotton Bale Storage Fire', prob: 2, impact: 3, score: 6, emv: '₹110 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Moisture testing + temperature monitoring + ESFR sprinklers + separation', owner: 'Stores Manager', trigger: 'Bale moisture >8% or temperature probe >55°C' },
      { risk: 'Blow Room Explosion', prob: 2, impact: 2, score: 4, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.atexexplosionprotection.com', strategyTooltip: 'Metal detection + spark detection + explosion vents + dust extraction maintenance', owner: 'Blow Room Head', trigger: 'Metal detector activation or spark detection' },
      { risk: 'Flood (Mill + Stock)', prob: 2, impact: 2, score: 4, emv: '₹85 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP + elevated cotton storage + electrical equipment above flood level', owner: 'Admin Manager', trigger: 'Heavy rainfall warning >150mm/24hr' },
      { risk: 'Ring Frame Fire', prob: 3, impact: 1, score: 3, emv: '₹28 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Bearing monitoring + lapping detection + automatic doffing + local suppression', owner: 'Production Head', trigger: 'Bearing temperature >80°C or lapping detected on any spindle' },
    ],
    caseStudy: {
      title: 'Rajapalayam Mills — Complete Spinning Unit Fire',
      location: 'Rajapalayam Mills, Rajapalayam, Tamil Nadu',
      date: 'January 2023',
      loss: '₹180 Cr (machinery + stock + building)',
      rootCause: 'Electrical short circuit in the main distribution board at 2:30 AM (unmanned shift) ignited accumulated cotton fiber on cable trays running above the ring frame floor. The fire spread along the cable tray (acting as a fiber accumulation pathway) across the entire 15,000 m² floor within 25 minutes. The sprinkler system activated but was designed to Ordinary Hazard standard — insufficient for the extra-high fire load of cotton fiber. By the time the fire brigade arrived (35 minutes), the entire floor was fully involved.',
        impact: '48,000 spindles destroyed. Building structural collapse from heat. 2,000 tonnes of cotton yarn in process destroyed. Total reconstruction: 14 months. BI loss: ₹100 Cr. Property loss: ₹80 Cr. 600 workers unemployed for 14 months. Mill eventually rebuilt with FM Global specification fire protection.',
      lessons: [
        'Cable trays above ring frames must be cleaned weekly — fiber accumulation is a fire highway',
        'Sprinkler design for spinning mills must be Extra High Hazard (EHH) — minimum 15 mm/min',
        'Fire detection must include linear heat detection along cable trays (fiber-accumulation path)',
        'Night shift: minimum 2 watchmen with thermal imaging camera patrolling every 30 minutes',
        'Electrical distribution boards must be in separate fire-rated rooms — not on production floor'
      ],
      benchmark: 'Vardhman Textiles (India\'s largest) achieves <1 fire per 100 spinning units per year through: EHH sprinklers + weekly housekeeping audit + linear heat detection + 24/7 security patrol with thermal cameras.'
    },
    emergingRisks: [
      {
        id: 'spin-er-1',
        title: 'Automation/IoT in Spinning — Cyber & Electrical Risks',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'Modern compact spinning machines have IoT sensors, automated doffing, and cloud-connected monitoring. Increased electrical complexity in cotton-dust environment raises fire risk. Cyber attacks on connected spinning systems could cause mass machine damage through incorrect speed/tension settings. Remote monitoring creates false confidence reducing physical patrol frequency.',
        implications: ['More electrical ignition sources in fiber-rich environment', 'Cyber attack potential causing physical machine damage', 'Reduced human patrol frequency (false confidence from IoT)', 'Software update errors causing mass machine malfunction', 'Data dependency creating new single-point-of-failure']
      },
      {
        id: 'spin-er-2',
        title: 'Recycled/Sustainable Fiber Processing Risks',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'EPR regulations and brand sustainability commitments driving recycled polyester and cotton waste fiber processing. Recycled materials contain unknown contaminants (metal, plastic buttons, zippers) that damage machinery and create fire sparks. Processing recycled fiber generates more dust and shorter fiber lengths — increasing explosion and fire risk in blow room and carding.',
        implications: ['Increased metal contamination causing sparks', 'Higher dust generation from shorter recycled fibers', 'Unknown chemical residues in recycled materials', 'Machine wear rate increase from contaminants', 'Quality variability requiring more waste handling']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'spin-ni-1',
        title: 'Cotton Price Volatility & MSP Politics',
        category: 'Commodity / Policy',
        description: 'Cotton prices swing ₹40,000-80,000/candy (356 kg) based on monsoon, pest attacks, government MSP announcements, and export restrictions. The 2022 cotton spike (₹1,00,000/candy from ₹45,000) and subsequent crash destroyed spinning margins. Government export bans and stock limits create unpredictable supply availability. No effective commodity hedging for Indian cotton.',
        mitigation: 'Diversified fiber mix (polyester, viscose blending), forward contracts with ginners, vertical integration into ginning, inventory management aligned to price cycles, export diversification to reduce domestic policy dependency',
        exposure: '₹100-500 Cr/year margin impact per large spinning company from cotton price volatility'
      },
      {
        id: 'spin-ni-2',
        title: 'Labor Shortage & Wage Inflation (South India)',
        category: 'Operational / Social',
        description: 'Spinning mills in Tamil Nadu/Karnataka face severe labor shortage (60-70% of required workforce). Young workers prefer service sector employment. Remaining workforce demands 15-20% annual wage increases. Mills running at 70-80% capacity due to labor constraints. Automation investment of ₹50-100 Cr per mill required to maintain output with fewer workers.',
        mitigation: 'Automation investment (compact spinning, auto-doffing, robotic handling), relocation to labor-surplus states (UP, Bihar, Odisha), worker welfare programs (housing, transport, education), shift optimization to attract workers',
        exposure: '₹50-200 Cr/year per company (lost production + wage inflation + automation capex)'
      }
    ],
    bestPractices: [
      {
        id: 'spin-bp-1',
        title: 'Spinning Mill Fire Prevention & Protection',
        standard: 'FM Global DS 7-1 (Textile Manufacturing) + NFPA 13 (Extra High Hazard) + TAI Guidelines',
        description: 'Comprehensive fire prevention for the highest-frequency fire risk in Indian manufacturing — the cotton spinning mill.',
        recommendations: [
          'Sprinkler system: Extra High Hazard Group 2 design (minimum 15 mm/min discharge density)',
          'Weekly housekeeping audit: zero fiber accumulation >3mm on any surface, machine, or cable tray',
          'Spark detection system in blow room ducting with automatic isolation dampers',
          'Metal detection at bale opening — remove all foreign objects before processing',
          'Linear heat detection cable along cable trays (fiber accumulation pathway)',
          'Electrical maintenance: thermographic survey monthly on all distribution boards',
          'Night watchman patrol with thermal imaging camera every 30 minutes',
          'Cotton bale storage: separate building, moisture testing at receipt, max 5m stack height'
        ],
        benchmark: 'Vardhman Textiles achieves <1 fire/100 units/year vs industry average of 8-10 fires/100 units — through FM Global compliant sprinklers, religious housekeeping, and thermal imaging patrols.'
      }
    ]
  },
  {
    id: 'weaving-knitting',
    label: 'Weaving & Knitting',
    icon: '🪡',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80',
    bannerTitle: 'Weaving & Knitting Operations',
    bannerSubtitle: 'Looms, knitting machines, and sizing operations — high-speed machinery with fire from sizing chemicals and fiber dust.',
    aogPerils: [
      {
        id: 'weave-aog-1',
        title: 'Earthquake — Loom Floor Structural Damage',
        severity: 'medium',
        description: 'Weaving sheds with 200-1,000 looms on upper floors (common in powerloom clusters) are vulnerable to seismic forces. Building column failure causes floor collapse with 500+ kg looms falling. Surat/Bhiwandi powerloom clusters have high building density with inadequate seismic design.',
        impactAreas: ['Building/Floor Collapse', 'Mass Loom Damage', 'Worker Entrapment', 'Cluster-Wide Disruption', 'Beam/Warp Stock Damage'],
        typicalClaim: '₹10–80 Cr + 2-6 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'weave-naog-1',
        title: 'Sizing/Warping Section Fire',
        severity: 'high',
        description: 'Sizing (applying starch/PVA solution to warp yarns) uses heated drying cylinders at 100-130°C. Size chemicals (starch, PVA, wax) accumulate as flammable deposits on drying cylinders and exhaust ducts. Fiber lint from warping machines adds combustible material. A sizing machine fire spreads rapidly through sized yarn beams stored nearby (₹5-20 Lakh each × hundreds of beams).',
        impactAreas: ['Sizing Machine Fire', 'Beam Storage Ignition', 'Exhaust Duct Fire', 'Warp Yarn Destruction', 'Weaving Capacity Loss (beam starvation)'],
        typicalClaim: '₹15–80 Cr + 2-4 months BI'
      },
      {
        id: 'weave-naog-2',
        title: 'Weaving Shed Fire — Fabric Stock',
        severity: 'high',
        description: 'Greige fabric stored after weaving (before processing) represents high fire load. Electrical faults in dense loom installations (200+ looms in 2,000 m²), compressed air line failure causing sparks, or hot work ignite fabric rolls/folds. In powerloom clusters (Surat, Bhiwandi, Malegaon), building density means fire spreads between adjacent units through shared walls and common ducts.',
        impactAreas: ['Fabric Stock Destruction', 'Multi-Loom Damage', 'Cluster Fire Spread', 'Building Structural Damage', 'Multi-Party Loss'],
        typicalClaim: '₹10–100 Cr + 1-6 months BI'
      },
      {
        id: 'weave-naog-3',
        title: 'Air Jet Loom Compressor Failure',
        severity: 'medium',
        description: 'Modern air jet looms require continuous compressed air at 4-6 bar from large compressor installations (3-5 compressors per 100 looms). Compressor failure from bearing seizure, intercooler leak, or motor burnout stops all looms simultaneously. Oil-injected compressors have fire risk from overheating. Lead time for large compressor replacement: 3-4 months.',
        impactAreas: ['All Looms Stop (no air)', 'Compressor Bearing Seizure', 'Oil Fire from Overheating', 'Intercooler Burst', 'Production Halt'],
        typicalClaim: '₹5–30 Cr + 1-4 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Sizing Section Fire', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Cylinder cleaning schedule + exhaust duct spark detection + beam storage separation', owner: 'Sizing Head', trigger: 'Cylinder deposit buildup or exhaust duct temperature >80°C' },
      { risk: 'Fabric Stock Fire', prob: 3, impact: 2, score: 6, emv: '₹55 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'Fabric storage sprinkler + fire compartments + electrical housekeeping + separation', owner: 'Weaving Manager', trigger: 'Fire detection in fabric storage or weaving shed' },
      { risk: 'Compressor Failure', prob: 2, impact: 1, score: 2, emv: '₹18 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.atlas-copco.com', strategyTooltip: 'N+1 redundancy + vibration monitoring + oil analysis + service contracts', owner: 'Utilities Head', trigger: 'Compressor vibration >6 mm/s or oil analysis trending' },
    ],
    caseStudy: {
      title: 'Surat Powerloom Cluster — Multi-Unit Fire Spread',
      location: 'Surat Textile Market Area, Pandesara GIDC, Gujarat',
      date: 'November 2022',
      loss: '₹120 Cr (15 units combined)',
      rootCause: 'Electrical short circuit in a ground-floor powerloom unit (80 looms) during night (unmanned). Fire spread through shared walls, common cable risers, and unprotected floor openings to 14 adjacent units across 4 buildings over 3 hours. None of the affected units had sprinkler protection, fire walls, or fire detection. The cluster layout (narrow lanes, shared walls, no fire separation) made firefighting access impossible for the first 90 minutes.',
      impact: '1,200+ looms destroyed across 15 units. 50,000 meters of fabric stock lost. 4 buildings structurally damaged requiring demolition. 2,000+ workers unemployed for 6-12 months. Total insured loss: ₹45 Cr (most units underinsured). Estimated total economic loss: ₹120 Cr. This type of cluster fire occurs 5-10 times annually across Indian textile clusters.',
      lessons: [
        'Fire walls between adjacent units — minimum 2-hour rated separation',
        'Common cable risers and duct penetrations must be fire-stopped',
        'Each unit requires independent fire detection with auto-dialer to fire station',
        'Minimum sprinkler protection even for small powerloom units (₹5-8 Lakh investment)',
        'Night security guard with fire patrol for clusters operating unmanned at night',
        'Fire vehicle access: minimum 4m clear lane maintained (no fabric/material storage in lanes)'
      ],
      benchmark: 'Turkish textile clusters (Bursa, Denizli) mandate: fire walls between units, sprinkler protection for all units >500 m², and 24/7 cluster-level fire monitoring — their cluster fire losses are 80% lower than India despite similar building density.'
    },
    emergingRisks: [
      {
        id: 'weave-er-1',
        title: 'Technical Textile Growth — New Process Risks',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'India\'s technical textile push (PLI scheme) introduces new manufacturing processes: meltblown (PP at 300°C), spunbond, needle-punching, and chemical coating. These processes use different polymers, higher temperatures, and produce different fiber types with unknown fire/explosion characteristics compared to traditional cotton/polyester.',
        implications: ['Higher temperature operations (meltblown 300°C+)', 'New polymer fire characteristics (PP highly flammable)', 'Chemical coating solvent vapors', 'Unknown dust explosion parameters for new fiber types', 'Insurance coverage gaps for novel technical textile processes']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'weave-ni-1',
        title: 'Fast Fashion Demand Volatility & Order Cancellation',
        category: 'Market',
        description: 'Global fashion brands cancel orders with 2-4 week notice based on retail demand signals. Indian weavers invest in yarn and beam preparation (₹50-200 Lakh per order) before receiving confirmed purchase orders. Order cancellation leaves finished fabric unsold (30-50% discount in distress sale). Post-COVID order volatility has increased cancellation rates from 3% to 8-10%.',
        mitigation: 'Advance payment/LC requirement before production start, diversified customer base (no >25% single customer), quick-response manufacturing reducing inventory commitment, digital sampling reducing pre-production investment',
        exposure: '₹20-100 Cr/year per large weaver from order cancellations and distress selling'
      }
    ],
    bestPractices: [
      {
        id: 'weave-bp-1',
        title: 'Textile Cluster Fire Prevention',
        standard: 'National Building Code (NBC) India + FM Global DS 7-1 + Gujarat Fire Safety Rules',
        description: 'Fire prevention for densely-packed textile manufacturing clusters — the most loss-prone configuration in Indian industry.',
        recommendations: [
          'Fire walls between adjacent units: minimum 2-hour rated, extending 1m above roof',
          'All wall/floor penetrations (cables, pipes, ducts) fire-stopped with rated sealant',
          'Independent fire detection per unit with auto-dialer to local fire station',
          'Sprinkler protection: minimum for all units >500 m² (₹5-8 Lakh investment)',
          'Fabric/material storage: NOT in common access lanes or stairwells',
          'Night security with thermal camera patrol every 30 minutes for unmanned units',
          'Electrical load audit quarterly — no overloading beyond sanctioned capacity',
          'Fire brigade access lane: minimum 4m width maintained clear at all times'
        ],
        benchmark: 'Post-2019 Surat fire, Gujarat Government mandated fire NOC for all textile units >200 m². Compliance: still <40%. Units with full compliance have zero total fire losses vs 15+ total losses in non-compliant clusters annually.'
      }
    ]
  },
  {
    id: 'processing',
    label: 'Processing & Dyeing',
    icon: '🎨',
    color: '#0369a1',
    bannerImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80',
    bannerTitle: 'Processing, Dyeing & Finishing',
    bannerSubtitle: 'Bleaching, dyeing, printing, and finishing — chemical hazards, hot oil systems, and effluent management risks.',
    aogPerils: [
      {
        id: 'proc-aog-1',
        title: 'Flood — Chemical Store & Effluent System Overflow',
        severity: 'high',
        description: 'Processing units use large quantities of dyes, chemicals (NaOH, H2O2, Na2S2O4), and auxiliary agents. Flooding mixes incompatible chemicals (e.g., acids + bleach = chlorine gas), overflows effluent treatment plants (releasing polluted water into environment), and submerges stenter/dryer machines. Environmental contamination from a flooded dye house triggers immediate NGT/SPCB action.',
        impactAreas: ['Chemical Incompatibility Reaction', 'Effluent Plant Overflow', 'Environmental Contamination', 'Stenter/Dryer Damage', 'Regulatory Shutdown'],
        typicalClaim: '₹15–80 Cr + 1-4 months BI + environmental liability'
      }
    ],
    nonAogPerils: [
      {
        id: 'proc-naog-1',
        title: 'Stenter / Dryer Fire — Heat Setting & Finishing',
        severity: 'critical',
        description: 'Stenters (fabric drying/heat-setting machines) operate at 180-220°C using thermic fluid or direct gas heating. Fabric lint accumulation in the machine, on exhaust filters, and in ducts ignites from high temperature. Oil-based softeners and finishes applied to fabric create flammable coating. A stenter fire is extremely intense (220°C operating temperature + fabric fuel) and destroys the machine (₹5-15 Cr) and adjacent fabric inventory within minutes.',
        impactAreas: ['Stenter Machine Destruction', 'Exhaust Duct Fire', 'Adjacent Fabric Ignition', 'Thermic Fluid Fire (if system breaches)', 'Building Structural Damage'],
        typicalClaim: '₹20–120 Cr + 2-6 months BI'
      },
      {
        id: 'proc-naog-2',
        title: 'Thermic Fluid System Fire',
        severity: 'high',
        description: 'Processing units use thermic fluid (synthetic oil, 250-300°C) for heating stenters, dryers, and calendars. Thermic fluid degrades over time (flash point drops from 200°C to 150°C). Leaks from flanges, pump seals, or flexible hoses spray hot oil onto ignition sources. Thermic fluid fires are persistent (oil-fueled) and difficult to extinguish. System holds 5,000-20,000 liters.',
        impactAreas: ['Oil Spray Fire', 'Pump Seal Failure', 'Expansion Tank Overflow/Fire', 'Pipeline Flange Leak', 'Building Contamination'],
        typicalClaim: '₹10–50 Cr + 1-3 months BI'
      },
      {
        id: 'proc-naog-3',
        title: 'Chemical Reaction — Sodium Hydrosulfite (Na2S2O4)',
        severity: 'high',
        description: 'Sodium hydrosulfite (used in vat dyeing) is self-reactive — decomposes exothermically above 90°C or in contact with moisture/air. Stored in drums, it can self-ignite generating SO2 gas. Multiple textile unit fires in Surat/Bhiwandi traced to hydrosulfite storage. A single drum generates enough heat to ignite adjacent chemical storage.',
        impactAreas: ['Chemical Store Fire', 'Toxic SO2 Gas Release', 'Adjacent Chemical Cascade', 'Worker Asphyxiation', 'Regulatory Investigation'],
        typicalClaim: '₹5–30 Cr + 1-2 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Stenter Fire', prob: 3, impact: 2, score: 6, emv: '₹70 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Exhaust duct spark detection + lint cleaning schedule + fire suppression in oven', owner: 'Finishing Head', trigger: 'Exhaust duct temp >250°C or spark detection alarm' },
      { risk: 'Thermic Fluid Fire', prob: 2, impact: 2, score: 4, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-87', strategyTooltip: 'Fluid testing quarterly + leak detection + flange guards + system pressure monitoring', owner: 'Maintenance Head', trigger: 'Flash point drop >20°C from original or any leak detected' },
      { risk: 'Chemical Reaction (Na2S2O4)', prob: 2, impact: 2, score: 4, emv: '₹18 Cr', strategy: 'Avoid', strategyUrl: 'https://www.hse.gov.uk', strategyTooltip: 'Minimize storage + temperature controlled room + moisture-proof storage + separation', owner: 'Dye House Head', trigger: 'Storage temperature >35°C or drum integrity concern' },
      { risk: 'Flood (Chemical Contamination)', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.cpcb.nic.in', strategyTooltip: 'Elevated chemical storage + bunding + ETP capacity for storm overflow', owner: 'Environment Head', trigger: 'Heavy rainfall forecast + ETP approaching capacity' },
    ],
    caseStudy: {
      title: 'Arvind Ltd Naroda — Stenter Fire During Night Shift',
      location: 'Arvind Limited, Naroda, Ahmedabad, Gujarat',
      date: 'August 2022',
      loss: '₹65 Cr (equipment + stock + BI)',
      rootCause: 'Lint accumulation in the stenter exhaust duct (3 weeks since last cleaning vs 1-week standard) ignited from high-temperature exhaust gas (240°C). The duct fire propagated backward into the stenter oven zone. Simultaneously, lint deposits on the stenter frame and above the machine ignited from radiant heat. The machine\'s automatic fire suppression was a water spray system — adequate for fabric fires but ineffective against duct fires above the machine. Fire spread to finished fabric storage (5,000 meters of denim) adjacent to the stenter.',
      impact: '2 stenter machines destroyed (₹20 Cr replacement, 8-month lead time from Germany). Fabric stock: ₹15 Cr. Building damage: ₹10 Cr. BI loss: ₹20 Cr (8 months at reduced finishing capacity). Arvind subsequently invested in spark detection + duct suppression systems on all 25 stenter lines across 4 plants.',
      lessons: [
        'Stenter exhaust duct cleaning: weekly mandatory schedule — documented with photos',
        'Spark detection in ALL exhaust ducts with automatic damper closure and duct suppression',
        'Stenter frame lint cleaning: every shift — zero visible accumulation tolerance',
        'Finished fabric storage: minimum 10m separation from stenter operation (fire wall preferred)',
        'Stenter suppression system must address both oven zone AND exhaust duct independently'
      ],
      benchmark: 'Lenzing/TENCEL finishing operations: AI-based exhaust temperature monitoring with automatic stenter shutdown at duct temperature anomaly — combined with robotic duct cleaning weekly. Zero stenter fires in 8 years across 15 lines.'
    },
    emergingRisks: [
      {
        id: 'proc-er-1',
        title: 'Zero Liquid Discharge (ZLD) — New Process & Equipment Risks',
        category: 'regulatory',
        severity: 'high',
        timeline: '2024-2028',
        description: 'CPCB mandating ZLD for textile processing units. ZLD systems involve: Multiple Effect Evaporators (MEE) operating at 80-100°C, ATFD (Agitated Thin Film Dryer) with hot surfaces, crystallizers, and RO reject management. These energy-intensive systems introduce new fire/explosion risks (salt dust, hot surfaces, pressure vessels) unfamiliar to textile operators.',
        implications: ['MEE/ATFD fire risk from organic residue on hot surfaces', 'Salt crystallizer explosion from pressure buildup', 'RO membrane chemical cleaning hazards', 'Energy cost 30-40% increase for ZLD operation', '₹50-200 Cr capex per unit for ZLD installation']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'proc-ni-1',
        title: 'Effluent Compliance & NGT/SPCB Closure Orders',
        category: 'Regulatory',
        description: 'Textile processing is among the most polluting industries (high BOD, COD, color, TDS in effluent). NGT has ordered closure of hundreds of processing units in Rajasthan, Tamil Nadu, and Gujarat for non-compliance. A single adverse NGT order can shut an entire cluster. Zero Liquid Discharge (ZLD) mandate requires ₹50-200 Cr investment per unit — unaffordable for small/medium processors.',
        mitigation: 'Proactive ZLD investment, common effluent treatment plant (CETP) participation, cleaner production technology adoption, water recycling maximization, regulatory relationship management',
        exposure: '₹100-500 Cr per cluster (closure impact + compliance capex + lost production)'
      }
    ],
    bestPractices: [
      {
        id: 'proc-bp-1',
        title: 'Stenter/Dryer Fire Prevention',
        standard: 'FM Global DS 7-1 + NFPA 86 (Ovens) + VDMA Guidelines (German Textile Machinery)',
        description: 'Prevention of the most common fire in textile processing — stenter/heat-setting machine fires from lint and finish chemical accumulation.',
        recommendations: [
          'Weekly exhaust duct cleaning: documented with photographic evidence (before/after)',
          'Spark detection in ALL exhaust ducts: automatic damper closure + duct suppression',
          'Every-shift stenter frame lint cleaning: zero visible accumulation on any surface',
          'Exhaust filter cleaning/replacement per manufacturer schedule (typically daily for needle-felt)',
          'Stenter oven zone suppression: water mist or CO2 system independent of duct system',
          'Finished fabric storage: minimum 10m from stenter or separated by 2-hour fire wall',
          'Thermic fluid flash point testing quarterly: replace/regenerate when flash point drops 20°C',
          'No fabric left stationary in stenter during any stoppage >60 seconds (auto-eject to prevent ignition)'
        ],
        benchmark: 'Arvind/Raymond plants post-fire upgrades: spark detection + weekly duct cleaning + AI temperature monitoring achieves zero stenter fires — investment ₹30-50 Lakh per machine prevents ₹20-120 Cr losses.'
      }
    ]
  },
  {
    id: 'garment',
    label: 'Garment & Apparel',
    icon: '👕',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80',
    bannerTitle: 'Garment Manufacturing & Export',
    bannerSubtitle: 'Cutting, sewing, finishing, and warehousing — labor-intensive operations with fire from fabric stock and building safety issues.',
    aogPerils: [
      {
        id: 'gar-aog-1',
        title: 'Earthquake — Multi-Story Factory Collapse',
        severity: 'critical',
        description: 'Garment factories in India/Bangladesh frequently occupy multi-story buildings (4-8 floors) not designed for industrial loads. Sewing machines, fabric rolls, and 500-2,000 workers per floor create loads exceeding original design. The 2013 Rana Plaza collapse (Bangladesh, 1,134 deaths) highlighted this systemic risk. Indian garment clusters in Noida, Gurgaon, and Tiruppur have similar building profiles.',
        impactAreas: ['Building Structural Collapse', 'Mass Worker Casualties', 'Complete Production Loss', 'Brand/Buyer Withdrawal', 'Criminal Liability'],
        typicalClaim: '₹50–500 Cr + life safety + brand damage'
      }
    ],
    nonAogPerils: [
      {
        id: 'gar-naog-1',
        title: 'Garment Factory Fire — Fabric Stock & Blocked Exits',
        severity: 'critical',
        description: 'Garment factories store large quantities of fabric (cut pieces, rolls, trim) throughout the production floor. Electrical faults, iron/pressing station fires, or hot work ignite fabric stock. Dense floor layout and blocked emergency exits (a chronic Indian problem) trap workers. The 2012 Karachi Ali Enterprises fire killed 289 workers from locked exit doors. Indian factories regularly have similar conditions.',
        impactAreas: ['Mass Worker Fatalities', 'Complete Stock/WIP Destruction', 'Building Loss', 'Brand Withdrawal (reputation)', 'Criminal Prosecution'],
        typicalClaim: '₹20–200 Cr + life safety liability'
      },
      {
        id: 'gar-naog-2',
        title: 'Finished Goods Warehouse Fire',
        severity: 'high',
        description: 'Export garment warehouses store packed cartons (4-6m high) of finished garments worth ₹50-200 Cr per shipment season. Cardboard carton + garment combination is highly combustible. Warehouse fires destroy irreplaceable seasonal inventory (cannot be remade before shipping window closes). Loss of a single seasonal warehouse can default export orders worth ₹200-500 Cr.',
        impactAreas: ['Seasonal Inventory Total Loss', 'Export Order Default', 'Buyer Relationship Damage', 'Airfreight Cost (urgent replacement)', 'Brand Penalty/Debit'],
        typicalClaim: '₹50–200 Cr (stock + penalties + airfreight)'
      }
    ],
    riskMatrix: [
      { risk: 'Factory Fire (with life safety)', prob: 2, impact: 3, score: 6, emv: '₹110 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Sprinklers + fire detection + clear exits + emergency lighting + fire drill monthly', owner: 'Factory Manager', trigger: 'ANY blocked exit or fire system impairment — immediate correction' },
      { risk: 'Warehouse Fire (Seasonal)', prob: 2, impact: 3, score: 6, emv: '₹125 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org', strategyTooltip: 'ESFR sprinklers + compartments + VESDA + maximum carton height 5m', owner: 'Logistics Head', trigger: 'Fire detection or housekeeping failure in warehouse' },
      { risk: 'Building Collapse', prob: 1, impact: 3, score: 3, emv: '₹275 Cr', strategy: 'Avoid', strategyUrl: 'https://www.accord.org', strategyTooltip: 'Structural audit of all factory buildings + load capacity verification + seismic assessment', owner: 'Compliance Head', trigger: 'Structural audit finding or visible crack/settlement' },
    ],
    caseStudy: {
      title: 'Sahibabad Garment Factory Fire — Worker Fatalities',
      location: 'Garment Factory, Sahibabad Industrial Area, UP',
      date: 'January 2024',
      loss: '₹15 Cr + 7 fatalities',
      rootCause: 'Electrical short circuit on the 3rd floor of a 4-story garment factory at 5:30 AM (early morning shift starting). Fire spread rapidly through fabric rolls stored in stairwell (blocking primary exit). Emergency exit on rear was padlocked (to prevent theft). Workers on 3rd and 4th floors were trapped. 7 workers died from smoke inhalation before rescue. Building had no sprinkler system, no fire detection, and no emergency lighting.',
      impact: '7 workers dead (₹35 Lakh compensation each per factory act). Building sealed by police/fire department for investigation. Criminal cases filed against factory owner and building owner. All export orders cancelled by international buyers (brand reputation risk). Factory permanently closed. Total economic impact: ₹15 Cr property + immeasurable human cost + brand withdrawal from entire cluster.',
      lessons: [
        'ZERO tolerance for blocked/locked emergency exits — criminal liability for management',
        'Fabric/material storage NEVER in stairwells or exit routes — dedicated fire-rated stores only',
        'Fire detection and alarm mandatory for ALL garment factories regardless of size',
        'Sprinkler protection for all factories >500 m² or >2 floors',
        'Monthly fire drill with timed evacuation — all workers must clear building in <3 minutes',
        'Structural load assessment: factory buildings not designed for industrial use must not be occupied',
        'International buyer audit programs must include unannounced fire safety checks'
      ],
      benchmark: 'Bangladesh Accord (now RSC) post-Rana Plaza: structural + fire + electrical inspections of 2,300 factories, 150,000+ hazards identified and corrected — factory fire fatalities reduced 80% in Bangladesh since 2013. India has no equivalent program.'
    },
    emergingRisks: [
      {
        id: 'gar-er-1',
        title: 'ESG/Social Audit Compliance — Building & Fire Safety',
        category: 'regulatory',
        severity: 'high',
        timeline: '2024-2028',
        description: 'International brands (H&M, Zara, Nike) implementing mandatory fire and building safety audits for Indian suppliers. Non-compliance means order cancellation. EU Corporate Sustainability Due Diligence Directive (CSDDD) makes brands legally liable for supplier safety. Indian garment factories need ₹50-200 Lakh investment per unit for compliance — many will fail.',
        implications: ['Order loss from non-compliant factories', 'Brand legal liability under EU CSDDD for supplier incidents', '₹50-200 Lakh compliance investment per factory', 'Worker shortage at non-compliant factories (workers moving to compliant ones)', 'Industry consolidation as small units cannot afford upgrades']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'gar-ni-1',
        title: 'International Buyer Concentration & Order Volatility',
        category: 'Market / Customer',
        description: 'Indian garment exporters often depend on 2-3 major international buyers (H&M, Walmart, Primark) for 60-80% of revenue. A single buyer reducing orders (due to recession, inventory overhang, or sourcing shift to Bangladesh/Vietnam) can collapse revenue. Post-COVID inventory corrections led to 30-40% order reductions from major buyers in 2022-23.',
        mitigation: 'Customer diversification (maximum 30% from single buyer), domestic market development, value-added services (design, sourcing), multi-country operations for buyer comfort, product diversification beyond basic garments',
        exposure: '₹200-1,000 Cr revenue loss per large exporter from single-buyer dependency'
      }
    ],
    bestPractices: [
      {
        id: 'gar-bp-1',
        title: 'Garment Factory Fire & Life Safety',
        standard: 'National Building Code (NBC) + NFPA 101 (Life Safety) + RSC/Accord Standard + IFC PS2',
        description: 'Fire and life safety for garment factories — where worker safety is the paramount concern beyond property protection.',
        recommendations: [
          'Emergency exits: minimum 2 per floor, always unlocked during occupation, illuminated signage',
          'ZERO storage in stairwells, corridors, or within 3m of any exit door',
          'Fire detection and alarm: minimum automatic smoke detection + manual call points every floor',
          'Sprinkler protection for all multi-story factories (>2 floors) or >1,000 m²',
          'Emergency lighting: battery-backed on all exit routes, minimum 1 lux at floor level',
          'Monthly fire drill with timed evacuation — target <3 minutes for full building clearance',
          'Electrical safety: annual thermography + no unauthorized extensions + proper earthing',
          'Structural assessment: load verification for all buildings not originally designed as factory'
        ],
        benchmark: 'RSC (Bangladesh) program results: 2,300 factories assessed, 97% life-safety issues corrected, worker fire fatalities reduced from 100+/year to <10/year in 10 years. India needs an equivalent industry-wide program.'
      }
    ]
  }
]
