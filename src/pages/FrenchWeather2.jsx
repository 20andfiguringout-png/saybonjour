import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const WEATHER_VOCAB = [
  { fr: 'Il fait beau.', en: 'The weather is nice / beautiful.', emoji: '☀️', note: '"Il fait" = impersonal construction. Used only for weather and temperature, never for rain/snow.' },
  { fr: 'Il fait mauvais.', en: 'The weather is bad / nasty.', emoji: '🌧️' },
  { fr: 'Il fait chaud.', en: 'It\'s hot / warm.', emoji: '🌡️', note: '"Il fait très chaud" = it\'s very hot. "Une chaleur écrasante" = sweltering heat.' },
  { fr: 'Il fait froid.', en: 'It\'s cold.', emoji: '🥶', note: '"Un froid de canard" = bitterly cold (lit. "duck cold" — a hunting expression).' },
  { fr: 'Il fait doux.', en: 'It\'s mild / pleasant.', emoji: '😌', note: '"Doux" (mild) is the ideal — used for temperatures around 15–18°C. Very French praise for weather.' },
  { fr: 'Il fait frais.', en: 'It\'s cool / fresh.', emoji: '🌬️', note: '"Frais" is between "doux" and "froid" — pleasantly cool, like a spring morning.' },
  { fr: 'Il pleut.', en: 'It\'s raining.', emoji: '🌧️', note: '"Il pleut à verse" = it\'s pouring. "Il bruine" = it\'s drizzling. "Pleuvoir des cordes" = raining cats and dogs.' },
  { fr: 'Il neige.', en: 'It\'s snowing.', emoji: '❄️', note: '"La neige" = snow. "Un flocon de neige" = a snowflake. "La neige fondue" = slush.' },
  { fr: 'Il y a du vent.', en: 'It\'s windy.', emoji: '💨', note: '"Un vent violent" = a strong wind. "La tempête" = a storm. "Le Mistral" = the famous dry wind of Provence.' },
  { fr: 'Il y a du soleil.', en: 'It\'s sunny.', emoji: '🌤️', note: '"Un rayon de soleil" = a ray of sunshine. "Profiter du soleil" = to enjoy the sunshine.' },
  { fr: 'Il y a des nuages.', en: 'It\'s cloudy.', emoji: '☁️', note: '"Un nuage" = a cloud. "Nuageux" (adj) = cloudy. "Partiellement nuageux" = partly cloudy.' },
  { fr: 'Il y a du brouillard.', en: 'It\'s foggy.', emoji: '🌫️', note: '"La brume" = mist (lighter). "Le brouillard" = proper fog. The Paris basin is notorious for autumn fog.' },
  { fr: 'Il y a de l\'orage.', en: 'There\'s a storm / thunderstorm.', emoji: '⛈️', note: '"Le tonnerre" = thunder. "Les éclairs" = lightning. "L\'orage" = thunderstorm.' },
  { fr: 'Il gèle.', en: 'It\'s freezing / there\'s a frost.', emoji: '🧊', note: '"Le gel" = frost. "Le verglas" = black ice — very feared on French roads.' },
  { fr: 'Il grêle.', en: 'It\'s hailing.', emoji: '🌨️', note: '"La grêle" = hail. Can destroy crops — a major concern in French wine regions.' },
  { fr: 'Le temps est couvert.', en: 'It\'s overcast / the sky is overcast.', emoji: '🌥️', note: '"Couvert" = covered/overcast. Describes the typical Parisian grey sky in winter.' },
  { fr: 'Il y a une éclaircie.', en: 'There\'s a sunny spell / the sky clears.', emoji: '⛅', note: '"Une éclaircie" = a break in the clouds. Very welcome after a grey day!' },
  { fr: 'Un orage éclate.', en: 'A storm breaks out.', emoji: '⛈️', note: '"Éclater" = to break out / burst. "L\'orage a éclaté" = the storm broke.' },
  { fr: 'Il y a des averses.', en: 'There are showers.', emoji: '🌦️', note: '"Une averse" = a shower. "Des averses orageuses" = thundery showers.' },
  { fr: 'La canicule', en: 'A heatwave', emoji: '🔥', note: '"La canicule de 2003" killed 15,000 in France. Now occurs every summer. "Alerte canicule" = heat emergency alert.' },
]

const WEATHER_PHRASES = [
  { fr: 'Quel temps fait-il aujourd\'hui ?', en: 'What\'s the weather like today?', note: 'The default weather question. "Il fait" used for the answer.' },
  { fr: 'Quel temps fera-t-il demain ?', en: 'What will the weather be like tomorrow?', note: 'Future tense: "fera" (will make/be).' },
  { fr: 'La météo annonce de la pluie pour ce week-end.', en: 'The forecast says rain for this weekend.', note: '"La météo" = the weather forecast / met service. "Météo France" is the national weather service.' },
  { fr: 'Il va pleuvoir cet après-midi.', en: 'It\'s going to rain this afternoon.', note: '"Aller + infinitive" for near future.' },
  { fr: 'Prends un parapluie, juste au cas.', en: 'Take an umbrella, just in case.', note: 'Very common practical advice — France has very variable weather.' },
  { fr: 'On n\'a pas de chance avec la météo.', en: 'We\'re unlucky with the weather.', note: '"Pas de chance" = bad luck. Said often by French holidaymakers in Brittany.' },
  { fr: 'C\'est un temps de saison.', en: 'The weather is typical for the season.', note: 'The philosophical acceptance of seasonal weather — very French.' },
  { fr: 'Il fait un temps de chien.', en: 'The weather is foul / terrible.', note: '"Un temps de chien" = dog weather. Often used for cold, wet, grey conditions.' },
  { fr: 'On étouffe par cette chaleur !', en: 'It\'s suffocating in this heat!', note: '"Étouffer" = to suffocate / be stifled by heat. Common in heatwave summers.' },
  { fr: 'Le soleil se couche tard en été.', en: 'The sun sets late in summer.', note: 'France is at a northern latitude — sunset can be 10pm in midsummer in the north.' },
  { fr: 'Il fait un froid de canard !', en: 'It\'s bitterly cold!', note: 'A hunting expression — duck hunting happens in cold winter weather.' },
  { fr: 'Comme disent les Bretons : il n\'y a pas de mauvais temps, juste de mauvais vêtements.', en: 'As the Bretons say: there\'s no bad weather, just bad clothing.', note: 'The stoic Breton attitude to their (very wet) climate.' },
  { fr: 'La chaleur est accablante.', en: 'The heat is oppressive / overwhelming.', note: '"Accablant" = oppressive, overwhelming. Used for intense summer heat.' },
  { fr: 'Ça se rafraîchit le soir.', en: 'It cools down in the evening.', note: 'A relief phrase during heatwaves — "se rafraîchir" = to freshen up / cool down.' },
]

const TEMPERATURE = [
  { celsius: '-10°C', desc: 'Il gèle — attention au verglas !', descEn: 'It\'s freezing — watch for ice!', style: 'text-blue-700 dark:text-blue-400' },
  { celsius: '0°C', desc: 'Le point de congélation — il peut neiger.', descEn: 'Freezing point — it may snow.', style: 'text-blue-600 dark:text-blue-400' },
  { celsius: '5°C', desc: 'Il fait très froid — mettez un manteau.', descEn: 'It\'s very cold — put a coat on.', style: 'text-blue-500 dark:text-blue-300' },
  { celsius: '10°C', desc: 'Il fait frais — une veste suffira.', descEn: 'It\'s cool — a jacket will do.', style: 'text-teal-600 dark:text-teal-400' },
  { celsius: '15°C', desc: 'Il fait doux — le temps idéal pour se promener.', descEn: 'It\'s mild — perfect weather for a walk.', style: 'text-green-600 dark:text-green-400' },
  { celsius: '20°C', desc: 'Il fait bon — le temps parfait !', descEn: 'It\'s pleasant — perfect weather!', style: 'text-green-500 dark:text-green-400' },
  { celsius: '25°C', desc: 'Il fait chaud — c\'est l\'été !', descEn: 'It\'s hot — it\'s summer!', style: 'text-yellow-500' },
  { celsius: '30°C', desc: 'Il fait très chaud — restez hydraté(e).', descEn: 'It\'s very hot — stay hydrated.', style: 'text-orange-500' },
  { celsius: '35°C+', desc: 'La canicule — alerte météo !', descEn: 'Heatwave — weather alert!', style: 'text-red-600' },
]

const SEASONS_WEATHER = [
  {
    season: 'Le printemps', en: 'Spring', months: 'Mars, avril, mai', emoji: '🌸',
    typical: 'Mild, showery, increasingly warm. April and May are beautiful for travel. "En avril, ne te découvre pas d\'un fil" (in April, don\'t take off a thread of clothing — it can still turn cold). The term "les giboulées de mars" describes the sudden March showers typical of the season. Paris in April and May is genuinely beautiful.',
  },
  {
    season: 'L\'été', en: 'Summer', months: 'Juin, juillet, août', emoji: '☀️',
    typical: 'Hot and sunny, especially in the south. Northern France can be cooler. August heat waves (canicules) are increasingly severe — France\'s 2003 canicule was a national disaster. Avoid driving on August 1st: "le grand chassé-croisé" when half of France leaves for holidays and the other half returns. The Mediterranean coast is glorious.',
  },
  {
    season: 'L\'automne', en: 'Autumn', months: 'Septembre, octobre, novembre', emoji: '🍂',
    typical: 'Cool, rainy, but often gloriously crisp and beautiful — especially in forests and vineyards during harvest time. "La rentrée" (September return to school/work) culturally defines the season. La Toussaint (All Saints\' Day, Nov 1) is a public holiday — families visit cemeteries. Autumn in Burgundy and Alsace is stunning.',
  },
  {
    season: 'L\'hiver', en: 'Winter', months: 'Décembre, janvier, février', emoji: '❄️',
    typical: 'Cold and grey in northern France, particularly Paris (average 5°C in January). Snowy in the Alps, Pyrenees, Vosges, and Massif Central — the ski season. Southern France (Côte d\'Azur, Provence) can be mild even in winter. "La grisaille" = the greyness — Parisians complain about it constantly. Christmas markets in Alsace are famous throughout Europe.',
  },
]

const WEATHER_CULTURE = [
  { emoji: '🌬️', title: 'Le Mistral', detail: 'The Mistral is a powerful cold, dry northwesterly wind that blows down the Rhône Valley into Provence and the Mediterranean. It can last days or weeks and can reach 90km/h. Van Gogh painted in Arles with his easel tied down. It dries the landscape (reducing disease in vineyards) but can be psychologically oppressive. Locals say it drives people mad.' },
  { emoji: '☀️', title: 'Sun and the French regions', detail: 'French climates vary dramatically. Brittany (west) is Atlantic — mild but wet all year. Paris (north) is temperate — grey winters. Alsace (east) is continental — hot summers, cold winters. Provence and the Riviera (south) are Mediterranean — hot dry summers, mild winters. The Pyrenees and Alps have mountain climates. You can ski AND sunbathe on the same day in France.' },
  { emoji: '🌡️', title: 'Climate change and France', detail: 'France is experiencing increasingly severe heat waves, more frequent droughts (especially in the southwest), and changing wine harvest timing. The Loire Valley and Burgundy wine appellations are shifting northwards. France signed the Paris Agreement in 2015 and has committed to carbon neutrality by 2050. The 2003 and 2019 canicules were wake-up calls.' },
]

export default function FrenchWeather2() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Weather Vocabulary | SayBonjour!" description="Complete French weather vocabulary — conditions, phrases, temperature scale, seasons, and French weather culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Weather in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La météo — weather conditions, phrases, temperature, seasons, and French climate</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Weather Conditions' },
            { id: 'phrases', label: 'Weather Phrases' },
            { id: 'temp', label: 'Temperature' },
            { id: 'seasons', label: 'Seasons' },
            { id: 'culture', label: 'Climate Culture' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {WEATHER_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2 cursor-pointer"
                onClick={() => addXP(2, 'vocabulary')}>
                <span className="text-xl shrink-0">{item.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <SpeakButton text={item.fr} size="sm" />
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                  </div>
                  <p className="text-xs text-gray-400">{item.en}</p>
                  {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {WEATHER_PHRASES.map((p, i) => (
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

        {tab === 'temp' && (
          <div className="space-y-3">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-300 mb-2">
              💡 France uses Celsius. To convert: °F = (°C × 9/5) + 32. So 20°C = 68°F (a pleasant day). 37°C = body temperature. -40°C = -40°F (they coincide at this point!).
            </div>
            {TEMPERATURE.map((t, i) => (
              <motion.div key={t.celsius} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-center gap-4"
                onClick={() => addXP(2, 'vocabulary')}>
                <span className={`font-mono font-bold text-base w-16 shrink-0 ${t.style}`}>{t.celsius}</span>
                <div className="flex items-start gap-2">
                  <SpeakButton text={t.desc} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 italic">{t.desc}</p>
                    <p className="text-xs text-gray-400">{t.descEn}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'seasons' && (
          <div className="space-y-4">
            {SEASONS_WEATHER.map((s, i) => (
              <motion.div key={s.season} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{s.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <SpeakButton text={s.season} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{s.season} <span className="text-gray-400 font-normal text-sm">({s.en})</span></h3>
                  </div>
                  <p className="text-xs text-burgundy-500 font-medium mb-2">{s.months}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.typical}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {WEATHER_CULTURE.map((item, i) => (
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
