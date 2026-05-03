import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Heart, ChevronDown, ChevronUp, Shuffle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const IDIOMS = [
  { fr: 'Avoir le cafard', en: 'To feel down / depressed', literal: 'To have the cockroach', example: 'Elle a le cafard depuis la rupture.', exampleEn: 'She has been down since the break-up.', category: 'Feelings', level: 'B1' },
  { fr: 'Poser un lapin à quelqu\'un', en: 'To stand someone up', literal: 'To put a rabbit on someone', example: 'Il m\'a posé un lapin hier soir !', exampleEn: 'He stood me up last night!', category: 'Social', level: 'B1' },
  { fr: 'Avoir le coup de foudre', en: 'To fall in love at first sight', literal: 'To have the lightning bolt', example: 'J\'ai eu le coup de foudre pour cette ville.', exampleEn: 'I fell in love with this city at first sight.', category: 'Love', level: 'A2' },
  { fr: 'Casser les pieds à quelqu\'un', en: 'To annoy / bother someone', literal: 'To break someone\'s feet', example: 'Arrête de me casser les pieds !', exampleEn: 'Stop annoying me!', category: 'Feelings', level: 'B1' },
  { fr: 'Mettre les pieds dans le plat', en: 'To put your foot in it', literal: 'To put your feet in the dish', example: 'Il a vraiment mis les pieds dans le plat.', exampleEn: 'He really put his foot in it.', category: 'Social', level: 'B2' },
  { fr: 'Avoir du pain sur la planche', en: 'To have a lot on your plate', literal: 'To have bread on the board', example: 'On a du pain sur la planche pour finir à temps.', exampleEn: 'We have a lot on our plate to finish in time.', category: 'Work', level: 'B1' },
  { fr: 'Se noyer dans un verre d\'eau', en: 'To make a mountain out of a molehill', literal: 'To drown in a glass of water', example: 'Ne te noie pas dans un verre d\'eau — c\'est simple !', exampleEn: 'Don\'t make a mountain out of a molehill — it\'s simple!', category: 'Personality', level: 'B2' },
  { fr: 'Avoir d\'autres chats à fouetter', en: 'To have bigger fish to fry', literal: 'To have other cats to whip', example: 'Je n\'ai pas le temps — j\'ai d\'autres chats à fouetter.', exampleEn: 'I don\'t have time — I have bigger fish to fry.', category: 'Work', level: 'B2' },
  { fr: 'Tomber dans les pommes', en: 'To faint', literal: 'To fall into the apples', example: 'Il a failli tomber dans les pommes sous la chaleur.', exampleEn: 'He nearly fainted in the heat.', category: 'Body', level: 'B1' },
  { fr: 'Avoir le beurre et l\'argent du beurre', en: 'To have your cake and eat it too', literal: 'To have the butter and the money for the butter', example: 'Tu ne peux pas avoir le beurre et l\'argent du beurre.', exampleEn: 'You can\'t have your cake and eat it too.', category: 'Life', level: 'B2' },
  { fr: 'Faire la tête', en: 'To sulk / to be in a mood', literal: 'To make the head', example: 'Pourquoi tu fais la tête ?', exampleEn: 'Why are you sulking?', category: 'Feelings', level: 'A2' },
  { fr: 'Donner sa langue au chat', en: 'To give up guessing', literal: 'To give your tongue to the cat', example: 'Je donne ma langue au chat — dis-moi la réponse !', exampleEn: 'I give up — tell me the answer!', category: 'Social', level: 'B1' },
  { fr: 'Revenons à nos moutons', en: 'Let\'s get back to the point', literal: 'Let\'s return to our sheep', example: 'Bon, revenons à nos moutons — le budget.', exampleEn: 'Right, let\'s get back to the point — the budget.', category: 'Communication', level: 'B2' },
  { fr: 'Prendre quelqu\'un en grippe', en: 'To take a dislike to someone', literal: 'To take someone in flu', example: 'Il m\'a pris en grippe dès le premier jour.', exampleEn: 'He took a dislike to me from day one.', category: 'Feelings', level: 'C1' },
  { fr: 'Il ne faut pas pousser mémé dans les orties', en: 'Don\'t push your luck', literal: 'Don\'t push grandma into the nettles', example: 'Tu exagères — il ne faut pas pousser mémé dans les orties !', exampleEn: 'You\'re going too far — don\'t push your luck!', category: 'Social', level: 'C1' },
  { fr: 'Avoir la pêche / la patate', en: 'To be full of energy / in great form', literal: 'To have the peach / the potato', example: 'Ce matin, j\'ai vraiment la pêche !', exampleEn: 'This morning I\'m full of energy!', category: 'Feelings', level: 'B1' },
  { fr: 'Avoir les yeux plus grands que le ventre', en: 'To have eyes bigger than your belly', literal: 'Same — eyes bigger than stomach', example: 'J\'ai eu les yeux plus grands que le ventre au buffet.', exampleEn: 'I had eyes bigger than my belly at the buffet.', category: 'Life', level: 'A2' },
  { fr: 'Coûter les yeux de la tête', en: 'To cost an arm and a leg', literal: 'To cost the eyes from your head', example: 'Ce restaurant coûte les yeux de la tête.', exampleEn: 'This restaurant costs an arm and a leg.', category: 'Money', level: 'B1' },
  { fr: 'Avoir la langue bien pendue', en: 'To have the gift of the gab', literal: 'To have a well-hung tongue', example: 'Cette fille a vraiment la langue bien pendue !', exampleEn: 'That girl really has the gift of the gab!', category: 'Personality', level: 'B2' },
  { fr: 'Faire d\'une pierre deux coups', en: 'To kill two birds with one stone', literal: 'To make two blows with one stone', example: 'J\'ai fait d\'une pierre deux coups en passant par là.', exampleEn: 'I killed two birds with one stone by going that way.', category: 'Life', level: 'B1' },
  { fr: 'Mettre de l\'eau dans son vin', en: 'To tone it down / make concessions', literal: 'To put water in your wine', example: 'Il a dû mettre de l\'eau dans son vin pour arriver à un accord.', exampleEn: 'He had to make concessions to reach an agreement.', category: 'Social', level: 'B2' },
  { fr: 'Avoir le vent en poupe', en: 'To be on a roll / have the wind in your sails', literal: 'To have the wind at the stern', example: 'Sa carrière a le vent en poupe ces derniers temps.', exampleEn: 'His career has been on a roll lately.', category: 'Success', level: 'C1' },
  { fr: 'Brûler la chandelle par les deux bouts', en: 'To burn the candle at both ends', literal: 'Same — exact equivalent', example: 'Elle brûle la chandelle par les deux bouts — elle va craquer.', exampleEn: 'She\'s burning the candle at both ends — she\'s going to crack.', category: 'Life', level: 'B2' },
  { fr: 'Ce n\'est pas la mer à boire', en: 'It\'s not that difficult / not the end of the world', literal: 'It\'s not the sea to drink', example: 'Allez, fais-le — ce n\'est pas la mer à boire !', exampleEn: 'Come on, do it — it\'s not that difficult!', category: 'Life', level: 'B1' },
  { fr: 'Chercher midi à quatorze heures', en: 'To overcomplicate things / look for problems', literal: 'To look for noon at 2pm', example: 'Tu cherches midi à quatorze heures — c\'est simple.', exampleEn: 'You\'re overcomplicating things — it\'s simple.', category: 'Personality', level: 'C1' },
]

const CATEGORIES = ['All', ...Array.from(new Set(IDIOMS.map(i => i.category)))]
const LEVELS = ['All', 'A2', 'B1', 'B2', 'C1']
const LEVEL_COLORS = { A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700', C1: 'bg-purple-100 text-purple-700' }

export default function FrenchIdiomsPage() {
  const [cat, setCat] = useState('All')
  const [level, setLevel] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('saybonjour_idiom_favs') || '[]') } catch { return [] }
  })
  const [daily] = useState(() => IDIOMS[new Date().getDate() % IDIOMS.length])

  const filtered = IDIOMS.filter(i =>
    (cat === 'All' || i.category === cat) &&
    (level === 'All' || i.level === level)
  )

  const toggleFav = (fr) => {
    setFavorites(prev => {
      const next = prev.includes(fr) ? prev.filter(f => f !== fr) : [...prev, fr]
      localStorage.setItem('saybonjour_idiom_favs', JSON.stringify(next))
      if (!prev.includes(fr)) addXP(3, 'vocabulary')
      return next
    })
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Idioms | SayBonjour!" description="Master 25+ common French idioms with English translations, literal meanings, and example sentences." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Idioms</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Expressions idiomatiques — the colour of the language</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute right-4 top-2 text-8xl opacity-10 font-serif">💡</div>
          <div className="text-xs font-medium text-amber-100 mb-2 uppercase tracking-wide">Idiom of the day</div>
          <p className="text-2xl font-bold font-playfair mb-1">{daily.fr}</p>
          <p className="text-amber-100 text-sm mb-1 italic">Literal: {daily.literal}</p>
          <p className="text-white text-base font-medium mb-3">= {daily.en}</p>
          <p className="text-amber-100 text-sm italic mb-3">"{daily.example}"</p>
          <SpeakButton text={daily.fr} size="sm" />
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${cat === c ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {c}
            </button>
          ))}
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${level === l ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {l}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((idiom, i) => {
            const isOpen = expanded === idiom.fr
            return (
              <motion.div key={idiom.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : idiom.fr)}
                  className="w-full text-left px-5 py-4 flex items-start gap-3">
                  <Lightbulb size={16} className="text-amber-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[idiom.level]}`}>{idiom.level}</span>
                      <span className="text-xs text-gray-400">{idiom.category}</span>
                    </div>
                    <p className="font-semibold font-playfair text-gray-900 dark:text-cream-50">{idiom.fr}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">= {idiom.en}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 mt-1">
                    <SpeakButton text={idiom.fr} size="sm" />
                    <button onClick={e => { e.stopPropagation(); toggleFav(idiom.fr) }}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg ${favorites.includes(idiom.fr) ? 'text-rose-500' : 'text-gray-300 hover:text-rose-400'}`}>
                      <Heart size={14} fill={favorites.includes(idiom.fr) ? 'currentColor' : 'none'} />
                    </button>
                    {isOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-4 border-t border-gray-50 dark:border-dark-warm-200 pt-3 space-y-2">
                        <div><span className="text-xs font-semibold text-gray-400">Literal: </span><span className="text-sm text-gray-500 dark:text-gray-400 italic">{idiom.literal}</span></div>
                        <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2">
                            <SpeakButton text={idiom.example} size="sm" />
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-cream-50 italic">"{idiom.example}"</p>
                              <p className="text-xs text-gray-400">{idiom.exampleEn}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
