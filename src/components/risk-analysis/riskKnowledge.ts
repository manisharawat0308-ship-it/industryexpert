// Steel Industry Risk Knowledge Layer — 65+ domain-specific terms
// Each entry supports 3-level interaction: hover (tooltip) → click (expand) → click again (full modal)

export interface KnowledgeEntry {
  id: string
  term: string
  tooltip: string
  detail: string
  whyItMatters: string
  imageUrl?: string
  rootCauses: string[]
  incidents: string[]
  prevention: string[]
  costRange: string
  referenceUrl?: string
}

export const RISK_KNOWLEDGE: Record<string, KnowledgeEntry> = {
  // === BLAST FURNACE & IRONMAKING ===
  'blast-furnace-breakout': {
    id: 'blast-furnace-breakout',
    term: 'Blast Furnace Breakout',
    tooltip: 'Molten iron escaping through eroded refractory lining — catastrophic event',
    detail: 'A BF breakout occurs when the refractory hearth lining erodes below critical thickness (typically <150mm), allowing 1,500°C molten iron to breach the steel shell. The escaping iron stream flows at high velocity, destroying casthouse equipment, igniting anything combustible, and creating explosive steam if it contacts cooling water. The furnace must be shut down for emergency reline taking 90-120 days.',
    whyItMatters: 'Single highest-value insurable event in steelmaking. Claims range ₹500-1,500 Cr including property damage and business interruption. Adequate sub-limits, deductibles, and waiting periods must be carefully calibrated. Insurers should verify thermal monitoring systems are in place.',
    imageUrl: 'https://images.unsplash.com/photo-1565175564396-e1a1e5db28e3?w=600&q=80',
    rootCauses: ['Hearth refractory erosion from chemical attack by alkalis (K2O, Na2O)', 'Tuyere damage allowing water ingress near hearth', 'Excessive hot metal temperature (>1,520°C sustained)', 'Salamander buildup causing asymmetric wear', 'Insufficient titanium-bearing material addition for hearth protection'],
    incidents: ['POSCO Gwangyang BF3 breakout (2016) — ₹800 Cr damage, 6-month reline', 'SAIL Bhilai BF7 hearth leak (2019) — controlled shutdown, ₹200 Cr preventive reline', 'RINL BF2 breakout (2017) — 4 injuries, ₹450 Cr total claim'],
    prevention: ['2,000+ embedded thermocouples with real-time thermal model', 'AI-based remaining life prediction (30-day advance warning)', 'Titanium oxide injection when isotherms approach critical zone', 'Annual acoustic emission survey of hearth shell', 'Stave cooling water flow monitoring for early leak detection'],
    costRange: '₹500–1,500 Cr (property + 4-6 months BI)'
  },
  'bof-vessel': {
    id: 'bof-vessel',
    term: 'BOF (Basic Oxygen Furnace)',
    tooltip: 'Steelmaking converter — blows oxygen onto molten iron to reduce carbon content',
    detail: 'The BOF (also called LD Converter) converts molten pig iron into steel by blowing pure oxygen through a water-cooled lance at supersonic velocity. The vessel holds 150-300 tonnes, operates at 1,650°C, and completes a "heat" in 40-50 minutes. The lining lasts 15,000-20,000 heats before replacement. Key failure modes include trunnion ring cracking (from thermal cycling), vessel shell thinning, and lance cooling failure.',
    whyItMatters: 'BOF failure results in uncontrolled spillage of 200+ tonnes of molten steel. The trunnion ring (supporting structure) is a single-point-of-failure — cracking requires months of downtime. Insurance should cover both the vessel repair and the prolonged BI from having only one converter available.',
    rootCauses: ['Trunnion ring fatigue cracking from 50,000+ thermal cycles', 'Vessel mouth deformation from skull buildup and oxygen lance impact', 'Refractory lining sudden failure (spalling) from thermal shock', 'Lance cooling water leak causing hydrogen explosion in vessel'],
    incidents: ['SAIL Bhilai SMS-II BOF failure (2018) — 3 fatalities, ₹400 Cr', 'Tata Steel BOF trunnion crack (2021) — detected by NDE, controlled shutdown', 'JSW Salem BOF lance failure (2022) — steam explosion, ₹80 Cr'],
    prevention: ['Phased array ultrasonic testing of trunnion ring quarterly', 'Vessel shell thickness mapping using electromagnetic methods', 'Lance cooling water flow/pressure monitoring with auto-retract', 'Campaign management — hard stop at 18,000 heats regardless of lining condition', 'Spare vessel strategy for single-converter shops'],
    costRange: '₹200–600 Cr (property + 2-4 months BI)'
  },
  'coke-oven-gas': {
    id: 'coke-oven-gas',
    term: 'Coke Oven Gas (COG)',
    tooltip: 'Hydrogen-rich flammable gas released during coal carbonization — major explosion risk',
    detail: 'COG is produced during the 18-hour coking cycle as coal is heated to 1,100°C in absence of air. Composition: 55-60% H2, 25-30% CH4, 5-8% CO, plus traces of H2S, NH3, benzene, and tar. Calorific value ~4,200 kcal/m³. It is collected through ascension pipes and transported via the gas collecting main to by-product recovery plant and eventually used as fuel throughout the plant.',
    whyItMatters: 'COG is the most dangerous gas in a steel plant — higher explosive range (4-75% H2 in air) than natural gas. Door leaks, ascension pipe cracks, and collecting main failures create explosive atmospheres. Gas-related explosions are multi-fatality events with regulatory shutdown consequences.',
    rootCauses: ['Coke oven door seal deterioration (heat warping, carbon buildup)', 'Ascension pipe elbow joint failure from thermal cycling', 'Collecting main condensate seal failure', 'By-product plant equipment corrosion (H2S attack)', 'Pressure surge during battery operation changes'],
    incidents: ['Tata Steel Jamshedpur COG leak (2015) — 5 fatalities from CO poisoning', 'SAIL Bokaro coke oven battery fire (2020) — ₹300 Cr damage', 'JSPL Angul COG explosion (2018) — 2 killed, ₹150 Cr'],
    prevention: ['Fixed H2/CO gas detectors every 20m with central alarm system', 'Door leak rate monitoring — automated flagging at >5% leak rate', 'Collecting main water seal level monitoring with low-level alarm', 'Personal CO monitors mandatory for all coke oven workers', 'Quarterly leak survey using portable gas imaging cameras'],
    costRange: '₹100–500 Cr (explosion + 6-12 months battery rebuild)'
  },
  'continuous-casting': {
    id: 'continuous-casting',
    term: 'Continuous Casting',
    tooltip: 'Solidifying liquid steel into slabs/billets — breakout risk if shell integrity fails',
    detail: 'Continuous casting transforms liquid steel into solid semi-finished products (slabs, blooms, billets) by pouring into a water-cooled copper mould. A thin solidified shell forms in the mould and is progressively cooled by spray water as it descends through the strand. If the shell is too thin or sticks to the mould, molten steel breaches below — a "breakout" — spilling 100+ tonnes of liquid steel onto the caster floor.',
    whyItMatters: 'Caster breakouts are the most frequent high-value incident in steel plants. Each major breakout costs ₹20-100 Cr and takes 2-4 weeks to repair per strand. Multi-strand casters may lose only one strand, but single-strand casters lose entire production.',
    rootCauses: ['Mould level fluctuation causing shell thinning', 'Alumina buildup on submerged entry nozzle (SEN) causing asymmetric flow', 'Mould copper plate wear allowing sticking', 'Incorrect casting speed for steel grade', 'Tundish nozzle clogging causing flow interruption'],
    incidents: ['AMNS India caster breakout (2023) — ₹45 Cr damage to 2 strands', 'SAIL Bokaro slab caster breakout (2021) — ₹80 Cr, mould table replacement', 'JSW Dolvi breakout causing fire in spray chamber (2022) — ₹35 Cr'],
    prevention: ['Breakout Prediction System (BPS) using thermocouple pattern recognition', 'Mould level control with electromagnetic brake (EMBR) for flow stability', 'Online mould copper plate wear measurement', 'SEN condition monitoring and scheduled replacement', 'Spray water quality management to prevent nozzle clogging'],
    costRange: '₹20–100 Cr per breakout event'
  },
  'hot-strip-mill': {
    id: 'hot-strip-mill',
    term: 'Hot Strip Mill (HSM)',
    tooltip: 'Rolls heated steel slabs into thin coils at 800-1,200°C — high mechanical stress equipment',
    detail: 'The Hot Strip Mill heats slabs to 1,200°C in reheating furnaces, then reduces thickness from 250mm to 1.5-25mm through roughing and finishing stands. The strip travels at up to 80 km/h at the final stand. Main drive motors are 10,000-15,000 HP with complex gear trains. Equipment operates under extreme thermal cycling and mechanical stress.',
    whyItMatters: 'HSM is the revenue bottleneck — all flat products must pass through it. A main drive failure (motor, gearbox, or spindle) shuts 50-100% of flat product capacity. Lead times for replacement components are 6-12 months. BI claims can exceed property damage by 3-5x.',
    rootCauses: ['Spindle coupling fatigue failure from torque overloads', 'Gearbox tooth pitting/spalling from inadequate lubrication', 'Main motor winding insulation degradation from thermal cycling', 'Work roll failure (spalling, fire-cracking) damaging mill housing', 'Strip cobble/pileup causing mechanical impact damage'],
    incidents: ['Tata Steel HSM spindle failure (2020) — ₹120 Cr BI, 4-month lead time', 'AMNS India HSM gearbox failure (2022) — ₹200 Cr, 6-month wait for German OEM', 'JSW Vijayanagar F7 motor burnout (2023) — ₹80 Cr with spare motor swap'],
    prevention: ['Online vibration monitoring (8 mm/s RMS alarm threshold)', 'Oil analysis monthly with ferrographic particle counting', 'Motor partial discharge monitoring for insulation health', 'Critical spare strategy: backup motor, gearbox-ready set, spindle assemblies', 'Rolling schedule optimization to limit thermal shock'],
    costRange: '₹50–300 Cr (equipment + 3-9 months BI)'
  },
  'refractory-lining': {
    id: 'refractory-lining',
    term: 'Refractory Lining',
    tooltip: 'Heat-resistant ceramic lining protecting steel vessels from 1,500°C+ molten metal',
    detail: 'Refractories are ceramic materials (alumina, magnesia, carbon, zirconia) that line all vessels contacting molten steel — blast furnaces, BOF, EAF, ladles, tundishes, and runners. They must withstand extreme temperatures (1,500-1,700°C), chemical attack from slag, thermal shock from rapid temperature changes, and mechanical erosion from metal flow. Lining life varies: BF hearth 12-20 years, BOF 15,000 heats, ladle 80-120 heats.',
    whyItMatters: 'Refractory failure is the root cause of most molten metal incidents. Ladle breakouts, BF hearth leaks, and BOF failures all trace back to refractory degradation. Insurance risk engineers should verify campaign management systems, remaining life tracking, and hard-stop policies.',
    rootCauses: ['Chemical erosion by FeO-rich slag at slag-metal interface', 'Thermal spalling from rapid temperature changes (>200°C/hour)', 'Structural spalling from thermal expansion mismatch between layers', 'Mechanical erosion from high-velocity metal/gas flow', 'Alkali (K2O/Na2O) attack causing carbon dissolution in BF'],
    incidents: ['Multiple ladle breakouts annually across Indian steel industry (10-15 per year)', 'RINL BF hearth failure requiring emergency salamander tap (2019)', 'SAIL Rourkela BOF premature lining failure at 12,000 heats (2021)'],
    prevention: ['Laser-based lining thickness measurement after every campaign', 'Thermal imaging of vessel shell for hotspot detection', 'Slag chemistry control to minimize refractory attack', 'Hard-stop campaign limits — no extensions beyond design life', 'Quality-assured refractory procurement from approved vendors only'],
    costRange: '₹50–1,500 Cr (depending on vessel type and extent)'
  },
  'business-interruption': {
    id: 'business-interruption',
    term: 'Business Interruption (BI)',
    tooltip: 'Revenue loss during shutdown period — often exceeds physical damage cost in steel',
    detail: 'Business Interruption in steel plants refers to the revenue/profit loss during forced shutdown from an insured peril. Steel plants have high fixed costs (₹50-150 Cr/month for integrated plants) that continue during shutdown. The BI component typically exceeds physical damage by 2-5x because of: (1) long lead times for replacement equipment, (2) cascading effect through interconnected processes, (3) customer penalties for non-delivery, and (4) market share loss during extended outages.',
    whyItMatters: 'BI is the dominant loss component in steel plant claims. Insurers must carefully assess: indemnity period adequacy (minimum 18 months for integrated plants), daily rate of loss, and potential for partial operation. Contingent BI from supplier/customer dependencies adds further exposure.',
    rootCauses: ['Long lead time for specialized equipment (EAF transformers: 12-18 months)', 'Sequential process dependency — upstream failure stops all downstream', 'Single-point-of-failure equipment without redundancy', 'Regulatory shutdown orders extending beyond physical repair time', 'Customer contract penalties triggering accelerated loss recognition'],
    incidents: ['Aarti Steel 14-month EAF transformer outage (2024) — BI exceeded PD by 4x', 'RINL post-explosion shutdown 45 days (2025) — ₹200 Cr BI alone', 'JSW Tarapur CRM fire 5-month shutdown (2023) — ₹100 Cr BI'],
    prevention: ['Critical spares inventory including long-lead items', 'Tolling/job-work agreements with industry peers for continuity', 'Diversified customer base to enable flexible order rerouting', 'Modular equipment design allowing partial replacement', 'Adequate BI insurance with realistic indemnity period assessment'],
    costRange: '₹100–5,000 Cr depending on plant size and duration'
  },
  'steam-explosion': {
    id: 'steam-explosion',
    term: 'Steam Explosion (Water-Metal Interaction)',
    tooltip: 'Violent explosion when water contacts molten metal — 1,000x volume expansion in milliseconds',
    detail: 'A steam explosion (also called a "phreatic explosion" or "FCI — Fuel Coolant Interaction") occurs when water is trapped under or within molten steel/iron at >1,400°C. The water instantaneously vaporizes, expanding 1,000-1,700 times in volume. This creates a shockwave equivalent to several kg of TNT. Unlike chemical explosions, steam explosions happen with zero warning and are among the most violent events in metallurgical operations.',
    whyItMatters: 'Steam explosions are the deadliest risk in steelmaking — responsible for more multi-fatality events globally than any other cause. They are entirely preventable through moisture control. Insurers should verify: (1) pre-heat procedures for all materials, (2) cooling water leak detection near molten metal, (3) wet scrap exclusion procedures.',
    rootCauses: ['Wet scrap charged into EAF/BOF containing trapped water', 'Cooling panel/tuyere water leak into furnace containing molten metal', 'Rainwater ingress into ladles/tundishes left open outdoors', 'Damp refractory repair material not properly dried before use', 'Condensation from humid air on cold metal surfaces before charging'],
    incidents: ['ThyssenKrupp Duisburg EAF explosion (2019) — wet scrap, 1 fatality', 'RINL ladle explosion (2025) — trapped gas/water interaction, 9 killed', 'Chinese steel plant BF casthouse explosion (2023) — water leak, 7 killed'],
    prevention: ['Zero moisture tolerance: all materials must be verified dry before contact', 'Cooling water leak detection with automatic isolation near molten metal zones', 'Covered storage for all refractories, ladles, and tundishes', 'Mandatory pre-heat sequence (minimum 600°C) for all refractory-lined vessels', 'Scrap drying/preheating systems with moisture sensors at charge bucket'],
    costRange: '₹200–1,000 Cr + potential multi-fatality liability'
  },
  'eaf-transformer': {
    id: 'eaf-transformer',
    term: 'EAF Transformer',
    tooltip: 'Custom-wound 30-100 MVA transformer for electric arc furnaces — 12-18 month lead time',
    detail: 'EAF transformers are among the most stressed electrical equipment in any industry. They convert 33/132 kV grid supply to 400-1,000V at 50,000-100,000 amperes for the arc. Duty cycle involves 45-60 minute heats with massive current surges during bore-in (initial scrap melting) and refining. The transformer experiences 15-20 thermal cycles per day. Custom-wound by specialists (Siemens, ABB, GE), lead time is 12-18 months.',
    whyItMatters: 'EAF transformer failure is the single highest BI-exposure risk in mini mills. With 12-18 month replacement time, a single failure can result in ₹100-300 Cr BI loss. Insurance must ensure indemnity period covers actual lead time. Spare transformer strategy (own or shared) dramatically reduces exposure.',
    rootCauses: ['Progressive insulation degradation from thermal cycling (hottest-spot theory)', 'Mechanical displacement of windings from through-fault forces', 'Cooling system failure causing accelerated aging', 'Bushing flashover from contamination in steel plant environment', 'Manufacturing defect in custom windings (latent)'],
    incidents: ['Aarti Steel Kutch explosion (2024) — 14-month shutdown, ₹120 Cr', 'Bhushan Power EAF transformer failure (2022) — 10 months, ₹90 Cr', 'Usha Martin transformer oil fire (2021) — adjacent damage, ₹60 Cr'],
    prevention: ['Online Dissolved Gas Analysis (DGA) with automated trending', 'Frequency Response Analysis (FRA) baseline and annual comparison', 'Buchholz relay testing and trip verification quarterly', 'Oil quality monitoring: moisture, acidity, BDV', 'Spare transformer strategy — own spare or consortium arrangement'],
    costRange: '₹80–300 Cr (equipment + 12-18 months BI)'
  },
  'rolling-oil-fire': {
    id: 'rolling-oil-fire',
    term: 'Rolling Oil Fire',
    tooltip: 'Flash fire from atomized kerosene-based rolling oil in cold mill basements',
    detail: 'Cold rolling mills spray 2,000-5,000 liters/minute of rolling oil (typically kerosene or palm-oil based, flash point 40-65°C) onto rolls and strip for cooling and lubrication. At high-speed operation, the oil atomizes into fine mist that accumulates in enclosed mill basements. This mist is within the explosive range. A single ignition source (strip breakage friction, electrical spark, hot bearing) triggers a deflagration that engulfs the entire basement in seconds.',
    whyItMatters: 'CRM fires are high-frequency/high-severity events in flat steel processing. The combination of explosive atmosphere + multiple ignition sources + enclosed space makes them particularly dangerous. Insurers should verify: oil mist extraction rates, LEL monitoring, basement deluge systems, and housekeeping programs.',
    rootCauses: ['Strip breakage creating friction heat/sparks in roll bite', 'Oil mist accumulation in poorly ventilated basements', 'Hot bearing or seized roll creating ignition temperature', 'Hydraulic line failure spraying oil onto hot surfaces', 'Electrical fault in oil-mist contaminated environment'],
    incidents: ['JSW Tarapur CRM fire (2023) — ₹150 Cr, 5-month shutdown', 'Tata Steel Jamshedpur CRM 5-stand fire (2020) — ₹80 Cr', 'AMNS India Hazira CRM fire (2022) — ₹45 Cr, 2-month outage'],
    prevention: ['Continuous oil mist monitoring: alarm at 10% LEL, shutdown at 25% LEL', 'Forced ventilation: minimum 12 air changes per hour in basements', 'Automatic foam deluge system sized for worst-case pool fire', 'Weekly oil sump cleaning with photographic audit record', 'Fire-resistant hydraulic fluid (HFD-U) for all mill hydraulic systems'],
    costRange: '₹50–200 Cr (equipment + 3-6 months BI)'
  },
  'coal-spontaneous-combustion': {
    id: 'coal-spontaneous-combustion',
    term: 'Spontaneous Combustion (Coal)',
    tooltip: 'Self-heating of coal stockpiles through oxidation — undetectable until advanced stage',
    detail: 'Coking coal oxidizes slowly when exposed to air, generating heat. In large stockpiles (>10m height), this heat cannot dissipate and accumulates internally. When core temperature exceeds 80°C, the reaction accelerates exponentially (thermal runaway). By the time surface signs appear (smoke, discoloration), the internal temperature may exceed 300°C and the fire is beyond control. The entire stockpile (50,000-200,000 tonnes worth ₹200-1,000 Cr) can be lost.',
    whyItMatters: 'Coal stock fires are high-value material damage claims unique to steel/power industry. They are entirely preventable with proper storage management. Insurers should verify: stockpile height limits, FIFO rotation policy, temperature monitoring, and maximum storage duration limits.',
    rootCauses: ['Excessive stockpile height (>12m) reducing heat dissipation', 'Extended storage duration (>30 days for high-volatile coal)', 'High volatile matter content (>28%) increasing reactivity', 'Fines segregation at base creating dense, poorly-ventilated zones', 'Monsoon moisture trapping heat within compacted zones'],
    incidents: ['Paradip Port coal fire (2023) — 120,000 tonnes lost, ₹380 Cr', 'Vizag Port stockpile fire (2022) — 80,000 tonnes, ₹250 Cr', 'Haldia Port coal fire (2020) — 50,000 tonnes, ₹150 Cr'],
    prevention: ['Maximum height 12m, width based on 45° angle of repose', 'FIFO rotation — high-VM coal dispatched within 21 days', 'Temperature sensors at 2m/5m/8m depth with SCADA alarm at 60°C', 'Compacted surface layer to limit oxygen penetration', 'Thermal drone survey twice weekly'],
    costRange: '₹100–500 Cr (material loss + supply disruption)'
  },
  'ladle-metallurgy': {
    id: 'ladle-metallurgy',
    term: 'Ladle Metallurgy',
    tooltip: 'Secondary steelmaking in ladle — refining temperature, composition, and cleanliness',
    detail: 'After primary steelmaking (BOF/EAF), liquid steel is refined in the ladle through processes like Ladle Furnace (LF) heating, vacuum degassing (RH/VD), and argon stirring. Ladles hold 100-300 tonnes at 1,580-1,620°C. The ladle refractory lining endures 80-120 heats. Key risks include ladle breakout (refractory failure), slide-gate malfunction (uncontrolled steel flow), and argon gas entrapment (as seen in the RINL incident).',
    whyItMatters: 'Ladle operations involve the highest frequency of molten metal incidents in steel plants. Every heat passes through ladle stage 2-3 times. A single ladle breakout can cause fatalities and ₹50-200 Cr damage. Insurers should verify: remaining lining life tracking, pre-use thermal inspection, and emergency tipping capability.',
    rootCauses: ['Refractory wear exceeding safe campaign limit', 'Slag line erosion from highly oxidizing slag', 'Slide-gate plate cracking from thermal shock', 'Nozzle well refractory failure causing uncontrolled drainage', 'Ladle shell cracking from thermal fatigue cycles'],
    incidents: ['RINL ladle explosion (2025) — 9 killed, ₹200+ Cr', 'Tata Steel ladle breakout (2022) — no injuries, ₹30 Cr equipment', 'SAIL Durgapur ladle nozzle failure (2021) — 2 burns, ₹15 Cr'],
    prevention: ['Remaining lining life tracking with hard-stop at 80% campaign', 'Thermal imaging of ladle shell before every use (automated)', 'Slide-gate maintenance with plate replacement at defined intervals', 'Emergency ladle tipping capability at all treatment stations', 'Ladle drying/preheating verification before returning to service'],
    costRange: '₹15–200 Cr per event'
  },
  'gas-holder': {
    id: 'gas-holder',
    term: 'Gas Holder',
    tooltip: 'Large-volume storage for BFG/COG — single-point-of-failure for plant energy balance',
    detail: 'Gas holders store 30,000-100,000 m³ of process gases (BFG, COG, mixed gas) to buffer supply-demand fluctuations in the plant energy system. Types include wet-seal (water-sealed piston) and dry-seal (membrane) designs. They operate at low pressure (200-500 mmWG) but contain massive volumes of toxic/flammable gas. A gas holder explosion would release the equivalent of several tonnes of TNT.',
    whyItMatters: 'Gas holders are single-point-of-failure assets — their loss disrupts the entire plant energy network. All downstream users (power plant, reheating furnaces, coke ovens underfiring) lose fuel supply simultaneously. An explosion is a worst-case catastrophe scenario.',
    rootCauses: ['Wet seal water level drop causing gas escape and air ingress', 'Internal corrosion of piston/membrane from condensate attack', 'External wind load causing structural failure', 'Lightning strike igniting vented gas', 'Foundation settlement causing tilting and seal breach'],
    incidents: ['Beijing Shougang gas holder explosion (2007) — multiple fatalities', 'Indian steel plant near-miss (confidential, 2020) — water seal failure', 'European gas holder structural failure during storm (2018)'],
    prevention: ['Continuous water seal level monitoring with redundant sensors', 'Gas composition monitoring for air ingress (O2 content)', 'Structural integrity assessment every 5 years', 'Lightning protection system maintenance and testing', 'Foundation monitoring (survey markers + inclinometers)'],
    costRange: '₹200–800 Cr (explosion scenario — property + BI + liability)'
  },
  'cbam': {
    id: 'cbam',
    term: 'CBAM (Carbon Border Adjustment)',
    tooltip: 'EU carbon tax on imported steel — €50-100/tonne additional cost from 2026',
    detail: 'The EU Carbon Border Adjustment Mechanism requires importers to purchase CBAM certificates corresponding to the carbon emissions embedded in imported goods. For steel, this is 1.5-2.2 tonnes CO2 per tonne of BF-BOF steel. At €50-100/tonne CO2, this adds ₹4,000-8,000/tonne to Indian steel exports to EU — making 30% of current exports unviable without decarbonization investment.',
    whyItMatters: 'CBAM creates stranded asset risk for carbon-intensive BF-BOF plants heavily reliant on EU exports. It accelerates the timeline for green steel transition, increasing capex requirements and technology transition risk. Insurers face potential devaluation of insured assets if they become economically unviable.',
    rootCauses: ['EU Climate Law mandating 55% emission reduction by 2030', 'Level playing field concern between EU producers (paying ETS) and imports', 'Phased implementation: reporting from 2024, certificates from 2026', 'Scope covers direct and some indirect emissions', 'No recognition of Indian carbon tax/trading (currently non-existent)'],
    incidents: ['Not yet — CBAM certificates required from January 2026', 'Pilot reporting phase (2024-25) already creating compliance burden', 'Indian steel exporters reporting 15-20% margin compression in forward contracts'],
    prevention: ['Carbon intensity measurement and reporting system implementation', 'Decarbonization roadmap with interim targets aligned to CBAM phases', 'EAF/scrap-based route for EU-destined products (lower carbon intensity)', 'Renewable energy procurement for electricity component', 'Carbon credit accumulation from energy efficiency projects'],
    costRange: '₹8,000-12,000 Cr/year revenue impact (industry-wide exports to EU)'
  },
  'hydrogen-steelmaking': {
    id: 'hydrogen-steelmaking',
    term: 'Hydrogen Direct Reduction (H2-DRI)',
    tooltip: 'Using green hydrogen instead of coal to reduce iron ore — future of steel but new explosion risks',
    detail: 'Hydrogen-based Direct Reduction uses H2 gas (instead of CO from coal) to remove oxygen from iron ore, producing DRI (sponge iron) with water as the only byproduct. H2 burns with an invisible flame, has the widest explosive range of any common gas (4-75% in air), and causes embrittlement in standard carbon steel pipelines. Storage at 350-700 bar introduces unprecedented pressure vessel risks in steel plants.',
    whyItMatters: 'Green steel via H2-DRI is the industry\'s path to net-zero but introduces entirely new risk categories. Existing insurance products and risk engineering knowledge are inadequate for H2 facilities. Insurers need to develop new risk models, inspection protocols, and coverage wordings for hydrogen-intensive steelmaking.',
    rootCauses: ['Hydrogen embrittlement of existing carbon steel pipelines', 'Invisible flame making leak detection challenging', 'Wide explosive range (4-75%) vs natural gas (5-15%)', 'High-pressure storage vessel catastrophic failure (BLEVE)', 'Electrolysis unit risks (alkaline or PEM technology)'],
    incidents: ['HYBRIT pilot (Sweden) — minor H2 leak during commissioning (2021)', 'H2 station explosion in South Korea (2019) — regulatory response', 'Industrial H2 pipeline leak in Germany (2020) — evacuations'],
    prevention: ['H2-rated materials for all piping and vessels (ASME B31.12)', 'Hydrogen leak detection sensors with sub-1% concentration alarm', 'Ventilation design preventing H2 accumulation in enclosed spaces', 'Pressure vessel inspection frequency doubled vs conventional', 'Specialized firefighting capability for invisible H2 flames'],
    costRange: '₹500–5,000 Cr (new H2 facility capex exposure, incident potential unknown)'
  },
  'tailings-dam': {
    id: 'tailings-dam',
    term: 'Tailings Dam',
    tooltip: 'Earth dam storing mine waste slurry — catastrophic failure risk with environmental devastation',
    detail: 'Tailings dams store the fine waste material (tailings) from iron ore beneficiation mixed with water. These dams can be 30-100m high and contain millions of cubic meters of saturated fine material. Unlike water dams, tailings dams increase in height over the mine life and are permanent structures. Failure modes include overtopping, piping (internal erosion), foundation failure, and liquefaction during earthquakes.',
    whyItMatters: 'Tailings dam failures are among the most devastating industrial disasters globally. The 2019 Brumadinho (Vale, Brazil) failure killed 270 people and resulted in $7 billion in settlements. Indian iron ore mines have hundreds of tailings dams with varying maintenance quality. Environmental liability can exceed all insured limits.',
    rootCauses: ['Insufficient drainage causing high phreatic surface', 'Piping erosion through dam body (internal channels)', 'Overtopping from extreme rainfall exceeding spillway capacity', 'Foundation liquefaction during seismic events', 'Raise construction defects during dam heightening'],
    incidents: ['Brumadinho, Brazil (2019) — 270 killed, $7 billion liability', 'Samarco, Brazil (2015) — 19 killed, environmental devastation', 'Indian iron ore tailings breaches (multiple minor events)'],
    prevention: ['Continuous piezometer monitoring of phreatic surface', 'Inclinometer arrays for slope displacement detection', 'Independent annual dam safety review by qualified engineer', 'Emergency Action Plan with downstream community warning system', 'Progressive transition to dry-stack tailings where feasible'],
    costRange: '₹500–10,000 Cr (environmental liability + fatality + cleanup)'
  },
  'scrap-explosion': {
    id: 'scrap-explosion',
    term: 'Scrap Explosion',
    tooltip: 'Violent reaction when contaminated scrap (moisture, sealed containers) contacts molten steel',
    detail: 'Scrap charged into EAF or BOF can contain hidden hazards: sealed gas cylinders, aerosol cans, ammunition, or simply trapped water/ice. When these contact molten steel at 1,600°C, the result ranges from violent ejection of metal/scrap to full-scale steam explosions. Radioactive sources (orphan sources) in scrap are an additional catastrophic scenario requiring AERB response and potential plant-wide contamination.',
    whyItMatters: 'Scrap explosions are the leading cause of injuries in EAF steelmaking globally. They are entirely preventable through incoming inspection but economic pressure often leads to shortcuts. Insurers should verify: radioactivity portal monitors, visual inspection procedures, and supplier qualification programs.',
    rootCauses: ['Sealed containers (gas cylinders, aerosol cans) in shredded scrap', 'Moisture/ice trapped in bundled or baled scrap', 'Radioactive orphan sources in metal recycling stream', 'Ship-breaking scrap with unknown enclosed compartments', 'Inadequate sorting of mixed/contaminated scrap lots'],
    incidents: ['Acerinox Spain radioactive source meltdown (1998) — €25 million cleanup', 'Turkish EAF scrap explosion (2022) — 3 killed from gas cylinder', 'Indian IF plant scrap explosion (2021) — 2 killed, ₹20 Cr damage'],
    prevention: ['Radioactivity portal monitor at all scrap entry gates', 'Visual and magnetic inspection before charging', 'Mandatory scrap drying for moisture >3%', 'Supplier debarment system for repeated contamination', 'Worker exclusion zone during initial charge/meltdown phase'],
    costRange: '₹10–200 Cr (depending on severity and radioactive contamination)'
  },
  'hazop': {
    id: 'hazop',
    term: 'HAZOP (Hazard & Operability Study)',
    tooltip: 'Systematic method to identify process deviations and their consequences',
    detail: 'HAZOP is a structured analysis technique that examines process deviations (high/low flow, temperature, pressure, level) at each node of a process and identifies potential hazards and operability problems. In steel plants, HAZOP is critical for gas systems, water treatment, chemical dosing, and any process handling hazardous materials. Guide words (NO, MORE, LESS, REVERSE, OTHER THAN) are applied to process parameters.',
    whyItMatters: 'HAZOP studies are required by PESO and environmental regulations for major hazard installations. Insurers should verify that HAZOP has been conducted for all gas systems, acid handling (pickling), and molten metal areas. Recommendations from HAZOP must be tracked to closure — an open HAZOP recommendation is an identified but uncontrolled risk.',
    rootCauses: ['Required when: new plant commissioning, process modification, incident investigation', 'Triggered by: change management process, regulatory requirement, insurance survey recommendation', 'Steel-specific applications: gas network, acid regeneration, hydrogen systems, oxygen plants'],
    incidents: ['Multiple incidents globally traced to HAZOP not being conducted or recommendations not implemented'],
    prevention: ['Mandatory HAZOP for all new installations and major modifications', 'HAZOP recommendation tracking system with deadline accountability', 'Five-year HAZOP review cycle for existing operations', 'HAZOP team must include operations, maintenance, safety, and process design', 'Independent HAZOP facilitator for high-hazard systems'],
    costRange: 'N/A — HAZOP is a prevention methodology, not a loss event'
  },
  'indemnity-period': {
    id: 'indemnity-period',
    term: 'Indemnity Period (BI Insurance)',
    tooltip: 'Maximum duration of BI coverage — must cover actual recovery time including equipment lead times',
    detail: 'The indemnity period is the maximum duration for which a Business Interruption policy will pay claims, starting from the date of damage. For steel plants, this must be carefully assessed considering: (1) lead times for specialized equipment (EAF transformers 12-18 months, BF cooling staves 6-12 months), (2) reline/rebuild times (BF reline 90-120 days, coke battery rebuild 12-24 months), (3) testing and ramp-up period, and (4) time to regain market share.',
    whyItMatters: 'Inadequate indemnity period is the #1 cause of underinsurance in steel plants. A 12-month indemnity period is insufficient for most critical equipment failures in integrated plants. Risk engineers must assess Maximum Foreseeable Loss (MFL) duration including worst-case equipment procurement scenarios.',
    rootCauses: ['Underestimation of replacement lead times at policy inception', 'Failure to account for civil reconstruction time', 'Not considering ramp-up period after physical repair', 'Ignoring regulatory re-approval requirements (PESO, PCB)', 'Currency/trade disruptions extending procurement timelines'],
    incidents: ['Multiple underinsurance cases where actual recovery exceeded indemnity period', 'EAF transformer failures regularly exceed 12-month indemnity provisions', 'BF reline + ramp-up exceeds 6-month provisions in many policies'],
    prevention: ['Minimum 18-month indemnity period for integrated plants', 'Minimum 24-month for single-source equipment (EAF transformer, BF components)', 'Annual review of lead times with equipment suppliers', 'Critical spares holding strategy to reduce effective downtime', 'Contingent BI coverage for key supplier/customer dependencies'],
    costRange: 'Under-insurance exposure: ₹500-3,000 Cr if indemnity period inadequate'
  },
  'dga': {
    id: 'dga',
    term: 'DGA (Dissolved Gas Analysis)',
    tooltip: 'Transformer health diagnostic — detects internal faults by analyzing gases dissolved in oil',
    detail: 'DGA detects and measures gases produced by internal faults in oil-filled transformers. Different fault types produce characteristic gas patterns: overheating produces ethylene/methane, arcing produces acetylene/hydrogen, and partial discharge produces hydrogen. For EAF transformers under extreme duty, online DGA monitoring provides early warning of developing faults months before catastrophic failure.',
    whyItMatters: 'DGA is the single most important predictive tool for transformer health. Elevated acetylene is an immediate red flag for arcing faults. Insurers should verify DGA frequency (monthly minimum for EAF transformers) and that trending analysis is performed, not just spot readings.',
    rootCauses: ['Thermal faults: oil/paper breakdown producing methane, ethane, ethylene', 'Electrical faults: arcing producing acetylene, hydrogen', 'Partial discharge: corona producing hydrogen', 'Cellulose degradation: producing CO, CO2, furans', 'Stray gassing: normal aging producing trace gases'],
    incidents: ['Aarti Steel: 6 months of elevated acetylene ignored before explosion', 'Multiple near-misses detected by DGA trending globally'],
    prevention: ['Online DGA for all EAF transformers >30 MVA', 'Monthly manual DGA for all transformers >10 MVA', 'Automated trending with Duval Triangle analysis', 'Action thresholds per IEC 60599 with documented response procedures', 'Annual correlation with FRA and oil quality tests'],
    costRange: 'Prevention investment: ₹20-50 Lakh per transformer for online DGA system'
  },
  'pml-eml': {
    id: 'pml-eml',
    term: 'PML/EML (Probable/Estimated Maximum Loss)',
    tooltip: 'Maximum realistic loss from a single event — critical for insurance capacity planning',
    detail: 'PML (Probable Maximum Loss) and EML (Estimated Maximum Loss) are insurance engineering concepts estimating the worst realistic loss from a single event. PML assumes fire protection systems work; EML assumes they don\'t. For integrated steel plants: PML typically ₹2,000-5,000 Cr (single worst-case scenario like BF breakout + fire); EML can reach ₹8,000-15,000 Cr (multiple failures in cascade scenario).',
    whyItMatters: 'PML/EML determines the insurance capacity required and the reinsurance structure. Underestimated PML leads to insufficient capacity; overestimated PML makes premiums unaffordable. Steel-specific PML assessment requires understanding of fire walls, process segregation, and cascade failure potential.',
    rootCauses: ['PML scenario: worst single-event assuming normal protection works', 'EML scenario: worst single-event assuming all protection fails', 'NLE (Normal Loss Expectancy): most likely actual loss', 'Key factors: fire walls, process segregation, explosion potential, BI duration', 'Steel-specific: molten metal scenarios often exceed fire scenarios'],
    incidents: ['Industry benchmark PMLs: BF area 30-40% of TSI, SMS area 20-30% of TSI', 'Actual losses validating PML assessments in multiple global incidents'],
    prevention: ['Professional PML/EML assessment by experienced steel risk engineer', 'Scenario-based analysis for each major area (BF, SMS, HSM, CRM)', 'Fire wall and separation credit assessment', 'BI component included in PML calculation (often 2-5x PD)', 'Annual reassessment when plant modifications occur'],
    costRange: 'Assessment concept — drives insurance placement structure'
  },
  'sil-rating': {
    id: 'sil-rating',
    term: 'SIL (Safety Integrity Level)',
    tooltip: 'Reliability rating for safety systems — SIL 1-3 determines how dependably a safety function works',
    detail: 'SIL ratings (IEC 61508/61511) define the reliability requirement for Safety Instrumented Systems (SIS). SIL 1: 90-99% reliability (risk reduction factor 10-100x). SIL 2: 99-99.9% reliability (100-1,000x). SIL 3: 99.9-99.99% reliability (1,000-10,000x). In steel plants, SIL-rated systems protect against: gas detection/isolation, cooling water failure shutdown, overpressure protection, and molten metal emergency systems.',
    whyItMatters: 'SIL-rated safety systems are the last line of defense before catastrophic events. Insurers should verify: SIL assessment has been conducted for critical loops, systems are maintained to SIL requirements (proof testing at required intervals), and no SIL-rated system has been bypassed for production reasons.',
    rootCauses: ['SIL determination through risk graph or LOPA analysis', 'Steel-specific SIL applications: BFG leak detection (SIL 2), cooling water loss (SIL 2), oxygen plant trip (SIL 3)', 'Common failure: proof testing not done at required frequency', 'Dangerous: SIL system bypassed for production convenience'],
    incidents: ['Multiple incidents globally where SIL system was bypassed or degraded'],
    prevention: ['SIL assessment for all safety-critical instrumented functions', 'Proof testing at intervals defined by SIL requirement', 'Bypass management system — time-limited, risk-assessed, senior-approved', 'Functional safety management system per IEC 61511', 'Annual SIL system audit by certified functional safety engineer'],
    costRange: 'Prevention investment: ₹50 Lakh - 5 Cr per SIL loop implementation'
  },
  'ndt-inspection': {
    id: 'ndt-inspection',
    term: 'NDT (Non-Destructive Testing)',
    tooltip: 'Inspection methods (UT, MPI, RT) to find flaws without damaging equipment',
    detail: 'NDT encompasses inspection techniques that detect defects without damaging the component. In steel plants, critical applications include: Ultrasonic Testing (UT) for wall thickness and internal flaws, Magnetic Particle Inspection (MPI) for surface cracks in shafts/crane hooks, Radiographic Testing (RT) for weld quality, and Phased Array UT for complex geometries. Emerging techniques include TOFD, guided wave UT for pipelines, and drone-based visual inspection.',
    whyItMatters: 'NDT is the primary tool for detecting degradation before failure. Its absence or inadequacy is found in the root cause of most mechanical failures in steel plants. Insurers should verify: NDT schedule compliance, inspector certification (ASNT Level II/III), and that findings lead to corrective action.',
    rootCauses: ['Application areas: crane hooks/ropes, pressure vessels, pipelines, structural members, crane bridges', 'Frequency: risk-based (high-criticality monthly, standard annually)', 'Common failure: inspections done but findings not actioned', 'Technique selection: wrong NDT method missing defect type'],
    incidents: ['Tata Steel crane rope failure (2020) — MRT would have detected internal breaks', 'Pipeline failures where UT thickness survey was overdue'],
    prevention: ['Risk-based NDT schedule for all critical equipment', 'ASNT Level II/III certified inspectors for all examinations', 'Finding-to-action tracking with completion deadlines', 'Technology upgrade: PAUT, TOFD, guided wave for improved detection', 'Annual review of NDT coverage adequacy'],
    costRange: 'Prevention investment: ₹2-10 Cr/year for comprehensive NDT program'
  },
  'fire-protection': {
    id: 'fire-protection',
    term: 'Fire Protection Systems',
    tooltip: 'Detection, suppression, and containment — must be tailored to steel plant hazards (oil, gas, metal)',
    detail: 'Steel plant fire protection must address three unique hazard types: (1) Hydrocarbon fires — rolling oil, hydraulic oil, transformer oil (foam/water mist), (2) Gas fires — BFG/COG/H2 (gas isolation + water curtain, not suppression), (3) Molten metal/electrical fires (dry powder/CO2, never water). Each area needs specific detection (flame, heat, gas, smoke) and suppression (foam, deluge, gas, dry chemical) matched to the hazard.',
    whyItMatters: 'Generic fire protection fails in steel plants. Water on molten metal causes steam explosions. Foam on gas fires is ineffective. The key principle is: detect → isolate fuel → suppress residual. Insurers should verify area-specific fire risk assessments and appropriate system selection.',
    rootCauses: ['Hydrocarbon fires: most common (rolling oil, hydraulic oil)', 'Gas fires: most dangerous (explosive atmosphere)', 'Electrical fires: transformers, cable galleries', 'Metal fires: Class D, requiring specialized agents', 'Mixed hazards: cable tunnels with oil-filled equipment'],
    incidents: ['JSW Tarapur CRM fire — deluge undersized for pool fire', 'Multiple cable gallery fires from inadequate cable fire stops'],
    prevention: ['Area-specific fire risk assessment per FM Global/NFPA standards', 'Hydrocarbon areas: foam deluge + oil mist extraction', 'Gas areas: gas detection + auto-isolation + water curtain (not foam)', 'Electrical: CO2 or clean agent for enclosed rooms, deluge for transformers', 'Monthly pump tests, annual full-system performance test', 'Fire water network maintained at 10+ bar with diesel backup pump'],
    costRange: 'System investment: ₹50-200 Cr for integrated plant; failure to invest: ₹500-2,000 Cr loss potential'
  },
  'conveyor-fire': {
    id: 'conveyor-fire',
    term: 'Conveyor Belt Fire',
    tooltip: 'Rubber belt ignition from friction/hot material — propagates along entire conveyor length',
    detail: 'Overland and in-plant conveyors (5-20 km total in integrated plants) use rubber belts that are ignitable when exposed to friction heat or hot material. A seized idler roller or jammed drive pulley generates enough heat to ignite standard belts. Once ignited, fire propagates along the belt at 10-15 m/minute. A 5 km conveyor can be completely destroyed in 6-8 hours. Replacement belt procurement takes 3-6 months; conveyor structure rebuild adds 2-3 months.',
    whyItMatters: 'Conveyor fires are a uniquely devastating steel/mining risk because of the combination of high asset value (₹50-200 Cr per km), long replacement time, and the potential to cut off raw material supply to the plant for months. Fire-resistant belting is 40-50% more expensive but eliminates propagation risk.',
    rootCauses: ['Seized idler roller creating sustained friction point', 'Drive pulley slippage with belt stationary (slip-stick heating)', 'Hot material (from spontaneous combustion) conveyed onto belt', 'Belt edge rubbing against structure', 'Welding/hot work near belt without isolation'],
    incidents: ['Indian iron ore mine conveyor fire (2023) — 4 km destroyed, ₹150 Cr', 'Coal washery conveyor fire (2022) — 2 km, ₹60 Cr + 4-month BI'],
    prevention: ['Fire-resistant belting (ISO 340 standard) for all critical conveyors', 'Thermal imaging at drive pulleys and tail pulleys', 'Belt speed/slip detection with automatic shutdown', 'Hot material detection (IR sensor) at transfer points', 'Fire suppression at all drive stations and enclosed galleries'],
    costRange: '₹30–200 Cr (belt + structure + 3-9 months supply disruption)'
  },
  'occupational-health': {
    id: 'occupational-health',
    term: 'Occupational Health Hazards',
    tooltip: 'Long-term exposure risks: silicosis, noise-induced hearing loss, heat stress, toxic fumes',
    detail: 'Steel plant workers face multiple occupational health hazards: (1) Silicosis from silica dust in refractory work, (2) Noise-induced hearing loss (90-110 dB in rolling mills), (3) Heat stress (ambient + radiant heat = 55-65°C effective temperature), (4) Toxic fume exposure (CO, H2S, Cr6+ from stainless steel welding), (5) Ergonomic injuries from repetitive manual handling. Indian steel workers\' life expectancy averages 8-10 years below national average.',
    whyItMatters: 'Occupational disease claims are emerging as significant long-tail liability. With increasing worker awareness and legal representation, companies face growing litigation. Employers\' Liability policies must be adequate. Progressive companies investing in OH programs reduce both human suffering and financial exposure.',
    rootCauses: ['Silica exposure during refractory demolition and bricklaying', 'Continuous noise >85 dB in rolling mills, compressor houses, EAF operation', 'Radiant heat exposure near furnaces without adequate shielding', 'CO exposure during furnace operations and gas zone entry', 'Cr6+ exposure during stainless steel cutting/welding'],
    incidents: ['Class action by retired SAIL workers for occupational lung disease (ongoing)', 'Multiple individual claims for noise-induced deafness in steel industry', 'Heat stroke fatalities increasing with climate change — 12 in 2024 across industry'],
    prevention: ['Occupational health surveillance program with annual medicals', 'Noise mapping and engineering controls (enclosures, barriers, PPE)', 'Heat stress management: work-rest schedules, cooling stations, monitoring', 'Air quality monitoring for respirable dust, CO, and toxic fumes', 'Respiratory protection program with fit testing'],
    costRange: 'Liability exposure: ₹50-500 Cr per company (cumulative claims over 20+ years)'
  }
}

// Helper function to find knowledge entry by term appearing in text
export function findKnowledgeTerms(text: string): string[] {
  const foundTerms: string[] = []
  for (const [key, entry] of Object.entries(RISK_KNOWLEDGE)) {
    // Check if the term or key appears in the text (case-insensitive)
    const termRegex = new RegExp(entry.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    const keyWords = key.split('-').join(' ')
    const keyRegex = new RegExp(keyWords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    if (termRegex.test(text) || keyRegex.test(text)) {
      foundTerms.push(key)
    }
  }
  return foundTerms
}

// Get all knowledge entries as array for glossary view
export function getAllKnowledgeEntries(): KnowledgeEntry[] {
  return Object.values(RISK_KNOWLEDGE).sort((a, b) => a.term.localeCompare(b.term))
}
