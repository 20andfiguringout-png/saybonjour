import React, { useState } from 'react'
import { MessageCircle, Users, Coffee, ChevronDown, Menu, X, Star, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const SECTIONS = [
  {
    id: 'greetings',
    label: 'Greetings & Introductions',
    emoji: '👋',
    icon: Users,
    items: [
      {
        id: 'basic-greetings',
        emoji: '😊',
        title: 'Basic Greetings',
        subtitle: 'Essential phrases for meeting people',
        tip: 'In France, people greet each other with a handshake in formal settings and "la bise" (cheek kiss) with friends. Always say bonjour when entering a shop or room!',
        phrases: [
          { french: 'Bonjour !', english: 'Hello! / Good morning!', context: 'Used all day until around 6pm — the most versatile greeting', register: 'formal' },
          { french: 'Bonsoir !', english: 'Good evening!', context: 'Used after around 6pm', register: 'formal' },
          { french: 'Salut !', english: 'Hi! / Hey!', context: 'Casual greeting between friends', register: 'informal' },
          { french: 'Coucou !', english: 'Hey there! / Yoo-hoo!', context: 'Very casual, affectionate — for close friends or children', register: 'informal' },
          { french: 'Enchanté(e) !', english: 'Pleased to meet you!', context: 'Said when meeting someone for the first time', register: 'formal' },
        ],
      },
      {
        id: 'introductions',
        emoji: '🤝',
        title: 'Introducing Yourself',
        subtitle: 'How to tell people who you are',
        tip: 'When introducing yourself, French people often use "Je m\'appelle" (I call myself) more than "Je suis" (I am). Both are correct, but the former is more natural for names.',
        phrases: [
          { french: 'Je m\'appelle [name].', english: 'My name is [name].', context: 'The most natural way to give your name', register: 'neutral' },
          { french: 'Je viens de [place].', english: 'I come from [place].', context: 'Saying where you\'re from', register: 'neutral' },
          { french: 'J\'apprends le français.', english: 'I\'m learning French.', context: 'Very useful — native speakers will appreciate the effort!', register: 'neutral' },
          { french: 'Je parle un peu français.', english: 'I speak a little French.', context: 'Honest and endearing — sets expectations kindly', register: 'neutral' },
          { french: 'Vous parlez anglais ?', english: 'Do you speak English?', context: 'Polite escape hatch when you\'re stuck', register: 'formal' },
        ],
      },
      {
        id: 'farewells',
        emoji: '👋',
        title: 'Saying Goodbye',
        subtitle: 'How to end a conversation gracefully',
        tip: 'French goodbyes are often layered — you\'ll say "au revoir" to leave, then "bonne journée" (have a good day) or "bonne soirée" (good evening). These add warmth and politeness.',
        phrases: [
          { french: 'Au revoir !', english: 'Goodbye!', context: 'Standard farewell — literally "until we see each other again"', register: 'neutral' },
          { french: 'À bientôt !', english: 'See you soon!', context: 'Implies you\'ll meet again relatively soon', register: 'neutral' },
          { french: 'À demain !', english: 'See you tomorrow!', context: 'For when you\'ll definitely meet the next day', register: 'neutral' },
          { french: 'Bonne journée !', english: 'Have a good day!', context: 'Said when leaving — expected in shops, offices, etc.', register: 'neutral' },
          { french: 'Salut !', english: 'Bye! (casual)', context: 'Same word as "Hi" but used as goodbye too', register: 'informal' },
        ],
      },
    ],
  },
  {
    id: 'everyday',
    label: 'Everyday Phrases',
    emoji: '☕',
    icon: Coffee,
    items: [
      {
        id: 'polite-expressions',
        emoji: '🙏',
        title: 'Polite Expressions',
        subtitle: 'The phrases that show good manners',
        tip: 'French culture values politeness highly. "S\'il vous plaît" and "merci" are essential. Adding "monsieur" or "madame" shows extra respect and is very appreciated in formal settings.',
        phrases: [
          { french: 'S\'il vous plaît.', english: 'Please. (formal)', context: 'Essential! Use with strangers, in shops, with older people', register: 'formal' },
          { french: 'S\'il te plaît.', english: 'Please. (informal)', context: 'Use with friends, family, children', register: 'informal' },
          { french: 'Merci (beaucoup) !', english: 'Thank you (very much)!', context: 'The backbone of polite French interaction', register: 'neutral' },
          { french: 'De rien. / Je vous en prie.', english: 'You\'re welcome.', context: '"De rien" is casual; "je vous en prie" is more formal and elegant', register: 'both' },
          { french: 'Excusez-moi. / Pardon.', english: 'Excuse me. / Sorry.', context: 'To get attention or apologise for a small mistake', register: 'neutral' },
          { french: 'Je suis désolé(e).', english: 'I\'m sorry.', context: 'For genuine apologies — stronger than "pardon"', register: 'neutral' },
        ],
      },
      {
        id: 'questions',
        emoji: '❓',
        title: 'Asking Questions',
        subtitle: 'How to get information in French',
        tip: 'French has three ways to ask yes/no questions: rising intonation (casual), "est-ce que" (neutral), or inversion (formal). All are correct — choose based on context.',
        phrases: [
          { french: 'Où est... ?', english: 'Where is... ?', context: 'Finding your way around — most useful travel phrase', register: 'neutral' },
          { french: 'C\'est combien ?', english: 'How much is it?', context: 'Shopping essential — short and understood everywhere', register: 'neutral' },
          { french: 'Est-ce que vous pouvez m\'aider ?', english: 'Can you help me?', context: 'Polite way to ask for assistance', register: 'formal' },
          { french: 'Comment dit-on... en français ?', english: 'How do you say... in French?', context: 'Essential for learners — French people love to help!', register: 'neutral' },
          { french: 'Vous pouvez répéter, s\'il vous plaît ?', english: 'Can you repeat that, please?', context: 'Don\'t be shy — ask as many times as needed!', register: 'formal' },
          { french: 'Vous parlez plus lentement ?', english: 'Can you speak more slowly?', context: 'Every French learner needs this one', register: 'formal' },
        ],
      },
      {
        id: 'cafe-restaurant',
        emoji: '🍽️',
        title: 'At a Café or Restaurant',
        subtitle: 'Ordering food and drinks like a local',
        tip: 'In French restaurants, the waiter won\'t rush you. Say "s\'il vous plaît" to get their attention (don\'t shout or wave). Always greet with "bonjour" before ordering!',
        phrases: [
          { french: 'Une table pour deux, s\'il vous plaît.', english: 'A table for two, please.', context: 'Requesting a table — specify number of people', register: 'formal' },
          { french: 'La carte, s\'il vous plaît.', english: 'The menu, please.', context: '"La carte" is the menu; "le menu" is the fixed-price meal!', register: 'formal' },
          { french: 'Je voudrais... / Je vais prendre...', english: 'I would like... / I\'ll have...', context: '"Je voudrais" is polite; "je vais prendre" is direct but also fine', register: 'formal' },
          { french: 'C\'était délicieux !', english: 'That was delicious!', context: 'Compliment the chef — always appreciated', register: 'neutral' },
          { french: 'L\'addition, s\'il vous plaît.', english: 'The bill, please.', context: 'You must ask for the bill — it won\'t come automatically in France', register: 'formal' },
        ],
      },
    ],
  },
  {
    id: 'social',
    label: 'Social Situations',
    emoji: '🎭',
    icon: MessageCircle,
    items: [
      {
        id: 'small-talk',
        emoji: '💬',
        title: 'Small Talk',
        subtitle: 'Keeping the conversation going',
        tip: 'French small talk often revolves around food, culture, and local life. Avoid asking about salary or personal finances — these are considered private topics in French culture.',
        phrases: [
          { french: 'Comment allez-vous ? / Ça va ?', english: 'How are you? (formal / informal)', context: '"Ça va?" literally means "it goes?" — very common casual opener', register: 'both' },
          { french: 'Ça va bien, merci. Et vous ?', english: 'I\'m doing well, thanks. And you?', context: 'Always return the question — it\'s expected and polite', register: 'neutral' },
          { french: 'Quel temps fait-il ?', english: 'What\'s the weather like?', context: 'Classic conversation starter — the French love discussing weather', register: 'neutral' },
          { french: 'C\'est vraiment intéressant !', english: 'That\'s really interesting!', context: 'Show genuine engagement in conversation', register: 'neutral' },
          { french: 'Je ne suis pas d\'accord.', english: 'I don\'t agree.', context: 'The French enjoy intellectual debate — don\'t be afraid to disagree politely', register: 'neutral' },
        ],
      },
      {
        id: 'expressing-feelings',
        emoji: '❤️',
        title: 'Expressing Feelings',
        subtitle: 'How to share what you think and feel',
        tip: 'French is a very expressive language. Using adjectives and adverbs richly (vraiment, tellement, absolument) makes you sound more fluent and natural.',
        phrases: [
          { french: 'J\'adore ça !', english: 'I love that! / I absolutely love it!', context: 'Stronger than "j\'aime" — shows real enthusiasm', register: 'neutral' },
          { french: 'Je n\'aime pas trop...', english: 'I\'m not really a fan of...', context: 'Softer than "je n\'aime pas" — politely expressing dislike', register: 'neutral' },
          { french: 'C\'est magnifique !', english: 'It\'s magnificent! / It\'s gorgeous!', context: 'High praise — for views, food, art, people', register: 'neutral' },
          { french: 'Je suis épuisé(e).', english: 'I\'m exhausted.', context: 'More expressive than "fatigué(e)" (tired)', register: 'neutral' },
          { french: 'Ça m\'énerve.', english: 'That annoys me. / That gets on my nerves.', context: 'Honest expression of mild frustration', register: 'informal' },
        ],
      },
      {
        id: 'phone-digital',
        emoji: '📱',
        title: 'Phone & Digital',
        subtitle: 'Modern French for calls and messages',
        tip: 'French phone etiquette: answer with "Allô?" not "Bonjour". When leaving a message, speak slowly and clearly — spell out names if needed using the French alphabet.',
        phrases: [
          { french: 'Allô ?', english: 'Hello? (on the phone)', context: 'Only used when answering the phone — never in person', register: 'neutral' },
          { french: 'Qui est à l\'appareil ?', english: 'Who\'s calling?', context: 'Formal way to ask who\'s calling', register: 'formal' },
          { french: 'Pouvez-vous rappeler plus tard ?', english: 'Can you call back later?', context: 'Polite way to end or defer a call', register: 'formal' },
          { french: 'Quel est votre numéro ?', english: 'What\'s your number?', context: 'Asking for contact details', register: 'formal' },
          { french: 'Je vous envoie un message.', english: 'I\'ll send you a message.', context: 'Common in modern French life — can mean text or email', register: 'formal' },
        ],
      },
    ],
  },
]

const REGISTER_COLORS = {
  formal: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  informal: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300',
  both: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
}

const SECTION_COLORS = {
  greetings: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  everyday: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  social: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
}

function PhrasesArticle({ item }) {
  return (
    <div className="space-y-3">
      {item.phrases.map((ph, i) => (
        <div key={i} className="bg-white dark:bg-dark-warm-200 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-burgundy-700 dark:text-burgundy-400 text-base">{ph.french}</span>
              <SpeakButton text={ph.french} size="sm" variant="ghost" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${REGISTER_COLORS[ph.register]}`}>
              {ph.register}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 italic">"{ph.english}"</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-2">
            💡 {ph.context}
          </p>
        </div>
      ))}
    </div>
  )
}

function ItemArticle({ item, sectionId }) {
  return (
    <article>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${SECTION_COLORS[sectionId]}`}>
          {sectionId === 'greetings' ? 'Greetings' : sectionId === 'everyday' ? 'Everyday' : 'Social'}
        </span>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300">
          {item.phrases.length} phrases
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {item.emoji} {item.title}
      </h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-medium mb-2">{item.subtitle}</p>

      <div className="flex flex-wrap gap-2 mb-6 text-xs">
        <span className={`px-2 py-0.5 rounded-full font-bold ${REGISTER_COLORS.formal}`}>formal</span>
        <span className={`px-2 py-0.5 rounded-full font-bold ${REGISTER_COLORS.informal}`}>informal</span>
        <span className={`px-2 py-0.5 rounded-full font-bold ${REGISTER_COLORS.neutral}`}>neutral</span>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-6" />

      <PhrasesArticle item={item} />

      <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-4 flex gap-3">
        <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Cultural Tip</p>
          <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">{item.tip}</p>
        </div>
      </div>
    </article>
  )
}

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="text-6xl mb-6">💬</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversation Practice</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-4">Pratique de conversation</p>
      <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
        Real phrases for real situations. From first greetings to restaurant orders, master the French conversations you\'ll actually need.
      </p>
      <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm w-full">
        {[
          { emoji: '👋', label: 'Greetings & Introductions', count: 3 },
          { emoji: '☕', label: 'Everyday Phrases', count: 3 },
          { emoji: '🎭', label: 'Social Situations', count: 3 },
        ].map(({ emoji, label, count }) => (
          <div key={label} className="bg-white dark:bg-dark-warm-100 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
            <div className="text-2xl mb-1">{emoji}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">{label}</p>
            <p className="text-xs font-bold text-gray-400 mt-1">{count} topics</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-8 flex items-center gap-2">
        <span>←</span> Pick a topic from the sidebar to start
      </p>
    </div>
  )
}

export default function Conversation() {
  const [activeId, setActiveId] = useState(null)
  const [openSections, setOpenSections] = useState(
    Object.fromEntries(SECTIONS.map(s => [s.id, true]))
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSection = id => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
  const handleSelect = id => { setActiveId(id); setSidebarOpen(false) }

  let activeItem = null
  let activeSectionId = null
  for (const section of SECTIONS) {
    const found = section.items.find(it => it.id === activeId)
    if (found) { activeItem = found; activeSectionId = section.id; break }
  }

  return (
    <>
      <SEO
        title="French Conversation Practice — Real Phrases for Real Situations | SayBonjour!"
        description="Master French conversation with phrases for greetings, everyday situations, restaurants, phone calls, and social settings. Audio pronunciation included."
        keywords="french conversation, french phrases, learn french conversation, french greetings, french expressions, speak french, french dialogue"
        url="/conversation"
      />

      <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300 flex relative">

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <aside className={`fixed lg:sticky top-0 lg:top-20 left-0 h-screen lg:h-[calc(100vh-5rem)] w-60 bg-white dark:bg-dark-warm-100 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-40 lg:z-auto transition-transform duration-300 flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>

          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-700 lg:hidden">
            <span className="font-bold text-gray-900 dark:text-white text-sm">Topics</span>
            <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-warm-200">
              <X size={16} />
            </button>
          </div>

          <nav className="p-3 pt-4">
            {SECTIONS.map(section => {
              const Icon = section.icon
              return (
                <div key={section.id} className="mb-1">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{section.emoji}</span>
                      <span className="text-gray-800 dark:text-gray-200 text-left leading-snug">{section.label}</span>
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 flex-shrink-0 ml-1 transition-transform duration-200 ${openSections[section.id] ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {openSections[section.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-1 mt-0.5 space-y-0.5 pb-2">
                          {section.items.map(item => (
                            <button
                              key={item.id}
                              onClick={() => handleSelect(item.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors flex items-center gap-2 ${
                                activeId === item.id
                                  ? 'bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300 font-semibold'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-warm-200 hover:text-gray-900 dark:hover:text-gray-100'
                              }`}
                            >
                              <span className="flex-shrink-0">{item.emoji}</span>
                              <span className="leading-snug">{item.title}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            <div className="mt-4 mx-1 rounded-xl bg-gray-50 dark:bg-dark-warm-200 border border-gray-100 dark:border-gray-700 p-3">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                <Star size={11} className="text-amber-500" /> Conversation Tip
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Click the speaker icon 🔊 on any phrase to hear how it sounds. Listening and repeating is the fastest way to build confidence!
              </p>
            </div>
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="lg:hidden sticky top-20 z-20 bg-white dark:bg-dark-warm-100 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-burgundy-600 dark:hover:text-burgundy-400 flex-shrink-0"
            >
              <Menu size={17} /> <span>Topics</span>
            </button>
            {activeItem && (
              <>
                <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{activeItem.title}</span>
              </>
            )}
          </div>

          <div className="px-6 py-10 lg:px-12 lg:py-10 max-w-2xl">
            <AnimatePresence mode="wait">
              {!activeId ? (
                <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Welcome />
                </motion.div>
              ) : (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <ItemArticle item={activeItem} sectionId={activeSectionId} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  )
}
