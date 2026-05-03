import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const SPORTS_SECTIONS = [
  {
    category: 'Popular Sports — Les sports populaires',
    items: [
      { fr: 'le football', en: 'football / soccer', note: 'France won the World Cup in 1998 and 2018' },
      { fr: 'le rugby', en: 'rugby', note: 'France is a major rugby nation — Six Nations competitor' },
      { fr: 'le tennis', en: 'tennis', note: 'Roland Garros (French Open) held annually in Paris' },
      { fr: 'le cyclisme', en: 'cycling', note: 'Le Tour de France — world\'s most famous cycle race' },
      { fr: 'le basketball', en: 'basketball', note: 'France has a strong NBA presence (Tony Parker, Rudy Gobert)' },
      { fr: 'la natation', en: 'swimming' },
      { fr: 'le judo', en: 'judo', note: 'France is a world power in judo' },
      { fr: 'l\'athlétisme', en: 'athletics / track and field' },
      { fr: 'la pétanque', en: 'pétanque (boules)', note: 'The quintessential French leisure sport' },
      { fr: 'le ski', en: 'skiing', note: 'Alps and Pyrénées have world-class ski resorts' },
      { fr: 'l\'équitation', en: 'horse riding / equestrian', note: 'France excels in equestrian sports' },
      { fr: 'la voile', en: 'sailing', note: 'Brittany and the Atlantic coast have a rich sailing culture' },
    ],
  },
  {
    category: 'Sports Vocabulary — Le vocabulaire du sport',
    items: [
      { fr: 'un match', en: 'a match / game' },
      { fr: 'un tournoi', en: 'a tournament' },
      { fr: 'une compétition', en: 'a competition' },
      { fr: 'un championnat', en: 'a championship' },
      { fr: 'une équipe', en: 'a team' },
      { fr: 'un joueur / une joueuse', en: 'a player' },
      { fr: 'un entraîneur / une entraîneuse', en: 'a coach / trainer' },
      { fr: 'un arbitre', en: 'a referee / umpire' },
      { fr: 'marquer (un but)', en: 'to score (a goal)' },
      { fr: 'gagner', en: 'to win' },
      { fr: 'perdre', en: 'to lose' },
      { fr: 'faire match nul', en: 'to draw / tie' },
      { fr: 'battre', en: 'to beat' },
      { fr: 'la victoire', en: 'victory / win' },
      { fr: 'la défaite', en: 'defeat' },
      { fr: 'le score', en: 'the score' },
      { fr: 'le stade', en: 'the stadium' },
      { fr: 'le terrain', en: 'the pitch / field / court' },
      { fr: 'la piscine', en: 'the swimming pool' },
    ],
  },
  {
    category: 'French Sports Icons — Icônes du sport français',
    items: [
      { fr: 'Zinédine Zidane', en: 'Legendary footballer — World Cup 1998 winner', note: 'Known as Zizou — arguably the greatest French player ever' },
      { fr: 'Kylian Mbappé', en: 'Current French football superstar', note: 'World Cup winner at 19 — youngest French scorer' },
      { fr: 'Marie-José Pérec', en: 'Triple Olympic gold sprinter', note: 'Won 200m, 400m & 400m at 1996 Atlanta Olympics' },
      { fr: 'Jo-Wilfried Tsonga', en: 'Tennis star, Roland Garros semifinalist', note: 'Charismatic player with Ali-like nickname' },
      { fr: 'Tony Parker', en: 'Basketball — 4× NBA champion with San Antonio', note: 'Best European NBA player of his era' },
      { fr: 'Laure Manaudou', en: 'Olympic swimming gold medallist', note: '400m freestyle Olympic champion, Athens 2004' },
      { fr: 'Bernard Hinault', en: 'Five-time Tour de France winner', note: 'Le Blaireau — last Frenchman to win the Tour (1985)' },
    ],
  },
]

const SPORTS_PHRASES = [
  { fr: 'Tu fais du sport ?', en: 'Do you play/do sport?' },
  { fr: 'Je joue au foot le week-end.', en: 'I play football at the weekend.' },
  { fr: 'On a gagné 3-0 !', en: 'We won 3-0!' },
  { fr: 'L\'équipe de France a perdu aux tirs au but.', en: 'The French team lost on penalties.' },
  { fr: 'Je regarde le Tour de France chaque été.', en: 'I watch the Tour de France every summer.' },
  { fr: 'Il y a un match ce soir à la télé.', en: 'There\'s a match on TV tonight.' },
  { fr: 'Allez les Bleus !', en: 'Come on France! (literally: Go the Blues!)' },
  { fr: 'Il est en pleine forme.', en: 'He\'s in great shape / peak form.' },
  { fr: 'Je vais à la salle de sport.', en: 'I\'m going to the gym.' },
  { fr: 'Faire du vélo', en: 'to go cycling', note: 'Distinct from "le cyclisme" (competitive racing)' },
]

export default function FrenchSports() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Sports Vocabulary | SayBonjour!" description="Learn French sports vocabulary — popular sports, match terminology, sports icons, and fan phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Sports in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le sport en France — vocabulary, icons, and phrases</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {SPORTS_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{SPORTS_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {SPORTS_SECTIONS[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                      </div>
                      {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {SPORTS_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
