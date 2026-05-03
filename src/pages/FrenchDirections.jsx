import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation, MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const DIRECTIONS_VOCAB = [
  { fr: 'tout droit', en: 'straight ahead' },
  { fr: 'à gauche', en: 'to the left' },
  { fr: 'à droite', en: 'to the right' },
  { fr: 'tourner à gauche', en: 'turn left' },
  { fr: 'tourner à droite', en: 'turn right' },
  { fr: 'continuer tout droit', en: 'continue straight ahead' },
  { fr: 'traverser', en: 'to cross' },
  { fr: 'prendre la première rue à gauche', en: 'take the first street on the left' },
  { fr: 'au bout de la rue', en: 'at the end of the street' },
  { fr: 'au coin de la rue', en: 'at the corner of the street' },
  { fr: 'en face de', en: 'opposite / facing' },
  { fr: 'à côté de', en: 'next to' },
  { fr: 'près de', en: 'near / close to' },
  { fr: 'loin de', en: 'far from' },
  { fr: 'entre', en: 'between' },
  { fr: 'derrière', en: 'behind' },
  { fr: 'devant', en: 'in front of' },
  { fr: 'sous', en: 'under' },
  { fr: 'sur', en: 'on' },
]

const LANDMARKS = [
  { fr: 'la gare', en: 'the (train) station' },
  { fr: 'l\'arrêt de bus (m)', en: 'the bus stop' },
  { fr: 'la station de métro', en: 'the metro station' },
  { fr: 'l\'hôpital (m)', en: 'the hospital' },
  { fr: 'la pharmacie', en: 'the pharmacy' },
  { fr: 'la mairie', en: 'the town hall', note: 'Important civic building in every French town' },
  { fr: 'l\'office de tourisme (m)', en: 'the tourist office' },
  { fr: 'le commissariat', en: 'the police station' },
  { fr: 'la poste', en: 'the post office' },
  { fr: 'la banque', en: 'the bank' },
  { fr: 'le musée', en: 'the museum' },
  { fr: 'la cathédrale', en: 'the cathedral' },
  { fr: 'le marché', en: 'the market' },
  { fr: 'le parking', en: 'the car park' },
  { fr: 'les feux (de signalisation)', en: 'the traffic lights' },
  { fr: 'le carrefour', en: 'the crossroads / junction' },
  { fr: 'le rond-point', en: 'the roundabout', note: 'France has the most roundabouts in the world!' },
]

const ASKING_DIRECTIONS = [
  { fr: 'Excusez-moi, pourriez-vous m\'indiquer où se trouve…?', en: 'Excuse me, could you tell me where … is?' },
  { fr: 'Pardon, c\'est loin d\'ici ?', en: 'Excuse me, is it far from here?' },
  { fr: 'Je cherche la gare.', en: 'I\'m looking for the station.' },
  { fr: 'Je suis perdu(e).', en: 'I\'m lost.' },
  { fr: 'C\'est à combien de minutes à pied ?', en: 'How many minutes on foot?' },
  { fr: 'Je peux y aller à pied ?', en: 'Can I walk there?' },
  { fr: 'C\'est à droite ou à gauche ?', en: 'Is it on the right or left?' },
  { fr: 'Quel bus/métro dois-je prendre ?', en: 'Which bus/metro should I take?' },
]

const GIVING_DIRECTIONS = [
  { fr: 'Prenez la première rue à droite.', en: 'Take the first street on the right.' },
  { fr: 'C\'est tout droit, puis tournez à gauche.', en: 'It\'s straight on, then turn left.' },
  { fr: 'Traversez la place et continuez tout droit.', en: 'Cross the square and continue straight.' },
  { fr: 'C\'est à cinq minutes à pied.', en: 'It\'s five minutes on foot.' },
  { fr: 'Vous ne pouvez pas le rater.', en: 'You can\'t miss it.' },
  { fr: 'C\'est juste en face du musée.', en: 'It\'s just opposite the museum.' },
  { fr: 'Prenez le métro ligne 4.', en: 'Take metro line 4.' },
]

export default function FrenchDirections() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Directions | SayBonjour!" description="Navigate France with confidence — directions vocabulary, landmarks, asking for and giving directions in French." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Getting Around in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les directions et les lieux — asking for and giving directions</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Directions Vocab' }, { id: 'landmarks', label: 'Landmarks' }, { id: 'asking', label: 'Asking' }, { id: 'giving', label: 'Giving Directions' }].map(t => (
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
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-center gap-2 cursor-pointer"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                  <p className="text-xs text-gray-400">{item.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'landmarks' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {LANDMARKS.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2">
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                  <p className="text-xs text-gray-400">{item.en}</p>
                  {item.note && <p className="text-xs text-amber-500 italic">{item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'asking' && (
          <div className="space-y-3">
            {ASKING_DIRECTIONS.map((p, i) => (
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

        {tab === 'giving' && (
          <div className="space-y-3">
            {GIVING_DIRECTIONS.map((p, i) => (
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
