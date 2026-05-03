import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle, CheckCircle2, XCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const DECKS = {
  'Greetings A1': [
    { fr: 'Bonjour', en: 'Hello / Good morning' },
    { fr: 'Bonsoir', en: 'Good evening' },
    { fr: 'Salut', en: 'Hi (informal)' },
    { fr: 'Au revoir', en: 'Goodbye' },
    { fr: 'À bientôt', en: 'See you soon' },
    { fr: 'À tout à l\'heure', en: 'See you later (same day)' },
    { fr: 'Enchanté(e)', en: 'Pleased to meet you' },
    { fr: 'Comment vous appelez-vous ?', en: 'What is your name? (formal)' },
    { fr: 'Je m\'appelle…', en: 'My name is…' },
    { fr: 'Comment allez-vous ?', en: 'How are you? (formal)' },
    { fr: 'Ça va ?', en: 'How are you? (informal)' },
    { fr: 'Très bien, merci.', en: 'Very well, thank you.' },
  ],
  'Numbers 1–20': [
    { fr: 'un / une', en: 'one' },
    { fr: 'deux', en: 'two' },
    { fr: 'trois', en: 'three' },
    { fr: 'quatre', en: 'four' },
    { fr: 'cinq', en: 'five' },
    { fr: 'six', en: 'six' },
    { fr: 'sept', en: 'seven' },
    { fr: 'huit', en: 'eight' },
    { fr: 'neuf', en: 'nine' },
    { fr: 'dix', en: 'ten' },
    { fr: 'onze', en: 'eleven' },
    { fr: 'douze', en: 'twelve' },
    { fr: 'treize', en: 'thirteen' },
    { fr: 'quatorze', en: 'fourteen' },
    { fr: 'quinze', en: 'fifteen' },
    { fr: 'seize', en: 'sixteen' },
    { fr: 'dix-sept', en: 'seventeen' },
    { fr: 'dix-huit', en: 'eighteen' },
    { fr: 'dix-neuf', en: 'nineteen' },
    { fr: 'vingt', en: 'twenty' },
  ],
  'Days & Months': [
    { fr: 'lundi', en: 'Monday' },
    { fr: 'mardi', en: 'Tuesday' },
    { fr: 'mercredi', en: 'Wednesday' },
    { fr: 'jeudi', en: 'Thursday' },
    { fr: 'vendredi', en: 'Friday' },
    { fr: 'samedi', en: 'Saturday' },
    { fr: 'dimanche', en: 'Sunday' },
    { fr: 'janvier', en: 'January' },
    { fr: 'février', en: 'February' },
    { fr: 'mars', en: 'March' },
    { fr: 'avril', en: 'April' },
    { fr: 'mai', en: 'May' },
    { fr: 'juin', en: 'June' },
    { fr: 'juillet', en: 'July' },
    { fr: 'août', en: 'August' },
    { fr: 'septembre', en: 'September' },
    { fr: 'octobre', en: 'October' },
    { fr: 'novembre', en: 'November' },
    { fr: 'décembre', en: 'December' },
  ],
  'Colours': [
    { fr: 'rouge', en: 'red' },
    { fr: 'bleu(e)', en: 'blue' },
    { fr: 'vert(e)', en: 'green' },
    { fr: 'jaune', en: 'yellow' },
    { fr: 'orange', en: 'orange' },
    { fr: 'violet(te)', en: 'purple' },
    { fr: 'rose', en: 'pink' },
    { fr: 'blanc / blanche', en: 'white' },
    { fr: 'noir(e)', en: 'black' },
    { fr: 'gris(e)', en: 'grey' },
    { fr: 'marron', en: 'brown' },
    { fr: 'beige', en: 'beige' },
  ],
  'Body Parts': [
    { fr: 'la tête', en: 'head' },
    { fr: 'les yeux', en: 'eyes' },
    { fr: 'le nez', en: 'nose' },
    { fr: 'la bouche', en: 'mouth' },
    { fr: 'les oreilles', en: 'ears' },
    { fr: 'le cou', en: 'neck' },
    { fr: 'les épaules', en: 'shoulders' },
    { fr: 'le bras', en: 'arm' },
    { fr: 'la main', en: 'hand' },
    { fr: 'les doigts', en: 'fingers' },
    { fr: 'le ventre', en: 'stomach' },
    { fr: 'la jambe', en: 'leg' },
    { fr: 'le pied', en: 'foot' },
  ],
  'Common Adjectives': [
    { fr: 'grand(e)', en: 'big / tall' },
    { fr: 'petit(e)', en: 'small / short' },
    { fr: 'beau / belle', en: 'beautiful / handsome' },
    { fr: 'laid(e)', en: 'ugly' },
    { fr: 'rapide', en: 'fast' },
    { fr: 'lent(e)', en: 'slow' },
    { fr: 'chaud(e)', en: 'hot / warm' },
    { fr: 'froid(e)', en: 'cold' },
    { fr: 'nouveau / nouvelle', en: 'new' },
    { fr: 'vieux / vieille', en: 'old' },
    { fr: 'facile', en: 'easy' },
    { fr: 'difficile', en: 'difficult' },
    { fr: 'bon(ne)', en: 'good' },
    { fr: 'mauvais(e)', en: 'bad' },
  ],
}

export default function MiniFlashcards() {
  const [deck, setDeck] = useState('Greetings A1')
  const [cards, setCards] = useState(() => DECKS['Greetings A1'])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState([])
  const [learning, setLearning] = useState([])
  const [done, setDone] = useState(false)

  const current = cards[idx]

  const changeDeck = (d) => {
    setDeck(d)
    setCards([...DECKS[d]])
    setIdx(0)
    setFlipped(false)
    setKnown([])
    setLearning([])
    setDone(false)
  }

  const shuffleDeck = () => {
    setCards(c => [...c].sort(() => Math.random() - 0.5))
    setIdx(0)
    setFlipped(false)
    setKnown([])
    setLearning([])
    setDone(false)
  }

  const handleKnow = useCallback((knew) => {
    if (knew) {
      setKnown(k => [...k, current.fr])
      addXP(3, 'vocabulary')
    } else {
      setLearning(l => [...l, current.fr])
    }
    setFlipped(false)
    setTimeout(() => {
      if (idx + 1 >= cards.length) setDone(true)
      else setIdx(i => i + 1)
    }, 200)
  }, [current, idx, cards.length])

  const restart = (onlyLearning = false) => {
    const newCards = onlyLearning
      ? cards.filter(c => learning.includes(c.fr))
      : [...DECKS[deck]]
    setCards(newCards)
    setIdx(0); setFlipped(false); setKnown([]); setLearning([]); setDone(false)
  }

  const pct = Math.round((known.length / cards.length) * 100)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Mini Flashcards | SayBonjour!" description="Quick French vocabulary flashcards — flip to reveal, mark as known or learning." />
      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Mini Flashcards</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Fiches éclair — quick vocabulary review</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {Object.keys(DECKS).map(d => (
            <button key={d} onClick={() => changeDeck(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${deck === d ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {d}
            </button>
          ))}
        </div>

        {!done ? (
          <>
            <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
              <span>{idx + 1} / {cards.length}</span>
              <button onClick={shuffleDeck} className="flex items-center gap-1 text-xs text-gray-400 hover:text-burgundy-600 transition-colors">
                <Shuffle size={13} /> Shuffle
              </button>
              <span><span className="text-emerald-600 font-bold">{known.length}</span> known</span>
            </div>

            <div className="w-full bg-gray-100 dark:bg-dark-warm-200 h-1.5 rounded-full mb-6">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(idx / cards.length) * 100}%` }} />
            </div>

            <div className="perspective-1000 mb-6 cursor-pointer" onClick={() => setFlipped(f => !f)} style={{ perspective: '1000px' }}>
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: 'preserve-3d', position: 'relative', height: '200px' }}>
                <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border-2 border-gray-100 dark:border-dark-warm-50 flex flex-col items-center justify-center p-8">
                  <p className="text-3xl font-bold font-playfair text-burgundy-600 mb-2 text-center">{current.fr}</p>
                  <p className="text-xs text-gray-400">Click to reveal English</p>
                </div>
                <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
                  className="bg-burgundy-600 rounded-2xl shadow flex flex-col items-center justify-center p-8">
                  <p className="text-2xl font-bold text-white mb-2 text-center">{current.en}</p>
                  <SpeakButton text={current.fr} size="sm" variant="ghost" className="text-white opacity-80 hover:opacity-100" />
                </div>
              </motion.div>
            </div>

            {flipped ? (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleKnow(false)}
                  className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-700 text-red-600 font-medium hover:bg-red-100 transition-colors">
                  <XCircle size={20} /> Still learning
                </button>
                <button onClick={() => handleKnow(true)}
                  className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-300 dark:border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-100 transition-colors">
                  <CheckCircle2 size={20} /> I know this!
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
                  className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white dark:bg-dark-warm-100 border border-gray-200 dark:border-dark-warm-50 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors">
                  <ChevronLeft size={18} /> Previous
                </button>
                <button onClick={() => setFlipped(true)}
                  className="py-4 rounded-2xl bg-burgundy-600 text-white font-medium hover:bg-burgundy-700 transition-colors">
                  Flip card
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-10 text-center">
            <div className="text-5xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
            <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-cream-50 mb-2">Deck complete!</h2>
            <p className="text-gray-500 mb-6">
              <span className="text-emerald-600 font-bold">{known.length}</span> known · <span className="text-red-500 font-bold">{learning.length}</span> still learning ({pct}%)
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {learning.length > 0 && (
                <button onClick={() => restart(true)}
                  className="px-5 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors">
                  Practice {learning.length} tricky ones
                </button>
              )}
              <button onClick={() => restart(false)}
                className="px-5 py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors flex items-center gap-2">
                <RotateCcw size={15} /> Full restart
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
