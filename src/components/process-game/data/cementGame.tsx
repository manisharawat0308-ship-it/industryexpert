import type { IndustryGameData } from '../types'
import { MAROON, NAVY, ORANGE, GREEN } from '../shared'

// ---- House reward SVG (built from cement) ---------------------------------
function HouseBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const wallFill = show(7) ? '#fde9c8' : '#d6d3d1'
  const roofFill = show(5) ? MAROON : 'transparent'
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="House being built from cement">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {show(7) && <circle cx="185" cy="30" r="14" fill={ORANGE} opacity="0.5" />}
      {show(1) && <rect x="10" y="170" width="200" height="12" rx="3" fill="#9ca3af" className="animate-[fadeIn_0.5s_ease]" />}
      {show(2) && <rect x="35" y="158" width="150" height="14" rx="2" fill="#6b7280" className="animate-[fadeIn_0.5s_ease]" />}
      {show(3) && <>
        <rect x="42" y="95" width="12" height="63" fill="#78716c" className="animate-[fadeIn_0.5s_ease]" />
        <rect x="166" y="95" width="12" height="63" fill="#78716c" className="animate-[fadeIn_0.5s_ease]" />
      </>}
      {show(4) && <rect x="48" y="95" width="124" height="63" fill={wallFill} stroke="#a8a29e" strokeWidth="1.5" className="animate-[fadeIn_0.5s_ease]" style={{ transition: 'fill 0.6s' }} />}
      {show(5) && <polygon points="40,96 110,52 180,96" fill={roofFill} className="animate-[fadeIn_0.5s_ease]" />}
      {show(5) && <polygon points="40,96 110,52 180,96" fill="none" stroke="#7f1d1d" strokeWidth="1.5" />}
      {show(6) && <>
        <rect x="98" y="120" width="24" height="38" rx="2" fill="#4b5563" className="animate-[fadeIn_0.5s_ease]" />
        <circle cx="117" cy="139" r="1.6" fill="#facc15" />
        <rect x="60" y="108" width="22" height="20" rx="2" fill={show(7) ? '#bae6fd' : '#cbd5e1'} stroke="#64748b" strokeWidth="1" className="animate-[fadeIn_0.5s_ease]" />
        <rect x="138" y="108" width="22" height="20" rx="2" fill={show(7) ? '#bae6fd' : '#cbd5e1'} stroke="#64748b" strokeWidth="1" className="animate-[fadeIn_0.5s_ease]" />
      </>}
      {show(7) && <>
        <rect x="150" y="60" width="12" height="22" fill="#7f1d1d" />
        <circle cx="156" cy="52" r="5" fill="#e5e7eb" opacity="0.8" />
        <circle cx="150" cy="44" r="4" fill="#e5e7eb" opacity="0.6" />
        <rect x="35" y="166" width="18" height="6" rx="3" fill={GREEN} />
        <rect x="167" y="166" width="18" height="6" rx="3" fill={GREEN} />
      </>}
      {parts === 0 && (
        <g opacity="0.4">
          <rect x="48" y="95" width="124" height="63" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" />
          <polygon points="40,96 110,52 180,96" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" />
        </g>
      )}
      {highlight && show(7) && <text x="110" y="192" textAnchor="middle" fontSize="10" fontWeight="bold" fill={MAROON}>Dream home, built!</text>}
    </svg>
  )
}

function HousePreview() {
  return (
    <svg viewBox="0 0 100 80" className="w-24 h-16">
      <polygon points="18,40 50,16 82,40" fill={MAROON} />
      <rect x="26" y="40" width="48" height="30" fill="#fde9c8" stroke="#a8a29e" strokeWidth="1.5" />
      <rect x="44" y="50" width="14" height="20" fill="#4b5563" />
      <rect x="32" y="46" width="10" height="9" fill="#bae6fd" stroke="#64748b" strokeWidth="0.8" />
    </svg>
  )
}

// ---- Process diagram (limestone -> ... -> dispatch) ------------------------
function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#eef2f6" />
      <polyline points="40,45 95,45 95,30 150,30 205,30 205,60 250,60 250,110 205,110 150,110 150,150 95,150 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.55" />
      <polygon points="18,55 30,32 42,55" fill="#8B4A2F" />
      <polygon points="30,58 42,38 54,58" fill="#A05A38" />
      <text x="30" y="66" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Limestone</text>
      <rect x="82" y="34" width="26" height="26" rx="3" fill="#3b82f6" />
      <text x="95" y="72" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Raw Mill</text>
      <rect x="138" y="18" width="14" height="22" rx="2" fill="#84cc16" />
      <rect x="154" y="18" width="14" height="22" rx="2" fill="#84cc16" />
      <text x="153" y="49" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Raw Silo</text>
      <polygon points="198,22 212,22 208,34 202,34" fill="#0d9488" />
      <polygon points="216,22 230,22 226,34 220,34" fill="#0d9488" />
      <text x="214" y="16" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Preheater</text>
      <rect x="234" y="52" width="34" height="14" rx="7" fill="#f59e0b" transform="rotate(6 251 59)" />
      <text x="251" y="78" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Rotary Kiln</text>
      <rect x="192" y="96" width="26" height="26" fill="#ef4444" />
      <text x="205" y="132" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Clinker</text>
      <rect x="128" y="100" width="34" height="14" rx="3" fill="#22b8cf" />
      <text x="145" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Cement Mill</text>
      <polygon points="150,142 160,126 170,142" fill="#e2c290" />
      <text x="160" y="150" fontSize="6.5" textAnchor="middle" fill="#334155" fontWeight="bold">Gypsum</text>
      <rect x="80" y="132" width="26" height="30" rx="2" fill="#2563eb" />
      <text x="93" y="172" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Cement Silo</text>
      <rect x="34" y="146" width="20" height="10" rx="2" fill="#dc2626" />
      <circle cx="39" cy="158" r="2.4" fill="#111" />
      <circle cx="49" cy="158" r="2.4" fill="#111" />
      <text x="44" y="170" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Dispatch</text>
    </>
  )
}

export const CEMENT_GAME: IndustryGameData = {
  industryName: 'Cement',
  brandColor: MAROON,
  processName: 'cement manufacturing',
  reward: {
    noun: 'Home', verb: 'Build', parts: 7,
    partLabels: ['Site levelled & ground prepared', 'Foundation poured', 'Pillars & columns raised', 'Walls built up', 'Roof slab cast', 'Door & windows fitted', 'Plastered, painted & finished!'],
    renderReward: HouseBuild, renderPreview: HousePreview,
    completionTitle: 'Your Home is Built!',
    completionSubtitle: 'From limestone to a finished house — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Limestone Mining', prompt: 'Cement starts at the quarry where limestone is mined in large boulders. What is the very next step before it can be used?', options: ['Crushing into small pieces', 'Heating in the kiln', 'Grinding with gypsum', 'Packing into bags'], explanation: 'Mined limestone comes as large boulders that are far too big to process. It is first sent to primary and secondary crushers, which break it down to ~25 mm pieces so it can be dried, ground, and blended in the next stages.', chart: 'rawmix', chartCaption: 'Typical raw-material mix — limestone dominates the recipe.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=70', imageAlt: 'Limestone quarry with excavation machinery' },
    { topic: 'Raw Materials', prompt: 'Roughly what share of the raw mix used to make cement is limestone?', options: ['About 80-85%', 'About 50%', 'About 30%', 'About 10%'], explanation: 'Limestone (a source of calcium carbonate) makes up roughly 80-85% of the raw mix, with clay/shale, a little iron ore, and other correctives making up the rest. This is why cement plants are always located near large limestone reserves.', chart: 'rawmix', chartCaption: 'Limestone is ~85% of the raw-material recipe.' },
    { topic: 'Raw Meal', prompt: 'The crushed limestone is blended with additives (clay, iron ore). What happens next to prepare the "raw meal"?', options: ['Fine grinding & blending into raw meal', 'Cooling with air', 'Bagging for sale', 'Firing at 1450°C'], explanation: 'The crushed materials are dried and finely ground in a Vertical Roller Mill (VRM) or ball mill and homogenised. This fine powder — called "raw meal" or "kiln feed" — has the exact chemistry needed to form good clinker.', image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=70', imageAlt: 'Crushed stone aggregate from a rock crusher' },
    { topic: 'Preheating', prompt: 'The raw meal is heated gradually before the kiln, reusing the kiln\'s hot exhaust gases to save fuel. Which stage does this?', options: ['The preheater / precalciner tower', 'The cooler', 'The packing plant', 'The crusher'], explanation: 'Raw meal passes down a multi-stage preheater tower (with a precalciner). Hot exhaust gases rising from the kiln heat the meal to ~900°C and drive off CO2 (calcination) before it enters the kiln — recovering heat and cutting fuel use dramatically.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=70', imageAlt: 'Industrial plant grinding mill and processing towers' },
    { topic: 'Calcination', prompt: 'In the preheater/precalciner, limestone breaks down and releases a gas. Which gas is driven off during this "calcination"?', options: ['Carbon dioxide (CO2)', 'Oxygen (O2)', 'Nitrogen (N2)', 'Hydrogen (H2)'], explanation: 'Calcination converts calcium carbonate (CaCO3) into calcium oxide (CaO) plus carbon dioxide (CO2). This released CO2 — together with fuel combustion — is why cement making is so carbon-intensive, and why blended cements that use less clinker are greener.' },
    { topic: 'Peak Temperature', prompt: 'This chart shows temperature across the pyro-processing line. At which stage does the material reach its PEAK temperature of about 1450°C?', options: ['Rotary kiln (burning zone)', 'Preheater inlet', 'Clinker cooler', 'Cement mill'], explanation: 'The rotary kiln burning zone is the hottest point, ~1450°C. Here the preheated meal partially melts and chemically reacts to form clinker — hard grey nodules of calcium silicates. This "clinkerization" is the heart of cement making.', chart: 'temperature', chartCaption: 'Temperature profile — peaks in the kiln burning zone (~1450°C).', image: 'https://images.unsplash.com/photo-1611288875785-f4d3f6f6e0d9?auto=format&fit=crop&w=1200&q=70', imageAlt: 'Glowing industrial furnace / rotary kiln interior' },
    { topic: 'Clinker', prompt: 'What is the hard, grey nodular material that comes out of the rotary kiln called?', options: ['Clinker', 'Gypsum', 'Slag', 'Fly ash'], explanation: 'The kiln produces "clinker" — marble-sized nodules of calcium silicates formed at ~1450°C. Clinker is the active ingredient of cement; it is later ground with gypsum to make the finished product.' },
    { topic: 'Cooling', prompt: 'White-hot clinker (~1400°C) exits the kiln. What is the immediate next step?', options: ['Rapid cooling in the clinker cooler', 'Grind it straight away', 'Send it back to the preheater', 'Bag it directly'], explanation: 'Clinker drops into a grate/air-quench cooler that rapidly cools it from ~1400°C to ~100°C. Fast cooling locks in the reactive mineral phases (good strength), and the recovered hot air is fed back to the kiln as combustion air — another energy saving.', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=70', imageAlt: 'Cement clinker nodules on a cooler conveyor' },
    { topic: 'Gypsum', prompt: 'Cooled clinker is ground into cement. Which additive (~5%) is added mainly to control the setting time?', options: ['Gypsum', 'Extra limestone', 'Sand', 'Water'], explanation: 'Clinker is ground with ~5% gypsum, which controls the setting time so the cement does not flash-set. For blended cements, fly ash (PPC) or slag (PSC) is co-ground to lower the clinker factor, cost, and carbon footprint while meeting BIS strength norms.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=70', imageAlt: 'Grinding mill machinery inside a cement plant' },
    { topic: 'Blended Cement', prompt: 'In PPC (Portland Pozzolana Cement), which by-product is blended in to partly replace clinker?', options: ['Fly ash', 'Gypsum', 'Iron ore', 'Bauxite'], explanation: 'PPC blends fly ash (a coal-power by-product) with clinker and gypsum. PSC uses blast-furnace slag instead. Both lower the clinker factor — cutting cost and CO2 — which is why the government now pushes blended cement in public projects.' },
    { topic: 'Dispatch', prompt: 'You now have finished cement powder. What is the final stage before it reaches a construction site?', options: ['Packing & dispatch (bags / bulk)', 'Firing again', 'Re-crushing', 'Cooling'], explanation: 'Finished cement is stored in silos, then packed into bags (typically 50 kg) or loaded in bulk tankers for dispatch to dealers and projects. Modern plants use automated rotary packers and rail/road logistics to reach demand centres efficiently.', image: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=1200&q=70', imageAlt: 'Stacked cement bags on pallets ready for dispatch' },
    { topic: 'Dry Process', prompt: 'Which manufacturing route dominates modern Indian cement plants because it is the most energy-efficient?', options: ['The dry process', 'The wet process', 'The semi-wet process', 'The slurry process'], explanation: 'Over 90% of Indian capacity uses the dry process, where raw meal enters the kiln as a dry powder. It uses far less fuel than the old wet process (which fed a water slurry and had to boil it off), making it cheaper and lower-carbon.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'limestone', label: 'Limestone & Clay', info: 'The main raw materials. Limestone (~80-85% of the mix) supplies calcium; clay/shale add silica and alumina. Both are quarried near the plant.', x: 14, y: 30, w: 44, h: 40 },
      { id: 'rawmill', label: 'Raw Mill', info: 'Dries and finely grinds the crushed limestone and additives into a homogeneous powder called "raw meal" or kiln feed.', x: 80, y: 32, w: 30, h: 42 },
      { id: 'rawsilo', label: 'Raw Meal Silo', info: 'Stores and further blends the raw meal to keep its chemistry consistent before it is fed to the preheater and kiln.', x: 134, y: 14, w: 38, h: 38 },
      { id: 'preheater', label: 'Suspension Preheater', info: 'A tower of cyclones that uses the kiln\'s hot exhaust gases to heat raw meal to ~900°C and drive off CO2 (calcination), saving fuel.', x: 196, y: 8, w: 38, h: 30 },
      { id: 'kiln', label: 'Rotary Kiln', info: 'A long rotating furnace where the meal reaches ~1450°C and reacts to form clinker — the heart of cement making.', x: 232, y: 44, w: 40, h: 36 },
      { id: 'clinker', label: 'Clinker Silo', info: 'Stores the cooled, marble-sized clinker nodules that come out of the kiln, ready for the final grinding stage.', x: 190, y: 94, w: 30, h: 40 },
      { id: 'cementmill', label: 'Cement Mill', info: 'Grinds clinker together with ~5% gypsum (and fly ash/slag for blended cement) into the fine grey powder we call cement.', x: 126, y: 98, w: 38, h: 28 },
      { id: 'gypsum', label: 'Gypsum', info: 'Added at the cement mill (~5%) to control the setting time so the cement does not harden too quickly.', x: 148, y: 124, w: 24, h: 28 },
      { id: 'cementsilo', label: 'Cement Silo', info: 'Stores the finished cement in bulk before it is packed into bags or loaded into bulk tankers.', x: 78, y: 130, w: 30, h: 36 },
      { id: 'dispatch', label: 'Dispatch', info: 'Cement leaves the plant in 50 kg bags or bulk tankers, moving by road and rail to dealers and construction sites.', x: 30, y: 144, w: 32, h: 30 },
    ],
  },
}
