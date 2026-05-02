import React, { useState, useEffect } from 'react'
import { Info, Volume2, AlertTriangle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { isTTSAvailable, hasFrenchVoices, getVoices } from '../utils/textToSpeech'

const TTSDebugInfo = ({ className = '' }) => {
  const [debugInfo, setDebugInfo] = useState({
    isSupported: false,
    isAvailable: false,
    hasFrench: false,
    voices: [],
    userAgent: ''
  })
  const [showDebug, setShowDebug] = useState(false)

  useEffect(() => {
    const updateDebugInfo = () => {
      setDebugInfo({
        isSupported: 'speechSynthesis' in window,
        isAvailable: isTTSAvailable(),
        hasFrench: hasFrenchVoices(),
        voices: getVoices(),
        userAgent: navigator.userAgent
      })
    }

    updateDebugInfo()
    
    // Update after delays to catch async voice loading
    setTimeout(updateDebugInfo, 1000)
    setTimeout(updateDebugInfo, 3000)
  }, [])

  const getStatusIcon = () => {
    if (!debugInfo.isSupported) return <AlertTriangle className="w-4 h-4 text-red-500" />
    if (!debugInfo.isAvailable) return <AlertTriangle className="w-4 h-4 text-amber-500" />
    if (!debugInfo.hasFrench) return <AlertTriangle className="w-4 h-4 text-amber-500" />
    return <CheckCircle className="w-4 h-4 text-green-500" />
  }

  const getStatusText = () => {
    if (!debugInfo.isSupported) return 'Speech synthesis not supported'
    if (!debugInfo.isAvailable) return 'Speech synthesis not available'
    if (!debugInfo.hasFrench) return 'French voices not available (using system default)'
    return 'French voices available'
  }

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="flex items-center space-x-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
      >
        {getStatusIcon()}
        <span>TTS Status</span>
        <Info className="w-3 h-3" />
      </button>

      {showDebug && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-50 mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-xs max-w-md"
        >
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Text-to-Speech Debug Info
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Browser Support:</span>
              <span className={debugInfo.isSupported ? 'text-green-600' : 'text-red-600'}>
                {debugInfo.isSupported ? 'Yes' : 'No'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>TTS Available:</span>
              <span className={debugInfo.isAvailable ? 'text-green-600' : 'text-red-600'}>
                {debugInfo.isAvailable ? 'Yes' : 'No'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>French Voices:</span>
              <span className={debugInfo.hasFrench ? 'text-green-600' : 'text-amber-600'}>
                {debugInfo.hasFrench ? `Yes (${debugInfo.voices.length})` : 'No'}
              </span>
            </div>
            
            {debugInfo.voices.length > 0 && (
              <div className="mt-3">
                <div className="font-medium mb-1">Available French Voices:</div>
                <div className="max-h-20 overflow-y-auto text-xs text-gray-600 dark:text-gray-400">
                  {debugInfo.voices.map((voice, index) => (
                    <div key={index} className="truncate">
                      {voice.name} ({voice.lang})
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="font-medium mb-1">Browser:</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {debugInfo.userAgent.split(' ').slice(0, 3).join(' ')}...
              </div>
            </div>
            
            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Status: {getStatusText()}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TTSDebugInfo
