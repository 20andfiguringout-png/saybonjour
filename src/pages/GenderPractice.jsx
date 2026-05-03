import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, RotateCcw, TrendingUp, Zap } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const WORDS = [
  { fr: 'chat', en: 'cat', gender: 'M' },
  { fr: 'chien', en: 'dog', gender: 'M' },
  { fr: 'maison', en: 'house', gender: 'F' },
  { fr: 'livre', en: 'book', gender: 'M' },
  { fr: 'table', en: 'table', gender: 'F' },
  { fr: 'voiture', en: 'car', gender: 'F' },
  { fr: 'soleil', en: 'sun', gender: 'M' },
  { fr: 'lune', en: 'moon', gender: 'F' },
  { fr: 'arbre', en: 'tree', gender: 'M' },
  { fr: 'fleur', en: 'flower', gender: 'F' },
  { fr: 'jardin', en: 'garden', gender: 'M' },
  { fr: 'fenêtre', en: 'window', gender: 'F' },
  { fr: 'porte', en: 'door', gender: 'F' },
  { fr: 'stylo', en: 'pen', gender: 'M' },
  { fr: 'crayon', en: 'pencil', gender: 'M' },
  { fr: 'eau', en: 'water', gender: 'F' },
  { fr: 'pain', en: 'bread', gender: 'M' },
  { fr: 'fromage', en: 'cheese', gender: 'M' },
  { fr: 'pomme', en: 'apple', gender: 'F' },
  { fr: 'orange', en: 'orange (fruit)', gender: 'F' },
  { fr: 'beurre', en: 'butter', gender: 'M' },
  { fr: 'café', en: 'coffee', gender: 'M' },
  { fr: 'fille', en: 'girl / daughter', gender: 'F' },
  { fr: 'garçon', en: 'boy', gender: 'M' },
  { fr: 'femme', en: 'woman / wife', gender: 'F' },
  { fr: 'homme', en: 'man', gender: 'M' },
  { fr: 'enfant', en: 'child', gender: 'M' },
  { fr: 'école', en: 'school', gender: 'F' },
  { fr: 'ville', en: 'city', gender: 'F' },
  { fr: 'pays', en: 'country', gender: 'M' },
  { fr: 'mer', en: 'sea', gender: 'F' },
  { fr: 'montagne', en: 'mountain', gender: 'F' },
  { fr: 'rivière', en: 'river', gender: 'F' },
  { fr: 'pont', en: 'bridge', gender: 'M' },
  { fr: 'rue', en: 'street', gender: 'F' },
  { fr: 'couleur', en: 'colour', gender: 'F' },
  { fr: 'musique', en: 'music', gender: 'F' },
  { fr: 'film', en: 'film / movie', gender: 'M' },
  { fr: 'chanson', en: 'song', gender: 'F' },
  { fr: 'histoire', en: 'story / history', gender: 'F' },
]

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const ARTICLES = {
  M: { def: 'le', indef: 'un' },
  F: { def: 'la', indef: 'une' },
}

export default function GenderPractice() {
  const [queue, setQueue] = useState(() => shuffle(WORDS))
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [wrong, setWrong] = useState([])
  const [mode, setMode] = useState('le-la')
  const [done, setDone] = useState(false)

  const current = queue[idx]

  const handleAnswer = useCallback((chosen) => {
    if (feedback) return
    const correct = chosen === current.gender
    setTotal(t => t + 1)
    if (correct) {
      setScore(s => s + 1)
      setStreak(s => s + 1)
      setFeedback('correct')
      addXP(5, 'grammar')
    } else {
      setStreak(0)
      setFeedback('wrong')
      setWrong(w => [...w, current])
    }
    setTimeout(() => {
      setFeedback(null)
      if (idx + 1 >= queue.length) {
        setDone(true)
      } else {
        setIdx(i => i + 1)
      }
    }, 900)
  }, [feedback, current, idx, queue.length])

  const restart = () => {
    setQueue(shuffle(WORDS))
    setIdx(0)
    setScore(0)
    setStreak(0)
    setTotal(0)
    setFeedback(null)
    setWrong([])
    setDone(false)
  }

  const retryWrong = () => {
    if (wrong.length === 0) return restart()
    setQueue(shuffle(wrong))
    setIdx(0)
    setFeedback(null)
    setWrong([])
    setDone(false)
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'm' || e.key === 'M') handleAnswer('M')
      if (e.key === 'f' || e.key === 'F') handleAnswer('F')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleAnswer])

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Gender Practice | SayBonjour!" description="Practice French noun genders — le or la? Train with le/la/un/une for 40+ nouns." />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Gender Practice</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le genre des noms — masculin ou féminin ?</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex gap-2">
            {['le-la', 'un-une'].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${mode === m ? 'bg-burgundy-600 text-white border-burgundy-600' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-dark-warm-50'}`}>
                {m === 'le-la' ? 'le / la' : 'un / une'}
              </button>
            ))}
          </div>
          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Score: <strong className="text-burgundy-600">{score}/{total}</strong></span>
            <span>Accuracy: <strong className="text-emerald-600">{accuracy}%</strong></span>
            {streak >= 3 && <span className="text-amber-500 font-medium flex items-center gap-1"><Zap size={13} />{streak} streak!</span>}
          </div>
        </div>

        {!done ? (
          <div className="relative">
            <div className="text-xs text-gray-400 text-center mb-2">{idx + 1} / {queue.length}</div>
            <div className="w-full bg-gray-100 dark:bg-dark-warm-200 h-1.5 rounded-full mb-6">
              <div className="h-full bg-burgundy-500 rounded-full transition-all" style={{ width: `${((idx) / queue.length) * 100}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={current.fr}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className={`bg-white dark:bg-dark-warm-100 rounded-2xl shadow border-2 p-10 text-center transition-colors mb-8
                  ${feedback === 'correct' ? 'border-emerald-400' : feedback === 'wrong' ? 'border-red-400' : 'border-gray-100 dark:border-dark-warm-50'}`}>
                <div className="text-5xl font-bold font-playfair text-burgundy-600 mb-3">{current.fr}</div>
                <div className="text-gray-400 dark:text-gray-500 text-sm">{current.en}</div>
                {feedback && (
                  <div className={`mt-4 flex items-center justify-center gap-2 text-sm font-medium ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {feedback === 'correct'
                      ? <><CheckCircle2 size={16} /> {ARTICLES[current.gender][mode === 'le-la' ? 'def' : 'indef']} {current.fr}</>
                      : <><XCircle size={16} /> It's {ARTICLES[current.gender][mode === 'le-la' ? 'def' : 'indef']} {current.fr}</>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4">
              {mode === 'le-la' ? (
                <>
                  <button onClick={() => handleAnswer('M')} disabled={!!feedback}
                    className="py-5 rounded-2xl text-2xl font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors disabled:opacity-50">
                    le <span className="text-xs font-normal text-blue-500">(masculine) [M]</span>
                  </button>
                  <button onClick={() => handleAnswer('F')} disabled={!!feedback}
                    className="py-5 rounded-2xl text-2xl font-bold bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-2 border-pink-200 dark:border-pink-700 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors disabled:opacity-50">
                    la <span className="text-xs font-normal text-pink-500">(feminine) [F]</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleAnswer('M')} disabled={!!feedback}
                    className="py-5 rounded-2xl text-2xl font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors disabled:opacity-50">
                    un <span className="text-xs font-normal text-blue-500">(masculine) [M]</span>
                  </button>
                  <button onClick={() => handleAnswer('F')} disabled={!!feedback}
                    className="py-5 rounded-2xl text-2xl font-bold bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-2 border-pink-200 dark:border-pink-700 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors disabled:opacity-50">
                    une <span className="text-xs font-normal text-pink-500">(feminine) [F]</span>
                  </button>
                </>
              )}
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">Press M or F on your keyboard</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-10 text-center">
            <TrendingUp size={48} className="mx-auto mb-4 text-burgundy-600" />
            <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-cream-50 mb-2">Round Complete!</h2>
            <p className="text-gray-500 mb-6">You scored <strong className="text-burgundy-600">{score}</strong> out of <strong>{queue.length}</strong> ({accuracy}%)</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {wrong.length > 0 && (
                <button onClick={retryWrong}
                  className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors">
                  Retry {wrong.length} wrong
                </button>
              )}
              <button onClick={restart}
                className="px-6 py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors flex items-center gap-2">
                <RotateCcw size={16} /> Play again
              </button>
            </div>
            {wrong.length > 0 && (
              <div className="mt-8 text-left">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Words to review:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {wrong.map(w => (
                    <div key={w.fr} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-warm-200 rounded-lg px-3 py-2">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${w.gender === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>{w.gender === 'M' ? 'le' : 'la'}</span>
                      <span className="font-medium text-gray-800 dark:text-cream-50">{w.fr}</span>
                      <span className="text-gray-400">— {w.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
