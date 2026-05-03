const STREAK_KEY = 'saybonjour_streak'

function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

function getYesterdayDate() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

function getMondayOfWeek(isoDate) {
  const d = new Date(isoDate)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d.toISOString().split('T')[0]
}

function loadStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveStreak(data) {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data))
  } catch {}
}

export function updateAndGetStreak() {
  const today = getTodayDate()
  const yesterday = getYesterdayDate()
  const stored = loadStreak()
  const thisWeekMonday = getMondayOfWeek(today)

  if (!stored) {
    const fresh = {
      currentStreak: 1,
      longestStreak: 1,
      lastVisitDate: today,
      weekStart: thisWeekMonday,
      visitedDates: [today],
    }
    saveStreak(fresh)
    return fresh
  }

  const storedWeekMonday = stored.weekStart || getMondayOfWeek(stored.lastVisitDate || today)
  let visitedDates

  if (storedWeekMonday === thisWeekMonday) {
    visitedDates = stored.visitedDates || []
    if (!visitedDates.includes(today)) {
      visitedDates = [...visitedDates, today]
    }
  } else {
    visitedDates = [today]
  }

  if (stored.lastVisitDate === today) {
    const sameDay = { ...stored, visitedDates, weekStart: thisWeekMonday }
    saveStreak(sameDay)
    return sameDay
  }

  let currentStreak
  if (stored.lastVisitDate === yesterday) {
    currentStreak = (stored.currentStreak || 0) + 1
  } else {
    currentStreak = 1
  }

  const longestStreak = Math.max(stored.longestStreak || 0, currentStreak)
  const updated = {
    currentStreak,
    longestStreak,
    lastVisitDate: today,
    weekStart: thisWeekMonday,
    visitedDates,
  }
  saveStreak(updated)
  return updated
}

export function getWeekDots(streak) {
  const today = getTodayDate()
  const thisWeekMonday = getMondayOfWeek(today)
  const visitedDates = streak.visitedDates || []
  const storedWeekMonday = streak.weekStart || ''

  const dots = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(thisWeekMonday)
    d.setDate(d.getDate() + i)
    const dateStr = d.toISOString().split('T')[0]
    const isVisited = storedWeekMonday === thisWeekMonday && visitedDates.includes(dateStr)
    const isToday = dateStr === today
    const isFuture = dateStr > today
    dots.push({ dateStr, isVisited, isToday, isFuture })
  }
  return dots
}

export function getStreakMotivation(streak) {
  if (streak >= 365) return 'A full year of dedication!'
  if (streak >= 100) return 'Legendary! 100+ days strong!'
  if (streak >= 30) return 'Incredible dedication!'
  if (streak >= 14) return 'Two weeks and counting!'
  if (streak >= 7) return 'One week on fire!'
  if (streak >= 3) return 'Building momentum!'
  if (streak === 2) return 'Two in a row — nice!'
  return 'Start your journey today!'
}

export function getStreakEmoji(streak) {
  if (streak >= 30) return '🏆'
  if (streak >= 7) return '🔥'
  if (streak >= 3) return '⚡'
  return '✨'
}
