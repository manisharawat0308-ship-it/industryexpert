import { type NonInsurableRisk } from './steelRiskData'

interface NonInsurableRisksProps {
  risks: NonInsurableRisk[]
}

export function NonInsurableRisks({ risks }: NonInsurableRisksProps) {
  if (risks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 text-center">
        <span className="text-3xl">⚠️</span>
        <p className="text-sm text-gray-500 mt-2">No non-insurable risks documented for this source yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">⚠️</span>
        <h3 className="text-lg font-bold text-navy">Non-Insurable Risks</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Risks that cannot be effectively transferred through traditional insurance — requiring strategic, operational, or financial mitigation.
      </p>

      <div className="space-y-4">
        {risks.map((risk) => (
          <div key={risk.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              {/* Left: Category Badge */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  {risk.category}
                </span>
              </div>

              {/* Right: Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-navy mb-2">{risk.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{risk.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Mitigation */}
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Mitigation Strategy</p>
                    <p className="text-[11px] text-blue-800 leading-relaxed">{risk.mitigation}</p>
                  </div>

                  {/* Exposure */}
                  <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1">Financial Exposure</p>
                    <p className="text-[11px] font-semibold text-red-800">{risk.exposure}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
