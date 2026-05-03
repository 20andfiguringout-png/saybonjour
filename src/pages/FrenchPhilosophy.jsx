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
    bio: 'Father of modern philosophy. Doubted everything until he found the one thing he couldn\'t doubt: that he was doing the doubting. Created the mind-body problem and analytic geometry.',
    quote: { fr: 'Je pense, donc je suis.', en: 'I think, therefore I am.' },
    concepts: [
      { fr: 'le rationalisme', en: 'rationalism — knowledge comes from reason, not senses' },
      { fr: 'le doute méthodique', en: 'methodical doubt — doubt everything to find certainty' },
      { fr: 'le dualisme', en: 'dualism — mind and body are separate substances' },
    ],
    why: 'His famous "Cogito ergo sum" is one of the most quoted phrases in all philosophy. Also invented the Cartesian coordinate system.',
  },
  {
    name: 'Jean-Paul Sartre',
    born: '1905–1980',
    era: 'Existentialisme',
    emoji: '🗽',
    bio: 'Café philosopher and novelist — famously declined the Nobel Prize for Literature in 1964. Central figure of 20th-century existentialism. Partner of Simone de Beauvoir.',
    quote: { fr: 'L\'existence précède l\'essence.', en: 'Existence precedes essence.' },
    concepts: [
      { fr: 'l\'existentialisme', en: 'existentialism — humans create their own meaning' },
      { fr: 'la liberté radicale', en: 'radical freedom — we are "condemned to be free"' },
      { fr: 'la mauvaise foi', en: 'bad faith — self-deception about our freedom' },
    ],
    why: '"L\'enfer, c\'est les autres" (Hell is other people) is one of the most quoted French phrases worldwide.',
  },
  {
    name: 'Michel Foucault',
    born: '1926–1984',
    era: 'Post-structuralisme',
    emoji: '🔍',
    bio: 'Historian of ideas who analysed how power operates through institutions — prisons, hospitals, schools. His work on surveillance and "the panopticon" anticipates modern digital surveillance.',
    quote: { fr: 'Le pouvoir est partout.', en: 'Power is everywhere.' },
    concepts: [
      { fr: 'le pouvoir-savoir', en: 'power-knowledge — knowledge and power are inseparable' },
      { fr: 'la biopolitique', en: 'biopolitics — state control over bodies and populations' },
      { fr: 'le panoptique', en: 'the panopticon — surveillance structure that disciplines through visibility' },
    ],
    why: 'Essential for understanding modern debates about data privacy, surveillance, prison reform, and medical power.',
  },
  {
    name: 'Simone Weil',
    born: '1909–1943',
    era: 'Philosophie mystique / Engagement social',
    emoji: '✨',
    bio: 'Philosopher, mystic, and social activist. Worked in factories to understand workers\' conditions. Died at 34 — her short life produced an extraordinary body of thought on suffering and justice.',
    quote: { fr: 'L\'attention est la forme la plus rare et la plus pure de la générosité.', en: 'Attention is the rarest and purest form of generosity.' },
    concepts: [
      { fr: 'l\'attention', en: 'attention — her concept of fully attending to another person\'s reality' },
      { fr: 'le malheur', en: 'affliction — a specific kind of suffering that destroys the soul' },
      { fr: 'la décréation', en: 'decreation — self-effacement to make way for the divine' },
    ],
    why: 'Her concept of "attention" as a moral act has influenced education theory and mindfulness philosophy.',
  },
  {
    name: 'Voltaire',
    born: '1694–1778',
    era: 'Les Lumières (Enlightenment)',
    emoji: '⚡',
    bio: 'The ultimate Enlightenment wit — writer, satirist, and philosopher. Championed tolerance, freedom of speech, and the separation of church and state. Imprisoned in the Bastille twice.',
    quote: { fr: 'Le mieux est l\'ennemi du bien.', en: 'The perfect is the enemy of the good.' },
    concepts: [
      { fr: 'les Lumières', en: 'the Enlightenment — reason over superstition' },
      { fr: 'la tolérance', en: 'tolerance — his great political virtue' },
      { fr: 'l\'ironie', en: 'irony — his primary weapon of criticism' },
    ],
    why: '"Candide" (1759) is one of the most widely read French works — funny, dark, and philosophically rich.',
  },
  {
    name: 'Jacques Derrida',
    born: '1930–2004',
    era: 'Déconstruction / Post-structuralisme',
    emoji: '📝',
    bio: 'Algerian-born French philosopher who invented deconstruction — a method of reading texts to expose their internal contradictions. Hugely controversial and hugely influential.',
    quote: { fr: 'Il n\'y a pas de hors-texte.', en: 'There is nothing outside the text.' },
    concepts: [
      { fr: 'la déconstruction', en: 'deconstruction — exposing contradictions within texts and arguments' },
      { fr: 'la différance', en: 'différance (his neologism) — meaning is always deferred, never final' },
      { fr: 'le logocentrisme', en: 'logocentrism — the Western bias toward speech over writing' },
    ],
    why: 'Derrida\'s methods transformed literary theory, legal studies, and architecture. His work is essential for B2+ French cultural literacy.',
  },
]

const PHILOSOPHY_VOCAB = [
  { fr: 'la philosophie', en: 'philosophy' },
  { fr: 'un philosophe', en: 'a philosopher' },
  { fr: 'la raison', en: 'reason' },
  { fr: 'la vérité', en: 'truth' },
  { fr: 'la conscience', en: 'consciousness / conscience' },
  { fr: 'l\'être', en: 'being / existence' },
  { fr: 'le néant', en: 'nothingness' },
  { fr: 'la liberté', en: 'freedom / liberty' },
  { fr: 'la justice', en: 'justice' },
  { fr: 'l\'éthique', en: 'ethics' },
  { fr: 'la morale', en: 'morality / morals' },
  { fr: 'un argument', en: 'an argument' },
  { fr: 'une thèse', en: 'a thesis' },
  { fr: 'une antithèse', en: 'an antithesis' },
  { fr: 'une synthèse', en: 'a synthesis' },
]

export default function FrenchPhilosophy() {
  const [expanded, setExpanded] = useState(null)
  const [tab, setTab] = useState('philosophers')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Philosophy | SayBonjour!" description="Explore great French philosophers — Descartes, Sartre, Foucault, Voltaire — with quotes and concepts in French." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Philosophy</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La philosophie française — great thinkers, quotes, and concepts</p>
        </div>

        <div className="flex gap-3 mb-8">
          {[{ id: 'philosophers', label: 'Philosophers' }, { id: 'vocab', label: 'Philosophy Vocab' }].map(t => (
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
                <motion.div key={p.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
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
                          <p className="text-sm text-gray-600 dark:text-gray-400">{p.bio}</p>

                          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                            <div className="flex items-start gap-2">
                              <SpeakButton text={p.quote.fr} size="sm" />
                              <div>
                                <p className="text-sm font-medium italic text-amber-800 dark:text-amber-300">"{p.quote.fr}"</p>
                                <p className="text-xs text-gray-400">"{p.quote.en}"</p>
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
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">Why it matters today</p>
                            <p className="text-emerald-800 dark:text-emerald-300">{p.why}</p>
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
                <div key={v.fr} className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                  <SpeakButton text={v.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{v.en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
