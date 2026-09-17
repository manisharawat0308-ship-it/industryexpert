import { type BestPractice } from './steelRiskData'

interface BestPracticesViewProps {
  practices: BestPractice[]
}

export function BestPracticesView({ practices }: BestPracticesViewProps) {
  if (practices.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 text-center">
        <span className="text-3xl">✅</span>
        <p className="text-sm text-gray-500 mt-2">No best practices documented for this source yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">✅</span>
        <h3 className="text-lg font-bold text-navy">Risk Engineering Best Practices</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Industry-standard risk engineering recommendations aligned to international standards and benchmarks.
      </p>

      <div className="space-y-4">
        {practices.map((practice) => (
          <div key={practice.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            {/* Header */}
            <div className="px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-navy">{practice.title}</h4>
                <span className="text-[9px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  {practice.standard}
                </span>
              </div>
            </div>

            <div className="p-5">
              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{practice.description}</p>

              {/* Recommendations */}
              <div className="mb-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Recommendations</p>
                <div className="space-y-2">
                  {practice.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-gray-700 leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmark */}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Global Benchmark</p>
                <p className="text-xs text-blue-800 leading-relaxed">{practice.benchmark}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
