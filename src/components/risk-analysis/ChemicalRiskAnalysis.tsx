import { CHEMICAL_RISK_SOURCES } from './chemicalRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function ChemicalRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Chemical Industry"
      subtitle="Comprehensive risk assessment across the chemical value chain: petrochemicals, specialty chemicals, and storage & logistics."
      sources={CHEMICAL_RISK_SOURCES}
      infoBoxes={{
        'petrochemicals': {
          icon: '💥',
          title: 'Vapor Cloud Explosion — The Catastrophic Petrochemical Risk',
          content: 'A large hydrocarbon release forming a vapor cloud, upon ignition, detonates with devastating overpressure destroying entire units within 1 km. LG Polymers Vizag (2020, 12 killed), and global events (Buncefield, Texas City) demonstrate the scale. Process Safety Management (HAZOP, mechanical integrity, gas detection, SIS) is the primary defense. The Bhopal legacy (1984, 15,000+ deaths) makes chemical process safety a matter of national conscience. Insurers must verify CCPS/OSHA PSM compliance and Tier-1 process safety event tracking.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        },
        'specialty-chemicals': {
          icon: '🌡️',
          title: 'Runaway Reaction — #1 Batch Chemistry Risk',
          content: 'Exothermic reactions (nitration, oxidation, hydrogenation) undergo thermal runaway when cooling fails or reagents are mis-added — causing reactor rupture, toxic release, and fire. India\'s China+1 driven capacity boom means new units built faster than safety culture matures. Reaction calorimetry (before scale-up), cooling redundancy, and emergency quench are essential. Insurers should mandate reaction hazard assessment for all exothermic processes.',
          gradient: 'bg-gradient-to-r from-teal-50 to-cyan-50',
          borderColor: 'border-teal-100',
          textColor: 'text-teal-900'
        },
        'storage-logistics': {
          icon: '🏭',
          title: 'Chemical Storage — The Tianjin Warning',
          content: 'The Tianjin warehouse explosion (2015, 173 killed, $9B) from improper storage of incompatible chemicals (oxidizers + flammables) is the defining chemical storage disaster. Chemical segregation by compatibility is NON-NEGOTIABLE. Indian chemical warehouses frequently violate segregation and quantity norms. Firefighter chemical training (never water on reactive materials) is critical. Insurers should verify NFPA 400 compliance and SDS-integrated emergency response.',
          gradient: 'bg-gradient-to-r from-amber-50 to-yellow-50',
          borderColor: 'border-amber-100',
          textColor: 'text-amber-900'
        }
      }}
    />
  )
}
