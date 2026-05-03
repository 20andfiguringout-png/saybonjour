import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, ChevronDown, ChevronUp, BookOpen, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const TIPS = [
  {
    id: 1,
    title: 'Agreement of adjectives',
    level: 'A1',
    category: 'Adjectives',
    summary: 'French adjectives must agree in gender and number with the noun they describe.',
    explanation: 'Unlike English adjectives, French adjectives change their ending to match the noun. Add -e for feminine, -s for plural, and -es for feminine plural.',
    examples: [
      { fr: 'un chat noir', en: 'a black cat (m. singular)' },
      { fr: 'une chatte noire', en: 'a black cat (f. singular)' },
      { fr: 'des chats noirs', en: 'black cats (m. plural)' },
      { fr: 'des chattes noires', en: 'black cats (f. plural)' },
    ],
    tip: 'Most adjectives follow this pattern, but watch out for irregular ones like beau/belle, vieux/vieille.',
    quiz: { q: 'La maison est ___. (grand)', a: 'grande', wrong: ['grand', 'grands', 'grandes(wrong)'] },
  },
  {
    id: 2,
    title: 'The partitive article (du, de la, des)',
    level: 'A2',
    category: 'Articles',
    summary: 'Use du, de la, de l\', or des when talking about an unspecified quantity of something.',
    explanation: 'The partitive article expresses "some" in English. It changes based on gender and number: du (masculine), de la (feminine), de l\' (vowel/h), des (plural).',
    examples: [
      { fr: 'Je mange du pain.', en: 'I eat (some) bread.' },
      { fr: 'Il boit de la limonade.', en: 'He drinks (some) lemonade.' },
      { fr: 'Elle mange de l\'ail.', en: 'She eats (some) garlic.' },
      { fr: 'Nous voulons des légumes.', en: 'We want (some) vegetables.' },
    ],
    tip: 'After negatives, du/de la/des ALL become de: Je ne mange pas de pain.',
    quiz: { q: 'Avez-vous ___ eau ? (water, feminine)', a: 'de l\'', wrong: ['du', 'de la', 'des'] },
  },
  {
    id: 3,
    title: 'Using ne…pas for negation',
    level: 'A1',
    category: 'Negation',
    summary: 'In French, negation uses two parts: ne before the verb, and pas after it.',
    explanation: 'French wraps the negative around the verb. In spoken French, ne is often dropped, but always include it in written French.',
    examples: [
      { fr: 'Je ne parle pas français.', en: 'I don\'t speak French.' },
      { fr: 'Il n\'est pas là.', en: 'He is not here.' },
      { fr: 'Nous ne sommes pas prêts.', en: 'We are not ready.' },
      { fr: 'Elle ne mange pas de viande.', en: 'She doesn\'t eat meat.' },
    ],
    tip: 'Other negatives: ne…jamais (never), ne…rien (nothing), ne…plus (no longer), ne…que (only).',
    quiz: { q: 'Translate: I don\'t understand.', a: 'Je ne comprends pas.', wrong: ['Je pas comprends.', 'Je comprends pas ne.', 'Ne je comprends.'] },
  },
  {
    id: 4,
    title: 'Reflexive verbs (se lever, se coucher…)',
    level: 'A2',
    category: 'Verbs',
    summary: 'Reflexive verbs use a pronoun to show the subject acts upon itself.',
    explanation: 'Reflexive verbs always appear with a reflexive pronoun (me, te, se, nous, vous, se). They\'re common for daily routines.',
    examples: [
      { fr: 'Je me lève à 7h.', en: 'I get up at 7 o\'clock.' },
      { fr: 'Tu te couches tôt.', en: 'You go to bed early.' },
      { fr: 'Il se lave les mains.', en: 'He washes his hands.' },
      { fr: 'Nous nous appelons…', en: 'We call ourselves… / Our name is…' },
    ],
    tip: 'In the passé composé, reflexive verbs use être (not avoir): Elle s\'est levée.',
    quiz: { q: 'Complete: Ils ___ amusent. (they are having fun)', a: 'se', wrong: ['me', 'te', 'nous'] },
  },
  {
    id: 5,
    title: 'The imparfait vs passé composé',
    level: 'B1',
    category: 'Tenses',
    summary: 'Both are past tenses, but they\'re used in different situations.',
    explanation: 'The passé composé describes completed actions with a clear end. The imparfait describes ongoing states, habits, or background description in the past.',
    examples: [
      { fr: 'J\'habitais à Lyon. (imparfait)', en: 'I used to live in Lyon. (ongoing state)' },
      { fr: 'J\'ai déménagé en 2020. (passé composé)', en: 'I moved in 2020. (completed action)' },
      { fr: 'Il faisait beau quand… (imparfait)', en: 'The weather was nice when… (background)' },
      { fr: '…le téléphone a sonné. (passé composé)', en: '…the phone rang. (completed event)' },
    ],
    tip: 'Trigger words: soudain/tout à coup → passé composé. Souvent/toujours/d\'habitude → imparfait.',
    quiz: { q: 'Which tense: "She used to eat croissants every day"?', a: 'Imparfait', wrong: ['Passé composé', 'Futur simple', 'Subjonctif'] },
  },
  {
    id: 6,
    title: 'Le subjonctif — when to use it',
    level: 'B2',
    category: 'Tenses',
    summary: 'The subjunctive is used after certain verbs and expressions to express doubt, emotion, or necessity.',
    explanation: 'The subjunctive mood follows: vouloir que, il faut que, bien que, pour que, regretter que, douter que, and many more. It has its own set of conjugations.',
    examples: [
      { fr: 'Il faut que tu viennes.', en: 'You must come. (It is necessary that…)' },
      { fr: 'Je veux que tu sois là.', en: 'I want you to be there.' },
      { fr: 'Bien qu\'il pleuve, nous y allons.', en: 'Although it is raining, we are going.' },
      { fr: 'Je suis triste qu\'elle parte.', en: 'I am sad that she is leaving.' },
    ],
    tip: 'Most subjunctive forms are: je/tu/il/ils → same stem; nous/vous → take imparfait stems.',
    quiz: { q: 'Complete: Il faut que tu ___ (avoir) du courage.', a: 'aies', wrong: ['as', 'avais', 'auras'] },
  },
  {
    id: 7,
    title: 'Position of adjectives (before or after?)',
    level: 'A2',
    category: 'Adjectives',
    summary: 'Most French adjectives come AFTER the noun, but a small group of common ones come before.',
    explanation: 'The mnemonic BANGS helps: Beauty, Age, Number, Goodness/Badness, Size. These go before the noun. All other adjectives go after.',
    examples: [
      { fr: 'une belle maison', en: 'a beautiful house (BEFORE — Beauty)' },
      { fr: 'un vieux livre', en: 'an old book (BEFORE — Age)' },
      { fr: 'une chemise bleue', en: 'a blue shirt (AFTER — colour)' },
      { fr: 'un film français', en: 'a French film (AFTER — nationality)' },
    ],
    tip: 'Some adjectives change meaning based on position: un grand homme = a great man, un homme grand = a tall man.',
    quiz: { q: 'Where does "intéressant" go? une histoire ___', a: 'après (une histoire intéressante)', wrong: ['avant (une intéressante histoire)', 'Either position', 'Never used'] },
  },
  {
    id: 8,
    title: 'Direct vs Indirect Object Pronouns',
    level: 'B1',
    category: 'Pronouns',
    summary: 'French has different pronouns for direct objects (me, te, le, la, nous, vous, les) and indirect objects (me, te, lui, nous, vous, leur).',
    explanation: 'A direct object receives the action directly (no preposition). An indirect object involves à + person. Pronouns go BEFORE the verb.',
    examples: [
      { fr: 'Je le vois. (direct)', en: 'I see him.' },
      { fr: 'Je lui parle. (indirect)', en: 'I talk to him/her.' },
      { fr: 'Elle les mange. (direct)', en: 'She eats them.' },
      { fr: 'Nous leur écrivons. (indirect)', en: 'We write to them.' },
    ],
    tip: 'In imperatives: put the pronoun after the verb with a hyphen — Parle-lui ! Mange-les !',
    quiz: { q: 'Which pronoun? Je parle ___ mon ami. (to my friend)', a: 'lui', wrong: ['le', 'la', 'les'] },
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(TIPS.map(t => t.category)))]
const LEVELS = ['All', 'A1', 'A2', 'B1', 'B2']
const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700' }

export default function GrammarTips() {
  const [cat, setCat] = useState('All')
  const [level, setLevel] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [learned, setLearned] = useState(() => {
    try { return JSON.parse(localStorage.getItem('saybonjour_grammar_tips_learned') || '[]') } catch { return [] }
  })

  const filtered = TIPS.filter(t =>
    (cat === 'All' || t.category === cat) &&
    (level === 'All' || t.level === level)
  )

  const handleQuizAnswer = (tipId, answer, correct) => {
    setQuizAnswers(prev => ({ ...prev, [tipId]: answer }))
    if (answer === correct && !learned.includes(tipId)) {
      const next = [...learned, tipId]
      setLearned(next)
      localStorage.setItem('saybonjour_grammar_tips_learned', JSON.stringify(next))
      addXP(10, 'grammar')
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Grammar Tips | SayBonjour!" description="Quick French grammar tips with examples and mini-quizzes for A1–B2 learners." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Grammar Tips</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Conseils de grammaire — quick wins for tricky topics</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${cat === c ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {c}
            </button>
          ))}
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${level === l ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {l}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((tip, i) => {
            const isOpen = expanded === tip.id
            const isLearned = learned.includes(tip.id)
            const chosenAnswer = quizAnswers[tip.id]

            return (
              <motion.div key={tip.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : tip.id)}
                  className="w-full text-left px-6 py-4 flex items-start gap-3">
                  <Lightbulb size={18} className={`mt-0.5 shrink-0 ${isLearned ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[tip.level]}`}>{tip.level}</span>
                      <span className="text-xs text-gray-400">{tip.category}</span>
                      {isLearned && <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><CheckCircle2 size={11} /> Learned</span>}
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-cream-50">{tip.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{tip.summary}</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-gray-400 mt-1 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 mt-1 shrink-0" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-5">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{tip.explanation}</p>

                        <div>
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Examples</h3>
                          <div className="space-y-1.5">
                            {tip.examples.map((ex, j) => (
                              <div key={j} className="bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-4 py-2.5">
                                <div className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{ex.fr}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ex.en}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
                          <strong>💡 Tip:</strong> {tip.tip}
                        </div>

                        <div className="bg-gray-50 dark:bg-dark-warm-200 rounded-xl px-4 py-4">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick check: {tip.quiz.q}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {[tip.quiz.a, ...tip.quiz.wrong].sort(() => Math.random() - 0.5).map(opt => (
                              <button key={opt} onClick={() => handleQuizAnswer(tip.id, opt, tip.quiz.a)} disabled={!!chosenAnswer}
                                className={`py-2 px-3 rounded-lg text-sm border-2 text-left transition-colors disabled:cursor-default
                                  ${chosenAnswer === opt && opt === tip.quiz.a ? 'bg-emerald-100 border-emerald-400 text-emerald-700' :
                                    chosenAnswer === opt && opt !== tip.quiz.a ? 'bg-red-100 border-red-400 text-red-700' :
                                    chosenAnswer && opt === tip.quiz.a ? 'bg-emerald-50 border-emerald-300 text-emerald-600' :
                                    'bg-white dark:bg-dark-warm-100 border-gray-200 dark:border-dark-warm-50 text-gray-700 dark:text-gray-300 hover:border-burgundy-300'}`}>
                                {opt}
                              </button>
                            ))}
                          </div>
                          {chosenAnswer && (
                            <p className={`text-xs mt-2 font-medium ${chosenAnswer === tip.quiz.a ? 'text-emerald-600' : 'text-red-500'}`}>
                              {chosenAnswer === tip.quiz.a ? '✓ Correct! +10 XP' : `✗ The answer is: ${tip.quiz.a}`}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
