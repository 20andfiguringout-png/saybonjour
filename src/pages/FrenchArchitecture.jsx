import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const BUILDINGS = [
  {
    name: 'La Tour Eiffel',
    en: 'The Eiffel Tower',
    city: 'Paris',
    built: 1889,
    architect: 'Gustave Eiffel',
    style: 'Fer forgé / Art industriel',
    emoji: '🗼',
    description: 'Built as a temporary exhibit for the 1889 World\'s Fair, it was initially criticised as an eyesore but became the world\'s most visited paid monument. Stands 330m tall.',
    vocab: [
      { fr: 'la tour', en: 'the tower' },
      { fr: 'le fer forgé', en: 'wrought iron' },
      { fr: 'l\'exposition universelle', en: 'the World\'s Fair / Universal Exhibition' },
      { fr: 'le sommet', en: 'the summit / top' },
    ],
    phrase: { fr: 'La Tour Eiffel brille de mille feux la nuit.', en: 'The Eiffel Tower sparkles with a thousand lights at night.' },
  },
  {
    name: 'Notre-Dame de Paris',
    en: 'Notre-Dame Cathedral',
    city: 'Paris',
    built: '1163–1345',
    architect: 'Jean de Chelles (among others)',
    style: 'Gothique',
    emoji: '⛪',
    description: 'A masterpiece of French Gothic architecture. Devastated by fire in 2019 and currently being restored. Victor Hugo\'s novel brought it back into public consciousness in 1831.',
    vocab: [
      { fr: 'le gothique', en: 'Gothic (style)' },
      { fr: 'les gargouilles', en: 'gargoyles' },
      { fr: 'le vitrail', en: 'stained glass window' },
      { fr: 'les arcs-boutants', en: 'flying buttresses' },
    ],
    phrase: { fr: 'La cathédrale est en cours de restauration depuis l\'incendie de 2019.', en: 'The cathedral has been under restoration since the 2019 fire.' },
  },
  {
    name: 'Le Château de Versailles',
    en: 'Palace of Versailles',
    city: 'Versailles (Île-de-France)',
    built: '1661–1710',
    architect: 'Louis Le Vau, Jules Hardouin-Mansart',
    style: 'Baroque / Classicisme français',
    emoji: '🏰',
    description: 'Louis XIV\'s enormous palace — a statement of absolute royal power. The Hall of Mirrors (Galerie des Glaces) is its most famous room. Home to the French court until the Revolution.',
    vocab: [
      { fr: 'le château', en: 'castle / palace' },
      { fr: 'le baroque', en: 'Baroque (style)' },
      { fr: 'les jardins', en: 'gardens' },
      { fr: 'la galerie', en: 'the gallery / hall' },
    ],
    phrase: { fr: 'La galerie des Glaces est impressionnante.', en: 'The Hall of Mirrors is impressive.' },
  },
  {
    name: 'Le Louvre',
    en: 'The Louvre',
    city: 'Paris',
    built: '1190 (fortress) / 1793 (museum)',
    architect: 'Pierre Lescot; I. M. Pei (pyramid, 1989)',
    style: 'Renaissance / Classique / Modernisme (pyramide)',
    emoji: '🔺',
    description: 'Originally a royal fortress, then a palace, now the world\'s largest art museum. The glass pyramid entrance by I. M. Pei caused controversy in 1989 but is now iconic.',
    vocab: [
      { fr: 'la pyramide de verre', en: 'the glass pyramid' },
      { fr: 'le musée', en: 'the museum' },
      { fr: 'la Renaissance', en: 'the Renaissance' },
      { fr: 'l\'enceinte', en: 'the enclosure / fortress wall' },
    ],
    phrase: { fr: 'Le Louvre abrite plus de 35 000 œuvres d\'art.', en: 'The Louvre houses more than 35,000 works of art.' },
  },
  {
    name: 'Le Centre Pompidou',
    en: 'Pompidou Centre',
    city: 'Paris',
    built: 1977,
    architect: 'Renzo Piano & Richard Rogers',
    style: 'High-Tech / Architecture industrielle',
    emoji: '🏭',
    description: 'Notoriously "inside-out" — all pipes, ducts, and escalators are on the outside and colour-coded by function. Caused outrage when built; now beloved.',
    vocab: [
      { fr: 'les conduits', en: 'ducts / pipes' },
      { fr: 'l\'escalator', en: 'escalator' },
      { fr: 'l\'architecture contemporaine', en: 'contemporary architecture' },
      { fr: 'le design industriel', en: 'industrial design' },
    ],
    phrase: { fr: 'Le Pompidou est un exemple d\'architecture high-tech.', en: 'The Pompidou is an example of high-tech architecture.' },
  },
  {
    name: 'Le Mont Saint-Michel',
    en: 'Mont Saint-Michel',
    city: 'Normandie',
    built: '8th century onwards',
    architect: 'Various medieval architects',
    style: 'Roman et Gothique médiéval',
    emoji: '🏔️',
    description: 'A tidal island topped by a medieval abbey and village. Listed as a UNESCO World Heritage Site. The mount is cut off from the mainland at high tide — one of France\'s most photographed sites.',
    vocab: [
      { fr: 'l\'abbaye', en: 'the abbey' },
      { fr: 'la marée', en: 'the tide' },
      { fr: 'l\'île', en: 'the island' },
      { fr: 'médiéval(e)', en: 'medieval' },
    ],
    phrase: { fr: 'Le Mont Saint-Michel est accessible seulement à marée basse.', en: 'Mont Saint-Michel is accessible only at low tide.' },
  },
]

const ARCH_VOCAB = [
  { fr: 'l\'arc', en: 'arch' },
  { fr: 'la voûte', en: 'vault / arch ceiling' },
  { fr: 'le pilier', en: 'pillar / column' },
  { fr: 'la façade', en: 'façade / front face' },
  { fr: 'le portail', en: 'doorway / portal' },
  { fr: 'la coupole', en: 'dome / cupola' },
  { fr: 'la flèche', en: 'spire (church)' },
  { fr: 'le clocher', en: 'bell tower' },
  { fr: 'la nef', en: 'nave (of a church)' },
  { fr: 'le transept', en: 'transept' },
  { fr: 'le beffroi', en: 'belfry' },
  { fr: 'les remparts', en: 'ramparts / walls' },
  { fr: 'le donjon', en: 'keep (castle tower)' },
  { fr: 'le palais', en: 'palace' },
  { fr: 'l\'hôtel de ville', en: 'town hall' },
]

export default function FrenchArchitecture() {
  const [expanded, setExpanded] = useState(null)
  const [tab, setTab] = useState('landmarks')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Architecture | SayBonjour!" description="Explore famous French buildings and architecture vocabulary — from Gothic cathedrals to modernist icons." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Architecture</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L\'architecture française — from Gothic cathedrals to modernist icons</p>
        </div>

        <div className="flex gap-3 mb-8">
          {[{ id: 'landmarks', label: 'Landmarks' }, { id: 'vocab', label: 'Vocabulary' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'landmarks' && (
          <div className="space-y-4">
            {BUILDINGS.map((building, i) => {
              const isOpen = expanded === building.name
              return (
                <motion.div key={building.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                  <button onClick={() => setExpanded(isOpen ? null : building.name)}
                    className="w-full text-left px-6 py-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-stone-100 to-gray-200 dark:from-stone-700/20 dark:to-gray-700/20 flex items-center justify-center text-3xl shrink-0">{building.emoji}</div>
                    <div className="flex-1">
                      <h2 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{building.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{building.city} · {building.built} · <span className="italic">{building.style}</span></p>
                    </div>
                    {isOpen ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{building.description}</p>
                          <p className="text-xs text-gray-400">Architect(s): {building.architect}</p>

                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Key vocabulary</p>
                            <div className="flex flex-wrap gap-2">
                              {building.vocab.map(v => (
                                <div key={v.fr} className="flex items-center gap-1.5 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-1.5">
                                  <SpeakButton text={v.fr} size="sm" />
                                  <span className="text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 font-medium">{v.fr}</span>
                                  <span className="text-xs text-gray-400">— {v.en}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-start gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                            <SpeakButton text={building.phrase.fr} size="sm" />
                            <div>
                              <p className="text-sm italic text-gray-700 dark:text-gray-300">"{building.phrase.fr}"</p>
                              <p className="text-xs text-gray-400">{building.phrase.en}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}

        {tab === 'vocab' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-5">Architecture vocabulary</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {ARCH_VOCAB.map(v => (
                <div key={v.fr} className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                  <SpeakButton text={v.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{v.en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
