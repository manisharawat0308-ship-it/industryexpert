import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const TEXTILE = '#7c3aed'

// Reward: a T-shirt taking shape (6 parts)
function ShirtBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const bodyFill = show(4) ? '#ddd6fe' : '#e5e7eb'
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="T-shirt being made">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* body */}
      {show(3) && <path d="M75 70 L95 55 L125 55 L145 70 L135 95 L135 160 L85 160 L85 95 Z" fill={bodyFill} stroke="#a78bfa" strokeWidth="2" className="animate-[fadeIn_0.5s_ease]" />}
      {/* sleeves */}
      {show(2) && <><path d="M75 70 L58 90 L72 100 L88 82 Z" fill={bodyFill} stroke="#a78bfa" strokeWidth="1.5" /><path d="M145 70 L162 90 L148 100 L132 82 Z" fill={bodyFill} stroke="#a78bfa" strokeWidth="1.5" /></>}
      {/* collar */}
      {show(1) && <path d="M95 55 Q110 68 125 55" fill="none" stroke="#a78bfa" strokeWidth="2" />}
      {/* dye colour fill */}
      {show(5) && <path d="M75 70 L95 55 L125 55 L145 70 L135 95 L135 160 L85 160 L85 95 Z" fill={TEXTILE} opacity="0.55" />}
      {/* print/finish */}
      {show(6) && <><circle cx="110" cy="110" r="14" fill="#fff" opacity="0.9" /><text x="110" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill={TEXTILE}>★</text><circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" /></>}
      {parts === 0 && <path d="M75 70 L95 55 L125 55 L145 70 L135 95 L135 160 L85 160 L85 95 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" />}
      {highlight && show(6) && <text x="110" y="185" textAnchor="middle" fontSize="10" fontWeight="bold" fill={TEXTILE}>A finished garment!</text>}
    </svg>
  )
}
function ShirtPreview() {
  return (
    <svg viewBox="0 0 70 60" className="w-16 h-14">
      <path d="M18 20 L26 14 L44 14 L52 20 L47 30 L47 52 L23 52 L23 30 Z" fill={TEXTILE} opacity="0.6" stroke="#a78bfa" strokeWidth="1.5" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#f5f3ff" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Cotton boll / fibre */}
      <circle cx="24" cy="42" r="5" fill="#fff" stroke="#94a3b8" /><circle cx="32" cy="46" r="5" fill="#fff" stroke="#94a3b8" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Fibre/Cotton</text>
      {/* Spinning */}
      <circle cx="88" cy="44" r="11" fill="#a855f7" /><circle cx="88" cy="44" r="4" fill="#f5f3ff" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Spinning</text>
      {/* Yarn cone */}
      <path d="M132 54 l6 -22 l6 22 z" fill="#f59e0b" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Yarn</text>
      {/* Weaving/Knitting */}
      <rect x="178" y="32" width="24" height="22" rx="2" fill="#3b82f6" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Weave/Knit</text>
      {/* Greige fabric */}
      <rect x="228" y="34" width="24" height="18" rx="2" fill="#e5e7eb" stroke="#94a3b8" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Greige</text>
      {/* Dyeing */}
      <rect x="228" y="98" width="24" height="14" rx="2" fill="#7c3aed" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Dye/Process</text>
      {/* Finishing */}
      <rect x="178" y="98" width="24" height="14" rx="2" fill="#14b8a6" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Finishing</text>
      {/* Cut & sew (shirt) */}
      <path d="M132 112 l4 -12 l8 0 l4 12 z" fill="#a78bfa" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Cut & Sew</text>
      {/* Dispatch */}
      <rect x="46" y="140" width="18" height="20" rx="2" fill={TEXTILE} /><text x="55" y="172" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Garment</text>
    </>
  )
}

export const TEXTILE_GAME: IndustryGameData = {
  industryName: 'Textile',
  brandColor: TEXTILE,
  processName: 'textile & garment making',
  reward: {
    noun: 'Garment', verb: 'Make', parts: 6,
    partLabels: ['Fibre spun into yarn', 'Sleeves knitted/woven', 'Body panels formed', 'Panels cut', 'Fabric dyed', 'Printed, stitched & finished!'],
    renderReward: ShirtBuild, renderPreview: ShirtPreview,
    completionTitle: 'Your Garment is Made!',
    completionSubtitle: 'From raw fibre to a finished garment — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Value Chain', prompt: 'What is the correct order of the textile value chain?', options: ['Fibre → Yarn → Fabric → Processing → Garment', 'Garment → Fabric → Fibre → Yarn', 'Yarn → Fibre → Garment → Fabric', 'Fabric → Fibre → Yarn → Garment'], explanation: 'Textiles flow from fibre (cotton, polyester) → spinning into yarn → weaving/knitting into fabric → wet processing (dyeing/finishing) → cutting and stitching into garments. India is one of few countries present across the whole chain.' },
    { topic: 'Fibres', prompt: 'Which is India\'s dominant natural fibre, making it a global cotton leader?', options: ['Cotton', 'Wool', 'Silk', 'Jute'], explanation: 'India is among the world\'s largest cotton producers and the natural-fibre backbone of its textile industry. Man-made fibres (polyester, viscose) are the fast-growing complement.' },
    { topic: 'Spinning', prompt: 'What does the spinning stage do?', options: ['Twists loose fibres into continuous yarn', 'Dyes the fabric', 'Cuts the garment', 'Weaves cloth'], explanation: 'Spinning mills clean, card, draw, and twist short fibres into a continuous, strong yarn wound onto cones. Yarn count (fineness) is a key quality parameter.' },
    { topic: 'Weaving vs Knitting', prompt: 'What is the difference between weaving and knitting?', options: ['Weaving interlaces two yarn sets at right angles; knitting inter-loops one yarn', 'They are identical', 'Weaving uses glue; knitting uses heat', 'Knitting makes yarn; weaving makes fibre'], explanation: 'Weaving interlaces warp and weft yarns at right angles on a loom to make woven fabric (shirts, denim). Knitting inter-loops yarn to make stretchy knit fabric (T-shirts, hosiery).' },
    { topic: 'Greige Fabric', prompt: 'Fabric straight off the loom/knitting machine, before dyeing, is called:', options: ['Greige (grey) fabric', 'Denim', 'Yarn', 'Fibre'], explanation: 'Unprocessed fabric fresh from weaving/knitting is "greige" (grey) fabric. It still needs de-sizing, scouring, bleaching, dyeing/printing, and finishing before it becomes a usable material.' },
    { topic: 'Wet Processing', prompt: 'Dyeing, printing and finishing together are known as:', options: ['Wet processing', 'Spinning', 'Ginning', 'Carding'], explanation: 'Wet processing colours (dyeing/printing) and treats (softening, wrinkle-resistance, water-repellence) the fabric. It is water- and chemical-intensive, so effluent treatment is a major focus.' },
    { topic: 'Ginning', prompt: 'Before spinning, raw cotton must be "ginned". What does ginning do?', options: ['Separates cotton fibre (lint) from the seeds', 'Dyes the cotton', 'Weaves the cotton', 'Bleaches the cotton'], explanation: 'Ginning mechanically separates the usable cotton fibre (lint) from the seeds. The lint is then baled and sent to spinning mills; cottonseed becomes oil and cattle feed.' },
    { topic: 'Man-Made Fibre', prompt: 'Which man-made fibre is the fastest-growing globally and made from petrochemicals?', options: ['Polyester', 'Cotton', 'Jute', 'Wool'], explanation: 'Polyester (from PTA/MEG petrochemicals) is the world\'s most-used fibre thanks to low cost, strength, and easy care. India\'s MMF segment is growing faster than cotton.' },
    { topic: 'Cut & Sew', prompt: 'In garmenting, finished fabric is turned into clothing by:', options: ['Cutting panels and stitching them together', 'Melting and moulding', 'Spinning again', 'Bleaching'], explanation: 'Garment factories lay and cut fabric into panels (using patterns/markers), then stitch them on sewing lines, followed by checking, pressing, and packing — the most labour-intensive stage.' },
    { topic: 'Exports', prompt: 'Which end product category is a major export earner for Indian textiles?', options: ['Ready-made garments & home textiles', 'Iron ore', 'Cement', 'Crude oil'], explanation: 'Ready-made garments (RMG) and home textiles (bed/bath linen — where India is a world leader) are the biggest textile export categories, supported by schemes like PLI and PM MITRA parks.' },
    { topic: 'Sustainability', prompt: 'A key sustainability concern in textile wet-processing is:', options: ['Water use and dye effluent', 'Excess sunlight', 'Too little cotton', 'Over-spinning'], explanation: 'Dyeing and finishing consume large volumes of water and generate coloured effluent, so mills invest in effluent treatment, water recycling, and increasingly zero-liquid-discharge systems.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'fibre', label: 'Fibre / Cotton', info: 'The raw material — natural cotton (ginned from seed) or man-made fibres like polyester and viscose.', x: 14, y: 30, w: 30, h: 34 },
      { id: 'spinning', label: 'Spinning', info: 'Cleans, cards, and twists loose fibres into a continuous, strong yarn wound onto cones.', x: 74, y: 32, w: 28, h: 32 },
      { id: 'yarn', label: 'Yarn', info: 'The spun thread. Its "count" (fineness) and strength determine the fabric it can be made into.', x: 128, y: 30, w: 24, h: 34 },
      { id: 'weave', label: 'Weaving / Knitting', info: 'Weaving interlaces warp and weft yarns on a loom; knitting inter-loops yarn into stretchy fabric.', x: 176, y: 30, w: 28, h: 34 },
      { id: 'greige', label: 'Greige Fabric', info: 'Raw fabric straight off the loom/knitting machine, before it is dyed and finished.', x: 226, y: 30, w: 30, h: 30 },
      { id: 'dye', label: 'Dyeing / Processing', info: 'Wet processing colours and treats the fabric (dyeing, printing, softening). It is water- and chemical-intensive.', x: 226, y: 94, w: 30, h: 28 },
      { id: 'finishing', label: 'Finishing', info: 'Adds properties like smoothness, wrinkle-resistance, or water-repellence, and prepares fabric for cutting.', x: 176, y: 94, w: 28, h: 28 },
      { id: 'cutsew', label: 'Cut & Sew', info: 'Fabric is cut into panels and stitched into garments — the most labour-intensive stage of the chain.', x: 128, y: 96, w: 26, h: 28 },
      { id: 'garment', label: 'Garment / Dispatch', info: 'Finished garments and home textiles are checked, pressed, packed, and shipped — major export earners.', x: 42, y: 136, w: 28, h: 30 },
    ],
  },
}
