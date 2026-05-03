import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SCHOOL_LEVELS = [
  { level: 'La crèche / La halte-garderie', ages: '0–3 ans', en: 'Nursery / Crèche', desc: 'State-subsidised childcare — France has one of Europe\'s most comprehensive childcare systems. Monthly fees are means-tested. The "crèche municipale" is the state option; "crèche d\'entreprise" is employer-provided.', emoji: '👶' },
  { level: 'L\'école maternelle', ages: '3–6 ans', en: 'Nursery school (compulsory from 3)', desc: 'Free and compulsory since 2019 (lowered from 6). Three sections: petite section (PS), moyenne section (MS), grande section (GS). Focus on language, socialisation, and play-based learning. 97% of French children attend.', emoji: '🧸' },
  { level: 'L\'école primaire (élémentaire)', ages: '6–11 ans', en: 'Primary school (5 years)', desc: 'CP (Cours Préparatoire) → CE1 → CE2 → CM1 → CM2. Core subjects: French, maths, sciences, history-geography, arts, PE. Heavy focus on reading and writing (la lecture, l\'écriture). Curriculum is national and uniform.', emoji: '📚' },
  { level: 'Le collège', ages: '11–15 ans', en: 'Middle school / Lower secondary (4 years)', desc: 'From 6ème (Year 7) to 3ème (Year 10) — counting downwards, which confuses everyone. Ends with the Brevet des Collèges (DNB exam). First foreign language (usually English) from 6ème; second language (German, Spanish, Italian) from 5ème.', emoji: '🏫' },
  { level: 'Le lycée', ages: '15–18 ans', en: 'Sixth form / Upper secondary (3 years)', desc: 'From 2nde to 1ère to Terminale. Three tracks: "général" (academic), "technologique", or "professionnel". The général track was reformed in 2021 — students now choose "spécialités" (specialist subjects). Ends with le baccalauréat.', emoji: '🎓' },
  { level: 'L\'université', ages: '18+ ans', en: 'University', desc: 'French universities are largely state-funded with very low tuition (€170–380/year for licence). The LMD system: Licence (3 ans, 180 ECTS) → Master (2 ans) → Doctorat (3 ans+). Paris has 13 universities — all numbered (Paris-I Panthéon-Sorbonne, etc.).', emoji: '🏛️' },
  { level: 'Les Classes Préparatoires (CPGE)', ages: '18–20 ans', en: 'Preparatory classes for Grandes Écoles (2 years, intensive)', desc: 'The most demanding 2 years in French education — intensive preparation for entry to Grandes Écoles. "Prépa littéraire" (hypokhâgne/khâgne), "prépa scientifique" (MPSI, PCSI, BCPST). Famous for brutal workload: 60-80 hours of work per week.', emoji: '⚡' },
  { level: 'Les Grandes Écoles', ages: '20+ ans', en: 'Elite graduate schools (selective entry via concours)', desc: 'Highly selective institutions requiring CPGE + competitive exam (le concours): Sciences Po, HEC Paris, Polytechnique (l\'X), ENS (École Normale Supérieure), CentraleSupélec, ESSEC. An extraordinary proportion of French leaders come from these 5–10 institutions.', emoji: '⭐' },
]

const SCHOOL_VOCAB = [
  { fr: 'un élève', en: 'a pupil / student (school)', note: 'For school-age students. University students = "un/une étudiant(e)".' },
  { fr: 'un professeur / un prof', en: 'a teacher / professor', note: '"Mon prof de maths" = my maths teacher. At university: "un maître de conférences", "un professeur des universités".' },
  { fr: 'un instituteur / une institutrice', en: 'a primary school teacher', note: 'Also: "un professeur des écoles" (the current official title). "L\'instit" is the affectionate nickname.' },
  { fr: 'la salle de classe', en: 'the classroom', note: '"Rentrer en classe" = to go into class; "en classe" = in school' },
  { fr: 'le tableau (blanc / noir / numérique)', en: 'the board (white/black/interactive)', note: '"Passer au tableau" = to go to the board (often dreaded — being called up to answer questions)' },
  { fr: 'les devoirs', en: 'homework', note: 'Always plural in French. "Faire ses devoirs" = to do one\'s homework.' },
  { fr: 'une interro(gation) / un contrôle', en: 'a test / quiz / class test', note: '"Un contrôle surprise" = a surprise test (a pop quiz). "Une interro" is the short form.' },
  { fr: 'un examen / un exam', en: 'an exam', note: '"Passer un examen" = to sit/take an exam. "Réussir un examen" = to pass. "Échouer à / rater un examen" = to fail.' },
  { fr: 'une note', en: 'a grade / mark', note: 'French grades are out of 20 — very different from British (A–F) or American (0–100%) systems.' },
  { fr: 'redoubler', en: 'to repeat a year (be held back)', note: 'Still relatively common in France — about 1 in 20 students repeat a year. Called "le redoublement".' },
  { fr: 'la récré(ation)', en: 'break time / recess', note: '"La cour de récré" = the school playground.' },
  { fr: 'la cantine', en: 'the school canteen', note: 'French school lunches are hot, multi-course, and taken seriously — organic local ingredients are now common. Considered part of food education.' },
  { fr: 'la carte scolaire', en: 'school zoning system', note: 'French children are assigned to specific schools by residential zone — a highly controversial system that reinforces social segregation.' },
  { fr: 'le baccalauréat (le bac)', en: 'school-leaving exam (taken at 18)', note: 'The defining French exam — prerequisite for university. 10/20 is the pass mark. A score of 16+ gets you "mention Très bien".' },
  { fr: 'une matière', en: 'a school subject', note: '"Quelle est ta matière préférée ?" = What\'s your favourite subject?' },
  { fr: 'le programme / le curriculum', en: 'the curriculum / syllabus', note: 'France has a highly centralised national curriculum — every French schoolchild studies the same things at the same time.' },
  { fr: 'un concours', en: 'a competitive exam (for Grandes Écoles or civil service)', note: '"Passer le concours" = to sit the competitive exam. Only a fixed number of places — very high stakes.' },
  { fr: 'l\'orientation', en: 'subject/career guidance (choosing your track)', note: '"Le conseiller d\'orientation" = the school career counsellor. Very important at the end of 3ème (deciding between lycée tracks).' },
  { fr: 'les vacances scolaires', en: 'school holidays', note: 'France divides the country into 3 zones (A, B, C) with staggered holidays to reduce transport congestion. Zone A: Bordeaux, Grenoble, Lyon; Zone B: Aix-Marseille, Nice; Zone C: Paris.' },
]

const GRADES_NOTE = [
  { range: '18–20', meaning: 'Excellent(e)', color: 'text-emerald-600', note: 'Virtually never given at university. 20/20 is almost mythical.' },
  { range: '16–17', meaning: 'Très bien', color: 'text-emerald-500', note: '"Mention Très bien" at the bac — top 10% of students' },
  { range: '14–15', meaning: 'Bien', color: 'text-blue-600', note: '"Mention Bien" — very solid result' },
  { range: '12–13', meaning: 'Assez bien', color: 'text-indigo-600', note: '"Mention Assez bien" — good pass' },
  { range: '10–11', meaning: 'Passable (pass)', color: 'text-yellow-600', note: '10/20 is the pass mark — "avoir la moyenne"' },
  { range: '8–9', meaning: 'Insuffisant (borderline fail)', color: 'text-orange-600', note: 'Close but below the pass mark' },
  { range: '0–7', meaning: 'Très insuffisant (fail)', color: 'text-red-600', note: 'Significant fail' },
]

const SCHOOL_CULTURE = [
  { emoji: '🥗', title: 'La cantine — French school lunches', detail: 'French school lunches are a cultural institution — multi-course hot meals (entrée + plat + fromage + dessert) with cloth napkins in some schools. French children eat together at tables, learning table manners. Many schools now source local organic ingredients. A real contrast to packed lunches elsewhere.' },
  { emoji: '📝', title: 'La philosophie au bac', detail: 'Every French student writes a 4-hour philosophy essay at the bac — on subjects like "Is freedom a guarantee of happiness?" or "Is consciousness a burden?" This makes philosophical vocabulary and argumentation fundamental to French intellectual culture in a way unique in the world.' },
  { emoji: '🏃', title: 'La rentrée', detail: '"La rentrée" (the return to school in September) is a major national event — publishers release books, politicians give speeches, shops sell school supplies. It signals the restart of French social, cultural, and political life after August holidays. Culturally equivalent to the New Year.' },
  { emoji: '🏆', title: 'L\'élitisme républicain', detail: 'The French education system is officially meritocratic but has been criticised for reproducing inequality. The Grandes Écoles (HEC, Polytechnique, Sciences Po) produce 70%+ of France\'s political and business leaders from a very narrow social base. The "oiseau rare" (rare bird) from a working-class background who reaches the top becomes celebrated as proof the system works.' },
]

export default function FrenchSchoolSystem() {
  const [tab, setTab] = useState('levels')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="The French School System | SayBonjour!" description="Understand the French education system — school levels, vocabulary, the bac, grades, and French school culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">The French School System</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L'éducation en France — levels, vocabulary, grades, and school culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'levels', label: 'School Levels' },
            { id: 'vocab', label: 'School Vocabulary' },
            { id: 'grades', label: 'Grading System' },
            { id: 'culture', label: 'School Culture' },
          ].map(t => (
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
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <SpeakButton text={level.level} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{level.level}</h3>
                    <span className="text-xs bg-cream-100 dark:bg-dark-warm-200 px-2 py-0.5 rounded font-mono text-gray-500">{level.ages}</span>
                  </div>
                  <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic mb-1">{level.en}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{level.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'vocab' && (
          <div className="space-y-2">
            {SCHOOL_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
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
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-1">French grades are out of 20</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Unlike British (A–F) or American (0–100%) systems, French schools grade everything out of 20. Getting 14/20 is very good. Getting 20/20 is practically mythical — teachers sometimes say "only God gets 20".</p>
              <div className="space-y-2">
                {GRADES_NOTE.map(g => (
                  <div key={g.range} className="flex items-center gap-4 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <span className="font-mono font-bold text-sm w-12 text-gray-700 dark:text-gray-300">{g.range}</span>
                    <span className={`font-medium text-sm w-36 shrink-0 ${g.color}`}>{g.meaning}</span>
                    <span className="text-xs text-gray-400 italic">{g.note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-2xl p-5">
              <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">💡 Le baccalauréat (le bac)</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">The bac is France\'s school-leaving exam, taken at age 18 in Terminale. It\'s the key to university entry — without it, you cannot attend French universities. Students choose specialist tracks: "bac général" (maths, literature, science), "bac technologique", or "bac professionnel". Pass mark = 10/20. Families celebrate "avoir son bac" as a major life milestone. About 93% of candidates pass each year.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-2xl p-5">
              <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">📊 Bac grading scale with mentions</h3>
              <div className="space-y-1 text-sm">
                {[
                  { score: '≥ 16/20', mention: 'Mention Très bien', note: 'Top result — opens doors to top schools' },
                  { score: '14–15.9', mention: 'Mention Bien', note: 'Very solid' },
                  { score: '12–13.9', mention: 'Mention Assez bien', note: 'Good pass with mention' },
                  { score: '10–11.9', mention: 'Passable (no mention)', note: 'Basic pass — admitted to university' },
                ].map(r => (
                  <div key={r.score} className="flex items-center gap-3">
                    <span className="font-mono text-blue-700 w-16 shrink-0">{r.score}</span>
                    <span className="font-medium text-blue-800 dark:text-blue-300">{r.mention}</span>
                    <span className="text-gray-400 text-xs italic">{r.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {SCHOOL_CULTURE.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
