import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Hash } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const CARDINAL = [
  { n: 0, fr: 'zéro' }, { n: 1, fr: 'un' }, { n: 2, fr: 'deux' }, { n: 3, fr: 'trois' }, { n: 4, fr: 'quatre' },
  { n: 5, fr: 'cinq' }, { n: 6, fr: 'six' }, { n: 7, fr: 'sept' }, { n: 8, fr: 'huit' }, { n: 9, fr: 'neuf' },
  { n: 10, fr: 'dix' }, { n: 11, fr: 'onze' }, { n: 12, fr: 'douze' }, { n: 13, fr: 'treize' }, { n: 14, fr: 'quatorze' },
  { n: 15, fr: 'quinze' }, { n: 16, fr: 'seize' }, { n: 17, fr: 'dix-sept' }, { n: 18, fr: 'dix-huit' }, { n: 19, fr: 'dix-neuf' },
  { n: 20, fr: 'vingt', note: 'vingt et un, vingt-deux…vingt-neuf' },
  { n: 30, fr: 'trente' }, { n: 40, fr: 'quarante' }, { n: 50, fr: 'cinquante' },
  { n: 60, fr: 'soixante', note: 'soixante-dix = 70 (60+10)!' },
  { n: 70, fr: 'soixante-dix', note: '70 = "sixty-ten" — not septante (except Belgium/Switzerland)' },
  { n: 80, fr: 'quatre-vingts', note: '80 = "four-twenties" — not huitante (except Switzerland)' },
  { n: 90, fr: 'quatre-vingt-dix', note: '90 = "four-twenty-ten" — not nonante (except Belgium/Switzerland)' },
  { n: 100, fr: 'cent' }, { n: 1000, fr: 'mille' },
  { n: 1000000, fr: 'un million' }, { n: 1000000000, fr: 'un milliard' },
]

const ORDINALS = [
  { n: '1st', fr: 'premier / première', note: 'Only the first changes spelling for gender' },
  { n: '2nd', fr: 'deuxième / second(e)' },
  { n: '3rd', fr: 'troisième' }, { n: '4th', fr: 'quatrième' }, { n: '5th', fr: 'cinquième' },
  { n: '6th', fr: 'sixième' }, { n: '7th', fr: 'septième' }, { n: '8th', fr: 'huitième' },
  { n: '9th', fr: 'neuvième', note: 'neuf → neuv before -ième' },
  { n: '10th', fr: 'dixième' }, { n: '20th', fr: 'vingtième' }, { n: '100th', fr: 'centième' },
  { n: 'last', fr: 'dernier / dernière' },
]

const TRICKY = [
  { title: '70, 80, 90 in France', desc: 'France uses a base-20 counting system: 70 = soixante-dix (60+10), 80 = quatre-vingts (4×20), 90 = quatre-vingt-dix (4×20+10). Belgium and Switzerland use septante, huitante/octante, nonante.', icon: '🧮' },
  { title: 'Millions vs milliards', desc: 'English "billion" = French "milliard". French "million" = English "million". Easy to confuse in business!', icon: '💰' },
  { title: 'Plural s on cent and vingt', desc: '"Quatre-vingts" (80) takes an s, but "quatre-vingt-un" doesn\'t. "Deux cents" (200) takes an s, but "deux cent cinquante" doesn\'t.', icon: '📝' },
  { title: 'Decimal comma', desc: 'France uses a comma as decimal separator: 3,14 (pi). Spaces separate thousands: 1 000 000.', icon: '🔢' },
  { title: 'Phone numbers', desc: 'French phone numbers are read in pairs: 06 12 34 56 78 → "zéro six, douze, trente-quatre, cinquante-six, soixante-dix-huit."', icon: '📱' },
]

const EXPRESSIONS = [
  { fr: 'Il est midi.', en: 'It is noon.' },
  { fr: 'Il est minuit.', en: 'It is midnight.' },
  { fr: 'Il est huit heures et demie.', en: 'It is half past eight.' },
  { fr: 'Il est trois heures et quart.', en: 'It is quarter past three.' },
  { fr: 'Le prix est de vingt-deux euros cinquante.', en: 'The price is twenty-two euros fifty.' },
  { fr: 'J\'habite au troisième étage.', en: 'I live on the third floor.' },
  { fr: 'Elle est née le premier janvier.', en: 'She was born on the first of January.' },
]

export default function FrenchNumbers() {
  const [tab, setTab] = useState('cardinal')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Numbers | SayBonjour!" description="Learn French numbers — cardinal, ordinal, the tricky 70/80/90 system, and number expressions." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Numbers</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les nombres — cardinal, ordinal, and French number quirks</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'cardinal', label: 'Cardinal' }, { id: 'ordinal', label: 'Ordinal' }, { id: 'tricky', label: 'Tricky Rules' }, { id: 'expressions', label: 'Expressions' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'cardinal' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {CARDINAL.map((item, i) => (
              <motion.div key={item.n} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-center gap-3">
                <div className="w-14 text-right shrink-0">
                  <span className="font-bold font-mono text-sm text-gray-400">{item.n.toLocaleString()}</span>
                </div>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                  {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'ordinal' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Add <strong>-ième</strong> to cardinal numbers (drop final e first). First = premier(ère) — the exception.</p>
            <div className="space-y-3">
              {ORDINALS.map(item => (
                <div key={item.n} className="flex items-center gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                  <span className="w-10 text-right shrink-0 font-mono text-sm text-gray-400 font-bold">{item.n}</span>
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{item.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'tricky' && (
          <div className="space-y-4">
            {TRICKY.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'expressions' && (
          <div className="space-y-3">
            {EXPRESSIONS.map((e, i) => (
              <motion.div key={e.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={e.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{e.fr}"</p>
                  <p className="text-xs text-gray-400 mt-0.5">{e.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
