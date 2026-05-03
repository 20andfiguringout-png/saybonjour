import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const PRONOUN_SECTIONS = [
  {
    name: 'Subject Pronouns',
    level: 'A1',
    desc: 'Replace the subject (who does the action).',
    pronouns: [
      { fr: 'je', en: 'I', note: 'Becomes "j\'" before vowel or h: j\'ai, j\'habite' },
      { fr: 'tu', en: 'you (informal singular)' },
      { fr: 'il', en: 'he / it (masc)' },
      { fr: 'elle', en: 'she / it (fem)' },
      { fr: 'on', en: 'we / one (informal)', note: '"On" is very commonly used for "we" in spoken French' },
      { fr: 'nous', en: 'we (formal/written)' },
      { fr: 'vous', en: 'you (formal singular or plural)' },
      { fr: 'ils', en: 'they (masc or mixed group)' },
      { fr: 'elles', en: 'they (fem group only)' },
    ],
  },
  {
    name: 'Direct Object Pronouns',
    level: 'A2',
    desc: 'Replace the direct object (what/who receives the action directly). Come BEFORE the verb.',
    pronouns: [
      { fr: 'me (m\')', en: 'me' },
      { fr: 'te (t\')', en: 'you (informal)' },
      { fr: 'le (l\')', en: 'him / it (masc)' },
      { fr: 'la (l\')', en: 'her / it (fem)' },
      { fr: 'nous', en: 'us' },
      { fr: 'vous', en: 'you' },
      { fr: 'les', en: 'them' },
    ],
    examples: [
      { fr: 'Je le vois.', en: 'I see him / I see it.' },
      { fr: 'Tu la connais ?', en: 'Do you know her?' },
      { fr: 'Elle nous invite.', en: 'She\'s inviting us.' },
      { fr: 'Je les aime.', en: 'I love them.' },
    ],
  },
  {
    name: 'Indirect Object Pronouns',
    level: 'B1',
    desc: 'Replace indirect objects (to/for whom). Verbs needing "à": parler à, donner à, écrire à.',
    pronouns: [
      { fr: 'me (m\')', en: 'to me' },
      { fr: 'te (t\')', en: 'to you (informal)' },
      { fr: 'lui', en: 'to him / to her' },
      { fr: 'nous', en: 'to us' },
      { fr: 'vous', en: 'to you' },
      { fr: 'leur', en: 'to them' },
    ],
    examples: [
      { fr: 'Je lui parle.', en: 'I\'m speaking to him/her.' },
      { fr: 'Il leur écrit.', en: 'He writes to them.' },
      { fr: 'Elle me donne le livre.', en: 'She gives me the book.' },
    ],
  },
  {
    name: 'Reflexive Pronouns',
    level: 'A2',
    desc: 'Used with reflexive verbs (where subject and object are the same person).',
    pronouns: [
      { fr: 'me', en: 'myself' },
      { fr: 'te', en: 'yourself' },
      { fr: 'se', en: 'himself / herself / itself / themselves' },
      { fr: 'nous', en: 'ourselves' },
      { fr: 'vous', en: 'yourself/yourselves' },
    ],
    examples: [
      { fr: 'Je me lève à 7h.', en: 'I get up at 7.' },
      { fr: 'Il se lave les mains.', en: 'He washes his hands.' },
      { fr: 'Nous nous amusons bien.', en: 'We\'re having fun.' },
    ],
  },
  {
    name: 'Stressed Pronouns',
    level: 'A2',
    desc: 'Used after prepositions, in comparisons, and for emphasis. Also called tonic pronouns.',
    pronouns: [
      { fr: 'moi', en: 'me / I (stressed)' },
      { fr: 'toi', en: 'you (stressed)' },
      { fr: 'lui', en: 'him' },
      { fr: 'elle', en: 'her' },
      { fr: 'nous', en: 'us' },
      { fr: 'vous', en: 'you' },
      { fr: 'eux', en: 'them (masc)' },
      { fr: 'elles', en: 'them (fem)' },
    ],
    examples: [
      { fr: 'C\'est pour moi.', en: 'It\'s for me.' },
      { fr: 'Chez toi ou chez moi ?', en: 'At your place or mine?' },
      { fr: 'Il est plus grand que lui.', en: 'He\'s taller than him.' },
      { fr: 'Moi, je préfère le café.', en: 'I prefer coffee (for my part).' },
    ],
  },
  {
    name: 'Y and En',
    level: 'B1',
    desc: 'Two special pronouns replacing phrases with prepositions.',
    pronouns: [
      { fr: 'y', en: 'there / at it / to it (replaces à + place or thing)', note: '"J\'y vais" = I\'m going there. Replaces "à + noun"' },
      { fr: 'en', en: 'of it / some / from there (replaces de + noun or quantity)', note: '"J\'en veux" = I want some. Replaces "de + noun"' },
    ],
    examples: [
      { fr: 'J\'y vais ce soir.', en: 'I\'m going there tonight.' },
      { fr: 'Tu y penses ?', en: 'Are you thinking about it?' },
      { fr: 'J\'en ai besoin.', en: 'I need some / I need it.' },
      { fr: 'Il en parle souvent.', en: 'He talks about it often.' },
    ],
  },
]

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
  A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  B1: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
}

export default function FrenchPronounsGuide() {
  const [activeSection, setActiveSection] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Pronouns Guide | SayBonjour!" description="Master all French pronouns — subject, direct/indirect object, reflexive, stressed, y and en — with examples." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Pronouns Guide</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les pronoms — subject, object, reflexive, stressed, y and en</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {PRONOUN_SECTIONS.map((s, i) => (
            <button key={s.name} onClick={() => { setActiveSection(i); addXP(3, 'grammar') }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${activeSection === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {s.name}
              <span className={`text-xs px-1 py-0.5 rounded font-bold ${activeSection === i ? 'bg-white/20 text-white' : LEVEL_COLORS[s.level]}`}>{s.level}</span>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold text-xl font-playfair text-gray-900 dark:text-cream-50">{PRONOUN_SECTIONS[activeSection].name}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[PRONOUN_SECTIONS[activeSection].level]}`}>{PRONOUN_SECTIONS[activeSection].level}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{PRONOUN_SECTIONS[activeSection].desc}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
            {PRONOUN_SECTIONS[activeSection].pronouns.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <SpeakButton text={p.fr} size="sm" />
                  <span className="font-bold text-base font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{p.fr}</span>
                </div>
                <p className="text-xs text-gray-400">{p.en}</p>
                {p.note && <p className="text-xs text-amber-500 italic mt-0.5">{p.note}</p>}
              </motion.div>
            ))}
          </div>

          {PRONOUN_SECTIONS[activeSection].examples && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Examples</p>
              {PRONOUN_SECTIONS[activeSection].examples.map((ex, i) => (
                <div key={ex.fr} className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5">
                  <SpeakButton text={ex.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{ex.fr}"</p>
                    <p className="text-xs text-gray-400">{ex.en}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={() => setActiveSection(i => Math.max(0, i - 1))} disabled={activeSection === 0}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-dark-warm-50 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors">
            ← Previous
          </button>
          <button onClick={() => setActiveSection(i => Math.min(PRONOUN_SECTIONS.length - 1, i + 1))} disabled={activeSection === PRONOUN_SECTIONS.length - 1}
            className="flex-1 py-2.5 rounded-xl bg-burgundy-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-burgundy-700 transition-colors">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
