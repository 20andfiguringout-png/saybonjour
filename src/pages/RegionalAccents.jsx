import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Volume2, ChevronDown, ChevronUp, Globe } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const REGIONS = [
  {
    id: 'parisien',
    name: 'Parisien (Standard)',
    flag: '🗼',
    description: 'The reference accent taught in schools worldwide. Clear, nasal vowels, crisp consonants.',
    mapHint: 'Île-de-France, Paris region',
    characteristics: [
      'Nasal vowels: un, en, an, on are strongly nasalised',
      'Clear distinction between all vowel sounds',
      '"R" is pronounced at the back of the throat (uvular R)',
      'Liaison is frequent in formal speech',
    ],
    example: { fr: 'Je vais au marché ce matin.', phonetic: 'zhuh VAY zoh mar-SHAY suh ma-TAN' },
    funFact: 'This accent is used in news broadcasting and formal contexts across all French-speaking countries.',
    words: [
      { fr: 'bonjour', phonetic: 'bohn-ZHOOR' },
      { fr: 'merci', phonetic: 'mehr-SEE' },
      { fr: 'fromage', phonetic: 'froh-MAZH' },
    ],
  },
  {
    id: 'meridional',
    name: 'Accent du Midi (Southern)',
    flag: '☀️',
    description: 'The warm, melodic accent of southern France — Provence, Languedoc, Occitanie.',
    mapHint: 'Marseille, Nice, Toulouse, Montpellier',
    characteristics: [
      'Final -e is often pronounced: "une femme" → "une femmE"',
      'Nasal vowels are weaker — more like Italian nasals',
      'Longer, more musical intonation patterns',
      '"On" often sounds like "oung" (with a final "ng")',
    ],
    example: { fr: 'Alors, on mange quoi ce soir ?', phonetic: 'ah-LORE, ong MAHNJ kwah suh SWARE-uh' },
    funFact: 'Marcel Pagnol\'s films immortalised this accent. "C\'est provençal !" is said with great pride.',
    words: [
      { fr: 'bonsoir', phonetic: 'bohn-SWAH-ruh' },
      { fr: 'maintenant', phonetic: 'man-tuh-NANG' },
      { fr: 'bien', phonetic: 'BEE-eng' },
    ],
  },
  {
    id: 'quebecois',
    name: 'Québécois',
    flag: '🍁',
    description: 'The French of Québec, Canada — influenced by 17th-century Norman French and English contact.',
    mapHint: 'Québec City, Montréal, Saguenay',
    characteristics: [
      't and d before i/u become "ts" and "dz": tu → "tsu", dire → "dzire"',
      'Vowels are more open and rounded',
      'Unique vocabulary: char (car), magasiner (to shop)',
      'Inversion used in questions more than in France',
    ],
    example: { fr: 'Chu tanné de travailler !', phonetic: 'shu TAH-nay duh tra-vay-YAY (I\'m sick of working!)' },
    funFact: 'Québécois preserves several features of 17th-century French that disappeared in France — like "chu" (je suis) and "icitte" (ici).',
    words: [
      { fr: 'tabarnac', phonetic: '(mild Québécois exclamation — avoid!)' },
      { fr: 'ostie', phonetic: '(exclamation — handle with care)' },
      { fr: 'c\'est l\'boutte !', phonetic: 'say luh BOOT — It\'s great!' },
    ],
  },
  {
    id: 'belge',
    name: 'Belge (Belgian)',
    flag: '🇧🇪',
    description: 'Belgian French — closely related to Parisian French but with distinctive features.',
    mapHint: 'Brussels, Liège, Namur, Charleroi',
    characteristics: [
      'Uses "septante" (70), "nonante" (90) instead of soixante-dix, quatre-vingt-dix',
      'Slower, more measured pace than Parisian French',
      'Some vocabulary differs: un dejeuner = breakfast (not lunch)',
      '"H" is often pronounced where Parisians drop it',
    ],
    example: { fr: 'J\'ai septante euros dans mon portefeuille.', phonetic: 'zhay sep-TAHNT uh-RO dan mon port-FUHY' },
    funFact: 'Belgium uses "septante" and "nonante" for 70 and 90 — far more logical than France\'s "soixante-dix" and "quatre-vingt-dix"!',
    words: [
      { fr: 'septante', phonetic: 'sep-TAHNT (70)' },
      { fr: 'nonante', phonetic: 'noh-NAHNT (90)' },
      { fr: 'drôle de pistolet', phonetic: 'drohl duh pees-toh-LAY (bread roll)' },
    ],
  },
  {
    id: 'africain',
    name: 'Français d\'Afrique',
    flag: '🌍',
    description: 'French spoken across sub-Saharan Africa and the Maghreb — diverse and growing in speakers.',
    mapHint: 'Dakar, Abidjan, Kinshasa, Casablanca, Tunis',
    characteristics: [
      'Often syllable-timed (each syllable equal) vs stress-timed Parisian French',
      'Unique vocabulary from local languages blended in',
      'Tonal patterns influenced by indigenous African languages',
      '"R" varies: trilled in Maghreb Arabic-influenced speech, velar in West Africa',
    ],
    example: { fr: 'On va causer un peu ensemble.', phonetic: 'oh VAH koh-ZAY aN pyuh ahn-SAHM-bluh (West African)' },
    funFact: 'More French speakers live in Africa than in France — over 300 million people across the continent use French daily.',
    words: [
      { fr: 'cadeau', phonetic: 'ka-DOH — gift (also means bribe in some West African contexts!)' },
      { fr: 'essayer', phonetic: 'different stress: es-SAY-yay' },
      { fr: 'ça va aller', phonetic: 'it will be fine — common Ivorian greeting response' },
    ],
  },
  {
    id: 'suisse',
    name: 'Suisse Romand',
    flag: '🇨🇭',
    description: 'Swiss French — slower, clearer, with unique vocabulary borrowed from Swiss German.',
    mapHint: 'Geneva, Lausanne, Neuchâtel, Fribourg',
    characteristics: [
      'Like Belgium, uses "septante", "huitante/octante" (80), "nonante" (90)',
      'Very clear articulation — often called the "clearest" French',
      'Unique vocab: une fiole (a glass), une pinte (a pub)',
      'Slow, measured speech — good for learners!',
    ],
    example: { fr: 'J\'ai huitante francs dans mon portemonnaie.', phonetic: 'zhay WHEAT-ahnt frahn dan mon port-moh-NAY' },
    funFact: 'Switzerland is the only country that uses "huitante" for 80 — making their number system completely regular: septante (70), huitante (80), nonante (90).',
    words: [
      { fr: 'huitante', phonetic: 'WHEAT-ahnt (80)' },
      { fr: 'bonjour', phonetic: 'pronounced more deliberately: bohn-ZHOOR (each syllable distinct)' },
      { fr: 'déjeuner', phonetic: 'in Switzerland, means lunch (as in France)' },
    ],
  },
]

export default function RegionalAccents() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Regional Accents | SayBonjour!" description="Explore French regional accents from Paris to Québec — characteristics, vocabulary, and fun facts." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Regional Accents</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Accents régionaux — French sounds different around the world</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {REGIONS.map((region, i) => {
            const isOpen = selected === region.id
            return (
              <motion.div key={region.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                <button onClick={() => setSelected(isOpen ? null : region.id)}
                  className="w-full text-left p-5 flex items-center gap-3">
                  <span className="text-3xl">{region.flag}</span>
                  <div className="flex-1">
                    <h2 className="font-bold text-gray-900 dark:text-cream-50 text-sm">{region.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                      <MapPin size={10} /> {region.mapHint}
                    </p>
                  </div>
                  {isOpen ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{region.description}</p>

                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Characteristics</p>
                          <ul className="space-y-1">
                            {region.characteristics.map((c, j) => (
                              <li key={j} className="text-xs text-gray-600 dark:text-gray-400 flex gap-2">
                                <span className="text-burgundy-400 shrink-0">•</span>{c}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl p-3">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Example phrase</p>
                          <div className="flex items-center gap-2">
                            <SpeakButton text={region.example.fr} size="sm" />
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-cream-50 italic">{region.example.fr}</p>
                              <p className="text-xs text-gray-400 font-mono">{region.example.phonetic}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-xs text-amber-800 dark:text-amber-300">
                          <strong>Fun fact:</strong> {region.funFact}
                        </div>
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
