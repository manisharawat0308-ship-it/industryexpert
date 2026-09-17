import { useMemo } from 'react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell, LabelList, ReferenceDot,
} from 'recharts'

export const MAROON = '#B02A30'
export const NAVY = '#005B75'
export const ORANGE = '#F99D27'
export const GREEN = '#4CAF50'

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
      <Icon size={18} className="mx-auto text-gray-400" />
      <div className="text-lg font-black text-navy mt-1">{value}</div>
      <div className="text-[10px] text-gray-500">{label}</div>
    </div>
  )
}

export function ResultStat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
      <div className="text-3xl font-black" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}

export function Confetti() {
  const dots = useMemo(() => Array.from({ length: 26 }).map((_, i) => ({
    x: Math.random() * 100, delay: Math.random() * 0.6,
    color: [MAROON, ORANGE, GREEN, '#fff', NAVY][i % 5], size: 4 + Math.random() * 4,
  })), [])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span key={i} className="absolute rounded-sm animate-[confettiFall_1.4s_ease-in_forwards]"
          style={{ left: `${d.x}%`, top: '-10px', width: d.size, height: d.size, backgroundColor: d.color, animationDelay: `${d.delay}s` }} />
      ))}
    </div>
  )
}

// ---- Optional charts (referenced by some industries' questions) ------------
const TEMP_DATA = [
  { stage: 'Preheater inlet', temp: 350 }, { stage: 'Preheater', temp: 900 },
  { stage: 'Precalciner', temp: 1100 }, { stage: 'Kiln (burning zone)', temp: 1450 },
  { stage: 'Cooler', temp: 150 }, { stage: 'Cement mill', temp: 90 },
]

export function TemperatureChart() {
  const peak = TEMP_DATA.reduce((a, b) => (b.temp > a.temp ? b : a), TEMP_DATA[0])
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={TEMP_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="pgTempGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={MAROON} stopOpacity={0.6} />
            <stop offset="95%" stopColor={MAROON} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="stage" fontSize={9} interval={0} angle={-12} textAnchor="end" height={50} />
        <YAxis fontSize={10} unit="°C" />
        <Tooltip formatter={(v: number) => [`${v}°C`, 'Temperature']} />
        <Area type="monotone" dataKey="temp" stroke={MAROON} strokeWidth={2} fill="url(#pgTempGrad)" />
        <ReferenceDot x={peak.stage} y={peak.temp} r={6} fill={ORANGE} stroke="#fff" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const RAWMIX_DATA = [
  { material: 'Limestone', pct: 85, color: MAROON }, { material: 'Clay / Shale', pct: 10, color: NAVY },
  { material: 'Iron ore', pct: 3, color: ORANGE }, { material: 'Gypsum (added later)', pct: 2, color: GREEN },
]

export function RawMixChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={RAWMIX_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" horizontal={false} />
        <XAxis type="number" fontSize={10} unit="%" domain={[0, 100]} />
        <YAxis type="category" dataKey="material" fontSize={10} width={110} />
        <Tooltip formatter={(v: number) => [`${v}%`, 'Share']} />
        <Bar dataKey="pct" radius={[0, 6, 6, 0]}>
          {RAWMIX_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
          <LabelList dataKey="pct" position="right" fontSize={11} formatter={(v: number) => `${v}%`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
