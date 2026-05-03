import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const QUESTION_WORDS = [
  { word: 'qui', en: 'who / whom', level: 'A1', note: '"Qui" = who (subject or object). "Qui est-ce qui" = who (emphasis). Never omit "qui" in French — there\'s no omission like in English ("the man I saw" ≠ "l\'homme que j\'ai vu").', examples: [
    { fr: 'Qui est-ce ?', en: 'Who is it?' },
    { fr: 'Qui a mangé mon croissant ?', en: 'Who ate my croissant?' },
    { fr: 'Avec qui vas-tu au cinéma ?', en: 'Who are you going to the cinema with?', note: '"Avec qui" = with whom. French preposition always precedes "qui".' },
    { fr: 'Tu parles de qui ?', en: 'Who are you talking about?', note: '"De qui" = about whom / of whom.' },
  ]},
  { word: 'quoi / que / qu\'', en: 'what', level: 'A1', note: '"Que" before a verb; "quoi" after prepositions or in isolation. "Qu\'est-ce que" = what (object). "Qu\'est-ce qui" = what (subject). Subtle but important distinctions.', examples: [
    { fr: 'Qu\'est-ce que tu fais ?', en: 'What are you doing?', note: 'Most common spoken form. "Que fais-tu ?" = formal inversion.' },
    { fr: 'Que voulez-vous ?', en: 'What do you want? (formal)', note: '"Que + inversion" = formal question.' },
    { fr: 'C\'est quoi ça ?', en: 'What is that? (informal)', note: '"C\'est quoi" = very informal. Use "Qu\'est-ce que c\'est ?" in formal contexts.' },
    { fr: 'De quoi as-tu besoin ?', en: 'What do you need? (lit. of what do you have need?)', note: '"Avoir besoin de" = to need. "De quoi" = of what.' },
  ]},
  { word: 'où', en: 'where', level: 'A1', note: '"Où" = where. With movement verbs: "D\'où viens-tu ?" (from where) — the "d\'" changes the meaning to "from where". "Par où ?" = which way?', examples: [
    { fr: 'Où est la gare ?', en: 'Where is the station?' },
    { fr: 'D\'où viens-tu ?', en: 'Where are you from?', note: '"D\'où" = from where. "D\'où venez-vous ?" = formal.' },
    { fr: 'Où vas-tu ?', en: 'Where are you going?', note: '"Où allez-vous ?" = formal. Very common question.' },
    { fr: 'Par où est-ce qu\'on passe ?', en: 'Which way do we go?', note: '"Par où" = which way / via where.' },
  ]},
  { word: 'quand', en: 'when', level: 'A1', note: '"Quand" = when (at what time). "Depuis quand" = since when. "Jusqu\'à quand" = until when. Do NOT confuse with "comment" (how).', examples: [
    { fr: 'Quand arrive-t-il ?', en: 'When is he arriving?', note: '"Il arrive" → "Arrive-t-il ?" — the "t" is inserted for pronunciation between two vowels.' },
    { fr: 'Depuis quand habites-tu ici ?', en: 'Since when have you lived here?', note: '"Depuis quand" = since when — followed by present tense in French.' },
    { fr: 'Quand est-ce que le magasin ouvre ?', en: 'When does the shop open?', note: '"Est-ce que" = standard question form.' },
    { fr: 'Jusqu\'à quand restez-vous ?', en: 'Until when are you staying?', note: '"Jusqu\'à quand" = until when. Common at hotels and for event durations.' },
  ]},
  { word: 'comment', en: 'how', level: 'A1', note: '"Comment" = how. Also used to ask someone to repeat ("Comment ?" = Pardon?). "Comment ça ?" = what do you mean? / how so?', examples: [
    { fr: 'Comment tu t\'appelles ?', en: 'What\'s your name? (lit: how do you call yourself?)', note: '"Comment vous appelez-vous ?" = formal. "Comment t\'appelles-tu ?" = inversion form.' },
    { fr: 'Comment allez-vous ?', en: 'How are you? (formal)' },
    { fr: 'Comment est-ce qu\'on dit ça en français ?', en: 'How do you say that in French?' },
    { fr: 'Comment ça marche ?', en: 'How does it work? / How\'s it going?', note: '"Ça marche !" = it works! / sounds good! (agreement in informal French).' },
  ]},
  { word: 'pourquoi', en: 'why', level: 'A1', note: '"Pourquoi" = why (asking for reason). "Parce que" = because (answers pourquoi). "Car" = because/for (more formal, written). "C\'est pour ça que" = that\'s why.', examples: [
    { fr: 'Pourquoi tu pleures ?', en: 'Why are you crying?', note: 'Note the rising intonation in informal questions — no inversion needed.' },
    { fr: 'Pourquoi est-ce qu\'il n\'est pas venu ?', en: 'Why didn\'t he come?' },
    { fr: 'Parce que j\'étais fatigué(e).', en: 'Because I was tired.', note: '"Parce que" = because. Pronounced "pass-kuh" in rapid speech.' },
    { fr: 'C\'est pour ça que je suis venu(e).', en: 'That\'s why I came.', note: '"C\'est pour ça que" = that\'s why. Very common explanatory connector.' },
  ]},
  { word: 'combien', en: 'how many / how much', level: 'A1', note: '"Combien" = how many / how much. "Combien de" + noun = how many/much of. "Combien coûte" = how much does it cost. Often confused with "comment" by beginners.', examples: [
    { fr: 'Combien ça coûte ?', en: 'How much does that cost?', note: '"Ça coûte combien ?" = informal word order. Both are correct.' },
    { fr: 'Combien de personnes y a-t-il ?', en: 'How many people are there?', note: '"Combien de" + noun (no article after "combien de").' },
    { fr: 'Depuis combien de temps étudies-tu le français ?', en: 'How long have you been studying French?', note: '"Depuis combien de temps" = for how long (ongoing). Use present tense in French.' },
    { fr: 'C\'est à combien de kilomètres ?', en: 'How many kilometres away is it?', note: '"À combien de" + unit of distance/time = how far/how long.' },
  ]},
  { word: 'quel / quelle', en: 'which / what (adjective)', level: 'A2', note: '"Quel" agrees in gender and number: quel (m.sg), quelle (f.sg), quels (m.pl), quelles (f.pl). Used before a noun or with être. NOT to be confused with "lequel" (which one = pronoun).', examples: [
    { fr: 'Quel est ton prénom ?', en: 'What is your first name?', note: '"Quel" + être = what is. "Quelle est la date ?" = what is the date?' },
    { fr: 'Quelle heure est-il ?', en: 'What time is it?', note: '"Quelle heure" = what time. "Il est quelle heure ?" = informal.' },
    { fr: 'Quels films tu aimes ?', en: 'Which films do you like?', note: '"Quels" = plural masculine, agreeing with "films".' },
    { fr: 'Dans quelle ville habitez-vous ?', en: 'In which city do you live?', note: '"Quelle ville" = which city. "Quelle" agrees with "ville" (feminine).' },
  ]},
  { word: 'lequel / laquelle', en: 'which one (pronoun)', level: 'B1', note: '"Lequel" is a pronoun — it replaces the noun. "Lequel" (m), "laquelle" (f), "lesquels" (m.pl), "lesquelles" (f.pl). With prepositions: "auquel", "duquel" (contractions with à and de).', examples: [
    { fr: 'Lequel préfères-tu ?', en: 'Which one do you prefer? (masculine noun)', note: 'e.g. Lequel de ces films...? = which of these films?' },
    { fr: 'Laquelle est ta valise ?', en: 'Which one is your suitcase? (feminine noun)' },
    { fr: 'Lesquels sont les vôtres ?', en: 'Which ones are yours? (plural)', note: '"Les vôtres" = yours (plural formal).' },
    { fr: 'Auquel de ces restaurants est-ce que tu penses ?', en: 'Which of these restaurants are you thinking of?', note: '"Auquel" = à + lequel (contracted). "Penser à" = to think of.' },
  ]},
]

const QUESTION_FORMS = [
  {
    form: 'Informal — rising intonation',
    register: 'Spoken / casual',
    desc: 'Simply raise your voice at the end of a statement — no word order change. The most common form in everyday spoken French. Perfectly correct in conversation.',
    note: 'Used by virtually all French speakers in informal conversation. Grammatically simple but widely used.',
    example: { fr: 'Tu viens demain ?', en: 'You\'re coming tomorrow? / Are you coming tomorrow?' },
    extra: [
      { fr: 'Il parle français ?', en: 'Does he speak French?' },
      { fr: 'Elle est là ?', en: 'Is she there?' },
    ],
  },
  {
    form: 'Est-ce que…',
    register: 'Neutral / standard',
    desc: 'Add "est-ce que" (lit. "is it that") before a statement. The subject-verb order remains the same. Correct at all levels of formality — the safest and most versatile question form.',
    note: '"Est-ce que" is pronounced "ess-kuh". In rapid speech it becomes "skuh".',
    example: { fr: 'Est-ce que tu viens demain ?', en: 'Are you coming tomorrow?' },
    extra: [
      { fr: 'Est-ce qu\'il parle français ?', en: 'Does he speak French?' },
      { fr: 'Est-ce que vous êtes libre ce soir ?', en: 'Are you free this evening?' },
    ],
  },
  {
    form: 'Inversion',
    register: 'Formal / written',
    desc: 'Invert the verb and subject pronoun (verb before pronoun). When the verb ends in a vowel and the pronoun begins with one, add a "t" for pronunciation. Used in formal speech, writing, official contexts, and with question words.',
    note: 'A "t" euphonique is inserted: "Mange-t-il ?" / "Parle-t-elle ?" — prevents vowel clash.',
    example: { fr: 'Viens-tu demain ?', en: 'Are you coming tomorrow?' },
    extra: [
      { fr: 'Parle-t-il français ?', en: 'Does he speak French?', note: '"t" inserted between "parle" (vowel end) and "il".' },
      { fr: 'Avez-vous votre passeport ?', en: 'Do you have your passport?' },
    ],
  },
]

const LEVEL_COLORS = {
  A1: 'bg-emerald-100 text-emerald-700',
  A2: 'bg-blue-100 text-blue-700',
  B1: 'bg-yellow-100 text-yellow-700',
}

export default function FrenchInterrogatives() {
  const [activeWord, setActiveWord] = useState(0)
  const [tab, setTab] = useState('words')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Question Words | SayBonjour!" description="Master French interrogatives — qui, quoi, où, quand, comment, pourquoi, combien, quel, lequel — with examples and question forms." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Question Words</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les mots interrogatifs — qui, quoi, où, quand, comment, pourquoi, combien, quel, lequel</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'words', label: 'Question Words' }, { id: 'forms', label: 'Question Forms' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'words' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {QUESTION_WORDS.map((w, i) => (
                <button key={w.word} onClick={() => { setActiveWord(i); addXP(2, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-sm font-mono font-bold transition-colors flex items-center gap-1.5 ${activeWord === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {w.word}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <SpeakButton text={QUESTION_WORDS[activeWord].word} size="md" />
                <span className="font-mono font-bold text-2xl text-burgundy-700 dark:text-burgundy-vibrant-300">{QUESTION_WORDS[activeWord].word}</span>
                <span className="text-sm text-gray-400">— {QUESTION_WORDS[activeWord].en}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ml-auto ${LEVEL_COLORS[QUESTION_WORDS[activeWord].level]}`}>{QUESTION_WORDS[activeWord].level}</span>
              </div>
              {QUESTION_WORDS[activeWord].note && (
                <p className="text-xs text-amber-600 dark:text-amber-400 italic mb-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg px-3 py-2">💡 {QUESTION_WORDS[activeWord].note}</p>
              )}
              <div className="space-y-2">
                {QUESTION_WORDS[activeWord].examples.map((ex, i) => (
                  <motion.div key={ex.fr} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3"
                    onClick={() => addXP(2, 'vocabulary')}>
                    <SpeakButton text={ex.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{ex.fr}"</p>
                      <p className="text-xs text-gray-400">{ex.en}</p>
                      {ex.note && <p className="text-xs text-amber-500 italic">{ex.note}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'forms' && (
          <div className="space-y-5">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-300 mb-2">
              💡 French has three ways to ask questions. All are grammatically correct — they differ in register (informal ↔ formal). Native speakers use all three depending on context.
            </div>
            {QUESTION_FORMS.map((form, i) => (
              <motion.div key={form.form} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(3, 'vocabulary')}>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{form.form}</h3>
                  <span className="text-xs bg-gray-100 dark:bg-dark-warm-200 text-gray-500 px-1.5 py-0.5 rounded">{form.register}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{form.desc}</p>
                {form.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mb-3">💡 {form.note}</p>}
                <div className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5 mb-3">
                  <SpeakButton text={form.example.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm italic text-gray-900 dark:text-cream-50">"{form.example.fr}"</p>
                    <p className="text-xs text-gray-400">{form.example.en}</p>
                  </div>
                </div>
                {form.extra && form.extra.map((ex, j) => (
                  <div key={ex.fr} className="flex items-center gap-3 bg-gray-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2 mb-2">
                    <SpeakButton text={ex.fr} size="sm" />
                    <div>
                      <p className="text-sm italic text-gray-700 dark:text-gray-300">"{ex.fr}"</p>
                      <p className="text-xs text-gray-400">{ex.en}</p>
                      {ex.note && <p className="text-xs text-amber-500 italic">{ex.note}</p>}
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
