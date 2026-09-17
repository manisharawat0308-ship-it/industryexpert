import { useState } from 'react'
import { Calendar, MapPin, ExternalLink, X } from 'lucide-react'

export interface NewsItem {
  title: string
  date: string
  source?: string
  region?: string
  category?: string
  sentiment?: string
  summary?: string
  url?: string
}

// Resolves the best link for a news item.
// Uses an explicit url if provided (and not a placeholder like '#'),
// otherwise builds a Google News search for the headline so the user
// always lands on relevant, real coverage of the story.
function resolveUrl(item: NewsItem): string {
  const u = (item.url || '').trim()
  if (u && u !== '#' && /^https?:\/\//i.test(u)) return u
  const query = encodeURIComponent(`${item.title}${item.source ? ' ' + item.source : ''}`)
  return `https://news.google.com/search?q=${query}&hl=en-IN&gl=IN`
}

function sentimentColor(s?: string) {
  const v = (s || '').toLowerCase()
  if (v === 'positive') return 'bg-green-100 text-green-700'
  if (v === 'negative') return 'bg-red-100 text-red-700'
  if (v === 'neutral') return 'bg-amber-100 text-amber-700'
  return 'bg-blue-100 text-blue-700'
}

function categoryColor(c?: string) {
  if (c === 'Business Wins') return 'bg-green-100 text-green-800'
  if (c === 'Accidents') return 'bg-red-100 text-red-800'
  if (c === 'Policy') return 'bg-blue-100 text-blue-800'
  return 'bg-gray-100 text-gray-700'
}

function dotColor(item: NewsItem) {
  const s = (item.sentiment || '').toLowerCase()
  if (s === 'positive') return 'bg-green-500'
  if (s === 'negative') return 'bg-red-500'
  if (s === 'neutral') return 'bg-amber-500'
  if (item.category === 'Business Wins') return 'bg-green-500'
  if (item.category === 'Accidents') return 'bg-red-500'
  if (item.category === 'Policy') return 'bg-blue-500'
  return 'bg-gray-400'
}

// Generates a readable long-form detail when the item has no explicit summary
function buildDetail(item: NewsItem): string {
  if (item.summary && item.summary.trim().length > 0) return item.summary
  const src = item.source ? ` according to ${item.source}` : ''
  const reg = item.region && item.region !== 'National' ? ` in the ${item.region} region` : ''
  return `${item.title}${reg}. This development${src} is being closely watched by industry stakeholders for its impact on operations, capacity, pricing, and risk exposure. Analysts note that such events shape the competitive landscape and can influence insurance and investment decisions across the sector.`
}

interface NewsFeedProps {
  title?: string
  subtitle?: string
  items: NewsItem[]
  accentColor?: string
  showRegionFilter?: boolean
}

export default function NewsFeed({ title = 'Industry News & Developments', subtitle = 'Click any story for details', items, accentColor = '#B02A30', showRegionFilter }: NewsFeedProps) {
  const [selected, setSelected] = useState<NewsItem | null>(null)
  const [regionFilter, setRegionFilter] = useState('All')

  const hasRegions = showRegionFilter ?? items.some((n) => !!n.region)
  const regions = ['All', ...Array.from(new Set(items.map((n) => n.region).filter(Boolean) as string[]))]
  const filtered = regionFilter === 'All' ? items : items.filter((n) => n.region === regionFilter)

  const fmtDate = (d: string) => {
    const parsed = new Date(d)
    if (!isNaN(parsed.getTime()) && /\d{4}-\d{2}/.test(d)) {
      return parsed.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }
    return d
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <h3 className="text-lg font-bold text-navy">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>

        {hasRegions && regions.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {regions.map((r) => (
              <button key={r} onClick={() => setRegionFilter(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${regionFilter === r ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-300 hover:border-navy'}`}>{r}</button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(item)}
              className="text-left bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-maroon/30 transition cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                {item.category ? (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${categoryColor(item.category)}`}>{item.category}</span>
                ) : item.sentiment ? (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${sentimentColor(item.sentiment)}`}>{item.sentiment}</span>
                ) : (
                  <span className={`w-2 h-2 rounded-full mt-1.5 ${dotColor(item)}`} />
                )}
                <div className="flex items-center gap-1 text-[10px] text-gray-400 shrink-0">
                  <Calendar size={11} />
                  {fmtDate(item.date)}
                </div>
              </div>
              <h4 className="font-bold text-navy text-sm leading-snug">{item.title}</h4>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {item.source && <span className="text-[10px] text-gray-500 font-medium">{item.source}</span>}
                {item.region && (
                  <span className="flex items-center gap-1 text-[10px] text-gray-400"><MapPin size={10} /> {item.region}</span>
                )}
                <a
                  href={resolveUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] font-bold text-maroon ml-auto flex items-center gap-1 hover:underline"
                >
                  Open source <ExternalLink size={10} />
                </a>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                {selected.category && <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${categoryColor(selected.category)}`}>{selected.category}</span>}
                {selected.sentiment && <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${sentimentColor(selected.sentiment)}`}>{selected.sentiment}</span>}
                {selected.region && <span className="flex items-center gap-1 text-[10px] text-gray-500"><MapPin size={11} /> {selected.region}</span>}
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 shrink-0"><X size={20} /></button>
            </div>

            <h3 className="text-lg font-bold text-navy leading-snug">{selected.title}</h3>
            <div className="flex items-center gap-3 mt-2 mb-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Calendar size={12} /> {fmtDate(selected.date)}</span>
              {selected.source && <><span className="text-gray-300">|</span><span className="font-semibold text-gray-600">{selected.source}</span></>}
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Summary</span>
              <p className="text-sm text-gray-700 leading-relaxed">{buildDetail(selected)}</p>
            </div>

            <a
              href={resolveUrl(selected)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              Open Source Article <ExternalLink size={16} />
            </a>

            <p className="text-[10px] text-gray-400 mt-3">
              {(selected.url && selected.url.trim() && selected.url.trim() !== '#')
                ? `Links to the original coverage${selected.source ? ` on ${selected.source}` : ''}.`
                : 'No direct link on file — opens a Google News search for this headline so you land on the actual reporting.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
