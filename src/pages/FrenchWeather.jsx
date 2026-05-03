import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Sun, Thermometer, Wind } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const WEATHER_VOCAB = [
  {
    category: 'General Weather — Le temps en général',
    items: [
      { fr: 'la météo', en: 'weather forecast', emoji: '📺' },
      { fr: 'le temps', en: 'the weather', emoji: '☁️' },
      { fr: 'il fait beau', en: 'the weather is nice', emoji: '😊' },
      { fr: 'il fait mauvais', en: 'the weather is bad', emoji: '😞' },
      { fr: 'le soleil', en: 'sun / sunshine', emoji: '☀️' },
      { fr: 'il fait soleil / il y a du soleil', en: 'it is sunny', emoji: '🌞' },
      { fr: 'le nuage', en: 'cloud', emoji: '☁️' },
      { fr: 'nuageux / couvert', en: 'cloudy / overcast', emoji: '🌥️' },
      { fr: 'la pluie', en: 'rain', emoji: '🌧️' },
      { fr: 'il pleut', en: 'it is raining', emoji: '🌧️' },
      { fr: 'une averse', en: 'a shower', emoji: '🌦️' },
      { fr: 'la neige', en: 'snow', emoji: '❄️' },
      { fr: 'il neige', en: 'it is snowing', emoji: '🌨️' },
      { fr: 'le brouillard', en: 'fog / mist', emoji: '🌫️' },
      { fr: 'le vent', en: 'wind', emoji: '🌬️' },
      { fr: 'il y a du vent', en: 'it is windy', emoji: '💨' },
      { fr: 'la tempête', en: 'storm', emoji: '⛈️' },
      { fr: 'la grêle', en: 'hail', emoji: '🌨️' },
      { fr: 'le verglas', en: 'black ice', emoji: '🧊' },
      { fr: 'un arc-en-ciel', en: 'a rainbow', emoji: '🌈' },
      { fr: 'un orage', en: 'thunderstorm', emoji: '⚡' },
      { fr: 'le tonnerre', en: 'thunder', emoji: '🔊' },
      { fr: 'un éclair', en: 'a flash of lightning', emoji: '⚡' },
    ],
  },
  {
    category: 'Temperature — La température',
    items: [
      { fr: 'la température', en: 'temperature', emoji: '🌡️' },
      { fr: 'il fait chaud', en: 'it is hot', emoji: '🥵' },
      { fr: 'il fait froid', en: 'it is cold', emoji: '🥶' },
      { fr: 'il fait frais', en: 'it is cool', emoji: '😌' },
      { fr: 'il fait doux', en: 'it is mild', emoji: '🙂' },
      { fr: 'une canicule', en: 'a heatwave', emoji: '🔥' },
      { fr: 'le gel', en: 'frost', emoji: '❄️' },
      { fr: 'geler / il gèle', en: 'to freeze / it is freezing', emoji: '🧊' },
      { fr: 'le degré', en: 'degree (°C)', emoji: '°' },
      { fr: 'au-dessus / en dessous de zéro', en: 'above / below zero', emoji: '🌡️' },
      { fr: 'une chaleur étouffante', en: 'stifling heat', emoji: '😮‍💨' },
      { fr: 'humide', en: 'humid', emoji: '💦' },
    ],
  },
  {
    category: 'Forecasting — Les prévisions',
    items: [
      { fr: 'les prévisions météo', en: 'weather forecast', emoji: '📊' },
      { fr: 'un bulletin météo', en: 'a weather report', emoji: '📰' },
      { fr: 'des risques d\'averse', en: 'risk of showers', emoji: '🌦️' },
      { fr: 'ensoleillé', en: 'sunny', emoji: '☀️' },
      { fr: 'partiellement nuageux', en: 'partly cloudy', emoji: '🌤️' },
      { fr: 'se couvrir', en: 'to cloud over', emoji: '🌥️' },
      { fr: 'se dégager', en: 'to clear up', emoji: '🌞' },
      { fr: 'variable', en: 'changeable / variable', emoji: '🔄' },
      { fr: 'une perturbation', en: 'a weather disturbance', emoji: '⚠️' },
      { fr: 'une vague de froid', en: 'a cold snap', emoji: '🥶' },
    ],
  },
]

const WEATHER_PHRASES = [
  { fr: 'Quel temps fait-il aujourd\'hui ?', en: 'What is the weather like today?' },
  { fr: 'Il fait un temps de chien !', en: 'The weather is awful! (lit. dog\'s weather)' },
  { fr: 'Ça caille ! / Il caille dehors.', en: 'It\'s freezing! (informal)' },
  { fr: 'Il tombe des cordes !', en: 'It\'s raining cats and dogs! (lit. it\'s raining ropes)' },
  { fr: 'On annonce de la pluie pour demain.', en: 'They\'re forecasting rain for tomorrow.' },
  { fr: 'N\'oublie pas ton parapluie — le temps est incertain.', en: 'Don\'t forget your umbrella — the weather is uncertain.' },
  { fr: 'Le ciel se couvre.', en: 'The sky is clouding over.' },
  { fr: 'Il fait gris et maussade.', en: 'It\'s grey and gloomy.' },
  { fr: 'Les températures vont chuter cette nuit.', en: 'Temperatures are going to drop tonight.' },
  { fr: 'Il va faire bon ce week-end.', en: 'The weather will be nice this weekend.' },
]

export default function FrenchWeather() {
  const [tab, setTab] = useState('vocab')
  const [activeCat, setActiveCat] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Weather Vocabulary | SayBonjour!" description="Learn French weather vocabulary — il pleut, il neige, la canicule — with phrases and pronunciation." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Weather</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La météo — talk about the weather like a local</p>
        </div>

        <div className="flex gap-3 mb-6">
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
              {WEATHER_VOCAB.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCat(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCat === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {WEATHER_VOCAB[activeCat].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-center gap-3">
                  <span className="text-xl w-8 text-center shrink-0">{item.emoji}</span>
                  <SpeakButton text={item.fr} size="sm" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 truncate">{item.fr}</p>
                    <p className="text-xs text-gray-400 truncate">{item.en}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {WEATHER_PHRASES.map((phrase, i) => (
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
