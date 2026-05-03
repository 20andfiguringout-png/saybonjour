import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle, XCircle, ChevronDown, Menu, X, RotateCcw } from 'lucide-react'
import { readingPassages } from '../data/readingData'
import { addXP } from '../utils/progress'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const levelColors = {
  A1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  B1: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  B2: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

const LEVELS = ['A1', 'A2', 'B1', 'B2']

function buildSections() {
  return LEVELS.map(level => ({
    id: level,
    label: level,
    items: readingPassages
      .filter(p => p.level === level)
      .map(p => ({ id: p.id, label: p.title, data: p })),
  })).filter(s => s.items.length > 0)
}

const NAV_SECTIONS = buildSections()

function PassageArticle({ passage }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showVocab, setShowVocab] = useState(false)

  const allAnswered = Object.keys(answers).length === passage.questions.length
  const score = passage.questions.filter((q, i) => answers[i] === q.answer).length

  const handleSubmit = () => {
    if (!allAnswered) return
    const computed = passage.questions.filter((q, i) => answers[i] === q.answer).length
    setSubmitted(true)
    addXP(computed * 10, 'reading_comprehension')
  }

  const handleRetry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <article>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${levelColors[passage.level]}`}>
          {passage.level}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{passage.title}</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold italic mb-5">{passage.englishTitle}</p>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {passage.questions.length} questions · +{passage.questions.length * 10} XP possible
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <SpeakButton text={passage.text} size="sm" variant="ghost" />
          <span>Listen to passage</span>
        </div>
      </div>

      {/* Passage text */}
      <div className="prose max-w-none text-gray-800 dark:text-gray-200 text-[15px] leading-relaxed whitespace-pre-line font-serif mb-8">
        {passage.text}
      </div>

      {/* Vocabulary */}
      {passage.vocab?.length > 0 && (
        <div className="mb-8 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700/40">
          <button
            onClick={() => setShowVocab(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-amber-800 dark:text-amber-300"
          >
            <span className="flex items-center gap-2">📚 Key Vocabulary ({passage.vocab.length} words)</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${showVocab ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showVocab && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 grid sm:grid-cols-2 gap-3">
                  {passage.vocab.map((v, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <SpeakButton text={v.word} size="sm" variant="ghost" />
                      <span className="font-bold text-amber-800 dark:text-amber-300">{v.word}</span>
                      <span className="text-amber-700 dark:text-amber-400">— {v.def}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Questions */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Comprehension Questions</h2>
      <div className="space-y-6 mb-6">
        {passage.questions.map((q, qi) => (
          <div key={qi}>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {qi + 1}. {q.q}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, ai) => {
                const isSelected = answers[qi] === ai
                const isCorrect = q.answer === ai
                let cls = 'text-left px-4 py-2.5 rounded-xl text-sm border transition-all '
                if (!submitted) {
                  cls += isSelected
                    ? 'bg-burgundy-100 dark:bg-burgundy-900/40 border-burgundy-400 text-burgundy-800 dark:text-cream-50 font-semibold'
                    : 'bg-white dark:bg-dark-warm-200 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-dark-warm-100'
                } else {
                  if (isCorrect) cls += 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-800 dark:text-green-300 font-semibold'
                  else if (isSelected) cls += 'bg-red-100 dark:bg-red-900/30 border-red-400 text-red-700 dark:text-red-400'
                  else cls += 'bg-gray-50 dark:bg-dark-warm-200 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                }
                return (
                  <button
                    key={ai}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [qi]: ai }))}
                    className={cls}
                  >
                    <span className="font-bold mr-1.5">{String.fromCharCode(65 + ai)}.</span>{opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit / result */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="px-6 py-2.5 bg-burgundy-600 text-cream-50 rounded-xl text-sm font-semibold hover:bg-burgundy-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answers
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-dark-warm-200 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className={`flex items-center gap-2 text-sm font-bold ${score === passage.questions.length ? 'text-green-600 dark:text-green-400' : 'text-burgundy-600 dark:text-burgundy-400'}`}>
            {score === passage.questions.length
              ? <CheckCircle className="w-5 h-5" />
              : <XCircle className="w-5 h-5" />}
            {score}/{passage.questions.length} correct — +{score * 10} XP earned
          </div>
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors"
          >
            <RotateCcw size={14} /> Try again
          </button>
        </div>
      )}
    </article>
  )
}

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="text-6xl mb-6">📖</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reading Comprehension</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-4">Compréhension écrite</p>
      <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
        Read authentic French passages from A1 to B2, build vocabulary, and test your understanding with comprehension questions.
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-8 flex items-center gap-2">
        <span>←</span>
        <span>Select a passage from the sidebar to get started</span>
      </p>
    </div>
  )
}

const ReadingComprehension = () => {
  const [activeId, setActiveId] = useState(null)
  const [openSections, setOpenSections] = useState(
    Object.fromEntries(LEVELS.map(l => [l, true]))
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSection = id =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  const handleSelect = id => {
    setActiveId(id)
    setSidebarOpen(false)
  }

  const activePassage = readingPassages.find(p => p.id === activeId) || null

  return (
    <>
      <SEO
        title="French Reading Comprehension — Graded Passages A1 to B2 | SayBonjour!"
        description="Improve your French reading with graded texts from A1 beginner to B2 upper-intermediate. Each passage includes comprehension questions, vocabulary highlights, and audio support."
        keywords="french reading comprehension, french passages, graded french texts, french A1 A2 B1 B2, learn to read french, DELF reading practice, french reading exercises"
        url="/reading"
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
            <span className="font-bold text-gray-900 dark:text-white text-sm">Browse Passages</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-warm-200"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="p-3 pt-4">
            {NAV_SECTIONS.map(({ id, label, items }) => (
              <div key={id} className="mb-1">
                <button
                  onClick={() => toggleSection(id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${levelColors[id]}`}>{id}</span>
                    <span className="text-gray-700 dark:text-gray-200">{items.length} passage{items.length !== 1 ? 's' : ''}</span>
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
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors leading-snug ${
                              activeId === item.id
                                ? 'bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300 font-semibold'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-warm-200 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                          >
                            {item.label}
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
          {/* Mobile breadcrumb bar */}
          <div className="lg:hidden sticky top-20 z-20 bg-white dark:bg-dark-warm-100 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-burgundy-600 dark:hover:text-burgundy-400 flex-shrink-0"
            >
              <Menu size={17} />
              <span>Passages</span>
            </button>
            {activePassage && (
              <>
                <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{activePassage.title}</span>
              </>
            )}
          </div>

          <div className="px-6 py-10 lg:px-12 lg:py-10 max-w-3xl">
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
                  <PassageArticle passage={activePassage} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  )
}

export default ReadingComprehension
