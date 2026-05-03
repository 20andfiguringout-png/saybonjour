import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Printer, Download, FileText, BookOpen, Grid3x3, AlignLeft } from 'lucide-react'
import SEO from '../components/SEO'

const SHEET_TYPES = [
  {
    id: 'vocab-table',
    label: 'Vocabulary Table',
    icon: AlignLeft,
    description: 'A1–B1 word reference list with translation column',
  },
  {
    id: 'conjugation',
    label: 'Conjugation Table',
    icon: Grid3x3,
    description: 'Present tense grid for 6 core verbs',
  },
  {
    id: 'phrases',
    label: 'Key Phrases Sheet',
    icon: BookOpen,
    description: 'Essential French phrases with phonetic hints',
  },
  {
    id: 'blank-vocab',
    label: 'Blank Vocabulary Grid',
    icon: FileText,
    description: 'Empty 3-column grid to fill in yourself',
  },
]

const VOCAB_A1 = [
  ['bonjour', 'hello', ''],
  ['au revoir', 'goodbye', ''],
  ['merci', 'thank you', ''],
  ['s\'il vous plaît', 'please', ''],
  ['oui / non', 'yes / no', ''],
  ['je m\'appelle', 'my name is', ''],
  ['comment allez-vous ?', 'how are you? (formal)', ''],
  ['ça va ?', 'how are you? (informal)', ''],
  ['je suis étudiant(e)', 'I am a student', ''],
  ['j\'habite à…', 'I live in…', ''],
  ['j\'ai … ans', 'I am … years old', ''],
  ['je parle français', 'I speak French', ''],
  ['je ne comprends pas', 'I don\'t understand', ''],
  ['pouvez-vous répéter ?', 'can you repeat?', ''],
  ['où est… ?', 'where is…?', ''],
  ['combien coûte… ?', 'how much is…?', ''],
]

const CONJUGATION_DATA = [
  { verb: 'être', trans: 'to be', forms: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'] },
  { verb: 'avoir', trans: 'to have', forms: ['ai', 'as', 'a', 'avons', 'avez', 'ont'] },
  { verb: 'aller', trans: 'to go', forms: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'] },
  { verb: 'faire', trans: 'to do/make', forms: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'] },
  { verb: 'pouvoir', trans: 'to be able to', forms: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'] },
  { verb: 'vouloir', trans: 'to want', forms: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'] },
]

const PRONOUNS = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles']

const KEY_PHRASES = [
  { fr: 'Bonjour !', phonetic: 'bohn-ZHOOR', en: 'Hello!' },
  { fr: 'Bonsoir !', phonetic: 'bohn-SWAHR', en: 'Good evening!' },
  { fr: 'Bonne nuit !', phonetic: 'bunn NWEE', en: 'Good night!' },
  { fr: 'S\'il vous plaît', phonetic: 'seel voo PLAY', en: 'Please (formal)' },
  { fr: 'Merci beaucoup', phonetic: 'mehr-SEE boh-KOO', en: 'Thank you very much' },
  { fr: 'De rien', phonetic: 'duh RYEHN', en: 'You\'re welcome' },
  { fr: 'Pardon / Excusez-moi', phonetic: 'par-DOH / ex-kü-ZAY mwah', en: 'Sorry / Excuse me' },
  { fr: 'Je ne comprends pas', phonetic: 'zhuh nuh kom-PROH pah', en: 'I don\'t understand' },
  { fr: 'Parlez-vous anglais ?', phonetic: 'par-LAY voo ahng-LAY', en: 'Do you speak English?' },
  { fr: 'Où sont les toilettes ?', phonetic: 'oo soh lay twa-LET', en: 'Where are the toilets?' },
  { fr: 'L\'addition, s\'il vous plaît', phonetic: 'lah-dee-SYOH seel voo play', en: 'The bill, please' },
  { fr: 'Je voudrais…', phonetic: 'zhuh voo-DRAY', en: 'I would like…' },
]

const BLANK_ROWS = 20

function VocabTableSheet() {
  return (
    <div className="print-sheet font-sans">
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-3">
        <h1 className="text-2xl font-bold">SayBonjour! — French Vocabulary A1</h1>
        <p className="text-sm text-gray-600">Name: _________________________ Date: _____________</p>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 px-3 py-2 text-left w-12">#</th>
            <th className="border border-gray-400 px-3 py-2 text-left">French</th>
            <th className="border border-gray-400 px-3 py-2 text-left">English</th>
            <th className="border border-gray-400 px-3 py-2 text-left">My Translation</th>
          </tr>
        </thead>
        <tbody>
          {VOCAB_A1.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-2 text-gray-500">{i + 1}</td>
              <td className="border border-gray-300 px-3 py-2 font-medium">{row[0]}</td>
              <td className="border border-gray-300 px-3 py-2">{row[1]}</td>
              <td className="border border-gray-300 px-3 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-4 text-center">saybonjour.replit.app — printable vocabulary reference</p>
    </div>
  )
}

function ConjugationSheet() {
  return (
    <div className="print-sheet font-sans">
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-3">
        <h1 className="text-2xl font-bold">SayBonjour! — Present Tense Conjugation</h1>
        <p className="text-sm text-gray-600">Name: _________________________ Date: _____________</p>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 px-3 py-2 text-left">Pronoun</th>
            {CONJUGATION_DATA.map(v => (
              <th key={v.verb} className="border border-gray-400 px-2 py-2 text-center">
                <div className="font-bold">{v.verb}</div>
                <div className="text-xs font-normal text-gray-500">{v.trans}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRONOUNS.map((pron, pi) => (
            <tr key={pron} className={pi % 2 === 0 ? '' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-2 font-medium">{pron}</td>
              {CONJUGATION_DATA.map(v => (
                <td key={v.verb} className="border border-gray-300 px-2 py-2 text-center">{v.forms[pi]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-4 text-center">saybonjour.replit.app — present tense reference sheet</p>
    </div>
  )
}

function PhrasesSheet() {
  return (
    <div className="print-sheet font-sans">
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-3">
        <h1 className="text-2xl font-bold">SayBonjour! — Essential French Phrases</h1>
        <p className="text-sm text-gray-600">Name: _________________________ Date: _____________</p>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 px-3 py-2 text-left">French</th>
            <th className="border border-gray-400 px-3 py-2 text-left">Pronunciation guide</th>
            <th className="border border-gray-400 px-3 py-2 text-left">English</th>
          </tr>
        </thead>
        <tbody>
          {KEY_PHRASES.map((p, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-2 font-medium">{p.fr}</td>
              <td className="border border-gray-300 px-3 py-2 text-gray-500 italic text-xs">{p.phonetic}</td>
              <td className="border border-gray-300 px-3 py-2">{p.en}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-4 text-center">saybonjour.replit.app — key phrases reference sheet</p>
    </div>
  )
}

function BlankVocabSheet() {
  return (
    <div className="print-sheet font-sans">
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-3">
        <h1 className="text-2xl font-bold">SayBonjour! — My Vocabulary List</h1>
        <p className="text-sm text-gray-600">Name: _________________________ Date: _____________  Topic: ________________</p>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 px-3 py-2 text-left w-12">#</th>
            <th className="border border-gray-400 px-3 py-2 text-left">French</th>
            <th className="border border-gray-400 px-3 py-2 text-left">English</th>
            <th className="border border-gray-400 px-3 py-2 text-left">Notes / Example sentence</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: BLANK_ROWS }).map((_, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-3 text-gray-400">{i + 1}</td>
              <td className="border border-gray-300 px-3 py-3"></td>
              <td className="border border-gray-300 px-3 py-3"></td>
              <td className="border border-gray-300 px-3 py-3"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-4 text-center">saybonjour.replit.app — blank vocabulary grid</p>
    </div>
  )
}

const SHEET_COMPONENTS = {
  'vocab-table': VocabTableSheet,
  'conjugation': ConjugationSheet,
  'phrases': PhrasesSheet,
  'blank-vocab': BlankVocabSheet,
}

export default function PrintableSheets() {
  const [selected, setSelected] = useState('vocab-table')
  const printRef = useRef(null)

  const handlePrint = () => {
    const content = printRef.current?.innerHTML
    if (!content) return
    const win = window.open('', '_blank')
    win.document.write(`
      <html><head><title>SayBonjour! — Printable Sheet</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #999; padding: 6px 10px; }
        th { background: #f0f0f0; }
        tr:nth-child(even) { background: #f8f8f8; }
        h1 { font-size: 18px; text-align: center; }
        p { text-align: center; color: #888; }
        .border-b-2 { border-bottom: 2px solid #333; margin-bottom: 16px; }
        @media print { body { margin: 10mm; } }
      </style></head>
      <body>${content}</body></html>
    `)
    win.document.close()
    win.focus()
    win.print()
  }

  const SheetComponent = SHEET_COMPONENTS[selected]

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Printable Sheets | SayBonjour!" description="Print French vocabulary tables, conjugation grids, and phrase sheets for offline study." />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Printable Sheets</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Fiches imprimables — study offline with ready-made reference sheets</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {SHEET_TYPES.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              className={`p-4 rounded-xl border-2 text-left transition-colors ${selected === s.id ? 'border-burgundy-500 bg-burgundy-50 dark:bg-burgundy-vibrant-600/10' : 'bg-white dark:bg-dark-warm-100 border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              <s.icon size={20} className="text-burgundy-600 mb-2" />
              <div className="font-medium text-sm text-gray-800 dark:text-cream-50">{s.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.description}</div>
            </button>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          <motion.button onClick={handlePrint} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-burgundy-600 text-white rounded-xl font-medium hover:bg-burgundy-700 transition-colors">
            <Printer size={18} /> Print this sheet
          </motion.button>
          <p className="text-sm text-gray-500 dark:text-gray-400 self-center">Opens browser print dialog — save as PDF if needed</p>
        </div>

        <div ref={printRef} className="bg-white rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-8">
          <SheetComponent />
        </div>
      </div>
    </div>
  )
}
