import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const CARDINAL = [
  { n: 0, fr: 'zéro' }, { n: 1, fr: 'un / une', note: 'Masculine/feminine: "un livre" (m) vs "une table" (f)' },
  { n: 2, fr: 'deux' }, { n: 3, fr: 'trois' }, { n: 4, fr: 'quatre' }, { n: 5, fr: 'cinq' },
  { n: 6, fr: 'six' }, { n: 7, fr: 'sept' }, { n: 8, fr: 'huit' }, { n: 9, fr: 'neuf' },
  { n: 10, fr: 'dix' }, { n: 11, fr: 'onze' }, { n: 12, fr: 'douze' }, { n: 13, fr: 'treize' },
  { n: 14, fr: 'quatorze' }, { n: 15, fr: 'quinze' }, { n: 16, fr: 'seize' }, { n: 17, fr: 'dix-sept' },
  { n: 18, fr: 'dix-huit' }, { n: 19, fr: 'dix-neuf' }, { n: 20, fr: 'vingt' },
  { n: 21, fr: 'vingt et un', note: '"Et" used with 21, 31, 41, 51, 61 — but NOT 71, 81, 91' },
  { n: 22, fr: 'vingt-deux', note: 'From 22–29: vingt + hyphen + number' },
  { n: 30, fr: 'trente' }, { n: 40, fr: 'quarante' }, { n: 50, fr: 'cinquante' }, { n: 60, fr: 'soixante' },
  { n: 70, fr: 'soixante-dix', note: '60+10. Lit. "sixty-ten". Used in France — Belgium and Switzerland use "septante".' },
  { n: 71, fr: 'soixante et onze', note: '60+11. Note: "et onze" not "onze".' },
  { n: 72, fr: 'soixante-douze', note: '60+12 — continues to 79.' },
  { n: 80, fr: 'quatre-vingts', note: '4×20. Lit. "four-twenties". Drops the -s when followed by another number.' },
  { n: 81, fr: 'quatre-vingt-un', note: 'No "et" after quatre-vingts. And no -s on "vingt".' },
  { n: 90, fr: 'quatre-vingt-dix', note: '4×20+10. Belgium/Switzerland use "nonante" instead.' },
  { n: 91, fr: 'quatre-vingt-onze', note: '4×20+11. Continues to 99.' },
  { n: 100, fr: 'cent', note: '"Cent" takes an -s only when not followed by another number: "deux cents" but "deux cent un".' },
  { n: 101, fr: 'cent un', note: 'No "et" between cent and the following number.' },
  { n: 200, fr: 'deux cents', note: 'S added: deux cents (200). But: deux cent dix (210) — no s.' },
  { n: 1000, fr: 'mille', note: '"Mille" NEVER takes an -s. Two thousand = "deux mille" not "deux milles".' },
  { n: 1001, fr: 'mille et un', note: '"Mille et un" = 1,001. "Les Mille et une Nuits" = One Thousand and One Nights.' },
  { n: 1000000, fr: 'un million', note: '"Million" takes an -s in the plural: "cinq millions" (5,000,000).' },
  { n: 1000000000, fr: 'un milliard', note: 'French "un milliard" = one billion (not one thousand million). "Un billion" in French = one trillion!' },
]

const ORDINALS = [
  { n: '1st', fr: 'premier / première', note: 'Irregular — masculine and feminine forms. Does NOT use "-ième".' },
  { n: '2nd', fr: 'deuxième / second(e)', note: '"Second" is used when there are only two. "Deuxième" for any second in a series.' },
  { n: '3rd', fr: 'troisième' },
  { n: '4th', fr: 'quatrième' },
  { n: '5th', fr: 'cinquième', note: 'Adds a "u" before -ième: cinq → cinquième' },
  { n: '6th', fr: 'sixième' },
  { n: '8th', fr: 'huitième', note: 'Note: no liaison drop — keeps the h' },
  { n: '9th', fr: 'neuvième', note: 'f → v change: neuf → neuv-ième' },
  { n: '10th', fr: 'dixième' },
  { n: '11th', fr: 'onzième', note: 'No liaison: one says "le onzième" not "l\'onzième"' },
  { n: '20th', fr: 'vingtième' },
  { n: '21st', fr: 'vingt et unième' },
  { n: '100th', fr: 'centième' },
  { n: '1000th', fr: 'millième' },
]

const TRICKY_NOTES = [
  {
    title: 'The 70/80/90 Problem',
    desc: 'France uses soixante-dix (60+10) for 70, quatre-vingts (4×20) for 80, and quatre-vingt-dix (4×20+10) for 90. This vigesimal (base-20) counting system comes from the Celts. Belgium and Switzerland say "septante" (70), "huitante/octante" (80), "nonante" (90) — much simpler!',
    flag: '🧮',
  },
  {
    title: 'Telephone numbers in pairs',
    desc: 'French phone numbers are read in pairs: 06 23 45 67 89 = "zéro six, vingt-trois, quarante-cinq, soixante-sept, quatre-vingt-neuf". Mobile numbers start with 06 or 07. Landlines start with 01 (Paris) or other regional codes.',
    flag: '📞',
  },
  {
    title: 'Decimal separator: la virgule',
    desc: 'France uses a comma (,) as the decimal separator: 3,14 = "trois virgule quatorze" (π). The period is NOT used — a period separates thousands. This creates the opposite convention from English: "1.000" in French = one thousand (not one point zero).',
    flag: '💰',
  },
  {
    title: 'Large numbers and spaces',
    desc: 'France uses a thin space to separate thousands: 1 000 000 (one million). The standard English comma is NOT used in French: "1,000,000" would be misread as "one point zero" in French. In handwriting, the period or apostrophe is sometimes used: 1.000.000 or 1\'000\'000.',
    flag: '🔢',
  },
  {
    title: '"Mille" never changes',
    desc: '"Mille" (thousand) never takes an -s in French: "deux mille" (2,000), "cinq mille" (5,000). Contrast with "million" and "milliard" which do take -s in the plural: "deux millions" (2,000,000), "cinq milliards" (5,000,000,000).',
    flag: '📏',
  },
  {
    title: 'French billions: attention!',
    desc: 'False friend alert: "un billion" in French = 1,000,000,000,000 (one trillion in English). "Un milliard" = 1,000,000,000 (one billion in English). This causes genuine confusion in financial news — always check context.',
    flag: '⚠️',
  },
  {
    title: 'Year numbers in French',
    desc: 'Years are said as full numbers, not in pairs: 1789 = "dix-sept cent quatre-vingt-neuf". However: 2024 = "deux mille vingt-quatre" (never "vingt vingt-quatre"). The Revolution was "en dix-sept cent quatre-vingt-neuf" or "en mil sept cent quatre-vingt-neuf".',
    flag: '📅',
  },
]

const NUMBER_PHRASES = [
  { fr: 'J\'ai vingt-cinq ans.', en: 'I\'m twenty-five years old.' },
  { fr: 'Ça coûte quatre-vingt-dix euros.', en: 'That costs ninety euros.' },
  { fr: 'Il habite au troisième étage.', en: 'He lives on the third floor.' },
  { fr: 'C\'est au numéro soixante et un.', en: 'It\'s at number sixty-one.' },
  { fr: 'Mon code postal est le soixante-quinze.', en: 'My postcode is seventy-five (Paris is 75).', note: 'Paris postcodes: 75001 to 75020 (the 20 arrondissements).' },
  { fr: 'La température est de moins cinq degrés.', en: 'The temperature is minus five degrees.' },
  { fr: 'Il y a deux mille étudiants dans cette université.', en: 'There are two thousand students in this university.' },
  { fr: 'Ce livre coûte dix-neuf euros quatre-vingt-dix.', en: 'This book costs nineteen euros ninety.' },
  { fr: 'Mon numéro de téléphone est le zéro six, vingt-trois, quarante-cinq.', en: 'My phone number is 06 23 45 (read in pairs).' },
  { fr: 'La population de la France est d\'environ soixante-huit millions.', en: 'The population of France is approximately 68 million.' },
]

export default function FrenchNumbers2() {
  const [tab, setTab] = useState('cardinal')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Numbers | SayBonjour!" description="Master French numbers — cardinals 0–1 billion, ordinals, the 70/80/90 system, phone numbers, and tricky rules." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Numbers</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les nombres — cardinals, ordinals, and the quirky French number system</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'cardinal', label: 'Cardinal Numbers' },
            { id: 'ordinal', label: 'Ordinal Numbers' },
            { id: 'tricky', label: 'Tricky Rules' },
            { id: 'phrases', label: 'In Context' },
          ].map(t => (
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
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-3 py-2 cursor-pointer"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-gray-400 w-12 shrink-0">{num.n.toLocaleString('fr-FR')}</span>
                  <SpeakButton text={num.fr.split('/')[0].trim()} size="sm" />
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 truncate">{num.fr}</p>
                </div>
                {num.note && <p className="text-xs text-amber-500 italic mt-0.5 ml-14">{num.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'ordinal' && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300 mb-2">
              <strong>Formation rule:</strong> Add <strong>-ième</strong> to the cardinal number (dropping the final silent "e" if present): <em>quatre → quatrième, huit → huitième</em>. Exception: <strong>premier / première</strong> (1st) is completely irregular.
            </div>
            {ORDINALS.map((o, i) => (
              <motion.div key={o.n} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-center gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <span className="font-mono font-bold text-gray-400 w-12 shrink-0">{o.n}</span>
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
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(3, 'vocabulary')}>
                <span className="text-3xl shrink-0">{note.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{note.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{note.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {NUMBER_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
