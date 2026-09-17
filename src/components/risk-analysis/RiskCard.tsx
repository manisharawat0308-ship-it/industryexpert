import { useState } from 'react'
import { type RiskPeril, type Severity } from './steelRiskData'
import { getImpactAreaDetail } from './impactAreaInfo'
import { ImpactAreaModal } from './ImpactAreaModal'

const SEVERITY_CONFIG: Record<Severity, { bg: string; text: string; border: string; label: string }> = {
  critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'CRITICAL' },
  high: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: 'HIGH' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'MEDIUM' },
  low: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'LOW' },
}

const SEVERITY_DOT: Record<Severity, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-amber-500',
  low: 'bg-green-500',
}

interface RiskCardProps {
  risk: RiskPeril
  // Retained for backward compatibility (no longer required — every tag now opens the impact area modal)
  onKnowledgeClick?: (id: string) => void
}

export function RiskCard({ risk }: RiskCardProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const sev = SEVERITY_CONFIG[risk.severity]

  const selectedDetail = selectedArea
    ? getImpactAreaDetail(selectedArea, risk.title, risk.description)
    : null

  return (
    <>
      <div className={`bg-white rounded-xl border ${sev.border} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}>
        {/* Severity Strip */}
        <div className={`h-1 ${SEVERITY_DOT[risk.severity]}`} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h4 className="text-sm font-bold text-navy leading-tight flex-1">{risk.title}</h4>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${sev.bg} ${sev.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${SEVERITY_DOT[risk.severity]}`} />
              {sev.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed mb-3">{risk.description}</p>

          {/* Impact Areas — every tag is clickable */}
          <div className="mb-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Impact Areas — tap for details</p>
            <div className="flex flex-wrap gap-1.5">
              {risk.impactAreas.map((area) => (
                <button
                  key={area}
                  type="button"
                  className="relative inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer bg-maroon/5 text-maroon border border-maroon/20 hover:bg-maroon/10 hover:border-maroon/40 active:scale-95"
                  onMouseEnter={() => setHoveredTag(area)}
                  onMouseLeave={() => setHoveredTag(null)}
                  onClick={() => setSelectedArea(area)}
                >
                  {area}
                  <span className="text-maroon/40 text-[9px]">ⓘ</span>
                  {/* Tooltip on hover */}
                  {hoveredTag === area && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-navy text-white text-[10px] rounded-lg shadow-lg whitespace-nowrap z-50">
                      <div className="text-center leading-tight">Click to learn more</div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Typical Claim */}
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Typical Claim:</span>
            <span className="text-xs font-bold text-navy">{risk.typicalClaim}</span>
          </div>
        </div>
      </div>

      {/* Impact Area Detail Modal */}
      {selectedArea && selectedDetail && (
        <ImpactAreaModal
          detail={selectedDetail}
          parentRisk={risk.title}
          severity={risk.severity}
          onClose={() => setSelectedArea(null)}
        />
      )}
    </>
  )
}
