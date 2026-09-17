// Hospitality Industry Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const HOSPITALITY_RISK_SOURCES: RiskSource[] = [
  {
    id: 'hotels-resorts',
    label: 'Hotels & Resorts',
    icon: '🏨',
    color: '#b45309',
    bannerImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    bannerTitle: 'Hotels, Resorts & Accommodation',
    bannerSubtitle: 'Fire & life safety, natural disaster, guest liability, and property damage — where guest safety is paramount and brand is everything.',
    aogPerils: [
      {
        id: 'ht-aog-1',
        title: 'Earthquake — Structural Collapse & Guest Safety',
        severity: 'critical',
        description: 'Hotels (5-50 floors, 100-1,000 guests sleeping) face unique earthquake risk: guests unfamiliar with building layout, nighttime occupancy (highest vulnerability), older heritage properties with inadequate seismic design, and swimming pool sloshing/overflow. The 2015 Nepal earthquake destroyed 300+ hotels. Indian hill-station hotels (Uttarakhand, HP, Kashmir) are in Zone IV-V with many structures pre-dating seismic codes.',
        impactAreas: ['Structural Collapse (guest fatalities)', 'Guest Evacuation Challenge', 'Heritage Property Damage', 'Pool/Spa Structural Failure', 'Multi-Month Closure for Assessment'],
        typicalClaim: '₹50–1,000 Cr (property + liability + BI)'
      },
      {
        id: 'ht-aog-2',
        title: 'Flood / Cyclone — Coastal Resort & Urban Hotel',
        severity: 'high',
        description: 'Coastal resorts (Goa, Kerala, Andaman) face cyclone/tidal surge damage. Urban hotels in flood-prone cities (Mumbai, Chennai, Hyderabad) suffer basement flooding destroying M&E infrastructure. The 2018 Kerala floods damaged 200+ hospitality properties. Guest stranding during floods creates duty-of-care liability. Monsoon-season cancellations compound with physical damage.',
        impactAreas: ['Basement M&E Destruction', 'Guest Stranding Liability', 'Coastal Erosion Damage', 'Extended Closure (refurbishment)', 'Cancellation/Reputation Impact'],
        typicalClaim: '₹20–200 Cr + 3-12 months BI'
      }
    ],
    nonAogPerils: [
      {
        id: 'ht-naog-1',
        title: 'Hotel Fire — Guest Life Safety',
        severity: 'critical',
        description: 'Hotel fires with sleeping guests are among the deadliest building fires. The 2019 Hotel Arpit Palace (Delhi, 17 killed) demonstrated: locked rooftop exits, non-functional fire systems, and illegal construction. Indian hotels below 5-star have widespread fire safety non-compliance. Fire in a 100+ room hotel with 200+ sleeping guests creates mass casualty potential. The 26/11 Taj Mumbai fire demonstrated total property destruction potential (₹500+ Cr).',
        impactAreas: ['Guest Fatalities', 'Mass Evacuation', 'Complete Property Destruction', 'Brand Destruction', 'Criminal Prosecution of Management'],
        typicalClaim: '₹50–1,000 Cr (property + liability + brand)'
      },
      {
        id: 'ht-naog-2',
        title: 'Kitchen / Restaurant Fire',
        severity: 'high',
        description: 'Hotel kitchens operate 16-20 hours/day with: open flames, deep fryers (180-200°C), cooking oils, exhaust hoods accumulating grease, and LPG/PNG piping. Grease fire in exhaust duct propagates to roof space above kitchen. Kitchen fires are the #1 cause of hotel property claims globally. A Michelin-star restaurant fire: ₹5-20 Cr damage + 3-6 months closure + reputation.',
        impactAreas: ['Exhaust Duct Grease Fire', 'Deep Fryer Flash Fire', 'LPG Leak/Explosion', 'Restaurant Closure', 'Smoke Damage to Guest Rooms'],
        typicalClaim: '₹5–50 Cr + 2-6 months BI'
      },
      {
        id: 'ht-naog-3',
        title: 'Guest Injury / Death — Liability Claims',
        severity: 'high',
        description: 'Hotels face diverse liability: swimming pool drowning (children), food poisoning outbreaks, elevator/escalator accidents, slip & fall, Legionella from cooling towers/hot water systems, and gym equipment injuries. Foreign tourist fatalities trigger international media coverage and cross-border litigation. Duty-of-care standard for hotels is higher than most businesses — guests are "invitees" owed highest level of care.',
        impactAreas: ['Guest Fatality/Serious Injury', 'Food Poisoning Outbreak', 'Legionella Exposure', 'Foreign Tourist Incident (international media)', 'Class Action (wedding/event)'],
        typicalClaim: '₹5–100 Cr per serious incident'
      },
      {
        id: 'ht-naog-4',
        title: 'Terrorism / Active Shooter — Security Event',
        severity: 'critical',
        description: 'Luxury hotels are terrorist targets (26/11 Mumbai Taj/Oberoi — 166 fatalities). Hotel lobbies are open, accessible, high-profile targets. Post-26/11 security investment (₹10-50 Cr per luxury hotel) includes: vehicle barriers, baggage screening, armed guards, and CCTV. However, mid-market hotels have minimal security. A terrorism event destroys the hotel brand for years and triggers sector-wide impact.',
        impactAreas: ['Guest/Staff Fatalities', 'Property Destruction', 'Brand Destruction (years)', 'Sector-Wide Tourism Impact', 'Insurance Market Hardening'],
        typicalClaim: '₹500–5,000 Cr (property + liability + BI + brand recovery)'
      }
    ],
    riskMatrix: [
      { risk: 'Hotel Fire (Guest Safety)', prob: 2, impact: 3, score: 6, emv: '₹500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-101', strategyTooltip: 'NFPA 101 Life Safety + sprinkler + smoke detection + evacuation plan + fire drill', owner: 'General Manager', trigger: 'ANY fire alarm activation or fire system impairment' },
      { risk: 'Terrorism/Security Event', prob: 1, impact: 3, score: 3, emv: '₹2,500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.interpol.int', strategyTooltip: 'Layered security + intelligence sharing + crisis response team + terrorism insurance', owner: 'Chief Security Officer', trigger: 'Intelligence alert or suspicious activity report' },
      { risk: 'Kitchen Fire', prob: 3, impact: 2, score: 6, emv: '₹28 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-96', strategyTooltip: 'NFPA 96 hood suppression + duct cleaning quarterly + deep fryer controls', owner: 'Executive Chef', trigger: 'Hood cleaning overdue or fryer temperature alarm' },
      { risk: 'Guest Liability (Serious)', prob: 2, impact: 2, score: 4, emv: '₹53 Cr', strategy: 'Transfer', strategyUrl: 'https://www.agcs.allianz.com', strategyTooltip: 'Public liability insurance + pool safety + Legionella testing + food safety HACCP', owner: 'Hotel Manager', trigger: 'ANY guest injury report or illness cluster' },
      { risk: 'Flood/Cyclone Damage', prob: 2, impact: 2, score: 4, emv: '₹110 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Property + BI insurance + business continuity plan + guest evacuation protocol', owner: 'Chief Engineer', trigger: 'Cyclone/flood warning for hotel location' },
    ],
    caseStudy: {
      title: 'Hotel Arpit Palace, Delhi — Fire Kills 17 Guests',
      location: 'Hotel Arpit Palace, Karol Bagh, New Delhi',
      date: 'February 2019',
      loss: '17 fatalities + property damage + criminal prosecution',
      rootCause: 'Fire started in the ground-floor restaurant kitchen from a short circuit at 4:30 AM. Fire spread rapidly through: illegal wooden paneling on walls and ceiling, absence of sprinkler system, blocked emergency exits (only 1 of 3 staircases usable), and rooftop exit permanently locked. Smoke filled corridors within minutes. 17 sleeping guests died from smoke inhalation — many found trying to break through locked doors. The hotel was operating without: fire NOC, proper exits, sprinklers, or fire-rated construction.',
      impact: '17 guest fatalities (including 2 foreign tourists). Hotel permanently closed. Owner/manager arrested for culpable homicide (IPC 304). Delhi Government ordered fire safety audit of ALL Karol Bagh hotels (2,000+). 200+ hotels shut temporarily for non-compliance. Tourism to Delhi budget hotels impacted for 6 months. Criminal liability for hotel operators established in precedent.',
      lessons: [
        'Fire NOC compliance is NOT optional — operating without is criminal negligence',
        'Sprinkler system mandatory for ALL hotels >15m height (NBC requirement)',
        'Emergency exits must be PERMANENTLY accessible — locked exits = criminal liability for management',
        'Guest room corridors: maximum 30m to nearest exit (NFPA 101)',
        'Self-closing fire doors on all staircase entries — prevent smoke spread to vertical escape routes',
        'Annual fire drill at 4 AM (testing night-time evacuation when staff is minimal)',
        'Third-party fire safety audit annually — not self-certification by hotel'
      ],
      benchmark: 'ITC Hotels (India): zero fire-related guest injuries in 50 years through: 100% sprinkler coverage, NFPA 101 compliance, quarterly fire drills (including 4 AM tests), and independent third-party annual audit. Total fire safety investment: ₹5-15 Cr per hotel per year. Lives saved: immeasurable.'
    },
    emergingRisks: [
      {
        id: 'ht-er-1',
        title: 'Climate Change — Destination Viability & Property Risk',
        category: 'climate',
        severity: 'high',
        timeline: '2024-2035',
        description: 'Climate change threatens hospitality through: sea-level rise affecting coastal properties (Maldives, Goa beaches), extreme heat making outdoor tourism unviable (Rajasthan summer already 48°C+), glacier retreat closing mountain destinations (Sikkim, Ladakh), and water scarcity forcing hotel closures (Shimla 2018 water crisis). Hotels in vulnerable locations face stranded asset risk over 10-20 year horizon.',
        implications: ['Coastal property erosion/submersion', 'Heat making destinations unviable for tourism', 'Water scarcity forcing operational restrictions', 'Increasing natural disaster frequency/intensity', 'Insurance retreat from climate-vulnerable locations']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'ht-ni-1',
        title: 'Pandemic/Epidemic — Demand Collapse',
        category: 'Macro / Health',
        description: 'COVID-19 demonstrated existential pandemic risk: 80% occupancy drop sustained for 18 months. Indian hospitality lost ₹1.5 Lakh Cr in revenue (2020-21). Hotels with high fixed costs (staff, lease, maintenance) generated negative cash flow for extended periods. Many budget/mid-scale hotels permanently closed. No insurance product covered pandemic-driven demand collapse at scale.',
        mitigation: 'Diversified revenue (residential, co-working, dark kitchens), flexible cost structure, strong balance sheet (18-month cash reserve), management contracts over ownership (lower fixed cost), health & hygiene protocols for rapid trust recovery',
        exposure: '₹50,000-1,50,000 Cr industry-wide per pandemic event'
      },
      {
        id: 'ht-ni-2',
        title: 'OTA/Aggregator Dominance & Commission Pressure',
        category: 'Market / Digital',
        description: 'Online Travel Agencies (MakeMyTrip, Booking.com, OYO) command 15-25% commission on hotel revenue. Shift from direct bookings to OTA bookings compresses hotel margins. OYO-style aggregators impose pricing/branding control. Hotels losing direct customer relationships become commodity suppliers. Rate parity clauses prevent hotels from pricing lower on own website.',
        mitigation: 'Direct booking investment (loyalty programs, own app/website), unique experience differentiation, corporate/MICE direct contracts, rate parity challenge through industry body, hybrid distribution strategy',
        exposure: '₹200-500 Cr/year commission burden per large hotel chain'
      }
    ],
    bestPractices: [
      {
        id: 'ht-bp-1',
        title: 'Hotel Fire & Life Safety',
        standard: 'NFPA 101 (Life Safety) + NBC India 2016 + ITC Hotels Standard + Marriott Fire Safety',
        description: 'Protecting sleeping guests — the highest duty-of-care standard in commercial property.',
        recommendations: [
          'Sprinkler protection: 100% coverage including guest rooms, corridors, storage, and parking',
          'Smoke detection: in every guest room + corridor + public area (addressable system)',
          'Emergency exits: minimum 2 per floor, permanently accessible, illuminated signage',
          'Guest room door: self-closing, fire-rated 30 minutes minimum, with peephole',
          'Quarterly fire drill including one at 4 AM (testing night evacuation with minimal staff)',
          'Kitchen hood suppression: NFPA 96 wet chemical system with quarterly duct cleaning',
          'Annual third-party fire safety audit (not self-certification)',
          'Staff training: every employee knows fire response, evacuation route, and guest assistance role'
        ],
        benchmark: 'ITC Hotels: 50 years, zero fire-related guest injuries — through NFPA 101 compliance, 100% sprinkler, quarterly drills (including 4 AM), and ₹5-15 Cr/year/hotel fire safety investment. The Indian hotel industry gold standard.'
      }
    ]
  },
  {
    id: 'restaurants-qsr',
    label: 'Restaurants & QSR',
    icon: '🍽️',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    bannerTitle: 'Restaurants, QSR & Food Service',
    bannerSubtitle: 'Commercial kitchens, cloud kitchens, and food delivery — fire from cooking, food safety liability, and gas hazards.',
    aogPerils: [
      {
        id: 'rst-aog-1',
        title: 'Flood — Restaurant & Cloud Kitchen Damage',
        severity: 'medium',
        description: 'Ground-floor and basement restaurants/cloud kitchens flood during intense urban rainfall. Kitchen equipment (deep fryers, ovens, refrigeration), food inventory, and interior furnishing destroyed. Cloud kitchen clusters (10-50 units in single building) face concentrated loss. Basements with LPG connections create explosion risk when floodwater rises around gas lines.',
        impactAreas: ['Kitchen Equipment Submersion', 'Food Inventory Total Loss', 'Interior Furnishing Damage', 'LPG System Hazard', 'Extended Closure (refurbishment)'],
        typicalClaim: '₹1–20 Cr per location'
      }
    ],
    nonAogPerils: [
      {
        id: 'rst-naog-1',
        title: 'Restaurant Kitchen Fire — Exhaust Hood/Duct',
        severity: 'high',
        description: 'Restaurant kitchen fires are the #1 fire cause in hospitality. Grease accumulation in exhaust hoods and ducts (if not cleaned quarterly) ignites from cooking flames or fryer oil splash. Duct fires propagate to roof space and adjacent premises rapidly. LPG-connected kitchens add explosion risk. The 2024 Rajkot game zone fire (27 killed) started from restaurant kitchen exhaust spreading to entertainment space above.',
        impactAreas: ['Exhaust Duct Fire Propagation', 'LPG Explosion', 'Adjacent Premises Spread', 'Customer/Staff Injuries', 'Multi-Fatality Potential'],
        typicalClaim: '₹5–50 Cr + liability'
      },
      {
        id: 'rst-naog-2',
        title: 'Food Poisoning Outbreak — Mass Customer Illness',
        severity: 'high',
        description: 'A single food poisoning outbreak (Salmonella, E.coli, Norovirus) from: contaminated ingredients, improper storage temperature, cross-contamination, or sick worker handling food can affect 50-500+ customers. Social media amplification turns individual cases into viral brand crisis within hours. The 2022 Bengaluru restaurant chain outbreak (200+ customers) resulted in ₹10 Cr losses and permanent closure of 3 outlets.',
        impactAreas: ['Mass Customer Illness', 'FSSAI License Suspension', 'Social Media Brand Crisis', 'Litigation (class action)', 'Outlet Closure/Brand Abandonment'],
        typicalClaim: '₹5–50 Cr (litigation + regulatory + brand + closure)'
      },
      {
        id: 'rst-naog-3',
        title: 'LPG/PNG Gas Leak & Explosion',
        severity: 'critical',
        description: 'Indian restaurants predominantly use LPG (piped or cylinder) for cooking. Gas leaks from: deteriorated hoses, loose regulators, cylinder valve failure, or piped gas joint failure. LPG (heavier than air) accumulates in enclosed/basement kitchens reaching explosive concentration undetected. A single cylinder explosion in an occupied restaurant: 20-50 potential casualties. Multiple restaurant gas explosions in India annually.',
        impactAreas: ['Gas Explosion', 'Building Collapse', 'Multi-Fatality Event', 'Adjacent Property Damage', 'Criminal Liability'],
        typicalClaim: '₹10–100 Cr + fatality liability'
      }
    ],
    riskMatrix: [
      { risk: 'Kitchen Duct Fire', prob: 3, impact: 2, score: 6, emv: '₹28 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-96', strategyTooltip: 'NFPA 96 suppression + quarterly professional duct cleaning + K-class extinguishers', owner: 'Restaurant Manager', trigger: 'Duct cleaning overdue or visible grease accumulation' },
      { risk: 'LPG Explosion', prob: 2, impact: 3, score: 6, emv: '₹55 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.bharatgas.in/safety', strategyTooltip: 'Gas leak detection + auto shut-off valve + ventilation + annual piping inspection', owner: 'Chef/Manager', trigger: 'Gas odor detection or sensor alarm' },
      { risk: 'Food Poisoning Outbreak', prob: 2, impact: 2, score: 4, emv: '₹28 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fssai.gov.in', strategyTooltip: 'HACCP + cold chain monitoring + staff health checks + ingredient traceability', owner: 'Food Safety Officer', trigger: 'ANY customer illness complaint or temperature excursion' },
    ],
    caseStudy: {
      title: 'Rajkot Game Zone Fire — Restaurant Kitchen Origin',
      location: 'TRP Game Zone, Rajkot, Gujarat',
      date: 'May 2024',
      loss: '27 fatalities + property destruction + criminal cases',
      rootCause: 'Fire originated in the ground-floor restaurant kitchen exhaust duct (grease accumulation — not cleaned for 6+ months). Fire propagated through the exhaust system to the roof space where it spread to the first-floor game zone (trampolines, synthetic material — highly combustible). The game zone had: no fire detection, no sprinklers, only one exit staircase, and was above legal occupancy. 27 people (including children) trapped on the first floor died from smoke inhalation and burns.',
      impact: '27 fatalities including 12 children. Building demolished. Owner and architect arrested (culpable homicide). Gujarat Government ordered fire safety audit of ALL commercial entertainment venues. National outrage and media coverage. Building permission and fire NOC process scrutinized. Insurance claims complicated by illegal construction and missing fire NOC.',
      lessons: [
        'Exhaust duct cleaning: quarterly MANDATORY for all commercial kitchens (documented)',
        'Fire detection and sprinkler in ALL occupied spaces above/adjacent to kitchens',
        'Minimum 2 independent exits for any space with >50 occupants',
        'Combustible interior materials (foam, synthetic fabric) prohibited without fire-retardant treatment',
        'Mixed-use buildings (restaurant + entertainment): highest fire protection standard applies to entire building',
        'Fire NOC verification before insurance: no NOC = no coverage (or loaded premium with warranty)',
        'Occupancy limits must be enforced — particularly for children\'s entertainment venues'
      ],
      benchmark: 'McDonald\'s India: NFPA 96 kitchen suppression in ALL outlets, quarterly professional duct cleaning (documented with video), and zero tolerance for expired fire equipment — zero kitchen fires resulting in customer injury across 350+ outlets.'
    },
    emergingRisks: [
      {
        id: 'rst-er-1',
        title: 'Cloud Kitchen Concentration — Multi-Brand Single-Location Risk',
        category: 'market',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'Cloud kitchen model concentrates 10-30 restaurant brands in single commercial kitchen (500-3,000 sq ft). A single fire/contamination event shuts ALL brands simultaneously. These operate in industrial/commercial zones without restaurant-grade fire protection. LPG usage at industrial scale in non-purpose-built spaces creates heightened gas explosion risk. No specific fire code for cloud kitchens exists in India.',
        implications: ['Multi-brand simultaneous shutdown from single event', 'Non-purpose-built spaces with inadequate fire protection', 'LPG at industrial scale in commercial buildings', 'Food contamination affecting multiple brand simultaneously', 'Regulatory ambiguity (restaurant or food factory classification?)']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'rst-ni-1',
        title: 'Food Delivery Platform Dependency & Commission',
        category: 'Market / Digital',
        description: 'Restaurants depend on Zomato/Swiggy for 30-70% of revenue (delivery orders). Platform commission: 20-30% + GST. Listing algorithm changes can bury a restaurant overnight. Rating manipulation by competitors or single viral negative review destroys order volume. Restaurants have minimal bargaining power vs duopoly platforms.',
        mitigation: 'Direct ordering channel (own app/WhatsApp), dine-in experience differentiation, loyal customer database, multiple platform presence, unique products not available elsewhere, subscription/membership model',
        exposure: '₹50-200 Lakh/year per restaurant from platform dependency (commission + algorithm risk)'
      }
    ],
    bestPractices: [
      {
        id: 'rst-bp-1',
        title: 'Commercial Kitchen Fire Safety',
        standard: 'NFPA 96 (Cooking Ventilation) + NBC India + FSSAI + McDonald\'s/YUM Global Standard',
        description: 'Preventing the #1 fire cause in hospitality and food service — kitchen grease/oil fires.',
        recommendations: [
          'Wet chemical hood suppression system (auto + manual activation) over all cooking lines',
          'Professional exhaust duct cleaning: quarterly with video documentation and certificate',
          'K-class fire extinguishers within 5m of all cooking stations (NOT ABC powder on grease)',
          'LPG gas detection with automatic solenoid shut-off valve at entry point',
          'Deep fryer temperature interlock: automatic shut-off at 200°C (no override)',
          'Fire blanket at every cooking station for small oil fire suppression',
          'Staff fire training: monthly with emphasis on grease fire response (NEVER use water)',
          'Annual fire risk assessment by qualified assessor for fire NOC compliance'
        ],
        benchmark: 'McDonald\'s/KFC India: NFPA 96 in every outlet, quarterly documented duct cleaning, monthly staff training — zero customer injury from fire across 1,000+ outlets combined. Investment: ₹3-5 Lakh/year per outlet. Risk prevented: ₹5-50 Cr per fire event.'
      }
    ]
  },
  {
    id: 'tourism-travel',
    label: 'Tourism & Travel',
    icon: '🌍',
    color: '#4CAF50',
    bannerImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
    bannerTitle: 'Tourism, Travel & Experiences',
    bannerSubtitle: 'Tour operators, adventure tourism, events, and wellness — guest safety, natural hazards, and liability in uncontrolled environments.',
    aogPerils: [
      {
        id: 'tour-aog-1',
        title: 'Natural Disaster — Tourist Destination Event',
        severity: 'critical',
        description: 'Tourists in unfamiliar environments face amplified natural disaster risk: Uttarakhand flash floods (2013: 10,000+ tourists stranded), Tsunami (2004: 100,000+ tourists affected globally), earthquake in heritage cities (Nepal 2015: 1,000+ tourists affected). Tour operators face duty-of-care liability for tourist safety during natural disasters in their itinerary destinations.',
        impactAreas: ['Tourist Fatalities/Injuries', 'Mass Stranding (rescue cost)', 'Tour Operator Liability', 'Cancellation/Refund Obligation', 'Destination Brand Damage'],
        typicalClaim: '₹10–500 Cr (rescue + liability + refunds + reputation)'
      }
    ],
    nonAogPerils: [
      {
        id: 'tour-naog-1',
        title: 'Adventure Tourism Accident — Duty of Care',
        severity: 'high',
        description: 'Adventure tourism (river rafting, bungee jumping, paragliding, trekking) in India operates with minimal regulation and safety standards. Operator negligence (untrained guides, defective equipment, overcrowding) causes 50-100 tourist fatalities annually in India. The 2022 Rishikesh rafting deaths, 2023 Manali paragliding fatal accident, and multiple trekking deaths demonstrate systemic safety gaps. Liability falls on tour operator.',
        impactAreas: ['Tourist Fatality/Serious Injury', 'Criminal Prosecution of Operator', 'Tourism Activity Ban (regulatory)', 'Destination Reputation Damage', 'Insurance Premium Escalation'],
        typicalClaim: '₹5–50 Cr per serious incident'
      },
      {
        id: 'tour-naog-2',
        title: 'Event/MICE Safety Failure — Crowd Crush/Fire',
        severity: 'critical',
        description: 'Large events (concerts, weddings, corporate conferences) in hotels/venues face: crowd crush from overcapacity, fire from decorative materials/pyrotechnics, structural collapse from overloaded stages, and food poisoning from mass catering. The 2023 Hathras stampede (121 killed) and 2024 Rajkot fire demonstrate how quickly events become fatal when safety is ignored. Hotels hosting events bear premises liability.',
        impactAreas: ['Crowd Crush/Stampede', 'Event Venue Fire', 'Stage/Structure Collapse', 'Mass Food Poisoning', 'Liability for Hotel/Venue Owner'],
        typicalClaim: '₹20–500 Cr (fatality liability + property + regulatory + brand)'
      }
    ],
    riskMatrix: [
      { risk: 'Adventure Tourism Accident', prob: 3, impact: 2, score: 6, emv: '₹28 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.adventuretravel.biz/education/safety', strategyTooltip: 'Safety standards + certified guides + equipment inspection + medical backup + insurance', owner: 'Tour Operator', trigger: 'ANY near-miss or equipment defect identified' },
      { risk: 'Event Safety Failure', prob: 2, impact: 3, score: 6, emv: '₹260 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.nfpa.org/codes-and-standards/nfpa-102', strategyTooltip: 'Occupancy limits + fire-retardant decor + exit management + crowd monitoring', owner: 'Event/Venue Manager', trigger: 'Occupancy exceeding capacity or exit blockage observed' },
      { risk: 'Natural Disaster (Tourism)', prob: 2, impact: 2, score: 4, emv: '₹55 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Tour operator liability insurance + traveler insurance + emergency evacuation plan', owner: 'Tour Operations Head', trigger: 'Weather/disaster warning for active tour destinations' },
    ],
    caseStudy: {
      title: 'Hathras Stampede — Event Management Failure',
      location: 'Religious gathering, Hathras, Uttar Pradesh',
      date: 'July 2024',
      loss: '121 fatalities + criminal prosecution',
      rootCause: 'A religious congregation with official permission for 80,000 attracted 250,000+ attendees (3x capacity). The open-ground venue had: no crowd control barriers, insufficient exits, muddy ground from rain (creating slip hazard), and VIP vehicle movement through crowd. When the event ended, crowd surge toward narrow exit lanes created crush. 121 people (mostly women and children) died from compression asphyxiation in 5 minutes.',
      impact: '121 fatalities. Event organizer and associates arrested (culpable homicide). UP Government ordered review of ALL large gathering permissions. National scrutiny of event safety regulations. DM/SDM suspended for granting permission without safety assessment. Insurance: most deceased had no coverage — family compensation from government ₹2 Lakh each (grossly inadequate).',
      lessons: [
        'Event capacity must be HARD limit — no exceedance regardless of demand/VIP pressure',
        'Crowd density monitoring (real-time): maximum 4-5 persons/m² before intervention required',
        'Multiple exit routes calculated at 1m width per 200 persons per minute',
        'Professional crowd management for ANY event >5,000 persons (not police alone)',
        'Weather contingency: rain/mud changes crowd dynamics — reduce capacity 30% if ground wet',
        'Emergency medical and evacuation capability scaled to event size',
        'Event safety audit by independent professional required for permission (not just police NOC)'
      ],
      benchmark: 'Kumbh Mela (Prayagraj 2019): 200 million visitors managed safely through: AI crowd monitoring (IBM partnership), drone surveillance, sector-based flow control, 40 exit points per sector, and 1:50 marshal-to-attendee ratio. Zero stampede fatalities at world\'s largest gathering when properly managed.'
    },
    emergingRisks: [
      {
        id: 'tour-er-1',
        title: 'Medical/Wellness Tourism — Treatment Liability',
        category: 'regulatory',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'India as medical tourism destination (₹50,000 Cr market) creates: cross-border liability for treatment outcomes, hospital-hotel-tour operator multi-party duty of care, and wellness treatment risks (Ayurveda, Panchakarma — inadequate regulation). A medical tourist death/adverse outcome creates international media coverage and complex multi-jurisdiction litigation. Wellness retreats with unqualified practitioners face negligence claims.',
        implications: ['Cross-border malpractice liability', 'Multi-party duty-of-care complexity', 'Unregulated wellness treatment injuries', 'International media amplification of adverse outcomes', 'Insurance coverage gaps for medical tourism facilitators']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'tour-ni-1',
        title: 'Geopolitical / Terror Advisory — Destination Avoidance',
        category: 'Geopolitical',
        description: 'Travel advisories from Western governments (UK FCO, US State Dept) against Indian destinations can collapse international tourism overnight. Post-26/11, international hotel bookings dropped 50% for 6 months. Kashmir advisories cost the region ₹5,000+ Cr in lost tourism revenue annually. India-Pakistan tensions trigger blanket advisories. No insurance covers advisory-driven demand collapse.',
        mitigation: 'Domestic tourism diversification (reducing dependence on international), destination marketing investment post-advisory, government diplomatic engagement for advisory revision, diversified source markets (not 100% Western), rapid security demonstration post-incident',
        exposure: '₹5,000-20,000 Cr/year industry-wide from adverse travel advisory'
      }
    ],
    bestPractices: [
      {
        id: 'tour-bp-1',
        title: 'Event & Crowd Safety Management',
        standard: 'NFPA 102 (Assembly) + The Event Safety Guide (UK HSE) + Kumbh Mela Protocol',
        description: 'Preventing crowd-related fatalities at events and gatherings — India\'s most frequent mass casualty scenario.',
        recommendations: [
          'Hard capacity limit: no exceedance regardless of demand (enforced by counting system)',
          'Real-time crowd density monitoring: camera + AI based (alarm at 4 persons/m²)',
          'Exit calculation: 1m clear width per 200 persons per minute (minimum 2 exits per zone)',
          'Professional crowd management company for all events >5,000 persons',
          'Barrier planning: prevent cross-flows, create one-way channels, allow emergency expansion',
          'Medical teams: 1 ambulance per 5,000 attendees + triage point at each exit',
          'Weather contingency plan: reduce capacity 30% if rain/extreme heat, cancel if unsafe',
          'Communication system: PA system covering 100% venue + digital signage for wayfinding'
        ],
        benchmark: 'Kumbh Mela 2019: 200 million managed safely through AI crowd monitoring + drone surveillance + sector control + 1:50 marshal ratio. Proves that massive crowds CAN be managed safely with proper investment and planning.'
      }
    ]
  }
]
