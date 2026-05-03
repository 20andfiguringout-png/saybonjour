import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const NAMES_DATA = {
  "Popular Men's Names": [
    { name: 'Louis', meaning: 'Famous warrior', origin: 'Germanic — Hlodwig', famous: 'Louis XIV (the Sun King), Louis Pasteur (scientist), Louis Vuitton (fashion house founder)', pronunciation: 'loo-EE', nameDay: 'August 25' },
    { name: 'Hugo', meaning: 'Heart / mind / spirit', origin: 'Germanic — Hugo / Hugh', famous: 'Victor Hugo (Les Misérables, Notre-Dame de Paris)', pronunciation: 'oo-GOH', nameDay: 'April 1' },
    { name: 'Gabriel', meaning: 'God is my strength', origin: 'Hebrew — Gavri\'el', famous: 'Gabriel Fauré (composer); Gabriel Attal (youngest PM)', pronunciation: 'gab-ree-EL', nameDay: 'September 29' },
    { name: 'Jules', meaning: 'Soft-haired / youthful', origin: 'Latin — Julius', famous: 'Jules Verne (20,000 Leagues; Around the World in 80 Days)', pronunciation: 'ZHOOL', nameDay: 'April 12' },
    { name: 'Théo', meaning: 'God\'s gift', origin: 'Greek — Theodoros', famous: 'Théo Hernández (French international footballer)', pronunciation: 'tay-OH', nameDay: 'November 13' },
    { name: 'Mathieu', meaning: 'Gift of God', origin: 'Hebrew — Mattithyahu', famous: 'Mathieu Kassovitz (director of La Haine)', pronunciation: 'mat-YUH', nameDay: 'September 21' },
    { name: 'Antoine', meaning: 'Praiseworthy / inestimable', origin: 'Latin — Antonius', famous: 'Antoine de Saint-Exupéry (The Little Prince)', pronunciation: 'ahn-TWAN', nameDay: 'January 17' },
    { name: 'Clément', meaning: 'Mild / merciful / gentle', origin: 'Latin — Clemens', famous: 'Clément Marot (Renaissance poet)', pronunciation: 'klay-MAHN', nameDay: 'November 23' },
    { name: 'Raphaël', meaning: 'God has healed', origin: 'Hebrew — Rafa\'el', famous: 'Raphaël (French singer-songwriter)', pronunciation: 'raf-ay-EL', nameDay: 'September 29' },
    { name: 'Léo', meaning: 'Lion', origin: 'Latin — Leo', famous: 'Léo Ferré (singer-songwriter anarchist poet)', pronunciation: 'lay-OH', nameDay: 'November 10' },
    { name: 'Arthur', meaning: 'Bear king', origin: 'Celtic / Latin', famous: 'Arthur Rimbaud (Symbolist poet, A Season in Hell)', pronunciation: 'ar-TOOR', nameDay: 'November 19' },
    { name: 'Alexis', meaning: 'Defender / helper', origin: 'Greek — Alexios', famous: 'Alexis Pinturault (Alpine ski champion)', pronunciation: 'al-eks-EE', nameDay: 'February 17' },
  ],
  "Popular Women's Names": [
    { name: 'Emma', meaning: 'Whole / universal', origin: 'Germanic — Ermen', famous: 'Emma Bovary (Flaubert\'s protagonist — "Madame Bovary")', pronunciation: 'EM-ah', nameDay: 'April 19' },
    { name: 'Léa', meaning: 'Weary / delicate', origin: 'Hebrew — Leah', famous: 'Léa Seydoux (Bond girl; Palme d\'Or winner)', pronunciation: 'lay-AH', nameDay: 'March 22' },
    { name: 'Chloé', meaning: 'Blooming / verdant / green', origin: 'Greek — Khloē', famous: 'Fashion house Chloé (founded 1952)', pronunciation: 'kloh-AY', nameDay: 'March 5' },
    { name: 'Inès', meaning: 'Pure / holy / sacred', origin: 'Greek — Hagnē via Spanish Inés', famous: 'Inès de la Fressange (supermodel, Chanel muse)', pronunciation: 'ee-NES', nameDay: 'January 21' },
    { name: 'Camille', meaning: 'Helper to the priest', origin: 'Latin — Camillus', famous: 'Camille Claudel (sculptor; Rodin\'s protégée and lover)', pronunciation: 'kam-EE-yuh', nameDay: 'July 14' },
    { name: 'Amélie', meaning: 'Industrious / hardworking', origin: 'Germanic — Amal', famous: 'Amélie Poulain (film character); Amélie Mauresmo (tennis)', pronunciation: 'am-ay-LEE', nameDay: 'July 10' },
    { name: 'Manon', meaning: 'Wished-for child', origin: 'French diminutive of Marie', famous: '"Manon des Sources" (Pagnol); Manon Lescaut (opera)', pronunciation: 'man-OHN', nameDay: 'August 15' },
    { name: 'Margot', meaning: 'Pearl', origin: 'Greek — Margaron via Marguerite', famous: 'Reine Margot (Queen of France 1553–1615)', pronunciation: 'mar-GOH', nameDay: 'August 22' },
    { name: 'Lucie', meaning: 'Light', origin: 'Latin — Lux', famous: 'Lucie Aubrac (WWII Resistance heroine)', pronunciation: 'loo-SEE', nameDay: 'December 13' },
    { name: 'Juliette', meaning: 'Youthful / soft-haired', origin: 'Latin — Julius', famous: 'Juliette Binoche (actress; Palme d\'Or)', pronunciation: 'zhoo-lee-ET', nameDay: 'April 8' },
    { name: 'Mathilde', meaning: 'Strength in battle', origin: 'Germanic — Mahthild', famous: 'Mathilde (Queen of Belgium); Mathilde Floral (contemporary)', pronunciation: 'ma-TEELD', nameDay: 'March 14' },
    { name: 'Alice', meaning: 'Noble / of noble kind', origin: 'Germanic — Adalheidis', famous: 'Alice Guy-Blaché (world\'s first female film director, 1896)', pronunciation: 'ah-LEES', nameDay: 'June 16' },
  ],
  'Royal & Historic Names': [
    { name: 'Charlemagne', meaning: 'Charles the Great', origin: 'Germanic — Karl + Magnus', famous: 'King of the Franks (742–814); first Holy Roman Emperor; unified most of Western Europe', pronunciation: 'shar-luh-MAHN', nameDay: 'January 28' },
    { name: 'Napoléon', meaning: 'Lion of the new city', origin: 'Italian — Napoleone', famous: 'Napoleon Bonaparte (1769–1821) — Emperor, general, legal reformer (Napoleonic Code)', pronunciation: 'nap-oh-lay-OHN', nameDay: 'August 15' },
    { name: 'François', meaning: 'Frenchman / free man', origin: 'Latin — Franciscus', famous: 'François I (patron of Leonardo da Vinci); François Hollande (president)', pronunciation: 'frahn-SWAH', nameDay: 'October 4' },
    { name: 'Marie', meaning: 'Wished-for child / beloved', origin: 'Hebrew — Miriam', famous: 'Marie Curie (first woman to win Nobel Prize, twice); Marie Antoinette (queen)', pronunciation: 'mah-REE', nameDay: 'August 15' },
    { name: 'Jeanne', meaning: 'God is gracious', origin: 'Hebrew — Yochanan', famous: 'Jeanne d\'Arc / Joan of Arc (1412–1431) — national heroine, patron saint of France', pronunciation: 'ZHAHN', nameDay: 'May 30' },
    { name: 'Henri', meaning: 'Home ruler', origin: 'Germanic — Heimirich', famous: 'Henri IV (first Bourbon king — "Paris vaut bien une messe"); Henri Matisse (painter)', pronunciation: 'ahn-REE', nameDay: 'July 13' },
    { name: 'René', meaning: 'Reborn', origin: 'Latin — Renatus', famous: 'René Descartes (philosopher — "Je pense, donc je suis"); René Magritte', pronunciation: 'ruh-NAY', nameDay: 'October 19' },
  ],
  'Saints\' & Religious Names': [
    { name: 'Nicolas', meaning: 'Victory of the people', origin: 'Greek — Nikolaos', famous: 'Saint Nicolas — French tradition of gifts on December 6th (especially in Lorraine and Alsace)', pronunciation: 'nee-koh-LAH', nameDay: 'December 6' },
    { name: 'Catherine', meaning: 'Pure', origin: 'Greek — Aikaterine', famous: 'Catherine de Médicis (Queen of France); Saint Catherine of Alexandria', pronunciation: 'kat-uh-REEN', nameDay: 'November 25' },
    { name: 'Élise', meaning: 'My God is a vow', origin: 'Hebrew — Elisheba', famous: 'Beethoven\'s "Für Elise" — often spelled "Pour Élise" in French', pronunciation: 'ay-LEEZ', nameDay: 'November 5' },
    { name: 'Vincent', meaning: 'Conquering / prevailing', origin: 'Latin — Vincentius', famous: 'Saint Vincent de Paul (founder of Vincentian order); Vincent van Gogh (lived in Arles)', pronunciation: 'van-SAHN', nameDay: 'January 22' },
    { name: 'Thérèse', meaning: 'Harvest / summer', origin: 'Greek — Therasia', famous: 'Sainte Thérèse de Lisieux (patron saint of France alongside Joan of Arc)', pronunciation: 'tay-REZ', nameDay: 'October 1' },
    { name: 'Dominique', meaning: 'Of the Lord / Sunday', origin: 'Latin — Dominicus', famous: 'Saint Dominic (founder of Dominican order); Dominique Strauss-Kahn', pronunciation: 'dom-ee-NEEK', nameDay: 'August 8' },
  ],
}

const FETE_FACTS = [
  { name: 'Louis', date: 'August 25', saint: 'Saint Louis (Louis IX)' },
  { name: 'Marie / Marianne', date: 'August 15', saint: 'L\'Assomption de la Vierge Marie' },
  { name: 'Antoine', date: 'January 17', saint: 'Saint Antoine' },
  { name: 'Camille', date: 'July 14', saint: 'Saint Camille de Lellis' },
  { name: 'Nicolas', date: 'December 6', saint: 'Saint Nicolas' },
  { name: 'Jean / Jeanne', date: 'June 24', saint: 'Saint Jean Baptiste' },
  { name: 'François', date: 'October 4', saint: 'Saint François d\'Assise' },
  { name: 'Catherine', date: 'November 25', saint: 'Sainte Catherine' },
  { name: 'Thérèse', date: 'October 1', saint: 'Sainte Thérèse de Lisieux' },
  { name: 'René', date: 'October 19', saint: 'Saint René Goupil' },
]

const NAME_CULTURE = [
  { emoji: '📅', title: 'La fête — Name Days', detail: 'Every day of the French calendar has a saint\'s name (les saints du calendrier). Wishing someone "Bonne fête !" on their name day is a tradition — sometimes as important as a birthday. The Church calendar was so embedded in French life that the revolutionary Convention tried (and failed) to replace saints with plants and tools.' },
  { emoji: '📋', title: 'Naming laws in France', detail: 'Until 1993, French parents could only choose names from the official list of saints and historical figures. Today, parents can choose freely — but if a name is deemed contrary to the child\'s interest, the registrar can refuse it. Courts have blocked names like "Nutella", "Fraise" (Strawberry), and "Prince William".' },
  { emoji: '🇫🇷', title: 'The most French names', detail: '"Marianne" is the symbolic name of the French Republic — the feminine personification of liberty. "Jean" was France\'s most common male name for centuries (now less so). "Marie" dominated female names for 400 years. "Camille" and "Dominique" are gender-neutral (both male and female).' },
  { emoji: '🌍', title: 'Arabic, African and diverse French names', detail: 'Modern France is increasingly diverse. Names like Mohamed, Fatima, Yasmine, Karim, and Amina are now among the most common in many regions. French naming culture reflects the country\'s colonial history and ongoing immigration, creating a rich, complex naming landscape that mirrors French society itself.' },
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
      <SEO title="French Names Guide | SayBonjour!" description="Explore French names — meanings, origins, pronunciations, famous bearers, name days, and French naming culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Names Guide</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Prénoms français — meanings, origins, pronounciation, and naming culture</p>
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
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 mb-3 flex items-start gap-4"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-burgundy-100 to-burgundy-200 dark:from-burgundy-vibrant-600/20 dark:to-burgundy-vibrant-600/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-burgundy-600 dark:text-burgundy-vibrant-300 text-lg font-playfair">{name.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-gray-900 dark:text-cream-50 font-playfair text-lg">{name.name}</span>
                      <SpeakButton text={name.name} size="sm" />
                      {name.nameDay && <span className="text-xs text-burgundy-500 font-medium hidden sm:inline">🎉 {name.nameDay}</span>}
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

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6 mb-6">
          <h2 className="font-bold text-gray-900 dark:text-cream-50 mb-1 flex items-center gap-2">
            <BookOpen size={18} className="text-burgundy-600" /> La fête — Name Days in France
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Every day of the year has a saint's name. Wishing someone "Bonne fête !" (Happy name day!) is a charming French tradition. The complete calendar is printed in diaries and phone screens.</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {FETE_FACTS.map(f => (
              <div key={f.name} className="bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5 flex items-center justify-between"
                onClick={() => addXP(1, 'vocabulary')}>
                <div>
                  <span className="font-semibold text-sm text-gray-800 dark:text-cream-50">{f.name}</span>
                  <span className="text-xs text-gray-400 ml-2 italic">{f.saint}</span>
                </div>
                <span className="text-xs text-burgundy-600 font-medium shrink-0">{f.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {NAME_CULTURE.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
              onClick={() => addXP(4, 'vocabulary')}>
              <span className="text-3xl shrink-0">{item.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
