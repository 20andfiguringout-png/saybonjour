import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Heart, ChevronDown, ChevronUp, Shuffle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const IDIOMS = [
  { fr: 'Avoir le cafard', en: 'To feel down / depressed / blue', literal: 'To have the cockroach', example: 'Elle a le cafard depuis la rupture.', exampleEn: 'She\'s been feeling down since the break-up.', category: 'Feelings', level: 'B1', note: '"Le cafard" = the cockroach. Why? 19th century sailors said they saw cockroaches in dark moods.' },
  { fr: 'Poser un lapin à quelqu\'un', en: 'To stand someone up (not show up)', literal: 'To put a rabbit on someone', example: 'Il m\'a encore posé un lapin — je suis furieuse !', exampleEn: 'He stood me up again — I\'m furious!', category: 'Social', level: 'B1', note: 'Dates from 19th century — originally meant not paying for services (leaving someone holding the rabbit = the empty bag).' },
  { fr: 'Avoir le coup de foudre', en: 'To fall in love at first sight', literal: 'To have the lightning bolt', example: 'J\'ai eu le coup de foudre pour cette ville dès le premier jour.', exampleEn: 'I fell in love with this city at first sight on the very first day.', category: 'Love', level: 'A2', note: '"Foudre" = lightning. The sudden electricity of falling in love = lightning bolt. Very commonly used.' },
  { fr: 'Casser les pieds à quelqu\'un', en: 'To annoy / bother someone (persistently)', literal: 'To break someone\'s feet', example: 'Tu me casses les pieds avec tes questions !', exampleEn: 'You\'re driving me crazy with your questions!', category: 'Feelings', level: 'B1', note: 'A relatively mild but genuine expression of exasperation. "Casse-pieds" (adj) = annoying person / "pain".' },
  { fr: 'Mettre les pieds dans le plat', en: 'To put your foot in it / say something awkward', literal: 'To put your feet in the dish', example: 'Il a vraiment mis les pieds dans le plat en mentionnant l\'ex-femme.', exampleEn: 'He really put his foot in it by mentioning the ex-wife.', category: 'Social', level: 'B2', note: 'To blunder socially — to step into a situation that causes embarrassment.' },
  { fr: 'Avoir du pain sur la planche', en: 'To have a lot on one\'s plate / lots of work ahead', literal: 'To have bread on the board', example: 'On a du pain sur la planche pour finir ce projet à temps.', exampleEn: 'We have a lot on our plate to finish this project in time.', category: 'Work', level: 'B1', note: 'Refers to the baker\'s board of unfinished bread — lots of work still to do.' },
  { fr: 'Se noyer dans un verre d\'eau', en: 'To make a mountain out of a molehill', literal: 'To drown in a glass of water', example: 'Ne te noie pas dans un verre d\'eau — ce problème est simple !', exampleEn: 'Don\'t overthink it — this problem is simple!', category: 'Personality', level: 'B2', note: 'To catastrophise over something trivial — drowning in the smallest amount of water.' },
  { fr: 'Avoir d\'autres chats à fouetter', en: 'To have bigger fish to fry', literal: 'To have other cats to whip', example: 'Je ne peux pas m\'occuper de ça — j\'ai d\'autres chats à fouetter.', exampleEn: 'I can\'t deal with this — I have bigger fish to fry.', category: 'Work', level: 'B2', note: 'More important things to deal with. The "whipping cats" comes from an old circus punishment metaphor.' },
  { fr: 'Tomber dans les pommes', en: 'To faint', literal: 'To fall into the apples', example: 'Il a failli tomber dans les pommes sous la chaleur écrasante.', exampleEn: 'He nearly fainted in the sweltering heat.', category: 'Body', level: 'B1', note: 'Origin unclear — possibly from 19th century rhyming slang, or from "pâmoison" (fainting) → "pommes".' },
  { fr: 'Avoir le beurre et l\'argent du beurre', en: 'To have your cake and eat it too', literal: 'To have the butter and the money for the butter', example: 'Tu veux travailler moins et gagner plus ? On ne peut pas avoir le beurre et l\'argent du beurre !', exampleEn: 'You want to work less and earn more? You can\'t have it all!', category: 'Life', level: 'B2', note: 'The French love food-based idioms. Sometimes extended: "...et le sourire de la crémière" (and the dairywoman\'s smile).' },
  { fr: 'Faire la tête', en: 'To sulk / to be in a mood', literal: 'To make the head', example: 'Pourquoi tu fais la tête ? Tu es en colère contre moi ?', exampleEn: 'Why are you sulking? Are you angry with me?', category: 'Feelings', level: 'A2', note: 'Very common. "Faire la gueule" is the ruder version (same meaning). "Être de mauvais poil" = to be in a bad mood.' },
  { fr: 'Donner sa langue au chat', en: 'To give up guessing', literal: 'To give your tongue to the cat', example: 'Je donne ma langue au chat — dis-moi la réponse !', exampleEn: 'I give up — tell me the answer!', category: 'Social', level: 'B1', note: 'Used in quiz contexts. The cat gets your tongue = you have nothing left to say. Very French game-playing phrase.' },
  { fr: 'Revenons à nos moutons', en: 'Let\'s get back to the point', literal: 'Let\'s return to our sheep', example: 'Bon, revenons à nos moutons — le budget du projet.', exampleEn: 'Right, let\'s get back to the point — the project budget.', category: 'Communication', level: 'B2', note: 'From the 15th century farce "La Farce de Maître Pathelin" — a judge repeatedly says this to bring proceedings back on track. Still used 600 years later.' },
  { fr: 'Il ne faut pas pousser mémé dans les orties', en: 'Don\'t push your luck / Don\'t go too far', literal: 'Don\'t push grandma into the nettles', example: 'Tu exagères quand même — il ne faut pas pousser mémé dans les orties !', exampleEn: 'You\'re going too far — don\'t push your luck!', category: 'Social', level: 'C1', note: 'A very French expression of "that\'s enough" / "you\'re crossing a line". The image of pushing an elderly woman into nettles is wonderfully absurd.' },
  { fr: 'Avoir la pêche / la patate / la frite', en: 'To be full of energy / to be in great form', literal: 'To have the peach / the potato / the chip', example: 'Ce matin, j\'ai vraiment la pêche — on va tout réussir !', exampleEn: 'This morning I\'m full of energy — we\'re going to nail it!', category: 'Feelings', level: 'B1', note: 'Three different words, same meaning — shows how French invents food-based slang for energy/mood.' },
  { fr: 'Avoir les yeux plus grands que le ventre', en: 'To have eyes bigger than your belly', literal: 'Same — exact equivalent of the English expression', example: 'J\'ai eu les yeux plus grands que le ventre au buffet — j\'ai trop mangé.', exampleEn: 'I had eyes bigger than my belly at the buffet — I ate too much.', category: 'Life', level: 'A2', note: 'Identical to the English idiom — one of the few that translates directly.' },
  { fr: 'Coûter les yeux de la tête', en: 'To cost an arm and a leg / to cost a fortune', literal: 'To cost the eyes from your head', example: 'Ce restaurant gastronomique coûte les yeux de la tête, mais ça vaut le coup.', exampleEn: 'This restaurant costs a fortune, but it\'s worth it.', category: 'Money', level: 'B1', note: 'Extremely common expression for anything eye-wateringly expensive.' },
  { fr: 'Avoir la langue bien pendue', en: 'To have the gift of the gab / to talk a lot', literal: 'To have a well-hung tongue', example: 'Cette politique a vraiment la langue bien pendue — impossible de la faire taire.', exampleEn: 'That politician really has the gift of the gab — impossible to shut her up.', category: 'Personality', level: 'B2', note: 'Can be slightly critical (talking too much) or admiring (eloquent, persuasive).' },
  { fr: 'Faire d\'une pierre deux coups', en: 'To kill two birds with one stone', literal: 'To make two blows with one stone', example: 'En passant par Lyon, j\'ai fait d\'une pierre deux coups — visiter ma cousine et voir l\'expo.', exampleEn: 'By going through Lyon, I killed two birds with one stone — visiting my cousin and seeing the exhibition.', category: 'Life', level: 'B1', note: 'Very commonly used — exactly equivalent to the English expression.' },
  { fr: 'Mettre de l\'eau dans son vin', en: 'To tone it down / make concessions / soften your position', literal: 'To put water in your wine', example: 'Si tu veux trouver un accord, tu vas devoir mettre de l\'eau dans ton vin.', exampleEn: 'If you want to reach an agreement, you\'re going to have to make some concessions.', category: 'Social', level: 'B2', note: 'To dilute your position — to become more moderate or willing to compromise. The image of watering down wine captures the "weakening" perfectly.' },
  { fr: 'Avoir le vent en poupe', en: 'To be on a roll / riding high / everything going well', literal: 'To have the wind at the stern', example: 'Sa carrière artistique a le vent en poupe — trois expositions cette année.', exampleEn: 'Her artistic career is on a roll — three exhibitions this year.', category: 'Success', level: 'C1', note: 'Maritime metaphor — a following wind (at the stern) = the best sailing condition. Perfect for describing momentum.' },
  { fr: 'Ce n\'est pas la mer à boire', en: 'It\'s not that difficult / not a big deal', literal: 'It\'s not the sea to drink', example: 'Allez, remplis ce formulaire — ce n\'est pas la mer à boire !', exampleEn: 'Come on, fill in this form — it\'s not that hard!', category: 'Life', level: 'B1', note: 'Encouragement to stop exaggerating the difficulty of something. Used to motivate someone avoiding a task.' },
  { fr: 'Chercher midi à quatorze heures', en: 'To overcomplicate things / to look for problems that don\'t exist', literal: 'To look for noon at 2pm', example: 'Tu cherches midi à quatorze heures — la solution est évidente !', exampleEn: 'You\'re overcomplicating things — the solution is obvious!', category: 'Personality', level: 'C1', note: 'To look for a complexity that isn\'t there. Looking for "noon" at 2pm = looking at the wrong time for something simple.' },
  { fr: 'Brûler la chandelle par les deux bouts', en: 'To burn the candle at both ends', literal: 'To burn the candle at both ends', example: 'Elle brûle la chandelle par les deux bouts — travail, sorties, sport...', exampleEn: 'She\'s burning the candle at both ends — work, going out, sport...', category: 'Life', level: 'B2', note: 'Same as the English idiom — exhausting oneself by doing too much.' },
  { fr: 'Prendre la poudre d\'escampette', en: 'To make a run for it / to flee', literal: 'To take the escape powder', example: 'Quand les problèmes ont commencé, il a pris la poudre d\'escampette.', exampleEn: 'When the problems started, he made a run for it.', category: 'Social', level: 'C1', note: '"Escampette" comes from Italian "scampare" (to escape). To disappear suddenly when things get difficult.' },
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
  const [daily, setDaily] = useState(() => IDIOMS[new Date().getDate() % IDIOMS.length])

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

  const randomIdiom = () => {
    const pool = filtered.length > 0 ? filtered : IDIOMS
    setDaily(pool[Math.floor(Math.random() * pool.length)])
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Idioms | SayBonjour!" description="Master 25+ common French idioms — English translations, literal meanings, origins, and example sentences." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Idioms</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Expressions idiomatiques — the colour and life of the language</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute right-4 top-2 text-8xl opacity-10 font-serif">💡</div>
          <div className="text-xs font-medium text-amber-100 mb-2 uppercase tracking-wide">Idiom of the day</div>
          <p className="text-2xl font-bold font-playfair mb-1">{daily.fr}</p>
          <p className="text-amber-100 text-sm mb-1 italic">Literal: {daily.literal}</p>
          <p className="text-white text-base font-medium mb-3">= {daily.en}</p>
          <p className="text-amber-100 text-sm italic mb-3">"{daily.example}"</p>
          <div className="flex items-center gap-3">
            <SpeakButton text={daily.fr} size="sm" />
            <button onClick={randomIdiom} className="flex items-center gap-1.5 text-xs text-amber-200 hover:text-white transition-colors">
              <Shuffle size={13} /> Another idiom
            </button>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${cat === c ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${level === l ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {l}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mb-4">{filtered.length} idiom{filtered.length !== 1 ? 's' : ''} shown</p>

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
                        {idiom.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">💡 {idiom.note}</p>}
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
