import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Heart, Shuffle, Copy, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const QUOTES = [
  { fr: 'Je pense, donc je suis.', en: 'I think, therefore I am.', author: 'René Descartes', year: '1637', category: 'Philosophy', context: 'The most famous philosophical statement in history — the one certainty Descartes could not doubt. The foundation of modern philosophy.' },
  { fr: 'Le cœur a ses raisons que la raison ne connaît point.', en: 'The heart has its reasons which reason knows nothing of.', author: 'Blaise Pascal', year: '1670', category: 'Philosophy', context: 'From his Pensées — one of the most quoted French sentences of all time. Pascal invented the calculator and probability theory — yet wrote this.' },
  { fr: 'L\'enfer, c\'est les autres.', en: 'Hell is other people.', author: 'Jean-Paul Sartre', year: '1944', category: 'Philosophy', context: 'From his play Huis Clos (No Exit) — often misunderstood. It means we are defined and trapped by others\' judgement of us. Not that people are hell.' },
  { fr: 'On ne naît pas femme, on le devient.', en: 'One is not born a woman, but rather becomes one.', author: 'Simone de Beauvoir', year: '1949', category: 'Feminism', context: 'The opening of The Second Sex — the foundational statement of feminist philosophy. Gender is constructed, not biological destiny.' },
  { fr: 'Il faut cultiver notre jardin.', en: 'We must tend our own garden.', author: 'Voltaire (Candide)', year: '1759', category: 'Wisdom', context: 'The final lesson of Candide — after all the philosophical debate and suffering, the answer is practical: focus on the work in front of you.' },
  { fr: 'La liberté est le droit de faire ce que les lois permettent.', en: 'Liberty is the right to do whatever the laws permit.', author: 'Montesquieu', year: '1748', category: 'Politics', context: 'From The Spirit of the Laws — Montesquieu\'s theory of separation of powers directly influenced the US Constitution.' },
  { fr: 'L\'imagination est plus importante que le savoir.', en: 'Imagination is more important than knowledge.', author: 'Albert Einstein', year: '1929', category: 'Education', context: 'Said in an interview — widely circulated in French. Einstein considered this his most important personal belief.' },
  { fr: 'Rien ne se perd, rien ne se crée, tout se transforme.', en: 'Nothing is lost, nothing is created, everything is transformed.', author: 'Antoine Lavoisier', year: '1789', category: 'Science', context: 'The principle of conservation of mass — stated by the father of modern chemistry in the same year as the Revolution.' },
  { fr: 'On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.', en: 'One sees clearly only with the heart. What is essential is invisible to the eye.', author: 'Antoine de Saint-Exupéry', year: '1943', category: 'Literature', context: 'The Fox\'s lesson in The Little Prince — the most quoted sentence from the most-translated French novel (after the Bible).' },
  { fr: 'En politique, une absurdité n\'est pas un obstacle.', en: 'In politics, an absurdity is not a hindrance.', author: 'Napoléon Bonaparte', year: 'c. 1810', category: 'Politics', context: 'Napoleon\'s enduringly cynical observation about political life — as relevant today as in 1810.' },
  { fr: 'Les absents ont toujours tort.', en: 'The absent are always wrong.', author: 'Néricault Destouches', year: '1717', category: 'Society', context: 'A French proverb turned aphorism — those who aren\'t present cannot defend themselves. Used to explain gossip and scapegoating.' },
  { fr: 'Il faut imaginer Sisyphe heureux.', en: 'One must imagine Sisyphus happy.', author: 'Albert Camus', year: '1942', category: 'Philosophy', context: 'The closing line of The Myth of Sisyphus — Camus\'s philosophy of the absurd: revolt against meaninglessness with joy, not despair.' },
  { fr: 'Tout ce qui est beau et noble est le résultat de la raison et du calcul.', en: 'Everything that is beautiful and noble is the product of reason and calculation.', author: 'Charles Baudelaire', year: '1863', category: 'Art', context: 'From The Painter of Modern Life — Baudelaire\'s counter-romantic philosophy of art, which influenced every modernist who followed.' },
  { fr: 'Je ne suis pas d\'accord avec ce que vous dites, mais je me battrai jusqu\'à la mort pour que vous ayez le droit de le dire.', en: 'I disapprove of what you say, but I will defend to the death your right to say it.', author: 'Attributed to Voltaire', year: '', category: 'Freedom', context: 'A foundational statement on free speech — though scholars believe it was written about Voltaire\'s views, not by him. The sentiment is authentically Voltairean.' },
  { fr: 'La vérité vaut bien qu\'on passe quelques années sans la trouver.', en: 'Truth is worth a few years spent without finding it.', author: 'Jules Renard', year: '1895', category: 'Philosophy', context: 'From his Journal — a reminder of the patient, humbling, worthwhile nature of the search for truth.' },
  { fr: 'Le génie, c\'est l\'enfance retrouvée à volonté.', en: 'Genius is childhood recaptured at will.', author: 'Charles Baudelaire', year: '1863', category: 'Art', context: 'From The Painter of Modern Life — Baudelaire\'s theory that great artists never lose the child\'s capacity for pure wonder.' },
  { fr: 'Vivre sans philosophie, c\'est avoir les yeux fermés sans essayer de les ouvrir.', en: 'To live without philosophy is to have one\'s eyes closed without trying to open them.', author: 'René Descartes', year: '1637', category: 'Philosophy', context: 'Descartes on the necessity of philosophical thinking — apropos for a country where philosophy is compulsory in the bac.' },
  { fr: 'Le silence éternel de ces espaces infinis m\'effraie.', en: 'The eternal silence of these infinite spaces terrifies me.', author: 'Blaise Pascal', year: '1670', category: 'Philosophy', context: 'From his Pensées — one of the most powerful expressions of existential dread before existentialism was named. Pascal faced the void with honesty.' },
  { fr: 'La vie, c\'est comme une bicyclette : il faut avancer pour ne pas perdre l\'équilibre.', en: 'Life is like riding a bicycle: you must keep moving to maintain your balance.', author: 'Albert Einstein', year: '1930', category: 'Wisdom', context: 'From a letter — widely circulated in French. Beautifully simple wisdom from the world\'s most celebrated scientist.' },
  { fr: 'Ce que l\'on conçoit bien s\'énonce clairement, et les mots pour le dire arrivent aisément.', en: 'What is well conceived is clearly stated, and the words to say it come easily.', author: 'Nicolas Boileau', year: '1674', category: 'Writing', context: 'From L\'Art poétique — the foundational rule of French clear expression (la clarté). Drilled into every French schoolchild.' },
  { fr: 'Mieux vaut être marteau qu\'enclume.', en: 'Better to be the hammer than the anvil.', author: 'French proverb', year: '', category: 'Wisdom', context: 'A classic French proverb — better to be the active force than to receive blows passively. Widely used in business and politics.' },
  { fr: 'Le propre de l\'homme est de penser et de souffrir.', en: 'What is unique to man is the capacity to think and to suffer.', author: 'Alfred de Musset', year: '1835', category: 'Literature', context: 'From his Romantic poetry — Musset capturing the twin nature of human consciousness. Deeply Romantic and persistently quoted.' },
  { fr: 'L\'existence précède l\'essence.', en: 'Existence precedes essence.', author: 'Jean-Paul Sartre', year: '1945', category: 'Philosophy', context: 'The central thesis of existentialism — we are not born with a fixed nature; we create ourselves through our choices.' },
  { fr: 'Je me révolte, donc je suis.', en: 'I rebel, therefore I am.', author: 'Albert Camus', year: '1951', category: 'Philosophy', context: 'From L\'Homme Révolté (The Rebel) — Camus\'s answer to Descartes. Rebellion against injustice as the source of human solidarity.' },
]

const PROVERBS = [
  { fr: 'Chaque chose en son temps.', en: 'Everything in its own time. / One thing at a time.', note: 'Encourages patience and proper ordering' },
  { fr: 'Mieux vaut tard que jamais.', en: 'Better late than never.' },
  { fr: 'Les chiens ne font pas des chats.', en: 'The apple doesn\'t fall far from the tree. (Lit. "Dogs don\'t make cats")', note: 'French version of the English proverb — children resemble their parents' },
  { fr: 'Après la pluie, le beau temps.', en: 'Every cloud has a silver lining. (Lit. "After the rain, good weather")', note: 'Optimistic proverb about things improving after difficulties' },
  { fr: 'Il ne faut pas vendre la peau de l\'ours avant de l\'avoir tué.', en: 'Don\'t count your chickens before they hatch. (Lit. "Don\'t sell the bear\'s skin before killing it")', note: 'Warning against premature optimism' },
  { fr: 'On n\'est jamais si bien servi que par soi-même.', en: 'If you want something done right, do it yourself. (Lit. "We are never so well served as by ourselves")', note: 'One of the most commonly used French proverbs' },
  { fr: 'Qui ne risque rien n\'a rien.', en: 'Nothing ventured, nothing gained. (Lit. "He who risks nothing has nothing")', note: 'Encourages taking calculated risks' },
  { fr: 'L\'appétit vient en mangeant.', en: 'Appetite comes with eating. / The more you have, the more you want.', note: 'Can be literal or metaphorical — enthusiasm grows as you get started' },
  { fr: 'Petit à petit, l\'oiseau fait son nid.', en: 'Little by little, the bird builds its nest. / Little and often fills the purse.', note: 'About consistent effort — one of the most beloved French proverbs' },
  { fr: 'Les jours se suivent et ne se ressemblent pas.', en: 'Every day is different. / No two days are alike.', note: 'Reminds us that life is constantly changing' },
  { fr: 'À cœur vaillant, rien d\'impossible.', en: 'Nothing is impossible to a brave heart.', note: 'The French equivalent of "nothing is impossible if you have courage"' },
  { fr: 'La nuit porte conseil.', en: 'Sleep on it. (Lit. "Night brings advice")', note: 'Advice to wait before making a decision — morning brings clarity' },
]

const CATEGORIES = ['All', ...Array.from(new Set(QUOTES.map(q => q.category)))]

export default function FrenchQuotes() {
  const [cat, setCat] = useState('All')
  const [tab, setTab] = useState('quotes')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('saybonjour_quote_favs') || '[]') } catch { return [] }
  })
  const [daily, setDaily] = useState(() => QUOTES[new Date().getDate() % QUOTES.length])
  const [copied, setCopied] = useState(null)

  const filtered = QUOTES.filter(q => cat === 'All' || q.category === cat)

  const toggleFav = (fr) => {
    setFavorites(prev => {
      const next = prev.includes(fr) ? prev.filter(f => f !== fr) : [...prev, fr]
      localStorage.setItem('saybonjour_quote_favs', JSON.stringify(next))
      if (!prev.includes(fr)) addXP(2, 'vocabulary')
      return next
    })
  }

  const copyQuote = (quote) => {
    const text = `"${quote.fr}" — ${quote.author}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(quote.fr)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const randomQuote = () => {
    const pool = filtered.length > 0 ? filtered : QUOTES
    setDaily(pool[Math.floor(Math.random() * pool.length)])
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Famous French Quotes & Proverbs | SayBonjour!" description="Learn French through famous quotes from Voltaire, Pascal, Sartre, Camus, de Beauvoir — plus French proverbs." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Famous French Quotes</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Citations célèbres et proverbes — wisdom from great French minds</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
          <Quote size={80} className="absolute -right-4 -top-4 opacity-10" />
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Quote of the day</div>
          <p className="text-xl font-playfair font-bold leading-snug mb-3 italic">"{daily.fr}"</p>
          <p className="text-gray-300 text-sm mb-1">{daily.en}</p>
          <p className="text-gray-400 text-xs mb-4">— {daily.author}{daily.year ? ` (${daily.year})` : ''}</p>
          <div className="flex items-center gap-3">
            <SpeakButton text={daily.fr} size="sm" />
            <button onClick={randomQuote}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <Shuffle size={13} /> Another quote
            </button>
          </div>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'quotes', label: 'Quotes' }, { id: 'proverbs', label: 'Proverbs' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'quotes' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${cat === c ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {c}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filtered.map((q, i) => (
                <motion.div key={q.fr} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                  <div className="flex items-start gap-3">
                    <Quote size={16} className="text-burgundy-300 dark:text-burgundy-600 mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="font-playfair font-bold text-gray-900 dark:text-cream-50 text-lg leading-snug mb-1 italic">"{q.fr}"</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{q.en}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">— {q.author}{q.year ? ` · ${q.year}` : ''} · <span className="text-gray-300">{q.category}</span></p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-2 leading-relaxed">{q.context}</p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <SpeakButton text={q.fr} size="sm" />
                      <button onClick={() => toggleFav(q.fr)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${favorites.includes(q.fr) ? 'text-rose-500' : 'text-gray-300 dark:text-gray-600 hover:text-rose-400'}`}>
                        <Heart size={14} fill={favorites.includes(q.fr) ? 'currentColor' : 'none'} />
                      </button>
                      <button onClick={() => copyQuote(q)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 dark:text-gray-600 hover:text-gray-500 transition-colors">
                        {copied === q.fr ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'proverbs' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">French proverbs (les proverbes) capture centuries of accumulated wisdom in a single phrase. Many have direct English equivalents; others express uniquely French ways of seeing the world.</p>
            {PROVERBS.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(3, 'vocabulary')}>
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm font-playfair italic text-burgundy-700 dark:text-burgundy-vibrant-300">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
