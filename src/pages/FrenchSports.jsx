import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Flag } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SPORTS_SECTIONS = [
  {
    category: 'Popular Sports',
    fr: 'Les sports populaires',
    items: [
      { fr: 'le football', en: 'football / soccer', note: 'France won the World Cup in 1998 (at home) and 2018 (in Russia). "Les Bleus" is the national team nickname.' },
      { fr: 'le rugby', en: 'rugby union', note: 'France is a Six Nations competitor and 2023 Rugby World Cup host. Pro clubs: Stade Toulousain, Racing 92, ASM Clermont.' },
      { fr: 'le tennis', en: 'tennis', note: 'Roland Garros (the French Open) is held every May/June in Paris — one of the four Grand Slams.' },
      { fr: 'le cyclisme', en: 'cycling', note: 'Le Tour de France (July, 3 weeks, 21 stages) is the world\'s most watched annual sporting event.' },
      { fr: 'le basketball', en: 'basketball', note: 'France has produced Tony Parker, Rudy Gobert, Evan Fournier, Victor Wembanyama — a world power in basketball.' },
      { fr: 'la natation', en: 'swimming', note: 'Laure Manaudou, Florent Manaudou, and Léon Marchand are iconic French swimmers.' },
      { fr: 'le judo', en: 'judo', note: 'France is consistently the world\'s top judo nation — Teddy Riner has 10 world titles and 3 Olympic golds.' },
      { fr: 'l\'athlétisme', en: 'athletics / track and field', note: 'Marie-José Pérec won 3 Olympic golds at Atlanta 1996 in sprinting.' },
      { fr: 'la pétanque', en: 'pétanque (boules)', note: 'The quintessential French leisure sport — played on any flat surface, especially in Provence. FPJP oversees 40+ million players worldwide.' },
      { fr: 'le ski', en: 'skiing', note: 'The French Alps (Chamonix, Val d\'Isère, Courchevel) are world-class ski destinations. France has hosted 3 Winter Olympics.' },
      { fr: 'l\'équitation', en: 'horse riding / equestrian', note: 'France excels in dressage, show jumping, and eventing — consistently strong Olympic performers.' },
      { fr: 'la voile', en: 'sailing', note: 'The Vendée Globe (solo round-the-world race) starts and ends in Les Sables-d\'Olonne — a uniquely French maritime epic.' },
      { fr: 'le handball', en: 'handball', note: '"Les Experts" — the French men\'s handball team — dominated world handball, winning 6 World Championships.' },
      { fr: 'le boxe', en: 'boxing', note: 'France has a proud boxing tradition — Brahim Asloum, Souleymane Cissokho, Oumar Nikiema are notable champions.' },
    ],
  },
  {
    category: 'Match Vocabulary',
    fr: 'Le vocabulaire du match',
    items: [
      { fr: 'un match', en: 'a match / game' },
      { fr: 'un tournoi', en: 'a tournament' },
      { fr: 'une compétition', en: 'a competition' },
      { fr: 'un championnat', en: 'a championship', note: '"La Ligue 1" is the top French football division; "Le Top 14" for rugby' },
      { fr: 'une équipe', en: 'a team', note: '"Faire équipe" = to team up with' },
      { fr: 'un joueur / une joueuse', en: 'a player' },
      { fr: 'un entraîneur / une entraîneuse', en: 'a coach / trainer' },
      { fr: 'un arbitre', en: 'a referee / umpire', note: '"Siffler" = to blow the whistle; "un coup de sifflet" = a whistle blow' },
      { fr: 'un gardien (de but)', en: 'a goalkeeper', note: 'Football-specific — "le goal" is also used informally' },
      { fr: 'marquer (un but)', en: 'to score (a goal)', note: '"Marquer un essai" = to score a try (rugby)' },
      { fr: 'gagner', en: 'to win', note: '"Gagner le match" vs "gagner la coupe" — both use gagner' },
      { fr: 'perdre', en: 'to lose' },
      { fr: 'faire match nul', en: 'to draw / tie', note: '"Un match nul" = a draw; "à égalité" = level' },
      { fr: 'battre', en: 'to beat', note: '"France a battu l\'Angleterre 2-0"' },
      { fr: 'la victoire', en: 'victory / win' },
      { fr: 'la défaite', en: 'defeat / loss' },
      { fr: 'le score / le résultat', en: 'the score / result' },
      { fr: 'un penalty / un penalti', en: 'a penalty', note: '"Tirer au but" = to take a penalty; "les tirs au but" = penalty shootout' },
      { fr: 'le stade', en: 'the stadium', note: 'Stade de France (Saint-Denis, Paris) — national stadium, capacity 80,698' },
      { fr: 'le terrain', en: 'the pitch / field / court' },
      { fr: 'mi-temps', en: 'half-time', note: '"La première / deuxième mi-temps" = first / second half' },
    ],
  },
  {
    category: 'Sport Verbs & Phrases',
    fr: 'Les verbes et expressions',
    items: [
      { fr: 'jouer à + sport', en: 'to play (team/ball sport)', note: '"Jouer au football, au tennis, au basket" — with "à" for ball/team sports' },
      { fr: 'faire de + sport', en: 'to do / practise (individual sport)', note: '"Faire du judo, du ski, de la natation" — with "de" for individual sports' },
      { fr: 'pratiquer un sport', en: 'to practise a sport (neutral)', note: '"Vous pratiquez quel sport ?" — the safest question form' },
      { fr: 's\'entraîner', en: 'to train / practise', note: '"S\'entraîner deux fois par semaine" = to train twice a week' },
      { fr: 'se qualifier (pour)', en: 'to qualify (for)' },
      { fr: 'être en forme', en: 'to be in shape / fit', note: '"En pleine forme" = in peak condition' },
      { fr: 'un supporter / une supportrice', en: 'a (sports) fan / supporter', note: 'Not "supporteur" — both spellings are used but "supporter" is more common' },
      { fr: 'Allez les Bleus !', en: 'Come on France! (football)', note: '"Les Bleus" is the nickname for the French national football team' },
      { fr: 'aller à la salle de sport', en: 'to go to the gym', note: '"La salle de muscu(lation)" = the weights room' },
    ],
  },
  {
    category: 'French Sports Icons',
    fr: 'Les icônes du sport français',
    items: [
      { fr: 'Zinédine Zidane', en: 'Legendary footballer — World Cup 1998, Ballon d\'Or 1998', note: '"Zizou" — arguably the greatest French player. Born in Marseille to Algerian parents — his career symbolises French diversity.' },
      { fr: 'Kylian Mbappé', en: 'World Cup winner 2018 at age 19 — youngest French scorer in World Cup history', note: 'The most valuable footballer in the world as of 2024. From Bondy, Seine-Saint-Denis.' },
      { fr: 'Marie-José Pérec', en: 'Triple Olympic gold medallist — 200m, 400m (Atlanta 1996)', note: 'From Guadeloupe — considered the greatest French sprinter of all time.' },
      { fr: 'Teddy Riner', en: 'Judo — 10× World Champion, 3× Olympic gold (2012, 2021, 2024)', note: 'The most decorated judoka in history. An icon of French sport.' },
      { fr: 'Tony Parker', en: 'Basketball — 4× NBA champion, Finals MVP 2007', note: 'The greatest European basketball player of his era. Led France to EuroBasket glory and inspired a generation.' },
      { fr: 'Léon Marchand', en: 'Swimming — 4× Olympic gold at Paris 2024, world record holder', note: 'The star of the Paris 2024 Olympics — a phenomenon who broke Michael Phelps\' long-standing records.' },
      { fr: 'Bernard Hinault', en: 'Cycling — 5× Tour de France winner (1978–85)', note: '"Le Blaireau" (The Badger) — the last Frenchman to win the Tour de France. A legend of the Breton cycling tradition.' },
    ],
  },
]

const SPORTS_PHRASES = [
  { fr: 'Tu fais du sport ?', en: 'Do you do sport?' },
  { fr: 'Je joue au foot le week-end.', en: 'I play football at the weekend.' },
  { fr: 'On a gagné 3-0 !', en: 'We won 3-0!' },
  { fr: 'L\'équipe de France a perdu aux tirs au but.', en: 'The French team lost on penalties.' },
  { fr: 'Je regarde le Tour de France chaque été.', en: 'I watch the Tour de France every summer.' },
  { fr: 'Il y a un match ce soir à la télé.', en: 'There\'s a match on TV tonight.' },
  { fr: 'Allez les Bleus !', en: 'Come on France! (Lit. "Go the Blues!")' },
  { fr: 'Il est en pleine forme.', en: 'He\'s in peak shape / great form.' },
  { fr: 'Je vais à la salle de sport trois fois par semaine.', en: 'I go to the gym three times a week.' },
  { fr: 'On s\'entraîne tous les matins.', en: 'We train every morning.' },
  { fr: 'C\'est une vraie championne.', en: 'She\'s a true champion.' },
  { fr: 'Il a marqué à la dernière minute !', en: 'He scored in the last minute!' },
  { fr: 'La France est qualifiée pour les demi-finales.', en: 'France has qualified for the semi-finals.' },
]

const SPORTS_CULTURE = [
  { emoji: '🚴', title: 'Le Tour de France', detail: 'Held every July, the Tour is France\'s sporting crown jewel. 21 stages over 3 weeks, ~3,500km. Started in 1903 by a newspaper (L\'Auto) to boost sales. No Frenchman has won since Bernard Hinault in 1985 — a national obsession.' },
  { emoji: '⚽', title: 'Les Bleus — La Coupe du Monde 1998', detail: 'France\'s 1998 World Cup win on home soil remains the defining sporting moment of modern France. Zidane\'s two headers in the final (3-0 vs Brazil) are etched in national memory. "Black, Blanc, Beur" — the diverse team was celebrated as a symbol of multicultural France.' },
  { emoji: '🎾', title: 'Roland Garros', detail: 'The French Open is the world\'s premier clay court Grand Slam, held at Roland Garros stadium in Paris (Bois de Boulogne) since 1928. Named after a WWI aviator. Spain\'s Nadal dominated it (14 titles), but France has produced Yannick Noah (1983), the last French winner.' },
  { emoji: '🏉', title: 'Le Rugby — Le XV de France', detail: 'France hosted the 2023 Rugby World Cup (final: New Zealand beat France in a thriller in Paris). French rugby is known for its flair and expansive play — "le beau jeu". The Top 14 is Europe\'s most competitive domestic league.' },
  { emoji: '🏅', title: 'Paris 2024', detail: 'The Paris Olympics (summer 2024) were a landmark for French sport — 16 gold medals, 4th in the table. Léon Marchand\'s 4 swimming golds in one Games captivated the nation. The ceremony on the Seine was universally praised as a cultural statement.' },
]

export default function FrenchSports() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Sports Vocabulary | SayBonjour!" description="Learn French sports vocabulary — popular sports, match terminology, sports icons, Tour de France, and French sporting culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Sports in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le sport en France — vocabulary, icons, phrases, and sporting culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Vocabulary' },
            { id: 'phrases', label: 'Phrases' },
            { id: 'culture', label: 'Sports Culture' },
          ].map(t => (
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
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-1">{SPORTS_SECTIONS[activeCategory].category}</h2>
              <p className="text-xs text-gray-400 italic mb-4">{SPORTS_SECTIONS[activeCategory].fr}</p>
              <div className="space-y-3">
                {SPORTS_SECTIONS[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0"
                    onClick={() => addXP(2, 'vocabulary')}>
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
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {SPORTS_CULTURE.map((item, i) => (
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
