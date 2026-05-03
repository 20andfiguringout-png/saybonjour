import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, TrendingUp, Gamepad2, Zap } from 'lucide-react'
import SEO from '../components/SEO'

const GAME_KEYS = {
  hangman_score: { label: 'Hangman', icon: '🎯', color: 'blue', unit: 'words' },
  hangman_streak: { label: 'Hangman Best Streak', icon: '🔥', color: 'orange', unit: 'streak' },
  word_scramble_score: { label: 'Word Scramble', icon: '🔀', color: 'purple', unit: 'words' },
  spelling_bee_score: { label: 'Spelling Bee', icon: '🐝', color: 'yellow', unit: 'words' },
  word_match_best: { label: 'Word Match', icon: '⚡', color: 'green', unit: 'pairs' },
  typing_race_best: { label: 'Typing Race', icon: '⌨️', color: 'red', unit: 'WPM' },
  gender_practice_score: { label: 'Gender Practice', icon: '🏷️', color: 'pink', unit: 'correct' },
  verb_drills_score: { label: 'Verb Drills', icon: '📝', color: 'indigo', unit: 'correct' },
  false_friends_score: { label: 'False Friends', icon: '🚫', color: 'rose', unit: 'correct' },
  numbers_quiz_score: { label: 'French Numbers Quiz', icon: '🔢', color: 'teal', unit: 'correct' },
}

const COLOR_MAP = {
  blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300',
  purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300',
  green: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
  red: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300',
  pink: 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300',
  indigo: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300',
  rose: 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
  teal: 'bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300',
}

const LS_KEYS = [
  'saybonjour_progress',
  ...Object.keys(GAME_KEYS),
]

function readScore(key) {
  try {
    if (key === 'saybonjour_progress') {
      const p = JSON.parse(localStorage.getItem('saybonjour_progress') || '{}')
      return p.totalXP || 0
    }
    return parseInt(localStorage.getItem(key) || '0', 10)
  } catch {
    return 0
  }
}

function readAllScores() {
  return Object.keys(GAME_KEYS).reduce((acc, k) => {
    acc[k] = readScore(k)
    return acc
  }, {})
}

const FAKE_HISTORY = [
  { game: 'Hangman', score: 12, unit: 'words', date: '2 days ago' },
  { game: 'Word Scramble', score: 8, unit: 'words', date: '3 days ago' },
  { game: 'Verb Drills', score: 15, unit: 'correct', date: '4 days ago' },
  { game: 'Spelling Bee', score: 6, unit: 'words', date: '5 days ago' },
  { game: 'Gender Practice', score: 35, unit: 'correct', date: '1 week ago' },
]

export default function HighScores() {
  const [scores, setScores] = useState({})
  const [totalXP, setTotalXP] = useState(0)

  useEffect(() => {
    setScores(readAllScores())
    try {
      const p = JSON.parse(localStorage.getItem('saybonjour_progress') || '{}')
      setTotalXP(p.totalXP || 0)
    } catch {}
  }, [])

  const handleReset = (key) => {
    if (!window.confirm(`Reset your ${GAME_KEYS[key].label} score?`)) return
    localStorage.removeItem(key)
    setScores(s => ({ ...s, [key]: 0 }))
  }

  const topScores = Object.entries(scores)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)

  const gamesPlayed = topScores.length

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="High Scores | SayBonjour!" description="View your personal best scores across all French learning games." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50 flex items-center justify-center gap-3">
            <Trophy size={32} className="text-amber-500" /> High Scores
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Meilleurs scores — your personal bests</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total XP', value: totalXP, icon: Zap, color: 'text-amber-500' },
            { label: 'Games played', value: gamesPlayed, icon: Gamepad2, color: 'text-burgundy-600' },
            { label: 'Best score', value: topScores[0]?.[1] || 0, icon: TrendingUp, color: 'text-emerald-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 text-center">
              <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-cream-50">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {Object.entries(GAME_KEYS).map(([key, meta], i) => {
            const score = scores[key] || 0
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${COLOR_MAP[meta.color]}`}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 dark:text-cream-50 text-sm truncate">{meta.label}</div>
                  <div className="text-xl font-bold text-burgundy-600">{score} <span className="text-xs font-normal text-gray-400">{meta.unit}</span></div>
                </div>
                {score > 0 && (
                  <button onClick={() => handleReset(key)} title="Reset score"
                    className="text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors shrink-0">
                    <RotateCcw size={15} />
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-burgundy-600" /> Recent activity
          </h2>
          {FAKE_HISTORY.map((h, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-dark-warm-200 last:border-0">
              <div>
                <span className="font-medium text-sm text-gray-800 dark:text-cream-50">{h.game}</span>
                <span className="text-xs text-gray-400 ml-2">{h.date}</span>
              </div>
              <div className="text-sm font-bold text-burgundy-600">{h.score} {h.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
