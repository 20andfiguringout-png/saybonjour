import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, MessageSquare } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const QUESTION_WORDS = [
  { fr: 'qui', en: 'who', example: 'Qui est-ce ?', exampleEn: 'Who is this?' },
  { fr: 'que / quoi', en: 'what', example: 'Que faites-vous ? / Vous faites quoi ?', exampleEn: 'What are you doing?' },
  { fr: 'quand', en: 'when', example: 'Quand est-ce que vous partez ?', exampleEn: 'When are you leaving?' },
  { fr: 'où', en: 'where', example: 'Où habitez-vous ?', exampleEn: 'Where do you live?' },
  { fr: 'pourquoi', en: 'why', example: 'Pourquoi est-ce que tu pleures ?', exampleEn: 'Why are you crying?' },
  { fr: 'comment', en: 'how', example: 'Comment ça marche ?', exampleEn: 'How does it work?' },
  { fr: 'combien (de)', en: 'how many / how much', example: 'Combien ça coûte ?', exampleEn: 'How much does it cost?' },
  { fr: 'quel / quelle / quels / quelles', en: 'which / what (adj)', example: 'Quel film tu préfères ?', exampleEn: 'Which film do you prefer?' },
  { fr: 'lequel / laquelle / lesquels / lesquelles', en: 'which one(s) (pronoun)', example: 'Lequel tu veux ?', exampleEn: 'Which one do you want?' },
]

const QUESTION_FORMS = [
  {
    form: 'Intonation',
    level: 'A1',
    desc: 'Just raise your voice at the end — the most natural spoken method.',
    examples: [
      { fr: 'Tu viens ?', en: 'Are you coming?' },
      { fr: 'Il parle français ?', en: 'Does he speak French?' },
      { fr: 'Vous avez une table ?', en: 'Do you have a table?' },
      { fr: 'C\'est ouvert ?', en: 'Is it open?' },
    ],
    note: 'Most common in everyday conversation. Perfectly correct in informal speech.',
  },
  {
    form: 'Est-ce que…',
    level: 'A1',
    desc: 'Add "est-ce que" before a normal statement. No inversion needed.',
    examples: [
      { fr: 'Est-ce que tu viens ?', en: 'Are you coming?' },
      { fr: 'Est-ce qu\'il parle français ?', en: 'Does he speak French?' },
      { fr: 'Est-ce que vous avez une table ?', en: 'Do you have a table?' },
      { fr: 'Pourquoi est-ce que tu pleures ?', en: 'Why are you crying?' },
    ],
    note: 'The most versatile form — works in both formal and informal contexts. Before a vowel: est-ce qu\'.',
  },
  {
    form: 'Subject-verb inversion',
    level: 'B1',
    desc: 'Invert the verb and subject pronoun with a hyphen.',
    examples: [
      { fr: 'Viens-tu ?', en: 'Are you coming?' },
      { fr: 'Parle-t-il français ?', en: 'Does he speak French?' },
      { fr: 'Avez-vous une table ?', en: 'Do you have a table?' },
      { fr: 'Où habitez-vous ?', en: 'Where do you live?' },
    ],
    note: 'Used in formal writing and speech. "Parle-t-il" — a -t- is inserted between vowels for euphony.',
  },
  {
    form: 'n\'est-ce pas?',
    level: 'A2',
    desc: 'Tag question added at the end — equivalent to "isn\'t it?" "right?" "don\'t you?"',
    examples: [
      { fr: 'C\'est beau, n\'est-ce pas ?', en: 'It\'s beautiful, isn\'t it?' },
      { fr: 'Tu viens, n\'est-ce pas ?', en: 'You\'re coming, aren\'t you?' },
      { fr: 'Il fait chaud, n\'est-ce pas ?', en: 'It\'s warm, isn\'t it?' },
    ],
    note: 'Very versatile — one tag question fits all contexts (unlike English). More formal than "hein ?".',
  },
  {
    form: 'Informal tag: hein? / non?',
    level: 'A2',
    desc: 'Casual equivalents of n\'est-ce pas — added to the end.',
    examples: [
      { fr: 'C\'est bien, hein ?', en: 'It\'s good, right?' },
      { fr: 'Tu viens, non ?', en: 'You\'re coming, right?' },
      { fr: 'C\'est pas grave, hein ?', en: 'It\'s not serious, is it?' },
    ],
    note: '"Hein" is very colloquial. "Non" is slightly more standard but still informal.',
  },
]

const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700' }

export default function FrenchQuestions() {
  const [activeForm, setActiveForm] = useState(0)
  const [tab, setTab] = useState('forms')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Questions | SayBonjour!" description="Master asking questions in French — question words, intonation, est-ce que, inversion, and tag questions." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Asking Questions in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les questions — 5 ways to ask a question in French</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'forms', label: 'Question Forms' }, { id: 'words', label: 'Question Words' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'forms' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {QUESTION_FORMS.map((f, i) => (
                <button key={f.form} onClick={() => { setActiveForm(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${activeForm === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {f.form}
                  <span className={`text-xs px-1 py-0.5 rounded font-medium ${activeForm === i ? 'bg-white/20 text-white' : LEVEL_COLORS[f.level]}`}>{f.level}</span>
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="mb-4">
                <h2 className="font-bold text-xl text-gray-900 dark:text-cream-50 font-playfair">{QUESTION_FORMS[activeForm].form}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{QUESTION_FORMS[activeForm].desc}</p>
              </div>
              <div className="space-y-3 mb-4">
                {QUESTION_FORMS[activeForm].examples.map((ex, i) => (
                  <motion.div key={ex.fr} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3 flex items-center gap-3">
                    <SpeakButton text={ex.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-cream-50 italic">"{ex.fr}"</p>
                      <p className="text-xs text-gray-400">{ex.en}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Note</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">{QUESTION_FORMS[activeForm].note}</p>
              </div>
            </div>
          </>
        )}

        {tab === 'words' && (
          <div className="space-y-3">
            {QUESTION_WORDS.map((w, i) => (
              <motion.div key={w.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <SpeakButton text={w.fr} size="md" />
                  <span className="font-bold text-2xl text-burgundy-700 dark:text-burgundy-vibrant-300 font-playfair">{w.fr}</span>
                  <span className="text-gray-400">= {w.en}</span>
                </div>
                <div className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2">
                  <SpeakButton text={w.example} size="sm" />
                  <div>
                    <p className="text-sm italic text-gray-700 dark:text-gray-300">"{w.example}"</p>
                    <p className="text-xs text-gray-400">{w.exampleEn}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
