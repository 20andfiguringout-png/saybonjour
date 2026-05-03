import React from 'react'

const ACCENTS = [
  'à', 'â', 'ä',
  'é', 'è', 'ê', 'ë',
  'î', 'ï',
  'ô', 'ö',
  'ù', 'û', 'ü',
  'ç', 'œ', 'æ',
]

export default function AccentKeyboard({ onInsert, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {ACCENTS.map(a => (
        <button
          key={a}
          type="button"
          onClick={() => onInsert(a)}
          title={`Insert ${a}`}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 dark:border-dark-warm-50 bg-white dark:bg-dark-warm-100 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-burgundy-50 dark:hover:bg-burgundy-vibrant-600/10 hover:border-burgundy-300 hover:text-burgundy-700 dark:hover:text-burgundy-vibrant-300 transition-colors focus:outline-none focus:ring-1 focus:ring-burgundy-400"
        >
          {a}
        </button>
      ))}
    </div>
  )
}
