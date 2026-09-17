import { HOSPITALITY_RISK_SOURCES } from './hospitalityRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function HospitalityRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Hospitality Industry"
      subtitle="Comprehensive risk assessment across hospitality: hotels & resorts, restaurants & QSR, and tourism & travel."
      sources={HOSPITALITY_RISK_SOURCES}
      infoBoxes={{
        'hotels-resorts': {
          icon: '🔥',
          title: 'Hotel Fire — Guest Life Safety is Paramount',
          content: 'Hotel Arpit Palace (2019, 17 killed), Rajkot Game Zone (2024, 27 killed), and multiple annual hotel fires demonstrate that guest life safety in Indian hospitality is systemically compromised. Locked exits, absent sprinklers, and non-existent fire detection are STILL common in budget/mid-scale hotels. Every hotel fire with fatalities triggers criminal prosecution of management under IPC 304. ITC Hotels\' 50-year zero-injury record proves safety is achievable — the gap is willingness to invest, not technology.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        },
        'restaurants-qsr': {
          icon: '🍳',
          title: 'Kitchen Fire & LPG — #1 Hospitality Loss Cause',
          content: 'Kitchen grease fires propagating through exhaust ducts are the single most frequent fire cause in hospitality globally. Combined with India\'s widespread LPG use in enclosed/basement kitchens, the explosion potential is elevated. Professional quarterly duct cleaning (₹10-20,000) prevents ₹5-50 Cr fires. NFPA 96 wet chemical hood suppression is the minimum standard. Cloud kitchen concentration (10-30 brands per location) amplifies single-event impact.',
          gradient: 'bg-gradient-to-r from-amber-50 to-orange-50',
          borderColor: 'border-amber-100',
          textColor: 'text-amber-900'
        },
        'tourism-travel': {
          icon: '⚠️',
          title: 'Crowd Safety — India\'s Most Frequent Mass Casualty Scenario',
          content: 'India averages 10+ stampede/crush events annually at religious gatherings, events, and tourist locations. Hathras 2024 (121 killed), Elphinstone Bridge 2017 (23 killed), and countless smaller incidents demonstrate systemic failure in crowd management. Professional crowd management for events >5,000 people is virtually non-existent outside top-tier venues. AI-based crowd monitoring (proven at Kumbh 2019) can prevent these entirely — the gap is implementation, not technology.',
          gradient: 'bg-gradient-to-r from-purple-50 to-red-50',
          borderColor: 'border-purple-100',
          textColor: 'text-purple-900'
        }
      }}
    />
  )
}
