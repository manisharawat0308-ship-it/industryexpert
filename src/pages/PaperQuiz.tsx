import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Star, Target, Flame, CheckCircle2, XCircle, Medal, Sparkles, MapPin } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: "What is the rank of India in global paper production?",
    options: ["3rd", "5th", "7th", "10th"],
    correct: 1,
    hint: "India is among the top 5 paper producers globally...",
    funFact: "India produces 27.8 MTPA of paper, making it the 5th largest producer in the world after China, USA, Japan, and Germany."
  },
  {
    id: 2,
    question: "How many paper mills are operational in India?",
    options: ["200+", "500+", "850+", "1200+"],
    correct: 2,
    hint: "India has a very fragmented paper industry with many small mills...",
    funFact: "India has 850+ paper mills ranging from large integrated mills (ITC, JK Paper) to small agro-based mills producing 5-10 TPD."
  },
  {
    id: 3,
    question: "Which raw material is used by the maximum number of Indian paper mills?",
    options: ["Wood Pulp", "Recycled Waste Paper", "Bagasse (Sugarcane)", "Bamboo"],
    correct: 1,
    hint: "With India's push for recycling and waste paper imports...",
    funFact: "70% of Indian paper production uses recycled waste paper as raw material. India imports 7-8 MTPA of waste paper, mainly from USA and Europe."
  },
  {
    id: 4,
    question: "Which state has the maximum paper manufacturing capacity in India?",
    options: ["Tamil Nadu", "Andhra Pradesh", "Maharashtra", "Gujarat"],
    correct: 1,
    hint: "The state famous for its industrial corridor and port connectivity in South India...",
    funFact: "Tamil Nadu leads with 18% of India's paper capacity, driven by TNPL, ITC Bhadrachalam (nearby AP), and multiple writing paper mills."
  },
  {
    id: 5,
    question: "What is the per capita paper consumption in India (kg/person/year)?",
    options: ["5 kg", "14 kg", "25 kg", "50 kg"],
    correct: 1,
    hint: "India's per capita is much lower than the global average of 55 kg...",
    funFact: "India's per capita paper consumption is only 14 kg vs global average of 55 kg and USA's 200 kg. This indicates massive growth headroom."
  },
  {
    id: 6,
    question: "Which segment of paper industry is growing fastest due to e-commerce boom?",
    options: ["Writing & Printing Paper", "Packaging Board & Corrugated", "Newsprint", "Tissue Paper"],
    correct: 1,
    hint: "Think about what Amazon and Flipkart packages come in...",
    funFact: "Packaging board and corrugated boxes are growing at 12-15% CAGR driven by e-commerce. Every Amazon order needs 3-5 corrugated boxes on average!"
  },
  {
    id: 7,
    question: "Which Indian company is the largest paper manufacturer by revenue?",
    options: ["JK Paper", "ITC (Paperboards Division)", "West Coast Paper", "Emami Paper"],
    correct: 1,
    hint: "This company is part of a massive conglomerate known for cigarettes, hotels, and FMCG...",
    funFact: "ITC's Paperboards and Packaging division generates Rs 8,000+ Cr revenue. Their Bhadrachalam mill in Telangana is one of the largest integrated pulp & paper mills in India."
  },
  {
    id: 8,
    question: "What is 'Black Liquor' in the paper industry context?",
    options: ["A type of ink", "Waste chemical from pulping process (used as fuel)", "A paper dye", "Contaminated water"],
    correct: 1,
    hint: "It's actually a byproduct that becomes valuable energy...",
    funFact: "Black liquor is the spent cooking chemical from the Kraft pulping process. Modern paper mills burn it in recovery boilers to generate steam and recover chemicals — making mills 60-70% energy self-sufficient!"
  },
  {
    id: 9,
    question: "What major risk event caused the Indian newsprint industry to decline?",
    options: ["Import dumping from China", "Digital media replacing print newspapers", "Raw material shortage", "Government ban on newsprint"],
    correct: 1,
    hint: "Think about how you consume news today vs 10 years ago...",
    funFact: "Digital media has caused newsprint demand to fall 5% annually since 2015. Major newsprint mills like Mysore Paper and NEPA have closed. Remaining mills are pivoting to packaging grades."
  },
  {
    id: 10,
    question: "What environmental certification do Indian paper mills pursue for sustainable forestry?",
    options: ["ISO 14001", "FSC (Forest Stewardship Council)", "BIS Green Mark", "EPA Certification"],
    correct: 1,
    hint: "This global certification ensures wood comes from responsibly managed forests...",
    funFact: "FSC certification ensures paper comes from sustainably managed forests. ITC has 150,000+ acres of FSC-certified social forestry plantations — one of the largest in Asia. JK Paper has similar programs."
  },
]

// Treasure hunt path steps (emoji-based map)
const pathSteps = ['🏁', '🌲', '📦', '🏭', '📊', '💰', '🔬', '⚡', '🌍', '🏆', '💎']

export default function PaperQuiz() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro')
  const [playerName, setPlayerName] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)

  const handleStart = () => {
    if (playerName.trim().length >= 2) {
      setPhase('playing')
    }
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    const correct = answerIndex === questions[currentQ].correct
    setIsCorrect(correct)
    
    if (correct) {
      setScore(s => s + (attempts === 0 ? 10 : 5))
      setCompletedSteps(prev => [...prev, currentQ])
      setStreak(s => {
        const newStreak = s + 1
        if (newStreak > maxStreak) setMaxStreak(newStreak)
        return newStreak
      })
    } else {
      setAttempts(a => a + 1)
      setStreak(0)
      if (attempts >= 1) {
        setShowHint(true)
      }
    }
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
      setAttempts(0)
      setShowHint(false)
    } else {
      setPhase('result')
    }
  }

  const handleRetry = () => {
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const getGrade = () => {
    if (score >= 90) return { grade: 'Paper Industry Expert 🏆', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    if (score >= 70) return { grade: 'Industry Analyst ⭐', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (score >= 50) return { grade: 'Market Observer 📊', color: 'text-green-600', bg: 'bg-green-50' }
    return { grade: 'Industry Learner 📚', color: 'text-gray-600', bg: 'bg-gray-50' }
  }

  // INTRO SCREEN
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-cream font-mulish pb-12">
        <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
            <button onClick={() => navigate('/paper')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition">
              <ArrowLeft size={14} /> Back to Paper Dashboard
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <h1 className="text-sm font-extrabold text-navy">🗺️ Paper Industry Treasure Hunt</h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-6 py-16 text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-3xl font-black text-navy mb-3">Paper Industry<br/>Treasure Hunt</h2>
            <p className="text-gray-500 text-sm">Navigate through 10 challenges about the Indian Paper Industry. Answer correctly to move forward on the treasure map!</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-6">
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="p-3 bg-navy/5 rounded-xl">
                <div className="text-xl font-bold text-navy">10</div>
                <div className="text-[10px] text-gray-500">Questions</div>
              </div>
              <div className="p-3 bg-orange/10 rounded-xl">
                <div className="text-xl font-bold text-orange">100</div>
                <div className="text-[10px] text-gray-500">Max Points</div>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <div className="text-xl font-bold text-green-600">💎</div>
                <div className="text-[10px] text-gray-500">Treasure</div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Enter Your Name</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Your name here..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon text-center text-lg font-semibold"
              />
            </div>

            <button
              onClick={handleStart}
              disabled={playerName.trim().length < 2}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-maroon to-orange hover:from-maroon-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀 Start Treasure Hunt
            </button>
          </div>

          <p className="text-[10px] text-gray-400">Powered by ICICI Lombard Industry Intelligence Hub</p>
        </main>
      </div>
    )
  }

  // RESULT SCREEN
  if (phase === 'result') {
    const { grade, color, bg } = getGrade()
    return (
      <div className="min-h-screen bg-cream font-mulish pb-12">
        <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
            <button onClick={() => navigate('/paper')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition">
              <ArrowLeft size={14} /> Back to Paper Dashboard
            </button>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-6 py-12 text-center">
          <div className="text-5xl mb-4">{score >= 70 ? '🏆' : score >= 50 ? '⭐' : '📚'}</div>
          <h2 className="text-2xl font-black text-navy mb-2">Treasure Hunt Complete!</h2>
          <p className="text-gray-500 text-sm mb-6">Well done, <strong>{playerName}</strong>!</p>

          <div className={`${bg} rounded-2xl p-8 border mb-6`}>
            <div className="text-5xl font-black text-navy mb-2">{score}<span className="text-lg text-gray-400">/100</span></div>
            <div className={`text-lg font-bold ${color}`}>{grade}</div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="p-2 bg-white rounded-xl">
                <div className="text-lg font-bold text-green-600">{completedSteps.length}/10</div>
                <div className="text-[9px] text-gray-500">Steps Cleared</div>
              </div>
              <div className="p-2 bg-white rounded-xl">
                <div className="text-lg font-bold text-orange">{maxStreak}</div>
                <div className="text-[9px] text-gray-500">Max Streak 🔥</div>
              </div>
              <div className="p-2 bg-white rounded-xl">
                <div className="text-lg font-bold text-navy">{Math.round(score/10 * 100)}%</div>
                <div className="text-[9px] text-gray-500">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Treasure Path Visualization */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
            <h3 className="text-sm font-bold text-navy mb-3">Your Treasure Path</h3>
            <div className="flex items-center justify-center gap-1 flex-wrap">
              {pathSteps.map((step, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  completedSteps.includes(i) ? 'bg-green-100 border-2 border-green-500' : i === pathSteps.length - 1 && score >= 70 ? 'bg-yellow-100 border-2 border-yellow-500 animate-bounce' : 'bg-gray-100 border border-gray-200'
                }`}>
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setPhase('intro'); setCurrentQ(0); setScore(0); setCompletedSteps([]); setStreak(0); setMaxStreak(0) }}
              className="flex-1 py-3 rounded-xl font-bold text-navy bg-navy/5 hover:bg-navy/10 transition">
              🔄 Play Again
            </button>
            <button onClick={() => navigate('/paper')}
              className="flex-1 py-3 rounded-xl font-bold text-white bg-maroon hover:bg-maroon-600 transition">
              📊 Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    )
  }

  // PLAYING SCREEN
  const q = questions[currentQ]
  const progress = ((currentQ) / questions.length) * 100

  return (
    <div className="min-h-screen bg-cream font-mulish pb-12">
      <header className="bg-white/95 glass border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/paper')} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={16} /></button>
            <span className="text-sm font-bold text-navy">🗺️ {playerName}'s Treasure Hunt</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-orange flex items-center gap-1"><Flame size={14} />{streak > 0 ? `${streak} streak` : ''}</span>
            <span className="text-xs font-bold bg-navy/5 px-3 py-1 rounded-full text-navy"><Star size={12} className="inline" /> {score} pts</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Question {currentQ + 1} of {questions.length}</span>
            <span className="text-xs font-bold text-navy">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-maroon to-orange rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Treasure Path Mini-map */}
        <div className="flex items-center justify-center gap-0.5 mb-6">
          {pathSteps.map((step, i) => (
            <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
              completedSteps.includes(i) ? 'bg-green-100 border border-green-400 scale-110' : i === currentQ ? 'bg-orange/20 border-2 border-orange animate-pulse scale-125' : 'bg-gray-100 border border-gray-200 opacity-50'
            }`}>
              {step}
            </div>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-maroon" />
            <span className="text-xs font-bold text-maroon uppercase tracking-wider">Challenge #{currentQ + 1}</span>
          </div>
          
          <h3 className="text-lg font-bold text-navy mb-6 leading-relaxed">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((option, i) => {
              let btnClass = 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-navy/5 hover:border-navy/30'
              if (showResult && i === q.correct) btnClass = 'bg-green-50 border-green-500 text-green-800'
              else if (showResult && i === selectedAnswer && !isCorrect) btnClass = 'bg-red-50 border-red-400 text-red-700'
              else if (selectedAnswer === i && !showResult) btnClass = 'bg-navy/10 border-navy/40 text-navy'

              return (
                <button
                  key={i}
                  onClick={() => !showResult && handleAnswer(i)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left font-semibold text-sm transition-all ${btnClass} ${!showResult ? 'active:scale-[0.98]' : ''}`}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                    {showResult && i === q.correct && <CheckCircle2 size={18} className="text-green-600 ml-auto" />}
                    {showResult && i === selectedAnswer && !isCorrect && <XCircle size={18} className="text-red-500 ml-auto" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className={`rounded-2xl p-5 mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle2 size={20} className="text-green-600" /> : <XCircle size={20} className="text-red-500" />}
              <span className={`font-bold text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (streak > 2 ? `🔥 ${streak} in a row! +${attempts === 0 ? 10 : 5} points` : `✓ Correct! +${attempts === 0 ? 10 : 5} points`) : 'Not quite! Try again or move on.'}
              </span>
            </div>
            {isCorrect && <p className="text-xs text-green-700 leading-relaxed mt-2">💡 <strong>Fun Fact:</strong> {q.funFact}</p>}
            {!isCorrect && showHint && <p className="text-xs text-orange-700 leading-relaxed mt-2">💡 <strong>Hint:</strong> {q.hint}</p>}
          </div>
        )}

        {/* Action Buttons */}
        {showResult && (
          <div className="flex gap-3">
            {!isCorrect && attempts < 2 && (
              <button onClick={handleRetry} className="flex-1 py-3 rounded-xl font-bold text-orange bg-orange/10 hover:bg-orange/20 transition">
                🔄 Try Again
              </button>
            )}
            <button onClick={handleNext} className="flex-1 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-navy to-maroon hover:from-navy-600 hover:to-maroon-600 transition-all shadow-md active:scale-[0.98]">
              {currentQ < questions.length - 1 ? '→ Next Challenge' : '🏆 See Results'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
