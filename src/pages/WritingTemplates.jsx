import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, FileText, BookOpen, Copy, CheckCheck, ChevronDown, Menu, X } from 'lucide-react'
import SEO from '../components/SEO'
import { letterTemplates, essayStructures, usefulConnectors } from '../data/writingData'
import { getContent } from '../utils/contentStore'
const emailTemplates = getContent('writing')

const LEVEL_COLORS = {
  A1: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  A2: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  B1: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  B2: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  C1: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

const REGISTER_COLORS = {
  Formal: 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300',
  Informal: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
}

const NAV_SECTIONS = [
  {
    id: 'emails',
    label: 'Emails',
    icon: Mail,
    items: emailTemplates.map(t => ({ id: t.id, label: t.title, data: t, type: 'template' })),
  },
  {
    id: 'letters',
    label: 'Letters',
    icon: FileText,
    items: letterTemplates.map(t => ({ id: t.id, label: t.title, data: t, type: 'template' })),
  },
  {
    id: 'essays',
    label: 'Essays',
    icon: BookOpen,
    items: [
      ...essayStructures.map(e => ({ id: e.id, label: e.title, data: e, type: 'essay' })),
      { id: 'connectors', label: 'Useful Connectors', data: null, type: 'connectors' },
    ],
  },
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-warm-200 transition-all"
    >
      {copied
        ? <><CheckCheck size={14} className="text-green-500" /> Copied!</>
        : <><Copy size={14} /> Copy template</>}
    </button>
  )
}

function TemplateArticle({ item }) {
  return (
    <article>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${LEVEL_COLORS[item.level]}`}>{item.level}</span>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${REGISTER_COLORS[item.register]}`}>{item.register}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{item.title}</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-5">{item.titleFr}</p>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated : May 2026</span>
        <CopyButton text={item.template} />
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-[15px]">{item.context}</p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Template</h2>
      <pre className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-dark-warm-200 rounded-xl p-5 whitespace-pre-wrap font-mono leading-relaxed border border-gray-200 dark:border-gray-600 overflow-x-auto mb-6">
        {item.template}
      </pre>

      {item.notes && (
        <div className="mb-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-4">
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">📌 {item.notes}</p>
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Key Phrases ({item.keyPhrases.length})</h2>
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {item.keyPhrases.map((ph, i) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 px-5 py-3.5 ${
              i < item.keyPhrases.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
            } ${i % 2 === 0 ? 'bg-white dark:bg-dark-warm-100' : 'bg-gray-50 dark:bg-dark-warm-200'}`}
          >
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{ph.fr}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:max-w-[50%]">{ph.en}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

function EssayArticle({ essay }) {
  const [expandedPart, setExpandedPart] = useState(null)
  return (
    <article>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${LEVEL_COLORS[essay.level]}`}>{essay.level}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">{essay.title}</h1>

      <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated : May 2026</span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-[15px]">{essay.context}</p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Essay Structure</h2>
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {essay.structure.map((part, pi) => (
          <div key={pi} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
            <button
              onClick={() => setExpandedPart(expandedPart === pi ? null : pi)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-burgundy-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                  {pi + 1}
                </span>
                <div className="text-left">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{part.part}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{part.label}</p>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${expandedPart === pi ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {expandedPart === pi && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-2 bg-gray-50 dark:bg-dark-warm-200">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{part.description}</p>
                    <div className="space-y-2">
                      {part.phrases.map((ph, phi) => (
                        <div key={phi} className="bg-white dark:bg-dark-warm-100 rounded-lg px-4 py-2.5 border border-gray-100 dark:border-gray-600">
                          <p className="text-sm text-gray-800 dark:text-gray-200">{ph}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </article>
  )
}

function ConnectorsArticle() {
  return (
    <article>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Useful Connectors</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-5">Connecteurs utiles</p>
      <div className="flex items-center mb-6 pb-5 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated : May 2026</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-[15px]">
        Linking words and phrases to make your French writing flow naturally. Use these to connect ideas, show contrast, give examples, and conclude.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {usefulConnectors.map((c, i) => (
          <div key={i} className="bg-white dark:bg-dark-warm-100 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow">
            <p className="text-xs font-bold text-burgundy-600 dark:text-burgundy-400 uppercase tracking-wide mb-1.5">{c.category}</p>
            <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{c.fr}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{c.en}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="text-6xl mb-6">✍️</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Writing Templates</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-4">Modèles d'écriture</p>
      <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
        Ready-to-use templates for French emails, formal letters, and academic essays — with key phrases, structural guides, and cultural tips.
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-8 flex items-center gap-2">
        <span>←</span>
        <span>Select a template from the sidebar to get started</span>
      </p>
    </div>
  )
}

export default function WritingTemplates() {
  const [activeId, setActiveId] = useState(null)
  const [openSections, setOpenSections] = useState({ emails: true, letters: true, essays: true })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSection = (id) =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  const handleSelect = (id) => {
    setActiveId(id)
    setSidebarOpen(false)
  }

  let activeItem = null
  let activeType = null
  for (const section of NAV_SECTIONS) {
    for (const navItem of section.items) {
      if (navItem.id === activeId) {
        activeItem = navItem.data
        activeType = navItem.type
        break
      }
    }
    if (activeType) break
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO
        title="French Writing Templates — Emails, Letters & Essays | SayBonjour!"
        description="Practise French writing with structured templates for formal emails, personal letters, and DELF-style essays. Includes vocabulary connectors and copy-to-clipboard functionality."
        keywords="french writing templates, french email template, french letter template, french essay writing, DELF writing practice, formal french writing"
        url="/writing"
      />

      <div className="flex relative">

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
          {/* Mobile close button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-700 lg:hidden">
            <span className="font-bold text-gray-900 dark:text-white text-sm">Browse Templates</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-warm-200"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="p-3 pt-4">
            {NAV_SECTIONS.map(({ id, label, icon: Icon, items }) => (
              <div key={id} className="mb-1">
                <button
                  onClick={() => toggleSection(id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} className="text-gray-500 dark:text-gray-400" />
                    {label}
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
                        {items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors leading-snug ${
                              activeId === item.id
                                ? 'bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300 font-semibold'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-warm-200 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile breadcrumb bar */}
          <div className="lg:hidden sticky top-20 z-20 bg-white dark:bg-dark-warm-100 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-burgundy-600 dark:hover:text-burgundy-400 flex-shrink-0"
            >
              <Menu size={17} />
              <span>Templates</span>
            </button>
            {activeItem && (
              <>
                <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {activeItem.title || 'Useful Connectors'}
                </span>
              </>
            )}
          </div>

          <div className="px-6 py-10 lg:px-12 lg:py-10 max-w-3xl">
            <AnimatePresence mode="wait">
              {!activeId ? (
                <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Welcome />
                </motion.div>
              ) : activeType === 'template' ? (
                <motion.div key={activeId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <TemplateArticle item={activeItem} />
                </motion.div>
              ) : activeType === 'essay' ? (
                <motion.div key={activeId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <EssayArticle essay={activeItem} />
                </motion.div>
              ) : (
                <motion.div key="connectors" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <ConnectorsArticle />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
