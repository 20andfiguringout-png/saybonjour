import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Volume2, CheckCircle2, XCircle, RotateCcw, Headphones } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const EXERCISES = [
  {
    id: 1,
    level: 'A1',
    type: 'mcq',
    text: 'Bonjour ! Je m\'appelle Sophie. J\'ai vingt-trois ans et j\'habite à Lyon.',
    question: 'How old is Sophie?',
    options: ['20', '21', '23', '25'],
    answer: '23',
    transcript: 'Hello! My name is Sophie. I am twenty-three years old and I live in Lyon.',
  },
  {
    id: 2,
    level: 'A1',
    type: 'mcq',
    text: 'Le café coûte deux euros cinquante. La baguette coûte un euro vingt.',
    question: 'How much does the coffee cost?',
    options: ['€1.20', '€1.50', '€2.50', '€3.00'],
    answer: '€2.50',
    transcript: 'The coffee costs two euros fifty. The baguette costs one euro twenty.',
  },
  {
    id: 3,
    level: 'A2',
    type: 'mcq',
    text: 'Demain, je vais prendre le train à neuf heures et demie pour aller à Paris. Le voyage dure environ deux heures.',
    question: 'What time does the train leave?',
    options: ['9:00', '9:15', '9:30', '9:45'],
    answer: '9:30',
    transcript: 'Tomorrow, I will take the train at nine thirty to go to Paris. The journey lasts about two hours.',
  },
  {
    id: 4,
    level: 'A2',
    type: 'mcq',
    text: 'Aujourd\'hui il fait très chaud — trente-deux degrés. N\'oubliez pas de boire beaucoup d\'eau et de mettre de la crème solaire.',
    question: 'What is the temperature today?',
    options: ['22°C', '28°C', '32°C', '38°C'],
    answer: '32°C',
    transcript: 'Today it is very hot — thirty-two degrees. Don\'t forget to drink plenty of water and apply sun cream.',
  },
  {
    id: 5,
    level: 'B1',
    type: 'mcq',
    text: 'Le musée est ouvert du mardi au dimanche, de dix heures à dix-huit heures. Il est fermé le lundi. L\'entrée est gratuite pour les moins de dix-huit ans.',
    question: 'On which day is the museum closed?',
    options: ['Sunday', 'Saturday', 'Monday', 'Tuesday'],
    answer: 'Monday',
    transcript: 'The museum is open Tuesday to Sunday, from 10am to 6pm. It is closed on Mondays. Entry is free for under-18s.',
  },
  {
    id: 6,
    level: 'B1',
    type: 'mcq',
    text: 'En raison des travaux sur la ligne 4, les métros seront supprimés entre Montrouge et Montparnasse ce week-end. Des bus de remplacement seront mis en place.',
    question: 'Why is the Metro disrupted?',
    options: ['Strike action', 'Roadworks', 'Construction works on line 4', 'Signal failure'],
    answer: 'Construction works on line 4',
    transcript: 'Due to works on line 4, metro trains will not run between Montrouge and Montparnasse this weekend. Replacement buses will be provided.',
  },
  {
    id: 7,
    level: 'B2',
    type: 'mcq',
    text: 'Selon une étude récente, les Français passent en moyenne deux heures et demie par jour à table, ce qui en fait l\'un des peuples qui consacrent le plus de temps aux repas dans le monde.',
    question: 'How long do French people spend eating per day on average?',
    options: ['1 hour 30 min', '2 hours', '2 hours 30 min', '3 hours'],
    answer: '2 hours 30 min',
    transcript: 'According to a recent study, French people spend an average of two and a half hours a day at the table, making them one of the peoples who devote the most time to meals in the world.',
  },
  {
    id: 8,
    level: 'B2',
    type: 'mcq',
    text: 'Le baccalauréat, ou "bac", est l\'examen qui sanctionne la fin des études secondaires en France. Il donne accès à l\'enseignement supérieur et est reconnu internationalement.',
    question: 'What does passing the "bac" give access to?',
    options: ['A job in government', 'Higher education', 'A driving licence', 'University in France only'],
    answer: 'Higher education',
    transcript: 'The baccalauréat, or "bac", is the examination marking the end of secondary studies in France. It provides access to higher education and is internationally recognised.',
  },
]

const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700' }

export default function ListeningPractice() {
  const [filterLevel, setFilterLevel] = useState('All')
  const [answers, setAnswers] = useState({})
  const [showTranscript, setShowTranscript] = useState({})
  const speaking = useRef(false)

  const filtered = EXERCISES.filter(e => filterLevel === 'All' || e.level === filterLevel)

  const speak = (text) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }

  const handleAnswer = (exerciseId, choice, correct) => {
    if (answers[exerciseId]) return
    const isCorrect = choice === correct
    setAnswers(prev => ({ ...prev, [exerciseId]: choice }))
    if (isCorrect) addXP(10, 'listening')
  }

  const totalAnswered = Object.keys(answers).length
  const totalCorrect = Object.entries(answers).filter(([id, ans]) => {
    const ex = EXERCISES.find(e => e.id === parseInt(id))
    return ex && ans === ex.answer
  }).length

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Listening Practice | SayBonjour!" description="Improve your French listening comprehension with graded audio exercises A1–B2." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Listening Practice</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Compréhension orale — graded audio comprehension exercises</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['All', 'A1', 'A2', 'B1', 'B2'].map(l => (
              <button key={l} onClick={() => setFilterLevel(l)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterLevel === l ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                {l}
              </button>
            ))}
          </div>
          {totalAnswered > 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="text-emerald-600 font-bold">{totalCorrect}</span>/{totalAnswered} correct
            </div>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300 mb-6 flex items-start gap-2">
          <Headphones size={16} className="shrink-0 mt-0.5" />
          <span>Click the <strong>Play</strong> button to hear each sentence read aloud in French. Your browser must support text-to-speech.</span>
        </div>

        <div className="space-y-6">
          {filtered.map((ex, i) => {
            const chosen = answers[ex.id]
            const showTrans = showTranscript[ex.id]

            return (
              <motion.div key={ex.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[ex.level]}`}>{ex.level}</span>
                  <span className="text-xs text-gray-400">Exercise {i + 1}</span>
                </div>

                <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-4 mb-4 flex items-center gap-4">
                  <button onClick={() => speak(ex.text)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-burgundy-600 text-white hover:bg-burgundy-700 transition-colors shrink-0">
                    <Play size={20} fill="white" />
                  </button>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Click to hear the French audio</p>
                    <button onClick={() => speak(ex.text)}
                      className="text-xs text-burgundy-600 hover:text-burgundy-700 mt-1 flex items-center gap-1">
                      <Volume2 size={11} /> Play again (slow)
                    </button>
                  </div>
                </div>

                {showTrans && (
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-300 mb-4">
                    <strong>Transcript:</strong> {ex.text}
                    <br /><span className="text-amber-600 dark:text-amber-400 text-xs mt-1 block">{ex.transcript}</span>
                  </div>
                )}

                <p className="font-semibold text-gray-800 dark:text-cream-50 mb-3">{ex.question}</p>

                <div className="grid grid-cols-2 gap-2">
                  {ex.options.map(opt => {
                    const isChosen = chosen === opt
                    const isCorrect = opt === ex.answer
                    return (
                      <button key={opt} onClick={() => handleAnswer(ex.id, opt, ex.answer)} disabled={!!chosen}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-colors text-left disabled:cursor-default
                          ${chosen && isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-700' :
                            isChosen && !isCorrect ? 'bg-red-50 border-red-400 text-red-700' :
                            !chosen ? 'bg-white dark:bg-dark-warm-100 border-gray-200 dark:border-dark-warm-50 text-gray-700 dark:text-gray-200 hover:border-burgundy-300 hover:bg-burgundy-50' :
                            'bg-gray-50 dark:bg-dark-warm-200 border-gray-200 dark:border-dark-warm-50 text-gray-400'}`}>
                        {opt}
                        {chosen && isCorrect && <CheckCircle2 size={14} className="inline ml-1.5 text-emerald-500" />}
                        {isChosen && !isCorrect && <XCircle size={14} className="inline ml-1.5 text-red-500" />}
                      </button>
                    )
                  })}
                </div>

                {chosen && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className={`text-sm font-medium ${chosen === ex.answer ? 'text-emerald-600' : 'text-red-500'}`}>
                      {chosen === ex.answer ? '✓ Correct! +10 XP' : `✗ Correct answer: ${ex.answer}`}
                    </div>
                    <button onClick={() => setShowTranscript(prev => ({ ...prev, [ex.id]: !showTrans }))}
                      className="text-xs text-gray-400 hover:text-gray-600 ml-auto">
                      {showTrans ? 'Hide' : 'Show'} transcript
                    </button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
