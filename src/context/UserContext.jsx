import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {
      axios.defaults.headers.common['X-User-Token'] = token
      fetchProfile(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchProfile = async (token) => {
    try {
      const res = await axios.get('/api/users/profile', {
        headers: { 'X-User-Token': token }
      })
      setUser(res.data.user)
    } catch {
      localStorage.removeItem('userToken')
      delete axios.defaults.headers.common['X-User-Token']
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    const res = await axios.post('/api/users/register', { name, email, password })
    const { token, user: userData } = res.data
    localStorage.setItem('userToken', token)
    axios.defaults.headers.common['X-User-Token'] = token
    setUser(userData)
    return { success: true }
  }

  const login = async (email, password) => {
    const res = await axios.post('/api/users/login', { email, password })
    const { token, user: userData } = res.data
    localStorage.setItem('userToken', token)
    axios.defaults.headers.common['X-User-Token'] = token
    setUser(userData)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    delete axios.defaults.headers.common['X-User-Token']
    setUser(null)
  }

  const updateProfile = async (updates) => {
    const token = localStorage.getItem('userToken')
    const res = await axios.put('/api/users/profile', updates, {
      headers: { 'X-User-Token': token }
    })
    setUser(res.data.user)
    return res.data.user
  }

  return (
    <UserContext.Provider value={{ user, loading, register, login, logout, updateProfile, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
