import { BFSI_RISK_SOURCES } from './bfsiRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function BFSIRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Banking, Financial Services & Insurance"
      subtitle="Comprehensive risk assessment across BFSI: cyber & technology, credit & market, and operational & compliance risks."
      sources={BFSI_RISK_SOURCES}
      infoBoxes={{
        'cyber-technology': {
          icon: '🛡️',
          title: 'Cyber Risk — The Defining Threat to Modern Banking',
          content: 'Indian banking faces 3x increase in cyber attacks (2023 vs 2021). Ransomware can halt ALL banking operations. A single CBS outage affects 50-100 million customers. JP Morgan spends $600M/year on cybersecurity. ICBC (world\'s largest bank) was hit by ransomware in 2023 disrupting US Treasury settlement. Indian banks must invest proportionally — the gap between threat sophistication and defense capability is widening. Cyber insurance with adequate limits and realistic exclusion clarity is now as essential as property insurance.',
          gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
          borderColor: 'border-blue-100',
          textColor: 'text-blue-900'
        },
        'operational': {
          icon: '⚠️',
          title: 'Internal Fraud — PNB ₹14,000 Cr Precedent',
          content: 'The PNB-Nirav Modi fraud (₹14,000 Cr from a SINGLE branch) demonstrated that internal fraud in Indian banking can reach existential proportions. Root cause: SWIFT-CBS disconnect allowing unauthorized commitments without system records. Now fixed industry-wide, but new fraud vectors emerge continuously. Indian banks lose ₹5,000-10,000 Cr annually to internal fraud. Banker\'s Blanket Bond and crime insurance are essential but limits often inadequate vs actual exposure.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        }
      }}
    />
  )
}
