import { type KnowledgeEntry } from './riskKnowledge'

interface KnowledgeModalProps {
  entry: KnowledgeEntry
  onClose: () => void
}

export function KnowledgeModal({ entry, onClose }: KnowledgeModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-maroon/5 to-orange/5 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-navy">{entry.term}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{entry.tooltip}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-5">
          {/* Banner Image */}
          {entry.imageUrl && (
            <div className="relative h-40 rounded-xl overflow-hidden">
              <img src={entry.imageUrl} alt={entry.term} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          )}

          {/* Detail */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Detailed Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{entry.detail}</p>
          </div>

          {/* Why It Matters */}
          <div className="bg-maroon/5 rounded-xl p-4 border border-maroon/10">
            <h4 className="text-xs font-bold text-maroon uppercase tracking-wider mb-1.5">Why It Matters for Insurance</h4>
            <p className="text-sm text-maroon/80 leading-relaxed">{entry.whyItMatters}</p>
          </div>

          {/* Cost Range */}
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Typical Loss Range</h4>
            <p className="text-base font-bold text-red-800">{entry.costRange}</p>
          </div>

          {/* Root Causes */}
          {entry.rootCauses.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Root Causes</h4>
              <div className="space-y-1.5">
                {entry.rootCauses.map((cause, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">{cause}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incidents */}
          {entry.incidents.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notable Incidents</h4>
              <div className="space-y-1.5">
                {entry.incidents.map((incident, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5">
                    <span className="text-xs">⚠️</span>
                    <p className="text-xs text-gray-700 leading-relaxed">{incident}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prevention */}
          {entry.prevention.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Prevention Measures</h4>
              <div className="space-y-1.5">
                {entry.prevention.map((measure, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-gray-700 leading-relaxed">{measure}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reference */}
          {entry.referenceUrl && (
            <div className="pt-3 border-t border-gray-100">
              <a
                href={entry.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                📎 Reference Documentation →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
