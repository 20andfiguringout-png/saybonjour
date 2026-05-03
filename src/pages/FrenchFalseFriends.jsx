import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const FALSE_FRIENDS = [
  {
    category: 'Everyday Traps',
    items: [
      { french: 'un libraire / une librairie', falseEn: 'library', realEn: 'bookseller / bookshop', realFr: '"une bibliothèque" = library', danger: 'HIGH', example: '"Je vais à la librairie acheter un roman" (bookshop). "Je vais à la bibliothèque pour étudier" (library).' },
      { french: 'sensible', falseEn: 'sensible', realEn: 'sensitive / touchy', realFr: '"raisonnable / sensé" = sensible', danger: 'HIGH', example: '"Elle est très sensible aux critiques" = She is very sensitive to criticism.' },
      { french: 'actuel / actuellement', falseEn: 'actual / actually', realEn: 'current / currently', realFr: '"en réalité / en fait" = actually; "réel" = actual', danger: 'HIGH', example: '"Le président actuel" = the current president (NOT the actual president).' },
      { french: 'rester', falseEn: 'to rest', realEn: 'to stay / remain', realFr: '"se reposer" = to rest', danger: 'HIGH', example: '"Je reste à la maison" = I\'m staying at home (NOT resting at home).' },
      { french: 'passer un examen', falseEn: 'to pass an exam', realEn: 'to take / sit an exam', realFr: '"réussir un examen" = to pass an exam', danger: 'HIGH', example: '"J\'ai passé mon bac" = I sat my bac. "J\'ai réussi mon bac" = I passed my bac.' },
      { french: 'location', falseEn: 'location', realEn: 'rental / hire', realFr: '"emplacement / endroit" = location', danger: 'MEDIUM', example: '"Location de voitures" = car hire (not car location).' },
      { french: 'une monnaie', falseEn: 'money', realEn: '(loose) change / a currency', realFr: '"de l\'argent" = money', danger: 'MEDIUM', example: '"Vous avez de la monnaie ?" = Do you have change?' },
      { french: 'décevoir', falseEn: 'to deceive', realEn: 'to disappoint', realFr: '"tromper / duper" = to deceive', danger: 'HIGH', example: '"Ce film m\'a vraiment déçu" = This film really disappointed me.' },
      { french: 'éventuellement', falseEn: 'eventually', realEn: 'possibly / if need be', realFr: '"finalement / à la fin" = eventually', danger: 'HIGH', example: '"Il pourrait éventuellement accepter" = He might possibly accept (NOT he will eventually accept).' },
      { french: 'sympathique / sympa', falseEn: 'sympathetic', realEn: 'friendly / nice / pleasant', realFr: '"compatissant / compréhensif" = sympathetic', danger: 'HIGH', example: '"Il est très sympa" = He\'s very nice/friendly.' },
    ],
  },
  {
    category: 'Work & Study',
    items: [
      { french: 'une conférence', falseEn: 'a conference (always a big event)', realEn: 'a lecture / talk / conference', realFr: 'Can mean an academic lecture, a talk, or a conference', danger: 'LOW', example: '"J\'ai une conférence à 14h" often means "I have a lecture at 2pm".' },
      { french: 'une formation', falseEn: 'formation (shape)', realEn: 'training / course / professional development', realFr: '"une forme" = a shape; "la formation" = training', danger: 'MEDIUM', example: '"Je suis en formation professionnelle" = I\'m on a training course.' },
      { french: 'un stage', falseEn: 'a stage (theatre)', realEn: 'an internship / work placement / training period', realFr: '"une scène" = a stage (theatre)', danger: 'HIGH', example: '"Je fais un stage chez LVMH" = I\'m doing an internship at LVMH.' },
      { french: 'un agenda', falseEn: 'an agenda (meeting)', realEn: 'a diary / personal organiser / calendar', realFr: '"un ordre du jour" = a meeting agenda', danger: 'MEDIUM', example: '"Mon agenda est plein cette semaine" = My diary is full this week.' },
      { french: 'caution', falseEn: 'caution (care)', realEn: 'deposit / bail / guarantee (financial)', realFr: '"prudence / précaution" = caution', danger: 'HIGH', example: '"Verser une caution" = to pay a deposit.' },
      { french: 'important', falseEn: 'important (big)', realEn: 'important AND significant in quantity/degree', realFr: '"grand / considérable" = large in quantity', danger: 'LOW', example: '"Un retard important" = a significant delay (NOT an important delay).' },
      { french: 'une faculté (une fac)', falseEn: 'a faculty (inherent ability)', realEn: 'a university / faculty of a university', realFr: '"une aptitude" = an ability/faculty', danger: 'MEDIUM', example: '"Je vais à la fac" = I\'m going to university.' },
      { french: 'une licence', falseEn: 'a licence (to drive)', realEn: 'a bachelor\'s degree (3 years at university)', realFr: '"un permis de conduire" = a driving licence', danger: 'MEDIUM', example: '"J\'ai une licence en droit" = I have a law degree.' },
    ],
  },
  {
    category: 'Food & Daily Life',
    items: [
      { french: 'des chips', falseEn: 'chips (British, like fish and chips)', realEn: 'crisps / potato chips (the packet kind)', realFr: '"des frites" = chips (British) / French fries', danger: 'MEDIUM', example: '"Un sachet de chips" = a bag of crisps.' },
      { french: 'large', falseEn: 'large (big)', realEn: 'wide / broad', realFr: '"grand" = large/big', danger: 'HIGH', example: '"Une rue large" = a wide street (NOT a large street).' },
      { french: 'grave', falseEn: 'a grave (burial)', realEn: 'serious / severe / deep (adjective)', realFr: '"une tombe" = a grave (noun)', danger: 'MEDIUM', example: '"C\'est grave !" = It\'s serious! (Also youth slang: "Grave !" = Absolutely!)' },
      { french: 'un car', falseEn: 'a car (automobile)', realEn: 'a coach / long-distance bus', realFr: '"une voiture" = a car', danger: 'HIGH', example: '"Je prends le car pour aller à Lyon" = I\'m taking the coach to Lyon.' },
      { french: 'une cave', falseEn: 'a cave', realEn: 'a cellar / wine cellar', realFr: '"une grotte" = a cave', danger: 'MEDIUM', example: '"Il garde son vin dans la cave" = He keeps his wine in the cellar.' },
      { french: 'propre', falseEn: 'proper / correct', realEn: 'clean OR (before noun) own', realFr: '"convenable / correct" = proper', danger: 'MEDIUM', example: '"Ma propre voiture" = my own car. "Une voiture propre" = a clean car.' },
      { french: 'le pétrole', falseEn: 'petrol (British)', realEn: 'crude oil / petroleum', realFr: '"de l\'essence" = petrol (UK); "de l\'essence / du carburant" = gas (US)', danger: 'MEDIUM', example: '"Le prix du pétrole" = the price of oil (crude oil).' },
      { french: 'une prune', falseEn: 'a prune (dried)', realEn: 'a plum (fresh)', realFr: '"un pruneau" = a prune (dried)', danger: 'LOW', example: '"Une tarte aux prunes" = a plum tart (using fresh plums).' },
    ],
  },
  {
    category: 'Travel & Transport',
    items: [
      { french: 'le péage', falseEn: 'the page (of a book)', realEn: 'the toll / tollgate (motorway)', realFr: '"une page" = a page', danger: 'MEDIUM', example: '"Le péage de l\'autoroute" = the motorway toll.' },
      { french: 'une correspondance', falseEn: 'a correspondence (letters)', realEn: 'a connection / transfer (transport)', realFr: '"une correspondance" = both letters AND transport connection', danger: 'MEDIUM', example: '"J\'ai une correspondance à Lyon" = I have a connection in Lyon.' },
      { french: 'complet', falseEn: 'complete (whole)', realEn: 'full (no vacancies / sold out)', realFr: '"complet" = complete AND fully booked/sold out', danger: 'MEDIUM', example: '"L\'hôtel est complet" = the hotel is fully booked.' },
      { french: 'assister à', falseEn: 'to assist (help)', realEn: 'to attend / be present at', realFr: '"aider / assister quelqu\'un" = to help someone', danger: 'HIGH', example: '"J\'ai assisté à la conférence" = I attended the conference (NOT assisted at it).' },
      { french: 'un passage', falseEn: 'a passage (text)', realEn: 'a crossing / passageway AND a passage (in text)', realFr: 'Both meanings exist — context determines which', danger: 'LOW', example: '"Un passage piéton" = a pedestrian crossing.' },
      { french: 'rentrer', falseEn: 'to enter', realEn: 'to go back home / to return', realFr: '"entrer" = to enter; "rentrer" = to go home/back', danger: 'MEDIUM', example: '"Je rentre à la maison" = I\'m going home. "J\'entre dans la maison" = I\'m entering the house.' },
    ],
  },
  {
    category: 'Body & Health',
    items: [
      { french: 'blesser', falseEn: 'to bless', realEn: 'to injure / to wound', realFr: '"bénir" = to bless', danger: 'HIGH', example: '"Il s\'est blessé au genou" = He injured his knee.' },
      { french: 'une médecine', falseEn: 'a medicine (pill)', realEn: 'medicine (the science/profession)', realFr: '"un médicament" = a medicine (pill/drug)', danger: 'HIGH', example: '"Étudier la médecine" = to study medicine. "Prendre un médicament" = to take medicine.' },
      { french: 'une ordonnance', falseEn: 'an ordinance (law)', realEn: 'a prescription (from a doctor)', realFr: '"une loi / un décret" = an ordinance', danger: 'MEDIUM', example: '"Le médecin m\'a donné une ordonnance" = The doctor gave me a prescription.' },
      { french: 'nerveux', falseEn: 'nervous (anxious)', realEn: 'nervous / tense / irritable / nervous system', realFr: 'Similar meanings but "nerveux" more often = irritable/tense in French', danger: 'LOW', example: '"Il est nerveux ce soir" = He\'s tense/irritable tonight (not necessarily anxious).' },
      { french: 'sensé', falseEn: 'sensitive', realEn: 'sensible / reasonable', realFr: '"sensible" = sensitive; "sensé" = sensible/reasonable', danger: 'HIGH', example: '"C\'est une décision sensée" = It\'s a sensible decision.' },
    ],
  },
]

const DANGER_COLORS = {
  HIGH: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  MEDIUM: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  LOW: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
}

export default function FrenchFalseFriends() {
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French False Friends | SayBonjour!" description="Avoid common French false friends — words that look like English but mean something very different. With examples and danger ratings." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French False Friends</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les faux amis — 40+ words that look like English but mean something very different</p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
          <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="text-sm text-red-800 dark:text-red-300">
            <strong>False friends (faux amis)</strong> are words that look or sound similar in French and English but have different meanings. They cause some of the most embarrassing errors — even at advanced level. HIGH = very dangerous mistake; MEDIUM = common confusion; LOW = subtle trap.
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {FALSE_FRIENDS.map((g, i) => (
            <button key={g.category} onClick={() => { setActiveGroup(i); addXP(4, 'vocabulary') }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {g.category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {FALSE_FRIENDS[activeGroup].items.map((item, i) => (
            <motion.div key={item.french} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
              onClick={() => addXP(3, 'vocabulary')}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <SpeakButton text={item.french.split('/')[0].trim()} size="sm" />
                  <span className="font-bold text-lg font-playfair text-burgundy-700 dark:text-burgundy-vibrant-300">{item.french}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${DANGER_COLORS[item.danger]}`}>{item.danger}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl px-3 py-2">
                  <p className="text-xs text-red-500 font-bold mb-1">✗ NOT this</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{item.falseEn}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl px-3 py-2">
                  <p className="text-xs text-emerald-500 font-bold mb-1">✓ MEANS</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">{item.realEn}</p>
                </div>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 italic mb-1">💡 {item.realFr}</p>
              {item.example && <p className="text-xs text-gray-500 dark:text-gray-400 italic bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-1.5 mt-1">{item.example}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
