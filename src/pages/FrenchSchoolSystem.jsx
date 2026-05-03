import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SCHOOL_LEVELS = [
  { level: 'La crèche / La halte-garderie', ages: '0–3', en: 'Nursery / Crèche', desc: 'State-subsidised childcare. Highly organised and widely used — France has an excellent childcare system.', emoji: '👶' },
  { level: 'L\'école maternelle', ages: '3–6', en: 'Nursery school (Reception to Year 1)', desc: 'Free and compulsory from age 3. Three sections: petite, moyenne, grande section. Language, socialisation, and play-based learning.', emoji: '🧸' },
  { level: 'L\'école primaire (élémentaire)', ages: '6–11', en: 'Primary school', desc: 'CP (Year 1) through CM2 (Year 5). Core subjects: French, maths, sciences, history, arts. Heavy focus on reading and writing.', emoji: '📚' },
  { level: 'Le collège', ages: '11–15', en: 'Secondary school (Years 7–10)', desc: 'From 6ème to 3ème (counting down). Ends with the Brevet national (DNB exam). Introduces many new subjects.', emoji: '🏫' },
  { level: 'Le lycée', ages: '15–18', en: 'Sixth form / High school', desc: 'From 2nde to Terminale. Three tracks: général, technologique, or professionnel. Ends with the Baccalauréat (le bac).', emoji: '🎓' },
  { level: 'L\'université', ages: '18+', en: 'University', desc: 'French universities are largely state-funded with low tuition fees. Degrees: Licence (3yr), Master (2yr), Doctorat (3yr+).', emoji: '🏛️' },
  { level: 'Les Grandes Écoles', ages: '20+', en: 'Elite graduate schools', desc: 'Highly selective institutions: Sciences Po, HEC, Polytechnique, ENS. Require Classes Préparatoires (CPGE) before entry.', emoji: '⭐' },
]

const SCHOOL_VOCAB = [
  { fr: 'un élève', en: 'a pupil / student (school)', note: 'For school-age students. University students = un/une étudiant(e)' },
  { fr: 'un professeur / un prof', en: 'a teacher / professor' },
  { fr: 'un instituteur / une institutrice', en: 'a primary school teacher' },
  { fr: 'la salle de classe', en: 'the classroom' },
  { fr: 'le tableau (blanc / noir)', en: 'the (white/black) board' },
  { fr: 'les devoirs', en: 'homework', note: 'Always plural in French' },
  { fr: 'une interro(gation)', en: 'a test / quiz' },
  { fr: 'un examen', en: 'an exam' },
  { fr: 'une note', en: 'a grade / mark', note: 'French grades are out of 20 (not 100 or A–F)' },
  { fr: 'redoubler', en: 'to repeat a year', note: 'Kept back a year — still fairly common in France' },
  { fr: 'la récré(ation)', en: 'break / recess' },
  { fr: 'la cantine', en: 'the school canteen / cafeteria', note: 'French school lunches are hot, multi-course, and taken seriously!' },
  { fr: 'la carte scolaire', en: 'school zoning system', note: 'French children are assigned to specific schools by zone' },
  { fr: 'le baccalauréat (le bac)', en: 'school-leaving exam', note: 'The most important French exam — prerequisite for university' },
]

const GRADES_NOTE = [
  { range: '16–20', meaning: 'Très bien (excellent)', color: 'text-emerald-600' },
  { range: '14–15', meaning: 'Bien (good)', color: 'text-blue-600' },
  { range: '12–13', meaning: 'Assez bien (fairly good)', color: 'text-indigo-600' },
  { range: '10–11', meaning: 'Passable (pass)', color: 'text-yellow-600' },
  { range: '0–9', meaning: 'Insuffisant (fail)', color: 'text-red-600' },
]

export default function FrenchSchoolSystem() {
  const [tab, setTab] = useState('levels')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="The French School System | SayBonjour!" description="Understand the French education system — school levels, vocabulary, the bac, grades, and école culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">The French School System</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L\'éducation en France — levels, vocabulary, grades, and culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'levels', label: 'School Levels' }, { id: 'vocab', label: 'School Vocabulary' }, { id: 'grades', label: 'Grading System' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'levels' && (
          <div className="space-y-4">
            {SCHOOL_LEVELS.map((level, i) => (
              <motion.div key={level.level} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(3, 'vocabulary')}>
                <span className="text-3xl shrink-0">{level.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <SpeakButton text={level.level} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{level.level}</h3>
                    <span className="text-xs bg-cream-100 dark:bg-dark-warm-200 px-2 py-0.5 rounded font-mono text-gray-500">{level.ages}</span>
                  </div>
                  <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic mb-1">{level.en}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{level.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'vocab' && (
          <div className="space-y-2">
            {SCHOOL_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-3">
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400">— {item.en}</span>
                  </div>
                  {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'grades' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-2">French grades are out of 20</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Unlike British (A–F) or American (0–100%) systems, French schools grade everything out of 20. Getting 14/20 is considered very good. 20/20 is practically never given.</p>
              <div className="space-y-2">
                {GRADES_NOTE.map(g => (
                  <div key={g.range} className="flex items-center gap-4 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <span className="font-mono font-bold text-lg w-12 text-gray-700 dark:text-gray-300">{g.range}</span>
                    <span className={`font-medium text-sm ${g.color}`}>{g.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-2xl p-5">
              <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">💡 The baccalauréat (le bac)</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300">The bac is France's school-leaving exam, taken at 18. It's the key to university entry. Students choose a specialisation track (maths, literature, economics, etc.). A score of 10/20 is the pass mark. It's a major cultural milestone — families celebrate it widely.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
