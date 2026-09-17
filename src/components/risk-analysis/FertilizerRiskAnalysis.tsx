import { FERTILIZER_RISK_SOURCES } from './fertilizerRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function FertilizerRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Fertilizer Industry"
      subtitle="Comprehensive risk assessment across the fertilizer value chain: ammonia & urea, phosphatic & complex, and storage & distribution."
      sources={FERTILIZER_RISK_SOURCES}
      infoBoxes={{
        'ammonia-urea': {
          icon: '☠️',
          title: 'Ammonia Release — The Toxic Cloud Risk',
          content: 'Fertilizer plants store 5,000-50,000 tonnes of ammonia (toxic, IDLH 300 ppm). A major release creates a lethal cloud requiring community evacuation. The Bhopal legacy (1984, different chemical but demonstrating toxic cloud lethality) defines Indian consciousness of this risk. Ammonia inventory minimization, continuous detection, water mitigation (ammonia is water-soluble), and community alert systems are essential. Insurers should verify OISD-169 compliance and ammonia safety systems.',
          gradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
          borderColor: 'border-green-100',
          textColor: 'text-green-900'
        },
        'phosphatic-complex': {
          icon: '💥',
          title: 'Ammonium Nitrate — The Beirut Warning',
          content: 'Nitrate-based fertilizers (CAN, some NPK) contain ammonium nitrate — a powerful oxidizer that DETONATES when heated + confined. Beirut (2020, 218 killed, $15B), Texas City (1947, 581 killed), West Texas (2013, 15 killed) — all ammonium nitrate fertilizer. AN storage requires strict NFPA 400 segregation, non-combustible construction, and fire prevention. Indian AN-based fertilizer storage frequently violates norms. This is the single highest catastrophic-potential risk in the fertilizer sector.',
          gradient: 'bg-gradient-to-r from-amber-50 to-orange-50',
          borderColor: 'border-amber-100',
          textColor: 'text-amber-900'
        },
        'storage-distribution': {
          icon: '📦',
          title: 'AN Distribution Storage — West Texas Lesson',
          content: 'The West Texas explosion (2013, 15 killed including 12 firefighters) showed that even 40-60 tonnes of AN fertilizer in a combustible warehouse can devastate a community. AN must NEVER be stored in wooden/combustible buildings, must be segregated from combustibles, and needs fire suppression. Firefighter awareness is critical — AN fire can detonate. Indian fertilizer distribution near populated areas needs West Texas-standard AN storage. Insurers should verify Ammonium Nitrate Rules 2012 compliance.',
          gradient: 'bg-gradient-to-r from-yellow-50 to-amber-50',
          borderColor: 'border-yellow-100',
          textColor: 'text-yellow-900'
        }
      }}
    />
  )
}
