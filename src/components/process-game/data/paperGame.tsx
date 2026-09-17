import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const PAPER = '#78350f'

// Reward: a fresh reel/ream of paper being formed (6 parts)
function PaperRollBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const sheets = Math.min(6, parts)
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Ream of paper being made">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* stack of sheets grows upward */}
      {Array.from({ length: sheets }).map((_, i) => (
        <rect key={i} x="60" y={150 - i * 15} width="100" height="13" rx="2"
          fill={i === sheets - 1 && show(6) ? '#ffffff' : '#fefce8'} stroke="#d6d3d1" strokeWidth="1" className="animate-[fadeIn_0.4s_ease]" />
      ))}
      {/* wrapper band once finished */}
      {show(6) && <><rect x="52" y="70" width="116" height="90" rx="4" fill="none" stroke={PAPER} strokeWidth="2" /><rect x="95" y="70" width="30" height="90" fill={PAPER} opacity="0.15" /><text x="110" y="118" textAnchor="middle" fontSize="9" fontWeight="bold" fill={PAPER}>PAPER</text></>}
      {show(6) && <circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" />}
      {parts === 0 && <rect x="60" y="120" width="100" height="30" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" />}
      {highlight && show(6) && <text x="110" y="185" textAnchor="middle" fontSize="10" fontWeight="bold" fill={PAPER}>A fresh ream of paper!</text>}
    </svg>
  )
}
function PaperPreview() {
  return (
    <svg viewBox="0 0 70 60" className="w-16 h-14">
      <rect x="12" y="34" width="46" height="8" rx="1.5" fill="#fefce8" stroke="#d6d3d1" strokeWidth="1" />
      <rect x="12" y="24" width="46" height="8" rx="1.5" fill="#fff" stroke="#d6d3d1" strokeWidth="1" />
      <rect x="12" y="14" width="46" height="8" rx="1.5" fill="#fefce8" stroke="#d6d3d1" strokeWidth="1" />
      <rect x="28" y="12" width="14" height="32" fill={PAPER} opacity="0.15" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#fdf6ec" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Wood / logs */}
      <circle cx="24" cy="45" r="6" fill="#92400e" /><circle cx="34" cy="45" r="6" fill="#a16207" /><text x="28" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Wood/Pulpwood</text>
      {/* Chipping */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#3b82f6" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Chipping</text>
      {/* Pulping (digester) */}
      <rect x="128" y="30" width="20" height="26" rx="8" fill="#f59e0b" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Pulping</text>
      {/* Bleaching */}
      <circle cx="190" cy="44" r="12" fill="#e5e7eb" stroke="#94a3b8" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Bleaching</text>
      {/* Stock prep */}
      <rect x="228" y="32" width="24" height="22" rx="3" fill="#14b8a6" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Stock Prep</text>
      {/* Paper machine (wire) */}
      <rect x="222" y="98" width="34" height="12" rx="2" fill="#22b8cf" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Wire/Forming</text>
      {/* Press/Dry */}
      <rect x="172" y="98" width="34" height="12" rx="2" fill="#ef4444" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Press & Dry</text>
      {/* Reel */}
      <circle cx="140" cy="104" r="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Reel</text>
      {/* Cut & pack */}
      <rect x="46" y="140" width="18" height="20" rx="2" fill={PAPER} /><text x="55" y="172" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Cut & Pack</text>
    </>
  )
}

export const PAPER_GAME: IndustryGameData = {
  industryName: 'Paper',
  brandColor: PAPER,
  processName: 'paper making',
  reward: {
    noun: 'Ream of Paper', verb: 'Make', parts: 6,
    partLabels: ['Wood chipped', 'Fibres pulped', 'Pulp bleached & cleaned', 'Sheet formed on the wire', 'Pressed & dried', 'Cut, wrapped & reamed!'],
    renderReward: PaperRollBuild, renderPreview: PaperPreview,
    completionTitle: 'Your Ream of Paper is Made!',
    completionSubtitle: 'From wood pulp to a finished sheet — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Raw Materials', prompt: 'Which raw materials are used to make paper pulp in India?', options: ['Wood, agri-residue (bagasse/wheat straw) and recycled paper', 'Only crude oil', 'Limestone and clay', 'Iron ore and coke'], explanation: 'Indian mills use three main fibre sources: wood/pulpwood (from farm forestry), agri-residues like bagasse and wheat straw, and recycled waste paper (RCF). The mix depends on the mill and product.' },
    { topic: 'Chipping', prompt: 'Before pulping, how is wood prepared?', options: ['Debarked and cut into small chips', 'Melted', 'Ground into powder', 'Bleached whole'], explanation: 'Logs are debarked and chipped into small, uniform pieces so chemicals and heat can penetrate them evenly in the digester during pulping.' },
    { topic: 'Pulping', prompt: 'What is the goal of the pulping stage?', options: ['Separate cellulose fibres from lignin that binds them', 'Add colour', 'Dry the sheet', 'Cut into reams'], explanation: 'Pulping breaks wood/agri-residue down into individual cellulose fibres by dissolving the lignin "glue". The dominant chemical method is the Kraft process, which recovers its cooking chemicals.' },
    { topic: 'Kraft Process', prompt: 'The dominant chemical pulping method, which recovers its own chemicals, is the:', options: ['Kraft (sulphate) process', 'Blast furnace', 'Bessemer process', 'Haber process'], explanation: 'The Kraft process cooks chips in a hot caustic/sulphide liquor to free the fibres, then recovers and reuses those chemicals in a recovery boiler — making it efficient and the global standard.' },
    { topic: 'Bleaching', prompt: 'Why is pulp bleached?', options: ['To whiten it and remove residual lignin', 'To make it heavier', 'To add fibre', 'To dry it'], explanation: 'Bleaching removes residual lignin and brightens the pulp for white paper grades. Modern mills use Elemental Chlorine-Free (ECF) bleaching to cut harmful effluent.' },
    { topic: 'Stock Prep', prompt: 'In stock preparation, the pulp is diluted with water and mixed with fillers/additives to form the:', options: ['Furnish (paper stock slurry)', 'Clinker', 'Slag', 'Bagasse'], explanation: 'The bleached pulp is refined and blended with water, fillers (like clay/calcium carbonate), and sizing/starch to make the "furnish" — a very dilute slurry (~99% water) fed to the paper machine.' },
    { topic: 'Forming', prompt: 'On the paper machine, the dilute furnish is sprayed onto a moving mesh. What happens there?', options: ['Water drains and fibres mat together into a wet sheet', 'The sheet is printed', 'Sugar is added', 'It is fired at 1450°C'], explanation: 'On the wire (forming) section, most of the water drains away through a moving mesh screen, and the fibres knit together into a continuous wet web of paper.' },
    { topic: 'Pressing & Drying', prompt: 'After forming, how is the remaining water removed from the sheet?', options: ['Pressing between rolls, then heated drying cylinders', 'Freezing', 'Centrifuging', 'Adding lime'], explanation: 'The wet web is squeezed in the press section to remove water mechanically, then passed over steam-heated drying cylinders that evaporate the rest, leaving a dry paper sheet.' },
    { topic: 'Finishing', prompt: 'What does calendering do to the finished paper?', options: ['Smooths and gives it a uniform thickness/finish', 'Colours it', 'Cuts it into logs', 'Pulps it again'], explanation: 'Calendering presses the dried paper between smooth rolls to give it an even thickness and surface smoothness. The paper is then wound into a big reel.' },
    { topic: 'Recycling', prompt: 'Recovered/waste paper is turned back into usable fibre through:', options: ['Repulping and de-inking', 'Melting in a furnace', 'Bleaching only', 'Calcination'], explanation: 'Recycled fibre (RCF) mills repulp waste paper in water and remove ink (de-inking) to recover fibres. This is the fastest-growing, lowest-cost, and greenest segment of Indian paper.' },
    { topic: 'Grades', prompt: 'Which is the fastest-growing paper grade in India thanks to e-commerce and the plastic ban?', options: ['Packaging board / kraft paper', 'Newsprint', 'Cigarette paper', 'Currency paper'], explanation: 'Packaging grades (containerboard, kraft, cartons) are booming with e-commerce and single-use-plastic bans, while newsprint and writing/printing paper grow slowly.' },
    { topic: 'Effluent', prompt: 'Paper making is water- and effluent-intensive. What is a key environmental focus for mills?', options: ['Water recycling and treating effluent (moving toward zero liquid discharge)', 'Using more chlorine', 'Burning more coal', 'Cutting recycling'], explanation: 'Because pulping/bleaching use lots of water, mills invest in effluent treatment, water reuse, and ECF bleaching — with the best mills targeting zero liquid discharge.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'wood', label: 'Wood / Fibre', info: 'The raw fibre source — pulpwood from farm forestry, agri-residues (bagasse, wheat straw), or recycled waste paper.', x: 14, y: 30, w: 32, h: 34 },
      { id: 'chipping', label: 'Chipping', info: 'Logs are debarked and cut into small, uniform chips so pulping chemicals and heat penetrate evenly.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'pulping', label: 'Pulping (Digester)', info: 'The Kraft process cooks chips in chemical liquor to dissolve lignin and free the cellulose fibres.', x: 124, y: 28, w: 28, h: 36 },
      { id: 'bleaching', label: 'Bleaching', info: 'Removes residual lignin and whitens the pulp, using Elemental Chlorine-Free (ECF) chemistry to cut effluent.', x: 176, y: 30, w: 28, h: 34 },
      { id: 'stockprep', label: 'Stock Prep', info: 'Pulp is refined, diluted with water, and blended with fillers and sizing to form the very dilute "furnish".', x: 226, y: 28, w: 30, h: 34 },
      { id: 'wire', label: 'Wire / Forming', info: 'The furnish is sprayed onto a moving mesh where water drains and fibres mat into a continuous wet web.', x: 220, y: 94, w: 36, h: 28 },
      { id: 'press', label: 'Press & Dry', info: 'The wet web is pressed between rolls and passed over steam-heated cylinders to remove the remaining water.', x: 170, y: 94, w: 36, h: 28 },
      { id: 'reel', label: 'Reel', info: 'The dried, calendered paper is wound into a large parent reel ready for cutting and finishing.', x: 128, y: 92, w: 26, h: 32 },
      { id: 'pack', label: 'Cut & Pack', info: 'The reel is slit and cut into reams or converted into packaging, then wrapped and dispatched.', x: 42, y: 136, w: 28, h: 30 },
    ],
  },
}
