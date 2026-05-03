import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const DAYS = [
  { fr: 'lundi', en: 'Monday', abbr: 'lun.' },
  { fr: 'mardi', en: 'Tuesday', abbr: 'mar.' },
  { fr: 'mercredi', en: 'Wednesday', abbr: 'mer.' },
  { fr: 'jeudi', en: 'Thursday', abbr: 'jeu.' },
  { fr: 'vendredi', en: 'Friday', abbr: 'ven.' },
  { fr: 'samedi', en: 'Saturday', abbr: 'sam.' },
  { fr: 'dimanche', en: 'Sunday', abbr: 'dim.' },
]

const MONTHS = [
  { fr: 'janvier', en: 'January', n: 1 },
  { fr: 'février', en: 'February', n: 2 },
  { fr: 'mars', en: 'March', n: 3 },
  { fr: 'avril', en: 'April', n: 4 },
  { fr: 'mai', en: 'May', n: 5 },
  { fr: 'juin', en: 'June', n: 6 },
  { fr: 'juillet', en: 'July', n: 7 },
  { fr: 'août', en: 'August', n: 8, note: 'The "t" is sometimes silent in speech' },
  { fr: 'septembre', en: 'September', n: 9 },
  { fr: 'octobre', en: 'October', n: 10 },
  { fr: 'novembre', en: 'November', n: 11 },
  { fr: 'décembre', en: 'December', n: 12 },
]

const SEASONS = [
  { fr: 'le printemps', en: 'spring', note: 'au printemps = in spring' },
  { fr: 'l\'été', en: 'summer', note: 'en été = in summer' },
  { fr: 'l\'automne', en: 'autumn / fall', note: 'en automne = in autumn' },
  { fr: 'l\'hiver', en: 'winter', note: 'en hiver = in winter' },
]

const DATE_PHRASES = [
  { fr: 'Quelle est la date aujourd\'hui ?', en: 'What is today\'s date?' },
  { fr: 'Nous sommes le lundi 3 mai.', en: 'It is Monday, the 3rd of May.' },
  { fr: 'C\'est le premier janvier.', en: 'It\'s the first of January.' },
  { fr: 'Mon anniversaire est le quinze août.', en: 'My birthday is the fifteenth of August.' },
  { fr: 'Le rendez-vous est vendredi prochain.', en: 'The appointment is next Friday.' },
  { fr: 'Il est parti il y a trois jours.', en: 'He left three days ago.' },
  { fr: 'Elle revient dans une semaine.', en: 'She comes back in a week.' },
  { fr: 'La réunion est en mars.', en: 'The meeting is in March.' },
  { fr: 'Je suis né(e) en 1995.', en: 'I was born in 1995.' },
  { fr: 'Le magasin est ouvert du lundi au vendredi.', en: 'The shop is open Monday to Friday.' },
]

const DATE_RULES = [
  { rule: 'Format: le [ordinal] [month]', example: 'le 14 juillet — Bastille Day', note: 'French uses cardinal numbers (14, 15, 21) except for the 1st: le premier.' },
  { rule: 'Saying the year', example: 'en deux mille vingt-cinq — in 2025', note: 'Always use "en" before a year.' },
  { rule: 'Days of the week — lowercase', example: 'lundi, mardi, mercredi…', note: 'Days and months are NOT capitalised in French.' },
  { rule: 'The French week starts on Monday', example: 'Calendar: lundi → dimanche', note: 'Sunday is the last day of the week in France, not the first.' },
  { rule: 'In + month (no article)', example: 'en juillet — in July', note: 'Use "en" before months, not "dans le" or "au".' },
]

export default function FrenchDates() {
  const [tab, setTab] = useState('calendar')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Dates & Calendar | SayBonjour!" description="Learn dates, days, months, and seasons in French — with format rules and useful phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Dates & the Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les dates et le calendrier — days, months, seasons, and date formats</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'calendar', label: 'Calendar' }, { id: 'rules', label: 'Date Rules' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">Days of the week — Les jours de la semaine</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DAYS.map((day, i) => (
                  <motion.div key={day.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-3 text-center">
                    <SpeakButton text={day.fr} size="sm" />
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 mt-1">{day.fr}</p>
                    <p className="text-xs text-gray-400">{day.en}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-3">💡 The French week starts on Monday (lundi). Days are not capitalised.</p>
            </div>

            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">Months — Les mois</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MONTHS.map((m, i) => (
                  <motion.div key={m.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2 flex items-center gap-2">
                    <span className="w-5 text-xs text-gray-400 font-mono shrink-0">{m.n}</span>
                    <SpeakButton text={m.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{m.fr}</p>
                      <p className="text-xs text-gray-400">{m.en}</p>
                      {m.note && <p className="text-xs text-amber-500 italic">{m.note}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">Seasons — Les saisons</h2>
              <div className="grid grid-cols-2 gap-3">
                {SEASONS.map((s, i) => (
                  <div key={s.fr} className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-3 flex items-center gap-2">
                    <SpeakButton text={s.fr} size="sm" />
                    <div>
                      <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{s.fr}</p>
                      <p className="text-xs text-gray-400">{s.en}</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 italic">{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'rules' && (
          <div className="space-y-4">
            {DATE_RULES.map((r, i) => (
              <motion.div key={r.rule} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-2">{r.rule}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <SpeakButton text={r.example} size="sm" />
                  <span className="text-sm italic text-burgundy-700 dark:text-burgundy-vibrant-300">"{r.example}"</span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 italic">💡 {r.note}</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {DATE_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
