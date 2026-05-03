import { frenchJokes } from '../data/jokesData'
import { travelVocab } from '../data/travelData'
import { businessVocab } from '../data/businessData'
import { slangExpressions } from '../data/slangData'
import { readingPassages } from '../data/readingData'
import { emailTemplates } from '../data/writingData'
import { sentenceExercises } from '../data/sentenceData'

const KEYS = {
  jokes: 'sb_content_jokes',
  travel: 'sb_content_travel',
  business: 'sb_content_business',
  slang: 'sb_content_slang',
  reading: 'sb_content_reading',
  writing: 'sb_content_writing',
  sentences: 'sb_content_sentences',
}

const STATIC = {
  jokes: frenchJokes,
  travel: travelVocab,
  business: businessVocab,
  slang: slangExpressions,
  reading: readingPassages,
  writing: emailTemplates,
  sentences: sentenceExercises,
}

export const getContent = (type) => {
  try {
    const stored = localStorage.getItem(KEYS[type])
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {}
  return (STATIC[type] || []).map((item, i) => ({
    id: item.id || `${type}_s${i}`,
    ...item,
  }))
}

export const saveContent = (type, data) => {
  try {
    localStorage.setItem(KEYS[type], JSON.stringify(data))
    return true
  } catch (e) {
    return false
  }
}

export const addContentItem = (type, item) => {
  const items = getContent(type)
  const newItem = { ...item, id: `${type}_${Date.now()}` }
  saveContent(type, [...items, newItem])
  return newItem
}

export const updateContentItem = (type, id, data) => {
  const items = getContent(type)
  const updated = items.map(i => (i.id === id ? { ...i, ...data, id } : i))
  saveContent(type, updated)
  return updated
}

export const deleteContentItem = (type, id) => {
  const items = getContent(type)
  const updated = items.filter(i => i.id !== id)
  saveContent(type, updated)
  return updated
}

export const resetContent = (type) => {
  localStorage.removeItem(KEYS[type])
}
