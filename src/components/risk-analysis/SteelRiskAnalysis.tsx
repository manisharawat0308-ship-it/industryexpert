import { useState } from 'react'
import { STEEL_RISK_SOURCES, type RiskSource } from './steelRiskData'
import { RiskCard } from './RiskCard'
import { RiskFramework } from './RiskFramework'
import { EmergingTechRisks } from './EmergingTechRisks'
import { NonInsurableRisks } from './NonInsurableRisks'
import { BestPracticesView } from './BestPracticesView'
import { KnowledgeModal } from './KnowledgeModal'
import { RISK_KNOWLEDGE, type KnowledgeEntry } from './riskKnowledge'

type SubTab = 'insurable' | 'framework' | 'emerging' | 'noninsurable' | 'bestpractices'

const SUB_TABS: { id: SubTab; label: string; icon: string }[] = [
  { id: 'insurable', label: 'Insurable Risks', icon: '🛡️' },
  { id: 'framework', label: 'Risk Framework', icon: '📐' },
  { id: 'emerging', label: 'Emerging Tech', icon: '🔬' },
  { id: 'noninsurable', label: 'Non-Insurable', icon: '⚠️' },
  { id: 'bestpractices', label: 'Best Practices', icon: '✅' },
]

export default function SteelRiskAnalysis() {
  const [activeSource, setActiveSource] = useState<string>(STEEL_RISK_SOURCES[0].id)
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('insurable')
  const [modalEntry, setModalEntry] = useState<KnowledgeEntry | null>(null)

  const source: RiskSource = STEEL_RISK_SOURCES.find(s => s.id === activeSource) || STEEL_RISK_SOURCES[0]
  const isManufacturing = source.id === 'manufacturing'

  const openKnowledgeModal = (entryId: string) => {
    const entry = RISK_KNOWLEDGE[entryId]
    if (entry) setModalEntry(entry)
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        {/* Title Area */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-2xl font-black text-navy">Risk Analysis — Steel Industry</h2>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive risk assessment across the steel value chain: integrated plants, mini mills, downstream processing, raw materials, and manufacturing processes.
          </p>
        </div>

        {/* Source Selector Pills */}
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {STEEL_RISK_SOURCES.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveSource(s.id); setActiveSubTab('insurable') }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  activeSource === s.id
                    ? 'text-white shadow-lg scale-[1.02]'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
                style={activeSource === s.id ? { backgroundColor: s.color, borderColor: s.color } : {}}
              >
                <span className="text-base">{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={source.bannerImage}
            alt={source.bannerTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{source.icon}</span>
                <h3 className="text-2xl font-black text-white">{source.bannerTitle}</h3>
              </div>
              <p className="text-white/70 text-sm max-w-2xl leading-relaxed">{source.bannerSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Sub-Tab Selector (only for non-manufacturing) */}
        {!isManufacturing && (
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="flex flex-wrap gap-1">
              {SUB_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                    activeSubTab === tab.id
                      ? 'bg-white text-navy shadow-sm border border-gray-200'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/60'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div>
        {isManufacturing ? (
          // Manufacturing shows combined view (no sub-tabs)
          <div className="space-y-6">
            <InsurableRisksView source={source} onKnowledgeClick={openKnowledgeModal} />
            <RiskFramework source={source} onKnowledgeClick={openKnowledgeModal} />
            {source.emergingRisks.length > 0 && <EmergingTechRisks risks={source.emergingRisks} />}
            {source.nonInsurableRisks.length > 0 && <NonInsurableRisks risks={source.nonInsurableRisks} />}
            {source.bestPractices.length > 0 && <BestPracticesView practices={source.bestPractices} />}
          </div>
        ) : (
          <>
            {activeSubTab === 'insurable' && <InsurableRisksView source={source} onKnowledgeClick={openKnowledgeModal} />}
            {activeSubTab === 'framework' && <RiskFramework source={source} onKnowledgeClick={openKnowledgeModal} />}
            {activeSubTab === 'emerging' && <EmergingTechRisks risks={source.emergingRisks} />}
            {activeSubTab === 'noninsurable' && <NonInsurableRisks risks={source.nonInsurableRisks} />}
            {activeSubTab === 'bestpractices' && <BestPracticesView practices={source.bestPractices} />}
          </>
        )}
      </div>

      {/* Knowledge Modal */}
      {modalEntry && (
        <KnowledgeModal entry={modalEntry} onClose={() => setModalEntry(null)} />
      )}
    </div>
  )
}

// ===== Insurable Risks View =====
function InsurableRisksView({ source, onKnowledgeClick }: { source: RiskSource; onKnowledgeClick: (id: string) => void }) {
  return (
    <div className="space-y-6">
      {/* AOG Perils */}
      {source.aogPerils.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <span className="text-sm">🌊</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">Act of God (AOG) Perils</h3>
              <p className="text-xs text-gray-500">Natural catastrophe risks — earthquake, flood, cyclone, lightning</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {source.aogPerils.map((peril) => (
              <RiskCard key={peril.id} risk={peril} onKnowledgeClick={onKnowledgeClick} />
            ))}
          </div>
        </div>
      )}

      {/* Non-AOG Perils */}
      {source.nonAogPerils.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <span className="text-sm">🔥</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">Non-AOG Perils</h3>
              <p className="text-xs text-gray-500">Operational risks — fire, explosion, machinery breakdown, electrical damage</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {source.nonAogPerils.map((peril) => (
              <RiskCard key={peril.id} risk={peril} onKnowledgeClick={onKnowledgeClick} />
            ))}
          </div>
        </div>
      )}

      {/* Regulatory Info Box */}
      {source.id === 'integrated' && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">⚖️</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-purple-900">Nuclear Liability & Regulatory Framework</h4>
              <p className="text-xs text-purple-700 mt-1 leading-relaxed">
                Steel plants using radioactive sources (level gauges, thickness gauges) fall under AERB regulations.
                The Civil Liability for Nuclear Damage Act, 2010 caps operator liability at ₹1,500 Cr per incident.
                Orphan source contamination from scrap imports can trigger AERB emergency response and plant shutdown.
                Liability insurance (AERB-mandated) is separate from standard property/BI policies.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
