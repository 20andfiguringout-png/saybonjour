import React, { useState, useEffect } from 'react'
import { Flame, Star, Award, TrendingUp, BookOpen, Brain, Zap, Target, BarChart2, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { getProgress, getAllBadges, getXPForNextLevel } from '../utils/progress'
import SEO from '../components/SEO'

const cefrColors = {
  A1: 'text-emerald-600 bg-emerald-100',
  A2: 'text-blue-600 bg-blue-100',
  B1: 'text-yellow-700 bg-yellow-100',
  B2: 'text-orange-600 bg-orange-100',
  C1: 'text-purple-600 bg-purple-100',
  C2: 'text-red-700 bg-red-100',
}

const StatCard = ({ icon: Icon, label, value, sub, color = 'text-burgundy-600', bg = 'bg-burgundy-50' }) => (
  <motion.div
    className="bg-white rounded-2xl border border-cream-200 p-5 shadow-sm"
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
  >
    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-sm font-medium text-gray-700 mt-0.5">{label}</div>
    {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
  </motion.div>
)

const XPBar = ({ xp, level }) => {
  const nextLevelXP = getXPForNextLevel(level)
  const prevLevelXP = getXPForNextLevel(level - 1)
  const progress = Math.min(((xp - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100, 100)

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span>Level {level}</span>
        <span>{xp} / {nextLevelXP} XP</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-burgundy-500 to-burgundy-700 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <div className="text-xs text-gray-400 mt-1">{nextLevelXP - xp} XP to Level {level + 1}</div>
    </div>
  )
}

const StreakDisplay = ({ streak }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today = new Date().getDay()
  const filled = Math.min(streak, 7)

  return (
    <div className="flex gap-1.5">
      {days.map((day, i) => {
        const isActive = i < filled
        return (
          <div key={day} className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
              isActive ? 'bg-amber-400 text-white shadow-sm' : 'bg-gray-100 text-gray-300'
            }`}>
              {isActive ? '🔥' : '·'}
            </div>
            <span className="text-xs text-gray-400">{day[0]}</span>
          </div>
        )
      })}
    </div>
  )
}

const WeeklyChart = ({ weeklyXP }) => {
  const last7 = (() => {
    const result = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
      const entry = weeklyXP?.find(e => e.date === d)
      result.push({ date: d, xp: entry?.xp || 0, label: new Date(Date.now() - i * 86400000).toLocaleDateString('en', { weekday: 'short' }) })
    }
    return result
  })()

  const maxXP = Math.max(...last7.map(d => d.xp), 1)

  return (
    <div className="flex items-end gap-2 h-20">
      {last7.map((day, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className="w-full bg-burgundy-500 rounded-t-sm"
            style={{ height: `${(day.xp / maxXP) * 100}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${(day.xp / maxXP) * 100}%` }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          />
          <span className="text-xs text-gray-400">{day.label[0]}</span>
        </div>
      ))}
    </div>
  )
}

const BadgeGrid = ({ earned, allBadges }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
    {allBadges.map(badge => {
      const isEarned = earned.includes(badge.id)
      return (
        <motion.div
          key={badge.id}
          className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
            isEarned
              ? 'bg-amber-50 border-amber-200 shadow-sm'
              : 'bg-gray-50 border-gray-200 opacity-50'
          }`}
          whileHover={{ scale: 1.05 }}
          title={`${badge.name}: ${badge.description}`}
        >
          <span className="text-2xl mb-1">{badge.icon}</span>
          <span className={`text-xs font-medium ${isEarned ? 'text-amber-800' : 'text-gray-400'}`}>
            {badge.name}
          </span>
        </motion.div>
      )
    })}
  </div>
)

const Progress = () => {
  const [progress, setProgress] = useState(null)
  const allBadges = getAllBadges()

  useEffect(() => {
    setProgress(getProgress())
    const handler = () => setProgress(getProgress())
    window.addEventListener('progressUpdated', handler)
    return () => window.removeEventListener('progressUpdated', handler)
  }, [])

  if (!progress) return null

  const xpToNextLevel = getXPForNextLevel(progress.level) - progress.xp
  const earnedCount = (progress.badges || []).length

  return (
    <>
      <SEO
        title="My Progress | SayBonjour French Learning"
        description="Track your French learning progress — XP, daily streaks, badges, and CEFR level."
        url="/progress"
      />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-burgundy-800 to-burgundy-600 text-cream-50 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div>
                <div className="inline-flex items-center bg-cream-50/20 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  My Progress
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Learning Dashboard
                </h1>
                <p className="text-cream-200 text-base">Track your journey from A1 to C2</p>
              </div>

              {/* CEFR Level badge */}
              <div className="bg-cream-50/20 backdrop-blur-sm rounded-2xl p-5 text-center border border-cream-50/30">
                <div className={`inline-block text-3xl font-black px-4 py-2 rounded-xl mb-1 ${cefrColors[progress.cefrLevel] || 'text-cream-50 bg-cream-50/20'}`}>
                  {progress.cefrLevel}
                </div>
                <div className="text-xs text-cream-200 mt-1">Current Level</div>
                <div className="text-xs text-cream-200 font-medium">
                  {progress.cefrLevel === 'A1' ? 'Beginner' : progress.cefrLevel === 'A2' ? 'Elementary' : progress.cefrLevel === 'B1' ? 'Intermediate' : progress.cefrLevel === 'B2' ? 'Upper-Int.' : progress.cefrLevel === 'C1' ? 'Advanced' : 'Mastery'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

          {/* XP & Level */}
          <motion.div
            className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Level {progress.level}</h2>
                <p className="text-xs text-gray-500">{progress.xp} total XP earned</p>
              </div>
            </div>
            <XPBar xp={progress.xp} level={progress.level} />
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              icon={Flame}
              label="Day Streak"
              value={progress.streak}
              sub={progress.streak >= 7 ? '🔥 On fire!' : 'Keep going!'}
              color="text-amber-600"
              bg="bg-amber-50"
            />
            <StatCard
              icon={BookOpen}
              label="Words Learned"
              value={progress.totalWordsLearned}
              sub="Added to SRS"
              color="text-burgundy-600"
              bg="bg-burgundy-50"
            />
            <StatCard
              icon={Brain}
              label="Quizzes Done"
              value={progress.totalQuizzesTaken}
              sub={`+25 XP each`}
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <StatCard
              icon={Trophy}
              label="Badges"
              value={`${earnedCount}/${allBadges.length}`}
              sub="Achievements"
              color="text-purple-600"
              bg="bg-purple-50"
            />
          </div>

          {/* Streak calendar */}
          <motion.div
            className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              Daily Streak — {progress.streak} days
            </h2>
            <StreakDisplay streak={progress.streak} />
            {progress.streak === 0 && (
              <p className="text-sm text-gray-400 mt-3">Complete any lesson, quiz, or vocabulary review to start your streak!</p>
            )}
          </motion.div>

          {/* Weekly XP chart */}
          <motion.div
            className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-burgundy-500" />
              XP This Week
            </h2>
            <WeeklyChart weeklyXP={progress.weeklyXP} />
          </motion.div>

          {/* CEFR level map */}
          <motion.div
            className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-burgundy-500" />
              CEFR Level Progress
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level, i) => {
                const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
                const current = levels.indexOf(progress.cefrLevel)
                const isCurrent = level === progress.cefrLevel
                const isPast = i < current

                return (
                  <div key={level} className="flex items-center gap-2">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center border-2 transition-all ${
                      isCurrent ? 'border-burgundy-600 bg-burgundy-600 text-cream-50 shadow-lg scale-110' :
                      isPast ? 'border-emerald-500 bg-emerald-50 text-emerald-700' :
                      'border-gray-200 bg-gray-50 text-gray-400'
                    }`}>
                      <span className="text-xs font-black">{level}</span>
                      {isPast && <span className="text-xs">✓</span>}
                    </div>
                    {i < 5 && (
                      <div className={`w-6 h-0.5 rounded ${isPast ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                    )}
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-gray-400 mt-3">Your current level is set to {progress.cefrLevel}. Complete the grammar lessons and quizzes to advance.</p>
          </motion.div>

          {/* Badges */}
          <motion.div
            className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Badges — {earnedCount} earned
            </h2>
            <BadgeGrid earned={progress.badges || []} allBadges={allBadges} />
          </motion.div>

        </div>
      </div>
    </>
  )
}

export default Progress
