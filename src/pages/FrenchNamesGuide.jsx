import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Heart, ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const NAMES_DATA = {
  "Popular Men's Names": [
    { name: 'Louis', meaning: 'Famous warrior', origin: 'Germanic — Hlodwig', famous: 'Louis XIV, Louis Armstrong (honorary French)', pronunciation: 'loo-EE' },
    { name: 'Hugo', meaning: 'Heart / mind', origin: 'Germanic — Huge', famous: 'Victor Hugo, the great novelist', pronunciation: 'oo-GOH' },
    { name: 'Gabriel', meaning: 'God is my strength', origin: 'Hebrew — Gavri\'el', famous: 'Gabriel Fauré, composer; Gabriel Attal, PM', pronunciation: 'gab-ree-EL' },
    { name: 'Jules', meaning: 'Soft-haired / youthful', origin: 'Latin — Julius', famous: 'Jules Verne, Jules Michelet', pronunciation: 'ZHOOL' },
    { name: 'Théo', meaning: 'God\'s gift', origin: 'Greek — Theodoros', famous: 'Théo Hernández, French footballer', pronunciation: 'tay-OH' },
    { name: 'Mathieu', meaning: 'Gift of God', origin: 'Hebrew — Mattithyahu', famous: 'Mathieu Kassovitz, director', pronunciation: 'mat-YUH' },
    { name: 'Antoine', meaning: 'Praiseworthy', origin: 'Latin — Antonius', famous: 'Antoine de Saint-Exupéry, author', pronunciation: 'ahn-TWAN' },
    { name: 'Clément', meaning: 'Mild / merciful', origin: 'Latin — Clemens', famous: 'Clément Marot, Renaissance poet', pronunciation: 'klay-MAHN' },
    { name: 'Raphaël', meaning: 'God has healed', origin: 'Hebrew — Rafa\'el', famous: 'Raphaël, French singer', pronunciation: 'raf-ay-EL' },
    { name: 'Léo', meaning: 'Lion', origin: 'Latin — Leo', famous: 'Léo Ferré, singer-songwriter', pronunciation: 'lay-OH' },
  ],
  "Popular Women's Names": [
    { name: 'Emma', meaning: 'Whole / universal', origin: 'Germanic — Ermen', famous: 'Emma Bovary (Flaubert\'s heroine)', pronunciation: 'EM-ah' },
    { name: 'Léa', meaning: 'Weary / delicate', origin: 'Hebrew — Leah', famous: 'Léa Seydoux, actress', pronunciation: 'lay-AH' },
    { name: 'Chloé', meaning: 'Blooming / verdant', origin: 'Greek — Khloē', famous: 'Fashion house Chloé', pronunciation: 'kloh-AY' },
    { name: 'Inès', meaning: 'Pure / holy', origin: 'Greek — Hagnē via Spanish Inés', famous: 'Inès de la Fressange, model', pronunciation: 'ee-NES' },
    { name: 'Camille', meaning: 'Helper to the priest', origin: 'Latin — Camillus', famous: 'Camille, singer; Camille Claudel, sculptor', pronunciation: 'kam-EE-yuh' },
    { name: 'Amélie', meaning: 'Industrious / hardworking', origin: 'Germanic — Amal', famous: 'Amélie Poulain (film character)', pronunciation: 'am-ay-LEE' },
    { name: 'Manon', meaning: 'Wished-for child', origin: 'French diminutive of Marie', famous: 'Manon des Sources (Pagnol)', pronunciation: 'man-OHN' },
    { name: 'Margot', meaning: 'Pearl', origin: 'Greek — Margaron via Marguerite', famous: 'Margot Robbie (though Australian, name is French!)', pronunciation: 'mar-GOH' },
    { name: 'Lucie', meaning: 'Light', origin: 'Latin — Lux', famous: 'Lucie Aubrac, resistance fighter', pronunciation: 'loo-SEE' },
    { name: 'Juliette', meaning: 'Youthful', origin: 'Latin — Julius', famous: 'Juliette Binoche, actress', pronunciation: 'zhoo-lee-ET' },
  ],
  'Royal & Historic Names': [
    { name: 'Charlemagne', meaning: 'Charles the Great', origin: 'Germanic — Karl + Magnus', famous: 'King of the Franks, Holy Roman Emperor', pronunciation: 'shar-luh-MAHN' },
    { name: 'Napoléon', meaning: 'Lion of the new city', origin: 'Italian — Napoleone', famous: 'Napoleon Bonaparte, Emperor', pronunciation: 'nap-oh-lay-OHN' },
    { name: 'François', meaning: 'Frenchman / free man', origin: 'Latin — Franciscus', famous: 'François I, French kings; François Hollande', pronunciation: 'frahn-SWAH' },
    { name: 'Marie', meaning: 'Wished-for child', origin: 'Hebrew — Miriam', famous: 'Marie Curie, Marie Antoinette', pronunciation: 'mah-REE' },
    { name: 'Jeanne', meaning: 'God is gracious', origin: 'Hebrew — Yochanan', famous: 'Jeanne d\'Arc (Joan of Arc)', pronunciation: 'ZHAHN' },
    { name: 'Henri', meaning: 'Home ruler', origin: 'Germanic — Heimirich', famous: 'Numerous French kings', pronunciation: 'ahn-REE' },
  ],
  'Saints\' Names': [
    { name: 'Nicolas', meaning: 'Victory of the people', origin: 'Greek — Nikolaos', famous: 'Saint Nicolas — French tradition of Dec 6th gifts', pronunciation: 'nee-koh-LAH' },
    { name: 'Catherine', meaning: 'Pure', origin: 'Greek — Aikaterine', famous: 'Catherine de Médicis, French queen', pronunciation: 'kat-uh-REEN' },
    { name: 'Élise', meaning: 'My God is a vow', origin: 'Hebrew — Elisheba', famous: 'Beethoven\'s Für Elise — often sung as "Pour Élise"', pronunciation: 'ay-LEEZ' },
    { name: 'Vincent', meaning: 'Conquering', origin: 'Latin — Vincentius', famous: 'Saint Vincent de Paul, Van Gogh (French years)', pronunciation: 'van-SAHN' },
  ],
}

const FETE_FACTS = [
  { name: 'Louis', date: 'August 25', saint: 'Saint Louis (Louis IX)' },
  { name: 'Marie / Marianne', date: 'August 15 (Assumption)', saint: 'La Vierge Marie' },
  { name: 'Antoine', date: 'January 17', saint: 'Saint Antoine' },
  { name: 'Camille', date: 'July 14', saint: 'Saint Camille' },
  { name: 'Nicolas', date: 'December 6', saint: 'Saint Nicolas' },
  { name: 'Jean / Jeanne', date: 'June 24 (Saint Jean Baptiste)', saint: 'Saint Jean' },
  { name: 'François', date: 'October 4', saint: 'Saint François d\'Assise' },
  { name: 'Catherine', date: 'November 25', saint: 'Sainte Catherine' },
]

export default function FrenchNamesGuide() {
  const [activeSection, setActiveSection] = useState("Popular Men's Names")
  const [search, setSearch] = useState('')

  const allNames = Object.values(NAMES_DATA).flat()
  const searchResults = search.length >= 2
    ? allNames.filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
    : null

  const displayData = searchResults
    ? { 'Search results': searchResults }
    : { [activeSection]: NAMES_DATA[activeSection] }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Names Guide | SayBonjour!" description="Explore popular French names — meanings, origins, pronunciations, and famous bearers." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Names Guide</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Prénoms français — meanings, origins, and culture</p>
        </div>

        <div className="relative mb-6">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search a name..."
            className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 dark:border-dark-warm-50 bg-white dark:bg-dark-warm-100 text-gray-800 dark:text-cream-50 focus:outline-none focus:border-burgundy-400 text-sm" />
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {!search && (
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(NAMES_DATA).map(section => (
              <button key={section} onClick={() => setActiveSection(section)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeSection === section ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                {section}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3 mb-8">
          {Object.entries(displayData).map(([section, names]) => (
            <div key={section}>
              {searchResults && <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Found {names.length} result{names.length !== 1 ? 's' : ''}</h2>}
              {names.map((name, i) => (
                <motion.div key={name.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 mb-3 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-burgundy-100 to-burgundy-200 dark:from-burgundy-vibrant-600/20 dark:to-burgundy-vibrant-600/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-burgundy-600 dark:text-burgundy-vibrant-300 text-lg font-playfair">{name.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 dark:text-cream-50 font-playfair text-lg">{name.name}</span>
                      <SpeakButton text={name.name} size="sm" />
                    </div>
                    <p className="text-xs text-gray-400 mb-1 font-mono">{name.pronunciation}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span><strong>Meaning:</strong> {name.meaning}</span>
                      <span><strong>Origin:</strong> {name.origin}</span>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 rounded-lg px-2 py-1 inline-block">{name.famous}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <h2 className="font-bold text-gray-900 dark:text-cream-50 mb-1 flex items-center gap-2">
            <BookOpen size={18} className="text-burgundy-600" /> La fête — Name Days in France
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">In France, every day of the year has a saint's name. It's traditional to wish someone "Bonne fête !" on their name day — almost as important as a birthday.</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {FETE_FACTS.map(f => (
              <div key={f.name} className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm text-gray-800 dark:text-cream-50">{f.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{f.saint}</span>
                </div>
                <span className="text-xs text-burgundy-600 font-medium">{f.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
