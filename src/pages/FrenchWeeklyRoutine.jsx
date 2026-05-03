import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ROUTINE_VOCAB = [
  { fr: 'se réveiller', en: 'to wake up', refl: true },
  { fr: 'se lever', en: 'to get up', refl: true },
  { fr: 'se doucher / prendre une douche', en: 'to shower / to take a shower' },
  { fr: 'se laver les dents', en: 'to brush one\'s teeth', refl: true },
  { fr: 's\'habiller', en: 'to get dressed', refl: true },
  { fr: 'prendre le petit-déjeuner', en: 'to have breakfast' },
  { fr: 'partir au travail / à l\'école', en: 'to leave for work / school' },
  { fr: 'prendre le métro / le bus', en: 'to take the metro / bus' },
  { fr: 'travailler', en: 'to work' },
  { fr: 'déjeuner', en: 'to have lunch' },
  { fr: 'rentrer (à la maison)', en: 'to come home' },
  { fr: 'faire la cuisine', en: 'to cook' },
  { fr: 'dîner', en: 'to have dinner' },
  { fr: 'se détendre / se reposer', en: 'to relax / to rest', refl: true },
  { fr: 'regarder la télévision', en: 'to watch television' },
  { fr: 'se coucher', en: 'to go to bed', refl: true },
  { fr: 's\'endormir', en: 'to fall asleep', refl: true },
]

const TIME_EXPRESSIONS = [
  { fr: 'le matin', en: 'in the morning' },
  { fr: 'l\'après-midi', en: 'in the afternoon' },
  { fr: 'le soir', en: 'in the evening' },
  { fr: 'la nuit', en: 'at night' },
  { fr: 'le week-end', en: 'at the weekend' },
  { fr: 'en semaine', en: 'during the week / on weekdays' },
  { fr: 'tous les jours', en: 'every day' },
  { fr: 'toujours', en: 'always' },
  { fr: 'souvent', en: 'often' },
  { fr: 'parfois / quelquefois', en: 'sometimes' },
  { fr: 'rarement', en: 'rarely' },
  { fr: 'jamais', en: 'never' },
  { fr: 'd\'habitude', en: 'usually' },
  { fr: 'normalement', en: 'normally / usually' },
  { fr: 'en général', en: 'generally / usually' },
]

const SAMPLE_ROUTINE = [
  { time: '7h00', fr: 'Je me réveille et je me lève.', en: 'I wake up and get up.' },
  { time: '7h15', fr: 'Je me douche et je m\'habille.', en: 'I shower and get dressed.' },
  { time: '7h45', fr: 'Je prends le petit-déjeuner.', en: 'I have breakfast.' },
  { time: '8h30', fr: 'Je pars au travail en métro.', en: 'I leave for work by metro.' },
  { time: '9h00', fr: 'Je commence à travailler.', en: 'I start working.' },
  { time: '12h30', fr: 'Je déjeune avec des collègues.', en: 'I have lunch with colleagues.' },
  { time: '18h30', fr: 'Je rentre à la maison.', en: 'I come home.' },
  { time: '19h30', fr: 'Je fais la cuisine et je dîne.', en: 'I cook and have dinner.' },
  { time: '21h00', fr: 'Je me détends en regardant la télé.', en: 'I relax by watching TV.' },
  { time: '23h00', fr: 'Je me couche et je m\'endors.', en: 'I go to bed and fall asleep.' },
]

const REFLEXIVE_NOTE = 'Many daily routine verbs are reflexive in French — the action is done to yourself. They always need a reflexive pronoun: me (je), te (tu), se (il/elle), nous, vous, se (ils/elles).'

export default function FrenchWeeklyRoutine() {
  const [tab, setTab] = useState('routine')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Daily Routine Vocabulary | SayBonjour!" description="Describe your daily routine in French — reflexive verbs, time expressions, and a sample day." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Daily Routine in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La routine quotidienne — reflexive verbs, time expressions, and a sample day</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'routine', label: 'Routine Verbs' }, { id: 'time', label: 'Time Expressions' }, { id: 'sample', label: 'Sample Day' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'routine' && (
          <>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800 dark:text-amber-300">
              💡 {REFLEXIVE_NOTE}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {ROUTINE_VOCAB.map((v, i) => (
                <motion.div key={v.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-center gap-2 cursor-pointer"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={v.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</p>
                    <p className="text-xs text-gray-400">{v.en}</p>
                  </div>
                  {v.refl && <span className="ml-auto shrink-0 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">réfl.</span>}
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'time' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {TIME_EXPRESSIONS.map((t, i) => (
              <motion.div key={t.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-center gap-2">
                <SpeakButton text={t.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{t.fr}</p>
                  <p className="text-xs text-gray-400">{t.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'sample' && (
          <div className="space-y-3">
            {SAMPLE_ROUTINE.map((item, i) => (
              <motion.div key={item.time} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-center gap-4">
                <div className="w-14 text-center shrink-0">
                  <span className="font-mono font-bold text-sm text-burgundy-600 dark:text-burgundy-vibrant-300">{item.time}</span>
                </div>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-gray-800 dark:text-cream-50 italic">"{item.fr}"</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
