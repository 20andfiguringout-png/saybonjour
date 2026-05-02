import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, ChevronRight, ChevronDown, CheckCircle, XCircle, Award, Menu, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { grammarLevels } from '../data/grammarData'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'
import SpeakButton from '../components/SpeakButton'

// ─── Level accent colors ────────────────────────────────────────────────────
const LEVEL_ACCENTS = {
  A1: { dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700' },
  A2: { dot: 'bg-blue-500',    text: 'text-blue-700 dark:text-blue-400',    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-700' },
  B1: { dot: 'bg-yellow-500',  text: 'text-yellow-700 dark:text-yellow-400', badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700' },
  B2: { dot: 'bg-orange-500',  text: 'text-orange-700 dark:text-orange-400', badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-700' },
  C1: { dot: 'bg-purple-500',  text: 'text-purple-700 dark:text-purple-400', badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-700' },
  C2: { dot: 'bg-red-600',     text: 'text-red-700 dark:text-red-400',      badge: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-700' },
}

// ─── Quiz ───────────────────────────────────────────────────────────────────
const QuizSection = ({ quiz, topicId }) => {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => { setAnswers({}); setSubmitted(false) }, [topicId])

  const score = submitted ? quiz.filter((q, i) => answers[i] === q.answer).length : 0

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.length) return
    setSubmitted(true)
    const s = quiz.filter((q, i) => answers[i] === q.answer).length
    addXP(s * 10, 'grammar_quiz')
  }

  return (
    <div className="mt-8 bg-cream-50 dark:bg-dark-warm-200 rounded-2xl border border-cream-200 dark:border-dark-warm-50 p-6">
      <h3 className="font-bold text-burgundy-800 dark:text-cream-50 mb-5 flex items-center gap-2 text-base">
        <Award className="w-5 h-5" /> Quick Check
      </h3>
      <div className="space-y-5">
        {quiz.map((q, qi) => (
          <div key={qi}>
            <p className="text-sm font-semibold text-gray-800 dark:text-cream-100 mb-3">{qi + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, ai) => {
                const isSelected = answers[qi] === ai
                const isCorrect = q.answer === ai
                let cls = 'text-left px-4 py-2.5 rounded-xl text-sm border transition-all '
                if (!submitted) {
                  cls += isSelected
                    ? 'bg-burgundy-100 dark:bg-burgundy-900/40 border-burgundy-400 text-burgundy-800 dark:text-cream-50 font-medium'
                    : 'bg-white dark:bg-dark-warm-100 border-cream-300 dark:border-dark-warm-50 text-gray-700 dark:text-gray-300 hover:border-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20'
                } else {
                  if (isCorrect) cls += 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-800 dark:text-green-300 font-medium'
                  else if (isSelected) cls += 'bg-red-100 dark:bg-red-900/30 border-red-400 text-red-700 dark:text-red-300'
                  else cls += 'bg-white dark:bg-dark-warm-100 border-cream-200 dark:border-dark-warm-50 text-gray-400 dark:text-gray-500'
                }
                return (
                  <button key={ai} onClick={() => !submitted && setAnswers(p => ({ ...p, [qi]: ai }))} className={cls}>
                    <span className="font-bold mr-2">{String.fromCharCode(65 + ai)}.</span>{opt}
                    {submitted && isCorrect && <CheckCircle className="inline w-3.5 h-3.5 ml-1.5 text-green-600" />}
                    {submitted && isSelected && !isCorrect && <XCircle className="inline w-3.5 h-3.5 ml-1.5 text-red-500" />}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < quiz.length}
          className="mt-5 px-6 py-2.5 bg-burgundy-600 text-cream-50 rounded-xl text-sm font-semibold hover:bg-burgundy-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Answers
        </button>
      ) : (
        <div className="mt-5 flex items-center gap-4">
          <div className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl ${score === quiz.length ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
            {score === quiz.length ? <CheckCircle className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {score}/{quiz.length} correct — +{score * 10} XP
          </div>
          <button onClick={() => { setAnswers({}); setSubmitted(false) }} className="text-sm text-burgundy-600 dark:text-burgundy-400 hover:underline font-medium">
            Try again
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Topic content panel ────────────────────────────────────────────────────
const TopicContent = ({ topic, level, allTopics, onNavigate }) => {
  const currentIndex = allTopics.findIndex(t => t.id === topic.id)
  const prev = allTopics[currentIndex - 1]
  const next = allTopics[currentIndex + 1]
  const accent = LEVEL_ACCENTS[level] || LEVEL_ACCENTS.A1
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [topic.id])

  return (
    <div ref={contentRef} className="h-full overflow-y-auto">
      <div className="px-6 py-8 max-w-3xl">
        {/* Topic header */}
        <div className="mb-6">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border mb-3 ${accent.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
            {level} Level
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-cream-50 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            {topic.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed border-l-4 border-burgundy-300 dark:border-burgundy-600 pl-4">
            {topic.summary}
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-7">
          {topic.content?.map((section, si) => (
            <div key={si}>
              <h2 className={`text-base font-bold mb-3 ${accent.text}`}>{section.heading}</h2>
              {section.text && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{section.text}</p>
              )}
              {section.list && (
                <ul className="space-y-2">
                  {section.list.map((item, li) => (
                    <li key={li} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="overflow-x-auto rounded-xl border border-cream-200 dark:border-dark-warm-50 shadow-sm">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-burgundy-700 dark:bg-burgundy-800 text-cream-50">
                        {section.table.headers.map((h, hi) => (
                          <th key={hi} className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? 'bg-white dark:bg-dark-warm-100' : 'bg-cream-50 dark:bg-dark-warm-200'}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-4 py-2.5 text-gray-700 dark:text-gray-300 border-b border-cream-100 dark:border-dark-warm-50 text-sm">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Examples */}
        {topic.examples?.length > 0 && (
          <div className="mt-8 bg-burgundy-50 dark:bg-burgundy-900/20 rounded-2xl p-5 border border-burgundy-100 dark:border-burgundy-800/40">
            <h3 className="text-xs font-bold text-burgundy-600 dark:text-burgundy-400 uppercase tracking-widest mb-4">
              Example Sentences
            </h3>
            <div className="space-y-4">
              {topic.examples.map((ex, ei) => (
                <div key={ei} className="flex items-start gap-3 bg-white dark:bg-dark-warm-100 rounded-xl px-4 py-3 border border-burgundy-100 dark:border-dark-warm-50 shadow-sm">
                  <SpeakButton text={ex.french} size="sm" variant="ghost" className="shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-burgundy-800 dark:text-cream-100 text-sm leading-snug">{ex.french}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{ex.english}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz */}
        {topic.quiz?.length > 0 && <QuizSection quiz={topic.quiz} topicId={topic.id} />}

        {/* Prev / Next navigation */}
        <div className="mt-10 pt-6 border-t border-cream-200 dark:border-dark-warm-50 flex items-center justify-between gap-4">
          {prev ? (
            <button
              onClick={() => onNavigate(prev)}
              className="flex items-center gap-2 text-sm font-medium text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-200 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-left">
                <span className="block text-xs text-gray-400 dark:text-gray-500 font-normal">Previous</span>
                {prev.title}
              </span>
            </button>
          ) : <div />}
          {next ? (
            <button
              onClick={() => onNavigate(next)}
              className="flex items-center gap-2 text-sm font-medium text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-200 group text-right"
            >
              <span>
                <span className="block text-xs text-gray-400 dark:text-gray-500 font-normal">Next</span>
                {next.title}
              </span>
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = ({ activeTopic, onSelect, onLevelChange }) => {
  const [expandedLevels, setExpandedLevels] = useState({ A1: true })

  const toggleLevel = (level) => {
    setExpandedLevels(prev => ({ ...prev, [level]: !prev[level] }))
  }

  const handleTopicClick = (topic, level) => {
    onSelect(topic, level)
    onLevelChange(level)
  }

  return (
    <nav className="h-full overflow-y-auto py-4">
      {grammarLevels.map(lvl => {
        const accent = LEVEL_ACCENTS[lvl.level]
        const isExpanded = expandedLevels[lvl.level]
        return (
          <div key={lvl.level} className="mb-1">
            {/* Level header */}
            <button
              onClick={() => toggleLevel(lvl.level)}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-cream-100 dark:hover:bg-dark-warm-200 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black ${accent.badge} border`}>
                  {lvl.level}
                </span>
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-800 dark:text-cream-100">{lvl.label}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{lvl.topics.length} topics</div>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Topics list */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {lvl.topics.map(topic => {
                    const isActive = activeTopic?.id === topic.id
                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicClick(topic, lvl.level)}
                        className={`w-full flex items-start gap-2.5 px-4 py-2.5 pl-12 text-left text-sm transition-colors border-l-2 ${
                          isActive
                            ? `border-burgundy-500 bg-burgundy-50 dark:bg-burgundy-900/30 ${accent.text} font-semibold`
                            : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-cream-50 dark:hover:bg-dark-warm-200 hover:text-gray-900 dark:hover:text-cream-100 font-normal'
                        }`}
                      >
                        {isActive && <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${accent.dot}`} />}
                        <span className="leading-snug">{topic.title}</span>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}

// ─── Main Grammar page ───────────────────────────────────────────────────────
const Grammar = () => {
  const defaultLevel = grammarLevels[0]
  const defaultTopic = defaultLevel.topics[0]

  const [activeTopic, setActiveTopic] = useState(defaultTopic)
  const [activeLevel, setActiveLevel] = useState(defaultLevel.level)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // flat list of all topics for prev/next
  const allTopics = grammarLevels.flatMap(l => l.topics)

  const handleSelect = (topic, level) => {
    setActiveTopic(topic)
    setActiveLevel(level)
    setSidebarOpen(false)
  }

  return (
    <>
      <SEO
        title="French Grammar Guide A1–C2 | SayBonjour"
        description="Comprehensive French grammar lessons from beginner (A1) to mastery (C2). Articles, tenses, subjunctive, passive voice and more with examples and quizzes."
        keywords="french grammar, french grammar exercises, CEFR french, subjunctive french, passé composé, french articles"
        url="/grammar"
      />

      <div className="flex flex-col h-[calc(100vh-5rem)] bg-gray-50 dark:bg-dark-warm-300">

        {/* ── Top bar ── */}
        <div className="bg-gradient-to-r from-burgundy-800 to-burgundy-600 text-cream-50 px-4 py-5 flex items-center gap-4 shrink-0">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="lg:hidden w-9 h-9 flex items-center justify-center bg-cream-50/20 rounded-lg shrink-0"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-3 min-w-0">
            <BookOpen className="w-5 h-5 shrink-0" />
            <div className="min-w-0">
              <h1 className="font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                French Grammar A1–C2
              </h1>
              <p className="text-cream-200 text-xs hidden sm:block truncate">
                {activeTopic.title}
              </p>
            </div>
          </div>

          {/* CEFR level pills */}
          <div className="ml-auto hidden md:flex items-center gap-1">
            {grammarLevels.map(lvl => {
              const accent = LEVEL_ACCENTS[lvl.level]
              return (
                <button
                  key={lvl.level}
                  onClick={() => {
                    const topic = lvl.topics[0]
                    handleSelect(topic, lvl.level)
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeLevel === lvl.level
                      ? 'bg-cream-50 text-burgundy-800'
                      : 'bg-cream-50/20 text-cream-100 hover:bg-cream-50/30'
                  }`}
                >
                  {lvl.level}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Body: sidebar + content ── */}
        <div className="flex flex-1 min-h-0 overflow-hidden relative">

          {/* Mobile overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* ── Left Sidebar ── */}
          <aside className={`
            absolute lg:static inset-y-0 left-0 z-40 lg:z-auto
            w-72 lg:w-64 xl:w-72 shrink-0
            bg-white dark:bg-dark-warm-100
            border-r border-cream-200 dark:border-dark-warm-50
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex flex-col
          `}>
            <div className="px-4 py-3 border-b border-cream-100 dark:border-dark-warm-50 shrink-0">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">All Topics</p>
            </div>
            <Sidebar
              activeTopic={activeTopic}
              onSelect={handleSelect}
              onLevelChange={setActiveLevel}
            />
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0 overflow-hidden bg-white dark:bg-dark-warm-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTopic.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <TopicContent
                  topic={activeTopic}
                  level={activeLevel}
                  allTopics={allTopics}
                  onNavigate={(t) => {
                    const lvl = grammarLevels.find(l => l.topics.some(tp => tp.id === t.id))
                    handleSelect(t, lvl?.level || activeLevel)
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  )
}

export default Grammar
