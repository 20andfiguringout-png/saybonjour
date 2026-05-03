import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Globe } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const HOLIDAYS = [
  { date: '1 janvier', name: 'Le Jour de l\'An', en: 'New Year\'s Day', desc: 'Celebrated with fireworks, parties, and the New Year\'s meal (le réveillon du Nouvel An). "Bonne année !" is the greeting.', emoji: '🎆' },
  { date: 'Variable (mars/avril)', name: 'Pâques', en: 'Easter', desc: 'A major holiday. Chocolate eggs and bells (les cloches de Pâques). According to tradition, church bells fly to Rome and return with chocolate eggs!', emoji: '🥚' },
  { date: '1 mai', name: 'La Fête du Travail', en: 'Labour Day', desc: 'A day off for all workers. The tradition of offering lily of the valley (le muguet) for good luck. The only day shops must close by law.', emoji: '🌼' },
  { date: '8 mai', name: 'La Victoire 1945', en: 'VE Day', desc: 'Commemorates the end of World War II in Europe (Victory in Europe Day). Ceremonies at war memorials across France.', emoji: '🕊️' },
  { date: '14 juillet', name: 'La Fête Nationale / Le Quatorze Juillet', en: 'Bastille Day', desc: 'France\'s national day. Military parade on the Champs-Élysées, fireworks across France. Commemorates the storming of the Bastille in 1789.', emoji: '🇫🇷' },
  { date: '15 août', name: 'L\'Assomption', en: 'Assumption of Mary', desc: 'A Catholic holiday. Many French people are on summer holiday — considered the peak of vacation season.', emoji: '☀️' },
  { date: '1 novembre', name: 'La Toussaint', en: 'All Saints\' Day', desc: 'Families visit cemeteries to place chrysanthemums (les chrysanthèmes) on graves. A deeply observed day of remembrance. Schools have a holiday.', emoji: '🌸' },
  { date: '11 novembre', name: 'L\'Armistice', en: 'Armistice Day', desc: 'Commemorates the end of World War I. Ceremonies at the Arc de Triomphe and war memorials. A solemn national observance.', emoji: '🎗️' },
  { date: '25 décembre', name: 'Noël', en: 'Christmas Day', desc: 'The main Christmas celebration in France is actually Christmas Eve (le réveillon de Noël) with a family feast. 25 December is quieter.', emoji: '🎄' },
]

const GREETINGS = [
  { fr: 'Bonne année !', en: 'Happy New Year!', when: 'New Year' },
  { fr: 'Joyeux Noël !', en: 'Merry Christmas!', when: 'Christmas' },
  { fr: 'Joyeuses Pâques !', en: 'Happy Easter!', when: 'Easter' },
  { fr: 'Bonne fête !', en: 'Happy name day! / Happy holiday!', when: 'Saint\'s day or holiday', note: 'Every day of the year has a saint\'s name — wish someone "bonne fête" on their name day' },
  { fr: 'Bon courage !', en: 'Good luck! / Hang in there!', when: 'Before a challenge' },
  { fr: 'Bonne continuation !', en: 'All the best (continuing on)!', when: 'When parting' },
  { fr: 'Meilleurs vœux !', en: 'Best wishes!', when: 'New Year / birthday' },
  { fr: 'Joyeux anniversaire !', en: 'Happy birthday!', when: 'Birthday' },
]

const VACATION_VOCAB = [
  { fr: 'les vacances', en: 'holidays / vacation', note: 'Always plural in French — "une vacance" = a vacancy (false friend!)' },
  { fr: 'partir en vacances', en: 'to go on holiday' },
  { fr: 'les grandes vacances', en: 'the summer holidays (July–August)', note: 'School children have ~8 weeks off — the biggest holiday period' },
  { fr: 'le week-end prolongé', en: 'a long weekend', note: 'France has many public holidays — often bridged with a day off (faire le pont)' },
  { fr: 'faire le pont', en: 'to take a long weekend', note: 'Lit. "to make the bridge" — taking Friday off when holiday falls on Thursday' },
  { fr: 'un jour férié', en: 'a public holiday', note: 'France has 11 public holidays per year' },
  { fr: 'la rentrée', en: 'the return to school/work in September', note: 'Hugely significant culturally — the whole country restarts in September' },
]

export default function FrenchHolidays() {
  const [tab, setTab] = useState('holidays')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Holidays & Celebrations | SayBonjour!" description="Discover France's public holidays — Bastille Day, Toussaint, Christmas — with greetings and cultural notes." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Holidays & Celebrations</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les jours fériés et les fêtes — public holidays, greetings, and vacation culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'holidays', label: 'Public Holidays' }, { id: 'greetings', label: 'Festive Greetings' }, { id: 'vacances', label: 'Vacation Vocabulary' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'holidays' && (
          <div className="space-y-4">
            {HOLIDAYS.map((holiday, i) => (
              <motion.div key={holiday.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{holiday.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-mono text-gray-400">{holiday.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <SpeakButton text={holiday.name} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{holiday.name}</h3>
                  </div>
                  <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic mb-1">{holiday.en}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{holiday.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'greetings' && (
          <div className="space-y-3">
            {GREETINGS.map((g, i) => (
              <motion.div key={g.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4">
                <div className="flex items-center gap-3 mb-1">
                  <SpeakButton text={g.fr} size="sm" />
                  <p className="font-bold text-lg font-playfair text-burgundy-700 dark:text-burgundy-vibrant-300 italic">"{g.fr}"</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">{g.en}</p>
                <p className="text-xs text-gray-400 ml-8 italic">Used: {g.when}</p>
                {g.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic ml-8 mt-0.5">💡 {g.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'vacances' && (
          <div className="space-y-3">
            {VACATION_VOCAB.map((v, i) => (
              <motion.div key={v.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={v.fr} size="sm" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</span>
                    <span className="text-xs text-gray-400">— {v.en}</span>
                  </div>
                  {v.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {v.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
