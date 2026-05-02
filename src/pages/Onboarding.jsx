import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { getProgress, saveProgress } from '../utils/progress'

const GOALS = [
  { value: 'travel', label: '✈️ Travel to France', desc: 'Survive and thrive as a tourist' },
  { value: 'conversation', label: '💬 Hold a conversation', desc: 'Chat with native speakers' },
  { value: 'exam', label: '📝 Pass DELF exam', desc: 'Formal language certification' },
  { value: 'business', label: '💼 Business French', desc: 'Workplace and professional French' },
  { value: 'culture', label: '🎨 Enjoy French culture', desc: 'Films, music, literature' },
  { value: 'fun', label: '😊 Just for fun', desc: 'Learn at your own pace' },
]

const LEVEL_QUESTIONS = [
  {
    q: 'What does "Bonjour" mean?',
    options: ['Good night', 'Hello', 'Thank you', 'Please'],
    answer: 1, level_if_wrong: 'A1',
  },
  {
    q: 'Which article is used with "maison" (house)?',
    options: ['le', 'la', 'les', 'un'],
    answer: 1, level_if_wrong: 'A1',
  },
  {
    q: 'Conjugate "parler" for "nous":',
    options: ['parlez', 'parlons', 'parlent', 'parle'],
    answer: 1, level_if_wrong: 'A1',
  },
  {
    q: '"J\'ai mangé" is which tense?',
    options: ['Imparfait', 'Futur', 'Passé composé', 'Présent'],
    answer: 2, level_if_wrong: 'A2',
  },
  {
    q: 'Which pronoun is used with "dont"?',
    options: ['Subject', 'Replaces de + noun', 'Time/place', 'Object'],
    answer: 1, level_if_wrong: 'A2',
  },
  {
    q: '"Il faut que tu parles" uses which mood?',
    options: ['Indicatif', 'Conditionnel', 'Subjonctif', 'Impératif'],
    answer: 2, level_if_wrong: 'B1',
  },
  {
    q: 'The passive voice uses être + ___',
    options: ['Present participle', 'Past participle', 'Infinitive', 'Subjonctif'],
    answer: 1, level_if_wrong: 'B1',
  },
  {
    q: 'Which register is "T\'inquiète, c\'est bon!"?',
    options: ['Soutenu', 'Courant', 'Familier', 'Littéraire'],
    answer: 2, level_if_wrong: 'B2',
  },
]

const calculateLevel = (answers) => {
  let score = 0
  LEVEL_QUESTIONS.forEach((q, i) => { if (answers[i] === q.answer) score++ })
  if (score <= 2) return 'A1'
  if (score <= 4) return 'A2'
  if (score <= 6) return 'B1'
  if (score <= 7) return 'B2'
  return 'C1'
}

const levelDescs = {
  A1: 'Absolute Beginner — we\'ll start from the very basics',
  A2: 'Elementary — you know the basics, let\'s build on them',
  B1: 'Intermediate — you can hold simple conversations',
  B2: 'Upper-Intermediate — complex topics are within reach',
  C1: 'Advanced — impressive! Let\'s refine your French',
}

const Onboarding = () => {
  const [step, setStep] = useState('goal')
  const [goal, setGoal] = useState('')
  const [dailyMins, setDailyMins] = useState(10)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [currentQ, setCurrentQ] = useState(0)
  const [result, setResult] = useState(null)
  const { updateProfile } = useUser()
  const navigate = useNavigate()

  const handleGoalNext = () => { if (goal) setStep('time') }

  const handleTimeNext = () => setStep('quiz')

  const handleAnswer = (ai) => {
    const newAnswers = { ...quizAnswers, [currentQ]: ai }
    setQuizAnswers(newAnswers)
    if (currentQ < LEVEL_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(q => q + 1), 400)
    } else {
      const level = calculateLevel(newAnswers)
      setResult(level)
      setStep('result')
      const prog = getProgress()
      prog.cefrLevel = level
      saveProgress(prog)
      try {
        updateProfile({ goal, cefr_level: level, daily_goal_mins: dailyMins })
      } catch {}
    }
  }

  const handleFinish = () => navigate('/profile')

  return (
    <div className="min-h-screen bg-gradient-to-br from-burgundy-800 via-burgundy-700 to-burgundy-600 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🇫🇷</div>
          <h1 className="text-2xl font-bold text-cream-50">Let's personalise your learning</h1>
          <p className="text-cream-200 text-sm mt-1">
            {step === 'goal' ? 'Step 1 of 3 — Your goal' :
             step === 'time' ? 'Step 2 of 3 — Daily commitment' :
             step === 'quiz' ? `Step 3 of 3 — Quick level check (${currentQ + 1}/${LEVEL_QUESTIONS.length})` :
             'All done!'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step: Goal */}
          {step === 'goal' && (
            <motion.div key="goal" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-cream-50 font-bold text-lg mb-4">Why are you learning French?</h2>
                <div className="grid grid-cols-1 gap-2">
                  {GOALS.map(g => (
                    <button key={g.value} onClick={() => setGoal(g.value)}
                      className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${goal === g.value ? 'bg-cream-50 text-burgundy-800 shadow-md' : 'bg-white/10 text-cream-50 hover:bg-white/20'}`}>
                      <span className="text-2xl">{g.label.split(' ')[0]}</span>
                      <div>
                        <div className="font-semibold text-sm">{g.label.slice(g.label.indexOf(' ') + 1)}</div>
                        <div className={`text-xs ${goal === g.value ? 'text-burgundy-600' : 'text-cream-200'}`}>{g.desc}</div>
                      </div>
                      {goal === g.value && <CheckCircle className="w-5 h-5 ml-auto text-burgundy-600" />}
                    </button>
                  ))}
                </div>
                <button onClick={handleGoalNext} disabled={!goal}
                  className="mt-5 w-full py-3 bg-gold-400 text-white rounded-xl font-bold hover:bg-gold-500 disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step: Time */}
          {step === 'time' && (
            <motion.div key="time" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-cream-50 font-bold text-lg mb-4">How many minutes per day?</h2>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[5, 10, 15, 20, 30, 45].map(mins => (
                    <button key={mins} onClick={() => setDailyMins(mins)}
                      className={`py-4 rounded-xl font-bold text-lg transition-all ${dailyMins === mins ? 'bg-cream-50 text-burgundy-800 shadow-md' : 'bg-white/10 text-cream-50 hover:bg-white/20'}`}>
                      {mins} min{mins > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
                <button onClick={handleTimeNext}
                  className="w-full py-3 bg-gold-400 text-white rounded-xl font-bold hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
                  Take level assessment <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step: Quiz */}
          {step === 'quiz' && (
            <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex gap-1 mb-5">
                  {LEVEL_QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < currentQ ? 'bg-gold-400' : i === currentQ ? 'bg-cream-50' : 'bg-white/20'}`} />
                  ))}
                </div>
                <h2 className="text-cream-50 font-bold text-lg mb-5">{LEVEL_QUESTIONS[currentQ].q}</h2>
                <div className="space-y-2">
                  {LEVEL_QUESTIONS[currentQ].options.map((opt, ai) => (
                    <button key={ai} onClick={() => handleAnswer(ai)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all font-medium ${
                        quizAnswers[currentQ] === ai
                          ? 'bg-cream-50 text-burgundy-800'
                          : 'bg-white/10 text-cream-50 hover:bg-white/20'
                      }`}>
                      <span className="font-bold mr-2">{String.fromCharCode(65 + ai)}.</span> {opt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step: Result */}
          {step === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="text-6xl font-black text-cream-50 mb-2">{result}</div>
                <div className="text-gold-300 font-bold text-xl mb-2">Your starting level</div>
                <p className="text-cream-200 text-sm mb-6">{levelDescs[result]}</p>
                <div className="bg-white/10 rounded-xl p-4 mb-6 text-left text-sm text-cream-50">
                  <div className="flex justify-between mb-2"><span>Goal</span><span className="font-medium">{GOALS.find(g => g.value === goal)?.label}</span></div>
                  <div className="flex justify-between"><span>Daily target</span><span className="font-medium">{dailyMins} minutes</span></div>
                </div>
                <button onClick={handleFinish}
                  className="w-full py-3 bg-gold-400 text-white rounded-xl font-bold hover:bg-gold-500 transition-colors">
                  Start learning! 🚀
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Onboarding
