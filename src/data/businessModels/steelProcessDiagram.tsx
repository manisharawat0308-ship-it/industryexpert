// Self-drawn, icon-based SVG of the steelmaking "life cycle" (original artwork,
// inspired by common industry infographics — offline-safe, no copyright).
// Also exports small per-step icon illustrations used on the step cards.

const NAVY = '#1e3a5f'
const STEEL = '#005B75'
const ORANGE = '#F99D27'
const GREY = '#94a3b8'

// ============================ FLOW DIAGRAM =================================
export function SteelProcessDiagram(onSelect?: (id: string) => void) {
  const clk = (id: string) => (onSelect
    ? { onClick: () => onSelect(id), style: { cursor: 'pointer' as const }, pointerEvents: 'all' as const }
    : {})
  return (
    <svg viewBox="0 0 1040 360" className="w-full" role="img" aria-label="Steel mill life cycle flow">
      <rect x="0" y="0" width="1040" height="360" fill="#f8fafc" rx="8" />
      <text x="520" y="38" textAnchor="middle" fontSize="22" fontWeight="800" fill={NAVY}>The Steel Mill Life Cycle</text>

      <defs>
        <marker id="sfa" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={NAVY} />
        </marker>
      </defs>

      {/* ---- Raw material inputs (circle + label to the right, well spaced) ---- */}
      {[
        { y: 90, c: '#7f1d1d', t: 'Iron Ore', id: 'iron-ore' },
        { y: 156, c: '#374151', t: 'Coke', id: 'coke' },
        { y: 222, c: '#eab308', t: 'Limestone', id: 'limestone' },
        { y: 288, c: '#16a34a', t: 'Recycled Steel', id: 'scrap' },
      ].map((m) => (
        <g key={m.t} {...clk(m.id)}>
          <circle cx="44" cy={m.y} r="22" fill={m.c} stroke="#fff" strokeWidth="1.5" />
          <text x="44" y={m.y + 40} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{m.t}</text>
        </g>
      ))}

      {/* ---- Blast furnace ---- */}
      <g {...clk('blast-furnace')}>
        <rect x="166" y="104" width="68" height="96" rx="8" fill="transparent" />
        <rect x="170" y="110" width="60" height="70" rx="8" fill={ORANGE} />
        <rect x="186" y="120" width="28" height="14" rx="2" fill="#fff" opacity="0.7" />
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">Blast Furnace</text>
      </g>

      {/* ---- BOF ---- */}
      <g {...clk('bof')}>
        <rect x="306" y="82" width="74" height="90" rx="8" fill="transparent" />
        <rect x="310" y="86" width="66" height="60" rx="10" fill={STEEL} />
        <path d="M324 98 h38 v16 l-19 12 l-19 -12 z" fill="#fff" opacity="0.5" />
        <text x="343" y="166" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">Basic Oxygen Furnace</text>
      </g>

      {/* ---- EAF ---- */}
      <g {...clk('eaf')}>
        <rect x="306" y="224" width="74" height="86" rx="8" fill="transparent" />
        <rect x="310" y="228" width="66" height="56" rx="10" fill={STEEL} />
        <path d="M343 236 v22 M333 244 l10 10 l10 -10" stroke={ORANGE} strokeWidth="3.5" fill="none" />
        <text x="343" y="304" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">Electric Arc Furnace</text>
      </g>

      {/* ---- Continuous caster ---- */}
      <g {...clk('caster')}>
        <rect x="466" y="116" width="74" height="90" rx="8" fill="transparent" />
        <rect x="470" y="120" width="66" height="60" rx="10" fill={NAVY} />
        <rect x="486" y="132" width="34" height="10" rx="2" fill={ORANGE} />
        <path d="M503 142 v26" stroke="#fff" strokeWidth="3.5" />
        <text x="503" y="200" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">Continuous Caster</text>
      </g>

      {/* ---- Semi-finished shapes (well spaced) ---- */}
      {[
        { y: 84, t: 'Bloom', id: 'bloom' },
        { y: 148, t: 'Billet', id: 'billet' },
        { y: 212, t: 'Slab', id: 'slab' },
      ].map((s) => (
        <g key={s.t} {...clk(s.id)}>
          <rect x="640" y={s.y} width="86" height="30" rx="4" fill={GREY} />
          <rect x="640" y={s.y} width="86" height="9" rx="4" fill="#cbd5e1" />
          <text x="683" y={s.y + 48} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{s.t}</text>
        </g>
      ))}

      {/* ---- Finished products (rolls) ---- */}
      <g {...clk('finished')}>
        <rect x="846" y="100" width="118" height="120" rx="8" fill="transparent" />
        <ellipse cx="880" cy="150" rx="30" ry="48" fill={STEEL} />
        <ellipse cx="880" cy="150" rx="12" ry="22" fill="#e2e8f0" />
        <ellipse cx="930" cy="188" rx="24" ry="36" fill={NAVY} />
        <ellipse cx="930" cy="188" rx="9" ry="15" fill="#e2e8f0" />
        <text x="905" y="252" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">Finished Products</text>
      </g>

      {/* ---- Arrows ---- */}
      <line x1="70" y1="150" x2="170" y2="150" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" />
      <line x1="70" y1="288" x2="310" y2="264" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" opacity="0.75" />
      <line x1="230" y1="150" x2="310" y2="120" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" />
      <line x1="376" y1="116" x2="470" y2="140" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" />
      <line x1="376" y1="256" x2="470" y2="165" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" opacity="0.75" />
      <line x1="536" y1="140" x2="640" y2="99" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" />
      <line x1="536" y1="150" x2="640" y2="163" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" opacity="0.7" />
      <line x1="536" y1="160" x2="640" y2="227" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" opacity="0.6" />
      <line x1="726" y1="165" x2="842" y2="160" stroke={NAVY} strokeWidth="2.5" markerEnd="url(#sfa)" />

      {/* ---- TOP-LAYER CLICK OVERLAY (guaranteed clickable hit-areas) ---- */}
      {onSelect &&
        [
          { id: 'iron-ore', x: 20, y: 66, w: 48, h: 66 },
          { id: 'coke', x: 20, y: 132, w: 48, h: 66 },
          { id: 'limestone', x: 20, y: 198, w: 48, h: 66 },
          { id: 'scrap', x: 20, y: 264, w: 48, h: 66 },
          { id: 'blast-furnace', x: 162, y: 100, w: 76, h: 110 },
          { id: 'bof', x: 302, y: 78, w: 82, h: 94 },
          { id: 'eaf', x: 302, y: 220, w: 82, h: 94 },
          { id: 'caster', x: 462, y: 112, w: 82, h: 100 },
          { id: 'bloom', x: 636, y: 78, w: 94, h: 50 },
          { id: 'billet', x: 636, y: 142, w: 94, h: 50 },
          { id: 'slab', x: 636, y: 206, w: 94, h: 60 },
          { id: 'finished', x: 842, y: 96, w: 126, h: 168 },
        ].map((h) => (
          <rect
            key={h.id}
            x={h.x}
            y={h.y}
            width={h.w}
            height={h.h}
            rx="6"
            fill="#000"
            fillOpacity={0}
            pointerEvents="all"
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect(h.id)}
          >
            <title>Click for info</title>
          </rect>
        ))}
    </svg>
  )
}

// ============================ STEP ICONS ==================================
// Each returns a compact illustrative SVG used as the "photo" on a step card.

function IconFrame({ children, bg = '#eef2f6' }: { children: React.ReactNode; bg?: string }) {
  return (
    <svg viewBox="0 0 200 130" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect x="0" y="0" width="200" height="130" fill={bg} />
      {children}
    </svg>
  )
}

export function IconRawMaterials() {
  return (
    <IconFrame bg="#f1f5f9">
      {/* ore + coal + scrap piles */}
      <polygon points="30,95 55,55 80,95" fill="#7f1d1d" />
      <polygon points="70,95 95,60 120,95" fill="#374151" />
      <polygon points="112,95 137,62 162,95" fill="#eab308" />
      <rect x="20" y="95" width="160" height="10" fill="#cbd5e1" />
      <circle cx="55" cy="70" r="2" fill="#fff" opacity="0.6" /><circle cx="95" cy="74" r="2" fill="#fff" opacity="0.5" />
    </IconFrame>
  )
}

export function IconPrep() {
  return (
    <IconFrame bg="#fbe9ee">
      {/* coke oven battery */}
      {[40, 70, 100, 130].map((x) => <rect key={x} x={x} y="45" width="24" height="60" fill="#c2557a" stroke="#fff" strokeWidth="1.5" />)}
      <rect x="34" y="40" width="126" height="8" fill="#8e2246" />
      <rect x="52" y="30" width="6" height="12" fill="#8e2246" /><rect x="112" y="30" width="6" height="12" fill="#8e2246" />
      <circle cx="55" cy="26" r="4" fill="#e5e7eb" opacity="0.7" />
    </IconFrame>
  )
}

export function IconIronmaking() {
  return (
    <IconFrame bg="#fff4e6">
      {/* blast furnace with molten tap */}
      <path d="M85 30 h30 l8 40 l-8 40 h-30 l-8 -40 z" fill={ORANGE} />
      <rect x="90" y="34" width="20" height="10" rx="2" fill="#fff" opacity="0.6" />
      <path d="M115 100 q20 4 30 18" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="150" cy="118" rx="16" ry="5" fill="#ef4444" />
      <circle cx="100" cy="20" r="4" fill="#94a3b8" opacity="0.6" />
    </IconFrame>
  )
}

export function IconSteelmaking() {
  return (
    <IconFrame bg="#e6f0f7">
      {/* vessel tilting, sparks */}
      <path d="M70 45 h50 v30 l-25 22 l-25 -22 z" fill={STEEL} />
      <path d="M78 50 h34 v18 l-17 12 l-17 -12 z" fill="#fff" opacity="0.45" />
      {[...Array(7)].map((_, i) => {
        const a = (i / 7) * Math.PI - Math.PI / 2
        return <line key={i} x1="95" y1="40" x2={95 + Math.cos(a) * 26} y2={40 + Math.sin(a) * 26} stroke={ORANGE} strokeWidth="2" />
      })}
      <rect x="150" y="40" width="10" height="55" rx="3" fill="#64748b" />
    </IconFrame>
  )
}

export function IconCasting() {
  return (
    <IconFrame bg="#e6f5f4">
      <rect x="70" y="26" width="40" height="16" rx="3" fill="#3aa6a0" />
      <path d="M90 42 v20" stroke={ORANGE} strokeWidth="6" />
      <path d="M55 62 q35 20 90 22" stroke="#cbd5e1" strokeWidth="14" fill="none" />
      <rect x="120" y="80" width="60" height="14" rx="2" fill="#94a3b8" />
      <rect x="120" y="80" width="60" height="5" rx="2" fill="#cbd5e1" />
      <circle cx="72" cy="66" r="4" fill="#f59e0b" />
    </IconFrame>
  )
}

export function IconRolling() {
  return (
    <IconFrame bg="#eef1f5">
      {/* rollers pressing a red strip */}
      <circle cx="70" cy="55" r="16" fill="#5b7c99" /><circle cx="70" cy="55" r="5" fill="#e2e8f0" />
      <circle cx="70" cy="90" r="16" fill="#5b7c99" /><circle cx="70" cy="90" r="5" fill="#e2e8f0" />
      <rect x="30" y="69" width="150" height="8" fill="#ef4444" />
      <rect x="150" y="60" width="30" height="26" rx="4" fill="#94a3b8" />
      <rect x="150" y="60" width="30" height="8" rx="4" fill="#cbd5e1" />
    </IconFrame>
  )
}

export function IconFinishing() {
  return (
    <IconFrame bg="#e8eef7">
      {/* coated coils */}
      <ellipse cx="70" cy="70" rx="28" ry="40" fill="#2563a6" />
      <ellipse cx="70" cy="70" rx="10" ry="16" fill="#e2e8f0" />
      <ellipse cx="120" cy="80" rx="22" ry="32" fill={STEEL} />
      <ellipse cx="120" cy="80" rx="8" ry="12" fill="#e2e8f0" />
      <rect x="150" y="55" width="30" height="50" rx="3" fill="#dbeafe" stroke="#2563a6" strokeWidth="2" />
    </IconFrame>
  )
}
