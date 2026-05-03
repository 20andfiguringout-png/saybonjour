import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Heart, Shuffle, Copy, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const QUOTES = [
  { fr: 'Je pense, donc je suis.', en: 'I think, therefore I am.', author: 'René Descartes', year: '1637', category: 'Philosophy', context: 'The foundational statement of Western philosophy — establishing existence from the act of thought.' },
  { fr: 'Le cœur a ses raisons que la raison ne connaît point.', en: 'The heart has its reasons which reason knows nothing of.', author: 'Blaise Pascal', year: '1670', category: 'Philosophy', context: 'From his Pensées — one of the most quoted French sentences of all time.' },
  { fr: 'L\'enfer, c\'est les autres.', en: 'Hell is other people.', author: 'Jean-Paul Sartre', year: '1944', category: 'Philosophy', context: 'From his play Huis Clos (No Exit) — often misunderstood, it means we are defined by others\' judgement of us.' },
  { fr: 'On ne naît pas femme, on le devient.', en: 'One is not born a woman, but rather becomes one.', author: 'Simone de Beauvoir', year: '1949', category: 'Feminism', context: 'The opening of The Second Sex — foundational text of feminist philosophy.' },
  { fr: 'Ce qui ne tue pas rend plus fort.', en: 'What does not kill you makes you stronger.', author: 'Friedrich Nietzsche (French saying)', year: '', category: 'Resilience', context: 'Though originally German (Nietzsche), this is now a widely used French expression.' },
  { fr: 'La liberté est le droit de faire ce que les lois permettent.', en: 'Liberty is the right to do whatever the laws permit.', author: 'Montesquieu', year: '1748', category: 'Politics', context: 'From The Spirit of the Laws — Montesquieu laid the groundwork for modern democratic thought.' },
  { fr: 'Je suis un homme libre.', en: 'I am a free man.', author: 'Various (French revolutionary)', year: '', category: 'Freedom', context: 'A declaration embodying the spirit of the French Revolution.' },
  { fr: 'Il faut cultiver notre jardin.', en: 'We must tend our own garden.', author: 'Voltaire (Candide)', year: '1759', category: 'Literature', context: 'The final lesson of Candide — focus on practical work rather than abstract philosophy.' },
  { fr: 'Les absents ont toujours tort.', en: 'The absent are always wrong.', author: 'Néricault Destouches', year: '1717', category: 'Society', context: 'A French proverb — those who aren\'t present cannot defend themselves.' },
  { fr: 'En politique, une absurdité n\'est pas un obstacle.', en: 'In politics, an absurdity is not a hindrance.', author: 'Napoléon Bonaparte', year: '', category: 'Politics', context: 'Napoleon\'s cynical but enduring observation about political life.' },
  { fr: 'L\'imagination est plus importante que le savoir.', en: 'Imagination is more important than knowledge.', author: 'Albert Einstein (in French translation)', year: '', category: 'Science', context: 'Originally said in German but widely known in French through translation.' },
  { fr: 'Rien ne se perd, rien ne se crée, tout se transforme.', en: 'Nothing is lost, nothing is created, everything is transformed.', author: 'Antoine Lavoisier', year: '1789', category: 'Science', context: 'The principle of conservation of mass — stated by the father of modern chemistry.' },
  { fr: 'On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.', en: 'One sees clearly only with the heart. What is essential is invisible to the eye.', author: 'Antoine de Saint-Exupéry', year: '1943', category: 'Literature', context: 'The Fox\'s lesson in The Little Prince — the most quoted sentence from the most-read French novel.' },
  { fr: 'La vie, c\'est comme une bicyclette : il faut avancer pour ne pas perdre l\'équilibre.', en: 'Life is like riding a bicycle: you must keep moving to maintain your balance.', author: 'Albert Einstein', year: '', category: 'Wisdom', context: 'Famously said in a letter and widely circulated in French.' },
  { fr: 'Soyez le changement que vous voulez voir dans le monde.', en: 'Be the change you wish to see in the world.', author: 'Mahatma Gandhi (translated)', year: '', category: 'Wisdom', context: 'Though originally in English/Hindi, this is one of the most quoted phrases in French today.' },
  { fr: 'La connaissance s\'acquiert par l\'expérience, tout le reste n\'est qu\'information.', en: 'Knowledge is acquired through experience; everything else is just information.', author: 'Albert Einstein (French translation)', year: '', category: 'Education', context: 'A reminder that lived experience is the foundation of real understanding.' },
  { fr: 'Le succès, c\'est d\'aller d\'échec en échec sans perdre son enthousiasme.', en: 'Success is going from failure to failure without losing enthusiasm.', author: 'Winston Churchill (French)', year: '', category: 'Resilience', context: 'Widely quoted in French business and self-help contexts.' },
  { fr: 'Tout ce qui est beau et noble est le résultat de la raison et du calcul.', en: 'Everything that is beautiful and noble is the product of reason and calculation.', author: 'Charles Baudelaire', year: '', category: 'Art', context: 'From The Painter of Modern Life — Baudelaire\'s philosophy of artistic beauty.' },
  { fr: 'Je ne suis pas d\'accord avec ce que vous dites, mais je me battrai jusqu\'à la mort pour que vous ayez le droit de le dire.', en: 'I disapprove of what you say, but I will defend to the death your right to say it.', author: 'Attributed to Voltaire', year: '', category: 'Freedom', context: 'A foundational statement on free speech, often (perhaps wrongly) attributed to Voltaire.' },
  { fr: 'La vérité vaut bien qu\'on passe quelques années sans la trouver.', en: 'Truth is worth a few years spent without finding it.', author: 'Jules Renard', year: '', category: 'Philosophy', context: 'A reminder of the patient, humbling nature of the search for truth.' },
]

const CATEGORIES = ['All', ...Array.from(new Set(QUOTES.map(q => q.category)))]

export default function FrenchQuotes() {
  const [cat, setCat] = useState('All')
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
      <SEO title="Famous French Quotes | SayBonjour!" description="Learn French through famous quotes from Voltaire, Pascal, Sartre, de Beauvoir and more." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Famous French Quotes</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Citations célèbres — wisdom from great minds</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
          <Quote size={80} className="absolute -right-4 -top-4 opacity-10" />
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Quote of the day</div>
          <p className="text-2xl font-playfair font-bold leading-snug mb-3 italic">"{daily.fr}"</p>
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-2">{q.context}</p>
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
      </div>
    </div>
  )
}
