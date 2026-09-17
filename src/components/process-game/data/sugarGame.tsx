import type { IndustryGameData } from '../types'
import { NAVY, ORANGE } from '../shared'

const SUGAR = '#059669'

// Reward: fill and finish a sugar bag / sweet jar (6 parts)
function SugarBagBuild(parts: number, highlight: boolean) {
  const show = (n: number) => parts >= n
  const fill = Math.min(1, parts / 5) // fill level for stages 1..5
  const bagTop = 150 - fill * 90
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[240px]" role="img" aria-label="Sugar bag being filled">
      <rect x="0" y="0" width="220" height="200" fill="#f8fafc" rx="10" />
      {/* bag outline */}
      <path d="M70 60 L150 60 L150 165 L70 165 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
      {/* filling */}
      {parts >= 1 && <rect x="72" y={bagTop} width="76" height={165 - bagTop} fill={SUGAR} opacity="0.85" className="animate-[fadeIn_0.5s_ease]" />}
      {/* label */}
      {show(6) && <><rect x="82" y="95" width="56" height="34" rx="3" fill="#ffffff" stroke={SUGAR} strokeWidth="1.5" /><text x="110" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill={SUGAR}>SUGAR</text><text x="110" y="122" textAnchor="middle" fontSize="6" fill="#64748b">1 kg • Pure</text></>}
      {/* bag top fold */}
      {show(5) && <rect x="66" y="52" width="88" height="10" rx="2" fill="#cbd5e1" />}
      {show(6) && <circle cx="150" cy="35" r="12" fill={ORANGE} opacity="0.5" />}
      {parts === 0 && <path d="M70 60 L150 60 L150 165 L70 165 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" />}
      {highlight && show(6) && <text x="110" y="185" textAnchor="middle" fontSize="10" fontWeight="bold" fill={SUGAR}>Bag of pure sugar, ready!</text>}
    </svg>
  )
}
function SugarPreview() {
  return (
    <svg viewBox="0 0 60 70" className="w-14 h-16">
      <path d="M14 18 L46 18 L46 62 L14 62 Z" fill={SUGAR} opacity="0.85" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="20" y="34" width="20" height="14" rx="2" fill="#fff" stroke={SUGAR} strokeWidth="1" />
      <rect x="10" y="14" width="40" height="6" rx="2" fill="#cbd5e1" />
    </svg>
  )
}

function DiagramContent() {
  return (
    <>
      <rect x="0" y="0" width="300" height="200" fill="#ecfdf5" />
      <polyline points="40,45 90,45 140,45 190,45 240,45 240,110 190,110 140,110 90,110 55,110 55,150"
        fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
      {/* Cane field */}
      <rect x="16" y="34" width="4" height="22" fill="#16a34a" /><rect x="22" y="30" width="4" height="26" fill="#16a34a" /><rect x="28" y="34" width="4" height="22" fill="#16a34a" /><text x="26" y="66" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Cane</text>
      {/* Milling */}
      <rect x="76" y="34" width="24" height="20" rx="2" fill="#3b82f6" /><text x="88" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Milling</text>
      {/* Clarification */}
      <circle cx="138" cy="44" r="12" fill="#14b8a6" /><text x="138" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Clarify</text>
      {/* Evaporation */}
      <rect x="178" y="32" width="24" height="22" rx="3" fill="#f59e0b" /><text x="190" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Evaporate</text>
      {/* Crystallization (pan) */}
      <path d="M228 32 h24 l-4 20 h-16 z" fill="#a855f7" /><text x="240" y="64" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Crystallize</text>
      {/* Centrifuge */}
      <circle cx="240" cy="105" r="12" fill="#22b8cf" /><circle cx="240" cy="105" r="4" fill="#ecfdf5" /><text x="240" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Centrifuge</text>
      {/* Drying */}
      <rect x="178" y="98" width="24" height="14" rx="2" fill="#ef4444" /><text x="190" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Dry/Grade</text>
      {/* Sugar pile */}
      <polygon points="128,110 140,94 152,110" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" /><text x="140" y="124" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Sugar</text>
      {/* Packing */}
      <rect x="46" y="140" width="18" height="20" rx="2" fill={SUGAR} /><text x="55" y="172" fontSize="7" textAnchor="middle" fill="#334155" fontWeight="bold">Packing</text>
    </>
  )
}

export const SUGAR_GAME: IndustryGameData = {
  industryName: 'Sugar',
  brandColor: SUGAR,
  processName: 'sugar manufacturing',
  reward: {
    noun: 'Bag of Sugar', verb: 'Produce', parts: 6,
    partLabels: ['Juice extracted', 'Juice clarified', 'Syrup concentrated', 'Crystals grown', 'Crystals separated & dried', 'Graded, packed & sealed!'],
    renderReward: SugarBagBuild, renderPreview: SugarPreview,
    completionTitle: 'Your Bag of Sugar is Ready!',
    completionSubtitle: 'From sugarcane to pure crystals — you did it.',
  },
  questionsPerPlay: 10,
  questions: [
    { topic: 'Raw Material', prompt: 'What is the primary raw material for the Indian sugar industry?', options: ['Sugarcane', 'Sugar beet', 'Corn', 'Wheat'], explanation: 'India is the world\'s largest sugarcane producer, and nearly all Indian sugar is made from cane (unlike Europe, which mainly uses sugar beet). Cane is crushed within hours of harvest to preserve sucrose.' },
    { topic: 'Milling', prompt: 'The first processing step crushes the cane. What is extracted?', options: ['Sugarcane juice', 'Molasses', 'Bagasse fibre', 'Ethanol'], explanation: 'Cane passes through a series of heavy roller mills that squeeze out the sweet juice. The fibrous residue left behind is called bagasse, which is burned as fuel to power the mill.' },
    { topic: 'Bagasse', prompt: 'What is bagasse — the fibrous residue after crushing — mainly used for?', options: ['Burned in boilers to generate steam & power (cogeneration)', 'Thrown away as waste', 'Eaten as food', 'Made into fertilizer only'], explanation: 'Bagasse is burned in the mill\'s boilers to produce steam and electricity (cogeneration). Many mills export surplus green power to the grid, making them largely energy self-sufficient.' },
    { topic: 'Clarification', prompt: 'The raw juice is impure. How is it cleaned before concentration?', options: ['Heating with lime (clarification) to remove impurities', 'Freezing it', 'Adding sugar', 'Grinding it'], explanation: 'In clarification, the juice is heated and treated with lime (and sometimes sulphur/carbon dioxide) so impurities settle out as "mud", leaving a clear juice ready to concentrate.' },
    { topic: 'Evaporation', prompt: 'How is the clarified juice turned into a thick syrup?', options: ['Boiling off water in multiple-effect evaporators', 'Adding more water', 'Cooling it', 'Filtering only'], explanation: 'The thin juice is boiled in multiple-effect evaporators that remove most of the water, concentrating it into a thick syrup ready for crystallisation. Multiple effects reuse steam to save energy.' },
    { topic: 'Crystallisation', prompt: 'In the vacuum pan, what forms as the syrup is boiled further and seeded?', options: ['Sugar crystals (in a mixture called massecuite)', 'Ethanol', 'Bagasse', 'Lime'], explanation: 'The syrup is boiled under vacuum and seeded so sucrose crystallises out. The resulting mix of crystals and mother liquor is called massecuite, ready to be separated.' },
    { topic: 'Centrifuging', prompt: 'How are the sugar crystals separated from the surrounding liquid (molasses)?', options: ['High-speed centrifuges spin off the molasses', 'Evaporation', 'Filtration through cloth', 'Freezing'], explanation: 'High-speed centrifuges spin the massecuite so the liquid molasses is thrown off through a screen, leaving behind the raw sugar crystals. The molasses is a valuable by-product.' },
    { topic: 'Molasses', prompt: 'Molasses, the by-product of centrifuging, is a key feedstock for making what?', options: ['Ethanol / alcohol', 'Cement', 'Steel', 'Paper'], explanation: 'Molasses is fermented and distilled to make ethanol (for blending with petrol) and potable/industrial alcohol. India\'s ethanol-blending programme has made this a major revenue stream for sugar mills.' },
    { topic: 'Drying & Grading', prompt: 'After centrifuging, what happens to the wet sugar crystals?', options: ['They are dried, cooled and graded by size', 'They are melted again', 'They are crushed', 'They are re-boiled with lime'], explanation: 'The moist crystals are dried in a rotary drier, cooled, and screened into different grain sizes (grades). The dry, graded sugar is then stored in silos before packing.' },
    { topic: 'Ethanol Blending', prompt: 'Why has India strongly promoted ethanol from sugar mills recently?', options: ['To blend with petrol and cut crude oil imports', 'To make more sugar', 'To reduce cane farming', 'To import more fuel'], explanation: 'Ethanol blended into petrol (E20 target) reduces India\'s crude oil import bill and gives mills a second income stream, improving their finances and helping clear cane-farmer dues.' },
    { topic: 'Cane Pricing', prompt: 'The minimum price mills must pay farmers for cane is set by the government as the:', options: ['Fair and Remunerative Price (FRP)', 'Minimum Support Price (MSP)', 'Wholesale Price Index', 'Retail selling price'], explanation: 'The centre sets a Fair and Remunerative Price (FRP) for cane; some states add a higher State Advised Price (SAP). These pricing controls are a key driver of mill profitability and farmer dues.' },
    { topic: 'Seasonality', prompt: 'Why is sugar production highly seasonal in India?', options: ['Cane is crushed only during the harvest "crushing season" (~Oct-Apr)', 'Sugar melts in summer', 'Mills close for festivals', 'Demand only exists in winter'], explanation: 'Mills operate mainly during the crushing season (roughly October to April) when cane is harvested and must be processed quickly before sucrose degrades. This makes cash flows and inventory highly seasonal.' },
  ],
  diagram: {
    renderContent: DiagramContent,
    spots: [
      { id: 'cane', label: 'Sugarcane', info: 'The raw material. Cane is harvested and rushed to the mill within hours so its sucrose content does not degrade.', x: 12, y: 28, w: 28, h: 34 },
      { id: 'milling', label: 'Milling', info: 'Roller mills crush the cane to squeeze out sweet juice. The leftover fibre (bagasse) is burned for power.', x: 74, y: 30, w: 28, h: 34 },
      { id: 'clarify', label: 'Clarification', info: 'The raw juice is heated and treated with lime so impurities settle out, leaving a clear juice.', x: 124, y: 30, w: 28, h: 34 },
      { id: 'evaporate', label: 'Evaporation', info: 'Multiple-effect evaporators boil off most of the water, concentrating the juice into a thick syrup.', x: 176, y: 28, w: 28, h: 34 },
      { id: 'crystallize', label: 'Crystallisation', info: 'The syrup is boiled under vacuum and seeded so sugar crystallises into a mix called massecuite.', x: 226, y: 28, w: 30, h: 34 },
      { id: 'centrifuge', label: 'Centrifuge', info: 'High-speed centrifuges spin off the liquid molasses, leaving raw sugar crystals behind.', x: 226, y: 92, w: 30, h: 30 },
      { id: 'dry', label: 'Drying & Grading', info: 'Wet crystals are dried, cooled, and screened into different grain sizes (grades) before storage.', x: 176, y: 94, w: 28, h: 30 },
      { id: 'sugar', label: 'Sugar', info: 'The finished white/refined sugar, graded and stored in silos, ready to be packed.', x: 126, y: 92, w: 30, h: 32 },
      { id: 'packing', label: 'Packing', info: 'Sugar is packed into bags (from 1 kg retail to 50 kg bulk) and dispatched to markets and food makers.', x: 42, y: 136, w: 28, h: 30 },
    ],
  },
}
