import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftRight, Copy, CheckCircle2, Trash2, Volume2, Lightbulb } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import AccentKeyboard from '../components/AccentKeyboard'

const PHRASE_BANK = {
  greetings: [
    { fr: 'Bonjour !', en: 'Hello!' },
    { fr: 'Comment allez-vous ?', en: 'How are you? (formal)' },
    { fr: 'Ça va ?', en: 'How are you? (informal)' },
    { fr: 'Bonsoir !', en: 'Good evening!' },
    { fr: 'Au revoir !', en: 'Goodbye!' },
    { fr: 'À bientôt !', en: 'See you soon!' },
  ],
  travel: [
    { fr: 'Où est la gare ?', en: 'Where is the train station?' },
    { fr: 'Combien coûte ce billet ?', en: 'How much is this ticket?' },
    { fr: 'Je voudrais une chambre pour deux nuits.', en: 'I would like a room for two nights.' },
    { fr: 'L\'addition, s\'il vous plaît.', en: 'The bill, please.' },
    { fr: 'Où sont les toilettes ?', en: 'Where are the toilets?' },
  ],
  emergencies: [
    { fr: 'Au secours !', en: 'Help!' },
    { fr: 'Appelez la police !', en: 'Call the police!' },
    { fr: 'J\'ai besoin d\'un médecin.', en: 'I need a doctor.' },
    { fr: 'Je suis perdu(e).', en: 'I am lost.' },
    { fr: 'C\'est une urgence !', en: 'It\'s an emergency!' },
  ],
  shopping: [
    { fr: 'C\'est trop cher.', en: 'It\'s too expensive.' },
    { fr: 'Est-ce que vous avez la taille M ?', en: 'Do you have size M?' },
    { fr: 'Je cherche…', en: 'I am looking for…' },
    { fr: 'Avez-vous quelque chose de moins cher ?', en: 'Do you have something cheaper?' },
  ],
}

const COMMON_PHRASES_FR_EN = [
  { fr: 'je veux', en: 'I want' },
  { fr: 'il faut', en: 'it is necessary / we must' },
  { fr: 'je suis', en: 'I am' },
  { fr: 'c\'est', en: 'it is / that is' },
  { fr: 'je voudrais', en: 'I would like' },
  { fr: 's\'il vous plaît', en: 'please (formal)' },
  { fr: 'merci beaucoup', en: 'thank you very much' },
  { fr: 'je ne comprends pas', en: 'I don\'t understand' },
  { fr: 'pouvez-vous répéter ?', en: 'can you repeat?' },
  { fr: 'parlez-vous anglais ?', en: 'do you speak English?' },
  { fr: 'où est… ?', en: 'where is…?' },
  { fr: 'comment dit-on… ?', en: 'how do you say…?' },
  { fr: 'qu\'est-ce que c\'est ?', en: 'what is it?' },
  { fr: 'je ne sais pas', en: 'I don\'t know' },
  { fr: 'bien sûr !', en: 'of course!' },
  { fr: 'd\'accord', en: 'OK / agreed' },
]

const DIRECTION_ICON = { 'fr-en': '🇫🇷 → 🇬🇧', 'en-fr': '🇬🇧 → 🇫🇷' }

export default function QuickTranslator() {
  const [direction, setDirection] = useState('fr-en')
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const [activeBank, setActiveBank] = useState('greetings')
  const [showAccents, setShowAccents] = useState(false)

  const lookup = useCallback((text) => {
    const cleaned = text.trim().toLowerCase()
    if (!cleaned) return null
    for (const phrase of COMMON_PHRASES_FR_EN) {
      if (direction === 'fr-en' && phrase.fr.toLowerCase() === cleaned) return phrase.en
      if (direction === 'en-fr' && phrase.en.toLowerCase() === cleaned) return phrase.fr
    }
    for (const phrases of Object.values(PHRASE_BANK)) {
      for (const phrase of phrases) {
        if (direction === 'fr-en' && phrase.fr.toLowerCase() === cleaned) return phrase.en
        if (direction === 'en-fr' && phrase.en.toLowerCase() === cleaned) return phrase.fr
      }
    }
    return null
  }, [direction])

  const handleTranslate = () => {
    const found = lookup(input)
    setResult(found !== null ? found : `⚠️ Not found in phrase bank — try Web Translate: translate.google.com`)
  }

  const handlePhraseBankClick = (phrase) => {
    const text = direction === 'fr-en' ? phrase.fr : phrase.en
    setInput(text)
    setResult(direction === 'fr-en' ? phrase.en : phrase.fr)
  }

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const insertAccent = (char) => {
    setInput(prev => prev + char)
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Quick Translator | SayBonjour!" description="Quick French phrase lookup tool with common translations and a curated phrase bank." />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Quick Translator</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Traducteur rapide — common phrases at your fingertips</p>
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setDirection(d => d === 'fr-en' ? 'en-fr' : 'fr-en')}
              className="flex items-center gap-2 px-4 py-2 bg-burgundy-50 dark:bg-burgundy-vibrant-600/10 border border-burgundy-200 dark:border-burgundy-vibrant-600/20 text-burgundy-700 dark:text-burgundy-vibrant-300 rounded-xl text-sm font-medium hover:bg-burgundy-100 transition-colors">
              <ArrowLeftRight size={15} /> {DIRECTION_ICON[direction]}
            </button>
            <span className="text-xs text-gray-400">Click to swap direction</span>
          </div>

          <div className="relative mb-3">
            <textarea
              value={input}
              onChange={e => { setInput(e.target.value); setResult(null) }}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleTranslate())}
              placeholder={direction === 'fr-en' ? 'Enter a French phrase…' : 'Enter an English phrase…'}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-dark-warm-50 bg-cream-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 focus:outline-none focus:border-burgundy-400 text-sm resize-none"
            />
            {input && (
              <button onClick={() => { setInput(''); setResult(null) }}
                className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors">
                <Trash2 size={14} />
              </button>
            )}
          </div>

          {direction === 'en-fr' && (
            <div className="mb-3">
              <button onClick={() => setShowAccents(a => !a)}
                className="text-xs text-burgundy-600 hover:text-burgundy-700 flex items-center gap-1 mb-2">
                <Lightbulb size={12} /> {showAccents ? 'Hide' : 'Show'} accent keyboard
              </button>
              {showAccents && <AccentKeyboard onInsert={insertAccent} />}
            </div>
          )}

          <button onClick={handleTranslate} disabled={!input.trim()}
            className="w-full py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
            <ArrowLeftRight size={16} /> Translate
          </button>

          <AnimatePresence>
            {result !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-4 bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-4 border border-gray-100 dark:border-dark-warm-50">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-gray-800 dark:text-cream-50 text-sm font-medium flex-1">{result}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    {!result.startsWith('⚠️') && <SpeakButton text={result} size="sm" />}
                    <button onClick={() => copy(result)}
                      className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      {copied ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Copy size={15} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">Phrase bank</h2>
          <div className="flex gap-2 flex-wrap mb-4">
            {Object.keys(PHRASE_BANK).map(bank => (
              <button key={bank} onClick={() => setActiveBank(bank)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${activeBank === bank ? 'bg-burgundy-600 text-white' : 'bg-gray-50 dark:bg-dark-warm-200 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                {bank}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {PHRASE_BANK[activeBank].map(phrase => (
              <button key={phrase.fr} onClick={() => handlePhraseBankClick(phrase)}
                className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 dark:border-dark-warm-50 bg-cream-50 dark:bg-dark-warm-200 hover:border-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-vibrant-600/10 transition-colors group">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sm text-gray-800 dark:text-cream-50">{phrase.fr}</span>
                    <span className="text-xs text-gray-400 ml-2">— {phrase.en}</span>
                  </div>
                  <span className="text-xs text-gray-300 group-hover:text-burgundy-400 transition-colors">Use →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
