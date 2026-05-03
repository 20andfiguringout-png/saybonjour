import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const PRONOUNS = [
  {
    pronoun: 'qui',
    role: 'subject',
    meaning: 'who / that / which (subject of clause)',
    level: 'A2',
    rule: '"Qui" replaces the SUBJECT of the relative clause — the person or thing doing the action. It\'s never elided before a vowel (qui + est stays as "qui est", NOT "qu\'est"). Works for people AND things.',
    examples: [
      { fr: 'C\'est l\'homme qui parle.', en: 'That\'s the man who is speaking. (who = subject: he speaks)' },
      { fr: 'Le chat qui dort est le mien.', en: 'The cat that is sleeping is mine. (that = subject: it sleeps)' },
      { fr: 'J\'ai un ami qui habite à Lyon.', en: 'I have a friend who lives in Lyon.' },
      { fr: 'La voiture qui est garée là est à moi.', en: 'The car that is parked there is mine.' },
    ],
    tips: ['Never elide: "qui est" NOT "qu\'est"', 'Subject pronoun — the noun it refers to is DOING the action', 'Works for both people and things'],
  },
  {
    pronoun: 'que / qu\'',
    role: 'direct object',
    meaning: 'that / which / whom (object of clause)',
    level: 'A2',
    rule: '"Que" replaces the DIRECT OBJECT of the relative clause — the person or thing receiving the action. Elides to "qu\'" before a vowel or mute h. Important: the past participle agrees in gender/number with "que" in compound tenses.',
    examples: [
      { fr: 'Le film que j\'ai vu était excellent.', en: 'The film that I saw was excellent. (film = object: I saw it)' },
      { fr: 'C\'est la personne que je cherche.', en: 'That\'s the person I\'m looking for.' },
      { fr: 'Le livre qu\'il lit est long.', en: 'The book he\'s reading is long. (elision before "il")' },
      { fr: 'La chanson qu\'elle a chantée était belle.', en: 'The song she sang was beautiful. (chantée agrees with "chanson" fem sg)' },
    ],
    tips: ['Elides to "qu\'" before vowel or mute h', 'Object pronoun — the noun is RECEIVING the action', 'Past participle AGREES with "que" in passé composé'],
  },
  {
    pronoun: 'où',
    role: 'place / time',
    meaning: 'where / when (location or time reference)',
    level: 'B1',
    rule: '"Où" refers to places AND times. Much more commonly used than "dans lequel / à laquelle" for places. When used for time, it translates as "when" — "le jour où" (the day when), "l\'époque où" (the time when).',
    examples: [
      { fr: 'C\'est la ville où je suis né(e).', en: 'That\'s the city where I was born.' },
      { fr: 'Le jour où il est arrivé, il faisait beau.', en: 'The day when he arrived, the weather was nice. (time)' },
      { fr: 'La maison où j\'habite est grande.', en: 'The house where I live is large.' },
      { fr: 'Je me souviens de l\'époque où on était étudiants.', en: 'I remember the time when we were students.' },
    ],
    tips: ['Used for place AND time', '"Le jour où" = the day when; "l\'endroit où" = the place where', 'Preferred over "dans lequel" for places in everyday French'],
  },
  {
    pronoun: 'dont',
    role: 'of which / whose',
    meaning: 'whose / of which / about which (replaces de + noun)',
    level: 'B1',
    rule: '"Dont" replaces "de + noun". Use it whenever the verb or expression requires "de": parler de, avoir besoin de, avoir peur de, être content de, le résultat de, etc. Also used for possession (= whose).',
    examples: [
      { fr: 'C\'est le film dont je t\'ai parlé.', en: 'That\'s the film I told you about. (parler de → dont)' },
      { fr: 'La femme dont le mari est médecin.', en: 'The woman whose husband is a doctor. (possession)' },
      { fr: 'C\'est quelque chose dont j\'ai besoin.', en: 'It\'s something I need. (avoir besoin de → dont)' },
      { fr: 'Le résultat dont elle est fière.', en: 'The result she is proud of. (être fier de → dont)' },
    ],
    tips: ['"Dont" = de + noun. If the verb takes "de", use dont.', 'Common verbs needing dont: parler de, avoir besoin de, avoir peur de, être fier de, se souvenir de', 'For possession: "dont le/la/les" = whose'],
  },
  {
    pronoun: 'lequel / laquelle / lesquels / lesquelles',
    role: 'preposition + which / whom',
    meaning: 'which / whom (after prepositions: sur, avec, pour, dans, etc.)',
    level: 'B2',
    rule: 'Used after prepositions (other than "de" = dont). Must agree in gender and number with the noun it refers to. Contracts with "à" (auquel/auxquels/auxquelles) and "de" (duquel/desquels/desquelles).',
    examples: [
      { fr: 'La table sur laquelle j\'écris.', en: 'The table on which I\'m writing. (sur + fem sg = laquelle)' },
      { fr: 'Les amis avec lesquels je voyage.', en: 'The friends with whom I travel. (avec + masc pl = lesquels)' },
      { fr: 'Le sujet auquel il pense.', en: 'The subject he\'s thinking about. (à + masc sg = auquel)' },
      { fr: 'La raison pour laquelle elle est partie.', en: 'The reason why she left. (pour + fem sg = laquelle)' },
    ],
    tips: ['Must agree: masc sg = lequel, fem sg = laquelle, masc pl = lesquels, fem pl = lesquelles', '"À + lequel" = auquel; "à + lesquels/lesquelles" = auxquels/auxquelles', '"De + lequel" = duquel; use "dont" instead when possible'],
  },
  {
    pronoun: 'ce qui / ce que / ce dont',
    role: 'indefinite (what / that which)',
    meaning: 'what / that which (when the antecedent is an idea, not a specific noun)',
    level: 'B2',
    rule: 'Used when the relative pronoun refers to an idea, clause, or something indefinite (not a specific noun). "Ce qui" = subject; "ce que" = object; "ce dont" = after de. Very common in spoken French.',
    examples: [
      { fr: 'Ce qui me plaît, c\'est la liberté.', en: 'What I like is freedom. (ce qui = subject)' },
      { fr: 'Je comprends ce que tu veux dire.', en: 'I understand what you mean. (ce que = object)' },
      { fr: 'C\'est ce dont j\'avais besoin.', en: 'That\'s what I needed. (ce dont = de + idea)' },
      { fr: 'Dis-moi ce qui s\'est passé.', en: 'Tell me what happened.' },
    ],
    tips: ['"Ce qui" = subject (undefined antecedent); "ce que/qu\'" = object', '"Ce dont" = de + undefined thing. Never use "ce que" or "ce dont" when there is a specific noun antecedent', 'Very common in speech: "Voilà ce qui me préoccupe" = Here\'s what worries me'],
  },
]

const COMMON_ERRORS = [
  { wrong: '"C\'est la personne qui je connais"', right: '"C\'est la personne que je connais"', why: '"Je connais" has a direct object — use "que" (object), not "qui" (subject).' },
  { wrong: '"Le film qu\'est excellent"', right: '"Le film qui est excellent"', why: '"Est" (is) makes "le film" the subject — use "qui" (subject). Never elide "qui".' },
  { wrong: '"La chose de que j\'ai besoin"', right: '"La chose dont j\'ai besoin"', why: '"Avoir besoin de" → use "dont" (replaces "de + noun").' },
  { wrong: '"L\'ami avec qui je voyage" (about a group)', right: '"Les amis avec lesquels je voyage"', why: 'After prepositions and referring to things (not people), use "lequel/laquelle/lesquels/lesquelles".' },
  { wrong: '"Je fais ce que il veut"', right: '"Je fais ce qu\'il veut"', why: '"Ce que" elides to "ce qu\'" before vowels.' },
]

const LEVEL_COLORS = { A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700' }

export default function FrenchRelativePronouns() {
  const [activeP, setActiveP] = useState(0)
  const [tab, setTab] = useState('pronouns')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Relative Pronouns | SayBonjour!" description="Master French relative pronouns — qui, que, où, dont, lequel, ce qui/ce que — with rules, examples, and common errors." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Relative Pronouns</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les pronoms relatifs — qui, que, où, dont, lequel, ce qui / ce que</p>
        </div>

        <div className="flex gap-3 mb-6">
          {[{ id: 'pronouns', label: 'All Pronouns' }, { id: 'errors', label: 'Common Errors' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'pronouns' && (
          <>
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
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono font-bold text-2xl text-burgundy-700 dark:text-burgundy-vibrant-300">{PRONOUNS[activeP].pronoun}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[PRONOUNS[activeP].level]}`}>{PRONOUNS[activeP].level}</span>
                <span className="text-xs bg-cream-100 dark:bg-dark-warm-200 px-2 py-0.5 rounded text-gray-500">role: {PRONOUNS[activeP].role}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{PRONOUNS[activeP].meaning}</p>

              <div className="space-y-2 mb-5">
                {PRONOUNS[activeP].examples.map((ex, i) => (
                  <motion.div key={ex.fr} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5"
                    onClick={() => addXP(2, 'grammar')}>
                    <SpeakButton text={ex.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{ex.fr}"</p>
                      <p className="text-xs text-gray-400">{ex.en}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-4">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Rule</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">{PRONOUNS[activeP].rule}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Quick tips</p>
                <ul className="space-y-1">
                  {PRONOUNS[activeP].tips.map(tip => (
                    <li key={tip} className="text-xs text-blue-800 dark:text-blue-300 flex items-start gap-1.5">
                      <span className="mt-0.5 shrink-0">→</span> {tip}
                    </li>
                  ))}
                </ul>
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
          </>
        )}

        {tab === 'errors' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">These are the most common relative pronoun mistakes made by English speakers at B1–B2 level.</p>
            {COMMON_ERRORS.map((err, i) => (
              <motion.div key={err.wrong} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(3, 'grammar')}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-red-50 dark:bg-red-900/10 rounded-xl px-3 py-2">
                    <p className="text-xs text-red-500 font-bold mb-1">✗ Wrong</p>
                    <p className="text-sm text-red-700 dark:text-red-300 font-mono italic">{err.wrong}</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl px-3 py-2">
                    <p className="text-xs text-emerald-500 font-bold mb-1">✓ Correct</p>
                    <div className="flex items-center gap-1.5">
                      <SpeakButton text={err.right.replace(/"/g, '')} size="sm" />
                      <p className="text-sm text-emerald-700 dark:text-emerald-300 font-mono italic">{err.right}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 italic">💡 {err.why}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
