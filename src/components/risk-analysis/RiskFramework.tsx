import { useState } from 'react'
import { type RiskSource } from './steelRiskData'

interface RiskFrameworkProps {
  source: RiskSource
  onKnowledgeClick: (id: string) => void
}

const PROCESS_STEPS = [
  { step: 'Identify', icon: '🔍', desc: 'Systematic identification of risk events from all sources', color: 'bg-blue-500' },
  { step: 'Analyze', icon: '📊', desc: 'Determine probability and impact using historical data', color: 'bg-purple-500' },
  { step: 'Evaluate', icon: '⚖️', desc: 'Rank risks using P×I matrix and EMV calculation', color: 'bg-orange-500' },
  { step: 'Treat', icon: '🛠️', desc: 'Select strategy: Avoid, Mitigate, Transfer, Accept', color: 'bg-green-500' },
  { step: 'Monitor', icon: '📡', desc: 'Track triggers, KRIs, and residual risk levels', color: 'bg-red-500' },
]

const MATRIX_COLORS: Record<number, string> = {
  1: 'bg-green-100 text-green-800 border-green-200',
  2: 'bg-green-50 text-green-700 border-green-200',
  3: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  4: 'bg-orange-100 text-orange-800 border-orange-200',
  6: 'bg-red-100 text-red-800 border-red-200',
  9: 'bg-red-200 text-red-900 border-red-300',
}

const STRATEGY_COLORS: Record<string, string> = {
  'Avoid': 'bg-red-50 text-red-700',
  'Mitigate': 'bg-blue-50 text-blue-700',
  'Transfer': 'bg-purple-50 text-purple-700',
  'Accept': 'bg-gray-50 text-gray-600',
  'Share': 'bg-green-50 text-green-700',
}

export function RiskFramework({ source, onKnowledgeClick }: RiskFrameworkProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* ISO 31000 Process */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📐</span>
          <h3 className="text-lg font-bold text-navy">ISO 31000 Risk Management Framework</h3>
        </div>
        <p className="text-xs text-gray-500 mb-5">Systematic approach aligned to ISO 31000:2018 — Risk Management Guidelines</p>

        {/* 5-Step Process */}
        <div className="flex items-center gap-0 overflow-x-auto pb-2">
          {PROCESS_STEPS.map((ps, idx) => (
            <div key={ps.step} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 min-w-[130px]">
                <div className={`w-8 h-8 rounded-lg ${ps.color} flex items-center justify-center text-white text-sm`}>
                  {ps.icon}
                </div>
                <span className="text-xs font-bold text-navy">{ps.step}</span>
                <span className="text-[9px] text-gray-500 text-center leading-tight">{ps.desc}</span>
              </div>
              {idx < PROCESS_STEPS.length - 1 && (
                <div className="flex-shrink-0 px-1">
                  <span className="text-gray-300 text-lg">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Probability × Impact Matrix */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🎯</span>
          <h3 className="text-lg font-bold text-navy">Probability × Impact Matrix</h3>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            {/* Matrix Grid */}
            <div className="grid grid-cols-4 gap-0.5 max-w-[500px]">
              {/* Header Row */}
              <div className="p-2 text-center text-[10px] font-bold text-gray-400 uppercase"></div>
              <div className="p-2 text-center text-[10px] font-bold text-gray-500 uppercase bg-gray-50 rounded-t-lg">Low Impact (1)</div>
              <div className="p-2 text-center text-[10px] font-bold text-gray-500 uppercase bg-gray-50 rounded-t-lg">Medium Impact (2)</div>
              <div className="p-2 text-center text-[10px] font-bold text-gray-500 uppercase bg-gray-50 rounded-t-lg">High Impact (3)</div>

              {/* Row 3: High Probability */}
              <div className="p-2 text-center text-[10px] font-bold text-gray-500 uppercase bg-gray-50 rounded-l-lg">High (3)</div>
              <MatrixCell score={3} risks={source.riskMatrix.filter(r => r.prob === 3 && r.impact === 1)} hovered={hoveredCell} setHovered={setHoveredCell} />
              <MatrixCell score={6} risks={source.riskMatrix.filter(r => r.prob === 3 && r.impact === 2)} hovered={hoveredCell} setHovered={setHoveredCell} />
              <MatrixCell score={9} risks={source.riskMatrix.filter(r => r.prob === 3 && r.impact === 3)} hovered={hoveredCell} setHovered={setHoveredCell} />

              {/* Row 2: Medium Probability */}
              <div className="p-2 text-center text-[10px] font-bold text-gray-500 uppercase bg-gray-50 rounded-l-lg">Med (2)</div>
              <MatrixCell score={2} risks={source.riskMatrix.filter(r => r.prob === 2 && r.impact === 1)} hovered={hoveredCell} setHovered={setHoveredCell} />
              <MatrixCell score={4} risks={source.riskMatrix.filter(r => r.prob === 2 && r.impact === 2)} hovered={hoveredCell} setHovered={setHoveredCell} />
              <MatrixCell score={6} risks={source.riskMatrix.filter(r => r.prob === 2 && r.impact === 3)} hovered={hoveredCell} setHovered={setHoveredCell} />

              {/* Row 1: Low Probability */}
              <div className="p-2 text-center text-[10px] font-bold text-gray-500 uppercase bg-gray-50 rounded-l-lg rounded-bl-lg">Low (1)</div>
              <MatrixCell score={1} risks={source.riskMatrix.filter(r => r.prob === 1 && r.impact === 1)} hovered={hoveredCell} setHovered={setHoveredCell} />
              <MatrixCell score={2} risks={source.riskMatrix.filter(r => r.prob === 1 && r.impact === 2)} hovered={hoveredCell} setHovered={setHoveredCell} />
              <MatrixCell score={3} risks={source.riskMatrix.filter(r => r.prob === 1 && r.impact === 3)} hovered={hoveredCell} setHovered={setHoveredCell} />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100 border border-green-200" /> Low (1-2)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200" /> Medium (3)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-100 border border-orange-200" /> High (4)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 border border-red-200" /> Critical (6-9)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Register Table */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📋</span>
          <h3 className="text-lg font-bold text-navy">Risk Register</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-bold text-gray-500 uppercase text-[10px] tracking-wider">Risk Event</th>
                <th className="text-center py-3 px-2 font-bold text-gray-500 uppercase text-[10px] tracking-wider">P</th>
                <th className="text-center py-3 px-2 font-bold text-gray-500 uppercase text-[10px] tracking-wider">I</th>
                <th className="text-center py-3 px-2 font-bold text-gray-500 uppercase text-[10px] tracking-wider">Score</th>
                <th className="text-center py-3 px-2 font-bold text-gray-500 uppercase text-[10px] tracking-wider">EMV (₹)</th>
                <th className="text-center py-3 px-2 font-bold text-gray-500 uppercase text-[10px] tracking-wider">Strategy</th>
                <th className="text-left py-3 px-2 font-bold text-gray-500 uppercase text-[10px] tracking-wider">Owner</th>
                <th className="text-left py-3 px-2 font-bold text-gray-500 uppercase text-[10px] tracking-wider">Trigger</th>
              </tr>
            </thead>
            <tbody>
              {source.riskMatrix.map((entry, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                  <td className="py-3 px-2 font-semibold text-navy">{entry.risk}</td>
                  <td className="py-3 px-2 text-center">
                    <span className="relative" title={`Probability: ${entry.prob}/3`}>
                      {entry.prob}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span title={`Impact: ${entry.impact}/3`}>{entry.impact}</span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold border ${MATRIX_COLORS[entry.score] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                      {entry.score}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center font-semibold text-maroon">{entry.emv}</td>
                  <td className="py-3 px-2 text-center">
                    <div className="relative group/strategy">
                      <a
                        href={entry.strategyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${STRATEGY_COLORS[entry.strategy] || 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-opacity`}
                      >
                        {entry.strategy}
                      </a>
                      {/* Strategy Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-navy text-white text-[9px] rounded-lg shadow-lg whitespace-nowrap z-50 opacity-0 group-hover/strategy:opacity-100 transition-opacity pointer-events-none max-w-[250px]">
                        <div className="text-center leading-tight whitespace-normal">{entry.strategyTooltip}</div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy" />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">{entry.owner}</td>
                  <td className="py-3 px-2 text-gray-500 italic text-[10px]">{entry.trigger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Study */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl shadow-card border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📖</span>
          <h3 className="text-lg font-bold text-navy">Case Study</h3>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h4 className="text-base font-bold text-maroon mb-3">{source.caseStudy.title}</h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-2.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
              <p className="text-xs font-semibold text-navy mt-0.5">{source.caseStudy.location}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Date</p>
              <p className="text-xs font-semibold text-navy mt-0.5">{source.caseStudy.date}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-2.5">
              <p className="text-[10px] font-bold text-red-400 uppercase">Loss</p>
              <p className="text-xs font-bold text-red-700 mt-0.5">{source.caseStudy.loss}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Type</p>
              <p className="text-xs font-semibold text-navy mt-0.5">{source.label}</p>
            </div>
          </div>

          {/* Root Cause */}
          <div className="mb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Root Cause</p>
            <p className="text-xs text-gray-700 leading-relaxed">{source.caseStudy.rootCause}</p>
          </div>

          {/* Impact */}
          <div className="mb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Impact</p>
            <p className="text-xs text-gray-700 leading-relaxed">{source.caseStudy.impact}</p>
          </div>

          {/* Lessons Learned */}
          <div className="mb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Lessons Learned</p>
            <div className="space-y-2">
              {source.caseStudy.lessons.map((lesson, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-maroon/10 text-maroon text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">{lesson}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Industry Benchmark</p>
            <p className="text-xs text-blue-800 leading-relaxed">{source.caseStudy.benchmark}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== Matrix Cell Component =====
function MatrixCell({ score, risks, hovered, setHovered }: {
  score: number
  risks: { risk: string }[]
  hovered: string | null
  setHovered: (v: string | null) => void
}) {
  const cellId = `cell-${score}-${risks.map(r => r.risk).join(',')}`
  const colorClass = MATRIX_COLORS[score] || 'bg-gray-50 text-gray-600 border-gray-200'

  return (
    <div
      className={`relative p-2 min-h-[60px] rounded-lg border text-center flex flex-col items-center justify-center gap-0.5 cursor-default ${colorClass}`}
      onMouseEnter={() => setHovered(cellId)}
      onMouseLeave={() => setHovered(null)}
    >
      <span className="text-sm font-bold">{score}</span>
      {risks.length > 0 && (
        <span className="text-[8px] font-medium leading-tight">
          {risks.length} risk{risks.length > 1 ? 's' : ''}
        </span>
      )}
      {/* Tooltip showing risk names */}
      {hovered === cellId && risks.length > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-navy text-white text-[9px] rounded-lg shadow-lg z-50 min-w-[150px]">
          <div className="space-y-0.5">
            {risks.map((r, i) => (
              <div key={i} className="font-medium">• {r.risk}</div>
            ))}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy" />
        </div>
      )}
    </div>
  )
}
