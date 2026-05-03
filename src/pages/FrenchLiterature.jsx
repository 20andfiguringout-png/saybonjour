import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const AUTHORS = [
  {
    name: 'Victor Hugo',
    born: '1802–1885',
    movement: 'Romantisme',
    level: 'B2',
    emoji: '📖',
    bio: 'The towering figure of French literature — poet, playwright, novelist, and political activist. Exiled for 19 years under Napoléon III.',
    works: [
      { title: 'Les Misérables', year: 1862, summary: 'Jean Valjean, ex-convict, and his pursuit by Inspector Javert in post-revolutionary France. A sweeping study of justice and redemption.' },
      { title: 'Notre-Dame de Paris', year: 1831, summary: 'The hunchback Quasimodo and his love for Esmeralda. Hugo wrote it partly to raise awareness of Gothic architecture being demolished.' },
    ],
    quote: { fr: '"Aimer, c\'est agir."', en: '"To love is to act."' },
    vocab: [{ fr: 'le bagne', en: 'penal colony / prison hulk' }, { fr: 'la rédemption', en: 'redemption' }, { fr: 'le misérable', en: 'the wretch / pauper' }],
  },
  {
    name: 'Marcel Proust',
    born: '1871–1922',
    movement: 'Modernisme',
    level: 'C1',
    emoji: '🫖',
    bio: 'Author of the longest novel in the French language (À la recherche du temps perdu, 7 volumes). Famous for the "madeleine" — the sensory trigger of involuntary memory.',
    works: [
      { title: 'À la recherche du temps perdu', year: '1913–1927', summary: 'Seven volumes exploring memory, time, love, and society in Belle Époque France. Often called the greatest novel ever written.' },
    ],
    quote: { fr: '"Le véritable voyage de découverte ne consiste pas à chercher de nouveaux paysages, mais à avoir de nouveaux yeux."', en: '"The real voyage of discovery consists not in seeking new landscapes, but in having new eyes."' },
    vocab: [{ fr: 'la mémoire involontaire', en: 'involuntary memory' }, { fr: 'le temps perdu', en: 'lost time' }, { fr: 'la madeleine', en: 'madeleine (sponge cake triggering memory)' }],
  },
  {
    name: 'Gustave Flaubert',
    born: '1821–1880',
    movement: 'Réalisme',
    level: 'B2',
    emoji: '💊',
    bio: 'Pioneer of Realism and obsessive stylist. He agonised over every word — famously spending days finding "le mot juste" (the right word).',
    works: [
      { title: 'Madame Bovary', year: 1857, summary: 'Emma Bovary, a doctor\'s wife in provincial Normandy, seeks escape from boredom through romance and luxury — with devastating consequences.' },
      { title: 'L\'Éducation sentimentale', year: 1869, summary: 'Frédéric Moreau\'s sentimental education in Paris — love, politics, and disillusionment.' },
    ],
    quote: { fr: '"Le style, c\'est l\'homme même."', en: '"Style is the man himself."' },
    vocab: [{ fr: 'le provincialisme', en: 'provincialism' }, { fr: 'le mot juste', en: 'the right/exact word' }, { fr: 'le bovarysme', en: 'bovarism (romantic self-delusion)' }],
  },
  {
    name: 'Albert Camus',
    born: '1913–1960',
    movement: 'Existentialisme / Absurdisme',
    level: 'B2',
    emoji: '☀️',
    bio: 'Born in Algeria, died in a car accident at 46. Nobel Prize winner. His philosophy of the absurd — accepting life without meaning while refusing despair — influenced the entire 20th century.',
    works: [
      { title: 'L\'Étranger', year: 1942, summary: 'Meursault kills an Arab on an Algerian beach and seems strangely indifferent to everything — even his own trial for murder. A masterpiece of alienation.' },
      { title: 'La Peste', year: 1947, summary: 'An allegorical novel about a plague in Oran, Algeria — widely read as a metaphor for the Nazi occupation of France.' },
    ],
    quote: { fr: '"Il faut imaginer Sisyphe heureux."', en: '"One must imagine Sisyphus happy."' },
    vocab: [{ fr: 'l\'absurde', en: 'the absurd' }, { fr: 'l\'aliénation', en: 'alienation' }, { fr: 'l\'étranger', en: 'stranger / foreigner / outsider' }],
  },
  {
    name: 'Simone de Beauvoir',
    born: '1908–1986',
    movement: 'Existentialisme / Féminisme',
    level: 'C1',
    emoji: '✊',
    bio: 'Philosopher, novelist, feminist — her ground-breaking work Le Deuxième Sexe laid the foundations for modern feminist theory.',
    works: [
      { title: 'Le Deuxième Sexe', year: 1949, summary: '"One is not born, but becomes, a woman." A philosophical examination of women\'s oppression that transformed feminism worldwide.' },
      { title: 'Les Mandarins', year: 1954, summary: 'Prix Goncourt winner — a novel about left-wing Parisian intellectuals after WWII.' },
    ],
    quote: { fr: '"On ne naît pas femme, on le devient."', en: '"One is not born a woman, one becomes one."' },
    vocab: [{ fr: 'le féminisme', en: 'feminism' }, { fr: 'l\'oppression', en: 'oppression' }, { fr: 'l\'émancipation', en: 'emancipation / liberation' }],
  },
  {
    name: 'Molière',
    born: '1622–1673',
    movement: 'Classicisme',
    level: 'B2',
    emoji: '🎭',
    bio: 'The greatest French playwright — his comedies of manners skewered hypocrisy, greed, and pretension. Died on stage during a performance of Le Malade imaginaire.',
    works: [
      { title: 'Le Tartuffe', year: 1664, summary: 'A religious hypocrite manipulates a wealthy family. Banned by the Church on its premiere — Molière\'s most controversial play.' },
      { title: 'Le Malade imaginaire', year: 1673, summary: 'Argan is convinced he is dying and obsesses over doctors and medicine — while his family tries to marry him off for money.' },
    ],
    quote: { fr: '"Il faut manger pour vivre et non pas vivre pour manger."', en: '"One should eat to live, not live to eat."' },
    vocab: [{ fr: 'l\'hypocrite', en: 'hypocrite' }, { fr: 'la comédie de mœurs', en: 'comedy of manners' }, { fr: 'le classicisme', en: 'classicism' }],
  },
]

const LEVEL_COLORS = { B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700', C1: 'bg-purple-100 text-purple-700' }

export default function FrenchLiterature() {
  const [expanded, setExpanded] = useState(null)
  const [savedAuthors, setSavedAuthors] = useState(() => {
    try { return JSON.parse(localStorage.getItem('saybonjour_lit_saved') || '[]') } catch { return [] }
  })

  const toggleSave = (name) => {
    setSavedAuthors(prev => {
      const next = prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
      localStorage.setItem('saybonjour_lit_saved', JSON.stringify(next))
      if (!prev.includes(name)) addXP(10, 'vocabulary')
      return next
    })
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Literature | SayBonjour!" description="Discover great French authors — Hugo, Proust, Camus, Flaubert, de Beauvoir, Molière — with quotes and vocabulary." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Literature</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La littérature française — great authors, works, and vocabulary</p>
        </div>

        <div className="space-y-4">
          {AUTHORS.map((author, i) => {
            const isOpen = expanded === author.name
            return (
              <motion.div key={author.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : author.name)}
                  className="w-full text-left px-6 py-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-200 dark:from-amber-900/20 dark:to-yellow-900/20 flex items-center justify-center text-3xl shrink-0">{author.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[author.level] || 'bg-gray-100 text-gray-600'}`}>{author.level}</span>
                      <span className="text-xs text-gray-400 italic">{author.movement}</span>
                    </div>
                    <h2 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{author.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{author.born}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={e => { e.stopPropagation(); toggleSave(author.name) }}
                      className={`text-xs px-2 py-1 rounded-lg transition-colors ${savedAuthors.includes(author.name) ? 'bg-burgundy-100 dark:bg-burgundy-vibrant-600/20 text-burgundy-600' : 'text-gray-300 hover:text-burgundy-400'}`}>
                      {savedAuthors.includes(author.name) ? '★ Saved' : '☆'}
                    </button>
                    {isOpen ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{author.bio}</p>

                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Major works</p>
                          <div className="space-y-2">
                            {author.works.map(w => (
                              <div key={w.title} className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm text-gray-900 dark:text-cream-50 font-playfair italic">{w.title}</span>
                                  <span className="text-xs text-gray-400">({w.year})</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{w.summary}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                          <div className="flex items-start gap-2">
                            <SpeakButton text={author.quote.fr.replace(/"/g, '')} size="sm" />
                            <div>
                              <p className="text-sm font-medium text-amber-800 dark:text-amber-300 italic">{author.quote.fr}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{author.quote.en}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Key vocabulary</p>
                          <div className="flex flex-wrap gap-2">
                            {author.vocab.map(v => (
                              <div key={v.fr} className="flex items-center gap-1.5 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-1.5">
                                <SpeakButton text={v.fr} size="sm" />
                                <span className="text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 font-medium">{v.fr}</span>
                                <span className="text-xs text-gray-400">— {v.en}</span>
                              </div>
                            ))}
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
