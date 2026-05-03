import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, CheckCircle, RotateCcw } from 'lucide-react'
import SpeakButton from './SpeakButton'
import { getContent, saveContent, addContentItem, updateContentItem, deleteContentItem, resetContent } from '../utils/contentStore'

const INPUT = 'w-full px-3 py-2 border border-gray-300 dark:border-dark-warm-50 rounded-md bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500'
const LABEL = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

const LEVEL_OPTIONS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const JOKE_CATEGORIES = ['Puns', 'Wordplay', 'Classic', 'Cultural', 'Philosophical', 'Food', 'Animals', 'Other']
const TRAVEL_CATEGORIES = ['Airport', 'Hotel', 'Restaurant', 'Transport', 'Shopping', 'Emergency', 'Sightseeing', 'Other']
const BUSINESS_CATEGORIES = ['Roles', 'Meetings', 'Finance', 'Legal', 'Strategy', 'HR', 'Other']
const SLANG_REGISTERS = ['Verlan', 'Youth slang', 'Informal', 'Regional', 'Other']
const WRITING_REGISTERS = ['Formal', 'Semi-formal', 'Informal']

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700',
  A2: 'bg-blue-100 text-blue-700',
  B1: 'bg-yellow-100 text-yellow-700',
  B2: 'bg-orange-100 text-orange-700',
  C1: 'bg-purple-100 text-purple-700',
  C2: 'bg-rose-100 text-rose-700',
}

const CONTENT_TYPES = {
  'jokes': 'jokes',
  'travel-vocab': 'travel',
  'business-vocab': 'business',
  'slang': 'slang',
  'reading': 'reading',
  'writing': 'writing',
  'sentences': 'sentences',
}

const EMPTY_FORMS = {
  jokes: { category: 'Puns', setup: '', punchline: '', setupEn: '', punchlineEn: '', vocab: '', note: '' },
  travel: { fr: '', en: '', category: 'Airport' },
  business: { fr: '', en: '', category: 'Roles' },
  slang: { fr: '', en: '', register: 'Informal', note: '' },
  reading: { level: 'A1', title: '', englishTitle: '', text: '', questions: [], vocab: '' },
  writing: { title: '', titleFr: '', level: 'B1', register: 'Formal', context: '', template: '', keyPhrases: [], notes: '' },
  sentences: { level: 'A1', hint: '', words: '', correct: '', translation: '', explanation: '' },
}

export default function AdminContentPanel({ activeTab }) {
  const contentType = CONTENT_TYPES[activeTab]
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORMS[contentType] || {})
  const [saved, setSaved] = useState(false)
  const [search, setSearch] = useState('')
  const [resetConfirm, setResetConfirm] = useState(false)

  useEffect(() => {
    if (contentType) {
      setItems(getContent(contentType))
      setShowForm(false)
      setEditingItem(null)
      setForm(EMPTY_FORMS[contentType] || {})
      setSearch('')
    }
  }, [activeTab])

  const refresh = () => setItems(getContent(contentType))

  const openAdd = () => {
    setEditingItem(null)
    setForm(EMPTY_FORMS[contentType] || {})
    setShowForm(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    if (contentType === 'sentences') {
      setForm({
        ...item,
        words: Array.isArray(item.words) ? item.words.join(', ') : item.words || '',
        correct: Array.isArray(item.correct) ? item.correct.join(', ') : item.correct || '',
      })
    } else {
      setForm({ ...EMPTY_FORMS[contentType], ...item })
    }
    setShowForm(true)
  }

  const closeForm = () => { setShowForm(false); setEditingItem(null); setForm(EMPTY_FORMS[contentType] || {}) }

  const handleDelete = (id) => {
    if (!confirm('Delete this item?')) return
    const updated = deleteContentItem(contentType, id)
    setItems(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let payload = { ...form }

    if (contentType === 'sentences') {
      payload.words = form.words.split(',').map(w => w.trim()).filter(Boolean)
      payload.correct = form.correct.split(',').map(w => w.trim()).filter(Boolean)
    }

    if (editingItem) {
      const updated = updateContentItem(contentType, editingItem.id, payload)
      setItems(updated)
    } else {
      const newItem = addContentItem(contentType, payload)
      setItems(prev => [...prev, newItem])
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    closeForm()
  }

  const handleReset = () => {
    resetContent(contentType)
    refresh()
    setResetConfirm(false)
  }

  const f = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))

  const filteredItems = items.filter(item => {
    if (!search) return true
    const s = search.toLowerCase()
    return JSON.stringify(item).toLowerCase().includes(s)
  })

  if (!contentType) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}</p>
          {!resetConfirm ? (
            <button onClick={() => setResetConfirm(true)} className="text-xs text-gray-400 hover:text-red-500 underline flex items-center gap-1">
              <RotateCcw size={12} /> Reset to defaults
            </button>
          ) : (
            <span className="flex items-center gap-2 text-xs">
              <span className="text-red-600">Reset all custom changes?</span>
              <button onClick={handleReset} className="text-red-600 font-semibold hover:underline">Yes</button>
              <button onClick={() => setResetConfirm(false)} className="text-gray-500 hover:underline">No</button>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-warm-50 rounded-md bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50 focus:outline-none"
          />
          <button onClick={openAdd} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Add {TAB_LABELS[activeTab] || 'Item'}
          </button>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-dark-warm-100 shadow rounded-md overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {search ? 'No results for your search.' : 'No items yet. Add some above.'}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-dark-warm-50">
            {filteredItems.map(item => (
              <li key={item.id} className="px-4 py-3 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <ItemPreview item={item} contentType={contentType} />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                  {(contentType === 'jokes' || contentType === 'travel' || contentType === 'business' || contentType === 'slang') && item.fr && (
                    <SpeakButton text={item.fr || item.setup} lang="fr-FR" size={14} />
                  )}
                  <button onClick={() => openEdit(item)} className="text-burgundy-600 hover:text-burgundy-700"><Edit size={15} /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700"><Trash2 size={15} /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
          <div className="relative top-4 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-amber-50 dark:bg-dark-warm-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-cream-50">
                {editingItem ? 'Edit' : 'Add'} {TAB_LABELS[activeTab]}
              </h3>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {contentType === 'jokes' && <JokeForm form={form} f={f} setForm={setForm} />}
              {contentType === 'travel' && <VocabForm form={form} f={f} categories={TRAVEL_CATEGORIES} />}
              {contentType === 'business' && <VocabForm form={form} f={f} categories={BUSINESS_CATEGORIES} />}
              {contentType === 'slang' && <SlangForm form={form} f={f} />}
              {contentType === 'reading' && <ReadingForm form={form} f={f} setForm={setForm} />}
              {contentType === 'writing' && <WritingForm form={form} f={f} setForm={setForm} />}
              {contentType === 'sentences' && <SentenceForm form={form} f={f} />}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Save size={15} /> {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {saved && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle size={16} /> Saved successfully!
        </div>
      )}
    </div>
  )
}

const TAB_LABELS = {
  'jokes': 'Joke',
  'travel-vocab': 'Travel Phrase',
  'business-vocab': 'Business Term',
  'slang': 'Slang Expression',
  'reading': 'Reading Passage',
  'writing': 'Writing Template',
  'sentences': 'Sentence Exercise',
}

function ItemPreview({ item, contentType }) {
  if (contentType === 'jokes') return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{item.category}</span>
        <span className="text-sm font-medium text-gray-900 dark:text-cream-50 truncate max-w-xs">{item.setup}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{item.punchline}</p>
    </div>
  )

  if (contentType === 'travel' || contentType === 'business') return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="font-medium text-gray-900 dark:text-cream-50">{item.fr}</span>
      <span className="text-gray-400">→</span>
      <span className="text-gray-700 dark:text-gray-300">{item.en}</span>
      <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">{item.category}</span>
    </div>
  )

  if (contentType === 'slang') return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-medium text-gray-900 dark:text-cream-50">{item.fr}</span>
        <span className="text-gray-400">→</span>
        <span className="text-gray-700 dark:text-gray-300">{item.en}</span>
        <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">{item.register}</span>
      </div>
      {item.note && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{item.note}</p>}
    </div>
  )

  if (contentType === 'reading') return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${LEVEL_COLORS[item.level] || 'bg-gray-100 text-gray-700'}`}>{item.level}</span>
        <span className="font-medium text-gray-900 dark:text-cream-50">{item.title}</span>
        {item.englishTitle && <span className="text-gray-500 dark:text-gray-400 text-sm">({item.englishTitle})</span>}
      </div>
      {item.questions && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.questions.length} question{item.questions.length !== 1 ? 's' : ''}</p>}
    </div>
  )

  if (contentType === 'writing') return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${LEVEL_COLORS[item.level] || 'bg-gray-100 text-gray-700'}`}>{item.level}</span>
        <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">{item.register}</span>
        <span className="font-medium text-gray-900 dark:text-cream-50">{item.title}</span>
      </div>
      {item.context && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{item.context}</p>}
    </div>
  )

  if (contentType === 'sentences') return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${LEVEL_COLORS[item.level] || 'bg-gray-100 text-gray-700'}`}>{item.level}</span>
        <span className="text-sm text-gray-700 dark:text-gray-300 italic">{item.hint}</span>
      </div>
      {item.translation && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.translation}</p>}
    </div>
  )

  return <span className="text-gray-700 dark:text-gray-300">{item.id}</span>
}

function JokeForm({ form, f, setForm }) {
  return (
    <>
      <div>
        <label className={LABEL}>Category *</label>
        <select required value={form.category} onChange={f('category')} className={INPUT}>
          {JOKE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Setup (French) *</label>
          <div className="flex gap-2">
            <textarea required rows={3} value={form.setup} onChange={f('setup')} className={INPUT} placeholder="Pourquoi…?" />
            {form.setup && <SpeakButton text={form.setup} lang="fr-FR" size={14} className="mt-1 flex-shrink-0" />}
          </div>
        </div>
        <div>
          <label className={LABEL}>Punchline (French) *</label>
          <div className="flex gap-2">
            <textarea required rows={3} value={form.punchline} onChange={f('punchline')} className={INPUT} placeholder="Parce que…!" />
            {form.punchline && <SpeakButton text={form.punchline} lang="fr-FR" size={14} className="mt-1 flex-shrink-0" />}
          </div>
        </div>
        <div>
          <label className={LABEL}>Setup (English) *</label>
          <textarea required rows={3} value={form.setupEn} onChange={f('setupEn')} className={INPUT} placeholder="Why…?" />
        </div>
        <div>
          <label className={LABEL}>Punchline (English) *</label>
          <textarea required rows={3} value={form.punchlineEn} onChange={f('punchlineEn')} className={INPUT} placeholder="Because…!" />
        </div>
      </div>
      <div>
        <label className={LABEL}>Vocabulary hint <span className="text-gray-400 font-normal">(optional — "word = meaning | word = meaning")</span></label>
        <input value={form.vocab} onChange={f('vocab')} className={INPUT} placeholder="plonger = to dive | en arrière = backwards" />
      </div>
      <div>
        <label className={LABEL}>Cultural note <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea rows={2} value={form.note} onChange={f('note')} className={INPUT} placeholder="Explain the wordplay or cultural context…" />
      </div>
    </>
  )
}

function VocabForm({ form, f, categories }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>French *</label>
          <div className="flex gap-2 items-start">
            <input required value={form.fr} onChange={f('fr')} className={INPUT} placeholder="le billet" />
            {form.fr && <SpeakButton text={form.fr} lang="fr-FR" size={14} className="mt-2 flex-shrink-0" />}
          </div>
        </div>
        <div>
          <label className={LABEL}>English *</label>
          <input required value={form.en} onChange={f('en')} className={INPUT} placeholder="ticket" />
        </div>
      </div>
      <div>
        <label className={LABEL}>Category *</label>
        <select required value={form.category} onChange={f('category')} className={INPUT}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
    </>
  )
}

function SlangForm({ form, f }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>French expression *</label>
          <div className="flex gap-2 items-start">
            <input required value={form.fr} onChange={f('fr')} className={INPUT} placeholder="C'est ouf!" />
            {form.fr && <SpeakButton text={form.fr} lang="fr-FR" size={14} className="mt-2 flex-shrink-0" />}
          </div>
        </div>
        <div>
          <label className={LABEL}>English meaning *</label>
          <input required value={form.en} onChange={f('en')} className={INPUT} placeholder="It's crazy!" />
        </div>
      </div>
      <div>
        <label className={LABEL}>Register *</label>
        <select required value={form.register} onChange={f('register')} className={INPUT}>
          {SLANG_REGISTERS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className={LABEL}>Note <span className="text-gray-400 font-normal">(optional — etymology, usage tip)</span></label>
        <textarea rows={2} value={form.note} onChange={f('note')} className={INPUT} placeholder='"Ouf" is verlan (reverse) of "fou" (crazy)' />
      </div>
    </>
  )
}

function ReadingForm({ form, f, setForm }) {
  const addQuestion = () => setForm(p => ({
    ...p,
    questions: [...(p.questions || []), { q: '', options: ['', '', '', ''], answer: 0 }]
  }))

  const removeQuestion = (i) => setForm(p => ({
    ...p,
    questions: p.questions.filter((_, idx) => idx !== i)
  }))

  const updateQ = (i, field, val) => setForm(p => ({
    ...p,
    questions: p.questions.map((q, idx) => idx === i ? { ...q, [field]: val } : q)
  }))

  const updateOpt = (qi, oi, val) => setForm(p => ({
    ...p,
    questions: p.questions.map((q, idx) => idx === qi ? {
      ...q,
      options: q.options.map((o, j) => j === oi ? val : o)
    } : q)
  }))

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>CEFR Level *</label>
          <select required value={form.level} onChange={f('level')} className={INPUT}>
            {LEVEL_OPTIONS.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Title (French) *</label>
          <input required value={form.title} onChange={f('title')} className={INPUT} placeholder="Ma Famille" />
        </div>
      </div>
      <div>
        <label className={LABEL}>Title (English)</label>
        <input value={form.englishTitle} onChange={f('englishTitle')} className={INPUT} placeholder="My Family" />
      </div>
      <div>
        <label className={LABEL}>Passage Text *</label>
        <textarea required rows={8} value={form.text} onChange={f('text')} className={INPUT} placeholder="Je m'appelle Sophie…" />
      </div>
      <div>
        <label className={LABEL}>Key Vocabulary <span className="text-gray-400 font-normal">(optional — "word = definition | word = definition")</span></label>
        <input value={form.vocab} onChange={f('vocab')} className={INPUT} placeholder="la famille = the family | le père = the father" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={LABEL}>Comprehension Questions</label>
          <button type="button" onClick={addQuestion} className="btn-secondary text-xs py-1 px-2">+ Add Question</button>
        </div>
        {(form.questions || []).map((q, qi) => (
          <div key={qi} className="border border-gray-200 dark:border-dark-warm-50 rounded-lg p-3 mb-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Question {qi + 1}</span>
              <button type="button" onClick={() => removeQuestion(qi)} className="text-red-500 hover:text-red-700"><X size={14} /></button>
            </div>
            <input
              value={q.q}
              onChange={e => updateQ(qi, 'q', e.target.value)}
              className={INPUT}
              placeholder="What is the narrator's name?"
            />
            <div className="space-y-1.5">
              {(q.options || ['', '', '', '']).map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`answer_${qi}`}
                    checked={q.answer === oi}
                    onChange={() => updateQ(qi, 'answer', oi)}
                    className="text-burgundy-600"
                    title="Mark as correct answer"
                  />
                  <input
                    value={opt}
                    onChange={e => updateOpt(qi, oi, e.target.value)}
                    className={`flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-dark-warm-50 rounded-md bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50 focus:outline-none`}
                    placeholder={`Option ${oi + 1}${q.answer === oi ? ' (correct)' : ''}`}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">Click the radio button to mark the correct answer.</p>
          </div>
        ))}
      </div>
    </>
  )
}

function WritingForm({ form, f, setForm }) {
  const addPhrase = () => setForm(p => ({
    ...p,
    keyPhrases: [...(p.keyPhrases || []), { fr: '', en: '' }]
  }))

  const removePhrase = (i) => setForm(p => ({
    ...p,
    keyPhrases: p.keyPhrases.filter((_, idx) => idx !== i)
  }))

  const updatePhrase = (i, field, val) => setForm(p => ({
    ...p,
    keyPhrases: p.keyPhrases.map((ph, idx) => idx === i ? { ...ph, [field]: val } : ph)
  }))

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Title (English) *</label>
          <input required value={form.title} onChange={f('title')} className={INPUT} placeholder="Formal Business Email" />
        </div>
        <div>
          <label className={LABEL}>Title (French)</label>
          <input value={form.titleFr} onChange={f('titleFr')} className={INPUT} placeholder="Email professionnel formel" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>CEFR Level *</label>
          <select required value={form.level} onChange={f('level')} className={INPUT}>
            {LEVEL_OPTIONS.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Register *</label>
          <select required value={form.register} onChange={f('register')} className={INPUT}>
            {WRITING_REGISTERS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={LABEL}>Context / When to use *</label>
        <textarea required rows={2} value={form.context} onChange={f('context')} className={INPUT} placeholder="Writing to a colleague, manager, or client you do not know well." />
      </div>
      <div>
        <label className={LABEL}>Template *</label>
        <textarea required rows={10} value={form.template} onChange={f('template')} className={`${INPUT} font-mono text-sm`} placeholder="Objet : [Sujet de l'email]&#10;&#10;Madame, Monsieur,&#10;&#10;…" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={LABEL}>Key Phrases</label>
          <button type="button" onClick={addPhrase} className="btn-secondary text-xs py-1 px-2">+ Add Phrase</button>
        </div>
        {(form.keyPhrases || []).map((ph, i) => (
          <div key={i} className="flex gap-2 mb-2 items-center">
            <input
              value={ph.fr}
              onChange={e => updatePhrase(i, 'fr', e.target.value)}
              className={`flex-1 px-2 py-1.5 text-sm border border-gray-300 dark:border-dark-warm-50 rounded-md bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50 focus:outline-none`}
              placeholder="French phrase"
            />
            <input
              value={ph.en}
              onChange={e => updatePhrase(i, 'en', e.target.value)}
              className={`flex-1 px-2 py-1.5 text-sm border border-gray-300 dark:border-dark-warm-50 rounded-md bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50 focus:outline-none`}
              placeholder="English meaning"
            />
            <button type="button" onClick={() => removePhrase(i)} className="text-red-500 hover:text-red-700 flex-shrink-0"><X size={14} /></button>
          </div>
        ))}
      </div>

      <div>
        <label className={LABEL}>Notes <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea rows={2} value={form.notes} onChange={f('notes')} className={INPUT} placeholder="Tips about register, closing formulas, etc." />
      </div>
    </>
  )
}

function SentenceForm({ form, f }) {
  return (
    <>
      <div>
        <label className={LABEL}>CEFR Level *</label>
        <select required value={form.level} onChange={f('level')} className={INPUT}>
          {LEVEL_OPTIONS.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label className={LABEL}>Hint / Instruction *</label>
        <input required value={form.hint} onChange={f('hint')} className={INPUT} placeholder="Form a greeting sentence." />
      </div>
      <div>
        <label className={LABEL}>Words (comma-separated, all available words) *</label>
        <input required value={form.words} onChange={f('words')} className={INPUT} placeholder="Bonjour, ,, comment, allez, -vous, ?" />
        <p className="text-xs text-gray-400 mt-1">Enter all word tiles available to the student, separated by commas.</p>
      </div>
      <div>
        <label className={LABEL}>Correct answer (comma-separated, in order) *</label>
        <input required value={form.correct} onChange={f('correct')} className={INPUT} placeholder="Bonjour, ,, comment, allez, -vous, ?" />
        <p className="text-xs text-gray-400 mt-1">The correct order of the words, separated by commas.</p>
      </div>
      <div>
        <label className={LABEL}>English translation *</label>
        <input required value={form.translation} onChange={f('translation')} className={INPUT} placeholder="Hello, how are you?" />
      </div>
      <div>
        <label className={LABEL}>Explanation <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea rows={2} value={form.explanation} onChange={f('explanation')} className={INPUT} placeholder="French formal greeting — 'allez-vous' uses the formal 'vous' form." />
      </div>
    </>
  )
}
