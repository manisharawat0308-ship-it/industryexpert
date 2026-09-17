import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer,
  LabelList, PieChart, Pie, ComposedChart, Line,
} from 'recharts'

// ---------------------------------------------------------------------------
// Reusable Cement-style Players board (NO radar/spider chart).
// Renders, from a generic list of players + a small config:
//   1) Ownership / type donut
//   2) Market share (by revenue) with an "Others" slice
//   3) Primary metric (bars) + optional secondary metric (line) composed chart
//   4) Cost / competitiveness ranking (lower or higher = better, configurable)
//   5) Detailed table + rich clickable popup
// ---------------------------------------------------------------------------

const COLORS = ['#B02A30', '#005B75', '#F99D27', '#4CAF50', '#9C27B0', '#0369a1', '#7c3aed', '#e11d48', '#0891b2', '#ca8a04']

export interface PlayerRow {
  rank: number
  name: string
  revenue: number            // ₹ Cr (used for market share)
  type: string               // ownership / category (Private, PSU, LCC, etc.)
  segment?: string           // sub-segment / products
  // Primary manufacturing metric (e.g. capacity MTPA, fleet, properties, assets)
  primary?: number
  // Secondary metric plotted as a line (e.g. utilisation %, occupancy %)
  secondary?: number
  // Competitiveness metric for the ranking bar (e.g. cost/tonne, EBITDA %)
  compete?: number
  // Rich popup extras (any subset)
  hq?: string
  founded?: string | number
  target?: string            // expansion target text
  concentration?: 'Low' | 'Medium' | 'High'
  highlight?: string
  extra?: { label: string; value: string }[]  // additional KPI chips in popup
}

export interface PlayersBoardConfig {
  industryLabel: string
  brandColor?: string
  revenueUnit?: string           // default '₹ Cr'
  primaryLabel?: string          // e.g. 'Capacity (MTPA)'
  primaryUnit?: string           // e.g. ' MTPA'
  secondaryLabel?: string        // e.g. 'Utilisation'
  secondaryUnit?: string         // e.g. '%'
  competeLabel?: string          // e.g. 'Cost / Tonne (₹)'
  competeLowerIsBetter?: boolean // true for cost, false for margin
  competeUnit?: string           // e.g. '₹' prefix handled in render
  competePrefix?: string         // '₹' etc.
  competeSuffix?: string         // '%' etc.
  donutTitle?: string            // e.g. 'Private vs PSU Split'
  marketShareNote?: string
}

const MAROON = '#B02A30'
const NAVY = '#1e3a5f'

function fmtCr(v: number) {
  return v >= 100000 ? `₹${(v / 100000).toFixed(2)} L Cr` : `₹${v.toLocaleString('en-IN')} Cr`
}

export default function PlayersBoard({ players, config }: { players: PlayerRow[]; config: PlayersBoardConfig }) {
  const [selected, setSelected] = useState<PlayerRow | null>(null)
  const brand = config.brandColor || MAROON
  const hasPrimary = players.some((p) => typeof p.primary === 'number')
  const hasSecondary = players.some((p) => typeof p.secondary === 'number')
  const hasCompete = players.some((p) => typeof p.compete === 'number')

  const sorted = [...players].sort((a, b) => b.revenue - a.revenue)

  // ---- Ownership / type donut ----
  const typeMap = new Map<string, number>()
  players.forEach((p) => typeMap.set(p.type, (typeMap.get(p.type) || 0) + p.revenue))
  const donutData = Array.from(typeMap.entries()).map(([type, value]) => ({ type, value }))
  const donutTotal = donutData.reduce((s, d) => s + d.value, 0)

  // ---- Market share (top 6 + Others) ----
  const totalRev = players.reduce((s, p) => s + p.revenue, 0)
  const LEAD = 6
  const leaders = sorted.slice(0, LEAD)
  const othersRev = sorted.slice(LEAD).reduce((s, p) => s + p.revenue, 0)
  const shareData = [
    ...leaders.map((p) => ({ name: p.name, value: p.revenue, share: Math.round((p.revenue / totalRev) * 1000) / 10 })),
    ...(othersRev > 0 ? [{ name: 'Others', value: othersRev, share: Math.round((othersRev / totalRev) * 1000) / 10 }] : []),
  ]

  const competeFmt = (v: number) => `${config.competePrefix || ''}${v.toLocaleString('en-IN')}${config.competeSuffix || ''}`

  return (
    <div className="space-y-6">
      {/* 1) Ownership donut + 2) Market share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ownership / type donut */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">{config.donutTitle || 'Ownership / Type Split'}</h3>
          <p className="text-xs text-gray-500 mb-4">Share of tracked players' revenue by {config.donutTitle ? 'category' : 'ownership type'}.</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" nameKey="type" paddingAngle={3}>
                  {donutData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => fmtCr(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {donutData.map((d, i) => (
                <div key={d.type} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <div className="flex-1 min-w-0"><div className="text-sm font-bold text-navy truncate">{d.type}</div></div>
                  <div className="text-lg font-black" style={{ color: COLORS[i % COLORS.length] }}>{Math.round((d.value / donutTotal) * 100)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market share */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-2">Market Share (by Revenue)</h3>
          <p className="text-xs text-gray-500 mb-4">{config.marketShareNote || 'Leaders shown individually; smaller players grouped as "Others".'}</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={220}>
              <PieChart>
                <Pie data={shareData} cx="50%" cy="50%" outerRadius={85} dataKey="value" nameKey="name" label={(e: any) => `${e.share}%`} labelLine={false} fontSize={10}>
                  {shareData.map((d, i) => <Cell key={i} fill={d.name === 'Others' ? '#94a3b8' : COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number, _n, p: any) => [`${fmtCr(v)} (${p.payload.share}%)`, p.payload.name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1.5">
              {shareData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.name === 'Others' ? '#94a3b8' : COLORS[i % COLORS.length] }} />
                  <span className="flex-1 text-[11px] font-semibold text-navy truncate">{d.name}</span>
                  <span className="text-[11px] font-black text-maroon">{d.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3) Primary metric + secondary line */}
      {hasPrimary && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">{config.primaryLabel || 'Scale'}{hasSecondary ? ` & ${config.secondaryLabel || 'Utilisation'}` : ''}</h3>
          <p className="text-xs text-gray-500 mb-4">{config.primaryLabel || 'Scale'} (bars){hasSecondary ? `, ${config.secondaryLabel || 'utilisation'} (line)` : ''}. Click a player for details.</p>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={players} margin={{ top: 10, right: 10, left: -10, bottom: 40 }} onClick={(d: any) => { if (d && d.activePayload) setSelected(d.activePayload[0]?.payload) }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={8} angle={-25} textAnchor="end" height={60} interval={0} />
              <YAxis yAxisId="l" fontSize={9} unit={config.primaryUnit || ''} />
              {hasSecondary && <YAxis yAxisId="r" orientation="right" fontSize={9} unit={config.secondaryUnit || '%'} domain={[0, 100]} />}
              <Tooltip />
              <Bar yAxisId="l" dataKey="primary" name={config.primaryLabel || 'Scale'} radius={[4, 4, 0, 0]} cursor="pointer">
                {players.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
              {hasSecondary && <Line yAxisId="r" type="monotone" dataKey="secondary" name={config.secondaryLabel || 'Utilisation'} stroke={NAVY} strokeWidth={2.5} dot={{ r: 3 }} />}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 4) Cost / competitiveness ranking */}
      {hasCompete && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy mb-1">{config.competeLabel || 'Competitiveness'}</h3>
          <p className="text-xs text-gray-500 mb-4">{config.competeLowerIsBetter ? 'Lower is better — the cost leader survives downturns best.' : 'Higher is better — the most profitable operators.'}</p>
          <div className="space-y-2.5">
            {[...players].filter((p) => typeof p.compete === 'number')
              .sort((a, b) => config.competeLowerIsBetter ? (a.compete! - b.compete!) : (b.compete! - a.compete!))
              .map((p, i, arr) => {
                const vals = arr.map((x) => x.compete!)
                const min = Math.min(...vals), max = Math.max(...vals)
                const pct = config.competeLowerIsBetter
                  ? 100 - ((p.compete! - min) / (max - min || 1)) * 60
                  : (p.compete! / max) * 100
                return (
                  <button key={p.name} onClick={() => setSelected(p)} className="w-full flex items-center gap-3 group">
                    <span className="w-32 text-left text-[11px] font-semibold text-navy truncate">{p.name}</span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all group-hover:opacity-80" style={{ width: `${pct}%`, background: i === 0 ? '#16a34a' : COLORS[i % COLORS.length] }} />
                    </div>
                    <span className="w-20 text-right text-[11px] font-bold text-maroon">{competeFmt(p.compete!)}</span>
                    {i === 0 && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 shrink-0">{config.competeLowerIsBetter ? 'LEADER' : 'TOP'}</span>}
                  </button>
                )
              })}
          </div>
        </div>
      )}

      {/* 5) Detailed table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-bold text-navy mb-2">Detailed Company Profiles</h3>
        <p className="text-xs text-gray-500 mb-4">👆 Click any row for full profile</p>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b-2 border-navy/20">
              <th className="text-left py-2 px-2 font-bold text-navy">#</th>
              <th className="text-left py-2 px-2 font-bold text-navy">Company</th>
              {hasPrimary && <th className="text-right py-2 px-2 font-bold text-navy">{config.primaryLabel || 'Scale'}</th>}
              <th className="text-right py-2 px-2 font-bold text-navy">Revenue</th>
              <th className="text-center py-2 px-2 font-bold text-navy">Type</th>
              {players.some((p) => p.segment) && <th className="text-center py-2 px-2 font-bold text-navy">Segment</th>}
              <th className="text-center py-2 px-2 font-bold text-navy">Details</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.name} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition" onClick={() => setSelected(p)}>
                <td className="py-2.5 px-2 font-bold text-maroon">{i + 1}</td>
                <td className="py-2.5 px-2 font-semibold text-navy">{p.name}</td>
                {hasPrimary && <td className="py-2.5 px-2 text-right font-bold">{typeof p.primary === 'number' ? `${p.primary}${config.primaryUnit || ''}` : '—'}</td>}
                <td className="py-2.5 px-2 text-right">{fmtCr(p.revenue)}</td>
                <td className="py-2.5 px-2 text-center"><span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-semibold">{p.type}</span></td>
                {players.some((x) => x.segment) && <td className="py-2.5 px-2 text-center text-[10px]">{p.segment || '—'}</td>}
                <td className="py-2.5 px-2 text-center"><span className="text-[9px] font-bold text-maroon bg-maroon/5 px-2 py-1 rounded-lg">View →</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rich popup */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 text-white rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${brand}, ${NAVY})` }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold">{selected.name}</h3>
                  <span className="text-xs text-white/80">{selected.type}{selected.segment ? ` · ${selected.segment}` : ''}</span>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/80 hover:text-white text-2xl font-bold leading-none">×</button>
              </div>
            </div>
            <div className="p-5">
              {/* KPI grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
                <div className="p-2.5 bg-gray-50 rounded-lg text-center"><div className="text-sm font-black text-maroon">{fmtCr(selected.revenue)}</div><div className="text-[9px] text-gray-500">Revenue</div></div>
                {typeof selected.primary === 'number' && <div className="p-2.5 bg-gray-50 rounded-lg text-center"><div className="text-sm font-black text-navy">{selected.primary}{config.primaryUnit || ''}</div><div className="text-[9px] text-gray-500">{config.primaryLabel || 'Scale'}</div></div>}
                {typeof selected.secondary === 'number' && <div className="p-2.5 bg-gray-50 rounded-lg text-center"><div className="text-sm font-black text-blue-700">{selected.secondary}{config.secondaryUnit || '%'}</div><div className="text-[9px] text-gray-500">{config.secondaryLabel || 'Utilisation'}</div></div>}
                {typeof selected.compete === 'number' && <div className="p-2.5 bg-gray-50 rounded-lg text-center"><div className="text-sm font-black text-green-600">{competeFmt(selected.compete)}</div><div className="text-[9px] text-gray-500">{config.competeLabel || 'Metric'}</div></div>}
                {selected.concentration && <div className="p-2.5 bg-gray-50 rounded-lg text-center"><div className={`text-sm font-black ${selected.concentration === 'Low' ? 'text-green-700' : selected.concentration === 'Medium' ? 'text-amber-700' : 'text-red-700'}`}>{selected.concentration}</div><div className="text-[9px] text-gray-500">Concentration</div></div>}
                {(selected.extra || []).map((e, i) => <div key={i} className="p-2.5 bg-gray-50 rounded-lg text-center"><div className="text-sm font-black text-navy">{e.value}</div><div className="text-[9px] text-gray-500">{e.label}</div></div>)}
              </div>

              {/* secondary metric bar */}
              {typeof selected.secondary === 'number' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-gray-500 mb-1"><span>{config.secondaryLabel || 'Utilisation'}</span><span>{selected.secondary}{config.secondaryUnit || '%'}</span></div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${Math.min(100, selected.secondary)}%`, background: selected.secondary >= 70 ? '#16a34a' : selected.secondary >= 55 ? '#F99D27' : '#ef4444' }} /></div>
                </div>
              )}

              {/* meta */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {selected.hq && <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">HQ</span><span className="text-xs font-bold text-navy">{selected.hq}</span></div>}
                {selected.founded && <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Founded</span><span className="text-xs font-bold text-navy">{selected.founded}</span></div>}
                {selected.segment && <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Segment / Products</span><span className="text-xs font-bold text-navy">{selected.segment}</span></div>}
                {selected.target && <div className="p-2.5 bg-gray-50 rounded-lg"><span className="text-[9px] text-gray-500 block">Expansion Target</span><span className="text-xs font-bold text-navy">{selected.target}</span></div>}
              </div>

              {selected.highlight && (
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="text-[9px] font-bold text-orange-700 uppercase">Competitive Edge</span>
                  <p className="text-xs text-orange-800 mt-0.5 leading-relaxed">{selected.highlight}</p>
                </div>
              )}

              <p className="text-[10px] text-gray-400 mt-4">Operational figures are indicative estimates. Open Company Snapshot and search "{selected.name}" for full financials.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
