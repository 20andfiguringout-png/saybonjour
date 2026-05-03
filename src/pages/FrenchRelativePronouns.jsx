import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const PRONOUNS = [
  {
    pronoun: 'qui',
    role: 'subject',
    meaning: 'who / that / which (subject)',
    level: 'A2',
    examples: [
      { fr: 'C\'est l\'homme qui parle.', en: 'That\'s the man who is speaking.' },
      { fr: 'Le chat qui dort est le mien.', en: 'The cat that is sleeping is mine.' },
      { fr: 'J\'ai un ami qui habite à Lyon.', en: 'I have a friend who lives in Lyon.' },
    ],
    rule: '"Qui" replaces the SUBJECT of the relative clause. It\'s never elided before a vowel.',
  },
  {
    pronoun: 'que / qu\'',
    role: 'direct object',
    meaning: 'that / which / whom (object)',
    level: 'A2',
    examples: [
      { fr: 'Le film que j\'ai vu était excellent.', en: 'The film that I saw was excellent.' },
      { fr: 'C\'est la personne que je cherche.', en: 'That\'s the person I\'m looking for.' },
      { fr: 'Le livre qu\'il lit est long.', en: 'The book he\'s reading is long.' },
    ],
    rule: '"Que" replaces the DIRECT OBJECT. Elides to "qu\'" before a vowel. Past participle agrees with "que" in compound tenses.',
  },
  {
    pronoun: 'où',
    role: 'place / time',
    meaning: 'where / when (relative)',
    level: 'B1',
    examples: [
      { fr: 'C\'est la ville où je suis né(e).', en: 'That\'s the city where I was born.' },
      { fr: 'Le jour où il est arrivé, il faisait beau.', en: 'The day he arrived, the weather was nice.' },
      { fr: 'La maison où j\'habite est grande.', en: 'The house where I live is large.' },
    ],
    rule: '"Où" refers to places and times. Much more common than "dans lequel / à laquelle" for place.',
  },
  {
    pronoun: 'dont',
    role: 'of which / whose',
    meaning: 'whose / of which / about which',
    level: 'B1',
    examples: [
      { fr: 'C\'est le film dont je t\'ai parlé.', en: 'That\'s the film I told you about. (about which)' },
      { fr: 'La femme dont le mari est médecin.', en: 'The woman whose husband is a doctor.' },
      { fr: 'C\'est quelque chose dont j\'ai besoin.', en: 'It\'s something I need. (avoir besoin de)' },
    ],
    rule: '"Dont" replaces "de + noun". Use it when the verb needs "de": parler de, avoir besoin de, avoir peur de, etc.',
  },
  {
    pronoun: 'lequel / laquelle / lesquels / lesquelles',
    role: 'preposition + which/whom',
    meaning: 'which / whom (after preposition)',
    level: 'B2',
    examples: [
      { fr: 'La table sur laquelle j\'écris.', en: 'The table on which I\'m writing.' },
      { fr: 'Les amis avec lesquels je voyage.', en: 'The friends with whom I travel.' },
      { fr: 'Le sujet auquel il pense.', en: 'The subject he\'s thinking about.' },
    ],
    rule: 'Used after prepositions (sur, avec, pour, etc.) — agrees in gender and number. Contracts with "à" (auquel/auxquels) and "de" (duquel/desquels).',
  },
]

export default function FrenchRelativePronouns() {
  const [activeP, setActiveP] = useState(0)

  const LEVEL_COLORS = { A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700' }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Relative Pronouns | SayBonjour!" description="Master French relative pronouns — qui, que, où, dont, lequel — with examples and rules." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Relative Pronouns</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les pronoms relatifs — qui, que, où, dont, lequel</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {PRONOUNS.map((p, i) => (
            <button key={p.pronoun} onClick={() => { setActiveP(i); addXP(3, 'grammar') }}
              className={`px-3 py-1.5 rounded-full text-sm font-mono font-bold transition-colors flex items-center gap-1.5 ${activeP === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {p.pronoun.split('/')[0].trim()}
              <span className={`text-xs px-1 py-0.5 rounded font-medium ${activeP === i ? 'bg-white/20 text-white' : LEVEL_COLORS[p.level]}`}>{p.level}</span>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono font-bold text-2xl text-burgundy-700 dark:text-burgundy-vibrant-300">{PRONOUNS[activeP].pronoun}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[PRONOUNS[activeP].level]}`}>{PRONOUNS[activeP].level}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">{PRONOUNS[activeP].meaning}</span>
            <span className="text-xs bg-cream-100 dark:bg-dark-warm-200 px-2 py-0.5 rounded text-gray-500">role: {PRONOUNS[activeP].role}</span>
          </div>

          <div className="space-y-2 mb-5">
            {PRONOUNS[activeP].examples.map((ex, i) => (
              <motion.div key={ex.fr} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
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
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Rule</p>
            <p className="text-sm text-amber-800 dark:text-amber-300">{PRONOUNS[activeP].rule}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={() => setActiveP(i => Math.max(0, i - 1))} disabled={activeP === 0}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-dark-warm-50 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors">
            ← Previous
          </button>
          <button onClick={() => setActiveP(i => Math.min(PRONOUNS.length - 1, i + 1))} disabled={activeP === PRONOUNS.length - 1}
            className="flex-1 py-2.5 rounded-xl bg-burgundy-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-burgundy-700 transition-colors">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
