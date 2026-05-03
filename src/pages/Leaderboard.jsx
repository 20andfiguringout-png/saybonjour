import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap, Flame, Medal, Crown, Star } from 'lucide-react'
import SEO from '../components/SEO'
import { getProgress, getRank, RANKS } from '../utils/progress'
import { useUser } from '../context/UserContext'

const DEMO_USERS = [
  { name: 'Sophie Martin', xp: 12450, streak: 45, country: '🇫🇷', badge: '💎', level: 25 },
  { name: 'Lucas Bernard', xp: 9870, streak: 32, country: '🇬🇧', badge: '🌟', level: 20 },
  { name: 'Emma Wilson', xp: 8210, streak: 28, country: '🇺🇸', badge: '⚡', level: 17 },
  { name: 'Thomas Dubois', xp: 7650, streak: 21, country: '🇨🇦', badge: '🔥', level: 16 },
  { name: 'Camille Leroy', xp: 6540, streak: 19, country: '🇧🇪', badge: '🎓', level: 14 },
  { name: 'James Taylor', xp: 5980, streak: 15, country: '🇦🇺', badge: '📚', level: 12 },
  { name: 'Amélie Petit', xp: 5210, streak: 12, country: '🇫🇷', badge: '🌺', level: 11 },
  { name: 'Oliver Smith', xp: 4870, streak: 10, country: '🇬🇧', badge: '🎯', level: 10 },
  { name: 'Isabelle Moreau', xp: 4120, streak: 8, country: '🇨🇭', badge: '🦋', level: 9 },
  { name: 'Noah Johnson', xp: 3650, streak: 7, country: '🇺🇸', badge: '🌸', level: 8 },
  { name: 'Chloé Dupont', xp: 3210, streak: 6, country: '🇫🇷', badge: '🌿', level: 7 },
  { name: 'Liam Anderson', xp: 2890, streak: 5, country: '🇨🇦', badge: '⭐', level: 6 },
  { name: 'Manon Blanc', xp: 2340, streak: 4, country: '🇧🇪', badge: '✨', level: 5 },
  { name: 'Ethan Brown', xp: 1980, streak: 3, country: '🇺🇸', badge: '🎸', level: 4 },
]

const RANK_ICON = ['🥇', '🥈', '🥉']

function RankBadge({ xp }) {
  const rank = getRank(xp)
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${rank.bg} ${rank.color}`}>
      {rank.icon} {rank.name}
    </span>
  )
}

export default function Leaderboard() {
  const [tab, setTab] = useState('global')
  const [progress, setProgress] = useState(null)
  const { user } = useUser()

  useEffect(() => { setProgress(getProgress()) }, [])

  if (!progress) return null

  const myXP = progress.xp
  const myStreak = progress.streak
  const myLevel = progress.level
  const myName = user?.username || user?.name || 'You'
  const myRank = getRank(myXP)

  const allUsers = [...DEMO_USERS, { name: myName, xp: myXP, streak: myStreak, country: '🌍', badge: myRank.icon, level: myLevel, isMe: true }]
    .sort((a, b) => b.xp - a.xp)

  const myPosition = allUsers.findIndex(u => u.isMe) + 1

  const weeklyUsers = [...DEMO_USERS.map(u => ({ ...u, xp: Math.floor(u.xp * (0.1 + Math.random() * 0.15)) })),
    { name: myName, xp: Math.min(myXP, 500), streak: myStreak, country: '🌍', badge: myRank.icon, level: myLevel, isMe: true }]
    .sort((a, b) => b.xp - a.xp)

  const displayUsers = tab === 'global' ? allUsers : weeklyUsers

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Leaderboard | SayBonjour!" description="See how you rank against French learners worldwide on SayBonjour!" />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Classement des apprenants</p>
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 mb-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold uppercase tracking-wide">Your Stats</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-burgundy-600">#{myPosition}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Global Rank</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">{myXP.toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total XP</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">{myStreak}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Day Streak</p>
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <RankBadge xp={myXP} />
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {[['global', 'All Time'], ['weekly', 'This Week']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {displayUsers.map((user, i) => (
            <motion.div key={`${user.name}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-4 p-4 rounded-xl border ${user.isMe ? 'bg-burgundy-50 dark:bg-burgundy-900/20 border-burgundy-300 dark:border-burgundy-700' : 'bg-white dark:bg-dark-warm-100 border-gray-100 dark:border-dark-warm-50'}`}>
              <div className="flex-shrink-0 w-8 text-center">
                {i < 3 ? <span className="text-xl">{RANK_ICON[i]}</span> : <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">#{i + 1}</span>}
              </div>
              <div className="text-xl">{user.country}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold truncate ${user.isMe ? 'text-burgundy-700 dark:text-burgundy-300' : 'text-gray-900 dark:text-cream-50'}`}>
                    {user.name} {user.isMe && '(You)'}
                  </span>
                  <span className="text-sm">{user.badge}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>Lv.{user.level}</span>
                  <span className="flex items-center gap-1"><Flame size={11} className="text-orange-400" />{user.streak}d</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-amber-500">{user.xp.toLocaleString()}</p>
                <p className="text-xs text-gray-400">XP</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 dark:bg-dark-warm-100 border border-amber-200 dark:border-dark-warm-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 dark:text-cream-50 mb-3 flex items-center gap-2"><Star className="text-amber-500" size={16} /> How to Earn More XP</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
            {[['Daily Login', '+10 XP'], ['Word Learned', '+5 XP'], ['Lesson Read', '+15 XP'], ['Quiz Completed', '+25 XP'], ['3-Day Streak', '2× multiplier'], ['7-Day Streak', '3× multiplier']].map(([act, xp]) => (
              <div key={act} className="flex justify-between"><span>{act}</span><span className="font-semibold text-burgundy-600">{xp}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
