import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const COLORS = [
  { fr: 'rouge', en: 'red', hex: '#ef4444', note: 'rouge vin = wine red, rouge vif = bright red' },
  { fr: 'bleu', en: 'blue', hex: '#3b82f6', note: 'bleu marine = navy, bleu ciel = sky blue, bleu roi = royal blue' },
  { fr: 'vert', en: 'green', hex: '#22c55e', note: 'vert foncé = dark green, vert clair = light green, vert olive = olive green' },
  { fr: 'jaune', en: 'yellow', hex: '#eab308', note: 'jaune citron = lemon yellow, jaune or = golden yellow' },
  { fr: 'orange', en: 'orange', hex: '#f97316', note: 'Invariable — never changes: des robes orange' },
  { fr: 'violet', en: 'purple / violet', hex: '#8b5cf6', note: 'violet foncé = dark purple' },
  { fr: 'rose', en: 'pink', hex: '#ec4899', note: 'rose pâle = pale pink, rose vif = hot pink. Invariable!' },
  { fr: 'blanc', en: 'white', hex: '#f8fafc', note: 'blanche (f). blanc cassé = off-white, crème' },
  { fr: 'noir', en: 'black', hex: '#0f172a', note: 'noire (f). noir de jais = jet black' },
  { fr: 'gris', en: 'grey', hex: '#6b7280', note: 'grise (f). gris clair = light grey, gris foncé = dark grey' },
  { fr: 'marron', en: 'brown', hex: '#92400e', note: 'Invariable — never marrone(s). brun also means brown (for hair)' },
  { fr: 'beige', en: 'beige', hex: '#d2b48c', note: 'Invariable. sable = sand colour' },
  { fr: 'bordeaux', en: 'burgundy / wine red', hex: '#7f1d1d', note: 'Invariable — named after the wine region' },
  { fr: 'turquoise', en: 'turquoise', hex: '#06b6d4', note: 'Invariable' },
  { fr: 'doré', en: 'golden / gold', hex: '#ca8a04', note: 'dorée (f). couleur or = gold colour' },
  { fr: 'argenté', en: 'silver / silvery', hex: '#94a3b8', note: 'argentée (f). couleur argent = silver colour' },
]

const GRAMMAR_RULES = [
  {
    rule: 'Agreement with nouns',
    desc: 'Most colour adjectives agree in gender and number with the noun they describe.',
    examples: [
      { fr: 'un chat noir', en: 'a black cat (masc)' },
      { fr: 'une robe noire', en: 'a black dress (fem)' },
      { fr: 'des chats noirs', en: 'black cats (masc pl)' },
      { fr: 'des robes noires', en: 'black dresses (fem pl)' },
    ],
  },
  {
    rule: 'Invariable colours',
    desc: 'Colours that are also nouns (orange, marron, rose, bordeaux, turquoise) never change — no -e or -s added.',
    examples: [
      { fr: 'un sac orange', en: 'an orange bag' },
      { fr: 'des sacs orange', en: 'orange bags (not oranges!)' },
      { fr: 'une robe marron', en: 'a brown dress (not marronne!)' },
      { fr: 'des chaussures rose', en: 'pink shoes (not roses!)' },
    ],
  },
  {
    rule: 'Compound colours',
    desc: 'When two colour words are joined, or when a colour is modified by a noun, the whole thing is invariable.',
    examples: [
      { fr: 'des yeux bleu-vert', en: 'blue-green eyes (invariable)' },
      { fr: 'des cheveux châtain clair', en: 'light chestnut hair (invariable)' },
      { fr: 'une veste bleu marine', en: 'a navy jacket (invariable)' },
      { fr: 'des voitures gris foncé', en: 'dark grey cars (invariable)' },
    ],
  },
  {
    rule: 'Position of colour adjectives',
    desc: 'Colour adjectives follow the noun in French (unlike English).',
    examples: [
      { fr: 'une fleur rouge', en: 'a red flower (not rouge fleur)' },
      { fr: 'le ciel bleu', en: 'the blue sky' },
      { fr: 'des chaussures noires', en: 'black shoes' },
    ],
  },
]

const COLOR_PHRASES = [
  { fr: 'De quelle couleur est…?', en: 'What colour is…?' },
  { fr: 'Il est bleu clair / foncé.', en: 'It\'s light / dark blue.' },
  { fr: 'Je cherche quelque chose en rouge.', en: 'I\'m looking for something in red.' },
  { fr: 'Cette couleur ne me va pas.', en: 'This colour doesn\'t suit me.' },
  { fr: 'Le vert lui va très bien.', en: 'Green suits him/her very well.' },
  { fr: 'Je préfère les couleurs vives.', en: 'I prefer bright colours.' },
  { fr: 'C\'est une nuance de bleu.', en: 'It\'s a shade of blue.' },
]

export default function FrenchColors() {
  const [tab, setTab] = useState('colors')
  const [activeRule, setActiveRule] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Colours | SayBonjour!" description="Learn French colours — vocabulary, grammar rules for colour adjectives, and colour expressions." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Colours in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les couleurs — with grammar rules and shades</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'colors', label: 'Colours' }, { id: 'grammar', label: 'Grammar Rules' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'colors' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {COLORS.map((color, i) => (
              <motion.div key={color.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-center gap-3 cursor-pointer"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 shrink-0" style={{ backgroundColor: color.hex }} />
                <SpeakButton text={color.fr} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 dark:text-cream-50">{color.fr}</p>
                  <p className="text-xs text-gray-400">{color.en}</p>
                  {color.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic truncate">{color.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {COLOR_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
