import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Train, MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const TRAVEL_SECTIONS = [
  {
    category: 'Transport — Les transports',
    items: [
      { fr: 'l\'avion', en: 'plane', note: 'Prendre l\'avion = to fly' },
      { fr: 'le train', en: 'train', note: 'France has an extensive TGV (high-speed train) network' },
      { fr: 'le TGV', en: 'high-speed train', note: 'Train à Grande Vitesse — up to 320km/h' },
      { fr: 'le métro', en: 'the underground / metro', note: 'Paris has 16 metro lines' },
      { fr: 'le RER', en: 'regional express network', note: 'Commuter trains connecting Paris suburbs' },
      { fr: 'le bus', en: 'bus' },
      { fr: 'le car', en: 'coach (long-distance bus)', note: '"Car" = coach; "autocar" = full word' },
      { fr: 'le taxi', en: 'taxi' },
      { fr: 'la voiture', en: 'car' },
      { fr: 'le vélo', en: 'bicycle / bike' },
      { fr: 'la trottinette électrique', en: 'electric scooter' },
      { fr: 'le ferry / le bateau', en: 'ferry / boat' },
    ],
  },
  {
    category: 'At the Station / Airport — En gare / À l\'aéroport',
    items: [
      { fr: 'un billet', en: 'a ticket' },
      { fr: 'un aller simple', en: 'a single ticket (one way)' },
      { fr: 'un aller-retour', en: 'a return ticket (round trip)' },
      { fr: 'le quai', en: 'the platform (train)', note: 'In Paris metro: "le quai"' },
      { fr: 'la voie', en: 'the track / platform', note: '"Voie 3" = Track 3' },
      { fr: 'la salle d\'attente', en: 'the waiting room' },
      { fr: 'le contrôle des passeports', en: 'passport control' },
      { fr: 'l\'embarquement', en: 'boarding (flight or ferry)' },
      { fr: 'la porte d\'embarquement', en: 'the departure gate' },
      { fr: 'la bagagerie', en: 'baggage area' },
      { fr: 'les bagages à main', en: 'hand luggage / carry-on' },
      { fr: 'une valise', en: 'a suitcase' },
      { fr: 'un retard', en: 'a delay' },
      { fr: 'annulé(e)', en: 'cancelled' },
      { fr: 'à l\'heure', en: 'on time' },
    ],
  },
  {
    category: 'Accommodation — L\'hébergement',
    items: [
      { fr: 'un hôtel', en: 'a hotel' },
      { fr: 'une chambre d\'hôtes', en: 'a bed and breakfast / guesthouse' },
      { fr: 'un gîte', en: 'a self-catering holiday home', note: 'Very popular in French rural tourism' },
      { fr: 'un camping', en: 'a campsite' },
      { fr: 'une auberge de jeunesse', en: 'a youth hostel' },
      { fr: 'réserver', en: 'to book / reserve' },
      { fr: 'une réservation', en: 'a booking / reservation' },
      { fr: 'l\'enregistrement', en: 'check-in' },
      { fr: 'le départ', en: 'check-out / departure' },
      { fr: 'une chambre simple / double', en: 'a single / double room' },
      { fr: 'la réception', en: 'reception desk' },
      { fr: 'le petit-déjeuner inclus', en: 'breakfast included' },
    ],
  },
  {
    category: 'Sightseeing — Visites touristiques',
    items: [
      { fr: 'un musée', en: 'a museum' },
      { fr: 'une exposition', en: 'an exhibition' },
      { fr: 'un monument', en: 'a monument' },
      { fr: 'un château', en: 'a castle / palace' },
      { fr: 'une cathédrale', en: 'a cathedral' },
      { fr: 'un quartier', en: 'a neighbourhood / district' },
      { fr: 'le centre-ville', en: 'the town / city centre' },
      { fr: 'un guide touristique', en: 'a tour guide / guidebook' },
      { fr: 'une visite guidée', en: 'a guided tour' },
      { fr: 'l\'entrée (gratuite / payante)', en: 'admission (free / paid)' },
      { fr: 'les horaires d\'ouverture', en: 'opening hours' },
      { fr: 'fermé le lundi', en: 'closed on Mondays', note: 'Many French museums close on Mondays or Tuesdays' },
    ],
  },
]

const TRAVEL_PHRASES = [
  { fr: 'Un aller-retour pour Lyon, s\'il vous plaît.', en: 'A return ticket to Lyon, please.' },
  { fr: 'Le train est à quelle heure ?', en: 'What time is the train?' },
  { fr: 'Est-ce que ce siège est libre ?', en: 'Is this seat free?' },
  { fr: 'Je cherche la gare routière.', en: 'I\'m looking for the bus station.' },
  { fr: 'Le vol est retardé d\'une heure.', en: 'The flight is delayed by an hour.' },
  { fr: 'J\'ai perdu mes bagages.', en: 'I\'ve lost my luggage.' },
  { fr: 'Pouvez-vous m\'indiquer le chemin pour aller à…?', en: 'Can you show me the way to…?' },
  { fr: 'C\'est à combien de temps à pied ?', en: 'How far is it on foot?' },
  { fr: 'Je voudrais réserver une chambre pour deux nuits.', en: 'I\'d like to book a room for two nights.' },
  { fr: 'À quelle heure est le petit-déjeuner ?', en: 'What time is breakfast?' },
]

const FRENCH_DESTINATIONS = [
  { name: 'Paris', emoji: '🗼', highlight: 'The Eiffel Tower, the Louvre, Montmartre, Notre-Dame' },
  { name: 'Provence', emoji: '🌿', highlight: 'Lavender fields, the Camargue, Arles, Aix-en-Provence' },
  { name: 'Côte d\'Azur', emoji: '🌊', highlight: 'Nice, Cannes, Monaco, the French Riviera beaches' },
  { name: 'Les Alpes', emoji: '⛷️', highlight: 'Chamonix, Annecy, skiing, Mont Blanc (4,808m)' },
  { name: 'Bretagne', emoji: '🦞', highlight: 'Celtic culture, crêpes, Carnac megaliths, rugged coast' },
  { name: 'Bordeaux', emoji: '🍷', highlight: 'Wine capital of the world, UNESCO city, Dune du Pilat' },
  { name: 'Alsace', emoji: '🏡', highlight: 'Colmar, Route des Vins, Germanic-French culture' },
  { name: 'Normandie', emoji: '🏖️', highlight: 'D-Day beaches, Mont Saint-Michel, calvados and camembert' },
]

export default function FrenchTravel() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Travel Vocabulary | SayBonjour!" description="Learn French travel vocabulary — transport, airports, hotels, sightseeing, and key destinations." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Travel in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les voyages en français — transport, accommodation, and sightseeing</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'destinations', label: 'French Destinations' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {TRAVEL_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{TRAVEL_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {TRAVEL_SECTIONS[activeCategory].items.map(item => (
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

        {tab === 'destinations' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {FRENCH_DESTINATIONS.map((dest, i) => (
              <motion.div key={dest.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{dest.emoji}</span>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{dest.name}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{dest.highlight}</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {TRAVEL_PHRASES.map((phrase, i) => (
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
