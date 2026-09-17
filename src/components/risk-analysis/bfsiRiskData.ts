// BFSI (Banking, Financial Services & Insurance) Risk Analysis — Complete Data Layer
import { type RiskSource } from './steelRiskData'

export const BFSI_RISK_SOURCES: RiskSource[] = [
  {
    id: 'cyber-technology',
    label: 'Cyber & Technology',
    icon: '🛡️',
    color: '#1565C0',
    bannerImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&q=80',
    bannerTitle: 'Cyber Security & Technology Risk',
    bannerSubtitle: 'Data breaches, ransomware, system failures, and digital fraud — the defining risk of modern financial services.',
    aogPerils: [
      {
        id: 'cy-aog-1',
        title: 'Natural Disaster — Data Center & Infrastructure Damage',
        severity: 'critical',
        description: 'Bank data centers, ATM networks, and branch infrastructure face flood, earthquake, and cyclone damage. Loss of primary data center without adequate DR capability halts ALL banking operations — ATMs, internet banking, UPI, and RTGS. The 2015 Chennai floods disrupted banking services for 2 weeks across 5,000+ branches. RBI mandates DR site activation within 4 hours.',
        impactAreas: ['Primary Data Center Loss', 'Branch Network Disruption', 'ATM Fleet Damage', 'Payment System Interruption', 'Customer Data Risk'],
        typicalClaim: '₹50–500 Cr + regulatory penalty + customer compensation'
      }
    ],
    nonAogPerils: [
      {
        id: 'cy-naog-1',
        title: 'Ransomware Attack — System Encryption',
        severity: 'critical',
        description: 'Ransomware encrypting core banking systems (CBS), loan management, or treasury platforms halts ALL operations. Indian banks face 3x increase in ransomware attempts (2023 vs 2021). The 2023 ICBC (USA) ransomware attack disrupted US Treasury bond settlement. Average ransom demand for financial institutions: $5-50M. Recovery time without payment: 3-6 weeks.',
        impactAreas: ['Core Banking System Lockout', 'Customer Transaction Halt', 'Data Exfiltration + Extortion', 'Regulatory Notification (72 hours)', 'Reputation Destruction'],
        typicalClaim: '₹100–2,000 Cr (ransom + recovery + BI + regulatory + liability)'
      },
      {
        id: 'cy-naog-2',
        title: 'Core Banking System (CBS) Failure',
        severity: 'critical',
        description: 'CBS downtime (Finacle, Flexcube, TCS BaNCS) halts: deposits, withdrawals, transfers, loan disbursement, and UPI transactions. Even 4-hour downtime affects millions of customers. The 2023 HDFC Bank multi-day outage affected 60 million customers. Extended CBS failure triggers RBI intervention and potential customer panic at branches.',
        impactAreas: ['Customer Transaction Halt', 'UPI/IMPS Failure', 'Branch Operations Stop', 'Regulatory Penalty (RBI)', 'Customer Trust Erosion'],
        typicalClaim: '₹50–500 Cr (BI + regulatory fine + compensation + remediation)'
      },
      {
        id: 'cy-naog-3',
        title: 'Digital Fraud — UPI/Card/Net Banking',
        severity: 'high',
        description: 'Indian banking loses ₹10,000+ Cr annually to digital fraud: UPI fraud (social engineering), card skimming/cloning, phishing, account takeover, and insider fraud. Individual bank losses: ₹200-1,000 Cr/year. RBI circular mandates zero-liability for unauthorized transactions where bank systems are at fault — shifting fraud loss to banks. AI-generated deepfakes enabling new fraud vectors.',
        impactAreas: ['Direct Financial Loss', 'Customer Compensation Liability', 'RBI Penalty', 'Fraud Investigation Cost', 'Insurance Claim Volume'],
        typicalClaim: '₹200–1,000 Cr/year (aggregate fraud losses per large bank)'
      },
      {
        id: 'cy-naog-4',
        title: 'Third-Party/Vendor Technology Failure',
        severity: 'high',
        description: 'Banks depend on 50-200 third-party technology vendors (cloud providers, payment switches, KYC/eKYC, credit bureaus). Failure of a single critical vendor cascades across multiple banks. The 2023 C-Edge Technologies (NPCI vendor) outage affected 300 cooperative banks simultaneously. Cloud provider outage (AWS/Azure) can disable multiple fintech partners and neo-banking services.',
        impactAreas: ['Multi-Bank Service Disruption', 'Payment Gateway Failure', 'eKYC System Down', 'Credit Bureau Inaccessibility', 'Regulatory Non-Compliance'],
        typicalClaim: '₹20–200 Cr per event (across affected institutions)'
      }
    ],
    riskMatrix: [
      { risk: 'Ransomware Attack', prob: 2, impact: 3, score: 6, emv: '₹1,000 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx', strategyTooltip: 'Zero-trust architecture + EDR + offline backups + incident response plan + cyber insurance', owner: 'CISO', trigger: 'ANY suspicious encryption activity or lateral movement detected' },
      { risk: 'CBS Failure (Extended)', prob: 2, impact: 3, score: 6, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Active-active DC + 4-hour RTO + regular DR drill + CBS vendor SLA enforcement', owner: 'CTO', trigger: 'CBS response time >5 seconds or transaction failure >1%' },
      { risk: 'Digital Fraud (Aggregate)', prob: 3, impact: 2, score: 6, emv: '₹500 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.npci.org.in', strategyTooltip: 'AI fraud detection + real-time monitoring + customer education + multi-factor auth', owner: 'Head Fraud Risk', trigger: 'Fraud pattern deviation or new attack vector identified' },
      { risk: 'Vendor/Third-Party Failure', prob: 2, impact: 2, score: 4, emv: '₹110 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Vendor concentration limits + backup vendors + BCP for critical vendors + SLA monitoring', owner: 'Head Vendor Management', trigger: 'Critical vendor SLA breach or financial stress indicator' },
      { risk: 'Data Center Flood/Disaster', prob: 1, impact: 3, score: 3, emv: '₹275 Cr', strategy: 'Transfer', strategyUrl: 'https://www.swissre.com', strategyTooltip: 'Property + BI insurance + DR site in different seismic/flood zone + cloud backup', owner: 'Head Infrastructure', trigger: 'Natural disaster warning for DC location' },
    ],
    caseStudy: {
      title: 'ICBC (USA) — Ransomware Attack Disrupting Treasury Settlement',
      location: 'ICBC Financial Services (US subsidiary), New York',
      date: 'November 2023',
      loss: '$100M+ estimated (operational + settlement disruption)',
      rootCause: 'LockBit ransomware group exploited an unpatched Citrix vulnerability (CVE-2023-4966 "Citrix Bleed") to gain access to ICBC\'s US subsidiary systems. The ransomware encrypted treasury settlement systems used for US Treasury bond trading. ICBC was forced to use manual USB drives to send settlement instructions to BNY Mellon. Root cause: delayed patching of critical vulnerability (patch available 1 month before exploit).',
      impact: 'US Treasury bond market settlement disrupted for 2 days. ICBC reportedly paid ransom (unconfirmed, estimated $10-50M). Manual settlement processing for 1 week. Reputational damage to world\'s largest bank. US regulatory scrutiny of Chinese bank operations intensified. Global awareness of financial system ransomware vulnerability amplified.',
      lessons: [
        'Critical vulnerability patching within 72 hours — no exceptions for "testing cycles" on internet-facing systems',
        'Network segmentation: treasury systems must be isolated from general corporate network',
        'Offline backup of settlement capability (manual process) must be tested quarterly',
        'Cyber insurance must cover: ransom payment, BI, regulatory response, and reputation management',
        'Third-party risk assessment must include vendor patch management speed verification'
      ],
      benchmark: 'JP Morgan invests $600M/year in cybersecurity, employs 3,000 security staff, patches critical vulnerabilities within 24 hours, and maintains air-gapped backup settlement capability — zero successful ransomware intrusion despite 50 billion attempts/year.'
    },
    emergingRisks: [
      {
        id: 'cy-er-1',
        title: 'AI-Powered Attacks — Deepfake & Social Engineering',
        category: 'technology',
        severity: 'high',
        timeline: '2024-2028',
        description: 'Generative AI enabling: deepfake voice calls impersonating bank executives authorizing transfers, AI-generated phishing at scale, synthetic identity fraud, and automated vulnerability discovery. The 2024 Hong Kong deepfake video call fraud ($25M loss from single call) demonstrates near-term threat. Indian banks face millions of social engineering attempts daily — AI amplifies attacker capability 100x.',
        implications: ['Deepfake CEO fraud (voice + video authorization)', 'AI-generated phishing defeating current filters', 'Synthetic identity at scale overwhelming KYC', 'Automated zero-day exploit discovery', 'AI vs AI arms race (defense always catching up)']
      },
      {
        id: 'cy-er-2',
        title: 'Quantum Computing Threat to Cryptography',
        category: 'technology',
        severity: 'high',
        timeline: '2028-2035',
        description: 'Quantum computers (2,000+ logical qubits) will break RSA/ECC encryption protecting: banking communications, digital signatures, blockchain, and stored data. "Harvest now, decrypt later" attacks already collecting encrypted banking data for future decryption. Migration to post-quantum cryptography (PQC) requires 5-10 year planning for banking infrastructure.',
        implications: ['All current encryption eventually breakable', '"Harvest now, decrypt later" collecting data today', 'Digital signature invalidation (contracts, transactions)', 'Blockchain/DLT security undermined', '5-10 year migration to PQC needed starting NOW']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'cy-ni-1',
        title: 'Systemic Cyber Risk — Sector-Wide Attack',
        category: 'Systemic / Geopolitical',
        description: 'A coordinated cyber attack targeting Indian banking infrastructure (NPCI, RTGS, multiple large banks simultaneously) could halt the payment system serving 1.4 billion people. Unlike individual bank attacks (insurable), a systemic event would exceed insurance market capacity globally. State-sponsored actors (China, Pakistan proxy) have demonstrated capability to target financial infrastructure.',
        mitigation: 'RBI-mandated cyber resilience framework, sectoral CERT-In coordination, information sharing (IDRBT), cross-border intelligence partnerships, national cyber reserve team for financial sector, regular sectoral red-team exercises',
        exposure: 'Unquantifiable — potential national economic crisis if payment system halted for >48 hours'
      }
    ],
    bestPractices: [
      {
        id: 'cy-bp-1',
        title: 'Banking Cyber Resilience Framework',
        standard: 'RBI Cyber Security Framework 2016 + NIST CSF 2.0 + ISO 27001 + SWIFT CSCF',
        description: 'Building defense-in-depth cyber resilience for the most targeted industry globally — financial services.',
        recommendations: [
          'Zero-trust architecture: verify every access request regardless of source network',
          'Critical vulnerability patching within 72 hours (internet-facing within 24 hours)',
          'EDR (Endpoint Detection & Response) on ALL endpoints with 24/7 SOC monitoring',
          'Network segmentation: CBS, treasury, payments isolated from corporate network',
          'Immutable offline backups tested quarterly (ransomware recovery capability)',
          'Multi-factor authentication for ALL privileged access (no password-only admin)',
          'Third-party security assessment annually for all critical vendors',
          'Red-team exercise annually simulating advanced persistent threat (APT) scenarios'
        ],
        benchmark: 'HDFC Bank post-2023 outage: ₹2,500 Cr technology investment over 3 years, active-active DC, 15-minute RTO for CBS, and 24/7 SOC with AI threat detection — targeting zero unplanned downtime.'
      }
    ]
  },
  {
    id: 'credit-market',
    label: 'Credit & Market',
    icon: '📊',
    color: '#B02A30',
    bannerImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    bannerTitle: 'Credit, Market & Liquidity Risk',
    bannerSubtitle: 'Loan defaults, market crashes, liquidity crises — the traditional financial risks amplified by interconnection and speed.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'cm-naog-1',
        title: 'Large Corporate Default / NPA Spike',
        severity: 'critical',
        description: 'Indian banking NPA cycle: ₹10+ Lakh Cr gross NPAs at 2018 peak. A single large corporate default (IL&FS ₹91,000 Cr, DHFL ₹90,000 Cr) cascades across banking system through: consortium lending exposure, mutual fund investments, and inter-corporate guarantees. A new NPA cycle could emerge from: real estate stress, MSME post-COVID weakness, or climate-affected agriculture.',
        impactAreas: ['Provisioning Surge (₹1,000-10,000 Cr)', 'Capital Adequacy Pressure', 'Credit Rating Downgrade', 'Stock Price Collapse', 'Regulatory Action (PCA Framework)'],
        typicalClaim: 'Not insurable — provisioning against capital'
      },
      {
        id: 'cm-naog-2',
        title: 'Sudden Interest Rate Shock — Bond Portfolio Mark-to-Market',
        severity: 'high',
        description: 'Indian banks hold ₹50-80 Lakh Cr of government bonds. A sudden rate increase (100-200 bps in quarter) creates massive MTM losses in Available-for-Sale and Held-for-Trading portfolios. The 2022 global rate rise caused ₹50,000+ Cr MTM losses across Indian banking. Silicon Valley Bank collapsed from identical risk — rate-driven bond portfolio impairment.',
        impactAreas: ['Bond Portfolio MTM Loss', 'Capital Adequacy Erosion', 'Profit Wiped Out', 'Stock Price Decline', 'Potential Failure (SVB precedent)'],
        typicalClaim: 'Not directly insurable — balance sheet management'
      },
      {
        id: 'cm-naog-3',
        title: 'Microfinance / Retail Lending Mass Default',
        severity: 'high',
        description: 'Indian microfinance (₹3.5 Lakh Cr outstanding) and unsecured retail lending (personal loans, credit cards — ₹12 Lakh Cr) face concentration risk. Political loan waiver announcements, natural disaster affecting farming communities, or economic downturn causing urban job losses triggers mass default. The 2010 AP MFI crisis (political loan waiver) destroyed ₹10,000 Cr of microfinance assets.',
        impactAreas: ['Mass Default Wave', 'Political Loan Waiver', 'Collection System Overwhelm', 'Capital Erosion', 'Business Model Viability Question'],
        typicalClaim: 'Not insurable — credit risk management'
      }
    ],
    riskMatrix: [
      { risk: 'Large Corporate Default', prob: 2, impact: 3, score: 6, emv: '₹5,000 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Single-borrower limits + early warning system + consortium discipline + provisioning buffer', owner: 'Chief Credit Officer', trigger: 'EWS activation on any top-50 exposure' },
      { risk: 'Interest Rate Shock', prob: 2, impact: 2, score: 4, emv: '₹2,000 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Duration gap management + HTM classification strategy + derivatives hedging', owner: 'Chief Risk Officer (Market)', trigger: 'Modified duration gap >3 years or VaR breach' },
      { risk: 'Retail Mass Default', prob: 2, impact: 2, score: 4, emv: '₹3,000 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Portfolio diversification + stress testing + dynamic provisioning + collection analytics', owner: 'Head Retail Risk', trigger: '30+ DPD rate rising >50 bps/month for 3 consecutive months' },
    ],
    caseStudy: {
      title: 'IL&FS Group Default — Systemic Crisis in Indian Financial Sector',
      location: 'Infrastructure Leasing & Financial Services, Mumbai (with national impact)',
      date: 'September 2018',
      loss: '₹91,000 Cr group debt default (₹50,000+ Cr banking system impact)',
      rootCause: 'IL&FS accumulated ₹91,000 Cr debt financing long-gestation infrastructure projects with short-term borrowings (asset-liability mismatch). Complex group structure (348 entities) hid true leverage. Delayed government payments on infrastructure projects caused cash flow stress. When commercial paper redemption failed in September 2018, confidence collapse triggered broader NBFC liquidity crisis — DHFL, Dewan Housing, Reliance Capital all subsequently defaulted.',
      impact: 'IL&FS group default: ₹91,000 Cr. Cascading NBFC crisis: ₹2+ Lakh Cr of additional defaults (DHFL, Reliance Capital). Mutual fund exposure: ₹30,000 Cr at risk. Banking system provisions: ₹50,000+ Cr. NBFC sector credit growth halted for 2 years. Real estate sector financing froze. Government superseded IL&FS board — unprecedented intervention.',
      lessons: [
        'Asset-liability mismatch (borrowing short, lending long) is existential for NBFCs',
        'Group complexity (348 entities) enabled leverage hiding — consolidated supervision essential',
        'Credit rating agencies failed to downgrade despite deteriorating cash flows for years',
        'Interconnection risk: single NBFC default cascades through CP/bond market to entire sector',
        'Liquidity risk supersedes credit risk — even solvent entities fail from liquidity freeze',
        'Regulatory early warning: RBI now mandates monthly NBFC stress testing'
      ],
      benchmark: 'Post-IL&FS: RBI Scale-Based Regulation for NBFCs (2023), mandatory liquidity coverage ratio, enhanced disclosure, and prompt corrective action framework — structural improvements to prevent repeat systemic event.'
    },
    emergingRisks: [
      {
        id: 'cm-er-1',
        title: 'Climate-Related Financial Risk (TCFD/Physical+Transition)',
        category: 'climate',
        severity: 'high',
        timeline: '2024-2035',
        description: 'RBI mandating climate risk assessment for banks. Physical risk: loan portfolio exposed to flood/cyclone-prone assets (₹10+ Lakh Cr in coastal real estate, agriculture). Transition risk: lending to carbon-intensive sectors (coal, steel, cement) facing stranded asset risk. Banks must stress-test portfolios for 1.5°C/2°C/3°C warming scenarios. First-movers face competitive disadvantage; laggards face regulatory action.',
        implications: ['Loan portfolio devaluation from physical climate events', 'Stranded asset exposure in fossil fuel lending', 'Regulatory stress testing and disclosure mandates', 'Green taxonomy compliance for new lending', 'Carbon-adjusted risk-weighted assets (future)']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'cm-ni-1',
        title: 'Political Loan Waiver / Directed Lending',
        category: 'Political / Regulatory',
        description: 'State governments announce farm loan waivers (₹50,000-2,00,000 Cr per state) before elections. Banks bear immediate provisioning impact before (if ever) government reimbursement. Directed lending mandates (priority sector at below-market rates) erode margins. Political pressure to lend to specific sectors/borrowers creates NPAs. No insurance or hedge available for political credit risk.',
        mitigation: 'Diversified lending across states, conservative agriculture portfolio management, political risk assessment in credit decisions, adequate provisioning buffers, industry body advocacy for rational policy',
        exposure: '₹1,000-5,000 Cr per large bank per state-level loan waiver announcement'
      }
    ],
    bestPractices: [
      {
        id: 'cm-bp-1',
        title: 'Enterprise Risk Management for Banks',
        standard: 'RBI Risk Management Guidelines + Basel III/IV + COSO ERM + ICAAP',
        description: 'Integrated risk management framework addressing the interconnected nature of credit, market, and operational risks in banking.',
        recommendations: [
          'Single-borrower exposure limit: 15% of capital (RBI norm) with internal limit at 10%',
          'Early Warning System (EWS) with 15+ financial/non-financial triggers per borrower',
          'Quarterly stress testing: GDP shock, rate shock, sector-specific, and combined scenarios',
          'Interest rate risk: modified duration gap <3 years, VaR limits, hedging program',
          'Concentration risk management: sector, geography, rating grade, and group limits',
          'ICAAP: Internal Capital Adequacy Assessment covering all material risks',
          'Board Risk Committee: monthly review with independent risk function reporting',
          'Climate risk: TCFD-aligned disclosure and portfolio-level scenario analysis'
        ],
        benchmark: 'ICICI Bank post-2018 NPA cycle: provisioning coverage >80%, fully stressed book identified, granular retail diversification, and quarterly board-level risk review — achieved credit cost <1% for 4 consecutive years.'
      }
    ]
  },
  {
    id: 'operational',
    label: 'Operational & Compliance',
    icon: '⚖️',
    color: '#F37021',
    bannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    bannerTitle: 'Operational Risk & Regulatory Compliance',
    bannerSubtitle: 'Internal fraud, process failures, regulatory penalties, and people risk — the "everything else" category that often dominates loss experience.',
    aogPerils: [],
    nonAogPerils: [
      {
        id: 'op-naog-1',
        title: 'Internal Fraud — Employee Misconduct',
        severity: 'critical',
        description: 'Indian banking loses ₹5,000-10,000 Cr annually to internal fraud: loan sanctioning fraud (fictitious borrowers), treasury dealer unauthorized positions, cash theft from branches/ATMs, and identity theft by employees. The 2018 PNB-Nirav Modi fraud (₹14,000 Cr) demonstrated how a single branch-level employee can create catastrophic loss through SWIFT system manipulation. Average detection time for internal fraud in Indian banks: 18 months.',
        impactAreas: ['Massive Financial Loss', 'Regulatory Action', 'Criminal Prosecution of Management', 'Stock Price Collapse', 'Customer Trust Destruction'],
        typicalClaim: '₹100–14,000 Cr (PNB precedent)'
      },
      {
        id: 'op-naog-2',
        title: 'Regulatory Penalty — RBI/SEBI/IRDAI Action',
        severity: 'high',
        description: 'RBI penalties escalating: ₹1-5 Cr for minor violations to ₹50-100 Cr for serious non-compliance. License cancellation (recent examples: multiple cooperative banks, PMC Bank). SEBI penalties for mis-selling, insider trading, and market manipulation. Consumer forum awards ₹1-50 Cr for individual customer grievances. Aggregate regulatory risk: ₹100-500 Cr/year for large institutions.',
        impactAreas: ['Financial Penalty', 'Business Restriction', 'License Cancellation (extreme)', 'Reputation Damage', 'Management Personal Liability'],
        typicalClaim: '₹10–500 Cr (aggregate regulatory cost per year)'
      },
      {
        id: 'op-naog-3',
        title: 'AML/KYC Compliance Failure',
        severity: 'high',
        description: 'Anti-Money Laundering (AML) failure results in: RBI penalty, international correspondent banking relationship loss, FATF grey-listing contribution, and criminal prosecution under PMLA. Loss of correspondent banking (due to AML concerns) isolates the bank from international transactions. Recent FATF scrutiny of Indian compliance creates systemic pressure.',
        impactAreas: ['RBI Penalty', 'Correspondent Bank Relationship Loss', 'International Transaction Disruption', 'Criminal Prosecution (PMLA)', 'FATF Grey-List Contribution'],
        typicalClaim: '₹50–500 Cr (direct penalty + relationship loss + business impact)'
      }
    ],
    riskMatrix: [
      { risk: 'Internal Fraud (Major)', prob: 2, impact: 3, score: 6, emv: '₹1,000 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Maker-checker + surprise audits + whistle-blower + transaction monitoring + rotation policy', owner: 'Chief Vigilance Officer', trigger: 'Whistle-blower report or transaction pattern anomaly' },
      { risk: 'Regulatory Penalty', prob: 3, impact: 2, score: 6, emv: '₹250 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.rbi.org.in', strategyTooltip: 'Compliance monitoring + regulatory change management + self-certification + audit readiness', owner: 'Chief Compliance Officer', trigger: 'RBI inspection finding or circular non-compliance identified' },
      { risk: 'AML Failure', prob: 2, impact: 3, score: 6, emv: '₹275 Cr', strategy: 'Mitigate', strategyUrl: 'https://www.fatf-gafi.org', strategyTooltip: 'AI-based transaction monitoring + enhanced due diligence + STR filing discipline + training', owner: 'Head AML/CFT', trigger: 'STR filing rate drop or suspicious pattern unaddressed' },
    ],
    caseStudy: {
      title: 'PNB — Nirav Modi SWIFT Fraud (₹14,000 Cr)',
      location: 'Punjab National Bank, Brady House Branch, Mumbai',
      date: 'January 2018 (detected), fraud ongoing since 2011',
      loss: '₹14,000 Cr (₹11,400 Cr LoU + ₹2,600 Cr FLC)',
      rootCause: 'A single deputy manager at PNB Brady House branch issued 150+ fraudulent Letters of Undertaking (LoU) and Foreign Letter of Credit (FLC) through SWIFT messaging — WITHOUT entering transactions in the CBS (Core Banking System). The SWIFT system and CBS were not integrated at PNB (unlike most global banks). This allowed ₹14,000 Cr of unauthorized commitments over 7 years. No maker-checker control on SWIFT messaging. No reconciliation between SWIFT messages sent and CBS records.',
      impact: 'India\'s largest banking fraud. PNB stock crashed 40%. MD/CEO arrested. CBI/ED investigation ongoing. ₹14,000 Cr provision wiped out 3 years of profit. Industry-wide SWIFT-CBS integration mandated by RBI. Nirav Modi fled India — extradition proceedings from UK. 50+ PNB employees investigated/suspended.',
      lessons: [
        'SWIFT must be integrated with CBS — every SWIFT message must auto-create CBS entry (no manual bypass)',
        'Maker-checker-approver for ALL SWIFT messages (especially those creating financial commitment)',
        'Reconciliation: daily automated matching of SWIFT messages vs CBS records',
        'Employee rotation: maximum 3 years in sensitive positions (SWIFT, treasury, trade finance)',
        'Whistle-blower protection: anonymous channel monitored by Board-level committee',
        'Concurrent audit of trade finance with 100% sample for large-value transactions'
      ],
      benchmark: 'Post-PNB: RBI mandated SWIFT-CBS integration across all banks (completed 2019). New SWIFT Alliance Lite2 with integrated compliance. Industry-wide maker-checker on all SWIFT categories. Result: zero similar frauds detected since integration mandate.'
    },
    emergingRisks: [
      {
        id: 'op-er-1',
        title: 'Digital Lending Regulation — Compliance Complexity',
        category: 'regulatory',
        severity: 'medium',
        timeline: '2024-2028',
        description: 'RBI Digital Lending Guidelines (2022) fundamentally restructuring fintech-bank partnerships. Compliance requirements: all lending on regulated entity books, FLDG limits, transparent pricing, data localization, and direct disbursement to borrower. Non-compliant fintechs being forced to shut or partner differently. Regulatory uncertainty creating business model risk for digital-first lenders.',
        implications: ['Business model disruption for fintech-bank partnerships', 'FLDG limit (5%) reducing fintech revenue share', 'Data localization compliance cost', 'Customer journey disruption from transparency mandates', 'Regulatory arbitrage opportunities closing']
      }
    ],
    nonInsurableRisks: [
      {
        id: 'op-ni-1',
        title: 'Reputation Crisis — Social Media Amplified',
        category: 'Reputation',
        description: 'A single viral customer complaint, employee misconduct video, or data breach disclosure can destroy banking brand equity worth ₹10,000+ Cr in market cap. The speed of social media amplification (millions of impressions in hours) outpaces institutional response capability. Yes Bank crisis (2020): depositor panic from WhatsApp rumors caused ₹10,000 Cr deposit flight in 72 hours.',
        mitigation: 'Real-time social media monitoring, pre-approved crisis response messaging, transparent communication strategy, customer grievance resolution (prevent viral escalation), stakeholder communication plan',
        exposure: '₹5,000-50,000 Cr market cap erosion from major reputation event'
      }
    ],
    bestPractices: [
      {
        id: 'op-bp-1',
        title: 'Banking Fraud Prevention Framework',
        standard: 'RBI Master Direction on Fraud 2016 + Basel Committee Sound Practices + IIA Standards',
        description: 'Multi-layered fraud prevention addressing the most frequent cause of catastrophic loss in Indian banking.',
        recommendations: [
          'SWIFT-CBS integration: every SWIFT message auto-creates CBS record (zero manual bypass)',
          'Maker-checker-approver: minimum 3 levels for all transactions >₹1 Cr',
          'Employee rotation: maximum 3 years in sensitive positions (trade finance, treasury, cash)',
          'Surprise audits: minimum quarterly for branches with high-value/complex transactions',
          'Transaction monitoring: AI-based anomaly detection on all channels (UPI, RTGS, SWIFT)',
          'Whistle-blower mechanism: anonymous, Board-monitored, with protection guarantee',
          'Leave policy: mandatory 14-day continuous leave annually (fraud often detected during absence)',
          'Concurrent audit: real-time for trade finance and large-value credit decisions'
        ],
        benchmark: 'SBI (post-PNB): fully integrated SWIFT, AI-based transaction monitoring flagging 10,000+ anomalies/day, mandatory 14-day leave, and surprise concurrent audit — zero major internal fraud detected in 4 years for world\'s largest branch network (22,000+ branches).'
      }
    ]
  }
]
