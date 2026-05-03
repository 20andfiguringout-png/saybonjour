import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ADJECTIVE_GROUPS = [
  {
    category: 'Personality & Character',
    items: [
      { masc: 'gentil', fem: 'gentille', en: 'kind / nice' },
      { masc: 'sympa(thique)', fem: 'sympa(thique)', en: 'friendly / likeable', note: 'Invariable in informal use' },
      { masc: 'intelligent', fem: 'intelligente', en: 'intelligent' },
      { masc: 'drôle', fem: 'drôle', en: 'funny', note: 'Same for masc and fem' },
      { masc: 'sérieux', fem: 'sérieuse', en: 'serious' },
      { masc: 'généreux', fem: 'généreuse', en: 'generous' },
      { masc: 'courageux', fem: 'courageuse', en: 'brave / courageous' },
      { masc: 'paresseux', fem: 'paresseuse', en: 'lazy' },
      { masc: 'timide', fem: 'timide', en: 'shy / timid' },
      { masc: 'bavard', fem: 'bavarde', en: 'talkative' },
    ],
  },
  {
    category: 'Size & Appearance',
    items: [
      { masc: 'grand', fem: 'grande', en: 'tall / big' },
      { masc: 'petit', fem: 'petite', en: 'small / short' },
      { masc: 'beau', fem: 'belle', en: 'beautiful / handsome', note: 'beau → bel before vowel/h: un bel homme' },
      { masc: 'joli', fem: 'jolie', en: 'pretty / nice' },
      { masc: 'mince', fem: 'mince', en: 'slim / thin' },
      { masc: 'gros', fem: 'grosse', en: 'big / fat', note: 'Doubles consonant: ss' },
      { masc: 'vieux', fem: 'vieille', en: 'old', note: 'vieux → vieil before vowel/h: un vieil ami' },
      { masc: 'jeune', fem: 'jeune', en: 'young' },
      { masc: 'nouveau', fem: 'nouvelle', en: 'new', note: 'nouveau → nouvel before vowel/h: un nouvel appartement' },
    ],
  },
  {
    category: 'Qualities',
    items: [
      { masc: 'bon', fem: 'bonne', en: 'good', note: 'Doubles consonant: nn' },
      { masc: 'mauvais', fem: 'mauvaise', en: 'bad' },
      { masc: 'long', fem: 'longue', en: 'long' },
      { masc: 'court', fem: 'courte', en: 'short (length)' },
      { masc: 'lourd', fem: 'lourde', en: 'heavy' },
      { masc: 'léger', fem: 'légère', en: 'light (weight)' },
      { masc: 'chaud', fem: 'chaude', en: 'hot / warm' },
      { masc: 'froid', fem: 'froide', en: 'cold' },
      { masc: 'doux', fem: 'douce', en: 'soft / gentle / sweet' },
      { masc: 'dur', fem: 'dure', en: 'hard / tough' },
    ],
  },
  {
    category: 'Opinion & Feeling',
    items: [
      { masc: 'content', fem: 'contente', en: 'happy / pleased' },
      { masc: 'triste', fem: 'triste', en: 'sad' },
      { masc: 'fatigué', fem: 'fatiguée', en: 'tired' },
      { masc: 'heureux', fem: 'heureuse', en: 'happy' },
      { masc: 'inquiet', fem: 'inquiète', en: 'worried / anxious' },
      { masc: 'fâché', fem: 'fâchée', en: 'angry' },
      { masc: 'surpris', fem: 'surprise', en: 'surprised' },
      { masc: 'ennuyeux', fem: 'ennuyeuse', en: 'boring / bored' },
      { masc: 'intéressant', fem: 'intéressante', en: 'interesting' },
      { masc: 'difficile', fem: 'difficile', en: 'difficult' },
    ],
  },
]

const GRAMMAR_RULES = [
  {
    rule: 'Basic agreement',
    desc: 'Adjectives agree with the noun in gender (masc/fem) and number (sing/plural).',
    examples: [
      { fr: 'un chien noir', en: 'a black dog (masc sg)' },
      { fr: 'une voiture noire', en: 'a black car (fem sg)' },
      { fr: 'des chiens noirs', en: 'black dogs (masc pl)' },
      { fr: 'des voitures noires', en: 'black cars (fem pl)' },
    ],
  },
  {
    rule: 'BAGS adjectives — before the noun',
    desc: 'Most adjectives follow the noun, but BAGS adjectives come BEFORE: Beauty, Age, Goodness, Size.',
    examples: [
      { fr: 'un beau jardin', en: 'a beautiful garden (beauty)' },
      { fr: 'un vieux château', en: 'an old castle (age)' },
      { fr: 'une bonne idée', en: 'a good idea (goodness)' },
      { fr: 'un grand homme', en: 'a great man (size)' },
    ],
  },
  {
    rule: 'Irregular feminines',
    desc: 'Some adjectives have irregular feminine forms.',
    examples: [
      { fr: 'beau → belle', en: 'beautiful' },
      { fr: 'vieux → vieille', en: 'old' },
      { fr: 'nouveau → nouvelle', en: 'new' },
      { fr: 'blanc → blanche', en: 'white' },
    ],
  },
  {
    rule: 'Adjectives with -x → -se in fem',
    desc: 'Adjectives ending in -eux or -oux form the feminine with -euse.',
    examples: [
      { fr: 'heureux → heureuse', en: 'happy' },
      { fr: 'sérieux → sérieuse', en: 'serious' },
      { fr: 'généreux → généreuse', en: 'generous' },
      { fr: 'jaloux → jalouse', en: 'jealous' },
    ],
  },
]

const LEVEL_ABBR = { 'Personality & Character': 'A2', 'Size & Appearance': 'A1', 'Qualities': 'A2', 'Opinion & Feeling': 'B1' }
const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700' }

export default function FrenchAdjectives() {
  const [tab, setTab] = useState('vocab')
  const [activeGroup, setActiveGroup] = useState(0)
  const [activeRule, setActiveRule] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Adjectives | SayBonjour!" description="Learn essential French adjectives — personality, appearance, qualities — with gender agreement rules." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Adjectives</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les adjectifs — vocabulary and grammar agreement</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'grammar', label: 'Grammar Rules' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ADJECTIVE_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.category}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-gray-800 dark:text-cream-50">{ADJECTIVE_GROUPS[activeGroup].category}</h2>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[LEVEL_ABBR[ADJECTIVE_GROUPS[activeGroup].category]]}`}>{LEVEL_ABBR[ADJECTIVE_GROUPS[activeGroup].category]}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADJECTIVE_GROUPS[activeGroup].items.map((adj, i) => (
                  <motion.div key={adj.masc} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-2 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={adj.masc} size="sm" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-cream-50">
                        <span className="font-medium text-burgundy-700 dark:text-burgundy-vibrant-300">{adj.masc}</span>
                        <span className="text-gray-400 mx-1">/</span>
                        <span className="font-medium text-rose-600 dark:text-rose-400">{adj.fem}</span>
                      </p>
                      <p className="text-xs text-gray-400">{adj.en}</p>
                      {adj.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{adj.note}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'grammar' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {GRAMMAR_RULES.map((r, i) => (
                <button key={r.rule} onClick={() => setActiveRule(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeRule === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {r.rule}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-cream-50 mb-2">{GRAMMAR_RULES[activeRule].rule}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{GRAMMAR_RULES[activeRule].desc}</p>
              <div className="space-y-2">
                {GRAMMAR_RULES[activeRule].examples.map(ex => (
                  <div key={ex.fr} className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5">
                    <SpeakButton text={ex.fr} size="sm" />
                    <span className="text-sm font-medium text-burgundy-700 dark:text-burgundy-vibrant-300 italic">{ex.fr}</span>
                    <span className="text-xs text-gray-400">— {ex.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
