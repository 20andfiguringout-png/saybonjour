import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const TU_CONTEXTS = [
  { context: 'Children', desc: 'Always use "tu" with children — regardless of age difference or formality.' },
  { context: 'Close friends', desc: 'Once friendship is established, "tu" is standard. The switch usually happens after the first few meetings.' },
  { context: 'Family members', desc: 'Always "tu" with immediate and extended family — including in-laws, aunts, uncles, cousins.' },
  { context: 'Students / peers', desc: 'University students typically use "tu" with each other immediately — even on first meeting.' },
  { context: 'Colleagues (modern workplaces)', desc: 'Many start-ups, creative agencies, and younger companies default to "tu" immediately — especially in Paris.' },
  { context: 'Online communities / social media', desc: '"Tu" is almost universal in online interactions — even between strangers. Even formal YouTube channels often use "tu".' },
  { context: 'God / prayer', desc: '"Tu" is used to address God in French Catholic and Protestant prayer tradition.' },
  { context: 'Animals', desc: 'People speak to their pets in "tu" — naturally. This shows "tu" signals intimacy rather than just informality.' },
]

const VOUS_CONTEXTS = [
  { context: 'Strangers (adult)', desc: 'Default when meeting someone new as an adult. Switch to "tu" only when explicitly invited.' },
  { context: 'Older people', desc: 'Always use "vous" with anyone notably older than you — even a friend\'s parents until they invite tu.' },
  { context: 'Professionals (doctors, lawyers)', desc: 'Doctors, lawyers, judges, teachers (in school), government officials — always "vous".' },
  { context: 'Customers and shop staff', desc: 'Standard in most commercial interactions — even in casual shops. Exceptions: very young staff in youth-oriented stores.' },
  { context: 'Hierarchical workplace', desc: 'Managers and senior colleagues in traditional companies (law firms, banks, civil service) — often "vous" indefinitely.' },
  { context: 'Formal letters and emails', desc: '"Vous" is always used in formal written communication — even if you use "tu" in person.' },
  { context: 'Someone who has asked for "vous"', desc: 'Always respect a stated preference for "vous". Some people use "vous" throughout their lives with certain relationships.' },
  { context: 'Hotels, restaurants, formal services', desc: 'Service contexts always use "vous" from staff to customer. The customer may use "vous" back or "tu" depending on context.' },
]

const TUTOIEMENT_PHRASES = [
  { fr: 'On se tutoie ?', en: 'Shall we use "tu" with each other?', note: 'The standard way to propose switching from vous to tu — said by either party.' },
  { fr: 'Tu peux me tutoyer.', en: 'You can use "tu" with me.', note: 'An invitation from one person. The other can accept or decline.' },
  { fr: 'N\'hésite pas à me tutoyer.', en: 'Don\'t hesitate to use "tu" with me.', note: 'A warm invitation — "n\'hésite pas" = don\'t hesitate.' },
  { fr: 'Vous pouvez me tutoyer, si vous voulez.', en: 'You can call me "tu", if you like.', note: 'Polite and formal way to offer the informal register — keeping "vous" until they accept.' },
  { fr: 'Permettez-moi de vous tutoyer ?', en: 'May I address you informally?', note: 'Formal and slightly old-fashioned — still used in some professional contexts.' },
]

const CONJUGATIONS = [
  { pronoun: 'tu', verb: 'avoir', conj: 'tu as', en: 'you have (informal)' },
  { pronoun: 'vous', verb: 'avoir', conj: 'vous avez', en: 'you have (formal / plural)' },
  { pronoun: 'tu', verb: 'être', conj: 'tu es', en: 'you are (informal)' },
  { pronoun: 'vous', verb: 'être', conj: 'vous êtes', en: 'you are (formal / plural)' },
  { pronoun: 'tu', verb: 'aller', conj: 'tu vas', en: 'you go (informal)' },
  { pronoun: 'vous', verb: 'aller', conj: 'vous allez', en: 'you go (formal / plural)' },
  { pronoun: 'tu', verb: 'vouloir', conj: 'tu veux', en: 'you want (informal)' },
  { pronoun: 'vous', verb: 'vouloir', conj: 'vous voulez', en: 'you want (formal / plural)' },
  { pronoun: 'tu', verb: 'pouvoir', conj: 'tu peux', en: 'you can (informal)' },
  { pronoun: 'vous', verb: 'pouvoir', conj: 'vous pouvez', en: 'you can (formal / plural)' },
  { pronoun: 'tu', verb: 'faire', conj: 'tu fais', en: 'you do/make (informal)' },
  { pronoun: 'vous', verb: 'faire', conj: 'vous faites', en: 'you do/make (formal / plural)' },
  { pronoun: 'tu', verb: 'savoir', conj: 'tu sais', en: 'you know (informal)' },
  { pronoun: 'vous', verb: 'savoir', conj: 'vous savez', en: 'you know (formal / plural)' },
  { pronoun: 'tu', verb: 'venir', conj: 'tu viens', en: 'you come (informal)' },
  { pronoun: 'vous', verb: 'venir', conj: 'vous venez', en: 'you come (formal / plural)' },
]

const CULTURAL_NOTES = [
  { emoji: '🏢', title: 'Tu in the workplace — the cultural shift', detail: 'France has seen a dramatic shift in workplace register over the past 30 years. In 1990, most offices used "vous" between all colleagues. Today, tech companies, media, and most Parisian start-ups default to "tu" immediately — even with the CEO. Traditional sectors (law, banking, civil service, medicine) maintain "vous" longer. This mirrors broader social changes.' },
  { emoji: '🤝', title: 'The painful tu/vous ambiguity', detail: 'The most common awkward moment: you\'ve been addressing someone as "vous" for months, then they use "tu" with you — without proposing it. Do you immediately switch? Most French people would switch immediately and naturally, perhaps with a quiet "on se tutoie ?" to make it explicit.' },
  { emoji: '📱', title: 'Vous in writing vs tu in person', detail: 'A peculiarity of modern French professional life: colleagues who use "tu" together all day will switch to "vous" in formal emails to each other, especially when copying others. The register changes depending on the audience and the formality of the communication medium.' },
  { emoji: '👑', title: 'The Royal Vous', detail: 'Historically, "vous" was used to address a single superior person — a king or god. "Tu" was intimate or used downward. This is why "vous" remains formal. In the 20th century, the French Communist Party encouraged universal "tutoiement" as a democratic act. Today\'s workplaces are battlegrounds of these historical forces.' },
]

export default function FrenchTuVous() {
  const [tab, setTab] = useState('when')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Tu vs Vous in French | SayBonjour!" description="Master tu vs vous in French — when to use each, how to switch registers, conjugation comparison, and cultural context." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Tu vs Vous</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le tutoiement et le vouvoiement — one of French's most socially important distinctions</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300">Golden rule: when in doubt, use <strong>vous</strong>. It's never offensive to be too polite. But using "tu" too early can be seen as presumptuous, familiar, or even disrespectful.</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'when', label: 'When to Use Each' },
            { id: 'phrases', label: 'Switching Register' },
            { id: 'conjugation', label: 'Conjugation Compare' },
            { id: 'culture', label: 'Cultural Context' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'when' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h2 className="font-bold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2"><span className="font-mono text-lg">tu</span> — informal</h2>
              <div className="space-y-2">
                {TU_CONTEXTS.map((item, i) => (
                  <motion.div key={item.context} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl p-3"
                    onClick={() => addXP(2, 'vocabulary')}>
                    <p className="font-medium text-xs text-emerald-800 dark:text-emerald-300">{item.context}</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2"><span className="font-mono text-lg">vous</span> — formal</h2>
              <div className="space-y-2">
                {VOUS_CONTEXTS.map((item, i) => (
                  <motion.div key={item.context} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-3"
                    onClick={() => addXP(2, 'vocabulary')}>
                    <p className="font-medium text-xs text-blue-800 dark:text-blue-300">{item.context}</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">How to propose switching to "tu"</h2>
              <div className="space-y-3">
                {TUTOIEMENT_PHRASES.map((p, i) => (
                  <div key={p.fr} className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3"
                    onClick={() => addXP(2, 'vocabulary')}>
                    <SpeakButton text={p.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.en}</p>
                      {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-2xl p-5">
              <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">What happens after the switch?</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">After proposing "on se tutoie ?", both parties switch immediately. Using "vous" again after agreeing to "tu" would be strange, ironic, or even coldly passive-aggressive. The switch is permanent and mutual.</p>
            </div>
          </div>
        )}

        {tab === 'conjugation' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Compare tu and vous conjugations for the most important verbs. Each pair uses the same root — but the ending changes completely.</p>
            <div className="grid grid-cols-2 gap-2">
              {CONJUGATIONS.map((c, i) => (
                <motion.div key={`${c.pronoun}-${c.verb}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className={`rounded-xl p-3 flex items-center gap-2 ${c.pronoun === 'tu' ? 'bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800' : 'bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800'}`}
                  onClick={() => addXP(2, 'grammar')}>
                  <SpeakButton text={c.conj} size="sm" />
                  <div>
                    <p className={`font-mono font-bold text-sm ${c.pronoun === 'tu' ? 'text-emerald-700 dark:text-emerald-400' : 'text-blue-700 dark:text-blue-400'}`}>{c.conj}</p>
                    <p className="text-xs text-gray-400">{c.en}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {CULTURAL_NOTES.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
