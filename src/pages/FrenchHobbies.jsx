import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const HOBBIES = [
  { fr: 'lire', en: 'reading', example: 'J\'aime lire des romans policiers.', icon: '📚', note: '"Lire" = to read (irregular: je lis, tu lis, il lit, nous lisons)' },
  { fr: 'écouter de la musique', en: 'listening to music', example: 'J\'écoute de la musique le matin pour commencer la journée.', icon: '🎵' },
  { fr: 'regarder des films / des séries', en: 'watching films / TV series', example: 'Je regarde des séries françaises pour améliorer mon français.', icon: '🎬', note: '"Une série" = a TV series. "Regarder en VO" = watching in original language.' },
  { fr: 'faire du sport', en: 'playing sport / exercising', example: 'Je fais du sport trois fois par semaine pour me garder en forme.', icon: '⚽' },
  { fr: 'cuisiner', en: 'cooking', example: 'J\'adore cuisiner des plats du monde entier.', icon: '🍳', note: '"La cuisine" = cooking (as an activity) AND the kitchen.' },
  { fr: 'voyager', en: 'travelling', example: 'Voyager m\'ouvre l\'esprit et enrichit ma vie.', icon: '✈️', note: '"Partir en voyage" = to go on a trip' },
  { fr: 'jouer de la guitare / du piano', en: 'playing guitar / piano', example: 'Je joue de la guitare depuis dix ans.', icon: '🎸', note: '"Jouer de" = for instruments. "Jouer à" = for sports and games.' },
  { fr: 'peindre / faire de la peinture', en: 'painting', example: 'Je peins des aquarelles le dimanche matin.', icon: '🎨' },
  { fr: 'jardiner / faire du jardinage', en: 'gardening', example: 'Ma mère adore jardiner — elle a un potager magnifique.', icon: '🌱', note: '"Un potager" = a vegetable garden' },
  { fr: 'faire de la randonnée', en: 'hiking / rambling', example: 'On fait de la randonnée en montagne chaque été.', icon: '🥾', note: '"La randonnée pédestre" = walking/hiking. "La rando" = informal shortening.' },
  { fr: 'jouer aux jeux vidéo', en: 'playing video games', example: 'Il joue aux jeux vidéo le soir avec ses amis en ligne.', icon: '🎮', note: '"Les e-sports" = esports. "Un gamer" or "un joueur" = a gamer.' },
  { fr: 'faire de la photographie', en: 'photography', example: 'Elle fait de la photographie professionnelle depuis cinq ans.', icon: '📷', note: '"Un photographe" = a photographer' },
  { fr: 'nager / faire de la natation', en: 'swimming', example: 'Je nage deux fois par semaine à la piscine municipale.', icon: '🏊', note: '"La piscine" = swimming pool. "La piscine municipale" = public pool.' },
  { fr: 'faire du vélo / du cyclisme', en: 'cycling', example: 'Je fais du vélo pour aller au travail — c\'est écologique.', icon: '🚴', note: 'France\'s Tour de France makes cycling a national passion.' },
  { fr: 'tricoter / faire du tricot', en: 'knitting', example: 'Elle tricote des pulls pour toute la famille.', icon: '🧶' },
  { fr: 'la danse / danser', en: 'dancing', example: 'Je fais de la danse contemporaine depuis trois ans.', icon: '💃', note: '"La danse classique" = ballet; "la danse contemporaine" = modern dance; "la salsa" = salsa.' },
  { fr: 'le yoga / faire du yoga', en: 'yoga', example: 'Je fais du yoga le matin — ça m\'aide à me concentrer.', icon: '🧘', note: '"La méditation" = meditation; "le bien-être" = wellbeing.' },
  { fr: 'la pêche / aller à la pêche', en: 'fishing', example: 'Mon grand-père va à la pêche chaque dimanche.', icon: '🎣', note: 'Very popular in France — 1.5 million fishing licences sold annually.' },
  { fr: 'faire de la course à pied / courir', en: 'running', example: 'Je cours cinq kilomètres trois fois par semaine.', icon: '🏃', note: '"Un semi-marathon" = half-marathon; "le Paris-Dakar" = a famous French race.' },
  { fr: 'le dessin / dessiner', en: 'drawing', example: 'Il dessine des bandes dessinées depuis l\'enfance.', icon: '✏️', note: '"La bande dessinée (BD)" = comics/graphic novels — a huge art form in France and Belgium.' },
  { fr: 'la peinture à l\'huile', en: 'oil painting', example: 'Elle fait de la peinture à l\'huile dans son atelier.', icon: '🖌️', note: '"Un atelier" = an artist\'s studio' },
  { fr: 'le théâtre / faire du théâtre', en: 'theatre / acting', example: 'Je fais du théâtre amateur le week-end.', icon: '🎭', note: '"Un spectacle" = a show/performance; "les répétitions" = rehearsals.' },
]

const TALKING_HOBBIES = [
  { fr: 'Qu\'est-ce que tu fais pendant ton temps libre ?', en: 'What do you do in your free time?' },
  { fr: 'Tu as des hobbies / des loisirs ?', en: 'Do you have any hobbies?' },
  { fr: 'Je suis passionné(e) de…', en: 'I\'m passionate about…', note: '"Je suis passionné(e) de musique / de cuisine / de randonnée"' },
  { fr: 'Je pratique… depuis… ans.', en: 'I\'ve been doing… for… years.', note: 'Note: French uses present tense for ongoing activities: "je pratique depuis 5 ans"' },
  { fr: 'C\'est ma grande passion.', en: 'It\'s my great passion.' },
  { fr: 'Je suis membre d\'un club de…', en: 'I\'m a member of a… club.' },
  { fr: 'Je fais ça pour me détendre / décompresser.', en: 'I do it to relax / unwind.', note: '"Décompresser" = to unwind (lit. to decompress)' },
  { fr: 'C\'est très relaxant / apaisant.', en: 'It\'s very relaxing / calming.', note: '"Apaisant" is slightly richer than "relaxant" — suggests inner calm' },
  { fr: 'Je m\'y suis mis(e) il y a deux ans.', en: 'I took it up two years ago.' },
  { fr: 'J\'y passe des heures !', en: 'I spend hours on it!' },
  { fr: 'Je ne suis pas très doué(e) mais j\'adore ça.', en: 'I\'m not very talented at it but I love it.' },
  { fr: 'C\'est un bon moyen de se changer les idées.', en: 'It\'s a good way to clear your head.', note: '"Se changer les idées" = to get your mind off things / take a break from routine' },
  { fr: 'Ça m\'aide à me ressourcer.', en: 'It helps me recharge / replenish.', note: '"Se ressourcer" = to recharge, to go back to one\'s roots — a beautiful French word' },
]

const SPORTS_VERBS = [
  {
    verb: 'jouer à / au / à la / aux',
    use: 'Competitive sports and games (with a winner/loser or opponent)',
    examples: [
      { fr: 'jouer au football', en: 'to play football' },
      { fr: 'jouer au tennis', en: 'to play tennis' },
      { fr: 'jouer aux échecs', en: 'to play chess' },
      { fr: 'jouer au basket-ball', en: 'to play basketball' },
    ],
    rule: '"Jouer à" + definite article (au = à + le, aux = à + les). Use for competitive sports with opponents.',
  },
  {
    verb: 'faire de / du / de la / des',
    use: 'Physical activities, individual sports, and non-competitive pursuits',
    examples: [
      { fr: 'faire du vélo', en: 'to cycle' },
      { fr: 'faire de la natation', en: 'to swim (as a sport)' },
      { fr: 'faire du yoga', en: 'to do yoga' },
      { fr: 'faire de la randonnée', en: 'to hike' },
    ],
    rule: '"Faire de" + partitive article (du = de + le, de la, des). Use for activities, individual sports, hobbies.',
  },
  {
    verb: 'jouer de / du / de la / des',
    use: 'Musical instruments (playing an instrument)',
    examples: [
      { fr: 'jouer du piano', en: 'to play the piano' },
      { fr: 'jouer de la guitare', en: 'to play the guitar' },
      { fr: 'jouer du violon', en: 'to play the violin' },
      { fr: 'jouer de la flûte', en: 'to play the flute' },
    ],
    rule: '"Jouer de" is ONLY for musical instruments. Never "jouer à" for instruments.',
  },
]

const FRENCH_HOBBY_CULTURE = [
  { emoji: '🚴', title: 'Le Tour de France', detail: 'Cycling is one of France\'s great sporting passions — the Tour de France (21 stages, 3 weeks, July) is the world\'s most watched annual sporting event after the Olympics. French cycling legends: Bernard Hinault, Laurent Fignon. July transforms France into a nation of road-side spectators.' },
  { emoji: '⛳', title: 'Les Pétanques', detail: '"La pétanque" (or "les boules") is quintessentially French — played on any flat surface, usually in the shade of plane trees. Originated in Provence. The objective: throw metal balls as close as possible to the cochonnet (small target ball). A profoundly social and relaxed activity.' },
  { emoji: '📚', title: 'La BD (Bande Dessinée)', detail: 'French-language comics ("la BD") are a serious art form — not just for children. Tintin (Belgian but published in French), Astérix, and contemporary BDs are read by all ages. The Angoulême Festival is the world\'s second-largest comic book festival after San Diego.' },
  { emoji: '🎮', title: 'France\'s Gaming Industry', detail: 'France is home to Ubisoft (Assassin\'s Creed, Far Cry, Watch Dogs), one of the world\'s biggest games companies. The French gaming industry (le jeu vidéo) is among Europe\'s largest — and gaming is now France\'s largest cultural sector by revenue, ahead of music and film.' },
]

export default function FrenchHobbies() {
  const [tab, setTab] = useState('hobbies')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Hobbies & Leisure | SayBonjour!" description="Talk about hobbies in French — 22 leisure activities, conversation phrases, jouer à vs faire de grammar, and French leisure culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Hobbies & Leisure in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les loisirs — 22 activities, conversation phrases, grammar, and French leisure culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'hobbies', label: 'Hobbies' },
            { id: 'talking', label: 'Conversation Phrases' },
            { id: 'grammar', label: 'Jouer à / Faire de' },
            { id: 'culture', label: 'French Leisure Culture' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'hobbies' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {HOBBIES.map((hobby, i) => (
              <motion.div key={hobby.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addXP(3, 'vocabulary')}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl shrink-0">{hobby.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <SpeakButton text={hobby.fr} size="sm" />
                      <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{hobby.fr}</p>
                    </div>
                    <p className="text-xs text-gray-400">{hobby.en}</p>
                  </div>
                </div>
                {hobby.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mb-1.5">💡 {hobby.note}</p>}
                <div className="flex items-center gap-1.5 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-2 py-1.5">
                  <SpeakButton text={hobby.example} size="sm" />
                  <p className="text-xs italic text-gray-500 dark:text-gray-400">"{hobby.example}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'talking' && (
          <div className="space-y-3">
            {TALKING_HOBBIES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'grammar' && (
          <div className="space-y-5">
            {SPORTS_VERBS.map((item, i) => (
              <motion.div key={item.verb} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
                <div className="flex items-center gap-3 mb-1">
                  <SpeakButton text={item.verb} size="sm" />
                  <code className="font-bold text-lg text-burgundy-700 dark:text-burgundy-vibrant-300">{item.verb}</code>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Used for: <strong>{item.use}</strong></p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {item.examples.map(ex => (
                    <div key={ex.fr} className="flex items-center gap-1.5 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-2"
                      onClick={() => addXP(2, 'grammar')}>
                      <SpeakButton text={ex.fr} size="sm" />
                      <div>
                        <p className="text-xs font-medium text-gray-800 dark:text-cream-50 italic">{ex.fr}</p>
                        <p className="text-xs text-gray-400">{ex.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
                  💡 {item.rule}
                </div>
              </motion.div>
            ))}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-4">
              <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">Quick summary</p>
              <div className="space-y-1 text-sm">
                <p className="text-blue-800 dark:text-blue-300"><strong>jouer à</strong> = competitive sport/game (football, tennis, chess)</p>
                <p className="text-blue-800 dark:text-blue-300"><strong>jouer de</strong> = musical instrument (piano, guitare, violon)</p>
                <p className="text-blue-800 dark:text-blue-300"><strong>faire de</strong> = individual activity or sport (vélo, yoga, natation, randonnée)</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {FRENCH_HOBBY_CULTURE.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
