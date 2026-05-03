import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, RotateCcw, Zap } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const EMOJI_VOCAB = [
  { emoji: '🐱', fr: 'le chat', en: 'cat', options: ['le chat', 'le chien', 'le lapin', 'le cochon'] },
  { emoji: '🐶', fr: 'le chien', en: 'dog', options: ['le chat', 'le chien', 'le cheval', 'la vache'] },
  { emoji: '🐴', fr: 'le cheval', en: 'horse', options: ['le mouton', 'le cheval', 'la vache', 'le cochon'] },
  { emoji: '🐄', fr: 'la vache', en: 'cow', options: ['la vache', 'le cheval', 'le mouton', 'la chèvre'] },
  { emoji: '🐑', fr: 'le mouton', en: 'sheep', options: ['la chèvre', 'le cochon', 'le mouton', 'le lapin'] },
  { emoji: '🐷', fr: 'le cochon', en: 'pig', options: ['le canard', 'le cochon', 'la poule', 'le lapin'] },
  { emoji: '🐰', fr: 'le lapin', en: 'rabbit', options: ['le lapin', 'le hamster', 'le chat', 'le rat'] },
  { emoji: '🦊', fr: 'le renard', en: 'fox', options: ['le loup', 'le renard', 'l\'ours', 'le cerf'] },
  { emoji: '🐻', fr: 'l\'ours', en: 'bear', options: ['le loup', 'le renard', 'l\'ours', 'le tigre'] },
  { emoji: '🦁', fr: 'le lion', en: 'lion', options: ['le tigre', 'le lion', 'le léopard', 'l\'éléphant'] },
  { emoji: '🐘', fr: 'l\'éléphant', en: 'elephant', options: ['le rhinocéros', 'la girafe', 'l\'éléphant', 'le zèbre'] },
  { emoji: '🦒', fr: 'la girafe', en: 'giraffe', options: ['la girafe', 'le zèbre', 'l\'éléphant', 'le chameau'] },
  { emoji: '🍎', fr: 'la pomme', en: 'apple', options: ['la poire', 'la pomme', 'la cerise', 'la pêche'] },
  { emoji: '🍊', fr: 'l\'orange', en: 'orange', options: ['le citron', 'l\'orange', 'la mandarine', 'le pamplemousse'] },
  { emoji: '🍋', fr: 'le citron', en: 'lemon', options: ['l\'orange', 'la lime', 'le citron', 'le pamplemousse'] },
  { emoji: '🍇', fr: 'le raisin', en: 'grapes', options: ['la fraise', 'le raisin', 'la myrtille', 'la cerise'] },
  { emoji: '🍓', fr: 'la fraise', en: 'strawberry', options: ['la framboise', 'la fraise', 'la cerise', 'la myrtille'] },
  { emoji: '🍌', fr: 'la banane', en: 'banana', options: ['la mangue', 'la papaye', 'la banane', 'l\'ananas'] },
  { emoji: '🥕', fr: 'la carotte', en: 'carrot', options: ['le radis', 'la carotte', 'le navet', 'la betterave'] },
  { emoji: '🥦', fr: 'le brocoli', en: 'broccoli', options: ['le chou-fleur', 'le brocoli', 'le chou', 'les épinards'] },
  { emoji: '🌽', fr: 'le maïs', en: 'corn', options: ['le blé', 'le maïs', 'le seigle', 'l\'avoine'] },
  { emoji: '🍅', fr: 'la tomate', en: 'tomato', options: ['la tomate', 'le poivron', 'le concombre', 'l\'aubergine'] },
  { emoji: '🏠', fr: 'la maison', en: 'house', options: ['l\'appartement', 'la maison', 'le chalet', 'la villa'] },
  { emoji: '🚗', fr: 'la voiture', en: 'car', options: ['le camion', 'la voiture', 'le bus', 'la moto'] },
  { emoji: '✈️', fr: 'l\'avion', en: 'aeroplane', options: ['le bateau', 'le train', 'l\'avion', 'l\'hélicoptère'] },
  { emoji: '🚂', fr: 'le train', en: 'train', options: ['le tram', 'le métro', 'le train', 'le bus'] },
  { emoji: '📚', fr: 'les livres', en: 'books', options: ['les livres', 'les cahiers', 'les magazines', 'les journaux'] },
  { emoji: '⏰', fr: 'le réveil', en: 'alarm clock', options: ['la montre', 'le réveil', 'l\'horloge', 'le chronomètre'] },
  { emoji: '☀️', fr: 'le soleil', en: 'sun', options: ['le soleil', 'la lune', 'les étoiles', 'les nuages'] },
  { emoji: '🌙', fr: 'la lune', en: 'moon', options: ['le soleil', 'la lune', 'les étoiles', 'la planète'] },
]

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const MODES = [
  { id: 'mcq', label: 'Multiple Choice' },
  { id: 'type', label: 'Type the Answer' },
]

export default function PictureVocabulary() {
  const [queue, setQueue] = useState(() => shuffle(EMOJI_VOCAB))
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [typed, setTyped] = useState('')
  const [mode, setMode] = useState('mcq')
  const [done, setDone] = useState(false)
  const [wrong, setWrong] = useState([])

  const current = queue[idx]
  const shuffledOptions = current ? shuffle(current.options) : []

  const advance = useCallback(() => {
    setTimeout(() => {
      setFeedback(null)
      setTyped('')
      if (idx + 1 >= queue.length) setDone(true)
      else setIdx(i => i + 1)
    }, 1000)
  }, [idx, queue.length])

  const handleMCQ = (chosen) => {
    if (feedback) return
    const correct = chosen === current.fr
    setTotal(t => t + 1)
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); addXP(5, 'vocabulary') }
    else { setStreak(0); setWrong(w => [...w, current]) }
    advance()
  }

  const handleType = (e) => {
    e.preventDefault()
    if (feedback) return
    const answer = typed.trim().toLowerCase()
    const correct = answer === current.fr.toLowerCase() || answer === current.fr.replace(/^(le|la|l'|les)\s/i, '').toLowerCase()
    setTotal(t => t + 1)
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); addXP(5, 'vocabulary') }
    else { setStreak(0); setWrong(w => [...w, current]) }
    advance()
  }

  const restart = () => {
    setQueue(shuffle(EMOJI_VOCAB))
    setIdx(0); setScore(0); setStreak(0); setTotal(0)
    setFeedback(null); setTyped(''); setWrong([]); setDone(false)
  }

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Picture Vocabulary | SayBonjour!" description="Match pictures to French words — animals, food, transport and more!" />
      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Picture Vocabulary</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Vocabulaire illustré — what does the picture show?</p>
        </div>

        <div className="flex gap-3 justify-between items-center mb-6">
          <div className="flex gap-2">
            {MODES.map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); restart() }}
                className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-colors ${mode === m.id ? 'bg-burgundy-600 text-white border-burgundy-600' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-dark-warm-50'}`}>
                {m.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3 text-sm text-gray-500">
            <span>Score: <strong className="text-burgundy-600">{score}</strong></span>
            {streak >= 3 && <span className="text-amber-500 font-medium flex items-center gap-1"><Zap size={12} />{streak}</span>}
          </div>
        </div>

        {!done ? (
          <>
            <div className="text-xs text-gray-400 text-center mb-1">{idx + 1} / {queue.length}</div>
            <div className="w-full bg-gray-100 dark:bg-dark-warm-200 h-1.5 rounded-full mb-6">
              <div className="h-full bg-burgundy-500 rounded-full transition-all" style={{ width: `${(idx / queue.length) * 100}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={current.fr}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white dark:bg-dark-warm-100 rounded-2xl shadow border-2 p-8 text-center mb-6 transition-colors
                  ${feedback === 'correct' ? 'border-emerald-400' : feedback === 'wrong' ? 'border-red-400' : 'border-gray-100 dark:border-dark-warm-50'}`}>
                <div className="text-8xl mb-4 leading-none">{current.emoji}</div>
                {feedback && (
                  <div className={`text-sm font-medium flex items-center justify-center gap-2 mt-2 ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {feedback === 'correct' ? <><CheckCircle2 size={16} /> Correct! {current.fr}</> : <><XCircle size={16} /> {current.fr} ({current.en})</>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {mode === 'mcq' ? (
              <div className="grid grid-cols-2 gap-3">
                {shuffledOptions.map(opt => (
                  <button key={opt} onClick={() => handleMCQ(opt)} disabled={!!feedback}
                    className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-colors disabled:opacity-70
                      ${feedback && opt === current.fr ? 'bg-emerald-50 border-emerald-400 text-emerald-700' :
                        feedback && opt !== current.fr ? 'bg-gray-50 dark:bg-dark-warm-200 border-gray-200 dark:border-dark-warm-50 text-gray-400' :
                        'bg-white dark:bg-dark-warm-100 border-gray-200 dark:border-dark-warm-50 text-gray-700 dark:text-gray-200 hover:border-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-vibrant-600/10'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleType} className="space-y-3">
                <input
                  value={typed} onChange={e => setTyped(e.target.value)} disabled={!!feedback}
                  placeholder="Type the French word (with article)..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-dark-warm-50 bg-white dark:bg-dark-warm-100 text-gray-800 dark:text-cream-50 focus:outline-none focus:border-burgundy-400 text-sm"
                  autoFocus
                />
                <button type="submit" disabled={!typed || !!feedback}
                  className="w-full py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors disabled:opacity-50">
                  Check answer
                </button>
              </form>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-cream-50 mb-2">Round complete!</h2>
            <p className="text-gray-500 mb-6">Score: <strong className="text-burgundy-600">{score}/{queue.length}</strong> — {accuracy}% accuracy</p>
            <div className="flex gap-3 justify-center">
              {wrong.length > 0 && (
                <button onClick={() => { setQueue(shuffle(wrong)); setIdx(0); setScore(0); setStreak(0); setTotal(0); setFeedback(null); setTyped(''); setWrong([]); setDone(false) }}
                  className="px-5 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors">
                  Retry {wrong.length} missed
                </button>
              )}
              <button onClick={restart}
                className="px-5 py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors flex items-center gap-2">
                <RotateCcw size={15} /> Play again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
