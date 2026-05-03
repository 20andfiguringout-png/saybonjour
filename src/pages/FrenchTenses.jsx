import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const TENSES = [
  {
    name: 'Présent',
    en: 'Present tense',
    level: 'A1',
    use: 'Actions happening now, habits, general truths.',
    formula: 'Verb stem + present endings',
    examples: [
      { fr: 'Je mange une pomme.', en: 'I am eating an apple / I eat an apple.' },
      { fr: 'Elle travaille à Paris.', en: 'She works in Paris.' },
      { fr: 'Nous aimons la musique.', en: 'We love music.' },
    ],
    tip: 'The French present covers both "I eat" and "I am eating" — one tense does both jobs.',
  },
  {
    name: 'Passé composé',
    en: 'Perfect tense (completed past)',
    level: 'A2',
    use: 'Completed past actions — specific events, things that happened.',
    formula: 'avoir/être (present) + past participle',
    examples: [
      { fr: 'J\'ai mangé une pomme.', en: 'I ate / I have eaten an apple.' },
      { fr: 'Elle est allée au cinéma.', en: 'She went to the cinema.' },
      { fr: 'Nous avons vu ce film.', en: 'We saw / have seen this film.' },
    ],
    tip: 'Uses "être" with verbs of movement and state change (aller, venir, partir, arriver, naître, mourir, etc.) — participle agrees with subject.',
  },
  {
    name: 'Imparfait',
    en: 'Imperfect tense (past description)',
    level: 'A2',
    use: 'Ongoing past states, habits, descriptions, background in stories.',
    formula: 'nous-stem (present) + -ais, -ais, -ait, -ions, -iez, -aient',
    examples: [
      { fr: 'Je mangeais une pomme quand il est arrivé.', en: 'I was eating an apple when he arrived.' },
      { fr: 'Quand j\'étais enfant, j\'habitais à Lyon.', en: 'When I was a child, I lived in Lyon.' },
      { fr: 'Il faisait beau ce jour-là.', en: 'The weather was nice that day.' },
    ],
    tip: 'Imparfait = background / ongoing. Passé composé = foreground / event. Both often appear together in the same story.',
  },
  {
    name: 'Futur proche',
    en: 'Near future (going to)',
    level: 'A1',
    use: 'Imminent or planned future actions.',
    formula: 'aller (present) + infinitive',
    examples: [
      { fr: 'Je vais manger une pomme.', en: 'I\'m going to eat an apple.' },
      { fr: 'Elle va partir demain.', en: 'She\'s going to leave tomorrow.' },
      { fr: 'Nous allons voir ce film ce soir.', en: 'We\'re going to see this film tonight.' },
    ],
    tip: 'Much more common than the simple future in everyday speech. "Aller + infinitive" is the go-to future in conversation.',
  },
  {
    name: 'Futur simple',
    en: 'Simple future',
    level: 'B1',
    use: 'Future events (more formal/written), predictions, conditions.',
    formula: 'Infinitive + -ai, -as, -a, -ons, -ez, -ont',
    examples: [
      { fr: 'Je mangerai une pomme.', en: 'I will eat an apple.' },
      { fr: 'Elle partira demain.', en: 'She will leave tomorrow.' },
      { fr: 'S\'il fait beau, nous sortirons.', en: 'If the weather is nice, we will go out.' },
    ],
    tip: 'Used in formal writing, news, and for emphasis. In speech, "futur proche" is preferred. Irregular stems: être → ser-, avoir → aur-, aller → ir-.',
  },
  {
    name: 'Conditionnel',
    en: 'Conditional (would)',
    level: 'B1',
    use: 'Hypothetical situations, polite requests, reported speech.',
    formula: 'Future stem + imperfect endings (-ais, -ais, -ait, -ions, -iez, -aient)',
    examples: [
      { fr: 'Je voudrais un café, s\'il vous plaît.', en: 'I would like a coffee, please.' },
      { fr: 'Si j\'avais de l\'argent, je voyagerais.', en: 'If I had money, I would travel.' },
      { fr: 'Il a dit qu\'il viendrait.', en: 'He said he would come.' },
    ],
    tip: '"Je voudrais" is the polite way to order or ask for something — much gentler than "je veux" (I want).',
  },
  {
    name: 'Subjonctif',
    en: 'Subjunctive mood',
    level: 'B2',
    use: 'Doubt, emotion, necessity, opinion — after certain expressions and conjunctions.',
    formula: 'ils-stem (present) + -e, -es, -e, -ions, -iez, -ent',
    examples: [
      { fr: 'Il faut que tu viennes.', en: 'You must come. (lit. It\'s necessary that you come)' },
      { fr: 'Je veux que tu sois là.', en: 'I want you to be there.' },
      { fr: 'Bien qu\'il soit tard, je reste.', en: 'Although it\'s late, I\'m staying.' },
    ],
    tip: 'Triggered after: il faut que, vouloir que, bien que, pour que, avant que, and expressions of doubt/emotion. Irregular: être → sois, avoir → aie.',
  },
]

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
  A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  B1: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
  B2: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
}

export default function FrenchTenses() {
  const [activeTense, setActiveTense] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Tenses | SayBonjour!" description="Master French tenses — présent, passé composé, imparfait, futur, conditionnel, subjonctif — with examples." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Tenses</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les temps — présent, passé composé, imparfait, futur, conditionnel, subjonctif</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {TENSES.map((t, i) => (
            <button key={t.name} onClick={() => { setActiveTense(i); addXP(3, 'grammar') }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${activeTense === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.name}
              <span className={`px-1 py-0.5 rounded text-xs font-bold ${activeTense === i ? 'bg-white/20 text-white' : LEVEL_COLORS[t.level]}`}>{t.level}</span>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-bold text-xl font-playfair text-gray-900 dark:text-cream-50">{TENSES[activeTense].name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[TENSES[activeTense].level]}`}>{TENSES[activeTense].level}</span>
            </div>
            <p className="text-sm text-burgundy-600 dark:text-burgundy-vibrant-300 italic">{TENSES[activeTense].en}</p>
          </div>

          <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">When to use</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{TENSES[activeTense].use}</p>
          </div>

          <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Formula</p>
            <p className="text-sm font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{TENSES[activeTense].formula}</p>
          </div>

          <div className="space-y-2 mb-4">
            {TENSES[activeTense].examples.map((ex, i) => (
              <motion.div key={ex.fr} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 border border-gray-100 dark:border-dark-warm-200 rounded-xl px-4 py-3">
                <SpeakButton text={ex.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{ex.fr}"</p>
                  <p className="text-xs text-gray-400">{ex.en}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Key tip</p>
            <p className="text-sm text-amber-800 dark:text-amber-300">{TENSES[activeTense].tip}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={() => setActiveTense(i => Math.max(0, i - 1))} disabled={activeTense === 0}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-dark-warm-50 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors">
            ← Previous
          </button>
          <button onClick={() => setActiveTense(i => Math.min(TENSES.length - 1, i + 1))} disabled={activeTense === TENSES.length - 1}
            className="flex-1 py-2.5 rounded-xl bg-burgundy-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-burgundy-700 transition-colors">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
