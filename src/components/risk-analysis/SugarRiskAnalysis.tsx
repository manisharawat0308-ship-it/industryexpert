import { SUGAR_RISK_SOURCES } from './sugarRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function SugarRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Sugar Industry"
      subtitle="Comprehensive risk assessment across the sugar value chain: cane milling, boiler & cogeneration, distillery & ethanol, and sugar processing & storage."
      sources={SUGAR_RISK_SOURCES}
      infoBoxes={{
        'distillery': {
          icon: '⚠️',
          title: 'Critical — Ethanol Fire & Explosion Risk',
          content: 'Ethanol (flash point 13°C) is the most hazardous material in sugar industry operations. Multiple Indian distillery fires with fatalities occur annually. OISD-116/117 compliance, 100% Ex-rated electrical in Zone 1/2, and continuous gas detection are mandatory minimum requirements. Many existing distilleries were built before modern safety standards and lack adequate protection. Insurers should mandate HAZOP completion and PESO license verification as policy conditions.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        },
        'processing-sugar': {
          icon: '💥',
          title: 'Emerging Critical Risk — Sugar Dust Explosion',
          content: 'Indian sugar industry has virtually ZERO awareness of combustible dust explosion risk. The 2008 Imperial Sugar explosion (USA, 14 killed, $275M loss) demonstrates the catastrophic potential. Sugar dust is explosive (Kst 100-200 bar·m/s). Conditions for a similar event exist in hundreds of Indian mills — enclosed packing areas with decades of dust accumulation, no explosion vents, and no DHA. This is the most underestimated risk in Indian manufacturing. Insurers should assess dust explosion exposure at all sugar mills.',
          gradient: 'bg-gradient-to-r from-purple-50 to-red-50',
          borderColor: 'border-purple-100',
          textColor: 'text-purple-900'
        },
        'milling': {
          icon: '⏰',
          title: 'Seasonal Criticality — Every Lost Day is Permanent Revenue Loss',
          content: 'Sugar crushing operates 120-150 days per year. A mill breakdown during season cannot be "made up" — sugarcane deteriorates daily and cannot wait for repairs. Every lost crushing day = ₹50-80 Lakh of permanent, irrecoverable revenue. This makes mill reliability during season the single most important operational objective. Insurance assessment must account for the seasonal amplification of BI — a 3-week repair in season is equivalent to a 3-month outage in a year-round industry.',
          gradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
          borderColor: 'border-green-100',
          textColor: 'text-green-900'
        }
      }}
    />
  )
}
