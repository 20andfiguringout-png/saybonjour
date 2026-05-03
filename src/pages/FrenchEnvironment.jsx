import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Sun, Droplets } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const ENV_SECTIONS = [
  {
    category: 'Nature — La nature',
    items: [
      { fr: 'la forêt', en: 'forest' },
      { fr: 'la montagne', en: 'mountain' },
      { fr: 'la mer', en: 'sea' },
      { fr: 'l\'océan', en: 'ocean' },
      { fr: 'la rivière', en: 'river' },
      { fr: 'le fleuve', en: 'large river (flowing to sea)', note: 'La Seine, La Loire, Le Rhône are all "fleuves"' },
      { fr: 'le lac', en: 'lake' },
      { fr: 'la prairie', en: 'meadow / grassland' },
      { fr: 'le désert', en: 'desert' },
      { fr: 'la côte', en: 'coast' },
      { fr: 'le littoral', en: 'coastline / seashore' },
      { fr: 'la campagne', en: 'countryside' },
      { fr: 'la faune', en: 'wildlife / fauna' },
      { fr: 'la flore', en: 'plant life / flora' },
      { fr: 'un écosystème', en: 'an ecosystem' },
      { fr: 'la biodiversité', en: 'biodiversity' },
    ],
  },
  {
    category: 'Environment & Climate — L\'environnement et le climat',
    items: [
      { fr: 'le réchauffement climatique', en: 'global warming' },
      { fr: 'le changement climatique', en: 'climate change' },
      { fr: 'les gaz à effet de serre', en: 'greenhouse gases' },
      { fr: 'le CO₂ / le dioxyde de carbone', en: 'CO₂ / carbon dioxide' },
      { fr: 'l\'empreinte carbone', en: 'carbon footprint' },
      { fr: 'la pollution', en: 'pollution' },
      { fr: 'la pollution atmosphérique', en: 'air pollution' },
      { fr: 'la pollution des eaux', en: 'water pollution' },
      { fr: 'la déforestation', en: 'deforestation' },
      { fr: 'une sécheresse', en: 'a drought' },
      { fr: 'une inondation', en: 'a flood' },
      { fr: 'une canicule', en: 'a heatwave' },
      { fr: 'la montée des eaux', en: 'rising sea levels' },
      { fr: 'l\'extinction des espèces', en: 'extinction of species' },
    ],
  },
  {
    category: 'Green Living — Vivre vert',
    items: [
      { fr: 'le développement durable', en: 'sustainable development', note: 'The key phrase in French environmental policy' },
      { fr: 'les énergies renouvelables', en: 'renewable energies' },
      { fr: 'l\'énergie solaire', en: 'solar energy' },
      { fr: 'l\'énergie éolienne', en: 'wind energy' },
      { fr: 'le recyclage', en: 'recycling' },
      { fr: 'recycler', en: 'to recycle' },
      { fr: 'le compostage', en: 'composting' },
      { fr: 'une poubelle', en: 'a bin / dustbin' },
      { fr: 'le tri sélectif', en: 'waste sorting / selective recycling', note: 'France has colour-coded bins for waste sorting' },
      { fr: 'un sac réutilisable', en: 'a reusable bag' },
      { fr: 'bio / biologique', en: 'organic', note: 'A label heavily used in French food marketing' },
      { fr: 'le bilan carbone', en: 'carbon footprint / carbon audit' },
      { fr: 'le vélo en libre-service', en: 'bike-sharing scheme', note: 'Vélib\' in Paris is iconic' },
      { fr: 'le covoiturage', en: 'carpooling' },
    ],
  },
]

const ENV_PHRASES = [
  { fr: 'Il faut agir maintenant contre le changement climatique.', en: 'We must act now against climate change.' },
  { fr: 'Je fais attention à mon empreinte carbone.', en: 'I pay attention to my carbon footprint.' },
  { fr: 'On a trié nos déchets toute la semaine.', en: 'We sorted our rubbish all week.' },
  { fr: 'La sécheresse a détruit les récoltes.', en: 'The drought destroyed the crops.' },
  { fr: 'La France s\'est engagée à réduire ses émissions.', en: 'France has committed to reducing its emissions.' },
  { fr: 'Acheter bio, c\'est meilleur pour la planète.', en: 'Buying organic is better for the planet.' },
  { fr: 'On utilise des sacs réutilisables depuis des années.', en: 'We\'ve been using reusable bags for years.' },
  { fr: 'Les énergies renouvelables sont l\'avenir.', en: 'Renewable energies are the future.' },
]

const FRANCE_ENV_FACTS = [
  { fact: 'Nuclear power', fr: 'Le nucléaire', detail: 'France generates ~70% of its electricity from nuclear power — the highest share in the world. Highly debated.', emoji: '⚛️' },
  { fact: 'Vélib\' bike scheme', fr: 'Le Vélib\'', detail: 'Paris\' iconic self-service bicycle scheme, launched 2007. Now also has electric bikes (Vélib\' Métropole).', emoji: '🚲' },
  { fact: 'Plastic bag ban', fr: 'L\'interdiction des sacs plastiques', detail: 'France banned single-use plastic bags in 2016 and has progressively banned other single-use plastics.', emoji: '🛍️' },
  { fact: 'The Paris Agreement', fr: 'L\'Accord de Paris', detail: 'Landmark 2015 climate treaty signed in Paris. France was central in brokering the agreement.', emoji: '🌍' },
  { fact: 'National parks', fr: 'Les parcs nationaux', detail: 'France has 11 national parks (parcs nationaux) protecting exceptional natural areas, from the Alps to Reunion island.', emoji: '🏔️' },
]

export default function FrenchEnvironment() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Environment Vocabulary | SayBonjour!" description="Learn French environment and nature vocabulary — climate change, recycling, green living, and French eco facts." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Environment in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L\'environnement — nature, climate, and green living vocabulary</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'facts', label: 'France & the Environment' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ENV_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-emerald-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{ENV_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {ENV_SECTIONS[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-emerald-700 dark:text-emerald-400">{item.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                      </div>
                      {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'facts' && (
          <div className="space-y-4">
            {FRANCE_ENV_FACTS.map((item, i) => (
              <motion.div key={item.fact} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{item.fact}</h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 italic mb-1">{item.fr}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {ENV_PHRASES.map((phrase, i) => (
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
