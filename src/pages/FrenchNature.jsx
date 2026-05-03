import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Mountain, Droplets } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const NATURE_GROUPS = [
  {
    category: 'Landscapes & Geography',
    emoji: '🏔️',
    items: [
      { fr: 'la montagne', en: 'the mountain' },
      { fr: 'la mer', en: 'the sea' },
      { fr: 'l\'océan', en: 'the ocean' },
      { fr: 'la plage', en: 'the beach' },
      { fr: 'la forêt', en: 'the forest' },
      { fr: 'la campagne', en: 'the countryside' },
      { fr: 'la rivière', en: 'the river (smaller, flows into another river)', note: '"Rivière" flows into another river; "fleuve" flows into the sea' },
      { fr: 'le fleuve', en: 'the river (large, flows to sea)' },
      { fr: 'le lac', en: 'the lake' },
      { fr: 'la vallée', en: 'the valley' },
      { fr: 'la colline', en: 'the hill' },
      { fr: 'la côte', en: 'the coast' },
      { fr: 'l\'île (f)', en: 'the island' },
      { fr: 'le désert', en: 'the desert' },
    ],
  },
  {
    category: 'Plants & Trees',
    emoji: '🌳',
    items: [
      { fr: 'un arbre', en: 'a tree' },
      { fr: 'une fleur', en: 'a flower' },
      { fr: 'l\'herbe (f)', en: 'grass' },
      { fr: 'un chêne', en: 'an oak tree' },
      { fr: 'un peuplier', en: 'a poplar tree', note: 'Iconic in the French countryside' },
      { fr: 'un rosier', en: 'a rose bush' },
      { fr: 'le tournesol', en: 'the sunflower', note: 'Lit. "turns with the sun"' },
      { fr: 'la lavande', en: 'lavender', note: 'Associated with Provence' },
      { fr: 'le blé', en: 'wheat', note: 'Vast wheat fields cover northern France' },
      { fr: 'la vigne', en: 'the vine / vineyard plant' },
      { fr: 'la feuille', en: 'the leaf' },
      { fr: 'la branche', en: 'the branch' },
    ],
  },
  {
    category: 'Weather & Sky',
    emoji: '⛅',
    items: [
      { fr: 'le soleil', en: 'the sun' },
      { fr: 'le nuage', en: 'the cloud' },
      { fr: 'la pluie', en: 'the rain' },
      { fr: 'la neige', en: 'the snow' },
      { fr: 'le vent', en: 'the wind' },
      { fr: 'l\'orage (m)', en: 'the storm / thunderstorm' },
      { fr: 'la foudre', en: 'lightning / a lightning bolt' },
      { fr: 'le tonnerre', en: 'thunder' },
      { fr: 'l\'arc-en-ciel (m)', en: 'the rainbow', note: 'Lit. "arc in the sky"' },
      { fr: 'le brouillard', en: 'the fog' },
      { fr: 'la grêle', en: 'hail' },
      { fr: 'le givre', en: 'frost' },
    ],
  },
  {
    category: 'Environment',
    emoji: '🌍',
    items: [
      { fr: 'l\'environnement (m)', en: 'the environment' },
      { fr: 'le réchauffement climatique', en: 'global warming' },
      { fr: 'le changement climatique', en: 'climate change' },
      { fr: 'la pollution', en: 'pollution' },
      { fr: 'le recyclage', en: 'recycling' },
      { fr: 'les énergies renouvelables', en: 'renewable energy' },
      { fr: 'la biodiversité', en: 'biodiversity' },
      { fr: 'le développement durable', en: 'sustainable development' },
      { fr: 'les espèces menacées', en: 'endangered species' },
    ],
  },
]

const NATURE_PHRASES = [
  { fr: 'Il fait beau aujourd\'hui.', en: 'The weather is lovely today.' },
  { fr: 'On va à la montagne ce week-end.', en: 'We\'re going to the mountains this weekend.' },
  { fr: 'La Seine est le fleuve de Paris.', en: 'The Seine is Paris\'s river.' },
  { fr: 'J\'adore me promener en forêt.', en: 'I love walking in the forest.' },
  { fr: 'La lavande pousse en Provence.', en: 'Lavender grows in Provence.' },
  { fr: 'Protéger la nature est essentiel.', en: 'Protecting nature is essential.' },
]

export default function FrenchNature() {
  const [tab, setTab] = useState('nature')
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Nature Vocabulary | SayBonjour!" description="Learn French nature vocabulary — landscapes, plants, weather, environment — with useful phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Nature in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La nature — landscapes, plants, weather, and the environment</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'nature', label: 'Vocabulary' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'nature' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {NATURE_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.emoji} {g.category}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {NATURE_GROUPS[activeGroup].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2">
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                    <p className="text-xs text-gray-400">{item.en}</p>
                    {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {NATURE_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
