import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, ExternalLink, Music, Mic2, BookOpen, Globe } from 'lucide-react'
import SEO from '../components/SEO'

const STATIONS = [
  {
    name: 'France Inter',
    genre: 'Talk / News / Culture',
    level: 'B2–C1',
    description: 'France\'s premier public radio station — news, culture, debate, and comedy. Rich standard French.',
    url: 'https://www.radiofrance.fr/franceinter/direct',
    why: 'Excellent articulation, journalistic French, diverse topics. Great for B2+ learners.',
    icon: '📻',
    tags: ['News', 'Culture', 'Podcasts'],
  },
  {
    name: 'France Info',
    genre: 'News / Current affairs',
    level: 'B2–C2',
    description: 'Rolling 24-hour news station. Fast-paced, dense vocabulary, current affairs.',
    url: 'https://www.radiofrance.fr/franceinfo/direct',
    why: 'Essential for advanced learners — authentic news French at natural speed.',
    icon: '📰',
    tags: ['News', 'Live'],
  },
  {
    name: 'France Culture',
    genre: 'Arts / Philosophy / History',
    level: 'C1–C2',
    description: 'Intellectual radio covering arts, science, philosophy, and history. Rich vocabulary.',
    url: 'https://www.radiofrance.fr/franceculture/direct',
    why: 'Challenging but rewarding — great for learning academic and literary French registers.',
    icon: '🎭',
    tags: ['Culture', 'Podcasts', 'Academic'],
  },
  {
    name: 'Chérie FM',
    genre: 'Pop music',
    level: 'A2–B1',
    description: 'Popular music station with French and international pop hits. Light, fun listening.',
    url: 'https://www.cheriefm.fr/direct',
    why: 'Great for beginners — music has predictable vocabulary and you can follow lyrics.',
    icon: '🎵',
    tags: ['Music', 'Pop'],
  },
  {
    name: 'RTL',
    genre: 'Entertainment / News',
    level: 'B1–B2',
    description: 'Popular commercial radio with news, celebrity interviews, entertainment and music.',
    url: 'https://www.rtl.fr/direct',
    why: 'More casual register than France Inter — good middle ground for intermediate learners.',
    icon: '🎙️',
    tags: ['Entertainment', 'News'],
  },
  {
    name: 'Radio Nova',
    genre: 'Music / Culture',
    level: 'B1–B2',
    description: 'Alternative and world music station with cultural programming. Relaxed tone.',
    url: 'https://www.nova.fr/radiolive/',
    why: 'Diverse music and laid-back presenters — good exposure to informal French.',
    icon: '🌍',
    tags: ['Music', 'Alternative'],
  },
  {
    name: 'BFM TV Radio',
    genre: 'Breaking news',
    level: 'B2–C1',
    description: 'The French equivalent of rolling news TV/radio — fast headlines and live reports.',
    url: 'https://www.bfmtv.com/en-direct/',
    why: 'Authentic journalistic French at native speed — pushes listening comprehension.',
    icon: '⚡',
    tags: ['News', 'Live'],
  },
  {
    name: 'France Musique',
    genre: 'Classical music',
    level: 'All levels',
    description: 'Classical and contemporary music with cultured but accessible French commentary.',
    url: 'https://www.radiofrance.fr/francemusique/direct',
    why: 'Music is universal — listen for announcements and presenter commentary.',
    icon: '🎼',
    tags: ['Classical', 'Music'],
  },
]

const PODCASTS = [
  {
    name: 'Français Authentique',
    host: 'Johan Tekfak',
    level: 'B1–C1',
    description: 'A hugely popular podcast for French learners — real, natural French at varying speeds.',
    url: 'https://www.francaisauthentique.com',
    episodes: '300+',
    icon: '🎓',
  },
  {
    name: 'Coffee Break French',
    host: 'Radio Lingua',
    level: 'A1–B2',
    description: 'Scottish-produced podcast teaching French in bite-sized episodes with clear explanations.',
    url: 'https://coffeebreakfrench.com',
    episodes: '200+',
    icon: '☕',
  },
  {
    name: 'InnerFrench',
    host: 'Hugo Cotton',
    level: 'B1–C1',
    description: 'Immersive content in French only — culture, society, and language topics spoken clearly.',
    url: 'https://innerfrench.com',
    episodes: '100+',
    icon: '🇫🇷',
  },
  {
    name: 'Le Monde Audio',
    host: 'Le Monde',
    level: 'C1–C2',
    description: 'Journalism from France\'s newspaper of record, read aloud — perfect for advanced learners.',
    url: 'https://www.lemonde.fr/podcasts/',
    episodes: 'Daily',
    icon: '📄',
  },
]

const LEVEL_COLORS = { 'A2–B1': 'bg-blue-100 text-blue-700', 'B1–B2': 'bg-yellow-100 text-yellow-700', 'B2–C1': 'bg-orange-100 text-orange-700', 'C1–C2': 'bg-purple-100 text-purple-700', 'B1–C1': 'bg-yellow-100 text-yellow-700', 'A1–B2': 'bg-blue-100 text-blue-700', 'All levels': 'bg-gray-100 text-gray-700' }

export default function FrenchRadio() {
  const [tab, setTab] = useState('radio')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Radio & Podcasts | SayBonjour!" description="Discover the best French radio stations and podcasts for language learners at every level." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Radio & Podcasts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Écouter pour apprendre — tune in and learn</p>
        </div>

        <div className="flex gap-3 justify-center mb-8">
          {[{ id: 'radio', label: 'Radio Stations', icon: Radio }, { id: 'podcasts', label: 'Podcasts', icon: Mic2 }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'radio' && (
          <div className="space-y-4">
            {STATIONS.map((station, i) => (
              <motion.div key={station.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-burgundy-100 to-burgundy-200 dark:from-burgundy-vibrant-600/20 dark:to-burgundy-vibrant-600/10 flex items-center justify-center text-3xl shrink-0">
                  {station.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="font-bold text-gray-900 dark:text-cream-50">{station.name}</h2>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[station.level] || 'bg-gray-100 text-gray-700'}`}>{station.level}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{station.genre}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{station.description}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-3">💡 {station.why}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {station.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-gray-50 dark:bg-dark-warm-200 border border-gray-200 dark:border-dark-warm-50 rounded-full text-gray-500 dark:text-gray-400">{tag}</span>
                    ))}
                    <a href={station.url} target="_blank" rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-burgundy-600 text-white rounded-lg text-xs font-medium hover:bg-burgundy-700 transition-colors">
                      <ExternalLink size={12} /> Listen live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'podcasts' && (
          <div className="space-y-4">
            {PODCASTS.map((pod, i) => (
              <motion.div key={pod.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-900/10 flex items-center justify-center text-3xl shrink-0">
                  {pod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h2 className="font-bold text-gray-900 dark:text-cream-50">{pod.name}</h2>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[pod.level] || 'bg-gray-100 text-gray-700'}`}>{pod.level}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">by {pod.host} · {pod.episodes} episodes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{pod.description}</p>
                  <a href={pod.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600 transition-colors">
                    <ExternalLink size={12} /> Visit website
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
