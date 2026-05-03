import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const PREPOSITIONS = [
  {
    prep: 'à',
    meanings: ['at', 'to', 'in (cities)'],
    level: 'A1',
    examples: [
      { fr: 'Je suis à Paris.', en: 'I\'m in Paris.' },
      { fr: 'Je vais à l\'école.', en: 'I\'m going to school.' },
      { fr: 'Il arrive à midi.', en: 'He arrives at noon.' },
      { fr: 'une tasse à café', en: 'a coffee cup (intended use)' },
    ],
    note: 'à + le → au | à + les → aux. Used with cities (à Paris, à Londres).',
  },
  {
    prep: 'de',
    meanings: ['of', 'from', 'about'],
    level: 'A1',
    examples: [
      { fr: 'Je viens de France.', en: 'I come from France.' },
      { fr: 'Le livre de Marie.', en: 'Marie\'s book.' },
      { fr: 'Il parle de son travail.', en: 'He talks about his work.' },
      { fr: 'une tasse de café', en: 'a cup of coffee (contents)' },
    ],
    note: 'de + le → du | de + les → des. Used with countries (fem, and masc starting with vowel): de France, d\'Espagne, des États-Unis.',
  },
  {
    prep: 'en',
    meanings: ['in (months, years, countries)', 'by (transport)', 'made of'],
    level: 'A2',
    examples: [
      { fr: 'Je suis en France.', en: 'I\'m in France.' },
      { fr: 'Il va en voiture.', en: 'He goes by car.' },
      { fr: 'en été / en janvier', en: 'in summer / in January' },
      { fr: 'une table en bois', en: 'a wooden table' },
    ],
    note: 'Use "en" with feminine countries, months, seasons, and materials. For masculine countries: au Japon.',
  },
  {
    prep: 'dans',
    meanings: ['in (inside)', 'in (time — future)'],
    level: 'A2',
    examples: [
      { fr: 'Le chat est dans la boîte.', en: 'The cat is in the box.' },
      { fr: 'Il revient dans une heure.', en: 'He\'ll be back in an hour.' },
      { fr: 'dans le train', en: 'on the train (inside it)' },
    ],
    note: '"Dans" = physically inside. vs "en" for abstract/general (en France = the country; dans la France = inside France is unusual).',
  },
  {
    prep: 'sur',
    meanings: ['on', 'on top of', 'about (topics)'],
    level: 'A1',
    examples: [
      { fr: 'Le livre est sur la table.', en: 'The book is on the table.' },
      { fr: 'sur Internet', en: 'on the internet' },
      { fr: 'un livre sur la France', en: 'a book about France' },
    ],
    note: 'Also used for floors in less common contexts. "sur" for surfaces, "à" for locations.',
  },
  {
    prep: 'sous',
    meanings: ['under', 'beneath'],
    level: 'A1',
    examples: [
      { fr: 'Le chien dort sous la table.', en: 'The dog sleeps under the table.' },
      { fr: 'sous la pluie', en: 'in the rain (lit. under the rain)' },
    ],
    note: 'Contrast: sur (on top) vs sous (underneath).',
  },
  {
    prep: 'avec',
    meanings: ['with'],
    level: 'A1',
    examples: [
      { fr: 'Je viens avec toi.', en: 'I\'m coming with you.' },
      { fr: 'Il mange avec une fourchette.', en: 'He eats with a fork.' },
    ],
    note: '"Avec" never contracts. Contrast: sans (without).',
  },
  {
    prep: 'sans',
    meanings: ['without'],
    level: 'A2',
    examples: [
      { fr: 'Sans toi, je suis perdu(e).', en: 'Without you, I\'m lost.' },
      { fr: 'un café sans sucre', en: 'a coffee without sugar' },
    ],
    note: 'After "sans", use infinitive not gerund: "sans hésiter" = without hesitating.',
  },
  {
    prep: 'pour',
    meanings: ['for', 'in order to'],
    level: 'A1',
    examples: [
      { fr: 'C\'est un cadeau pour toi.', en: 'It\'s a gift for you.' },
      { fr: 'Je travaille pour vivre.', en: 'I work to live (in order to).' },
      { fr: 'pour toujours', en: 'forever' },
    ],
    note: '"Pour + infinitive" expresses purpose: pour apprendre = in order to learn.',
  },
  {
    prep: 'par',
    meanings: ['by', 'through', 'per', 'because of'],
    level: 'B1',
    examples: [
      { fr: 'Il a été écrit par Victor Hugo.', en: 'It was written by Victor Hugo.' },
      { fr: 'deux fois par semaine', en: 'twice a week' },
      { fr: 'par la fenêtre', en: 'through the window' },
    ],
    note: '"Par" used for passive voice agent. "De" also used for passive with verbs of emotion: Il est aimé de tous.',
  },
]

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
  A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  B1: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
}

export default function FrenchPrepositions() {
  const [activePrep, setActivePrep] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Prepositions | SayBonjour!" description="Master French prepositions — à, de, en, dans, sur, avec, pour, par — with examples and key rules." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Prepositions</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les prépositions — à, de, en, dans, sur, avec, pour, par, and more</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {PREPOSITIONS.map((p, i) => (
            <button key={p.prep} onClick={() => { setActivePrep(i); addXP(3, 'grammar') }}
              className={`px-3 py-1.5 rounded-full text-sm font-mono font-bold transition-colors ${activePrep === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {p.prep}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono font-bold text-3xl text-burgundy-700 dark:text-burgundy-vibrant-300">{PREPOSITIONS[activePrep].prep}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[PREPOSITIONS[activePrep].level]}`}>{PREPOSITIONS[activePrep].level}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{PREPOSITIONS[activePrep].meanings.join(' / ')}</p>

          <div className="space-y-2 mb-5">
            {PREPOSITIONS[activePrep].examples.map((ex, i) => (
              <motion.div key={ex.fr} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5">
                <SpeakButton text={ex.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{ex.fr}"</p>
                  <p className="text-xs text-gray-400">{ex.en}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Key rule</p>
            <p className="text-sm text-amber-800 dark:text-amber-300">{PREPOSITIONS[activePrep].note}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button onClick={() => setActivePrep(i => Math.max(0, i - 1))} disabled={activePrep === 0}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-dark-warm-50 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors">
            ← Previous
          </button>
          <button onClick={() => setActivePrep(i => Math.min(PREPOSITIONS.length - 1, i + 1))} disabled={activePrep === PREPOSITIONS.length - 1}
            className="flex-1 py-2.5 rounded-xl bg-burgundy-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-burgundy-700 transition-colors">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
