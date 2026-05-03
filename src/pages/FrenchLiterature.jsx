import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
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
    bio: 'The towering figure of French literature — poet, playwright, novelist, and political activist. Exiled for 19 years under Napoléon III, he continued writing prolifically from Guernsey. He returned to a hero\'s welcome in 1870 and died as France\'s most revered literary figure.',
    works: [
      { title: 'Les Misérables', year: 1862, summary: 'Jean Valjean, an ex-convict, is relentlessly pursued by Inspector Javert across post-revolutionary France. A sweeping study of justice, compassion, poverty, and redemption — one of the bestselling novels in history.' },
      { title: 'Notre-Dame de Paris', year: 1831, summary: 'Quasimodo and his love for Esmeralda, set in medieval Paris. Hugo wrote it partly to raise awareness of Gothic architecture being demolished — the book sparked a nationwide conservation movement.' },
      { title: 'Les Contemplations', year: 1856, summary: 'Hugo\'s greatest poetry collection — a meditation on love, loss, and the death of his daughter Léopoldine. Considered the pinnacle of French Romantic poetry.' },
    ],
    quote: { fr: '"Aimer, c\'est agir."', en: '"To love is to act."' },
    vocab: [{ fr: 'le bagne', en: 'penal colony / prison hulk' }, { fr: 'la rédemption', en: 'redemption' }, { fr: 'le misérable', en: 'the wretch / pauper' }, { fr: 'la barricade', en: 'the barricade' }],
  },
  {
    name: 'Marcel Proust',
    born: '1871–1922',
    movement: 'Modernisme',
    level: 'C1',
    emoji: '🫖',
    bio: 'Author of the longest novel in the French language (À la recherche du temps perdu — 7 volumes, ~4,000 pages). Famously reclusive, cork-lining his bedroom to reduce noise. His "madeleine" — the involuntary memory triggered by a tea-dunked biscuit — is perhaps the most famous literary anecdote in history.',
    works: [
      { title: 'À la recherche du temps perdu', year: '1913–1927', summary: 'Seven volumes exploring memory, time, love, jealousy, and society in Belle Époque France. Often called the greatest novel ever written — and almost certainly the longest. Begin with "Du côté de chez Swann" (Swann\'s Way).' },
    ],
    quote: { fr: '"Le véritable voyage de découverte ne consiste pas à chercher de nouveaux paysages, mais à avoir de nouveaux yeux."', en: '"The real voyage of discovery consists not in seeking new landscapes, but in having new eyes."' },
    vocab: [{ fr: 'la mémoire involontaire', en: 'involuntary memory' }, { fr: 'le temps perdu', en: 'lost time' }, { fr: 'la madeleine', en: 'madeleine cake (triggering memory)' }, { fr: 'la jalousie', en: 'jealousy' }],
  },
  {
    name: 'Gustave Flaubert',
    born: '1821–1880',
    movement: 'Réalisme',
    level: 'B2',
    emoji: '💊',
    bio: 'Pioneer of Realism and obsessive stylist — he agonised over every word, spending days finding "le mot juste" (the right word). Tried for obscenity after publishing Madame Bovary (acquitted). He rewrote sentences hundreds of times and would read them aloud to test their rhythm — a practice he called "le gueuloir" (the bawling room).',
    works: [
      { title: 'Madame Bovary', year: 1857, summary: 'Emma Bovary, a doctor\'s wife in provincial Normandy, seeks escape from crushing boredom through romantic affairs and luxury purchases — with devastating financial and personal consequences. Still relevant in the age of Instagram.' },
      { title: 'L\'Éducation sentimentale', year: 1869, summary: 'Frédéric Moreau\'s years in Paris — unrequited love, political revolution, and gradual disillusionment. Many critics consider this more profound than Madame Bovary.' },
    ],
    quote: { fr: '"La gloire est le soleil des morts."', en: '"Fame is the sun of the dead."' },
    vocab: [{ fr: 'le bovarysme', en: 'bovarism — romantic self-delusion about one\'s destiny' }, { fr: 'le mot juste', en: 'the exact right word' }, { fr: 'la désillusion', en: 'disillusionment' }],
  },
  {
    name: 'Albert Camus',
    born: '1913–1960',
    movement: 'Existentialisme / Absurdisme',
    level: 'B2',
    emoji: '☀️',
    bio: 'Born in Algeria to a working-class family, died in a car accident at 46 — Nobel Prize winner (1957). His philosophy of the absurd holds that life is meaningless but that we must revolt against this meaninglessness with joy. Camus and Sartre broke famously — their philosophical disagreement split the Parisian left-wing intelligentsia.',
    works: [
      { title: 'L\'Étranger', year: 1942, summary: 'Meursault kills an Arab on an Algerian beach and seems strangely indifferent to everything — even his own trial for murder. A masterpiece of alienation written in a deliberately flat, affectless style.' },
      { title: 'La Peste', year: 1947, summary: 'An allegorical novel about plague in Oran, Algeria — universally read as a metaphor for the Nazi occupation. Dr. Rieux\'s stoic resistance against evil resonated globally.' },
      { title: 'Le Mythe de Sisyphe', year: 1942, summary: 'Camus\'s philosophical essay on the absurd — "One must imagine Sisyphus happy." The philosophical companion to L\'Étranger.' },
    ],
    quote: { fr: '"Il faut imaginer Sisyphe heureux."', en: '"One must imagine Sisyphus happy."' },
    vocab: [{ fr: 'l\'absurde', en: 'the absurd' }, { fr: 'l\'aliénation', en: 'alienation' }, { fr: 'la révolte', en: 'revolt / rebellion' }, { fr: 'l\'indifférence', en: 'indifference' }],
  },
  {
    name: 'Simone de Beauvoir',
    born: '1908–1986',
    movement: 'Existentialisme / Féminisme',
    level: 'C1',
    emoji: '✊',
    bio: 'Philosopher, novelist, and feminist — her life-long relationship with Sartre was as influential as her writing. Le Deuxième Sexe (1949) laid the intellectual foundations of second-wave feminism globally. She refused all state honours and the Nobel Prize rumours, but accepted the Prix Goncourt for Les Mandarins.',
    works: [
      { title: 'Le Deuxième Sexe', year: 1949, summary: '"On ne naît pas femme, on le devient." A philosophical examination of women\'s oppression through history, literature, mythology, and psychoanalysis. Transformed feminism worldwide — banned by the Vatican.' },
      { title: 'Les Mandarins', year: 1954, summary: 'Prix Goncourt winner — a novel about left-wing Parisian intellectuals navigating the post-WWII world. Based on her own circle of friends (Sartre, Camus, Nelson Algren).' },
    ],
    quote: { fr: '"On ne naît pas femme, on le devient."', en: '"One is not born, but rather becomes, a woman."' },
    vocab: [{ fr: 'le féminisme', en: 'feminism' }, { fr: 'l\'oppression', en: 'oppression' }, { fr: 'l\'émancipation', en: 'emancipation' }, { fr: 'le deuxième sexe', en: 'the second sex' }],
  },
  {
    name: 'Molière',
    born: '1622–1673',
    movement: 'Classicisme',
    level: 'B2',
    emoji: '🎭',
    bio: 'Born Jean-Baptiste Poquelin, the greatest French playwright — his comedies skewered hypocrisy, greed, and pretension with surgical wit. Died on stage during a performance of Le Malade imaginaire (he had tuberculosis). His plays are still performed more than those of any other French playwright.',
    works: [
      { title: 'Le Tartuffe', year: 1664, summary: 'A religious hypocrite manipulates a wealthy family. Banned by the Church on its premiere — Louis XIV personally protected Molière and overruled the ban after five years.' },
      { title: 'Le Misanthrope', year: 1666, summary: 'Alceste cannot tolerate the hypocrisy of Parisian society. Often considered Molière\'s most personal and complex work.' },
      { title: 'Le Malade imaginaire', year: 1673, summary: 'Argan is convinced he is dying and obsesses over doctors — a savage satire of the medical profession. Molière died days after performing this role.' },
    ],
    quote: { fr: '"Il faut manger pour vivre et non pas vivre pour manger."', en: '"One should eat to live, not live to eat."' },
    vocab: [{ fr: 'l\'hypocrite', en: 'hypocrite' }, { fr: 'la comédie de mœurs', en: 'comedy of manners' }, { fr: 'le classicisme', en: 'classicism' }, { fr: 'le misanthrope', en: 'the misanthrope' }],
  },
  {
    name: 'Honoré de Balzac',
    born: '1799–1850',
    movement: 'Réalisme',
    level: 'B2',
    emoji: '☕',
    bio: 'Obsessive coffee drinker (reportedly 50 cups a day), prodigious writer — La Comédie humaine contains over 90 novels and stories. Balzac invented the concept of recurring characters across novels, creating the world\'s first literary universe. Worked from midnight to noon every day, dictating at furious speed.',
    works: [
      { title: 'Le Père Goriot', year: 1835, summary: 'Eugène de Rastignac arrives in Paris seeking fortune. The novel introduces themes of ambition and moral compromise — "Paris or nothing." Goriot sacrifices everything for daughters who abandon him.' },
      { title: 'Illusions perdues', year: '1837–1843', summary: 'Lucien de Rubempré arrives in Paris to become a writer and is destroyed by the corrupt media and literary world. A devastating portrait of artistic ambition and media corruption — achingly relevant today.' },
    ],
    quote: { fr: '"Derrière chaque grande fortune, il y a un crime."', en: '"Behind every great fortune, there is a crime."' },
    vocab: [{ fr: 'la comédie humaine', en: 'the human comedy (Balzac\'s collective title)' }, { fr: 'l\'ambition', en: 'ambition' }, { fr: 'la société bourgeoise', en: 'bourgeois society' }],
  },
  {
    name: 'Émile Zola',
    born: '1840–1902',
    movement: 'Naturalisme',
    level: 'B2',
    emoji: '⚒️',
    bio: 'The founding figure of Naturalism — fiction grounded in social science, heredity, and environment. His open letter "J\'accuse…!" (1898) defending Alfred Dreyfus (a Jewish officer falsely convicted of treason) is one of the most famous acts of political courage in literary history. Exiled to England for a year as a result.',
    works: [
      { title: 'Germinal', year: 1885, summary: 'A mining community in northern France rises in a desperate strike. One of the greatest novels about working-class suffering and solidarity — its final image of seeds germinating underground gave rise to the word "germinal" as a symbol of uprising.' },
      { title: 'L\'Assommoir', year: 1877, summary: 'Gervaise Macquart\'s story of poverty, alcoholism, and moral degradation in the Parisian working class. Deeply controversial on publication — and a masterpiece of social realism.' },
    ],
    quote: { fr: '"La vérité est en marche et rien ne l\'arrêtera."', en: '"Truth is on the march and nothing will stop it."' },
    vocab: [{ fr: 'le naturalisme', en: 'naturalism (literary movement)' }, { fr: 'la grève', en: 'the strike' }, { fr: 'le prolétariat', en: 'the proletariat' }, { fr: 'J\'accuse', en: 'I accuse (Zola\'s letter)' }],
  },
  {
    name: 'Charles Baudelaire',
    born: '1821–1867',
    movement: 'Symbolisme / Décadentisme',
    level: 'C1',
    emoji: '🥀',
    bio: 'The poet of urban modernity — his Les Fleurs du mal (Flowers of Evil) was tried for obscenity in 1857. He coined the concept of "le spleen de Paris" — a profound urban ennui. Baudelaire invented the prose poem and was the first to translate Poe into French. He died penniless at 46, partially paralysed by syphilis.',
    works: [
      { title: 'Les Fleurs du mal', year: 1857, summary: '126 poems exploring beauty, decadence, eroticism, and the search for the divine in a corrupt world. Six poems were removed by court order. Now considered the most influential French poetry collection ever written.' },
      { title: 'Le Spleen de Paris', year: 1869, summary: 'Prose poems capturing the beauty and horror of modern Parisian life — the prototype of the modern prose poem form.' },
    ],
    quote: { fr: '"Il faut être toujours ivre. Tout est là : c\'est l\'unique question. Pour ne pas sentir l\'horrible fardeau du Temps."', en: '"One must always be drunk. That\'s all there is — the one and only question."' },
    vocab: [{ fr: 'le spleen', en: 'deep melancholy / ennui (borrowed from English)' }, { fr: 'le dandysme', en: 'dandyism' }, { fr: 'la fleur du mal', en: 'the flower of evil' }, { fr: 'la décadence', en: 'decadence' }],
  },
]

const MOVEMENTS = [
  { name: 'Classicisme', period: '17th century', key: 'Corneille, Racine, Molière, La Fontaine', desc: 'Strict rules of form and unity (unité de temps, de lieu, d\'action). Drama must be morally instructive. The Académie française was founded in 1635 to regulate French language and literature.' },
  { name: 'Les Lumières (Enlightenment)', period: '18th century', key: 'Voltaire, Rousseau, Diderot', desc: 'Reason over superstition. Voltaire\'s satirical wit, Rousseau\'s "noble savage", and Diderot\'s Encyclopédie challenged the Church and absolute monarchy — intellectually preparing the French Revolution.' },
  { name: 'Romantisme', period: '1800–1850', key: 'Victor Hugo, Lamartine, Stendhal', desc: 'Emotion over reason. The individual versus society. Nature, passion, the supernatural. Hugo\'s preface to Cromwell (1827) launched French Romanticism by attacking classical unities.' },
  { name: 'Réalisme / Naturalisme', period: '1850–1890', key: 'Balzac, Flaubert, Zola, Maupassant', desc: 'Objective, detailed observation of society. Zola\'s Naturalism added the lens of heredity and environment. Maupassant perfected the short story ("la nouvelle"). Facts over fantasy.' },
  { name: 'Symbolisme', period: '1870–1900', key: 'Baudelaire, Verlaine, Rimbaud, Mallarmé', desc: 'Poetry must suggest, not describe. Symbols, sound, and musicality create meaning. Rimbaud invented free verse at 17 and abandoned poetry at 21. Verlaine wrote "De la musique avant toute chose." (Music above all else.)' },
  { name: 'Existentialisme', period: '1940s–1960s', key: 'Sartre, Camus, de Beauvoir', desc: 'Humans create their own meaning in an indifferent universe. The café-philosophers of Saint-Germain-des-Prés became global intellectual celebrities. Sartre refused the Nobel Prize; Camus accepted his.' },
  { name: 'Nouveau Roman', period: '1950s–1970s', key: 'Robbe-Grillet, Sarraute, Duras', desc: 'Rejection of traditional plot and character. Narrative experimentation, fragmentation, and subjectivity. Marguerite Duras (L\'Amant) bridged Nouveau Roman and mainstream success.' },
]

const LEVEL_COLORS = { B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700', C1: 'bg-purple-100 text-purple-700' }

export default function FrenchLiterature() {
  const [expanded, setExpanded] = useState(null)
  const [tab, setTab] = useState('authors')
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
      <SEO title="French Literature | SayBonjour!" description="Discover great French authors — Hugo, Proust, Camus, Flaubert, Zola, Baudelaire — with literary movements, quotes, and vocabulary." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Literature</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La littérature française — great authors, movements, and vocabulary</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'authors', label: 'Great Authors' }, { id: 'movements', label: 'Literary Movements' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'authors' && (
          <div className="space-y-4">
            {AUTHORS.map((author, i) => {
              const isOpen = expanded === author.name
              return (
                <motion.div key={author.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                  <button onClick={() => { setExpanded(isOpen ? null : author.name); if (!isOpen) addXP(5, 'vocabulary') }}
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
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{author.bio}</p>

                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Major works</p>
                            <div className="space-y-2">
                              {author.works.map(w => (
                                <div key={w.title} className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm text-gray-900 dark:text-cream-50 font-playfair italic">{w.title}</span>
                                    <span className="text-xs text-gray-400">({w.year})</span>
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{w.summary}</p>
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
        )}

        {tab === 'movements' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 mb-2 text-sm text-blue-800 dark:text-blue-300">
              French literature has produced more Nobel Prize winners than any other country (16 as of 2024). Each literary movement reflected the intellectual and political climate of its time.
            </div>
            {MOVEMENTS.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(4, 'vocabulary')}>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <SpeakButton text={m.name} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair text-lg">{m.name}</h3>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-mono">{m.period}</span>
                </div>
                <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic mb-2">Key writers: {m.key}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
