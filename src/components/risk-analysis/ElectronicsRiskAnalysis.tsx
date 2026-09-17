import { ELECTRONICS_RISK_SOURCES } from './electronicsRiskData'
import GenericRiskAnalysis from './GenericRiskAnalysis'

export default function ElectronicsRiskAnalysis() {
  return (
    <GenericRiskAnalysis
      title="Risk Analysis — Electronics Industry"
      subtitle="Comprehensive risk assessment across the electronics value chain: semiconductor & fab, EMS & PCB assembly, consumer electronics, and display & panel manufacturing."
      sources={ELECTRONICS_RISK_SOURCES}
      infoBoxes={{
        'semiconductor': {
          icon: '🏭',
          title: 'India Semiconductor Mission — First-Generation Fab Risk',
          content: 'India\'s planned semiconductor fabs (Tata-PSMC Gujarat, Micron Sanand ATMP) introduce manufacturing with no domestic precedent. PML for a single fab: ₹5,000-15,000 Cr. WIP value alone: ₹100-500 Cr. First-generation operations face: workforce learning curve, supply chain immaturity, and unknown local environmental challenges. Insurance market capacity for Indian fab risk is currently minimal — require international placement.',
          gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
          borderColor: 'border-blue-100',
          textColor: 'text-blue-900'
        },
        'ems-pcb': {
          icon: '⚡',
          title: 'ESD — The Silent Killer of Electronics Quality',
          content: 'Electrostatic discharge causes LATENT damage undetectable at production test — failures manifest 6-18 months later in the field. A single humidity control failure can damage 10,000+ assembled PCBs creating ₹50-200 Cr recall liability. Indian EMS facilities often lack continuous ESD monitoring (relying on periodic audits). Insurers should mandate ANSI/ESD S20.20 certification and continuous monitoring as policy conditions for electronics manufacturing risk.',
          gradient: 'bg-gradient-to-r from-amber-50 to-yellow-50',
          borderColor: 'border-amber-100',
          textColor: 'text-amber-900'
        },
        'consumer-electronics': {
          icon: '🔋',
          title: 'Lithium Battery — Defining Risk of Electronics Era',
          content: 'Every smartphone, laptop, tablet, and wearable contains a potential fire source. Samsung Note 7 ($5.3B loss) demonstrated the catastrophic potential. Indian manufacturers shipping 200M+ battery-containing devices/year face growing product recall exposure. A systematic battery defect affecting 1% of production = millions of devices at risk. Product recall insurance is currently rare in Indian electronics — a critical gap.',
          gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
          borderColor: 'border-red-100',
          textColor: 'text-red-900'
        }
      }}
    />
  )
}
