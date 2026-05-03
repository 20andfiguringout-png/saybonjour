import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const QUESTION_WORDS = [
  { word: 'qui', en: 'who', level: 'A1', examples: [
    { fr: 'Qui est-ce ?', en: 'Who is it?' },
    { fr: 'Qui a mangé mon croissant ?', en: 'Who ate my croissant?' },
    { fr: 'Avec qui vas-tu ?', en: 'Who are you going with?' },
  ]},
  { word: 'quoi / que', en: 'what', level: 'A1', examples: [
    { fr: 'Qu\'est-ce que tu fais ?', en: 'What are you doing?' },
    { fr: 'Que voulez-vous ?', en: 'What do you want? (formal)' },
    { fr: 'C\'est quoi ça ?', en: 'What is that? (informal)' },
  ]},
  { word: 'où', en: 'where', level: 'A1', examples: [
    { fr: 'Où est la gare ?', en: 'Where is the station?' },
    { fr: 'D\'où viens-tu ?', en: 'Where are you from?' },
    { fr: 'Où vas-tu ?', en: 'Where are you going?' },
  ]},
  { word: 'quand', en: 'when', level: 'A1', examples: [
    { fr: 'Quand arrive-t-il ?', en: 'When is he arriving?' },
    { fr: 'Depuis quand habites-tu ici ?', en: 'Since when have you lived here?' },
    { fr: 'Quand est-ce que le magasin ouvre ?', en: 'When does the shop open?' },
  ]},
  { word: 'comment', en: 'how', level: 'A1', examples: [
    { fr: 'Comment tu t\'appelles ?', en: 'What\'s your name? (Lit: How do you call yourself?)' },
    { fr: 'Comment allez-vous ?', en: 'How are you? (formal)' },
    { fr: 'Comment est-ce qu\'on dit ça en français ?', en: 'How do you say that in French?' },
  ]},
  { word: 'pourquoi', en: 'why', level: 'A1', examples: [
    { fr: 'Pourquoi tu pleures ?', en: 'Why are you crying?' },
    { fr: 'Pourquoi est-ce qu\'il n\'est pas venu ?', en: 'Why didn\'t he come?' },
    { fr: 'Parce que… / Car…', en: 'Because… (answers)', note: '"Parce que" is standard. "Car" is more formal/written.' },
  ]},
  { word: 'combien', en: 'how many / how much', level: 'A1', examples: [
    { fr: 'Combien ça coûte ?', en: 'How much does that cost?' },
    { fr: 'Combien de personnes y a-t-il ?', en: 'How many people are there?' },
    { fr: 'Depuis combien de temps ?', en: 'For how long?' },
  ]},
  { word: 'quel / quelle', en: 'which / what (adjective)', level: 'A2', examples: [
    { fr: 'Quel est ton prénom ?', en: 'What is your first name?' },
    { fr: 'Quelle heure est-il ?', en: 'What time is it?' },
    { fr: 'Quels films tu aimes ?', en: 'Which films do you like?' },
  ]},
  { word: 'lequel / laquelle', en: 'which one', level: 'B1', examples: [
    { fr: 'Lequel préfères-tu ?', en: 'Which one do you prefer? (masc)' },
    { fr: 'Laquelle est ta valise ?', en: 'Which one is your suitcase? (fem)' },
    { fr: 'Lesquels sont les vôtres ?', en: 'Which ones are yours? (plural)' },
  ]},
]

const QUESTION_FORMS = [
  {
    form: 'Informal — rising intonation',
    desc: 'Simply raise your voice at the end of a statement. Most common in spoken French.',
    example: { fr: 'Tu viens demain ?', en: 'You\'re coming tomorrow?' },
  },
  {
    form: 'Est-ce que…',
    desc: 'Add "est-ce que" before a statement. Common, correct at all levels.',
    example: { fr: 'Est-ce que tu viens demain ?', en: 'Are you coming tomorrow?' },
  },
  {
    form: 'Inversion',
    desc: 'Invert the verb and subject pronoun. Formal, written, official.',
    example: { fr: 'Viens-tu demain ?', en: 'Are you coming tomorrow?' },
  },
]

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700',
  A2: 'bg-blue-100 text-blue-700',
  B1: 'bg-yellow-100 text-yellow-700',
}

export default function FrenchInterrogatives() {
  const [activeWord, setActiveWord] = useState(0)
  const [tab, setTab] = useState('words')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Question Words | SayBonjour!" description="Master French interrogatives — qui, quoi, où, quand, comment, pourquoi, combien, quel — with examples and question forms." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Question Words</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les mots interrogatifs — qui, quoi, où, quand, comment, pourquoi, combien</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'words', label: 'Question Words' }, { id: 'forms', label: 'Question Forms' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'words' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {QUESTION_WORDS.map((w, i) => (
                <button key={w.word} onClick={() => { setActiveWord(i); addXP(2, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-sm font-mono font-bold transition-colors flex items-center gap-1.5 ${activeWord === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {w.word}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <SpeakButton text={QUESTION_WORDS[activeWord].word} size="md" />
                <span className="font-mono font-bold text-2xl text-burgundy-700 dark:text-burgundy-vibrant-300">{QUESTION_WORDS[activeWord].word}</span>
                <span className="text-sm text-gray-400">— {QUESTION_WORDS[activeWord].en}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ml-auto ${LEVEL_COLORS[QUESTION_WORDS[activeWord].level]}`}>{QUESTION_WORDS[activeWord].level}</span>
              </div>
              <div className="space-y-2">
                {QUESTION_WORDS[activeWord].examples.map((ex, i) => (
                  <motion.div key={ex.fr} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                    <SpeakButton text={ex.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{ex.fr}"</p>
                      <p className="text-xs text-gray-400">{ex.en}</p>
                      {ex.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{ex.note}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'forms' && (
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-300 mb-2">
              💡 French has three main ways to ask questions. All are correct — they differ in register (formal vs informal).
            </div>
            {QUESTION_FORMS.map((form, i) => (
              <motion.div key={form.form} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{form.form}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{form.desc}</p>
                <div className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5">
                  <SpeakButton text={form.example.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{form.example.fr}"</p>
                    <p className="text-xs text-gray-400">{form.example.en}</p>
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
