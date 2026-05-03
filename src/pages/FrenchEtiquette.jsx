import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ETIQUETTE_SECTIONS = [
  {
    title: 'Greetings & Politeness',
    icon: '🤝',
    rules: [
      { rule: 'Always say "Bonjour"', desc: 'Enter any shop, doctor\'s office, lift, or small gathering and say "Bonjour" first. Starting without a greeting is considered rude. "Bonjour Madame / Monsieur" is even better.' },
      { rule: 'Use "vous" with strangers and authority', desc: 'The formal "vous" is essential with shop staff, officials, older people, and anyone you\'ve just met. Using "tu" too quickly can seem presumptuous.' },
      { rule: '"S\'il vous plaît" is non-negotiable', desc: 'Never order in a café without "s\'il vous plaît." "Un café" alone sounds brusque. "Un café, s\'il vous plaît" is the minimum.' },
      { rule: '"Au revoir" when leaving', desc: 'Leaving a shop, café, or appointment without "au revoir" is considered abrupt. Always take a moment to say goodbye.' },
    ],
  },
  {
    title: 'Table & Dining Manners',
    icon: '🍽️',
    rules: [
      { rule: 'Wait for "Bon appétit!"', desc: 'Don\'t start eating until the host or someone at the table says "Bon appétit!" Silence before starting to eat is common.' },
      { rule: 'Bread on the table, not a plate', desc: 'Bread goes directly on the table (not on a side plate). It\'s not rude — it\'s tradition.' },
      { rule: 'Both hands on the table', desc: 'Keep both wrists or forearms visible on the table — not in your lap. This comes from a historical tradition.' },
      { rule: 'Don\'t ask for doggy bags', desc: 'Taking leftover food home is unusual in France. It\'s becoming more accepted but is not standard practice.' },
      { rule: 'Cheese before dessert', desc: 'In a French meal, cheese (le fromage) comes BEFORE dessert, not after. Never cut the tip off a wedge of cheese.' },
    ],
  },
  {
    title: 'Social Etiquette',
    icon: '🥂',
    rules: [
      { rule: 'Bring a gift when invited to someone\'s home', desc: 'Wine, flowers (not chrysanthemums — those are for funerals), or chocolates. Don\'t bring 13 flowers. The host may not open the gift in front of you.' },
      { rule: 'Don\'t discuss money or salary', desc: 'Personal finances are private in France. Asking someone\'s salary is very impolite. Discussing the price of things can also be awkward.' },
      { rule: 'Punctuality is expected but flexible', desc: 'Being 10–15 minutes late to a social dinner is considered polite (arriver en avance embarrasses the host). For professional appointments, be on time.' },
      { rule: 'Arguments about food and politics are normal', desc: 'Passionate debate — about food quality, politics, or philosophy — is part of French conversation culture. Don\'t be alarmed by vigorous disagreement.' },
    ],
  },
  {
    title: 'In Public',
    icon: '🏙️',
    rules: [
      { rule: 'Keep your voice down in public', desc: 'Loud conversations in public are seen as intrusive. The French tend to speak at a moderate volume even in groups.' },
      { rule: 'Queue properly', desc: 'The French take queueing seriously. Cutting in line is a serious social offence.' },
      { rule: 'Dress thoughtfully', desc: 'The French tend to dress elegantly even casually. Visiting a church requires covered shoulders. Going to a restaurant in very casual clothes may feel out of place.' },
      { rule: 'Smile with context', desc: 'Smiling at strangers on the street is unusual in France — unlike in some countries. It can be misread. Smiling in context (greeting, conversation) is perfectly normal.' },
    ],
  },
]

const POLITE_PHRASES = [
  { fr: 'Bonjour Madame / Monsieur.', en: 'Hello, Madam / Sir.', note: 'Use this when entering shops, etc.' },
  { fr: 'S\'il vous plaît.', en: 'Please.', note: 'Essential. Never omit it in requests.' },
  { fr: 'Merci beaucoup.', en: 'Thank you very much.' },
  { fr: 'Je vous en prie.', en: 'You\'re welcome. (formal)', note: '"De rien" is informal; "je vous en prie" is more elegant' },
  { fr: 'Excusez-moi.', en: 'Excuse me. (formal)', note: '"Pardon" also works for bumping into someone' },
  { fr: 'Je suis désolé(e).', en: 'I\'m sorry.', note: 'More sincere than "pardon"' },
  { fr: 'Avec plaisir.', en: 'With pleasure.', note: 'A gracious way to say yes to a request' },
  { fr: 'À votre santé !', en: 'Cheers! (lit. To your health!)', note: 'Maintain eye contact when clinking glasses — it\'s considered polite' },
]

export default function FrenchEtiquette() {
  const [tab, setTab] = useState('rules')
  const [activeSection, setActiveSection] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Etiquette & Social Customs | SayBonjour!" description="Understand French social etiquette — greetings, dining manners, social customs, and polite phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Etiquette</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les bonnes manières — social customs and polite behaviour in France</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'rules', label: 'Etiquette Rules' }, { id: 'phrases', label: 'Polite Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'rules' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ETIQUETTE_SECTIONS.map((s, i) => (
                <button key={s.title} onClick={() => { setActiveSection(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeSection === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {s.icon} {s.title}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {ETIQUETTE_SECTIONS[activeSection].rules.map((rule, i) => (
                <motion.div key={rule.rule} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                  <div className="flex items-start gap-3">
                    <Star size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{rule.rule}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{rule.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {POLITE_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
