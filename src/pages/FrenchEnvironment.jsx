import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Sun, Droplets, Megaphone } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ENV_SECTIONS = [
  {
    category: 'Nature',
    fr: 'La nature',
    items: [
      { fr: 'la forêt', en: 'forest', note: 'France\'s forests cover 31% of its territory — the largest forested area in Western Europe' },
      { fr: 'la forêt primaire', en: 'old-growth / primary forest' },
      { fr: 'la montagne', en: 'mountain', note: 'The Alps, Pyrénées, Massif Central, and Vosges are France\'s main mountain ranges' },
      { fr: 'la mer', en: 'sea', note: 'France borders the Mediterranean (La Méditerranée) and the Atlantic (L\'Atlantique)' },
      { fr: 'un fleuve', en: 'a large river (flowing to the sea)', note: 'La Seine, La Loire, Le Rhône, La Garonne — all "fleuves". A river that flows into another river is "une rivière"' },
      { fr: 'une rivière', en: 'a river (flowing into another river)' },
      { fr: 'un marais', en: 'a marsh / wetland', note: 'The Marais Poitevin in western France is known as the "Green Venice"' },
      { fr: 'la lande', en: 'heathland / moorland', note: 'Les Landes in SW France is Europe\'s largest pine forest — planted by Napoleon III' },
      { fr: 'la prairie', en: 'meadow / grassland' },
      { fr: 'la faune', en: 'wildlife / fauna' },
      { fr: 'la flore', en: 'plant life / flora' },
      { fr: 'un écosystème', en: 'an ecosystem' },
      { fr: 'la biodiversité', en: 'biodiversity', note: 'France hosts some of Europe\'s richest biodiversity — from alpine flora to Mediterranean scrubland' },
      { fr: 'une espèce menacée', en: 'an endangered species' },
      { fr: 'une espèce en voie d\'extinction', en: 'a species on the verge of extinction' },
    ],
  },
  {
    category: 'Climate & Pollution',
    fr: 'Le climat et la pollution',
    items: [
      { fr: 'le réchauffement climatique', en: 'global warming' },
      { fr: 'le changement climatique', en: 'climate change', note: 'Central to French political debate — "transition écologique" is official government language' },
      { fr: 'les gaz à effet de serre (GES)', en: 'greenhouse gases', note: 'Methane (méthane), CO₂, and nitrous oxide (protoxyde d\'azote) are the key ones' },
      { fr: 'le CO₂ / le dioxyde de carbone', en: 'CO₂ / carbon dioxide' },
      { fr: 'l\'empreinte carbone', en: 'carbon footprint', note: '"Calculer son empreinte carbone" = to calculate one\'s carbon footprint' },
      { fr: 'la neutralité carbone', en: 'carbon neutrality / net zero' },
      { fr: 'la pollution atmosphérique', en: 'air pollution', note: 'Paris regularly exceeds EU pollution limits, especially from traffic' },
      { fr: 'les particules fines', en: 'fine particles / particulate matter (PM2.5)', note: 'A major public health concern in French cities' },
      { fr: 'la pollution des eaux', en: 'water pollution' },
      { fr: 'la pollution des sols', en: 'soil pollution', note: 'A significant issue in former industrial regions of northern France' },
      { fr: 'la déforestation', en: 'deforestation' },
      { fr: 'une sécheresse', en: 'a drought', note: 'France experienced record droughts in 2022 and 2023, affecting rivers and agriculture' },
      { fr: 'une inondation', en: 'a flood', note: '"La crue de la Seine" = the flooding of the Seine — a recurring risk for Paris' },
      { fr: 'une canicule', en: 'a heatwave', note: 'The 2003 French heatwave killed over 14,000 people — led to major public health policy changes' },
      { fr: 'la montée des eaux', en: 'rising sea levels', note: 'French coastal communities from Normandy to the Camargue face serious erosion risks' },
    ],
  },
  {
    category: 'Green Living',
    fr: 'Vivre vert',
    items: [
      { fr: 'le développement durable', en: 'sustainable development', note: 'The key phrase in French environmental and government policy — often abbreviated "DD"' },
      { fr: 'les énergies renouvelables', en: 'renewable energies', note: 'Wind, solar, hydro — France aims to reach 40% renewable energy by 2030' },
      { fr: 'l\'énergie solaire', en: 'solar energy' },
      { fr: 'l\'énergie éolienne', en: 'wind energy', note: 'France has major offshore wind projects planned in the Atlantic and English Channel' },
      { fr: 'l\'énergie hydraulique', en: 'hydropower' },
      { fr: 'le recyclage', en: 'recycling', note: 'France has colour-coded bins: yellow (recyclable packaging), green (glass), grey (general waste)' },
      { fr: 'le tri sélectif', en: 'selective waste sorting', note: '"Trier ses déchets" = to sort your rubbish — a civic duty increasingly enforced in France' },
      { fr: 'le compostage', en: 'composting', note: 'France mandated composting for all households by law in 2023' },
      { fr: 'les déchets', en: 'waste / rubbish', note: '"Zéro déchet" (zero waste) is a growing movement in France' },
      { fr: 'bio / biologique', en: 'organic', note: 'France is the largest organic farming market in Europe. Look for the "AB" (Agriculture Biologique) label' },
      { fr: 'le bilan carbone', en: 'carbon footprint / carbon audit' },
      { fr: 'le vélo en libre-service', en: 'bike-sharing scheme', note: 'Vélib\' in Paris (1,400 stations) and Véloh\' in Lyon — iconic French urban transport' },
      { fr: 'le covoiturage', en: 'carpooling', note: 'BlaBlaCar, a French company, is the world\'s largest carpooling platform' },
      { fr: 'le circuit court', en: 'short supply chain (local food supply)', note: '"Manger local" (eat local) is a strong trend in France — farmers\' markets (marchés) are central' },
    ],
  },
  {
    category: 'Environmental Activism',
    fr: 'L\'activisme environnemental',
    items: [
      { fr: 'une manifestation / une manif\'', en: 'a protest / demonstration', note: 'France has a long tradition of street protest — environmental marches are growing' },
      { fr: 'une pétition', en: 'a petition' },
      { fr: 'un militant / une militante écologiste', en: 'an environmental activist' },
      { fr: 'la désobéissance civile', en: 'civil disobedience' },
      { fr: 'une ONG (Organisation Non Gouvernementale)', en: 'an NGO (Non-Governmental Organisation)', note: 'Greenpeace France, WWF France, and Les Amis de la Terre are key French environmental NGOs' },
      { fr: 'le lobbying environnemental', en: 'environmental lobbying' },
      { fr: 'la Convention Citoyenne pour le Climat', en: 'the Citizens\' Climate Convention', note: 'A 2019-2020 French initiative where 150 randomly selected citizens proposed climate laws — a world-first experiment in deliberative democracy' },
      { fr: 'L\'Affaire du Siècle', en: 'The Case of the Century', note: 'A landmark 2021 French court ruling that found the French state guilty of failing its climate commitments — a historic legal victory for NGOs' },
      { fr: 'le greenwashing', en: 'greenwashing', note: '"Verdissement" is the official French term but "greenwashing" is universally used — France banned it in advertising in 2023' },
    ],
  },
]

const ENV_PHRASES = [
  { fr: 'Il faut agir maintenant contre le changement climatique.', en: 'We must act now against climate change.' },
  { fr: 'Je fais attention à mon empreinte carbone.', en: 'I pay attention to my carbon footprint.' },
  { fr: 'On a trié nos déchets toute la semaine.', en: 'We sorted our rubbish all week.' },
  { fr: 'La sécheresse a détruit les récoltes cette année.', en: 'The drought destroyed the crops this year.' },
  { fr: 'La France s\'est engagée à réduire ses émissions de 40 %.', en: 'France has committed to reducing its emissions by 40%.' },
  { fr: 'Acheter bio, c\'est meilleur pour la planète.', en: 'Buying organic is better for the planet.' },
  { fr: 'Nous utilisons des sacs réutilisables depuis des années.', en: 'We\'ve been using reusable bags for years.' },
  { fr: 'Les énergies renouvelables sont l\'avenir.', en: 'Renewable energies are the future.' },
  { fr: 'Je milite pour la protection des zones humides.', en: 'I campaign for the protection of wetlands.' },
  { fr: 'Le réchauffement climatique menace notre mode de vie.', en: 'Global warming threatens our way of life.' },
  { fr: 'On ne peut plus ignorer la crise écologique.', en: 'We can no longer ignore the ecological crisis.' },
  { fr: 'C\'est une question de survie pour les générations futures.', en: 'It\'s a question of survival for future generations.' },
]

const FRANCE_ENV_FACTS = [
  { fact: 'Nuclear Power', fr: 'Le nucléaire', detail: 'France generates around 70% of its electricity from nuclear energy — the highest share of any country in the world. Highly debated: supporters cite near-zero carbon emissions, critics point to waste storage and safety. The government is now building new EPR reactors while also investing in renewables.', emoji: '⚛️' },
  { fact: 'The Paris Agreement', fr: 'L\'Accord de Paris', detail: 'The landmark 2015 climate treaty was signed in Paris after two weeks of negotiations. France was instrumental in brokering the deal. It aims to limit global warming to 1.5°C above pre-industrial levels. As of 2024, all major economies have ratified it.', emoji: '🌍' },
  { fact: 'Vélib\' Bike Scheme', fr: 'Le Vélib\'', detail: 'Launched in Paris in 2007, Vélib\' (vélo + liberté) was a pioneering urban bike-sharing scheme. Now Vélib\' Métropole has 20,000 bikes (including electric) across 1,400 stations. It inspired similar schemes worldwide.', emoji: '🚲' },
  { fact: 'Plastic Ban', fr: 'L\'interdiction des plastiques', detail: 'France was one of the first European countries to ban single-use plastic bags (2016), plastic straws, cutlery, and cotton buds (2020). From 2022, raw fruit and vegetables must be sold without plastic packaging.', emoji: '🛍️' },
  { fact: 'National Parks', fr: 'Les parcs nationaux', detail: 'France has 11 national parks (parcs nationaux) protecting unique ecosystems: from the Pyrénées to the Cévennes, from the Calanques (coastal Provence) to Guadeloupe in the Caribbean.', emoji: '🏔️' },
  { fact: 'Citizens\' Climate Convention', fr: 'La Convention Citoyenne pour le Climat', detail: 'In 2019, France convened 150 randomly selected citizens to propose climate legislation — a groundbreaking experiment in participatory democracy. They produced 149 proposals; some became law, others were rejected or diluted — sparking debate about representative democracy.', emoji: '🗳️' },
]

export default function FrenchEnvironment() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Environment Vocabulary | SayBonjour!" description="Learn French environment and nature vocabulary — climate change, recycling, activism, and France's environmental story." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Environment in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L'environnement — nature, climate change, green living, and activism vocabulary</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Vocabulary' },
            { id: 'facts', label: 'France & the Environment' },
            { id: 'phrases', label: 'Key Phrases' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-emerald-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ENV_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-emerald-300'}`}>
                  {cat.category}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-1">{ENV_SECTIONS[activeCategory].category}</h2>
              <p className="text-xs text-gray-400 italic mb-4">{ENV_SECTIONS[activeCategory].fr}</p>
              <div className="space-y-3">
                {ENV_SECTIONS[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0"
                    onClick={() => addXP(2, 'vocabulary')}>
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
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(3, 'vocabulary')}>
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-0.5">{item.fact}</h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 italic mb-1">{item.fr}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {ENV_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
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
