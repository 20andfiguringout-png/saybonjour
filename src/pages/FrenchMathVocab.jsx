import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Plus, Minus, X, Divide } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const MATH_SECTIONS = [
  {
    category: 'Basic Operations — Les opérations de base',
    items: [
      { fr: 'l\'addition', en: 'addition', example: '3 + 4 = 7 → "trois plus quatre égale sept"' },
      { fr: 'la soustraction', en: 'subtraction', example: '10 − 3 = 7 → "dix moins trois égale sept"' },
      { fr: 'la multiplication', en: 'multiplication', example: '6 × 7 = 42 → "six fois sept égale quarante-deux"' },
      { fr: 'la division', en: 'division', example: '20 ÷ 4 = 5 → "vingt divisé par quatre égale cinq"' },
      { fr: 'égale / font', en: 'equals', example: '2 + 2 = 4 → "deux et deux font quatre"' },
      { fr: 'plus', en: 'plus / more', example: '5 plus 3' },
      { fr: 'moins', en: 'minus / less', example: '10 moins 6' },
      { fr: 'fois', en: 'times (multiplication)', example: '3 fois 4' },
      { fr: 'divisé par', en: 'divided by', example: '12 divisé par 3' },
    ],
  },
  {
    category: 'Shapes & Geometry — Les formes et la géométrie',
    items: [
      { fr: 'un carré', en: 'a square' },
      { fr: 'un rectangle', en: 'a rectangle' },
      { fr: 'un triangle', en: 'a triangle' },
      { fr: 'un cercle', en: 'a circle' },
      { fr: 'un ovale', en: 'an oval' },
      { fr: 'un pentagone', en: 'a pentagon' },
      { fr: 'un hexagone', en: 'a hexagon' },
      { fr: 'un cube', en: 'a cube' },
      { fr: 'une sphère', en: 'a sphere' },
      { fr: 'un cylindre', en: 'a cylinder' },
      { fr: 'un cône', en: 'a cone' },
      { fr: 'un angle', en: 'an angle' },
      { fr: 'un angle droit', en: 'a right angle' },
      { fr: 'le périmètre', en: 'perimeter' },
      { fr: 'la surface / l\'aire', en: 'area' },
      { fr: 'le volume', en: 'volume' },
    ],
  },
  {
    category: 'Numbers & Types — Les types de nombres',
    items: [
      { fr: 'un nombre entier', en: 'a whole number / integer' },
      { fr: 'un nombre pair', en: 'an even number' },
      { fr: 'un nombre impair', en: 'an odd number' },
      { fr: 'un nombre premier', en: 'a prime number' },
      { fr: 'une fraction', en: 'a fraction' },
      { fr: 'un numérateur', en: 'a numerator' },
      { fr: 'un dénominateur', en: 'a denominator' },
      { fr: 'un décimal', en: 'a decimal' },
      { fr: 'la virgule', en: 'decimal point (comma in French)' },
      { fr: 'un pourcentage', en: 'a percentage' },
      { fr: 'un carré (au carré)', en: 'a square (squared)' },
      { fr: 'une racine carrée', en: 'a square root' },
    ],
  },
  {
    category: 'Measurements — Les mesures',
    items: [
      { fr: 'le mètre (m)', en: 'metre' },
      { fr: 'le centimètre (cm)', en: 'centimetre' },
      { fr: 'le kilomètre (km)', en: 'kilometre' },
      { fr: 'le kilogramme (kg)', en: 'kilogram' },
      { fr: 'le gramme (g)', en: 'gram' },
      { fr: 'le litre (l)', en: 'litre' },
      { fr: 'la superficie', en: 'area / surface area' },
      { fr: 'la longueur', en: 'length' },
      { fr: 'la largeur', en: 'width' },
      { fr: 'la hauteur', en: 'height' },
      { fr: 'la profondeur', en: 'depth' },
    ],
  },
]

const CLASSROOM_PHRASES = [
  { fr: 'Combien font 7 et 8 ?', en: 'How much is 7 and 8?' },
  { fr: 'Quelle est la réponse ?', en: 'What is the answer?' },
  { fr: 'C\'est faux. La bonne réponse est…', en: 'That\'s wrong. The right answer is…' },
  { fr: 'Résoudre l\'équation.', en: 'Solve the equation.' },
  { fr: 'Calculez la surface du rectangle.', en: 'Calculate the area of the rectangle.' },
  { fr: 'Arrondir à deux décimales.', en: 'Round to two decimal places.' },
  { fr: 'Posez votre règle et votre compas.', en: 'Put out your ruler and compass.' },
  { fr: 'C\'est l\'infini.', en: 'It\'s infinity.' },
  { fr: 'Faire la moyenne de ces résultats.', en: 'Find the average of these results.' },
]

export default function FrenchMathVocab() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Maths Vocabulary | SayBonjour!" description="Learn French maths vocabulary — operations, shapes, numbers and classroom phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Maths Vocabulary</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les mathématiques — numbers, shapes, and operations in French</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300 mb-6 flex items-start gap-2">
          <Calculator size={16} className="shrink-0 mt-0.5" />
          <span>In France, the decimal separator is a comma (virgule): 3,14. A million is written as 1 000 000 (spaces, not commas). <em>Les maths</em> is feminine plural — "les maths sont difficiles."</span>
        </div>

        <div className="flex gap-3 mb-6">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'classroom', label: 'Classroom Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {MATH_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{MATH_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {MATH_SECTIONS[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                      </div>
                      {item.example && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">{item.example}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'classroom' && (
          <div className="space-y-3">
            {CLASSROOM_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
