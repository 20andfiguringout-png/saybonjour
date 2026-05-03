import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const FALSE_FRIENDS = [
  {
    fr: 'actuellement',
    looks_like: 'actually',
    fr_means: 'currently / at present',
    not: 'actually (= en fait / en réalité)',
    example_wrong: '❌ Actuellement, je pense que c\'est faux.',
    example_right: '✓ Actuellement, je travaille à Lyon. (Currently, I work in Lyon.)',
    tip: 'Use "en fait" or "en réalité" for "actually".',
    level: 'A2',
  },
  {
    fr: 'éventuellement',
    looks_like: 'eventually',
    fr_means: 'possibly / perhaps / if need be',
    not: 'eventually (= finalement / à la longue)',
    example_wrong: '❌ Éventuellement, il est arrivé.',
    example_right: '✓ Éventuellement, je pourrais venir. (I could possibly come.)',
    tip: 'Use "finalement" or "à la longue" for "eventually".',
    level: 'B1',
  },
  {
    fr: 'sensible',
    looks_like: 'sensible',
    fr_means: 'sensitive / emotionally tender',
    not: 'sensible (= raisonnable / sensé)',
    example_wrong: '❌ C\'est une personne très sensible — elle prend de bonnes décisions.',
    example_right: '✓ Elle est très sensible — elle pleure facilement. (She\'s very sensitive — she cries easily.)',
    tip: 'A sensible person in English = une personne raisonnable / sensée.',
    level: 'A2',
  },
  {
    fr: 'sympathique',
    looks_like: 'sympathetic',
    fr_means: 'nice / pleasant / friendly',
    not: 'sympathetic (= compatissant / compréhensif)',
    example_wrong: '❌ Il était très sympathique quand j\'ai perdu mon travail.',
    example_right: '✓ Le serveur était très sympathique. (The waiter was very nice.)',
    tip: '"Sympathique" (sympa) means nice. "Compatissant" means sympathetic.',
    level: 'A2',
  },
  {
    fr: 'assister à',
    looks_like: 'to assist',
    fr_means: 'to attend (an event)',
    not: 'to assist (= aider / assister quelqu\'un)',
    example_wrong: '❌ J\'ai assisté mon ami — j\'étais là pour l\'aider.',
    example_right: '✓ J\'ai assisté à la réunion. (I attended the meeting.)',
    tip: '"Assister à" = to attend. "Aider" = to help.',
    level: 'B1',
  },
  {
    fr: 'location',
    looks_like: 'location',
    fr_means: 'rental / hire',
    not: 'location (= emplacement / lieu)',
    example_wrong: '❌ La location de la réunion est parfaite.',
    example_right: '✓ La location d\'une voiture coûte 50 euros par jour. (Renting a car costs €50 a day.)',
    tip: '"Emplacement" or "lieu" = location. "Location" = rental.',
    level: 'A2',
  },
  {
    fr: 'rester',
    looks_like: 'to rest',
    fr_means: 'to stay / to remain',
    not: 'to rest (= se reposer)',
    example_wrong: '❌ Je dois rester — je suis fatigué.',
    example_right: '✓ Je reste à Paris jusqu\'à vendredi. (I\'m staying in Paris until Friday.)',
    tip: '"Se reposer" = to rest. "Rester" = to stay.',
    level: 'A1',
  },
  {
    fr: 'passer un examen',
    looks_like: 'to pass an exam',
    fr_means: 'to take / sit an exam',
    not: 'to pass an exam (= réussir un examen)',
    example_wrong: '❌ J\'ai passé l\'examen avec mention.',
    example_right: '✓ J\'ai passé l\'examen hier. / J\'ai réussi l\'examen ! (I took the exam. / I passed!)',
    tip: '"Passer" = to take/sit. "Réussir" = to pass.',
    level: 'A2',
  },
  {
    fr: 'chair',
    looks_like: 'chair',
    fr_means: 'flesh / skin',
    not: 'chair (= chaise)',
    example_wrong: '❌ Mets-toi sur la chair.',
    example_right: '✓ La chair de poule. (Goose bumps — lit. chicken flesh.)',
    tip: '"Chaise" = chair. "Chair" = flesh.',
    level: 'A1',
  },
  {
    fr: 'demander',
    looks_like: 'to demand',
    fr_means: 'to ask / to request',
    not: 'to demand (= exiger)',
    example_wrong: '❌ Il a demandé d\'être payé immédiatement — quelle arrogance !',
    example_right: '✓ Elle m\'a demandé mon avis. (She asked my opinion.)',
    tip: '"Exiger" = to demand. "Demander" = to ask.',
    level: 'A1',
  },
  {
    fr: 'formidable',
    looks_like: 'formidable',
    fr_means: 'wonderful / great / fantastic',
    not: 'formidable (= intimidant / redoutable)',
    example_wrong: '❌ Le général était formidable — ses soldats le craignaient.',
    example_right: '✓ C\'était une soirée formidable ! (It was a wonderful evening!)',
    tip: 'In English, formidable is negative/intimidating. In French, it\'s very positive.',
    level: 'A2',
  },
  {
    fr: 'blesser',
    looks_like: 'to bless',
    fr_means: 'to hurt / to wound',
    not: 'to bless (= bénir)',
    example_wrong: '❌ Le prêtre l\'a blessé pendant la cérémonie.',
    example_right: '✓ Il s\'est blessé à la jambe. (He hurt his leg.)',
    tip: '"Bénir" = to bless. "Blesser" = to hurt/wound.',
    level: 'A2',
  },
  {
    fr: 'prétendre',
    looks_like: 'to pretend',
    fr_means: 'to claim / to maintain',
    not: 'to pretend (= faire semblant de)',
    example_wrong: '❌ Il prétend dormir.',
    example_right: '✓ Il prétend être médecin. (He claims to be a doctor.)',
    tip: '"Faire semblant de" = to pretend. "Prétendre" = to claim.',
    level: 'B1',
  },
  {
    fr: 'monnaie',
    looks_like: 'money',
    fr_means: 'change / coins / currency',
    not: 'money (= argent)',
    example_wrong: '❌ Je n\'ai pas de monnaie — je suis pauvre.',
    example_right: '✓ Avez-vous de la monnaie ? (Do you have any change/coins?)',
    tip: '"Argent" = money. "Monnaie" = change/coins or currency.',
    level: 'A2',
  },
]

const LEVELS = ['All', 'A1', 'A2', 'B1']

export default function FalseFriendsDeep() {
  const [level, setLevel] = useState('All')
  const [quizMode, setQuizMode] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [quizDone, setQuizDone] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const filtered = FALSE_FRIENDS.filter(f => level === 'All' || f.level === level)
  const quizQuestions = FALSE_FRIENDS.map(f => ({
    ...f,
    options: [f.fr_means, ...FALSE_FRIENDS.filter(o => o.fr !== f.fr)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(o => o.fr_means)
    ].sort(() => Math.random() - 0.5),
  }))

  const handleAnswer = useCallback((choice) => {
    if (feedback) return
    const correct = choice === quizQuestions[quizIdx].fr_means
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) { setScore(s => s + 1); addXP(8, 'vocabulary') }
    setTimeout(() => {
      setFeedback(null)
      if (quizIdx + 1 >= quizQuestions.length) setQuizDone(true)
      else setQuizIdx(i => i + 1)
    }, 900)
  }, [feedback, quizIdx, quizQuestions])

  const resetQuiz = () => { setQuizIdx(0); setScore(0); setFeedback(null); setQuizDone(false) }

  const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700' }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="False Friends (Faux Amis) | SayBonjour!" description="Master French false friends — words that look like English but mean something completely different." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">False Friends (Faux Amis)</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les mots trompeurs — words that look English but aren't!</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${level === l ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={() => { setQuizMode(q => !q); resetQuiz() }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${quizMode ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 border border-gray-200 dark:border-dark-warm-50 text-gray-600 dark:text-gray-300 hover:border-burgundy-300'}`}>
            {quizMode ? '← Back to guide' : '🧠 Quiz mode'}
          </button>
        </div>

        {!quizMode ? (
          <div className="space-y-3">
            {filtered.map((ff, i) => {
              const isOpen = expanded === ff.fr
              return (
                <motion.div key={ff.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                  <button onClick={() => setExpanded(isOpen ? null : ff.fr)}
                    className="w-full text-left px-5 py-4 flex items-start gap-3">
                    <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[ff.level]}`}>{ff.level}</span>
                        <span className="font-bold text-gray-900 dark:text-cream-50">{ff.fr}</span>
                        <SpeakButton text={ff.fr} size="sm" />
                        <span className="text-xs text-gray-400">≠ {ff.looks_like}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Actually means: <strong className="text-emerald-600">{ff.fr_means}</strong></p>
                    </div>
                    {isOpen ? <ChevronUp size={14} className="text-gray-400 shrink-0 mt-1" /> : <ChevronDown size={14} className="text-gray-400 shrink-0 mt-1" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 border-t border-gray-50 dark:border-dark-warm-200 pt-3 space-y-2">
                          <p className="text-sm text-red-600 dark:text-red-400">{ff.example_wrong}</p>
                          <p className="text-sm text-emerald-700 dark:text-emerald-400">{ff.example_right}</p>
                          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-lg px-3 py-2">
                            <p className="text-xs text-amber-800 dark:text-amber-300">💡 {ff.tip}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        ) : !quizDone ? (
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>{quizIdx + 1} / {quizQuestions.length}</span>
              <span>Score: <strong className="text-burgundy-600">{score}</strong></span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-dark-warm-200 h-1.5 rounded-full mb-6">
              <div className="h-full bg-burgundy-500 rounded-full transition-all" style={{ width: `${(quizIdx / quizQuestions.length) * 100}%` }} />
            </div>
            <motion.div key={quizIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border-2 border-gray-100 dark:border-dark-warm-50 p-8 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-3xl font-bold font-playfair text-burgundy-600">{quizQuestions[quizIdx].fr}</p>
                <SpeakButton text={quizQuestions[quizIdx].fr} size="sm" />
              </div>
              <p className="text-gray-500 text-sm">What does this French word actually mean?</p>
              <p className="text-xs text-amber-600 mt-1">(It looks like "{quizQuestions[quizIdx].looks_like}" but isn't!)</p>
            </motion.div>
            <div className="grid grid-cols-2 gap-3">
              {quizQuestions[quizIdx].options.map(opt => (
                <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!feedback}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-colors text-left
                    ${feedback && opt === quizQuestions[quizIdx].fr_means ? 'bg-emerald-50 border-emerald-400 text-emerald-700' :
                      !feedback ? 'bg-white dark:bg-dark-warm-100 border-gray-200 dark:border-dark-warm-50 text-gray-700 dark:text-gray-200 hover:border-burgundy-300' :
                      'bg-gray-50 dark:bg-dark-warm-200 border-gray-200 dark:border-dark-warm-50 text-gray-400'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-10 text-center">
            <div className="text-5xl mb-4">{score >= 10 ? '🏆' : '📚'}</div>
            <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-cream-50 mb-2">Quiz done!</h2>
            <p className="text-gray-500 mb-6">Score: <strong className="text-burgundy-600">{score}/{quizQuestions.length}</strong></p>
            <button onClick={resetQuiz} className="px-6 py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors flex items-center gap-2 mx-auto">
              <RotateCcw size={15} /> Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
