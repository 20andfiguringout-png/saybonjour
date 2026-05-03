import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, CheckCircle, AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const NEGATION_TYPES = [
  {
    type: 'ne…pas',
    meaning: 'not (general negation)',
    rule: 'ne + verb + pas — the most common form',
    level: 'A1',
    examples: [
      { pos: 'Je mange.', neg: 'Je ne mange pas.', en: 'I don\'t eat.' },
      { pos: 'Elle parle anglais.', neg: 'Elle ne parle pas anglais.', en: 'She doesn\'t speak English.' },
      { pos: 'Nous comprenons.', neg: 'Nous ne comprenons pas.', en: 'We don\'t understand.' },
      { pos: 'Il est médecin.', neg: 'Il n\'est pas médecin.', en: 'He\'s not a doctor.' },
    ],
    note: 'Before a vowel or h, ne → n\'. Example: il n\'a pas, elle n\'est pas.',
  },
  {
    type: 'ne…jamais',
    meaning: 'never',
    rule: 'ne + verb + jamais',
    level: 'A2',
    examples: [
      { pos: 'Elle fume.', neg: 'Elle ne fume jamais.', en: 'She never smokes.' },
      { pos: 'Tu mens.', neg: 'Tu ne mens jamais.', en: 'You never lie.' },
      { pos: 'Il voyage.', neg: 'Il ne voyage jamais.', en: 'He never travels.' },
    ],
    note: '"Jamais" alone (without ne) means "ever" in questions: "Tu as jamais essayé ?" = "Have you ever tried?"',
  },
  {
    type: 'ne…plus',
    meaning: 'no longer / not anymore',
    rule: 'ne + verb + plus',
    level: 'A2',
    examples: [
      { pos: 'Je travaille là-bas.', neg: 'Je ne travaille plus là-bas.', en: 'I no longer work there.' },
      { pos: 'Il habite à Paris.', neg: 'Il n\'habite plus à Paris.', en: 'He doesn\'t live in Paris anymore.' },
      { pos: 'Nous avons du lait.', neg: 'Nous n\'avons plus de lait.', en: 'We don\'t have any more milk.' },
    ],
    note: 'Common in everyday speech: "C\'est plus pareil" = "It\'s not the same anymore."',
  },
  {
    type: 'ne…rien',
    meaning: 'nothing / not anything',
    rule: 'ne + verb + rien',
    level: 'A2',
    examples: [
      { pos: 'Je vois quelque chose.', neg: 'Je ne vois rien.', en: 'I don\'t see anything / I see nothing.' },
      { pos: 'Elle dit quelque chose.', neg: 'Elle ne dit rien.', en: 'She says nothing.' },
      { pos: 'Il fait quelque chose.', neg: 'Il ne fait rien.', en: 'He\'s not doing anything.' },
    ],
    note: '"Rien" can be subject: "Rien ne va" = "Nothing is working / everything is wrong."',
  },
  {
    type: 'ne…personne',
    meaning: 'nobody / not anyone',
    rule: 'ne + verb + personne',
    level: 'B1',
    examples: [
      { pos: 'Je connais quelqu\'un ici.', neg: 'Je ne connais personne ici.', en: 'I don\'t know anyone here.' },
      { pos: 'Elle a appelé quelqu\'un.', neg: 'Elle n\'a appelé personne.', en: 'She hasn\'t called anyone.' },
      { pos: 'Il voit quelqu\'un.', neg: 'Il ne voit personne.', en: 'He doesn\'t see anyone.' },
    ],
    note: '"Personne" after the past participle in compound tenses. "Personne ne" as subject: "Personne n\'est venu" = "Nobody came."',
  },
  {
    type: 'ne…que',
    meaning: 'only',
    rule: 'ne + verb + que + [restricted element]',
    level: 'B1',
    examples: [
      { pos: 'J\'ai un euro.', neg: 'Je n\'ai qu\'un euro.', en: 'I only have one euro.' },
      { pos: 'Il mange le dessert.', neg: 'Il ne mange que le dessert.', en: 'He only eats dessert.' },
      { pos: 'Elle parle français.', neg: 'Elle ne parle que français.', en: 'She only speaks French.' },
    ],
    note: '"Ne…que" is NOT a true negative — it means "only". Un euro remains un (not de).',
  },
  {
    type: 'ne…ni…ni',
    meaning: 'neither…nor',
    rule: 'ne + verb + ni [X] + ni [Y]',
    level: 'B1',
    examples: [
      { pos: 'Il boit du café et du thé.', neg: 'Il ne boit ni café ni thé.', en: 'He drinks neither coffee nor tea.' },
      { pos: 'Elle aime le sport et la musique.', neg: 'Elle n\'aime ni le sport ni la musique.', en: 'She likes neither sport nor music.' },
    ],
    note: 'After ni, articles (un, une, du, de la, des) are omitted.',
  },
  {
    type: 'ne…aucun(e)',
    meaning: 'no / not a single / none',
    rule: 'ne + verb + aucun/aucune + noun',
    level: 'B1',
    examples: [
      { pos: 'J\'ai des amis ici.', neg: 'Je n\'ai aucun ami ici.', en: 'I have no friends here.' },
      { pos: 'Il y a des solutions.', neg: 'Il n\'y a aucune solution.', en: 'There\'s no solution.' },
      { pos: 'Elle a des regrets.', neg: 'Elle n\'a aucun regret.', en: 'She has no regrets at all.' },
    ],
    note: '"Aucun" agrees in gender with the noun (aucun/aucune). Always singular.',
  },
]

const SPOKEN_SHORTCUTS = [
  { standard: 'Je ne sais pas.', spoken: 'Je sais pas. / Chais pas.', note: 'Dropping "ne" is extremely common in spoken French' },
  { standard: 'Je ne comprends pas.', spoken: 'Je comprends pas.', note: 'Standard in casual speech' },
  { standard: 'Ce n\'est pas grave.', spoken: 'C\'est pas grave.', note: 'Heard constantly in everyday French' },
  { standard: 'Tu ne peux pas.', spoken: 'Tu peux pas.', note: 'Casual usage' },
  { standard: 'Il n\'y a pas.', spoken: 'Y\'a pas. / Il y a pas.', note: '"Y\'a pas" is very informal' },
]

const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300', A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300', B1: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' }

export default function FrenchNegation() {
  const [activeType, setActiveType] = useState(0)
  const [tab, setTab] = useState('types')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Negation | SayBonjour!" description="Master French negation — ne pas, ne jamais, ne plus, ne rien, ne personne, ne que, ni, aucun — with examples." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Negation</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La négation — ne…pas, ne…jamais, ne…plus, and all the rest</p>
        </div>

        <div className="flex gap-3 mb-6">
          {[{ id: 'types', label: 'Negation Types' }, { id: 'spoken', label: 'Spoken Shortcuts' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'types' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {NEGATION_TYPES.map((n, i) => (
                <button key={n.type} onClick={() => { setActiveType(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors font-mono ${activeType === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {n.type}
                </button>
              ))}
            </div>

            {NEGATION_TYPES[activeType] && (
              <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono font-bold text-xl text-burgundy-700 dark:text-burgundy-vibrant-300">{NEGATION_TYPES[activeType].type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[NEGATION_TYPES[activeType].level]}`}>{NEGATION_TYPES[activeType].level}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{NEGATION_TYPES[activeType].meaning}</p>
                <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2 mb-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  {NEGATION_TYPES[activeType].rule}
                </div>

                <div className="space-y-3 mb-4">
                  {NEGATION_TYPES[activeType].examples.map((ex, i) => (
                    <motion.div key={ex.neg} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2 flex items-center gap-2">
                        <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 italic">{ex.pos}</span>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/10 rounded-xl px-3 py-2 flex items-center gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <X size={12} className="text-red-400 shrink-0" />
                            <span className="text-sm font-medium text-gray-800 dark:text-cream-50 italic">{ex.neg}</span>
                            <SpeakButton text={ex.neg} size="sm" />
                          </div>
                          <span className="text-xs text-gray-400 ml-4">{ex.en}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Note</p>
                  <p className="text-amber-800 dark:text-amber-300">{NEGATION_TYPES[activeType].note}</p>
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'spoken' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300 mb-2">
              In everyday spoken French, the <strong>ne</strong> is almost always dropped. You'll still use it in writing and formal speech, but in conversation omitting it sounds natural.
            </div>
            {SPOKEN_SHORTCUTS.map((s, i) => (
              <motion.div key={s.standard} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div className="bg-gray-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2">
                    <p className="text-xs text-gray-400 mb-0.5">Written / formal</p>
                    <div className="flex items-center gap-2">
                      <SpeakButton text={s.standard} size="sm" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">{s.standard}</p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl px-3 py-2 border border-emerald-100 dark:border-emerald-800">
                    <p className="text-xs text-emerald-600 mb-0.5">Spoken</p>
                    <div className="flex items-center gap-2">
                      <SpeakButton text={s.spoken.split('.')[0]} size="sm" />
                      <p className="text-sm font-medium text-gray-800 dark:text-cream-50 italic">{s.spoken}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 italic">💡 {s.note}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
