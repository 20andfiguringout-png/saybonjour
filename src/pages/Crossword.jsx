import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, RotateCcw, Eye, Lightbulb } from 'lucide-react'
import SEO from '../components/SEO'
import { addXP } from '../utils/progress'

const PUZZLES = [
  {
    id: 1,
    title: 'À la maison',
    gridSize: 9,
    words: [
      {
        id: 1, word: 'MAISON', clue: 'House (la ___)', direction: 'across',
        startRow: 0, startCol: 0, number: 1,
      },
      {
        id: 2, word: 'TABLE', clue: 'Table (la ___)', direction: 'down',
        startRow: 0, startCol: 2, number: 2,
      },
      {
        id: 3, word: 'ARBRE', clue: 'Tree (l\'___)', direction: 'across',
        startRow: 2, startCol: 0, number: 3,
      },
      {
        id: 4, word: 'PORTE', clue: 'Door (la ___)', direction: 'down',
        startRow: 0, startCol: 5, number: 4,
      },
      {
        id: 5, word: 'SALON', clue: 'Living room', direction: 'across',
        startRow: 4, startCol: 2, number: 5,
      },
      {
        id: 6, word: 'LIT', clue: 'Bed (le ___)', direction: 'down',
        startRow: 4, startCol: 6, number: 6,
      },
    ],
  },
  {
    id: 2,
    title: 'La nourriture',
    gridSize: 9,
    words: [
      {
        id: 1, word: 'PAIN', clue: 'Bread (le ___)', direction: 'across',
        startRow: 0, startCol: 0, number: 1,
      },
      {
        id: 2, word: 'POMME', clue: 'Apple (la ___)', direction: 'down',
        startRow: 0, startCol: 1, number: 2,
      },
      {
        id: 3, word: 'CAFE', clue: 'Coffee (le ___)', direction: 'across',
        startRow: 2, startCol: 0, number: 3,
      },
      {
        id: 4, word: 'FROMAGE', clue: 'Cheese (le ___)', direction: 'across',
        startRow: 4, startCol: 0, number: 4,
      },
      {
        id: 5, word: 'GATEAU', clue: 'Cake (le ___)', direction: 'down',
        startRow: 0, startCol: 3, number: 5,
      },
      {
        id: 6, word: 'EAU', clue: 'Water (l\'___)', direction: 'across',
        startRow: 6, startCol: 1, number: 6,
      },
    ],
  },
]

function buildGrid(puzzle) {
  const { gridSize, words } = puzzle
  const grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => ({ letter: null, wordIds: [], number: null, reveal: false }))
  )
  for (const w of words) {
    const { word, startRow, startCol, direction, id, number } = w
    for (let i = 0; i < word.length; i++) {
      const r = direction === 'across' ? startRow : startRow + i
      const c = direction === 'across' ? startCol + i : startCol
      if (!grid[r] || !grid[r][c]) continue
      grid[r][c].letter = word[i]
      grid[r][c].wordIds.push(id)
      if (i === 0) grid[r][c].number = number
    }
  }
  return grid
}

export default function Crossword() {
  const [puzzleIdx, setPuzzleIdx] = useState(0)
  const puzzle = PUZZLES[puzzleIdx]
  const grid = buildGrid(puzzle)

  const [inputs, setInputs] = useState(() => {
    const s = {}
    for (const w of puzzle.words) {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.direction === 'across' ? w.startRow : w.startRow + i
        const c = w.direction === 'across' ? w.startCol + i : w.startCol
        s[`${r},${c}`] = ''
      }
    }
    return s
  })
  const [revealed, setRevealed] = useState({})
  const [checked, setChecked] = useState(false)
  const [solved, setSolved] = useState(false)
  const [hints, setHints] = useState(0)
  const inputRefs = useRef({})

  const resetPuzzle = useCallback((idx) => {
    const p = PUZZLES[idx]
    const s = {}
    for (const w of p.words) {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.direction === 'across' ? w.startRow : w.startRow + i
        const c = w.direction === 'across' ? w.startCol + i : w.startCol
        s[`${r},${c}`] = ''
      }
    }
    setInputs(s)
    setRevealed({})
    setChecked(false)
    setSolved(false)
    setHints(0)
    setPuzzleIdx(idx)
  }, [])

  const handleInput = (r, c, val) => {
    const letter = val.toUpperCase().replace(/[^A-ZÀ-Ü]/g, '').slice(-1)
    setInputs(prev => ({ ...prev, [`${r},${c}`]: letter }))
    setChecked(false)
    setSolved(false)
    if (letter) {
      const keys = Object.keys(inputs)
      const curIdx = keys.indexOf(`${r},${c}`)
      const next = keys[curIdx + 1]
      if (next && inputRefs.current[next]) inputRefs.current[next].focus()
    }
  }

  const checkPuzzle = () => {
    setChecked(true)
    const allCorrect = Object.entries(inputs).every(([key, val]) => {
      const [r, c] = key.split(',').map(Number)
      return val === grid[r][c].letter
    })
    if (allCorrect) {
      setSolved(true)
      addXP(30, 'word_match')
    }
  }

  const revealHint = () => {
    const wrongCells = Object.entries(inputs).filter(([key, val]) => {
      const [r, c] = key.split(',').map(Number)
      return val !== grid[r][c].letter
    })
    if (wrongCells.length === 0) return
    const [key] = wrongCells[Math.floor(Math.random() * wrongCells.length)]
    const [r, c] = key.split(',').map(Number)
    setInputs(prev => ({ ...prev, [key]: grid[r][c].letter }))
    setRevealed(prev => ({ ...prev, [key]: true }))
    setHints(h => h + 1)
  }

  const revealAll = () => {
    const all = {}
    const rev = {}
    Object.keys(inputs).forEach(key => {
      const [r, c] = key.split(',').map(Number)
      all[key] = grid[r][c].letter
      rev[key] = true
    })
    setInputs(all)
    setRevealed(rev)
    setSolved(true)
  }

  const getCellStatus = (r, c) => {
    const key = `${r},${c}`
    if (!checked) return ''
    const val = inputs[key]
    const correct = val === grid[r][c].letter
    if (revealed[key]) return 'revealed'
    return correct ? 'correct' : val ? 'wrong' : ''
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Crossword | SayBonjour!" description="Solve mini French crossword puzzles and expand your vocabulary." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Crossword</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Mots Croisés — complete the puzzle!</p>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          {PUZZLES.map((p, i) => (
            <button key={p.id} onClick={() => resetPuzzle(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${i === puzzleIdx ? 'bg-burgundy-600 text-white border-burgundy-600' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-dark-warm-50'}`}>
              {p.title}
            </button>
          ))}
        </div>

        {solved && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl py-3 px-5 text-emerald-700 dark:text-emerald-300 font-medium">
            <CheckCircle2 size={20} /> Félicitations! Puzzle solved! {hints > 0 ? `(${hints} hint${hints > 1 ? 's' : ''} used)` : '+30 XP'}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 inline-block">
              <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${puzzle.gridSize}, 2.25rem)` }}>
                {Array.from({ length: puzzle.gridSize }).map((_, r) =>
                  Array.from({ length: puzzle.gridSize }).map((_, c) => {
                    const cell = grid[r][c]
                    const key = `${r},${c}`
                    const status = getCellStatus(r, c)
                    if (!cell.letter) {
                      return <div key={key} className="w-9 h-9 bg-gray-900 dark:bg-gray-950 rounded-sm" />
                    }
                    return (
                      <div key={key} className="relative w-9 h-9">
                        {cell.number && (
                          <span className="absolute top-0 left-0.5 text-[8px] text-gray-500 dark:text-gray-400 leading-none z-10">{cell.number}</span>
                        )}
                        <input
                          ref={el => inputRefs.current[key] = el}
                          maxLength={1}
                          value={inputs[key] || ''}
                          onChange={e => handleInput(r, c, e.target.value)}
                          className={`w-full h-full text-center font-bold text-sm uppercase border rounded-sm focus:outline-none focus:ring-1 focus:ring-burgundy-400 transition-colors
                            ${status === 'correct' ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400 text-emerald-700' :
                              status === 'wrong' ? 'bg-red-100 dark:bg-red-900/30 border-red-400 text-red-700' :
                              status === 'revealed' ? 'bg-amber-100 dark:bg-amber-900/20 border-amber-400 text-amber-700' :
                              'bg-cream-50 dark:bg-dark-warm-200 border-gray-300 dark:border-dark-warm-50 text-gray-900 dark:text-cream-50'}`}
                        />
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <button onClick={checkPuzzle}
                className="px-4 py-2 bg-burgundy-600 text-white rounded-lg text-sm font-medium hover:bg-burgundy-700 transition-colors flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Check
              </button>
              <button onClick={revealHint}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors flex items-center gap-1.5">
                <Lightbulb size={14} /> Hint
              </button>
              <button onClick={revealAll}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors flex items-center gap-1.5">
                <Eye size={14} /> Reveal all
              </button>
              <button onClick={() => resetPuzzle(puzzleIdx)}
                className="px-4 py-2 bg-white dark:bg-dark-warm-100 border border-gray-200 dark:border-dark-warm-50 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-dark-warm-200 transition-colors flex items-center gap-1.5">
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Across →</h3>
              <ul className="space-y-2">
                {puzzle.words.filter(w => w.direction === 'across').map(w => (
                  <li key={w.id} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-bold text-burgundy-600 w-5 shrink-0">{w.number}.</span>
                    <span>{w.clue} ({w.word.length} letters)</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Down ↓</h3>
              <ul className="space-y-2">
                {puzzle.words.filter(w => w.direction === 'down').map(w => (
                  <li key={w.id} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-bold text-burgundy-600 w-5 shrink-0">{w.number}.</span>
                    <span>{w.clue} ({w.word.length} letters)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
