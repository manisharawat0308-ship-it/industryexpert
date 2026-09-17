import { AVIATION_RISK_SOURCES } from './aviationRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function AviationRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Aviation Industry"
      subtitle="Comprehensive risk assessment across aviation: airline operations & fleet, MRO & maintenance, and airport infrastructure & ground handling."
      sources={AVIATION_RISK_SOURCES}
      infoBoxes={{
        'airline-operations': {
          icon: '✈️',
          title: 'Fleet Concentration Risk — IndiGo P&W Precedent',
          content: 'The IndiGo P&W engine crisis (70+ aircraft grounded, ₹3,000+ Cr impact) demonstrates how single engine-type dependency creates catastrophic fleet grounding risk. Airlines with 100% single-type fleets (IndiGo: all A320neo) face total operational risk from a single Airworthiness Directive. Fleet diversification (mixed engine suppliers) is the primary mitigation. BI insurance must cover ACTUAL revenue loss from fleet grounding — not just physical damage triggers.',
          gradient: 'bg-gradient-to-r from-blue-50 to-cyan-50',
          borderColor: 'border-blue-100',
          textColor: 'text-blue-900'
        },
        'mro-maintenance': {
          icon: '🔧',
          title: 'Maintenance Error — Aviation\'s Existential Risk',
          content: 'A single maintenance error (wrong part, missed inspection, tool left inside) can cause an in-flight incident with catastrophic consequences. Unlike manufacturing defects (affecting fleet gradually), maintenance errors are immediate and binary. The growing Indian MRO sector faces workforce experience gaps as capacity expands faster than talent development. Human factors programs, independent inspection, and just-culture reporting are non-negotiable.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        },
        'airport-infrastructure': {
          icon: '🏢',
          title: 'Airport = National Infrastructure — Single Point of Failure',
          content: 'A major metro airport closure (flood, earthquake, fire) disrupts national connectivity. Mumbai Airport flooding affects 1,000+ flights and 200,000+ passengers per day. Delhi T1 collapse (2024) closed a terminal for 3 months. Indian airport infrastructure aging + climate change + traffic growth beyond design creates accelerating risk. Airport BI insurance must account for multi-airline impact and national economic consequences.',
          gradient: 'bg-gradient-to-r from-amber-50 to-orange-50',
          borderColor: 'border-amber-100',
          textColor: 'text-amber-900'
        }
      }}
    />
  )
}
