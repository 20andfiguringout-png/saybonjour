import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const PHILOSOPHERS = [
  {
    name: 'René Descartes',
    born: '1596–1650',
    era: 'Rationalisme',
    emoji: '🧠',
    bio: 'Father of modern philosophy and of analytic geometry. Spent much of his life in the Netherlands. His method: doubt everything until you find what cannot be doubted. He found only one certainty — that he was doing the doubting. From this he built an entire metaphysical system.',
    quote: { fr: 'Je pense, donc je suis.', en: 'I think, therefore I am. (Cogito ergo sum)' },
    concepts: [
      { fr: 'le rationalisme', en: 'rationalism — true knowledge comes from reason, not from the senses' },
      { fr: 'le doute méthodique', en: 'methodical doubt — doubt everything systematically to find certainty' },
      { fr: 'le dualisme', en: 'mind-body dualism — the mind (res cogitans) and body (res extensa) are separate substances' },
    ],
    why: 'The Cogito is the single most famous philosophical statement in history. He also invented the Cartesian coordinate system — unifying philosophy and mathematics. The French educational tradition ("la dissertation") is deeply Cartesian: thesis, antithesis, synthesis.',
  },
  {
    name: 'Jean-Paul Sartre',
    born: '1905–1980',
    era: 'Existentialisme',
    emoji: '🗽',
    bio: 'The intellectual celebrity of 20th-century France — wrote philosophy, novels, plays, and political essays from the cafés of Saint-Germain-des-Prés. Famously declined the Nobel Prize for Literature in 1964 ("A writer must refuse to allow himself to be transformed into an institution"). Lifelong partner of Simone de Beauvoir.',
    quote: { fr: 'L\'existence précède l\'essence.', en: 'Existence precedes essence — we define ourselves through our choices.' },
    concepts: [
      { fr: 'l\'existentialisme', en: 'existentialism — humans create their own meaning; there is no pre-given purpose' },
      { fr: 'la liberté radicale', en: 'radical freedom — we are "condemned to be free" (condamnés à être libres)' },
      { fr: 'la mauvaise foi', en: 'bad faith — self-deception about our freedom; pretending we have no choice' },
    ],
    why: '"L\'enfer, c\'est les autres" (Hell is other people) from Huis Clos is one of the most quoted French phrases worldwide. His debates with Camus about violence and revolution split the French left. His café philosophy made philosophy accessible to everyone.',
  },
  {
    name: 'Michel Foucault',
    born: '1926–1984',
    era: 'Post-structuralisme',
    emoji: '🔍',
    bio: 'Historian of ideas who analysed how power operates through institutions — prisons, hospitals, schools, asylums. Studied at the École Normale Supérieure. His work on surveillance — the Panopticon — anticipates digital-age debates about data, privacy, and social media. Died of AIDS, one of the first major public figures to do so.',
    quote: { fr: 'Le savoir, c\'est le pouvoir.', en: 'Knowledge is power. (More precisely: power and knowledge are inseparable.)' },
    concepts: [
      { fr: 'le pouvoir-savoir', en: 'power-knowledge — knowledge and power are intertwined; who controls knowledge controls people' },
      { fr: 'la biopolitique', en: 'biopolitics — state control over bodies, populations, and life itself' },
      { fr: 'le panoptique', en: 'the panopticon — Bentham\'s prison design that disciplines through the possibility of constant observation' },
    ],
    why: 'Essential for understanding modern debates about digital surveillance, social media algorithms, healthcare systems, prison reform, and psychiatric power. His ideas explain why we self-censor online.',
  },
  {
    name: 'Simone Weil',
    born: '1909–1943',
    era: 'Philosophie mystique / Engagement social',
    emoji: '✨',
    bio: 'Philosopher, mystic, and social activist who lived her ideas with radical consistency. Worked in a Renault factory to understand workers\' conditions. Fought (briefly) in the Spanish Civil War. Died at 34, having refused to eat more than the rations allocated to occupied France. Simone de Beauvoir called her "the only great mind" of their generation.',
    quote: { fr: 'L\'attention est la forme la plus rare et la plus pure de la générosité.', en: 'Attention is the rarest and purest form of generosity.' },
    concepts: [
      { fr: 'l\'attention', en: 'attention as a moral act — fully attending to another person\'s reality, suspending one\'s own ego' },
      { fr: 'le malheur', en: 'affliction — a specific kind of suffering that attacks the soul as well as the body' },
      { fr: 'la décréation', en: 'decreation — voluntary self-effacement, emptying the self to allow the divine to act' },
    ],
    why: 'Her concept of "attention" has influenced education theory, ethics, and contemplative practice globally. Camus called her "the only great spirit of our time". Her concept of affliction (malheur) anticipated modern trauma theory.',
  },
  {
    name: 'Voltaire',
    born: '1694–1778',
    era: 'Les Lumières (Enlightenment)',
    emoji: '⚡',
    bio: 'Born François-Marie Arouet, the ultimate Enlightenment wit — playwright, satirist, poet, historian, and philosopher. Imprisoned in the Bastille twice. Exiled to England (1726–1729) where he discovered Newton and Locke. His irony and satire dismantled religious superstition and absolute monarchy, intellectually preparing the French Revolution.',
    quote: { fr: 'Le mieux est l\'ennemi du bien.', en: 'The perfect is the enemy of the good.' },
    concepts: [
      { fr: 'les Lumières', en: 'the Enlightenment — reason, tolerance, and progress over tradition and superstition' },
      { fr: 'la tolérance', en: 'tolerance — his great political and religious virtue, argued in the Traité sur la tolérance (1763)' },
      { fr: 'l\'ironie voltairienne', en: 'Voltairean irony — devastating wit as a weapon against power and pretension' },
    ],
    why: 'Candide (1759) is the most widely read work of French Enlightenment thought — brilliantly funny, dark, and philosophically rich. His "Écrasez l\'infâme!" (Crush the infamous thing — i.e. religious fanaticism) became a battle cry. His defence of civil liberties resonates with every generation.',
  },
  {
    name: 'Jacques Derrida',
    born: '1930–2004',
    era: 'Déconstruction / Post-structuralisme',
    emoji: '📝',
    bio: 'Born in Algeria, moved to France at 19. Studied at the École Normale Supérieure. Invented deconstruction — a reading method that exposes internal contradictions in texts, institutions, and concepts. Hugely controversial (Cambridge academics protested his honorary degree). His ideas transformed literary theory, legal studies, and architecture.',
    quote: { fr: 'Il n\'y a pas de hors-texte.', en: 'There is nothing outside the text — meaning is produced within language, not by a separate reality.' },
    concepts: [
      { fr: 'la déconstruction', en: 'deconstruction — showing that texts undermine their own stated meanings' },
      { fr: 'la différance', en: 'différance (his neologism, différence + différer) — meaning is always deferred; no final presence or origin' },
      { fr: 'le logocentrisme', en: 'logocentrism — the Western philosophical bias that privileges speech (logos) over writing' },
    ],
    why: 'Derrida\'s methods transformed disciplines from literature to law to architecture. Understanding deconstruction helps navigate postmodern thought, media criticism, and identity politics debates.',
  },
  {
    name: 'Jean-Jacques Rousseau',
    born: '1712–1778',
    era: 'Les Lumières / Romantisme',
    emoji: '🌿',
    bio: 'Born in Geneva, Rousseau is the philosopher who most directly inspired the French Revolution. His theory of the "general will" (la volonté générale) underpinned democratic theory. His Confessions was the first modern autobiography. He famously fell out with Voltaire and Hume. He died the same day as Voltaire — the two giants of the French Enlightenment departed together in 1778.',
    quote: { fr: 'L\'homme est né libre, et partout il est dans les fers.', en: 'Man is born free, and everywhere he is in chains.' },
    concepts: [
      { fr: 'le contrat social', en: 'the social contract — legitimate political authority rests on agreement of the governed' },
      { fr: 'la volonté générale', en: 'the general will — the collective interest that transcends individual desires' },
      { fr: 'le bon sauvage', en: 'the noble savage — humans are naturally good; civilization corrupts them' },
    ],
    why: 'The most politically influential French philosopher — his ideas directly inspired the Declaration of the Rights of Man (1789) and the concept of popular sovereignty. Modern democracy is built on Rousseau\'s foundations.',
  },
]

const PHILOSOPHY_VOCAB = [
  { fr: 'la philosophie', en: 'philosophy', note: '"Faire de la philo" = to study philosophy (school subject in France)' },
  { fr: 'un philosophe / une philosophe', en: 'a philosopher' },
  { fr: 'la raison', en: 'reason / rationality' },
  { fr: 'la vérité', en: 'truth', note: '"La vérité nue" = the naked truth; "la vérité relative" = relative truth' },
  { fr: 'la conscience', en: 'consciousness / conscience / awareness', note: 'One word covers consciousness, conscience, and awareness in French' },
  { fr: 'l\'être', en: 'being / existence', note: '"L\'être et le néant" = Being and Nothingness (Sartre\'s major work)' },
  { fr: 'le néant', en: 'nothingness / the void' },
  { fr: 'la liberté', en: 'freedom / liberty', note: '"La liberté guidant le peuple" = Liberty Leading the People (Delacroix)' },
  { fr: 'la justice', en: 'justice' },
  { fr: 'l\'éthique', en: 'ethics / moral philosophy' },
  { fr: 'la morale', en: 'morality / morals', note: '"Faire la morale à quelqu\'un" = to lecture someone about morality' },
  { fr: 'la métaphysique', en: 'metaphysics' },
  { fr: 'une thèse', en: 'a thesis / an argument', note: 'The French essay structure: thèse → antithèse → synthèse' },
  { fr: 'une antithèse', en: 'an antithesis / counterargument' },
  { fr: 'une synthèse', en: 'a synthesis / conclusion' },
  { fr: 'le paradoxe', en: 'a paradox', note: '"Un paradoxe apparent" = an apparent paradox' },
  { fr: 'l\'existence', en: 'existence' },
  { fr: 'l\'essence', en: 'essence / nature of a thing' },
  { fr: 'le pouvoir', en: 'power / authority', note: 'Foucault\'s key concept: "le pouvoir est partout"' },
  { fr: 'la dialectique', en: 'dialectics — the interplay of opposing ideas', note: 'Thesis → Antithesis → Synthesis (Hegel → Marx → French philosophy)' },
]

const DISCOURSE_CONNECTORS = [
  { fr: 'D\'une part… d\'autre part…', en: 'On one hand… on the other hand…', note: 'Standard French essay structure connector' },
  { fr: 'En effet', en: 'Indeed / In fact (develops a point)', note: 'Much stronger than "in effect" in English — used to develop and justify' },
  { fr: 'Or', en: 'Now / However / But (logical pivot)', note: 'A key essay connector — introduces a complication or pivot in the argument' },
  { fr: 'Ainsi', en: 'Thus / In this way', note: 'Introduces a logical consequence' },
  { fr: 'En revanche', en: 'On the other hand / By contrast', note: 'Preferred over "au contraire" in formal writing' },
  { fr: 'C\'est pourquoi', en: 'That is why / Which is why' },
  { fr: 'À cet égard', en: 'In this regard / In this respect' },
  { fr: 'Il convient de noter que', en: 'It should be noted that', note: 'Formal academic register' },
  { fr: 'Dans la mesure où', en: 'Insofar as / To the extent that', note: 'Introduces a qualified statement — very French academic' },
  { fr: 'Force est de constater que', en: 'One cannot help but note that / It must be acknowledged that', note: 'Strong formal phrase — used to introduce an uncomfortable truth' },
]

export default function FrenchPhilosophy() {
  const [expanded, setExpanded] = useState(null)
  const [tab, setTab] = useState('philosophers')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Philosophy | SayBonjour!" description="Explore great French philosophers — Descartes, Sartre, Foucault, Voltaire, Rousseau — with quotes, concepts, and philosophy vocabulary." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Philosophy</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La philosophie française — great thinkers, quotes, vocabulary, and essay connectors</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 mb-6 text-sm text-blue-800 dark:text-blue-300">
          Philosophy ("la philo") is compulsory in the French Baccalauréat — every French student writes a 4-hour philosophy essay at age 17. This makes philosophical vocabulary and argumentation structure fundamental to French intellectual culture.
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {[
            { id: 'philosophers', label: 'Philosophers' },
            { id: 'vocab', label: 'Philosophy Vocab' },
            { id: 'connectors', label: 'Essay Connectors' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'philosophers' && (
          <div className="space-y-4">
            {PHILOSOPHERS.map((p, i) => {
              const isOpen = expanded === p.name
              return (
                <motion.div key={p.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                  <button onClick={() => { setExpanded(isOpen ? null : p.name); if (!isOpen) addXP(5, 'vocabulary') }}
                    className="w-full text-left px-6 py-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-700/20 dark:to-gray-700/20 flex items-center justify-center text-3xl shrink-0">{p.emoji}</div>
                    <div className="flex-1">
                      <h2 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{p.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{p.born} · <span className="italic">{p.era}</span></p>
                    </div>
                    {isOpen ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.bio}</p>

                          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                            <div className="flex items-start gap-2">
                              <SpeakButton text={p.quote.fr} size="sm" />
                              <div>
                                <p className="text-sm font-medium italic text-amber-800 dark:text-amber-300">"{p.quote.fr}"</p>
                                <p className="text-xs text-gray-400 mt-0.5">{p.quote.en}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Key concepts</p>
                            <div className="space-y-2">
                              {p.concepts.map(c => (
                                <div key={c.fr} className="flex items-start gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-2">
                                  <SpeakButton text={c.fr} size="sm" />
                                  <div>
                                    <span className="text-sm font-medium text-burgundy-700 dark:text-burgundy-vibrant-300">{c.fr}</span>
                                    <span className="text-xs text-gray-400 ml-2">— {c.en}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-3 text-sm">
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Why it matters today</p>
                            <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">{p.why}</p>
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

        {tab === 'vocab' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-5">Philosophy vocabulary</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {PHILOSOPHY_VOCAB.map(v => (
                <div key={v.fr} className="flex items-start gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={v.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{v.en}</p>
                    {v.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">{v.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'connectors' && (
          <div className="space-y-3">
            <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-700 rounded-xl px-4 py-3 mb-2 text-sm text-purple-800 dark:text-purple-300">
              French academic essays follow a strict structure: thèse → antithèse → synthèse. These connectors are essential for any French academic writing — and for the Baccalauréat philosophy exam.
            </div>
            {DISCOURSE_CONNECTORS.map((c, i) => (
              <motion.div key={c.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(3, 'vocabulary')}>
                <SpeakButton text={c.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">"{c.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{c.en}</p>
                  {c.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {c.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
