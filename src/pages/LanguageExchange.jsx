import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageCircle, Globe, ExternalLink, CheckCircle2, Lightbulb, Star } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const PLATFORMS = [
  {
    name: 'HelloTalk',
    type: 'App',
    description: 'Language exchange app connecting you with native French speakers learning English. Text, voice, and video chat with built-in translation and correction tools.',
    best_for: 'Beginners to intermediate — guided corrections in-app',
    url: 'https://www.hellotalk.com',
    icon: '💬',
    free: true,
    tips: ['Set your learning goal clearly in your profile', 'Use the "Moment" feature to post short French texts for corrections', 'Aim for balanced exchanges — help your partner as much as they help you'],
    level: 'A1+',
  },
  {
    name: 'Tandem',
    type: 'App',
    description: 'Language exchange community with a text, audio, and video messaging. Matches you with native French speakers based on interests.',
    best_for: 'Intermediate learners who want structured practice',
    url: 'https://www.tandem.net',
    icon: '🌍',
    free: true,
    tips: ['Browse by specific region of France or Francophone country', 'Schedule regular weekly calls for consistency', 'Prepare a topic list before each session'],
    level: 'A2+',
  },
  {
    name: 'iTalki',
    type: 'Platform',
    description: 'Find professional French tutors or community tutors (cheaper). Book 1-on-1 video lessons at your convenience.',
    best_for: 'Structured learning with a paid tutor',
    url: 'https://www.italki.com',
    icon: '🎓',
    free: false,
    tips: ['Community tutors are much cheaper than professional teachers', 'Write a lesson plan beforehand for maximum value', 'Review recordings after sessions'],
    level: 'All levels',
  },
  {
    name: 'Speaky',
    type: 'Platform',
    description: 'Free language exchange platform with text, voice and video chat. Large French-speaking community.',
    best_for: 'Casual conversation practice',
    url: 'https://www.speaky.com',
    icon: '🗣️',
    free: true,
    tips: ['Use the topic filter to find partners with shared interests', 'Practice for at least 30 minutes per session', 'Record key vocabulary you learn in each conversation'],
    level: 'B1+',
  },
  {
    name: 'ConversationExchange',
    type: 'Website',
    description: 'Simple directory of French speakers looking for exchange partners. Email, in-person, and Skype options.',
    best_for: 'Finding local French speakers in your city',
    url: 'https://www.conversationexchange.com',
    icon: '📧',
    free: true,
    tips: ['Search by city to find local conversation partners', 'Prepare written questions in advance', 'Meet in a café or library for in-person exchanges'],
    level: 'B1+',
  },
  {
    name: 'Reddit r/languagelearning',
    type: 'Community',
    description: 'Active community of language learners — post for French exchange partners, ask questions, share resources.',
    url: 'https://www.reddit.com/r/languagelearning',
    icon: '💻',
    free: true,
    tips: ['Post a "partner request" thread mentioning your level and goals', 'Browse the weekly exchange partner thread', 'Join the r/French subreddit for cultural context'],
    level: 'All levels',
    best_for: 'Finding online exchange partners and community advice',
  },
]

const SESSION_TIPS = [
  { tip: 'Prepare 5–10 topics in advance', detail: 'Conversation dies without topics. Have a list ready: current events, hobbies, travel plans, films, food.' },
  { tip: 'Split time 50/50', detail: 'Spend half the session speaking French, half speaking your partner\'s language. Use a timer to keep it fair.' },
  { tip: 'Correct gently, in writing', detail: 'After your partner speaks, type corrections in the chat. This lets them review without interrupting the flow.' },
  { tip: 'Record new vocabulary', detail: 'Keep a notebook or doc open during sessions. Write down 5–10 new words or expressions each time.' },
  { tip: 'Be consistent', detail: 'Weekly sessions with the same partner beat monthly sessions with many partners. Consistency builds real progress.' },
  { tip: 'Embrace silence', detail: 'Pausing to think is fine. Don\'t panic — native speakers pause too. Silence shows you\'re choosing words carefully.' },
  { tip: 'Focus on one grammar point per session', detail: 'Pick one thing to practise: subjunctive, imparfait, asking questions. Targeted practice beats scattered conversation.' },
]

const INTRO_PHRASES = [
  { fr: 'Je cherche un partenaire d\'échange linguistique.', en: 'I am looking for a language exchange partner.' },
  { fr: 'Mon niveau de français est B1.', en: 'My French level is B1.' },
  { fr: 'Je voudrais pratiquer ma conversation.', en: 'I would like to practise my conversation.' },
  { fr: 'Pouvez-vous me corriger si je fais des erreurs ?', en: 'Can you correct me if I make mistakes?' },
  { fr: 'On peut se retrouver une fois par semaine ?', en: 'Can we meet once a week?' },
  { fr: 'J\'aime parler de la cuisine, des voyages et du cinéma.', en: 'I like talking about food, travel and cinema.' },
  { fr: 'Merci de votre patience !', en: 'Thank you for your patience!' },
]

export default function LanguageExchange() {
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('platforms')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Language Exchange | SayBonjour!" description="Find French language exchange partners — apps, tips, and introductory phrases for conversation practice." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Language Exchange</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Échange linguistique — practise with real French speakers</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {[{ id: 'platforms', label: 'Find Partners' }, { id: 'tips', label: 'Session Tips' }, { id: 'phrases', label: 'Intro Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'platforms' && (
          <div className="space-y-4">
            {PLATFORMS.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center text-3xl shrink-0">
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h2 className="font-bold text-gray-900 dark:text-cream-50">{p.name}</h2>
                      <span className="text-xs px-1.5 py-0.5 rounded font-medium bg-gray-100 dark:bg-dark-warm-200 text-gray-600 dark:text-gray-400">{p.type}</span>
                      {p.free && <span className="text-xs px-1.5 py-0.5 rounded font-medium bg-emerald-100 text-emerald-700">Free</span>}
                      <span className="text-xs text-gray-400">{p.level}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{p.description}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mb-3">✨ Best for: {p.best_for}</p>
                    <div className="mb-3">
                      {p.tips.map(tip => (
                        <div key={tip} className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <CheckCircle2 size={11} className="text-emerald-400 mt-0.5 shrink-0" />{tip}
                        </div>
                      ))}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-burgundy-600 text-white rounded-xl text-xs font-medium hover:bg-burgundy-700 transition-colors">
                      <ExternalLink size={12} /> Visit {p.name}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'tips' && (
          <div className="space-y-4">
            {SESSION_TIPS.map((item, i) => (
              <motion.div key={item.tip} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-burgundy-100 dark:bg-burgundy-vibrant-600/20 flex items-center justify-center text-burgundy-600 text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-cream-50 mb-1">{item.tip}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-5">Phrases to introduce yourself</h2>
            <div className="space-y-3">
              {INTRO_PHRASES.map(phrase => (
                <div key={phrase.fr} className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                  <SpeakButton text={phrase.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-gray-800 dark:text-cream-50">{phrase.fr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
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
