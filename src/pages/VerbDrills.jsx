import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, CheckCircle, XCircle, RotateCcw, Zap, Trophy } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const VERBS = {
  être: {
    en: 'to be',
    tenses: {
      'Présent': { je: 'suis', tu: 'es', 'il/elle': 'est', nous: 'sommes', vous: 'êtes', 'ils/elles': 'sont' },
      'Passé composé': { je: 'ai été', tu: 'as été', 'il/elle': 'a été', nous: 'avons été', vous: 'avez été', 'ils/elles': 'ont été' },
      'Imparfait': { je: 'étais', tu: 'étais', 'il/elle': 'était', nous: 'étions', vous: 'étiez', 'ils/elles': 'étaient' },
      'Futur': { je: 'serai', tu: 'seras', 'il/elle': 'sera', nous: 'serons', vous: 'serez', 'ils/elles': 'seront' },
    }
  },
  avoir: {
    en: 'to have',
    tenses: {
      'Présent': { je: 'ai', tu: 'as', 'il/elle': 'a', nous: 'avons', vous: 'avez', 'ils/elles': 'ont' },
      'Passé composé': { je: 'ai eu', tu: 'as eu', 'il/elle': 'a eu', nous: 'avons eu', vous: 'avez eu', 'ils/elles': 'ont eu' },
      'Imparfait': { je: 'avais', tu: 'avais', 'il/elle': 'avait', nous: 'avions', vous: 'aviez', 'ils/elles': 'avaient' },
      'Futur': { je: 'aurai', tu: 'auras', 'il/elle': 'aura', nous: 'aurons', vous: 'aurez', 'ils/elles': 'auront' },
    }
  },
  aller: {
    en: 'to go',
    tenses: {
      'Présent': { je: 'vais', tu: 'vas', 'il/elle': 'va', nous: 'allons', vous: 'allez', 'ils/elles': 'vont' },
      'Passé composé': { je: 'suis allé(e)', tu: 'es allé(e)', 'il/elle': 'est allé(e)', nous: 'sommes allé(e)s', vous: 'êtes allé(e)s', 'ils/elles': 'sont allé(e)s' },
      'Imparfait': { je: 'allais', tu: 'allais', 'il/elle': 'allait', nous: 'allions', vous: 'alliez', 'ils/elles': 'allaient' },
      'Futur': { je: 'irai', tu: 'iras', 'il/elle': 'ira', nous: 'irons', vous: 'irez', 'ils/elles': 'iront' },
    }
  },
  faire: {
    en: 'to do / make',
    tenses: {
      'Présent': { je: 'fais', tu: 'fais', 'il/elle': 'fait', nous: 'faisons', vous: 'faites', 'ils/elles': 'font' },
      'Passé composé': { je: 'ai fait', tu: 'as fait', 'il/elle': 'a fait', nous: 'avons fait', vous: 'avez fait', 'ils/elles': 'ont fait' },
      'Imparfait': { je: 'faisais', tu: 'faisais', 'il/elle': 'faisait', nous: 'faisions', vous: 'faisiez', 'ils/elles': 'faisaient' },
      'Futur': { je: 'ferai', tu: 'feras', 'il/elle': 'fera', nous: 'ferons', vous: 'ferez', 'ils/elles': 'feront' },
    }
  },
  parler: {
    en: 'to speak',
    tenses: {
      'Présent': { je: 'parle', tu: 'parles', 'il/elle': 'parle', nous: 'parlons', vous: 'parlez', 'ils/elles': 'parlent' },
      'Passé composé': { je: 'ai parlé', tu: 'as parlé', 'il/elle': 'a parlé', nous: 'avons parlé', vous: 'avez parlé', 'ils/elles': 'ont parlé' },
      'Imparfait': { je: 'parlais', tu: 'parlais', 'il/elle': 'parlait', nous: 'parlions', vous: 'parliez', 'ils/elles': 'parlaient' },
      'Futur': { je: 'parlerai', tu: 'parleras', 'il/elle': 'parlera', nous: 'parlerons', vous: 'parlerez', 'ils/elles': 'parleront' },
    }
  },
  venir: {
    en: 'to come',
    tenses: {
      'Présent': { je: 'viens', tu: 'viens', 'il/elle': 'vient', nous: 'venons', vous: 'venez', 'ils/elles': 'viennent' },
      'Passé composé': { je: 'suis venu(e)', tu: 'es venu(e)', 'il/elle': 'est venu(e)', nous: 'sommes venu(e)s', vous: 'êtes venu(e)s', 'ils/elles': 'sont venu(e)s' },
      'Imparfait': { je: 'venais', tu: 'venais', 'il/elle': 'venait', nous: 'venions', vous: 'veniez', 'ils/elles': 'venaient' },
      'Futur': { je: 'viendrai', tu: 'viendras', 'il/elle': 'viendra', nous: 'viendrons', vous: 'viendrez', 'ils/elles': 'viendront' },
    }
  },
  pouvoir: {
    en: 'to be able to / can',
    tenses: {
      'Présent': { je: 'peux', tu: 'peux', 'il/elle': 'peut', nous: 'pouvons', vous: 'pouvez', 'ils/elles': 'peuvent' },
      'Passé composé': { je: 'ai pu', tu: 'as pu', 'il/elle': 'a pu', nous: 'avons pu', vous: 'avez pu', 'ils/elles': 'ont pu' },
      'Imparfait': { je: 'pouvais', tu: 'pouvais', 'il/elle': 'pouvait', nous: 'pouvions', vous: 'pouviez', 'ils/elles': 'pouvaient' },
      'Futur': { je: 'pourrai', tu: 'pourras', 'il/elle': 'pourra', nous: 'pourrons', vous: 'pourrez', 'ils/elles': 'pourront' },
    }
  },
  vouloir: {
    en: 'to want',
    tenses: {
      'Présent': { je: 'veux', tu: 'veux', 'il/elle': 'veut', nous: 'voulons', vous: 'voulez', 'ils/elles': 'veulent' },
      'Passé composé': { je: 'ai voulu', tu: 'as voulu', 'il/elle': 'a voulu', nous: 'avons voulu', vous: 'avez voulu', 'ils/elles': 'ont voulu' },
      'Imparfait': { je: 'voulais', tu: 'voulais', 'il/elle': 'voulait', nous: 'voulions', vous: 'vouliez', 'ils/elles': 'voulaient' },
      'Futur': { je: 'voudrai', tu: 'voudras', 'il/elle': 'voudra', nous: 'voudrons', vous: 'voudrez', 'ils/elles': 'voudront' },
    }
  },
}

const PRONOUNS = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles']
const TENSES = ['Présent', 'Passé composé', 'Imparfait', 'Futur']
const DRILL_DURATION = 60

function buildDeck(verbFilter, tenseFilter) {
  const deck = []
  const verbs = verbFilter === 'All' ? Object.keys(VERBS) : [verbFilter]
  const tenses = tenseFilter === 'All' ? TENSES : [tenseFilter]
  for (const verb of verbs) {
    for (const tense of tenses) {
      for (const pronoun of PRONOUNS) {
        deck.push({ verb, tense, pronoun, answer: VERBS[verb].tenses[tense][pronoun] })
      }
    }
  }
  return deck.sort(() => Math.random() - 0.5)
}

export default function VerbDrills() {
  const [mode, setMode] = useState('menu')
  const [verbFilter, setVerbFilter] = useState('All')
  const [tenseFilter, setTenseFilter] = useState('Présent')
  const [deck, setDeck] = useState([])
  const [cardIdx, setCardIdx] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef(null)
  const inputRef = useRef(null)

  const startDrill = () => {
    const d = buildDeck(verbFilter, tenseFilter)
    setDeck(d)
    setCardIdx(0)
    setInput('')
    setResult(null)
    setScore(0)
    setWrong(0)
    setTimeLeft(DRILL_DURATION)
    setFinished(false)
    setMode('timed')
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setFinished(true); return 0 }
        return t - 1
      })
    }, 1000)
    setTimeout(() => inputRef.current?.focus(), 200)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  const check = () => {
    if (!deck[cardIdx] || result || finished) return
    const norm = (s) => s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const ans = norm(deck[cardIdx].answer)
    const inp = norm(input)
    const isCorrect = inp === ans || deck[cardIdx].answer.toLowerCase().split('(')[0].trim() === input.trim().toLowerCase()
    setResult(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) setScore(s => s + 1)
    else setWrong(w => w + 1)
  }

  const next = () => {
    if (cardIdx + 1 >= deck.length) { setFinished(true); clearInterval(timerRef.current) }
    else { setCardIdx(i => i + 1); setInput(''); setResult(null); setTimeout(() => inputRef.current?.focus(), 50) }
  }

  useEffect(() => {
    if (finished && mode === 'timed') { clearInterval(timerRef.current); addXP(score * 5, 'grammar_quiz') }
  }, [finished])

  const card = deck[cardIdx]

  if (mode === 'menu') return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Verb Drills | SayBonjour!" description="Timed French verb conjugation drills for all levels." />
      <div className="max-w-xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50 mb-2">Verb Drills</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Les Exercices de Conjugaison — Timed practice</p>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6 text-left mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Verb</label>
          <select value={verbFilter} onChange={e => setVerbFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-dark-warm-50 rounded-lg bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50 mb-4">
            <option value="All">All verbs</option>
            {Object.entries(VERBS).map(([v, d]) => <option key={v} value={v}>{v} ({d.en})</option>)}
          </select>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tense</label>
          <select value={tenseFilter} onChange={e => setTenseFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-dark-warm-50 rounded-lg bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50">
            <option value="All">All tenses</option>
            {TENSES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <button onClick={startDrill} className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4">
          <Zap size={20} /> Start 60-second Drill
        </button>

        <div className="mt-6 grid grid-cols-2 gap-3 text-left text-sm">
          {Object.entries(VERBS).map(([v, d]) => (
            <div key={v} className="bg-white dark:bg-dark-warm-100 rounded-xl p-3 border border-gray-100 dark:border-dark-warm-50">
              <p className="font-bold text-burgundy-600">{v}</p>
              <p className="text-gray-500 dark:text-gray-400">{d.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Verb Drills | SayBonjour!" />
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => { setMode('menu'); clearInterval(timerRef.current) }} className="text-sm text-gray-500 hover:text-burgundy-600">← Back</button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-green-600 font-bold">✓ {score}</span>
            <span className="text-sm text-red-500 font-bold">✗ {wrong}</span>
            <span className={`flex items-center gap-1 font-bold text-sm ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
              <Timer size={15} /> {timeLeft}s
            </span>
          </div>
        </div>

        <AnimatePresence>
          {finished ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow p-8 text-center border border-gray-100 dark:border-dark-warm-50">
              <Trophy size={48} className="text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-cream-50 mb-2">Drill Complete!</h2>
              <p className="text-3xl font-bold text-burgundy-600 mb-1">{score} <span className="text-lg text-gray-500">correct</span></p>
              <p className="text-sm text-gray-500 mb-2">{wrong} incorrect · {score + wrong} attempted</p>
              <p className="text-sm text-green-600 mb-6">+{score * 5} XP earned</p>
              <div className="flex gap-3 justify-center">
                <button onClick={startDrill} className="btn-primary flex items-center gap-2"><RotateCcw size={16} /> Try Again</button>
                <button onClick={() => setMode('menu')} className="btn-secondary">Settings</button>
              </div>
            </motion.div>
          ) : card ? (
            <motion.div key={cardIdx} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow p-6 border border-gray-100 dark:border-dark-warm-50">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-400 mb-1">{card.tense}</p>
                <p className="text-4xl font-bold text-burgundy-600 mb-1">{card.verb}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">({VERBS[card.verb].en})</p>
                <span className="px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-lg font-semibold">{card.pronoun}</span>
              </div>
              <div className="mb-4">
                <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { if (result) next(); else check() } }}
                  placeholder="Type the conjugation…" disabled={!!result || finished}
                  className={`w-full px-4 py-3 text-center text-xl border-2 rounded-xl bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50 focus:outline-none ${result === 'correct' ? 'border-green-500' : result === 'wrong' ? 'border-red-400' : 'border-gray-200 dark:border-dark-warm-50 focus:border-burgundy-400'}`}
                />
              </div>
              {result && (
                <div className={`rounded-xl p-3 text-center mb-3 ${result === 'correct' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  {result === 'correct' ? (
                    <span className="text-green-700 dark:text-green-400 font-bold flex items-center justify-center gap-2"><CheckCircle size={16} /> Correct!</span>
                  ) : (
                    <span className="text-red-600 font-bold flex items-center justify-center gap-2"><XCircle size={16} /> {card.answer}</span>
                  )}
                </div>
              )}
              <div className="flex gap-3">
                {!result ? <button onClick={check} disabled={!input.trim()} className="btn-primary flex-1 disabled:opacity-50">Check</button>
                  : <button onClick={next} className="btn-primary flex-1">Next →</button>}
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">Press Enter to check / advance</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
