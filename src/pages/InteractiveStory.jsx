import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, ChevronRight, ChevronDown, ArrowLeft, Star, Menu, X } from 'lucide-react'
import { stories } from '../data/storyData'
import { addXP } from '../utils/progress'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const extractFrench = (agentLine) => {
  const match = agentLine?.match(/"([^"]+)"/)
  return match ? match[1] : agentLine
}

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  A2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  B1: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
}

const LEVELS = ['A1', 'A2', 'B1']

function buildSections() {
  return LEVELS.map(level => ({
    id: level,
    items: stories
      .filter(s => s.level === level)
      .map(s => ({ id: s.id, label: s.title, emoji: s.coverEmoji, data: s })),
  })).filter(s => s.items.length > 0)
}

const NAV_SECTIONS = buildSections()

function StoryPlayer({ story }) {
  const [nodeId, setNodeId] = useState('start')
  const [history, setHistory] = useState([])
  const [totalXP, setTotalXP] = useState(0)
  const [finished, setFinished] = useState(false)

  const node = story.nodes[nodeId]

  const handleChoice = (choice) => {
    setHistory(h => [...h, nodeId])
    const xp = choice.xp || 0
    setTotalXP(x => x + xp)
    addXP(xp, 'interactive_story')
    if (story.nodes[choice.next]?.isEnd) {
      setNodeId(choice.next)
      setFinished(true)
      addXP(20, 'story_complete')
      setTotalXP(x => x + 20)
    } else {
      setNodeId(choice.next)
    }
  }

  const handleBack = () => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setHistory(h => h.slice(0, -1))
    setNodeId(prev)
    setFinished(false)
  }

  const handleRestart = () => {
    setNodeId('start')
    setHistory([])
    setTotalXP(0)
    setFinished(false)
  }

  return (
    <div>
      {/* XP + step counter */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Step {history.length + 1} · {story.intro}
        </span>
        <span className="text-sm text-amber-600 dark:text-amber-400 font-bold">⚡ {totalXP} XP</span>
      </div>

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={nodeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed text-[15px]">{node.text}</p>

          {/* Agent dialogue */}
          {node.agent && (
            <div className="bg-gray-50 dark:bg-dark-warm-200 rounded-xl px-5 py-4 mb-5 border-l-4 border-burgundy-400 flex items-center justify-between gap-3">
              <p className="text-gray-800 dark:text-gray-100 text-sm font-medium italic flex-1">{node.agent}</p>
              <div onClick={e => e.stopPropagation()}>
                <SpeakButton text={extractFrench(node.agent)} size="sm" variant="ghost" />
              </div>
            </div>
          )}

          {/* Tip */}
          {node.tip && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl px-4 py-3 mb-5 border border-amber-200 dark:border-amber-700/40 text-xs text-amber-700 dark:text-amber-300">
              {node.tip}
            </div>
          )}

          {/* End screen */}
          {finished && node.endMessage && (
            <motion.div
              className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 mb-5 border border-emerald-200 dark:border-emerald-700/40 text-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-emerald-800 dark:text-emerald-300 font-semibold text-sm mb-2">{node.endMessage}</p>
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">+{totalXP} XP total earned!</p>
            </motion.div>
          )}

          {/* Choices */}
          {!finished && node.choices.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Your response:</p>
              <div className="space-y-2">
                {node.choices.map((choice, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleChoice(choice)}
                    className="w-full text-left px-4 py-3.5 rounded-xl text-sm bg-white dark:bg-dark-warm-200 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-burgundy-400 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20 transition-all group"
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="leading-snug">{choice.label}</span>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <span className="text-xs text-amber-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">+{choice.xp} XP</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-burgundy-500 transition-colors" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Play again */}
          {finished && (
            <button
              onClick={handleRestart}
              className="w-full mt-4 py-3 bg-burgundy-600 text-cream-50 rounded-xl text-sm font-bold hover:bg-burgundy-700 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Go back to previous node */}
      {history.length > 0 && !finished && (
        <button
          onClick={handleBack}
          className="mt-5 flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Go back
        </button>
      )}
    </div>
  )
}

function StoryArticle({ story }) {
  return (
    <article>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_COLORS[story.level]}`}>
          {story.level}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-1">
        <span className="text-4xl">{story.coverEmoji}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{story.title}</h1>
          <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold italic">{story.englishTitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-5 mb-6 pb-5 border-b border-gray-200 dark:border-gray-700 flex-wrap">
        <span className="flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400 font-semibold">
          <Star className="w-4 h-4" /> XP for every choice
        </span>
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Branching scenario</span>
      </div>

      <StoryPlayer key={story.id} story={story} />
    </article>
  )
}

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="text-6xl mb-6">🗺️</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Path</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-4">Choisissez votre aventure</p>
      <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
        Live immersive French scenarios. Every choice you make earns XP and teaches real conversational French.
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-8 flex items-center gap-2">
        <span>←</span>
        <span>Select a story from the sidebar to begin</span>
      </p>
    </div>
  )
}

export default function InteractiveStory() {
  const [activeId, setActiveId] = useState(null)
  const [openSections, setOpenSections] = useState(
    Object.fromEntries(LEVELS.map(l => [l, true]))
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSection = id =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  const handleSelect = id => {
    setActiveId(id)
    setSidebarOpen(false)
  }

  const activeStory = stories.find(s => s.id === activeId) || null

  return (
    <>
      <SEO
        title="Interactive French Stories — Learn French Through Reading | SayBonjour!"
        description="Practise French in context with branching interactive stories. Make choices that shape the plot, encounter real vocabulary in use, and improve your reading comprehension naturally."
        keywords="interactive french stories, learn french reading, french comprehension, french story for learners, french graded readers, immersive french learning"
        url="/stories"
      />

      <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300 flex relative">

        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-20 left-0 h-screen lg:h-[calc(100vh-5rem)] w-60 bg-white dark:bg-dark-warm-100 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-40 lg:z-auto transition-transform duration-300 flex-shrink-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Mobile close */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-700 lg:hidden">
            <span className="font-bold text-gray-900 dark:text-white text-sm">Choose a Story</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-warm-200"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="p-3 pt-4">
            {/* Stories by level */}
            {NAV_SECTIONS.map(({ id, items }) => (
              <div key={id} className="mb-1">
                <button
                  onClick={() => toggleSection(id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${LEVEL_COLORS[id]}`}>{id}</span>
                    <span className="text-gray-700 dark:text-gray-200">
                      {items.length} {items.length === 1 ? 'story' : 'stories'}
                    </span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${openSections[id] ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openSections[id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-1 mt-0.5 space-y-0.5 pb-1">
                        {items.map(item => (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                              activeId === item.id
                                ? 'bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300 font-semibold'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-warm-200 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                          >
                            <span className="text-base leading-none">{item.emoji}</span>
                            <span className="leading-snug">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Coming soon */}
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <p className="px-3 py-1.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Coming Soon</p>
              <div className="px-3 py-2 rounded-lg flex items-center gap-2 opacity-50 cursor-not-allowed">
                <span className="text-base">🛒</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">Shopping in France</span>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile breadcrumb */}
          <div className="lg:hidden sticky top-20 z-20 bg-white dark:bg-dark-warm-100 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-burgundy-600 dark:hover:text-burgundy-400 flex-shrink-0"
            >
              <Menu size={17} />
              <span>Stories</span>
            </button>
            {activeStory && (
              <>
                <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{activeStory.title}</span>
              </>
            )}
          </div>

          <div className="px-6 py-10 lg:px-12 lg:py-10 max-w-3xl">
            <AnimatePresence mode="wait">
              {!activeId ? (
                <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Welcome />
                </motion.div>
              ) : (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StoryArticle story={activeStory} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  )
}
