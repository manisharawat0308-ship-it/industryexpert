import { type ImpactAreaDetail } from './impactAreaInfo'

interface ImpactAreaModalProps {
  detail: ImpactAreaDetail
  parentRisk: string
  severity?: string
  onClose: () => void
}

export function ImpactAreaModal({ detail, parentRisk, onClose }: ImpactAreaModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-maroon/5 to-orange/5 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Impact Area</p>
              <h3 className="text-lg font-black text-navy leading-tight">{detail.title}</h3>
              <p className="text-[11px] text-gray-500 mt-1">Related to: <span className="font-semibold text-maroon">{parentRisk}</span></p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-5">
          {/* What It Is */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>📖</span> What It Is
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">{detail.whatItIs}</p>
          </div>

          {/* Why It Matters */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>💡</span> Why It Matters
            </h4>
            <p className="text-sm text-blue-800/90 leading-relaxed">{detail.whyItMatters}</p>
          </div>

          {/* Consequences */}
          {detail.consequences.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>⚠️</span> Consequences
              </h4>
              <div className="space-y-1.5">
                {detail.consequences.map((c, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prevention */}
          {detail.prevention.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>🛡️</span> Prevention & Mitigation
              </h4>
              <div className="space-y-1.5">
                {detail.prevention.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-gray-700 leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insurance Angle */}
          <div className="bg-maroon/5 rounded-xl p-4 border border-maroon/10">
            <h4 className="text-xs font-bold text-maroon uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>📋</span> Insurance Perspective
            </h4>
            <p className="text-sm text-maroon/80 leading-relaxed">{detail.insuranceAngle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
