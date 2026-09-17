import { FMCG_RISK_SOURCES } from './fmcgRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function FMCGRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — FMCG Industry"
      subtitle="Comprehensive risk assessment across the FMCG value chain: food & beverage manufacturing, personal & home care, warehousing & distribution, and packaging materials."
      sources={FMCG_RISK_SOURCES}
      infoBoxes={{
        'food-beverage': {
          icon: '🍽️',
          title: 'Product Recall — The Existential FMCG Risk',
          content: 'A single contamination event can recall millions of units, destroy decades of brand equity, and trigger regulatory bans. Nestlé Maggi 2015: ₹450+ Cr direct loss + immeasurable brand damage. Unlike property damage (rebuildable), brand damage from food safety failures is permanent and uninsurable. Insurers should verify: HACCP certification, metal detection coverage, allergen management, and traceability systems. Product recall insurance is the most underutilized coverage in Indian FMCG.',
          gradient: 'bg-gradient-to-r from-amber-50 to-orange-50',
          borderColor: 'border-amber-100',
          textColor: 'text-amber-900'
        },
        'personal-care': {
          icon: '💥',
          title: 'Aerosol BLEVE — Fastest-Escalating Fire in FMCG',
          content: 'Aerosol cans (LPG/DME propellant) explode as projectiles when heated (BLEVE effect). A single can BLEVE propagates to adjacent cans within seconds creating chain-reaction explosions that overwhelm standard sprinklers in 3-5 minutes. Standard warehouse fire protection is INADEQUATE for aerosol storage. NFPA 30B specific design is mandatory. Insurers must verify: dedicated aerosol compartment, NFPA 30B sprinkler density, temperature control, and reduced stack heights before accepting aerosol storage risk.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        },
        'warehouse-distribution': {
          icon: '📦',
          title: 'Festive Season Stock Concentration — Peak Exposure',
          content: 'Indian FMCG builds 2-3x normal inventory in September-October for Diwali season. Single warehouse locations holding ₹200-1,000 Cr of seasonal stock represent catastrophic loss potential. Loss during festive season is IRRECOVERABLE — production capacity cannot remake in time. Insurers must require: pre-festive stock declaration, multi-location distribution, and verification that fire protection is adequate for peak (not average) inventory levels.',
          gradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
          borderColor: 'border-green-100',
          textColor: 'text-green-900'
        },
        'packaging': {
          icon: '🔥',
          title: 'Solvent Fire — #1 Loss Cause in Flexible Packaging',
          content: 'Flexible packaging printing/lamination with solvent-based inks (ethyl acetate, toluene, MEK — flash points 0-40°C) creates permanent fire/explosion risk. Multiple Indian flexible packaging fires annually cause ₹30-150 Cr losses. Root cause is always: LEL excursion + ignition source. Prevention requires: continuous LEL monitoring with automatic line shutdown, redundant exhaust fans, and explosion vents. A ₹30-50 Lakh investment per machine prevents ₹30-150 Cr losses.',
          gradient: 'bg-gradient-to-r from-purple-50 to-red-50',
          borderColor: 'border-purple-100',
          textColor: 'text-purple-900'
        }
      }}
    />
  )
}
