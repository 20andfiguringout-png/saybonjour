import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SUBJUNCTIVE_TRIGGERS = [
  {
    category: 'Necessity & Obligation',
    triggers: [
      { expr: 'il faut que', en: 'it is necessary that', example: 'Il faut que tu viennes.' },
      { expr: 'il est nécessaire que', en: 'it is necessary that', example: 'Il est nécessaire que tu le fasses.' },
      { expr: 'il est important que', en: 'it is important that', example: 'Il est important que nous arrivions à l\'heure.' },
    ],
  },
  {
    category: 'Desire & Will',
    triggers: [
      { expr: 'vouloir que', en: 'to want that', example: 'Je veux que tu sois là.' },
      { expr: 'souhaiter que', en: 'to wish that', example: 'Je souhaite que tout aille bien.' },
      { expr: 'désirer que', en: 'to desire that', example: 'Elle désire que vous veniez.' },
      { expr: 'préférer que', en: 'to prefer that', example: 'Je préfère que tu restes.' },
    ],
  },
  {
    category: 'Emotion',
    triggers: [
      { expr: 'être content(e) que', en: 'to be glad that', example: 'Je suis content qu\'il soit là.' },
      { expr: 'avoir peur que', en: 'to be afraid that', example: 'J\'ai peur qu\'il parte.' },
      { expr: 'être surpris(e) que', en: 'to be surprised that', example: 'Elle est surprise que tu saches ça.' },
      { expr: 'regretter que', en: 'to regret that', example: 'Je regrette que tu ne puisses pas venir.' },
    ],
  },
  {
    category: 'Doubt & Uncertainty',
    triggers: [
      { expr: 'douter que', en: 'to doubt that', example: 'Je doute qu\'il soit à l\'heure.' },
      { expr: 'ne pas croire que', en: 'to not believe that', example: 'Je ne crois pas qu\'il ait raison.' },
      { expr: 'ne pas penser que', en: 'to not think that', example: 'Je ne pense pas qu\'elle vienne.' },
    ],
  },
  {
    category: 'Conjunctions',
    triggers: [
      { expr: 'bien que / quoique', en: 'although', example: 'Bien qu\'il soit tard, je reste.' },
      { expr: 'pour que / afin que', en: 'so that / in order that', example: 'Je te parle lentement pour que tu comprennes.' },
      { expr: 'avant que', en: 'before', example: 'Pars avant qu\'il soit trop tard.' },
      { expr: 'à moins que', en: 'unless', example: 'Je viendrai, à moins qu\'il pleuve.' },
      { expr: 'à condition que', en: 'on condition that', example: 'D\'accord, à condition que tu travailles.' },
    ],
  },
]

const IRREGULAR_SUBJUNCTIVES = [
  { inf: 'être', forms: [{ p: 'je', f: 'sois' }, { p: 'tu', f: 'sois' }, { p: 'il/elle', f: 'soit' }, { p: 'nous', f: 'soyons' }, { p: 'vous', f: 'soyez' }, { p: 'ils/elles', f: 'soient' }] },
  { inf: 'avoir', forms: [{ p: 'je', f: 'aie' }, { p: 'tu', f: 'aies' }, { p: 'il/elle', f: 'ait' }, { p: 'nous', f: 'ayons' }, { p: 'vous', f: 'ayez' }, { p: 'ils/elles', f: 'aient' }] },
  { inf: 'aller', forms: [{ p: 'je', f: 'aille' }, { p: 'tu', f: 'ailles' }, { p: 'il/elle', f: 'aille' }, { p: 'nous', f: 'allions' }, { p: 'vous', f: 'alliez' }, { p: 'ils/elles', f: 'aillent' }] },
  { inf: 'faire', forms: [{ p: 'je', f: 'fasse' }, { p: 'tu', f: 'fasses' }, { p: 'il/elle', f: 'fasse' }, { p: 'nous', f: 'fassions' }, { p: 'vous', f: 'fassiez' }, { p: 'ils/elles', f: 'fassent' }] },
  { inf: 'pouvoir', forms: [{ p: 'je', f: 'puisse' }, { p: 'tu', f: 'puisses' }, { p: 'il/elle', f: 'puisse' }, { p: 'nous', f: 'puissions' }, { p: 'vous', f: 'puissiez' }, { p: 'ils/elles', f: 'puissent' }] },
  { inf: 'savoir', forms: [{ p: 'je', f: 'sache' }, { p: 'tu', f: 'saches' }, { p: 'il/elle', f: 'sache' }, { p: 'nous', f: 'sachions' }, { p: 'vous', f: 'sachiez' }, { p: 'ils/elles', f: 'sachent' }] },
  { inf: 'vouloir', forms: [{ p: 'je', f: 'veuille' }, { p: 'tu', f: 'veuilles' }, { p: 'il/elle', f: 'veuille' }, { p: 'nous', f: 'voulions' }, { p: 'vous', f: 'vouliez' }, { p: 'ils/elles', f: 'veuillent' }] },
]

export default function FrenchSubjunctive() {
  const [tab, setTab] = useState('triggers')
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeVerb, setActiveVerb] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Subjunctive | SayBonjour!" description="Master the French subjunctive — when to use it, trigger expressions, and irregular subjunctive forms." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">The French Subjunctive</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le subjonctif — triggers, expressions, and irregular forms</p>
          <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">B2 Level</span>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 mb-6 text-sm text-blue-800 dark:text-blue-300">
          <strong>How to form the subjunctive:</strong> Take the <em>ils/elles</em> form of the present tense → remove <em>-ent</em> → add: <em>-e, -es, -e, -ions, -iez, -ent</em>. E.g. <em>parler</em>: ils parlent → parl- → que je parle, tu parles, il parle, nous parlions, vous parliez, ils parlent.
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'triggers', label: 'Trigger Expressions' }, { id: 'irregulars', label: 'Irregular Forms' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'triggers' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {SUBJUNCTIVE_TRIGGERS.map((c, i) => (
                <button key={c.category} onClick={() => { setActiveCategory(i); addXP(4, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {c.category}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {SUBJUNCTIVE_TRIGGERS[activeCategory].triggers.map((t, i) => (
                <motion.div key={t.expr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <SpeakButton text={t.expr} size="sm" />
                    <span className="font-bold text-sm font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{t.expr}</span>
                    <span className="text-xs text-gray-400">— {t.en}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2">
                    <SpeakButton text={t.example} size="sm" />
                    <p className="text-sm italic text-gray-600 dark:text-gray-400">"{t.example}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'irregulars' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {IRREGULAR_SUBJUNCTIVES.map((v, i) => (
                <button key={v.inf} onClick={() => { setActiveVerb(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-colors ${activeVerb === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {v.inf}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-bold text-lg font-playfair text-gray-900 dark:text-cream-50 mb-4">que {IRREGULAR_SUBJUNCTIVES[activeVerb].inf}…</h2>
              <div className="grid grid-cols-3 gap-2">
                {IRREGULAR_SUBJUNCTIVES[activeVerb].forms.map((f, i) => (
                  <motion.div key={f.p} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">{f.p}</p>
                    <div className="flex items-center justify-center gap-1">
                      <SpeakButton text={`que ${f.p} ${f.f}`} size="sm" />
                      <p className="font-bold text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{f.f}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
