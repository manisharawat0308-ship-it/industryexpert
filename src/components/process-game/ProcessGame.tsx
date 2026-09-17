import { useState, useEffect } from 'react'
import {
  Gamepad2, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy,
  Award, Lightbulb, Factory, Puzzle, Blocks, Sparkles, Eye, MousePointerClick,
} from 'lucide-react'
import type { IndustryGameData, DiagramSpot, GameQuestion } from './types'
import {
  MAROON, NAVY, ORANGE, GREEN, shuffle, Stat, ResultStat, Confetti,
  TemperatureChart, RawMixChart,
} from './shared'

// ============================================================================
// GENERIC PROCESS GAME ENGINE
// Renders two modes for any industry from its IndustryGameData:
//   • Build mode  — quiz that assembles a themed reward (house, car, etc.)
//   • Jigsaw mode — scrambled tiles of the process diagram + clickable info
// ============================================================================

const GRID = 3

export default function ProcessGame({ data }: { data: IndustryGameData }) {
  const [mode, setMode] = useState<'build' | 'puzzle' | null>(null)

  // Entering a game mode: push a history entry so the browser Back button
  // returns to the mode-select screen instead of leaving the dashboard.
  const enterMode = (m: 'build' | 'puzzle') => {
    window.history.pushState({ processGameMode: m }, '')
    setMode(m)
  }
  const exitMode = () => {
    // going back to mode select via the in-UI button: consume the pushed entry
    if (window.history.state && window.history.state.processGameMode) {
      window.history.back()
    } else {
      setMode(null)
    }
  }

  // Intercept browser Back: if we're inside a game mode, drop to mode select
  // rather than navigating away from the dashboard.
  useEffect(() => {
    const onPop = () => setMode(null)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (mode === 'build') return <BuildMode data={data} onExit={exitMode} />
  if (mode === 'puzzle') return <PuzzleMode data={data} onExit={exitMode} />
  return <ModeSelect data={data} onPick={enterMode} />
}

function ModeSelect({ data, onPick }: { data: IndustryGameData; onPick: (m: 'build' | 'puzzle') => void }) {
  const c = data.brandColor
  const nPer = Math.min(data.questionsPerPlay ?? 10, data.questions.length)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 text-white" style={{ background: `linear-gradient(135deg, ${c}, ${NAVY})` }}>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"><Gamepad2 size={30} /></div>
          <div>
            <h2 className="text-2xl font-extrabold">{data.industryName} Process Challenge</h2>
            <p className="text-sm text-white/85 mt-0.5">Learn how {data.processName} works — and {data.reward.verb.toLowerCase()} a {data.reward.noun.toLowerCase()} along the way.</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
          Pick how you want to play. Questions and options reshuffle every game, so you learn the
          process — not a pattern.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => onPick('build')} className="text-left rounded-2xl border-2 border-gray-100 hover:shadow-md transition overflow-hidden group" style={{ borderColor: undefined }}>
            <div className="h-28 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${c}14, ${ORANGE}22)` }}>
              <div className="w-24 h-16 flex items-center justify-center">{data.reward.renderPreview()}</div>
              <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: c }}>Recommended</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2"><Factory size={18} style={{ color: c }} /><h3 className="font-extrabold text-navy">{data.reward.verb} a {data.reward.noun}</h3></div>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">Answer {nPer} shuffled questions correctly and watch a {data.reward.noun.toLowerCase()} take shape from the {data.industryName.toLowerCase()} process — stage by stage.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: c }}>Start <ArrowRight size={14} /></span>
            </div>
          </button>

          <button onClick={() => onPick('puzzle')} className="text-left rounded-2xl border-2 border-gray-100 hover:shadow-md transition overflow-hidden group">
            <div className="h-28 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${NAVY}12, ${NAVY}22)` }}>
              <Puzzle size={44} style={{ color: NAVY }} className="opacity-80" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2"><Blocks size={18} style={{ color: NAVY }} /><h3 className="font-extrabold text-navy">Process Jigsaw</h3></div>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">The {data.industryName.toLowerCase()} process diagram is cut into tiles and scrambled. Swap tiles to rebuild it, then reveal the real diagram and explore each stage.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: NAVY }}>Solve the jigsaw <ArrowRight size={14} /></span>
            </div>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
          <Stat icon={Factory} label="Questions" value={`${nPer}`} />
          <Stat icon={Puzzle} label="Jigsaw" value={`${GRID}×${GRID}`} />
          <Stat icon={Trophy} label="Reward" value={`A ${data.reward.noun.toLowerCase()}`} />
        </div>
      </div>
    </div>
  )
}

// ---- Build mode ------------------------------------------------------------
interface PlayQuestion extends Omit<GameQuestion, 'options'> {
  options: string[]
  correctIndex: number
}

function buildRound(data: IndustryGameData): PlayQuestion[] {
  const nPer = Math.min(data.questionsPerPlay ?? 10, data.questions.length)
  const picked = shuffle(data.questions).slice(0, nPer)
  return picked.map((q) => {
    const correctText = q.options[0]
    const opts = shuffle(q.options)
    return { ...q, options: opts, correctIndex: opts.indexOf(correctText) }
  })
}

function BuildMode({ data, onExit }: { data: IndustryGameData; onExit: () => void }) {
  const c = data.brandColor
  const PARTS = data.reward.parts
  const [round, setRound] = useState<PlayQuestion[]>(() => buildRound(data))
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [justBuilt, setJustBuilt] = useState(false)

  const total = round.length
  const q = round[qIndex]
  const isCorrect = selected === q.correctIndex
  const builtParts = Math.min(PARTS, Math.round((correctCount / total) * PARTS))
  const buildPct = Math.round((correctCount / total) * 100)

  const choose = (i: number) => {
    if (locked) return
    setSelected(i); setLocked(true)
    if (i === q.correctIndex) {
      setScore((s) => s + 10); setCorrectCount((n) => n + 1)
      setJustBuilt(true); setTimeout(() => setJustBuilt(false), 900)
    }
  }
  const next = () => {
    if (qIndex + 1 >= total) { setFinished(true); return }
    setQIndex((n) => n + 1); setSelected(null); setLocked(false)
  }
  const restart = () => {
    setRound(buildRound(data)); setQIndex(0); setSelected(null)
    setLocked(false); setScore(0); setCorrectCount(0); setFinished(false)
  }

  if (finished) {
    const pct = Math.round((correctCount / total) * 100)
    const grade = pct >= 85 ? 'Expert' : pct >= 60 ? 'Analyst' : 'Trainee'
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 text-white text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c}, ${NAVY})` }}>
          <Confetti />
          <Trophy size={44} className="mx-auto relative" />
          <h2 className="text-2xl font-extrabold mt-3 relative">{data.reward.completionTitle}</h2>
          <p className="text-sm text-white/85 mt-1 relative">{data.reward.completionSubtitle}</p>
        </div>
        <div className="p-8">
          <div className="max-w-sm mx-auto">{data.reward.renderReward(PARTS, true)}</div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-center mt-6">
            <ResultStat value={`${score}`} label="Score" color={c} />
            <ResultStat value={`${correctCount}/${total}`} label="Correct" color={NAVY} />
            <ResultStat value={`${pct}%`} label="Accuracy" color={pct >= 60 ? GREEN : ORANGE} />
          </div>
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: pct >= 60 ? GREEN : ORANGE }}><Award size={16} /> {data.industryName} {grade}</span>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={restart} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition" style={{ backgroundColor: c }}><RotateCcw size={16} /> Play Again</button>
            <button onClick={onExit} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition">Change Mode</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><Factory size={18} style={{ color: c }} /><span className="text-sm font-bold text-navy">{data.reward.verb} a {data.reward.noun} — {data.industryName}</span></div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <button onClick={onExit} className="text-gray-400 hover:text-gray-600">Change mode</button>
            <span className="text-gray-500">Q {qIndex + 1} / {total}</span>
            <span className="px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: NAVY }}>Score {score}</span>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(qIndex / total) * 100}%`, backgroundColor: c }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ backgroundColor: `${ORANGE}22`, color: '#b45309' }}>Topic: {q.topic}</span>
          <h3 className="text-base font-bold text-navy leading-snug mt-2">{q.prompt}</h3>

          {q.image && (
            <div className="mt-4 relative rounded-xl overflow-hidden border border-gray-100 h-40 md:h-48 bg-gray-100">
              <img src={q.image} alt={q.imageAlt} loading="lazy" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute bottom-2 left-3 text-white text-xs font-semibold drop-shadow">{q.topic}</span>
            </div>
          )}

          {q.chart && (
            <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              {q.chart === 'temperature' && <TemperatureChart />}
              {q.chart === 'rawmix' && <RawMixChart />}
              {q.chartCaption && <p className="text-[11px] text-gray-500 mt-2 text-center italic">{q.chartCaption}</p>}
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              let cls = 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'; let icon = null
              if (locked) {
                if (i === q.correctIndex) { cls = 'border-green-400 bg-green-50'; icon = <CheckCircle2 size={18} className="text-green-600 shrink-0" /> }
                else if (i === selected) { cls = 'border-red-300 bg-red-50'; icon = <XCircle size={18} className="text-red-500 shrink-0" /> }
                else { cls = 'border-gray-200 opacity-60' }
              }
              return (
                <button key={i} onClick={() => choose(i)} disabled={locked} className={`flex items-center justify-between gap-2 text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold text-gray-700 transition ${cls}`}>
                  <span className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">{String.fromCharCode(65 + i)}</span>{opt}</span>
                  {icon}
                </button>
              )
            })}
          </div>

          {locked && (
            <div className={`mt-5 rounded-xl border p-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                {isCorrect
                  ? <><CheckCircle2 size={18} className="text-green-600" /><span className="font-bold text-green-700 text-sm">Correct — your {data.reward.noun.toLowerCase()} grows!</span></>
                  : <><Lightbulb size={18} className="text-amber-600" /><span className="font-bold text-amber-700 text-sm">Not quite — here's how it works</span></>}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
              <div className="mt-4 flex justify-end">
                <button onClick={next} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition" style={{ backgroundColor: c }}>{qIndex + 1 >= total ? `See My ${data.reward.noun}` : 'Next Question'} <ArrowRight size={16} /></button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-navy flex items-center gap-1.5"><Trophy size={15} style={{ color: c }} /> Your {data.reward.noun}</span>
            <span className="text-xs font-bold" style={{ color: c }}>{buildPct}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${buildPct}%`, background: `linear-gradient(90deg, ${c}, ${ORANGE})` }} />
          </div>
          <div className={`flex-1 flex items-center justify-center transition-transform duration-300 ${justBuilt ? 'scale-105' : 'scale-100'}`}>{data.reward.renderReward(builtParts, false)}</div>
          <p className="text-[11px] text-gray-500 text-center mt-2">
            {builtParts === 0 ? 'Answer correctly to start.' : builtParts >= PARTS ? 'Complete! 🎉' : `${builtParts} of ${PARTS} stages`}
            {locked && isCorrect && builtParts > 0 && builtParts <= PARTS && <span className="block font-semibold" style={{ color: c }}>{data.reward.partLabels[builtParts - 1]}</span>}
          </p>
        </div>
      </div>
    </div>
  )
}

// ---- Jigsaw mode -----------------------------------------------------------
function scrambleTiles(n: number): number[] {
  let order = Array.from({ length: n }, (_, i) => i)
  do { order = shuffle(order) } while (order.every((t, i) => t === i))
  return order
}

function PuzzleMode({ data, onExit }: { data: IndustryGameData; onExit: () => void }) {
  const n = GRID * GRID
  const [tiles, setTiles] = useState<number[]>(() => scrambleTiles(n))
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [selectedSpot, setSelectedSpot] = useState<DiagramSpot | null>(null)

  const correctCount = tiles.filter((t, i) => t === i).length
  const pct = Math.round((correctCount / n) * 100)
  const solved = correctCount === n
  const diagramInteractive = checked || revealed

  const clickSlot = (slot: number) => {
    if (checked) return
    if (selectedSlot === null) { setSelectedSlot(slot); return }
    if (selectedSlot === slot) { setSelectedSlot(null); return }
    const a = [...tiles]; [a[selectedSlot], a[slot]] = [a[slot], a[selectedSlot]]
    setTiles(a); setSelectedSlot(null)
  }
  const reset = () => { setTiles(scrambleTiles(n)); setSelectedSlot(null); setChecked(false); setRevealed(false); setSelectedSpot(null) }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2"><Puzzle size={18} style={{ color: NAVY }} /><span className="text-sm font-bold text-navy">Process Jigsaw — rebuild the {data.industryName.toLowerCase()} flow diagram</span></div>
        <button onClick={onExit} className="text-xs font-semibold text-gray-400 hover:text-gray-600">Change mode</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-sm text-gray-600 mb-4">
          The process diagram is cut into a {GRID}×{GRID} jigsaw and scrambled. Tap a tile, then tap
          another to <span className="font-bold text-navy">swap</span> them. Rebuild the picture, then
          check your work against the real diagram.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">Your puzzle</p>
            <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ aspectRatio: '3 / 2' }}>
              <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, gridTemplateRows: `repeat(${GRID}, 1fr)` }}>
                {tiles.map((tileId, slot) => {
                  const isSel = selectedSlot === slot
                  const rightPlace = checked && tileId === slot
                  const wrongPlace = checked && tileId !== slot
                  return (
                    <button key={slot} onClick={() => clickSlot(slot)} disabled={checked}
                      className={`relative border transition ${isSel ? 'z-10' : ''}`}
                      style={{ borderColor: rightPlace ? GREEN : wrongPlace ? '#ef4444' : '#e5e7eb', boxShadow: isSel ? `0 0 0 3px ${NAVY}` : undefined }}>
                      <DiagramTile render={data.diagram.renderContent} tileId={tileId} />
                      {checked && (
                        <span className="absolute top-1 right-1">
                          {rightPlace ? <CheckCircle2 size={14} className="text-green-600 bg-white rounded-full" /> : <XCircle size={14} className="text-red-500 bg-white rounded-full" />}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">{checked ? `${correctCount}/${n} tiles in the right place` : selectedSlot !== null ? 'Now tap another tile to swap.' : 'Tap a tile to pick it up.'}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Actual process diagram</p>
              {!checked && (
                <button onClick={() => setRevealed((r) => !r)} className="text-[11px] font-semibold flex items-center gap-1 hover:underline" style={{ color: NAVY }}>
                  <Eye size={12} /> {revealed ? 'Hide hint' : 'Peek'}
                </button>
              )}
            </div>
            <div className={`rounded-xl overflow-hidden border border-gray-200 transition ${diagramInteractive ? 'opacity-100' : 'opacity-0 blur-sm pointer-events-none'}`} style={{ aspectRatio: '3 / 2' }}>
              <FullDiagram render={data.diagram.renderContent} spots={data.diagram.spots} interactive={diagramInteractive} onSelect={setSelectedSpot} activeId={selectedSpot?.id} />
            </div>
            {diagramInteractive && (
              <p className="text-[11px] font-semibold mt-2 flex items-center gap-1" style={{ color: NAVY }}>
                <MousePointerClick size={12} /> Tap any part of the diagram to learn about it.
              </p>
            )}
            {diagramInteractive && selectedSpot && (
              <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-3 animate-[fadeIn_0.2s_ease]">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-navy">{selectedSpot.label}</h4>
                  <button onClick={() => setSelectedSpot(null)} className="text-gray-400 hover:text-gray-600 shrink-0"><XCircle size={15} /></button>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">{selectedSpot.info}</p>
              </div>
            )}
            {!checked && !revealed && <p className="text-[11px] text-gray-400 mt-2 italic">Solve first, or tap "Peek" for a quick hint.</p>}
            {checked && (
              <div className={`mt-3 rounded-xl border p-3 ${solved ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-center gap-2">
                  {solved ? <Sparkles size={16} className="text-green-600" /> : <Lightbulb size={16} className="text-amber-600" />}
                  <span className={`text-sm font-bold ${solved ? 'text-green-700' : 'text-amber-700'}`}>{solved ? 'Perfect — the full diagram is rebuilt!' : `You placed ${pct}% correctly.`}</span>
                </div>
                {!solved && <p className="text-xs text-gray-600 mt-1">Compare your board with the diagram above and try again.</p>}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition"><RotateCcw size={15} /> {checked ? 'New Puzzle' : 'Shuffle'}</button>
          {!checked && <button onClick={() => setChecked(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition" style={{ backgroundColor: NAVY }}>Check & Reveal <ArrowRight size={16} /></button>}
        </div>
      </div>
    </div>
  )
}

function DiagramTile({ render, tileId }: { render: () => React.ReactNode; tileId: number }) {
  const row = Math.floor(tileId / GRID)
  const col = tileId % GRID
  const W = 300, H = 200, tw = W / GRID, th = H / GRID
  return (
    <svg viewBox={`${col * tw} ${row * th} ${tw} ${th}`} className="w-full h-full block" preserveAspectRatio="xMidYMid slice">
      {render()}
    </svg>
  )
}

function FullDiagram({ render, spots, interactive = false, onSelect, activeId }: {
  render: () => React.ReactNode; spots: DiagramSpot[]; interactive?: boolean
  onSelect?: (s: DiagramSpot) => void; activeId?: string | null
}) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full block">
      {render()}
      {[1, 2].map((i) => <line key={`v${i}`} x1={(300 / GRID) * i} y1="0" x2={(300 / GRID) * i} y2="200" stroke="#ffffff" strokeWidth="1" opacity="0.5" />)}
      {[1, 2].map((i) => <line key={`h${i}`} x1="0" y1={(200 / GRID) * i} x2="300" y2={(200 / GRID) * i} stroke="#ffffff" strokeWidth="1" opacity="0.5" />)}
      {interactive && spots.map((s) => (
        <rect key={s.id} x={s.x} y={s.y} width={s.w} height={s.h} rx="3"
          onClick={() => onSelect?.(s)}
          fill={activeId === s.id ? NAVY : 'transparent'} fillOpacity={activeId === s.id ? 0.18 : 0}
          stroke={activeId === s.id ? NAVY : 'transparent'} strokeWidth={activeId === s.id ? 1.5 : 0}
          style={{ cursor: 'pointer' }}>
          <title>{s.label}</title>
        </rect>
      ))}
    </svg>
  )
}
