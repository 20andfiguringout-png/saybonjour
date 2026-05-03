import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw, ArrowRight, Lightbulb, Shuffle, PenLine, Zap, ChevronDown, Menu, X } from 'lucide-react'
import { sentenceExercises, fillInBlanks } from '../data/sentenceData'
import { addXP } from '../utils/progress'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  B1: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
}

const TYPE_COLORS = {
  arrange: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  fill: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
}

const LEVELS = ['A1', 'A2', 'B1']

const allExercises = [
  ...sentenceExercises.map(e => ({ ...e, type: 'arrange' })),
  ...fillInBlanks.map(e => ({ ...e, type: 'fill' })),
]

function buildSections() {
  return LEVELS.map(level => ({
    id: level,
    items: allExercises
      .filter(e => e.level === level)
      .map(e => ({ id: e.id, label: e.hint, type: e.type, data: e })),
  })).filter(s => s.items.length > 0)
}

const NAV_SECTIONS = buildSections()

// ─── Arrange exercise ──────────────────────────────────────────────────────────
function SentenceArrangeExercise({ exercise, onComplete }) {
  const [pool, setPool] = useState([])
  const [built, setBuilt] = useState([])
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    setPool([...exercise.words].sort(() => Math.random() - 0.5))
    setBuilt([])
    setChecked(false)
    setIsCorrect(false)
    setShowHint(false)
  }, [exercise])

  const addWord = (word, idx) => {
    if (checked) return
    setBuilt(b => [...b, word])
    setPool(p => { const n = [...p]; n.splice(idx, 1); return n })
  }

  const removeWord = (word, idx) => {
    if (checked) return
    setPool(p => [...p, word])
    setBuilt(b => { const n = [...b]; n.splice(idx, 1); return n })
  }

  const handleCheck = () => {
    const correct = JSON.stringify(built) === JSON.stringify(exercise.correct)
    setIsCorrect(correct)
    setChecked(true)
    onComplete(correct ? 15 : 5)
  }

  const handleReset = () => {
    setPool([...exercise.words].sort(() => Math.random() - 0.5))
    setBuilt([])
    setChecked(false)
    setIsCorrect(false)
    setShowHint(false)
  }

  return (
    <div className="space-y-4">
      {/* Build zone */}
      <div className={`min-h-[56px] rounded-xl p-3 flex flex-wrap gap-2 items-center border-2 border-dashed transition-colors ${
        checked
          ? isCorrect
            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
            : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
          : 'bg-gray-50 dark:bg-dark-warm-200 border-gray-300 dark:border-gray-600'
      }`}>
        {built.length === 0 && (
          <span className="text-sm text-gray-400 dark:text-gray-500 italic">Click words below to build the sentence…</span>
        )}
        <AnimatePresence>
          {built.map((w, i) => (
            <motion.button
              key={`built-${i}-${w}`}
              onClick={() => removeWord(w, i)}
              disabled={checked}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                checked
                  ? isCorrect
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 text-emerald-800 dark:text-emerald-300 cursor-default'
                    : 'bg-red-100 dark:bg-red-900/40 border-red-300 text-red-700 dark:text-red-400 cursor-default'
                  : 'bg-burgundy-100 dark:bg-burgundy-900/40 border-burgundy-300 text-burgundy-800 dark:text-cream-50 hover:bg-burgundy-200 cursor-pointer'
              }`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              whileTap={!checked ? { scale: 0.95 } : {}}
            >
              {w}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Word pool */}
      <div className="flex flex-wrap gap-2">
        {pool.map((w, i) => (
          <motion.button
            key={`pool-${i}-${w}`}
            onClick={() => addWord(w, i)}
            disabled={checked}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-dark-warm-100 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-burgundy-400 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {w}
          </motion.button>
        ))}
        {pool.length === 0 && !checked && (
          <span className="text-xs text-gray-400 italic">All words placed</span>
        )}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {checked && (
          <motion.div
            className={`rounded-xl p-4 text-sm border ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          >
            <div className={`font-bold mb-1 flex items-center justify-between gap-2 ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
              <span className="flex items-center gap-2">
                {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {isCorrect ? 'Perfect!' : `Correct: ${exercise.correct.join(' ')}`}
              </span>
              <SpeakButton text={exercise.correct.join(' ')} size="sm" variant="ghost" />
            </div>
            <div className="text-gray-600 dark:text-gray-300 italic mb-1">"{exercise.translation}"</div>
            {exercise.explanation && <div className="text-xs text-gray-500 dark:text-gray-400">💡 {exercise.explanation}</div>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <AnimatePresence>
        {showHint && !checked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2 border border-amber-200 dark:border-amber-800"
          >
            First word: <strong>{exercise.correct[0]}</strong>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      {!checked && (
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleCheck}
            disabled={built.length === 0}
            className="px-5 py-2.5 bg-burgundy-600 text-cream-50 rounded-xl text-sm font-semibold hover:bg-burgundy-700 disabled:opacity-40 transition-colors"
          >
            Check Answer
          </button>
          <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-dark-warm-200">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button onClick={() => setShowHint(h => !h)} className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20">
            <Lightbulb className="w-3.5 h-3.5" /> {showHint ? 'Hide hint' : 'Hint'}
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400 dark:text-gray-500">Click words to add them · Click again to remove</p>
    </div>
  )
}

// ─── Fill-blank exercise ───────────────────────────────────────────────────────
function FillBlankExercise({ exercise, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setSelected(null)
    setChecked(false)
  }, [exercise])

  const handleCheck = () => {
    if (selected === null) return
    setChecked(true)
    onComplete(selected === exercise.answer ? 10 : 3)
  }

  const parts = exercise.sentence.split('___')

  return (
    <div className="space-y-4">
      {/* Sentence display */}
      <div className="bg-gray-50 dark:bg-dark-warm-200 rounded-xl p-4 text-base font-medium text-gray-800 dark:text-cream-50 border border-gray-200 dark:border-gray-600 flex items-center justify-between gap-3">
        <div className="text-center flex-1 leading-relaxed">
          {parts[0]}
          <span className={`inline-block min-w-[80px] px-2 py-0.5 mx-1 rounded-lg border-b-2 border-dashed text-center font-bold transition-colors ${
            !checked ? 'border-burgundy-400 text-burgundy-600 dark:text-burgundy-400'
            : selected === exercise.answer ? 'border-emerald-400 text-emerald-700 dark:text-emerald-400'
            : 'border-red-400 text-red-600 dark:text-red-400'
          }`}>
            {selected !== null ? exercise.options[selected] : '___'}
          </span>
          {parts[1]}
        </div>
        {checked && (
          <div className="flex-shrink-0">
            <SpeakButton text={exercise.sentence.replace('___', exercise.options[exercise.answer])} size="sm" variant="ghost" />
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {exercise.options.map((opt, i) => {
          let cls = 'text-left px-4 py-2.5 rounded-xl text-sm border-2 transition-all font-medium '
          if (!checked) {
            cls += selected === i
              ? 'bg-burgundy-100 dark:bg-burgundy-900/40 border-burgundy-400 text-burgundy-800 dark:text-cream-50'
              : 'bg-white dark:bg-dark-warm-200 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-dark-warm-100'
          } else {
            if (exercise.answer === i) cls += 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 text-emerald-800 dark:text-emerald-300'
            else if (selected === i) cls += 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-400'
            else cls += 'bg-gray-50 dark:bg-dark-warm-200 border-gray-200 dark:border-gray-600 text-gray-400'
          }
          return (
            <button key={i} onClick={() => !checked && setSelected(i)} className={cls}>
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-600 dark:text-gray-300 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-700">
            <div className="italic mb-1">"{exercise.translation}"</div>
            {exercise.explanation && <div className="text-xs text-gray-500 dark:text-gray-400">💡 {exercise.explanation}</div>}
          </motion.div>
        )}
      </AnimatePresence>

      {!checked && (
        <button onClick={handleCheck} disabled={selected === null}
          className="px-5 py-2.5 bg-burgundy-600 text-cream-50 rounded-xl text-sm font-semibold hover:bg-burgundy-700 disabled:opacity-40 transition-colors">
          Check Answer
        </button>
      )}

      <p className="text-xs text-gray-400 dark:text-gray-500">Select the correct option to fill the blank</p>
    </div>
  )
}

// ─── Exercise article view ─────────────────────────────────────────────────────
function ExerciseArticle({ exercise, score, completed, onComplete, onNext, hasNext }) {
  const [exerciseKey, setExerciseKey] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    setExerciseKey(k => k + 1)
    setIsDone(false)
  }, [exercise.id])

  const handleComplete = (xp) => {
    onComplete(xp)
    setIsDone(true)
  }

  return (
    <article>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_COLORS[exercise.level]}`}>
          {exercise.level}
        </span>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${TYPE_COLORS[exercise.type]}`}>
          {exercise.type === 'arrange'
            ? <><Shuffle className="w-3 h-3" /> Arrange</>
            : <><PenLine className="w-3 h-3" /> Fill Blank</>}
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">{exercise.hint}</h1>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
            <Zap className="w-3.5 h-3.5" /> {score} XP
          </span>
          <span><span className="font-bold text-gray-700 dark:text-gray-200">{completed}</span> done this session</span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          +{exercise.type === 'arrange' ? '15' : '10'} XP for correct answer
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={exerciseKey}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
        >
          {exercise.type === 'arrange'
            ? <SentenceArrangeExercise exercise={exercise} onComplete={handleComplete} />
            : <FillBlankExercise exercise={exercise} onComplete={handleComplete} />}
        </motion.div>
      </AnimatePresence>

      {/* Next exercise */}
      {hasNext && (
        <div className="mt-6">
          <button
            onClick={onNext}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isDone
                ? 'bg-burgundy-600 text-cream-50 hover:bg-burgundy-700'
                : 'border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-warm-200'
            }`}
          >
            Next exercise <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </article>
  )
}

// ─── Welcome screen ────────────────────────────────────────────────────────────
function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="text-6xl mb-6">🧩</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sentence Builder</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-4">Constructeur de phrases</p>
      <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
        Build grammatically correct French sentences by arranging words or choosing the right option. Earn XP for every correct answer.
      </p>
      <div className="flex gap-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5"><Shuffle className="w-4 h-4 text-purple-500" /> Arrange words</span>
        <span className="flex items-center gap-1.5"><PenLine className="w-4 h-4 text-sky-500" /> Fill blanks</span>
      </div>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-8 flex items-center gap-2">
        <span>←</span>
        <span>Pick a topic from the sidebar to start</span>
      </p>
    </div>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function SentenceBuilder() {
  const [activeId, setActiveId] = useState(null)
  const [openSections, setOpenSections] = useState(
    Object.fromEntries(LEVELS.map(l => [l, true]))
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(0)

  const toggleSection = id =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  const handleSelect = id => {
    setActiveId(id)
    setSidebarOpen(false)
  }

  const activeExercise = allExercises.find(e => e.id === activeId) || null

  // Find next exercise in the same level (same type or mixed)
  const currentIdx = activeExercise
    ? allExercises.findIndex(e => e.id === activeId)
    : -1
  const nextExercise = currentIdx >= 0 && currentIdx < allExercises.length - 1
    ? allExercises[currentIdx + 1]
    : null

  const handleComplete = (xp) => {
    setScore(s => s + xp)
    setCompleted(c => c + 1)
    addXP(xp, 'sentence_builder')
    window.dispatchEvent(new Event('progressUpdated'))
  }

  const handleNext = () => {
    if (nextExercise) setActiveId(nextExercise.id)
  }

  return (
    <>
      <SEO
        title="French Sentence Builder — Construct Phrases Step by Step | SayBonjour!"
        description="Build grammatically correct French sentences interactively. Drag, drop, and arrange words to form phrases across different tenses, then get instant feedback on your answers."
        keywords="french sentence builder, build french sentences, french grammar practice, french word order, french sentence structure, learn french sentences"
        url="/sentence-builder"
      />

      <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300 flex relative">

        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-20 left-0 h-screen lg:h-[calc(100vh-5rem)] w-60 bg-white dark:bg-dark-warm-100 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-40 lg:z-auto transition-transform duration-300 flex-shrink-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Mobile close */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-700 lg:hidden">
            <span className="font-bold text-gray-900 dark:text-white text-sm">Browse Exercises</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-warm-200"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="p-3 pt-4">
            {NAV_SECTIONS.map(({ id, items }) => (
              <div key={id} className="mb-1">
                <button
                  onClick={() => toggleSection(id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${LEVEL_COLORS[id]}`}>{id}</span>
                    <span className="text-gray-700 dark:text-gray-200">{items.length} exercises</span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${openSections[id] ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openSections[id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-1 mt-0.5 space-y-0.5 pb-1">
                        {items.map(item => (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              activeId === item.id
                                ? 'bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300 font-semibold'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-warm-200 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="flex-shrink-0 mt-0.5">
                                {item.type === 'arrange'
                                  ? <Shuffle size={11} className="text-purple-400" />
                                  : <PenLine size={11} className="text-sky-400" />}
                              </span>
                              <span className="leading-snug text-[13px]">{item.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile breadcrumb */}
          <div className="lg:hidden sticky top-20 z-20 bg-white dark:bg-dark-warm-100 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-burgundy-600 dark:hover:text-burgundy-400 flex-shrink-0"
            >
              <Menu size={17} />
              <span>Exercises</span>
            </button>
            {activeExercise && (
              <>
                <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{activeExercise.hint}</span>
              </>
            )}
          </div>

          <div className="px-6 py-10 lg:px-12 lg:py-10 max-w-2xl">
            <AnimatePresence mode="wait">
              {!activeId ? (
                <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Welcome />
                </motion.div>
              ) : (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExerciseArticle
                    exercise={activeExercise}
                    score={score}
                    completed={completed}
                    onComplete={handleComplete}
                    onNext={handleNext}
                    hasNext={!!nextExercise}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  )
}
