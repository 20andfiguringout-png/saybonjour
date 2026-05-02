import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react'
import { useUser } from '../context/UserContext'
import SEO from '../components/SEO'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/onboarding')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try a different email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Create Account | SayBonjour" url="/signup" />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-warm-300 flex items-center justify-center px-4 pt-20">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">✨</div>
            <h1 className="text-3xl font-bold text-burgundy-800 dark:text-cream-50" style={{ fontFamily: 'Playfair Display, serif' }}>
              Bienvenue !
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Start your French journey today — it's free</p>
          </div>

          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow-lg border border-cream-200 dark:border-dark-warm-50 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-cream-300 dark:border-dark-warm-50 rounded-xl text-sm bg-cream-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
                    placeholder="Marie Dupont"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-cream-300 dark:border-dark-warm-50 rounded-xl text-sm bg-cream-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-cream-300 dark:border-dark-warm-50 rounded-xl text-sm bg-cream-50 dark:bg-dark-warm-200 text-gray-800 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
                    placeholder="Min. 6 characters"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-burgundy-600 text-cream-50 rounded-xl font-semibold hover:bg-burgundy-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <span className="animate-spin">⏳</span> : <UserPlus className="w-4 h-4" />}
                {loading ? 'Creating account...' : 'Create Free Account'}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
              By signing up you agree to our terms of service.
            </p>

            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-burgundy-600 font-medium hover:underline">Sign in</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Signup
