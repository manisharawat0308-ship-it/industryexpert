import { STARTUPS_RISK_SOURCES } from './startupsRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function StartupsRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Startups & New-Age Business"
      subtitle="Risk assessment across startup ecosystem: tech platforms, logistics & delivery, and fintech & payments."
      sources={STARTUPS_RISK_SOURCES}
      infoBoxes={{
        'technology-platform': {
          icon: '⚖️',
          title: 'Regulatory Risk — The Startup Existential Threat',
          content: 'Indian startups face a unique risk: regulatory action can destroy ₹30,000+ Cr of valuation overnight (Paytm 2024 precedent). Unlike physical risks (insurable, recoverable), regulatory shutdown is binary and often irreversible. Fintech, healthtech, edtech, and crypto startups operate in regulatory grey areas where rules are being written in real-time. Compliance cannot be "growth-hacked" — it must be built before scaling. D&O insurance and regulatory defense coverage are essential but underpenetrated in Indian startups.',
          gradient: 'bg-gradient-to-r from-purple-50 to-indigo-50',
          borderColor: 'border-purple-100',
          textColor: 'text-purple-900'
        },
        'fintech-payments': {
          icon: '🏦',
          title: 'Bank Partnership Dependency — Single Point of Failure',
          content: 'Most Indian fintechs operate ENTIRELY through bank partnerships. The bank provides: license, settlement, compliance umbrella, and regulatory cover. A single bank partner withdrawal (90-day notice) halts ALL fintech operations. Post-Paytm, banks are actively reviewing fintech partnerships. Fintechs must diversify to 3+ bank partners or obtain own license. This concentration risk is uninsurable and existential.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        }
      }}
    />
  )
}
