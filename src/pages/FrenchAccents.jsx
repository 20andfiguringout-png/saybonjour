import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ACCENT_TYPES = [
  {
    accent: 'é — Accent aigu',
    symbol: '´',
    sound: 'Closed "ay" sound — like "say" but shorter',
    words: [
      { fr: 'été', en: 'summer' },
      { fr: 'café', en: 'coffee' },
      { fr: 'beauté', en: 'beauty' },
      { fr: 'société', en: 'society' },
      { fr: 'passé', en: 'past (adj)' },
      { fr: 'télévision', en: 'television' },
    ],
    rules: [
      'Only appears on the letter "e"',
      'The accent aigu always produces the closed /e/ sound',
      'Very common on past participles of -ER verbs: mangé, parlé, aimé',
      'Can change meaning: a (has) vs à (at), ou (or) vs où (where)',
    ],
  },
  {
    accent: 'è — Accent grave (on e)',
    symbol: '`',
    sound: 'Open "eh" sound — like "bed"',
    words: [
      { fr: 'père', en: 'father' },
      { fr: 'mère', en: 'mother' },
      { fr: 'frère', en: 'brother' },
      { fr: 'crème', en: 'cream' },
      { fr: 'après', en: 'after' },
      { fr: 'problème', en: 'problem' },
    ],
    rules: [
      'On "e": produces the open /ɛ/ sound',
      'On "a" and "u": changes meaning only (à vs a, où vs ou)',
      '"à" = preposition "at/to"; "a" = verb "has"',
      '"où" = where (relative/interrogative); "ou" = or',
    ],
  },
  {
    accent: 'ê — Accent circonflexe (on e)',
    symbol: '^',
    sound: 'Open "eh" sound, often slightly longer',
    words: [
      { fr: 'être', en: 'to be' },
      { fr: 'forêt', en: 'forest' },
      { fr: 'fête', en: 'party / feast' },
      { fr: 'même', en: 'same / even' },
      { fr: 'tête', en: 'head' },
      { fr: 'fenêtre', en: 'window' },
    ],
    rules: [
      'The circumflex often indicates a historic "s" that dropped out: forêt = "forest", fête = "feast"',
      'On â, î, ô, û — slight pronunciation change or historical marker',
      '"dû" (past part. of devoir) vs "du" (partitive article)',
      '"sûr" (certain) vs "sur" (on/over)',
    ],
  },
  {
    accent: 'ç — Cédille',
    symbol: '¸',
    sound: 'Always an /s/ sound — never /k/',
    words: [
      { fr: 'français', en: 'French' },
      { fr: 'ça', en: 'that / it (informal)' },
      { fr: 'garçon', en: 'boy / waiter' },
      { fr: 'façon', en: 'way / manner' },
      { fr: 'leçon', en: 'lesson' },
      { fr: 'reçu', en: 'received' },
    ],
    rules: [
      'Only on the letter "c"',
      'Used before a, o, u to give "c" an /s/ sound (normally c before a/o/u = /k/)',
      'Not needed before e, i, y (c is already /s/ there: ceci, cire)',
      'Common in -cer verb conjugations: je reçois, il reçoit',
    ],
  },
  {
    accent: 'ë, ï, ü — Tréma',
    symbol: '¨',
    sound: 'The preceding vowel is pronounced separately',
    words: [
      { fr: 'Noël', en: 'Christmas', note: 'No-EL, not "noel"' },
      { fr: 'naïf / naïve', en: 'naive', note: 'Na-EEF' },
      { fr: 'Citroën', en: 'Citroën (brand)', note: 'Sit-ro-EN' },
      { fr: 'ambiguë', en: 'ambiguous (fem)', note: 'Pronounce the "u" separately from "e"' },
      { fr: 'coïncidence', en: 'coincidence', note: 'Co-in-cidence — not "coin"' },
    ],
    rules: [
      'The tréma means: pronounce this vowel separately from the previous one',
      '"oë" without tréma = one sound; "oël" with tréma = two sounds (No-ël)',
      'Common in proper names and borrowed words',
    ],
  },
]

const TYPING_TIPS = [
  { key: 'é', mac: 'Option + e, then e', windows: 'Alt + 0233', phone: 'Hold "e" key' },
  { key: 'è', mac: 'Option + `, then e', windows: 'Alt + 0232', phone: 'Hold "e" key' },
  { key: 'ê', mac: 'Option + i, then e', windows: 'Alt + 0234', phone: 'Hold "e" key' },
  { key: 'ë', mac: 'Option + u, then e', windows: 'Alt + 0235', phone: 'Hold "e" key' },
  { key: 'à', mac: 'Option + `, then a', windows: 'Alt + 0224', phone: 'Hold "a" key' },
  { key: 'â', mac: 'Option + i, then a', windows: 'Alt + 0226', phone: 'Hold "a" key' },
  { key: 'ç', mac: 'Option + c', windows: 'Alt + 0231', phone: 'Hold "c" key' },
  { key: 'ù', mac: 'Option + `, then u', windows: 'Alt + 0249', phone: 'Hold "u" key' },
  { key: 'û', mac: 'Option + i, then u', windows: 'Alt + 0251', phone: 'Hold "u" key' },
  { key: 'î', mac: 'Option + i, then i', windows: 'Alt + 0238', phone: 'Hold "i" key' },
  { key: 'ï', mac: 'Option + u, then i', windows: 'Alt + 0239', phone: 'Hold "i" key' },
  { key: 'ô', mac: 'Option + i, then o', windows: 'Alt + 0244', phone: 'Hold "o" key' },
]

export default function FrenchAccents() {
  const [activeAccent, setActiveAccent] = useState(0)
  const [tab, setTab] = useState('accents')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Accents Guide | SayBonjour!" description="Master French accents — accent aigu, grave, circonflexe, cédille, tréma — with sounds, words, and typing tips." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Accents Guide</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les accents — é, è, ê, ç, ë — pronunciation, rules, and how to type them</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'accents', label: 'Accent Types' }, { id: 'typing', label: 'How to Type' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'accents' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ACCENT_TYPES.map((a, i) => (
                <button key={a.accent} onClick={() => { setActiveAccent(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeAccent === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {a.accent.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-3xl font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{ACCENT_TYPES[activeAccent].accent.split('—')[0].trim()}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sound: <span className="font-medium text-gray-700 dark:text-gray-200">{ACCENT_TYPES[activeAccent].sound}</span></p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                {ACCENT_TYPES[activeAccent].words.map((w, i) => (
                  <motion.div key={w.fr} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <SpeakButton text={w.fr} size="sm" />
                      <span className="font-bold text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{w.fr}</span>
                    </div>
                    <p className="text-xs text-gray-400">{w.en}</p>
                    {w.note && <p className="text-xs text-amber-500 italic">{w.note}</p>}
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Rules</p>
                <ul className="space-y-1">
                  {ACCENT_TYPES[activeAccent].rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-burgundy-500 shrink-0">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {tab === 'typing' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <div className="grid grid-cols-1 gap-2">
              {TYPING_TIPS.map((tip, i) => (
                <motion.div key={tip.key} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-4 gap-2 items-center border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                  <span className="font-bold text-xl font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{tip.key}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Mac</p>
                    <p>{tip.mac}</p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Windows</p>
                    <p>{tip.windows}</p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Phone</p>
                    <p>{tip.phone}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
              <p className="text-sm text-amber-800 dark:text-amber-300">💡 Tip: For frequent French typing, consider switching your keyboard layout to "AZERTY" (French layout) or installing a French keyboard input method on your OS.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
