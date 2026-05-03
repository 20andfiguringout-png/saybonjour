import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, BellOff, CheckCircle2, Clock, Zap, BookOpen, Trophy, Trash2, X } from 'lucide-react'
import SEO from '../components/SEO'

const NOTIFICATION_TYPES = {
  xp: { icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-700' },
  badge: { icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-700' },
  reminder: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-700' },
  lesson: { icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-700' },
}

const SAMPLE_NOTIFICATIONS = [
  { id: 1, type: 'xp', title: '+50 XP earned!', body: 'You completed Verb Drills and earned 50 XP. Keep it up!', time: '2 minutes ago', read: false },
  { id: 2, type: 'badge', title: 'New badge: Streak Master 🔥', body: 'Congratulations! You\'ve maintained a 7-day study streak.', time: '1 hour ago', read: false },
  { id: 3, type: 'reminder', title: 'Daily study reminder', body: 'You haven\'t studied yet today. Your streak is at risk!', time: '3 hours ago', read: true },
  { id: 4, type: 'lesson', title: 'New lesson available: Subjonctif', body: 'B2 content has been updated. The subjunctive guide is now live.', time: 'Yesterday', read: true },
  { id: 5, type: 'xp', title: '+200 XP: Quiz champion!', body: 'You scored 100% on the DELF B1 practice quiz. Amazing work.', time: 'Yesterday', read: true },
  { id: 6, type: 'reminder', title: 'Word of the Day', body: 'Today\'s word is "épanouissement" — have you learned it yet?', time: '2 days ago', read: true },
  { id: 7, type: 'badge', title: 'Achievement unlocked: Polyglotte', body: 'You\'ve visited 10 different sections in one day. Impressive dedication!', time: '3 days ago', read: true },
  { id: 8, type: 'lesson', title: 'French Songs updated', body: '3 new songs added: Stromae, Clara Luciani, and Angèle.', time: '1 week ago', read: true },
]

const REMINDER_SETTINGS = [
  { id: 'daily_reminder', label: 'Daily study reminder', desc: 'Remind me to study every day at:', default: true },
  { id: 'streak_warning', label: 'Streak warning', desc: 'Alert me if my streak is at risk', default: true },
  { id: 'wotd', label: 'Word of the Day', desc: 'Notify me of the new word each morning', default: true },
  { id: 'new_content', label: 'New content alerts', desc: 'Tell me when new lessons or games are added', default: false },
  { id: 'leaderboard', label: 'Leaderboard updates', desc: 'Notify me of ranking changes', default: false },
]

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)
  const [settings, setSettings] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('saybonjour_notif_settings') || '{}')
      return REMINDER_SETTINGS.reduce((acc, s) => ({ ...acc, [s.id]: saved[s.id] ?? s.default }), {})
    } catch { return REMINDER_SETTINGS.reduce((acc, s) => ({ ...acc, [s.id]: s.default }), {}) }
  })
  const [reminderTime, setReminderTime] = useState('09:00')
  const [tab, setTab] = useState('notifications')
  const [pushGranted, setPushGranted] = useState(false)

  useEffect(() => {
    if ('Notification' in window) {
      setPushGranted(Notification.permission === 'granted')
    }
  }, [])

  const requestPush = async () => {
    if (!('Notification' in window)) return
    const perm = await Notification.requestPermission()
    setPushGranted(perm === 'granted')
    if (perm === 'granted') {
      new Notification('SayBonjour! notifications enabled 🎉', {
        body: 'You\'ll now receive study reminders and updates.',
        icon: '/icon-192.png',
      })
    }
  }

  const markAllRead = () => setNotifications(n => n.map(notif => ({ ...notif, read: true })))
  const deleteNotif = (id) => setNotifications(n => n.filter(notif => notif.id !== id))
  const markRead = (id) => setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif))

  const toggleSetting = (id) => {
    const next = { ...settings, [id]: !settings[id] }
    setSettings(next)
    localStorage.setItem('saybonjour_notif_settings', JSON.stringify(next))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Notifications | SayBonjour!" description="Manage your SayBonjour! study reminders and notifications." />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50 flex items-center justify-center gap-3">
            <Bell size={30} className="text-burgundy-600" /> Notifications
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Study reminders and activity updates</p>
        </div>

        <div className="flex gap-3 mb-8">
          {[{ id: 'notifications', label: `Inbox${unreadCount > 0 ? ` (${unreadCount})` : ''}` }, { id: 'settings', label: 'Settings' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
          {tab === 'notifications' && unreadCount > 0 && (
            <button onClick={markAllRead}
              className="ml-auto text-xs text-burgundy-600 hover:text-burgundy-700 font-medium flex items-center gap-1">
              <CheckCircle2 size={13} /> Mark all read
            </button>
          )}
        </div>

        {tab === 'notifications' && (
          <div className="space-y-3">
            {notifications.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <BellOff size={40} className="mx-auto mb-3 opacity-30" />
                <p>No notifications yet.</p>
              </div>
            )}
            {notifications.map((notif, i) => {
              const meta = NOTIFICATION_TYPES[notif.type]
              return (
                <motion.div key={notif.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`relative flex items-start gap-3 p-4 rounded-xl border-2 transition-colors cursor-pointer ${notif.read ? 'bg-white dark:bg-dark-warm-100 border-gray-100 dark:border-dark-warm-50' : `${meta.bg} ${meta.border}`}`}
                  onClick={() => markRead(notif.id)}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${meta.bg}`}>
                    <meta.icon size={16} className={meta.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`font-semibold text-sm ${notif.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-cream-50'}`}>{notif.title}</p>
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-burgundy-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{notif.body}</p>
                    <p className="text-xs text-gray-400">{notif.time}</p>
                  </div>
                  <button onClick={e => { e.stopPropagation(); deleteNotif(notif.id) }}
                    className="text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors shrink-0">
                    <X size={14} />
                  </button>
                </motion.div>
              )
            })}
          </div>
        )}

        {tab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl border border-gray-100 dark:border-dark-warm-50 shadow p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4 flex items-center gap-2">
                <Bell size={16} className="text-burgundy-600" /> Browser notifications
              </h2>
              {pushGranted ? (
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                  <CheckCircle2 size={16} /> Notifications enabled
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Enable browser notifications to receive study reminders even when SayBonjour! is not open.</p>
                  <button onClick={requestPush}
                    className="px-4 py-2.5 bg-burgundy-600 text-white rounded-xl text-sm font-medium hover:bg-burgundy-700 transition-colors flex items-center gap-2">
                    <Bell size={15} /> Enable notifications
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl border border-gray-100 dark:border-dark-warm-50 shadow p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">Reminder preferences</h2>
              <div className="space-y-4">
                {REMINDER_SETTINGS.map(setting => (
                  <div key={setting.id} className="flex items-start gap-3">
                    <button onClick={() => toggleSetting(setting.id)}
                      className={`w-10 h-6 rounded-full transition-colors shrink-0 mt-0.5 relative ${settings[setting.id] ? 'bg-burgundy-600' : 'bg-gray-200 dark:bg-gray-600'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings[setting.id] ? 'left-4' : 'left-0.5'}`} />
                    </button>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-cream-50">{setting.label}</p>
                      <p className="text-xs text-gray-400">{setting.desc}</p>
                      {setting.id === 'daily_reminder' && settings[setting.id] && (
                        <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)}
                          className="mt-2 px-3 py-1.5 text-sm border border-gray-200 dark:border-dark-warm-50 rounded-lg bg-cream-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 focus:outline-none focus:border-burgundy-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
