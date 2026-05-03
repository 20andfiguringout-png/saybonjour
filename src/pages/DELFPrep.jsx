import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, ChevronDown, ChevronUp, Clock, BookOpen, CheckCircle2, Target } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const EXAMS = {
  'DELF A1': {
    level: 'A1',
    color: 'emerald',
    description: 'Absolute beginner level. Tests basic communication in everyday situations.',
    parts: [
      { name: 'Listening (Compréhension de l\'oral)', duration: '20 min', maxScore: 25, skills: ['Short monologues', 'Simple dialogues', 'Basic instructions'] },
      { name: 'Reading (Compréhension des écrits)', duration: '30 min', maxScore: 25, skills: ['Signs and notices', 'Short forms', 'Simple personal messages'] },
      { name: 'Writing (Production écrite)', duration: '30 min', maxScore: 25, skills: ['Fill in forms', 'Short personal message writing', 'Postcard-style writing'] },
      { name: 'Speaking (Production orale)', duration: '5–7 min', maxScore: 25, skills: ['Guided conversation', 'Exchange of information', 'Roleplay (shopping, ordering)'] },
    ],
    passMark: 50,
    totalMark: 100,
    tips: [
      'Learn numbers, colours, and basic personal information',
      'Master greetings, introductions, and polite phrases',
      'Practise reading simple signs, menus, and timetables',
      'Be able to spell your name and give your address',
    ],
  },
  'DELF A2': {
    level: 'A2',
    color: 'blue',
    description: 'Elementary level. Can communicate in routine tasks and familiar environments.',
    parts: [
      { name: 'Listening', duration: '25 min', maxScore: 25, skills: ['Short dialogues', 'Radio announcements', 'Instructions and messages'] },
      { name: 'Reading', duration: '30 min', maxScore: 25, skills: ['Short descriptive texts', 'Simple advertisements', 'Personal letters'] },
      { name: 'Writing', duration: '45 min', maxScore: 25, skills: ['Complete a text with missing words', 'Write a short letter or note'] },
      { name: 'Speaking', duration: '6–8 min', maxScore: 25, skills: ['Monologue (describe a photo)', 'Interaction with examiner', 'Exercise based on document'] },
    ],
    passMark: 50,
    totalMark: 100,
    tips: [
      'Know the present, passé composé, imparfait, and futur proche',
      'Learn vocabulary around daily life: shopping, transport, weather',
      'Practise describing photos and giving opinions',
      'Learn to write informal emails and short messages',
    ],
  },
  'DELF B1': {
    level: 'B1',
    color: 'yellow',
    description: 'Intermediate level. Independent user — can navigate most everyday situations.',
    parts: [
      { name: 'Listening', duration: '25 min', maxScore: 25, skills: ['Longer monologues', 'Radio programmes', 'Main ideas and details'] },
      { name: 'Reading', duration: '35 min', maxScore: 25, skills: ['Newspaper articles', 'Non-fiction texts', 'Formal documents'] },
      { name: 'Writing', duration: '45 min', maxScore: 25, skills: ['Write a structured text (200+ words)', 'Express and justify opinions'] },
      { name: 'Speaking', duration: '10–15 min', maxScore: 25, skills: ['Sustained monologue', 'Interactive exchange with examiner', 'Defence of point of view'] },
    ],
    passMark: 50,
    totalMark: 100,
    tips: [
      'Master connectors: cependant, néanmoins, par conséquent, en revanche',
      'Practise reading French newspaper articles (Le Monde, Le Figaro)',
      'Learn to structure an argumentative essay: introduction / développement / conclusion',
      'Develop opinion vocabulary: selon moi, à mon avis, je pense que…',
    ],
  },
  'DELF B2': {
    level: 'B2',
    color: 'orange',
    description: 'Upper intermediate. Can understand complex texts and interact fluently with native speakers.',
    parts: [
      { name: 'Listening', duration: '30 min', maxScore: 25, skills: ['Complex speeches', 'Debates and discussions', 'Implicit meaning and tone'] },
      { name: 'Reading', duration: '1h', maxScore: 25, skills: ['Complex argumentative texts', 'Literary and analytical texts', 'Author\'s perspective and structure'] },
      { name: 'Writing', duration: '1h', maxScore: 25, skills: ['Write a formal text (250+ words)', 'Analyse a document and give a position'] },
      { name: 'Speaking', duration: '20 min', maxScore: 25, skills: ['Prepared oral presentation', 'Defend a point of view', 'Interact naturally with examiner'] },
    ],
    passMark: 50,
    totalMark: 100,
    tips: [
      'Read French opinion journalism daily: Libération, Télérama, L\'Obs',
      'Practise writing formal essays with a clear thesis and counter-argument',
      'Learn subjunctive triggers: bien que, quoique, pour que, à condition que',
      'Listen to France Culture podcasts to train for complex oral comprehension',
    ],
  },
  'DALF C1': {
    level: 'C1',
    color: 'purple',
    description: 'Advanced level. Proficient user — can use French flexibly and effectively in academic and professional contexts.',
    parts: [
      { name: 'Listening & Reading (Compréhension)', duration: '2h30', maxScore: 50, skills: ['Academic lectures', 'Complex literary texts', 'Synthesis of multiple sources'] },
      { name: 'Writing (Production écrite)', duration: '2h30', maxScore: 50, skills: ['Synthesis (synthèse de documents)', 'Argumentation essay', 'Academic-style writing'] },
    ],
    passMark: 50,
    totalMark: 100,
    tips: [
      'Master the synthèse: summarise 3 documents objectively in 220 words',
      'Learn advanced connectors and hedging language: il semblerait que, force est de constater que',
      'Practise academic vocabulary: hypothèse, paradigme, enjeux, perspectives',
      'Read French academic journals and literature',
    ],
  },
  'DALF C2': {
    level: 'C2',
    color: 'rose',
    description: 'Mastery level. Equivalent to a native French speaker\'s language competence in formal contexts.',
    parts: [
      { name: 'Listening & Reading', duration: '3h', maxScore: 50, skills: ['Dense academic content', 'Sophisticated literary texts', 'Implicit meaning and nuance'] },
      { name: 'Writing', duration: '3h', maxScore: 50, skills: ['Critical synthesis of complex documents', 'Argumentative essay at graduate level'] },
    ],
    passMark: 50,
    totalMark: 100,
    tips: [
      'Read 19th-century French literature: Flaubert, Zola, Balzac',
      'Master stylistic and rhetorical devices: anaphore, chiasme, oxymore',
      'Write at speed without errors — practise timed essays',
      'Engage with philosophy, sociology and politics in French',
    ],
  },
}

const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700 border-emerald-200', A2: 'bg-blue-100 text-blue-700 border-blue-200', B1: 'bg-yellow-100 text-yellow-700 border-yellow-200', B2: 'bg-orange-100 text-orange-700 border-orange-200', C1: 'bg-purple-100 text-purple-700 border-purple-200', C2: 'bg-rose-100 text-rose-700 border-rose-200' }

export default function DELFPrep() {
  const [selected, setSelected] = useState('DELF B1')
  const [checkedTips, setCheckedTips] = useState({})

  const exam = EXAMS[selected]

  const toggleTip = (examKey, tipIdx) => {
    const key = `${examKey}-${tipIdx}`
    setCheckedTips(prev => {
      const next = { ...prev, [key]: !prev[key] }
      const ticked = Object.values(next).filter(Boolean).length
      if (!prev[key]) addXP(5, 'grammar')
      return next
    })
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="DELF/DALF Preparation | SayBonjour!" description="Prepare for the DELF and DALF French language exams — structure, tips, and vocabulary for every level." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50 flex items-center justify-center gap-3">
            <GraduationCap size={30} className="text-burgundy-600" /> DELF / DALF Prep
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Préparation aux examens officiels du CIEP</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.keys(EXAMS).map(key => {
            const e = EXAMS[key]
            return (
              <button key={key} onClick={() => setSelected(key)}
                className={`px-4 py-2 rounded-xl font-medium text-sm border-2 transition-colors ${selected === key ? `${LEVEL_COLORS[e.level]} font-bold` : 'bg-white dark:bg-dark-warm-100 border-gray-200 dark:border-dark-warm-50 text-gray-600 dark:text-gray-300 hover:border-burgundy-300'}`}>
                {key}
              </button>
            )
          })}
        </div>

        <motion.div key={selected} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`rounded-2xl border-2 p-6 mb-6 ${LEVEL_COLORS[exam.level]}`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold font-playfair">{selected}</h2>
                <p className="text-sm mt-1 opacity-80">{exam.description}</p>
              </div>
              <div className="text-right text-sm">
                <div className="font-bold">{exam.totalMark} points total</div>
                <div className="opacity-70">Pass: {exam.passMark}/100 per section (min 5/25)</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {exam.parts.map(part => (
              <div key={part.name} className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={15} className="text-burgundy-600" />
                  <h3 className="font-semibold text-gray-800 dark:text-cream-50 text-sm">{part.name}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Clock size={11} /> {part.duration}</span>
                  <span className="flex items-center gap-1"><Target size={11} /> {part.maxScore} pts</span>
                </div>
                <ul className="space-y-1">
                  {part.skills.map(skill => (
                    <li key={skill} className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5">
                      <span className="text-burgundy-400 shrink-0">•</span>{skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" /> Study checklist
            </h2>
            <div className="space-y-3">
              {exam.tips.map((tip, i) => {
                const key = `${selected}-${i}`
                const checked = !!checkedTips[key]
                return (
                  <button key={i} onClick={() => toggleTip(selected, i)}
                    className={`w-full flex items-start gap-3 text-left px-4 py-3 rounded-xl border-2 transition-colors ${checked ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10' : 'border-gray-200 dark:border-dark-warm-50 bg-cream-50 dark:bg-dark-warm-200 hover:border-burgundy-300'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${checked ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300 dark:border-gray-600'}`}>
                      {checked && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm ${checked ? 'text-emerald-700 dark:text-emerald-400 line-through opacity-70' : 'text-gray-700 dark:text-gray-300'}`}>{tip}</span>
                    {checked && <span className="text-xs text-emerald-600 font-medium ml-auto shrink-0">+5 XP</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
