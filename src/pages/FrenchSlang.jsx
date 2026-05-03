import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, AlertCircle, Zap } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SLANG_GROUPS = [
  {
    category: 'Everyday Slang',
    fr: 'L\'argot du quotidien',
    level: 'B1+',
    levelColor: 'bg-yellow-100 text-yellow-700',
    desc: 'These words appear constantly in conversation — mastering them will make you sound far more natural.',
    items: [
      { fr: 'sympa', en: 'nice / friendly', formal: 'sympathique', use: 'C\'est quelqu\'un de vraiment sympa.' },
      { fr: 'super / trop', en: 'really / super (intensifier)', formal: 'vraiment / très', use: 'C\'est trop bien !' },
      { fr: 'vachement', en: 'really / dead (strong intensifier)', formal: 'vraiment / extrêmement', use: 'C\'est vachement intéressant.', note: 'From "vache" (cow) — one of the most distinctly French intensifiers' },
      { fr: 'truc / machin', en: 'thing / thingamajig', formal: 'chose', use: 'Passe-moi ce truc-là.' },
      { fr: 'mec', en: 'guy / bloke', formal: 'homme / garçon', use: 'C\'est un mec bien.' },
      { fr: 'nana', en: 'woman / girl (informal)', formal: 'femme / fille', use: 'C\'est une nana de ma classe.' },
      { fr: 'pote', en: 'mate / friend', formal: 'ami(e)', use: 'Mes potes et moi, on sort ce soir.' },
      { fr: 'kiffer', en: 'to love / really like', formal: 'aimer beaucoup', use: 'Je kiffe trop ce film.', note: 'From Arabic "kif" — widely used by all ages now' },
      { fr: 'nickel', en: 'perfect / spot on', formal: 'parfait / impeccable', use: 'C\'est nickel !', note: '"Nickel chrome" = absolutely perfect (stronger)' },
      { fr: 'bof', en: 'meh / so-so (indifference)', formal: '(no direct equivalent)', use: '"Tu aimes ce chanteur ?" — "Bof."', note: '"Bof" captures French shrugging indifference perfectly' },
      { fr: 'c\'est nul', en: 'it\'s rubbish / awful', formal: 'c\'est mauvais / médiocre', use: 'Ce film est vraiment nul.' },
      { fr: 'un truc de ouf', en: 'something crazy / amazing', formal: 'quelque chose d\'extraordinaire', use: 'Le concert, c\'était un truc de ouf !' },
      { fr: 'carrément', en: 'totally / completely / absolutely', formal: 'tout à fait', use: '"T\'as aimé ?" — "Carrément !"' },
      { fr: 'flemme', en: 'laziness / can\'t be bothered', formal: 'paresse', use: 'J\'ai la flemme de sortir ce soir.', note: '"J\'ai la flemme" = I can\'t be bothered — extremely common' },
    ],
  },
  {
    category: 'Verlan',
    fr: 'Le verlan',
    level: 'B2+',
    levelColor: 'bg-orange-100 text-orange-700',
    desc: 'Verlan = syllable inversion ("l\'envers" reversed). Originally a prison/banlieue secret language, now mainstream in French culture, music, and media.',
    items: [
      { fr: 'meuf', en: 'woman / girl', formal: 'femme', use: 'C\'est la meuf de Thomas.', note: 'fe-mme → meuf (reversed syllables). One of the most well-known verlan words' },
      { fr: 'keum', en: 'guy', formal: 'mec (itself slang)', use: 'Qui c\'est ce keum ?', note: 'mec → keum' },
      { fr: 'ouf', en: 'crazy / mental (positive)', formal: 'fou', use: 'Ce concert était ouf !', note: 'fou → ouf. Also used in "un truc de ouf" = something crazy good' },
      { fr: 'relou', en: 'annoying / heavy going', formal: 'lourd', use: 'Il est vraiment relou ce type.', note: 'lourd → relou' },
      { fr: 'laisse béton', en: 'forget it / drop it', formal: 'laisse tomber', use: 'Laisse béton, c\'est pas important.', note: 'tomber → béton (concrete). Immortalised in the 1977 Renaud song "Laisse béton"' },
      { fr: 'chanmé', en: 'amazing / wicked', formal: 'méchant (used positively in slang)', use: 'Le concert était chanmé !', note: 'méchant → chanmé. Originally banlieue slang, now nationwide' },
      { fr: 'teubé', en: 'stupid / thick', formal: 'bête', use: 'Ne fais pas le teubé !', note: 'bête → teubé' },
      { fr: 'céfran', en: 'French person', formal: 'français', use: 'Les céfrans font ça différemment.', note: 'fran-çais → cé-fran' },
      { fr: 'zarbi', en: 'weird / odd', formal: 'bizarre', use: 'C\'est zarbi comme situation.', note: 'bi-zarre → zar-bi' },
      { fr: 'à donf', en: 'totally / to the max', formal: 'à fond', use: 'Il a travaillé à donf.', note: 'à fond → à donf' },
    ],
  },
  {
    category: 'Youth Slang',
    fr: 'L\'argot des jeunes',
    level: 'B2+',
    levelColor: 'bg-orange-100 text-orange-700',
    desc: 'Current slang used by French teenagers and young adults — you\'ll hear this in films, music, and daily life.',
    items: [
      { fr: 'genre', en: 'like (filler word)', formal: 'comme / environ', use: '"Elle était genre super énervée."', note: 'Like the English "like" as filler — hugely common among French youth' },
      { fr: 'trop stylé(e)', en: 'really cool / stylish', formal: 'très à la mode', use: 'Ton look est trop stylé !' },
      { fr: 'c\'est chaud', en: 'it\'s tough / risky / a lot', formal: 'c\'est difficile / dangereux', use: 'C\'est chaud de trouver un appart à Paris.', note: 'Context-dependent — "c\'est chaud" can mean hot, difficult, intense, risky' },
      { fr: 'chelou', en: 'shady / weird / sketchy', formal: 'louche / bizarre', use: 'Ce type me semble chelou.', note: 'Verlan of "louche" → chelou' },
      { fr: 'grave', en: 'totally / absolutely (strong agreement)', formal: 'absolument', use: '"T\'as aimé le film ?" — "Grave !"' },
      { fr: 'oklm', en: 'calmly / chilled (abbrev.)', formal: 'tranquillement', use: 'On traîne oklm ce soir.', note: '"Au calme" abbreviated — from the PNL rap song "Jusqu\'au dernier gramme"' },
      { fr: 'bg', en: 'handsome / hot (beau gosse)', formal: 'beau garçon', use: 'Il est trop bg ce mec.' },
      { fr: 'wesh', en: 'hey! / yeah! / bro!', formal: 'salut / oui / camarade', use: '"Wesh, ça va ?" "Wesh !"', note: 'Originally Algerian Arabic slang ("wesh" = what/how), adopted by French youth' },
      { fr: 'frérot / frère', en: 'bro / brother (to a friend)', formal: 'ami / camarade', use: '"Ça va frérot ?"' },
      { fr: 'pécho', en: 'to pull / get off with someone', formal: 'séduire / conquérir', use: 'Il a réussi à la pécho.', note: 'Verlan of "choper" (to catch/grab)' },
    ],
  },
  {
    category: 'Expressions & Exclamations',
    fr: 'Les gros mots et expressions',
    level: 'C1',
    levelColor: 'bg-red-100 text-red-700',
    desc: 'Mild exclamations to strong expressions — understanding these is essential for comprehension, even if you use them carefully.',
    items: [
      { fr: 'zut !', en: 'darn! / blast! (mild)', formal: 'hélas', use: '"Zut, j\'ai oublié mes clés !"', note: 'A perfectly polite mild exclamation — safe in all contexts' },
      { fr: 'punaise !', en: 'blimey! / wow! (mild)', formal: 'oh là là!', use: '"Punaise, il fait chaud aujourd\'hui !"', note: 'Lit. "bedbug" — a classic French euphemism' },
      { fr: 'la barbe !', en: 'what a pain! / blast! (frustration)', formal: 'quelle contrariété!', use: '"La barbe, on est encore en retard !"' },
      { fr: 'ça m\'énerve', en: 'it annoys me / drives me mad', formal: 'cela m\'irrite', use: 'Ces bouchons, ça m\'énerve !' },
      { fr: 'j\'en ai marre', en: 'I\'m fed up / sick of it', formal: 'j\'en ai assez', use: 'J\'en ai marre de cette pluie !' },
      { fr: 'ça m\'est égal', en: 'I don\'t care / it\'s all the same to me', formal: 'cela m\'est indifférent', use: '"Café ou thé ?" "Ça m\'est égal."' },
      { fr: 'laisse tomber', en: 'forget it / drop it', formal: 'n\'en parlons plus', use: 'Laisse tomber, c\'est sans importance.' },
      { fr: 'ça roule', en: 'it\'s rolling / everything\'s good', formal: 'tout va bien', use: '"Comment ça va ?" "Ça roule !"' },
      { fr: 'T\'inquiète !', en: 'Don\'t worry! (informal)', formal: 'Ne t\'inquiète pas !', use: '"T\'inquiète, ça va aller."', note: 'Technically incorrect grammar (missing "ne") but universally used' },
      { fr: 'Ça marche !', en: 'That works! / Deal! / OK!', formal: 'D\'accord !', use: '"On se retrouve à 18h ?" "Ça marche !"' },
    ],
  },
]

const REGISTER_NOTES = [
  { title: 'Formal vs informal', content: 'French has a very clear formal/informal split. Slang used in a job interview, with older people, or in official contexts can seem disrespectful. Use "vous" and standard French in professional settings.' },
  { title: 'Text and messaging slang', content: '"Mdr" = mort de rire (= lol); "ptdr" = pété de rire (stronger lol); "jsp" = je sais pas; "stp" = s\'il te plaît; "bjr" = bonjour; "bsr" = bonsoir; "dsl" = désolé; "pb" = problème.' },
  { title: 'Regional differences', content: 'Verlan originated in the Parisian banlieues (suburbs) but is now nationwide. Southern France uses "con" as a mild intensifier (not offensive in context). Québécois French uses completely different slang.' },
  { title: 'The "ne" dropout', content: 'In spoken French, the "ne" in negation almost always disappears: "Je sais pas" (not "Je ne sais pas"), "C\'est pas vrai" (not "Ce n\'est pas vrai"). You\'ll rarely hear the full form in casual speech.' },
]

export default function FrenchSlang() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [tab, setTab] = useState('slang')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Slang | SayBonjour!" description="Learn French slang — everyday argot, verlan (back-slang), youth expressions, and how to sound natural in French." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Slang</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L'argot français — speak like a local, not a textbook</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300">Context matters. Slang appropriate with friends can seem disrespectful in formal settings. Read the register carefully — know when to switch to standard French.</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'slang', label: 'Slang & Verlan' }, { id: 'notes', label: 'Register & Tips' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'slang' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {SLANG_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.category}
                  <span className={`px-1.5 py-0.5 rounded text-xs ${activeGroup === i ? 'bg-white/20' : g.levelColor}`}>{g.level}</span>
                </button>
              ))}
            </div>

            <div className="bg-cream-100 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5 mb-4 text-xs text-gray-500 dark:text-gray-400 italic">
              {SLANG_GROUPS[activeGroup].desc}
            </div>

            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="space-y-4">
                {SLANG_GROUPS[activeGroup].items.map((item, i) => (
                  <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 dark:border-dark-warm-200 pb-3 last:border-0"
                    onClick={() => addXP(2, 'vocabulary')}>
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
                    {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-1 ml-7">💡 {item.note}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'notes' && (
          <div className="space-y-4">
            {REGISTER_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <h3 className="font-bold text-gray-900 dark:text-cream-50 mb-2 flex items-center gap-2">
                  <Zap size={15} className="text-amber-500 shrink-0" />
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{note.content}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
