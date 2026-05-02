import React, { useState } from 'react'
import { RotateCcw, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const FlashcardButton = ({ 
  item, 
  type = 'phrase', // 'phrase', 'vocabulary', 'grammar'
  size = 'md',
  variant = 'default' // 'default', 'minimal'
}) => {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToFlashcards = (e) => {
    e.stopPropagation()
    setIsAdding(true)

    // Create flashcard item
    const flashcardItem = {
      id: `flashcard_${item.id}_${Date.now()}`,
      french: item.french || item.title,
      english: item.english || item.translation || item.meaning,
      pronunciation: item.pronunciation,
      category: type,
      difficulty: item.difficulty || 'intermediate',
      source: getSource(type),
      timestamp: new Date().toISOString(),
      ...item
    }

    // Get existing flashcards from localStorage
    const existingFlashcards = JSON.parse(localStorage.getItem('userFlashcards') || '[]')
    
    // Check if already exists
    const alreadyExists = existingFlashcards.some(card => 
      card.french === flashcardItem.french && card.english === flashcardItem.english
    )

    if (!alreadyExists) {
      existingFlashcards.push(flashcardItem)
      localStorage.setItem('userFlashcards', JSON.stringify(existingFlashcards))
      
      // Show success feedback
      setTimeout(() => {
        setIsAdding(false)
      }, 1000)
    } else {
      // Already exists feedback
      setTimeout(() => {
        setIsAdding(false)
      }, 500)
    }
  }

  const getSource = (type) => {
    switch (type) {
      case 'phrase': return 'Phrases'
      case 'vocabulary': return 'Vocabulary'
      case 'grammar': return 'Grammar'
      case 'culture': return 'Culture'
      default: return 'Content'
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
      default:
        return `${baseClasses} p-2 rounded-lg hover:bg-gray-50 border border-gray-200`
    }
  }

  return (
    <motion.button
      onClick={handleAddToFlashcards}
      className={getButtonClasses()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Add to flashcards"
      disabled={isAdding}
    >
      <motion.div
        animate={{
          scale: isAdding ? [1, 1.2, 1] : 1,
          rotate: isAdding ? [0, 360] : 0
        }}
        transition={{ duration: 0.5 }}
      >
        {isAdding ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-600"
          >
            ✓
          </motion.div>
        ) : (
          <RotateCcw 
            className={`${getSizeClasses()} text-gray-400 hover:text-burgundy-600 transition-colors duration-200`}
          />
        )}
      </motion.div>
    </motion.button>
  )
}

export default FlashcardButton
