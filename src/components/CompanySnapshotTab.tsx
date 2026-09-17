import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Building2, AlertTriangle, X, TrendingUp, Newspaper, Rocket, Package, BarChart3, Target, ArrowUpRight, ArrowDownRight, Minus, Download } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'
import { useCompanyStore, IndustryId } from '../store/useCompanyStore'

const INDUSTRY_LABELS: Record<IndustryId, string> = {
  steel: 'Steel', cement: 'Cement', paper: 'Paper', sugar: 'Sugar',
  automobile: 'Automobile', tyre: 'Tyre', textile: 'Textile',
  electronics: 'Electronics', fmcg: 'FMCG',
}

export default function CompanySnapshotTab({ currentIndustry }: { currentIndustry: IndustryId }) {
  const { searchQuery, suggestions, selectedCompany, hasMismatch, mismatchDismissed, setSearchQuery, selectCompany, clearSelection, dismissMismatch } = useCompanyStore()
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && !inputRef.current?.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value, currentIndustry)
    setShowDropdown(true)
  }

  const handleSelect = (id: string) => {
    selectCompany(id, currentIndustry)
    setShowDropdown(false)
  }

  const handleSwitchIndustry = () => {
    if (selectedCompany) {
      navigate(`/${selectedCompany.industry}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <Search size={20} className="text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => { if (suggestions.length > 0) setShowDropdown(true) }}
              placeholder="Search company by name or ticker (e.g. Tata Steel, MARUTI, UltraTech)..."
              className="flex-1 text-sm outline-none placeholder:text-gray-400"
            />
            {searchQuery && (
              <button onClick={clearSelection} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            )}
          </div>
        </div>

        {showDropdown && suggestions.length > 0 && (
          <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden max-h-72 overflow-y-auto">
            {suggestions.map((s) => (
              <button key={s.id} onClick={() => handleSelect(s.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition text-left border-b border-gray-50 last:border-0">
                <div>
                  <span className="font-semibold text-navy text-sm">{s.name}</span>
                  <span className="ml-2 text-xs text-gray-400">{s.ticker}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  s.industry === currentIndustry ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>{INDUSTRY_LABELS[s.industry]}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mismatch Banner */}
      {hasMismatch && !mismatchDismissed && selectedCompany && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">
              ⚠️ Disclaimer: <strong>{selectedCompany.name}</strong> primarily operates in the <strong>{INDUSTRY_LABELS[selectedCompany.industry]}</strong> industry, which differs from the currently selected <strong>{INDUSTRY_LABELS[currentIndustry]}</strong> tab.
            </p>
            <div className="flex gap-2 mt-3">
              <button onClick={handleSwitchIndustry} className="px-3 py-1.5 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-navy-600 transition">
                Switch to {INDUSTRY_LABELS[selectedCompany.industry]} Dashboard
              </button>
              <button onClick={dismissMismatch} className="px-3 py-1.5 bg-white text-gray-700 text-xs font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                Proceed Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Company Snapshot Content */}
      {selectedCompany && (!hasMismatch || mismatchDismissed) && (
        <div className="space-y-6">
          {hasMismatch && mismatchDismissed && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700 flex items-center gap-2">
              <AlertTriangle size={14} /> Viewing {selectedCompany.name} ({INDUSTRY_LABELS[selectedCompany.industry]}) under {INDUSTRY_LABELS[currentIndustry]} tab
            </div>
          )}

          {/* Company Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-navy">{selectedCompany.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedCompany.ticker} • Founded {selectedCompany.founded} • {selectedCompany.headquarters}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2 bg-maroon text-white rounded-lg text-xs font-semibold hover:bg-maroon/90 transition shadow-sm">
                  <Download size={13} /> Export
                </button>
                <div className="text-right">
                  <div className="text-lg font-bold text-maroon">{selectedCompany.marketCap}</div>
                  <div className="text-xs text-gray-500">Market Cap</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-4 leading-relaxed">{selectedCompany.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-xs text-gray-500">CEO</div><div className="font-semibold text-sm text-navy">{selectedCompany.ceo}</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-xs text-gray-500">Employees</div><div className="font-semibold text-sm text-navy">{selectedCompany.employees}</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-xs text-gray-500">Revenue FY25</div><div className="font-semibold text-sm text-maroon">{selectedCompany.revenueFY25}</div></div>
              <div className="p-3 bg-gray-50 rounded-lg"><div className="text-xs text-gray-500">Net Profit FY25</div><div className="font-semibold text-sm text-green-700">{selectedCompany.profitFY25}</div></div>
            </div>
          </div>

          {/* Extended Company Overview (if available) */}
          {selectedCompany.extendedOverview && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Building2 size={18} className="text-maroon" /> Detailed Company Overview</h3>
              
              <div className="space-y-5">
                {/* Business Segments */}
                <div>
                  <h4 className="text-sm font-bold text-navy mb-1.5">Business Segments & Operations</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedCompany.extendedOverview.businessSegments}</p>
                </div>

                {/* Geographic Presence */}
                <div>
                  <h4 className="text-sm font-bold text-navy mb-1.5">Geographic Presence</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedCompany.extendedOverview.geographicPresence}</p>
                </div>

                {/* Market Position */}
                <div>
                  <h4 className="text-sm font-bold text-navy mb-1.5">Market Position</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedCompany.extendedOverview.marketPosition}</p>
                </div>

                {/* Key Strengths */}
                <div>
                  <h4 className="text-sm font-bold text-navy mb-2">Key Competitive Strengths</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCompany.extendedOverview.keyStrengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 bg-green-50/50 rounded-lg border border-green-100">
                        <span className="text-green-500 mt-0.5 font-bold text-xs">✓</span>
                        <span className="text-xs text-gray-700 leading-relaxed">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Raw Material Strategy */}
                <div>
                  <h4 className="text-sm font-bold text-navy mb-1.5">Raw Material Strategy</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedCompany.extendedOverview.rawMaterialStrategy}</p>
                </div>
              </div>
            </div>
          )}

          {/* Product Portfolio */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2"><Package size={18} className="text-orange" /> Product Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedCompany.products.map((p, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 text-right text-[11px] font-bold text-maroon">{p.revenueShare}%</div>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-navy to-maroon" style={{ width: `${p.revenueShare}%` }}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-navy truncate">{p.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">{p.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-green-600" /> Financial Summary</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-navy/5 rounded-xl">
                <div className="text-xl font-bold text-navy">{selectedCompany.revenueFY25}</div>
                <div className="text-xs text-gray-500">Revenue FY25</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-xl font-bold text-green-700">{selectedCompany.profitFY25}</div>
                <div className="text-xs text-gray-500">Net Profit FY25</div>
              </div>
              <div className="text-center p-3 bg-orange/10 rounded-xl">
                <div className="text-xl font-bold text-orange">{selectedCompany.ebitdaMargin}</div>
                <div className="text-xs text-gray-500">EBITDA Margin</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={selectedCompany.financials}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()} Cr`} />
                <Legend />
                <Bar dataKey="revenue" fill="#005B75" name="Revenue (₹ Cr)" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="revenue" position="top" fontSize={8} formatter={(v: number) => `${(v/1000).toFixed(0)}K`} />
                </Bar>
                <Bar dataKey="profit" fill="#4CAF50" name="Profit (₹ Cr)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Ratios (if available) */}
          {selectedCompany.financialRatios && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-purple-600" /> Key Financial Ratios (FY25)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <RatioCard label="Debt/Equity" value={`${selectedCompany.financialRatios.debtToEquity}x`} benchmark="Industry: 0.72x" status={selectedCompany.financialRatios.debtToEquity <= 0.8 ? 'good' : selectedCompany.financialRatios.debtToEquity <= 1.2 ? 'neutral' : 'bad'} />
                <RatioCard label="Current Ratio" value={`${selectedCompany.financialRatios.currentRatio}x`} benchmark="Ideal: >1.0x" status={selectedCompany.financialRatios.currentRatio >= 1.0 ? 'good' : 'neutral'} />
                <RatioCard label="ROE" value={`${selectedCompany.financialRatios.roe}%`} benchmark="Industry: 10%+" status={selectedCompany.financialRatios.roe >= 12 ? 'good' : selectedCompany.financialRatios.roe >= 8 ? 'neutral' : 'bad'} />
                <RatioCard label="ROCE" value={`${selectedCompany.financialRatios.roce}%`} benchmark="Industry: 12%+" status={selectedCompany.financialRatios.roce >= 14 ? 'good' : selectedCompany.financialRatios.roce >= 10 ? 'neutral' : 'bad'} />
                <RatioCard label="Interest Coverage" value={`${selectedCompany.financialRatios.interestCoverage}x`} benchmark="Healthy: >3x" status={selectedCompany.financialRatios.interestCoverage >= 4 ? 'good' : selectedCompany.financialRatios.interestCoverage >= 2 ? 'neutral' : 'bad'} />
                <RatioCard label="Net Debt" value={selectedCompany.financialRatios.netDebt} benchmark="" status="neutral" />
                <RatioCard label="P/E Ratio" value={`${selectedCompany.financialRatios.peRatio}x`} benchmark="Sector: 18-25x" status="neutral" />
                <RatioCard label="P/B Ratio" value={`${selectedCompany.financialRatios.pbRatio}x`} benchmark="Steel Avg: 1.5x" status="neutral" />
                <RatioCard label="Dividend Yield" value={`${selectedCompany.financialRatios.dividendYield}%`} benchmark="" status={selectedCompany.financialRatios.dividendYield >= 2 ? 'good' : 'neutral'} />
                <RatioCard label="Working Capital Days" value={`${selectedCompany.financialRatios.workingCapitalDays}`} benchmark="Lower is better" status={selectedCompany.financialRatios.workingCapitalDays <= 30 ? 'good' : 'neutral'} />
              </div>
            </div>
          )}

          {/* Head-to-Head Competitor Comparison (if available) */}
          {selectedCompany.headToHead ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2"><Target size={18} className="text-red-600" /> Head-to-Head: {selectedCompany.name} vs {selectedCompany.headToHead.competitor}</h3>
              <p className="text-xs text-gray-500 mb-4">{selectedCompany.headToHead.summary}</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-navy/20">
                      <th className="text-left py-3 px-3 font-bold text-navy">Metric</th>
                      <th className="text-center py-3 px-3 font-bold text-maroon">{selectedCompany.name}</th>
                      <th className="text-center py-3 px-3 font-bold text-blue-700">{selectedCompany.headToHead.competitor}</th>
                      <th className="text-center py-3 px-3 font-bold text-navy">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCompany.headToHead.metrics.map((m, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-2.5 px-3 font-semibold text-gray-700 text-xs">{m.label}</td>
                        <td className={`py-2.5 px-3 text-center font-bold text-sm ${m.winner === 'company' ? 'text-maroon' : 'text-gray-600'}`}>
                          {typeof m.company === 'number' && m.company > 1000 ? `${(m.company / 1000).toFixed(0)}K` : m.company}{m.unit === '%' || m.unit === 'x' ? m.unit : ` ${m.unit}`}
                          {m.winner === 'company' && <span className="ml-1 text-[10px]">✓</span>}
                        </td>
                        <td className={`py-2.5 px-3 text-center font-bold text-sm ${m.winner === 'competitor' ? 'text-blue-700' : 'text-gray-600'}`}>
                          {typeof m.competitor === 'number' && m.competitor > 1000 ? `${(m.competitor / 1000).toFixed(0)}K` : m.competitor}{m.unit === '%' || m.unit === 'x' ? m.unit : ` ${m.unit}`}
                          {m.winner === 'competitor' && <span className="ml-1 text-[10px]">✓</span>}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            m.winner === 'company' ? 'bg-maroon/10 text-maroon' : m.winner === 'competitor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {m.winner === 'company' ? selectedCompany.name.split(' ')[0] : m.winner === 'competitor' ? selectedCompany.headToHead!.competitor.split(' ')[0] : 'Tie'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Score summary */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-maroon/5 rounded-xl text-center border border-maroon/10">
                  <div className="text-2xl font-black text-maroon">{selectedCompany.headToHead.metrics.filter(m => m.winner === 'company').length}</div>
                  <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mt-0.5">{selectedCompany.name} Wins</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-center border border-blue-100">
                  <div className="text-2xl font-black text-blue-700">{selectedCompany.headToHead.metrics.filter(m => m.winner === 'competitor').length}</div>
                  <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mt-0.5">{selectedCompany.headToHead.competitor} Wins</div>
                </div>
              </div>

              {/* Verdict */}
              <div className="mt-4 p-4 bg-navy/5 rounded-xl border border-navy/10">
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1.5">📊 Analyst Verdict</h4>
                <p className="text-xs text-gray-700 leading-relaxed">{selectedCompany.headToHead.verdict}</p>
              </div>
            </div>
          ) : selectedCompany.competitorBenchmark ? (
            /* Fallback to old benchmark table */
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2"><Target size={18} className="text-red-600" /> Competitor Analysis — Industry Benchmark</h3>
              <p className="text-xs text-gray-500 mb-4">Comparing {selectedCompany.competitorBenchmark.company} against industry best performer and industry average</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-navy/20">
                      <th className="text-left py-3 px-3 font-bold text-navy">Metric</th>
                      <th className="text-center py-3 px-3 font-bold text-maroon">{selectedCompany.competitorBenchmark.company}</th>
                      <th className="text-center py-3 px-3 font-bold text-green-700">Industry Best</th>
                      <th className="text-center py-3 px-3 font-bold text-gray-600">Industry Avg</th>
                      <th className="text-center py-3 px-3 font-bold text-navy">vs Best</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCompany.competitorBenchmark.metrics.map((m, i) => {
                      const compVal = typeof m.company === 'number' ? m.company : 0
                      const bestVal = typeof m.industryBest === 'number' ? m.industryBest : 0
                      const lowerIsBetter = m.label.includes('Debt') || m.label.includes('Cost')
                      const isAboveBest = lowerIsBetter ? compVal <= bestVal : compVal >= bestVal
                      const isAboveAvg = lowerIsBetter 
                        ? compVal <= (typeof m.industryAvg === 'number' ? m.industryAvg : 0)
                        : compVal >= (typeof m.industryAvg === 'number' ? m.industryAvg : 0)

                      return (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="py-3 px-3 font-semibold text-gray-700">{m.label}</td>
                          <td className="py-3 px-3 text-center font-bold text-maroon">{m.company}{m.unit !== 'MT' && m.unit !== '$' ? m.unit : ` ${m.unit}`}</td>
                          <td className="py-3 px-3 text-center font-bold text-green-700">{m.industryBest}{m.unit !== 'MT' && m.unit !== '$' ? m.unit : ` ${m.unit}`}</td>
                          <td className="py-3 px-3 text-center text-gray-600">{m.industryAvg}{m.unit !== 'MT' && m.unit !== '$' ? m.unit : ` ${m.unit}`}</td>
                          <td className="py-3 px-3 text-center">
                            {isAboveBest ? (
                              <span className="inline-flex items-center gap-0.5 text-green-600 font-bold text-xs"><ArrowUpRight size={14} /> Best</span>
                            ) : isAboveAvg ? (
                              <span className="inline-flex items-center gap-0.5 text-orange font-bold text-xs"><Minus size={14} /> Above Avg</span>
                            ) : (
                              <span className="inline-flex items-center gap-0.5 text-red-500 font-bold text-xs"><ArrowDownRight size={14} /> Below Avg</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {/* Recent News */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Newspaper size={18} className="text-maroon" /> Recent News & Developments</h3>
            <div className="space-y-3">
              {selectedCompany.news.map((n, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg flex justify-between items-start">
                  <div>
                    <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-700 hover:underline">{n.title}</a>
                    <p className="text-xs text-gray-500 mt-1">{n.source} • {n.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Scope */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Rocket size={18} className="text-purple-600" /> Future Scope & Strategic Outlook</h3>
            <p className="text-sm text-gray-700 mb-4">{selectedCompany.futureScope.outlook}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-navy mb-2">Expansion Plans</h4>
                <ul className="space-y-1">
                  {selectedCompany.futureScope.plans.map((p, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">●</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-navy mb-2">Key Risks</h4>
                <ul className="space-y-1">
                  {selectedCompany.futureScope.risks.map((r, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">●</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedCompany && (
        <div className="text-center py-20 text-gray-400">
          <Building2 size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium text-gray-500">Search for a company to view its snapshot</p>
          <p className="text-sm mt-2">Try: "Tata Steel", "UltraTech", "Maruti", "Bajaj Hindusthan", "Balrampur Chini"</p>
        </div>
      )}
    </div>
  )
}

// Ratio card sub-component
function RatioCard({ label, value, benchmark, status }: { label: string; value: string; benchmark: string; status: 'good' | 'neutral' | 'bad' }) {
  const statusColors = {
    good: 'border-green-200 bg-green-50/50',
    neutral: 'border-gray-100 bg-gray-50/50',
    bad: 'border-red-200 bg-red-50/50',
  }
  const valueColors = {
    good: 'text-green-700',
    neutral: 'text-navy',
    bad: 'text-red-600',
  }

  return (
    <div className={`p-3 rounded-xl border ${statusColors[status]}`}>
      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{label}</div>
      <div className={`text-lg font-bold mt-1 ${valueColors[status]}`}>{value}</div>
      {benchmark && <div className="text-[10px] text-gray-400 mt-0.5">{benchmark}</div>}
    </div>
  )
}
