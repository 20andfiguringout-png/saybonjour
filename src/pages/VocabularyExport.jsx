import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, FileSpreadsheet, CheckCircle2, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const WORD_LISTS = {
  'Essential A1': [
    { fr: 'bonjour', en: 'hello', category: 'Greetings', level: 'A1' },
    { fr: 'au revoir', en: 'goodbye', category: 'Greetings', level: 'A1' },
    { fr: 'merci', en: 'thank you', category: 'Greetings', level: 'A1' },
    { fr: 'oui', en: 'yes', category: 'Basics', level: 'A1' },
    { fr: 'non', en: 'no', category: 'Basics', level: 'A1' },
    { fr: 's\'il vous plaît', en: 'please', category: 'Greetings', level: 'A1' },
    { fr: 'excusez-moi', en: 'excuse me', category: 'Greetings', level: 'A1' },
    { fr: 'je suis', en: 'I am', category: 'Verbs', level: 'A1' },
    { fr: 'il y a', en: 'there is / there are', category: 'Expressions', level: 'A1' },
    { fr: 'je voudrais', en: 'I would like', category: 'Expressions', level: 'A1' },
    { fr: 'où est', en: 'where is', category: 'Questions', level: 'A1' },
    { fr: 'combien', en: 'how much / how many', category: 'Questions', level: 'A1' },
  ],
  'Numbers & Time': [
    { fr: 'un', en: 'one', category: 'Numbers', level: 'A1' },
    { fr: 'deux', en: 'two', category: 'Numbers', level: 'A1' },
    { fr: 'trois', en: 'three', category: 'Numbers', level: 'A1' },
    { fr: 'dix', en: 'ten', category: 'Numbers', level: 'A1' },
    { fr: 'vingt', en: 'twenty', category: 'Numbers', level: 'A1' },
    { fr: 'cent', en: 'one hundred', category: 'Numbers', level: 'A1' },
    { fr: 'aujourd\'hui', en: 'today', category: 'Time', level: 'A1' },
    { fr: 'demain', en: 'tomorrow', category: 'Time', level: 'A1' },
    { fr: 'hier', en: 'yesterday', category: 'Time', level: 'A1' },
    { fr: 'maintenant', en: 'now', category: 'Time', level: 'A1' },
    { fr: 'lundi', en: 'Monday', category: 'Days', level: 'A1' },
    { fr: 'mardi', en: 'Tuesday', category: 'Days', level: 'A1' },
  ],
  'Core Verbs A2': [
    { fr: 'aller', en: 'to go', category: 'Verbs', level: 'A2' },
    { fr: 'venir', en: 'to come', category: 'Verbs', level: 'A2' },
    { fr: 'faire', en: 'to do / make', category: 'Verbs', level: 'A2' },
    { fr: 'avoir', en: 'to have', category: 'Verbs', level: 'A2' },
    { fr: 'être', en: 'to be', category: 'Verbs', level: 'A2' },
    { fr: 'pouvoir', en: 'to be able to / can', category: 'Verbs', level: 'A2' },
    { fr: 'vouloir', en: 'to want', category: 'Verbs', level: 'A2' },
    { fr: 'savoir', en: 'to know (fact)', category: 'Verbs', level: 'A2' },
    { fr: 'prendre', en: 'to take', category: 'Verbs', level: 'A2' },
    { fr: 'partir', en: 'to leave', category: 'Verbs', level: 'A2' },
    { fr: 'arriver', en: 'to arrive', category: 'Verbs', level: 'A2' },
    { fr: 'trouver', en: 'to find', category: 'Verbs', level: 'A2' },
  ],
  'B1 Expressions': [
    { fr: 'en revanche', en: 'on the other hand', category: 'Connectors', level: 'B1' },
    { fr: 'pourtant', en: 'yet / however', category: 'Connectors', level: 'B1' },
    { fr: 'néanmoins', en: 'nevertheless', category: 'Connectors', level: 'B1' },
    { fr: 'par conséquent', en: 'consequently', category: 'Connectors', level: 'B1' },
    { fr: 'en effet', en: 'indeed / in fact', category: 'Connectors', level: 'B1' },
    { fr: 'il s\'agit de', en: 'it is about / it concerns', category: 'Expressions', level: 'B1' },
    { fr: 'avoir du mal à', en: 'to struggle to', category: 'Expressions', level: 'B1' },
    { fr: 'se rendre compte', en: 'to realise', category: 'Expressions', level: 'B1' },
    { fr: 'd\'ailleurs', en: 'moreover / besides', category: 'Connectors', level: 'B1' },
    { fr: 'désormais', en: 'from now on / henceforth', category: 'Adverbs', level: 'B1' },
    { fr: 'voire', en: 'or even / indeed', category: 'Connectors', level: 'B1' },
    { fr: 'à condition que', en: 'provided that', category: 'Connectors', level: 'B1' },
  ],
}

function toCsv(words, listName) {
  const header = 'French,English,Category,Level\n'
  const rows = words.map(w => `"${w.fr}","${w.en}","${w.category}","${w.level}"`).join('\n')
  return header + rows
}

function toTxt(words, listName) {
  let out = `=== ${listName} ===\n\n`
  words.forEach((w, i) => {
    out += `${i + 1}. ${w.fr} — ${w.en}  [${w.category}, ${w.level}]\n`
  })
  return out
}

function toAnki(words) {
  return words.map(w => `${w.fr}\t${w.en}`).join('\n')
}

const FORMAT_OPTIONS = [
  { id: 'csv', label: 'CSV (.csv)', icon: FileSpreadsheet, description: 'Spreadsheet — Excel, Google Sheets' },
  { id: 'txt', label: 'Plain Text (.txt)', icon: FileText, description: 'Simple text file for printing' },
  { id: 'anki', label: 'Anki Flashcards (.txt)', icon: BookOpen, description: 'Tab-separated import for Anki SRS' },
]

export default function VocabularyExport() {
  const [selectedList, setSelectedList] = useState('Essential A1')
  const [selectedFormat, setSelectedFormat] = useState('csv')
  const [exported, setExported] = useState(false)

  const handleExport = () => {
    const words = WORD_LISTS[selectedList]
    let content, filename, mime

    if (selectedFormat === 'csv') {
      content = toCsv(words, selectedList)
      filename = `saybonjour-${selectedList.toLowerCase().replace(/\s+/g, '-')}.csv`
      mime = 'text/csv'
    } else if (selectedFormat === 'txt') {
      content = toTxt(words, selectedList)
      filename = `saybonjour-${selectedList.toLowerCase().replace(/\s+/g, '-')}.txt`
      mime = 'text/plain'
    } else {
      content = toAnki(words)
      filename = `saybonjour-${selectedList.toLowerCase().replace(/\s+/g, '-')}-anki.txt`
      mime = 'text/plain'
    }

    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    setExported(true)
    addXP(5, 'vocabulary')
    setTimeout(() => setExported(false), 3000)
  }

  const preview = WORD_LISTS[selectedList].slice(0, 5)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Export Vocabulary | SayBonjour!" description="Download your French vocabulary lists as CSV, text, or Anki flashcard files." />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Export Vocabulary</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Download your word lists for offline study</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl border border-gray-100 dark:border-dark-warm-50 shadow p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">1. Choose a word list</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(WORD_LISTS).map(list => (
                <button key={list} onClick={() => setSelectedList(list)}
                  className={`p-3 rounded-xl border-2 text-left transition-colors ${selectedList === list ? 'border-burgundy-500 bg-burgundy-50 dark:bg-burgundy-vibrant-600/10' : 'border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  <div className="font-medium text-sm text-gray-800 dark:text-cream-50">{list}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{WORD_LISTS[list].length} words</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl border border-gray-100 dark:border-dark-warm-50 shadow p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">2. Choose a format</h2>
            <div className="space-y-2">
              {FORMAT_OPTIONS.map(fmt => (
                <button key={fmt.id} onClick={() => setSelectedFormat(fmt.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors ${selectedFormat === fmt.id ? 'border-burgundy-500 bg-burgundy-50 dark:bg-burgundy-vibrant-600/10' : 'border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  <fmt.icon size={20} className="text-burgundy-600 shrink-0" />
                  <div>
                    <div className="font-medium text-sm text-gray-800 dark:text-cream-50">{fmt.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{fmt.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl border border-gray-100 dark:border-dark-warm-50 shadow p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-3">Preview (first 5 words)</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-dark-warm-50">
                  <th className="text-left pb-2 text-gray-500 font-medium">French</th>
                  <th className="text-left pb-2 text-gray-500 font-medium">English</th>
                  <th className="text-left pb-2 text-gray-500 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left pb-2 text-gray-500 font-medium">Level</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((w, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-dark-warm-200 last:border-0">
                    <td className="py-2 font-medium text-burgundy-700 dark:text-burgundy-vibrant-300">{w.fr}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{w.en}</td>
                    <td className="py-2 text-gray-500 dark:text-gray-500 hidden sm:table-cell">{w.category}</td>
                    <td className="py-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${w.level === 'A1' ? 'bg-emerald-100 text-emerald-700' : w.level === 'A2' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{w.level}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-2">+ {WORD_LISTS[selectedList].length - 5} more words in full export</p>
          </div>

          <motion.button onClick={handleExport} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors ${exported ? 'bg-emerald-500 text-white' : 'bg-burgundy-600 hover:bg-burgundy-700 text-white'}`}>
            {exported ? <><CheckCircle2 size={22} /> Downloaded!</> : <><Download size={22} /> Download {WORD_LISTS[selectedList].length} words as {selectedFormat.toUpperCase()}</>}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
