const SRS_KEY = 'saybonjour_srs'

// SM-2 algorithm implementation
export const calculateNextReview = (card, quality) => {
  // quality: 0=Again, 1=Hard, 2=Good, 3=Easy
  let { interval = 1, easeFactor = 2.5, repetitions = 0 } = card

  if (quality < 1) {
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02))
  }

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return {
    interval,
    easeFactor,
    repetitions,
    nextReview: nextReview.toISOString(),
    lastReview: new Date().toISOString(),
  }
}

export const getSRSDeck = () => {
  try {
    const stored = localStorage.getItem(SRS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const saveSRSDeck = (deck) => {
  try {
    localStorage.setItem(SRS_KEY, JSON.stringify(deck))
  } catch {}
}

export const addWordToSRS = (word) => {
  const deck = getSRSDeck()
  const existing = deck.find(c => c.id === word.id)
  if (existing) return deck

  const newCard = {
    ...word,
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReview: new Date().toISOString(),
    lastReview: null,
    addedAt: new Date().toISOString(),
  }
  const updated = [...deck, newCard]
  saveSRSDeck(updated)
  return updated
}

export const updateCardAfterReview = (cardId, quality) => {
  const deck = getSRSDeck()
  const updated = deck.map(card => {
    if (card.id !== cardId) return card
    return { ...card, ...calculateNextReview(card, quality) }
  })
  saveSRSDeck(updated)
  return updated
}

export const getDueCards = () => {
  const deck = getSRSDeck()
  const now = new Date()
  return deck.filter(card => !card.nextReview || new Date(card.nextReview) <= now)
}

export const removeFromSRS = (cardId) => {
  const deck = getSRSDeck()
  const updated = deck.filter(c => c.id !== cardId)
  saveSRSDeck(updated)
  return updated
}
