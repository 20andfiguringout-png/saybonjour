import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SUBJUNCTIVE_TRIGGERS = [
  {
    category: 'Necessity & Obligation',
    color: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-700',
    triggers: [
      { expr: 'il faut que', en: 'it is necessary that', example: 'Il faut que tu viennes.', note: 'The most common subjunctive trigger — memorise this one first' },
      { expr: 'il est nécessaire que', en: 'it is necessary that', example: 'Il est nécessaire que tu le fasses.' },
      { expr: 'il est indispensable que', en: 'it is essential that', example: 'Il est indispensable que nous trouvions une solution.' },
      { expr: 'il est important que', en: 'it is important that', example: 'Il est important que nous arrivions à l\'heure.' },
      { expr: 'il est impératif que', en: 'it is imperative that', example: 'Il est impératif que vous répondiez.' },
      { expr: 'il vaut mieux que', en: 'it is better that', example: 'Il vaut mieux que tu restes ici.' },
      { expr: 'il est urgent que', en: 'it is urgent that', example: 'Il est urgent que nous agissions.' },
    ],
  },
  {
    category: 'Desire & Will',
    color: 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-700',
    triggers: [
      { expr: 'vouloir que', en: 'to want that', example: 'Je veux que tu sois là.', note: 'Very common — "Je veux que…" triggers subjunctive even in casual speech' },
      { expr: 'souhaiter que', en: 'to wish that', example: 'Je souhaite que tout aille bien.' },
      { expr: 'désirer que', en: 'to desire that', example: 'Elle désire que vous veniez.' },
      { expr: 'préférer que', en: 'to prefer that', example: 'Je préfère que tu restes.' },
      { expr: 'exiger que', en: 'to demand / require that', example: 'Il exige que les règles soient respectées.', note: '"Exiger" is a strong verb — formal contexts' },
      { expr: 'ordonner que', en: 'to order that', example: 'Le médecin ordonne que vous vous reposiez.' },
      { expr: 'demander que', en: 'to ask / request that', example: 'Je vous demande que vous soyez ponctuels.' },
      { expr: 'tenir à ce que', en: 'to insist on / care about', example: 'Je tiens à ce que tu réussisses.' },
    ],
  },
  {
    category: 'Emotion',
    color: 'bg-pink-50 dark:bg-pink-900/10 border-pink-200 dark:border-pink-700',
    triggers: [
      { expr: 'être content(e) que', en: 'to be glad that', example: 'Je suis content qu\'il soit là.' },
      { expr: 'avoir peur que', en: 'to be afraid that', example: 'J\'ai peur qu\'il parte.' },
      { expr: 'être surpris(e) que', en: 'to be surprised that', example: 'Elle est surprise que tu saches ça.' },
      { expr: 'regretter que', en: 'to regret that', example: 'Je regrette que tu ne puisses pas venir.' },
      { expr: 'être triste que', en: 'to be sad that', example: 'Je suis triste qu\'elle soit partie.' },
      { expr: 'être heureux/heureuse que', en: 'to be happy that', example: 'Je suis heureux qu\'il aille mieux.' },
      { expr: 'craindre que', en: 'to fear that', example: 'Elle craint qu\'il ne vienne pas.', note: '"Craindre" sometimes uses "ne" expletif before the verb — correct but optional' },
      { expr: 'être déçu(e) que', en: 'to be disappointed that', example: 'Il est déçu que vous n\'ayez pas réussi.' },
      { expr: 'être fier / fière que', en: 'to be proud that', example: 'Je suis fière que tu aies réussi.' },
      { expr: 's\'étonner que', en: 'to be astonished that', example: 'Je m\'étonne qu\'il fasse ça.' },
    ],
  },
  {
    category: 'Doubt & Uncertainty',
    color: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-700',
    triggers: [
      { expr: 'douter que', en: 'to doubt that', example: 'Je doute qu\'il soit à l\'heure.' },
      { expr: 'ne pas croire que', en: 'to not believe that', example: 'Je ne crois pas qu\'il ait raison.', note: '"Croire que" + indicative (belief), but "ne pas croire que" + subjunctive (doubt)' },
      { expr: 'ne pas penser que', en: 'to not think that', example: 'Je ne pense pas qu\'elle vienne.' },
      { expr: 'il est possible que', en: 'it is possible that', example: 'Il est possible qu\'il pleuve demain.' },
      { expr: 'il est impossible que', en: 'it is impossible that', example: 'Il est impossible qu\'elle sache ça.' },
      { expr: 'il est peu probable que', en: 'it is unlikely that', example: 'Il est peu probable qu\'ils acceptent.' },
      { expr: 'il semble que', en: 'it seems that', example: 'Il semble qu\'il y ait un problème.', note: '"Il me semble que" + indicative — note the difference!' },
    ],
  },
  {
    category: 'Conjunctions',
    color: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-700',
    triggers: [
      { expr: 'bien que / quoique', en: 'although / even though', example: 'Bien qu\'il soit tard, je reste.', note: '"Bien que" is extremely common in written French — a key conjunction' },
      { expr: 'pour que / afin que', en: 'so that / in order that', example: 'Je te parle lentement pour que tu comprennes.' },
      { expr: 'avant que', en: 'before', example: 'Pars avant qu\'il soit trop tard.', note: 'Note: "après que" + indicative (not subjunctive) — a common mistake' },
      { expr: 'à moins que', en: 'unless', example: 'Je viendrai, à moins qu\'il pleuve.' },
      { expr: 'à condition que', en: 'on condition that / provided that', example: 'D\'accord, à condition que tu travailles.' },
      { expr: 'jusqu\'à ce que', en: 'until', example: 'Attends jusqu\'à ce qu\'il arrive.' },
      { expr: 'sans que', en: 'without (someone doing something)', example: 'Il est parti sans que je le sache.' },
      { expr: 'pourvu que', en: 'provided that / as long as', example: 'Pourvu qu\'il fasse beau demain !', note: '"Pourvu que" is also used in exclamations expressing a hope' },
      { expr: 'de peur que', en: 'for fear that', example: 'Je parle doucement de peur qu\'il se réveille.' },
      { expr: 'en attendant que', en: 'while waiting for / until', example: 'Lis en attendant qu\'il arrive.' },
    ],
  },
  {
    category: 'Superlatives & Restriction',
    color: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-700',
    triggers: [
      { expr: 'le seul / la seule… qui/que', en: 'the only one… who/that', example: 'C\'est le seul ami que j\'aie.', note: 'Subjunctive because uniqueness implies subjectivity — it\'s a judgment' },
      { expr: 'le premier / la première… qui', en: 'the first… who', example: 'C\'est le premier livre qui m\'ait vraiment ému.' },
      { expr: 'le meilleur… qui/que', en: 'the best… who/that', example: 'C\'est le meilleur vin que j\'aie jamais bu.' },
      { expr: 'il n\'y a personne qui', en: 'there is no one who', example: 'Il n\'y a personne qui puisse l\'aider.' },
      { expr: 'il n\'y a rien qui', en: 'there is nothing that', example: 'Il n\'y a rien que nous puissions faire.' },
    ],
  },
]

const IRREGULAR_SUBJUNCTIVES = [
  { inf: 'être', en: 'to be', forms: [{ p: 'je', f: 'sois' }, { p: 'tu', f: 'sois' }, { p: 'il/elle', f: 'soit' }, { p: 'nous', f: 'soyons' }, { p: 'vous', f: 'soyez' }, { p: 'ils/elles', f: 'soient' }] },
  { inf: 'avoir', en: 'to have', forms: [{ p: 'je', f: 'aie' }, { p: 'tu', f: 'aies' }, { p: 'il/elle', f: 'ait' }, { p: 'nous', f: 'ayons' }, { p: 'vous', f: 'ayez' }, { p: 'ils/elles', f: 'aient' }] },
  { inf: 'aller', en: 'to go', forms: [{ p: 'je', f: 'aille' }, { p: 'tu', f: 'ailles' }, { p: 'il/elle', f: 'aille' }, { p: 'nous', f: 'allions' }, { p: 'vous', f: 'alliez' }, { p: 'ils/elles', f: 'aillent' }] },
  { inf: 'faire', en: 'to do / make', forms: [{ p: 'je', f: 'fasse' }, { p: 'tu', f: 'fasses' }, { p: 'il/elle', f: 'fasse' }, { p: 'nous', f: 'fassions' }, { p: 'vous', f: 'fassiez' }, { p: 'ils/elles', f: 'fassent' }] },
  { inf: 'pouvoir', en: 'to be able to', forms: [{ p: 'je', f: 'puisse' }, { p: 'tu', f: 'puisses' }, { p: 'il/elle', f: 'puisse' }, { p: 'nous', f: 'puissions' }, { p: 'vous', f: 'puissiez' }, { p: 'ils/elles', f: 'puissent' }] },
  { inf: 'savoir', en: 'to know', forms: [{ p: 'je', f: 'sache' }, { p: 'tu', f: 'saches' }, { p: 'il/elle', f: 'sache' }, { p: 'nous', f: 'sachions' }, { p: 'vous', f: 'sachiez' }, { p: 'ils/elles', f: 'sachent' }] },
  { inf: 'vouloir', en: 'to want', forms: [{ p: 'je', f: 'veuille' }, { p: 'tu', f: 'veuilles' }, { p: 'il/elle', f: 'veuille' }, { p: 'nous', f: 'voulions' }, { p: 'vous', f: 'vouliez' }, { p: 'ils/elles', f: 'veuillent' }] },
  { inf: 'valoir', en: 'to be worth', forms: [{ p: 'je', f: 'vaille' }, { p: 'tu', f: 'vailles' }, { p: 'il/elle', f: 'vaille' }, { p: 'nous', f: 'valions' }, { p: 'vous', f: 'valiez' }, { p: 'ils/elles', f: 'vaillent' }] },
]

const REGULAR_FORMATION = [
  { verb: 'parler', step1: 'ils parlent', stem: 'parl-', forms: ['parle', 'parles', 'parle', 'parlions', 'parliez', 'parlent'] },
  { verb: 'finir', step1: 'ils finissent', stem: 'finiss-', forms: ['finisse', 'finisses', 'finisse', 'finissions', 'finissiez', 'finissent'] },
  { verb: 'vendre', step1: 'ils vendent', stem: 'vend-', forms: ['vende', 'vendes', 'vende', 'vendions', 'vendiez', 'vendent'] },
  { verb: 'prendre', step1: 'ils prennent', stem: 'prenn-', forms: ['prenne', 'prennes', 'prenne', 'prenions', 'preniez', 'prennent'] },
  { verb: 'venir', step1: 'ils viennent', stem: 'vienn-', forms: ['vienne', 'viennes', 'vienne', 'venions', 'veniez', 'viennent'] },
]

const PRONOUNS = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles']

const COMMON_MISTAKES = [
  { mistake: 'After "après que"', correct: 'Après qu\'il est arrivé (indicative)', wrong: '✗ Après qu\'il soit arrivé', note: '"Après que" takes the indicative — it describes a completed fact, not uncertainty. This is one of the most common errors even for native speakers.' },
  { mistake: 'When the subject is the same', correct: 'Je veux aller au cinéma (infinitive)', wrong: '✗ Je veux que j\'aille au cinéma', note: 'When both verbs have the same subject, use the infinitive, not the subjunctive: "Je veux partir" not "Je veux que je parte".' },
  { mistake: 'After "espérer que"', correct: 'J\'espère qu\'il viendra (indicative)', wrong: '✗ J\'espère qu\'il vienne', note: '"Espérer que" takes the indicative in modern standard French — though you will hear the subjunctive in informal speech.' },
  { mistake: 'Confusing "soit" (subj.) with "est" (ind.)', correct: 'Je doute qu\'il soit là (subjunctive)', wrong: '✗ Je doute qu\'il est là', note: 'After expressions of doubt, always use the subjunctive. "Être" in the subjunctive is "soit", not "est".' },
]

export default function FrenchSubjunctive() {
  const [tab, setTab] = useState('triggers')
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeVerb, setActiveVerb] = useState(0)
  const [activeRegVerb, setActiveRegVerb] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Subjunctive | SayBonjour!" description="Master the French subjunctive — when to use it, trigger expressions, irregular forms, regular formation, and common mistakes." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">The French Subjunctive</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le subjonctif — triggers, formations, irregular forms, and common mistakes</p>
          <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">B1–B2 Level</span>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 mb-6 text-sm text-blue-800 dark:text-blue-300">
          <strong>How to form the subjunctive (regular verbs):</strong> Take the <em>ils/elles</em> present tense form → remove <em>-ent</em> → add endings: <em>-e, -es, -e, -ions, -iez, -ent</em>.
          Example: <em>parler</em>: ils parlent → parl- → que je <strong>parle</strong>, tu <strong>parles</strong>, il <strong>parle</strong>, nous <strong>parlions</strong>, vous <strong>parliez</strong>, ils <strong>parlent</strong>.
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'triggers', label: 'Trigger Expressions' },
            { id: 'formation', label: 'Regular Formation' },
            { id: 'irregulars', label: 'Irregular Forms' },
            { id: 'mistakes', label: 'Common Mistakes' },
          ].map(t => (
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
                  {SUBJUNCTIVE_TRIGGERS[i].category}
                </button>
              ))}
            </div>
            <div className={`rounded-xl border px-4 py-2 mb-4 text-xs font-medium text-gray-600 dark:text-gray-300 ${SUBJUNCTIVE_TRIGGERS[activeCategory].color}`}>
              {SUBJUNCTIVE_TRIGGERS[activeCategory].category} — {SUBJUNCTIVE_TRIGGERS[activeCategory].triggers.length} expressions
            </div>
            <div className="space-y-3">
              {SUBJUNCTIVE_TRIGGERS[activeCategory].triggers.map((t, i) => (
                <motion.div key={t.expr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                  onClick={() => addXP(3, 'grammar')}>
                  <div className="flex items-center gap-2 mb-2">
                    <SpeakButton text={t.expr} size="sm" />
                    <span className="font-bold text-sm font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{t.expr}</span>
                    <span className="text-xs text-gray-400">— {t.en}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2">
                    <SpeakButton text={t.example} size="sm" />
                    <p className="text-sm italic text-gray-600 dark:text-gray-400">"{t.example}"</p>
                  </div>
                  {t.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-1.5 ml-1">💡 {t.note}</p>}
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'formation' && (
          <>
            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-3 mb-6 text-sm text-emerald-800 dark:text-emerald-300">
              <strong>Rule:</strong> Find the <em>ils/elles</em> present tense form → remove <em>-ent</em> → this is your stem → add the subjunctive endings. The <em>nous</em> and <em>vous</em> forms are the same as the imperfect tense.
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {REGULAR_FORMATION.map((v, i) => (
                <button key={v.verb} onClick={() => { setActiveRegVerb(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-colors ${activeRegVerb === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {v.verb}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg font-playfair text-gray-900 dark:text-cream-50">que {REGULAR_FORMATION[activeRegVerb].verb}…</h2>
                <div className="text-right text-xs text-gray-400">
                  <p>{REGULAR_FORMATION[activeRegVerb].step1}</p>
                  <p>→ stem: <strong className="text-burgundy-600">{REGULAR_FORMATION[activeRegVerb].stem}</strong></p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {REGULAR_FORMATION[activeRegVerb].forms.map((f, i) => (
                  <motion.div key={PRONOUNS[i]} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">{PRONOUNS[i]}</p>
                    <div className="flex items-center justify-center gap-1">
                      <SpeakButton text={`que ${PRONOUNS[i]} ${f}`} size="sm" />
                      <p className="font-bold text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{f}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'irregulars' && (
          <>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-6 text-sm text-amber-800 dark:text-amber-300">
              These verbs don\'t follow the regular pattern — their subjunctive forms must be memorised. <strong>Être</strong> and <strong>avoir</strong> are the most critical.
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {IRREGULAR_SUBJUNCTIVES.map((v, i) => (
                <button key={v.inf} onClick={() => { setActiveVerb(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-colors ${activeVerb === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {v.inf}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-lg font-playfair text-gray-900 dark:text-cream-50">que {IRREGULAR_SUBJUNCTIVES[activeVerb].inf}…</h2>
                <span className="text-xs text-gray-400 italic">— {IRREGULAR_SUBJUNCTIVES[activeVerb].en}</span>
              </div>
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

        {tab === 'mistakes' && (
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-700 rounded-xl px-4 py-3 mb-2 text-sm text-red-800 dark:text-red-300">
              These are the most frequent subjunctive errors — even among advanced learners and native speakers. Mastering these will set you apart.
            </div>
            {COMMON_MISTAKES.map((item, i) => (
              <motion.div key={item.mistake} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(4, 'grammar')}>
                <h3 className="font-bold text-gray-900 dark:text-cream-50 mb-3">{item.mistake}</h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg px-3 py-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <div>
                      <SpeakButton text={item.correct.replace('✓ ', '')} size="sm" />
                      <span className="text-emerald-700 dark:text-emerald-300">{item.correct}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/10 rounded-lg px-3 py-2">
                    <span className="text-red-600 font-bold shrink-0">✗</span>
                    <span className="text-red-700 dark:text-red-300 line-through">{item.wrong}</span>
                  </div>
                </div>
                <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-2">💡 {item.note}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
