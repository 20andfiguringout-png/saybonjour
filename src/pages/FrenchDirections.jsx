import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation, MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const DIRECTIONS_VOCAB = [
  { fr: 'tout droit', en: 'straight ahead', note: '"Continuez tout droit" = keep going straight. The single most useful direction word.' },
  { fr: 'à gauche', en: 'to the left', note: '"Tournez à gauche" = turn left. "Sur votre gauche" = on your left.' },
  { fr: 'à droite', en: 'to the right', note: '"Tournez à droite" = turn right. "Sur votre droite" = on your right.' },
  { fr: 'tourner à gauche / à droite', en: 'turn left / right', note: '"Au prochain carrefour, tournez à droite" = at the next junction, turn right.' },
  { fr: 'continuer tout droit', en: 'continue straight ahead', note: '"Continuez" = keep going. "Continuez pendant 500 mètres" = continue for 500 metres.' },
  { fr: 'traverser', en: 'to cross (a street, square, etc.)', note: '"Traversez la place" = cross the square. "Traverser en courant" = run across.' },
  { fr: 'prendre la première / deuxième rue à gauche', en: 'take the first / second street on the left', note: '"La prochaine rue" = the next street. "La rue" = street.' },
  { fr: 'au bout de la rue', en: 'at the end of the street', note: '"Tout au bout" = right at the end. "Au bout du couloir" = at the end of the corridor.' },
  { fr: 'au coin de la rue', en: 'at the corner of the street', note: '"Le coin" = the corner. "Au coin de la rue principale" = at the corner of the main street.' },
  { fr: 'en face de', en: 'opposite / facing', note: '"C\'est juste en face de la mairie" = it\'s right opposite the town hall.' },
  { fr: 'à côté de', en: 'next to / beside', note: '"À côté de la pharmacie" = next to the pharmacy. Very useful preposition.' },
  { fr: 'près de', en: 'near / close to', note: '"C\'est près de la gare" = it\'s near the station. "Pas très loin" = not very far.' },
  { fr: 'loin de', en: 'far from', note: '"C\'est loin d\'ici ?" = is it far from here? "Assez loin" = quite far.' },
  { fr: 'entre', en: 'between', note: '"Entre la boulangerie et le café" = between the bakery and the café.' },
  { fr: 'derrière', en: 'behind', note: '"C\'est derrière la mairie" = it\'s behind the town hall.' },
  { fr: 'devant', en: 'in front of', note: '"Devant l\'entrée principale" = in front of the main entrance.' },
  { fr: 'sous', en: 'under / below', note: '"Sous le pont" = under the bridge. "Sous-sol" = basement (under the ground).' },
  { fr: 'sur', en: 'on / on top of', note: '"Sur votre droite" = on your right. "Sur la place" = on the square.' },
  { fr: 'après', en: 'after / past', note: '"Après le feu rouge" = after the traffic lights. "Juste après" = just after.' },
  { fr: 'avant', en: 'before', note: '"Avant le carrefour" = before the junction. "Juste avant la gare" = just before the station.' },
]

const LANDMARKS = [
  { fr: 'la gare', en: 'the (train) station', note: 'Every French town has a "gare SNCF". "La gare routière" = bus station.' },
  { fr: 'l\'arrêt de bus (m)', en: 'the bus stop', note: '"Le prochain arrêt" = the next stop. "Descendre à l\'arrêt" = to get off at the stop.' },
  { fr: 'la station de métro', en: 'the metro station', note: 'Paris: 308 stations, 16 lines. "Quelle station ?" = which station?' },
  { fr: 'l\'hôpital (m)', en: 'the hospital', note: 'France has 3,000+ hospitals. "Aller aux urgences" = go to A&E.' },
  { fr: 'la pharmacie', en: 'the pharmacy / chemist', note: 'Green illuminated cross — unmissable. Pharmacists give free health advice.' },
  { fr: 'la mairie', en: 'the town hall', note: 'Important civic building in every French town — births, deaths, marriages registered here.' },
  { fr: 'l\'office de tourisme (m)', en: 'the tourist office', note: 'Free maps, local advice, accommodation booking. A lifesaver in any French town.' },
  { fr: 'le commissariat', en: 'the police station', note: '"La gendarmerie" = police station in rural areas. "La police nationale" in cities.' },
  { fr: 'la poste', en: 'the post office', note: '"La Poste" = France\'s postal service. Also offers banking services.' },
  { fr: 'la banque', en: 'the bank', note: '"Un distributeur / un DAB" = a cash machine (ATM).' },
  { fr: 'le musée', en: 'the museum', note: 'France has 1,200+ museums. Entry is free for under-18s and often on the first Sunday of the month.' },
  { fr: 'la cathédrale', en: 'the cathedral', note: '"Notre-Dame de Paris" rebuilt after the 2019 fire. France has 90 Gothic cathedrals.' },
  { fr: 'l\'église (f)', en: 'the church', note: '"L\'église" = any church. "La cathédrale" = cathedral (bishop\'s seat).' },
  { fr: 'le marché', en: 'the market', note: '"Le marché" = market. "Le marché en plein air" = outdoor market. Usually held on a specific day each week.' },
  { fr: 'le parking', en: 'the car park', note: '"Un parking souterrain" = underground car park. "Gratuit" = free. "Payant" = paid.' },
  { fr: 'les feux (de signalisation)', en: 'the traffic lights', note: '"Le feu rouge / vert / orange" = red/green/amber light.' },
  { fr: 'le carrefour', en: 'the crossroads / junction', note: '"Le carrefour" = any junction or crossing. Carrefour is also France\'s largest supermarket chain.' },
  { fr: 'le rond-point', en: 'the roundabout', note: 'France has 50,000+ roundabouts — more than any other country in the world. A deliberate road safety policy.' },
  { fr: 'le pont', en: 'the bridge', note: '"Le Pont-Neuf" = Paris\'s oldest bridge (1607). "Couper les ponts" = to cut ties (idiom).' },
  { fr: 'la place', en: 'the square / plaza', note: '"La place de la République" / "la Place du Marché" — every French town centres on a place.' },
]

const ASKING_DIRECTIONS = [
  { fr: 'Excusez-moi, pourriez-vous m\'indiquer où se trouve… ?', en: 'Excuse me, could you tell me where … is?', note: 'Polite and correct. "Pourriez-vous" = conditional = polite.' },
  { fr: 'Pardon, c\'est loin d\'ici ?', en: 'Excuse me, is it far from here?', note: '"Pardon" = excuse me (slightly more apologetic than "excusez-moi"). Both are correct.' },
  { fr: 'Je cherche la gare / le musée / l\'hôtel…', en: 'I\'m looking for the station / museum / hotel…', note: '"Je cherche" = I\'m looking for. The simplest and most useful opener.' },
  { fr: 'Je suis perdu(e). Pouvez-vous m\'aider ?', en: 'I\'m lost. Can you help me?', note: '"Perdu" (m) / "perdue" (f). Being direct about being lost usually gets a helpful response.' },
  { fr: 'C\'est à combien de minutes à pied ?', en: 'How many minutes is it on foot?', note: '"À pied" = on foot. "En voiture" = by car. "En métro" = by metro.' },
  { fr: 'Je peux y aller à pied ?', en: 'Can I walk there?', note: '"Y" = there. "Je peux y aller" = can I go there.' },
  { fr: 'C\'est à droite ou à gauche du carrefour ?', en: 'Is it on the right or left of the junction?', note: 'A helpful clarification question when you\'re at a crossroads.' },
  { fr: 'Quel bus / métro dois-je prendre pour aller à… ?', en: 'Which bus / metro should I take to get to…?', note: '"Pour aller à" + place. "Pour aller au Louvre" = to get to the Louvre.' },
  { fr: 'C\'est bien par ici pour aller à… ?', en: 'Is this the right way for… ?', note: 'A great confidence-check phrase when you think you\'re going in the right direction.' },
  { fr: 'Répétez, s\'il vous plaît — je n\'ai pas compris.', en: 'Please repeat — I didn\'t understand.', note: 'Never be embarrassed to ask for repetition. "Plus lentement, s\'il vous plaît" = more slowly, please.' },
]

const GIVING_DIRECTIONS = [
  { fr: 'Prenez la première rue à droite.', en: 'Take the first street on the right.', note: '"Prenez" = take (imperative). "La première" = the first.' },
  { fr: 'C\'est tout droit, puis tournez à gauche au feu.', en: 'It\'s straight on, then turn left at the lights.', note: '"Au feu" = at the traffic lights.' },
  { fr: 'Traversez la place et continuez tout droit.', en: 'Cross the square and continue straight on.' },
  { fr: 'C\'est à cinq minutes à pied — pas loin.', en: 'It\'s five minutes on foot — not far.' },
  { fr: 'Vous ne pouvez pas le rater.', en: 'You can\'t miss it.', note: '"Rater" = to miss/fail to find. "C\'est très visible" = it\'s very visible.' },
  { fr: 'C\'est juste en face de la mairie.', en: 'It\'s just opposite the town hall.' },
  { fr: 'Prenez le métro ligne 4 direction Montrouge.', en: 'Take metro line 4 towards Montrouge.', note: '"Direction" + terminus name = the direction of travel on the metro.' },
  { fr: 'Continuez jusqu\'au rond-point, puis tournez à droite.', en: 'Continue to the roundabout, then turn right.', note: '"Jusqu\'au" = until/as far as the.' },
  { fr: 'C\'est entre la banque et la pharmacie.', en: 'It\'s between the bank and the pharmacy.' },
  { fr: 'Je ne suis pas sûr(e) — je ne suis pas du coin.', en: 'I\'m not sure — I\'m not from around here.', note: '"Je ne suis pas du coin" = I\'m not a local. A polite way of saying you can\'t help.' },
]

const NAVIGATION_CULTURE = [
  { emoji: '🗺️', title: 'Asking strangers in France', detail: 'French people are often perceived as unhelpful — this is usually a misreading of their directness. If someone says "Je ne sais pas" (I don\'t know), they\'re being honest rather than dismissive. Start with "Excusez-moi Monsieur/Madame" — the title shows respect. Parisians in particular respond better to some effort in French than to English immediately.' },
  { emoji: '📱', title: 'Google Maps vs asking locals', detail: 'Maps (GPS / le GPS) is universal in France. "Mets l\'adresse dans le GPS" = put the address in Google Maps. Street numbers can be confusing in rural France — some roads have no numbers for miles. In cities, knowing the nearest landmark ("c\'est près de la mairie") is often more useful than a precise address.' },
  { emoji: '🏘️', title: 'French address system', detail: 'French addresses: number + street type + street name + postcode + town. "4 rue de la Paix, 75001 Paris." The postcode\'s first two digits are the département number: 75 = Paris, 69 = Lyon, 13 = Marseille. In rural areas, addresses are often "lieu-dit" (a named place) rather than a numbered street.' },
]

export default function FrenchDirections() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Directions | SayBonjour!" description="Navigate France confidently — direction vocabulary, landmarks, asking and giving directions, and navigation culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Directions in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les directions — asking for, giving, and understanding directions in France</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Directions Vocab' },
            { id: 'landmarks', label: 'Landmarks' },
            { id: 'asking', label: 'Asking Directions' },
            { id: 'giving', label: 'Giving Directions' },
            { id: 'culture', label: 'Navigation Tips' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {DIRECTIONS_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2 cursor-pointer"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                  <p className="text-xs text-gray-400">{item.en}</p>
                  {item.note && <p className="text-xs text-amber-500 italic mt-0.5">{item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'landmarks' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {LANDMARKS.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                  <p className="text-xs text-gray-400">{item.en}</p>
                  {item.note && <p className="text-xs text-amber-500 italic mt-0.5">{item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'asking' && (
          <div className="space-y-3">
            {ASKING_DIRECTIONS.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'giving' && (
          <div className="space-y-3">
            {GIVING_DIRECTIONS.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {NAVIGATION_CULTURE.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
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
