// Pharma & Healthcare Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const PHARMA_RISK_SOURCES: RiskSource[] = [
  {
    id: 'api-manufacturing',
    label: 'API Manufacturing',
    icon: '⚗️',
    color: '#0891b2',
    bannerImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=1200&q=80',
    bannerTitle: 'Active Pharmaceutical Ingredient (API) Manufacturing',
    bannerSubtitle: 'Chemical synthesis, hydrogenation, distillation — flammable solvents, reactive chemicals, and high-pressure processes.',
    aogPerils: [
      {
        id: 'api-aog-1',
        title: 'Earthquake — Reactor Vessel & Chemical Storage Damage',
        severity: 'critical',
        description: 'API plants have 50-200 glass-lined reactors (₹50 Lakh-3 Cr each), solvent storage tanks (1,000-10,000 KL), and multi-story reaction blocks. Seismic forces crack glass linings, rupture solvent piping, and collapse elevated reactor platforms. Chemical mixing from ruptured incompatible storage creates violent reactions. Hyderabad API cluster (Patancheru, Bollaram) is in seismic Zone II-III.',
        impactAreas: ['Glass-Lined Reactor Cracking', 'Solvent Tank Rupture/Fire', 'Chemical Incompatibility Reaction', 'Reactor Platform Collapse', 'Multi-Product Contamination'],
        typicalClaim: '₹30–200 Cr + 3-6 months BI'
      },
      {
        id: 'api-aog-2',
        title: 'Flood — Solvent/Chemical Store & Effluent Overflow',
        severity: 'high',
        description: 'API manufacturing uses bulk solvents (methanol, acetone, toluene, DCM — 500-5,000 KL on-site). Flooding lifts solvent drums, overflows bunded areas mixing solvents with water/environment, and submerges reactor control panels. Effluent treatment plants overflow releasing untreated pharma waste into waterways — triggering immediate SPCB/NGT action. The 2020 Hyderabad floods affected 30+ API units in Patancheru MIDC.',
        impactAreas: ['Solvent Tank Float/Overflow', 'Environmental Chemical Discharge', 'Reactor Control System Damage', 'API Batch Contamination', 'SPCB/NGT Regulatory Action'],
        typicalClaim: '₹20–150 Cr + 2-6 months BI + environmental liability'
      }
    ],
    nonAogPerils: [
      {
        id: 'api-naog-1',
        title: 'Reactor Explosion — Runaway Reaction',
        severity: 'critical',
        description: 'Chemical reactors performing exothermic reactions (nitration, diazotization, Grignard, hydrogenation) can undergo thermal runaway if cooling fails, wrong reagent is added, or reaction mass accumulates. Pressure buildup exceeds relief capacity causing catastrophic vessel rupture. The 2020 Vizag LG Polymers styrene leak (12 fatalities) demonstrated consequences of uncontrolled chemical release in Indian industrial context.',
        impactAreas: ['Reactor Vessel Rupture', 'Toxic Gas/Vapor Release', 'Fire/Explosion', 'Worker Fatalities', 'Community Evacuation/Exposure'],
        typicalClaim: '₹50–500 Cr + fatality liability + regulatory shutdown'
      },
      {
        id: 'api-naog-2',
        title: 'Solvent Fire & Flash Fire',
        severity: 'critical',
        description: 'API plants handle 100-1,000 tonnes/month of flammable solvents (methanol fp 11°C, acetone fp -20°C, toluene fp 4°C). Solvent leaks from reactor manholes, pump seals, and transfer hoses create vapor clouds. Static discharge, hot surfaces, or non-Ex electrical ignites vapors. Indian API sector averages 20-30 significant solvent fires annually. Solvent recovery areas (distillation columns) are highest risk.',
        impactAreas: ['Flash Fire', 'Pool Fire from Spill', 'Distillation Column Fire', 'Solvent Storage Tank Fire', 'Multi-Floor Propagation'],
        typicalClaim: '₹20–200 Cr + 2-6 months BI'
      },
      {
        id: 'api-naog-3',
        title: 'Hydrogenation Vessel Explosion — H2 Risk',
        severity: 'critical',
        description: 'Catalytic hydrogenation uses hydrogen gas at 3-50 bar pressure in vessels containing flammable solvents + pyrophoric catalysts (Pd/C, Raney Ni). H2 has the widest explosive range (4-75%) and lowest ignition energy. Catalyst exposure to air during charging/discharging ignites spontaneously. A single hydrogenation vessel failure can destroy the entire reactor block.',
        impactAreas: ['H2 Explosion', 'Pyrophoric Catalyst Ignition', 'Multi-Reactor Cascade', 'Building Structural Collapse', 'Worker Fatalities'],
        typicalClaim: '₹30–200 Cr + fatality liability'
      },
      {
        id: 'api-naog-4',
        title: 'Cross-Contamination — Multi-Product Facility',
        severity: 'high',
        description: 'Indian API plants typically manufacture 20-50 different APIs in shared equipment. Cross-contamination between products (especially potent/cytotoxic APIs) causes: batch rejection (₹1-10 Cr per batch), product recall if shipped, and facility shutdown for cleaning validation. A single contamination event at a contract manufacturer can affect 5-10 customer companies globally.',
        impactAreas: ['Batch Rejection (₹1-10 Cr/batch)', 'Product Recall', 'Facility Shutdown for Decontamination', 'Customer Loss (multi-company impact)', 'Regulatory Warning Letter'],
        typicalClaim: '₹10–100 Cr (batch loss + recall + BI)'
      }
    ],
    riskMatrix: [
      { risk: 'Reactor Runaway/Explosion', prob: 1, impact: 3, score: 3, emv: '₹275 Cr', strategy: 'Avoid', strategyUrl: 'https://www.aiche.org/ccps', strategyTooltip: 'HAZOP + SIL-rated safety instrumented systems + emergency relief sizing per DIERS', owner: 'Head Process Safety', trigger: 'Any exothermic batch temperature >5°C above setpoint' },
      { risk: 'Solvent Fire', prob: 3, impact: 2, score: 6, emv: '₹110 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-30', strategyTooltip: 'ATEX zones + gas detection + inerting where possible + foam suppression', owner: 'Plant Head', trigger: 'Gas detection >20% LEL or solvent leak observed' },
      { risk: 'Hydrogenation Explosion', prob: 1, impact: 3, score: 3, emv: '₹115 Cr', strategy: 'Avoid', strategyUrl: 'https://www.aiche.org/ccps', strategyTooltip: 'H2 detection + inert atmosphere + catalyst handling SOP + vessel integrity management', owner: 'Hydrogenation Head', trigger: 'H2 detected >1% or catalyst handling deviation' },
      { risk: 'Cross-Contamination', prob: 3, impact: 2, score: 6, emv: '₹55 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.who.int/medicines/areas/quality_safety', strategyTooltip: 'Campaign management + cleaning validation + dedicated equipment for potent APIs', owner: 'Quality Head', trigger: 'Cleaning verification failure or product changeover deviation' },
      { risk: 'Flood (Solvent/Chemical)', prob: 2, impact: 2, score: 4, emv: '₹85 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'SFSP + elevated controls + solvent bunding above flood level + chemical segregation', owner: 'Site Director', trigger: 'Heavy rainfall >100mm/24hr or upstream river warning' },
    ],
    caseStudy: {
      title: 'MSML Pharma Baddi — Solvent Recovery Column Explosion',
      location: 'MSN Laboratories (MSML unit), Baddi, Himachal Pradesh',
      date: 'August 2022',
      loss: '₹65 Cr (equipment + BI + regulatory)',
      rootCause: 'Methanol recovery distillation column developed a leak at the reboiler tube bundle. Hot methanol vapor (64°C, flash point 11°C) escaped into the distillation area where a non-ATEX rated pump motor provided ignition source. The methanol fire engulfed the column, adjacent solvent storage vessels, and propagated via cable trays to the reactor block one floor above. Investigation found: no gas detection in distillation area, non-Ex electrical equipment in Zone 1, and no foam suppression system.',
      impact: 'Distillation area destroyed (₹20 Cr). Reactor block partial damage (₹15 Cr). 3 months production shutdown for repair + re-validation. BI loss: ₹25 Cr. DCGI imposed additional inspection conditions. 2 workers injured (burns). Post-fire: company invested ₹10 Cr in ATEX compliance, gas detection, and foam suppression across all facilities.',
      lessons: [
        'ALL electrical equipment in solvent handling areas MUST be ATEX-rated (Zone 1/2 per IEC 60079)',
        'Continuous flammable gas detection in distillation/recovery areas — alarm 20% LEL, trip 40% LEL',
        'Foam suppression system covering all solvent handling areas (not just water sprinkler)',
        'Cable trays as fire propagation path — fire-stopped at every floor penetration and 20m intervals',
        'Reboiler tube bundle inspection at every turnaround — thermal cycling causes fatigue cracks'
      ],
      benchmark: 'Dr. Reddy\'s global API standard: 100% ATEX compliance + continuous gas detection + foam/water spray hybrid suppression + SIL-rated emergency shutdown — zero solvent fires across 8 API plants in 5 years.'
    },
    emergingRisks: [
      {
        id: 'api-er-1',
        title: 'Continuous Manufacturing — New Process Safety Profile',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2030',
        description: 'Pharma shifting from batch to continuous manufacturing for APIs (flow chemistry, continuous crystallization). Smaller equipment volumes reduce consequence per event but: higher pressures, novel catalyst systems, 24/7 unattended operation, and less operational experience create new risks. A runaway in continuous flow may be harder to detect and isolate than in a batch reactor.',
        implications: ['Higher pressure/temperature operating envelopes', '24/7 operation with reduced manning', 'Novel catalyst systems with unknown decomposition paths', 'Harder to detect runaway in continuous vs batch (smaller thermal mass)', 'Regulatory acceptance uncertainty for continuous API manufacturing']
      },
      {
        id: 'api-er-2',
        title: 'China+1 Shift — India API Capacity Expansion Risks',
        category: 'market',
        severity: 'high',
        timeline: '2024-2030',
        description: 'Global pharma reducing China API dependency post-COVID. India adding massive API capacity under PLI scheme. Rapid capacity build by companies with limited process safety expertise creates heightened risk. New MSME API units (₹50-200 Cr investment) often lack HAZOP, SIL assessments, and proper ATEX compliance. Incident frequency likely to rise before safety culture matures.',
        implications: ['New entrants with inadequate safety systems', 'HAZOP/SIL gaps in rapidly built facilities', 'Workforce experience gap (new operators on complex chemistry)', 'Regulatory enforcement lag behind capacity expansion', 'Insurance market facing unknown risk from new API units']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'api-ni-1',
        title: 'FDA/EMA Warning Letter & Import Alert',
        category: 'Regulatory',
        description: 'A single US FDA Warning Letter can shut a plant from US market (40%+ of revenue for major Indian API makers). Import Alert blocks ALL shipments. Remediation takes 12-24 months + $50-100M investment. Ranbaxy/Wockhardt/Ipca have all faced multi-year US market exclusion from quality failures. No insurance covers regulatory exclusion revenue loss.',
        mitigation: 'cGMP compliance culture (not just documentation), regular mock FDA audits by ex-regulators, data integrity program (ALCOA+), preventive CAPA over reactive, quality risk management per ICH Q9, experienced QA leadership',
        exposure: '₹500-5,000 Cr revenue loss per plant (2-3 year US market exclusion)'
      },
      {
        id: 'api-ni-2',
        title: 'Patent Challenge / ANDA Litigation',
        category: 'Legal / IP',
        description: 'Indian generic API companies face Paragraph IV patent challenges costing $5-50M per litigation in US courts. Failure means delayed market entry (30-month stay), while success faces appeal. At-risk launch (before litigation resolved) creates ₹500-2,000 Cr damages liability if patent upheld. Companies must budget for uncertain litigation with binary outcomes.',
        mitigation: 'Diversified ANDA portfolio (30-50 filings), IP intelligence for patent landscape, settlement strategy, authorized generic partnerships, limited at-risk launch policy, litigation insurance (limited availability)',
        exposure: '₹500-2,000 Cr per at-risk launch adverse judgment'
      }
    ],
    bestPractices: [
      {
        id: 'api-bp-1',
        title: 'Process Safety Management for API Plants',
        standard: 'OSHA PSM (29 CFR 1910.119) + IEC 61511 + CCPS Guidelines + ISPE',
        description: 'Preventing the most catastrophic events in pharmaceutical manufacturing — chemical reactor explosions and solvent fires.',
        recommendations: [
          'HAZOP for ALL new processes and modifications — no exceptions for "minor" changes',
          'Safety Instrumented Systems (SIS) per IEC 61511 for all exothermic reactions',
          'Emergency relief sizing per DIERS methodology (not simple orifice calculation)',
          'ATEX zone classification and compliance for all solvent handling areas',
          'Continuous gas detection: alarm 20% LEL, evacuation 40% LEL, auto-shutdown 50% LEL',
          'Thermal stability testing (DSC/ARC) for all new reaction masses before scale-up',
          'Management of Change (MOC) with formal risk assessment for every process change',
          'Process Safety KPIs tracked monthly: near-misses, safety critical device testing, overdue PMs'
        ],
        benchmark: 'Dr. Reddy\'s/Cipla global standard: zero process safety incidents (PSI) targeting through CCPS-aligned PSM program, SIL-rated safety systems on all high-hazard reactions, and annual PSM audit by third party. Achieves PSI rate <0.1 per million man-hours vs Indian industry average >1.0.'
      }
    ]
  },
  {
    id: 'formulation',
    label: 'Formulation & Dosage',
    icon: '💊',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80',
    bannerTitle: 'Formulation & Dosage Form Manufacturing',
    bannerSubtitle: 'Tablets, capsules, injectables, and biologics — clean room, dust explosion, cross-contamination, and cold chain risks.',
    aogPerils: [
      {
        id: 'form-aog-1',
        title: 'Flood — Finished Goods & Cold Chain Loss',
        severity: 'high',
        description: 'Pharma finished goods warehouses (₹50-500 Cr inventory) must maintain controlled conditions (temperature, humidity). Any flood contact renders ALL pharmaceutical products unsaleable (GMP requirement). Cold chain products (vaccines, biologics at 2-8°C) are destroyed if power fails from flooding. The entire inventory — potentially months of production — becomes waste.',
        impactAreas: ['Complete FG Inventory Loss', 'Cold Chain Product Destruction', 'Clean Room Contamination', 'GMP Documentation Damage', 'Customer Supply Default'],
        typicalClaim: '₹50–300 Cr + 2-4 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'form-naog-1',
        title: 'Pharmaceutical Dust Explosion — Granulation/Milling',
        severity: 'high',
        description: 'Pharmaceutical powders (excipients: lactose Kst=94, starch Kst=200, plus APIs) create explosive dust during granulation, milling, blending, and tablet compression. Fluid bed dryers (FBD), cone mills, and tablet press feed systems operate with explosive concentrations. The 2003 CTA Acoustics dust explosion (7 killed) involved pharmaceutical-grade powders. Indian pharma has minimal dust explosion awareness.',
        impactAreas: ['Fluid Bed Dryer Explosion', 'Mill/Sifter Explosion', 'Tablet Press Hopper Flash', 'Duct/Bag Filter Explosion', 'Clean Room Contamination'],
        typicalClaim: '₹10–60 Cr + 1-3 months BI'
      },
      {
        id: 'form-naog-2',
        title: 'Cross-Contamination — Potent/Cytotoxic API',
        severity: 'critical',
        description: 'Multi-product formulation plants manufacturing potent compounds (OEL <10 µg/m³) or cytotoxic drugs alongside conventional products face cross-contamination risk. A single cleaning validation failure can contaminate multiple batches of different products. Recall of contaminated products affects patients (potential harm) and triggers regulatory action. Penicillin cross-contamination is a "never event" per FDA — dedicated facility required.',
        impactAreas: ['Patient Safety Risk', 'Multi-Product Batch Rejection', 'Massive Product Recall', 'FDA Warning Letter', 'Facility Shutdown for Decontamination'],
        typicalClaim: '₹50–500 Cr (recall + regulatory + facility remediation)'
      },
      {
        id: 'form-naog-3',
        title: 'Clean Room HVAC Failure — Sterile Manufacturing',
        severity: 'high',
        description: 'Sterile injectable/ophthalmic manufacturing requires Grade A/B clean rooms (ISO 5/7) with HEPA-filtered unidirectional airflow. HVAC failure (AHU motor burnout, chiller failure, HEPA breach) contaminates the entire sterile zone. All product in process must be destroyed. Requalification of sterile environment takes 2-4 weeks of media fills and particle monitoring before production restart.',
        impactAreas: ['Sterile Product Batch Loss', 'Environmental Requalification (weeks)', 'Media Fill Repeat Requirement', 'Regulatory Notification', 'Customer Supply Disruption'],
        typicalClaim: '₹10–50 Cr + 2-6 weeks BI'
      },
      {
        id: 'form-naog-4',
        title: 'Data Integrity Failure — Manufacturing Records',
        severity: 'high',
        description: 'GMP requires complete, contemporaneous, original, accurate, and attributable data (ALCOA+). Data integrity failures (backdating, overwriting, selective reporting, audit trail manipulation) are the #1 cause of FDA Warning Letters to Indian pharma. Discovery leads to: import alert, product recall of affected batches, and potential criminal prosecution. The Ranbaxy fraud ($500M fine) is the extreme case.',
        impactAreas: ['FDA Warning Letter / Import Alert', 'Mass Product Recall', 'Criminal Prosecution', 'Market Exclusion (12-24 months)', 'Stock Price Collapse'],
        typicalClaim: '₹200–5,000 Cr (regulatory + recall + lost market access)'
      }
    ],
    riskMatrix: [
      { risk: 'Cross-Contamination (Potent)', prob: 2, impact: 3, score: 6, emv: '₹275 Cr', strategy: 'Avoid', strategyUrl: 'https://www.ispe.org', strategyTooltip: 'Dedicated facilities for potent APIs + containment + cleaning validation + health-based limits', owner: 'Quality Director', trigger: 'Any cleaning verification failure or containment breach' },
      { risk: 'Pharma Dust Explosion', prob: 2, impact: 2, score: 4, emv: '₹35 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-652', strategyTooltip: 'DHA + explosion vents on FBD/mills + grounding + housekeeping', owner: 'EHS Head', trigger: 'Dust accumulation >1mm or grounding resistance >10Ω' },
      { risk: 'Clean Room HVAC Failure', prob: 2, impact: 2, score: 4, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.ispe.org', strategyTooltip: 'Redundant AHU + chiller backup + HEPA integrity testing + alarm system', owner: 'Engineering Head', trigger: 'Particle count excursion or differential pressure loss' },
      { risk: 'Data Integrity Failure', prob: 2, impact: 3, score: 6, emv: '₹1,500 Cr', strategy: 'Avoid', strategyUrl: 'https://www.who.int/medicines', strategyTooltip: 'ALCOA+ culture + electronic systems with audit trail + regular self-inspections', owner: 'Head Quality Assurance', trigger: 'ANY audit trail anomaly or data discrepancy' },
      { risk: 'Flood (FG Warehouse)', prob: 2, impact: 2, score: 4, emv: '₹175 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Stock-in-trade cover + elevated storage + multi-location distribution', owner: 'Supply Chain Head', trigger: 'Heavy rainfall >100mm/24hr' },
    ],
    caseStudy: {
      title: 'Ranbaxy — Data Integrity Fraud & $500M Settlement',
      location: 'Ranbaxy Laboratories (now Sun Pharma), Toansa/Dewas/Paonta Sahib, India',
      date: '2008-2014 (Investigation to settlement)',
      loss: '$500M fine + $1B+ lost revenue + brand destruction',
      rootCause: 'Systematic fabrication of bioequivalence and stability data over 10+ years across multiple facilities. Lab analysts instructed to report favorable results regardless of actual outcomes. Dissolution test data fabricated. Stability samples not actually stored or tested at claimed conditions. Whistleblower Dinesh Thakur (former employee) reported to FDA with documentary evidence triggering criminal investigation. Root cause: toxic quality culture where meeting timelines trumped data integrity.',
      impact: 'DOJ consent decree: $500M fine (largest pharma fraud settlement at time). Import alerts on 2 major plants. Lost $1B+ in US revenue over 5 years. Criminal charges against former CEO (ongoing). Sun Pharma acquired Ranbaxy for $4B but inherited all quality liabilities — spent 3 years remediating. Industry-wide FDA scrutiny of Indian pharma increased 5x. Stock crashed 60%. 10,000+ jobs affected.',
      lessons: [
        'Data integrity is EXISTENTIAL risk in pharma — more damaging than any fire or explosion',
        'Quality culture must come from top leadership — cannot be delegated to QA department alone',
        'Whistleblower protection mechanisms prevent small issues becoming criminal fraud',
        'M&A due diligence must include thorough quality/regulatory assessment (not just financial)',
        'Electronic batch records with tamper-proof audit trails prevent data manipulation',
        'Regular unannounced internal audits by independent quality team'
      ],
      benchmark: 'Novartis/Roche global standard: 100% electronic systems with audit trail protection, annual data integrity self-assessments, independent quality audit function reporting to Board (not operations), and whistleblower hotline — zero FDA Warning Letters from data integrity in 10 years.'
    },
    emergingRisks: [
      {
        id: 'form-er-1',
        title: 'Biologics/Biosimilar Manufacturing — Cold Chain & Contamination',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2030',
        description: 'India\'s biosimilar industry growing rapidly (Biocon, Dr. Reddy\'s, Cipla). Biologic manufacturing uses: living cell cultures (contamination = total loss), ultra-cold storage (-80°C), and highly sensitive processes where minor deviations destroy months of production. Single-use systems introduce new failure modes (bag leakage). Entire bioreactor batch (₹5-50 Cr) lost from single contamination event.',
        implications: ['Single contamination event destroys ₹5-50 Cr bioreactor batch', 'Ultra-cold chain failure destroys product worth ₹100-1,000 Cr', 'Viral contamination requiring facility shutdown (months)', 'Single-use system failures (bag integrity, connector sterility)', 'Higher per-batch value at risk than any small-molecule process']
      },
      {
        id: 'form-er-2',
        title: 'AI-Driven Drug Development — New Liability Models',
        category: 'technology',
        severity: 'medium',
        timeline: '2025-2030',
        description: 'AI/ML used for drug discovery (molecular design), clinical trial optimization, and manufacturing process optimization. Risks: AI-designed molecules with unforeseen toxicity, algorithmic bias in clinical trials, and AI-optimized manufacturing parameters causing quality failures. Liability allocation between AI vendor, pharma company, and regulator is unclear.',
        implications: ['AI-designed drug toxicity in clinical/market', 'Algorithmic bias affecting patient safety data', 'Manufacturing AI optimization causing batch failures', 'Regulatory acceptance uncertainty for AI decisions', 'Liability gap between AI vendor and pharma company']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'form-ni-1',
        title: 'Price Control (NPPA/DPCO) — Margin Destruction',
        category: 'Regulatory / Policy',
        description: 'NPPA controls prices of 350+ essential medicines under DPCO. Price ceiling often below production cost for small-volume products. Ceiling revisions don\'t keep pace with input cost inflation. Government can bring ANY medicine under price control with 30-day notice (triggered by "public interest"). The 2019 cardiac stent price cap (80% reduction) destroyed ₹5,000 Cr of industry revenue overnight.',
        mitigation: 'Portfolio diversification beyond DPCO-controlled drugs, branded generics in non-controlled segments, export focus (50%+ revenue from uncontrolled markets), operational efficiency to maintain margins under ceilings, industry body advocacy for rational pricing',
        exposure: '₹500-5,000 Cr revenue erosion per major price control expansion'
      },
      {
        id: 'form-ni-2',
        title: 'Generic Price Erosion & Commoditization',
        category: 'Market',
        description: 'Indian generic pharma faces 15-20% annual price erosion in US (largest export market) from: buyer consolidation (3 GPOs control 90% of US generic buying), new ANDA approvals creating 10-20 competitors per molecule, and API price deflation from Chinese competition. A molecule generating ₹500 Cr revenue can erode to ₹100 Cr within 3 years of additional competition.',
        mitigation: 'Complex generics (limited competition filings), specialty pharma with higher barriers, 505(b)(2) filings, biosimilars, CDMO services for innovators, vertical integration (API → formulation → market)',
        exposure: '₹1,000-5,000 Cr revenue erosion per large generic company from price deflation cycle'
      }
    ],
    bestPractices: [
      {
        id: 'form-bp-1',
        title: 'Pharmaceutical Clean Room & Sterile Manufacturing Safety',
        standard: 'EU GMP Annex 1 (2023) + ISPE GAMP 5 + WHO TRS 1044 + PIC/S',
        description: 'Protecting the highest-value manufacturing environment in pharma — sterile production where contamination destroys entire batches worth ₹5-50 Cr.',
        recommendations: [
          'Redundant HVAC: N+1 AHU configuration with auto-switchover on failure',
          'HEPA filter integrity testing per ISO 14644 — every 6 months minimum',
          'Continuous particle monitoring at all Grade A/B positions with alarm + trending',
          'Differential pressure monitoring with alarm on deviation >±2 Pa from setpoint',
          'Clean room recovery protocol: defined steps from detection to production restart',
          'Media fill program: minimum 3 successful fills per line before commercial production',
          'Environmental monitoring program per EU Annex 1 (2023) requirements',
          'Critical utility (WFI, clean steam, compressed air) continuous monitoring'
        ],
        benchmark: 'Biocon/Dr. Reddy\'s biologics facilities achieve >99% clean room compliance rate through: redundant systems + continuous monitoring + proactive HEPA replacement + environmental trending — meeting EU/US regulatory expectations for global filing.'
      }
    ]
  },
  {
    id: 'warehouse-distribution',
    label: 'Storage & Cold Chain',
    icon: '❄️',
    color: '#4CAF50',
    bannerImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=80',
    bannerTitle: 'Pharmaceutical Storage & Cold Chain',
    bannerSubtitle: 'Temperature-controlled warehousing, cold chain logistics, and distribution — where product integrity depends on unbroken environmental control.',
    aogPerils: [
      {
        id: 'wh-aog-1',
        title: 'Flood — Pharma Warehouse & Cold Room Power Failure',
        severity: 'critical',
        description: 'Pharma warehouses storing ₹100-1,000 Cr of finished goods require controlled conditions (15-25°C, <60% RH). Any flood water contact condemns ALL product (GMP requirement — no salvage possible). Cold chain products (vaccines, insulin, biologics) at 2-8°C or -20°C are destroyed within hours of power/cooling failure from flooding.',
        impactAreas: ['Complete Inventory Condemnation', 'Cold Chain Product Total Loss', 'Vaccine/Biologic Destruction', 'GDP Documentation Loss', 'Patient Supply Disruption'],
        typicalClaim: '₹100–1,000 Cr (stock condemnation)'
      }
    ],
    nonAogPerils: [
      {
        id: 'wh-naog-1',
        title: 'Cold Chain Excursion — Refrigeration Failure',
        severity: 'critical',
        description: 'Pharma cold storage (2-8°C for vaccines/biologics, -20°C for some APIs, -70°C for mRNA products) requires unbroken temperature control. Compressor failure, refrigerant leak, door seal failure, or thermostat malfunction allows temperature excursion. Products exceeding limits for >2-4 hours must be destroyed (WHO/GDP requirement). A single cold room failure can destroy ₹50-500 Cr of biologic product with zero salvage.',
        impactAreas: ['Vaccine/Biologic Total Destruction', 'API Stability Failure', 'Regulatory Non-Compliance', 'Patient Supply Crisis', 'Brand/Trust Damage'],
        typicalClaim: '₹50–500 Cr (product destruction + BI)'
      },
      {
        id: 'wh-naog-2',
        title: 'Pharma Warehouse Fire — Flammable Packaging',
        severity: 'high',
        description: 'Pharma warehouses store products in cardboard cartons with plastic blister packs — high combustible load. Unlike food products (some survive heat), ALL pharma products are destroyed by fire/heat/smoke (GMP condemnation). Warehouses holding seasonal stock (government tender supplies) concentrate ₹200-500 Cr in single locations. Sprinkler water damage also condemns pharmaceutical products.',
        impactAreas: ['Total Stock Loss (fire OR water damaged)', 'Government Tender Default', 'Patient Supply Disruption', 'Building Destruction', 'Regulatory Compliance Impact'],
        typicalClaim: '₹50–300 Cr (stock + building + BI)'
      },
      {
        id: 'wh-naog-3',
        title: 'Counterfeit Drug Infiltration — Supply Chain Integrity',
        severity: 'high',
        description: 'WHO estimates 10-30% of drugs in developing countries are substandard/falsified. Indian pharma supply chain has documented counterfeit infiltration through: repackaging of expired drugs, substitution of cheaper ingredients, and parallel import of diverted goods. Patient harm from counterfeit creates massive liability. Track-and-trace mandates (DAVA) being implemented but coverage is partial.',
        impactAreas: ['Patient Harm/Fatality', 'Brand Destruction', 'Regulatory/Criminal Action', 'Mass Product Recall', 'Distribution Network Compromise'],
        typicalClaim: '₹50–500 Cr (liability + recall + brand damage)'
      }
    ],
    riskMatrix: [
      { risk: 'Cold Chain Failure (Biologics)', prob: 2, impact: 3, score: 6, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.who.int/teams/health-product-policy-and-standards', strategyTooltip: 'Redundant cooling + diesel genset + temperature monitoring + alarm escalation', owner: 'Cold Chain Director', trigger: 'Temperature deviation >2°C from setpoint for >15 minutes' },
      { risk: 'Warehouse Fire', prob: 2, impact: 2, score: 4, emv: '₹175 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fmglobal.com', strategyTooltip: 'ESFR sprinklers + compartments + VESDA + pre-action (minimize water damage)', owner: 'Warehouse Head', trigger: 'ANY fire/smoke detection' },
      { risk: 'Flood (Stock Loss)', prob: 2, impact: 3, score: 6, emv: '₹550 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Stock cover + elevated warehouse + multi-location + flood barriers', owner: 'Supply Chain Director', trigger: 'Flood warning for warehouse location' },
      { risk: 'Counterfeit Infiltration', prob: 2, impact: 2, score: 4, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.who.int/medicines', strategyTooltip: 'Track-and-trace + tamper-evident packaging + authorized distributor program', owner: 'Distribution Head', trigger: 'Any authentication failure or suspicious product report' },
    ],
    caseStudy: {
      title: 'Bharat Biotech — Covaxin Cold Chain Failure During COVID',
      location: 'Multiple distribution points, India',
      date: 'April 2021 (during peak COVID vaccination)',
      loss: '₹80 Cr (destroyed doses + logistics + reputation)',
      rootCause: 'During India\'s COVID vaccination peak (April-May 2021), multiple cold chain failures at district-level cold stores destroyed 10+ lakh Covaxin doses. Root causes: overwhelmed cold chain infrastructure (designed for routine immunization, not pandemic scale), generator failures during heatwave power outages, and inadequate temperature monitoring at last-mile (no continuous data logger — only twice-daily manual reading). Doses that experienced undetected excursions were administered to patients — creating safety/efficacy uncertainty.',
      impact: 'Estimated 10-15 lakh doses destroyed (₹50 Cr product value). Logistics re-supply cost: ₹15 Cr. Public trust damage: ₹immeasurable. Regulatory scrutiny of cold chain adequacy. Bharat Biotech subsequently invested ₹100 Cr in IoT-enabled cold chain monitoring for entire distribution network.',
      lessons: [
        'Continuous IoT temperature monitoring (not manual twice-daily reading) at ALL storage points',
        'Redundant cooling: N+1 compressor/cooling + diesel genset with auto-start at every cold store',
        'SMS/cloud alert escalation within 5 minutes of temperature excursion to multiple levels',
        'Cold chain capacity planning must account for surge/pandemic scenarios (3-5x baseline)',
        'Product-level temperature indicators (VVM or electronic) as last line of verification'
      ],
      benchmark: 'Pfizer mRNA vaccine (-70°C) cold chain achievement: GPS-tracked thermal containers with IoT monitoring, guaranteed <1% excursion rate across millions of doses globally — demonstrating that ultra-cold chain at scale is achievable with investment.'
    },
    emergingRisks: [
      {
        id: 'wh-er-1',
        title: 'mRNA/Cell Therapy Ultra-Cold Chain (-70°C to -196°C)',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2030',
        description: 'Next-generation therapies (mRNA vaccines, CAR-T cell therapy, gene therapy) require -70°C to -196°C (liquid nitrogen) storage and transport. India has minimal ultra-cold infrastructure. Equipment failure at these temperatures causes near-instantaneous product loss. Each CAR-T dose is patient-specific (₹30-50 Lakh per dose) — cannot be replaced.',
        implications: ['Near-zero tolerance for temperature excursion', 'Patient-specific products cannot be replaced (autologous cell therapy)', 'Extremely limited ultra-cold logistics infrastructure in India', 'Equipment failure consequences are immediate and total', 'Insurance valuation challenge for personalized medicines']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'wh-ni-1',
        title: 'Government Procurement Delays & Payment Risk',
        category: 'Market / Policy',
        description: 'Government procurement (40-50% of Indian pharma market) involves: L1 pricing pressure, 180-day payment cycles, arbitrary order cancellation, and rate contract disputes. Companies holding ₹200-500 Cr of government-tender-specific inventory face write-off risk if tender is cancelled or payment delayed beyond product expiry. No insurance covers government payment default.',
        mitigation: 'Diversified customer base (limit government to 30-40% of revenue), short-shelf-life products made only against confirmed PO, working capital management for government payment cycles, tender-specific inventory kept at minimum levels',
        exposure: '₹200-1,000 Cr working capital blocked + inventory obsolescence risk per large pharma company'
      }
    ],
    bestPractices: [
      {
        id: 'wh-bp-1',
        title: 'Pharmaceutical Cold Chain Integrity',
        standard: 'WHO GDP + EU GDP (2013/C 343/01) + ISPE Cold Chain Guide + USP <1079>',
        description: 'Ensuring unbroken temperature control for the highest-value pharmaceutical products — where minutes of excursion destroy millions in inventory.',
        recommendations: [
          'Continuous IoT temperature monitoring at ALL storage locations (not manual reading)',
          'Redundant cooling: N+1 compressor + backup diesel genset with auto-start (<30 second switchover)',
          'Alarm escalation: SMS/email within 5 minutes of excursion to 3+ levels of management',
          'Thermal mapping of ALL cold rooms: quarterly per WHO GDP guidelines',
          'Door management: automatic closing, strip curtains, time-limited opening protocol',
          'Backup cold storage capacity: minimum 20% spare for emergency transfer',
          'Product-level temperature indicators (electronic TTI) for highest-value products',
          'Cold chain validation for transport: temperature-qualified packaging verified per lane/season'
        ],
        benchmark: 'Serum Institute of India (world\'s largest vaccine manufacturer): zero cold chain excursion losses through IoT monitoring + redundant systems + 72-hour backup capacity + real-time dashboard visible to senior management. Investment: ₹50 Cr across network. Annual prevented loss: ₹200+ Cr.'
      }
    ]
  },
  {
    id: 'research-development',
    label: 'R&D & Clinical',
    icon: '🔬',
    color: '#9C27B0',
    bannerImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80',
    bannerTitle: 'R&D, Clinical Trials & Regulatory',
    bannerSubtitle: 'Drug discovery, analytical labs, clinical operations — IP protection, data integrity, and regulatory compliance risks.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'rd-naog-1',
        title: 'R&D Laboratory Fire — Solvents & Reactive Chemicals',
        severity: 'high',
        description: 'Pharma R&D labs handle small quantities of highly hazardous materials: pyrophoric reagents (n-BuLi, LiAlH4), concentrated acids, flammable solvents, and novel compounds with unknown reactivity. Scale-up labs (kilo labs) bridge between discovery and manufacturing with higher quantities but less robust infrastructure than production facilities. Lab fires destroy irreplaceable research data, reference compounds, and years of analytical work.',
        impactAreas: ['Research Data/Notebook Destruction', 'Reference Compound Library Loss', 'Scale-Up Equipment Damage', 'Research Program Delay (years)', 'IP Loss'],
        typicalClaim: '₹10–50 Cr + program delay costs'
      },
      {
        id: 'rd-naog-2',
        title: 'Clinical Trial Data Loss / Integrity Failure',
        severity: 'critical',
        description: 'Clinical trial data represents ₹100-1,000 Cr of investment over 5-10 years. Data integrity failure (GCP non-compliance), site inspection failure by FDA/EMA, or server crash destroying electronic trial data can invalidate entire clinical programs. A single FDA 483 observation at a clinical site can halt a global trial. The Ranbaxy bioequivalence fraud invalidated hundreds of drug approvals.',
        impactAreas: ['Clinical Program Invalidation', 'Regulatory Filing Rejection', 'Years of R&D Investment Lost', 'Patent Clock Wasted', 'Competitive Advantage Loss'],
        typicalClaim: '₹100–5,000 Cr (R&D investment + lost market opportunity)'
      },
      {
        id: 'rd-naog-3',
        title: 'IP Theft / Trade Secret Compromise',
        severity: 'high',
        description: 'Pharma R&D generates IP worth ₹1,000-10,000 Cr per successful molecule. Employee departures to competitors, cyber theft of molecular data, or contractor breaches expose trade secrets. An API synthetic route leaked to a competitor eliminates first-to-file advantage. Indian pharma faces both internal (employee) and external (state-sponsored) IP theft threats.',
        impactAreas: ['Competitive Advantage Loss', 'Patent Filing Preemption', 'Trade Secret Disclosure', 'Market Exclusivity Erosion', 'R&D Investment Writeoff'],
        typicalClaim: '₹100–5,000 Cr (lost market exclusivity value)'
      }
    ],
    riskMatrix: [
      { risk: 'Clinical Data Integrity Failure', prob: 2, impact: 3, score: 6, emv: '₹2,500 Cr', strategy: 'Avoid', strategyUrl: 'https://www.ich.org/page/quality-guidelines', strategyTooltip: 'ALCOA+ for all clinical data + 21 CFR Part 11 compliance + backup/DR strategy', owner: 'Head Clinical Operations', trigger: 'ANY audit finding on data integrity or GCP non-compliance' },
      { risk: 'R&D Lab Fire', prob: 2, impact: 2, score: 4, emv: '₹30 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-45', strategyTooltip: 'Lab hood maintenance + chemical inventory limits + sprinkler + data backup', owner: 'R&D Safety Officer', trigger: 'Any hood failure or chemical spill in lab' },
      { risk: 'IP Theft / Data Breach', prob: 2, impact: 3, score: 6, emv: '₹2,500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nist.gov/cyberframework', strategyTooltip: 'DLP systems + access controls + employee monitoring + NDA enforcement + cyber insurance', owner: 'CISO / Head IP', trigger: 'Unauthorized data access or employee joining competitor' },
    ],
    caseStudy: {
      title: 'Wockhardt — FDA Import Alert & Multi-Year Market Exclusion',
      location: 'Wockhardt Ltd, Waluj (Aurangabad) & Chikalthana plants',
      date: '2013-2017',
      loss: '₹3,000+ Cr (lost US revenue over 4 years)',
      rootCause: 'FDA inspections at Wockhardt\'s Waluj plant (2013) found: data integrity violations (backdating of test records), microbial contamination in sterile manufacturing, inadequate cleaning validation, and failure to investigate out-of-specification results. Import Alert issued blocking ALL products from the facility. Subsequently, Chikalthana plant also received Warning Letter. Company could not adequately remediate quality systems — Import Alert remained for 4+ years.',
      impact: 'US revenue dropped from ₹2,500 Cr to ₹800 Cr over 4 years. Market share in 50+ US generic products lost permanently to competitors. Stock price declined 70%. ₹500+ Cr spent on remediation with external consultants. Multiple senior executives left. Company\'s US pipeline of 30+ ANDAs could not be launched. Total financial impact estimated ₹3,000+ Cr in lost revenue + remediation cost.',
      lessons: [
        'Data integrity is a BINARY regulatory outcome — single failure = total facility exclusion',
        'Remediation from FDA Warning Letter/Import Alert takes 2-4 YEARS minimum',
        'Quality cost savings (reducing headcount, skipping investigations) creates existential risk',
        'US market concentration without quality resilience is gambling with company survival',
        'Board-level quality oversight mandatory — quality cannot report to operations',
        'Mock FDA inspections by external experts annually reveal gaps before regulators find them'
      ],
      benchmark: 'Sun Pharma (post-Ranbaxy integration) invested $500M+ in quality remediation, hired 2,000 quality professionals, and implemented electronic systems with audit trails across all 40+ plants — achieved full FDA compliance restoration for all facilities by 2020.'
    },
    emergingRisks: [
      {
        id: 'rd-er-1',
        title: 'Decentralized Clinical Trials — New Risk Paradigm',
        category: 'technology',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Post-COVID shift to decentralized/hybrid clinical trials (remote monitoring, direct-to-patient drug supply, wearable data collection) introduces: data quality concerns from uncontrolled home environments, patient compliance verification challenges, drug accountability gaps in direct-to-patient model, and regulatory acceptance uncertainty.',
        implications: ['Data quality uncertainty from home/remote settings', 'Drug accountability gaps in direct-to-patient supply', 'Wearable device data reliability and validation', 'Regulatory agency acceptance variability by region', 'Patient safety monitoring challenges in decentralized model']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'rd-ni-1',
        title: 'Clinical Trial Failure — R&D Write-Off',
        category: 'Strategic / Scientific',
        description: 'Pharma R&D has 90%+ failure rate from discovery to market. A Phase III trial failure (after 8-10 years and ₹1,000-5,000 Cr investment) creates immediate write-off and stock price crash. Indian pharma companies increasingly investing in novel drug research face this binary risk. The 2016 Zydus Cadila vaccine trial failure wrote off ₹800 Cr of R&D investment.',
        mitigation: 'Portfolio diversification (10-20 molecules in pipeline), fail-fast strategy (early biomarker endpoints), partnership model sharing R&D cost, adaptive trial designs reducing Phase III investment before confidence, out-licensing to spread risk',
        exposure: '₹500-5,000 Cr per Phase III trial failure'
      }
    ],
    bestPractices: [
      {
        id: 'rd-bp-1',
        title: 'Pharmaceutical Data Integrity Program',
        standard: 'FDA Data Integrity Guidance 2018 + WHO TRS 996 Annex 5 + PIC/S PI 041-1',
        description: 'Preventing the #1 regulatory risk in pharma — data integrity failure that leads to market exclusion.',
        recommendations: [
          'ALCOA+ principles embedded in ALL quality systems (not just lab — manufacturing, clinical, QA)',
          'Electronic systems: audit trail enabled + tamper-proof + 21 CFR Part 11 compliant',
          'No standalone computers for GMP data — ALL connected to validated network',
          'Quarterly data integrity self-assessment with documented findings and CAPA',
          'Blank form control: no pre-signed/pre-dated blank records available',
          'Meta-data review: audit trail review as part of batch record review process',
          'Annual data integrity training for ALL GMP personnel (not just QC lab)',
          'Whistleblower mechanism: anonymous reporting channel for data integrity concerns'
        ],
        benchmark: 'Cipla global program: 100% electronic batch records, automated audit trail review (AI-flagging anomalies), and independent data integrity audit team — zero FDA 483s related to data integrity in 5 years across 30+ manufacturing sites.'
      }
    ]
  }
]
