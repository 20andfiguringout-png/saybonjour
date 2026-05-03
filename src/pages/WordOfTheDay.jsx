import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Heart, Share2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const WORDS = [
  { fr: 'épanouissement', en: 'fulfilment / blossoming', pos: 'noun (m)', level: 'B2', example: 'L\'épanouissement personnel est essentiel au bonheur.', exampleEn: 'Personal fulfilment is essential to happiness.', etymology: 'From épanouir (to bloom), related to panouir, from Old French' },
  { fr: 'flâner', en: 'to stroll / to wander aimlessly', pos: 'verb', level: 'B1', example: 'J\'aime flâner dans les rues de Paris le dimanche.', exampleEn: 'I love wandering the streets of Paris on Sundays.', etymology: 'From Germanic flanieren, related to the concept of the "flâneur" (urban wanderer)' },
  { fr: 'dépaysement', en: 'disorientation / change of scenery', pos: 'noun (m)', level: 'B2', example: 'Le voyage en Asie m\'a procuré un sentiment de dépaysement total.', exampleEn: 'Travelling to Asia gave me a complete sense of disorientation.', etymology: 'From dépayser (to disorient), from pays (country)' },
  { fr: 'nonchalant', en: 'nonchalant / casual / laid-back', pos: 'adjective', level: 'B2', example: 'Il répondit d\'un air nonchalant.', exampleEn: 'He replied in a nonchalant manner.', etymology: 'From Old French nonchaloir — non (not) + chaloir (to care, from Latin calere)' },
  { fr: 'chuchoter', en: 'to whisper', pos: 'verb', level: 'A2', example: 'Elle chuchotait quelque chose à l\'oreille de son ami.', exampleEn: 'She was whispering something in her friend\'s ear.', etymology: 'Imitative/onomatopoeic — echoes the sound of whispering' },
  { fr: 'brume', en: 'mist / haze', pos: 'noun (f)', level: 'B1', example: 'Une brume légère couvrait la vallée ce matin.', exampleEn: 'A light mist covered the valley this morning.', etymology: 'From Old Norse brim (surf, sea) — originally maritime French' },
  { fr: 's\'épanouir', en: 'to flourish / to blossom / to thrive', pos: 'verb (reflexive)', level: 'B2', example: 'Les enfants s\'épanouissent quand ils se sentent en sécurité.', exampleEn: 'Children flourish when they feel safe.', etymology: 'Reflexive form of épanouir, from the root of s\'ouvrir (to open)' },
  { fr: 'insouciant', en: 'carefree / nonchalant', pos: 'adjective', level: 'B1', example: 'Elle vivait une vie insouciante sur la Côte d\'Azur.', exampleEn: 'She lived a carefree life on the Côte d\'Azur.', etymology: 'From in- (not) + souciant (worrying), from souci (worry)' },
  { fr: 'malaise', en: 'unease / discomfort / malaise', pos: 'noun (m)', level: 'B2', example: 'Il ressentait un profond malaise dans cette situation.', exampleEn: 'He felt a deep unease in that situation.', etymology: 'From mal (bad) + aise (ease, comfort) — a uniquely French feeling of vague discomfort' },
  { fr: 'frissons', en: 'shivers / thrills / chills', pos: 'noun (m, plural)', level: 'A2', example: 'Ce film d\'horreur m\'a donné des frissons !', exampleEn: 'This horror film gave me the chills!', etymology: 'From Old French frison, from frissonner (to shiver), related to frire (to fry — the heat/cold sensation)' },
  { fr: 'espiègle', en: 'mischievous / playful', pos: 'adjective', level: 'B2', example: 'Le petit garçon lançait un regard espiègle à sa mère.', exampleEn: 'The little boy gave his mother a mischievous glance.', etymology: 'From German Eulenspiegel (Owlglass) — a trickster folk figure' },
  { fr: 'savoir-faire', en: 'know-how / expertise / social grace', pos: 'noun (m)', level: 'B1', example: 'Elle possède le savoir-faire nécessaire pour ce poste.', exampleEn: 'She has the know-how needed for this position.', etymology: 'Literally "to know how to do" — savoir (to know) + faire (to do)' },
  { fr: 'bouleversé', en: 'overwhelmed / devastated / deeply moved', pos: 'adjective', level: 'B2', example: 'Il était bouleversé par la nouvelle.', exampleEn: 'He was overwhelmed by the news.', etymology: 'Past participle of bouleverser — from boule (ball) + verser (to overturn)' },
  { fr: 'tintamarre', en: 'uproar / racket / hullabaloo', pos: 'noun (m)', level: 'C1', example: 'Quel tintamarre dans la rue ce soir !', exampleEn: 'What a racket in the street tonight!', etymology: 'Possibly from tinter (to ring) + marre (enough) or from an older expressive form' },
  { fr: 'lumineux', en: 'luminous / bright / radiant', pos: 'adjective', level: 'A2', example: 'Son sourire lumineux illuminait la pièce.', exampleEn: 'Her radiant smile lit up the room.', etymology: 'From Latin luminosus, from lumen (light)' },
  { fr: 'engouement', en: 'craze / infatuation / enthusiasm', pos: 'noun (m)', level: 'C1', example: 'L\'engouement pour le padel a explosé en France.', exampleEn: 'The craze for padel has exploded in France.', etymology: 'From s\'engouer (to be passionate about) — possibly from gouer (to stick in throat)' },
  { fr: 'nébuleux', en: 'nebulous / cloudy / vague', pos: 'adjective', level: 'C1', example: 'Ses projets restaient encore nébuleux.', exampleEn: 'His plans remained somewhat nebulous.', etymology: 'From Latin nebulosus, from nebula (mist, cloud)' },
  { fr: 'tendresse', en: 'tenderness / fondness / affection', pos: 'noun (f)', level: 'A2', example: 'Elle regardait son enfant avec tendresse.', exampleEn: 'She looked at her child with tenderness.', etymology: 'From tendre (tender), from Latin tener (soft)' },
  { fr: 'intrépide', en: 'intrepid / fearless / bold', pos: 'adjective', level: 'B2', example: 'L\'explorateur intrépide traversa la jungle.', exampleEn: 'The intrepid explorer crossed the jungle.', etymology: 'From Latin intrepidus — in- (not) + trepidus (alarmed)' },
  { fr: 'débordant', en: 'overflowing / brimming with', pos: 'adjective', level: 'B1', example: 'Il était débordant d\'enthousiasme.', exampleEn: 'He was overflowing with enthusiasm.', etymology: 'Present participle of déborder — de- (over) + border (to edge)' },
  { fr: 'mélancolie', en: 'melancholy / sadness', pos: 'noun (f)', level: 'B2', example: 'Une douce mélancolie s\'emparait de lui en automne.', exampleEn: 'A gentle melancholy overcame him in autumn.', etymology: 'From Greek melankholía — melas (black) + kholē (bile) — ancient humour theory' },
  { fr: 'envoûtant', en: 'bewitching / enchanting / captivating', pos: 'adjective', level: 'B2', example: 'Sa voix envoûtante captivait tout le public.', exampleEn: 'Her enchanting voice captivated the entire audience.', etymology: 'From envoûter (to bewitch) — from voûte (vault, dome — a magic circle)' },
  { fr: 'fougueux', en: 'fiery / spirited / passionate', pos: 'adjective', level: 'B2', example: 'Le discours fougueux du candidat galvanisa la foule.', exampleEn: 'The candidate\'s fiery speech galvanised the crowd.', etymology: 'From fougue (ardour, fire), from Old French fogue, related to Latin fuga (flight, speed)' },
  { fr: 'crépuscule', en: 'twilight / dusk', pos: 'noun (m)', level: 'B1', example: 'Ils se promenaient au crépuscule au bord de la mer.', exampleEn: 'They strolled at twilight by the sea.', etymology: 'From Latin crepusculum (twilight) — the dusky half-light before darkness' },
  { fr: 'bienveillant', en: 'benevolent / kind / well-meaning', pos: 'adjective', level: 'B1', example: 'Son regard bienveillant mettait les gens à l\'aise.', exampleEn: 'His kind gaze put people at ease.', etymology: 'From bien (well) + vouloir (to wish) — bienveillance is a key French value' },
  { fr: 's\'acharner', en: 'to persevere relentlessly / to toil away', pos: 'verb (reflexive)', level: 'B2', example: 'Il s\'acharnait sur ce problème depuis des heures.', exampleEn: 'He had been toiling away at this problem for hours.', etymology: 'From acharner (to set upon furiously) — from chair (flesh) — animal tenacity' },
  { fr: 'effrénée', en: 'frenzied / unbridled / frantic', pos: 'adjective', level: 'C1', example: 'La course effrénée vers le profit a ses limites.', exampleEn: 'The frenzied race for profit has its limits.', etymology: 'From éfréner — é- (ex-) + frein (brake, rein) — unrestrained' },
  { fr: 'sérénité', en: 'serenity / calm / peacefulness', pos: 'noun (f)', level: 'B1', example: 'Le jardin zen lui apportait une grande sérénité.', exampleEn: 'The Zen garden brought her great serenity.', etymology: 'From Latin serenitas, from serenus (clear, cloudless)' },
  { fr: 'palpitant', en: 'thrilling / exciting / gripping', pos: 'adjective', level: 'B1', example: 'Ce roman policier est vraiment palpitant !', exampleEn: 'This crime novel is really gripping!', etymology: 'From palpiter (to throb), from Latin palpitare — the heart quickening' },
  { fr: 'luminosité', en: 'brightness / luminosity / light quality', pos: 'noun (f)', level: 'B1', example: 'La luminosité du Midi attire de nombreux artistes.', exampleEn: 'The quality of light in the south attracts many artists.', etymology: 'From lumineux (luminous), from Latin lumen (light)' },
]

const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700', C1: 'bg-purple-100 text-purple-700' }

export default function WordOfTheDay() {
  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000)
  const todayWord = WORDS[dayOfYear % WORDS.length]

  const [offset, setOffset] = useState(0)
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('saybonjour_wotd_favs') || '[]') } catch { return [] }
  })
  const [claimed, setClaimed] = useState(() => localStorage.getItem('saybonjour_wotd_claimed') === String(dayOfYear))

  const currentWord = WORDS[(dayOfYear + offset + WORDS.length) % WORDS.length]

  const claimXP = () => {
    if (claimed) return
    addXP(10, 'vocabulary')
    localStorage.setItem('saybonjour_wotd_claimed', String(dayOfYear))
    setClaimed(true)
  }

  const toggleFav = (fr) => {
    setFavorites(prev => {
      const next = prev.includes(fr) ? prev.filter(f => f !== fr) : [...prev, fr]
      localStorage.setItem('saybonjour_wotd_favs', JSON.stringify(next))
      return next
    })
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Word of the Day | SayBonjour!" description="Discover a new French word every day with etymology, examples, and pronunciation." />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Word of the Day</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Mot du jour — a beautiful new French word every day</p>
        </div>

        {offset === 0 && (
          <div className="flex items-center justify-center gap-2 text-sm text-burgundy-600 font-medium mb-4">
            <CalendarDays size={16} />
            {today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 mb-6">
          <button onClick={() => setOffset(o => o - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-dark-warm-50 bg-white dark:bg-dark-warm-100 text-gray-500 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-gray-400">{offset === 0 ? 'Today' : offset < 0 ? `${Math.abs(offset)} day${Math.abs(offset) > 1 ? 's' : ''} ago` : `${offset} day${offset > 1 ? 's' : ''} ahead`}</span>
          <button onClick={() => setOffset(o => o + 1)} disabled={offset >= 0}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-dark-warm-50 bg-white dark:bg-dark-warm-100 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-30">
            <ChevronRight size={18} />
          </button>
        </div>

        <motion.div key={currentWord.fr} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-8 mb-6">
          <div className="flex items-start justify-between mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[currentWord.level]}`}>{currentWord.level}</span>
            <div className="flex items-center gap-2">
              <SpeakButton text={currentWord.fr} size="sm" />
              <button onClick={() => toggleFav(currentWord.fr)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${favorites.includes(currentWord.fr) ? 'text-rose-500' : 'text-gray-300 hover:text-rose-400'}`}>
                <Heart size={16} fill={favorites.includes(currentWord.fr) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          <h2 className="text-4xl font-bold font-playfair text-burgundy-600 mt-4 mb-1">{currentWord.fr}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1 italic">{currentWord.pos}</p>
          <p className="text-xl text-gray-800 dark:text-cream-50 font-medium mb-6">{currentWord.en}</p>

          <div className="space-y-4">
            <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-5 py-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Example sentence</p>
              <p className="font-medium text-gray-800 dark:text-cream-50 text-sm italic mb-1">{currentWord.example}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{currentWord.exampleEn}</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-4">
              <p className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide font-semibold mb-1">Etymology</p>
              <p className="text-sm text-amber-800 dark:text-amber-300">{currentWord.etymology}</p>
            </div>
          </div>
        </motion.div>

        {offset === 0 && (
          <motion.button onClick={claimXP} disabled={claimed} whileHover={{ scale: claimed ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors ${claimed ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'bg-burgundy-600 hover:bg-burgundy-700 text-white'}`}>
            {claimed ? '✓ Learned today — +10 XP claimed!' : '🎯 I learned this word! +10 XP'}
          </motion.button>
        )}

        {favorites.length > 0 && (
          <div className="mt-8 bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <h3 className="font-semibold text-gray-800 dark:text-cream-50 mb-3 flex items-center gap-2">
              <Heart size={16} className="text-rose-500" fill="currentColor" /> My favourite words ({favorites.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {favorites.map(fr => {
                const w = WORDS.find(w => w.fr === fr)
                return w ? (
                  <button key={fr} onClick={() => toggleFav(fr)}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-700 text-rose-700 dark:text-rose-300 text-sm font-medium hover:bg-rose-100 transition-colors">
                    {w.fr}
                    <span className="text-rose-400 ml-1 text-xs">×</span>
                  </button>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
