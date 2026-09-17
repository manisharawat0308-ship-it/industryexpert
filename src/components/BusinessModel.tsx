import { useState, type ReactNode } from 'react'
import {
  Info, Package, Factory, Boxes, Users, TrendingUp, ShieldAlert, ArrowRight, X,
  MousePointerClick,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Reusable "Business 101" board — a plain-English primer on how an industry
// works: what it does, raw materials & sourcing, how it's made, final products,
// customers/end-markets, what impacts the business, and the insurer angle.
// Driven entirely by a per-industry data object so it can be reused for all 18.
// ---------------------------------------------------------------------------

export interface BusinessModelData {
  industryName: string
  brandColor?: string
  // folder key under /public used to look up real step photos, e.g. 'cement'
  // -> /cement/<imageId>.jpg. When set, each process step becomes clickable.
  industryKey?: string
  // 1) What the industry does (2-3 lines)
  intro: string
  tagline?: string
  // quick stat chips
  stats?: { label: string; value: string }[]
  // 2) Raw materials & sourcing
  rawMaterials: { name: string; note: string; source: 'Domestic' | 'Imported' | 'Mixed' }[]
  // 3) How it's made (ordered steps — now richer, with images/icons)
  process: {
    step: string
    detail: string          // 2-3 sentence explanation
    image?: string          // photo URL illustrating the step (optional)
    imageAlt?: string
    imageId?: string        // slug for the real photo file under /<industryKey>/
    icon?: () => ReactNode  // OR a drawn SVG illustration (offline-safe)
    output?: string         // what comes out of this step (e.g. "Molten iron")
    keyFact?: string        // a highlight fact (e.g. "~1600°C")
    more?: string           // extra detail shown in the click-through modal
  }[]
  // short caption above the process flow chart
  processIntro?: string
  // optional big visual process diagram (SVG) rendered above the step cards.
  // Receives an onSelect callback so diagram elements can be clickable.
  processDiagram?: (onSelect: (id: string) => void) => ReactNode
  processDiagramCaption?: string
  // info shown when a diagram element is clicked (keyed by element id)
  diagramInfo?: Record<string, { label: string; info: string }>
  // 4) Final products
  products: { name: string; note: string }[]
  // 5) Customers / end markets (with a rough demand share if known)
  customers: { name: string; note: string; share?: number }[]
  // 6) What impacts the business
  drivers: { factor: string; effect: string; type: 'cost' | 'demand' | 'policy' | 'external' }[]
  // 7) Insurer angle (ICICI Lombard lens) — optional
  insurerNote?: string
  // revenue / cost model one-liner — optional
  economics?: string
  // ---- optional section-label overrides (for non-manufacturing industries
  // like startups, where "How It's Made" / "Raw Materials" don't fit) ----
  labels?: {
    rawMaterials?: string       // default: "Raw Materials & Sourcing"
    rawMaterialsSub?: string    // default: "The key inputs and where they come from."
    products?: string           // default: "Final Products"
    productsSub?: string        // default: "What the industry actually sells."
    process?: string            // default: "How It's Made"
    customers?: string          // default: "Who Buys It — Customers & End Markets"
    customersSub?: string       // default: "The target customers and where demand comes from."
    drivers?: string            // default: "What Impacts the Business"
    economics?: string          // default: "Revenue & Cost Model"
  }
}

const DRIVER_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  cost: { bg: 'bg-red-50 border-red-100', text: 'text-red-700', label: 'Cost' },
  demand: { bg: 'bg-blue-50 border-blue-100', text: 'text-blue-700', label: 'Demand' },
  policy: { bg: 'bg-purple-50 border-purple-100', text: 'text-purple-700', label: 'Policy' },
  external: { bg: 'bg-amber-50 border-amber-100', text: 'text-amber-700', label: 'External' },
}

const SOURCE_STYLE: Record<string, string> = {
  Domestic: 'bg-green-100 text-green-700',
  Imported: 'bg-red-100 text-red-700',
  Mixed: 'bg-amber-100 text-amber-700',
}

// Turn a step title like "1. Quarrying & Crushing" into a filename slug
// ("quarrying-crushing") used to look up a real photo under /<industryKey>/.
function stepSlug(step: string): string {
  return step
    .replace(/^\s*\d+[.)]\s*/, '')     // drop a leading "1." / "2)"
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')       // non-alphanumerics -> hyphen
    .replace(/^-+|-+$/g, '')
}

export default function BusinessModel({ data }: { data: BusinessModelData }) {
  const brand = data.brandColor || '#B02A30'
  const [diagramPick, setDiagramPick] = useState<string | null>(null)
  const pickedInfo = diagramPick && data.diagramInfo ? data.diagramInfo[diagramPick] : null
  // index of the process step whose detailed modal is open (null = closed)
  const [stepPick, setStepPick] = useState<number | null>(null)
  const stepsClickable = !!data.industryKey
  const picked = stepPick != null ? data.process[stepPick] : null
  const pickedImg = picked
    ? (picked.image || (data.industryKey && picked.imageId
        ? `/${data.industryKey}/${picked.imageId}.jpg`
        : data.industryKey ? `/${data.industryKey}/${stepSlug(picked.step)}.jpg` : undefined))
    : undefined

  return (
    <div className="space-y-6">
      {/* 1) What the industry does */}
      <div className="rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 text-white" style={{ background: `linear-gradient(135deg, ${brand}, #1e3a5f)` }}>
          <div className="flex items-center gap-2 mb-2">
            <Info size={18} />
            <h3 className="text-lg font-extrabold">Business 101 — How the {data.industryName} Industry Works</h3>
          </div>
          {data.tagline && <p className="text-sm text-white/80 font-medium mb-2">{data.tagline}</p>}
          <p className="text-sm text-white/90 leading-relaxed max-w-3xl">{data.intro}</p>
          {data.stats && data.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {data.stats.map((s) => (
                <div key={s.label} className="bg-white/15 rounded-lg p-3 text-center">
                  <div className="text-lg font-black">{s.value}</div>
                  <div className="text-[10px] text-white/80">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2) Raw materials & sourcing + 4) Final products side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold text-navy flex items-center gap-2 mb-1"><Package size={17} style={{ color: brand }} /> {data.labels?.rawMaterials || 'Raw Materials & Sourcing'}</h3>
          <p className="text-xs text-gray-500 mb-4">{data.labels?.rawMaterialsSub || 'The key inputs and where they come from.'}</p>
          <div className="space-y-2.5">
            {data.rawMaterials.map((r) => (
              <div key={r.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-navy">{r.name}</div>
                  <div className="text-[11px] text-gray-600 leading-snug">{r.note}</div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${SOURCE_STYLE[r.source]}`}>{r.source}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold text-navy flex items-center gap-2 mb-1"><Boxes size={17} style={{ color: brand }} /> {data.labels?.products || 'Final Products'}</h3>
          <p className="text-xs text-gray-500 mb-4">{data.labels?.productsSub || 'What the industry actually sells.'}</p>
          <div className="grid grid-cols-1 gap-2.5">
            {data.products.map((p) => (
              <div key={p.name} className="p-3 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: brand }}>
                <div className="text-sm font-bold text-navy">{p.name}</div>
                <div className="text-[11px] text-gray-600 leading-snug">{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3) How it's made — process flow chart + detailed step cards with images */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-navy flex items-center gap-2 mb-1"><Factory size={17} style={{ color: brand }} /> {data.labels?.process || "How It's Made"}</h3>
        <p className="text-xs text-gray-500 mb-2">{data.processIntro || 'The full production journey — follow the flow, then explore each step in detail.'}</p>
        {stepsClickable && (
          <p className="text-[11px] font-semibold mb-4 flex items-center gap-1" style={{ color: brand }}>
            <MousePointerClick size={12} /> Click any step below to open a detailed view with a picture of that stage.
          </p>
        )}

        {/* Process flow chart */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex items-stretch gap-1 min-w-max pb-2">
            {data.process.map((s, i) => {
              const clickable = stepsClickable
              return (
              <div key={s.step} className="flex items-stretch gap-1">
                <div
                  role={clickable ? 'button' : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onClick={clickable ? () => setStepPick(i) : undefined}
                  onKeyDown={clickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStepPick(i) } } : undefined}
                  className={`w-36 rounded-xl border-2 p-3 flex flex-col transition-all ${clickable ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''}`}
                  style={{ borderColor: `${brand}44`, background: `${brand}08` }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[10px] font-black shrink-0" style={{ backgroundColor: brand }}>{i + 1}</span>
                    <span className="text-[11px] font-bold text-navy leading-tight">{s.step}</span>
                  </div>
                  {s.keyFact && <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full self-start mb-1" style={{ backgroundColor: `${brand}18`, color: brand }}>{s.keyFact}</span>}
                  {s.output && <span className="text-[9px] text-gray-500 mt-auto">→ {s.output}</span>}
                  {clickable && <span className="text-[8px] font-bold mt-1 flex items-center gap-0.5" style={{ color: brand }}><MousePointerClick size={9} /> View</span>}
                </div>
                {i < data.process.length - 1 && <div className="flex items-center px-0.5"><ArrowRight size={16} style={{ color: `${brand}88` }} /></div>}
              </div>
              )
            })}
          </div>
        </div>

        {/* Big visual process diagram (SVG) — clickable */}
        {data.processDiagram && (
          <div className="mb-6 rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
            {data.diagramInfo && <p className="text-[11px] font-semibold mb-2 flex items-center gap-1" style={{ color: brand }}><Info size={12} /> Tap any part of the diagram to learn what it is.</p>}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[720px]">{data.processDiagram(setDiagramPick)}</div>
            </div>
            {/* Inline info panel for the clicked element */}
            {pickedInfo && (
              <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 animate-[fadeIn_0.2s_ease]">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-navy">{pickedInfo.label}</h4>
                  <button onClick={() => setDiagramPick(null)} className="text-gray-400 hover:text-gray-600 shrink-0"><X size={15} /></button>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">{pickedInfo.info}</p>
              </div>
            )}
            {data.processDiagramCaption && <p className="text-[10px] text-gray-400 text-center mt-2">{data.processDiagramCaption}</p>}
          </div>
        )}

        {/* Detailed step cards with images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.process.map((s, i) => (
            <div
              key={s.step}
              role={stepsClickable ? 'button' : undefined}
              tabIndex={stepsClickable ? 0 : undefined}
              onClick={stepsClickable ? () => setStepPick(i) : undefined}
              onKeyDown={stepsClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStepPick(i) } } : undefined}
              className={`rounded-xl border border-gray-100 overflow-hidden bg-white flex flex-col transition-all ${stepsClickable ? 'cursor-pointer hover:shadow-md hover:border-gray-200' : ''}`}
            >
              {/* Visual: photo if provided, else drawn SVG icon */}
              {(s.image || s.icon) && (
                <div className="relative h-36 bg-gray-100">
                  {s.icon
                    ? s.icon()
                    : <img src={s.image} alt={s.imageAlt || s.step} loading="lazy" className="w-full h-full object-cover"
                        onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none' }} />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-3 text-navy text-xs font-bold flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[10px] font-black" style={{ backgroundColor: brand }}>{i + 1}</span>
                    <span className="bg-white/85 rounded px-1.5 py-0.5">{s.step}</span>
                  </span>
                  {s.keyFact && <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-navy shadow-sm">{s.keyFact}</span>}
                </div>
              )}
              <div className="p-4 flex-1">
                {!s.image && !s.icon && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-[11px] font-black" style={{ backgroundColor: brand }}>{i + 1}</span>
                    <span className="text-sm font-bold text-navy">{s.step}</span>
                    {s.keyFact && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto" style={{ backgroundColor: `${brand}18`, color: brand }}>{s.keyFact}</span>}
                  </div>
                )}
                <p className="text-xs text-gray-700 leading-relaxed">{s.detail}</p>
                {s.output && <p className="text-[11px] font-semibold mt-2" style={{ color: brand }}>Output: {s.output}</p>}
                {stepsClickable && <p className="text-[10px] font-bold mt-2 flex items-center gap-1" style={{ color: brand }}><MousePointerClick size={11} /> Click for full detail & picture</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step detail modal (click-through) */}
      {picked && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-[fadeIn_0.15s_ease]"
          onClick={() => setStepPick(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual header: real photo if it exists, else drawn SVG icon */}
            <div className="relative h-56 bg-gray-100 shrink-0">
              {pickedImg && (
                <img
                  src={pickedImg}
                  alt={picked.imageAlt || picked.step}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // photo not present -> hide it and reveal the SVG fallback beneath
                    e.currentTarget.style.display = 'none'
                    const fb = e.currentTarget.nextElementSibling as HTMLElement | null
                    if (fb) fb.style.display = 'block'
                  }}
                />
              )}
              <div className="w-full h-full" style={{ display: pickedImg ? 'none' : 'block' }}>
                {picked.icon ? picked.icon() : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: `${brand}12` }}>
                    <Factory size={56} style={{ color: brand }} />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <button
                onClick={() => setStepPick(null)}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-1.5 text-gray-700 shadow"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-black shadow" style={{ backgroundColor: brand }}>{(stepPick ?? 0) + 1}</span>
                <span className="bg-white/90 rounded px-2 py-0.5 text-sm font-bold text-navy">{picked.step}</span>
              </div>
            </div>
            {/* Body */}
            <div className="p-5 overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-3">
                {picked.keyFact && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${brand}18`, color: brand }}>{picked.keyFact}</span>}
                {picked.output && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">Output: {picked.output}</span>}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{picked.detail}</p>
              {picked.more && <p className="text-sm text-gray-700 leading-relaxed mt-3">{picked.more}</p>}
            </div>
          </div>
        </div>
      )}

      {/* 5) Customers / end markets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-navy flex items-center gap-2 mb-1"><Users size={17} style={{ color: brand }} /> {data.labels?.customers || 'Who Buys It — Customers & End Markets'}</h3>
        <p className="text-xs text-gray-500 mb-4">{data.labels?.customersSub || 'The target customers and where demand comes from.'}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.customers.map((c) => (
            <div key={c.name} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-navy">{c.name}</span>
                {typeof c.share === 'number' && <span className="text-xs font-black" style={{ color: brand }}>{c.share}%</span>}
              </div>
              {typeof c.share === 'number' && (
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden my-1.5"><div className="h-full rounded-full" style={{ width: `${c.share}%`, backgroundColor: brand }} /></div>
              )}
              <div className="text-[11px] text-gray-600 leading-snug">{c.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 6) What impacts the business */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-navy flex items-center gap-2 mb-1"><TrendingUp size={17} style={{ color: brand }} /> {data.labels?.drivers || 'What Impacts the Business'}</h3>
        <p className="text-xs text-gray-500 mb-4">The key factors that move profits up or down.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.drivers.map((d) => {
            const st = DRIVER_STYLE[d.type]
            return (
              <div key={d.factor} className={`p-3 rounded-lg border ${st.bg}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-bold text-navy">{d.factor}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-white ${st.text}`}>{st.label}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-snug">{d.effect}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Economics + insurer angle */}
      {(data.economics || data.insurerNote) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.economics && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-bold text-navy flex items-center gap-2 mb-2"><TrendingUp size={17} style={{ color: brand }} /> {data.labels?.economics || 'Revenue & Cost Model'}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{data.economics}</p>
            </div>
          )}
          {data.insurerNote && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-bold text-navy flex items-center gap-2 mb-2"><ShieldAlert size={17} className="text-maroon" /> Why It Matters to an Insurer</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{data.insurerNote}</p>
            </div>
          )}
        </div>
      )}

      <p className="text-[9px] text-gray-400">A simplified primer for general understanding. Figures are indicative.</p>
    </div>
  )
}
