import React, { useState, useEffect } from 'react'
import { Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { addToFavorites, removeFromFavorites, getAllFavorites } from '../utils/favorites'

const BookmarkButton = ({ 
  item, 
  type = 'article', // 'article', 'phrase', 'quiz', 'memory-booster'
  size = 'md',
  variant = 'default' // 'default', 'minimal', 'floating'
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const favorites = getAllFavorites(type)
    const isAlreadyBookmarked = favorites.includes(item.id)
    setIsBookmarked(isAlreadyBookmarked)
  }, [item.id, type])

  const handleBookmark = (e) => {
    e.stopPropagation()
    setIsAnimating(true)

    const bookmarkItem = {
      id: item.id,
      title: item.title || item.french || item.name,
      subtitle: item.subtitle || item.english || item.description,
      type: type,
      section: getSection(type),
      url: getItemUrl(type, item),
      timestamp: new Date().toISOString(),
      ...item
    }

    if (isBookmarked) {
      removeFromFavorites(type, item.id)
      setIsBookmarked(false)
    } else {
      addToFavorites(type, item.id)
      setIsBookmarked(true)
    }

    setTimeout(() => setIsAnimating(false), 300)
  }

  const getSection = (type) => {
    switch (type) {
      case 'article': return 'Culture'
      case 'phrase': return 'Phrases'
      case 'quiz': return 'Quizzes'
      case 'memory-booster': return 'Memory Boosters'
      case 'region': return 'France Map'
      default: return 'Content'
    }
  }

  const getItemUrl = (type, item) => {
    switch (type) {
      case 'article': return `/culture?article=${item.id}`
      case 'phrase': return `/content?phrase=${item.id}`
      case 'quiz': return `/quizzes?quiz=${item.id}`
      case 'memory-booster': return `/memory-boosters?item=${item.id}`
      case 'region': return `/france-map?region=${item.id}`
      default: return '/'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4'
      case 'lg': return 'w-6 h-6'
      default: return 'w-5 h-5'
    }
  }

  const getButtonClasses = () => {
    const baseClasses = "transition-all duration-200 flex items-center justify-center"
    
    switch (variant) {
      case 'minimal':
        return `${baseClasses} p-1 rounded-full hover:bg-gray-100`
      case 'floating':
        return `${baseClasses} p-2 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200`
      default:
        return `${baseClasses} p-2 rounded-lg hover:bg-gray-50 border border-gray-200`
    }
  }

  return (
    <motion.button
      onClick={handleBookmark}
      className={getButtonClasses()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      <motion.div
        animate={{
          scale: isAnimating ? [1, 1.3, 1] : 1,
          rotate: isAnimating ? [0, 10, -10, 0] : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Bookmark 
          className={`${getSizeClasses()} transition-colors duration-200 ${
            isBookmarked 
              ? 'text-burgundy-600 fill-burgundy-600' 
              : 'text-gray-400 hover:text-burgundy-600'
          }`}
        />
      </motion.div>
    </motion.button>
  )
}

export default BookmarkButton
