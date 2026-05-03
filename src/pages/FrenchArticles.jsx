import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ARTICLE_TYPES = [
  {
    name: 'Definite articles — Les articles définis',
    level: 'A1',
    desc: 'Used when referring to a specific thing or something already known.',
    articles: [
      { form: 'le', use: 'masculine singular', example: 'le chat', exEn: 'the cat' },
      { form: 'la', use: 'feminine singular', example: 'la maison', exEn: 'the house' },
      { form: 'l\'', use: 'before vowel or h', example: 'l\'ami, l\'hôtel', exEn: 'the friend, the hotel' },
      { form: 'les', use: 'plural (all genders)', example: 'les enfants', exEn: 'the children' },
    ],
    note: 'Also used for general statements: "J\'aime le chocolat" (I like chocolate — in general). This is different from English!',
    contractions: [
      { original: 'à + le', result: 'au', example: 'Je vais au marché' },
      { original: 'à + les', result: 'aux', example: 'Je parle aux enfants' },
      { original: 'de + le', result: 'du', example: 'Le chat du voisin' },
      { original: 'de + les', result: 'des', example: 'Les chiens des voisins' },
    ],
  },
  {
    name: 'Indefinite articles — Les articles indéfinis',
    level: 'A1',
    desc: 'Used when introducing something for the first time or referring to a non-specific thing.',
    articles: [
      { form: 'un', use: 'masculine singular', example: 'un chat', exEn: 'a cat' },
      { form: 'une', use: 'feminine singular', example: 'une maison', exEn: 'a house' },
      { form: 'des', use: 'plural (all genders)', example: 'des chats', exEn: '(some) cats' },
    ],
    note: 'In negative sentences, un/une/des become "de" (or d\' before vowel): "Je n\'ai pas de chat." (I don\'t have a cat)',
    contractions: [],
  },
  {
    name: 'Partitive articles — Les articles partitifs',
    level: 'A2',
    desc: 'Used with uncountable nouns — food, drink, abstract things — to say "some".',
    articles: [
      { form: 'du', use: 'masculine singular', example: 'du pain', exEn: 'some bread' },
      { form: 'de la', use: 'feminine singular', example: 'de la musique', exEn: 'some music' },
      { form: 'de l\'', use: 'before vowel or h', example: 'de l\'eau', exEn: 'some water' },
      { form: 'des', use: 'plural', example: 'des légumes', exEn: 'some vegetables' },
    ],
    note: 'In negation: "Je ne bois pas de café." (I don\'t drink coffee) — all partitives become "de/d\'".',
    contractions: [],
  },
]

const COMMON_MISTAKES = [
  { mistake: 'Je mange la soupe pour le déjeuner.', correct: 'Je mange de la soupe pour le déjeuner.', explanation: 'Soup is uncountable — use partitive "de la".' },
  { mistake: 'Je n\'ai pas un chien.', correct: 'Je n\'ai pas de chien.', explanation: 'In negation, un/une become "de".' },
  { mistake: 'Je vais à le cinéma.', correct: 'Je vais au cinéma.', explanation: 'à + le must contract to "au".' },
  { mistake: 'J\'aime les chocolats en général.', correct: 'J\'aime le chocolat.', explanation: 'For general likes, French uses the definite article (le chocolat = chocolate in general).' },
]

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
  A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
}

export default function FrenchArticles() {
  const [activeType, setActiveType] = useState(0)
  const [tab, setTab] = useState('articles')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Articles | SayBonjour!" description="Master French articles — le/la/les (definite), un/une/des (indefinite), du/de la (partitive) — with rules and examples." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Articles</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les articles — definite, indefinite, and partitive</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'articles', label: 'Article Types' }, { id: 'mistakes', label: 'Common Mistakes' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'articles' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ARTICLE_TYPES.map((t, i) => (
                <button key={t.name} onClick={() => { setActiveType(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeType === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {t.name.split('—')[0].trim()}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-bold text-lg font-playfair text-gray-900 dark:text-cream-50">{ARTICLE_TYPES[activeType].name.split('—')[1].trim()}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[ARTICLE_TYPES[activeType].level]}`}>{ARTICLE_TYPES[activeType].level}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{ARTICLE_TYPES[activeType].desc}</p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {ARTICLE_TYPES[activeType].articles.map((a, i) => (
                  <motion.div key={a.form} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <SpeakButton text={`${a.form} — ${a.example}`} size="sm" />
                      <span className="font-bold text-lg font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{a.form}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{a.use}</p>
                    <p className="text-sm italic text-gray-600 dark:text-gray-300">{a.example} <span className="text-gray-400">({a.exEn})</span></p>
                  </motion.div>
                ))}
              </div>

              {ARTICLE_TYPES[activeType].contractions.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Contractions</p>
                  <div className="space-y-2">
                    {ARTICLE_TYPES[activeType].contractions.map(c => (
                      <div key={c.result} className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2">
                        <span className="font-mono text-sm text-gray-400">{c.original}</span>
                        <span className="text-gray-300">→</span>
                        <span className="font-bold font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{c.result}</span>
                        <SpeakButton text={c.example} size="sm" />
                        <span className="text-xs italic text-gray-500 dark:text-gray-400">{c.example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Key rule</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">{ARTICLE_TYPES[activeType].note}</p>
              </div>
            </div>
          </>
        )}

        {tab === 'mistakes' && (
          <div className="space-y-4">
            {COMMON_MISTAKES.map((m, i) => (
              <motion.div key={m.mistake} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-xl px-3 py-2">
                    <p className="text-xs text-red-500 font-bold mb-1">✗ Wrong</p>
                    <p className="text-sm italic text-red-700 dark:text-red-300">{m.mistake}</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl px-3 py-2">
                    <p className="text-xs text-emerald-500 font-bold mb-1">✓ Correct</p>
                    <div className="flex items-center gap-2">
                      <SpeakButton text={m.correct} size="sm" />
                      <p className="text-sm italic text-emerald-700 dark:text-emerald-300">{m.correct}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 italic">💡 {m.explanation}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
