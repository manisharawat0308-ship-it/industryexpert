import type { IndustryGameData } from '../types'
import { NAVY, ORANGE, GREEN } from '../shared'

const STEEL = '#005B75'

// Reward: a steel bridge assembled span by span (6 parts)
function BridgeBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Steel bridge being built">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      <rect x="0" y="150" width="220" height="20" fill="#bfdbfe" opacity="0.6" />
      {show(1) && <><rect x="30" y="120" width="12" height="40" fill="#64748b" /><rect x="178" y="120" width="12" height="40" fill="#64748b" /></>}
      {show(2) && <rect x="30" y="112" width="160" height="10" fill={STEEL} className="animate-[fadeIn_0.5s_ease]" />}
      {show(3) && <><line x1="36" y1="112" x2="70" y2="70" stroke={STEEL} strokeWidth="3" /><line x1="70" y1="70" x2="110" y2="112" stroke={STEEL} strokeWidth="3" /></>}
      {show(4) && <><line x1="110" y1="112" x2="150" y2="70" stroke={STEEL} strokeWidth="3" /><line x1="150" y1="70" x2="184" y2="112" stroke={STEEL} strokeWidth="3" /></>}
      {show(5) && <><line x1="70" y1="70" x2="150" y2="70" stroke={ORANGE} strokeWidth="3" /><line x1="55" y1="112" x2="70" y2="70" stroke="#94a3b8" strokeWidth="1.5" /><line x1="165" y1="112" x2="150" y2="70" stroke="#94a3b8" strokeWidth="1.5" /></>}
      {show(6) && <><rect x="30" y="108" width="160" height="5" fill="#334155" /><circle cx="60" cy="105" r="3" fill={GREEN} /><circle cx="160" cy="105" r="3" fill={GREEN} /></>}
      {parts === 0 && <rect x="30" y="112" width="160" height="10" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" opacity="0.5" />}
      {highlight && show(6) && <text x="110" y="188" textAnchor="middle" fontSize="10" fontWeight="bold" fill={STEEL}>Steel bridge, complete!</text>}
    </svg>
  )
}
function BridgePreview() {
  return (
    <svg viewBox="0 0 100 60" className="w-24 h-14">
      <rect x="8" y="40" width="84" height="6" fill={STEEL} />
      <line x1="14" y1="40" x2="35" y2="18" stroke={STEEL} strokeWidth="2.5" /><line x1="35" y1="18" x2="65" y2="18" stroke={ORANGE} strokeWidth="2.5" /><line x1="65" y1="18" x2="86" y2="40" stroke={STEEL} strokeWidth="2.5" />
      <rect x="12" y="46" width="8" height="12" fill="#64748b" /><rect x="80" y="46" width="8" height="12" fill="#64748b" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#eef2f6" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Iron ore + coal */}
      <polygon points="18,50 30,30 42,50" fill="#7f1d1d" /><text x="30" y="60" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Iron Ore</text>
      {/* Coke / sinter */}
      <rect x="74" y="32" width="24" height="20" rx="2" fill="#4b5563" /><text x="86" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Coke/Sinter</text>
      {/* Blast furnace */}
      <polygon points="126,52 150,52 144,30 132,30" fill="#f59e0b" /><text x="138" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Blast Furnace</text>
      {/* BOF / EAF */}
      <path d="M178 34 a12 12 0 0 0 24 0 z" fill="#ef4444" /><text x="190" y="60" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">BOF/EAF</text>
      {/* Ladle refining */}
      <rect x="228" y="30" width="24" height="22" rx="3" fill="#dc2626" /><text x="240" y="62" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Refining</text>
      {/* Caster */}
      <rect x="226" y="96" width="28" height="16" rx="2" fill="#22b8cf" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Caster</text>
      {/* Rolling mill */}
      <rect x="176" y="98" width="28" height="14" rx="2" fill="#3b82f6" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Rolling Mill</text>
      {/* Coils / products */}
      <circle cx="140" cy="105" r="10" fill="#64748b" /><circle cx="140" cy="105" r="4" fill="#eef2f6" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Coils</text>
      {/* Dispatch */}
      <rect x="44" y="146" width="22" height="12" rx="2" fill="#dc2626" /><circle cx="50" cy="160" r="2.4" fill="#111" /><circle cx="61" cy="160" r="2.4" fill="#111" /><text x="55" y="172" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Dispatch</text>
    </>
  )
}

export const STEEL_GAME: IndustryGameData = {
  industryName: 'Steel',
  brandColor: STEEL,
  processName: 'steel making',
  reward: {
    noun: 'Bridge', verb: 'Build', parts: 6,
    partLabels: ['Piers anchored', 'Main deck girder laid', 'Left truss raised', 'Right truss raised', 'Top chord & cables', 'Decked, bolted & opened!'],
    renderReward: BridgeBuild, renderPreview: BridgePreview,
    completionTitle: 'Your Steel Bridge is Built!',
    completionSubtitle: 'From iron ore to a finished span — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Raw Materials', prompt: 'What are the three primary raw materials fed into a traditional integrated steel plant?', options: ['Iron ore, coking coal (coke) and limestone', 'Bauxite, gypsum and sand', 'Copper, zinc and lead', 'Crude oil, naphtha and gas'], explanation: 'Integrated steelmaking starts with iron ore (the iron source), coking coal converted to coke (the fuel/reductant), and limestone (a flux that removes impurities as slag). These feed the blast furnace.' },
    { topic: 'Sinter/Pellets', prompt: 'Fine iron ore cannot go straight into a blast furnace. What is it first converted into?', options: ['Sinter or pellets', 'Billets', 'Clinker', 'Slag'], explanation: 'Fine ore is agglomerated into sinter (in a sinter plant) or pellets (in a pellet plant) so gases can flow through the burden. Coal is baked into coke in coke ovens. Both improve furnace efficiency.' },
    { topic: 'Blast Furnace', prompt: 'In a blast furnace, iron ore is reduced to molten iron. What is this molten product called?', options: ['Hot metal (pig iron)', 'Clinker', 'Billet', 'Ferrite'], explanation: 'The blast furnace reduces iron ore with coke and hot air (~2000°C blast) to produce molten "hot metal" or pig iron, which still has ~4% carbon and must be refined into steel.' },
    { topic: 'BOF', prompt: 'In the Basic Oxygen Furnace (BOF), how is hot metal converted into steel?', options: ['High-purity oxygen is blown in to burn off excess carbon', 'It is cooled with water', 'Gypsum is added', 'It is ground into powder'], explanation: 'In the BOF, a lance blows high-purity oxygen through the hot metal, oxidising and removing excess carbon and impurities. This converts high-carbon pig iron into steel in ~20 minutes.' },
    { topic: 'EAF Route', prompt: 'The alternative "mini-mill" route melts scrap steel using what?', options: ['An electric arc furnace (EAF)', 'A blast furnace', 'A rotary kiln', 'A ball mill'], explanation: 'The Electric Arc Furnace route melts steel scrap (and DRI/sponge iron) using powerful electric arcs. It is more flexible, lower-capex, and can be greener when powered by clean electricity.' },
    { topic: 'Secondary Refining', prompt: 'After primary steelmaking, what happens in the ladle (secondary metallurgy) stage?', options: ['Fine-tuning chemistry & temperature and adding alloys', 'Mining the ore', 'Rolling into sheets', 'Packing for dispatch'], explanation: 'In ladle refining, the steel chemistry is precisely adjusted (alloying, degassing, desulphurisation) and temperature is controlled so the grade meets exact specifications before casting.' },
    { topic: 'Continuous Casting', prompt: 'How is liquid steel solidified into semi-finished shapes in a modern plant?', options: ['Continuous casting into slabs, blooms or billets', 'Poured into sand moulds only', 'Sprayed and dried', 'Frozen in a cooler'], explanation: 'Continuous casting solidifies liquid steel into slabs (flat products), blooms, or billets (long products) in one continuous strand — far more efficient than the old ingot route.' },
    { topic: 'Hot Rolling', prompt: 'Slabs are reheated and passed through rollers to make sheet and coil. What is this called?', options: ['Hot rolling', 'Galvanising', 'Pickling', 'Annealing'], explanation: 'In hot rolling, reheated slabs are squeezed through a series of rolls to reduce thickness and form hot-rolled coil, plate, or structural sections. Long products are rolled into bars, rods, and beams.' },
    { topic: 'Flat vs Long', prompt: 'TMT bars, wire rods and structural beams belong to which product category?', options: ['Long products', 'Flat products', 'Coated products', 'Powders'], explanation: 'Long products (TMT bars, wire rods, beams, angles) are used mainly in construction and infrastructure. Flat products (HR/CR coil, plate, galvanised sheet) go to autos, appliances, and pipes.' },
    { topic: 'Coating', prompt: 'To protect flat steel from rust, it is often dipped in molten zinc. What is this process?', options: ['Galvanising', 'Sintering', 'Calcination', 'Casting'], explanation: 'Galvanising coats steel sheet with zinc (hot-dip or electro) to resist corrosion — essential for roofing, auto bodies, and appliances. Colour-coating adds a painted layer on top.' },
    { topic: 'Green Steel', prompt: 'Which technology is central to future "green steel" that cuts CO2 sharply?', options: ['Green-hydrogen-based direct reduction', 'Burning more coking coal', 'Wet-process kilns', 'Adding more limestone'], explanation: 'Green steel replaces coke with green hydrogen as the reductant (DRI-EAF), producing water instead of CO2. Combined with clean electricity, it can cut steelmaking emissions dramatically.' },
    { topic: 'Slag', prompt: 'The limestone flux combines with impurities in the furnace to form what by-product?', options: ['Slag', 'Clinker', 'Coke', 'Sponge iron'], explanation: 'Limestone reacts with impurities (silica, alumina) to form molten slag that floats on the metal and is skimmed off. Blast-furnace slag is later used in cement (PSC), so little is wasted.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'ore', label: 'Iron Ore', info: 'The primary iron source. Fine ore is agglomerated into sinter or pellets so gases flow well through the blast furnace burden.', x: 14, y: 28, w: 34, h: 36 },
      { id: 'coke', label: 'Coke & Sinter', info: 'Coking coal is baked into coke (fuel + reductant) in coke ovens; ore is turned into sinter/pellets. Both feed the blast furnace.', x: 72, y: 30, w: 30, h: 34 },
      { id: 'bf', label: 'Blast Furnace', info: 'Reduces iron ore with coke and a hot air blast (~2000°C) to produce molten hot metal (pig iron) with ~4% carbon.', x: 124, y: 28, w: 30, h: 34 },
      { id: 'bof', label: 'BOF / EAF', info: 'The Basic Oxygen Furnace blows oxygen to burn off carbon and make steel; the Electric Arc Furnace melts scrap/DRI instead.', x: 176, y: 30, w: 30, h: 32 },
      { id: 'refining', label: 'Ladle Refining', info: 'Secondary metallurgy fine-tunes chemistry, removes gases, and adds alloys so the steel meets the exact grade specification.', x: 226, y: 28, w: 30, h: 34 },
      { id: 'caster', label: 'Continuous Caster', info: 'Solidifies liquid steel into semi-finished slabs, blooms, or billets in one continuous strand.', x: 224, y: 92, w: 32, h: 30 },
      { id: 'rolling', label: 'Rolling Mill', info: 'Reheats and rolls the semi-finished steel into finished flat coil/plate or long products like bars and beams.', x: 174, y: 94, w: 32, h: 30 },
      { id: 'coils', label: 'Steel Coils / Products', info: 'Finished flat coils, plates, and long products — the output sold to autos, construction, appliances, and pipes.', x: 126, y: 92, w: 30, h: 34 },
      { id: 'dispatch', label: 'Dispatch', info: 'Finished steel is loaded onto trucks/rail and shipped to fabricators, construction sites, and manufacturers.', x: 40, y: 142, w: 34, h: 32 },
    ],
  },
}
