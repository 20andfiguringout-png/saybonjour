import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const TU_CONTEXTS = [
  { context: 'Children', desc: 'Always use "tu" with children.' },
  { context: 'Close friends', desc: 'Once friendship is established, "tu" is standard.' },
  { context: 'Family members', desc: 'Always "tu" with immediate and extended family.' },
  { context: 'Students / peers', desc: 'University students typically use "tu" with each other immediately.' },
  { context: 'Colleagues (informal workplaces)', desc: 'Many modern offices default to "tu" — especially start-ups and younger teams.' },
  { context: 'Online communities / social media', desc: '"Tu" is standard in most online interactions.' },
  { context: 'God / prayer', desc: '"Tu" is used to address God in French prayer.' },
]

const VOUS_CONTEXTS = [
  { context: 'Strangers (adults)', desc: 'Default when meeting someone new. Switch to "tu" only when invited.' },
  { context: 'Older people', desc: 'Always use "vous" with anyone significantly older than you.' },
  { context: 'Professionals (doctors, officials)', desc: 'Doctors, teachers, judges, police, government officials.' },
  { context: 'Customers and shop staff', desc: 'Standard in most commercial interactions (though this varies by shop).' },
  { context: 'Hierarchical workplace', desc: 'Managers and senior colleagues in traditional companies.' },
  { context: 'Formal letters and emails', desc: '"Vous" is always used in formal written communication.' },
  { context: 'Someone who has asked you to use "vous"', desc: 'Always respect a preference for "vous".' },
]

const TUTOIEMENT_PHRASES = [
  { fr: 'On se tutoie ?', en: 'Shall we use "tu" with each other?', note: 'The standard way to propose switching from vous to tu.' },
  { fr: 'Tu peux me tutoyer.', en: 'You can use "tu" with me.', note: 'An invitation to switch to the informal register.' },
]

const CONJUGATIONS = [
  { pronoun: 'tu', verb: 'avoir', conj: 'tu as', en: 'you have' },
  { pronoun: 'vous', verb: 'avoir', conj: 'vous avez', en: 'you have (formal/plural)' },
  { pronoun: 'tu', verb: 'être', conj: 'tu es', en: 'you are' },
  { pronoun: 'vous', verb: 'être', conj: 'vous êtes', en: 'you are (formal/plural)' },
  { pronoun: 'tu', verb: 'aller', conj: 'tu vas', en: 'you go' },
  { pronoun: 'vous', verb: 'aller', conj: 'vous allez', en: 'you go (formal/plural)' },
  { pronoun: 'tu', verb: 'parler', conj: 'tu parles', en: 'you speak' },
  { pronoun: 'vous', verb: 'parler', conj: 'vous parlez', en: 'you speak (formal/plural)' },
  { pronoun: 'tu', verb: 'vouloir', conj: 'tu veux', en: 'you want' },
  { pronoun: 'vous', verb: 'vouloir', conj: 'vous voulez', en: 'you want (formal/plural)' },
]

export default function FrenchTuVous() {
  const [tab, setTab] = useState('when')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Tu vs Vous in French | SayBonjour!" description="Master tu vs vous in French — when to use each, how to propose tutoiement, and conjugation examples." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Tu vs Vous</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le tutoiement et le vouvoiement — one of French's most socially important distinctions</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300">When in doubt, use <strong>vous</strong>. It's never offensive to be too polite, but using "tu" too early can be seen as presumptuous.</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'when', label: 'When to Use Each' }, { id: 'phrases', label: 'Switching Register' }, { id: 'conjugation', label: 'Conjugation Comparison' }].map(t => (
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
                    className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl p-3">
                    <p className="font-medium text-xs text-emerald-800 dark:text-emerald-300">{item.context}</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2"><span className="font-mono text-lg">vous</span> — formal</h2>
              <div className="space-y-2">
                {VOUS_CONTEXTS.map((item, i) => (
                  <motion.div key={item.context} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
                    <p className="font-medium text-xs text-blue-800 dark:text-blue-300">{item.context}</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">{item.desc}</p>
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
                {TUTOIEMENT_PHRASES.map(p => (
                  <div key={p.fr} className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                    <SpeakButton text={p.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                      <p className="text-xs text-gray-400">{p.en}</p>
                      {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{p.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-2xl p-5">
              <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">The transition</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300">After proposing "on se tutoie ?", both parties switch immediately. Using "vous" again after agreeing to "tu" would be strange or ironic.</p>
            </div>
          </div>
        )}

        {tab === 'conjugation' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <div className="grid grid-cols-2 gap-2">
              {CONJUGATIONS.map((c, i) => (
                <motion.div key={`${c.pronoun}-${c.verb}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className={`rounded-xl p-3 flex items-center gap-2 ${c.pronoun === 'tu' ? 'bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800' : 'bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800'}`}>
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
      </div>
    </div>
  )
}
