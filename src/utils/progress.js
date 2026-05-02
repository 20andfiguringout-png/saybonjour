const PROGRESS_KEY = 'saybonjour_progress'

const defaultProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastStudyDate: null,
  totalWordsLearned: 0,
  totalQuizzesTaken: 0,
  totalLessonsRead: 0,
  badges: [],
  cefrLevel: 'A1',
  weeklyXP: [],
}

export const getProgress = () => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY)
    if (!stored) return { ...defaultProgress }
    return { ...defaultProgress, ...JSON.parse(stored) }
  } catch {
    return { ...defaultProgress }
  }
}

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    window.dispatchEvent(new Event('progressUpdated'))
  } catch {}
}

export const addXP = (amount, reason = '') => {
  const progress = getProgress()
  progress.xp += amount

  // Track weekly XP
  const today = new Date().toISOString().split('T')[0]
  const weeklyEntry = progress.weeklyXP.find(e => e.date === today)
  if (weeklyEntry) {
    weeklyEntry.xp += amount
  } else {
    progress.weeklyXP = [...(progress.weeklyXP || []).slice(-6), { date: today, xp: amount }]
  }

  // Level up every 500 XP
  progress.level = Math.floor(progress.xp / 500) + 1

  // Update streak
  updateStreak(progress)

  checkBadges(progress)
  saveProgress(progress)
  return progress
}

const updateStreak = (progress) => {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  if (progress.lastStudyDate === today) return
  if (progress.lastStudyDate === yesterday) {
    progress.streak += 1
  } else if (progress.lastStudyDate !== today) {
    progress.streak = 1
  }
  progress.lastStudyDate = today
}

const BADGES = [
  { id: 'first_word', name: 'First Word', description: 'Learned your first word', icon: '🌱', xpRequired: 0, wordsRequired: 1 },
  { id: 'vocab_10', name: 'Vocabulary Builder', description: 'Learned 10 words', icon: '📚', wordsRequired: 10 },
  { id: 'vocab_50', name: 'Word Collector', description: 'Learned 50 words', icon: '📖', wordsRequired: 50 },
  { id: 'vocab_100', name: 'Century Scholar', description: 'Learned 100 words', icon: '🎓', wordsRequired: 100 },
  { id: 'streak_3', name: '3-Day Streak', description: '3 consecutive days', icon: '🔥', streakRequired: 3 },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day streak', icon: '⚡', streakRequired: 7 },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day streak', icon: '💎', streakRequired: 30 },
  { id: 'quiz_1', name: 'Quiz Taker', description: 'Completed first quiz', icon: '🧠', quizzesRequired: 1 },
  { id: 'quiz_10', name: 'Quiz Champion', description: 'Completed 10 quizzes', icon: '🏆', quizzesRequired: 10 },
  { id: 'xp_100', name: 'XP Earner', description: 'Earned 100 XP', icon: '⭐', xpRequired: 100 },
  { id: 'xp_1000', name: 'XP Master', description: 'Earned 1000 XP', icon: '🌟', xpRequired: 1000 },
]

const checkBadges = (progress) => {
  BADGES.forEach(badge => {
    if (progress.badges.includes(badge.id)) return
    let earned = false
    if (badge.wordsRequired && progress.totalWordsLearned >= badge.wordsRequired) earned = true
    if (badge.streakRequired && progress.streak >= badge.streakRequired) earned = true
    if (badge.quizzesRequired && progress.totalQuizzesTaken >= badge.quizzesRequired) earned = true
    if (badge.xpRequired && progress.xp >= badge.xpRequired) earned = true
    if (earned) progress.badges.push(badge.id)
  })
}

export const recordQuiz = () => {
  const progress = getProgress()
  progress.totalQuizzesTaken += 1
  addXP(25, 'quiz_completed')
}

export const recordWordLearned = () => {
  const progress = getProgress()
  progress.totalWordsLearned += 1
  saveProgress(progress)
  addXP(5, 'word_learned')
}

export const recordLessonRead = () => {
  addXP(15, 'lesson_read')
}

export const getAllBadges = () => BADGES

export const getXPForNextLevel = (level) => level * 500
