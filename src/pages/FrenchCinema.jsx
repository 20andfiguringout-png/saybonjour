import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Film, Star } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const CINEMA_VOCAB = [
  { fr: 'un film', en: 'a film / movie', note: '"Quel film tu regardes ?" = What film are you watching?' },
  { fr: 'un cinéma', en: 'a cinema', note: '"Aller au cinéma" = to go to the cinema. France has 6,000+ cinemas — the highest density in the world.' },
  { fr: 'un acteur / une actrice', en: 'an actor / actress', note: 'Female: "une actrice". "Jouer dans un film" = to act in a film.' },
  { fr: 'un réalisateur / une réalisatrice', en: 'a film director', note: 'The auteur (author) theory — developed by French critics — values the director as the film\'s true author.' },
  { fr: 'le scénario', en: 'the screenplay / script', note: '"Un scénariste" = a screenwriter' },
  { fr: 'une séance', en: 'a screening / showing', note: '"La prochaine séance commence à 20h30" = The next showing starts at 8:30pm.' },
  { fr: 'la séance de minuit', en: 'the midnight screening', note: 'Classic French cinema tradition — midnight showings on weekends' },
  { fr: 'une salle obscure', en: 'a cinema / dark room', note: 'Poetic literary term for a movie theatre — used in cultural writing' },
  { fr: 'sous-titré(e)', en: 'subtitled', note: '"En VO sous-titrée" = original language with subtitles' },
  { fr: 'en version originale (VO)', en: 'in original language (with subtitles)', note: 'French cinemas show both VO and VF — educated French audiences strongly prefer VO' },
  { fr: 'en version française (VF)', en: 'dubbed in French', note: 'All Hollywood blockbusters get a full French dub — the dubbing industry is huge in France' },
  { fr: 'la bande-annonce', en: 'the trailer', note: '"Bande" = strip/track; "annonce" = announcement. A very literal term.' },
  { fr: 'une critique / une review', en: 'a review / critique', note: '"Un critique de cinéma" = a film critic. France has the world\'s most respected film criticism tradition.' },
  { fr: 'un chef-d\'œuvre', en: 'a masterpiece', note: '"Un chef-d\'œuvre intemporel" = a timeless masterpiece' },
  { fr: 'une sortie en salle', en: 'a cinema release', note: '"Date de sortie" = release date' },
  { fr: 'le tournage', en: 'the filming / shooting', note: '"Pendant le tournage" = during filming' },
  { fr: 'les effets spéciaux', en: 'special effects', note: '"Les effets numériques" = CGI; "les cascades" = stunts' },
  { fr: 'la bande originale (BO)', en: 'the original soundtrack (OST)', note: '"La BO de ce film est magnifique" = The soundtrack of this film is beautiful.' },
  { fr: 'le Festival de Cannes', en: 'the Cannes Film Festival', note: 'Held each May since 1946. The most prestigious film festival in the world — attracts 35,000 professionals.' },
  { fr: 'la Palme d\'Or', en: 'the Palme d\'Or', note: 'The top prize at Cannes — the most coveted award in world cinema. Named after the palm tree symbol of Cannes.' },
  { fr: 'les César', en: 'the César Awards', note: 'France\'s equivalent of the Oscars — held each February. Named after the sculptor César Baldaccini.' },
  { fr: 'la Nouvelle Vague', en: 'the French New Wave (1950s–60s)', note: 'The revolutionary French film movement — Truffaut, Godard, Chabrol, Varda, Demy. Changed cinema forever.' },
  { fr: 'un long-métrage', en: 'a feature film', note: 'Lit. "long footage" — over 60 minutes. "Un court-métrage" = a short film.' },
  { fr: 'l\'écran', en: 'the screen', note: '"Le grand écran" = the big screen (cinema). "Le petit écran" = TV.' },
]

const GREAT_FRENCH_FILMS = [
  {
    title: 'Les Quatre Cents Coups',
    en: 'The 400 Blows',
    director: 'François Truffaut',
    year: '1959',
    genre: 'Drame de la Nouvelle Vague',
    desc: 'A landmark of French cinema — young Antoine Doinel runs wild through Paris, misunderstood by parents and teachers alike. The final frozen frame on the beach is one of cinema\'s most iconic images. Shot on Paris streets with a lightweight camera — revolutionary at the time.',
    whyWatch: 'Authentic Parisian French, teenage slang, 1950s Paris locations. Truffaut\'s debut at age 27. The starting point for understanding French cinema.',
    level: 'B1',
    emoji: '🎬',
  },
  {
    title: 'Le Fabuleux Destin d\'Amélie Poulain',
    en: 'Amélie',
    director: 'Jean-Pierre Jeunet',
    year: '2001',
    genre: 'Comédie romantique',
    desc: 'A whimsical romantic comedy set in Montmartre, Paris — a shy waitress decides to secretly improve the lives of those around her. The most internationally successful French film ever. Yann Tiersen\'s accordion score is iconic.',
    whyWatch: 'Perfect for French learners — clear, vivid language, Parisian settings, and a joyful story. Many learners credit this film as their entry point into French.',
    level: 'A2',
    emoji: '🌸',
  },
  {
    title: 'La Haine',
    director: 'Mathieu Kassovitz',
    year: '1995',
    genre: 'Drame / Thriller social',
    desc: 'Shot in stark black and white, following three friends over 24 hours in the Paris banlieues (suburbs) after a police incident. Raw, visceral, and politically charged — won Best Director at Cannes. "Jusqu\'ici tout va bien" (So far so good) entered French popular culture.',
    whyWatch: 'Authentic banlieue French and verlan slang. Essential for understanding French social inequality and the relationship between Paris and its suburbs.',
    level: 'B2',
    emoji: '⚫',
  },
  {
    title: 'Intouchables',
    director: 'Éric Toledano & Olivier Nakache',
    year: '2011',
    genre: 'Comédie dramatique',
    desc: 'The highest-grossing French film of all time (51 million tickets worldwide). An unlikely friendship between Philippe, a wealthy quadriplegic, and Driss, his carer from the banlieue. Based on a true story. Omar Sy won the César for Best Actor.',
    whyWatch: 'Excellent conversational French with contrasts between formal bourgeois and informal banlieue register. Very accessible and deeply enjoyable.',
    level: 'A2',
    emoji: '🤝',
  },
  {
    title: 'Les Misérables',
    director: 'Ladj Ly',
    year: '2019',
    genre: 'Thriller social / Drame',
    desc: 'Not the musical — a gripping modern police drama set in Montfermeil (the same suburb where Hugo set his novel). Won the Jury Prize at Cannes 2019 and an Oscar nomination. A devastating portrait of tension between police and communities in contemporary France.',
    whyWatch: 'Modern French police vocabulary, banlieue language, social issues. Essential for understanding contemporary France.',
    level: 'B2',
    emoji: '🏙️',
  },
  {
    title: 'Portrait de la Jeune Fille en Feu',
    en: 'Portrait of a Lady on Fire',
    director: 'Céline Sciamma',
    year: '2019',
    genre: 'Drame historique / Romance',
    desc: 'A painter and her subject fall in love in 18th-century Brittany — a masterpiece of restraint and longing. Won Best Screenplay at Cannes. Dialogue is sparse but precise — beautiful literary French.',
    whyWatch: 'Exquisite formal French, discussions of art, love, and freedom. One of the finest films of the 21st century.',
    level: 'B2',
    emoji: '🖼️',
  },
  {
    title: 'Le Dîner de Cons',
    en: 'The Dinner Game',
    director: 'Francis Veber',
    year: '1998',
    genre: 'Comédie / Farce',
    desc: 'A brilliantly constructed comedy of errors — a group of Parisian intellectuals hold weekly "idiot dinners" where each must bring the most entertaining fool. Sharp, witty, and deeply revealing about French bourgeois attitudes.',
    whyWatch: 'Superb for learning colloquial Parisian French, wit, and social satire. Dialogue is dense with idiomatic expressions and wordplay.',
    level: 'B1',
    emoji: '😂',
  },
  {
    title: 'Au Revoir Les Enfants',
    director: 'Louis Malle',
    year: '1987',
    genre: 'Drame historique / Guerre',
    desc: 'Set in a Catholic boarding school during the Nazi Occupation — a French boy discovers his Jewish classmate\'s hidden identity. Based on Louis Malle\'s own childhood memory. One of the most moving French films ever made.',
    whyWatch: 'Clear, careful French spoken by children and teachers. Historical vocabulary about WWII and the Occupation. Profoundly moving.',
    level: 'B1',
    emoji: '📚',
  },
  {
    title: 'La Grande Illusion',
    director: 'Jean Renoir',
    year: '1937',
    genre: 'Drame de guerre / Humanisme',
    desc: 'French POWs in WWI Germany — a meditation on class, nationality, and the artificial nature of borders. The first non-English-language film nominated for the Oscar for Best Picture. Orson Welles called it "the greatest film ever made".',
    whyWatch: 'Beautiful pre-war French dialogue. Explores French concepts of class (aristocracy vs bourgeoisie vs working class) with extraordinary depth.',
    level: 'B2',
    emoji: '🕊️',
  },
  {
    title: 'Cléo de 5 à 7',
    director: 'Agnès Varda',
    year: '1962',
    genre: 'Nouvelle Vague / Drame',
    desc: 'A singer waits for cancer test results in real time across Paris. Varda — the "grandmother of the French New Wave" — films Paris as it was in 1962. Intimate, feminist, and formally inventive.',
    whyWatch: 'Varda\'s natural Paris dialogue is a goldmine for learners. The real-time structure and authentic 1960s locations make it uniquely immersive.',
    level: 'B2',
    emoji: '🎵',
  },
]

const LEVEL_COLORS = { A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700' }

const TALKING_ABOUT_FILMS = [
  { fr: 'Tu as vu… ?', en: 'Have you seen…?' },
  { fr: 'Je l\'ai trouvé(e) excellent(e) / nul(le).', en: 'I found it excellent / terrible.' },
  { fr: 'L\'histoire m\'a touché(e) / ému(e).', en: 'The story moved me / touched me emotionally.' },
  { fr: 'Les acteurs jouent remarquablement bien.', en: 'The actors perform remarkably well.' },
  { fr: 'La mise en scène est époustouflante.', en: 'The direction is breathtaking.', note: '"Époustouflant(e)" = breathtaking / mind-blowing' },
  { fr: 'La bande originale est magnifique.', en: 'The soundtrack is beautiful.' },
  { fr: 'Ça vaut le coup d\'aller le voir.', en: 'It\'s worth going to see it.' },
  { fr: 'Je te le recommande vivement.', en: 'I strongly recommend it.' },
  { fr: 'C\'est un peu lent au début mais ça vaut la peine.', en: 'It\'s a bit slow at first but worth it.' },
  { fr: 'L\'intrigue est bien ficelée.', en: 'The plot is well crafted.', note: '"Ficelé" = lit. "tied with string" — well put-together' },
  { fr: 'La fin m\'a laissé(e) perplexe.', en: 'The ending left me puzzled.' },
  { fr: 'C\'est un chef-d\'œuvre absolu.', en: 'It\'s an absolute masterpiece.' },
  { fr: 'Je m\'y suis ennuyé(e) à mourir.', en: 'I was bored to death by it.', note: '"S\'ennuyer à mourir" = to be bored to death' },
  { fr: 'C\'est un film culte.', en: 'It\'s a cult film.', note: '"Un film culte" = a cult classic — widely revered' },
  { fr: 'Il y a des sous-titres en français ?', en: 'Are there French subtitles?' },
  { fr: 'Est-ce que c\'est en VO ou en VF ?', en: 'Is it in the original language or dubbed in French?' },
]

const CINEMA_CULTURE = [
  { emoji: '🎥', title: 'The Auteur Theory', detail: 'The concept of the "auteur" (author) — that a film director is the artistic author of a film — was invented by French film critics at Cahiers du Cinéma in the 1950s. Critics-turned-directors like Truffaut and Godard created the Nouvelle Vague (New Wave) and transformed world cinema. Hollywood still operates on this theory.' },
  { emoji: '🌴', title: 'Festival de Cannes', detail: 'The most prestigious film festival in the world — held each May since 1946. The Palme d\'Or (Golden Palm) is the supreme award. The red carpet (le tapis rouge) and the Croisette promenade are globally recognised. Controversies about diversity, streaming services (Netflix was rejected for years), and national quotas make Cannes genuinely politically fascinating.' },
  { emoji: '🎫', title: 'French Cinema Subsidies', detail: 'France\'s cinema support system (the CNC — Centre national du cinéma) is one of the world\'s most generous: a tax on cinema tickets, TV channels, and Netflix funds French film production. This is why France produces 300+ films per year and has survived Hollywood domination where other countries haven\'t.' },
  { emoji: '📺', title: 'The Cultural Exception', detail: '"L\'exception culturelle" is France\'s policy of treating culture (cinema, literature, music) as something that cannot be left to market forces alone. France fought hard in GATT and WTO negotiations to protect cultural subsidies — and won. This policy is why French cinema still exists as a global force.' },
]

export default function FrenchCinema() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Cinema | SayBonjour!" description="French cinema vocabulary, 10 essential French films, phrases for talking about movies, and French cinema culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Cinema</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le cinéma français — vocabulary, 10 essential films, and how to discuss them</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Cinema Vocab' },
            { id: 'films', label: '10 Must-See Films' },
            { id: 'talking', label: 'Discussing Films' },
            { id: 'culture', label: 'Cinema Culture' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {CINEMA_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400">— {item.en}</span>
                  </div>
                  {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'films' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Ordered roughly by difficulty. All are available with French subtitles — watching in VO with French subtitles is one of the best ways to improve your listening.</p>
            {GREAT_FRENCH_FILMS.map((film, i) => (
              <motion.div key={film.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(4, 'vocabulary')}>
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl shrink-0">{film.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <SpeakButton text={film.title} size="sm" />
                          <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair italic">{film.title}</h3>
                        </div>
                        {film.en && <p className="text-xs text-gray-400 italic ml-7">({film.en})</p>}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${LEVEL_COLORS[film.level]}`}>{film.level}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 ml-7">{film.director} · {film.year} · <span className="italic">{film.genre}</span></p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{film.desc}</p>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300">
                  <span className="font-bold">Why watch as a learner: </span>{film.whyWatch}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'talking' && (
          <div className="space-y-3">
            {TALKING_ABOUT_FILMS.map((p, i) => (
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

        {tab === 'culture' && (
          <div className="space-y-4">
            {CINEMA_CULTURE.map((item, i) => (
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
