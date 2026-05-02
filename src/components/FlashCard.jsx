import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, RotateCcw } from 'lucide-react'

const FlashCard = ({ card, onNext, onPrevious, currentIndex, totalCards }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    setShowAnswer(!showAnswer)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setShowAnswer(false)
    onNext()
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    setShowAnswer(false)
    onPrevious()
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'fr-FR'
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Card Counter */}
      <div className="text-center mb-4">
        <span className="text-sm text-gray-600">
          {currentIndex + 1} of {totalCards}
        </span>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <motion.div
            className="bg-burgundy-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <motion.div
        className="relative w-full h-80 cursor-pointer"
        onClick={handleFlip}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card */}
          <div
            className="absolute inset-0 w-full h-full bg-cream-50 rounded-xl shadow-lg border-2 border-burgundy-200 flex flex-col justify-center items-center p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                {card.french}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  speakText(card.french)
                }}
                className="p-2 text-burgundy-600 hover:text-burgundy-700 hover:bg-burgundy-50 rounded-full transition-colors"
              >
                <Volume2 size={20} />
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Click to reveal translation
              </p>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute inset-0 w-full h-full bg-burgundy-50 rounded-xl shadow-lg border-2 border-burgundy-200 flex flex-col justify-center items-center p-6"
            style={{ 
              backfaceVisibility: "hidden", 
              transform: "rotateY(180deg)" 
            }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-burgundy-900 mb-2">
                {card.english}
              </h3>
              {card.pronunciation && (
                <p className="text-lg text-burgundy-700 mb-4 italic">
                  /{card.pronunciation}/
                </p>
              )}
              {card.example && (
                <div className="mt-4 p-3 bg-cream-100 rounded-lg">
                  <p className="text-sm text-burgundy-700 italic">
                    "{card.example}"
                  </p>
                </div>
              )}
              <p className="text-sm text-burgundy-600 mt-4">
                Click to flip back
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-6">
        <motion.button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          whileHover={{ scale: currentIndex === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentIndex === 0 ? 1 : 0.95 }}
        >
          Previous
        </motion.button>

        <motion.button
          onClick={() => {
            setIsFlipped(false)
            setShowAnswer(false)
          }}
          className="p-2 text-gray-600 hover:text-burgundy-600 hover:bg-gray-100 rounded-full transition-colors"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <RotateCcw size={20} />
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1}
          className="px-4 py-2 bg-burgundy-600 text-amber-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-burgundy-700 transition-colors"
          whileHover={{ scale: currentIndex === totalCards - 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentIndex === totalCards - 1 ? 1 : 0.95 }}
        >
          Next
        </motion.button>
      </div>

      {/* Difficulty Feedback */}
      <motion.div
        className="mt-6 flex justify-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showAnswer ? 1 : 0, y: showAnswer ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hard
        </motion.button>
        <motion.button
          className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Medium
        </motion.button>
        <motion.button
          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Easy
        </motion.button>
      </motion.div>
    </div>
  )
}

export default FlashCard
