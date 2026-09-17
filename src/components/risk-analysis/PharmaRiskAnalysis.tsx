import { PHARMA_RISK_SOURCES } from './pharmaRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function PharmaRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Pharma & Healthcare Industry"
      subtitle="Comprehensive risk assessment across the pharmaceutical value chain: API manufacturing, formulation & dosage, storage & cold chain, and R&D & clinical operations."
      sources={PHARMA_RISK_SOURCES}
      infoBoxes={{
        'api-manufacturing': {
          icon: '🧪',
          title: 'Solvent Fire — #1 Physical Loss Cause in Indian Pharma',
          content: 'Indian API plants handle 100-1,000 tonnes/month of flammable solvents (methanol fp 11°C, acetone fp -20°C). The sector averages 20-30 significant solvent fires annually. Root cause is consistently: non-ATEX electrical equipment in flammable zones + absence of continuous gas detection. A ₹50-80 Lakh investment in ATEX compliance + gas detection prevents ₹20-200 Cr losses. Insurers should mandate: ATEX zone classification, gas detection, and foam suppression as policy conditions for any API plant.',
          gradient: 'bg-gradient-to-r from-blue-50 to-cyan-50',
          borderColor: 'border-blue-100',
          textColor: 'text-blue-900'
        },
        'formulation': {
          icon: '📊',
          title: 'Data Integrity — The Existential Pharma Risk',
          content: 'Data integrity failure is MORE damaging than any fire or explosion in pharma. A single FDA Warning Letter excludes a plant from the US market for 2-4 YEARS — destroying ₹500-5,000 Cr in revenue. Ranbaxy ($500M fine), Wockhardt (4-year exclusion), and Ipca (ongoing) demonstrate this is NOT theoretical. No insurance covers regulatory exclusion revenue loss. This is a pure governance/culture risk that insurers should assess through quality audit history and FDA inspection outcomes.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        },
        'warehouse-distribution': {
          icon: '❄️',
          title: 'Cold Chain — Zero Tolerance for Excursion',
          content: 'Pharmaceutical cold chain has ZERO tolerance for temperature excursion. Any product exceeding limits for >2-4 hours must be destroyed (GDP/GMP requirement — no salvage). A single cold room failure destroys ₹50-500 Cr of biologic product instantly. Unlike other industries where damaged goods can be salvaged, pharma product is binary: compliant (sellable) or non-compliant (destroyed). Insurers must verify: redundant cooling, continuous monitoring, genset backup, and alarm escalation protocols.',
          gradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
          borderColor: 'border-green-100',
          textColor: 'text-green-900'
        },
        'research-development': {
          icon: '🧬',
          title: 'Clinical Trial Data — ₹1,000-5,000 Cr at Risk in a Database',
          content: 'A single clinical trial program represents 5-10 years and ₹1,000-5,000 Cr of investment stored as data. Loss of this data (integrity failure, cyber attack, or server crash) is equivalent to losing the entire R&D investment. Unlike physical assets, clinical data cannot be "rebuilt" — the trial must be repeated from scratch. Additionally, IP theft of molecular data can eliminate ₹5,000-10,000 Cr of market exclusivity value. Cyber insurance and robust data protection are as important as property insurance for R&D-intensive pharma companies.',
          gradient: 'bg-gradient-to-r from-purple-50 to-indigo-50',
          borderColor: 'border-purple-100',
          textColor: 'text-purple-900'
        }
      }}
    />
  )
}
