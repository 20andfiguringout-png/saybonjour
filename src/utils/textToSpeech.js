/**
 * Text-to-Speech utility for French pronunciation
 * Uses the free Web Speech API built into browsers
 */

class FrenchTTS {
  constructor() {
    this.isSupported = 'speechSynthesis' in window
    this.frenchVoices = []
    this.preferredVoice = null
    this.isInitialized = false
    
    if (this.isSupported) {
      this.initializeVoices()
    }
  }

  /**
   * Initialize and cache French voices
   */
  initializeVoices() {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      this.frenchVoices = voices.filter(voice => 
        voice.lang.startsWith('fr') || 
        voice.name.toLowerCase().includes('french') ||
        voice.name.toLowerCase().includes('français')
      )
      
      // Prefer local voices, then any French voice
      this.preferredVoice = this.frenchVoices.find(voice => voice.localService) || 
                           this.frenchVoices[0] || 
                           null
      
      this.isInitialized = true
    }

    // Load voices immediately if available
    loadVoices()
    
    // Also listen for voices changed event (some browsers load asynchronously)
    speechSynthesis.addEventListener('voiceschanged', loadVoices)
  }

  /**
   * Speak French text with proper pronunciation
   * @param {string} text - The French text to speak
   * @param {Object} options - Optional settings
   */
  speak(text, options = {}) {
    if (!this.isSupported) {
      console.warn('Text-to-speech not supported in this browser')
      return false
    }

    if (!text || typeof text !== 'string') {
      console.warn('Invalid text provided for speech synthesis')
      return false
    }

    // Stop any current speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Configure utterance
    utterance.lang = options.lang || 'fr-FR'
    utterance.rate = options.rate || 0.8 // Slower for learning
    utterance.pitch = options.pitch || 1
    utterance.volume = options.volume || 1
    
    // Use preferred French voice if available, otherwise let browser choose
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice
    } else if (this.frenchVoices.length === 0) {
      // If no French voices, try to find any voice that might work with French
      const voices = speechSynthesis.getVoices()
      const fallbackVoice = voices.find(voice =>
        voice.lang.includes('fr') ||
        voice.lang.includes('FR') ||
        voice.default
      )
      if (fallbackVoice) {
        utterance.voice = fallbackVoice
      }
    }

    // Add event listeners
    utterance.onstart = () => {
      if (options.onStart) options.onStart()
    }
    
    utterance.onend = () => {
      if (options.onEnd) options.onEnd()
    }
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
      if (options.onError) options.onError(event.error)
    }

    // Speak the text
    speechSynthesis.speak(utterance)
    return true
  }

  /**
   * Stop any current speech
   */
  stop() {
    if (this.isSupported) {
      speechSynthesis.cancel()
    }
  }

  /**
   * Check if TTS is available (now more permissive - works even without French voices)
   */
  isAvailable() {
    return this.isSupported && this.isInitialized
  }

  /**
   * Check if French voices are specifically available
   */
  hasFrenchVoices() {
    return this.frenchVoices.length > 0
  }

  /**
   * Get available French voices
   */
  getAvailableVoices() {
    return this.frenchVoices
  }

  /**
   * Set preferred voice by name
   */
  setPreferredVoice(voiceName) {
    const voice = this.frenchVoices.find(v => v.name === voiceName)
    if (voice) {
      this.preferredVoice = voice
      return true
    }
    return false
  }
}

// Create singleton instance
const frenchTTS = new FrenchTTS()

// Export convenience functions
export const speakFrench = (text, options) => frenchTTS.speak(text, options)
export const stopSpeech = () => frenchTTS.stop()
export const isTTSAvailable = () => frenchTTS.isAvailable()
export const hasFrenchVoices = () => frenchTTS.hasFrenchVoices()
export const getVoices = () => frenchTTS.getAvailableVoices()
export const setVoice = (voiceName) => frenchTTS.setPreferredVoice(voiceName)

export default frenchTTS
