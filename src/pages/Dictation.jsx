import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, CheckCircle, XCircle, RotateCcw, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const SENTENCES = [
  { fr: 'Bonjour, comment allez-vous ?', en: 'Hello, how are you?', level: 'A1' },
  { fr: 'Je m\'appelle Marie.', en: 'My name is Marie.', level: 'A1' },
  { fr: 'Il fait beau aujourd\'hui.', en: 'The weather is nice today.', level: 'A1' },
  { fr: 'J\'aime le café le matin.', en: 'I like coffee in the morning.', level: 'A1' },
  { fr: 'Le chat est sur le canapé.', en: 'The cat is on the sofa.', level: 'A1' },
  { fr: 'Je voudrais un café, s\'il vous plaît.', en: 'I would like a coffee, please.', level: 'A2' },
  { fr: 'Où se trouve la gare ?', en: 'Where is the train station?', level: 'A2' },
  { fr: 'Il y a beaucoup de monde dans les rues.', en: 'There are a lot of people in the streets.', level: 'A2' },
  { fr: 'Nous partons en vacances la semaine prochaine.', en: 'We are going on holiday next week.', level: 'A2' },
  { fr: 'Le dimanche, les Français adorent flâner dans les marchés.', en: 'On Sundays, French people love to stroll through markets.', level: 'B1' },
  { fr: 'Il faut absolument visiter le musée du Louvre si vous êtes à Paris.', en: 'You absolutely must visit the Louvre museum if you are in Paris.', level: 'B1' },
  { fr: 'La cuisine française est reconnue dans le monde entier pour sa finesse.', en: 'French cuisine is recognised worldwide for its refinement.', level: 'B1' },
  { fr: 'Les changements climatiques représentent l\'un des défis majeurs de notre époque.', en: 'Climate change represents one of the major challenges of our time.', level: 'B2' },
  { fr: 'La francophonie rassemble des millions de locuteurs à travers le monde.', en: 'The French-speaking world brings together millions of speakers across the globe.', level: 'B2' },
]

function speak(text, rate = 0.85) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = 'fr-FR'
  utt.rate = rate
  window.speechSynthesis.speak(utt)
}

function normalise(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, "'")
    .replace(/[^a-z0-9' ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getDiff(correct, attempt) {
  const cWords = correct.split(' ')
  const aWords = attempt.split(' ')
  return cWords.map((word, i) => {
    const aWord = aWords[i] || ''
    const ok = normalise(word) === normalise(aWord)
    return { word, ok }
  })
}

export default function Dictation() {
  const [levelFilter, setLevelFilter] = useState('All')
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const textRef = useRef(null)

  const pool = levelFilter === 'All' ? SENTENCES : SENTENCES.filter(s => s.level === levelFilter)
  const current = pool[index % pool.length]

  const playNormal = () => speak(current.fr)
  const playSlow = () => speak(current.fr, 0.55)

  const check = () => {
    setChecked(true)
    const correct = normalise(current.fr) === normalise(input)
    const wordCorrect = getDiff(current.fr, input).filter(w => w.ok).length
    const total_words = current.fr.split(' ').length
    const pct = wordCorrect / total_words
    if (pct >= 0.8) { setScore(s => s + 1); addXP(Math.round(pct * 15), 'lesson_read') }
    setTotal(t => t + 1)
  }

  const next = () => {
    setIndex(i => (i + 1) % pool.length)
    setInput('')
    setChecked(false)
    setTimeout(() => textRef.current?.focus(), 100)
  }

  const accuracy = checked ? Math.round(getDiff(current.fr, input).filter(w => w.ok).length / current.fr.split(' ').length * 100) : null

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Dictation | SayBonjour!" description="Improve your French listening and writing with interactive dictation exercises." />
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Dictation</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La Dictée — Listen and write</p>
          <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
            <span>Correct: <strong className="text-green-600">{score}</strong></span>
            <span>Attempted: <strong>{total}</strong></span>
          </div>
        </div>

        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {['All', 'A1', 'A2', 'B1', 'B2'].map(l => (
            <button key={l} onClick={() => { setLevelFilter(l); setIndex(0); setInput(''); setChecked(false) }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${levelFilter === l ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50'}`}>
              {l}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${current.level === 'A1' ? 'bg-emerald-100 text-emerald-700' : current.level === 'A2' ? 'bg-blue-100 text-blue-700' : current.level === 'B1' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>{current.level}</span>
            <span className="text-xs text-gray-400">{(index % pool.length) + 1} / {pool.length}</span>
          </div>

          <div className="text-center my-8">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Press Play and write what you hear</p>
            <div className="flex justify-center gap-3">
              <button onClick={playNormal}
                className="flex items-center gap-2 px-8 py-4 bg-burgundy-600 text-white rounded-xl font-medium text-xl hover:bg-burgundy-700 transition-colors shadow-sm">
                <Volume2 size={24} /> Play
              </button>
              <button onClick={playSlow}
                className="flex items-center gap-2 px-4 py-4 bg-gray-100 dark:bg-dark-warm-200 text-gray-700 dark:text-gray-300 rounded-xl text-sm hover:bg-gray-200 transition-colors">
                <Volume2 size={16} /> Slow
              </button>
            </div>
          </div>

          <div className="mb-4">
            <textarea ref={textRef} value={input} onChange={e => setInput(e.target.value)} disabled={checked} rows={3}
              placeholder="Type what you hear in French…"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-warm-50 rounded-xl bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50 focus:outline-none focus:border-burgundy-400 resize-none text-base"
            />
          </div>

          <AnimatePresence>
            {checked && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-4 space-y-3">
                <div className={`rounded-xl p-4 ${accuracy >= 80 ? 'bg-green-50 dark:bg-green-900/20 border border-green-200' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {accuracy >= 80 ? <CheckCircle size={16} className="text-green-600" /> : <XCircle size={16} className="text-amber-600" />}
                    <span className="font-semibold text-gray-900 dark:text-cream-50">{accuracy}% accuracy</span>
                    {accuracy >= 80 && <span className="text-xs text-green-600">+{Math.round(accuracy / 100 * 15)} XP</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {getDiff(current.fr, input).map((w, i) => (
                      <span key={i} className={`font-medium ${w.ok ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400 underline decoration-dashed'}`}>{w.word}</span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 italic">{current.en}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            {!checked ? (
              <button onClick={check} disabled={!input.trim()} className="btn-primary flex-1 disabled:opacity-50">Check</button>
            ) : (
              <button onClick={next} className="btn-primary flex-1 flex items-center justify-center gap-2"><ChevronRight size={16} /> Next Sentence</button>
            )}
            <button onClick={() => { setInput(''); setChecked(false) }} className="btn-secondary flex items-center gap-2"><RotateCcw size={14} /></button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">Accents are checked — try your best! Green = correct word, red = incorrect.</p>
      </div>
    </div>
  )
}
