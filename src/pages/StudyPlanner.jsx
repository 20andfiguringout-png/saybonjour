import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Target, Plus, Trash2, CheckCircle, Bell, BookOpen, Zap } from 'lucide-react'
import SEO from '../components/SEO'
import { getProgress, addXP } from '../utils/progress'
import { Link } from 'react-router-dom'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const ACTIVITIES = [
  { id: 'vocabulary', label: 'Vocabulary Review', icon: '📚', xp: 15, href: '/vocabulary' },
  { id: 'grammar', label: 'Grammar Lesson', icon: '📝', xp: 20, href: '/grammar' },
  { id: 'reading', label: 'Reading Practice', icon: '📖', xp: 15, href: '/reading' },
  { id: 'conjugate', label: 'Verb Conjugation', icon: '🔤', xp: 15, href: '/conjugate' },
  { id: 'games', label: 'Mini Games', icon: '🎮', xp: 10, href: '/word-match' },
  { id: 'challenge', label: 'Daily Challenge', icon: '⚡', xp: 25, href: '/daily-challenges' },
  { id: 'listening', label: 'Dictation Exercise', icon: '🎙️', xp: 15, href: '/dictation' },
  { id: 'writing', label: 'Writing Practice', icon: '✍️', xp: 20, href: '/writing' },
  { id: 'verb_drills', label: 'Verb Drills', icon: '💪', xp: 20, href: '/verb-drills' },
  { id: 'stories', label: 'Interactive Story', icon: '📕', xp: 20, href: '/stories' },
]

const DURATIONS = ['5 min', '10 min', '15 min', '20 min', '30 min', '45 min', '1 hour']

const KEY = 'saybonjour_study_planner'

function loadPlan() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
}
function savePlan(plan) {
  localStorage.setItem(KEY, JSON.stringify(plan))
}

const GOALS_KEY = 'saybonjour_study_goals'
function loadGoals() {
  try { return JSON.parse(localStorage.getItem(GOALS_KEY)) || { dailyXP: 50, dailyMinutes: 15, weeklyDays: 5 } } catch { return { dailyXP: 50, dailyMinutes: 15, weeklyDays: 5 } }
}

export default function StudyPlanner() {
  const [plan, setPlan] = useState(loadPlan)
  const [goals, setGoals] = useState(loadGoals)
  const [tab, setTab] = useState('schedule')
  const [editingDay, setEditingDay] = useState(null)
  const [newActivity, setNewActivity] = useState({ activity: 'vocabulary', duration: '15 min', time: '08:00' })
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem('saybonjour_planner_completed') || '{}') } catch { return {} }
  })

  const progress = getProgress()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)

  const addSession = (day) => {
    const act = ACTIVITIES.find(a => a.id === newActivity.activity)
    const updated = {
      ...plan,
      [day]: [...(plan[day] || []), { ...newActivity, label: act?.label, icon: act?.icon, xp: act?.xp, href: act?.href, id: Date.now() }]
    }
    setPlan(updated)
    savePlan(updated)
    setEditingDay(null)
  }

  const removeSession = (day, id) => {
    const updated = { ...plan, [day]: (plan[day] || []).filter(s => s.id !== id) }
    setPlan(updated)
    savePlan(updated)
  }

  const markComplete = (day, id) => {
    const key = `${day}_${id}`
    const todayStr = new Date().toISOString().split('T')[0]
    const newCompleted = { ...completed, [key]: todayStr }
    setCompleted(newCompleted)
    localStorage.setItem('saybonjour_planner_completed', JSON.stringify(newCompleted))
    const session = plan[day]?.find(s => s.id === id)
    if (session?.xp) addXP(session.xp, 'daily_challenge')
  }

  const isComplete = (day, id) => {
    const key = `${day}_${id}`
    const todayStr = new Date().toISOString().split('T')[0]
    return completed[key] === todayStr
  }

  const saveGoals = (g) => {
    setGoals(g)
    localStorage.setItem(GOALS_KEY, JSON.stringify(g))
  }

  const totalPlannedDays = Object.keys(plan).filter(d => plan[d]?.length > 0).length
  const totalPlannedSessions = Object.values(plan).reduce((s, d) => s + (d?.length || 0), 0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Study Planner | SayBonjour!" description="Plan your French learning schedule with daily sessions and goals." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Study Planner</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Plan de Révision Hebdomadaire</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-dark-warm-100 rounded-xl p-3 text-center shadow-sm border border-gray-100 dark:border-dark-warm-50">
            <p className="text-xl font-bold text-burgundy-600">{totalPlannedDays}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Days Planned</p>
          </div>
          <div className="bg-white dark:bg-dark-warm-100 rounded-xl p-3 text-center shadow-sm border border-gray-100 dark:border-dark-warm-50">
            <p className="text-xl font-bold text-amber-500">{totalPlannedSessions}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Sessions / Week</p>
          </div>
          <div className="bg-white dark:bg-dark-warm-100 rounded-xl p-3 text-center shadow-sm border border-gray-100 dark:border-dark-warm-50">
            <p className="text-xl font-bold text-green-600">{progress.streak}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Current Streak</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {['schedule', 'goals', 'today'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50'}`}>
              {t === 'schedule' ? '📅 Schedule' : t === 'goals' ? '🎯 Goals' : `⭐ Today (${today})`}
            </button>
          ))}
        </div>

        {tab === 'schedule' && (
          <div className="space-y-3">
            {DAYS.map(day => (
              <div key={day} className={`bg-white dark:bg-dark-warm-100 rounded-xl border shadow-sm overflow-hidden ${day === today ? 'border-burgundy-300 dark:border-burgundy-700' : 'border-gray-100 dark:border-dark-warm-50'}`}>
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-dark-warm-200">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${day === today ? 'text-burgundy-600 dark:text-burgundy-400' : 'text-gray-800 dark:text-cream-50'}`}>{day}</h3>
                    {day === today && <span className="text-xs bg-burgundy-100 text-burgundy-700 dark:bg-burgundy-900/40 dark:text-burgundy-300 px-2 py-0.5 rounded-full">Today</span>}
                  </div>
                  <button onClick={() => setEditingDay(editingDay === day ? null : day)}
                    className="text-burgundy-600 hover:text-burgundy-800 dark:text-burgundy-400 dark:hover:text-burgundy-300 flex items-center gap-1 text-sm font-medium">
                    <Plus size={14} /> Add
                  </button>
                </div>

                {editingDay === day && (
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-warm-50 bg-amber-50/50 dark:bg-dark-warm-200/50">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <select value={newActivity.activity} onChange={e => setNewActivity(a => ({ ...a, activity: e.target.value }))}
                        className="col-span-1 px-2 py-1.5 text-sm border border-gray-200 dark:border-dark-warm-50 rounded-lg bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50">
                        {ACTIVITIES.map(a => <option key={a.id} value={a.id}>{a.icon} {a.label}</option>)}
                      </select>
                      <input type="time" value={newActivity.time} onChange={e => setNewActivity(a => ({ ...a, time: e.target.value }))}
                        className="px-2 py-1.5 text-sm border border-gray-200 dark:border-dark-warm-50 rounded-lg bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50" />
                      <select value={newActivity.duration} onChange={e => setNewActivity(a => ({ ...a, duration: e.target.value }))}
                        className="px-2 py-1.5 text-sm border border-gray-200 dark:border-dark-warm-50 rounded-lg bg-white dark:bg-dark-warm-100 text-gray-900 dark:text-cream-50">
                        {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setEditingDay(null)} className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100">Cancel</button>
                      <button onClick={() => addSession(day)} className="btn-primary text-sm py-1.5">Add Session</button>
                    </div>
                  </div>
                )}

                {(plan[day] || []).length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 italic">No sessions planned — click Add to schedule one</div>
                ) : (
                  <div className="divide-y divide-gray-50 dark:divide-dark-warm-50">
                    {(plan[day] || []).map(session => (
                      <div key={session.id} className="flex items-center gap-3 px-4 py-3">
                        <span className="text-lg">{session.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-cream-50 truncate">{session.label}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{session.time} · {session.duration} · +{session.xp} XP</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {session.href && <Link to={session.href} className="text-xs text-burgundy-600 hover:underline">Go →</Link>}
                          {day === today && (
                            <button onClick={() => markComplete(day, session.id)} disabled={isComplete(day, session.id)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isComplete(day, session.id) ? 'bg-green-500 text-white' : 'border-2 border-gray-300 dark:border-dark-warm-50 hover:border-green-400'}`}>
                              {isComplete(day, session.id) && <CheckCircle size={14} />}
                            </button>
                          )}
                          <button onClick={() => removeSession(day, session.id)} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'goals' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-dark-warm-100 rounded-xl border border-gray-100 dark:border-dark-warm-50 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 dark:text-cream-50 mb-4 flex items-center gap-2"><Target size={18} className="text-burgundy-600" /> Daily Goals</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex justify-between"><span>Daily XP Target</span><strong className="text-burgundy-600">{goals.dailyXP} XP</strong></label>
                  <input type="range" min="10" max="500" step="10" value={goals.dailyXP} onChange={e => saveGoals({ ...goals, dailyXP: +e.target.value })} className="w-full accent-burgundy-600" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex justify-between"><span>Daily Study Time</span><strong className="text-burgundy-600">{goals.dailyMinutes} min</strong></label>
                  <input type="range" min="5" max="120" step="5" value={goals.dailyMinutes} onChange={e => saveGoals({ ...goals, dailyMinutes: +e.target.value })} className="w-full accent-burgundy-600" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex justify-between"><span>Days per Week</span><strong className="text-burgundy-600">{goals.weeklyDays} days</strong></label>
                  <input type="range" min="1" max="7" step="1" value={goals.weeklyDays} onChange={e => saveGoals({ ...goals, weeklyDays: +e.target.value })} className="w-full accent-burgundy-600" />
                </div>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-dark-warm-100 border border-amber-200 dark:border-dark-warm-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 dark:text-cream-50 mb-3">Your Goal Summary</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between"><span>Weekly XP target:</span> <strong>{goals.dailyXP * goals.weeklyDays} XP</strong></div>
                <div className="flex justify-between"><span>Weekly study time:</span> <strong>{goals.dailyMinutes * goals.weeklyDays} min ({Math.round(goals.dailyMinutes * goals.weeklyDays / 60 * 10) / 10}h)</strong></div>
                <div className="flex justify-between"><span>Days active per week:</span> <strong>{goals.weeklyDays} / 7</strong></div>
                <div className="flex justify-between"><span>Estimated level gain per month:</span> <strong>~{Math.round(goals.dailyXP * goals.weeklyDays * 4 / 500)} levels</strong></div>
              </div>
            </div>
          </div>
        )}

        {tab === 'today' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-cream-50 mb-4">{today}'s Schedule</h2>
            {!(plan[today] || []).length ? (
              <div className="text-center py-12 bg-white dark:bg-dark-warm-100 rounded-xl border border-gray-100 dark:border-dark-warm-50">
                <Calendar size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No sessions for today</p>
                <button onClick={() => setTab('schedule')} className="btn-primary mt-4 text-sm">Plan Today's Sessions</button>
              </div>
            ) : (
              <div className="space-y-3">
                {(plan[today] || []).map(session => (
                  <div key={session.id} className={`flex items-center gap-4 bg-white dark:bg-dark-warm-100 rounded-xl border p-4 shadow-sm ${isComplete(today, session.id) ? 'border-green-300 dark:border-green-700' : 'border-gray-100 dark:border-dark-warm-50'}`}>
                    <span className="text-3xl">{session.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-cream-50">{session.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{session.time} · {session.duration}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-amber-600 font-medium">+{session.xp} XP</span>
                      {!isComplete(today, session.id) ? (
                        <div className="flex gap-2">
                          {session.href && <Link to={session.href} className="btn-primary text-xs py-1.5">Start</Link>}
                          <button onClick={() => markComplete(today, session.id)} className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium">Done</button>
                        </div>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-green-600"><CheckCircle size={14} /> Complete!</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 bg-amber-50 dark:bg-dark-warm-100 border border-amber-200 dark:border-dark-warm-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Today's Progress</p>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>XP today: <strong className="text-burgundy-600">{progress.dailyXP?.find(d => d.date === new Date().toISOString().split('T')[0])?.xp || 0}</strong></span>
                <span>Goal: <strong className="text-burgundy-600">{goals.dailyXP} XP</strong></span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-dark-warm-200 rounded-full overflow-hidden">
                <div className="h-full bg-burgundy-600 rounded-full transition-all"
                  style={{ width: `${Math.min(100, ((progress.dailyXP?.find(d => d.date === new Date().toISOString().split('T')[0])?.xp || 0) / goals.dailyXP) * 100)}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
