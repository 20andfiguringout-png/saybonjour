import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const FALSE_FRIENDS = [
  {
    category: 'Everyday Traps',
    items: [
      { french: 'un libraire / une librairie', falseEn: 'library', realEn: 'bookseller / bookshop', realFr: 'une bibliothèque', danger: 'HIGH' },
      { french: 'sensible', falseEn: 'sensible', realEn: 'sensitive', realFr: '"sensible/raisonnable" = sensible', danger: 'HIGH' },
      { french: 'actuel / actuellement', falseEn: 'actual / actually', realEn: 'current / currently', realFr: '"en réalité / en fait" = actually', danger: 'HIGH' },
      { french: 'rester', falseEn: 'to rest', realEn: 'to stay / remain', realFr: '"se reposer" = to rest', danger: 'HIGH' },
      { french: 'passer un examen', falseEn: 'to pass an exam', realEn: 'to take/sit an exam', realFr: '"réussir un examen" = to pass an exam', danger: 'HIGH' },
      { french: 'location', falseEn: 'location', realEn: 'rental / hire', realFr: '"emplacement / lieu" = location', danger: 'MEDIUM' },
      { french: 'une monnaie', falseEn: 'money', realEn: '(loose) change / currency', realFr: '"de l\'argent" = money', danger: 'MEDIUM' },
      { french: 'décevoir', falseEn: 'to deceive', realEn: 'to disappoint', realFr: '"tromper / trahir" = to deceive', danger: 'HIGH' },
    ],
  },
  {
    category: 'Work & Study',
    items: [
      { french: 'une conférence', falseEn: 'a conference', realEn: 'a lecture / talk (also a conference)', realFr: 'Often means academic lecture, not always a big event', danger: 'LOW' },
      { french: 'une formation', falseEn: 'formation', realEn: 'training / course', realFr: '"une formation professionnelle" = professional training', danger: 'MEDIUM' },
      { french: 'un stage', falseEn: 'a stage', realEn: 'an internship / work placement', realFr: '"une scène" = a stage (theatre)', danger: 'HIGH' },
      { french: 'un agenda', falseEn: 'an agenda', realEn: 'a diary / calendar', realFr: '"un ordre du jour" = meeting agenda', danger: 'MEDIUM' },
      { french: 'caution', falseEn: 'caution', realEn: 'deposit / bail / guarantee', realFr: '"prudence / précaution" = caution', danger: 'HIGH' },
      { french: 'important', falseEn: 'important', realEn: 'important (also: significant/large in quantity)', realFr: 'Un retard important = a significant delay', danger: 'LOW' },
    ],
  },
  {
    category: 'Food & Daily Life',
    items: [
      { french: 'des chips', falseEn: 'chips (like fish and chips)', realEn: 'crisps / potato chips', realFr: '"des frites" = chips / French fries', danger: 'MEDIUM' },
      { french: 'un biscuit', falseEn: 'a biscuit (US style)', realEn: 'a biscuit / cookie', realFr: 'Closer to British usage — a thin crispy sweet biscuit', danger: 'LOW' },
      { french: 'large', falseEn: 'large', realEn: 'wide / broad', realFr: '"grand" = large/big', danger: 'HIGH' },
      { french: 'grave', falseEn: 'a grave (burial)', realEn: 'serious / severe / deep', realFr: '"une tombe" = a grave', danger: 'MEDIUM' },
      { french: 'sympathique / sympa', falseEn: 'sympathetic', realEn: 'friendly / nice / likeable', realFr: '"compatissant" = sympathetic', danger: 'HIGH' },
      { french: 'éventuellement', falseEn: 'eventually', realEn: 'possibly / if need be', realFr: '"finalement / à la fin" = eventually', danger: 'HIGH' },
    ],
  },
]

const DANGER_COLORS = {
  HIGH: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  MEDIUM: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  LOW: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
}

export default function FrenchFalseFriends() {
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French False Friends | SayBonjour!" description="Avoid common French false friends — words that look like English but mean something different." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French False Friends</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les faux amis — words that look like English but mean something very different</p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
          <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 dark:text-red-300">False friends are words that look or sound similar in English and French but have different meanings. They\'re one of the most common sources of embarrassing mistakes!</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {FALSE_FRIENDS.map((g, i) => (
            <button key={g.category} onClick={() => { setActiveGroup(i); addXP(4, 'vocabulary') }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {g.category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {FALSE_FRIENDS[activeGroup].items.map((item, i) => (
            <motion.div key={item.french} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <SpeakButton text={item.french.split('/')[0].trim()} size="sm" />
                  <span className="font-bold text-lg font-playfair text-burgundy-700 dark:text-burgundy-vibrant-300">{item.french}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${DANGER_COLORS[item.danger]}`}>{item.danger}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl px-3 py-2">
                  <p className="text-xs text-red-500 font-bold mb-1">✗ NOT</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{item.falseEn}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl px-3 py-2">
                  <p className="text-xs text-emerald-500 font-bold mb-1">✓ MEANS</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">{item.realEn}</p>
                </div>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 italic">💡 {item.realFr}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
