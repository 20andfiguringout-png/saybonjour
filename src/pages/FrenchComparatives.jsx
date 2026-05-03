import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const COMPARATIVES = [
  {
    type: 'More than — plus…que',
    icon: '📈',
    level: 'A2',
    pattern: 'plus + adjective/adverb + que',
    examples: [
      { fr: 'Elle est plus grande que lui.', en: 'She is taller than him.' },
      { fr: 'Ce film est plus intéressant que l\'autre.', en: 'This film is more interesting than the other.' },
      { fr: 'Il court plus vite que moi.', en: 'He runs faster than me.' },
      { fr: 'Paris est plus grand que Lyon.', en: 'Paris is bigger than Lyon.' },
    ],
    note: 'Adjective still agrees in gender/number: "Elle est plus grande" (not grand).',
  },
  {
    type: 'Less than — moins…que',
    icon: '📉',
    level: 'A2',
    pattern: 'moins + adjective/adverb + que',
    examples: [
      { fr: 'Ce livre est moins cher que l\'autre.', en: 'This book is less expensive than the other.' },
      { fr: 'Il est moins patient que sa sœur.', en: 'He\'s less patient than his sister.' },
      { fr: 'Je mange moins vite que toi.', en: 'I eat more slowly than you.' },
    ],
    note: '"Moins que" — remember that the adjective still agrees with the noun it describes.',
  },
  {
    type: 'As…as — aussi…que',
    icon: '⚖️',
    level: 'A2',
    pattern: 'aussi + adjective/adverb + que',
    examples: [
      { fr: 'Il est aussi grand que son père.', en: 'He\'s as tall as his father.' },
      { fr: 'Elle travaille aussi dur que lui.', en: 'She works as hard as him.' },
      { fr: 'Ce vin est aussi bon que l\'autre.', en: 'This wine is as good as the other.' },
    ],
    note: 'In negative sentences, "aussi" can become "si": "Il n\'est pas si grand que ça" (He\'s not that tall).',
  },
  {
    type: 'Superlative — le plus / le moins',
    icon: '🏆',
    level: 'B1',
    pattern: 'le/la/les + plus/moins + adjective',
    examples: [
      { fr: 'C\'est le film le plus intéressant.', en: 'It\'s the most interesting film.' },
      { fr: 'Elle est la plus intelligente de la classe.', en: 'She\'s the most intelligent in the class.' },
      { fr: 'C\'est le moins cher du marché.', en: 'It\'s the cheapest on the market.' },
      { fr: 'C\'est le plus beau pays du monde.', en: 'It\'s the most beautiful country in the world.' },
    ],
    note: 'After a superlative, use "de" (not "dans") for "in": "le meilleur restaurant de Paris" = the best restaurant in Paris.',
  },
]

const IRREGULARS = [
  { adj: 'bon(ne)', comp: 'meilleur(e)', superl: 'le/la meilleur(e)', en: 'good → better → best' },
  { adj: 'mauvais(e)', comp: 'plus mauvais / pire', superl: 'le/la plus mauvais(e) / le/la pire', en: 'bad → worse → worst' },
  { adj: 'petit(e)', comp: 'plus petit(e) / moindre', superl: 'le/la plus petit(e) / le/la moindre', en: 'small → smaller → smallest' },
  { adj: 'bien (adverb)', comp: 'mieux', superl: 'le mieux', en: 'well → better → best (adverb)' },
  { adj: 'beaucoup', comp: 'plus', superl: 'le plus', en: 'much/many → more → most' },
  { adj: 'peu', comp: 'moins', superl: 'le moins', en: 'little/few → less → least' },
]

const COMPARISON_WITH_NOUNS = [
  { pattern: 'plus de + noun + que', example: 'J\'ai plus de travail que toi.', en: 'I have more work than you.' },
  { pattern: 'moins de + noun + que', example: 'Il a moins d\'expérience qu\'elle.', en: 'He has less experience than her.' },
  { pattern: 'autant de + noun + que', example: 'Elle a autant de livres que lui.', en: 'She has as many books as him.' },
]

const LEVEL_COLORS = { A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700' }

export default function FrenchComparatives() {
  const [activeComp, setActiveComp] = useState(0)
  const [tab, setTab] = useState('comparatives')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Comparatives & Superlatives | SayBonjour!" description="Master French comparatives and superlatives — plus que, moins que, aussi que, le plus, meilleur, mieux." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Comparatives & Superlatives</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le comparatif et le superlatif — more than, less than, the most, the least</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'comparatives', label: 'Comparatives' }, { id: 'irregulars', label: 'Irregulars' }, { id: 'nouns', label: 'With Nouns' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'comparatives' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {COMPARATIVES.map((c, i) => (
                <button key={c.type} onClick={() => { setActiveComp(i); addXP(3, 'grammar') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeComp === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {c.icon} {c.type.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{COMPARATIVES[activeComp].icon}</span>
                <h2 className="font-bold text-lg font-playfair text-gray-900 dark:text-cream-50">{COMPARATIVES[activeComp].type}</h2>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[COMPARATIVES[activeComp].level]}`}>{COMPARATIVES[activeComp].level}</span>
              </div>
              <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2 mb-4 font-mono text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{COMPARATIVES[activeComp].pattern}</div>
              <div className="space-y-2 mb-4">
                {COMPARATIVES[activeComp].examples.map((ex, i) => (
                  <motion.div key={ex.fr} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 border border-gray-100 dark:border-dark-warm-200 rounded-xl px-4 py-2.5">
                    <SpeakButton text={ex.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{ex.fr}"</p>
                      <p className="text-xs text-gray-400">{ex.en}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Note</p>
                <p className="text-sm text-amber-800 dark:text-amber-300">{COMPARATIVES[activeComp].note}</p>
              </div>
            </div>
          </>
        )}

        {tab === 'irregulars' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">These adjectives and adverbs have irregular comparative and superlative forms — don\'t use "plus" with them!</p>
            <div className="space-y-3">
              {IRREGULARS.map((item, i) => (
                <motion.div key={item.adj} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="border-b border-gray-50 dark:border-dark-warm-200 pb-3 last:border-0">
                  <p className="text-xs text-gray-400 font-medium mb-2">{item.en}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-xs text-gray-400">Base</p>
                      <div className="flex items-center justify-center gap-1"><SpeakButton text={item.adj} size="sm" /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.adj}</span></div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg px-2 py-1.5 text-center border border-blue-100 dark:border-blue-800">
                      <p className="text-xs text-blue-400">Comparative</p>
                      <div className="flex items-center justify-center gap-1"><SpeakButton text={item.comp.split('/')[0].trim()} size="sm" /><span className="text-sm font-bold text-blue-700 dark:text-blue-400">{item.comp}</span></div>
                    </div>
                    <div className="bg-burgundy-50 dark:bg-burgundy-vibrant-900/10 rounded-lg px-2 py-1.5 text-center border border-burgundy-100 dark:border-burgundy-vibrant-800">
                      <p className="text-xs text-burgundy-400">Superlative</p>
                      <div className="flex items-center justify-center gap-1"><SpeakButton text={item.superl.split('/')[0].trim()} size="sm" /><span className="text-sm font-bold text-burgundy-700 dark:text-burgundy-vibrant-300">{item.superl}</span></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {tab === 'nouns' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300">
              When comparing quantities (nouns), use <strong>de</strong> instead of an adjective. "Autant de" replaces "aussi" for nouns.
            </div>
            {COMPARISON_WITH_NOUNS.map((item, i) => (
              <motion.div key={item.pattern} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <code className="text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 font-bold block mb-3">{item.pattern}</code>
                <div className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5">
                  <SpeakButton text={item.example} size="sm" />
                  <div>
                    <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{item.example}"</p>
                    <p className="text-xs text-gray-400">{item.en}</p>
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
