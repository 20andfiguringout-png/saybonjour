import React, { useState, useMemo } from 'react'
import { Search, BookOpen, ChevronDown, ChevronUp, Star, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { verbData, verbList } from '../data/conjugations'
import SEO from '../components/SEO'

const TENSES = [
  'présent',
  'passé composé',
  'imparfait',
  'futur simple',
  'conditionnel présent',
  'subjonctif présent',
  'impératif',
  'passé simple',
]

const PRONOUNS = ['je', 'tu', 'il', 'nous', 'vous', 'ils']
const IMPERATIVE_PRONOUNS = ['tu', 'nous', 'vous']

const tenseLabels = {
  'présent': 'Présent',
  'passé composé': 'Passé Composé',
  'imparfait': 'Imparfait',
  'futur simple': 'Futur Simple',
  'conditionnel présent': 'Conditionnel',
  'subjonctif présent': 'Subjonctif',
  'impératif': 'Impératif',
  'passé simple': 'Passé Simple (Literary)',
}

const tenseDescriptions = {
  'présent': 'Ongoing or habitual actions, states',
  'passé composé': 'Completed past actions',
  'imparfait': 'Past habits, background, ongoing past',
  'futur simple': 'Future actions and predictions',
  'conditionnel présent': 'Hypothetical, polite requests',
  'subjonctif présent': 'Doubt, emotion, obligation',
  'impératif': 'Commands and instructions',
  'passé simple': 'Narrative past (formal/literary)',
}

const groupColors = {
  '-er': 'bg-emerald-100 text-emerald-800',
  '-ir': 'bg-blue-100 text-blue-800',
  '-re': 'bg-purple-100 text-purple-800',
  'irregular': 'bg-amber-100 text-amber-800',
  'irregular -ir': 'bg-orange-100 text-orange-800',
  '-er (spelling)': 'bg-teal-100 text-teal-800',
}

const TenseTable = ({ tense, conjugations, irregular }) => {
  const pronounList = tense === 'impératif' ? IMPERATIVE_PRONOUNS : PRONOUNS

  return (
    <div className="overflow-hidden rounded-lg border border-cream-700">
      <table className="w-full text-sm">
        <tbody>
          {pronounList.map((pronoun, i) => {
            const form = conjugations[pronoun] || '—'
            const isIrregular = irregular?.some(f => form.includes(f))
            return (
              <tr key={pronoun} className={i % 2 === 0 ? 'bg-cream-50' : 'bg-white'}>
                <td className="px-3 py-2 text-burgundy-600 font-medium w-24 border-r border-cream-200">
                  {tense === 'impératif' ? pronoun : (pronoun === 'il' ? 'il/elle/on' : pronoun === 'ils' ? 'ils/elles' : pronoun)}
                </td>
                <td className={`px-3 py-2 font-medium ${isIrregular ? 'text-burgundy-700' : 'text-gray-800'}`}>
                  {form}
                  {isIrregular && (
                    <span className="ml-2 text-xs text-burgundy-500 font-normal">★</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const Conjugate = () => {
  const [search, setSearch] = useState('')
  const [selectedVerb, setSelectedVerb] = useState('avoir')
  const [expandedTenses, setExpandedTenses] = useState(['présent', 'passé composé', 'imparfait', 'futur simple'])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const verb = verbData[selectedVerb]

  const suggestions = useMemo(() => {
    if (!search || search.length < 1) return []
    return verbList.filter(v => v.startsWith(search.toLowerCase())).slice(0, 8)
  }, [search])

  const handleSelectVerb = (v) => {
    setSelectedVerb(v)
    setSearch(v)
    setShowSuggestions(false)
    setExpandedTenses(['présent', 'passé composé', 'imparfait', 'futur simple'])
  }

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase()
    setSearch(val)
    setShowSuggestions(true)
    if (verbData[val]) {
      setSelectedVerb(val)
    }
  }

  const toggleTense = (tense) => {
    setExpandedTenses(prev =>
      prev.includes(tense) ? prev.filter(t => t !== tense) : [...prev, tense]
    )
  }

  const expandAll = () => setExpandedTenses([...TENSES])
  const collapseAll = () => setExpandedTenses([])

  return (
    <>
      <SEO
        title="French Verb Conjugation Tool | SayBonjour"
        description="Look up conjugations for any French verb across all tenses — présent, passé composé, imparfait, futur, subjonctif and more."
        keywords="french verb conjugation, conjugate french verbs, french tenses, avoir conjugation, être conjugation"
        url="/conjugate"
      />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-burgundy-800 to-burgundy-600 text-cream-50 py-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-cream-50/20 text-cream-50 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Conjugation Tool
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                French Verb Conjugator
              </h1>
              <p className="text-cream-100 text-lg max-w-xl mx-auto mb-8">
                Look up any French verb — all tenses, all pronouns, irregular forms highlighted.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder="Type a verb (e.g. avoir, parler, aller...)"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-800 bg-white shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-burgundy-400"
                  />
                </div>
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-cream-200 z-50 overflow-hidden"
                    >
                      {suggestions.map(v => (
                        <button
                          key={v}
                          onMouseDown={() => handleSelectVerb(v)}
                          className="w-full text-left px-4 py-2.5 hover:bg-burgundy-50 text-gray-800 flex justify-between items-center text-sm"
                        >
                          <span className="font-medium">{v}</span>
                          <span className="text-gray-500 text-xs">{verbData[v]?.english}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Popular verbs quick-select */}
        <div className="bg-white border-b border-cream-200 py-3 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide mr-1">Popular:</span>
              {['avoir', 'être', 'aller', 'faire', 'pouvoir', 'vouloir', 'savoir', 'venir', 'parler', 'finir'].map(v => (
                <button
                  key={v}
                  onClick={() => handleSelectVerb(v)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedVerb === v
                      ? 'bg-burgundy-600 text-cream-50'
                      : 'bg-cream-100 text-burgundy-700 hover:bg-burgundy-100'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        {verb && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <motion.div
              key={selectedVerb}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Verb header */}
              <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-burgundy-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {verb.infinitive}
                      </h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${groupColors[verb.group] || 'bg-gray-100 text-gray-700'}`}>
                        {verb.group}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        #{verb.frequency} most common
                      </span>
                    </div>
                    <p className="text-lg text-gray-600 font-medium">{verb.english}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={expandAll}
                      className="text-xs px-3 py-1.5 bg-burgundy-50 text-burgundy-700 rounded-lg hover:bg-burgundy-100 transition-colors"
                    >
                      Expand all
                    </button>
                    <button
                      onClick={collapseAll}
                      className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Collapse all
                    </button>
                  </div>
                </div>

                {/* Notes */}
                {verb.notes && (
                  <div className="mt-4 flex gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{verb.notes}</p>
                  </div>
                )}

                {/* Irregular legend */}
                {verb.irregular?.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-burgundy-500 font-bold">★</span>
                    <span>Marks an irregular form</span>
                  </div>
                )}
              </div>

              {/* Tense grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TENSES.map(tense => {
                  const conjugations = verb.tenses[tense] || {}
                  const isExpanded = expandedTenses.includes(tense)
                  const hasData = Object.keys(conjugations).length > 0

                  return (
                    <motion.div
                      key={tense}
                      className="bg-white rounded-xl shadow-sm border border-cream-200 overflow-hidden"
                      layout
                    >
                      <button
                        onClick={() => toggleTense(tense)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-cream-50 transition-colors"
                      >
                        <div className="text-left">
                          <div className="font-semibold text-burgundy-800 text-sm">
                            {tenseLabels[tense]}
                          </div>
                          <div className="text-xs text-gray-500">
                            {tenseDescriptions[tense]}
                          </div>
                        </div>
                        <div className="text-burgundy-500 ml-2">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-4 pb-4">
                              {hasData ? (
                                <TenseTable
                                  tense={tense}
                                  conjugations={conjugations}
                                  irregular={verb.irregular}
                                />
                              ) : (
                                <p className="text-sm text-gray-400 italic py-2">
                                  This verb has no {tense} form.
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}

        {/* Browse all verbs */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">All Available Verbs</h3>
          <div className="flex flex-wrap gap-2">
            {verbList.map(v => (
              <button
                key={v}
                onClick={() => handleSelectVerb(v)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedVerb === v
                    ? 'bg-burgundy-600 text-cream-50 font-medium'
                    : 'bg-white text-gray-700 border border-cream-200 hover:border-burgundy-300 hover:text-burgundy-700'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Conjugate
