import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { useUser } from '../context/UserContext'
import SEO from '../components/SEO'

const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 37 + 11) % 100,
  y: (i * 23 + 7) % 65,
  size: (i % 3) + 1,
  dur: 2 + (i % 4),
  delay: (i % 5) * 0.6,
}))

const BUTTERFLIES = [
  { id: 0, color: '#ff9de2', wing2: '#f472b6', scale: 1.0, x: [55, 95, 135, 95, 55], y: [110, 65, 110, 155, 110], dur: 8, delay: 0.5 },
  { id: 1, color: '#93c5fd', wing2: '#60a5fa', scale: 0.75, x: [45, 100, 155, 100, 45], y: [150, 90, 150, 210, 150], dur: 11, delay: 2.2 },
  { id: 2, color: '#86efac', wing2: '#4ade80', scale: 0.85, x: [75, 130, 120, 65, 75], y: [80, 125, 185, 135, 80], dur: 7.5, delay: 3.8 },
  { id: 3, color: '#fde68a', wing2: '#fbbf24', scale: 0.7, x: [125, 155, 115, 75, 125], y: [75, 130, 200, 140, 75], dur: 9.5, delay: 1.2 },
  { id: 4, color: '#d8b4fe', wing2: '#a78bfa', scale: 0.65, x: [65, 35, 75, 135, 65], y: [145, 95, 55, 95, 145], dur: 12, delay: 0 },
  { id: 5, color: '#fb923c', wing2: '#f97316', scale: 0.7, x: [115, 150, 135, 85, 115], y: [195, 155, 95, 115, 195], dur: 8.5, delay: 4.6 },
  { id: 6, color: '#f9a8d4', wing2: '#ec4899', scale: 0.6, x: [90, 50, 95, 150, 90], y: [55, 90, 170, 110, 55], dur: 10, delay: 6 },
]

const FRENCH_WORDS = ['Bonjour', 'Merci', 'Amour', 'Paris', 'Liberté', 'Belle']

function ButterflyShape({ color, wing2, scale = 1 }) {
  const w = 44 * scale
  const h = 32 * scale
  return (
    <svg width={w} height={h} viewBox="0 0 44 32" fill="none">
      <ellipse cx="11" cy="12" rx="10" ry="12" fill={color} opacity="0.9" transform="rotate(-25 11 12)" />
      <ellipse cx="33" cy="12" rx="10" ry="12" fill={color} opacity="0.9" transform="rotate(25 33 12)" />
      <ellipse cx="10" cy="22" rx="7" ry="8" fill={wing2} opacity="0.75" transform="rotate(20 10 22)" />
      <ellipse cx="34" cy="22" rx="7" ry="8" fill={wing2} opacity="0.75" transform="rotate(-20 34 22)" />
      <ellipse cx="22" cy="16" rx="2.5" ry="9" fill="#1e1b4b" opacity="0.85" />
      <line x1="20" y1="8" x2="15" y2="1" stroke="#1e1b4b" strokeWidth="1" strokeLinecap="round" />
      <line x1="24" y1="8" x2="29" y2="1" stroke="#1e1b4b" strokeWidth="1" strokeLinecap="round" />
      <circle cx="15" cy="0.5" r="1.2" fill="#1e1b4b" />
      <circle cx="29" cy="0.5" r="1.2" fill="#1e1b4b" />
    </svg>
  )
}

function EiffelTower() {
  return (
    <svg viewBox="0 0 180 290" width="160" height="272" fill="none">
      <defs>
        <linearGradient id="towerGradL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a77e2d" />
          <stop offset="50%" stopColor="#e8c565" />
          <stop offset="100%" stopColor="#a77e2d" />
        </linearGradient>
        <filter id="glowL">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M15 285 Q30 240 75 165" stroke="url(#towerGradL)" strokeWidth="9" strokeLinecap="round" />
      <path d="M165 285 Q150 240 105 165" stroke="url(#towerGradL)" strokeWidth="9" strokeLinecap="round" />
      <path d="M30 255 Q90 245 150 255" stroke="url(#towerGradL)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <path d="M42 225 Q90 215 138 225" stroke="url(#towerGradL)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M55 198 Q90 190 125 198" stroke="url(#towerGradL)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <rect x="62" y="158" width="56" height="11" rx="3" fill="url(#towerGradL)" />
      <rect x="58" y="162" width="64" height="5" rx="2" fill="url(#towerGradL)" opacity="0.4" />
      <path d="M65 158 Q72 120 85 90" stroke="url(#towerGradL)" strokeWidth="7" strokeLinecap="round" />
      <path d="M115 158 Q108 120 95 90" stroke="url(#towerGradL)" strokeWidth="7" strokeLinecap="round" />
      <path d="M70 140 Q90 133 110 140" stroke="url(#towerGradL)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M76 118 Q90 113 104 118" stroke="url(#towerGradL)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <rect x="77" y="84" width="26" height="9" rx="2.5" fill="url(#towerGradL)" />
      <rect x="74" y="87" width="32" height="4" rx="2" fill="url(#towerGradL)" opacity="0.4" />
      <path d="M79 84 L88 35" stroke="url(#towerGradL)" strokeWidth="5" strokeLinecap="round" />
      <path d="M101 84 L92 35" stroke="url(#towerGradL)" strokeWidth="5" strokeLinecap="round" />
      <path d="M82 65 Q90 62 98 65" stroke="url(#towerGradL)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M84 50 Q90 48 96 50" stroke="url(#towerGradL)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <rect x="83" y="29" width="14" height="7" rx="2" fill="url(#towerGradL)" />
      <line x1="90" y1="29" x2="90" y2="5" stroke="url(#towerGradL)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="90" cy="4" r="4" fill="#ffd700" filter="url(#glowL)" />
      <motion.circle
        cx="90" cy="4" r="4"
        fill="#ffd700"
        opacity="0.6"
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        style={{ originX: '90px', originY: '4px' }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Log In | SayBonjour" url="/login" />
      <div className="min-h-screen flex">

        {/* ── Left panel: Paris night scene ── */}
        <div
          className="hidden lg:flex flex-col relative overflow-hidden"
          style={{
            width: '58%',
            background: 'linear-gradient(150deg, #050520 0%, #0f0a2e 25%, #1e0a3c 55%, #12021a 100%)',
          }}
        >
          {/* Stars */}
          {STARS.map(s => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%` }}
              animate={{ opacity: [0.15, 0.9, 0.15] }}
              transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
            />
          ))}

          {/* Moon */}
          <motion.div
            className="absolute top-10 right-14 w-16 h-16 rounded-full"
            style={{ background: 'radial-gradient(circle at 38% 38%, #fffde7, #fff59d, #fdd835)' }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 65% 65%, rgba(0,0,0,0.15) 0%, transparent 70%)' }} />
          </motion.div>

          {/* Floating French words */}
          {FRENCH_WORDS.map((word, i) => (
            <motion.span
              key={word}
              className="absolute select-none pointer-events-none font-light"
              style={{
                color: 'rgba(255,255,255,0.07)',
                fontSize: '1.1rem',
                left: `${8 + i * 16}%`,
                top: `${12 + (i % 3) * 14}%`,
                letterSpacing: '0.1em',
              }}
              animate={{ y: [0, -18, 0], opacity: [0.04, 0.13, 0.04] }}
              transition={{ duration: 5 + i * 0.7, repeat: Infinity, delay: i * 1.1 }}
            >
              {word}
            </motion.span>
          ))}

          {/* Tower + butterflies */}
          <div className="absolute inset-0 flex items-end justify-center pb-12">
            <div className="relative">
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-6 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.4), transparent)', filter: 'blur(10px)' }}
              />
              <EiffelTower />
              {BUTTERFLIES.map(b => (
                <motion.div
                  key={b.id}
                  className="absolute top-0 left-0 pointer-events-none"
                  animate={{ x: b.x, y: b.y, rotate: [0, 12, -8, 6, 0] }}
                  transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.div
                    animate={{ scaleX: [1, -1, 1] }}
                    transition={{ duration: b.dur * 0.22, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ButterflyShape color={b.color} wing2={b.wing2} scale={b.scale} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,20,40,0.9) 0%, transparent 100%)' }}
          />

          <div className="absolute top-8 left-8 z-10">
            <p className="text-white font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>SayBonjour!</p>
            <p className="text-white/40 text-xs mt-0.5 tracking-wider">French Learning Platform</p>
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center z-10">
            <p className="text-white/30 text-xs tracking-widest uppercase">Apprenez · Explorez · Grandissez</p>
          </div>
        </div>

        {/* ── Right panel: Form ── */}
        <div className="flex-1 flex items-center justify-center bg-white dark:bg-dark-warm-100 px-8 py-16">
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile brand */}
            <div className="lg:hidden text-center mb-8">
              <div className="text-4xl mb-2">🗼</div>
              <p className="text-lg font-bold text-burgundy-800 dark:text-cream-50" style={{ fontFamily: 'Playfair Display, serif' }}>SayBonjour!</p>
            </div>

            <div className="mb-7">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-cream-50 mb-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>
                Bon retour !
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to continue your French journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-dark-warm-50 rounded-xl text-sm bg-gray-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-400 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <span className="text-xs text-burgundy-600 dark:text-burgundy-400 cursor-pointer hover:underline">Forgot password?</span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-dark-warm-50 rounded-xl text-sm bg-gray-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-400 transition-all"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-lg px-4 py-3 text-sm">
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-burgundy-600 text-cream-50 rounded-xl font-semibold hover:bg-burgundy-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <span className="animate-spin text-base">⏳</span> : <LogIn className="w-4 h-4" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-burgundy-600 font-semibold hover:underline">Create one free</Link>
            </p>

            {/* Stats / social proof */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-warm-50">
              <p className="text-xs text-gray-400 text-center mb-4 uppercase tracking-wide">Trusted by learners worldwide</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { num: '7K+', label: 'French verbs' },
                  { num: 'A1–C2', label: 'All levels' },
                  { num: '100%', label: 'Free' },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 dark:bg-dark-warm-200 rounded-xl p-3">
                    <p className="text-burgundy-700 dark:text-burgundy-400 font-bold text-sm">{s.num}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
