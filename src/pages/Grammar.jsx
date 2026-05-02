import React, { useState } from 'react'
import { BookOpen, ChevronRight, ChevronDown, CheckCircle, XCircle, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { grammarLevels } from '../data/grammarData'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'
import SpeakButton from '../components/SpeakButton'

const QuizSection = ({ quiz }) => {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleAnswer = (qi, ai) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qi]: ai }))
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.length) return
    setSubmitted(true)
    const score = quiz.filter((q, i) => answers[i] === q.answer).length
    addXP(score * 10, 'grammar_quiz')
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const score = submitted ? quiz.filter((q, i) => answers[i] === q.answer).length : 0

  return (
    <div className="mt-6 bg-cream-50 dark:bg-dark-warm-200 rounded-xl border border-cream-200 dark:border-dark-warm-50 p-5">
      <h4 className="font-bold text-burgundy-800 dark:text-cream-50 mb-4 flex items-center gap-2">
        <Award className="w-4 h-4" />
        Quick Check
      </h4>
      <div className="space-y-4">
        {quiz.map((q, qi) => (
          <div key={qi}>
            <p className="text-sm font-medium text-gray-800 dark:text-cream-100 mb-2">{qi + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, ai) => {
                const isSelected = answers[qi] === ai
                const isCorrect = q.answer === ai
                let cls = 'text-left px-3 py-2 rounded-lg text-sm border transition-all '
                if (!submitted) {
                  cls += isSelected
                    ? 'bg-burgundy-100 dark:bg-burgundy-900/40 border-burgundy-400 text-burgundy-800 dark:text-cream-50 font-medium'
                    : 'bg-white dark:bg-dark-warm-100 border-cream-300 dark:border-dark-warm-50 text-gray-700 dark:text-gray-300 hover:border-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20'
                } else {
                  if (isCorrect) cls += 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-800 dark:text-green-300 font-medium'
                  else if (isSelected && !isCorrect) cls += 'bg-red-100 dark:bg-red-900/30 border-red-400 text-red-700 dark:text-red-300'
                  else cls += 'bg-white dark:bg-dark-warm-100 border-cream-200 dark:border-dark-warm-50 text-gray-400 dark:text-gray-500'
                }
                return (
                  <button key={ai} onClick={() => handleAnswer(qi, ai)} className={cls}>
                    <span className="font-medium mr-1">{String.fromCharCode(65 + ai)}.</span> {opt}
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
          className="mt-4 px-5 py-2 bg-burgundy-600 text-cream-50 rounded-lg text-sm font-medium hover:bg-burgundy-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Answers
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            {score === quiz.length ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
            )}
            <span className={score === quiz.length ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {score}/{quiz.length} correct — +{score * 10} XP
            </span>
          </div>
          <button onClick={reset} className="text-sm text-burgundy-600 dark:text-burgundy-400 hover:underline">Try again</button>
        </div>
      )}
    </div>
  )
}

const TopicCard = ({ topic, isOpen, onToggle }) => {
  return (
    <div className="bg-white dark:bg-dark-warm-100 rounded-xl border border-cream-200 dark:border-dark-warm-50 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between p-5 text-left hover:bg-cream-50 dark:hover:bg-dark-warm-200 transition-colors"
      >
        <div className="flex-1 pr-4">
          <h3 className="font-bold text-burgundy-800 dark:text-cream-50 mb-1">{topic.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{topic.summary}</p>
        </div>
        <div className="text-burgundy-500 flex-shrink-0 mt-1">
          {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-5 border-t border-cream-100 dark:border-dark-warm-50">
              {topic.content?.map((section, si) => (
                <div key={si} className="mt-4">
                  <h4 className="font-semibold text-burgundy-700 dark:text-burgundy-400 text-sm mb-2">{section.heading}</h4>
                  {section.text && <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{section.text}</p>}
                  {section.list && (
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {section.list.map((item, li) => (
                        <li key={li} className="flex items-start gap-2">
                          <span className="text-burgundy-400 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.table && (
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-burgundy-600 text-cream-50">
                            {section.table.headers.map((h, hi) => (
                              <th key={hi} className="px-3 py-2 text-left font-medium text-xs">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? 'bg-cream-50 dark:bg-dark-warm-200' : 'bg-white dark:bg-dark-warm-100'}>
                              {row.map((cell, ci) => (
                                <td key={ci} className="px-3 py-2 text-gray-700 dark:text-gray-300 border-b border-cream-100 dark:border-dark-warm-50">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}

              {topic.examples?.length > 0 && (
                <div className="mt-5 bg-burgundy-50 dark:bg-burgundy-900/20 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-burgundy-600 dark:text-burgundy-400 uppercase tracking-wide mb-3">Examples</h4>
                  <div className="space-y-3">
                    {topic.examples.map((ex, ei) => (
                      <div key={ei} className="flex items-start gap-2">
                        <SpeakButton text={ex.french} size="sm" variant="ghost" className="shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="font-medium text-burgundy-800 dark:text-cream-100 text-sm">{ex.french}</span>
                          <span className="text-gray-600 dark:text-gray-400 text-xs">{ex.english}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {topic.quiz?.length > 0 && <QuizSection quiz={topic.quiz} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Grammar = () => {
  const [activeLevel, setActiveLevel] = useState('A1')
  const [openTopics, setOpenTopics] = useState({})

  const currentLevel = grammarLevels.find(l => l.level === activeLevel)

  const toggleTopic = (topicId) => {
    setOpenTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }))
  }

  return (
    <>
      <SEO
        title="French Grammar Guide A1–C2 | SayBonjour"
        description="Comprehensive French grammar lessons from beginner (A1) to mastery (C2). Articles, tenses, subjunctive, passive voice and more with examples and quizzes."
        keywords="french grammar, french grammar exercises, CEFR french, subjunctive french, passé composé, french articles"
        url="/grammar"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-warm-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-burgundy-800 to-burgundy-600 text-cream-50 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center bg-cream-50/20 text-cream-50 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Grammar System
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                French Grammar A1–C2
              </h1>
              <p className="text-cream-100 text-lg max-w-xl mx-auto">
                Structured grammar lessons from absolute beginner to near-native mastery. Every topic includes examples and a quick quiz.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CEFR Level Tabs */}
        <div className="bg-white dark:bg-dark-warm-100 border-b border-cream-200 dark:border-dark-warm-50 sticky top-16 z-30 shadow-sm">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex overflow-x-auto gap-1 py-2">
              {grammarLevels.map(lvl => (
                <button
                  key={lvl.level}
                  onClick={() => {
                    setActiveLevel(lvl.level)
                    setOpenTopics({})
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeLevel === lvl.level
                      ? 'bg-burgundy-600 text-cream-50 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-cream-100 dark:hover:bg-dark-warm-200 hover:text-burgundy-700 dark:hover:text-burgundy-400'
                  }`}
                >
                  {lvl.level}
                  <span className={`ml-1.5 text-xs font-normal ${activeLevel === lvl.level ? 'text-cream-200' : 'text-gray-400'}`}>
                    {lvl.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {currentLevel && (
            <motion.div
              key={activeLevel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Level intro */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white dark:bg-dark-warm-100 rounded-xl border border-cream-200 dark:border-dark-warm-50 p-4 flex-1 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-lg text-lg font-black border ${currentLevel.color}`}>
                      {currentLevel.level}
                    </span>
                    <div>
                      <div className="font-bold text-burgundy-800 dark:text-cream-50">{currentLevel.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{currentLevel.description}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-dark-warm-100 rounded-xl border border-cream-200 dark:border-dark-warm-50 p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-burgundy-700 dark:text-burgundy-400">{currentLevel.topics.length}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Topics</div>
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-3">
                {currentLevel.topics.map(topic => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isOpen={!!openTopics[topic.id]}
                    onToggle={() => toggleTopic(topic.id)}
                  />
                ))}
              </div>

              {/* Level nav footer */}
              <div className="mt-8 flex justify-between items-center">
                {grammarLevels.findIndex(l => l.level === activeLevel) > 0 && (
                  <button
                    onClick={() => setActiveLevel(grammarLevels[grammarLevels.findIndex(l => l.level === activeLevel) - 1].level)}
                    className="flex items-center gap-2 text-sm text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-300 font-medium"
                  >
                    ← Previous level
                  </button>
                )}
                <div className="flex-1" />
                {grammarLevels.findIndex(l => l.level === activeLevel) < grammarLevels.length - 1 && (
                  <button
                    onClick={() => setActiveLevel(grammarLevels[grammarLevels.findIndex(l => l.level === activeLevel) + 1].level)}
                    className="flex items-center gap-2 text-sm text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-300 font-medium"
                  >
                    Next level →
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default Grammar
