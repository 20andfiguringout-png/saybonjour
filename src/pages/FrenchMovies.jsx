import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Film, ChevronDown, ChevronUp, Star } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const FILMS = [
  {
    title: 'Amélie (Le Fabuleux Destin d\'Amélie Poulain)',
    year: 2001,
    director: 'Jean-Pierre Jeunet',
    genre: 'Comédie romantique',
    level: 'B1',
    emoji: '🌸',
    summary: 'Amélie, a shy Montmartre waitress, secretly orchestrates the lives of others to bring them happiness while struggling to find her own. Visually stunning, whimsical, and uniquely French.',
    why: 'Essential French cultural touchstone. Accessible language for learners. Iconic Montmartre setting.',
    vocab: [{ fr: 'fabuleux/fabuleuse', en: 'fabulous' }, { fr: 'le destin', en: 'destiny / fate' }, { fr: 'orchestrer', en: 'to orchestrate' }],
  },
  {
    title: 'Les Intouchables',
    year: 2011,
    director: 'Olivier Nakache & Éric Toledano',
    genre: 'Comédie dramatique',
    level: 'B1',
    emoji: '🤝',
    summary: 'Philippe, a wealthy tetraplegic aristocrat, hires Driss, a young man from a housing estate, as his carer. Based on a true story. One of France\'s highest-grossing films ever.',
    why: 'Hilarious, moving, and a perfect window into French class and culture. Clear, modern French dialogue.',
    vocab: [{ fr: 'intouchable', en: 'untouchable' }, { fr: 'tétraplégique', en: 'tetraplegic' }, { fr: 'la banlieue', en: 'the suburb / housing estate' }],
  },
  {
    title: 'La Haine',
    year: 1995,
    director: 'Mathieu Kassovitz',
    genre: 'Drame',
    level: 'C1',
    emoji: '🗺️',
    summary: 'Twenty-four hours in the lives of three young men from the Parisian banlieue following a riot. Black and white. A landmark of French cinema and still profoundly relevant.',
    why: 'Raw, powerful, and essential for understanding French social issues. Warning: heavy verlan and argot.',
    vocab: [{ fr: 'la haine', en: 'hate / hatred' }, { fr: 'le banlieusard', en: 'someone from the suburbs' }, { fr: 'le verlan', en: 'French back-slang (reversed words)' }],
  },
  {
    title: 'Bienvenue chez les Ch\'tis',
    year: 2008,
    director: 'Dany Boon',
    genre: 'Comédie',
    level: 'B2',
    emoji: '🏔️',
    summary: 'A post office manager is transferred to northern France as punishment — and discovers its warm-hearted community. Features the Ch\'ti regional dialect.',
    why: 'France\'s highest-grossing domestic film ever. Great for discovering regional French accents and stereotypes.',
    vocab: [{ fr: 'le Ch\'ti', en: 'person / dialect from northern France' }, { fr: 'la mutation', en: 'a transfer / posting' }, { fr: 'le dépaysement', en: 'feeling of being in unfamiliar surroundings' }],
  },
  {
    title: 'Portrait de la Jeune Fille en Feu',
    year: 2019,
    director: 'Céline Sciamma',
    genre: 'Drame historique / Romance',
    level: 'B2',
    emoji: '🎨',
    summary: 'An artist is commissioned to paint a wedding portrait of a young Breton woman without her knowledge. Set in 18th-century Brittany. Cannes Best Screenplay winner.',
    why: 'Beautifully spoken French, stunning cinematography, rich vocabulary around art and identity.',
    vocab: [{ fr: 'le portrait', en: 'portrait' }, { fr: 'le pinceau', en: 'paintbrush' }, { fr: 'le regard', en: 'the gaze / look' }],
  },
  {
    title: 'Le Dîner de Cons',
    year: 1998,
    director: 'Francis Veber',
    genre: 'Comédie',
    level: 'B2',
    emoji: '😂',
    summary: 'A Parisian publisher who hosts cruel dinner parties where guests bring an idiot meets his match when he invites a passionate collector of matchstick models. A classic French farce.',
    why: 'Brilliant wordplay, fast dialogue, and a masterclass in French comedy writing and timing.',
    vocab: [{ fr: 'un con / une conne', en: 'an idiot (very colloquial)' }, { fr: 'un dîner', en: 'a dinner' }, { fr: 'une allumette', en: 'a matchstick' }],
  },
]

const CINEMA_VOCAB = [
  { fr: 'un film', en: 'a film / movie' },
  { fr: 'une séance', en: 'a screening / showing' },
  { fr: 'la salle (de cinéma)', en: 'cinema / screen' },
  { fr: 'la version originale (VO)', en: 'original version (with subtitles)', note: 'Always choose VO for language learning!' },
  { fr: 'la version française (VF)', en: 'dubbed French version' },
  { fr: 'les sous-titres', en: 'subtitles' },
  { fr: 'un réalisateur / une réalisatrice', en: 'a director' },
  { fr: 'un acteur / une actrice', en: 'an actor / actress' },
  { fr: 'la bande-annonce', en: 'the trailer' },
  { fr: 'le scénario', en: 'the screenplay / script' },
  { fr: 'la bande originale', en: 'the original soundtrack' },
  { fr: 'le festival de Cannes', en: 'Cannes Film Festival', note: 'The most prestigious film festival in the world — held in May' },
  { fr: 'la Palme d\'Or', en: 'top prize at Cannes', note: 'Literally "golden palm"' },
  { fr: 'les Césars', en: 'France\'s national film awards', note: 'The French equivalent of the Oscars' },
]

const LEVEL_COLORS = { A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700', C1: 'bg-purple-100 text-purple-700' }

export default function FrenchMovies() {
  const [expanded, setExpanded] = useState(null)
  const [tab, setTab] = useState('films')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Films | SayBonjour!" description="Discover essential French films with language notes, plot summaries, and vocabulary — from Amélie to La Haine." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Films</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le cinéma français — essential films for learners and culture lovers</p>
        </div>

        <div className="flex gap-3 mb-8">
          {[{ id: 'films', label: 'Essential Films' }, { id: 'vocab', label: 'Cinema Vocabulary' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'films' && (
          <div className="space-y-4">
            {FILMS.map((film, i) => {
              const isOpen = expanded === film.title
              return (
                <motion.div key={film.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                  <button onClick={() => { setExpanded(isOpen ? null : film.title); if (!isOpen) addXP(5, 'vocabulary') }}
                    className="w-full text-left px-6 py-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-700/20 dark:to-gray-700/20 flex items-center justify-center text-3xl shrink-0">{film.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[film.level]}`}>{film.level}</span>
                        <span className="text-xs text-gray-400 italic">{film.genre}</span>
                        <span className="text-xs text-gray-400">({film.year})</span>
                      </div>
                      <h2 className="font-bold text-gray-900 dark:text-cream-50 font-playfair text-sm leading-tight">{film.title}</h2>
                      <p className="text-xs text-gray-400">Dir. {film.director}</p>
                    </div>
                    {isOpen ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{film.summary}</p>
                          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-3 text-sm">
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">Why watch it for French?</p>
                            <p className="text-emerald-800 dark:text-emerald-300">{film.why}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Key vocabulary</p>
                            <div className="flex flex-wrap gap-2">
                              {film.vocab.map(v => (
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

        {tab === 'vocab' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-5">Cinema vocabulary</h2>
            <div className="space-y-3">
              {CINEMA_VOCAB.map(v => (
                <div key={v.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                  <SpeakButton text={v.fr} size="sm" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">— {v.en}</span>
                    </div>
                    {v.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {v.note}</p>}
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
