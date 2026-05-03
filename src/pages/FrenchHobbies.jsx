import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const HOBBIES = [
  { fr: 'lire', en: 'reading', example: 'J\'aime lire des romans.', icon: '📚' },
  { fr: 'écouter de la musique', en: 'listening to music', example: 'J\'écoute de la musique le matin.', icon: '🎵' },
  { fr: 'regarder des films', en: 'watching films', example: 'Je regarde des films français.', icon: '🎬' },
  { fr: 'faire du sport', en: 'playing sport / exercising', example: 'Je fais du sport trois fois par semaine.', icon: '⚽' },
  { fr: 'cuisiner', en: 'cooking', example: 'J\'adore cuisiner des plats méditerranéens.', icon: '🍳' },
  { fr: 'voyager', en: 'travelling', example: 'Voyager m\'ouvre l\'esprit.', icon: '✈️' },
  { fr: 'jouer de la guitare', en: 'playing guitar', example: 'Je joue de la guitare depuis dix ans.', icon: '🎸' },
  { fr: 'peindre', en: 'painting', example: 'Je peins des aquarelles le dimanche.', icon: '🎨' },
  { fr: 'jardiner', en: 'gardening', example: 'Ma mère adore jardiner.', icon: '🌱' },
  { fr: 'faire de la randonnée', en: 'hiking', example: 'On fait de la randonnée en montagne.', icon: '🥾' },
  { fr: 'jouer aux jeux vidéo', en: 'playing video games', example: 'Il joue aux jeux vidéo le soir.', icon: '🎮' },
  { fr: 'faire de la photographie', en: 'doing photography', example: 'Elle fait de la photographie professionnelle.', icon: '📷' },
  { fr: 'nager', en: 'swimming', example: 'Je nage deux fois par semaine.', icon: '🏊' },
  { fr: 'aller au cinéma', en: 'going to the cinema', example: 'On va au cinéma le vendredi soir.', icon: '🎭' },
  { fr: 'faire du vélo', en: 'cycling', example: 'Je fais du vélo pour aller au travail.', icon: '🚴' },
  { fr: 'tricoter', en: 'knitting', example: 'Elle tricote des pulls pour toute la famille.', icon: '🧶' },
]

const TALKING_HOBBIES = [
  { fr: 'Qu\'est-ce que tu fais pendant ton temps libre ?', en: 'What do you do in your free time?' },
  { fr: 'Tu as des hobbies / des loisirs ?', en: 'Do you have any hobbies?' },
  { fr: 'Je suis passionné(e) de…', en: 'I\'m passionate about…' },
  { fr: 'Je pratique… depuis… ans.', en: 'I\'ve been doing… for… years.' },
  { fr: 'C\'est ma passion.', en: 'It\'s my passion.' },
  { fr: 'Je suis membre d\'un club de…', en: 'I\'m a member of a … club.' },
  { fr: 'Je fais ça pour me détendre.', en: 'I do it to relax.' },
  { fr: 'C\'est très relaxant.', en: 'It\'s very relaxing.' },
  { fr: 'Ça m\'aide à décompresser.', en: 'It helps me unwind.', note: '"Décompresser" is very common in French for unwinding' },
  { fr: 'Je m\'y suis mis(e) il y a deux ans.', en: 'I took it up two years ago.' },
  { fr: 'J\'y passe des heures.', en: 'I spend hours on it.' },
]

const SPORTS_VERBS = [
  { verb: 'jouer à', use: 'team/competitive sports', examples: 'jouer au football, jouer au tennis, jouer aux échecs' },
  { verb: 'faire de / du / de la', use: 'activities and individual sports', examples: 'faire du vélo, faire de la natation, faire du yoga' },
  { verb: 'jouer de', use: 'musical instruments', examples: 'jouer du piano, jouer de la guitare, jouer du violon' },
]

export default function FrenchHobbies() {
  const [tab, setTab] = useState('hobbies')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Hobbies & Leisure | SayBonjour!" description="Talk about hobbies in French — leisure vocabulary, conversation phrases, and jouer à vs faire de." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Hobbies & Leisure in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les loisirs — vocabulary, conversation, and key grammar</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'hobbies', label: 'Hobbies' }, { id: 'talking', label: 'Talking About Hobbies' }, { id: 'grammar', label: 'Jouer à vs Faire de' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'hobbies' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {HOBBIES.map((hobby, i) => (
              <motion.div key={hobby.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addXP(3, 'vocabulary')}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{hobby.icon}</span>
                  <div>
                    <SpeakButton text={hobby.fr} size="sm" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{hobby.fr}</p>
                    <p className="text-xs text-gray-400">{hobby.en}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-2 py-1.5">
                  <SpeakButton text={hobby.example} size="sm" />
                  <p className="text-xs italic text-gray-500 dark:text-gray-400">"{hobby.example}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'talking' && (
          <div className="space-y-3">
            {TALKING_HOBBIES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
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

        {tab === 'grammar' && (
          <div className="space-y-4">
            {SPORTS_VERBS.map((item, i) => (
              <motion.div key={item.verb} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <SpeakButton text={item.verb} size="sm" />
                  <code className="font-bold text-lg text-burgundy-700 dark:text-burgundy-vibrant-300">{item.verb}</code>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Used for: <strong>{item.use}</strong></p>
                <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Examples</p>
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">{item.examples}</p>
                </div>
              </motion.div>
            ))}
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 Summary</p>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Jouer à</strong> = competitive sport or game (football, tennis, chess)<br />
                <strong>Jouer de</strong> = musical instrument (piano, guitar, flute)<br />
                <strong>Faire de</strong> = individual activity or sport (cycling, yoga, swimming, photography)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
