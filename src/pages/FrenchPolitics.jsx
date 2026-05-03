import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Flag, Building2 } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const POLITICS_SECTIONS = [
  {
    category: 'Government Structure — La structure du gouvernement',
    items: [
      { fr: 'la République française', en: 'the French Republic', note: 'France is the 5th Republic (since 1958)' },
      { fr: 'le Président de la République', en: 'the President of the Republic', note: 'Elected for 5-year terms; very powerful in France' },
      { fr: 'le Premier ministre', en: 'the Prime Minister', note: 'Head of government; appointed by the President' },
      { fr: 'le gouvernement', en: 'the government / cabinet' },
      { fr: 'le Parlement', en: 'Parliament', note: 'Two chambers: Assemblée nationale + Sénat' },
      { fr: 'l\'Assemblée nationale', en: 'the National Assembly (lower house)' },
      { fr: 'le Sénat', en: 'the Senate (upper house)' },
      { fr: 'un député', en: 'a Member of Parliament (MP)', note: 'Elected to the Assemblée nationale' },
      { fr: 'un sénateur', en: 'a senator' },
      { fr: 'le Conseil d\'État', en: 'the Council of State (top admin court)' },
      { fr: 'le Conseil constitutionnel', en: 'the Constitutional Council' },
      { fr: 'l\'Élysée', en: 'the Élysée Palace (President\'s residence)' },
      { fr: 'Matignon', en: 'the Hôtel Matignon (PM\'s residence)' },
    ],
  },
  {
    category: 'Political Vocabulary — Vocabulaire politique',
    items: [
      { fr: 'une élection', en: 'an election' },
      { fr: 'voter', en: 'to vote' },
      { fr: 'le suffrage universel', en: 'universal suffrage', note: 'France was first to grant this to men in 1848' },
      { fr: 'un parti politique', en: 'a political party' },
      { fr: 'la droite', en: 'the right (wing)', note: 'Terms originate from the French Revolution seating!' },
      { fr: 'la gauche', en: 'the left (wing)' },
      { fr: 'le centre', en: 'the centre' },
      { fr: 'la laïcité', en: 'secularism / separation of church and state', note: 'A fundamental French principle since 1905' },
      { fr: 'une manifestation (une manif)', en: 'a protest / demonstration', note: 'France has a very strong protest culture' },
      { fr: 'une grève', en: 'a strike', note: 'Grèves (strikes) are very common in France' },
      { fr: 'le référendum', en: 'a referendum' },
      { fr: 'la Constitution', en: 'the Constitution' },
    ],
  },
  {
    category: 'Discussing News — Parler de l\'actualité',
    items: [
      { fr: 'l\'actualité', en: 'current affairs / the news' },
      { fr: 'un journal / les infos', en: 'a newspaper / the news (informal)', note: '"Les infos" = news broadcast' },
      { fr: 'un débat', en: 'a debate' },
      { fr: 'la politique étrangère', en: 'foreign policy' },
      { fr: 'la politique intérieure', en: 'domestic policy' },
      { fr: 'une loi', en: 'a law' },
      { fr: 'un projet de loi', en: 'a bill (proposed law)' },
      { fr: 'voter une loi', en: 'to pass a law' },
      { fr: 'l\'opposition', en: 'the opposition' },
      { fr: 'la campagne électorale', en: 'the election campaign' },
      { fr: 'un sondage', en: 'a poll / survey' },
    ],
  },
]

const KEY_PRINCIPLES = [
  { title: 'Liberté, Égalité, Fraternité', desc: 'The French motto since the Revolution. Liberty, Equality, Fraternity — inscribed on all official buildings.', emoji: '🇫🇷' },
  { title: 'La laïcité', desc: 'Strict separation of religion and state. Religious symbols banned in public schools. Schools are secular by law.', emoji: '⚖️' },
  { title: 'Le droit de grève', desc: 'The right to strike is constitutionally protected. France has one of the highest strike rates in Europe — it\'s seen as a fundamental right.', emoji: '✊' },
  { title: 'La 5e République', desc: 'France\'s current political system, established by de Gaulle in 1958. The President holds significant executive power compared to most democracies.', emoji: '🏛️' },
  { title: 'Le vote blanc', desc: 'A "blank vote" — deliberately submitting an empty ballot — is officially counted in France since 2014. A form of political protest.', emoji: '📋' },
]

const PHRASES = [
  { fr: 'Qu\'est-ce que tu penses de la politique actuelle ?', en: 'What do you think of current politics?' },
  { fr: 'Je ne suis pas politisé(e).', en: 'I\'m not particularly political.' },
  { fr: 'Il y a des élections en juin.', en: 'There are elections in June.' },
  { fr: 'J\'ai voté pour la première fois cette année.', en: 'I voted for the first time this year.' },
  { fr: 'La situation économique est préoccupante.', en: 'The economic situation is worrying.' },
  { fr: 'Ils vont faire grève la semaine prochaine.', en: 'They\'re going to strike next week.' },
  { fr: 'Le taux de chômage a augmenté.', en: 'The unemployment rate has risen.' },
]

export default function FrenchPolitics() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Politics & Society | SayBonjour!" description="Understand French politics vocabulary — government, elections, key principles, and current affairs language." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Politics & Society</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La politique et la société — government, elections and civic vocabulary</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'principles', label: 'Key Principles' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {POLITICS_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{POLITICS_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {POLITICS_SECTIONS[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                      </div>
                      {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'principles' && (
          <div className="space-y-4">
            {KEY_PRINCIPLES.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">{p.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
