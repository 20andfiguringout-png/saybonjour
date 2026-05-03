import React, { useState } from 'react'
import { Mic, Volume2, BookOpen, ChevronDown, Menu, X, Star, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const SECTIONS = [
  {
    id: 'sounds',
    label: 'French Sounds',
    emoji: '🔊',
    icon: Volume2,
    items: [
      {
        id: 'vowels',
        emoji: '🅰️',
        title: 'French Vowels',
        subtitle: 'Pure, consistent vowel sounds unlike English',
        tip: 'French vowels are "pure" — they don\'t glide or change shape. Hold each vowel steady from start to finish.',
        examples: [
          { sound: 'A', ipa: '/a/', example: 'chat', translation: 'cat', note: 'Like "ah" in "father", never like "ay" in "day"' },
          { sound: 'E', ipa: '/e/ or /ɛ/', example: 'été / être', translation: 'summer / to be', note: 'Closed "e" (été) vs open "è" (être) — the accent matters!' },
          { sound: 'I', ipa: '/i/', example: 'vie', translation: 'life', note: 'Like "ee" in "see", held steady without gliding' },
          { sound: 'O', ipa: '/o/ or /ɔ/', example: 'eau / or', translation: 'water / gold', note: 'Closed (eau) vs open (or) — French distinguishes these carefully' },
          { sound: 'U', ipa: '/y/', example: 'lune', translation: 'moon', note: 'No English equivalent! Round your lips for "ee" then say "oo"' },
        ],
      },
      {
        id: 'nasals',
        emoji: '👃',
        title: 'Nasal Vowels',
        subtitle: 'The sounds that make French unmistakably French',
        tip: 'Nasal vowels are produced by letting air flow through both the mouth and nose. Don\'t pronounce the final "n" — it just nasalises the vowel.',
        examples: [
          { sound: 'AN/EN', ipa: '/ɑ̃/', example: 'dans, enfant', translation: 'in, child', note: 'Low nasal — like "on" but deeper, through the nose' },
          { sound: 'IN/AIN', ipa: '/ɛ̃/', example: 'vin, main', translation: 'wine, hand', note: 'High nasal — like "an" but nasal. The most common nasal vowel' },
          { sound: 'ON', ipa: '/ɔ̃/', example: 'bon, son', translation: 'good, his/her', note: 'Round nasal — lips rounded like "o" but nasal' },
          { sound: 'UN', ipa: '/œ̃/', example: 'un, brun', translation: 'one, brown', note: 'Becoming rare — many speakers merge it with IN/AIN' },
        ],
      },
      {
        id: 'consonants',
        emoji: '🔤',
        title: 'Tricky Consonants',
        subtitle: 'Key consonants that differ from English',
        tip: 'French "r" is the biggest challenge for English speakers. Practice gargling gently at the back of your throat — that\'s the right area!',
        examples: [
          { sound: 'R', ipa: '/ʁ/', example: 'rouge, Paris', translation: 'red, Paris', note: 'Uvular "r" — made at the back of the throat, not the front like English' },
          { sound: 'L', ipa: '/l/', example: 'belle, île', translation: 'beautiful, island', note: 'Keep the tongue tip touching the teeth, never allow it to pull back' },
          { sound: 'GN', ipa: '/ɲ/', example: 'montagne, champagne', translation: 'mountain, champagne', note: 'Like the "ny" in "canyon" — a single palatal sound' },
          { sound: 'J/G', ipa: '/ʒ/', example: 'je, bonjour', translation: 'I, hello', note: 'Like the "s" in "measure" — soft and buzzing' },
          { sound: 'H', ipa: 'silent or /h/', example: 'heure, hibou', translation: 'hour, owl', note: 'Usually silent (heure) but can block liaison when "aspirate" (hibou)' },
        ],
      },
    ],
  },
  {
    id: 'accents',
    label: 'Accents & Marks',
    emoji: '✍️',
    icon: BookOpen,
    items: [
      {
        id: 'accent-aigu',
        emoji: '´',
        title: 'Accent Aigu (é)',
        subtitle: 'The most common French accent',
        tip: 'The accent aigu always makes a closed "ay" sound. When you see é, you always know exactly how to pronounce it — no guessing!',
        examples: [
          { sound: 'é', ipa: '/e/', example: 'café, été, école', translation: 'coffee, summer, school', note: 'Always pronounced as a closed "ay" sound' },
          { sound: 'ée', ipa: '/e/', example: 'journée, entrée', translation: 'day, entrance/entrée', note: 'The double e ending is very common for feminine nouns' },
          { sound: '-er verbs', ipa: '/e/', example: 'parler, manger', translation: 'to speak, to eat', note: 'Infinitive endings -er are also pronounced like é' },
        ],
      },
      {
        id: 'accent-grave',
        emoji: '`',
        title: 'Accent Grave (è, à, ù)',
        subtitle: 'Opens the vowel sound',
        tip: 'On "e", the grave accent opens the sound. On "a" and "u" it distinguishes meaning (à = to/at, a = has) but doesn\'t change pronunciation.',
        examples: [
          { sound: 'è', ipa: '/ɛ/', example: 'père, mère, frère', translation: 'father, mother, brother', note: 'Open "e" — like the "e" in "bed" or "set"' },
          { sound: 'à', ipa: '/a/', example: 'à Paris, voilà', translation: 'in Paris, there it is', note: 'Same sound as "a" — accent is purely grammatical here' },
          { sound: 'ù', ipa: '/y/', example: 'où', translation: 'where', note: 'Only one word uses ù — to distinguish from ou (or)' },
        ],
      },
      {
        id: 'liaison',
        emoji: '🔗',
        title: 'Liaison & Élision',
        subtitle: 'How French words connect together',
        tip: 'Liaison is what gives French its flowing, melodic quality. Think of it as words \'melting\' into each other — the final consonant of one word attaches to the next vowel.',
        examples: [
          { sound: 'Mandatory liaison', ipa: 'required', example: 'les enfants → /le.zɑ̃.fɑ̃/', translation: 'the children', note: 'After articles, pronouns, adjectives before nouns — always link!' },
          { sound: 'Optional liaison', ipa: 'stylistic', example: 'vous avez → /vu.za.ve/', translation: 'you have', note: 'More formal speech uses more liaisons. It signals register' },
          { sound: 'Élision', ipa: 'required', example: "le enfant → l'enfant", translation: 'the child', note: 'Drop the vowel before another vowel: le, la, de, je, me, te, se, ce, ne, que' },
        ],
      },
    ],
  },
  {
    id: 'rhythm',
    label: 'Rhythm & Intonation',
    emoji: '🎵',
    icon: Mic,
    items: [
      {
        id: 'stress',
        emoji: '💪',
        title: 'Word Stress',
        subtitle: 'French stresses the last syllable — always',
        tip: 'Unlike English where stress can fall anywhere and changes meaning (REcord vs reCORD), French always stresses the final syllable of a phrase. This makes rhythm very regular.',
        examples: [
          { sound: 'bonjour', ipa: 'bon-JOUR', example: 'bonjour', translation: 'hello', note: 'Stress always on the last syllable: bon-JOUR not BON-jour' },
          { sound: 'Paris', ipa: 'pa-RI', example: 'Paris', translation: 'Paris', note: 'English says "PAR-is", French says "pa-RI" — completely different!' },
          { sound: 'Phrase stress', ipa: 'last syllable', example: 'Je parle français', translation: 'I speak French', note: 'Only the last syllable of the whole phrase gets stressed: fran-ÇAIS' },
        ],
      },
      {
        id: 'intonation',
        emoji: '📈',
        title: 'Rising & Falling Tones',
        subtitle: 'How intonation changes meaning',
        tip: 'French uses rising intonation for unfinished thoughts and questions (without inversion), and falling intonation for statements. This melody is what makes French sound so musical.',
        examples: [
          { sound: 'Statement', ipa: 'falling ↘', example: 'Il fait beau.', translation: 'The weather is nice.', note: 'Pitch falls at the end — this is complete information' },
          { sound: 'Yes/No question', ipa: 'rising ↗', example: 'Il fait beau?', translation: 'Is the weather nice?', note: 'Same words, but pitch rises — instantly signals a question' },
          { sound: 'Rhythm groups', ipa: 'rise-fall', example: 'Je vais au marché / acheter du pain', translation: 'I\'m going to the market / to buy bread', note: 'French groups words into chunks, each ending in a slight rise except the last' },
        ],
      },
      {
        id: 'elision-practice',
        emoji: '🌊',
        title: 'Flowing Speech',
        subtitle: 'The secret to sounding natural',
        tip: 'Native French speakers link words together into smooth streams. Don\'t pause between every word — instead, group them into flowing phrases called "groupes rythmiques".',
        examples: [
          { sound: 'Slow learner', ipa: 'choppy', example: 'Je / vais / à / la / boulangerie', translation: 'I / am / going / to / the / bakery', note: 'Word-by-word speech sounds robotic and foreign' },
          { sound: 'Natural speaker', ipa: 'flowing', example: 'Jevaisàlaboulangerie', translation: 'Going to the bakery', note: 'Words flow together — groupes: "je vais" + "à la boulangerie"' },
          { sound: 'Enchaînement', ipa: 'linking', example: 'elle est arrivée → /e.le.ta.ri.ve/', translation: 'she arrived', note: 'Even without liaison, a final consonant links to the next vowel' },
        ],
      },
    ],
  },
]

const SECTION_COLORS = {
  sounds: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  accents: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  rhythm: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
}

function ExamplesTable({ item }) {
  return (
    <div className="space-y-3">
      {item.examples.map((ex, i) => (
        <div key={i} className="bg-white dark:bg-dark-warm-200 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-lg font-bold text-burgundy-700 dark:text-burgundy-400 font-mono">{ex.sound}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-mono">{ex.ipa}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800 dark:text-gray-200 italic">{ex.example}</span>
            <SpeakButton text={ex.example} size="sm" variant="ghost" />
            <span className="text-sm text-gray-500 dark:text-gray-400">— {ex.translation}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">{ex.note}</p>
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
          {sectionId === 'sounds' ? 'French Sounds' : sectionId === 'accents' ? 'Accents & Marks' : 'Rhythm & Intonation'}
        </span>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300">
          {item.examples.length} examples
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {item.emoji} {item.title}
      </h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-medium mb-6">{item.subtitle}</p>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-6" />

      <ExamplesTable item={item} />

      <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-4 flex gap-3">
        <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Pronunciation Tip</p>
          <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">{item.tip}</p>
        </div>
      </div>
    </article>
  )
}

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="text-6xl mb-6">🎙️</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pronunciation Guide</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-4">Guide de prononciation</p>
      <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
        Master French sounds, accents, and rhythm. From nasal vowels to the famous French "r" — learn to sound like a native speaker.
      </p>
      <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm w-full">
        {[
          { emoji: '🔊', label: 'French Sounds', count: 3 },
          { emoji: '✍️', label: 'Accents & Marks', count: 3 },
          { emoji: '🎵', label: 'Rhythm & Intonation', count: 3 },
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

export default function Pronunciation() {
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
        title="French Pronunciation Guide — Sounds, Accents & Rhythm | SayBonjour!"
        description="Master French pronunciation with our complete guide to French sounds, vowels, nasal sounds, accents, liaison, and intonation patterns."
        keywords="french pronunciation, french sounds, french vowels, nasal vowels, french accents, liaison, french intonation, learn french pronunciation"
        url="/pronunciation"
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
                <Star size={11} className="text-amber-500" /> Quick Fact
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                French has 16 distinct vowel sounds compared to English's 12-15, including 4 nasal vowels found in very few other languages.
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
