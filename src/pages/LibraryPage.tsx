import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, BookOpen, Newspaper, Building2, FileText, Landmark, Database, RefreshCw, X, Link2, Check, Globe } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { LIBRARY, type IndustryLibrary, type LibraryResource } from '../data/libraryData'

interface FeedItem {
  title: string
  link: string
  pubDate: string
  source: string
}

const typeIcon: Record<LibraryResource['type'], any> = {
  Newsletter: Newspaper,
  Report: FileText,
  Regulator: Landmark,
  Association: Building2,
  Data: Database,
}

export default function LibraryPage() {
  const navigate = useNavigate()
  const { username } = useAuthStore()
  const [activeId, setActiveId] = useState<string>(LIBRARY[0].id)
  const active: IndustryLibrary = LIBRARY.find((l) => l.id === activeId) || LIBRARY[0]

  const [feed, setFeed] = useState<FeedItem[]>([])
  const [feedState, setFeedState] = useState<'loading' | 'ready' | 'error'>('loading')

  // Resource detail modal
  const [selectedResource, setSelectedResource] = useState<LibraryResource | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = (url: string) => {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }).catch(() => {})
  }

  // Close modal on Escape
  useEffect(() => {
    if (!selectedResource) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedResource(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedResource])

  useEffect(() => {
    let cancelled = false
    setFeedState('loading')
    setFeed([])

    // Live newsletter/news feed via a public RSS -> JSON proxy (Google News, India-focused).
    const rss = `https://news.google.com/rss/search?q=${encodeURIComponent(active.newsQuery)}&hl=en-IN&gl=IN&ceid=IN:en`
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}&count=8`

    fetch(api)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length) {
          setFeed(
            data.items.slice(0, 8).map((it: any) => ({
              title: it.title,
              link: it.link,
              pubDate: it.pubDate,
              source: (it.title.split(' - ').pop() || 'Google News') as string,
            }))
          )
          setFeedState('ready')
        } else {
          setFeedState('error')
        }
      })
      .catch(() => { if (!cancelled) setFeedState('error') })

    return () => { cancelled = true }
  }, [activeId, active.newsQuery])

  const googleNewsUrl = `https://news.google.com/search?q=${encodeURIComponent(active.newsQuery)}&hl=en-IN&gl=IN`

  const fmtDate = (d: string) => {
    const dt = new Date(d)
    return isNaN(dt.getTime()) ? '' : dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="min-h-screen font-mulish pb-12" style={{ backgroundColor: '#f7f9fc' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/icici-lombard-logo.svg" alt="ICICI Lombard" className="h-9 shrink-0" />
            <div className="h-8 w-px bg-gray-200 shrink-0" />
            <div className="flex items-center gap-2 min-w-0">
              <BookOpen size={18} className="text-maroon shrink-0" />
              <div className="min-w-0">
                <h1 className="text-base font-bold text-navy leading-tight truncate">Industry Library</h1>
                <p className="text-[11px] text-gray-500 font-medium truncate">Newsletters, reports & live news across all sectors</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
              <span className="text-xs font-semibold text-gray-700">{username}</span>
            </div>
            <button onClick={() => navigate('/hub')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-navy transition">
              <ArrowLeft size={15} /> Back to Hub
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Industry selector */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-3 lg:sticky lg:top-20">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-2 pb-2">Industries</p>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1 max-h-[70vh] overflow-y-auto">
                {LIBRARY.map((lib) => (
                  <button
                    key={lib.id}
                    onClick={() => setActiveId(lib.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${activeId === lib.id ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={activeId === lib.id ? { backgroundColor: lib.brandColor } : {}}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: activeId === lib.id ? '#fff' : lib.brandColor }} />
                    {lib.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="lg:col-span-3 space-y-6">
            <div className="rounded-xl p-5 text-white" style={{ backgroundColor: active.brandColor }}>
              <h2 className="text-xl font-extrabold">{active.name}</h2>
              <p className="text-xs text-white/80 mt-1">Curated resources and the latest industry news, updated automatically.</p>
            </div>

            {/* Live feed */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-navy flex items-center gap-2"><Newspaper size={18} className="text-maroon" /> Latest News & Newsletters</h3>
                <a href={googleNewsUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-maroon hover:underline flex items-center gap-1">Open in Google News <ExternalLink size={12} /></a>
              </div>

              {feedState === 'loading' && (
                <div className="flex items-center gap-2 text-sm text-gray-500 py-6"><RefreshCw size={16} className="animate-spin" /> Fetching the latest {active.name} news…</div>
              )}

              {feedState === 'ready' && (
                <div className="space-y-2">
                  {feed.map((item, i) => (
                    <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-gray-800 leading-snug">{item.title.replace(/ - [^-]+$/, '')}</p>
                        <ExternalLink size={13} className="text-gray-400 shrink-0 mt-0.5" />
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1">{item.source}{fmtDate(item.pubDate) ? ` · ${fmtDate(item.pubDate)}` : ''}</p>
                    </a>
                  ))}
                </div>
              )}

              {feedState === 'error' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  Live news couldn't load right now (needs an internet connection).{' '}
                  <a href={googleNewsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Open the latest {active.name} news on Google News →</a>
                </div>
              )}
            </div>

            {/* Curated resources */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-navy flex items-center gap-2 mb-4"><BookOpen size={18} className="text-maroon" /> Curated Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {active.resources.map((res, i) => {
                  const TIcon = typeIcon[res.type]
                  return (
                    <button
                      key={i}
                      onClick={() => { setCopied(false); setSelectedResource(res) }}
                      className="text-left flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition group"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${active.brandColor}15` }}>
                        <TIcon size={17} style={{ color: active.brandColor }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-navy truncate">{res.title}</h4>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 shrink-0">{res.type}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{res.description}</p>
                        <p className="text-[10px] font-semibold mt-1.5 flex items-center gap-1 group-hover:underline" style={{ color: active.brandColor }}>View details <ExternalLink size={10} /></p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] text-gray-400 mt-4">Click a resource to see details, then open the official website in a new tab. Live news is aggregated from Google News for the selected industry.</p>
            </div>
          </section>
        </div>
      </main>

      {/* Resource detail modal */}
      {selectedResource && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedResource(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-[fadeIn_0.15s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="px-6 py-5 text-white relative" style={{ backgroundColor: active.brandColor }}>
              <button
                onClick={() => setSelectedResource(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <div className="flex items-center gap-3 pr-10">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  {(() => { const TIcon = typeIcon[selectedResource.type]; return <TIcon size={22} /> })()}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold leading-tight">{selectedResource.title}</h3>
                  <p className="text-xs text-white/80">{selectedResource.source}</p>
                </div>
              </div>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{selectedResource.type}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${active.brandColor}15`, color: active.brandColor }}>{active.name}</span>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">About this resource</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedResource.description}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Link</p>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <Globe size={14} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-600 truncate flex-1">{selectedResource.url}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={selectedResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: active.brandColor }}
                >
                  <ExternalLink size={15} /> Open website
                </a>
                <button
                  onClick={() => handleCopyLink(selectedResource.url)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                >
                  {copied ? <><Check size={15} className="text-green-600" /> Copied</> : <><Link2 size={15} /> Copy link</>}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center">Opens the official website in a new browser tab.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
