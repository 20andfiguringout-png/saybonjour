import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hand, ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const GESTURES = [
  {
    name: 'La bise',
    emoji: '💋',
    category: 'Greetings',
    description: 'The air kiss on the cheek — the most essential French social gesture. Number of kisses varies by region: 1 in Paris, 2 in most of France, 3 in Provence, 4 in Brittany.',
    howTo: 'Lean in, lightly touch cheeks (right cheek first), and make a kissing sound in the air. Firm eye contact and a warm smile.',
    meaning: 'Affection, greeting between friends, family, and sometimes new acquaintances.',
    cultural: 'COVID changed this habit significantly — many French people now hesitate. It\'s fine to extend a hand instead and say "Je fais plus la bise depuis le COVID."',
    phrase: { fr: 'On fait la bise ?', en: 'Shall we do the cheek kiss?' },
    region: 'Nationwide (varies)',
  },
  {
    name: 'La moue',
    emoji: '😬',
    category: 'Scepticism',
    description: 'The pursed lips / pout of doubt. Lips pushed forward, chin slightly raised, often accompanied by a shrug.',
    howTo: 'Purse your lips and slightly raise your chin while making a low "hmmm" sound or silence.',
    meaning: 'Doubt, uncertainty, mild disapproval, or "I\'m not convinced."',
    cultural: 'An essential French expression. Often used when considering whether something is a good idea — you\'ll see it constantly in restaurants and at market stalls.',
    phrase: { fr: 'Bof...', en: 'Meh... / I\'m not sure...' },
    region: 'Nationwide',
  },
  {
    name: 'Le shrug — gallic shrug',
    emoji: '🤷',
    category: 'Indifference',
    description: 'Raised shoulders, turned-down mouth, often with a hand gesture palm-up. The universal symbol of French indifference.',
    howTo: 'Raise both shoulders, turn down corners of the mouth, extend one or both hands palm-up. Hold for a beat.',
    meaning: '"What can you do?", "It\'s not my problem", "Who knows?", or philosophical resignation.',
    cultural: 'Often accompanied by "C\'est comme ça", "Bof", or simply silence. It\'s considered stylish, not rude — it conveys a dignified acceptance of life\'s vagaries.',
    phrase: { fr: 'C\'est comme ça.', en: 'That\'s just how it is.' },
    region: 'Nationwide — stereotypically Parisian',
  },
  {
    name: 'Mon œil',
    emoji: '👁️',
    category: 'Disbelief',
    description: 'Pulling the lower eyelid down with one finger — meaning "I\'m not fooled" or "Pull the other one!"',
    howTo: 'Place your index finger below your eye and gently pull the lower eyelid down, while saying "Mon œil!"',
    meaning: '"Pull the other one!", "I don\'t believe you!", "Yeah, right!"',
    cultural: 'Equivalent to the British "yeah, right" or "tell me another one." Mostly used with friends — blunt and funny.',
    phrase: { fr: 'Mon œil !', en: 'My eye! / No way! / Pull the other one!' },
    region: 'Nationwide',
  },
  {
    name: 'Le pouce',
    emoji: '👍',
    category: 'Approval',
    description: 'Thumb up — broadly the same as in English-speaking cultures, but also used to mean "OK, ready?" before starting something.',
    howTo: 'Standard thumb up. Sometimes accompanied by "Nickel !" or "Top !"',
    meaning: 'Good, approved, ready, excellent.',
    cultural: 'In France, thumbs up at a counter can also mean "one please" (like ordering one beer at a bar with loud music).',
    phrase: { fr: 'Nickel !', en: 'Spot on! / Perfect!' },
    region: 'Nationwide',
  },
  {
    name: 'Les doigts en bouquet',
    emoji: '🤌',
    category: 'Emphasis',
    description: 'Fingertips brought together and tapped or flicked outward. Means "perfect", "superb", or is used to emphasise a great taste or idea.',
    howTo: 'Bring all fingertips together, then flick them away from your mouth while saying "Magnifique!" or "C\'est parfait!"',
    meaning: 'Perfection, excellence, especially of food or an idea.',
    cultural: 'Often used by chefs or food lovers. Also famous from the emoji 🤌 — though the Italian version is more about emphasis, the French version is more about quality.',
    phrase: { fr: 'C\'est magnifique !', en: 'It\'s magnificent! / This is superb!' },
    region: 'Especially southern France, Provence',
  },
  {
    name: 'Le barbu',
    emoji: '✌️',
    category: 'Humour',
    description: 'Both hands placed under the chin with fingers extended downward, mimicking a beard. Means someone is arrogant or pretentious.',
    howTo: 'Cup both hands under the chin, fingers pointing down, and sometimes wag them slightly.',
    meaning: '"He/she thinks they\'re so great", "What a bighead!"',
    cultural: 'A friendly, comic gesture used among friends to tease someone being pompous or showing off.',
    phrase: { fr: 'Il se la pète !', en: 'He thinks he\'s all that! / What a show-off!' },
    region: 'Nationwide (mostly informal)',
  },
  {
    name: 'Le rond',
    emoji: '⭕',
    category: 'Warning',
    description: 'Making a circle with thumb and forefinger while the other fingers spread — but held in front of the eye rather than shown outward.',
    howTo: 'Make a circle with thumb and forefinger. Hold it up in front of one eye like a monocle.',
    meaning: 'Used to say something or someone is nothing ("zero"), worthless, or to show you\'re watching closely.',
    cultural: 'The same gesture outward (shown to someone) means "zero" — nul, rien. Be careful — context matters entirely.',
    phrase: { fr: 'C\'est nul !', en: 'It\'s rubbish! / Zero!' },
    region: 'Nationwide',
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(GESTURES.map(g => g.category)))]

export default function FrenchGestures() {
  const [cat, setCat] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = GESTURES.filter(g => cat === 'All' || g.category === cat)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Gestures | SayBonjour!" description="Understand essential French gestures — la bise, la moue, the Gallic shrug, and more." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Gestures</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La gestuelle française — the body language behind the language</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-300 mb-6 flex items-start gap-2">
          <Hand size={16} className="shrink-0 mt-0.5" />
          <span>French communication is as much physical as verbal. Understanding these gestures will help you follow real conversations and blend in naturally.</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${cat === c ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((gesture, i) => {
            const isOpen = expanded === gesture.name
            return (
              <motion.div key={gesture.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : gesture.name)}
                  className="w-full text-left px-6 py-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-cream-50 dark:bg-dark-warm-200 flex items-center justify-center text-3xl shrink-0">
                    {gesture.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="font-bold text-gray-900 dark:text-cream-50">{gesture.name}</h2>
                      <span className="text-xs text-gray-400 bg-gray-50 dark:bg-dark-warm-200 px-2 py-0.5 rounded-full">{gesture.category}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{gesture.meaning}</p>
                  </div>
                  {isOpen ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{gesture.description}</p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-3">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">How to do it</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{gesture.howTo}</p>
                          </div>
                          <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-3">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Cultural note</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{gesture.cultural}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-burgundy-50 dark:bg-burgundy-vibrant-600/10 border border-burgundy-200 dark:border-burgundy-vibrant-600/20 rounded-xl px-4 py-3">
                          <SpeakButton text={gesture.phrase.fr} size="sm" />
                          <div>
                            <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 italic">"{gesture.phrase.fr}"</p>
                            <p className="text-xs text-gray-500">{gesture.phrase.en}</p>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400">Region: {gesture.region}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
