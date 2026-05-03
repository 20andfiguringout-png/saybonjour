import React, { useState, useMemo } from 'react'
import { FileText, Download, Star, Clock, Users, BookOpen, Headphones, PenTool, Search, ChevronDown, Menu, X, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

// ─── Data ──────────────────────────────────────────────────────────────────────
const WORKSHEETS = [
  {
    id: 1,
    title: 'Essential Verb Conjugations',
    description: 'Complete conjugation charts for the most common French verbs in all tenses. An essential reference sheet for learners at every level.',
    category: 'grammar',
    level: 'Beginner',
    type: 'Verb Charts',
    pages: 8,
    downloads: 1250,
    rating: 4.9,
    preview: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    features: ['Present tense', 'Past tense', 'Future tense', 'Conditional', 'Subjunctive'],
    estimatedTime: '45 min',
  },
  {
    id: 4,
    title: 'Advanced Grammar Exercises',
    description: 'Complex grammar structures with detailed explanations and practice. Covers the subjunctive, literary tenses, and advanced sentence constructions.',
    category: 'grammar',
    level: 'Advanced',
    type: 'Grammar Exercises',
    pages: 15,
    downloads: 720,
    rating: 4.9,
    preview: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    features: ['Subjunctive mood', 'Complex tenses', 'Literary structures', 'Answer key'],
    estimatedTime: '90 min',
  },
  {
    id: 3,
    title: 'Travel Vocabulary Essentials',
    description: 'Must-know words and phrases for traveling in French-speaking countries. From the airport to the restaurant, you\'ll be prepared for every situation.',
    category: 'vocabulary',
    level: 'Intermediate',
    type: 'Vocabulary Lists',
    pages: 6,
    downloads: 1450,
    rating: 4.7,
    preview: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
    features: ['Airport terms', 'Hotel phrases', 'Restaurant vocabulary', 'Emergency expressions'],
    estimatedTime: '30 min',
  },
  {
    id: 6,
    title: 'Food & Cooking Vocabulary',
    description: 'Comprehensive guide to French culinary terms and cooking methods. Perfect for food lovers and anyone planning to cook or dine in France.',
    category: 'vocabulary',
    level: 'Beginner',
    type: 'Vocabulary Lists',
    pages: 8,
    downloads: 1100,
    rating: 4.8,
    preview: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop',
    features: ['Ingredients', 'Cooking verbs', 'Kitchen tools', 'Recipe vocabulary'],
    estimatedTime: '40 min',
  },
  {
    id: 7,
    title: 'Weather & Seasons Expressions',
    description: 'Learn to talk about weather, climate, and seasonal activities in French. Includes conversational phrases you\'ll use every day.',
    category: 'vocabulary',
    level: 'Beginner',
    type: 'Vocabulary Lists',
    pages: 5,
    downloads: 950,
    rating: 4.5,
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    features: ['Weather terms', 'Seasonal vocabulary', 'Climate expressions', 'Activities'],
    estimatedTime: '25 min',
  },
  {
    id: 8,
    title: 'Business French Essentials',
    description: 'Professional vocabulary and formal expressions for business contexts. Ideal for professionals working with French-speaking partners or clients.',
    category: 'vocabulary',
    level: 'Advanced',
    type: 'Vocabulary Lists',
    pages: 12,
    downloads: 650,
    rating: 4.7,
    preview: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop',
    features: ['Meeting vocabulary', 'Email phrases', 'Presentation terms', 'Negotiation language'],
    estimatedTime: '60 min',
  },
  {
    id: 2,
    title: 'French Pronunciation Guide',
    description: 'Audio exercises and phonetic charts to master French sounds. Includes minimal pairs and tongue twisters to sharpen your accent.',
    category: 'listening',
    level: 'Beginner',
    type: 'Listening Practice',
    pages: 12,
    downloads: 980,
    rating: 4.8,
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    features: ['IPA symbols', 'Audio links', 'Minimal pairs', 'Tongue twisters'],
    estimatedTime: '60 min',
  },
  {
    id: 5,
    title: 'French Listening Comprehension',
    description: 'Audio stories with comprehension questions and transcripts. Build your ear for authentic French speech at a natural pace.',
    category: 'listening',
    level: 'Intermediate',
    type: 'Listening Practice',
    pages: 10,
    downloads: 890,
    rating: 4.6,
    preview: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    features: ['Audio files', 'Transcripts', 'Questions', 'Cultural notes'],
    estimatedTime: '75 min',
  },
  {
    id: 9,
    title: 'French Dictation Exercises',
    description: 'Improve spelling and listening skills with graduated dictation practice. Includes progressive difficulty levels and full answer sheets.',
    category: 'listening',
    level: 'Intermediate',
    type: 'Listening Practice',
    pages: 7,
    downloads: 780,
    rating: 4.6,
    preview: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
    features: ['Audio dictations', 'Progressive difficulty', 'Answer sheets', 'Tips'],
    estimatedTime: '50 min',
  },
]

const CATEGORIES = [
  { id: 'grammar',    label: 'Grammar',    emoji: '📖', icon: BookOpen },
  { id: 'vocabulary', label: 'Vocabulary', emoji: '✏️', icon: PenTool },
  { id: 'listening',  label: 'Listening',  emoji: '🎧', icon: Headphones },
]

const LEVEL_COLORS = {
  Beginner:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Advanced:     'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
}

const CAT_COLORS = {
  grammar:    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  vocabulary: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  listening:  'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
}

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={12} className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'} />
      ))}
      <span className="ml-1 text-xs font-medium text-gray-600 dark:text-gray-400">{rating}</span>
    </span>
  )
}

// ─── Worksheet detail article ──────────────────────────────────────────────────
function WorksheetArticle({ worksheet, onDownload, downloading }) {
  return (
    <article>
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_COLORS[worksheet.level]}`}>{worksheet.level}</span>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CAT_COLORS[worksheet.category]}`}>{worksheet.type}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">{worksheet.title}</h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-5 mb-6 border-b border-gray-200 dark:border-gray-700">
        <span className="flex items-center gap-1.5"><FileText size={14} /> {worksheet.pages} pages</span>
        <span className="flex items-center gap-1.5"><Clock size={14} /> {worksheet.estimatedTime}</span>
        <span className="flex items-center gap-1.5"><Users size={14} /> {worksheet.downloads.toLocaleString()} downloads</span>
        <Stars rating={worksheet.rating} />
      </div>

      {/* Preview image */}
      <div className="rounded-2xl overflow-hidden mb-6 border border-gray-100 dark:border-gray-700">
        <img
          src={worksheet.preview}
          alt={worksheet.title}
          className="w-full h-52 object-cover"
        />
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-[15px]">{worksheet.description}</p>

      {/* What's included */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">What's included</h2>
        <ul className="space-y-2">
          {worksheet.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle size={15} className="text-emerald-500 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Download */}
      <button
        onClick={() => onDownload(worksheet)}
        disabled={downloading === worksheet.id}
        className="flex items-center gap-2.5 px-7 py-3.5 bg-burgundy-600 text-cream-50 rounded-xl font-semibold hover:bg-burgundy-700 disabled:opacity-60 transition-colors shadow-sm text-sm"
      >
        {downloading === worksheet.id ? (
          <>
            <div className="w-4 h-4 border-2 border-cream-50/40 border-t-cream-50 rounded-full animate-spin" />
            Preparing PDF…
          </>
        ) : (
          <>
            <Download size={16} /> Download PDF
          </>
        )}
      </button>

      {/* Tips */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">How to use this worksheet</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { emoji: '🖨️', title: 'Print quality', desc: 'Use high-quality paper and settings for the best experience.' },
            { emoji: '📅', title: 'Study schedule', desc: 'Estimated times are guidelines — take as long as you need.' },
            { emoji: '✅', title: 'Answer keys', desc: 'Most worksheets include answer keys to help you learn from mistakes.' },
          ].map(tip => (
            <div key={tip.title} className="bg-gray-50 dark:bg-dark-warm-200 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="text-xl mb-2">{tip.emoji}</div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{tip.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

// ─── Welcome / browse state ────────────────────────────────────────────────────
function Welcome({ total }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="text-6xl mb-6">📄</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Printable Worksheets</h1>
      <p className="text-burgundy-600 dark:text-burgundy-400 font-semibold mb-4">Ressources Imprimables</p>
      <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
        Download free PDF worksheets for offline practice. Perfect for students, teachers, and self-learners.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm w-full">
        {CATEGORIES.map(({ id, emoji, label }) => {
          const count = WORKSHEETS.filter(w => w.category === id).length
          return (
            <div key={id} className="bg-white dark:bg-dark-warm-100 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
              <div className="text-2xl mb-1">{emoji}</div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{count} sheets</p>
            </div>
          )
        })}
      </div>

      <p className="text-sm text-gray-400 dark:text-gray-500 mt-8 flex items-center gap-2">
        <span>←</span> Pick a worksheet from the sidebar to preview it
      </p>
    </div>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Worksheets() {
  const [activeId, setActiveId] = useState(null)
  const [openSections, setOpenSections] = useState({ grammar: true, vocabulary: true, listening: true })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [downloadingId, setDownloadingId] = useState(null)

  const toggleSection = id =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  const handleSelect = id => {
    setActiveId(id)
    setSidebarOpen(false)
  }

  const handleDownload = async (worksheet) => {
    setDownloadingId(worksheet.id)
    try {
      const pdf = `%PDF-1.4\n1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n2 0 obj\n<</Type/Pages/Kids[3 0 R]/Count 1>>\nendobj\n3 0 obj\n<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>\nendobj\n4 0 obj\n<</Length 200>>\nstream\nBT\n/F1 24 Tf\n50 750 Td\n(${worksheet.title}) Tj\n0 -50 Td\n/F1 12 Tf\n(${worksheet.description.slice(0, 60)}...) Tj\nET\nendstream\nendobj\n5 0 obj\n<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>\nendobj\nxref\n0 6\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\n0000000125 00000 n\n0000000348 00000 n\n0000000565 00000 n\ntrailer\n<</Size 6/Root 1 0 R>>\nstartxref\n625\n%%EOF`
      const blob = new Blob([pdf], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${worksheet.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    } finally {
      setDownloadingId(null)
    }
  }

  const filteredBySearch = useMemo(() =>
    search.trim()
      ? WORKSHEETS.filter(w =>
          w.title.toLowerCase().includes(search.toLowerCase()) ||
          w.description.toLowerCase().includes(search.toLowerCase())
        )
      : null
  , [search])

  const activeWorksheet = WORKSHEETS.find(w => w.id === activeId) || null

  return (
    <>
      <SEO
        title="Free French Worksheets — Grammar, Vocabulary & Pronunciation | SayBonjour!"
        description="Download free printable French worksheets covering verb conjugations, pronunciation, travel vocabulary, grammar exercises, and more."
        keywords="french worksheets, free french worksheets, printable french exercises, french grammar worksheets, learn french pdf"
        url="/worksheets"
      />

      <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300 flex relative">

        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* ── Sidebar ── */}
        <aside className={`fixed lg:sticky top-0 lg:top-20 left-0 h-screen lg:h-[calc(100vh-5rem)] w-64 bg-white dark:bg-dark-warm-100 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-40 lg:z-auto transition-transform duration-300 flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>

          {/* Mobile close */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-700 lg:hidden">
            <span className="font-bold text-gray-900 dark:text-white text-sm">Worksheets</span>
            <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-warm-200">
              <X size={16} />
            </button>
          </div>

          {/* Search */}
          <div className="p-3 pb-0">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search worksheets…"
                className="w-full pl-8 pr-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-dark-warm-200 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-burgundy-400 transition-colors"
              />
            </div>
          </div>

          <nav className="p-3 pt-3">
            {/* Search results */}
            {filteredBySearch && (
              <div className="mb-2">
                <p className="text-xs text-gray-400 dark:text-gray-500 px-2 mb-1">{filteredBySearch.length} result{filteredBySearch.length !== 1 ? 's' : ''}</p>
                <div className="space-y-0.5">
                  {filteredBySearch.length === 0 && (
                    <p className="text-xs text-gray-400 italic px-3 py-2">No worksheets found</p>
                  )}
                  {filteredBySearch.map(w => (
                    <button
                      key={w.id}
                      onClick={() => handleSelect(w.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                        activeId === w.id
                          ? 'bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300 font-semibold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-warm-200'
                      }`}
                    >
                      {w.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category sections (hidden when searching) */}
            {!filteredBySearch && CATEGORIES.map(cat => {
              const items = WORKSHEETS.filter(w => w.category === cat.id)
              return (
                <div key={cat.id} className="mb-1">
                  <button
                    onClick={() => toggleSection(cat.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{cat.emoji}</span>
                      <span className="text-[13px] font-bold text-gray-800 dark:text-gray-200">{cat.label}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{items.length}</span>
                    </span>
                    <ChevronDown size={13} className={`text-gray-400 transition-transform duration-200 ${openSections[cat.id] ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {openSections[cat.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-1 mt-0.5 space-y-0.5 pb-1">
                          {items.map(w => (
                            <button
                              key={w.id}
                              onClick={() => handleSelect(w.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                activeId === w.id
                                  ? 'bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300 font-semibold'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-warm-200 hover:text-gray-900 dark:hover:text-gray-100'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[13px] leading-snug">{w.title}</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${LEVEL_COLORS[w.level]}`}>
                                  {w.level[0]}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">
          {/* Mobile breadcrumb */}
          <div className="lg:hidden sticky top-20 z-20 bg-white dark:bg-dark-warm-100 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-burgundy-600 dark:hover:text-burgundy-400 flex-shrink-0"
            >
              <Menu size={17} /> <span>Worksheets</span>
            </button>
            {activeWorksheet && (
              <>
                <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{activeWorksheet.title}</span>
              </>
            )}
          </div>

          <div className="px-6 py-10 lg:px-12 lg:py-10 max-w-2xl">
            <AnimatePresence mode="wait">
              {!activeId ? (
                <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Welcome total={WORKSHEETS.length} />
                </motion.div>
              ) : (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <WorksheetArticle
                    worksheet={activeWorksheet}
                    onDownload={handleDownload}
                    downloading={downloadingId}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  )
}
