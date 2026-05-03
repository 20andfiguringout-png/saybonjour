import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const SCHOOL_VOCAB = [
  {
    category: 'School Supplies — La papeterie',
    items: [
      { fr: 'un cahier', en: 'an exercise book', note: 'Essential French school item!' },
      { fr: 'un stylo', en: 'a pen', note: 'Bic is the iconic French brand' },
      { fr: 'un crayon', en: 'a pencil', note: '"Crayon de couleur" = coloured pencil' },
      { fr: 'une gomme', en: 'a rubber / eraser' },
      { fr: 'une règle', en: 'a ruler' },
      { fr: 'un compas', en: 'a compass (drawing tool)' },
      { fr: 'un rapporteur', en: 'a protractor' },
      { fr: 'une équerre', en: 'a set square' },
      { fr: 'un classeur', en: 'a ring binder / folder' },
      { fr: 'un livre / un manuel', en: 'a textbook' },
      { fr: 'un dictionnaire', en: 'a dictionary' },
      { fr: 'une colle', en: 'glue', note: '"Colle" also slang for detention in French' },
      { fr: 'des ciseaux', en: 'scissors' },
      { fr: 'un taille-crayon', en: 'a pencil sharpener' },
    ],
  },
  {
    category: 'Subjects — Les matières',
    items: [
      { fr: 'le français', en: 'French (language & literature)', note: 'Compulsory throughout French schooling' },
      { fr: 'les mathématiques (les maths)', en: 'mathematics', note: '"Les maths" — feminine plural' },
      { fr: 'l\'histoire-géographie', en: 'history and geography', note: 'Always taught together in France' },
      { fr: 'les sciences (SVT)', en: 'biology & earth sciences', note: 'SVT = Sciences de la vie et de la Terre' },
      { fr: 'la physique-chimie', en: 'physics and chemistry' },
      { fr: 'l\'anglais', en: 'English' },
      { fr: 'une langue vivante (LV)', en: 'a modern language' },
      { fr: 'l\'éducation physique (EPS)', en: 'PE / physical education' },
      { fr: 'les arts plastiques', en: 'visual arts / art' },
      { fr: 'la musique', en: 'music' },
      { fr: 'la philosophie', en: 'philosophy', note: 'Compulsory in Terminale (final year)' },
      { fr: 'l\'éducation civique / EMC', en: 'civics / citizenship education' },
      { fr: 'la technologie', en: 'technology / design & technology' },
    ],
  },
  {
    category: 'School System — Le système scolaire',
    items: [
      { fr: 'la maternelle', en: 'nursery school (3–6 years)', note: 'From petite section to grande section' },
      { fr: 'l\'école primaire / l\'école élémentaire', en: 'primary school (6–11)', note: 'CP through CM2' },
      { fr: 'le collège', en: 'secondary school (11–15)', note: 'Sixième through Troisième' },
      { fr: 'le lycée', en: 'sixth form / high school (15–18)', note: 'Seconde, Première, Terminale' },
      { fr: 'le baccalauréat (le bac)', en: 'school-leaving exam (age 18)', note: 'The famous French final exam' },
      { fr: 'la grande école', en: 'elite higher education institution', note: 'Sciences Po, HEC, Polytechnique' },
      { fr: 'l\'université', en: 'university' },
      { fr: 'la rentrée', en: 'start of the school year (September)', note: 'A huge cultural moment in France' },
      { fr: 'les grandes vacances', en: 'summer holidays (July–August)' },
      { fr: 'la cantine', en: 'school canteen / cafeteria', note: 'French school lunches are famously good' },
    ],
  },
  {
    category: 'Classroom Language — En classe',
    items: [
      { fr: 'Asseyez-vous !', en: 'Sit down!' },
      { fr: 'Ouvrez vos livres à la page…', en: 'Open your books to page…' },
      { fr: 'Faites l\'exercice…', en: 'Do exercise…' },
      { fr: 'Levez la main.', en: 'Put your hand up.' },
      { fr: 'Je ne comprends pas.', en: 'I don\'t understand.' },
      { fr: 'Pouvez-vous répéter ?', en: 'Can you repeat that?' },
      { fr: 'Comment dit-on… en français ?', en: 'How do you say… in French?' },
      { fr: 'Rendez vos devoirs.', en: 'Hand in your homework.' },
      { fr: 'Taisez-vous !', en: 'Be quiet!' },
      { fr: 'Bon courage !', en: 'Good luck! / Keep going!' },
    ],
  },
]

const GRADING = [
  { grade: '20/20', meaning: 'Perfect — extremely rare', equiv: 'A*' },
  { grade: '16–19/20', meaning: 'Excellent (très bien)', equiv: 'A' },
  { grade: '14–15/20', meaning: 'Very good (bien)', equiv: 'B' },
  { grade: '12–13/20', meaning: 'Good (assez bien)', equiv: 'C' },
  { grade: '10–11/20', meaning: 'Pass (passable)', equiv: 'D' },
  { grade: 'Below 10', meaning: 'Fail (insuffisant)', equiv: 'F' },
]

export default function FrenchSchoolVocab() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French School Vocabulary | SayBonjour!" description="Learn French school vocabulary — subjects, supplies, classroom phrases, and the French school system." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French School Vocabulary</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L\'école en français — school life, subjects, and classroom language</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'grading', label: 'French Grades' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {SCHOOL_VOCAB.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{SCHOOL_VOCAB[activeCategory].category}</h2>
              <div className="space-y-3">
                {SCHOOL_VOCAB[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                      </div>
                      {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'grading' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={20} className="text-burgundy-600" />
              <h2 className="font-semibold text-gray-800 dark:text-cream-50">The French Grading System (sur 20)</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">France grades out of 20 (sur vingt). A 10/20 is a pass. Getting 16+ is exceptional. 20/20 is virtually unheard of.</p>
            <div className="space-y-3">
              {GRADING.map((g, i) => (
                <div key={g.grade} className={`flex items-center gap-3 rounded-xl px-4 py-3 ${i === 0 ? 'bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700' : i <= 2 ? 'bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800' : i <= 4 ? 'bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800' : 'bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800'}`}>
                  <span className="font-bold text-lg w-24 shrink-0 font-mono">{g.grade}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-cream-50">{g.meaning}</p>
                    <p className="text-xs text-gray-400">≈ UK {g.equiv}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
