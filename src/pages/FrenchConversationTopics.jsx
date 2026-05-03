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
    phrases: [
      { fr: 'Comment vous appelez-vous ?', en: 'What is your name? (formal)' },
      { fr: 'Je m\'appelle Sophie. Et vous ?', en: 'My name is Sophie. And you?' },
      { fr: 'D\'où venez-vous ?', en: 'Where do you come from?' },
      { fr: 'Je suis britannique / australien(ne).', en: 'I\'m British / Australian.' },
      { fr: 'Vous habitez à Paris depuis longtemps ?', en: 'Have you lived in Paris long?' },
      { fr: 'Que faites-vous dans la vie ?', en: 'What do you do for a living?' },
      { fr: 'Je suis professeur / ingénieur(e) / étudiant(e).', en: 'I\'m a teacher / engineer / student.' },
      { fr: 'C\'est un plaisir de vous rencontrer.', en: 'It\'s a pleasure to meet you.' },
    ],
  },
  {
    topic: 'Talking About Family',
    emoji: '👨‍👩‍👧',
    level: 'A1',
    phrases: [
      { fr: 'Avez-vous des frères et sœurs ?', en: 'Do you have brothers and sisters?' },
      { fr: 'Je suis fils/fille unique.', en: 'I\'m an only child.' },
      { fr: 'J\'ai deux frères et une sœur.', en: 'I have two brothers and a sister.' },
      { fr: 'Mes parents habitent à la campagne.', en: 'My parents live in the countryside.' },
      { fr: 'Je suis marié(e) / célibataire / divorcé(e).', en: 'I\'m married / single / divorced.' },
      { fr: 'Nous avons trois enfants.', en: 'We have three children.' },
      { fr: 'Ma famille me manque.', en: 'I miss my family.' },
    ],
  },
  {
    topic: 'Talking About Work',
    emoji: '💼',
    level: 'A2',
    phrases: [
      { fr: 'Je travaille dans le domaine de l\'informatique.', en: 'I work in the field of IT.' },
      { fr: 'Je suis en télétravail.', en: 'I\'m working from home.', note: '"Télétravail" became essential post-2020' },
      { fr: 'Je cherche un emploi.', en: 'I\'m looking for a job.' },
      { fr: 'J\'ai été promu(e).', en: 'I\'ve been promoted.' },
      { fr: 'Mon travail est assez stressant.', en: 'My job is quite stressful.' },
      { fr: 'J\'aime beaucoup ce que je fais.', en: 'I really like what I do.' },
      { fr: 'Je voudrais changer de carrière.', en: 'I\'d like to change career.' },
    ],
  },
  {
    topic: 'Talking About Food',
    emoji: '🍽️',
    level: 'A2',
    phrases: [
      { fr: 'Qu\'est-ce que tu aimes manger ?', en: 'What do you like to eat?' },
      { fr: 'Je suis un vrai gourmet.', en: 'I\'m a real foodie.' },
      { fr: 'Mon plat préféré, c\'est le bœuf bourguignon.', en: 'My favourite dish is beef bourguignon.' },
      { fr: 'Je ne mange pas de viande.', en: 'I don\'t eat meat.' },
      { fr: 'Tu sais cuisiner ?', en: 'Can you cook?' },
      { fr: 'On se retrouve au restaurant ?', en: 'Shall we meet at a restaurant?' },
      { fr: 'C\'était délicieux, un grand merci.', en: 'That was delicious, thank you very much.' },
    ],
  },
  {
    topic: 'Discussing Current Events',
    emoji: '📰',
    level: 'B1',
    phrases: [
      { fr: 'Tu as suivi l\'actualité ?', en: 'Have you been following the news?' },
      { fr: 'Qu\'est-ce que tu penses de… ?', en: 'What do you think of…?' },
      { fr: 'C\'est une situation complexe.', en: 'It\'s a complex situation.' },
      { fr: 'Je lis les journaux en ligne.', en: 'I read the news online.' },
      { fr: 'À mon avis, le gouvernement aurait dû…', en: 'In my opinion, the government should have…' },
      { fr: 'C\'est un sujet très débattu en ce moment.', en: 'It\'s a heavily debated topic at the moment.' },
      { fr: 'On ne parle que de ça.', en: 'It\'s all everyone\'s talking about.' },
    ],
  },
  {
    topic: 'Small Talk',
    emoji: '☀️',
    level: 'A1',
    phrases: [
      { fr: 'Quel temps !', en: 'What weather!' },
      { fr: 'Il fait beau / froid / chaud aujourd\'hui.', en: 'The weather is nice / cold / hot today.' },
      { fr: 'Tu as passé un bon week-end ?', en: 'Did you have a good weekend?' },
      { fr: 'Tu as regardé le match hier soir ?', en: 'Did you watch the game last night?' },
      { fr: 'Ça se passe bien pour toi ?', en: 'How\'s it going for you?' },
      { fr: 'On se voit bientôt ?', en: 'Shall we see each other soon?' },
      { fr: 'Bonne journée !', en: 'Have a good day!' },
    ],
  },
]

const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700' }

export default function FrenchConversationTopics() {
  const [activeTopic, setActiveTopic] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Conversation Topics | SayBonjour!" description="Practice French conversations — first meetings, family, work, food, current events, and small talk." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Conversation Topics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sujets de conversation — real phrases for real conversations</p>
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
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{TOPICS[activeTopic].emoji}</span>
            <h2 className="font-bold text-xl font-playfair text-gray-900 dark:text-cream-50">{TOPICS[activeTopic].topic}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${LEVEL_COLORS[TOPICS[activeTopic].level]}`}>{TOPICS[activeTopic].level}</span>
          </div>
          <div className="space-y-2">
            {TOPICS[activeTopic].phrases.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
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
