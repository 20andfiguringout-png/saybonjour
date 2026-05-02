import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    checkAuthStatus()
    fetchCsrfToken()
  }, [])

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('/api/csrf-token')
      setCsrfToken(response.data.csrfToken)
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error)
    }
  }

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.get('/api/auth/verify')
        setIsAuthenticated(response.data.valid)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('adminToken')
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
        csrfToken
      })
      
      const { token } = response.data
      localStorage.setItem('adminToken', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      // Always fetch a fresh CSRF token after any failed attempt
      fetchCsrfToken()
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    delete axios.defaults.headers.common['Authorization']
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    loading,
    csrfToken,
    login,
    logout,
    fetchCsrfToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
