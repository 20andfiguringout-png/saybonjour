import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Train, Bike } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const TRANSPORT_SECTIONS = [
  {
    category: 'Road — La route',
    emoji: '🚗',
    items: [
      { fr: 'une voiture', en: 'a car', note: '"Prendre la voiture" = to drive / take the car. "La voiture électrique" is increasingly common.' },
      { fr: 'conduire', en: 'to drive', note: 'Irregular verb: je conduis, tu conduis, il conduit, nous conduisons. Past participle: conduit.' },
      { fr: 'le permis de conduire', en: 'the driving licence', note: 'French test is expensive (€1,500–3,000 average) and includes separate theory (le code) and practical exams.' },
      { fr: 'l\'autoroute', en: 'motorway / highway', note: 'Most French motorways are toll roads (payantes). Exceptions: Paris ring road (le Périphérique).' },
      { fr: 'le péage', en: 'toll / toll booth', note: 'Motorway tolls can be significant for long journeys. Télépéage (electronic tolling) = Liber-t badge.' },
      { fr: 'une route nationale (RN / N)', en: 'an A-road / national road', note: 'Slower than motorways but free — the French "alte-route" option. N7 = the famous "route bleue" to the south.' },
      { fr: 'une route départementale (D)', en: 'a B-road / departmental road', note: 'Most rural roads in France. Speed limit: 80km/h since 2018 (controversial). Numbered with D.' },
      { fr: 'un rond-point', en: 'a roundabout', note: 'France has more roundabouts (50,000+) than any other country — a deliberate road safety policy.' },
      { fr: 'un feu (rouge / vert / orange)', en: 'a traffic light (red / green / amber)', note: '"Feu tricolore" = traffic light. "Griller un feu rouge" = to run a red light.' },
      { fr: 'un passage piéton / un passage clouté', en: 'a pedestrian crossing', note: '"Passage clouté" = old term (riveted/striped crossing). "Piéton" = pedestrian.' },
      { fr: 'la limitation de vitesse', en: 'speed limit', note: 'France: 130km/h motorway, 110km/h dual carriageway (in rain), 80km/h rural, 50km/h urban, 30km/h city zones.' },
      { fr: 'un stationnement / se garer', en: 'parking / to park', note: '"Zone bleue" = short-stay paid parking. "PV" = parking ticket (procès-verbal).' },
      { fr: 'faire le plein', en: 'to fill up with fuel', note: '"Faire le plein" = to fill up. "Je fais le plein sans plomb" = I\'m filling up with unleaded.' },
      { fr: 'le gazole / le gasoil', en: 'diesel', note: 'Also "le diesel". France has been reducing diesel subsidies as part of green transition.' },
      { fr: 'l\'essence (sans plomb)', en: 'petrol (unleaded)', note: '"SP95" and "SP98" are the two unleaded grades. "E10" = 10% ethanol blend.' },
      { fr: 'une voiture électrique / hybride', en: 'an electric / hybrid car', note: 'France offers significant subsidies ("le bonus écologique") for electric vehicles. Renault Zoe, Peugeot e-208 are popular.' },
      { fr: 'la ceinture de sécurité', en: 'the seatbelt', note: 'Mandatory in all seats (front and back). Fine: €135. France was a pioneer in compulsory seatbelt laws (1970 front seats, 1983 back).' },
      { fr: 'le contrôle technique', en: 'the MOT / vehicle roadworthiness test', note: 'Required every 2 years for vehicles over 4 years old. Recently extended to motorcycles.' },
    ],
  },
  {
    category: 'Public Transport — Les transports en commun',
    emoji: '🚆',
    items: [
      { fr: 'les transports en commun', en: 'public transport', note: 'France has one of Europe\'s most comprehensive public transport networks, particularly for rail.' },
      { fr: 'le métro', en: 'the underground / metro', note: 'Paris Métro has 16 lines and 308 stations. Notable: Line 14 (automatic). Opened 1900.' },
      { fr: 'le RER', en: 'the suburban express rail (Paris)', note: 'Réseau Express Régional — connects Paris centre to suburbs and airports. Faster than metro but fewer stops.' },
      { fr: 'le tram / le tramway', en: 'the tram / streetcar', note: 'Disappeared from most French cities in 1950s; massively revived since 1980s. Bordeaux, Lyon, Strasbourg have excellent networks.' },
      { fr: 'le bus', en: 'the bus', note: '"L\'autobus" = city bus. "L\'autocar" or "le car" = coach (long-distance). Important distinction!' },
      { fr: 'un arrêt de bus / de tram', en: 'a bus / tram stop', note: '"La prochaine station" = the next station (metro). "Le prochain arrêt" = the next stop (bus/tram).' },
      { fr: 'la correspondance', en: 'a connection / transfer', note: '"Faire une correspondance" = to change lines/trains. Very common in compound journeys.' },
      { fr: 'valider son titre de transport', en: 'to validate your ticket', note: 'Mandatory before boarding in France — always validate. Failing to do so: fine of €35–75.' },
      { fr: 'le contrôleur / l\'agent de contrôle', en: 'the ticket inspector', note: 'They can check at any time. Travelling without a valid ticket = "voyager sans titre de transport" = fine.' },
      { fr: 'une amende', en: 'a fine / penalty', note: '"Avoir une amende" = to get a fine. "Payer une amende" = to pay a fine.' },
      { fr: 'la SNCF', en: 'France\'s national rail company', note: 'Société Nationale des Chemins de fer Français. Operates TGV, Intercités, TER regional trains.' },
      { fr: 'le TGV', en: 'high-speed train (Train à Grande Vitesse)', note: 'World\'s 3rd fastest train. Paris–Lyon in 2h, Paris–Marseille in 3h. Runs on dedicated high-speed tracks.' },
      { fr: 'l\'Eurostar', en: 'Eurostar (Channel Tunnel train)', note: 'London–Paris in 2h15. Now also has direct services to Amsterdam and Lyon.' },
      { fr: 'le Navigo', en: 'Paris transport card (monthly pass)', note: 'Monthly card valid on all Paris public transport (metro, RER, bus, tram) within chosen zones.' },
      { fr: 'un billet simple / aller-retour', en: 'a single / return ticket', note: '"Aller simple" = one-way. "Aller-retour" = return. "Plein tarif" = full price. "Tarif réduit" = reduced.' },
      { fr: 'le quai', en: 'the platform (train)', note: '"Voie 3, quai B" = Track 3, Platform B. Important when navigating large French stations.' },
    ],
  },
  {
    category: 'Cycling — Le vélo',
    emoji: '🚴',
    items: [
      { fr: 'un vélo', en: 'a bicycle / bike', note: '"Faire du vélo" = to cycle. "Une promenade à vélo" = a bike ride. "Vélo" is short for "vélocipède".' },
      { fr: 'un vélo électrique / un VAE', en: 'an e-bike', note: 'VAE = vélo à assistance électrique. France subsidises e-bike purchases with "le bonus vélo".' },
      { fr: 'le Vélib\'', en: 'Paris bike-share scheme', note: 'Available at 1,400+ stations across Paris and inner suburbs. Mechanical and electric bikes.' },
      { fr: 'une piste cyclable', en: 'a cycle lane', note: 'France has massively expanded cycle infrastructure since 2020 ("le plan vélo"). Many new "coronapistes" post-COVID.' },
      { fr: 'un casque', en: 'a helmet', note: 'Mandatory for children under 12. Not legally required for adults — though strongly recommended.' },
      { fr: 'une crevaison / crever', en: 'a puncture / to get a puncture', note: '"J\'ai crevé" = I\'ve got a puncture. "Une chambre à air" = an inner tube. "Une rustine" = a puncture repair patch.' },
      { fr: 'garer son vélo', en: 'to park your bike', note: '"Un arceau vélo" = a bike rack. "Un antivol" = a bike lock.' },
      { fr: 'la trottinette électrique', en: 'an electric scooter', note: 'Hugely popular in French cities 2019–2022. Dockless scooters (Bird, Lime) banned in Paris 2023 after safety vote.' },
      { fr: 'un scooter', en: 'a moped / motor scooter', note: 'Very common in Paris and southern France. Requires a licence (AM for 50cc, A for larger). Helmet mandatory.' },
    ],
  },
  {
    category: 'Air & Sea — L\'avion et la mer',
    emoji: '✈️',
    items: [
      { fr: 'un vol', en: 'a flight', note: '"Mon vol décolle à 14h" = My flight takes off at 2pm. "Un vol intérieur" = domestic flight.' },
      { fr: 'l\'aéroport', en: 'the airport', note: 'Paris has two main airports: CDG (Roissy) for international; Orly for European/domestic.' },
      { fr: 'l\'enregistrement', en: 'check-in', note: '"Se présenter à l\'enregistrement" = to check in. "L\'enregistrement en ligne" = online check-in.' },
      { fr: 'la carte d\'embarquement', en: 'the boarding pass', note: '"Présenter votre carte d\'embarquement" = to show your boarding pass.' },
      { fr: 'le ferry / le bac', en: 'the ferry', note: 'Brittany Ferries connects western France to Ireland and England. "Le bac" = small ferry / shuttle.' },
      { fr: 'le port', en: 'the port / harbour', note: 'France has major ports: Marseille (largest in Mediterranean), Le Havre, Calais.' },
    ],
  },
]

const TRANSPORT_PHRASES = [
  { fr: 'Prenez la deuxième rue à droite.', en: 'Take the second street on the right.' },
  { fr: 'Continuez tout droit pendant cinq cents mètres.', en: 'Go straight ahead for five hundred metres.' },
  { fr: 'Faites demi-tour au prochain carrefour.', en: 'Turn around at the next junction.' },
  { fr: 'Il y a des embouteillages sur le périphérique.', en: 'There are traffic jams on the ring road.', note: '"Les bouchons" = traffic jams (lit. corks). "Les embouteillages" = traffic jams (lit. bottlenecks). Both very common.' },
  { fr: 'Le parking est complet.', en: 'The car park is full.', note: '"Complet" = full/no spaces. Never say "le parking est plein" — "complet" is correct.' },
  { fr: 'J\'ai manqué mon train / mon bus.', en: 'I\'ve missed my train / my bus.', note: '"Rater" is also very common: "J\'ai raté mon train." Same meaning.' },
  { fr: 'Le prochain départ est dans vingt minutes.', en: 'The next departure is in twenty minutes.' },
  { fr: 'Compostez / validez votre billet avant de monter.', en: 'Validate your ticket before boarding.', note: '"Composter" = old term for stamping tickets in a machine. Still used for regional trains.' },
  { fr: 'Ma voiture est en panne.', en: 'My car has broken down.', note: '"Une panne" = a breakdown. "Tomber en panne" = to break down.' },
  { fr: 'Appelez le dépanneur / le service de dépannage !', en: 'Call the breakdown service!', note: '"Le dépannage" = breakdown service. "Appel assistance" = roadside assistance call.' },
  { fr: 'À quel quai part le train pour Lyon ?', en: 'Which platform does the Lyon train depart from?' },
  { fr: 'Je voudrais un aller-retour pour Bordeaux, s\'il vous plaît.', en: 'I\'d like a return ticket to Bordeaux, please.' },
  { fr: 'Est-ce que ce bus s\'arrête à la gare ?', en: 'Does this bus stop at the station?' },
  { fr: 'Où se trouve la station de métro la plus proche ?', en: 'Where is the nearest metro station?' },
]

const TRANSPORT_CULTURE = [
  { emoji: '🚅', title: 'Le TGV — France\'s Pride', detail: 'The TGV (Train à Grande Vitesse) debuted in 1981 and changed travel in France forever. Paris–Lyon in 2 hours (vs 5 by car). The network covers all major French cities and connects to Spain, Belgium, the UK. The TGV holds the world speed record for conventional rail: 574.8 km/h (set 2007, empty test run).' },
  { emoji: '🚲', title: 'The Cycling Revolution', detail: 'Since 2020, France has invested €2 billion in cycling infrastructure. Paris alone doubled its cycle network. "Le plan vélo" aims to make France a cycling nation. The iconic Tour de France creates a national emotional connection to cycling every July.' },
  { emoji: '🟢', title: 'France\'s Green Transport Goals', detail: 'France aims to ban petrol/diesel car sales by 2040. Domestic flights on routes served by trains under 2.5 hours have been banned (2023). France\'s rail network is increasingly powered by nuclear electricity — making TGV travel among the lowest-carbon in the world.' },
  { emoji: '🏙️', title: 'Le Grand Paris Express', detail: 'The largest urban transport project in Europe — 200km of new metro lines under construction around Paris, due to complete by 2030. Four new automatic metro lines (15, 16, 17, 18) will connect suburbs directly to each other without going through central Paris.' },
]

export default function FrenchTransport() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Transport Vocabulary | SayBonjour!" description="French transport vocabulary — driving, public transport, cycling, air travel, and getting around in France." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Getting Around in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les transports — roads, rail, cycling, air travel, and transport culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Vocabulary' },
            { id: 'phrases', label: 'Phrases' },
            { id: 'culture', label: 'Transport Culture' },
          ].map(t => (
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
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.emoji} {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {TRANSPORT_SECTIONS[activeCategory].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                    </div>
                    {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {TRANSPORT_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
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

        {tab === 'culture' && (
          <div className="space-y-4">
            {TRANSPORT_CULTURE.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
