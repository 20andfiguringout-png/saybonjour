import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const PASSIVE_EXAMPLES = [
  {
    active: 'Le chef prépare le repas.',
    passive: 'Le repas est préparé par le chef.',
    activeEn: 'The chef prepares the meal.',
    passiveEn: 'The meal is prepared by the chef.',
    tense: 'présent',
  },
  {
    active: 'Le président a signé le document.',
    passive: 'Le document a été signé par le président.',
    activeEn: 'The president signed the document.',
    passiveEn: 'The document was signed by the president.',
    tense: 'passé composé',
  },
  {
    active: 'On construisait la tour.',
    passive: 'La tour était construite.',
    activeEn: 'They were building the tower.',
    passiveEn: 'The tower was being built.',
    tense: 'imparfait',
  },
  {
    active: 'Le jury a récompensé le film.',
    passive: 'Le film a été récompensé par le jury.',
    activeEn: 'The jury awarded the film.',
    passiveEn: 'The film was awarded by the jury.',
    tense: 'passé composé',
  },
]

const PASSIVE_FORMULA = [
  { step: '1. Subject', desc: 'The old object becomes the new subject', example: 'Le repas (was the object)' },
  { step: '2. être', desc: 'Conjugate être in the appropriate tense', example: 'est / a été / était / sera…' },
  { step: '3. Past participle', desc: 'Add the past participle of the main verb — agrees with new subject', example: 'préparé(e)(s)' },
  { step: '4. par + agent', desc: 'The original subject becomes the agent (optional)', example: 'par le chef' },
]

const PASSIVE_ALTERNATIVES = [
  {
    title: 'Using "on"',
    desc: 'French often avoids the passive by using "on" (one / they / people). This is very common in spoken French.',
    examples: [
      { passive: 'La loi a été votée.', active: 'On a voté la loi.', en: 'The law was passed.' },
      { passive: 'Les magasins sont fermés le dimanche.', active: 'On ferme les magasins le dimanche.', en: 'Shops are closed on Sundays.' },
    ],
  },
  {
    title: 'Reflexive verbs as passive',
    desc: 'Some verbs use a reflexive construction instead of a passive to express a passive meaning.',
    examples: [
      { passive: 'Le vin est vendu partout.', active: 'Le vin se vend partout.', en: 'Wine is sold everywhere.' },
      { passive: 'Le français est parlé ici.', active: 'Le français se parle ici.', en: 'French is spoken here.' },
    ],
  },
  {
    title: 'Par vs De',
    desc: '"Par" (by) is used with action verbs. "De" (of) is used with verbs of emotion or static states.',
    examples: [
      { passive: 'Elle est aimée de tous.', active: '', en: 'She is loved by everyone. (state)' },
      { passive: 'Il est entouré de ses amis.', active: '', en: 'He is surrounded by his friends. (state)' },
    ],
  },
]

const SENTENCES_TO_PRACTICE = [
  { active: 'Marie a écrit ce roman.', passive: 'Ce roman a été écrit par Marie.', en: 'Marie wrote this novel.' },
  { active: 'Les étudiants apprennent le français.', passive: 'Le français est appris par les étudiants.', en: 'Students learn French.' },
  { active: 'On a réparé la voiture.', passive: 'La voiture a été réparée.', en: 'The car was repaired.' },
  { active: 'Le directeur a licencié les employés.', passive: 'Les employés ont été licenciés par le directeur.', en: 'The employees were dismissed.' },
]

export default function FrenchPassiveVoice() {
  const [tab, setTab] = useState('formula')
  const [showAnswers, setShowAnswers] = useState({})

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Passive Voice | SayBonjour!" description="Master the French passive voice — la voix passive — formula, examples, alternatives, and practice." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">The Passive Voice</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La voix passive — être + past participle + par…</p>
          <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">B1 Level</span>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'formula', label: 'Formula' }, { id: 'examples', label: 'Examples' }, { id: 'alternatives', label: 'Alternatives' }, { id: 'practice', label: 'Practice' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'formula' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Passive Formula</p>
              <p className="font-mono text-lg text-burgundy-700 dark:text-burgundy-vibrant-300 font-bold">Subject + être + past participle + (par + agent)</p>
            </div>
            {PASSIVE_FORMULA.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-burgundy-600 text-sm shrink-0">{step.step}</span>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                    <code className="text-xs bg-cream-50 dark:bg-dark-warm-200 px-2 py-0.5 rounded mt-1 block font-mono text-gray-600 dark:text-gray-400">{step.example}</code>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'examples' && (
          <div className="space-y-5">
            {PASSIVE_EXAMPLES.map((ex, i) => (
              <motion.div key={ex.active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-medium">{ex.tense}</span>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Active</p>
                    <div className="flex items-center gap-1.5"><SpeakButton text={ex.active} size="sm" /><p className="text-sm italic text-gray-700 dark:text-gray-300">{ex.active}</p></div>
                    <p className="text-xs text-gray-400 mt-0.5">{ex.activeEn}</p>
                  </div>
                  <div className="bg-burgundy-50 dark:bg-burgundy-vibrant-900/10 border border-burgundy-100 dark:border-burgundy-vibrant-800 rounded-xl p-3">
                    <p className="text-xs font-bold text-burgundy-400 uppercase mb-1">Passive</p>
                    <div className="flex items-center gap-1.5"><SpeakButton text={ex.passive} size="sm" /><p className="text-sm italic text-burgundy-700 dark:text-burgundy-vibrant-300 font-medium">{ex.passive}</p></div>
                    <p className="text-xs text-gray-400 mt-0.5">{ex.passiveEn}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'alternatives' && (
          <div className="space-y-5">
            {PASSIVE_ALTERNATIVES.map((alt, i) => (
              <motion.div key={alt.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{alt.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{alt.desc}</p>
                {alt.examples.map(ex => (
                  <div key={ex.passive} className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-2 text-center">
                      <div className="flex items-center justify-center gap-1"><SpeakButton text={ex.passive} size="sm" /><p className="text-xs italic text-gray-600 dark:text-gray-400">{ex.passive}</p></div>
                    </div>
                    {ex.active && <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-2 text-center">
                      <div className="flex items-center justify-center gap-1"><SpeakButton text={ex.active} size="sm" /><p className="text-xs italic text-emerald-700 dark:text-emerald-300">{ex.active}</p></div>
                    </div>}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'practice' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Can you convert these active sentences to passive? Click "Show" to check.</p>
            {SENTENCES_TO_PRACTICE.map((s, i) => (
              <div key={s.active} className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <SpeakButton text={s.active} size="sm" />
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{s.active}"</p>
                </div>
                <p className="text-xs text-gray-400 mb-3">{s.en}</p>
                {showAnswers[i] ? (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-2 flex items-center gap-2">
                    <SpeakButton text={s.passive} size="sm" />
                    <p className="font-medium text-sm text-emerald-800 dark:text-emerald-300 italic">{s.passive}</p>
                  </motion.div>
                ) : (
                  <button onClick={() => { setShowAnswers(prev => ({ ...prev, [i]: true })); addXP(5, 'grammar') }}
                    className="px-4 py-2 rounded-xl bg-burgundy-600 text-white text-sm font-medium hover:bg-burgundy-700 transition-colors">
                    Show Passive Form
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
