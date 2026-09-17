import { INFRASTRUCTURE_RISK_SOURCES } from './infrastructureRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function InfrastructureRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Infrastructure Industry"
      subtitle="Comprehensive risk assessment across infrastructure: roads & highways, urban & metro, and power & energy."
      sources={INFRASTRUCTURE_RISK_SOURCES}
      infoBoxes={{
        'roads-highways': {
          icon: '🌉',
          title: 'Bridge Collapse — Morbi Warning',
          content: 'The Morbi bridge collapse (2022, 135 killed) from corroded cables + unqualified maintenance + overcrowding demonstrates how structural negligence becomes mass tragedy. Bridge scour (foundation erosion) is the #1 collapse cause globally. Climate change is making historical flood/scour design parameters inadequate. Structural integrity of critical elements (cables, foundations) must NEVER be compromised for cost. Insurers should verify independent proof-checking, load rating, and inspection regimes.',
          gradient: 'bg-gradient-to-r from-slate-50 to-gray-100',
          borderColor: 'border-slate-200',
          textColor: 'text-slate-900'
        },
        'urban-metro': {
          icon: '🔥',
          title: 'High-Rise Fire — The Grenfell Lesson',
          content: 'Grenfell Tower (2017, 72 killed) demonstrated how combustible facade cladding turns a single-flat fire into a total building catastrophe. India has thousands of high-rises with similar ACM-PE cladding. Combined with blocked exits, absent sprinklers, and single staircases, the risk is severe. Kamala Mills (2018), multiple Indian high-rise fires confirm the gap. Non-combustible cladding + 100% sprinklers + pressurized escapes are the achievable standard (Singapore/UAE prove it). Insurers should assess cladding combustibility.',
          gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
          borderColor: 'border-blue-100',
          textColor: 'text-blue-900'
        },
        'transmission-lines': {
          icon: '🗼',
          title: 'Grid Cascade Failure & Transformer Risk — Systemic Transmission Threats',
          content: 'The 2012 India blackout (620 million affected) showed how a local fault can cascade across the national grid. Large power transformers (₹20-100 Cr, 12-18 month replacement) create long outages on failure, and cyclones topple hundreds of towers (Amphan, Tauktae). Insurers must assess protection coordination, islanding/defence schemes, transformer health monitoring (DGA), and spare-transformer strategy for transmission assets.',
          gradient: 'bg-gradient-to-r from-cyan-50 to-blue-50',
          borderColor: 'border-cyan-100',
          textColor: 'text-cyan-900'
        },
        'airport-infrastructure': {
          icon: '🛫',
          title: 'Terminal Fire & Runway Incursion — Airport Catastrophic Risks',
          content: 'Airport terminals combine huge public occupancy, high fire load, and limited evacuation routes — the Delhi T1 roof collapse (2024) and global terminal fires show the exposure. Runway incursions/ground collisions (Tenerife 1977, 583 killed) remain aviation\'s worst risk, and monsoon flooding closes airports (Mumbai, Chennai). Insurers should assess NFPA 415 fire design, ARFF category, surface-movement radar (A-SMGCS), and 1-in-100-year drainage.',
          gradient: 'bg-gradient-to-r from-orange-50 to-amber-50',
          borderColor: 'border-orange-100',
          textColor: 'text-orange-900'
        }
      }}
    />
  )
}
