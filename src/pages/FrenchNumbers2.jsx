import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const CARDINAL = [
  { n: 0, fr: 'zéro' }, { n: 1, fr: 'un / une' }, { n: 2, fr: 'deux' },
  { n: 3, fr: 'trois' }, { n: 4, fr: 'quatre' }, { n: 5, fr: 'cinq' },
  { n: 6, fr: 'six' }, { n: 7, fr: 'sept' }, { n: 8, fr: 'huit' },
  { n: 9, fr: 'neuf' }, { n: 10, fr: 'dix' }, { n: 11, fr: 'onze' },
  { n: 12, fr: 'douze' }, { n: 13, fr: 'treize' }, { n: 14, fr: 'quatorze' },
  { n: 15, fr: 'quinze' }, { n: 16, fr: 'seize' }, { n: 17, fr: 'dix-sept' },
  { n: 18, fr: 'dix-huit' }, { n: 19, fr: 'dix-neuf' }, { n: 20, fr: 'vingt' },
  { n: 21, fr: 'vingt et un' }, { n: 30, fr: 'trente' }, { n: 40, fr: 'quarante' },
  { n: 50, fr: 'cinquante' }, { n: 60, fr: 'soixante' },
  { n: 70, fr: 'soixante-dix', note: 'Lit. "sixty-ten"' },
  { n: 71, fr: 'soixante et onze', note: 'sixty and eleven' },
  { n: 80, fr: 'quatre-vingts', note: 'Lit. "four-twenties". Drops the s with a following number' },
  { n: 81, fr: 'quatre-vingt-un', note: 'No "et" after quatre-vingts' },
  { n: 90, fr: 'quatre-vingt-dix', note: 'Lit. "four-twenty-ten"' },
  { n: 100, fr: 'cent' }, { n: 101, fr: 'cent un' },
  { n: 200, fr: 'deux cents', note: '"Cents" takes an s only if nothing follows: 200 = deux cents, 201 = deux cent un' },
  { n: 1000, fr: 'mille', note: '"Mille" never takes an s' },
  { n: 1000000, fr: 'un million' }, { n: 1000000000, fr: 'un milliard' },
]

const ORDINALS = [
  { n: '1st', fr: 'premier / première', note: 'Irregular — does NOT use "-ième"' },
  { n: '2nd', fr: 'deuxième / second(e)' },
  { n: '3rd', fr: 'troisième' },
  { n: '4th', fr: 'quatrième' },
  { n: '5th', fr: 'cinquième', note: 'Adds a "u" before -ième' },
  { n: '9th', fr: 'neuvième', note: 'f → v change: neuf → neuv-' },
  { n: '10th', fr: 'dixième' },
  { n: '20th', fr: 'vingtième' },
  { n: '21st', fr: 'vingt et unième' },
  { n: '100th', fr: 'centième' },
]

const TRICKY_NOTES = [
  { title: 'The Belgian/Swiss exception', desc: 'Belgium and Switzerland use "septante" (70), "huitante/octante" (80), and "nonante" (90) instead of France\'s complex system. Much simpler!', flag: '🇧🇪🇨🇭' },
  { title: 'Telephone numbers', desc: 'French phone numbers are read in pairs: 01 23 45 67 89 = "zéro un, vingt-trois, quarante-cinq, soixante-sept, quatre-vingt-neuf"', flag: '📞' },
  { title: 'Decimal separator', desc: 'France uses a comma (,) as the decimal separator: 3,14 = "trois virgule quatorze" (not a period).', flag: '💰' },
  { title: 'Large numbers spacing', desc: 'France uses a space (or period in some contexts) to separate thousands: 1 000 000 (not 1,000,000).', flag: '🔢' },
]

const NUMBER_PHRASES = [
  { fr: 'J\'ai vingt-cinq ans.', en: 'I\'m twenty-five years old.' },
  { fr: 'Ça coûte quatre-vingt-dix euros.', en: 'That costs ninety euros.' },
  { fr: 'Il habite au troisième étage.', en: 'He lives on the third floor.' },
  { fr: 'C\'est au numéro soixante et un.', en: 'It\'s at number sixty-one.' },
  { fr: 'Mon code postal est le soixante-quinze.', en: 'My postcode is seventy-five (Paris).' },
]

export default function FrenchNumbers2() {
  const [tab, setTab] = useState('cardinal')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Numbers (Advanced) | SayBonjour!" description="Master French numbers — cardinals, ordinals, the 70/80/90 system, phone numbers, and tricky rules." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Numbers</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les nombres — cardinals, ordinals, and the quirky French number system</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'cardinal', label: 'Cardinal Numbers' }, { id: 'ordinal', label: 'Ordinal Numbers' }, { id: 'tricky', label: 'Tricky Rules' }, { id: 'phrases', label: 'In Context' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'cardinal' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CARDINAL.map((num, i) => (
              <motion.div key={num.n} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-3 py-2 flex items-center gap-2 cursor-pointer"
                onClick={() => addXP(2, 'vocabulary')}>
                <span className="font-mono font-bold text-sm text-gray-400 w-10 shrink-0">{num.n.toLocaleString()}</span>
                <div>
                  <SpeakButton text={num.fr.split('/')[0].trim()} size="sm" />
                </div>
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{num.fr}</p>
                  {num.note && <p className="text-xs text-amber-500 italic">{num.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'ordinal' && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300 mb-2">
              To form ordinals: add <strong>-ième</strong> to the cardinal (dropping final e if present). Exception: premier / première.
            </div>
            {ORDINALS.map((o, i) => (
              <motion.div key={o.n} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-center gap-3">
                <span className="font-mono font-bold text-gray-400 w-10 shrink-0">{o.n}</span>
                <SpeakButton text={o.fr.split('/')[0].trim()} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{o.fr}</p>
                  {o.note && <p className="text-xs text-amber-500 italic">{o.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'tricky' && (
          <div className="space-y-4">
            {TRICKY_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">{note.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{note.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{note.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {NUMBER_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
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
