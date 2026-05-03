import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const VERB_GROUPS = [
  {
    group: '-ER verbs (1st group)',
    rule: 'The largest group. Drop -er, add: -e, -es, -e, -ons, -ez, -ent',
    model: 'parler (to speak)',
    conjugation: [
      { pronoun: 'je', form: 'parle' }, { pronoun: 'tu', form: 'parles' },
      { pronoun: 'il/elle', form: 'parle' }, { pronoun: 'nous', form: 'parlons' },
      { pronoun: 'vous', form: 'parlez' }, { pronoun: 'ils/elles', form: 'parlent' },
    ],
    otherVerbs: ['aimer', 'travailler', 'habiter', 'manger', 'regarder', 'écouter', 'chercher', 'arriver', 'entrer', 'rester'],
    note: '~90% of French verbs follow this pattern. New verbs added to French are always -ER verbs.',
  },
  {
    group: '-IR verbs (2nd group)',
    rule: 'Drop -ir, add: -is, -is, -it, -issons, -issez, -issent',
    model: 'finir (to finish)',
    conjugation: [
      { pronoun: 'je', form: 'finis' }, { pronoun: 'tu', form: 'finis' },
      { pronoun: 'il/elle', form: 'finit' }, { pronoun: 'nous', form: 'finissons' },
      { pronoun: 'vous', form: 'finissez' }, { pronoun: 'ils/elles', form: 'finissent' },
    ],
    otherVerbs: ['choisir', 'grandir', 'réussir', 'obéir', 'rougir', 'vieillir'],
    note: 'These are "regular" -IR verbs. There are also irregular -IR verbs (partir, dormir) with different patterns.',
  },
  {
    group: '-RE verbs (3rd group)',
    rule: 'Drop -re, add: -s, -s, (nothing), -ons, -ez, -ent',
    model: 'vendre (to sell)',
    conjugation: [
      { pronoun: 'je', form: 'vends' }, { pronoun: 'tu', form: 'vends' },
      { pronoun: 'il/elle', form: 'vend' }, { pronoun: 'nous', form: 'vendons' },
      { pronoun: 'vous', form: 'vendez' }, { pronoun: 'ils/elles', form: 'vendent' },
    ],
    otherVerbs: ['attendre', 'entendre', 'descendre', 'répondre', 'perdre', 'rendre'],
    note: 'The il/elle form has NO ending — just the stem. "il vend" not "il vende".',
  },
]

const ESSENTIAL_IRREGULARS = [
  {
    verb: 'être (to be)',
    forms: [
      { p: 'je', f: 'suis' }, { p: 'tu', f: 'es' }, { p: 'il/elle', f: 'est' },
      { p: 'nous', f: 'sommes' }, { p: 'vous', f: 'êtes' }, { p: 'ils/elles', f: 'sont' },
    ],
  },
  {
    verb: 'avoir (to have)',
    forms: [
      { p: 'je', f: 'ai' }, { p: 'tu', f: 'as' }, { p: 'il/elle', f: 'a' },
      { p: 'nous', f: 'avons' }, { p: 'vous', f: 'avez' }, { p: 'ils/elles', f: 'ont' },
    ],
  },
  {
    verb: 'aller (to go)',
    forms: [
      { p: 'je', f: 'vais' }, { p: 'tu', f: 'vas' }, { p: 'il/elle', f: 'va' },
      { p: 'nous', f: 'allons' }, { p: 'vous', f: 'allez' }, { p: 'ils/elles', f: 'vont' },
    ],
  },
  {
    verb: 'faire (to do / make)',
    forms: [
      { p: 'je', f: 'fais' }, { p: 'tu', f: 'fais' }, { p: 'il/elle', f: 'fait' },
      { p: 'nous', f: 'faisons' }, { p: 'vous', f: 'faites' }, { p: 'ils/elles', f: 'font' },
    ],
  },
  {
    verb: 'vouloir (to want)',
    forms: [
      { p: 'je', f: 'veux' }, { p: 'tu', f: 'veux' }, { p: 'il/elle', f: 'veut' },
      { p: 'nous', f: 'voulons' }, { p: 'vous', f: 'voulez' }, { p: 'ils/elles', f: 'veulent' },
    ],
  },
  {
    verb: 'pouvoir (to be able to / can)',
    forms: [
      { p: 'je', f: 'peux' }, { p: 'tu', f: 'peux' }, { p: 'il/elle', f: 'peut' },
      { p: 'nous', f: 'pouvons' }, { p: 'vous', f: 'pouvez' }, { p: 'ils/elles', f: 'peuvent' },
    ],
  },
  {
    verb: 'devoir (must / to have to)',
    forms: [
      { p: 'je', f: 'dois' }, { p: 'tu', f: 'dois' }, { p: 'il/elle', f: 'doit' },
      { p: 'nous', f: 'devons' }, { p: 'vous', f: 'devez' }, { p: 'ils/elles', f: 'doivent' },
    ],
  },
  {
    verb: 'savoir (to know a fact)',
    forms: [
      { p: 'je', f: 'sais' }, { p: 'tu', f: 'sais' }, { p: 'il/elle', f: 'sait' },
      { p: 'nous', f: 'savons' }, { p: 'vous', f: 'savez' }, { p: 'ils/elles', f: 'savent' },
    ],
  },
]

export default function FrenchVerbs() {
  const [tab, setTab] = useState('groups')
  const [activeGroup, setActiveGroup] = useState(0)
  const [activeIrr, setActiveIrr] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Verb Groups | SayBonjour!" description="Master French verb groups — -ER, -IR, -RE regular verbs and essential irregular verbs with full conjugations." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Verb Groups</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les groupes de verbes — regular and essential irregular verbs</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'groups', label: 'Regular Verbs' }, { id: 'irregulars', label: 'Essential Irregulars' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'groups' && (
          <>
            <div className="flex gap-2 mb-6 flex-wrap">
              {VERB_GROUPS.map((g, i) => (
                <button key={g.group} onClick={() => { setActiveGroup(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.group.split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-cream-50 font-playfair mb-1">{VERB_GROUPS[activeGroup].group}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{VERB_GROUPS[activeGroup].rule}</p>
              <p className="text-xs font-bold text-gray-400 uppercase mb-3">Model: <span className="text-burgundy-600">{VERB_GROUPS[activeGroup].model}</span></p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {VERB_GROUPS[activeGroup].conjugation.map((c, i) => (
                  <motion.div key={c.pronoun} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">{c.pronoun}</p>
                    <div className="flex items-center justify-center gap-1">
                      <SpeakButton text={`${c.pronoun} ${c.form}`} size="sm" />
                      <p className="font-bold text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{c.form}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Other {VERB_GROUPS[activeGroup].group.split(' ')[0]} verbs</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {VERB_GROUPS[activeGroup].otherVerbs.map(v => (
                    <div key={v} className="flex items-center gap-1 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-2 py-1">
                      <SpeakButton text={v} size="sm" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Note</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">{VERB_GROUPS[activeGroup].note}</p>
              </div>
            </div>
          </>
        )}

        {tab === 'irregulars' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ESSENTIAL_IRREGULARS.map((v, i) => (
                <button key={v.verb} onClick={() => { setActiveIrr(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-colors ${activeIrr === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {v.verb.split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-cream-50 font-playfair mb-4">{ESSENTIAL_IRREGULARS[activeIrr].verb}</h2>
              <div className="grid grid-cols-3 gap-2">
                {ESSENTIAL_IRREGULARS[activeIrr].forms.map((f, i) => (
                  <motion.div key={f.p} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">{f.p}</p>
                    <div className="flex items-center justify-center gap-1">
                      <SpeakButton text={`${f.p} ${f.f}`} size="sm" />
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
