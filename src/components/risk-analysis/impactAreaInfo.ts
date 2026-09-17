// Impact Area Knowledge Base — detailed information for impact area tags across all industries.
// When a user clicks any impact area tag on a risk card, this provides "what it is, why it matters,
// consequences, and prevention" so every tag is informative (not just the ones matching riskKnowledge).

export interface ImpactAreaDetail {
  title: string
  whatItIs: string
  whyItMatters: string
  consequences: string[]
  prevention: string[]
  insuranceAngle: string
}

// Curated detailed entries keyed by normalized impact-area phrase (lowercase, key words).
// The lookup does substring/keyword matching so variants ("Blast Furnace Collapse", "BF Breakout") all resolve.
const IMPACT_AREA_LIBRARY: { keywords: string[]; detail: ImpactAreaDetail }[] = [
  // ===================== STEEL / METAL =====================
  {
    keywords: ['blast furnace collapse', 'blast furnace breakout', 'bf breakout', 'bf collapse', 'bf hearth'],
    detail: {
      title: 'Blast Furnace Collapse / Breakout',
      whatItIs: 'A blast furnace (BF) is a 40-60m tall vessel that produces molten iron at ~1,500°C. A "collapse" or "breakout" occurs when the internal refractory lining erodes below a safe thickness and molten iron breaches the steel shell, or the burden (raw material charge) inside the furnace destabilizes and shifts violently.',
      whyItMatters: 'It is the single highest-value catastrophic event in an integrated steel plant. Molten iron escaping at high velocity destroys the casthouse, ignites everything combustible, and can reach cooling water causing steam explosions. Recovery requires a full furnace reline taking 90-120 days.',
      consequences: [
        'Escape of 1,500°C molten iron destroying surrounding equipment and structures',
        'Steam explosion if molten metal contacts cooling water',
        'Worker fatalities and severe burn injuries',
        'Complete production halt for 3-6 months (reline + ramp-up)',
        'Property + business interruption loss of ₹500-1,500 Cr'
      ],
      prevention: [
        'Continuous thermal monitoring with 2,000+ embedded thermocouples',
        'AI-based refractory wear prediction giving 30-day advance warning',
        'Titanium-bearing material injection to protect the hearth',
        'Stave cooling water flow monitoring for early leak detection',
        'Hard-stop campaign management (no operation beyond safe lining life)'
      ],
      insuranceAngle: 'This is typically the worst-case scenario (Maximum Foreseeable Loss driver) for an integrated steel plant. Insurers assess thermal monitoring systems, refractory campaign discipline, and business interruption indemnity period (minimum 18 months) when underwriting.'
    }
  },
  {
    keywords: ['hot metal spillage', 'molten metal spillage', 'molten metal ejection', 'molten steel spillage', 'molten iron', 'molten zinc', 'molten aluminum ejection'],
    detail: {
      title: 'Molten Metal Spillage',
      whatItIs: 'The uncontrolled release of molten metal (steel, iron, zinc, or aluminium) from furnaces, ladles, converters, or transfer equipment. Metal at 660°C (aluminium) to 1,650°C (steel) escapes its containment and flows across the working area.',
      whyItMatters: 'Molten metal handling is the single highest-fatality risk area in metal industries globally. A spillage instantly kills anyone in its path, ignites secondary fires, and can trigger steam explosions if it contacts any moisture or water.',
      consequences: [
        'Immediate worker fatalities from contact/radiant heat',
        'Secondary fires from ignited combustibles',
        'Steam explosion if metal contacts water or wet surfaces',
        'Destruction of casthouse/bay floor and equipment',
        'Extended production stoppage for cleanup and repair'
      ],
      prevention: [
        'Ladle/vessel refractory life tracking with hard cutoffs',
        'Moisture-free certification of all materials contacting molten metal',
        'Physical exclusion zones (3m minimum) around metal flow paths',
        'Emergency dump/divert systems for all vessels',
        'Automated/remote handling to remove workers from danger zones'
      ],
      insuranceAngle: 'Drives both property damage and significant Workers Compensation / Employers Liability exposure. Insurers verify molten-metal safety engineering, exclusion zones, and PPE standards (aluminized proximity suits).'
    }
  },
  {
    keywords: ['gas holder rupture', 'gas holder explosion', 'gas explosion', 'bfg', 'cog', 'ldg', 'coke oven gas', 'gas leak', 'gas network', 'gas pipeline'],
    detail: {
      title: 'Gas Holder / Gas Network Explosion',
      whatItIs: 'Steel and chemical plants operate extensive networks of flammable/toxic process gases — Blast Furnace Gas (CO-rich), Coke Oven Gas (H2-rich), and mixed gas — stored in large gas holders and transported through kilometers of pipelines. A rupture releases explosive/toxic gas that can detonate on ignition.',
      whyItMatters: 'Process gas explosions are multi-fatality events. Coke Oven Gas (55-60% hydrogen) has an extremely wide explosive range and low ignition energy. A gas holder or pipeline explosion has the force of several tonnes of TNT and can trigger a regulatory plant shutdown.',
      consequences: [
        'Multi-fatality explosion event',
        'CO poisoning of workers (colourless, odourless gas)',
        'Downstream plant shutdown from fuel supply loss',
        'Structural damage across a wide radius',
        'Regulatory closure and criminal investigation'
      ],
      prevention: [
        'Fixed CO/H2 gas detectors every 20m with central monitoring',
        'Water seal level monitoring on gas holders with auto top-up',
        'Automated gas isolation valves at inter-plant supply points',
        'Personal CO monitors mandatory for all workers in gas zones',
        'Annual pipeline thickness survey using ultrasonic testing'
      ],
      insuranceAngle: 'A key life-safety and business interruption risk. Insurers require gas detection coverage, isolation systems, and pipeline integrity management as risk-improvement conditions.'
    }
  },
  {
    keywords: ['crane rail misalignment', 'crane derailment', 'crane toppling', 'crane', 'ladle drop', 'hoist'],
    detail: {
      title: 'Crane Failure / Rail Misalignment',
      whatItIs: 'Heavy industrial plants operate hundreds of overhead cranes, including ladle cranes carrying 300+ tonnes of molten metal at height. Rail misalignment, structural fatigue, brake failure, or wire-rope failure can cause derailment, collision, or a catastrophic load drop.',
      whyItMatters: 'A ladle crane dropping molten metal is unsurvivable for anyone below and destroys the bay floor. Crane operations are among the top causes of serious industrial accidents. Rail misalignment (even a few mm) accelerates wear and increases derailment risk.',
      consequences: [
        'Catastrophic load drop (molten metal or heavy equipment)',
        'Worker fatalities in the crane operating zone',
        'Bay floor and equipment destruction',
        'Crane-to-crane collision damage',
        'Production stoppage during crane repair'
      ],
      prevention: [
        'Regular NDT of wire ropes, hooks, and structural members',
        'Rail alignment surveys and correction program',
        'SIL-rated brake systems with redundancy on critical cranes',
        'Dual-rope or catch systems on ladle cranes',
        'RFID-based personnel exclusion in crane zones'
      ],
      insuranceAngle: 'Machinery Breakdown and liability exposure. Insurers assess crane inspection regimes, NDT frequency, and safe-load-indicator functionality.'
    }
  },
  {
    keywords: ['pipeline fracture', 'underground pipeline', 'pipeline rupture', 'duct rupture'],
    detail: {
      title: 'Pipeline / Duct Fracture',
      whatItIs: 'Underground and overground pipelines carry gases, liquids, cooling water, and process fluids across a plant. Corrosion, ground movement, thermal fatigue, or mechanical damage can cause a fracture releasing the contents — which may be flammable, toxic, hot, or corrosive.',
      whyItMatters: 'Pipeline fractures are difficult to detect (especially underground), can release hazardous material for extended periods before discovery, and disrupt the utilities/services that keep the plant running. Gas or hydrocarbon pipeline fractures create fire/explosion risk.',
      consequences: [
        'Release of flammable/toxic/hot fluids',
        'Fire or explosion (for gas/hydrocarbon lines)',
        'Cooling/utility loss affecting production',
        'Environmental contamination',
        'Extended detection and repair time (underground)'
      ],
      prevention: [
        'Pipeline integrity management with periodic thickness survey',
        'Corrosion protection (coatings, cathodic protection)',
        'Leak detection systems on critical lines',
        'Ground movement / settlement monitoring',
        'Redundancy for utility-critical pipelines'
      ],
      insuranceAngle: 'Contributes to both machinery breakdown and business interruption exposure. Insurers value pipeline integrity management and leak detection systems.'
    }
  },
  {
    keywords: ['refractory collapse', 'refractory failure', 'shell deformation', 'hot spot', 'burn-through', 'lining'],
    detail: {
      title: 'Refractory Failure',
      whatItIs: 'Refractories are heat-resistant ceramic linings (alumina, magnesia, carbon) that protect steel vessels from molten metal at 1,500-1,700°C. Failure occurs from chemical erosion, thermal spalling, or mechanical damage, exposing the steel shell to extreme heat.',
      whyItMatters: 'Refractory failure is the root cause of most molten metal incidents — ladle breakouts, furnace shell hot spots, and vessel failures all trace back to lining degradation. It forces emergency shutdown and expensive relining.',
      consequences: [
        'Shell hot spot / burn-through / deformation',
        'Molten metal breakout risk',
        'Emergency shutdown for relining (weeks to months)',
        'Product contamination if refractory falls into melt',
        'High relining cost (₹50 Cr to ₹1,500 Cr by vessel)'
      ],
      prevention: [
        'Laser-based lining thickness measurement each campaign',
        'Thermal imaging of vessel shells for hotspot detection',
        'Slag chemistry control to minimize refractory attack',
        'Hard-stop campaign limits with no extensions',
        'Quality-assured refractory procurement'
      ],
      insuranceAngle: 'A frequent cause of unplanned shutdown and BI claims. Insurers assess campaign management systems and remaining-life tracking discipline.'
    }
  },

  // ===================== FIRE / EXPLOSION (GENERIC) =====================
  {
    keywords: ['dust explosion', 'carbon black dust', 'sugar dust', 'flour dust', 'grain dust', 'coal dust', 'dust cloud', 'silo explosion', 'bucket elevator'],
    detail: {
      title: 'Combustible Dust Explosion',
      whatItIs: 'Fine combustible dust (sugar, flour, coal, carbon black, metal, pharmaceutical powder) suspended in air within a confined space can ignite explosively. A primary explosion dislodges settled dust, creating devastating secondary explosions that propagate through connected equipment.',
      whyItMatters: 'Dust explosions are among the most underestimated industrial risks. The Imperial Sugar explosion (14 killed) and countless grain/coal incidents show how "harmless" dust becomes lethal. Awareness in Indian industry is critically low, and most facilities lack explosion protection.',
      consequences: [
        'Primary + devastating secondary explosions',
        'Worker fatalities and building collapse',
        'Equipment destruction (mills, dryers, elevators, silos)',
        'Multi-area fire propagation',
        'Regulatory shutdown and investigation'
      ],
      prevention: [
        'Dust Hazard Analysis (DHA) per NFPA 652',
        'Explosion venting/suppression on enclosed equipment',
        'Rigorous housekeeping (no dust accumulation >1mm)',
        'Grounding/bonding to eliminate static ignition',
        'Vacuum cleaning only — never compressed air blow-down'
      ],
      insuranceAngle: 'A high-severity, often-overlooked exposure. Insurers should require a Dust Hazard Analysis and explosion protection for any facility handling combustible powders.'
    }
  },
  {
    keywords: ['fire', 'flash fire', 'pool fire', 'oil fire', 'solvent fire', 'oil mist', 'cable gallery', 'warehouse fire', 'stock fire'],
    detail: {
      title: 'Fire',
      whatItIs: 'Uncontrolled combustion of fuel (hydrocarbon, solvent, oil, combustible material, or stored product) triggered by an ignition source (electrical fault, hot surface, friction, static, or hot work). Fire is the most frequent large-loss cause across almost every industry.',
      whyItMatters: 'Fire can escalate from a small ignition to total facility loss within minutes, especially where high fuel loads (oil, solvents, packaging, stored product) exist. Business interruption from a fire often exceeds physical damage by several times.',
      consequences: [
        'Rapid escalation to total facility/stock loss',
        'Worker/occupant casualties',
        'Toxic smoke generation',
        'Extended business interruption',
        'Environmental impact from firefighting runoff'
      ],
      prevention: [
        'Appropriate detection (smoke/heat/flame/VESDA) for the hazard',
        'Suppression system matched to fuel type (foam, water mist, gas, dry chemical)',
        'Housekeeping and hot-work permit control',
        'Electrical maintenance and thermographic surveys',
        'Fire compartmentation to limit spread'
      ],
      insuranceAngle: 'The dominant peril in most property/BI policies. Insurers scrutinize detection, suppression, compartmentation, and housekeeping quality.'
    }
  },
  {
    keywords: ['vapor cloud explosion', 'vce', 'vapor cloud', 'boilover', 'bleve', 'aerosol', 'lpg'],
    detail: {
      title: 'Vapor Cloud / BLEVE Explosion',
      whatItIs: 'When a large quantity of flammable vapor or pressurized gas is released and ignites, it can create a Vapor Cloud Explosion (VCE) or a Boiling Liquid Expanding Vapor Explosion (BLEVE). These generate massive overpressure capable of destroying entire process units.',
      whyItMatters: 'These are the most catastrophic events in petrochemical, chemical, and gas-handling operations. A single VCE can devastate assets within a 1km radius and cause mass casualties, as seen at Buncefield, Texas City, and Beirut.',
      consequences: [
        'Massive overpressure blast damage (up to 1km)',
        'Mass casualties (workers + community)',
        'Multi-unit destruction and cascading failures',
        'Community evacuation',
        'Extended (12-24 month) reconstruction'
      ],
      prevention: [
        'Leak detection and gas dispersion modeling',
        'Ignition source control in hazardous zones',
        'Emergency isolation valves for large inventories',
        'Inventory minimization (just-in-time vs bulk)',
        'Facility siting studies for blast protection'
      ],
      insuranceAngle: 'The Maximum Foreseeable Loss driver for hazardous process facilities. Insurers require Process Safety Management (HAZOP, SIS) compliance.'
    }
  },
  {
    keywords: ['toxic gas', 'ammonia', 'chlorine', 'h2s', 'toxic fume', 'toxic cloud', 'hf', 'so2', 'phosgene', 'styrene'],
    detail: {
      title: 'Toxic Gas Release',
      whatItIs: 'The release of acutely toxic gas — ammonia, chlorine, hydrogen sulfide, hydrogen fluoride, sulfur dioxide, or specialty chemicals — from storage, process equipment, or transport. These gases are lethal at low concentrations and form dispersing clouds.',
      whyItMatters: 'Toxic releases create immediate life-threatening zones requiring community evacuation. The Bhopal disaster (15,000+ deaths from MIC) is the defining industrial catastrophe. Even minor releases trigger regulatory action and reputation damage.',
      consequences: [
        'Mass casualties from inhalation exposure',
        'Community evacuation and long-term health effects',
        'Environmental contamination',
        'Criminal liability and permanent reputation damage',
        'Regulatory shutdown'
      ],
      prevention: [
        'SIL-rated toxic gas detection with automatic isolation',
        'Inventory minimization of toxic materials',
        'Emergency scrubbers and water curtains (for soluble gases)',
        'Community alert systems and evacuation planning',
        'Mechanical integrity (RBI) of all toxic-containing equipment'
      ],
      insuranceAngle: 'Creates potentially unlimited public liability. Insurers require rigorous process safety, detection, and emergency response systems.'
    }
  },

  // ===================== MACHINERY / EQUIPMENT =====================
  {
    keywords: ['transformer', 'transformer failure', 'transformer explosion', 'switchgear', 'electrical', 'vfd', 'motor burnout', 'winding'],
    detail: {
      title: 'Electrical Equipment Failure',
      whatItIs: 'Failure of high-value electrical equipment — transformers, switchgear, motors, drives (VFDs), and control systems — from insulation breakdown, overheating, winding faults, or external surges. Oil-filled transformers can explode with burning oil spray.',
      whyItMatters: 'Large custom transformers (especially EAF/furnace transformers) have 12-18 month replacement lead times, creating enormous business interruption exposure. A single main transformer or switchgear failure can shut an entire plant.',
      consequences: [
        'Oil-filled transformer fire/explosion',
        'Complete plant power loss',
        'Extended downtime (12-18 months for custom units)',
        'Adjacent equipment damage',
        'Cascading multi-system failure from surges'
      ],
      prevention: [
        'Online Dissolved Gas Analysis (DGA) for transformers',
        'Thermographic surveys of connections and busbars',
        'Surge protection devices on sensitive equipment',
        'Spare transformer strategy for critical units',
        'Lightning protection system maintenance'
      ],
      insuranceAngle: 'A leading Machinery Breakdown and BI exposure. Insurers value online monitoring (DGA), spare strategy, and adequate indemnity period.'
    }
  },
  {
    keywords: ['machinery breakdown', 'gearbox', 'bearing', 'shaft', 'spindle', 'girth gear', 'roller', 'drive', 'turbine', 'generator', 'compressor', 'press', 'mill', 'boiler'],
    detail: {
      title: 'Machinery Breakdown',
      whatItIs: 'The sudden mechanical or electrical failure of critical production machinery — gearboxes, bearings, shafts, turbines, generators, presses, mills, or boilers. Failure modes include fatigue cracking, seizure, tooth breakage, and winding faults.',
      whyItMatters: 'Critical machinery often has no redundancy and long replacement lead times (6-18 months for specialized components). A single breakdown of a bottleneck machine can halt the entire production line, making business interruption the dominant loss.',
      consequences: [
        'Complete production line stoppage',
        'Extended downtime awaiting replacement parts',
        'Cascading damage to connected equipment',
        'High repair/replacement cost',
        'Business interruption exceeding physical damage'
      ],
      prevention: [
        'Condition monitoring (vibration, oil analysis, thermography)',
        'Predictive maintenance with trending analysis',
        'Critical spares inventory for long-lead items',
        'Regular NDT of high-stress components',
        'Manufacturer maintenance contracts'
      ],
      insuranceAngle: 'The core of Machinery Breakdown (MB) and Machinery Loss of Profit (MLOP) coverage. Insurers assess condition monitoring maturity and spares strategy.'
    }
  },
  {
    keywords: ['boiler explosion', 'boiler tube', 'furnace explosion', 'pressure vessel', 'steam explosion', 'water hammer', 'smelt'],
    detail: {
      title: 'Boiler / Pressure Vessel Explosion',
      whatItIs: 'The catastrophic failure of a boiler or pressure vessel operating at high temperature and pressure. Causes include tube failures, furnace explosions (fuel-air imbalance), overpressure, water-side/fire-side corrosion, and — in recovery boilers — smelt-water explosions.',
      whyItMatters: 'Boiler explosions cause mass casualties (NTPC Unchahar: 45 killed) and extended unit outages. Recovery boiler smelt-water explosions in pulp mills are among the most violent industrial events. Pressure equipment failure is strictly regulated under IBR.',
      consequences: [
        'Explosion with mass worker casualties',
        'Pressure part rupture and structural damage',
        'Extended unit outage (6-24 months)',
        'Steam/hot gas release causing burns',
        'Regulatory investigation and prosecution'
      ],
      prevention: [
        'Furnace Safeguard Supervisory System (FSSS)',
        'Tube thickness monitoring (UT) and water chemistry control',
        'Safety valve calibration and testing',
        'IBR compliance and periodic inspection',
        'Emergency drain systems (recovery boilers)'
      ],
      insuranceAngle: 'High-severity MB + liability exposure. Insurers require IBR compliance, FSSS functionality, and inspection records.'
    }
  },

  // ===================== NATURAL / AOG =====================
  {
    keywords: ['earthquake', 'seismic', 'foundation settlement', 'structural collapse', 'misalignment'],
    detail: {
      title: 'Earthquake / Seismic Damage',
      whatItIs: 'Ground motion from seismic activity that damages structures, foundations, equipment, and infrastructure. Effects range from precision-equipment misalignment to catastrophic structural collapse, depending on intensity and construction quality.',
      whyItMatters: 'India has large areas in seismic Zones IV-V. Industrial assets — tall structures, precision-aligned machinery, and stored hazardous materials — are vulnerable. A major earthquake can cause simultaneous multi-asset loss and hazardous releases.',
      consequences: [
        'Structural collapse (buildings, towers, bridges)',
        'Precision equipment misalignment',
        'Hazardous material release from ruptured containment',
        'Foundation settlement and differential movement',
        'Extended reconstruction and recovery'
      ],
      prevention: [
        'Seismic-resistant design per relevant zone',
        'Base isolation for critical equipment',
        'Emergency shutdown systems triggered by seismic sensors',
        'Structural retrofit of older/legacy assets',
        'Anchoring of equipment, racks, and vessels'
      ],
      insuranceAngle: 'A key Act-of-God (natural catastrophe) peril. Insurers assess seismic zone, construction standard, and accumulation of value at single locations.'
    }
  },
  {
    keywords: ['flood', 'inundation', 'submersion', 'waterlogg', 'monsoon', 'washout', 'scour'],
    detail: {
      title: 'Flood / Inundation',
      whatItIs: 'The submersion of facilities, equipment, and stock by floodwater from monsoon rainfall, river overflow, storm surge, or drainage failure. Water contact destroys electrical systems, contaminates stock, and can trigger secondary chemical/environmental hazards.',
      whyItMatters: 'Climate change is intensifying flood frequency and severity, often exceeding historical design assumptions. Floods cause simultaneous damage to equipment, inventory, and infrastructure, plus extended cleanup and requalification time.',
      consequences: [
        'Electrical/electronic equipment destruction',
        'Stock/inventory total loss (contamination)',
        'Foundation and structure damage',
        'Environmental contamination from mixed chemicals',
        'Extended cleanup and requalification'
      ],
      prevention: [
        'Elevated installation of critical equipment/substations',
        'Flood barriers and improved drainage',
        'Flood early-warning systems',
        'Design to 1-in-100/500-year flood levels',
        'Business continuity and stock relocation plans'
      ],
      insuranceAngle: 'A major Act-of-God peril with rising frequency. Insurers assess flood-zone location, mitigation measures, and Stock/BI adequacy.'
    }
  },
  {
    keywords: ['cyclone', 'storm', 'wind', 'roof', 'cladding', 'hail', 'chimney', 'stack'],
    detail: {
      title: 'Cyclone / Storm Damage',
      whatItIs: 'High-wind events (cyclones, storms) that damage buildings, roofing, tall structures (chimneys, stacks, towers), and open-stored materials. Wind can lift roof sheets, topple structures, and hurl debris causing secondary damage.',
      whyItMatters: 'Coastal industrial regions (Gujarat, Tamil Nadu, Andhra Pradesh, Odisha) face annual cyclone risk. Wind damage exposes precision equipment to rain and can scatter stored materials creating secondary fire/blockage hazards.',
      consequences: [
        'Roof uplift exposing equipment to rain',
        'Tall structure (chimney/stack) failure',
        'Open stock scattering and damage',
        'Power grid disruption',
        'Building cladding and facade damage'
      ],
      prevention: [
        'Wind-rated cladding and roofing design',
        'Tie-down protocols for equipment and cranes',
        'Structural assessment of tall stacks/towers',
        'Secure/cover open-stored materials before storms',
        'Weather monitoring and preparedness protocols'
      ],
      insuranceAngle: 'A significant Act-of-God peril for coastal locations. Insurers assess wind-design standards and pre-storm preparedness.'
    }
  },
  {
    keywords: ['lightning', 'surge', 'scada', 'plc', 'dcs', 'instrument'],
    detail: {
      title: 'Lightning / Electrical Surge Damage',
      whatItIs: 'Direct lightning strikes or induced electrical surges that damage transformers, control systems (PLC/DCS/SCADA), drives, and instrumentation. Tall structures and facilities with extensive electronics are especially vulnerable.',
      whyItMatters: 'A single lightning event can damage multiple systems simultaneously through power and data cables, causing widespread control-system failure. Facilities in elevated or exposed locations face high lightning density.',
      consequences: [
        'Transformer/switchgear damage',
        'Control system (PLC/DCS/SCADA) failure',
        'Simultaneous multi-system trips',
        'Fire initiation from electrical faults',
        'Production stoppage from control loss'
      ],
      prevention: [
        'Lightning protection system (tested annually)',
        'Surge protection devices on all sensitive circuits',
        'Proper earthing (resistance within limits)',
        'Advance lightning warning systems',
        'Redundant control systems'
      ],
      insuranceAngle: 'A common cause of electronics/electrical claims. Insurers value LPS testing records and surge protection coverage.'
    }
  },
  {
    keywords: ['landslide', 'slope failure', 'slope', 'quarry', 'overburden'],
    detail: {
      title: 'Landslide / Slope Failure',
      whatItIs: 'The collapse of natural or man-made slopes (mine benches, overburden dumps, hillside terrain) triggered by monsoon saturation, seismic activity, or excavation. Common in mining, quarrying, and hilly-terrain infrastructure.',
      whyItMatters: 'Slope failures bury equipment and personnel, block access roads, and can dam streams creating secondary flood risk. Mining-area slope failures have caused major casualties.',
      consequences: [
        'Equipment burial and personnel fatalities',
        'Access road blockage',
        'Stream damming and secondary flooding',
        'Extended recovery and stabilization',
        'Regulatory mine/operation closure'
      ],
      prevention: [
        'Geotechnical stability analysis and monitoring',
        'Slope inclinometer/displacement monitoring',
        'Controlled bench height and dumping',
        'Drainage management to prevent saturation',
        'Monsoon-season operational protocols'
      ],
      insuranceAngle: 'Relevant for mining, quarrying, and hill-terrain infrastructure. Insurers assess geotechnical monitoring and slope management.'
    }
  },

  // ===================== BUSINESS / OPERATIONAL =====================
  {
    keywords: ['business interruption', 'production loss', 'production halt', 'revenue loss', 'downtime', 'supply disruption', 'shutdown', 'lost crushing', 'capacity loss'],
    detail: {
      title: 'Business Interruption',
      whatItIs: 'The loss of revenue and continuing fixed costs during a forced shutdown following an insured event. In capital-intensive industries, BI often exceeds physical damage by 2-5x due to long equipment lead times and sequential process dependencies.',
      whyItMatters: 'Business interruption is frequently the dominant loss component. High fixed costs continue during shutdown, customer penalties accrue, and market share can be permanently lost. Seasonal industries (like sugar) suffer irrecoverable losses.',
      consequences: [
        'Revenue loss during shutdown period',
        'Continuing fixed costs (staff, lease, maintenance)',
        'Customer contract penalties and order loss',
        'Permanent market share erosion',
        'Cash flow crisis for the business'
      ],
      prevention: [
        'Critical spares inventory (long-lead items)',
        'Redundancy for single-point-of-failure equipment',
        'Tolling/contingency production agreements',
        'Diversified customer base for order rerouting',
        'Adequate BI insurance with realistic indemnity period'
      ],
      insuranceAngle: 'The core of BI / MLOP / ALOP coverage. Insurers must carefully assess indemnity period adequacy against actual recovery timelines — the #1 cause of underinsurance.'
    }
  },
  {
    keywords: ['product recall', 'contamination', 'product contamination', 'quality', 'recall', 'food poisoning', 'field failure'],
    detail: {
      title: 'Product Recall / Contamination',
      whatItIs: 'The withdrawal of a product from the market due to a safety defect, contamination, or quality failure. Contamination may be physical, chemical, or biological; defects may cause injury or non-performance in the field.',
      whyItMatters: 'A single recall can affect millions of units, destroy brand equity built over decades, and trigger regulatory bans. Nestlé Maggi (₹450+ Cr) and Samsung Note 7 ($5.3B) show the scale. Brand damage is often permanent and uninsurable.',
      consequences: [
        'Mass product withdrawal and destruction',
        'Regulatory ban or license suspension',
        'Consumer litigation and injury claims',
        'Brand/reputation destruction',
        'Retailer delisting and market share loss'
      ],
      prevention: [
        'HACCP / quality management systems',
        'Incoming material testing and traceability',
        'Metal detection and foreign-body screening',
        'Batch traceability (ingredient to shelf)',
        'Rapid recall execution capability'
      ],
      insuranceAngle: 'Product Recall and Product Liability insurance are essential but underpenetrated. Insurers verify HACCP, traceability, and quality systems.'
    }
  },
  {
    keywords: ['cyber', 'ransomware', 'data breach', 'system failure', 'data loss', 'ddos', 'hacking', 'esd'],
    detail: {
      title: 'Cyber / Data Security Event',
      whatItIs: 'A cyber attack (ransomware, data breach, DDoS) or system failure that compromises data, halts operations, or exposes customer information. Increasingly, cyber events cross into physical damage (OT/ICS attacks) and product quality (ESD, control manipulation).',
      whyItMatters: 'Cyber is the fastest-growing risk across all industries. Ransomware can halt entire operations; data breaches trigger regulatory penalties (DPDP Act: up to ₹250 Cr). The convergence of IT and operational technology expands the attack surface.',
      consequences: [
        'Operations halt from system lockout',
        'Customer data exposure and regulatory penalty',
        'Ransom demand and recovery cost',
        'Reputation and customer trust damage',
        'Physical equipment damage (OT attacks)'
      ],
      prevention: [
        'Zero-trust architecture and network segmentation',
        'Endpoint detection (EDR) with 24/7 monitoring',
        'Immutable offline backups (ransomware recovery)',
        'Rapid patching of critical vulnerabilities',
        'Multi-factor authentication and access control'
      ],
      insuranceAngle: 'Cyber insurance with adequate limits and clear exclusions is now essential. Insurers assess security maturity, backup strategy, and incident response capability.'
    }
  },
  {
    keywords: ['regulatory', 'license', 'compliance', 'penalty', 'shutdown order', 'ngt', 'spcb', 'cpcb', 'fda', 'closure'],
    detail: {
      title: 'Regulatory Action / Compliance Failure',
      whatItIs: 'Enforcement action by regulators (RBI, SEBI, FDA, CPCB, NGT, PESO, DGCA) for non-compliance — resulting in penalties, business restrictions, license suspension, or forced closure. Includes environmental, safety, financial, and quality regulations.',
      whyItMatters: 'Regulatory action can be existential — a single FDA Warning Letter can exclude a pharma plant from the US market for years; an NGT order can shut an entire industrial cluster. Regulatory revenue loss is generally uninsurable.',
      consequences: [
        'Financial penalties',
        'Business restriction or license suspension',
        'Complete operational shutdown',
        'Market exclusion (12-24 months or more)',
        'Management personal/criminal liability'
      ],
      prevention: [
        'Proactive compliance culture (not just documentation)',
        'Regulatory change monitoring and impact assessment',
        'Regular self-audits and mock inspections',
        'Board-level compliance oversight',
        'Prompt corrective action (CAPA) on findings'
      ],
      insuranceAngle: 'Largely uninsurable revenue risk; D&O insurance covers management liability. Insurers assess compliance history and regulatory relationship quality.'
    }
  },
  {
    keywords: ['worker fatalities', 'worker fatality', 'fatalities', 'casualties', 'injury', 'burns', 'evacuation', 'entrapment', 'asphyxiation'],
    detail: {
      title: 'Worker / Public Casualties',
      whatItIs: 'Death or serious injury to workers or members of the public resulting from an industrial incident — fire, explosion, toxic release, structural collapse, or equipment accident. The human cost is the most serious consequence of any industrial risk.',
      whyItMatters: 'Beyond the human tragedy, casualties trigger criminal prosecution of management, regulatory shutdown, mandatory compensation, and permanent reputation damage. Multi-fatality events reshape entire industries (Bhopal, Rana Plaza).',
      consequences: [
        'Loss of life and life-altering injuries',
        'Criminal prosecution of management (IPC 304)',
        'Regulatory shutdown and investigation',
        'Workers Compensation and liability claims',
        'Permanent reputation damage'
      ],
      prevention: [
        'Robust safety management systems (ISO 45001)',
        'Exclusion zones and physical barriers',
        'Appropriate PPE and training',
        'Emergency response and evacuation planning',
        'Non-punitive incident reporting culture'
      ],
      insuranceAngle: 'Drives Workers Compensation, Employers Liability, and Public Liability exposure. Insurers assess safety culture, incident history, and safety management systems.'
    }
  },
  {
    keywords: ['environmental', 'contamination', 'spill', 'discharge', 'groundwater', 'effluent', 'pollution', 'emission'],
    detail: {
      title: 'Environmental Contamination',
      whatItIs: 'The release of pollutants — chemicals, effluent, emissions, hazardous waste — into air, water, or soil beyond permitted limits. May result from spills, treatment failures, or firefighting runoff.',
      whyItMatters: 'Environmental incidents trigger immediate regulatory action (NGT/CPCB/SPCB), clean-up liability, community opposition, and permanent reputation damage. Groundwater contamination and cross-boundary pollution create long-tail liability.',
      consequences: [
        'Regulatory penalty and closure order',
        'Environmental remediation cost',
        'Community health impact and litigation',
        'Loss of operating license/clearance',
        'ESG rating and reputation damage'
      ],
      prevention: [
        'Effluent treatment (ETP/ZLD) with adequate capacity',
        'Emission monitoring (CEMS) and control systems',
        'Secondary containment for chemicals',
        'Spill prevention and response plans',
        'Firefighting runoff containment'
      ],
      insuranceAngle: 'Environmental Liability insurance addresses clean-up and third-party claims. Insurers assess treatment systems and compliance record.'
    }
  },
]

// Generic fallback used when no specific entry matches — still gives useful context.
function buildGenericDetail(area: string, riskTitle: string, riskDescription: string): ImpactAreaDetail {
  return {
    title: area,
    whatItIs: `"${area}" is a specific consequence/impact area of the risk event "${riskTitle}". ${riskDescription}`,
    whyItMatters: `This impact area represents one of the significant ways in which "${riskTitle}" causes loss. Understanding each impact area helps quantify the potential severity and design targeted risk-mitigation and insurance coverage.`,
    consequences: [
      'Direct physical damage to the affected asset or area',
      'Contribution to overall business interruption',
      'Potential safety impact on personnel in the vicinity',
      'Repair/replacement cost and recovery time',
    ],
    prevention: [
      'Targeted engineering controls for this specific failure mode',
      'Monitoring and early-warning systems',
      'Preventive maintenance and inspection',
      'Emergency response planning for this scenario',
    ],
    insuranceAngle: `This impact area contributes to the overall claim quantum for "${riskTitle}". Insurers assess the specific controls in place to prevent or limit this consequence.`,
  }
}

/**
 * Returns detailed information for ANY impact area tag.
 * First tries to match a curated library entry (by keyword), otherwise builds
 * a contextual generic detail from the parent risk so every tag is informative.
 */
export function getImpactAreaDetail(area: string, riskTitle: string, riskDescription: string): ImpactAreaDetail {
  const normalized = area.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
  for (const entry of IMPACT_AREA_LIBRARY) {
    for (const kw of entry.keywords) {
      if (normalized.includes(kw) || kw.includes(normalized.split('(')[0].trim())) {
        return entry.detail
      }
    }
  }
  // Try looser single-keyword match
  for (const entry of IMPACT_AREA_LIBRARY) {
    for (const kw of entry.keywords) {
      const kwWords = kw.split(' ')
      if (kwWords.some((w) => w.length > 4 && normalized.includes(w))) {
        return entry.detail
      }
    }
  }
  return buildGenericDetail(area, riskTitle, riskDescription)
}
