// Fertilizer Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const FERTILIZER_RISK_SOURCES: RiskSource[] = [
  {
    id: 'ammonia-urea',
    label: 'Ammonia & Urea',
    icon: '🏭',
    color: '#15803d',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    bannerTitle: 'Ammonia & Urea Plants',
    bannerSubtitle: 'Natural gas reforming, ammonia synthesis, urea production — high-pressure, high-temperature processes with toxic gas and explosion risks.',
    aogPerils: [
      {
        id: 'au-aog-1',
        title: 'Earthquake — Ammonia Plant & Storage Damage',
        severity: 'critical',
        description: 'Ammonia plants operate high-pressure synthesis loops (150-350 bar) and store liquid ammonia (refrigerated at -33°C or pressurized). Seismic forces rupture high-pressure piping, crack ammonia storage tank shells, and damage the reformer/synthesis converter. A major ammonia release from seismic damage creates a lethal toxic cloud. Indian fertilizer plants (IFFCO, KRIBHCO, RCF) span multiple seismic zones.',
        impactAreas: ['Ammonia Storage Tank Rupture', 'High-Pressure Loop Piping Failure', 'Reformer/Converter Damage', 'Toxic Ammonia Release', 'Complete Plant Shutdown'],
        typicalClaim: '₹200–2,000 Cr + toxic release liability'
      },
      {
        id: 'au-aog-2',
        title: 'Flood / Cyclone — Coastal Plant Inundation',
        severity: 'high',
        description: 'Coastal fertilizer plants (Paradip, Kakinada, Mangalore, Tuticorin) import ammonia/LNG and face cyclone/flood risk. Flooding of process areas, ammonia storage, and utilities creates toxic release + operational shutdown. Cyclone damage to jetties disrupts feedstock/product logistics. The 1999 Odisha super cyclone damaged Paradip fertilizer facilities.',
        impactAreas: ['Ammonia Storage Flooding', 'Jetty/Terminal Damage', 'Process Area Inundation', 'Toxic Release Risk', 'Feedstock Supply Disruption'],
        typicalClaim: '₹100–1,000 Cr + 2-6 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'au-naog-1',
        title: 'Ammonia Release — Toxic Gas Cloud',
        severity: 'critical',
        description: 'Ammonia (NH3) is toxic (IDLH 300 ppm, lethal at higher concentrations) and stored/handled in large quantities (5,000-50,000 tonnes). Release from storage tank failure, pipe rupture, valve failure, or transfer accident creates a lethal toxic cloud. Ammonia is lighter than air but forms dense cold cloud when released as refrigerated liquid. The 2014 Jaipur ammonia leak and multiple global fertilizer ammonia releases demonstrate mass casualty potential.',
        impactAreas: ['Toxic Cloud (lethal zone)', 'Worker/Community Casualties', 'Mass Evacuation', 'Environmental Impact', 'Regulatory Shutdown'],
        typicalClaim: '₹100–2,000 Cr + mass casualty liability'
      },
      {
        id: 'au-naog-2',
        title: 'Ammonia Synthesis Loop Explosion',
        severity: 'critical',
        description: 'Ammonia synthesis operates at 150-350 bar with hydrogen + nitrogen at 400-500°C over iron catalyst. Hydrogen at high pressure poses explosion risk. Synthesis converter failure, high-pressure vessel rupture, or hydrogen leak + ignition causes catastrophic explosion. The synthesis loop is the heart of ammonia production — its failure shuts the entire plant (and downstream urea).',
        impactAreas: ['High-Pressure Vessel Rupture', 'Hydrogen Explosion', 'Synthesis Loop Destruction', 'Complete Plant Shutdown', 'Extended Rebuild (12-18 months)'],
        typicalClaim: '₹300–1,500 Cr + 12-18 months BI'
      },
      {
        id: 'au-naog-3',
        title: 'Primary Reformer Fire/Failure',
        severity: 'high',
        description: 'The primary reformer converts natural gas + steam to hydrogen at 800-900°C using nickel catalyst in hundreds of tubes. Reformer tube failure (creep rupture, overheating) releases hot combustible gas causing fire. Reformer tubes are expensive (₹50-100 Cr for full retubing) with 6-12 month lead time. Reformer is critical path — its failure shuts ammonia production.',
        impactAreas: ['Reformer Tube Rupture/Fire', 'Catalyst Damage', 'Hydrogen/Syngas Fire', 'Extended Retubing Outage', 'Ammonia Production Halt'],
        typicalClaim: '₹100–500 Cr + 6-12 months BI'
      },
      {
        id: 'au-naog-4',
        title: 'Urea Prilling Tower / Granulation Dust Explosion',
        severity: 'medium',
        description: 'Urea prilling towers and granulation plants produce fine urea dust. While urea itself is not highly combustible, urea dust in confined spaces can support dust deflagration. More critically, urea decomposition (if overheated) releases ammonia. Prilling tower fires and granulation equipment incidents cause localized damage and production loss.',
        impactAreas: ['Prilling Tower Incident', 'Granulation Dust Deflagration', 'Ammonia Release (decomposition)', 'Product Quality Loss', 'Production Disruption'],
        typicalClaim: '₹10–50 Cr + 1-2 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Ammonia Toxic Release', prob: 1, impact: 3, score: 3, emv: '₹1,000 Cr', strategy: 'Avoid', strategyUrl: 'https://www.aiche.org/ccps', strategyTooltip: 'Ammonia detection + emergency isolation + water curtain + community alert + minimize inventory', owner: 'VP HSE', trigger: 'ANY ammonia detection above action level' },
      { risk: 'Synthesis Loop Explosion', prob: 1, impact: 3, score: 3, emv: '₹900 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.api.org', strategyTooltip: 'High-pressure vessel integrity (RBI) + hydrogen detection + relief systems + SIS', owner: 'Ammonia Plant Head', trigger: 'Vessel integrity concern or hydrogen detection' },
      { risk: 'Reformer Tube Failure', prob: 2, impact: 3, score: 6, emv: '₹300 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.api.org', strategyTooltip: 'Tube skin temperature monitoring + creep assessment + catalyst management', owner: 'Reformer Engineer', trigger: 'Tube skin temperature exceeding metallurgical limit' },
      { risk: 'Earthquake/Flood', prob: 1, impact: 3, score: 3, emv: '₹700 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Seismic/flood design + emergency shutdown + ammonia isolation + insurance', owner: 'Site Director', trigger: 'Natural disaster warning for plant region' },
    ],
    caseStudy: {
      title: 'IFFCO Aonla / Global Ammonia Plant — Ammonia Release Scenario',
      location: 'Fertilizer complex (representative Indian case)',
      date: 'Multiple incidents (composite analysis)',
      loss: '₹50–500 Cr per major ammonia release event',
      rootCause: 'Ammonia releases in Indian fertilizer plants typically originate from: (1) storage tank/pipe corrosion failure, (2) valve/flange leaks during maintenance, (3) transfer hose failure during ammonia loading, or (4) refrigeration system failure causing pressure rise. The 2014 Jaipur ammonia leak (from a cold storage plant, not fertilizer, but illustrative) hospitalized 100+. Fertilizer plants store 10-100x more ammonia. A major release in populated vicinity could cause mass casualties similar to Bhopal (which involved MIC, a different chemical, but demonstrated toxic cloud lethality).',
      impact: 'Ammonia releases cause: worker exposure (respiratory damage, eye injury, death at high concentration), community evacuation, environmental impact (aquatic toxicity), and regulatory shutdown. Even minor releases trigger PESO/CPCB scrutiny. Major releases create criminal liability and permanent reputation damage. Business interruption from shutdown compounds the loss.',
      lessons: [
        'Ammonia inventory minimization — reduce storage to operational minimum',
        'Continuous ammonia detection with SIL-rated emergency isolation',
        'Water curtain/deluge systems for ammonia release mitigation (ammonia is water-soluble)',
        'Mechanical integrity program (RBI) for all ammonia-containing equipment',
        'Community alert system + emergency evacuation plan with local authorities',
        'Ammonia transfer operations: dedicated procedures, dry-break couplings, spill containment',
        'Refrigeration system reliability (redundancy) — failure causes pressure rise + release'
      ],
      benchmark: 'Yara/Nutrien (global fertilizer leaders): ammonia inventory minimization + continuous detection + water mitigation systems + community integration — achieving industry-leading ammonia safety. IFFCO/KRIBHCO adopting international best practices with detection and emergency systems.'
    },
    emergingRisks: [
      {
        id: 'au-er-1',
        title: 'Green Ammonia / Hydrogen Transition',
        category: 'technology',
        severity: 'high',
        timeline: '2025-2035',
        description: 'India\'s green hydrogen mission drives green ammonia (from electrolytic hydrogen + air separation) as export product and green fertilizer feedstock. Green ammonia plants introduce: large-scale hydrogen handling (explosion risk), electrolyzer hazards, and ammonia as an energy carrier (much larger inventory/transport). Green ammonia export terminals concentrate massive ammonia volumes at ports.',
        implications: ['Large-scale green hydrogen explosion risk', 'Electrolyzer safety (novel technology)', 'Massive ammonia export terminal inventory', 'Ammonia as fuel (new transport/handling risks)', 'Insurance uncertainty for green ammonia projects']
      },
      {
        id: 'au-er-2',
        title: 'Natural Gas Price Volatility & Feedstock Risk',
        category: 'market',
        severity: 'high',
        timeline: '2024-2030',
        description: 'Ammonia/urea production depends on natural gas (feedstock + fuel, 75-80% of cost). Gas price volatility (domestic APM gas allocation changes, LNG import price swings) directly impacts economics. The 2022 global gas crisis (LNG at $50+/MMBtu vs normal $8-12) forced global ammonia plant shutdowns. Indian plants face gas allocation uncertainty and price shocks.',
        implications: ['Gas price spikes making production uneconomic', 'Domestic gas allocation policy changes', 'LNG import price volatility', 'Plant shutdown during extreme gas prices', 'Subsidy dependency for viability']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'au-ni-1',
        title: 'Fertilizer Subsidy Policy & Payment Delays',
        category: 'Regulatory / Financial',
        description: 'Indian fertilizer economics are dominated by government subsidy (₹1.75+ Lakh Cr annually). Urea is heavily price-controlled (farmer pays ~₹5,360/tonne vs cost ₹25,000-40,000/tonne). Subsidy payment delays (6-18 months) create massive working capital stress. Policy changes (Nutrient Based Subsidy revisions, DBT implementation) can transform economics overnight. No insurance covers subsidy policy risk.',
        mitigation: 'Working capital management for subsidy cycle, efficiency to minimize cost above controlled price, product diversification (non-urea, specialty fertilizers), government engagement, financial reserves for delayed payments',
        exposure: '₹2,000-10,000 Cr working capital blocked per large fertilizer company from subsidy delays'
      }
    ],
    bestPractices: [
      {
        id: 'au-bp-1',
        title: 'Ammonia Safety Management',
        standard: 'CCPS + OISD-169 (Ammonia) + IIAR + PESO Ammonia Storage Rules',
        description: 'Preventing catastrophic ammonia release — the defining risk of fertilizer manufacturing.',
        recommendations: [
          'Ammonia inventory minimization — operate with lowest practical storage',
          'Continuous ammonia detection throughout plant with SIL-rated emergency isolation',
          'Water curtain/deluge systems for release mitigation (ammonia is highly water-soluble)',
          'Mechanical integrity: RBI (Risk-Based Inspection) for all ammonia equipment/piping',
          'Refrigeration system redundancy for refrigerated ammonia storage',
          'Ammonia transfer: dry-break couplings, dedicated procedures, spill containment',
          'Community alert system + emergency response plan with local authorities',
          'Emergency scrubber for ammonia vent/relief streams'
        ],
        benchmark: 'Yara International: ammonia inventory minimization + comprehensive detection + water mitigation + community integration — industry-leading ammonia safety across 25+ plants globally with zero major community-impacting releases in 15 years.'
      }
    ]
  },
  {
    id: 'phosphatic-complex',
    label: 'Phosphatic & Complex',
    icon: '⚗️',
    color: '#b45309',
    bannerImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
    bannerTitle: 'Phosphatic & Complex Fertilizers',
    bannerSubtitle: 'DAP, NPK, phosphoric acid, and sulphuric acid — corrosive acids, gypsum management, and fluoride emission risks.',
    aogPerils: [
      {
        id: 'pc-aog-1',
        title: 'Flood — Acid Plant & Gypsum Pond Overflow',
        severity: 'high',
        description: 'Phosphatic fertilizer complexes have sulphuric acid plants, phosphoric acid plants, and phosphogypsum ponds (massive waste storage). Flooding causes: acid tank overflow (environmental disaster), gypsum pond breach (contaminated water release with fluoride/heavy metals), and process area inundation. Coastal complexes (Paradip, Tuticorin, Kandla) face cyclone/flood risk.',
        impactAreas: ['Acid Tank Overflow', 'Gypsum Pond Breach', 'Fluoride/Heavy Metal Release', 'Process Area Flooding', 'Environmental Contamination'],
        typicalClaim: '₹50–500 Cr + environmental liability'
      }
    ],
    nonAogPerils: [
      {
        id: 'pc-naog-1',
        title: 'Sulphuric Acid Plant Incident',
        severity: 'high',
        description: 'Sulphuric acid plants (captive for phosphoric acid) burn sulphur to SO2, convert to SO3, and absorb to make H2SO4 (98%). Risks: SO2/SO3 gas leak (toxic, corrosive), acid spill/burns, converter/absorber failure, and molten sulphur fire. Acid mist and SO2 release affect workers and environment. Acid plant is critical for phosphatic production.',
        impactAreas: ['SO2/SO3 Toxic Gas Release', 'Acid Spill/Burns', 'Molten Sulphur Fire', 'Converter/Absorber Failure', 'Phosphoric Acid Production Halt'],
        typicalClaim: '₹30–200 Cr + 2-4 months BI'
      },
      {
        id: 'pc-naog-2',
        title: 'Phosphoric Acid Plant — Fluoride & Corrosion',
        severity: 'high',
        description: 'Phosphoric acid production (rock phosphate + sulphuric acid) releases fluoride gases (HF, SiF4 — toxic, corrosive) and produces phosphogypsum waste. Fluoride emission control (scrubbers) failure causes toxic release + environmental damage. Highly corrosive process causes equipment failures. Phosphogypsum contains radioactivity (from rock phosphate) creating disposal challenges.',
        impactAreas: ['Fluoride Gas Release (HF/SiF4)', 'Scrubber Failure', 'Corrosion-Induced Equipment Failure', 'Radioactive Gypsum Disposal', 'Environmental/Regulatory Action'],
        typicalClaim: '₹20–150 Cr + environmental liability'
      },
      {
        id: 'pc-naog-3',
        title: 'NPK/DAP Plant Fire — Dust & Ammonia',
        severity: 'medium',
        description: 'DAP/NPK granulation plants handle ammonia (for ammoniation), acids, and produce fertilizer dust. Ammonia release during granulation, dust explosion in handling/bagging, and equipment fires create risk. Some NPK grades with nitrate content (ammonium nitrate-based) pose additional explosion/oxidizer risk (the Beirut 2020 ammonium nitrate explosion killed 218).',
        impactAreas: ['Ammonia Release (granulation)', 'Fertilizer Dust Explosion', 'Ammonium Nitrate Risk (nitrate grades)', 'Bagging Area Fire', 'Storage Fire'],
        typicalClaim: '₹15–100 Cr + 1-3 months BI'
      }
    ],
    riskMatrix: [
      { risk: 'Sulphuric Acid Plant Incident', prob: 2, impact: 2, score: 4, emv: '₹65 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.aiche.org/ccps', strategyTooltip: 'SO2 detection + acid containment + converter monitoring + molten sulphur controls', owner: 'Acid Plant Head', trigger: 'SO2 detection or acid leak or converter anomaly' },
      { risk: 'Fluoride Release (Phos Acid)', prob: 2, impact: 2, score: 4, emv: '₹48 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.cpcb.nic.in', strategyTooltip: 'Fluoride scrubber redundancy + emission monitoring + corrosion management', owner: 'Phos Acid Head', trigger: 'Fluoride emission exceedance or scrubber underperformance' },
      { risk: 'Ammonium Nitrate (NPK)', prob: 1, impact: 3, score: 3, emv: '₹275 Cr', strategy: 'Avoid', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-400', strategyTooltip: 'AN storage segregation + contamination control + fire prevention + inventory limits', owner: 'Safety Head', trigger: 'AN storage temperature/contamination or fire near AN' },
      { risk: 'Gypsum Pond Breach (Flood)', prob: 2, impact: 2, score: 4, emv: '₹50 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.cpcb.nic.in', strategyTooltip: 'Pond integrity monitoring + freeboard management + emergency spillway', owner: 'Environment Head', trigger: 'Pond level high or dyke integrity concern' },
    ],
    caseStudy: {
      title: 'Beirut Port — Ammonium Nitrate Explosion (Reference)',
      location: 'Port of Beirut, Lebanon',
      date: 'August 2020',
      loss: '$15 Billion+ + 218 fatalities',
      rootCause: '2,750 tonnes of ammonium nitrate (a fertilizer/explosive precursor) was stored improperly in a port warehouse for 6 years without safety measures. A fire in an adjacent warehouse (from welding/fireworks storage) spread to the ammonium nitrate. Ammonium nitrate, when heated and confined, detonates. The explosion (equivalent to 1.1 kilotons TNT) devastated the port and half of Beirut. Root cause: improper long-term storage of a dangerous oxidizer without segregation, temperature control, or fire prevention.',
      impact: '218 killed, 7,000 injured, 300,000 displaced. Half of Beirut damaged. $15 billion in losses. Port (Lebanon\'s main import gateway) destroyed. Government collapsed. Demonstrated the catastrophic potential of ammonium nitrate (used in NPK fertilizers) when stored improperly — directly relevant to fertilizer industry storage practices.',
      lessons: [
        'Ammonium nitrate storage: strict segregation from combustibles, fuels, and heat sources',
        'AN inventory limits + maximum storage duration (not indefinite warehousing)',
        'Temperature control and contamination prevention (contaminated AN is more dangerous)',
        'Fire prevention around AN storage is life-critical (fire → detonation pathway)',
        'AN detonation is confined-heating driven — prevent fire + confinement combination',
        'Regulatory oversight of AN storage (Beirut had years of ignored warnings)'
      ],
      benchmark: 'International AN handling (post-Texas City 1947, AZF Toulouse 2001, Beirut 2020): strict NFPA 400 segregation, inventory limits, temperature monitoring, and fire prevention — modern fertilizer plants with proper AN management have zero detonation events.'
    },
    emergingRisks: [
      {
        id: 'pc-er-1',
        title: 'Rock Phosphate Import Dependency & Cadmium Limits',
        category: 'market',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'India imports 90%+ of rock phosphate and phosphoric acid (Morocco, Jordan, Russia). Supply concentration and price volatility (2022 prices tripled) create feedstock risk. Additionally, EU cadmium limits on fertilizers (rock phosphate contains cadmium) may become global standard, requiring decadmiation technology investment or premium low-cadmium rock sourcing.',
        implications: ['Rock phosphate supply concentration risk', 'Price volatility (tripled in 2022)', 'Cadmium limit compliance (EU standard)', 'Decadmiation technology investment', 'Geopolitical supply disruption (Russia, etc.)']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'pc-ni-1',
        title: 'Phosphogypsum Disposal & Radioactivity Regulation',
        category: 'Regulatory / Environmental',
        description: 'Phosphoric acid production generates 5 tonnes of phosphogypsum per tonne of P2O5 — containing fluoride, heavy metals, and low-level radioactivity (from rock phosphate). Massive gypsum stacks (millions of tonnes) create long-term environmental liability. AERB radioactivity regulations and CPCB norms restrict disposal/use. A gypsum stack failure or regulatory reclassification creates major liability.',
        mitigation: 'Gypsum utilization (cement, gypsum board, soil amendment), stack integrity management, radioactivity monitoring, alternative process (if viable), regulatory engagement on beneficial use approval',
        exposure: '₹200-1,000 Cr per complex (gypsum stack liability + disposal cost)'
      }
    ],
    bestPractices: [
      {
        id: 'pc-bp-1',
        title: 'Acid Plant & Fluoride Emission Safety',
        standard: 'CCPS + OISD + CPCB Fertilizer Guidelines + NFPA 400 (for AN)',
        description: 'Managing the corrosive, toxic, and environmental hazards unique to phosphatic fertilizer production.',
        recommendations: [
          'SO2/SO3/fluoride gas detection with emergency response protocols',
          'Acid containment: full bunding, corrosion-resistant materials, spill neutralization',
          'Fluoride scrubber redundancy with continuous emission monitoring',
          'Ammonium nitrate (nitrate grades): NFPA 400 segregation + inventory limits + fire prevention',
          'Corrosion management program (RBI) for highly corrosive acid service',
          'Phosphogypsum stack integrity monitoring + radioactivity surveillance',
          'Molten sulphur handling: temperature control + fire prevention',
          'Personal protective equipment for acid/toxic gas exposure'
        ],
        benchmark: 'Coromandel International / PPL (Indian phosphatic leaders): comprehensive acid handling safety, fluoride emission control, and gypsum management meeting CPCB norms — enabling safe large-scale phosphatic production.'
      }
    ]
  },
  {
    id: 'storage-distribution',
    label: 'Storage & Distribution',
    icon: '📦',
    color: '#ca8a04',
    bannerImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    bannerTitle: 'Fertilizer Storage & Distribution',
    bannerSubtitle: 'Bulk warehouses, bagging, and rural distribution — fire, ammonium nitrate hazard, moisture damage, and logistics risks.',
    aogPerils: [
      {
        id: 'sd-aog-1',
        title: 'Flood / Monsoon — Warehouse Stock Damage',
        severity: 'high',
        description: 'Fertilizers are hygroscopic — they absorb moisture and cake/degrade. Warehouse flooding or monsoon moisture ingress destroys fertilizer stock (₹20-200 Cr per large warehouse). Urea, DAP, and NPK all lose value/usability with water contact. Peak inventory before sowing seasons (Kharif/Rabi) concentrates maximum stock exposure. Rural warehouses often have inadequate weather protection.',
        impactAreas: ['Stock Caking/Degradation', 'Total Inventory Loss (water contact)', 'Seasonal Supply Disruption', 'Farmer Supply Shortage', 'Subsidy/Revenue Loss'],
        typicalClaim: '₹20–200 Cr (stock damage)'
      }
    ],
    nonAogPerils: [
      {
        id: 'sd-naog-1',
        title: 'Ammonium Nitrate Storage Explosion',
        severity: 'critical',
        description: 'Calcium Ammonium Nitrate (CAN) and nitrate-based NPK fertilizers contain ammonium nitrate — a powerful oxidizer that detonates when heated + confined + contaminated. Fertilizer warehouse fires reaching AN stock can detonate (Texas City 1947: 581 killed, West Texas 2013: 15 killed, Beirut 2020: 218 killed — all AN fertilizer). Indian AN-based fertilizer storage frequently violates segregation/quantity norms.',
        impactAreas: ['AN Detonation (catastrophic)', 'Mass Casualties', 'Total Facility Destruction', 'Adjacent Area Devastation', 'Criminal Liability'],
        typicalClaim: '₹100–5,000 Cr (Beirut/Texas City precedent)'
      },
      {
        id: 'sd-naog-2',
        title: 'Fertilizer Warehouse Fire',
        severity: 'high',
        description: 'Fertilizer warehouses store bagged product (PP/HDPE bags — combustible) in large quantities. Non-nitrate fertilizers (urea, DAP, phosphates) don\'t detonate but the packaging + any nitrate content burns. Fire from electrical faults, forklift incidents, or hot work spreads through bag stacks. Fires involving nitrate grades risk escalation to detonation. Firefighting must avoid confining AN.',
        impactAreas: ['Bagged Stock Fire', 'Packaging Combustion', 'Nitrate Escalation Risk', 'Warehouse Damage', 'Supply Disruption'],
        typicalClaim: '₹20–150 Cr (non-nitrate) / catastrophic (nitrate)'
      }
    ],
    riskMatrix: [
      { risk: 'Ammonium Nitrate Explosion', prob: 1, impact: 3, score: 3, emv: '₹1,000 Cr', strategy: 'Avoid', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-400', strategyTooltip: 'AN segregation + inventory limits + fire prevention + contamination control + no confinement', owner: 'Warehouse Director', trigger: 'ANY fire near AN storage or contamination/temperature concern' },
      { risk: 'Warehouse Fire (General)', prob: 2, impact: 2, score: 4, emv: '₹60 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'Fire detection + suppression + electrical maintenance + hot work control + segregation', owner: 'Warehouse Head', trigger: 'Fire detection or electrical anomaly' },
      { risk: 'Flood/Moisture (Stock)', prob: 2, impact: 2, score: 4, emv: '₹60 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Stock cover + elevated storage + weather-proof warehouses + moisture control', owner: 'Logistics Head', trigger: 'Monsoon forecast or warehouse moisture detection' },
    ],
    caseStudy: {
      title: 'West Texas Fertilizer Plant — AN Storage Explosion (Reference)',
      location: 'West Fertilizer Company, West, Texas, USA',
      date: 'April 2013',
      loss: '$230 Million + 15 fatalities',
      rootCause: 'A fire (undetermined origin) broke out at the fertilizer storage and distribution facility that stored 40-60 tonnes of ammonium nitrate in a wooden warehouse building. As the fire intensified and firefighters responded, the confined, heated ammonium nitrate detonated. The explosion (equivalent to 15-20 tonnes TNT) killed 15 (including 12 first responders), injured 260, and destroyed/damaged 150 buildings including homes, a school, and a nursing home. Root cause: AN stored in combustible wooden building without fire protection, sprinklers, or proper segregation, in close proximity to a residential community.',
      impact: '15 killed (12 firefighters), 260 injured, 150 buildings damaged, $230 million losses. Led to US OSHA/EPA reform of AN storage regulations. Demonstrated that even "small" quantities of AN fertilizer (40-60 tonnes) can devastate a community when involved in fire. Directly relevant to Indian fertilizer distribution where AN-based products are stored in inadequate facilities near populated areas.',
      lessons: [
        'AN must NOT be stored in combustible (wooden) buildings — non-combustible construction only',
        'Sprinkler/fire suppression for AN storage (fire is the detonation trigger)',
        'AN storage segregation from combustibles, fuels, and ignition sources',
        'Adequate separation distance from residential/public areas (blast radius)',
        'Firefighter awareness: AN fire can detonate — evacuation vs firefighting decision critical',
        'Inventory limits and regulatory oversight of AN distribution facilities'
      ],
      benchmark: 'Post-West Texas, US regulations require: non-combustible AN storage, sprinklers, segregation, and emergency planning. Modern compliant AN distribution facilities have zero detonation events. Indian fertilizer distribution needs equivalent AN storage standards.'
    },
    emergingRisks: [
      {
        id: 'sd-er-1',
        title: 'Nano/Liquid Fertilizer Transition',
        category: 'technology',
        severity: 'low',
        timeline: '2024-2030',
        description: 'India promoting nano urea (IFFCO) and liquid fertilizers to reduce conventional fertilizer usage and subsidy. These introduce different handling risks: nano material safety (inhalation), liquid storage/transport, and new manufacturing processes. While reducing AN/bulk storage risk, they create novel handling and product liability considerations.',
        implications: ['Nano material handling safety (inhalation risk)', 'Liquid fertilizer storage/transport risks', 'New manufacturing process hazards', 'Product efficacy/liability questions', 'Distribution infrastructure change']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'sd-ni-1',
        title: 'Fertilizer Diversion & Black Market',
        category: 'Regulatory / Social',
        description: 'Subsidized urea (₹5,360/tonne vs ₹25,000+ cost) is diverted to industrial use (₹18,000+/tonne) or smuggled to neighboring countries — creating shortage for farmers and regulatory liability for companies. AN-based fertilizers are diverted for illegal explosives/mining. Companies face regulatory action, reputation damage, and supply chain integrity challenges from diversion in their distribution network.',
        mitigation: 'Neem-coating (prevents industrial diversion), track-and-trace, DBT (Direct Benefit Transfer), dealer monitoring, quantity limits per farmer, AN sales tracking per regulations',
        exposure: '₹100-500 Cr regulatory/reputation exposure per company from diversion in network'
      }
    ],
    bestPractices: [
      {
        id: 'sd-bp-1',
        title: 'Ammonium Nitrate Storage & Fertilizer Warehouse Safety',
        standard: 'NFPA 400 + Ammonium Nitrate Rules 2012 (India) + The Explosives Act',
        description: 'Preventing ammonium nitrate detonation and fertilizer warehouse fires — protecting communities and supply chain.',
        recommendations: [
          'AN storage in non-combustible construction ONLY (never wooden/combustible buildings)',
          'AN segregation from all combustibles, fuels, and ignition sources (NFPA 400)',
          'AN inventory limits per storage location with regulatory compliance',
          'Fire prevention around AN: no hot work, electrical safety, no smoking',
          'Sprinkler protection for fertilizer warehouses (fire is detonation trigger for AN)',
          'Separation distance from residential/public areas per blast radius calculation',
          'AN sales tracking and track-and-trace per Ammonium Nitrate Rules 2012',
          'Firefighter awareness: AN fire detonation risk — evacuation protocols',
          'Weather-proof warehouses preventing moisture damage to hygroscopic fertilizers'
        ],
        benchmark: 'IFFCO/Coromandel distribution: compliant AN storage, neem-coated urea (anti-diversion), and weather-proof warehousing — meeting Ammonium Nitrate Rules 2012 and preventing both safety incidents and product diversion.'
      }
    ]
  }
]
