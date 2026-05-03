import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SOUNDS = [
  {
    category: 'Nasal Vowels',
    desc: 'French has nasal vowels — air passes through the nose. There\'s no exact English equivalent.',
    sounds: [
      { symbol: 'an / en / am / em', example: 'dans, centre, chambre, temps', tip: 'Like "don" but with the mouth open and no "n" sound at the end.' },
      { symbol: 'in / ain / ein / un', example: 'vin, pain, plein, lundi', tip: 'Like "van" said nasally, shorter.' },
      { symbol: 'on / om', example: 'bon, tomber, pont', tip: 'Like "bon" — round the lips, nasal.' },
    ],
  },
  {
    category: 'The Silent Letters',
    desc: 'Many letters in French are silent, especially at the end of words.',
    sounds: [
      { symbol: 'Final consonants', example: 'vous [voo], est [eh], grand [grahn]', tip: 'Most final consonants are silent. Exceptions: final C, R, F, L (think "CaReFuL").' },
      { symbol: 'Final -e', example: 'table [tabl], grande [grahnd]', tip: 'Final -e is silent, but it makes the preceding consonant audible.' },
      { symbol: '-s and -x plural endings', example: 'les amis [lay zamee]', tip: 'The s is silent, but causes liaison before vowels.' },
    ],
  },
  {
    category: 'Liaison',
    desc: 'When a normally silent consonant at the end of a word is pronounced because the next word starts with a vowel.',
    sounds: [
      { symbol: 'les enfants', example: '[lay zahn-fahn]', tip: 'The s of "les" becomes /z/ before a vowel.' },
      { symbol: 'vous avez', example: '[voo zavay]', tip: 'The s of "vous" links to "avez".' },
      { symbol: 'un ami', example: '[uhn nami]', tip: 'The n of "un" links — un ami sounds like "unn ami".' },
    ],
  },
  {
    category: 'The French R',
    desc: 'The French "r" is pronounced at the back of the throat — nothing like English "r".',
    sounds: [
      { symbol: 'r', example: 'rouge, Paris, merci', tip: 'Gargale gently in the back of your throat. Imagine clearing your throat lightly.' },
      { symbol: 'rr', example: 'terre, beurre, erreur', tip: 'Same sound, slightly stronger. Practice "Paris" — the r between the vowels.' },
    ],
  },
  {
    category: 'U vs OU',
    desc: 'One of the most common mistakes for English speakers.',
    sounds: [
      { symbol: 'u', example: 'tu, lune, rue, vu', tip: 'Round your lips as if saying "oo" (like "too"), but say "ee". The rounded "ü" sound.' },
      { symbol: 'ou', example: 'tout, vous, courir, bonjour', tip: 'This is the "oo" sound as in "boot". Easier for English speakers.' },
    ],
  },
  {
    category: 'Elision',
    desc: 'Dropping a vowel when the next word starts with a vowel or silent h.',
    sounds: [
      { symbol: 'je → j\'', example: 'j\'aime, j\'ai, j\'habite', tip: '"Je aime" is WRONG. Always j\'aime.' },
      { symbol: 'le / la → l\'', example: 'l\'ami, l\'école, l\'hôtel', tip: 'Elision happens with le, la, je, me, te, se, de, ne, que.' },
      { symbol: 'de → d\'', example: 'd\'accord, d\'abord, d\'habitude', tip: '"De accord" is wrong. Always d\'accord.' },
    ],
  },
  {
    category: 'Accents',
    desc: 'Accents in French change pronunciation and sometimes meaning.',
    sounds: [
      { symbol: 'é (accent aigu)', example: 'été, café, beauté', tip: 'A clear "ay" sound. Like the English word "say" but shorter.' },
      { symbol: 'è / ê (accent grave / circumflex)', example: 'père, fête, être', tip: 'An open "eh" sound. Like "bed" in English.' },
      { symbol: 'â, î, ô, û (circumflex)', example: 'château, île, côte, sûr', tip: 'The circumflex often indicates a historic "s": île = isle, fête = feast.' },
      { symbol: 'ç (cédille)', example: 'français, leçon, ça', tip: 'Always an "s" sound, never "k". Français = frahn-SAY.' },
    ],
  },
]

const MINIMAL_PAIRS = [
  { a: 'tu', b: 'tout', aEn: 'you', bEn: 'all/everything', tip: 'Round lips for u; open lips for ou.' },
  { a: 'vin', b: 'vain', aEn: 'wine', bEn: 'vain', tip: 'Both nasal, very similar — context clarifies.' },
  { a: 'bon', b: 'beau', aEn: 'good', bEn: 'beautiful', tip: 'bon = nasal "on"; beau = open "oh".' },
  { a: 'pain', b: 'pin', aEn: 'bread', bEn: 'pine tree', tip: 'Both nasal — pain slightly more open.' },
  { a: 'su', b: 'sous', aEn: '(past part. of savoir)', bEn: 'under', tip: 'The classic u vs ou contrast.' },
  { a: 'cou', b: 'queue', aEn: 'neck', bEn: 'tail / queue', tip: 'cou = "koo"; queue = "kuh" (the French u).' },
]

export default function FrenchPronunciationGuide() {
  const [tab, setTab] = useState('sounds')
  const [activeSound, setActiveSound] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Pronunciation Guide | SayBonjour!" description="Master French pronunciation — nasal vowels, silent letters, liaison, the French R, u vs ou, and accents." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Pronunciation Guide</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La prononciation — master the sounds that make French French</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'sounds', label: 'Sound Rules' }, { id: 'pairs', label: 'Minimal Pairs' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'sounds' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {SOUNDS.map((s, i) => (
                <button key={s.category} onClick={() => { setActiveSound(i); addXP(3, 'listening') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeSound === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {s.category}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-cream-50 font-playfair mb-1">{SOUNDS[activeSound].category}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{SOUNDS[activeSound].desc}</p>
              <div className="space-y-4">
                {SOUNDS[activeSound].sounds.map((s, i) => (
                  <motion.div key={s.symbol} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="border border-gray-100 dark:border-dark-warm-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm bg-cream-100 dark:bg-dark-warm-200 px-2 py-0.5 rounded font-bold text-burgundy-700 dark:text-burgundy-vibrant-300">{s.symbol}</code>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <SpeakButton text={s.example.split(',')[0].trim()} size="sm" />
                      <p className="text-sm italic text-gray-600 dark:text-gray-400">{s.example}</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 rounded-lg px-3 py-2">
                      <p className="text-xs text-amber-700 dark:text-amber-300">💡 {s.tip}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'pairs' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300 mb-2">
              Minimal pairs are words that differ by just one sound. Training your ear on these helps you distinguish and produce French sounds accurately.
            </div>
            {MINIMAL_PAIRS.map((pair, i) => (
              <motion.div key={pair.a} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <SpeakButton text={pair.a} size="sm" />
                      <span className="font-bold text-xl text-burgundy-700 dark:text-burgundy-vibrant-300 font-playfair">{pair.a}</span>
                    </div>
                    <p className="text-xs text-gray-400">{pair.aEn}</p>
                  </div>
                  <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <SpeakButton text={pair.b} size="sm" />
                      <span className="font-bold text-xl text-burgundy-700 dark:text-burgundy-vibrant-300 font-playfair">{pair.b}</span>
                    </div>
                    <p className="text-xs text-gray-400">{pair.bEn}</p>
                  </div>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 italic">💡 {pair.tip}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
