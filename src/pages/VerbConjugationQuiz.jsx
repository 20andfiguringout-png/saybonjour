import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, RotateCcw, Zap, Timer } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const VERBS = {
  être: { en: 'to be', présent: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], passé: ['ai été', 'as été', 'a été', 'avons été', 'avez été', 'ont été'], imparfait: ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'], futur: ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'] },
  avoir: { en: 'to have', présent: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], passé: ['ai eu', 'as eu', 'a eu', 'avons eu', 'avez eu', 'ont eu'], imparfait: ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'], futur: ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'] },
  aller: { en: 'to go', présent: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], passé: ['suis allé(e)', 'es allé(e)', 'est allé(e)', 'sommes allé(e)s', 'êtes allé(e)s', 'sont allé(e)s'], imparfait: ['allais', 'allais', 'allait', 'allions', 'alliez', 'allaient'], futur: ['irai', 'iras', 'ira', 'irons', 'irez', 'iront'] },
  faire: { en: 'to do / make', présent: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], passé: ['ai fait', 'as fait', 'a fait', 'avons fait', 'avez fait', 'ont fait'], imparfait: ['faisais', 'faisais', 'faisait', 'faisions', 'faisiez', 'faisaient'], futur: ['ferai', 'feras', 'fera', 'ferons', 'ferez', 'feront'] },
  pouvoir: { en: 'to be able to', présent: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], passé: ['ai pu', 'as pu', 'a pu', 'avons pu', 'avez pu', 'ont pu'], imparfait: ['pouvais', 'pouvais', 'pouvait', 'pouvions', 'pouviez', 'pouvaient'], futur: ['pourrai', 'pourras', 'pourra', 'pourrons', 'pourrez', 'pourront'] },
  vouloir: { en: 'to want', présent: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], passé: ['ai voulu', 'as voulu', 'a voulu', 'avons voulu', 'avez voulu', 'ont voulu'], imparfait: ['voulais', 'voulais', 'voulait', 'voulions', 'vouliez', 'voulaient'], futur: ['voudrai', 'voudras', 'voudra', 'voudrons', 'voudrez', 'voudront'] },
  prendre: { en: 'to take', présent: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], passé: ['ai pris', 'as pris', 'a pris', 'avons pris', 'avez pris', 'ont pris'], imparfait: ['prenais', 'prenais', 'prenait', 'prenions', 'preniez', 'prenaient'], futur: ['prendrai', 'prendras', 'prendra', 'prendrons', 'prendrez', 'prendront'] },
  venir: { en: 'to come', présent: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], passé: ['suis venu(e)', 'es venu(e)', 'est venu(e)', 'sommes venu(e)s', 'êtes venu(e)s', 'sont venu(e)s'], imparfait: ['venais', 'venais', 'venait', 'venions', 'veniez', 'venaient'], futur: ['viendrai', 'viendras', 'viendra', 'viendrons', 'viendrez', 'viendront'] },
  savoir: { en: 'to know', présent: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], passé: ['ai su', 'as su', 'a su', 'avons su', 'avez su', 'ont su'], imparfait: ['savais', 'savais', 'savait', 'savions', 'saviez', 'savaient'], futur: ['saurai', 'sauras', 'saura', 'saurons', 'saurez', 'sauront'] },
  dire: { en: 'to say / tell', présent: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], passé: ['ai dit', 'as dit', 'a dit', 'avons dit', 'avez dit', 'ont dit'], imparfait: ['disais', 'disais', 'disait', 'disions', 'disiez', 'disaient'], futur: ['dirai', 'diras', 'dira', 'dirons', 'direz', 'diront'] },
}

const PRONOUNS = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles']
const TENSES = ['présent', 'passé', 'imparfait', 'futur']
const TENSE_LABELS = { présent: 'Present', passé: 'Passé composé', imparfait: 'Imparfait', futur: 'Futur simple' }

function generateQuestions(count = 15) {
  const qs = []
  const verbNames = Object.keys(VERBS)
  for (let i = 0; i < count; i++) {
    const verb = verbNames[Math.floor(Math.random() * verbNames.length)]
    const tense = TENSES[Math.floor(Math.random() * TENSES.length)]
    const pronIdx = Math.floor(Math.random() * 6)
    const correct = VERBS[verb][tense][pronIdx]
    const distractors = verbNames
      .filter(v => v !== verb)
      .map(v => VERBS[v][tense][pronIdx])
      .filter(f => f !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    const options = [...distractors, correct].sort(() => Math.random() - 0.5)
    qs.push({ verb, tense, pronIdx, pronoun: PRONOUNS[pronIdx], correct, options })
  }
  return qs
}

export default function VerbConjugationQuiz() {
  const [questions, setQuestions] = useState(() => generateQuestions())
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [done, setDone] = useState(false)
  const [wrong, setWrong] = useState([])
  const [streak, setStreak] = useState(0)
  const [selectedTense, setSelectedTense] = useState('all')

  const current = questions[idx]

  const handleAnswer = useCallback((choice) => {
    if (feedback) return
    const correct = choice === current.correct
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); addXP(8, 'grammar') }
    else { setStreak(0); setWrong(w => [...w, current]) }
    setTimeout(() => {
      setFeedback(null)
      if (idx + 1 >= questions.length) setDone(true)
      else setIdx(i => i + 1)
    }, 900)
  }, [feedback, current, idx, questions.length])

  const restart = (retryWrong = false) => {
    const newQs = retryWrong ? wrong.map(q => ({ ...q, options: [...q.options].sort(() => Math.random() - 0.5) })) : generateQuestions()
    setQuestions(newQs)
    setIdx(0); setScore(0); setFeedback(null); setDone(false); setWrong([]); setStreak(0)
  }

  const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Verb Conjugation Quiz | SayBonjour!" description="Test your French verb conjugation across all tenses with instant feedback." />
      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Verb Conjugation Quiz</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Quiz de conjugaison — all tenses, instant feedback</p>
        </div>

        {!done ? (
          <>
            <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
              <span>{idx + 1} / {questions.length}</span>
              <span>Score: <strong className="text-burgundy-600">{score}</strong></span>
              {streak >= 3 && <span className="text-amber-500 font-medium flex items-center gap-1"><Zap size={13} />{streak} streak</span>}
            </div>
            <div className="w-full bg-gray-100 dark:bg-dark-warm-200 h-1.5 rounded-full mb-6">
              <div className="h-full bg-burgundy-500 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`bg-white dark:bg-dark-warm-100 rounded-2xl shadow border-2 p-8 mb-6 transition-colors
                  ${feedback === 'correct' ? 'border-emerald-400' : feedback === 'wrong' ? 'border-red-400' : 'border-gray-100 dark:border-dark-warm-50'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-burgundy-100 dark:bg-burgundy-vibrant-600/20 text-burgundy-700 dark:text-burgundy-vibrant-300 font-medium">{TENSE_LABELS[current.tense]}</span>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
                  Conjugate <strong className="text-burgundy-600">{current.verb}</strong> ({VERBS[current.verb].en})
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-cream-50 mb-2">
                  {current.pronoun} ___
                </p>
                {feedback && (
                  <div className={`flex items-center gap-2 text-sm font-medium ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {feedback === 'correct' ? <><CheckCircle2 size={15} /> {current.pronoun} {current.correct}</> : <><XCircle size={15} /> {current.pronoun} {current.correct}</>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-3">
              {current.options.map(opt => (
                <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!feedback}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-colors disabled:opacity-70
                    ${feedback && opt === current.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-700' :
                      feedback && opt !== current.correct ? 'bg-gray-50 dark:bg-dark-warm-200 border-gray-200 dark:border-dark-warm-50 text-gray-400' :
                      'bg-white dark:bg-dark-warm-100 border-gray-200 dark:border-dark-warm-50 text-gray-700 dark:text-gray-200 hover:border-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-vibrant-600/10'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-10 text-center">
            <div className="text-5xl mb-4">{accuracy >= 80 ? '🏆' : accuracy >= 60 ? '👍' : '📚'}</div>
            <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-cream-50 mb-2">Quiz complete!</h2>
            <p className="text-gray-500 mb-2">Score: <strong className="text-burgundy-600">{score}/{questions.length}</strong></p>
            <p className="text-gray-500 mb-6">Accuracy: <strong className="text-burgundy-600">{accuracy}%</strong></p>
            <div className="flex gap-3 justify-center flex-wrap">
              {wrong.length > 0 && (
                <button onClick={() => restart(true)}
                  className="px-5 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors">
                  Retry {wrong.length} missed
                </button>
              )}
              <button onClick={() => restart(false)}
                className="px-5 py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors flex items-center gap-2">
                <RotateCcw size={15} /> New quiz
              </button>
            </div>
          </motion.div>
        )}

        <div className="mt-8 bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Verb reference</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(VERBS).map(v => (
              <span key={v} className="px-2 py-1 bg-cream-50 dark:bg-dark-warm-200 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-100 dark:border-dark-warm-50">
                {v} <span className="text-gray-400">— {VERBS[v].en}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
