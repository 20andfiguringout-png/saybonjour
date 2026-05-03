import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, RotateCcw, Palette } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const COLORS = [
  { fr: 'rouge', en: 'red', hex: '#dc2626', shade: 'text-red-600', culture: 'The colour of passion, danger, and the French poppy (coquelicot). Also the colour of French letterboxes!' },
  { fr: 'bleu', en: 'blue', hex: '#2563eb', shade: 'text-blue-600', culture: 'France\'s national colour — "bleu blanc rouge". "Avoir le blues" (to have the blues) comes from English.' },
  { fr: 'vert', en: 'green', hex: '#16a34a', shade: 'text-green-600', culture: '"Être dans le vert" means to be in the clear. Vert de gris (verdigris) is the green patina on copper.' },
  { fr: 'jaune', en: 'yellow', hex: '#ca8a04', shade: 'text-yellow-600', culture: 'The Gilets Jaunes (yellow vests) wore this colour as a protest symbol from 2018. Also the colour of cowardice in French slang.' },
  { fr: 'orange', en: 'orange', hex: '#ea580c', shade: 'text-orange-600', culture: 'The fruit and the colour share the same name — both come from the Persian "nārang". The town of Orange in Provence gave the fruit its European name.' },
  { fr: 'violet', en: 'purple / violet', hex: '#7c3aed', shade: 'text-violet-600', culture: '"Violet" refers to cooler purple-blue tones. "Pourpre" is the richer, warmer purple historically associated with royalty.' },
  { fr: 'rose', en: 'pink', hex: '#db2777', shade: 'text-pink-600', culture: 'French uses "rose" for pink — not a separate word! "Voir la vie en rose" (to see life through rose-coloured glasses) is a famous French expression.' },
  { fr: 'blanc', en: 'white', hex: '#f9fafb', shade: 'text-gray-600', culture: '"Blanc" also means blank, and a blank cheque is "un chèque en blanc". White wine is "vin blanc".' },
  { fr: 'noir', en: 'black', hex: '#111827', shade: 'text-gray-900', culture: '"Le marché noir" is the black market. "Nuit noire" (pitch black night) — black is deeply embedded in French idioms.' },
  { fr: 'gris', en: 'grey', hex: '#6b7280', shade: 'text-gray-500', culture: '"Gris" (grey) describes mild drunkenness in French — "être gris(e)" means to be tipsy!' },
  { fr: 'marron', en: 'brown', hex: '#92400e', shade: 'text-amber-800', culture: '"Marron" is also the word for chestnut — autumn in France smells of marrons grillés (roasted chestnuts) from street sellers.' },
  { fr: 'beige', en: 'beige', hex: '#d4b896', shade: 'text-amber-600', culture: 'A French word adopted globally! Originally referred to undyed, natural wool fabric.' },
  { fr: 'turquoise', en: 'turquoise', hex: '#0891b2', shade: 'text-cyan-600', culture: 'From "turquois" — meaning "Turkish stone", because the mineral arrived in Europe via Turkey.' },
  { fr: 'bordeaux', en: 'burgundy / wine red', hex: '#7c2d52', shade: 'text-rose-800', culture: 'Named after the Bordeaux wine region. Also written "bordeaux" in English for the colour of dark red wine.' },
  { fr: 'crème', en: 'cream / off-white', hex: '#fef3c7', shade: 'text-amber-200', culture: 'From "crème de la crème" — the cream of the cream, meaning the very best. The colour evokes the richness of French dairy.' },
  { fr: 'ivoire', en: 'ivory', hex: '#f5f0e8', shade: 'text-amber-100', culture: 'From "ivoire" (ivory) — the tusk material. Côte d\'Ivoire (Ivory Coast) was named for its ivory trade.' },
  { fr: 'écarlate', en: 'scarlet', hex: '#dc2626', shade: 'text-red-600', culture: '"Écarlate de honte" (scarlet with shame) — a vivid B2/C1 level adjective used in literature.' },
  { fr: 'dorée', en: 'golden', hex: '#f59e0b', shade: 'text-amber-400', culture: '"La Côte Dorée" is a stretch of French coastline. "La Belle Époque" (golden age) is sometimes called "les années dorées".' },
]

const GRAMMAR_NOTES = [
  { title: 'Agreement (accord)', note: 'Most colours agree in gender and number: une voiture rouge (f), des yeux verts (m pl), une robe blanche (f).', example: 'un stylo rouge · une robe rouge · des stylos rouges' },
  { title: 'No agreement — compound colours', note: 'Compound colour names DON\'T agree: bleu marine, vert foncé, rose bonbon remain invariable.', example: 'une veste bleu marine · des chaussures rose bonbon' },
  { title: 'Nouns used as colours', note: 'Colours derived from nouns (orange, marron, bordeaux, crème, ivoire) are also invariable.', example: 'un chapeau marron · des chaussures orange' },
  { title: 'Shade modifiers', note: '"Foncé" (dark) and "clair" (light) are common modifiers added after the colour.', example: 'bleu foncé (dark blue) · vert clair (light green) · rouge vif (bright red)' },
]

const QUIZ_QUESTIONS = COLORS.slice(0, 10).map(c => ({
  ...c,
  options: [c.en, ...COLORS.filter(o => o.fr !== c.fr).sort(() => Math.random() - 0.5).slice(0, 3).map(o => o.en)].sort(() => Math.random() - 0.5),
}))

export default function ColorsInFrench() {
  const [tab, setTab] = useState('colors')
  const [quizIdx, setQuizIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [quizDone, setQuizDone] = useState(false)
  const [questions] = useState(QUIZ_QUESTIONS)

  const handleQuizAnswer = (choice) => {
    if (feedback) return
    const correct = choice === questions[quizIdx].en
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) { setScore(s => s + 1); addXP(5, 'vocabulary') }
    setTimeout(() => {
      setFeedback(null)
      if (quizIdx + 1 >= questions.length) setQuizDone(true)
      else setQuizIdx(i => i + 1)
    }, 800)
  }

  const resetQuiz = () => { setQuizIdx(0); setScore(0); setFeedback(null); setQuizDone(false) }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Colours in French | SayBonjour!" description="Learn French colour vocabulary with grammar rules, cultural notes, and a quiz." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Colours in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les couleurs — with grammar rules and cultural context</p>
        </div>

        <div className="flex gap-3 mb-8">
          {[{ id: 'colors', label: 'Colour Guide' }, { id: 'grammar', label: 'Grammar Rules' }, { id: 'quiz', label: 'Quick Quiz' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'colors' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {COLORS.map((color, i) => (
              <motion.div key={color.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl border border-gray-200 dark:border-dark-warm-50 shrink-0" style={{ backgroundColor: color.hex }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-gray-900 dark:text-cream-50">{color.fr}</span>
                    <SpeakButton text={color.fr} size="sm" />
                    <span className="text-xs text-gray-400">— {color.en}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{color.culture}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'grammar' && (
          <div className="space-y-4">
            {GRAMMAR_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Palette size={16} className="text-burgundy-600" />
                  <h3 className="font-bold text-gray-900 dark:text-cream-50">{note.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{note.note}</p>
                <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5">
                  <p className="text-sm font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{note.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'quiz' && !quizDone && (
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>{quizIdx + 1} / {questions.length}</span>
              <span>Score: <strong className="text-burgundy-600">{score}</strong></span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-dark-warm-200 h-1.5 rounded-full mb-6">
              <div className="h-full bg-burgundy-500 rounded-full transition-all" style={{ width: `${(quizIdx / questions.length) * 100}%` }} />
            </div>
            <motion.div key={quizIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border-2 border-gray-100 dark:border-dark-warm-50 p-8 mb-6 text-center">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-4 border-2 border-gray-200" style={{ backgroundColor: questions[quizIdx].hex }} />
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-3xl font-bold font-playfair text-burgundy-600">{questions[quizIdx].fr}</p>
                <SpeakButton text={questions[quizIdx].fr} size="sm" />
              </div>
              <p className="text-gray-400 text-sm">What does this colour mean in English?</p>
            </motion.div>
            <div className="grid grid-cols-2 gap-3">
              {questions[quizIdx].options.map(opt => (
                <button key={opt} onClick={() => handleQuizAnswer(opt)} disabled={!!feedback}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-colors
                    ${feedback && opt === questions[quizIdx].en ? 'bg-emerald-50 border-emerald-400 text-emerald-700' :
                      !feedback ? 'bg-white dark:bg-dark-warm-100 border-gray-200 dark:border-dark-warm-50 text-gray-700 dark:text-gray-200 hover:border-burgundy-300' :
                      'bg-gray-50 dark:bg-dark-warm-200 border-gray-200 dark:border-dark-warm-50 text-gray-400'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'quiz' && quizDone && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-10 text-center">
            <div className="text-5xl mb-4">{score >= 8 ? '🎨' : score >= 5 ? '🖌️' : '📚'}</div>
            <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-cream-50 mb-2">Quiz complete!</h2>
            <p className="text-gray-500 mb-6">Score: <strong className="text-burgundy-600">{score}/{questions.length}</strong></p>
            <button onClick={resetQuiz}
              className="px-6 py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors flex items-center gap-2 mx-auto">
              <RotateCcw size={15} /> Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
