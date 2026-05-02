import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, Brain, Heart, ChevronDown, MessageCircle, Lightbulb, FileText, Globe, Map, Film } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFavoritesCounts } from '../utils/favorites'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Update favorites count when component mounts and when localStorage changes
    const updateFavoritesCount = () => {
      const counts = getFavoritesCounts()
      const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
      setFavoritesCount(total)
    }

    updateFavoritesCount()

    // Listen for storage changes (when favorites are added/removed)
    window.addEventListener('storage', updateFavoritesCount)

    // Custom event for same-tab updates
    window.addEventListener('favoritesUpdated', updateFavoritesCount)

    return () => {
      window.removeEventListener('storage', updateFavoritesCount)
      window.removeEventListener('favoritesUpdated', updateFavoritesCount)
    }
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Quizzes', href: '/quizzes', icon: Brain },
  ]

  const resourcesDropdown = [
    {
      category: 'Core Learning',
      items: [
        { name: 'Content & Resources', href: '/resources', icon: BookOpen, description: 'Articles, lessons, and materials' }
      ]
    },
    {
      category: 'Quick Access',
      items: [
        { name: 'Phrase of the Day', href: '/phrase-of-the-day', icon: MessageCircle, description: 'Daily French phrases' },
        { name: 'Memory Boosters', href: '/memory-boosters', icon: Lightbulb, description: 'Cognates, idioms, and tips' },
        { name: 'Worksheets', href: '/worksheets', icon: FileText, description: 'Downloadable practice sheets' }
      ]
    },
    {
      category: 'Culture & Media',
      items: [
        { name: 'Cultural Insights', href: '/culture', icon: Globe, description: 'French traditions and customs' },
        { name: 'Interactive France Map', href: '/france-map', icon: Map, description: 'Explore French regions' },
        { name: 'French in Media', href: '/media', icon: Film, description: 'Movies, music, and TV shows' }
      ]
    }
  ]

  const isActive = (path) => location.pathname === path

  const isResourcesActive = () => {
    return resourcesDropdown.some(category =>
      category.items.some(item => location.pathname === item.href)
    )
  }

  // Calculate background opacity based on scroll
  const backgroundOpacity = Math.min(scrollY / 100, 0.95)

  return (
    <motion.nav
      className="navbar-fixed px-6 sm:px-8 lg:px-12 xl:px-16 py-3"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'max-w-full mx-auto rounded-2xl border-2 border-burgundy-600 backdrop-blur-xl shadow-2xl'
            : 'w-full border-b-2 border-burgundy-600'
        }`}
        style={{
          backgroundColor: isScrolled
            ? 'rgba(255, 252, 239, 0.95)'
            : 'rgba(255, 252, 239, 0.98)'
        }}
      >
        <div className={`flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'h-14 px-8' : 'h-16 px-6 sm:px-8 lg:px-12 xl:px-16'
        }`}>
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-1 group">
              <motion.div
                className={`rounded-lg flex items-center justify-center transition-all duration-500 ${
                  isScrolled ? 'w-16 h-16' : 'w-20 h-20'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="/logo.png"
                  alt="SayBonjour Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <span className={`brand-font transition-all duration-500 group-hover:scale-105 ${
                isScrolled
                  ? 'text-lg text-burgundy-600'
                  : 'text-xl text-burgundy-600 group-hover:text-burgundy-700'
              }`}>
                SayBonjour!
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                      isScrolled
                        ? `px-3 py-2 ${
                            isActive(item.href)
                              ? 'text-burgundy-600 bg-burgundy-100'
                              : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                          }`
                        : `px-3 py-2 ${
                            isActive(item.href)
                              ? 'text-burgundy-600 bg-burgundy-100'
                              : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                          }`
                    }`}
                  >
                    {Icon && (
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={16} />
                      </motion.div>
                    )}
                    <span>{item.name}</span>
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy-600"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}

            {/* Resources Dropdown */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
              whileHover={{ y: -2 }}
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                className={`flex items-center space-x-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                  isScrolled
                    ? `px-3 py-2 ${
                        isResourcesActive()
                          ? 'text-burgundy-600 bg-burgundy-100'
                          : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                      }`
                    : `px-3 py-2 ${
                        isResourcesActive()
                          ? 'text-burgundy-600 bg-burgundy-100'
                          : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                      }`
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookOpen size={16} />
                </motion.div>
                <span>Resources</span>
                <motion.div
                  animate={{ rotate: isResourcesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
                {isResourcesActive() && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy-600"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isResourcesOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-80 bg-cream-50 rounded-xl shadow-2xl border border-cream-200 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-3">
                      {resourcesDropdown.map((category, categoryIndex) => (
                        <div key={category.category} className={categoryIndex > 0 ? 'border-t border-cream-200' : ''}>
                          <div className="px-4 py-3">
                            <h4 className="text-xs font-semibold text-burgundy-500 uppercase tracking-wide mb-3">
                              {category.category}
                            </h4>
                            <div className="space-y-1">
                              {category.items.map((item) => {
                                const Icon = item.icon
                                return (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    className="flex items-start space-x-3 px-3 py-2 text-sm text-burgundy-700 hover:bg-burgundy-50 rounded-lg transition-colors duration-200 group"
                                  >
                                    <Icon size={16} className="mt-0.5 text-burgundy-500 group-hover:scale-110 transition-transform duration-200" />
                                    <div>
                                      <div className="font-medium">{item.name}</div>
                                      <div className="text-xs text-burgundy-500 mt-0.5">{item.description}</div>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Favorites Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link
                to="/favorites"
                className={`flex items-center space-x-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                  isScrolled
                    ? `px-3 py-2 ${
                        isActive('/favorites')
                          ? 'text-burgundy-600 bg-burgundy-100'
                          : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                      }`
                    : `px-3 py-2 ${
                        isActive('/favorites')
                          ? 'text-burgundy-600 bg-burgundy-100'
                          : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                      }`
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Heart size={16} className={favoritesCount > 0 ? 'fill-current' : ''} />
                  {favoritesCount > 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 bg-burgundy-600 text-cream-50 text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {favoritesCount > 99 ? '99+' : favoritesCount}
                    </motion.span>
                  )}
                </motion.div>
                <span>Favorites</span>
                {isActive('/favorites') && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy-600"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>


          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-burgundy-600 hover:text-burgundy-700 focus:outline-none transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pt-4 pb-6 space-y-2 border-t border-burgundy-200">
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-burgundy-600 bg-burgundy-100'
                            : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                        }`}
                      >
                        {Icon && <Icon size={18} />}
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Mobile Resources Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                >
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-semibold text-burgundy-600 mb-3 flex items-center space-x-2">
                      <BookOpen size={16} />
                      <span>Resources</span>
                    </h3>
                    <div className="space-y-3">
                      {resourcesDropdown.map((category) => (
                        <div key={category.category}>
                          <h4 className="text-xs font-medium text-burgundy-500 uppercase tracking-wide mb-2 px-2">
                            {category.category}
                          </h4>
                          <div className="space-y-1">
                            {category.items.map((item) => {
                              const Icon = item.icon
                              return (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                                    isActive(item.href)
                                      ? 'text-burgundy-600 bg-burgundy-100'
                                      : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                                  }`}
                                >
                                  <Icon size={16} />
                                  <span>{item.name}</span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Favorites Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                >
                  <Link
                    to="/favorites"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive('/favorites')
                        ? 'text-burgundy-600 bg-burgundy-100'
                        : 'text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50'
                    }`}
                  >
                    <div className="relative">
                      <Heart size={18} className={favoritesCount > 0 ? 'fill-current' : ''} />
                      {favoritesCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-burgundy-600 text-cream-50 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {favoritesCount > 9 ? '9+' : favoritesCount}
                        </span>
                      )}
                    </div>
                    <span>Favorites</span>
                  </Link>
                </motion.div>


              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
