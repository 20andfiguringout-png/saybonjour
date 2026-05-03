import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, ExternalLink, ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const SONGS = [
  {
    title: 'La Vie en Rose',
    artist: 'Édith Piaf',
    year: '1947',
    level: 'B1',
    genre: 'Chanson',
    theme: 'Love',
    excerpt: {
      lyrics: 'Quand il me prend dans ses bras,\nIl me parle tout bas,\nJe vois la vie en rose.',
      translation: 'When he takes me in his arms,\nHe speaks to me softly,\nI see life through rose-coloured glasses.',
    },
    vocabulary: [
      { fr: 'bras', en: 'arms' },
      { fr: 'tout bas', en: 'very softly / in a whisper' },
      { fr: 'la vie en rose', en: 'life through rose-coloured glasses (optimistic view)' },
    ],
    grammar: 'Notice the present tense used throughout — "quand il me prend" uses the indicative, not subjunctive.',
    why: 'Édith Piaf\'s most famous song — perfect for practising pronunciation of nasal vowels (en, an).',
    youtube: 'https://www.youtube.com/results?search_query=La+Vie+en+Rose+Edith+Piaf',
    difficulty: 'Medium',
  },
  {
    title: 'Ne Me Quitte Pas',
    artist: 'Jacques Brel',
    year: '1959',
    level: 'B2',
    genre: 'Chanson',
    theme: 'Heartbreak',
    excerpt: {
      lyrics: 'Ne me quitte pas\nIl faut oublier\nTout peut s\'oublier\nQui s\'enfuit déjà.',
      translation: 'Don\'t leave me\nWe must forget\nEverything can be forgotten\nThat is already fleeing.',
    },
    vocabulary: [
      { fr: 'quitter', en: 'to leave / to quit' },
      { fr: 'oublier', en: 'to forget' },
      { fr: 's\'enfuir', en: 'to flee / to run away' },
    ],
    grammar: 'The imperative "ne me quitte pas" — negative imperative places the pronoun between ne and the verb.',
    why: 'Widely considered one of the greatest French songs ever — rich vocabulary and emotional intensity.',
    youtube: 'https://www.youtube.com/results?search_query=Ne+Me+Quitte+Pas+Jacques+Brel',
    difficulty: 'Hard',
  },
  {
    title: 'Alors on Danse',
    artist: 'Stromae',
    year: '2009',
    level: 'B1',
    genre: 'Électro',
    theme: 'Modern life',
    excerpt: {
      lyrics: 'Qui dit étude dit travail\nDit weekend, dit qu\'on s\'en fout\nDit grande école, dit promo\nDit chômage et insomnie.',
      translation: 'Who says study says work\nSays weekend, says we don\'t care\nSays elite school, says promotion\nSays unemployment and insomnia.',
    },
    vocabulary: [
      { fr: 'chômage', en: 'unemployment' },
      { fr: 's\'en foutre', en: 'to not care (informal)' },
      { fr: 'insomnie', en: 'insomnia' },
    ],
    grammar: 'Heavy use of indirect speech: "qui dit X, dit Y" — a rhetorical pattern meaning "what comes with X comes with Y".',
    why: 'A Belgian electro-pop hit — catchy rhythm makes repetitive vocabulary stick naturally.',
    youtube: 'https://www.youtube.com/results?search_query=Stromae+Alors+on+Danse',
    difficulty: 'Medium',
  },
  {
    title: 'Les Champs-Élysées',
    artist: 'Joe Dassin',
    year: '1969',
    level: 'A2',
    genre: 'Pop',
    theme: 'Paris',
    excerpt: {
      lyrics: 'Je m\'baladais sur l\'avenue\nLe cœur ouvert à l\'inconnu\nJ\'avais envie de dire bonjour\nÀ n\'importe qui.',
      translation: 'I was strolling down the avenue\nWith my heart open to the unknown\nI wanted to say hello\nTo anyone.',
    },
    vocabulary: [
      { fr: 'se balader', en: 'to stroll / to wander' },
      { fr: 'inconnu(e)', en: 'unknown / stranger' },
      { fr: 'avoir envie de', en: 'to feel like / to want to' },
    ],
    grammar: 'The imparfait tense throughout: "je m\'baladais", "j\'avais" — typical for setting a scene.',
    why: 'One of the easiest classic French songs — great for A2 learners to hear natural conversational French.',
    youtube: 'https://www.youtube.com/results?search_query=Les+Champs+Elysees+Joe+Dassin',
    difficulty: 'Easy',
  },
  {
    title: 'Papaoutai',
    artist: 'Stromae',
    year: '2013',
    level: 'B1',
    genre: 'Pop / Électro',
    theme: 'Family',
    excerpt: {
      lyrics: 'Dis-moi où t\'es\nDis-moi où t\'es, papa\nOù t\'es, papa\nOù t\'es ?',
      translation: 'Tell me where you are\nTell me where you are, dad\nWhere are you, dad\nWhere are you?',
    },
    vocabulary: [
      { fr: 'papa', en: 'dad / father' },
      { fr: 'dis-moi', en: 'tell me (imperative of dire)' },
      { fr: 'où', en: 'where' },
    ],
    grammar: 'The title "Papaoutai" is a contraction of "papa, où t\'es ?" — great example of informal spoken French contracting "tu es" → "t\'es".',
    why: 'Moving song about absent fathers — demonstrates how French contracts and elides words in speech.',
    youtube: 'https://www.youtube.com/results?search_query=Stromae+Papaoutai',
    difficulty: 'Medium',
  },
  {
    title: 'L\'Hymne à l\'amour',
    artist: 'Édith Piaf',
    year: '1950',
    level: 'B2',
    genre: 'Chanson',
    theme: 'Love',
    excerpt: {
      lyrics: 'Le ciel bleu sur nous peut s\'effondrer\nEt la terre peut bien s\'écrouler\nPeu m\'importe si tu m\'aimes.',
      translation: 'The blue sky above us may collapse\nAnd the earth may well crumble\nI don\'t care as long as you love me.',
    },
    vocabulary: [
      { fr: 's\'effondrer', en: 'to collapse / to fall apart' },
      { fr: 's\'écrouler', en: 'to crumble / to fall down' },
      { fr: 'peu m\'importe', en: 'it matters little to me / I don\'t care' },
    ],
    grammar: '"Peu m\'importe" is a fixed expression meaning "I don\'t care". Note "peut" = conditional (can) not "peut" from pouvoir present.',
    why: 'Rich conditional and hypothetical structures — ideal for B2 students exploring complex sentence patterns.',
    youtube: 'https://www.youtube.com/results?search_query=Hymne+a+l+amour+Piaf',
    difficulty: 'Hard',
  },
]

const LEVELS = ['All', 'A2', 'B1', 'B2']
const GENRES = ['All', ...Array.from(new Set(SONGS.map(s => s.genre.split(' / ')[0])))]
const DIFFICULTY = ['All', 'Easy', 'Medium', 'Hard']
const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700' }

export default function FrenchSongs() {
  const [level, setLevel] = useState('All')
  const [diff, setDiff] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = SONGS.filter(s =>
    (level === 'All' || s.level === level) &&
    (diff === 'All' || s.difficulty === diff)
  )

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Songs for Learning | SayBonjour!" description="Learn French through iconic songs — lyrics, translations, vocabulary and grammar notes." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Songs</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Chansons françaises — learn through music</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${level === l ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {l}
            </button>
          ))}
          {DIFFICULTY.map(d => (
            <button key={d} onClick={() => setDiff(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${diff === d ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {d}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((song, i) => {
            const isOpen = expanded === song.title
            return (
              <motion.div key={song.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : song.title)}
                  className="w-full text-left px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-burgundy-500 to-burgundy-700 flex items-center justify-center shrink-0">
                    <Music size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-gray-900 dark:text-cream-50 truncate">{song.title}</h2>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[song.level]}`}>{song.level}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${song.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : song.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{song.difficulty}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{song.artist} · {song.year} · {song.genre}</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                </button>

                {isOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Excerpt — French</p>
                        <p className="text-sm text-gray-800 dark:text-cream-50 whitespace-pre-line font-medium italic">{song.excerpt.lyrics}</p>
                      </div>
                      <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Translation</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{song.excerpt.translation}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key vocabulary</p>
                      <div className="flex flex-wrap gap-2">
                        {song.vocabulary.map(v => (
                          <div key={v.fr} className="bg-burgundy-50 dark:bg-burgundy-vibrant-600/10 border border-burgundy-100 dark:border-burgundy-vibrant-600/20 rounded-lg px-3 py-1.5 text-sm">
                            <span className="font-medium text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</span>
                            <span className="text-gray-400 mx-1">—</span>
                            <span className="text-gray-600 dark:text-gray-400">{v.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">Grammar point</p>
                      <p className="text-amber-800 dark:text-amber-300">{song.grammar}</p>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-3 text-sm">
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">Why study this song?</p>
                      <p className="text-emerald-800 dark:text-emerald-300">{song.why}</p>
                    </div>

                    <a href={song.youtube} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors">
                      <ExternalLink size={14} /> Listen on YouTube
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
