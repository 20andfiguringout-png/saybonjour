import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Hash, Calculator } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const CARDINAL = [
  { n: 0, fr: 'zéro', note: '"Zéro" is sometimes "nul" in sport (France 2-0 / deux à zéro)' },
  { n: 1, fr: 'un / une', note: '"Un" is masculine, "une" is feminine — "un livre" but "une table"' },
  { n: 2, fr: 'deux' }, { n: 3, fr: 'trois' }, { n: 4, fr: 'quatre' },
  { n: 5, fr: 'cinq', note: 'The "q" is silent — pronounced "sank"' },
  { n: 6, fr: 'six', note: 'Pronounced "sis" before a consonant, "siz" before a vowel, "see" at end of phrase' },
  { n: 7, fr: 'sept', note: 'The "p" and "t" are both silent — pronounced "set"' },
  { n: 8, fr: 'huit', note: '"H" is silent; liaison with vowels: "huit amis" = "hwee tamis"' },
  { n: 9, fr: 'neuf', note: '"Neuf" before vowels pronounced "nuv": "neuf ans" = "nuvon". Means "new" too!' },
  { n: 10, fr: 'dix', note: 'Pronounced "dis" before a vowel, "dee" at end of phrase' },
  { n: 11, fr: 'onze' }, { n: 12, fr: 'douze' }, { n: 13, fr: 'treize' }, { n: 14, fr: 'quatorze' },
  { n: 15, fr: 'quinze' }, { n: 16, fr: 'seize' },
  { n: 17, fr: 'dix-sept' }, { n: 18, fr: 'dix-huit' }, { n: 19, fr: 'dix-neuf' },
  { n: 20, fr: 'vingt', note: '"Vingt et un" (21), "vingt-deux" (22)… "vingt-neuf" (29). The "t" in "vingt" is silent except in liaison.' },
  { n: 21, fr: 'vingt et un', note: '"Et" (and) only used in 21, 31, 41, 51, 61 — not in 71, 81, 91' },
  { n: 30, fr: 'trente' }, { n: 40, fr: 'quarante' }, { n: 50, fr: 'cinquante' },
  { n: 60, fr: 'soixante', note: 'The last "easy" decade. After 60, French maths gets creative!' },
  { n: 70, fr: 'soixante-dix', note: '70 = "sixty-ten" (60+10). 71 = soixante-et-onze, 72 = soixante-douze… 79 = soixante-dix-neuf.' },
  { n: 71, fr: 'soixante et onze', note: 'The only number in the 70s that uses "et"' },
  { n: 80, fr: 'quatre-vingts', note: '80 = "four-twenties" (4×20). Drops the "s" when another number follows: "quatre-vingt-un", "quatre-vingt-deux"…' },
  { n: 90, fr: 'quatre-vingt-dix', note: '90 = "four-twenty-ten" (80+10). 91 = quatre-vingt-onze, 95 = quatre-vingt-quinze, 99 = quatre-vingt-dix-neuf.' },
  { n: 100, fr: 'cent', note: '"Deux cents" (200) takes an "s"; "deux cent cinquante" (250) does NOT — the "s" drops when another number follows.' },
  { n: 200, fr: 'deux cents' }, { n: 1000, fr: 'mille', note: '"Mille" never takes an "s" in the plural: "deux mille" (not "deux milles")' },
  { n: 1000000, fr: 'un million', note: '"Un million de personnes" — "million" takes "de" before a noun' },
  { n: 1000000000, fr: 'un milliard', note: 'English "billion" = French "milliard". English "trillion" = French "billion". Critical for business French!' },
]

const ORDINALS = [
  { n: '1st', fr: 'premier / première', note: 'The only ordinal that changes for gender. Abbr: 1er (m), 1ère (f)' },
  { n: '2nd', fr: 'deuxième / second(e)', note: '"Second(e)" is used when there are only two options; "deuxième" when there may be more' },
  { n: '3rd', fr: 'troisième' }, { n: '4th', fr: 'quatrième' },
  { n: '5th', fr: 'cinquième', note: 'Note the "u" added: cinq → cinquième' },
  { n: '6th', fr: 'sixième' }, { n: '7th', fr: 'septième' }, { n: '8th', fr: 'huitième' },
  { n: '9th', fr: 'neuvième', note: 'neuf → neuv before -ième (unique spelling change)' },
  { n: '10th', fr: 'dixième' }, { n: '11th', fr: 'onzième' }, { n: '12th', fr: 'douzième' },
  { n: '20th', fr: 'vingtième' }, { n: '21st', fr: 'vingt et unième' },
  { n: '100th', fr: 'centième' }, { n: '1000th', fr: 'millième' },
  { n: 'last', fr: 'dernier / dernière', note: '"Le dernier étage" = the top floor; "la dernière fois" = the last time' },
  { n: 'next', fr: 'prochain / prochaine', note: '"La prochaine fois" = next time; "le prochain arrêt" = the next stop' },
]

const TRICKY = [
  { title: '70, 80, 90 — the French counting system', desc: 'France uses a vigesimal (base-20) system above 60: 70 = soixante-dix (60+10), 80 = quatre-vingts (4×20), 90 = quatre-vingt-dix (4×20+10). Belgium and Switzerland use septante (70), huitante/octante (80), nonante (90) — far more logical! The French system dates to the Celts who used base-20 counting.', icon: '🧮' },
  { title: 'milliard vs billion', desc: 'French "un milliard" = English "one billion" (1,000,000,000). French "un billion" = English "one trillion" (1,000,000,000,000). This causes serious errors in business and finance translations. Always double-check large numbers.', icon: '💰' },
  { title: 'Plural s on cent and vingt', desc: '"Quatre-vingts" (80) and "deux cents" (200) take an "s", BUT lose it when followed by another number: "quatre-vingt-un" (81), "deux cent cinquante" (250). The rule: "s" only appears when the word is the final element in the number.', icon: '📝' },
  { title: 'Decimal comma, not point', desc: 'France uses a comma as the decimal separator: 3,14 (pi), 1,5€ = one euro fifty. Thousands are separated by spaces (not commas): 1 000 000 (not 1,000,000). This is the opposite of the English convention — important in business contexts.', icon: '🔢' },
  { title: 'Phone numbers read in pairs', desc: 'French phone numbers are 10 digits, always read in pairs: 06 12 34 56 78 → "zéro six, douze, trente-quatre, cinquante-six, soixante-dix-huit." Mobile numbers start with 06 or 07; landlines vary by region.', icon: '📱' },
  { title: 'Dates use cardinal numbers', desc: 'Unlike English, French uses cardinal (not ordinal) numbers for all dates except the 1st: "le deux janvier" (2nd January), "le vingt-cinq décembre" (25th December), BUT "le premier mai" (1st May). Only "premier" is ordinal.', icon: '📅' },
  { title: 'Fractions', desc: 'Common fractions: un demi (½), un tiers (⅓), un quart (¼), trois quarts (¾). "La moitié de" = half of. "Un quart d\'heure" = a quarter of an hour. "Et demie" for half past the hour: "huit heures et demie" = half past eight.', icon: '½' },
]

const EXPRESSIONS = [
  { fr: 'Il est midi.', en: 'It is noon.', note: 'Noon = midi; midnight = minuit. Neither uses "heures"' },
  { fr: 'Il est minuit.', en: 'It is midnight.' },
  { fr: 'Il est huit heures et demie.', en: 'It is half past eight.', note: '"Et demie" for half past; "et quart" for quarter past; "moins le quart" for quarter to' },
  { fr: 'Il est trois heures et quart.', en: 'It is quarter past three.' },
  { fr: 'Il est neuf heures moins cinq.', en: 'It is five to nine.' },
  { fr: 'Le prix est de vingt-deux euros cinquante.', en: 'The price is twenty-two euros fifty.', note: '"Virgule" (comma) used for euros and cents: "22,50€" read as "vingt-deux euros cinquante"' },
  { fr: 'J\'habite au troisième étage.', en: 'I live on the third floor.', note: 'French "troisième étage" = English "fourth floor" (French ground floor = rez-de-chaussée)' },
  { fr: 'Elle est née le premier janvier mil neuf cent quatre-vingt-cinq.', en: 'She was born on 1st January 1985.', note: 'Years are read as full numbers (not split like in English). "Mil" is the variant of "mille" used in dates.' },
  { fr: 'On est le combien aujourd\'hui ?', en: 'What\'s the date today?', note: '"On est le combien ?" = informal; "Quelle est la date ?" = more formal' },
  { fr: 'Ça coûte combien ?', en: 'How much does it cost?' },
  { fr: 'Vous avez quel âge ?', en: 'How old are you? (formal)', note: '"Avoir" used for age in French: "j\'ai trente ans" (I am 30), never "je suis trente ans"' },
  { fr: 'Je suis né(e) en dix-neuf cent quatre-vingt-dix.', en: 'I was born in 1990.' },
]

export default function FrenchNumbers() {
  const [tab, setTab] = useState('cardinal')
  const [showNotes, setShowNotes] = useState(false)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Numbers | SayBonjour!" description="Learn French numbers — cardinal, ordinal, the tricky 70/80/90 system, fractions, dates, and number expressions." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Numbers</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les nombres — cardinal, ordinal, the base-20 system, and French number quirks</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'cardinal', label: 'Cardinal Numbers' },
            { id: 'ordinal', label: 'Ordinal Numbers' },
            { id: 'tricky', label: 'Tricky Rules' },
            { id: 'expressions', label: 'Expressions' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'cardinal' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Click any number to hear it spoken. Click 💡 to see pronunciation notes.</p>
              <button onClick={() => setShowNotes(!showNotes)}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 border border-amber-200">
                {showNotes ? 'Hide' : 'Show'} notes
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {CARDINAL.map((item, i) => (
                <motion.div key={item.n} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                  onClick={() => addXP(1, 'vocabulary')}>
                  <div className="w-16 shrink-0 text-right">
                    <span className="font-bold font-mono text-sm text-gray-400">{item.n.toLocaleString('fr-FR')}</span>
                  </div>
                  <SpeakButton text={item.fr} size="sm" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                    {showNotes && item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">{item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'ordinal' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl px-4 py-3 mb-4 text-sm text-blue-800 dark:text-blue-300">
              <strong>Rule:</strong> Add <strong>-ième</strong> to the cardinal number (drop final "e" first if there is one): six → sixième, quatre → quatrième. Exception: 1st = premier(ère). Neuf → neuvième (unique spelling change).
            </div>
            <div className="space-y-3">
              {ORDINALS.map((item, i) => (
                <div key={item.n} className="flex items-center gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <span className="w-12 text-right shrink-0 font-mono text-sm text-gray-400 font-bold">{item.n}</span>
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">{item.note}</p>}
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
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'grammar')}>
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'expressions' && (
          <div className="space-y-3">
            {EXPRESSIONS.map((e, i) => (
              <motion.div key={e.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={e.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{e.fr}"</p>
                  <p className="text-xs text-gray-400 mt-0.5">{e.en}</p>
                  {e.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {e.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
