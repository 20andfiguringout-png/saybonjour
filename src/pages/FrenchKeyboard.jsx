import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Copy, CheckCircle2, Trash2, Volume2 } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const ACCENT_GROUPS = [
  {
    label: 'à / â (A)',
    chars: ['à', 'â', 'À', 'Â'],
    note: 'à (preposition: to/at), â (rare)',
  },
  {
    label: 'é / è / ê / ë (E)',
    chars: ['é', 'è', 'ê', 'ë', 'É', 'È', 'Ê', 'Ë'],
    note: 'é = /ay/, è = /eh/, ê ≈ /eh/, ë = rare diaeresis',
  },
  {
    label: 'î / ï (I)',
    chars: ['î', 'ï', 'Î', 'Ï'],
    note: 'ï = diaeresis (Noël, naïf)',
  },
  {
    label: 'ô / œ (O)',
    chars: ['ô', 'œ', 'Ô', 'Œ'],
    note: 'œ = œuf (egg), cœur (heart), sœur (sister)',
  },
  {
    label: 'ù / û / ü (U)',
    chars: ['ù', 'û', 'ü', 'Ù', 'Û', 'Ü'],
    note: 'ù = only in où (where)',
  },
  {
    label: 'ç / æ (Special)',
    chars: ['ç', 'æ', 'Ç', 'Æ'],
    note: 'ç = cedilla (ça, français), æ = rare ligature',
  },
]

const EXAMPLE_SENTENCES = [
  'Voilà où j\'habite.',
  'Il préfère être à Paris.',
  'Ça va très bien, merci !',
  'Quelle heure est-il ?',
  'C\'est un cœur généreux.',
]

export default function FrenchKeyboard() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef(null)

  const insertChar = (char) => {
    const ta = textareaRef.current
    if (!ta) {
      setText(t => t + char)
      return
    }
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const newText = text.slice(0, start) + char + text.slice(end)
    setText(newText)
    setTimeout(() => {
      ta.selectionStart = ta.selectionEnd = start + char.length
      ta.focus()
    }, 0)
  }

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const clear = () => setText('')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Accent Keyboard | SayBonjour!" description="Type French accented characters easily — à, é, ê, ü, ç, œ and more with pronunciation tips." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Accent Keyboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Clavier accent français — type accented characters with ease</p>
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your text</label>
            <div className="flex gap-2">
              {text && (
                <SpeakButton text={text} size="sm" />
              )}
              <button onClick={copy} disabled={!text}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-dark-warm-50 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-warm-200 disabled:opacity-40 transition-colors">
                {copied ? <><CheckCircle2 size={13} className="text-emerald-500" /> Copied!</> : <><Copy size={13} /> Copy</>}
              </button>
              <button onClick={clear} disabled={!text}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-dark-warm-50 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-warm-200 disabled:opacity-40 transition-colors">
                <Trash2 size={13} /> Clear
              </button>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => setText(e.target.value)}
            rows={4}
            placeholder="Start typing here, then click accent buttons below to insert characters..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-dark-warm-50 bg-cream-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 focus:outline-none focus:border-burgundy-400 text-sm resize-none"
          />
        </div>

        <div className="space-y-4 mb-8">
          {ACCENT_GROUPS.map(group => (
            <div key={group.label} className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{group.label}</span>
                  <p className="text-xs text-gray-400 mt-0.5">{group.note}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.chars.map(char => (
                  <motion.button
                    key={char}
                    onClick={() => insertChar(char)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-200 dark:border-dark-warm-50 bg-cream-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 font-bold text-lg hover:border-burgundy-400 hover:bg-burgundy-50 dark:hover:bg-burgundy-vibrant-600/10 hover:text-burgundy-700 dark:hover:text-burgundy-vibrant-300 transition-colors"
                  >
                    {char}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4 flex items-center gap-2">
            <Volume2 size={18} className="text-burgundy-600" /> Example sentences — click to load
          </h2>
          <div className="space-y-2">
            {EXAMPLE_SENTENCES.map((s, i) => (
              <button key={i} onClick={() => setText(s)}
                className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 dark:border-dark-warm-50 bg-cream-50 dark:bg-dark-warm-200 text-gray-700 dark:text-gray-200 text-sm hover:border-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-vibrant-600/10 transition-colors flex items-center justify-between group">
                <span className="font-medium">{s}</span>
                <span className="text-xs text-gray-400 group-hover:text-burgundy-500">Load →</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
          <strong>Tip:</strong> On Windows, hold <kbd className="bg-white dark:bg-dark-warm-100 px-1.5 py-0.5 rounded border text-xs">Alt</kbd> + a number code (e.g. Alt+130 = é). On Mac, hold <kbd className="bg-white dark:bg-dark-warm-100 px-1.5 py-0.5 rounded border text-xs">Option</kbd> + a letter (e.g. Option+E then E = é). On mobile, long-press a vowel key.
        </div>
      </div>
    </div>
  )
}
