import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SLANG_GROUPS = [
  {
    category: 'Everyday Slang — L\'argot du quotidien',
    level: 'B1+',
    items: [
      { fr: 'sympa', en: 'nice / friendly', formal: 'sympathique', use: 'C\'est quelqu\'un de très sympa.' },
      { fr: 'super / trop', en: 'really / very (intensifier)', formal: 'vraiment / très', use: 'C\'est trop bien !' },
      { fr: 'vachement', en: 'really / dead (intensifier)', formal: 'vraiment / extrêmement', use: 'C\'est vachement intéressant.' },
      { fr: 'truc / machin', en: 'thing / whatsit', formal: 'chose', use: 'Passe-moi ce truc-là.' },
      { fr: 'mec', en: 'guy / bloke', formal: 'homme / garçon', use: 'C\'est un mec bien.' },
      { fr: 'nana / meuf', en: 'woman / girl', formal: 'femme / fille', use: 'C\'est la meuf de mon frère.' },
      { fr: 'pote / copain', en: 'mate / friend', formal: 'ami(e)', use: 'Mes potes et moi on sort ce soir.' },
      { fr: 'kiffer', en: 'to love / really like', formal: 'aimer beaucoup', use: 'Je kiffe trop ce film.' },
      { fr: 'nickel', en: 'perfect / spot on', formal: 'parfait', use: 'C\'est nickel !' },
      { fr: 'c\'est pas mal', en: 'it\'s not bad / quite good', formal: 'c\'est assez bien', use: 'Ce restaurant, c\'est pas mal.' },
      { fr: 'c\'est nul', en: 'it\'s rubbish / awful', formal: 'c\'est mauvais', use: 'Ce film est vraiment nul.' },
      { fr: 'bof', en: 'meh / so-so', formal: '(no direct equivalent)', use: '"Tu aimes ce chanteur ?" — "Bof."' },
    ],
  },
  {
    category: 'Verlan — Le verlan',
    level: 'B2+',
    items: [
      { fr: 'verlan', en: 'back-slang (l\'envers reversed)', formal: 'l\'envers', use: 'Le verlan est né dans les banlieues parisiennes.' },
      { fr: 'meuf', en: 'woman / girl', formal: 'femme', use: 'C\'est la meuf de Thomas.' },
      { fr: 'keum', en: 'guy', formal: 'mec (itself slang for homme)', use: 'Qui c\'est ce keum ?' },
      { fr: 'ouf', en: 'crazy / mental', formal: 'fou', use: 'Ce concert était ouf !' },
      { fr: 'relou', en: 'annoying / heavy going', formal: 'lourd', use: 'Il est vraiment relou ce type.' },
      { fr: 'laisse béton', en: 'forget it / drop it', formal: 'laisse tomber', use: 'Laisse béton, c\'est pas important.' },
      { fr: 'chanmé', en: 'amazing (extreme)', formal: 'méchant (used positively)', use: 'Le concert était chanmé !' },
      { fr: 'teubé', en: 'stupid / dumb', formal: 'bête', use: 'Ne fais pas le teubé !' },
      { fr: 'céfran', en: 'French person', formal: 'français', use: 'Les céfrans font ça différemment.' },
      { fr: 'zarbi', en: 'weird', formal: 'bizarre', use: 'C\'est zarbi comme situation.' },
    ],
  },
  {
    category: 'Youth Slang — L\'argot des jeunes',
    level: 'B2+',
    items: [
      { fr: 'genre', en: 'like (filler word)', formal: 'comme / environ', use: '"Elle était genre super énervée."' },
      { fr: 'trop stylé(e)', en: 'really cool / stylish', formal: 'très à la mode', use: 'Ton look est trop stylé !' },
      { fr: 'c\'est chaud', en: 'it\'s tough / risky / hot', formal: 'c\'est difficile / dangereux', use: 'C\'est chaud de trouver un appart à Paris.' },
      { fr: 'chelou', en: 'shady / weird', formal: 'louche / bizarre', use: 'Ce type me semble chelou.' },
      { fr: 'grave', en: 'totally / absolutely (agreement)', formal: 'absolument', use: '"T\'as aimé le film ?" — "Grave !"' },
      { fr: 'oklm', en: 'calmly / chilled', formal: 'tranquillement', use: 'On traîne oklm ce soir.' },
      { fr: 'bg', en: 'handsome / hot (beau gosse)', formal: 'beau garçon', use: 'Il est trop bg ce mec.' },
      { fr: 'gosse', en: 'kid / child (also: beau gosse = good-looking)', formal: 'enfant', use: '"Les gosses jouent dehors."' },
      { fr: 'wesh', en: 'hey! / yeah! (greeting/affirmation)', formal: 'salut / oui', use: '"Wesh, ça va ?" "Wesh !"' },
      { fr: 'frère / frérot', en: 'bro / brother (to a friend)', formal: 'ami / camarade', use: '"Ça va frérot ?"' },
    ],
  },
  {
    category: 'Swearing & Expressions — Les gros mots et expressions',
    level: 'C1',
    items: [
      { fr: 'merde', en: 'damn it! / sh*t!', formal: 'zut! (polite)', use: 'Often used as an exclamation of frustration' },
      { fr: 'zut !', en: 'darn! / blast! (mild)', formal: 'hélas', use: '"Zut, j\'ai oublié mes clés !"' },
      { fr: 'punaise !', en: 'blimey! / crikey!', formal: 'oh là là!', use: '"Punaise, il fait chaud aujourd\'hui !"' },
      { fr: 'la barbe !', en: 'what a pain! / blast!', formal: 'quelle contrariété!', use: '"La barbe, on est en retard !"' },
      { fr: 'ça m\'énerve', en: 'it annoys me / drives me mad', formal: 'cela m\'irrite', use: 'Ces bouchons, ça m\'énerve !' },
      { fr: 'laisse tomber', en: 'forget it / drop it', formal: 'n\'en parlons plus', use: 'Laisse tomber, c\'est sans importance.' },
      { fr: 'j\'en ai marre', en: 'I\'m fed up', formal: 'j\'en ai assez', use: 'J\'en ai marre de cette pluie !' },
      { fr: 'ça m\'est égal', en: 'I don\'t care / it\'s all the same to me', formal: 'cela m\'est indifférent', use: '"Tu veux du thé ou du café ?" "Ça m\'est égal."' },
    ],
  },
]

export default function FrenchSlang() {
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Slang | SayBonjour!" description="Learn French slang — everyday argot, verlan (back-slang), youth expressions, and how to sound natural." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Slang</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L\'argot français — speak like a local, not a textbook</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300">Context matters. Slang appropriate with friends can seem disrespectful in formal settings. Read the register cues carefully.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {SLANG_GROUPS.map((g, i) => (
            <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {g.category.split('—')[0].trim()}
              <span className="ml-1 opacity-60">{g.level}</span>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-5">{SLANG_GROUPS[activeGroup].category}</h2>
          <div className="space-y-4">
            {SLANG_GROUPS[activeGroup].items.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="border-b border-gray-50 dark:border-dark-warm-200 pb-3 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <SpeakButton text={item.fr} size="sm" />
                  <span className="font-bold text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                  <span className="text-xs text-gray-400">— {item.en}</span>
                </div>
                {item.formal && (
                  <p className="text-xs text-gray-400 italic ml-7">Formal: <span className="text-gray-500">{item.formal}</span></p>
                )}
                {item.use && (
                  <div className="ml-7 mt-1.5 flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-1.5">
                    <SpeakButton text={item.use} size="sm" />
                    <p className="text-xs italic text-gray-600 dark:text-gray-400">"{item.use}"</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
