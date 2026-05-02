/**
 * Phrase data management utility
 * Handles loading and saving phrase data
 */

// Default phrases data (fallback if no admin data exists)
const defaultPhrases = [
  {
    id: 1,
    title: "Petit à petit, l'oiseau fait son nid",
    description: "Little by little, the bird builds its nest",
    french: "Petit à petit, l'oiseau fait son nid",
    english: "Little by little, the bird builds its nest",
    literal: "Little by little, the bird makes its nest",
    meaning: "Patience and persistence lead to success",
    pronunciation: "puh-TEE ah puh-TEE, lwa-ZOH feh sohn NEE",
    difficulty: "Intermediate",
    usage: "Used to encourage patience and steady progress",
    example: "Ne t'inquiète pas pour tes études. Petit à petit, l'oiseau fait son nid.",
    exampleTranslation: "Don't worry about your studies. Little by little, the bird builds its nest.",
    culturalNote: "This is a classic French proverb emphasizing the value of patience and gradual progress.",
    type: 'proverb',
    sectionId: 1,
    sectionTitle: 'Proverbs'
  },
  {
    id: 2,
    title: "C'est la vie",
    description: "That's life",
    french: "C'est la vie",
    english: "That's life",
    literal: "It is the life",
    meaning: "Such is life; that's how things go",
    pronunciation: "say lah VEE",
    difficulty: "Beginner",
    usage: "Used to express acceptance of a situation",
    example: "J'ai raté mon train, mais c'est la vie.",
    exampleTranslation: "I missed my train, but that's life.",
    culturalNote: "One of the most famous French expressions, widely known even by non-French speakers.",
    type: 'expression',
    sectionId: 3,
    sectionTitle: 'Expressions'
  },
  {
    id: 3,
    title: "Il pleut des cordes",
    description: "It's raining cats and dogs",
    french: "Il pleut des cordes",
    english: "It's raining cats and dogs",
    literal: "It's raining ropes",
    meaning: "It's raining very heavily",
    pronunciation: "eel pluh day KORD",
    difficulty: "Intermediate",
    usage: "Used to describe very heavy rain",
    example: "Prends ton parapluie, il pleut des cordes dehors!",
    exampleTranslation: "Take your umbrella, it's raining cats and dogs outside!",
    culturalNote: "A colorful French idiom that paints a vivid picture of heavy rainfall.",
    type: 'idiom',
    sectionId: 2,
    sectionTitle: 'Idioms'
  }
]

// Storage keys
const PHRASES_STORAGE_KEY = 'french_learning_phrases'
const PHRASE_SECTIONS_STORAGE_KEY = 'french_learning_phrase_sections'

// Default sections
const defaultSections = [
  { id: 1, title: 'Proverbs', description: 'Traditional French proverbs and sayings' },
  { id: 2, title: 'Idioms', description: 'Common French idiomatic expressions' },
  { id: 3, title: 'Expressions', description: 'Everyday French expressions and phrases' }
]

/**
 * Load phrases from localStorage or return defaults
 */
export const loadPhrases = () => {
  try {
    const stored = localStorage.getItem(PHRASES_STORAGE_KEY)
    if (stored) {
      const phrases = JSON.parse(stored)
      return phrases.length > 0 ? phrases : defaultPhrases
    }
  } catch (error) {
    console.error('Error loading phrases:', error)
  }
  return defaultPhrases
}

/**
 * Save phrases to localStorage
 */
export const savePhrases = (phrases) => {
  try {
    localStorage.setItem(PHRASES_STORAGE_KEY, JSON.stringify(phrases))
    return true
  } catch (error) {
    console.error('Error saving phrases:', error)
    return false
  }
}

/**
 * Load phrase sections from localStorage or return defaults
 */
export const loadPhraseSections = () => {
  try {
    const stored = localStorage.getItem(PHRASE_SECTIONS_STORAGE_KEY)
    if (stored) {
      const sections = JSON.parse(stored)
      return sections.length > 0 ? sections : defaultSections
    }
  } catch (error) {
    console.error('Error loading phrase sections:', error)
  }
  return defaultSections
}

/**
 * Save phrase sections to localStorage
 */
export const savePhraseSections = (sections) => {
  try {
    localStorage.setItem(PHRASE_SECTIONS_STORAGE_KEY, JSON.stringify(sections))
    return true
  } catch (error) {
    console.error('Error saving phrase sections:', error)
    return false
  }
}

/**
 * Get a random phrase for "phrase of the day"
 */
export const getRandomPhrase = () => {
  const phrases = loadPhrases()
  const randomIndex = Math.floor(Math.random() * phrases.length)
  return phrases[randomIndex]
}

/**
 * Get phrases by section
 */
export const getPhrasesBySection = (sectionId) => {
  const phrases = loadPhrases()
  return phrases.filter(phrase => phrase.sectionId === sectionId)
}

/**
 * Get phrases by difficulty
 */
export const getPhrasesByDifficulty = (difficulty) => {
  const phrases = loadPhrases()
  return phrases.filter(phrase => phrase.difficulty === difficulty)
}

/**
 * Get phrases by type
 */
export const getPhrasesByType = (type) => {
  const phrases = loadPhrases()
  return phrases.filter(phrase => phrase.type === type)
}

/**
 * Add a new phrase
 */
export const addPhrase = (phraseData) => {
  const phrases = loadPhrases()
  const newPhrase = {
    ...phraseData,
    id: Date.now() // Simple ID generation
  }
  const updatedPhrases = [...phrases, newPhrase]
  return savePhrases(updatedPhrases) ? newPhrase : null
}

/**
 * Update an existing phrase
 */
export const updatePhrase = (phraseId, phraseData) => {
  const phrases = loadPhrases()
  const updatedPhrases = phrases.map(phrase => 
    phrase.id === phraseId ? { ...phrase, ...phraseData } : phrase
  )
  return savePhrases(updatedPhrases)
}

/**
 * Delete a phrase
 */
export const deletePhrase = (phraseId) => {
  const phrases = loadPhrases()
  const updatedPhrases = phrases.filter(phrase => phrase.id !== phraseId)
  return savePhrases(updatedPhrases)
}

export default {
  loadPhrases,
  savePhrases,
  loadPhraseSections,
  savePhraseSections,
  getRandomPhrase,
  getPhrasesBySection,
  getPhrasesByDifficulty,
  getPhrasesByType,
  addPhrase,
  updatePhrase,
  deletePhrase
}
