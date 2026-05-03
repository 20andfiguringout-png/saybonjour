import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const TOPICS = [
  {
    topic: 'First Meetings',
    emoji: '🤝',
    level: 'A1',
    intro: 'The most important phrases for any first encounter — whether at a party, in class, or at work.',
    phrases: [
      { fr: 'Comment vous appelez-vous ?', en: 'What is your name? (formal)', note: '"Je m\'appelle…" = My name is… (lit. "I call myself").' },
      { fr: 'Je m\'appelle Sophie. Et vous ?', en: 'My name is Sophie. And you?' },
      { fr: 'D\'où venez-vous ?', en: 'Where do you come from? (formal)', note: '"Tu viens d\'où ?" = informal version. The d\'où (from where) always comes at the start in formal inversion.' },
      { fr: 'Je suis britannique / australien(ne) / américain(e).', en: 'I\'m British / Australian / American.', note: 'Nationalities agree in gender: américain (m), américaine (f).' },
      { fr: 'Vous habitez à Paris depuis longtemps ?', en: 'Have you lived in Paris long?', note: 'Note the present tense with "depuis" — French uses present for ongoing situations.' },
      { fr: 'Que faites-vous dans la vie ?', en: 'What do you do for a living? (formal)', note: '"Tu fais quoi dans la vie ?" = informal. A very common conversation starter.' },
      { fr: 'Je suis professeur / ingénieur(e) / étudiant(e).', en: 'I\'m a teacher / engineer / student.', note: 'Unlike English, no article before profession: "Je suis professeur" NOT "Je suis UN professeur".' },
      { fr: 'C\'est un plaisir de vous rencontrer.', en: 'It\'s a pleasure to meet you.', note: '"Enchanté(e)" = delighted (to meet you) — slightly more formal but elegant.' },
      { fr: 'Je suis là pour quelques jours / semaines.', en: 'I\'m here for a few days / weeks.' },
    ],
  },
  {
    topic: 'Talking About Family',
    emoji: '👨‍👩‍👧',
    level: 'A1',
    intro: 'Family is a deeply important topic in French culture. These phrases will carry you through any family conversation.',
    phrases: [
      { fr: 'Avez-vous des frères et sœurs ?', en: 'Do you have brothers and sisters?', note: '"Tu as des frères et sœurs ?" = informal.' },
      { fr: 'Je suis fils / fille unique.', en: 'I\'m an only child.', note: 'Lit. "I\'m a unique son/daughter". A charming literal construction.' },
      { fr: 'J\'ai deux frères et une sœur.', en: 'I have two brothers and one sister.' },
      { fr: 'Mes parents habitent à la campagne / en ville.', en: 'My parents live in the countryside / in town.', note: '"À la campagne" = in the countryside. "En banlieue" = in the suburbs.' },
      { fr: 'Je suis marié(e) / célibataire / divorcé(e) / pacsé(e).', en: 'I\'m married / single / divorced / in a civil partnership.', note: '"Pacsé(e)" = in a PACS civil partnership. Very common in France.' },
      { fr: 'Nous avons trois enfants.', en: 'We have three children.', note: '"Un enfant unique" = an only child. "Des jumeaux/jumelles" = twins.' },
      { fr: 'Ma famille me manque.', en: 'I miss my family.', note: 'Note: "me manque" = the family lacks to me. Subject is family, not I.' },
      { fr: 'Je m\'entends bien avec mes parents.', en: 'I get on well with my parents.', note: '"S\'entendre avec" = to get on with. "On ne s\'entend pas trop" = we don\'t get on very well.' },
    ],
  },
  {
    topic: 'Talking About Work',
    emoji: '💼',
    level: 'A2',
    intro: 'Work is a favourite French conversation topic — from your job title to your work-life balance aspirations.',
    phrases: [
      { fr: 'Je travaille dans le domaine de l\'informatique / de la santé / de l\'éducation.', en: 'I work in the field of IT / healthcare / education.', note: '"Dans le domaine de" = in the field of. Very versatile construction.' },
      { fr: 'Je suis en télétravail deux jours par semaine.', en: 'I work from home two days a week.', note: '"Télétravail" became mainstream post-2020 — now a standard part of many French contracts.' },
      { fr: 'Je cherche un emploi / un poste.', en: 'I\'m looking for a job / a position.', note: '"Un poste" = a position/role. "Un emploi" = a job (more general). "Un CDI" = permanent contract.' },
      { fr: 'J\'ai été promu(e) récemment.', en: 'I\'ve been promoted recently.', note: '"Être promu(e)" = to be promoted. "Une promotion" = a promotion.' },
      { fr: 'Mon travail est assez stressant mais stimulant.', en: 'My job is quite stressful but stimulating.', note: '"Stimulant" = stimulating, challenging in a good way.' },
      { fr: 'J\'aime beaucoup ce que je fais.', en: 'I really like what I do.', note: '"Ce que je fais" = what I do. One of the most authentic things you can say.' },
      { fr: 'Je voudrais changer de carrière à terme.', en: 'I\'d like to change career eventually.', note: '"À terme" = in the longer term / eventually.' },
      { fr: 'Le travail ne devrait pas empiéter sur la vie privée.', en: 'Work shouldn\'t encroach on private life.', note: '"Empiéter sur" = to encroach on. This reflects French work-life balance culture.' },
    ],
  },
  {
    topic: 'Talking About Food',
    emoji: '🍽️',
    level: 'A2',
    intro: 'Food is a sacred topic for the French — nothing binds or reveals more than what someone eats.',
    phrases: [
      { fr: 'Qu\'est-ce que tu aimes manger ?', en: 'What do you like to eat?' },
      { fr: 'Je suis un vrai gourmet / gourmand(e).', en: 'I\'m a real food lover / I love eating.', note: '"Gourmet" = refined taste. "Gourmand" = loves to eat abundantly. Both are used as compliments in France.' },
      { fr: 'Mon plat préféré, c\'est le bœuf bourguignon.', en: 'My favourite dish is beef bourguignon.', note: '"Mon plat préféré" = my favourite dish. You\'ll get great French food conversations by naming your favourite.' },
      { fr: 'Je ne mange pas de viande — je suis végétarien(ne).', en: 'I don\'t eat meat — I\'m vegetarian.', note: 'Vegetarianism is growing but still uncommon in traditional French culture. Be prepared to explain!' },
      { fr: 'Tu sais cuisiner ?', en: 'Can you cook? / Do you know how to cook?', note: '"Savoir cuisiner" vs "pouvoir cuisiner" — savoir implies skill, pouvoir implies ability/opportunity.' },
      { fr: 'On se retrouve au restaurant pour déjeuner ?', en: 'Shall we meet at a restaurant for lunch?', note: 'Lunch is a major social event in France — often 1.5–2 hours.' },
      { fr: 'C\'était délicieux — vous avez très bien cuisiné.', en: 'That was delicious — you cooked really well.', note: 'Always compliment the food when invited to someone\'s home — it\'s expected and deeply appreciated.' },
    ],
  },
  {
    topic: 'Discussing Current Events',
    emoji: '📰',
    level: 'B1',
    intro: 'The French love political and social debate — these phrases let you engage without agreeing or offending.',
    phrases: [
      { fr: 'Tu as suivi l\'actualité cette semaine ?', en: 'Have you been following the news this week?', note: '"L\'actualité" = current events / the news. "Les infos" = informal.' },
      { fr: 'Qu\'est-ce que tu penses de la situation en… ?', en: 'What do you think of the situation in…?' },
      { fr: 'C\'est une situation complexe — il faut nuancer.', en: 'It\'s a complex situation — you have to be nuanced.', note: '"Nuancer" = to nuance / be nuanced. This is a fundamentally French intellectual value.' },
      { fr: 'Je lis les journaux en ligne — Le Monde, Le Figaro.', en: 'I read the news online — Le Monde, Le Figaro.', note: 'Le Monde = centre-left quality newspaper. Le Figaro = centre-right.' },
      { fr: 'À mon avis, le gouvernement aurait dû agir plus tôt.', en: 'In my opinion, the government should have acted earlier.', note: '"Aurait dû" = should have (conditional perfect). Great for criticism.' },
      { fr: 'C\'est un sujet très débattu en ce moment.', en: 'It\'s a heavily debated topic at the moment.', note: '"Débattu" = debated. "Un débat houleux" = a stormy debate.' },
      { fr: 'On ne parle que de ça depuis des semaines.', en: 'It\'s all anyone has been talking about for weeks.', note: '"Ne… que" = only. "On" = people in general.' },
    ],
  },
  {
    topic: 'Talking About Travel',
    emoji: '✈️',
    level: 'A2',
    intro: 'Travel opens doors to rich conversation — where you\'ve been and where you\'d love to go.',
    phrases: [
      { fr: 'Tu as voyagé récemment ?', en: 'Have you travelled recently?' },
      { fr: 'Je suis allé(e) en Bretagne le mois dernier.', en: 'I went to Brittany last month.', note: 'Use "en" for feminine regions/countries, "au" for masculine: "au Pays de Galles", "en Normandie".' },
      { fr: 'Le voyage s\'est très bien passé.', en: 'The trip went really well.', note: '"Se passer" = to go/take place. "Comment s\'est passé le voyage ?" = how did the trip go?' },
      { fr: 'La région est magnifique — je te la recommande.', en: 'The region is beautiful — I recommend it to you.', note: '"Je te la recommande" = I recommend it to you (using the pronoun "la" for region).' },
      { fr: 'Je rêve d\'aller au Japon / en Amérique du Sud.', en: 'I dream of going to Japan / South America.', note: '"Rêver de + infinitive" = to dream of doing something.' },
      { fr: 'Je préfère voyager hors saison pour éviter la foule.', en: 'I prefer travelling off-season to avoid the crowds.', note: '"Hors saison" = off-season. "La foule" = the crowd. Very practical traveller\'s phrase.' },
    ],
  },
  {
    topic: 'Small Talk',
    emoji: '☀️',
    level: 'A1',
    intro: 'The French value good conversation — even small talk has its art. Weather and wellbeing are always safe.',
    phrases: [
      { fr: 'Quel temps !', en: 'What weather! / What terrible weather!', note: 'Said emphatically — context determines if good or bad. More often used for bad weather.' },
      { fr: 'Il fait beau / froid / chaud aujourd\'hui.', en: 'The weather is nice / cold / hot today.' },
      { fr: 'Tu as passé un bon week-end ?', en: 'Did you have a good weekend?', note: 'The Monday morning question — universal in French offices.' },
      { fr: 'Tu as regardé le match hier soir ?', en: 'Did you watch the game last night?', note: 'Football (le foot) is the most common sports small talk.' },
      { fr: 'Ça se passe bien pour toi en ce moment ?', en: 'How\'s it going for you at the moment?', note: '"Ça se passe bien" = things are going well. More open than "ça va".' },
      { fr: 'On se voit bientôt — avec plaisir !', en: 'We\'ll see each other soon — with pleasure!', note: '"Avec plaisir" = with pleasure. A warm and genuine response to a social invitation.' },
      { fr: 'Bonne journée ! / Bonne soirée !', en: 'Have a good day! / Have a good evening!', note: 'Always say this when leaving a shop, ending a casual encounter, or saying goodbye.' },
    ],
  },
]

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700',
  A2: 'bg-blue-100 text-blue-700',
  B1: 'bg-yellow-100 text-yellow-700',
}

export default function FrenchConversationTopics() {
  const [activeTopic, setActiveTopic] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Conversation Topics | SayBonjour!" description="Practice French conversations — first meetings, family, work, food, current events, travel, and small talk." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Conversation Topics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sujets de conversation — real phrases for real conversations, A1 to B1</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {TOPICS.map((t, i) => (
            <button key={t.topic} onClick={() => { setActiveTopic(i); addXP(3, 'vocabulary') }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${activeTopic === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.emoji} {t.topic}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{TOPICS[activeTopic].emoji}</span>
            <h2 className="font-bold text-xl font-playfair text-gray-900 dark:text-cream-50">{TOPICS[activeTopic].topic}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${LEVEL_COLORS[TOPICS[activeTopic].level]}`}>{TOPICS[activeTopic].level}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 ml-9 italic">{TOPICS[activeTopic].intro}</p>
          <div className="space-y-2">
            {TOPICS[activeTopic].phrases.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3"
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
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={() => setActiveTopic(i => Math.max(0, i - 1))} disabled={activeTopic === 0}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-dark-warm-50 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors">
            ← Previous topic
          </button>
          <button onClick={() => setActiveTopic(i => Math.min(TOPICS.length - 1, i + 1))} disabled={activeTopic === TOPICS.length - 1}
            className="flex-1 py-2.5 rounded-xl bg-burgundy-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-burgundy-700 transition-colors">
            Next topic →
          </button>
        </div>
      </div>
    </div>
  )
}
