import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Train, Bike } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const TRANSPORT_SECTIONS = [
  {
    category: 'Road — La route',
    items: [
      { fr: 'une voiture', en: 'a car' },
      { fr: 'conduire', en: 'to drive' },
      { fr: 'le permis de conduire', en: 'the driving licence', note: 'French test requires separate theory (code) and practical exams' },
      { fr: 'l\'autoroute', en: 'motorway / highway', note: 'Most French motorways are toll roads (péages)' },
      { fr: 'le péage', en: 'toll / toll booth' },
      { fr: 'une route nationale', en: 'an A-road / national road', note: 'Prefix: N or RN on maps' },
      { fr: 'une route départementale', en: 'a B-road / departmental road', note: 'Prefix: D on maps' },
      { fr: 'un rond-point', en: 'a roundabout', note: 'France has more roundabouts than any other country' },
      { fr: 'un feu (rouge/vert)', en: 'a traffic light (red/green)' },
      { fr: 'un passage piéton', en: 'a pedestrian crossing' },
      { fr: 'la limitation de vitesse', en: 'speed limit', note: 'France: 130km/h motorway, 80km/h rural roads, 50km/h urban' },
      { fr: 'un stationnement', en: 'a parking space' },
      { fr: 'faire le plein', en: 'to fill up (petrol/fuel)' },
      { fr: 'le gazole / le gasoil', en: 'diesel' },
      { fr: 'l\'essence (sans plomb)', en: 'petrol (unleaded)' },
      { fr: 'une voiture électrique', en: 'an electric car' },
    ],
  },
  {
    category: 'Public Transport — Les transports en commun',
    items: [
      { fr: 'les transports en commun', en: 'public transport' },
      { fr: 'le métro', en: 'underground / metro' },
      { fr: 'le tram / le tramway', en: 'tram / streetcar' },
      { fr: 'le bus', en: 'bus' },
      { fr: 'un arrêt de bus', en: 'a bus stop' },
      { fr: 'la ligne', en: 'the line (bus/metro)', note: 'Ligne 1, Ligne 2, etc.' },
      { fr: 'la correspondance', en: 'a connection / transfer', note: '"Faire une correspondance" = to change (trains/lines)' },
      { fr: 'valider son titre de transport', en: 'to validate your ticket', note: 'Must tap/insert ticket before boarding in France' },
      { fr: 'le contrôleur', en: 'the ticket inspector', note: 'Can fine you if you haven\'t validated' },
      { fr: 'une amende', en: 'a fine / penalty' },
      { fr: 'le SNCF', en: 'France\'s national rail company', note: 'Société Nationale des Chemins de fer Français' },
      { fr: 'le TGV', en: 'high-speed train', note: 'Train à Grande Vitesse — Paris-Lyon in 2 hours' },
      { fr: 'Eurostar', en: 'high-speed channel tunnel train', note: 'London-Paris in ~2h15' },
      { fr: 'le Navigo', en: 'Paris metro pass', note: 'Monthly travel card for Paris region — replaced the Carte Orange' },
    ],
  },
  {
    category: 'Cycling — Le vélo',
    items: [
      { fr: 'un vélo', en: 'a bicycle / bike' },
      { fr: 'un vélo électrique / un VAE', en: 'an e-bike', note: 'VAE = vélo à assistance électrique' },
      { fr: 'le Vélib\'', en: 'Paris bike-share scheme', note: 'Available across Paris and inner suburbs' },
      { fr: 'une piste cyclable', en: 'a cycle lane' },
      { fr: 'un casque', en: 'a helmet', note: 'Mandatory for children under 12 in France' },
      { fr: 'crevaison', en: 'a puncture', note: '"J\'ai crevé" = I\'ve got a puncture' },
      { fr: 'garer son vélo', en: 'to park your bike' },
      { fr: 'la trottinette électrique', en: 'an electric scooter', note: 'Very popular in French cities — dedicated zones' },
    ],
  },
]

const DRIVING_PHRASES = [
  { fr: 'Prenez la deuxième rue à droite.', en: 'Take the second street on the right.' },
  { fr: 'Continuez tout droit.', en: 'Go straight ahead.' },
  { fr: 'Faites demi-tour au prochain carrefour.', en: 'Turn around at the next junction.' },
  { fr: 'Il y a des embouteillages sur le périphérique.', en: 'There are traffic jams on the ring road.' },
  { fr: 'Le parking est complet.', en: 'The car park is full.' },
  { fr: 'J\'ai manqué mon train.', en: 'I\'ve missed my train.' },
  { fr: 'Le prochain départ est dans vingt minutes.', en: 'The next departure is in twenty minutes.' },
  { fr: 'Compostez votre billet avant de monter.', en: 'Validate your ticket before boarding.', note: 'Regional trains in France require ticket stamping in a machine' },
  { fr: 'La voiture est en panne.', en: 'The car has broken down.' },
  { fr: 'Appelle le dépanneur !', en: 'Call the breakdown service!' },
]

export default function FrenchTransport() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Transport Vocabulary | SayBonjour!" description="Learn French transport vocabulary — driving, public transport, cycling, and getting around in France." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Getting Around in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les transports — roads, public transport, and cycling in France</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {TRANSPORT_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{TRANSPORT_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {TRANSPORT_SECTIONS[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {DRIVING_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                  {phrase.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {phrase.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
