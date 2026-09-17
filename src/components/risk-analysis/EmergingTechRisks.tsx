import { type EmergingRisk } from './steelRiskData'

const CATEGORY_CONFIG: Record<string, { bg: string; text: string; icon: string }> = {
  technology: { bg: 'bg-blue-50', text: 'text-blue-700', icon: '💻' },
  climate: { bg: 'bg-green-50', text: 'text-green-700', icon: '🌡️' },
  regulatory: { bg: 'bg-purple-50', text: 'text-purple-700', icon: '📜' },
  market: { bg: 'bg-orange-50', text: 'text-orange-700', icon: '📈' },
}

const SEVERITY_DOT: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-amber-500',
  low: 'bg-green-500',
}

interface EmergingTechRisksProps {
  risks: EmergingRisk[]
}

export function EmergingTechRisks({ risks }: EmergingTechRisksProps) {
  if (risks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 text-center">
        <span className="text-3xl">🔬</span>
        <p className="text-sm text-gray-500 mt-2">No emerging tech risks documented for this source yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🔬</span>
        <h3 className="text-lg font-bold text-navy">Emerging Technology & Climate Risks</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        New and evolving risks from technology transitions, climate change, and regulatory shifts — not fully reflected in historical loss data.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {risks.map((risk) => {
          const cat = CATEGORY_CONFIG[risk.category] || CATEGORY_CONFIG.technology
          return (
            <div key={risk.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
              {/* Category Strip */}
              <div className={`px-4 py-2 ${cat.bg} border-b border-gray-100 flex items-center justify-between`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${cat.text}`}>
                  {cat.icon} {risk.category}
                </span>
                <span className="text-[10px] font-semibold text-gray-500">{risk.timeline}</span>
              </div>

              <div className="p-5">
                {/* Title + Severity */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-sm font-bold text-navy leading-tight">{risk.title}</h4>
                  <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${SEVERITY_DOT[risk.severity]}`} title={risk.severity} />
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{risk.description}</p>

                {/* Implications */}
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Key Implications</p>
                  <div className="space-y-1">
                    {risk.implications.map((imp, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="flex-shrink-0 text-[10px] text-orange-500 mt-0.5">▸</span>
                        <p className="text-[11px] text-gray-600 leading-relaxed">{imp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
